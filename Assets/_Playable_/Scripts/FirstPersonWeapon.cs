using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class FirstPersonWeapon : MonoBehaviour
    {
        public bool IsHoldingWeapon => _gun && _gun.gameObject.activeSelf;
        public Vector3 HoldingPosePosition => _aimPosition;
        public float DrawProgress => _drawProgress;
        private float _drawProgress = 1f;
        private Renderer[] _visibleArmRenderers;
        [SerializeField] private Transform _weaponPivot,_gun,_magazine,_slide;
        [SerializeField] private Transform _rightGrip,_leftGrip,_leftTarget;
        [SerializeField] private Transform _leftUpper,_leftForearm,_leftHand;
        [SerializeField] private Transform _rightUpper,_rightForearm,_rightHand;
        [SerializeField] private Light _muzzleLight;
        [SerializeField] private Transform _gunAdjustment, _armsRoot;
        [SerializeField] private Animator _runAnimator;
        [Header("Landscape - gun and arms")]
        [SerializeField] private Vector3 _gunInHandPosition = Vector3.zero;
        [SerializeField] private Vector3 _gunInHandEuler = Vector3.zero;
        [SerializeField] private Vector3 _runArmsOffset=new Vector3(0,0.25f,0.15f);
        [Header("Portrait - gun and arms")]
        [SerializeField] private Vector3 _gunInHandPositionPortrait = new Vector3(0.06f, 0.03f, 0.09f);
        [SerializeField] private Vector3 _gunInHandEulerPortrait = new Vector3(0, 2, 0);
        [SerializeField] private Vector3 _runArmsOffsetPortrait = new Vector3(0.06f, 0.22f, 0.15f);
        [SerializeField, HideInInspector] private Vector3 _gunPosition=Vector3.zero;
        [SerializeField, HideInInspector] private Vector3 _gunEuler=Vector3.zero;
        [SerializeField, HideInInspector] private Vector3 _gunScale=Vector3.one;
        [SerializeField, HideInInspector] private float _gunInHandOffsetX=-0.03f;
        [SerializeField, HideInInspector] private Vector3 _armsPosition=new Vector3(0,-1.3f,0.25f);
        [SerializeField, HideInInspector] private Vector3 _armsEuler=Vector3.zero;
        [SerializeField, HideInInspector] private Vector3 _armsScale=Vector3.one*0.8f;
        [SerializeField, HideInInspector] private Vector3 _rightGripPosition=Vector3.zero;
        [SerializeField, HideInInspector] private Vector3 _rightGripEuler=Vector3.zero;
        [SerializeField, HideInInspector] private Vector3 _leftGripPosition=new Vector3(-0.09f,-0.015f,0.03f);
        [SerializeField, HideInInspector] private Vector3 _leftGripEuler=Vector3.zero;
        private Sequence _sequence;
        private Vector3 _magazineHome,_slideHome;
        private Vector3 _gunHome;
        [SerializeField, HideInInspector] private Vector3 _aimPosition=new Vector3(0.03f,-0.32f,0.58f);
        [SerializeField, HideInInspector] private Vector3 _aimEuler=Vector3.zero;
        [SerializeField, HideInInspector] private Vector3 _aimScale=Vector3.one;
        private Vector3 GunAdjustmentPosition => _gunPosition+_gunHome
            -Quaternion.Euler(_gunEuler)*Vector3.Scale(_gunScale,_gunHome);
        private Vector3 AimSupportPosition => _aimPosition+Quaternion.Euler(_aimEuler)*Vector3.Scale(_aimScale,
            GunAdjustmentPosition+Quaternion.Euler(_gunEuler)*Vector3.Scale(_gunScale,_leftGripPosition));
        private bool _walking,_leftFollowsGrip=true;
        private bool _isAiming;
        private bool _isDrawing;
        
        private void Awake()
        {
            _magazineHome=_magazine.localPosition; _slideHome=_slide.localPosition;
            _gunHome=_gun.localPosition;
            _weaponPivot.localPosition=_aimPosition; _weaponPivot.localEulerAngles=_aimEuler;
            _gun.gameObject.SetActive(false); _muzzleLight.enabled=false;
            if (_armsRoot)
            {
                _armsRoot.gameObject.SetActive(true);
                var renderers = new System.Collections.Generic.List<Renderer>();
                foreach (var renderer in _armsRoot.GetComponentsInChildren<Renderer>(true))
                    if (renderer.enabled) renderers.Add(renderer);
                _visibleArmRenderers = renderers.ToArray();
                // Initialize the animation graph before gameplay, rather than at first draw.
                PlayArms("Aim", 0f);
                if (_runAnimator) { _runAnimator.Update(0f); _runAnimator.enabled = false; }
                SetArmsVisible(false);
            }
        }
        public void SetWalking(bool value)
        {
            _walking=value;
            if (value)
            {
                SetArmsVisible(false);
                if (_runAnimator) _runAnimator.enabled = false;
            }
            _isAiming=false;
            if(value) _leftFollowsGrip=false;
        }
        public void Draw(Action complete)
        {
            _sequence?.Kill();
            _drawProgress = 0f;
            SetArmsVisible(true);
            _gun.gameObject.SetActive(true);
            _isAiming=true; _isDrawing=true; _leftFollowsGrip=true;
            // Raise the complete grip together; switching from Draw to Aim used to
            // snap the support wrist at the end of the reveal.
            PlayArms("Aim",0f);
            if (_runAnimator) _runAnimator.Update(0f);
            _sequence=DOTween.Sequence()
                .Append(DOTween.To(() => _drawProgress, value => _drawProgress = value,
                    1f, 0.45f).SetEase(Ease.InOutSine))
                .AppendCallback(()=> { _isDrawing=false; complete?.Invoke(); });
        }
        public void Fire(Action complete)
        {
            _sequence?.Kill(); _isAiming=false; _leftFollowsGrip=true;
            _muzzleLight.enabled=true;
            PlayArms("Fire",0.15f);
            _sequence=DOTween.Sequence()
                .Append(_weaponPivot.DOLocalRotate(_aimEuler+new Vector3(-10,0,0),0.06f).SetEase(Ease.OutQuad))
                .Join(_weaponPivot.DOLocalMove(_aimPosition+new Vector3(0,0.025f,-0.04f),0.06f))
                .Join(_slide.DOLocalMove(_slideHome+new Vector3(0,0,-0.04f),0.06f))
                .AppendCallback(()=>_muzzleLight.enabled=false)
                .Append(_weaponPivot.DOLocalRotate(_aimEuler,0.09f).SetEase(Ease.OutQuad))
                .Join(_weaponPivot.DOLocalMove(_aimPosition,0.09f))
                .Join(_slide.DOLocalMove(_slideHome,0.09f))
                .AppendCallback(()=> { _isAiming=true; PlayArms("Aim",0f); complete?.Invoke(); });
        }
        private void LateUpdate()
        {
            bool portrait = Screen.height > Screen.width;
            Vector3 gunPosition = portrait ? _gunInHandPositionPortrait : _gunInHandPosition;
            Vector3 gunEuler = portrait ? _gunInHandEulerPortrait : _gunInHandEuler;
            Vector3 armsOffset = portrait ? _runArmsOffsetPortrait : _runArmsOffset;
            // Apply the stored pose without overwriting animated position/rotation.
            _gun.localPosition=_gunHome+new Vector3(_gunInHandOffsetX,0,0)+gunPosition;
            _gun.localRotation=Quaternion.Euler(gunEuler);
            if(_gunAdjustment) ApplyPose(_gunAdjustment,GunAdjustmentPosition,_gunEuler,_gunScale);
            // Match the smaller holding arms and shoulder placement used by the editor baker.
            if(_armsRoot) ApplyPose(_armsRoot,_armsPosition+armsOffset
                +(IsHoldingWeapon ? new Vector3(0,0.1f,0.15f) : Vector3.zero),_armsEuler,
                _armsScale * (IsHoldingWeapon ? 0.5625f : 1f));
            _rightGrip.localPosition=_rightGripPosition; _rightGrip.localEulerAngles=_rightGripEuler;
            _leftGrip.localPosition=_leftGripPosition; _leftGrip.localEulerAngles=_leftGripEuler;
            _weaponPivot.localScale=_aimScale;
            // The original Run clip owns all arm joints while travelling.
            if(_walking && _runAnimator) return;
            if(_isAiming)
            {
                _weaponPivot.localPosition=_aimPosition;
                _weaponPivot.localEulerAngles=_aimEuler;
            }
        }
        private void PlayArms(string state,float duration)
        {
            if(!_runAnimator) return;
            _runAnimator.enabled=true;
            // Match the baked Draw clip length to the playback duration.
            _runAnimator.speed=state=="Draw" && duration>0f ? _drawClipDuration/duration : 1f;
            _runAnimator.Play(state,0,0f);
        }
        private void SetArmsVisible(bool visible)
        {
            if (_visibleArmRenderers == null) return;
            foreach (var renderer in _visibleArmRenderers) renderer.enabled = visible;
        }
        [SerializeField, HideInInspector] private float _drawClipDuration=0.25f;
        private static void ApplyPose(Transform target,Vector3 position,Vector3 euler,Vector3 scale)
        {
            target.localPosition=position; target.localEulerAngles=euler; target.localScale=scale;
        }
        private void OnDestroy() { _sequence?.Kill(); }
    }
}
