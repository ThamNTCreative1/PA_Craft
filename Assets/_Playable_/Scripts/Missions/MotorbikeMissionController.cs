using UnityEngine;

namespace Playable
{
    public sealed class MotorbikeMissionController : MissionController
    {
        [SerializeField] private CarDriveTutorial _driveTutorial;

        protected override void OnEntered()
        {
            if (_driveTutorial != null) _driveTutorial.Begin();
        }

        protected override void OnExited()
        {
            if (_driveTutorial != null) _driveTutorial.End();
        }

        public override void SetPaused(bool paused)
        {
            if (_driveTutorial != null) _driveTutorial.SetPaused(paused);
        }
    }
}
