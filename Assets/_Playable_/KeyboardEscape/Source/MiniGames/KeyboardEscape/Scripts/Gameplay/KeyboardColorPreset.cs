using UnityEngine;

namespace Minigames.KeyboardEscape.Gameplay
{
    [CreateAssetMenu(fileName = "KeyboardColorPreset", menuName = "Minigames/KeyboardEscape/KeyboardColorPreset")]
    public class KeyboardColorPreset : ScriptableObject
    {
        public Gradient gradient;
    }
}

