using UnityEngine;

namespace Playable
{
    [DefaultExecutionOrder(150)]
    public sealed class MonsterHeroFlowController : MonoBehaviour
    {
        private enum Phase { HeroSelect, Tutorial, Combat, Ended }
        [SerializeField] private HeroRoster _roster;
        [SerializeField] private HeroSelectionPanel _selection;
        [SerializeField] private PlayerSkinSwitcher _skins;
        [SerializeField] private PlayerController _player;
        [SerializeField] private TouchController _touch;
        [SerializeField] private PlayerPaintballController _weapon;
        [SerializeField] private CameraController _camera;
        [SerializeField] private CombatTutorialController _tutorial;
        [SerializeField] private MonsterController _monster;
        [SerializeField] private PlayerHealth _health;
        [SerializeField] private GameManager _game;
        [SerializeField] private GameObject _objective, _hud;
        private Phase _phase;
        private void OnEnable()
        {
            _selection.HeroChosen += OnHeroChosen;
            _tutorial.Completed += OnTutorialCompleted;
            _monster.Defeated += OnMonsterDefeated;
            _health.Died += OnPlayerDied;
            _game.Ended += OnEnded;
        }
        private void OnDisable()
        {
            _selection.HeroChosen -= OnHeroChosen;
            _tutorial.Completed -= OnTutorialCompleted;
            _monster.Defeated -= OnMonsterDefeated;
            _health.Died -= OnPlayerDied;
            _game.Ended -= OnEnded;
        }
        private void Start()
        {
            if (_game.IsEnded) { OnEnded(); return; }
            _phase = Phase.HeroSelect;
            _player.IsWorking = false;
            _player.enabled = false;
            _touch.gameObject.SetActive(false);
            _hud.SetActive(false);
            _objective.SetActive(false);
            _tutorial.Cancel();
            var direction = _monster.AimPoint.position - _player.transform.position;
            direction.y = 0f;
            _player.transform.rotation = Quaternion.LookRotation(direction);
            SolveInitialAim();
            var ids = _roster.ResolveSlots();
            var entries = new HeroRoster.HeroEntry[4];
            for (int i = 0; i < 4; i++)
                if (!_roster.TryGet((HeroId)ids[i], out entries[i]))
                {
                    Debug.LogError("Missing configured hero " + ids[i], this);
                    return;
                }
            _selection.Show(entries);
        }
        private void OnHeroChosen(HeroId id)
        {
            if (_phase != Phase.HeroSelect || _game.IsEnded || !_skins.Apply(id)) return;
            _selection.Hide();
            _player.enabled = true;
            _weapon.Equip();
            _phase = Phase.Tutorial;
            SolveInitialAim();
            _objective.SetActive(true);
            _tutorial.Begin();
        }
        private void SolveInitialAim()
        {
            Canvas.ForceUpdateCanvases();
            // Equip changes shoulder framing before the next camera LateUpdate.
            _camera.SetEntryAngles(_camera.Yaw, _camera.Pitch);
            for (int i = 0; i < 6; i++)
            {
                Ray ray;
                if (!_weapon.TryGetAimRay(out ray))
                {
                    Debug.LogWarning("Initial aim needs the weapon crosshair, Canvas and camera.", this);
                    return;
                }
                Vector3 desired = _monster.AimPoint.position - ray.origin;
                if (desired.sqrMagnitude < 0.0001f) return;
                if (Vector3.Angle(ray.direction, desired) <= 0.1f) return;
                float yaw = Mathf.DeltaAngle(
                    Mathf.Atan2(ray.direction.x, ray.direction.z) * Mathf.Rad2Deg,
                    Mathf.Atan2(desired.x, desired.z) * Mathf.Rad2Deg);
                float currentElevation = Mathf.Atan2(ray.direction.y,
                    new Vector2(ray.direction.x, ray.direction.z).magnitude) * Mathf.Rad2Deg;
                float desiredElevation = Mathf.Atan2(desired.y,
                    new Vector2(desired.x, desired.z).magnitude) * Mathf.Rad2Deg;
                _camera.SetEntryAngles(_camera.Yaw + yaw, _camera.Pitch + currentElevation - desiredElevation);
            }
            Ray finalRay;
            if (_weapon.TryGetAimRay(out finalRay) &&
                Vector3.Angle(finalRay.direction, _monster.AimPoint.position - finalRay.origin) > 1f)
                Debug.LogWarning("Initial aim did not converge within camera limits.", this);
        }

        private void OnTutorialCompleted()
        {
            if (_phase != Phase.Tutorial || _game.IsEnded) return;
            _phase = Phase.Combat;
            _health.SetInvulnerable(false);
            _monster.Activate(_health);
        }
        private void OnMonsterDefeated() { _game.EndWithWin(); }
        private void OnPlayerDied() { _game.EndWithLose(); }
        private void OnEnded()
        {
            if (_phase == Phase.Ended) return;
            _phase = Phase.Ended;
            _tutorial.Cancel();
            _selection.Hide();
            _monster.Freeze();
            _health.SetInvulnerable(true);
            _weapon.SetPaused(true);
            _player.IsWorking = false;
            _player.enabled = false;
            _touch.gameObject.SetActive(false);
            _hud.SetActive(false);
            _objective.SetActive(false);
        }
    }
}
