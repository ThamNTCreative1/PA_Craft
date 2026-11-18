using System;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Playable
{
    /// <summary>
    /// Press / release events for the fishing action button (ported from party-craft): reel taps count on touch down;
    /// a release is also sent when the button is hidden mid-press.
    /// </summary>
    public sealed class FishingHoldButton : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
    {
        public event Action Pressed;
        public event Action Released;

        public bool IsPressed { get; private set; }

        public void OnPointerDown(PointerEventData eventData)
        {
            if (IsPressed) return;
            IsPressed = true;
            if (Pressed != null) Pressed();
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            ReleaseIfPressed();
        }

        private void OnDisable()
        {
            ReleaseIfPressed();
        }

        private void ReleaseIfPressed()
        {
            if (!IsPressed) return;
            IsPressed = false;
            if (Released != null) Released();
        }
    }
}
