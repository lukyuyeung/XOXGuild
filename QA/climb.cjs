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
for(const file of ['style.css','pages.css','flows.css','season.css','world.css','journey.css','world-redesign.css','trader-home.css','community-identity.css','climb-home.css']){const style=d.createElement('style');style.textContent=fs.readFileSync(base+file,'utf8');d.head.appendChild(style)}
for(const file of ['app.js','pages.js','flows.js','season.js','world.js','journey.js','trader-home.js','community-identity.js','climb-home.js']){const script=d.createElement('script');script.textContent=fs.readFileSync(base+file,'utf8');d.body.appendChild(script)}
const q=s=>{const el=d.querySelector(s);assert(el,'Missing '+s);return el};
const click=s=>q(s).click();const fill=(s,v)=>{q(s).value=v;q(s).dispatchEvent(new w.Event('input',{bubbles:true}))};
const tick=()=>new Promise(r=>setTimeout(r,5));
const go=async path=>{w.location.hash='#/'+path;await tick()};
const submit=s=>q(s).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async()=>{
assert(q('.climb-hero h1').textContent.includes('TRADE TOGETHER'));assert.equal(q('.climb-home').firstElementChild.className,'climb-event-strip');assert.equal(q('.climb-hero').querySelectorAll('img').length,0);assert(!q('#season-home').querySelector('#guild-world'));assert(!q('#season-home').querySelector('img[src*="world-arena"]'));assert(q('.climb-sidebar'));assert.equal(d.querySelectorAll('.climb-sidebar .climb-rank-list li').length,4);assert(q('.climb-mobile-board summary').textContent.includes('Open the leaderboard'));assert(q('.climb-world-link a').getAttribute('href')==='#/world');
click('[data-find-community]');assert.equal(d.activeElement.id,'trader-guild-search');fill('#trader-guild-search','Pudgy');assert.equal(d.querySelectorAll('.trader-guild-card').length,1);assert(q('.trader-guild-card h3').textContent==='Pudgy Penguins');fill('#trader-guild-search','');
click('.climb-sidebar [data-climb-metric="participation"]');assert(q('.climb-sidebar .climb-current-metric').textContent==='Participation');assert(q('.climb-sidebar .climb-rank-list').textContent.includes('88%'));assert(q('.climb-mobile-board [data-climb-metric="participation"]').getAttribute('aria-pressed')==='true');assert(w.eval('seasonUI.metric')==='participation');click('.climb-sidebar [data-climb-metric="volume"]');
click('[data-join="memeland"]');fill('#flow-trader-name','Climb Trader');submit('#flow-join-form');q('#modal').close();await go('');assert(q('.trader-member-board').textContent.includes('Memeland'));assert(q('.climb-sidebar .is-my-guild').textContent.includes('Memeland'));assert(q('.climb-sidebar .climb-personal-heading').textContent.includes('#2'));assert(q('.climb-sidebar .climb-next-position').textContent.includes('$54.00M'));assert(q('.climb-mobile-board summary').textContent.includes('#2'));click('.climb-sidebar [data-climb-metric="participation"]');assert(q('.climb-sidebar .climb-personal-heading').textContent.includes('#3'));assert(q('.climb-sidebar .climb-next-position').textContent.includes('2.0 pp'));click('.climb-sidebar [data-climb-metric="efficiency"]');assert(q('.climb-sidebar .climb-personal-heading').textContent.includes('#3'));click('.climb-sidebar [data-climb-metric="volume"]');
click('.trader-member-actions [data-flow-trade]');assert(q('#modal-content').textContent.includes('No transaction'));q('#modal').close();click('.trader-member-actions [data-open-chat]');assert(w.eval('currentChatId()')==='memeland');w.eval('closeGuildChat()');assert(w.eval("canCopyGuildLeader(leaderById('vector'))"));assert(!w.eval("canCopyGuildLeader(leaderById('satoshi'))"));
await go('world');assert(q('#workspace #guild-world'));assert(!q('#workspace #guild-world').classList.contains('is-collapsed'));assert.equal(d.querySelectorAll('#workspace [data-veiled-city]').length,8);assert(q('.subnav-links a[href="#/world"]').getAttribute('aria-current')==='page');click('[data-world-full]');assert(q('#guild-world').classList.contains('is-fullscreen'));w.eval('renderRoute(false)');assert(q('#guild-world').classList.contains('is-fullscreen'));d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(!q('#guild-world').classList.contains('is-fullscreen'));click('[data-veiled-city="veiled-1"]');assert(q('.veiled-city-modal h2').textContent==='???');q('#modal').close();click('[data-world-guild="memeland"]');await tick();assert(w.location.hash.includes('my-guild'));
for(const path of ['discover','rankings','leaders','guild/huddle','guild/huddle/members','my-guild','arena','journey','competition','competition/rules','world']){await go(path);assert(q('#workspace').querySelector('h1'),path)}
await go('guild/huddle/members');assert(q('.world-member-lock'));await go('discover');fill('#workspace #trader-guild-search','The Huddle');assert.equal(d.querySelectorAll('#workspace .trader-guild-card').length,1);assert(q('#workspace .trader-guild-card h3').textContent==='Pudgy Penguins');fill('#workspace #trader-guild-search','');await go('');assert(q('.climb-sidebar .climb-personal-heading').textContent.includes('#2'));assert(!q('#season-home').querySelector('#guild-world'));assert.equal(q('.climb-hero').querySelectorAll('img').length,0);
assert.deepEqual(errors,[]);console.log('PASS: independent top event strip; image-free hero; desktop and mobile standings, metric sync, own rank/exact gap; join/search, member trade/chat/copy boundaries; standalone world/fullscreen/fog/own entry and 11 subpage routes.');dom.window.close();
})().catch(e=>{console.error(e);console.error(errors);process.exit(1)});
