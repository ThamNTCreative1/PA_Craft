using System.Collections.Generic;
using Minigames.Runtimes.Controls;
using UnityEngine;
namespace ClimbJump{
    public class TowerHelper : MonoBehaviour
    {
        private readonly Dictionary<int, Material> cachedLadderMaterials = new Dictionary<int, Material>();
        private readonly float TOWER_HEIGHT_MULTIPLIER = 1.3f;
        [SerializeField] private List<GameObject> ladderTowers;
        [SerializeField] private GameObject ladderPrefab;
        [SerializeField] private Transform ladderContainer;
        [SerializeField] private GameObject towerPrefab;
        [SerializeField] private Transform towerContainer;
        [SerializeField] private int ladderCount;
        [SerializeField] private int towerCount;
        [SerializeField] private float ladderSpacing;
        [SerializeField] private float towerSpacing;
        [SerializeField] private Vector3 offsetExitPoint;
        [SerializeField] private Ladder[] ladders;
        [SerializeField] private Color[] ladderColors;

        private void Start()
        {
            UpdateLadder();
        }
        public float GetTowerHeight()
        {
            float totalHeight = ladderCount * ladderSpacing * TOWER_HEIGHT_MULTIPLIER;
            return totalHeight;
        }

        [ContextMenu("Spawn Towers")]
        public void SpawnTowers()
        {
            if (ladderTowers == null)
                ladderTowers = new List<GameObject>();
            else
                ladderTowers.Clear();

            int laddersPerSection = Mathf.CeilToInt(ladderCount / 4f);
            
            for (int i = 0; i < ladderCount; i++)
            {
                GameObject ladder = Instantiate(ladderPrefab, ladderContainer);
                ladder.transform.localPosition = new Vector3(0, i * ladderSpacing, 0f);
                ladder.name = $"Ladder_{i + 1}";
                ladderTowers.Add(ladder);

                int sectionIndex = Mathf.Min(i / laddersPerSection, 3);
                
                ApplyColorToLadder(ladder, sectionIndex);
            }

            // Spawn towers
            for (int i = 0; i < towerCount; i++)
            {
                GameObject tower = Instantiate(towerPrefab, towerContainer);
                tower.transform.localPosition = new Vector3(0, i * towerSpacing, 0f);
                tower.name = $"Tower_{i + 1}";
            }
            UpdateLadder();
        }

        private void ApplyColorToLadder(GameObject ladder, int colorIndex)
        {
            if (ladderColors == null || ladderColors.Length == 0) return;
            if (colorIndex < 0 || colorIndex >= ladderColors.Length) return;

            Renderer renderer = ladder.GetComponent<Renderer>();
            if (renderer == null)
                renderer = ladder.GetComponentInChildren<Renderer>();

            if (renderer == null || renderer.sharedMaterial == null) return;

            if (!cachedLadderMaterials.TryGetValue(colorIndex, out Material mat))
            {
                mat = new Material(renderer.sharedMaterial) { color = ladderColors[colorIndex] };
                cachedLadderMaterials[colorIndex] = mat;
            }

            renderer.sharedMaterial = mat;
        }
        private void UpdateLadder()
        {
            UpdateLadderLength();
            UpdateExitPoints();
        }
        private void UpdateLadderLength()
        {
            if (ladderTowers == null || ladderTowers.Count == 0) return;
            float totalHeight = ladderTowers.Count * ladderSpacing * TOWER_HEIGHT_MULTIPLIER;
            foreach (Ladder ladder in ladders)
            {
                ladder.PathLength = totalHeight;
                BoxCollider boxCollider = ladder.GetComponent<BoxCollider>();
                if (boxCollider != null)
                {
                    Vector3 size = boxCollider.size;
                    size.y = totalHeight;
                    boxCollider.size = size;
                    Vector3 center = boxCollider.center;
                    center.y = totalHeight * 0.5f;
                    boxCollider.center = center;
                }
            }
        }

        private void UpdateExitPoints()
        {
            if (ladderTowers == null || ladderTowers.Count == 0) return;


            Vector3 bottomPos = ladderTowers[0].transform.position;
            Vector3 topPos = new Vector3(offsetExitPoint.x+ladderTowers[ladderTowers.Count - 1].transform.position.x, ladderTowers[ladderTowers.Count - 1].transform.position.y + offsetExitPoint.y, offsetExitPoint.z+ladderTowers[ladderTowers.Count - 1].transform.position.z);
            Quaternion bottomRot = ladderTowers[0].transform.rotation;
            Quaternion topRot = ladderTowers[ladderTowers.Count - 1].transform.rotation;

            foreach (Ladder ladder in ladders)
            {
                if (ladder == null || ladder.BottomPoint == null || ladder.TopPoint == null) continue;

                ladder.BottomPoint.position = bottomPos;
                ladder.BottomPoint.rotation = bottomRot;
                ladder.TopPoint.position = topPos;
                ladder.TopPoint.rotation = topRot;
            }
        }
        
        [ContextMenu("Clear Towers")]
        public void ClearTowers()
        {
            if (ladderContainer != null) ClearChildren(ladderContainer);
            if (towerContainer != null) ClearChildren(towerContainer);
            if (ladderTowers != null) ladderTowers.Clear();
            cachedLadderMaterials.Clear();
        }
        private void ClearChildren(Transform container)
        {
            if (container == null) return;
            
            List<Transform> childrenToDestroy = new List<Transform>();
            
            foreach (Transform child in container)
            {
                if (child != null)
                {
                    childrenToDestroy.Add(child);
                }
            }
            
            foreach (Transform child in childrenToDestroy)
            {
                if (child != null)
                {
    #if UNITY_EDITOR
                    if (!Application.isPlaying)
                    {
                        DestroyImmediate(child.gameObject);
                    }
                    else
                    {
                        Destroy(child.gameObject);
                    }
    #else
                    Destroy(child.gameObject);
    #endif
                }
            }
        }
    }
}
