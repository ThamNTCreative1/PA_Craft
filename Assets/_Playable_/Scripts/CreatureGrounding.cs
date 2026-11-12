using UnityEngine;

namespace Playable
{
    /// <summary>Editor-baked sole contacts keep animated feet on the floor without runtime mesh baking.</summary>
    [DefaultExecutionOrder(50)]
    public sealed class CreatureGrounding : MonoBehaviour
    {
        [SerializeField] private Transform _visual;
        [SerializeField] private Transform[] _contactBones;
        [SerializeField] private Vector3[] _contactPoints;
        [SerializeField] private float[] _contactWeights;
        [SerializeField, Min(0f)] private float _smoothingTime;
        private float _heightOffset, _heightVelocity;
        private bool _hasHeightOffset;
        private void OnEnable() { _hasHeightOffset = false; _heightVelocity = 0f; }
        private void LateUpdate()
        {
            if (_visual == null || _contactBones == null || _contactPoints == null) return;
            float bottom = float.MaxValue;
            if (_contactWeights == null) return;
            for (int i = 0; i + 3 < _contactBones.Length && i + 3 < _contactPoints.Length && i + 3 < _contactWeights.Length; i += 4)
            {
                float y = 0f, weight = 0f;
                for (int j = 0; j < 4; j++)
                    if (_contactBones[i + j] != null && _contactWeights[i + j] > 0f)
                    {
                        y += _contactBones[i + j].TransformPoint(_contactPoints[i + j]).y * _contactWeights[i + j];
                        weight += _contactWeights[i + j];
                    }
                if (weight > .001f) bottom = Mathf.Min(bottom, y / weight);
            }
            if (bottom == float.MaxValue) return;
            float floor = transform.position.y;
            float targetOffset = _visual.position.y - bottom;
            if (!_hasHeightOffset || _smoothingTime <= 0f)
                _heightOffset = targetOffset;
            else
                _heightOffset = Mathf.SmoothDamp(_heightOffset, targetOffset, ref _heightVelocity, _smoothingTime);
            _hasHeightOffset = true;
            var position = _visual.position;
            position.y = floor + _heightOffset;
            _visual.position = position;
        }
    }
}

