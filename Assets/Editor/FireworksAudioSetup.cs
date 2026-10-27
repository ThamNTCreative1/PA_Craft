using System;
using System.IO;
using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;

// Bake compact PCM assets in the Editor; runtime only plays serialized sources.
public static class FireworksAudioSetup
{
    public static string RebuildFlight()
    {
        if(EditorApplication.isPlaying)return "Stop Play Mode first.";
        const string path="Assets/Gameplay Audio/FireworkFlight.wav";
        WriteSound(path,1,.64);
        AssetDatabase.ImportAsset(path,ImportAssetOptions.ForceUpdate);
        return "Updated flight sound only: "+new FileInfo(path).Length+" bytes.";
    }
    public static string Setup()
    {
        if(EditorApplication.isPlaying)return "Stop Play Mode first.";
        var effect=UnityEngine.Object.FindFirstObjectByType<BuildCompleteFireworks>();
        if(effect==null)return "Missing scene fireworks.";
        const string folder="Assets/Gameplay Audio";
        if(!AssetDatabase.IsValidFolder(folder))AssetDatabase.CreateFolder("Assets","Gameplay Audio");
        string[] names={"FireworkLaunch","FireworkFlight","FireworkBurst"};
        string[] fields={"launchAudio","flightAudio","burstAudio"};
        float[] volumes={.65f,.32f,.72f};
        double[] durations={.18,.64,.78};
        var serialized=new SerializedObject(effect);
        long bytes=0;
        for(int stage=0;stage<3;stage++)
        {
            string path=folder+"/"+names[stage]+".wav";
            WriteSound(path,stage,durations[stage]);
            bytes+=new FileInfo(path).Length;
            AssetDatabase.ImportAsset(path);
            var importer=(AudioImporter)AssetImporter.GetAtPath(path);
            importer.forceToMono=true;
            var settings=importer.defaultSampleSettings;
            settings.loadType=AudioClipLoadType.DecompressOnLoad;
            settings.compressionFormat=AudioCompressionFormat.PCM;
            settings.sampleRateSetting=AudioSampleRateSetting.OverrideSampleRate;
            settings.sampleRateOverride=22050;
            importer.defaultSampleSettings=settings;importer.SaveAndReimport();
            var clip=AssetDatabase.LoadAssetAtPath<AudioClip>(path);
            var array=serialized.FindProperty(fields[stage]);array.arraySize=2;
            for(int lane=0;lane<2;lane++)
            {
                var property=array.GetArrayElementAtIndex(lane);
                var source=property.objectReferenceValue as AudioSource;
                if(source==null)source=Undo.AddComponent<AudioSource>(effect.gameObject);
                source.clip=clip;source.playOnAwake=false;source.loop=false;
                source.spatialBlend=0;source.volume=volumes[stage];source.pitch=1;
                property.objectReferenceValue=source;EditorUtility.SetDirty(source);
            }
        }
        serialized.FindProperty("launchInterval").floatValue=.45f;
        serialized.ApplyModifiedProperties();
        EditorSceneManager.MarkSceneDirty(effect.gameObject.scene);
        EditorSceneManager.SaveScene(effect.gameObject.scene);AssetDatabase.SaveAssets();
        return "12 launches over 4.95 seconds; 3 sounds, 6 pooled sources; WAV bytes: "+bytes;
    }

    private static void WriteSound(string path,int stage,double duration)
    {
        const int rate=22050;
        int count=(int)(duration*rate);
        var pcm=new double[count];var random=new System.Random(813+stage);
        double low=0,peak=0,air=0,rumble=0,turbulence=0,flutter=0;
        for(int i=0;i<count;i++)
        {
            double t=(double)i/rate,u=t/duration,noise=random.NextDouble()*2-1;
            low+=.18*(noise-low);
            double value;
            if(stage==0)
                value=(Math.Sin(2*Math.PI*(170*t-180*t*t))*.65+low*1.9+noise*.12)*Math.Exp(-t*24);
            else if(stage==1)
            {
                // Broad rocket exhaust, with irregular combustion rather than a pure-tone whistle.
                // Gradually soften the hiss as the rocket travels away from the listener.
                air+=(.48-.26*u)*(noise-air);
                rumble+=.025*(noise-rumble);
                turbulence+=.003*(noise-turbulence);
                flutter+=.016*(noise-flutter);
                double modulation=Math.Max(.35,Math.Min(1.25,.78+turbulence*3.5+flutter*1.2));
                double attack=1-Math.Exp(-t*95);
                double tail=Math.Pow(1-u,.65)*Math.Exp(-t*1.1);
                value=((air-rumble)*1.3+rumble*.65)*modulation*attack*tail;
            }
            else
            {
                double crackle=Math.Pow(Math.Max(0,Math.Sin(t*191)*Math.Sin(t*317)),9)*noise;
                value=(low*2.5+noise*.35+Math.Sin(2*Math.PI*105*t)*.28)*Math.Exp(-t*7)
                    +crackle*.55*Math.Exp(-t*3);
            }
            value*=Math.Min(1,t/.003)*Math.Min(1,(duration-t)/.025);
            pcm[i]=value;peak=Math.Max(peak,Math.Abs(value));
        }
        using(var writer=new BinaryWriter(File.Create(path)))
        {
            writer.Write(System.Text.Encoding.ASCII.GetBytes("RIFF"));writer.Write(36+count*2);
            writer.Write(System.Text.Encoding.ASCII.GetBytes("WAVEfmt "));writer.Write(16);
            writer.Write((short)1);writer.Write((short)1);writer.Write(rate);writer.Write(rate*2);
            writer.Write((short)2);writer.Write((short)16);
            writer.Write(System.Text.Encoding.ASCII.GetBytes("data"));writer.Write(count*2);
            for(int i=0;i<count;i++)writer.Write((short)(pcm[i]/Math.Max(peak,.001)*.9*32767));
        }
    }
}
