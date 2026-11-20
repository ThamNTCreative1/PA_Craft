using UnityEngine;

// Turns world texts/icons to the camera (replaces the source LookAtCamera on each object; one component for all).
public class BillboardGroup : MonoBehaviour
{
    [SerializeField] private Transform cameraTransform;
    [SerializeField] private Transform[] items;

    private void LateUpdate()
    {
        if (cameraTransform == null) return;
        Quaternion r = cameraTransform.rotation;
        for (int i = 0; i < items.Length; i++)
            if (items[i] && items[i].gameObject.activeInHierarchy) items[i].rotation = r;
    }
}
