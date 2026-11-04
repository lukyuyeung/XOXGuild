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
for(const file of ['style.css','pages.css','flows.css','season.css']){const style=d.createElement('style');style.textContent=fs.readFileSync(base+file,'utf8');d.head.appendChild(style)}
for(const file of ['app.js','pages.js','flows.js','season.js']){const script=d.createElement('script');script.textContent=fs.readFileSync(base+file,'utf8');d.body.appendChild(script)}
const q=s=>{const el=d.querySelector(s);assert(el,'Missing '+s);return el};
const click=s=>q(s).click();const fill=(s,v)=>{q(s).value=v;q(s).dispatchEvent(new w.Event('input',{bubbles:true}))};
const tick=()=>new Promise(r=>setTimeout(r,5));
const go=async path=>{w.location.hash='#/'+path;await tick()};
const submit=s=>q(s).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async()=>{
const routes=['','rankings','discover','competition','competition/rules','competition/results','leaders','leaders/satoshi','leaders/vector','leaders/alpha','my-guild/copy','guild/unisat','my-guild?preview=1','my-guild/copy?preview=1','arena','create'];
for(const route of routes){await go(route);assert((route?q('#workspace'):q('#season-home')).querySelector('h1'),'Missing heading '+route)}
await go('');assert(q('#season-home').textContent.includes('TRADE TOGETHER.'));assert.equal(q('#season-home .home-captains').querySelectorAll('[data-start-copy]').length,0);
await go('leaders');assert.equal(q('#workspace').querySelectorAll('[data-start-copy]').length,0);assert(q('#workspace').textContent.includes('members of that leader’s own guild'));await go('leaders/satoshi');assert.equal(q('#workspace').querySelectorAll('[data-start-copy]').length,0);assert(q('#workspace').textContent.includes('Performance is public'));
w.startCopy('satoshi');assert(q('.guild-copy-gate'));assert(!d.querySelector('#copy-setup-form'));click('[data-close-flow]');
// Preview query cannot grant membership.
await go('my-guild/copy?preview=1');assert(!d.querySelector('#workspace [data-start-copy]'));w.startCopy('satoshi');assert(q('.guild-copy-gate'));click('[data-close-flow]');
// A real local member can configure only the matching guild leader.
await go('guild/unisat');click('#workspace [data-join="unisat"]');fill('#flow-trader-name','Guild Member');submit('#flow-join-form');click('.welcome-modal [data-action="myguild"]');await tick();assert(q('#workspace [data-start-copy="satoshi"]'));w.startCopy('vector');assert(q('.guild-copy-gate').textContent.includes('current'));click('[data-close-flow]');
// Public cards remain performance-only even for a member.
await go('');assert.equal(q('#season-home .home-captains').querySelectorAll('[data-start-copy]').length,0);await go('leaders/satoshi');assert(!d.querySelector('#workspace [data-start-copy]'));assert(q('#workspace').textContent.includes('Open my guild copy workspace'));
await go('my-guild/copy');click('#workspace [data-start-copy="satoshi"]');fill('#copy-allocation','500');click('[data-copy-next]');fill('#copy-order-cap','15');fill('#copy-stop-loss','12');click('[data-copy-next]');q('[name="riskAck"]').checked=true;q('[name="demoAck"]').checked=true;submit('#copy-setup-form');click('[data-open-copy-plans]');await tick();assert(q('.copy-plan').textContent.includes('SIMULATION READY'));click('[data-plan-toggle]');assert(q('.copy-plan').textContent.includes('PAUSED'));click('[data-plan-toggle]');assert(q('.copy-plan').textContent.includes('SIMULATION READY'));
// Leaving pauses legacy plans, removes resume controls and blocks direct resume attempts.
await go('my-guild/settings');click('#workspace [data-action="leave"]');click('[data-action="confirm-leave"]');await tick();await go('my-guild/copy');assert(q('.copy-plan').textContent.includes('PAUSED'));assert(q('.copy-membership-paused'));assert(!d.querySelector('[data-plan-toggle]'));const saved=JSON.parse(w.localStorage.getItem('xox-guild-demo-v1'));assert.equal(saved.copyPlans[0].status,'paused');const planId=saved.copyPlans[0].id;const forged=d.createElement('button');forged.dataset.planToggle=planId;d.body.appendChild(forged);forged.click();assert(q('.guild-copy-gate'));assert.equal(JSON.parse(w.localStorage.getItem('xox-guild-demo-v1')).copyPlans[0].status,'paused');click('[data-close-flow]');forged.remove();
// Rejoining restores eligibility but does not automatically resume a plan.
await go('guild/unisat');click('#workspace [data-join="unisat"]');fill('#flow-trader-name','Guild Member');submit('#flow-join-form');click('.welcome-modal [data-action="myguild"]');await tick();await go('my-guild/copy');assert(q('.copy-plan').textContent.includes('PAUSED'));click('[data-plan-toggle]');assert(q('.copy-plan').textContent.includes('SIMULATION READY'));
// Submit-time checks remain enforced if membership changes after opening the wizard.
w.startCopy('alpha');assert(q('.guild-copy-gate'));click('[data-close-flow]');click('[data-plan-stop]');click('[data-confirm-plan-stop]');w.startCopy('satoshi');fill('#copy-allocation','100');click('[data-copy-next]');click('[data-copy-next]');q('[name="riskAck"]').checked=true;q('[name="demoAck"]').checked=true;w.eval('state.membership=null');submit('#copy-setup-form');assert(q('.guild-copy-gate'));assert.equal(JSON.parse(w.localStorage.getItem('xox-guild-demo-v1')).copyPlans.length,1);click('[data-close-flow]');
// The persistent chat keeps drafts across public leader pages.
await go('leaders');click('[data-toggle-chat]');fill('#dock-chat-message','A retained draft');await go('rankings');assert.equal(q('#dock-chat-message').value,'A retained draft');fill('#dock-chat-message','Member-only copy, public performance.');submit('#dock-chat-form');assert(q('.dock-message.self p').textContent.includes('Member-only'));
assert.deepEqual(errors,[]);console.log('PASS: 16 routes, public performance-only cards, visitor/preview/foreign-guild denial, matching member setup, pause/resume, leave auto-pause, forged resume denial, rejoin explicit resume, submit-time membership check, persistent chat.');dom.window.close();
})().catch(e=>{console.error(e);console.error('DOM errors:',errors);process.exit(1)});
