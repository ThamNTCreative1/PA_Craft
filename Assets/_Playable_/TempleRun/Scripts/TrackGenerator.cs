using System.Collections.Generic;
using UnityEngine;

namespace Playable.TempleRun
{
    /// <summary>
    /// Endless track: recycles the map segments in order (they come from one continuous
    /// stretch of the Steal an Egg map so every joint lines up), spawns obstacle rows and coins,
    /// and shifts everything back to the origin from time to time (floating origin).
    /// </summary>
    public class TrackGenerator : MonoBehaviour
    {
        private const int Empty = 0;
        private const int Low = 1;
        private const int Tall = 2;
        private const int Plat = 3;

        [Header("Prefabs")]
        public TrackSegment[] segmentPrefabs;
        public RunnerObstacle lowPrefab;
        public RunnerObstacle tallPrefab;
        public RunnerObstacle platformPrefab;
        public RunnerCoin coinPrefab;

        [Header("Refs")]
        public RunnerPlayer player;
        public RunnerCamera runnerCamera;
        public RunnerChaser chaser;

        [Header("Track")]
        public float laneOffset = 2.6f;
        public int startSegmentIndex = 0;
        [Tooltip("Where the first segment starts (player starts at z = 0).")]
        public float startSegmentZ = -6f;
        public float spawnAhead = 150f;
        public float despawnBehind = 30f;
        public float originShiftDistance = 300f;

        [Header("Obstacles")]
        public float firstRowZ = 40f;
        public float maxRowGap = 22f;
        public float minRowGap = 12f;
        [Tooltip("Distance (m) at which difficulty reaches its maximum.")]
        public float difficultyDistance = 700f;

        [Header("Coins")]
        public float coinHeight = 0.9f;
        public float coinSpacing = 1.8f;

        [Tooltip("False = no obstacles or coins are spawned during the tutorial.")]
        public bool obstaclesEnabled = true;

        public readonly List<RunnerObstacle> ActiveObstacles = new List<RunnerObstacle>();
        public readonly List<RunnerCoin> ActiveCoins = new List<RunnerCoin>();

        private readonly List<TrackSegment> _activeSegments = new List<TrackSegment>();
        private List<TrackSegment>[] _segmentPool;
        private readonly List<RunnerObstacle>[] _obstaclePool =
            { new List<RunnerObstacle>(), new List<RunnerObstacle>(), new List<RunnerObstacle>() };
        private readonly List<RunnerCoin> _coinPool = new List<RunnerCoin>();

        private int _nextSegmentIndex;
        private float _nextSegmentZ;
        private float _nextRowZ;
        private float _shiftTotal;
        private bool _initialized;
        private readonly int[] _lanes = new int[3];

        /// <summary>Total distance from the start, independent of origin shifts.</summary>
        public float TravelledDistance
        {
            get { return player != null ? player.transform.position.z + _shiftTotal : 0f; }
        }


        public void ResetRun()
        {
            foreach (var seg in _activeSegments) seg.gameObject.SetActive(false);
            _activeSegments.Clear();
            foreach (var pool in _obstaclePool)
                foreach (var obstacle in pool) obstacle.gameObject.SetActive(false);
            foreach (var coin in _coinPool) coin.gameObject.SetActive(false);
            ActiveCoins.Clear();
            ActiveObstacles.Clear();
            _shiftTotal = 0f;
            obstaclesEnabled = false;
            int n = segmentPrefabs.Length;
            int prev = (startSegmentIndex - 1 + n) % n;
            _nextSegmentIndex = prev;
            _nextSegmentZ = startSegmentZ - segmentPrefabs[prev].length;
            _nextRowZ = firstRowZ;
            UpdateTrack();
        }

        public void Init()
        {
            if (_initialized) return;
            _initialized = true;
            int n = segmentPrefabs != null ? segmentPrefabs.Length : 0;
            _segmentPool = new List<TrackSegment>[n];
            for (int i = 0; i < n; i++) _segmentPool[i] = new List<TrackSegment>();

            if (n == 0)
            {
                Debug.LogError("[TempleRun] TrackGenerator has no segment prefabs.");
                return;
            }

            for (int i = 0; i < n; i++)
            {
                if (segmentPrefabs[i] == null || segmentPrefabs[i].length <= 0f)
                {
                    Debug.LogError("[TempleRun] Segment prefab " + i + " is missing or has length <= 0.");
                    segmentPrefabs = new TrackSegment[0];
                    return;
                }
            }

            minRowGap = Mathf.Max(minRowGap, 4f);
            maxRowGap = Mathf.Max(maxRowGap, minRowGap);

            // Put the segment before the start one behind the camera.
            int prev = (startSegmentIndex - 1 + n) % n;
            _nextSegmentIndex = prev;
            _nextSegmentZ = startSegmentZ - segmentPrefabs[prev].length;
            _nextRowZ = firstRowZ;
            UpdateTrack();
        }

        private void Update()
        {
            // Init() is called by the game manager (after it sets obstaclesEnabled)
            if (_initialized) UpdateTrack();
        }

        private void UpdateTrack()
        {
            if (player == null || segmentPrefabs == null || segmentPrefabs.Length == 0) return;
            float pz = player.transform.position.z;

            while (_nextSegmentZ < pz + spawnAhead) SpawnNextSegment();
            if (obstaclesEnabled)
            {
                while (_nextRowZ < pz + spawnAhead - 10f)
                    _nextRowZ = SpawnRow(_nextRowZ);
            }
            else
            {
                // Keep the first gameplay row ahead, even after a long tutorial.
                _nextRowZ = Mathf.Max(_nextRowZ, pz + Mathf.Max(18f, maxRowGap));
            }

            RecycleBehind(pz - despawnBehind);

            if (pz > originShiftDistance) ShiftOrigin(-pz);
        }

        #region Segments

        private void SpawnNextSegment()
        {
            int idx = _nextSegmentIndex;
            TrackSegment seg = GetSegment(idx);
            seg.transform.position = new Vector3(0f, 0f, _nextSegmentZ);
            seg.gameObject.SetActive(true);
            _activeSegments.Add(seg);
            _nextSegmentZ += segmentPrefabs[idx].length;
            _nextSegmentIndex = (idx + 1) % segmentPrefabs.Length;
        }

        private TrackSegment GetSegment(int idx)
        {
            List<TrackSegment> pool = _segmentPool[idx];
            for (int i = 0; i < pool.Count; i++)
            {
                if (!pool[i].gameObject.activeSelf) return pool[i];
            }

            TrackSegment s = Instantiate(segmentPrefabs[idx], transform);
            s.poolIndex = idx;
            pool.Add(s);
            return s;
        }

        #endregion

        #region Rows

        private float SpawnRow(float z)
        {
            float d = Mathf.Clamp01((z + _shiftTotal) / Mathf.Max(1f, difficultyDistance));
            PickPattern(d);

            bool hasPlatform = false;
            float platformLength = platformPrefab != null ? platformPrefab.size.z : 7f;
            for (int i = 0; i < 3; i++)
            {
                float x = (i - 1) * laneOffset;
                switch (_lanes[i])
                {
                    case Low:
                        SpawnObstacle(ObstacleKind.Low, new Vector3(x, 0f, z));
                        break;
                    case Tall:
                        SpawnObstacle(ObstacleKind.Tall, new Vector3(x, 0f, z));
                        break;
                    case Plat:
                        hasPlatform = true;
                        SpawnObstacle(ObstacleKind.Platform, new Vector3(x, 0f, z + platformLength * 0.5f));
                        break;
                }
            }

            SpawnCoinsForRow(z, platformLength);

            float gap = Mathf.Lerp(maxRowGap, minRowGap, d) + Random.Range(0f, 3f);
            if (hasPlatform) gap += platformLength;
            return z + gap;
        }

        // A short coin run followed by the only obstacle allowed during tutorial.
        public void SpawnJumpTutorialRow(float startZ, float barrierZ)
        {
            for (int lane = -1; lane <= 1; lane++)
            {
                float x = lane * laneOffset;
                if (coinPrefab != null)
                    for (float z = startZ + 4f; z < barrierZ - 8f; z += Mathf.Max(0.5f, coinSpacing))
                        SpawnCoin(new Vector3(x, coinHeight, z));
                SpawnObstacle(ObstacleKind.Low, new Vector3(x, 0f, barrierZ));
            }
            _nextRowZ = barrierZ + Mathf.Max(18f, maxRowGap);
        }

        private void PickPattern(float d)
        {
            for (int i = 0; i < 3; i++) _lanes[i] = Empty;
            int r = Random.Range(0, 3);
            int r2 = (r + Random.Range(1, 3)) % 3; // a different lane
            int r3 = 3 - r - r2;                    // the remaining lane

            float[] w =
            {
                1.0f - 0.6f * d, // 0 single low
                1.0f - 0.5f * d, // 1 single tall
                0.35f + 0.4f * d, // 2 low across all lanes
                0.15f + 0.85f * d, // 3 two talls, one free lane
                0.2f + 0.8f * d, // 4 tall + low + free
                0.3f + 0.5f * d, // 5 platform + tall
                0.2f + 0.6f * d, // 6 platform + lows
                0.1f + 0.7f * d  // 7 two lows + tall
            };
            float sum = 0f;
            for (int i = 0; i < w.Length; i++) sum += w[i];
            float pick = Random.value * sum;
            int p = 0;
            for (; p < w.Length - 1; p++)
            {
                pick -= w[p];
                if (pick <= 0f) break;
            }

            switch (p)
            {
                case 0: _lanes[r] = Low; break;
                case 1: _lanes[r] = Tall; break;
                case 2: _lanes[0] = Low; _lanes[1] = Low; _lanes[2] = Low; break;
                case 3: _lanes[r2] = Tall; _lanes[r3] = Tall; break;
                case 4: _lanes[r2] = Tall; _lanes[r3] = Low; break;
                case 5: _lanes[r] = Plat; _lanes[r2] = Tall; break;
                case 6: _lanes[r] = Plat; _lanes[r2] = Low; _lanes[r3] = Low; break;
                default: _lanes[r] = Tall; _lanes[r2] = Low; _lanes[r3] = Low; break;
            }
        }

        private void SpawnCoinsForRow(float z, float platformLength)
        {
            if (coinPrefab == null) return;

            // Prefer coins on top of a platform, then an arc over a low barrier, then a line in a free lane.
            int lane = -1;
            int kind = Empty;
            for (int pass = 0; pass < 3 && lane < 0; pass++)
            {
                int want = pass == 0 ? Plat : (pass == 1 ? Low : Empty);
                int start = Random.Range(0, 3);
                for (int k = 0; k < 3; k++)
                {
                    int i = (start + k) % 3;
                    if (_lanes[i] == want)
                    {
                        lane = i;
                        kind = want;
                        break;
                    }
                }
            }

            if (lane < 0 || Random.value < 0.15f) return;
            float x = (lane - 1) * laneOffset;

            if (kind == Plat)
            {
                float top = platformPrefab != null ? platformPrefab.size.y : 1.2f;
                for (float cz = z + 1f; cz < z + platformLength - 0.5f; cz += coinSpacing)
                    SpawnCoin(new Vector3(x, top + coinHeight, cz));
            }
            else if (kind == Low)
            {
                // Follows the jump arc of the player.
                for (int i = -3; i <= 3; i++)
                {
                    float cz = z + i * 1.1f;
                    float t = i / 3.5f;
                    float h = coinHeight + 1.5f * (1f - t * t);
                    SpawnCoin(new Vector3(x, h, cz));
                }
            }
            else
            {
                for (int i = 0; i < 5; i++)
                    SpawnCoin(new Vector3(x, coinHeight, z - 8f + i * coinSpacing));
            }
        }

        private void SpawnObstacle(ObstacleKind kind, Vector3 pos)
        {
            RunnerObstacle prefab = kind == ObstacleKind.Low ? lowPrefab : (kind == ObstacleKind.Tall ? tallPrefab : platformPrefab);
            if (prefab == null) return;
            List<RunnerObstacle> pool = _obstaclePool[(int)kind];
            RunnerObstacle ob = null;
            for (int i = 0; i < pool.Count; i++)
            {
                if (!pool[i].gameObject.activeSelf)
                {
                    ob = pool[i];
                    break;
                }
            }

            if (ob == null)
            {
                ob = Instantiate(prefab, transform);
                ob.poolIndex = (int)kind;
                pool.Add(ob);
            }

            ob.transform.position = pos;
            ob.gameObject.SetActive(true);
            ActiveObstacles.Add(ob);
        }

        private void SpawnCoin(Vector3 pos)
        {
            RunnerCoin c = null;
            for (int i = 0; i < _coinPool.Count; i++)
            {
                if (!_coinPool[i].gameObject.activeSelf)
                {
                    c = _coinPool[i];
                    break;
                }
            }

            if (c == null)
            {
                c = Instantiate(coinPrefab, transform);
                _coinPool.Add(c);
            }

            c.Place(pos);
            c.gameObject.SetActive(true);
            ActiveCoins.Add(c);
        }

        public void CollectCoin(RunnerCoin coin, Transform collector)
        {
            ActiveCoins.Remove(coin);
            coin.Collect(collector); // plays a short pop, then deactivates itself (back to the pool)
        }

        #endregion

        #region Recycling / reset

        private void RecycleBehind(float z)
        {
            for (int i = _activeSegments.Count - 1; i >= 0; i--)
            {
                TrackSegment s = _activeSegments[i];
                if (s.EndZ < z)
                {
                    s.gameObject.SetActive(false);
                    _activeSegments.RemoveAt(i);
                }
            }

            for (int i = ActiveObstacles.Count - 1; i >= 0; i--)
            {
                RunnerObstacle o = ActiveObstacles[i];
                if (o.Max.z < z)
                {
                    o.gameObject.SetActive(false);
                    ActiveObstacles.RemoveAt(i);
                }
            }

            for (int i = ActiveCoins.Count - 1; i >= 0; i--)
            {
                RunnerCoin c = ActiveCoins[i];
                if (c.transform.position.z < z)
                {
                    c.gameObject.SetActive(false);
                    ActiveCoins.RemoveAt(i);
                }
            }
        }

        /// <summary>Removes obstacles in [fromZ, toZ] (used when the player continues after a crash).</summary>
        public void ClearObstacles(float fromZ, float toZ)
        {
            for (int i = ActiveObstacles.Count - 1; i >= 0; i--)
            {
                RunnerObstacle o = ActiveObstacles[i];
                if (o.Max.z >= fromZ && o.Min.z <= toZ)
                {
                    o.gameObject.SetActive(false);
                    ActiveObstacles.RemoveAt(i);
                }
            }

            if (_nextRowZ < toZ && toZ < 1e6f) _nextRowZ = toZ;
        }

        private void ShiftOrigin(float dz)
        {
            Vector3 d = new Vector3(0f, 0f, dz);
            for (int i = 0; i < _activeSegments.Count; i++) _activeSegments[i].transform.position += d;
            for (int i = 0; i < ActiveObstacles.Count; i++) ActiveObstacles[i].transform.position += d;
            // every visible coin, including the ones playing their collect animation
            for (int i = 0; i < _coinPool.Count; i++)
            {
                if (_coinPool[i].gameObject.activeSelf) _coinPool[i].ShiftZ(dz);
            }

            player.ShiftZ(dz);
            if (runnerCamera != null) runnerCamera.ShiftZ(dz);
            if (chaser != null) chaser.ShiftZ(dz);
            if (RunnerGameManager.Instance != null) RunnerGameManager.Instance.ShiftZ(dz);
            _nextSegmentZ += dz;
            _nextRowZ += dz;
            _shiftTotal -= dz;
        }

        #endregion
    }
}
