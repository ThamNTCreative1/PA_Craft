using UnityEngine;

// Intro (~4s): nhân vật đứng trước camera ~0.8s, quay lưng, đi về phía xa (giống ref).
public class IntroSequence : MonoBehaviour
{
    public CharacterWalker hero;
    public Transform cameraPose;     // vị trí camera trong intro
    public Transform heroStart;      // nhân vật đứng đây, quay mặt về camera
    public float faceTime = 0.8f;
    public float turnTime = 0.3f;
    public float walkSpeedMultiplier = 1.3f;
    public float walkDistance = 5f;

    float t; bool turned, walking;
    public bool Running { get; private set; }

    public void Play(Camera cam)
    {
        Running = true; t = 0f; turned = walking = false;
        cam.transform.SetParent(null);
        cam.transform.SetPositionAndRotation(cameraPose.position, cameraPose.rotation);
        hero.transform.SetPositionAndRotation(heroStart.position, heroStart.rotation);
        hero.Stop();
        hero.speedMultiplier = 1f;
    }

    void Update()
    {
        if (!Running) return;
        t += Time.deltaTime;
        if (!turned && t >= faceTime)
        {
            turned = true;
            hero.FaceTowards(hero.transform.position - (cameraPose.position - hero.transform.position));
        }
        if (!walking && t >= faceTime + turnTime)
        {
            walking = true;
            Vector3 away = hero.transform.position - cameraPose.position; away.y = 0; away.Normalize();
            hero.speedMultiplier = walkSpeedMultiplier;
            hero.MoveTo(hero.transform.position + away * walkDistance);
        }
    }

    public void Finish() { Running = false; hero.speedMultiplier = 1f; }
}
