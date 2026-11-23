using UnityEngine;

namespace Playable.PetRescue
{
    public sealed class RescueAudioView : MonoBehaviour
    {
        [SerializeField] private AudioSource _music, _effects, _steps, _voices;
        [SerializeField] private AudioClip _start, _explosion, _petLost, _rescue, _win, _lose, _warning, _jump, _land;
        [SerializeField] private AudioClip[] _footsteps, _petCalls;
        private bool _started, _finished;
        private float _stepTime, _voiceTime = 1.2f;
        private int _stepIndex, _voiceIndex, _lastWarning = 6;
        private void Awake()
        {
            if (_music == null || _effects == null || _steps == null || _voices == null || _music.clip == null ||
                _start == null || _explosion == null || _petLost == null || _rescue == null || _win == null || _lose == null || _warning == null || _jump == null || _land == null ||
                _footsteps == null || _footsteps.Length != 2 || _petCalls == null || _petCalls.Length != 6)
                throw new System.InvalidOperationException("Pet Rescue audio references are incomplete.");
        }
        public void BeginRun()
        {
            if (_started || _finished) return;
            _started = true; _music.Play(); _effects.PlayOneShot(_start,.65f);
        }
        public void Tick(float dt, float remaining, RescuePetFollower[] pets, bool heroRunning)
        {
            if (!_started || _finished) return;
            _stepTime -= dt; _voiceTime -= dt;
            if (!heroRunning) _stepTime = 0;
            else if (_stepTime <= 0)
            {
                _stepTime = .48f; _steps.PlayOneShot(_footsteps[_stepIndex++ % _footsteps.Length],.3f);
            }
            if (_voiceTime <= 0)
            {
                _voiceTime = 2.2f;
                for (int i = 0; i < pets.Length; i++)
                {
                    int index = _voiceIndex++ % pets.Length;
                    if (!pets[index].IsFollowing) continue;
                    _voices.PlayOneShot(_petCalls[index],.3f); break;
                }
            }
            int seconds = Mathf.CeilToInt(remaining);
            if (seconds > 0 && seconds <= 5 && seconds < _lastWarning)
            { _lastWarning = seconds; _effects.PlayOneShot(_warning,.45f); }
        }
        public void PlayExplosion(bool lostPet)
        {
            if (!_started || _finished) return;
            _effects.PlayOneShot(_explosion,.85f);
            if (lostPet) _voices.PlayOneShot(_petLost,.6f);
        }
        public void PlayJump()
        {
            if (_started && !_finished) _effects.PlayOneShot(_jump,.6f);
        }
        public void PlayLand()
        {
            if (_started && !_finished) _effects.PlayOneShot(_land,.5f);
        }
        public void PlayRescue()
        {
            if (_started && !_finished) _effects.PlayOneShot(_rescue,.65f);
        }
        public void Finish(bool won)
        {
            if (_finished) return;
            _finished = true; _music.Stop(); _steps.Stop(); _voices.Stop(); _effects.Stop();
            if (_started) _effects.PlayOneShot(won ? _win : _lose,.75f);
        }
        private void OnDisable()
        {
            if (_music != null) _music.Stop();
            if (_effects != null) _effects.Stop();
            if (_steps != null) _steps.Stop();
            if (_voices != null) _voices.Stop();
        }
    }
}
