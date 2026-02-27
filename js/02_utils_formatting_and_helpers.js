/* --- VARIABLES GLOBALES & RACCOURCIS --- */
const D = document, W = window, LS = localStorage, M = Math;
const $ = (s, p=D) => p.querySelector(s);
const $$ = (s, p=D) => [...p.querySelectorAll(s)];
const clamp = (n, mn, mx) => n < mn ? mn : n > mx ? mx : n;

const slugify = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const dateKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const todayKey = () => dateKey(new Date());
const getDayStart = () => new Date().setHours(0,0,0,0);
const avg = a => a?.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
const deepClone = o => JSON.parse(JSON.stringify(o));
const isSucc = g => g === 'facile' || g === 'bien';

/* --- MATHJAX & TEXT FORMATTING --- */
let mathCache = new Set();
const clearMathCache = () => { mathCache = new Set(); };

const needsMath = s => /[$]|\\[(\[]|\\frac|\\sqrt|\\text/.test(s);
const tsLat = async e => { 
  if(e && !needsMath(e.innerHTML)) return;
  if(!W.MathJax?.typesetPromise) {
    if(!W.loadMathJax) return;
    await W.loadMathJax();
    if(!W.MathJax?.typesetPromise) return;
  }
  const id = e?.id || e?.dataset?.id;
  if(id) { if(mathCache.has(id)) return; mathCache.add(id); }
  return W.MathJax.typesetPromise(e ? [e] : null).catch(() => {});
};
W.MathJax = { tex:{inlineMath:[['$','$'],['\\(','\\)']], displayMath:[['$$','$$'],['\\[','\\]']], processEscapes:!0}, options:{skipHtmlTags:['script','style','textarea']}, startup:{typeset:!1} };

const getEmoji = t => (typeof C_EMOJIS !== 'undefined' ? C_EMOJIS[t] : '') || '';
const isMathChapter = () => { const s = getSub(); return /math/i.test(s?.title || ''); };
const getMathSimple = card => card.mathSimple || null;
const extractId = c => String(c).match(/-(\d+)$/)?.[1] || null;
const getSides = (c, ch) => ch?.settings?.langSwap ? {f:c.back, b:c.front} : {f:c.front, b:c.back};
const fmtDur = ms => { const s = M.round(ms / 1e3); return `${s / 60 | 0}:${String(s % 60).padStart(2, '0')}`; };
const fmtDayFR = k => { const [Y, Mo, Dy] = k.split('-').map(Number), d = new Date(Y, Mo - 1, Dy); return `${['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][d.getDay()]} ${String(Dy).padStart(2, '0')} ${['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'][Mo - 1]} ${Y}`; };

const md2html = s => s
    .replace(/\*\*([^*]+?:)\*\*/g, '<span class="math-label">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, '<em>$1</em>')
    .replace(/^\s*[\*\-]\s{2,}/gm, '• ')
    .replace(/\n/g, '<br>');

const formatText = t => t ? t
    .replace(/(?:>>>|>>)?\s*\[IMAGE_ID:\s*(.+?)\](?:\s*<<<)?/g, (_, f) => `<img src="images/${f.trim()}" alt="Schéma" loading="lazy">`)
    .replace(/\\\[\s*\\text\s*\{([^{}]+)\}\s*\\\]/g, (m, c) => c.includes(' ') ? c : m)
    .replace(/\n|\\newline/g, '<br>').replace(/\[latex\]|\[\/latex\]/g, '').replace(/\[\$\]/g, '\\(').replace(/\[\/\$\]/g, '\\)') : '';

const parseMathData = (raw) => {
    if (!raw) return [];
    const result = []; let idCounter = 0;
    const chapSplit = raw.split(/^#\s+CHAPITRE\s+(\d+)\s*[—–-]\s*(.+)$/gm);
    for (let i = 1; i + 2 < chapSplit.length; i += 3) {
        const chNum = chapSplit[i].trim();
        const chKey = 'CH' + chNum;
        const chTitle = typeof MATH_MAP !== 'undefined' && MATH_MAP[chKey] ? MATH_MAP[chKey].title : chapSplit[i+1].trim();
        const content = chapSplit[i+2];
        const cardSplit = content.split(/^##\s+FLASHCARD\s+\d+\s*[—–-]\s*.+$/gm);
        for (let j = 1; j < cardSplit.length; j++) {
            const block = cardSplit[j];
            const rectoMatch = block.match(/###\s+RECTO\s*\n([\s\S]*?)(?=###\s+VERSO|$)/);
            const versoMatch = block.match(/###\s+VERSO\s*\n([\s\S]*?)(?=###\s+L[''']ŒIL|---\s*$|$)/);
            const oeilMatch = block.match(/###\s+L[''']ŒIL DE L[''']X\s*\n([\s\S]*?)(?=---\s*$|$)/);
            if (!rectoMatch) continue;
            let front = rectoMatch[1].trim();
            let back = (versoMatch ? versoMatch[1].trim() : '');
            if (oeilMatch) back += '\n\n---\n\n**🔍 L\'Œil de l\'X :**\n\n' + oeilMatch[1].trim();
            let mathSimple = null;
            const hypoM = back.match(/\*\*Hypothèses complètes\s*:\*\*\s*([\s\S]*?)(?=\*\*Énoncé formel|$)/);
            const enonceM = back.match(/\*\*Énoncé formel\s*:\*\*\s*([\s\S]*?)(?=\*\*Démonstration|\*\*Subtilités|\*\*Extensions|\*\*Pièges|\*\*🔍|###|$)/);
            const hText = hypoM ? hypoM[1].trim() : '';
            const eText = enonceM ? enonceM[1].trim() : '';
            if (hText || eText) {
                mathSimple = md2html(hText + (hText && eText ? '\n\n' : '') + eText);
            }
            result.push({ id: 'math-' + (idCounter++), front: md2html(front), back: md2html(back), mathSimple: mathSimple, chapter: chTitle });
        }
    }
    return result;
};

const parsePhysicsData = (rawData) => {
    if (!rawData) return [];
    const decks = rawData.split(/={10,}\s*DECK\s*:\s*/), result = []; let idCounter = 0;
    for(const deckBlock of decks) {
        if (!deckBlock.trim()) continue;
        const lines = deckBlock.split('\n'), deckCode = lines[0].trim(), deckName = typeof PHY_MAP !== 'undefined' && PHY_MAP[deckCode] ? PHY_MAP[deckCode].title : deckCode;
        for(const rawCard of deckBlock.substring(deckCode.length).replace(/^=+/gm, '').trim().split(/-{10,}/)) {
            if (!rawCard.trim()) continue;
            const qMatch = rawCard.match(/Q:\s*([\s\S]*?)(?=R:)/), rMatch = rawCard.match(/R:\s*([\s\S]*)/);
            if (qMatch && rMatch) result.push({ id: 'phy-' + (idCounter++), front: formatText(qMatch[1].trim()), back: formatText(rMatch[1].trim()), chapter: deckName });
        }
    }
    return result;
};

/* --- UI HELPERS --- */
function toast(msg, type='info', dur=2500) {
  let el = $('#toast') || Object.assign(D.createElement('div'), {id:'toast'});
  if(!el.parentNode) D.body.appendChild(el);
  el.textContent = msg; el.className = `toast ${type}`;
  requestAnimationFrame(() => { el.classList.add('show'); setTimeout(() => el.classList.remove('show'), dur); });
}

const haptic = (s='light') => navigator.vibrate?.({light:10,medium:20,heavy:30,success:[10,50,10],error:[30,50,30]}[s]||10);

/* --- LIGHTBOX --- */
const LB = { el:null, stage:null, cnv:null, img:null, cnt:null, imgs:[], idx:0, bw:0, bh:0, s:1, mnS:1, mxS:5, x:0, y:0, ptrs:new Map(), sDist:0, sS:1, sX:0, sY:0, psX:0, psY:0, tm:!1 };
function ensureLB(){
  if(LB.el)return LB.el; const el=D.createElement('div'); el.className='img-lightbox'; el.innerHTML='<div class="img-stage" id="lbStg" tabindex="-1"><div class="img-canvas" id="lbCnv"><img id="lbImg" alt=""></div></div><div class="img-counter" id="lbCnt">1/1</div>'; D.body.appendChild(el);
  LB.el=el; LB.stage=el.querySelector('#lbStg'); LB.cnv=el.querySelector('#lbCnv'); LB.img=el.querySelector('#lbImg'); LB.cnt=el.querySelector('#lbCnt');
  const pd=e=>{ LB.stage.setPointerCapture?.(e.pointerId); LB.ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY}); if(LB.ptrs.size===1){LB.psX=LB.x;LB.psY=LB.y;LB.sX=e.clientX;LB.sY=e.clientY;LB.sS=LB.s;LB.tm=!1}else if(LB.ptrs.size===2){const p=[...LB.ptrs.values()];LB.sDist=M.hypot(p[0].x-p[1].x,p[0].y-p[1].y)||1;LB.sS=LB.s;LB.tm=!0} e.preventDefault() };
  const pm=e=>{ if(!LB.ptrs.has(e.pointerId))return; LB.ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY}); const dx=e.clientX-LB.sX, dy=e.clientY-LB.sY; if(M.abs(dx)>6||M.abs(dy)>6)LB.tm=!0; if(LB.ptrs.size>=2){const p=[...LB.ptrs.values()];setLBScale(LB.sS*(M.hypot(p[0].x-p[1].x,p[0].y-p[1].y)/LB.sDist||1))}else setLBPan(LB.psX+dx,LB.psY+dy); e.preventDefault() };
  const pu=e=>{ if(LB.ptrs.has(e.pointerId))LB.ptrs.delete(e.pointerId); if(LB.ptrs.size===0){if(!LB.tm){const r=LB.img.getBoundingClientRect();if(!(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom))closeLB()}LB.sDist=0}else if(LB.ptrs.size===1){const p=[...LB.ptrs.values()][0];LB.sX=p.x;LB.sY=p.y;LB.psX=LB.x;LB.psY=LB.y;LB.sS=LB.s;LB.sDist=0} };
  let lt=0; LB.stage.addEventListener('pointerdown',e=>{pd(e);const n=Date.now();if(n-lt<250){setLBScale(LB.s>LB.mnS+0.001?LB.mnS:M.min(LB.mxS,LB.mnS*2.2));LB.tm=!0}lt=n});
  LB.stage.addEventListener('pointermove',pm); LB.stage.addEventListener('pointerup',pu); LB.stage.addEventListener('pointercancel',pu); LB.stage.addEventListener('lostpointercapture',pu);
  LB.stage.addEventListener('wheel',e=>{e.preventDefault();setLBScale(LB.s+(e.deltaY>0?-.15:.15)*LB.s)},{passive:!1}); W.addEventListener('resize',()=>{if(LB.el.classList.contains('open'))refitLB()}); return el;
}
function openLB(img,sc){ ensureLB(); const l=[...sc.querySelectorAll('img')]; LB.imgs=l.map(i=>({src:i.currentSrc||i.src,alt:i.alt||'',w:i.naturalWidth||800,h:i.naturalHeight||600})); LB.idx=M.max(0,l.indexOf(img)); LB.el.classList.add('open'); D.body.dataset._ov=D.body.style.overflow||''; D.body.style.overflow='hidden'; LB.el.focus?.(); showLB(LB.idx,!0) }
function closeLB(){ LB.el.classList.remove('open'); LB.imgs=[]; LB.idx=0; D.body.style.overflow=D.body.dataset._ov||'' }
function safeCloseLB(){ try{if(LB?.el?.classList.contains('open'))closeLB()}catch(e){} }
function showLB(i,init=!1){ if(!LB.imgs.length)return; LB.idx=(i+LB.imgs.length)%LB.imgs.length; const t=LB.imgs[LB.idx]; LB.img.src=t.src; LB.img.alt=t.alt; LB.bw=t.w; LB.bh=t.h; if(LB.cnt)LB.cnt.textContent=`${LB.idx+1}/${LB.imgs.length}`; refitLB(init) }
function refitLB(init=!1){ const sw=LB.stage.clientWidth, sh=LB.stage.clientHeight, fit=M.min(sw/LB.bw,sh/LB.bh); LB.mnS=fit; if(init){LB.s=fit;LB.x=(sw-LB.s*LB.bw)/2;LB.y=(sh-LB.s*LB.bh)/2;applyLB()}else setLBScale(fit,!0) }
function applyLB(){ const sw=LB.stage.clientWidth, sh=LB.stage.clientHeight, w=LB.s*LB.bw, h=LB.s*LB.bh; LB.x=w<=sw?(sw-w)/2:clamp(LB.x,sw-w,0); LB.y=h<=sh?(sh-h)/2:clamp(LB.y,sh-h,0); LB.cnv.style.width=LB.bw+'px'; LB.cnv.style.height=LB.bh+'px'; LB.cnv.style.transform=`translate(${LB.x}px,${LB.y}px) scale(${LB.s})` }
function setLBPan(nx,ny){ LB.x=nx; LB.y=ny; applyLB() }
function setLBScale(ns,f=!1){ const os=LB.s, s=clamp(ns,LB.mnS,LB.mxS); if(!f&&M.abs(s-os)<1e-4)return; const cx=LB.stage.clientWidth/2, cy=LB.stage.clientHeight/2; LB.s=s; LB.x=cx-s*((cx-LB.x)/os); LB.y=cy-s*((cy-LB.y)/os); applyLB() }
