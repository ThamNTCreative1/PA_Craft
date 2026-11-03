using Minigames.StealAnEgg.Data;
using System;
using System.Collections;
using UnityEngine;

namespace Minigames.StealAnEgg.GamePlay
{
    // Ported from steal-an-egg-main; coop/inventory/save/tracking dependencies removed for the playable.
    public class SAE_Egg : MonoBehaviour
    {
        [SerializeField] private string id = Guid.NewGuid().ToString();
        [SerializeField] private string eggName;
        [SerializeField] private Sprite thumbnail;
        [SerializeField] private float incubateTimeBase;
        [SerializeField] private float baseWeight = 1;

        [SerializeField] private SAE_MonsterSizeDataSO sizeData;
        [SerializeField] private Monster[] monsters;
        [SerializeField] private GameObject highlight;

        [Header("Collider")]
        [SerializeField] private float baseRadius;
        [SerializeField] private SphereCollider _sphereCollider;
        [SerializeField] private MeshRenderer _renderer;

        [Header("HacthSetup")]
        [SerializeField] private float hatchDuration;
        [SerializeField] private float hatchNoiseStrength;
        [SerializeField] private AnimationCurve hatchNoiseCurve;

        [HideInInspector] public string uniqueId;

        private Vector2 displaymentSizeRange = new Vector2(1f, 6);
        private float sizeMultiplier = 1;
        private bool keepScale;
        private float petScale = 1f;
        private Coroutine HandleHatchEggCoroutine;

        public float EggWeight => incubateTimeBase;
        public float IncubateTime => incubateTimeBase;
        public float calculatedIncubateTime => incubateTimeBase;
        public Monster[] Monsters => monsters;
        public bool IsHatching => HandleHatchEggCoroutine != null;
        public string Id => id;
        public string EggName { get { return eggName; } set { eggName = value; } }
        public Sprite Thumbnail { get { return thumbnail; } set { thumbnail = value; } }
        public float SizeMultiplier => sizeMultiplier;
        /// <summary>Extra pet scale so the pet matches an egg shown bigger/smaller than its prefab.</summary>
        public float PetScale { get => petScale; set => petScale = value; }
        public Bounds Bound => _renderer.bounds;
        public MeshRenderer Renderer { get { return _renderer; } set { _renderer = value; } }
        public SAE_MonsterSizeDataSO SizeData => sizeData;
        public RarityType RarityType
        {
            get
            {
                // Null-safe: in Luna a prefab reference / preset can come back empty.
                if (monsters == null || monsters.Length == 0 || monsters[0] == null || monsters[0].obj == null)
                    return default(RarityType);
                var monster = monsters[0].obj.GetComponent<SAE_Monster>();
                return monster != null ? monster.RarityType : default(RarityType);
            }
        }

#if UNITY_EDITOR
        [ContextMenu("GenerateID")]
        public void GenerateID()
        {
            id = Guid.NewGuid().ToString();
        }
#endif
        private void Start()
        {
            ShowHighlight(false);
            if (!keepScale) HandleScale();
        }

        /// <summary>Keep the scale set from outside (e.g. the size of the stolen egg) instead of the size-based one.</summary>
        public void KeepCurrentScale() => keepScale = true;
        public bool KeepsScale => keepScale;

        private void HandleScale()
        {
            float scale = Mathf.Clamp(sizeMultiplier / 5, displaymentSizeRange.x, displaymentSizeRange.y);
            transform.localScale = new Vector3(scale, scale, scale);
        }

        public void ShowHighlight(bool state)
        {
            if (HandleHatchEggCoroutine != null && state) return;

            if (highlight)
                highlight.SetActive(state);
        }

        /// <summary>Wobbles the egg, breaks it and spawns the pet. onHatched receives the spawned pet.</summary>
        public void RunHatch(Action<SAE_Monster> onHatched = null)
        {
            if (HandleHatchEggCoroutine != null) return;

            ShowHighlight(false);

            HandleHatchEggCoroutine = StartCoroutine(HandleHacth(() =>
            {
                SAE_Monster pet = CreatePet();

                var pool = SAE_EggBreakPool.instance;
                if (pool != null)
                {
                    pool.PlayEggCompletedSound();
                    var eggBreak = pool.GetAvailableObject();
                    if (eggBreak)
                    {
                        eggBreak.transform.position = transform.position;
                        eggBreak.transform.localScale = transform.localScale;
                        eggBreak.SetActive(true);
                    }
                }

                var incubateHandler = GetComponent<SAE_IncubateEggHandler>();
                if (incubateHandler != null) incubateHandler.OnDestroyByHatchCompleted();

                onHatched?.Invoke(pet);
                Destroy(gameObject);
            }));
        }

        private SAE_Monster CreatePet()
        {
            var petPrefab = GetMonsterRandomly();
            if (petPrefab == null) return null;

            // Spawn on the egg's bottom (ground), not its pivot.
            Vector3 spawnPosition = transform.position;
            if (_renderer != null) spawnPosition.y = _renderer.bounds.min.y;

            var petInstance = Instantiate(petPrefab, spawnPosition, Quaternion.LookRotation(transform.forward))
                .GetComponent<SAE_Monster>();
            if (petInstance == null) return null;

            petInstance.transform.localScale = petInstance.transform.localScale * (sizeMultiplier * petScale);
            petInstance.SizeMultiplier = sizeMultiplier;
            return petInstance;
        }

        private IEnumerator HandleHacth(Action onCompelted)
        {
            var pool = SAE_EggBreakPool.instance;
            var eggCrackSound = pool != null ? pool.GetAvailableEggCrackSound() : null;
            if (eggCrackSound)
            {
                eggCrackSound.transform.position = transform.position;
                eggCrackSound.SetActive(true);
            }

            float timer = 0;
            while (timer < hatchDuration)
            {
                timer += Time.deltaTime;
                transform.localEulerAngles = new Vector3(transform.localEulerAngles.x, transform.localEulerAngles.y,
                    hatchNoiseCurve.Evaluate(timer / hatchDuration) * hatchNoiseStrength);
                yield return null;
            }

            onCompelted?.Invoke();
        }

        public GameObject GetMonsterRandomly()
        {
            int totalRate = 0;
            foreach (Monster m in monsters)
            {
                totalRate += m.rate;
            }

            int current = 0;
            int randNum = UnityEngine.Random.Range(0, totalRate);
            for (int i = 0; i < monsters.Length; i++)
            {
                current += monsters[i].rate;

                if (randNum < current)
                {
                    return monsters[i].obj;
                }
            }

            return monsters[0].obj;
        }

        public void GenerateSize()
        {
            sizeMultiplier = sizeData.GetSizeRandomly();
        }

        public void SetSizeMultiplier(float size)
        {
            sizeMultiplier = size;
        }

        public void RefreshCollider()
        {
            if (_sphereCollider == null) return;
            _sphereCollider.enabled = false;
            _sphereCollider.enabled = true;
        }

        [Serializable]
        public class Monster
        {
            public GameObject obj;
            public int rate;
        }
    }
}
