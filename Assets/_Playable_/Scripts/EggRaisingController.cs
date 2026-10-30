using UnityEngine;
using UnityEngine.UI;
using TMPro;
namespace Playable
{
    public class EggRaisingController : MonoBehaviour
    {
        public enum Phase { Selecting, Carrying, Incubating, Ready, Revealing, Complete }
        [SerializeField] private PlayerController _player;
        [SerializeField] private Transform _holdPoint, _nest;
        [SerializeField] private BoxCollider _pen;
        [SerializeField] private TutorialLineIndicator _line;
        [SerializeField] private HandTutorial _tutorial;
        [SerializeField] private CameraController _cameraInput;
        [SerializeField] private GameObject _selection;
        [SerializeField] private Button _action;
        [SerializeField] private TMP_Text _label;
        [SerializeField] private HatchCountdownOutline _countdown;
        [SerializeField] private FailPanel _cta;
        [SerializeField] private GameObject[] _eggs;
        [SerializeField] private PenWanderer[] _hatchlings, _residents;
        [SerializeField] private float _creatureScaleMultiplier = 3f;
        [SerializeField, Min(.1f)] private float _openRadius = 8f;
        [SerializeField] private AudioClip _selectSound, _placeSound, _tickSound, _readySound, _hatchSound, _ctaSound;
        private GameObject _egg;
        private int _selected, _lastTick;
        private float _elapsed;
        private bool _atPen;
        public Phase State { get; private set; }
        private void Start()
        {
            State = Phase.Selecting;
            _player.IsWorking = false; _cameraInput.enabled = false;
            _tutorial.HideAll(); _line.StopDraw();
            _action.gameObject.SetActive(false); _countdown.gameObject.SetActive(false);
            _selection.SetActive(true); _cta.gameObject.SetActive(false);
            _action.onClick.AddListener(Act);
            foreach (var resident in _residents)
            {
                resident.transform.localScale *= _creatureScaleMultiplier;
                resident.Bind(_pen);
            }
        }
        public void SelectEgg(int index)
        {
            if (State != Phase.Selecting || index < 0 || index >= _eggs.Length) return;
            _selected = index; _egg = Instantiate(_eggs[index], _holdPoint, false);
            _egg.transform.localScale *= _creatureScaleMultiplier;
            _selection.SetActive(false); State = Phase.Carrying;
            UpdateHeldEggRotation();
            _player.SetCarryingEgg(true); _player.IsWorking = true; _cameraInput.enabled = true;
            _tutorial.ShowMovementTutorial(); _line.StartDraw(_nest, _player.transform); Sound(_selectSound);
        }
        private void LateUpdate()
        {
            if (State == Phase.Carrying) UpdateHeldEggRotation();
        }
        private void UpdateHeldEggRotation()
        {
            // Follow the carrying animation's position without inheriting the hip's tilt.
            if (_egg != null)
                _egg.transform.rotation = Quaternion.Euler(0f, _player.transform.eulerAngles.y, 0f);
        }
        private bool InsidePen()
        {
            Vector3 p = _pen.transform.InverseTransformPoint(_player.transform.position) - _pen.center;
            return Mathf.Abs(p.x) < _pen.size.x * .5f && Mathf.Abs(p.z) < _pen.size.z * .5f;
        }
        private bool NearEgg()
        {
            Vector3 delta = _player.transform.position - _nest.position;
            delta.y = 0f;
            return delta.sqrMagnitude <= _openRadius * _openRadius;
        }
        private void UpdateOpenVisibility()
        {
            bool nearby = NearEgg();
            _action.gameObject.SetActive(nearby);
            _tutorial.SetStealHintVisible(nearby && State == Phase.Ready);
        }
        private void Update()
        {
            if (State == Phase.Carrying)
            {
                bool inside = InsidePen();
                if (inside != _atPen)
                {
                    _atPen = inside; _label.text = "HATCH";
                    _action.gameObject.SetActive(inside); _tutorial.SetStealHintVisible(inside);
                    if (inside) _line.StopDraw(); else _line.StartDraw(_nest, _player.transform);
                }
            }
            else if (State == Phase.Incubating)
            {
                _elapsed += Time.deltaTime; _countdown.Progress = _elapsed / 3f;
                int tick = Mathf.FloorToInt(_elapsed);
                if (tick != _lastTick && tick < 3) { _lastTick = tick; Sound(_tickSound); }
                if (_elapsed >= 3f)
                {
                    State = Phase.Ready; _action.interactable = true; _countdown.gameObject.SetActive(false);
                    Sound(_readySound);
                }
                UpdateOpenVisibility();
            }
            else if (State == Phase.Ready)
            {
                UpdateOpenVisibility();
            }
            else if (State == Phase.Revealing)
            {
                _elapsed += Time.deltaTime;
                if (_elapsed >= 3f)
                {
                    State = Phase.Complete; _cameraInput.enabled = false;
                    _player.IsWorking = false;
                    _player.GetComponent<Rigidbody>().linearVelocity = Vector3.zero;
                    _cta.transform.SetAsLastSibling(); _cta.Show();
                    GameManager.Instance.CompleteEggRaising(); Sound(_ctaSound);
                }
            }
        }
        public void Act()
        {
            if (State == Phase.Carrying && InsidePen())
            {
                State = Phase.Incubating;
                _player.SetCarryingEgg(false);
                // Put the egg ahead of the player, clamped inside the existing pen.
                Vector3 local = _pen.transform.InverseTransformPoint(_player.transform.position + _player.transform.forward * 3f);
                Vector3 half = _pen.size * .5f;
                local.x = Mathf.Clamp(local.x, _pen.center.x - half.x + 3f, _pen.center.x + half.x - 3f);
                local.z = Mathf.Clamp(local.z, _pen.center.z - half.z + 3f, _pen.center.z + half.z - 3f);
                Vector3 placement = _pen.transform.TransformPoint(local); placement.y = _nest.position.y;
                _nest.position = placement;
                _egg.transform.SetParent(null, true); _egg.transform.SetPositionAndRotation(placement, Quaternion.identity);
                AddPlacedEggCollider();
                _tutorial.HideAll(); _line.StopDraw(); _label.text = "OPEN"; _action.interactable = false;
                _countdown.Progress = 0f; _countdown.gameObject.SetActive(true); _elapsed = 0f; _lastTick = 0; Sound(_placeSound);
                UpdateOpenVisibility();
            }
            else if (State == Phase.Ready && NearEgg())
            {
                State = Phase.Revealing; _action.gameObject.SetActive(false); _tutorial.HideAll(); Destroy(_egg);
                var monster = Instantiate(_hatchlings[_selected], _nest.position, Quaternion.identity);
                monster.transform.localScale *= _creatureScaleMultiplier;
                monster.Bind(_pen);
                _elapsed = 0f; Sound(_hatchSound);
            }
        }
        private void AddPlacedEggCollider()
        {
            var renderers = _egg.GetComponentsInChildren<Renderer>();
            if (renderers.Length == 0) return;
            Bounds bounds = renderers[0].bounds;
            for (int i = 1; i < renderers.Length; i++) bounds.Encapsulate(renderers[i].bounds);
            // Added only after detaching, so the held egg never becomes part of the player's body.
            var collider = _egg.AddComponent<BoxCollider>();
            collider.center = _egg.transform.InverseTransformPoint(bounds.center);
            Vector3 scale = _egg.transform.lossyScale;
            collider.size = new Vector3(bounds.size.x / Mathf.Abs(scale.x),
                bounds.size.y / Mathf.Abs(scale.y), bounds.size.z / Mathf.Abs(scale.z));
            collider.isTrigger = false;
        }
        private void Sound(AudioClip clip) { if (AudioManager.Instance != null) AudioManager.Instance.PlayOneShot(clip); }
        private void OnDestroy() { if (_action != null) _action.onClick.RemoveListener(Act); }
    }
}
