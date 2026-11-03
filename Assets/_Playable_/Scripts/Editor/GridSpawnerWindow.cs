using UnityEditor;
using UnityEngine;

namespace Playable.EditorTools
{
    public class GridSpawnerWindow : EditorWindow
    {
        private GameObject _sourceObject;
        private int _lengthCount = 5;
        private int _widthCount = 5;
        private float _distance = 1f;
        private string _parentName = "Grid Root";
        private bool _centerGrid = true;

        [MenuItem("Tools/Mesh/Grid Spawner")]
        public static void ShowWindow()
        {
            GetWindow<GridSpawnerWindow>("Grid Spawner");
        }

        private void OnGUI()
        {
            EditorGUILayout.LabelField("Source", EditorStyles.boldLabel);
            _sourceObject = (GameObject)EditorGUILayout.ObjectField("Object", _sourceObject, typeof(GameObject), true);

            EditorGUILayout.Space(8f);
            EditorGUILayout.LabelField("Layout", EditorStyles.boldLabel);
            _lengthCount = Mathf.Max(1, EditorGUILayout.IntField("Length Count", _lengthCount));
            _widthCount = Mathf.Max(1, EditorGUILayout.IntField("Width Count", _widthCount));
            _distance = Mathf.Max(0f, EditorGUILayout.FloatField("Distance", _distance));
            _centerGrid = EditorGUILayout.Toggle("Center Grid", _centerGrid);

            EditorGUILayout.Space(8f);
            EditorGUILayout.LabelField("Output", EditorStyles.boldLabel);
            _parentName = EditorGUILayout.TextField("Parent Name", _parentName);

            EditorGUILayout.Space(12f);
            using (new EditorGUI.DisabledScope(_sourceObject == null))
            {
                if (GUILayout.Button("Create Grid Copies", GUILayout.Height(32f)))
                {
                    CreateGridCopies();
                }
            }
        }

        private void CreateGridCopies()
        {
            if (_sourceObject == null)
            {
                EditorUtility.DisplayDialog("Missing Source", "Assign an object first.", "OK");
                return;
            }

            GameObject parentObject = new GameObject(string.IsNullOrWhiteSpace(_parentName) ? "Grid Root" : _parentName);
            Undo.RegisterCreatedObjectUndo(parentObject, "Create Grid Root");
            parentObject.transform.SetPositionAndRotation(_sourceObject.transform.position, Quaternion.identity);

            Vector3 basePosition = Vector3.zero;
            if (_centerGrid)
            {
                basePosition.x = -((_lengthCount - 1) * _distance) * 0.5f;
                basePosition.z = -((_widthCount - 1) * _distance) * 0.5f;
            }

            for (int x = 0; x < _lengthCount; x++)
            {
                for (int z = 0; z < _widthCount; z++)
                {
                    GameObject clone = (GameObject)PrefabUtility.InstantiatePrefab(_sourceObject);
                    if (clone == null)
                    {
                        clone = Instantiate(_sourceObject);
                    }

                    Undo.RegisterCreatedObjectUndo(clone, "Create Grid Copy");
                    clone.name = _sourceObject.name + "_" + x + "_" + z;
                    clone.transform.SetParent(parentObject.transform);
                    clone.transform.localRotation = _sourceObject.transform.localRotation;
                    clone.transform.localScale = _sourceObject.transform.localScale;
                    clone.transform.localPosition = basePosition + new Vector3(x * _distance, 0f, z * _distance);
                }
            }

            Selection.activeGameObject = parentObject;
            EditorGUIUtility.PingObject(parentObject);
        }
    }
}
