using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>
    /// Phát hiệu ứng âm thanh one-shot cho playable Choose Your Monster,
    /// cộng tiếng bước chân lặp theo nhịp (nguồn riêng để đổi pitch không ảnh hưởng tiếng khác).
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class ChooseAudio : MonoBehaviour
    {
        [SerializeField] private AudioSource _source;
        [SerializeField] private AudioSource _stepSource;
        [SerializeField] private AudioClip _click;
        [SerializeField] private AudioClip _portal;
        [SerializeField] private AudioClip _roar;
        [SerializeField] private AudioClip _slam;
        [SerializeField] private AudioClip _monsterHit;
        [SerializeField] private AudioClip _bossHit;
        [SerializeField] private AudioClip _victory;
        [SerializeField] private AudioClip _defeat;
        [SerializeField] private AudioClip _possess;
        [SerializeField] private AudioClip _possessVoice;
        [SerializeField] private AudioClip _playerStep;
        [SerializeField] private AudioClip _monsterStep;
        [SerializeField] private float _playerStepInterval = 0.28f;
        [SerializeField] private float _monsterStepInterval = 0.425f;
        [SerializeField] private float _playerStepVolume = 2.8f;
        [SerializeField] private float _monsterStepVolume = 4f;
        [SerializeField] private float _monsterStepPitch = 0.75f;

        private AudioClip _stepClip;
        private float _stepInterval;
        private float _stepVolume;
        private float _stepPitch;
        private float _stepTimer;

        public void Click() => Play(_click, 0.9f);
        public void Portal() => Play(_portal, 0.8f);
        public void Roar() => Play(_roar, 0.9f);
        public void Slam() => Play(_slam, 1f);
        public void MonsterHit() => Play(_monsterHit, 0.8f);
        public void BossHit() => Play(_bossHit, 0.9f);
        public void Victory() => Play(_victory, 0.9f);
        public void Defeat() => Play(_defeat, 1f);

        /// <summary>Nhập xác: tiếng tăng sức mạnh + tiếng quái thức tỉnh phát chồng lên nhau.</summary>
        public void Possess()
        {
            // Cùng nguồn chính (không dùng nguồn bước chân vì pitch của nó đổi khi quái bắt đầu đi).
            Play(_possess, 1f);
            if (_source != null && _possessVoice != null) _source.PlayOneShot(_possessVoice, 1f);
        }

        /// <summary>Bước chân player chạy (lặp tới khi gọi StopSteps hoặc đổi sang bước khác).</summary>
        public void PlayerSteps() => StartSteps(_playerStep, _playerStepInterval, _playerStepVolume, 1f);

        /// <summary>Bước chân quái: chậm, nặng (pitch thấp), khớp nhịp clip Walk (2 bước / 0.85s).</summary>
        public void MonsterSteps() => StartSteps(_monsterStep, _monsterStepInterval, _monsterStepVolume, _monsterStepPitch);

        public void StopSteps()
        {
            _stepClip = null;
        }

        private void StartSteps(AudioClip clip, float interval, float volume, float pitch)
        {
            _stepClip = clip;
            _stepInterval = Mathf.Max(0.05f, interval);
            _stepVolume = volume;
            _stepPitch = pitch;
            _stepTimer = 0f;
        }

        private void Update()
        {
            if (_stepClip == null || _stepSource == null) return;
            _stepTimer -= Time.deltaTime;
            if (_stepTimer > 0f) return;
            _stepTimer += _stepInterval;
            _stepSource.pitch = _stepPitch * Random.Range(0.93f, 1.07f);
            // Âm lượng > 1 thì phát chồng nhiều lớp (mỗi lớp ≤ 1) thay vì phụ thuộc volumeScale > 1,
            // để to gấp đôi giống nhau trên mọi nền tảng (Editor / WebGL / Luna).
            for (float left = _stepVolume; left > 0.01f; left -= 1f)
                _stepSource.PlayOneShot(_stepClip, Mathf.Min(1f, left));
        }

        private void Play(AudioClip clip, float volume)
        {
            if (_source == null || clip == null) return;
            _source.pitch = Random.Range(0.94f, 1.06f);
            _source.PlayOneShot(clip, volume);
        }
    }
}
