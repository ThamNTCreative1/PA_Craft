using UnityEngine;

// Keeps each nickname text above its player (source Nickname). Names are set in the scene.
public class NameTagGroup : MonoBehaviour
{
    [SerializeField] private Transform[] tags;
    [SerializeField] private Transform[] targets;
    [SerializeField] private Vector3 offset = new Vector3(0, 2.4f, 0);

    private void LateUpdate()
    {
        int n = Mathf.Min(tags.Length, targets.Length);
        for (int i = 0; i < n; i++)
            if (tags[i] && targets[i]) tags[i].position = targets[i].position + offset;
    }
}
