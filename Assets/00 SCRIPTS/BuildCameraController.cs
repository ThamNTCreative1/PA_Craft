using System;
using System.Collections;
using UnityEngine;

/// <summary>Mouse/touch look and movement; reports clicks on the build guide.</summary>
public class BuildCameraController : MonoBehaviour
{
    [SerializeField] private float lookSensitivity = 0.18f;
    [SerializeField] private BuildPlayerMotor playerMotor = new BuildPlayerMotor();
    [SerializeField] private float turnToBlockSeconds = 0.1f;
    [SerializeField] private float tapMovementLimit = 12f;
    [SerializeField] private float collisionRadius = .3f;
    [SerializeField] private BuildCollisionWorld collisionWorld;
    [SerializeField] private BuildPlayerVisual playerVisual;
    [SerializeField] private float thirdPersonDistance = 3.5f;
    private Vector3 eyePosition;

    private Camera playerCamera;
    private BuildGuide guide;
    private Vector2 pointerStart;
    private int pointerBlockIndex = -1;
    private int pointerPartIndex = -1;
    private bool pointerDragged;
    private float yaw;
    private float pitch;
    [SerializeField] private BuildTouchControls controls;
    private BuildProgressUI hud;
    private int lookPointer = -99;

    public bool InputEnabled { get; set; } = true;
    public event Action<int,int> GuideClicked;

    public void Initialize(Camera camera, BuildGuide buildGuide)
    {
        playerCamera = camera;
        guide = buildGuide;
        playerMotor.Stop();
        eyePosition = camera.transform.position;
        if(collisionWorld==null || !collisionWorld.InitializeWorld())
        {
            Debug.LogError("Player movement stopped: saved map collision data is missing. Bake map collision before exporting.",this);
            InputEnabled=false;
            enabled=false;
            return;
        }
        var ui = GetComponent<BuildProgressUI>();
        hud = ui;
        if(controls==null)
        {
            Debug.LogError("Assign the scene Touch Controls to BuildCameraController.",this);
            enabled=false;return;
        }
        controls.Initialize();
        ReadCameraAngles();
    }

    private void Update()
    {
        if (!InputEnabled || playerCamera == null || guide == null || (LunaController.Ins!=null && LunaController.Ins.IsCTAActive))
        {
            if (controls != null) controls.ResetInput();
            playerMotor.Stop();
            UpdatePlayerVisual();
            lookPointer = -99; pointerBlockIndex = -1; return;
        }
        HandlePointer();
        HandleKeyboardMovement();
        ApplyCameraPosition();
        UpdatePlayerVisual();
    }

    private void HandleKeyboardMovement()
    {
        Vector3 forward = Vector3.ProjectOnPlane(playerCamera.transform.forward, Vector3.up).normalized;
        Vector3 right = Vector3.ProjectOnPlane(playerCamera.transform.right, Vector3.up).normalized;
        Vector3 move = right * controls.Movement.x + forward * controls.Movement.y;
        float vertical = controls.Vertical;
        bool jump = false;
#if UNITY_EDITOR || UNITY_STANDALONE
        move += right * Input.GetAxisRaw("Horizontal") + forward * Input.GetAxisRaw("Vertical");
        jump = Input.GetKeyDown(KeyCode.Space);
        if (controls.Flying)
            vertical += (Input.GetKey(KeyCode.Space) ? 1f : 0f) - (Input.GetKey(KeyCode.LeftShift) ? 1f : 0f);
#endif
        eyePosition = playerMotor.Move(eyePosition,
            move, Mathf.Clamp(vertical,-1,1), controls.Flying, jump, collisionRadius, Time.deltaTime);
        controls.AcknowledgeLanding();
    }

    private void ApplyCameraPosition()
    {
        if(playerCamera==null)return;
        Vector3 position=eyePosition;
        if(controls!=null && controls.ThirdPerson)
        {
            Vector3 offset=-playerCamera.transform.forward*thirdPersonDistance;
            RaycastHit hit;
            float radius=Mathf.Max(.25f,playerCamera.nearClipPlane);
            if(BuildCollisionWorld.Active!=null)
            {
                BuildCollisionWorld.Hit boxHit;
                if(BuildCollisionWorld.Active.Cast(eyePosition,Vector3.one*radius,offset.normalized,offset.magnitude,out boxHit))
                    offset=offset.normalized*Mathf.Max(0,boxHit.distance-.05f);
            }
            else if(Physics.SphereCast(eyePosition,radius,offset.normalized,out hit,offset.magnitude,
                Physics.DefaultRaycastLayers,QueryTriggerInteraction.Ignore))
                offset=offset.normalized*Mathf.Max(0,hit.distance-.05f);
            position+=offset;
        }
        playerCamera.transform.position=position;
    }

    private void UpdatePlayerVisual()
    {
        if(playerVisual==null || playerCamera==null || controls==null)return;
        bool visible=controls.ThirdPerson && Vector3.Distance(playerCamera.transform.position,eyePosition)>.6f;
        playerVisual.Synchronize(eyePosition-Vector3.up*playerMotor.eyeHeight,yaw,
            playerMotor.Velocity,playerMotor.Grounded,controls.Flying,visible);
    }

    private void HandlePointer()
    {
        if (Input.touchCount > 0)
        {
            for (int i=0;i<Input.touchCount;i++)
            {
                Touch touch=Input.GetTouch(i); int id=touch.fingerId;
                if(touch.phase==TouchPhase.Began)
                {
                    if(!(hud!=null && hud.BeginPointer(id,touch.position)) && !controls.Begin(id,touch.position) && lookPointer==-99) {lookPointer=id; BeginPointer(touch.position);}
                }
                else if(touch.phase==TouchPhase.Moved)
                {
                    controls.Move(id,touch.position);
                    if(id==lookPointer) MovePointer(touch.deltaPosition,touch.position);
                }
                else if(touch.phase==TouchPhase.Ended || touch.phase==TouchPhase.Canceled)
                {
                    controls.End(id);
                    if(hud!=null)hud.EndPointer(id,touch.position,touch.phase==TouchPhase.Canceled);
                    if(id==lookPointer) {if(touch.phase==TouchPhase.Ended) EndPointer(touch.position); else pointerBlockIndex=-1; lookPointer=-99;}
                }
            }
            return;
        }
        if (Input.GetMouseButtonDown(0) && !(hud!=null && hud.BeginPointer(-1,Input.mousePosition)) && !controls.Begin(-1,Input.mousePosition)) {lookPointer=-1; BeginPointer(Input.mousePosition);}
        if (Input.GetMouseButton(0)) controls.Move(-1,Input.mousePosition);
        if (Input.GetMouseButton(0) && !Input.GetMouseButtonDown(0))
            if(lookPointer==-1) MovePointer(new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")) * 14f, Input.mousePosition);
        if (Input.GetMouseButtonUp(0)) {controls.End(-1); if(hud!=null)hud.EndPointer(-1,Input.mousePosition,false); if(lookPointer==-1) EndPointer(Input.mousePosition); lookPointer=-99;}
    }

    private void BeginPointer(Vector2 position)
    {
        pointerStart = position;
        pointerDragged = false;
        pointerBlockIndex = guide.TryGetBlockUnderPointer(playerCamera, position, out int index)
            ? index : -1;
        pointerPartIndex=guide.SelectedPartIndex;
    }

    private void MovePointer(Vector2 delta, Vector2 position)
    {
        if ((position - pointerStart).sqrMagnitude > tapMovementLimit * tapMovementLimit)
            pointerDragged = true;
        if (!pointerDragged) return;
        pointerBlockIndex = -1;
        yaw += delta.x * lookSensitivity;
        pitch = Mathf.Clamp(pitch - delta.y * lookSensitivity, -80f, 80f);
        playerCamera.transform.rotation = Quaternion.Euler(pitch, yaw, 0f);
    }

    private void EndPointer(Vector2 position)
    {
        bool tappedGuide = pointerBlockIndex >= 0 && !pointerDragged &&
            (position - pointerStart).sqrMagnitude <= tapMovementLimit * tapMovementLimit &&
            guide.TryGetBlockUnderPointer(playerCamera, position, out int index) &&
            index == pointerBlockIndex && guide.SelectedPartIndex==pointerPartIndex;
        int clickedIndex = pointerBlockIndex;
        pointerBlockIndex = -1;
        if (tappedGuide)
        {
            GuideClicked?.Invoke(pointerPartIndex,clickedIndex);
            if(playerVisual!=null)playerVisual.PlayBuild();
        }
    }

    public IEnumerator TurnTo(Vector3 target)
    {
        Quaternion from = playerCamera.transform.rotation;
        Quaternion to = Quaternion.LookRotation(target - eyePosition, Vector3.up);
        float elapsed = 0f;
        float duration = Mathf.Max(0.01f, turnToBlockSeconds);
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            playerCamera.transform.rotation = Quaternion.Slerp(from, to, Mathf.Clamp01(elapsed / duration));
            ApplyCameraPosition();
            yield return null;
        }
        playerCamera.transform.rotation = to;
        ApplyCameraPosition();
        ReadCameraAngles();
    }

    private void ReadCameraAngles()
    {
        Vector3 angles = playerCamera.transform.eulerAngles;
        yaw = angles.y;
        pitch = angles.x > 180f ? angles.x - 360f : angles.x;
    }
}
