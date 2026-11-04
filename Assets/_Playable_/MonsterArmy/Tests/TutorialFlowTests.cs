using NUnit.Framework;
using Playable.MonsterArmy.Core;

namespace Playable.MonsterArmy.Tests
{
    public class TutorialFlowTests
    {
        private static TutorialFlow NewFlow() => new TutorialFlow();

        /// <summary>Chạy đồng hồ theo nhiều nhịp nhỏ, giống vòng lặp frame thật.</summary>
        private static void Advance(TutorialFlow flow, float seconds)
        {
            const float step = 1f / 60f;
            for (float t = 0f; t < seconds; t += step) flow.Tick(step);
        }

        private static TutorialFlow FlowWithPlacements(int count)
        {
            TutorialFlow flow = NewFlow();
            for (int i = 0; i < count; i++) flow.NotifyMonsterPlaced();
            return flow;
        }

        [Test]
        public void StartsOnTheDragStep()
        {
            TutorialFlow flow = NewFlow();

            Assert.AreEqual(TutorialStep.DragToPlace, flow.Current);
            Assert.AreEqual(0, flow.PlacedCount);
            Assert.AreEqual(5, flow.RequiredPlacements);
            Assert.IsTrue(flow.IsLocked);
        }

        [Test]
        public void StartButton_IsHiddenUntilFiveDrops()
        {
            TutorialFlow flow = NewFlow();
            for (int i = 0; i < 4; i++)
            {
                flow.NotifyMonsterPlaced();
                Assert.IsFalse(flow.ShowStartButton);
                Assert.AreEqual(TutorialStep.DragToPlace, flow.Current);
            }
            flow.NotifyMonsterPlaced();
            Assert.IsTrue(flow.ShowStartButton);
            Assert.AreEqual(TutorialStep.PressStart, flow.Current);
        }

        [Test]
        public void PlacedCount_TracksEveryDrop()
        {
            TutorialFlow flow = FlowWithPlacements(3);

            Assert.AreEqual(3, flow.PlacedCount);
        }

        [Test]
        public void PlacingMoreThanRequired_StaysOnPressStart()
        {
            TutorialFlow flow = FlowWithPlacements(9);

            Assert.AreEqual(TutorialStep.PressStart, flow.Current);
            Assert.IsTrue(flow.ShowStartButton);
            Assert.AreEqual(9, flow.PlacedCount);
        }

        [Test]
        public void PressStart_AdvancesToDone()
        {
            TutorialFlow flow = FlowWithPlacements(5);

            flow.NotifyStartPressed();

            Assert.AreEqual(TutorialStep.Done, flow.Current);
            Assert.IsFalse(flow.IsLocked);
        }

        [Test]
        public void StartPressed_BeforeFiveDrops_IsIgnored()
        {
            TutorialFlow flow = FlowWithPlacements(4);

            flow.NotifyStartPressed();

            Assert.AreEqual(TutorialStep.DragToPlace, flow.Current,
                "nút START còn chưa hiện thì không thể bấm");
        }

        // --- Không được đứng hình: playable luôn phải chạy tiếp ---

        [Test]
        public void DragStep_WaitsForFivePlacementsDespiteInactivity()
        {
            TutorialFlow flow = NewFlow();

            Advance(flow, 13f);

            Assert.AreEqual(TutorialStep.DragToPlace, flow.Current);
            Assert.IsFalse(flow.ShowStartButton);
        }

        [Test]
        public void PressStartStep_WaitsForPlayerInput()
        {
            TutorialFlow flow = FlowWithPlacements(5);

            Advance(flow, 13f);

            Assert.AreEqual(TutorialStep.PressStart, flow.Current);
        }

        [Test]
        public void Activity_ResetsTheIdleClock()
        {
            TutorialFlow flow = NewFlow();

            Advance(flow, 10f);
            flow.NotifyActivity();
            Advance(flow, 10f);

            Assert.AreEqual(TutorialStep.DragToPlace, flow.Current,
                "20s tổng, nhưng không có quãng 12s nào không thao tác");
        }

        [Test]
        public void PlacingAMonster_ResetsTheIdleClock()
        {
            TutorialFlow flow = NewFlow();

            Advance(flow, 10f);
            flow.NotifyMonsterPlaced();
            Advance(flow, 10f);

            Assert.AreEqual(TutorialStep.DragToPlace, flow.Current);
            Assert.AreEqual(1, flow.PlacedCount);
        }

        // --- Emphasis: gợi ý to lên khi người chơi chần chừ ---

        [Test]
        public void Emphasis_TurnsOnAfterFourSecondsIdle()
        {
            TutorialFlow flow = NewFlow();

            Advance(flow, 3.5f);
            Assert.IsFalse(flow.IsEmphasised);

            Advance(flow, 1f);
            Assert.IsTrue(flow.IsEmphasised);
        }

        [Test]
        public void Emphasis_ClearsWhenAMonsterIsPlaced()
        {
            TutorialFlow flow = NewFlow();
            Advance(flow, 4.5f);
            Assert.IsTrue(flow.IsEmphasised);

            flow.NotifyMonsterPlaced();

            Assert.IsFalse(flow.IsEmphasised);
        }

        [Test]
        public void Done_IsNeverEmphasised()
        {
            TutorialFlow flow = FlowWithPlacements(5);
            flow.NotifyStartPressed();

            Advance(flow, 20f);

            Assert.IsFalse(flow.IsEmphasised);
            Assert.AreEqual(TutorialStep.Done, flow.Current);
        }

        // --- Người chơi đang kéo dở thì không được giật mất ---

        [Test]
        public void AutoComplete_DoesNotFireWhileInteractionInProgress()
        {
            TutorialFlow flow = NewFlow();

            flow.IsInteractionInProgress = true;
            Advance(flow, 40f);

            Assert.AreEqual(TutorialStep.DragToPlace, flow.Current);
            Assert.IsFalse(flow.IsEmphasised, "đang kéo thì không phải đang chần chừ");
        }

        [Test]
        public void InteractionEnding_DoesNotBypassPlacementRequirement()
        {
            TutorialFlow flow = NewFlow();
            flow.IsInteractionInProgress = true;
            Advance(flow, 40f);

            flow.IsInteractionInProgress = false;
            Advance(flow, 13f);

            Assert.AreEqual(TutorialStep.DragToPlace, flow.Current);
        }
    }
}
