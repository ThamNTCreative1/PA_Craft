using System;
using UnityEngine;

namespace Playable
{
    // One selectable card: its icon, the optional scene object that drops in, and its voice clip.
    [Serializable]
    public class PickerOption
    {
        [SerializeField] private string _id;
        [SerializeField] private Sprite _icon;
        [SerializeField] private GameObject _display;
        [SerializeField] private AudioClip _voiceSfx;

        public PickerOption() { }

        public PickerOption(string id)
        {
            _id = id;
        }

        public string Id => _id;
        public Sprite Icon => _icon;
        public GameObject Display => _display;
        public AudioClip VoiceSfx => _voiceSfx;
    }
}
