using DG.Tweening;
using UnityEngine;

namespace Playable.CartRescue
{
    /// <summary>
    /// Hiển thị một nhân vật đứng trên sàn xe: vị trí từ DeckSolver, nghiêng theo sàn, lắc theo vận tốc trượt, nhún nhẹ.
    /// _visual là con chứa model (đã xoay sang ngang + đặt chân ở gốc) để hiệu ứng không đè lên transform chính.
    /// </summary>
    [DisallowMultipleComponent]
    public sealed class DeckRiderView : MonoBehaviour
    {
        [SerializeField] private Transform _visual;
        [SerializeField] private float _halfWidth = 0.35f;
        [SerializeField] private float _wobblePerSpeed = 10f;
        [SerializeField] private float _maxWobble = 12f;
        [SerializeField] private float _bobHeight = 0.08f;
        [SerializeField] private float _bobRate = 14f;

        private CartBody _cart;
        private int _index = -1;
        private float _wobble;
        private float _phase;
        private Vector3 _blendFrom;
        private float _blendTime;
        private float _blendT = 1f;
        private Vector3 _visualBase;
        private Vector3 _visualScale;

        public float HalfWidth => _halfWidth;

        private void Awake()
        {
            if (_visual != null)
            {
                _visualBase = _visual.localPosition;
                _visualScale = _visual.localScale;
            }
            _phase = Random.value * 10f;
        }

        public void Bind(CartBody cart, int riderIndex)
        {
            _cart = cart;
            _index = riderIndex;
        }

        /// <summary>Chuyển mượt từ vị trí hiện tại vào chỗ trên sàn (dùng khi vừa thả từ dây xuống).</summary>
        public void BlendIn(float time)
        {
            _blendFrom = transform.position;
            _blendTime = time;
            _blendT = 0f;
        }

        public void PlayLand()
        {
            if (_visual == null) return;
            _visual.DOKill();
            _visual.localScale = _visualScale;
            _visual.DOPunchScale(new Vector3(0.25f, -0.25f, 0.25f) * _visualScale.y, 0.35f, 6, 0.6f);
        }

        private void LateUpdate()
        {
            if (_cart == null || _index < 0) return;
            float v = _cart.Deck.Velocity(_index);
            float target = Mathf.Clamp(-v * _wobblePerSpeed, -_maxWobble, _maxWobble);
            _wobble = Mathf.Lerp(_wobble, target, 1f - Mathf.Exp(-12f * Time.deltaTime));

            Vector3 pos = _cart.DeckPointWorld(_cart.Deck.Position(_index));
            Quaternion rot = _cart.DeckTransform.rotation * Quaternion.Euler(0f, 0f, _wobble);
            if (_blendT < 1f)
            {
                _blendT = Mathf.Min(1f, _blendT + Time.deltaTime / Mathf.Max(0.01f, _blendTime));
                float e = 1f - (1f - _blendT) * (1f - _blendT);
                pos = Vector3.Lerp(_blendFrom, pos, e);
            }
            transform.SetPositionAndRotation(pos, rot);

            if (_visual != null)
            {
                float moving = Mathf.Clamp01(Mathf.Abs(v) * 2f);
                _phase += Time.deltaTime * _bobRate;
                _visual.localPosition = _visualBase + new Vector3(0f, Mathf.Abs(Mathf.Sin(_phase)) * _bobHeight * moving, 0f);
            }
        }
    }
}
