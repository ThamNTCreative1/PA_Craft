using UnityEngine;
using UnityEngine.EventSystems;

// Jump on press (the HUD Jump button).
public class JumpButton : MonoBehaviour, IPointerDownHandler
{
    [SerializeField] private PlayerMotor motor;

    public void OnPointerDown(PointerEventData eventData)
    {
        if (motor) motor.Jump();
    }
}
