using UnityEngine;
namespace CEBB.Playable
{
    // First-person walker on the voxel moon (height comes from the baked height grid, no physics needed in Luna).
    // Joystick / WASD to move, drag to look, FLY lifts the camera so the top of the rocket is easy to reach.
    public sealed class RocketPlayer:MonoBehaviour
    {
        public RocketPlayable game;public Camera playerCamera;public RoomMovePad movePad;
        public float eyeHeight=1.65f,walkSpeed=4.5f,flySpeed=6.5f,flyHeight=7f,climb=1.1f,lookSensitivity=150,yaw,pitch=8;
        [Header("Height grid (baked)")] public int gridWidth,gridDepth;public float originX,originZ;public int[] heights;
        [Header("Rocket footprint (no walking through it unless flying)")] public Vector3 rocketMin,rocketMax;
        private bool flying,focusing;private float focusYaw,focusPitch,focusUntil,elevation;
        public bool Flying {get{return flying;}}
        public float Yaw {get{return yaw;}}
        private void Start(){elevation=Ground(transform.position.x,transform.position.z);Vector3 p=transform.position;p.y=elevation;transform.position=p;ApplyView();}
        public float Ground(float x,float z)
        {
            if(heights==null||heights.Length==0)return 0;
            int i=Mathf.Clamp(Mathf.FloorToInt(x-originX),0,gridWidth-1),k=Mathf.Clamp(Mathf.FloorToInt(z-originZ),0,gridDepth-1);
            return heights[k*gridWidth+i];
        }
        // Highest ground under the body (so the camera never dips into a block edge).
        private float GroundUnder(Vector3 p){float r=.25f,h=Ground(p.x,p.z);h=Mathf.Max(h,Ground(p.x+r,p.z));h=Mathf.Max(h,Ground(p.x-r,p.z));h=Mathf.Max(h,Ground(p.x,p.z+r));h=Mathf.Max(h,Ground(p.x,p.z-r));return h;}
        public void SetFly(bool on)
        {
            flying=on;if(on)return;
            // landing on top of the rocket is not allowed: step off to the nearest side first
            Vector3 p=transform.position;const float r=.6f;
            if(p.x>rocketMin.x-r&&p.x<rocketMax.x+r&&p.z>rocketMin.z-r&&p.z<rocketMax.z+r)
            {
                float[] d={p.x-(rocketMin.x-r),(rocketMax.x+r)-p.x,p.z-(rocketMin.z-r),(rocketMax.z+r)-p.z};int best=0;for(int i=1;i<4;i++)if(d[i]<d[best])best=i;
                if(best==0)p.x=rocketMin.x-r;else if(best==1)p.x=rocketMax.x+r;else if(best==2)p.z=rocketMin.z-r;else p.z=rocketMax.z+r;transform.position=p;
            }
        }
        public void ApplyLook(Vector2 delta)
        {
            if(game!=null&&!game.CanLook)return;focusing=false;
            float dy=delta.x/Mathf.Max(1,Screen.width)*lookSensitivity,op=pitch;yaw+=dy;pitch=Mathf.Clamp(pitch-delta.y/Mathf.Max(1,Screen.height)*lookSensitivity,-70,75);ApplyView();game.NotifyLook(Mathf.Abs(dy)+Mathf.Abs(pitch-op));
        }
        public void ApplyView(){transform.rotation=Quaternion.Euler(0,yaw,0);playerCamera.transform.localPosition=new Vector3(0,eyeHeight,0);playerCamera.transform.localRotation=Quaternion.Euler(pitch,0,0);}
        public void LookAt(Vector3 point,bool smooth)
        {
            Vector3 d=point-(transform.position+Vector3.up*eyeHeight);float y=Mathf.Atan2(d.x,d.z)*Mathf.Rad2Deg,p=Mathf.Clamp(-Mathf.Atan2(d.y,new Vector2(d.x,d.z).magnitude)*Mathf.Rad2Deg,-70,75);
            if(smooth){focusYaw=y;focusPitch=p;focusUntil=Time.unscaledTime+.7f;focusing=true;}else{yaw=y;pitch=p;ApplyView();}
        }
        private bool Blocked(Vector3 p)
        {
            if(Ground(p.x,p.z)<-100f)return true; /* no ground here (edge of a floating island map): never walk or fly off it */
            if(flying)return false;const float r=.35f;
            if(p.x>rocketMin.x-r&&p.x<rocketMax.x+r&&p.z>rocketMin.z-r&&p.z<rocketMax.z+r&&p.y<rocketMax.y)return true;
            if(GroundUnder(p)>elevation+climb)return true; // cliff higher than one block
            return false;
        }
        private void Update()
        {
            if(game==null)return;
            if(focusing){float k=1-Mathf.Exp(-Time.unscaledDeltaTime*9);yaw=Mathf.LerpAngle(yaw,focusYaw,k);pitch=Mathf.Lerp(pitch,focusPitch,k);ApplyView();if(Time.unscaledTime>=focusUntil)focusing=false;}
            Vector2 input=movePad==null?Vector2.zero:movePad.Value;
            if(Input.GetKey(KeyCode.W)||Input.GetKey(KeyCode.UpArrow))input.y+=1;if(Input.GetKey(KeyCode.S)||Input.GetKey(KeyCode.DownArrow))input.y-=1;
            if(Input.GetKey(KeyCode.D)||Input.GetKey(KeyCode.RightArrow))input.x+=1;if(Input.GetKey(KeyCode.A)||Input.GetKey(KeyCode.LeftArrow))input.x-=1;
            input=Vector2.ClampMagnitude(input,1);
            Vector3 p=transform.position;
            if(input.sqrMagnitude>.01f&&game.CanMove)
            {
                game.NotifyFirstInput();game.NotifyInput();
                Vector3 m=Quaternion.Euler(0,yaw,0)*new Vector3(input.x,0,input.y)*(flying?flySpeed:walkSpeed)*Mathf.Min(.05f,Time.deltaTime);
                float minX=originX+1,maxX=originX+gridWidth-1,minZ=originZ+1,maxZ=originZ+gridDepth-1;
                Vector3 x=p+new Vector3(m.x,0,0);x.x=Mathf.Clamp(x.x,minX,maxX);if(!Blocked(x))p=x;
                Vector3 z=p+new Vector3(0,0,m.z);z.z=Mathf.Clamp(z.z,minZ,maxZ);if(!Blocked(z))p=z;
                float moved=new Vector2(p.x-transform.position.x,p.z-transform.position.z).magnitude;if(moved>0)game.NotifyMove(moved);
            }
            float ground=GroundUnder(p);float target=ground+(flying?flyHeight:0f);
            elevation=Mathf.MoveTowards(elevation,target,Time.deltaTime*(flying?6f:Mathf.Max(8f,Mathf.Abs(target-elevation)*10f)));
            if(!flying&&elevation<ground)elevation=ground;
            p.y=elevation;transform.position=p;
        }
    }
}
