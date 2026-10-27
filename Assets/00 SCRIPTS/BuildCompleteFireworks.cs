using UnityEngine;

/// <summary>One short celebration, batched into one texture-free mesh. Scene-authored renderer/material.</summary>
public sealed class BuildCompleteFireworks : MonoBehaviour
{
    [SerializeField] private MeshFilter meshFilter;
    [SerializeField] private MeshRenderer meshRenderer;
    [SerializeField] private float burstHeight=2.2f;
    [SerializeField] private float launchInterval=.45f;
    [SerializeField] private AudioSource[] launchAudio;
    [SerializeField] private AudioSource[] flightAudio;
    [SerializeField] private AudioSource[] burstAudio;
    const int Shots=12, Sparks=24, Quads=Shots*(Sparks+1);
    const float Rise=.7f, Life=1.3f;
    private Mesh mesh;
    private readonly Vector3[] vertices=new Vector3[Quads*4];
    private readonly Color[] colors=new Color[Quads*4];
    private readonly Color[] palette={new Color(1,.72f,.12f),new Color(1,.23f,.52f),new Color(.2f,.8f,1),new Color(.6f,1,.25f),new Color(.8f,.3f,1),new Color(1,.88f,.4f)};
    private Camera view;
    private float elapsed;
    private bool running;
    private readonly int[] soundStages=new int[Shots];
    public bool HasPlayed {get;private set;}
    public bool IsPlaying => running;

    public void PlayOnce(Vector3 launchPosition,Camera camera)
    {
        if(HasPlayed || meshFilter==null || meshRenderer==null)return;
        HasPlayed=true;view=camera;elapsed=0;running=true;
        transform.position=launchPosition;transform.rotation=Quaternion.identity;
        if(mesh==null)
        {
            mesh=new Mesh();mesh.name="Completion Fireworks Batch";mesh.MarkDynamic();
            mesh.vertices=vertices;
            var triangles=new int[Quads*6];
            for(int i=0;i<Quads;i++){int v=i*4,t=i*6;triangles[t]=v;triangles[t+1]=v+1;triangles[t+2]=v+2;triangles[t+3]=v;triangles[t+4]=v+2;triangles[t+5]=v+3;}
            mesh.triangles=triangles;meshFilter.sharedMesh=mesh;
        }
        meshRenderer.enabled=true;
        PlaySounds();
        Draw();
    }
    private void Update()
    {
        if(!running)return;
        elapsed+=Time.deltaTime;
        PlaySounds();
        if(elapsed>(Shots-1)*launchInterval+Rise+Life)
        {running=false;meshRenderer.enabled=false;return;}
        Draw();
    }
    private void Draw()
    {
        Vector3 right=view!=null?view.transform.right:Vector3.right;
        for(int shot=0;shot<Shots;shot++)
        {
            float age=elapsed-shot*launchInterval;
            float angle=shot*Mathf.PI*2/3;
            Vector3 start=new Vector3(Mathf.Cos(angle)*.7f,0,Mathf.Sin(angle)*.5f);
            Vector3 peak=start+new Vector3(Mathf.Cos(angle)*.6f,burstHeight+(shot%2)*.5f,Mathf.Sin(angle)*.5f);
            int first=shot*(Sparks+1);
            if(age>=0&&age<Rise)
            {
                Vector3 p=Vector3.Lerp(start,peak,age/Rise);
                Quad(first,p,p-Vector3.up*.35f,right*.025f,new Color(1,.85f,.4f,.9f));
            }
            else Quad(first,Vector3.zero,Vector3.zero,Vector3.zero,Color.clear);
            float time=age-Rise;
            for(int i=0;i<Sparks;i++)
            {
                if(time<0||time>Life){Quad(first+1+i,Vector3.zero,Vector3.zero,Vector3.zero,Color.clear);continue;}
                float y=1-2*(i+.5f)/Sparks;
                float radial=Mathf.Sqrt(1-y*y),a=i*2.399963f+shot;
                Vector3 velocity=new Vector3(Mathf.Cos(a)*radial,y,Mathf.Sin(a)*radial)*(1.8f+(i%3)*.25f);
                Vector3 p=peak+velocity*time+Vector3.down*(.65f*time*time);
                Vector3 direction=(velocity+Vector3.down*(1.3f*time)).normalized;
                Color color=palette[shot%palette.Length];color.a=Mathf.Clamp01((Life-time)/.6f);
                Quad(first+1+i,p,p-direction*(.1f+.12f*(1-time/Life)),right*(.024f*(1-.5f*time/Life)),color);
            }
        }
        mesh.vertices=vertices;mesh.colors=colors;mesh.RecalculateBounds();
    }
    private void Quad(int index,Vector3 a,Vector3 b,Vector3 width,Color color)
    {
        int v=index*4;vertices[v]=a-width;vertices[v+1]=a+width;vertices[v+2]=b+width;vertices[v+3]=b-width;
        for(int i=0;i<4;i++)colors[v+i]=color;
    }
    private void PlaySounds()
    {
        for(int shot=0;shot<Shots;shot++)
        {
            float age=elapsed-shot*launchInterval;
            if(age>=0 && (soundStages[shot]&1)==0)
            {soundStages[shot]|=1;if(age<.18f)PlaySound(launchAudio,shot);}
            if(age>=.06f && (soundStages[shot]&2)==0)
            {soundStages[shot]|=2;if(age<Rise)PlaySound(flightAudio,shot);}
            if(age>=Rise && (soundStages[shot]&4)==0)
            {soundStages[shot]|=4;if(age<Rise+.6f)PlaySound(burstAudio,shot);}
        }
    }
    private static void PlaySound(AudioSource[] sources,int shot)
    {
        if(sources==null||sources.Length==0)return;
        AudioSource source=sources[shot%sources.Length];
        if(source!=null)source.Play();
    }
    private static void StopSounds(AudioSource[] sources)
    {
        if(sources==null)return;
        for(int i=0;i<sources.Length;i++)if(sources[i]!=null)sources[i].Stop();
    }
    private void OnDisable()
    {
        running=false;if(meshRenderer!=null)meshRenderer.enabled=false;
        StopSounds(launchAudio);StopSounds(flightAudio);StopSounds(burstAudio);
    }
    private void OnDestroy(){if(mesh!=null)Destroy(mesh);}
}
