using UnityEngine;

// Receiver for the "Hide" animation event at the end of the Hide clip (Text (TMP).controller: RunMessage,
// TimerSurvival...). Same as the source MessageView: the message object switches off when its hide animation ends.
public class MessageView : MonoBehaviour
{
    public void Hide()
    {
        gameObject.SetActive(false);
    }
}
