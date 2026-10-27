using System;
using System.IO;
using System.Text;
using UnityEditor;
using UnityEngine;

// Source: user-supplied Day304.mp3, 22.776 seconds. Editor-only reference.
public static class ExtractCaseAudio
{
    [MenuItem("Tools/Case Opening/Extract Reference Audio")]
    public static void Extract()
    {
        const string source = "Assets/Editor/CaseAudioReference/Day304.mp3";
        var importer = (AudioImporter)AssetImporter.GetAtPath(source);
        var settings = importer.defaultSampleSettings;
        settings.loadType = AudioClipLoadType.DecompressOnLoad;
        settings.compressionFormat = AudioCompressionFormat.PCM;
        importer.defaultSampleSettings = settings;
        importer.SaveAndReimport();
        AudioClip clip = AssetDatabase.LoadAssetAtPath<AudioClip>(source);
        clip.LoadAudioData();
        float[] samples = new float[clip.samples * clip.channels];
        if (!clip.GetData(samples, 0)) throw new InvalidOperationException("Cannot decode reference MP3.");
        const string folder = "Assets/Resources/CaseOpening/Audio";
        Directory.CreateDirectory(folder);
        // Keep the case-opening mechanism, an isolated late tick, and the
        // complete reward tail. Earlier menu/selection sounds are excluded.
        Write(clip, samples, folder + "/Unlock.wav", 3.07f, 7.85f);
        Write(clip, samples, folder + "/Tick.wav", 12.90f, 13.32f);
        Write(clip, samples, folder + "/Reward.wav", 14.04f, 18.90f);
        AssetDatabase.Refresh();
        foreach (string name in new[] { "Unlock", "Tick", "Reward" })
        {
            var output = (AudioImporter)AssetImporter.GetAtPath(folder + "/" + name + ".wav");
            var config = output.defaultSampleSettings;
            config.loadType = AudioClipLoadType.DecompressOnLoad;
            config.compressionFormat = AudioCompressionFormat.PCM;
            config.preloadAudioData = true;
            output.defaultSampleSettings = config;
            output.SaveAndReimport();
        }
        Debug.Log("Extracted original reference audio: Unlock 3.07–7.85s; Tick 12.90–13.32s; Reward 14.04–18.90s. Stereo PCM16, gain 2.5, short edge fades.");
    }

    private static void Write(AudioClip clip, float[] source, string path, float start, float end)
    {
        int first = Mathf.RoundToInt(start * clip.frequency);
        int frames = Mathf.Min(Mathf.RoundToInt((end - start) * clip.frequency), clip.samples - first);
        int bytes = frames * clip.channels * 2;
        using (var writer = new BinaryWriter(File.Create(path)))
        {
            writer.Write(Encoding.ASCII.GetBytes("RIFF")); writer.Write(36 + bytes);
            writer.Write(Encoding.ASCII.GetBytes("WAVEfmt ")); writer.Write(16);
            writer.Write((short)1); writer.Write((short)clip.channels);
            writer.Write(clip.frequency); writer.Write(clip.frequency * clip.channels * 2);
            writer.Write((short)(clip.channels * 2)); writer.Write((short)16);
            writer.Write(Encoding.ASCII.GetBytes("data")); writer.Write(bytes);
            for (int frame = 0; frame < frames; frame++)
            {
                float fadeIn = Mathf.Clamp01(frame / (clip.frequency * 0.002f));
                float fadeOut = Mathf.Clamp01((frames - 1 - frame) / (clip.frequency * 0.012f));
                for (int channel = 0; channel < clip.channels; channel++)
                {
                    float v = source[(first + frame) * clip.channels + channel] * 2.5f * fadeIn * fadeOut;
                    writer.Write((short)Mathf.RoundToInt(Mathf.Clamp(v, -1f, 1f) * 32767f));
                }
            }
        }
    }
}
