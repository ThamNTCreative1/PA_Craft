using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class MissionRowView : MonoBehaviour
    {
        [SerializeField] private TMP_Text _nameLabel;
        [SerializeField] private TMP_Text _statusLabel;
        [SerializeField] private Button _goButton;
        [SerializeField] private string _missionId;

        public event Action<MissionRowView> GoPressed;
        public RectTransform GoRect => _goButton != null ? (RectTransform)_goButton.transform : null;
        [SerializeField] private MissionController _mission;
        public MissionController Mission => _mission;

        private void Awake()
        {
            if (_nameLabel == null || _statusLabel == null || _goButton == null || string.IsNullOrEmpty(_missionId))
            {
                Debug.LogError("MissionRowView requires its name, status, GO button and mission ID.", this);
                enabled = false;
                return;
            }

            _statusLabel.text = "In progress";
            _goButton.onClick.AddListener(OnGoPressed);
        }

        private void OnGoPressed()
        {
            if (isActiveAndEnabled) GoPressed?.Invoke(this);
        }

        private void OnDestroy()
        {
            if (_goButton != null) _goButton.onClick.RemoveListener(OnGoPressed);
        }
    }
}
