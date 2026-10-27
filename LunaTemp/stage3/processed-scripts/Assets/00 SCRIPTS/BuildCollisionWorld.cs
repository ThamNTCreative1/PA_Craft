using System.Collections.Generic;
using UnityEngine;

/// <summary>Saved world-space boxes. Player collision does not depend on the WebGL physics backend.</summary>
public sealed class BuildCollisionWorld : MonoBehaviour
{
    public static BuildCollisionWorld Active { get; private set; }
    // Playworks omits serialized Bounds arrays. Export six floats per box instead.
    [SerializeField] private float[] mapBoxData = new float[0];
    [SerializeField] private GameObject limitRoot;
    private bool limitRegistered;
    private Bounds[] mapBoxes = new Bounds[0];
    private readonly List<Bounds> placedBoxes = new List<Bounds>();
    private readonly List<GameObject> owners = new List<GameObject>();
    public struct Hit { public float distance; public Vector3 normal; public Vector3 point; }
    void Awake() { InitializeWorld(); }
    public bool InitializeWorld()
    {
        Active=this;
        if(mapBoxData==null || mapBoxData.Length==0 || mapBoxData.Length%6!=0)return false;
        if(mapBoxes.Length!=mapBoxData.Length/6)
        {
            mapBoxes=new Bounds[mapBoxData.Length/6];
            for(int i=0;i<mapBoxes.Length;i++)
            {
                int n=i*6;
                mapBoxes[i]=new Bounds(new Vector3(mapBoxData[n],mapBoxData[n+1],mapBoxData[n+2]),
                    new Vector3(mapBoxData[n+3],mapBoxData[n+4],mapBoxData[n+5]));
            }
        }
        if(!limitRegistered && limitRoot!=null)
        {
            Register(limitRoot);
            limitRegistered=true;
        }
        return true;
    }
    void OnDestroy() { if(Active==this)Active=null; }

    public void Register(GameObject owner)
    {
        foreach(var box in owner.GetComponentsInChildren<BoxCollider>())
        {
            if(!box.enabled || box.isTrigger)continue;
            // Calculate from the transform, without waiting for a physics sync.
            Vector3 size=box.size*.5f;
            Vector3 x=box.transform.TransformVector(new Vector3(size.x,0,0));
            Vector3 y=box.transform.TransformVector(new Vector3(0,size.y,0));
            Vector3 z=box.transform.TransformVector(new Vector3(0,0,size.z));
            Vector3 extents=new Vector3(Mathf.Abs(x.x)+Mathf.Abs(y.x)+Mathf.Abs(z.x),
                Mathf.Abs(x.y)+Mathf.Abs(y.y)+Mathf.Abs(z.y),Mathf.Abs(x.z)+Mathf.Abs(y.z)+Mathf.Abs(z.z));
            placedBoxes.Add(new Bounds(box.transform.TransformPoint(box.center),extents*2));
            owners.Add(owner);
        }
    }

    int Count { get { return mapBoxes.Length+placedBoxes.Count; } }
    bool GetBox(int index,out Bounds box)
    {
        if(index<mapBoxes.Length){box=mapBoxes[index];return true;}
        index-=mapBoxes.Length;box=placedBoxes[index];
        return owners[index]!=null && owners[index].activeInHierarchy;
    }

    public bool Cast(Vector3 center,Vector3 halfSize,Vector3 direction,float distance,out Hit hit)
    {
        hit=new Hit();hit.distance=distance;
        bool found=false;
        for(int i=0;i<Count;i++)
        {
            Bounds box;if(!GetBox(i,out box))continue;
            Vector3 min=box.min-halfSize,max=box.max+halfSize;
            float enter=-1000000f,exit=distance;
            Vector3 normal=Vector3.zero;
            bool valid=true;
            for(int axis=0;axis<3;axis++)
            {
                float d=direction[axis],p=center[axis];
                if(Mathf.Abs(d)<.000001f)
                {if(p<min[axis] || p>max[axis]){valid=false;break;}continue;}
                float near=(min[axis]-p)/d,far=(max[axis]-p)/d;
                float sign=-1;
                if(near>far){float t=near;near=far;far=t;sign=1;}
                if(near>enter){enter=near;normal=Vector3.zero;normal[axis]=sign;}
                exit=Mathf.Min(exit,far);
                if(enter>exit){valid=false;break;}
            }
            if(!valid || enter<-.00001f || enter>hit.distance || exit<0)continue;
            hit.distance=Mathf.Max(0,enter);hit.normal=normal;
            Vector3 contact=center+direction*hit.distance;
            contact-=Vector3.Scale(normal,halfSize);
            hit.point=contact;found=true;
        }
        return found;
    }

    public Vector3 ResolveOverlap(Vector3 center,Vector3 halfSize)
    {
        // A block may appear around the player. Sweeps alone cannot escape an initial overlap.
        for(int pass=0;pass<12;pass++)
        {
            bool moved=false;
            for(int i=0;i<Count;i++)
            {
                Bounds box;if(!GetBox(i,out box))continue;
                Vector3 min=box.min-halfSize,max=box.max+halfSize;
                if(center.x<=min.x || center.x>=max.x || center.y<=min.y || center.y>=max.y || center.z<=min.z || center.z>=max.z)continue;
                float best=float.MaxValue;Vector3 push=Vector3.zero;
                for(int axis=0;axis<3;axis++)
                {
                    float low=center[axis]-min[axis],high=max[axis]-center[axis];
                    float delta=low<high?-low-.016f:high+.016f;
                    if(Mathf.Abs(delta)<best){best=Mathf.Abs(delta);push=Vector3.zero;push[axis]=delta;}
                }
                center+=push;moved=true;
            }
            if(!moved)break;
        }
        return center;
    }
}
