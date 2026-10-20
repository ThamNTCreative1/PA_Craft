using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class GameController : MonoBehaviour
    {
        public enum RunState { Moving, Drawing, Aiming, Firing, Ended }
        [SerializeField] private GameManager _gameManager;
        [SerializeField] private PlayerAction _playerAction;
        [SerializeField] private FirstPersonWeapon _weapon;
        [SerializeField] private MonsterPlayableUI _ui;
        [SerializeField] private Animator _monster;
        [SerializeField] private EncounterEffects _effects;
        public RunState State { get; private set; }
        public int ShotsFired { get; private set; }
        private Tween _ctaDelay;
        private Tween _hurtDelay;
        private void Start()
        {
            _monster.enabled = true;
            _monster.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            _monster.speed = 1f;
            _monster.applyRootMotion = false;
            _monster.Play("Idle", 0, 0f);
            State=RunState.Moving;
            _ui.Hide(); _weapon.SetWalking(true);
            if (_effects) _effects.BeginRun();
            _playerAction.EnterCave(() => {
                    State=RunState.Drawing; _weapon.SetWalking(false);
                    _ui.Show();
                    if (_effects) _effects.Encounter();
                    _weapon.Draw(() => { State=RunState.Aiming; });
                });
        }
        private void Update()
        {
            if(State!=RunState.Aiming && State!=RunState.Firing) return;
            // Do not count the mouse event emulated by the same touch a second time.
            if(Input.touchCount>0)
            {
                for(int i=0;i<Input.touchCount;i++)
                    if(Input.GetTouch(i).phase==TouchPhase.Began) { TryFire(); break; }
            }
            else if(Input.GetMouseButtonDown(0)) TryFire();
        }
        public void TryFire()
        {
            if(State!=RunState.Aiming && State!=RunState.Firing) return;
            State=RunState.Firing; ShotsFired++; _ui.HideTutorial();
            bool finalShot=ShotsFired==3;
            _hurtDelay?.Kill();
            _monster.Play("Hurt",0,0f);
            _hurtDelay = DOVirtual.DelayedCall(0.7f, () =>
            {
                _monster.Play("Idle",0,0f);
                if (!finalShot) return;
                _gameManager.EndGame();
                _ctaDelay = DOVirtual.DelayedCall(1f, _gameManager.ShowCTA);
            });
            if (_effects) _effects.Shot();
            _weapon.Fire(() => { if(State!=RunState.Ended) State=RunState.Aiming; });
            if(!finalShot) return;
            State=RunState.Ended; _ui.Hide();
        }
        private void OnDestroy() { _ctaDelay?.Kill(); _hurtDelay?.Kill(); }
    }
}
