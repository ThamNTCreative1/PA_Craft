using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SoundChar : MonoBehaviour
{
    public AudioSource sound;
    public AudioClip[] idleSounds;
    public AudioClip[] atkSounds;
    public AudioClip[] takeDameSounds;
    public AudioClip[] deadSounds;
    public AudioClip[] moveSounds;
    public AudioClip[] jumpSounds;
    
    public void PlayIdleSound()
    {
        if (idleSounds.Length==0)
        {
            return;
        }
        var a = Random.Range(0, 30);
        if (a<5)
        {
            sound.clip = idleSounds[Random.Range(0, idleSounds.Length)];
            sound.Play();
        }
    }
    public void PlayAttackSound()
    {
        if (atkSounds.Length==0)
        {
            return;
        }
        sound.clip = atkSounds[Random.Range(0, atkSounds.Length)];
        sound.Play();
    }
    public void PlayTakeDameSound()
    {
        if (takeDameSounds.Length==0)
        {
            return;
        }
        sound.clip = takeDameSounds[Random.Range(0, takeDameSounds.Length)];
        sound.Play();
    }
    public void PlayDeadSound()
    {
        if (deadSounds.Length==0)
        {
            return;
        }
        sound.clip = deadSounds[Random.Range(0, deadSounds.Length)];
        sound.Play();
    }
    public void PlayMoveSound()
    {
        if (moveSounds.Length==0)
        {
            return;
        }
        sound.clip = moveSounds[Random.Range(0, moveSounds.Length)];
        sound.Play();
    }
    public void PlayJumpSound()
    {
        if (jumpSounds.Length==0)
        {
            return;
        }
        sound.clip = jumpSounds[Random.Range(0, jumpSounds.Length)];
        sound.Play();
    }
}
