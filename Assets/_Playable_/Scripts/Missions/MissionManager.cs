using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(-200)]
    public sealed class MissionManager : MonoBehaviour
    {
        [SerializeField] private PlayerController _player;
        [SerializeField] private MissionController[] _missions;
        public MissionController ActiveMission { get; private set; }

        private bool _paused;
        public void SetPaused(bool paused)
        {
            _paused = paused;
            if (ActiveMission != null) ActiveMission.SetPaused(paused);
        }

        private void Awake()
        {
            if (_missions == null) return;
            for (int i = 0; i < _missions.Length; i++)
                if (_missions[i] != null) _missions[i].Exit();
        }

        public bool TrySelect(MissionController mission)
        {
            if (_player == null || _player.IsRiding || mission == null || !mission.CanEnter || _missions == null)
                return false;
            bool registered = false;
            for (int i = 0; i < _missions.Length; i++)
                if (_missions[i] == mission) { registered = true; break; }
            if (!registered) return false;
            if (ActiveMission != null) ActiveMission.Exit();
            mission.Enter();
            ActiveMission = mission;
            mission.SetPaused(_paused);
            return true;
        }
    }
}
