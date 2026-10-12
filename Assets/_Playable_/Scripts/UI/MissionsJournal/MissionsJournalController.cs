using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public class MissionsJournalController : MonoBehaviour
    {
        [SerializeField] private MissionRowView[] _rows;
        [SerializeField] private JournalHandSequencer _handSequencer;
        [SerializeField] private PlayerAction _playerAction;
        [SerializeField] private PlayerController _playerController;
        [SerializeField] private Rigidbody _playerRigidbody;
        [SerializeField] private GameObject _startTutorial;
        [SerializeField] private GameObject _moveTutorial;
        [SerializeField] private Button _missionButton;
        [SerializeField] private GameObject _gamePanel;
        [SerializeField] private GameObject _title;

        [SerializeField] private MissionManager _missionManager;

        private RectTransform[] _goTargets;
        private bool _ready;
        private bool _shown;
        private Tween _titleTween;
        private Vector3 _titleScale;
        private RigidbodyConstraints _playerConstraints;

        private void Awake()
        {
            if (_missionManager == null || _rows == null || _rows.Length != 3 || _handSequencer == null ||
                _playerAction == null || _playerController == null || _playerRigidbody == null ||
                _startTutorial == null || _moveTutorial == null || _missionButton == null || _gamePanel == null)
            {
                Debug.LogError(
                    "MissionsJournalController requires three rows, hand, player, Rigidbody, tutorials, HUD button and GamePanel.",
                    this);
                enabled = false;
                return;
            }

            _goTargets = new RectTransform[_rows.Length];
            for (int i = 0; i < _rows.Length; i++)
            {
                if (_rows[i] == null || _rows[i].GoRect == null)
                {
                    Debug.LogError("MissionsJournalController has a missing row or GO button.", this);
                    enabled = false;
                    return;
                }

                _goTargets[i] = _rows[i].GoRect;
            }

            for (int i = 0; i < _rows.Length; i++) _rows[i].GoPressed += OnGoPressed;
            if (_title != null) _titleScale = _title.transform.localScale;
            _ready = true;
        }

        private void Start()
        {
            Show();
        }

        public void Show()
        {
            if (!_ready || _shown || _playerController.IsRiding) return;
            _shown = true;
            _missionManager.SetPaused(true);
            gameObject.SetActive(true);
            _playerAction.enabled = false;
            _playerController.enabled = false;
            if (_title != null)
            {
                StopTitleTween();
                _titleTween = _title.transform.DOScale(_titleScale * 1.2f, 0.5f).SetEase(Ease.Linear)
                    .SetLoops(-1, LoopType.Yoyo);
            }
            // Disabling input alone leaves the body's walking/jumping velocity active.
            _playerConstraints = _playerRigidbody.constraints;
            if (!_playerRigidbody.isKinematic)
            {
                _playerRigidbody.linearVelocity = Vector3.zero;
                _playerRigidbody.angularVelocity = Vector3.zero;
            }

            _playerRigidbody.constraints = RigidbodyConstraints.FreezeAll;
            _startTutorial.SetActive(false);
            _moveTutorial.SetActive(false);
            _gamePanel.SetActive(false);
            Canvas.ForceUpdateCanvases();
            _handSequencer.Begin(_goTargets);
        }

        public void Hide()
        {
            if (_shown) _playerRigidbody.constraints = _playerConstraints;
            _shown = false;
            _missionManager.SetPaused(false);
            gameObject.SetActive(false);
        }

        private void OnGoPressed(MissionRowView row)
        {
            if (!_shown || row == null || !_missionManager.TrySelect(row.Mission)) return;
            _handSequencer.Stop();
            Hide();
            _playerAction.enabled = true;
            _playerController.enabled = true;
            if (GameController.Instance != null)
                GameController.Instance.ShowStartTutorial(row.Mission.UsesDrivingTutorial);
            else
            {
                _startTutorial.SetActive(row.Mission.UsesDrivingTutorial);
                _moveTutorial.SetActive(row.Mission.UsesDrivingTutorial);
            }
            _gamePanel.SetActive(true);
        }

        private void OnDisable()
        {
            StopTitleTween();
        }

        private void StopTitleTween()
        {
            if (_titleTween != null) _titleTween.Kill();
            _titleTween = null;
            if (_title != null && _ready) _title.transform.localScale = _titleScale;
        }

        private void OnDestroy()
        {
            StopTitleTween();
            if (!_ready) return;
            for (int i = 0; i < _rows.Length; i++)
                if (_rows[i] != null)
                    _rows[i].GoPressed -= OnGoPressed;
        }
    }
}
