using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

// "Steal the eggs" button (source Canvas/NestSelector with FollowWorld): follows the nest on screen while the player
// stands at it; holding it down fills the ring, and the eggs are stolen when it is full.
public class StealPrompt : MonoBehaviour, IPointerDownHandler, IPointerUpHandler, IPointerExitHandler
{
    [SerializeField] private RectTransform rect;
    [Tooltip("The canvas RectTransform this prompt is placed in (screen space overlay).")]
    [SerializeField] private RectTransform canvasRect;
    [SerializeField] private Camera worldCamera;
    [SerializeField] private Image fill;
    [SerializeField] private Vector3 worldOffset = new Vector3(0, 2.5f, 0);

    public void Show(Transform target, float progress)
    {
        if (!gameObject.activeSelf) gameObject.SetActive(true);
        if (fill) fill.fillAmount = progress;
        if (worldCamera && canvasRect && rect && target)
        {
            Vector3 screen = worldCamera.WorldToScreenPoint(target.position + worldOffset);
            Vector2 local;
            if (screen.z > 0 && RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect, screen, null, out local))
                rect.anchoredPosition = local;
        }
    }

    public void Hide()
    {
        if (gameObject.activeSelf) gameObject.SetActive(false);
    }

    // Held down = stealing (the ring fills while held; released early = starts over).
    public bool IsHeld { get; private set; }

    public void OnPointerDown(PointerEventData eventData) { IsHeld = true; }
    public void OnPointerUp(PointerEventData eventData) { IsHeld = false; }
    public void OnPointerExit(PointerEventData eventData) { IsHeld = false; }

    private void OnDisable() { IsHeld = false; }
}
