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
for(const file of ['style.css','pages.css','flows.css','season.css','world.css','journey.css','world-redesign.css','trader-home.css']){const style=d.createElement('style');style.textContent=fs.readFileSync(base+file,'utf8');d.head.appendChild(style)}
for(const file of ['app.js','pages.js','flows.js','season.js','world.js','journey.js','trader-home.js']){const script=d.createElement('script');script.textContent=fs.readFileSync(base+file,'utf8');d.body.appendChild(script)}
const q=s=>{const el=d.querySelector(s);assert(el,'Missing '+s);return el};
const click=s=>q(s).click();const fill=(s,v)=>{q(s).value=v;q(s).dispatchEvent(new w.Event('input',{bubbles:true}))};
const tick=()=>new Promise(r=>setTimeout(r,5));
const go=async path=>{w.location.hash='#/'+path;await tick()};
const submit=s=>q(s).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async()=>{
assert(q('.trader-hero h1').textContent.includes('TRADE WITH YOUR PEOPLE'));assert(q('#guild-world').classList.contains('is-collapsed'));assert.equal(d.querySelectorAll('.trader-guild-card').length,4);assert(q('#season-home').textContent.includes('To be announced'));assert(q('.trader-world-secondary').compareDocumentPosition(q('.trader-community-finder')) & w.Node.DOCUMENT_POSITION_PRECEDING);assert(q('.world-environment').getAttribute('loading')==='lazy');
click('[data-find-community]');await tick();assert(!w.location.hash.includes('find-community'));assert.equal(d.activeElement.id,'trader-guild-search');fill('#trader-guild-search','Azuki');assert.equal(d.querySelectorAll('.trader-guild-card').length,1);assert(q('.trader-guild-card').textContent.includes('Hilumia'));fill('#trader-guild-search','nothing-here');assert(q('.trader-search-empty'));click('[data-reset-guild-search]');assert.equal(d.querySelectorAll('.trader-guild-card').length,4);
click('[data-open-guild-invite]');fill('#trader-invite-link','badlink');submit('#trader-invite-form');assert(q('#trader-invite-error').textContent);fill('#trader-invite-link','https://xox-demo.test/#/guild/huddle');submit('#trader-invite-form');await tick();assert(w.location.hash.includes('guild/huddle'));assert(q('.community-theme-banner.theme-huddle'));click('[data-join="huddle"]');fill('#flow-trader-name','Community Trader');submit('#flow-join-form');q('#modal').close();await go('');assert(q('.trader-member-board').textContent.includes('The Huddle'));assert(q('.trader-member-board').textContent.includes('Prepare with your team'));assert(!q('.trader-member-board').textContent.includes('Memeland'));click('.trader-member-actions [data-flow-trade]');assert(q('#modal-content').textContent.includes('No transaction'));q('#modal').close();click('.trader-member-actions [data-open-chat]');assert.equal(w.eval('currentChatId()'),'huddle');w.eval('closeGuildChat()');
await go('arena');click('[data-battle-brief]');click('[data-confirm-briefing]');click('[data-battle-advance="matched"]');click('[data-battle-advance="live"]');click('[data-contribution-demo]');fill('#contribution-notional','2500');q('#contribution-demo-form input[type="checkbox"]').checked=true;submit('#contribution-demo-form');await go('');assert(q('.trader-member-board').textContent.includes('$2,500'));assert(q('.trader-member-board').textContent.includes('Memeland'));assert.equal(w.eval('state.membership.id'),'huddle');assert(w.eval("canCopyGuildLeader(leaderById('satoshi'))"));assert(!w.eval("canCopyGuildLeader(leaderById('vector'))"));
click('[data-world-toggle]');assert(!q('#guild-world').classList.contains('is-collapsed'));assert.equal(d.querySelectorAll('[data-veiled-city]').length,8);click('[data-veiled-city="veiled-1"]');assert(q('.veiled-city-modal'));q('#modal').close();click('[data-world-full]');assert(q('#guild-world').classList.contains('is-fullscreen'));d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));click('[data-world-toggle]');assert.equal(w.localStorage.getItem('xox-world-display-trader-v1'),'collapsed');
for(const path of ['discover','rankings','leaders','leaders/bunny-captain','guild/bunny','guild/bunny/members','my-guild','journey','competition','competition/rules','create']){await go(path);assert(q('#workspace').querySelector('h1'),path)}
await go('guild/bunny/members');assert(q('.world-member-lock'));await go('discover');fill('#workspace #trader-guild-search','bunny');assert.equal(d.querySelectorAll('#workspace .trader-guild-card').length,1);assert(q('#workspace .trader-guild-card').textContent.includes('Bunny Warriors'));fill('#workspace #trader-guild-search','');await go('');assert(q('.trader-member-board'));assert(q('#guild-world').classList.contains('is-collapsed'));
assert.deepEqual(errors,[]);console.log('PASS: trader-first anonymous/member homepage, collapsed/lazy map, search/reset, invite review, join, trade preview, team chat, current opponent and contribution, optional map/fullscreen/fog, member/copy boundaries and 11 subpage routes.');dom.window.close();
})().catch(e=>{console.error(e);console.error(errors);process.exit(1)});
