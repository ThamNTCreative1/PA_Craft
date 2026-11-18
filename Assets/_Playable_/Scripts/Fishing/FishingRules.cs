using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Tuning + pure formulas of the fishing minigame, ported from party-craft FishingConfigSO/FightProfile
    /// (wait shortened for the playable). Random rolls are passed in as 0..1 values so the rules stay testable.
    /// </summary>
    [System.Serializable]
    public class FishingRules
    {
        [Header("Cast")]
        public float castChargeTime = 1.2f;
        public float castDuration = 0.6f;
        public float castMin = 2.5f;
        public float castMax = 7f;

        [Header("Wait")]
        public float waitMin = 2f;
        public float waitMax = 4f;
        public int maxNibbles = 2;

        [Header("Fight")]
        public float tapPower = 0.1f;
        public float escapeRate = 0.07f;
        [Range(0f, 1f)] public float startProgress = 0.15f;
        public float timeLimit = 10f;
        public Vector2 surgeInterval = new Vector2(2f, 3f);
        [Range(0f, 1f)] public float surgePullBack = 0.1f;

        [Header("Catch")]
        public float reelInDuration = 0.5f;
        public float catchHold = 1.5f;
        public float escapedMessageTime = 1f;

        public float ChargeStep(float charge, float dt)
        {
            return castChargeTime <= 0f ? 1f : Mathf.Clamp01(charge + dt / castChargeTime);
        }

        public float CastDistance(float charge01)
        {
            return Mathf.Lerp(castMin, castMax, Mathf.Clamp01(charge01));
        }

        public float RollWait(float random01)
        {
            return Mathf.Lerp(waitMin, waitMax, Mathf.Clamp01(random01));
        }

        public int RollNibbles(float random01)
        {
            return Mathf.Clamp(Mathf.FloorToInt(Mathf.Clamp01(random01) * (maxNibbles + 1)), 0, maxNibbles);
        }

        public float RollSurgeDelay(float random01)
        {
            return Mathf.Lerp(surgeInterval.x, surgeInterval.y, Mathf.Clamp01(random01));
        }

        /// <summary>Every tap adds tapPower, the fish takes escapeRate back per second.</summary>
        public float StepFight(float progress, float dt, int taps)
        {
            return Mathf.Clamp01(progress + tapPower * Mathf.Max(0, taps) - escapeRate * Mathf.Max(0f, dt));
        }

        public float ApplySurge(float progress)
        {
            return Mathf.Clamp01(progress - surgePullBack);
        }

        public bool IsCaught(float progress) => progress >= 1f;

        public bool IsEscaped(float progress, float elapsed) => progress <= 0f || elapsed >= timeLimit;

        public static int PickIndex(int count, float random01)
        {
            if (count <= 0) return -1;
            return Mathf.Clamp(Mathf.FloorToInt(Mathf.Clamp01(random01) * count), 0, count - 1);
        }
    }
}
