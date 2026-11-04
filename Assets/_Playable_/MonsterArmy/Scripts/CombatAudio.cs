using UnityEngine;

namespace Playable.MonsterArmy
{
    /// <summary>
    /// Gom hiệu ứng âm thanh trận đánh vào một chỗ, phát qua một AudioSource dùng
    /// chung. Nguồn là file .webm của SSPGame đã convert sang .ogg — Unity không
    /// import được .webm (spec mục 3.1).
    /// </summary>
    public sealed class CombatAudio : MonoBehaviour
    {
        /// <summary>Chặn việc vài chục con quái cùng bắn một clip trong một frame.</summary>
        private const float MinIntervalBetweenSameClip = 0.05f;

        [SerializeField] private AudioSource _source;

        [SerializeField] private AudioClip _click;
        [SerializeField] private AudioClip _addItem;
        [SerializeField] private AudioClip _gunshot;
        [SerializeField] private AudioClip _axeHit;
        [SerializeField] private AudioClip _laser;
        [SerializeField] private AudioClip _grenade;
        [SerializeField] private AudioClip _grenadeBoom;
        [SerializeField] private AudioClip _monsterDeath;
        [SerializeField] private AudioClip _bossStomp;
        [SerializeField] private AudioClip _bossRoar;
        [SerializeField] private AudioClip _error;
        [SerializeField] private AudioClip _fireball;
        [SerializeField] private AudioClip[] _monsterVoices;
        private bool _battleActive;
        private float _nextVoice;
        private float _lastVoice = -10f;

        public void StartBattle()
        {
            _battleActive = true;
            _nextVoice = Time.time + 1f;
            PlayMonsterVoice();
        }

        public void StopBattle()
        {
            _battleActive = false;
            if (_source != null) _source.Stop();
            if (Playable.AudioManager.Instance != null) Playable.AudioManager.Instance.StopMusic();
        }

        public void PlayMonsterVoice()
        {
            if (_monsterVoices == null || _monsterVoices.Length == 0 || Time.time - _lastVoice < 1f) return;
            _lastVoice = Time.time;
            Play(_monsterVoices[Random.Range(0, _monsterVoices.Length)], 0.55f);
        }

        public void PlayFireball() => Play(_fireball, 0.65f);

        private void Update()
        {
            if (!_battleActive || Time.time < _nextVoice) return;
            PlayMonsterVoice();
            _nextVoice = Time.time + Random.Range(3f, 5f);
        }

        private readonly System.Collections.Generic.Dictionary<AudioClip, float> _lastPlayed =
            new System.Collections.Generic.Dictionary<AudioClip, float>();

        public void PlayClick() => Play(_click);
        public void PlayAddItem() => Play(_addItem);
        public void PlayGunshot() => Play(_gunshot, 0.6f);
        public void PlayAxeHit() => Play(_axeHit, 0.7f);
        public void PlayLaser() => Play(_laser, 0.6f);
        public void PlayGrenade() => Play(_grenade, 0.8f);
        public void PlayGrenadeBoom() => Play(_grenadeBoom);
        public void PlayMonsterDeath() => Play(_monsterDeath, 0.5f);
        public void PlayBossStomp() => Play(_bossStomp);
        public void PlayBossRoar() => Play(_bossRoar);
        public void PlayError() => Play(_error, 0.8f);

        private void Awake()
        {
            if (_source == null) _source = GetComponent<AudioSource>();
        }

        private void Play(AudioClip clip, float volume = 1f)
        {
            if (clip == null || _source == null) return;

            if (_lastPlayed.TryGetValue(clip, out float last) &&
                Time.unscaledTime - last < MinIntervalBetweenSameClip)
                return;

            _lastPlayed[clip] = Time.unscaledTime;
            _source.PlayOneShot(clip, volume);
        }
    }
}
