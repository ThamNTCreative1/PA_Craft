using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace Playable
{
    [DefaultExecutionOrder(120)]
    public sealed class PlayerPaintballController : MonoBehaviour
    {
        [SerializeField] private PlayerController _player;
        [SerializeField] private CameraController _camera;
        [SerializeField] private Animator _animator;
        [SerializeField] private RuntimeAnimatorController _armedAnimator;
        [SerializeField] private Transform _weapon;
        [SerializeField] private Transform _muzzle;
        [SerializeField] private RectTransform _crosshair;
        private Canvas _crosshairCanvas;
        [SerializeField, Min(1f)] private float _portraitCrosshairScale = 1.8f;
        [SerializeField, Range(0f, 0.3f)] private float _portraitCrosshairHeightOffset = 0.12f;
        private Vector3 _crosshairBaseScale;
        private Vector2 _crosshairBasePosition;
        private RectTransform _crosshairParent;
        [SerializeField] private Transform _flash;
        [SerializeField] private GameObject _hud;
        [SerializeField] private GameObject _hint;
        [SerializeField] private PaintballFireButton _fire;
        [SerializeField] private TMP_Text _ammoLabel;
        [SerializeField] private Image _hitOverlay;
        [SerializeField] private AudioSource _audio;
        [SerializeField] private AudioClip _shotSound, _reloadSound;
        [SerializeField] private PaintballProjectile[] _projectiles;
        [Header("ToxicGun Assault Rifle Source Settings")]
        [SerializeField] private float _useRate = 0.2f;
        [SerializeField, Tooltip("Fire continuously without consuming ammo or reloading.")]
        private bool _infiniteAmmo = true;
        [SerializeField] private int _magazineSize = 48;
        [SerializeField, Tooltip("-1 gives unlimited reserve; magazine and reload still apply.")] private int _reserveRounds = -1;
        [Header("Animation Event Watchdog (clip seconds)")]
        [SerializeField] private float _equipCompleteTime = 2.123333f;
        [SerializeField] private float _shotEventTime = 0.039666f;
        [SerializeField] private float _reloadRefillTime = 2.270833f;
        [SerializeField] private float _reloadCompleteTime = 4.49625f;
        private float _actionTime;
        private RuntimeAnimatorController _originalAnimator;
        private readonly RaycastHit[] _hits = new RaycastHit[48];
        private Vector3 _weaponPosition;
        private Quaternion _weaponRotation;
        private bool _shotPending, _emitShot, _equipping;
        private float _aimTime, _animatorSpeed;
        private float _nextShot, _flashTime, _hitTime;
        private int _ammo, _reserve;
        private bool _paused, _reloading, _refilled;
        public PlayerController Player => _player;
        public bool IsEquipped { get; private set; }
        public bool IsReloading => _reloading;
        public int Ammo => _ammo;
        public int ShotsFired { get; private set; }
        public int HitsReceived { get; private set; }
        public bool IsReady => _player != null && _camera != null && _animator != null && _armedAnimator != null &&
            _weapon != null && _muzzle != null && _crosshair != null && _fire != null && _hud != null && _projectiles != null && _projectiles.Length >= 24;

        private void Awake()
        {
            if (_crosshair != null)
            {
                _crosshairCanvas = _crosshair.GetComponentInParent<Canvas>();
                _crosshairBaseScale = _crosshair.localScale;
                _crosshairBasePosition = _crosshair.anchoredPosition;
                _crosshairParent = _crosshair.parent as RectTransform;
            }
        }

        public void Equip()
        {
            if (!IsReady || IsEquipped) return;
            _originalAnimator = _player.SetOnFootAnimator(_armedAnimator);
            _weaponPosition = _weapon.localPosition;
            _weaponRotation = _weapon.localRotation;
            _weapon.gameObject.SetActive(true);
            _camera.SetPaintballAim(true);
            _hud.SetActive(true);
            if (_hint != null) _hint.SetActive(true);
            _ammo = _magazineSize;
            _reserve = _reserveRounds;
            _nextShot = 0;
            _reloading = false;
            _hitTime = _flashTime = 0;
            ShotsFired = HitsReceived = 0;
            IsEquipped = true;
            _shotPending = _emitShot = false;
            _equipping = true;
            _actionTime = 0f;
            _aimTime = 0;
            // A previous paused state must never become the resumed playback speed.
            _animatorSpeed = _animator.speed > 0f ? _animator.speed : 1f;
            _animator.Play("Equip", 0, 0f);
            SetPaused(false);
            UpdateAmmo();
        }
        public void Unequip()
        {
            bool wasEquipped = IsEquipped;
            if (IsEquipped) _player.SetOnFootAnimator(_originalAnimator);
            IsEquipped = false;
            _reloading = false;
            _shotPending = _emitShot = _equipping = false;
            if (_animator != null && wasEquipped) _animator.speed = _animatorSpeed;
            if (_fire != null) _fire.Release();
            if (_weapon != null) { if (wasEquipped) { _weapon.localPosition = _weaponPosition; _weapon.localRotation = _weaponRotation; } _weapon.gameObject.SetActive(false); }
            if (_hud != null) _hud.SetActive(false);
            if (_audio != null) _audio.Stop();
            if (_projectiles != null) foreach (var projectile in _projectiles) if (projectile != null) projectile.ResetProjectile();
            if (_player != null) _player.StopAiming();
            if (_camera != null) { _camera.ClearFeedback(); _camera.SetPaintballAim(false); }
        }
        public void SetPaused(bool paused)
        {
            _paused = paused;
            if (_player != null) _player.StopAiming();
            if (_camera != null) _camera.SetPaintballZoom(false);
            if (IsEquipped) _animator.speed = paused ? 0f : _animatorSpeed;
            if (_fire != null) _fire.Release();
            if (_audio != null) { if (paused) _audio.Pause(); else _audio.UnPause(); }
            if (_projectiles != null) foreach (var projectile in _projectiles) if (projectile != null) projectile.SetPaused(paused);
        }
        private void Update()
        {
            if (IsEquipped && _camera != null && _camera.OutputCamera != null)
                UpdateCrosshairScale(_camera.OutputCamera.aspect);
            if (_camera != null) _camera.SetPaintballZoom(IsEquipped && !_paused && _player != null && _player.enabled && _fire != null && _fire.IsHeld);
            if (!IsEquipped || _paused || !_player.enabled) return;
            float dt = Time.deltaTime;
            AdvanceAnimationWatchdog(dt);
            _nextShot -= dt;
            _aimTime = Mathf.Max(0, _aimTime - dt);
            _flashTime -= dt;
            _hitTime = Mathf.Max(0, _hitTime - dt);
            if (_flash != null) _flash.gameObject.SetActive(_flashTime > 0);
            if (_hitOverlay != null) _hitOverlay.color = new Color(1f, 0.1f, 0.12f, _hitTime * 0.7f);
            if (_reloading)
            {
                return;
            }
            if (!_infiniteAmmo && _ammo == 0 && _reserve != 0) { BeginReload(); return; }
            if (_fire.IsHeld) TryFire();
        }
        private void LateUpdate()
        {
            if (!IsEquipped || _paused || !_player.enabled)
            {
                if (_player != null) _player.StopAiming();
                return;
            }
            bool aiming = _fire.IsHeld || (!_equipping && (_aimTime > 0 || _shotPending || _reloading));
            if (aiming) _player.SetAimYaw(_camera.Yaw);
            else _player.StopAiming();
            // Bone poses come exclusively from animation clips; the gun follows its hand socket.
            if (_emitShot) { _emitShot = false; FireProjectile(); }
        }
        public bool TryFire()
        {
            if (!IsEquipped || _paused || !_player.enabled || _equipping || _shotPending || _reloading || _nextShot > 0 || (!_infiniteAmmo && _ammo <= 0)) return false;
            _aimTime = 1f;
            _shotPending = true;
            _actionTime = 0f;
            _nextShot = _useRate;
            _animator.Play("Fire", 0, 0f);
            return true;
        }
        // Source animation events are retained on cloned clips and routed here instead
        // of importing the Opsive event bus/ability framework.
        public void OnPaintballAnimationEvent(string eventName)
        {
            if (!IsEquipped || _paused) return;
            if (eventName == "OnAnimatorItemUse" && _shotPending && !_reloading)
            { _shotPending = false; _emitShot = true; }
            else if (eventName == "OnAnimatorItemEquipComplete") _equipping = false;
            else if (eventName == "OnAnimatorItemReload" && _reloading && !_refilled)
            {
                int count = _reserve < 0 ? _magazineSize - _ammo : Mathf.Min(_magazineSize - _ammo, _reserve);
                _ammo += count;
                if (_reserve >= 0) _reserve -= count;
                _refilled = true;
                UpdateAmmo();
            }
            else if (eventName == "OnAnimatorItemReloadComplete" && _reloading)
            { _reloading = false; UpdateAmmo(); }
        }
        private void AdvanceAnimationWatchdog(float dt)
        {
            if (!_equipping && !_shotPending && !_reloading) return;
            _actionTime += dt * _animator.speed;
            // Events remain authoritative. Grace time lets them arrive first; the
            // same state guards prevent a late event from duplicating a shot/refill.
            const float grace = 0.06f;
            if (_equipping && _actionTime >= _equipCompleteTime + grace)
                OnPaintballAnimationEvent("OnAnimatorItemEquipComplete");
            if (_shotPending && _actionTime >= _shotEventTime + grace)
                OnPaintballAnimationEvent("OnAnimatorItemUse");
            if (_reloading)
            {
                if (!_refilled && _actionTime >= _reloadRefillTime + grace)
                    OnPaintballAnimationEvent("OnAnimatorItemReload");
                if (_actionTime >= _reloadCompleteTime + grace)
                    OnPaintballAnimationEvent("OnAnimatorItemReloadComplete");
            }
        }
        private void FireProjectile()
        {
            if (!IsEquipped || _paused || _reloading || (!_infiniteAmmo && _ammo <= 0)) return;
            PaintballProjectile free = null;
            for (int i = 0; i < _projectiles.Length; i++)
                if (_projectiles[i] != null && !_projectiles[i].IsBusy) { free = _projectiles[i]; break; }
            if (free == null) return;
            Ray ray = GetAimRay();
            Vector3 point = ray.origin + ray.direction * 160f;
            int count = Physics.RaycastNonAlloc(ray, _hits, 160f, ~0, QueryTriggerInteraction.Ignore);
            float nearest = 160f;
            for (int i = 0; i < count; i++)
            {
                if (_hits[i].transform.IsChildOf(_player.transform) || _hits[i].distance >= nearest) continue;
                nearest = _hits[i].distance;
                point = _hits[i].point;
            }
            Vector3 origin = _muzzle.position;
            // Check shoulder-to-muzzle too: a barrel pushed through a wall must not shoot through it.
            Vector3 shoulder = _player.transform.position + Vector3.up * 1.2f;
            Vector3 barrel = origin - shoulder;
            count = Physics.RaycastNonAlloc(shoulder, barrel.normalized, _hits, barrel.magnitude, ~0, QueryTriggerInteraction.Ignore);
            nearest = barrel.magnitude;
            for (int i = 0; i < count; i++)
                if (!_hits[i].transform.IsChildOf(_player.transform) && _hits[i].distance < nearest)
                { nearest = _hits[i].distance; origin = shoulder + barrel.normalized * Mathf.Max(0, nearest - 0.06f); }
            free.Launch(this, origin, (point - origin).normalized * free.Speed);
            if (!_infiniteAmmo) _ammo--;
            ShotsFired++;
            _flashTime = 0.07f;
            _camera.AddFeedback(new Vector2(Random.Range(-1f, 1f), Random.Range(-2f, -0.5f)));
            if (_audio != null && _shotSound != null) _audio.PlayOneShot(_shotSound);
            if (_hint != null) _hint.SetActive(false);
            UpdateAmmo();
        }
        private void BeginReload()
        {
            if (_infiniteAmmo) return;
            _reloading = true;
            _actionTime = 0f;
            _refilled = false;
            _animator.Play("Reload", 0, 0f);
            if (_audio != null && _reloadSound != null) _audio.PlayOneShot(_reloadSound);
            UpdateAmmo();
        }
        private void UpdateCrosshairScale(float aspect)
        {
            if (_crosshair == null) return;
            float portraitWeight = Mathf.Clamp01((1f - aspect) / (1f - 9f / 16f));
            _crosshair.localScale = _crosshairBaseScale * Mathf.Lerp(1f, _portraitCrosshairScale, portraitWeight);
            float height = _crosshairParent != null ? _crosshairParent.rect.height : 0f;
            _crosshair.anchoredPosition = _crosshairBasePosition +
                Vector2.up * (height * _portraitCrosshairHeightOffset * portraitWeight);
        }

        private Ray GetAimRay()
        {
            Camera uiCamera = null;
            if (_crosshairCanvas != null && _crosshairCanvas.renderMode != RenderMode.ScreenSpaceOverlay)
                uiCamera = _crosshairCanvas.worldCamera != null ? _crosshairCanvas.worldCamera : _camera.OutputCamera;
            // Use the visual centre (not the pivot) after anchors/CanvasScaler have
            // positioned the reticle. Recompute each shot for orientation and zoom changes.
            Vector3 centre = _crosshair.TransformPoint(_crosshair.rect.center);
            Vector2 screenPoint = RectTransformUtility.WorldToScreenPoint(uiCamera, centre);
            return _camera.OutputCamera.ScreenPointToRay(screenPoint);
        }
        private void UpdateAmmo()
        {
            if (_ammoLabel != null) _ammoLabel.text = _infiniteAmmo ? "UNLIMITED" :
                _reloading ? "RELOADING" : _ammo + " / " + (_reserve < 0 ? "UNLIMITED" : _reserve.ToString());
        }
        public void ReceiveHit()
        {
            if (!IsEquipped || _paused) return;
            HitsReceived++;
            _hitTime = 0.35f;
            _camera.AddFeedback(new Vector2(Random.Range(-1.5f, 1.5f), -1.5f));
        }
        private void OnDisable() { Unequip(); }
    }
}
