using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace Playable
{
    public class AnimationMergerWindow : EditorWindow
    {
        private List<AnimationClip> clips = new();

        [MenuItem("Tools/Animation/Merge Animation Clips")]
        static void Open()
        {
            GetWindow<AnimationMergerWindow>("Animation Merger");
        }

        void OnGUI()
        {
            GUILayout.Space(10);

            GUILayout.Label("Animation Clips", EditorStyles.boldLabel);

            DrawDropArea();

            GUILayout.Space(10);

            int remove = -1;

            for (int i = 0; i < clips.Count; i++)
            {
                EditorGUILayout.BeginHorizontal();

                clips[i] = (AnimationClip)EditorGUILayout.ObjectField(clips[i], typeof(AnimationClip), false);

                if (GUILayout.Button("X", GUILayout.Width(25)))
                    remove = i;

                EditorGUILayout.EndHorizontal();
            }

            if (remove >= 0)
                clips.RemoveAt(remove);

            GUILayout.Space(15);

            if (GUILayout.Button("Clear"))
                clips.Clear();

            GUILayout.Space(15);

            if (GUILayout.Button("Merge"))
                Merge();
        }

        void Merge()
        {
            clips = clips.Where(c => c != null).ToList();

            if (clips.Count == 0)
            {
                EditorUtility.DisplayDialog("Error", "No clips selected.", "OK");
                return;
            }

            string path = EditorUtility.SaveFilePanelInProject(
                "Save Animation",
                "MergedAnimation",
                "anim",
                "");

            if (string.IsNullOrEmpty(path))
                return;

            AnimationClip merged = new AnimationClip();
            merged.frameRate = clips.Max(c => c.frameRate);

            foreach (AnimationClip clip in clips)
            {
                //----------------------------------------
                // Float Curves
                //----------------------------------------

                foreach (EditorCurveBinding binding in AnimationUtility.GetCurveBindings(clip))
                {
                    AnimationCurve curve = AnimationUtility.GetEditorCurve(clip, binding);

                    AnimationCurve newCurve = AnimationUtility.GetEditorCurve(merged, binding);

                    if (newCurve == null)
                        newCurve = new AnimationCurve();

                    foreach (Keyframe key in curve.keys)
                    {
                        Keyframe k = key;
                        newCurve.AddKey(k);
                    }

                    AnimationUtility.SetEditorCurve(merged, binding, newCurve);
                }

                //----------------------------------------
                // Object Curves
                //----------------------------------------

                foreach (EditorCurveBinding binding in AnimationUtility.GetObjectReferenceCurveBindings(clip))
                {
                    ObjectReferenceKeyframe[] keys =
                        AnimationUtility.GetObjectReferenceCurve(clip, binding);

                    List<ObjectReferenceKeyframe> mergedKeys =
                        AnimationUtility.GetObjectReferenceCurve(merged, binding)?.ToList()
                        ?? new List<ObjectReferenceKeyframe>();

                    foreach (var key in keys)
                    {
                        mergedKeys.Add(new ObjectReferenceKeyframe()
                        {
                            time = key.time,
                            value = key.value
                        });
                    }

                    AnimationUtility.SetObjectReferenceCurve(
                        merged,
                        binding,
                        mergedKeys.ToArray());
                }

                //----------------------------------------
                // Animation Events
                //----------------------------------------

                List<AnimationEvent> events =
                    AnimationUtility.GetAnimationEvents(merged).ToList();

                foreach (AnimationEvent e in AnimationUtility.GetAnimationEvents(clip))
                {
                    AnimationEvent evt = new AnimationEvent();

                    evt.functionName = e.functionName;
                    evt.floatParameter = e.floatParameter;
                    evt.intParameter = e.intParameter;
                    evt.stringParameter = e.stringParameter;
                    evt.objectReferenceParameter = e.objectReferenceParameter;

                    evt.time = e.time;

                    events.Add(evt);
                }

                AnimationUtility.SetAnimationEvents(
                    merged,
                    events.ToArray());
            }

            AssetDatabase.CreateAsset(merged, path);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();

            Selection.activeObject = merged;

            EditorUtility.DisplayDialog(
                "Done",
                "Animation merged successfully!",
                "OK");
        }

        private void DrawDropArea()
        {
            GUILayout.Space(10);

            Rect dropArea = GUILayoutUtility.GetRect(0, 70, GUILayout.ExpandWidth(true));

            GUI.Box(dropArea, "Drag & Drop Animation Clips Here");

            Event evt = Event.current;

            switch (evt.type)
            {
                case EventType.DragUpdated:
                case EventType.DragPerform:

                    if (!dropArea.Contains(evt.mousePosition))
                        return;

                    DragAndDrop.visualMode = DragAndDropVisualMode.Copy;

                    if (evt.type == EventType.DragPerform)
                    {
                        DragAndDrop.AcceptDrag();

                        foreach (Object obj in DragAndDrop.objectReferences)
                        {
                            if (obj is AnimationClip clip)
                            {
                                if (!clips.Contains(clip))
                                    clips.Add(clip);
                            }
                        }
                    }

                    evt.Use();
                    break;
            }
        }
    }
}
