using NUnit.Framework;
using Playable;

public class FishingRulesTests
{
    private static FishingRules Rules() => new FishingRules();

    [Test]
    public void CastDistance_IsClampedBetweenMinAndMax()
    {
        var r = Rules();
        Assert.AreEqual(r.castMin, r.CastDistance(-1f), 1e-4f);
        Assert.AreEqual(r.castMax, r.CastDistance(2f), 1e-4f);
        Assert.That(r.CastDistance(0.5f), Is.InRange(r.castMin, r.castMax));
    }

    [Test]
    public void ChargeStep_ReachesFullAfterChargeTime()
    {
        var r = Rules();
        Assert.AreEqual(1f, r.ChargeStep(0f, r.castChargeTime), 1e-4f);
        Assert.AreEqual(0.5f, r.ChargeStep(0f, r.castChargeTime * 0.5f), 1e-4f);
    }

    [Test]
    public void RollWait_StaysInRange()
    {
        var r = Rules();
        Assert.AreEqual(r.waitMin, r.RollWait(0f), 1e-4f);
        Assert.AreEqual(r.waitMax, r.RollWait(1f), 1e-4f);
    }

    [Test]
    public void RollNibbles_StaysInRange()
    {
        var r = Rules();
        Assert.AreEqual(0, r.RollNibbles(0f));
        Assert.AreEqual(r.maxNibbles, r.RollNibbles(1f));
    }

    [Test]
    public void Fight_EnoughTapsLandsTheFish()
    {
        var r = Rules();
        float progress = r.startProgress;
        float elapsed = 0f;
        // 6 taps per second at 30 fps
        for (int frame = 0; frame < 600 && !r.IsCaught(progress); frame++)
        {
            elapsed += 1f / 30f;
            progress = r.StepFight(progress, 1f / 30f, frame % 5 == 0 ? 1 : 0);
        }
        Assert.IsTrue(r.IsCaught(progress));
        Assert.Less(elapsed, r.timeLimit);
    }

    [Test]
    public void Fight_NoTapsLetsTheFishEscape()
    {
        var r = Rules();
        float progress = r.startProgress;
        float elapsed = 0f;
        while (!r.IsEscaped(progress, elapsed) && elapsed < 60f)
        {
            elapsed += 0.1f;
            progress = r.StepFight(progress, 0.1f, 0);
        }
        Assert.IsTrue(r.IsEscaped(progress, elapsed));
        Assert.IsFalse(r.IsCaught(progress));
    }

    [Test]
    public void PickIndex_StaysInRange()
    {
        Assert.AreEqual(-1, FishingRules.PickIndex(0, 0.5f));
        Assert.AreEqual(0, FishingRules.PickIndex(4, 0f));
        Assert.AreEqual(3, FishingRules.PickIndex(4, 1f));
        Assert.AreEqual(2, FishingRules.PickIndex(4, 0.6f));
    }
}
