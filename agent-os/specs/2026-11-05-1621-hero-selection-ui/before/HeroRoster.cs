using System;
using UnityEngine;

namespace Playable
{
    public sealed class HeroRoster : MonoBehaviour
    {
        [Serializable]
        public sealed class HeroEntry
        {
            [SerializeField] private HeroId _id;
            [SerializeField] private string _displayName;
            [SerializeField] private Sprite _portrait;
            [SerializeField] private GameObject _skinRoot;
            [SerializeField] private RuntimeAnimatorController _controller;
            [SerializeField] private Transform _weaponSocket;
            public HeroId Id => _id;
            public string DisplayName => _displayName;
            public Sprite Portrait => _portrait;
            public GameObject SkinRoot => _skinRoot;
            public RuntimeAnimatorController Controller => _controller;
            public Transform WeaponSocket => _weaponSocket;
        }

        [SerializeField] private HeroEntry[] _heroes;
        [LunaPlaygroundField("Hero Slot 1 (0-7)")]
        [SerializeField, Range(0, 7)] private int _slot1;
        [LunaPlaygroundField("Hero Slot 2 (0-7)")]
        [SerializeField, Range(0, 7)] private int _slot2 = 1;
        [LunaPlaygroundField("Hero Slot 3 (0-7)")]
        [SerializeField, Range(0, 7)] private int _slot3 = 2;
        [LunaPlaygroundField("Hero Slot 4 (0-7)")]
        [SerializeField, Range(0, 7)] private int _slot4 = 3;

        public int[] ResolveSlots() => HeroSlotResolver.Resolve(new[] { _slot1, _slot2, _slot3, _slot4 }, 8);

        public bool TryGet(HeroId id, out HeroEntry entry)
        {
            if (_heroes != null)
                for (int i = 0; i < _heroes.Length; i++)
                    if (_heroes[i] != null && _heroes[i].Id == id)
                    {
                        entry = _heroes[i];
                        return true;
                    }
            entry = null;
            return false;
        }
    }
}
