using Playable.MonsterArmy.Core;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable.MonsterArmy
{
    public sealed class ChaosDirector : MonoBehaviour
    {
        [SerializeField] private VfxPool _vfx;
        [SerializeField] private Image _screenFlash;
        [SerializeField] private GameObject _burningBorder;
        [SerializeField] private TMP_Text _comboText;

        private void Awake() => HideOverlays();

        public void SetLiveMonsterCount(int count)
        {
            if (_vfx != null) _vfx.Budget = ChaosTier.ForLiveMonsters(count).MaxConcurrentExplosions;
            HideOverlays();
        }

        public void HideOverlays()
        {
            if (_screenFlash != null) _screenFlash.gameObject.SetActive(false);
            if (_burningBorder != null) _burningBorder.SetActive(false);
            if (_comboText != null) _comboText.gameObject.SetActive(false);
        }

        // Keep combat event hooks without full-screen overlays or camera shake.
        public void Shake(float multiplier) { }
        public void Flash() { }

        public void Burn(MonsterUnit target)
        {
            if (_vfx == null || target == null) return;
            _vfx.TrySpawn(VfxKind.SmallFireball, target.VisualBounds.center, Color.white,
                followTarget: target, duration: 1f);
        }
    }
}
