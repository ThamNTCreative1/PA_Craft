using System.Collections.Generic;
using UnityEngine;

/// <summary>Short scale pop and white overlay without modifying prefab materials.</summary>
public sealed class BlockPlacementEffect : MonoBehaviour
{
    private const float Duration=.24f;
    private readonly List<GameObject> overlays=new List<GameObject>();
    private Vector3 finalScale;
    private Material flash;
    private float elapsed;
    private bool running;

    public void Play(Material template)
    {
        finalScale=transform.localScale;
        if(template!=null)
        {
            flash=new Material(template);
            var filters=GetComponentsInChildren<MeshFilter>();
            foreach(var filter in filters)
            {
                var source=filter.GetComponent<MeshRenderer>();
                if(source==null||!source.enabled||filter.sharedMesh==null)continue;
                var overlay=new GameObject("Placement flash");
                overlay.layer=filter.gameObject.layer;
                overlay.transform.SetParent(filter.transform,false);
                overlay.AddComponent<MeshFilter>().sharedMesh=filter.sharedMesh;
                var renderer=overlay.AddComponent<MeshRenderer>();
                var materials=new Material[filter.sharedMesh.subMeshCount];
                for(int i=0;i<materials.Length;i++)materials[i]=flash;
                renderer.sharedMaterials=materials;
                renderer.shadowCastingMode=UnityEngine.Rendering.ShadowCastingMode.Off;
                renderer.receiveShadows=false;
                overlays.Add(overlay);
            }
        }
        elapsed=0;running=true;
        transform.localScale=finalScale*.8f;
    }
    private void Update()
    {
        if(!running)return;
        elapsed+=Time.deltaTime;
        float t=Mathf.Clamp01(elapsed/Duration);
        // Quick arrival, a restrained overshoot, then settle at exact authored scale.
        float scale=t<.55f?Mathf.Lerp(.8f,1.045f,Mathf.SmoothStep(0,1,t/.55f)):
            Mathf.Lerp(1.045f,1,Mathf.SmoothStep(0,1,(t-.55f)/.45f));
        transform.localScale=finalScale*scale;
        if(flash!=null)flash.color=new Color(1,1,1,1-Mathf.SmoothStep(0,1,t));
        if(t>=1){Cleanup();Destroy(this);}
    }
    private void Cleanup()
    {
        if(!running)return;
        running=false;transform.localScale=finalScale;
        foreach(var overlay in overlays)if(overlay!=null){overlay.SetActive(false);Destroy(overlay);}
        overlays.Clear();
        if(flash!=null){Destroy(flash);flash=null;}
    }
    private void OnDisable(){Cleanup();}
    private void OnDestroy(){Cleanup();}
}
