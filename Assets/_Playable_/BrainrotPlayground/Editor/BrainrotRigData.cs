using UnityEngine;

namespace Playable.BrainrotPlayground.EditorTools
{
    /// <summary>
    /// Rig nhân vật Brainrot lấy nguyên từ data.json của game gốc (Construct 3): nhân vật thứ i dùng frame thứ i
    /// của Head / Body / Hand_Left / Hand_Right / Foot_Left / Foot_Right (animation "Day").
    /// Toạ độ frame tính từ góc trên-trái sheet; origin + image point là tỉ lệ 0..1 trong frame (y hướng xuống).
    /// Sinh bằng script, không sửa tay.
    /// </summary>
    internal static class BrainrotRigData
    {
        internal struct Part
        {
            public string Sheet;
            public RectInt Rect;
            public Vector2 Origin;
            // Construct 3 xếp frame xoay 90° theo chiều kim đồng hồ trong sheet (vùng lưu rộng h, cao w).
            public bool Rotated;

            public Part(string sheet, int x, int y, int w, int h, float ox, float oy, bool rotated)
            {
                Sheet = sheet;
                Rect = new RectInt(x, y, w, h);
                Origin = new Vector2(ox, oy);
                Rotated = rotated;
            }
        }

        internal struct Rig
        {
            public Part Head, Body, HandLeft, HandRight, FootLeft, FootRight;
            public Vector2 HeadPoint, HandLeftPoint, HandRightPoint, FootLeftPoint, FootRightPoint;
            public Vector2 WeaponLeft, WeaponRight;

            public Rig(Part head, Part body, Part handLeft, Part handRight, Part footLeft, Part footRight,
                Vector2 headPoint, Vector2 handLeftPoint, Vector2 handRightPoint, Vector2 footLeftPoint,
                Vector2 footRightPoint, Vector2 weaponLeft, Vector2 weaponRight)
            {
                Head = head; Body = body; HandLeft = handLeft; HandRight = handRight;
                FootLeft = footLeft; FootRight = footRight;
                HeadPoint = headPoint; HandLeftPoint = handLeftPoint; HandRightPoint = handRightPoint;
                FootLeftPoint = footLeftPoint; FootRightPoint = footRightPoint;
                WeaponLeft = weaponLeft; WeaponRight = weaponRight;
            }
        }

        internal static readonly Rig[] Rigs =
        {
            new Rig(new Part("head-sheet0.png", 49, 449, 54, 48, 0.5000f, 0.9792f, true), new Part("body-sheet0.png", 211, 449, 36, 58, 0.5000f, 0.5000f, false), new Part("foot_left-sheet0.png", 97, 65, 16, 58, 0.5000f, 0.1379f, false), new Part("foot_left-sheet0.png", 97, 65, 16, 58, 0.5000f, 0.1379f, false), new Part("foot_left-sheet0.png", 97, 65, 16, 58, 0.5000f, 0.0938f, false), new Part("foot_left-sheet0.png", 97, 65, 16, 58, 0.5000f, 0.0938f, false),
                new Vector2(0.5000f, 0.0345f), new Vector2(0.5000f, 0.2414f), new Vector2(0.5000f, 0.2414f), new Vector2(0.2778f, 0.9310f), new Vector2(0.7222f, 0.9310f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5f, 0.5f)),
            new Rig(new Part("head-sheet0.png", 193, 449, 42, 50, 0.5000f, 0.9800f, false), new Part("body-sheet0.png", 65, 385, 40, 62, 0.5000f, 0.5000f, false), new Part("hand_left-sheet0.png", 37, 129, 16, 64, 0.5000f, 0.0938f, false), new Part("hand_left-sheet0.png", 37, 129, 16, 64, 0.5000f, 0.0938f, false), new Part("foot_left-sheet0.png", 37, 1, 16, 64, 0.5000f, 0.0938f, false), new Part("foot_left-sheet0.png", 37, 1, 16, 64, 0.5000f, 0.0938f, false),
                new Vector2(0.5000f, 0.0323f), new Vector2(0.5000f, 0.2258f), new Vector2(0.5000f, 0.2258f), new Vector2(0.3000f, 0.9355f), new Vector2(0.7000f, 0.9355f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5000f, 0.9062f)),
            new Rig(new Part("head-sheet0.png", 453, 1, 76, 56, 0.6447f, 0.9643f, true), new Part("body-sheet0.png", 129, 385, 44, 56, 0.5000f, 0.5000f, false), new Part("hand_left-sheet0.png", 97, 193, 14, 52, 0.5000f, 0.1154f, false), new Part("hand_left-sheet0.png", 97, 193, 14, 52, 0.5000f, 0.1154f, false), new Part("foot_left-sheet0.png", 19, 193, 14, 52, 0.5000f, 0.1154f, false), new Part("foot_left-sheet0.png", 19, 193, 14, 52, 0.5000f, 0.1154f, false),
                new Vector2(0.5000f, 0.0357f), new Vector2(0.5000f, 0.2857f), new Vector2(0.5000f, 0.2857f), new Vector2(0.2941f, 0.7392f), new Vector2(0.7059f, 0.7392f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5000f, 1.0000f)),
            new Rig(new Part("head-sheet0.png", 65, 257, 68, 54, 0.5441f, 0.9815f, true), new Part("body-sheet0.png", 193, 385, 52, 44, 0.5000f, 0.5000f, true), new Part("foot_left-sheet0.png", 67, 193, 14, 46, 0.5000f, 0.1304f, false), new Part("foot_left-sheet0.png", 67, 193, 14, 46, 0.5000f, 0.1304f, false), new Part("foot_left-sheet0.png", 67, 193, 14, 46, 0.5000f, 0.1739f, false), new Part("foot_left-sheet0.png", 67, 193, 14, 46, 0.5000f, 0.1739f, false),
                new Vector2(0.5000f, 0.0227f), new Vector2(0.5000f, 0.2893f), new Vector2(0.5000f, 0.2893f), new Vector2(0.2692f, 0.9091f), new Vector2(0.7308f, 0.9091f), new Vector2(0.5000f, 0.8478f), new Vector2(0.5000f, 1.0652f)),
            new Rig(new Part("head-sheet0.png", 321, 385, 62, 58, 0.5000f, 0.9828f, true), new Part("body-sheet0.png", 129, 1, 74, 68, 0.5000f, 0.5000f, true), new Part("foot_left-sheet0.png", 109, 193, 16, 56, 0.5000f, 0.1429f, false), new Part("foot_left-sheet0.png", 109, 193, 16, 56, 0.5000f, 0.1429f, false), new Part("foot_left-sheet0.png", 109, 193, 16, 56, 0.5000f, 0.1429f, false), new Part("foot_left-sheet0.png", 109, 193, 16, 56, 0.5000f, 0.1429f, false),
                new Vector2(0.5135f, 0.0735f), new Vector2(0.5000f, 0.2206f), new Vector2(0.5000f, 0.2206f), new Vector2(0.3919f, 0.8676f), new Vector2(0.5541f, 0.8676f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5000f, 0.9643f)),
            new Rig(new Part("head-sheet0.png", 1, 129, 80, 102, 0.4875f, 0.8725f, false), new Part("body-sheet0.png", 1, 449, 40, 52, 0.5000f, 0.5000f, false), new Part("foot_left-sheet0.png", 109, 129, 16, 56, 0.5000f, 0.1071f, false), new Part("foot_left-sheet0.png", 109, 129, 16, 56, 0.5000f, 0.1071f, false), new Part("foot_left-sheet0.png", 109, 129, 16, 56, 0.5000f, 0.1786f, false), new Part("foot_left-sheet0.png", 109, 129, 16, 56, 0.5000f, 0.1786f, false),
                new Vector2(0.5000f, 0.0385f), new Vector2(0.5000f, 0.4231f), new Vector2(0.5000f, 0.4231f), new Vector2(0.3000f, 0.8462f), new Vector2(0.7000f, 0.8462f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5000f, 0.9643f)),
            new Rig(new Part("head-sheet0.png", 321, 257, 66, 46, 0.5000f, 0.9565f, true), new Part("body-sheet0.png", 43, 449, 48, 36, 0.5000f, 0.5000f, true), new Part("hand_left-sheet0.png", 49, 225, 12, 30, 0.5833f, 0.2000f, false), new Part("hand_right-sheet0.png", 19, 97, 12, 30, 0.4167f, 0.2000f, false), new Part("foot_left-sheet0.png", 83, 225, 20, 28, 0.5000f, 0.0714f, false), new Part("foot_left-sheet0.png", 83, 225, 20, 28, 0.5000f, 0.0714f, false),
                new Vector2(0.5000f, 0.0455f), new Vector2(0.5000f, 0.2273f), new Vector2(0.5000f, 0.2273f), new Vector2(0.2917f, 0.9444f), new Vector2(0.7083f, 0.9444f), new Vector2(0.4167f, 0.8000f), new Vector2(0.5000f, 1.4138f)),
            new Rig(new Part("head-sheet0.png", 325, 1, 70, 62, 0.5000f, 0.9516f, true), new Part("body-sheet0.png", 223, 129, 32, 56, 0.5000f, 0.5000f, false), new Part("hand_left-sheet0.png", 113, 129, 14, 56, 0.5000f, 0.1429f, false), new Part("hand_left-sheet0.png", 113, 129, 14, 56, 0.5000f, 0.1429f, false), new Part("foot_left-sheet0.png", 93, 129, 14, 56, 0.5000f, 0.1429f, false), new Part("foot_left-sheet0.png", 93, 129, 14, 56, 0.5000f, 0.1429f, false),
                new Vector2(0.5000f, 0.0536f), new Vector2(0.5000f, 0.3036f), new Vector2(0.5000f, 0.3036f), new Vector2(0.2188f, 0.9107f), new Vector2(0.7812f, 0.9107f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5000f, 0.9643f)),
            new Rig(new Part("head-sheet0.png", 99, 449, 56, 42, 0.5000f, 0.9762f, true), new Part("body-sheet0.png", 177, 77, 44, 76, 0.5000f, 0.5000f, false), new Part("hand_left-sheet0.png", 81, 193, 14, 46, 0.5000f, 0.1739f, false), new Part("hand_left-sheet0.png", 81, 193, 14, 46, 0.5000f, 0.1739f, false), new Part("foot_left-sheet0.png", 51, 193, 14, 46, 0.5000f, 0.1304f, false), new Part("foot_left-sheet0.png", 51, 193, 14, 46, 0.5000f, 0.1304f, false),
                new Vector2(0.4773f, 0.0263f), new Vector2(0.5909f, 0.2368f), new Vector2(0.5909f, 0.2368f), new Vector2(0.3636f, 0.8947f), new Vector2(0.7273f, 0.8947f), new Vector2(0.5000f, 0.8696f), new Vector2(0.5000f, 1.0652f)),
            new Rig(new Part("head-sheet0.png", 385, 129, 76, 52, 0.4868f, 0.9808f, true), new Part("body-sheet0.png", 89, 449, 44, 44, 0.5000f, 0.5000f, false), new Part("foot_left-sheet0.png", 1, 193, 16, 54, 0.5000f, 0.1852f, false), new Part("foot_left-sheet0.png", 1, 193, 16, 54, 0.5000f, 0.1852f, false), new Part("foot_left-sheet0.png", 1, 193, 16, 54, 0.5000f, 0.1852f, false), new Part("foot_left-sheet0.png", 1, 193, 16, 54, 0.5000f, 0.1852f, false),
                new Vector2(0.5000f, 0.0455f), new Vector2(0.5000f, 0.2893f), new Vector2(0.5000f, 0.2893f), new Vector2(0.2941f, 0.8044f), new Vector2(0.7059f, 0.8044f), new Vector2(0.5000f, 0.8704f), new Vector2(0.5000f, 0.9815f)),
            new Rig(new Part("head-sheet0.png", 129, 1, 86, 78, 0.5000f, 0.9872f, true), new Part("body-sheet0.png", 193, 193, 56, 58, 0.5000f, 0.5000f, false), new Part("foot_right-sheet0.png", 0, 0, 18, 50, 0.6111f, 0.2000f, false), new Part("foot_left-sheet0.png", 55, 129, 18, 50, 0.3889f, 0.2000f, false), new Part("foot_left-sheet0.png", 55, 129, 18, 50, 0.4444f, 0.1600f, false), new Part("foot_left-sheet0.png", 55, 129, 18, 50, 0.4444f, 0.1600f, false),
                new Vector2(0.5000f, 0.0345f), new Vector2(0.5000f, 0.3401f), new Vector2(0.5000f, 0.3401f), new Vector2(0.2941f, 0.7309f), new Vector2(0.7059f, 0.7309f), new Vector2(0.6111f, 0.8600f), new Vector2(0.5000f, 0.6300f)),
            new Rig(new Part("head-sheet0.png", 193, 257, 64, 56, 0.5000f, 0.9821f, true), new Part("body-sheet0.png", 1, 1, 168, 82, 0.5000f, 0.5000f, true), new Part("hand_left-sheet0.png", 65, 193, 14, 46, 0.5000f, 0.1739f, false), new Part("hand_left-sheet0.png", 65, 193, 14, 46, 0.5000f, 0.1739f, false), new Part("foot_left-sheet0.png", 35, 193, 14, 46, 0.5000f, 0.0435f, false), new Part("foot_left-sheet0.png", 35, 193, 14, 46, 0.5000f, 0.0435f, false),
                new Vector2(0.5179f, 0.2317f), new Vector2(0.5179f, 0.4024f), new Vector2(0.5179f, 0.4024f), new Vector2(0.4583f, 0.9146f), new Vector2(0.5536f, 0.9146f), new Vector2(0.5000f, 0.8478f), new Vector2(0.5000f, 1.0652f)),
            new Rig(new Part("head-sheet0.png", 143, 449, 48, 46, 0.5208f, 0.9783f, true), new Part("body-sheet0.png", 173, 449, 36, 58, 0.5000f, 0.5000f, false), new Part("hand_left-sheet0.png", 73, 129, 16, 58, 0.5000f, 0.1379f, false), new Part("hand_right-sheet0.png", 1, 67, 16, 58, 0.5000f, 0.1379f, false), new Part("foot_left-sheet0.png", 73, 65, 16, 58, 0.5000f, 0.0938f, false), new Part("foot_left-sheet0.png", 73, 65, 16, 58, 0.5000f, 0.0938f, false),
                new Vector2(0.5000f, 0.0345f), new Vector2(0.5000f, 0.2414f), new Vector2(0.5000f, 0.2414f), new Vector2(0.2778f, 0.9310f), new Vector2(0.7222f, 0.9310f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5f, 0.5f)),
            new Rig(new Part("head-sheet0.png", 449, 385, 46, 60, 0.5000f, 0.9833f, false), new Part("body-sheet0.png", 135, 449, 36, 58, 0.5000f, 0.5000f, false), new Part("hand_left-sheet0.png", 55, 129, 16, 58, 0.5000f, 0.1379f, false), new Part("hand_left-sheet0.png", 55, 129, 16, 58, 0.5000f, 0.1379f, false), new Part("foot_left-sheet0.png", 55, 65, 16, 58, 0.5000f, 0.0938f, false), new Part("foot_left-sheet0.png", 55, 65, 16, 58, 0.5000f, 0.0938f, false),
                new Vector2(0.5000f, 0.0345f), new Vector2(0.5000f, 0.2414f), new Vector2(0.5000f, 0.2414f), new Vector2(0.2778f, 0.9310f), new Vector2(0.7222f, 0.9310f), new Vector2(0.5000f, 0.8966f), new Vector2(0.5f, 0.5f)),
            new Rig(new Part("head-sheet1.png", 0, 0, 4, 4, 0.5000f, 0.5000f, false), new Part("body-sheet0.png", 1, 257, 126, 90, 0.4921f, 0.6556f, true), new Part("hand_left-sheet0.png", 113, 193, 14, 50, 0.5000f, 0.1400f, false), new Part("hand_left-sheet0.png", 113, 193, 14, 50, 0.5000f, 0.1400f, false), new Part("foot_left-sheet0.png", 33, 129, 16, 44, 0.5000f, 0.0455f, false), new Part("foot_left-sheet0.png", 33, 129, 16, 44, 0.5000f, 0.0455f, false),
                new Vector2(0.5000f, 0.1000f), new Vector2(0.0476f, 0.6444f), new Vector2(0.7063f, 0.6889f), new Vector2(0.3413f, 0.9333f), new Vector2(0.5714f, 0.9444f), new Vector2(0.5000f, 0.8800f), new Vector2(0.5000f, 0.8800f)),
            new Rig(new Part("head-sheet0.png", 321, 193, 62, 62, 0.5000f, 0.9839f, false), new Part("body-sheet0.png", 1, 385, 54, 60, 0.5000f, 0.5000f, false), new Part("hand_left-sheet0.png", 91, 129, 16, 54, 0.5000f, 0.1481f, false), new Part("hand_left-sheet0.png", 91, 129, 16, 54, 0.5000f, 0.1481f, false), new Part("foot_left-sheet0.png", 75, 129, 16, 54, 0.5000f, 0.0741f, false), new Part("foot_left-sheet0.png", 75, 129, 16, 54, 0.5000f, 0.0741f, false),
                new Vector2(0.5000f, 0.0345f), new Vector2(0.5000f, 0.2333f), new Vector2(0.5000f, 0.2333f), new Vector2(0.2778f, 0.9310f), new Vector2(0.7407f, 0.9333f), new Vector2(0.5000f, 0.8889f), new Vector2(0.5000f, 0.8889f)),
        };
    }
}
