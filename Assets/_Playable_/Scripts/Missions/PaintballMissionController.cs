using UnityEngine;

namespace Playable
{
    public sealed class PaintballMissionController : MissionController
    {
        [SerializeField] private PlayerPaintballController _weapon;
        [SerializeField] private PaintballNpcController[] _npcs;
        [SerializeField] private PaintballMovementTutorial _movementTutorial;
        public override bool IsAvailable
        {
            get
            {
                if (_weapon == null || !_weapon.IsReady || _npcs == null || _npcs.Length != 5) return false;
                for (int i = 0; i < _npcs.Length; i++) if (_npcs[i] == null) return false;
                return true;
            }
        }
        protected override void OnEntered()
        {
            _weapon.Equip();
            foreach (var npc in _npcs) npc.ResetNpc();
            // Movement/look guidance is shown by the journal through the shared GameController UI.
            if (_movementTutorial != null) _movementTutorial.End();
        }
        protected override void OnExited()
        {
            if (_movementTutorial != null) _movementTutorial.End();
            if (_weapon != null) _weapon.Unequip();
            if (_npcs != null) foreach (var npc in _npcs) if (npc != null) npc.SetPaused(true);
        }
        public override void SetPaused(bool paused)
        {
            if (_movementTutorial != null) _movementTutorial.SetPaused(paused);
            if (_weapon != null) _weapon.SetPaused(paused);
            if (_npcs != null) foreach (var npc in _npcs) if (npc != null) npc.SetPaused(paused);
        }
    }
}
