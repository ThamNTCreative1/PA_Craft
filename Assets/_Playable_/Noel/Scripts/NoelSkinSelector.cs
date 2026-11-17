using Playable;
using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>Nhân vật chọn được trên Luna Playground (dropdown).</summary>
    public enum NoelSkin
    {
        Default = 0,
        ChristmasElf = 1,
        PufferJacket = 2,
        ReindeerOnesie = 3,
        SantaClaus = 4,
        SantaSuit = 5,
        ChristmasSweater = 6,
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
    /// </summary>
    [DefaultExecutionOrder(-500)]
    public class NoelSkinSelector : MonoBehaviour
    {
        [LunaPlaygroundField("Character Skin")]
        [SerializeField] private NoelSkin _skin = NoelSkin.Default;
        [SerializeField] private PlayerController _player;
        [SerializeField] private NoelSkinData[] _skins;

        private NoelSkin _appliedSkin = (NoelSkin)(-1);
        private SkinnedMeshRenderer[] _renderers;
        private Mesh[] _defaultMeshes;
        private Material[][] _defaultMaterials;

        private void Start()
        {
            Apply();
        }

        private void Update()
        {
            if (_appliedSkin != _skin) Apply();
        }

        private void Apply()
        {
            _appliedSkin = _skin;
            if (!CacheRenderers()) return;

            NoelSkinData data = null;
            for (int i = 0; _skins != null && i < _skins.Length; i++)
            {
                if (_skins[i] != null && _skins[i].skin == _skin) { data = _skins[i]; break; }
            }

            for (int i = 0; i < _renderers.Length; i++)
            {
                SkinnedMeshRenderer r = _renderers[i];
                Mesh mesh = data != null ? PickMesh(r.name, data) : null;
                if (mesh == null || data.material == null)
                {
                    // Default (hoặc skin thiếu dữ liệu): trả về nhân vật gốc
                    r.sharedMesh = _defaultMeshes[i];
                    r.sharedMaterials = _defaultMaterials[i];
                    continue;
                }
                r.sharedMesh = mesh;
                Material[] mats = new Material[_defaultMaterials[i].Length];
                for (int m = 0; m < mats.Length; m++) mats[m] = data.material;
                r.sharedMaterials = mats;
            }
        }

        private bool CacheRenderers()
        {
            if (_renderers != null) return true;
            if (_player == null)
            {
#pragma warning disable CS0618 // Luna hỗ trợ FindObjectOfType
                _player = FindObjectOfType<PlayerController>();
#pragma warning restore CS0618
            }
            if (_player == null) return false;

            _renderers = _player.GetComponentsInChildren<SkinnedMeshRenderer>(true);
            _defaultMeshes = new Mesh[_renderers.Length];
            _defaultMaterials = new Material[_renderers.Length][];
            for (int i = 0; i < _renderers.Length; i++)
            {
                _defaultMeshes[i] = _renderers[i].sharedMesh;
                _defaultMaterials[i] = _renderers[i].sharedMaterials;
            }
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
