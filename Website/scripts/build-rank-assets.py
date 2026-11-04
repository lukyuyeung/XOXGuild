"""Shared shield family. Compact UI assets complement separately authored material artwork."""
from pathlib import Path
root=Path(__file__).resolve().parents[1]/'dist/assets'
SHIELD='M13 4H51L60 13V43L32 62L4 43V13Z'
INNER='M16 11H48L53 16V39L32 54L11 39V16Z'
CORE='M18 17H46L48 20V36L32 47L16 36V20Z'
ranks=[('bronze','#bd7b50','#8a5034','#d5a079'),('silver','#aab3bf','#647080','#dce3eb'),('gold','#dbb14e','#9c7428','#f5d67e'),('platinum','#83cfda','#2e6b7a','#e5f6fc'),('diamond','#75e3fa','#1598ba','#e8fcff'),('master','#8c91ff','#444fb8','#ecf1ff'),('legend','#168bff','#174ad5','#f0f7ff')]
for i,(name,accent,dark,light) in enumerate(ranks):
 for compact in [False,True]:
  defs=''
  if not compact:defs=f'<defs><linearGradient id="rim" x2=".8" y2="1"><stop stop-color="{light}"/><stop offset=".4" stop-color="{accent if i<3 else "#b3c9df"}"/><stop offset=".7" stop-color="#263341"/><stop offset="1" stop-color="{light}"/></linearGradient><linearGradient id="dark" x2="1" y2="1"><stop stop-color="#263749"/><stop offset=".55" stop-color="#091421"/><stop offset="1" stop-color="#192637"/></linearGradient></defs>'
  rim=accent if compact and i<3 else '#cad9e8' if compact else 'url(#rim)'
  fill='#111f30' if compact else 'url(#dark)'
  art=f'<path data-shared-outline="xox-shield-v3" d="{SHIELD}" fill="{rim}" stroke="{light}" stroke-width="1.2" stroke-linejoin="round"/><path d="{INNER}" fill="{fill}" stroke="#080e18" stroke-width="1.4"/>'
  if i>=2:art+=f'<path d="M16 13H48L51 17V38L32 52L13 38V17Z" fill="none" stroke="{accent if i!=6 else "#5e7894"}" stroke-width="{2.4 if compact else 1.5}"/>'
  if name=='platinum':art+=f'<path d="M17 15H47L50 19V37L32 50L14 37V19Z" fill="none" stroke="{dark}" stroke-width="4"/><path d="m14 37 8 6m28-6-8 6" stroke="{accent}" stroke-width="3"/>'
  if name=='diamond':
   art+=f'<path d="m12 12 9-1-3 9-7 3Zm40 0-9-1 3 9 7 3ZM12 34l8 5-1 8-8-7Zm40 0-8 5 1 8 8-7Z" fill="{accent}" stroke="{light}" stroke-width=".8"/>'
   if not compact:art+='<path d="m12 12 6 8 3-9m31 1-6 8-3-9M12 34l7 13 1-8m32-5-7 13-1-8" fill="none" stroke="#e7fcff" stroke-width=".7"/>'
  if name in ['master','legend']:
   art+=f'<path d="M14 10H50L55 15 49 21H15L9 15Z" fill="#132239" stroke="#a7bed7" stroke-width=".7"/><path d="M16 18H48L51 21V37L32 52L13 37V21Z" fill="{dark if name=="master" else "#102451"}"/>'
   art+=f'<path d="M18 19H46L48 22V35L32 47L16 35V22Z" fill="#071320"/>'
   art+=f'<path d="m13 21 6 2-1 12-5 3Zm38 0-6 2 1 12 5 3Z" fill="{accent}"/>'
   if not compact:art+='<path d="M32 22V46L18 35V24Z" fill="#c1c9f9" opacity=".1"/>'
  if name=='legend':art+='<path d="m13 38 19 15 19-15" fill="none" stroke="#168bff" stroke-width="3"/><path d="m12 15 4 3m36-3-4 3" stroke="#168bff" stroke-width="3"/>'
  ring=accent if name in ['bronze','gold','legend'] else light
  art+=f'<path d="M33 22a9.5 9.5 0 1 1-9.5 9.5" fill="none" stroke="{ring}" stroke-width="{5.6 if compact else 5}" stroke-linecap="round"/><circle cx="24" cy="23" r="3.2" fill="{light if name in ["bronze","gold"] else "#f3f8ff"}"/>'
  (root/f'rank-{name}{"-compact" if compact else ""}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 66"><title>{name.title()} guild rank</title>{defs}{art}</svg>')
print('Built fourteen badges sharing one exact shield outline.')
