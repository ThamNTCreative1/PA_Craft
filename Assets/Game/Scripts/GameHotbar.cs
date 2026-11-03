// using System.Collections;
// using HAVIGAME;
// using UnityEngine;
// using VoxelPlay;
//
// public class GameHotbar : Hotbar {
//     private Coroutine waitForPlayerRoutine;
//
//     protected override void OnEnable() {
//         base.OnEnable();
//
//         EventDispatcher.AddListener<GameEvent.OnInventoryItemSelectChanged>(OnInventoryItemSelectChanged);
//         StartWaitingForPlayerIfNeeded();
//     }
//
//     protected override void OnDisable() {
//         if (waitForPlayerRoutine != null) {
//             StopCoroutine(waitForPlayerRoutine);
//             waitForPlayerRoutine = null;
//         }
//
//         base.OnDisable();
//
//         EventDispatcher.RemoveListener<GameEvent.OnInventoryItemSelectChanged>(OnInventoryItemSelectChanged);
//     }
//
//     private void OnInventoryItemSelectChanged(GameEvent.OnInventoryItemSelectChanged args) {
//         // Highlight();
//     }
//
//     public override void UpdateUI() {
//         if (VoxelPlayPlayer.instance == null) {
//             StartWaitingForPlayerIfNeeded();
//             return;
//         }
//
//         base.UpdateUI();
//
//         int selectedIndex = GameData.World.SelectedHotbarIndex;
//         int itemIndex = GameData.World.Hotbars[selectedIndex];
//         VoxelPlayPlayer.instance.SetSelectedItem(itemIndex);
//     }
//
//     private void StartWaitingForPlayerIfNeeded() {
//         if (VoxelPlayPlayer.instance == null && waitForPlayerRoutine == null && isActiveAndEnabled) {
//             waitForPlayerRoutine = StartCoroutine(WaitForPlayer());
//         }
//     }
//
//     private IEnumerator WaitForPlayer() {
//         while (VoxelPlayPlayer.instance == null) {
//             yield return null;
//         }
//
//         waitForPlayerRoutine = null;
//         UpdateUI();
//     }
//
//     protected override void OnHotBarItemSelect(InventoryItemView view) {
//         base.OnHotBarItemSelect(view);
//
//         if (VoxelPlayPlayer.instance == null || view is not HotbarItemView hotbarItemView) {
//             return;
//         }
//
//         int itemIndex = GameData.World.Hotbars[hotbarItemView.Index];
//         VoxelPlayPlayer.instance.SetSelectedItem(itemIndex);
//     }
// }
