using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable
{
    [DisallowMultipleComponent]
    [RequireComponent(typeof(RectTransform))]
    public class TouchController : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
    {
        [Header("Layout")]
        [SerializeField] private bool _fillRightHalfOfParent = true;

        [Header("Look")]
        [SerializeField] private float _dragSensitivity = 1f;
        [SerializeField] private bool _useUnscaledDelta = true;
        [SerializeField] private bool _normalizeByDeltaTime = true;
        public bool externalPointerInput;

        private RectTransform _rectTransform;
        private int _pointerId = int.MinValue;
        private Vector2 _lastPointerPosition;
        private bool _isApplyingLayout;

        public event Action<Vector2> OnLookDelta;

        private void Awake()
        {
            CacheRectTransform();
            RefreshLayout();
        }

        private void OnEnable()
        {
            RefreshLayout();
        }

        private void OnRectTransformDimensionsChange()
        {
            RefreshLayout();
        }

        public void RefreshLayout()
        {
            if (!_fillRightHalfOfParent || _isApplyingLayout)
            {
                return;
            }

            CacheRectTransform();

            if (_rectTransform == null)
            {
                return;
            }

            _isApplyingLayout = true;
            _rectTransform.anchorMin = new Vector2(0.5f, 0f);
            _rectTransform.anchorMax = Vector2.one;
            _rectTransform.pivot = new Vector2(0.5f, 0.5f);
            _rectTransform.anchoredPosition = Vector2.zero;
            _rectTransform.sizeDelta = Vector2.zero;
            _isApplyingLayout = false;
        }

        public void OnPointerDown(PointerEventData eventData)
        {
            if (!externalPointerInput) BeginPointer(eventData.pointerId, eventData.position);
        }

        public void BeginPointer(int id, Vector2 position)
        {
            _pointerId = id;
            _lastPointerPosition = position;
        }

        public void OnDrag(PointerEventData eventData)
        {
            if (!externalPointerInput) MovePointer(eventData.pointerId, eventData.position);
        }

        public void MovePointer(int id, Vector2 position)
        {
            if (id != _pointerId)
            {
                return;
            }

            Vector2 pointerDelta = position - _lastPointerPosition;
            _lastPointerPosition = position;

            float deltaTime = _useUnscaledDelta
                ? Mathf.Max(Time.unscaledDeltaTime, 0.0001f)
                : Mathf.Max(Time.deltaTime, 0.0001f);

            Vector2 normalizedDelta = pointerDelta * (_normalizeByDeltaTime ? _dragSensitivity / (deltaTime * 60f) : _dragSensitivity);
            OnLookDelta?.Invoke(normalizedDelta);
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            if (!externalPointerInput) EndPointer(eventData.pointerId);
        }

        public void EndPointer(int id)
        {
            if (id != _pointerId)
            {
                return;
            }

            _pointerId = int.MinValue;
        }

        private void CacheRectTransform()
        {
            if (_rectTransform == null)
            {
                _rectTransform = transform as RectTransform;
            }
        }

#if UNITY_EDITOR
        private void OnValidate()
        {
            CacheRectTransform();
            RefreshLayout();
        }
#endif
    }
}
