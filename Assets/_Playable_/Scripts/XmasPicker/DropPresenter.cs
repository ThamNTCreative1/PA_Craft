using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    // Drops a pre-placed scene object from the sky onto a land point with Xmas FX + SFX.
    public class DropPresenter : MonoBehaviour
    {
        [SerializeField] private AudioSource _audio;
        [SerializeField] private ParticleSystem _landFx;
        [SerializeField] private AudioClip _whooshSfx;
        [SerializeField] private AudioClip _landSfx;
        [SerializeField] private AudioClip _cheerSfx;
        [SerializeField] private float _dropHeight = 12f;
        [SerializeField] private float _fallTime = 0.7f;
        [SerializeField] private float _spinDegrees = 360f;

        public void Drop(PickerOption option, Transform landPoint, Action onLanded)
        {
            GameObject display = option.Display;
            if (display == null || landPoint == null)
            {
                if (onLanded != null) onLanded();
                return;
            }

            Transform t = display.transform;
            Vector3 baseScale = t.localScale;
            Quaternion landRotation = landPoint.rotation;
            t.DOKill();
            t.position = landPoint.position + Vector3.up * _dropHeight;
            t.rotation = landRotation * Quaternion.Euler(0f, -_spinDegrees, 0f);
            display.SetActive(true);
            Play(_whooshSfx);

            DOTween.Sequence()
                .Append(t.DOMove(landPoint.position, _fallTime).SetEase(Ease.InQuad))
                .Join(t.DORotateQuaternion(landRotation, _fallTime).SetEase(Ease.OutQuad))
                .AppendCallback(() => Land(landPoint.position, option.VoiceSfx))
                .Append(t.DOScale(new Vector3(baseScale.x * 1.2f, baseScale.y * 0.7f, baseScale.z * 1.2f), 0.08f))
                .Append(t.DOScale(baseScale, 0.35f).SetEase(Ease.OutElastic))
                .OnComplete(() =>
                {
                    if (onLanded != null) onLanded();
                })
                .SetTarget(t);
        }

        public void Play(AudioClip clip)
        {
            if (clip != null && _audio != null) _audio.PlayOneShot(clip);
        }

        private void Land(Vector3 position, AudioClip voice)
        {
            if (_landFx != null)
            {
                _landFx.transform.position = position;
                _landFx.Play(true);
            }
            Play(_landSfx);
            Play(_cheerSfx);
            Play(voice);
        }
    }
}
