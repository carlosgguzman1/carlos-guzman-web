import fs from 'node:fs';
fs.mkdirSync('dist/vendor',{recursive:true});
for(const p of ['index.html','personal.css','app.js','body3d.js','data.js','favicon.svg','anatomy-fallback.webp','vendor/three.min.js'])fs.copyFileSync(p,'dist/'+p);
console.log('Carlos Guzmán · Péptidos 3.0 listo');
