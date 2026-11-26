using System;
using UnityEngine;

// Serialized by the editor importer from the original game's assets.
[Serializable]
public class PlayableEggRules
{
    public string name;
    public Sprite thumbnail;
    public int[] petIds;
    public float spawnWeight, incubationTime;
    public Vector2[] sizeRanges;
    public float[] sizeWeights;
    public GameObject[] pets;
    public float[] petWeights, petIncome;

    public float RollSize()
    {
        if(sizeRanges==null || sizeRanges.Length==0)return 1;
        Vector2 range=sizeRanges[Pick(sizeWeights,sizeRanges.Length)];
        return UnityEngine.Random.Range(range.x,range.y);
    }
    public static int Pick(float[] weights,int count)
    {
        if(count<=0)return 0;
        float sum=0;for(int i=0;i<count;i++)sum+=weights!=null && i<weights.Length?Mathf.Max(0,weights[i]):1;
        if(sum<=0)return 0;
        float value=UnityEngine.Random.value*sum;
        for(int i=0;i<count;i++){value-=weights!=null && i<weights.Length?Mathf.Max(0,weights[i]):1;if(value<=0)return i;}
        return count-1;
    }
}
