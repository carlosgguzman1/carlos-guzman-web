(function(){
'use strict';
var P = window.PEPTIDOS || [];
var AREAS = {
  cerebro:{n:'Cerebro y sueño',s:'Cer',x:100,y:40},
  hormonas:{n:'Hormonas y metabolismo',s:'Hor',x:68,y:100},
  inmune:{n:'Inmune y defensa',s:'Inm',x:132,y:100},
  corazon:{n:'Corazón y sangre',s:'Cor',x:100,y:135},
  digestivo:{n:'Digestivo y peso',s:'Dig',x:100,y:182},
  piel:{n:'Piel y envejecimiento',s:'Piel',x:162,y:196},
  sexual:{n:'Sexual y reproductivo',s:'Sex',x:100,y:228},
  huesos:{n:'Huesos y músculos',s:'Hue',x:80,y:318}
};
var CATS = {fda:{n:'FDA*',l:'Aprobación reportada*',c:'var(--fda)'},ensayos:{n:'Ensayos',l:'En ensayos clínicos',c:'var(--ens)'},wellness:{n:'Experimental',l:'Experimental / no aprobado',c:'var(--well)'},cosmetico:{n:'Cosmético',l:'Cosmético tópico',c:'var(--cos)'}};
var EVS = {fda:{n:'Aprobación reportada*',lv:4},alta:{n:'Evidencia alta',lv:3},moderada:{n:'Evidencia moderada',lv:2},baja:{n:'Evidencia baja',lv:1}};

// ---------- storage (per-viewer, safe) ----------
var KEY='fm-peptidos-v1';
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
var S=load(); S.known=S.known||{}; S.hist=S.hist||[]; S.name=S.name||'';
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

function $(id){return document.getElementById(id)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function catTag(p){return '<span class="tag t-'+p.ca+'">'+CATS[p.ca].n+'</span>'}
function evTag(p){var e=EVS[p.ev];return '<span class="tag o e-'+p.ev+'"><span class="bar l'+e.lv+'"><i></i><i></i><i></i><i></i></span> '+e.n+'</span>'}
function byId(id){for(var i=0;i<P.length;i++)if(P[i].id===id)return P[i]}

// ---------- rutas (hash) ----------
var views=['lib','det','fc','quiz','prog'];
var ROUTE={lib:'biblioteca',fc:'flashcards',quiz:'quiz',prog:'progreso'};
var RROUTE={};Object.keys(ROUTE).forEach(function(k){RROUTE[ROUTE[k]]=k});
function slug(s){return norm(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
var BYSLUG={};P.forEach(function(p){var s=slug(p.n),b=s,i=2;while(BYSLUG[s]){s=b+'-'+(i++)}p.sl=s;BYSLUG[s]=p});
var libY=0,cur='lib';
function show(v,keepScroll){if(cur==='lib'&&v!=='lib')libY=window.scrollY;
  views.forEach(function(x){$('v-'+x).classList.toggle('hidden',x!==v)});
  Array.prototype.forEach.call(document.querySelectorAll('#tabs button'),function(b){b.classList.toggle('on',b.dataset.v===(v==='det'?'lib':v))});
  if(v==='prog')renderProg(); if(v==='fc')fcRender();
  var y=(v==='lib'&&cur!=='lib')?libY:0;cur=v;if(!keepScroll)window.scrollTo(0,y);}
function go(h){if(location.hash==='#'+h)route();else location.hash=h}
function route(){var h;try{h=decodeURIComponent((location.hash||'').slice(1))}catch(e){h='biblioteca'};
  if(h.indexOf('p-')===0&&BYSLUG[h.slice(2)]){renderDetail(BYSLUG[h.slice(2)]);show('det');return}
  show(RROUTE[h]||'lib')}
window.addEventListener('hashchange',route);
Array.prototype.forEach.call(document.querySelectorAll('#tabs button'),function(b){b.onclick=function(){go(ROUTE[b.dataset.v])}});

// ---------- library ----------
var F={area:null,cat:null,ev:null,q:'',sort:'az'};
function countBy(k){var o={};P.forEach(function(p){o[p[k]]=(o[p[k]]||0)+1});return o}
var cA=countBy('ar'),cC=countBy('ca'),cE=countBy('ev');

$('stats').innerHTML=[[P.length,'fichas'],[cC.fda,'aprobación*'],[cC.ensayos,'en ensayos'],[cC.wellness,'experimentales'],[cC.cosmetico,'cosméticos']]
  .map(function(s){return '<div class="stat"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>'}).join('');

function chips(el,map,counts,key,dotFn){el.innerHTML=Object.keys(map).map(function(k){return '<button class="chip" data-k="'+k+'">'+(dotFn?dotFn(k):'')+esc(map[k].l||map[k].n)+' <span class="n">'+(counts[k]||0)+'</span></button>'}).join('');
  Array.prototype.forEach.call(el.children,function(b){b.onclick=function(){setF(key,b.dataset.k)}})}
chips($('areaChips'),AREAS,cA,'area');
chips($('catChips'),CATS,cC,'cat',function(k){return '<span class="dot" style="background:'+CATS[k].c+'"></span>'});
chips($('evChips'),EVS,cE,'ev');

function setF(k,v){F[k]=(F[k]===v)?null:v;renderLib()}
window.FM={areas:AREAS,counts:cA,getArea:function(){return F.area},pick:function(k){if(cur!=='lib')go('biblioteca');setF('area',k);var g=$('count');if(g&&g.getBoundingClientRect().top>window.innerHeight-120)g.scrollIntoView({behavior:'smooth',block:'start'})}};
$('q').oninput=function(){F.q=this.value;renderLib()};
$('sort').onchange=function(){F.sort=this.value;renderLib()};

function hay(p){return norm([p.n,p.al,p.cl,p.u,p.c,p.m,(p.x&&p.x.r)||'',AREAS[p.ar].n,CATS[p.ca].l].join(' '))}
P.forEach(function(p){p._h=hay(p)});

function filtered(){var q=norm(F.q).trim().split(/\s+/).filter(Boolean);
  var r=P.filter(function(p){if(F.area&&p.ar!==F.area)return false;if(F.cat&&p.ca!==F.cat)return false;if(F.ev&&p.ev!==F.ev)return false;
    return q.every(function(w){return p._h.indexOf(w)>=0})});
  if(F.sort==='az')r.sort(function(a,b){return a.n.localeCompare(b.n,'es')});
  if(F.sort==='ev')r.sort(function(a,b){return EVS[b.ev].lv-EVS[a.ev].lv||a.n.localeCompare(b.n,'es')});
  if(F.sort==='ar')r.sort(function(a,b){return AREAS[a.ar].n.localeCompare(AREAS[b.ar].n,'es')||a.n.localeCompare(b.n,'es')});
  return r}

function renderLib(){
  if(window.Body3D)Body3D.setActive(F.area);
  [['areaChips','area'],['catChips','cat'],['evChips','ev']].forEach(function(x){Array.prototype.forEach.call($(x[0]).children,function(b){b.classList.toggle('on',b.dataset.k===F[x[1]])})});
  var r=filtered();
  var act=[F.area&&AREAS[F.area].n,F.cat&&CATS[F.cat].l,F.ev&&EVS[F.ev].n].filter(Boolean);
  $('count').innerHTML=r.length+' resultado'+(r.length===1?'':'s')+(act.length?' · '+esc(act.join(' · '))+' · <a href="#" id="clr">limpiar filtros</a>':'');
  var clr=$('clr');if(clr)clr.onclick=function(e){e.preventDefault();F.area=F.cat=F.ev=null;renderLib()};
  $('grid').innerHTML=r.length?r.map(function(p){return '<button class="pc" data-id="'+p.id+'">'+(S.known[p.id]?'<span class="done" title="Dominado">✓</span>':'')+
    '<h4>'+esc(p.n)+'</h4>'+(p.al?'<div class="al">'+esc(p.al)+'</div>':'')+'<p>'+esc(p.u)+'</p><div class="tags">'+catTag(p)+evTag(p)+'</div></button>'}).join('')
    :'<p class="hint">No hay resultados. Prueba con otra palabra o limpia los filtros.</p>';
  Array.prototype.forEach.call($('grid').children,function(b){if(b.dataset.id)b.onclick=function(){go('p-'+byId(+b.dataset.id).sl)}});
}

// ---------- ficha completa ----------
var CATCOL={fda:'var(--fda)',ensayos:'var(--ens)',wellness:'var(--well)',cosmetico:'var(--cos)'};
var CATDESC={fda:'Aprobación reportada por la fuente*',ensayos:'En investigación clínica',wellness:'No aprobado por la FDA',cosmetico:'Ingrediente cosmético'};
var EVTXT={fda:'La fuente reporta una aprobación regulatoria. La aprobación y la calidad de la evidencia deben interpretarse por separado y para una indicación concreta.',alta:'Varios ensayos humanos de buena calidad apuntan en la misma dirección.',moderada:'Hay estudios en humanos, pero son pocos, pequeños o sin replicar.',baja:'Casi toda la evidencia es animal, de laboratorio o de estudios humanos que fallaron.'};
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function art(p){var r=hash(p.n),n=7+(r%7),W=260,H=160,pts=[],col=CATCOL[p.ca];
  function rnd(){r=(Math.imul(r,1103515245)+12345)>>>0;return r/4294967296}
  for(var i=0;i<n;i++){var x=24+i*(W-48)/(n-1),y=H/2+Math.sin(i*1.1+rnd()*2)*38;pts.push([x,y])}
  var path='M'+pts.map(function(q){return q[0].toFixed(1)+' '+q[1].toFixed(1)}).join(' L');
  var beads=pts.map(function(q,i){var big=rnd()>.55,rad=big?13:9;
    return '<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+rad+'" fill="'+(i%3===0?col:'var(--panel)')+'" stroke="'+col+'" stroke-width="2.5"/>'+
    (rnd()>.5?'<line x1="'+q[0].toFixed(1)+'" y1="'+(q[1]+rad).toFixed(1)+'" x2="'+q[0].toFixed(1)+'" y2="'+(q[1]+rad+12).toFixed(1)+'" stroke="'+col+'" stroke-width="2" stroke-linecap="round"/><circle cx="'+q[0].toFixed(1)+'" cy="'+(q[1]+rad+16).toFixed(1)+'" r="4" fill="'+col+'"/>':'')}).join('');
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Ilustración de cadena de aminoácidos"><path d="'+path+'" fill="none" stroke="'+col+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>'+beads+'</svg>'}
function li(arr){return (arr||[]).map(function(x){return '<li>'+esc(x)+'</li>'}).join('')}
function renderDetail(p){var x=p.x||{},area=AREAS[p.ar],lv=EVS[p.ev].lv;
  var secs=[['res','Resumen'],['vistazo','De un vistazo'],['como','¿Cómo funciona?'],['fda','¿Está aprobado?'],['inv','Investigación'],['seg','Seguridad'],['dosis','Administración'],['personal','Qué debes conocer'],['fuentes','Fuentes']];
  var rel=P.filter(function(q){return q.ar===p.ar&&q.id!==p.id}).sort(function(a,b){return (a.ca===p.ca?0:1)-(b.ca===p.ca?0:1)||EVS[b.ev].lv-EVS[a.ev].lv}).slice(0,6);
  var list=P.slice().sort(function(a,b){return a.n.localeCompare(b.n,'es')}),ix=list.indexOf(p),prev=list[(ix-1+list.length)%list.length],next=list[(ix+1)%list.length];
  var segs='';for(var i=1;i<=4;i++)segs+='<i style="'+(i<=lv?'background:'+(p.ev==='baja'?'var(--baja)':p.ev==='moderada'?'var(--mod)':'var(--alta)'):'')+'"></i>';
  var h='<nav class="crumbs" aria-label="Ruta"><a href="#biblioteca">Biblioteca</a><span>›</span><a href="#biblioteca" data-area="'+p.ar+'">'+esc(area.n)+'</a><span>›</span><span>'+esc(p.n)+'</span></nav>'+
  '<div class="dgrid"><article>'+
  '<header class="dhero"><div><span class="eyebrow">'+esc(area.n)+'</span><h1>'+esc(p.n)+'</h1>'+(p.al?'<div class="alias">También conocido como '+esc(p.al)+'</div>':'<div class="alias">'+esc(p.cl)+'</div>')+
   '<div class="tags">'+catTag(p)+evTag(p)+(p.al?'<span class="tag o">'+esc(p.cl)+'</span>':'')+'</div>'+
   '<div class="byline">Carlos Guzmán · Guía educativa</div><button class="btn mkb mkm'+(S.known[p.id]?' ghost':'')+'" type="button">'+(S.known[p.id]?'✓ Dominado':'Marcar como dominado')+'</button></div><div class="art">'+art(p)+'</div></header>'+
  '<div class="public-notice"><strong>Solo para propósitos educativos.</strong> No constituye consejo médico, diagnóstico ni prescripción. La clasificación y las referencias proceden de la fuente original; revisión clínica integral pendiente.</div>'+
  '<section class="dsec" id="s-res" style="padding-top:0"><div class="takeaway"><span class="eyebrow">Punto clave</span><p>'+esc(x.r||p.u)+'</p></div></section>'+
  '<section class="dsec" id="s-vistazo"><h2>De un vistazo</h2><table class="glance"><tbody>'+
   '<tr><th>Para qué se usa</th><td>'+esc(p.u)+'</td></tr>'+
   '<tr><th>Estatus FDA</th><td>'+esc(CATDESC[p.ca])+'</td></tr>'+
   '<tr><th>Qué es</th><td>'+esc(x.q||p.cl)+'</td></tr>'+
   '<tr><th>Marca / vía</th><td>'+esc(p.m)+'</td></tr>'+
   (x.e&&x.e.length?'<tr><th>Estudio clave</th><td>'+esc(x.e[0][0])+': '+esc(x.e[0][2])+'</td></tr>':'')+
   '<tr><th>Evidencia</th><td><span class="e-'+p.ev+'" style="font-weight:700">'+esc(EVS[p.ev].n)+'</span></td></tr>'+
  '</tbody></table></section>'+
  '<section class="dsec" id="s-como"><h2>¿Cómo funciona?</h2><p>'+esc(x.m||p.c)+'</p>'+(x.mp&&x.mp.length?'<ol class="steps">'+li(x.mp)+'</ol>':'')+'</section>'+
  '<section class="dsec" id="s-fda"><h2>¿Está aprobado por la FDA?</h2><p>'+esc(x.f||CATDESC[p.ca])+'</p>'+
   '<div class="statcard"><div class="ic" style="background:'+CATCOL[p.ca]+'">'+(p.ca==='fda'?'✓':p.ca==='ensayos'?'⚗':p.ca==='cosmetico'?'◌':'!')+'</div><div><div class="hint">Estatus regulatorio</div><div class="big2">'+esc(CATS[p.ca].l)+'</div></div></div></section>'+
  '<section class="dsec" id="s-inv"><h2>¿Qué dice la investigación?</h2>'+
   (x.e&&x.e.length?'<div class="tscroll"><table class="etab"><thead><tr><th>Estudio</th><th>Población / diseño</th><th>Resultado</th></tr></thead><tbody>'+x.e.map(function(r){return '<tr><td>'+esc(r[0])+'</td><td>'+esc(r[1])+'</td><td>'+esc(r[2])+'</td></tr>'}).join('')+'</tbody></table></div>':'')+
   '<div class="meter"><div><div class="segs">'+segs+'</div><div class="lbl e-'+p.ev+'" style="margin-top:6px">'+esc(EVS[p.ev].n)+'</div></div><p>'+esc(x.en||EVTXT[p.ev])+'</p></div></section>'+
  '<section class="dsec" id="s-seg"><h2>Efectos secundarios y seguridad</h2><div class="safe">'+
   '<div><h4>Efectos comunes</h4><ul>'+(x.s&&x.s.length?li(x.s):'<li>Ver etiqueta del producto.</li>')+'</ul></div>'+
   '<div class="warn"><h4>Advertencias importantes</h4><ul>'+(x.sg&&x.sg.length?li(x.sg):'<li>'+esc(p.a)+'</li>')+'</ul></div></div></section>'+
  '<section class="dsec" id="s-dosis"><h2>Administración y contexto</h2><div class="dosebox"><b>'+esc(p.m)+'</b><br>'+esc('La vía descrita es contexto de la fuente, no una instrucción de uso. Consulta la etiqueta oficial y a un profesional de salud.')+'</div>'+
   '<p class="hint" style="margin-top:10px">Esta guía no proporciona pautas de dosificación personal.</p></section>'+
  '<section class="dsec" id="s-personal"><div class="staff"><h2>Qué debes conocer</h2><ul>'+li([p.a,'Un mecanismo biológico o un resultado de laboratorio no demuestra por sí solo un beneficio en personas.'])+'</ul></div></section>'+
  '<section class="dsec"><h2>Más de '+esc(area.n.toLowerCase())+'</h2><div class="related">'+rel.map(function(q){return '<a href="#p-'+q.sl+'"><b>'+esc(q.n)+'</b><span>'+esc(q.u)+'</span></a>'}).join('')+'</div></section>'+
  '<section class="dsec" id="s-fuentes"><h2>Fuentes</h2>'+(p.ci.length?'<ol class="cites">'+p.ci.map(function(u){return '<li><a href="'+esc(u)+'" target="_blank" rel="noopener">'+esc(u.replace(/^https?:\/\/(www\.)?/,'').replace(/\?.*$/,''))+'</a></li>'}).join('')+'</ol>':'<p class="hint">Sin fuentes listadas.</p>')+
   '<p class="hint" style="margin-top:12px">Solo para propósitos educativos. Referencias importadas; no verificadas individualmente. No sustituye la evaluación de un profesional de salud.</p></section>'+
  '<nav class="pnav"><a href="#p-'+prev.sl+'"><span>← Anterior</span>'+esc(prev.n)+'</a><a href="#p-'+next.sl+'"><span>Siguiente →</span>'+esc(next.n)+'</a></nav>'+
  '</article><aside class="toc"><h5>En esta ficha</h5>'+secs.map(function(s){return '<a href="#p-'+p.sl+'" data-s="s-'+s[0]+'">'+s[1]+'</a>'}).join('')+
   '<button class="btn mkb'+(S.known[p.id]?' ghost':'')+'" id="mk" type="button">'+(S.known[p.id]?'✓ Dominado':'Marcar como dominado')+'</button></aside></div>';
  $('det').innerHTML=h;
  Array.prototype.forEach.call(document.querySelectorAll('.toc a'),function(a){a.onclick=function(e){e.preventDefault();var t=$(a.dataset.s);if(t)t.scrollIntoView({behavior:'smooth',block:'start'})}});
  var ca=document.querySelector('.crumbs a[data-area]');if(ca)ca.onclick=function(){F.area=p.ar;F.cat=F.ev=null;renderLib();libY=0};
  Array.prototype.forEach.call(document.querySelectorAll('#det .mkb'),function(btn){btn.onclick=function(){toggleKnown(p.id);Array.prototype.forEach.call(document.querySelectorAll('#det .mkb'),function(x){x.textContent=S.known[p.id]?'✓ Dominado':'Marcar como dominado';x.classList.toggle('ghost',!!S.known[p.id])});renderLib()}});
}
function tocSpy(){if(cur!=='det')return;var links=document.querySelectorAll('.toc a'),on=null;
  Array.prototype.forEach.call(links,function(a){var t=$(a.dataset.s);if(t&&t.getBoundingClientRect().top<140)on=a});
  Array.prototype.forEach.call(links,function(a){a.classList.toggle('on',a===on)})}
window.addEventListener('scroll',tocSpy,{passive:true});
function toggleKnown(id){if(S.known[id])delete S.known[id];else S.known[id]=1;save()}

// ---------- flashcards ----------
function fillSel(el,all){el.innerHTML='<option value="">'+all+'</option>'}
fillSel($('fcArea'),'Todos los sistemas');fillSel($('qArea'),'Todos los sistemas');fillSel($('fcCat'),'Todos los estatus');
Object.keys(AREAS).forEach(function(k){['fcArea','qArea'].forEach(function(s){var o=document.createElement('option');o.value=k;o.textContent=AREAS[k].n;$(s).appendChild(o)})});
Object.keys(CATS).forEach(function(k){var o=document.createElement('option');o.value=k;o.textContent=CATS[k].l;$('fcCat').appendChild(o)});
var FC={list:[],i:0};
function fcBuild(sh){var a=$('fcArea').value,c=$('fcCat').value;
  var l=P.filter(function(p){return(!a||p.ar===a)&&(!c||p.ca===c)});
  l.sort(function(x,y){return x.n.localeCompare(y.n,'es')});FC.list=sh?shuffle(l):l;FC.i=0;FC.initialized=true;fcRender()}
function fcRender(){if(!FC.initialized){FC.initialized=true;fcBuild(false);return}if(!FC.list.length){$('fcNum').textContent='0 / 0';$('fcName').textContent='Sin fichas para estos filtros';$('fcAl').textContent='Selecciona otro sistema o clasificación.';$('fcTags').innerHTML='';$('fcBack').textContent='No hay fichas en esta combinación.';$('fcBar').style.width='0%';$('fcPrev').disabled=$('fcNext').disabled=$('fcKnow').disabled=true;return}$('fcKnow').disabled=false;
  var p=FC.list[FC.i];$('flash').classList.remove('flip');
  $('fcNum').textContent=(FC.i+1)+' / '+FC.list.length;$('fcName').textContent=p.n;$('fcAl').textContent=p.al||'';
  $('fcTags').innerHTML=catTag(p);
  $('fcBack').innerHTML='<h5 class="hint" style="margin:0">PARA QUÉ SE USA</h5><p style="margin:0 0 6px;font-size:17px"><b>'+esc(p.u)+'</b></p>'+
   '<h5 class="hint" style="margin:0">CÓMO FUNCIONA</h5><p style="margin:0 0 6px">'+esc(p.c)+'</p><h5 class="hint" style="margin:0">MARCA / VÍA</h5><p style="margin:0 0 6px">'+esc(p.m)+'</p><p class="alert" style="margin:0;font-size:13px">'+esc(p.a)+'</p>';
  $('fcBar').style.width=((FC.i+1)/FC.list.length*100)+'%';
  $('fcKnow').textContent=S.known[p.id]?'✓ Dominado':'✓ Lo domino';$('fcKnow').classList.toggle('ghost',!!S.known[p.id]);
  $('fcPrev').disabled=FC.i===0;$('fcNext').disabled=FC.i===FC.list.length-1}
$('flash').onclick=function(){this.classList.toggle('flip');this.setAttribute('aria-pressed',String(this.classList.contains('flip')))};$('flash').onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();this.click()}};
$('fcPrev').onclick=function(){if(FC.i>0){FC.i--;fcRender()}};
$('fcNext').onclick=function(){if(FC.i<FC.list.length-1){FC.i++;fcRender()}};
$('fcKnow').onclick=function(){var p=FC.list[FC.i];if(!p)return;if(!S.known[p.id]){S.known[p.id]=1;save()}if(FC.i<FC.list.length-1)FC.i++;fcRender();renderLib()};
$('fcArea').onchange=$('fcCat').onchange=function(){fcBuild(false)};
$('fcShuffle').onclick=function(){fcBuild(true)};

// ---------- quiz ----------
var Q={qs:[],i:0,ok:0,wrong:[]};
$('qName').value=S.name;
var STAT_OPTS=Object.keys(CATS).map(function(k){return CATS[k].l});
function mkQ(p,type,pool){
  var others=shuffle(pool.filter(function(x){return x.id!==p.id&&x.u!==p.u&&x.n!==p.n}));
  if(type==='uso')return{p:p,text:'¿Para qué se usa <b>'+esc(p.n)+'</b>?',opts:shuffle([p.u].concat(others.slice(0,3).map(function(x){return x.u}))),ans:p.u};
  if(type==='nombre')return{p:p,text:'¿Qué péptido se usa para: <i>'+esc(p.u)+'</i>',opts:shuffle([p.n].concat(others.slice(0,3).map(function(x){return x.n}))),ans:p.n};
  return{p:p,text:'Según la clasificación de la fuente, ¿cuál es el estatus de <b>'+esc(p.n)+'</b>?',opts:STAT_OPTS.slice(),ans:CATS[p.ca].l};
}
$('qGo').onclick=function(){S.name=$('qName').value.trim();save();
  var a=$('qArea').value,t=$('qType').value;var pool=P.filter(function(p){return !a||p.ar===a});
  var all=P; var pick=shuffle(pool).slice(0,Math.min(10,pool.length));
  Q={qs:pick.map(function(p,i){var ty=t==='mix'?['uso','nombre','estatus'][i%3]:t;return mkQ(p,ty,pool.length>=4?pool:all)}),i:0,ok:0,wrong:[],area:a};
  $('qStart').classList.add('hidden');$('qEnd').classList.add('hidden');$('qRun').classList.remove('hidden');qRender()};
function qRender(){var q=Q.qs[Q.i];$('qNum').textContent='Pregunta '+(Q.i+1)+' de '+Q.qs.length;$('qScore').textContent=Q.ok+' correctas';
  $('qBar').style.width=(Q.i/Q.qs.length*100)+'%';$('qText').innerHTML=q.text;$('qFb').classList.add('hidden');$('qNext').classList.add('hidden');
  $('qOpts').innerHTML=q.opts.map(function(o,i){return '<button class="opt" data-i="'+i+'">'+esc(o)+'</button>'}).join('');
  Array.prototype.forEach.call($('qOpts').children,function(b){b.onclick=function(){qAnswer(b)}})}
function qAnswer(b){var q=Q.qs[Q.i];var pick=q.opts[+b.dataset.i];var right=pick===q.ans;
  Array.prototype.forEach.call($('qOpts').children,function(x){x.disabled=true;if(q.opts[+x.dataset.i]===q.ans)x.classList.add('ok')});
  if(right)Q.ok++;else{b.classList.add('bad');Q.wrong.push(q.p.id)}
  $('qFb').innerHTML=(right?'<b>¡Correcto!</b> ':'<b>Respuesta: '+esc(q.ans)+'</b><br>')+esc(q.p.n)+' — '+esc(q.p.c)+' <a href="#p-'+q.p.sl+'">Ver ficha</a>';$('qFb').classList.remove('hidden');
  $('qNext').textContent=Q.i===Q.qs.length-1?'Ver resultado':'Siguiente';$('qNext').classList.remove('hidden');$('qScore').textContent=Q.ok+' correctas'}
$('qNext').onclick=function(){if(Q.i<Q.qs.length-1){Q.i++;qRender()}else qFinish()};
function qFinish(){var pct=Math.round(Q.ok/Q.qs.length*100);
  S.hist.unshift({d:new Date().toISOString(),n:S.name||'—',a:Q.area?AREAS[Q.area].n:'Todos',s:Q.ok,t:Q.qs.length});S.hist=S.hist.slice(0,50);save();
  $('qRun').classList.add('hidden');$('qEnd').classList.remove('hidden');$('qFinal').textContent=Q.ok+'/'+Q.qs.length;
  $('qMsg').textContent=pct>=90?'¡Excelente! Dominas este tema.':pct>=70?'Bien. Repasa las falladas.':'Sigue practicando con las flashcards.';
  $('qReview').classList.toggle('hidden',!Q.wrong.length)}
$('qAgain').onclick=function(){$('qEnd').classList.add('hidden');$('qStart').classList.remove('hidden')};
$('qReview').onclick=function(){FC.list=Q.wrong.map(byId);FC.i=0;FC.initialized=true;go('flashcards');};

// ---------- progress ----------
function renderProg(){var k=Object.keys(S.known).length;var best=S.hist.reduce(function(m,h){return Math.max(m,Math.round(h.s/h.t*100))},0);
  $('pStats').innerHTML=[[k+'/'+P.length,'dominados'],[S.hist.length,'quizzes tomados'],[S.hist.length?best+'%':'—','mejor resultado']].map(function(s){return '<div class="stat"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>'}).join('');
  $('pAreas').innerHTML=Object.keys(AREAS).map(function(a){var tot=cA[a],d=P.filter(function(p){return p.ar===a&&S.known[p.id]}).length;
    return '<div style="margin:8px 0"><div class="row" style="justify-content:space-between"><span>'+esc(AREAS[a].n)+'</span><span class="hint">'+d+'/'+tot+'</span></div><div class="prog" style="margin:4px 0"><i style="width:'+(d/tot*100)+'%"></i></div></div>'}).join('');
  $('pHist').innerHTML=S.hist.length?'<table class="hist"><tr><th>Fecha</th><th>Nombre</th><th>Tema</th><th>Puntos</th></tr>'+S.hist.map(function(h){return '<tr><td>'+esc(new Date(h.d).toLocaleDateString('es-PR'))+'</td><td>'+esc(h.n)+'</td><td>'+esc(h.a)+'</td><td>'+h.s+'/'+h.t+'</td></tr>'}).join('')+'</table>':'<p class="hint">Aún no has tomado quizzes.</p>'}
var armed=false;$('pReset').onclick=function(){var b=this;if(!armed){armed=true;b.textContent='Toca otra vez para confirmar';setTimeout(function(){armed=false;b.textContent='Borrar mi progreso'},4000);return}
  armed=false;b.textContent='Borrar mi progreso';S={known:{},hist:[],name:S.name};save();renderProg();renderLib()};

$('heroLearn').onclick=function(){go('flashcards')};
renderLib();
route();
document.documentElement.dataset.appReady='true';
})();

