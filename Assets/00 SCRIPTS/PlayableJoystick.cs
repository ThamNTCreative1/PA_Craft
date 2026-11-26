using UnityEngine;
using UnityEngine.EventSystems;

public class PlayableJoystick : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    public RectTransform knob;
    public Vector2 Value {get;private set;}
    private int pointerId=int.MinValue;
    public void OnPointerDown(PointerEventData e){if(pointerId!=int.MinValue)return;pointerId=e.pointerId;OnDrag(e);}
    public void OnDrag(PointerEventData e)
    {
        if(e.pointerId!=pointerId)return;RectTransform area=(RectTransform)transform;Vector2 point;
        if(RectTransformUtility.ScreenPointToLocalPointInRectangle(area,e.position,e.pressEventCamera,out point))
        {
            // Measured from the ring's centre (any pivot).
            float radius=Mathf.Max(1,Radius);
            Value=Vector2.ClampMagnitude((point-area.rect.center)/radius,1);
            knob.anchoredPosition=Value*radius;
        }
    }
    // Handle travel: its centre reaches the edge of the background ring (sizes laid out in the scene).
    public float Radius {get{Rect ring=((RectTransform)transform).rect;return Mathf.Min(ring.width,ring.height)*.5f;}}
    public void OnPointerUp(PointerEventData e){if(e.pointerId==pointerId)ResetInput();}
    public void ResetInput(){pointerId=int.MinValue;Value=Vector2.zero;if(knob)knob.anchoredPosition=Vector2.zero;}
    private void OnDisable(){ResetInput();}
}
