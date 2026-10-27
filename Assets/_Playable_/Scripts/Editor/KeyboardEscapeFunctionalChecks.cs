using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEditor;
using Playable.KeyboardEscape;
[InitializeOnLoad] public static class KeyboardEscapeFunctionalChecks {
 static EscapeGame game;static int step;static double due;static List<string> lines;static float timerBefore;static float jumpStartY;static Vector3 previousPosition;static Quaternion wheelBefore;static Vector3 giantBefore;
 static KeyboardEscapeFunctionalChecks(){EditorApplication.playModeStateChanged+=State;}
 public static string Run(){SessionState.SetBool("EscapeChecks",true);EditorApplication.isPlaying=true;return "Functional checks started";}
 static void State(PlayModeStateChange state){if(state==PlayModeStateChange.EnteredPlayMode&&SessionState.GetBool("EscapeChecks",false)){step=0;lines=new List<string>();due=Time.time+1;EditorApplication.update+=Tick;}}
 static void Check(bool ok,string message){if(!ok)throw new Exception(message);lines.Add("PASS "+message);}
 static void Tick(){if(Time.time<due)return;try{
  if(!EditorApplication.isPlaying){EditorApplication.update-=Tick;return;}
  if(step==0){game=UnityEngine.Object.FindFirstObjectByType<EscapeGame>();Check(Mathf.Approximately(game.player.maxSpeed,game.manager.PlayerSpeed),"player speed reads GameManager Luna field");game.cupProgress.AddKeyboardCup();Check(game.cupProgress.TotalCups==0,"no cups before Start");Check(game.TutorialStep==0&&!game.IsRunning&&game.manager.RemainingTime>0&&game.manager.RemainingTime<game.manager.EndTime,"timer begins immediately during tutorial");var look=game.GetComponentInChildren<EscapeLookInput>();var e=new PointerEventData(EventSystem.current){pointerId=-1,position=new Vector2(400,400)};look.touchController.BeginPointer(-2,e.position);look.touchController.MovePointer(-2,e.position+new Vector2(30,0));look.touchController.EndPointer(-2);Check(game.TutorialStep==1,"camera swipe advances to move tutorial");game.MovementSwiped();Check(game.TutorialStep==2&&game.countdown.gameObject.activeSelf&&game.manager.RemainingTime>0,"tutorial does not restart opening countdown");due=Time.time+3.5;}
  else if(step==1){Check(game.IsRunning&&game.manager.RemainingTime>0&&game.manager.RemainingTime<=game.manager.EndTime,"Start enables player while End Time continues");previousPosition=game.player.transform.position;wheelBefore=game.player.frontWheel.localRotation;var controls=game.player.controls;Vector2 center=RectTransformUtility.WorldToScreenPoint(null,controls.joystickArea.position);controls.PointerDown(-2,center+Vector2.up*40);due=Time.time+.6;}
  else if(step==2){game.player.controls.PointerUp(-2);Check(Vector3.Distance(previousPosition,game.player.transform.position)>.05f,"source joystick moves scooter");Check(Quaternion.Angle(wheelBefore,game.player.frontWheel.localRotation)>1,"wheels rotate while moving");jumpStartY=game.player.transform.position.y;game.player.controls.PointerDown(-3,RectTransformUtility.WorldToScreenPoint(null,game.player.controls.jumpArea.position));due=Time.time+.2;}
  else if(step==3){Check(game.player.transform.position.y>jumpStartY+.1f,"Jump UI pointer raises player");game.CollectHelmet(game.helmets[0]);Check(game.HasHelmet&&game.player.helmetIndicator.activeSelf,"helmet pickup enables shield");game.Hit();Check(!game.HasHelmet&&!game.player.helmetIndicator.activeSelf&&game.player.canMove,"helmet consumes one hit and hides shield without death");due=Time.time+1.1;}
  else if(step==4){timerBefore=game.manager.RemainingTime;game.Hit();Check(!game.player.canMove&&game.player.visual.localScale.y<.2f,"unprotected hit flattens player");due=Time.time+1.2;}
  else if(step==5){Check(Vector3.Distance(game.player.transform.position,game.home.position)<.2f&&game.player.canMove,"death returns to stage 1 home");Check(game.manager.RemainingTime<timerBefore,"respawn does not reset timer");game.player.Teleport(new Vector3(11.5f,11.5f,345f),Quaternion.identity);giantBefore=game.giants[0].transform.position;due=Time.time+.6;}
  else if(step==6){Check(Vector3.Distance(giantBefore,game.giants[0].transform.position)>.1f,"giants approach in stage 4");while(game.cupProgress.Level==1)game.cupProgress.AddKeyboardCup();Check(game.cupProgress.CurrentCups==0&&Mathf.Abs(game.cupProgress.RequiredCups-111.8f)<.01f,"100 cups advances to source level 2 requirement");for(int n=0;n<112;n++)game.cupProgress.AddKeyboardCup();Check(game.cupProgress.Level==3&&game.cupProgress.CurrentCups==0,"112 more cups advances to source level 3");game.CollectCup();int cups=game.cupProgress.TotalCups;game.cupProgress.AddKeyboardCup();Check(game.cupProgress.TotalCups==cups,"no cups after game ends");Check(!game.cup.gameObject.activeSelf&&game.manager.HasEnded,"cup disappears and ends timer");Check(game.fireworks.isPlaying,"cup starts fireworks");due=Time.time+1.7;}
  else {var field=typeof(Playable.GameManager).GetField("_ctaShown",BindingFlags.NonPublic|BindingFlags.Instance);Check((bool)field.GetValue(game.manager),"celebration shows CTA");Finish();return;}step++;
 }catch(Exception e){lines.Add("FAIL "+e);Finish();}}
 static void Finish(){Directory.CreateDirectory("docs/keyboard-escape");File.WriteAllLines("docs/keyboard-escape/functional-checks.txt",lines);SessionState.SetBool("EscapeChecks",false);EditorApplication.update-=Tick;EditorApplication.isPlaying=false;}
}
