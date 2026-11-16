using NUnit.Framework;
using Playable.CartRescue.Core;

namespace Playable.CartRescue.Tests
{
    public class IdleHintTests
    {
        [Test]
        public void StartsVisible()
        {
            Assert.IsTrue(new IdleHint().Visible);
        }

        [Test]
        public void HidesOnTouch_ReappearsAfterDelay()
        {
            var hint = new IdleHint(2f);

            hint.Touch();
            Assert.IsFalse(hint.Visible);
            hint.Tick(1.9f);
            Assert.IsFalse(hint.Visible);
            hint.Tick(0.2f);
            Assert.IsTrue(hint.Visible);
        }
    }
}
