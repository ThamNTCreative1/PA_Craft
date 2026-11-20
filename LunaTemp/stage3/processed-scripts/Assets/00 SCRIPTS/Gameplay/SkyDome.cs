using UnityEngine;

// Sky drawn on a big sphere around the camera (Luna has no skybox): keeps the dome centred on the camera.
public class SkyDome : MonoBehaviour
{
    [SerializeField] private Transform cameraTransform;

    private void LateUpdate()
    {
        if (cameraTransform) transform.position = cameraTransform.position;
    }
}
