using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.Events;

namespace Minigames.StealAnEgg.GamePlay
{
    /// <summary>
    /// Playable replacement for SAE_CoopIncubateSystem: places an egg, counts down, then hatches it into a pet.
    /// Needs an SAE_EggBreakPool in the scene for the crack sound / break FX.
    /// </summary>
    public class SAE_EggIncubator : MonoBehaviour
    {
        [SerializeField] private SAE_Egg eggPrefab;
        [SerializeField] private Transform eggContainer;
        [SerializeField] private SAE_IncubateTimeDisplayment displaymentPrefab;

        [Tooltip("Seconds to incubate; <= 0 uses the egg's incubateTimeBase.")]
        [SerializeField] private float hatchingTime = 3f;
        [Tooltip("Keep off when GameController drives the Open button.")]
        [SerializeField] private bool autoHatch;
        [SerializeField] private bool randomizeSize;

        [Header("Pet")]
        [SerializeField] private float petPopDuration = 0.4f;
        [Tooltip("Uniform scale of the hatched pet; <= 0 keeps the scale from the egg.")]
        [SerializeField] private float petScale = 10f;

        private readonly List<SAE_IncubateEggHandler> incubatingHandlerList = new List<SAE_IncubateEggHandler>();
        private readonly Dictionary<SAE_IncubateEggHandler, float> petScaleOverrides =
            new Dictionary<SAE_IncubateEggHandler, float>();

        public List<SAE_IncubateEggHandler> IncubatingHandlerList => incubatingHandlerList;
        /// <summary>Scale applied to hatched pets; <= 0 means the pet keeps the egg-based scale.</summary>
        public float PetScale => petScale;
        /// <summary>Scale actually applied to the last hatched pet (per-egg override or Pet Scale).</summary>
        public float LastPetScale { get; private set; }

        /// <summary>Overrides Pet Scale for the pet of this egg only (e.g. a chicken smaller than a dragon).</summary>
        public void SetPetScale(SAE_IncubateEggHandler handler, float scale)
        {
            if (handler != null && scale > 0f) petScaleOverrides[handler] = scale;
        }

        public event UnityAction<SAE_IncubateEggHandler> OnIncubaterCompleted;
        public event UnityAction<SAE_Monster> OnPetHatched;

        public SAE_IncubateEggHandler IncubateEgg(Vector3 position, Quaternion rotation)
        {
            return IncubateEgg(eggPrefab, position, rotation);
        }

        /// <summary>Incubates the Egg Prefab shown at worldScale (e.g. the size of the stolen egg).</summary>
        public SAE_IncubateEggHandler IncubateEgg(Vector3 position, Quaternion rotation, Vector3 worldScale)
        {
            return IncubateEgg(eggPrefab, position, rotation, worldScale);
        }

        public SAE_IncubateEggHandler IncubateEgg(SAE_Egg egg, Vector3 position, Quaternion rotation)
        {
            return IncubateEgg(egg, position, rotation, null);
        }

        /// <param name="worldScale">World scale to show the egg at (e.g. the stolen egg's); the pet scales along.</param>
        public SAE_IncubateEggHandler IncubateEgg(SAE_Egg egg, Vector3 position, Quaternion rotation, Vector3? worldScale)
        {
            if (egg == null) return null;

            Transform parent = eggContainer != null ? eggContainer : transform;
            SAE_Egg eggInstance = Instantiate(egg, position, rotation, parent);
            if (randomizeSize && eggInstance.SizeData != null) eggInstance.GenerateSize();
            else eggInstance.SetSizeMultiplier(1);

            if (worldScale.HasValue)
            {
                Vector3 s = worldScale.Value, p = parent.lossyScale;
                eggInstance.transform.localScale = new Vector3(s.x / p.x, s.y / p.y, s.z / p.z);
                eggInstance.KeepCurrentScale();
                // Egg prefabs hatch their pet at scale 1, so a bigger egg gives a proportionally bigger pet.
                eggInstance.PetScale = s.y;
            }

            if (eggInstance.Renderer != null)
            {
                // position is a ground point: sit the egg's bottom on it whatever the model pivot is.
                float bottom = eggInstance.Renderer.bounds.min.y;
                eggInstance.transform.position += Vector3.up * (position.y - bottom);
            }

            var incubateHandler = eggInstance.gameObject.AddComponent<SAE_IncubateEggHandler>();
            incubateHandler.SetValue(eggInstance, displaymentPrefab, 0, hatchingTime);
            incubateHandler.OnIncubateCompleted += HandleIncubateCompleted;
            incubateHandler.OnDestroyByHatchEvent += HandleDestroyByHatch;
            incubatingHandlerList.Add(incubateHandler);
            return incubateHandler;
        }

        public void Hatch(SAE_IncubateEggHandler handler)
        {
            if (handler == null || !handler.hatchAvailable || handler.Egg.IsHatching) return;
            float scale;
            if (!petScaleOverrides.TryGetValue(handler, out scale)) scale = petScale;
            petScaleOverrides.Remove(handler);
            handler.Egg.RunHatch(pet => HandlePetHatched(pet, scale));
        }

        private void HandleIncubateCompleted(SAE_IncubateEggHandler handler)
        {
            handler.OnIncubateCompleted -= HandleIncubateCompleted;
            OnIncubaterCompleted?.Invoke(handler);
            // The ground highlight is not shown in the playable (the Open button marks readiness).
            if (autoHatch) Hatch(handler);
        }

        private void HandleDestroyByHatch(SAE_IncubateEggHandler handler)
        {
            handler.OnDestroyByHatchEvent -= HandleDestroyByHatch;
            incubatingHandlerList.Remove(handler);
            petScaleOverrides.Remove(handler);
        }

        private void HandlePetHatched(SAE_Monster pet, float scale)
        {
            LastPetScale = scale;
            if (pet != null)
            {
                // The pet prefab uses gravity; the playable map has no ground collider under Home, so keep it in place.
                var body = pet.GetComponent<Rigidbody>();
                if (body != null)
                {
                    body.useGravity = false;
                    body.isKinematic = true;
                }

                // A moving kinematic pet would shove the player off the map: the pet is decorative, so no collisions.
                foreach (var col in pet.GetComponentsInChildren<Collider>(true))
                    if (!col.isTrigger) col.enabled = false;
            }

            if (pet != null && scale > 0f) pet.transform.localScale = Vector3.one * scale;

            if (pet != null && petPopDuration > 0f)
            {
                Vector3 targetScale = pet.transform.localScale;
                pet.transform.localScale = Vector3.zero;
                pet.transform.DOScale(targetScale, petPopDuration).SetEase(Ease.OutBack).SetLink(pet.gameObject);
            }

            OnPetHatched?.Invoke(pet);
        }
    }
}
