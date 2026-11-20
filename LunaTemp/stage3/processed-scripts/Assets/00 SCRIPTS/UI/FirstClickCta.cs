using UnityEngine;
using UnityEngine.EventSystems;

// CTA Mode 1 (LunaController): an invisible full-screen Image on top of the UI; the first click anywhere goes to the store.
// Click (pointer up), not pointer down: browsers allow opening the store from the release of a touch.
public class FirstClickCta : MonoBehaviour, IPointerDownHandler, IPointerClickHandler
{
    [SerializeField] private LunaController luna;

    public void OnPointerDown(PointerEventData eventData) { }

    public void OnPointerClick(PointerEventData eventData)
    {
        if (luna) luna.FirstClick();
    }
}
