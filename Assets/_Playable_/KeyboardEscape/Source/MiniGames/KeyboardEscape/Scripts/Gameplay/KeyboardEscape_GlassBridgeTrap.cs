using System;
using System.Collections;
using TMPro;
using UnityEngine;

namespace Minigames.KeyboardEscape.Gameplay
{
    public class KeyboardEscape_GlassBridgeTrap : MonoBehaviour
    {
        [SerializeField] private GameObject bridObj;
        [SerializeField] private Material keyMaterial;
        [SerializeField] private Material bridgeMaterial;
        [SerializeField] private TextMeshPro text_Content;

        [Header("Setting")]
        [SerializeField] private float showTime;
        [SerializeField] private float hideTime;
        [SerializeField] private float fadeTime;

        private Coroutine HandleCountTimeCoroutine;

        private void Start()
        {
            StartCoroutine(Handle());
        }

        private IEnumerator HandleCountTime(float time)
        {
            text_Content.color = Color.green;

            while (true)
            {
                time -= Time.deltaTime;
                text_Content.text = $"{Math.Round(time,1)}s";

                yield return null;
            }
        }

        private IEnumerator Handle()
        {
            while (true)
            {
                yield return new WaitForSeconds(showTime);

                //Fade out
                float start = Time.time;
                while(Time.time - start < fadeTime)
                {
                    yield return null;

                    float alpha = Mathf.Lerp(1, 0, (Time.time - start) / fadeTime);
                    keyMaterial.SetFloat("_alpha", alpha);
                    bridgeMaterial.SetFloat("_alpha", alpha);
                }

                bridObj.SetActive(false);
                if (HandleCountTimeCoroutine != null) StopCoroutine(HandleCountTimeCoroutine);

                text_Content.color = Color.red;
                text_Content.text = "Wait...";
                yield return new WaitForSeconds(hideTime);

                if(HandleCountTimeCoroutine != null) StopCoroutine(HandleCountTimeCoroutine);
                HandleCountTimeCoroutine = StartCoroutine(HandleCountTime(fadeTime*2 + showTime));

                //Fade in
                bridObj.SetActive(true);
                start = Time.time;
                while (Time.time - start < fadeTime)
                {
                    yield return null;

                    float alpha = Mathf.Lerp(0, 1, (Time.time - start) / fadeTime);
                    keyMaterial.SetFloat("_alpha", alpha);
                    bridgeMaterial.SetFloat("_alpha", alpha);
                }
            }
        }
    }
}


