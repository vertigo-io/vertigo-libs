// Copies the build into vertigo-ui, in a folder named by the vue-dsfr version : head.html loads 3rdParty/dsfr/vue-dsfr@<version>/
// Two versions are shipped, as for quasar : the default one and the previous one (vueDsfrVersion param of vu:head).
// Only what head.html loads is shipped : the UMD script (and its source map, referenced by the script) and the css, not the ES module.
import { copyFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';

const version = JSON.parse(readFileSync('node_modules/@gouvminint/vue-dsfr/package.json', 'utf8')).version;
const target = `../vertigo-ui/src/main/resources/io/vertigo/ui/static/3rdParty/dsfr/vue-dsfr@${version}/`;

mkdirSync(target, { recursive: true });
for (const file of readdirSync('dist').filter(name => ['vertigo-dsfr.umd.js', 'vertigo-dsfr.umd.js.map', 'vertigo-dsfr.css'].includes(name))) {
    copyFileSync(`dist/${file}`, target + file);
}
console.log(`DSFR bundle copied into ${target}`);
