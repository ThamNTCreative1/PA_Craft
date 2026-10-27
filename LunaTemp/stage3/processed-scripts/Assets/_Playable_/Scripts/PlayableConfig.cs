using UnityEngine;

// Thông số nội bộ của playable. Các biến hiện trong Luna Playground nằm ở LunaController.
public class PlayableConfig : MonoBehaviour
{
    public static PlayableConfig I;

    [Header("Text")]
    public string chooseText = "CHOOSE YOUR FAVOURITE COLOR";
    public string moveHintText = "Move to find a spot!";
    public string lookHintText = "Swipe to look around!";
    public string selectHintText = "Tap to pick up a block";
    public string placeHintText = "Tap PLACE to build!";
    public string endText = "Build your dream house!";
    public string ctaText = "PLAY NOW";
    public string moveText = "MOVE";
    public int hideHintAfter = 3;

    [Header("Gameplay")]
    public float introDuration = 4f;
    public int placeCountToEnd = 8;
    public float timeToStore = 30f;
    public bool autoStoreOnEnd = false;

    [Header("Visual")]
    [Range(0.3f, 1.5f)] public float brightness = 1.1f;

    [Header("Audio")]
    public bool bgmOn = true;
    [Range(0f, 1f)] public float bgmVolume = 0.85f;
    public bool sfxOn = true;
    [Range(0f, 1f)] public float sfxVolume = 1f;
    public AudioClip bgmClip;

    [Header("NPC")]
    public int npcCount = 4;
    public float npcMinRadius = 4f;
    public float npcMaxRadius = 10f;
    public float npcSpeed = 1.3f;

    void Awake() { I = this; }
}
