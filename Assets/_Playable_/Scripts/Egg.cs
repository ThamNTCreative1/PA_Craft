using System;
using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    public class Egg : MonoBehaviour
    {
        [Tooltip("Pickup trigger radius in the egg's local units.")]
        [SerializeField, Min(0.01f)] private float _stealRadius = 2f;
        [SerializeField] private Vector3 _triggerCenter = Vector3.zero;
        [Tooltip("Solid collider used while carried. Keep it on the egg without a separate Rigidbody so it joins the player's body.")]
        [SerializeField] private Collider _carryCollider;

        private readonly List<Collider> _playerContacts = new List<Collider>(4);
        private PlayerController _player;
        private EggPickupTrigger _pickupTrigger;
        private Collider[] _colliders;
        private bool[] _colliderStates;
        private Rigidbody _body;
        private bool _wasKinematic;
        private bool _usedGravity;
        private Transform _startParent;
        private Vector3 _startPosition;
        private Quaternion _startRotation;
        private Vector3 _startScale;
        private bool _initialized;
        private bool _playerInRange;

        public event Action RangeChanged;
        public bool IsHeld { get; private set; }
        public bool CanSteal { get { return isActiveAndEnabled && !IsHeld && _playerInRange; } }

        private void Awake() { Initialize(); }

        private void Initialize()
        {
            if (_initialized) return;
            _startParent = transform.parent;
            _startPosition = transform.position;
            _startRotation = transform.rotation;
            _startScale = transform.localScale;
            _colliders = GetComponentsInChildren<Collider>(true);
            _colliderStates = new bool[_colliders.Length];
            for (int i = 0; i < _colliders.Length; i++) _colliderStates[i] = _colliders[i].enabled;
            // The nest egg must not block the player from reaching its pickup trigger.
            if (_carryCollider != null) _carryCollider.enabled = false;
            _body = GetComponent<Rigidbody>();
            if (_body != null)
            {
                _wasKinematic = _body.isKinematic;
                _usedGravity = _body.useGravity;
            }

            var triggerObject = new GameObject("Egg Pickup Trigger");
            triggerObject.layer = gameObject.layer;
            triggerObject.transform.SetParent(transform, false);
            _pickupTrigger = triggerObject.AddComponent<EggPickupTrigger>();
            _pickupTrigger.Configure(this, _stealRadius, _triggerCenter);
            _initialized = true;
        }

        public void BindPlayer(PlayerController player)
        {
            Initialize();
            if (_player == player) return;
            _player = player;
            ClearContacts();
        }

        internal void EnterRange(Collider other)
        {
            if (!isActiveAndEnabled || IsHeld || other == null || _player == null ||
                other.GetComponentInParent<PlayerController>() != _player) return;
            if (!_playerContacts.Contains(other)) _playerContacts.Add(other);
            RefreshRange();
        }

        internal void ExitRange(Collider other)
        {
            _playerContacts.Remove(other);
            RefreshRange();
        }

        private void FixedUpdate()
        {
            // Destroyed/disabled colliders may not send OnTriggerExit.
            if (_playerContacts.Count > 0) RefreshRange();
        }

        private void RefreshRange()
        {
            for (int i = _playerContacts.Count - 1; i >= 0; i--)
            {
                Collider contact = _playerContacts[i];
                if (contact == null || !contact.enabled || !contact.gameObject.activeInHierarchy ||
                    !_pickupTrigger.OverlapsBounds(contact)) _playerContacts.RemoveAt(i);
            }
            bool inRange = isActiveAndEnabled && !IsHeld && _player != null &&
                           _player.isActiveAndEnabled && _pickupTrigger.isActiveAndEnabled &&
                           _playerContacts.Count > 0;
            if (_playerInRange == inRange) return;
            _playerInRange = inRange;
            RangeChanged?.Invoke();
        }

        internal void ClearContacts()
        {
            _playerContacts.Clear();
            if (!_playerInRange) return;
            _playerInRange = false;
            RangeChanged?.Invoke();
        }

        public bool TryPickUp(PlayerController player, Transform holdPoint)
        {
            if (!_initialized || holdPoint == null || player != _player) return false;
            RefreshRange();
            if (!CanSteal) return false;
            IsHeld = true;
            _pickupTrigger.gameObject.SetActive(false);
            ClearContacts();
            for (int i = 0; i < _colliders.Length; i++)
                if (_colliders[i] != null) _colliders[i].enabled = false;
            if (_body != null)
            {
                if (!_body.isKinematic)
                {
                    _body.linearVelocity = Vector3.zero;
                    _body.angularVelocity = Vector3.zero;
                }
                _body.isKinematic = true;
                _body.useGravity = false;
            }
            // Keep the egg's world scale when attaching it to the player's hand.
            transform.SetParent(holdPoint, true);
            transform.localPosition = Vector3.zero;
            transform.localRotation = Quaternion.identity;
            // Enable after reparenting so this shape moves and collides with the player.
            if (_carryCollider != null) _carryCollider.enabled = true;
            return true;
        }

        public void ResetEgg()
        {
            Initialize();
            ClearContacts();
            IsHeld = false;
            transform.SetParent(_startParent, true);
            transform.SetPositionAndRotation(_startPosition, _startRotation);
            transform.localScale = _startScale;
            if (_body != null)
            {
                _body.position = _startPosition;
                _body.rotation = _startRotation;
                _body.isKinematic = _wasKinematic;
                _body.useGravity = _usedGravity;
                if (!_wasKinematic)
                {
                    _body.linearVelocity = Vector3.zero;
                    _body.angularVelocity = Vector3.zero;
                }
            }
            for (int i = 0; i < _colliders.Length; i++)
                if (_colliders[i] != null) _colliders[i].enabled = _colliderStates[i];
            if (_carryCollider != null) _carryCollider.enabled = false;
            _pickupTrigger.gameObject.SetActive(true);
        }

        private void OnDisable() { ClearContacts(); }

        private void OnDrawGizmosSelected()
        {
            Gizmos.color = Color.yellow;
            Gizmos.matrix = transform.localToWorldMatrix;
            Gizmos.DrawWireSphere(_triggerCenter, Mathf.Max(0.01f, _stealRadius));
        }
    }
}
