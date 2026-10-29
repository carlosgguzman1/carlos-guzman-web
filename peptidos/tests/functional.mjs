import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const nodes=new Map();
const node=id=>{if(!nodes.has(id))nodes.set(id,{id,innerHTML:'',textContent:'',value:'',children:[],style:{},dataset:{},disabled:false,classList:{add(){},remove(){},toggle(){},contains(){return false}},setAttribute(){},appendChild(){},getBoundingClientRect(){return{top:0}},scrollIntoView(){},click(){}});return nodes.get(id)};
const context=vm.createContext({window:{addEventListener(){},scrollTo(){},scrollY:0,innerHeight:900},document:{getElementById:node,querySelectorAll(){return[]},querySelector(){return null},createElement(){return node('option')},documentElement:{dataset:{}}},localStorage:{getItem(){return null},setItem(){}},location:{hash:''},setTimeout(){},console});
vm.runInContext(fs.readFileSync('data.js','utf8'),context);
let code=fs.readFileSync('app.js','utf8');code=code.replace(/\}\)\(\);\s*$/, 'window.audit={P,AREAS,CATS,FC,renderDetail,fcBuild,mkQ,route};})();');vm.runInContext(code,context);
const a=context.window.audit;
assert.equal(a.P.length,152);assert.equal(new Set(a.P.map(p=>p.id)).size,152);
let links=0,flashCombinations=0,quizQuestions=0;
for(const p of a.P){
 a.renderDetail(p);const html=node('det').innerHTML;
 assert.ok(html.includes('Solo para propósitos educativos'),p.n+' missing notice');
 assert.ok(html.includes('Qué debes conocer'),p.n+' missing educational content');
 assert.ok(!/Farmacia Mia|para uso interno/.test(html),p.n+' old branding');
 assert.ok(!/^\s*(null|undefined|NaN)\s*$/m.test(html.replace(/<[^>]+>/g,'\n')),p.n+' missing value');
 for(const u of p.ci){assert.ok(/^https?:\/\//.test(u),p.n+' invalid URL');links++}
 for(const type of ['uso','nombre','estatus']){const q=a.mkQ(p,type,a.P);assert.ok(q.opts.includes(q.ans),p.n+' missing correct answer');assert.equal(q.opts.length,4);quizQuestions++}
}
for(const area of Object.keys(a.AREAS))for(const cat of Object.keys(a.CATS)){
 node('fcArea').value=area;node('fcCat').value=cat;a.fcBuild(false);flashCombinations++;
 assert.equal(a.FC.list.length,a.P.filter(p=>p.ar===area&&p.ca===cat).length);
 if(!a.FC.list.length)assert.equal(node('fcName').textContent,'Sin fichas para estos filtros');
}
context.location.hash='#%E0%A4%A';assert.doesNotThrow(()=>a.route());
assert.ok(!/Farmacia Mia/.test(fs.readFileSync('index.html','utf8')));
console.log(JSON.stringify({passed:true,details:152,flashcardFilterCombinations:flashCombinations,quizQuestions,citationURLStructures:links,invalidHashHandled:true,clinicalValidation:false},null,2));
