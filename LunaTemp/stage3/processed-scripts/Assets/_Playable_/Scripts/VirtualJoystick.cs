using UnityEngine;
using UnityEngine.EventSystems;

public class VirtualJoystick : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    public RectTransform background;
    public RectTransform knob;
    public float radius = 90f;
    public Vector2 Value { get; private set; }

    public void OnPointerDown(PointerEventData e) { OnDrag(e); }

    public void OnDrag(PointerEventData e)
    {
        Vector2 local;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(background, e.position, e.pressEventCamera, out local);
        local = Vector2.ClampMagnitude(local, radius);
        knob.anchoredPosition = local;
        Value = local / radius;
    }

    public void OnPointerUp(PointerEventData e) { Value = Vector2.zero; knob.anchoredPosition = Vector2.zero; }
    void OnDisable() { Value = Vector2.zero; if (knob) knob.anchoredPosition = Vector2.zero; }
}
