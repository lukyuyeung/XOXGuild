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
for(const file of ['style.css','pages.css','flows.css']){const style=d.createElement('style');style.textContent=fs.readFileSync(base+file,'utf8');d.head.appendChild(style)}
for(const file of ['app.js','pages.js','flows.js']){const script=d.createElement('script');script.textContent=fs.readFileSync(base+file,'utf8');d.body.appendChild(script)}
const q=s=>{const el=d.querySelector(s);assert(el,'Missing '+s);return el};
const click=s=>q(s).click();const fill=(s,v)=>{q(s).value=v;q(s).dispatchEvent(new w.Event('input',{bubbles:true}))};
const tick=()=>new Promise(r=>setTimeout(r,5));
const go=async path=>{w.location.hash='#/'+path;await tick()};
const submit=s=>q(s).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async()=>{
const routes=['','discover','rankings','guild/unisat','guild/unisat/members','guild/unisat/activity','arena','arena/format','arena/rewards','my-guild','my-guild?preview=1','my-guild/members?preview=1','my-guild/missions?preview=1','my-guild/settings?preview=1','forum/unisat?preview=1','create'];
for(const route of routes){await go(route);if(route){assert(q('#workspace h1').textContent.trim());assert(!/places available|remaining slots|capacity|\d\s*\/\s*1,?000/.test(q('#workspace').textContent),'Capacity UI in '+route)} }
console.log('Routes rendered:',routes.length);
await go('guild/unisat');click('#workspace [data-join="unisat"]');fill('#flow-trader-name','QA Trader');submit('#flow-join-form');assert(q('.welcome-modal').textContent.includes('Welcome'));click('.welcome-modal [data-action="myguild"]');await tick();assert(q('#workspace').textContent.includes('Guild missions'));click('[data-mission-tab="weekly"]');assert(q('.mission-list').textContent.includes('Weekly volume sprint'));click('[data-mission-tab="event"]');assert(q('.mission-list').textContent.includes('The event challenge'));click('[data-mission-tab="daily"]');click('[data-mission-action="checkin"]');assert(q('.mission-list').textContent.includes('Checked in'));
await go('forum/unisat');fill('#chat-message','A local message <script>alert(1)</script>');submit('#forum-form');assert(q('.own-message p').textContent.includes('<script>'));assert.equal(d.querySelectorAll('.own-message script').length,0);assert(q('#chat-message')===d.activeElement);const persisted=w.localStorage.getItem('xox-guild-demo-v1');assert(persisted.includes('A local message'));
await go('my-guild/settings');click('#workspace [data-action="leave"]');click('[data-action="confirm-leave"]');await tick();
await go('guild/stellar');click('#workspace [data-join="stellar"]');fill('#flow-trader-name','Applicant');fill('#flow-intro','A thoughtful introduction.');submit('#flow-join-form');assert(q('.welcome-modal').textContent.includes('saved on this browser'));click('.welcome-modal [data-action="myguild"]');await tick();assert(q('.application-list').textContent.includes('Stellar Syndicate'));click('[data-cancel="stellar"]');await tick();
click('#workspace [data-action="create"]');await tick();fill('#flow-guild-name','QA Circle');fill('#flow-description','A guild for thoughtful traders and clear shared direction.');click('[data-flow-logo="nova"]');click('[data-flow-tag="Perp Traders"]');assert(q('#creation-name-preview').textContent==='QA Circle');click('[data-flow-next]');assert(q('#flow-create-form').textContent.includes('Optional entry settings'));q('[name="policy"][value="approval"]').checked=true;q('[name="policy"][value="approval"]').dispatchEvent(new w.Event('change',{bubbles:true}));fill('#entry-volume','10000');fill('#entry-assets','100');click('[data-flow-next]');fill('#flow-rules','Be thoughtful and share context.');fill('#flow-announcement','Welcome to our new trading circle.');q('[name="ack"]').checked=true;submit('#flow-create-form');assert(q('.welcome-modal').textContent.includes('Your guild.'));click('.welcome-modal [data-action="myguild"]');await tick();assert(q('#workspace h1').textContent.includes('QA Circle'));assert(q('#workspace').textContent.includes('Welcome to our new trading circle.'));
const state=JSON.parse(w.localStorage.getItem('xox-guild-demo-v1')),id=state.membership.id;assert.equal(state.drafts[0].policy,'approval');assert.equal(state.drafts[0].logo,'nova');assert.equal(state.drafts[0].minVolume,'10000');assert.equal(state.drafts[0].members,1);assert(!('capacity' in state.drafts[0]));
await go('forum/'+id);assert(d.querySelector('[data-edit-pin]'));click('[data-edit-pin]');fill('#pin-message','An updated team direction.');submit('#pin-form');assert(q('.forum-pinned p').textContent.includes('updated'));await go('my-guild/settings');fill('#setting-rules','Updated community rules.');submit('#flow-details-form');assert(JSON.parse(w.localStorage.getItem('xox-guild-demo-v1')).drafts[0].rules==='Updated community rules.');
assert.deepEqual(errors,[]);console.log('PASS: join/welcome, mission tabs/check-in, forum local posting/XSS escaping, application cancellation, create/logo/tags/settings, founder pin editing, persistence.');dom.window.close();
})().catch(e=>{console.error(e);console.error('DOM errors:',errors);process.exit(1)});
