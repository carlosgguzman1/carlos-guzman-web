import fs from 'node:fs';
if (!fs.existsSync('dist/index.html')) throw new Error('Falta dist/index.html');
const supplied=process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
if(supplied){
 const url=new URL(supplied);
 if(!['https:','http:'].includes(url.protocol))throw new Error('SITE_URL debe ser http o https');
 const origin=url.origin;
 for(const path of ['dist/index.html','dist/sitemap.xml','dist/robots.txt']){
  if(fs.existsSync(path))fs.writeFileSync(path,fs.readFileSync(path,'utf8').replaceAll('https://carlos-guzman-peptidos.carlitosgeral03.chatgpt.site',origin));
 }
 console.log(`Metadatos preparados para ${origin}`);
}
console.log('Sitio estático listo en dist');
