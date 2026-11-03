using UnityEngine;

public class FloatingJoystick : Joystick
{
    protected override void Start()
    {
        base.Start();
        if (!IsInitialized) return;
        background.gameObject.SetActive(false);
    }

    protected override void OnPressed(Vector2 screenPosition)
    {
        background.anchoredPosition = ScreenPointToAnchoredPosition(screenPosition);
        background.gameObject.SetActive(true);
    }

    protected override void OnReleased()
    {
        background.gameObject.SetActive(false);
    }
}