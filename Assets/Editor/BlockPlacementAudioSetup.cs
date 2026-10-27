using System.IO;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;

// Bakes a tiny sound asset in the Editor; no synthesis or file IO in the playable.
public static class BlockPlacementAudioSetup
{
    public static string Setup(bool regenerate = false)
    {
        if (EditorApplication.isPlaying) return "Stop Play Mode first.";
        var controller = Object.FindFirstObjectByType<GameController>();
        if (controller == null) return "No GameController in the active scene.";
        const string folder = "Assets/Gameplay Audio";
        const string path = folder + "/BlockPlace.wav";
        if (!AssetDatabase.IsValidFolder(folder)) AssetDatabase.CreateFolder("Assets", "Gameplay Audio");
        if (regenerate || !File.Exists(path))
        {
            const int rate = 22050;
            const int samples = 2205;
            var random = new System.Random(724);
            using (var writer = new BinaryWriter(File.Create(path)))
            {
                writer.Write(System.Text.Encoding.ASCII.GetBytes("RIFF"));writer.Write(36+samples*2);
                writer.Write(System.Text.Encoding.ASCII.GetBytes("WAVEfmt "));writer.Write(16);
                writer.Write((short)1);writer.Write((short)1);writer.Write(rate);writer.Write(rate*2);
                writer.Write((short)2);writer.Write((short)16);
                writer.Write(System.Text.Encoding.ASCII.GetBytes("data"));writer.Write(samples*2);
                double lowNoise = 0, filtered = 0, filteredTwice = 0;
                var pcm = new double[samples];
                double peak = 0;
                for (int i=0;i<samples;i++)
                {
                    double t=(double)i/rate;
                    double noise=random.NextDouble()*2-1;
                    lowNoise=lowNoise*.92+noise*.08;
                    double attack=System.Math.Min(1,t/.0018);
                    double fade=System.Math.Min(1,(samples-1-i)/(rate*.008));
                    // Lower, muffled single knock; omit the bright transient entirely.
                    double body=System.Math.Sin(2*System.Math.PI*190*t)*System.Math.Exp(-t*80)*.5
                        +System.Math.Sin(2*System.Math.PI*390*t)*System.Math.Exp(-t*95)*.32
                        +System.Math.Sin(2*System.Math.PI*620*t)*System.Math.Exp(-t*140)*.14;
                    double knock=lowNoise*System.Math.Exp(-t*100)*1.1;
                    double impact=System.Math.Tanh((body+knock)*1.35)*.9*attack;
                    // Retain low mids for phone speakers, while suppressing sharp treble.
                    filtered += .24 * (impact-filtered);
                    filteredTwice += .24 * (filtered-filteredTwice);
                    double value=filteredTwice*fade;
                    pcm[i]=value;
                    peak=System.Math.Max(peak,System.Math.Abs(value));
                }
                double gain=peak>0 ? (.88/peak)*2 : 1;
                for(int i=0;i<samples;i++)
                {
                    double value=pcm[i]*gain;
                    // +6 dB gain with a soft peak ceiling, baked into the file for Luna.
                    double magnitude=System.Math.Abs(value);
                    if(magnitude>.8) value=System.Math.Sign(value)*(.8+.18*System.Math.Tanh((magnitude-.8)/.18));
                    writer.Write((short)(value*32767));
                }
            }
        }
        AssetDatabase.ImportAsset(path);
        var importer = AssetImporter.GetAtPath(path) as AudioImporter;
        importer.forceToMono = true;
        var settings = importer.defaultSampleSettings;
        settings.loadType = AudioClipLoadType.DecompressOnLoad;
        settings.compressionFormat = AudioCompressionFormat.PCM;
        settings.sampleRateSetting = AudioSampleRateSetting.OverrideSampleRate;
        settings.sampleRateOverride = 22050;
        importer.defaultSampleSettings = settings;
        importer.SaveAndReimport();
        var audio = controller.GetComponent<AudioController>();
        if (audio == null) audio = Undo.AddComponent<AudioController>(controller.gameObject);
        var serialized = new SerializedObject(audio);
        var source = serialized.FindProperty("placementSource").objectReferenceValue as AudioSource;
        if (source == null) source = Undo.AddComponent<AudioSource>(controller.gameObject);
        source.playOnAwake=false;source.loop=false;source.spatialBlend=0;source.volume=.85f;
        source.clip=AssetDatabase.LoadAssetAtPath<AudioClip>(path);
        serialized.FindProperty("placementSource").objectReferenceValue=source;
        serialized.FindProperty("placementClip").objectReferenceValue=source.clip;
        serialized.FindProperty("placementVolume").floatValue=.85f;
        serialized.ApplyModifiedProperties();
        EditorUtility.SetDirty(source);
        EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);
        EditorSceneManager.SaveScene(controller.gameObject.scene);
        AssetDatabase.SaveAssets();
        return "Placement audio ready: " + new FileInfo(path).Length + " bytes, " + source.clip.length + " seconds.";
    }
}
