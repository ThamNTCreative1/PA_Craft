using TMPro;
using UnityEngine;

namespace Playable
{
    public sealed class ClimbHud : MonoBehaviour
    {
        [SerializeField] private ClimbPlayer _player;
        [SerializeField] private RectTransform _track;
        [SerializeField] private RectTransform _marker;
        [SerializeField] private TMP_Text _heightText;
        [SerializeField] private TMP_Text _cupText;
        private int _cups;
        private void Start()
        {
            if (_cupText != null) _cupText.text = _cups.ToString();
        }
        private void LateUpdate()
        {
            if (_player == null || _track == null || _marker == null) return;
            Vector2 pos = _marker.anchoredPosition;
            pos.y = _player.Progress * _track.rect.height;
            _marker.anchoredPosition = pos;
            float height = _player.Height * (11f / 2.27136f);
            if (_heightText != null) _heightText.text = height < 1000f ? $"{height:F0}m" : $"{height / 1000f:F1}km";
        }
        public void AddCup(int amount)
        {
            _cups += amount;
            if (_cupText != null) _cupText.text = _cups.ToString();
        }
    }
}
