using UnityEngine;

namespace Playable
{
    public class EncounterEffects : MonoBehaviour
    {
        [SerializeField] private AudioSource _footstepSource, _gunSource, _monsterSource;
        [SerializeField] private AudioClip _footstep, _shot, _roar;
        [SerializeField] private ParticleSystem _muzzle;
        [SerializeField] private ParticleSystem _blood;
        [SerializeField] private Transform _hitPoint, _viewCamera;
        private float _voiceEnd;
        public void BeginRun()
        {
            // The supplied clip is a full footstep sequence, not a single step.
            _footstepSource.clip = _footstep;
            _footstepSource.loop = true;
            _footstepSource.volume = 1f;
            _footstepSource.Play();
        }
        public void Encounter()
        {
            _footstepSource.Stop();
            Voice(0.85f, 1f, 1.8f);
        }
        public void Shot()
        {
            _gunSource.PlayOneShot(_shot, 1f);
            _muzzle.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            _muzzle.Play(true);
            if (_blood && _hitPoint && _viewCamera)
            {
                _blood.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
                _blood.transform.position = _hitPoint.position;
                _blood.transform.rotation = Quaternion.LookRotation(_viewCamera.position - _hitPoint.position);
                _blood.Play(true);
            }
            Voice(1.15f, 0.65f, 0.55f);
        }
        private void Voice(float pitch, float volume, float duration)
        {
            _monsterSource.Stop();
            _monsterSource.pitch = pitch;
            _monsterSource.clip = _roar;
            _monsterSource.volume = volume;
            _monsterSource.Play();
            _voiceEnd = Time.time + duration;
        }
        private void Update()
        {
            if (_monsterSource.isPlaying && Time.time >= _voiceEnd)
                _monsterSource.Stop();
        }
        private void OnDisable()
        {
            if (_footstepSource) _footstepSource.Stop();
            if (_gunSource) _gunSource.Stop();
            if (_monsterSource) _monsterSource.Stop();
            if (_muzzle) _muzzle.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            if (_blood) _blood.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
        }
    }
}
