using UnityEngine;

namespace Playable
{
    public class AudioManager : MonoBehaviour
    {
        public static AudioManager Instance;
        [SerializeField] private AudioSource _audioMusic;
        [SerializeField] private AudioSource _audioSound;

        private bool _musicRequested;

        private void Update()
        {
            // Check globally, including during the intro when player input is disabled.
            bool interacted = Input.GetMouseButtonUp(0) || Input.anyKeyDown;
            if (!interacted) return;
            if (_musicRequested && _audioMusic != null && _audioMusic.clip != null && !_audioMusic.isPlaying)
                _audioMusic.Play();
        }

        private void OnDestroy()
        {
            if (Instance == this) Instance = null;
        }

        private void Awake()
        {
            Instance = this;
        }

        public void PlayMusic(AudioClip clip)
        {
            StopMusic();
            if (_audioMusic == null || clip == null)
            {
                Debug.LogWarning("[AudioManager] Background music source or clip is missing.", this);
                return;
            }

            _audioMusic.clip = clip;
            _audioMusic.loop = true;
            _audioMusic.playOnAwake = false;
            _musicRequested = true;
            // Start immediately; Update retries on interaction if autoplay was blocked.
            _audioMusic.Play();
        }

        public void SetMusicVolume(float volume)
        {
            if (_audioMusic != null) _audioMusic.volume = Mathf.Clamp01(volume);
        }

        public void StopMusic()
        {
            _musicRequested = false;
            if (_audioMusic != null) _audioMusic.Stop();
        }

        public void PlaySound(AudioClip clip, bool isLoop = false)
        {
            StopSound();
            if (clip) _audioSound.clip = clip;
            else Debug.LogError("Sound Not Found");
            _audioSound.loop = isLoop;
            _audioSound.Play();
        }

        public void PlayOneShot(AudioClip clip, float volume = 1f)
        {
            if (clip != null && _audioSound != null) _audioSound.PlayOneShot(clip, volume);
        }

        public void StopSound()
        {
            _audioSound.Stop();
        }
    }
}