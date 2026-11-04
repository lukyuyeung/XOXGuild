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
for(const file of ['style.css','pages.css','flows.css','season.css','world.css','journey.css','world-redesign.css','trader-home.css','community-identity.css','climb-home.css','guild-ranks.css']){const style=d.createElement('style');style.textContent=fs.readFileSync(base+file,'utf8');d.head.appendChild(style)}
for(const file of ['app.js','pages.js','flows.js','season.js','world.js','journey.js','trader-home.js','community-identity.js','climb-home.js','guild-ranks.js']){const script=d.createElement('script');script.textContent=fs.readFileSync(base+file,'utf8');d.body.appendChild(script)}
const q=s=>{const el=d.querySelector(s);assert(el,'Missing '+s);return el};
const click=s=>q(s).click();const fill=(s,v)=>{q(s).value=v;q(s).dispatchEvent(new w.Event('input',{bubbles:true}))};
const tick=()=>new Promise(r=>setTimeout(r,5));
const go=async path=>{w.location.hash='#/'+path;await tick()};
const submit=s=>q(s).dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async()=>{
assert.equal(d.querySelectorAll('.compact-guild-nav .subnav-links>a').length,2);assert(!d.querySelector('.subnav-create'));assert(!q('.climb-hero').querySelector('.text-button'));assert(!q('#season-home').querySelector('.climb-world-link'));assert(!q('#season-home').querySelector('.trader-founder-invite'));assert.equal(q('.climb-sidebar').querySelectorAll('a[href="#/rankings"]').length,1);
q('.guild-more-nav').open=true;click('.guild-more-nav [data-rank-guide]');assert(!q('.guild-more-nav').open);assert.equal(d.querySelectorAll('.guild-rank-gallery article').length,7);assert.equal([...d.querySelectorAll('.guild-rank-gallery h3')].map(e=>e.textContent).join(','),'Bronze,Silver,Gold,Platinum,Diamond,Master,Legend');assert(q('.guild-rank-explanation').textContent.includes('separate'));q('#modal').close();assert.equal(d.querySelectorAll('.climb-sidebar .guild-rank-icon').length,4);assert.equal(d.querySelectorAll('.trader-guild-card .guild-rank-chip').length,4);
fill('#trader-guild-search','Pudgy');assert.equal(d.querySelectorAll('.trader-guild-card').length,1);assert(q('.trader-guild-card').textContent.includes('Diamond'));click('[data-join="huddle"]');assert(q('.join-summary .guild-rank-chip'));fill('#flow-trader-name','Rank Trader');submit('#flow-join-form');q('#modal').close();await go('');assert(q('.guild-member-rank').textContent.includes('Diamond'));assert(q('.climb-sidebar .is-my-guild .climb-team-rank').textContent.includes('YOUR GUILD'));click('.climb-sidebar [data-climb-metric="efficiency"]');assert.equal(d.querySelectorAll('.climb-sidebar .guild-rank-icon').length,4);
await go('my-guild');assert(q('#workspace .guild-banner-rank'));assert(q('#workspace .guild-rank-progression'));assert.equal(q('#workspace .guild-rank-steps').children.length,7);assert(!q('#workspace').querySelector('.progression-ring'));click('#workspace .guild-banner-rank [data-rank-guide]');assert(q('.guild-rank-guide'));q('#modal').close();
for(const path of ['rankings','discover','leaders','guild/huddle','guild/bunny','arena','journey','world','competition']){await go(path);assert(q('#workspace').querySelector('h1'),path);assert.equal(d.querySelectorAll('.compact-guild-nav .subnav-links>a').length,2)}
assert(w.eval("canCopyGuildLeader(leaderById('satoshi'))"));assert(!w.eval("canCopyGuildLeader(leaderById('vector'))"));await go('');assert([...d.querySelectorAll('.climb-sidebar .guild-rank-icon')].every(e=>e.getAttribute('src').endsWith('-compact.svg')&&e.getAttribute('width')==='20'));click('.climb-sidebar [data-rank-guide]');assert.equal(d.querySelectorAll('.rank-small-preview').length,7);assert.equal(d.querySelectorAll('.rank-monochrome').length,7);for(const a of d.querySelectorAll('.guild-rank-gallery article')){assert(a.querySelector(':scope > .guild-rank-icon').getAttribute('src').endsWith('.svg'));assert(!a.querySelector(':scope > .guild-rank-icon').getAttribute('src').endsWith('-compact.svg'));assert(a.querySelector('.rank-small-preview .guild-rank-icon').getAttribute('src').endsWith('-compact.svg'))}assert.deepEqual(errors,[]);console.log('PASS: two-item primary navigation, reduced duplicate links, seven-rank guide, badge integration in cards/standings/join/member/banner/progression, metric updates and nine routes, copy boundaries.');dom.window.close();
})().catch(e=>{console.error(e);console.error(errors);process.exit(1)});
