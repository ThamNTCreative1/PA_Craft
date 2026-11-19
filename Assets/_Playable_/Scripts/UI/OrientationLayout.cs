using System;
using UnityEngine;

namespace Playable
{
    // Holds two anchor layouts (portrait / landscape) for a set of RectTransforms and swaps them when the screen rotates.
    public class OrientationLayout : MonoBehaviour
    {
        [Serializable]
        public class Entry
        {
            [SerializeField] private RectTransform _target;
            [SerializeField] private Vector2 _portraitMin;
            [SerializeField] private Vector2 _portraitMax;
            [SerializeField] private Vector2 _landscapeMin;
            [SerializeField] private Vector2 _landscapeMax;

            public void Apply(bool landscape)
            {
                if (_target == null) return;
                _target.anchorMin = landscape ? _landscapeMin : _portraitMin;
                _target.anchorMax = landscape ? _landscapeMax : _portraitMax;
                _target.offsetMin = Vector2.zero;
                _target.offsetMax = Vector2.zero;
            }
        }

        [SerializeField] private Entry[] _entries;

        private int _appliedWidth = -1;
        private int _appliedHeight = -1;

        private void OnEnable()
        {
            _appliedWidth = -1;
            ApplyIfChanged();
        }

        private void LateUpdate()
        {
            ApplyIfChanged();
        }

        private void ApplyIfChanged()
        {
            if (Screen.width == _appliedWidth && Screen.height == _appliedHeight) return;
            _appliedWidth = Screen.width;
            _appliedHeight = Screen.height;
            bool landscape = Screen.width > Screen.height;
            foreach (var entry in _entries) entry.Apply(landscape);
        }
    }
}
