using UnityEngine;

namespace Playable
{
    public sealed class FishingMissionController : MissionController
    {
        [SerializeField] private FishingController _fishing;
        [SerializeField] private FishingHUD _hud;

        // Uses the shared start tutorials (joystick move + swipe camera) like the other missions.
        public override bool IsAvailable => _fishing != null && _hud != null;

        protected override void OnEntered()
        {
            _fishing.Begin();
            _hud.Show(true);
        }

        protected override void OnExited()
        {
            if (_fishing != null) _fishing.End();
            if (_hud != null) _hud.Show(false);
        }

        public override void SetPaused(bool paused)
        {
            if (_fishing != null) _fishing.SetPaused(paused);
        }
    }
}
