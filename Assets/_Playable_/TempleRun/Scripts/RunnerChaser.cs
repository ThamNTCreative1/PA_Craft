using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>
    /// The monster that chases the player. It stays a few meters behind (never catches him)
    /// and only reaches the player after a crash (Catch()).
    /// </summary>
    public class RunnerChaser : MonoBehaviour
    {
        public RunnerPlayer player;
        public Animator animator;
        [Tooltip("Visual root (child) used for the bobbing / lean.")]
        public Transform model;

        [Header("Chase")]
        public float followDistance = 11f;
        public float distanceWobble = 0.5f;
        public float wobbleSpeed = 0.9f;
        public float lateralSmoothTime = 0.3f;
        [Tooltip("Hop height when running over obstacles the player already passed.")]
        public float hopSmooth = 12f;

        [Header("Catch")]
        public float catchSpeed = 12f;
        public float catchDistance = 1.1f;
        public GameObject biteBloodPrefab;
        private GameObject _biteBlood;
        private bool _bitten;

        [Header("Procedural run (models without animation, e.g. Tralalero)")]
        public float stepsPerMeter = 0.25f;
        public float bobHeight = 0.16f;
        public float waddleAngle = 7f;
        public float pitchAngle = 4f;

        [Header("Animation")]
        [Tooltip("Speed (m/s) at which the run animation plays at 1x.")]
        public float animReferenceSpeed = 9f;

        private float _vx;
        private bool _catching;
        private bool _stopped;
        private float _z;
        private float _y;
        private float _time;
        private bool _placed;
        private bool _procedural;
        private float _phase;
        private Vector3 _modelPos;
        private Quaternion _modelRot = Quaternion.identity;

        private void Start()
        {
            Snap();
            if (model != null)
            {
                _modelPos = model.localPosition;
                _modelRot = model.localRotation;
            }

            _procedural = model != null && (animator == null || animator.runtimeAnimatorController == null);
            if (animator == null) return;
            // whatever controller the monster comes with: switch it to its moving state
            AnimatorControllerParameter[] ps = animator.parameters;
            for (int i = 0; i < ps.Length; i++)
            {
                string n = ps[i].name.ToLowerInvariant();
                bool move = n.Contains("walk") || n.Contains("run") || n.Contains("move") || n.Contains("chase");
                if (ps[i].type == AnimatorControllerParameterType.Bool && move) animator.SetBool(ps[i].nameHash, true);
                if (ps[i].type == AnimatorControllerParameterType.Float && (move || n == "speed")) animator.SetFloat(ps[i].nameHash, 1f);
            }
        }

        public void Snap()
        {
            if (player == null) return;
            Vector3 p = player.transform.position;
            _z = p.z - followDistance;
            _y = 0f;
            transform.position = new Vector3(p.x, 0f, _z);
            transform.rotation = Quaternion.identity;
            _placed = true;
        }

        public void ResetRun()
        {
            _catching = _stopped = _bitten = false;
            if (_biteBlood != null) Destroy(_biteBlood);
            _vx = _time = _phase = 0f;
            if (model != null)
            {
                model.localPosition = _modelPos;
                model.localRotation = _modelRot;
            }
            if (animator != null) animator.speed = 1f;
            Snap();
        }

        public void Catch()
        {
            _catching = true;
        }

        public void Stop()
        {
            _stopped = true;
            if (animator != null) animator.speed = 0.6f;
        }

        public void ShiftZ(float dz)
        {
            _z += dz;
            transform.position += new Vector3(0f, 0f, dz);
        }

        private void Update()
        {
            if (player == null || _stopped) return;
            if (!_placed) Snap();
            float dt = Time.deltaTime;
            if (dt <= 0f) return;
            _time += dt;
            Vector3 pp = player.transform.position;
            Vector3 p = transform.position;

            float speed;
            if (!_catching)
            {
                // always a bit behind: close in and fall back like it is struggling to catch up
                float d = followDistance + Mathf.Sin(_time * wobbleSpeed) * distanceWobble;
                float target = pp.z - d;
                float prev = _z;
                _z = Mathf.Lerp(_z, target, 1f - Mathf.Exp(-8f * dt));
                speed = (_z - prev) / dt;
            }
            else
            {
                float target = pp.z - catchDistance;
                float prev = _z;
                _z = Mathf.MoveTowards(_z, target, catchSpeed * dt);
                speed = (_z - prev) / dt;
            }

            p.x = Mathf.SmoothDamp(p.x, pp.x, ref _vx, lateralSmoothTime, Mathf.Infinity, dt);
            p.z = _z;

            // hop over obstacles left behind by the player
            float ground = GroundHeight(p);
            _y = Mathf.Lerp(_y, ground, 1f - Mathf.Exp(-hopSmooth * dt));
            p.y = _y;
            transform.position = p;
            if (_catching && !_bitten && Mathf.Abs(pp.z - p.z) <= catchDistance + 0.1f && Mathf.Abs(pp.x - p.x) < 0.7f)
            {
                _bitten = true;
                if (biteBloodPrefab != null)
                {
                    _biteBlood = Instantiate(biteBloodPrefab, pp + Vector3.up * 0.8f, Quaternion.identity);
                    Destroy(_biteBlood, 1.5f);
                }
            }

            // face the player, lean a bit into the lateral movement
            Vector3 look = new Vector3(pp.x - p.x, 0f, Mathf.Max(0.5f, pp.z - p.z));
            Quaternion rot = Quaternion.LookRotation(look.normalized, Vector3.up) * Quaternion.Euler(0f, 0f, -Mathf.Clamp(_vx, -6f, 6f) * 2f);
            transform.rotation = Quaternion.Slerp(transform.rotation, rot, 1f - Mathf.Exp(-10f * dt));

            if (_procedural)
            {
                // hop-run: bounce on every step, waddle side to side
                _phase += Mathf.Abs(speed) * dt * stepsPerMeter * Mathf.PI * 2f;
                float st = Mathf.Sin(_phase);
                model.localPosition = _modelPos + new Vector3(0f, Mathf.Abs(st) * bobHeight, 0f);
                model.localRotation = _modelRot * Quaternion.Euler(Mathf.Cos(_phase * 2f) * pitchAngle, st * 3f, st * waddleAngle);
            }

            if (animator != null)
                animator.speed = Mathf.Clamp(Mathf.Abs(speed) / Mathf.Max(1f, animReferenceSpeed), 0.6f, 1.8f);
        }

        private float GroundHeight(Vector3 p)
        {
            TrackGenerator track = player.Track;
            if (track == null) return 0f;
            float ground = 0f;
            for (int i = 0; i < track.ActiveObstacles.Count; i++)
            {
                RunnerObstacle ob = track.ActiveObstacles[i];
                if (ob.kind == ObstacleKind.Tall) continue;
                Vector3 mn = ob.Min;
                Vector3 mx = ob.Max;
                if (mx.x <= p.x - 0.5f || mn.x >= p.x + 0.5f) continue;
                if (mx.z <= p.z - 1.2f || mn.z >= p.z + 1.2f) continue;
                if (mx.y > ground) ground = mx.y;
            }

            return ground;
        }
    }
}
