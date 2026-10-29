/* Cuerpo 3D interactivo — Carlos Guzmán · Péptidos
   Requiere THREE (r128) y window.FM = {areas, counts, pick(k), getArea()} */
(function(){
'use strict';
var stage=document.getElementById('stage');
if(!stage||!window.FM)return;
var canvasWrap=document.getElementById('stageCanvas'),labelsEl=document.getElementById('stageLabels');
function webglOK(){try{var c=document.createElement('canvas');return !!(window.WebGLRenderingContext&&(c.getContext('webgl')||c.getContext('experimental-webgl')))}catch(e){return false}}
if(typeof THREE==='undefined'||!webglOK()){
 stage.classList.add('no3d');
 var fallback=document.createElement('div');fallback.className='illustrated-body';
 var picture=document.createElement('img');picture.src='anatomy-fallback.webp';picture.alt='Ilustración artística del cuerpo humano con sistemas seleccionables';fallback.appendChild(picture);
 var points={cerebro:[52,8],hormonas:[50,18],corazon:[56,29],inmune:[40,34],digestivo:[53,42],piel:[27,47],sexual:[51,54],huesos:[44,68]};
 Object.keys(points).forEach(function(k){var b=document.createElement('button');b.className='fallback-point';b.type='button';b.style.left=points[k][0]+'%';b.style.top=points[k][1]+'%';b.textContent=FM.areas[k].n;b.setAttribute('aria-label','Explorar '+FM.areas[k].n);b.onclick=function(){FM.pick(k)};fallback.appendChild(b)});
 stage.appendChild(fallback);var note=document.createElement('span');note.className='fallback-note';note.textContent='Vista ilustrada · toca un sistema';stage.appendChild(note);return
}

var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var motionButton=document.getElementById('motionToggle'),motionPaused=reduce;try{motionPaused=motionPaused||localStorage.getItem('cg-3d-motion')==='off'}catch(e){}
function syncMotion(){motionButton.textContent=motionPaused?'Activar ↻':'Pausar ↻';motionButton.setAttribute('aria-pressed',String(!motionPaused));motionButton.setAttribute('aria-label',motionPaused?'Activar movimiento automático':'Pausar movimiento automático')}
if(motionButton){syncMotion();motionButton.onclick=function(){motionPaused=!motionPaused;syncMotion();try{localStorage.setItem('cg-3d-motion',motionPaused?'off':'on')}catch(e){}}}
var W=canvasWrap.clientWidth||400,H=canvasWrap.clientHeight||440;
var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.setSize(W,H);
renderer.outputEncoding=THREE.sRGBEncoding;
canvasWrap.appendChild(renderer.domElement);

var scene=new THREE.Scene();
var camera=new THREE.PerspectiveCamera(26,W/H,0.1,50);
camera.position.set(0,0.98,4.75);camera.lookAt(0,0.9,0);

scene.add(new THREE.HemisphereLight(0xffffff,0xdfe8e5,0.85));
var key=new THREE.DirectionalLight(0xffffff,0.85);key.position.set(2.5,4,3);scene.add(key);
var rim=new THREE.DirectionalLight(0xbfe9df,0.6);rim.position.set(-3,2,-3);scene.add(rim);
var fill=new THREE.DirectionalLight(0xffffff,0.35);fill.position.set(0,1,4);scene.add(fill);

var fig=new THREE.Group();scene.add(fig);

/* ---------- piel (translúcida) ---------- */
var skinMat=new THREE.MeshPhysicalMaterial({color:0xc9e3dc,roughness:0.28,metalness:0,clearcoat:1,clearcoatRoughness:0.2,transparent:true,opacity:0.55,depthWrite:true,side:THREE.FrontSide});
var rimMat=new THREE.ShaderMaterial({uniforms:{c:{value:new THREE.Color(0x0f6b5c)},a:{value:0.75}},transparent:true,depthWrite:false,
 vertexShader:'varying vec3 vN;varying vec3 vV;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
 fragmentShader:'uniform vec3 c;uniform float a;varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.0-abs(dot(normalize(vN),normalize(vV))),2.4);gl_FragColor=vec4(c,f*a);}'});
var skinParts=[];
function lathe(profile,seg){return new THREE.LatheGeometry(profile.map(function(p){return new THREE.Vector2(p[0],p[1])}),seg||48)}
function addSkin(geo,pos,scale,rotZ){var m=new THREE.Mesh(geo,skinMat);if(pos)m.position.set(pos[0],pos[1],pos[2]);if(scale)m.scale.set(scale[0],scale[1],scale[2]);if(rotZ)m.rotation.z=rotZ;m.renderOrder=2;fig.add(m);skinParts.push(m);return m}
// torso
addSkin(lathe([[0,0.86],[0.12,0.875],[0.165,0.92],[0.17,0.98],[0.155,1.06],[0.138,1.13],[0.145,1.2],[0.165,1.29],[0.185,1.37],[0.2,1.43],[0.19,1.47],[0.13,1.505],[0.055,1.525],[0,1.53]]),null,[1,1,0.62]);
// cuello y cabeza
addSkin(new THREE.CylinderGeometry(0.046,0.052,0.09,32),[0,1.555,0]);
addSkin(new THREE.SphereGeometry(1,48,36),[0,1.69,0.005],[0.105,0.13,0.118]);
// brazos (perfil cónico) y manos
function limb(len,r0,r1){var p=[[0,0]],n=14;for(var i=0;i<=n;i++){var t=i/n;var r=r0+(r1-r0)*t;r*=1+0.12*Math.sin(t*Math.PI);p.push([r,-t*len])}p.push([0,-len-0.0001]);return lathe(p,32)}
[-1,1].forEach(function(s){
  addSkin(new THREE.SphereGeometry(1,32,24),[s*0.182,1.425,0],[0.056,0.055,0.058]); // hombro
  var arm=addSkin(limb(0.64,0.05,0.033),[s*0.205,1.44,0],null,s*0.085);
  var hand=addSkin(new THREE.SphereGeometry(1,24,18),null,[0.034,0.072,0.022]);
  hand.position.set(s*(0.205+0.64*Math.sin(0.085)),1.44-0.64*Math.cos(0.085)-0.06,0);hand.rotation.z=s*0.085;
  var leg=addSkin(limb(0.83,0.078,0.042),[s*0.085,0.9,0],null,s*0.025);
  var foot=addSkin(new THREE.SphereGeometry(1,24,18),[s*0.105,0.045,0.05],[0.045,0.035,0.11]);
});
// contorno tipo holograma (fresnel)
skinParts.forEach(function(m){var e=new THREE.Mesh(m.geometry,rimMat);e.position.copy(m.position);e.rotation.copy(m.rotation);e.scale.copy(m.scale);e.renderOrder=3;fig.add(e)});

/* ---------- órganos ---------- */
function organMat(c){return new THREE.MeshStandardMaterial({color:c,roughness:0.45,metalness:0.05,emissive:c,emissiveIntensity:0.12})}
var organs={};
function org(k,geo,c,pos,scale,rot){var m=new THREE.Mesh(geo,organMat(c));m.position.set(pos[0],pos[1],pos[2]);if(scale)m.scale.set(scale[0],scale[1],scale[2]);if(rot)m.rotation.set(rot[0],rot[1],rot[2]);fig.add(m);(organs[k]=organs[k]||[]).push(m);return m}
var S=function(){return new THREE.SphereGeometry(1,32,24)};
org('cerebro',S(),0xf0a6b6,[0,1.715,0],[0.082,0.07,0.09]);
org('hormonas',S(),0x7fc0e4,[-0.02,1.535,0.03],[0.018,0.024,0.012]);
org('hormonas',S(),0x7fc0e4,[0.02,1.535,0.03],[0.018,0.024,0.012]);
org('hormonas',S(),0x7fc0e4,[0.06,1.12,0.0],[0.05,0.016,0.018],[0,0,0.3]); // páncreas
org('corazon',S(),0xe2626b,[0.035,1.355,0.035],[0.048,0.056,0.042],[0,0,-0.4]);
org('corazon',new THREE.TorusGeometry(0.035,0.008,8,24,Math.PI),0xe2626b,[0.02,1.42,0.02],null,[0,0,0]); // aorta
org('inmune',S(),0xa48be3,[0,1.43,0.045],[0.03,0.04,0.012]); // timo
org('inmune',S(),0xa48be3,[-0.1,1.17,-0.01],[0.03,0.045,0.025]); // bazo
org('digestivo',S(),0xf2b45f,[0.045,1.2,0.035],[0.065,0.045,0.04],[0,0,0.35]); // estómago
org('digestivo',new THREE.TorusKnotGeometry(0.05,0.016,64,8,2,5),0xf2b45f,[0,1.03,0.03],[1,0.8,0.55]); // intestino
org('digestivo',S(),0xc9895a,[-0.05,1.24,0.02],[0.08,0.04,0.045],[0,0,-0.2]); // hígado
org('sexual',S(),0xe999c8,[0,0.915,0.035],[0.045,0.03,0.03]);
var boneC=0xece4d2;
[-1,1].forEach(function(s){
  org('huesos',new THREE.CylinderGeometry(0.018,0.016,0.4,16),boneC,[s*0.088,0.69,0],null,[0,0,s*0.025]);
  org('huesos',new THREE.CylinderGeometry(0.015,0.013,0.38,16),boneC,[s*0.098,0.28,0],null,[0,0,s*0.025]);
  org('huesos',S(),boneC,[s*0.093,0.485,0.01],[0.026,0.024,0.026]);
});
org('huesos',new THREE.CylinderGeometry(0.012,0.012,0.6,12),boneC,[0,1.2,-0.05]); // columna

/* ---------- puntos de sistema ---------- */
var HOT={cerebro:[0,1.74,0.09],hormonas:[0,1.535,0.05],corazon:[0.05,1.36,0.09],inmune:[-0.1,1.2,0.07],digestivo:[0.02,1.06,0.1],piel:[-0.255,1.02,0.045],sexual:[0,0.915,0.09],huesos:[0.095,0.485,0.07]};
var hotMeshes={},labels={};
var ringGeo=new THREE.RingGeometry(0.022,0.03,32),dotGeo=new THREE.SphereGeometry(0.014,16,12);
Object.keys(HOT).forEach(function(k){
  var g=new THREE.Group();g.position.fromArray(HOT[k]);
  var dot=new THREE.Mesh(dotGeo,new THREE.MeshBasicMaterial({color:0x0f6b5c}));
  var ring=new THREE.Mesh(ringGeo,new THREE.MeshBasicMaterial({color:0x0f6b5c,transparent:true,opacity:0.5,side:THREE.DoubleSide,depthTest:false}));
  dot.renderOrder=5;ring.renderOrder=5;dot.material.depthTest=false;
  g.add(dot);g.add(ring);g.userData={k:k,ring:ring,dot:dot};fig.add(g);hotMeshes[k]=g;
  var b=document.createElement('button');b.type='button';b.className='blabel';b.dataset.k=k;
  b.innerHTML='<i></i><span>'+FM.areas[k].n+'</span><em>'+(FM.counts[k]||0)+'</em>';
  b.onclick=function(e){e.stopPropagation();FM.pick(k)};
  labelsEl.appendChild(b);labels[k]=b;
});

/* piso */
var floor=new THREE.Mesh(new THREE.CircleGeometry(0.62,64),new THREE.MeshBasicMaterial({color:0x0f6b5c,transparent:true,opacity:0.06}));
floor.rotation.x=-Math.PI/2;floor.position.y=0.005;scene.add(floor);
var floorRing=new THREE.Mesh(new THREE.RingGeometry(0.6,0.615,96),new THREE.MeshBasicMaterial({color:0x0f6b5c,transparent:true,opacity:0.22,side:THREE.DoubleSide}));
floorRing.rotation.x=-Math.PI/2;floorRing.position.y=0.006;scene.add(floorRing);

/* ---------- estado activo ---------- */
var active=null;
function setActive(k){active=k||null;
  Object.keys(organs).forEach(function(o){organs[o].forEach(function(m){var on=!active||o===active;m.material.emissiveIntensity=(active&&o===active)?0.55:0.12;m.material.transparent=true;m.material.opacity=on?1:0.22})});
  skinMat.opacity=active==='piel'?0.8:0.55;skinMat.color.set(active==='piel'?0xf0b98f:0xc9e3dc);rimMat.uniforms.c.value.set(active==='piel'?0xd2672a:0x0f6b5c);
  Object.keys(labels).forEach(function(k){labels[k].classList.toggle('on',k===active)});
  Object.keys(hotMeshes).forEach(function(k){var on=k===active;hotMeshes[k].userData.dot.material.color.set(on?0xd2672a:0x0f6b5c);hotMeshes[k].userData.ring.material.color.set(on?0xd2672a:0x0f6b5c)});
  if(active&&!dragging){var target=HOT[active][0]<0?0.5:(HOT[active][0]>0.04?-0.35:0);if(active==='piel')target=0.7;rotTarget=target;autoUntil=performance.now()+6000}
}

/* ---------- interacción: arrastrar para girar, tocar para elegir ---------- */
var rotY=0.35,rotTarget=null,vel=0,dragging=false,lastX=0,downX=0,downT=0,autoUntil=0;
var el=renderer.domElement;el.style.touchAction='pan-y';
el.addEventListener('pointerdown',function(e){dragging=true;lastX=downX=e.clientX;downT=performance.now();rotTarget=null;try{el.setPointerCapture(e.pointerId)}catch(_){}});
el.addEventListener('pointermove',function(e){if(!dragging){hover(e);return}var dx=e.clientX-lastX;lastX=e.clientX;rotY+=dx*0.01;vel=dx*0.01;autoUntil=performance.now()+4000});
function up(e){if(!dragging)return;dragging=false;if(Math.abs(e.clientX-downX)<5&&performance.now()-downT<400)clickPick(e)}
el.addEventListener('pointerup',up);el.addEventListener('pointercancel',function(){dragging=false});
var ray=new THREE.Raycaster(),mouse=new THREE.Vector2();
function pickAt(e){var r=el.getBoundingClientRect();mouse.x=((e.clientX-r.left)/r.width)*2-1;mouse.y=-((e.clientY-r.top)/r.height)*2+1;ray.setFromCamera(mouse,camera);
  var objs=[];Object.keys(organs).forEach(function(k){organs[k].forEach(function(m){objs.push(m)})});Object.keys(hotMeshes).forEach(function(k){objs.push(hotMeshes[k].userData.dot)});
  var hit=ray.intersectObjects(objs,false)[0];if(!hit)return null;
  for(var k in organs)if(organs[k].indexOf(hit.object)>=0)return k;
  for(var h in hotMeshes)if(hotMeshes[h].userData.dot===hit.object)return h;
  return null}
function clickPick(e){var k=pickAt(e);if(k)FM.pick(k)}
function hover(e){var k=pickAt(e);el.style.cursor=k?'pointer':'grab';Object.keys(labels).forEach(function(x){labels[x].classList.toggle('hov',x===k)})}

/* ---------- tamaño ---------- */
function resize(){var w=canvasWrap.clientWidth,h=canvasWrap.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;
  var fit=h/w>1.05?5.6:4.75;camera.position.set(0,0.98,fit);camera.lookAt(0,0.9,0);camera.updateProjectionMatrix()}
if(window.ResizeObserver)new ResizeObserver(resize).observe(canvasWrap);else window.addEventListener('resize',resize);
resize();

/* ---------- animación ---------- */
var v=new THREE.Vector3(),t0=performance.now(),visible=true;
if(window.IntersectionObserver)new IntersectionObserver(function(en){visible=en[0].isIntersecting}).observe(stage);
function frame(now){requestAnimationFrame(frame);
  if(!visible||document.hidden)return;
  var t=(now-t0)/1000;
  if(!dragging){
    if(rotTarget!==null){var d=rotTarget-rotY;d=Math.atan2(Math.sin(d),Math.cos(d));rotY+=d*0.08;if(Math.abs(d)<0.002)rotTarget=null}
    else if(Math.abs(vel)>0.0005){rotY+=vel;vel*=0.92}
    else if(!reduce&&!motionPaused&&now>autoUntil){rotY+=0.0035}
  }
  fig.rotation.y=rotY;
  fig.position.y=(reduce||motionPaused)?0:Math.sin(t*1.2)*0.006;
  Object.keys(hotMeshes).forEach(function(k){var g=hotMeshes[k];g.quaternion.copy(camera.quaternion);g.quaternion.premultiply(fig.quaternion.clone().invert());
    var s=1+((reduce||motionPaused)?0:0.25*Math.sin(t*3+k.length));g.userData.ring.scale.set(s,s,s)});
  renderer.render(scene,camera);
  // etiquetas HTML proyectadas
  var r=el.getBoundingClientRect(),cw=el.clientWidth,ch=el.clientHeight;
  Object.keys(HOT).forEach(function(k){
    v.fromArray(HOT[k]);fig.localToWorld(v);
    var wp=v.clone();v.project(camera);
    var x=(v.x*0.5+0.5)*cw,y=(-v.y*0.5+0.5)*ch;
    var facing=new THREE.Vector3(HOT[k][0],0,HOT[k][2]).applyQuaternion(fig.quaternion).z;
    var lb=labels[k];var right=x>cw/2;
    var lw=lb.offsetWidth||90;
    var left=right?x:x-lw;
    left=Math.max(6,Math.min(cw-lw-6,left));
    lb.style.transform='translate('+left.toFixed(1)+'px,'+y.toFixed(1)+'px) translateY(-50%)';
    lb.classList.toggle('r',right);
    lb.style.opacity=(facing<-0.02&&k!==active)?0.35:1;
  });
}
requestAnimationFrame(frame);
setActive(FM.getArea());
window.Body3D={setActive:setActive};
stage.classList.add('ready');
})();

