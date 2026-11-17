import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve, extname, sep} from 'node:path';
const root = resolve(fileURLToPath(new URL('../site/', import.meta.url)));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const server = createServer(async (req,res) => {
  try {
    let path = resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname));
    if (!path.startsWith(root.endsWith(sep) ? root : root + sep) && path !== root) throw new Error('Invalid path');
    if ((await stat(path)).isDirectory()) path = resolve(path,'index.html');
    const data = await readFile(path);
    res.writeHead(200,{'Content-Type':types[extname(path)] || 'application/octet-stream'});
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch {
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});
    res.end('Page not found');
  }
});
server.listen(Number(process.env.PORT || 4173),'127.0.0.1',() => console.log(`Local: http://127.0.0.1:${server.address().port}/`));
