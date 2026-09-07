using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;

/// <summary>
/// Component gắn vào từng Card UI để bắt tương tác nhấn/chọn card.
/// Tự động thông báo ẩn HandTutorialUI khi người chơi click vào card.
/// </summary>
public class CardUIItem : MonoBehaviour, IPointerClickHandler, IPointerDownHandler, IPointerUpHandler
{
    [Header("Card Settings")]
    [Tooltip("Chỉ số định danh cho Card này (ví dụ 0, 1, 2, 3)")]
    [SerializeField] private int cardId = 0;

    [Header("Click Feedback (Juice)")]
    [Tooltip("Card có hiệu ứng co lại khi chạm không?")]
    [SerializeField] private bool enablePressBounce = true;

    [Tooltip("Tỉ lệ co khi ngón tay đang ấn giữ trên card")]
    [SerializeField] private float pressScale = 0.92f;

    [Header("Events")]
    public UnityEvent<int> onCardClicked = new UnityEvent<int>();

    private RectTransform _rectTransform;
    private Vector3 _originalScale = Vector3.one;
    private bool _isInteractable = true;

    public int CardId
    {
        get => cardId;
        set => cardId = value;
    }
    public bool IsInteractable
    {
        get => _isInteractable;
        set => _isInteractable = value;
    }

    private void Awake()
    {
        _rectTransform = GetComponent<RectTransform>();
        _originalScale = _rectTransform.localScale;
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (!_isInteractable) return;

        if (enablePressBounce)
        {
            _rectTransform.localScale = _originalScale * pressScale;
        }
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (!_isInteractable) return;

        if (enablePressBounce)
        {
            _rectTransform.localScale = _originalScale;
        }
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        if (!_isInteractable) return;

        // 1. Ẩn Tutorial Hand nếu đang hiển thị
        if (HandTutorialUI.Instance != null)
        {
            HandTutorialUI.Instance.HideTutorial();
        }

        // 2. Kích hoạt sự kiện card được click
        onCardClicked?.Invoke(cardId);
    }
}
