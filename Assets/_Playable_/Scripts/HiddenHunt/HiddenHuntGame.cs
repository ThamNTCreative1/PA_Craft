using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    public sealed class HiddenHuntGame : MonoBehaviour
    {
        public enum HuntStage { Shoot, Turning, Look, Move, Free, Ended }
        [SerializeField] private GameManager _manager;
        [SerializeField] private HuntPlayer _player;
        [SerializeField] private HuntWeapon _weapon;
        [SerializeField] private HuntHUD _hud;
        [SerializeField] private Button _fireButton;
        [SerializeField] private HiddenHuntTarget[] _targets;
        [SerializeField] private LayerMask _shotMask = ~0;
        private float _nextShot, _lookDistance;
        public int Kills { get; private set; }
        public HuntStage Stage { get; private set; } = HuntStage.Ended;
        private void Start()
        {
            if (_manager == null || _player == null || _weapon == null || _hud == null || _fireButton == null || _player.ViewCamera == null)
            {
                Debug.LogError("Hidden Hunt is missing a required gameplay reference.", this);
                if (_player != null) _player.StopControls();
                if (_fireButton != null) _fireButton.interactable = false;
                enabled = false;
                return;
            }
            _manager.GameplayEnded += Ended;
            _fireButton.onClick.AddListener(Fire);
            _player.Looked += Looked;
            _player.Moved += Moved;
            _hud.SetCount(0);
            if (_manager.HasEnded) { Ended(); return; }
            HiddenHuntTarget first = FindNextTarget();
            if (first == null)
            {
                Debug.LogError("Hidden Hunt needs at least one active, living target.", this);
                Ended();
                return;
            }
            Stage = HuntStage.Shoot;
            _fireButton.interactable = true;
            _player.CanMove = _player.CanLook = false;
            _player.AimAt(first.AimPoint, 0);
            _hud.ShowShoot();
        }
        public void Fire()
        {
            if (!isActiveAndEnabled || Stage == HuntStage.Ended || Stage == HuntStage.Turning || _manager.HasEnded || Time.time < _nextShot) return;
            _nextShot = Time.time + 0.22f;
            _weapon.Fire();
            Ray ray = _player.ViewCamera.ViewportPointToRay(new Vector3(0.5f, 0.5f));
            RaycastHit hit;
            if (!Physics.Raycast(ray, out hit, Mathf.Infinity, _shotMask, QueryTriggerInteraction.Ignore)) return;
            HiddenHuntTarget target = hit.collider.GetComponentInParent<HiddenHuntTarget>();
            if (target == null || System.Array.IndexOf(_targets, target) < 0 || !target.Hit()) return;
            Kills++;
            _hud.SetCount(Kills);
            _manager.CountEvent();
            if (_manager.HasEnded) return;
            HiddenHuntTarget next = FindNextTarget();
            // A configured CTA threshold may exceed the number of authored targets.
            if (next == null)
            {
                _manager.EndGame();
                _manager.ScheduleCTA();
                return;
            }
            if (Kills != 1) return;
            Stage = HuntStage.Turning;
            _fireButton.interactable = false;
            _hud.ShowTurning();
            _player.AimAt(next.AimPoint, 0.8f, () =>
            {
                if (!isActiveAndEnabled || Stage != HuntStage.Turning || _manager.HasEnded) return;
                Stage = HuntStage.Look;
                _player.CanLook = _player.CanMove = true;
                _fireButton.interactable = true;
                _hud.ShowLook();
            });
        }
        private HiddenHuntTarget FindNextTarget()
        {
            if (_targets == null) return null;
            for (int i = 0; i < _targets.Length; i++)
            {
                HiddenHuntTarget target = _targets[i];
                if (target != null && target.isActiveAndEnabled && target.IsAlive) return target;
            }
            return null;
        }
        private void Looked(float amount)
        {
            if (Stage != HuntStage.Look) return;
            _lookDistance += amount;
            if (_lookDistance < 9f) return;
            Stage = HuntStage.Move;
            _hud.ShowMove();
        }
        private void Moved()
        {
            if (Stage != HuntStage.Move) return;
            Stage = HuntStage.Free;
            _hud.HideTutorial();
        }
        private void Ended()
        {
            Stage = HuntStage.Ended;
            _player.StopControls();
            _fireButton.interactable = false;
            _hud.HideAllTutorials();
        }
        private void OnDestroy()
        {
            if (_manager != null) _manager.GameplayEnded -= Ended;
            if (_fireButton != null) _fireButton.onClick.RemoveListener(Fire);
            if (_player != null)
            {
                _player.Looked -= Looked;
                _player.Moved -= Moved;
            }
        }
    }
}
