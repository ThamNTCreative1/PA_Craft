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
        [LunaPlaygroundField("Hero Slot 1", fieldOrder: 1, fieldSection: "Heroes")]
        [Tooltip("Hero id 0-7: 0 Default, 1 Summer, 2 Browncoat, 3 Fish, 4 Panda, 5 Doctor, 6 FireFighter, 7 Police. Invalid/duplicate uses first unused id.")]
        [SerializeField] private HeroSlotOption _slot1;
        [LunaPlaygroundField("Hero Slot 2", fieldOrder: 2, fieldSection: "Heroes")]
        [Tooltip("Hero id 0-7: 0 Default, 1 Summer, 2 Browncoat, 3 Fish, 4 Panda, 5 Doctor, 6 FireFighter, 7 Police. Invalid/duplicate uses first unused id.")]
        [SerializeField] private HeroSlotOption _slot2 = HeroSlotOption.SummerVacation;
        [LunaPlaygroundField("Hero Slot 3", fieldOrder: 3, fieldSection: "Heroes")]
        [Tooltip("Hero id 0-7: 0 Default, 1 Summer, 2 Browncoat, 3 Fish, 4 Panda, 5 Doctor, 6 FireFighter, 7 Police. Invalid/duplicate uses first unused id.")]
        [SerializeField] private HeroSlotOption _slot3 = HeroSlotOption.TribalYouth;
        [LunaPlaygroundField("Hero Slot 4", fieldOrder: 4, fieldSection: "Heroes")]
        [Tooltip("Hero id 0-7: 0 Default, 1 Summer, 2 Browncoat, 3 Fish, 4 Panda, 5 Doctor, 6 FireFighter, 7 Police. Invalid/duplicate uses first unused id.")]
        [SerializeField] private HeroSlotOption _slot4 = HeroSlotOption.Fishman;

        public int[] ResolveSlots() => HeroSlotResolver.Resolve(new[] { (int)_slot1, (int)_slot2, (int)_slot3, (int)_slot4 }, 8);

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
