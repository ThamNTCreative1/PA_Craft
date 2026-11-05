using System.Collections.Generic;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace Playable.EditorTools
{
    public sealed class MissingScriptCleanerWindow : EditorWindow
    {
        private readonly List<AffectedObject> _affectedObjects = new List<AffectedObject>();

        private GameObject _rootObject;
        private Vector2 _scrollPosition;
        private int _scannedObjectCount;
        private int _missingScriptCount;
        private bool _hasScanResult;

        [MenuItem("Tools/Cleanup/Remove Missing Scripts")]
        public static void ShowWindow()
        {
            MissingScriptCleanerWindow window =
                GetWindow<MissingScriptCleanerWindow>("Missing Script Cleaner");
            window.minSize = new Vector2(440f, 320f);
        }

        private void OnEnable()
        {
            Undo.undoRedoPerformed += OnHierarchyChanged;
            EditorApplication.hierarchyChanged += OnHierarchyChanged;

            if (_rootObject == null && Selection.activeGameObject != null)
            {
                SetRootObject(Selection.activeGameObject);
            }
        }

        private void OnDisable()
        {
            Undo.undoRedoPerformed -= OnHierarchyChanged;
            EditorApplication.hierarchyChanged -= OnHierarchyChanged;
        }

        private void OnGUI()
        {
            EditorGUILayout.LabelField("Remove Missing Mono Scripts", EditorStyles.boldLabel);
            EditorGUILayout.HelpBox(
                "Quét GameObject gốc và toàn bộ object con, kể cả object đang inactive. " +
                "Công cụ chỉ xóa component hiển thị là “Missing (Mono Script)”; " +
                "không tự xóa script chỉ đang có lỗi compile.",
                MessageType.Info);

            EditorGUILayout.Space(6f);

            EditorGUI.BeginChangeCheck();
            GameObject newRoot = (GameObject)EditorGUILayout.ObjectField(
                "Root GameObject",
                _rootObject,
                typeof(GameObject),
                true);

            if (EditorGUI.EndChangeCheck())
            {
                SetRootObject(newRoot);
            }

            using (new EditorGUILayout.HorizontalScope())
            {
                using (new EditorGUI.DisabledScope(Selection.activeGameObject == null))
                {
                    if (GUILayout.Button("Use Selected GameObject"))
                    {
                        SetRootObject(Selection.activeGameObject);
                    }
                }

                using (new EditorGUI.DisabledScope(_rootObject == null))
                {
                    if (GUILayout.Button("Scan Hierarchy"))
                    {
                        ScanHierarchy();
                    }
                }
            }

            EditorGUILayout.Space(8f);
            DrawScanResult();

            GUILayout.FlexibleSpace();

            using (new EditorGUI.DisabledScope(
                       _rootObject == null ||
                       !_hasScanResult ||
                       _missingScriptCount == 0))
            {
                GUI.backgroundColor = new Color(1f, 0.55f, 0.45f);

                if (GUILayout.Button(
                        $"Remove {_missingScriptCount} Missing Script(s)",
                        GUILayout.Height(36f)))
                {
                    ConfirmAndRemoveMissingScripts();
                }

                GUI.backgroundColor = Color.white;
            }
        }

        private void DrawScanResult()
        {
            if (!_hasScanResult)
            {
                EditorGUILayout.HelpBox("Chưa quét hierarchy.", MessageType.None);
                return;
            }

            EditorGUILayout.LabelField("Scan Result", EditorStyles.boldLabel);
            EditorGUILayout.LabelField("Objects scanned", _scannedObjectCount.ToString());
            EditorGUILayout.LabelField("Affected objects", _affectedObjects.Count.ToString());
            EditorGUILayout.LabelField("Missing scripts", _missingScriptCount.ToString());

            if (_missingScriptCount == 0)
            {
                EditorGUILayout.HelpBox(
                    "Không tìm thấy Missing Mono Script trong hierarchy này.",
                    MessageType.Info);
                return;
            }

            EditorGUILayout.Space(4f);
            _scrollPosition = EditorGUILayout.BeginScrollView(
                _scrollPosition,
                EditorStyles.helpBox,
                GUILayout.MinHeight(100f),
                GUILayout.MaxHeight(220f));

            foreach (AffectedObject affectedObject in _affectedObjects)
            {
                EditorGUILayout.LabelField(
                    $"{affectedObject.HierarchyPath}  ({affectedObject.MissingCount})");
            }

            EditorGUILayout.EndScrollView();
        }

        private void SetRootObject(GameObject rootObject)
        {
            _rootObject = rootObject;
            ClearScanResult();

            if (_rootObject != null)
            {
                ScanHierarchy();
            }

            Repaint();
        }

        private void ScanHierarchy()
        {
            ClearScanResult();

            if (_rootObject == null)
            {
                return;
            }

            Transform[] hierarchy = _rootObject.GetComponentsInChildren<Transform>(true);
            _scannedObjectCount = hierarchy.Length;

            foreach (Transform currentTransform in hierarchy)
            {
                GameObject currentObject = currentTransform.gameObject;
                int missingCount =
                    GameObjectUtility.GetMonoBehavioursWithMissingScriptCount(currentObject);

                if (missingCount <= 0)
                {
                    continue;
                }

                _missingScriptCount += missingCount;
                _affectedObjects.Add(new AffectedObject(
                    GetHierarchyPath(_rootObject.transform, currentTransform),
                    missingCount));
            }

            _hasScanResult = true;
            Repaint();
        }

        private void ConfirmAndRemoveMissingScripts()
        {
            if (_rootObject == null || _missingScriptCount == 0)
            {
                return;
            }

            bool isPrefabAsset = EditorUtility.IsPersistent(_rootObject);
            string undoMessage = isPrefabAsset
                ? "\n\nPrefab asset sẽ được lưu trực tiếp và không hỗ trợ Undo."
                : "\n\nBạn có thể hoàn tác thao tác này bằng Ctrl+Z.";

            bool confirmed = EditorUtility.DisplayDialog(
                "Remove Missing Scripts",
                $"Xóa {_missingScriptCount} Missing Mono Script(s) khỏi " +
                $"{_affectedObjects.Count} GameObject(s), từ object cha tới toàn bộ object con?" +
                undoMessage,
                "Remove",
                "Cancel");

            if (!confirmed)
            {
                return;
            }

            int removedCount = isPrefabAsset
                ? RemoveFromPrefabAsset(_rootObject)
                : RemoveFromSceneHierarchy(_rootObject);

            ScanHierarchy();
            EditorUtility.DisplayDialog(
                "Missing Script Cleaner",
                $"Đã xóa {removedCount} Missing Mono Script(s).",
                "OK");
        }

        private static int RemoveFromSceneHierarchy(GameObject rootObject)
        {
            int undoGroup = Undo.GetCurrentGroup();
            Undo.SetCurrentGroupName("Remove Missing Mono Scripts");
            int removedCount = 0;

            Transform[] hierarchy = rootObject.GetComponentsInChildren<Transform>(true);

            foreach (Transform currentTransform in hierarchy)
            {
                GameObject currentObject = currentTransform.gameObject;
                int missingCount =
                    GameObjectUtility.GetMonoBehavioursWithMissingScriptCount(currentObject);

                if (missingCount <= 0)
                {
                    continue;
                }

                Undo.RegisterCompleteObjectUndo(currentObject, "Remove Missing Mono Scripts");
                removedCount +=
                    GameObjectUtility.RemoveMonoBehavioursWithMissingScript(currentObject);
                EditorUtility.SetDirty(currentObject);
            }

            Undo.CollapseUndoOperations(undoGroup);

            if (rootObject.scene.IsValid())
            {
                EditorSceneManager.MarkSceneDirty(rootObject.scene);
            }

            return removedCount;
        }

        private static int RemoveFromPrefabAsset(GameObject prefabAsset)
        {
            string prefabPath = AssetDatabase.GetAssetPath(prefabAsset);
            PrefabAssetType prefabType = PrefabUtility.GetPrefabAssetType(prefabAsset);

            if (string.IsNullOrEmpty(prefabPath) ||
                prefabType == PrefabAssetType.NotAPrefab ||
                prefabType == PrefabAssetType.Model)
            {
                EditorUtility.DisplayDialog(
                    "Unsupported Asset",
                    "Object đã chọn không phải prefab có thể chỉnh sửa. " +
                    "Hãy mở prefab hoặc kéo một GameObject trong Hierarchy vào cửa sổ.",
                    "OK");
                return 0;
            }

            GameObject prefabContents = PrefabUtility.LoadPrefabContents(prefabPath);

            try
            {
                int removedCount = 0;
                Transform[] hierarchy =
                    prefabContents.GetComponentsInChildren<Transform>(true);

                foreach (Transform currentTransform in hierarchy)
                {
                    removedCount +=
                        GameObjectUtility.RemoveMonoBehavioursWithMissingScript(
                            currentTransform.gameObject);
                }

                PrefabUtility.SaveAsPrefabAsset(prefabContents, prefabPath);
                AssetDatabase.SaveAssets();
                return removedCount;
            }
            finally
            {
                PrefabUtility.UnloadPrefabContents(prefabContents);
            }
        }

        private static string GetHierarchyPath(Transform root, Transform current)
        {
            if (current == root)
            {
                return root.name;
            }

            Stack<string> names = new Stack<string>();
            Transform iterator = current;

            while (iterator != null && iterator != root)
            {
                names.Push(iterator.name);
                iterator = iterator.parent;
            }

            names.Push(root.name);
            return string.Join("/", names);
        }

        private void OnHierarchyChanged()
        {
            ClearScanResult();
            Repaint();
        }

        private void ClearScanResult()
        {
            _affectedObjects.Clear();
            _scannedObjectCount = 0;
            _missingScriptCount = 0;
            _hasScanResult = false;
        }

        private readonly struct AffectedObject
        {
            public AffectedObject(string hierarchyPath, int missingCount)
            {
                HierarchyPath = hierarchyPath;
                MissingCount = missingCount;
            }

            public string HierarchyPath { get; }
            public int MissingCount { get; }
        }
    }
}
