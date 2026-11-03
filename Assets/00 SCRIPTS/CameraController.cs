using UnityEngine;
using UnityEngine.Serialization;

/// <summary>Independent camera orbit, zoom and follow, updated before gameplay's world-space UI.</summary>
[DisallowMultipleComponent]
[DefaultExecutionOrder(-10)]
public class CameraController : MonoBehaviour
{
    public Transform target;
    public Camera controlledCamera;
    public Transform cameraManager;
    public StealEggGame game;
    public float distance=9;
    [FormerlySerializedAs("defaultYaw")]
    [SerializeField] private float initialVerticalAngle=5.4f;
    [SerializeField] private float initialHorizontalAngle=3.3f;

    private float horizontalAngle,verticalAngle;

    private void Awake()
    {
        if(!controlledCamera)controlledCamera=game ? game.gameCamera : GetComponentInChildren<Camera>();
        ResetAngles();
    }

    private void ResetAngles()
    {
        horizontalAngle=initialHorizontalAngle;
        verticalAngle=initialVerticalAngle;
    }

    private void Start()
    {
        UpdateTransform();
    }

    private void LateUpdate()
    {
        if(!target || Time.timeScale==0)return;
        if(Input.GetMouseButton(1))horizontalAngle+=Input.GetAxis("Mouse X")*3;
        distance=Mathf.Clamp(distance-Input.GetAxis("Mouse ScrollWheel")*1000*Time.deltaTime,9,30);
        UpdateTransform();
    }

    public void Orbit(Vector2 delta)
    {
        if(!isActiveAndEnabled || (game && game.IsInputBlocked))return;
        if(delta.sqrMagnitude>4 && game)game.NotifyCameraTurned();
        horizontalAngle+=delta.x*.15f;
        verticalAngle=Mathf.Clamp(verticalAngle-delta.y*.15f,-10,75);
    }

    private void UpdateTransform()
    {
        if(!target || !controlledCamera)return;
        Vector3 focus=target.position+Vector3.up*1.65f;
        if(cameraManager && cameraManager!=controlledCamera.transform)cameraManager.position=focus;
        controlledCamera.transform.position=focus+Quaternion.Euler(verticalAngle,horizontalAngle,0)*Vector3.back*distance;
        controlledCamera.transform.LookAt(focus);
    }

#if UNITY_EDITOR
    // Shared by scene authoring tools; runtime never creates the camera component.
    public static CameraController ConfigureFor(StealEggGame game)
    {
        CameraController controller=game.gameCamera.GetComponentInParent<CameraController>();
        if(!controller)controller=game.gameCamera.gameObject.AddComponent<CameraController>();
        controller.target=game.player;
        controller.controlledCamera=game.gameCamera;
        controller.game=game;
        if(!controller.cameraManager)
        {
            controller.cameraManager=new GameObject("CameraManager").transform;
            UnityEngine.SceneManagement.SceneManager.MoveGameObjectToScene(controller.cameraManager.gameObject,game.gameObject.scene);
        }
        controller.controlledCamera.transform.SetParent(controller.cameraManager,true);
        controller.ResetAngles();
        controller.UpdateTransform();
        return controller;
    }
#endif
}
