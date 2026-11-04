using System;

namespace Playable.MonsterArmy.Core
{
    /// <summary>
    /// 16 loài trong thanh chọn quái. Đây là NGOẠI HÌNH, tách khỏi
    /// <see cref="MonsterKind"/> vốn là lối đánh.
    ///
    /// Tách hai khái niệm vì chúng không trùng nhau: mười sáu con trông khác nhau
    /// nhưng chỉ có năm kiểu đánh, và chỉ số chiến đấu thì gắn với kiểu đánh.
    /// </summary>
    public enum MonsterSpecies
    {
        IvoryOwlSkull,
        PinkDeerSkullRedShirt,
        PinkDeerSkullBlackShirt,
        ZombieRedHelmet,
        ZombieFurHat,
        ZombiePinkBeanie,
        ZombieCowboyHat,
        ZombieAlien,
        HornedGoatDemon,
        GreyGremlinBat,
        RedHelmetWhiteShirt,
        FurHat,
        PinkBeanie,
        CowboyMoustache,
        DeerMaskRedShirt,
        DeerMaskBlackShirt
    }

    public readonly struct SpeciesInfo
    {
        public SpeciesInfo(MonsterSpecies species, string name, string assetKey, MonsterKind kind)
        {
            Species = species;
            Name = name;
            AssetKey = assetKey;
            Kind = kind;
        }

        public MonsterSpecies Species { get; }

        /// <summary>Tên hiển thị, dùng cho tooltip và log.</summary>
        public string Name { get; }

        /// <summary>
        /// Tên file gốc của nhân vật, ví dụ "Zombie_Nguoi_CaoBoi". Khớp đúng với
        /// tên trong kho asset SSPGame nên tra cứu không cần bảng ánh xạ phụ.
        /// </summary>
        public string AssetKey { get; }

        public MonsterKind Kind { get; }

        public bool IsZombie => AssetKey.StartsWith(MonsterRoster.ZombiePrefix, StringComparison.Ordinal);

        /// <summary>Thư mục skin chứa bộ phận: "Zombie" hoặc "Human".</summary>
        public string SkinFolder => IsZombie ? "Zombie" : "Human";

        /// <summary>
        /// Tên không có tiền tố Zombie_. Bộ phận nằm ở
        /// Parts/{SkinFolder}/{Part}/{BaseKey}_{Part}.png — bản sống và bản zombie
        /// dùng chung tên file, chỉ khác thư mục skin.
        /// </summary>
        public string BaseKey => IsZombie
            ? AssetKey.Substring(MonsterRoster.ZombiePrefix.Length)
            : AssetKey;
    }

    public static class MonsterRoster
    {
        public const string ZombiePrefix = "Zombie_";

        /// <summary>Nhân vật đứng sẵn trên sàn trước khi người chơi chạm vào gì.</summary>
        public const MonsterSpecies HeroSpecies = MonsterSpecies.RedHelmetWhiteShirt;

        /// <summary>
        /// Boss: con hươu tối màu, miệng há, mắt đỏ. Cố tình KHÔNG nằm trong danh sách
        /// chọn được — người chơi đánh nó chứ không thả nó ra.
        /// </summary>
        public const string BossAssetKey = "Zombie_Huou";

        public static string BossSkinFolder => "Zombie";
        public static string BossBaseKey => BossAssetKey.Substring(ZombiePrefix.Length);

        private static readonly SpeciesInfo[] Entries =
        {
            new SpeciesInfo(MonsterSpecies.IvoryOwlSkull, "Đầu lâu cú trắng ngà",
                "Zombie_Cu_NguoiTuyet", MonsterKind.Laser),
            new SpeciesInfo(MonsterSpecies.PinkDeerSkullRedShirt, "Đầu lâu hươu hồng, áo đỏ",
                "Zombie_Nguoi_MatNaHuou_Do", MonsterKind.Brute),
            new SpeciesInfo(MonsterSpecies.PinkDeerSkullBlackShirt, "Đầu lâu hươu hồng, áo đen",
                "Zombie_Nguoi_MatNaHuou_Den", MonsterKind.Brute),
            new SpeciesInfo(MonsterSpecies.ZombieRedHelmet, "Zombie mũ bảo hiểm đỏ",
                "Zombie_Nguoi_MuBaoHiem", MonsterKind.Tank),
            new SpeciesInfo(MonsterSpecies.ZombieFurHat, "Zombie mũ lông",
                "Zombie_Nguoi_MuLong", MonsterKind.Brute),
            new SpeciesInfo(MonsterSpecies.ZombiePinkBeanie, "Zombie mũ len hồng",
                "Zombie_Nguoi_MuLen", MonsterKind.Gunner),
            new SpeciesInfo(MonsterSpecies.ZombieCowboyHat, "Zombie mũ cao bồi",
                "Zombie_Nguoi_CaoBoi", MonsterKind.Gunner),
            new SpeciesInfo(MonsterSpecies.ZombieAlien, "Alien zombie",
                "Zombie_Alien", MonsterKind.Laser),
            new SpeciesInfo(MonsterSpecies.HornedGoatDemon, "Quỷ dê sừng xoắn",
                "De", MonsterKind.Tank),
            new SpeciesInfo(MonsterSpecies.GreyGremlinBat, "Dơi gremlin xanh xám",
                "Zombie_Doi", MonsterKind.Bomber),
            new SpeciesInfo(MonsterSpecies.RedHelmetWhiteShirt, "Mũ bảo hiểm đỏ, áo trắng",
                "Nguoi_MuBaoHiem", MonsterKind.Brute),
            new SpeciesInfo(MonsterSpecies.FurHat, "Đội mũ lông",
                "Nguoi_MuLong", MonsterKind.Brute),
            new SpeciesInfo(MonsterSpecies.PinkBeanie, "Đội mũ len hồng",
                "Nguoi_MuLen", MonsterKind.Gunner),
            new SpeciesInfo(MonsterSpecies.CowboyMoustache, "Mũ cao bồi, ria mép",
                "Nguoi_CaoBoi", MonsterKind.Gunner),
            new SpeciesInfo(MonsterSpecies.DeerMaskRedShirt, "Mặt nạ hươu, áo đỏ",
                "Nguoi_MatNaHuou_Do", MonsterKind.Bomber),
            new SpeciesInfo(MonsterSpecies.DeerMaskBlackShirt, "Mặt nạ hươu, áo đen",
                "Nguoi_MatNaHuou_Den", MonsterKind.Bomber)
        };

        public static int Count => Entries.Length;

        public static SpeciesInfo Get(MonsterSpecies species)
        {
            int index = (int)species;
            if (index < 0 || index >= Entries.Length)
                throw new ArgumentOutOfRangeException(nameof(species), species, null);

            return Entries[index];
        }

        public static SpeciesInfo At(int index)
        {
            return Get((MonsterSpecies)index);
        }
    }
}
