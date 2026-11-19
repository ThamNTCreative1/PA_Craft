using System;
using UnityEngine;

namespace Playable
{
    // One left/right choice screen. EndsGame: choosing (or tapping anywhere) ends the playable.
    [Serializable]
    public class PickerStep
    {
        public const int Left = 0;
        public const int Right = 1;

        [SerializeField] private string _title;
        [SerializeField] private PickerOption _left = new PickerOption();
        [SerializeField] private PickerOption _right = new PickerOption();
        [SerializeField] private bool _endsGame;

        public PickerStep() { }

        public PickerStep(string title, PickerOption left, PickerOption right, bool endsGame)
        {
            _title = title;
            _left = left;
            _right = right;
            _endsGame = endsGame;
        }

        public string Title => _title;
        public bool EndsGame => _endsGame;

        public PickerOption Get(int side)
        {
            if (side == Left) return _left;
            if (side == Right) return _right;
            return null;
        }
    }
}
