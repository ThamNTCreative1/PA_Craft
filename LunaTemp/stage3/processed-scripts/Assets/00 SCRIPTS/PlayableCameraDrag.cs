using UnityEngine;
using UnityEngine.EventSystems;

public class PlayableCameraDrag : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    public CameraController cameraController;
    private int pointer=int.MinValue;
    public void OnPointerDown(PointerEventData e){if(pointer==int.MinValue)pointer=e.pointerId;}
    public void OnDrag(PointerEventData e){if(e.pointerId==pointer && cameraController)cameraController.Orbit(e.delta);}
    public void OnPointerUp(PointerEventData e){if(e.pointerId==pointer)pointer=int.MinValue;}
    private void OnDisable(){pointer=int.MinValue;}
}
