const { readConfiguration } = require('@angular/compiler-cli');
const path = require('path');
const p = path.resolve(process.cwd(), 'tsconfig.json');
console.log('Resolved path:', p);
const fs = require('fs');
console.log('Exists:', fs.existsSync(p));
try {
    const r = readConfiguration(p);
    console.log('OK - config read successfully');
} catch (e) {
    console.log('Error:', e.message);
}
