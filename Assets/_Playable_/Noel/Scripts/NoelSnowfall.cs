using Playable;
using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>
    /// Tuyết rơi Noel cho gameplay playable (thay cho WeatherController bên party-craft).
    /// Đặt trên prefab noel_snowfall: bật emission, bám theo người chơi (kể cả khi đang lái xe vì người chơi
    /// được gắn vào ghế xe) và gắn SnowTrailPainter lên người chơi để đi qua lớp tuyết thì để lại vệt chân.
    /// </summary>
    [RequireComponent(typeof(ParticleSystem))]
    public class NoelSnowfall : MonoBehaviour
    {
        [Tooltip("Đối tượng tuyết rơi bám theo. Để trống = tự tìm PlayerController trong scene, không có thì dùng Camera.main.")]
        [SerializeField] private Transform target;
        [Tooltip("Độ lệch của vùng sinh tuyết so với đối tượng bám theo.")]
        [SerializeField] private Vector3 offset = new Vector3(0f, 6f, 0f);
        [Tooltip("Số bông tuyết sinh ra mỗi giây (mức Low của SnowQuality dùng LowSnowfallRate).")]
        [SerializeField] private float snowRate = 180f;
        [Tooltip("Gắn SnowTrailPainter lên người chơi để dọn tuyết dưới chân.")]
        [SerializeField] private bool paintTrails = true;

        private ParticleSystem particles;

        private void Awake()
        {
            particles = GetComponent<ParticleSystem>();

            bool low = SnowQuality.SnowfallLow;
            var main = particles.main;
            var emission = particles.emission;
            if (low)
            {
                main.maxParticles = SnowQuality.LowSnowfallMaxParticles;
                var shape = particles.shape;
                shape.scale = SnowQuality.LowSnowfallBoxScale;
                main.startSizeMultiplier *= SnowQuality.LowSnowfallSizeMultiplier;
            }
            emission.rateOverTimeMultiplier = low ? SnowQuality.LowSnowfallRate : snowRate;
        }

        private void Start()
        {
            if (target == null)
            {
#pragma warning disable CS0618 // Luna hỗ trợ FindObjectOfType, chưa chắc hỗ trợ FindFirstObjectByType
                PlayerController player = FindObjectOfType<PlayerController>();
#pragma warning restore CS0618
                if (player != null) target = player.transform;
            }

            if (paintTrails && target != null && target.GetComponent<SnowTrailPainter>() == null)
                target.gameObject.AddComponent<SnowTrailPainter>();

            Follow();
            if (!particles.isPlaying) particles.Play(true);
        }

        private void LateUpdate()
        {
            Follow();
        }

        private void Follow()
        {
            Transform t = target;
            if (t == null || !t.gameObject.activeInHierarchy)
            {
                Camera cam = Camera.main;
                if (cam == null) return;
                t = cam.transform;
            }
            transform.position = t.position + offset;
        }
    }
}
