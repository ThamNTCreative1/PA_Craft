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
    const audio = await page.evaluate(async () => {
      const bundle = await (await fetch('assets/bundles/-1/bundle.json')).json();
      const context = new AudioContext(), result = [];
      for(const sound of bundle.sounds || []) {
        try { const bytes = await (await fetch('assets/bundles/-1/'+sound.id+'.mp3')).arrayBuffer(); const clip = await context.decodeAudioData(bytes); result.push({name:sound.path,duration:clip.duration}); }
        catch(error) { result.push({name:sound.path,error:String(error)}); }
      }
      await context.close(); return result;
    });
    logs.push('AUDIO '+JSON.stringify(audio));
    await page.evaluate(() => {window.dispatchEvent(new Event('luna:start'));window.dispatchEvent(new Event('playground:started'));});
    await page.waitForFunction(() => window.Playable && Playable.GameManager.Instance && Playable.GameManager.Instance.CountdownExpired, {timeout:60000});
    await page.waitForTimeout(600);
    check(await page.evaluate(() => Playable.GameManager.Instance.RemainingTime > 0 && Playable.GameManager.Instance.RemainingTime < 30), 'End Time begins immediately in Luna');
    check(await page.evaluate(() => Playable.GameManager.Instance.PlayerSpeed === 5 && Playable.GameManager.Instance.EndTime === 30), 'default Player Speed 5 and End Time 30 exported');
    await page.evaluate(()=>{window.escape=Playable.GameManager.Instance.CountdownExpired['$invocationList'][0]['$scope'];});
    // Extend only this browser test fixture so slow software rendering cannot expire the session during milestone checks.
    await page.evaluate(()=>{escape.manager._endTime=120;escape.manager.CountdownEndGame();});
    logs.push('FIXTURE End Time extended to 120 only in the test browser; exported default verified as 30.');
    await page.waitForFunction(()=>escape.IsRunning,null,{timeout:30000,polling:100});
    const score=()=>page.evaluate(()=>({total:escape.cupProgress.TotalCups,current:escape.cupProgress.CurrentCups,level:escape.cupProgress.Level,required:escape.cupProgress.RequiredCups,fill:escape.cupProgress.fill.fillAmount}));
    check((await score()).total===0,'no cups for standing at home');
    await page.evaluate(()=>{escape.player.Teleport(new UnityEngine.Vector3(4.3668,.3,-7.7571),escape.home.rotation);escape.player.cameraYaw.rotation=escape.home.rotation;escape.CameraSwiped();});
    await page.waitForFunction(()=>escape.cupProgress.TotalCups>0,null,{timeout:10000,polling:100}).catch(async e=>{console.log('SCORE DEBUG '+await page.evaluate(()=>JSON.stringify({total:escape.cupProgress.TotalCups,position:escape.player.transform.position,grounded:escape.player.body.isGrounded,canMove:escape.player.canMove,running:escape.IsRunning,time:escape.manager.RemainingTime})));throw e;});
    await page.waitForTimeout(700);
    logs.push('STANDING '+JSON.stringify(await score()));
    check((await score()).total===1,'one cup for entering a key; standing still does not farm cups');
    await page.mouse.move(80,455);await page.mouse.down();await page.waitForTimeout(150);await page.mouse.move(80,400);await page.waitForTimeout(500);await page.mouse.up();await page.waitForTimeout(200);
    const forward=await score();check(forward.total>1,'joystick movement across keys earns cups');
    await page.mouse.move(80,455);await page.mouse.down();await page.waitForTimeout(150);await page.mouse.move(80,510);await page.waitForTimeout(500);await page.mouse.up();await page.waitForTimeout(200);
    const backward=await score();check(backward.total>forward.total,'walking back over previous keys earns cups again');
    await page.waitForTimeout(700);check((await score()).total===backward.total,'stopping after revisiting does not add repeated cups');
    await page.mouse.move(880,455);await page.mouse.down();await page.waitForTimeout(150);await page.mouse.up();
    await page.waitForFunction(()=>!escape.player.body.isGrounded,null,{timeout:10000,polling:100});const airborne=await score();await page.waitForTimeout(200);
    check((await score()).total===airborne.total,'no cups while airborne above keyboard');
    await page.waitForFunction(()=>escape.player.body.isGrounded,null,{timeout:10000,polling:100});
    const speed=await page.evaluate(()=>escape.player.maxSpeed);
    await page.evaluate(()=>{for(let i=0;i<100&&escape.cupProgress.Level===1;i++)escape.cupProgress.AddKeyboardCup();});
    const level2=await score();check(level2.total===100&&level2.level===2&&level2.current===0&&Math.abs(level2.required-111.8)<.01&&level2.fill===0,'100 cups resets bar and advances to source level 2');
    check(await page.evaluate(()=>{for(let i=0;i<7;i++)escape.cupProgress.AddKeyboardCup();const s=escape.cupProgress;return s.totalLabel.text==='107'&&s.progressLabel.text==='7/112'&&s.fill.fillAmount>0&&s.gainLabel.gameObject.activeSelf&&s.gainLabel.text==='+1';}),'cup total, progress fill and floating +1 UI update together');
    await page.setViewportSize({width:1920,height:1080});await page.waitForTimeout(250);
    await page.screenshot({path:path.join(report,'luna-cups-landscape.png')});
    await page.setViewportSize({width:1080,height:1920});await page.waitForTimeout(300);await page.evaluate(()=>escape.cupProgress.AddKeyboardCup());
    await page.screenshot({path:path.join(report,'luna-cups-portrait.png')});
    await page.evaluate(()=>{for(let i=0;i<112&&escape.cupProgress.Level===2;i++)escape.cupProgress.AddKeyboardCup();});
    const level3=await score();check(level3.total===212&&level3.level===3&&level3.current===0&&Math.abs(level3.required-124.9924)<.02,'next 112 cups advances to source level 3');
    check(await page.evaluate(v=>escape.player.maxSpeed===v&&!escape.manager.HasEnded,speed),'cup progress preserves configured speed and does not end gameplay');
    await page.evaluate(()=>escape.Hit(true));await page.waitForFunction(()=>escape.player.canMove,null,{timeout:30000,polling:100});
    check((await score()).total===212,'earned cups remain after death and respawn');
    await page.evaluate(()=>escape.player.Teleport(escape.cup.position,escape.home.rotation));
    await page.waitForFunction(()=>!escape.cup.gameObject.activeSelf,null,{timeout:10000,polling:100});
    check(await page.evaluate(()=>escape.manager.HasEnded),'only final stage trophy completes gameplay');
    const finalScore=await score();await page.evaluate(()=>escape.cupProgress.AddKeyboardCup());check((await score()).total===finalScore.total,'no cup rewards after game ends');
    check(errors.size===0,'no Luna runtime or shader errors');
  } catch(error) { logs.push('HARNESS '+error.stack); process.exitCode=1; }
  finally {
    fs.writeFileSync(path.join(report,'cups-check.txt'), [...logs,...errors].join('\n'));
    if(browser) await browser.close();server.close();
    console.log(logs.filter(line=>/^(PASS|FAIL|HARNESS)/.test(line)).join('\n'));
    console.log('Distinct browser errors: '+errors.size);
  }
})();
