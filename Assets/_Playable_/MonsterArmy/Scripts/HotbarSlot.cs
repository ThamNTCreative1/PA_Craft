using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace Playable.MonsterArmy
{
    [RequireComponent(typeof(Image))]
    public sealed class HotbarSlot : MonoBehaviour, IPointerDownHandler, IPointerUpHandler,
        IBeginDragHandler, IDragHandler, IEndDragHandler, ICanvasRaycastFilter
    {
        private int _index;
        private Action<int> _onDragBegin, _onTap;
        private Action _onTouch;
        private ScrollRect _scroll;
        private bool _gesture, _scrolling;

        public void Bind(int index, Action<int> onDragBegin, Action<int> onTap, Action onTouch, ScrollRect scroll)
        {
            _index = index;
            _onDragBegin = onDragBegin;
            _onTap = onTap;
            _onTouch = onTouch;
            _scroll = scroll;
        }

        public bool IsRaycastLocationValid(Vector2 screenPoint, Camera eventCamera)
        {
            return _scroll == null || !_scroll.enabled ||
                RectTransformUtility.RectangleContainsScreenPoint(_scroll.viewport, screenPoint, eventCamera);
        }

        public void OnPointerDown(PointerEventData eventData)
        {
            _gesture = _scrolling = false;
            _scroll?.StopMovement();
            _onTouch?.Invoke();
        }

        public void OnBeginDrag(PointerEventData eventData)
        {
            _gesture = true;
            Vector2 delta = eventData.position - eventData.pressPosition;
            _scrolling = _scroll != null && _scroll.enabled && Mathf.Abs(delta.y) > Mathf.Abs(delta.x);
            if (_scrolling) _scroll.OnBeginDrag(eventData);
            else _onDragBegin?.Invoke(_index);
        }

        public void OnDrag(PointerEventData eventData)
        {
            if (_scrolling)
            {
                _onTouch?.Invoke();
                _scroll.OnDrag(eventData);
            }
        }

        public void OnEndDrag(PointerEventData eventData)
        {
            if (_scrolling) _scroll.OnEndDrag(eventData);
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            if (!_gesture) _onTap?.Invoke(_index);
        }
    }
}
