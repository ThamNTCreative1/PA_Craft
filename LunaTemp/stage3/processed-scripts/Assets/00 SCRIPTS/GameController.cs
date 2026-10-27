using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>Coordinates blueprint progress and places completed blocks.</summary>
public class GameController : MonoBehaviour
{
    [Header("Blueprint")]
    [SerializeField] private List<BuildingPart> parts = new List<BuildingPart>();
    [SerializeField] private bool createSampleBlueprintWhenEmpty = true;
    [SerializeField] private Transform buildingOrigin;
    [SerializeField] private Camera playerCamera;
    [SerializeField] private BuildCameraController cameraController;
    [SerializeField] private BuildBlockPlacer blockPlacer;
    [SerializeField] private BuildProgressUI progressUI;
    [SerializeField] private AdjacentBlockPreviews adjacentPreviews;
    [SerializeField] private BuildCompleteFireworks completionFireworks;

    private int partIndex;
    private int totalBlocks;
    private int builtBlocks;
    private BuildGuide guide;
    private Coroutine buildRoutine;
    private string[] selectedBlockTypes;
    private AudioController audioController;
    public event System.Action GuideBuildAccepted;

    public int BuiltBlocks => builtBlocks;
    public int TotalBlocks => totalBlocks;
    public int CurrentPartIndex => partIndex;
    public int CurrentBlockIndex => guide!=null?guide.SelectedIndex:-1;
    public int PartCount => parts.Count;
    public BuildingPart GetPart(int index) { return index>=0 && index<parts.Count ? parts[index] : null; }
    public string CurrentPartName => partIndex>=0 && partIndex < parts.Count ? parts[partIndex].name : "Complete";
    public bool IsComplete => totalBlocks > 0 && builtBlocks == totalBlocks;
    public bool TryGetGuidePosition(out Vector3 position)
    {
        position=Vector3.zero;
        if(guide==null||!guide.Visible||buildRoutine!=null||IsComplete)return false;
        position=guide.TargetPosition;
        return true;
    }

    private void Start()
    {
        audioController = GetComponent<AudioController>();
        var materialLibrary = GetComponent<GameplayMaterials>();
        if (materialLibrary == null) { Debug.LogError("Missing GameplayMaterials on controller.", this); enabled = false; return; }
        materialLibrary.Initialize();
        if (playerCamera == null) playerCamera = Camera.main;
        if (playerCamera == null)
        {
            Debug.LogError("Building gameplay needs a Camera.", this);
            enabled = false;
            return;
        }

        bool usingSample = parts.Count == 0 && createSampleBlueprintWhenEmpty;
        if (usingSample) parts = SampleBuildingBlueprint.Create();
        foreach (BuildingPart part in parts)
            foreach (BuildBlock block in part.blocks)
            {
                block.built = false;
                totalBlocks++;
            }

        if (blockPlacer == null) blockPlacer = GetComponent<BuildBlockPlacer>();
        if (blockPlacer == null) blockPlacer = gameObject.AddComponent<BuildBlockPlacer>();
        blockPlacer.Initialize();

        GameObject guideObject = new GameObject("Build Guides");
        guide = guideObject.AddComponent<BuildGuide>();
        guide.Initialize();

        if (adjacentPreviews == null) adjacentPreviews = GetComponent<AdjacentBlockPreviews>();
        if (adjacentPreviews == null) adjacentPreviews = gameObject.AddComponent<AdjacentBlockPreviews>();

        if (usingSample)
        {
            playerCamera.transform.position = new Vector3(0f, 2.7f, -8f);
            playerCamera.transform.LookAt(new Vector3(0f, 1f, 2f));
            CraftRain.Create(playerCamera);
        }

        if (cameraController == null) cameraController = GetComponent<BuildCameraController>();
        if (cameraController == null) cameraController = gameObject.AddComponent<BuildCameraController>();
        cameraController.Initialize(playerCamera, guide);
        cameraController.GuideClicked += HandleGuideClicked;
        if (progressUI == null) progressUI = GetComponent<BuildProgressUI>();
        if (progressUI == null)
        {
            Debug.LogError("Missing scene BuildProgressUI. Assign the saved Gameplay UI.",this);
            enabled=false;return;
        }
        progressUI.Initialize(this);
        SelectGuide(true);
    }

    private void LateUpdate()
    {
        if (guide != null && buildRoutine == null) SelectGuide(false);
    }

    private void HandleGuideClicked(int selectedPart,int blockIndex)
    {
        if (buildRoutine == null && selectedPart>=0 && selectedPart < parts.Count &&
            blockIndex >= 0 && blockIndex < parts[selectedPart].blocks.Count &&
            !parts[selectedPart].blocks[blockIndex].built)
        {
            GuideBuildAccepted?.Invoke();
            buildRoutine = StartCoroutine(TurnAndBuild(selectedPart, blockIndex));
        }
    }

    private IEnumerator TurnAndBuild(int selectedPart, int selectedBlock)
    {
        cameraController.InputEnabled = false;
        BuildBlock block = parts[selectedPart].blocks[selectedBlock];
        Bounds bounds = SampleBlockVisuals.GetLocalBounds(block);
        Vector3 lookAt = buildingOrigin != null
            ? buildingOrigin.TransformPoint(block.localPosition + bounds.center)
            : block.localPosition + bounds.center;
        yield return cameraController.TurnTo(lookAt);
        if (!block.built)
        {
            blockPlacer.Place(block, buildingOrigin, parts[selectedPart].name);
            block.built = true;
            builtBlocks++;
            if (audioController != null) audioController.PlayBlockPlaced();
            adjacentPreviews.ShowAdjacent(parts, block, buildingOrigin);
            if(IsComplete && completionFireworks!=null)
            {
                Bounds house=new Bounds();bool first=true;
                foreach(BuildingPart part in parts)
                    foreach(BuildBlock piece in part.blocks)
                    {
                        Bounds b=SampleBlockVisuals.GetLocalBounds(piece);
                        b.center+=piece.localPosition;
                        if(first){house=b;first=false;}else house.Encapsulate(b);
                    }
                Vector3 launch=new Vector3(house.center.x,house.max.y+.15f,house.center.z);
                if(buildingOrigin!=null)launch=buildingOrigin.TransformPoint(launch);
                completionFireworks.PlayOnce(launch,playerCamera);
            }
        }
        SelectGuide(true);
        if(!IsComplete && guide.Visible &&
            (LunaController.Ins==null || !LunaController.Ins.IsCTAActive))
            yield return cameraController.TurnTo(guide.TargetPosition);
        cameraController.InputEnabled = true;
        buildRoutine = null;
    }

    private void SelectGuide(bool force)
    {
        if (IsComplete)
        {
            partIndex=parts.Count;
            guide.Hide();
            return;
        }
        if(selectedBlockTypes!=null && !HasUnbuiltType(selectedBlockTypes))selectedBlockTypes=null;
        guide.ShowBest(parts, playerCamera, buildingOrigin, force, selectedBlockTypes);
        partIndex=guide.SelectedPartIndex;
    }

    public bool SelectBlockTypes(string[] types)
    {
        if(guide==null || buildRoutine!=null || IsComplete || types==null || !HasUnbuiltType(types) ||
            (LunaController.Ins!=null && LunaController.Ins.IsCTAActive))return false;
        selectedBlockTypes=types;
        SelectGuide(true);
        if(guide.Visible)buildRoutine=StartCoroutine(FocusSelectedGuide());
        return guide.Visible;
    }

    private bool HasUnbuiltType(string[] types)
    {
        foreach(var part in parts)
            foreach(var block in part.blocks)
                if(!block.built)
                    foreach(string type in types)if(block.type==type)return true;
        return false;
    }

    private IEnumerator FocusSelectedGuide()
    {
        cameraController.InputEnabled=false;
        yield return cameraController.TurnTo(guide.TargetPosition);
        cameraController.InputEnabled=true;
        buildRoutine=null;
    }

    private void OnDestroy()
    {
        if (cameraController != null) cameraController.GuideClicked -= HandleGuideClicked;
    }
}
