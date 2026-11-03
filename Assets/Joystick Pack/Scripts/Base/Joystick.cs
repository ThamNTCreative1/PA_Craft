using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class Joystick : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
{
    public float Horizontal { get { return (snapX) ? SnapFloat(input.x, AxisOptions.Horizontal) : input.x; } }
    public float Vertical { get { return (snapY) ? SnapFloat(input.y, AxisOptions.Vertical) : input.y; } }
    public Vector2 Direction { get { return new Vector2(Horizontal, Vertical); } }

    public float HandleRange
    {
        get { return handleRange; }
        set { handleRange = Mathf.Abs(value); }
    }

    public float DeadZone
    {
        get { return deadZone; }
        set { deadZone = Mathf.Abs(value); }
    }

    public AxisOptions AxisOptions { get { return axisOptions; } set { axisOptions = value; } }
    public bool SnapX { get { return snapX; } set { snapX = value; } }
    public bool SnapY { get { return snapY; } set { snapY = value; } }

    [SerializeField] private float handleRange = 1;
    [SerializeField] private float deadZone = 0;
    [SerializeField] private AxisOptions axisOptions = AxisOptions.Both;
    [SerializeField] private bool snapX = false;
    [SerializeField] private bool snapY = false;

    [SerializeField] protected RectTransform background = null;
    [SerializeField] private RectTransform handle = null;
    [Tooltip("Test Luna mouse input in Unity. Luna builds always use this input path.")]
    [SerializeField] private bool simulateLunaInput = false;
    [Tooltip("Optional UI regions that must not start a joystick drag, such as a custom CTA.")]
    [SerializeField] private RectTransform[] inputBlockers = new RectTransform[0];
    private RectTransform baseRect = null;

    private Canvas canvas;
    private Camera cam;

    private Vector2 input = Vector2.zero;
    private bool pressed;
    private int pointerId;
    private static Joystick mouseOwner;
    private CanvasGroup[] canvasGroups;
    private Selectable[] controls;
    protected bool IsInitialized { get; private set; }

    private bool UsesMouseInput
    {
        get
        {
#if UNITY_LUNA
            return true;
#else
            return simulateLunaInput;
#endif
        }
    }

    protected virtual void Start()
    {
        HandleRange = handleRange;
        DeadZone = deadZone;
        baseRect = GetComponent<RectTransform>();
        canvas = GetComponentInParent<Canvas>();
        if (canvas != null) canvas = canvas.rootCanvas;
        if (background == null) background = transform.Find("Background") as RectTransform;
        if (handle == null && background != null) handle = background.Find("Handle") as RectTransform;
        if (canvas == null || baseRect == null || background == null || handle == null)
        {
            Debug.LogError("Joystick requires a Canvas, Background and Handle RectTransform.", this);
            enabled = false;
            return;
        }
        canvasGroups = GetComponentsInParent<CanvasGroup>(true);
        controls = canvas.GetComponentsInChildren<Selectable>(true);

        Vector2 center = new Vector2(0.5f, 0.5f);
        background.pivot = center;
        handle.anchorMin = center;
        handle.anchorMax = center;
        handle.pivot = center;
        handle.anchoredPosition = Vector2.zero;
        IsInitialized = true;
    }

    public virtual void OnPointerDown(PointerEventData eventData)
    {
        if (UsesMouseInput || eventData == null || eventData.button != PointerEventData.InputButton.Left) return;
        BeginInput(eventData.position, eventData.pointerId);
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (UsesMouseInput || eventData == null || !pressed || pointerId != eventData.pointerId) return;
        DragInput(eventData.position);
    }

    private void BeginInput(Vector2 screenPosition, int id)
    {
        if (!CanInteract() || pressed) return;
        UpdateCamera();
        pointerId = id;
        pressed = true;
        OnPressed(screenPosition);
        DragInput(screenPosition);
    }

    protected virtual void OnPressed(Vector2 screenPosition) { }
    protected virtual void OnReleased() { }

    private void UpdateCamera()
    {
        cam = canvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : canvas.worldCamera;
    }

    private void DragInput(Vector2 screenPosition)
    {
        if (!CanInteract()) { CancelInput(); return; }
        UpdateCamera();
        Vector2 localPoint;
        if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(background, screenPosition, cam, out localPoint)) return;
        Vector2 radius = background.rect.size * 0.5f;
        if (radius.x <= 0.001f || radius.y <= 0.001f) { CancelInput(); return; }
        localPoint -= background.rect.center;
        input = new Vector2(localPoint.x / radius.x, localPoint.y / radius.y);
        FormatInput();
        HandleInput(input.magnitude, input.normalized, radius, cam);
        handle.anchoredPosition = input * radius * handleRange;
    }

    protected virtual void HandleInput(float magnitude, Vector2 normalised, Vector2 radius, Camera cam)
    {
        input = magnitude > deadZone ? normalised * Mathf.Min(magnitude, 1f) : Vector2.zero;
    }

    private void FormatInput()
    {
        if (axisOptions == AxisOptions.Horizontal)
            input = new Vector2(input.x, 0f);
        else if (axisOptions == AxisOptions.Vertical)
            input = new Vector2(0f, input.y);
    }

    private float SnapFloat(float value, AxisOptions snapAxis)
    {
        if (value == 0)
            return value;

        if (axisOptions == AxisOptions.Both)
        {
            float angle = Vector2.Angle(input, Vector2.up);
            if (snapAxis == AxisOptions.Horizontal)
            {
                if (angle < 22.5f || angle > 157.5f)
                    return 0;
                else
                    return (value > 0) ? 1 : -1;
            }
            else if (snapAxis == AxisOptions.Vertical)
            {
                if (angle > 67.5f && angle < 112.5f)
                    return 0;
                else
                    return (value > 0) ? 1 : -1;
            }
            return value;
        }
        else
        {
            if (value > 0)
                return 1;
            if (value < 0)
                return -1;
        }
        return 0;
    }

    public virtual void OnPointerUp(PointerEventData eventData)
    {
        if (UsesMouseInput || eventData == null || !pressed || pointerId != eventData.pointerId) return;
        CancelInput();
    }

    protected void CancelInput()
    {
        pressed = false;
        if (mouseOwner == this) mouseOwner = null;
        input = Vector2.zero;
        if (handle != null) handle.anchoredPosition = Vector2.zero;
        if (IsInitialized) OnReleased();
    }

    protected virtual void OnDisable() { CancelInput(); }
    private void OnApplicationFocus(bool focused) { if (!focused) CancelInput(); }
    private void OnApplicationPause(bool paused) { if (paused) CancelInput(); }

    private bool CanInteract()
    {
        if (!IsInitialized || !isActiveAndEnabled || !canvas.isActiveAndEnabled) return false;
        for (int i = 0; i < canvasGroups.Length; i++)
        {
            CanvasGroup group = canvasGroups[i];
            if (group == null || !group.isActiveAndEnabled) continue;
            if (!group.interactable || !group.blocksRaycasts) return false;
            if (group.ignoreParentGroups) break;
        }
        return true;
    }

    protected virtual void Update()
    {
        if (!CanInteract()) { if (pressed) CancelInput(); return; }
        if (!UsesMouseInput) return;
        UpdateCamera();
        Vector2 position = Input.mousePosition;
        if (Input.GetMouseButtonDown(0) && mouseOwner == null &&
            ContainsScreenPoint(baseRect, position, cam) && !IsBlocked(position))
        {
            mouseOwner = this;
            BeginInput(position, -1);
        }
        if (mouseOwner != this || !pressed) return;
        if (Input.GetMouseButtonUp(0) || !Input.GetMouseButton(0)) CancelInput();
        else DragInput(position);
    }

    private static bool ContainsScreenPoint(RectTransform rect, Vector2 position, Camera camera)
    {
        Vector2 localPoint;
        return rect != null && RectTransformUtility.ScreenPointToLocalPointInRectangle(rect, position, camera, out localPoint)
            && rect.rect.Contains(localPoint);
    }

    private bool IsBlocked(Vector2 position)
    {
        if (inputBlockers != null)
            for (int i = 0; i < inputBlockers.Length; i++)
                if (inputBlockers[i] != null && inputBlockers[i].gameObject.activeInHierarchy &&
                    ContainsScreenPoint(inputBlockers[i], position, cam)) return true;
        for (int i = 0; i < controls.Length; i++)
        {
            Selectable control = controls[i];
            if (control == null || !control.isActiveAndEnabled || !control.IsInteractable() ||
                control.transform.IsChildOf(transform) || control.targetGraphic == null || !control.targetGraphic.raycastTarget) continue;
            if (ContainsScreenPoint(control.targetGraphic.rectTransform, position, cam)) return true;
        }
        return false;
    }

    protected void MoveBackground(Vector2 localDelta)
    {
        // Delta is in background-local units, while anchoredPosition is parent-local.
        background.position += background.TransformVector(new Vector3(localDelta.x, localDelta.y, 0f));
    }

    protected Vector2 ScreenPointToAnchoredPosition(Vector2 screenPosition)
    {
        UpdateCamera();
        RectTransform parent = background.parent as RectTransform;
        Vector2 localPoint;
        if (parent != null && RectTransformUtility.ScreenPointToLocalPointInRectangle(parent, screenPosition, cam, out localPoint))
        {
            Vector2 anchor = new Vector2(
                Mathf.Lerp(background.anchorMin.x, background.anchorMax.x, background.pivot.x),
                Mathf.Lerp(background.anchorMin.y, background.anchorMax.y, background.pivot.y));
            Vector2 anchorPosition = parent.rect.min + Vector2.Scale(parent.rect.size, anchor);
            return localPoint - anchorPosition;
        }
        return background.anchoredPosition;
    }
}

public enum AxisOptions { Both, Horizontal, Vertical }
