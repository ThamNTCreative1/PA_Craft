using System;
using UnityEngine;

namespace Playable
{
    // Fixed camera with one framing for portrait and one for landscape; re-applies when the screen rotates.
    public class OrientationCameraPose : MonoBehaviour
    {
        [Serializable]
        public class Pose
        {
            [SerializeField] private Vector3 _position;
            [SerializeField] private Vector3 _euler;
            [SerializeField] private float _fieldOfView = 60f;

            public Pose() { }

            public Pose(Vector3 position, Vector3 euler, float fieldOfView)
            {
                _position = position;
                _euler = euler;
                _fieldOfView = fieldOfView;
            }

            public void Apply(Camera camera)
            {
                camera.transform.SetPositionAndRotation(_position, Quaternion.Euler(_euler));
                camera.fieldOfView = _fieldOfView;
            }
        }

        [SerializeField] private Camera _camera;
        [SerializeField] private Pose _portrait = new Pose();
        [SerializeField] private Pose _landscape = new Pose();

        private int _appliedWidth = -1;
        private int _appliedHeight = -1;

        private void Awake()
        {
            ApplyIfChanged();
        }

        private void LateUpdate()
        {
            ApplyIfChanged();
        }

        private void ApplyIfChanged()
        {
            if (Screen.width == _appliedWidth && Screen.height == _appliedHeight) return;
            _appliedWidth = Screen.width;
            _appliedHeight = Screen.height;
            Pose pose = Screen.width > Screen.height ? _landscape : _portrait;
            pose.Apply(_camera);
        }
    }
}
