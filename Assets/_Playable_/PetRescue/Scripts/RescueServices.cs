using System;

namespace Playable.PetRescue
{
    public static class RescueServices
    {
        private static LunaController _luna;
        public static LunaController Luna => _luna ?? throw new InvalidOperationException("Rescue Luna facade is not registered.");
        public static void Register(LunaController controller)
        {
            if (controller == null) throw new ArgumentNullException(nameof(controller));
            if (_luna != null) throw new InvalidOperationException("Duplicate rescue Luna facade.");
            _luna = controller;
        }
        public static void Unregister(LunaController expected) { if (_luna == expected) _luna = null; }
    }
}
