using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>
    /// Flow of the playable:
    ///  Intro (camera shows the monster chasing) -> Tut 1: swipe left/right (no obstacles yet)
    ///  -> Tut 2: time slows down until the player swipes up to jump
    ///  -> free run with End Time countdown -> CTA.
    /// Crash (monster catches the player), tutorial timeout and end of countdown all show the CTA.
    /// Luna only needs LifeCycle.GameEnded() and Playable.InstallFullGame().
    /// </summary>
    public class RunnerGameManager : MonoBehaviour
    {
        private enum State
        {
            Intro,
            TutMove,
            TutJump,
            Countdown,
            Caught,
            BloodSplash,
            Ended
        }

        public static RunnerGameManager Instance;

        [Header("Gameplay")]
        [LunaPlaygroundField("Start Speed", 1, "Gameplay")] [SerializeField]
        private float _startSpeed = 9f;

        [LunaPlaygroundField("Max Speed", 2, "Gameplay")] [SerializeField]
        private float _maxSpeed = 15f;

        [LunaPlaygroundField("Seconds To Max Speed", 3, "Gameplay")] [SerializeField]
        private float _timeToMaxSpeed = 30f;

        [Header("Tutorial")]
        [LunaPlaygroundField("Tutorial Time Limit (s)", 1, "Tutorial")] [SerializeField]
        private float _tutorialTimeLimit = 15f;

        [Tooltip("Distance (m) to the jump tutorial prompt after the first swipe.")]
        [LunaPlaygroundField("Distance After Tutorial 1 (m)", 2, "Tutorial")]
        [SerializeField] private float _jumpTutorialDistance = 40f;
        [Tooltip("Distance to the tutorial point when time starts to slow down.")]
        [SerializeField] private float _slowStartDistance = 7f;
        [Tooltip("Distance to the tutorial point where time freezes until the player swipes up.")]
        [SerializeField] private float _freezeDistance = 2.6f;
        [SerializeField] private float _slowTimeScale = 0.06f;

        [Header("End Game")]
        [Tooltip("Seconds of gameplay after the jump tutorial before endgame. The timer is hidden from the HUD.")]
        [LunaPlaygroundField("End Time After Tutorial (s)", 1, "End Game")] [SerializeField]
        private float _endTime = 15f;

        [LunaPlaygroundField("Coins For CTA (0 = off)", 2, "End Game")] [SerializeField]
        private int _coinsForCta;

        [LunaPlaygroundField("Max Replays", 3, "End Game")]
        [SerializeField, Min(0)] private int _maxReplays = 3;
        private int _replaysUsed;
        private bool _lastWin;
        private Vector3 _startPosition;
        public int ReplaysRemaining => Mathf.Max(0, _maxReplays - _replaysUsed);

        [Header("Ad Network")]
        [LunaPlaygroundField("Applovin", 1, "Ad Network")] [SerializeField]
        private bool _isApplovin;

        [Header("Intro")]
        [SerializeField] private float _introDuration = 1.8f;

        [Header("Audio")]
        [LunaPlaygroundAsset("Background Music", 1, "Audio")] [SerializeField]
        private AudioClip _backgroundMusic;

        [LunaPlaygroundAsset("Monster Start Roar", 2, "Audio")]
        [SerializeField] private AudioClip _monsterRoar;
        [LunaPlaygroundField("Music Volume", 1, "Audio")]
        [SerializeField, Range(0f, 1f)] private float _musicVolume = 0.4f;
        [LunaPlaygroundField("SFX Volume", 2, "Audio")]
        [SerializeField, Range(0f, 1f)] private float _sfxVolume = 1f;
        [LunaPlaygroundField("SFX Gain", 4, "Audio")]
        [SerializeField, Range(1f, 2f)] private float _sfxGain = 2f;
        [LunaPlaygroundField("Monster Roar Volume", 3, "Audio")]
        [SerializeField, Range(0f, 1f)] private float _roarVolume = 1f;

        [SerializeField] private AudioClip _coinSound;
        [SerializeField] private AudioClip _jumpSound;
        [SerializeField] private AudioClip _crashSound;
        [SerializeField] private AudioClip _landSound;
        [SerializeField] private AudioClip _failUiSound;
        [SerializeField] private AudioClip _timeEndUiSound;
        [SerializeField] private AudioClip _runStepSound;
        [SerializeField] private float _stepDistance = 2.2f;
        private float _stepTravel;

        [Header("Refs")]
        public RunnerPlayer player;
        public TrackGenerator track;
        public RunnerCamera runnerCamera;
        public RunnerChaser chaser;
        public RunnerUI ui;

        private State _state;
        private int _coins;
        private bool _distanceStarted;
        private float _distanceStart;
        private float _runTime;
        private float _stateTime;
        private float _tutorialTime;
        private float _countdown;
        private float _jumpTutorialZ;
        private bool _jumpTutorialShown;
        private bool _jumpPressed;
        private bool _jumpRequested;
        private float _ctaTimer = -1f;
        private bool _gameEnded;
        private int _lastCtaFrame = -1;
        private bool IsFinalResult => _state == State.Ended && (_lastWin || ReplaysRemaining == 0);
        private AudioSource _sfx;
        private AudioManager _audioManager;
        private AudioSource _roar;

        public int Coins => _coins;

        private void Awake()
        {
            Instance = this;
            Application.targetFrameRate = 60;
            Time.timeScale = 1f;
            _sfx = gameObject.AddComponent<AudioSource>();
            _sfx.playOnAwake = false;
            _sfx.volume = Mathf.Clamp01(_sfxVolume);
            _roar = gameObject.AddComponent<AudioSource>();
            _roar.playOnAwake = false;
        }

        private void Start()
        {
            _startPosition = player.transform.position;
            if (track != null)
            {
                track.obstaclesEnabled = false;
                track.Init();
            }

            if (player != null) player.Init(track, this);
            if (chaser != null) chaser.player = player;

            if (ui != null)
            {
                ui.SetDistance(0f);
                ui.SetCoins(0);
                ui.ShowMoveHand(false);
                ui.ShowJumpHand(false);
                ui.ShowCountdown(false);
                ui.HideEndPanels();
                if (ui.endCtaButton != null) ui.endCtaButton.onClick.AddListener(ShowCTA);
                if (ui.failCtaButton != null) ui.failCtaButton.onClick.AddListener(ShowCTA);
                if (ui.retryButton != null) ui.retryButton.onClick.AddListener(Replay);
            }

            _audioManager = AudioManager.Instance;
            if (_audioManager == null)
                Debug.LogWarning("[TempleRun] AudioManager is missing; background music cannot play.", this);

            PlayStartAudio();

            // The run starts right away: the monster is already chasing.
            player.SetSpeed(_startSpeed);
            player.SetRunning(true);
            BeginIntroView();
        }

        private void BeginIntroView()
        {
            // Initialize directly at the chase intro shot, then blend to gameplay once.
            if (runnerCamera != null) runnerCamera.ResetRun(_introDuration);
            player.inputEnabled = false;
            if (ui != null) ui.ShowMoveHand(false);
            SetState(State.Intro);
        }

        private void SetState(State s)
        {
            _state = s;
            _stateTime = 0f;
        }

        private void Update()
        {
            float udt = Time.unscaledDeltaTime;
            UpdateAudio();
            _stateTime += udt;

            // Final results route taps anywhere (including UI) to the store.
            if (IsFinalResult && Input.GetMouseButtonUp(0)) ShowCTA();

            if (_ctaTimer >= 0f)
            {
                _ctaTimer -= udt;
                if (_ctaTimer < 0f) ShowCTA();
            }

            switch (_state)
            {
                case State.Intro:
                    UpdateSpeed();
                    // Wait for the camera's actual completion, not a separate timer.
                    // Camera animation advances in LateUpdate after this Update.
                    if (ui != null)
                    {
                        ui.ShowMoveHand(false);
                        ui.ShowJumpHand(false);
                    }
                    if (runnerCamera != null ? !runnerCamera.IsIntroPlaying : _stateTime >= _introDuration)
                    {
                        player.inputEnabled = true;
                        if (_replaysUsed > 0)
                        {
                            _distanceStart = track != null ? track.TravelledDistance : 0f;
                            _distanceStarted = true;
                            StartCountdown();
                        }
                        else
                        {
                            if (ui != null) ui.ShowMoveHand(true);
                            SetState(State.TutMove);
                        }
                    }

                    break;

                case State.TutMove:
                    UpdateSpeed();
                    UpdateTutorialTimer(udt);
                    break;

                case State.TutJump:
                    UpdateSpeed();
                    UpdateTutorialTimer(udt);
                    if (_state == State.TutJump) UpdateJumpTutorial();
                    break;

                case State.Countdown:
                    UpdateSpeed();
                    _countdown -= Time.deltaTime;
                    if (_countdown <= 0f) EndGame(true);
                    break;
            }
        }

        private void UpdateSpeed()
        {
            _runTime += Time.deltaTime;
            float t = _timeToMaxSpeed > 0f ? Mathf.Clamp01(_runTime / _timeToMaxSpeed) : 1f;
            player.SetSpeed(Mathf.Lerp(_startSpeed, _maxSpeed, t));
        }

        private void UpdateTutorialTimer(float udt)
        {
            if (_tutorialTimeLimit <= 0f) return;
            _tutorialTime += udt;
            if (_tutorialTime >= _tutorialTimeLimit)
            {
                // Use the same catch sequence as a collision, including unfreezing tut 2.
                if (player != null && player.IsAlive) player.Crash();
                else OnPlayerCrash();
            }
        }

        private void UpdateJumpTutorial()
        {
            float pz = player.transform.position.z;
            float dist = (_jumpTutorialZ - 0.2f) - (pz + player.halfDepth);

            if (!player.IsAlive) return;

            // deltaTime remains zero during the frame that receives the swipe.
            // Keep time running until the buffered jump executes on the next frame.
            if (_jumpRequested)
            {
                Time.timeScale = 1f;
                return;
            }

            // The player swiped up: never slow/freeze again, let the jump play at normal speed.
            if (_jumpPressed)
            {
                Time.timeScale = 1f;
                if (ui != null) ui.ShowJumpHand(false);
                if (player.IsGrounded && pz > _jumpTutorialZ + 1f) StartCountdown();
                return;
            }

            if (!player.IsGrounded)
            {
                // jumping: normal speed so the jump looks right
                Time.timeScale = 1f;
                if (ui != null) ui.ShowJumpHand(false);
                return;
            }

            if (dist <= _slowStartDistance)
            {
                if (!_jumpTutorialShown)
                {
                    _jumpTutorialShown = true;
                }

                if (ui != null) ui.ShowJumpHand(true);
                float k = Mathf.InverseLerp(_slowStartDistance, _freezeDistance, dist);
                Time.timeScale = dist <= _freezeDistance ? 0f : Mathf.Lerp(1f, _slowTimeScale, k * k);
            }
        }

        private void StartCountdown()
        {
            Time.timeScale = 1f;
            if (track != null) track.obstaclesEnabled = true;
            _countdown = _endTime;
            if (ui != null) ui.ShowCountdown(false);

            SetState(State.Countdown);
        }

        #region Player callbacks

        /// <summary>Kept for compatibility: the run starts automatically, nothing is consumed.</summary>
        public bool OnPlayerInput()
        {
            return false;
        }

        public void OnLaneChangeInput()
        {
            if (_state != State.TutMove) return;
            _distanceStart = track != null ? track.TravelledDistance : 0f;
            _distanceStarted = true;
            if (ui != null) ui.SetDistance(0f);
            // Reward the first swipe with a short coin run before the jump barrier.
            if (ui != null) ui.ShowMoveHand(false);
            _jumpTutorialZ = player.transform.position.z + Mathf.Max(18f, _jumpTutorialDistance);
            if (track != null) track.SpawnJumpTutorialRow(player.transform.position.z, _jumpTutorialZ);
            _jumpPressed = false;
            _jumpRequested = false;
            _jumpTutorialShown = false;
            _tutorialTime = 0f;
            SetState(State.TutJump);
        }

        public void OnJumpInput()
        {
            if (_state != State.TutJump || !_jumpTutorialShown || !player.IsGrounded) return;
            _jumpRequested = true;
            Time.timeScale = 1f;
        }

        public void OnPlayerJump()
        {
            if (_state == State.TutJump && _jumpTutorialShown)
            {
                _jumpRequested = false;
                _jumpPressed = true;
                Time.timeScale = 1f;
                if (ui != null) ui.ShowJumpHand(false);
            }
            Play(_jumpSound, 1f);
        }

        public void OnPlayerLand()
        {
            Play(_landSound, 1f);
        }

        public void OnPlayerBump()
        {
            Play(_crashSound, 0.65f);
            if (runnerCamera != null) runnerCamera.Shake(0.12f, 0.2f);
        }

        public void OnCoinCollected()
        {
            _coins++;
            if (ui != null) ui.SetCoins(_coins);
            Play(_coinSound, 1f);
            if (_coinsForCta > 0 && _coins >= _coinsForCta) EndGame(true);
        }

        public void OnPlayerCrash()
        {
            if (_state == State.Caught || _state == State.BloodSplash || _state == State.Ended) return;
            Time.timeScale = 1f;
            if (ui != null)
            {
                ui.ShowMoveHand(false);
                ui.ShowJumpHand(false);
            }

            Play(_crashSound, 1f);
            if (runnerCamera != null) runnerCamera.Shake(0.35f, 0.4f);
            if (chaser != null) chaser.Catch();
            SetState(State.Caught);
            // let the monster reach the player, then lose -> CTA
            _endDelay = 1.1f;
        }

        #endregion

        private float _endDelay = -1f;

        /// <summary>Called by the track when the world is shifted back to the origin.</summary>
        public void ShiftZ(float dz)
        {
            _jumpTutorialZ += dz;
        }

        private void LateUpdate()
        {
            if (_distanceStarted && track != null && ui != null && _state != State.Ended)
                ui.SetDistance(track.TravelledDistance - _distanceStart);
            if ((_state != State.Caught && _state != State.BloodSplash) || _endDelay < 0f) return;
            _endDelay -= Time.unscaledDeltaTime;
            if (_endDelay < 0f) EndGame(false);
        }

        public void EndGame(bool win)
        {
            if (_state == State.Ended) return;
            if (!win && _state != State.BloodSplash)
            {
                SetState(State.BloodSplash);
                if (chaser != null) chaser.Stop();
                if (ui != null) ui.ShowBloodSplash();
                _endDelay = ui != null ? Mathf.Max(0.1f, ui.bloodSplashDuration) : 0.65f;
                return;
            }
            _lastWin = win;
            SetState(State.Ended);
            Time.timeScale = 1f;
            if (player != null)
            {
                player.inputEnabled = false;
                if (player.IsAlive) player.SetRunning(false);
            }

            if (chaser != null && win) chaser.Stop();
            if (ui != null)
            {
                ui.ShowMoveHand(false);
                ui.ShowJumpHand(false);
                ui.ShowCountdown(false);
                ui.ShowEnd(_coins, win, ReplaysRemaining);
            }

            Play(win ? _timeEndUiSound : _failUiSound, 1f);

            // A retryable failure is not the end of the playable session.
            _ctaTimer = -1f;
            if (IsFinalResult) ShowCTA();
        }

        public void Replay()
        {
            if (_state != State.Ended) return;
            if (IsFinalResult)
            {
                ShowCTA();
                return;
            }
            _replaysUsed++;
            PlayStartAudio();
            Time.timeScale = 1f;
            _ctaTimer = _endDelay = -1f;
            _coins = 0;
            _runTime = _tutorialTime = _countdown = 0f;
            _distanceStart = 0f;
            _distanceStarted = _jumpPressed = _jumpRequested = _jumpTutorialShown = false;
            player.transform.position = _startPosition;
            player.Revive();
            track.ResetRun();
            if (chaser != null) chaser.ResetRun();
            if (ui != null)
            {
                ui.HideEndPanels();
                ui.SetCoins(0);
                ui.SetDistance(0f);
                ui.ShowMoveHand(false);
                ui.ShowJumpHand(false);
                ui.ShowCountdown(false);
            }
            player.SetSpeed(_startSpeed);
            player.SetRunning(true);
            BeginIntroView();
        }

        public void ShowCTA()
        {
            // A button and the global tap handler can receive the same release.
            if (_lastCtaFrame == Time.frameCount) return;
            _lastCtaFrame = Time.frameCount;
            _ctaTimer = -1f;
            NotifyGameEnded();
            Debug.Log("[TempleRun] Show CTA");
            Luna.Unity.Playable.InstallFullGame();
        }

        private void NotifyGameEnded()
        {
            if (_gameEnded) return;
            _gameEnded = true;
            Luna.Unity.LifeCycle.GameEnded();
        }

        private void PlayStartAudio()
        {
            _stepTravel = 0f;
            _sfx.Stop();
            _roar.Stop();
            if (_audioManager != null)
            {
                _audioManager.SetMusicVolume(_musicVolume);
                _audioManager.PlayMusic(_backgroundMusic);
            }
            if (_monsterRoar != null && _roarVolume > 0f)
            {
                _roar.clip = _monsterRoar;
                _roar.volume = Mathf.Clamp01(_roarVolume);
                _roar.Play();
            }
        }

        private void UpdateAudio()
        {
            _sfx.volume = Mathf.Clamp01(_sfxVolume);
            if (player != null && player.IsAlive && player.IsRunning && player.IsGrounded)
            {
                _stepTravel += player.Speed * Time.deltaTime;
                if (_stepTravel >= Mathf.Max(0.2f, _stepDistance))
                {
                    _stepTravel = 0f;
                    Play(_runStepSound, 0.65f);
                }
            }
            else _stepTravel = 0f;
            if (_audioManager != null) _audioManager.SetMusicVolume(_musicVolume);
        }

        private void Play(AudioClip clip, float volume)
        {
            if (clip == null || _sfx == null || _sfxVolume <= 0f) return;
            _sfx.volume = Mathf.Clamp01(_sfxVolume);
            _sfx.PlayOneShot(clip, volume * Mathf.Clamp(_sfxGain, 1f, 2f));
        }

        private void OnDestroy()
        {
            Time.timeScale = 1f;
            if (Instance == this) Instance = null;
        }
    }
}
