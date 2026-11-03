// using UnityEngine;
//
// public class GamePanel : MonoBehaviour
// {
//     [Header("[Gameplay References]")]
//     [SerializeField] private GameObject root;
//     [SerializeField] private MobileInputController input;
//     [SerializeField] private GameHotbar hotbar;
//
//     public MobileInputController Input => input;
//     public GameHotbar Hotbar => hotbar;
//     public UltimateJoystick MovementJoystick => input != null ? input.MovementJoystick : null;
//
//    
//
//     private void SetGameplayActive(bool active)
//     {
//         if (!active && input != null)
//         {
//             input.SetInputEnabled(false);
//         }
//
//         if (root != null)
//         {
//             root.SetActive(active);
//         }
//
//         if (!active)
//         {
//             return;
//         }
//
//         if (input != null)
//         {
//             input.SetInputEnabled(true);
//         }
//
//         if (hotbar != null)
//         {
//             hotbar.UpdateUI();
//         }
//     }
//
// #if UNITY_EDITOR
//     private void OnValidate()
//     {
//         root ??= transform.Find("Root")?.gameObject;
//         input ??= GetComponentInChildren<MobileInputController>(true);
//         hotbar ??= GetComponentInChildren<GameHotbar>(true);
//     }
// #endif
// }
