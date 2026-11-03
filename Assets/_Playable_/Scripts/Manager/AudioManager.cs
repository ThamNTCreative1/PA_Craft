using UnityEngine;

namespace Playable
{
    public class AudioManager : MonoBehaviour
    {
        public static AudioManager Instance;
        [SerializeField] private AudioSource _audioMusic;
        [SerializeField] private AudioSource _audioSound;

        private void Awake()
        {
            Instance = this;
        }

        public void PlayMusic(AudioClip clip)
        {
            StopMusic();
            if (clip) _audioMusic.clip = clip;
            else Debug.LogError("Background Music Not Found");
            _audioMusic.loop = true;
            _audioMusic.Play();
        }

        public void StopMusic()
        {
            _audioMusic.Stop();
        }

        public void PlaySound(AudioClip clip, bool isLoop = false)
        {
            StopSound();
            if (clip) _audioSound.clip = clip;
            else Debug.LogError("Sound Not Found");
            _audioSound.loop = isLoop;
            _audioSound.Play();
        }

        public void StopSound()
        {
            _audioSound.Stop();
        }
    }
}