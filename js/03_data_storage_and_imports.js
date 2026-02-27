/* --- CONSTANTES DATA --- */
const KEY = 'flashcards9x16_data', APP_VER = '2026-06-22-math-v4';
const GRADES = ['unseen','echec','difficile','bien','facile'];
const GRADE_INIT = () => Object.fromEntries(GRADES.map(g=>[g,0]));
const GRADE_FILTERS = () => Object.fromEntries(GRADES.map(g=>[g,!0]));
const GC={unseen:'gray',echec:'red',difficile:'amber',bien:'blue',facile:'green'};
const GB={echec:'btn--red',difficile:'btn--amber',bien:'btn--blue',facile:'btn--green'};

/* --- DATA MODELS --- */
let data;
let dataMATH = [];
const parseRaw = r => r.split(/\r?\n/).map(l=>{ const p=l.split('|'); return p.length!==4 ? null : {id:p[0].trim(),front:p[1].trim(),back:p[2].trim(),chapter:p[3].trim()} }).filter(Boolean);
const dataEN = (typeof RAW_EN !== 'undefined') ? parseRaw(RAW_EN) : [];
const dataPHY = (typeof RAW_PHY !== 'undefined') ? parsePhysicsData(RAW_PHY) : [];

const mkCard=(id,f,b,ms=null)=>({id,front:f,back:b,mathSimple:ms,grade:'unseen',timesReviewed:0,lastReviewed:0,lastMs:0,avgMs:0,perfEma:.5,ef:2.5,intervalDays:0,dueAt:0,streak:0,successes:0,failures:0});
const mkStats=n=>({gradeCounts:{...GRADE_INIT(),unseen:n},totalReviews:0,dailyReviews:{},dailyChanges:{},dailyDurMs:{},dailyDurCount:{},dailyLog:{}});
const mkSettings=()=>({sessionSize:10,dailyGoal:10,reviewOrder:'front-first',langSwap:!1});
const mkChapter=(id,title,cards,imp)=>({id,title,description:(getEmoji(title)?getEmoji(title)+' ':'')+title,settings:mkSettings(),filters:{grades:GRADE_FILTERS()},stats:mkStats(cards.length),cards,imported:!!imp});

const sRow=(id,icon,title,sub,right,click)=>`<div class="settings-row" ${id?'id="'+id+'"':''}${click?' style="cursor:pointer"':''}><div class="s-icon dynamic">${icon}</div><div class="s-label"><div class="s-title">${title}</div>${sub?'<div class="s-sub">'+sub+'</div>':''}</div>${right||''}</div>`;
const sToggle=on=>`<div class="s-toggle ${on?'on':''}"></div>`;
const sChev=`<div class="s-chevron">›</div>`;
const sVal=v=>`<div class="s-value">${v}</div>`;

/* --- DATABASE (IndexedDB) --- */
const Media = {
  db: null, cache: new Map(),
  async open(){ if(this.db)return this.db; this.db=await new Promise((s,j)=>{const r=indexedDB.open('flash9x16_media',1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('files'))r.result.createObjectStore('files',{keyPath:'key'})};r.onsuccess=()=>s(r.result);r.onerror=()=>j(r.error)}); return this.db },
  async save(k,b,m={}){ const d=await this.open(), tx=d.transaction('files','readwrite'); tx.objectStore('files').put({key:k,blob:b,meta:m,ts:Date.now()}); data.mediaIndex=data.mediaIndex||{}; data.mediaIndex[k]={name:m.name||k,type:b.type,size:b.size}; saveData() },
  async urlFor(k){ if(this.cache.has(k))return this.cache.get(k); const d=await this.open(); return new Promise((s,j)=>{const r=d.transaction('files','readonly').objectStore('files').get(k);r.onsuccess=()=>{if(!r.result?.blob)return j('Missing');const u=URL.createObjectURL(r.result.blob);this.cache.set(k,u);s(u)};r.onerror=()=>j(r.error)}) },
  revokeAll(){ for(const u of this.cache.values())URL.revokeObjectURL(u); this.cache.clear() },
  async clearAll(){ const d=await this.open(), tx=d.transaction('files','readwrite'); tx.objectStore('files').clear(); this.revokeAll(); data.mediaIndex={}; saveData() },
  rwHTML(h,m){ return String(h||'').replace(/(<img\b[^>]?\bsrc=["'])([^"']+)(["'][^>]*>)/gi,(x,p,src,s)=>{const k=m[src.replace(/^.*[\\\/]/,'').replace(/^_+/,'')]||null;return k?`${p}media://${k}${s}`:x}) },
  async resolve(el){ const i=[...el.querySelectorAll('img[src^="media://"]')]; await Promise.all(i.map(async x=>{try{x.src=await Media.urlFor(x.getAttribute('src').replace(/^media:\/\//,''))}catch{}})) }
};

/* --- IMPORTS --- */
const ensureSQL = (()=>{ let p; return ()=>{ if(!p)p=initSqlJs({locateFile:f=>`https://cdn.jsdelivr.net/npm/sql.js@1.10.2/dist/${f}`}); return p } })();
async function importFiles(fs){ for(const f of fs){ const n=f.name.toLowerCase(); if(n.endsWith('.apkg')) await impApkg(f); else if(n.endsWith('.csv')||n.endsWith('.tsv')) await impDelim(f); else if(n.endsWith('.json')) await impJSON(f) } }

async function impApkg(f){
  try {
    if(!window.JSZip) {
      await new Promise((res, rej) => { const s=D.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'; s.onload=res; s.onerror=()=>rej(new Error("JSZip load failed")); D.head.appendChild(s); });
    }
    const b = await f.arrayBuffer();
    let z; try { z = await JSZip.loadAsync(b); } catch(e) { throw new Error("Not a valid ZIP/APKG."); }
    let mm = {}; const me = z.file(/^media(\.json)?$/i)[0];
    if(me) { try { mm = JSON.parse(await me.async('string')); } catch(e) {} }
    const iId = `apkg-${slugify(f.name.replace(/\.[^.]+$/,''))}-${Date.now()}`;
    const mnk = {};
    for(const [ns,rn] of Object.entries(mm)){ const e = z.file(new RegExp(`^${ns}$`))[0]; if(!e) continue; const k = `${iId}/${rn||ns}`; await Media.save(k, await e.async('blob'), {name:rn||ns}); mnk[rn] = k; mnk[ns] = k; }
    let col = z.file("collection.anki2") || z.file(/collection\.anki2(1|\.db)?/i)[0];
    if(!col) throw new Error("Anki data not found.");
    const dbData = new Uint8Array(await col.async('uint8array'));
    const SQL = await ensureSQL();
    let db; try { db = new SQL.Database(dbData); } catch(sqlErr) { throw new Error("DB corrupted."); }
    let dk = {}; try { const r = db.exec('select decks from col limit 1'); if(r[0]?.values[0]) dk = JSON.parse(r[0].values[0][0]||'{}'); } catch(e) {}
    let rows; try { rows = db.exec('select cards.id, cards.nid, cards.did, cards.ord, notes.flds from cards join notes on notes.id=cards.nid'); } catch(e) { db.close(); throw new Error("Read error."); }
    if(!rows || !rows[0]) { db.close(); throw new Error("Empty Anki deck."); }
    const byD = new Map(), cols = rows[0].columns, vals = rows[0].values;
    for(const r of vals){ const row = Object.fromEntries(cols.map((c,i) => [c,r[i]])); const dn = (dk[row.did]?.name || `Deck ${row.did}`).replace(/::/g,' › '); const fl = (row.flds||'').split('\x1f'); let frontVal = fl[0] || 'Vide'; let backVal = fl[1] || ''; if (row.ord == 1 && fl.length >= 2) { frontVal = fl[1]; backVal = fl[0]; } if (fl.length > 2) { backVal += '<br><br>' + fl.slice(2).join('<br>'); } const ca = byD.get(dn) || []; ca.push({ id: String(row.id), front: Media.rwHTML(frontVal, mnk), back: Media.rwHTML(backVal, mnk) }); byD.set(dn, ca); }
    db.close();
    const chs = []; for(const [n,arr] of byD){ const cds=arr.map(r=>mkCard(`${slugify(n)}-${r.id}`,r.front,r.back)); chs.push(mkChapter('chap-'+slugify(n),n,cds,!0)); }
    const sj = { id: `import-${slugify(f.name)}`, title: f.name.replace(/\.[^.]+$/,''), chapters: chs, imported: !0 }; data.subjects.push(sj); data.app.currentSubjectId = sj.id; saveData();
    toast('Import Anki réussi !', 'success');
  } catch(e) { alert("Erreur import Anki : " + e.message); console.error(e); }
}

async function impDelim(f){ const t=await f.text(), sep=t.includes('\t')?'\t':(t.includes(';')?';':','), l=t.split(/\r?\n/).filter(Boolean); let h=l[0].split(sep).map(s=>s.trim().toLowerCase()), st=0; if(!h.includes('front')) h=['front','back','chapter']; else st=1; const recs=[]; for(let i=st;i<l.length;i++){ const c=l[i].split(sep), r=Object.fromEntries(h.map((x,j)=>[x,c[j]||''])); recs.push({front:r.front||c[0]||'',back:r.back||c[1]||'',chapter:r.chapter||'Général'}) } await impSimpSub(f.name.replace(/\.[^.]+$/,''),recs) }
async function impJSON(f){ const o=JSON.parse(await f.text()); if(Array.isArray(o)) impSimpSub(f.name.replace(/\.[^.]+$/,''),o); else if(o.cards) impSimpSub(o.subject||f.name,o.cards) }
async function impSimpSub(n,l){
  const by={}; l.forEach(x=>{ const c=(x.chapter||'Général').trim()||'Général'; (by[c]=by[c]||[]).push({front:Media.rwHTML(String(x.front||''),{}),back:Media.rwHTML(String(x.back||''),{})}) });
  const chs=Object.entries(by).map(([cn,arr])=>{
    const cds=arr.map((r,i)=>mkCard(`${slugify(cn)}-${i}-${Date.now()}`,r.front,r.back));
    return mkChapter('chap-'+slugify(cn),cn,cds,!0)
  });
  const s={id:`import-${slugify(n)}-${Date.now()}`,title:n,chapters:chs,imported:!0}; data.subjects.push(s); data.app.currentSubjectId=s.id; saveData(); goDeck(!1)
}

/* --- STRUCTURE BUILDERS --- */
function buildChs(l){ 
  const by={}; l.forEach(r=>{ const n=r.chapter||'Sans catégorie'; (by[n]=by[n]||[]).push(r) }); 
  const orderMap = {};
  [typeof PHY_MAP!=='undefined'&&PHY_MAP, typeof MATH_MAP!=='undefined'&&MATH_MAP].filter(Boolean).forEach(m => Object.values(m).forEach((v,i) => orderMap[v.title] = i));
  const sortedKeys = Object.keys(by);
  sortedKeys.sort((a, b) => { const idxA = orderMap[a] !== undefined ? orderMap[a] : 999; const idxB = orderMap[b] !== undefined ? orderMap[b] : 999; return idxA - idxB; });
  return {
      chapters: sortedKeys.map(n=>{ 
          const cds=by[n].map(r=>mkCard(`${slugify(n)}-${r.id}`,r.front,r.back,r.mathSimple||null));
          return mkChapter('chap-'+slugify(n),n,cds)
      }), 
      app:{currentChapterId:null,theme:'dark',prefs:{fsTerm:22,fsDef:24,accent:'indigo',radius:14}}
  };
}
const buildSub=(t,l) => ({id:slugify(t),title:t,chapters:buildChs(l).chapters,groups:[]});
const buildMathSub = () => {
    const s = buildSub('Maths', dataMATH);
    s.emoji = '';
    if (s.chapters.length >= 1) {
        s.groups = [{
            id: 'g-math-all',
            chapIds: s.chapters.map(c => c.id),
            childGroupIds: [],
            parentGroupId: null,
            createdAt: Date.now(),
            title: 'Résumé de Cours',
            emoji: '📖',
            lastUsed: Date.now()
        }];
    }
    return s;
};
const buildCanon = () => [buildSub('Physique',dataPHY), buildMathSub(), buildSub('Anglais',dataEN)];

/* --- DATA MANAGEMENT --- */
function loadData(){ try{const r=LS.getItem(KEY);if(r){const p=JSON.parse(r);if(p.subjects)return p;if(p.chapters)return{subjects:[{id:'anglais',title:'Anglais',chapters:p.chapters,groups:[]}],app:p.app||{theme:'light',currentSubjectId:'anglais'}}}}catch{} const s=buildCanon(); return{subjects:s,app:{currentSubjectId:s[0]?.id,theme:'light',prefs:{fsTerm:22,fsDef:24,accent:'indigo',radius:14}}} }
function saveData(){ try{LS.setItem(KEY,JSON.stringify(data))}catch{} }

const debouncedSave = (() => {
  let t; const c = W.cancelIdleCallback || clearTimeout, r = W.requestIdleCallback || (cb=>setTimeout(cb,2000));
  return () => { c(t); t = r(saveData); };
})();

function pruneStats(){ const c=new Date(); c.setDate(c.getDate()-180); const k=dateKey(c); for(const s of data.subjects) for(const ch of s.chapters){ for(const x of ['dailyReviews','dailyDurMs','dailyDurCount','dailyChanges','dailyLog']){ const m=ch.stats[x]; if(m) for(const d in m) if(d<k) delete m[d]; } if(ch.stats.dailyLog) for(const a of Object.values(ch.stats.dailyLog)) if(a.length>200) a.splice(0,a.length-200); } }

const getSub = () => data.subjects.find(x=>x.id===data.app.currentSubjectId)||data.subjects[0];
const setSub = id => { if(data.subjects.find(s=>s.id===id)){data.app.currentSubjectId=id;saveData()} };
const getChs = () => getSub()?.chapters||[];
const updChDesc = c => { const e = c.emoji || getEmoji(c.title) || ''; c.description = (e ? e + ' ' : '') + c.title; };
function uniqId(s,b){ const ids=new Set((s.chapters||[]).map(c=>c.id)); if(!ids.has(b))return b; let i=2,d=b; while(ids.has(d))d=b+'-'+i++; return d }
function moveCh(fi,ci,ti){if(fi===ti)return!1;const f=data.subjects.find(s=>s.id===fi),t=data.subjects.find(s=>s.id===ti);if(!f||!t)return!1;const i=f.chapters.findIndex(c=>c.id===ci);if(i<0)return!1;const ch=f.chapters[i];ensGrps(f).forEach(g=>g.chapIds=g.chapIds.filter(id=>id!==ci));valGrps(f);f.chapters.splice(i,1);ch.id=uniqId(t,ch.id);(t.chapters=t.chapters||[]).push(ch);valGrps(t);if(!f.chapters.length){data.subjects=data.subjects.filter(s=>s.id!==f.id);if(data.app.currentSubjectId===fi)data.app.currentSubjectId=data.subjects[0]?.id}saveData();return!0}
function renSub(id,t,e){ const s=data.subjects.find(x=>x.id===id); if(!s)return!1; if(t)s.title=t.trim(); s.emoji=(e||'').trim(); saveData(); return!0 }

/* --- FOLDER / GROUP MANAGEMENT --- */
const ensGrps=s=>{if(!Array.isArray(s.groups))s.groups=[];return s.groups};
const findGrp=(s,id)=>ensGrps(s).find(g=>g.id===id);
const findGrpCh=(s,cid)=>ensGrps(s).find(g=>g.chapIds.includes(cid));
const findGrpOfGrp=(s,gid)=>ensGrps(s).find(g=>(g.childGroupIds||[]).includes(gid));
const grpEmojis=(s,g)=>{const z=new Set();g.chapIds.forEach(id=>{const c=s.chapters.find(x=>x.id===id),e=c?(c.emoji||getEmoji(c.title)||''):'';if(e)z.add(e)});return[...z].join(', ')};
const valGrps=s=>{const a=new Set(s.chapters.map(c=>c.id)),gi=new Set(ensGrps(s).map(g=>g.id));s.groups=ensGrps(s).map(g=>({...g,chapIds:(g.chapIds||[]).filter(x=>a.has(x)),childGroupIds:(g.childGroupIds||[]).filter(c=>gi.has(c)),parentGroupId:g.parentGroupId||null})).filter(g=>g.chapIds.length>=1||(g.childGroupIds||[]).length>=1)};

function getAllChapIdsRecursive(s,gid){const g=findGrp(s,gid);if(!g)return[];let ids=[...g.chapIds];for(const c of(g.childGroupIds||[]))ids.push(...getAllChapIdsRecursive(s,c));return[...new Set(ids)]}
function buildGrpStats(s,g){const ids=getAllChapIdsRecursive(s,g.id),chs=ids.map(id=>s.chapters.find(c=>c.id===id)).filter(Boolean),c=GRADE_INIT();chs.forEach(ch=>{const k=getLive(ch);for(let x in c)c[x]+=k[x]});const st={totalReviews:chs.reduce((a,b)=>a+(b.stats.totalReviews||0),0),dailyReviews:{},dailyDurMs:{},dailyDurCount:{},dailyChanges:{}},b=new Date();for(let i=0;i<60;i++){const d=new Date(b);d.setDate(b.getDate()-i);const k=dateKey(d);st.dailyReviews[k]=chs.reduce((a,b)=>a+(b.stats.dailyReviews[k]||0),0);st.dailyDurMs[k]=chs.reduce((a,b)=>a+(b.stats.dailyDurMs[k]||0),0);st.dailyDurCount[k]=chs.reduce((a,b)=>a+(b.stats.dailyDurCount[k]||0),0);st.dailyChanges[k]=chs.reduce((a,ch)=>{const v=ch.stats.dailyChanges[k];if(v){a.changed+=v.changed||0;a.total+=v.total||0}return a},{changed:0,total:0})}return{counts:c,stats:st}}

function buildVirt(s,g){
  const allIds = getAllChapIdsRecursive(s, g.id);
  const chs=allIds.map(id=>s.chapters.find(c=>c.id===id)).filter(Boolean), cards=[];
  chs.forEach(ch=>ch.cards.forEach(c=>cards.push({...c,id:`virt-${ch.id}-${c.id}`,_origin:{chapId:ch.id,cardId:c.id}})));
  const gs = buildGrpStats(s,g);
  return {id:'group-'+g.id,_groupId:g.id,title:g.title||`Fichier (${grpEmojis(s,g)})`,emoji:g.emoji||'',description:(g.emoji?g.emoji+' ':'')+(g.title||'Fichier'),virtual:!0,_ids:allIds,settings:{sessionSize:10,dailyGoal:10,reviewOrder:'front-first',langSwap:!1},filters:g.filters?deepClone(g.filters):{grades:GRADE_FILTERS()},stats:{gradeCounts:gs.counts,...gs.stats},cards,deadline:g.deadline,lastUsed:g.lastUsed}
}

function addGrp(s,ids,p=null){const u=[...new Set(ids)].filter(Boolean);if(u.length<2)return null;const gid='g'+Date.now().toString(36);ensGrps(s).push({id:gid,chapIds:u,childGroupIds:[],parentGroupId:p||null,createdAt:Date.now(),title:'',emoji:'',lastUsed:Date.now()});if(p){const pg=findGrp(s,p);if(pg){if(!pg.childGroupIds)pg.childGroupIds=[];pg.childGroupIds.push(gid);pg.chapIds=pg.chapIds.filter(id=>!u.includes(id))}}return gid}
function toGrp(s,g,c){const x=findGrp(s,g);if(x&&!x.chapIds.includes(c))x.chapIds.push(c)}
function remFromGrp(s,g,c){const x=findGrp(s,g);if(x)x.chapIds=x.chapIds.filter(i=>i!==c)}
function delGrp(s,gid){const g=findGrp(s,gid);if(!g)return;const p=g.parentGroupId?findGrp(s,g.parentGroupId):null;if(p){g.chapIds.forEach(c=>{if(!p.chapIds.includes(c))p.chapIds.push(c)});(g.childGroupIds||[]).forEach(cg=>{const x=findGrp(s,cg);if(x){x.parentGroupId=g.parentGroupId;if(!p.childGroupIds)p.childGroupIds=[];p.childGroupIds.push(cg)}});p.childGroupIds=(p.childGroupIds||[]).filter(x=>x!==gid)}else(g.childGroupIds||[]).forEach(cg=>{const x=findGrp(s,cg);if(x)x.parentGroupId=null});s.groups=ensGrps(s).filter(x=>x.id!==gid)}
function removeChildGrpFromParent(s,pid,cid){const p=findGrp(s,pid);if(!p)return;p.childGroupIds=(p.childGroupIds||[]).filter(x=>x!==cid);const c=findGrp(s,cid);if(c){c.chapIds.forEach(id=>{if(!p.chapIds.includes(id))p.chapIds.push(id)});c.parentGroupId=null}}
