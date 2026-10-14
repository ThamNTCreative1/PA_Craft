using UnityEngine;

namespace Playable
{
    public sealed class ClimbJoystick : FloatingJoystick
    {
        // The move tutorial lives under Background. Do not disable it during Start.
        protected override bool HideBackgroundOnStart => false;

        private Vector2 _origin;
        protected override void Start()
        {
            base.Start();
            if (!IsInitialized) return;
            _origin = background.anchoredPosition;
            background.gameObject.SetActive(true);
        }
        protected override void OnReleased()
        {
            background.anchoredPosition = _origin;
            background.gameObject.SetActive(true);
        }
        public void RefreshRestPosition()
        {
            _origin = background.anchoredPosition;
        }
    }
}
