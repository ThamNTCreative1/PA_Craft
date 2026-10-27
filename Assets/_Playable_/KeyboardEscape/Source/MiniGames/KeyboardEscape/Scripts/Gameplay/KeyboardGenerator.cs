#if UNITY_EDITOR
using UnityEditor;
#endif
using System.Collections;
using UnityEngine;

namespace Minigames.KeyboardEscape.Gameplay
{
    public class KeyboardGenerator : MonoBehaviour
    {
        public enum KeyForwardAxis
        {
            Z,Y,X,ObZ,ObX
        }

        public GameObject prefabReference;
        public Vector2Int size;
        public float spacing = 1.2f;
        public KeyForwardAxis forwardAxis;
        public KeyboardColorPreset colorPreset;

#if UNITY_EDITOR

        [ContextMenu("Generate")]
        public void SpawnPrefab()
        {
            SpawnPrefabGrid(prefabReference, size.x, size.y, spacing, transform.position, transform.up);
        }

        [ContextMenu("Remove")]
        public void RemovePrefab()
        {
            for (int i = transform.childCount - 1; i >= 0; i--)
            {
                Object.DestroyImmediate(transform.GetChild(i).gameObject);
            }
        }

        [ContextMenu("ApplyKeyColor")]
        public void ApplyKeyColor()
        {
            for (int i = transform.childCount - 1; i >= 0; i--)
            {
                var keyNote = transform.GetChild(i).GetComponent<KeyNote>();
                if(keyNote != null)
                {
                    keyNote.SetGradient(colorPreset.gradient);
                }
            }
        }

        [ContextMenu("UpdateDirection")]
        public void UpdateDirection()
        {
            var keys = GetComponentsInChildren<KeyNote>();
            foreach (var key in keys)
            {
                if (forwardAxis == KeyForwardAxis.X)
                {
                    key.transform.rotation = Quaternion.LookRotation(transform.right);
                }
                else if (forwardAxis == KeyForwardAxis.ObX)
                {
                    key.transform.rotation = Quaternion.LookRotation(-transform.right);
                }
                else if (forwardAxis == KeyForwardAxis.ObZ)
                {
                    key.transform.rotation = Quaternion.LookRotation(-transform.forward);
                }
            }
        }

        public void SpawnPrefabGrid(GameObject prefab, int rows, int cols, float spacing, Vector3 startPos, Vector3 planeNormal)
        {
            if (prefab == null)
            {
                Debug.LogError("Prefab reference is null!");
                return;
            }

            // Rotation theo normal của mặt phẳng
            Quaternion planeRotation = Quaternion.FromToRotation(Vector3.up, planeNormal.normalized);

            // Rotation theo trục Y của container
            Quaternion containerYRotation = Quaternion.Euler(0, transform.eulerAngles.y, 0);

            // Kết hợp cả hai rotation
            Quaternion finalRotation = containerYRotation * planeRotation;

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    Vector3 pos = startPos + finalRotation * new Vector3(c * spacing, 0, r * spacing);
                    GameObject instance = PrefabUtility.InstantiatePrefab(prefab) as GameObject;
                    if (instance != null)
                    {
                        instance.transform.position = pos;
                        instance.transform.rotation = finalRotation;
                        instance.transform.SetParent(transform);
                        if(forwardAxis == KeyForwardAxis.X)
                        {
                            instance.transform.rotation = Quaternion.LookRotation(transform.right);
                        }
                        else if(forwardAxis == KeyForwardAxis.ObX)
                        {
                            instance.transform.rotation = Quaternion.LookRotation(-transform.right);
                        }
                        else if (forwardAxis == KeyForwardAxis.ObZ)
                        {
                            instance.transform.rotation = Quaternion.LookRotation(-transform.forward);
                        }

                        var key = instance.GetComponent<KeyNote>();
                        if(key != null)
                        {
                            key.SetGradient(colorPreset.gradient);
                        }
                    }
                }
            }

            Debug.Log($"Spawned {rows * cols} prefabs in grid {rows}x{cols} on inclined plane with normal {planeNormal}");
        }

       

        private void OnDrawGizmos()
        {
            Matrix4x4 oldMatrix = Gizmos.matrix;

            Gizmos.matrix = Matrix4x4.TRS(transform.position, transform.rotation, Vector3.one);

            Vector3 sizeF = new Vector3(size.y * spacing, 0.5f, size.x * spacing);
            Gizmos.color = Color.red;
            Gizmos.DrawWireCube(sizeF / 2 - (new Vector3(spacing, 0, spacing)) / 2, sizeF);

            Gizmos.matrix = oldMatrix;
        }
#endif

        public void GenerateKeyBoard(int generateAmountPerFrame)
        {
            if (transform.childCount == 0)
                StartCoroutine(SpawnPrefabGridHandle(prefabReference, size.x, size.y, spacing, transform.position, transform.up, generateAmountPerFrame));
        }

        public IEnumerator SpawnPrefabGridHandle(GameObject prefab, int rows, int cols, float spacing, Vector3 startPos, Vector3 planeNormal, int generateAmountPerFrame)
        {
            if (prefab == null)
            {
                Debug.LogError("Prefab reference is null!");
                yield break;
            }

            // Rotation theo normal của mặt phẳng
            Quaternion planeRotation = Quaternion.FromToRotation(Vector3.up, planeNormal.normalized);

            // Rotation theo trục Y của container
            Quaternion containerYRotation = Quaternion.Euler(0, transform.eulerAngles.y, 0);

            // Kết hợp cả hai rotation
            Quaternion finalRotation = containerYRotation * planeRotation;

            int generatedCount = 0;

            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    Vector3 pos = startPos + finalRotation * new Vector3(c * spacing, 0, r * spacing);
                    GameObject instance = Instantiate(prefab);
                    generatedCount++;
                    if (instance != null)
                    {
                        instance.transform.position = pos;
                        instance.transform.rotation = finalRotation;
                        instance.transform.SetParent(transform);
                        if (forwardAxis == KeyForwardAxis.X)
                        {
                            instance.transform.rotation = Quaternion.LookRotation(transform.right);
                        }
                        else if (forwardAxis == KeyForwardAxis.ObX)
                        {
                            instance.transform.rotation = Quaternion.LookRotation(-transform.right);
                        }
                        else if (forwardAxis == KeyForwardAxis.ObZ)
                        {
                            instance.transform.rotation = Quaternion.LookRotation(-transform.forward);
                        }

                        var key = instance.GetComponent<KeyNote>();
                        if (key != null)
                        {
                            key.SetGradient(colorPreset.gradient);
                        }
                    }

                    if(generatedCount >= generateAmountPerFrame)
                    {
                        generatedCount = 0;
                        yield return null;
                    }
                }
            }

            Debug.Log($"Spawned {rows * cols} prefabs in grid {rows}x{cols} on inclined plane with normal {planeNormal}");
        }
    }
}

