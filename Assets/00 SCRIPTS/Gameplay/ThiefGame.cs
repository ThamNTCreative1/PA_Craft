using UnityEngine;

// What a Thief (player / bot) reports to: the game flow of the scene.
// HuntGameController (STSM Game: many nests + bots, survival timer) and GameController (STSM Steal Egg: ref flow).
public abstract class ThiefGame : MonoBehaviour
{
    // Run timer after stealing; survive it to keep the eggs (very large = no timer, the flow ends the run).
    public abstract float SurviveTime { get; }
    public abstract void OnSteal(Thief thief);
    public abstract void OnCaught(Thief thief);
    public abstract void OnEscaped(Thief thief);
}
