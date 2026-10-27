using System.Collections;
using UnityEngine;


namespace Minigames.KeyboardEscape.Gameplay
{
    public class KeyNote : MonoBehaviour
    {
        [SerializeField] private MeshRenderer m_Renderer;
        [SerializeField] private Vector2Int keyCharacterSize;
        [SerializeField] private Gradient gradient;

        [Header("Scaling")]
        [SerializeField] private Transform scaler;
        [SerializeField] private float scaleUpdateSpeed = 1f;

        [Header("Handoff between multiple interactors (e.g. Interactor -> Treadmill)")]
        [Tooltip("Thời gian chờ trước khi thực sự RunKeyUp, để nếu có Interactor khác Enter ngay sau thì hủy bỏ, tránh nhấp nháy.")]
        [SerializeField] private float keyUpGraceTime = 0.06f;

        private MaterialPropertyBlock mpb;
        private Coroutine handleScaleCoroutine;
        private Coroutine pendingKeyUpCoroutine;

        private int pressCount;

        public bool isDown;

        private void Start()
        {
            Init();
        }

        private void Init()
        {
            mpb = new MaterialPropertyBlock();
            m_Renderer.GetPropertyBlock(mpb);
            mpb.SetColor("_mainColor", gradient.Evaluate(Random.Range(0f, 1f)));
            mpb.SetVector("_keyOffset", new Vector2(Random.Range(0, keyCharacterSize.x), Random.Range(0, keyCharacterSize.y)));
            m_Renderer.SetPropertyBlock(mpb);
        }

        public void SetGradient(Gradient gradient)
        {
            this.gradient = gradient;
        }

        private IEnumerator HandleScaleMesh(Vector3 targetScale, float speed)
        {
            while (scaler.localScale != targetScale)
            {
                yield return null;
                scaler.localScale = Vector3.MoveTowards(scaler.localScale, targetScale, Time.deltaTime * speed);
            }
        }

        public void RunKeyDown(float speed)
        {
            pressCount++;
            isDown = true;

            if (pendingKeyUpCoroutine != null)
            {
                StopCoroutine(pendingKeyUpCoroutine);
                pendingKeyUpCoroutine = null;
            }

            if (handleScaleCoroutine != null)
            {
                StopCoroutine(handleScaleCoroutine);
            }

            handleScaleCoroutine = StartCoroutine(HandleScaleMesh(new Vector3(0.7f, 0.1f, 0.7f), speed));
        }

        public void RunKeyUp(float speed)
        {
            pressCount = Mathf.Max(0, pressCount - 1);

            if (pressCount > 0) return;

            if (pendingKeyUpCoroutine != null)
            {
                StopCoroutine(pendingKeyUpCoroutine);
            }
            pendingKeyUpCoroutine = StartCoroutine(DelayedKeyUp(speed));
        }

        private IEnumerator DelayedKeyUp(float speed)
        {
            yield return new WaitForSeconds(keyUpGraceTime);

            pendingKeyUpCoroutine = null;

            if (pressCount > 0) yield break;

            isDown = false;

            if (handleScaleCoroutine != null)
            {
                StopCoroutine(handleScaleCoroutine);
            }

            handleScaleCoroutine = StartCoroutine(HandleScaleMesh(new Vector3(1, 1, 1), speed / 5));
        }

        private void OnEnable()
        {
            pressCount = 0;
            isDown = false;

            if (pendingKeyUpCoroutine != null)
            {
                StopCoroutine(pendingKeyUpCoroutine);
                pendingKeyUpCoroutine = null;
            }

            scaler.localScale = new Vector3(1, 1, 1);
        }
    }
}