using UnityEngine;

namespace Playable.PetRescue
{
    [LunaPlaygroundSection("Game Settings", 1)]
    public sealed class RescueGameFlow : MonoBehaviour
    {
        [SerializeField] private float _duration = 15, _gateZ = 65;
        [LunaPlaygroundField("End Time", 1, "Game Settings")]
        [SerializeField] private float _endGameTime = 30;
        [SerializeField] private int _required = 3;
        [SerializeField] private RescuePointerInput _pointer;
        [SerializeField] private RescueHeroMotor _hero;
        [SerializeField] private Transform _heroVisual;
        [SerializeField] private RescuePetFollower[] _pets;
        [SerializeField] private RescueTntHazard[] _hazards;
        [SerializeField] private RescueCourse _course;
        [SerializeField] private RescueCameraFollow _camera;
        [SerializeField] private RescueHudView _hud;
        [SerializeField] private RescueAudioView _audio;
        [SerializeField] private RescueEndcardView _endcard;
        [SerializeField] private RescueTutorialView _tutorial;
        [SerializeField] private RectTransform _gameplayRect;
        private LunaController _luna;
        private bool _presented;
        private bool _endGameTriggered;
        private bool _jumpHint, _jumpHintUsed;
        private float _endGameElapsed;
        private float _lastEndTimeSample;
        public RescueRules Rules { get; private set; }
        private void Awake()
        {
            if (_pointer == null || _hero == null || _heroVisual == null || _pets == null || _pets.Length < _required ||
                _hazards == null || _course == null || _camera == null || _audio == null || _endcard == null || _hud == null || _tutorial == null || _gameplayRect == null)
                throw new System.InvalidOperationException("Pet Rescue scene is missing required references.");
        }
        private void Start()
        {
            _lastEndTimeSample = Time.unscaledTime;
            _luna = new LunaController(); RescueServices.Register(_luna);
            Rules = new RescueRules(_duration, _required, _pets.Length);
            _endcard.Initialize(RescueServices.Luna.OpenStore, RescueServices.Luna.OpenStoreFromGesture);
            _pointer.Initialize(_gameplayRect, null);
            _hero.Initialize(_heroVisual);
            for (int i = 0; i < _pets.Length; i++) _pets[i].Initialize(i, _hero.transform, _pets);
            _camera.Initialize(_hero.transform); _tutorial.ShowSwipe();
            _hud.Refresh(Rules.Rescued, Rules.Remaining);
        }
        private void Update()
        {
            float now = Time.unscaledTime;
            AdvanceEndTime(Mathf.Max(0, now - _lastEndTimeSample));
            _lastEndTimeSample = now;
            if (_presented) return;
            bool pressed, swipeUp; float delta; _pointer.Sample(out pressed, out delta, out swipeUp);
            if (Rules.State == RescueRules.Phase.Waiting && pressed) { Rules.Start(); _audio.BeginRun(); }
            Rules.Tick(Time.deltaTime);
            if (Rules.State == RescueRules.Phase.Running)
            {
                Advance(Time.deltaTime, delta, swipeUp);
                _audio.Tick(Time.deltaTime, Rules.Remaining, _pets, _hero.RunningOnGround);
            }
            if (!_presented && Rules.State == RescueRules.Phase.Won) HandleWin();
            if (!_presented && Rules.State == RescueRules.Phase.Lost) HandleLose();
            _camera.Tick(Time.deltaTime);
            _hud.Refresh(Rules.Rescued, Rules.Remaining);
            _tutorial.Tick(Time.deltaTime);
            if (!_presented) for (int i = 0; i < _hazards.Length; i++) _hazards[i].TickEffect(Time.deltaTime);
        }
        private void AdvanceEndTime(float dt)
        {
            if (_endGameTriggered) return;
            _endGameElapsed += dt;
            if (_endGameElapsed < _endGameTime) return;
            _endGameTriggered = true;
            HandleEndGame();
        }
        private void Advance(float dt, float delta, bool swipeUp)
        {
            if (swipeUp && _hero.TryJump(_course))
            {
                for (int i = 0; i < _pets.Length; i++) _pets[i].Jump(_hero.JumpSpeed);
                _audio.PlayJump();
            }
            Vector3 previous = _hero.transform.position;
            _hero.Advance(dt, delta, _course);
            if (_hero.Landed) _audio.PlayLand();
            bool stuck = _hero.InPit;
            // The swipe-up tutorial is shown only for the first pit of the run.
            if (stuck && !_jumpHint && !_jumpHintUsed) { _jumpHint = true; _jumpHintUsed = true; _tutorial.ShowJump(); }
            else if (!stuck && _jumpHint) { _jumpHint = false; _tutorial.HideJump(); }
            if (!stuck && Mathf.Abs(delta) > .001f) _tutorial.OnSteered();
            {
                RescueTntHazard hit = null; float first = 2;
                for (int i = 0; i < _hazards.Length; i++)
                {
                    float fraction = _hazards[i].HitFraction(previous, _hero.transform.position);
                    if (fraction >= 0 && fraction < first) { first = fraction; hit = _hazards[i]; }
                }
                if (hit != null) Detonate(hit, -1);
            }
            for (int i = 0; i < _pets.Length; i++)
            {
                if (!_pets[i].IsFollowing) continue;
                Vector3 petPrevious = _pets[i].transform.position;
                _pets[i].Advance(dt, stuck, _course);
                RescueTntHazard hit = null; float first = 2;
                for (int j = 0; j < _hazards.Length; j++)
                {
                    float fraction = _hazards[j].HitFraction(petPrevious, _pets[i].transform.position);
                    if (fraction >= 0 && fraction < first) { first = fraction; hit = _hazards[j]; }
                }
                if (hit != null) Detonate(hit, i);
                if (_pets[i].IsFollowing && _pets[i].transform.position.z >= _gateZ && Rules.RescuePet(i))
                { _pets[i].MarkRescued(); _audio.PlayRescue(); }
            }
        }
        private void Detonate(RescueTntHazard hazard, int triggeringPet)
        {
            if (!hazard.Armed) return;
            bool lostPet = false;
            for (int i = 0; i < _pets.Length; i++)
                if (_pets[i].IsFollowing && (i == triggeringPet || hazard.ContainsBlast(_pets[i].transform.position)) && Rules.LosePet(i))
                { _pets[i].MarkLost(); lostPet = true; }
            hazard.Explode();
            _audio.PlayExplosion(lostPet);
        }

        private void StopGameplay()
        {
            _presented = true; _pointer.Cancel(); _hero.Stop(); _tutorial.Hide();
            for (int i = 0; i < _pets.Length; i++) _pets[i].Stop();
        }
        private void HandleWin() { _audio.Finish(true); StopGameplay(); RescueServices.Luna.NotifyWin(); _endcard.Show(true); }
        private void HandleLose() { _audio.Finish(false); StopGameplay(); RescueServices.Luna.NotifyLose(); _endcard.Show(false); }
        private void HandleEndGame()
        {
            _audio.Finish(false);
            StopGameplay();
            _endcard.gameObject.SetActive(false);
            RescueServices.Luna.NotifyEndGame();
            RescueServices.Luna.OpenStoreAtEndTime();
        }
        private void OnDestroy()
        {
            RescueServices.Unregister(_luna);
        }
    }
}
