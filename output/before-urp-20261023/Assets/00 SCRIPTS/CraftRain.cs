using UnityEngine;
using UnityEngine.Rendering;

/// <summary>Texture-free rain: one reusable mesh, no physics or particle-system dependency.</summary>
public sealed class CraftRain : MonoBehaviour
{
    const int DropCount = 80;
    const int SplashCount = 20;
    const int QuadCount = DropCount + SplashCount * 2;
    readonly Vector3[] drops = new Vector3[DropCount];
    readonly Vector3[] splashes = new Vector3[SplashCount];
    readonly float[] ages = new float[SplashCount];
    readonly Vector3[] vertices = new Vector3[QuadCount * 4];
    Camera view;
    Mesh mesh;
    Material material;
    int splashCursor;
    System.Random random = new System.Random(713);

    public static void Create(Camera camera)
    {
        var rain = new GameObject("Craft Rain").AddComponent<CraftRain>();
        rain.view = camera;
        rain.Initialize();
    }
    void Initialize()
    {
        mesh = new Mesh { name = "Rain and Splash Batch" }; mesh.MarkDynamic();
        mesh.vertices = vertices;
        int[] triangles = new int[QuadCount * 6];
        for (int i=0;i<QuadCount;i++)
        {
            int v=i*4, t=i*6;
            triangles[t]=v; triangles[t+1]=v+1; triangles[t+2]=v+2;
            triangles[t+3]=v; triangles[t+4]=v+2; triangles[t+5]=v+3;
        }
        mesh.triangles=triangles;
        gameObject.AddComponent<MeshFilter>().sharedMesh=mesh;
        material=GameplayMaterials.Create(unlitSurface: true); material.color=new Color(.28f,.61f,.91f);
        var renderer=gameObject.AddComponent<MeshRenderer>(); renderer.sharedMaterial=material;
        renderer.shadowCastingMode=ShadowCastingMode.Off; renderer.receiveShadows=false;
        for(int i=0;i<DropCount;i++) ResetDrop(i,true);
        for(int i=0;i<SplashCount;i++) ages[i]=1;
    }
    float Random01() { return (float)random.NextDouble(); }
    void ResetDrop(int i,bool initial)
    {
        Vector3 center=view.transform.position+view.transform.forward*4;
        float x=0,z=0;
        // Only rain over the open flat clearing, not through the house or distant trees.
        for(int attempt=0;attempt<24;attempt++)
        {
            x=Mathf.Clamp(center.x+(Random01()-.5f)*16,-7.5f,7.5f);
            z=Mathf.Clamp(center.z+(Random01()-.5f)*16,-10,7.5f);
            if(!(x>-3.2f && x<3.2f && z>-1.2f && z<3.2f)) break;
        }
        if(x>-3.2f && x<3.2f && z>-1.2f && z<3.2f) z=-2;
        drops[i]=new Vector3(x,initial?Random01()*7:7+Random01(),z);
    }
    void LateUpdate()
    {
        if(view==null || mesh==null) return;
        float dt=Mathf.Min(Time.deltaTime,.05f);
        Vector3 right=view.transform.right;
        for(int i=0;i<DropCount;i++)
        {
            drops[i]+=Vector3.down*(6.5f*dt);
            if(drops[i].y<=.03f)
            {
                splashes[splashCursor]=new Vector3(drops[i].x,.035f,drops[i].z);
                ages[splashCursor]=0; splashCursor=(splashCursor+1)%SplashCount;
                ResetDrop(i,false);
            }
            Quad(i,drops[i],drops[i]+Vector3.up*.23f,right*.007f);
        }
        for(int i=0;i<SplashCount;i++)
        {
            ages[i]+=dt; float life=Mathf.Clamp01(ages[i]/.28f);
            float spread=.035f+life*.10f;
            Vector3 p=splashes[i];
            Vector3 tip=Vector3.up*(.10f*(1-life));
            Vector3 width=view.transform.up*(.012f*(1-life));
            Quad(DropCount+i*2,p,p-right*spread+tip,width);
            Quad(DropCount+i*2+1,p,p+right*spread+tip,width);
        }
        mesh.vertices=vertices; mesh.RecalculateBounds();
    }
    void Quad(int index,Vector3 a,Vector3 b,Vector3 halfWidth)
    {
        int v=index*4; vertices[v]=a-halfWidth; vertices[v+1]=b-halfWidth;
        vertices[v+2]=b+halfWidth; vertices[v+3]=a+halfWidth;
    }
    void OnDestroy()
    {
        if(mesh!=null) Destroy(mesh);
        if(material!=null) Destroy(material);
    }
}
