using System;
using System.Collections;
using UnityEngine;

/// <summary>Mouse/touch look and movement; reports clicks on the build guide.</summary>
public class BuildCameraController : MonoBehaviour
{
    [SerializeField] private float lookSensitivity = 0.18f;
    [SerializeField] private float moveSpeed = 4f;
    [SerializeField] private float turnToBlockSeconds = 0.22f;
    [SerializeField] private float tapMovementLimit = 12f;

    private Camera playerCamera;
    private BuildGuide guide;
    private Vector2 pointerStart;
    private int pointerBlockIndex = -1;
    private bool pointerDragged;
    private float yaw;
    private float pitch;
    private BuildTouchControls controls;
    private int lookPointer = -99;
    private float walkingHeight;

    public bool InputEnabled { get; set; } = true;
    public event Action<int> GuideClicked;

    public void Initialize(Camera camera, BuildGuide buildGuide)
    {
        playerCamera = camera;
        guide = buildGuide;
        walkingHeight = camera.transform.position.y;
        var ui = GetComponent<BuildProgressUI>();
        var font = ui != null ? ui.ControlFont : null;
#if !UNITY_LUNA
        if (font == null) font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
#endif
        var controlObject = new GameObject("Touch Controls", typeof(RectTransform));
        controlObject.transform.SetParent(transform, false);
        controls = controlObject.AddComponent<BuildTouchControls>(); controls.Initialize(font);
        ReadCameraAngles();
    }

    private void Update()
    {
        if (!InputEnabled || playerCamera == null || guide == null)
        {
            if (controls != null) controls.ResetInput();
            lookPointer = -99; pointerBlockIndex = -1; return;
        }
        HandlePointer();
        HandleKeyboardMovement();
    }

    private void HandleKeyboardMovement()
    {
        Vector3 forward = Vector3.ProjectOnPlane(playerCamera.transform.forward, Vector3.up).normalized;
        Vector3 right = Vector3.ProjectOnPlane(playerCamera.transform.right, Vector3.up).normalized;
        Vector3 move = right * controls.Movement.x + forward * controls.Movement.y;
        if (move.sqrMagnitude > 1f) move.Normalize();
        playerCamera.transform.position += move * moveSpeed * Time.deltaTime;
        Vector3 position = playerCamera.transform.position;
        if (controls.Flying) position.y = Mathf.Clamp(position.y + controls.Vertical * moveSpeed * Time.deltaTime, walkingHeight, 12f);
        else position.y = walkingHeight;
        playerCamera.transform.position = position;
        controls.AcknowledgeLanding();
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
                    if(!controls.Begin(id,touch.position) && lookPointer==-99) {lookPointer=id; BeginPointer(touch.position);}
                }
                else if(touch.phase==TouchPhase.Moved)
                {
                    controls.Move(id,touch.position);
                    if(id==lookPointer) MovePointer(touch.deltaPosition,touch.position);
                }
                else if(touch.phase==TouchPhase.Ended || touch.phase==TouchPhase.Canceled)
                {
                    controls.End(id);
                    if(id==lookPointer) {if(touch.phase==TouchPhase.Ended) EndPointer(touch.position); else pointerBlockIndex=-1; lookPointer=-99;}
                }
            }
            return;
        }
        if (Input.GetMouseButtonDown(0) && !controls.Begin(-1,Input.mousePosition)) {lookPointer=-1; BeginPointer(Input.mousePosition);}
        if (Input.GetMouseButton(0)) controls.Move(-1,Input.mousePosition);
        if (Input.GetMouseButton(0) && !Input.GetMouseButtonDown(0))
            if(lookPointer==-1) MovePointer(new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y")) * 14f, Input.mousePosition);
        if (Input.GetMouseButtonUp(0)) {controls.End(-1); if(lookPointer==-1) EndPointer(Input.mousePosition); lookPointer=-99;}
    }

    private void BeginPointer(Vector2 position)
    {
        pointerStart = position;
        pointerDragged = false;
        pointerBlockIndex = guide.TryGetBlockUnderPointer(playerCamera, position, out int index)
            ? index : -1;
    }

    private void MovePointer(Vector2 delta, Vector2 position)
    {
        if ((position - pointerStart).sqrMagnitude > tapMovementLimit * tapMovementLimit)
            pointerDragged = true;
        if (pointerBlockIndex >= 0 || !pointerDragged) return;
        yaw += delta.x * lookSensitivity;
        pitch = Mathf.Clamp(pitch - delta.y * lookSensitivity, -80f, 80f);
        playerCamera.transform.rotation = Quaternion.Euler(pitch, yaw, 0f);
    }

    private void EndPointer(Vector2 position)
    {
        bool tappedGuide = pointerBlockIndex >= 0 && !pointerDragged &&
            (position - pointerStart).sqrMagnitude <= tapMovementLimit * tapMovementLimit &&
            guide.TryGetBlockUnderPointer(playerCamera, position, out int index) &&
            index == pointerBlockIndex;
        int clickedIndex = pointerBlockIndex;
        pointerBlockIndex = -1;
        if (tappedGuide) GuideClicked?.Invoke(clickedIndex);
    }

    public IEnumerator TurnTo(Vector3 target)
    {
        Quaternion from = playerCamera.transform.rotation;
        Quaternion to = Quaternion.LookRotation(target - playerCamera.transform.position, Vector3.up);
        float elapsed = 0f;
        float duration = Mathf.Max(0.01f, turnToBlockSeconds);
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            playerCamera.transform.rotation = Quaternion.Slerp(from, to, Mathf.Clamp01(elapsed / duration));
            yield return null;
        }
        playerCamera.transform.rotation = to;
        ReadCameraAngles();
    }

    private void ReadCameraAngles()
    {
        Vector3 angles = playerCamera.transform.eulerAngles;
        yaw = angles.y;
        pitch = angles.x > 180f ? angles.x - 360f : angles.x;
    }
}
