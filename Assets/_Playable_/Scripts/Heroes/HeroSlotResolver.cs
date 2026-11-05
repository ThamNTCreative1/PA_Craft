using System;

namespace Playable
{
    public static class HeroSlotResolver
    {
        public static int[] Resolve(int[] requested, int heroCount)
        {
            const int slotCount = 4;
            if (heroCount < slotCount)
                throw new ArgumentOutOfRangeException(nameof(heroCount), "Four unique heroes require at least four available heroes.");

            var resolved = new int[slotCount];
            var used = new bool[heroCount];
            for (int slot = 0; slot < slotCount; slot++)
            {
                int hero = requested != null && slot < requested.Length ? requested[slot] : -1;
                if (hero < 0 || hero >= heroCount || used[hero])
                {
                    hero = 0;
                    while (used[hero]) hero++;
                }

                resolved[slot] = hero;
                used[hero] = true;
            }

            return resolved;
        }
    }
}
