const fs = require('fs'), path = require('path'), http = require('http');
const { chromium } = require('C:/Users/Admin/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright');
const root = path.resolve('Temp/KeyboardEscapePreview');
const report = path.resolve('docs/keyboard-escape');
const server = http.createServer((req, res) => {
  if(req.url === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0]));
  if(!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (error, data) => {
    if(error) { res.writeHead(404); res.end(); return; }
    res.setHeader('Content-Type', ({'.html':'text/html','.js':'application/javascript','.json':'application/json','.wasm':'application/wasm','.png':'image/png','.mp3':'audio/mpeg'})[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(8917, '127.0.0.1', resolve));
  let browser;
  const logs = [], errors = new Set();
  const check = (condition, description) => { logs.push((condition ? 'PASS ' : 'FAIL ') + description); if(!condition) throw new Error(description); };
  try {
    browser = await chromium.launch({executablePath:'C:/Users/Admin/AppData/Local/Google/Chrome/Application/chrome.exe', headless:true, args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
    const page = await browser.newPage({viewport:{width:960,height:540}});
    page.on('pageerror', e => errors.add('ERROR ' + (e.stack || e.message)));
    page.on('console', message => { if(message.type()==='error') errors.add('ERROR '+message.text()); else if(message.type()==='warning') logs.push('WARNING '+message.text()); });
    page.on('response', response => {if(response.status()>=400) errors.add('HTTP '+response.status()+' '+response.url());});
    await page.goto('http://127.0.0.1:8917', {waitUntil:'load', timeout:60000});

    await page.evaluate(()=>{window.dispatchEvent(new Event('luna:start'));window.dispatchEvent(new Event('playground:started'));});
    await page.waitForFunction(()=>window.Playable&&Playable.GameManager.Instance&&Playable.GameManager.Instance.CountdownExpired,null,{timeout:60000});
    await page.evaluate(()=>{window.escape=Playable.GameManager.Instance.CountdownExpired['$invocationList'][0]['$scope'];escape.manager._endTime=300;escape.manager.CountdownEndGame();});
    await page.waitForFunction(()=>escape.IsRunning,null,{timeout:30000});
    check(await page.evaluate(()=>!escape.guide),'TutorialGuide removed');
    // Isolate floor traversal from timed ball/obstacle deaths; restore damage afterward.
    await page.evaluate(()=>{window.originalHit=escape.Hit;escape.Hit=function(){};});
    logs.push('FIXTURE damage suppressed only during floor traversal tests.');
    for(const z of [90,130]){
      await page.evaluate(z=>{escape.player.Teleport(new UnityEngine.Vector3(4.7,.1,z),escape.home.rotation);escape.player.cameraYaw.rotation=escape.home.rotation;},z);
      await page.waitForTimeout(200);
      await page.mouse.move(80,455);await page.mouse.down();await page.waitForTimeout(200);await page.mouse.move(80,390);
      await page.waitForFunction(z=>escape.player.transform.position.z>z+20,z,{timeout:15000,polling:100}).catch(()=>{});await page.mouse.up();
      const state=await page.evaluate(()=>({position:{x:escape.player.transform.position.x,y:escape.player.transform.position.y,z:escape.player.transform.position.z},moving:escape.player.canMove,input:{x:escape.player.controls.Direction.x,y:escape.player.controls.Direction.y}}));
      logs.push('TRAVEL '+z+' '+JSON.stringify(state));
      await page.screenshot({path:path.join(report,'stage2-box-'+z+'.png')});
      check(state.position.z>z+15,'Joystick crosses stage 2 from z='+z);
    }
    await page.evaluate(()=>{escape.Hit=window.originalHit;});
    await page.waitForTimeout(300);
    const baseY=await page.evaluate(()=>escape.player.transform.position.y);
    await page.mouse.move(880,455);await page.mouse.down();await page.waitForTimeout(150);await page.mouse.up();
    await page.waitForFunction(y=>escape.player.transform.position.y>y+.2,baseY,{timeout:5000,polling:50});
    check(true,'Jump still raises player with box movement');
    await page.evaluate(()=>escape.player.Teleport(escape.helmets[0].transform.position,escape.home.rotation));
    await page.waitForFunction(()=>escape.HasHelmet,null,{timeout:5000});
    check(true,'Helmet physical pickup still works');
    await page.evaluate(()=>escape.Hit());
    check(await page.evaluate(()=>!escape.HasHelmet&&escape.player.canMove),'Shield consumes one hit without death');
    await page.evaluate(()=>escape.player.Teleport(escape.cup.position,escape.home.rotation));
    await page.waitForFunction(()=>escape.manager.HasEnded,null,{timeout:5000});
    check(await page.evaluate(()=>!escape.cup.gameObject.activeSelf),'Stage 3 cup collection ends gameplay');
    check(errors.size===0,'No browser runtime errors');
  } catch(error){logs.push('FAIL '+error.stack);process.exitCode=1;}
  finally{logs.push(...errors);fs.writeFileSync(path.join(report,'stage2-box-luna-check.txt'),logs.join('\n'));if(browser)await browser.close();server.close();console.log(logs.join('\n'));}
})();
