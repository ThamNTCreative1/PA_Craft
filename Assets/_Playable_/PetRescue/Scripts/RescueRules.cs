using System;

namespace Playable.PetRescue
{
    public sealed class RescueRules
    {
        public enum Phase { Waiting, Running, Won, Lost }
        public enum PetState { Following, Lost, Rescued }
        private readonly PetState[] _pets;
        private readonly float _duration;
        private readonly int _required;
        public Phase State { get; private set; }
        public float Elapsed { get; private set; }
        public float Remaining => Math.Max(0f, _duration - Elapsed);
        public int Rescued { get; private set; }
        public int Alive { get; private set; }

        public RescueRules(float duration, int required, int petCount)
        {
            if (duration <= 0 || required <= 0 || petCount < required)
                throw new ArgumentOutOfRangeException("Invalid rescue configuration");
            _duration = duration;
            _required = required;
            _pets = new PetState[petCount];
            Alive = petCount;
        }

        public void Start() { if (State == Phase.Waiting) State = Phase.Running; }
        public void Tick(float delta)
        {
            if (delta < 0) throw new ArgumentOutOfRangeException(nameof(delta));
            if (State != Phase.Running) return;
            Elapsed = Math.Min(_duration, Elapsed + delta);
            if (Elapsed >= _duration) State = Phase.Lost;
        }

        public PetState GetPetState(int id) { Validate(id); return _pets[id]; }
        public bool LosePet(int id)
        {
            Validate(id);
            if (State != Phase.Running || _pets[id] != PetState.Following) return false;
            _pets[id] = PetState.Lost;
            Alive--;
            return true;
        }

        public bool RescuePet(int id)
        {
            Validate(id);
            if (State != Phase.Running || _pets[id] != PetState.Following) return false;
            _pets[id] = PetState.Rescued;
            Rescued++;
            if (Rescued >= _required) State = Phase.Won;
            return true;
        }

        private void Validate(int id)
        {
            if (id < 0 || id >= _pets.Length) throw new ArgumentOutOfRangeException(nameof(id));
        }
    }
}
