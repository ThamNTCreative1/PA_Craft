using UnityEngine;
using UnityEngine.UI;
namespace CEBB.Playable
{
    public sealed class FirstPersonRoom:MonoBehaviour
    {
        public BedroomPlayable game;public Camera playerCamera;public RoomMovePad movePad;public Image reticle;
        public Vector3 spawnPosition=new Vector3(1.2f,0,-2.7f);
        public float eyeHeight=1.65f,walkSpeed=2.5f,lookSensitivity=150,buildReach=7,yaw=-20,pitch=10;
        public Vector2 minRoom=new Vector2(-4.45f,-3.85f),maxRoom=new Vector2(4.45f,3.85f);
        private bool focusing;private float focusYaw,focusPitch,focusUntil;
        public bool centerFirstTarget=true;
        private void Start(){transform.position=spawnPosition;if(centerFirstTarget&&game!=null)LookAtSlot(game.firstBedSlot);ApplyView();}
        // Aim the camera so the slot (the bed ghost at the start) sits in the middle of the screen.
        public void LookAtSlot(int index)
        {if(game.slots==null||index<0||index>=game.slots.Length||game.slots[index].targetCollider==null)return;Vector3 d=game.slots[index].targetCollider.bounds.center-(transform.position+Vector3.up*eyeHeight);yaw=Mathf.Atan2(d.x,d.z)*Mathf.Rad2Deg;pitch=Mathf.Clamp(-Mathf.Atan2(d.y,new Vector2(d.x,d.z).magnitude)*Mathf.Rad2Deg,-55,65);}
        public void ApplyLook([Bridge.Ref] Vector2 delta)
        {
            if(!game.AllowLook)return;focusing=false;float oldPitch=pitch;float dy=delta.x/Mathf.Max(1,Screen.width)*lookSensitivity;yaw+=dy;pitch=Mathf.Clamp(pitch-delta.y/Mathf.Max(1,Screen.height)*lookSensitivity,-55,65);ApplyView();game.NotifyLookMotion(Mathf.Abs(dy)+Mathf.Abs(pitch-oldPitch));
        }
        public void ApplyView(){transform.rotation=Quaternion.Euler(0,yaw,0);playerCamera.transform.localPosition=new Vector3(0,eyeHeight,0);playerCamera.transform.localRotation=Quaternion.Euler(pitch,0,0);}
        public float bodyRadius=.22f;
        private Collider[] blockers;
        // Plain bounds test against solid colliders (no Physics.CheckCapsule) so movement behaves the same in Luna.
        private bool IsClear([Bridge.Ref] Vector3 p)
        {
            if(blockers==null)blockers=FindObjectsOfType<Collider>();
            for(int i=0;i<blockers.Length;i++)
            {
                var c=blockers[i];if(c==null||!c.enabled||c.isTrigger||!c.gameObject.activeInHierarchy||c.transform.IsChildOf(transform))continue;
                Bounds b=c.bounds;if(b.max.y<.1f||b.min.y>1.6f)continue;
                if(p.x>b.min.x-bodyRadius&&p.x<b.max.x+bodyRadius&&p.z>b.min.z-bodyRadius&&p.z<b.max.z+bodyRadius)return false;
            }
            return true;
        }
        public void Move([Bridge.Ref] Vector2 input,float deltaTime)
        {
            if(!game.CanMove)return;Vector3 motion=Quaternion.Euler(0,yaw,0)*new Vector3(input.x,0,input.y)*walkSpeed*Mathf.Min(.05f,deltaTime);Vector3 p=transform.position;
            bool stuck=!IsClear(p);Vector3 x=p+new Vector3(motion.x,0,0);x.x=Mathf.Clamp(x.x,minRoom.x,maxRoom.x);if(stuck||IsClear(x))p=x;Vector3 z=p+new Vector3(0,0,motion.z);z.z=Mathf.Clamp(z.z,minRoom.y,maxRoom.y);if(stuck||IsClear(z))p=z;float moved=Vector3.Distance(transform.position,p);transform.position=p;if(moved>0)game.NotifyMoveDistance(moved);
        }
        public int FindAimedSlot()
        {if(!game.CanAim)return -1;RaycastHit hit;if(Physics.Raycast(playerCamera.ViewportPointToRay(new Vector3(.5f,.5f,0)),out hit,buildReach,Physics.DefaultRaycastLayers,QueryTriggerInteraction.Collide)){for(int i=0;i<game.slots.Length;i++)if(game.slots[i].targetCollider==hit.collider)return game.slots[i].built?-1:i;}return -1;}
        public int FindHintCandidate()
        {
            int best=-1,fallback=-1;float score=float.MaxValue,nearest=float.MaxValue;Vector3 origin=playerCamera.transform.position;
            for(int i=0;i<game.slots.Length;i++)
            {
                var s=game.slots[i];if(s.built||s.targetCollider==null)continue;Vector3 delta=s.targetCollider.bounds.center-origin;float distance=delta.magnitude;if(distance<.3f)continue;if(distance<nearest){nearest=distance;fallback=i;}RaycastHit hit;
                if(!Physics.Raycast(origin,delta/distance,out hit,distance+.1f,Physics.DefaultRaycastLayers,QueryTriggerInteraction.Collide)||hit.collider!=s.targetCollider)continue;
                float value=distance+Vector3.Angle(playerCamera.transform.forward,delta)*.025f;if(value<score){best=i;score=value;}
            }
            return best>=0?best:fallback;
        }
        public void FocusOnHint(int index)
        {Vector3 d=game.slots[index].targetCollider.bounds.center-playerCamera.transform.position;focusYaw=Mathf.Atan2(d.x,d.z)*Mathf.Rad2Deg;focusPitch=Mathf.Clamp(-Mathf.Atan2(d.y,new Vector2(d.x,d.z).magnitude)*Mathf.Rad2Deg,-55,65);focusUntil=Time.unscaledTime+.5f;focusing=true;}
        private void Update()
        {
            if(focusing&&game.AllowLook){float k=1-Mathf.Exp(-Time.unscaledDeltaTime*12);yaw=Mathf.LerpAngle(yaw,focusYaw,k);pitch=Mathf.Lerp(pitch,focusPitch,k);ApplyView();if(Time.unscaledTime>=focusUntil)focusing=false;}
            Vector2 input=movePad==null?Vector2.zero:movePad.Value;if(Input.GetKey(KeyCode.W)||Input.GetKey(KeyCode.UpArrow))input.y+=1;if(Input.GetKey(KeyCode.S)||Input.GetKey(KeyCode.DownArrow))input.y-=1;if(Input.GetKey(KeyCode.D)||Input.GetKey(KeyCode.RightArrow))input.x+=1;if(Input.GetKey(KeyCode.A)||Input.GetKey(KeyCode.LeftArrow))input.x-=1;input=Vector2.ClampMagnitude(input,1);if(input.sqrMagnitude>.01f&&game.CanMove)Move(input,Time.deltaTime);
        }
        private void LateUpdate(){int index=FindAimedSlot();game.SetAimedSlot(index);game.UpdateGuidanceVisual(playerCamera);if(reticle!=null)reticle.color=index>=0?new Color(.35f,1,.9f):Color.white;}
    }
}
