using UnityEngine;

namespace Playable
{
    public sealed class PaintballNpcController : MonoBehaviour
    {
        public enum NpcState { Idle, Walk, Chase, Attack, Return }
        [SerializeField] private PaintballNpcMotor _motor;
        [SerializeField] private Animator _animator;
        [SerializeField] private Transform _hitMarker;
        [SerializeField] private float _walkSpeed = 1.5f;
        [SerializeField] private float _chaseSpeed = 3f;
        [SerializeField] private float _attackRange = 1.4f;
        [SerializeField] private float _attackCooldown = 1f;
        [SerializeField] private float _windup = 0.35f;
        [SerializeField] private float _leash = 12f;
        private readonly RaycastHit[] _hits = new RaycastHit[24];
        private PlayerPaintballController _target;
        private float _timer, _hitTime, _stuckTime;
        private bool _paused, _strikePending;
        private int _routeIndex;
        public NpcState State { get; private set; }
        public int ReceivedHits { get; private set; }
        public float ReceivedDamage { get; private set; }
        public void ResetNpc()
        {
            _motor.ResetToHome();
            _target = null;
            _routeIndex = 0;
            _strikePending = false;
            _stuckTime = 0;
            ReceivedHits = 0;
            ReceivedDamage = 0;
            _hitTime = 0;
            if (_hitMarker != null) _hitMarker.gameObject.SetActive(false);
            State = NpcState.Idle;
            _timer = Random.Range(1f, 3f);
            _animator.Rebind();
            _animator.Update(0);
        }
        public void SetPaused(bool paused)
        {
            _paused = paused;
            _motor.Stop();
            _animator.speed = paused ? 0f : 1f;
        }
        public void ReceiveHit(PlayerPaintballController attacker, float damage)
        {
            if (_paused || attacker == null || !attacker.IsEquipped || damage <= 0f) return;
            ReceivedHits++;
            ReceivedDamage += damage;
            _target = attacker;
            if (State != NpcState.Attack) State = NpcState.Chase;
            _hitTime = 0.2f;
            if (_hitMarker != null) _hitMarker.gameObject.SetActive(true);
        }
        private void FixedUpdate()
        {
            if (_paused) return;
            float dt = Time.fixedDeltaTime;
            _hitTime -= dt;
            if (_hitTime <= 0f && _hitMarker != null) _hitMarker.gameObject.SetActive(false);
            _timer -= dt;
            if (_target != null && (!_target.IsEquipped ||
                Vector3.Distance(_target.Player.transform.position, _motor.Home) > _leash))
            { _target = null; _strikePending = false; State = NpcState.Return; }
            switch (State)
            {
                case NpcState.Idle:
                    _motor.Stop();
                    if (_timer <= 0 && _motor.RouteCount > 1)
                    {
                        _routeIndex = (_routeIndex + (Random.value < 0.5f ? 1 : _motor.RouteCount - 1)) % _motor.RouteCount;
                        State = NpcState.Walk;
                        _stuckTime = 0;
                    }
                    break;
                case NpcState.Walk:
                    bool arrived = _motor.MoveTowards(_motor.RoutePoint(_routeIndex), _walkSpeed);
                    _stuckTime = _motor.Velocity.sqrMagnitude < 0.01f ? _stuckTime + dt : 0;
                    if (arrived || _stuckTime > 2f) EnterIdle();
                    break;
                case NpcState.Chase:
                    if (_target == null) { State = NpcState.Return; break; }
                    Vector3 target = _target.Player.transform.position;
                    if (Vector3.Distance(transform.position, target) <= _attackRange)
                    {
                        State = NpcState.Attack;
                        _timer = _attackCooldown;
                        _strikePending = true;
                        _animator.Play("Punch", 0, 0f);
                        _motor.Stop();
                    }
                    else _motor.MoveTowards(target, _chaseSpeed);
                    break;
                case NpcState.Attack:
                    _motor.Stop();
                    if (_target == null) { State = NpcState.Return; break; }
                    _motor.Face(_target.Player.transform.position);
                    if (_strikePending && _timer <= _attackCooldown - _windup)
                    {
                        _strikePending = false;
                        if (Vector3.Distance(transform.position, _target.Player.transform.position) <= _attackRange + 0.15f && HasClearStrike())
                            _target.ReceiveHit();
                    }
                    if (_timer <= 0) State = NpcState.Chase;
                    break;
                case NpcState.Return:
                    if (_motor.MoveTowards(_motor.Home, _walkSpeed)) EnterIdle();
                    break;
            }
            _animator.SetFloat("speed", _motor.Velocity.magnitude);
        }
        private bool HasClearStrike()
        {
            Vector3 origin = transform.position + Vector3.up;
            Vector3 direction = _target.Player.transform.position + Vector3.up - origin;
            int count = Physics.RaycastNonAlloc(origin, direction.normalized, _hits, direction.magnitude,
                ~0, QueryTriggerInteraction.Ignore);
            for (int i = 0; i < count; i++)
                if (!_hits[i].transform.IsChildOf(transform) && !_hits[i].transform.IsChildOf(_target.Player.transform)) return false;
            return true;
        }
        private void EnterIdle() { State = NpcState.Idle; _motor.Stop(); _timer = Random.Range(1f, 3f); }
        private void OnDisable() { _target = null; _strikePending = false; if (_motor != null) _motor.Stop(); }
    }
}
