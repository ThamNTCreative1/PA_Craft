using UnityEngine;

namespace ClimbJump
{
    public interface IShow
    {
        void Initialize();
        void OnUpdate();
        void OnTrigger();
        void OnExit();
    }
}
