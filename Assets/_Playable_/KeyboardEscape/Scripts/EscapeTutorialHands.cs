using UnityEngine;

namespace Playable.KeyboardEscape
{
    public sealed class EscapeTutorialHands : MonoBehaviour
    {
        public EscapeGame game;
        public RectTransform infinityRoot, cameraHand, movementHand, joystickArea;
        private int previousStep = -1;
        private float phaseStart;
        private void Update()
        {
            bool visible = !game.manager.HasEnded && game.hint.gameObject.activeSelf;
            int step = visible ? game.TutorialStep : 2;
            if (step < 2) Layout(step);
            if (step != previousStep)
            {
                previousStep = step;
                phaseStart = Time.unscaledTime;
                infinityRoot.gameObject.SetActive(step == 0);
                movementHand.gameObject.SetActive(step == 1);
            }
            float phase = (Time.unscaledTime - phaseStart) * Mathf.PI;
            if (step == 0) cameraHand.anchoredPosition = new Vector2(Mathf.Sin(phase) * 145f, Mathf.Sin(phase * 2f) * 48f);
            else if (step == 1)
            {
                float progress = Mathf.Repeat((Time.unscaledTime - phaseStart) / 1.6f, 1f);
                movementHand.position = joystickArea.TransformPoint(new Vector3(0, Mathf.Lerp(-10f, 75f, Mathf.SmoothStep(0, 1, Mathf.Min(progress / .8f, 1f))), 0));
            }
            else enabled = false;
        }
        private void Layout(int step)
        {
            var canvas = (RectTransform)infinityRoot.parent;
            Vector3 joystick = canvas.InverseTransformPoint(joystickArea.position);
            infinityRoot.anchorMin = infinityRoot.anchorMax = new Vector2(.5f, 0);
            infinityRoot.anchoredPosition = new Vector2(0, joystick.y - canvas.rect.yMin);
            var text = game.hint.rectTransform;
            text.pivot = new Vector2(.5f, 0);
            text.sizeDelta = new Vector2(step == 0 ? 1000 : 520, 90);
            text.position = step == 0
                ? infinityRoot.TransformPoint(new Vector3(0, infinityRoot.rect.height * .5f + 12, 0))
                : joystickArea.TransformPoint(new Vector3(110, joystickArea.rect.height * .5f + 16, 0));
        }
    }
}
