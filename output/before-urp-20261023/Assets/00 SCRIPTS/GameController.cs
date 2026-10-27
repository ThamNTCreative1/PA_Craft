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

    private int partIndex;
    private int totalBlocks;
    private int builtBlocks;
    private BuildGuide guide;
    private Coroutine buildRoutine;

    public int BuiltBlocks => builtBlocks;
    public int TotalBlocks => totalBlocks;
    public string CurrentPartName => partIndex < parts.Count ? parts[partIndex].name : "Complete";
    public bool IsComplete => totalBlocks > 0 && builtBlocks == totalBlocks;

    private void Start()
    {
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
        if (progressUI == null) progressUI = gameObject.AddComponent<BuildProgressUI>();
        progressUI.Initialize(this);
        SelectGuide(true);
    }

    private void LateUpdate()
    {
        if (guide != null && buildRoutine == null) SelectGuide(false);
    }

    private void HandleGuideClicked(int blockIndex)
    {
        if (buildRoutine == null && partIndex < parts.Count &&
            blockIndex >= 0 && blockIndex < parts[partIndex].blocks.Count &&
            !parts[partIndex].blocks[blockIndex].built)
            buildRoutine = StartCoroutine(TurnAndBuild(partIndex, blockIndex));
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
            adjacentPreviews.ShowAdjacent(parts, block, buildingOrigin);
        }
        SelectGuide(true);
        cameraController.InputEnabled = true;
        buildRoutine = null;
    }

    private void SelectGuide(bool force)
    {
        while (partIndex < parts.Count && !HasUnbuiltBlocks(parts[partIndex])) partIndex++;
        if (partIndex >= parts.Count)
        {
            guide.Hide();
            return;
        }

        BuildingPart part = parts[partIndex];
        string activeType = null;
        foreach (BuildBlock block in part.blocks)
            if (!block.built) { activeType = block.type; break; }
        guide.ShowBest(part, activeType, playerCamera, buildingOrigin, force);
    }

    private static bool HasUnbuiltBlocks(BuildingPart part)
    {
        foreach (BuildBlock block in part.blocks)
            if (!block.built) return true;
        return false;
    }

    private void OnDestroy()
    {
        if (cameraController != null) cameraController.GuideClicked -= HandleGuideClicked;
    }
}
