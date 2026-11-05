using System;
using DG.Tweening;
using UnityEngine;

namespace Playable
{
    public class AuraUI : MonoBehaviour
    {
        private void Start()
        {
            transform.DORotate(new Vector3(0, 0, 180), 1.5f).SetEase(Ease.Linear).SetLoops(-1, LoopType.Restart);
        }
    }
}