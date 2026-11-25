using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

// Editor-only: turns the LaunchRocket source models (Outsources/LaunchRockets, glTF / GLB) into Minecraft-style block rockets,
// written in the same JSON format as Data/nacho_blocks.json (types + blocks, plain coloured cubes, no per-block meshes).
public static class RocketVoxelizer
{
    const string Out="Assets/_Playable/Rocket/Data/";
    const string Src="Outsources/LaunchRockets/";

    // ---------- glTF json (only what we need)
    [System.Serializable] class GAccessor{public int bufferView=-1;public int byteOffset;public int componentType;public int count;public string type;}
    [System.Serializable] class GView{public int buffer;public int byteOffset;public int byteLength;public int byteStride;}
    [System.Serializable] class GBuffer{public string uri;public int byteLength;}
    [System.Serializable] class GImage{public string uri;public int bufferView=-1;}
    [System.Serializable] class GTexture{public int source=-1;}
    [System.Serializable] class GTexRef{public int index=-1;}
    [System.Serializable] class GPbr{public float[] baseColorFactor;public GTexRef baseColorTexture;}
    [System.Serializable] class GMaterial{public string name;public GPbr pbrMetallicRoughness;}
    [System.Serializable] class GAttr{public int POSITION=-1;public int TEXCOORD_0=-1;public int COLOR_0=-1;}
    [System.Serializable] class GPrim{public GAttr attributes;public int indices=-1;public int material=-1;public int mode=4;}
    [System.Serializable] class GMesh{public GPrim[] primitives;}
    [System.Serializable] class GNode{public int[] children;public int mesh=-1;public float[] matrix;public float[] translation;public float[] rotation;public float[] scale;}
    [System.Serializable] class GScene{public int[] nodes;}
    [System.Serializable] class Gltf{public GAccessor[] accessors;public GView[] bufferViews;public GBuffer[] buffers;public GImage[] images;public GTexture[] textures;public GMaterial[] materials;public GMesh[] meshes;public GNode[] nodes;public GScene[] scenes;public int scene;}

    // ---------- output json (same layout as RocketSceneSetup.RocketData)
    [System.Serializable] class BlockType{public string name;public int[] color;}
    [System.Serializable] class Block{public int x,y,z,t,m;}
    [System.Serializable] class RocketData{public BlockType[] types;public Block[] blocks;public string atlas="";}

    struct Tri{public Vector3 a,b,c;public Vector2 ua,ub,uc;public Color ca,cb,cc;public int mat;}

    class Source{public string file,outName,title;public int height;public int colors;public bool dropBrown;public int dropBottom;public bool revolve;public int fins;public Source(string f,string o,string t,int h,int k,bool brown=false,int bottom=0,bool rev=false,int fin=0){file=f;outName=o;title=t;height=h;colors=k;dropBrown=brown;dropBottom=bottom;revolve=rev;fins=fin;}}
    static readonly Source[] Sources={
        new Source("modhub/low-poly-saturn-v.glb","launch_rocket2","Saturn V",44,6,false,0,true,5),
        new Source("tier6/scene.gltf","launch_rocket3","Tier 6 Rocket",36,7),
        new Source("pablo/scene.gltf","launch_rocket4","Pablo Rocket",38,6,true,1,true,6),
    };

    // Rebuilds a lopsided voxel rocket as a clean, 4-way symmetric one: every layer becomes a round disc
    // (radius from the source layer, smoothed), coloured in horizontal bands (2-colour layers get a symmetric checker
    // like the Saturn V roll pattern), + 4 tail fins. Only the outer shell is kept.
    static Block[] Revolve(Block[] src,ref BlockType[] types,int finHeight)
    {
        int sx=0,sy=0,sz=0;foreach(var b in src){sx=Mathf.Max(sx,b.x+1);sy=Mathf.Max(sy,b.y+1);sz=Mathf.Max(sz,b.z+1);}
        float cx=sx*.5f,cz=sz*.5f;var r=new float[sy];var counts=new int[sy,types.Length];
        foreach(var b in src){float d=Mathf.Sqrt((b.x+.5f-cx)*(b.x+.5f-cx)+(b.z+.5f-cz)*(b.z+.5f-cz))+.5f;r[b.y]=Mathf.Max(r[b.y],d);counts[b.y,b.t]++;}
        var rs=new float[sy];for(int y=0;y<sy;y++){float a=r[Mathf.Max(0,y-1)],b=r[y],c=r[Mathf.Min(sy-1,y+1)];rs[y]=Mathf.Max(Mathf.Min(a,b),Mathf.Min(Mathf.Max(a,b),c));} // median of 3
        // colour per layer
        var major=new int[sy];var second=new int[sy];
        for(int y=0;y<sy;y++)
        {
            int m=0,s2=-1,tot=0;for(int t=0;t<types.Length;t++){tot+=counts[y,t];if(counts[y,t]>counts[y,m])m=t;}
            for(int t=0;t<types.Length;t++)if(t!=m&&(s2<0||counts[y,t]>counts[y,s2]))s2=t;
            major[y]=m;second[y]=-1; /* plain bands: the half-checker read as broken blocks */
        }
        for(int y=sy-2;y>=0;y--)rs[y]=Mathf.Min(rs[y],rs[y+1]+1f); // no sudden skirts: widen at most 1 block per layer going down
        int dark=0;for(int t=1;t<types.Length;t++){var a=types[t].color;var b=types[dark].color;if(a[0]+a[1]+a[2]<b[0]+b[1]+b[2])dark=t;}
        int R=Mathf.CeilToInt(Mathf.Max(rs))+3;var cell=new Dictionary<long,int>();
        for(int y=0;y<sy;y++)
        {
            if(rs[y]<=0)continue;float rr=Mathf.Max(1f,Mathf.Round(rs[y]*2f)*.5f);
            for(int ix=-R;ix<R;ix++)for(int iz=-R;iz<R;iz++)
            {
                float d=Mathf.Sqrt((ix+.5f)*(ix+.5f)+(iz+.5f)*(iz+.5f));if(d>rr+.15f)continue;
                int t=major[y];if(second[y]>=0&&((ix<0)^(iz<0)))t=second[y];
                cell[K(ix,y,iz)]=t;
            }
            // tail fins: 4 thin plates sticking 2 blocks out of the body at the bottom
            if(y<finHeight)
            {
                int body=Mathf.CeilToInt(rr);int reach=body+(y<finHeight-1?2:1);
                for(int k=body-1;k<reach;k++)foreach(var p in new[]{new Vector2Int(k,-1),new Vector2Int(k,0),new Vector2Int(-k-1,-1),new Vector2Int(-k-1,0),new Vector2Int(-1,k),new Vector2Int(0,k),new Vector2Int(-1,-k-1),new Vector2Int(0,-k-1)})
                    if(!cell.ContainsKey(K(p.x,y,p.y))||k>=body)cell[K(p.x,y,p.y)]=dark;
            }
        }
        var outB=new List<Block>();int min=int.MaxValue;
        foreach(var kv in cell)
        {
            long k=kv.Key;int x=(int)((k>>40)&0xFFFFF)-512,y=(int)((k>>20)&0xFFFFF)-512,z=(int)(k&0xFFFFF)-512;
            bool shell=!cell.ContainsKey(K(x+1,y,z))||!cell.ContainsKey(K(x-1,y,z))||!cell.ContainsKey(K(x,y+1,z))||!cell.ContainsKey(K(x,y-1,z))||!cell.ContainsKey(K(x,y,z+1))||!cell.ContainsKey(K(x,y,z-1));
            if(!shell)continue;outB.Add(new Block{x=x,y=y,z=z,t=kv.Value});min=Mathf.Min(min,Mathf.Min(x,z));
        }
        // drop unused types, recentre on the grid
        var used=new int[types.Length];foreach(var b in outB)used[b.t]++;var map=new int[types.Length];var nt=new List<BlockType>();
        for(int t=0;t<types.Length;t++)if(used[t]>0){map[t]=nt.Count;nt.Add(types[t]);}
        foreach(var b in outB){b.t=map[b.t];b.x-=min;b.z-=min;}
        types=nt.ToArray();return outB.ToArray();
    }

    // keeps the biggest 26-connected group of voxels (drops floating crumbs)
    static void KeepLargest(Dictionary<int,Vector4> sum,int nx,int nz)
    {
        var seen=new HashSet<int>();List<int> best=null;var stack=new Stack<int>();
        foreach(var start in sum.Keys)
        {
            if(seen.Contains(start))continue;var comp=new List<int>();stack.Push(start);seen.Add(start);
            while(stack.Count>0)
            {
                int k=stack.Pop();comp.Add(k);int x=k%nx,z=(k/nx)%nz,y=k/(nx*nz);
                for(int dy=-1;dy<=1;dy++)for(int dz=-1;dz<=1;dz++)for(int dx=-1;dx<=1;dx++)
                {
                    int X=x+dx,Y=y+dy,Z=z+dz;if(X<0||Z<0||Y<0||X>=nx||Z>=nz)continue;int nk=(Y*nz+Z)*nx+X;
                    if(sum.ContainsKey(nk)&&seen.Add(nk))stack.Push(nk);
                }
            }
            if(best==null||comp.Count>best.Count)best=comp;
        }
        if(best==null)return;var keep=new HashSet<int>(best);var rm=new List<int>();foreach(var k in sum.Keys)if(!keep.Contains(k))rm.Add(k);foreach(var k in rm)sum.Remove(k);
    }

    [MenuItem("Tools/CEBB/Rocket/Voxelize Launch Rockets (2-4)")]
    public static void VoxelizeAll()
    {
        var log=new System.Text.StringBuilder();
        foreach(var s in Sources)log.AppendLine(Voxelize(s));
        AssetDatabase.Refresh();Debug.Log(log.ToString());
    }

    public static string Voxelize(int index){return Voxelize(Sources[index]);}

    static string Voxelize(Source s)
    {
        string path=Src+s.file;List<Tri> tris;Color[] matColor;Texture2D[] matTex;
        Load(path,out tris,out matColor,out matTex);
        // bounds -> voxel size from target height (blocks)
        var b=new Bounds(tris[0].a,Vector3.zero);foreach(var t in tris){b.Encapsulate(t.a);b.Encapsulate(t.b);b.Encapsulate(t.c);}
        float vs=b.size.y/s.height;Vector3 o=b.min;
        int nx=Mathf.CeilToInt(b.size.x/vs)+1,ny=s.height+1,nz=Mathf.CeilToInt(b.size.z/vs)+1;
        var sum=new Dictionary<int,Vector4>();
        foreach(var t in tris)
        {
            float edge=Mathf.Max((t.b-t.a).magnitude,Mathf.Max((t.c-t.b).magnitude,(t.a-t.c).magnitude));
            int n=Mathf.Clamp(Mathf.CeilToInt(edge/(vs*.35f)),1,400);
            for(int i=0;i<=n;i++)for(int j=0;j<=n-i;j++)
            {
                float u=(float)i/n,v=(float)j/n,w=1-u-v;
                Vector3 p=t.a*w+t.b*u+t.c*v;Vector2 uv=t.ua*w+t.ub*u+t.uc*v;
                Color c=(t.mat>=0?matColor[t.mat]:Color.white)*(t.ca*w+t.cb*u+t.cc*v);
                if(t.mat>=0&&matTex[t.mat]!=null)c*=matTex[t.mat].GetPixelBilinear(uv.x,1-uv.y);
                if(c.a<.5f)continue;
                int x=Mathf.Clamp(Mathf.FloorToInt((p.x-o.x)/vs),0,nx-1),y=Mathf.Clamp(Mathf.FloorToInt((p.y-o.y)/vs),0,ny-1),z=Mathf.Clamp(Mathf.FloorToInt((p.z-o.z)/vs),0,nz-1);
                int key=(y*nz+z)*nx+x;Vector4 acc;sum.TryGetValue(key,out acc);acc+=new Vector4(c.r,c.g,c.b,1);sum[key]=acc;
            }
        }
        // drop the top row index overflow (height+1 grid): fine, keeps it tight
        if(s.dropBrown) // launch-pad dirt / wooden tower around the rocket
        {
            var rm=new List<int>();foreach(var kv in sum){var a=kv.Value;float h,sa,va;Color.RGBToHSV(new Color(a.x/a.w,a.y/a.w,a.z/a.w),out h,out sa,out va);if(h*360>15&&h*360<55&&sa>.3f&&va<.65f)rm.Add(kv.Key);}
            foreach(int k in rm)sum.Remove(k);
            if(s.dropBottom>0){rm.Clear();foreach(var k in sum.Keys)if(k/(nx*nz)<s.dropBottom)rm.Add(k);foreach(int k in rm)sum.Remove(k);}
        }
        KeepLargest(sum,nx,nz);
        var keys=new List<int>(sum.Keys);keys.Sort();
        var cols=new Color[keys.Count];for(int i=0;i<keys.Count;i++){var a=sum[keys[i]];cols[i]=new Color(a.x/a.w,a.y/a.w,a.z/a.w);}
        int[] label;Color[] centers=KMeans(cols,s.colors,out label);
        // name + order types by usage
        var types=new BlockType[centers.Length];var used=new HashSet<string>();
        for(int i=0;i<centers.Length;i++){string nm=ColorName(centers[i]);string u=nm;int k=2;while(used.Contains(u))u=nm+" "+(k++);used.Add(u);types[i]=new BlockType{name=u,color=new[]{(int)(centers[i].r*255),(int)(centers[i].g*255),(int)(centers[i].b*255)}};}
        var blocks=new Block[keys.Count];int minX=int.MaxValue,minY=int.MaxValue,minZ=int.MaxValue;
        for(int i=0;i<keys.Count;i++){int key=keys[i];int x=key%nx,z=(key/nx)%nz,y=key/(nx*nz);x=nx-1-x; /* glTF is right-handed: mirror X */blocks[i]=new Block{x=x,y=y,z=z,t=label[i]};minX=Mathf.Min(minX,x);minY=Mathf.Min(minY,y);minZ=Mathf.Min(minZ,z);}
        int sx=0,sy=0,sz=0;foreach(var bl in blocks){bl.x-=minX;bl.y-=minY;bl.z-=minZ;sx=Mathf.Max(sx,bl.x+1);sy=Mathf.Max(sy,bl.y+1);sz=Mathf.Max(sz,bl.z+1);}
        if(s.revolve){blocks=Revolve(blocks,ref types,s.fins);sx=sy=sz=0;foreach(var bl in blocks){sx=Mathf.Max(sx,bl.x+1);sy=Mathf.Max(sy,bl.y+1);sz=Mathf.Max(sz,bl.z+1);}}
        System.Array.Sort(blocks,(p,q)=>p.y!=q.y?p.y.CompareTo(q.y):p.z!=q.z?p.z.CompareTo(q.z):p.x.CompareTo(q.x)); // build bottom-up
        File.WriteAllText(Out+s.outName+".json",JsonUtility.ToJson(new RocketData{types=types,blocks=blocks}));
        var tn=new System.Text.StringBuilder();foreach(var t in types)tn.Append(t.name+"("+t.color[0]+","+t.color[1]+","+t.color[2]+") ");
        return s.title+": "+tris.Count+" tris -> "+blocks.Length+" blocks, "+sx+"x"+sy+"x"+sz+" | "+tn;
    }

    // ---------- preview: every rocket json side by side, rendered to a PNG (outside Assets)
    public static string Preview(string[] jsons,string png,float yaw){return Preview(jsons,png,yaw,false,900);}
    public static string Preview(string[] jsons,string png,float yaw,bool icon,int h)
    {
        var scene=UnityEditor.SceneManagement.EditorSceneManager.NewPreviewScene();
        var mat=new Material(Shader.Find("CEBB/Unlit VColor")??Shader.Find("CEBB/Unlit Cutout VColor"));mat.SetTexture("_MainTex",Texture2D.whiteTexture);
        float x=0;var all=new Bounds();bool first=true;var info=new System.Text.StringBuilder();
        foreach(var j in jsons)
        {
            var mesh=BlockMesh(j);var go=new GameObject(j,typeof(MeshFilter),typeof(MeshRenderer));UnityEditor.SceneManagement.EditorSceneManager.MoveGameObjectToScene(go,scene);
            go.GetComponent<MeshFilter>().sharedMesh=mesh;go.GetComponent<MeshRenderer>().sharedMaterial=mat;
            go.transform.rotation=Quaternion.Euler(0,yaw,0);go.transform.position=new Vector3(x+mesh.bounds.size.x*.5f,0,0);x+=Mathf.Max(mesh.bounds.size.x,mesh.bounds.size.z)+6;
            var b=go.GetComponent<MeshRenderer>().bounds;if(first){all=b;first=false;}else all.Encapsulate(b);info.Append(Path.GetFileName(j)+" "+mesh.bounds.size+"  ");
        }
        var camGo=new GameObject("cam",typeof(Camera));UnityEditor.SceneManagement.EditorSceneManager.MoveGameObjectToScene(camGo,scene);var cam=camGo.GetComponent<Camera>();cam.scene=scene;
        cam.orthographic=true;cam.clearFlags=CameraClearFlags.SolidColor;cam.backgroundColor=icon?new Color(0,0,0,0):new Color(.55f,.75f,.95f);
        cam.transform.rotation=Quaternion.Euler(12,0,0);cam.transform.position=all.center-cam.transform.forward*200;cam.orthographicSize=all.extents.y*(icon?1.04f:1.1f)+(icon?.5f:2);cam.aspect=all.size.x/all.size.y;cam.farClipPlane=500;
        int w=icon?h:Mathf.Clamp((int)(h*cam.aspect),400,3000);var rt=new RenderTexture(w,h,24,RenderTextureFormat.ARGB32);rt.antiAliasing=icon?4:1;cam.targetTexture=rt;cam.aspect=(float)w/h;cam.Render();
        RenderTexture.active=rt;var tex=new Texture2D(w,h,icon?TextureFormat.RGBA32:TextureFormat.RGB24,false);tex.ReadPixels(new Rect(0,0,w,h),0,0);tex.Apply();RenderTexture.active=null;
        File.WriteAllBytes(png,tex.EncodeToPNG());cam.targetTexture=null;Object.DestroyImmediate(rt);Object.DestroyImmediate(tex);
        UnityEditor.SceneManagement.EditorSceneManager.ClosePreviewScene(scene);
        return info.ToString();
    }

    // one mesh of coloured cubes (hidden faces removed), simple face shading like Minecraft
    public static int Height(string jsonPath){var d=JsonUtility.FromJson<RocketData>(File.ReadAllText(jsonPath));int h=0;foreach(var b in d.blocks)h=Mathf.Max(h,b.y+1);return h;}

    // a lone coloured cube (flame / smoke) with the same face shading
    public static Mesh ColorCube(Color col,string name)
    {
        var d=new RocketData{types=new[]{new BlockType{name=name,color=new[]{(int)(col.r*255),(int)(col.g*255),(int)(col.b*255)}}},blocks=new[]{new Block()}};
        return BlockMesh(d,-1,name,false);
    }

    public static Mesh BlockMesh(string jsonPath){return BlockMesh(JsonUtility.FromJson<RocketData>(File.ReadAllText(jsonPath)),-1,Path.GetFileNameWithoutExtension(jsonPath),true);}
    public static Mesh LayerMesh(string jsonPath,int layer){return BlockMesh(JsonUtility.FromJson<RocketData>(File.ReadAllText(jsonPath)),layer,Path.GetFileNameWithoutExtension(jsonPath)+" layer "+layer,true);}

    static Mesh BlockMesh(RocketData d,int layer,string name,bool centre)
    {
        var set=new HashSet<long>();int sx=0,sz=0;
        foreach(var b in d.blocks){set.Add(K(b.x,b.y,b.z));sx=Mathf.Max(sx,b.x+1);sz=Mathf.Max(sz,b.z+1);}
        if(!centre){sx=1;sz=1;}
        var v=new List<Vector3>();var c=new List<Color>();var t=new List<int>();
        Vector3[] n={Vector3.up,Vector3.down,Vector3.right,Vector3.left,Vector3.forward,Vector3.back};float[] shade={1f,.5f,.8f,.8f,.65f,.65f};
        foreach(var b in d.blocks)
        {
            if(layer>=0&&b.y!=layer)continue;
            var tc=d.types[b.t].color;var col=new Color(tc[0]/255f,tc[1]/255f,tc[2]/255f);var p=new Vector3(b.x-sx*.5f+.5f,b.y+.5f,b.z-sz*.5f+.5f);
            for(int f=0;f<6;f++)
            {
                var nn=n[f];if(set.Contains(K(b.x+(int)nn.x,b.y+(int)nn.y,b.z+(int)nn.z)))continue;
                Vector3 a=nn.y!=0?Vector3.right:Vector3.up;Vector3 bb=Vector3.Cross(nn,a);int s=v.Count;
                v.Add(p+(nn-a-bb)*.5f);v.Add(p+(nn-a+bb)*.5f);v.Add(p+(nn+a+bb)*.5f);v.Add(p+(nn+a-bb)*.5f);
                for(int k=0;k<4;k++)c.Add(col*shade[f]);
                t.Add(s);t.Add(s+2);t.Add(s+1);t.Add(s);t.Add(s+3);t.Add(s+2); /* clockwise seen from outside */
            }
        }
        var m=new Mesh{name=name,indexFormat=UnityEngine.Rendering.IndexFormat.UInt32};m.SetVertices(v);m.SetColors(c);m.SetTriangles(t,0);m.RecalculateNormals();m.RecalculateBounds();
        return m;
    }
    static long K(int x,int y,int z){return ((long)(x+512)<<40)|((long)(y+512)<<20)|(long)(z+512);}

    // ---------- loading
    static void Load(string path,out List<Tri> tris,out Color[] matColor,out Texture2D[] matTex)
    {
        string json;var bins=new List<byte[]>();byte[] glbBin=null;string dir=Path.GetDirectoryName(path);
        if(path.EndsWith(".glb"))
        {
            var all=File.ReadAllBytes(path);int p=12;json=null;
            while(p<all.Length){int len=System.BitConverter.ToInt32(all,p);int type=System.BitConverter.ToInt32(all,p+4);if(type==0x4E4F534A)json=System.Text.Encoding.UTF8.GetString(all,p+8,len);else if(type==0x004E4942){glbBin=new byte[len];System.Buffer.BlockCopy(all,p+8,glbBin,0,len);}p+=8+len;}
        }
        else json=File.ReadAllText(path);
        var g=JsonUtility.FromJson<Gltf>(json);
        foreach(var bf in g.buffers)bins.Add(string.IsNullOrEmpty(bf.uri)?glbBin:Uri(bf.uri,dir));
        // materials
        int mc=g.materials!=null?g.materials.Length:0;matColor=new Color[mc];matTex=new Texture2D[mc];
        for(int i=0;i<mc;i++)
        {
            var pbr=g.materials[i].pbrMetallicRoughness;var f=pbr!=null?pbr.baseColorFactor:null;
            matColor[i]=f!=null&&f.Length>=3?new Color(f[0],f[1],f[2],f.Length>3?f[3]:1):Color.white;
            if(pbr!=null&&pbr.baseColorTexture!=null&&pbr.baseColorTexture.index>=0)
            {
                var img=g.images[g.textures[pbr.baseColorTexture.index].source];byte[] data;
                if(img.bufferView>=0){var bv=g.bufferViews[img.bufferView];data=new byte[bv.byteLength];System.Buffer.BlockCopy(bins[bv.buffer],bv.byteOffset,data,0,bv.byteLength);}
                else data=Uri(img.uri,dir);
                var tex=new Texture2D(2,2,TextureFormat.RGBA32,false);tex.LoadImage(data);tex.wrapMode=TextureWrapMode.Repeat;tex.filterMode=FilterMode.Point;matTex[i]=tex;
            }
        }
        tris=new List<Tri>();
        var roots=g.scenes!=null&&g.scenes.Length>0?g.scenes[g.scene].nodes:null;
        if(roots==null){var isChild=new bool[g.nodes.Length];foreach(var n in g.nodes)if(n.children!=null)foreach(var c in n.children)isChild[c]=true;var r=new List<int>();for(int i=0;i<isChild.Length;i++)if(!isChild[i])r.Add(i);roots=r.ToArray();}
        foreach(int r0 in roots)Walk(g,bins,r0,Matrix4x4.identity,tris);
    }

    static byte[] Uri(string uri,string dir)
    {
        if(uri.StartsWith("data:")){int c=uri.IndexOf(',');return System.Convert.FromBase64String(uri.Substring(c+1));}
        return File.ReadAllBytes(Path.Combine(dir,System.Uri.UnescapeDataString(uri)));
    }

    static void Walk(Gltf g,List<byte[]> bins,int ni,Matrix4x4 parent,List<Tri> tris)
    {
        var n=g.nodes[ni];Matrix4x4 local=Matrix4x4.identity;
        if(n.matrix!=null&&n.matrix.Length==16){for(int i=0;i<16;i++)local[i%4,i/4]=n.matrix[i];}
        else
        {
            var t=n.translation!=null&&n.translation.Length==3?new Vector3(n.translation[0],n.translation[1],n.translation[2]):Vector3.zero;
            var q=n.rotation!=null&&n.rotation.Length==4?new Quaternion(n.rotation[0],n.rotation[1],n.rotation[2],n.rotation[3]):Quaternion.identity;
            var s=n.scale!=null&&n.scale.Length==3?new Vector3(n.scale[0],n.scale[1],n.scale[2]):Vector3.one;
            local=Matrix4x4.TRS(t,q,s);
        }
        var m=parent*local;
        if(n.mesh>=0)foreach(var pr in g.meshes[n.mesh].primitives)
        {
            if(pr.mode<4||pr.attributes==null||pr.attributes.POSITION<0)continue;
            var pos=ReadFloats(g,bins,pr.attributes.POSITION,3);var uv=pr.attributes.TEXCOORD_0>=0?ReadFloats(g,bins,pr.attributes.TEXCOORD_0,2):null;
            var col=pr.attributes.COLOR_0>=0?ReadFloats(g,bins,pr.attributes.COLOR_0,g.accessors[pr.attributes.COLOR_0].type=="VEC4"?4:3):null;int cn=col!=null?col.Length/(pos.Length/3):0;
            int vc=pos.Length/3;var idx=pr.indices>=0?ReadInts(g,bins,pr.indices):Seq(vc);
            int count=pr.mode==4?idx.Length/3:idx.Length-2;
            for(int i=0;i<count;i++)
            {
                int a,b,c;
                if(pr.mode==4){a=idx[i*3];b=idx[i*3+1];c=idx[i*3+2];}
                else if(pr.mode==5){a=idx[i];b=idx[i+1];c=idx[i+2];}
                else{a=idx[0];b=idx[i+1];c=idx[i+2];}
                if(a==b||b==c||a==c)continue;
                tris.Add(new Tri{a=m.MultiplyPoint3x4(V3(pos,a)),b=m.MultiplyPoint3x4(V3(pos,b)),c=m.MultiplyPoint3x4(V3(pos,c)),ua=V2(uv,a),ub=V2(uv,b),uc=V2(uv,c),ca=VC(col,cn,a),cb=VC(col,cn,b),cc=VC(col,cn,c),mat=pr.material});
            }
        }
        if(n.children!=null)foreach(int c in n.children)Walk(g,bins,c,m,tris);
    }

    static int[] Seq(int n){var r=new int[n];for(int i=0;i<n;i++)r[i]=i;return r;}
    static Vector3 V3(float[] a,int i){return new Vector3(a[i*3],a[i*3+1],a[i*3+2]);}
    static Color VC(float[] a,int n,int i){return a==null?Color.white:new Color(a[i*n],a[i*n+1],a[i*n+2],1);}
    static Vector2 V2(float[] a,int i){return a==null?Vector2.zero:new Vector2(a[i*2],a[i*2+1]);}

    static float[] ReadFloats(Gltf g,List<byte[]> bins,int ai,int comps)
    {
        var a=g.accessors[ai];var bv=g.bufferViews[a.bufferView];var buf=bins[bv.buffer];
        int cs=a.componentType==5126?4:a.componentType==5123?2:1;int stride=bv.byteStride>0?bv.byteStride:cs*comps;
        var r=new float[a.count*comps];int start=bv.byteOffset+a.byteOffset;
        for(int i=0;i<a.count;i++)for(int k=0;k<comps;k++)
        {
            int p=start+i*stride+k*cs;
            r[i*comps+k]=a.componentType==5126?System.BitConverter.ToSingle(buf,p):a.componentType==5123?System.BitConverter.ToUInt16(buf,p)/65535f:buf[p]/255f;
        }
        return r;
    }

    static int[] ReadInts(Gltf g,List<byte[]> bins,int ai)
    {
        var a=g.accessors[ai];var bv=g.bufferViews[a.bufferView];var buf=bins[bv.buffer];
        int cs=a.componentType==5125?4:a.componentType==5123?2:1;int stride=bv.byteStride>0?bv.byteStride:cs;int start=bv.byteOffset+a.byteOffset;
        var r=new int[a.count];
        for(int i=0;i<a.count;i++){int p=start+i*stride;r[i]=cs==4?(int)System.BitConverter.ToUInt32(buf,p):cs==2?System.BitConverter.ToUInt16(buf,p):buf[p];}
        return r;
    }

    // ---------- palette
    static Color[] KMeans(Color[] cols,int k,out int[] label)
    {
        label=new int[cols.Length];k=Mathf.Min(k,cols.Length);var c=new List<Color>();c.Add(cols[0]);
        while(c.Count<k){float best=-1;int bi=0;for(int i=0;i<cols.Length;i++){float d=float.MaxValue;foreach(var cc in c)d=Mathf.Min(d,D(cols[i],cc));if(d>best){best=d;bi=i;}}c.Add(cols[bi]);}
        for(int it=0;it<20;it++)
        {
            var acc=new Vector4[k];
            for(int i=0;i<cols.Length;i++){int bi=0;float bd=float.MaxValue;for(int j=0;j<k;j++){float d=D(cols[i],c[j]);if(d<bd){bd=d;bi=j;}}label[i]=bi;acc[bi]+=new Vector4(cols[i].r,cols[i].g,cols[i].b,1);}
            for(int j=0;j<k;j++)if(acc[j].w>0)c[j]=new Color(acc[j].x/acc[j].w,acc[j].y/acc[j].w,acc[j].z/acc[j].w);
        }
        // remove empty clusters
        var count=new int[k];foreach(int l in label)count[l]++;var map=new int[k];var res=new List<Color>();
        var order=new List<int>();for(int j=0;j<k;j++)if(count[j]>0)order.Add(j);order.Sort((p,q)=>count[q].CompareTo(count[p]));
        for(int i=0;i<order.Count;i++){map[order[i]]=i;res.Add(c[order[i]]);}
        for(int i=0;i<label.Length;i++)label[i]=map[label[i]];
        return res.ToArray();
    }
    static float D(Color a,Color b){float dr=a.r-b.r,dg=a.g-b.g,db=a.b-b.b;return dr*dr*.3f+dg*dg*.59f+db*db*.11f;}

    static string ColorName(Color c)
    {
        float h,s,v;Color.RGBToHSV(c,out h,out s,out v);
        if(v<.22f)return "Black";
        if(s<.18f)return v>.75f?"White":v>.45f?"Iron":"Stone";
        h*=360;
        if(h<15||h>=340)return "Red";if(h<40)return v<.5f?"Brown":"Orange";if(h<70)return "Gold";if(h<160)return "Green";if(h<200)return "Cyan";if(h<260)return "Blue";return "Purple";
    }
}
