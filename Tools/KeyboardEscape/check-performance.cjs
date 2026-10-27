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
    await page.addInitScript(()=>{window.__drawCalls=0;for(const type of [window.WebGLRenderingContext,window.WebGL2RenderingContext])if(type)for(const name of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']){const original=type.prototype[name];if(original)type.prototype[name]=function(...args){window.__drawCalls++;return original.apply(this,args);};}});
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
    const sample=await page.evaluate(async()=>{
      const app=window.app.app;
      const durations=[],draws=[];let last=performance.now(),lastDraw=window.__drawCalls;
      for(let i=0;i<60;i++)await new Promise(resolve=>requestAnimationFrame(now=>{durations.push(now-last);draws.push(window.__drawCalls-lastDraw);lastDraw=window.__drawCalls;last=now;resolve();}));
      durations.sort((a,b)=>a-b);draws.sort((a,b)=>a-b);
      const stats=app.stats||{};
      return {medianDrawCalls:draws[30],medianFrameMs:durations[30],p95FrameMs:durations[57],drawCalls:stats.drawCalls,frame:stats.frame,statsKeys:Object.keys(stats)};
    });
    fs.writeFileSync(path.join(report,process.env.PERF_LABEL||'performance-baseline.json'),JSON.stringify(sample,null,2));
    logs.push('PERFORMANCE '+JSON.stringify(sample));
  } catch(error) { logs.push('HARNESS '+error.stack); process.exitCode=1; }
  finally {
    fs.writeFileSync(path.join(report,'performance-browser-log.txt'), [...logs,...errors].join('\n'));
    if(browser) await browser.close();server.close();
    console.log(logs.filter(line=>/^(PASS|FAIL|HARNESS)/.test(line)).join('\n'));
    console.log('Distinct browser errors: '+errors.size);
  }
})();
