using UnityEngine;
using UnityEngine.UI;

// One zone row of the Monster Index; its pet cells are cloned from petTemplate into petContent.
public class IndexZoneView : MonoBehaviour
{
    public TMPro.TMP_Text zoneName, progress;
    public Image thumbnail, progressFill;
    public Transform petContent;
    public IndexPetCellView petTemplate;
}
