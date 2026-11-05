using UnityEngine;

namespace Playable
{
    public sealed class LunaController : MonoBehaviour
    {
        private bool _gameEnded;

        private void Awake()
        {
            LunaServices.Register(this);
        }

        public void NotifyGameEnded()
        {
            if (_gameEnded) return;
            _gameEnded = true;
            Luna.Unity.LifeCycle.GameEnded();
        }

        public void InstallFullGame()
        {
            Luna.Unity.Playable.InstallFullGame();
        }

        private void OnDestroy()
        {
            LunaServices.Unregister(this);
        }
    }
}
