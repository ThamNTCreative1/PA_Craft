using System;
using DG.Tweening;
using UnityEngine;
namespace Playable
{
    public class PlayerAction : MonoBehaviour
    {
        [SerializeField] private Transform _cameraRig;
        [SerializeField] private Transform[] _waypoints;
        [SerializeField, Min(0.1f)] private float _duration = 6f;
        [SerializeField] private Vector3 _arrivalEuler = new Vector3(0,90,0);
        private Sequence _travel;
        [SerializeField, Min(0.01f)] private float _turnSmoothTime = 0.22f;
        private bool _followingPath;
        private Vector3 _previousPosition;
        private float _yawVelocity;
        private Vector3 _arrivalPosition;
        private static readonly AnimationCurve TravelEase = new AnimationCurve(
            new Keyframe(0f, 0f, 1.142857f, 1.142857f),
            new Keyframe(0.75f, 0.857143f, 1.142857f, 1.142857f),
            new Keyframe(1f, 1f, 0f, 0f));

        public void EnterCave(Action arrived)
        {
            _travel?.Kill();
            _previousPosition = _cameraRig.position;
            _yawVelocity = 0f;
            _followingPath = true;
            var points=new Vector3[_waypoints.Length];
            for(int i=0;i<points.Length;i++) points[i]=_waypoints[i].position;
            _arrivalPosition = points[points.Length - 1];
            _travel=DOTween.Sequence()
                .Append(_cameraRig.DOPath(points,Mathf.Max(0.1f,_duration-0.45f),PathType.CatmullRom,PathMode.Full3D,20)
                    .SetOptions(false,AxisConstraint.None,AxisConstraint.X|AxisConstraint.Z)
                    .SetEase(TravelEase))
                .AppendCallback(() => _followingPath = false)
                .Append(_cameraRig.DORotate(_arrivalEuler,0.45f).SetEase(Ease.InOutSine))
                .AppendCallback(() => arrived?.Invoke());
        }
        private void LateUpdate()
        {
            if (!_followingPath || Time.deltaTime <= 0f) return;
            Vector3 movement = _cameraRig.position - _previousPosition;
            _previousPosition = _cameraRig.position;
            movement.y = 0f;
            float targetYaw = movement.sqrMagnitude > 0.00000001f
                ? Mathf.Atan2(movement.x, movement.z) * Mathf.Rad2Deg : _arrivalEuler.y;
            // Settle toward the monster while still moving, before the final stop.
            float arrivalBlend = 1f - Mathf.Clamp01(Vector3.Distance(_cameraRig.position, _arrivalPosition) / 3f);
            targetYaw = Mathf.LerpAngle(targetYaw, _arrivalEuler.y,
                Mathf.SmoothStep(0f, 1f, arrivalBlend));
            float yaw = Mathf.SmoothDampAngle(_cameraRig.eulerAngles.y, targetYaw,
                ref _yawVelocity, _turnSmoothTime, 180f, Time.deltaTime);
            _cameraRig.rotation = Quaternion.Euler(0f, yaw, 0f);
        }
        private void OnDestroy() { _travel?.Kill(); }

        private void OnDrawGizmosSelected()
        {
            if(!_cameraRig || _waypoints==null) return;
            Gizmos.color=Color.cyan;
            Vector3 previous=_cameraRig.position;
            foreach(var point in _waypoints)
            {
                if(!point) continue;
                Gizmos.DrawLine(previous,point.position); Gizmos.DrawSphere(point.position,0.1f); previous=point.position;
            }
        }
    }
}
