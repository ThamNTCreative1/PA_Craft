using UnityEngine;
using UnityEngine.UI;

public class ModelSwitcher : MonoBehaviour
{
    public HandPointerController handPointerController;
    public GameObject[] models; // 3 model
    public Button[] buttons;    // 3 button
public GameObject handPointer; // Đối tượng hình bàn tay
    void Start()
    {
        if (handPointerController == null && handPointer != null)
        {
            handPointerController = handPointer.GetComponentInParent<HandPointerController>();
        }

        if (handPointerController == null)
        {
            handPointerController = FindObjectOfType<HandPointerController>();
        }

        for (int i = 0; i < buttons.Length; i++)
        {
            int index = i; 
            buttons[i].onClick.AddListener(() => ShowModel(index));
            buttons[i].onClick.AddListener(CheckClick);
        }

    }

    public void ShowModel(int index)
    {
        for (int i = 0; i < models.Length; i++)
        {
            models[i].SetActive(i == index);
        }
    }

    public void CheckClick()
    {
        if (handPointerController != null)
        {
            handPointerController.StopAndResetSlotScales();
        }

        if (handPointer != null)
        {
            handPointer.SetActive(false);
        }
        
    }
}
