using UnityEngine;

// Luna plays every AudioSource as 2D (spatialBlend is a stub, min/max distance do not exist there):
// the distance falloff of a 3D source is applied through its volume instead. No left/right panning.
[RequireComponent(typeof(AudioSource))]
public class PlayableSpatialAudio : MonoBehaviour
{
    [Tooltip("The AudioListener the distance is measured from (Main Camera).")]
    public Transform listener;
    public AudioSource source;
    [Tooltip("Volume inside minDistance, copied from the AudioSource.")]
    public float volume=1;
    public float minDistance=1, maxDistance=50;
    public bool linear=true;

    private void Awake()
    {
        if(!source)source=GetComponent<AudioSource>();
        // The Editor plays it 2D too, so it sounds the same as the Luna build (where spatialBlend is an unsupported stub).
        if(Application.isEditor)source.spatialBlend=0;
        Apply();
    }
    private void LateUpdate(){Apply();}
    private void Apply()
    {
        if(!source || !listener)return;
        float d=Vector3.Distance(listener.position,transform.position);
        float gain;
        if(linear)gain=1-Mathf.Clamp01((d-minDistance)/Mathf.Max(.01f,maxDistance-minDistance));
        // Unity's logarithmic rolloff: full volume inside minDistance, then minDistance / distance (silent past maxDistance).
        else gain=d<=minDistance?1:d>=maxDistance?0:minDistance/d;
        source.volume=volume*gain;
    }
}
