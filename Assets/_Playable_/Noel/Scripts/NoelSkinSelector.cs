using Playable;
using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>Nhân vật chọn được trên Luna Playground (dropdown). Giữ số cũ của package.</summary>
    public enum NoelSkin
    {
        ChristmasElf = 1,
        PufferJacket = 2,
        SantaClaus = 4,
    }

    /// <summary>Bộ mesh + material của một skin Noel (6 bộ phận, cùng rig với Character.fbx).</summary>
    [System.Serializable]
    public class NoelSkinData
    {
        public NoelSkin skin;
        public Mesh body;
        public Mesh head;
        public Mesh leftArm;
        public Mesh rightArm;
        public Mesh leftLeg;
        public Mesh rightLeg;
        public Material material;
    }

    /// <summary>
    /// Thay nhân vật của người chơi theo lựa chọn trên Luna Playground.
    /// Đổi sharedMesh + material của 6 SkinnedMeshRenderer (C2_Body, C2_Head, C2_Left/Right Arm, C2_Left/Right Leg),
    /// giữ nguyên bộ xương và Animator nên mọi animation vẫn chạy.
    /// Update chỉ so sánh 1 enum để bắt thay đổi từ Playground lúc chạy.
    /// </summary>
    [DefaultExecutionOrder(-500)]
    [LunaPlaygroundSection("Character", 2)]
    public class NoelSkinSelector : MonoBehaviour
    {
        [LunaPlaygroundField("Character Skin", 1, "Character")]
        [SerializeField] private NoelSkin _skin = NoelSkin.SantaClaus;
        [SerializeField] private PlayerController _player;
        [SerializeField] private NoelSkinData[] _skins;

        private NoelSkin _appliedSkin = (NoelSkin)(-1);
        private SkinnedMeshRenderer[] _renderers;

        private void Awake()
        {
            Apply();
        }

        private void Update()
        {
            if (_appliedSkin != _skin) Apply();
        }

        public void Apply()
        {
            if (!CacheRenderers()) return;

            NoelSkinData data = null;
            for (int i = 0; _skins != null && i < _skins.Length; i++)
            {
                if (_skins[i] != null && _skins[i].skin == _skin) { data = _skins[i]; break; }
            }

            if (data == null && _skins != null && _skins.Length > 0)
                data = _skins[0];
            if (data == null || data.material == null) return;

            // Validate the entire replacement before changing any renderer.
            for (int i = 0; i < _renderers.Length; i++)
            {
                Mesh candidate = PickMesh(_renderers[i].name, data);
                if (candidate == null) return;
#if !UNITY_LUNA
                if (candidate.bindposes.Length != _renderers[i].bones.Length) return;
#endif
            }
            _appliedSkin = _skin;

            for (int i = 0; i < _renderers.Length; i++)
            {
                SkinnedMeshRenderer r = _renderers[i];
                Mesh mesh = PickMesh(r.name, data);
                if (mesh == null) continue;
                // Release cached skinning buffers before a different vertex layout.
                r.sharedMesh = null;
                r.sharedMesh = mesh;
#if !UNITY_LUNA
                // Playworks does not expose SkinnedMeshRenderer.localBounds.
                r.localBounds = new Bounds(Vector3.zero, Vector3.one * 6f);
#endif
                Material[] mats = new Material[Mathf.Max(1, mesh.subMeshCount)];
                for (int m = 0; m < mats.Length; m++) mats[m] = data.material;
                r.sharedMaterials = mats;
            }
        }

        private bool CacheRenderers()
        {
            if (_renderers != null) return true;
            if (_player == null) return false;

            _renderers = _player.GetComponentsInChildren<SkinnedMeshRenderer>(true);
            return true;
        }

        private static Mesh PickMesh(string rendererName, NoelSkinData data)
        {
            if (rendererName.Contains("Body")) return data.body;
            if (rendererName.Contains("Head")) return data.head;
            if (rendererName.Contains("Left Arm")) return data.leftArm;
            if (rendererName.Contains("Right Arm")) return data.rightArm;
            if (rendererName.Contains("Left Leg")) return data.leftLeg;
            if (rendererName.Contains("Right Leg")) return data.rightLeg;
            return null;
        }
    }
}
