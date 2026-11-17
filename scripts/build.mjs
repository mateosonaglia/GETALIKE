import {cp, mkdir, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
await rm(`${root}/dist`, {recursive:true, force:true});
await mkdir(`${root}/dist`, {recursive:true});
await cp(`${root}/site`, `${root}/dist`, {recursive:true});
if (process.env.VERCEL_ENV === 'preview') {
  const {readdir, readFile, writeFile} = await import('node:fs/promises');
  async function noindex(dir) {
    for (const entry of await readdir(dir,{withFileTypes:true})) {
      const path=`${dir}/${entry.name}`;
      if(entry.isDirectory()) await noindex(path);
      else if(entry.name.endsWith('.html')) await writeFile(path,(await readFile(path,'utf8')).replace('<head>','<head><meta name="robots" content="noindex,nofollow">'));
    }
  }
  await noindex(`${root}/dist`);
  const {writeFile: writeRobots} = await import('node:fs/promises');
  await writeRobots(`${root}/dist/robots.txt`, 'User-agent: *\nDisallow: /\n');
}
console.log('GETALIKE is built in dist/.');
