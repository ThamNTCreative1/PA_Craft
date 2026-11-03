using UnityEngine;

public class VariableJoystick : Joystick
{
    public float MoveThreshold { get { return moveThreshold; } set { moveThreshold = Mathf.Abs(value); } }

    [SerializeField] private float moveThreshold = 1;
    [SerializeField] private JoystickType joystickType = JoystickType.Fixed;

    private Vector2 fixedPosition = Vector2.zero;

    public void SetMode(JoystickType joystickType)
    {
        if (IsInitialized) CancelInput();
        this.joystickType = joystickType;
        if (!IsInitialized) return;
        if(joystickType == JoystickType.Fixed)
        {
            background.anchoredPosition = fixedPosition;
            background.gameObject.SetActive(true);
        }
        else
            background.gameObject.SetActive(false);
    }

    protected override void Start()
    {
        base.Start();
        if (!IsInitialized) return;
        fixedPosition = background.anchoredPosition;
        SetMode(joystickType);
    }

    protected override void OnPressed(Vector2 screenPosition)
    {
        if(joystickType != JoystickType.Fixed)
        {
            background.anchoredPosition = ScreenPointToAnchoredPosition(screenPosition);
            background.gameObject.SetActive(true);
        }
    }

    protected override void OnReleased()
    {
        if(joystickType != JoystickType.Fixed)
            background.gameObject.SetActive(false);

    }

    protected override void HandleInput(float magnitude, Vector2 normalised, Vector2 radius, Camera cam)
    {
        if (joystickType == JoystickType.Dynamic && magnitude > Mathf.Abs(moveThreshold))
        {
            Vector2 difference = normalised * (magnitude - Mathf.Abs(moveThreshold)) * radius;
            MoveBackground(difference);
        }
        base.HandleInput(magnitude, normalised, radius, cam);
    }
}

public enum JoystickType { Fixed, Floating, Dynamic }
