const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('fs'),assert=require('assert');
const base=require('path').resolve(__dirname,'../Website/dist')+'/';
const virtualConsole=new VirtualConsole();let errors=[];
virtualConsole.on('jsdomError',e=>{if(!/Not implemented/.test(e.message))errors.push(e.message)});
const html=fs.readFileSync(base+'index.html','utf8').replace(/<script[^>]*src[^>]*><\/script>/g,'').replace(/<link[^>]+>/g,'');
const dom=new JSDOM(html,{
 url:'https://xox-demo.test/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole,
 beforeParse(w){
  w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true};
  w.HTMLDialogElement.prototype.close=function(){this.open=false};
  w.HTMLFormElement.prototype.requestSubmit=function(){this.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}))};
 }
});
const w=dom.window,d=w.document;w.addEventListener('error',e=>errors.push(e.error?.stack||e.message));
for(const file of ['style.css','pages.css','flows.css','season.css','world.css']){const style=d.createElement('style');style.textContent=fs.readFileSync(base+file,'utf8');d.head.appendChild(style)}
for(const file of ['app.js','pages.js','flows.js','season.js','world.js']){const script=d.createElement('script');script.textContent=fs.readFileSync(base+file,'utf8');d.body.appendChild(script)}
const q=s=>{const el=d.querySelector(s);assert(el,'Missing '+s);return el};
const click=s=>q(s).click();const fill=(s,v)=>{q(s).value=v;q(s).dispatchEvent(new w.Event('input',{bubbles:true}))};
const tick=()=>new Promise(r=>setTimeout(r,5));
const go=async path=>{w.location.hash='#/'+path;await tick()};
const submit=s=>q(s).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async()=>{
for(const route of ['', 'rankings','discover','competition','leaders','leaders/satoshi','guild/huddle','guild/memeland','guild/hilumia','guild/huddle/members','my-guild?preview=1','create']){await go(route);assert(q(route?'#workspace':'#season-home').querySelector('h1'),route)}
await go('');assert.equal(d.querySelectorAll('[data-map-community]').length,3);assert.equal(new Set([...d.querySelectorAll('.territory-shape polygon')].map(e=>e.getAttribute('points'))).size,1);
click('[data-world-toggle]');assert(q('#guild-world').classList.contains('is-collapsed'));assert.equal(w.localStorage.getItem('xox-world-display'),'collapsed');click('[data-world-toggle]');click('[data-world-full]');assert(q('#guild-world').classList.contains('is-fullscreen'));d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(!q('#guild-world').classList.contains('is-fullscreen'));
click('[data-map-zoom="in"]');assert(w.eval('worldUI.zoom')>1);click('[data-map-reset]');assert.equal(w.eval('worldUI.zoom'),1);click('[data-world-guild="memeland"]');assert(q('.world-preview-card').textContent.includes('Visit guild'));assert.equal(w.location.hash,'#/');
await go('guild/huddle/members');assert(q('.world-member-lock'));assert(!d.querySelector('#member-rows'));
w.eval("state.membership={id:'huddle',role:'member',name:'Test Trader'};save()");await go('');click('[data-world-guild="huddle"]');await tick();assert(w.location.hash.includes('my-guild'));assert(q('.community-theme-banner.theme-huddle'));
w.eval("openGuildChat('memeland')");assert.equal(w.eval('currentChatId()'),'lounge');assert([...q('#dock-room').options].every(x=>['lounge','huddle'].includes(x.value)));
assert(w.eval("canCopyGuildLeader(leaderById('satoshi'))"));assert(!w.eval("canCopyGuildLeader(leaderById('vector'))"));
assert.deepEqual(errors,[]);console.log('PASS: 12 routes, equal plots, map collapse persistence/fullscreen/zoom/reset/visitor selection, own guild entry, private member route, chat isolation and leader-copy eligibility.');dom.window.close();
})().catch(e=>{console.error(e);console.error(errors);process.exit(1)});
