using UnityEngine;
namespace Playable.KeyboardEscape
{
    public sealed class EscapeHazard : MonoBehaviour
    {
        private void OnTriggerEnter(Collider other) { var p = other.GetComponent<ScooterPlayer>(); if (p) p.game.Hit(); }
    }
}
