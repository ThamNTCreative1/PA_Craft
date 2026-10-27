using UnityEngine;

public static class CraftHudStyle
{
    public static Rect SafeArea
    {
        get {
#if UNITY_LUNA
            return new Rect(0,0,Screen.width,Screen.height);
#else
            return Screen.safeArea;
#endif
        }
    }
    public static bool Hit(RectTransform rect,[Bridge.Ref] Vector2 position)
    {
        return rect!=null && rect.gameObject.activeInHierarchy &&
            RectTransformUtility.RectangleContainsScreenPoint(rect,position,null);
    }
}
