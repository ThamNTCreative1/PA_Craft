using UnityEngine;

namespace Playable
{
    public static class LunaServices
    {
        public static LunaController Controller { get; private set; }

        public static void Register(LunaController controller)
        {
            if (controller == null)
            {
                Debug.LogError("Cannot register a missing LunaController.");
                return;
            }

            if (Controller != null && Controller != controller)
            {
                Debug.LogError("Only one LunaController may be registered.", controller);
                return;
            }

            Controller = controller;
        }

        public static void Unregister(LunaController controller)
        {
            if (Controller == controller) Controller = null;
        }
    }
}
