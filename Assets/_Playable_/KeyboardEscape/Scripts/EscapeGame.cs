using System.Collections;
using UnityEngine;
using TMPro;

namespace Playable.KeyboardEscape
{
    public sealed class EscapeGame : MonoBehaviour
    {
        public GameManager manager;
        public ScooterPlayer player;
        public TMP_Text hint;
        public TMP_Text countdown;
        public Transform home;
        public Transform cup;
        public ParticleSystem fireworks;
        public LineRenderer guide;
        public EscapeGiant[] giants;
        public EscapePickup[] helmets;
        public AudioSource sound;
        public AudioClip hurtSound;
        public Camera viewCamera;
        public EscapeCupProgress cupProgress;
        public bool IsRunning { get; private set; }
        public bool HasHelmet { get; private set; }
        public int TutorialStep { get; private set; }
        public int ReplaysUsed { get { return manager.ReplaysUsed; } }
        public EscapeTutorialHands tutorialHands;
        public EscapeLookInput lookInput;
        public Minigames.KeyboardEscape.Gameplay.KeyboardEscape_BallTrap[] balls;
        private bool dying, finished;
        private float immuneUntil;

        private void Start()
        {
            manager.CountdownExpired += TimeExpired;
            manager.GameplayEnded += StopPlay;
            manager.RetryRequested += RestartRound;
            player.canMove = false;
            hint.text = "Swipe camera";
            countdown.gameObject.SetActive(false);
            if (fireworks) fireworks.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            manager.BeginGameplay();
            StartCoroutine(Begin());
        }
        public void CameraSwiped()
        {
            if (TutorialStep != 0 || finished) return;
            TutorialStep = 1;
            hint.text = "Swipe to move";
        }
        public void MovementSwiped()
        {
            if (TutorialStep != 1 || finished) return;
            TutorialStep = 2;
            hint.gameObject.SetActive(false);
        }
        private IEnumerator Begin()
        {
            countdown.gameObject.SetActive(true);
            for (int i = 3; i > 0; i--)
            {
                if (finished || manager.HasEnded) yield break;
                countdown.text = i.ToString();
                yield return new WaitForSeconds(1f);
            }
            if (finished || manager.HasEnded) yield break;
            countdown.text = "Start";
            IsRunning = true;
            player.canMove = true;
            yield return new WaitForSeconds(0.7f);
            countdown.gameObject.SetActive(false);
        }
        private void Update()
        {
            if (guide && cup && !finished)
            {
                guide.positionCount = 2;
                guide.SetPosition(0, player.transform.position + Vector3.up * 0.1f);
                guide.SetPosition(1, cup.position);
            }
        }
        public void CollectHelmet(EscapePickup pickup)
        {
            if (!IsRunning || dying || finished || HasHelmet) return;
            HasHelmet = true;
            player.helmetIndicator.SetActive(true);
            pickup.gameObject.SetActive(false);
        }
        public void Hit(bool fell = false)
        {
            if (!IsRunning || dying || finished || Time.time < immuneUntil) return;
            if (HasHelmet && !fell)
            {
                HasHelmet = false;
                player.helmetIndicator.SetActive(false);
                // One impact can overlap several colliders on the same obstacle.
                immuneUntil = Time.time + 1f;
                return;
            }
            dying = true;
            player.canMove = false;
            HasHelmet = false;
            player.helmetIndicator.SetActive(false);
            if (sound && hurtSound) sound.PlayOneShot(hurtSound);
            StartCoroutine(Respawn());
        }
        private IEnumerator Respawn()
        {
            if (player.shatter) player.shatter.Burst();
            yield return new WaitForSeconds(1f);
            if (finished || manager.HasEnded)
            {
                if (player.shatter) player.shatter.Restore();
                player.visual.gameObject.SetActive(false);
                yield break;
            }
            if (player.shatter) player.shatter.Restore();
            player.visual.gameObject.SetActive(false);
            TimeExpired();
        }
        private void RestartRound()
        {
            StopAllCoroutines();
            finished = dying = false;
            HasHelmet = false;
            IsRunning = false;
            TutorialStep = 0;
            player.canMove = false;
            if (player.shatter) player.shatter.Restore();
            player.visual.gameObject.SetActive(true);
            player.Teleport(home.position, home.rotation);
            foreach (var giant in giants) giant.ResetPosition();
            foreach (var helmet in helmets) if (helmet) helmet.gameObject.SetActive(true);
            if (balls != null) foreach (var ball in balls) if (ball) ball.RestartRound();
            cup.gameObject.SetActive(true);
            if (guide) guide.enabled = true;
            if (fireworks) fireworks.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            if (cupProgress) cupProgress.ResetProgress();
            if (lookInput) lookInput.ResetView();
            if (tutorialHands) tutorialHands.enabled = true;
            player.helmetIndicator.SetActive(false);
            hint.text = "Swipe camera";
            hint.gameObject.SetActive(true);
            immuneUntil = Time.time + 0.5f;
            StartCoroutine(Begin());
        }
        public void CollectCup()
        {
            if (!IsRunning || dying || finished) return;
            finished = true;
            cup.gameObject.SetActive(false);
            player.canMove = false;
            IsRunning = false;
            if (guide) guide.enabled = false;
            manager.PlayWinSound();
            // Ends the existing timer before the celebration; CTA follows the effect.
            manager.EndGame();
            StartCoroutine(Celebrate());
        }
        private IEnumerator Celebrate()
        {
            yield return new WaitForSeconds(1.5f);
            manager.ShowCTA();
        }
        private void TimeExpired()
        {
            if (finished) return;
            finished = true;
            manager.ShowFailPanel();
        }
        private void StopPlay()
        {
            IsRunning = false;
            player.canMove = false;
            hint.gameObject.SetActive(false);
            countdown.gameObject.SetActive(false);
            player.helmetIndicator.SetActive(false);
        }
        private void OnDestroy()
        {
            if (manager == null) return;
            manager.CountdownExpired -= TimeExpired;
            manager.GameplayEnded -= StopPlay;
            manager.RetryRequested -= RestartRound;
        }
    }
}
