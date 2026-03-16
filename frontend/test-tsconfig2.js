const { readConfiguration } = require('@angular/compiler-cli');
const path = require('path');

// Test 1: full resolved path
const p1 = path.resolve(process.cwd(), 'tsconfig.app.json');
console.log('Test 1 - Full resolved path:', p1);
try {
    const r = readConfiguration(p1);
    console.log('Test 1: OK');
} catch (e) {
    console.log('Test 1 Error:', e.message.substring(0, 200));
}

// Test 2: just the filename with workspaceRoot from path.resolve
const wsRoot = process.cwd();
const tsConfigFullPath = path.resolve(wsRoot, 'tsconfig.app.json');
console.log('\nTest 2 - path.resolve(cwd, tsconfig.app.json):', tsConfigFullPath);
try {
    const r = readConfiguration(tsConfigFullPath);
    console.log('Test 2: OK');
} catch (e) {
    console.log('Test 2 Error:', e.message.substring(0, 200));
}

// Test 3: simulate what Angular workspace might provide (URL encoded)
const wsRootEncoded = wsRoot.replace(/ /g, '%20');
const p3 = path.resolve(wsRootEncoded, 'tsconfig.app.json');
console.log('\nTest 3 - URL encoded path:', p3);
try {
    const r = readConfiguration(p3);
    console.log('Test 3: OK');
} catch (e) {
    console.log('Test 3 Error:', e.message.substring(0, 200));
}

// Test 4: simulate file:// URL
const fileUrl = 'file:///' + wsRoot.replace(/\\/g, '/');
console.log('\nTest 4 - file URL:', fileUrl);
