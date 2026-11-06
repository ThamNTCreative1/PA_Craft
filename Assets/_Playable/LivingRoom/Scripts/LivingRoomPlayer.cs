using UnityEngine;
namespace CEBB.Playable
{
    // First-person walker for the living room: joystick / WASD to move, drag to look.
    public sealed class LivingRoomPlayer:MonoBehaviour
    {
        public LivingRoomPlayable game;public Camera playerCamera;public RoomMovePad movePad;
        public Vector3 spawnPosition=new Vector3(0,0,-3.3f);
        public float eyeHeight=1.65f,walkSpeed=2.6f,lookSensitivity=150,yaw=0,pitch=16,bodyRadius=.25f;
        private bool focusing;private float focusYaw,focusPitch,focusUntil;
        public float Yaw {get{return yaw;}}
        public Vector3 EyePosition {get{return transform.position+Vector3.up*eyeHeight;}}
        private void Start(){transform.position=spawnPosition;ApplyView();}
        // Turns the view toward a world point (smooth = short ease, used after the first build).
        public void LookAt(Vector3 point,bool smooth)
        {
            Vector3 d=point-EyePosition;float y=Mathf.Atan2(d.x,d.z)*Mathf.Rad2Deg;float p=Mathf.Clamp(-Mathf.Atan2(d.y,new Vector2(d.x,d.z).magnitude)*Mathf.Rad2Deg,-60,70);
            if(smooth){focusYaw=y;focusPitch=p;focusUntil=Time.unscaledTime+.6f;focusing=true;}else{yaw=y;pitch=p;focusing=false;ApplyView();}
        }
        public void ApplyLook(Vector2 delta)
        {
            if(!game.AllowLook)return;focusing=false;
            float dy=delta.x/Mathf.Max(1,Screen.width)*lookSensitivity,oldPitch=pitch;yaw+=dy;
            pitch=Mathf.Clamp(pitch-delta.y/Mathf.Max(1,Screen.height)*lookSensitivity,-60,70);ApplyView();
            game.NotifyLook(Mathf.Abs(dy)+Mathf.Abs(pitch-oldPitch));
        }
        public void ApplyView()
        {
            transform.rotation=Quaternion.Euler(0,yaw,0);
            playerCamera.transform.localPosition=new Vector3(0,eyeHeight,0);playerCamera.transform.localRotation=Quaternion.Euler(pitch,0,0);
        }
        private void Move(Vector2 input,float deltaTime)
        {
            Vector3 motion=Quaternion.Euler(0,yaw,0)*new Vector3(input.x,0,input.y)*walkSpeed*Mathf.Min(.05f,deltaTime);Vector3 p=transform.position;
            bool stuck=!game.IsClear(p,bodyRadius);
            Vector3 x=p+new Vector3(motion.x,0,0);x.x=Mathf.Clamp(x.x,game.roomMin.x+bodyRadius,game.roomMax.x-bodyRadius);if(stuck||game.IsClear(x,bodyRadius))p=x;
            Vector3 z=p+new Vector3(0,0,motion.z);z.z=Mathf.Clamp(z.z,game.roomMin.y+bodyRadius,game.roomMax.y-bodyRadius);if(stuck||game.IsClear(z,bodyRadius))p=z;
            float moved=Vector3.Distance(transform.position,p);transform.position=p;if(moved>0)game.NotifyMove(moved);
        }
        private void Update()
        {
            if(focusing){float k=1-Mathf.Exp(-Time.unscaledDeltaTime*10);yaw=Mathf.LerpAngle(yaw,focusYaw,k);pitch=Mathf.Lerp(pitch,focusPitch,k);ApplyView();if(Time.unscaledTime>=focusUntil)focusing=false;}
            if(!game.CanMove)return;
            Vector2 input=movePad==null?Vector2.zero:movePad.Value;
            if(Input.GetKey(KeyCode.W)||Input.GetKey(KeyCode.UpArrow))input.y+=1;if(Input.GetKey(KeyCode.S)||Input.GetKey(KeyCode.DownArrow))input.y-=1;
            if(Input.GetKey(KeyCode.D)||Input.GetKey(KeyCode.RightArrow))input.x+=1;if(Input.GetKey(KeyCode.A)||Input.GetKey(KeyCode.LeftArrow))input.x-=1;
            input=Vector2.ClampMagnitude(input,1);if(input.sqrMagnitude>.01f)Move(input,Time.deltaTime);
        }
    }
}
