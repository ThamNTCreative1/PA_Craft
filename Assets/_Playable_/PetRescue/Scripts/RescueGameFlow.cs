using UnityEngine;

namespace Playable.PetRescue
{
    /// Orchestrates the open-field round: drag to move, collect pets by proximity, avoid TNT, 15 s countdown.
    /// 5 hearts → store + endcard; time up → endcard (store on tap). The global End Time still opens the store.
    [LunaPlaygroundSection("Game Settings", 1)]
    public sealed class RescueGameFlow : MonoBehaviour
    {
        [SerializeField] private float _duration = 15;
        [LunaPlaygroundField("End Time", 1, "Game Settings")]
        [SerializeField] private float _endGameTime = 30;
        [SerializeField] private int _required = 5;
        [SerializeField] private float _attractRadius = 1.6f, _tntWarningDistance = 3;
        /// Camera yaw degrees per full screen-width swipe; feet height above which TNT is cleared by a jump.
        [SerializeField] private float _lookSensitivity = 200, _jumpClearHeight = .35f;
        [SerializeField] private int _petSeed = 7;
        [SerializeField] private RescuePointerInput _pointer;
        [SerializeField] private RescueHeroMotor _hero;
        [SerializeField] private Transform _heroVisual;
        [SerializeField] private RescuePetFollower[] _pets;
        [SerializeField] private RescueTntHazard[] _hazards;
        [SerializeField] private RescueArena _arena;
        [SerializeField] private RescueCameraFollow _camera;
        [SerializeField] private RescueHudView _hud;
        [SerializeField] private RescueAudioView _audio;
        [SerializeField] private RescueEndcardView _endcard;
        [SerializeField] private RescueTutorialView _tutorial;
        [SerializeField] private RescueHeartFeedback _feedback;
        [SerializeField] private RescueControlsView _controls;
        private LunaController _luna;
        private bool _presented, _endGameTriggered;
        private float _endGameElapsed, _lastEndTimeSample;
        public RescueRules Rules { get; private set; }
        public RescueTutorialFlow Tutorial { get; private set; }

        private void Awake()
        {
            if (_pointer == null || _hero == null || _heroVisual == null || _pets == null || _pets.Length < _required ||
                _hazards == null || _arena == null || _camera == null || _audio == null || _endcard == null || _hud == null ||
                _tutorial == null || _feedback == null || _controls == null)
                throw new System.InvalidOperationException("Pet Rescue scene is missing required references.");
        }

        private void Start()
        {
            _lastEndTimeSample = Time.unscaledTime;
            _luna = new LunaController(); RescueServices.Register(_luna);
            Initialize();
        }

        /// Wires every actor; separated from Start so EditMode scene tests can drive a round without Luna.
        public void Initialize()
        {
            Rules = new RescueRules(_duration, _required, _pets.Length);
            Tutorial = new RescueTutorialFlow();
            _endcard.Initialize(OpenStoreFromGesture);
            _pointer.Cancel();
            _hero.Initialize(_heroVisual);
            for (int i = 0; i < _pets.Length; i++) _pets[i].Initialize(i, _hero.transform, _pets, _arena, _petSeed * 31 + i);
            _feedback.Initialize();
            _controls.ApplyScreenLayout(Screen.width, Screen.height, Screen.safeArea);
            _camera.Initialize(_hero.transform);
            _hud.Refresh(0, Rules.Remaining);
            ApplyTutorial();
        }

        private void Update()
        {
            float now = Time.unscaledTime;
            AdvanceEndTime(Mathf.Max(0, now - _lastEndTimeSample));
            _lastEndTimeSample = now;
            if (_presented) return;
            _controls.ApplyScreenLayout(Screen.width, Screen.height, Screen.safeArea);
            Vector2 stickCenter; float stickRadius; Rect jumpRect;
            _controls.GetZones(out stickCenter, out stickRadius, out jumpRect);
            _pointer.SetZones(stickCenter, stickRadius, jumpRect);
            _pointer.Sample();
            Step(Time.deltaTime, _pointer.Pressed, _pointer.Stick, _pointer.LookDelta / Mathf.Max(1, Screen.width), _pointer.JumpPressed);
            // Controls stay on screen during play; the tutorial ring covers the joystick while the drag hint shows.
            if (!_presented) _controls.Show(_pointer.Stick, !Tutorial.DragVisible, _pointer.JumpPressed, Tutorial.JumpHintVisible, Time.deltaTime);
            else _controls.Hide();
            _camera.Tick(Time.deltaTime);
            _tutorial.ApplyScreenLayout(Screen.width, Screen.height, _controls.LeftInset, _controls.RightInset);
            _tutorial.Tick(Time.deltaTime);
        }

        /// One gameplay frame (input already sampled).
        /// `look` is the camera swipe as a fraction of the screen width; `stick` is screen-relative (rotated by the camera yaw).
        public void Step(float dt, bool pressed, Vector2 stick, float look = 0, bool jump = false)
        {
            if (_presented) return;
            if (Rules.State == RescueRules.Phase.Waiting && pressed) { Rules.Start(); _audio.BeginRun(); }
            Rules.Tick(dt);
            if (Rules.State == RescueRules.Phase.Running) Advance(dt, stick, look, jump);
            // Pets already roam while the drag hint waits for the first touch.
            else if (Rules.State == RescueRules.Phase.Waiting) for (int i = 0; i < _pets.Length; i++) _pets[i].Tick(dt);
            for (int i = 0; i < _hazards.Length; i++) _hazards[i].TickEffect(dt);
            if (Rules.State == RescueRules.Phase.Won) HandleWin();
            else if (Rules.State == RescueRules.Phase.Lost) HandleTimeUp();
            if (_presented) return;
            _hud.Refresh(Rules.Rescued, Rules.Remaining);
            ApplyTutorial();
        }

        private void Advance(float dt, Vector2 stick, float look, bool jump)
        {
            if (look != 0) _camera.AddYaw(look * _lookSensitivity);
            if (jump && _hero.TryJump())
            {
                for (int i = 0; i < _pets.Length; i++) _pets[i].Hop(_hero.JumpSpeed);
                _audio.PlayJump(); Tutorial.OnJumped();
            }
            Vector3 previous = _hero.transform.position;
            _hero.Move(dt, ToWorld(stick, _camera.Yaw), _arena);
            Tutorial.Tick(dt, _hero.Moving, stick.magnitude);
            _audio.Tick(dt, Rules.Remaining, _pets, _hero.Moving);
            CheckHazards(previous);
            for (int i = 0; i < _pets.Length; i++)
            {
                var pet = _pets[i];
                pet.Tick(dt);
                if (pet.Collected || Rules.State != RescueRules.Phase.Running) continue;
                if (FlatDistance(pet.transform.position, _hero.transform.position) > _attractRadius) continue;
                if (!Rules.RescuePet(i)) continue;
                int slot = Rules.Rescued - 1;
                pet.Collect(slot);
                _feedback.Play(slot, pet.transform.position);
                _audio.PlayCollect();
                Tutorial.OnPetCollected();
            }
        }

        private void CheckHazards(Vector3 previous)
        {
            Vector3 now = _hero.transform.position;
            // Mid-jump the hero clears TNT (approach warnings still count).
            bool clear = _hero.Height > _jumpClearHeight;
            RescueTntHazard hit = null; int hitIndex = -1; float first = 2;
            for (int i = 0; i < _hazards.Length; i++)
            {
                var hazard = _hazards[i];
                if (!hazard.Armed) continue;
                if (hazard.DistanceTo(now) <= _tntWarningDistance) Tutorial.OnTntApproached(i, false);
                if (clear) continue;
                float fraction = hazard.HitFraction(previous, now);
                if (fraction >= 0 && fraction < first) { first = fraction; hit = hazard; hitIndex = i; }
            }
            if (hit == null) return;
            Tutorial.OnTntApproached(hitIndex, true);
            hit.Explode();
            // Sound first, right with the blast, so it never depends on the later reaction code.
            _audio.PlayExplosion(false); _audio.PlayHit();
            _hero.Knockback(hit.transform.position);
            for (int i = 0; i < _pets.Length; i++)
                if (!_pets[i].Collected && hit.ContainsBlast(_pets[i].transform.position)) _pets[i].ScatterFrom(hit.transform.position);
        }

        private void ApplyTutorial()
        {
            _tutorial.SetHint(Tutorial.DragVisible, Tutorial.TitleVisible);
            _tutorial.SetJumpTap(Tutorial.JumpTapVisible);
            var pet = NearestWanderingPet();
            _tutorial.SetPetPointer(Tutorial.PetPointerVisible && pet != null, pet != null ? pet.transform.position : Vector3.zero);
            bool tnt = Tutorial.TntWarningVisible && Tutorial.TntIndex >= 0;
            _tutorial.SetTntWarning(tnt, tnt ? _hazards[Tutorial.TntIndex].transform.position : Vector3.zero);
        }

        private RescuePetFollower NearestWanderingPet()
        {
            RescuePetFollower best = null; float bestDistance = float.MaxValue;
            Vector3 hero = _hero.transform.position;
            for (int i = 0; i < _pets.Length; i++)
            {
                if (_pets[i].Collected) continue;
                float d = FlatDistance(_pets[i].transform.position, hero);
                if (d < bestDistance) { bestDistance = d; best = _pets[i]; }
            }
            return best;
        }

        /// Screen-relative stick → world XZ direction for a camera looking along `yaw`.
        public static Vector2 ToWorld(Vector2 stick, float yaw)
        {
            Vector3 world = Quaternion.Euler(0, yaw, 0) * new Vector3(stick.x, 0, stick.y);
            return new Vector2(world.x, world.z);
        }

        private static float FlatDistance(Vector3 a, Vector3 b)
        {
            float dx = a.x - b.x, dz = a.z - b.z;
            return Mathf.Sqrt(dx * dx + dz * dz);
        }

        private void AdvanceEndTime(float dt)
        {
            if (_endGameTriggered) return;
            _endGameElapsed += dt;
            if (_endGameElapsed < _endGameTime) return;
            _endGameTriggered = true;
            HandleEndGame();
        }

        private void StopGameplay()
        {
            _presented = true; _pointer.Cancel(); _hero.Stop(); Tutorial.Finish(); _tutorial.Hide();
            _feedback.Complete(); _controls.Hide();
            for (int i = 0; i < _pets.Length; i++) _pets[i].Stop();
            _hud.Refresh(Rules.Rescued, Rules.Remaining);
        }

        private void HandleWin()
        {
            _audio.Finish(true); StopGameplay();
            if (Application.isPlaying) { RescueServices.Luna.NotifyWin(); RescueServices.Luna.OpenStore(); }
            _endcard.Show(true);
        }

        private void HandleTimeUp()
        {
            _audio.Finish(false); StopGameplay();
            if (Application.isPlaying) RescueServices.Luna.NotifyLose();
            _endcard.Show(false);
        }

        private void HandleEndGame()
        {
            if (!_presented) { _audio.Finish(false); StopGameplay(); }
            _endcard.gameObject.SetActive(false);
            RescueServices.Luna.NotifyEndGame();
            RescueServices.Luna.OpenStoreAtEndTime();
        }

        private void OpenStoreFromGesture() { RescueServices.Luna.OpenStoreFromGesture(); }

        private void OnDestroy()
        {
            if (_luna != null) RescueServices.Unregister(_luna);
        }
    }
}
