using System.Collections;
using UnityEngine;
using UnityEngine.Events;

namespace Minigames.StealAnEgg.GamePlay
{
    // Ported from steal-an-egg-main; boost/save/game-controller dependencies replaced by a static speed multiplier.
    public class SAE_IncubateEggHandler : MonoBehaviour
    {
        /// <summary>Global incubate speed (original: day/night tick * boost).</summary>
        public static float IncubateSpeed = 1f;

        private SAE_Egg egg;
        private Coroutine HandleInCubateCoroutine;

        private double incubateTime;
        private double hatchingTime;

        public bool hatchAvailable = false;

        public double IncubateTime => incubateTime;
        public SAE_Egg Egg => egg;

        private SAE_IncubateTimeDisplayment displaymentSample;
        private SAE_IncubateTimeDisplayment currentDisplayment;

        public event UnityAction<int, float> OnIncubateTimeChanged;
        public event UnityAction<SAE_IncubateEggHandler> OnIncubateCompleted;
        public event UnityAction<SAE_IncubateEggHandler> OnDestroyByHatchEvent;

        /// <param name="hatchingTimeOverride">Seconds to hatch; &lt;= 0 uses the egg's incubateTimeBase.</param>
        public void SetValue(SAE_Egg egg, SAE_IncubateTimeDisplayment displayment, double incubatedTime = 0,
            float hatchingTimeOverride = 0)
        {
            this.egg = egg;
            incubateTime = incubatedTime;
            hatchingTime = hatchingTimeOverride > 0 ? hatchingTimeOverride : egg.calculatedIncubateTime;
            displaymentSample = displayment;
        }

        private void Start()
        {
            StartIncubate();
        }

        public void StartIncubate()
        {
            if (displaymentSample != null)
                currentDisplayment = Instantiate(displaymentSample, transform);

            StopIncubate();

            HandleInCubateCoroutine = StartCoroutine(HandleInCubate(egg.SizeMultiplier));
        }

        public void StopIncubate()
        {
            if (HandleInCubateCoroutine != null)
            {
                StopCoroutine(HandleInCubateCoroutine);
            }
        }

        private IEnumerator HandleInCubate(float size)
        {
            int lastRemainingTime = 0;
            Vector3 startSize = transform.localScale;
            // An egg sized from outside (the stolen egg's size) keeps that size while incubating.
            Vector3 targetSize = egg != null && egg.KeepsScale ? startSize : new Vector3(size, size, size);

            while (incubateTime < hatchingTime)
            {
                incubateTime += Time.deltaTime * IncubateSpeed;
                float remainingTime = (float)(hatchingTime - incubateTime);
                remainingTime = Mathf.Clamp(remainingTime, 0, (float)hatchingTime);
                int intRemainingTime = Mathf.CeilToInt(remainingTime);
                if (currentDisplayment) currentDisplayment.SetTime(intRemainingTime);

                if (lastRemainingTime != intRemainingTime)
                {
                    lastRemainingTime = intRemainingTime;
                    OnIncubateTimeChanged?.Invoke(intRemainingTime, (float)(incubateTime / hatchingTime));
                }

                transform.localScale = Vector3.Lerp(startSize, targetSize, (float)(incubateTime / hatchingTime));

                yield return null;
            }

            transform.localScale = targetSize;

            IncubateComplete();
        }

        public void IncubateComplete()
        {
            if (currentDisplayment)
            {
                Destroy(currentDisplayment.gameObject);
            }

            egg.RefreshCollider();
            hatchAvailable = true;
            OnIncubateCompleted?.Invoke(this);
        }

        public void OnDestroyByHatchCompleted()
        {
            OnDestroyByHatchEvent?.Invoke(this);
        }

        public void ForceComplete()
        {
            incubateTime = hatchingTime;
        }
    }
}
