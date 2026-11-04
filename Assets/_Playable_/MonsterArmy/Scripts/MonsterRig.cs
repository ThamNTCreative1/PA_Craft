using System;
using System.Collections.Generic;
using DG.Tweening;
using Playable.MonsterArmy.Core;
using UnityEngine;

namespace Playable.MonsterArmy
{
    /// <summary>
    /// Dựng nhân vật từ bốn bộ phận (đầu, thân, tay, chân) và hoạt hoạ hoàn toàn
    /// bằng code — không Animator, không file .anim.
    ///
    /// Bốn mảnh của một nhân vật được vẽ cho nhau nên KHÔNG chuẩn hoá chiều cao từng
    /// mảnh: làm vậy sẽ bóp méo những con có bộ phận khác thường (cánh cú rộng 158px,
    /// sừng dê cao 88px). Thay vào đó cả bộ dùng chung một tỉ lệ pixel, còn vị trí
    /// khớp nối thì tính từ kích thước thật của từng sprite.
    /// </summary>
    public sealed class MonsterRig : MonoBehaviour
    {
        /// <summary>Thứ tự vẽ trong một nhân vật.</summary>
        private enum Layer
        {
            ArmBack = 0,
            Leg = 1,
            Body = 2,
            Head = 3,
            ArmFront = 4,
            Weapon = 5
        }

        private const float StepSpeed = 9f;
        private const float StepAngle = 16f;
        private const float BodyBob = 0.025f;

        // Đứng yên vẫn phải thở: nhịp chậm, biên độ nhỏ, tay đung đưa nhẹ. Không có
        // idle thì cả đội quân đứng chết trân như ma-nơ-canh trước lúc bấm START.
        private const float IdleSpeed = 2.2f;
        private const float IdleBob = 0.012f;
        private const float IdleArmAngle = 4.5f;

        /// <summary>Chồng mí chỗ khớp nối để không hở khe giữa các mảnh.</summary>
        private const float JointOverlap = 0.03f;

        [SerializeField] private MonsterArtLibrary _art;

        private readonly List<SpriteRenderer> _renderers = new List<SpriteRenderer>(6);
        private readonly List<int> _layerOffsets = new List<int>(6);
        private readonly List<Transform> _generatedRoots = new List<Transform>(6);

        private SpriteRenderer _head;
        private Transform _bodyPivot;
        private Transform _legLeft;
        private Transform _legRight;
        private Transform _armBack;
        private Vector3 _bodyRestPosition;
        private bool _attacking;
        private bool _dying;
        private float _phase;
        private bool _walking;
        private bool _built;
        private Tween _attackTween;
        private Tween _deathTween;

        private float _feetY;
        public Vector3 FeetPosition => transform.TransformPoint(new Vector3(0f, _feetY, 0f));

        public Transform WeaponAnchor { get; private set; }

        /// <summary>Chiều cao toàn thân sau khi dựng, dùng cho khung hình camera.</summary>
        public float Height { get; private set; }
        public Vector3 HeadTop => _head != null
            ? new Vector3(_head.bounds.center.x, _head.bounds.max.y, transform.position.z)
            : transform.position + Vector3.up * 1.7f;

        public Bounds WorldBounds
        {
            get
            {
                var bounds = new Bounds(transform.position, Vector3.zero);
                foreach (SpriteRenderer renderer in _renderers)
                    if (renderer != null) bounds.Encapsulate(renderer.bounds);
                return bounds;
            }
        }

        public Vector3 BossEyePosition(bool rightEye)
        {
            if (_head == null || _head.sprite == null) return HeadTop;
            Bounds bounds = _head.sprite.bounds;
            // Eye centers in the Zombie/Huou head artwork, below the antlers.
            Vector3 local = new Vector3(
                bounds.min.x + bounds.size.x * (rightEye ? 0.61f : 0.36f),
                bounds.min.y + bounds.size.y * 0.49f, 0f);
            return _head.transform.TransformPoint(local);
        }

        public void SetLibrary(MonsterArtLibrary art) => _art = art;

        public void Build(MonsterSpecies species, int variantSeed)
        {
            SpeciesInfo info = MonsterRoster.Get(species);
            Build(_art != null ? _art.PartsFor(species) : default, info.Kind, variantSeed);
        }

        public void BuildBoss(int variantSeed)
        {
            Build(_art != null ? _art.BossParts : default, MonsterKind.Tank, variantSeed, false);
        }

        public void Build(CharacterParts parts, MonsterKind kind, int variantSeed, bool equipWeapon = true)
        {
            Clear();
            if (!parts.IsComplete)
            {
                Debug.LogError("[MonsterArmy] MonsterRig thiếu bộ phận nhân vật", this);
                return;
            }

            var random = new System.Random(variantSeed);
            _phase = (float)random.NextDouble() * Mathf.PI * 2f;

            float bodyHalf = parts.Body.bounds.extents.y;
            float bodyHalfWidth = parts.Body.bounds.extents.x;
            float legHeight = parts.Leg.bounds.size.y;
            float headHalf = parts.Head.bounds.extents.y;

            // Chân treo từ khớp hông: pivot đặt ở hông, sprite đẩy xuống nửa chiều dài,
            // nhờ vậy xoay pivot là chân đung đưa đúng cách chứ không quay quanh giữa chân.
            float hipY = -bodyHalf + JointOverlap;
            _feetY = hipY - legHeight;
            float legX = bodyHalfWidth * 0.45f;
            _legLeft = Limb("LegLeft", parts.Leg, Layer.Leg, new Vector3(-legX, hipY, 0f), legHeight);
            _legRight = Limb("LegRight", parts.Leg, Layer.Leg, new Vector3(legX, hipY, 0f), legHeight);

            var body = Part("Body", parts.Body, Layer.Body, Vector3.zero);
            _bodyPivot = body.transform;
            _bodyRestPosition = _bodyPivot.localPosition;

            _head = Part("Head", parts.Head, Layer.Head,
                new Vector3(0f, bodyHalf + headHalf - JointOverlap, 0f));

            // Tay sau vẽ dưới thân, tay trước cầm vũ khí.
            float shoulderY = bodyHalf * 0.55f;
            float shoulderX = bodyHalfWidth * 0.9f;
            float armHeight = parts.Arm.bounds.size.y;
            _armBack = Limb("ArmBack", parts.Arm, Layer.ArmBack,
                new Vector3(-shoulderX, shoulderY, 0f), armHeight);
            WeaponAnchor = Limb("ArmFront", parts.Arm, Layer.ArmFront,
                new Vector3(shoulderX, shoulderY, 0f), armHeight);

            // Mỗi nhân vật một vũ khí riêng, rút từ seed nên cùng seed luôn ra cùng món.
            Sprite weapon = equipWeapon && _art != null ? _art.RandomWeapon(kind, random.Next()) : null;
            if (weapon != null)
            {
                // Vũ khí cầm ở đầu mút tay, co về cỡ hợp lý so với thân.
                float weaponTarget = bodyHalf * 1.5f;
                float weaponHeight = weapon.bounds.size.y;
                SpriteRenderer held = Part("Weapon", weapon, Layer.Weapon,
                    new Vector3(0f, -armHeight * 0.55f, 0f), WeaponAnchor);
                if (weaponHeight > 0.0001f)
                    held.transform.localScale = Vector3.one * (weaponTarget / weaponHeight);
            }

            Height = legHeight + bodyHalf * 2f + headHalf * 2f - JointOverlap * 2f;
            _built = true;
            SetWalking(false);
        }

        /// <summary>
        /// Đi hay đứng. Đứng KHÔNG có nghĩa là bất động — AnimateIdle vẫn chạy nhịp thở.
        /// </summary>
        public void SetWalking(bool walking)
        {
            _walking = walking;
        }

        /// <summary>
        /// Đòn đánh: lấy đà ra sau, bổ tới, rồi về. Thân lao theo một nhịp ngắn để cú
        /// đánh có sức nặng chứ không chỉ là cái tay quay.
        /// </summary>
        public void PlayAttack()
        {
            if (!_built || _dying || WeaponAnchor == null) return;

            _attackTween?.Kill();
            _attacking = true;
            WeaponAnchor.localRotation = Quaternion.identity;

            Sequence sequence = DOTween.Sequence();
            sequence.Append(WeaponAnchor.DOLocalRotate(new Vector3(0f, 0f, 40f), 0.08f)
                .SetEase(Ease.OutQuad));
            sequence.Append(WeaponAnchor.DOLocalRotate(new Vector3(0f, 0f, -85f), 0.07f)
                .SetEase(Ease.InBack));
            sequence.Append(WeaponAnchor.DOLocalRotate(Vector3.zero, 0.12f).SetEase(Ease.OutQuad));

            if (_bodyPivot != null)
            {
                sequence.Join(_bodyPivot
                    .DOLocalMoveX(_bodyRestPosition.x + 0.05f, 0.09f)
                    .SetEase(Ease.OutQuad)
                    .SetLoops(2, LoopType.Yoyo));
            }

            sequence.OnComplete(() => _attacking = false);
            _attackTween = sequence;
        }

        public void PlayBossAttack(BossSkill skill)
        {
            if (!_built || _dying || WeaponAnchor == null) return;
            _attackTween?.Kill();
            _attacking = true;
            _walking = false;
            WeaponAnchor.localRotation = Quaternion.identity;
            if (_armBack != null) _armBack.localRotation = Quaternion.identity;
            if (_bodyPivot != null) _bodyPivot.localPosition = _bodyRestPosition;
            float windup = skill == BossSkill.Roar ? -65f : 75f;
            Sequence sequence = DOTween.Sequence();
            sequence.Append(WeaponAnchor.DOLocalRotate(new Vector3(0f, 0f, windup), 0.4f).SetEase(Ease.OutQuad));
            if (_armBack != null)
                sequence.Join(_armBack.DOLocalRotate(new Vector3(0f, 0f, -windup), 0.4f));
            sequence.AppendInterval(0.1f);
            sequence.Append(WeaponAnchor.DOLocalRotate(new Vector3(0f, 0f, -100f), 0.1f).SetEase(Ease.InQuad));
            if (_bodyPivot != null)
                sequence.Join(_bodyPivot.DOLocalMoveY(_bodyRestPosition.y - 0.12f, 0.1f));
            sequence.Append(WeaponAnchor.DOLocalRotate(Vector3.zero, 0.25f));
            if (_armBack != null) sequence.Join(_armBack.DOLocalRotate(Vector3.zero, 0.25f));
            if (_bodyPivot != null) sequence.Join(_bodyPivot.DOLocalMove(_bodyRestPosition, 0.25f));
            sequence.OnComplete(() => _attacking = false);
            _attackTween = sequence;
        }

        public void StopAttack()
        {
            _attackTween?.Kill();
            _attacking = false;
            _walking = false;
            if (_dying) return;
            if (WeaponAnchor != null) WeaponAnchor.localRotation = Quaternion.identity;
            if (_armBack != null) _armBack.localRotation = Quaternion.identity;
            if (_bodyPivot != null) _bodyPivot.localPosition = _bodyRestPosition;
        }

        public void PlayDeath(Action onComplete)
        {
            if (!_built)
            {
                onComplete?.Invoke();
                return;
            }

            _attackTween?.Kill();
            _deathTween?.Kill();

            _dying = true;
            _walking = false;
            _attacking = false;
            if (_bodyPivot != null) _bodyPivot.localPosition = _bodyRestPosition;
            Sequence sequence = DOTween.Sequence();
            sequence.Append(transform.DOLocalRotate(new Vector3(0f, 0f, 90f), 0.28f).SetEase(Ease.OutQuad));
            sequence.AppendInterval(0.18f);
            sequence.Append(DOVirtual.Float(1f, 0f, 0.28f, SetAlpha).SetEase(Ease.InQuad));
            sequence.OnComplete(() => onComplete?.Invoke());
            _deathTween = sequence;
        }

        /// <summary>
        /// Chạy mỗi frame cho mỗi nhân vật: một vòng lặp, không cấp phát, không so
        /// sánh chuỗi, không GetComponent.
        /// </summary>
        public void SetSortingOrder(int order)
        {
            for (int i = 0; i < _renderers.Count; i++)
            {
                SpriteRenderer renderer = _renderers[i];
                if (renderer != null) renderer.sortingOrder = order + _layerOffsets[i];
            }
        }

        public void ResetForReuse()
        {
            _attackTween?.Kill();
            _deathTween?.Kill();
            _attackTween = null;
            _deathTween = null;
            _dying = false;
            _attacking = false;
            transform.localRotation = Quaternion.identity;
            if (WeaponAnchor != null) WeaponAnchor.localRotation = Quaternion.identity;
            SetAlpha(1f);
            SetWalking(false);
        }

        private void LateUpdate()
        {
            if (!_built || _dying) return;

            if (_walking) AnimateWalk();
            else AnimateIdle();
        }

        private void AnimateWalk()
        {
            float swing = Mathf.Sin(Time.time * StepSpeed + _phase) * StepAngle;
            if (_legLeft != null) _legLeft.localRotation = Quaternion.Euler(0f, 0f, swing);
            if (_legRight != null) _legRight.localRotation = Quaternion.Euler(0f, 0f, -swing);
            if (_armBack != null && !_attacking) _armBack.localRotation = Quaternion.Euler(0f, 0f, -swing * 0.6f);

            if (_bodyPivot == null || _attacking) return;
            // Thân nhấp nhô gấp đôi tần số chân: mỗi bước một nhịp nhún.
            float bob = Mathf.Abs(Mathf.Sin(Time.time * StepSpeed + _phase)) * BodyBob;
            _bodyPivot.localPosition = _bodyRestPosition + new Vector3(0f, bob, 0f);
        }

        /// <summary>
        /// Nhịp thở lúc đứng yên. Pha lệch theo từng nhân vật nên cả đội không thở
        /// đồng loạt như một khối.
        /// </summary>
        private void AnimateIdle()
        {
            float wave = Mathf.Sin(Time.time * IdleSpeed + _phase);

            if (_legLeft != null) _legLeft.localRotation = Quaternion.identity;
            if (_legRight != null) _legRight.localRotation = Quaternion.identity;
            if (_armBack != null && !_attacking) _armBack.localRotation = Quaternion.Euler(0f, 0f, wave * IdleArmAngle);

            if (_bodyPivot == null || _attacking) return;
            _bodyPivot.localPosition = _bodyRestPosition + new Vector3(0f, wave * IdleBob, 0f);
        }

        /// <summary>
        /// Tạo một chi treo từ khớp: trả về transform của KHỚP, còn sprite nằm bên dưới
        /// lệch xuống nửa chiều dài. Xoay khớp thì chi quét đúng như tay chân thật.
        /// </summary>
        private Transform Limb(string name, Sprite sprite, Layer layer, Vector3 jointPosition,
            float limbHeight)
        {
            var joint = new GameObject(name).transform;
            joint.SetParent(transform, false);
            _generatedRoots.Add(joint);
            joint.localPosition = jointPosition;

            Part(name + " Sprite", sprite, layer, new Vector3(0f, -limbHeight * 0.5f, 0f), joint);
            return joint;
        }

        private SpriteRenderer Part(string name, Sprite sprite, Layer layer, Vector3 localPosition,
            Transform parent = null)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent != null ? parent : transform, false);
            if (parent == null) _generatedRoots.Add(go.transform);
            go.transform.localPosition = localPosition;

            var renderer = go.AddComponent<SpriteRenderer>();
            renderer.sprite = sprite;
            renderer.sortingOrder = (int)layer;

            _renderers.Add(renderer);
            _layerOffsets.Add((int)layer);
            return renderer;
        }

        private void SetAlpha(float alpha)
        {
            for (int i = 0; i < _renderers.Count; i++)
            {
                SpriteRenderer renderer = _renderers[i];
                if (renderer == null) continue;

                Color colour = renderer.color;
                colour.a = alpha;
                renderer.color = colour;
            }
        }

        private void Clear()
        {
            _attackTween?.Kill();
            _deathTween?.Kill();
            _attackTween = null;
            _deathTween = null;

            for (int i = _generatedRoots.Count - 1; i >= 0; i--)
            {
                Transform child = _generatedRoots[i];
                if (child == null) continue;
                if (Application.isPlaying)
                {
                    // Destroy chỉ có hiệu lực cuối frame; tách khỏi cây ngay để lần dựng
                    // mới không nhìn thấy bộ phận cũ.
                    child.SetParent(null, false);
                    Destroy(child.gameObject);
                }
                else
                {
                    DestroyImmediate(child.gameObject);
                }
            }

            _generatedRoots.Clear();
            _renderers.Clear();
            _layerOffsets.Clear();
            _head = null;
            _armBack = null;
            _attacking = false;
            WeaponAnchor = null;
            Height = 0f;
            _built = false;
        }

        private void OnDestroy()
        {
            _attackTween?.Kill();
            _deathTween?.Kill();
        }
    }
}
