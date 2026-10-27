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
    await page.waitForTimeout(4000);
    check(await page.evaluate(() => Playable.GameManager.Instance.RemainingTime === 0), 'timer waits for tutorial in Luna');
    check(await page.evaluate(() => Playable.GameManager.Instance.PlayerSpeed === 5 && Playable.GameManager.Instance.EndTime === 30), 'default Player Speed 5 and End Time 30 exported');
    await page.screenshot({path:path.join(report,'luna-landscape.png')});
    await page.mouse.move(900,450);await page.mouse.down();await page.mouse.move(1000,450,{steps:8});await page.mouse.up();
    await page.waitForTimeout(500);
    await page.screenshot({path:path.join(report,'luna-camera-swipe.png')});
    await page.setViewportSize({width:1080,height:1920});await page.waitForTimeout(1000);
    await page.screenshot({path:path.join(report,'luna-portrait.png')});
    await page.mouse.move(160,1750);await page.mouse.down();await page.mouse.move(160,1690,{steps:8});
    await page.waitForTimeout(500);
    check(await page.evaluate(() => Playable.GameManager.Instance.RemainingTime === 0), 'joystick starts countdown before timer');
    await page.waitForFunction(() => Playable.GameManager.Instance.RemainingTime > 0, {timeout:30000});
    await page.waitForTimeout(700);await page.mouse.up();
    check(await page.evaluate(() => Playable.GameManager.Instance.RemainingTime > 0 && Playable.GameManager.Instance.RemainingTime < 30), 'Start begins countdown timer after joystick swipe');
    await page.screenshot({path:path.join(report,'luna-running-portrait.png')});
    check(audio.every(clip => !clip.error), 'all exported audio clips decode');
    check(errors.size===0, 'no browser runtime or shader errors');
  } catch(error) { logs.push('HARNESS '+error.stack); }
  finally {
    fs.writeFileSync(path.join(report,'luna-browser-check.txt'), [...logs,...errors].join('\n'));
    if(browser) await browser.close();server.close();
    console.log(logs.filter(line=>/^(PASS|FAIL|HARNESS)/.test(line)).join('\n'));
    console.log('Distinct browser errors: '+errors.size);
  }
})();
