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
    await page.evaluate(()=>{window.escape=Playable.GameManager.Instance.CountdownExpired['$invocationList'][0]['$scope'];escape.manager._endTime=120;escape.manager.CountdownEndGame();});
    await page.waitForFunction(()=>escape.IsRunning,null,{timeout:30000});
    await page.evaluate(()=>{escape.countdown.gameObject.SetActive(true);escape.countdown.text='3 2 1 Start';escape.hint.text='Swipe camera';escape.hint.gameObject.SetActive(true);});
    await page.waitForTimeout(300);
    await page.screenshot({path:path.join(report,'luna-static-font-landscape.png')});
    const data=await page.evaluate(()=>({fontMode:escape.hint.font.atlasPopulationMode,hint:escape.hint.text,hintCharacters:escape.hint.textInfo.characterCount,countdownCharacters:escape.countdown.textInfo.characterCount}));
    logs.push('FONT '+JSON.stringify(data));
    check(data.fontMode===0,'Font atlas exported as Static');
    check(data.hintCharacters>=11&&data.countdownCharacters>=10,'Tutorial and countdown text produce characters');
    await page.evaluate(()=>{escape.countdown.gameObject.SetActive(false);escape.cupProgress.AddKeyboardCup();});
    await page.setViewportSize({width:540,height:960});await page.waitForTimeout(200);
    await page.evaluate(()=>escape.cupProgress.AddKeyboardCup());
    await page.screenshot({path:path.join(report,'luna-static-font-portrait.png')});
    check(!logs.some(x=>x.includes('FontEngine.LoadFontFace')),'No dynamic FontEngine.LoadFontFace warning');
    check(errors.size===0,'No runtime errors');
  } catch(error){logs.push('FAIL '+error.stack);process.exitCode=1;}
  finally{logs.push(...errors);fs.writeFileSync(path.join(report,'static-font-luna-check.txt'),logs.join('\n'));if(browser)await browser.close();server.close();console.log(logs.join('\n'));}
})();
