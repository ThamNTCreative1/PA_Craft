using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif

[RequireComponent(typeof(Renderer))]
public class SetupMaterialTiling : MonoBehaviour
{
    [Header("Cấu hình Material")]
    public bool useSharedMaterial = true;
    public Material sharedMaterial;

    [Header("Tiling")]
    public bool autoMatchScale = true;
    public Vector2 manualTiling = Vector2.one;

    [Header("Scrolling UV")]
    public bool enableScrolling = false;
    public Vector2 uvScrollSpeed = new Vector2(1, 0); // Tốc độ cuộn UV (X: ngang, Y: dọc)

    private MaterialPropertyBlock mpb;
    private Vector2 scrollOffset = Vector2.zero;

    void Start()
    {
        ApplyMaterialAndTiling();
    }

    void Update()
    {
        if (enableScrolling)
        {
            scrollOffset += uvScrollSpeed * Time.deltaTime;
            ApplyMaterialAndTiling(); // Cập nhật MPB để áp dụng offset mới
        }
    }

    [ContextMenu("Apply Material & Tiling")]
    void ApplyMaterialAndTiling()
    {
        Renderer renderer = GetComponent<Renderer>();
        if (renderer == null)
        {
            Debug.LogError("Không tìm thấy Renderer!", this);
            return;
        }

        if (sharedMaterial == null)
        {
            Debug.LogError("Vui lòng gán Shared Material!", this);
            return;
        }

        // Gán material (dùng chung hoặc clone)
        if (useSharedMaterial)
            renderer.sharedMaterial = sharedMaterial;
        else
            renderer.material = new Material(sharedMaterial);

        // Chuẩn bị MaterialPropertyBlock
        if (mpb == null) mpb = new MaterialPropertyBlock();
        renderer.GetPropertyBlock(mpb);

        // Tính tiling
        Vector2 tiling = autoMatchScale ? new Vector2(transform.localScale.x, transform.localScale.z) : manualTiling;

        // Ghi đè Tiling & Offset qua _MainTex_ST
        // Vector4 = (tilingX, tilingY, offsetX, offsetY)
        mpb.SetVector("_MainTex_ST", new Vector4(tiling.x, tiling.y, scrollOffset.x, scrollOffset.y));

        // Áp dụng MPB
        renderer.SetPropertyBlock(mpb);

        // 👇 Kiểm tra mesh an toàn — KHÔNG LỖI sharedMesh
        Mesh mesh = null;
        if (renderer is MeshRenderer meshRenderer)
        {
            mesh = meshRenderer.GetComponent<MeshFilter>()?.sharedMesh;
        }
        else if (renderer is SkinnedMeshRenderer skinnedMeshRenderer)
        {
            mesh = skinnedMeshRenderer.sharedMesh;
        }
        

        // Tự động set Wrap Mode = Repeat (chỉ trong Editor)
        SetupTextureWrapMode();
    }

    void SetupTextureWrapMode()
    {
        #if UNITY_EDITOR
        if (sharedMaterial == null) return;

        Texture mainTexture = sharedMaterial.GetTexture("_MainTex");
        if (mainTexture == null) return;

        string assetPath = AssetDatabase.GetAssetPath(mainTexture);
        if (string.IsNullOrEmpty(assetPath)) return;

        TextureImporter importer = AssetImporter.GetAtPath(assetPath) as TextureImporter;
        if (importer != null && importer.wrapMode != TextureWrapMode.Repeat)
        {
            importer.wrapMode = TextureWrapMode.Repeat;
            importer.SaveAndReimport();
            Debug.Log($"✅ Đã set Wrap Mode = Repeat cho texture: {mainTexture.name}", this);
        }
        #endif
    }

    #if UNITY_EDITOR
    void OnValidate()
    {
        if (Application.isPlaying || sharedMaterial == null) return;

        Renderer renderer = GetComponent<Renderer>();
        if (renderer == null) return;

        if (mpb != null)
        {
            Vector2 tiling = autoMatchScale ? new Vector2(transform.localScale.x, transform.localScale.z) : manualTiling;
            mpb.SetVector("_MainTex_ST", new Vector4(tiling.x, tiling.y, scrollOffset.x, scrollOffset.y));
            renderer.SetPropertyBlock(mpb);
        }
    }
    #endif
}