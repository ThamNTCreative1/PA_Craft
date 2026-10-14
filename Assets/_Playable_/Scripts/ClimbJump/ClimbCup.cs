using System;
using System.Collections;
using UnityEngine;

namespace Playable
{
    [RequireComponent(typeof(Collider))]
    public sealed class ClimbCup : MonoBehaviour
    {
        [SerializeField] private GameObject _cup;
        [SerializeField, Min(0)] private float _respawnDelaySeconds;
        [SerializeField] private int _amount = 1;
        [SerializeField] private ParticleSystem _collectEffect;
        [SerializeField] private ClimbPlayer player;
        private Collider _collider;
        private bool _respawnAvailable;
        public bool Collected { get; private set; }
        public event Action<int> CollectedCup;

        private void Awake() { _collider = GetComponent<Collider>(); }
        private void Start() { if (player != null) player.Landed += Respawn; }
        private void OnTriggerEnter(Collider other)
        {
            if (other.GetComponentInParent<ClimbPlayer>() == player && player != null) Collect();
        }
        private void OnTriggerExit(Collider other)
        {
            if (_collectEffect != null && other.GetComponentInParent<ClimbPlayer>() == player) _collectEffect.Stop();
        }
        public void Collect()
        {
            if (Collected) return;
            Collected = true;
            // Source behavior: add cup, hide its visual, disable trigger, play collection effect.
            if (_cup != null) _cup.SetActive(false);
            _collider.enabled = false;
            if (_collectEffect != null) _collectEffect.Play();
            if (_respawnDelaySeconds > 0 && _cup != null) Invoke(nameof(AllowRespawn), _respawnDelaySeconds);
            StartCoroutine(StopEffect());
            CollectedCup?.Invoke(_amount);
        }
        private IEnumerator StopEffect()
        {
            yield return new WaitForSeconds(0.5f);
            if (_collectEffect != null) _collectEffect.Stop();
        }
        private void AllowRespawn() { _respawnAvailable = true; }
        private void Respawn()
        {
            if (!_respawnAvailable) return;
            if (_cup != null) _cup.SetActive(true);
            _collider.enabled = true;
            Collected = false;
            _respawnAvailable = false;
        }
        private void OnDestroy() { if (player != null) player.Landed -= Respawn; }
    }
}
