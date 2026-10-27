using UnityEngine;
using TMPro;
using UnityEngine.UI;
namespace Playable.KeyboardEscape {
 public sealed class EscapeHUD:MonoBehaviour {
  public ScooterPlayer player;public TMP_Text[] speedLabels;
  public CanvasScaler scaler;
  public RectTransform speedFrame;
  private int lastWidth, lastHeight;
  private float previous=-1;
  public void ApplyLayout(int width,int height){lastWidth=width;lastHeight=height;if(scaler)scaler.referenceResolution=height>width?new Vector2(1080,1920):new Vector2(1920,1080);if(speedFrame)speedFrame.anchoredPosition=new Vector2(-110,160);}
  private void Update(){if(Screen.width!=lastWidth||Screen.height!=lastHeight)ApplyLayout(Screen.width,Screen.height);float value=player.maxSpeed*player.speedSlider.value;if(Mathf.Abs(value-previous)<.01f)return;previous=value;for(int i=0;i<speedLabels.Length;i++)speedLabels[i].text=i==1?"Max: "+player.maxSpeed.ToString("0.#"):value.ToString("0.#");}
 }
}
