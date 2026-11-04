using System;
using Playable.MonsterArmy.Core;
using UnityEngine;

namespace Playable.MonsterArmy
{
    /// <summary>Bộ phận của một nhân vật. Bốn mảnh này được vẽ cho nhau, không trộn chéo.</summary>
    [Serializable]
    public struct CharacterParts
    {
        public Sprite Head;
        public Sprite Body;
        public Sprite Arm;
        public Sprite Leg;

        public bool IsComplete => Head != null && Body != null && Arm != null && Leg != null;
    }

    /// <summary>
    /// Gom art của playable vào một chỗ. MonsterArmySetup điền lúc dựng scene; phần
    /// chạy game chỉ đọc.
    ///
    /// Mỗi loài có đúng một bộ Head/Body/Arm/Leg lấy từ thư mục Characters của SSPGame.
    /// Bản cũ hoán vị ngẫu nhiên các mảnh rời nên hay ra những con lệch tông; giờ
    /// các mảnh đã thuộc về nhau sẵn.
    /// </summary>
    [CreateAssetMenu(fileName = "MonsterArtLibrary", menuName = "Monster Army/Art Library")]
    public sealed class MonsterArtLibrary : ScriptableObject
    {
        [SerializeField] private CharacterParts[] _partsBySpecies;
        [SerializeField] private CharacterParts _bossParts;

        // Vũ khí xếp theo nhóm, không phải theo loại quái: mỗi nhân vật rút ngẫu nhiên
        // một món trong nhóm hợp với lối đánh của nó.
        [SerializeField] private Sprite[] _meleeWeapons;
        [SerializeField] private Sprite[] _gunWeapons;
        [SerializeField] private Sprite[] _explosiveWeapons;

        // Một clip cho mỗi VfxKind, cộng bốn biến thể tia lửa rút ngẫu nhiên.
        [SerializeField] private VfxClip[] _vfxByKind;
        [SerializeField] private VfxClip[] _sparkVariants;

        [SerializeField] private Sprite _groundTile;
        [SerializeField] private Sprite _cellHighlight;

        public CharacterParts BossParts => _bossParts;
        public Sprite GroundTile => _groundTile;
        public Sprite CellHighlight => _cellHighlight;

        public CharacterParts PartsFor(MonsterSpecies species)
        {
            int index = (int)species;
            if (_partsBySpecies == null || index < 0 || index >= _partsBySpecies.Length)
                return default;

            return _partsBySpecies[index];
        }

        /// <summary>Icon thanh chọn là chính cái đầu của nhân vật đó.</summary>
        public Sprite Icon(MonsterSpecies species) => PartsFor(species).Head;

        /// <summary>
        /// Clip cho một hiệu ứng. Tia lửa có bốn kiểu nên rút theo
        /// <paramref name="variantRoll"/> để các cú đánh không trông giống hệt nhau.
        /// </summary>
        public VfxClip Vfx(VfxKind kind, int variantRoll)
        {
            if (kind == VfxKind.Spark && _sparkVariants != null && _sparkVariants.Length > 0)
            {
                int index = ((variantRoll % _sparkVariants.Length) + _sparkVariants.Length)
                            % _sparkVariants.Length;
                return _sparkVariants[index];
            }

            int kindIndex = (int)kind;
            if (_vfxByKind == null || kindIndex < 0 || kindIndex >= _vfxByKind.Length) return default;
            return _vfxByKind[kindIndex];
        }

        /// <summary>Một vũ khí bất kỳ trong nhóm hợp với lối đánh.</summary>
        public Sprite RandomWeapon(MonsterKind kind, int roll)
        {
            switch (MonsterStats.CategoryFor(kind))
            {
                case WeaponCategory.Gun: return Pick(_gunWeapons, roll);
                case WeaponCategory.Explosive: return Pick(_explosiveWeapons, roll);
                default: return Pick(_meleeWeapons, roll);
            }
        }

        /// <summary>Chọn phần tử theo chỉ số, cuộn vòng. Mảng rỗng trả về null thay vì ném.</summary>
        public static Sprite Pick(Sprite[] source, int index)
        {
            if (source == null || source.Length == 0) return null;
            return source[((index % source.Length) + source.Length) % source.Length];
        }
    }
}
