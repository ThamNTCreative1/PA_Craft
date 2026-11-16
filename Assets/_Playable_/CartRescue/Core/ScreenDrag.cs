namespace Playable.CartRescue.Core
{
    /// <summary>
    /// Đổi quãng kéo ngón tay (pixel) thành quãng world theo camera trực giao, KHÔNG phụ thuộc vị trí camera —
    /// camera bám xe (màn dọc) sẽ không biến cú kéo thành "cần điều khiển".
    /// </summary>
    public static class ScreenDrag
    {
        public static float WorldX(float startWorldX, float startScreenX, float screenX, float orthoSize, float screenHeight)
        {
            if (screenHeight <= 0f) return startWorldX;
            return startWorldX + (screenX - startScreenX) * 2f * orthoSize / screenHeight;
        }
    }
}
