namespace Playable.PetRescue
{
    public sealed class LunaController
    {
        private bool _ended;
        private bool _installRequested;
        private bool _endTimeInstallRequested;
        public void NotifyWin() { EndOnce(); }
        public void NotifyLose() { EndOnce(); }
        public void NotifyEndGame() { EndOnce(); }
        private void EndOnce()
        {
            if (_ended) return;
            _ended = true;
            Luna.Unity.LifeCycle.GameEnded();
        }
        public void OpenStoreFromGesture()
        {
            if (!_ended) return;
            _installRequested = true;
            Luna.Unity.Playable.InstallFullGame();
        }
        public void OpenStoreAtEndTime()
        {
            if (!_ended || _endTimeInstallRequested) return;
            _endTimeInstallRequested = true;
            _installRequested = true;
            Luna.Unity.Playable.InstallFullGame();
        }
        public void OpenStore()
        {
            if (!_ended || _installRequested) return;
            _installRequested = true;
            Luna.Unity.Playable.InstallFullGame();
        }
    }
}
