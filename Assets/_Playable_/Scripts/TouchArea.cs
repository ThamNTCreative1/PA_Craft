using UnityEngine;
using UnityEngine.EventSystems;

// Vùng chạm toàn màn hình: kéo để xoay camera (giống ref).
public class TouchArea : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    public ThirdPersonController player;
    int pointerId = int.MinValue;

    public void OnPointerDown(PointerEventData e) { if (pointerId == int.MinValue) pointerId = e.pointerId; }
    public void OnDrag(PointerEventData e) { if (e.pointerId == pointerId && player != null) player.AddLook(e.delta); }
    public void OnPointerUp(PointerEventData e) { if (e.pointerId == pointerId) pointerId = int.MinValue; }
}
