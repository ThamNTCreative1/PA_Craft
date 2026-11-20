using UnityEngine;

// A monster's nest with its eggs (source Nest). Eggs can be stolen while they are there and the monster is home.
// Caught thieves give the eggs back; after a successful theft the eggs come back once the monster is home again.
public class Nest : MonoBehaviour
{
    [SerializeField] private GameObject eggs;
    [SerializeField] private Monster monster;
    [Tooltip("Eggs reappear this long after the monster is back home (after a theft).")]
    [SerializeField] private float refillDelay = 4f;
    [Tooltip("Source Nest.tutorialNest: the guide line leads here first.")]
    public bool tutorialNest;

    private bool hasEggs = true;
    private float refillTimer = -1;

    public Monster Monster { get { return monster; } }
    public bool HasEggs { get { return hasEggs; } }
    public Vector3 Position { get { return transform.position; } }
    // A bot heading here (so two bots don't go for the same nest).
    [System.NonSerialized] public Thief reservedBy;

    public bool CanSteal { get { return hasEggs && monster != null && monster.IsHome; } }

    private void Start()
    {
        if (eggs) eggs.SetActive(true);
    }

    public void TakeEggs()
    {
        hasEggs = false;
        refillTimer = -1;
        if (eggs) eggs.SetActive(false);
    }

    public void ReturnEggs()
    {
        hasEggs = true;
        refillTimer = -1;
        if (eggs) eggs.SetActive(true);
    }

    // Called by the monster when it is back at the nest.
    public void OnMonsterHome()
    {
        if (!hasEggs && refillTimer < 0) refillTimer = refillDelay;
    }

    private void Update()
    {
        if (refillTimer < 0) return;
        refillTimer -= Time.deltaTime;
        if (refillTimer <= 0) ReturnEggs();
    }
}
