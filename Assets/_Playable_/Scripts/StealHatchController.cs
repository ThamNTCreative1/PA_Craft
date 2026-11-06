using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    /// <summary>Connects the existing pickup/chase and incubation interactions.</summary>
    public sealed class StealHatchController : MonoBehaviour
    {
        public enum Phase { Seeking, Escaping, Raising, Ending }
        [SerializeField] private PlayerController _player;
        [SerializeField] private CameraController _camera;
        [SerializeField] private Transform _holdPoint;
        [SerializeField] private Monster _guard;
        [SerializeField] private Egg[] _eggs;
        [SerializeField] private BoxCollider _home;
        [SerializeField] private Transform _homeGate;
        [SerializeField] private EggRaisingController _raising;
        [SerializeField] private TutorialLineIndicator _line;
        [SerializeField] private HandTutorial _tutorial;
        [SerializeField] private Button _action;
        [SerializeField] private TMPro.TMP_Text _actionLabel;
        [SerializeField] private GameObject _stealTitle, _runTitle;
        [SerializeField] private BloodOverlay _blood;
        [SerializeField] private AudioClip _stealSound, _failSound;
        private Egg _candidate;
        private int _stolen;
        public Phase State { get; private set; }
        public int StolenCount => _stolen;

        private void Start()
        {
            State = Phase.Seeking;
            foreach (var egg in _eggs) egg.BindPlayer(_player);
            _guard.OnPlayerReached += Caught;
            _raising.HatchFinished += Hatched;
            _action.onClick.AddListener(Steal);
            if (GameManager.Instance != null) GameManager.Instance.GameplayEnded += Freeze;
            _player.IsWorking = true;
            _camera.enabled = true;
            _guard.StartPatrolling();
            _runTitle.SetActive(false);
            _stealTitle.SetActive(true);
            _tutorial.ShowMovementTutorial();
            GuideToNextEgg();
        }

        private void Update()
        {
            if (State == Phase.Seeking)
            {
                _candidate = null;
                float closest = float.MaxValue;
                foreach (var egg in _eggs)
                {
                    if (egg == null || !egg.CanSteal) continue;
                    float distance = (egg.transform.position - _player.transform.position).sqrMagnitude;
                    if (distance < closest) { closest = distance; _candidate = egg; }
                }
                bool available = _candidate != null;
                _actionLabel.text = "STEAL";
                _action.interactable = true;
                _action.gameObject.SetActive(available);
                _tutorial.SetStealHintVisible(available);
            }
            else if (State == Phase.Escaping && InsideHome())
            {
                State = Phase.Raising;
                _guard.ReturnToNest();
                _runTitle.SetActive(false);
            }
        }

        private bool InsideHome()
        {
            Vector3 p = _home.transform.InverseTransformPoint(_player.transform.position) - _home.center;
            Vector3 half = _home.size * .5f;
            return Mathf.Abs(p.x) <= half.x && Mathf.Abs(p.z) <= half.z;
        }

        public void Steal()
        {
            if (State != Phase.Seeking || _candidate == null) return;
            Egg egg = _candidate;
            if (!egg.TryPickUp(_player, _holdPoint)) return;
            _stolen++;
            _player.SetCarryingEgg(true);
            _tutorial.HideAll();
            _stealTitle.SetActive(false);
            _action.gameObject.SetActive(false);
            if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(_stealSound);
            if (_stolen >= 2)
            {
                State = Phase.Ending;
                GameManager.Instance.CompleteStealAndHatch(false);
                return;
            }
            State = Phase.Escaping;
            _raising.BeginStolenEgg(egg);
            _guard.StartChasing(_player.transform);
            _runTitle.SetActive(true);
            _line.StartDraw(_homeGate, _player.transform);
        }

        private void Hatched()
        {
            if (State == Phase.Ending) return;
            State = Phase.Seeking;
            _candidate = null;
            _stealTitle.SetActive(true);
            GuideToNextEgg();
        }

        private void GuideToNextEgg()
        {
            Egg target = null;
            float closest = float.MaxValue;
            foreach (var egg in _eggs)
            {
                if (egg == null || egg.IsHeld) continue;
                float distance = (egg.transform.position - _player.transform.position).sqrMagnitude;
                if (distance < closest) { closest = distance; target = egg; }
            }
            if (target != null) _line.StartDraw(target.transform, _player.transform);
        }

        private void Caught()
        {
            if (State != Phase.Escaping) return;
            // Returning home wins the same-frame race with a contact at the gate.
            if (InsideHome()) { _guard.ReturnToNest(); State = Phase.Raising; return; }
            if (_blood != null) _blood.Show();
            if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(_failSound);
            GameManager.Instance.CompleteStealAndHatch(true);
        }

        private void Freeze()
        {
            State = Phase.Ending;
            _raising.enabled = false;
            _player.IsWorking = false;
            var body = _player.GetComponent<Rigidbody>();
            body.linearVelocity = Vector3.zero;
            body.angularVelocity = Vector3.zero;
            _player.ShowHomeIdle();
            _camera.enabled = false;
            _guard.Stop();
            _line.StopDraw();
            _tutorial.HideAll();
            _action.gameObject.SetActive(false);
            _runTitle.SetActive(false);
            _stealTitle.SetActive(false);
        }

        private void OnDestroy()
        {
            if (_guard != null) _guard.OnPlayerReached -= Caught;
            if (_raising != null) _raising.HatchFinished -= Hatched;
            if (_action != null) _action.onClick.RemoveListener(Steal);
            if (GameManager.Instance != null) GameManager.Instance.GameplayEnded -= Freeze;
        }
    }
}
