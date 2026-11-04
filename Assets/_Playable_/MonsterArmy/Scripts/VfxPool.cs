using System;
using System.Collections.Generic;
using Playable.MonsterArmy.Core;
using UnityEngine;

namespace Playable.MonsterArmy
{
    /// <summary>
    /// Các hiệu ứng trong kho VFX của SSPGame. Tốc độ khung lấy theo README_VFX.md.
    /// </summary>
    public enum VfxKind
    {
        /// <summary>Nổ lớn 22 khung: lựu đạn, TNT, tên lửa, bom.</summary>
        BigExplosion,

        /// <summary>Tia lửa va chạm, 4 kiểu, rút ngẫu nhiên.</summary>
        Spark,

        /// <summary>Lửa đầu nòng, 2 khung, chớp một lần.</summary>
        MuzzleFlash,

        SmallFireball,
        Puff,
        Smoke,
        AcidSplat
    }

    /// <summary>Một chuỗi khung hình cùng tốc độ phát và chiều cao hiển thị.</summary>
    [Serializable]
    public struct VfxClip
    {
        public Sprite[] Frames;
        public float Fps;

        /// <summary>Chiều cao mong muốn trong world unit. Sprite được co về đúng mức này.</summary>
        public float Height;

        public bool IsValid => Frames != null && Frames.Length > 0 && Fps > 0f && Height > 0f;
    }

    /// <summary>
    /// Pool SpriteRenderer phát các chuỗi VFX pixel.
    ///
    /// Dùng sprite sequence chứ không phải ParticleSystem: hiệu ứng phải khớp tông
    /// pixel art của SSPGame. Particle 3D có sẵn trong repo cố tình không dùng.
    /// </summary>
    public sealed class VfxPool : MonoBehaviour
    {
        [SerializeField] private MonsterArtLibrary _art;
        [SerializeField] private int _prewarmCount = 32;

        private sealed class Instance
        {
            public SpriteRenderer Renderer;
            public VfxClip Clip;
            public float Elapsed;
            public bool Active;
            public Vector3 BaseScale;
            public MonsterUnit FollowTarget;
            public bool Attached;
            public float Duration;
        }

        private readonly List<Instance> _instances = new List<Instance>();
        private int _activeCount;

        /// <summary>Trần hiệu ứng đồng thời. ChaosDirector chỉnh theo số quái sống.</summary>
        public int Budget { get; set; } = 6;

        public int ActiveCount => _activeCount;

        public void SetLibrary(MonsterArtLibrary art) => _art = art;

        private void Awake()
        {
            Prewarm(_prewarmCount);
        }

        public void Prewarm(int count)
        {
            while (_instances.Count < count) _instances.Add(CreateInstance());
        }

        /// <summary>
        /// Phát một hiệu ứng. Trả về false khi đã chạm trần — khi đó hiệu ứng được gộp
        /// vào cái đang chạy gần nhất bằng cách phóng to, nên màn hình vẫn dữ dội mà số
        /// object không tăng.
        /// </summary>
        public bool TrySpawn(VfxKind kind, Vector3 position, Color tint, int variantRoll = 0,
            float rotation = 0f, MonsterUnit followTarget = null, float duration = 0f)
        {
            if (_art == null) return false;

            VfxClip clip = _art.Vfx(kind, variantRoll);
            if (!clip.IsValid) return false;

            if (_activeCount >= Mathf.Min(Budget, ChaosTier.MaxConcurrentExplosionsCap))
            {
                MergeIntoNearest(position);
                return false;
            }

            Instance instance = TakeFree();
            instance.Active = true;
            instance.Elapsed = 0f;
            instance.Clip = clip;
            instance.FollowTarget = followTarget;
            instance.Attached = followTarget != null;
            instance.Duration = duration;

            float sourceHeight = clip.Frames[0] != null ? clip.Frames[0].bounds.size.y : 0f;
            float scale = sourceHeight > 0.0001f ? clip.Height / sourceHeight : 1f;
            instance.BaseScale = Vector3.one * scale;

            Transform t = instance.Renderer.transform;
            t.position = position;
            t.localScale = instance.BaseScale;
            t.localRotation = Quaternion.Euler(0f, 0f, rotation);

            instance.Renderer.sprite = clip.Frames[0];
            instance.Renderer.color = tint;
            instance.Renderer.sortingOrder = 20000;   // luôn vẽ trên mọi nhân vật
            instance.Renderer.enabled = true;

            _activeCount++;
            return true;
        }

        private void Update()
        {
            if (_activeCount == 0) return;

            foreach (Instance instance in _instances)
            {
                if (!instance.Active) continue;

                VfxClip clip = instance.Clip;
                float frameDuration = 1f / clip.Fps;
                float clipLifetime = clip.Frames.Length * frameDuration;
                float lifetime = instance.Duration > 0f ? instance.Duration : clipLifetime;

                instance.Elapsed += Time.deltaTime;
                if (instance.Elapsed >= lifetime || (instance.Attached &&
                    (instance.FollowTarget == null || !instance.FollowTarget.gameObject.activeInHierarchy)))
                {
                    instance.Active = false;
                    instance.FollowTarget = null;
                    instance.Renderer.enabled = false;
                    _activeCount--;
                    continue;
                }

                if (instance.Attached)
                    instance.Renderer.transform.position = instance.FollowTarget.VisualBounds.center;

                int frame = (int)(instance.Elapsed / frameDuration) % clip.Frames.Length;
                instance.Renderer.sprite = clip.Frames[frame];
            }
        }

        /// <summary>Phóng to hiệu ứng đang chạy gần nhất thay vì sinh object mới.</summary>
        private void MergeIntoNearest(Vector3 position)
        {
            Instance nearest = null;
            float nearestDistance = float.MaxValue;

            foreach (Instance instance in _instances)
            {
                if (!instance.Active) continue;

                float distance = (instance.Renderer.transform.position - position).sqrMagnitude;
                if (distance >= nearestDistance) continue;

                nearestDistance = distance;
                nearest = instance;
            }

            if (nearest == null) return;

            Transform t = nearest.Renderer.transform;
            // Chặn trên để một chuỗi dài yêu cầu bị từ chối không thổi hiệu ứng to vô hạn.
            float capped = Mathf.Min(t.localScale.x * 1.25f, nearest.BaseScale.x * 2.5f);
            t.localScale = Vector3.one * capped;
        }

        private Instance TakeFree()
        {
            foreach (Instance instance in _instances)
                if (!instance.Active)
                    return instance;

            Instance created = CreateInstance();
            _instances.Add(created);
            return created;
        }

        private Instance CreateInstance()
        {
            var go = new GameObject("Vfx");
            go.transform.SetParent(transform, false);

            var renderer = go.AddComponent<SpriteRenderer>();
            renderer.enabled = false;

            return new Instance { Renderer = renderer, Active = false, BaseScale = Vector3.one };
        }
    }
}
