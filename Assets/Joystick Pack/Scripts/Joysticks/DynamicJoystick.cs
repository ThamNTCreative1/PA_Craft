using UnityEngine;

public class DynamicJoystick : Joystick
{
    public float MoveThreshold { get { return moveThreshold; } set { moveThreshold = Mathf.Abs(value); } }

    [SerializeField] private float moveThreshold = 1;

    protected override void Start()
    {
        MoveThreshold = moveThreshold;
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

    protected override void HandleInput(float magnitude, Vector2 normalised, Vector2 radius, Camera cam)
    {
        if (magnitude > Mathf.Abs(moveThreshold))
        {
            Vector2 difference = normalised * (magnitude - Mathf.Abs(moveThreshold)) * radius;
            MoveBackground(difference);
        }
        base.HandleInput(magnitude, normalised, radius, cam);
    }
}