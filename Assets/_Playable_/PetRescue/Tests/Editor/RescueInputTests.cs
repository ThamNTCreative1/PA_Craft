using NUnit.Framework;
using UnityEngine;

namespace Playable.PetRescue.Tests
{
    public class RescueInputTests
    {
        private GameObject _object;
        private RescuePointerInput _input;
        [SetUp] public void Open() { _object=new GameObject("Input fixture");_input=_object.AddComponent<RescuePointerInput>();_input.Initialize(null,null); }
        [TearDown] public void Close() { Object.DestroyImmediate(_object); }
        [Test] public void MouseDragUsesScreenFractionAndStopsAfterRelease()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(-1,new Vector2(100,100),false,false,500,1000,out pressed,out delta,out up);Assert.IsTrue(pressed);Assert.AreEqual(0,delta);
            _input.ProcessContact(-1,new Vector2(150,100),false,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(pressed);Assert.AreEqual(.1f,delta,.0001f);
            _input.ProcessContact(-1,new Vector2(150,100),false,true,500,1000,out pressed,out delta,out up);Assert.AreEqual(0,delta);
            _input.ProcessContact(-1,new Vector2(400,100),false,false,500,1000,out pressed,out delta,out up);Assert.IsTrue(pressed);Assert.AreEqual(0,delta,"New press must not teleport");
        }
        [Test] public void ActiveTouchCanStartAfterMissedBeginAndMoveBothWays()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(7,new Vector2(100,100),true,false,500,1000,out pressed,out delta,out up);Assert.IsTrue(pressed);
            _input.ProcessContact(7,new Vector2(200,100),true,false,500,1000,out pressed,out delta,out up);Assert.AreEqual(.2f,delta,.0001f);
            _input.ProcessContact(7,new Vector2(150,100),true,false,500,1000,out pressed,out delta,out up);Assert.AreEqual(-.1f,delta,.0001f);
        }
        [Test] public void SimulatedMouseTouchHandoffsPreserveContinuousMovement()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(-1,new Vector2(100,100),false,false,500,1000,out pressed,out delta,out up);
            _input.ProcessContact(0,new Vector2(125,100),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(pressed);Assert.AreEqual(.05f,delta,.0001f);
            _input.ProcessContact(-1,new Vector2(150,100),false,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(pressed);Assert.AreEqual(.05f,delta,.0001f);
        }
        [Test] public void SecondaryFingerCannotStealOrReleasePrimaryDrag()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(1,new Vector2(100,100),true,false,500,1000,out pressed,out delta,out up);
            _input.ProcessContact(2,new Vector2(400,100),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(pressed);Assert.AreEqual(0,delta);
            _input.ProcessContact(2,new Vector2(400,100),true,true,500,1000,out pressed,out delta,out up);
            _input.ProcessContact(1,new Vector2(150,100),true,false,500,1000,out pressed,out delta,out up);Assert.AreEqual(.1f,delta,.0001f);
        }
        [Test] public void CancelAndOrientationChangeDoNotRetainOldPointerDelta()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(1,new Vector2(100,100),true,false,500,1000,out pressed,out delta,out up);_input.Cancel();
            _input.ProcessContact(1,new Vector2(800,100),true,false,1000,1000,out pressed,out delta,out up);Assert.IsTrue(pressed);Assert.AreEqual(0,delta);
            _input.ProcessContact(1,new Vector2(900,100),true,false,1000,1000,out pressed,out delta,out up);Assert.AreEqual(.1f,delta,.0001f);
        }
        [Test] public void UpwardStrokeFiresSwipeUpOnceAndRearmsAfterMovingDown()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(1,new Vector2(300,200),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(up);
            _input.ProcessContact(1,new Vector2(300,240),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(up,"4% is below the threshold");
            _input.ProcessContact(1,new Vector2(305,270),true,false,500,1000,out pressed,out delta,out up);Assert.IsTrue(up);
            _input.ProcessContact(1,new Vector2(305,330),true,false,500,1000,out pressed,out delta,out up);Assert.IsTrue(up,"Continued upward stroke counts again only after a full new 6%");
            _input.ProcessContact(1,new Vector2(305,350),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(up);
            _input.ProcessContact(1,new Vector2(305,250),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(up);
            _input.ProcessContact(1,new Vector2(305,320),true,false,500,1000,out pressed,out delta,out up);Assert.IsTrue(up,"Moving down re-arms from the lowest point");
        }
        [Test] public void MostlySidewaysDragNeverFiresSwipeUp()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(1,new Vector2(100,200),true,false,500,1000,out pressed,out delta,out up);
            for(int i=1;i<=10;i++){_input.ProcessContact(1,new Vector2(100+i*30,200+i*8),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(up,"step "+i);}
        }
        [Test] public void SecondaryFingerCannotSwipeUp()
        {
            bool pressed,up;float delta;
            _input.ProcessContact(1,new Vector2(100,100),true,false,500,1000,out pressed,out delta,out up);
            _input.ProcessContact(2,new Vector2(100,400),true,false,500,1000,out pressed,out delta,out up);Assert.IsFalse(up);
        }
    }
}
