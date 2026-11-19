using NUnit.Framework;
using Playable;

public class PickerSequenceTests
{
    private static PickerSequence TwoSteps()
    {
        return new PickerSequence(new[]
        {
            new PickerStep("CHOOSE YOUR VEHICLE", new PickerOption("bicycle"), new PickerOption("car"), false),
            new PickerStep("CHOOSE YOUR PET", new PickerOption("dog"), new PickerOption("cat"), true)
        });
    }

    [Test]
    public void StartsOnFirstStep()
    {
        var seq = TwoSteps();
        Assert.AreEqual(0, seq.Index);
        Assert.IsFalse(seq.IsFinished);
        Assert.AreEqual("CHOOSE YOUR VEHICLE", seq.Current.Title);
    }

    [Test]
    public void TryChoose_ReturnsSideOption()
    {
        var seq = TwoSteps();
        PickerOption opt;
        Assert.IsTrue(seq.TryChoose(PickerStep.Right, out opt));
        Assert.AreEqual("car", opt.Id);
    }

    [Test]
    public void TryChoose_BlocksSecondChoiceUntilAdvance()
    {
        var seq = TwoSteps();
        PickerOption opt;
        Assert.IsTrue(seq.TryChoose(PickerStep.Left, out opt));
        Assert.IsFalse(seq.TryChoose(PickerStep.Right, out opt));
        seq.Advance();
        Assert.IsTrue(seq.TryChoose(PickerStep.Right, out opt));
        Assert.AreEqual("cat", opt.Id);
        Assert.IsTrue(seq.Current.EndsGame);
    }

    [Test]
    public void TryChoose_RejectsInvalidSide()
    {
        var seq = TwoSteps();
        PickerOption opt;
        Assert.IsFalse(seq.TryChoose(2, out opt));
        Assert.IsFalse(seq.TryChoose(-1, out opt));
        Assert.IsTrue(seq.TryChoose(PickerStep.Left, out opt));
    }

    [Test]
    public void FinishesAfterLastStep()
    {
        var seq = TwoSteps();
        seq.Advance();
        seq.Advance();
        PickerOption opt;
        Assert.IsTrue(seq.IsFinished);
        Assert.IsNull(seq.Current);
        Assert.IsFalse(seq.TryChoose(PickerStep.Left, out opt));
        seq.Advance();
        Assert.AreEqual(2, seq.Index);
    }
}
