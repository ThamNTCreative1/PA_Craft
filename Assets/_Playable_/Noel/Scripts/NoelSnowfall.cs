using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>
    /// Tuyết rơi Noel: bật emission và bám theo target (player; người chơi được gắn vào ghế xe khi lái nên vẫn theo).
    /// PA_Craft (plan O1-A): target serialize bắt buộc, không runtime search, không SnowQuality/SnowTrailPainter.
    /// </summary>
    [RequireComponent(typeof(ParticleSystem))]
    public class NoelSnowfall : MonoBehaviour
    {
        [Tooltip("Đối tượng tuyết rơi bám theo (Player).")]
        [SerializeField] private Transform target;
        [Tooltip("Độ lệch của vùng sinh tuyết so với đối tượng bám theo.")]
        [SerializeField] private Vector3 offset = new Vector3(0f, 6f, 0f);
        [Tooltip("Số bông tuyết sinh ra mỗi giây.")]
        [SerializeField] private float snowRate = 180f;

        private ParticleSystem particles;

        private void Awake()
        {
            particles = GetComponent<ParticleSystem>();
            var emission = particles.emission;
            emission.rateOverTimeMultiplier = snowRate;
        }

        private void Start()
        {
            Follow();
            if (!particles.isPlaying) particles.Play(true);
        }

        private void LateUpdate()
        {
            Follow();
        }

        private void Follow()
        {
            if (target == null) return;
            transform.position = target.position + offset;
        }
    }
}
