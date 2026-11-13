const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const path = require('path');

// Check by default. --apply is an explicit opt-in to editing the local Luna package.
const project = path.resolve(__dirname, '..');
const target = path.join(project, 'LocalPackages', '7.2.0', 'pipeline', 'Jakefile.js');
const source = fs.readFileSync(target, 'utf8');
const bootstrapEnd = source.indexOf(',((()=>');
if (bootstrapEnd < 0) throw new Error('Unknown Luna bundle format; nothing changed.');
const context = {};
vm.createContext(context);
vm.runInContext(source.slice(0, bootstrapEnd) + ');', context, { timeout: 5000 });
const decode = context._0x2965;
const methodPattern = /async\[_0x[\da-f]+\(0x945f\)\]\(_0x591c01\)\{[\s\S]*?(?=async\[_0x[\da-f]+\(0x63be\)\])/;
const match = source.match(methodPattern);
if (!match) throw new Error('Expected Luna 7.2.0 hash method not found; nothing changed.');
const original = match[0];
const header = original.slice(0, original.indexOf('{'));
const replacement = header + `{
    if (!_0x591c01 || !require('fs').existsSync(_0x591c01)) return;
    const stateHash = require('crypto').createHash('md5');
    for await (const chunk of require('fs').createReadStream(_0x591c01, { highWaterMark: 1024 * 1024 })) {
        stateHash.update(chunk.toString('hex'), 'utf8');
    }
    this.ProjectStateHash += stateHash.digest('hex');
}`;
const data = Buffer.alloc(1048593);
for (let i = 0; i < data.length; i++) data[i] = i % 251;
const expected = crypto.createHash('md5').update(data.toString('hex'), 'utf8').digest('hex');
const hashAsync = Object.getPrototypeOf(async function(){}).constructor;
const makeMethod = new hashAsync('_0x591c01', replacement.slice(replacement.indexOf('{') + 1, -1));
(async () => {
    const sandboxRequire = name => name === 'fs' ? {
        existsSync: () => true,
        createReadStream: async function* () {
            for (let i = 0; i < data.length; i += 97) yield data.subarray(i, i + 97);
        }
    } : require(name);
    const testMethod = new hashAsync('require', '_0x591c01', replacement.slice(replacement.indexOf('{') + 1, -1));
    const holder = { ProjectStateHash: 'previous-hash:' };
    await testMethod.call(holder, sandboxRequire, 'synthetic-buffer');
    if (holder.ProjectStateHash !== 'previous-hash:' + expected) throw new Error('Hash compatibility failed.');
    const patched = source.replace(original, replacement);
    new vm.Script(patched, { filename: target });
    console.log('PASS: replacement and full pipeline syntax; identical MD5 of hex data across chunks.');
    console.log('Hash input: ' + decode(0x713b) + '; encoding: ' + decode(0x4bdb));
    console.log('Only generateProjectStateHash would change; scene and gameplay are untouched.');
    if (process.argv.includes('--apply')) {
        const backup = path.join(__dirname, 'Jakefile.7.2.0.before-hash-fix.js.bak');
        if (fs.existsSync(backup)) throw new Error('Backup already exists; nothing changed.');
        fs.writeFileSync(backup, source);
        fs.writeFileSync(target, patched);
        console.log('Applied. Backup: ' + backup);
    } else {
        console.log('CHECK ONLY: Luna package was not modified.');
    }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
