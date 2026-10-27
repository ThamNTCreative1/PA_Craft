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
    const page = await browser.newPage({viewport:{width:1920,height:1080}});
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
    await page.evaluate(()=>{window.escape=Playable.GameManager.Instance.CountdownExpired['\u0024invocationList'][0]['\u0024scope'];});logs.push('DELEGATE '+await page.evaluate(()=>{let d=Playable.GameManager.Instance.CountdownExpired;return JSON.stringify(d['\u0024invocationList'].map(v=>({type:typeof v,keys:Object.keys(v||{}),array:Array.isArray(v)})));}));await page.screenshot({path:path.join(report,'luna-landscape.png')});
    check(await page.evaluate(()=>escape.countdown.gameObject.activeSelf && ['3','2','1'].includes(escape.countdown.text)), '3-2-1 countdown begins on entry without input');
    await page.screenshot({path:path.join(report,'luna-entry-countdown.png')});
    await page.waitForTimeout(3300);
    const hands=()=>page.evaluate(()=>{const t=escape.player.controls.canvas.transform;const i=t.Find('Camera Infinity Tutorial');const h=i.Find('Camera Hand');return {infinity:i.gameObject.activeSelf,move:t.Find('Move Hand').gameObject.activeSelf,x:h.localPosition.x,y:h.localPosition.y};});
    const handBefore=await hands();await page.waitForTimeout(350);const handAfter=await hands();
    check(handBefore.infinity&&!handBefore.move&&Math.hypot(handAfter.x-handBefore.x,handAfter.y-handBefore.y)>1,'infinity hand animates during camera tutorial');
    await page.setViewportSize({width:1080,height:1920});await page.waitForTimeout(300);
    check(await page.evaluate(()=>Math.abs(escape.player.controls.canvas.transform.Find('Camera Infinity Tutorial').position.y-escape.player.controls.joystickArea.position.y)<1),'infinity aligns vertically with joystick in portrait');
    await page.screenshot({path:path.join(report,'luna-infinity-portrait.png')});
    await page.setViewportSize({width:1920,height:1080});await page.waitForTimeout(300);
    await page.mouse.move(900,450);await page.mouse.down();await page.waitForTimeout(150);for(let x=910;x<=1000;x+=10){await page.mouse.move(x,450);await page.waitForTimeout(50);}await page.mouse.up();
    await page.waitForTimeout(500);
    check(await page.evaluate(()=>escape.TutorialStep===1),'TouchController camera swipe advances tutorial');
    const movementHand=await hands();check(!movementHand.infinity&&movementHand.move,'movement tutorial shows joystick hand');
    await page.screenshot({path:path.join(report,'luna-camera-swipe.png')});
    await page.setViewportSize({width:1080,height:1920});await page.waitForTimeout(1000);
    await page.screenshot({path:path.join(report,'luna-portrait.png')});
    await page.mouse.move(160,1750);await page.mouse.down();await page.waitForTimeout(200);await page.mouse.move(160,1690,{steps:8});
    await page.waitForTimeout(500);
    check(await page.evaluate(() => Playable.GameManager.Instance.RemainingTime > 0 && Playable.GameManager.Instance.RemainingTime < 30), 'tutorial does not reset End Time');
    await page.waitForFunction(() => Playable.GameManager.Instance.RemainingTime > 0, {timeout:30000});
    await page.waitForTimeout(500);await page.mouse.up();
    const hiddenHands=await hands();check(!hiddenHands.infinity&&!hiddenHands.move,'hands hide once movement tutorial completes');
    const state = () => page.evaluate(() => ({x:escape.player.transform.position.x,y:escape.player.transform.position.y,z:escape.player.transform.position.z,grounded:escape.player.body.isGrounded,canMove:escape.player.canMove,input:{x:escape.player.controls.Direction.x,y:escape.player.controls.Direction.y},time:escape.manager.RemainingTime}));
    const moved = (a,b) => Math.hypot(b.x-a.x,b.z-a.z);
    for(const size of [{width:1080,height:1920},{width:1920,height:1080}]) {
      await page.setViewportSize(size);await page.waitForTimeout(300);
      await page.evaluate(()=>escape.player.Teleport(escape.home.position,escape.home.rotation));
      await page.waitForFunction(()=>escape.player.body.isGrounded,null,{timeout:3000});
      const yawBefore=await page.evaluate(()=>escape.player.cameraYaw.eulerAngles.y);
      const before = await state();
      await page.mouse.move(160,size.height-170);await page.mouse.down();await page.mouse.move(160,size.height-240,{steps:8});
      await page.waitForTimeout(700);const after=await state();await page.mouse.up();
      check(Math.abs(await page.evaluate(()=>escape.player.cameraYaw.eulerAngles.y)-yawBefore)<.01,'joystick does not rotate camera '+size.width);
      logs.push('MOVEMENT '+JSON.stringify({size,before,after,distance:moved(before,after)}));
      check(moved(before,after)>.25,'joystick moves player '+size.width+'x'+size.height);
      await page.waitForFunction(()=>escape.player.body.isGrounded,null,{timeout:3000});
      const ground = await state();
      await page.mouse.move(size.width-160,size.height-170);await page.mouse.down();
      await page.waitForFunction(y=>escape.player.transform.position.y>y+.25,ground.y,{timeout:3000});
      const jumped = await state();await page.mouse.up();
      logs.push('JUMP '+JSON.stringify({size,ground,jumped}));
      check(jumped.y>ground.y+.25,'Jump raises player '+size.width+'x'+size.height);
      await page.screenshot({path:path.join(report,'controls-jump-'+size.width+'.png')});
      await page.waitForFunction(()=>escape.player.body.isGrounded,null,{timeout:4000});
    }
    // Native multi-touch: keep the movement finger down while the other finger jumps.
    await page.setViewportSize({width:1080,height:1920});await page.waitForTimeout(300);
    await page.evaluate(()=>escape.player.Teleport(escape.home.position,escape.home.rotation));
    await page.waitForFunction(()=>escape.player.body.isGrounded,null,{timeout:3000});
    const cdp=await page.context().newCDPSession(page);
    const touch=(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points});
    const first={x:160,y:1750,id:11};
    await touch('touchStart',[first]);await page.waitForTimeout(100);
    first.y=1680;await touch('touchMove',[first]);await page.waitForTimeout(350);
    const yawBefore=await page.evaluate(()=>escape.player.cameraYaw.eulerAngles.y);
    await touch('touchStart',[first,{x:650,y:800,id:33}]);await page.waitForTimeout(100);
    await touch('touchMove',[first,{x:800,y:800,id:33}]);await page.waitForTimeout(250);
    check(await page.evaluate(y=>Math.abs(escape.player.cameraYaw.eulerAngles.y-y)>2&&escape.player.controls.Direction.y>.1,yawBefore),'second touch rotates camera while joystick remains held');
    await touch('touchEnd',[first]);await page.waitForTimeout(100);
    const ground=await state();
    await touch('touchStart',[first,{x:920,y:1750,id:22}]);
    await page.waitForFunction(y=>escape.player.transform.position.y>y+.25,ground.y,{timeout:3000});
    const jumping=await state();
    check(jumping.y>ground.y+.25&&jumping.input.y>.1,'second touch jumps while joystick finger remains held');
    await touch('touchEnd',[]);await page.waitForFunction(()=>Math.abs(escape.player.controls.Direction.x)+Math.abs(escape.player.controls.Direction.y)<.001,null,{timeout:3000});logs.push('RELEASE '+JSON.stringify(await state()));
    check(await page.evaluate(()=>Math.abs(escape.player.controls.Direction.x)+Math.abs(escape.player.controls.Direction.y)<.001),'releasing touches stops joystick');
    check(await page.evaluate(() => Playable.GameManager.Instance.RemainingTime > 0 && Playable.GameManager.Instance.RemainingTime < 30), 'End Time continues through tutorial and controls');
    await page.screenshot({path:path.join(report,'luna-running-portrait.png')});
    await page.evaluate(()=>escape.player.Teleport(escape.helmets[0].transform.position,escape.home.rotation));
    await page.waitForFunction(()=>escape.HasHelmet,null,{timeout:3000});
    check(await page.evaluate(()=>escape.player.helmetIndicator.activeSelf&&!escape.helmets[0].gameObject.activeSelf),'collecting red helmet shows shield and hides pickup');
    await page.screenshot({path:path.join(report,'luna-helmet-shield.png')});
    await page.evaluate(()=>escape.Hit(false));
    check(await page.evaluate(()=>!escape.HasHelmet&&!escape.player.helmetIndicator.activeSelf&&escape.player.canMove),'one impact consumes shield without killing player');
    check(audio.every(clip => !clip.error), 'all exported audio clips decode');
    check(errors.size===0, 'no browser runtime or shader errors');
  } catch(error) { logs.push('HARNESS '+error.stack); process.exitCode=1; }
  finally {
    fs.writeFileSync(path.join(report,'controls-check.txt'), [...logs,...errors].join('\n'));
    if(browser) await browser.close();server.close();
    console.log(logs.filter(line=>/^(PASS|FAIL|HARNESS)/.test(line)).join('\n'));
    console.log('Distinct browser errors: '+errors.size);
  }
})();
