using ClimbJump;
using UnityEngine;

public class Obstacle : MonoBehaviour, IShow
{
    [SerializeField] private Transform[] _points;
    [SerializeField] private float _speed = 3f;

    private int _currentIndex;
    private int _direction = 1;

    void Start()
    {
        Initialize();
    }
    void Update()
    {
        OnUpdate();
    }

    public void Initialize()
    {
        if (_points == null || _points.Length == 0) return;

        _currentIndex = 0;
        transform.position = _points[_currentIndex].position;
    }
    public void OnUpdate()
    {
        if (_points == null || _points.Length == 0) return;

        var target = _points[_currentIndex].position;
        transform.position = Vector3.MoveTowards(transform.position, target, _speed * Time.deltaTime);

        Vector3 direction = target - transform.position;
        if (direction.sqrMagnitude > 0.001f)
        {
            Quaternion targetRotation = Quaternion.LookRotation(direction);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, _speed * Time.deltaTime);
        }

        if (Vector3.Distance(transform.position, target) < 0.01f)
        {
            _currentIndex += _direction;
            if (_currentIndex >= _points.Length - 1 || _currentIndex <= 0)
                _direction *= -1;
        }
    }

    public void OnExit()
    {

    }

    public void OnTrigger()
    {
    }
}
