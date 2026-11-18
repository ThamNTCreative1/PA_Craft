using UnityEngine;

namespace Playable
{
    public sealed class FishingMissionController : MissionController
    {
        [SerializeField] private FishingController _fishing;
        [SerializeField] private FishingHUD _hud;

        public override bool IsAvailable => _fishing != null && _hud != null;
        public override bool UsesDrivingTutorial => false;

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
