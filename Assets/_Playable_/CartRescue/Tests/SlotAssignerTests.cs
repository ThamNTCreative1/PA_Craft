using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    public class SlotAssignerTests
    {
        private static readonly float[] Slots = { -1.5f, -0.5f, 0.5f, 1.5f };

        [Test]
        public void FourRidersFourSlots_SortedMapping()
        {
            int[] result = SlotAssigner.Assign(new[] { 0.9f, -1.2f, 0.1f, -0.4f }, Slots);

            CollectionAssert.AreEqual(new[] { 3, 0, 2, 1 }, result);
        }

        [Test]
        public void ThreeRiders_NearestWithoutDuplicates()
        {
            int[] result = SlotAssigner.Assign(new[] { -1.4f, -1.3f, 1.6f }, Slots);

            CollectionAssert.AreEqual(new[] { 0, 1, 3 }, result);
        }
    }
}
