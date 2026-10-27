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
    await page.evaluate(()=>{const p=escape.helmets[0].transform.position;escape.player.Teleport(new UnityEngine.Vector3(p.x,p.y,p.z-3),escape.home.rotation);escape.player.cameraYaw.rotation=escape.home.rotation;});
    await page.waitForTimeout(300);
    await page.screenshot({path:path.join(report,'luna-red-helmet.png')});
    await page.mouse.move(160,910);await page.mouse.down();await page.waitForTimeout(200);await page.mouse.move(160,800);
    for(let i=0;i<6;i++){await page.waitForTimeout(300);logs.push('PICKUP '+await page.evaluate(()=>JSON.stringify({helmet:escape.HasHelmet,active:escape.helmets[0].gameObject.activeSelf,player:escape.player.transform.position,pickup:escape.helmets[0].transform.position,move:escape.player.canMove})));}
    await page.mouse.up();
    check(await page.evaluate(()=>escape.HasHelmet&&!escape.helmets[0].gameObject.activeSelf),'driving through red helmet collects it on Luna');
    check(await page.evaluate(()=>escape.player.helmetIndicator.activeSelf),'shield visible after physical pickup');
    await page.screenshot({path:path.join(report,'luna-helmet-shield-landscape.png')});
    await page.evaluate(()=>escape.player.Teleport(escape.cup.position,escape.home.rotation));
    await page.waitForFunction(()=>!escape.cup.gameObject.activeSelf,null,{timeout:3000});
    check(await page.evaluate(()=>escape.manager.HasEnded&&!escape.IsRunning),'cup proximity collection hides cup and ends gameplay');
    check(errors.size===0,'no browser runtime or shield shader errors');
  } catch(error) { logs.push('HARNESS '+error.stack); process.exitCode=1; }
  finally {
    fs.writeFileSync(path.join(report,'helmet-check.txt'), [...logs,...errors].join('\n'));
    if(browser) await browser.close();server.close();
    console.log(logs.filter(line=>/^(PASS|FAIL|HARNESS)/.test(line)).join('\n'));
    console.log('Distinct browser errors: '+errors.size);
  }
})();
