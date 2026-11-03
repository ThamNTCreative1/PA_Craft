using Minigames.StealAnEgg.GamePlay;
using System.Collections;
using UnityEngine;

public class SAE_MonsterMovement : MonoBehaviour
{
    public float moveSpeed;
    public float acceleration;
    public float stopDistance;
    public float angulerSpeed;

    private Rigidbody _rigi;
    private Coroutine _HandleMoveCoroutine;

    private SAE_MonsterAnimator _animatorController;

    public float Forward => (_rigi.linearVelocity.magnitude/moveSpeed);

    private void Awake()
    {
        _rigi = GetComponent<Rigidbody>();
    }

    private void Start()
    {
        _animatorController = GetComponentInChildren<SAE_MonsterAnimator>();
    }

    public void SetMoveToward(Vector3 destination)
    {
        StopMove();

        _HandleMoveCoroutine = StartCoroutine(HandleMoveToWard(destination));
    }

    private void StopMove()
    {
        if(_HandleMoveCoroutine != null)
        {
            StopCoroutine(_HandleMoveCoroutine);
        }
    }

    public void EnableMove(bool state)
    {
        if (_rigi == null) _rigi = GetComponent<Rigidbody>();

        _rigi.useGravity = state;
        _rigi.isKinematic = !state;
    }

    private IEnumerator HandleMoveToWard(Vector3 destination)
    {
        float currentAcceleration = 0;
        float angulerT = 0;
        Vector3 startDirection = transform.forward;
        while ((transform.position - destination).sqrMagnitude > (stopDistance * stopDistance))
        {
            float sqrDistance = (transform.position - destination).sqrMagnitude;
            if (sqrDistance > (stopDistance * stopDistance)*2)
            {
                currentAcceleration += Time.deltaTime * acceleration;
            }
            else
            {
                currentAcceleration = Mathf.Lerp(0.1f, 1, sqrDistance - (stopDistance * stopDistance));
            }
            currentAcceleration = Mathf.Clamp01(currentAcceleration);

            Vector3 direction = destination - transform.position;
            _rigi.linearVelocity = direction.normalized * moveSpeed * currentAcceleration;
            angulerT += Time.deltaTime * angulerSpeed;
            direction.y = 0;
            _rigi.rotation = Quaternion.LookRotation(Vector3.Lerp(startDirection, direction.normalized, angulerT));

            _animatorController.UpdateAnimation(Forward);
            yield return null;
        }

        _rigi.linearVelocity = Vector3.zero;
        _animatorController.UpdateAnimation(Forward);
    }
}
