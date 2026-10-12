using UnityEngine;

namespace Playable
{
    public interface IDrivableVehicle
    {
        Transform transform { get; }
        Transform CameraTarget { get; }
        float Speed { get; }
        float MaxSpeed { get; }
        bool IsDriven { get; }
        PlayerController Rider { get; }
        bool TryMount(PlayerController player, bool ignoreDistance = false);
        void RequestDismount();
    }
}
