using UnityEngine;

namespace Playable
{
    public sealed class PlayerSkinSwitcher : MonoBehaviour
    {
        [SerializeField] private HeroRoster _roster;
        [SerializeField] private PlayerPaintballController _weapon;
        [SerializeField] private GameObject _defaultVisual;
        public HeroId Selected { get; private set; }

        public bool Apply(HeroId id)
        {
            HeroRoster.HeroEntry selected;
            if (_roster == null || _weapon == null || _defaultVisual == null ||
                _weapon.IsEquipped || !_roster.TryGet(id, out selected)) return false;
            // Validate every reference before changing any visible skin.
            for (int i = 0; i < 8; i++)
            {
                HeroRoster.HeroEntry entry;
                if (!_roster.TryGet((HeroId)i, out entry) || entry.SkinRoot == null ||
                    entry.Controller == null || entry.WeaponSocket == null)
                {
                    Debug.LogError("Hero roster needs a skin, controller and weapon socket for hero " + i, this);
                    return false;
                }
            }
            if (!_weapon.ConfigureHeroRig(selected.Controller, selected.WeaponSocket)) return false;
            for (int i = 0; i < 8; i++)
            {
                HeroRoster.HeroEntry entry;
                _roster.TryGet((HeroId)i, out entry);
                entry.SkinRoot.SetActive(entry.Id == id);
            }
            _defaultVisual.SetActive(id == HeroId.Default);
            Selected = id;
            return true;
        }
    }
}
