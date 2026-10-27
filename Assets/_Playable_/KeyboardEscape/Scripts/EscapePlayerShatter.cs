using UnityEngine;

namespace Playable.KeyboardEscape
{
    public sealed class EscapePlayerShatter : MonoBehaviour
    {
        public Transform[] pieces;
        public Transform debrisRoot;
        private Transform[] parents;
        private Vector3[] positions, scales, velocities, spins;
        private Quaternion[] rotations;
        private bool bursting;

        private void Awake()
        {
            int count = pieces.Length;
            parents = new Transform[count];
            positions = new Vector3[count]; scales = new Vector3[count];
            rotations = new Quaternion[count]; velocities = new Vector3[count]; spins = new Vector3[count];
        }
        public void Burst()
        {
            if (bursting) Restore();
            Vector3 origin = transform.position + Vector3.up;
            // Save all local poses before detaching any nested parts (such as wheels).
            for (int i = 0; i < pieces.Length; i++)
            {
                var piece = pieces[i];
                parents[i] = piece.parent; positions[i] = piece.localPosition;
                rotations[i] = piece.localRotation; scales[i] = piece.localScale;
            }
            for (int i = 0; i < pieces.Length; i++)
            {
                var piece = pieces[i];
                Vector3 direction = piece.position - origin;
                direction.y = 0;
                // Mesh pivots may coincide, so distribute fragments around the player.
                float angle = i * 2.399963f;
                direction += new Vector3(Mathf.Cos(angle), 0, Mathf.Sin(angle)) * .8f;
                velocities[i] = direction.normalized * (2.5f + (i % 3) * .7f) + Vector3.up * (3.5f + (i % 4) * .5f);
                spins[i] = new Vector3(130 + i * 17, 95 - i * 31, 170 + i * 13);
                piece.SetParent(debrisRoot, true);
            }
            bursting = true;
        }
        private void Update()
        {
            if (!bursting) return;
            float dt = Time.deltaTime;
            for (int i = 0; i < pieces.Length; i++)
            {
                velocities[i] += Vector3.down * (14f * dt);
                pieces[i].position += velocities[i] * dt;
                pieces[i].Rotate(spins[i] * dt, Space.Self);
            }
        }
        public void Restore()
        {
            if (!bursting) return;
            for (int i = 0; i < pieces.Length; i++)
            {
                pieces[i].SetParent(parents[i], false);
                pieces[i].localPosition = positions[i];
                pieces[i].localRotation = rotations[i];
                pieces[i].localScale = scales[i];
            }
            bursting = false;
        }
        private void OnDisable() { Restore(); }
    }
}
