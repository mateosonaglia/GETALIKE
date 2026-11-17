import {cp, mkdir, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
await rm(`${root}/dist`, {recursive:true, force:true});
await mkdir(`${root}/dist`, {recursive:true});
await cp(`${root}/site`, `${root}/dist`, {recursive:true});
console.log('GETALIKE is built in dist/.');
