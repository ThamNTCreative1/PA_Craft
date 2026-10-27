using UnityEngine;

namespace Minigames.KeyboardEscape.Gameplay
{
    public class KeyboardEscape_BallTrap : MonoBehaviour
    {
        [SerializeField] private Transform start;
        [SerializeField] private Transform end;
        [SerializeField] private Transform ball;

        [Header("Setting")]
        [SerializeField] private float speed;
        [SerializeField] private float angularSpeed;
        [SerializeField] private float intervalTime;

        public Playable.KeyboardEscape.EscapeGame game;
        public BoxCollider hitVolume;
        private bool touchingPlayer;
        public Vector3[] mapRoute;
        public float mapSpeed = 17f;
        private int routeIndex;
        private float moveT;

        private void Start()
        {
            RestartRound();
        }

        public void RestartRound()
        {
            CancelInvoke();
            touchingPlayer = false;
            ball.gameObject.SetActive(false);
            Invoke(nameof(GenerateBall), intervalTime);
        }

        private void GenerateBall()
        {
            touchingPlayer = false;
            moveT = 0;
            routeIndex = 0;
            ball.position = mapRoute != null && mapRoute.Length > 1 ? mapRoute[0] : start.position;
            ball.gameObject.SetActive(true);
        }

        private void FixedUpdate()
        {
            if(ball.gameObject.activeSelf)
            {
                if (mapRoute != null && mapRoute.Length > 1)
                {
                    float remaining = Time.fixedDeltaTime * mapSpeed;
                    while (remaining > 0 && routeIndex < mapRoute.Length - 1)
                    {
                        Vector3 next = mapRoute[routeIndex + 1];
                        float distance = Vector3.Distance(ball.position, next);
                        if (distance <= remaining) { ball.position = next; remaining -= distance; routeIndex++; }
                        else { ball.position = Vector3.MoveTowards(ball.position, next, remaining); remaining = 0; }
                    }
                    moveT = routeIndex == mapRoute.Length - 1 ? 1 : 0;
                }
                else
                {
                    moveT += Time.fixedDeltaTime * speed;
                    ball.position = Vector3.Lerp(start.position, end.position, moveT);
                }
                CheckPlayerContact();
                ball.Rotate(new Vector3(angularSpeed * Time.fixedDeltaTime, 0, 0), Space.Self);
                if (moveT >= 1)
                {
                    ball.gameObject.SetActive(false);
                    Invoke(nameof(GenerateBall), intervalTime);
                }
            }
        }

        private void CheckPlayerContact()
        {
            if (!game || !hitVolume || !game.IsRunning || !game.player.canMove) return;
            var body = game.player.body;
            Vector3 delta = hitVolume.transform.TransformPoint(hitVolume.center) - body.transform.TransformPoint(body.center);
            Vector3 scale = hitVolume.transform.lossyScale;
            float radius = 0.5f * Mathf.Max(Mathf.Abs(scale.x * hitVolume.size.x), Mathf.Max(Mathf.Abs(scale.y * hitVolume.size.y), Mathf.Abs(scale.z * hitVolume.size.z))) + body.radius;
            float vertical = Mathf.Max(0, Mathf.Abs(delta.y) - Mathf.Max(0, body.height * .5f - body.radius));
            bool touching = delta.x * delta.x + delta.z * delta.z + vertical * vertical <= radius * radius;
            // Consume one shield for the entire pass, including overlaps longer than immunity.
            if (touching && !touchingPlayer) game.Hit();
            touchingPlayer = touching;
        }

#if UNITY_EDITOR
        private void OnDrawGizmos()
        {
            Gizmos.color = Color.yellow;
            Gizmos.DrawLine(start.position, end.position);
        }
#endif
    }
}

