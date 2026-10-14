using UnityEngine;

namespace Playable
{
    public sealed class ClimbResponsiveHud : MonoBehaviour
    {
        [SerializeField] private RectTransform _canvas;
        [SerializeField] private RectTransform _tower;
        [SerializeField] private RectTransform _joystickBackground;
        [SerializeField] private ClimbJoystick _joystick;
        [SerializeField] private RectTransform _cameraTutorial;
        [SerializeField] private RectTransform _jumpButton;
        [SerializeField] private RectTransform _moveLabel;
        [SerializeField] private RectTransform _currency;
        [SerializeField] private RectTransform _instruction;
        [SerializeField, Min(0f)] private float _topInset = 120f;
        private Vector3 _instructionPosition;
        private RectTransform[] _targets;
        private Vector3[] _positions;
        private Vector3[] _scales;
        private Vector2[] _sizes;
        private Vector2 _lastSize;
        private readonly Vector3[] _corners = new Vector3[4];

        private void Start()
        {
            if (_instruction != null) _instructionPosition = _instruction.anchoredPosition3D;
            _targets = new[] { _joystickBackground, _cameraTutorial, _jumpButton, _moveLabel, _currency, (RectTransform)_joystick.transform };
            _positions = new Vector3[_targets.Length];
            _scales = new Vector3[_targets.Length];
            _sizes = new Vector2[_targets.Length];
            for (int i = 0; i < _targets.Length; i++)
            {
                _positions[i] = _targets[i].anchoredPosition3D;
                _scales[i] = _targets[i].localScale;
                _sizes[i] = _targets[i].sizeDelta;
            }
            ApplyLayout();
        }

        private void LateUpdate()
        {
            if (_canvas.rect.size != _lastSize) ApplyLayout();
        }

        private void ApplyLayout()
        {
            _lastSize = _canvas.rect.size;
            for (int i = 0; i < _targets.Length; i++)
            {
                _targets[i].anchoredPosition3D = _positions[i];
                _targets[i].localScale = _scales[i];
                _targets[i].sizeDelta = _sizes[i];
            }
            float width = _lastSize.x;
            float height = _lastSize.y;
            float topInset = height > width ? Mathf.Max(_topInset, height * 0.06f) : _topInset;
            if (_instruction != null)
            {
                _instruction.anchoredPosition3D = _instructionPosition;
                _instruction.position -= _canvas.TransformVector(new Vector3(0f, topInset, 0f));
            }
            if (height > width)
            {
                _tower.GetWorldCorners(_corners);
                float towerBottom = _canvas.InverseTransformPoint(_corners[0]).y - _canvas.rect.yMin;
                float rowY = Mathf.Max(110f, Mathf.Min(height * .18f, towerBottom - 155f));
                float cell = width / 3f;
                _targets[5].sizeDelta = new Vector2(cell, rowY + 150f);
                Place(_joystickBackground, .17f, rowY, Mathf.Min(1f, cell * .78f / _joystickBackground.rect.width));
                Place(_cameraTutorial, .5f, rowY, Mathf.Min(1f, cell * .86f / _cameraTutorial.rect.width));
                Place(_jumpButton, .83f, rowY, Mathf.Min(1f, cell * .78f / _jumpButton.rect.width));
                _moveLabel.localScale = _scales[3] * .8f;
                float currencyScale = Mathf.Min(1f, (width - 48f) / _currency.rect.width);
                _currency.localScale = Vector3.one * currencyScale;
                PlaceCenter(_currency, .5f, height - 24f - topInset - _currency.rect.height * currencyScale * .5f);
            }
            else _currency.position -= _canvas.TransformVector(new Vector3(0f, topInset, 0f));
            _joystick.RefreshRestPosition();
        }

        private void Place(RectTransform target, float x, float y, float scale)
        {
            target.localScale = Vector3.one * scale;
            PlaceCenter(target, x, y);
        }

        private void PlaceCenter(RectTransform target, float x, float y)
        {
            Vector3 center = _canvas.TransformPoint(new Vector3(_canvas.rect.xMin + _canvas.rect.width * x, _canvas.rect.yMin + y, 0));
            target.position += center - target.TransformPoint(target.rect.center);
        }
    }
}
