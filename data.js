/* --- CONSTANTS & CATEGORIES --- */
// -- SUJETS ANGLAIS --
const CD="Democracy", CG="Genetics", CI="Immigration", CIT="International Relations", CU="Labor", CR="Crime", PC="Capital Punishment", CF="Status of Women";
const HI="HEALTH ISSUES", IF="INDIVIDUAL FREEDD OM", IDR="ILLEGAL DRUGS", VI="Verbes Irréguliers"; CO="THE CORONAVIRUS CRISIS"; 

// -- SUJETS PHYSIQUE --
const PM="M2", PM3="M3", PM4="M4";
const PEM1="EM1", PEM2="EM2", PE345="E3-E4-E5", PEM6="EM6", PEM7="EM7", PEM8="EM8(Pas de E7)", PEM9="EM9", PEM10="EM10", PEM11="EM11", PEM12="EM12", PEM13="EM13", PEM14="EM14", PEM15="EM15";
const PO1="O1", PO2="O2", PO3="O3", PO4="O4";

// -- EMOJIS --
const C_EMOJIS = {
  [CD]:'🏛️', [CG]:'🧬', [CI]:'🧳', [CIT]:'🌐', [CU]:'💼', [CR]:'⚖️', [PC]:'💀', [CF]:'♀️', [HI]:'⚕️', [IF]:'🗽', [IDR]:'💊', [VI]:'📚', [CO]:'⚕️', 
  [PM]:'⚙️', [PM3]:'🌍', [PM4]:'🤝',
  [PEM1]:'⚡️', [PEM2]:'🧲', [PE345]:'🧲', [PEM6]:'🧲', [PEM8]:'🧲', [PEM9]:'🧲', [PEM10]:'🧲', [PEM11]:'🧲', [PEM12]:'🧲', [PEM13]:'🧲', [PEM14]:'🧲', [PEM15]:'🧲',
  [PO1]:'🌈', [PO2]:'🌈', [PO3]:'🌈', [PO4]:'🌈',
  // Fallbacks texte au cas où
  'Politique':'🏛️', 'Business':'💼', 'Education':'🎓', 'Thanksgiving':'🦃'
};

/* --- RAW DATA CONTENT --- */

const RAW_EN = `
0|monarchie|monarchy|${CD}
1|monarque de droit divin|a monarch by divine right|${CD}
1243|mettre qn en chômage partiel|to furlough sb|${CO}
1244|achats (sous l’emprise de la) panique|panic buying|${CO}

8000|supporter/porter/naître|bear / bore / borne/born|${VI}
8001|battre|beat / beat / beaten|${VI}
8002|devenir|become / became / become|${VI}
8003|commencer|begin / began / begun|${VI}
8004|plier, se courber|bend / bent / bent|${VI}
8124|(se) retirer, retirer de l’argent|withdraw / withdrew / withdrawn|${VI}
8125|écrire|write / wrote / written|${VI}
`.trim();

const RAW_PHY = `
10000|<span style="color: rgb(255, 170, 0);">(Shems)</span> Qu'est-ce qu'un référentiel galiléen ?|Un référentiel galiléen est un référentiel dans lequel le principe d'inertie est vérifié : tout objet isolé ou pseudo-isolé est soit immobile, soit en mouvement rectiligne uniforme dans ce référentiel.|${PM}
10274|<span style="color: rgb(0, 255, 0);">(L.L)</span> Contact optique.|$e=0, \\alpha=0$. $\\delta=0$ partout. Teinte plate brillante.|${PO4}
10275|<span style="color: rgb(255, 170, 0);">(A.R)</span> Justification formes franges.|Lame $\\delta(i)$ : iso-i = cercles.<br>Coin $\\delta(x)$ : iso-x = droites.|${PO4}
`.trim();
