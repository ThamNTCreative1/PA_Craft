using TMPro;
using UnityEngine;

namespace Minigames.StealAnEgg.GamePlay
{
    public class SAE_IncubateTimeDisplayment : MonoBehaviour
    {
        [SerializeField] TextMeshPro content;
        
        public void SetHeight(float height)
        {
            content.transform.localPosition = new Vector3(0, height, 0);
        }

        public void SetScale(float scale)
        {
            transform.localScale = new Vector3(scale, scale, scale);
        }

        public void SetTime(int timeSeconds)
        {
            int hours = timeSeconds / 3600;
            int minutes = (timeSeconds - hours * 3600) / 60;
            int seconds = timeSeconds - (hours * 3600) - (minutes * 60);
            content.text = hours > 0 ?$"{hours}h:{minutes}m" : (minutes > 0? $"{minutes}m:{seconds}s" : $"{seconds}s");
        }
    }
}


