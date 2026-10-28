import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const data=JSON.parse(fs.readFileSync(new URL('../dist/data.json',import.meta.url),'utf8'));
const elements=new Map();
const node=key=>{
 if(!elements.has(key))elements.set(key,{textContent:'',innerHTML:'',value:'',hidden:false,open:false,style:{},dataset:{},classList:{toggle(){}},addEventListener(){},setAttribute(){},scrollIntoView(){},focus(){},click(){},showModal(){this.open=true},close(){this.open=false}});
 return elements.get(key);
};
node('#peptide-data').textContent=JSON.stringify(data);
const location={hash:'',pathname:'/',search:'',origin:'https://example.test'};
const context=vm.createContext({
 document:{getElementById:id=>node('#'+id),querySelector:node,querySelectorAll:()=>[],addEventListener(){},documentElement:{dataset:{}},activeElement:{tagName:'BODY'}},
 window:{innerWidth:1200,isSecureContext:true,addEventListener(){}},
 history:{replaceState(_a,_b,path){location.hash=path.includes('#')?path.slice(path.indexOf('#')):''}},
 location,navigator:{},localStorage:{getItem(){return null},setItem(){}},URL,Blob,setTimeout,clearTimeout,console
});
vm.runInContext(fs.readFileSync(new URL('../content.js',import.meta.url),'utf8')+'\n'+fs.readFileSync(new URL('../app.js',import.meta.url),'utf8'),context);
const evaluate=code=>vm.runInContext(code,context);
assert.equal(evaluate('sourceText(null)'), '');
assert.equal(evaluate('sourceText(undefined)'), '');
assert.equal(evaluate('sourceText(" null ")'), '');
assert.equal(evaluate('joinSourceText(null,"Only available section")'), 'Only available section');
assert.equal(evaluate('joinSourceText("First section",null)'), 'First section');
assert.equal(evaluate('joinSourceText(null,null)'), '');
assert.equal(evaluate('sourceText("The null hypothesis was not rejected.")'), 'The null hypothesis was not rejected.');
assert.equal(evaluate('sourceSection("Empty",null)'), '');
assert.match(evaluate('sourceSection("Safety",null,"No safety information supplied")'), /No safety information supplied/);
assert.equal(evaluate('safeUrl("javascript:alert(1)")'),'#');
const strip=html=>html.replace(/<[^>]*>/g,'\n');
function checkRendered(html,where){
 assert.ok(html.length>100,where+' did not render');
 assert.ok(!/^\s*(?:null|undefined|nan|none)\s*$/im.test(strip(html)),where+' contains a standalone missing-value token');
 assert.ok(!/href="(?:null|undefined|javascript:)/i.test(html),where+' contains an unsafe/missing href');
 assert.ok(!/Farmacia MIA|FARMACIA MIA/.test(strip(html)),where+' contains the former brand');
}
let citationCount=0,missingSafety=0,abaloHtml='';
assert.equal(data.peptides.length,152);
assert.equal(new Set(data.peptides.map(p=>p.id)).size,152);
for(let i=0;i<data.peptides.length;i++){
 const p=data.peptides[i];
 for(const key of ['id','display_name','summary_es','class','mechanism','key_takeaway','fda_status','evidence_note'])assert.ok(typeof p[key]==='string'&&p[key].trim(),p.id+' missing '+key);
 assert.ok(p.area>=0&&p.area<8,p.id+' invalid system');
 assert.ok(['approved','trials','experimental','cosmetic'].includes(p.status),p.id+' invalid status');
 for(const c of p.citations){assert.ok(['http:','https:'].includes(new URL(c.url).protocol),p.id+' invalid citation');citationCount++}
 evaluate(`openDetail(${JSON.stringify(p.id)})`);
 const html=node('#detailContent').innerHTML;
 checkRendered(html,'detail '+p.id);
 assert.ok(html.includes('Solo para propósitos educativos'),p.id+' missing educational notice');
 assert.ok(html.includes('Seguridad y efectos adversos'),p.id+' missing safety section');
 assert.ok(html.includes('Hallazgos y estudios'),p.id+' missing research section');
 if(!p.side_effects_safety){assert.ok(html.includes('La falta de información no significa ausencia de riesgos'),p.id+' missing safety-gap explanation');missingSafety++}
 if(p.id==='abaloparatide'){abaloHtml=html;assert.ok(!html.includes('null\n'), 'Abaloparatide regression');assert.ok(p.what_it_is.startsWith('Abaloparatide is a synthetic'));assert.ok(!p.research_at_a_glance.includes('Performs better'))}
 const next=data.peptides[(i+1)%data.peptides.length];
 evaluate(`state.compared=${JSON.stringify([p.id,next.id])};compare()`);
 checkRendered(node('#infoContent').innerHTML,'comparison '+p.id);
}
evaluate('reset()');checkRendered(node('#cards').innerHTML,'initial cards');
for(let area=0;area<8;area++){
 evaluate(`selectArea(${area})`);
 const expected=data.peptides.filter(p=>p.area===area).length;
 assert.ok(node('#resultsCount').textContent.startsWith(expected+' fichas'), 'wrong count for system '+area);
 checkRendered(node('#cards').innerHTML,'system cards '+area);
}
evaluate('guide()');checkRendered(node('#infoContent').innerHTML,'guide');
evaluate('sources()');checkRendered(node('#infoContent').innerHTML,'sources');
evaluate('learning()');checkRendered(node('#infoContent').innerHTML,'learning');
assert.ok(abaloHtml.includes('Fuente primaria'));
console.log(JSON.stringify({passed:true,detail_views:152,comparison_views:152,systems:8,citation_urls_checked_for_valid_structure:citationCount,explicit_missing_safety_notices:missingSafety,regression:'Abaloparatide null field + missing-value composition'},null,2));
