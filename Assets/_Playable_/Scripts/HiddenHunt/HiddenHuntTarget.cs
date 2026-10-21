using UnityEngine;

namespace Playable
{
    public sealed class HiddenHuntTarget : MonoBehaviour
    {
        [SerializeField] private Renderer _visual;
        [SerializeField] private Collider _hitCollider;
        [SerializeField] private ParticleSystem _burst;
        [SerializeField] private Vector3 _aimOffset;
        [SerializeField] private float _blinkPhase;
        private MaterialPropertyBlock _colorBlock;
        private Renderer[] _modelRenderers;
        private static readonly int ColorId = Shader.PropertyToID("_Color");
        public bool IsAlive { get; private set; } = true;
        public Vector3 AimPoint => transform.TransformPoint(_aimOffset);

        private void Awake()
        {
            _colorBlock = new MaterialPropertyBlock();
            // FBX characters contain separate renderers for the head and limbs.
            var renderers = GetComponentsInChildren<Renderer>(true);
            var model = new System.Collections.Generic.List<Renderer>();
            foreach (var renderer in renderers)
                if (!(renderer is ParticleSystemRenderer)) model.Add(renderer);
            _modelRenderers = model.ToArray();
        }
        private void Update()
        {
            if (!IsAlive) return;
            float pulse = 0.5f + 0.5f * Mathf.Sin((Time.time + _blinkPhase) * 9f);
            _colorBlock.SetColor(ColorId, Color.Lerp(new Color(0.48f, 0.005f, 0.01f), new Color(1f, 0.035f, 0.025f), pulse));
            foreach (var renderer in _modelRenderers)
                if (renderer != null) renderer.SetPropertyBlock(_colorBlock);
        }

        public bool Hit()
        {
            if (!IsAlive) return false;
            IsAlive = false;
            _hitCollider.enabled = false;
            foreach (var renderer in _modelRenderers)
                if (renderer != null) renderer.enabled = false;
            if (_burst != null)
            {
                _burst.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
                _burst.Play(true);
            }
            return true;
        }
    }
}
