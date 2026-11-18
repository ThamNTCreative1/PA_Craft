using UnityEngine;

namespace Playable
{
    /// <summary>Draws the fishing line from the rod tip to the bobber with a small sag.</summary>
    [RequireComponent(typeof(LineRenderer))]
    public sealed class FishingLineView : MonoBehaviour
    {
        [SerializeField] private Transform _rodTip;
        [SerializeField] private Transform _bobber;
        [SerializeField] private int _segments = 10;
        [SerializeField] private float _sag = 0.6f;

        private LineRenderer _line;
        private bool _visible;

        public Transform RodTip => _rodTip;
        public Transform Bobber => _bobber;

        private void Awake()
        {
            _line = GetComponent<LineRenderer>();
            _line.useWorldSpace = true;
            _line.positionCount = Mathf.Max(2, _segments);
            SetVisible(false);
        }

        public void SetVisible(bool visible)
        {
            _visible = visible;
            if (_line == null) _line = GetComponent<LineRenderer>();
            _line.enabled = visible;
            if (_bobber != null) _bobber.gameObject.SetActive(visible);
            if (visible) Redraw();
        }

        /// <summary>Hides only the bobber (the line stays), e.g. while a caught fish hangs on the hook.</summary>
        public void SetBobberVisible(bool visible)
        {
            if (_bobber != null) _bobber.gameObject.SetActive(_visible && visible);
        }

        public void SetBobberPosition(Vector3 position)
        {
            if (_bobber != null) _bobber.position = position;
        }

        private void LateUpdate()
        {
            if (_visible) Redraw();
        }

        private void Redraw()
        {
            if (_rodTip == null || _bobber == null) return;
            Vector3 a = _rodTip.position;
            Vector3 b = _bobber.position;
            int count = _line.positionCount;
            for (int i = 0; i < count; i++)
            {
                float t = i / (float)(count - 1);
                Vector3 p = Vector3.Lerp(a, b, t);
                p.y -= Mathf.Sin(t * Mathf.PI) * _sag;
                _line.SetPosition(i, p);
            }
        }
    }
}
