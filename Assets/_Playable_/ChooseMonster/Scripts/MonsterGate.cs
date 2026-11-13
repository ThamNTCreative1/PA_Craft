using UnityEngine;

namespace Playable.ChooseMonster
{
    /// <summary>Một cổng lựa chọn: cổng phép + con quái đứng trước cổng + thông tin hiển thị.</summary>
    [DisallowMultipleComponent]
    public sealed class MonsterGate : MonoBehaviour
    {
        [SerializeField] private MonsterActor _monster;
        [SerializeField] private PortalView _portal;
        [SerializeField] private Transform _labelAnchor;
        [SerializeField] private Sprite _portrait;
        [SerializeField] private int _level = 1;

        public MonsterActor Monster => _monster;
        public PortalView Portal => _portal;
        public Transform LabelAnchor => _labelAnchor;
        public Sprite Portrait => _portrait;
        public int Level => _level;
    }
}
