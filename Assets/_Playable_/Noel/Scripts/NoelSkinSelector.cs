using Playable;
using UnityEngine;

namespace Game.Events.Noel
{
    /// <summary>NhÃ¢n váº­t chá»n Ä‘Æ°á»£c trÃªn Luna Playground (dropdown).</summary>
    public enum NoelSkin
    {
        ChristmasElf = 1,
        PufferJacket = 2,
        ReindeerOnesie = 3,
        SantaClaus = 4,
        SantaSuit = 5,
        ChristmasSweater = 6,
    }

    /// <summary>Bá»™ mesh + material cá»§a má»™t skin Noel (6 bá»™ pháº­n, cÃ¹ng rig vá»›i Character.fbx).</summary>
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
    /// Thay nhÃ¢n váº­t cá»§a ngÆ°á»i chÆ¡i theo lá»±a chá»n trÃªn Luna Playground.
    /// Äá»•i sharedMesh + material cá»§a 6 SkinnedMeshRenderer (C2_Body, C2_Head, C2_Left/Right Arm, C2_Left/Right Leg),
    /// giá»¯ nguyÃªn bá»™ xÆ°Æ¡ng vÃ  Animator nÃªn má»i animation váº«n cháº¡y.
    /// </summary>
    [DefaultExecutionOrder(-500)]
    public class NoelSkinSelector : MonoBehaviour
    {
        [LunaPlaygroundField("Character Skin")]
        [SerializeField] private NoelSkin _skin = NoelSkin.ChristmasElf;
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

            // Older scenes may still serialize the removed default value (0).
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
                Mesh mesh = data != null ? PickMesh(r.name, data) : null;
                if (mesh == null) continue;
                // Release cached skinning buffers before a different vertex layout.
                r.sharedMesh = null;
                r.sharedMesh = mesh;
#if !UNITY_LUNA
                // Playworks does not expose SkinnedMeshRenderer.localBounds.
                // The scene serializes these bounds for export.
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

