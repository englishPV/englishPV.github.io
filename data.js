/* --- CONSTANTS & CATEGORIES (ANGLAIS) --- */
const CD="Democracy", CG="Genetics", CI="Immigration", CIT="International Relations", CU="Labor", CR="Crime", PC="Capital Punishment", CF="Status of Women";
const HI="HEALTH ISSUES", IF="INDIVIDUAL FREEDOM", IDR="ILLEGAL DRUGS", VI="Verbes Irréguliers", CO="THE CORONAVIRUS CRISIS", ED="EATING DISORDERS";

// Constantes ajoutées pour couvrir les variables de la Map Emoji et la fin du texte brut
const EDU="Education", ECO="Economy", SPO="Sports", GUN="Gun Control", REL="Religion", ENV="Environment", TEC="Technology", MED="Media";
const THA="Thanksgiving", BUS="Business", POL="Politique" , WP="War & Peace", SLM="Sex Love Marriage";
const SSM="Same Sex Marriage";

// NOUVELLE CONSTANTE : SPACE
const SPA="Space";

/* --- MAPPING PHYSIQUE (ORDRE ET NOMS) --- */
const PHY_MAP = {
  // --- Électrocinétique ---
  "EL1": { title: "Electrocinetique Sup", emoji: "🔌" },

  // --- Mécanique ---
  "M1": { title: "M1 - Cinématique du point", emoji: "🚀" },
  "M2": { title: "M2 - Dynamique & Énergétique", emoji: "🎢" },
  "M3": { title: "M3 - Mouvement à force centrale", emoji: "🪐" },
  "M4": { title: "M4 - Mécanique du solide", emoji: "⛸️" },
  
  // --- Optique ---
  "O1": { title: "O1 - Optique Géométrique", emoji: "👓" },
  "O2": { title: "O2 - Intro Interférences", emoji: "〰️" },
  "O3": { title: "O3 - Interférences (Young)", emoji: "🌈" },
  "O4": { title: "O4 - Michelson", emoji: "🔬" },

  // --- Thermodynamique ---
  "THS": { title: "Thermo Sup", emoji: "🔥" },
  "T1": { title: "T1", emoji: "🌡️" },
  "T2": { title: "T2", emoji: "⚙️" },

  // --- Électromagnétisme ---
  "EM1": { title: "EM1 - Symétries & Invariances", emoji: "📐" },
  "EM2": { title: "EM2 - Champ & Potentiel", emoji: "⚡" },
  "EM 3, 4 et 5": { title: "EM3/4/5 - Théorème de Gauss", emoji: "∫" },
  "EM6": { title: "EM6 - Champ Magnétostatique", emoji: "🧲" },
  "EM8": { title: "EM8 - Dipôle Magnétostatique", emoji: "🧭" },
  "EM9": { title: "EM9 - Dipôle Électrostatique", emoji: "⚛️" },
  "EM10": { title: "EM10 - Équations de Maxwell", emoji: "📜" },
  "EM11": { title: "EM11 - Propagation (Vide)", emoji: "💨" },
  "EM12": { title: "EM12 - Énergétique & Poynting", emoji: "🔋" },
  "EM13": { title: "EM13 - Propagation (Conducteurs)", emoji: "🔌" },
  "EM14": { title: "EM14 - Plasmas", emoji: "☀️" },
  "EM15": { title: "EM15 - Rayonnement Dipolaire", emoji: "📡" },

  // --- Physique Moderne & Chimie ---
  "MQ1": { title: "MQ MPI", emoji: "🧩" },
  "CH1": { title: "Reaction Acide Base", emoji: "🧪" },
  
  // --- Divers ---
  "TD1": { title: "TD 02/03", emoji: "📝" }
};

// Fusion des Emojis
const C_EMOJIS = {
  [CD]:  '🗳️', 
  [CIT]: '🌐',   // International Relations
  [IF]:  '🗽',   // Individual Freedom
  [CR]:  '🚔',   // Crime
  [PC]:  '⚖️',   // Capital Punishment
  [GUN]: '🔫',   // Gun Control
  [REL]: '🛐',   // Religion
  [POL]: '🏛️',   // Politique
  [WP]:  '⚔️',
  [SLM]: '❤️',
  [SSM]: '🏳️‍🌈',  // Same Sex Marriage
  [SPA]: '🌌',   // Space (Nouvel Emoji)

  // --- Social & Économie ---
  [CI]:  '🧳',   // Immigration
  [CF]:  '♀️',    // Status of Women
  [CU]:  '💼',   // Labor
  [EDU]: '🎓',   // Education
  [ECO]: '📈',   // Economy
  [SPO]: '🏆',   // Sports
  [BUS]: '💼',   // Business
  [THA]: '🦃',   // Thanksgiving

  // --- Sciences, Santé & Tech ---
  [CG]:  '🧬',   // Genetics
  [HI]:  '🩺',   // Health Issues
  [CO]:  '🦠',   // Coronavirus
  [ED]:  '🍽️',   // Eating Disorders
  [IDR]: '💊',   // Illegal Drugs
  [ENV]: '🌱',   // Environment
  [TEC]: '💻',   // Technology
  [MED]: '📰',   // Media

  // --- Grammaire ---
  [VI]:  '📝'    // Verbes Irréguliers
};

// Ajout des chapitres de physique à l'objet emojis
Object.values(PHY_MAP).forEach(v => C_EMOJIS[v.title] = v.emoji);

/* --- MAPPING MATHS --- */
const MATH_MAP = {
  "CH1": { title: "Ch.1 — Suites, fonctions réelles", emoji: "📊" },
};
Object.values(MATH_MAP).forEach(v => C_EMOJIS[v.title] = v.emoji);


/* --- RAW DATA CONTENT --- */

const RAW_EN = String.raw`
0|monarchie|monarchy|${CD}
1|monarque de droit divin|a monarch by divine right|${CD}
2|souverain|sovereign|${CD}
3|aristocratie|aristocracy|${CD}
4|oligarchie|oligarchy|${CD}
5|dictateur|a dictator|${CD}
6|dictature|dictatorship|${CD}
7|autoritaire|authoritarian|${CD}
8|autoritarisme|authoritarianism|${CD}
9|totalitaire|totalitarian|${CD}
10|totalitarisme|totalitarianism|${CD}
11|homme fort|a strongman|${CD}
12|tyran|a tyrant, an autocrat|${CD}
13|despote|a despot|${CD}
14|despote éclairé|an enlightened despot|${CD}
15|junte militaire|a military junta|${CD}
16|coup d'État|a coup, a coup d'état|${CD}
17|gouvernement autoritaire|a regime|${CD}
18|régime de Vichy / de Pinochet|the Vichy / Pinochet regime|${CD}
19|régime répressif|a repressive regime|${CD}
20|régime politique|a political system|${CD}
21|se démocratiser|to become more democratic|${CD}
22|prendre le pouvoir|to take, seize power|${CD}
23|arriver au pouvoir|to come to power|${CD}
24|arriver au pouvoir (démocratiquement)|to come into office|${CD}
25|être au pouvoir|to be in power|${CD}
26|rester au pouvoir|to remain, stay in power|${CD}
27|s'accrocher au pouvoir|to cling to power|${CD}
28|bonne gouvernance|good governance|${CD}
29|mal administrer, mal gérer|to misrule, mismanage|${CD}
30|mauvaise administration|misrule|${CD}
31|mauvaise gestion|mismanagement|${CD}
32|tenir un dirigeant pour responsable|to hold a leader to account|${CD}
33|être responsable devant les électeurs|to be accountable to the electorate|${CD}
34|responsabilité|accountability|${CD}
35|corruption|corruption, sleaze, bribery|${CD}
36|corrompu|corrupt|${CD}
37|pot-de-vin|a bribe|${CD}
38|acheter, soudoyer qn|to bribe sb|${CD}
39|état de droit, règne de la loi|the rule of law|${CD}
40|multipartisme|multi-party system|${CD}
41|système de parti unique|single-party system|${CD}
42|élections libres et régulières|free and fair elections|${CD}
43|fraude électorale|vote rigging, ballot rigging, electoral fraud|${CD}
44|l'élection était truquée|the election was rigged|${CD}
45|opposant politique|a political opponent|${CD}
46|dissident|a dissident|${CD}
47|bâillonner / museler la presse / l'opposition|to gag / muzzle the press / the opposition|${CD}
48|déclarer l'état d'urgence|to declare a state of emergency|${CD}
49|bafouer la constitution|to trample the constitution|${CD}
50|censurer|to censor|${CD}
51|censure|censorship|${CD}
52|bloquer / restreindre l'accès à internet|to block / restrict internet access|${CD}
53|contourner la censure|to circumvent, bypass censorship|${CD}
54|droits de l'homme|human rights|${CD}
55|atteintes aux droits de l'homme|human rights abuses, violations|${CD}
56|crime contre l'humanité|a crime against humanity|${CD}
57|devoir d'ingérence|the duty to interfere, to intervene|${CD}
58|association de défense des droits de l'homme|human Rights lobby|${CD}
59|passé de la Chine en matière de droits de l'homme|China's human rights record|${CD}
60|mécontentement, malaise|discontent|${CD}
61|provoquer des troubles|to spark unrest|${CD}
62|agitation|turmoil|${CD}
63|bouleversement|an upheaval|${CD}
64|fomenter des troubles|to stir up trouble|${CD}
65|insurgé|an insurgent|${CD}
66|insurrection|an insurgency|${CD}
67|manifestation|a demonstration, a protest march|${CD}
68|manifestant|a demonstrator, a protester|${CD}
69|organiser / participer à un rassemblement|to hold / attend a rally|${CD}
70|émeute|a riot|${CD}
71|émeutier, casseur|a rioter|${CD}
72|des émeutes ont éclaté|riots broke out|${CD}
73|CRS|anti-riot police|${CD}
74|cocktail Molotov|a petrol bomb, a Molotov cocktail|${CD}
75|gaz lacrymogène|tear gas|${CD}
76|heurt, affrontement|a clash|${CD}
77|échauffourée|a skirmish|${CD}
78|complot|a plot|${CD}
79|comploteur|a plotter|${CD}
80|se révolter|to revolt|${CD}
81|se rebeller|to rebel|${CD}
82|rebelle|a rebel|${CD}
83|rébellion, révolte|a rebellion|${CD}
84|déjouer les autorités|to defy the authorities|${CD}
85|soulèvement|an uprising|${CD}
86|se soulever contre|to rise up against|${CD}
87|renverser un dictateur|to overthrow, to topple a dictator|${CD}
88|évincer un dictateur|to oust a dictator|${CD}
89|renversement d'un dictateur|the overthrow of a dictator|${CD}
90|déposer un dirigeant|to depose a ruler|${CD}
91|s'effondrer|to collapse|${CD}
92|restaurer la démocratie|to restore democracy|${CD}
93|chute d'un gouvernement|the downfall of a government|${CD}
94|répression brutale|ruthless repression|${CD}
95|réprimer une rébellion|to put down, to suppress a rebellion|${CD}
96|réprimer, étouffer la contestation|to quell the protests|${CD}
97|mesures de répression|crackdown, clampdown|${CD}
98|mettre les gens en prison|to send people to prison|${CD}
99|passer qn à tabac|to beat sb up|${CD}
100|gène|a gene|${CG}
101|cellule|a cell|${CG}
102|cellules-souches|stem cells|${CG}
103|recherche sur les cellules souches|stem-cell research|${CG}
104|génome humain|the human genome|${CG}
105|cartographie du génome|genome mapping|${CG}
106|carte génétique|gene map, genetic map|${CG}
107|séquence génétique|gene sequence|${CG}
108|séquençage|sequencing|${CG}
109|épissage du gène|gene splicing|${CG}
110|patrimoine héréditaire|gene pool|${CG}
111|généticien|a geneticist|${CG}
112|eugénisme|eugenics|${CG}
113|eugéniste, partisan de l'eugénisme|a eugenicist|${CG}
114|ADN|DNA|${CG}
115|test génétique|a DNA test|${CG}
116|empreinte génétique|a DNA print, genetic print|${CG}
117|analyse ADN|DNA analysis|${CG}
118|prélèvement d'ADN|a DNA sample|${CG}
119|profil génétique|genetic make-up, genetic profile|${CG}
120|analyse de l'empreinte génétique|genetic profiling, DNA fingerprinting|${CG}
121|dépistage génétique|genetic screening|${CG}
122|subir un prélèvement d'ADN|to be DNA-swabbed|${CG}
123|manipulations génétiques, génie génétique|genetic engineering|${CG}
124|transgénique|transgenic|${CG}
125|organisme génétiquement modifié|a genetically modified organism|${CG}
126|OGM|GMOs|${CG}
127|aliments contenant des OGM|GM food|${CG}
128|pommes de terres génétiquement modifiées|GM potatoes|${CG}
129|produits transgéniques|biotech products|${CG}
130|semence, graines|seed|${CG}
131|soja|soyabeans|${CG}
132|colza|rapeseed|${CG}
133|maïs|maize (GB), corn (US)|${CG}
134|blé|wheat|${CG}
135|culture, récolte|a crop|${CG}
136|essais sur le terrain|field trials, crop trials|${CG}
137|culture OGM|a GM crop|${CG}
138|rendement|yield|${CG}
139|filière agroalimentaire|agribusiness|${CG}
140|augmenter, améliorer les rendements|to improve yields|${CG}
141|résistant aux maladies|resistant to disease|${CG}
142|insecticide / pesticide / herbicide|insecticide / pesticide / herbicide|${CG}
143|polliniser|to pollinate|${CG}
144|pollinisation croisée|cross-pollination|${CG}
145|contaminer|to contaminate|${CG}
146|contamination|contamination|${CG}
147|maladie génétique|a genetic disease|${CG}
148|gène défectueux|a faulty gene|${CG}
149|gène manquant|a missing gene|${CG}
150|héréditaire|hereditary|${CG}
151|chromosome X / Y|an X / Y chromosome|${CG}
152|clonage|cloning|${CG}
153|conseil génétique|genetic counselling|${CG}
154|entreprise pharmaceutique|a pharmaceutical company|${CG}
155|thérapie génique|gene therapy|${CG}
156|traitement génique|genetic treatment|${CG}
157|à des fins thérapeutiques|for therapeutic purposes|${CG}
158|agriculture au service de la médecine|pharming|${CG}
159|jouer à l'apprenti-sorcier|to play God|${CG}
160|toucher à la nature|to tamper with nature|${CG}
161|principe de précaution|the precautionary principle, the safety-first principle|${CG}
162|étiquette|a label|${CG}
163|étiquetter|to label|${CG}
164|étiquetage|labelling|${CG}
165|avertir|to warn|${CG}
166|avertissement|a warning|${CG}
167|dont l'origine peut être établie|traceable|${CG}
168|traçabilité|traceability|${CG}
169|effets à long terme|long-term effects|${CG}
170|chaîne alimentaire|the food chain|${CG}
171|sécurité alimentaire|food security|${CG}
172|lobby OGM|the pro-GM lobby|${CG}
173|militants contre les OGM|anti-GM activists|${CG}
174|campagne contre les OGM|an anti-GM campaign|${CG}
175|étranger|a foreigner|${CI}
176|inconnu|a stranger|${CI}
177|nationalité|nationality|${CI}
178|ressortissant étranger|a foreign national|${CI}
179|personnes de nationalité française|French citizens|${CI}
180|émigrer en Nouvelle-Zélande|to emigrate to New Zealand|${CI}
181|immigrer en France|to immigrate to France|${CI}
182|vague d'immigration|a wave of immigration|${CI}
183|immigration à grande échelle / de masse|large-scale / mass immigration|${CI}
184|exode|an exodus|${CI}
185|nouvel arrivant|a newcomer|${CI}
186|pays natal, pays d'origine|native country, home country|${CI}
187|patrie|homeland|${CI}
188|pays d'accueil|a host country|${CI}
189|pays d'adoption|an adoptive country, a country of adoption|${CI}
190|accueillir|to welcome|${CI}
191|accueillant|welcoming|${CI}
192|politique migratoire|immigration policy|${CI}
193|immigration choisie|selective immigration, controlled immigration|${CI}
194|flux migratoires|migration flows|${CI}
195|passager clandestin|a stowaway|${CI}
196|immigration clandestine, irrégulière|illegal immigration|${CI}
197|immigration sauvage|uncontrolled immigration|${CI}
198|immigrant clandestin, sans-papiers|an illegal immigrant, an illegal alien, an undocumented alien|${CI}
199|il est en situation irrégulière|his papers are not in order|${CI}
200|frontière|a border, a frontier|${CI}
201|fermer ses frontières|to close one's borders|${CI}
202|contrôles aux frontières|border controls|${CI}
203|contrôles d'identité|identity checks|${CI}
204|centre de rétention (administrative)|a holding centre, a detention facility|${CI}
205|passeport|a passport|${CI}
206|carte d'identité|an identity card|${CI}
207|visa|a visa|${CI}
208|réfugié|a refugee|${CI}
209|personne déplacée|a displaced person|${CI}
210|apatride|a stateless person|${CI}
211|se réfugier|to take refuge, take shelter|${CI}
212|demander l'asile politique|to seek political asylum|${CI}
213|demandeur d'asile|an asylum-seeker|${CI}
214|fuir la persécution / la misère|to flee persecution / destitution|${CI}
215|échapper à la pauvreté|to escape poverty|${CI}
216|chercher de meilleures conditions de vie|to be in search of better living conditions|${CI}
217|trafic des êtres humains|human trafficking|${CI}
218|contrebandier, passeur|a smuggler|${CI}
219|passeurs d'immigrants clandestins|people-smugglers|${CI}
220|réseau de passeurs|a smuggling ring|${CI}
221|faux passeport|a fake passport|${CI}
222|reconduire qn à la frontière|to escort sb back to the border|${CI}
223|renvoyer un immigrant dans son pays d'origine|to send an immigrant back to his native country|${CI}
224|expulser qn|to deport sb|${CI}
225|être refoulé à la frontière|to be turned away at the border|${CI}
226|être expulsé|to be ordered out of the country|${CI}
227|s'exiler|to go into exile|${CI}
228|exilé|an exile|${CI}
229|exiler, bannir qn|to exile, banish sb|${CI}
230|s'expatrier|to expatriate oneself|${CI}
231|expatrié|an expatriate, an expat|${CI}
232|passer à l'Ouest / à l'ennemi|to defect to the West / to the enemy|${CI}
233|fuite des cerveaux / afflux des cerveaux|brain drain / brain gain|${CI}
234|partir de rien|to start from scratch|${CI}
235|travail au noir|moonlighting|${CI}
236|atelier clandestin|a sweatshop|${CI}
237|exploiter les travailleurs immigrés|to exploit migrant workers|${CI}
238|permis de travail, carte de travail|a work permit|${CI}
239|permis de séjour, carte de séjour|a residence permit, a resident permit|${CI}
240|travailleur migrant|a migrant worker|${CI}
241|travailleur invité (disposant d'un visa temporaire)|a guest worker|${CI}
242|s'intégrer|to become integrated|${CI}
243|bien s'intégrer dans une société|to integrate well into a society|${CI}
244|insertion sociale|social integration|${CI}
245|régulariser la situation des clandestins|to regularise the status of illegal immigrants|${CI}
246|régularisation|regularisation|${CI}
247|se faire naturaliser britannique, être naturalisé britannique, obtenir la nationalité britannique|to be granted British citizenship, to become a British citizen|${CI}
248|quota|a quota|${CI}
249|regroupement familial|family reunion, reunification|${CI}
250|qn qui abuse du système des prestations sociales|a benefit cheat|${CI}
251|fraude aux prestations sociales|benefit fraud|${CI}
252|parasite|a freeloader|${CI}
253|mariage blanc|a sham marriage, a marriage of convenience|${CI}
254|inonder|to flood|${CI}
255|être envahi par les étrangers|to be swamped with foreigners|${CI}
256|arrivée massive, afflux de travailleurs|the influx of workers|${CI}
257|endiguer l'afflux d'immigrés|to stem the flow of immigrants|${CI}
258|limiter / freiner l'immigration|to restrict / curb immigration|${CI}
259|parti d'extrême-droite|a far-right party|${CI}
260|faire fuir les immigrants|to scare immigrants away|${CI}
261|empêcher les indésirables d'entrer|to keep out undesirables|${CI}
262|xénophobie|xenophobia|${CI}
263|xénophobe|xenophobic|${CI}
264|avoir un grand-père né à l'étranger|to have a foreign-born grandfather|${CI}
265|jeunes gens d'origine asiatique / portugaise|young men of Asian / Portuguese descent|${CI}
266|Français de naissance|a native of France|${CI}
267|New Yorkais de souche|a born and bred New Yorker|${CI}
268|il est français de souche|he's of French origin, of French extraction|${CI}
269|Maghreb|North Africa|${CI}
270|Maghrébins|North Africans|${CI}
271|pakistanais / du Bangladesh|Pakistani / Bangladeshi|${CI}
272|hispanophone / parlant le Hindi|Spanish-speaking / Hindi-speaking|${CI}
273|diaspora|diaspora|${CI}
274|affaires étrangères|foreign affairs|${CIT}
275|relations extérieures|foreign relations|${CIT}
276|communauté internationale|the international community|${CIT}
277|problème mondial, planétaire|a global issue|${CIT}
278|État souverain|a sovereign state|${CIT}
279|souveraineté|sovereignty|${CIT}
280|État-nation|a nation-state|${CIT}
281|frontière|a border, a frontier|${CIT}
282|droit international|international law|${CIT}
283|géopolitique|geopolitics|${CIT}
284|scène internationale|the international stage, the international scene, the world stage|${CIT}
285|jouer un rôle dans qch|to play a role, a part in sth|${CIT}
286|occidental / oriental|western / eastern|${CIT}
287|politique étrangère, extérieure|foreign policy|${CIT}
288|ambassadeur|an ambassador|${CIT}
289|ambassade|an embassy|${CIT}
290|attaché culturel / commercial / militaire|a cultural / commercial / military attaché|${CIT}
291|envoyé, émissaire|an envoy, an emissary|${CIT}
292|diplomate|a diplomat|${CIT}
293|diplomatie|diplomacy|${CIT}
294|rompre / reprendre les relations|to break off / resume diplomatic relations|${CIT}
295|relations tendues|tense, strained relations|${CIT}
296|réchauffement|a thaw|${CIT}
297|refroidissement|a chill, a cooling off|${CIT}
298|rappeler un ambassadeur|to recall an ambassador|${CIT}
299|normaliser les relations|to normalize relations|${CIT}
300|grande puissance|a great power|${CIT}
301|superpuissance / hyperpuissance|a superpower / a hyperpower|${CIT}
302|hégémonie|hegemony|${CIT}
303|impérialisme|imperialism|${CIT}
304|impérialiste|imperialistic|${CIT}
305|expansionisme|expansionism|${CIT}
306|unilatéralisme / multilatéralisme|unilateralism / multilateralism|${CIT}
307|bilatéral / multilatéral|bilateral / multilateral|${CIT}
308|bipolaire / multipolaire|bipolar / multipolar|${CIT}
309|bloc|a bloc|${CIT}
310|équilibre des forces|balance of power|${CIT}
311|système onusien|the UN system|${CIT}
312|État-membre, pays membre|a member state|${CIT}
313|membre fondateur|a founding member, founder member|${CIT}
314|cotisation|a contribution|${CIT}
315|discuter / voter une résolution|to debate / to pass a resolution|${CIT}
316|appliquer une résolution|to implement, enforce a resolution|${CIT}
317|autoriser l'usage de la force|to authorize the use of force|${CIT}
318|embargo|an embargo|${CIT}
319|majorité des deux-tiers|a two-thirds majority|${CIT}
320|maintenir la paix|to maintain peace|${CIT}
321|opération de maintien de la paix|a peace-keeping operation|${CIT}
322|soldat de la paix|a peacekeeper|${CIT}
323|casque bleu|a blue helmet|${CIT}
324|devoir d'ingérence|the duty to interfere, to intervene|${CIT}
325|intervention militaire|military intervention|${CIT}
326|OTAN|NATO, the North Atlantic Treaty Organization|${CIT}
327|négocier|to negotiate|${CIT}
328|négociations, pourparlers, discussions|negotiations, talks|${CIT}
329|table des négociations|negotiating table|${CIT}
330|table ronde|a round table|${CIT}
331|faire une déclaration|to make, issue, deliver a statement|${CIT}
332|communiqué|a communiqué|${CIT}
333|sous l'égide de|under the aegis of|${CIT}
334|réunion au sommet, sommet|a summit (meeting)|${CIT}
335|porte-parole|a spokesman, spokeswoman, spokesperson|${CIT}
336|homologue|a counterpart, an opposite number|${CIT}
337|impasse|a stalemate, a deadlock, a standoff, an impasse|${CIT}
338|aboutir à une impasse|to reach a stalemate|${CIT}
339|sortir d'une impasse|to break a stalemate|${CIT}
340|ultimatum|an ultimatum|${CIT}
341|médiateur|a mediator|${CIT}
342|négocier un accord|to broker an agreement|${CIT}
343|surmonter un obstacle|to overcome an obstacle|${CIT}
344|volonté politique|political will|${CIT}
345|compromis|a compromise|${CIT}
346|transiger|to compromise|${CIT}
347|faire une concession|to make a concession|${CIT}
348|s'engager à faire qch|to commit oneself to doing sth|${CIT}
349|promettre de faire, s'engager à faire qch|to pledge to do sth|${CIT}
350|signer / ratifier un traité|to sign / ratify a treaty|${CIT}
351|protocole|a protocol|${CIT}
352|accord|an agreement, an accord|${CIT}
353|conclure un accord|to reach a settlement|${CIT}
354|stipuler|to stipulate|${CIT}
355|parvenir à un consensus|to reach a consensus|${CIT}
356|interdire|to prohibit, to ban|${CIT}
357|mettre son véto à une décision|to veto a decision|${CIT}
358|Union Européenne, l'UE|the European Union, the EU|${CIT}
359|directive européenne|an EU directive|${CIT}
360|adhérer à l'UE|to join the EU|${CIT}
361|demander son adhésion à l'UE|to apply to join the EU, to apply for EU membership|${CIT}
362|pourparlers d'adhésion|membership negotiations|${CIT}
363|organisation non-gouvernementale, ONG|a non-governmental organization, an NGO|${CIT}
364|droits de l'homme|human rights|${CIT}
365|violations des droits de l'homme|human rights abuses, violations|${CIT}
366|faire respecter un principe|to uphold a principle|${CIT}
367|passé de la Chine en matière de droits de l'homme|China's human Rights record|${CIT}
368|décolonisation|decolonization|${CIT}
369|obtenir l'indépendance, devenir indépendant|to achieve, gain, attain independence|${CIT}
370|ancienne colonie|a former colony|${CIT}
371|puissance coloniale|a colonial power|${CIT}
372|du travail|work|${CU}
373|un travail, un emploi|a job|${CU}
374|une profession, une activité professionnelle|an occupation|${CU}
375|les professions libérales|the professions|${CU}
376|une carrière|a career|${CU}
377|le monde du travail|the world of work|${CU}
378|être au travail|to be at work|${CU}
379|le lieu de travail|the workplace|${CU}
380|travailler chez soi|to work from home|${CU}
381|travailler à temps partiel OU à mi-temps|to work part time|${CU}
382|travailler à plein temps|to work full time|${CU}
383|la classe ouvrière|the working class|${CU}
384|la population active|the working population|${CU}
385|la vie active|the working life|${CU}
386|conditions de travail|working conditions|${CU}
387|atelier|a workshop|${CU}
388|usine|a factory, a plant|${CU}
389|atelier clandestin (où la main d'œuvre est exploitée)|a sweatshop|${CU}
390|travailler beaucoup|to work hard|${CU}
391|être travailleur|to be hard-working|${CU}
392|travailleur acharné, bourreau de travail|a hard worker, a workaholic|${CU}
393|permis de travail|a work permit|${CU}
394|être / ne pas être de service OU de garde|to be on duty / off duty|${CU}
395|chômage|unemployment, joblessness|${CU}
396|être au chômage|to be unemployed, jobless, out of work|${CU}
397|taux de chômage|unemployment rate, jobless rate|${CU}
398|chômeurs|the unemployed, the jobless|${CU}
399|chômage de longue durée|long-term unemployment|${CU}
400|chômage des jeunes|youth unemployment|${CU}
401|allocation chômage|unemployment benefit|${CU}
402|toucher le chômage|to be on the dole (GB), to be on welfare (US)|${CU}
403|marché du travail, de l'emploi|job market, labour market|${CU}
404|contrat à durée déterminée, CDD|a fixed-term contract|${CU}
405|contrat à durée indéterminée, CDI|an open-ended contract|${CU}
406|flexibilité de l'emploi|job flexibility|${CU}
407|avoir des horaires flexibles|work flexitime (GB) flextime (US)|${CU}
408|sécurité / précarité de l'emploi|job security / insecurity|${CU}
409|stage|an internship, a work placement|${CU}
410|stagiaire|an intern, a trainee|${CU}
411|travailleur précaire|a casual worker|${CU}
412|petit boulot|an odd job, a casual job|${CU}
413|boulot d'été|a summer job|${CU}
414|intérimaire|a temporary worker|${CU}
415|faire de l'intérim|to temp, to work as a temp|${CU}
416|employer|to employ|${CU}
417|employeur|an employer|${CU}
418|employé|an employee|${CU}
419|changer de travail|to change jobs|${CU}
420|embaucher un travailleur|to hire, to take on a worker|${CU}
421|recruter|to recruit|${CU}
422|période d'essai|a trial period|${CU}
423|poste|a post, a position|${CU}
424|nommer qn à un poste|to appoint sb to a post|${CU}
425|muter qn|to transfer sb|${CU}
426|poste à responsabilité(s)|a responsible job|${CU}
427|emploi subalterne|a menial job|${CU}
428|demandeur d'emploi|a job-seeker|${CU}
429|agence Pôle emploi|a Jobcenter (GB)|${CU}
430|CV, curriculum vitae|a curriculum vitae, a CV, a résumé (US)|${CU}
431|expérience professionnelle|work experience|${CU}
432|compétences|skills|${CU}
433|être candidat à un emploi, faire une demande d'emploi|to apply for a job|${CU}
434|candidat à un poste|an applicant|${CU}
435|entretien d'embauche|a job interview|${CU}
436|offre d'emploi|a job offer, a job vacancy, a job opportunity|${CU}
437|travail OU main d'œuvre|labour|${CU}
438|main d'œuvre féminine / travail des enfants|female labour / child labour|${CU}
439|normes en matière d'emploi|labour standards|${CU}
440|main d'œuvre|manpower, workforce|${CU}
441|personnel|staff, personnel|${CU}
442|collègue, camarade de travail|a colleague, a co-worker, a workmate|${CU}
443|ressources humaines|human resources|${CU}
444|travail qualifié / peu qualifié / non qualifié|a skilled / low-skilled / an unskilled job|${CU}
445|ouvrier spécialisé, OS|an unskilled worker|${CU}
446|ouvrier|a blue-collar worker|${CU}
447|employé de bureau|a white-collar worker|${CU}
448|fonctionnaire|a state employee, a civil servant|${CU}
449|salarié du secteur public|a public-sector employee|${CU}
450|haut fonctionnaire|a high-ranking civil servant|${CU}
451|être indépendant, travailler à son compte|to be self-employed|${CU}
452|travailleurs indépendants|the self-employed|${CU}
453|honoraires|fees|${CU}
454|paie, paye|pay|${CU}
455|salaire|salary|${CU}
456|salaire (d'ouvrier)|wages|${CU}
457|gagner de l'argent|to earn money, to make money|${CU}
458|gagner sa vie|to earn a living, to earn one's living, to make a living|${CU}
459|Que fait-il dans la vie ?|What does he do for a living?|${CU}
460|travail mal payé|a badly-paid job, a low-paid job|${CU}
461|travail bien payé|a well-paid job, a highly-paid job|${CU}
462|salarié|a wage-earner|${CU}
463|prime|a bonus|${CU}
464|avantage (en nature), avantage annexe|a perk, a fringe benefit|${CU}
465|voiture de fonction|a company car|${CU}
466|salaire au rendement|performance-related pay|${CU}
467|être employé par une entreprise|to be on a company's payroll|${CU}
468|vacances|holiday, vacation (US)|${CU}
469|congés payés|paid holiday|${CU}
470|être en vacances|to be on holiday|${CU}
471|jour férié|a bank holiday|${CU}
472|être en congé maladie|to be on sick leave|${CU}
473|prendre deux jours de congé|to take two days off|${CU}
474|réduction du temps de travail, RTT|reduction of working hours|${CU}
475|les 35 heures, la semaine de 35 heures|the 35-hour working week|${CU}
476|supprimer des emplois|to cut jobs|${CU}
477|faire des coupes sombres, claires dans la main d'œuvre|to slash, to axe jobs|${CU}
478|pertes d'emploi, suppressions d'emploi|job losses|${CU}
479|rationaliser|to streamline|${CU}
480|dégraisser ses effectifs|to downsize|${CU}
481|licencier des salariés|to lay off workers, to make workers redundant|${CU}
482|licenciement (économique)|a redundancy|${CU}
483|départ volontaire|a voluntary redundancy|${CU}
484|plan social|a redundancy plan|${CU}
485|indemnité de licenciement, prime de départ|redundancy payment, severance pay, severance package|${CU}
486|parachute doré|a golden parachute, a golden handshake|${CU}
487|renvoyer, licencier, congédier qn|to dismiss sb|${CU}
488|mettre à la porte, renvoyer, virer|to fire, to sack, to give sb the sack|${CU}
489|être renvoyé|to get the sack|${CU}
490|conflit social|an industrial dispute|${CU}
491|se mettre / être en grève|to go on strike / be on strike|${CU}
492|gréviste|a striker|${CU}
493|direction et les salariés|management and workers|${CU}
494|délégué syndical|a shop steward|${CU}
495|syndicat|a (trade) union|${CU}
496|revendication|a claim|${CU}
497|revendications salariales|wage claims, wage demands|${CU}
498|augmentation de salaire|a payrise (GB), a payraise (US)|${CU}
499|reprendre le travail|to resume work|${CU}
500|prendre sa retraite|to retire|${CU}
501|démissionner|to resign, to step down|${CU}
502|retraité|a pensioner, an old age pensioner, a retiree (US)|${CU}
503|retraite|retirement|${CU}
504|partir en pré-retraite|to take early retirement|${CU}
505|âge de la retraite|retirement age|${CU}
506|bien réussir à l'école|to do well at school|${EDU}
507|lire l'anglais couramment|to read English fluently|${EDU}
508|être bon en sport|to be good at sports|${EDU}
509|faire l'école buissonnière|to play truant|${EDU}
510|absentéisme|truancy|${EDU}
511|suivre un cours d'anglais|to take a class in English|${EDU}
512|donner du travail à la maison|to set homework|${EDU}
513|rendre un travail|to hand in a piece of work|${EDU}
514|les subtilités de la langue anglaise|the intricacies of the English language|${EDU}
515|se lancer|to get started|${EDU}
516|se conformer à une règle|to obey a rule|${EDU}
517|obéir à (qqn)|to obey (sone)|${EDU}
518|avoir des difficultés en maths|to have difficulty with maths|${EDU}
519|donner un coup de main à (qqn)|to give (sone) a hand|${EDU}
520|obtenir un diplôme|to graduate|${EDU}
521|une salle de classe|a classroom|${EDU}
522|une leçon|a class|${EDU}
523|rattraper un cours loupé|to catch up a missed lesson|${EDU}
524|évaluer|to assess, appraise|${EDU}
525|le programme scolaire|the school curriculum|${EDU}
526|étudiant de premier cycle|undergraduate|${EDU}
527|indiscipliné|unruly|${EDU}
528|incontrôlable|unmanageable|${EDU}
529|bâcler ses devoirs|to dash off one's work|${EDU}
530|obtenir une bonne note|to get a good mark|${EDU}
531|tricher sur son voisin|to eye over one's neighbour's work|${EDU}
532|principal, directeur (école)|headmaster|${EDU}
533|élève doué|gifted pupil|${EDU}
534|réussir un examen haut la main|to pass a test with flying colors|${EDU}
535|une matière (scolaire)|a (school) subject|${EDU}
536|une pause de 20 minutes|a 20-minute break|${EDU}
537|une heure de cours|a teaching-hour|${EDU}
538|passer dans la classe supérieure|to pass the next grade|${EDU}
539|travail de paperasse|paperwork|${EDU}
540|passer un examen|to take an exam|${EDU}
541|examen blanc|mock exam|${EDU}
542|se préparer à un examen|to prepare for an exam|${EDU}
543|échouer à un examen|to flunk a test|${EDU}
544|recaler (qqn)|to flunk (sone)|${EDU}
545|être reçu à un examen avec mention|to pass a degree with distinction|${EDU}
546|abandonner l'école|to drop out of school|${EDU}
547|un élève décrocheur|a dropout|${EDU}
548|obtenir une bourse|to get a scholarship|${EDU}
549|entrer en fac de médecine|to go to a medical school|${EDU}
550|faire des études de médecine|to study medicine|${EDU}
551|remettre un évènement à plus tard|to put off an event|${EDU}
552|sortie scolaire|school trip|${EDU}
553|faire des recherches sur (qqch)|to do research on (sthg)|${EDU}
554|cour d'école|schoolyard|${EDU}
555|un élève de terminale|[UK] a sixth-former|${EDU}
556|méticuleux|painstaking|${EDU}
557|sécher un cours|to skip a lesson|${EDU}
558|se voir accorder la possibilité de [...]|to be provided with an opportunity to [...]|${EDU}
559|tricher|to cheat|${EDU}
560|un tricheur|a cheater|${EDU}
561|être renvoyé|to be expelled|${EDU}
562|rouler sur un examen|to sail through an exam|${EDU}
563|sauce (tomate)|dressing|${THA}
564|chuckle|laughter|${THA}
565|to gather|to get together|${THA}
566|a feast|a banquet|${THA}
567|to reach accross|to make efforts to join|${THA}
568|one another|each other|${THA}
569|to winnow away|to filter out and remove|${THA}
570|widely viewed as|largely regarded as|${THA}
571|twice|two times|${THA}
572|to provide|to give|${THA}
573|the bulk of|the biggest part of|${THA}
574|to depict|to describe|${THA}
575|to feature|to represent, show|${THA}
576|subservient|submissive, docile|${THA}
577|pilgrims|migrants arriving in America from England in 17th|${THA}
578|to outnumber|to surpass in number|${THA}
579|to crouch|almost to sit on the floor|${THA}
580|a harvest|a crop|${THA}
581|likely|probably|${THA}
582|a deed|an [bad] action|${THA}
583|settlers|colons|${THA}
584|in retaliation for|in revenge for|${THA}
585|to broker|to organize, negotiate|${THA}
586|to grab|to seize|${THA}
587|gauzy|transparent|${THA}
588|willfully|deliberately|${THA}
589|How [s.one] would have it|What [s.one] would like to believe|${THA}
590|druthers|inclination, penchant|${THA}
591|blissfully|ecstatically|${THA}
592|bleached out|washed out|${THA}
593|to abid|to respect|${THA}
594|altérer|alter|${THA}
595|apprentissage en continu|lifelong learning|${THA}
596|malaise|general feeling of discomfort|${BUS}
597|stagflation|period of slow economic growth and high unemployment|${BUS}
598|aftermath|the consequences of a significant unpleasant event|${BUS}
599|hyperinflation|extremely high and accelerating inflation|${BUS}
600|third-world countries|countries with lower economic development|${BUS}
601|martial law|military control over civilian functions of government|${BUS}
602|gleaming|shining brightly, describe something polished or new|${BUS}
603|suburban area|residential area on the outskirts of the a city|${BUS}
604|stagnation|lack of activity, growth, and development|${BUS}
605|dispirited|having lost emthusiasm and hope|${BUS}
606|fatalistic|believing that events are inevitable|${BUS}
607|hollowed out|destroyed or weakened from within|${BUS}
608|brimming|filled to the point of overflowing (with positive emotions and energy)|${BUS}
609|rabais, ristourne|discount|${BUS}
610|chaîne de montage|assembly line|${BUS}
611|payer comptant|to pay cash|${BUS}
612|pénurie de main d'oeuvre|labor shortage|${BUS}
613|productivité|productivity|${BUS}
614|soumettre sa candidature|to apply|${BUS}
615|racheter|to buy out|${BUS}
616|licencier|to lay off|${BUS}
617|se mettre en grève|to go on strike|${BUS}
618|service client|customer service|${BUS}
619|représentant syndical|union representative|${BUS}
620|commerćant|shopkeeper|${BUS}
621|virer, mettre à la porte|to fire|${BUS}
622|se mettre à son compte|to set up one's business|${BUS}
623|démissionner|to resign|${BUS}
624|en sureffectif|overstaffed|${BUS}
625|contrat à durée indéterminée|permanent contract|${BUS}
626|équipe de nuit|night shift|${BUS}
627|service, département|department|${BUS}
628|refondre, réorganiser|to revamp|${BUS}
629|concurrent|competitor|${BUS}
630|fusion|merger|${BUS}
631|faire faillite|to go bankrupt, bust|${BUS}
632|embaucher|to hire, take on|${BUS}
633|fiche de paie|pay slip|${BUS}
634|faire des heures supplémentaires|work overtime|${BUS}
635|mettre la clé sous la porte|to go out of business, close up shop|${BUS}
636|fait main|handmade|${BUS}
637|artisan|craftsman|${BUS}
638|ouvrier qualifié|skilled worker|${BUS}
639|entreprise|business|${BUS}
640|plein emploi|full employment|${BUS}
641|un maire|a mayor|${POL}
642|homme politique|politician|${POL}
643|s'assurer une majorité|to secure a majority|${POL}
644|déclencher des élections anticipées|to call an early election|${POL}
645|(UK) les éléctions législatives|(UK) the general election|${POL}
646|(US) les éléctions présidentielles|(US) the general election|${POL}
647|les grands partis|mainstream parties|${POL}
648|premier ministre|Prime Minister|${POL}
649|le ministre de l'économie et des finances|(UK) the Chancellor of the Exchequer|${POL}
650|remaniement ministériel|Cabinet reshuffle|${POL}
651|ministre des Affaires étrangères|Foreign minister|${POL}
652|pronncer un discours|to deliver a speech|${POL}
653|une dictature|a dictatorship|${POL}
654|museler, baîlloner|to gag, muzzle|${POL}
655|société civile|civil society|${POL}
656|(UK) syndicats|(UK) trade unions|${POL}
657|(US) syndicats|(US) labor unions|${POL}
658|élections de mi-mandat|mid-term elections|${POL}
659|minisre "frondeur"|rebellious minister|${POL}
660|démissionner|resign, step down|${POL}
661|officier en tant que|to serve as|${POL}
662|opposer son veto à (qqch)|to veto (sthg)|${POL}
663|un projet de loi|a bill|${POL}
664|un groupe de réflexion|a think-tank|${POL}
665|(UK) un ministre|(UK) a Cabinet member|${POL}
666|un directeur de cabinet|a chief of staff|${POL}
667|impôts locaux|local taxes|${POL}
668|cote de popularité|approval ratings|${POL}
669|se présenter à une éléction|to run for election [office]|${POL}
670|prêter serment|to take the oath, be sworn in|${POL}
671|rendre homage à (qqn)|to pay tribute to (sone)|${POL}
672|dirigeant|political leader|${POL}
673|élection truquée|rigged election|${POL}
674|les allocations|social benefits|${POL}
675|revaloriser|to scale up, raise, increase|${POL}
676|l'allocation familliale|the family allowance|${POL}
677|le gel de la production|the production freeze|${POL}
678|un bras de fer|a tug of war|${POL}
679|chancelant|teetering, wavering|${POL}
680|tailored|customized|${POL}
681|rote memorisation|repetition-based learning|${POL}
682|impoverished|cash-strapped|${POL}
683|unencumbered|unburdened|${POL}
684|inquisitiveness|interest, curiosity|${POL}
685|substantially|notably, significatly|${POL}
686|authoritarian|dictatorial, strict|${POL}
687|minimally supervised|lightly monitored|${POL}
688|crime, criminality|la criminalité|${CR}
689|the crime rate|le taux de criminalité|${CR}
690|organized crime|la criminalité organisée, le grand banditisme|${CR}
691|white-collar crime|la criminalité en col blanc|${CR}
692|juvenile delinquency|la délinquance juvénile|${CR}
693|a juvenile delinquent, a young offender|un délinquant juvénile|${CR}
694|petty crime|la petite délinquance|${CR}
695|a crime, a felony|un crime|${CR}
696|to commit a crime|commettre un crime|${CR}
697|a criminal, a felon|un criminel|${CR}
698|a criminal record|un casier judiciaire|${CR}
699|an offense|un délit, une infraction|${CR}
700|a misdemeanour|une infraction (GB), un délit (US)|${CR}
701|an offender|un délinquant, un contrevenant|${CR}
702|a repeat offender, a recidivist|un récidiviste|${CR}
703|murder|le meurtre|${CR}
704|a murderer|un meurtrier|${CR}
705|manslaughter|homicide|${CR}
706|a serial killer|un tueur en série|${CR}
707|theft|le vol|${CR}
708|a thief, a robber|un voleur|${CR}
709|to steal a watch|voler une montre|${CR}
710|to rob sb of sth|voler qch à qn|${CR}
711|rape|le viol|${CR}
712|armed robbery|vol à main armée|${CR}
713|a burglary|un cambriolage|${CR}
714|to mug sb, to attack sb|agresser qn|${CR}
715|money-laundering|le blanchiment d’argent|${CR}
716|to break a law|enfreindre une loi|${CR}
717|lawful / unlawful|légal / illégal|${CR}
718|a lawbreaker|un délinquant, une personne qui enfreint la loi|${CR}
719|wrongdoing|des méfaits|${CR}
720|a wrongdoer|un malfaiteur|${CR}
721|to flout the law|se moquer de la loi|${CR}
722|a no-go area|une zone de non-droit|${CR}
723|to obey the law|obéir à la loi|${CR}
724|to abide by the law|respecter la loi|${CR}
725|a law-abiding citizen|un citoyen respectueux des lois|${CR}
726|the justice system|la justice|${CR}
727|a court, a court of law|un tribunal|${CR}
728|a judge|un juge|${CR}
729|a lawyer, a barrister (GB), an attorney (US)|un avocat|${CR}
730|the jury|le jury|${CR}
731|to prosecute sb|poursuivre qn (en justice)|${CR}
732|to bring a lawsuit against sb, sue sb|intenter un procès à qn, engager des poursuites contre qn|${CR}
733|the prosecutor|le procureur|${CR}
734|a suspect|un suspect|${CR}
735|to charge sb with murder|accuser, inculper qn de meurtre|${CR}
736|a charge|une accusation, un chef d’inculpation|${CR}
737|to confess to a crime|avouer un crime|${CR}
738|to confess to embezzling money|avouer avoir détourné de l’argent|${CR}
739|confession|un aveu|${CR}
740|a defendant|un accusé, un prévenu|${CR}
741|a witness / an eye witness|un témoin / un témoin oculaire|${CR}
742|a case|une affaire|${CR}
743|a trial|un procès|${CR}
744|to be tried, stand trial|passer en jugement, être jugé|${CR}
745|to await trial|être en attente de jugement|${CR}
746|the principle that a defendant is innocent until proven guilty|la présomption d’innocence|${CR}
747|forensic evidence|preuves relevées lors d’une expertise|${CR}
748|a culprit|un coupable|${CR}
749|to acquit sb|acquitter qn|${CR}
750|acquittal|acquittement|${CR}
751|to find sb guilty|condamner qn, reconnaître qn coupable|${CR}
752|to convict sb of rape, murder|reconnaître qn coupable de viol, meurtre|${CR}
753|a conviction|une condamnation|${CR}
754|a fine|une amende|${CR}
755|to fine sb for sth|condamner qn à une amende pour qch|${CR}
756|to be sentenced to five years’ imprisonment, five years in jail|être condamné à cinq ans de prison|${CR}
757|a death sentence|une condamnation à mort|${CR}
758|a life sentence|une condamnation à perpétuité|${CR}
759|a suspended sentence|une condamnation avec sursis|${CR}
760|to be sent to prison|être mis en prison|${CR}
761|to incarcerate, to imprison sb|incarcérer qn|${CR}
762|the incarceration rate|le taux d’incarcération|${CR}
763|a cell|une cellule|${CR}
764|a prisoner, an inmate, a detainee|un détenu, un prisonnier|${CR}
765|a prison officer, a prison warder (GB)|un gardien de prison|${CR}
766|a high-security prison|une prison de haute sécurité|${CR}
767|solitary confinement|l’isolement carcéral|${CR}
768|prison overcrowding|la surpopulation carcérale|${CR}
769|a miscarriage of justice|une erreur judiciaire|${CR}
770|to fabricate evidence|fabriquer des preuves|${CR}
771|to be proved innocent, to be exonerated|être innocenté|${CR}
772|to free, to release a prisoner|libérer, relâcher un prisonnier|${CR}
773|to pardon a convict|grâcier un condamné|${CR}
774|to parole sb|mettre qn en liberté conditionnelle|${CR}
775|to be on parole|être en liberté conditionnelle|${CR}
776|to report to the police|se présenter à la police|${CR}
777|an electronic tag|un bracelet de surveillance électronique|${CR}
778|contre la peine de mort|against the death penalty|${PC}
779|le meurtre|murder|${PC}
780|être coupable de meurtre|to be guilty of murder|${PC}
781|un meurtrier|a murderer|${PC}
782|le viol|rape|${PC}
783|un violeur|a rapist|${PC}
784|un délinquant sexuel|a sex offender|${PC}
785|un récidiviste|a repeat offender, a recidivist|${PC}
786|la culpabilité|guilt|${PC}
787|appliquer la loi du talion|to demand an eye for an eye|${PC}
788|déclarer qn coupable, condamner qn|to convict sb, to find sb guilty|${PC}
789|une condamnation|a conviction|${PC}
790|une condamnation à tort|a wrongful conviction|${PC}
791|condamner qn à mort|to sentence sb to death|${PC}
792|condamner qn à 25 ans de prison|to sentence sb to 25 years imprisonment|${PC}
793|un coupable|a culprit|${PC}
794|dissuader qn de faire qch|to deter sb from doing sth|${PC}
795|avoir un effet dissuasif|to act as a deterrent|${PC}
796|une condamnation à mort|a death sentence|${PC}
797|une condamnation à perpétuité|a life sentence|${PC}
798|perpétuité sans possibilité de remise de peine|life without parole|${PC}
799|mettre qn en prison|to jail, imprison sb|${PC}
800|un détenu, un prisonnier|a prisoner, an inmate, a detainee|${PC}
801|être dans les couloirs de la mort|to be on death row|${PC}
802|une cellule|a cell|${PC}
803|un avocat|a lawyer|${PC}
804|un appel|an appeal|${PC}
805|faire appel d’une décision|to appeal against a decision|${PC}
806|casser une décision (de justice)|to quash, to overturn a decision|${PC}
807|commuer une condamnation à mort en réclusion à perpétuité|to commute a death sentence to life|${PC}
808|surseoir à l’exécution d’un condamné|to grant a convict a stay of execution, a reprieve|${PC}
809|gracier un criminel|to pardon a criminal|${PC}
810|executer un condamné|to execute a convict|${PC}
811|mettre qn à mort|to put sb to death|${PC}
812|un bourreau|an executioner|${PC}
813|une piqûre mortelle|a lethal injection|${PC}
814|faire une piqûre mortelle à qn|to inject sb with a lethal substance|${PC}
815|pendre qn|to hang sb|${PC}
816|la guillotine|the guillotine|${PC}
817|guillotiner qn|to guillotine sb|${PC}
818|électrocuter qn|to electrocute sb|${PC}
819|la chaise électrique|the electric chair|${PC}
820|lapider qn, tuer qn à coups de pierre|to stone sb to death|${PC}
821|abolir|to abolish, to do away with|${PC}
822|rétablir la peine de mort|to reinstate, to reintroduce, to restore the death penalty|${PC}
823|appliquer la peine de mort|to apply, to enforce the death penalty|${PC}
824|une erreur judiciaire|a miscarriage of justice|${PC}
825|les tests ADN|DNA analysis, DNA testing|${PC}
826|innocenter qn|to prove sb innocent, to exonerate sb|${PC}
827|être innocenté grâce à l’ADN|to be cleared by DNA|${PC}
828|un problème controversé|a controversial, contentious issue|${PC}
829|un problème sensible, qui suscite de vives réactions|a hot-button issue|${PC}
830|partisans de la peine de mort|advocates, supporters, proponents of the death penalty|${PC}
831|opposants à, adversaires de la peine de mort|critics, opponents of the death penalty|${PC}
832|être contre la peine de mort|to oppose the death penalty, to be opposed to the death penalty|${PC}
833|un abolitionniste|an abolitionist|${PC}
834|du sexe féminin|female|${CF}
835|le statut, la position, la place des femmes dans la société|women’s status in society|${CF}
836|le déséquilibre entre les sexes|gender imbalance|${CF}
837|les inégalités entre les hommes et les femmes|gender inequalities|${CF}
838|la guerre entre les sexes|gender war|${CF}
839|un phallocrate, un machiste|a (male) chauvinist|${CF}
840|le machisme|machismo|${CF}
841|la misogynie|misogyny|${CF}
842|un misogyne|a misogynist|${CF}
843|le sexisme|sexism|${CF}
844|des préjugés sexistes|sexist prejudices|${CF}
845|le féminisme|feminism|${CF}
846|le mouvement des femmes, le mouvement pour les droits de la femme|the Women’s Movement, the women’s rights movement|${CF}
847|s’émanciper|to become emancipated|${CF}
848|rendre les femmes autonomes|to empower women|${CF}
849|un mariage forcé / arrangé|a forced marriage / an arranged marriage|${CF}
850|un mariage blanc|a sham marriage, a marriage of convenience|${CF}
851|une dot|a dowry|${CF}
852|la polygamie|polygamy|${CF}
853|polygame|polygamous|${CF}
854|l’excision|female circumcision, female genital mutilation|${CF}
855|une femme battue|a battered wife|${CF}
856|violence conjugale, familiale|domestic violence|${CF}
857|être privé du droit de vote|to be disenfranchised|${CF}
858|le droit de vote|the right to vote|${CF}
859|tomber enceinte|to become pregnant|${CF}
860|les femmes en âge d’avoir des enfants|women of childbearing age|${CF}
861|la pilule (contraceptive)|the (contraceptive) pill|${CF}
862|prendre la pilule|to be on the pill|${CF}
863|partir en congé maternité|to go on maternity leave|${CF}
864|congé parental|parental leave, career break|${CF}
865|s’occuper de ses enfants|to look after one’s children|${CF}
866|élever un enfant|to bring up, to raise a child|${CF}
867|l’éducation des enfants|the upbringing of children, child rearing, parenting|${CF}
868|des enfants d’âge scolaire|school-age children|${CF}
869|une femme au foyer, une ménagère|a housewife|${CF}
870|faire le ménage|to do the housework|${CF}
871|faire la cuisine / la lessive / la vaisselle / les courses|to do the cooking / washing / washing-up / shopping|${CF}
872|passer l’aspirateur|to do the vacuuming / to vacuum|${CF}
873|les appareils ménagers|domestic appliances|${CF}
874|les tâches ménagères|household chores|${CF}
875|être confronté à un dilemme|to be faced with a dilemma|${CF}
876|une crèche, une garderie|a nursery, a day-care centre (GB), a child-care center|${CF}
877|une nounou, une nourrice|a nanny|${CF}
878|une assistante maternelle, une nourrice|a childminder|${CF}
879|trouver un équilibre entre travail et famille|to balance, combine work and family|${CF}
880|jongler pour concilier carrière et famille|to juggle a career and a family|${CF}
881|concilier|to reconcile|${CF}
882|les responsabilités familiales|family responsibilities|${CF}
883|être dépendant financièrement de qn|to be financially dependent on sb|${CF}
884|gagner sa vie|to earn a living, to make a living|${CF}
885|subvenir aux besoins de sa famille|to support one’s family|${CF}
886|nourrir ses enfants|to feed one’s children|${CF}
887|être celui qui fait vivre la famille|to be the breadwinner|${CF}
888|c’est elle qui fait vivre sa famille|she is the family wage earner|${CF}
889|faire bouillir la marmite|to bring home the bacon|${CF}
890|la main d’œuvre féminine|female labour|${CF}
891|l’emploi des femmes|female employment|${CF}
892|les femmes représentent x % de la main d’œuvre|women make up x% of the workforce|${CF}
893|faire carrière|to have a career|${CF}
894|être une femme qui travaille|to be a working woman|${CF}
895|une femme qui fait carrière|a career woman|${CF}
896|travailler à temps partiel OU à mi-temps|to work part time|${CF}
897|travailler à plein temps|to work full time|${CF}
898|l’égalité des salaires|equal pay|${CF}
899|le différentiel de salaire entre les sexes|the gender pay gap, the gender wage gap|${CF}
900|nommer qn à un poste|to appoint sb to a post|${CF}
901|être en concurrence avec les hommes|to compete with men|${CF}
902|un poste à responsabilités|a responsible job|${CF}
903|un poste de haut niveau|a top job|${CF}
904|un emploi subalterne|a menial job|${CF}
905|réussir sa carrière|to have a successful career|${CF}
906|les obstacles à la promotion des femmes|barriers to female advancement|${CF}
907|une chasse gardée pour les hommes|a male preserve|${CF}
908|introduire une discrimination contre qn|to discriminate against sb|${CF}
909|être victime de discrimination|to be discriminated against|${CF}
910|le harcèlement|harassment|${CF}
911|le harcèlement sexuel|sexual harassment|${CF}
912|la parité|parity|${CF}
913|sous-représenté|under-represented|${CF}
914|instaurer des quotas|to introduce quotas|${CF}
915|l’instauration de quotas|the introduction of quotas|${CF}
916|la discrimination positive|affirmative action|${CF}
917|l’égalité des chances|equal opportunity|${CF}
918|égalitaire|egalitarian|${CF}
919|l’égalitarisme|egalitarianism|${CF}
920|atteindre l’égalité avec les hommes|to achieve equality with men|${CF}
921|une maladie|a disease, an illness, a sickness|${HI}
922|souffrir d’une maladie|to suffer from a disease|${HI}
923|mourir d’une maladie|to die of, to die from a disease|${HI}
924|une maladie grave|a serious disease|${HI}
925|être dans un état critique|to be critically ill|${HI}
926|un microbe, un germe|a germ|${HI}
927|des bactéries|bacteria|${HI}
928|attraper la grippe|to go down with the flu|${HI}
929|un danger pour la santé|a health hazard|${HI}
930|un fléau|a curse, a plague, a scourge|${HI}
931|le cancer du poumon / du sein / de la peau|lung / breast / skin cancer|${HI}
932|cancérigène|carcinogenic|${HI}
933|le diabète|diabetes|${HI}
934|l’hépatite|hepatitis|${HI}
935|la malaria, le paludisme|malaria|${HI}
936|une maladie sexuellement transmissible (MST)|a sexually transmitted disease (STD), a venereal disease (VD)|${HI}
937|avoir une maladie cardiaque|to have a heart condition|${HI}
938|la maladie d’Alzheimer / de Parkison|Alzeihemer’s / Parkinson’s disease|${HI}
939|une maladie neurodégénérative|a neurodegenerative disease|${HI}
940|un symptôme|a symptom|${HI}
941|affecter, toucher un pays|to affect a country|${HI}
942|toucher 20 % de la population|to afflict 20% of the population|${HI}
943|la zone la plus durement touchée|the hardest-hit area|${HI}
944|éradiquer|to eradicate|${HI}
945|endémique|endemic|${HI}
946|le SIDA|AIDS, acquired immune deficiency syndrome|${HI}
947|contracter le SIDA|to develop AIDS|${HI}
948|un malade du SIDA|an AIDS sufferer, an AIDS patient|${HI}
949|séropositif|HIV-positive|${HI}
950|faire passer un test de dépistage du SIDA à qn|to screen sb for AIDS|${HI}
951|un centre de dépistage du SIDA|an HIV screening centre|${HI}
952|un test de dépistage|a screening test|${HI}
953|le sperme|sperm, semen|${HI}
954|avoir des rapports non protégés|to have unprotected sex|${HI}
955|un préservatif|a condom|${HI}
956|l’abstinence|abstinence|${HI}
957|la fidélité|faithfulness|${HI}
958|une aiguille|a needle|${HI}
959|les anti-rétroviraux|anti-retroviral drugs|${HI}
960|la trithérapie|triple therapy, combination therapy|${HI}
961|un traitement médical|medical treatment|${HI}
962|secret médical|medical confidentiality|${HI}
963|une infection nosocomiale|a hospital-acquired infection|${HI}
964|MRSA, un staphylocoque résistant à la méthicilline|MRSA|${HI}
965|une bactérie multi-résistante|a superbug|${HI}
966|prescrire|to prescribe|${HI}
967|une ordonnance|a prescription|${HI}
968|un médecin généraliste|a general practitioner, a GP|${HI}
969|un chirurgien|a surgeon|${HI}
970|se faire opérer|to have surgery, go through surgery, have an operation|${HI}
971|diagnostiquer|to diagnose|${HI}
972|un diagnostic|a diagnosis|${HI}
973|guérir un patient|to cure a patient|${HI}
974|un remède|a remedy, a cure|${HI}
975|un médicament|a drug, a medicine, a medication|${HI}
976|un médicament générique|a generic drug|${HI}
977|un antalgique, analgésique|a painkiller|${HI}
978|un effet secondaire|a side effect|${HI}
979|une piqûre|an injection, a shot|${HI}
980|prendre des antibiotiques|to be on antibiotics|${HI}
981|un laboratoire pharmaceutique|a pharmaceutical laboratory|${HI}
982|des produits pharmaceutiques|pharmaceuticals|${HI}
983|un vaccin|a vaccine|${HI}
984|vacciner|to vaccinate|${HI}
985|une campagne de vaccination|a vaccination campaign|${HI}
986|se rétablir, guérir|to recover|${HI}
987|guérison, rétablissement|recovery|${HI}
988|rechuter|to relapse|${HI}
989|une alerte à l’intoxication alimentaire|a food scare|${HI}
990|un péril sanitaire, une alerte sanitaire|a health scare|${HI}
991|épizootie|an epizootic disease|${HI}
992|la fièvre aphteuse|food-and-mouth disease|${HI}
993|l’encéphalopathie bovine spongiforme, l’ESB|bovine spongiform encephalopathy, BSE|${HI}
994|la maladie de la vache folle|mad-cow disease|${HI}
995|la maladie de Creutzfeldt Jacob (MCJ)|Creutzfeldt-Jacob Disease (CJD)|${HI}
996|une maladie à prions|a prion disease|${HI}
997|la dioxine|dioxin|${HI}
998|le scandale du poulet à la dioxine|the dioxin chicken scandal|${HI}
999|la traçabilité|traceability|${HI}
1000|les soins médicaux / les services de santé|health care|${HI}
1001|la santé publique|public health|${HI}
1002|les responsables de la santé publique|public health officials|${HI}
1003|les autorités sanitaires|the health authorities|${HI}
1004|le système de santé|the health care system, the health system|${HI}
1005|les services de santé|health services|${HI}
1006|les dépenses de santé|health expenses|${HI}

// === NOUVEAU CHAPITRE : INDIVIDUAL FREEDOM ===
1007|la liberté d’expression, de parole|freedom of speech, free speech, freedom of expression|${IF}
1008|la liberté de la presse|freedom of the press|${IF}
1009|une presse libre|a free press|${IF}
1010|la liberté de culte, la liberté religieuse|freedom of worship|${IF}
1011|le pouvoir arbitraire|arbitrary power|${IF}
1012|une lettre de cachet|a lettre de cachet|${IF}
1013|empiéter sur les droits des gens|to infringe (on) people’s rights|${IF}
1014|une atteinte, une entorse aux droits de qn|an infringement on sb’s rights|${IF}
1015|empiéter sur les libertés fondamentales|to encroach on basic liberties|${IF}
1016|un empiètement de l’État|an encroachment of the state|${IF}
1017|restreindre, limiter la liberté d’expression|to restrict free speech|${IF}
1018|rogner sur les libertés individuelles|to erode individual freedoms|${IF}
1019|détenir un suspect sans l’inculper|to detain a suspect without charge|${IF}
1020|être détenu sans être inculpé|to be held without charge|${IF}
1021|placer qn en détention provisoire|to remand sb in custody|${IF}
1022|emprisonner qn|to jail sb, to imprison sb|${IF}
1023|le droit de vote|the right to vote|${IF}
1024|les droits fondamentaux|basic rights|${IF}
1025|les libertés fondamentales / individuelles|basic / individual liberties|${IF}
1026|être garanti par la constitution|to be enshrined in the constitution|${IF}
1027|les libertés civiques|civil liberties|${IF}
1028|censurer|to censor|${IF}
1029|la censure|censorship|${IF}
1030|la surveillance|surveillance|${IF}
1031|une société surveillée|a surveillance society|${IF}
1032|un État policier|a police state|${IF}
1033|la police, les forces de l’ordre|the police force|${IF}
1034|interpeller et fouiller|to stop and search|${IF}
1035|arrêter qn|to arrest sb|${IF}
1036|(le droit à) la vie privée, l’intimité|privacy|${IF}
1037|la vie privée de qn|sb’s private life|${IF}
1038|violer la vie privée de qn|to breach, to violate sb’s privacy|${IF}
1039|une atteinte à, une violation de la vie privée|a breach of privacy, an invasion of privacy, a privacy violation|${IF}
1040|porter atteinte à la vie privée de qn|to intrude upon sb’s privacy|${IF}
1041|la vidéosurveillance|video surveillance|${IF}
1042|télévision en circuit fermé|CCTV, closed circuit television|${IF}
1043|enregistrer|to record|${IF}
1044|suivre de près les mouvements de qn|to monitor sb’s movements|${IF}
1045|avoir qn à l’œil|to keep tabs on sb, to keep an eye on sb|${IF}
1046|espionner qn|to spy on sb, to snoop on sb|${IF}
1047|suivre la trace de qn|to track sb|${IF}
1048|surveiller une frontière / le courrier de qn|to monitor a border / sb’s mail|${IF}
1049|un micro caché|a bug|${IF}
1050|placer des micros dans une pièce|to bug a room|${IF}
1051|mettre qn sur écoute téléphonique|to (wire)tap sb’s phone|${IF}
1052|les écoutes téléphoniques|phone tapping, wiretapping|${IF}
1053|écouter les conversations téléphoniques de qn|to eavesdrop on sb’s phone conversations|${IF}
1054|mettre son nez dans la vie personnelle de qn|to pry into sb’s personal life|${IF}
1055|des données, des informations|data|${IF}
1056|des informations personnelles|personal data, personal details|${IF}
1057|les coordonnées de qn|sb’s contact details|${IF}
1058|des données biométriques|biometric data|${IF}
1059|les informations bancaires de qn|sb’s banking details|${IF}
1060|un dossier médical / scolaire|a medical record / a school record|${IF}
1061|un casier judiciaire|a criminal record|${IF}
1062|un relevé de téléphone|a telephone bill|${IF}
1063|un relevé bancaire|a bank statement|${IF}
1064|rassembler, recueillir des informations|to collect, gather data|${IF}
1065|glaner des informations|to glean infomation|${IF}
1066|enregistrer, conserver des données|to record, store, retain data|${IF}
1067|rechercher et extraire des données|to retrieve data|${IF}
1068|ficher un suspect|to put a suspect on file|${IF}
1069|une base de données|a database|${IF}
1070|une base de données ADN|a DNA database|${IF}
1071|une empreinte génétique|a DNA print, genetic print|${IF}
1072|subir un test ADN|to be DNA-swabbed|${IF}
1073|tirer la sonnette d’alarme|to sound, to ring the alarm bell|${IF}
1074|dénoncer qn|to blow the whistle on sb|${IF}
1075|un lanceur d’alerte|a whistleblower|${IF}
1076|la drogue|drugs|${IDR}
1077|une drogue douce / dure|a soft / hard drug|${IDR}
1078|les stupéfiants|narcotics|${IDR}
1079|la dope, la came|dope|${IDR}
1080|le cannabis|cannabis|${IDR}
1081|la marijuana|marijuana|${IDR}
1082|les amphétamines|amphetamines|${IDR}
1083|l’héroïne|heroin|${IDR}
1084|inhaler, sniffer de la coke|to sniff, snort cocaine|${IDR}
1085|une aiguille|a needle|${IDR}
1086|une seringue|a syringe|${IDR}
1087|une drogue à usage récréatif occasionnel|a recreational drug|${IDR}
1088|une drogue de synthèse|a designer drug, a synthetic drug|${IDR}
1089|un psychotrope|a psychoactive, psychotropic substance|${IDR}
1090|se banaliser|to become commonplace|${IDR}
1091|la banalisation du crack|the spreading use of crack|${IDR}
1092|un fléau|a plague, a curse, a scourge|${IDR}
1093|le trafic de drogue|drug-trafficking|${IDR}
1094|un trafiquant de drogue, un narcotrafiquant|a drug trafficker|${IDR}
1095|un réseau de trafiquants|a drug ring, a drug cartel|${IDR}
1096|un baron de la drogue|a drug baron, a drug lord, a drug kingpin|${IDR}
1097|un passeur, une mule|a mule|${IDR}
1098|faire entrer de la drogue dans un pays|to smuggle drugs into a country|${IDR}
1099|un revendeur de drogues|a drug pusher, a drug peddler, a drug dealer|${IDR}
1100|la criminalité due à la drogue|drug-related crime|${IDR}
1101|consommer, prendre de la drogue, se droguer|to use drugs, to take drugs|${IDR}
1102|la consommation de drogue|drug use|${IDR}
1103|la toxicomanie|drug abuse, substance abuse, drug addiction|${IDR}
1104|un usager de drogue, un drogué|a drug-user|${IDR}
1105|un consommateur occasionnel / un gros consommateur|a casual / heavy user|${IDR}
1106|un consommateur de cannabis|a cannabis user|${IDR}
1107|être accro à qch|to be addicted to sth|${IDR}
1108|être accro à la cocaïne|to be hooked on cocaine|${IDR}
1109|avoir besoin d’une dose|to need a fix|${IDR}
1110|avoir un besoin maladif de qch|to crave sth|${IDR}
1111|l’accoutumance (à qch), la dépendance|addiction (to sth), dependency (on sth)|${IDR}
1112|qui crée une accoutumance, addictogène|addictive|${IDR}
1113|un drogué, un toxicomane|a drug addict, a drug abuser|${IDR}
1114|un drogué, un camé, un toxico|a junkie, a druggie|${IDR}
1115|faire une overdose, une surdose|to take an overdose, to OD|${IDR}
1116|essayer l’héroïne|to experiment with heroin|${IDR}
1117|un joint|a joint, a reefer|${IDR}
1118|avaler, inhaler la fumée|to inhale smoke|${IDR}
1119|planer, être défoncé|to be high, to be spaced out|${IDR}
1120|la prévention|prevention|${IDR}
1121|sensibiliser le public aux dangers du cannabis|to make people aware of the dangers of cannabis|${IDR}
1122|une campagne de sensibilisation|an awareness(-raising) campaign|${IDR}
1123|légaliser la consommation de cannabis|to legalize cannabis use|${IDR}
1124|dépénaliser, décriminaliser|to decriminalize|${IDR}
1125|les arguments pour et contre la légalisation|the pros and cons of legalization|${IDR}
1126|le traitement|treatment|${IDR}
1127|demander à être soigné|to seek treatment|${IDR}
1128|décrocher|to kick the habit|${IDR}
1129|un centre de désintoxication|a rehabilitation center|${IDR}
1130|entreprendre une cure de désintoxication|to go into rehab|${IDR}
1131|désintoxication|detoxification, detoxication|${IDR}
1132|un centre de désintoxication|a detoxi(fi)cation centre|${IDR}
1133|une cure de désintoxication|a detoxi(fi)cation programme|${IDR}
1134|être en cure de désintoxication|to be in detox|${IDR}
1135|éliminer qch progressivement|to phase sth out|${IDR}
1136|les symptômes de (l’état de) manque|withdrawal symptoms|${IDR}
1137|la méthadone|methadone|${IDR}
1138|rechuter|to relapse|${IDR}
1139|réprimer la consommation de drogues|to clamp down on, to crack down on drug abuse|${IDR}
1140|la répression|repression|${IDR}
1141|pénaliser la possession de drogues|to impose penalties for drug possession|${IDR}
1142|une amende|a fine|${IDR}
1143|condamner qn à une amende|to fine sb|${IDR}
1144|le responsable de la lutte contre la drogue|the drug czar, the drug tsar|${IDR}
1145|un virus|a virus|${CO}
1146|muter|to mutate|${CO}
1147|contagieux, infectieux|contagious, catching, infectious|${CO}
1148|contaminer|to contaminate|${CO}
1149|être contaminé par un virus|to be infected with a virus|${CO}
1150|un symptôme|a symptom|${CO}
1151|asymptomatique|asymptomatic|${CO}
1152|tousser|to cough|${CO}
1153|éternuer|to sneeze|${CO}
1154|inhaler des goutelettes en suspension dans l’air|to inhale airborne droplets|${CO}
1155|avoir le nez qui coule|to have a runny nose|${CO}
1156|avoir mal à la gorge|to have a sore throat|${CO}
1157|fatigue|tiredness, fatigue|${CO}
1158|mal de tête|headache|${CO}
1159|la diarrhée|diarrhoea, diarrhea (US)|${CO}
1160|avoir du mal à respirer|to have difficulty / trouble breathing|${CO}
1161|être essouflé, avoir le souffle court|to be short of breath, out of breath|${CO}
1162|avoir de la température|to have a temperature|${CO}
1163|avoir de la fièvre|to have a fever, to run a fever|${CO}
1164|être testé positif (pour le virus)|to test positive (for the virus)|${CO}
1165|être porteur d’un virus|to carry a virus|${CO}
1166|un porteur|a carrier|${CO}
1167|le système immunitaire|the immune system|${CO}
1168|immunité de groupe|herd immunity|${CO}
1169|la peste|plague|${CO}
1170|le choléra|cholera|${CO}
1171|la variole|smallpox|${CO}
1172|un fléau|a curse, a plague, a scourge|${CO}
1173|une catastrophe|a disaster|${CO}
1174|inattendu|unexpected|${CO}
1175|imprévisible|unpredictable, unforeseeable|${CO}
1176|se propager|to spread|${CO}
1177|la propagation d’un virus|the spread of a virus|${CO}
1178|une épidemie|an epidemic|${CO}
1179|une pandémie|a pandemic|${CO}
1180|un épicentre|an epicentre|${CO}
1181|éclater, se déclarer|to break out|${CO}
1182|le début d’une épidémie|an outbreak|${CO}
1183|l’ampleur, l’étendue de l’épidémie|the scope, the extent of the epidemic|${CO}
1184|affecter, toucher un pays|to affect a country|${CO}
1185|la zone la plus durement touchée|the hardest-hit area|${CO}
1186|endiguer une épidémie|to stem, halt an outbreak|${CO}
1187|enrayer une épidémie|to check an epidemic|${CO}
1188|éradiquer|to eradicate|${CO}
1189|endémique|endemic|${CO}
1190|la grippe|flu, influenza|${CO}
1191|syndrome respiratoire aigu sévère (SRAS)|Severe Acute Respiratory Syndrome (SARS)|${CO}
1192|le virus de la grippe A|the H1N1 virus|${CO}
1193|la grippe porcine|swine flu, pig flu, H1N1 flu|${CO}
1194|la grippe aviaire|bird flu, avian flu, avian influenza H5N1|${CO}
1195|une souche de grippe|a flu strain|${CO}
1196|un cas de grippe aviaire|a case of avian flu|${CO}
1197|un foyer de grippe aviaire|an outbreak of avian flu|${CO}
1198|mortel|lethal|${CO}
1199|létalité|lethality|${CO}
1200|le nombre de victimes|the death toll|${CO}
1201|les personnes âgées|the elderly|${CO}
1202|une maison de retraite|a care home, a nursing home, a retirement home|${CO}
1203|hospitaliser qn|to hospitalize sb|${CO}
1204|être en réanimation|to be in intensive care|${CO}
1205|un ventilateur|a ventilator|${CO}
1206|les (personnels) soignants|health workers, medical staff|${CO}
1207|une infirmière|a nurse|${CO}
1208|une aide-soignante|an assistant nurse|${CO}
1209|un héros|a hero|${CO}
1210|applaudir|to clap|${CO}
1211|être solidaire de qn|show solidarity with sb|${CO}
1212|lutter contre le virus|to combat the virus|${CO}
1213|état d’urgence|state of emergency|${CO}
1214|aplatir la courbe|to flatten the curve|${CO}
1215|les gestes barrières|preventative measures, health precautions|${CO}
1216|un mouchoir en papier|a tissue|${CO}
1217|la distanciation sociale|social distancing|${CO}
1218|se laver les mains|to wash your hands|${CO}
1219|saluer qn|to greet sb|${CO}
1220|se serrer la main|to shake hands|${CO}
1221|faire la bise à qn|to kiss sb|${CO}
1222|porter un masque|to wear a (face) mask|${CO}
1223|fournitures médicales|medical supplies|${CO}
1224|stocker|to stockpile|${CO}
1225|ne plus avoir d’équipements de protection|to run out of protective equipment|${CO}
1226|manquer de masques|to be short of masks|${CO}
1227|une pénurie|a shortage|${CO}
1228|des gants|gloves|${CO}
1229|s’isoler|to self-isolate|${CO}
1230|l’eau de javel|bleach|${CO}
1231|désinfecter les lieux publics|to disinfect public areas|${CO}
1232|antibiotiques|antibiotics|${CO}
1233|un vaccin|a vaccine|${CO}
1234|se faire vacciner|to get vaccinated|${CO}
1235|mettre qn en quarantaine|to quarantine sb|${CO}
1236|mettre / être en quarantaine|to put / be under quarantine|${CO}
1237|interdiction de voyager|travel ban|${CO}
1238|limitations de déplacement|travel restrictions|${CO}
1239|ordonner le confinement|to issue a stay-at-home order|${CO}
1240|confinement|lockdown, confinement|${CO}
1241|télétravailler|to work from / at home|${CO}
1242|une visioconférence|a videoconference|${CO}
1243|mettre qn en chômage partiel|to furlough sb|${CO}
1244|achats (sous l’emprise de la) panique|panic buying|${CO}
1245|la nourriture|food|${ED}
1246|les denrées alimentaires, les aliments|foodstuffs|${ED}
1247|se nourrir de qch|to feed oneself on sth|${ED}
1248|cuisiner|to cook|${ED}
1249|faire la cuisine|to do the cooking|${ED}
1250|les habitudes alimentaires|eating habits, eating patterns|${ED}
1251|la consommation de fruits et de légumes|fruit and vegetable intake|${ED}
1252|la consommation quotidienne de sel|daily salt intake|${ED}
1253|le poids|weight|${ED}
1254|se peser|to weigh oneself|${ED}
1255|peser 55 kg|to weigh 55 kg|${ED}
1256|prendre du poids|to put on, gain weight|${ED}
1257|être trop gros, en surpoids|to be overweight|${ED}
1258|avoir dix kilos de trop|to be ten kilos overweight|${ED}
1259|le surpoids, la surcharge pondérale|overweight|${ED}
1260|gros, gras|fat|${ED}
1261|obèse|obese|${ED}
1262|l’obésité|obesity|${ED}
1263|l’obésité des enfants|childhood obesity|${ED}
1264|grassouillet, dodu|plump|${ED}
1265|corpulent|stout, corpulent|${ED}
1266|le tour de taille|the waistline|${ED}
1267|la graisse superflue|flab|${ED}
1268|une bedaine, une panse|a paunch|${ED}
1269|la boulimie|bulimia|${ED}
1270|boulimique|bulimic|${ED}
1271|ne pas pouvoir s’empêcher de manger|to be a compulsive eater|${ED}
1272|s’empiffrer de chocolat|to binge on chocolate|${ED}
1273|les excès de nourriture|binge eating|${ED}
1274|les excès de boisson|binge drinking|${ED}
1275|faire des excès (de nourriture, de boisson)|to go on a binge|${ED}
1276|résister à la tentation|to resist temptation|${ED}
1277|céder à la tentation|to give in to temptation|${ED}
1278|un fast food|a fast food restaurant|${ED}
1279|manger des cochonneries|to eat junk food|${ED}
1280|les aliments préparés|processed foods|${ED}
1281|les aliments riches en graisses|fatty foods|${ED}
1282|les féculents|starch, starchy foods|${ED}
1283|les légumes|vegetables|${ED}
1284|les fruits|fruit|${ED}
1285|les légumes verts|green vegetables, greens|${ED}
1286|les boissons gazeuses|sodas, fizzy drinks|${ED}
1287|une barre chocolatée|a chocolate bar|${ED}
1288|un accro au chocolat|a chocaholic, a chocoholic|${ED}
1289|être accro à qch|to be addicted to sth|${ED}
1290|l’accoutumance, la dépendance|addiction|${ED}
1291|qui crée une accoutumance, addictogène|addictive|${ED}
1292|maigre|thin|${ED}
1293|maigrelet, maigrichon|skinny, scrawny|${ED}
1294|être mince et musclé|to be lean and muscular|${ED}
1295|anguleux, décharné|bony|${ED}
1296|mince, svelte|slim, slender, svelte|${ED}
1297|être trop maigre, ne pas peser assez|to be underweight|${ED}
1298|l’anorexie|anorexia|${ED}
1299|anorexique|anorexic|${ED}
1300|devenir anorexique|to develop anorexia|${ED}
1301|être diagnostiqué anorexique|to be diagnosed with anorexia|${ED}
1302|se laisser mourir de faim|to starve oneself to death|${ED}
1303|commencer / faire un régime|to go on / be on a diet|${ED}
1304|un régime amaigrissant|a slimming diet|${ED}
1305|une alimentation saine|a healthy diet|${ED}
1306|une alimentation équilibrée / mal équilibrée|balanced / unbalanced diet|${ED}
1307|les aliments basses calories|diet foods|${ED}
1308|les aliments diététiques|health foods|${ED}
1309|un magasin de produits diététiques|a health food shop|${ED}
1310|la nourriture biologique, les aliments bio|organic food|${ED}
1311|un restaurant diététique|an organic restaurant|${ED}
1312|végétarien|vegetarian|${ED}
1313|un nutritionniste|a nutritionist|${ED}
1314|un diététicien|a dietician, a dietitian|${ED}
1315|sédentaire|sedentary|${ED}
1316|un mode de vie sédentaire, la sédentarité|a sedentary lifestyle|${ED}
1317|perdre du poids|to lose weight|${ED}
1318|être en forme, en bonne santé|to be fit|${ED}
1319|surveiller sa ligne / garder la ligne|to watch / keep one’s figure|${ED}
1320|l’exercice physique|physical exercise|${ED}
1321|faire de la gymnastique|to do (physical) exercises|${ED}
1322|faire de l’exercice|to take exercise|${ED}
1323|faire du sport|to do sport|${ED}
1324|pratiquer un sport|to practise a sport|${ED}
1325|la santé, la forme|fitness|${ED}
1326|un mordu de culture physique|a fitness freak, a fitness fanatic|${ED}
1327|aller dans une salle de gym|to go to the gym|${ED}
1328|faire de la musculation|to work out|${ED}
1329|faites l’amour, pas la guerre|make love, not war|${WP}
1330|conflit, litige, contentieux|a dispute|${WP}
1331|un litige frontalier|a border dispute|${WP}
1332|un conflit armé|an armed conflict|${WP}
1333|être mêlé à un conflit|be embroiled in a conflict|${WP}
1334|ennemi|enemy|${WP}
1335|un désaccord, une dispute, une querelle|disagreement, row|${WP}
1336|une épreuve de force, un bras de fer|a showdown|${WP}
1337|militaire / civil|military / civilian|${WP}
1338|les militaires|the military|${WP}
1339|un belliciste|a warmonger|${WP}
1340|la propagande belliciste|warmongering|${WP}
1341|un militariste|a militarist|${WP}
1342|militariste|militaristic|${WP}
1343|être en guerre / en paix|to be at war / at peace|${WP}
1344|déclarer la guerre à un pays|to declare war on a country|${WP}
1345|faire la guerre à un ennemi|to wage war on an enemy, against an enemy|${WP}
1346|un allié|an ally|${WP}
1347|éclater|to break out|${WP}
1348|se battre|to fight|${WP}
1349|attaquer / défendre|to attack / to defend|${WP}
1350|conquérir|to conquer|${WP}
1351|la conquête|conquest|${WP}
1352|envahir|to invade|${WP}
1353|assiéger|to besiege|${WP}
1354|les forces armées|armed forces|${WP}
1355|un corps expéditionnaire|a task force|${WP}
1356|les troupes|troops|${WP}
1357|les forces aéronavales|air and sea forces|${WP}
1358|une campagne militaire|a military campaign|${WP}
1359|le champ de bataille|the battlefield|${WP}
1360|déployer|to deploy|${WP}
1361|le déploiement|deployment|${WP}
1362|retirer des troupes d’un endroit|to withdraw troops from a place|${WP}
1363|le retrait|withdrawal|${WP}
1364|un blocus|a blockade|${WP}
1365|vaincre un adversaire|to defeat an adversary|${WP}
1366|un revers|a setback|${WP}
1367|des représailles|reprisals, retaliation|${WP}
1368|user de représailles envers qn|to retaliate against sb|${WP}
1369|un vainqueur|a victor|${WP}
1370|un militaire, un soldat|a serviceman, a soldier|${WP}
1371|un militaire de carrière|a professional soldier, a career soldier|${WP}
1372|s’engager, s’enrôler dans l’armée de l’air|to join the Air Force, to enlist in the Air Force|${WP}
1373|recruter|to recruit|${WP}
1374|une recrue|a recruit|${WP}
1375|un officier|an officer|${WP}
1376|un objecteur de conscience|a conscientious objector|${WP}
1377|déserter|to desert|${WP}
1378|un déserteur|a deserter|${WP}
1379|des armes|weapons, arms|${WP}
1380|des armes de destruction massive|weapons of mass destruction, WMDs|${WP}
1381|un arsenal|an arsenal|${WP}
1382|des munitions|ammunition, munitions|${WP}
1383|une bombe|a bomb|${WP}
1384|bombarder|to bomb|${WP}
1385|un bombardement|a bombing, a bombardment|${WP}
1386|un bombardier|a bomber|${WP}
1387|des armes intelligentes|smart weapons|${WP}
1388|une frappe, une intervention aérienne|an air strike|${WP}
1389|une frappe chirurgicale|a surgical strike|${WP}
1390|un bombardier furtif|a stealth bomber|${WP}
1391|un porte-avions|an aircraft carrier|${WP}
1392|un avion de chasse, un chasseur|a fighter (plane)|${WP}
1393|un drone, un avion téléguidé|a drone, an unmanned aerial vehicle (UAV)|${WP}
1394|un missile|a missile|${WP}
1395|la guerre des nerfs / d’usure|war of nerves / of attrition|${WP}
1396|la guerre nucléaire / biologique / chimique|nuclear / biological / chemical warfare|${WP}
1397|massacre|massacre, slaughter|${WP}
1398|effusion de sang, carnage, boucherie|bloodshed|${WP}
1399|les blessés|the wounded|${WP}
1400|les morts et les blessés|the casualties|${WP}
1401|bilan des victimes|death toll|${WP}
1402|le renseignement|intelligence|${WP}
1403|espionner un ennemi|to spy on an enemy|${WP}
1404|satellite-espion|a spy satellite, a surveillance satellite|${WP}
1405|un crime de guerre|a war crime|${WP}
1406|un criminel de guerre|a war criminal|${WP}
1407|un crime contre l’humanité|a crime against humanity|${WP}
1408|un génocide|a genocide|${WP}
1409|purification ethnique|ethnic cleansing|${WP}
1410|exterminer|to exterminate|${WP}
1411|un cessez-le-feu|a ceasefire|${WP}
1412|une trêve|a truce|${WP}
1413|se rendre|to surrender|${WP}
1414|un armistice|an armistice|${WP}
1415|le désarmement|disarmament|${WP}
1416|un pacifiste|a peace campaigner, a pacifist, a peacenik|${WP}
1417|un bourbier|a quagmire|${WP}
1418|l’enlisement|stalemate|${WP}
1419|des pourparlers de paix|peace talks|${WP}
1420|le processus de paix|the peace process|${WP}
1421|un accord de paix|a peace agreement, a peace accord, a peace settlement|${WP}
1422|un traité de paix|a peace treaty|${WP}
1423|le dividende de la paix|the peace dividend|${WP}
1424|un prisonnier de guerre|a prisoner of war, a POW|${WP}
1425|être porté disparu|to be reported missing|${WP}
1426|s’absenter sans permission, manquer à l’appel|to be absent without leave, AWOL|${WP}
1427|un ancien combattant|a veteran, a vet|${WP}
1428|un amputé|an amputee|${WP}
1429|être estropié, mutilé pour la vie|be maimed for life|${WP}
1430|névrose post-traumatique|Post Traumatic Stress Disorder, PTSD|${WP}
1431|avoir des rapports (sexuels) avec qn|to have sex, sexual intercourse, sexual relations with sb|${SLM}
1432|un partenaire sexuel|a sex partner|${SLM}
1433|le désir|desire|${SLM}
1434|le désir sexuel|lust|${SLM}
1435|l’érotisme|eroticism|${SLM}
1436|être excité sexuellement|to be sexually aroused|${SLM}
1437|caresser|to fondle, to caress|${SLM}
1438|les préliminaires amoureux|foreplay|${SLM}
1439|un orgasme|an orgasm|${SLM}
1440|jouir|to come|${SLM}
1441|la sodomie|anal sex, sodomy|${SLM}
1442|rapports bucco-génitaux|oral sex|${SLM}
1443|chaste|chaste|${SLM}
1444|un(e) vierge|a virgin|${SLM}
1445|l’amour platonique|platonic love|${SLM}
1446|être frustré sexuellement|to be sex-starved|${SLM}
1447|les organes génitaux|genitals|${SLM}
1448|le sperme|sperm, semen|${SLM}
1449|le nombre de spermatozoïdes|sperm count|${SLM}
1450|une maladie sexuellement transmissible (MST), une maladie vénérienne|a sexually-transmitted disease (STD), a venereal disease (VD)|${SLM}
1451|le SIDA (le syndrome d’immunodéficience acquise)|AIDS (acquired immune deficiency syndrome)|${SLM}
1452|la blennorragie|gonorrhea|${SLM}
1453|un préservatif|a condom|${SLM}
1454|des rapports protégés / non protégés|safe sex, protected sex / unprotected sex|${SLM}
1455|l’industrie du sexe|the sex industry|${SLM}
1456|une maison close, un bordel|a brothel|${SLM}
1457|un travailleur sexuel|a sex worker|${SLM}
1458|le tourisme sexuel|sex tourism|${SLM}
1459|une prostituée|a prostitute, a hustler|${SLM}
1460|un prostitué|a rent boy (GB)|${SLM}
1461|un proxénète, un souteneur, un maquereau|a procurer, a pimp|${SLM}
1462|un gigolo|a gigolo, a toy boy (GB)|${SLM}
1463|la pornographie|pornography|${SLM}
1464|une revue porno|a porn magazine, a skin magazine (US)|${SLM}
1465|un film porno|a porn film, a blue movie|${SLM}
1466|le harcèlement sexuel|sexual harassment|${SLM}
1467|être harcelé sexuellement par qn|to be sexually harassed by sb|${SLM}
1468|un objet sexuel|a sex object|${SLM}
1469|violer|to rape|${SLM}
1470|un violeur|a rapist|${SLM}
1471|violence conjugale, familiale|domestic violence|${SLM}
1472|les sévices sexuels, abus sexuel|sexual abuse|${SLM}
1473|faire subir des abus sexuels à qn|to abuse sb sexually|${SLM}
1474|être violenté, agressé sexuellement|to be sexually assaulted|${SLM}
1475|un pédophile|a paedophile (GB), a pedophile (US)|${SLM}
1476|la pédophilie|paedophilia (GB), pedophilia (US)|${SLM}
1477|un réseau pédophile|a paedophile ring|${SLM}
1478|se livrer à des attouchements sur un enfant|to interfere with a child|${SLM}
1479|auteur de sévices sexuels sur enfant|a child molester|${SLM}
1480|les sévices sexuels infligés à des enfants|child abuse|${SLM}
1481|un auteur de sévices|an abuser|${SLM}
1482|l’inceste|incest|${SLM}
1483|une relation incestueuse|an incestuous relationship|${SLM}
1484|un pervers (sexuel), une pervertie sexuelle|a pervert|${SLM}
1485|avoir l’esprit mal tourné|to have a dirty mind|${SLM}
1486|être obsédé|to have a one-track mind, to be sex-mad|${SLM}
1487|un obsédé sexuel|a sex maniac, a sexaholic|${SLM}
1488|une nymphomane|a nymphomaniac|${SLM}
1489|un délinquant sexuel|a sex offender|${SLM}
1490|la castration chimique|chemical castration|${SLM}
1491|séduisant|attractive|${SLM}
1492|une bombe sexuelle|a sex goddess|${SLM}
1493|être attiré par qn|to be attracted to sb|${SLM}
1494|le coup de foudre|love at first sight|${SLM}
1495|faire la cour à qn|to woo, to court sb|${SLM}
1496|flirter avec qn|to flirt with sb|${SLM}
1497|draguer qn|to try and pick up sb, to chat sb up|${SLM}
1498|faire des avances à qn|to make a pass at sb|${SLM}
1499|faire de l’œil à qn|to make eyes at sb|${SLM}
1500|faire du pied à qn|to play footsie with sb|${SLM}
1501|tomber amoureux de qn|to fall in love with sb, to fall for sb|${SLM}
1502|avoir le béguin pour qn|have a crush on sb|${SLM}
1503|s’enticher de qn|to become infatuated, besotted with sb|${SLM}
1504|vivre un grand amour|to be deeply in love|${SLM}
1505|avoir une aventure avec qn|to have an affair with sb|${SLM}
1506|une idylle|a romance|${SLM}
1507|une liaison sans lendemain|a one-night stand|${SLM}
1508|coucher avec qn|to sleep with sb, to go to bed with sb|${SLM}
1509|coucher avec n’importe qui|to sleep around|${SLM}
1510|changer souvent de partenaire|to be promiscuous|${SLM}
1511|un petit ami / une petite amie|a boyfriend / a girlfriend|${SLM}
1512|un rendez-vous avec un amoureux OU un(e) petit(e) ami(e)|a date|${SLM}
1513|sortir avec qn|to date sb|${SLM}
1514|un site de rencontres|a dating site|${SLM}
1515|le mariage|marriage|${SLM}
1516|un mariage forcé / arrangé|a forced / arranged marriage|${SLM}
1517|un mariage blanc|a sham marriage, a marriage of convenience|${SLM}
1518|se marier avec qn|to marry sb, to get married to sb|${SLM}
1519|(cérémonie du) mariage|a wedding|${SLM}
1520|demander qn en mariage|to propose to sb|${SLM}
1521|avoir qn dans sa vie|to be in a relationship|${SLM}
1522|sortir OU vivre avec qn depuis longtemps|to be in a long-term relationship with sb|${SLM}
1523|se mettre en ménage avec qn|to move in with sb, to set up house with sb|${SLM}
1524|un compagnon OU une compagne|a (live-in) partner|${SLM}
1525|vivre en concubinage|to live together|${SLM}
1526|la fidélité (concept)|fidelity|${SLM}
1527|les relations sexuelles hors mariage|extramarital sex|${SLM}
1528|être infidèle à qn|to cheat on sb, to be unfaithful to sb|${SLM}
1529|la fidélité (fait d'être fidèle)|faithfulness|${SLM}
1530|l’adultère|adultery|${SLM}
1531|un coureur de jupons|a womanizer, a philanderer|${SLM}
1532|cesser d’aimer qn|to fall out of love|${SLM}
1533|rompre avec qn|to split up with sb, break up with sb|${SLM}
1534|se séparer de qn|to separate from sb|${SLM}
1536|homosexuel|homosexual|${SSM}
1537|l’homosexualité|homosexuality|${SSM}
1538|l’orientation sexuelle|sexual orientation|${SSM}
1539|la majorité sexuelle|the age of consent|${SSM}
1540|la communauté gay|the gay community|${SSM}
1541|une lesbienne|a lesbian|${SSM}
1542|le mouvement des lesbiennes et des gays|the lesbian and gay movement|${SSM}
1543|bisexuel|bisexual|${SSM}
1544|un(e) transsexuel(le)|a transexual|${SSM}
1545|un travesti|a transvestite|${SSM}
1546|transgenre, transsexuel|transgender|${SSM}
1547|se déclarer ouvertement homosexuel|to come out (of the closet)|${SSM}
1548|révéler l’homosexualité de qn (sans son consentement)|to out sb|${SSM}
1549|les droits des homosexuels|gay rights|${SSM}
1550|favorable aux homosexuels|gay-friendly|${SSM}
1551|un hôtel où les homosexuels sont bienvenus|a gay-friendly hotel|${SSM}
1552|se marier avec qn, épouser qn|to marry sb|${SSM}
1553|être marié / se marier avec qn|to be / get married to sb|${SSM}
1554|convoler, se passer la bague au doigt|to tie the knot, to get hitched|${SSM}
1555|le mariage (institution)|marriage|${SSM}
1556|un mariage (cérémonie)|a wedding|${SSM}
1557|un PACS, une union civile|a civil partnership, a civil union, a domestic partnership|${SSM}
1558|un couple gay|a gay couple|${SSM}
1559|un compagnon OU une compagne|a partner|${SSM}
1560|un(e) petit(e) amie(e) avec qui l’on vit|a live-in boyfriend / girlfriend|${SSM}
1561|s’installer avec qn|to move in with sb|${SSM}
1562|se mettre en ménage avec qn|to set up house with sb|${SSM}
1563|une famille homoparentale|same-sex parents, LGBT parents|${SSM}
1564|l’homoparentalité|same-sex parenting|${SSM}
1565|légaliser / interdire le mariage homosexuel|to legalize / ban gay marriage|${SSM}
1566|avoir des opinions progressistes|to have liberal views|${SSM}
1567|une question controversée, un problème sensible|a hot-button issue|${SSM}
1568|un problème controversé|a controversial, contentious issue|${SSM}
1569|être contre le mariage homosexuel|to oppose gay marriage, to be opposed to gay marriage|${SSM}
1570|les opposants au mariage homosexuel|opponents, critics of gay marriage|${SSM}
1571|être pour le mariage homosexuel / favorable au mariage homosexuel|to support gay marriage|${SSM}
1572|les partisans du mariage homosexuel|advocates, supporters, proponents of gay marriage|${SSM}
1573|les valeurs conservatrices|conservative values|${SSM}
1574|un préjugé|a prejudice, a bias|${SSM}
1575|avoir des préjugés contre qch|be prejudiced, biased against sth|${SSM}
1576|traditionaliste|traditionalist|${SSM}
1577|un homophobe|a homophobe|${SSM}
1578|l’homophobie|homophobia|${SSM}
1579|des remarques homophobes|homophobic remarks|${SSM}
1580|être inflexible au sujet du mariage gay|to take a tough line on gay marriage|${SSM}
1582|l’univers|the universe|${SPA}
1583|le système solaire|the solar system|${SPA}
1584|une galaxie|a galaxy|${SPA}
1585|l’espace|outer space|${SPA}
1586|une année-lumière|a light year|${SPA}
1587|une planète|a planet|${SPA}
1588|une comète|a comet|${SPA}
1589|un astéroïde|an asteroid|${SPA}
1590|un trou noir|a black hole|${SPA}
1591|un météorite|a meteorite|${SPA}
1592|un monolithe|a monolith|${SPA}
1593|un mégalithe|a megalith|${SPA}
1594|l’astronomie|astronomy|${SPA}
1595|un astronome|an astronomer|${SPA}
1596|un fana de l’espace|a space buff|${SPA}
1597|la NASA|NASA|${SPA}
1598|l’Agence spatiale européenne|the ESA (European Space Agency)|${SPA}
1599|la conquête de l’espace|the conquest of space|${SPA}
1600|l’ère spatiale|the space age|${SPA}
1601|la course dans l’espace|the space race|${SPA}
1602|un vol dans l’espace|a space flight|${SPA}
1603|l’astronautique|astronautics|${SPA}
1604|l’avionique|avionics|${SPA}
1605|l’espace aérien|airspace|${SPA}
1606|l’industrie aérospatiale|the aerospace industry|${SPA}
1607|une mission sur Mars|a mission to Mars|${SPA}
1608|explorer|to explore|${SPA}
1609|un explorateur|an explorer|${SPA}
1610|un vol habité|a manned flight|${SPA}
1611|un vol inhabité|a unmanned flight|${SPA}
1612|une combinaison spatiale|a space suit|${SPA}
1613|un casque d’astronaute|a space helmet|${SPA}
1614|un équipage|a crew|${SPA}
1615|un astronaute|an astronaut|${SPA}
1616|un cosmonaute|a cosmonaut|${SPA}
1617|un taïkonaute|a taïkonaut|${SPA}
1618|voyageur de l'espace|spaceman / spacewoman / space traveller|${SPA}
1619|astronaute stagiaire|space cadet|${SPA}
1620|une fusée|a rocket|${SPA}
1621|une rétrofusée|a retrorocket|${SPA}
1622|un téléscope|a telescope|${SPA}
1623|une sonde|a probe|${SPA}
1624|un vaisseau spatial|a spaceship / a rocket ship / spacecraft|${SPA}
1625|le carburant|fuel|${SPA}
1626|une navette|a shuttle|${SPA}
1627|une station spatiale|a space station|${SPA}
1628|un véhicule spatial|a lander|${SPA}
1629|un véhicule lunaire|a lunar rover|${SPA}
1630|lancer|to launch|${SPA}
1631|être mis à feu|to blast off|${SPA}
1632|un lanceur de satellites|a satellite launcher|${SPA}
1633|une rampe de lancement, pas de tir|a launch pad|${SPA}
1634|le compte à rebours|the countdown|${SPA}
1635|l’envol|lift-off|${SPA}
1636|un moteur|an engine|${SPA}
1637|propulseur de fusée, moteur-fusée|a rocket engine|${SPA}
1638|propulser|to propel|${SPA}
1639|le combustible pour fusée, le propergol|propellant|${SPA}
1640|kérosène (de fusée)|rocket fuel|${SPA}
1641|une fusée de lancement|a launch vehicle / a booster / a booster rocket|${SPA}
1642|une fusée interplanétaire|a space rocket|${SPA}
1643|une fusée à étages|a multi-stage rocket|${SPA}
1644|un sas|an airlock|${SPA}
1645|ce n’est pas sorcier !|it’s not rocket science!|${SPA}
1646|un missile|a missile|${SPA}
1647|un satellite de télécommunications|a communications satellite|${SPA}
1648|un satellite météorologique|a weather satellite|${SPA}
1649|un satellite espion|a surveillance satellite|${SPA}
1650|télécommandé|remote-controlled|${SPA}
1651|être en orbite / se mettre en orbite|to be in orbit / go into orbit|${SPA}
1652|mettre, placer un satellite en orbite|to put a satellite in(to) orbit|${SPA}
1653|atterrir|to land / to touch down|${SPA}
1654|atterrissage / amerissage / alunissage|touchdown|${SPA}
1655|alunir|to land on the moon|${SPA}
1656|amerrir|to splash down|${SPA}
1657|amerissage|splashdown|${SPA}
1658|l’apesanteur|weightlessness / zero gravity|${SPA}
1659|la micro-gravité|microgravity|${SPA}
1660|le tourisme dans l’espace|space tourism|${SPA}
1661|recherches aérospatiales|space research / rocket research|${SPA}
1662|un laboratoire spatial|a space lab|${SPA}
1663|la spatiologie|space science|${SPA}
1664|une retombée|a spin-off|${SPA}
1665|le GPS|satnav / global positioning system / GPS|${SPA}
1666|une soucoupe volante|a flying saucer|${SPA}
1667|un OVNI|an unidentified flying object / a UFO|${SPA}
1668|un extra-terrestre|an alien / an alien being|${SPA}
1669|un martien|a Martian|${SPA}

8000|supporter/porter/naître|bear / bore / borne/born|${VI}
8001|battre|beat / beat / beaten|${VI}
8002|devenir|become / became / become|${VI}
8003|commencer|begin / began / begun|${VI}
8004|plier, se courber|bend / bent / bent|${VI}
8005|parier|bet / bet / bet|${VI}
8006|lier, relier|bind / bound / bound|${VI}
8007|mordre|bite / bit / bitten|${VI}
8008|saigner|bleed / bled / bled|${VI}
8009|souffler|blow / blew / blown|${VI}
8010|casser|break / broke / broken|${VI}
8011|apporter|bring / brought / brought|${VI}
8012|construire|build / built / built|${VI}
8013|brûler|burn / burnt / burnt|${VI}
8014|éclater|burst / burst / burst|${VI}
8015|acheter|buy / bought / bought|${VI}
8016|jeter (un sort), distribuer des rôles|cast / cast / cast|${VI}
8017|attraper|catch / caught / caught|${VI}
8018|choisir|choose / chose / chosen|${VI}
8019|s’accrocher, adhérer|cling / clung / clung|${VI}
8020|venir|come / came / come|${VI}
8021|coûter|cost / cost / cost|${VI}
8022|ramper, grimper|creep / crept / crept|${VI}
8023|couper|cut / cut / cut|${VI}
8024|distribuer|deal / dealt / dealt|${VI}
8025|creuser|dig / dug / dug|${VI}
8026|plonger|dive / dived / dived/dove(USA)|${VI}
8027|faire|do / did / done|${VI}
8028|dessiner|draw / drew / drawn|${VI}
8029|rêver|dream / dreamt / dreamt|${VI}
8030|boire|drink / drank / drunk|${VI}
8031|conduire|drive / drove / driven|${VI}
8032|manger|eat / ate / eaten|${VI}
8033|tomber|fall / fell / fallen|${VI}
8034|nourrir|feed / fed / fed|${VI}
8035|sentir, éprouver|feel / felt / felt|${VI}
8036|se battre, combattre|fight / fought / fought|${VI}
8037|trouver|find / found / found|${VI}
8038|s’enfuir|flee / fled / fled|${VI}
8039|voler (avion)|fly / flew / flown|${VI}
8040|interdire|forbid / forbade / forbidden|${VI}
8041|oublier|forget / forgot / forgotten|${VI}
8042|pardonner|forgive / forgave / forgiven|${VI}
8043|geler|freeze / froze / frozen|${VI}
8044|obtenir|get / got / got|${VI}
8045|donner|give / gave / given|${VI}
8046|aller|go / went / gone|${VI}
8047|grandir|grow / grew / grown|${VI}
8048|pendre, tenir, accrocher|hang / hung / hung|${VI}
8049|avoir|have / had / had|${VI}
8050|entendre|hear / heard / heard|${VI}
8051|(se) cacher|hide / hid / hidden|${VI}
8052|frapper, atteindre, toucher|hit / hit / hit|${VI}
8053|tenir|hold / held / held|${VI}
8054|blesser|hurt / hurt / hurt|${VI}
8055|garder|keep / kept / kept|${VI}
8056|s’agenouiller|kneel / knelt / knelt|${VI}
8057|savoir, connaître|know / knew / known|${VI}
8058|mener|lead / led / led|${VI}
8059|s’appuyer|lean / leant / leant|${VI}
8060|apprendre|learn / learnt / learnt|${VI}
8061|laisser, quitter|leave / left / left|${VI}
8062|prêter|lend / lent / lent|${VI}
8063|permettre|let / let / let|${VI}
8064|allumer|light / lit / lit|${VI}
8065|perdre|lose / lost / lost|${VI}
8066|fabriquer, faire|make / made / made|${VI}
8067|signifier, vouloir dire|mean / meant / meant|${VI}
8068|(se) rencontrer|meet / met / met|${VI}
8069|mettre|put / put / put|${VI}
8070|cesser (de)|quit / quit / quit|${VI}
8071|lire|read / read / read|${VI}
8072|chevaucher|ride / rode / ridden|${VI}
8073|sonner|ring / rang / rung|${VI}
8074|s’élever, se lever|rise / rose / risen|${VI}
8075|courir|run / ran / run|${VI}
8076|scier|saw / sawed / sawn|${VI}
8077|dire|say / said / said|${VI}
8078|voir|see / saw / seen|${VI}
8079|chercher|seek / sought / sought|${VI}
8080|vendre|sell / sold / sold|${VI}
8081|envoyer|send / sent / sent|${VI}
8082|fixer|set / set / set|${VI}
8083|secouer|shake / shook / shaken|${VI}
8084|briller|shine / shone / shone|${VI}
8085|tirer/tuer par balle/filmer|shoot / shot / shot|${VI}
8086|montrer|show / showed / shown|${VI}
8087|rétrécir|shrink / shrank / shrunk|${VI}
8088|fermer|shut / shut / shut|${VI}
8089|chanter|sing / sang / sung|${VI}
8090|couler|sink / sank / sunk|${VI}
8091|être assis|sit / sat / sat|${VI}
8092|dormir|sleep / slept / slept|${VI}
8093|glisser|slide / slid / slid|${VI}
8094|sentir|smell / smelt / smelt|${VI}
8095|parler|speak / spoke / spoken|${VI}
8096|accélérer|speed / sped / sped|${VI}
8097|dépenser|spend / spent / spent|${VI}
8098|fendre|split / split / split|${VI}
8099|gâcher|spoil / spoilt / spoilt|${VI}
8100|répandre|spread / spread / spread|${VI}
8101|jaillir, bondir|spring / sprang / sprung|${VI}
8102|être debout|stand / stood / stood|${VI}
8103|voler quelque chose, dérober|steal / stole / stolen|${VI}
8104|coller|stick / stuck / stuck|${VI}
8105|piquer|sting / stung / stung|${VI}
8106|frapper|strike / struck / struck|${VI}
8107|jurer|swear / swore / sworn|${VI}
8108|enfler|swell / swelled / swollen|${VI}
8109|nager|swim / swam / swum|${VI}
8110|se balancer|swing / swung / swung|${VI}
8111|prendre|take / took / taken|${VI}
8112|enseigner|teach / taught / taught|${VI}
8113|déchirer|tear / tore / torn|${VI}
8114|dire, raconter|tell / told / told|${VI}
8115|penser|think / thought / thought|${VI}
8116|jeter|throw / threw / thrown|${VI}
8117|comprendre|understand / understood / understood|${VI}
8118|bouleverser|upset / upset / upset|${VI}
8119|(se) réveiller|wake / woke / woken|${VI}
8120|porter (des vêtements)|wear / wore / worn|${VI}
8121|mouiller|wet / wet / wet|${VI}
8122|gagner|win / won / won|${VI}
8123|enrouler|wind / wound / wound|${VI}
8124|(se) retirer, retirer de l’argent|withdraw / withdrew / withdrawn|${VI}
8125|écrire|write / wrote / written|${VI}

`.trim();



// C'EST ICI QUE LA CORRECTION EST IMPORTANTE : Ajout de String.raw`...`
const RAW_PHY = String.raw`

==================================================
DECK : EM1
==================================================

Q: (INC)
Énoncer le principe de Curie
R: Les éléments d'invariance et de symétrie des causes doivent se retrouver dans les effets produits.
--------------------
Q: (INC)
Quelles sont les dimensions de la densité volumique/surfacique/linéique de charge ?
R: densité volumique de charge ρ homogène à une charge divisée par un volume
unité: [$]C.m^{-3}[/$]
densité surfacique de charge [$]\sigma[/$] homogène à une charge divisée par une surface
unité: [$]C.m^{-2}[/$]
densité linéique de charge [$]\lambda[/$] homogène à une charge divisée par une longueur
unité: [$]C.m^{-1}[/$]
--------------------
Q: (INC)
Quelle est la charge d'un volume élémentaire dV? d'une surface élémentaire dS? d'une longueur élémentaire dl?
R: La charge d'un volume élémentaire est [latex]$dq = \rho.dV$[/latex].
La charge d'une surface élémentaire est [latex]$dq = \sigma.dS$[/latex].
La charge d'une longueur élémentaire est [latex]$dq = \lambda.dl$[/latex].
--------------------
Q: (INC)
Quelle condition est nécessaire pour qu'une distribution de charges soit invariante par rotation autour d'un axe Δ ?
R: Il faut que pour tout point M appartenant à cette distribution, sa densité de charge vérifie ρ(M′) = ρ(M) (cas volumique) avec M′ l'image de M par rotation d'un angle quelconque autour de Δ.
--------------------
Q: (INC)
Quelle condition est nécessaire pour qu'une distribution de charges illimitée dans la direction d'un axe Δ soit invariante par translation suivant Δ ?
R: Il faut que pour tout point M appartenant à cette distribution et son translaté M', sa densité de charge vérifie : ρ(M') = ρ(M) (cas volumique)
--------------------
Q: (INC)
Quel choix de coordonnées est adapté à une invariance par translation ? Puis par rotation ?
R: • Invariances par translation → coordonnées cartésiennes ou cylindriques.
• Invariances par rotation → coordonnées cylindriques ou sphériques.
--------------------
Q: (INC)
Que dire du champ électrostatique en un point P' symétrique de P par rapport à un plan d’antisymétrie
d’une distribution de charges ? (n’appartenant pas forcément à cette distribution de charges)
R: Le champ électrostatique en P' est l’opposé du symétrique de celui en P par rapport au
plan d’antisymétrie de la distribution de charges.
--------------------
Q: (INC)
Que dire du champ électrostatique en P', point symétrique de P par rapport à un plan de symétrie
d’une distribution de charges ?
R: Le champ électrostatique en P' est le symétrique de celui en P par rapport au plan de symétrie de la distribution de charge.
--------------------
Q: (INC)
Que dire du champ électrostatique d'un point M d'un plan de symétrie d’une distribution de charges ?
R: Le champ électrostatique créé en un point M d’un plan de symétrie d’une distribution de charges appartient à ce plan.
--------------------
Q: (INC)
Que dire d'un champ [$]\vec{E}[/$] créé par une distribution volumique de charge ?  (Domaine de définition et continuité?)
R: Le champ [$]\vec{E}[/$] créé par une distribution volumique de charge est défini et continu en tout point de l’espace.
--------------------
Q: (INC)
Que dire d'un champ [$]\vec{E}[/$] créé par une distribution surfacique de charge ?  (Domaine de définition et continuité?)
R: Le champ [$]\vec{E}[/$] créé par une distribution surfacique de charge est défini et continu en tout point de l’espace, sauf au niveau des points de la distribution. Il est donc discontinu à la traversée de la surface chargée.
--------------------
Q: (INC)
Que dire d'un champ [$]\vec{E}[/$] créé par un ensemble de charges ponctuelles ? (Domaine de définition et continuité?)
R: Le champ [$]\vec{E}[/$] créé par un ensemble de charges ponctuelles est défini et continu en tout point de
l’espace, sauf sur les charges.
--------------------
Q: (INC)
Qu'est-ce qu'un plan de symétrie d'une distribution de charges ?
R: Un plan de symétrie d'une distribution de charges est un plan tel que la distribution de charges obtenue en déplaçant les charges selon une symétrie par rapport à ce plan est identique à la
distribution initiale.
--------------------
Q: (INC)
Qu'est-ce qu'un plan d'antisymétrie d'une distribution de charges ?
R: On appelle plan d’antisymétrie d'une distribution de charges un plan tel que la distribution de charges obtenue en déplaçant les charges selon une symétrie par rapport à ce plan est opposée (changement de signe) à la distribution initiale.
--------------------
Q: (INC)
Donner la loi de Coulomb qui s'exerce entre deux charges ponctuelles q1 et q2 séparées d'une distance r.
R: \(\vec{F}_{2 \rightarrow 1} = - \vec{F}_{1 \rightarrow 2} = \frac{1}{4 \pi \epsilon _0} \frac{q_1 q_2}{r^2} \vec{u}_{2 \rightarrow 1}\)
--------------------
Q: (INC)
Comment est décrite la répartition de la charge d'une distribution volumique/ surfacique/ linéique de charges ?
R: [latex]Elle est décrite par une fonction scalaire appelée densité volumique/ surfacique/ linéique de charge  $\rho$/ $\sigma$/$\lambda$, qui dépend des coordonnées (x', y', z') des points de la distribution de charges.[/latex]
--------------------
Q: (INC)
Comment calcule-t-on le champ électrique total en un point en utilisant le principe de superposition ?
R: Le champ électrique total en un point est calculé en faisant la somme vectorielle des champs électriques créés par chaque charge prise individuellement.
--------------------
Q: (INC)
Comment calcule-t-on la force totale exercée sur une charge de la part d'un ensemble de charges ponctuelles?
R: On utilise le théorème de superposition en sommant la contribution de chaque charge ponctuelle prise séparément.
--------------------
Q: (INC)\(\text{Donner le champ électrostatique crée en un point P par une charge ponctuelle q située en S}\)
R: \(\vec{E} (P) = \frac{q}{4 \pi \epsilon _0} \frac{\vec{u}_r}{r^2} = \frac{q}{4 \pi \epsilon _0}  \frac{\vec{SP}}{SP^3}\)
--------------------
Q: (INC)
\(\text{Donner la direction de } \vec{E} \text{ dans le cas où } q >0 \)
R: \(\text{le champ } \vec{E} \text{ créé par une charge ponctuelle positive part de la charge. Il diverge à partir de la charge}\)
>>> [IMAGE_ID: paste-c1726407b90adfa409f559a158eb8b1a740d476c.jpg] <<<
--------------------
Q: (INC)
\(\text{Donner la direction de } \vec{E} \text{ dans le cas où } q <0 \)
R: \(\text{Le champ } \vec{E} \text{ créé par une charge ponctuelle négative se dirige vers la charge. Il converge vers la charge}\)
>>> [IMAGE_ID: paste-001a83783b8dd4b04bb9bb0d44ca862c9303f523.jpg] <<<
--------------------
Q: (INC)\(\text{Deux charges } q_1, q_2 \text{ qui sont de signe différent intéragissent entre elles. Est-ce-qu'elles se repoussent ou est-ce-qu'elles s'attirent ? Pourquoi ? }\)
R: \(\text{Elles s'attirent. En effet, } q_1 q_2 < 0, \text{ donc la force d'intéraction électrostatique est attractive.}\)
--------------------
Q: (INC)\(\text{Deux charges } q_1, q_2 \text{ qui sont de même signe intéragissent entre elles. Est-ce-qu'elles se repoussent ou est-ce-qu'elles s'attirent ? Pourquoi ? }\)
R: \(\text{Elles se repoussent. En effet, } q_1 q_2 > 0, \text{ donc la force d'intéraction électrostatique est répulsive.}\)
--------------------
Q: (INC)\(\text{Comment s'appelle la constante } \epsilon _0 \text{ dans la loi de Coulomb ?}\)
R: C'est la permittivité du vide
--------------------
Q: (INC) Quand peut-on considérer une distribution de charges comme surfacique ?
R: Une distribution de charges peut être considérée comme surfacique lorsque l'une de ses dimensions spatiales est beaucoup plus petite que les deux autres dimensions.
--------------------
Q: (INC) Quand peut-on considérer une distribution de charges comme linéique ?
R: Une distribution de charges peut être considérée comme linéique lorsque deux de ses dimensions spatiales sont beaucoup plus petites que la troisième dimension.
--------------------
Q: >>> [IMAGE_ID: paste-de3005b71b3b26e6cbfb7bc7e487288057e44965.jpg] <<<
R: >>> [IMAGE_ID: paste-4e5b864acd14971b75ee4cfa20de066c86177c58.jpg] <<<
--------------------
Q: >>> [IMAGE_ID: paste-036e005e8785d46a0d662e7e88fa5533bfe23c98.jpg] <<<
R: >>> [IMAGE_ID: paste-75d5efd4f249c0e30de16f6754802351a3a09811.jpg] <<<
--------------------

==================================================
DECK : EM2
==================================================

Q: (A.R) Quelle est la définition de la circulation du champ électrostatique \(\vec E\) de \(A\) à \(B\) le long de \((\Gamma)\) ?
Dépend-elle du chemin suivi \((\Gamma)\) pour aller de A à B?
R: \[C_{A \to B(\Gamma)}=\int_{A(\Gamma)}^{B}{\vec E \ldotp \vec{dl} }\]Cette circulation est indépendante du chemin suivi car elle peut s'écrire sous la forme de la variation d'une fonction qui est le potentiel électrostatique:
\(C_{A \to B}=\int_{A}^{B}{\vec E \ldotp \vec{dl} }=-(V_B-V_A)\)
--------------------
Q: (A.R) Que vaut la circulation du champ électrostatique le long d'un contour fermé? Justifier.
R: La circulation du champ électrostatique entre le point \(A\) et \(B\) est indépendante du chemin parcouru.
Si le chemin est fermé: B et A sont confonds donc \(V_A=V_B\) et donc la circulation du champ est nulle\[C_{A \to B=A} = \oint \vec E \ldotp \vec{dl} =-(V_B -V_A )=-(V_A -V_A)= 0\]
--------------------
Q: (A.R) Quelle est la formule donnant le potentiel électrostatique créé en un point \(P\) par une charge source \(q\) ?
R: Potentiel électrostatique : 
\[V(P) = {{1}\over{4\pi \varepsilon_0}}{q \over r} + K\]\(r\) : distance du point \(P\) par rapport à la charge source
\(q\) : charge source
K: une constante
--------------------
Q: (A.R) Quelle est la forme des surfaces équipotentielles d'une charge ponctuelle.
R: Ce sont des sphères dont le centre est la position de la charge ponctuelle.
--------------------
Q: (A.R) Comment évolue le potentiel électrostatique à mesure que l'on s'éloigne d'une charge ponctuelle ? Comment oriente-t-on les flèches du champ électrostatique sur un schéma ?
R: Selon le signe de \(q\):
- Si \(q > 0\) le potentiel décroît lorsque l'on s'éloigne de la charge
- Si \(q < 0\) le potentiel croît lorsque l'on s'éloigne de la charge
Le champ électrostatique est orienté dans le sens des potentiels décroissants. 
Mnémotechnique : \(q > 0 \text{ devient } q \rightarrow 0 \)  et \(q < 0 \text{ devient } q \leftarrow 0 \)
--------------------
Q: (A.R) Quelle formule donne le potentiel électrostatique créé par plusieurs charges ponctuelles en un point \(P\) ?
R: \[V(P) = {1 \over {4 \pi \varepsilon_0}}\sum_i {q_i \over r_i}\]
\(q_i\) : charge en Coulomb (C) portée par la \(i\)-ème charge
\(r_i\) : distance entre la \(i\)-ème charge et le point \(P\)
On a choisi \(V=0\) quand \(\forall i \; r_i\rightarrow \infty\)
--------------------
Q: (L.L) Dans le repère orthonormé \((0, \vec{\mathbf{u}}_x, \vec{\mathbf{u}}_y, \vec{\mathbf{u}}_z)\), donnez \({d} f\) puis \(\vec{grad}f\) et enfin la relation entre les deux.
R: df = \(\left(\frac{\partial f}{\partial x}\right)dx + \left(\frac{\partial f}{\partial y}\right)dy + \left(\frac{\partial f}{\partial z}\right)dz\)
\(\vec{grad}f=\left(\frac{\partial f}{\partial x}\right)\vec{u}_x + \left(\frac{\partial f}{\partial y}\right)\vec{u}_y + \left(\frac{\partial f}{\partial z}\right)\vec{u}_z\) 
\(df=\vec{grad}f.\vec{dl}\)
--------------------
Q: (L.L) \(\vec{grad}f\) est normal à quelle surface ?
R: \(\vec{grad}f\) est normal à la surface d'équation f(x,y,z) = cst
--------------------
Q: (L.L) Quelle est la relation intégrale liant le champ électrostatique et le potentiel électrostatique?
R: \(C_{A \to B}=\int_{A}^{B} \vec{E} \cdot d\vec{l}=- \int_{A}^{B} dV=(V_A -V_B)\)
--------------------
Q: (L.L) Quelle est la relation locale liant le champ électrostatique et le potentiel électrostatique?
R: \(\vec{E} = -\vec{grad} V\)
--------------------
Q: (L.L) Comment retrouver la relation locale 
\(\vec{E} = -\vec{grad} V\) à l'aide de la relation intégrale associée ?
R: On a \(\int_{A}^{B} \vec{E} \cdot d\vec{l}\) = - (\(V_B - V_A\)) or \(V_B - V_A\) = \(\int_{A}^{B} dV\) donc \(\vec{E} \cdot d\vec{l} = -dV\)
enfin \(dV = \vec{grad}V \cdot \vec{dl}\) donc \(\vec{E}.\vec{dl} = -\vec{grad}V.\vec{dl}\) ainsi \(\vec{E} = -\vec{grad} V\)
--------------------
Q: (C.J) L'énergie potentielle électrostatique Ep d'une charge q0 placée dans un champ extérieur \(\vec E\) tel que \(\vec E\)= \(- \vec{ grad} V\) vérifie la relation :
R: \(E_p = q_0V\)
--------------------
Q: (C.J) Comment passer de la relation \(\vec{E} = -\vec {grad} V\) à la relation\(\vec{F} = -\vec {grad} E_p\)
R: En multipliant par \(q_0\) car 
\(\vec{F} = q_0 \vec{E}\) et \(E_p=q_0 V\)
--------------------
Q: (C.J) Quelle est l'unité du potentiel électrostatique ?
R: Le volt (V)
--------------------
Q: (C.J) Quelle est l'unité du champ \(\vec E\)
R: C'est \(V\ldotp m^{-1}\)
--------------------
Q: (C.J) Dans quel sens sont orientées les lignes du champ électrostatique ?
R: Dans le sens des potentiels décroissants
--------------------
Q: (C.J) Comment sont orientés les lignes du champ électrostatique par rapport aux surfaces équipotentielles ?
R: Orthogonalement
--------------------

==================================================
DECK : EM6
==================================================

Q: V.Iulian
>>> [IMAGE_ID: img7045909058837530815.jpg] <<<
R: >>> [IMAGE_ID: paste-b98860cd7c1b407c918bcc5209c0a68b396e8223.jpg] >> [IMAGE_ID: paste-e349a260a12b99bdc732b3868f7f557cb6dda0ea.jpg] <<<
--------------------
Q: V.Iulian 
>>> [IMAGE_ID: img2498669175369567868.jpg] <<<
R: 1)
>>> [IMAGE_ID: paste-ee06f45381f644b5348501214aa8bf553c0ae70b.jpg] >> [IMAGE_ID: paste-911334ecc07bc5a2c3f229921025f3087e0a090f.jpg] >> [IMAGE_ID: paste-41ed89d5aace0dfa0fd4142e6295a2fc8c00ca46.jpg] <<<
Et pour les symétries :
Le plan parallèle aux spires et équidistant des deux est un plan d’antisymétrie. Les lignes de champ sont symé-triques de part et d’autre de ce plan et en un point de ce plan lui appartiennent.
--------------------
Q: (A.P) 
>>> [IMAGE_ID: 20231127_205031.jpg] <<<
R: 1) Les lignes du champ B sont des cercles concentriques contenus dans le plan orthogonal au fil.
>>> [IMAGE_ID: paste-929588aa3d6f7ca46e3907765deffbcc31ebe543.jpg] >> [IMAGE_ID: paste-8c5f8f95d90ce3a0ee2536285b9588e66db63e68.jpg] <<<
--------------------
Q: (M.W) Commenter les symétries dans le cas d'une distribution de courant.
R: C'est à dire que pour un plan de symétrie d'une distribution de courant, ce même plan sera un plan d'antisymétrie pour le champ magnétique.
csq: Soit M et M' deux points symétriques l'un de l'autre par rapport à un plan de symétrie de la distribution de courant. ALors le champ 
\(\vec B(M')\) est l'opposé du symétrique du champ 
\(\vec B(M)\). csq: en un point M de ce plan de symétrie de la distribution de courant, le champ \(\vec B(M)\)sera normal au plan.
De même un plan d'antisymétrie d'une distribution de courant sera un plan de symétrie pour le champ magnétique.
csq: Soit M et M' deux points symétriques l'un de l'autre par rapport à un plan d'anti symatrie de la distribution de courant. ALors le champ
\(\vec B(M')\) est le symétrique du champ\(\vec B(M)\). csq: en un point M de ce plan d'anti symétrie de la distribution de courant, le champ \(\vec B(M)\)sera contenu dans le plan.
--------------------
Q: (M.W) Interpréter le cas où les lignes d'un champ magnétique se resserrent.
R: Là où les lignes de champs se resserrent, le champ magnétique est plus intense.
--------------------
Q: (BM) Soit \(\Gamma\) une courbe fermée et orientée (choix arbitraire) et \(\vec{dl}\) un vecteur déplacement élémentaire le long de \(\Gamma \)(orienté dans le même sens).
Donner l'expression de la circulation du champ \(\vec{B}\) le long du contour \(\Gamma\) fermé.
R: C = \(\oint_{\Gamma}\vec{B}.\vec{dl}\)
--------------------
Q: (BM) Donner l'énoncé du théorème d'Ampère.
R: La circulation du champ \(\vec{B}\) le long d'un contour fermé orienté \(\Gamma\) (contour d'Ampère) est égale au produit de \(\mu_{0}\) par l'intensité \(I_{e}\) enlacée, intensité qui traverse une surface S orientée s'appuyant sur \(\Gamma\):\(C = \oint_{\Gamma}\vec{B}.\vec{dl} = \mu_{0}I_{e}\)
--------------------
Q: (BM) Quelle est l'expression de l'intensité enlacée (du théorème d'ampère) pour une distribution volumique de courant (préciser les orientations).
R: \(I_{e} = \int\int_{S}\vec{j}.\vec{dS}\) avec S une surface reposant sur 
\(\Gamma\) et \(\vec{dS}\) orienté suivant l'orientation de \(\Gamma\) (règle du tire bouchon ou de la main droite).
--------------------
Q: (BM) Quelle est l'expression de I enlacée (du théorème d'ampère) dans le cas de courants filiformes.
R: \(I_e =\sum_{k}\epsilon_{k}I_{k}\) 
avec:
\(I_k\) les intensités des courants qui traversent \(\Gamma\)
\(\epsilon_{k} = 1 \) si \(I_{k}\) dans le sens de \(\vec{n}\) (vecteur unitaire orienté à partir de \(\Gamma\)) sinon \(\epsilon_{k} = -1\)
--------------------
Q: (BM) Enoncer les différentes étapes de la méthode de calcul de \(\vec{B}(M)\) par le théorème d'Ampère.
R: 1) Etude des symétires et invariances de \(\vec{B}(M)\) : Choix du système de coordonnées
2) Choix contour d'Ampère (ligne fermé \(\Gamma\)) tel que:
          a) \(\vec{B}   // \vec{dl}\) (ie ligne de champ)
          b) \(||\vec B ||\) constant le long du contour
3) Si la ligne n'est pas fermée alors la compléter par des portions de lignes telles que \(\vec{B}   \perp  \vec{dl}\) ou telles que \(\vec B=\vec 0\)
4) Rerpésenter \(\Gamma\) et l'orienter sur le schéma.
5) Calcul de \(\oint\vec{B} \cdot\vec{dl}\) le long de \(\Gamma\).
6) Calcul de \(\mu_{0}I_{e}\) (potentiellement plusieurs cas à traiter)
7) Appliquer le théorème d'Ampère.
--------------------
Q: (BM) Que vaut la valeur du flux du champ magnétique à travers une surface fermée ?
R: Il est nul. (ce résultat est admis)
Soit C = \(\Phi = \unicode{x222F}_{\mathscr{S}_g} \vec{B } \cdot  \vec{dS}  =0\)
On dit que le champ\( \vec{B } \) est à flux conservatif car cela implique que le flux du champ \( \vec{B } \) est le même à travers n'importe quelle section d'un tube de champ \( \vec{B } \) .
--------------------
Q: (BM) Donner l'ordre de grandeur du champ magnétique terrestre à la surface de la Terre.
R: \(5.10^{-5}T\)
--------------------
Q: (BM) Donner l'ordre de grandeur du champ à 1cm d’un fil rectiligne parcouru par un courant d’intensité 10A
R: \(2.10^{-4} T\)
--------------------
Q: (BM) Donner l'ordre de grandeur du champ à 1mm d’un aimant permanent au néodyme
R: 0,1 à 1 T
--------------------
Q: (BM) Donner l'ordre de grandeur du champ magnétique d'un élécrtoaimant.
R: 10 à 100 T
--------------------
Q: (S.E)
>>> [IMAGE_ID: paste-214e83666ae763236aea7c77a43581a64232fe68.jpg] <<<
On supposera le fil infini.
R: >>> [IMAGE_ID: paste-7edb2b9f50f23eac4176399c3ea5d9a799a4afd8.jpg] <<<
--------------------
Q: (S.E) 
>>> [IMAGE_ID: paste-fa84d71882fccd01306a9563169c424e60dbdf56.jpg] <<<
R: >>> [IMAGE_ID: paste-ed68266b1711dc9559d0ae00bb0133c98c544ddd.jpg] <<<
--------------------

==================================================
DECK : EM8
==================================================

Q: (M.B.T.) Exprimer la formule du moment magnétique d'un circuit filiforme plan bouclé et parcouru par un courant d'intensité \(I\) en expliquant les termes. Donner l'unité du moment magnétique.
R: Soit un circuit filiforme plan bouclé parcouru par un courant d'intensité \(I\).
Le moment magnétique \(\vec{\mathcal{M}}\) du courant est défini par:
\[\vec{\mathcal{M}} = I\vec{S} = IS\vec{n}\]
où :
•    \(S\) désigne l'aire de la surface délimitée par la boucle de courant
•    \(\vec{n}\) désigne le vecteur unitaire orthogonal au plan contenant le circuit et orienté suivant la règle de la main droite.
>>> [IMAGE_ID: IMG_825B15755F55-1.jpeg] <<<
Le moment s'exprime en \(A\cdot m^2\)
--------------------
Q: (M.B.T) Dans quelles conditions peut-on parler d'un dipôle magnétique pour une source de champ magnétique?
R: Une source de champ magnétique constitue un dipôle magnétique si :
- elle peut être modélisée par une boucle de courant de moment magnétique non nul \(\vec{\mathcal{M}}\)
- son extension spatiale de taille caracteristique \(a\) est très petite devant les autres dimensions caractéristiques (approximation dipolaire : \(OM \gg a \))
--------------------
Q: (A.R.) Représenter les lignes de champs d'un dipôle magnétique sur un schéma dans le plan.
R: >>> [IMAGE_ID: cartechamps-1.png] <<<
--------------------
Q: (A.R) Décrire qualitativement l'action d'un champ magnétique extérieur (uniforme / non uniforme) sur un dipôle magnétique.
R: Cas champ magnétique uniforme: le dipôle magnétique s'oriente selon les lignes de champ du champ magnétique extérieur.
Cas champ magnétique extérieur non unforme: idem et en plus le dipôle est attiré vers les zones de champ magnétique extérieur intense.
--------------------
Q: Quelle est l'expression de l'énergie potentielle d'un dipôle de moment magnétique \(\overrightarrow{m}\) situé en O et placé dans un champ mégnétique extérieur \(\overrightarrow {B_{ext}}(O)\)?
R: \(E_p=-\overrightarrow{m} . \overrightarrow{B_{ext}} (O)\)
--------------------
Q: Si d'un point de vue magnétique on assimile la Terre à un dipôle magnétique situé en son centre, quel est alors l'orientation de son moment magnétique? Quelle est l'orientation des lignes de champ magnétique terrestre au niveau des pôles?
R: \(\overrightarrow{m}\) est dirigé du nord géographique vers le sud géographique.
Les lignes de champ magnétique terrestre "sortent" du pôle sud et "entrent" au pôle nord.
--------------------

==================================================
DECK : EM9
==================================================

Q: Ylan / Qu'est-ce qu'un doublet de charges ?
R: Un doublet de charges est composé de deux charges opposées \(+q >0\) au point P et \(-q\) au point N séparées d'une distance \(a = PN\).
Il est caractérisé par son moment dipolaire: \(\overrightarrow {p}=q\overrightarrow {NP}\)
--------------------
Q: Ylan / Définition du moment dipolaire et unité ?
R: \(\text{Le moment dipolaire est } \vec{p} = q\vec{NP} \) 
Avec N (resp. P) le barycentre des charges négatives (resp. Positives) et q la somme des charges positives de la distribution.\(\text{Ce vecteur est dirigé de la charge négative vers la positive et son unité est le C.m ou le Debye symbole D}\)
--------------------
Q: Ylan / Cadre de l'approximation dipolaire ?
R: >>> [IMAGE_ID: Capture d] <<<
L'approximation dipolaire correspond à étudier les propriétés du dipôle électrostatique "loin" de ce dernier (r=OM >> a avec a=NP).
--------------------
Q: Victor \ Energie potentielle \(E_{p}\) d'un dipôle électirique rigide de moment dipolaire \(\vec{p}\) situé au point O et placé dans un champ extérieur \(\overrightarrow{E_{ext}}(O)\)?
R: \({E_{p}} = -\vec{p} .\vec{E}_{ext}(O) \)
--------------------
Q: Ylan / Le potentiel décroît-t-il plus vite ou moins vite avec un dipôle ou avec une unique charge ponctuelle ? Même question avec le champ électrostatique
R: Dans les deux cas, il décroît plus vite avec un dipôle car l'expression du potentiel V(M) varie en \(1/r²\) pour un dipôle alors qu'il varie en \(1/r\) pour une charge ponctuelle et pour le champ, E(M) varie en \(1/r^3\)pour un dipôle alors qu'il varie en \(1/r²\) pour une charge ponctuelle
--------------------
Q: Ylan / Retrouver l'expression du potentiel créé par un dipôle électrostatique dans le cas d'un doublet de charges ?
R: On commence par exprimer le potentiel en M en appliquant le théorème de superposition \(V(M)=V_P (M) + V_N (M)=\frac{q}{4\pi \epsilon_0}(\frac{1}{PM} - \frac{1}{NM})\) (somme des potentiels créés par 2 charges ponctuelles)
Puis on utilise la relation de Chasles pour exprimer \(\overrightarrow{PM}=\overrightarrow{PO}+\overrightarrow{OM}\) et \(\overrightarrow{NM}=\overrightarrow{NO}+\overrightarrow{OM}\) et en déduire les distances PM et NM:
De même \(NM =\sqrt{(a/2)^2+r^2+a\ r\ cos(\theta)}\)
Et on finit par effectuer un DL à l'ordre 1 en \(a/r\) pour exprimer \(PM^{-1}\) et \(NM^{-1}\) avec a=NP:
\(\frac{1}{PM}=\frac{1}{r} (1+\frac{a}{2r} cos(\theta))\)
De même:  \(\frac{1}{NM}=\frac{1}{r} (1-\frac{a}{2r} cos(\theta))\)
On injecte les expression de PM et NP dans V(M):
\(V(M)=\frac{q}{4\pi \epsilon_0 r^2} cos(\theta)=\frac{p\ cos\theta }{4\pi\epsilon_0r^2}\)
Autre notation: \(V(M)=\frac{\overrightarrow{p}.\overrightarrow{OM}}{4\pi\epsilon_0 OM^3}\)
(car \(\overrightarrow{p}=p\cos\theta  \overrightarrow{u_r}-p\sin\theta  \overrightarrow{u_\theta } \) et \(\overrightarrow{OM}=r \overrightarrow{u_r}\))
>>> [IMAGE_ID: Capture d] <<<
--------------------
Q: Victor \ Qu'est-ce qu'un dipôle électrostatique rigide ?
R: La norme de son moment dipolaire est constante.
--------------------
Q: Victor Que vaut la résultante des forces subies par un dipôle dans un champ électrostatique extérieur \(\vec{E}_{ext}\) uniforme ?
R: La résultante des forces est nulle. Il s'agit d'un couple de forces.
--------------------
Q: Ylan / Etablir le champ électrostatique créé par un dipôle électrostatique dans le cas d'un doublet de charges sachant que le potentiel créé par ce doublet de charge en est:
\(V(M)=\frac{p\ cos\theta }{4\pi\epsilon_0r^2}=\frac{\overrightarrow{p}.\overrightarrow{OM}}{4\pi\epsilon_0 OM^3}\)
Donnée: en coordonnées sphériques:
\(\overrightarrow{grad} f= \frac{\partial {f}}{\partial r} \overrightarrow{u_r}+\frac{1}{r}\frac{\partial {f}}{\partial \theta} \overrightarrow{u_\theta}+\frac{1}{r sin\theta}\frac{\partial {f}}{\partial \varphi } \overrightarrow{u_\varphi}\)
R: Utiliser la relation locale \(\vec{E}=-\vec{grad}(V)\)
\(\overrightarrow{E}=- \frac{\partial {V}}{\partial r} \overrightarrow{u_r}-\frac{1}{r}\frac{\partial {V}}{\partial \theta} \overrightarrow{u_\theta}=\frac{p}{4\pi\epsilon_0r^3} (2 cos\theta \ \overrightarrow{u_r}+sin\theta \ \overrightarrow{u_\theta})\)
Autre notation: 
\(\overrightarrow{E}=\frac{1}{4\pi\epsilon_0OM^5} (3\ (\overrightarrow{p}.\overrightarrow{OM})\ \overrightarrow{OM} - OM^2  \ \overrightarrow{p} \  \ )\)
(car \(\overrightarrow{p}=p\cos\theta  \overrightarrow{u_r}-p\sin\theta  \overrightarrow{u_\theta } \) et \(\overrightarrow{OM}=r \overrightarrow{u_r}\))
>>> [IMAGE_ID: Capture d] <<<
--------------------
Q: Victor \
Comment agit un champ électrostatique extérieur uniforme sur un dipôle électrostatique?
R: Le dipôle s'oriente (direction et sens) suivant les lignes de champ de \(\vec{E}_{ext}\) .
--------------------
Q: Ylan / Représenter les lignes de champ et les courbes équipotentielles du champ créé par un dipôle électrostatique
R: >>> [IMAGE_ID: paste-f94a6b6040693dd84af9aa136b7c19529ad0bf87.jpg] Courbes non orientées : équipotentielles
Courbes orientées : ligne de champ
--------------------
Q: (Yuye) A quoi correspond un moment dipôlaire moléculaire ?
R: Les molécules, bien que globalement neutres, peuvent présenter un moment dipolaire non nul. En effet, la disposition spatiale des atomes et leur différence de propriétés (électronégativité) peuvent les rendre dissymétriques. Le barycentre des charges positives et celui des charges négatives peuvent ne pas être confondus. Dans ce cas, la molécule présente un moment dipolaire permanent.
>>> [IMAGE_ID: 0.png] <<<
--------------------
Q: Victor \
Comment agit un champ électrostatique non uniforme sur un dipôle électrostatique?
R: Effet d'orientation: Le dipôle s'oriente (direction et sens) suivant les lignes de champ de \(\vec{E}_{ext}\) .
Effet de déplacement: Le dipôle est attiré vers les zones de champ \(\vec{E}_{ext}\) intense.
--------------------
Q: (Yuye) Quelle est l'expression de la force exercée par un ion \(Na^+\) sur le dipôle que constitue une molécule d'eau placée en M à une distance z de l'ion.
Donnée: Résultante des forces subit par un dipôle placé dans un champ extérieur: \(\overrightarrow{F}=\overrightarrow{grad} (\vec{p}.\overrightarrow{E_{ext}})(O)\)
R: Le champ électrostatique créé par l’ion \(Na^+\) au point M où se situe le dipôle est \(\vec E_{ext}(M) = \frac {e} {4 \pi \epsilon_0 z^2} \vec u_z\).
Effet d’orientation→Le dipôle s’oriente suivant \(\vec u_z\) (\(\vec p = p \vec u_z\))
Le dipôle subit la force \(\vec F = p \frac {dE_{ext}}{dz}(z)\vec u_z = - \frac {2pe}{4 \pi \epsilon_0 z^3 } \vec u_z\), orientée dans le sens des intensités croissantes du champ électrostatique. 
La molécule d’eau est attirée par l’ion → Effet de déplacement
>>> [IMAGE_ID: 0-067d29de6397b7932ac10e579ca73727b1f13e21.png] <<<
--------------------
Q: (Yuye) Qu'est-ce le dipôle induit?
R: En présence d'un champ électrique extérieur il s'exerce des forces de sens contraire sur les charges + et − d'un atome ou d'une molécule. Il apparaît une séparation des barycentres des charges > 0 et < 0.
L'atome ou la molécule sont alors dits polarisables et nous avons un moment dipolaire "induit" par la présence du champ électrique.
--------------------
Q: Etablir l'expression du moment résultant du couple de force subi par un doublet de charges dans un champ électrostatique extérieur \(\overrightarrow{E_{ext}}\) uniforme ?
R: \(\overrightarrow{\Gamma}=\overrightarrow {M}_O(\overrightarrow{F_P})+\overrightarrow {M}_O(\overrightarrow{F_N})\)
\(\overrightarrow{\Gamma}=\overrightarrow {OP}\wedge(q \ \overrightarrow{ E_{ext}})+\overrightarrow {ON}\wedge(-q \ \overrightarrow{ E_{ext}})\)
\(\overrightarrow{\Gamma}=q (\overrightarrow {OP}-\overrightarrow {ON})\wedge \overrightarrow{ E_{ext}}\)
\(\overrightarrow{\Gamma}=q \ \overrightarrow {NP}\wedge\overrightarrow{ E_{ext}}\)
\(\overrightarrow{\Gamma}=\overrightarrow {p}\wedge \overrightarrow{ E_{ext}}\)
--------------------

==================================================
DECK : EM10
==================================================

Q: (Daouda Cisse) Quelle est la forme générale des équations de Maxwell ?
R: >>> [IMAGE_ID: e1.PNG] <<<
--------------------
Q: (Daouda Cisse) Rappelez l'expression, dans le cas général, de l'équation de conservation de la charge?
R: >>> [IMAGE_ID: e2.PNG] <<<
--------------------
Q: (Daouda Cisse) Démontrez, dans le cas unidimensionnel, l'équation de conservation de la charge
>>> [IMAGE_ID: e3.PNG] <<<
R: >>> [IMAGE_ID: e4.PNG] >> [IMAGE_ID: e5.PNG] >> [IMAGE_ID: e6.PNG] <<<
--------------------
Q: (Oceane Arabi) Quelle est la relation entre la permittivité diélectrique du vide, la perméabilité magnétique du vide et la vitesse de la lumière ?
R: >>> [IMAGE_ID: e7.PNG] <<<
--------------------
Q: (Daouda Cisse) Quelle est la forme intégrale de l'équation de Maxwell-Gauss ?
R: Il s'agit du théorème de Gauss
\(\Phi_{E}=\unicode{x222F}_{\mathscr{S}_g} \vec{E}(M)d\vec{S}_M=\frac{Q_{int}}{\varepsilon_0}\)
--------------------
Q: (Marion Vincent) Quelle est la relation intégrale associée à la relation de Maxwell - flux
R: Il s'agit de la propriété selon laquelle le champ magnétique a un flux nul à travers toute surface fermée (flux conservatif)
>>> [IMAGE_ID: e9.PNG] <<<
Soit \(\unicode{x222F}_{\mathscr{S}} \vec{B}(M)d\vec{S}_M=0\)
--------------------
Q: (Marion Vincent) Quelle est la relation intégrale de l'équation de Maxwell - Faraday ?
R: Il s'agit de la loi de Faraday ( de l'induction )
\( \oint_{\Gamma} \vec{E}.\overrightarrow{dl}=- \frac{d\Phi_B}{dt} \)
Avec
\(\Phi _B =\int\int_{S}  \vec{B}(M)d\vec{S}_M\)
Avec \(S\) une surface qui repose sur \(\Gamma\).
--------------------
Q: (Oceane Arabi) Quelle est la relation intégrale de l'équation de Maxwell - Ampere ?
R: Il s'agit de la circulation du champ magnétique le long d'un contour fermé orienté. C'est le théorème d'Ampère généralisé: \(\oint_{\Gamma} \overrightarrow{B} . \overrightarrow{dl}=µ_0 I_{enlacé}+\epsilon_0 µ_0 \int\int_{\mathscr{S_{\Gamma}}} \frac{\partial  \vec {E}}{\partial t}.\vec{dS}\) avec \(\mathscr{S_{\Gamma}}\) une surface qui repose sur le contour fermé \(\Gamma\).
--------------------
Q: (Oceane Arabi) Dans une région vide de charge et de courant, que deviennent les équations de Maxwell ?
R: >>> [IMAGE_ID: e12.PNG] <<<
--------------------
Q: (Marion Vincent) Dans le cas du régime stationnaire, que deviennent les équations de Maxwell?
R: >>> [IMAGE_ID: e13.PNG] <<<
--------------------
Q: (Daouda Cisse) Comment retrouve-t-on l'équation de d'Alembert , dans une région vide de charge et de courant?
R: >>> [IMAGE_ID: e14.PNG] <<<
\(\overrightarrow {rot}(\overrightarrow {rot}\overrightarrow {E})-\overrightarrow {grad}(div(\overrightarrow {E}))=-\Delta \overrightarrow {E}\)
Or, la divergence du champ électrique est nulle dans une région vide de charge donc, en égalisant on a : 
\(\Delta \overrightarrow {E}-\frac{1}{c^2 } \frac{\partial^2  \vec{E}}{\partial t^2 }=\vec 0\) avec \(\epsilon_0 µ_0 c^ 2 =1\)
--------------------
Q: (Oceane Arabi) Quelle est l'équation de Poisson (régime stationnaire) et comment la retrouve-t-on?
R: \(div \ \vec{E}= \frac{\rho}{\epsilon_0}\)
\(\vec{E}=- \overrightarrow{grad} \ V\)
\(div ({- \overrightarrow{grad} \ V})= \frac{\rho}{\epsilon_0}\)
Or \(div(\overrightarrow{grad}V)=\Delta V\)
Donc \(-\Delta V=\frac{\rho}{\epsilon_0}\)
Soit 
>>> [IMAGE_ID: e18.PNG] <<<
 (Equation de Poisson de l'electrostatique)
--------------------
Q: (Vincent Marion) Que devient l'équation de Poisson dans une zone vide de charge (en régime stationnaire) ?
R: >>> [IMAGE_ID: e19.PNG] <<<
 équation de Laplace
--------------------
Q: Qu'est-ce que le vecteur densité volumique de courant de déplacement? Le courant de déplacement.
R: >>> [IMAGE_ID: paste-7efdc90615fbdb5476fdd210e9e5635b9591785b.jpg] <<<
--------------------
Q: 1. Comment s'écrit la loi de conservation de la charge en régime stationnaire?
2. Quelle est la relation intégrale associée? Quelle loi d'électrocinétique traduit-elle?
R: 1. \(div(\vec{j})=0\)
2. \(\unicode{x222F}_{\mathscr{S}} \vec{j}(M)d\vec{S}_M=0\) . Loi des noeuds.
--------------------

==================================================
DECK : EM11
==================================================

Q: \(\textcolor{ORANGE}{(M.A)}\) Que deviennent \(\vec \nabla\) et \(\frac{\partial }{\partial t}\) lorsque \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(wt+\vec k.\vec r))\) et \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(-wt+\vec k.\vec r))\) ?
R: Pour \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(wt+\vec k.\vec r))\) , \(\vec \nabla = j.\vec k\) et \(\frac{\partial }{\partial t} \longleftrightarrow jw\)
Pour \(\vec  {\underline{E}}=\vec  {\underline{E_0}}exp(j(-wt+\vec k.\vec r))\), \(\vec \nabla = j.\vec k\) et \(\frac{\partial }{\partial t} \longleftrightarrow -jw\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Quelle est la solution générale de l'équation de d'Alembert unidimensionnelle (équation d'onde) : \(\frac{\partial ² E_x}{\partial x²}- \frac{1}{c²}\frac{\partial ² E_x}{\partial t²}=0\)
R: \(E_x(x,t)=f(x-ct)+g(x+ct)\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Que représentent les signaux f(x-vt) et g(x+vt)?
R: f(x-vt) représente un signal qui se propage, sans se déformer, à la vitesse v le long de l’axe \(O_x\) dans le sens des x croissants.
g(x+vt) représente un signal qui se propage, sans se déformer, à la vitesse v le long de l’axe \(O_x\) dans le sens des x décroissants.
--------------------
Q: M.W
On pose \(\vec{E}(x,t) = E_{0y}cos(\omega t-kx)\vec{e_y}+E_{0z}cos(\omega t-kx-\phi)\vec{e_z}\)
Quelle est la direction et le sens de propagation de cette onde ?
Les plans d'onde sont-ils bien orthogonaux à la direction de propagation de l'onde ?
Quelle est l'expression du vecteur d'onde \(\vec{k}\) ?
La composante de \(\vec{E}\) suivant \(\vec{e_x}\) est toujours nulle. Pourquoi ?
Déterminer l'expression du champ \(\vec{B}\) correspondant.
R: L'onde se propage sur l'axe (Ox) selon les x croissants.
Les plans d'onde (d'équation x=cste, plans parallèle au plan \((O,\overrightarrow{e_y},\overrightarrow{e_z}\)) ) sont bien orthogonaux à la direction de propagation de l'onde donnée par  \(+ \vec{e_x}\) .
\(\vec{k}=k \overrightarrow{e_x}=\frac{\omega}{c} \overrightarrow{e_x}\)
La composante selon \(\vec{e_x}\)est nulle car dans le vide le champ \(\vec{E}\) d'une OPP est transverse (orthogonal à la direction de propagation)
\(\vec{B} = \frac{\vec{k}\wedge\vec{E}}{w} = \frac{1}{c}(-E_z\vec{e_y} + E_y \vec{e_z})\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Que dire des champs \(\vec E\) et \(\vec B\) d'une OPP dans le vide?
R: Ils sont orthogonaux entre eux et orthogonaux à la direction de propagation de l'onde.
Ils vérifient la relation: \(\vec{B}=\frac{\vec{u} \wedge \vec{E}}{c}\) avec \(\vec{u}\) un vecteur unitaire de la direction de propagation de l'OPP.
--------------------
Q: \(\textcolor{orange}{(M.A)}\) Si on note \(\vec u\) un vecteur unitaire de la direction de propagation, quelle relation permet de déterminer le champ \(\vec B\) d'une OPP dans le vide connaissant le champ \(\vec E\)?
R: \(\vec B= \frac 1 c \vec u \wedge \vec E\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\) Qu'est ce qu'une onde plane progressive monochromatique (OPPM) se propageant le long de l'axe Ox dans le sens des x croissants ?
R: Une OPPM est une OPP dont la dépendance en \(x - ct\) (ou \(t-\frac x c\)) est de type sinusoïdal.
--------------------
Q: M.W
Proposer l'expression d'un champ \(\vec{E}\) se propageant suivant \(+\vec{u_x}\) et de polarisation circulaire gauche (sens trigonométrique). Faire de même pour une polarisation circulaire droite (sens horaire).
R: Pour un champ en polarisation circulaire gauche: \(\vec{E}(x,t) = E_{0}cos(\omega t-kx)\vec{e_y}+E_{0}sin(\omega t-kx)\vec{e_z}\)
Pour un champ en polarisation circulaire droite: \(\vec{E}(x,t) = E_{0}cos(\omega t-kx)\vec{e_y}-E_{0}sin(\omega t-kx)\vec{e_z}\)
--------------------
Q: M.W
Proposer l'expression d'un champ \(\vec{E}\) se propageant suivant \(+\vec{u_x}\) et polarisé rectilignement.
R: \(\vec{E} = \vec{E_0}cos(\omega t-kx - \phi)\)
avec \(\vec{E_0} = E_{0y}\vec{e_y} \) polarisation rectiligne suivant \(\overrightarrow{e_y}\)
ou \(\vec{E_0} =E_{0z}\vec{e_z}\) polarisation rectiligne suivant \(\overrightarrow{e_z}\)
ou encore \(\vec{E_0} = \frac{E_0} {\sqrt{2}}\vec{e_y} + \frac{E_0} {\sqrt{2}}\vec{e_z}\) polarisation rectiligne suivant \(\overrightarrow{e_y}+\overrightarrow{e_z}\)
...
--------------------
Q: \(\textcolor{orange}{(M.A)}\)On considère une onde plane progressive monochromatique se propageant dans le vide le long de l'axe Ox dans le sens des x croissants et \(\omega\) la pulsation temportelle. Quelle est l'expression du champ \(\vec E\)?
R: On a \(\vec E:(0,E_{0y}cos(\omega t - \omega \frac x c + \phi_y),E_{0z}cos(\omega t - \omega \frac x c + \phi_z))\)
soit: 
\(\vec E:(0,E_{0y}cos(\omega t - kx + \phi_y),E_{0z}cos(\omega t - kx + \phi_z))\)
--------------------
Q: \(\textcolor{orange}{(M.A)}\)Quel est l'expression du vecteur d'onde \(\vec k\) d'une OPPM se propageant dans le vide dans la direction donnée par le vecteur unitaire \( \vec u\)?
R: \(\vec k =\frac w c \vec u=\frac {2\pi}\lambda \vec u\)
--------------------
Q: (BM) Donner l'équation de d'Alembert tridimensionnelle pour \(\vec{E}\) .
R: \(\Delta\vec{E} - \frac{1}{c²}\frac{\partial²\vec{E}}{\partial t²} = \vec{0}\) avec \(\frac{1}{c²} = \epsilon_{0}\mu_{0} \)
--------------------

==================================================
DECK : EM12
==================================================

Q: (A.P) Donner l' expression, l'unité et le sens physique du vecteur de Poynting.
R: >>> [IMAGE_ID: 20240125_203524.jpg] <<<
--------------------
Q: (A.P) Que dire du vecteur de Poynting d'une OPP dans le vide ?
R: >>> [IMAGE_ID: img3435061267687801303.jpg] <<<
--------------------
Q: (V.I) Donner la densité volumique d’énergie magnétique et son unité
R: \(u_{_M}= \frac{1}{2\mu_0}||B||^2\) en \(J.m^{-3}\)
--------------------
Q: (V.I) Donner la densité volumique d’énergie électromagnétique en un point de l’espace où règne un champ électromagnétique \((\vec E , \vec B)\)
R: \(u_{_{em}}=\frac{1}{2}\epsilon_0||E||^2 +\frac{1}{2\mu_0}||B||^2\) 
unité  \(J.m^{-3}\)
--------------------
Q: (V.I) Donner le rapport entre le temps de propagation  \(\tau\) et  la période du signal \(T \)  puis entre la longueur du circuit L et la longueur d'onde \(\lambda\) dans le cadre de l'ARQS ou ARQP "magnétique"
R: - ARQS - Approximation des Régimes Quasi-Stationnaire
- ARQP - Approximation de Régimes Quasi Permanents
\(\tau << T\)
\(L<<\lambda\)
--------------------
Q: (V.I) Donner les Équations de Maxwell dans l’ARQS "magnétique"
R: ARQS - Approximation des Régimes Quasi-Stationnaire
\(div\vec E(M,t) =\frac{\rho(M,t)}{\epsilon_0}\)
\(\vec{rot}\vec E(M,t) = -\frac{\partial \vec B(M,t)}{\partial t}\)
\(div\vec B(M,t) = 0\)
\(\vec rot\vec B(M,t) = \mu_0 \vec j(M,t)\)
--------------------
Q: (V.I) Donner la densité volumique d’énergie électrique \(u_E\) , magnétique \(u_B\), électromagnétique \(u_{em}\) pour une OPP dans le vide
R: \( u_B=u_E=\frac{1}{2}\epsilon_0||E||^2\)  et \(u_{em}=\epsilon_0||E||^2\)
--------------------
Q: Puissance fournie par le champ électromagnétique à une charge q de vitesse v.(E-S)
R: >>> [IMAGE_ID: IMG_6162.jpg] <<<
Où F est la force de Lorenz
--------------------
Q: (V.I) Donner la loi d’Ohm « intégrale » puis la loi d’Ohm locale.
R: Loi integrale : \(u = Ri\)
Loi locale : \(\vec j = \gamma\vec E\)
\(\gamma\) la conductivité du matériau (\(S.m^{−1}\))
--------------------
Q: (V.I) Definir un conducteur.et un conducteur Ohmique
R: - Conducteur - milieu possédant des porteurs de charges mobiles.
- Conducteur Ohmique - c'est un Conducteur ou on a une relation de proportionalite entre  \(\vec j\) et \(\vec E\)   (\(\vec j = \gamma \vec E\))
porteurs de charges mobiles - des particules chargées susceptibles de se déplacer, par exemple des électrons dans un métal
--------------------
Q: (V.I) Retrouver l'expression de la densité volumique d'énergie électrique \(u_{em}\) dans le cas particulier dun condensateur plan.
R: - électrostatique: \(||\vec E|| = \frac{\sigma}{\epsilon_0}=\frac{Q}{\epsilon_0 S}\)
- électrocinétique: \(U_E =\frac{1}{2}CU^2 = \frac{Q^2}{2C}\)
- donc \(U_E = \frac{||\vec E||^2}{2C}(S \epsilon_0)^2 =\frac{||\vec E||^2 e}{2 \epsilon_0 S}  (S\epsilon_0)^2 = \frac{1}{2}\epsilon_0||\vec E||^2 Se\)
- Or \(Se=V\) donc \(u_E=\frac{U_E}{V}=\frac{1}{2} \epsilon_0 ||\vec E||^2\)
- S - surface des armatures
- e - distance entre armatures
- C - capacité du condensateur
- \(\sigma\) - densité surfacique de charge
- Q - la valeur absolue de la charge portée par les armatures
- \(U\) - la tension aux bornes du condensateur
--------------------
Q: Connaître et determiner la puissance volumique fournie par le champ électromagnétique aux porteurs de charges. (E-S)
R: >>> [IMAGE_ID: IMG_6164.jpg] <<<
--------------------
Q: Bilan d'energie sous forme intégrale.(E-S)
R: >>> [IMAGE_ID: IMG_6166.jpg] <<<
--------------------
Q: Bilan d'énergie sous forme locale.(E-S)
R: >>> [IMAGE_ID: paste-99d771ded1438c4d97b496e50d4f1c3d318344c6.jpg] <<<
--------------------

==================================================
DECK : EM13
==================================================

Q: (O.M) Dans une cavité de longueur \(a\) ou règne un champ \(\overrightarrow{E}\). Quelle sont les conditions que celui-ci doit vérifier ?
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
R: -Le champ dans la cavité est nulle en \(x=0\) et en \(x=a\) à tout instant (car continuité de la composante tangentielle de \(\overrightarrow{E}\) à l'interface vide / conducteur parfait+ champ E tangent à l'inteface vide/ conducteur parfait). On a alors [$] E(x=0,t) = E(x=a,t) = 0[/$]
-L'equation de d'Alembert doit être aussi verifiée donc
[$] \Delta \overrightarrow{E} - \frac{1}{c^{2}} \frac{\delta  \overrightarrow{E}^2}{\delta t^2} = \overrightarrow{0}[/$]
--------------------
Q: (O.M) 
Quelle est la forme mathématique du champ \(\overrightarrow{E} (x,t)=f(x)g(t) \overrightarrow{u_z}\)  règnant dans la cavité.
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
R: \(\overrightarrow{E} (x,t)=f(x)g(t) \overrightarrow{u_z}\) vérifie l'équation de d'Alembert.
Soit: \(\Delta E_z - \frac{1}{c^2} \frac{\partial^ 2 E_z}{\partial t^ 2}=0 \)
on a alors \(g(t) \frac{d^2 f}{dx^2} - \frac{1}{c^2} f(x) \frac{d^2 g }{dt^2} = 0\)
donc
\(\frac{1}{f(x)}\frac{d^2 f}{dx^2} = \frac{1}{c^2} \frac{1}{g(t)}\frac{d^2 g}{dt^2} = K\)
on a l'égalité avec une constante K car chaque coté de l'équation est indépendant de l'autre (d'un côté on a le temps tandis que de l'autre il s'agit de la position) ainsi on a 2 équations différentielles:
\( \frac{d^2 f}{dx^2}  - Kf(x) =  0\)
\(\frac{d^2 g}{dt^2} - K{c^2} g(t)= 0\)
La résolution de ces deux équa diff (les résoudre comme des equa diff normales, seules les solutions périodiques sont acceptables)
Donc \(g(t)=A cos(\omega t+\phi)\) avec \(\omega =\sqrt{-Kc^2}\)
et \(f(x)=A' cos(\frac{\omega}{c} t+\phi')\)
Donc \(\overrightarrow{E}=E_0 cos(\frac{\omega}{c} x)+cos(\omega t+\phi'') \overrightarrow{u_z}\)
--------------------
Q: (O.M)
\(\overrightarrow{E}=E_0 cos(\frac{\omega}{c} x+\phi)+cos(\omega t+\phi') \overrightarrow{u_z}\)
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
Qu'implique les conditions aux limites sur l'expression de \(\overrightarrow{E}\)?
R: La condition aux limites: 
\(E(x=0,t) = 0\) pour tout \(t\) implique: 
\(cos(\phi)=0\) soit \(\phi=-\frac{\pi}{2}\)par exemple
Donc \(\overrightarrow{E}=E_0 cos(\frac{\omega}{c} x-\frac{\pi}{2})+cos(\omega t+\phi') \overrightarrow{u_z}=E_0 sin(\frac{\omega}{c} x)+cos(\omega t+\phi') \overrightarrow{u_z}\)
La condition aux limites: 
\(E(x=a,t) = 0\) pour tout \(t\) implique: 
\(sin(\frac{\omega}{c} a)=0\) soit \(a=p \frac{\pi c}{\omega}\)
Et donc \(\frac{\omega}{c}=p\frac{\pi}{a}\) et \(\omega =p\frac{\pi c}{a}\)
Soit \(\overrightarrow{E}=E_0 sin(p\frac{\pi}{a}x)+cos(p\frac{\pi c}{a} t+\phi') \overrightarrow{u_z}\)
--------------------
Q: (O.M) le champ [$] \overrightarrow{E} [/$] dans une cavité s'exprime de la sorte : [$] \overrightarrow{E}  = E_0 sin(p \pi \frac{x}{a})cos(p \pi \frac{ct}{a}+ \Phi) \overrightarrow{u_z} [/$] avec p un entier naturel non nul.
Que siginfie p.
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
R: A chaque valeur de p correspond un mode propre de vibration de la cavité de fréquence \(f_p =p \frac{c}{2a}\)et de longueur d'onde \(\lambda_p =\frac{2a}{p}\)
>>> [IMAGE_ID: paste-dee508805d69e2a4da947748c97fedcf4ae7a97d.jpg] <<<
--------------------
Q: (L.S) Localiser les ventres et les noeuds de \(\vec{E}\) et \(\vec{B}\) dans la représentaion suivante :
>>> [IMAGE_ID: bleh.PNG] 0i sin(kz) sin(wt) \(\vec{u}_{x}\)
R: >>> [IMAGE_ID: Ajouter des lignes dans le corps du texte.png] En rouge ventres de \(\vec{B}\) et noeuds de \(\vec{E}\)
En bleu ventres de \(\vec{E}\) et noeuds de \(\vec{B}\)
Noeuds de \(\vec{E}\) :
\(\vec{E}\) = \(\vec{0}\) ⇐⇒ 2 E0i sin(kz) sin(wt) = 0
⇐⇒ sin(kz) = 0 
⇐⇒ kz = nπ où n ∈ Z
⇐⇒ z = nπ/k où n ∈ Z
Ventres de \(\vec{E}\):
|sin(kz)| = 1 ⇐⇒ z = nπ/k + π/2k où n ∈ Z
--------------------
Q: (L.S) Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
On a \(\underline{\vec{E}_{i}}\) = E0i exp(j(kz-wt)) \(\vec{u}_{x}\) . Donner l'expression de \(\underline{\vec{E}_{r}}\) .
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
R: L'onde incidente se réfléchie sur elle même car alle arrive sous incidence normale. On cherche donc une onde réfléchie du type OPPM se propageant suivant \(- \overrightarrow{u_z}\): \(\underline{\vec{E}_{r}}=\underline{\overrightarrow{E_{0r}}} \ exp(j(-k_rz+\omega_r t))\)
Utilisation de la condition de continuité de la composante tangencielle de \(\vec{E}\) à l'interface (z=0):
La composante tangentielle de \(\vec{E}\) est nulle en \(z=0^+\)car \(\vec{E} =\vec {0}\) est toujours nulle dans un conducteur parfait.
La composante tangentielle de \(\vec{E}\) en 
\(z=0^-\)est: \({\vec{E}_{i}}(z=0,t)+{\vec{E}_{r}}(z=0,t)\)car\({\vec{E}_{i}}\) et 
\({\vec{E}_{r}}\) sont tangents à l'interface car ils se propgagent suivant \(\pm \overrightarrow{u_z}\) et sont transverses (propagation dans le vide).
Donc \(E_{0i}exp(-j\omega t) \overrightarrow{u_x}+\overrightarrow{E_{0r}} exp(-j\omega_r t)=0 \) pour tout \(t\).
Soit pour \(t=0\) ce qui implique \(\underline{\overrightarrow{E_{0r}}}=-E_{0i} \overrightarrow{u_x}\) puis \(E_{0i}exp(-j\omega t) \overrightarrow{u_x}- E_{0i}\overrightarrow{u_x} exp(-j\omega_r t)=0 \) valable pour tout \(t\). Ce qui implique \(\omega_r=\omega \) et donc \(k_r=k=\frac{\omega}{c}\).
Bilan: \(\underline{\overrightarrow{E_r}}=-E_{0i}exp(j(-kz-\omega t))\overrightarrow{u_x}\) et à l'interface: \(\overrightarrow{E_r}(z=0^- ,t)=-\overrightarrow{E_i}(z=0^-,t) \)
--------------------
Q: (L.S) 
Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
On a \(\underline{\overrightarrow{E_i}}=E_{0i}\ exp(j(kz-\omega t))\overrightarrow{u_x}\)  et \(\underline{\overrightarrow{E_r}}=-E_{0i}exp(j(-kz-\omega t))\overrightarrow{u_x}\).
 Déterminer  \(\vec{B}_{r}\) et \(\vec{B}_{i}\).
R: \(\underline{\vec{B}}\) = \(\frac{\underline{\vec{k}} ∧ \underline{\vec{E}}}{ω}\) on ramène cette formule aux réels, on obtient 
\(\underline{\vec{k}_{i}}=\vec{k}_{i}\) = k\(\vec{u}_{z}\) réel donc \(\overrightarrow{B_i}=\frac{{\vec{k_i}} ∧ {\vec{E_i}}}{ω}\)
\(\underline{\vec{k}_{r}}=\vec{k}_{r}\) =- k\(\vec{u}_{z}\) réel donc \(\overrightarrow{B_r}=\frac{{\vec{k_r}} ∧ {\vec{E_r}}}{ω}\)
Avec \(\vec{E}_{i}\) = E0i cos(kz-wt) \(\vec{u}_{x}\) et \(\vec{E}_{r}\) = - E0i cos(-kz-wt) \(\vec{u}_{x}\)
Après calcul on obtient
\(\vec{B}_{i}\) = \(\frac{kE_{0i}}{ω}\) cos(kz - wt) \(\vec{u}_{y}\)
\(\vec{B}_{r}\) = \(\frac{kE_{0i}}{ω}\) cos(-kz - wt) \(\vec{u}_{y}\)
--------------------
Q: le champ [$] \overrightarrow{E} [/$] dans une cavité s'exprime de la sorte : [$] \overrightarrow{E}(x,t)  = f(x) g(t)  \overrightarrow{u_z} [/$]
>>> [IMAGE_ID: paste-d13b668f511ce3dc30a786d7467c62ae5210dd48.jpg] <<<
Quelle est la nature cette onde? Pourquoi chercher une onde de ce type?
R: C'est une onde stationnaire (i.e. qui ne se propage pas).
On cherche une onde de ce type car l'onde qui existe dans la cavité peut être vu comme la superposition de deux OPPM qui se propagent en sens inverse et qui (comme nous l'avons vu dans le cas de la réflexion sur un conducteur parfait) donne lieu à une onde stationnaire.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-51401275d15bbf37d7e168a56c64ee7635c23923.jpg] <<<
R: >>> [IMAGE_ID: paste-b1d8356e3e5a085afb59e2d76355ab2195bb7a80.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-8e1bfb99783c1fd684cd404ef15d5918094dfd01.jpg] <<<
Rappel: \(\Delta \overrightarrow{E} -µ_0 \gamma \ \frac{\partial \overrightarrow{E}}{\partial t}=\overrightarrow{0}\)
R: >>> [IMAGE_ID: paste-354ec4f941ffbcf92ed82f4736d592d5dc834cd0.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-273417994be21d50ab9ebc2db9a945b92cd6125d.jpg] <<<
R: >>> [IMAGE_ID: paste-09120748084d1ae45fcad52f4c680d5acf2fcae0.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-c9b6cc0e85a1d927c0f8736cd0a0e5f9c82b0c6e.jpg] <<<
R: >>> [IMAGE_ID: paste-712a3d4adda06ec3afbc29daa1e49fb999781d0c.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-b3926ac7c755977d76ea5d1125d4e30871c32236.jpg] <<<
Donner les caractéristiques de l'onde obtenue.
R: >>> [IMAGE_ID: paste-56a8e1c02a5f64fb84e5a49278d65bf0cae2dd88.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-e82daa53e473b6987630d3777e94cee8955f83b5.jpg] <<<
Les champ électrique et magnétique sont-ils en phase dans un conducteur ohmique?
R: >>> [IMAGE_ID: paste-ac3a319a2a2e4552da79e1368bf7fffa02f18347.jpg] >> [IMAGE_ID: paste-c565a9ffdc44c1ff22e571ff9f17419b38d4a93f.jpg] >> [IMAGE_ID: paste-d7d1a56baa7de129a328e8758b53bbd357ba7b7a.jpg] <<<
Donc \(\overrightarrow{E}\) et \(\overrightarrow{B}\) sont déphasés de \(\pi/4\) rad dans le conducteur ohmique.
--------------------
Q: (MAG)
Qu'est-ce qu'un conducteur parfait.
En déduire de manière qualitative des valeurs de E, B, j dans le conducteur parfait.
R: Un
conducteur parfait est défini comme un milieu ayant une conductivité \(\gamma \rightarrow +\infty\).
Remarque: Le conducteur parfait est un modèle qui permet de représenter le comportement des métaux en hautes fréquences, dans la limite des faibles épaisseurs de peau (ie δ faible devant la dimension caractéristique du conducteur).
Conducteur parfait:  \(\gamma \rightarrow +\infty\) => \(\delta \rightarrow 0\) donc l'épaisseur sur laquelle l'amplitude des champs est non nulle tend vers zéro. On en déduit que \(\overrightarrow{E}=\overrightarrow{0}\),\(\overrightarrow{B}=\overrightarrow{0}\) et \(\overrightarrow{j}=\gamma \overrightarrow{E}=\overrightarrow{0}\) dans le conducteur parfait.
--------------------
Q: Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
On a \(\underline{\overrightarrow{E_i}}=E_{0i}\ exp(j(kz-\omega t))\overrightarrow{u_x}\)  . Donner directement l'expression de \(\overrightarrow{E_r}(z=0^- ,t)\)  à l'interface conducteur/vide. 
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
R: \(\overrightarrow{E_r}(z=0^- ,t)=-\overrightarrow{E_i}(z=0^-,t)=-E_{0i}cos(-\omega t)\overrightarrow{u_x}\)
--------------------
Q: Cas de la réléxion sur un conducteur parfait d'une onde arrivant sous incidence normale.
>>> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] 0i cos(kz-wt) \(\vec{u}_{x}\)
\(\vec{E}_{r}\) = - E0i cos(-kz-wt) \(\vec{u}_{x}\)
\(\vec{B}_{i}\) = \(\frac{kE_{0i}}{ω}\) cos(kz - wt) \(\vec{u}_{y}\)
\(\vec{B}_{r}\) = \(\frac{kE_{0i}}{ω}\) cos(-kz - wt) \(\vec{u}_{y}\)
Déterminer \(\overrightarrow{E}\) et \(\overrightarrow{B}\) (dans le vide).
Quelle est la nature de cette onde.
Que vaut la moyenne temporelle du vecteur de Poynting de cette onde?
R: Après calcul avec cos(-kz-wt)=cos(kz+wt) et cos(a+b)+cos(a-b)=2cos(a)cos(b) ainsi que cos(a-b)-cos(a+b)=2sin(a)sin(b), on obtient:
\(\overrightarrow{E}=2 E_{0i}sin(kz)sin(\omega t) \overrightarrow{u_x}\)
\(\overrightarrow{B}=2 \frac{k}{\omega} E_{0i}cos(kz)cos(\omega t) \overrightarrow{u_y}\)
Nature: onde stationnaire.
Donc la valeur moyenne temporelle du vecteur de Poynting de cette onde est nulle.
--------------------
Q: Que vaut la densité surfacique de charge à la surface d'un conducteur parfait?
R: Elle est nulle
--------------------
Q: Déterminer
l’expression de la densité de courants surfaciques à la surface du conducteur
parfait.
Rappel : \(\overrightarrow{B}=2 \frac{k}{\omega} E_{0i}cos(kz)cos(\omega t) \overrightarrow{u_y}\)
Donnée: relation de passage:
>>> [IMAGE_ID: clip_image002.gif] >> [IMAGE_ID: paste-19049a52659cbc68fe9fc14d3fdba63fb6d0d43f.jpg] <<<
R: \(\overrightarrow{B_{(2)}}=\vec{0}\), 
\(\overrightarrow{B_{(1)}}=2 \frac{k}{\omega} E_{0i}cos(\omega t) \overrightarrow{u_y}\)
\(\overrightarrow{n}_{(1->2)}=\vec{u_z}\)
Après calcul on obtient: \(\vec{j_s}=2 \frac{k}{\omega µ_0} E_{0i}cos(\omega t) \overrightarrow{u_x}\)
--------------------
Q: Quelle explication qualitative peut-on donner à l'existence d'un champ réfléchi lors de l'arrivée d'une onde électromagnétique sur un conducteur parfait?
R: L’onde
incidente met en mouvement les électrons à la surface du conducteur, cela engendre des courants à la surface du conducteur. Ces
courants, créés par le champ incident, sont à leur tour une source de champ
électromagnétique : ce sont eux qui sont à l’origine du champ réfléchi.
--------------------

==================================================
DECK : EM14
==================================================

Q: (LPB) Déterminer la relation de dispersion d'un plasma de conductivité complexe \(\underline{\gamma}=-i \frac {n_0\ e^2}{\omega \ m_e}\) où règne un champ\(\underline{\overrightarrow{E}}=\underline{\overrightarrow{E_0}} exp(i(\omega \ t-\underline{k}\ z))\).
Rappel équation de "propagation" du plasma: \(\Delta \underline{\overrightarrow{E}} - \frac{1}{c} \frac{\partial^2\underline{\overrightarrow{E}}}{\partial t^2} = \mu_0\underline{\gamma} \frac{\partial\underline{\overrightarrow{E}}}{\partial t}\)
R: \(k^2 (\omega) = {\frac{\omega^2 - \omega_p^2}{c^2}}\)    avec   \(\omega_p = \sqrt{\frac{n_0e^2}{\varepsilon_0m_e}}\)
où \(n_0\) est la densité d'électrons du plasma
\(m_e\) est la masse d'un électron
\(\omega_p\) est la pulsation plasma. 
Méthode: Remplacer \(\underline{\overrightarrow{E}}\) et \(\underline{\gamma}\) par leurs expressions dans l'équation de "propagation" du plasma: \(\Delta \underline{\overrightarrow{E}} - \frac{1}{c} \frac{\partial^2\underline{\overrightarrow{E}}}{\partial t^2} = \mu_0\underline{\gamma} \frac{\partial\underline{\overrightarrow{E}}}{\partial t}\)
--------------------
Q: (TS) Qu'est-ce qu'un plasma ? Donner un exemple.
R: Un plasma est un milieu gazeux partiellement ou totalement ionisé, globalement neutre, constitué d'ions, d'électrons et d'atomes ou molécules neutres.
Exemple : Ionosphère partiellement ionisée par les rayonnements UV et X du Soleil.
--------------------
Q: (LPB) Donner les équations de Maxwell dans le plasma et leurs conséquences.
R: div(\(\vec{E}\))=0 (car on considère une onde transverse électrique).
Conséquence: \(\rho\)=0 : le passage de l'onde ne perturbe pas la densité volumique de charge qui reste nulle
div(\(\vec{B}\))=0
Conséquence: l'onde est aussi transverse magétique
\(\vec{rot}\)(\(\vec{E}\))=-\(\frac{\partial \vec B}{\partial t}\)
Conséquence:  Relation de structure: \(\underline{\overrightarrow{B}} = \frac{\underline{\overrightarrow{k}}\wedge \underline{\overrightarrow{E}}}{\omega}\)
\(\vec{rot}\)(\(\vec{B}\))=\(\mu_0\)\(\vec j\)+\(\epsilon_0\)\(\mu_0\)\(\frac{\partial \vec E}{\partial t}\)avec \(\underline{\overrightarrow{j}}=\underline{\gamma }\underline{\overrightarrow{E}}\)
--------------------
Q: (TS) Appliquer le PFD à un électron (non relativiste) du plasma pour déterminer sa vitesse dans le cas d'une OPPM incidente  \(\underline {\vec E}=\underline {\vec E_0} exp(i(\omega \ t-\underline{k} \ z))\) arrivant sur le plasma sous incidence normale.
R: Bilan des forces :
•Force de Lorentz : \(\vec F\) = \(-e\)(\(\vec E\)  + \(\vec v\) \(\wedge\) \(\vec B\))
Le terme magnétique est négligeable devant le terme électrique car \(\lVert \vec B \rVert\) = \(\frac{\lVert \vec E \rVert}{v_\varphi}\) avec \(v_\varphi\) > \(c>v\)
•Poids : \(\vec P\) = \(m_e\)\(\vec g\) négligeable devant \(\vec F\) = -\(e\)\(\vec E\)
Le PFD donne :
\(m_e\)\(\frac{d\vec v}{dt}\) = -\(e\)\(\vec E\)
Nous sommes en RSF donc \(\underline {\vec v}=\underline {\vec v_0} exp(i\omega \ t)\):
En complexe \(m_e \frac{d\vec v}{dt}=-e \vec {E}\) devient \(i\omega\)\(m_e\underline {\vec v}\) = -\(e\)\(\underline{\vec E}\) 
Donc \(\underline {\vec v}\) = - \(\frac{e}{i\omega m_e}\)\(\underline{\vec E}\)
--------------------
Q: (TS) Exprimer le vecteur densité volumique de courant complexe \(\underline{\vec j}\) dans un plasma où règne un champ \(\underline{\vec E}\) et où les électrons sont présents avec une densité volumique \(n_0\)et ont une vitesse \(\underline {\vec v}\) = - \(\frac{e}{i\omega m_e}\)\(\underline{\vec E}\).
En déduire la conductivité complexe du plasma \(\underline{\gamma}\) par analogie avec la loi d'Ohm.
R: \(\vec j\) = \(n_0\) (-\(e\)) \(\vec v\)
Donc \(\underline{\vec j}\) = \(\frac{n_0  e²}{i\omega m_e}\)\(\underline{\vec E}\) = \(\underline{\gamma}\) \(\underline{\vec E}\)
et donc la conductivité complexe du plasma est : \(\underline{\gamma}=-i \frac{n_0 e^2}{\omega \ m_e}\)
--------------------
Q: (TS) Donner la puissance volumique moyenne cédée par le champ électromagnétique à un plasma de conductivité complexe \(\underline{\gamma}=-i \frac{n_0 e^2}{\omega \ m_e}\).
R: <\(\vec j.\vec E\)> = \(\frac{1}{2}\)\(Re(\underline{\vec j}.\underline{\vec E^*} )\) = \(\frac{1}{2}\)\(Re(\underline{\gamma}\underline{ \vec E}.\underline{\vec E^*} )\) = \(\frac{1}{2}\)\(Re(\underline{\gamma}|\underline{ \vec E}|^2)\) = 0 ( car \(\gamma\) est imaginaire pur)
--------------------
Q: (B.R.) Donner l'équation de propagation d'une O.P.P.M. dans un plasma.
R: Sachant que les éq de Maxwell dans le plasma s'écrivent:
div(\(\vec{E}\))=0 (car on considère une onde transverse)
div(\(\vec{B}\))=0
\(\vec{rot}\)(\(\vec{E}\))=-\(\frac{\partial \vec B}{\partial t}\)
\(\vec{rot}\)(\(\vec{B}\))=\(\mu_0\)\(\vec j\)+\(\epsilon_0\)\(\mu_0\)\(\frac{\partial \vec E}{\partial t}\)avec \(\underline{\overrightarrow{j}}=\underline{\gamma }\underline{\overrightarrow{E}}\)
Avec \(\overrightarrow{rot} (\overrightarrow{rot}\overrightarrow{E}) - \overrightarrow{grad}(div\overrightarrow{E})=-\Delta \overrightarrow{E}\), on obtient:
\(\Delta \underline{\overrightarrow{E}} - \frac{1}{c} \frac{\partial^2\underline{\overrightarrow{E}}}{\partial t^2} = \mu_0\underline{\gamma} \frac{\partial\underline{\overrightarrow{E}}}{\partial t}\)
--------------------
Q: (B.R.) Bilan 1/2 : dans un plasma dilué, les O.P.P.M. de \(\omega > \omega_p\)
R: se propagent sans atténuation dans le plasma.
à une vitesse\(v_{\varphi}=\frac{\omega }{k}=\frac{\omega }{\sqrt\frac{\omega^2 - \omega_p^ 2}{c^2 }}=\frac{c}{\sqrt{1-(\omega_p/\omega)^2 }}>c\)
\(v_{\varphi}\) dépend de \(\omega\) donc le milieu est dispersif
\(v_{\varphi} \rightarrow c \) lorsque \(\omega \rightarrow +\infty\)
\(||\overrightarrow{B}||=\frac{||\overrightarrow{E}||}{v_\varphi}\)
\(\overrightarrow {B}\) et \(\overrightarrow {E}\) sont en phase car \(k^2>0 \) donc \(k\) est réel.
--------------------
Q: (B.R.) Bilan 2/2 : Dans un plasma dilué, les O.P.P.M. de \(\omega < \omega_p\) :
R: ne peuvent pas se propager dans le plasma et sont totalement réfléchies par le plasma.
Elles donnent dans le plasma, une onde stationnaire d'amplitude décroissante appelée onde évanescente.
La distance caractéristique de pénétration de l'onde dans le plasma est \(\delta=\frac{c}{\sqrt{\omega_p^2 -\omega^2 }}\)qui dépend de \(\omega \).
\(\overrightarrow {B}\) et \(\overrightarrow {E}\) sont déphasés de \( \pi/2\) car 
\(\underline{\overrightarrow{B}} = \frac{\underline{\overrightarrow{k}}\wedge \underline{\overrightarrow{E}}}{\omega}\)et que\(k^2=\frac{\omega^2-\omega_p^2}{c^2}<0 \) donc \(\underline{\overrightarrow{k}}\) est imaginaire pur.
--------------------

==================================================
DECK : EM15
==================================================

Q: Définir le dipole oscillant.
R: >>> [IMAGE_ID: paste-eb2c6fd00e3b25d364dc61ba7017cf4dd65d9990.jpg] <<<
--------------------
Q: (F.H) Représenter l'indicatrice de rayonnement :
R: >>> [IMAGE_ID: paste-1c03ac8bb67ec008b75f62d57a7cc2c181de2dad.jpg] >> [IMAGE_ID: paste-4916eec46c60d4430b71a9afe98595aa130044bd.jpg] >> [IMAGE_ID: paste-63b4fdc36be49d8390c5adc4e721a62990b428b7.jpg] <<<
--------------------
Q: (F.H) Définir la zone de rayonnement d'un dipôle
R: >>> [IMAGE_ID: paste-39f01c3e9e7291d506d17d40165d29f2b130efc6.jpg] <<<
--------------------
Q: Donner la signification de l'approximation \(a \ll \lambda\)
R: Lorsqu'on fait l'approximation \(a\ll\lambda \) on néglige le retard lié à la propagation au sein même de la distribution. Cela revient à considérer qu’un point \(M\) éloigné du dipôle reçoit au même instant \(t \) des informations qui ont été émises en même temps à \(t -\frac{r}{c}\) (avec \(r= OM\) ) par les différents points sources de la distribution.
On peut aussi interpreter l'approximation comme ceci : les mouvements des charges sont non relativistes.
--------------------
Q: Donner la signification de l'approximation \(a\ll r\) .
R: On se situe dans l'approximation dipolaire.
--------------------
Q: (Y.Z) Dans la zone de rayonnement, quelle est la structure du champ électromagnétique ?
R: \[\text{ Dans la zone de rayonnement, le champ électromagnétique a localement la structure d'une OPP se propageant selon le vecteur }\vec{u}_r.\]
--------------------
Q: \[\text (Y.Z) {<}\vec{\pi}\text{>} \text{ est proportionnel à } \sin^2 \theta , \text {que peut on dire alors de l'émission dipolaire ?}\]
R: \[\text{Elle est anisotrope.}\]
>>> [IMAGE_ID: paste-18fee75962840b4f99af169dc2f01ec022847b92.jpg] <<<
--------------------
Q: (Y.Z.) Comment interpréter le fait que la puissance moyenne rayonnée à travers une sphère de centre O et de rayon R (\(<P_{ray}>\)) est indépendante de R?
R: >>> [IMAGE_ID: paste-c72c9182f9f87b963549dd7649a13753d092847d.jpg] <<<
--------------------

==================================================
DECK : EM 3, 4 et 5
==================================================

Q: (T.B.)Quelles sont les 5 étapes pour appliquer le théorème de Gauss ?
R: 1. Etude des invariances \(\rightarrow\)choix du système de coordonnées et variables dont dépend la norme de \(\vec{E}\)
Etude des symétries\(\rightarrow\)direction de\(\vec{E}\)
2. Choix de la surface de Gauss qui doit être fermée (essayer une surface telle que \(||\vec{E}||=cste\) et si besoin la complétée avec des surfaces orthogonales à  \(\vec{E}\)
3. Calcul du flux de \(\vec{E}\) à travers la surface de Gauss choisie (Une seule expression à cherchée)
4. Calcul de \(Q_{int}\) la charge située à l'intérieure de la surface de Gauss. (plusieurs cas peuvent être à considérer)
5. Appliquer le théorème de Gauss
--------------------
Q: Ylan / 
\[\text{Soit une charge ponctuelle } q, \text{ une surface fermée } S \text{ (Sphere de rayon } R, \text{ centrée sur la charge } q)\]\[\text{Déterminer le flux du champ } \vec{E} \text{ créé par la charge q à travers la surface fermée S}\]
R: \[\vec{E}(M \in S) = \frac{q}{4\pi\varepsilon_0R²}\vec{u_r}\]\[\phi = \unicode{x222F}_{\mathscr{S}} \vec{E } \cdot  \vec{dS}= \unicode{x222F}_{\mathscr{S}}  \frac{q}{4\pi\varepsilon_0R²}.\vec{u_r}. dS.\vec{u_r}=\frac{q}{4\pi\varepsilon_0R²}\iint_SdS=\frac{q}{\varepsilon_0}\]
--------------------
Q: Ylan/\(\text{Etablir l’expression du champ } \vec{E} \text{ créé en un point quelconque M de l’espace par une distribution linéique de charges de densité λ uniformément répartie le long d’un fil rectiligne infini.}\)
R: \[\text{On a : } \lambda = cste\]
\[\text{Etude des invariances : } ||\vec{E}||(r,\cancel\theta,\cancel{z})\]
\[\text{Etude des symétries :} \vec{E} \ \text{suivant}\  \vec{u_r}\]
\[\text{Bilan : } \vec{E}(M) = E(r)\vec{u_r}\]\[\text{On choisit comme surface de Gauss un cylindre de rayon r et de hauteur h fermée par deux disques}\]
>>> [IMAGE_ID: Capture d] \[\phi  =\unicode{x222F}_{\mathscr{S}_g} E(r) \vec{u_r } \cdot  dS\vec{u_r}= E(r)2\pi rh\]\(Q_{int} = \int_C\lambda dl = \lambda h \text{ car C est la portion du fil dans }S_g\)
\[\text{On applique maintenant le théorème de Gauss : }
2\pi rhE(r) = \frac{\lambda h}{ \varepsilon_0}\]
\[\text{Finalement, on obtient : } \vec{E} =\frac{\lambda }{2\pi r\varepsilon_0} \vec{u_r} \]
--------------------
Q: (Yuye) Comment définir le vecteur \(d\overrightarrow{S_M}\) ?
R: \(d\overrightarrow{S_M}\) est un vecteur \(\bot\) à la surface élémentaire \(dS_M\) centrée sur le point M.
>>> [IMAGE_ID: IMG_20231115_205047.jpg] 2e cas: Soit S est une surface fermée, alors \(d\overrightarrow{S_M}\) est orienté vers l'extérieur de la surface fermée.
--------------------
Q: (Yuye) Théorème de Gauss pour une surface fermée quelconque
R: Le théorème de Gauss s'écrit :
\[\Phi=\unicode{x222F}_{\mathscr{S}_g} \vec{E}(M)d\vec{S}_M=\frac{Q_{int}}{\varepsilon_0}\]où :
\(S_g\) est une surface fermée quelconque.
\(M\) est un point sur cette surface.
\(\Phi\) est le flux du champ électrosatique à travers cette surface.
\(\vec{E}(M)\) est le champ électrique en M.
\(d\vec{S}_M\) est le vecteur \(\bot\) à la surface élémentaire \(dS_M\) centrée sur M, dirigé vers l'extérieur de \({\mathscr{S}_g}\)
\(Q_{int}\) est la charge totale que contient \(S_g\).
\(\varepsilon_0\) est la permittivité.
--------------------
Q: (Yuye) Établir le champ créé par un cylindre à base circulaire de rayon de \(R\) et de hauteur considérée comme infini et uniformément chargé en volume avec une densité volumique de charge [$]\rho[/$].
R: >>> [IMAGE_ID: IMG_20231115_205047-9a9355bb58d3059ca8f62b4d7ffd956dab49ccab.jpg] 
- Symétries: \((M,\overrightarrow{u_z}, \overrightarrow{u_r})\) , \((M,\overrightarrow{u_r}, \overrightarrow{u_\theta})\)deux plans de symétries de la distribution de charges passant par M \(\Rightarrow\) \(\vec{E}\) suivant \(\overrightarrow{u_r}\) .
- Bilan: \(\vec{E}(M)=E_r(r)\overrightarrow{u_r}\) .
- Suface de Gauss: cylindre à base circulaire de rayon \(r\) et de hauteur \(h\) fermé (cf schéma): \(S_g = S_1 \cup S_2 \cup S_3\) . 
- Calcul de \(\Phi\) : \(\Phi=\unicode{x222F}_{\mathscr{S}_g} \vec{E}.d\vec{S} \)
    \(=\iint_{M\in{S_1}}\vec{E}(M)d\vec{S}+\iint_{M\in{S_2}}\vec{E}(M)d\vec{S}+\iint_{M\in{S_3}}\vec{E}(M)d\vec{S}\)
    \(=\iint_{M\in{S_1}}\vec{E}(M)d\vec{S}\)
    \(=\iint_{M\in{S_1}}E_r(r)\overrightarrow{u_r}.(dS\overrightarrow{u_r})\)
    \(=E_r(r)\iint_{M\in{S_1}}dS\)
    \(=E_r(r)2{\pi}rh\)
- Calcul de \(Q_{int}\) :1er cas: \(r < R\)
\(Q_{int}=\rho \pi r^2h\) 
2e cas: \(r > R\)
\(Q_{int}=\rho \pi R^2h\)
- Théorème de Gauss:1er cas: \(r < R\)
\(E_r(r)2{\pi}rh=\frac{\rho\pi{r^2}h}{\varepsilon_0}\) \(\Rightarrow\) \(E_r(r)=\frac{\rho r}{2\varepsilon_0}\) \(\Rightarrow\) \(E_r(r)=\frac{\rho r}{2\varepsilon_0}\overrightarrow{u_r}\)
2e cas: \(r > R\)
\(E_r(r)2{\pi}rh=\frac{\rho\pi{R^2}h}{\varepsilon_0}\)\(\Rightarrow\)\(E_r(r)=\frac{\rho R^2}{2\varepsilon_0 r}\)\(\Rightarrow E_r(r)=\frac{\rho R^2}{2\varepsilon_0 r}\overrightarrow{u_r}\)
- Évolution du champ électrique \(E_r(r) \) en fonction de\(r\) :
>>> [IMAGE_ID: IMG_20231115_221031.jpg] <<<
--------------------
Q: (Arthur) Quel est le champ électrostatique à l'extérieur (de l'espace interarmature) d'un condensateur plan?
R: \[\vec{E} = \vec{0}\]
--------------------
Q: (Manuel) Quelle est la norme du champ électrostatique entre les deux armatures d'un condensateur plan?
R: \[||\vec{E}|| = \frac{\sigma}{\varepsilon_{0}} = \frac{Q}{S\varepsilon_{0}}\]Avec :
•  \(\sigma = \frac{Q}{S}\) la valeur absolue de la densité surfacique de charge des armatures et \(Q\) la valeur absolue de leur charge.
•  \(\varepsilon_{0}\) la permittivité du vide
--------------------
Q: Victor / Déterminer l’expression du champ électrostatique créé en un point M par une distribution surfacique de
charges de densité σ uniformément réparties sur un plan infiniment étendu.
>>> [IMAGE_ID: plan-b84c87801652a62f616c58fbe3773f90809cb387.png] <<<
R: Invariances 
Invariance par translation selon x et selon y  \(=> \vec{E}(M) = E_x(\cancel{x},\cancel{y},z)\vec{u_x} + E_y(\cancel{x},\cancel{y},z)\vec{u_y} + E_z(\cancel{x},\cancel{y},z)\vec{u_z} \)
Symétries
Les plans orthogonaux au plan infini sont des plans de symétries de la distribution de charges 
\((M,\vec{u_x},\vec{u_z})\) et aussi le plan \((M,\vec{u_y},\vec{u_z})\)
donc \(=> E_y  = 0\) et \(E_x = 0 \)
Bilan
\(\vec{E}(M) = E_z(z)\vec{u_z}\)
Surface de Gauss 
On choisit un parallépipède à base carré de côté a et symétrique par rapport au plan chargé.
\(\mathscr{S}_g = \mathscr{S}_h \cup \mathscr{S}_b \cup \mathscr{S}_1 \cup \mathscr{S}_2 \cup \mathscr{S}_3 \cup \mathscr{S}_4\)
>>> [IMAGE_ID: plan-e73174d5f9184eeeafc3dd30474a2ce6087c52f2.png] Flux
\(\Phi = \unicode{x222F}_{\mathscr{S}_g} \vec{E } \cdot  \vec{dS}  = \iint\limits_{\mathscr{S}_h}\vec{E } \cdot  \vec{dS}  + \iint\limits_{\mathscr{S}_b}\vec{E } \cdot  \vec{dS}\)
Le flux de \(\vec{E}\) est nul à travers \(\mathscr{S}_1 , \mathscr{S}_2 , \mathscr{S}_3 \ et \  \mathscr{S}_4 \)
\(\Phi = \iint\limits_{\mathscr{S}_b}E_z(z)\vec{u_z} \cdot  dS\vec{u_z} +\iint\limits_{\mathscr{S}_b}E_z(-z)\vec{u_z} \cdot  (-dS\vec{u_z})\)
\( \Phi = 2\iint\limits_{\mathscr{S}_h}E_z(z)\cdot  dS = 2 E_z(z)\iint\limits_{\mathscr{S}_h}dS = 2 a² Ez(z)\)
Qint
\(Q_{int}  = \sigma a²\)
Théorème de Gauss
\(2a²Ez(z) = {\sigma a² \over \epsilon_0}\)
\(E_z(z) = {\sigma \over 2 \epsilon_0}\)
On trouve alors : 
\(\vec{E}(M) = {\sigma \over 2 \epsilon_0} \vec{u_z}\) pour z >0
\(\vec{E}(M) = -{\sigma \over 2 \epsilon_0} \vec{u_z}\) pour z >0
--------------------
Q: (Ilyass) On considère un condensateur cylindrique. Montrer que le champ électrostatique en un point quelconque est de la forme \(\vec{E}(M) = E(r)\vec{e_r}\).
R: On a une invariance par rotation autour de l'axe \(Oz\) et une invariance par translation selon \(\vec{u_z}\) donc la norme de \(\vec{E}\) ne dépend que de \(r\).
Puis les plans \((M,\vec{e_r},\vec{e_z})\) et \((M,\vec{e_r}, \vec{e_\theta})\) sont des plans de symétrie de la distribution de charge donc \(\vec{E}(M)\) est selon \(\vec{e_r}\).
Ainsi, \[\vec{E}(M) = E(r) \vec{e_r}\]
--------------------
Q: Victor / On s'intéresse ici au cas d'un condensateur constitué de deux armatures planes métalliques en
regard l'une de l'autre (aire de chaque armature : S), parallèles, distantes de e. Les armatures portent respectivement les densités surfaciques uniformes de charge −σ et +σ. On considèrera les dimensions des armatures beaucoup plus grandes que e, ce qui permet d'utiliser le modèle du condensateur plan illimité.
>>> [IMAGE_ID: Capture d’écran 2023-11-16 225353.jpg] <<<
Déterrminer le champ \(\vec{E}(M)\) .
R: On utilise le théorème de superposition : 
\(\vec{E}(M) = \vec{E_h(}M) + \vec{E_b(}M)\)
avec \(\vec{E_h(}M)\) le champ \(\vec{E}\) crée en M par le plan du haut 
avec \(\vec{E_b(}M)\) le champ \(\vec{E}\) crée en M par le plan du bas
D'après l'expression du champ créé par un plan infini uniformément chargé en surface : 
\(\vec{E_h(}M) = {\sigma \over 2\epsilon_0} \vec{u_z} \)   si \(z > e \) (1)  | \(\vec{E_b(}M) = -{\sigma \over 2\epsilon_0} \vec{u_z} \) si \(z > 0 \) (3)
\(\vec{E_h(}M) = -{\sigma \over 2\epsilon_0} \vec{u_z} \) si \(z < e \) (2)  | \(\vec{E_b(}M) = {\sigma \over 2\epsilon_0} \vec{u_z}\) si \(z < 0 \) (4) 
Alors :
\(z>e\)        : \(\vec{E}(M) = \vec{0} \)             en faisant \((1)+(3)\)
\(0<z<e\) : \(\vec{E}(M) = -{\sigma \over \epsilon_0} \vec{u_z}\)    en faisant \((2) + (3)\)
\(z<0\)        : \(\vec{E}(M) = \vec{0} \)             en faisant \((2) + (4)\)
--------------------
Q: Victor / On s'intéresse ici au cas d'un condensateur constitué de deux armatures planes métalliques en
regard l'une de l'autre (aire de chaque armature : S), parallèles, distantes de e. Les armatures portent respectivement les densités surfaciques uniformes de charge \(−σ\) et \(+σ\). On considèrera les dimensions des armatures beaucoup plus grandes que e, ce qui permet d'utiliser le modèle du condensateur plan illimité.
>>> [IMAGE_ID: Capture d’écran 2023-11-16 225353.jpg] <<<
Déterminer l’expression du potentiel électrostatique \(V(M)\) (on considèrera que \(V = 0\) sur l'armature de densité surfacique négative).
R: \(\vec{E}(M) = -\vec {grad}(V) = -\frac{\partial V}{\partial x}\vec{u_x} - \frac{\partial V}{\partial y}\vec{u_y} - \frac{\partial V}{\partial z}\vec{u_z}\)
pour \(z > e \) :
\(\vec{E} = \vec {0} =>\frac{\partial V}{\partial x}\ =\frac{\partial V}{\partial y} =\frac{\partial V}{\partial z}= 0  => V = cste\)    notons \(V = A\)
pour \(z<0\) :
\(\vec{E} = \vec{0} => V = cste \)      notons \(V = B\)
pour \(0<z<e \):
\(\vec{E} = -{\sigma \over \epsilon_0}\vec{u_z} \) donc \(\frac{\partial V}{\partial x} = \frac{\partial V}{\partial y}= 0 \) donc \(V(z) = {dV\over dz} = {\sigma \over \epsilon_0}\)
soit \(V(x) = {\sigma \over \epsilon_0} z + C \) \((cst)\)
Déterminons \(A,B,C\) sachant que \(V(z)\) est une fonction continue et que \(V(z=0) = 0\) :
\(V(z=0)={\sigma \over \epsilon_0} * 0 + C = C  = 0 \)   
\(V(z=0)=B=0\)       
\(V(z=e) = {\sigma \over \epsilon_0} e=A\)
 Alors \(A ={\sigma \over \epsilon_0} e\)
Bilan : 
pour   \(z<0 \)  : \(V =0\)
pour   \(0<z<e \)  : \(V = {\sigma \over \epsilon_0} z\)
pour   \(z>e\) : \(V(z) = {\sigma \over \epsilon_0}e \)
--------------------
Q: (Océane) Cette figure représente les lignes équipotentielles d'une distribution de charges contituée de deux charges ponctuelles. 
Donner l'allure des lignes de champs 
>>> [IMAGE_ID: im3.jpg] <<<
R: >>> [IMAGE_ID: im1.jpg] <<<
--------------------
Q: (Daouda) Démontrer l'égalité suivante dans un tube de champ: E1S1=E2S2 .
En déduire que dans une zone vide de charge, là où les lignes de champ se reserrent, le champ est plus intense.
R: >>> [IMAGE_ID: paste-c8c9585695c583cd76823e76b283fed4d0b34b2c.jpg] <<<
\(\Phi_1 =\iint_{S_1}  \vec E_1.\overrightarrow dS_1=-E_1 S_1\)
\(\Phi_2 =\iint_{S_2}  \vec E_2.\overrightarrow dS_2=E_2 S_2\)
\(\Phi_3 =\iint_{S_3}  \vec E_3.\overrightarrow dS_3=0\) car en tout point de \(S_3\): \(\vec E \perp \overrightarrow dS_3\) car il sagit de la surface latérale d'un tube de champ constituée de lignes en tout point tangentes au champ.
Donc \(\phi=\phi_1+\phi_2+\Phi_3=-E_1 S_1 + E_2 S_2 \)
De plus \( \unicode{x222F}_{{S}} \vec{E } \cdot  \vec{dS}  =0\) car il n'y a pas de charge à l'intérieur de S
Donc \(E_1 S_1 = E_2 S_2 \)
Et donc si \(S_1 <S_2\) alors \(E_1 >E_2\). Ce qui signifie que là où les lignes de champ se resserent, le champ est plus intense.
--------------------
Q: (Vincent) Ecrire le tableau des analogies entre gravitation et électrostatique.
R: >>> [IMAGE_ID: paste-8274af54e4ef8158c9147e47a8c1d6073f3a1f0a.jpg] <<<
--------------------

==================================================
DECK : M1
==================================================

Q: Yuye / Exemple de mouvement en translation
R: - Translation rectiligne: ascenseur, train sur une voie rectiligne par rapport au sol, ...
- Translation circulaire: nacelle d'une grande roue, ...
- Translation elliptique: référentiel géocentrique par rapport au référentiel héliocentrique, ...
--------------------
Q: Ylan / Définition d'un référentiel R' en translation par rapport à R
R: R' est en translation par rapport à R si les axes liés à R' gardent toujours une direction constante par rapport à ceux liés à R et on peut ensuite choisir les axes liés à R' parallèles à ceux liés à R par exemple: \[\vec{e_x}=\vec{e_{x'}} \text{ , }\vec{e_y}=\vec{e_{y'}} \text{ et }\vec{e_z}=\vec{e_{z'}}\]
--------------------
Q: (INC) Donner la loi de composition des accélérations dans le cas d'une translation de R' par rapport à R
R: \(\)On note O' n'importe quel point fixe dans R': \(\vec { a_{a}}= \vec{a_{r}}+\vec{a_{e}} \) avec \(\vec{a_{c}}=\vec 0\) , \(\vec{a_{e}}= {(\frac {d²\vec{OO'}} {dt²})}_{R}\) ; \(\vec{a_{r}}= {(\frac {d²\vec{O'M}} {dt²})}_{R'}\) et \(\vec{a_{a}}= {(\frac {d²\vec{OM}} {dt²})}_{R}\)
--------------------
Q: Yuye / Dérivée d'un vecteur dans \(\mathcal R\) dans le cas général
R: - Pour un scalaire a(t), quelque soit le mouvement de \(\mathcal R'\) par rapport à \(\mathcal R\):    \(\left(\frac{da}{dt}\right)_\mathcal R = \left(\frac{da}{dt}\right)_\mathcal {R'}\)
       On note alors \(\frac {da}{dt}\) ou \(\dot a\).
- Soient \(x(t)\), \(y(t)\), \(z(t)\) trois scalaires et \(\vec u\), \(\vec v\), \(\vec w\) trois vecteurs. Alors:    \(\left(\frac{d}{dt}(x(t)\vec u + y(t)\vec v + z(t)\vec w)\right)_\mathcal R\)
\(=\left(\frac{d}{dt}x(t)\vec u\right)_\mathcal R+\left(\frac{d}{dt}y(t)\vec v\right)_\mathcal R+\left(\frac{d}{dt}z(t)\vec w\right)_\mathcal R\)
\(=\frac{dx}{dt}\vec u + x(t)\left(\frac{d\vec u}{dt}\right)_\mathcal R + \frac{dy}{dt}\vec v + y(t)\left(\frac{d\vec v}{dt}\right)_\mathcal R + \frac{dz}{dt}\vec w + z(t)\left(\frac{d\vec w}{dt}\right)_\mathcal R\)
--------------------
Q: Ylan / Soit R' un référentiel en translation par rapport à R , \(\vec{u}=a\vec{e_{x'}}+b\vec{e_{y'}}+c\vec{e_{z'}}\), donner la relation qui lie \({( \frac{d\vec{u}}{dt} )}_R \ et \ {(\frac{d\vec{u}}{dt})}_{R'} \)
R: On a que \({( \frac{d\vec{u}}{dt} )}_R ={(\frac{d\vec{u}}{dt})}_{R'} = \dot{a}\vec{e_x}+\dot{b}\vec{e_y}+\dot{c}\vec{e_z}\)car lorsqu'on dérive les axes liés à R' dans R', leur dérivée est nulle et on a que \(\vec{e_x}=\vec{e_{x'}} \text{ , }\vec{e_y}=\vec{e_{y'}} \text{ et }\vec{e_z}=\vec{e_{z'}}\)
Cela signifie donc que lorsque R' est en translation par rapport à R, l'opération de dérivation d'un vecteur est insensible au référentiel.
--------------------
Q: Ylan /
>>> [IMAGE_ID: Capture d] <<<
R: 1. Il est en mouvement de translation rectiligne uniforme 
2. C'est une droite
3. Il la voit se déplacer à une vitesse \(\vec{V}=v\vec e_x\)
4. Il voit la balle comme un point de vitesse nulle
5. \(\vec v_r= \vec 0\)
--------------------
Q: (Arthur) Donner la loi de composition des accélérations dans le cas d'une rotation uniforme de R' autour d'un axe fixe dans R' et dans R
R: [$]\vec{a_a} = \vec{a_r} +  \vec{a_e} +  \vec{a_c} ~[/$] avec :
[$]\\ \cdot~\vec{a_a}=(\frac{d\vec{v}_{M/R}}{dt})_{R} [/$] l'accélération absolue (de M dans R)
[$]\\ \cdot~\vec{a_r}= (\frac{d\vec{v}_{M/R'}}{dt})_{R'}[/$] l'accélération relative (de M dans R')
[$]\\ \cdot~\vec{a_e} [/$] l'accélération d'entrainement
[$]\vec{a_e} = \vec{\Omega}_{R'/R}
 \wedge(\vec{\Omega}_{R'/R} \wedge\vec{O'M})= - {\Omega ^2}_{R'/R} \ \overrightarrow{HM}[/$]
Avec H le projeté orthogonal de M sur l'axe de rotation et O' appartenant à l'axe de rotation.
[$]\cdot~\vec{a_c}[/$] l'accélération de Coriolis 
[$]\vec{a_c} = 2 ~\vec{\Omega}_{R'/R} \wedge\vec{v}_{M/R'}[/$]
--------------------
Q: (Manuel) Laquelle de ces deux figures représente un mouvement de rotation ?
>>> [IMAGE_ID: IMG_0804.JPG] <<<
R: La figure de droite
--------------------
Q: Victor /
Rappler la définition d'un référentiel.
R: Pour étuider le mouvement d'un corps, il est nécessaire de préciser par rapport à quoi nous raisonnons. On se fixe dans un référentiel d'étude. 
On étudie le mouvement de ce corps par rapport à un objet de référence (immobile dans le référentiel d'étude).
--------------------
Q: Victor /
Rappeler la définition d'un repère.
R: On a besoin d'un repère pour donner la position d'un point dans un référentiel.
Un repère est défini par un point (origine) et une base (qui en physique sera orthonormée directe).
--------------------
Q: Victor / 
Soit R et R' deux référentiels. Lorsque R' est en translation par rapport à R, que pouvez-vous dire des vitesses et des accélérations des points fixes de R' dans R? Prouvez-le.
R: Lorsque R' est en translation par rapport à R, tous les points fixes de R' ont à chaque instant même vitesse et même accélération dans R.
Preuve: 
Soit A,B 2 points fixes dans R'.
Comme A,B fixes dans R' , \(\vec{AB}\) est un vecteur constant dans R'
\(=> ({d \vec{AB} \over dt}) _{R'} =\vec{0}\)
Rappel: \(({d \vec{AB} \over dt})_R = ({d \vec{AB} \over dt})_{R'} \) car R' est en translation par rapport à R
Donc  \(({d \vec{AB} \over dt})_R = \vec{0} \) 
Or \(\vec{AB} = \vec{AO} +\vec{OB}\)
\(({d \vec{AB} \over dt})_R = ({d \vec{AO} \over dt})_R+ ({d \vec{OB} \over dt})_{R} = \vec{0}\)
\(({d \vec{OB} \over dt})_R = ({d \vec{OA} \over dt})_{R}\)
\(=> \vec{v_{B/R}} = \vec{v_{A/R}}\)
--------------------
Q: (Manuel) Exprimer \(\overrightarrow{e_{x'}}\) et \(\overrightarrow{e_{y'}}\) en fonction de \(\overrightarrow{e_{x}}, \overrightarrow{e_{y}}\) et \(\theta\). Puis, exprimer \(\left(\frac{\mbox{d}\overrightarrow{e_{x'}}}{\mbox{d}t}\right)_{R}\)et \(\left(\frac{\mbox{d}\overrightarrow{e_{y'}}}{\mbox{d}t}\right)_{R}\)dans ce cas là.
>>> [IMAGE_ID: IMG_EEFB83B295DE-1.jpeg] <<<
R: \[\begin{align}\overrightarrow{e_{x'}} &= \cos(\theta)\overrightarrow{e_{x}} + \sin(\theta)\overrightarrow{e_{y}} 
\\
\overrightarrow{e_{y'}}&= -\sin(\theta)\overrightarrow{e_{x}} + \cos(\theta)\overrightarrow{e_{y}} 
\\
\text{Ensuite}
\\
\left(\frac{\mbox{d}\overrightarrow{e_{x'}}}{\mbox{d}t}\right)_{R} &= \overrightarrow{\Omega}_{R'/R} \wedge \overrightarrow{e_{x'}}=\dot{\theta}   \overrightarrow{e_{y'}}
\\
\left(\frac{\mbox{d}\overrightarrow{e_{y'}}}{\mbox{d}t}\right)_{R} &= \overrightarrow{\Omega}_{R'/R} \wedge \overrightarrow{e_{y'}}=-\dot{\theta}   \overrightarrow{e_{x'}}
\end{align}\]
--------------------
Q: (INC) Citez la loi de composition des vitesses (avec un système M, un réferentiel absolu R et un réferentiel relatif R').
R: [latex]$\vec{v_a} = \vec{v_r} + \vec{v_e}$[/latex]
[latex]\scriptsize{Avec:\begin{itemize}
\item $\vec{v_a}=\overrightarrow {v_{M/R}} $ la vitesse absolue
\item $\vec{v_r}=\overrightarrow {v_{M/R'}}$ la vitesse relative
\item $\vec{v_e}$ la vitesse d'entraînement (vitesse absolue du point coïcident).\newline \end{itemize}[/latex]
Soit: [$]\overrightarrow {v_{M/R}} = \overrightarrow {v_{M/R'}} + \overrightarrow {v_e} [/$]
--------------------
Q: (INC) Pour un réferentiel R' en translation par rapport à un réferentiel R, citez la formule de la vitesse d'entraînement (vitesse absolue du point coïncident).
R: [latex]$\vec{v}_e = {(\frac{d\overrightarrow{OO'}} {dt})}_{R} = \vec{v}_{O'/R}$[/latex]
[latex]\scriptsize{Avec:\begin{itemize}
\item $O$ l'origine du repère de R
\item $O'$ un point fixe quelconque dans R'
\newline\end{itemize}
On dérive par rapport à R !!![/latex]
--------------------
Q: (INC) Pour un réferentiel R' en rotation autour d'un axe fixe dans R (et dans R') avec O et O' confondus et appartenant à l'axe de rotation, donner la vitesse d'entraînement (vitesse absolue du point coïncident).
R: [latex]$\vec{v_e} = \vec{\Omega}_{(R'/R)} \wedge \vec{O'M} = \vec{\Omega}_{(R'/R)} \wedge \vec{HM}$[/latex]
[latex]\scriptsize{Avec:\begin{itemize}
\item $\vec{v_e}$ la vitesse d'entraînement
\item $\vec{\Omega}_{(R'/R)}$ la vitesse angulaire de rotation de R' par rapport à R
\item $H$ le projeté orthogonal de M sur l'axe fixe.\newline\end{itemize} }[/latex]
--------------------

==================================================
DECK : M2
==================================================

Q: (Shems) Qu'est-ce qu'un referentiel galiléen?
R: Un référentiel galiléen est un référentiel dans lequel le principe d'inertie est vérifiée, à savoir que tout objet isolé ou pseudiisolé est soit immobile soit en mouvement rectiligne uniforme dans ce référentiel .
--------------------
Q: V.Iulian 
Tout référentiel [...] rapport à un référentiel galiléen est galiléen
R: en translation rectiligne et uniforme par--------------------
Q: V.Iulian
Si la translation de R' par rapport a R galiléen n’est pas rectiligne ou pas uniforme, R′[...]
R: n’est pas galiléen--------------------
Q: V.Iulian 
Un référentiel en rotation autour d’un axe fixe d’un référentiel galiléen [...]
R: n’est jamais galiléen.--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-9cd3560a5f9a5c4100721b04ab4c28ceaaaf93e5.jpg] <<<
R: >>> [IMAGE_ID: paste-5a57528bd9551b29f65139e8d4887065d643d4ac.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-d77f3722e5a6b97cce4097de2c62d12a8d197b00.jpg] <<<
R: >>> [IMAGE_ID: paste-94c2181742a47574197e38c01becf17fe5e14056.jpg] <<<
Avec O' un point fixe de R'
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-cb677b12d3a6508a44f3f9b492a67a4a71774fca.jpg] <<<
R: Cas de R' en translation par rapport à R: [$]\vec{f_{ic}}=\vec{0}[/$] donc [$]P(\vec{f_{ic}})=0[/$]
Cas de R' en rotation par rapport à R: [$]P(\vec{f_ic}) = (-2m \vec{\Omega}_{R'/R} \wedge \vec{v}_{M/R'} ). \vec{v}_{M/R'}=0[/$]
TPC: [$]\frac{dEc_{/R'}}{dt}=\sum_i P(\vec{F_i})/R'+P(\vec{f_{ie}})/R' [/$]
--------------------
Q: (MAG)Justifier que fic ne travaille pas et exprimer le TEC dans R' non gal.
R: [$]P(\vec{f_ic}) = 0[/$]
En effet lorsque R' est en translation par rapport à R [$]\vec{f_{ic}}=\vec{0}[/$] donc [$]P(\vec{f_{ic}})=0[/$]
et lorsque R' en rotation par rapport à R: [$]P(\vec{f_ic}) = (-2m \vec{\Omega}_{R'/R} \wedge \vec{v}_{M/R'} ). \vec{v}_{M/R'}=0[/$]
csq1: [$]W(\vec{f_{ic}})=\int P(\vec{f_{ic}}).dt=0[/$] i.e. [$]\vec{f_{ic}}[/$] ne travaille pas.
csq2: TEC dans R': [$]\Delta Ec_{/R'}=\sum_i W(\vec{F_i})/R'+W(\vec{f_{ie}})/R' [/$][/$]
--------------------
Q: (MAG) sur l'expl d'un manège avec sièges suspendus à des chaînes:
>>> [IMAGE_ID: paste-a933d76dcbeef4f62508fa32bd894eade0892cea.jpg] >> [IMAGE_ID: paste-162500c424b12166f0f9f7c8345e074e19a42672.jpg] <<<
R: >>> [IMAGE_ID: paste-7d986b294569fcc662beb25c0076c304bcdbb34e.jpg] <<<
--------------------
Q: (Orlan M) Exprimer la force d'inertie de Coriolis et la force d'inertie d'entrainement dans le cas d'une rotation de R' par rapport à R
R: [$]\vec{f_ic} = -2m \vec{\Omega}_{R'/R} \wedge \vec{v}_{M/R'} [/$]
et
[$]\vec{f_ie} = m \Omega^2 \overrightarrow{HM} [/$]
--------------------
Q: (INC) TEM dans R' repère non galiléen
R: [latex] Si $\vec{f_{ie}} $ est conservative, $\vec{f_{ie}}$ dérive d'une énergie potentielle $E_{p,f_{ie}}$ qui est contenue dans $E_m$ et qui est tq: $W(\vec{f_{ie}})=-\Delta E_{p,f_{ie}}$ \newline
Alors TEM: $\Delta Em_{/R'}=\sum_i W(\vec{F}_{iNC/R'}) $ \newline
Si $\vec{f}_{ie}$ est non conservative \newline
TEM: $\Delta Em_{/R'}=\sum_i W(\vec{F}_{iNC/R'})+W(\vec{f}_{ie/R'}) $[/latex]
--------------------
Q: (Orlan M) En partant du PFD écrit dans un référentiel galiléen R, établir l'expression du PFD dans un réfrentiel R' non galileen.
R: On part de la loi de composition des vitesses [$]m \vec{a}_{M/R} = m \vec{a}_{M/R'} + \vec{a_c} + \vec{a_e}  [/$]
de plus [$]m \vec{a}_{M/R} = \sum_i \vec{F_i} [/$]
En réarrangant les termes on a[$]m \vec{a}_{M/R'} = \sum_i \vec{F_i} -m \vec{a_c} - m \vec{a_e} [/$]
avec [$] - m \vec{a_e} [/$] qui est la force d'inertie d'entrainement et [$] - m \vec{a_c} [/$] qui est la force d'inertie de coriolis
--------------------
Q: (Orlan M) Exprimer [$] \vec{f_{ic}} [/$] et [$] \vec{f_{ie}} [/$] dans le cas d'une translation de R' par rapport à R
R: [$] \vec{f_{ic}} = \vec{0} [/$] et  [$] \vec{a_c} = \vec{0} [/$] dans ce cas
et
[$] \vec{f_{ie}} = -m(\frac{d^2 \vec{OO'}}{dt^2})_R [/$]
--------------------

==================================================
DECK : M3
==================================================

Q: (LPB) Comment est défini réellement le poids?
R: On def le poids d'un corps M de masse m de manière expérimentale: C'est la force opposée à la tension d'un fil au bout duquel est accroché le corps, ce dernier étant en équilibre dans le référentiel terrestre (\(\vec{P} = \vec{F_G}+\vec{f_{ie}}\) )
--------------------
Q: (LPB)Donner un exemple de manifestation du caractère non galiléen du référentiel géocentrique
R: L'existence de deux marées hautes et deux marées basses par jour sur Terre
>>> [IMAGE_ID: Capture d’écran 2023-10-07 161935.png] <<<
--------------------
Q: (TS) Donner des exemples qui mettent en évidence le caractère non galiléen du référentiel terrestre.
R: La déviation vers l'est,
Le sens de rotation des cyclones,
Le pendule de Foucault
--------------------
Q: (TS) Donner la vitesse angulaire de rotation du référentiel terrestre par rapport au référentiel géocentrique
R: \(\omega\)= \(\frac{2\pi}{24×3600}\)rad/s=7.3×10\(^{-5}\) rad/s
--------------------
Q: (TS) Donner la vitesse angulaire caractérisant la translation elliptique du référentiel géocentrique par rapport au référentiel de Copernic
R: \(\Omega\)=\(\frac{2\pi}{365×24×3600}\)rad/s=2.0×10\(^{-7}\) rad/s
--------------------
Q: (TS) Quelles forces fera apparaitre le PFD dans RT non galiléen
R: Le poids (qui contient [$] \overrightarrow {f_{ie}}[/$])
La force d'inertie de Cariolis [$] \overrightarrow {f_{ic}}[/$]
D'éventuelles autres forces
--------------------
Q: (B.K.)
>>> [IMAGE_ID: paste-1baa446cfecd2e569059adbdf3a1b56a2baa1f9d.jpg] <<<
Qu'est-ce qui est à l'origine de cette déviation vers l'Est?
Dans l'hémisphère Sud, cette déviation se ferait-elle également vers l'Est?
R: C'est la force d'inertie de Coriolis qui est responsable de cette déviation vers l'Est.
La déviation se ferait également vers l'Est dans l'hémisphère sud.
--------------------
Q: (enzo m) Contexte : Appli 3 Pendule de Foucault
On a les deux équations suivantes :
  \(\begin{cases} \ddot x +\omega_0^2 x \approx 2\Omega sin(\lambda)\dot y \space\space\space\space\space\space\space\space(1)\\  \ddot y +\omega_0^2 y \approx  -2\Omega sin(\lambda)\dot x\space\space\space\space\space(2)  \end{cases}\)
Quelle est la méthode afin d'obtenir une équation différentielle selon Z = x+jy où j2 = -1 ?
R: Méthode : il faut faire (1)+j(2) 
Ce qui nous donne \(\underline {\ddot Z} + \omega_0^2\underline{Z} = -2j\Omega sin(\lambda)\underline{\dot Z}\)
Après avoir résolu cette équation différentielle, on peut trouver x et y avec x=Re(Z) et y=Im(Z).
--------------------
Q: (enzo m) Contexte : Appli 3 Pendule de Foucault 
>>> [IMAGE_ID: paste-bbc6e2689d77ff19edb0d95f4b86e2d6c46539ea.jpg] 0 propre des oscillations ?
R: On a \(T = \left|\frac{2\pi}{\Omega sin\lambda}\right|\) <-- période de rotation du plan d'oscillation
et \(T = \frac{2\pi}{\omega_0}\) <-- période propre des oscillations.
--------------------
Q: >>> [IMAGE_ID: anki appli 2.png] Ziad SABRI
>>> [IMAGE_ID: paste-bf200bd2295b0763724fe5a90ee2df44dbf94cbc.jpg] <<<
Donner en fonction de \(\lambda \) l'expression de l'intensité de pesanteur (\(\vec{g}\)) en un point à la surface de la Terre situé à la latitude \(\lambda\). A quel endroit \(g\) est-elle max? min?
Référentiel terrestre: non gal
Référentiel géocentrique: gal
Vitesse angulaire de rotation de la Terre autour de l'axe des pôle:  \(\Omega\)
Masse et rayon de la Terre: \(m_T\) et \(R_T\)
R: Poids d'un objet de masse \(m\) à la surface de la Terre:
Donc \(\vec{g}=-G \frac{ m_T}{R_T^2} \vec{e_{z_{P}}}-\vec{a_e}=-G \frac{ m_T}{R_T^2} \vec{e_{z_{P}}}+\Omega^2\overrightarrow{HM}\)
Or \(HM=R_T \ cos(\lambda)\) et \(\frac {\overrightarrow{HM}}{HM}=cos(\lambda)\overrightarrow{e_{z_{P}}}-sin(\lambda)\overrightarrow{e_{y_{P}}}\)
Donc \(\vec{g}=-G \frac{ m_T}{R_T^2} \vec{e_{z_{P}}}+\Omega^2 \ R_T \ cos(\lambda) (cos(\lambda)\overrightarrow{e_{z_{P}}}-sin(\lambda)\overrightarrow{e_{y_{P}}})\)
\(g\) est max au pôle sud et min à l'équateur.
--------------------
Q: (B.K.) Quelle force d'inertie permet d'expliquer l'existence de deux marées océaniques hautes par jour sur Terre?
R: C'est la force d'inertie d'entrainement due au fait que le référentiel géocentrique (en translation elliptique dans le réf. Héliocentrique) est considéré comme non galiléen (en considérant le réf. Héliocentrique galiléen).
--------------------
Q: (B.K.) Quelle force d'inertie permet d'expliquer le sens de rotation des cyclones?
Dans quel sens tourne les cyclones dans l'hémisphère Nord? Sud? Expliquer par un schéma.
R: C'est la force d'inertie de Coriolis (en considérant le ref. Terrestre non galiléen et le réf géocentrique galiléen).
Dans le Nord: rotation dans le sens trigo.
Dans le Sud: Rotation dans le sens horaire
>>> [IMAGE_ID: paste-71cc5358ce5c51ce02d2e1d9d2e63300dba80598.jpg] <<<
--------------------

==================================================
DECK : M4
==================================================

Q: \[(F.H)~Valeur~de~\vec{v}_gs_2/s_1~dans~le~cas~de~non~glissement (i.e. cas~de~l'adhérence) :\]
R: \[On~a :\vec{v}_gs_2/s_1 = \vec{0}\]
--------------------
Q: (FH) Loi de Coulomb dans le cas d'un non-glissement :
R: \[\|\vec{T}\| \le fs \|\vec{N}\|~avec~fs~le~coefficient~de~frottement ~statique \]
--------------------
Q: (FH) Loi de Coulomb pour le cas d'un glissement :
R: \[\|\vec{T}\| = fd \|\vec{N}\|~avec~fd~le~coefficient~de~frottement ~dynamique\]
--------------------
Q: (Yannick) Les forces de frottement sont elles conservatives ?
R: Non elles ne sont en général pas conservatives.
--------------------
Q: (Yannick) Quel peut-être le signe de la puissance d'une force de contact ?
R: [latex]Généralement négatif : cas où la réaction tangentielle / force de frottement est une force de freinage \newline
Parfois positif : cas où la force de frottement est motrice. Par expl cas d'un solide S2 fixe par rapport à un solide S1 (adhérence) et que S1, mis en mouvement, met S2 en mouvement.[/latex]
>>> [IMAGE_ID: paste-4636b8c49be9f7c06e3c704079ee7d896489694e.jpg] <<<
--------------------
Q: [latex] Que dire sur la puissance totale ( $P(\vec{R}_{1\rightarrow 2})_{/R}+P(\vec{R}_{2\rightarrow 1})_{/R}$) des forces mises en jeu dans un contact entre 2 solides ? [/latex]
R: [latex]
$P(\vec{R}_{1\rightarrow 2})_{/R}+P(\vec{R}_{2\rightarrow 1})_{/R})=\vec{T}_{1 \rightarrow 2} . \vec{v_g}_{2/1} \leq 0$ \newline
Elle est nulle s'il y a adhérence des 2 solides ($\vec{v_g}_{2/1} =0$) ou si le glissement se fait sans frottement ($\vec{T}_{1 \rightarrow 2}=0$).\newline
Elle est négative s'il y a glissement avec frottement.[/latex]
--------------------
Q: (Yannick) On modélise l'action de contact de S1 sur S2 par une force [$]\overrightarrow {R_{1->2}}[/$] appliqué en un point I de la région de contact, comment se décompose [$]\overrightarrow {R_{1->2}}[/$] ?
R: [$]\overrightarrow {R_{1->2}}[/$] se décompose en :
- Une composante orthogonale au plan tangent π commun aux 2 solides, dirigée de S1 vers S2, notée [$]\overrightarrow {N}[/$] et appelée réaction normale.
- Une composante appartenant au plan π, notée [$]\overrightarrow {T}[/$] et appelée réaction tangentielle ou force de frottement. En absence de frottements:  [$]\overrightarrow {T}=\overrightarrow{0}[/$]
--------------------
Q: (INC) Qu’est-ce que la vitesse de glissement ?
R: La vitesse de glissement de \(S_2 / S_1 \) s'écrit : \(\vec{v_g}_{S_2/S_1} = \vec{v_{I_2}} - \vec{v_{I_1}} \)
(avec \(I\) le point de contact entre les deux solides et \(I_1 \) (resp. \(I_2\)) le point de \(S_1\) (resp. \(S_2\)) confondu avec \(I \) a l'instant \(t\) )
Rem: Elle ne dépend par du référentiel du moment que \(\vec{v_{I_2}}\) et \( \vec{v_{I_1}}\)sont exprimés dans le même référentiel.
--------------------
Q: (Ali H.)
>>> [IMAGE_ID: paste-15e45e099744e7f013048018acad29cb70089200.jpg] <<<
R: >>> [IMAGE_ID: paste-df8555d46ddffcf14f908e9ecc0196305be18f9e.jpg] >> [IMAGE_ID: paste-f7648fa01530ee8a53f75a02aa6d59e2d1197dcc.jpg] <<<
--------------------
Q: (Ali H.)
>>> [IMAGE_ID: paste-82a4bf897e6c97251d4e1891621f532604b33fce.jpg] <<<
R: >>> [IMAGE_ID: paste-2381b673878f19aca319c7abd804505aff2d4a55.jpg] <<<
--------------------

==================================================
DECK : O1
==================================================

Q: (O.M) Quel est le domaine des longueurs d'onde du visible ?
R: Le domaine des longueurs d'onde du visible est entre 400nm (lumière bleu) et 800nm(lumière rouge).
En dessous on a les Ultra Violet
Et au dessus les infrarouges
--------------------
Q: (O.M) Rappeler les loi de Snell-Descartes de la réfraction.
>>> [IMAGE_ID: paste-c7bf83916ccaa57839ec7f7820070209eeb04b43.png] <<<
R: - Le rayon réfracté est dans le plan d'incidence (plan formé par le rayon lumineux incident et la normale au dioptre)
- [$] n_1 \sin (i_1) = n_2 \sin (n_2) [/$]
--------------------
Q: (O.M) Définir les notions de surface d'ondes, onde sphérique et onde plane.
R: Une surface d'onde est l'ensemble des points M tels que: (SM)=cste
avec S est une source ponctuelle.
Une onde sphérique est une onde dont les surfaces d'onde sont des sphères.
Une onde plane est une onde dont les surfaces d'onde sont des plans parallèles entre eux.
--------------------
Q: (O.M) Enoncer le théorème de Malus
R: Les rayons lumineux sont orthogonaux aux surfaces d'ondes
--------------------
Q: (O.M)Comment créer une onde plane à l'aide d'une lentille convergente?
R: Il faut placer une source ponctuelle dans le plan focal objet de la lentille.
>>> [IMAGE_ID: paste-48a3478626e3577356a1c4dabb89e948360635df.jpg] <<<
--------------------
Q: (O.M)
>>> [IMAGE_ID: paste-6880d97333b2c73cc8f6a00f175f3edd591b0df6.jpg] <<<
R: >>> [IMAGE_ID: paste-b2c57ac01cf3c781af9cafb014b0e736004e73b1.jpg] <<<
avec le schema ci contre on a le chemin de la lumière en vert qui se reflechi sur le premier dioptre (AIr/verre) et en bleu le second qui se féfléchit sur le deuxième dioptre (Verre/air).
Le déphasage est dû au fait que le chemin bleu est plus long que le chemin vert. La différence de chemin optique (i.e. la différence de marche) est donc: \(\delta=2\ n_v \ e\) ("chemin bleu moins chemin vert")
A cette différence de marche correspond le déphasage \(\Delta \phi=\frac{2\pi}{\lambda_0} \ \delta=\frac{2\pi}{\lambda_0} \ 2 \ n_v \ e\) ("chemin vert moins chemin bleu" car "le vert est en avance sur le bleu")
A ce déphasage s'ajoute le déphasage dû à la réflexion sur le dioptre Air/Verre. Le déphasage devient
\(\Delta \phi'=\frac{2\pi}{\lambda_0} \ 2 \ n_v \ e +\pi\) ("chemin vert moins chemin bleu")
A ce déphasage correspond la différence de marche:
\(\delta'=\frac{\lambda_0}{2\pi}\Delta\Phi'=2 \ n_v \ e + \frac{\lambda_0}{2\pi}\pi=2 \ n_v \ e +\frac{\lambda_0}{2}\)("chemin optique bleu moins chemin optique vert") remarque: un déphasage de \(\pi \) correspond à une différence de marche de \(\frac{\lambda_0}{2}\).
--------------------
Q: (L.S)
Formule du chemin optique (SM) dans le cas particulier d'un milieu homogène d'indice n.
R: Cas particulier d'un milieu homogène d'indice n:
n=cste et la lumière se propage en ligne droite donc (SM) = n x SM 
avec SM: la distance entre S et M (i.e: la longueur du segment [SM])
--------------------
Q: (O.M)
>>> [IMAGE_ID: paste-0f0c81aa98bc40398c2ebf1c0d23fc8fc47630bb.jpg] <<<
R: 1) nous avons des plans d'angles différents avant et apres la lentille tous les deux etant perpendiculaires aux rayons lumineux
>>> [IMAGE_ID: paste-908f7e57933ff5d07f43f39f477bd0caa338c168.jpg] >> [IMAGE_ID: paste-8a11fcee90ee06a971c4f301f24c39bfe95fe339.jpg] <<<
Nous savons que les chemins optiques (HB) et (AJ) sont égaux.
En effet: \(\varphi(B)=\varphi(H)-\frac{2\pi}{\lambda_0}(HB)\) et \(\varphi(J)=\varphi(A)-\frac{2\pi}{\lambda_0}(AJ)\)
Avec \(\varphi(H)=\varphi(A)\) et \(\varphi(B)=\varphi(J)\) car A et H sont sur la même surface d'onde de même que J et B sont sur la même surface d'onde.
On en déduit bien que (HB)=(AJ)
Or (HB)=n HB et (AJ)=n' AJ (car deux milieux homgènes)
De plus l'angle formé par HAB est \(\theta\) donc \(HB=AB \sin \theta\) et de même l'angle formé par JBA est \(\theta'\)donc \(AJ=AB \sin \theta'\)
Bilan: \((HB)=(AJ)\) implique \(n\ AB\ sin\theta =n'\ AB\ sin\theta'\) soit 
\(n\  sin\theta =n'\  sin\theta'\)
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-238a7158d0fbb60d39022fd285b56f918dd29e0d.jpg] <<<
R: >>> [IMAGE_ID: paste-1a5c9e434fc7fba5cee47a88b0c5589fdd2023f6.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-1fbffd340ad708be06cde27faac42463c5d01824.jpg] <<<
R: >>> [IMAGE_ID: paste-f34dd382a3eb1540065c45ad246b2e942af5a970.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-abf29704c23478669ebd5039478a6523c111b79c.jpg] <<<
Que vaut l'indice du vide?
Que peut-on dire de l'indice d'un milieu homogène autre que le vide?
R: \(n(P)=\frac{c}{v(P)} \) avec \(c=3.10^8 m.s^{-1}\) la vitesse de la lumière dans le vide et \(v(P)\) la vitesse de la lumière en un point P où l'indice optique est \(n(P)\).
L'indice optique du vide vaut 1.
Pour un milieu homogène qui n'est pas le vide, l'indice optique est constant et >1
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-4a3b3502893e774b283a2676369d0093cb0e0f86.jpg] <<<
Exprimer le temps mis par la lumière pour aller de S à M noté \(t_{SM} \)
En déduire l'expression du chemin optique (SM).
Donner sa signification physique.
R: >>> [IMAGE_ID: paste-4f568a91e39081548c0270f83ae524311324eb5a.jpg] SM que la lumière à mis pour aller de S à M dans un milieu qui a priori n'est pas le vide.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-6873a781cb1192efdf16baf4eec431a40cb2af19.jpg] <<<
R: D'après le principe du retour inverse de la lumière. S'il y avait une source ponctuelle en M, la lumière suivrait le même trajet mais en sens inverse.Alors d'après le théorème de Malus, les points A, A' et A'' seraient sur la même surface d'onde. ALors par définition d'une surface d'onde on aurait (MA)=(MA')=(MA").
Conclusion: (AM)=A'M)=(A"M)
>>> [IMAGE_ID: paste-9faa5012850c6ad9639e25a0613e7b83e2dc8127.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-8fd2d6224be55d861eaf41b65cd9d79c32b0f366.jpg] <<<
R: Selon les x croissants pour 1 et 4.
Selon les x décroissants pour 2 et 3.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-390cb59c26a1294587ee88e68cae62913c043f95.jpg] <<<
R: >>> [IMAGE_ID: paste-ec7e86b684f990ff7afa6167e99cfbfdfaffdee8.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.1__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle.
>>> [IMAGE_ID: 6.1.PNG] <<<
R: >>> [IMAGE_ID: paste-73a055b197e1d292b6d4db07cc3d139ebebc4320.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.2__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle.
>>> [IMAGE_ID: 6.2.PNG] <<<
R: >>> [IMAGE_ID: paste-f063776cbb7c0576250e5ab8e21e2b6f3d706359.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.3__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle.
>>> [IMAGE_ID: 6.3.PNG] <<<
R: >>> [IMAGE_ID: paste-3574f56ff02dc7444f84ead0c013a0c3870f9199.jpg] <<<
--------------------
Q: (L.S) __Exercice 6.4__
Sur le schéma ci-dessous, construire la position du point A′ image de A par la lentille. Tracer ensuite l’allure des surfaces d’onde, en supposant que le point A agit comme une source ponctuelle monochromatique.
>>> [IMAGE_ID: 6.4.PNG] <<<
R: >>> [IMAGE_ID: paste-1f7e79eb3eae3a9f6fa526e2156258251e313b9b.jpg] <<<
--------------------
Q: (S.D.S) Une onde plane arrive à incidence normale sur une lame de verre :
>>> [IMAGE_ID: paste-61357fd753bc69fb69b279a50ab605b256f24f74.jpg]
R: D'après la loi de Snell-Descartes (\(n_1 \sin i_1 =n_2 \sin i_2\)), on en déduit que les rayons incidents ne sont pas déviés (car \(i_1=0\) donc \(i_2=0\) cas incidence normale)
Les surfaces d'ondes sont perpendiculaires aux rayons lumineux, mais après la lame, celle des rayons passant par le défaut de la lame est plus proche que celle des autres rayons. Car l'épaiseur \(\Delta e\) induit un retard de phase et qu'une surface d'onde est une surface équiphase. 
>>> [IMAGE_ID: WhatsApp Image 2023-12-10 à 15.48.49_ce6bc42e.jpg]
--------------------
Q: (S.D.S) 
Déphasage entre A et A' ? entre B et B' ? (en fonction de \(e\), \(\Delta e\), \(n_v\)(indice de la lame de verre en gris)  et \(x = AA' = BB'\))
Différence de phase entre A' et B' ?
>>> [IMAGE_ID: paste-59542684149954daa7ee8ef603ab41b7d315ff58.jpg]
R: Déphasage entre A et A' :\(\varphi(A')-\varphi(A)=\frac{-2\pi}{\lambda_0}(AA')=\frac{-2\pi}{\lambda_0}n_VAA_i-\frac{2\pi}{\lambda_0}n_{air}A_iA'\)
  \(\varphi(A')-\varphi(A)=\frac{-2\pi}{\lambda_0}(n_V \ e+n_{air}(x-e))\)
Déphasage entre B et B' :
\(\varphi(B')-\varphi(B)=\frac{-2\pi}{\lambda_0}(BB')=\frac{-2\pi}{\lambda_0}n_VBB_i-\frac{2\pi}{\lambda_0}n_{air}B_iB'\)
\(\varphi(B')-\varphi(B)=\frac{-2\pi}{\lambda_0}(n_V(e+\Delta e)+n_{air}(x-e-\Delta e))\)
Différence de phase entre A' et B' ?
A et B sont sur la même surface d'onde donc 
\(\varphi(A)=\varphi(B)\). Ainsi, après simplification des termes, on obtient :
\(\varphi(B')-\varphi(A')=\frac{-2\pi}{\lambda_0}\Delta e(n_V-n_{air})\)
--------------------

==================================================
DECK : O2
==================================================

Q: (B.R.) Ordre de grandeur de la période temporelle d'une onde lumineuse ?
R: [latex]
$10^{-15}\text{s}$
[/latex]
--------------------
Q: (B.R.) Temps de réponse des detecteurs de lumière ?
R: [latex]
\begin{itemize}
\item oeil : $\tau_r \approx 0,1\text{s}$
\item capteur CCD : $\tau_r \approx 10^{-4}\text{s}$
\end{itemize}
[/latex]
--------------------
Q: (T.S) Décrire le modèle des trains d'onde
R: Une onde lumineuse émise par une source de fréquence \(f_0\) (respectivement \(\lambda_0\) ou \(\omega_0\)) et de largeur \(\Delta f\) (respectivement \(\Delta \lambda\) ou \(\Delta \omega\)) en S est modélisée par une succession de trains d'onde, tous de même durée \(\tau_c \approx \frac{1}{\Delta f} \)pendant lesquels l'onde est parfaitement sinusoïdale de fréquence \(f_0\).
Soit \(a(S,t)=A cos(\omega_0 t+\varphi(S))\) 
Avec \(A\) et \(\omega_0\) des constantes.
Et \(\varphi(S)\) qui reste constant pendant une durée \(\tau_c\) puis l'émission est suspendue et reprend avec une phase 
\(\varphi(S)\)différente et aléatoire.
--------------------
Q: (T.S) un signal dont le spectre a une largeur ∆f va être limité dans le temps d'une durée ∆t telle que :
R: ∆f×∆t\(\approx\)1
--------------------
Q: (T.S) Définir la longueur de cohérence temporelle d'une source, et sa relation avec \(\delta\)(M) pour qu'il y ait des interférences
R: Longeur de cohérence temporelle: \(L_c=c\ \tau_c\)
Pour pouvoir observer des interférences, il faut que:\(\delta(M)<L_c\)
--------------------
Q: (T.S) Citer les ordres de grandeur de Lc dans les cas suivants :
-Lumière blanche
-Lampe à vapeur de mercure
-Laser He-Ne
R: -Lumière blanche\(L_c\approx 0,9\ µm\)
-Lampe à vapeur de mercure\(L_c\approx 0,3 \ mm\)
-Laser He-Ne: \(L_c\approx 400 \ m\)
--------------------
Q: (T.S) Citer les 2 types de systèmes interférentiels + des exemples de ces systèmes
R: Systèmes par division de front d'onde. Exemple: Trous d'Young.
Systèmes par division d'amplitude. Exemple: Interféromètre de Michelson éclairé par une source étendue
--------------------
Q: (LPB) Quelle valeurs particulières prennent l'ordre d'interférences, le déphasage et la différence de marche en M, si M est situé sur une frange brillante ? sur une frange sombre?
R: Sur une frange brillante: l'ordre d'interférence est un entier relatif, le déphasage est un multiple de \(2\pi \) et la différence de marche est un multiple de \(\lambda_0\)
Sur une frange sombre: l'ordre d'interférence \(p(M)=\frac{1}{2}+q\) , le déphasage \(\Phi=\pi +2q\pi\) et la différence de marche \(\delta(M)=\frac{\lambda_0}{2} + q\lambda_0\) avec \(q\in \mathbf{Z}\)
--------------------
Q: (LPB) Définition du contraste?
R: On définit le contraste par la relation \(C = \frac{I_{max} - I_{min}}{I_{max} + I_{min}}\) où \(I_{max}\) et \(I_{min}\) représentent l’intensité lumineuse maximale et minimale sur zone d’observation.
--------------------
Q: (LPB) Formule de Fresnel? Définir le déphasage, l'ordre d'interférence et la différence de marche.
R: >>> [IMAGE_ID: Capture d] <<<
--------------------
Q: Z.S   [latex]{\scriptsize Déterminer\:l'ordre\:de\:grandeur\:de\:$\tau_c$ (durée d'un train d'onde)\:pour\:la\:raie\:verte\:de\:mercure\:(de\:longueur\:d'onde\:moyenne\:$\lambda_0 = 546 nm$\: et de largeur\:$\Delta \lambda=1 nm$)\\.}[/latex]
R: [latex]
{\scriptsize 
Faire\:le\:lien\:entre\:$\Delta \lambda$ et $\tau_c$ 
\\ \\ $\rightarrow$} 
{\tiny 
$f = \cfrac{c}{\lambda}$
} \\ \\
{\scriptsize 
$\rightarrow$ Exprimer\:la\:variation\:de\:f\:quand\:$\lambda$\:varie\:de\:$\Delta \lambda$
} \\ \\
{\tiny 
$\hspace*{6mm}$ $\cfrac{df}{d\lambda} = -\cfrac{c}{\lambda^2}$ \\ 
$\hspace*{4mm}$ $\Rightarrow df = -\cfrac{c}{\lambda^2}\, d\lambda$ \\
$\hspace*{4mm}$ $\Rightarrow \Delta f = -\cfrac{c}{\lambda^2}\, \Delta\lambda$ \\
$\hspace*{4mm}$ $\Rightarrow \tau_c \approx \cfrac{1}{\cfrac{c}{\lambda^2} \, \Delta\lambda} \approx \cfrac{\lambda^2}{c \, \Delta\lambda}$  \; car \;
$\tau_c \approx \cfrac{1}{\Delta f}$ \\ \\ \\
}
{\scriptsize 
A.N : $\cfrac{(546,1 \times 10^{-9})^{-2}}{3 \times 10^{8-9}} \approx 10^{-13}$ \\ \\
$\hspace*{7.5mm}$ $\tau_c \approx 10^{-12}$
[/latex]
--------------------
Q: Critère de cohérence: Quand est-ce que deux ondes sont susceptibles d'interférer en un point M de l'espace? Quelle est alors l'expression de l'intensité lumineuse en M? 
Quelle est l'expression de l'intensité lumineuse en un point M de l'espace où deux ondes se superposent sans interférer?
R: Pour que deux ondes
puissent interférer en un point M où elles se superposent, il faut
qu’elles soient issues d’une même source par division de l’onde,
qu’elles aient même longueur d’onde et que la différence de marche
en M , notée \(\delta(M)\) soit inférieure à la longueur de cohérence
temporelle \(L_c\) de la source.
Alors \(I(M)=I_1(M)+I_2(M)+2\sqrt{I_2 I_2}\ cos(\frac{2\pi}{\lambda_0}\delta(M)) \)
 Si un de ces critères
n’est pas vérifié, les ondes ne peuvent pas interférer. Alors: \(I(M)=I_1 (M)+I_2(M)\)
--------------------
Q: Calcul de l'intensité lumineuse en notation complexe?
R: \(I=\frac{1}{2} K \underline{a}\ \underline{a^*}\)
Avec \(\underline{a}\) le complexe associé à l'amplitude de vibration \(a\) et \(\underline{a^*}\) sont complexe conjugué.
Rappel: avec les grandeurs réelles: \(I=K<a^2 (M,t)>\)
--------------------

==================================================
DECK : O3
==================================================

Q: (Y)
1) Représenter le dispositif des trous d'Young éclairé par une source ponctuelle à distance finie et un écran d'observation à grande distance finie. Tracer les rayons lumineux. 
2) Exprimer la différence de marche et l'intensité lumineuse en un point de l'écran d'observation
R: 1)
>>> [IMAGE_ID: paste-b443fcf093a3ca4302e5e76ea046eb563521e601.jpg] 
D'où :
         \(δ(M) = n (S_2M - S_1M)\)
Ensuite, déterminons l'expression de \( (S_2M - S_1M)\) :
. Coordonnées :   
                          \(M = (x,y,0)\)
                          \(S_1 = (\frac {a}{2},0,-D)\)
                         \(S_2 = (\frac {-a}{2},0,-D)\)
puis \(S_1M = \) \(\sqrt{\left(x - \frac{a}{2}\right)^2 + y^2 + D^2}\)
et \(S_2M =\) \(\sqrt{\left(x + \frac{a}{2}\right)^2 + y^2 + D^2}\)
Puisque \(D >> a, D >> x \space et \space D >> y,\) on va effectuer un développement limité de la forme \((1 + \epsilon)^{\alpha} \approx 1 + \alpha \epsilon\)
d'où :
\(S_1M = \) \(\sqrt{D^2 \left(1 + \frac{(x - \frac{a}{2})^2 + y^2}{D^2}\right)}\)  = \(D \sqrt{1 + \frac{(x - \frac{a}{2})^2 + y^2}{D^2}} \approx D \left(1 + \frac{(x - \frac{a}{2})^2 + y^2}{2D^2}\right)\)
\(S_2M = \) \(D \left(1 + \frac{(x + \frac{a}{2})^2 + y^2}{2D^2}\right)\)
puis : 
         \(\delta(M) = n \cdot \left[ D \left(1 + \frac{(x + \frac{a}{2})^2 + y^2}{2D^2}\right) - D \left(1 + \frac{(x - \frac{a}{2})^2 + y^2}{2D^2}\right) \right]\)
Finalement : 
         \(\boxed{\delta(M) = n \cdot \frac{ax}{D}}\)
Déterminons maintenant l'intensité lumineuse :
D'après la formule de Fresnel :
   \(I = 2I_0 \left(1 + \cos\left(\frac{2\pi}{\lambda_0} \delta(M)\right)\right)\)
d'où 
 \(\boxed{I = 2I_0 \left(1 + \cos\left(\frac{2\pi}{\lambda_0} \cdot n \cdot \frac{ax}{D}\right)\right)}\)
--------------------
Q: Quand dit-on que les interférences sont non localisées ? Donner un exemple.
R: Lorsque les interférences sont visibles et bien contrastées quelque soit la position de l’écran
dans le champ d’interférence, ont dit que les interférences sont non localisées. (Exemple: interférences obtenues avec les trous d'Young)
--------------------
Q: Pour une source centrée ou excentrée donner l'interfrange  \(i \) dans le cas du montage des trous d'Young sans lentilles.
R: L'interfrange \(i\) s'exprime : \(i = \frac{\lambda _0 D}{n_{air}\ a}\)
--------------------
Q: \((F.H)~Déterminer~la~différence~de~marche~pour~le~dispositif~ci-dessous : \)
>>> [IMAGE_ID: imgfh1.jpg] <<<
R: \(\delta(M) =(SM)_2-(SM)_1 = n_{air}(SS_2+S_2M-SS_1-S_1M)\)
\(= n_{air}(SS_2-SS_1) + n_{air}(S_2M-S_1M)\)
\(Or~S_2M-S_1M = \frac{ax}{D}~(Trous~de~Young~classique)~et~par~analogie,~ SS_2-SS_1 = -\frac{ab}{l} \)\(On~a~alors~\delta(M) = n_{air}(\frac{ax}{D}-\frac{ab}{l})\)
--------------------
Q: (F.H) Réaliser le schéma du montage avec 2 lentilles :
R: >>> [IMAGE_ID: paste-9a60a5058a996c2a13547706b58d971c86f71533.jpg] <<<
Faire uniquement le tracer des rayons rouges.
--------------------
Q: \((F.H)~Déterminer~la~différence~de~marche~pour~le~dispositif~ci-dessous : \)
>>> [IMAGE_ID: imgfh3.jpg] <<<
R: Imaginons qu'il y ait en M une source ponctuelle. Dans ce cas, d'après le principe du retour inverse de la lumière le trajet suivi par la lumière serait le même mais en sens inverse. Alors d'après le théorème de Malus, dans ce cas, \(S_1\) et \(H\) seraient sur le même plan d'onde. Nous en déduisons que \((S_1 M)=(HM)\)
\(\delta(M)=(SM)_2-(SM)_1=(SS_2)+(S_2M)-(SS_1)-(S_1M)\)
Or \(S_1\) et \(S_2\) sont sur le même plan d'onde donc \((SS_1)=(SS_2)\)
et donc
\(\delta(M)=(S_2M)-(S_1M)=(S_2H)+(HM)-(S_1M)=(S_2H)\)
Or \((S_2 H)=a sin \theta\) et dans les condition de Gauss
\(sin\theta\approx tan\theta=x/f'_2\)
Donc \((S_2 H)\approx \frac{ax}{f'_2}\)et \(\delta(M)=\frac{n_{air} a x}{f'_2}\)
--------------------
Q: \((F.H)~Exprimer~la~différence~de~phase~\Delta\phi(M)~dans\ le\ cas \ où\ ~\delta(M)=\frac{ax}{f'_2}\)
R: \(\begin{align}On~a~\Delta\phi(M)&=\frac{2\pi}{\lambda_0}\delta(M)\\ &= \frac{2\pi ax}{\lambda_0 f'_2}     \end{align}\)
--------------------
Q: (F.H) Expression de l'interfrange pour un montage des trous d'Young avec une lentille convergente après les trous d'Young et un écran dans le plan focal image de cette lentille:
R: \(On~a:~i=\frac{\lambda_0f'_2}{n_{air} a}\)
--------------------
Q: (Y)
Sachant que l'intensité lumineuse de la figure d'interférences obtenue avec le montage ci-dessous s'écrit:\(\boxed{I = 2I_0 \left(1 + \cos\left(\frac{2\pi}{\lambda_0} \cdot n \cdot \frac{ax}{D}\right)\right)}\)
>>> [IMAGE_ID: paste-b443fcf093a3ca4302e5e76ea046eb563521e601.jpg] <<<
Déterminer l'allure des franges d'interférences.
Donner l'expression de l'interfrange.
Donner les positions de franges brillantes et de franges sombres.
R: On remarque que \(I\) ne dépend que de x : les points sur l'écran qui ont même intensité lumineuse ont la même coordonnée x. Les franges d'interférences sont donc des droites d'équation \(x = cst\) perpendiculaires à la direction de \([S_1S_2]\)
L'interfrange correspond à la période spatiale de la fonction \(I(x)\) soit \(i=\frac{2\pi}{\frac{2\pi}{\lambda_0} \frac{na}{D}}=\frac{\lambda_0 D}{na}\)
Positions des franges brillantes : 
(On considère ici n = 1)
Soit \(q\) un entier relatif
     \( \boxed { p(M) = \frac{\delta(M)}{\lambda_0} =\frac{\ a\ x}{\lambda_0D}} \ =q\ \Leftrightarrow \ \frac{ax}{D} = q\lambda_0 \Leftrightarrow\boxed {x_{franges brillantes} =  q \left(\frac{D \lambda_0}{a}\right)}\)
Positions des franges sombres :
\(\frac{\delta(M)}{\lambda_0}  = q + \frac{1}{2} \Leftrightarrow  \frac{ax}{D} =\lambda_0 (q + \frac{1}{2})\ \Leftrightarrow  \boxed {x_{frangessombres}
 =  (q+\frac{1}{2}) \left(\frac{D \lambda_0}{a}\right)}\)
--------------------

==================================================
DECK : O4
==================================================

Q: (M.S) Quels sont les éléments constitutifs de l'interféromètre de Michelson ?
R: Deux miroirs M1 et M2, une séparatrice (SP), une compensatrice (C), des vis de rotation (rapide et lente) et une vis de chariotage.
--------------------
Q: (M.S) Comment sont positionnés les miroirs M1 et M2 l'un par rapport à l'autre ?
R: Ils sont presque perpendiculaires.
--------------------
Q: (M.S) Quel est l'angle approximatif formé par la séparatrice avec les miroirs ?
R: Environ 45°.
--------------------
Q: (M.S) À quoi servent les vis de rotation rapide et lente ?
R: À modifier l'angle entre les deux miroirs
--------------------
Q: (M.S) Quelle est la fonction de la lame semi-réfléchissante appelée séparatrice (SP) ?
R: Elle réfléchit une partie de la lumière et en transmet une autre partie.
Cela permet d'effectuer une division de l'onde et de faire de superposer deux rayons lumineux issus d'une même source mais ayant suivi des chemins différents.
--------------------
Q: (M.S) Quelle est la fonction de la vis de chariotage ?
R: Elle permet de translater le miroir M1.
--------------------
Q: (M.S) Quel est le rôle du VAC (verre anticalorique) à l'entrée du Michelson ?
R: Filtrer le rayonnement infrarouge source d'échauffement et d'endommagement des éléments optiques
--------------------
Q: (M.S) À quel angle d'incidence arrive le faisceau lumineux sur la séparatrice du Michelson ?
R: Environ 45°
--------------------
Q: (M.S) Comment peut-on modifier la différence de marche entre les deux rayons lumineux dans le Michelson ?
R: En faisant tourner les miroirs ou en chariotant pour translater le miroir qui peut l'être.
--------------------
Q: (M.S) Qu'est-ce qu'une source secondaire dans l'interféromètre de Michelson ?
R: Ce sont les points d'où semblent provenir les rayons lumineux après réflexion sur les miroirs M1 et M2 et sur la séparatrice.
--------------------
Q: >>> [IMAGE_ID: paste-c17d437c97f3bbf3f4ed711c99e018069921b86b.jpg] >> [IMAGE_ID: paste-8a64e728b34680870d0170f9fe9c2e51a6fa1d44.jpg] <<<
R: 1.
\(\space \delta(M) = 2n_{air} \alpha x\)
\(\begin{align}I(M) &= 2I_0(1+\cos(\frac{2\pi}{\lambda_0}\delta(M)))\\ &=2I_0(1+\cos(\frac{2\pi}{\lambda_0}2n_{air} \alpha x))\\ &=2I_0(1+\cos(\frac{4\pi}{\lambda_0}n_{air} \alpha x(M)))\\  \end{align}\)
\(I(M) \text{ constante} \implies x(M)\text{ constante}\)
Équation d'une frange, les franges sont des droites parallèles à l'arête de coin d'air
2.
\(p(M) = \frac{\delta(M)}{\lambda_0} = \frac{2n_{air}\alpha x}{\lambda_0}\)
3.
\(2n_{air}\alpha x_q = q\lambda_0\) avec \(q\in \mathbb{Z}\)
\(\begin{align}i &= x_{q+1} - x_q\\ &= \frac{\lambda_0}{2n_{air}\alpha}\end{align}\)
4.
\(\delta = 2 n_{air} e(x)\)
D'une frange brillante à la suivante \(\delta\) varie de \(\lambda_0\) donc \(e \text{ varie de } \frac{\lambda_0}{2n_{air}}\approx \frac{\lambda_0}{2}\)c'est bien ce qui figure sur le schéma.
5.
 Diminuer l'angle du coin d'air permet de se rapprocher du contact optique.
6.
 Lorsqu'on se rapproche du contact optique l'interfrange augmente.
7.
 Lorsque l'on translate \(M_1\), le montage reste un montage coin d'air. Les franges restent rectilignes, l'interfrange n'est pas modifiée. Les franges vont défiler dans le sens du glissement de l'arête du coin d'air.
--------------------
Q: (M.S) Qu'est-ce qu'un schéma équivalent de l'interféromètre de Michelson ?
R: Un schéma où la séparatrice et le miroir M2 sont remplacés par un miroir virtuel M'2 (Le miroir virtuel est le symétrique de M2 par rapport à la séparatrice.).
>>> [IMAGE_ID: paste-d07d84a1f13b8af6982560be0ba3e124ca557624.jpg] <<<
--------------------
Q: (M.S) Quelle figure d'interférences est observée dans la configuration du coin d'air , dans la configuration de la lame d'air et  dans la configuration du contact optique ?
R: Dans la configuration du coin d'air, on observe des franges rectilignes appelées franges d'égale épaisseur.
>>> [IMAGE_ID: paste-a3d5a705a818368d1da37f0122ff6c7d746e1f15.jpg] >> [IMAGE_ID: paste-4223f67d2af5c4eb29fa2b09005fbbf651ba46bb.jpg] >> [IMAGE_ID: paste-47c013e3cf015048cca208a22e792ce8bb1282c6.jpg] <<<
--------------------
Q: (C.E.) Condition d’éclairage pour un interféromètre de Michelson réglé en lame d’air :
R: Ce qui différencie un anneau d’un autre est l’angle d’incidence 𝑖. Pour observer des anneaux concentriques de rayons variables il faut donc que la source lumineuse émette un faisceau constitué de rayons d’angles variables pour que ces rayons arrivent sous des incidences variables sur la lame d’air.
Dans la pratique il faut faire converger la lumière sur les miroirs en utilisant un condenseur (lentille de très courte focale).
Remarque : faire converger la lumière sur les miroirs permet également d’augmenter la luminosité de la figure d’interférences.
--------------------
Q: (C E) Condition d’observation pour un interféromètre de Michelson réglé en lame d’air :
R: Les interférences étant localisées à l’infini, on peut les observer en projetant l’image sur un écran placé au foyer image d’une lentille convergente.
Rem: On peut aussi les observer à l’œil nu (pas dans le cas 
d’une source laser), en regardant le miroir 𝑀2, mais sans accomoder et en plaçant une feuille de papier entre 
la source et le condenseur pour ne pas être ébloui (et pour que la feuille absorbe les UV de la lampe à vapeur 
de mercure)
--------------------
Q: (C.E.) Conditions d’éclairage et d’observation pour un interféromètre de Michelson réglé en coin d’air :
R: Éclairage par un faisceau de lumière quasi parallèle sous incidence quasi normale pour que 𝛿 ≈ 2 e(𝑀) (avec e(M) l'épaisseur locale du coin d'air)
Observation : Les interférences étant localisées au voisinage des miroirs, on peut les observer en faisant l’image du miroir 𝑀2 sur l’écran à l’aide d’une lentille convergente
Rem: On peut aussi les observer à l’œil nu (pas dans le cas d’une source laser), en regardant le miroir 𝑀2, et en plaçant une feuille de papier entre la source et le condenseur pour ne pas être ébloui (et pour que la feuille absorbe les UV de la lampe à vapeur de mercure).
--------------------
Q: Quelle est l'espression de la différence de marche dans le cas d'un Michelson réglé en coin d'air? Où sont localisées les interférences?
R: Différence de marche: \(\delta(M)\approx 2 n_{air} e(M)\)
Les interférences sont localisées au voisinage des miroirs.
--------------------
Q: Etablir l'expression de la différence de marche dans le cas d'un Michelson réglé en lame d'air. Où sont localisées les interférences?
R: Les interférences sont localisées à l'infini.
>>> [IMAGE_ID: paste-07ac48dd5b6af09d4fbe94e765ffc7d4bec2e7fb.jpg] <<<
e
\(\delta(M)=(SM)_2 -(SM)_1=[(SI)+(IJ)+(JK)+(KM)]-[(SI)+(IM)]\)
Or \((IJ)=(JK)\) donc \(\delta(M)=2(IJ)+(KM)]-(IM)\)
De plus d'après le principe du retour inverse de la lumière + le théorème de Malus \((LM)=(KM)\)
Donc \(\delta(M)=2(IJ)+(KM)]-(IL)-(LM)=2(IJ)-(IL)=n_{air} (2 \ IJ - IL)\)
Or \(cos(i)=\frac {e}{IJ}\) donc \(IJ=\frac{e}{cos(i)}\)
De plus \(sin(i)=\frac{IL}{IK}\) donc \(IL=IK \ sin(i)\)
et comme \(tan(i)=\frac{IK/2}{e}\) soit \(IK=2\ e \ tan(i)\)
On obtient : \(IL=2\ e\ tan(i) \ sin(i)=2\ e\ \frac{sin^2 (i)}{cos(i)} \)
Finalement: \(2\ IJ - IL=\frac{2\ e}{cos(i)}-2\ e \frac{sin^2 (i)}{cos(i)}= \frac {2e}{cos(i)} \ (1-sin^2 (i))=2e\cos(i)\)
Bilan: \(\delta(M)=2\ n_{air} \ e \ cos(i)\)
--------------------
Q: (C.J)
>>> [IMAGE_ID: schémaexo2optique4.PNG] max et pmin ?
2) Que se passe t'il quant au nombre d'anneaux si θmax augmente ?
R: 1) On a alors  \(p(M)=\frac{2e cos(i)}{\lambda_0}\)p est maximal au centre de la figure d'interférence (centre des anneaux) lorsque i = 0. Donc \(p_{max}=\frac{2e}{\lambda_0}\) 
p diminue lorsqu'on s'éloigne du centre de la figure d'interférence, ainsi comme imax = θmax  on a  
\(p_{min}=\frac{2e cos(\theta_{max})}{\lambda_0}\)
2)Si θmax augmente alors pmin diminue et on voit plus d'anneaux
--------------------
Q: (L.L) Comment annuler l'angle \(\alpha\) du coin d'air dans un interféromètre de Michelson ?
R: Pour annuler \(\alpha\), il faut faire tourner un des deux miroirs dans le sens qui augmente l'interfrange jusqu'à ce que l'on ne voit plus qu'un champ uniforme sur l'écran.
--------------------
Q: (L.L) Qu'observe-t-on au contact optique dans un interféromètre de Michelson?
R: Au contact optique, l'épaisseur de la lame d'air et l'angle du coin d'air sont nuls. La différence de marche devient donc nulle pour tout rayon incident sur la surface des miroirs. L'éclairement sur l'écran devient uniforme, et aucune frange n'est visible.
--------------------
Q: (A.R) Dans un Michelson en lame d'air, quelle est l'expression de la différence de marche \(\delta(M)\) en fonction de l'épaisseur \(e\) de la lame et de l'angle d'incidence \(i\)
R: \(\delta(M) = 2\ n_{air}\ e\cdot cos(i)\)
--------------------
Q: (A.R) Quelle est l'allure de la figure d'interférence en lame d'air ? en coin d'air ? Justifier
R: - En lame d'air, l'intensité lumineuse en un point de l'écran ne dépend que de l'angle d'incidence donc les franges sont circulaires.
- En coin d'air, l'intensité lumineuse en un point de l'écran dépend de l'épaisseur d'air traversée dans le coin d'air, on a donc des franges qui sont des droites parallèles à l'arête du coin d'air.
--------------------
Q: (A.R) En lame d'air, comment évolue la figure d'interférence lorsque l'on diminue l'épaisseur de la lame d'air ? Quel est le cas limite ?
R: Lorsque l'on diminue l'épaisseur de la lame d'air, on diminue le rayon des anneaux de la figure d'interférence.
On fait rentrer les anneaux. On voit de moins en moins d'anneaux.
Le cas limite est appelé contact optique. On observe alors une seule couleur unie sur tout l'écran appelée teinte plate.
--------------------
==================================================
DECK : Electrocinetique Sup
==================================================

Q: <span style="color: rgb(0, 255, 0);">Enzo M. : Rappeler la loi des noeuds (ou 1ère loi de KIRCHHOFF)
R: La somme des intensités entrantes au niveau d'un noeuds est la même que la somme des intensités sortantes.
>>> [IMAGE_ID: paste-a875116a7e9cde9cfbf5e0ccac0068dba8cc26e8.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(ALI) Donner les impédances complexes d'une résistance, d'un condensateur et d'une bobine
R: [latex]
\begin{itemize}
\item Pour une résistance : $\underline{Z_R} = R$
\item Pour un condensateur : $\underline{Z_C} = \frac{1}{jC\omega}$
\item Pour une bobine: $\underline{Z_L} = jL\omega$
\end{itemize}
[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Donner le temps caractéristique d'un circuit RC série.
R: \(\tau\) = RC
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Quelles sont les 5 étapes de résolution d'une équation différentielle ?
R: - Résolution de l'équation homogène
- Trouver la solution particulière
- Exprimer la solution générale
- Utilisation des conditions initiales (si eq. diff. de t) ou conditions les conditions aux limites (si éq. diff. d'une coordonnée de l'espace)
- Exprimer la solution
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Exprimer le temps caractéristique d'un circuit RL série
R: \(\tau\) = L / R
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Donner la méthode générale pour faire un bilan d'énergie dans un circuit électrique
R: On multiplie la loi des mailles par i.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Thomas S) Donner 3 méthodes graphiques pour déterminer \(\tau\)
R: - Tracer la tangente en 0, l'intersection entre la tangente et l'asymptote se fait en t= \(\tau\)
- On multiplie le max (resp. la tension initiale) par 0.63 (resp. par 0.37). Cette valeur est atteinte en \(\tau\)
- Le temps de réponse à 5% est égal à 3 \(\tau\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Thomas B. : 
>>> [IMAGE_ID: Resistance_serie.jpg] <<<
Que vaut R<sub>eq</sub> dans cette situation ?
R: R<sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub>
--------------------
Q: <span style="color: rgb(0, 255, 0);">Thomas B. :
>>> [IMAGE_ID: Resistance_derivation.jpg] <<<
Quelle relation est vérifiée par R<sub>eq</sub> ?
R: 1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub>
--------------------
Q: <span style="color: rgb(0, 255, 0);">Thomas B. :
>>> [IMAGE_ID: Pont_diviseur_tension.jpg] <<<
Donner la relation vérifiée par U<sub>1</sub>.
R: >>> [IMAGE_ID: Reponse.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Yannick) En régime stationnaire, que deviennent le condensateur et la bobine ?
R: Condensateur : interrupteur ouvert
Bobine : fil
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Yannick) Que peut on dire au sujet de la tension aux bornes d'un condensateur et de l'intensité du courant à travers une bobine ?
R: Ces deux gandeurs sont continues.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Yannick) Dans un circuit du premier ordre, quel est la durée du régime transitoire ?
R: 5𝜏 (système à environ 1% de son régime permanent)
3𝜏 (Le système à environ 5% de son régime permanent)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Yannick) Donner l'expression de l'énergie stockée pour un condensateur et pour une bobine
R: Condensateur : 1/2 Cu²
Bobine : 1/2 Li²
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Polynôme caractéristique de l'équation différentielle linéaire d'ordre 2 d'un oscillateur amorti?
R: \[r^2+\frac{\omega_0}{Q}r+\omega_0^2=0\]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Ylan.M) 
Etablir l'équation différentielle d'un circuit LC série en fonction de la tension aux bornes du condensateur et donner l'expression de la pulsation propre.
>>> [IMAGE_ID: circuit_lc.png] <<<
R: <div style="text-align: center;">
\[\begin{align*}
\quad & E = U_L + U_C \quad \text{(loi des mailles)}\\
\quad & E = L\frac{di(t)}{dt} + U_C(t)\quad \text{(loi de comportement de la bobine)}  \\
 \quad & \frac{E}{LC} = \frac{d^2U_C(t)}{dt^2} + \frac{U_C}{LC} \quad \text{(loi de comportement du condensateur)} \\ 
\quad & {\omega_0^2 E} = \frac{d^2U_C(t)}{dt^2} +{\omega_0^2 U_C}
\end{align*}\]
\[\text{avec } \omega_0 = \frac{1}{\sqrt{LC}}  \]<div style="text-align: center;">
<div style="text-align: center;">\[\text{On a également la période propre } T_0=\frac{2\pi}{\omega_0}  \]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) Définition d'un signal périodique
R: Un signal s est périodique s'il existe une période T tel que, pour tout instant t, s(t + T) = s(t)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) Définition de la valeur moyenne d'un signal périodique
R: La valeur moyenne d'un signal s(t) de période T est définie par :
>>> [IMAGE_ID: paste-56aebc31db44e9d93c215d00112bf878c4a56ce5.jpg] <<<
avec t0 une valeur arbitraire de t.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-743958c0904d925a12665b574b91a2cc9b47492c.jpg] <<<
R: >>> [IMAGE_ID: paste-20774f5297ef4a9db5493c39c01414d95b01ab1a.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-4614d20ae09b3d2e954a251b660db8e509ef7fc0.jpg] <<<
R: >>> [IMAGE_ID: paste-a9fade0521a66e2190b0f3bd077583d74186cd96.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) 
>>> [IMAGE_ID: paste-a1b33d92be280d5327038721267a3ce75b498c39.jpg] <<<
R: >>> [IMAGE_ID: paste-a5de9621785538ff1a8bd34e0b9c8c5e12065ae5.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Adrien) Etablir l'équation differentielle verifié par la tension aux bornes d'un condensateur pour un circuit RC série.
R: On obtient :
\(\frac{dUc}{dt} + \frac{1}{\tau} Uc = \frac {E}{\tau}\)
Avec:
-\(\tau = RC\)
-\(Uc\) la tension aux bornes du condensateur
-\(E \) la tension aux bornes du generateur (\(E=0\) si il n'y a pas de generateur)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Ylan)
\[\text{Etablir l'équation différentielle d'un circuit RLC série en fonction de } U_C(t) \text{ et donner l'expression de la pulsation propre }\omega_0 \text{ et du facteur de qualité Q}\]<div style="text-align: center;">
>>> [IMAGE_ID: circuit_rlc.png] <<<
R: <div style="text-align: center;">Pour un circuit RLC série, on a :<div style="text-align: center;">
\[\begin{align*}
E &= U_R + U_L + U_C \quad  \\
E &= Ri(t) + L\frac{di(t)}{dt} + U_C\text{ (loi de comportement de la résistance et de la bobine)} \\
E &= RC\frac{dU_C(t)}{dt} + LC\frac{d^2U_C(t)}{dt^2} + U_C\text{ (loi de comportement du condensateur)} \\
\frac{E}{LC} &= \frac{d^2U_C(t)}{dt^2} + \frac{R}{L}\frac{dU_C(t)}{dt} + \frac{U_C}{LC} \\
{\omega_0^2 E } &= \frac{d^2U_C(t)}{dt^2} + \frac{\omega_0}{Q}\frac{dU_C(t)}{dt} + {\omega_0^2 U_C}
\end{align*}\]\[\text{avec } \omega_0 = \frac{1}{\sqrt{LC}} \text{ et } Q=\frac{1}{R}\sqrt{\frac{L}{C}}\]\[\text{On a également la période propre } T_0=\frac{2\pi}{\omega_0}  \]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Adrien) Etablir l'equation differentielle vérifiée par l'intensité du courant traversant une bobine dans un circuit RL série.
R: On obtient :
\(\frac{di}{dt} + \frac{i}{\tau} = \frac{E}{L}\)
Avec:
-\(\tau = \frac{L}{R}\)
-\(i\) l'intensité du courant traversant la bobine
-\(E\) la tension aux bornes du générateur (\(E = 0\) si il n'y a pas de generateur)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Rappler les racines du polynôme caractéristique pour un oscillateur amorti dans un circuit RLC pour un facteur de qualité \(Q <\) \(1 \over 2\)
R: Le polynômes admet 2 racines réeles \(r_\pm\) : 
\(r_\pm  = - {\omega_0 \over 2Q} \pm {\omega_0 \over 2Q} {\sqrt{1-4Q^2}}\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Rappler les racines du polynôme caractéristique pour un oscillateur amorti dans un circuit RLC pour un facteur de qualité \(Q = {1 \over 2}\)
R: Le polynôme admet une racine double \(r \) :
\(r = -{\omega_0 \over 2Q} = -\omega_0 \)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Rappler les racines du polynôme caractéristique pour un oscillateur amorti dans un circuit RLC pour un facteur de qualité \(Q > {1 \over 2}\)
R: Le polynôme admet deux racines complexes \(r _ \pm\) :
\(r_\pm = -\mu \pm j\Omega = - {\omega_0 \over 2Q} \pm j\omega_0 \sqrt{1-{1\over 4Q^2}}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Fabien) Montrer que dans un circuit RC série, l'énergie  Eg fournie par le générateur lors de la charge complète du condensateur est égale à [$]\Delta Eg = C*E^2[/$]
R: >>> [IMAGE_ID: IMG_3659.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) 
>>> [IMAGE_ID: paste-5c580b54ddcbcda3567244ebc5af86fe324dfefb.jpg] <<<
R: >>> [IMAGE_ID: paste-54e6f7af394dbf01d43255f48b46884890c3c498.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-7daead3eabe97baa10a9badbd45a8ba413b1056a.jpg] <<<
R: >>> [IMAGE_ID: paste-d39adeb88745a3553b98945ae6b81101a138c7b5.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Que signifient régime transitoire et régime permanent?
R: Le régime permanent désigne l'état du circuit dans lequel toutes les grandeurs (tensions, courants, ...) ont la même forme que celle imposée par le générateur (parfois absent alors les grandeurs sont constantes).
Le régime transitoire est l'état du circuit entre deux régimes permanents.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-c7506d0c9ea7ea333e9711a7220077602ceada38.jpg] <<<
R: >>> [IMAGE_ID: paste-01b9b3b01a7c056184bedec16e2186431a05c7c7.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-6ffb549f053d20b3edf276c81961358393584927.jpg] <<<
R: >>> [IMAGE_ID: paste-83a1d539943ae0259a6ab113e94371972fd973e5.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-8da3d9322669ec0fea282482a257199d5f0a7822.jpg] <<<
R: >>> [IMAGE_ID: paste-5012b3a89fead189350f6b727c41fe47add60629.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-d810e793d4ca64fb16b3eb4a4c03eaa8b9cda1c6.jpg] <<<
R: >>> [IMAGE_ID: paste-633360169cefe5a7ec5f43411c4802cd209a3045.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG) 
>>> [IMAGE_ID: paste-93aefadadfcbbd4ba98185e6adc003b9ce323085.jpg] <<<
R: Le gain en dB augmente de 20 dB
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-1f762087a245a059c1607e01a888a3be883519aa.jpg] <<<
R: >>> [IMAGE_ID: paste-28369efd4e03afaf7f085f3e1cd2503d5eef290d.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(MAG) 
>>> [IMAGE_ID: paste-9365e88f44c99dcded4f17ec25c9f94af0e9e6ec.jpg] <<<
R: >>> [IMAGE_ID: paste-fbb7ee4524ac441a40d4738f748679dcd47a11cd.jpg] <<<
--------------------
Q: >>> [IMAGE_ID: Circuit.jpg] <<<
<span style="color: rgb(0, 255, 0);">(Lenny) Le condensateur est initialement chargé, de tension E.
qu'elle est l'expression de u(t) pour t > 0 (avec τ = RC)
R: u(t) = E*e^(-t/τ)
On a u(t = 0) = E et le condensateur se décharge dans la résistance.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Vlas.I
Le gain en dB est défini par:
R: >>> [IMAGE_ID: img7718006153195699032.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Lenny) La tension u vérifie l'équation différentielle suivante :
>>> [IMAGE_ID: équation.jpg] <<<
Qu'elle est la solution en régime permanent ?
R: >>> [IMAGE_ID: solution.jpg] <<<
En régime permanent on a u = cste. Donc du/dt = 0 puis on isole u.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Vincent M.) A quelle condition sur l'amplitude du signal découvre-t-on la résonance?
R: Lorsque l'amplitude du signal passe un maximum pour une certaine pulsation, nommée pulsation de résonance.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Victor /
Réaliser un bilan d'énergie sur le circuit RLC 
>>> [IMAGE_ID: Circuit RLC-63531ab1913debd4b8c81857268740d95d937fdd.png] <<<
et expliquer chaque terme.
R: La loi de mailles donne :
\(e = u_R + u_L + u_c \)
On multiplie la loi des mailles par l'intensité du courant : 
\(ei = u_Ri + u_Li + u_c i\)
\(=>P_g = P_j +  {dE_L\over dt} + {dE_c\over dt} \)
\(=> P_g = P_j +  {d \over dt}(E_L+E_c)\)
avec \(P_g\) : puissance fournie par le générateur
       \(P_j \)  : puissance dissipée par effet Joule 
         \(E_L\) : énergie emmaganisée par la bobine
         \(E_c\) : énergie stockée par le condensateur
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Balthazar) 
Solution homogène d'une équation différentielle dde la forme: 
[latex]\scriptsize $\frac{\text{d}x}{\text{d}t} + \frac{x}{\tau} = 0$ [/latex] ?
R: [latex]\scriptsize $x_h(t) = Ae^{-t/\tau}$. [/latex]
avec [latex]\scriptsize $A \in \mathbb{R}$. [/latex] :
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Manuel BT.) Donner l'impédance équivalente [latex]$\underline{Z_{\text{éq}}}$[/latex] dans ce circuit 
>>> [IMAGE_ID: IMG_0C8AE9F25B52-1.jpeg] <<<
R: [latex]$\underline{Z_{\text{éq}}} = R + \frac{R - RLC\omega^2}{1+jRC\omega - LC\omega^2}$[/latex]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Balthazar) Solution particulière d'une équation différentielle de la forme: 
[latex]\scriptsize $\frac{\text{d}x}{\text{d}t} + \frac{x}{\tau} = \frac{X_1}{\tau}$, [/latex]
R: On pose, pour [latex]\scriptsize $B \in \mathbb{R}$ [/latex], la solution constante : 
[latex]\scriptsize $x_p(t) = B$.[/latex]
On obtient alors en injectant dans l'équation :
[latex]\scriptsize $0 + \frac{B}{\tau} = \frac{X_1}{\tau}$. [/latex]
Ainsi 
[latex]\scriptsize $x_p(t) = B = X_1$.[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Manuel BT.) Dans un circuit RLC série en régime sinusoïdal forcé, le courant le parcourant est d'amplitude complexe :
[latex]
$\underline{I_{m}} = \frac{I_{0}}{1+jQ\left( \frac{\omega}{\omega_{0}} - \frac{\omega_{0}}{\omega}\right)}$ 
[/latex]
Donner alors l'équivalent de son amplitude réelle [latex]$|\underline{I_{m}}|$[/latex] en BF et en HF et la fréquence [latex]$\omega$[/latex] où [latex]$|\underline{I_{m}}|$[/latex] est au maximum.
R: [latex]\begin{itemize}
\item En BF : $|\underline{I_{m}}| \underset{\text{BF}}{\longrightarrow} 0$
\item En HF : $|\underline{I_{m}}| \underset{\text{HF}}{\longrightarrow} 0$
\item Amplitude max : $|\underline{I_{m}}| = I_{0}$ (lorsque $\omega = \omega_{0}$)
\end{itemize}
[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Océane A.) En quoi la bobine est-elle équivalente en basses fréquences? en hautes fréquences?
R: • BF  → un fil
• HF → un interrupteur ouvert
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Océane A.) Donner l'expression de l'amplitude complexe de u(t) avec :
[latex]$u(t) = U_{0} \cos \left(\omega t + \frac{\pi}{4}\right)$[/latex]
R: [latex]$\underline{U_{0}} = U_{0}e^{j\frac{\pi}{4}} = \frac{U_{0}}{\sqrt{2}}(1+j)$[/latex]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(Océane A.) En quoi le condensateur est-il équivalent en basses fréquences? en hautes fréquences?
R: • En BF → un interrupteur ouvert
• En HF → un fil
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Océane A.) En régime sinusoïdal forcé à la pulsation [latex]$\omega$[/latex], à quoi les opérations de dérivation et d'intégration sont-elles équivalentes?
R: [latex]\begin{itemize}
\item Dériver $\Longleftrightarrow \times j\omega$
\item Intégrer $\Longleftrightarrow \times \frac{1}{j\omega}$
\end{itemize}[/latex]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Daouda C.) Donner la relation entre le facteur de qualité ([latex]$Q$[/latex]), la pulsation de résonance ([latex]$\omega_{0}$[/latex]) et la bande passante à -3dB ([latex]$\Delta\omega$[/latex]) d'un filtre passe bande d'ordre 2. Comment varie la largeur de la bande passante selon le facteur de qualité ([latex]$Q$[/latex]) ?
R: [latex]$Q = \frac{\omega_{0}}{\Delta\omega}$[/latex]
 Plus Q est grand, plus le pic de résonance est étroit i.e. plus la largeur de la bande passante est faible i.e. plus [latex]$\Delta\omega$[/latex] est faible.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quelle est la forme d'une équation différentielle d'un oscillateur harmonique ? (cas d'un circuit LC pour la pulsation propre)
R: \(\frac{d^{2}\alpha }{dt^{2}}+ \omega_{0}^{2}\alpha = cste\) avec \(\omega_{0} = \frac{1}{\sqrt{LC}}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quelle est la forme de la solution homogène d'un OH ?
R: \(s_{h}(t) = A*\cos{(\omega_{0}t)} + B*\sin{(\omega_{0}t)}=C*\cos{(\omega_0 t + \Phi)}=D*\sin{(\omega_0 t + \Phi')}\) 
avec A et B ou C et \(\Phi\) ou encore D et \(\Phi'\) à determier grâce aux C.I. .
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quelle est la relation entre la periode propre et la pulsation propre des oscillations de l'OH ?
R: \(T_0 = \frac{2\pi}{\omega_{0}}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Quel est le circuit étudié en tant que modèle de l'OH ?
R: Circuit LC série
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Dans un circuit LC sans source, l'énergie est elle conservée ?
R: Oui, on a \(P_{C} + P_{L} = 0\)
Donc \(dE/dt=0\) soit \(E=cste\)
avec :
\(P_{C}\) la puissance reçue par le condensateur
\(P_{L}\) la puissance stockée par la bobine.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Comment peut-on exprimer l'amplitude complexe de la tension aux bornes d'un condensateur dans un circuit RLC ?
R: [latex]$\underline{U_c} = \frac {E_0}{1-\frac{\omega^2}{\omega_0^2}+ j \times \frac{\omega}{\omega_0 \times Q }}$[/latex]
<div style="text-align: center;">[$]Q = \frac{1}{R} \sqrt{\frac{L}{C}}[/$]
<div style="text-align: center;">[$]\omega_0 = \frac{1}{\sqrt{LC}} [/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Determiner la fonction transfert d un filtre passe bas d ordre 1 dans un circuit RC :
R: Avec un pont diviseur de tension on obtient :
\(\underline{H} (j\omega)=\frac{\underline{u_s}}{\underline{u_e}}=\frac{1}{1+jRC\omega}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Determiner la fonction transfert d'un filtre passe haut d ordre 1 dans un circuit RC.
R: Avec un pont diviseur de tension on a :
\(\underline{H} (j\omega)=\frac{\underline{u_s}}{\underline{u_e}}=\frac{jRC\omega}{1+jRC\omega}\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">Leo S./Cyril J. : Exprimez la charge q d'un condensateur en fonction de sa capacité C et de la tension à ses bornes U
R: \[q = C \cdot U\]
\(q\) en coulomb (C)
\(C\), la charge du condensateur en Farat (F)
\(U\) en Volt (V)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Quelle est l'expression de l'amplitude complexe associé à l'intensité du courant dans le circuit RLC série en RSF ?
R: [$]\underline{I} = \frac{I_0}{1+jQ(\frac{\omega}{\omega_0}-\frac{\omega_0}{\omega})}[/$]
avec 
<div style="text-align: center;">[$]I_0 = \frac{e}{R}[/$]
<div style="text-align: center;">[$]Q = \frac{1}{R} \sqrt{\frac{L}{C}}[/$]
<div style="text-align: center;">[$]\omega_0 = \frac{1}{\sqrt{LC}} [/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Que peut-on dire de la résonance en intensité dans le circuit RLC série
R: <div style="text-align: left;">[$]\underline{I} = \frac{I_0}{1+jQ(\frac{\omega}{\omega_0}-\frac{\omega_0}{\omega})}[/$]<div style="text-align: left;">donc [$]|\underline{I}|[/$] est maximal, quand le dénominateur est minimal.
<div style="text-align: left;">ie lorsque [$]\omega = \omega_0[/$] et donc il y'a toujours résonance lorsque [$]\omega = \omega_0[/$] quelque soit la valeur de Q.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Mohammed S.) Quel est le lien entre la bande passante et le facteur de qualité ?
C'est quoi la bande passante à -3dB?
R: <div style="text-align: center;">[$]Q = \frac{\omega_0}{\Delta\omega}=\frac{f_0}{\Delta f}[/$]<div style="text-align: center;">
>>> [IMAGE_ID: bande_passante.jpg] <<<
<div style="text-align: left;">La bande passant à - 3dB est la plage de fréquence sur laquelle  [$]Amplitude\geqslant \frac{Amplitude_{max}}{\sqrt{2}}=\frac{Amplitude (\omega=\omega_0)}{\sqrt{2}}[/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Soit \(Q < \frac{1}{2}\) ou \(\Delta > 0\), donner la forme de la solution de l'équation différentielle homogène dans ce cas.
R: Pour \(Q < \frac{1}{2}\), on a alors \(\alpha_h(t)= Ae^{r_+t}+Be^{r_-t}\) avec \(A \) et \(B\) deux constantes à déterminer avec les CI et \(r_{\pm}\) les racines du polynôme caractéristique. Ce système est en régime apériodique.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Soit \(Q = \frac{1}{2}\) ou \(\Delta = 0\), donner la forme de la solution de l'équation différentielle homogène dans ce cas.
R: Pour \(Q = \frac{1}{2}\), on a alors \(\alpha_h(t) = (At + B)e^{r_0t}\) avec A et B deux constantes à déterminer avec les CI et \(r_0\) la racine double du polynôme caractéristique. Ce système est en régime critique.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Soit \(Q> \frac{1}{2}\) ou \(\Delta<0\), donner la forme de la solution de l'équation différentielle homogène dans ce cas.
R: Pour \(Q> \frac{1}{2}\), on a alors \(\alpha_h(t) = e^{-\mu t} (Acos(\Omega t) + B sin(\Omega t)=Ce^{-\mu t} cos(\Omega t+\Phi)=De^{-\mu t} sin(\Omega t+\Phi')\)avec A et B ou C et \(\Phi\) ou encore D et \(\Phi'\) à determier grâce aux C.I. , et avec \(-\mu \pm j \Omega\) les racines du polynôme caractéristique. Ce système est en régime pseudo-périodique.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Alexis R. : Qu'est-ce qu'un conducteur ohmique ?
R: Il s'agit d'un conducteur qui vérifie la loi d'Ohm :\[U = R \cdot I\]Les résistances sont des conducteurs ohmiques.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Alexis R. : Quelle est l'influence de la convention choisie sur un dipôle.
R: La convention choisie (générateur ou récepteur) n'influence pas les résultats. Les changements apportés par un changement de convention s'annulent toujours.
--------------------
Q: <span style="color: rgb(0, 255, 0);">Alexis R. : Quelle est la formule mettant en relation la puissance et l'énergie ? Quelle est la formule de la puissance pour un circuit électrique
R: Puissance et énergie : \[P = \frac {d\varepsilon} {dt}\]Puissance dans un circuit électrique : \[P = U \cdot I\]L'interprétation dépend de la convention choisie.
--------------------
Q: <span style="color: rgb(255, 170, 0);">Alexis R. : Donnez la définition de la tension.
R: La tension entre deux points du circuit est définie comme la différence de potentiel entre ces deux points. 
NB : Le potentiel électrique est défini à une constante additive près.
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-8b53223b85c32cebddf51d33474919cb08cb5f51.jpg] <<<
R: >>> [IMAGE_ID: paste-512e14081d84d08894df5446eb66a7dcf352acbf.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG)
>>> [IMAGE_ID: paste-01da042bbe0dde84885ab703c5c7e5c3d02a88f4.jpg] <<<
R: >>> [IMAGE_ID: paste-7a794527c9322c97ab32307d02da3b2d26c52a31.jpg] <<<
--------------------
Q: (MAG)
>>> [IMAGE_ID: paste-c8470044d81547260799d88c9a7ed866d58ef226.jpg] <<<
R: >>> [IMAGE_ID: paste-3039a51ec61bcc1d4c2d34d296376f287a4d0f8d.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(MAG)
>>> [IMAGE_ID: paste-37de55c62dd770061713d705b70e5962561d2145.jpg] <<<
R: >>> [IMAGE_ID: paste-aa07df7df60e8b1ef18471915ce6f54b1d742344.jpg] <<<
--------------------


==================================================
DECK : MQ MPI
==================================================

Q: Qu’est-ce qu’une barrière de potentiel ?
R: C'est une marche de potentiel d’extension limitée.
>>> [IMAGE_ID: paste-c2bd4b96488b55df53548509aa1162b53e0ba5f4.jpg] <<<
--------------------
Q: Qu’est-ce que l’effet tunnel ? Citer des applications
R: Dans le cas de l'étude d'une barrière de potentiel : Si la décroissance de la fonction d’onde dans la barrière de potentiel est suffisamment lente, on peut s’attendre à ce que la probabilité de présence soit non nulle de l’autre côté de la barrière (une particule quantique a donc la possibilité de traverser la barrière de potentiel) : c’est l’effet tunnel.
Applications : microscope à effet tunnel, radioactivité alpha
>>> [IMAGE_ID: paste-4a85ca8e92e755c5fcbea42714506c4c37d0a7e9.jpg] <<<
--------------------
Q: Quel est l’influence de la largeur et de la hauteur de la barrière de potentiel sur l’effet tunnel ?
R: La probabilité de transmission diminue très rapidement lorsque:
- la largeur de la barrière augmente,
- la hauteur de la barrière vue par la particule soit \(V_0-E\) augmente
--------------------
Q: Comment se comporte une particule quantique lorsqu'elle rencontre la marche de potentiel ?
R: Pour E>V0 :
>>> [IMAGE_ID: paste-238eaf4ac206714e0288ba0a46d07211430b993d.jpg] <<<
Dans la zone I, la fonction d’onde est la superposition d’une OPPM incidente et d’une OPPM réfléchie.
Dans la zone II, il s'agit d'une OPPM transmise. Contrairement à la particule classique, la particule quantique a une probabilité non nulle de se réfléchir sur la marche, et cette probabilité est d'autant plus importante que l'énergie de E est proche de V0.
Pour 0<E<V0 :
>>> [IMAGE_ID: paste-2bbc4d9da7acd5186a02712131f447d2e993dfe0.jpg] <<<
Dans la zone I, la fonction d’onde est la superposition d’une OPPM incidente et d’une OPPM
réfléchie.
Pour E<V0, dans la zone II, il s’agit d’une onde évanescente, et la densité de
probabilité de présence dans la zone II n’est donc pas rigoureusement nulle au-delà de la marche. Cela signifie que la mesure de la position de la particule peut conduire à une valeur positive de son abscisse, contrairement aux prévisions classiques.
--------------------
Q: Quelles sont les conditions de continuité de la fonction d’onde ?
R: >>> [IMAGE_ID: paste-503d75a14b6c2d0987b9d12926bcc2d01e1db8da.jpg] <<<
--------------------
Q: Comment établir les solutions de l’équation de Schrödinger indépendante du temps dans le cas d’une particule
incidente sur une marche de potentiel ? Exploiter les conditions de continuité de la fonction d’onde.
R: Déja le potentiel est constant égale à [latex]$V_0$[/latex], l’équation de Schrödinger devient [latex]$ \frac{d^{2}\varphi}{dx^2}  + \frac{2m(E-V_0)}{\bar{h}^2} \varphi(x) = 0 $[/latex]
Dans la cas oû [latex]$E>V_0$[/latex] 
dans la région 1 
la solution de l’équation de Schrödinger est de la forme 
[latex]$\varphi_1(x) = A_1\exp(ik_1 x) + B_1\exp(-ik_1 x)$[/latex] avec  [latex]$ k_1 = \frac{\sqrt{2mE}}{\bar{h}} $[/latex]
dans la région 2
[latex]$\varphi_2 (x) = A_2\exp(ik_2 x) + B_2\exp(-ik_2 x)$[/latex] avec  [latex]$ k_2 = \frac{\sqrt{2m(E-V_0)}}{\bar{h}} $[/latex]
puis on sait que [latex]$\psi(x) = f(t)\varphi(x)$[/latex] avec \(f(t)=exp(-i \frac{E}{\hslash} t)=exp(-i\omega t)\)
donc
 [latex]$\psi_1 (x) = A_1\exp(-i(wt-k_1 x) + B_1\exp(-i(wt+k_1 x)$[/latex] 
 [latex]$\psi_2 (x) = A_2\exp(-i(wt-k_1 x)  $[/latex] 
Remarque : le terme [latex]$B_2\exp(-i(wt+k_1 x) $[/latex] est impossible car c'est une onde qui se propage selon [latex]$-u_x$[/latex] alors qu'il n'existe aucune source qui peut être à l'origine de cette onde ni aucun obstacle de potentiel.
Maintenant on va exploiter les condition de continuité de la fonction d'onde 
[latex]$\varphi_1 (x=0) = \varphi_2(x=0) \rightarrow A_1+B_1=A_2$[/latex]
[latex]$\varphi_1' (x=0) = \varphi_2'(x=0) \rightarrow A_1-B_1=\frac{k_2}{k_1}A_2$[/latex]
on trouve alors 
[latex]$A_2= \frac{2k_1}{k_1+k_2}A_1$[/latex]
[latex]$B_1= \frac{k_1-k_2}{k_1+k_2}A_1$[/latex]
on choisit [latex]$A_1=1$[/latex] et on retrouve 
>>> [IMAGE_ID: paste-e01397cac5a386e78f0e6b82d32827ed48f4a333.jpg] <<<
Dans le cas oû [latex]$E<V_0$[/latex]
la solution de l’équation de Schrödinger est de la forme:
dans la zone 1 x<0
[latex]$\varphi_1(x) = A_1\exp(ik_1 x) + B_1\exp(-ik_1 x)$[/latex] avec  [latex]$ k_1 = \frac{\sqrt{2mE}}{\bar{h}} $[/latex]
dans la zone 2 x>0
[latex]$\varphi_2 (x) = B_2\exp(-qx)$[/latex] avec  [latex]$ q = \frac{\sqrt{2m(V_0-E)}}{\bar{h}} $[/latex] 
Rem: Pas de terme en [latex]$ B_1\exp(qx)$[/latex] qui diverge quand \(x \rightarrow +\infty \)
par analogie avec ce qu'on a trouvé dans le cas [latex]$E>V_0$[/latex]  (en remplaçant donc \(ik_2\) par \(-q\) soit \(k_2\) par \(iq\)),on retrouve  
>>> [IMAGE_ID: paste-e9426f4c38c2a8f19999e41c811cffd47d29ef9f.jpg] <<<
--------------------
Q: Que peut-on dire de l’énergie de la particule confinée? Que vaut son énergie lorsqu’elle est dans son état fondamental ?
R: >>> [IMAGE_ID: paste-4f63251a51c64707992844072d2e4e1ac1823f1f.jpg] <<<
--------------------
Q: Les solutions de l’équation de Schrödinger dans le cas d’états stationnaires d’une particule de masse \(m\) dans un puits de potentiel infini de largeur \(a\)?
R: >>> [IMAGE_ID: paste-a1fb0088b24b8e2d826cf21403e2df150910cbcc.jpg] <<<
--------------------
Q: Ordre de grandeur de l'énergie de confinement ?
R: [$]E_{min} \approx \frac{\hbar ^2}{2ma^2} [/$]
--------------------
Q: Montrer, en prenant l’exemple simple du cours, qu’une superposition de deux états stationnaires (caractérisé par les fonctions d’onde d’énergie respectivement Er et Es) engendre une évolution au cours du temps de l’état de la particule.
R: [$]\psi(x,t) = \lambda_1 e^{-i\frac{E_r}{\hbar}t}\varphi_r(x) + \lambda_2 e^{-i\frac{E_s}{\hbar}t}\varphi_s(x)[/$]
La densité de probabilité de présence associée cet état de la particule s’écrit :
[$]|\psi(x,t)|^2 = |\lambda_1 \lambda_2| (|\varphi_r(x)|^2 + |\varphi_s(x)|^2 + 2\varphi_r(x)\varphi_s(x)\cos(\frac{E_s - E_r}{\hbar}t))[/$]
On remarque que la densité de probabilité de présence dépend explicitement du temps : l’état de la particule n’est donc pas stationnaire, il évolue au cours du temps.
--------------------


==================================================
DECK : Reaction Acide Base
==================================================

Q: Qu'est-ce qu'un acide fort?
R: Un acide fort est un acide qui réagit totalement avec l'eau suivant la réaction d'équation:
\(AH+ H_2O_{(l)} \rightarrow A^{-} + H_3O^{+}_{(aq)}\)
Un acide fort dans l'eau se convertit totalement en \(H_3O^{+}\).
--------------------
Q: Qu'est-ce que la constante d'acidité (
\(K_A\)) d'un couple acide/base (noté \(AH/A^ {-}\)). Son expression?
R: C'est la constante d'équilibre de la réaction de l'acide du couple avec l'eau d'équation:
\(AH+H_2O_{(l)} \rightarrow A^{-} + H_3O^ {+}_{(aq)}\)
Son expression est \(K_A=\frac{[A^{-}]_{éq}[H_3O^{+}]_{éq}}{[AH]_{éq} C°}\)
--------------------
Q: Qu'est-ce qu'un acide?
Qu'est-ce qu'une base?
R: Un acide est une entité chimique pouvant céder un proton \(H^{+}\). On le note \(AH\).
Une base est une entité chimique pouvant capter un proton \(H^{+}\). On la note \(A^{-}\).
--------------------
Q: Donner les couples de l'eau et leur \(pK_A\).
R: L'eau est la base dans le couple \(H_3O^{+}/H_2O\) de \(pK_A=0\).
L'eau est l'acide dans le couple \(H_2O/HO^{-}\) de \(pK_A=14\).
--------------------
Q: Qu'est-ce que le produit ionique de l'eau? Quelle est sa valeur? son expression?
R: C'est la constante d'équilibre de la réaction d'autoprotolyse de l'eau d'éq:
\(2H_2O_{(l)}=H_30^{+}_{(aq)} +HO^{-}_{(aq)}\)
Il est noté \(K_e=\frac{[H_3O^{+}]_{éq}[HO^{-}]_{éq}}{C°^2}=10^{-14}\) à \(25°C\).
--------------------
Q: Quelle est la définition du pH d'une solution?
R: \(pH=-log\frac{[H_3O^{+}]}{C°}\)
--------------------
Q: Comment calculer \([H_30^{+}]\) et 
\([H0^{-}]\) quand on connait le pH de la solution?
R: \([H_30^{+}]=10^{-pH}\) et \([H0^{-}]=10^{pH-14}\)
--------------------
Q: Comment calculer un \(K_A\) quand on connait \(pK_A\)et inversement?
R: \(pK_A=-log K_A\) et \(K_A=10^{-pK_A}\)
--------------------
Q: Donner la relation qui lie le pH d'une solution avec le \(pK_A\) d'un couple \(AH/A^{-}\) qui y est présent.
R: \(pH=pK_A+log\frac{[A^-]_{éq} }{[AH]_{éq}}\)
--------------------
Q: Quelle est la forme du couple qui domine lorsque \(pH>pK_A\)? \(pH<pK_A\)? \(pH=pK_A\)?
R: Lorsque \(pH<pK_A\): C'est la forme acide qui domine: \([AH]>[A^-]\)
Lorsque  \(pH>pK_A\): C'est la forme basique qui domine: \([AH]<[A^-]\)
Lorsque  \(pH=pK_A\): Aucune des deux formes ne domine: \([AH]=[A^-]\)
--------------------
Q: On mélange dans l'eau, les deux membres du couple \(CH_3COOH/CH_3COO^{-}\) de \(pK_A=4,8\) ainsi que les deux membres du couple \(NH_4^{+}/NH_3\) de \(pK_A=9,2\).
Quelles réactions peuvent se produire? Que valent leurs constantes d'équilibre? Quelle est celle qui se fera dans les plus grandes proportions (qui aura le plus grand avancement à l'équilibre)?
R: \(NH_{3(aq)} + CH_3COOH_{(aq)}\rightarrow CH_3COO^{-}_{(aq)}+NH_{4(aq)}^{+}\) ;  \(K°=10^{9,2-4,8}=10^{4,4}\) réaction que l'on peut considérer comme totale (qui aura le plus grand avancement à l'équilibre).
\( CH_3COO^{-}_{(aq)}+NH_{4(aq)}^{+} \rightarrow NH_{3(aq)} + CH_3COOH_{(aq)}\) ;  \(K°=10^{4,8-9,2}=10^{-4,4}\)réaction qui ne se fait presque pas
\(H_20_{(l)}+CH_3COO^{-}_{(aq)} \rightarrow CH_3COOH_{(aq)}+HO^{-}_{(aq)}\) ; \(K°=10^{4,8-14}=10^{-9,2}\) réaction qui se fait encore moins.
\(2H_2O_{(l)} \rightarrow H_3O^{+}_{(aq)}+HO^{-}_{(aq)}\); \(K°=10^{-14}\) réaction qui se fait encore moins.
--------------------


==================================================
DECK : T1
==================================================

Q: <span style="color: rgb(255, 170, 0);">(E.M) Quels sont les 3 modes de transferts d'énergie thermique ?
R: La conduction (aussi appelée diffusion thermique), la convection et le rayonnement.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.M) Qu'est ce que la conduction thermique ?
R: C'est un transport d'énergie thermique à travers un milieu matériel (solide ou fluide) sans déplacement macroscopique de matière.
La conduction thermique est présente partout où il y a de la matière dont la température n'est pas uniforme.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Définition de la puissance thermique/flux thermique \(\phi\) et son unité ?
R: >>> [IMAGE_ID: paste-25188068b698be55467f25e4252bcf0a0fa3a135.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Dans quelle direction se font les transferts thermiques ?
R: Des zones chaudes vers les zones froides.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Donner la loi de Fourier.
R: >>> [IMAGE_ID: paste-6bb5e882e6c73155c5dff2e491dde6d1ea5a27f1.jpg] <<<
avec 
. \(\vec j_{th}\) le vecteur densité de flux thermique/de courant thermique
. λ est la conductivité thermique, c'est une grandeur positive caractéristique du matériau dans lequel a lieu le transfert thermique. Unité : W. m<sup>-1</sup>.K<sup>-1</sup>.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.M.) Quelle est l'expression, en fonction de j<sub>th</sub>,<sub> </sub>du transfert thermique δQ à travers une surface S, dans le sens indiqué par \(\vec {dS}\), pendant dt ?
R: >>> [IMAGE_ID: paste-62e583638ff04222da7b2bf3553df5515750e080.jpg] <<<
avec j<sub>th</sub> en W.m<sup>-2</sup>
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Donner l'expression du flux thermique \(\phi \) à travers une surface S en fonction du vecteur densité de flux thermique \(\vec {j_{th}}(M, t)\) ?
R: On a :  \(\phi = \int\int _{M\in S} \vec j_{th}.\overrightarrow dS\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.M) Dans quels cas la loi de fourier n'est-elle pas valable ?
R: - lorsque le gradient de température \(\overrightarrow{grad} \space T\) varie trop rapidement dans le temps par rapport au temps d'établissement du flux thermique
- lorsque le gradient de température \(\overrightarrow{grad} \space T\) est trop grand
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.M) Donner l'unité de la conductivité λ et son ordre de grandeur pour :
- un métal bon conducteur (Ag, Cu)
- du verre
- l'air
R: Unité : W.m<sup>-1</sup>.K<sup>-1
</sup>- acier : 50 W.m<sup>-1</sup>.K<sup>-1</sup>
- du verre : 1 W.m<sup>-1</sup>.K<sup>-1</sup>
- l'air : 0.03 W.m<sup>-1</sup>.K<sup>-1
</sup>- eau liquide (P et T usuelles): 0,6 W.m<sup>-1</sup>.K<sup>-1</sup>
--------------------
Q: <span style="color: rgb(255, 170, 0);">(S.D.) Analogie entre Conduction thermique et électrique
R: >>> [IMAGE_ID: paste-95bd659b9be99e7c9c5963100bb46f59593aa905.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(S.D.)
>>> [IMAGE_ID: paste-014ad9b052028d394823d5ae894648df45012490.jpg] <<<
R: 1. Il s'agit bien d'une association en série car le flux thermique est le même à travers chacun des matériaux.
>>> [IMAGE_ID: ex1.jpeg] <<<
2. Vitrage simple : \(R_{th_{SV}}=\frac{3e}{\lambda_v S}\)
Vitrage double : \(R_{th_{DV}}=R_{th_1}+R_{th_2}+R_{th_3} = \frac{e}{\lambda_v S} + \frac{e}{\lambda_a S} + \frac{e}{\lambda_v S} = \frac{e}{S}\big(\frac{2}{\lambda_v}+\frac{1}{\lambda_a}\big)\)
On fait le rapport avec les données de l'énoncé : \(\frac{R_{th_{DV}}}{R_{th_ {SV}}} = 11,7\)
3. Les pertes thermiques en hiver sont en fait les flux thermiques allant de l'intérieur vers l'exterieur.
On rappelle : \(T_{int} - T_{ext} = R_{th}\phi_{int \rightarrow ext}\)
D'où : \(\phi_{SV} = \frac{T_{int} - T_{ext}}{R_{th_{SV}}}\) et \(\phi_{DV} = \frac{T_{int} - T_{ext}}{R_{th_{DV}}}\)
On fait le rapport : \(\frac{\phi_{DV}}{\phi_{SV}} = \frac{R_{th_{SV}}}{R_{th_{DV}}} = \frac{1}{11,7}\)
On a donc \(\phi_{SV} = 11,7\phi_{DV}\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">[Z.S] Conduction thermique dans une barre - problème unidimensionnel en coordonnées cartésiennes
>>> [IMAGE_ID: paste-5bc4bdf6dd1615bfe2f6fdfb42b08d6fffb77cb2.jpg] <<<
Etablir une relation différentielle entre la température et le vecteur densité de flux thermique. Puis l'équation de la diffusion thermique.
R: Réponse: \(µ c \frac{\partial T}{\partial t}+\frac{\partial j_{th}}{\partial x}=0\) et \(\frac{\partial^2 T}{\partial  x^2}- \frac{1}{D}\frac{\partial T}{\partial t}=0\)
Démonstation:
Choix du système étudié: Portion de barre: cylindre de section S et de largeur dx
Expression de dH: \(dH=C dT=cµS \ dx (T(x,t+dt)-T(x,t)=cµS \ dx\ \frac{\partial T}{\partial t}\)
Expression de \(\delta Q\) (transfert thermique algébriquement reçu par le système pendant dt):
\(\delta Q=\delta Q_1 + \delta Q_2\)
avec \(\delta Q_1\): le transfert thermique qui entre dans le système par la face situé en \(x\) pendant dt
\(\delta Q_2\): le transfert thermique qui entre dans le système par la face situé en \(x+dx\) pendant dt
En notant \(\phi (x,t)\) le flux thermique dans le sens \(+\overrightarrow{u_x}\) : \(\delta Q_1=\phi (x,t) dt\) et \(\delta Q_2=- \phi (x+dx,t) dt\)
Donc \(\delta Q=\phi (x,t) dt-\phi (x=dx,t) dt=- \frac {\partial \phi}{\partial x} dx \ dt\)
1er principe (évolution isobare): \(dH=\delta Q\) donne \(c \ µ \ S \ dx \ \frac{\partial T}{\partial t} dt=- \frac {\partial \phi}{\partial x} dx \ dt\) soit \(c \ µ \ S \frac{\partial T}{\partial t}+ \frac {\partial \phi}{\partial x} =0\)
Or \(\phi (x,t)=\iint _S \overrightarrow{j_{th}} .\overrightarrow{dS}=j_{th} S\) Donc \(c \ µ \frac{\partial T}{\partial t}+ \frac {\partial j_{th}}{\partial x} =0\)
Deplus \(j_{th} S= -\lambda S \frac{\partial T}{\partial x}\)donc \(c \ µ \ S \frac{\partial T}{\partial t}-\lambda S \frac {\partial ^2 T}{\partial ^2 x} =0\)Soit \(\frac {\partial ^2 T}{\partial ^2 x}- \frac{cµ}{\lambda} \frac {\partial T}{\partial t}=0\) ou \(\frac {\partial ^2 T}{\partial ^2 x}- \frac{1}{D} \frac {\partial T}{\partial t}=0\) avec D le coefficient de diffusion thermique de la barre.
--------------------
Q: <span style="color: rgb(255, 170, 0);">[Z.S] Que peut-on dire du flux thermique en régime stationnaire?
R: En régime stationnaire et en l’absence de source, le flux thermique entrant est égal au flux thermique sortant de n’importe quel système.
On dit qu’il y a conservation du flux thermique ou que le flux thermique est conservatif.
--------------------
Q: <span style="color: rgb(255, 170, 0);">[Z.S] Conduction thermique dans une barre - problème unidimensionnel en coordonnées cartésiennes
>>> [IMAGE_ID: paste-5bc4bdf6dd1615bfe2f6fdfb42b08d6fffb77cb2.jpg] <<<
Déterminer l'expression de la température T(x) de la barre en régime stationnaire en fonction de T<sub>1</sub> , T<sub>2</sub> , x , et L.
R: Méthode 1:
Simplifier l'équation de la diffusion thermique dans le cas d'un régime stationnaire. 
\(\frac{\partial^2 T}{\partial  x^2}- \frac{1}{D}\frac{\partial T}{\partial t}=0\) devient \(\frac{\partial^2 T}{\partial  x^2}=0\) en régime stationnaire
Intégrer deux fois l'équation obtenue.
\(T=Ax+B\)
Déterminer les constantes d'intégration à l'aide des conditions aux limites.
Les conditions aux limites: \(T(x=0)=T_1\) et \(T(x=L)=T_2\)
Donc \(A=\frac{T_2 -T_1}{L}\)et \(B=T_1\)
Soit \(T=\frac{T_2 -T_1}{L} x+T_1\)
Méthode 2:
Utiliser le fait qu'en régime stationnaire le flux thermique se conserve:
\(\Phi=cste\)
Exprimer \(\phi\) en fonction de \(j_{th}\) puis en fonction de T à l'aide de la loi de Fourier.
\(\phi = -\lambda \frac{ dT}{dx} S\) dans le sens \(T_1\) vers \(T_2\) (i.e. suivant \(+\overrightarrow{u_x}\))
Donc \(\frac{dT}{dx}=A=cste\)
Intégrer une fois l'équation obtenue et déterminer les constantes d'intégration à l'aide des conditions aux limites.
idem méthode 1
A retenir : Dans un milieu homogène, en régime stationnaire T(x) suit une loi affine.
--------------------
Q: Donner la relation différentielle entre la température et le vecteur densité de flux thermique, puis l'équation de la diffusion thermique. 
Dans le cas le plus général (3D) avec terme de source.
R: Avec terme de source (\(P_v\): la puissance thermique volumique dela source)
\(µ c \frac{\partial T}{\partial t}+div \overrightarrow{ j_{th}}=P_v\)
\(\Delta {T}- \frac{1}{D}\frac{\partial T}{\partial t}=- \frac{P_v}{\lambda}\)
--------------------
Q: Définir la résistance thermique
R: En régime stationnaire, on définit la résistance thermique \(R_{th}=\frac{T_1-T_2}{\Phi_{1 \rightarrow 2}}\)
--------------------


==================================================
DECK : T2
==================================================

Q: (Y.Z) Qu'est ce qu'un corps noir ?
R: Un corps noir est un corps qui absorbe intégralement tout le rayonnement qu’il reçoit (quelle que soit sa fréquence (longueur d’onde)).
--------------------
Q: <span style="color: rgb(255, 170, 0);">(Y.Z) 
>>> [IMAGE_ID: paste-f6b9f90f8cf02c41f23d6ea12614cdd2e115cc05.jpg] <<<
R: C'est le flux surfacique émis par un corps noir à la température T
--------------------
Q: <span style="color: rgb(255, 170, 0);">(F.H) Quelle est l’expression de la puissance totale rayonnée par le soleil \(P_s\) en fonction de σ, \(T_s\) et \(R_S\) ? (Loi de Stefan : \(\varphi(t) = \sigma T^4\))
R: On a : \(P_s = \sigma T_s^44\pi R_s^2 \) avec \(Rs \) le rayon du soleil
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH) Déterminer la température à la surface du soleil Ts sachant que le maximum du spectre qu’il émet se situe à \(\lambda_m =  500nm\).
Loi de Wien : \(\lambda_mT= 2898 \mu m.K\)
R: Donc \(T_s = \dfrac{2898}{\lambda_m}\) avec \(\lambda =0,500 \ µm\)
AN : \(T_s = 5796 K\)
--------------------


==================================================
DECK : TD 02/03
==================================================

Q: <span style="color: rgb(255, 170, 0);">(T.B) Dans le cas du montage avec lentilles, déterminer l'expression de la différence de marche en un point M quelconque de l'écran ?
>>> [IMAGE_ID: Montage_lentille_schema.jpg] <<<
R: \(\delta(M)=(SS_2)-(SS_1)+(S_2 M) - (S_1 M)\)
\(S_1\) et \(S_2 \) sont sur la même surface d'onde donc \((SS_2)=(SS_1)\)
Donc: \(\delta(M)=(S_2 M) - (S_1 M)\)
D'après le principe du retour inverse de la lumière + le théorème de Malus: \((HM)=(S_1 M)\)
Donc: \(\delta(M)=(S_2 M) - (S_1 M)=(S_2 H)+(HM)-(S_1 M)=(S_2 H)=n_{air}\ S_2 H=n_{air} \ a \ sin(\theta)\)En se plaçant dans les condion de Gauss (\(\theta\) petit): \(tan(\theta)\approx sin(\theta)\approx \frac{x}{f'_2}\)
Bilan: \(\delta(M)\approx n_{air} \frac {ax}{f'_2}\)
--------------------
Q: >>> [IMAGE_ID: IMG_20231216_160858.jpg] <<<
<span style="color: rgb(0, 255, 0);">(T.B) Comment varie l'interfrange lorsque l'on translate S comme sur le schéma ?
Et la figure d'interférences ?
R: L'interfrange ne varie pas, mais la figure d'interférences est translatée :
- vers le haut si la source est décalée vers le bas
- vers le bas si la source est décalée vers le haut
--------------------
Q: >>> [IMAGE_ID: Source centree schema.jpg] <<<
<span style="color: rgb(255, 170, 0);">(T.B) Quelle est l'expression de la différence de marche dans la configuration basique des trous d'Young ? Méthode (en bref) pour l'obtenir ?
R: ẟ(M) = n<sub>air</sub>×ax / D
Méthode:
- Définir la diff de marche:\(\delta(M)=(S_2 M)-(S_1 M)=n_{air} (S_2 M-S_1 M)\)
- Exprimer les distances \(S_2 M\) et \(S_1 M\) en exprimant les corrdonnes de chaque points / les coordonnées des vecteurs / la norme des vecteurs)
- Effctier une DL grâce à l'hypothèse D>>a,x,y pour obtenir \(S_2 M-S_1 M \approx \frac{ax}{D}\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.B) Dans le cas suivant faire le tracé de deux rayon lumineux qui arrivent en un point M quelconque et qui interfèrent
>>> [IMAGE_ID: 20231218_210637-5143f6bde5b28f4dffc961d9364abd84289e1911.jpg] <<<
R: >>> [IMAGE_ID: 20231218_211228.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(E.B) Dans ce cas là tracer deux rayon lumineux issus de S<sub>0</sub> qui interfèrent en M
^
>>> [IMAGE_ID: 20231218_212428.jpg] <<<
R: >>> [IMAGE_ID: 20231218_212438.jpg] <<<
--------------------
Q: <span style="color: rgb(255, 170, 0);">(A.H.) 
>>> [IMAGE_ID: paste-d760f1bd44dd9b39b34e74b94e06f1e00ad3f4ed.jpg] <<<
[latex]\footnotesize{On se place dans le cas où $\delta$ ne dépend pas de $\lambda$. \newline
\footnotesize{Si la lampe émettait un rayonnement monochromatique de longueur d'onde $\lambda$, quelle serait, en fonction de la différence de marche $\delta$, l'expression de l'intensité résultante ?}\newline
Dans le cas du spectre bichromatique (à deux raies), exprimer l'intensité reçue en fonction de $\lambda_1$, $\lambda_2$, $I_0$ et $\delta$.
\scriptsize{Avec $I_0$ l'intensité reçue si une seule des deux ondes parvient sur le détecteur, $I_0$ est une valeur commune aux deux ondes.}}[/latex]
R: Cas monochromatique:\(I = 2I_0[1 + cos(\frac{2\pi}{\lambda}\delta)]\)
Cas bichromatique:\(I = I_1 + I_2 = 2I_0[1+cos(\frac{2\pi}{\lambda_1}\delta)] + 2I_0[1+cos(\frac{2\pi}{\lambda_2}\delta)]\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(A.H.)
>>> [IMAGE_ID: paste-9c0a6a8a3cf09546fb3fac93eb68f4d3aa3dcf01.jpg] <<<
[latex]
\footnotesize{On consdère que les deux longueurs du doublet sont très proches et on définit : 
\begin{itemize}
\item{$\lambda_0$ la valeur moyenne de $\lambda_1$ et $\lambda_2$}
\item{$\Delta\lambda$ la largeur du doublet, différence entre $\lambda_2$ et $\lambda_1$ ($\lambda_2 > \lambda_1$)}
\end{itemize}
Mettre l'expression de $I(\delta)$ sous la forme :}
\begin{center}
\normalsize{$I(\delta) = I'[1+v(\delta)cos(\frac{2\pi\delta}{\lambda_0})]$}
\end{center}
\footnotesize{où $v(\delta)$ est la fonction de visibilité que l'on exprimera en fonction de $\Delta\lambda$.}
\\\\
\footnotesize{On admettra que : $I = I_1 + I_2 = 2I_0[1+cos(\frac{2\pi}{\lambda_1}\delta)] + 2I_0[1+cos(\frac{2\pi}{\lambda_2}\delta)]$}
[/latex]
R: [latex]
\footnotesize{On a : $\lambda_0 = \frac{\lambda_1 + \lambda_2}{2}$ et $\Delta\lambda = \lambda_2 - \lambda_1$ ($\lambda_2 > \lambda_1$).
De plus, $\lambda_1$ et $\lambda_2$ sont proches, on approxime $\lambda_1\lambda_2 \simeq \lambda_0^2$. On a alors :}
\begin{align}
I(\delta) & = 2I_0[1+cos(\frac{2\pi}{\lambda_1}\delta)] + 2I_0[1+cos(\frac{2\pi}{\lambda_2}\delta)] \\
& = 2I_0[2 + cos(\frac{2\pi}{\lambda_1}\delta) + cos(\frac{2\pi}{\lambda_2}\delta)] \\
& = 2I_0[2 + 2cos(\frac{2\pi\delta}{2}(\frac{1}{\lambda_1}+\frac{1}{\lambda_2}))cos(\frac{2\pi\delta}{2}(\frac{1}{\lambda_1}-\frac{1}{\lambda_2}))] \\
& \simeq 4I_0[1 + cos(\frac{2\pi\delta}{2}(\frac{\lambda_1 + \lambda_2}{\lambda_0^2}))cos(\frac{2\pi\delta}{2}(\frac{\Delta\lambda}{\lambda_0^2}))] \\
& = 4I_0[1 + cos(\frac{2\pi}{\lambda_0}\delta)cos(\frac{\pi\Delta\lambda}{\lambda_0^2}\delta) \\
I(\delta) & = I'[1 + v(\delta)cos(\frac{2\pi}{\lambda_0}\delta)]
\end{align}
avec $I' = 4I_0$ et $v(\delta) = cos(\frac{\pi\Delta\lambda}{\lambda_0^2}\delta)$.
[/latex]
--------------------


==================================================
DECK : Thermo Sup
==================================================

Q: <span style="color: rgb(0, 255, 0);">(C.J.) Gaz Parfait Monoatomique : C<span style="font-size:x-small">v = ? C<span style="font-size:x-small">p = ?
R: GPM : \(C_v = \frac{3}{2}nR\)
\(C_p = \frac{5}{2} nR\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.J.) Gaz Parfait Diatomique : C<span style="font-size:x-small">v = ? C<span style="font-size:x-small">p = ?
R: GPD : \(C_v = \frac 5 2 nR\)
\(C_p = \frac 7 2 nR\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.E.) Un système thermodynamique est fermé si
R: il n'échange pas de matière avec l'extérieur (mais peut échanger énergie)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.E.) Un système thermoynamique est isolé si
R: Il n'échange ni matière ni énergie avec l'extérieur
--------------------
Q: <span style="color: rgb(255, 170, 0);">(C.E.) Un système thermodynamique est ouvert si
R: Il échange matière avec le milieu extérieur
--------------------
Q: <span style="color: rgb(0, 255, 0);">(C.E) Le quotient de 2 grandeurs extensives donne
R: Une grandeur intensive (ex : masse volumique)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(TS)Donner la formule du premier principe (dans le cas où il n'y a pas de variations d'énergie cinétique et pas de variation d'énergie potentielle macroscopique) :
R: \(\Delta U = W + Q\)
Avec W: travail algébriquement reçu par le système
Q: transfert thermique algébriquement reçu par le système
Condition d'application: système fermé
--------------------
Q: <span style="color: rgb(0, 255, 0);">(TS)Citer la première loi de Joule et en déduire une égalité :
R: L'énergie interne d'un gaz parfait ne dépend que de sa température. On a alors :
\[\Delta U =  \text{C}_\text{v}\Delta T\]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(TS)Donner l'expression de l'enthalpie :
R: <div style="text-align: justify;"> \(H = U + PV \)<div style="text-align: left;">H et U en J<div style="text-align: left;">P en Pa<div style="text-align: left;">V en m^3
--------------------
Q: (TS) Donner l'expression du premier principe sur l'enthalpie. Quelles sont les conditions de validité?
R: <div style="text-align: left;">
<div style="text-align: left;">\[\Delta H =  \text{W}_\text{u} + Q\]<div style="text-align: left;">Avec \(W_u\) le travail autre que celui des forces ext de pression.<span style="color: black; font-family: Arial; font-size: 20px; display: inline !important; float: none;">
<div style="text-align: left;">Conditions de validité:<div style="text-align: left;">Evolution isobare (Le travail des forces de pression devient -<span style="white-space: pre-wrap;">Δ(PV) lorsque la transformation est isobare)<div style="text-align: left;">ou monobare avec équilibre mécanique à l'état initial et à l'état final: Pi = Pf = Pext.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(T.B.) Qu'est-ce qu'une grandeur intensive? extensive? Donner des exemples.
R: Intensive si sa valeur ne dépend pas de la taille du système (expl: T, P)
Extensive si sa valeur dépend de la taille du système (expl: V, n)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(A.S) Que dit la première loi de Joule ?
R: L'énergie interne d'un Gaz Parfait ne dépend que de sa température.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(A.R. et T.B.) Comment s'exprime la variation d'énergie interne d'une PCII ?
R: [$]\Delta U=C \Delta T[/$]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(T.B.) Que vaut la force de pression lorsque la pression est constante et s'exerce sur une surface S plane ?
R: >>> [IMAGE_ID: Pression.jpg] <<<
avec \(\vec{n}\) (comme \(\vec{F}\)) dirigé du fluide vers la surface.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(BR/LPB) Comment s'écrit le travail élémentaire et le travail des forces extérieures de pression?
R: Travail élémentaire: \(\delta W = -P_\text{ext}dV\\\)
Travail lorsque V varie de \(V_i\) à \(V_f\): \(W = -\int_{V_i}^{V_f} P_\text{ext}dV\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(BR/LPB)Pour les capacités thermiques d'une PCII, on a :
R: \(C_P\approx C_V\) noté \(C\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(BR/LPB)On définit le coefficient isentropique \(\gamma\) comme le rapport :
R: \(\gamma = \frac{C_\text{p}}{C_\text{v}} = \frac{C_\text{p, m}}{C_\text{v, m}} = \frac{c_\text{p}}{c_\text{v}} \)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(BR/LPB)Citer la deuxième loi de Joule :
R: L'enthalpie d'un GP ne dépend que de la température \(T\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Enoncer le deuxième principe
R: <div style="text-align: justify;">Pour un système fermé qui subit une transformation entre un état 1 et un état 2, la variation d'entropie <span style="text-align: left;"> <span style="text-align: left;"> \({\Delta}S=S_2-S_1\)<span style="text-align: left;"> s'exprime: \({\Delta}S=S_{creee}+S_{ech}\)<div style="text-align: justify;"><span style="color: black; font-family: Arial; font-size: 20px; text-align: justify; display: inline !important; float: none;"><span style="text-align: left;">
<div style="text-align: justify;">où \(S_{créée}\) est <span style="text-align: left;">l'entropie créée au sein du système, <span style="text-align: left;"> <div style="text-align: left;">\(S_{éch}\) est l'entropie échangée, reçu de l'extérieur par le système.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Comment calculer l'entropie échangée?
R: Si au cours d'une transformation , le système reçoit des transferts thermiques \(Q_i\) de différents thermostats de températures \(T_{ext,i}\), on a:\[S_{ech}=\sum_i \frac{Q_i}{T_{ext,i}}\]où \(T_{ext,i}\) est la température du <span style="color: rgb(255, 0, 0);">thermostat: elle est a priori <span style="color: rgb(0, 0, 0);">différente de cellle du système.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Quelle est la caractérisique d'une fonction d'état?
R: Les variations d'une fonciton d'état ne dépendent pas du chemin suivi, seulement des états initiaux et finaux des transformations.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(BR/LPB)Sur ce diagramme de Clapeyron, le travail algébriquement reçu par le système est : 
>>> [IMAGE_ID: Capture d’écran 2023-09-09 155229.png] <<<
R: \(W = \mathcal{A}>0\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(A.P) Inégalité de Clausius ?
R: Pour un cycle ditherme:
>>> [IMAGE_ID: Screenshot_20230910_115252_DuckDuckGo.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Citer les conditions d'application de la loi de Laplace, citer la loi puis l'établir à l'aide de l'entropie d'un gaz parfait :\[S(P,V) = \frac{nR}{{\gamma}-1}ln(\frac{P}{P_0})+\frac{nR{\gamma}}{{\gamma}-1}ln(\frac{V}{V_0})) + S_0\]
R: Un gaz parfait qui subit une transformation isentropique (notée isoS et aussi nommée adiabatique réversible) suit la loi de Laplace :
\[ PV^{\gamma} = \text{cste} \]
Pour l'établir, on sait que la transformation entre l'état 1 \((P_1,V_1,T_1)\) et l'état 2 \((P_2,V_2,T_2)\) est adiabatique réversible. On a donc :
\[ \Delta S = S_2 - S_1 = 0 \]
On a que l'entropie est constante, donc :
\[ \Delta S = \frac{nR}{\gamma -1} \ln\left(\frac{P_2}{P_1}\right) + \frac{nR\gamma}{\gamma -1} \ln\left(\frac{V_2}{V_1}\right) \]
\[ = \frac{nR}{\gamma -1} \ln\left(\frac{P_2}{P_1}\left(\frac{V_2}{V_1}\right)^{\gamma}\right) = 0 \]
Donc,
\[ P_1 V_1^{\gamma} = P_2 V_2^{\gamma} \]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Citer la loi de Laplace et l'exprimer en fonction de P et T et en fonction de T et V
R: La loi de Laplace en fonction de P et V s'exprime :
\[PV^{\gamma} = \text{cste}\]<span style="white-space: pre-wrap;">
o<span style="white-space: pre-wrap;">ù \[ {\gamma}=c_p/c_v \]
En fonction de \(P\) et \(T\): 
\[P\left(\frac{nRT}{P}\right)^{\gamma} = \text{cste}\]
donc on obtient:
\[P^{1-\gamma}T^{\gamma} = \frac{\text{cste}}{(nR)^{\gamma}} = \text{cste}'\]
Pour \(T\) et \(V\):
\[TV^{\gamma - 1} = \frac{\text{cste}}{nR} = \text{cste}''\]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(E.B.) Faire un schéma de la détente de Joule - Gay-Lussac
Exprimer T<sub>f</sub> et V<sub>f </sub>(température et volume finale) en fontcion de T<sub>0</sub> et V<sub>0</sub> (température et volume Initial).
Donner l'entropie créée.
Qu'en deduire sur la transformation?
Donnée: \(\Delta S_{GP}=C_v ln (T_f/T_i) +nR ln (V_f/V_i)\)
R: >>> [IMAGE_ID: paste-869b85dbe1c56a1cd010e47ed61ca635c720c15c.jpg] <<<
Syst: Tout le gaz+ le vide (système fermé)
1er pp: \(\Delta U=W+Q\) 
évolution adiabatique: Q=0
G.P.: \(\Delta U=\Delta U _{GP} + \Delta U_{vide} =C_V \Delta T\) car \(\Delta U_{vide}=0\)
Or W=0 car V=cste
Donc 1er pp: \(C_V\  \Delta T=0\) soit \(\Delta T=0\)
Bilan: \(V_f = 2V_0\) ; \(T_f = T_0\)
2nd pp: \(\Delta S=S_{créée}+S_{éch}\)
\(\Delta S=\Delta S_{GP} +\Delta S_{vide}=\Delta S_{GP}=nR\ ln(2)\)
\(S_{ech}=0\) car Q=0
Donc \(Scréée = ΔS_{GP} = nRln(2)>0\) La transformation est irréversible
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Comment différencier une adiabatique réversible et une isotherme dans un diagramme de Clapeyron ?
R: En un point M du diagramme, l'adiabatique réversible est plus raide qu'une isothèrme.
>>> [IMAGE_ID: Screenshot_20230910_142255_Samsung_Notes.jpg] <<<
--------------------
Q: <span style="color: rgb(0, 255, 0);">(O.M) Efficacité et efficacité maximum d'une pompe à chaleur utilisée comme chauffage/
R: [$] e = \frac{-Q_c}{W} [/$]
et  [$] e \le \frac{T_c}{T_c-T_f} [/$]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(O.M) Efficacité et efficacité maximal d'un frigo
R: [$] e = \frac{Q_f}{W} [/$]
et  [$] e \le \frac{T_f}{T_c-T_f} [/$]
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Comment appelle-t-on une transformation dont la variation d'entropie est nulle ?
R: On dit qu'elle est isentropique.
--------------------
Q: (FH)Déf isochore, isobare, monobare, isotherme, monotherme, reversible
R: isochore : volume syst constant
isobare : pression syst constante + \(P=P_{ext}\)
monobare pression ext constante
isotherme : temp syst constante +\(P=P_{ext}\)
monotherme : temp ext constante 
reversible : perturbation lente, et à tout moment on a temp et pression du système égales à la temp et pression de l'ext (\(P=P_{ext}\) et \(T=T_{ext}\))
--------------------
Q: <span style="color: rgb(0, 255, 0);">(FH)Travail pour une transfo isochore :
R: W = 0
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH)Travail pour une transfo monobare :
R: [$]W = -Pext  \Delta V[/$]
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH)Def adiabatique :
R: systeme n'échange aucun transfert thermique avec le milieu extérieur.
--------------------
Q: <span style="color: rgb(0, 255, 0);">(ADC)La capacité thermique massique c de l'eau est (avec les unités) :
R: 4,18 J.g<sup>-1</sup>.K<sup>-1</sup>
--------------------
Q: <span style="color: rgb(255, 170, 0);">(FH)Variation d'enthalpie d'un GP ou d'une phase condensée incompressible et indilatable.
R: Gaz parfait: \(\Delta H=C_p\ \Delta T\)
Phase condensé incompressible indilatable: \(\Delta H=C\ \Delta T\)
--------------------
Q: <span style="color: rgb(255, 170, 0);">INC
>>> [IMAGE_ID: Capture d’écran 2023-09-10 170551.png] <<<
Indiquer la signification des différents éléments et échanges.
R: (1) système étudié: fluide frigorigène
(2) Système mécanique ou électrique
(3) Source chaude à Tc
(4) Source froide à Tf
(A) Travail W algébriquement reçu par le système
(B) Transfert thermique Qc algébriquement reçu par le système
(C) Transfert thermique Qf algébriquement reçu par le système
--------------------
Q: <span style="color: rgb(255, 170, 0);">(A.R) On considère une <span style="color: rgb(255, 0, 0);">masse m d'eau de <span style="color: rgb(255, 0, 0);">capacité th. massique c<sub>m</sub>, initialement à la température<span style="color: rgb(255, 0, 0);"> T<sub>i</sub> = 20°C, dans un calorimètre dont on néglige la valeur en eau. 
On plonge une résistance <span style="color: rgb(255, 0, 0);">R = 5 <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(255, 0, 0);">Ω<span style="color: rgb(32, 33, 34);"> (de capacité th. négligeable) parcourue par un courant d'intensité <span style="color: rgb(255, 0, 0);">I = 1 A pendant <span style="color: rgb(255, 0, 0);">τ <span style="color: rgb(255, 0, 0);">= 1 minute dans l'eau.
Calculer la température finale <span style="color: rgb(255, 0, 0);">T<sub>f</sub> de l'eau. La transformation est-elle réversible ? 
Donnée:\(\Delta S_{PCII}=C\  ln (T_f/T_i)\)
R: 1)  Système : { eau + résistance }
On applique le 1<sup>er</sup> principe sur l'enthalpie :
ΔH = W<sub>u</sub> = W<sub>élec
</sub>Or ΔH = m c<sub>m </sub>(T<sub>f</sub> - T<sub>i</sub>) donc mc<sub>m</sub>(T<sub>f</sub> - T<sub>i</sub>) = RI<sup>2</sup><span style="color: rgb(0, 0, 0);">τ
<span style="color: rgb(255, 0, 0);">T<sub>f</sub> = T<sub>i</sub> + RI<sup>2</sup>τ / mc<sub>m</sub>
2) Toujours pour le système { eau + résistance }
S<sub>e</sub> = 0 car la transformation est adiabatique
ΔS = ΔS<sub><span style="font-size: 16.6667px;">eau</sub> + ΔS<sub>résistance</sub> (additivité de l'enthalpie). Or ΔS<sub>résistance</sub> = 0
ΔS = m c<sub>m</sub> * ln(T<sub>f</sub> / T<sub>i</sub>) > 0 car T<sub>f</sub> > T<sub>i
</sub>On applique le 2<sup><span style="font-size: 16.6667px;">ème</sup> principe :
ΔS<sub>c </sub>= ΔS > 0 donc la transformation est irréversible !
--------------------
Q: <span style="color: rgb(0, 255, 0);">(L.L) Au cours d'une transformation adiabatique la température est-elle constante ?
R: Non pas forcément car on peut chauffer un système en lui apportant du travail sans sans lui apporter de transfert thermique . (Un gaz quelconque qui est comprimé chauffe)
--------------------
Q: <span style="color: rgb(255, 170, 0);">(L.L)L'enthalpie de vaporisation est positive ou négative ? De même pour celle de solidification ?
R: Changement d'état isobare: [$]\Delta H=Q[/$]
La vaporisation consomme de l'énergie donc [$]Q>0[/$]  et donc l'enthalpie de vaporisation: [$]\Delta H>0[/$].
Pour la solidification c'est l'inverse.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(INC) Définition de la capacité thermique à volume constant \(C_v\)
R: Si U ne dépend que de T: \(C_v= \frac {dU} {dT}\)
\(C_v\) en \(J \cdot K^{-1}\)
\(dU\) en \(J\)
\(dT\) en \(K\)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC) Rappeler les propriétés de l'entropie créee.
R: L'entropie créee est toujours positive ou nulle. On a aussi
S<sub>créee</sub> > 0  pour une transformation irréversible. 
S<sub>créee </sub>= 0  pour une transformation réversible.
--------------------
Q: <span style="color: rgb(255, 170, 0);">(YZ) A l'aide de la relation de Mayer, établir et exprimer les capacités thermiques molaires à volume constant Cv,m et à pression constante Cp,m d'un gaz parfait en fonction du coefficient isentropique γ et de la constante des gaz parfaits R
R: <div style="text-align: justify;">Cp,m =Cv,m +R<div style="text-align: justify;">γ=Cp,m / Cv,m <div style="text-align: justify;">Donc γ=1+R/Cv,m <div style="text-align: justify;">Soit Cv,m = R/(γ-1) et Cp,m = γCv,m = γR/(γ-1)
--------------------
Q: <span style="color: rgb(0, 255, 0);">(INC)<span style="color: rgb(0, 0, 0);"> Application : calcul d'entropie créee
Un morceau de fer m = 2kg à la température T<sub>i</sub> = 880 K est jeté dans un lac à T<sub>0</sub> = 5°C. On donne c<sub>fer</sub> = 400 J Kg<sup>-1</sup> K<sup>-1</sup> et entropie massqiue c : s(T) = c ln(T/T<sub>0</sub>) + s<sub>0</sub>
Exprimer l'entropie créee.
R: On applique le 2nd principe : \(ΔS = Scrée + Séch\)
d'où \(Scrée = ΔS - Séch\)
De plus \(ΔS = m(s(T₀) - s(Ti))= m\ c \ ln\frac{T₀}{Ti}\)
D'autre part : \(Séch = Q/T₀\)
Avec Q qui s'obtient avec le premier principe :
  \(ΔH = Wu + Q\) avec \(Wu = 0\)
  \(Q = m\ c\ (T₀ - Ti)\)
Finalement :
  \(Scréee = m\ c\ ln(T₀/Ti) - m\ c\ (1-(Ti/T₀))\)
--------------------






`.trim();


const RAW_MATH = String.raw`
**Convention typographique :** $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$, $E$ désigne un espace vectoriel normé (evn), sauf mention contraire. Toutes les hypothèses sont nécessaires sauf mention explicite.

---

# CHAPITRE 1 — Suites, fonctions de la variable réelle

## FLASHCARD 1 — Théorème de Bolzano-Weierstrass

### RECTO
**Théorème 1 — Bolzano-Weierstrass**

**Contexte :** Soit $(u_n)_{n \in \mathbb{N}}$ une suite de réels (ou de $\mathbb{R}^d$).

Énoncer le théorème de Bolzano-Weierstrass avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes :**

*   $(u_n)_{n \in \mathbb{N}}$ est une suite bornée de $\mathbb{R}^d$ (ou de $\mathbb{R}$), $d \ge 1$ fixé.
*   ($\mathbb{R}^d$ est de dimension finie, muni d'une norme quelconque — toutes équivalentes.)

**Énoncé formel :**

$$ \forall (u_n)_{n \in \mathbb{N}} \in (\mathbb{R}^d)^{\mathbb{N}}, \quad (u_n) \text{ bornée} \implies \exists \varphi : \mathbb{N} \to \mathbb{N} \text{ strictement croissante}, \exists \ell \in \mathbb{R}^d, \quad u_{\varphi(n)} \xrightarrow[n \to +\infty]{} \ell $$

**Démonstration (Esquisse) :**

*   **Cas $d=1$ :** Construction par dichotomie — on encadre la suite dans $[a_n, b_n]$ avec $b_n - a_n \to 0$, en choisissant à chaque étape le demi-intervalle contenant une infinité de termes. Le théorème des suites adjacentes (ou des intervalles emboîtés) donne la limite $\ell$.
*   **Cas $d \ge 2$ :** Extraction diagonale — on extrait d'abord une sous-suite convergente pour la première coordonnée, puis une sous-sous-suite pour la deuxième, etc. (procédé diagonal, voir À connaître 1).
*   **Outil clé :** Complétude de $\mathbb{R}$ + caractérisation des compacts de $\mathbb{R}^d$ (fermés bornés).

### 
**Subtilités :**

*   Le théorème est faux en dimension infinie : dans un evn de dimension infinie, la boule unité fermée n'est pas compacte (théorème de Riesz). La suite $(e_n)$ des vecteurs de base dans $\ell^2(\mathbb{N})$ est bornée mais n'admet aucune sous-suite convergente.
*   La borne est indispensable : $(u_n) = n$ est non bornée et n'admet aucune sous-suite convergente dans $\mathbb{R}$.
*   La limite $\ell$ n'est pas nécessairement unique (la suite peut avoir plusieurs valeurs d'adhérence) ; le théorème affirme l'existence d'une valeur d'adhérence.
*   **Valeurs d'adhérence :** L'ensemble des limites de sous-suites extraites de $(u_n)$ est un fermé borné non vide de $\mathbb{R}^d$.

**Extensions :**

*   Valable dans tout espace métrique compact (c'est même une caractérisation équivalente de la compacité séquentielle).
*   En dimension infinie, il faut remplacer par la compacité faible (théorème de Banach-Alaoglu), hors programme MP*.
*   Dans $\mathbb{C}^d \simeq \mathbb{R}^{2d}$ : le théorème s'applique directement.

**Pièges classiques :**
*   ❌ Confondre « bornée » et « convergente » : une suite bornée n'est pas nécessairement convergente (ex : $u_n = (-1)^n$).
*   ❌ Oublier que l'extraction $\varphi$ doit être strictement croissante (définition de sous-suite).
*   ❌ Appliquer ce théorème dans un evn de dimension infinie sans vérification de compacité.
*   ❌ Confondre « admet une sous-suite convergente » et « est de Cauchy ».

---

## FLASHCARD 2 — À connaître 1 : Procédé diagonal

### RECTO
**À connaître 1 — Procédé diagonal de Cantor**

**Contexte :** On dispose d'une suite $(u_n)_{n \in \mathbb{N}}$ et d'une famille dénombrable de propriétés $\mathcal{P}_k$, $k \in \mathbb{N}$.

Énoncer le procédé d'extraction diagonale et son utilité principale.

### VERSO
**Hypothèses complètes :**

*   $(u_n)_{n \in \mathbb{N}}$ est une suite dans un ensemble $X$.
*   Pour chaque $k \in \mathbb{N}$, il existe une extractrice $\varphi_k : \mathbb{N} \to \mathbb{N}$ strictement croissante telle que la sous-suite $(u_{\varphi_k(n)})_n$ vérifie la propriété $\mathcal{P}_k$.

**Énoncé formel :**

On construit par récurrence une suite d'extractrices emboîtées :
$$ \varphi_0, \quad \varphi_1 = \psi_1 \circ \varphi_0, \quad \varphi_2 = \psi_2 \circ \varphi_1, \dots $$
telles que $(u_{\varphi_k(n)})_n$ vérifie $\mathcal{P}_0, \mathcal{P}_1, \dots, \mathcal{P}_k$ simultanément.

La suite diagonale est définie par :
$$ \sigma(n) = \varphi_n(n), \quad n \in \mathbb{N}. $$
Alors $\sigma$ est strictement croissante et $(u_{\sigma(n)})_{n \in \mathbb{N}}$ vérifie simultanément toutes les propriétés $\mathcal{P}_k$, $k \in \mathbb{N}$.

**Démonstration (Esquisse) :**

*   **Construction :** $\varphi_0$ extrait une sous-suite vérifiant $\mathcal{P}_0$ ; $\varphi_1$ extrait de $\varphi_0$ une sous-suite vérifiant $\mathcal{P}_1$ (elle vérifie encore $\mathcal{P}_0$ par sous-extraction), etc.
*   **Diagonale :** Pour $n \ge k$, $\sigma(n) = \varphi_n(n)$ est une extraction de $\varphi_k$, donc vérifie $\mathcal{P}_k$. Ainsi $(u_{\sigma(n)})_{n \ge k}$ vérifie $\mathcal{P}_k$, ce qui est suffisant pour les propriétés asymptotiques.
*   **Stricte croissance de $\sigma$ :** Se vérifie par construction emboîtée.

### 
**Subtilités :**

*   La propriété $\mathcal{P}_k$ n'est vérifiée par la suite diagonale qu'à partir du rang $k$ — suffisant pour les limites.
*   Le procédé nécessite une famille dénombrable de propriétés. Pour une famille indénombrable, il échoue en général.
*   **Usage typique :** Bolzano-Weierstrass en dimension $d$ (extraction coordonnée par coordonnée), compacité séquentielle, normalité des familles de fonctions (Arzelà-Ascoli, hors programme).

**Extensions :**

*   Fondamental en analyse fonctionnelle (extraction d'une sous-suite faiblement convergente).
*   Utilisé dans la preuve du théorème d'Arzelà-Ascoli.

**Pièges classiques :**
*   ❌ Croire que la suite diagonale vérifie $\mathcal{P}_k$ dès $n=0$ — elle ne le vérifie que pour $n \ge k$.
*   ❌ Oublier de vérifier que $\sigma$ est bien strictement croissante.
*   ❌ Appliquer le procédé à une famille non dénombrable.

---

## FLASHCARD 3 — Théorème 2 : Limite monotone

### RECTO
**Théorème 2 — Théorème de la limite monotone**

**Contexte :** Soit $(u_n)_{n \in \mathbb{N}}$ une suite réelle.

Énoncer le théorème de la limite monotone dans ses deux cas, avec conclusion précise sur la valeur de la limite.

### VERSO
**Hypothèses complètes :**

*   $(u_n)_{n \in \mathbb{N}} \in \mathbb{R}^{\mathbb{N}}$, suite de réels.
*   $(u_n)$ est monotone (croissante ou décroissante au sens large).

**Énoncé formel :**

Si $(u_n)$ est croissante :
$$ u_n \xrightarrow[n \to +\infty]{} \sup_{n \in \mathbb{N}} u_n \in \mathbb{R} \cup \{+\infty\}. $$

Si $(u_n)$ est décroissante :
$$ u_n \xrightarrow[n \to +\infty]{} \inf_{n \in \mathbb{N}} u_n \in \mathbb{R} \cup \{-\infty\}. $$

Plus précisément :

*   Si $(u_n)$ est croissante et majorée, alors $(u_n)$ converge dans $\mathbb{R}$ vers $\sup_n u_n$.
*   Si $(u_n)$ est croissante et non majorée, alors $u_n \to +\infty$.

**Démonstration (Esquisse) :**

Soit $\ell = \sup_n u_n \in \mathbb{R} \cup \{+\infty\}$.
*   Si $\ell \in \mathbb{R}$ : par définition du supremum, $\forall \varepsilon > 0, \exists N, u_N > \ell - \varepsilon$. Par croissance, $\forall n \ge N, \ell - \varepsilon < u_N \le u_n \le \ell$, donc $|u_n - \ell| < \varepsilon$.
*   Si $\ell = +\infty$ : $\forall M > 0, \exists N, u_N > M$, donc $\forall n \ge N, u_n \ge u_N > M$.

### 
**Subtilités :**

*   Ce théorème est une conséquence directe de la propriété de la borne supérieure de $\mathbb{R}$ (complétude archimédienne) — c'est même quasi-équivalent.
*   Monotonie au sens large suffit (pas besoin de stricte).
*   Le théorème est faux dans $\mathbb{Q}$ : une suite croissante bornée de rationnels peut converger vers un irrationnel (donc pas de limite dans $\mathbb{Q}$).

**Extensions :**

*   Analogue pour les fonctions monotones : Toute fonction $f : \mathbb{R} \to \mathbb{R}$ monotone admet des limites à gauche et à droite en tout point (théorème de la limite monotone pour les fonctions).
*   Pas d'analogue direct en dimension $\ge 2$ (la notion d'ordre total disparaît).

**Pièges classiques :**
*   ❌ Oublier que la limite peut être $+\infty$ ou $-\infty$ (la suite converge dans $\overline{\mathbb{R}}$ toujours).
*   ❌ Confondre la limite avec la valeur atteinte : $\sup_n u_n$ peut ne pas être atteint.
*   ❌ Utiliser ce théorème sans vérifier la monotonie (une suite bornée non monotone n'est pas nécessairement convergente).

---

## FLASHCARD 4 — Théorème 3 : Limite par encadrement / minoration / majoration

### RECTO
**Théorème 3 — Limite par encadrement, minoration, majoration (Gendarmes)**

**Contexte :** Soient $(u_n), (v_n), (w_n)$ des suites réelles.

Énoncer les trois versions du théorème des gendarmes (encadrement, minoration vers $+\infty$, majoration vers $-\infty$) avec hypothèses exactes.

### VERSO
**Hypothèses et énoncé formel :**

**Version 1 — Encadrement (convergence) :**
$$ (\exists N_0 \in \mathbb{N}, \forall n \ge N_0, v_n \le u_n \le w_n) \text{ et } (v_n \to \ell \text{ et } w_n \to \ell, \ell \in \mathbb{R}) \implies u_n \to \ell. $$

**Version 2 — Minoration (limite $+\infty$) :**
$$ (\exists N_0 \in \mathbb{N}, \forall n \ge N_0, u_n \ge v_n) \text{ et } (v_n \to +\infty) \implies u_n \to +\infty. $$

**Version 3 — Majoration (limite $-\infty$) :**
$$ (\exists N_0 \in \mathbb{N}, \forall n \ge N_0, u_n \le w_n) \text{ et } (w_n \to -\infty) \implies u_n \to -\infty. $$

**Démonstration (Esquisse) :**

*   **Version 1 :** $|u_n - \ell| \le \max(|v_n - \ell|, |w_n - \ell|) \to 0$ (car $v_n \le u_n \le w_n$ et $v_n, w_n \to \ell$).
*   **Version 2 :** $\forall M > 0, \exists N_1$ tel que $n \ge N_1 \implies v_n > M$, donc $u_n \ge v_n > M$ pour $n \ge \max(N_0, N_1)$.

### 
**Subtilités :**

*   L'encadrement n'est requis qu'à partir d'un certain rang $N_0$ (condition asymptotique).
*   Les limites de $v_n$ et $w_n$ doivent être égales (même valeur $\ell \in \mathbb{R}$) pour la version convergence. Si $v_n \to \ell_1 \neq \ell_2 \leftarrow w_n$, on ne peut rien conclure.
*   **Version vectorielle :** Le théorème d'encadrement n'existe pas directement en dimension $\ge 2$ (pas d'ordre total), mais on peut l'appliquer coordonnée par coordonnée ou via la norme : si $\|u_n - \ell\| \le w_n \to 0$, alors $u_n \to \ell$.

**Extensions :**

*   Analogue pour les fonctions : si $v(x) \le f(x) \le w(x)$ au voisinage de $a$ et $v(x), w(x) \to \ell$, alors $f(x) \to \ell$.
*   Utilisé massivement pour prouver $n^{1/n} \to 1$, $\frac{\ln n}{n} \to 0$, etc.

**Pièges classiques :**
*   ❌ Appliquer l'encadrement avec $v_n \to \ell_1$ et $w_n \to \ell_2$ avec $\ell_1 \neq \ell_2$ — invalide.
*   ❌ Oublier que la conclusion ne donne pas $v_n \le u_n \le w_n$ pour tout $n$, seulement pour $n$ assez grand.
*   ❌ Confondre avec le théorème de comparaison (qui ne donne qu'une inégalité sur les limites, pas une égalité).

---

## FLASHCARD 5 — Théorème 4 : Valeurs intermédiaires

### RECTO
**Théorème 4 — Théorème des valeurs intermédiaires (TVI)**

**Contexte :** Soit $f : I \to \mathbb{R}$ une fonction définie sur un intervalle $I \subseteq \mathbb{R}$.

Énoncer le TVI avec hypothèses exactes. Donner également la version avec $f(a) \cdot f(b) < 0$.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ est un intervalle (connexe par arcs dans $\mathbb{R}$).
*   $f : I \to \mathbb{R}$ est continue sur $I$.
*   $a, b \in I$ avec $a < b$.

**Énoncé formel :**

$$ \forall \gamma \text{ compris entre } f(a) \text{ et } f(b), \quad \exists c \in [a, b], \quad f(c) = \gamma. $$

Formellement : si $f(a) \le f(b)$,
$$ \forall \gamma \in [f(a), f(b)], \quad \exists c \in [a, b], \quad f(c) = \gamma. $$

**Corollaire immédiat (annulation) :**
$$ f(a) \cdot f(b) < 0 \implies \exists c \in ]a, b[, \quad f(c) = 0. $$

**Démonstration (Esquisse) :**

*   **Méthode de la borne supérieure :** Poser $c = \sup \{x \in [a, b] \mid f(x) \le \gamma\}$. Par continuité de $f$ et définition du supremum, $f(c) = \gamma$.
*   **Alternative (dichotomie) :** Construire des suites adjacentes par dichotomie ; par complétude de $\mathbb{R}$ et continuité de $f$, la limite commune vérifie $f(c) = \gamma$.
*   **Clé :** Connexité par arcs de $[a, b]$ + continuité $\implies$ l'image est un intervalle.

### 
**Subtilités :**

*   $c$ n'est pas nécessairement unique (peut y en avoir plusieurs).
*   L'intervalle est indispensable : sur $\mathbb{Q}$ (non connexe), le TVI est faux (ex : $f(x) = x^2$ sur $\mathbb{Q}$, $\gamma = 2$, pas d'antécédent rationnel).
*   Le TVI garantit l'existence mais pas la constructivité de $c$ (en général).
*   Dans le corollaire : on peut affirmer $c \in ]a, b[$ (ouvert) car $f(a)$ et $f(b)$ sont de signes strictement opposés, donc $f(c) = 0 \neq f(a)$ et $\neq f(b)$.

**Extensions :**

*   **Version vectorielle :** Le TVI se généralise : si $f : [a, b] \to \mathbb{R}^d$ est continue, l'image $f([a, b])$ est un connexe par arcs de $\mathbb{R}^d$ (mais pas nécessairement un intervalle en dimension $\ge 2$).
*   **Version topologique :** L'image continue d'un connexe est connexe.
*   Le TVI est à la base des méthodes de dichotomie numérique.

**Pièges classiques :**
*   ❌ Appliquer le TVI à une fonction définie sur une réunion d'intervalles disjoints (pas un intervalle).
*   ❌ Conclure à l'unicité de $c$ sans hypothèse supplémentaire (stricte monotonie).
*   ❌ Oublier la continuité — une fonction discontinue peut ne pas prendre toutes les valeurs intermédiaires.
*   ❌ Écrire $c \in [a, b]$ alors que $f(a) \cdot f(b) < 0$ assure $c \in ]a, b[$.

---

## FLASHCARD 6 — Corollaire 1

### RECTO
**Corollaire 1 — Image d'un intervalle par une fonction continue**

**Contexte :** Soit $f : I \to \mathbb{R}$ continue sur un intervalle $I$.

Énoncer le corollaire sur l'image d'un intervalle par une fonction continue. Traiter le cas compact séparément.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ est un intervalle (quelconque : ouvert, fermé, borné, non borné).
*   $f : I \to \mathbb{R}$ est continue sur $I$.

**Énoncé formel :**

$$ f(I) \text{ est un intervalle de } \mathbb{R}. $$

**Cas particulier fondamental (compact) :**

Si de plus $I = [a, b]$ est un segment ($a < b$, $a, b \in \mathbb{R}$), alors :
$$ f([a, b]) = [m, M] \quad \text{avec } m = \min_{[a, b]} f \in \mathbb{R}, \quad M = \max_{[a, b]} f \in \mathbb{R}. $$
En particulier, $f$ est bornée et atteint ses bornes sur $[a, b]$.

**Démonstration (Esquisse) :**

*   **$f(I)$ est un intervalle :** Découle directement du TVI (toute valeur entre $f(a)$ et $f(b)$ est atteinte, pour tous $a<b$ dans $I$).
*   **Cas compact :** $f([a, b])$ est une partie compacte de $\mathbb{R}$ (image continue d'un compact), donc fermée et bornée, donc de la forme $[m, M]$.

### 
**Subtilités :**

*   Sur un intervalle ouvert ou non borné, $f$ continue n'est pas nécessairement bornée ni n'atteint ses bornes : ex. $f(x) = x$ sur $]0, 1[$, $f(x) = 1/x$ sur $]0, 1]$.
*   L'image est un intervalle mais pas nécessairement fermé/borné.
*   Le fait que $m$ et $M$ soient atteints (et non seulement des bornes infimales) est crucial — c'est le **théorème de Weierstrass**.

**Extensions :**

*   En dimension $\ge 2$ : l'image d'un connexe par arcs est un connexe par arcs ; l'image d'un compact est un compact.

**Pièges classiques :**
*   ❌ Conclure que $f$ est bornée sur un intervalle quelconque sans hypothèse de compacité.
*   ❌ Confondre « $f(I)$ est un intervalle » et « $f$ est injective ».

---

## FLASHCARD 7 — Proposition 1

### RECTO
**Proposition 1 — Continuité des fonctions monotones, réciproque d'une bijection continue**

**Contexte :** Soit $f : I \to \mathbb{R}$ définie sur un intervalle $I \subseteq \mathbb{R}$.

Énoncer la proposition sur la continuité d'une fonction monotone sur un intervalle et le théorème de la bijection réciproque.

### VERSO
**Hypothèses et énoncé :**

**Partie 1 — Discontinuités d'une fonction monotone :**

$f : I \to \mathbb{R}$ monotone. Alors $f$ admet en tout point $x_0 \in I$ des limites à gauche et à droite (dans $\overline{\mathbb{R}}$), et l'ensemble des points de discontinuité de $f$ est au plus dénombrable.

**Partie 2 — Théorème de la bijection :**

$$ f : [a, b] \to \mathbb{R} \text{ continue et strictement monotone} \implies f \text{ est un homéomorphisme de } [a, b] \text{ sur } [f(a), f(b)] \text{ (ou } [f(b), f(a)]). $$

Plus précisément :

*   $f$ est bijective de $[a, b]$ sur $f([a, b]) = [\min(f(a), f(b)), \max(f(a), f(b))]$.
*   La réciproque $f^{-1}$ est continue et strictement monotone (même sens de variation).

**Démonstration (Esquisse) :**

*   **Injectivité :** Stricte monotonie $\implies$ injectivité immédiate.
*   **Surjectivité :** TVI donne que l'image est un intervalle ; la stricte monotonie identifie cet intervalle à $[f(a), f(b)]$.
*   **Continuité de $f^{-1}$ :** Image d'un compact par $f$ est un compact ; $f$ est un homéomorphisme (image d'un ouvert relatif = ouverte relative, car $f$ strictement monotone sur un intervalle).

### 
**Subtilités :**

*   La continuité de $f^{-1}$ est automatique ici (pas besoin de la vérifier séparément) car $[a, b]$ est compact — c'est une propriété générale : une bijection continue d'un compact dans un séparé est un homéomorphisme.
*   Sur un intervalle ouvert ou non compact, la réciproque d'une bijection continue peut ne pas être continue (contre-exemple non trivial hors programme).
*   L'hypothèse « strictement monotone » est indispensable pour l'injectivité.

**Extensions :**

*   En dimension $\ge 2$, le théorème de la fonction inverse (Cauchy-Lipschitz différentiel) généralise ce résultat.

**Pièges classiques :**
*   ❌ Confondre monotonie (au sens large) et stricte monotonie pour la bijectivité.
*   ❌ Oublier de préciser l'intervalle d'arrivée exact.

---

## FLASHCARD 8 — Théorème 5 : Continuité uniforme (Heine)

### RECTO
**Théorème 5 — Théorème de Heine (continuité uniforme sur un segment)**

**Contexte :** Soit $f : [a, b] \to E$ une fonction définie sur un segment.

Énoncer le théorème de Heine avec hypothèses exactes, en précisant l'espace d'arrivée.

### VERSO
**Hypothèses complètes :**

*   $a < b$, $a, b \in \mathbb{R}$ (segment $[a, b]$ compact).
*   $E$ est un espace métrique (ou evn) quelconque (pas nécessairement de dimension finie).
*   $f : [a, b] \to E$ est continue sur $[a, b]$.

**Énoncé formel :**

$f$ est **uniformément continue** sur $[a, b]$ :
$$ \forall \varepsilon > 0, \exists \delta > 0, \forall x, y \in [a, b], \quad |x - y| < \delta \implies d(f(x), f(y)) < \varepsilon. $$

**Démonstration (Esquisse) :**

*   **Par l'absurde :** Si $f$ n'est pas uniformément continue, $\exists \varepsilon_0 > 0, \exists (x_n), (y_n) \in [a, b]$ avec $|x_n - y_n| < 1/n$ et $d(f(x_n), f(y_n)) \ge \varepsilon_0$.
*   **Bolzano-Weierstrass :** $(x_n)$ bornée, on extrait $x_{\varphi(n)} \to c \in [a, b]$. Alors $y_{\varphi(n)} \to c$ aussi.
*   **Continuité de $f$ en $c$ :** $d(f(x_{\varphi(n)}), f(y_{\varphi(n)})) \le d(f(x_{\varphi(n)}), f(c)) + d(f(c), f(y_{\varphi(n)})) \to 0$ — contradiction.

### 
**Subtilités :**

*   La compacité de $[a, b]$ est essentielle : $f(x) = 1/x$ est continue sur $]0, 1]$ mais pas uniformément continue.
*   Le théorème s'étend à tout espace métrique compact (pas seulement $[a, b]$).
*   L'espace d'arrivée $E$ peut être un evn quelconque (de dimension finie ou infinie) — la preuve ne l'utilise que comme espace métrique.

**Extensions :**

*   **Caractérisation :** Sur $]a, b[$, $f$ est uniformément continue $\iff f$ se prolonge par continuité en $a$ et en $b$.
*   L'uniforme continuité implique : $f$ transforme les suites de Cauchy en suites de Cauchy, permettant le prolongement aux complétés.

**Pièges classiques :**
*   ❌ Confondre continuité et continuité uniforme : la continuité uniforme est plus forte et est une propriété globale.
*   ❌ Oublier que $\delta$ ne dépend pas du point $x$ (uniformité).
*   ❌ Appliquer Heine sur un intervalle ouvert ou non borné.

---

## FLASHCARD 9 — Théorème 6 : CNS d'extremum local (point intérieur)

### RECTO
**Théorème 6 — Condition nécessaire d'extremum local en un point intérieur (scalaire)**

**Contexte :** Soit $f : I \to \mathbb{R}$ dérivable sur un intervalle ouvert $I$.

Énoncer la condition nécessaire d'extremum local pour une fonction dérivable en un point intérieur.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ est un intervalle ouvert.
*   $f : I \to \mathbb{R}$ est dérivable en $x_0 \in I$.
*   $x_0$ est un extremum local de $f$ (maximum ou minimum local).

**Énoncé formel :**

$$ f'(x_0) = 0. $$

**Démonstration (Esquisse) :**

Si $x_0$ est un minimum local : $\forall h > 0$ assez petit, $\frac{f(x_0+h)-f(x_0)}{h} \ge 0$ et $\frac{f(x_0-h)-f(x_0)}{-h} \le 0$. En passant à la limite, $f'(x_0) \ge 0$ et $f'(x_0) \le 0$, donc $f'(x_0) = 0$.

### 
**Subtilités :**

*   C'est une condition nécessaire, non suffisante : $f(x) = x^3$ en $x_0=0$ vérifie $f'(0)=0$ sans être un extremum local.
*   Le point doit être **intérieur** : en un point frontière (ex : $x_0=a$ dans $[a, b]$), $f'(a)=0$ n'est pas nécessaire pour un extremum.
*   La dérivabilité est indispensable : $f(x) = |x|$ admet un minimum en $0$ sans être dérivable en $0$.
*   Les points où $f'(x_0)=0$ s'appellent **points critiques** (ou stationnaires).

**Extensions :**

*   Condition suffisante d'ordre 2 : Si $f''(x_0) > 0$, alors $x_0$ est un minimum local strict (voir Thm 45).
*   En dimension $\ge 2$ : CNS $\implies df(x_0) = 0$ (différentielle nulle), voir Thm 42.

**Pièges classiques :**
*   ❌ Confondre CNS et condition suffisante.
*   ❌ Oublier de vérifier que $x_0$ est intérieur à $I$.
*   ❌ Conclure à un extremum dès que $f'(x_0)=0$.

---

## FLASHCARD 10 — Théorème 7 : Rolle

### RECTO
**Théorème 7 — Théorème de Rolle**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$, avec $a < b$.

Énoncer le théorème de Rolle avec toutes ses hypothèses et sa conclusion précise.

### VERSO
**Hypothèses complètes :**

*   $-\infty < a < b < +\infty$ (segment borné).
*   $f : [a, b] \to \mathbb{R}$ est continue sur $[a, b]$.
*   $f$ est dérivable sur $]a, b[$ (ouvert strict).
*   $f(a) = f(b)$.

**Énoncé formel :**

$$ \exists c \in ]a, b[, \quad f'(c) = 0. $$

**Démonstration (Esquisse) :**

Par le théorème de Weierstrass, $f$ atteint son maximum $M$ et son minimum $m$ sur $[a, b]$.
*   **Cas trivial :** Si $M=m$, $f$ est constante, $f' \equiv 0$ et tout $c \in ]a, b[$ convient.
*   **Cas non trivial :** $M \neq m$. L'un au moins (disons $M$) est atteint en un $c \in ]a, b[$ (car $f(a)=f(b)$, si $M=f(a)$ alors $m$ est atteint à l'intérieur). Par le Théorème 6, $f'(c)=0$.

### 
**Subtilités :**

*   $c \in ]a, b[$ : l'intervalle est ouvert — la conclusion ne dit rien sur les bords.
*   Les trois hypothèses sont indispensables : continuité sur $[a, b]$, dérivabilité sur $]a, b[$, et $f(a)=f(b)$.
*   Contre-exemple si $f$ non continue en $a$ ou $b$ : $f(x) = \begin{cases} x & x \in ]0, 1[ \\ 0 & x=0, 1 \end{cases}$.
*   Contre-exemple si $f$ non dérivable en un point : $f(x) = |x - 1/2|$ sur $[0, 1]$.

**Extensions :**

*   Rôle central : sert à démontrer le théorème des accroissements finis (TAF), Taylor-Lagrange, inégalité de TAF.
*   **Rolle et zéros :** Si $P$ est un polynôme de degré $n$, $P'$ a au moins $n-1$ zéros réels (si $P$ a $n$ zéros réels distincts). Application : $P$ a au plus $n$ zéros.
*   Pas de généralisation vectorielle directe : si $f : [a, b] \to \mathbb{R}^d$ avec $d \ge 2$, Rolle est faux en général (ex : $f(t) = (\cos 2\pi t, \sin 2\pi t)$, $f(0)=f(1)$ mais $f'(t) \neq 0$ pour tout $t$).

**Pièges classiques :**
*   ❌ Appliquer Rolle à $f : [a, b] \to \mathbb{R}^d$ avec $d \ge 2$ — invalide.
*   ❌ Oublier que la dérivabilité n'est requise que sur $]a, b[$ (ouvert), pas en $a$ et $b$.
*   ❌ Confondre Rolle et TAF (TAF ne demande pas $f(a)=f(b)$).

---

## FLASHCARD 11 — Théorème 8 : Accroissements finis

### RECTO
**Théorème 8 — Théorème des accroissements finis (TAF)**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$, avec $a < b$.

Énoncer le TAF (version égalité) avec hypothèses exactes. Préciser l'ouverture de l'intervalle où vit $c$.

### VERSO
**Hypothèses complètes :**

*   $-\infty < a < b < +\infty$.
*   $f : [a, b] \to \mathbb{R}$ continue sur $[a, b]$.
*   $f$ dérivable sur $]a, b[$.

**Énoncé formel :**

$$ \exists c \in ]a, b[, \quad f(b) - f(a) = f'(c)(b - a). $$

**Démonstration (Esquisse) :**
Appliquer le théorème de Rolle à la fonction auxiliaire :
$$ g(x) = f(x) - \frac{f(b)-f(a)}{b-a}(x-a). $$
On vérifie $g(a) = f(a) = g(b)$ (en développant), $g$ est continue sur $[a, b]$ et dérivable sur $]a, b[$. Rolle donne $c \in ]a, b[$ avec $g'(c)=0$, i.e., $f'(c) = \frac{f(b)-f(a)}{b-a}$.

### 
**Subtilités :**

*   $c \in ]a, b[$ strict — jamais en $a$ ou $b$.
*   **Pas de généralisation en dimension $\ge 2$ (version égalité) :** si $f : [a, b] \to \mathbb{R}^d$, il n'existe pas nécessairement de $c$ tel que $f(b) - f(a) = f'(c)(b - a)$ (contre-exemple : courbe de Rolle). C'est pourquoi l'inégalité des accroissements finis (Thm 9) est fondamentale.
*   Le TAF (version égalité) est strictement réel-scalaire.

**Extensions :**

*   Donne immédiatement : si $f' \ge 0$ sur $]a, b[$, alors $f$ est croissante sur $[a, b]$.
*   Utilisé pour l'unicité dans Cauchy-Lipschitz.

**Pièges classiques :**
*   ❌ Appliquer le TAF (version égalité) à des fonctions à valeurs vectorielles.
*   ❌ Oublier la continuité sur $[a, b]$ (fermé) et ne garder que la dérivabilité sur $]a, b[$.
*   ❌ Confondre TAF et Rolle.

---

## FLASHCARD 12 — Théorème 9 : Inégalité des accroissements finis

### RECTO
**Théorème 9 — Inégalité des accroissements finis (IAF)**

**Contexte :** Soit $f : [a, b] \to E$ où $E$ est un espace vectoriel normé.

Énoncer l'inégalité des accroissements finis dans le cadre vectoriel, avec hypothèses exactes.

### VERSO
**Hypothèses complètes :**

*   $-\infty < a < b < +\infty$.
*   $E$ est un espace vectoriel normé quelconque (dimension finie ou infinie).
*   $f : [a, b] \to E$ est continue sur $[a, b]$ et dérivable sur $]a, b[$.
*   Il existe $M \ge 0$ tel que $\forall t \in ]a, b[, \|f'(t)\| \le M$.

**Énoncé formel :**

$$ \|f(b) - f(a)\| \le M(b - a). $$

**Démonstration (Esquisse) :**

*   Appliquer le TAF réel à la fonction réelle $\varphi(t) = \|\cdot\| \circ f$ ne fonctionne pas directement (la norme n'est pas dérivable en général).
*   **Méthode correcte :** Pour tout $\xi \in E^*$ avec $\|\xi\| \le 1$, la fonction $t \mapsto \xi(f(t))$ est réelle, continue sur $[a, b]$, dérivable sur $]a, b[$, avec $|\xi(f(t))'| = |\xi(f'(t))| \le \|\xi\|\|f'(t)\| \le M$. Le TAF scalaire donne $|\xi(f(b)) - \xi(f(a))| \le M(b-a)$. On conclut par $\|f(b) - f(a)\| = \sup_{\|\xi\| \le 1} |\xi(f(b) - f(a))|$ (Hahn-Banach ou caractérisation de la norme).
*   **Alternative en dimension finie :** Taylor reste intégral donne $f(b) - f(a) = \int_a^b f'(t) dt$ et $\|f(b) - f(a)\| \le \int_a^b \|f'(t)\| dt \le M(b-a)$.

### 
**Subtilités :**

*   C'est le **bon énoncé vectoriel** : contrairement au TAF (version égalité), l'IAF est valable pour $f$ à valeurs dans un evn quelconque, y compris dimension infinie.
*   La borne $M$ doit majorer $\|f'(t)\|$ sur tout $]a, b[$.
*   **Inégalité stricte :** Si $\|f'(t)\| < M$ sur $]a, b[$, on peut avoir égalité dans l'IAF (ex : $f$ linéaire).

**Extensions :**

*   Utilisé massivement : unicité Cauchy-Lipschitz, majoration d'erreurs, continuité lipschitzienne.
*   Corollaire : Si $f' \equiv 0$ sur $]a, b[$, alors $f$ est constante sur $[a, b]$ (prendre $M=0$).
*   **Version intégrale :** $\|f(b) - f(a)\| \le \int_a^b \|f'(t)\| dt$ (plus précis, cf. Taylor reste intégral).

**Pièges classiques :**
*   ❌ Utiliser le TAF (version égalité) pour les fonctions vectorielles.
*   ❌ Majorer $\|f'(t)\|$ seulement en certains points — la borne doit être uniforme.
*   ❌ Oublier que l'IAF nécessite quand même la continuité sur $[a, b]$ et la dérivabilité sur $]a, b[$.

---

## FLASHCARD 13 — Théorème 10 : Limite de la dérivée, prolongement $C^1$

### RECTO
**Théorème 10 — Théorème de la limite de la dérivée / Prolongement $C^1$**

**Contexte :** Soit $f : ]a, b[ \to E$ (ou $f : [a, b[ \to E$) dérivable.

Énoncer le théorème de la limite de la dérivée et le théorème de prolongement $C^1$.

### VERSO
**Hypothèses complètes :**

*   $E$ est un espace vectoriel normé complet (de Banach) — dimension quelconque.
*   $f : ]a, b[ \to E$ (ou $[a, b[$) est dérivable sur $]a, b[$ (resp. $]a, b[$).
*   $f$ est continue en $a$ (si on traite $[a, b[$, sinon on suppose $f$ prolongeable par continuité en $a$).
*   $f'$ admet une limite $\ell \in E$ en $a^+$ : $\lim_{t \to a^+} f'(t) = \ell$.

**Énoncé formel (prolongement $C^1$) :**

On définit $\tilde{f}(a) = \lim_{t \to a^+} f(t) \in E$ (limite qui existe par IAF).
Alors $\tilde{f}$ est dérivable en $a$ à droite et $\tilde{f}'(a) = \ell$.

En particulier, si $f$ est continue sur $[a, b]$, dérivable sur $]a, b[$, et si $f'$ admet une limite $\ell$ en $a^+$ (resp. $b^-$), alors :
$f$ est dérivable en $a$ (resp. $b$) et $f'(a) = \ell$ (resp. $f'(b) = \ell$).

**Corollaire (critère $C^1$) :**

Si $f : [a, b] \to E$ est continue sur $[a, b]$, dérivable sur $]a, b[$, et si $f'$ se prolonge par continuité sur $[a, b]$, alors $f \in C^1([a, b], E)$.

**Démonstration (Esquisse) :**

Pour $x > a$, $\frac{f(x) - f(a)}{x - a} = \frac{1}{x-a} \int_a^x f'(t) dt \to \ell$ par le lemme de la moyenne (si $f' \to \ell$ uniformément, on peut intervertir limite et intégrale).
Alternativement : IAF appliqué à $f(x) - f(a) - \ell(x-a)$ donne $\|f(x) - f(a) - \ell(x-a)\| \le \sup_{]a, x[} \|f'(t) - \ell\| \cdot (x-a) = o(x-a)$.

### 
**Subtilités :**

*   La complétude de $E$ est utilisée pour garantir l'existence de la limite $\lim_{t \to a^+} f(t)$ via l'IAF (suite de Cauchy).
*   Ce théorème est fondamental pour vérifier la régularité $C^1$ en pratique : on dérive, on regarde la limite de la dérivée.
*   **Attention :** La limite de $f'$ en $a$ implique la dérivabilité de $f$ en $a$ et $f'(a) = \lim f'$ — mais on a besoin de la continuité de $f$ en $a$ ou de l'existence de la limite de $f$ en $a$.

**Extensions :**

*   Généralisation aux fonctions $C^k$ : si $f^{(k)}$ admet une limite continue, alors $f \in C^k$.
*   Utilisé pour prouver la régularité des séries de fonctions et des intégrales à paramètre.

**Pièges classiques :**
*   ❌ Oublier de vérifier la continuité de $f$ en $a$ (ou l'existence de $\lim_{t \to a^+} f(t)$).
*   ❌ Appliquer à $E$ non complet (alors la limite de $f$ en $a$ peut ne pas exister dans $E$).
*   ❌ Confondre « $f'$ admet une limite » et « $f'$ est continue » — ce sont des propriétés équivalentes ici (c'est le cœur du théorème).

---

## FLASHCARD 14 — Théorème 11 : Taylor reste intégral

### RECTO
**Théorème 11 — Formule de Taylor avec reste intégral**

**Contexte :** Soit $f : I \to E$, $I$ intervalle de $\mathbb{R}$, $E$ evn.

Énoncer la formule de Taylor avec reste intégral, en précisant la régularité requise, la nature de l'intervalle, et l'espace d'arrivée.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $a, b \in I$.
*   $E$ est un espace vectoriel normé (dimension quelconque, mais $E$ doit permettre l'intégration — e.g., $E$ de Banach).
*   $f \in C^{n+1}(I, E)$ : $f$ est $(n+1)$ fois continûment dérivable sur $I$.

**Énoncé formel :**

$$ f(b) = \sum_{k=0}^n \frac{(b-a)^k}{k!} f^{(k)}(a) + \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt. $$

Le terme $R_n(b) = \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt$ est le reste intégral d'ordre $n$.

**Démonstration (Esquisse) :**
Récurrence sur $n$, en appliquant une intégration par parties au reste :
$$ \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt = \left[ - \frac{(b-t)^{n+1}}{(n+1)!} f^{(n+1)}(t) \right]_a^b + \int_a^b \frac{(b-t)^{n+1}}{(n+1)!} f^{(n+2)}(t) dt $$
Le terme évalué donne $\frac{(b-a)^{n+1}}{(n+1)!} f^{(n+1)}(a)$ et le reste se déplace à l'ordre $n+1$.

### 
**Subtilités :**

*   La régularité requise est $f \in C^{n+1}$ (pas seulement $C^n$) — la dérivée d'ordre $n+1$ doit exister et être continue.
*   Formule valable pour $E$ evn quelconque (vectoriel) — c'est l'un des grands avantages du reste intégral sur le reste de Lagrange.
*   Le reste intégral donne une majoration immédiate : $\|R_n(b)\| \le \frac{|b-a|^{n+1}}{(n+1)!} \sup_{t \in [a, b]} \|f^{(n+1)}(t)\|$ (Thm 12).

**Extensions :**

*   **Formule de Taylor-Lagrange (Thm 12) :** inégalité déduite du reste intégral par majoration.
*   **Taylor-Young (Thm 13) :** formule asymptotique avec reste en $o((b-a)^n)$, ne requiert que $C^n$ (ou $n$ fois dérivable).
*   La formule s'étend aux fonctions de plusieurs variables (Taylor en dimension $d$, Prop 29).

**Pièges classiques :**
*   ❌ Confondre les ordres : Taylor reste intégral à l'ordre $n$ nécessite $f \in C^{n+1}$, pas $C^n$.
*   ❌ Penser que le reste de Lagrange (scalaire) s'applique au cas vectoriel — faux, seul le reste intégral fonctionne en général.
*   ❌ Oublier le facteur $\frac{(b-t)^n}{n!}$ (et non $\frac{(b-t)^{n+1}}{(n+1)!}$) dans l'intégrant.

---

## FLASHCARD 15 — Théorème 12 : Inégalité de Taylor-Lagrange

### RECTO
**Théorème 12 — Inégalité de Taylor-Lagrange**

**Contexte :** Soit $f : I \to E$, $E$ evn.

Énoncer l'inégalité de Taylor-Lagrange avec hypothèses exactes. Préciser la nature de $E$.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $a, b \in I$ (avec $a \le b$ ou $b \le a$ — la formule est symétrique en $|b-a|$).
*   $E$ espace vectoriel normé.
*   $f \in C^{n+1}(I, E)$.
*   $M_{n+1} = \sup_{t \in [a, b]} \|f^{(n+1)}(t)\| < +\infty$ (borne bien définie par continuité sur le compact $[a, b]$ si $I$ contient $[a, b]$).

**Énoncé formel :**

$$ \left\| f(b) - \sum_{k=0}^n \frac{(b-a)^k}{k!} f^{(k)}(a) \right\| \le \frac{|b-a|^{n+1}}{(n+1)!} \cdot M_{n+1}. $$

**Démonstration (Esquisse) :**
Majorer le reste intégral (Thm 11) :
$$ \|R_n(b)\| = \left\| \int_a^b \frac{(b-t)^n}{n!} f^{(n+1)}(t) dt \right\| \le \int_a^b \frac{|b-t|^n}{n!} \|f^{(n+1)}(t)\| dt $$
$$ \le M_{n+1} \int_a^b \frac{(b-t)^n}{n!} dt = \frac{|b-a|^{n+1}}{(n+1)!} M_{n+1}. $$

### 
**Subtilités :**

*   La majoration est valable dans tout evn $E$ (vectoriel, dimension quelconque).
*   La constante $(n+1)!$ au dénominateur est cruciale pour les estimations de convergence de séries entières.
*   Si $M_{n+1} \to 0$ quand $n \to \infty$ (à $b-a$ fixé), la série de Taylor converge vers $f$.

**Extensions :**

*   Cas $n=0$ : $\|f(b) - f(a)\| \le M_1 |b-a|$ — c'est l'IAF.
*   Donne des bornes d'erreur explicites pour l'approximation polynomiale.

**Pièges classiques :**
*   ❌ Oublier le facteur $(n+1)!$ (et non $n!$).
*   ❌ Utiliser cette inégalité sans avoir vérifié que $\sup \|f^{(n+1)}\| < +\infty$ sur $[a, b]$.

---

## FLASHCARD 16 — Théorème 13 : Taylor-Young

### RECTO
**Théorème 13 — Formule de Taylor-Young**

**Contexte :** Soit $f : I \to \mathbb{R}$ (ou $f : I \to E$, $E$ evn) de classe $C^n$ (ou seulement $n$ fois dérivable en $a$).

Énoncer la formule de Taylor-Young à l'ordre $n$ en $a$, avec la régularité minimale requise et la précision du reste.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle ouvert, $a \in I$.
*   $f : I \to E$ est $n$ fois dérivable en $a$ (condition plus faible que $C^n$).

**Énoncé formel :**

$$ f(a+h) = \sum_{k=0}^n \frac{h^k}{k!} f^{(k)}(a) + o(h^n) \quad \text{quand } h \to 0. $$

Autrement dit :
$$ f(x) = \sum_{k=0}^n \frac{(x-a)^k}{k!} f^{(k)}(a) + o((x-a)^n) \quad \text{quand } x \to a. $$

**Démonstration (Esquisse) :**
Par récurrence sur $n$, en utilisant la règle de L'Hôpital ou une récurrence sur le reste. La clé est :
$$ r_n(h) = f(a+h) - \sum_{k=0}^n \frac{h^k}{k!} f^{(k)}(a), \quad \lim_{h \to 0} \frac{r_n(h)}{h^n} = 0. $$
On prouve cela par récurrence : $r_n'(h) = r_{n-1}'(h) - \frac{h^n}{n!} f^{(n)}(a)$ n'est pas correct.
Correction : $r_n'(h) = f'(a+h) - \sum_{k=1}^n \frac{h^{k-1}}{(k-1)!} f^{(k)}(a)$. Le terme de degré $n$ de la somme dérivée devient le terme de degré $n-1$ de la dérivée. Et $r_{n-1}(h) = o(h^{n-1})$ par hypothèse de récurrence.

### 
**Subtilités :**

*   **Régularité minimale :** Il suffit que $f$ soit $n$ fois dérivable en $a$ (pas nécessairement $C^n$ au voisinage de $a$). C'est plus faible que Taylor reste intégral (qui demande $C^{n+1}$).
*   Le reste est $o(h^n)$ et non $O(h^{n+1})$ — si $f \in C^{n+1}$, on peut préciser $O(h^{n+1})$ via l'inégalité de Taylor-Lagrange.
*   **Unicité du DL :** Le polynôme de Taylor $\sum_{k=0}^n \frac{(x-a)^k}{k!} f^{(k)}(a)$ est l'unique polynôme $P$ de degré $\le n$ tel que $f(x) = P(x) + o((x-a)^n)$.
*   **Cas vectoriel :** La formule est valable pour $f : I \to E$ si $f$ est $n$ fois dérivable en $a$ (avec $E$ evn quelconque).

**Extensions :**

*   **DL composés, produits, quotients :** Toutes les opérations sur les DL sont licites à l'ordre $n$.
*   **Lien avec les séries entières :** Si $f$ est développable en série entière au voisinage de $a$, le DL coïncide avec la série entière.

**Pièges classiques :**
*   ❌ Écrire $o(h^n)$ quand on a prouvé seulement $O(h^n)$ (pas pareil).
*   ❌ Confondre Taylor-Young ($o(h^n)$, faible régularité) et Taylor reste intégral ($C^{n+1}$, reste explicite).
*   ❌ Oublier que le DL est unique — on peut identifier les coefficients terme à terme.
*   ❌ Dériver terme à terme un DL sans justification (on ne peut dériver un DL que si la fonction est $C^{n+1}$, sinon c'est faux en général).

---

# CHAPITRE 2 — Suites et séries, familles sommables

## FLASHCARD 17 — Proposition 2 : Formule de Stirling

### RECTO
**Proposition 2 — Formule de Stirling**

Énoncer la formule de Stirling avec l'équivalent exact et le développement asymptotique.

### VERSO
**Énoncé formel :**

$$ n! \underset{n \to +\infty}{\sim} \sqrt{2\pi n} \left( \frac{n}{e} \right)^n. $$

Plus précisément, il existe un développement asymptotique :
$$ n! = \sqrt{2\pi n} \left( \frac{n}{e} \right)^n \exp\left( \frac{1}{12n} + O\left(\frac{1}{n^2}\right) \right). $$

**Démonstration (Esquisse, idée principale) :**

*   Poser $u_n = \frac{n!}{n^n e^{-n} \sqrt{n}}$. Montrer que $\ln u_n$ converge (calcul via $\sum \ln k - \int \ln$, ou via la formule de Wallis).
*   La constante $\sqrt{2\pi}$ est déterminée en utilisant l'intégrale de Wallis :
    $$ \frac{\pi}{2} = \lim_{n \to \infty} \frac{[(2n)!!]^2}{[(2n-1)!!]^2 \cdot (2n+1)}, \text{ combiné à Stirling.} $$

### 
**Subtilités :**

*   La constante $\sqrt{2\pi}$ n'est pas triviale — c'est la même que dans la densité gaussienne.
*   **Utilisations fréquentes :**
    *   $\binom{2n}{n} \sim \frac{4^n}{\sqrt{\pi n}}$
    *   $\frac{1}{\sqrt{n}} \binom{n}{k}$ pour le TCL discret
    *   Rayon de convergence de séries entières via la règle de d'Alembert.
*   Logarithme : $\ln(n!) = n \ln n - n + \frac{1}{2} \ln(2\pi n) + O(1/n)$.

**Pièges classiques :**
*   ❌ Oublier le facteur $\sqrt{2\pi n}$ (et écrire seulement $(n/e)^n$).
*   ❌ Utiliser Stirling sans préciser qu'on travaille avec un équivalent (et non une égalité).

---

## FLASHCARD 18 — À connaître 2 : Développement asymptotique de $H_n$

### RECTO
**À connaître 2 — Développement asymptotique de la série harmonique $H_n$**

Donner le développement asymptotique de $H_n = \sum_{k=1}^n \frac{1}{k}$ quand $n \to +\infty$, en précisant la constante d'Euler-Mascheroni.

### VERSO
**Énoncé formel :**

$$ H_n = \sum_{k=1}^n \frac{1}{k} = \ln n + \gamma + \frac{1}{2n} - \frac{1}{12n^2} + O\left(\frac{1}{n^4}\right), $$

où $\gamma$ est la constante d'Euler-Mascheroni :
$$ \gamma = \lim_{n \to +\infty} (H_n - \ln n) \approx 0,5772\dots $$

**À connaître impérativement :**
$$ H_n = \ln n + \gamma + o(1) \quad (n \to +\infty), $$
$$ H_n - \ln n \xrightarrow[n \to +\infty]{} \gamma > 0. $$

**Démonstration (Esquisse) :**
Par comparaison série-intégrale (Proposition 3) : $\sum_{k=1}^n \frac{1}{k} - \int_1^n \frac{dt}{t}$ est une suite croissante bornée (ou décroissante selon l'ordre), donc converge vers $\gamma$.

### 
**Subtilités :**

*   $\gamma$ est une constante transcendante (conjecture) — on ne sait toujours pas si elle est irrationnelle.
*   $H_n \to +\infty$ (la série harmonique diverge), mais très lentement : $H_n \sim \ln n$.
*   Utilisations : convergence de séries, équivalents, développements asymptotiques de sommes.

**Pièges classiques :**
*   ❌ Penser que $H_n$ converge.
*   ❌ Confondre $\gamma$ avec $e$ ou $\pi$ — c'est une constante distincte.

---

## FLASHCARD 19 — Théorème 14 : Critère des séries alternées (Leibniz)

### RECTO
**Théorème 14 — Critère des séries alternées (Leibniz)**

**Contexte :** Soit $\sum (-1)^n a_n$ une série alternée.

Énoncer le critère des séries alternées avec hypothèses exactes et conclure sur la convergence et la qualité des restes.

### VERSO
**Hypothèses complètes :**

*   $(a_n)_{n \ge 0}$ est une suite de réels positifs : $a_n \ge 0$ pour tout $n$.
*   $(a_n)$ est décroissante (au sens large) : $a_{n+1} \le a_n$ pour tout $n$.
*   $a_n \xrightarrow[n \to +\infty]{} 0$.

**Énoncé formel :**

La série $\sum_{n \ge 0} (-1)^n a_n$ est convergente.

De plus, si $S = \sum_{n=0}^{+\infty} (-1)^n a_n$ et $S_N = \sum_{n=0}^N (-1)^n a_n$, alors :
$$ \forall N \in \mathbb{N}, \quad |S - S_N| \le a_{N+1}. $$
Et le reste $S - S_N$ est du signe de $(-1)^{N+1} a_{N+1}$ (signe du premier terme négligé).

**Démonstration (Esquisse) :**

Les suites des sommes partielles d'indices pairs $(S_{2p})$ et impairs $(S_{2p+1})$ sont respectivement croissante et décroissante, et encadrent $S$. Elles sont adjacentes (leur différence $a_{2p+1} \to 0$), donc convergent vers la même limite $S$.
$$ |S - S_N| \le |S_{N+1} - S_N| = a_{N+1}. $$

### 
**Subtilités :**

*   Les trois conditions (positivité, décroissance, limite nulle) sont toutes nécessaires : la décroissance seule ne suffit pas si $a_n \not\to 0$.
*   La décroissance n'est requise qu'à partir d'un certain rang (condition asymptotique).
*   Le critère de Leibniz ne donne que la convergence, pas la convergence absolue : $\sum (-1)^n / n$ converge mais $\sum 1/n$ diverge.
*   **Majoration du reste :** $|S - S_N| \le a_{N+1}$ est une majoration effective et simple — très utilisée en pratique.

**Extensions :**

*   **Critère de Dirichlet (généralisation) :** $\sum a_n b_n$ converge si $(a_n)$ décroît vers $0$ et les sommes partielles de $(b_n)$ sont bornées.
*   Le critère de Leibniz est un cas particulier de Dirichlet avec $b_n = (-1)^n$.

**Pièges classiques :**
*   ❌ Oublier la condition de positivité ($a_n \ge 0$).
*   ❌ Confondre convergence et convergence absolue.
*   ❌ Oublier que la majoration du reste est $a_{N+1}$ (le premier terme non inclus dans $S_N$).

---

## FLASHCARD 20 — Théorème 15 : Comparaison à une série absolument convergente, séries de Riemann

### RECTO
**Théorème 15 — Comparaison à une série absolument convergente / Séries de Riemann**

**Contexte :** Soit $\sum u_n$ une série de termes réels ou complexes.

Énoncer le critère de comparaison pour les séries à termes positifs et les séries de Riemann $\sum 1/n^\alpha$.

### VERSO
**Hypothèses et énoncé :**

**Partie 1 — Critère de comparaison (termes positifs) :**

Soient $(u_n), (v_n)$ des suites de réels positifs avec $0 \le u_n \le v_n$ à partir d'un certain rang.

*   $\sum v_n \text{ converge} \implies \sum u_n \text{ converge.}$
*   $\sum u_n \text{ diverge} \implies \sum v_n \text{ diverge.}$

**Partie 2 — Règle de comparaison (équivalents, $\sim$) :**

Si $u_n \sim v_n$ ($u_n, v_n > 0$) :
$\sum u_n$ et $\sum v_n$ ont même nature.

**Partie 3 — Séries de Riemann :**

$$ \sum_{n=1}^{+\infty} \frac{1}{n^\alpha} \begin{cases} \text{converge} & \text{si } \alpha > 1 \\ \text{diverge} & \text{si } \alpha \le 1. \end{cases} $$

**Démonstration (Riemann, esquisse) :**
Par comparaison série-intégrale (Prop 3) : $\int_1^{+\infty} t^{-\alpha} dt$ converge $\iff \alpha > 1$.

### 
**Subtilités :**

*   Le critère de comparaison requiert des termes positifs (ou l'application à $|u_n|$ pour la convergence absolue).
*   Pour $\alpha = 1$ : $\sum 1/n$ diverge (série harmonique) — cas limite souvent piégeux.
*   Si $u_n = O(v_n)$ avec $\sum v_n$ convergente $\implies \sum u_n$ absolument convergente.
*   Si $u_n \sim v_n$ mais que $u_n$ change de signe, la comparaison n'implique pas la même nature pour les séries.

**Extensions :**

*   **Séries de Bertrand (À connaître 3) :** cas limite $\alpha=1$ avec logarithmes.

**Pièges classiques :**
*   ❌ Appliquer la comparaison à des séries de signe quelconque.
*   ❌ Oublier le cas $\alpha=1$ (série harmonique diverge).
*   ❌ Confondre $u_n = O(v_n)$ et $u_n \le v_n$.

---

## FLASHCARD 21 — À connaître 3 : Séries de Bertrand

### RECTO
**À connaître 3 — Séries de Bertrand**

Énoncer la condition de convergence des séries de Bertrand $\sum \frac{1}{n^\alpha (\ln n)^\beta}$.

### VERSO
**Énoncé formel :**

$$ \sum_{n=2}^{+\infty} \frac{1}{n^\alpha (\ln n)^\beta} \begin{cases} \text{converge} & \text{si } \alpha > 1, \text{ ou si } \alpha = 1 \text{ et } \beta > 1, \\ \text{diverge} & \text{si } \alpha < 1, \text{ ou si } \alpha = 1 \text{ et } \beta \le 1. \end{cases} $$

**Démonstration (Esquisse) :**

*   $\alpha \neq 1$ : comparaison aux séries de Riemann.
*   $\alpha = 1$ : comparaison série-intégrale avec $\int_2^{+\infty} \frac{dt}{t (\ln t)^\beta}$, qui converge $\iff \beta > 1$ (changement de variable $u = \ln t$, intégrale de Riemann en $u$).

### 
**Subtilités :**

*   La somme commence à $n=2$ car $\ln 1 = 0$.
*   Cas $\alpha=1, \beta=1$ : $\sum \frac{1}{n \ln n}$ diverge (par comparaison avec $\int \frac{dt}{t \ln t} = \ln(\ln t) \to +\infty$).

**Pièges classiques :**
*   ❌ Oublier la restriction au cas $\alpha=1$ pour la distinction par $\beta$.
*   ❌ Commencer la somme à $n=1$ (division par $\ln 1 = 0$).

---

## FLASHCARD 22 — Théorème 16 : Sommation des relations de comparaison

### RECTO
**Théorème 16 — Sommation des relations de comparaison**

**Contexte :** Soient $\sum u_n$ et $\sum v_n$ des séries à termes positifs.

Énoncer le théorème de sommation des relations de comparaison ($u_n = O(v_n), u_n = o(v_n), u_n \sim v_n$) en termes de restes ou de sommes partielles.

### VERSO
**Hypothèses :** $(u_n), (v_n)$ suites de réels strictement positifs à partir d'un certain rang.

**Énoncé formel :**

Notons $U_n = \sum_{k=0}^n u_k$, $V_n = \sum_{k=0}^n v_k$, $R_n = \sum_{k=n+1}^{+\infty} u_k$ (reste si $\sum u_k < +\infty$).

**Cas $\sum v_n$ diverge :**
*   $u_n \underset{n \to \infty}{\sim} v_n \implies U_n \underset{n \to \infty}{\sim} V_n$.
*   $u_n = o(v_n) \implies U_n = o(V_n)$.

**Cas $\sum v_n$ converge (et $\sum u_n$ converge aussi) :**
*   $u_n \underset{n \to \infty}{\sim} v_n \implies R_n^u \underset{n \to \infty}{\sim} R_n^v$ (restes équivalents).
*   $u_n = o(v_n) \implies R_n^u = o(R_n^v)$.

**Démonstration (Esquisse) :**
Théorème de Cesàro ou lemme de Stolz-Cesàro : si $u_n/v_n \to \ell$, alors $U_n/V_n \to \ell$ (sous $V_n \to +\infty$).

### 
**Subtilités :**

*   Les deux cas (convergent/divergent) donnent des résultats différents — il faut distinguer.
*   La positivité des termes est cruciale (pour les restes et la monotonie des sommes partielles).
*   Ce théorème est très utilisé pour trouver des équivalents de sommes partielles ou de restes.

**Pièges classiques :**
*   ❌ Appliquer à des séries de signe quelconque.
*   ❌ Confondre le cas divergent et le cas convergent.

---

## FLASHCARD 23 — À connaître 4 : Croissance sur/sous-géométrique

### RECTO
**À connaître 4 — Croissance sur-géométrique et sous-géométrique**

Énoncer les critères de croissance sur-géométrique et sous-géométrique d'une suite $(u_n)$ en termes de $u_{n+1}/u_n$, et en déduire la nature de la série $\sum u_n$.

### VERSO
**Énoncé formel :**

Soit $(u_n)$ une suite de réels strictement positifs.

**Sous-géométrique (convergence) :**
$$ \exists q \in [0, 1[, \exists N \in \mathbb{N}, \forall n \ge N, \frac{u_{n+1}}{u_n} \le q \implies \sum u_n \text{ converge}. $$

Plus généralement (règle de d'Alembert) :
$$ \limsup_{n \to \infty} \frac{u_{n+1}}{u_n} < 1 \implies \sum u_n \text{ converge absolument}. $$

**Sur-géométrique (divergence) :**
$$ \exists q > 1, \exists N \in \mathbb{N}, \forall n \ge N, \frac{u_{n+1}}{u_n} \ge q \implies u_n \not\to 0 \implies \sum u_n \text{ diverge}. $$

Plus généralement :
$$ \liminf_{n \to \infty} \frac{u_{n+1}}{u_n} > 1 \implies \sum u_n \text{ diverge}. $$

### 
**Subtilités :**

*   Si $u_{n+1}/u_n \to 1$ : aucune conclusion possible avec ce critère seul.
*   La règle de d'Alembert est stricte : limite strictement $<1$ ou $>1$.
*   **Règle de la racine (Cauchy) :** $\limsup (u_n)^{1/n} < 1 \implies$ convergence ; $> 1 \implies$ divergence (plus puissante que d'Alembert).

**Pièges classiques :**
*   ❌ Conclure sur la nature de $\sum u_n$ quand $u_{n+1}/u_n \to 1$.
*   ❌ Oublier que ces critères supposent $u_n > 0$.

---

## FLASHCARD 24 — Proposition 3 : Comparaison série-intégrale

### RECTO
**Proposition 3 — Comparaison série-intégrale**

**Contexte :** Soit $f : [1, +\infty[ \to \mathbb{R}$ une fonction.

Énoncer la proposition de comparaison série-intégrale, avec hypothèses exactes et double inégalité.

### VERSO
**Hypothèses complètes :**

*   $f : [1, +\infty[ \to \mathbb{R}_+$ est positive, continue (ou localement intégrable) et décroissante sur $[1, +\infty[$.

**Énoncé formel :**

Pour tout $n \ge 1$ :
$$ \int_1^{n+1} f(t) dt \le \sum_{k=1}^n f(k) \le f(1) + \int_1^n f(t) dt. $$

**Conséquence — nature de la série :**
$$ \sum_{n \ge 1} f(n) \text{ converge} \iff \int_1^{+\infty} f(t) dt \text{ converge}. $$

**Démonstration (Esquisse) :**
Par décroissance de $f$ : sur $[k, k+1]$, $f(k+1) \le f(t) \le f(k)$. Intégrer sur $[k, k+1]$ donne $f(k+1) \le \int_k^{k+1} f(t) dt \le f(k)$. Sommer pour $k=1, \dots, n$.

### 
**Subtilités :**

*   La décroissance est essentielle. Pour $f$ non monotone, le résultat peut être faux.
*   La comparaison donne aussi des équivalents : si $\int_1^n f(t) dt \sim g(n)$ et $f$ décroissante, alors $\sum_{k=1}^n f(k) \sim g(n)$.
*   **Applications :** Séries de Riemann ($f(t) = t^{-\alpha}$), $H_n \sim \ln n$.

**Pièges classiques :**
*   ❌ Appliquer à une fonction non monotone.
*   ❌ Oublier que les inégalités sont $\le$ (pas strictes).
*   ❌ Confondre les bornes de la double inégalité.

---

## FLASHCARD 25 — Proposition 4 : Sommation par paquets, somme double

### RECTO
**Proposition 4 — Sommation par paquets et somme double**

**Contexte :** Familles sommables de réels positifs.

Énoncer la proposition de Fubini-Tonelli discrète (permutation des sommations pour des termes positifs) et le théorème de sommation par paquets.

### VERSO
**Partie 1 — Sommation par paquets :**

Soit $\sum u_n$ une série à termes réels. Soit $(I_k)_{k \in \mathbb{N}}$ une partition de $\mathbb{N}$ en intervalles entiers consécutifs $I_k = \{n_k, n_k+1, \dots, n_{k+1}-1\}$.

$$ \sum_{n=0}^{+\infty} u_n \text{ converge} \implies \sum_{k=0}^{+\infty} \left( \sum_{n \in I_k} u_n \right) \text{ converge et vaut } \sum_{n=0}^{+\infty} u_n. $$

Réciproque : vraie si les $u_n$ sont de signe constant sur chaque $I_k$ (ou termes positifs).

**Partie 2 — Fubini discret (termes positifs) :**

Soit $(a_{i,j})_{(i,j) \in \mathbb{N}^2}$ une famille de réels positifs.

$$ \sum_{(i,j) \in \mathbb{N}^2} a_{i,j} = \sum_{i=0}^{+\infty} \left( \sum_{j=0}^{+\infty} a_{i,j} \right) = \sum_{j=0}^{+\infty} \left( \sum_{i=0}^{+\infty} a_{i,j} \right) \in [0, +\infty]. $$

Si l'une de ces sommes est finie, elles sont toutes égales et finies (famille sommable).

Pour des termes quelconques : la permutation est licite si la famille est absolument sommable : $\sum_{i,j} |a_{i,j}| < +\infty$.

### 
**Subtilités :**

*   Pour les termes de signe quelconque, la permutation des sommations peut être fausse si la famille n'est pas absolument sommable (contre-exemple : $a_{i,j} = 1_{i=j} - 1_{i=j+1}$).
*   La sommation par paquets est une opération sur une série qui regroupe des termes — licite si la série converge absolument, ou si les paquets sont consécutifs et la série converge (par définition de la convergence).

**Pièges classiques :**
*   ❌ Permuter les sommes sans vérifier l'absolue sommabilité.
*   ❌ Oublier que la sommation par paquets est licite dans un sens mais pas nécessairement dans l'autre pour des séries conditionnellement convergentes.

---

## FLASHCARD 26 — À connaître 5 : Théorème de convergence dominée sur les séries

### RECTO
**À connaître 5 — Théorème de convergence dominée discret (séries)**

**Contexte :** Soit $(u_n(x))_{n \in \mathbb{N}}$ une famille de fonctions.

Énoncer le théorème de convergence dominée dans le cadre discret (séries), avec hypothèses exactes.

### VERSO
**Hypothèses complètes :**

*   $X$ est un ensemble (typiquement un intervalle ou $\mathbb{N}$).
*   Pour chaque $n \in \mathbb{N}$, $u_n : X \to \mathbb{R}$ (ou $\mathbb{C}$).
*   **Convergence ponctuelle :** $\forall x \in X, u_n(x) \xrightarrow[n \to \infty]{} \ell(x)$.
*   **Domination :** $\exists (v_n)_{n \in \mathbb{N}}$ suite de réels positifs telle que $\forall x \in X, \forall n \in \mathbb{N}, |u_n(x)| \le v_n$, et $\sum_n v_n < +\infty$.

**Énoncé formel :**

$\sum_{n=0}^{+\infty} u_n(x)$ converge absolument et normalement en $x \in X$,
et
$$ \sum_{n=0}^{+\infty} \ell(x) = \lim_{N \to \infty} \sum_{n=0}^N \ell(x). $$

Plus précisément :
$$ \lim_{N \to \infty} \sum_{n=0}^N u_n(x) = \sum_{n=0}^{+\infty} u_n(x) \quad \text{uniformément en } x \in X. $$

Et : $\sum_{n=0}^{+\infty} u_n(x) \xrightarrow{?} \sum_{n=0}^{+\infty} \ell(x)$ (permutation limite et série possible sous hypothèses supplémentaires).

### 
**Subtilités :**

*   La domination $|u_n(x)| \le v_n$ avec $\sum v_n < +\infty$ garantit la convergence normale de la série $\sum u_n$.
*   Ce résultat est la version discrète du théorème de convergence dominée de Lebesgue (Thm 31).

**Pièges classiques :**
*   ❌ Oublier que la suite dominante $(v_n)$ doit être indépendante de $x$.
*   ❌ Confondre convergence normale et convergence uniforme.

---

# CHAPITRE 3 — Intégration

## FLASHCARD 27 — Proposition 5 : Convergence des sommes de Riemann

### RECTO
**Proposition 5 — Convergence des sommes de Riemann**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ (ou $\mathbb{C}$).

Énoncer la proposition sur la convergence des sommes de Riemann vers l'intégrale, avec hypothèses minimales.

### VERSO
**Hypothèses complètes :**

*   $f : [a, b] \to \mathbb{R}$ est continue sur $[a, b]$ (ou, plus généralement, Riemann-intégrable).

**Énoncé formel :**

$$ \frac{b-a}{n} \sum_{k=0}^{n-1} f\left(a + k \frac{b-a}{n}\right) \xrightarrow[n \to +\infty]{} \int_a^b f(t) dt. $$

Plus généralement, pour une subdivision $a = x_0 < x_1 < \dots < x_n = b$ de pas $\delta_n = \max_k (x_{k+1} - x_k) \to 0$ :
$$ \sum_{k=0}^{n-1} f(\xi_k)(x_{k+1} - x_k) \xrightarrow[n \to +\infty]{} \int_a^b f(t) dt, $$
pour tout choix de $\xi_k \in [x_k, x_{k+1}]$.

**Démonstration (Esquisse) :**
Par uniforme continuité de $f$ sur $[a, b]$ (Heine), pour $\varepsilon > 0$, $\exists \delta > 0$ tel que $|x-y| < \delta \implies |f(x) - f(y)| < \varepsilon$. Si le pas $\delta_n < \delta$, alors la somme de Riemann est à distance $< \varepsilon(b-a)$ de $\int_a^b f$.

### 
**Subtilités :**

*   La continuité n'est pas indispensable : $f$ Riemann-intégrable suffit (mais MP* traite surtout $C^0$).
*   La vitesse de convergence est $O(1/n)$ si $f \in C^1$ (par Euler-Maclaurin).
*   **Application :** Calculer $\lim_{n \to \infty} \frac{1}{n} \sum_{k=1}^n f(k/n) = \int_0^1 f(t) dt$ — technique classique de concours.

**Pièges classiques :**
*   ❌ Appliquer à une fonction non bornée.
*   ❌ Oublier d'identifier la somme comme une somme de Riemann (erreur de cadrage).

---

## FLASHCARD 28 — Théorème 17 : Comparaison à une fonction intégrable, intégrales de Riemann

### RECTO
**Théorème 17 — Comparaison à une fonction intégrable / Intégrales de Riemann**

**Contexte :** Soit $f : [a, +\infty[ \to \mathbb{R}$ (intégrale impropre).

Énoncer le critère de comparaison pour les intégrales impropres et donner la nature des intégrales de Riemann $\int_1^{+\infty} t^{-\alpha} dt$.

### VERSO
**Partie 1 — Critère de comparaison :**

Soient $f, g : [a, +\infty[ \to \mathbb{R}_+$ continues (ou localement intégrables), avec $0 \le f(t) \le g(t)$ au voisinage de $+\infty$.

*   $\int_a^{+\infty} g(t) dt \text{ converge} \implies \int_a^{+\infty} f(t) dt \text{ converge.}$
*   $\int_a^{+\infty} f(t) dt \text{ diverge} \implies \int_a^{+\infty} g(t) dt \text{ diverge.}$

Si $f(t) \sim g(t)$ en $+\infty$ ($f, g > 0$) : même nature.

**Partie 2 — Intégrales de Riemann :**

$$ \int_1^{+\infty} \frac{dt}{t^\alpha} \begin{cases} \text{converge} & \text{si } \alpha > 1, \\ \text{diverge} & \text{si } \alpha \le 1. \end{cases} $$

$$ \int_0^1 \frac{dt}{t^\alpha} \begin{cases} \text{converge} & \text{si } \alpha < 1, \\ \text{diverge} & \text{si } \alpha \ge 1. \end{cases} $$

### 
**Subtilités :**

*   Intégrale en $0^+$ et en $+\infty$ : Les conditions de convergence sont opposées ($\alpha < 1$ vs $\alpha > 1$). Ne pas confondre.
*   La comparaison s'applique au voisinage de la singularité (pas nécessairement sur tout $[a, +\infty[$).

**Pièges classiques :**
*   ❌ Inverser les conditions pour $0^+$ et $+\infty$.
*   ❌ Appliquer la comparaison à des fonctions de signe quelconque.

---

## FLASHCARD 29 — À connaître 6 : Intégrales de Bertrand

### RECTO
**À connaître 6 — Intégrales de Bertrand**

Donner la condition de convergence de $\int_2^{+\infty} \frac{dt}{t^\alpha (\ln t)^\beta}$ et de $\int_a^b \frac{dt}{(t-a)^\alpha |\ln(t-a)|^\beta}$ (ou analogue en $0^+$).

### VERSO
**Énoncé formel :**

$$ \int_2^{+\infty} \frac{dt}{t^\alpha (\ln t)^\beta} \begin{cases} \text{converge} & \text{si } \alpha > 1, \text{ ou } \alpha = 1 \text{ et } \beta > 1, \\ \text{diverge} & \text{si } \alpha < 1, \text{ ou } \alpha = 1 \text{ et } \beta \le 1. \end{cases} $$

$$ \int_e^{+\infty} \frac{dt}{t (\ln t)^\beta} \begin{cases} \text{converge} & \text{si } \beta > 1, \\ \text{diverge} & \text{si } \beta \le 1. \end{cases} $$

**Analogie avec les séries de Bertrand :** Même condition que pour $\sum \frac{1}{n^\alpha (\ln n)^\beta}$.

**Démonstration :** Comparaison série-intégrale / calcul direct par changement de variable $u = \ln t$.

### 
**Subtilités :**

*   La borne inférieure doit être choisie pour que $\ln t > 0$ (d'où $t > 1$, et en pratique on prend $t \ge 2$ ou $t \ge e$).

**Pièges classiques :**
*   ❌ Oublier que la borne doit être $> 1$ pour que $\ln t$ soit défini et positif.

---

## FLASHCARD 30 — Proposition 6 : Intégration des relations de comparaison

### RECTO
**Proposition 6 — Intégration des relations de comparaison**

**Contexte :** Soit $f, g : [a, +\infty[ \to \mathbb{R}_+$ continues.

Énoncer la proposition permettant de déduire des équivalents d'intégrales à partir d'équivalents de fonctions.

### VERSO
**Hypothèses :** $f, g > 0$ sur $[a, +\infty[$, continues.

**Énoncé formel :**

**Cas divergent :** Si $\int_a^x f(t) dt \xrightarrow[x \to +\infty]{} +\infty$ et $f(t) \underset{t \to +\infty}{\sim} g(t)$, alors :
$$ \int_a^x f(t) dt \underset{x \to +\infty}{\sim} \int_a^x g(t) dt. $$

**Cas convergent :** Si $\int_a^{+\infty} g(t) dt < +\infty$ et $f(t) \underset{t \to +\infty}{\sim} g(t)$, alors $\int_a^{+\infty} f(t) dt < +\infty$ et :
$$ \int_x^{+\infty} f(t) dt \underset{x \to +\infty}{\sim} \int_x^{+\infty} g(t) dt. $$

### 
**Subtilités :**

*   Strictement analogue à la sommation des relations de comparaison pour les séries.
*   La positivité est indispensable pour la transitivité des équivalents.

**Pièges classiques :**
*   ❌ Oublier que l'équivalence $f \sim g$ doit être au voisinage de la singularité (pas n'importe où).
*   ❌ Appliquer à des fonctions de signe quelconque.

---

## FLASHCARD 31 — Proposition 7 : Critère de Cauchy pour les intégrales impropres

### RECTO
**Proposition 7 — Critère de Cauchy pour les intégrales impropres**

**Contexte :** Soit $f : [a, +\infty[ \to E$ ($E$ evn complet) localement intégrable.

Énoncer le critère de Cauchy pour la convergence d'une intégrale impropre.

### VERSO
**Hypothèses :**

*   $f : [a, +\infty[ \to E$ ($E$ de Banach) est localement intégrable (intégrable sur tout $[a, X]$).

**Énoncé formel :**

$$ \int_a^{+\infty} f(t) dt \text{ converge} \iff \forall \varepsilon > 0, \exists X_0 \ge a, \forall X, Y \ge X_0, \left\| \int_X^Y f(t) dt \right\| \le \varepsilon. $$

**Démonstration :** Caractérisation de Cauchy dans $E$ complet, appliquée à la fonction $F(X) = \int_a^X f(t) dt$.

### 
**Subtilités :**

*   Nécessite la complétude de $E$ (critère de Cauchy dans un espace complet).
*   Utile pour prouver la convergence d'intégrales à paramètre.

**Pièges classiques :**
*   ❌ Oublier que $X_0$ ne dépend pas de $X, Y$ (c'est un critère uniforme en $(X, Y)$).

---

## FLASHCARD 32 — Proposition 8 : Intégration par parties

### RECTO
**Proposition 8 — Intégration par parties (IPP) pour les intégrales impropres**

**Contexte :** Soit $f, g : [a, b] \to \mathbb{R}$ (ou $[a, +\infty[$) de classe $C^1$.

Énoncer la formule d'intégration par parties pour les intégrales impropres, avec les hypothèses de convergence.

### VERSO
**Hypothèses complètes :**

*   $f, g : [a, +\infty[ \to \mathbb{R}$ de classe $C^1$ sur $[a, +\infty[$.
*   L'intégrale $\int_a^{+\infty} f'(t) g(t) dt$ converge.
*   $f(t)g(t)$ admet une limite finie en $+\infty$ : $\lim_{t \to +\infty} f(t)g(t) = \ell \in \mathbb{R}$.

**Énoncé formel :**

$$ \int_a^{+\infty} f'(t) g(t) dt = [\ell - f(a)g(a)] - \int_a^{+\infty} f(t) g'(t) dt, $$

i.e., $\int_a^{+\infty} f'(t) g(t) dt = [f(t)g(t)]_a^{+\infty} - \int_a^{+\infty} f(t) g'(t) dt$,

à condition que $\int_a^{+\infty} f(t) g'(t) dt$ converge (ou équivalence des deux convergences).

**Cas du segment $[a, b]$ :** Toujours valable sans condition supplémentaire :
$$ \int_a^b f'(t) g(t) dt = [f(t)g(t)]_a^b - \int_a^b f(t) g'(t) dt. $$

### 
**Subtilités :**

*   Pour les intégrales impropres, il faut vérifier la convergence du terme $[fg]_a^{+\infty}$ (existence de la limite) ET d'une des deux intégrales.
*   La convergence de l'une n'implique pas l'autre en général — les deux doivent être étudiées conjointement.

**Pièges classiques :**
*   ❌ Appliquer IPP à des intégrales impropres sans vérifier la convergence du crochet.
*   ❌ Oublier le signe $-$ devant la seconde intégrale.

---

## FLASHCARD 33 — Théorème 18 : Changement de variable

### RECTO
**Théorème 18 — Changement de variable dans une intégrale**

**Contexte :** Soit $\varphi : [\alpha, \beta] \to \mathbb{R}$ et $f$ définie sur $\varphi([\alpha, \beta])$.

Énoncer le théorème de changement de variable pour les intégrales (cas $C^1$), en précisant les hypothèses sur $\varphi$ et $f$.

### VERSO
**Hypothèses complètes :**

*   $\varphi : [\alpha, \beta] \to \mathbb{R}$ est de classe $C^1$ sur $[\alpha, \beta]$ (pas nécessairement injective, pas nécessairement monotone).
*   $f : I \to \mathbb{R}$ est continue sur $I$, où $I$ est un intervalle contenant $\varphi([\alpha, \beta])$.

**Énoncé formel :**

$$ \int_\alpha^\beta f(\varphi(t)) \varphi'(t) dt = \int_{\varphi(\alpha)}^{\varphi(\beta)} f(u) du. $$

**Cas de la variable impropre :**

Si $\varphi : [\alpha, +\infty[ \to \mathbb{R}$ est $C^1$, $\varphi(t) \to L$ quand $t \to +\infty$, et l'intégrale converge :
$$ \int_\alpha^{+\infty} f(\varphi(t)) \varphi'(t) dt = \int_{\varphi(\alpha)}^L f(u) du. $$

**Démonstration (Esquisse) :**
Soit $F$ une primitive de $f$. Alors $\frac{d}{dt} [F(\varphi(t))] = F'(\varphi(t))\varphi'(t) = f(\varphi(t))\varphi'(t)$. Intégrer de $\alpha$ à $\beta$ donne le résultat par le théorème fondamental du calcul.

### 
**Subtilités :**

*   $\varphi$ n'a pas besoin d'être bijective pour le théorème : si $\varphi$ n'est pas injective, l'intégrale de droite est bien $\int_{\varphi(\alpha)}^{\varphi(\beta)} f$ avec les bornes algébriques.
*   Si $\varphi$ est une bijection $C^1$ à dérivée non nulle, le changement de variable est réversible.
*   La continuité de $f$ est suffisante (pas besoin de $C^1$).
*   **Attention :** $\int_{\varphi(\alpha)}^{\varphi(\beta)}$ est une intégrale de Riemann avec bornes orientées (algébriques) — si $\varphi(\beta) < \varphi(\alpha)$, l'intégrale est négative.

**Extensions :**

*   Valable pour $f : I \to E$ ($E$ evn), en remplaçant $f$ par une fonction vectorielle continue.

**Pièges classiques :**
*   ❌ Oublier $\varphi'(t)$ dans l'intégrande.
*   ❌ Confondre les bornes : ce sont $\varphi(\alpha)$ et $\varphi(\beta)$ (pas $\alpha$ et $\beta$).
*   ❌ Exiger la bijectivité de $\varphi$ — inutile pour la formule.

---

## FLASHCARD 34 — À connaître 7 : Inégalité de Cauchy-Schwarz intégrale

### RECTO
**À connaître 7 — Inégalité de Cauchy-Schwarz pour les intégrales**

**Contexte :** Soient $f, g : [a, b] \to \mathbb{R}$ (ou $\mathbb{C}$).

Énoncer l'inégalité de Cauchy-Schwarz intégrale avec condition d'égalité.

### VERSO
**Hypothèses :** $f, g : [a, b] \to \mathbb{R}$ (ou $\mathbb{C}$) continues (ou de carré intégrable).

**Énoncé formel :**

$$ \left| \int_a^b f(t) \overline{g(t)} dt \right|^2 \le \left( \int_a^b |f(t)|^2 dt \right) \left( \int_a^b |g(t)|^2 dt \right). $$

**Condition d'égalité :** Égalité si et seulement si $f$ et $g$ sont colinéaires au sens $L^2$ : $\exists (\lambda, \mu) \neq (0, 0), \lambda f = \mu g$ p.p. (i.e., $f$ et $g$ sont proportionnelles).

**Démonstration (Esquisse) :**
Considérer le discriminant du polynôme $\lambda \mapsto \int_a^b |f(t) + \lambda g(t)|^2 dt \ge 0$. Ce trinôme en $\lambda$ (réel) est $\ge 0$ pour tout $\lambda$, donc son discriminant est $\le 0$.

### 
**Subtilités :**

*   C'est l'inégalité de Cauchy-Schwarz dans l'espace de Hilbert $L^2([a, b])$.
*   La condition d'égalité est souvent demandée en concours.

**Pièges classiques :**
*   ❌ Oublier les valeurs absolues dans le membre de gauche.
*   ❌ Oublier que $|f|^2$ (et non $f^2$) dans le cas complexe.

---

## FLASHCARD 35 — À connaître 8 : Intégrale et valeur absolue / positivité

### RECTO
**À connaître 8 — Inégalité triangulaire intégrale et positivité**

Énoncer l'inégalité triangulaire pour les intégrales et la propriété de positivité.

### VERSO
**Énoncés :**

**Positivité :**
$$ f : [a, b] \to \mathbb{R} \text{ continue}, f \ge 0, \int_a^b f(t) dt \ge 0. $$
Si de plus $f \ge 0$ et $\int_a^b f(t) dt = 0 \implies f \equiv 0$ sur $[a, b]$.

**Inégalité triangulaire :**

Pour $f : [a, b] \to E$ ($E$ evn) continue :
$$ \left\| \int_a^b f(t) dt \right\| \le \int_a^b \|f(t)\| dt \le (b-a) \sup_{t \in [a, b]} \|f(t)\|. $$

### 
**Subtilités :**

*   La positivité avec égalité nécessite la continuité : sans elle, on peut avoir $f \ge 0$ non nulle et $\int f = 0$ (pour des fonctions non mesurables, hors programme).
*   L'inégalité triangulaire est valable en dimension infinie.

**Pièges classiques :**
*   ❌ Conclure $f \equiv 0$ depuis $\int f = 0$ sans hypothèse de continuité et de positivité.

---

## FLASHCARD 36 — À connaître 9 : Lemme de Riemann-Lebesgue

### RECTO
**À connaître 9 — Lemme de Riemann-Lebesgue**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ (ou $f : \mathbb{R} \to \mathbb{R}$ intégrable).

Énoncer le lemme de Riemann-Lebesgue et ses deux formes usuelles (segment et droite réelle).

### VERSO
**Hypothèses :**

*   **Cas du segment :** $f : [a, b] \to \mathbb{R}$ continue (ou Riemann-intégrable).
*   **Cas de la droite :** $f : \mathbb{R} \to \mathbb{R}$ intégrable ($\int_{-\infty}^{+\infty} |f(t)| dt < +\infty$).

**Énoncé formel :**

**Cas du segment :**
$$ \int_a^b f(t) e^{i\lambda t} dt \xrightarrow[\lambda \to \pm\infty]{} 0. $$

Équivalent : $\int_a^b f(t) \cos(\lambda t) dt \to 0$ et $\int_a^b f(t) \sin(\lambda t) dt \to 0$ quand $\lambda \to \pm\infty$.

**Cas de la droite ($f \in L^1(\mathbb{R})$) :**
$$ \hat{f}(\lambda) = \int_{-\infty}^{+\infty} f(t) e^{-i\lambda t} dt \xrightarrow[|\lambda| \to +\infty]{} 0. $$

**Démonstration (Esquisse, cas $C^1$) :**
IPP : $\int_a^b f(t) e^{i\lambda t} dt = \left[ \frac{f(t)e^{i\lambda t}}{i\lambda} \right]_a^b - \frac{1}{i\lambda} \int_a^b f'(t) e^{i\lambda t} dt = O(1/\lambda) \to 0$.

Cas général (Riemann-intégrable) : Approximation par des fonctions en escaliers + passage à la limite.

### 
**Subtilités :**

*   La vitesse de convergence vers $0$ dépend de la régularité de $f$ : si $f \in C^k$, alors $\hat{f}(\lambda) = O(\lambda^{-k})$.
*   Le lemme de Riemann-Lebesgue est fondamental en analyse de Fourier.
*   La réciproque est fausse : $\hat{f}(\lambda) \to 0$ n'implique pas $f \in L^1$.

**Pièges classiques :**
*   ❌ Penser que la convergence est vers $0$ avec une vitesse universelle — elle dépend de $f$.
*   ❌ Confondre avec la convergence de la transformée de Fourier (qui est un résultat différent).

---

# CHAPITRE 4 — Suites de fonctions, approximation

## FLASHCARD 37 — Théorème 19 : Continuité de la limite uniforme

### RECTO
**Théorème 19 — Continuité de la limite uniforme**

**Contexte :** Soit $(f_n)$ une suite de fonctions $f_n : X \to E$.

Énoncer le théorème de continuité de la limite uniforme, avec hypothèses exactes sur $X$, $E$, la suite $(f_n)$.

### VERSO
**Hypothèses complètes :**

*   $X$ est un espace métrique (ou topologique), $E$ est un espace métrique complet (evn).
*   Pour tout $n \in \mathbb{N}$, $f_n : X \to E$ est continue sur $X$.
*   $(f_n)$ converge uniformément vers $f$ sur $X$ :
    $$ \sup_{x \in X} d(f_n(x), f(x)) \xrightarrow[n \to \infty]{} 0. $$

**Énoncé formel :**

$$ f : X \to E \text{ est continue sur } X. $$

**Démonstration (Esquisse) :**
Soit $x_0 \in X$ et $\varepsilon > 0$. Choisir $N$ tel que $\sup_x d(f_n(x), f(x)) < \varepsilon/3$ pour $n \ge N$. Par continuité de $f_N$ en $x_0$, $\exists \delta > 0$ tel que $d(x, x_0) < \delta \implies d(f_N(x), f_N(x_0)) < \varepsilon/3$. Alors :
$$ d(f(x), f(x_0)) \le d(f(x), f_N(x)) + d(f_N(x), f_N(x_0)) + d(f_N(x_0), f(x_0)) < \varepsilon. $$

### 
**Subtilités :**

*   La convergence uniforme est indispensable : la limite d'une suite de fonctions continues convergent simplement peut ne pas être continue (ex : $f_n(x) = x^n$ sur $[0, 1]$, limite = $1_{\{x=1\}}$, discontinue).
*   La complétude de $E$ n'est pas nécessaire pour la continuité de la limite (seulement pour l'existence de la limite dans $E$, si $E$ est de Banach).
*   Le théorème est valable sur tout espace métrique $X$ (pas seulement des intervalles).

**Extensions :**

*   Si chaque $f_n \in C^k$, la convergence uniforme ne garantit pas que $f \in C^k$ (il faut la convergence uniforme des dérivées — voir Thm 22).
*   **Convergence uniforme sur les compacts :** si la convergence est seulement locale uniforme, la limite est quand même continue.

**Pièges classiques :**
*   ❌ Conclure à la continuité depuis la convergence simple.
*   ❌ Oublier de vérifier l'uniformité de la convergence (erreur la plus fréquente en concours).
*   ❌ Confondre convergence uniforme sur $X$ et convergence uniforme sur tout compact de $X$.

---

## FLASHCARD 38 — Théorème 20 : Double limite

### RECTO
**Théorème 20 — Théorème de la double limite**

**Contexte :** Soit $f_n : X \to E$, $x_0$ point adhérent à $X$.

Énoncer le théorème de la double limite (permutation de la limite en $x$ et de la limite en $n$), avec toutes les hypothèses.

### VERSO
**Hypothèses complètes :**

*   $X$ espace métrique, $x_0$ point adhérent à $X$ (ou $x_0 \in \overline{X}$), $E$ espace métrique complet.
*   Pour tout $n \in \mathbb{N}$, $\lim_{x \to x_0} f_n(x) = \ell_n \in E$ (limite de $f_n$ en $x_0$).
*   $(f_n)$ converge uniformément vers $f$ sur $X \setminus \{x_0\}$ (ou sur $X$) : $\sup_{x \in X} d(f_n(x), f(x)) \to 0$.

**Énoncé formel :**

$$ \lim_{n \to \infty} \ell_n = \ell \in E \quad \text{et} \quad \lim_{x \to x_0} f(x) = \ell. $$

Autrement dit :
$$ \lim_{n \to \infty} \left( \lim_{x \to x_0} f_n(x) \right) = \lim_{x \to x_0} \left( \lim_{n \to \infty} f_n(x) \right) = \lim_{x \to x_0} f(x) = \ell. $$

**Démonstration (Esquisse) :**
$d(\ell_m, \ell_n) \le d(\ell_m, f_m(x)) + d(f_m(x), f_n(x)) + d(f_n(x), \ell_n)$ — pour $x$ proche de $x_0$ et $m, n$ grands, chaque terme est petit par uniforme convergence et existence de $\ell_n$.

### 
**Subtilités :**

*   L'uniforme convergence est la clé permettant de permuter les deux limites.
*   Sans uniforme convergence, la double limite peut ne pas exister ou donner deux valeurs différentes selon l'ordre (contre-exemple : $f_n(x) = x^n$ sur $[0, 1[$, $\lim_n \lim_{x \to 1^-} f_n(x) = 1$ mais $\lim_{x \to 1^-} \lim_n f_n(x) = 0$).

**Extensions :**

*   Analogue pour les séries : si $\sum f_n$ converge uniformément et chaque $f_n$ admet une limite en $x_0$, alors $\lim_{x \to x_0} \sum f_n(x) = \sum \lim_{x \to x_0} f_n(x)$.

**Pièges classiques :**
*   ❌ Permuter les limites sans uniforme convergence.
*   ❌ Oublier de vérifier l'existence de chaque $\ell_n$.

---

## FLASHCARD 39 — Théorème 21 : Permutation limite-intégrale (convergence uniforme sur un segment)

### RECTO
**Théorème 21 — Permutation limite-intégrale (convergence uniforme sur un segment)**

⚠️ THÉORÈME « DANGEREUX » : les hypothèses sont strictes.

**Contexte :** Soit $(f_n)$ une suite de fonctions sur $[a, b]$.

Énoncer le théorème de permutation limite-intégrale par convergence uniforme, avec hypothèses exactes. Identifier pourquoi il est qualifié de « dangereux ».

### VERSO
**Hypothèses complètes :**

*   $[a, b]$ est un segment (compact, $a < b$, $a, b \in \mathbb{R}$).
*   Pour tout $n \in \mathbb{N}$, $f_n : [a, b] \to E$ est continue (ou Riemann-intégrable) sur $[a, b]$.
*   $(f_n)$ converge uniformément vers $f$ sur $[a, b]$.

**Énoncé formel :**

$$ \int_a^b f_n(t) dt \xrightarrow[n \to \infty]{} \int_a^b f(t) dt. $$

Autrement dit :
$$ \lim_{n \to \infty} \int_a^b f_n(t) dt = \int_a^b \lim_{n \to \infty} f_n(t) dt. $$

**Majoration :**
$$ \left| \int_a^b f_n(t) dt - \int_a^b f(t) dt \right| \le (b-a) \sup_{t \in [a, b]} |f_n(t) - f(t)| \to 0. $$

**Démonstration (Esquisse) :**
Inégalité triangulaire + uniforme convergence : $\|\int_a^b (f_n - f)\| \le (b-a) \sup |f_n - f| \to 0$.

### 
**Subtilités :**

*   **Pourquoi « dangereux » ?** Car sur un segment, la convergence simple ne suffit pas : ex. $f_n(x) = nxe^{-nx}$ sur $[0, 1]$, $f_n \to 0$ simplement mais $\int_0^1 f_n = 1 - e^{-n} \to 1 \neq 0$.
*   La convergence uniforme sur tout $[a, b]$ est requise — pas seulement sur un compact inclus dans $]a, b[$.
*   Pour les intégrales impropres, la convergence uniforme sur $[a, b]$ ne suffit pas : il faut une domination uniforme (théorème de convergence dominée, Thm 31) ou la convergence normale.
*   Segment borné fermé : la borne $(b-a)$ est finie — crucial pour la majoration.

**Extensions :**

*   Sur un intervalle non compact : ce théorème ne s'applique pas directement ; utiliser le TCD (Thm 31) ou la convergence normale.

**Pièges classiques :**
*   ❌ Permuter limite et intégrale avec seulement la convergence simple.
*   ❌ Appliquer sur un intervalle ouvert ou non borné sans vérification complémentaire.
*   ❌ Oublier le facteur $(b-a)$ dans la majoration (qui peut être grand).

---

## FLASHCARD 40 — Théorème 22 : Régularité $C^1$ d'une suite de fonctions

### RECTO
**Théorème 22 — Régularité $C^1$ de la limite d'une suite de fonctions**

**Contexte :** Soit $(f_n)$ une suite de fonctions de classe $C^1$ sur un intervalle $I$.

Énoncer le théorème de régularité $C^1$ pour les suites de fonctions, en précisant les deux hypothèses de convergence distinctes.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle (ouvert ou fermé, borné ou non).
*   Pour tout $n \in \mathbb{N}$, $f_n \in C^1(I, E)$ ($E$ evn de Banach).
*   **Hypothèse 1 :** $(f_n)$ converge simplement (ou en un point $x_0 \in I$) vers une fonction $f$.
*   **Hypothèse 2 :** $(f_n')$ converge uniformément sur tout segment $[a, b] \subset I$ vers une fonction $g : I \to E$.

**Énoncé formel :**

$$ f \in C^1(I, E) \quad \text{et} \quad f' = g. $$

Autrement dit : $(f_n)$ converge uniformément sur tout compact de $I$ vers $f$, et $f' = \lim_n f_n'$ (uniformément sur les compacts).

**Démonstration (Esquisse) :**
Pour $x, x_0 \in I$ :
$$ f_n(x) - f_n(x_0) = \int_{x_0}^x f_n'(t) dt. $$
Par convergence uniforme de $(f_n')$ vers $g$, on peut passer à la limite (Thm 21) :
$$ f(x) - f(x_0) = \int_{x_0}^x g(t) dt. $$
Donc $f$ est dérivable et $f' = g \in C^0$ (limite uniforme de $C^0$), donc $f \in C^1$.

### 
**Subtilités :**

*   Les deux conditions sont indépendantes et toutes deux nécessaires :
    *   $(f_n)$ converge simplement : pour fixer la limite (sans quoi $f$ n'est pas déterminée).
    *   $(f_n')$ converge uniformément sur les compacts : pour passer la dérivée sous la limite.
*   La convergence simple de $(f_n)$ suffit (pas besoin de convergence uniforme de $(f_n)$) — elle est automatiquement uniforme sur les compacts une fois qu'on a la convergence simple + convergence uniforme des dérivées.
*   Si $I$ est non compact, la convergence de $(f_n')$ doit être uniforme sur tout segment $[a, b] \subset I$ (convergence localement uniforme), pas nécessairement sur $I$ entier.

**Extensions :**

*   **Thm 23 :** version $C^k$ (par récurrence sur $k$).
*   Analogue pour les séries (Thm 29).

**Pièges classiques :**
*   ❌ Exiger la convergence uniforme de $(f_n)$ au lieu de la convergence simple (condition trop forte et inutile).
*   ❌ Oublier que la convergence de $(f_n')$ doit être uniforme (pas simple) sur les compacts.
*   ❌ Confondre « convergence simple de $f_n$ » et « convergence uniforme de $f_n$ ».

---

## FLASHCARD 41 — Théorème 23 : Régularité $C^k$

### RECTO
**Théorème 23 — Régularité $C^k$ de la limite d'une suite de fonctions**

**Contexte :** Soit $(f_n)$ une suite de fonctions de classe $C^k$.

Énoncer le théorème de régularité $C^k$, en précisant les hypothèses pour chaque ordre de dérivation.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $E$ evn de Banach, $k \ge 1$.
*   Pour tout $n \in \mathbb{N}$, $f_n \in C^k(I, E)$.
*   Pour $j=1, \dots, k$ : $(f_n^{(j)})$ converge uniformément sur tout segment $[a, b] \subset I$.
*   Pour $j=0$ : $(f_n)$ converge simplement sur $I$ (ou en un point de $I$).

**Énoncé formel :**

$$ f = \lim_n f_n \in C^k(I, E) \quad \text{et} \quad \forall j \in \{0, 1, \dots, k\}, \quad f^{(j)} = \lim_n f_n^{(j)}. $$

(Les limites $\lim_n f_n^{(j)}$ sont localement uniformes sur $I$.)

**Démonstration (Esquisse) :** Récurrence sur $k$ en appliquant le Thm 22 à chaque étape.

### 
**Subtilités :**

*   La condition de convergence uniforme des dérivées jusqu'à l'ordre $k$ est nécessaire — la convergence simple de $f_n^{(k)}$ ne suffit pas.
*   La convergence de $f_n$ elle-même peut être seulement simple (ou en un point).

**Extensions :**

*   Cas $k=+\infty$ ($C^\infty$) : si les hypothèses valent pour tout $k$, alors $f \in C^\infty$.

**Pièges classiques :**
*   ❌ Oublier de vérifier la convergence uniforme de toutes les dérivées jusqu'à l'ordre $k$.

---

## FLASHCARD 42 — Théorème 24 : Approximation par des fonctions en escalier

### RECTO
**Théorème 24 — Approximation par des fonctions en escalier**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ continue.

Énoncer le théorème d'approximation d'une fonction continue par des fonctions en escalier au sens de la norme uniforme.

### VERSO
**Hypothèses :**

*   $f : [a, b] \to \mathbb{R}$ est continue sur le segment $[a, b]$.

**Énoncé formel :**

$$ \forall \varepsilon > 0, \exists \varphi : [a, b] \to \mathbb{R} \text{ en escalier}, \quad \|f - \varphi\|_\infty = \sup_{[a, b]} |f - \varphi| \le \varepsilon. $$

**Démonstration (Esquisse) :**
Par le théorème de Heine, $f$ est uniformément continue. Pour $\varepsilon > 0$, prendre $\delta > 0$ associé. Subdiviser $[a, b]$ en sous-intervalles de longueur $< \delta$, et définir $\varphi$ constante (valeur de $f$ en un point de chaque sous-intervalle).

### 
**Subtilités :**

*   Ce théorème utilise Heine (uniforme continuité) de manière essentielle.
*   L'espace des fonctions en escalier est dense dans $(C^0([a, b]), \|\cdot\|_\infty)$.
*   Fondement de la théorie de l'intégrale de Riemann.

**Pièges classiques :**
*   ❌ Appliquer sans hypothèse de compacité (intervalle non borné : faux en général).

---

## FLASHCARD 43 — Théorème 25 : Théorème de Weierstrass (approximation polynomiale)

### RECTO
**Théorème 25 — Théorème d'approximation de Weierstrass**

**Contexte :** Soit $f : [a, b] \to \mathbb{R}$ continue.

Énoncer le théorème de Weierstrass sur l'approximation uniforme par des polynômes.

### VERSO
**Hypothèses :**

*   $f : [a, b] \to \mathbb{R}$ est continue sur $[a, b]$ ($a < b$, $a, b \in \mathbb{R}$).

**Énoncé formel :**

$$ \forall \varepsilon > 0, \exists P \in \mathbb{R}[X] \text{ (polynôme)}, \quad \sup_{t \in [a, b]} |f(t) - P(t)| \le \varepsilon. $$

Autrement dit, l'espace $\mathbb{R}[X]|_{[a, b]}$ est dense dans $(C^0([a, b]), \|\cdot\|_\infty)$.

**Démonstration (Esquisse — via polynômes de Bernstein, voir À connaître 11) :**
Pour $f : [0, 1] \to \mathbb{R}$, poser $B_n(f)(x) = \sum_{k=0}^n f(k/n) \binom{n}{k} x^k (1-x)^{n-k}$. Montrer $\|B_n(f) - f\|_\infty \to 0$ en utilisant la loi des grands nombres probabiliste (ou un calcul direct).

### 
**Subtilités :**

*   Le degré du polynôme approximant n'est pas borné a priori — on ne peut pas approcher uniformément par des polynômes de degré fixé.
*   Faux sur $\mathbb{R}$ entier : $e^x$ ne peut pas être approchée uniformément sur $\mathbb{R}$ par des polynômes.
*   **Weierstrass trigonométrique (À connaître 13) :** les polynômes trigonométriques sont denses dans $C_{2\pi}^0$.
*   Le résultat est un cas particulier du théorème de Stone-Weierstrass (algèbre de fonctions séparant les points).

**Extensions :**

*   **Stone-Weierstrass :** Sur tout espace compact $K$, toute sous-algèbre de $C^0(K, \mathbb{R})$ contenant les constantes et séparant les points est dense.

**Pièges classiques :**
*   ❌ Croire qu'on peut approcher $f$ par un polynôme de degré fixé.
*   ❌ Étendre le résultat à $\mathbb{R}$ entier sans condition de croissance.

---

## FLASHCARD 44 — À connaître 10 : Moments

### RECTO
**À connaître 10 — Problème des moments**

**Contexte :** Approximation de Weierstrass et identification de mesures par leurs moments.

Énoncer la propriété de densité liée aux moments : si $\int_0^1 f(t) t^n dt = 0$ pour tout $n$, que peut-on conclure ?

### VERSO
**Énoncé formel :**

Soit $f \in C^0([0, 1], \mathbb{R})$ (ou $f$ Riemann-intégrable).

$$ \forall n \in \mathbb{N}, \quad \int_0^1 f(t) t^n dt = 0 \implies f \equiv 0 \text{ sur } [0, 1]. $$

**Démonstration (Esquisse) :**
Par linéarité, $\int_0^1 f(t) P(t) dt = 0$ pour tout polynôme $P$. Par Weierstrass, $\forall \varepsilon > 0, \exists P$ tel que $\|f - P\|_\infty \le \varepsilon$. Alors :
$$ \int_0^1 f(t)^2 dt = \int_0^1 f(t)(f(t) - P(t)) dt + \int_0^1 f(t)P(t) dt \le \|f\|_\infty \cdot \varepsilon \cdot 1 + 0. $$
Donc $\int_0^1 f^2 = 0$, donc $f \equiv 0$ (par continuité et positivité).

### 
**Subtilités :**

*   Ce résultat montre que les moments caractérisent les fonctions continues sur $[0, 1]$.
*   **Généralisation :** Sur $[a, b]$, si $\int_a^b f(t) t^n dt = 0$ pour tout $n \ge 0$, alors $f \equiv 0$.
*   Utilisé pour : montrer l'injectivité de la transformée de Laplace, identifier des lois de probabilité par leurs moments.

**Pièges classiques :**
*   ❌ Oublier que le résultat nécessite la continuité de $f$ (ou au moins l'intégrabilité au carré) pour conclure $f \equiv 0$.

---

## FLASHCARD 45 — À connaître 11 : Weierstrass via Bernstein

### RECTO
**À connaître 11 — Polynômes de Bernstein et preuve de Weierstrass**

Définir les polynômes de Bernstein $B_n(f)$ et expliquer pourquoi $B_n(f) \to f$ uniformément sur $[0, 1]$.

### VERSO
**Définition :**

Pour $f : [0, 1] \to \mathbb{R}$, le $n$-ième polynôme de Bernstein est :
$$ B_n(f)(x) = \sum_{k=0}^n f\left(\frac{k}{n}\right) \binom{n}{k} x^k (1-x)^{n-k}, \quad x \in [0, 1]. $$

**Propriété :**

$$ \|B_n(f) - f\|_\infty \xrightarrow[n \to \infty]{} 0 \quad \text{pour tout } f \in C^0([0, 1]). $$

**Démonstration (Idée) :**
Si $X_1, \dots, X_n \sim \text{Bernoulli}(x)$ i.i.d., alors $B_n(f)(x) = \mathbb{E}[f(\bar{X}_n)]$ où $\bar{X}_n = \frac{1}{n} \sum X_i$. Par la LGN et la continuité uniforme de $f$ (Heine), $\mathbb{E}[f(\bar{X}_n)] \to f(x)$ uniformément.

### 
**Subtilités :**

*   $B_n(f)$ est un polynôme de degré $\le n$.
*   $B_n$ est un opérateur positif et linéaire : $f \ge 0 \implies B_n(f) \ge 0$.
*   La preuve via la LGN est probabiliste et très élégante.

**Pièges classiques :**
*   ❌ Croire que $B_n(f)(k/n) = f(k/n)$ — faux en général (les polynômes de Bernstein n'interpolent pas $f$).

---

## FLASHCARD 46 — À connaître 12 : Weierstrass par convolution

### RECTO
**À connaître 12 — Approximation de l'identité et Weierstrass par convolution**

Énoncer la méthode de convolution pour approcher une fonction continue par des fonctions régulières, et son lien avec Weierstrass.

### VERSO
**Idée centrale — Approximation de l'identité :**

Soit $(\rho_n)$ une suite de fonctions positives sur $\mathbb{R}$ telles que :
*   $\int_{-\infty}^{+\infty} \rho_n(t) dt = 1$,
*   $\forall \delta > 0, \int_{|t| \ge \delta} \rho_n(t) dt \to 0$ (concentration au voisinage de $0$).

Pour $f : \mathbb{R} \to \mathbb{R}$ continue et bornée, le produit de convolution :
$$ (f \star \rho_n)(x) = \int_{-\infty}^{+\infty} f(x-t)\rho_n(t) dt $$
converge uniformément vers $f$ sur tout compact.

**Lien avec Weierstrass :** Prendre $\rho_n$ polynomiale (ex : $\rho_n(t) = c_n(1-t^2)^n$ sur $[-1, 1]$) — la convolution de $f$ avec $\rho_n$ est un polynôme.

### 
**Subtilités :**

*   La régularité de $f \star \rho_n$ est celle de $\rho_n$ (si $\rho_n \in C^\infty$, alors $f \star \rho_n \in C^\infty$).
*   Fondement des fonctions test en analyse fonctionnelle.
*   **Weierstrass trigonométrique :** même principe avec le noyau de Fejér.

**Pièges classiques :**
*   ❌ Oublier que la régularité de la convolution est donnée par le terme le plus régulier.

---

## FLASHCARD 47 — À connaître 13 : Théorème de Weierstrass trigonométrique

### RECTO
**À connaître 13 — Théorème de Weierstrass trigonométrique**

**Contexte :** Fonctions continues et $2\pi$-périodiques.

Énoncer le théorème de Weierstrass trigonométrique : densité des polynômes trigonométriques dans $(C_{2\pi}^0, \|\cdot\|_\infty)$.

### VERSO
**Hypothèses :**

*   $f : \mathbb{R} \to \mathbb{R}$ (ou $\mathbb{C}$) continue et $2\pi$-périodique.

**Énoncé formel :**

$$ \forall \varepsilon > 0, \exists T \text{ polynôme trigonométrique}, \quad \sup_{t \in \mathbb{R}} |f(t) - T(t)| \le \varepsilon. $$

Où un polynôme trigonométrique est une combinaison linéaire finie de $t \mapsto e^{ikt}$, $k \in \mathbb{Z}$ (ou $\cos(kt), \sin(kt), k \in \mathbb{N}$).

**Démonstration (Esquisse) :**
Via le noyau de Fejér (moyennes de Cesàro des sommes partielles de Fourier) : les moyennes de Cesàro $\sigma_n(f)$ sont des polynômes trigonométriques convergeant uniformément vers $f$. Ceci utilise des propriétés du noyau de Fejér (positif, intégrale 1, concentré en 0).

### 
**Subtilités :**

*   Les sommes partielles de Fourier $S_n(f)$ ne convergent pas nécessairement uniformément (phénomène de Gibbs) — il faut les moyennes de Cesàro ($\sigma_n(f)$).
*   Ce théorème est la base de l'analyse de Fourier : les séries de Fourier approchent les fonctions continues en moyenne, et les polynômes trigonométriques en norme uniforme (via Cesàro).

**Pièges classiques :**
*   ❌ Confondre convergence des sommes de Fourier (conditionnelle) et densité des polynômes trigonométriques (uniforme, via Cesàro).

---

# CHAPITRE 5 — Séries de fonctions

## FLASHCARD 48 — Théorème 26 : Convergence normale implique uniforme

### RECTO
**Théorème 26 — Convergence normale implique convergence uniforme**

**Contexte :** Soit $\sum f_n$ une série de fonctions $f_n : X \to E$.

Définir la convergence normale et énoncer l'implication vers la convergence uniforme.

### VERSO
**Définition — Convergence normale :**

La série $\sum f_n$ converge normalement sur $X$ si :
$$ \sum_{n=0}^{+\infty} \sup_{x \in X} \|f_n(x)\| < +\infty. $$

**Énoncé formel :**

$$ \sum f_n \text{ converge normalement sur } X \implies \sum f_n \text{ converge absolument et uniformément sur } X. $$

C'est-à-dire : $\forall x \in X, \sum \|f_n(x)\| < +\infty$, et $\sup_{x \in X} \left\| \sum_{n > N} f_n(x) \right\| \to 0$.

**Démonstration :**
$$ \sup_{x \in X} \left\| \sum_{n=N+1}^M f_n(x) \right\| \le \sum_{n=N+1}^M \sup_{x \in X} \|f_n(x)\| \to 0 \quad (M, N \to \infty) $$
par convergence de $\sum \sup_x \|f_n(x)\|$.

### 
**Subtilités :**

*   Convergence normale $\implies$ convergence uniforme $\implies$ convergence absolue ponctuelle (toutes les implications sont strictes).
*   **Réciproque fausse :** $\sum f_n$ peut converger uniformément sans converger normalement (ex : séries alternées).
*   La convergence normale est une propriété très forte — elle s'applique facilement avec les séries entières (dans le disque de convergence strict) et les intégrales à paramètre.

**Pièges classiques :**
*   ❌ Confondre convergence normale et convergence uniforme.
*   ❌ Vérifier la convergence uniforme via la convergence normale quand cette dernière n'est pas valable.

---

## FLASHCARD 49 — Théorème 27 : Double limite pour les séries

### RECTO
**Théorème 27 — Théorème de la double limite pour les séries de fonctions**

**Contexte :** Soit $\sum_{n \ge 0} f_n$ une série de fonctions $f_n : X \to E$.

Énoncer le théorème de la double limite pour une série de fonctions convergeant uniformément.

### VERSO
**Hypothèses :**

*   Pour tout $n \in \mathbb{N}$, $f_n : X \to E$ admet une limite $\ell_n = \lim_{x \to x_0} f_n(x)$.
*   La série $\sum f_n$ converge uniformément sur $X$ (ou au voisinage de $x_0$).

**Énoncé formel :**

$$ \lim_{x \to x_0} \sum_{n=0}^{+\infty} f_n(x) = \sum_{n=0}^{+\infty} \ell_n = \sum_{n=0}^{+\infty} \lim_{x \to x_0} f_n(x). $$

(Les deux membres sont bien définis et égaux.)

**Démonstration :** Analogue au Thm 20 — utiliser l'uniforme convergence pour permuter la limite et la somme.

### 
**Subtilités et pièges :**

*   Strictement analogue au Thm 20 pour les suites.
*   ❌ Permuter sans vérifier la convergence uniforme.

---

## FLASHCARD 50 — Théorème 28 : Permutation série-intégrale (convergence uniforme sur un segment)

### RECTO
**Théorème 28 — Permutation série-intégrale (convergence uniforme sur un segment)**

⚠️ THÉORÈME « DANGEREUX »

**Contexte :** Soit $\sum f_n$ une série de fonctions sur $[a, b]$.

Énoncer le théorème de permutation série-intégrale sous hypothèse de convergence uniforme.

### VERSO
**Hypothèses complètes :**

*   $[a, b]$ segment compact ($a < b$).
*   Pour tout $n$, $f_n : [a, b] \to E$ continue (ou Riemann-intégrable).
*   $\sum f_n$ converge uniformément sur $[a, b]$.

**Énoncé formel :**

$$ \int_a^b \left( \sum_{n=0}^{+\infty} f_n(t) \right) dt = \sum_{n=0}^{+\infty} \int_a^b f_n(t) dt. $$

**Démonstration :** Application du Thm 21 aux sommes partielles $S_N = \sum_{n=0}^N f_n$ qui convergent uniformément vers $\sum f_n$.

### 
**Subtilités :**

*   **Pourquoi « dangereux » ?** Car on ne peut pas permuter sur un intervalle non compact sans hypothèse supplémentaire (convergence dominée ou normale).
*   La convergence normale (À connaître 14) suffit et est plus facile à vérifier.

**Pièges classiques :**
*   ❌ Permuter sur un intervalle non borné avec seulement la convergence uniforme.
*   ❌ Oublier de vérifier la convergence uniforme (et non seulement ponctuelle).

---

## FLASHCARD 51 — Théorème 29 : Régularité $C^1$ d'une série de fonctions

### RECTO
**Théorème 29 — Régularité $C^1$ d'une série de fonctions**

**Contexte :** Soit $\sum f_n$ une série de fonctions $C^1$.

Énoncer le théorème de régularité $C^1$ pour les séries de fonctions, avec hypothèses exactes.

### VERSO
**Hypothèses complètes :**

*   $I \subseteq \mathbb{R}$ intervalle, $E$ evn de Banach.
*   Pour tout $n$, $f_n \in C^1(I, E)$.
*   **H1 :** $\sum f_n$ converge simplement sur $I$ (ou en un point).
*   **H2 :** $\sum f_n'$ converge uniformément sur tout segment $[a, b] \subset I$.

**Énoncé formel :**

$$ f = \sum_{n=0}^{+\infty} f_n \in C^1(I, E) \quad \text{et} \quad f' = \sum_{n=0}^{+\infty} f_n'. $$

**Démonstration :** Application du Thm 22 aux sommes partielles.

### 
**Subtilités :**

*   H1 porte sur $\sum f_n$, H2 porte sur $\sum f_n'$ : deux conditions sur deux séries différentes.
*   La convergence uniforme de $\sum f_n$ sur les compacts est une conséquence, pas une hypothèse.
*   **Pratique :** En général, on vérifie H2 par convergence normale de $\sum f_n'$.

**Pièges classiques :**
*   ❌ Exiger la convergence uniforme de $\sum f_n$ au lieu de la simple convergence.
*   ❌ Oublier de vérifier la convergence de $\sum f_n$ (même simple) séparément de celle de $\sum f_n'$.
*   ❌ Ne pas vérifier H2 sur les segments et se contenter de la convergence simple de $\sum f_n'$.

---

## FLASHCARD 52 — Théorème 30 : Régularité $C^k$ d'une série de fonctions

### RECTO
**Théorème 30 — Régularité $C^k$ d'une série de fonctions**

Énoncer le théorème de régularité $C^k$ pour les séries de fonctions.

### VERSO
**Hypothèses complètes :**

*   $I$ intervalle, $E$ Banach, $k \ge 1$.
*   Pour tout $n$, $f_n \in C^k(I, E)$.
*   Pour $j=1, \dots, k$ : $\sum f_n^{(j)}$ converge uniformément sur tout segment de $I$.
*   Pour $j=0$ : $\sum f_n$ converge simplement (ou en un point).

**Énoncé formel :**

$$ \sum f_n \in C^k(I, E) \quad \text{et} \quad \forall j \le k, \left( \sum f_n \right)^{(j)} = \sum f_n^{(j)}. $$

**Démonstration :** Récurrence sur $k$ via le Thm 29.

### 
**Pièges classiques :**
*   ❌ Oublier de vérifier la convergence uniforme sur les compacts de toutes les séries dérivées $\sum f_n^{(j)}$ jusqu'à l'ordre $k$.

---

# CHAPITRE 6 — Séries entières

## FLASHCARD 53 — Lemme 1 : Lemme d'Abel

### RECTO
**Lemme 1 — Lemme d'Abel (séries entières)**

**Contexte :** Soit $\sum a_n z^n$ une série entière.

Énoncer le lemme d'Abel : que peut-on déduire de la convergence (ou du caractère borné) de $\sum a_n z_0^n$ pour les $z$ avec $|z| < |z_0|$ ?

### VERSO
**Hypothèses et énoncé formel :**

Soit $\sum a_n z^n$ une série entière ($a_n \in \mathbb{C}$, ou dans un evn de Banach).

**Version 1 (convergence) :**
$$ \sum a_n z_0^n \text{ converge} \implies \forall z \text{ avec } |z| < |z_0|, \quad \sum a_n z^n \text{ converge absolument.} $$

**Version 2 (termes bornés) :**
$$ \exists M > 0, \forall n \in \mathbb{N}, |a_n z_0^n| \le M \implies \forall z \text{ avec } |z| < |z_0|, \quad \sum a_n z^n \text{ converge absolument.} $$

**Démonstration (Esquisse — version 2) :**
$$ |a_n z^n| = |a_n z_0^n| \cdot \left| \frac{z}{z_0} \right|^n \le M \cdot r^n, \quad r = \frac{|z|}{|z_0|} < 1. $$
La série $\sum M r^n$ est convergente (géométrique).

### 
**Subtilités :**

*   Le lemme d'Abel justifie l'existence d'un rayon de convergence $R \in [0, +\infty]$ tel que :
    *   $|z| < R$ : convergence absolue.
    *   $|z| > R$ : divergence.
    *   $|z| = R$ : pas de conclusion générale.
*   Convergence normale sur tout disque fermé $\bar{D}(0, r)$ avec $r < R$.

**Extensions :**

*   Le rayon de convergence est donné par $R = \frac{1}{\limsup_{n \to \infty} |a_n|^{1/n}}$ (formule de Hadamard).

**Pièges classiques :**
*   ❌ Conclure sur la convergence sur le cercle $|z| = |z_0|$ — le lemme ne dit rien.
*   ❌ Oublier que la convergence absolue est garantie, pas seulement simple.

---

## FLASHCARD 54 — Proposition 9 : Règle de d'Alembert pour les séries entières

### RECTO
**Proposition 9 — Règle de d'Alembert pour les séries entières**

**Contexte :** Soit $\sum a_n z^n$ une série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R$.

**Question :** Énoncer la règle de d'Alembert pour les séries entières : si le rapport $|a_{n+1}|/|a_n|$ converge, que peut-on conclure sur $R$ ?

### VERSO
**Hypothèses complètes**
*   $\sum a_n z^n$ est une série entière à coefficients dans $\mathbb{C}$.
*   Les coefficients $a_n$ sont non nuls à partir d'un certain rang (pour que le rapport soit défini).
*   La limite $\ell = \lim_{n \to +\infty} \frac{|a_{n+1}|}{|a_n|}$ existe dans $[0, +\infty]$.

**Énoncé formel**
Si $\ell = \lim_{n \to +\infty} \frac{|a_{n+1}|}{|a_n|} \in [0, +\infty]$, alors $R = \frac{1}{\ell}$
avec les conventions $\frac{1}{0} = +\infty$ et $\frac{1}{+\infty} = 0$.

**Précision sur la convergence :**

$$ \forall z \in \mathbb{C}, \quad \left| \frac{a_{n+1} z^{n+1}}{a_n z^n} \right| = \frac{|a_{n+1}|}{|a_n|} \cdot |z| \xrightarrow[n \to +\infty]{} \ell |z| $$

*   Si $\ell |z| < 1$, i.e. $|z| < \frac{1}{\ell} = R$ : la série $\sum a_n z^n$ est absolument convergente (règle de d'Alembert pour les séries numériques).
*   Si $\ell |z| > 1$, i.e. $|z| > R$ : le terme général ne tend pas vers $0$, donc la série diverge grossièrement.
*   Si $\ell |z| = 1$, i.e. $|z| = R$ : aucune conclusion générale.

**Démonstration (Esquisse)**
*   **Réduction à d'Alembert numérique :** Pour $z$ fixé, on pose $u_n = a_n z^n$. On calcule $\left| \frac{u_{n+1}}{u_n} \right| = \frac{|a_{n+1}|}{|a_n|} \cdot |z| \to \ell |z|$.
*   **Application de la règle de d'Alembert pour les séries numériques :** Si $\ell |z| < 1$, alors $\sum |u_n|$ converge ; si $\ell |z| > 1$, alors $|u_n| \to +\infty$.
*   **Identification avec $R$ :** Par définition de $R = \sup \{|z| : \sum a_n z^n \text{ converge}\}$ (formule de Hadamard : $1/R = \limsup |a_n|^{1/n}$), et comme $\limsup |a_n|^{1/n} = \lim |a_n|^{1/n}$ lorsque $\lim |a_{n+1}|/|a_n|$ existe (et vaut la même limite), on conclut $R = 1/\ell$.

### 
**Subtilités**
*   La règle de d'Alembert ne donne que $R$, pas le comportement sur le cercle $|z| = R$. Le cercle de convergence est toujours à traiter à part, et c'est souvent là que se joue la finesse du problème de concours.
*   **La limite doit exister.** Si $\frac{|a_{n+1}|}{|a_n|}$ n'a pas de limite (par exemple si les $a_n$ oscillent), la règle de d'Alembert ne s'applique pas, et il faut recourir à la formule de Hadamard : $1/R = \limsup_{n \to +\infty} |a_n|^{1/n}$, qui est toujours valide.
*   **Condition « non nuls à partir d'un certain rang » :** Si $a_n = 0$ infiniment souvent (e.g. séries entières en $z^2$), le rapport $|a_{n+1}|/|a_n|$ n'est pas défini. Il faut alors utiliser Hadamard ou traiter directement la série avec le changement $w = z^2$.
*   **Cas $\ell = 0$ :** $R = +\infty$, la série entière est une fonction entière (ex : $e^z$, $\sin z$).
*   **Cas $\ell = +\infty$ :** $R = 0$, la série ne converge qu'en $z=0$.

**Extensions**
*   Validité pour $a_n \in \mathbb{C}$ : Oui, totalement. La règle s'applique en toute généralité dans $\mathbb{C}$.
*   Lien avec la formule de Hadamard : La formule de Hadamard $1/R = \limsup |a_n|^{1/n}$ est toujours vraie (sans hypothèse sur la convergence du rapport). D'Alembert est un cas particulier (corollaire) de Hadamard, valable uniquement lorsque la limite du rapport existe, car :
    $$ \lim_{n \to +\infty} \frac{|a_{n+1}|}{|a_n|} = \ell \implies \lim_{n \to +\infty} |a_n|^{1/n} = \ell $$
    (lemme classique : si $u_{n+1}/u_n \to \ell$ alors $u_n^{1/n} \to \ell$).
*   Ne pas confondre avec la règle de d'Alembert pour les séries numériques $\sum u_n$ : ici on calcule le rayon, et on retrouve ensuite d'Alembert numérique pour chaque $z$ fixé.

**Pièges classiques**
*   ❌ Oublier de vérifier le cercle $|z| = R$ : Écrire « la série converge pour $|z| \le R$ » est faux en général. La règle de d'Alembert ne dit rien sur $|z| = R$.
*   ❌ Confondre $R$ et $1/R$ : Très fréquent sous pression. Mémoriser : $R = 1/\ell$, donc si $|a_{n+1}/a_n| \to 2$, alors $R = 1/2$, pas $2$.
*   ❌ Appliquer la règle quand la limite n'existe pas : Si $a_n = 1 + (-1)^n$, le rapport oscille. Il faut impérativement passer à Hadamard.
*   ❌ Oublier la convention $1/0 = +\infty$ : Si $\ell = 0$ (coefficients décroissant très vite), la série converge partout. Si $\ell = +\infty$, elle ne converge qu'en $0$.
*   ❌ Croire que d'Alembert est équivalent à Hadamard : D'Alembert est une condition suffisante pour calculer $R$ (elle implique Hadamard), mais Hadamard est toujours applicable. D'Alembert est un outil pratique, pas un outil universel.

---

## FLASHCARD 55 — Proposition 10 : Produit de Cauchy de deux séries entières

### RECTO
**Proposition 10 — Produit de Cauchy de deux séries entières**

**Contexte :** Soient $\sum a_n z^n$ et $\sum b_n z^n$ deux séries entières à coefficients complexes, de rayons de convergence $R_1$ et $R_2$ respectivement.

**Question :** Énoncer la proposition sur le produit de Cauchy de deux séries entières : définition des coefficients, rayon de convergence du produit, et égalité des sommes.

### VERSO
**Hypothèses complètes**
*   $\sum_{n=0}^{+\infty} a_n z^n$ série entière de rayon $R_1 \in (0, +\infty]$.
*   $\sum_{n=0}^{+\infty} b_n z^n$ série entière de rayon $R_2 \in (0, +\infty]$.
*   $a_n, b_n \in \mathbb{C}$ pour tout $n \in \mathbb{N}$.

**Énoncé formel**
On définit les coefficients du produit de Cauchy par :
$$ \forall n \in \mathbb{N}, \quad c_n = \sum_{k=0}^n a_k b_{n-k} $$

Alors la série entière $\sum c_n z^n$ vérifie :
$$ R_{\text{produit}} \ge \min(R_1, R_2) $$

et pour tout $z \in \mathbb{C}$ avec $|z| < \min(R_1, R_2)$ :
$$ \left( \sum_{n=0}^{+\infty} a_n z^n \right) \cdot \left( \sum_{n=0}^{+\infty} b_n z^n \right) = \sum_{n=0}^{+\infty} c_n z^n $$

**Cas d'égalité du rayon :** Si $R_1 \neq R_2$, alors $R_{\text{produit}} = \min(R_1, R_2)$.

**Démonstration (Esquisse)**
*   **Convergence absolue :** Pour $|z| < \min(R_1, R_2)$, les deux séries $\sum a_n z^n$ et $\sum b_n z^n$ convergent absolument. C'est la condition requise pour le produit de Cauchy de séries numériques.
*   **Produit de Cauchy de séries absolument convergentes :** Si $\sum \alpha_n$ et $\sum \beta_n$ convergent absolument, leur produit de Cauchy $\sum \gamma_n$ (avec $\gamma_n = \sum_{k=0}^n \alpha_k \beta_{n-k}$) converge absolument, et sa somme est $(\sum \alpha_n)(\sum \beta_n)$.
*   **Application :** On pose $\alpha_n = a_n z^n$, $\beta_n = b_n z^n$, $\gamma_n = c_n z^n$, d'où le résultat pour tout $|z| < \min(R_1, R_2)$, ce qui donne $R_{\text{produit}} \ge \min(R_1, R_2)$.

### 
**Subtilités**
*   **Inégalité et non égalité du rayon :** En général, $R_{\text{produit}} \ge \min(R_1, R_2)$. Il peut être strictement plus grand : si $R_1 = R_2 = R$ et que les singularités des deux séries se « compensent », le produit peut avoir un rayon plus grand. Exemple classique : $\sum (-1)^n z^n$ (rayon 1) fois $\sum (-1)^n z^n$ (rayon 1) donne $\sum c_n z^n$ où le rayon peut dépasser 1.
*   **Si $R_1 \neq R_2$ :** Le rayon du produit vaut exactement $\min(R_1, R_2)$, car la singularité de la série de plus petit rayon ne peut pas être annulée par l'autre.
*   **Condition d'application :** L'égalité des sommes $(\sum a_n z^n)(\sum b_n z^n) = \sum c_n z^n$ nécessite la convergence absolue de l'une des deux séries (ou des deux). Pour les séries numériques, le produit de Cauchy de deux séries simplement convergentes peut diverger (contre-exemple de Cauchy lui-même).

**Extensions**
*   **Produit de Cauchy en série entière vs série numérique :** La situation est plus favorable pour les séries entières que pour les séries numériques générales, car dans le disque ouvert de convergence, les séries entières convergent absolument, ce qui rend le produit de Cauchy licite automatiquement.
*   **Application importante :** On utilise ce résultat pour multiplier des développements en séries entières : $(e^z)^2 = e^{2z}$, ou pour calculer $\tan z$ à partir des séries de $\sin z$ et $\cos z$ (division formelle).

**Pièges classiques**
*   ❌ Écrire $R_{\text{produit}} = \min(R_1, R_2)$ sans justification : C'est vrai si $R_1 \neq R_2$, mais c'est une inégalité large si $R_1 = R_2$. Ne pas affirmer l'égalité dans le cas $R_1 = R_2$ sans argument supplémentaire.
*   ❌ Confondre produit de Cauchy et produit terme à terme : $c_n = \sum_{k=0}^n a_k b_{n-k}$ est une convolution, pas $a_n b_n$.
*   ❌ Oublier la convergence absolue comme prérequis : Le produit de Cauchy de deux séries simplement convergentes peut ne pas converger. C'est la convergence absolue (garantie dans le disque ouvert pour les séries entières) qui sauve la situation.
*   **Sens de l'application :** Le produit de Cauchy donne la série entière du produit des sommes. Pour diviser deux séries entières (e.g. $\tan z = \sin z / \cos z$), il faut résoudre $\sum c_n z^n \cdot \sum b_n z^n = \sum a_n z^n$ par identification des coefficients — ce n'est pas immédiat.

---

## FLASHCARD 56 — Proposition 11 : Régularité de la somme d'une série entière

### RECTO
**Proposition 11 — Régularité de la somme d'une série entière**

**Contexte :** Soit $f(z) = \sum_{n=0}^{+\infty} a_n z^n$ une série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R > 0$.

**Question :** Énoncer les propriétés de régularité (continuité, dérivabilité, classe $C^\infty$, formule des coefficients) de la somme $f$ sur son disque ouvert de convergence.

### VERSO
**Hypothèses complètes**
*   $\sum_{n=0}^{+\infty} a_n z^n$ série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R \in (0, +\infty]$.
*   On note $D = \{z \in \mathbb{C} : |z| < R\}$ le disque ouvert de convergence (ou $I = (-R, R)$ si on se restreint aux réels).

**Énoncé formel**
1.  **Convergence normale sur tout compact :**
    $$ \forall r \in (0, R), \sum_{n=0}^{+\infty} a_n z^n \text{ converge normalement sur } \{|z| \le r\} $$
    car $\sum |a_n| r^n < +\infty$ pour $r < R$.

2.  **Continuité :**
    $f : z \mapsto \sum_{n=0}^{+\infty} a_n z^n$ est continue sur $D$.

3.  **Dérivabilité terme à terme (cas réel ou complexe) :**
    La série dérivée $\sum_{n=1}^{+\infty} n a_n z^{n-1}$ a le même rayon de convergence $R$, et :
    $$ \forall z \in D, \quad f'(z) = \sum_{n=1}^{+\infty} n a_n z^{n-1} = \sum_{n=0}^{+\infty} (n+1) a_{n+1} z^n $$

4.  **Régularité $C^\infty$ :**
    $$ f \in C^\infty(D, \mathbb{C}) \quad (\text{ou } C^\infty((-R, R), \mathbb{C}) \text{ sur } \mathbb{R}) $$
    et $\forall k \in \mathbb{N}$ :
    $$ f^{(k)}(z) = \sum_{n=k}^{+\infty} \frac{n!}{(n-k)!} a_n z^{n-k} $$

5.  **Formule des coefficients (identification) :**
    $$ \forall n \in \mathbb{N}, \quad a_n = \frac{f^{(n)}(0)}{n!} $$

**Démonstration (Esquisse)**
*   **Convergence normale sur $|z| \le r < R$ :** Pour $r < R$, $r$ est dans le disque de convergence, donc $\sum |a_n| r^n < +\infty$, et $\sup_{|z| \le r} |a_n z^n| \le |a_n| r^n$. La série des majorants converge, d'où la convergence normale.
*   **Continuité :** Conséquence directe de la convergence uniforme sur tout compact (limite uniforme de fonctions continues est continue).
*   **Dérivabilité :** On montre que la série dérivée $\sum n a_n z^{n-1}$ a le même rayon $R$ (car $\limsup |n a_n|^{1/n} = \limsup |a_n|^{1/n}$ puisque $n^{1/n} \to 1$). On applique le théorème de dérivation terme à terme (convergence normale sur tout compact $\implies$ permutation dérivée/somme).
*   **Itération :** En itérant la dérivation, on obtient $C^\infty$ et la formule des coefficients en évaluant en $0$.

### 
**Subtilités**
*   **Le rayon de la série dérivée est exactement $R$ :** C'est un point crucial. La dérivation ne change pas le rayon de convergence. La preuve repose sur $\lim n^{1/n} = 1$, donc $\limsup |n a_n|^{1/n} = \limsup |a_n|^{1/n}$. Mais attention : le comportement sur le cercle $|z| = R$ peut changer (une série peut converger en un point du cercle, mais sa dérivée non).
*   **Convergence normale vs uniforme :** La convergence est normale (donc uniforme) sur tout compact inclus dans $D$, mais pas uniforme sur $D$ tout entier en général (sauf si $R=+\infty$).
*   **La formule $a_n = f^{(n)}(0)/n!$ est fondamentale :** Elle signifie que si deux séries entières coïncident sur un voisinage de $0$, elles ont les mêmes coefficients (unicité du développement en série entière).
*   **Dérivabilité complexe (holomorphie) :** Dans $\mathbb{C}$, $f$ est non seulement $C^\infty$ au sens réel mais holomorphe (analytique complexe) sur $D$. C'est un résultat bien plus fort que la simple régularité réelle.

**Extensions**
*   **Primitivation terme à terme :** De même, $\sum \frac{a_n}{n+1} z^{n+1}$ est une primitive de $f$ sur $D$, avec le même rayon $R$.
*   Une fonction $C^\infty$ réelle n'est pas nécessairement développable en série entière (exemple : $e^{-1/x^2}$ prolongée par $0$ en $0$). La proposition 11 va dans l'autre sens : une série entière est toujours $C^\infty$.
*   **En dimension infinie :** Ces résultats restent valables pour des séries entières à valeurs dans un espace de Banach $E$ (avec $|a_n|$ remplacé par $\|a_n\|$), pourvu que la notion de dérivabilité soit bien définie.

**Pièges classiques**
*   ❌ Croire que la dérivation peut changer le rayon : Non. $R_{\text{dérivée}} = R_{\text{originale}}$. Ce qui peut changer, c'est la convergence sur le cercle $|z| = R$.
*   ❌ Confondre convergence uniforme sur $D$ et sur les compacts de $D$ : La convergence est uniforme sur tout compact, pas sur $D$ ouvert en général.
*   ❌ Oublier la formule des coefficients : En concours, quand on demande de prouver que deux développements coïncident ou d'identifier une série entière, la formule $a_n = f^{(n)}(0)/n!$ est l'outil décisif.
*   ❌ Dériver sans vérifier le rayon : Avant de dériver terme à terme, il faut s'assurer qu'on est bien dans le disque ouvert de convergence. Le résultat ne s'applique pas directement sur le bord.

---

## FLASHCARD 57 — Proposition 12 : Développements en série entière au programme

### RECTO
**Proposition 12 — Développements en série entière au programme**

**Contexte :** On considère les fonctions usuelles définies sur $\mathbb{R}$ ou $\mathbb{C}$.

**Question :** Donner les développements en série entière au programme (exponentielle, sinus, cosinus, logarithme, puissance, géométrique), avec les rayons de convergence exacts et les domaines de validité.

### VERSO
**Énoncé formel — Développements au programme**

1.  **Exponentielle :**
    $$ \forall z \in \mathbb{C}, \quad e^z = \sum_{n=0}^{+\infty} \frac{z^n}{n!}, \quad R = +\infty $$

2.  **Cosinus et Sinus :**
    $$ \forall z \in \mathbb{C}, \quad \cos z = \sum_{n=0}^{+\infty} (-1)^n \frac{z^{2n}}{(2n)!}, \quad R = +\infty $$
    $$ \forall z \in \mathbb{C}, \quad \sin z = \sum_{n=0}^{+\infty} (-1)^n \frac{z^{2n+1}}{(2n+1)!}, \quad R = +\infty $$

3.  **Cosinus hyperbolique et Sinus hyperbolique :**
    $$ \forall z \in \mathbb{C}, \quad \cosh z = \sum_{n=0}^{+\infty} \frac{z^{2n}}{(2n)!}, \quad R = +\infty $$
    $$ \forall z \in \mathbb{C}, \quad \sinh z = \sum_{n=0}^{+\infty} \frac{z^{2n+1}}{(2n+1)!}, \quad R = +\infty $$

4.  **Série géométrique :**
    $$ \forall z \in \mathbb{C}, \ |z| < 1, \quad \frac{1}{1-z} = \sum_{n=0}^{+\infty} z^n, \quad R = 1 $$

5.  **Logarithme :**
    $$ \forall x \in (-1, 1], \quad \ln(1+x) = \sum_{n=1}^{+\infty} (-1)^{n-1} \frac{x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots, \quad R = 1 $$
    (Valide en $x=1$ par le théorème d'Abel, non valide en $x=-1$.)

6.  **Puissance $(1+x)^\alpha$ pour $\alpha \in \mathbb{R}$ :**
    $$ \forall x \in (-1, 1), \quad (1+x)^\alpha = \sum_{n=0}^{+\infty} \binom{\alpha}{n} x^n, \quad R = 1 $$
    où $\binom{\alpha}{n} = \frac{\alpha(\alpha-1)\dots(\alpha-n+1)}{n!}$ (coefficient binomial généralisé).
    (En $x=\pm 1$ : dépend de $\alpha$, cas particuliers.)

7.  **Arctangente :**
    $$ \forall x \in [-1, 1], \quad \arctan x = \sum_{n=0}^{+\infty} (-1)^n \frac{x^{2n+1}}{2n+1}, \quad R = 1 $$
    (Valide aux deux bornes $\pm 1$ par Abel.)

### 
**Subtilités**
*   **Domaine de $\ln(1+x)$ :** La série converge pour $x \in (-1, 1]$. En $x=1$ : convergence (série alternée) vers $\ln 2$. En $x=-1$ : divergence (série harmonique). Ne jamais écrire $|x| \le 1$ sans préciser $x \neq -1$.
*   **Domaine de $(1+x)^\alpha$ aux bornes :**
    *   $x=1$ : converge si $\alpha > -1$, diverge si $\alpha \le -1$.
    *   $x=-1$ : converge si $\alpha > 0$, diverge sinon.
    Ces cas limites sont hors programme strict mais peuvent apparaître en oral X/ENS.
*   **Série géométrique :** Valide pour $|z| < 1$ dans $\mathbb{C}$. En $|z|=1$, la série diverge (terme général ne tend pas vers $0$).
*   **Développement de $\arctan$ en $\pm 1$ :** Valide par le théorème d'Abel. En $x=1$ : $\arctan 1 = \pi/4 = \sum \frac{(-1)^n}{2n+1}$ (formule de Leibniz).

**Extensions**
*   **Développements dérivés :** On peut dériver terme à terme dans $(-1, 1)$ pour retrouver :
    $$ \frac{1}{1+x} = \sum_{n=0}^{+\infty} (-1)^n x^n, \quad \frac{1}{(1-x)^2} = \sum_{n=1}^{+\infty} n x^{n-1} $$
*   **Fonctions trigonométriques inverses :** $\arcsin x = \sum_{n=0}^{+\infty} \binom{2n}{n} \frac{x^{2n+1}}{4^n(2n+1)}$ pour $|x| < 1$, obtenu en intégrant $1/\sqrt{1-x^2}$.

**Pièges classiques**
*   ❌ **Indice de départ :** $\sum_{n=0}$ pour $e^z, \cos, \cosh, \frac{1}{1-z}$. $\sum_{n=1}$ pour $\ln(1+x)$ (premier terme est $n=1$). Confondre les indices fait perdre des points.
*   ❌ **Signe dans $\ln(1+x)$ :** $(-1)^{n-1}/n$ et non $(-1)^n/n$. Vérifier en $n=1$ : $+x$. ✓
*   ❌ **Domaine de validité du logarithme :** Écrire $|x| < 1$ sans inclure $x=1$ est incomplet (la convergence en $x=1$ est un résultat non trivial).
*   ❌ **Coefficient binomial généralisé :** $\binom{\alpha}{0} = 1, \binom{\alpha}{1} = \alpha, \binom{\alpha}{2} = \frac{\alpha(\alpha-1)}{2}$. Pour $\alpha=-1$ : $\binom{-1}{n} = (-1)^n$, d'où $\frac{1}{1+x} = \sum (-1)^n x^n$. Vérifier la cohérence avec la série géométrique.
*   ❌ **Oublier qu'on développe en puissances de $x$, pas de $x-a$ :** Ces développements sont centrés en $0$. Si on veut développer $f$ au voisinage de $a \neq 0$, il faut écrire $f(a+h)$ et développer en $h$.

---

## FLASHCARD 58 — À connaître 14 : Convergence normale d'une série entière

### RECTO
**À connaître 14 — Convergence normale d'une série entière**

**Contexte :** Soit $\sum a_n z^n$ une série entière à coefficients $a_n \in \mathbb{C}$, de rayon de convergence $R > 0$.

**Question :** Sur quel type de domaine la série entière converge-t-elle normalement ? Énoncer précisément le résultat avec les bonnes quantifications.

### VERSO
**Hypothèses complètes**
*   $\sum a_n z^n$ série entière, $a_n \in \mathbb{C}$, rayon de convergence $R \in (0, +\infty]$.
*   $r \in \mathbb{R}$ avec $0 \le r < R$.

**Énoncé formel**
$$ \forall r \in [0, R), \quad \sum_{n=0}^{+\infty} \sup_{|z| \le r} |a_n z^n| = \sum_{n=0}^{+\infty} |a_n| r^n < +\infty $$

**Autrement dit :**

La série entière $\sum a_n z^n$ converge normalement sur tout disque fermé $\overline{D}(0, r) = \{z \in \mathbb{C} : |z| \le r\}$ pour tout $r < R$.

**Conséquences immédiates :**

*   Convergence uniforme sur $\overline{D}(0, r)$ pour tout $r < R$.
*   La somme $f(z) = \sum_{n=0}^{+\infty} a_n z^n$ est continue sur $D(0, R)$.
*   La convergence n'est pas normale sur $D(0, R)$ ouvert en général.

**Démonstration (Esquisse)**
*   **Choix de $r' \in (r, R)$ :** Puisque $r < R$, il existe $r' \in (r, R)$ tel que $\sum |a_n| (r')^n < +\infty$.
*   **Majoration :** $|a_n| r^n = |a_n| (r')^n \cdot \left( \frac{r}{r'} \right)^n \le |a_n| (r')^n$ puisque $r/r' < 1$.
*   **Convergence de la série majorante :** $\sum |a_n| r^n \le \sum |a_n| (r')^n < +\infty$.

### 
**Subtilités**
*   **Convergence normale sur $\overline{D}(0, r)$ mais pas sur $D(0, R)$ :** C'est la distinction fondamentale. L'ouvert $D(0, R)$ est recouvert par une famille croissante de fermés $\overline{D}(0, r)$ pour $r \to R^-$. La convergence est uniforme sur chacun, mais pas globalement sur l'ouvert.
*   **"Compact" vs "disque fermé" :** En pratique, on dit que la série converge normalement sur tout compact inclus dans $D(0, R)$. Tout compact de $\mathbb{C}$ inclus dans $D(0, R)$ est contenu dans un $\overline{D}(0, r)$ pour un certain $r < R$.
*   **Sur le cercle $|z| = R$ :** La convergence doit être étudiée au cas par cas (Abel, critère des séries alternées, etc.). La convergence normale ne s'étend pas automatiquement.

**Extensions**
*   **Analogue pour les séries de fonctions :** Ce résultat est l'analogue exact, pour les séries entières, du théorème de régularité $C^k$ des séries de fonctions : convergence normale sur tout compact $\implies$ permutation limite/dérivée.
*   **Intégration terme à terme :** La convergence normale sur $\overline{D}(0, r)$ permet d'intégrer terme à terme sur tout chemin inclus dans $D(0, R)$.

**Pièges classiques**
*   ❌ **Affirmer la convergence normale sur $D(0, R)$ ouvert :** Faux en général. Exemple : $\sum z^n$ converge normalement sur $\overline{D}(0, r)$ pour $r < 1$, mais $\sum \sup_{|z|<1} |z^n| = \sum 1 = +\infty$.
*   ❌ **Oublier que $r < R$ est strict :** La convergence de $\sum |a_n| r^n$ pour $r < R$ est garantie par définition de $R$, mais peut diverger pour $r=R$.
*   ❌ **Confondre convergence normale et convergence absolue :** La convergence absolue est en un point ; la convergence normale est uniforme sur un ensemble (et implique la convergence absolue en chaque point).

---

## FLASHCARD 59 — Proposition 13 : Lemme d'Abel radial (Théorème d'Abel)

### RECTO
**Proposition 13 — Lemme d'Abel radial**

**Contexte :** Soit $\sum_{n=0}^{+\infty} a_n$ une série à coefficients $a_n \in \mathbb{C}$, supposée convergente (de somme $S$). On considère la série entière réelle $f(x) = \sum_{n=0}^{+\infty} a_n x^n$, de rayon de convergence $R \ge 1$.

**Question :** Énoncer le lemme d'Abel radial : que peut-on dire du comportement de $f(x)$ quand $x \to 1^-$ ?

### VERSO
**Hypothèses complètes**
*   $\sum_{n=0}^{+\infty} a_n$ est une série convergente (au sens usuel des séries numériques dans $\mathbb{C}$), de somme $S = \sum_{n=0}^{+\infty} a_n$.
*   La série entière $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ a un rayon de convergence $R \ge 1$ (garanti par la convergence de $\sum a_n$).

**Énoncé formel**
$$ \lim_{\substack{x \to 1 \\ x < 1}} f(x) = \lim_{x \to 1^-} \sum_{n=0}^{+\infty} a_n x^n = \sum_{n=0}^{+\infty} a_n = S $$

Autrement dit : on peut permuter la limite $x \to 1^-$ et la sommation, et la somme de la série entière en $x=1$ coïncide avec la limite radiale.

**Formulation équivalente :** Si $f : [0, 1) \to \mathbb{C}$ est définie par $f(x) = \sum_{n \ge 0} a_n x^n$ et si $\sum a_n$ converge, alors $f$ est prolongeable par continuité en $x=1$ et $f(1^-) = \sum_{n \ge 0} a_n$.

**Démonstration (Esquisse)**
*   **Transformation d'Abel (sommation par parties) :** On pose $S_N = \sum_{n=0}^N a_n$ et $S_{-1} = 0$. On écrit :
    $$ f(x) = \sum_{n=0}^N a_n x^n + R_N(x) = \sum_{n=0}^N (S_n - S_{n-1}) x^n + R_N(x) $$
    En sommant par parties, on obtient une expression faisant apparaître $(1-x) \sum S_n x^n$.
*   **Convergence de $S_n \to S$ :** On décompose $f(x) - S = (1-x) \sum_{n=0}^{+\infty} (S_n - S) x^n$ et on montre que cette expression tend vers $0$ quand $x \to 1^-$, en utilisant que $S_n - S \to 0$ et que $(1-x) \sum x^n = 1$.
*   **Conclusion :** $|f(x) - S| \le \varepsilon$ pour $x$ assez proche de $1$, d'où la limite.

### 
**Subtilités**
*   **La réciproque est fausse :** Si $\lim_{x \to 1^-} f(x) = L$, on ne peut pas conclure que $\sum a_n$ converge et vaut $L$. Contre-exemple classique : $\sum (-1)^n x^n = \frac{1}{1+x} \to 1/2$ quand $x \to 1^-$, alors que $\sum (-1)^n$ diverge. On dit que $\sum (-1)^n$ est somme d'Abel $1/2$.
*   **Sens de la limite :** radial (le long de l'axe réel). Le lemme d'Abel radial ne dit rien de la limite selon d'autres directions dans $\mathbb{C}$. La version plus forte (lemme d'Abel non tangentiel) est plus délicate.
*   **Rayon $R \ge 1$ est automatique :** Si $\sum a_n$ converge, alors $a_n \to 0$, donc $(a_n)$ est bornée, donc $\limsup |a_n|^{1/n} \le 1$, donc $R \ge 1$. La convergence de $\sum a_n$ garantit que le point $x=1$ est au moins sur le cercle de convergence.
*   **Application principale :** prolongement par continuité. Si on connaît la série entière sur $(-1, 1)$ et que la série $\sum a_n$ converge, on peut calculer la valeur en $x=1$ par continuité radiale.

**Extensions**
*   **Théorème de Tauber (réciproque partielle) :** Si $f(x) \to L$ quand $x \to 1^-$ ET si $n a_n \to 0$, alors $\sum a_n$ converge et vaut $L$. C'est un résultat profond (hors programme, mais connu des meilleurs élèves).
*   **Lemme d'Abel sur le cercle $|z| = R$ :** Plus généralement, si $\sum a_n z_0^n$ converge pour $|z_0| = R$, alors $f(r z_0) \to \sum a_n z_0^n$ quand $r \to 1^-$ (en approchant radialement $z_0$).

**Applications classiques :**
*   $\ln 2 = \sum_{n=1}^{+\infty} \frac{(-1)^{n-1}}{n}$ (Abel sur $\ln(1+x)$ en $x=1$).
*   $\frac{\pi}{4} = \sum_{n=0}^{+\infty} \frac{(-1)^n}{2n+1}$ (formule de Leibniz, Abel sur $\arctan$ en $x=1$).

**Pièges classiques**
*   ❌ **Appliquer Abel sans vérifier la convergence de $\sum a_n$ :** C'est l'hypothèse clé. Si $\sum a_n$ diverge, on ne peut pas conclure sur $\lim_{x \to 1^-} f(x)$ via Abel.
*   ❌ **Confondre « la série converge en $x=1$ » et « la limite radiale existe » :** Ce sont deux choses différentes. Abel dit : convergence de $\sum a_n \implies$ limite radiale = $\sum a_n$. Mais la limite radiale peut exister sans que la série converge en $1$ (exemple $\sum (-1)^n x^n$).
*   ❌ **Oublier que la limite est unilatérale $x \to 1^-$ :** On approche $1$ par valeurs inférieures (dans le disque de convergence). Ce n'est pas une limite bilatérale.
*   ❌ **Tenter d'appliquer Abel à une série divergente pour « sommer » une série divergente :** La somme d'Abel est un procédé de sommation régulier, pas une somme ordinaire. Les confondre est une faute grave.

---

## FLASHCARD 60 — À connaître 15 : Formule intégrale de Cauchy

### RECTO
**À connaître 15 — Formule intégrale de Cauchy**

**Contexte :** Soit $f : U \to \mathbb{C}$ une fonction holomorphe sur un ouvert $U$ de $\mathbb{C}$. Soit $\gamma$ un lacet (chemin fermé) inclus dans $U$, de classe $C^1$ par morceaux, d'indice $\text{Ind}(\gamma, a) = 1$ autour d'un point $a \in U \setminus \gamma$.

**Question :** Énoncer la formule intégrale de Cauchy (pour $f(a)$ et pour les dérivées $f^{(n)}(a)$).

### VERSO
**Hypothèses complètes**
*   $U \subset \mathbb{C}$ ouvert.
*   $f : U \to \mathbb{C}$ holomorphe sur $U$ (i.e., $\mathbb{C}$-différentiable en tout point de $U$).
*   $\gamma : [0, 1] \to U$ lacet de classe $C^1$ par morceaux, à valeurs dans $U$, tel que $a \notin \gamma([0, 1])$ et $\text{Ind}(\gamma, a) = \frac{1}{2\pi i} \int_\gamma \frac{dz}{z-a} = 1$.
*   (Cas pratique le plus courant : $\gamma$ est le cercle $\gamma(t) = a + r e^{2\pi i t}$, $t \in [0, 1]$, parcouru une fois dans le sens direct, avec $\overline{D}(a, r) \subset U$.)

**Énoncé formel**
**Formule de Cauchy pour $f(a)$ :**
$$ f(a) = \frac{1}{2\pi i} \int_\gamma \frac{f(z)}{z-a} dz $$

**Formule de Cauchy pour les dérivées :**
$$ \forall n \in \mathbb{N}, \quad f^{(n)}(a) = \frac{n!}{2\pi i} \int_\gamma \frac{f(z)}{(z-a)^{n+1}} dz $$

**Inégalités de Cauchy :** Si $|f(z)| \le M$ sur $\gamma =$ cercle de rayon $r$ centré en $a$ :
$$ |f^{(n)}(a)| \le \frac{n! M}{r^n} $$

**Démonstration (Esquisse)**
*   **Pour $f(a)$ :** On écrit $\frac{f(z)}{z-a} = \frac{f(z)-f(a)}{z-a} + \frac{f(a)}{z-a}$. L'holomorphie assure que $\frac{f(z)-f(a)}{z-a}$ se prolonge en une fonction holomorphe, dont l'intégrale sur $\gamma$ est nulle (théorème de Cauchy). L'intégrale de $\frac{f(a)}{z-a}$ vaut $f(a) \cdot 2\pi i$ (calcul direct ou indice).
*   **Pour $f^{(n)}(a)$ :** On dérive sous le signe intégrale $n$ fois par rapport à $a$ (licite car la convergence est uniforme en $z$ sur $\gamma$) : $\frac{d^n}{da^n} \frac{1}{z-a} = \frac{n!}{(z-a)^{n+1}}$.
*   **Inégalités de Cauchy :** Majoration directe : $|f^{(n)}(a)| \le \frac{n!}{2\pi} \cdot \frac{M}{r^{n+1}} \cdot 2\pi r = \frac{n! M}{r^n}$.

### 
**Subtilités**
*   **Holomorphie est indispensable :** La formule est fausse pour une simple fonction $C^\infty$ réelle. Elle repose fondamentalement sur la $\mathbb{C}$-différentiabilité.
*   **L'indice doit valoir 1 :** Si $\text{Ind}(\gamma, a) = k$, la formule devient $f(a) = \frac{1}{2\pi i k} \int_\gamma \frac{f(z)}{z-a} dz$... ou plus précisément $\int_\gamma \frac{f(z)}{z-a} dz = 2\pi i \cdot \text{Ind}(\gamma, a) \cdot f(a)$.
*   **Conséquence majeure :** toute fonction holomorphe est analytique. La formule de Cauchy permet de développer $f$ en série entière autour de $a$ (en développant $\frac{1}{z-a}$ en série de $\frac{z_0-a}{z-a}$), ce qui démontre que holomorphe $\iff$ analytique en analyse complexe.
*   **Inégalités de Cauchy :** Elles permettent de prouver le théorème de Liouville : toute fonction holomorphe bornée sur $\mathbb{C}$ est constante (en faisant $r \to +\infty$, on obtient $|f^{(1)}(a)| \le M/r \to 0$).

**Extensions**
*   **Formule de Cauchy et calcul de résidus :** Si $f$ a un pôle d'ordre $n+1$ en $a$, on peut relier les résidus à la formule de Cauchy pour les dérivées.
*   **Développement en série de Laurent :** La formule intégrale de Cauchy sert de base à la théorie des séries de Laurent pour les fonctions méromorphes.
*   **Hors programme mais connu en oral ENS :** La formule de représentation intégrale est la base de la théorie $H^p$ des espaces de Hardy et de nombreux résultats d'approximation.

**Pièges classiques**
*   ❌ **Oublier le $n!$ dans la formule pour $f^{(n)}$ :** C'est $\frac{n!}{2\pi i}$, pas $\frac{1}{2\pi i}$.
*   ❌ **Confondre $(z-a)^{n+1}$ et $(z-a)^n$ :** Pour $f^{(n)}$, le dénominateur est $(z-a)^{n+1}$ (exposant $n+1$, non $n$).
*   ❌ **Croire que la formule s'applique à $C^\infty$ réel :** Elle est spécifique à l'analyse complexe. Une fonction $C^\infty$ réelle ne satisfait pas une telle formule intégrale.
*   ❌ **Oublier la condition $\overline{D}(a, r) \subset U$ :** La formule nécessite que le disque fermé soit entièrement dans le domaine d'holomorphie.

---

## FLASHCARD 61 — À connaître 16 : Équivalent d'une série entière à partir des coefficients

### RECTO
**À connaître 16 — Équivalent d'une série entière à partir des coefficients**

**Contexte :** Soit $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ une série entière réelle de rayon de convergence $R > 0$. On suppose que le premier coefficient non nul est $a_N$ (i.e., $a_0 = a_1 = \dots = a_{N-1} = 0$ et $a_N \neq 0$).

**Question :** Donner l'équivalent de $f(x)$ au voisinage de $0$, et l'équivalent de $f(x)$ au voisinage du bord $x \to R^-$ lorsque $a_n \sim c \cdot r^{-n}$ pour un certain $r < R$.

### VERSO
**Énoncé formel**
1.  **Équivalent en $0$ (ordre du zéro) :**
    Si $a_0 = \dots = a_{N-1} = 0$ et $a_N \neq 0$, alors :
    $$ f(x) \underset{x \to 0}{=} a_N x^N + o(x^N), \quad \text{i.e., } f(x) \underset{x \to 0}{\sim} a_N x^N $$
    C'est une conséquence directe de la continuité et de la formule $a_n = f^{(n)}(0)/n!$.

2.  **Équivalent en $x \to R^-$ (singularité dominante) :**
    Si les coefficients satisfont $a_n \sim c \cdot \rho^{-n}$ quand $n \to +\infty$ (avec $\rho = R$, i.e., $\rho^{-1} = R^{-1}$ est le rayon), alors le comportement de $f(x)$ près de $x=R$ est dicté par la singularité dominante. Cas typique :
    *   Si $a_n \sim \frac{c}{R^n}$ (tous les $a_n$ du même signe, positifs), alors $f(x) \to +\infty$ quand $x \to R^-$ et :
        $$ f(x) \underset{x \to R^-}{\sim} \frac{c}{1 - x/R} \cdot \frac{1}{R^n} \dots $$
        (Le comportement exact dépend de la nature de la singularité.)
    *   **Cas particulier fondamental :** Si $a_n \sim \frac{C}{n^\alpha R^n}$ pour $\alpha > 0$, alors
        $$ f(x) \sim C \cdot \frac{(-\ln(1-x/R))^{\alpha-1}}{(\alpha-1)!} $$
        (lié aux séries de Bertrand au bord).

3.  **Lemme de transfert (cas élémentaire) :**
    Si $f(x) = \sum_{n=0}^{+\infty} a_n x^n$ avec $a_n \ge 0$ et $a_n \sim \frac{c}{R^n}$ quand $n \to \infty$, alors :
    $$ f(x) \underset{x \to R^-}{\sim} \frac{c R}{R-x} $$
    car $\sum_{n \ge 0} x^n / R^n = \frac{R}{R-x} \to +\infty$.

**Démonstration (Esquisse)**
*   **Pour l'équivalent en $0$ :** Développement de Taylor à l'ordre $N$ : $f(x) = a_N x^N + a_{N+1} x^{N+1} + \dots = a_N x^N(1 + O(x))$.
*   **Pour l'équivalent au bord :** On utilise la comparaison $\sum a_n x^n \sim c \sum (x/R)^n \cdot \dots$ (somme géométrique) lorsque $a_n$ est équivalent à un terme géométrique, et le résultat de sommation des équivalents de séries à termes positifs.

### 
**Subtilités**
*   L'équivalent en $0$ est immédiat mais l'équivalent au bord est subtil et dépend du type de singularité (pôle simple $\leftrightarrow \frac{c}{R-x}$, singularité logarithmique $\leftrightarrow \ln \frac{1}{R-x}$, etc.).
*   La « singularité dominante » est la singularité de $f$ la plus proche de $0$ dans $\mathbb{C}$. Pour une série entière réelle, c'est généralement le point $x=R$ ou $x=-R$ (ou un point du cercle $|z|=R$).
*   **Attention aux séries entières lacunaires :** Si $f(x) = \sum a_{2n} x^{2n}$ (série en $x^2$), l'équivalent en $0$ commence au premier terme non nul, et la singularité est à $|z|=R$ mais peut être atteinte pour $x=R$ et $x=-R$ (ou $iz = \pm R$).

**Extensions**
*   **Théorie de Darboux / méthode des singularités (combinatoire analytique) :** Dans le cadre de la combinatoire analytique (Flajolet-Sedgewick), on extrait des équivalents des coefficients $a_n$ à partir du type de singularité de $f$. C'est une généralisation systématique de ces idées.
*   **Séries génératrices :** En combinatoire, $f(x) = \sum a_n x^n$ où $a_n$ compte des structures de taille $n$. L'équivalent de $a_n$ (comportement asymptotique du nombre de structures) est déduit du type de singularité de $f$.

**Pièges classiques**
*   ❌ **Confondre « rayon de convergence » et « singularité » :** La singularité de $f$ est au rayon $R$, mais $f$ peut être analytique en certains points du cercle et singulière en d'autres.
*   ❌ **Sommation abusive des équivalents :** Pour passer de $a_n \sim b_n$ à $\sum a_n x^n \sim \sum b_n x^n$, il faut des hypothèses (termes de même signe, ou convergence dominée). Ce n'est pas automatique pour des séries alternées.
*   ❌ **Oublier que l'équivalent en $0$ est $a_N x^N$ et non $a_N x^N + a_{N+1} x^{N+1}$ :** L'équivalent est le terme dominant. Le suivant est un $o$.

---

## FLASHCARD 62 — Théorème 31 : Théorème de convergence dominée (mesure de Lebesgue)

### RECTO
**Théorème 31 — Théorème de convergence dominée**

**Contexte :** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions mesurables sur un espace mesuré $(\Omega, \mathcal{A}, \mu)$ (en pratique : $\Omega \subset \mathbb{R}$, $\mu = \text{mesure de Lebesgue}$ ou mesure de comptage).

**Question :** Énoncer le théorème de convergence dominée (TCD) avec ses hypothèses exactes et ses conclusions (convergence de l'intégrale, permutation limite-intégrale, convergence $L^1$).

### VERSO
**Hypothèses complètes**
*   $(\Omega, \mathcal{A}, \mu)$ espace mesuré ($\Omega$ intervalle de $\mathbb{R}$, $\mu = \text{mesure de Lebesgue}$, ou $\Omega = \mathbb{N}$, $\mu = \text{mesure de comptage}$).
*   $(f_n)_{n \in \mathbb{N}}$ suite de fonctions mesurables $f_n : \Omega \to \mathbb{R}$ (ou $\mathbb{C}$).
*   **Convergence presque partout :** $f_n \xrightarrow[n \to +\infty]{} f$ p.p. sur $\Omega$ (i.e., $\mu$-presque partout).
*   **Domination :** $\exists g : \Omega \to [0, +\infty]$ intégrable (i.e., $\int_\Omega g d\mu < +\infty$) telle que :
    $$ \forall n \in \mathbb{N}, \quad |f_n| \le g \quad \mu\text{-p.p.} $$

**Énoncé formel**
Sous ces hypothèses :

1.  $f$ est intégrable : $f \in L^1(\Omega, \mu)$.
2.  **Convergence $L^1$ :**
    $$ \lim_{n \to +\infty} \int_\Omega |f_n - f| d\mu = 0 $$
3.  **Permutation limite-intégrale :**
    $$ \lim_{n \to +\infty} \int_\Omega f_n d\mu = \int_\Omega f d\mu = \int_\Omega \lim_{n \to +\infty} f_n d\mu $$

**Démonstration (Esquisse)**
*   **Lemme de Fatou :** Pour des fonctions positives mesurables $(h_n) \ge 0$ : $\int \liminf h_n \le \liminf \int h_n$.
*   **Application à $g - f_n \ge 0$ et $g + f_n \ge 0$ :** On applique Fatou à ces deux suites positives (qui convergent p.p. vers $g-f$ et $g+f$) pour obtenir des inégalités dans les deux sens.
*   **Conclusion :** On déduit $\limsup \int f_n \le \int f \le \liminf \int f_n$, donc $\int f_n \to \int f$. La convergence $L^1$ s'obtient en appliquant le même raisonnement à $|f_n - f| \le 2g$.

### 
**Subtilités**
*   **La domination doit être par une fonction $g$ intégrable, pas seulement bornée.** Si $\Omega = \mathbb{R}$ et $|f_n| \le 1$, on ne peut pas appliquer TCD directement car la fonction constante 1 n'est pas intégrable sur $\mathbb{R}$ (mais elle l'est sur un segment $[a, b]$).
*   **Convergence p.p. et non convergence partout :** Il suffit que $f_n \to f$ hors d'un ensemble de mesure nulle. En pratique, si on a la convergence partout, c'est encore mieux.
*   La limite $f$ est bien mesurable (limite p.p. de fonctions mesurables est mesurable).
*   **TCD sur $\mathbb{N}$ (mesure de comptage) :** Le TCD appliqué à $\Omega = \mathbb{N}$, $\mu = \text{mesure de comptage}$ donne : si $u_{n,k} \to v_k$ pour tout $k$ et $|u_{n,k}| \le w_k$ avec $\sum w_k < +\infty$, alors $\sum_k u_{n,k} \to \sum_k v_k$. C'est le théorème de convergence dominée pour les séries (À connaître 5).
*   **Pas d'hypothèse de monotonie :** Contrairement au théorème de convergence monotone (TCM), TCD n'exige pas la monotonie des $f_n$.

**Extensions**
*   **Cas $L^p$ :** Si $|f_n|^p \le g \in L^1$, on obtient $f_n \to f$ dans $L^p$.
*   **TCD à paramètre continu :** Si $f_n$ est remplacée par $f_t$ avec $t \to t_0$ continu, l'analogue du TCD (Théorème 32) s'applique avec les mêmes hypothèses (convergence p.p. remplacée par convergence p.p. pour $t \to t_0$, et domination uniforme en $t$).
*   **Relation avec l'intégrale de Riemann :** Pour les fonctions Riemann-intégrables sur $[a, b]$, le TCD (dans sa version Lebesgue) est plus puissant. Les théorèmes 21 et 28 (convergence uniforme sur un segment) sont des cas particuliers où la domination est triviale (borne uniforme sur un compact).

**Pièges classiques**
*   ❌ **Oublier de vérifier l'intégrabilité de $g$ :** La dominante doit être intégrable. Une dominante bornée ne suffit pas sur un domaine non borné.
*   ❌ **Confondre convergence p.p. et convergence uniforme :** TCD n'exige pas la convergence uniforme (c'est son avantage sur les théorèmes du chapitre 4). La convergence p.p. suffit.
*   ❌ **Appliquer TCD sans dominante :** Si on ne peut pas exhiber de dominante intégrable, TCD ne s'applique pas. Il faut chercher une autre méthode (TCM, Fatou, intégration par parties, etc.).
*   ❌ **Oublier que la conclusion inclut la convergence $L^1$** (pas seulement la permutation limite-intégrale). En concours, on peut demander les deux.
*   ❌ **Ne pas vérifier la mesurabilité de $f_n$ :** TCD s'applique aux fonctions mesurables. En pratique, les fonctions continues, continues par morceaux, ou limites de telles fonctions sont mesurables — mais il faut le mentionner.

---

## FLASHCARD 63 — Théorème 32 : TCD à paramètre continu

### RECTO
**Théorème 32 — Théorème de convergence dominée à paramètre continu**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$ (ou $\mathbb{C}$) où $(\Omega, \mathcal{A}, \mu)$ est un espace mesuré et $I$ est un intervalle de $\mathbb{R}$ (ou un espace métrique). On pose $F(t) = \int_\Omega f(x, t) d\mu(x)$.

**Question :** Énoncer le théorème de convergence dominée à paramètre continu (continuité de $F$ et permutation limite-intégrale).

### VERSO
**Hypothèses complètes**
1.  **Continuité en $t$ :** Pour $\mu$-presque tout $x \in \Omega$, la fonction $t \mapsto f(x, t)$ est continue en $t_0 \in I$ (ou sur $I$).
2.  **Domination uniforme en $t$ :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que :
    $$ \forall t \in I, \quad |f(x, t)| \le g(x) \quad \mu\text{-p.p. en } x $$
3.  Pour tout $t \in I$, $x \mapsto f(x, t)$ est mesurable.

**Énoncé formel**
**Continuité de $F$ en $t_0$ :**
$$ F(t) = \int_\Omega f(x, t) d\mu(x) \xrightarrow[t \to t_0]{} \int_\Omega f(x, t_0) d\mu(x) = F(t_0) $$

Autrement dit, on peut permuter la limite et l'intégrale :
$$ \lim_{t \to t_0} \int_\Omega f(x, t) d\mu(x) = \int_\Omega \lim_{t \to t_0} f(x, t) d\mu(x) $$

Si de plus la continuité en $t_0$ est valable pour tout $t_0 \in I$, alors $F$ est continue sur $I$.

**Démonstration (Esquisse)**
*   **Réduction à TCD discret :** Pour toute suite $t_n \to t_0$, on pose $f_n(x) = f(x, t_n)$. Alors $f_n(x) \to f(x, t_0)$ p.p. (par hypothèse de continuité p.p.) et $|f_n(x)| \le g(x)$ p.p.
*   **Application du TCD (discret, Théorème 31) :** On conclut $\int f_n d\mu \to \int f(\cdot, t_0) d\mu$, i.e., $F(t_n) \to F(t_0)$.
*   **Caractérisation séquentielle de la continuité :** Comme toute suite $t_n \to t_0$ donne $F(t_n) \to F(t_0)$, $F$ est continue en $t_0$.

### 
**Subtilités**
*   **La domination doit être uniforme en $t$ :** $|f(x, t)| \le g(x)$ pour tous les $t \in I$. Si la domination n'est uniforme que sur un voisinage de $t_0$, c'est suffisant pour la continuité en $t_0$.
*   **Continuité p.p. et non partout :** Il suffit que $t \mapsto f(x, t)$ soit continue en $t_0$ pour $\mu$-presque tout $x$. En pratique, souvent continue partout.
*   **Lien avec le Théorème 36 (continuité des intégrales à paramètre) :** Le Théorème 36 du chapitre 8 est précisément ce résultat dans le cadre des intégrales à paramètre (éventuellement impropres). Le Théorème 32 est la version abstraite (mesure quelconque).

**Extensions**
*   **Version pour la dérivabilité :** C'est l'objet du Théorème 37. On remplace la continuité en $t$ par la dérivabilité en $t$, et on ajoute une domination de $\partial_t f$.
*   **Paramètre dans $\mathbb{R}^d$ :** Le théorème s'étend à $t \in U \subset \mathbb{R}^d$ (ou espace métrique quelconque) avec la même preuve (caractérisation séquentielle).

**Pièges classiques**
*   ❌ **Domination locale vs globale :** Pour la continuité en $t_0$, une domination locale (sur un voisinage de $t_0$) suffit. Pour la continuité sur tout $I$, il faut une domination globale uniforme sur $I$.
*   ❌ **Oublier de vérifier la mesurabilité :** $x \mapsto f(x, t)$ doit être mesurable pour chaque $t$. C'est souvent évident (fonctions continues, etc.) mais doit être mentionné.
*   ❌ **Confondre ce théorème avec le théorème de régularité $C^1$ :** Ce théorème donne la continuité de $F$. Pour la dérivabilité, il faut le Théorème 37 avec des hypothèses supplémentaires sur $\partial_t f$.

---

## FLASHCARD 64 — Théorème 33 : TCD appliqué aux sommes partielles (permutation série-intégrale)

### RECTO
**Théorème 33 — Théorème de convergence dominée appliqué aux sommes partielles**

**Contexte :** Soit $(u_n)_{n \in \mathbb{N}}$ une suite de fonctions mesurables sur $(\Omega, \mathcal{A}, \mu)$.

**Question :** Énoncer le théorème permettant de permuter une somme de série et une intégrale, en précisant les hypothèses exactes (convergence p.p., domination intégrable de la somme partielle).

### VERSO
**Hypothèses complètes**
*   $u_n : \Omega \to \mathbb{R}$ (ou $\mathbb{C}$) mesurables pour tout $n \in \mathbb{N}$.
*   La série $\sum_{n=0}^{+\infty} u_n(x)$ converge p.p. sur $\Omega$.
*   **Domination (convergence dominée) :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que :
    $$ \forall N \in \mathbb{N}, \quad \left| \sum_{n=0}^N u_n(x) \right| \le g(x) \quad \mu\text{-p.p.} $$
    (En pratique : il suffit que $\sum_{n=0}^{+\infty} |u_n(x)| \le g(x)$ p.p., ce qui est une condition suffisante.)

**Énoncé formel**
Sous ces hypothèses :

$$ \int_\Omega \sum_{n=0}^{+\infty} u_n(x) d\mu(x) = \sum_{n=0}^{+\infty} \int_\Omega u_n(x) d\mu(x) $$

De plus, chaque $u_n$ est intégrable et la série $\sum \int_\Omega u_n d\mu$ converge absolument.

**Condition suffisante pratique (domination par la somme des valeurs absolues) :**

Si $\sum_{n=0}^{+\infty} \int_\Omega |u_n(x)| d\mu(x) < +\infty$, alors les hypothèses du théorème sont satisfaites et la permutation est licite.

**Démonstration (Esquisse)**
*   **Application du TCD aux sommes partielles :** On pose $F_N(x) = \sum_{n=0}^N u_n(x)$. Par hypothèse, $F_N(x) \to F(x) = \sum_{n=0}^{+\infty} u_n(x)$ p.p., et $|F_N(x)| \le g(x) \in L^1$.
*   **TCD (Théorème 31) :** $\int F_N d\mu \to \int F d\mu$, i.e., $\sum_{n=0}^N \int u_n d\mu \to \int \sum_{n=0}^{+\infty} u_n d\mu$.
*   **Condition suffisante :** Si $\sum \int |u_n| < +\infty$, on peut prendre $g(x) = \sum_{n=0}^{+\infty} |u_n(x)|$ (intégrable par Beppo-Levi / TCM), et la domination est satisfaite.

### 
**Subtilités**
*   La condition pratique $\sum \int |u_n| < +\infty$ est suffisante mais pas nécessaire. La condition nécessaire est la domination des sommes partielles par une fonction intégrable.
*   **Lien avec le Théorème 35 (sommation $L^1$) :** Le Théorème 35 (Fubini-Tonelli pour les séries) est précisément l'application de ce résultat dans un cadre productif.
*   **Lien avec les Théorèmes 26-30 (séries de fonctions) :** La convergence normale d'une série de fonctions sur $[a, b]$ implique la domination par $\sum \|u_n\|_\infty \le M < +\infty$ (intégrable sur $[a, b]$), donc la permutation est licite — c'est la preuve sous-jacente du Théorème 28.

**Pièges classiques**
*   ❌ **Permuter série et intégrale sans vérifier la domination :** C'est la faute la plus commune. Sans domination, la permutation peut être fausse.
*   ❌ **Confondre $\sum \int |u_n| < +\infty$ et $\int \sum |u_n| < +\infty$ :** Par Beppo-Levi (TCM), ces deux conditions sont équivalentes (lorsque $u_n \ge 0$), mais il faut le justifier.
*   ❌ **Oublier que chaque $\int u_n$ doit exister** (i.e., $u_n \in L^1$) : c'est garanti par la domination $|u_n| \le g \in L^1$.

---

## FLASHCARD 65 — Théorème 34 : Théorème de convergence monotone (Beppo-Levi)

### RECTO
**Théorème 34 — Théorème de convergence monotone (Beppo-Levi)**

**Contexte :** Soit $(f_n)_{n \in \mathbb{N}}$ une suite de fonctions mesurables positives sur $(\Omega, \mathcal{A}, \mu)$.

**Question :** Énoncer le théorème de convergence monotone avec ses hypothèses exactes et sa conclusion (sans hypothèse d'intégrabilité de la dominante).

### VERSO
**Hypothèses complètes**
*   $(f_n)_{n \in \mathbb{N}}$ suite de fonctions mesurables et positives ($f_n : \Omega \to [0, +\infty]$).
*   **Monotonie croissante :** $f_n \le f_{n+1}$ $\mu$-p.p. pour tout $n \in \mathbb{N}$.
*   **Convergence p.p. :** $f_n \xrightarrow[n \to +\infty]{} f$ p.p. (avec $f = \sup_n f_n$).

**Énoncé formel**
$$ \lim_{n \to +\infty} \int_\Omega f_n d\mu = \int_\Omega \lim_{n \to +\infty} f_n d\mu = \int_\Omega f d\mu $$

Les deux membres peuvent valoir $+\infty$ simultanément. En particulier :
$$ \int_\Omega \sup_n f_n d\mu = \sup_n \int_\Omega f_n d\mu $$

**Corollaire (Beppo-Levi pour les séries) :** Si $u_n \ge 0$ mesurables, alors :
$$ \int_\Omega \sum_{n=0}^{+\infty} u_n d\mu = \sum_{n=0}^{+\infty} \int_\Omega u_n d\mu $$
(même si les deux membres valent $+\infty$).

**Démonstration (Esquisse)**
*   **Inégalité $\le$ :** Puisque $f_n \le f$ p.p., $\int f_n \le \int f$, donc $\lim \int f_n \le \int f$.
*   **Inégalité $\ge$ (via fonctions étagées) :** Pour toute fonction étagée $\phi \le f$ et tout $\alpha \in (0, 1)$, les ensembles $A_n = \{f_n \ge \alpha \phi\}$ croissent vers $\Omega$. On montre $\int f_n \ge \alpha \int_{A_n} \phi \to \alpha \int \phi$. En faisant $\alpha \to 1$ et en prenant le sup sur $\phi$, on obtient $\lim \int f_n \ge \int f$.

### 
**Subtilités**
*   **Positivité indispensable :** Le TCM exige $f_n \ge 0$. Pour des suites non positives, on utilise TCD (avec domination intégrable).
*   **Pas besoin d'intégrabilité :** Contrairement à TCD, le TCM ne suppose pas $f \in L^1$. Si $\int f = +\infty$, le théorème dit simplement $\int f_n \to +\infty$.
*   **TCM vs TCD :** TCD est plus fort (s'applique sans monotonie) mais exige une domination intégrable. TCM est plus faible (monotonie requise) mais sans condition d'intégrabilité.

**Pièges classiques**
*   ❌ **Appliquer TCM à des fonctions non positives :** Exemple classique où ça échoue : $f_n = -1/n \cdot 1_{[0, n]}$ est croissante (vers $0$), négative. TCM ne s'applique pas directement.
*   ❌ **Confondre TCM et TCD :** TCM ne donne aucun résultat de convergence $L^1$ ; il donne seulement la permutation limite-intégrale (avec possibilité de $+\infty$).
*   ❌ **Négliger le corollaire de Beppo-Levi :** La permutation série-intégrale pour des fonctions positives est toujours licite (sans aucune hypothèse supplémentaire), ce qui est très puissant.

---

## FLASHCARD 66 — Théorème 35 : Théorème de sommation $L^1$ (Fubini-Tonelli pour les séries)

### RECTO
**Théorème 35 — Théorème de sommation $L^1$**

**Contexte :** Soit $(u_{n, k})_{n, k \in \mathbb{N}}$ un tableau de réels (ou complexes). On veut intervertir l'ordre de deux sommes $\sum_n \sum_k$ et $\sum_k \sum_n$.

**Question :** Énoncer le théorème de Fubini-Tonelli pour les séries doubles (sommation $L^1$) : sous quelle condition peut-on intervertir les deux signes $\sum$ ?

### VERSO
**Hypothèses complètes**
*   $(u_{n, k})_{n, k \in \mathbb{N}}$ famille de complexes.
*   **Condition de sommabilité absolue :**
    $$ \sum_{n=0}^{+\infty} \sum_{k=0}^{+\infty} |u_{n, k}| < +\infty \quad (\text{ou équivalemment : } \sum_k \sum_n |u_{n, k}| < +\infty) $$

**Énoncé formel**
Si $\sum_{n, k} |u_{n, k}| < +\infty$ (sommabilité absolue), alors :

$$ \sum_{n=0}^{+\infty} \sum_{k=0}^{+\infty} u_{n, k} = \sum_{k=0}^{+\infty} \sum_{n=0}^{+\infty} u_{n, k} $$

De plus, toutes les sommes partielles, itérées et doubles, convergent absolument, et la famille $(u_{n, k})_{n, k}$ est sommable.

**Version avec intégrale (Fubini-Tonelli) :** Sur $(\Omega_1 \times \Omega_2, \mu_1 \otimes \mu_2)$, si $\iint |f| d\mu_1 d\mu_2 < +\infty$, alors on peut intervertir les deux intégrales.

**Démonstration (Esquisse)**
*   **TCM (Beppo-Levi) :** On applique Beppo-Levi à $\sum_{n, k} |u_{n, k}|$ pour garantir la sommabilité absolue.
*   **TCD :** La domination $|\sum_k u_{n, k}| \le \sum_k |u_{n, k}|$ et la convergence de $\sum_n \sum_k |u_{n, k}|$ permettent d'appliquer TCD.
*   **Interversion :** On conclut que l'ordre de sommation est indifférent.

### 
**Subtilités**
*   **La condition est la sommabilité absolue, pas la convergence des séries itérées.** Il existe des exemples de séries doublement convergentes (pour lesquelles $\sum_n \sum_k u_{n, k}$ et $\sum_k \sum_n u_{n, k}$ convergent toutes deux) mais donnant des valeurs différentes, si $\sum_{n, k} |u_{n, k}| = +\infty$.
*   **Exemple classique de non-interversion :** $u_{n, k} = \begin{cases} 1 & \text{si } k=n \\ -1 & \text{si } k=n+1 \\ 0 & \text{sinon} \end{cases}$. Alors $\sum_n \sum_k u_{n, k} = 0$ mais $\sum_k \sum_n u_{n, k} = -1$ (en supposant les séries bien définies). Cela montre la nécessité de la sommabilité absolue.

**Pièges classiques**
*   ❌ **Intervertir deux $\sum$ sans vérification :** C'est la faute la plus grave et la plus fréquente. Il faut toujours vérifier $\sum_{n, k} |u_{n, k}| < +\infty$ avant d'intervertir.
*   ❌ **Confondre avec la Proposition 4 (sommation par paquets) :** La Proposition 4 traite du regroupement de termes d'une seule série. Ici, on traite d'une double série.
*   ❌ **Oublier la version Fubini pour les intégrales :** La condition d'intégrabilité de $|f|$ est l'analogue exact de la sommabilité absolue pour les séries.

---

## FLASHCARD 67 — Théorème 36 : Continuité des intégrales à paramètre

### RECTO
**Théorème 36 — Continuité des intégrales à paramètre**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$ (ou $\mathbb{C}$), où $\Omega$ est un espace mesuré et $I$ un intervalle de $\mathbb{R}$. On pose $F(t) = \int_\Omega f(x, t) d\mu(x)$.

**Question :** Énoncer le théorème de continuité de $F$ en un point $t_0 \in I$, avec les hypothèses exactes.

### VERSO
**Hypothèses complètes**
*   **(H1) Continuité en $t$ :** Pour $\mu$-presque tout $x \in \Omega$, la fonction $t \mapsto f(x, t)$ est continue en $t_0$.
*   **(H2) Intégrabilité pour chaque $t$ :** Pour tout $t \in I$, $x \mapsto f(x, t)$ est mesurable et $\int_\Omega |f(x, t)| d\mu(x) < +\infty$.
*   **(H3) Domination intégrable :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que pour tout $t$ dans un voisinage $V$ de $t_0$ dans $I$ :
    $$ |f(x, t)| \le g(x) \quad \mu\text{-p.p. en } x $$

**Énoncé formel**
Sous (H1), (H2), (H3) :

$F$ est continue en $t_0$, i.e.,
$$ \lim_{t \to t_0} \int_\Omega f(x, t) d\mu(x) = \int_\Omega f(x, t_0) d\mu(x) $$

**Cas pratique — Intégrale sur un segment $[a, b]$ :**

Si $f : [a, b] \times I \to \mathbb{R}$ est continue (condition plus forte que (H1)), alors (H3) est automatiquement satisfaite avec $g(x) = \sup_{t \in K} |f(x, t)|$ pour tout compact $K \subset I$ (par continuité, $f$ est bornée sur $[a, b] \times K$). Donc $F$ est continue sur $I$.

**Démonstration (Esquisse)**
Application directe du Théorème 32 (TCD à paramètre continu) :
Pour toute suite $t_n \to t_0$ dans $I$, $f(x, t_n) \to f(x, t_0)$ p.p. (par (H1)) et $|f(x, t_n)| \le g(x)$ p.p. (par (H3)). Donc par TCD : $F(t_n) \to F(t_0)$. D'où la continuité par caractérisation séquentielle.

### 
**Subtilités**
*   **La domination peut être locale** (sur un voisinage de $t_0$) : Pour la continuité en $t_0$, il suffit que (H3) tienne sur un voisinage de $t_0$, pas nécessairement sur tout $I$.
*   **Cas de l'intégrale impropre :** Si $\Omega = [a, +\infty[$ et l'intégrale est impropre, la domination $|f(x, t)| \le g(x)$ avec $g \in L^1([a, +\infty[)$ est la condition clé. Sans cette domination, il faut étudier soigneusement la convergence uniforme en $t$ de l'intégrale impropre.
*   **Exemple type :** $F(t) = \int_0^{+\infty} e^{-tx} \frac{\sin x}{x} dx$. Pour étudier la continuité en $t_0 > 0$, on cherche $g(x) = e^{-t_0 x/2}/|x|$ (par exemple) intégrable sur $(0, +\infty)$.

**Pièges classiques**
*   ❌ **Appliquer le théorème sans vérifier la domination :** Toujours exhiber explicitement $g$ et vérifier $g \in L^1$.
*   ❌ **Confondre continuité en $t_0$ (domination locale) et continuité sur $I$ (domination globale) :** Pour la continuité sur tout $I$, il faut une domination uniforme sur tout $I$ (ou travailler sur des compacts de $I$).
*   ❌ **Négliger la mesurabilité de $x \mapsto f(x, t)$ :** Hypothèse nécessaire mais souvent implicite (fonctions continues, etc.).

---

## FLASHCARD 68 — Théorème 37 : Régularité $C^1$ des intégrales à paramètre

### RECTO
**Théorème 37 — Régularité $C^1$ des intégrales à paramètre**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$, $F(t) = \int_\Omega f(x, t) d\mu(x)$, où $I$ est un intervalle ouvert de $\mathbb{R}$.

**Question :** Énoncer le théorème de dérivabilité de $F$ sous le signe intégrale, avec les hypothèses exactes sur $f$ et $\partial_t f$.

### VERSO
**Hypothèses complètes**
*   **(H1) Intégrabilité initiale :** Pour tout $t \in I$, $x \mapsto f(x, t) \in L^1(\Omega, \mu)$.
*   **(H2) Dérivabilité en $t$ :** Pour $\mu$-presque tout $x \in \Omega$, $t \mapsto f(x, t)$ est dérivable sur $I$, et la dérivée partielle $\frac{\partial f}{\partial t}(x, t)$ est mesurable en $x$ pour tout $t$.
*   **(H3) Domination de la dérivée :** $\exists g \in L^1(\Omega, \mu)$, $g \ge 0$, telle que :
    $$ \forall t \in I, \quad \left| \frac{\partial f}{\partial t}(x, t) \right| \le g(x) \quad \mu\text{-p.p. en } x $$

**Énoncé formel**
Sous (H1), (H2), (H3) :

$F$ est dérivable sur $I$.

**Dérivation sous le signe intégrale :**
$$ \forall t \in I, \quad F'(t) = \int_\Omega \frac{\partial f}{\partial t}(x, t) d\mu(x) $$

$F \in C^1(I)$ si de plus $t \mapsto \frac{\partial f}{\partial t}(x, t)$ est continue en tout $t \in I$ p.p. en $x$ (ce qui assure la continuité de $F'$ par le Théorème 36).

**Démonstration (Esquisse)**
*   **Taux d'accroissement :** Pour $t, t+h \in I$, $h \neq 0$ :
    $$ \frac{F(t+h) - F(t)}{h} = \int_\Omega \frac{f(x, t+h) - f(x, t)}{h} d\mu(x) $$
*   **Théorème des accroissements finis :** $\left| \frac{f(x, t+h) - f(x, t)}{h} \right| \le \sup_{s \in I} \left| \frac{\partial f}{\partial t}(x, s) \right| \le g(x)$.
*   **TCD (Théorème 31) :** Quand $h \to 0$, $\frac{f(x, t+h) - f(x, t)}{h} \to \frac{\partial f}{\partial t}(x, t)$ p.p., dominé par $g \in L^1$. Donc $\frac{F(t+h) - F(t)}{h} \to \int \frac{\partial f}{\partial t}(x, t) d\mu(x)$.

### 
**Subtilités**
*   **La domination porte sur $\partial_t f$, pas sur $f$ elle-même.** Pour la dérivabilité, c'est la dérivée partielle qui doit être dominée. Pour la continuité (Théorème 36), c'est $f$ elle-même.
*   **$F \in C^1$ si $\partial_t f$ est continue en $t$ p.p. :** On applique le Théorème 36 à $\partial_t f$ pour obtenir la continuité de $F' = \int \partial_t f$.
*   **Itération :** En itérant (Théorème 38), si $\partial_t^k f$ est dominée pour tout $k \le n$, alors $F \in C^n(I)$ et $F^{(k)}(t) = \int \partial_t^k f(x, t) d\mu$.
*   **Cas de l'intégrale sur un segment $[a, b]$ :** Si $f \in C^1([a, b] \times I)$, alors $\partial_t f$ est continue sur le compact $[a, b] \times [t_0 - \varepsilon, t_0 + \varepsilon]$, donc bornée, donc la domination (H3) est automatique. $F \in C^1(I)$.

**Pièges classiques**
*   ❌ **Oublier de vérifier la domination de $\partial_t f$ (et non de $f$) :** L'erreur la plus fréquente. On vérifie la domination de la mauvaise fonction.
*   ❌ **Confondre dérivabilité et $C^1$ :** La dérivabilité de $F$ est donnée par (H1)+(H2)+(H3). La classe $C^1$ nécessite en plus la continuité de $F'$, qui demande une hypothèse supplémentaire sur la continuité de $\partial_t f$ en $t$.
*   ❌ **Oublier l'hypothèse (H1) :** $F(t)$ doit exister (i.e., $f(\cdot, t) \in L^1$) pour que la dérivée ait un sens.
*   ❌ **TAF dans la démonstration :** On utilise le TAF (accroissements finis) pour majorer le taux d'accroissement par la dérivée. Ne pas utiliser TCD directement sur le taux d'accroissement sans cette majoration.

---

## FLASHCARD 69 — Théorème 38 : Régularité $C^k$ des intégrales à paramètre

### RECTO
**Théorème 38 — Régularité $C^k$ des intégrales à paramètre**

**Contexte :** Soit $f : \Omega \times I \to \mathbb{R}$, $F(t) = \int_\Omega f(x, t) d\mu(x)$, $I$ intervalle ouvert.

**Question :** Énoncer le théorème de régularité $C^k$ de $F$, en précisant les hypothèses sur les dérivées partielles d'ordre $\le k$.

### VERSO
**Hypothèses complètes**
Pour un entier $k \ge 1$ :

*   **(H1)** Pour tout $t \in I$ et tout $j \in \{0, 1, \dots, k\}$, $x \mapsto \frac{\partial^j f}{\partial t^j}(x, t)$ est mesurable et intégrable.
*   **(H2)** Pour $\mu$-p.p. $x$, $t \mapsto f(x, t)$ est de classe $C^k$ sur $I$.
*   **(H3) Domination :** $\forall j \in \{0, 1, \dots, k\}$, $\exists g_j \in L^1(\Omega, \mu)$, $g_j \ge 0$, telle que :
    $$ \forall t \in I, \quad \left| \frac{\partial^j f}{\partial t^j}(x, t) \right| \le g_j(x) \quad \mu\text{-p.p.} $$
    (En pratique, on n'a besoin de dominer que la dérivée d'ordre $k$ : si $\partial_t^k f$ est dominée et continue en $t$ p.p., on peut se ramener par itération.)

**Énoncé formel**
Sous (H1), (H2), (H3) :

$$ F \in C^k(I) \quad \text{et} \quad \forall j \in \{1, \dots, k\}, \quad F^{(j)}(t) = \int_\Omega \frac{\partial^j f}{\partial t^j}(x, t) d\mu(x) $$

**Démonstration (Esquisse)**
Par récurrence sur $k$ en appliquant le Théorème 37 à chaque étape : on montre que $F' = \int \partial_t f$, puis que $F'' = (F')' = \int \partial_t^2 f$, etc.

### 
**Subtilités**
*   En pratique, on vérifie les hypothèses au rang $k$ seulement, et on prouve par récurrence que $F \in C^k$.
*   **Le cas $k=+\infty$ :** Si pour tout $j \in \mathbb{N}$, $\partial_t^j f$ est dominée par une fonction intégrable (uniforme en $t$), alors $F \in C^\infty(I)$. C'est le cas typique pour les fonctions de Laplace, Fourier, Gamma, etc.
*   **Exemple fondamental — Fonction Gamma :** $\Gamma(s) = \int_0^{+\infty} x^{s-1} e^{-x} dx$ est de classe $C^\infty$ sur $(0, +\infty)$, car $\partial_s^k (x^{s-1} e^{-x}) = (\ln x)^k x^{s-1} e^{-x}$, qui est intégrable sur $(0, +\infty)$ pour $s > 0$ (domination par $x^{s_0/2-1} e^{-x/2}$ sur un voisinage compact de $s_0$).

**Pièges classiques**
*   ❌ **Négliger la vérification pour chaque ordre de dérivation :** Il faut vérifier la domination pour toutes les dérivées d'ordre $0$ à $k$, pas seulement pour la dérivée d'ordre $k$.
*   ❌ **Oublier que le domaine de définition de $F$ peut changer :** Si $f(x, t)$ n'est intégrable que pour $t \in (a, b)$, alors $F$ n'est définie (et $C^k$) que sur $(a, b)$.
*   ❌ **Confondre $C^k$ en $t$ de $f$ et $C^k$ de $F$ :** Ce sont deux choses différentes. La régularité de $F$ est une conséquence de la régularité de $f$ en $t$ combinée à la domination, mais elle n'est pas évidente a priori.

---

# CHAPITRE 8 — Topologie

## FLASHCARD 70 — Proposition 14 : Caractérisation des ouverts et fermés (topologie des espaces métriques)

### RECTO
**Proposition 14 — Caractérisation des ouverts et fermés dans un espace métrique**

**Contexte :** Soit $(E, d)$ un espace métrique. Soit $A \subset E$.

**Question :** Donner les caractérisations équivalentes des ouverts et des fermés (en termes de boules, d'intérieur, d'adhérence, de complémentaire, et de suites).

### VERSO
**Énoncé formel**

**Caractérisation des ouverts :**
$A$ est ouvert si et seulement si l'une des conditions équivalentes suivantes est satisfaite :
*   $\forall x \in A, \exists r > 0, B(x, r) \subset A$ (toute boule ouverte centrée en $x$ est incluse dans $A$).
*   $A = \mathring{A}$ (l'intérieur de $A$ est $A$ lui-même).
*   $E \setminus A$ est fermé.

**Caractérisation des fermés :**
$F$ est fermé si et seulement si :
*   $E \setminus F$ est ouvert.
*   $F = \bar{F}$ (l'adhérence de $F$ est $F$ lui-même).
*   **Caractérisation séquentielle :** Toute suite $(x_n)$ d'éléments de $F$ qui converge dans $E$ a sa limite dans $F$ :
    $$ [(x_n) \subset F \text{ et } x_n \to \ell \in E] \implies \ell \in F $$

**Rappels :**
*   $\mathring{A} = \{x \in A : \exists r > 0, B(x, r) \subset A\}$ (intérieur).
*   $\bar{A} = \{x \in E : \forall r > 0, B(x, r) \cap A \neq \emptyset\}$ (adhérence).
*   $\partial A = \bar{A} \setminus \mathring{A}$ (frontière).

### 
**Subtilités**
*   La caractérisation séquentielle des fermés est valable dans les espaces métriques (et plus généralement dans les espaces à base dénombrable de voisinages). Dans un espace topologique général (non métrique), il faut utiliser les filtres ou les nets.
*   $\emptyset$ et $E$ sont à la fois ouverts et fermés (clopen). Dans $\mathbb{R}$, ce sont les seuls, mais dans un espace non connexe, il peut y en avoir d'autres.
*   L'intérieur est le plus grand ouvert inclus dans $A$ ; l'adhérence est le plus petit fermé contenant $A$.

**Pièges classiques**
*   ❌ **"Ni ouvert ni fermé" vs "ouvert et fermé" :** $[a, b)$ dans $\mathbb{R}$ est ni ouvert ni fermé. Ne pas confondre les deux situations.
*   ❌ **En dimension infinie**, les boules fermées ne sont pas compactes (Riesz) — mais elles restent fermées au sens topologique.
*   ❌ **Caractérisation séquentielle :** Elle s'applique aux espaces métriques mais pas aux espaces topologiques généraux. En concours, toujours préciser qu'on est dans un espace métrique.

---

## FLASHCARD 71 — Proposition 15 : Propriétés des ouverts et fermés (stabilité)

### RECTO
**Proposition 15 — Stabilité par opérations des ouverts et fermés**

**Contexte :** $(E, d)$ espace métrique. $(U_i)_{i \in I}$ famille d'ouverts, $(F_j)_{j \in J}$ famille de fermés.

**Question :** Énoncer les règles de stabilité des ouverts et fermés par unions et intersections (finie, dénombrable, quelconque), en précisant les cas où la stabilité est perdue.

### VERSO
**Énoncé formel**

**Pour les ouverts :**
*   **Union quelconque d'ouverts est ouverte :**
    $$ \bigcup_{i \in I} U_i \text{ est ouvert} $$
    (sans restriction sur la cardinalité de $I$).
*   **Intersection finie d'ouverts est ouverte :**
    $$ U_1 \cap U_2 \cap \dots \cap U_n \text{ est ouvert} $$
*   **Intersection infinie d'ouverts peut ne pas être ouverte :**
    $\bigcap_{n=1}^{+\infty} (-1/n, 1/n) = \{0\}$, qui est fermé.

**Pour les fermés :**
*   **Intersection quelconque de fermés est fermée :**
    $$ \bigcap_{j \in J} F_j \text{ est fermé} $$
*   **Union finie de fermés est fermée :**
    $$ F_1 \cup F_2 \cup \dots \cup F_n \text{ est fermé} $$
*   **Union infinie de fermés peut ne pas être fermée :**
    $\bigcup_{n=1}^{+\infty} [1/n, 1] = (0, 1]$, qui n'est pas fermé dans $\mathbb{R}$.

### 
**Subtilités**
*   La règle mnémotechnique : "Union quelconque d'ouverts, intersection finie d'ouverts. Intersection quelconque de fermés, union finie de fermés."
*   Les contre-exemples sont fondamentaux : $\bigcap_{n \ge 1} (-1/n, 1/n) = \{0\}$ (intersection infinie d'ouverts = fermé) et $\bigcup_{n \ge 1} [1/n, 1] = (0, 1]$ (union infinie de fermés = ni ouvert ni fermé).

**Pièges classiques**
*   ❌ Croire que l'intersection dénombrable d'ouverts est ouverte : Faux. C'est une confusion très fréquente.
*   ❌ Croire que l'union dénombrable de fermés est fermée : Faux. (Cf. contre-exemple.)
*   ❌ Confondre les règles pour ouverts et fermés : Elles sont "duales" (complémentaire d'un ouvert = fermé), donc les règles se correspondent par passage au complémentaire.

---

## FLASHCARD 72 — Proposition 16 : Caractérisation séquentielle (continuité, limite, adhérence)

### RECTO
**Proposition 16 — Caractérisation séquentielle dans les espaces métriques**

**Contexte :** $(E, d_E)$ et $(F, d_F)$ deux espaces métriques, $f : E \to F$, $A \subset E$, $a \in E$.

**Question :** Énoncer les caractérisations séquentielles de : (1) l'adhérence d'une partie, (2) la continuité d'une fonction en un point, (3) la limite d'une fonction.

### VERSO
**Énoncé formel**

1.  **Caractérisation séquentielle de l'adhérence :**
    $$ x \in \bar{A} \iff \exists (a_n)_{n \in \mathbb{N}} \subset A, \quad a_n \xrightarrow[n \to +\infty]{} x $$

2.  **Caractérisation séquentielle de la continuité en $a$ :**
    $$ f \text{ est continue en } a \iff \forall (x_n) \subset E, \quad x_n \to a \implies f(x_n) \to f(a) $$

3.  **Caractérisation séquentielle de la limite :**
    $$ \lim_{x \to a} f(x) = \ell \iff \forall (x_n) \subset E \setminus \{a\}, \quad x_n \to a \implies f(x_n) \to \ell $$
    (La condition $x_n \neq a$ est essentielle dans la définition de la limite, mais pas dans celle de la continuité si $f(a) = \ell$.)

### 
**Subtilités**
*   Ces caractérisations sont propres aux espaces métriques (et plus généralement aux espaces à base dénombrable de voisinages, i.e., les espaces "à topologie séquentielle"). Dans un espace topologique général, elles peuvent être fausses.
*   **Utilisation clé :** Ces caractérisations permettent de ramener des propriétés topologiques à des propriétés de suites, ce qui est souvent plus maniable en analyse.
*   **Continuité séquentielle $\neq$ continuité en général :** Dans un espace non métrique, la continuité séquentielle (image de toute suite convergente est convergente) n'implique pas la continuité. Dans un espace métrique, les deux sont équivalentes.

**Pièges classiques**
*   ❌ **Oublier $x_n \neq a$ dans la limite :** La limite de $f$ en $a$ ne suppose pas que $f$ est définie en $a$ ni que $f(a) = \ell$.
*   ❌ **Confondre limite et continuité :** $f$ est continue en $a$ si $f(a)$ est définie et $\lim_{x \to a} f(x) = f(a)$.
*   ❌ **Appliquer la caractérisation séquentielle hors du cadre métrique :** En topologie générale, la caractérisation séquentielle peut être mise en défaut.

---

## FLASHCARD 73 — Proposition 17 : Équivalence des normes en dimension finie

### RECTO
**Proposition 17 — Équivalence des normes en dimension finie**

**Contexte :** Soit $E$ un espace vectoriel sur $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$, de dimension finie $n \ge 1$, muni de deux normes $\|\cdot\|_a$ et $\|\cdot\|_b$.

**Question :** Énoncer la proposition d'équivalence des normes en dimension finie, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$
*   $E$ est un $\mathbb{K}$-espace vectoriel de dimension finie $n \in \mathbb{N}^*$
*   $\|\cdot\|_a$ et $\|\cdot\|_b$ sont deux normes quelconques sur $E$

**Énoncé formel**
$$ \exists \alpha, \beta \in \mathbb{R}_{>0}, \forall x \in E, \quad \alpha \|x\|_a \le \|x\|_b \le \beta \|x\|_a $$

Autrement dit, toutes les normes sur un espace vectoriel de dimension finie sont équivalentes : elles définissent la même topologie (mêmes ouverts, mêmes suites convergentes, mêmes suites de Cauchy).

**Démonstration (Esquisse)**
1.  **Réduction à la norme canonique.** Il suffit de montrer que toute norme $\|\cdot\|$ sur $E$ est équivalente à la norme $\|\cdot\|_1$ (ou $\|\cdot\|_\infty$) associée à une base fixée $(e_1, \dots, e_n)$. L'équivalence est alors une relation d'équivalence, ce qui conclut par transitivité.
2.  **Majoration (continuité).** Si $x = \sum_{i=1}^n x_i e_i$, par l'inégalité triangulaire et l'homogénéité :
    $$ \|x\| \le \sum_{i=1}^n |x_i| \|e_i\| \le (\max_i \|e_i\|) \cdot \|x\|_1 $$
    ce qui donne $\|x\| \le \beta \|x\|_1$ avec $\beta = \sum_{i=1}^n \|e_i\|$. Cela établit la continuité de $\|\cdot\|$ pour la topologie de $\|\cdot\|_1$.
3.  **Minoration (compacité).** La sphère unité $S = \{x \in E : \|x\|_1 = 1\}$ est compacte pour $\|\cdot\|_1$ (fermée et bornée en dimension finie, par Bolzano-Weierstrass). La fonction $x \mapsto \|x\|$ est continue (d'après l'étape 2) et strictement positive sur $S$ (car $\|x\|=0 \implies x=0 \notin S$). Par le théorème des bornes atteintes sur un compact, elle atteint son minimum $\alpha > 0$ sur $S$ :
    $$ \forall x \in S, \|x\| \ge \alpha > 0 $$
    Par homogénéité, $\forall x \in E, \|x\| \ge \alpha \|x\|_1$.

### 
**Subtilités**
*   **La dimension finie est absolument indispensable.** En dimension infinie, deux normes peuvent être non équivalentes, même sur le même espace : sur $C([0, 1], \mathbb{R})$, les normes $\|\cdot\|_\infty$ et $\|\cdot\|_1 = \int_0^1 |f|$ ne sont pas équivalentes (on peut construire des suites convergeant pour $\|\cdot\|_1$ mais pas pour $\|\cdot\|_\infty$).
*   L'argument de compacité de la sphère unité est le cœur de la preuve. Cette compacité repose elle-même sur le théorème de Bolzano-Weierstrass (ou sur le fait que $(\mathbb{K}^n, \|\cdot\|_\infty)$ est complet et que la boule fermée est compacte).
*   **Conséquences topologiques exactes :** deux normes équivalentes définissent :
    *   les mêmes ouverts et fermés,
    *   les mêmes suites convergentes (avec la même limite),
    *   les mêmes suites de Cauchy,
    *   les mêmes ensembles bornés,
    *   les mêmes parties compactes.
*   **Attention à la constante :** $\alpha$ et $\beta$ dépendent en général de $n$ et de la base choisie. Lorsque $n \to \infty$, les constantes peuvent dégénérer, ce qui explique l'échec en dimension infinie.

**Extensions**
*   **En dimension infinie :** faux en général. Le théorème de Riesz (À connaître 18) montre que la boule unité fermée d'un evn de dimension infinie n'est jamais compacte, ce qui bloque précisément l'argument de minoration.
*   **Corollaire fondamental :** Tout sous-espace vectoriel de dimension finie d'un evn est fermé (car il est complet pour la norme induite, et une suite convergente dans l'evn ambiant qui est dans le sous-espace converge dans le sous-espace).
*   **Corollaire :** En dimension finie, toute application linéaire est continue (quel que soit le choix de normes sur l'espace de départ et d'arrivée, pourvu qu'ils soient de dimension finie).

**Pièges classiques**
*   ⚠️ **Oublier que $\alpha > 0$ grâce à la compacité.** Sans la compacité, on ne peut pas garantir que le minimum sur la sphère est atteint (et a fortiori qu'il est $> 0$). Ne pas écrire $\inf_S \|x\| > 0$ sans justifier que cet inf est un min atteint.
*   ⚠️ Confondre équivalence de normes et égalité. Deux normes équivalentes ne sont pas nécessairement proportionnelles.
*   ⚠️ Croire que le résultat s'applique à un evn quelconque parce que l'espace « ressemble » à $\mathbb{R}^n$. La dimension finie doit être vérifiée explicitement.
*   ⚠️ Omettre la transitivité dans la démonstration : on montre l'équivalence avec $\|\cdot\|_1$, et on conclut pour deux normes quelconques par transitivité. Ne pas oublier de le mentionner explicitement en copie.

---

## FLASHCARD 74 — ### RECTO
**Proposition 18 — Caractérisation des parties compactes en dimension finie (Heine-Borel-Lebesgue)**

**Contexte :** Soit $(E, \|\cdot\|)$ un espace vectoriel normé sur $\mathbb{K}$, de dimension finie $n \ge 1$.

**Question :** Énoncer la caractérisation des parties compactes en dimension finie, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$
*   $E$ est un $\mathbb{K}$-evn de dimension finie $n \in \mathbb{N}^*$
*   $A \subseteq E$ une partie quelconque

**Énoncé formel**
$$ A \text{ est compacte} \iff A \text{ est fermée et bornée} $$

Plus précisément :
*   **$A$ est bornée :** $\exists M > 0, \forall x \in A, \|x\| \le M$
*   **$A$ est fermée :** $A$ est fermée dans $(E, \|\cdot\|)$
*   **$A$ est compacte :** de toute suite $(x_n)_{n \ge 0}$ à valeurs dans $A$, on peut extraire une sous-suite convergente dans $A$ (compacité séquentielle)

**Démonstration (Esquisse)**
*   $(\Rightarrow)$ Compact $\implies$ fermé et borné. Tout compact est fermé (dans un espace métrique séparé) et borné (recouvert par des boules finies).
*   $(\Leftarrow)$ Fermé et borné $\implies$ compact.
    *   Par équivalence des normes (Proposition 17), on se ramène à $(\mathbb{K}^n, \|\cdot\|_\infty)$.
    *   $A$ bornée : $\exists M > 0, A \subseteq [-M, M]^n$ (en considérant les coordonnées dans une base).
    *   On applique le théorème de Bolzano-Weierstrass par un procédé diagonal : toute suite de $[-M, M]^n$ admet une sous-suite convergente dans $[-M, M]^n$.
    *   Comme $A$ est fermée, la limite est dans $A$.

### 
**Subtilités**
*   **Ce résultat est faux en dimension infinie.** La boule unité fermée $\bar{B}(0, 1)$ d'un evn de dimension infinie n'est jamais compacte (théorème de Riesz, À connaître 18). Exemple : dans $\ell^2(\mathbb{N})$, la suite $(e_n)$ des vecteurs de base est dans $\bar{B}(0, 1)$ mais n'admet aucune sous-suite convergente (car $\|e_n - e_m\|_2 = \sqrt{2}$ pour $n \neq m$).
*   **Équivalence des normes est cruciale :** la propriété « fermée et bornée » dépend a priori de la norme choisie, mais comme toutes les normes sont équivalentes en dimension finie, cette notion ne dépend que de la structure vectorielle de dimension finie.
*   **Compacité séquentielle = compacité** dans les espaces métriques. Ne pas confondre avec la compacité par recouvrements ouverts (ces deux notions coïncident dans les espaces métriques).

**Extensions**
*   En dimension infinie, les parties compactes sont fermées et bornées mais la réciproque est strictement fausse.
*   Dans $\mathbb{R}^n$ muni de $\|\cdot\|_2$ (ou toute norme équivalente), on retrouve le théorème de Heine-Borel classique.

**Pièges classiques**
*   ⚠️ **Appliquer ce théorème en dimension infinie :** erreur rédhibitoire. Toujours vérifier que l'espace est bien de dimension finie.
*   ⚠️ **Oublier la fermeture :** un ensemble borné non fermé n'est pas compact ($]0, 1[$ dans $\mathbb{R}$ est borné mais non compact).
*   ⚠️ **Confondre « borné » et « compact » dans un raisonnement :** une suite bornée en dimension finie admet une sous-suite convergente (Bolzano-Weierstrass), mais la limite n'appartient à l'ensemble que si celui-ci est fermé.

---

## FLASHCARD 75 — Théorème 39 : Compacité (théorème des bornes atteintes et de Heine)

### RECTO
**Théorème 39 — Compacité : théorème des bornes atteintes et théorème de Heine**

**Contexte :** Soit $(E, d_E)$ et $(F, d_F)$ deux espaces métriques, $K \subseteq E$ un compact non vide, et $f : K \to F$ une application continue.

**Question :** Énoncer les deux grandes conséquences de la compacité pour les fonctions continues (bornes atteintes, continuité uniforme), avec les hypothèses exactes et les conclusions.

### VERSO
**Hypothèses complètes**
*   $(E, d_E)$ espace métrique, $K \subseteq E$ compact non vide
*   $(F, d_F)$ espace métrique
*   $f : K \to F$ continue sur $K$

**Énoncé formel**
1.  **L'image d'un compact est compacte :**
    $$ f(K) \text{ est un compact de } F $$

2.  **Théorème des bornes atteintes (cas $F = \mathbb{R}$) :**
    Si $f : K \to \mathbb{R}$ est continue, alors :
    $$ \exists x_{\min} \in K, \exists x_{\max} \in K, \quad f(x_{\min}) = \min_{x \in K} f(x) \text{ et } f(x_{\max}) = \max_{x \in K} f(x) $$
    En particulier, $f$ est bornée sur $K$ et atteint ses bornes.

3.  **Théorème de Heine (continuité uniforme) :**
    $$ f \text{ est uniformément continue sur } K $$
    c'est-à-dire :
    $$ \forall \varepsilon > 0, \exists \delta > 0, \forall x, y \in K, \quad d_E(x, y) < \delta \implies d_F(f(x), f(y)) < \varepsilon $$

**Démonstration (Esquisse)**
*   **Pour 1 :** Soit $(y_n)$ une suite dans $f(K)$ ; écrire $y_n = f(x_n)$ avec $x_n \in K$. Par compacité de $K$, extraire $(x_{\varphi(n)})$ convergeant vers $\ell \in K$. Par continuité, $y_{\varphi(n)} = f(x_{\varphi(n)}) \to f(\ell) \in f(K)$.
*   **Pour 2 :** $f(K)$ est un compact de $\mathbb{R}$, donc fermé et borné, donc il admet un min et un max (atteints car $f(K)$ est fermé).
*   **Pour 3 (Heine) :** Par l'absurde. Si $f$ n'est pas uniformément continue :
    $\exists \varepsilon_0 > 0, \forall n \in \mathbb{N}^*, \exists x_n, y_n \in K, d_E(x_n, y_n) < 1/n \text{ et } d_F(f(x_n), f(y_n)) \ge \varepsilon_0$.
    Par compacité, extraire $x_{\varphi(n)} \to \ell \in K$. Alors $y_{\varphi(n)} \to \ell$ aussi. Par continuité : $d_F(f(x_{\varphi(n)}), f(y_{\varphi(n)})) \to 0$, contradiction.

### 
**Subtilités**
*   $K$ doit être **compact**, pas seulement fermé ou borné. En dimension infinie, fermé et borné ne suffit pas. Le théorème de Heine requiert explicitement la compacité.
*   Le théorème des bornes atteintes nécessite $F = \mathbb{R}$ (ou $\mathbb{R} \cup \{-\infty, +\infty\}$) et $f$ continue. La borne supérieure d'une fonction continue sur un compact est un **maximum** (pas seulement un sup).
*   **Heine :** $\delta$ ne dépend pas de $x, y$. C'est la différence fondamentale entre continuité simple et uniforme. Sur $]0, 1[$, $x \mapsto 1/x$ est continue mais pas uniformément continue.
*   Heine nécessite la compacité et pas seulement la continuité uniforme locale. Une fonction continue sur $\mathbb{R}$ n'est pas nécessairement uniformément continue (ex : $x \mapsto x^2$).

**Extensions**
*   **Théorème de Heine en dimension finie :** Si $f : A \subseteq \mathbb{R}^n \to \mathbb{R}^m$ est continue sur $A$ fermé borné (compact), alors $f$ est uniformément continue.
*   **En dimension infinie :** Le même énoncé reste valable à condition que $K$ soit compact (au sens séquentiel/topologique). Mais les compacts sont plus rares.
*   **Fonctions à valeurs vectorielles :** Le théorème des bornes atteintes ne s'applique directement qu'à $F = \mathbb{R}$. Pour $F=E$ evn, on peut dire que $x \mapsto \|f(x)\|$ atteint son maximum.

**Pièges classiques**
*   ⚠️ Utiliser le théorème des bornes atteintes sur un intervalle ouvert $]a, b[$, qui n'est pas compact : grave erreur. Vérifier que le domaine est bien fermé et borné (en dimension finie) ou compact.
*   ⚠️ Confondre « $f$ atteint sa borne sup » et « $\sup f < +\infty$ » : sur un compact, les deux sont vrais et liés, mais ce n'est pas immédiat sur un ensemble non compact.
*   ⚠️ Oublier que $f(K)$ est fermé (et pas seulement borné) : ce point est utilisé pour affirmer que le sup est atteint.
*   ⚠️ Invoquer Heine pour justifier qu'une intégrale à paramètre est continue sans avoir vérifié la compacité du domaine d'intégration.

---

## FLASHCARD 76 — À connaître 17 : Caractérisation séquentielle de la compacité et exemples

### RECTO
**À connaître 17 — Caractérisation séquentielle de la compacité dans un espace métrique**

**Contexte :** Soit $(E, d)$ un espace métrique et $K \subseteq E$.

**Question :** Donner la caractérisation séquentielle de la compacité dans un espace métrique, et lister les exemples fondamentaux de compacts à connaître en MP*.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique
*   $K \subseteq E$ une partie

**Énoncé formel**
Dans un espace métrique, les trois propriétés suivantes sont équivalentes :

(i) **$K$ est compact** (tout recouvrement ouvert de $K$ admet un sous-recouvrement fini)

(ii) **$K$ est séquentiellement compact :**
$$ \forall (x_n)_{n \ge 0} \in K^{\mathbb{N}}, \exists \varphi : \mathbb{N} \to \mathbb{N} \text{ strictement croissante}, x_{\varphi(n)} \xrightarrow[n \to +\infty]{} \ell \in K $$

(iii) **$K$ est précompact et complet :**
*   **Précompact :** $\forall \varepsilon > 0$, $K$ peut être recouvert par un nombre fini de boules ouvertes de rayon $\varepsilon$
*   **Complet :** toute suite de Cauchy dans $K$ converge dans $K$

**Exemples fondamentaux de compacts**
*   **$\mathbb{R}^n$ (ou $\mathbb{C}^n$) :** Fermés bornés
*   **$C([a, b], \mathbb{R})$ :** Caractérisés par Arzelà-Ascoli (équicontinuité + bornement uniforme)
*   **Tout evn de dimension finie :** Fermés bornés
*   **$\mathbb{K}^{\mathbb{N}}$ :** Produits de compacts (Tychonov)

**Démonstration (Esquisse)**
L'équivalence (i) $\iff$ (ii) dans les espaces métriques :
*   (i) $\Rightarrow$ (ii) : si $(x_n)$ n'a pas de valeur d'adhérence dans $K$, chaque $x \in K$ a un voisinage contenant au plus finiment des $x_n$, formant un recouvrement ouvert sans sous-recouvrement fini.
*   (ii) $\Rightarrow$ (i) : par l'absurde, un recouvrement sans sous-recouvrement fini permet de construire une suite sans valeur d'adhérence.

### 
**Subtilités**
*   Dans un espace métrique, compacité et compacité séquentielle sont équivalentes. Ce n'est plus vrai dans un espace topologique général.
*   La complétude seule ne suffit pas pour la compacité (exemple : $\mathbb{R}$ est complet mais non compact).
*   La précompacité seule ne suffit pas : $]0, 1[$ est précompact (dans $\mathbb{R}$) mais non compact (non complet).

**Extensions**
*   **Théorème d'Arzelà-Ascoli :** donne une caractérisation des compacts de $(C([a, b], \mathbb{R}), \|\cdot\|_\infty)$ (équicontinuité uniforme + bornement uniforme). Indispensable en analyse fonctionnelle.
*   **Théorème de Tychonov :** un produit quelconque de compacts est compact (pour la topologie produit). En dimension finie, cela donne que $[a_1, b_1] \times \dots \times [a_n, b_n]$ est compact dans $\mathbb{R}^n$.

**Pièges classiques**
*   ⚠️ **Oublier que la limite de la sous-suite doit être dans $K$ :** la compacité séquentielle exige $\ell \in K$, pas seulement $\ell \in E$.
*   ⚠️ Confondre précompact et compact dans un espace de dimension infinie.
*   ⚠️ Croire qu'un fermé dans un compact est compact : c'est vrai ! (un fermé d'un compact est compact), mais un fermé dans un espace non compact peut très bien ne pas être compact.

---

## FLASHCARD 77 — Proposition 20 : Continuité et compacité, applications

### RECTO
**Proposition 20 — Image d'un compact par une application continue ; homéomorphisme sur un compact**

**Contexte :** Soit $(E, d_E)$ et $(F, d_F)$ deux espaces métriques, $K \subseteq E$ un compact non vide, $f : K \to F$ continue et bijective.

**Question :** Énoncer la proposition sur l'image d'un compact par une application continue et la proposition sur les homéomorphismes définis sur un compact.

### VERSO
**Hypothèses complètes**
*   $(E, d_E)$, $(F, d_F)$ espaces métriques
*   $K \subseteq E$ compact non vide
*   $f : K \to F$ continue

**Énoncé formel**
**Proposition A :** L'image d'un compact par une application continue est compacte :
$$ f \text{ continue}, K \text{ compact} \implies f(K) \text{ compact} $$

**Proposition B (Homéomorphisme sur un compact) :**
Si de plus $f : K \to f(K)$ est bijective, alors :
$$ f^{-1} : f(K) \to K \text{ est continue} $$
autrement dit, $f$ est un homéomorphisme de $K$ sur $f(K)$.

**Démonstration (Esquisse)**
*   **Prop. A :** Déjà esquissée (Théorème 39, flashcard 75).
*   **Prop. B :** Soit $(y_n)$ une suite dans $f(K)$ convergeant vers $y \in f(K)$. Écrire $y_n = f(x_n)$ et $y = f(x)$ avec $x_n, x \in K$. Supposons par l'absurde que $f^{-1}(y_n) = x_n \not\to x$. Alors il existe $\varepsilon_0 > 0$ et une sous-suite $(x_{\varphi(n)})$ avec $d_E(x_{\varphi(n)}, x) \ge \varepsilon_0$. Par compacité de $K$, extraire $(x_{\varphi \circ \psi(n)})$ convergeant vers $\ell \in K$. Par continuité de $f$ : $f(x_{\varphi \circ \psi(n)}) \to f(\ell) = y$. Comme $f$ est injective, $\ell = x$, contradiction avec $d_E(x_{\varphi(n)}, x) \ge \varepsilon_0$.

### 
**Subtilités**
*   **La compacité est essentielle pour Prop. B.** Sans elle, une bijection continue peut ne pas être un homéomorphisme. Exemple classique : $\theta \mapsto e^{i\theta}$ de $[0, 2\pi[$ sur $\mathbb{U}$ est continue et bijective, mais son inverse n'est pas continue (en $1 = e^{i \cdot 0}$). Ici $[0, 2\pi[$ n'est pas compact.
*   **Prop. B :** pas de structure supplémentaire requise sur $F$. On n'a pas besoin de $F$ de dimension finie, juste que $f(K)$ soit compact (ce qui découle de Prop. A).

**Extensions**
*   **En dimension finie :** toute bijection linéaire continue entre evn de même dimension finie est un homéomorphisme linéaire (son inverse est automatiquement continue, car toute application linéaire en dimension finie est continue).
*   **Application en pratique :** pour montrer qu'une bijection continue $f : K \to L$ entre deux compacts est un homéomorphisme, il suffit de vérifier la continuité de $f$ (pas de $f^{-1}$ séparément).

**Pièges classiques**
*   ⚠️ Appliquer Prop. B sans vérifier la bijectivité ou sans vérifier que le domaine est compact.
*   ⚠️ Confondre homéomorphisme et isométrie : un homéomorphisme préserve la topologie mais pas nécessairement les distances.
*   ⚠️ Croire que la continuité de $f^{-1}$ est automatique sans compacité : contre-exemple ci-dessus à connaître par cœur.

---

## FLASHCARD 78 — À connaître 18 : Théorème de Riesz (non-compacité de la boule en dimension infinie)

### RECTO
**À connaître 18 — Théorème de Riesz : la boule unité fermée d'un evn est compacte si et seulement si l'espace est de dimension finie**

**Contexte :** Soit $(E, \|\cdot\|)$ un espace vectoriel normé sur $\mathbb{K}$.

**Question :** Énoncer le théorème de Riesz sur la compacité de la boule unité fermée, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $(E, \|\cdot\|)$ un $\mathbb{K}$-espace vectoriel normé ($\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$), de dimension quelconque (finie ou infinie)
*   $\bar{B}(0, 1) = \{x \in E : \|x\| \le 1\}$ la boule unité fermée

**Énoncé formel**
$$ \bar{B}(0, 1) \text{ est compacte dans } E \iff \dim E < +\infty $$

**Lemme de Riesz (utilisé pour la direction $\Leftarrow$ en dimension infinie) :**
$$ \forall F \subsetneq E \text{ sous-espace fermé strict de } E, \forall \varepsilon \in ]0, 1[, \exists x_\varepsilon \in E, \|x_\varepsilon\| = 1 \text{ et } d(x_\varepsilon, F) \ge 1 - \varepsilon $$

**Démonstration (Esquisse)**
*   $(\Rightarrow)$ dim finie $\implies$ boule compacte : Heine-Borel en dimension finie (fermé et borné $\implies$ compact).
*   $(\Leftarrow)$ dim infinie $\implies$ boule non compacte : On construit inductivement une suite $(x_n)_{n \ge 1}$ dans $\bar{B}(0, 1)$ telle que $\|x_n - x_m\| \ge 1/2$ pour tout $n \neq m$.
    *   Prendre $x_1 \in \bar{B}(0, 1)$ quelconque, $\|x_1\| = 1$.
    *   Supposant $x_1, \dots, x_n$ construits, poser $F_n = \text{Vect}(x_1, \dots, x_n)$ (fermé car dimension finie). Par lemme de Riesz avec $\varepsilon = 1/2$, $\exists x_{n+1}$ avec $\|x_{n+1}\| = 1$ et $d(x_{n+1}, F_n) \ge 1/2$.
    *   Ainsi $\|x_{n+1} - x_k\| \ge 1/2$ pour tout $k \le n$.
    *   La suite $(x_n)$ est dans $\bar{B}(0, 1)$ mais n'admet aucune sous-suite de Cauchy, donc aucune sous-suite convergente.

### 
**Subtilités**
*   Le lemme de Riesz n'atteint pas $\varepsilon = 0$ en général. En dimension finie, on peut atteindre exactement la distance (car le minimum est atteint sur le compact $F \cap \bar{B}$), mais en dimension infinie, seule l'approximation à $1-\varepsilon$ est garantie.
*   **Exception remarquable :** Dans un espace de Hilbert (evn complet à produit scalaire), si $F$ est un sous-espace fermé, la projection orthogonale réalise exactement la distance, mais cela ne contredit pas Riesz (la boule reste non compacte en dimension infinie).
*   **Conséquence fondamentale :** En dimension infinie, les boules fermées ne sont pas compactes. Cela implique qu'on ne peut pas directement utiliser les théorèmes de type « suite bornée $\implies$ sous-suite convergente » (Bolzano-Weierstrass), sauf dans des cadres fonctionnels spécifiques (compacité faible, Arzelà-Ascoli, etc.).

**Extensions**
*   En dimension infinie, il existe des notions de compacité plus faibles : compacité faible (topologie faible $\sigma(E, E')$), compacité relative. Ces notions sont au cœur de l'analyse fonctionnelle.
*   Le théorème de Riesz est la raison pour laquelle les équations intégrales et les EDP nécessitent des arguments spécifiques (théorème de Lax-Milgram, théorème spectral en dimension infinie, etc.).

**Pièges classiques**
*   ⚠️ **Utiliser un argument de « suite bornée admet une sous-suite convergente »** dans un evn de dimension infinie sans précaution : faux en général.
*   ⚠️ **Confondre le lemme de Riesz avec le théorème de représentation de Riesz** (qui concerne les formes linéaires continues dans un Hilbert — Théorème 58 dans ce cours). Ce sont deux résultats distincts portant le même nom.
*   ⚠️ **Oublier que le lemme de Riesz requiert $\varepsilon \in ]0, 1[$ strictement :** on ne peut pas prendre $\varepsilon = 0$ en général.

---

## FLASHCARD 79 — Proposition 21 : Parties denses, approximation

### RECTO
**Proposition 21 — Caractérisation d'une partie dense dans un espace métrique**

**Contexte :** Soit $(E, d)$ un espace métrique et $D \subseteq E$.

**Question :** Énoncer la proposition de caractérisation d'une partie dense, avec plusieurs caractérisations équivalentes.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique
*   $D \subseteq E$ une partie

**Énoncé formel — Caractérisations équivalentes de « $D$ est dense dans $E$ »**
Les propriétés suivantes sont équivalentes :

(i) **$\bar{D} = E$** (l'adhérence de $D$ est $E$ entier)

(ii) **$\forall x \in E, \forall \varepsilon > 0, \exists d \in D, d(x, d) < \varepsilon$** (tout point de $E$ est approché arbitrairement par des éléments de $D$)

(iii) **$\forall x \in E, \exists (d_n)_{n \ge 0} \in D^{\mathbb{N}}, d_n \xrightarrow[n \to +\infty]{} x$** (tout point de $E$ est limite d'une suite de $D$)

(iv) **Tout ouvert non vide de $E$ rencontre $D$ :**
    $$ \forall U \text{ ouvert de } E, U \neq \emptyset \implies U \cap D \neq \emptyset $$

**Exemples fondamentaux à connaître**
*   $(\mathbb{R}, |\cdot|) \quad \mathbb{Q}$
*   $(C([a, b], \mathbb{R}), \|\cdot\|_\infty) \quad \text{Polynômes (Weierstrass), fonctions en escalier}$
*   $(C_{2\pi}^0, \|\cdot\|_\infty) \quad \text{Polynômes trigonométriques (Weierstrass trig.)}$
*   $L^2([a, b]) \quad C([a, b], \mathbb{R}), \text{ polynômes}$

### 
**Subtilités**
*   La densité dépend de la topologie (donc de la norme ou de la distance). $\mathbb{Q}$ est dense dans $\mathbb{R}$ pour $|\cdot|$, mais ce n'est pas une notion algébrique.
*   **Densité $\neq$ égalité :** $D$ dense dans $E$ ne signifie pas $D=E$ (exemple : $\mathbb{Q} \neq \mathbb{R}$).
*   La composée de densités : si $D_1$ est dense dans $D_2$ et $D_2$ est dense dans $E$, alors $D_1$ est dense dans $E$.

**Extensions**
*   **Séparabilité :** Un espace métrique est dit séparable s'il admet une partie dense dénombrable. Exemple : $\mathbb{R}^n$ est séparable ($\mathbb{Q}^n$ dense), $C([a, b])$ est séparable (polynômes à coefficients rationnels).
*   **Importance en approximation :** La densité est le fondement des théorèmes d'approximation (Weierstrass, Fourier) : on approche une fonction continue par des objets plus simples (polynômes, polynômes trig.).

**Pièges classiques**
*   ⚠️ Confondre « dense » et « ouvert dense » (notion plus forte, liée au théorème de Baire).
*   ⚠️ Utiliser la densité sans préciser la topologie (la norme par rapport à laquelle on parle de densité).
*   ⚠️ Oublier de vérifier la densité avant d'invoquer un théorème d'approximation (ex : Weierstrass) pour passer d'une propriété sur les polynômes à une propriété sur $C([a, b])$.

---

## FLASHCARD 80 — À connaître 19 : Espaces complets, théorème de Baire

### RECTO
**À connaître 19 — Espaces complets (espaces de Banach) et théorème de Baire**

**Contexte :** Soit $(E, d)$ un espace métrique complet (espace de Banach si $E$ est un evn complet).

**Question :** Énoncer le théorème de Baire et ses principales conséquences en analyse.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique complet (ou espace localement compact)
*   $(U_n)_{n \ge 0}$ une suite d'ouverts denses de $E$

**Énoncé formel — Théorème de Baire**
$$ \bigcap_{n=0}^{+\infty} U_n \text{ est dense dans } E $$

**Reformulation (en termes de fermés) :** Si $(F_n)_{n \ge 0}$ est une suite de fermés d'intérieur vide ($\mathring{F_n} = \emptyset$) dans $E$ complet, alors :
$$ \left( \bigcup_{n=0}^{+\infty} F_n \right)^\circ = \emptyset $$
(l'union dénombrable de fermés d'intérieur vide a un intérieur vide)

**Conséquence négative :** Un espace de Banach non réduit à $\{0\}$ ne peut pas être réunion dénombrable de fermés d'intérieur vide.

**Exemples d'applications**
*   **$\mathbb{R}$ n'est pas dénombrable :** Si $\mathbb{R} = \bigcup_n \{x_n\}$, chaque $\{x_n\}$ est fermé d'intérieur vide, mais leur union est $\mathbb{R}$ qui est d'intérieur non vide : contradiction.
*   Il existe des fonctions continues nulle part dérivables (par un argument de Baire sur $C([0, 1])$).
*   Théorème de Banach-Steinhaus (principe d'uniforme bornitude) utilise Baire.

**Démonstration (Esquisse)**
Soit $x_0 \in E$ et $\varepsilon_0 > 0$. On construit inductivement une suite de Cauchy restant dans $\bigcap_n U_n$ :
*   $U_0$ dense et ouvert : $\exists x_1 \in U_0, \bar{B}(x_1, r_1) \subseteq U_0 \cap B(x_0, \varepsilon_0)$ avec $r_1 \le 1$.
*   $U_1$ dense et ouvert : $\exists x_2 \in U_1, \bar{B}(x_2, r_2) \subseteq U_1 \cap B(x_1, r_1)$ avec $r_2 \le 1/2$.
*   Par complétude, $(x_n)$ converge vers $\ell \in \bigcap_n U_n \cap B(x_0, \varepsilon_0)$.

### 
**Subtilités**
*   **Baire requiert la complétude** (ou la compacité locale) : le théorème est faux pour $\mathbb{Q}$ (qui est un espace métrique non complet). En effet, $\mathbb{Q} = \bigcup_{q \in \mathbb{Q}} \{q\}$, union dénombrable de fermés d'intérieur vide.
*   Baire est un outil d'existence, non constructif. Il prouve l'existence d'un point dans l'intersection, mais ne le construit pas explicitement.
*   **Union dénombrable seulement :** Le théorème porte sur des unions dénombrables. Une union non dénombrable de fermés d'intérieur vide peut très bien couvrir $E$.

**Extensions**
*   **Espaces de Banach :** $C([a, b], \mathbb{R})$ muni de $\|\cdot\|_\infty$ est un espace de Banach (complet) ; Baire y est applicable.
*   **Théorème de Banach-Steinhaus :** Si $(T_n)$ est une suite d'applications linéaires continues $E \to F$ (Banach) telle que $\sup_n \|T_n(x)\| < +\infty$ pour tout $x \in E$, alors $\sup_n \|T_n\| < +\infty$. Preuve par Baire.
*   **Théorème du graphe fermé et théorème de l'application ouverte :** deux autres grands théorèmes de l'analyse fonctionnelle reposant sur Baire.

**Pièges classiques**
*   ⚠️ **Appliquer Baire à $\mathbb{Q}$ ou à un espace non complet :** erreur.
*   ⚠️ **Confondre « fermé d'intérieur vide » et « fermé » :** un fermé peut très bien avoir un intérieur non vide (exemple : $[0, 1] \subseteq \mathbb{R}$).
*   ⚠️ **Croire que Baire donne une conclusion sur une union finie :** le résultat est spécifique aux unions dénombrables infinies.

---

## FLASHCARD 81 — À connaître 20 : Espaces de Banach et exemples fondamentaux

### RECTO
**À connaître 20 — Espaces de Banach : définition et exemples fondamentaux**

**Contexte :** Soit $(E, \|\cdot\|)$ un espace vectoriel normé sur $\mathbb{K} \in \{\mathbb{R}, \mathbb{C}\}$.

**Question :** Définir un espace de Banach et lister les espaces de Banach fondamentaux à connaître en MP*, avec leurs normes.

### VERSO
**Définition**
$(E, \|\cdot\|)$ est un espace de Banach si et seulement si il est complet : toute suite de Cauchy converge dans $E$.

$$ \forall (x_n)_{n \ge 0} \in E^{\mathbb{N}}, \quad (\forall \varepsilon > 0, \exists N \in \mathbb{N}, \forall p, q \ge N, \|x_p - x_q\| < \varepsilon) \implies \exists \ell \in E, x_n \to \ell $$

**Exemples fondamentaux**
*   $\mathbb{K}^n$, toute norme : **Oui**
*   $C([a, b], \mathbb{K})$, $\|\cdot\|_\infty$ : **Oui**
*   $C([a, b], \mathbb{K})$, $\|\cdot\|_1 = \int_a^b \|f\|$ : **Non** (non complet)
*   $C^k([a, b], \mathbb{K})$, $\sum_{j=0}^k \|f^{(j)}\|_\infty$ : **Oui**
*   $\ell^p(\mathbb{N})$, $p \in [1, +\infty]$, $\|\cdot\|_p$ : **Oui**
*   $L^p([a, b])$, $p \in [1, +\infty]$, $\|\cdot\|_p$ : **Oui** (Riesz-Fischer)
*   Polynômes $\mathbb{K}[X]$, $\|\cdot\|_\infty$ sur $[a, b]$ : **Non** (non complet)

**Critère de complétude pratique**
$(E, \|\cdot\|)$ est complet $\iff$ toute série absolument convergente est convergente :
$$ \sum_{n=0}^{+\infty} \|u_n\| < +\infty \implies \sum_{n=0}^{+\infty} u_n \text{ converge dans } E $$

### 
**Subtilités**
*   $(C([a, b]), \|\cdot\|_1)$ n'est pas complet : on peut approcher en norme $L^1$ des fonctions discontinues par des fonctions continues (penser à des fonctions « créneau »). La complétion de $(C([a, b]), \|\cdot\|_1)$ est $L^1([a, b])$.
*   $\mathbb{K}[X]$ n'est pas complet pour aucune norme naturelle : la série $\sum x^n/n!$ converge (vers $e^x$) mais $e^x \notin \mathbb{K}[X]$.
*   Le critère de complétude par les séries est très utile en pratique pour montrer qu'un espace est de Banach (notamment pour $\ell^p$ et $L^p$).

**Extensions**
*   **Espace de Hilbert :** Banach avec une norme issue d'un produit scalaire. Exemples : $\mathbb{K}^n, L^2([a, b]), \ell^2(\mathbb{N})$.
*   **Complétion :** Tout evn admet une complétion unique (à isométrie isomorphe près), qui est un espace de Banach.

**Pièges classiques**
*   ⚠️ **Confondre « suite bornée » et « suite de Cauchy » :** une suite de Cauchy est bornée, mais une suite bornée n'est pas nécessairement de Cauchy.
*   ⚠️ **Croire que $(C([a, b]), \|\cdot\|_2)$ est complet :** faux, la complétion est $L^2([a, b])$.
*   ⚠️ Oublier de vérifier la complétude avant d'appliquer Baire, Banach-Steinhaus ou le théorème du point fixe de Banach.

---

## FLASHCARD 82 — À connaître 21 : Théorème du point fixe de Banach (applications contractantes)

### RECTO
**À connaître 21 — Théorème du point fixe de Banach (ou de Picard)**

**Contexte :** Soit $(E, d)$ un espace métrique complet et $f : E \to E$ une application.

**Question :** Énoncer le théorème du point fixe de Banach avec ses hypothèses exactes et ses conclusions (existence, unicité, convergence des itérées).

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique complet
*   $f : E \to E$ contractante : $\exists k \in [0, 1[$ tel que :
    $$ \forall x, y \in E, \quad d(f(x), f(y)) \le k \cdot d(x, y) $$

**Énoncé formel**
1.  **Existence et unicité :**
    $$ \exists ! x^* \in E, \quad f(x^*) = x^* $$
2.  **Convergence des itérées :** Pour tout $x_0 \in E$, la suite définie par $x_{n+1} = f(x_n)$ converge vers $x^*$ :
    $$ x_n \xrightarrow[n \to +\infty]{} x^* $$
3.  **Estimation de l'erreur :**
    $$ d(x_n, x^*) \le \frac{k^n}{1-k} d(x_1, x_0) $$

**Démonstration (Esquisse)**
*   **La suite $(x_n)$ est de Cauchy :** Pour $p \ge 1$,
    $$ d(x_{n+p}, x_n) \le \frac{k^n(1-k^p)}{1-k} d(x_1, x_0) \xrightarrow[n \to +\infty]{} 0 $$
    par la raison géométrique et $k < 1$.
*   **Convergence :** Par complétude, $x_n \to x^* \in E$.
*   **$x^*$ est point fixe :** $f(x^*) = f(\lim x_n) = \lim f(x_n) = \lim x_{n+1} = x^*$ (continuité de $f$, qui est lipschitzienne).
*   **Unicité :** Si $f(y) = y$ et $f(x^*) = x^*$, alors $d(x^*, y) = d(f(x^*), f(y)) \le k \cdot d(x^*, y)$, donc $(1-k) d(x^*, y) \le 0$, d'où $d(x^*, y) = 0$ et $x^* = y$.

### 
**Subtilités**
*   **$k < 1$ est indispensable.** Une contraction non stricte ($k=1$, i.e., application 1-lipschitzienne) peut ne pas avoir de point fixe : $f : \mathbb{R} \to \mathbb{R}, f(x) = x+1$ est isométrique mais sans point fixe.
*   **La complétude est indispensable.** Sur $]0, 1[$ (non complet), $f(x) = x/2$ est contractante ($k=1/2$) mais le point fixe $0 \notin ]0, 1[$.
*   Pas besoin que $E$ soit un espace vectoriel : le théorème s'applique dans tout espace métrique complet.
*   Le choix de $x_0$ est arbitraire : la convergence vers $x^*$ est indépendante du point de départ.

**Extensions**
*   **Application à Cauchy-Lipschitz :** Le théorème de Cauchy-Lipschitz (Théorème 40) repose sur le théorème du point fixe de Banach appliqué à l'opérateur intégral de Picard dans l'espace $(C([t_0-\delta, t_0+\delta], E), \|\cdot\|_\infty)$ (qui est un Banach).
*   **Contractions sur une boule fermée :** Si $f : \bar{B}(x_0, r) \to \bar{B}(x_0, r)$ est contractante et $\bar{B}(x_0, r)$ est complet (fermée dans un Banach), le théorème s'applique.
*   **Théorème de Brouwer :** Généralisation topologique (toute application continue d'un compact convexe dans lui-même a un point fixe), mais sans taux de convergence.

**Pièges classiques**
*   ⚠️ **Confondre contractante ($k < 1$) et lipschitzienne ($k$ quelconque) :** une application lipschitzienne de constante $\ge 1$ n'est pas contractante.
*   ⚠️ **Oublier que $k$ doit être uniforme** (la même constante pour tous $x, y$) : une contraction locale (contractante au voisinage du point fixe) ne suffit pas en général.
*   ⚠️ **Ne pas vérifier que $f$ envoie l'espace dans lui-même** avant d'appliquer le théorème.
*   ⚠️ **Confondre la vitesse de convergence :** la convergence est géométrique de raison $k$, ce qui est très rapide en pratique.

---

## FLASHCARD 83 — Proposition 22 : Connexité par arcs, connexité

### RECTO
**Proposition 22 — Connexité et connexité par arcs**

**Contexte :** Soit $(E, d)$ un espace métrique (ou un espace topologique) et $A \subseteq E$.

**Question :** Définir la connexité et la connexité par arcs, énoncer le lien entre ces deux notions, et donner les exemples et contre-exemples fondamentaux.

### VERSO
**Définitions**
*   **Connexité par arcs :** $A$ est connexe par arcs si :
    $$ \forall x, y \in A, \exists \gamma : [0, 1] \to A \text{ continue}, \gamma(0) = x \text{ et } \gamma(1) = y $$
*   **Connexité :** $A$ est connexe si $A$ ne peut pas être partitionné en deux ouverts non vides disjoints de $A$ :
    $$ A = U \sqcup V, U, V \text{ ouverts de } A, U \cap V = \emptyset \implies U = \emptyset \text{ ou } V = \emptyset $$

**Énoncé formel — Lien entre les deux notions**
$$ A \text{ connexe par arcs} \implies A \text{ connexe} $$

La réciproque est fausse en général. Contre-exemple classique : le peigne du topologiste (ou la réunion du graphe de $\sin(1/x)$ sur $]0, 1]$ et du segment $\{0\} \times [-1, 1]$) est connexe mais non connexe par arcs.

**Dans les evn (cas pratique en MP*)**
Dans un espace vectoriel normé, les parties connexes par arcs sont exactement les parties connexes pour les ouverts :
$$ U \subseteq E \text{ ouvert, connexe} \iff U \text{ ouvert, connexe par arcs} $$

**Exemples fondamentaux**
*   **Connexes par arcs :** tout convexe, toute boule ouverte ou fermée, $\mathbb{K}^n$, $GL_n(\mathbb{C})$.
*   **Non connexes :** $\mathbb{R} \setminus \{0\}$, $GL_n(\mathbb{R})$ (deux composantes connexes : $\det > 0$ et $\det < 0$).

**Théorème fondamental**
L'image d'un connexe (resp. connexe par arcs) par une application continue est connexe (resp. connexe par arcs) :
$$ f : A \to F \text{ continue}, A \text{ connexe} \implies f(A) \text{ connexe} $$

### 
**Subtilités**
*   Dans $\mathbb{R}$, les parties connexes sont exactement les intervalles (finis ou infinis, ouverts, fermés ou semi-ouverts). Cela donne le théorème des valeurs intermédiaires comme conséquence de la connexité.
*   $GL_n(\mathbb{R})$ n'est pas connexe ($n \ge 1$) : les matrices de déterminant $> 0$ et celles de déterminant $< 0$ forment deux composantes connexes. En revanche, $GL_n(\mathbb{C})$ est connexe par arcs.
*   $GL_n^+(\mathbb{R}) = \{M \in GL_n(\mathbb{R}) : \det M > 0\}$ est connexe par arcs (tout élément peut être joint à l'identité par un chemin continu dans $GL_n^+(\mathbb{R})$, par exemple via la décomposition polaire ou la triangularisation).

**Extensions**
*   **Composantes connexes :** tout espace métrique est partitionné en composantes connexes (les plus grandes parties connexes), qui sont fermées.
*   **Convexité $\implies$ connexité par arcs :** tout convexe (même en dimension infinie) est connexe par arcs (l'arc est le segment $\gamma(t) = (1-t)x + ty$).

**Pièges classiques**
*   ⚠️ **Croire que connexe $\implies$ connexe par arcs en général :** faux (contre-exemple du peigne).
*   ⚠️ **Oublier de vérifier que l'image d'un connexe est dans l'espace d'arrivée** avant d'invoquer la connexité de l'image.
*   ⚠️ **Confondre « $A$ connexe » et « $A$ convexe » :** la convexité est une propriété plus forte et plus maniable, mais n'est définie que dans un espace vectoriel.

---

## FLASHCARD 84 — Proposition 23 : Théorème des valeurs intermédiaires (version topologique)

### RECTO
**Proposition 23 — Théorème des valeurs intermédiaires (version topologique générale)**

**Contexte :** Soit $(E, d)$ un espace métrique, $A \subseteq E$ une partie connexe, et $f : A \to \mathbb{R}$ une application continue.

**Question :** Énoncer le théorème des valeurs intermédiaires dans sa version topologique générale, avec ses hypothèses exactes et sa conclusion.

### VERSO
**Hypothèses complètes**
*   $(E, d)$ espace métrique
*   $A \subseteq E$ connexe (non vide)
*   $f : A \to \mathbb{R}$ continue

**Énoncé formel**
$$ \forall x, y \in A, \forall \lambda \in \mathbb{R}, \quad f(x) \le \lambda \le f(y) \implies \exists z \in A, f(z) = \lambda $$

Autrement dit : $f(A)$ est un intervalle de $\mathbb{R}$ (l'image d'un connexe par une application continue à valeurs réelles est un intervalle).

**Cas particulier fondamental (le plus utilisé en MP*)**
Théorème des valeurs intermédiaires classique :

Soit $f : [a, b] \to \mathbb{R}$ continue ($[a, b]$ est connexe par arcs, donc connexe). Alors :
$$ \forall \lambda \in [f(a), f(b)] \text{ (ou } [\min(f(a), f(b)), \max(f(a), f(b))]), \quad \exists c \in [a, b], f(c) = \lambda $$

**Démonstration (Esquisse)**
$f(A)$ est l'image d'un connexe par $f$ continue, donc $f(A)$ est connexe dans $\mathbb{R}$. Or, les connexes de $\mathbb{R}$ sont exactement les intervalles. Donc $f(A)$ est un intervalle. Toute valeur entre $f(x)$ et $f(y)$ appartient à $f(A)$, ce qui donne l'existence de $z$.

### 
**Subtilités**
*   **La connexité de $A$ est indispensable.** Si $A$ n'est pas connexe, le TVI peut échouer. Exemple : $f : \{-1\} \cup \{1\} \to \mathbb{R}$, $f(-1) = -1, f(1) = 1$, $f$ continue sur son domaine non connexe ; $0$ n'est pas atteint.
*   Le TVI ne donne pas l'unicité de $z$. Il garantit l'existence d'un $z$, mais peut y en avoir plusieurs.
*   **Version quantitative (pour les épreuves) :** Si $f$ est continue sur $[a, b]$, $f(a) \cdot f(b) < 0$, alors $\exists c \in ]a, b[, f(c) = 0$. (Le zéro est dans l'intérieur si les signes sont strictement opposés.)
*   La conclusion « $f(A)$ est un intervalle » est la formulation la plus puissante. Elle s'applique même si $A$ n'est pas un intervalle de $\mathbb{R}$ (ex : $A \subseteq \mathbb{R}^n$ connexe).

**Extensions**
*   **Fonctions à valeurs vectorielles :** Le TVI ne s'étend pas directement à $f : A \to \mathbb{R}^n$ pour $n \ge 2$ (on ne peut pas définir une relation d'ordre total sur $\mathbb{R}^n$).
*   **TVI + compacité :** Si $f : [a, b] \to \mathbb{R}$ est continue, alors $f([a, b]) = [\min f, \max f]$ (image exactement un segment, par compacité + connexité).
*   **Application topologique :** Le TVI permet de montrer que $[0, 1]$ et $[0, 1[$ ne sont pas homéomorphes (en retirant un point intérieur, l'un reste connexe, l'autre non).

**Pièges classiques**
*   ⚠️ **Invoquer le TVI sans vérifier la continuité de $f$** sur tout l'intervalle $[a, b]$ (pas seulement aux extrémités).
*   ⚠️ **Confondre TVI et théorème du point fixe de Brouwer :** le TVI est plus élémentaire et spécifique à $\mathbb{R}$.
*   ⚠️ **Oublier que le TVI donne une existence, pas une construction :** pour trouver numériquement $c$, il faut la dichotomie ou la méthode de Newton.
*   ⚠️ **Appliquer le TVI à une fonction définie sur un ensemble non connexe :** vérifier toujours que le domaine est un intervalle (ou au moins connexe).

---

## FLASHCARD 85 — À connaître 22 : Lemme de Gronwall

### RECTO
**Lemme de Gronwall (versions intégrale et différentielle)**

Soit $I = [a, b]$ un segment de $\mathbb{R}$, et $u, v : I \to \mathbb{R}$ des fonctions continues, avec $v \ge 0$.

**Question :** Énoncer le lemme de Gronwall sous sa forme intégrale. En déduire la version différentielle.

### VERSO
**Hypothèses (forme intégrale) :**
*   $a, b \in \mathbb{R}, a < b$
*   $u, v : [a, b] \to \mathbb{R}$ continues
*   $v \ge 0$ sur $[a, b]$
*   $C \in \mathbb{R}$ (constante)
    $$ \forall t \in [a, b], \quad u(t) \le C + \int_a^t v(s) u(s) ds $$

**Conclusion :**
$$ \forall t \in [a, b], \quad u(t) \le C \exp \left( \int_a^t v(s) ds \right) $$

**Forme différentielle :**
*   $u$ de classe $C^1$ sur $[a, b]$, $\alpha \in \mathbb{R}, \beta \ge 0$
    $$ \forall t \in [a, b], \quad u'(t) \le \beta u(t) + \alpha $$

**Alors :**
$$ \forall t \in [a, b], \quad u(t) \le \left( u(a) + \frac{\alpha}{\beta} \right) e^{\beta(t-a)} - \frac{\alpha}{\beta} $$
(si $\beta > 0$; si $\beta = 0$, $u(t) \le u(a) + \alpha(t-a)$).

**Démonstration (esquisse) :**
Poser $\varphi(t) = C + \int_a^t v(s) u(s) ds$. Alors $\varphi' = v \cdot u \le v \cdot \varphi$.
Multiplier par le facteur intégrant $e^{-\int_a^t v}$ : on montre que $t \mapsto \varphi(t) e^{-\int_a^t v(s) ds}$ est décroissante.
D'où $\varphi(t) \le \varphi(a) e^{\int_a^t v} = C e^{\int_a^t v}$, et $u \le \varphi$ donne la conclusion.

### 
**Subtilités :**
*   L'hypothèse $v \ge 0$ est cruciale : sans elle, le facteur intégrant ne donne pas le bon sens de monotonie.
*   La constante $C$ peut être négative : le lemme reste vrai.
*   Sur un intervalle non borné $[a, +\infty[$, le lemme reste valable pour tout $t$ fixé (on l'applique sur $[a, t]$).

**Extensions :**
*   Valable pour $u, v$ seulement continues par morceaux (voire $L^1_{loc}$), ce qui est utile en EDO.
*   S'applique aux fonctions à valeurs dans un evn via $\|y(t)\|$ (on majore la norme, qui est une fonction réelle).

**Pièges classiques :**
*   Oublier $v \ge 0$ et appliquer aveuglément.
*   Confondre le sens de l'inégalité : le lemme donne une majoration.
*   En concours, le lemme sert le plus souvent à prouver l'unicité des solutions d'un problème de Cauchy : si $y_1, y_2$ sont deux solutions, on montre $\|y_1 - y_2\|$ vérifie une inégalité de Gronwall avec $C=0$, d'où $y_1 = y_2$.

---

## FLASHCARD 86 — Lemme 2 : Forme intégrale d'un problème de Cauchy

### RECTO
**Forme intégrale d'un problème de Cauchy**

Soit $I$ un intervalle de $\mathbb{R}$, $t_0 \in I$, $y_0 \in E$ (espace vectoriel normé de dimension finie), et $f : I \times E \to E$.

**Question :** Énoncer l'équivalence entre le problème de Cauchy $y' = f(t, y), y(t_0) = y_0$ et sa formulation intégrale.

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$, $t_0 \in I$
*   $E = \mathbb{R}^n$ (ou $E$ evn de dimension finie)
*   $f : I \times E \to E$ continue
*   $y : J \to E$ avec $J \subset I$ intervalle contenant $t_0$

**Énoncé :**
$y$ est de classe $C^1$ sur $J$ et vérifie :
$$ \begin{cases} y'(t) = f(t, y(t)) \\ y(t_0) = y_0 \end{cases} \quad \forall t \in J $$
si et seulement si $y$ est continue sur $J$ et :
$$ \forall t \in J, \quad y(t) = y_0 + \int_{t_0}^t f(s, y(s)) ds $$

**Démonstration (esquisse) :**
*   $(\Rightarrow)$ : Intégrer $y' = f(\cdot, y(\cdot))$ entre $t_0$ et $t$, utiliser $y(t_0) = y_0$.
*   $(\Leftarrow)$ : Si $y$ continue, $s \mapsto f(s, y(s))$ est continue (composée), donc $y$ est $C^1$ par le théorème fondamental de l'analyse, et $y'(t) = f(t, y(t))$. Évaluer en $t_0$ donne $y(t_0) = y_0$.

### 
**Subtilités :**
*   La continuité de $f$ en les deux variables est nécessaire pour que $s \mapsto f(s, y(s))$ soit intégrable.
*   La formulation intégrale ne requiert que la continuité de $y$, pas sa dérivabilité a priori : c'est la formulation intégrale qui produit la régularité $C^1$.
*   Ce lemme est la pierre angulaire de la démonstration du théorème de Cauchy-Lipschitz (méthode du point fixe de Picard).

**Extensions :**
*   Valable en dimension infinie si $E$ est un espace de Banach (hors programme MP, mais utile conceptuellement).

**Pièges classiques :**
*   Oublier de vérifier que $f$ est continue (et pas seulement en $t$ ou en $y$ séparément).
*   Confondre « solution au sens classique » ($C^1$) et « solution au sens intégral » (continue) : ici elles coïncident grâce à la continuité de $f$.

---

## FLASHCARD 87 — Théorème 40 : Cauchy-Lipschitz linéaire

### RECTO
**Théorème de Cauchy-Lipschitz linéaire**

Soit $I$ un intervalle ouvert de $\mathbb{R}$, $A : I \to M_n(\mathbb{K})$ et $B : I \to \mathbb{K}^n$ continues, avec $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$.

**Question :** Énoncer le théorème de Cauchy-Lipschitz pour le système différentiel linéaire $Y' = A(t)Y + B(t), Y(t_0) = Y_0$.

### VERSO
**Hypothèses :**
*   $I$ intervalle (ouvert, fermé, ou quelconque) de $\mathbb{R}$
*   $A : I \to M_n(\mathbb{K})$ continue
*   $B : I \to \mathbb{K}^n$ continue
*   $t_0 \in I, Y_0 \in \mathbb{K}^n$

**Conclusion :**
Le problème de Cauchy :
$$ \begin{cases} Y'(t) = A(t)Y(t) + B(t) \\ Y(t_0) = Y_0 \end{cases} $$
admet une unique solution $Y : I \to \mathbb{K}^n$ de classe $C^1$, définie sur $I$ tout entier (solution globale).

**Conséquences :**
*   L'ensemble des solutions de l'équation homogène $Y' = A(t)Y$ est un sous-espace vectoriel de dimension $n$ de $C^1(I, \mathbb{K}^n)$.
*   L'ensemble des solutions de $Y' = A(t)Y + B(t)$ est un sous-espace affine de dimension $n$, dirigé par le précédent.

**Démonstration (esquisse) :**
Reformulation intégrale : $Y(t) = Y_0 + \int_{t_0}^t [A(s)Y(s) + B(s)] ds$.
On définit l'opérateur $\Phi(Y)(t) = Y_0 + \int_{t_0}^t [A(s)Y(s) + B(s)] ds$.
On montre que $\Phi^k$ est contractante pour la norme $\|\cdot\|_\infty$ sur tout segment $[t_0-\delta, t_0+\delta] \subset I$ (ou via le lemme de Gronwall pour l'unicité).
Le caractère global vient de la linéarité : $f(t, Y) = A(t)Y + B(t)$ est lipschitzienne en $Y$ sur tout segment, ce qui empêche l'explosion en temps fini.

### 
**Subtilités :**
*   Le résultat essentiel est le caractère global : la solution est définie sur $I$ tout entier, pas seulement localement. C'est une propriété spécifique aux EDO linéaires.
*   $I$ n'a pas besoin d'être ouvert : le théorème vaut sur tout intervalle (segment, semi-ouvert…), avec dérivée à droite/gauche aux bords si nécessaire.
*   Le théorème est valable pour $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$ indifféremment.

**Extensions :**
*   En dimension infinie ($E$ espace de Banach), le théorème reste vrai si $A(t) \in \mathcal{L}(E)$ et $t \mapsto A(t)$ est continue pour la topologie de la norme d'opérateur (hors programme MP strict).

**Pièges classiques :**
*   Oublier que la dimension de l'espace des solutions de l'homogène est $n$ (et non $n+1$ ou autre).
*   Confondre avec le Cauchy-Lipschitz non linéaire où la solution n'est que locale.
*   Ne pas vérifier la continuité de $A$ et $B$ (si elles ne sont que continues par morceaux, il faut recoller).
*   Attention : pour une équation scalaire d'ordre $n$, on se ramène à un système de dimension $n$, et l'espace des solutions de l'homogène est de dimension $n$.

---

## FLASHCARD 88 — Théorème 41 : Cauchy-Lipschitz pour les EDL d'ordre $n$

### RECTO
**Théorème de Cauchy-Lipschitz pour les équations différentielles linéaires scalaires d'ordre $n$**

Soit $I$ un intervalle de $\mathbb{R}$, $a_0, \dots, a_{n-1}, b : I \to \mathbb{K}$ continues.

**Question :** Énoncer le théorème d'existence et d'unicité pour l'équation :
$$ y^{(n)} + a_{n-1}(t) y^{(n-1)} + \dots + a_0(t) y = b(t) $$
avec conditions initiales prescrites.

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$, $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$
*   $a_0, \dots, a_{n-1} : I \to \mathbb{K}$ continues
*   $b : I \to \mathbb{K}$ continue
*   $t_0 \in I, (y_0, y_1, \dots, y_{n-1}) \in \mathbb{K}^n$

**Conclusion :**
Le problème de Cauchy :
$$ \begin{cases} y^{(n)}(t) + a_{n-1}(t) y^{(n-1)}(t) + \dots + a_0(t) y(t) = b(t) \\ y(t_0) = y_0, \quad y'(t_0) = y_1, \quad \dots, \quad y^{(n-1)}(t_0) = y_{n-1} \end{cases} $$
admet une unique solution $y : I \to \mathbb{K}$ de classe $C^n$, définie sur $I$ tout entier.

L'espace des solutions de l'équation homogène est un $\mathbb{K}$-espace vectoriel de dimension $n$.

**Démonstration (esquisse) :**
Se ramener au théorème précédent (Théorème 40) en posant $Y = (y, y', \dots, y^{(n-1)})^T \in \mathbb{K}^n$, ce qui donne $Y' = A(t)Y + B(t)$ avec $A(t)$ la matrice compagnon associée.

### 
**Subtilités :**
*   Le coefficient dominant doit être normalisé à 1 (ou non nul). Si l'équation est $a_n(t) y^{(n)} + \dots = b(t)$ avec $a_n$ pouvant s'annuler, le théorème ne s'applique pas directement : il faut travailler sur les intervalles où $a_n \neq 0$.
*   Le wronskien des solutions de l'homogène est soit identiquement nul, soit jamais nul sur $I$ (caractérise si les solutions forment une base ou non).

**Pièges classiques :**
*   Diviser par $a_n(t)$ sans vérifier que $a_n$ ne s'annule pas sur $I$.
*   Oublier qu'il faut $n$ conditions initiales (et non $n-1$ ou $n+1$).
*   Sur un problème concret, oublier de vérifier que les $a_k$ sont bien continues sur l'intervalle considéré (ex : $1/t$ non continue en $0$).

---

## FLASHCARD 89 — À connaître 23 : Wronskien et structure des solutions

### RECTO
**Wronskien et structure des solutions d'une EDL d'ordre $n$**

Soit $y_1, \dots, y_n$ des solutions de l'équation homogène $y^{(n)} + a_{n-1}(t) y^{(n-1)} + \dots + a_0(t) y = 0$ sur un intervalle $I$.

**Question :** Définir le wronskien de $(y_1, \dots, y_n)$. Énoncer la caractérisation d'un système fondamental de solutions via le wronskien. Donner la formule de Liouville (ou d'Abel).

### VERSO
**Définition :**
$$ W(t) = \det \begin{pmatrix} y_1(t) & \dots & y_n(t) \\ y_1'(t) & \dots & y_n'(t) \\ \vdots & & \vdots \\ y_1^{(n-1)}(t) & \dots & y_n^{(n-1)}(t) \end{pmatrix} $$

**Caractérisation :**
$(y_1, \dots, y_n)$ est un système fondamental de solutions (i.e. une base de l'espace des solutions) si et seulement si $W(t_0) \neq 0$ pour un (et alors tout) $t_0 \in I$.

**Alternative de wronskien :** $W$ est soit identiquement nul sur $I$, soit ne s'annule jamais sur $I$.

**Formule d'Abel–Liouville :**
$$ \forall t \in I, \quad W(t) = W(t_0) \exp \left( - \int_{t_0}^t a_{n-1}(s) ds \right) $$

**Démonstration (esquisse) :**
On dérive $W$ : par multilinéarité du déterminant, seule la ligne des dérivées d'ordre maximal contribue, ce qui donne $W'(t) = - a_{n-1}(t) W(t)$.
EDL d'ordre 1 en $W \to$ formule exponentielle.

### 
**Subtilités :**
*   L'alternative du wronskien est spécifique aux solutions d'une même EDL. Pour des fonctions quelconques, le wronskien peut s'annuler en certains points sans être identiquement nul.
*   La formule d'Abel ne fait intervenir que $a_{n-1}$ (coefficient de $y^{(n-1)}$), pas les autres.

**Pièges classiques :**
*   Calculer un wronskien de fonctions qui ne sont pas solutions d'une même EDL et en tirer des conclusions fausses.
*   Confondre « famille libre de $C^n(I)$ » et « système fondamental » : une famille de solutions peut être libre sans être un SFS si elle ne comporte pas $n$ éléments.

---

## FLASHCARD 90 — Proposition 24 : Variation des constantes (équation scalaire d'ordre 2)

### RECTO
**Variation des constantes pour une équation scalaire d'ordre 2**

Soit l'équation $y'' + a(t)y' + b(t)y = c(t)$ sur un intervalle $I$, avec $a, b, c : I \to \mathbb{K}$ continues, et $(y_1, y_2)$ un système fondamental de solutions de l'homogène.

**Question :** Énoncer la méthode de variation des constantes : sous quelle forme cherche-t-on une solution particulière ? Quel système vérifient les fonctions inconnues ?

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$, $\mathbb{K} = \mathbb{R}$ ou $\mathbb{C}$
*   $a, b, c : I \to \mathbb{K}$ continues
*   $(y_1, y_2)$ système fondamental de solutions de $y'' + ay' + by = 0$
*   $W = y_1 y_2' - y_1' y_2$ le wronskien (ne s'annule jamais)

**Méthode :**
On cherche une solution particulière sous la forme :
$$ y_p(t) = \lambda_1(t) y_1(t) + \lambda_2(t) y_2(t) $$
avec $\lambda_1, \lambda_2 : I \to \mathbb{K}$ de classe $C^1$.

**Système de Cramer :**
$$ \begin{cases} \lambda_1'(t) y_1(t) + \lambda_2'(t) y_2(t) = 0 \\ \lambda_1'(t) y_1'(t) + \lambda_2'(t) y_2'(t) = c(t) \end{cases} $$

**Solution :**
$$ \lambda_1'(t) = \frac{-y_2(t) c(t)}{W(t)}, \quad \lambda_2'(t) = \frac{y_1(t) c(t)}{W(t)} $$
Puis on intègre pour obtenir $\lambda_1$ et $\lambda_2$.

**Démonstration (esquisse) :**
On pose la contrainte de jauge $\lambda_1' y_1 + \lambda_2' y_2 = 0$ pour que $y_p' = \lambda_1 y_1' + \lambda_2 y_2'$ (simplification).
On dérive une seconde fois et on injecte dans l'équation : les termes en $\lambda_1, \lambda_2$ (sans prime) disparaissent car $y_1, y_2$ sont solutions de l'homogène.
Il reste $\lambda_1' y_1' + \lambda_2' y_2' = c$, et le système est inversible car $W \neq 0$.

### 
**Subtilités :**
*   La première équation $\lambda_1' y_1 + \lambda_2' y_2 = 0$ est une convention de calcul (condition de jauge), pas une conséquence de l'équation. Elle simplifie $y_p''$.
*   La méthode se généralise à l'ordre $n$ : on a $n$ inconnues $\lambda_k'$ et $n$ équations, dont $n-1$ conditions de jauge et la dernière vient de l'EDL.

**Pièges classiques :**
*   Oublier de normaliser l'équation (le coefficient de $y''$ doit être 1, sinon le second membre est $c(t)/a_2(t)$).
*   Se tromper de signe dans les formules de Cramer.
*   Oublier que la solution générale est $y = y_p + \alpha y_1 + \beta y_2$, pas juste $y_p$.

---

## FLASHCARD 91 — À connaître 24 : Zéros isolés des solutions d'EDL

### RECTO
**Zéros isolés des solutions d'une EDL d'ordre $n$**

Soit $y$ une solution non identiquement nulle de l'EDL homogène $y^{(n)} + a_{n-1}(t) y^{(n-1)} + \dots + a_0(t) y = 0$ sur un intervalle $I$, avec $a_k$ continues.

**Question :** Que peut-on dire des zéros de $y$ ?

### VERSO
**Hypothèses :**
*   $I$ intervalle de $\mathbb{R}$
*   $a_0, \dots, a_{n-1} : I \to \mathbb{K}$ continues
*   $y : I \to \mathbb{K}$ solution de l'EDL homogène, $y \not\equiv 0$

**Conclusion :**
Les zéros de $y$ sont isolés : pour tout $t_0 \in I$ tel que $y(t_0) = 0$, il existe $\varepsilon > 0$ tel que $y$ ne s'annule pas sur $]t_0 - \varepsilon, t_0 + \varepsilon[ \setminus \{t_0\}$.

En particulier, $y$ n'a qu'un nombre fini de zéros sur tout segment $[a, b] \subset I$.

**Démonstration (esquisse) :**
Si $y(t_0) = 0$, poser $Y(t_0) = (y(t_0), y'(t_0), \dots, y^{(n-1)}(t_0))$.
Comme $y \not\equiv 0$, par unicité de Cauchy-Lipschitz, $Y(t_0) \neq 0$, donc il existe $k \in \{0, \dots, n-1\}$ tel que $y^{(k)}(t_0) \neq 0$.
Soit $k_0$ le plus petit tel indice. Si $k_0 = 0$, $y(t_0) \neq 0$, contradiction. Sinon $y(t_0) = y'(t_0) = \dots = y^{(k_0-1)}(t_0) = 0$ et $y^{(k_0)}(t_0) \neq 0$.
Par Taylor (ou par continuité de $y^{(k_0)}$), $y(t) \sim \frac{y^{(k_0)}(t_0)}{k_0!} (t-t_0)^{k_0}$ au voisinage de $t_0$, donc $y$ ne s'annule pas au voisinage de $t_0$ (sauf en $t_0$ lui-même).
Nombre fini sur un segment : l'ensemble des zéros est fermé et discret dans $I$, donc fini sur tout compact.

### 
**Subtilités :**
*   Le résultat est faux pour des fonctions quelconques : $t \mapsto t^2 \sin(1/t)$ a des zéros non isolés.
*   C'est aussi faux pour les EDL à coefficients discontinus.
*   Pour $\mathbb{K} = \mathbb{C}$, les zéros sont encore isolés, mais on ne peut pas parler de « signe ».

**Extensions :**
*   Pour les EDL d'ordre 2 à coefficients réels, on peut dire beaucoup plus : les zéros de deux solutions linéairement indépendantes s'entrelacent (théorème de Sturm).

**Pièges classiques :**
*   Écrire « les zéros sont en nombre fini sur $I$ » sans préciser « sur tout segment » : sur $I = \mathbb{R}$, $\sin(t)$ (solution de $y''+y=0$) a une infinité de zéros, mais ils sont isolés.
*   Confondre « isolés » et « en nombre fini ».

---

## FLASHCARD 92 — À connaître 25 : Théorème de Sturm-Liouville (théorème de comparaison de Sturm)

### RECTO
**Théorème de comparaison de Sturm**

Soient $q_1, q_2 : [a, b] \to \mathbb{R}$ continues avec $q_1 \le q_2$ sur $[a, b]$. Soit $y_1$ (resp. $y_2$) une solution non triviale de $y'' + q_1(t)y = 0$ (resp. $y'' + q_2(t)y = 0$).

**Question :** Énoncer le théorème de comparaison de Sturm reliant les zéros de $y_1$ et $y_2$.

### VERSO
**Hypothèses :**
*   $[a, b]$ segment de $\mathbb{R}$
*   $q_1, q_2 : [a, b] \to \mathbb{R}$ continues, $q_1(t) \le q_2(t)$ pour tout $t \in [a, b]$
*   $y_1$ solution non triviale de $y_1'' + q_1(t) y_1 = 0$
*   $y_2$ solution non triviale de $y_2'' + q_2(t) y_2 = 0$

**Conclusion :**
Entre deux zéros consécutifs de $y_1$, il y a au moins un zéro de $y_2$ (à condition que $q_1 \not\equiv q_2$ sur cet intervalle, sinon $y_2$ peut ne pas s'annuler).

Plus précisément : si $\alpha < \beta$ sont deux zéros consécutifs de $y_1$ et $q_1 \le q_2$ avec $q_1 \not\equiv q_2$, alors $y_2$ s'annule au moins une fois dans $]\alpha, \beta[$.

**Démonstration (esquisse) :**
On peut supposer $y_1 > 0$ sur $]\alpha, \beta[$ (quitte à changer de signe).
On suppose par l'absurde que $y_2 > 0$ sur $]\alpha, \beta[$.
On considère l'identité de Picone ou on calcule $\frac{d}{dt}[y_1 y_2' - y_1' y_2]$ :
$$ \frac{d}{dt}(y_1 y_2' - y_1' y_2) = (q_1 - q_2) y_1 y_2 $$
On intègre sur $[\alpha, \beta]$ : le membre de gauche se calcule aux bornes ($y_1(\alpha) = y_1(\beta) = 0$), le membre de droite est $\le 0$ (car $q_1 \le q_2$ et $y_1, y_2 > 0$), ce qui mène à une contradiction si $q_1 \not\equiv q_2$.

### 
**Subtilités :**
*   Le théorème est spécifique à l'ordre 2 et aux coefficients réels.
*   Si $q_1 = q_2$, on retrouve l'entrelacement des zéros de deux solutions linéairement indépendantes d'une même EDL d'ordre 2 (théorème de Sturm).
*   L'hypothèse est $q_1 \le q_2$ : plus le « potentiel » $q$ est grand, plus les solutions oscillent rapidement.

**Applications classiques :**
*   Comparer les zéros de $y'' + t y = 0$ (Airy) à ceux de $\sin$ ou $\cos$ (solutions de $y'' + y = 0$).
*   Montrer qu'une solution a une infinité de zéros si $q(t) \to +\infty$.

**Pièges classiques :**
*   Appliquer Sturm à des équations qui ne sont pas sous forme $y'' + q(t) y = 0$ : il faut d'abord se ramener à cette forme (ou adapter l'énoncé si le coefficient de $y'$ n'est pas nul).
*   Oublier la condition $q_1 \not\equiv q_2$.

---

## FLASHCARD 93 — Théorème 42 : Condition nécessaire d'extremum local en un point intérieur (calcul différentiel)

### RECTO
**Condition nécessaire d'extremum local en un point intérieur (fonctions de plusieurs variables)**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ différentiable en $a \in U$.

**Question :** Énoncer la condition nécessaire d'extremum local de $f$ en $a$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$
*   $f$ différentiable en $a \in U$
*   $f$ admet un extremum local en $a$

**Conclusion :**
$$ df(a) = 0 \quad \text{i.e.} \quad \forall h \in \mathbb{R}^n, df(a) \cdot h = 0 $$
Autrement dit, $\nabla f(a) = 0$ (toutes les dérivées partielles s'annulent en $a$) :
$$ \frac{\partial f}{\partial x_i}(a) = 0 \quad \forall i \in \{1, \dots, n\} $$

**Démonstration (esquisse) :**
Pour tout $h \in \mathbb{R}^n$, la fonction $\varphi : t \mapsto f(a + th)$ est définie au voisinage de $0$, différentiable en $0$, et admet un extremum local en $0$. Par le cas réel unidimensionnel : $\varphi'(0) = df(a) \cdot h = 0$.

### 
**Subtilités :**
*   Le point $a$ doit être intérieur au domaine. Si $a$ est sur le bord, la condition n'est plus nécessaire (cf. optimisation sous contrainte).
*   La condition est nécessaire mais pas suffisante : $f(x, y) = x^3$ en $(0, 0)$ a $df(0) = 0$ mais pas d'extremum.
*   $f$ doit être à valeurs réelles. Pour $f : U \to \mathbb{R}^p$ avec $p \ge 2$, la notion d'extremum n'a pas de sens (pas d'ordre sur $\mathbb{R}^p$).

**Pièges classiques :**
*   Confondre « $f$ admet toutes ses dérivées partielles nulles en $a$ » (condition plus faible si $f$ n'est pas différentiable) et « $df(a) = 0$ ».
*   Oublier de vérifier la différentiabilité (l'existence des dérivées partielles ne suffit pas).

---

## FLASHCARD 94 — Proposition 25 : Règle de la chaîne

### RECTO
**Règle de la chaîne (chain rule)**

Soient $U \subset \mathbb{R}^n$ ouvert, $V \subset \mathbb{R}^p$ ouvert, $f : U \to V$ et $g : V \to \mathbb{R}^q$.

**Question :** Sous quelles hypothèses $g \circ f$ est-elle différentiable en $a \in U$, et quelle est sa différentielle ?

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$, $V$ ouvert de $\mathbb{R}^p$
*   $f : U \to \mathbb{R}^p$ différentiable en $a \in U$, avec $f(U) \subset V$
*   $g : V \to \mathbb{R}^q$ différentiable en $b = f(a) \in V$

**Conclusion :**
$g \circ f$ est différentiable en $a$ et :
$$ d(g \circ f)(a) = dg(f(a)) \circ df(a) $$

En termes de matrices jacobiennes :
$$ J_{g \circ f}(a) = J_g(f(a)) \cdot J_f(a) $$

**Démonstration (esquisse) :**
*   Écrire $f(a+h) = f(a) + df(a) \cdot h + o(\|h\|)$.
*   Écrire $g(f(a)+k) = g(f(a)) + dg(f(a)) \cdot k + o(\|k\|)$ avec $k = df(a) \cdot h + o(\|h\|)$.
*   Composer : $g(f(a+h)) = g(f(a)) + dg(f(a)) \cdot df(a) \cdot h + o(\|h\|)$.
*   Vérifier que les restes sont bien des $o(\|h\|)$ en utilisant que $\|k\| = O(\|h\|)$.

### 
**Subtilités :**
*   La règle de la chaîne donne la composition des applications linéaires (et non leur somme ou produit terme à terme).
*   En coordonnées : $\frac{\partial (g \circ f)}{\partial x_j}(a) = \sum_{i=1}^p \frac{\partial g}{\partial y_i}(f(a)) \frac{\partial f_i}{\partial x_j}(a)$.
*   L'hypothèse « $f(U) \subset V$ » est parfois oubliée mais nécessaire pour que $g \circ f$ ait un sens.

**Extensions :**
*   Valable en dimension infinie entre espaces de Banach (même démonstration).
*   Si $f$ est $C^1$ et $g$ est $C^1$, alors $g \circ f$ est $C^1$ (et la formule est valable en tout point).

**Pièges classiques :**
*   Inverser l'ordre dans la composition : $dg(f(a)) \circ df(a)$ et non $df(a) \circ dg(f(a))$.
*   Évaluer $dg$ en $a$ au lieu de $f(a)$.
*   Oublier que la différentiabilité de $f$ en $a$ implique la continuité de $f$ en $a$ (nécessaire pour que $f(a+h)$ reste dans $V$).

---

## FLASHCARD 95 — Proposition 26 : Intégration le long d'un arc (chemin)

### RECTO
**Intégration le long d'un chemin**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^1$, et $\gamma : [a, b] \to U$ un chemin de classe $C^1$.

**Question :** Exprimer $f(\gamma(b)) - f(\gamma(a))$ à l'aide d'une intégrale.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$ de classe $C^1$
*   $\gamma : [a, b] \to U$ de classe $C^1$ (ou $C^1$ par morceaux)

**Conclusion :**
$$ f(\gamma(b)) - f(\gamma(a)) = \int_a^b df(\gamma(t)) \cdot \gamma'(t) dt = \int_a^b \langle \nabla f(\gamma(t)), \gamma'(t) \rangle dt $$

En coordonnées : si $\gamma(t) = (\gamma_1(t), \dots, \gamma_n(t))$ :
$$ f(\gamma(b)) - f(\gamma(a)) = \int_a^b \sum_{i=1}^n \frac{\partial f}{\partial x_i}(\gamma(t)) \gamma_i'(t) dt $$

**Démonstration :**
Poser $\varphi(t) = f(\gamma(t))$. Par la règle de la chaîne, $\varphi'(t) = df(\gamma(t)) \cdot \gamma'(t)$. Puis $\varphi(b) - \varphi(a) = \int_a^b \varphi'(t) dt$.

### 
**Subtilités :**
*   C'est essentiellement le théorème fondamental de l'analyse appliqué à $\varphi = f \circ \gamma$.
*   Cela fournit une version de l'inégalité des accroissements finis en dimension $n$ : en prenant $\gamma(t) = a + t(b-a)$ et en majorant la norme de $\nabla f$.

**Extensions :**
*   C'est le point de départ de la théorie des formes différentielles et des intégrales curvilignes.

**Pièges classiques :**
*   La formule nécessite que l'image de $\gamma$ soit dans $U$ (important si $U$ n'est pas convexe : le segment $[a, b]$ dans $\mathbb{R}^n$ peut sortir de $U$).
*   Oublier le produit scalaire : c'est $\nabla f \cdot \gamma'$ et non $\nabla f \cdot \gamma$.

---

## FLASHCARD 96 — À connaître 26 : Inégalité des accroissements finis en dimension quelconque

### RECTO
**Inégalité des accroissements finis (fonctions de plusieurs variables, ou à valeurs vectorielles)**

Soit $U$ un ouvert convexe de $\mathbb{R}^n$, $f : U \to \mathbb{R}^p$ de classe $C^1$.

**Question :** Énoncer l'inégalité des accroissements finis pour $f$ entre deux points $a, b \in U$.

### VERSO
**Hypothèses :**
*   $U$ ouvert convexe de $\mathbb{R}^n$ (ou plus généralement : le segment $[a, b] \subset U$)
*   $f : U \to \mathbb{R}^p$ de classe $C^1$
*   $a, b \in U$

**Conclusion :**
$$ \|f(b) - f(a)\| \le \sup_{t \in [0, 1]} \|df(a + t(b-a))\|_{\mathcal{L}(\mathbb{R}^n, \mathbb{R}^p)} \cdot \|b-a\| $$

Si $M = \sup_{x \in [a, b]} \|\|df(x)\|\|$ (norme d'opérateur de la différentielle) :
$$ \|f(b) - f(a)\| \le M \|b-a\| $$

**Cas $p=1$ (réel) :** On a en fait l'égalité de la moyenne $f(b) - f(a) = df(c) \cdot (b-a)$ pour un certain $c$ sur le segment $[a, b]$ (seulement pour $f$ à valeurs réelles et $n=1$).

**Démonstration (esquisse) :**
Poser $\varphi(t) = f(a + t(b-a))$. Alors $\varphi'(t) = df(a + t(b-a)) \cdot (b-a)$.
$f(b) - f(a) = \varphi(1) - \varphi(0) = \int_0^1 \varphi'(t) dt$.
Majorer en norme : $\|f(b) - f(a)\| \le \int_0^1 \|\varphi'(t)\| dt \le \sup_t \|df(\dots)\| \cdot \|b-a\|$.

### 
**Subtilités :**
*   La convexité de $U$ (ou l'inclusion du segment $[a, b]$ dans $U$) est cruciale. Sur un ouvert non convexe, le chemin rectiligne peut sortir du domaine.
*   L'égalité des accroissements finis ($\exists c, f(b) - f(a) = f'(c)(b-a)$) est fausse pour $f$ à valeurs vectorielles : considérer $f(t) = e^{it}$ sur $[0, 2\pi]$.
*   En revanche, l'inégalité reste vraie pour $f : U \subset \mathbb{R}^n \to E$ avec $E$ evn quelconque (même de dimension infinie).

**Pièges classiques :**
*   Appliquer le TAF (égalité) à une fonction à valeurs vectorielles.
*   Oublier que la norme de la différentielle est une norme d'opérateur.

---

## FLASHCARD 97 — Proposition 27 : Caractérisation des fonctions constantes

### RECTO
**Caractérisation des fonctions constantes sur un connexe**

Soit $U$ un ouvert connexe de $\mathbb{R}^n$ et $f : U \to \mathbb{R}^p$ de classe $C^1$.

**Question :** Énoncer la caractérisation de la constance de $f$ par sa différentielle.

### VERSO
**Hypothèses :**
*   $U$ ouvert connexe de $\mathbb{R}^n$ (connexe par arcs revient au même pour un ouvert)
*   $f : U \to \mathbb{R}^p$ de classe $C^1$

**Conclusion :**
$$ f \text{ est constante sur } U \iff \forall x \in U, df(x) = 0 $$
(i.e. toutes les dérivées partielles de toutes les composantes sont nulles sur $U$)

**Démonstration (esquisse) :**
*   $(\Rightarrow)$ : trivial.
*   $(\Leftarrow)$ : Soit $a \in U$ fixé. L'ensemble $\{x \in U : f(x) = f(a)\}$ est fermé (par continuité) et ouvert (car si $df=0$, par l'IAF, $f$ est localement constante). Comme $U$ est connexe et cet ensemble est non vide (contient $a$), il est égal à $U$.
*   Alternative (sur un ouvert convexe) : on utilise directement l'IAF avec $M=0$.

### 
**Subtilités :**
*   La connexité est essentielle : sur $U = ]-2, -1[ \cup ]1, 2[$, la fonction valant $0$ sur la première composante et $1$ sur la seconde a $df=0$ mais n'est pas constante.
*   Pour un ouvert de $\mathbb{R}^n$, connexe $\iff$ connexe par arcs.

**Extensions :**
*   Deux fonctions $C^1$ ayant la même différentielle sur un ouvert connexe diffèrent d'une constante.

**Pièges classiques :**
*   Oublier l'hypothèse de connexité.
*   Confondre « toutes les dérivées partielles nulles » et « la différentielle nulle » : c'est la même chose si $f$ est différentiable, mais l'existence des dérivées partielles seule ne suffit pas.

---

## FLASHCARD 98 — Proposition 28 : Difféomorphisme et inverse local

### RECTO
**Différentielle d'un difféomorphisme et condition nécessaire**

Soit $U, V$ ouverts de $\mathbb{R}^n$, et $f : U \to V$ un difféomorphisme de classe $C^1$.

**Question :** Que peut-on dire de $df(a)$ pour tout $a \in U$ ? Donner la formule de la différentielle de $f^{-1}$.

### VERSO
**Hypothèses :**
*   $U, V$ ouverts de $\mathbb{R}^n$
*   $f : U \to V$ bijection de classe $C^1$, $f^{-1} : V \to U$ de classe $C^1$ (i.e. $f$ est un $C^1$-difféomorphisme)

**Conclusion :**
Pour tout $a \in U$, $df(a) \in \mathcal{L}(\mathbb{R}^n)$ est un isomorphisme (i.e. $\det J_f(a) \neq 0$), et :
$$ d(f^{-1})(f(a)) = [df(a)]^{-1} $$

En termes de matrices jacobiennes :
$$ J_{f^{-1}}(f(a)) = [J_f(a)]^{-1} $$

**Démonstration :**
Appliquer la règle de la chaîne à $f^{-1} \circ f = Id_U$ :
$$ d(f^{-1})(f(a)) \circ df(a) = Id_{\mathbb{R}^n} $$
De même avec $f \circ f^{-1} = Id_V$. Donc $df(a)$ est inversible.

### 
**Subtilités :**
*   C'est une condition nécessaire. La réciproque (théorème d'inversion locale) affirme que si $f$ est $C^1$ et $df(a)$ est inversible, alors $f$ est un $C^1$-difféomorphisme local au voisinage de $a$. (Ce théorème est selon les programmes hors programme en MP, mais l'énoncé est à connaître.)
*   Si $f$ est $C^k$, alors $f^{-1}$ est aussi $C^k$.

**Pièges classiques :**
*   Croire que $df(a)$ inversible implique que $f$ est un difféomorphisme global : c'est faux ($\exp : \mathbb{R} \to \mathbb{R}_+^*$ est un difféomorphisme global, mais $t \mapsto e^{it}$ de $\mathbb{R}$ dans $S^1$ ne l'est pas).
*   Oublier que le théorème d'inversion locale ne donne qu'un résultat local.

---

## FLASHCARD 99 — Théorème 43 : Optimisation sous contrainte (multiplicateurs de Lagrange)

### RECTO
**Théorème des multiplicateurs de Lagrange**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ et $g_1, \dots, g_p : U \to \mathbb{R}$ de classe $C^1$, avec $p < n$.

**Question :** Énoncer la condition nécessaire d'extremum local de $f$ sous les contraintes $g_1 = \dots = g_p = 0$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$, $\mathbb{K} = \mathbb{R}$
*   $f, g_1, \dots, g_p : U \to \mathbb{R}$ de classe $C^1$, avec $p < n$
*   $a \in U$ tel que $g_1(a) = \dots = g_p(a) = 0$
*   **Condition de qualification :** les formes linéaires $dg_1(a), \dots, dg_p(a)$ sont linéairement indépendantes (i.e. la matrice jacobienne $(\nabla g_1(a) \mid \dots \mid \nabla g_p(a))$ est de rang $p$)
*   $f$ admet un extremum local en $a$ sur l'ensemble $\Gamma = \{x \in U : g_1(x) = \dots = g_p(x) = 0\}$

**Conclusion :**
Il existe des scalaires $\lambda_1, \dots, \lambda_p \in \mathbb{R}$ (les multiplicateurs de Lagrange) tels que :
$$ df(a) = \lambda_1 dg_1(a) + \dots + \lambda_p dg_p(a) $$
Autrement dit :
$$ \nabla f(a) = \lambda_1 \nabla g_1(a) + \dots + \lambda_p \nabla g_p(a) $$

On a donc $n+p$ équations (les $n$ composantes de la relation ci-dessus, plus les $p$ contraintes $g_k(a) = 0$) pour $n+p$ inconnues ($a_1, \dots, a_n, \lambda_1, \dots, \lambda_p$).

**Démonstration (esquisse) :**
Par le théorème des fonctions implicites (ou un argument de rang), la contrainte $\Gamma$ est localement une sous-variété de dimension $n-p$, et le noyau $\ker(dg_1(a), \dots, dg_p(a))$ est l'espace tangent à $\Gamma$ en $a$.
Pour tout vecteur $h$ tangent à $\Gamma$ en $a$, on a $df(a) \cdot h = 0$ (condition nécessaire d'extremum sur $\Gamma$).
Donc $df(a)$ s'annule sur $\ker(dg_1(a), \dots, dg_p(a))$, ce qui signifie que $df(a) \in \text{Vect}(dg_1(a), \dots, dg_p(a))$.

### 
**Subtilités :**
*   La condition de qualification (indépendance des $dg_k(a)$) est indispensable. Sans elle, la conclusion peut être fausse.
*   Le théorème donne une condition nécessaire, pas suffisante. Un point vérifiant les conditions de Lagrange est un point critique mais pas nécessairement un extremum.
*   Les multiplicateurs $\lambda_k$ sont uniques (grâce à l'indépendance des $dg_k(a)$).

**Extensions :**
*   On peut ajouter des contraintes d'inégalité : conditions de Karush-Kuhn-Tucker (hors programme MP).
*   Pour une seule contrainte ($p=1$), la condition se réduit à $\nabla f(a) = \lambda \nabla g(a)$, c'est-à-dire que les lignes de niveau de $f$ et $g$ sont tangentes en $a$.

**Pièges classiques :**
*   Oublier la condition de qualification et perdre tous les points.
*   Oublier de vérifier que le point trouvé est bien un extremum (et pas un col).
*   Se tromper dans le comptage : $p$ contraintes, $p$ multiplicateurs, et il faut $p < n$.
*   Confondre « les gradients sont colinéaires » (cas $p=1$) et « les gradients sont égaux ».

---

## FLASHCARD 100 — Théorème 44 : Théorème de Schwarz

### RECTO
**Théorème de Schwarz**

Soit $U$ un ouvert de $\mathbb{R}^n$ et $f : U \to \mathbb{R}$.

**Question :** Sous quelles hypothèses les dérivées partielles croisées de $f$ commutent-elles ? Énoncer le théorème.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$ (ou plus généralement $f : U \to \mathbb{R}^p$, composante par composante)
*   $f$ est de classe $C^2$ sur $U$ (il suffit que les dérivées partielles secondes $\frac{\partial^2 f}{\partial x_i \partial x_j}$ et $\frac{\partial^2 f}{\partial x_j \partial x_i}$ existent et soient continues sur $U$)

**Conclusion :**
$$ \forall a \in U, \forall (i, j) \in \{1, \dots, n\}^2, \quad \frac{\partial^2 f}{\partial x_i \partial x_j}(a) = \frac{\partial^2 f}{\partial x_j \partial x_i}(a) $$

Plus généralement, si $f$ est $C^k$, les dérivées partielles d'ordre $\le k$ ne dépendent pas de l'ordre de dérivation.

**Démonstration (esquisse, cas $n=2$) :**
Considérer $\Delta(s, t) = f(a_1+s, a_2+t) - f(a_1+s, a_2) - f(a_1, a_2+t) + f(a_1, a_2)$.
Appliquer le TAF en $s$ puis en $t$ (ou inversement) : on obtient $\Delta(s, t) = st \frac{\partial^2 f}{\partial x_1 \partial x_2}(c_1)$ d'un côté, et $\Delta(s, t) = st \frac{\partial^2 f}{\partial x_2 \partial x_1}(c_2)$ de l'autre.
Passer à la limite $(s, t) \to (0, 0)$ en utilisant la continuité des dérivées secondes.

### 
**Subtilités :**
*   L'hypothèse minimale classique est : les deux dérivées partielles secondes croisées existent au voisinage de $a$ et l'une d'elles est continue en $a$. Alors elles sont égales en $a$. En pratique, en MP, on travaille avec des fonctions $C^2$, ce qui est plus confortable.
*   Le théorème est faux sans hypothèse de continuité des dérivées secondes : il existe un contre-exemple classique.
*   **Contre-exemple :** $f(x, y) = \frac{xy(x^2-y^2)}{x^2+y^2}$ si $(x, y) \neq (0, 0)$ et $0$ sinon. On a $\frac{\partial^2 f}{\partial x \partial y}(0, 0) = 1 \neq -1 = \frac{\partial^2 f}{\partial y \partial x}(0, 0)$.

**Pièges classiques :**
*   Appliquer Schwarz sans vérifier la régularité $C^2$.
*   En concours, Schwarz est souvent utilisé implicitement : attention à bien le mentionner.

---

## FLASHCARD 101 — Proposition 29 : Formule de Taylor-Young à l'ordre 2 (plusieurs variables)

### RECTO
**Formule de Taylor-Young à l'ordre 2 (fonctions de plusieurs variables)**

Soit $U$ un ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^2$, $a \in U$.

**Question :** Énoncer le développement de Taylor-Young de $f$ à l'ordre 2 en $a$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$
*   $f : U \to \mathbb{R}$ de classe $C^2$
*   $a \in U$, $h = (h_1, \dots, h_n) \in \mathbb{R}^n$

**Conclusion :**
$$ f(a+h) = f(a) + \sum_{i=1}^n \frac{\partial f}{\partial x_i}(a) h_i + \frac{1}{2} \sum_{i=1}^n \sum_{j=1}^n \frac{\partial^2 f}{\partial x_i \partial x_j}(a) h_i h_j + o(\|h\|^2) $$

Soit, en notation compacte :
$$ f(a+h) = f(a) + df(a) \cdot h + \frac{1}{2} d^2f(a) \cdot (h, h) + o(\|h\|^2) $$

où $d^2f(a)$ est la forme bilinéaire symétrique (par Schwarz) de matrice la hessienne :
$$ H_f(a) = \left( \frac{\partial^2 f}{\partial x_i \partial x_j}(a) \right)_{1 \le i, j \le n} $$

**Démonstration (esquisse) :**
Appliquer Taylor-Young en une variable à $\varphi(t) = f(a+th)$, qui est $C^2$ au voisinage de $0$ :
$\varphi(1) = \varphi(0) + \varphi'(0) + \frac{1}{2} \varphi''(0) + o(1)$
puis exprimer $\varphi'(0)$ et $\varphi''(0)$ en termes des dérivées partielles de $f$ (règle de la chaîne).

### 
**Subtilités :**
*   La hessienne est symétrique par le théorème de Schwarz.
*   Le terme quadratique $\frac{1}{2} d^2f(a) \cdot (h, h) = \frac{1}{2} {}^t h H_f(a) h$ est la forme quadratique associée à la hessienne.
*   La formule est un DL à l'ordre 2, avec un reste en $o(\|h\|^2)$, quelle que soit la norme choisie.

**Pièges classiques :**
*   Oublier le facteur $1/2$ devant le terme quadratique.
*   Confondre $d^2f(a) \cdot (h, h)$ (forme bilinéaire évaluée en $(h, h)$) avec $d^2f(a) \cdot h$ (qui n'a pas de sens : $d^2f(a)$ est bilinéaire, pas linéaire).
*   Écrire le développement sans préciser que $h \to 0$ dans $\mathbb{R}^n$.

---

## FLASHCARD 102 — Théorème 45 : Condition d'extremum local d'ordre 2

### RECTO
**Condition suffisante d'extremum local d'ordre 2 (fonctions de plusieurs variables)**

Soit $U$ ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^2$, $a \in U$ un point critique ($df(a) = 0$).

**Question :** Énoncer les conditions suffisantes de minimum local, maximum local, et la condition de point selle, en termes de la hessienne $H_f(a)$.

### VERSO
**Hypothèses :**
*   $U$ ouvert de $\mathbb{R}^n$, $f : U \to \mathbb{R}$ de classe $C^2$
*   $a \in U$, $df(a) = 0$ (point critique)
*   $H_f(a) = (\frac{\partial^2 f}{\partial x_i \partial x_j}(a))$ la matrice hessienne

**Conclusions :**
*   Si $H_f(a)$ est **définie positive** ($\forall h \neq 0, {}^t h H_f(a) h > 0$) : $f$ admet un **minimum local strict** en $a$.
*   Si $H_f(a)$ est **définie négative** : $f$ admet un **maximum local strict** en $a$.
*   Si $H_f(a)$ est **non dégénérée et indéfinie** (a des valeurs propres de signes différents) : $a$ est un **point selle** (pas d'extremum local).
*   Si $H_f(a)$ est semi-définie (positive ou négative) mais pas définie : on ne peut pas conclure (le terme d'ordre 2 ne suffit pas).

**Démonstration (esquisse) :**
Par Taylor-Young : $f(a+h) - f(a) = \frac{1}{2} {}^t h H_f(a) h + o(\|h\|^2)$.
Si $H_f(a) \succ 0$ : par compacité de la sphère unité, $\min_{\|h\|=1} {}^t h H_f(a) h = \alpha > 0$, donc ${}^t h H_f(a) h \ge \alpha \|h\|^2$, et pour $\|h\|$ assez petit, $f(a+h) - f(a) \ge \frac{\alpha}{4} \|h\|^2 > 0$.

### 
**Subtilités :**
*   En dimension $n=2$, $H_f(a) = \begin{pmatrix} r & s \\ s & t \end{pmatrix}$ : définie positive $\iff r > 0$ et $rt - s^2 > 0$. Point selle $\iff rt - s^2 < 0$.
*   Le cas $rt - s^2 = 0$ est dégénéré : il faut aller à l'ordre supérieur.
*   Le critère utilise que la hessienne est symétrique (par Schwarz), donc elle est diagonalisable à valeurs propres réelles.

**Pièges classiques :**
*   Oublier de vérifier $df(a) = 0$ avant d'utiliser le critère d'ordre 2.
*   Confondre « semi-définie positive » (on ne conclut pas) et « définie positive » (minimum local).
*   En dimension $n=2$, ne vérifier que $rt - s^2 > 0$ sans vérifier le signe de $r$ (ou $t$).
*   Croire que $H_f(a) \succ 0$ implique un minimum global : c'est faux (seulement local).

---

# CHAPITRE 10 — Arithmétique

## FLASHCARD 103 — À connaître 27 : Arithmétique dans $\mathbb{Z}$ (division euclidienne, PGCD, Bézout)

### RECTO
**Arithmétique fondamentale dans $\mathbb{Z}$**

**Question :** Rappeler la division euclidienne dans $\mathbb{Z}$, la notion de PGCD, et le théorème de Bézout dans $\mathbb{Z}$.

### VERSO
**Division euclidienne dans $\mathbb{Z}$ :**
$\forall (a, b) \in \mathbb{Z} \times \mathbb{Z}^*, \exists! (q, r) \in \mathbb{Z}^2$ tel que :
$$ a = bq + r, \quad 0 \le r < |b| $$

**PGCD :**
Pour $a, b \in \mathbb{Z}$ non tous deux nuls, $\text{pgcd}(a, b)$ est le plus grand diviseur commun (positif) de $a$ et $b$. On le calcule par l'algorithme d'Euclide.
On a : $\text{pgcd}(a, b) = \text{pgcd}(b, a \pmod b)$.

**Théorème de Bézout :**
$$ \text{pgcd}(a, b) = d \iff \exists (u, v) \in \mathbb{Z}^2, au + bv = d $$
En particulier, $a$ et $b$ sont premiers entre eux ($\text{pgcd}(a, b) = 1$) si et seulement si $\exists (u, v) \in \mathbb{Z}^2, au + bv = 1$.

**Lemme de Gauss :**
Si $a \mid bc$ et $\text{pgcd}(a, b) = 1$, alors $a \mid c$.

### 
**Subtilités :**
*   Le PGCD est défini comme un entier $\ge 0$ par convention.
*   Bézout donne des coefficients $u, v$ qui ne sont pas uniques.
*   L'algorithme d'Euclide étendu fournit explicitement les coefficients de Bézout.

**Pièges classiques :**
*   Confondre « $a \mid b$ et $a \mid c$ » avec « $a \mid bc$ » (la seconde est plus faible).
*   Oublier la condition « non tous deux nuls » pour le PGCD.

---

## FLASHCARD 104 — Théorème 46 : Petit théorème de Fermat

### RECTO
**Petit théorème de Fermat**

Soit $p$ un nombre premier et $a \in \mathbb{Z}$.

**Question :** Énoncer le petit théorème de Fermat (deux versions).

### VERSO
**Hypothèses :**
*   $p$ premier
*   $a \in \mathbb{Z}$

**Version 1 :**
$$ a^p \equiv a \pmod p $$

**Version 2 (si $p \nmid a$) :**
$$ a^{p-1} \equiv 1 \pmod p $$

**Démonstration (esquisse) :**
$\mathbb{Z}/p\mathbb{Z}$ est un corps (car $p$ premier), donc $(\mathbb{Z}/p\mathbb{Z})^* = \mathbb{Z}/p\mathbb{Z} \setminus \{0\}$ est un groupe de cardinal $p-1$.
Par le théorème de Lagrange (pour les groupes finis) : l'ordre de tout élément divise $p-1$, donc $\bar{a}^{p-1} = \bar{1}$ pour $\bar{a} \neq \bar{0}$.
Alternative : Par récurrence sur $a$ en utilisant $(a+1)^p \equiv a^p + 1 \pmod p$ (les coefficients binomiaux $\binom{p}{k}$ sont divisibles par $p$ pour $1 \le k \le p-1$).

### 
**Subtilités :**
*   La version 1 est valable même si $p \mid a$ (les deux côtés sont congrus à 0).
*   La réciproque est fausse : il existe des nombres composés $n$ tels que $a^n \equiv a \pmod n$ pour tout $a$ (nombres de Carmichael).
*   Fermat permet de calculer des inverses dans $\mathbb{Z}/p\mathbb{Z}$ : $a^{-1} \equiv a^{p-2} \pmod p$.

**Pièges classiques :**
*   Appliquer Fermat avec un exposant $p$ alors que le module n'est pas premier.
*   Oublier l'hypothèse $p \nmid a$ dans la version 2.

---

## FLASHCARD 105 — Théorème 47 : Isomorphisme chinois (théorème des restes chinois)

### RECTO
**Théorème des restes chinois (isomorphisme chinois)**

Soient $n_1, \dots, n_k \in \mathbb{N}^*$ deux à deux premiers entre eux, et $N = n_1 \dots n_k$.

**Question :** Énoncer l'isomorphisme chinois dans $\mathbb{Z}/N\mathbb{Z}$.

### VERSO
**Hypothèses :**
*   $n_1, \dots, n_k \in \mathbb{N}_{\ge 2}$, deux à deux premiers entre eux ($\forall i \neq j, \text{pgcd}(n_i, n_j) = 1$)
*   $N = n_1 n_2 \dots n_k$

**Conclusion :**
L'application :
$$ \varphi : \mathbb{Z}/N\mathbb{Z} \to \mathbb{Z}/n_1\mathbb{Z} \times \dots \times \mathbb{Z}/n_k\mathbb{Z} $$
$$ \bar{x} \mapsto (\bar{x}_1, \dots, \bar{x}_k) \quad (\text{réductions modulo } n_i) $$
est un isomorphisme d'anneaux.

**Conséquences :**
*   Pour tout $(a_1, \dots, a_k) \in \mathbb{Z}^k$, le système $x \equiv a_i \pmod{n_i}$ pour $i=1, \dots, k$ admet une solution, unique modulo $N$.
*   Isomorphisme de groupes multiplicatifs : $(\mathbb{Z}/N\mathbb{Z})^* \cong (\mathbb{Z}/n_1\mathbb{Z})^* \times \dots \times (\mathbb{Z}/n_k\mathbb{Z})^*$.
*   En particulier : $\varphi(N) = \varphi(n_1) \dots \varphi(n_k)$ (multiplicativité de l'indicatrice d'Euler).

**Démonstration (esquisse) :**
*   $\varphi$ est un morphisme d'anneaux (évident).
*   $\ker \varphi = \{x \in \mathbb{Z}/N\mathbb{Z} : n_i \mid x \ \forall i\} = \{0\}$ car les $n_i$ sont premiers entre eux deux à deux, donc $N \mid x$.
*   $|\mathbb{Z}/N\mathbb{Z}| = N = n_1 \dots n_k = |\prod \mathbb{Z}/n_i\mathbb{Z}|$, donc $\varphi$ est bijectif.

### 
**Subtilités :**
*   L'hypothèse « deux à deux premiers entre eux » est strictement plus forte que « de PGCD global 1 ». Exemple : 6, 10, 15 ont $\text{pgcd}(6, 10, 15)=1$ mais ne sont pas deux à deux premiers entre eux.
*   Le CRT s'applique aussi dans des anneaux principaux (ex : $K[X]$) : si $P_1, \dots, P_k$ sont deux à deux premiers entre eux, $K[X]/(P_1 \dots P_k) \cong \prod K[X]/(P_i)$.

**Pièges classiques :**
*   Oublier la condition « deux à deux premiers entre eux ».
*   Confondre isomorphisme d'anneaux et isomorphisme de groupes.
*   Oublier que l'isomorphisme donne aussi la multiplicativité de $\varphi$ d'Euler.

---

## FLASHCARD 106 — Proposition 30 : Indicatrice d'Euler

### RECTO
**Indicatrice d'Euler**

**Question :** Définir l'indicatrice d'Euler $\varphi(n)$. Donner sa formule en fonction de la décomposition en facteurs premiers. Énoncer sa propriété de multiplicativité.

### VERSO
**Définition :**
Pour $n \ge 1$ :
$$ \varphi(n) = \#\{k \in \{1, \dots, n\} : \text{pgcd}(k, n) = 1\} = |(\mathbb{Z}/n\mathbb{Z})^*| $$

**Formule :**
Si $n = p_1^{\alpha_1} \dots p_r^{\alpha_r}$ est la décomposition en facteurs premiers :
$$ \varphi(n) = n \prod_{i=1}^r \left( 1 - \frac{1}{p_i} \right) = \prod_{i=1}^r p_i^{\alpha_i - 1} (p_i - 1) $$

**Multiplicité :**
Si $\text{pgcd}(m, n) = 1$, alors $\varphi(mn) = \varphi(m) \varphi(n)$.
(C'est une conséquence directe du CRT.)

**Formule de sommation :**
$$ \sum_{d \mid n} \varphi(d) = n $$

**Cas particuliers :**
$\varphi(1) = 1$, $\varphi(p) = p-1$, $\varphi(p^k) = p^{k-1}(p-1)$ pour $p$ premier.

### 
**Subtilités :**
*   La multiplicativité de $\varphi$ n'est valable que pour des entiers premiers entre eux. $\varphi$ n'est pas complètement multiplicative.
*   La formule $\sum_{d \mid n} \varphi(d) = n$ se démontre en partitionnant $\{1, \dots, n\}$ selon $\text{pgcd}(k, n)$.

**Pièges classiques :**
*   Écrire $\varphi(mn) = \varphi(m)\varphi(n)$ sans vérifier $\text{pgcd}(m, n) = 1$.
*   Confondre $\varphi(p^k) = p^{k-1}(p-1)$ avec $p^k-1$.

---

## FLASHCARD 107 — Théorème 48 : Théorème d'Euler

### RECTO
**Théorème d'Euler**

Soit $n \ge 2$ un entier et $a \in \mathbb{Z}$ tel que $\text{pgcd}(a, n) = 1$.

**Question :** Énoncer le théorème d'Euler.

### VERSO
**Hypothèses :**
*   $n \ge 2$ entier
*   $a \in \mathbb{Z}$, $\text{pgcd}(a, n) = 1$

**Conclusion :**
$$ a^{\varphi(n)} \equiv 1 \pmod n $$

**Démonstration :**
$(\mathbb{Z}/n\mathbb{Z})^*$ est un groupe multiplicatif de cardinal $\varphi(n)$. Par le théorème de Lagrange, l'ordre de $\bar{a}$ divise $\varphi(n)$, donc $\bar{a}^{\varphi(n)} = \bar{1}$.

### 
**Subtilités :**
*   Le petit théorème de Fermat est le cas particulier $n=p$ premier (et $\varphi(p) = p-1$).
*   L'exposant $\varphi(n)$ n'est en général pas le plus petit exposant universel. Le plus petit $\lambda$ tel que $a^\lambda \equiv 1 \pmod n$ pour tout $a$ premier à $n$ est la fonction de Carmichael $\lambda(n)$, qui divise $\varphi(n)$.

**Pièges classiques :**
*   Appliquer le théorème d'Euler sans vérifier $\text{pgcd}(a, n) = 1$.
*   Confondre l'ordre d'un élément avec $\varphi(n)$ : $\varphi(n)$ est un multiple de l'ordre, pas nécessairement l'ordre lui-même.

---

## FLASHCARD 108 — À connaître 28 : Existence et nombre de racines primitives

### RECTO
**Racines primitives modulo $n$**

**Question :** Pour quels entiers $n \ge 2$ le groupe $(\mathbb{Z}/n\mathbb{Z})^*$ est-il cyclique ? Qu'appelle-t-on alors une racine primitive ?

### VERSO
**Définition :**
Un élément $g \in (\mathbb{Z}/n\mathbb{Z})^*$ est une racine primitive modulo $n$ si $g$ engendre $(\mathbb{Z}/n\mathbb{Z})^*$, i.e. $\text{ord}(g) = \varphi(n)$.

**Théorème :**
$(\mathbb{Z}/n\mathbb{Z})^*$ est cyclique si et seulement si $n \in \{1, 2, 4, p^k, 2p^k\}$ où $p$ est un premier impair et $k \ge 1$.

**Nombre de racines primitives :**
Quand $(\mathbb{Z}/n\mathbb{Z})^*$ est cyclique, il y a exactement $\varphi(\varphi(n))$ racines primitives modulo $n$.

### 
**Subtilités :**
*   $(\mathbb{Z}/8\mathbb{Z})^* \cong \mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/2\mathbb{Z}$ n'est pas cyclique.
*   $(\mathbb{Z}/p\mathbb{Z})^*$ est toujours cyclique pour $p$ premier : c'est le cas le plus important en MP.
*   La preuve que $(\mathbb{Z}/p\mathbb{Z})^*$ est cyclique repose sur le fait que dans un corps, un polynôme de degré $d$ a au plus $d$ racines, et on compte les éléments d'ordre $d$ pour chaque $d \mid p-1$.

**Pièges classiques :**
*   Croire que $(\mathbb{Z}/n\mathbb{Z})^*$ est toujours cyclique.
*   Confondre « il existe un élément d'ordre $\varphi(n)$ » (racine primitive) avec « tout élément est d'ordre $\varphi(n)$ ».

---

## FLASHCARD 109 — À connaître 29 : Formule de Legendre

### RECTO
**Formule de Legendre (valuation $p$-adique de $n!$)**

Soit $p$ un nombre premier et $n \in \mathbb{N}^*$.

**Question :** Donner la formule de Legendre pour $v_p(n!)$ (la valuation $p$-adique de $n!$).

### VERSO
**Formule :**
$$ v_p(n!) = \sum_{k=1}^{+\infty} \left\lfloor \frac{n}{p^k} \right\rfloor $$
La somme est finie (les termes sont nuls dès que $p^k > n$).

**Formule alternative :**
$$ v_p(n!) = \frac{n - s_p(n)}{p-1} $$
où $s_p(n)$ est la somme des chiffres de $n$ en base $p$.

**Démonstration (esquisse) :**
$v_p(n!) = \sum_{j=1}^n v_p(j)$. Pour chaque $k \ge 1$, le nombre d'entiers $j \in \{1, \dots, n\}$ divisibles par $p^k$ est $\lfloor n/p^k \rfloor$. En échangeant les sommations, on obtient la formule.

### 
**Subtilités :**
*   La formule alternative avec $s_p(n)$ est parfois plus pratique pour des estimations asymptotiques.
*   Utile pour déterminer si $\binom{n}{k}$ est divisible par $p$ : $v_p(\binom{n}{k}) = \frac{s_p(k) + s_p(n-k) - s_p(n)}{p-1}$ (théorème de Kummer).

**Applications classiques :**
*   Montrer que $\binom{2n}{n}$ est pair pour $n \ge 1$.
*   Calculer la puissance exacte de $p$ divisant $\binom{n}{k}$.

**Pièges classiques :**
*   Oublier que la somme est finie.
*   Confondre $\lfloor n/p^k \rfloor$ avec $n/p^k$ (oublier la partie entière).

---

## FLASHCARD 110 — Proposition 31 : Groupes monogènes / cycliques

### RECTO
**Classification des groupes monogènes**

**Question :** Rappeler la classification des groupes monogènes (engendrés par un seul élément). Distinguer le cas fini et le cas infini.

### VERSO
**Définition :**
Un groupe $G$ est monogène s'il existe $g \in G$ tel que $G = \langle g \rangle = \{g^n : n \in \mathbb{Z}\}$ (notation multiplicative). Si $G$ est monogène et fini, on dit que $G$ est cyclique.

**Classification :**
*   Si $G$ est monogène infini : $G \cong (\mathbb{Z}, +)$.
*   Si $G$ est monogène fini de cardinal $n$ : $G \cong (\mathbb{Z}/n\mathbb{Z}, +)$.

**Propriétés des groupes cycliques $\mathbb{Z}/n\mathbb{Z}$ :**
*   Les sous-groupes de $\mathbb{Z}/n\mathbb{Z}$ sont les $\langle \bar{d} \rangle$ pour $d \mid n$, isomorphes à $\mathbb{Z}/(n/d)\mathbb{Z}$. Il y a exactement un sous-groupe d'ordre $d$ pour chaque diviseur $d$ de $n$.
*   Les générateurs de $\mathbb{Z}/n\mathbb{Z}$ sont les $\bar{k}$ avec $\text{pgcd}(k, n) = 1$, au nombre de $\varphi(n)$.

### 
**Subtilités :**
*   Un sous-groupe d'un groupe cyclique est cyclique.
*   Un quotient d'un groupe cyclique est cyclique.
*   Tout groupe d'ordre premier est cyclique (par Lagrange).

**Pièges classiques :**
*   Confondre « monogène » et « cyclique » (le second est le cas fini du premier, selon la convention la plus courante en France).
*   Oublier l'unicité du sous-groupe d'ordre $d$ pour $d \mid n$.

---

## FLASHCARD 111 — À connaître 30 : Structure des groupes abéliens finis (programme MP — version simplifiée)

### RECTO
**Structure des groupes abéliens finis — cas au programme**

**Question :** Énoncer le résultat de décomposition d'un groupe abélien fini en produit de groupes cycliques d'ordres premiers entre eux (conséquence du CRT). Rappeler la condition pour qu'un produit de cycliques soit cyclique.

### VERSO
**Résultat :**
Soit $G$ un groupe abélien fini d'ordre $n = p_1^{\alpha_1} \dots p_r^{\alpha_r}$. Alors :
$$ G \cong G_{p_1} \times \dots \times G_{p_r} $$
où $G_{p_i}$ est le $p_i$-Sylow de $G$ (sous-groupe des éléments d'ordre une puissance de $p_i$), et $|G_{p_i}| = p_i^{\alpha_i}$.

**Condition pour qu'un produit soit cyclique :**
$$ \mathbb{Z}/m\mathbb{Z} \times \mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}/mn\mathbb{Z} \iff \text{pgcd}(m, n) = 1. $$

### 
**Pièges classiques :**
*   Croire que tout groupe abélien fini est cyclique : $\mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/2\mathbb{Z}$ est abélien d'ordre 4 mais non cyclique.
*   Le théorème complet de classification (facteurs invariants / décomposition primaire) est hors programme MP mais peut être utile conceptuellement.

---

## FLASHCARD 112 — Proposition 32 : Ordre d'un élément dans un groupe fini

### RECTO
**Ordre d'un élément dans un groupe fini**

Soit $G$ un groupe fini et $g \in G$.

**Question :** Définir l'ordre de $g$. Énoncer les propriétés fondamentales de l'ordre.

### VERSO
**Définition :**
L'ordre de $g$, noté $\text{ord}(g)$ ou $|g|$, est le plus petit entier $n \ge 1$ tel que $g^n = e$ (neutre).

**Propriétés :**
*   $g^k = e \iff \text{ord}(g) \mid k$.
*   $\text{ord}(g)$ divise $|G|$ (théorème de Lagrange).
*   $\text{ord}(g^k) = \frac{\text{ord}(g)}{\text{pgcd}(k, \text{ord}(g))}$.
*   Si $g$ et $h$ commutent et $\text{pgcd}(\text{ord}(g), \text{ord}(h)) = 1$, alors $\text{ord}(gh) = \text{ord}(g) \cdot \text{ord}(h)$.

### 
**Subtilités :**
*   La propriété 4 nécessite la commutativité et la coprimalité. Sans coprimalité, on a seulement $\text{ord}(gh) \mid \text{ppcm}(\text{ord}(g), \text{ord}(h))$.
*   En lien avec la réduction : si $A \in M_n(\mathbb{K})$ et $A^m = I_n$, alors le polynôme minimal de $A$ divise $X^m - 1$.

**Pièges classiques :**
*   Oublier la condition de commutativité dans la propriété 4.
*   Confondre « $g^k = e$ » avec « $\text{ord}(g) = k$ » : le premier dit seulement que $\text{ord}(g) \mid k$.

---

## FLASHCARD 113 — À connaître 31 : Théorème de Lagrange

### RECTO
**Théorème de Lagrange (pour les groupes finis)**

Soit $G$ un groupe fini et $H$ un sous-groupe de $G$.

**Question :** Énoncer le théorème de Lagrange.

### VERSO
**Hypothèses :**
*   $G$ groupe fini
*   $H$ sous-groupe de $G$

**Conclusion :**
$$ |H| \text{ divise } |G| $$
Plus précisément, l'indice $[G : H] = |G|/|H|$ est le nombre de classes à gauche (ou à droite) de $H$ dans $G$.

**Démonstration (esquisse) :**
Les classes à gauche $gH$ forment une partition de $G$, et chaque classe a le même cardinal $|H|$ (par bijectivité de $x \mapsto gx$). Donc $|G| = [G : H] \cdot |H|$.

**Corollaires :**
*   L'ordre de tout élément de $G$ divise $|G|$.
*   $\forall g \in G, g^{|G|} = e$.
*   Tout groupe d'ordre premier est cyclique.

### 
**Subtilités :**
*   La réciproque est fausse : si $d \mid |G|$, il n'existe pas nécessairement de sous-groupe d'ordre $d$ (contre-exemple : $\mathfrak{A}_4$ d'ordre 12 n'a pas de sous-groupe d'ordre 6). (La réciproque est vraie si $d$ est premier : théorème de Cauchy, hors programme strict MP mais bon à savoir.)

**Pièges classiques :**
*   Croire que Lagrange donne l'existence de sous-groupes de tout ordre divisant $|G|$.
*   Confondre « $|H|$ divise $|G|$ » avec « $H$ est distingué dans $G$ » (pas de lien).

---

## FLASHCARD 114 — Proposition 33 : Morphismes de groupes — propriétés fondamentales

### RECTO
**Morphismes de groupes**

Soit $\phi : G \to H$ un morphisme de groupes.

**Question :** Rappeler les propriétés fondamentales (image du neutre, image des inverses, image et noyau).

### VERSO
**Propriétés :**
*   $\phi(e_G) = e_H$.
*   $\forall g \in G, \phi(g^{-1}) = \phi(g)^{-1}$.
*   $\ker \phi = \{g \in G : \phi(g) = e_H\}$ est un sous-groupe distingué de $G$.
*   $\text{Im}(\phi) = \phi(G)$ est un sous-groupe de $H$.
*   $\phi$ est injectif $\iff \ker \phi = \{e_G\}$.
*   Si $G$ est fini : $|G| = |\ker \phi| \cdot |\text{Im}(\phi)|$ (formule analogue au théorème du rang).

**Premier théorème d'isomorphisme :**
$$ G/\ker \phi \cong \text{Im}(\phi) $$

### 
**Subtilités :**
*   Le noyau est distingué (invariant par conjugaison). L'image n'est en général pas distinguée dans $H$.
*   Le premier théorème d'isomorphisme est l'analogue du théorème du rang en algèbre linéaire.

**Pièges classiques :**
*   Écrire « $\phi$ bijectif $\iff \ker \phi = \{e\}$ et $\text{Im}\phi = H$ » : c'est vrai, mais en pratique on oublie souvent la surjectivité.
*   Pour les groupes non abéliens, $\ker \phi$ est distingué mais tout sous-groupe distingué n'est pas nécessairement un noyau... (en fait si, par la projection canonique).

---

## FLASHCARD 115 — Lemme 3 : Lemme de Gauss (arithmétique)

### RECTO
**Lemme de Gauss**

Soient $a, b, c \in \mathbb{Z}$.

**Question :** Énoncer le lemme de Gauss.

### VERSO
**Hypothèses :**
*   $a, b, c \in \mathbb{Z}$
*   $a \mid bc$
*   $\text{pgcd}(a, b) = 1$

**Conclusion :**
$$ a \mid c $$

**Démonstration :**
Par Bézout, $\exists u, v \in \mathbb{Z}, au + bv = 1$. Multiplier par $c$ : $acu + bcv = c$. Comme $a \mid acu$ et $a \mid bcv$ (car $a \mid bc$), on obtient $a \mid c$.

### 
**Subtilités :**
*   Le lemme de Gauss se généralise aux anneaux principaux (polynômes, entiers de Gauss...).
*   L'hypothèse $\text{pgcd}(a, b) = 1$ est essentielle : $6 \mid 4 \times 3$ mais $6 \nmid 4$ et $6 \nmid 3$.

**Applications :**
*   Preuve de l'unicité de la décomposition en facteurs premiers.
*   Critère d'irréductibilité.

**Pièges classiques :**
*   Oublier de vérifier la coprimalité.

---

## FLASHCARD 116 — Proposition 34 : Identité de Bézout dans $\mathbb{Z}$

### RECTO
**Théorème de Bézout (dans $\mathbb{Z}$)**

Soient $a, b \in \mathbb{Z}$ non tous deux nuls.

**Question :** Énoncer le théorème de Bézout (caractérisation du PGCD via combinaisons linéaires).

### VERSO
**Hypothèses :**
*   $a, b \in \mathbb{Z}, (a, b) \neq (0, 0)$
*   $d = \text{pgcd}(a, b)$

**Conclusion :**
$$ \exists (u, v) \in \mathbb{Z}^2, \quad au + bv = d $$

**Corollaire (Bézout pour la coprimalité) :**
$$ \text{pgcd}(a, b) = 1 \iff \exists (u, v) \in \mathbb{Z}^2, au + bv = 1 $$

**Démonstration :**
L'idéal $a\mathbb{Z} + b\mathbb{Z} = \{au + bv : (u, v) \in \mathbb{Z}^2\}$ est un idéal de $\mathbb{Z}$, donc principal : $a\mathbb{Z} + b\mathbb{Z} = d\mathbb{Z}$, où $d$ est le plus petit élément strictement positif.

### 
**Subtilités :**
*   Les coefficients de Bézout $(u, v)$ ne sont pas uniques.
*   Le théorème est constructif via l'algorithme d'Euclide étendu.

**Pièges classiques :**
*   Confondre « $d \mid a$ et $d \mid b$ » (définition de diviseur commun) avec « $d = au + bv$ » (Bézout) : le PGCD vérifie les deux.

---

## FLASHCARD 117 — Proposition 35 : Bézout dans $K[X]$

### RECTO
**Théorème de Bézout dans $K[X]$**

Soient $A, B \in K[X]$, non tous deux nuls.

**Question :** Énoncer le théorème de Bézout dans $K[X]$.

### VERSO
**Hypothèses :**
*   $K$ corps
*   $A, B \in K[X], (A, B) \neq (0, 0)$
*   $D = \text{pgcd}(A, B)$ (unitaire, par convention)

**Conclusion :**
$$ \exists (U, V) \in K[X]^2, \quad AU + BV = D $$

**Corollaire :**
$A$ et $B$ sont premiers entre eux si et seulement si $\exists (U, V) \in K[X]^2, AU + BV = 1$.

On peut de plus imposer $\deg U < \deg B$ et $\deg V < \deg A$ (unicité dans ce cas).

**Démonstration :**
$K[X]$ est un anneau principal (euclidien), donc l'idéal $(A) + (B)$ est principal, engendré par $D$.

### 
**Subtilités :**
*   $K[X]$ est euclidien (pour le degré), donc principal, donc Bézout y est valable.
*   Attention : $\mathbb{Z}[X]$ n'est pas principal, et Bézout sous cette forme n'y est pas valable.

**Pièges classiques :**
*   Oublier que le PGCD est défini à une constante multiplicative près, et que par convention on le prend unitaire.
*   Confondre les corps : sur $\mathbb{Q}[X]$, $\mathbb{R}[X]$, $\mathbb{C}[X]$, les PGCD peuvent différer si l'on change de corps.

---

## FLASHCARD 118 — Théorème 49 : Division euclidienne dans $K[X]$

### RECTO
**Division euclidienne dans $K[X]$**

Soient $A, B \in K[X]$ avec $B \neq 0$.

**Question :** Énoncer le théorème de division euclidienne.

### VERSO
**Hypothèses :**
*   $K$ corps
*   $A \in K[X], B \in K[X] \setminus \{0\}$

**Conclusion :**
$$ \exists! (Q, R) \in K[X]^2, \quad A = BQ + R, \quad \deg R < \deg B $$
(avec la convention $\deg 0 = -\infty$)

**Démonstration (esquisse) :**
Par récurrence (forte) sur $\deg A$ :
*   Si $\deg A < \deg B$ : $Q=0, R=A$.
*   Sinon : poser $A_1 = A - \frac{a_n}{b_m} X^{n-m} B$ (le terme dominant de $A_1$ est de degré $< n$), puis appliquer l'hypothèse de récurrence à $A_1$.

### 
**Subtilités :**
*   L'existence et l'unicité requièrent que $K$ soit un corps (ou au moins que le coefficient dominant de $B$ soit inversible). Sur $\mathbb{Z}[X]$, la division euclidienne n'est pas toujours possible.
*   La division euclidienne fait de $K[X]$ un anneau euclidien pour le stathme $\deg$.

**Pièges classiques :**
*   Oublier la condition $\deg R < \deg B$ (et non $\le$).
*   Sur $\mathbb{Z}[X]$ : tenter de diviser alors que le coefficient dominant de $B$ n'est pas inversible.

---

## FLASHCARD 119 — À connaître 32 : Racines et factorisation

### RECTO
**Racines et factorisation dans $K[X]$**

Soit $P \in K[X]$ de degré $n \ge 1$.

**Question :** Rappeler le lien entre racines et divisibilité. Combien de racines $P$ peut-il avoir au maximum ?

### VERSO
**Propriété fondamentale :**
$\alpha \in K$ est racine de $P$ si et seulement si $(X - \alpha) \mid P$ dans $K[X]$.

**Nombre de racines :**
$P$ a au plus $\deg P$ racines dans $K$ (comptées avec multiplicité).

**Multiplicité :**
$\alpha$ est racine de multiplicité $m$ si $(X - \alpha)^m \mid P$ et $(X - \alpha)^{m+1} \nmid P$.

Si $P$ est scindé sur $K$ :
$$ P = a \prod_{i=1}^r (X - \alpha_i)^{m_i}, \quad \sum m_i = \deg P $$

**Formules de Viète :**
Les fonctions symétriques élémentaires des racines s'expriment en termes des coefficients de $P$.

### 
**Subtilités :**
*   Le résultat « au plus $\deg P$ racines » est valable sur un corps. Sur un anneau non intègre (ex : $\mathbb{Z}/6\mathbb{Z}$), c'est faux : $X^2 - 1$ a 4 racines dans $\mathbb{Z}/8\mathbb{Z}$.
*   En corollaire : si $P, Q \in K[X]$, $\deg P, \deg Q \le n$, et $P$ et $Q$ coïncident en $n+1$ points, alors $P=Q$.

**Pièges classiques :**
*   Appliquer le résultat sur un anneau non intègre.
*   Oublier le « comptées avec multiplicité ».

---

## FLASHCARD 120 — À connaître 33 : Irréductibles de $\mathbb{R}[X]$ et $\mathbb{C}[X]$

### RECTO
**Polynômes irréductibles de $\mathbb{R}[X]$ et $\mathbb{C}[X]$**

**Question :** Décrire les polynômes irréductibles sur $\mathbb{C}$ puis sur $\mathbb{R}$.

### VERSO
**Sur $\mathbb{C}[X]$ :**
Les irréductibles sont exactement les polynômes de degré 1 : $aX + b$ avec $a \neq 0$.
(Conséquence du théorème de d'Alembert-Gauss.)

**Sur $\mathbb{R}[X]$ :**
Les irréductibles sont :
*   Les polynômes de degré 1 : $aX + b, a \neq 0$.
*   Les polynômes de degré 2 à discriminant strictement négatif : $aX^2 + bX + c$ avec $a \neq 0$ et $b^2 - 4ac < 0$.

**Factorisation dans $\mathbb{R}[X]$ :**
Tout $P \in \mathbb{R}[X]$ de degré $\ge 1$ s'écrit de manière unique (à l'ordre et aux constantes près) comme produit de polynômes de degré 1 et de polynômes de degré 2 à discriminant négatif.

### 
**Subtilités :**
*   Les racines complexes non réelles de $P \in \mathbb{R}[X]$ viennent par paires conjuguées : si $\alpha$ est racine, $\bar{\alpha}$ aussi, avec la même multiplicité. Le produit $(X-\alpha)(X-\bar{\alpha}) = X^2 - 2\text{Re}(\alpha)X + |\alpha|^2$ est le facteur irréductible de degré 2.

**Pièges classiques :**
*   Oublier qu'il n'y a pas d'irréductible de degré $\ge 3$ sur $\mathbb{R}$ : tout polynôme de degré impair $\ge 3$ a une racine réelle.
*   Confondre « irréductible sur $\mathbb{R}$ » et « irréductible sur $\mathbb{Q}$ ».

---

## FLASHCARD 121 — Théorème 50 : Théorème de d'Alembert-Gauss

### RECTO
**Théorème de d'Alembert-Gauss (théorème fondamental de l'algèbre)**

**Question :** Énoncer le théorème de d'Alembert-Gauss.

### VERSO
**Énoncé :**
Tout polynôme $P \in \mathbb{C}[X]$ de degré $n \ge 1$ possède exactement $n$ racines dans $\mathbb{C}$ (comptées avec multiplicité).

De manière équivalente : $\mathbb{C}$ est algébriquement clos, i.e. tout polynôme non constant à coefficients complexes admet au moins une racine dans $\mathbb{C}$.

De manière encore équivalente : tout $P \in \mathbb{C}[X]$ de degré $n \ge 1$ se factorise :
$$ P = a_n \prod_{i=1}^n (X - z_i), \quad z_i \in \mathbb{C} $$

**Démonstration :** Admise en MP. (Les preuves connues utilisent l'analyse : topologie de $\mathbb{C}$, théorie de Liouville, ou l'argument du minimum du module.)

### 
**Subtilités :**
*   $\mathbb{R}$ n'est pas algébriquement clos ($X^2 + 1$ n'a pas de racine réelle).
*   $\mathbb{Q}$ n'est pas algébriquement clos ($X^2 - 2$ n'a pas de racine rationnelle).
*   Le théorème ne donne pas de méthode pour calculer les racines (pas de formule générale en degré $\ge 5$, par Abel-Ruffini).

**Applications en algèbre linéaire :**
*   Tout endomorphisme d'un $\mathbb{C}$-espace vectoriel de dimension finie admet au moins une valeur propre.
*   Tout endomorphisme sur $\mathbb{C}$ est trigonalisable (car son polynôme caractéristique est scindé).

**Pièges classiques :**
*   Oublier « comptées avec multiplicité ».
*   Croire que le théorème donne un algorithme de calcul.

---

## FLASHCARD 122 — Proposition 36 : Caractérisation de la multiplicité d'une racine

### RECTO
**Caractérisation de la multiplicité d'une racine par les dérivées**

Soit $P \in K[X]$ et $\alpha \in K$.

**Question :** Caractériser la multiplicité de $\alpha$ comme racine de $P$ en termes des dérivées successives de $P$.

### VERSO
**Hypothèses :**
*   $K$ corps de caractéristique zéro (en pratique $\mathbb{Q}, \mathbb{R}$ ou $\mathbb{C}$)
*   $P \in K[X], \alpha \in K, m \ge 1$

**Conclusion :**
$\alpha$ est racine de multiplicité au moins $m$ de $P$ si et seulement si :
$$ P(\alpha) = P'(\alpha) = P''(\alpha) = \dots = P^{(m-1)}(\alpha) = 0 $$

$\alpha$ est racine de multiplicité exactement $m$ si de plus $P^{(m)}(\alpha) \neq 0$.

**Démonstration (esquisse) :**
Écrire $P(X) = (X - \alpha)^k Q(X)$ avec $Q(\alpha) \neq 0$. Par la formule de Leibniz :
$$ P^{(j)}(\alpha) = j! \binom{k}{j} Q(\alpha) \cdot [\text{si } j < k, \text{ alors } 0; \text{ si } j=k, \text{ alors } k! Q(\alpha)] $$
Plus rigoureusement, par la formule de Taylor pour les polynômes : $P(X) = \sum_{j=0}^n \frac{P^{(j)}(\alpha)}{j!} (X - \alpha)^j$.

### 
**Subtilités :**
*   L'hypothèse de caractéristique zéro est cruciale. En caractéristique $p$, $P(X) = X^p$ a $0$ comme racine de multiplicité $p$ mais $P'(X) = 0$ identiquement.
*   La formule de Taylor pour les polynômes est purement algébrique (pas de convergence à vérifier) et valide en toute caractéristique, mais la division par $j!$ requiert la caractéristique zéro.

**Pièges classiques :**
*   Oublier de vérifier la caractéristique du corps (peu probable en MP, mais important conceptuellement).
*   Confondre « $P^{(m)}(\alpha) = 0$ » avec « $\alpha$ est racine de $P^{(m)}$ de multiplicité $\ge 1$ ».

---

## FLASHCARD 123 — À connaître 34 : Critère de divisibilité (Eisenstein, ou autres)

### RECTO
**Critère d'irréductibilité d'Eisenstein**

Soit $P = a_n X^n + \dots + a_1 X + a_0 \in \mathbb{Z}[X]$.

**Question :** Énoncer le critère d'Eisenstein. Quand permet-il de conclure à l'irréductibilité sur $\mathbb{Q}$ ?

### VERSO
**Hypothèses :**
*   $P = a_n X^n + a_{n-1} X^{n-1} + \dots + a_0 \in \mathbb{Z}[X], n \ge 1$
*   Il existe un nombre premier $p$ tel que :
    *   $p \nmid a_n$ (le coefficient dominant n'est pas divisible par $p$)
    *   $p \mid a_i$ pour tout $i \in \{0, 1, \dots, n-1\}$
    *   $p^2 \nmid a_0$

**Conclusion :**
$P$ est irréductible dans $\mathbb{Q}[X]$ (et donc dans $\mathbb{Z}[X]$ par le lemme de Gauss sur le contenu).

**Démonstration (esquisse) :**
Supposer $P = QR$ dans $\mathbb{Z}[X]$ avec $\deg Q, \deg R \ge 1$. Réduire modulo $p$ : $\bar{P} = \bar{a}_n X^n$ dans $\mathbb{F}_p[X]$, donc $\bar{Q} = \bar{b}_s X^s$ et $\bar{R} = \bar{c}_r X^r$ (car $\mathbb{F}_p[X]$ est intègre). Cela force $p \mid q_0$ et $p \mid r_0$, donc $p^2 \mid a_0 = q_0 r_0$, contradiction avec l'hypothèse 3.

### 
**Subtilités :**
*   Eisenstein ne s'applique pas directement à tout polynôme. Parfois un changement de variable $X \leftarrow X+a$ rend le critère applicable (exemple classique : les polynômes cyclotomiques $\Phi_p(X) = \frac{X^p-1}{X-1}$, irréductibles via le changement $X \leftarrow X+1$).
*   Le lemme de Gauss (contenu) assure qu'un polynôme primitif de $\mathbb{Z}[X]$ irréductible dans $\mathbb{Z}[X]$ l'est dans $\mathbb{Q}[X]$.

**Applications classiques :**
*   $X^n - p$ est irréductible sur $\mathbb{Q}$ (Eisenstein avec $p$).
*   Polynômes cyclotomiques $\Phi_p$.

**Pièges classiques :**
*   Vérifier les trois conditions. Oublier $p^2 \nmid a_0$ est l'erreur la plus fréquente.
*   Eisenstein donne l'irréductibilité sur $\mathbb{Q}$, pas nécessairement sur $\mathbb{R}$ ou $\mathbb{C}$.

---

## FLASHCARD 124 — À connaître 35 : Relations coefficients-racines (Viète)

### RECTO
**Formules de Viète (relations coefficients-racines)**

Soit $P = a_n X^n + a_{n-1} X^{n-1} + \dots + a_0 \in K[X]$ scindé sur $K$, de racines $\alpha_1, \dots, \alpha_n$ (comptées avec multiplicité).

**Question :** Exprimer les fonctions symétriques élémentaires des racines en fonction des coefficients.

### VERSO
**Hypothèses :**
*   $P = a_n (X - \alpha_1)(X - \alpha_2) \dots (X - \alpha_n)$

**Formules de Viète :**
$$ \sigma_k := \sum_{1 \le i_1 < \dots < i_k \le n} \alpha_{i_1} \dots \alpha_{i_k} = (-1)^k \frac{a_{n-k}}{a_n} $$

En particulier :
*   $\alpha_1 + \dots + \alpha_n = -\frac{a_{n-1}}{a_n}$
*   $\sum_{i < j} \alpha_i \alpha_j = \frac{a_{n-2}}{a_n}$
*   $\alpha_1 \dots \alpha_n = (-1)^n \frac{a_0}{a_n}$

### 
**Subtilités :**
*   Les formules de Viète ne nécessitent pas de connaître les racines individuellement.
*   Les formules de Newton relient les sommes de puissances $p_k = \sum \alpha_i^k$ aux $\sigma_k$.
*   Viète est valable sur tout corps (pas besoin de caractéristique zéro).

**Pièges classiques :**
*   Oublier le facteur $(-1)^k$ ou la normalisation par $a_n$.
*   Appliquer Viète à un polynôme non scindé (les racines n'existent pas toutes dans $K$).

---

## FLASHCARD 125 — Proposition 37 : Polynôme dérivé et racines multiples

### RECTO
**Polynôme dérivé et racines multiples — polynôme sans racine multiple**

Soit $P \in K[X]$, $K$ de caractéristique zéro.

**Question :** Caractériser le fait que $P$ n'a que des racines simples (dans une clôture algébrique) en termes de $\text{pgcd}(P, P')$.

### VERSO
**Hypothèses :**
*   $K$ corps de caractéristique zéro
*   $P \in K[X], \deg P \ge 1$

**Conclusion :**
$P$ n'a que des racines simples (dans $\bar{K}$) si et seulement si :
$$ \text{pgcd}(P, P') = 1 $$

Plus généralement : les racines multiples de $P$ sont exactement les racines communes à $P$ et $P'$.

Si $P = \prod (X - \alpha_i)^{m_i}$, alors $\text{pgcd}(P, P') = \prod (X - \alpha_i)^{m_i - 1}$ (à une constante près).

Le polynôme séparable associé $P/\text{pgcd}(P, P')$ a les mêmes racines que $P$, toutes simples.

### 
**Subtilités :**
*   En caractéristique $p$, $P' = 0$ n'implique pas $P$ constant (ex : $P = X^p$). La caractérisation par le PGCD reste valable mais le calcul de $P'$ change.
*   Le calcul de $\text{pgcd}(P, P')$ se fait par l'algorithme d'Euclide, sans avoir besoin de factoriser $P$.

**Pièges classiques :**
*   Écrire $P' = 0 \implies P$ constant (faux en caractéristique $p > 0$, vrai en caractéristique zéro).
*   Oublier que le PGCD est défini à une constante multiplicative près.

---

## FLASHCARD 126 — Proposition 38 : Interpolation de Lagrange

### RECTO
**Interpolation de Lagrange**

Soient $x_0, \dots, x_n \in K$ deux à deux distincts, et $y_0, \dots, y_n \in K$.

**Question :** Énoncer le théorème d'interpolation de Lagrange (existence, unicité, formule explicite).

### VERSO
**Hypothèses :**
*   $K$ corps
*   $x_0, \dots, x_n \in K$ deux à deux distincts
*   $y_0, \dots, y_n \in K$

**Conclusion :**
Il existe un unique polynôme $P \in K_n[X]$ (de degré $\le n$) tel que :
$$ \forall i \in \{0, \dots, n\}, \quad P(x_i) = y_i $$

**Formule explicite :**
$$ P(X) = \sum_{i=0}^n y_i \prod_{j \neq i} \frac{X - x_j}{x_i - x_j} $$

Les polynômes de base de Lagrange sont :
$$ L_i(X) = \prod_{j \neq i} \frac{X - x_j}{x_i - x_j}, \quad L_i(x_j) = \delta_{ij} $$

**Démonstration :**
*   **Unicité :** si $P$ et $Q$ conviennent, $P-Q$ est de degré $\le n$ et s'annule en $n+1$ points, donc $P-Q=0$.
*   **Existence :** la formule de Lagrange donne explicitement un $P$ de degré $\le n$ vérifiant les conditions.

**Interprétation linéaire :**
L'application « évaluation » $ev : K_n[X] \to K^{n+1}, P \mapsto (P(x_0), \dots, P(x_n))$ est un isomorphisme (les deux espaces sont de dimension $n+1$, et $ev$ est injective par l'argument d'unicité).

### 
**Subtilités :**
*   Les $L_i$ forment une base de $K_n[X]$, appelée base de Lagrange associée aux nœuds $x_0, \dots, x_n$.
*   La formule est valable sur tout corps, et même sur tout anneau intègre (avec $n+1$ éléments distincts).
*   La matrice de Vandermonde $V = (x_i^j)_{0 \le i, j \le n}$ est inversible $\iff$ les $x_j$ sont distincts, et l'interpolation revient à inverser ce système.

**Pièges classiques :**
*   Confondre degré $\le n$ et degré $= n$ : le polynôme interpolateur peut être de degré strictement inférieur à $n$.
*   Oublier la condition « deux à deux distincts ».

---

## FLASHCARD 127 — À connaître 36 : Polynômes de Tchebychev

### RECTO
**Polynômes de Tchebychev**

**Question :** Définir les polynômes de Tchebychev de première espèce $T_n$. Donner leurs propriétés fondamentales (relation de récurrence, racines, propriété de minimax).

### VERSO
**Définition :**
Le polynôme de Tchebychev de première espèce $T_n$ est l'unique polynôme de degré $n$ tel que :
$$ \forall \theta \in \mathbb{R}, \quad T_n(\cos \theta) = \cos(n\theta) $$

**Relation de récurrence :**
$$ T_0(X) = 1, \quad T_1(X) = X, \quad T_{n+1}(X) = 2X T_n(X) - T_{n-1}(X) $$

**Propriétés :**
*   $T_n$ est de degré $n$, de coefficient dominant $2^{n-1}$ (pour $n \ge 1$).
*   **Racines :** $T_n$ a $n$ racines réelles simples dans $[-1, 1]$ :
    $$ x_k = \cos \left( \frac{(2k-1)\pi}{2n} \right), \quad k=1, \dots, n $$
*   $|T_n(x)| \le 1$ pour tout $x \in [-1, 1]$.
*   **Propriété de minimax :** Parmi tous les polynômes unitaires de degré $n$, $\frac{T_n}{2^{n-1}}$ est celui dont la norme $\|\cdot\|_\infty$ sur $[-1, 1]$ est minimale, et ce minimum vaut $\frac{1}{2^{n-1}}$.

**Orthogonalité :**
Les $T_n$ sont orthogonaux pour le produit scalaire :
$$ \langle f, g \rangle = \int_{-1}^1 \frac{f(x)g(x)}{\sqrt{1-x^2}} dx $$

### 
**Subtilités :**
*   La propriété de minimax est fondamentale en approximation numérique (choix optimal des nœuds d'interpolation pour minimiser l'erreur : nœuds de Tchebychev).
*   Les polynômes de Tchebychev de seconde espèce $U_n$ vérifient $U_n(\cos \theta) = \frac{\sin((n+1)\theta)}{\sin \theta}$.

**Pièges classiques :**
*   Confondre $T_n$ et $U_n$.
*   Oublier le coefficient dominant $2^{n-1}$ : $T_n$ n'est pas unitaire pour $n \ge 2$.

---

# CHAPITRE 11 — Algèbre linéaire

## FLASHCARD 128 — À connaître 37 : Lemme de Gauss (algèbre linéaire — pivot de Gauss)

### RECTO
**Algorithme du pivot de Gauss**

**Question :** Énoncer le principe de l'élimination de Gauss. Quels problèmes résout-il ?

### VERSO
**Principe :**
Toute matrice $A \in M_{n, p}(K)$ peut être réduite par opérations élémentaires sur les lignes (et/ou les colonnes) à une forme échelonnée en lignes (ou échelonnée réduite, sous forme de Gauss-Jordan).

**Opérations élémentaires sur les lignes :**
*   $L_i \leftrightarrow L_j$ (échange de deux lignes)
*   $L_i \leftarrow \lambda L_i$, $\lambda \neq 0$ (multiplication d'une ligne par un scalaire non nul)
*   $L_i \leftarrow L_i + \mu L_j$, $i \neq j$ (transvection : ajouter un multiple d'une ligne à une autre)

**Applications :**
*   Calcul du rang d'une matrice
*   Résolution de systèmes linéaires $AX = B$
*   Calcul de l'inverse d'une matrice (méthode $[A \mid I_n] \to [I_n \mid A^{-1}]$)
*   Calcul du déterminant

**Complexité :** $O(n^3)$ opérations pour une matrice $n \times n$.

### 
**Subtilités :**
*   Les opérations sur les lignes correspondent à la multiplication à gauche par des matrices inversibles (transvections, dilatations, permutations).
*   Les opérations sur les colonnes correspondent à la multiplication à droite.
*   La forme échelonnée réduite (Gauss-Jordan) est unique ; la forme échelonnée non réduite ne l'est pas.

**Pièges classiques :**
*   Mélanger opérations sur les lignes et sur les colonnes dans un même calcul (sauf si on cherche des matrices $P, Q$ telles que $PAQ$ soit sous forme canonique).
*   Oublier qu'une multiplication par $\lambda = 0$ n'est pas une opération élémentaire valide.

---

## FLASHCARD 129 — À connaître 38 : Caractérisation des homothéties

### RECTO
**Caractérisation des homothéties**

Soit $E$ un $K$-espace vectoriel et $u \in \mathcal{L}(E)$.

**Question :** Caractériser les endomorphismes qui commutent avec tous les endomorphismes de $E$ (ou qui stabilisent tout sous-espace vectoriel).

### VERSO
**Théorème :**
Soit $E$ un $K$-espace vectoriel de dimension $n \ge 1$.

Les assertions suivantes sont équivalentes :
1.  $u$ est une homothétie : $\exists \lambda \in K, u = \lambda Id_E$.
2.  $u$ commute avec tout endomorphisme de $E$ : $\forall v \in \mathcal{L}(E), u \circ v = v \circ u$.
3.  Tout sous-espace vectoriel de $E$ est stable par $u$.

**En termes matriciels :**
$M \in M_n(K)$ commute avec toute matrice si et seulement si $M = \lambda I_n$.

**Démonstration (esquisse de 2 $\Rightarrow$ 1) :**
Pour $v$ un projecteur sur une droite $Ke_i$, $u \circ v = v \circ u$ implique que $u(e_i) \in Ke_i$, donc les vecteurs de la base sont des vecteurs propres de $u$. En prenant $v$ une transvection, on montre que les valeurs propres sont toutes égales.

### 
**Subtilités :**
*   En dimension infinie, 2 $\Rightarrow$ 1 reste vrai, mais 3 $\Rightarrow$ 1 peut être plus délicat à établir.
*   La condition « commute avec tout endomorphisme » peut être remplacée par « commute avec tout élément d'un sous-ensemble engendrant $\mathcal{L}(E)$ comme algèbre ».

**Pièges classiques :**
*   Confondre « commute avec une matrice particulière » et « commute avec toute matrice ». Le commutant d'une matrice quelconque peut être bien plus grand que les homothéties.

---

## FLASHCARD 130 — Théorème 51 : Théorème de la base incomplète

### RECTO
**Théorème de la base incomplète**

Soit $E$ un $K$-espace vectoriel de dimension finie $n$.

**Question :** Énoncer le théorème de la base incomplète (deux versions : compléter une famille libre, extraire d'une famille génératrice).

### VERSO
**Version 1 (compléter une famille libre) :**
*   Soit $(e_1, \dots, e_p)$ une famille libre de $E$ avec $p \le n$.
*   Alors on peut trouver $e_{p+1}, \dots, e_n \in E$ tels que $(e_1, \dots, e_n)$ soit une base de $E$.
*   De plus, si $(f_1, \dots, f_m)$ est une famille génératrice de $E$, on peut choisir les $e_{p+1}, \dots, e_n$ parmi les $f_j$.

**Version 2 (extraire d'une famille génératrice) :**
*   Soit $(f_1, \dots, f_m)$ une famille génératrice de $E$ avec $m \ge n$.
*   Alors on peut en extraire une base de $E$ (sous-famille de $n$ éléments).

**Démonstration (esquisse) :**
Algorithme glouton : on ajoute des vecteurs un par un en vérifiant qu'ils restent en dehors du sous-espace engendré par les précédents.

### 
**Subtilités :**
*   Le théorème est faux en dimension infinie en général (il faut l'axiome du choix / le lemme de Zorn pour l'existence de bases, via le théorème de la base de Zorn).
*   La version « on peut choisir les complémentaires parmi une famille génératrice donnée » est plus forte et très utile.

**Pièges classiques :**
*   Croire que le complément est unique : il ne l'est pas.
*   En dimension infinie, ne pas invoquer aveuglément le théorème de la base incomplète.

---

## FLASHCARD 131 — Proposition 39 : Formule de Grassmann

### RECTO
**Formule de Grassmann (dimension de la somme de deux sous-espaces)**

Soient $F$ et $G$ deux sous-espaces vectoriels d'un espace $E$ de dimension finie.

**Question :** Énoncer la formule de Grassmann.

### VERSO
**Hypothèses :**
*   $E$ espace vectoriel de dimension finie sur $K$
*   $F, G$ sous-espaces de $E$

**Formule :**
$$ \dim(F+G) = \dim F + \dim G - \dim(F \cap G) $$

**Démonstration (esquisse) :**
Choisir une base de $F \cap G$, la compléter en une base de $F$ et une base de $G$ (théorème de la base incomplète). Les réunions forment une famille génératrice de $F+G$, et on vérifie qu'elle est libre.

**Corollaire (somme directe) :**
$F+G$ est directe ($F \oplus G$) si et seulement si $F \cap G = \{0\}$, et dans ce cas $\dim(F \oplus G) = \dim F + \dim G$.

$F$ et $G$ sont supplémentaires dans $E$ si $E = F \oplus G$, i.e. $F \cap G = \{0\}$ et $\dim F + \dim G = \dim E$.

### 
**Subtilités :**
*   La formule est l'analogue vectoriel de la formule $|A \cup B| = |A| + |B| - |A \cap B|$ pour les ensembles finis.
*   Elle se généralise à $k$ sous-espaces via la formule du crible, mais c'est rarement utilisé (les intersections deviennent compliquées).

**Pièges classiques :**
*   Appliquer la formule en oubliant l'intersection : écrire $\dim(F+G) = \dim F + \dim G$ sans vérifier que $F \cap G = \{0\}$.
*   Confondre $F+G$ (somme de sous-espaces) et $F \cup G$ (qui n'est en général pas un sous-espace).

---

## FLASHCARD 132 — Proposition 40 : Existence de supplémentaires

### RECTO
**Existence de supplémentaires**

Soit $E$ un $K$-espace vectoriel de dimension finie et $F$ un sous-espace de $E$.

**Question :** Énoncer le théorème d'existence d'un supplémentaire.

### VERSO
**Hypothèses :**
*   $E$ espace vectoriel de dimension finie $n$ sur $K$
*   $F$ sous-espace de $E$

**Conclusion :**
Il existe un sous-espace $G$ de $E$ tel que $E = F \oplus G$.

On a alors $\dim G = \dim E - \dim F$.

**Démonstration :**
Choisir une base $(e_1, \dots, e_p)$ de $F$, la compléter en une base $(e_1, \dots, e_n)$ de $E$. Poser $G = \text{Vect}(e_{p+1}, \dots, e_n)$.

### 
**Subtilités :**
*   Le supplémentaire n'est pas unique (sauf si $F=\{0\}$ ou $F=E$).
*   En dimension infinie, un sous-espace fermé d'un espace de Hilbert admet un supplémentaire orthogonal (unique). Mais un sous-espace quelconque d'un evn de dimension infinie n'admet pas toujours de supplémentaire topologique.

**Pièges classiques :**
*   Croire que le supplémentaire est canonique ou unique.
*   Confondre supplémentaire algébrique et supplémentaire topologique en dimension infinie.

---

## FLASHCARD 133 — Théorème 52 : Théorème du rang

### RECTO
**Théorème du rang**

Soit $f : E \to F$ une application linéaire entre espaces vectoriels de dimension finie.

**Question :** Énoncer le théorème du rang.

### VERSO
**Hypothèses :**
*   $E, F$ espaces vectoriels sur $K$, $\dim E = n$ finie
*   $f \in \mathcal{L}(E, F)$

**Conclusion :**
$$ \dim E = \dim \ker f + \dim \text{Im} f = \dim \ker f + \text{rg } f $$

Autrement dit : $n = \dim \ker f + \text{rg } f$.

**Démonstration (esquisse) :**
Choisir une base $(e_1, \dots, e_p)$ de $\ker f$, la compléter en une base $(e_1, \dots, e_n)$ de $E$. Montrer que $(f(e_{p+1}), \dots, f(e_n))$ est une base de $\text{Im} f$. Donc $\text{rg } f = n - p$.

### 
**Subtilités :**
*   Le théorème nécessite que $\dim E$ soit finie. $\dim F$ peut être quelconque.
*   En termes matriciels : pour $A \in M_{m, n}(K)$, $\text{rg } A + \dim \ker A = n$ (nombre de colonnes).

**Corollaires :**
*   $f$ injective $\iff \ker f = \{0\} \iff \text{rg } f = \dim E$.
*   Si $\dim E = \dim F$ (dimension finie), alors : $f$ injective $\iff f$ surjective $\iff f$ bijective.
*   Existence de bases dans lesquelles la matrice de $f$ est $\begin{pmatrix} I_r & 0 \\ 0 & 0 \end{pmatrix}$ avec $r = \text{rg } f$.

**Pièges classiques :**
*   Appliquer le théorème du rang en prenant la dimension de $F$ au lieu de celle de $E$.
*   Oublier que le théorème du rang donne le lien entre noyau et image, pas entre noyau et conoyau.

---

## FLASHCARD 134 — À connaître 39 : Rang d'une composée

### RECTO
**Rang d'une composée**

Soient $f : E \to F$ et $g : F \to G$ linéaires, avec $E, F, G$ de dimension finie.

**Question :** Donner les inégalités reliant $\text{rg}(g \circ f)$, $\text{rg } f$ et $\text{rg } g$.

### VERSO
**Inégalités :**

$$ \text{rg}(g \circ f) \le \min(\text{rg } f, \text{rg } g) $$

**Inégalité de Sylvester (pour les endomorphismes ou les matrices) :**
Si $A \in M_{m, n}(K)$ et $B \in M_{n, p}(K)$ :
$$ \text{rg}(AB) \ge \text{rg } A + \text{rg } B - n $$

En particulier pour $f : E \to F$ et $g : F \to G$ :
$$ \text{rg}(g \circ f) \ge \text{rg } f + \text{rg } g - \dim F $$

*   Si $g$ est surjective : $\text{rg}(g \circ f) = \text{rg } f - \dim(\ker g \cap \text{Im } f)$.
*   Si $f$ est injective : $\text{rg}(g \circ f) = \text{rg}(g|_{\text{Im } f})$.

**Démonstration de 1 :**
$\text{Im}(g \circ f) = g(\text{Im } f) \subset \text{Im } g$, donc $\text{rg}(g \circ f) \le \text{rg } g$.
$\text{Im}(g \circ f) = g(f(E))$ et $g|_{\text{Im } f}$ est une application linéaire de $\text{Im } f$ dans $G$, donc par le théorème du rang, $\dim g(\text{Im } f) \le \dim \text{Im } f = \text{rg } f$.

### 
**Subtilités :**
*   L'inégalité de Sylvester est souvent utilisée sous la forme : si $A, B \in M_n(K)$, $\text{rg}(AB) \ge \text{rg } A + \text{rg } B - n$. Si le membre de droite est $\ge n$, alors $AB$ est inversible.
*   Cas d'égalité dans l'inégalité supérieure : $\text{rg}(g \circ f) = \text{rg } f$ ssi $\ker g \cap \text{Im } f = \{0\}$.

**Pièges classiques :**
*   Écrire $\text{rg}(AB) = \text{rg } A \cdot \text{rg } B$ (faux !).
*   Oublier la dimension de l'espace intermédiaire $F$ dans l'inégalité de Sylvester.

---

## FLASHCARD 135 — Proposition 41 : Rang d'une matrice

### RECTO
**Rang d'une matrice**

Soit $A \in M_{m, n}(K)$.

**Question :** Donner les différentes caractérisations du rang de $A$.

### VERSO
**Définition :**
$\text{rg}(A) = \text{rg}(f_A)$ où $f_A : K^n \to K^m, X \mapsto AX$.

**Caractérisations équivalentes :**
*   $\text{rg}(A) = \dim \text{Im}(f_A) = $ dimension de l'espace vectoriel engendré par les colonnes de $A$.
*   $\text{rg}(A) = $ dimension de l'espace vectoriel engendré par les lignes de $A$ (rang ligne = rang colonne).
*   $\text{rg}(A) = $ taille du plus grand mineur non nul de $A$ (sous-matrice carrée de déterminant non nul).
*   $\text{rg}(A) = n - \dim \ker(f_A)$ (théorème du rang).
*   $\text{rg}(A) = r$ ssi il existe $P \in GL_m(K), Q \in GL_n(K)$ tels que $PAQ = \begin{pmatrix} I_r & 0 \\ 0 & 0 \end{pmatrix}$.

**Invariance par opérations élémentaires :**
$\text{rg}(PAQ) = \text{rg}(A)$ pour $P, Q$ inversibles. Le rang est invariant par pivot de Gauss (sur les lignes ou les colonnes).

### 
**Subtilités :**
*   $\text{rg}(A) = \text{rg}({}^t A)$ (rang ligne = rang colonne). C'est un résultat non trivial.
*   $\text{rg}(A) = \text{rg}({}^t A A)$ (utile avec les matrices de Gram).

**Pièges classiques :**
*   Confondre rang de $A$ et rang de $A^2$ (ils peuvent différer).
*   Croire que le pivot de Gauss modifie le rang.

---

## FLASHCARD 136 — À connaître 40 : Matrice à diagonale strictement dominante (Hadamard)

### RECTO
**Lemme d'Hadamard (matrices à diagonale strictement dominante)**

Soit $A = (a_{ij}) \in M_n(K)$.

**Question :** Sous quelle condition de dominance diagonale la matrice $A$ est-elle inversible ?

### VERSO
**Hypothèses :**
$A = (a_{ij}) \in M_n(\mathbb{C})$ (ou $\mathbb{R}$) est à diagonale strictement dominante (par lignes) :
$$ \forall i \in \{1, \dots, n\}, \quad |a_{ii}| > \sum_{j \neq i} |a_{ij}| $$

**Conclusion :**
$A$ est inversible.

**Démonstration (esquisse) :**
Supposer $AX = 0$ avec $X \neq 0$. Soit $i_0$ l'indice tel que $|x_{i_0}| = \max_i |x_i| > 0$.
De la ligne $i_0$ : $a_{i_0 i_0} x_{i_0} = - \sum_{j \neq i_0} a_{i_0 j} x_j$.
En module : $|a_{i_0 i_0}| \cdot |x_{i_0}| \le \sum_{j \neq i_0} |a_{i_0 j}| \cdot |x_j| \le |x_{i_0}| \sum_{j \neq i_0} |a_{i_0 j}|$.
D'où $|a_{i_0 i_0}| \le \sum_{j \neq i_0} |a_{i_0 j}|$, contradiction.

### 
**Subtilités :**
*   On peut aussi définir la dominance diagonale par colonnes : $|a_{jj}| > \sum_{i \neq j} |a_{ij}|$. Le résultat reste vrai (appliquer le théorème à ${}^t A$).
*   Plus généralement, les valeurs propres de $A$ sont localisées dans les **disques de Gershgorin** : $\lambda \in \bigcup_{i=1}^n D(a_{ii}, R_i)$ avec $R_i = \sum_{j \neq i} |a_{ij}|$. La dominance diagonale assure que $0$ n'est dans aucun disque.

**Pièges classiques :**
*   Oublier le « strictement » : la dominance diagonale large ne suffit pas en général (il faut l'irréductibilité en plus).
*   Appliquer le critère en oubliant les valeurs absolues.

---

## FLASHCARD 137 — Proposition 42 : Matrice de Vandermonde

### RECTO
**Déterminant de Vandermonde**

Soient $x_0, \dots, x_{n-1} \in K$.

**Question :** Calculer le déterminant de la matrice de Vandermonde $V = (x_i^j)_{0 \le i, j \le n-1}$.

### VERSO
**Matrice de Vandermonde :**
$$ V = \begin{pmatrix} 1 & x_0 & x_0^2 & \dots & x_0^{n-1} \\ 1 & x_1 & x_1^2 & \dots & x_1^{n-1} \\ \vdots & \vdots & \vdots & & \vdots \\ 1 & x_{n-1} & x_{n-1}^2 & \dots & x_{n-1}^{n-1} \end{pmatrix} $$

**Formule :**
$$ \det V = \prod_{0 \le i < j \le n-1} (x_j - x_i) $$

**Corollaire :**
$V$ est inversible si et seulement si les $x_i$ sont deux à deux distincts.

**Démonstration (esquisse) :**
*   Voir $\det V$ comme un polynôme en $x_{n-1}$ (de degré $n-1$) : ses racines sont $x_0, \dots, x_{n-2}$.
*   Donc $\det V = c \prod_{j=0}^{n-2} (x_{n-1} - x_j)$, où $c$ est le cofacteur (qui est le Vandermonde d'ordre $n-1$).
*   Conclure par récurrence.

### 
**Subtilités :**
*   La formule est valable sur tout anneau commutatif (et a fortiori sur tout corps).
*   Le lien avec l'interpolation de Lagrange : la matrice de Vandermonde est la matrice de passage de la base canonique $(1, X, \dots, X^{n-1})$ à la base d'évaluation $(e_0, \dots, e_{n-1})$ (fonctionnelles d'évaluation aux points $x_i$).

**Pièges classiques :**
*   Se tromper dans l'ordre des indices : $x_j - x_i$ avec $i < j$ (et non $x_i - x_j$).
*   Il y a $\binom{n}{2}$ facteurs dans le produit.
*   Confondre la transposée de la matrice de Vandermonde (les deux conventions existent).

---

## FLASHCARD 138 — À connaître 41 : Transvections

### RECTO
**À connaître 41 : Transvections**

Soit $E$ un $K$-espace vectoriel de dimension finie $n$, et $B$ une base de $E$.

**Question :** Définir une transvection, donner sa matrice dans une base, et énoncer ses propriétés fondamentales (déterminant, inversibilité, lien avec les opérations élémentaires).

### VERSO
**Hypothèses / Contexte**
*   $K$ un corps (en pratique $\mathbb{R}$ ou $\mathbb{C}$)
*   $E$ un $K$-ev de dimension $n \ge 1$
*   $B = (e_1, \dots, e_n)$ base de $E$
*   $i \neq j \in [[1, n]], \lambda \in K$

**Définition formelle**
La transvection $T_{ij}(\lambda)$ est l'endomorphisme de $E$ défini par :
$$ T_{ij}(\lambda)(e_k) = \begin{cases} e_k + \lambda e_i & \text{si } k=j \\ e_k & \text{si } k \neq j \end{cases} $$

Sa matrice dans $B$ est $I_n + \lambda E_{ij}$, où $E_{ij}$ est la matrice élémentaire avec un $1$ en position $(i, j)$ et des $0$ ailleurs :
$$ \text{Mat}_B(T_{ij}(\lambda)) = \begin{pmatrix} 1 & & \lambda & \\ & 1 & & \\ & & 1 & \\ & & & 1 \end{pmatrix} $$
(la colonne $j$ voit apparaître $\lambda$ en ligne $i$, tout le reste est l'identité)

**Propriétés fondamentales**
*   **Déterminant :** $\det(T_{ij}(\lambda)) = 1$
*   **Inversibilité :** $T_{ij}(\lambda)$ est toujours inversible, d'inverse $T_{ij}(-\lambda)$
*   **Valeurs propres :** $1$ est l'unique valeur propre (multiplicité $n$)
*   **Nilpotence :** $T_{ij}(\lambda) - I_n = \lambda E_{ij}$ est nilpotente d'indice 2
*   **Opération élémentaire :** Correspond à $L_i \leftarrow L_i + \lambda L_j$ (ou $C_j \leftarrow C_j + \lambda C_i$)

**Théorème de génération**
Tout élément de $GL_n(K)$ (ou de $SL_n(K)$) est un produit fini de transvections.
En particulier, $SL_n(K)$ est engendré par les transvections.

**Idée de démonstration**
L'algorithme du pivot de Gauss décompose toute matrice inversible en produit d'opérations élémentaires (transvections + dilatations).
Une dilatation $D_i(\mu)$ ($\mu \neq 0$) se décompose en transvections et $\det = \mu$ ; pour rester dans $SL_n$, on absorbe le déterminant.
Récurrence sur $n$ par blocs.

### 
**Subtilités**
*   $i \neq j$ est impératif : si $i=j$, on obtiendrait $I + \lambda E_{ii}$ qui est une dilatation, pas une transvection.
*   La transvection n'est pas une symétrie : elle n'est pas involutive ($T_{ij}(\lambda)^2 \neq I$ en général si $\lambda \neq 0$).
*   Le déterminant vaut exactement 1 : les transvections sont dans $SL_n(K)$, ce qui est crucial pour le calcul de déterminants par pivot.
*   **Attention à la convention :** $T_{ij}(\lambda)$ agit sur la colonne $j$ (ajoute $\lambda$ fois la ligne/colonne $i$). La confusion ligne/colonne est une source d'erreur fréquente selon que l'on travaille sur les lignes ou les colonnes.

**Pièges classiques**
*   Confondre $E_{ij}$ et $E_{ji}$ : $I_n + \lambda E_{ij}$ ajoute $\lambda$ fois la colonne $i$ à la colonne $j$ quand on multiplie à droite, mais ajoute $\lambda$ fois la ligne $j$ à la ligne $i$ quand on multiplie à gauche. Il faut savoir quel côté on multiplie.
*   Oublier que $\lambda = 0$ donne l'identité : $T_{ij}(0) = I_n$, ce qui est licite mais trivial.
*   **En réduction :** une matrice triangulaire avec des 1 sur la diagonale est un produit de transvections — c'est le lien avec les matrices unipotentes.
*   **Calcul de déterminant :** $\det(I_n + \lambda E_{ij}) = 1$ (développer selon la colonne $j$, ou utiliser le fait que les valeurs propres sont toutes égales à 1).

**Extension / Programme MP**
*   Au programme MP : les transvections apparaissent dans la réduction des matrices et dans le pivot de Gauss.
*   Le résultat "tout élément de $GL_n$ est produit de transvections et d'une dilatation" est la justification théorique de la méthode de Gauss-Jordan.
*   Lien avec la décomposition LU : la matrice $L$ dans $PA=LU$ est un produit de transvections inférieures.

---

## FLASHCARD 139 — À connaître 42

### RECTO
**À connaître 42 : Formes des matrices selon leurs propriétés — Matrices équivalentes, semblables, rang**

Soit $K$ un corps, $A \in M_{n, p}(K)$.

**Question :** Énoncer le théorème de classification des matrices à équivalence près (forme canonique), rappeler la définition de matrices semblables, et les invariants associés.

### VERSO
**Définitions**
*   **Matrices équivalentes :** Deux matrices $A, B \in M_{n, p}(K)$ sont équivalentes s'il existe $P \in GL_n(K)$ et $Q \in GL_p(K)$ tels que :
    $$ B = PAQ $$
*   **Matrices semblables :** Deux matrices $A, B \in M_n(K)$ (carrées, même taille) sont semblables s'il existe $P \in GL_n(K)$ tel que :
    $$ B = P^{-1}AP $$

**Théorème : Forme canonique d'équivalence**
Toute matrice $A \in M_{n, p}(K)$ de rang $r$ est équivalente à la matrice :
$$ J_r = \begin{pmatrix} I_r & 0 \\ 0 & 0 \end{pmatrix} \in M_{n, p}(K) $$

**Corollaire :** Deux matrices $A, B \in M_{n, p}(K)$ sont équivalentes $\iff$ elles ont le même rang.

**Invariants**
*   **Équivalence :** Rang
*   **Similitude :** Valeurs propres (avec multiplicités), polynôme caractéristique, polynôme minimal, trace, déterminant

**Démonstration de la forme canonique**
Par le pivot de Gauss, on peut opérer des opérations élémentaires sur les lignes (multiplication à gauche par des transvections/dilatations) et sur les colonnes (multiplication à droite) pour mettre $A$ sous la forme $J_r$.
Ces opérations correspondent exactement à la multiplication par des matrices inversibles $P$ et $Q$.
Le rang est préservé car $P$ et $Q$ sont inversibles.

### 
**Subtilités**
*   Équivalence $\not\Rightarrow$ similitude : deux matrices équivalentes ont le même rang, mais pas nécessairement le même spectre. Exemple : $I_2$ et $\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ sont semblables à elles-mêmes, mais $I_2$ et $2I_2$ sont non semblables (spectre différent) mais ont même rang.
*   La similitude est plus fine que l'équivalence : si $A \sim B$ (semblables), alors $A \equiv B$ (équivalentes), mais la réciproque est fausse.
*   **Invariants de similitude :** trace et déterminant sont nécessaires mais non suffisants pour conclure à la similitude. Le polynôme minimal est un invariant plus fin.

**Pièges classiques**
*   Confondre "même polynôme caractéristique" et "semblables" : faux en général. Contre-exemple : $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ et $\begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ ont des polynômes caractéristiques différents, mais... En fait l'exemple standard est deux matrices de Jordan de même polynôme caractéristique mais de polynômes minimaux différents.
*   **Taille différente :** l'équivalence est définie pour des matrices $n \times p$ avec $n \neq p$ possible ; la similitude est uniquement pour les matrices carrées de même taille.
*   Vérifier que $P$ est bien inversible avant d'affirmer la similitude.

**Application au programme MP**
*   Ces notions sont au cœur du chapitre Réduction : diagonaliser/trigonaliser $\iff$ trouver une matrice semblable diagonale/triangulaire.
*   La forme canonique d'équivalence justifie que le rang est le seul invariant pour l'équivalence — utile pour les applications linéaires.

---

## FLASHCARD 140 — Proposition 43

### RECTO
**Proposition 43 : Valeurs propres et sous-espaces propres**

Soit $E$ un $K$-espace vectoriel de dimension finie $n \ge 1$, et $f \in \mathcal{L}(E)$.

**Question :** Définir valeur propre, vecteur propre, sous-espace propre. Énoncer les propriétés de base : lien avec le polynôme caractéristique, caractérisation de la diagonalisabilité en termes de somme directe des sous-espaces propres.

### VERSO
**Définitions**
*   $\lambda \in K$ est valeur propre de $f$ s'il existe $x \neq 0$ tel que $f(x) = \lambda x$.
*   Un tel $x$ est appelé vecteur propre associé à $\lambda$.
*   Le sous-espace propre associé à $\lambda$ est :
    $$ E_\lambda(f) = \ker(f - \lambda id_E) $$
    C'est un sous-espace vectoriel de $E$, non réduit à $\{0\}$ si et seulement si $\lambda$ est valeur propre.

**Polynôme caractéristique**
$$ \chi_f(X) = \det(X \cdot id_E - f) \in K[X] $$
C'est un polynôme de degré $n$, de coefficient dominant 1.

**Propriété fondamentale :** $\lambda$ est valeur propre de $f \iff \chi_f(\lambda) = 0$.

**Multiplicités**
Pour $\lambda$ valeur propre :
*   **Multiplicité algébrique $m_a(\lambda)$ :** ordre de $\lambda$ comme racine de $\chi_f$.
*   **Multiplicité géométrique $m_g(\lambda) = \dim E_\lambda(f)$.**
*   **Inégalité fondamentale :**
    $$ 1 \le m_g(\lambda) \le m_a(\lambda) $$

**Indépendance des sous-espaces propres**
**Proposition :** Les sous-espaces propres associés à des valeurs propres distinctes sont en somme directe :
$$ \lambda_1, \dots, \lambda_k \text{ distincts} \implies E_{\lambda_1} + \dots + E_{\lambda_k} \text{ est directe} $$

**Démonstration :** Par récurrence sur $k$. Si $x_1 + \dots + x_k = 0$ avec $x_i \in E_{\lambda_i}$, appliquer $(f - \lambda_k id)$ et utiliser $\lambda_i \neq \lambda_k$.

**Caractérisation de la diagonalisabilité**
$f$ est diagonalisable
$\iff E = \bigoplus_{\lambda \in Sp(f)} E_\lambda(f)$
$\iff \sum_{\lambda \in Sp(f)} \dim E_\lambda(f) = n$
$\iff \forall \lambda \in Sp(f), m_g(\lambda) = m_a(\lambda)$

### 
**Subtilités**
*   $K$ doit contenir les valeurs propres : sur $\mathbb{R}$, une matrice peut ne pas avoir de valeurs propres réelles (ex : rotation d'angle $\pi/2$ en dimension 2). Sur $\mathbb{C}$, le polynôme caractéristique est scindé (d'Alembert-Gauss).
*   L'inégalité $m_g \le m_a$ est stricte en général : c'est le cas des blocs de Jordan non triviaux.
*   **Vecteur propre $\neq 0$ par définition :** ne jamais oublier cette condition dans les démonstrations.

**Pièges classiques**
*   Confondre multiplicité algébrique et géométrique : l'égalité $m_g = m_a$ pour toutes les valeurs propres est la condition de diagonalisabilité.
*   Calculer $\chi_f(\lambda) = \det(\lambda I - f)$ ou $\det(f - \lambda I)$ : les deux diffèrent d'un signe $(-1)^n$, donc les racines sont les mêmes, mais le coefficient dominant change. Convention à fixer.
*   Oublier de vérifier que le polynôme caractéristique est scindé sur $K$ avant de parler de diagonalisabilité sur $K$.

---

## FLASHCARD 141 — À connaître 43

### RECTO
**À connaître 43 : Polynôme minimal**

Soit $E$ un $K$-ev de dimension $n$, $f \in \mathcal{L}(E)$.

**Question :** Définir le polynôme minimal de $f$. Énoncer ses propriétés (existence, unicité, lien avec le polynôme caractéristique, lien avec la diagonalisabilité et la trigonalisabilité).

### VERSO
**Définition**
L'ensemble $\{P \in K[X] \mid P(f) = 0\}$ est un idéal de $K[X]$ (anneau principal), donc de la forme $(m_f)$ où $m_f$ est l'unique polynôme unitaire de plus petit degré annulant $f$.

Le polynôme minimal $m_f$ de $f$ est le générateur unitaire de l'idéal $\text{Ann}(f) = \{P \in K[X] \mid P(f) = 0_{\mathcal{L}(E)}\}$.

**Propriétés fondamentales**
*   **Divisibilité :** $P(f) = 0 \iff m_f \mid P$
*   **Lien avec $\chi_f$ (Cayley-Hamilton) :** $m_f \mid \chi_f$ (et $\chi_f \mid m_f^n$ dans un sens plus précis : mêmes racines)
*   **Mêmes racines :** $\lambda$ est valeur propre de $f \iff m_f(\lambda) = 0$
*   **Degré :** $1 \le \deg(m_f) \le n$

**Caractérisations**
*   $f$ diagonalisable sur $K \iff m_f$ est scindé à racines simples sur $K$
*   $f$ trigonalisable sur $K \iff m_f$ est scindé sur $K$
*   $f = \lambda id \iff m_f = X - \lambda$

**Calcul pratique**
*   Pour une matrice $A$ donnée, chercher le plus petit degré $d$ tel qu'il existe un polynôme unitaire de degré $d$ annulant $A$.
*   Si $\chi_f$ est scindé à racines simples $\Rightarrow m_f = \chi_f$.
*   Pour une matrice diagonale $\text{diag}(\lambda_1, \dots, \lambda_n)$ : $m_f = \prod_{\lambda \in Sp(f)} (X - \lambda)$ (produit sur les valeurs propres distinctes).

**Démonstration de l'existence**
$K[X]$ est un anneau principal. La famille $(f^0, f^1, \dots, f^{n^2})$ dans $\mathcal{L}(E) \simeq M_n(K)$ (dimension $n^2$) est liée, donc il existe une relation non triviale $\sum a_k f^k = 0$, i.e., un polynôme non nul annulant $f$. L'annulateur est donc non réduit à $\{0\}$, et son générateur unitaire est $m_f$.

### 
**Subtilités**
*   $m_f$ et $\chi_f$ ont les mêmes racines (dans $\bar{K}$) mais pas forcément les mêmes multiplicités. C'est le pont entre polynôme minimal et spectre.
*   Le fait que $m_f \mid \chi_f$ est une conséquence de Cayley-Hamilton ($\chi_f(f)=0$), mais la réciproque $\chi_f \mid m_f$ est fausse en général.
*   En dimension infinie, le polynôme minimal peut ne pas exister (plus d'annulateur de degré fini en général).

**Pièges classiques**
*   Confondre "$m_f$ scindé à racines simples" (diagonalisabilité) et "$m_f$ scindé" (trigonalisabilité).
*   Penser que $m_f = \chi_f$ toujours : faux. Pour $f = id$ : $\chi_f = (X-1)^n$ mais $m_f = X-1$.
*   Pour un endomorphisme d'un espace de dimension $n$ : $\deg(m_f) \le n$, pas $\le n^2$ (borne triviale). La borne $n$ vient de Cayley-Hamilton.

---

## FLASHCARD 142 — Théorème 53 : Condition suffisante de diagonalisabilité

### RECTO
**Théorème 53 : Condition suffisante de diagonalisabilité**

Soit $E$ un $K$-espace vectoriel de dimension $n \ge 1$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer une condition suffisante simple de diagonalisabilité de $f$ faisant intervenir le nombre de valeurs propres distinctes. Énoncer également la condition suffisante via le polynôme minimal.

### VERSO
**Théorème (condition suffisante par le nombre de valeurs propres)**
Si $f$ admet $n$ valeurs propres distinctes dans $K$, alors $f$ est diagonalisable sur $K$.

**Démonstration :** Si $\lambda_1, \dots, \lambda_n$ sont $n$ valeurs propres distinctes, les sous-espaces propres $E_{\lambda_i}$ sont en somme directe (Prop. 43), chacun de dimension $\ge 1$. Donc $\sum \dim E_{\lambda_i} \ge n$. Comme $\dim E = n$, on a égalité et $E = \bigoplus_{i=1}^n E_{\lambda_i}$.

**Attention :** La réciproque est fausse : $f$ peut être diagonalisable avec des valeurs propres multiples (ex : $f=id$).

**Théorème (condition suffisante via le polynôme minimal)**
$f$ est diagonalisable sur $K \iff m_f$ est scindé à racines simples sur $K$.

C'est-à-dire : il existe $\lambda_1, \dots, \lambda_k \in K$ distincts tels que :
$$ m_f = (X - \lambda_1)(X - \lambda_2) \dots (X - \lambda_k) $$

**Condition nécessaire et suffisante complète (rappel)**
$f$ diagonalisable $\iff \forall \lambda \in Sp(f), m_g(\lambda) = m_a(\lambda) \iff \chi_f$ scindé et $m_g = m_a$ partout

**Stratégie pratique de diagonalisation**
1.  Calculer $\chi_f(X) = \det(X \cdot I - A)$.
2.  Vérifier que $\chi_f$ est scindé sur $K$.
3.  Pour chaque valeur propre $\lambda_i$ de multiplicité $m_a(\lambda_i)$, calculer $\dim \ker(f - \lambda_i id) = m_g(\lambda_i)$.
4.  Vérifier $m_g(\lambda_i) = m_a(\lambda_i)$ pour tout $i$.
5.  Construire une base de vecteurs propres.

### 
**Subtilités**
*   "$n$ valeurs propres distinctes" implique que $\chi_f$ est scindé à racines simples, donc $m_f = \chi_f$ dans ce cas.
*   Sur $\mathbb{C}$, $\chi_f$ est toujours scindé (d'Alembert), mais cela ne suffit pas pour la diagonalisabilité sur $\mathbb{C}$.
*   Condition nécessaire seule ne suffit pas : $\chi_f$ scindé $\not\Rightarrow$ diagonalisable. Il faut en plus $m_g = m_a$.

**Pièges classiques**
*   Croire que "polynôme caractéristique scindé $\implies$ diagonalisable" : faux. $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ a $\chi = X^2$ scindé mais n'est pas diagonalisable.
*   En dimension infinie, les notions de multiplicité algébrique/géométrique ne s'appliquent plus directement.
*   Ne pas vérifier que les valeurs propres sont dans $K$ (et non seulement dans $\bar{K}$) : une matrice réelle peut être diagonalisable sur $\mathbb{C}$ mais pas sur $\mathbb{R}$.

---

## FLASHCARD 143 — À connaître 44

### RECTO
**À connaître 44 : Polynôme d'endomorphisme, calcul fonctionnel**

Soit $E$ un $K$-ev de dimension $n$, $f \in \mathcal{L}(E)$, et $P = \sum_{k=0}^d a_k X^k \in K[X]$.

**Question :** Définir $P(f)$. Énoncer les propriétés algébriques fondamentales (morphisme d'algèbre). Énoncer le théorème de Cayley-Hamilton.

### VERSO
**Définition**
$$ P(f) = \sum_{k=0}^d a_k f^k \in \mathcal{L}(E) $$
avec la convention $f^0 = id_E$.

**Morphisme d'algèbre**
L'application $\varphi : K[X] \to \mathcal{L}(E), P \mapsto P(f)$ est un morphisme d'algèbres, i.e. :
$$ \forall P, Q \in K[X] : (P+Q)(f) = P(f) + Q(f), \quad (PQ)(f) = P(f) \circ Q(f) $$

En particulier, $P(f)$ et $Q(f)$ commutent : $P(f) \circ Q(f) = Q(f) \circ P(f)$.

**Conséquence importante :** Si $P = \prod_i (X - \lambda_i)^{n_i}$, alors $P(f) = \prod_i (f - \lambda_i id)^{n_i}$.

**Théorème de Cayley-Hamilton**
**Théorème :** $\chi_f(f) = 0_{\mathcal{L}(E)}$

i.e., tout endomorphisme est racine de son propre polynôme caractéristique.

**Conséquence :** $m_f \mid \chi_f$.

**Démonstration (esquisse)**
Méthode matricielle : En base $B$, $A = \text{Mat}_B(f)$. On calcule $\text{com}(XI_n - A)$ (matrice des cofacteurs transposée), et on utilise l'identité $(XI_n - A) \cdot \text{adj}(XI_n - A) = \det(XI_n - A) \cdot I_n = \chi_A(X) I_n$. En développant et en substituant $X=A$, on obtient $\chi_A(A) = 0$.

**Application : calcul de puissances et d'inverses**
*   Si $\chi_f = X^n + a_{n-1} X^{n-1} + \dots + a_0$, alors $f^n = -a_{n-1} f^{n-1} - \dots - a_0 id$.
*   Si $a_0 \neq 0$ : $f^{-1} = -\frac{1}{a_0}(f^{n-1} + \dots + a_1 id)$ (car $f$ est inversible ssi $a_0 = \chi_f(0) = (-1)^n \det(f) \neq 0$).

### 
**Subtilités**
*   La commutativité $P(f) \circ Q(f) = Q(f) \circ P(f)$ est spécifique aux polynômes en un même endomorphisme $f$. Elle est fausse en général pour $P(f) \circ Q(g)$ avec $f \neq g$.
*   Cayley-Hamilton dit $\chi_f(f) = 0$, pas $\chi_f(A) = 0$ pour n'importe quelle matrice $A$ : c'est spécifique à $f$.
*   L'erreur classique : "substituer $\lambda$ à $X$ dans $\chi_A(X) = \det(XI - A)$ et obtenir $\det(\lambda I - A) = 0$" ne prouve pas Cayley-Hamilton. Il faut substituer $A$ (une matrice), pas $\lambda$ (un scalaire).

**Pièges classiques**
*   Cayley-Hamilton $\not\Rightarrow m_f = \chi_f$ : on a seulement $m_f \mid \chi_f$.
*   En exam, on demande souvent d'utiliser Cayley-Hamilton pour calculer $A^{-1}$ ou des puissances élevées de $A$. La méthode : exprimer $A^n$ en fonction de $A^{n-1}, \dots, I$ grâce à $\chi_A(A)=0$.
*   Ne pas confondre $\chi_f(X) = \det(XI - f)$ et $\det(f - XI)$ : différence de signe $(-1)^n$.

---

## FLASHCARD 144 — Théorème 54

### RECTO
**Théorème 54 : Critère de diagonalisabilité par le polynôme minimal — version complète**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer les équivalences complètes caractérisant la diagonalisabilité de $f$, en faisant intervenir le polynôme minimal, le polynôme caractéristique, et les multiplicités.

### VERSO
**Théorème (équivalences pour la diagonalisabilité)**
Les assertions suivantes sont équivalentes :

(i) $f$ est diagonalisable sur $K$ (il existe une base de $E$ formée de vecteurs propres de $f$).

(ii) $\chi_f$ est scindé sur $K$ et $\forall \lambda \in Sp(f), m_g(\lambda) = m_a(\lambda)$.

(iii) $m_f$ est scindé à racines simples sur $K$ : $m_f = \prod_{\lambda \in Sp(f)} (X - \lambda)$.

(iv) $E = \bigoplus_{\lambda \in Sp(f)} \ker(f - \lambda \cdot id_E)$.

(v) Il existe $P \in K[X]$ scindé à racines simples tel que $P(f) = 0$.

**Implications et logique**
(i) $\iff$ (ii) $\iff$ (iii) $\iff$ (iv) $\iff$ (v)

Pour (v) $\Rightarrow$ (iii) : $m_f \mid P$, et si $P$ est scindé à racines simples, alors $m_f$ l'est aussi.

**Condition suffisante rapide (pour les concours)**
*   Si $f$ vérifie $f^2 = f$ (projecteur) : $m_f \mid X(X-1)$, scindé à racines simples $\Rightarrow$ diagonalisable.
*   Si $f$ vérifie $f^k = id$ avec $\text{car}(K) \nmid k$ et $K$ contient les racines $k$-ièmes de l'unité : diagonalisable.

### 
**Subtilités**
*   La condition (iii) est souvent la plus rapide à vérifier en pratique : il suffit de trouver un polynôme annulateur scindé à racines simples.
*   En caractéristique nulle (sur $\mathbb{R}$ ou $\mathbb{C}$), les projecteurs ($f^2=f$) et les symétries ($f^2=id$) sont toujours diagonalisables.
*   La condition (v) donne une méthode : si on peut trouver $P$ annulateur scindé à racines simples sans calculer $m_f$, c'est suffisant.

**Pièges classiques**
*   $\chi_f$ scindé n'est pas suffisant — c'est l'erreur la plus fréquente en concours.
*   Sur $\mathbb{R}$ : une matrice peut avoir $\chi_f$ non scindé sur $\mathbb{R}$ (racines complexes non réelles), donc non diagonalisable sur $\mathbb{R}$ mais diagonalisable sur $\mathbb{C}$.
*   Confondre "polynôme annulateur" et "polynôme minimal" : tout polynôme annulateur est multiple du minimal, mais pas nécessairement égal.

---

## FLASHCARD 145 — Théorème 55 : Condition nécessaire et suffisante de trigonalisabilité

### RECTO
**Théorème 55 : Condition nécessaire et suffisante de trigonalisabilité**

Soit $E$ un $K$-espace vectoriel de dimension $n \ge 1$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème caractérisant la trigonalisabilité de $f$, avec hypothèses exactes et conclusion. Préciser le cas $K = \mathbb{C}$.

### VERSO
**Théorème**
$f$ est trigonalisable sur $K$ (il existe une base de $E$ dans laquelle la matrice de $f$ est triangulaire supérieure) si et seulement si $\chi_f$ est scindé sur $K$.

i.e., $\exists \lambda_1, \dots, \lambda_n \in K$ (non nécessairement distincts) tels que :
$$ \chi_f(X) = \prod_{i=1}^n (X - \lambda_i) $$

**Corollaire immédiat**
Tout endomorphisme d'un $\mathbb{C}$-espace vectoriel de dimension finie est trigonalisable (sur $\mathbb{C}$).
(Car $\mathbb{C}$ est algébriquement clos, donc $\chi_f$ est scindé sur $\mathbb{C}$ — théorème de d'Alembert-Gauss.)

**Forme de la matrice trigonalisée**
Si $f$ est trigonalisable de valeurs propres $\lambda_1, \dots, \lambda_k$ (distinctes, de multiplicités $n_1, \dots, n_k$), il existe une base dans laquelle la matrice de $f$ est :
$$ T = \begin{pmatrix} \lambda_1 & \ast & \cdots & \ast \\ 0 & \lambda_2 & \cdots & \ast \\ \vdots & \ddots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{pmatrix} $$
Les valeurs propres apparaissent sur la diagonale (avec multiplicités).

**Démonstration (esquisse)**
Par récurrence sur $n = \dim E$ :
*   $n=1$ : trivial.
*   Si $\chi_f$ est scindé, il admet une racine $\lambda_1 \in K$. Prendre $e_1$ vecteur propre associé.
*   Poser $F = E/\text{Vect}(e_1)$ (ou utiliser un supplémentaire), l'endomorphisme induit sur le quotient a un polynôme caractéristique qui est $\chi_f/(X-\lambda_1)$, encore scindé.
*   Appliquer l'hypothèse de récurrence.

### 
**Subtilités**
*   "Trigonalisable sur $K$" dépend du corps. Sur $\mathbb{R}$, une rotation d'angle $\pi/2$ en dimension 2 n'est pas trigonalisable (pas de valeur propre réelle). Sur $\mathbb{C}$, elle l'est.
*   La trigonalisabilité est strictement plus faible que la diagonalisabilité : $\chi_f$ scindé est nécessaire et suffisant pour trigonaliser, mais il faut en plus $m_f$ scindé à racines simples pour diagonaliser.
*   Un endomorphisme nilpotent (toutes les valeurs propres nulles) est trigonalisable, avec des 0 sur la diagonale, mais rarement diagonalisable (sauf si $f=0$).

**Pièges classiques**
*   Confondre trigonalisabilité et diagonalisabilité : $\chi_f$ scindé $\implies$ trigonalisable mais pas forcément diagonalisable.
*   Sur $\mathbb{R}$, $\chi_f$ est de degré $n$ et à coefficients réels. Il peut avoir des racines complexes non réelles, auquel cas $f$ n'est pas trigonalisable sur $\mathbb{R}$.
*   La démonstration par récurrence utilise souvent des quotients ou des supplémentaires — bien maîtriser la technique.

---

## FLASHCARD 146 — Corollaire 2

### RECTO
**Corollaire 2 : Trace et déterminant en termes des valeurs propres**

Soit $A \in M_n(K)$, et supposons $\chi_A$ scindé sur $K$ avec valeurs propres $\lambda_1, \dots, \lambda_n$ (comptées avec multiplicités).

**Question :** Exprimer $\text{tr}(A)$ et $\det(A)$ en termes des valeurs propres.

### VERSO
**Formules**
Si $\chi_A(X) = (X - \lambda_1)(X - \lambda_2) \dots (X - \lambda_n)$, alors :

$$ \text{tr}(A) = \sum_{i=1}^n \lambda_i $$

$$ \det(A) = \prod_{i=1}^n \lambda_i $$

**Démonstration**
En développant $\chi_A(X) = X^n - \text{tr}(A)X^{n-1} + \dots + (-1)^n \det(A)$, et en identifiant avec $\prod_{i=1}^n (X - \lambda_i) = X^n - (\sum \lambda_i) X^{n-1} + \dots + (-1)^n \prod \lambda_i$.

Plus précisément :
*   Coefficient de $X^{n-1}$ : $-\sum \lambda_i = -\text{tr}(A)$ donc $\text{tr}(A) = \sum \lambda_i$.
*   Terme constant : $(-1)^n \prod \lambda_i = (-1)^n \det(A)$ donc $\det(A) = \prod \lambda_i$.

**Généralisation (fonctions symétriques)**
Les coefficients de $\chi_A$ s'expriment par les polynômes symétriques élémentaires des valeurs propres :
$$ \chi_A(X) = \sum_{k=0}^n (-1)^k e_k(\lambda_1, \dots, \lambda_n) X^{n-k} $$
avec $e_k(\lambda_1, \dots, \lambda_n) = \sum_{i_1 < \dots < i_k} \lambda_{i_1} \dots \lambda_{i_k}$.

### 
**Subtilités**
*   Ces formules sont valables même si $\chi_A$ n'est pas scindé sur $K$, à condition de travailler sur $\bar{K}$ (clôture algébrique). La trace et le déterminant sont définis indépendamment.
*   En particulier : $\text{tr}(A)$ est le coefficient de $(-X^{n-1})$ dans $\chi_A$, et $\det(A) = (-1)^n \chi_A(0) = \chi_A(0) \cdot (-1)^n$.
*   **Matrice semblable :** trace et déterminant sont des invariants de similitude (ils ne dépendent que des valeurs propres).

**Pièges classiques**
*   **Signe de $\chi_A$ :** $\chi_A(X) = \det(XI - A)$, donc $\chi_A(0) = \det(-A) = (-1)^n \det(A)$. Attention au signe.
*   Sur $\mathbb{R}$, les valeurs propres complexes viennent par paires conjuguées, donc $\text{tr}(A) \in \mathbb{R}$ et $\det(A) \in \mathbb{R}$ — ce qui est cohérent.
*   Trace nulle $\not\Leftrightarrow$ déterminant nul (et vice-versa).

---

## FLASHCARD 147 — Corollaire 3 : Induit d'un trigonalisable

### RECTO
**Corollaire 3 : Induit d'un endomorphisme trigonalisable sur un sous-espace stable**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$ trigonalisable sur $K$, et $F$ un sous-espace vectoriel de $E$ stable par $f$.

**Question :** Montrer que l'endomorphisme induit $f|_F$ est aussi trigonalisable sur $K$. Quelle propriété du spectre en découle ?

### VERSO
**Théorème**
Soit $F$ un sous-espace de $E$ stable par $f$ (i.e., $f(F) \subset F$). Si $f$ est trigonalisable sur $K$, alors $f|_F : F \to F$ est aussi trigonalisable sur $K$.

**Démonstration**
$f$ trigonalisable $\implies \chi_f$ scindé sur $K$. Il suffit de montrer que $\chi_{f|_F}$ divise $\chi_f$ et est donc aussi scindé.

**Méthode :** Compléter une base $(e_1, \dots, e_p)$ de $F$ en une base $(e_1, \dots, e_p, e_{p+1}, \dots, e_n)$ de $E$. Dans cette base, la matrice de $f$ est :
$$ \begin{pmatrix} A & B \\ 0 & C \end{pmatrix} $$
où $A = \text{Mat}(f|_F)$ et le bloc nul traduit la stabilité de $F$. Alors :
$$ \chi_f(X) = \det \begin{pmatrix} XI_p - A & -B \\ 0 & XI_{n-p} - C \end{pmatrix} = \chi_{f|_F}(X) \cdot \det(XI_{n-p} - C) $$
Donc $\chi_{f|_F} \mid \chi_f$, et comme $\chi_f$ est scindé, $\chi_{f|_F}$ l'est aussi.

**Corollaire sur le spectre**
$$ Sp(f|_F) \subset Sp(f) $$

### 
**Subtilités**
*   La stabilité de $F$ est essentielle : sans elle, $f$ ne définit pas d'endomorphisme de $F$.
*   La relation $\chi_{f|_F} \mid \chi_f$ est plus forte que la simple inclusion des spectres : elle donne une information sur les multiplicités.
*   En particulier, si $f$ est diagonalisable, $f|_F$ l'est aussi (même raisonnement avec $m_{f|_F} \mid m_f$, et $m_f$ scindé à racines simples).

**Pièges classiques**
*   Ne pas oublier que le sous-espace $F$ doit être stable : un sous-espace quelconque ne donne pas d'endomorphisme induit bien défini.
*   La relation en blocs $\begin{pmatrix} A & B \\ 0 & C \end{pmatrix}$ est le calcul à maîtriser parfaitement.

---

## FLASHCARD 148 — À connaître 45

### RECTO
**À connaître 45 : Endomorphismes qui commutent — propriétés**

Soit $E$ un $K$-ev de dimension finie, $f, g \in \mathcal{L}(E)$ tels que $f \circ g = g \circ f$.

**Question :** Énoncer les propriétés de stabilité des sous-espaces propres de $f$ par $g$. Quelle conséquence pour la codiagonalisabilité ?

### VERSO
**Propriété fondamentale**
Si $f \circ g = g \circ f$ et $\lambda$ est valeur propre de $f$, alors le sous-espace propre $E_\lambda(f) = \ker(f - \lambda id)$ est stable par $g$.

**Démonstration :** Soit $x \in E_\lambda(f)$, i.e., $f(x) = \lambda x$. Alors :
$$ f(g(x)) = g(f(x)) = g(\lambda x) = \lambda g(x) $$
Donc $g(x) \in E_\lambda(f)$. $\square$

**Plus généralement**
Les sous-espaces $\ker(f - \lambda id)^k$ (espaces caractéristiques) sont stables par $g$ si $f$ et $g$ commutent.

**Corollaire pour la codiagonalisabilité**
Si $f$ et $g$ commutent et sont tous deux diagonalisables, alors ils sont simultanément diagonalisables (il existe une base de $E$ dans laquelle les matrices de $f$ et de $g$ sont toutes deux diagonales).

**Démonstration :** Sur chaque $E_\lambda(f)$ (stable par $g$), l'endomorphisme $g|_{E_\lambda(f)}$ est diagonalisable (induit d'un diagonalisable sur un sous-espace stable). Diagonaliser $g$ sur chaque $E_\lambda(f)$ donne une base de vecteurs propres communs.

**Réciproque**
Si $f$ et $g$ sont simultanément diagonalisables, alors $f \circ g = g \circ f$.

### 
**Subtilités**
*   La condition "tous deux diagonalisables" est indispensable pour la codiagonalisabilité. Si l'un est seulement trigonalisable, on peut avoir cotrigonalisabilité, pas codiagonalisabilité.
*   La stabilité s'étend aux polynômes en $f$ et $g$ : si $f$ et $g$ commutent, alors $P(f)$ commute avec $Q(g)$ pour tous polynômes $P, Q$.

**Pièges classiques**
*   Le résultat de stabilité $E_\lambda(f)$ stable par $g$ est valable pour n'importe quels $f, g$ qui commutent, sans hypothèse de diagonalisabilité.
*   En exam, la stratégie standard est : identifier les sous-espaces stables communs, puis diagonaliser sur chacun.

---

## FLASHCARD 149 — Proposition 44 : Nilpotents

### RECTO
**Proposition 44 : Endomorphismes nilpotents**

Soit $E$ un $K$-ev de dimension $n \ge 1$, $f \in \mathcal{L}(E)$.

**Question :** Définir un endomorphisme nilpotent. Énoncer les équivalences caractérisant la nilpotence. Donner les propriétés fondamentales (spectre, polynôme caractéristique, polynomial minimal).

### VERSO
**Définition**
$f$ est nilpotent s'il existe $k \in \mathbb{N}^*$ tel que $f^k = 0$.
Le plus petit tel $k$ est l'indice de nilpotence de $f$ (noté $\nu(f)$).

**Équivalences**
Les assertions suivantes sont équivalentes :
(i) $f$ est nilpotent.
(ii) $\chi_f(X) = X^n$.
(iii) $Sp(f) = \{0\}$ (la seule valeur propre est $0$, si $K$ est algébriquement clos, ou $\chi_f = X^n$).
(iv) $m_f = X^\nu$ pour un certain $\nu \in \llbracket 1, n \rrbracket$.
(v) $f$ est trigonalisable avec $0$ sur toute la diagonale.

**Propriétés**
*   $\text{tr}(f) = 0$ (somme des valeurs propres toutes nulles)
*   $\det(f) = 0$ (produit des valeurs propres toutes nulles), donc $f$ n'est pas inversible (sauf si $E=\{0\}$)
*   $\nu(f) \le n$ (car $m_f \mid \chi_f = X^n$ et $\deg m_f \le n$)
*   Si $f^{n-1} \neq 0$ et $f^n = 0$ : $\nu(f) = n$, et $f$ est semblable à la matrice de Jordan nilpotente $J_n(0)$.

**Exemples canoniques**
*   Matrice $N = \begin{pmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix}$ : nilpotente d'indice 3.
*   Toute matrice strictement triangulaire supérieure est nilpotente.

### 
**Subtilités**
*   L'équivalence (ii) $\iff$ (i) utilise Cayley-Hamilton : $f^n = 0$ si $\chi_f = X^n$ (car Cayley-Hamilton donne $\chi_f(f) = f^n = 0$).
*   La réciproque : si $f$ nilpotent, toutes les valeurs propres sont $0$, donc $\chi_f = X^n$ (si $\chi_f$ est scindé, ce qui est le cas sur $\mathbb{C}$ ou si l'endomorphisme est nilpotent il est trigonalisable avec des $0$).
*   Trace nulle $\not\Rightarrow$ nilpotent : contre-exemple $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$.

**Pièges classiques**
*   Confondre "nilpotent" et "a $0$ comme valeur propre" : si $0$ est valeur propre mais pas la seule, $f$ n'est pas nilpotent. Ex : $\begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}$.
*   L'indice de nilpotence satisfait $\nu \le n$ mais peut être strictement plus petit que $n$. Ex : $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ dans $M_2$ a $\nu = 2 = n$.

---

## FLASHCARD 150 — Lemme 4

### RECTO
**Lemme 4 : Noyaux itérés d'un endomorphisme nilpotent**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$ nilpotent d'indice $\nu$.

**Question :** Énoncer les propriétés des noyaux itérés $\ker(f^k)$ pour $k \ge 0$. Donner la suite des dimensions et sa stabilisation.

### VERSO
**Suite des noyaux itérés**
Posons $N_k = \ker(f^k)$ pour $k \ge 0$.

**Propriétés :**
*   $N_0 = \{0\} \subset N_1 \subset N_2 \subset \dots \subset N_\nu = E$
*   La suite $(\dim N_k)_{k \ge 0}$ est strictement croissante jusqu'à $k=\nu$, puis constante égale à $n$.
    $$ 0 = \dim N_0 < \dim N_1 < \dim N_2 < \dots < \dim N_\nu = n $$
*   Stabilisation : $N_k = N_{k+1} \iff f|_{N_{k+1}} = 0 \dots$ En fait : si $N_k = N_{k+1}$ alors $N_k = N_j$ pour tout $j \ge k$.

**Lemme des noyaux (propriété clé)**
*   Si $f^k = 0$ (i.e., $\nu \le k$), alors $N_k = E$.
*   Si $f^{k+1} = 0$ et $f^k \neq 0$, alors $\dim N_{k+1} > \dim N_k$.

**Conséquence sur l'indice**
$$ \nu(f) = \min \{k \ge 0 : f^k = 0\} \le n $$
Et $\nu(f) = n$ si et seulement si il existe $x \in E$ tel que $(x, f(x), \dots, f^{n-1}(x))$ est une base de $E$ (base cyclique ou de Jordan).

### 
**Subtilités**
*   La stricte croissance jusqu'à $\nu$ garantit que $\nu \le n$ : en effet, $n+1$ termes strictement croissants dans $\{0, 1, \dots, n\}$ est impossible.
*   La suite des sauts $d_k = \dim N_k - \dim N_{k-1}$ est décroissante : $d_1 \ge d_2 \ge \dots \ge d_\nu \ge 1$. C'est lié à la structure des blocs de Jordan.

**Pièges classiques**
*   Ne pas confondre "noyaux itérés de $f$" avec "noyaux itérés de $f - \lambda id$" (espaces caractéristiques), qui sont le bon outil pour la décomposition de Dunford.
*   La décroissance des sauts n'est pas à démontrer en concours mais est utile pour déterminer la forme de Jordan.

---

## FLASHCARD 151 — À connaître 46 : Codiagonalisation, cotrigonalisation

### RECTO
**À connaître 46 : Codiagonalisation et cotrigonalisation**

Soit $E$ un $K$-ev de dimension finie, et $f_1, \dots, f_p \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème de codiagonalisation simultanée, et le théorème de cotrigonalisation. Donner les conditions nécessaires et suffisantes.

### VERSO
**Codiagonalisation simultanée**
**Théorème :** Les endomorphismes $f_1, \dots, f_p$ sont simultanément diagonalisables (il existe une base de $E$ dans laquelle toutes les matrices de $f_i$ sont diagonales) si et seulement si :
1.  Chaque $f_i$ est diagonalisable (sur $K$),
2.  Les $f_i$ commutent deux à deux : $\forall i \neq j, f_i \circ f_j = f_j \circ f_i$.

**Idée de preuve :** Par récurrence sur $p$ et sur $\dim E$, en utilisant la stabilité des sous-espaces propres de $f_1$ par les $f_j$ (qui commutent), puis en diagonalisant simultanément les induits.

**Cotrigonalisation simultanée**
**Théorème :** Les endomorphismes $f_1, \dots, f_p$ sont simultanément trigonalisables si et seulement si :
1.  Chaque $f_i$ est trigonalisable (sur $K$),
2.  Les $f_i$ commutent deux à deux.

**Application pratique**
Pour deux endomorphismes $f, g$ :
*   $f, g$ diagonalisables et $fg = gf \implies$ base commune de diagonalisation.
*   **En pratique :** diagonaliser $f$ d'abord, puis diagonaliser $g$ restreint à chaque sous-espace propre de $f$.

### 
**Subtilités**
*   La commutativité seule ne suffit pas (sans diagonalisabilité).
*   La diagonalisabilité seule ne suffit pas (sans commutativité) : deux rotations dans $\mathbb{R}^2$ (d'angles différents de $\pi$) ne commutent pas en général.
*   Sur $\mathbb{C}$ : tout endomorphisme est trigonalisable, donc pour la cotrigonalisation il suffit de la commutativité.

**Pièges classiques**
*   Oublier de vérifier la commutativité deux à deux (et pas seulement globale).
*   En dimension infinie, ces théorèmes ne s'appliquent plus directement.

---

## FLASHCARD 152 — À connaître 47 : Caractérisation des nilpotents par la trace

### RECTO
**À connaître 47 : Caractérisation des nilpotents par les traces des puissances**

Soit $K$ un corps de caractéristique $0$ (e.g., $K = \mathbb{R}$ ou $\mathbb{C}$), $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer la caractérisation des endomorphismes nilpotents en termes des traces de puissances.

### VERSO
**Théorème**
Supposons $\text{car}(K) = 0$. Alors :
$$ f \text{ nilpotent} \iff \forall k \in \{1, 2, \dots, n\}, \text{tr}(f^k) = 0 $$

**Démonstration**
*   $(\Rightarrow)$ : Si $f$ nilpotent, les valeurs propres sont toutes nulles (Prop. 44), donc $\text{tr}(f^k) = \sum_i \lambda_i^k = 0$.
*   $(\Leftarrow)$ : Notons $s_k = \text{tr}(f^k)$ et $\lambda_1, \dots, \lambda_n$ les valeurs propres (dans $\bar{K}$). Les relations de Newton relient les $s_k$ aux fonctions symétriques élémentaires $e_k$ des valeurs propres :
    $$ s_k - e_1 s_{k-1} + e_2 s_{k-2} - \dots + (-1)^{k-1} e_{k-1} s_1 + (-1)^k k e_k = 0 $$
    Si $s_1 = s_2 = \dots = s_n = 0$ et $\text{car}(K) = 0$ (donc $k \neq 0$ dans $K$), on déduit par récurrence $e_1 = e_2 = \dots = e_n = 0$, donc $\chi_f = X^n$, donc $f$ nilpotent.

**Remarque sur la caractéristique**
En caractéristique $p > 0$, le résultat est faux : par exemple sur $\mathbb{F}_p$, $\text{tr}(f^k) = 0$ pour tout $k$ ne garantit pas la nilpotence.

### 
**Subtilités**
*   La condition $\text{car}(K) = 0$ est essentielle : elle intervient dans les relations de Newton via les facteurs $k$.
*   Il suffit de vérifier les puissances $k = 1, \dots, n$ (pas toutes les puissances).
*   Ce résultat est utile pour prouver la nilpotence sans calculer explicitement les puissances de $f$.

**Pièges classiques**
*   Croire que $\text{tr}(f) = 0$ suffit pour conclure à la nilpotence : faux. Il faut $\text{tr}(f^k) = 0$ pour $k = 1, \dots, n$.
*   En caractéristique $p$, les relations de Newton dégénèrent pour $k=p$.

---

## FLASHCARD 153 — Lemme 5

### RECTO
**Lemme 5 : Lemme de décomposition (préliminaire à la décomposition de Dunford)**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$, et $P, Q \in K[X]$ tels que $P$ et $Q$ sont premiers entre eux (i.e., $\text{pgcd}(P, Q) = 1$).

**Question :** Si $PQ(f) = 0$, que peut-on dire de $\ker(P(f))$ et $\ker(Q(f))$ ?

### VERSO
**Lemme**
Soient $P, Q \in K[X]$ avec $\text{pgcd}(P, Q) = 1$, et $f \in \mathcal{L}(E)$ tel que $PQ(f) = (PQ)(f) = 0$. Alors :
$$ E = \ker(P(f)) \oplus \ker(Q(f)) $$

**Démonstration**
Par Bézout : $\exists U, V \in K[X], UP + VQ = 1$. En évaluant en $f$ :
$$ U(f) \circ P(f) + V(f) \circ Q(f) = id_E $$
*   **Somme :** Tout $x \in E$ s'écrit $x = U(f)(P(f)(x)) + V(f)(Q(f)(x))$.
    Posons $y = V(f)(Q(f)(x))$. Alors $P(f)(y) = P(f) \circ V(f) \circ Q(f)(x) = V(f) \circ (PQ)(f)(x) = 0$, donc $y \in \ker(P(f))$.
    De même $U(f)(P(f)(x)) \in \ker(Q(f))$.
    Donc $E = \ker(P(f)) + \ker(Q(f))$.
*   **Directe :** Si $x \in \ker(P(f)) \cap \ker(Q(f))$, alors $x = U(f)(P(f)(x)) + V(f)(Q(f)(x)) = 0$.

**Généralisation : théorème de décomposition des noyaux**
Si $m_f = P_1^{n_1} \dots P_k^{n_k}$ (factorisation en irréductibles deux à deux premiers entre eux sur $K$), alors :
$$ E = \bigoplus_{i=1}^k \ker(P_i^{n_i}(f)) $$

### 
**Subtilités**
*   Le lemme s'applique sous la seule condition $PQ(f) = 0$ (pas nécessairement $m_f = PQ$) et $\text{pgcd}(P, Q) = 1$.
*   Les sous-espaces $\ker(P(f))$ et $\ker(Q(f))$ sont stables par $f$.
*   C'est le lemme fondamental pour la décomposition de Dunford et la réduction de Jordan.

**Pièges classiques**
*   Oublier la condition $\text{pgcd}(P, Q) = 1$ : sans cela, la somme n'est pas directe.
*   Appliquer le lemme avec $P = (X - \lambda)$ et $Q = \chi_f / (X - \lambda)^{m_a(\lambda)}$ pour isoler l'espace caractéristique.

---

## FLASHCARD 154 — Lemme 6 : Racines du polynôme minimal

### RECTO
**Lemme 6 : Racines du polynôme minimal**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Montrer que $\lambda \in K$ est valeur propre de $f$ si et seulement si $\lambda$ est racine de $m_f$. Autrement dit : $Sp(f)$ est exactement l'ensemble des racines de $m_f$ dans $K$.

### VERSO
**Énoncé**
$$ \lambda \in Sp(f) \iff m_f(\lambda) = 0 $$
i.e., les racines de $m_f$ dans $K$ sont exactement les valeurs propres de $f$.

**Démonstration**
*   $(\Rightarrow)$ : Soit $\lambda$ valeur propre, $x \neq 0$ vecteur propre : $f(x) = \lambda x$. Alors $m_f(f)(x) = m_f(\lambda) x$ (car $f^k(x) = \lambda^k x$). Comme $m_f(f) = 0$ et $x \neq 0$, on a $m_f(\lambda) = 0$.
*   $(\Leftarrow)$ : Soit $\lambda$ racine de $m_f$. Écrivons $m_f(X) = (X - \lambda) Q(X)$ avec $Q \in K[X]$.
    Comme $m_f$ est le minimal, $Q(f) \neq 0$. Donc $\exists x \neq 0 : Q(f)(x) \neq 0$.
    Posons $y = Q(f)(x) \neq 0$. Alors :
    $$ (f - \lambda id)(y) = (f - \lambda id) \circ Q(f)(x) = m_f(f)(x) = 0 $$
    Donc $f(y) = \lambda y$ et $y \neq 0$ : $\lambda$ est valeur propre. $\square$

**Corollaire**
$m_f$ et $\chi_f$ ont les mêmes racines dans $K$ (les valeurs propres de $f$).

### 
**Subtilités**
*   Ce lemme est fondamental : il justifie pourquoi $m_f$ contient exactement les même facteurs linéaires que $\chi_f$, juste avec des multiplicités potentiellement plus petites.
*   La démonstration de $(\Leftarrow)$ utilise la minimalité de $m_f$ : si $(X - \lambda) \mid m_f$ mais $Q = m_f / (X - \lambda)$ n'annule pas $f$, c'est qu'on peut "fabriquer" un vecteur propre.

**Pièges classiques**
*   Ne pas confondre "racine de $m_f$" et "racine de $\chi_f$" : elles coïncident, mais les multiplicités diffèrent.
*   Ce lemme ne parle que des racines dans $K$, pas dans $\bar{K}$.

---

Voici la suite et fin de la réécriture de votre fichier, en reprenant à la **Flashcard 155**.

---

## FLASHCARD 155 — À connaître 48 : Matrice compagnon

### RECTO
**À connaître 48 : Matrice compagnon**

Soit $P(X) = X^n + a_{n-1} X^{n-1} + \dots + a_1 X + a_0 \in K[X]$ un polynôme unitaire de degré $n$.

**Question :** Définir la matrice compagnon de $P$. Quel est son polynôme caractéristique ? Son polynôme minimal ?

### VERSO
**Définition**
La matrice compagnon de $P$ est :
$$ C(P) = \begin{pmatrix} 0 & 0 & \dots & 0 & -a_0 \\ 1 & 0 & \dots & 0 & -a_1 \\ 0 & 1 & \dots & 0 & -a_2 \\ \vdots & \ddots & \ddots & \vdots & \vdots \\ 0 & 0 & \dots & 1 & -a_{n-1} \end{pmatrix} \in M_n(K) $$
(La dernière colonne contient les coefficients de $-P$ à partir du degré $0$.)

**Propriétés fondamentales**
**Théorème :** $\chi_{C(P)} = P$ et $m_{C(P)} = P$.

i.e., la matrice compagnon est un exemple canonique où polynôme minimal = polynôme caractéristique.

**Démonstration :**
*   $\chi_{C(P)} = P$ : par développement direct du déterminant $\det(XI_n - C(P))$ le long de la dernière colonne (récurrence).
*   $m_{C(P)} = P$ : puisque $\deg m_{C(P)} \le n = \deg \chi_{C(P)} = \deg P$ et $m_{C(P)} \mid \chi_{C(P)} = P$. De plus, si on note $(e_1, \dots, e_n)$ la base canonique, on a $C(P)e_k = e_{k+1}$ pour $k < n$. Ainsi la famille $(e_1, C(P)e_1, \dots, C(P)^{n-1}e_1)$ est libre (c'est la base canonique). Aucun polynôme de degré $< n$ ne peut annuler $C(P)$ (sinon il annulerait $e_1$ de façon non triviale). Donc $\deg m_{C(P)} = n$, d'où $m_{C(P)} = P$.

**Application**
Tout polynôme unitaire de degré $n$ est le polynôme minimal (et caractéristique) d'une matrice $n \times n$ : il suffit de prendre sa matrice compagnon.

### 
**Subtilités**
*   La matrice compagnon réalise l'isomorphisme $K[X]/(P) \simeq K^n$ comme $K[X]$-modules, où $X$ agit par $C(P)$.
*   Elle est utilisée dans la preuve du théorème de Cayley-Hamilton et dans la réduction des matrices.
*   $m_{C(P)} = \chi_{C(P)} = P$ : c'est l'un des rares cas où polynôme minimal et caractéristique coïncident de façon garantie.

**Pièges classiques**
*   La convention peut varier (lignes/colonnes) : bien préciser la convention utilisée.
*   Ne pas confondre "matrice compagnon de $P$" et "matrice d'un endomorphisme dont $P$ est un annulateur quelconque" : la matrice compagnon a $P$ comme polynôme minimal.

---

## FLASHCARD 156 — Théorème 56 : Cayley-Hamilton

### RECTO
**Théorème 56 : Théorème de Cayley-Hamilton**

Soit $K$ un corps, $E$ un $K$-espace vectoriel de dimension finie $n \ge 1$, $f \in \mathcal{L}(E)$ et $A = \text{Mat}_B(f)$ sa matrice dans une base $B$.

**Question :** Énoncer le théorème de Cayley-Hamilton avec hypothèses exactes et conclusion. Donner une esquisse de preuve rigoureuse.

### VERSO
**Hypothèses**
*   $K$ corps quelconque
*   $A \in M_n(K)$
*   $\chi_A(X) = \det(XI_n - A)$ le polynôme caractéristique de $A$

**Énoncé formel**
**Théorème de Cayley-Hamilton :**
$$ \chi_A(A) = 0_{M_n(K)} $$

i.e., toute matrice carrée est annulée par son propre polynôme caractéristique.

En termes d'endomorphismes : $\chi_f(f) = 0_{\mathcal{L}(E)}$.

**Corollaires immédiats**
*   $m_f \mid \chi_f$ (le polynôme minimal divise le polynôme caractéristique).
*   $\deg(m_f) \le n$.
*   $f^n$ est combinaison linéaire de $id, f, \dots, f^{n-1}$ (expression de Cayley-Hamilton pour le calcul de puissances).

**Démonstration rigoureuse (méthode de la matrice adjointe)**
Soit $B(X) = XI_n - A \in M_n(K[X])$. Considérons la matrice adjointe (transposée de la comatrice) :
$$ \text{adj}(B(X)) \in M_n(K[X]) $$

Par définition de l'adjointe : $B(X) \cdot \text{adj}(B(X)) = \det(B(X)) \cdot I_n = \chi_A(X) I_n$.

Les coefficients de $\text{adj}(B(X))$ sont des polynômes en $X$ de degré $\le n-1$ :
$$ \text{adj}(B(X)) = C_{n-1} X^{n-1} + C_{n-2} X^{n-2} + \dots + C_0 $$
avec $C_k \in M_n(K)$. En développant :
$$ (XI_n - A)(C_{n-1}X^{n-1} + \dots + C_0) = \chi_A(X) I_n $$

En identifiant les coefficients de $X^k$ des deux membres, on obtient $n+1$ relations matricielles. En multipliant la relation de $X^k$ par $A^k$ et en sommant, tout se télescope et donne $\chi_A(A) = 0$. $\square$

**Mise en garde :** La substitution naïve "$X=A$ dans $\det(XI - A) = 0$" est fausse : on substitue une matrice à une variable scalaire dans un déterminant scalaire, ce qui n'a pas de sens direct. La preuve ci-dessus est la seule correcte.

### 
**Subtilités**
*   L'erreur classique : "Puisque $\det(\lambda I - A) = \chi_A(\lambda) = 0$ pour $\lambda$ valeur propre, en mettant $A$ à la place de $\lambda$, on obtient $\chi_A(A) = 0$." Ce raisonnement est faux.
*   La preuve correcte travaille dans $M_n(K[X])$ (matrices à coefficients polynomiaux) et utilise l'identité de l'adjointe avant de spécialiser.
*   Sur un corps quelconque (même de caractéristique $p$), le théorème reste vrai.

**Pièges classiques**
*   Confondre $\chi_A(A) = 0$ (Cayley-Hamilton, vrai) avec $\chi_A(\lambda) = 0 \implies \lambda$ v.p. (définition des valeurs propres, différent).
*   Utiliser Cayley-Hamilton pour calculer $A^{-1}$ : si $\chi_A = X^n + a_{n-1}X^{n-1} + \dots + a_0$ avec $a_0 \neq 0$, alors $A^{-1} = -\frac{1}{a_0}(A^{n-1} + a_{n-1}A^{n-2} + \dots + a_1 I_n)$.
*   En dimension infinie, Cayley-Hamilton n'a pas d'analogue direct.

---

## FLASHCARD 157 — Lemme 7 : Décomposition des noyaux

### RECTO
**Lemme 7 (de décomposition des noyaux)**

Soit $E$ un $K$-ev de dimension finie, $f \in \mathcal{L}(E)$.

Soit $P_1, \dots, P_k \in K[X]$ des polynômes deux à deux premiers entre eux, et $P = P_1 \dots P_k$.

**Question :** Énoncer le lemme de décomposition des noyaux (théorème chinois des endomorphismes).

### VERSO
**Énoncé formel**
Si $P(f) = 0$ et $P = P_1 \dots P_k$ avec $\text{pgcd}(P_i, P_j) = 1$ pour $i \neq j$, alors :
$$ E = \bigoplus_{i=1}^k \ker(P_i(f)) $$

**Propriétés supplémentaires**
*   Chaque $F_i = \ker(P_i(f))$ est stable par $f$.
*   $f|_{F_i}$ a pour polynôme minimal $P_i^{n_i}$ où $P_i^{n_i} \mid P$ (à préciser selon le contexte).
*   La projection sur $F_i$ parallèlement à $\bigoplus_{j \neq i} F_j$ est un polynôme en $f$.

**Démonstration (récurrence sur $k$)**
Cas $k=2$ : Bézout donne $UP_1 + VP_2 = 1$ (avec $P_1P_2(f) = 0$). Alors $id = U(f)P_1(f) + V(f)P_2(f)$, ce qui donne la décomposition $E = \ker P_1(f) \oplus \ker P_2(f)$ (Lemme 5).

Récurrence : $P_1$ et $P_2 \dots P_k$ sont premiers entre eux (par Gauss), donc on décompose d'abord $E = \ker P_1(f) \oplus \ker(P_2 \dots P_k)(f)$, puis on applique l'hypothèse de récurrence à $\ker(P_2 \dots P_k)(f)$.

**Application : Décomposition de Dunford (esquisse)**
Si $\chi_f = \prod_{i=1}^k (X - \lambda_i)^{n_i}$ (scindé sur $K$), les polynômes $(X - \lambda_i)^{n_i}$ sont deux à deux premiers entre eux, d'où :
$$ E = \bigoplus_{i=1}^k \ker(f - \lambda_i id)^{n_i} $$
Ce sont les espaces caractéristiques de $f$.

### 
**Subtilités**
*   Il suffit que $P(f) = 0$ (pas nécessairement $P = m_f$) : n'importe quel annulateur scindé en facteurs premiers entre eux convient.
*   Les projections $\pi_i$ sur $\ker P_i(f)$ sont des polynômes en $f$ : $\pi_i = Q_i(f)$ où $Q_i$ est construit par Bézout.
*   Le lemme est la clef de la décomposition de Dunford et de la réduction de Jordan.

**Pièges classiques**
*   Oublier que les $P_i$ doivent être deux à deux premiers entre eux, pas seulement sans facteur commun global.
*   Si $P = m_f$, les $\ker P_i(f)$ sont exactement les espaces caractéristiques et leur décomposition est intrinsèque.

---

## FLASHCARD 158 — Proposition 45

### RECTO
**Proposition 45 : Sous-espaces caractéristiques — propriétés**

Soit $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$, $\chi_f$ scindé sur $K$ avec valeurs propres $\lambda_1, \dots, \lambda_k$ de multiplicités $n_1, \dots, n_k$.

**Question :** Définir les sous-espaces caractéristiques de $f$ et en énoncer les propriétés (dimension, lien avec $\chi_f$, lien avec les espaces propres).

### VERSO
**Définition**
Le sous-espace caractéristique associé à $\lambda_i$ est :
$$ C_{\lambda_i}(f) = \ker(f - \lambda_i id)^{n_i} = \ker(f - \lambda_i id)^n $$
(les deux définitions coïncident, et il suffit de prendre une puissance $\ge n_i$).

**Propriétés**
**Proposition :**
*   $\dim C_{\lambda_i}(f) = n_i$ (la multiplicité algébrique).
*   $C_{\lambda_i}(f)$ est stable par $f$.
*   $E_{\lambda_i}(f) = \ker(f - \lambda_i id) \subset C_{\lambda_i}(f)$ (l'espace propre est inclus dans le caractéristique).
*   $E = \bigoplus_{i=1}^k C_{\lambda_i}(f)$ (décomposition de Dunford des noyaux).
*   L'endomorphisme induit $(f - \lambda_i id)|_{C_{\lambda_i}(f)}$ est nilpotent d'indice $\le n_i$.

**Décomposition de Dunford**
**Conséquence :** Sur chaque $C_{\lambda_i}(f)$, on peut écrire $f = \lambda_i id + (f - \lambda_i id)$ comme somme d'un scalaire et d'un nilpotent. Globalement :
$$ f = D + N $$
où $D$ est diagonalisable, $N$ nilpotent, $D \circ N = N \circ D$ (décomposition de Dunford).

### 
**Subtilités**
*   $\dim C_{\lambda_i}(f) = n_i$ (multiplicité algébrique), tandis que $\dim E_{\lambda_i}(f) = m_g(\lambda_i) \le n_i$.
*   La décomposition $E = \bigoplus C_{\lambda_i}$ n'est possible que si $\chi_f$ est scindé sur $K$.
*   L'indice de nilpotence de $(f - \lambda_i id)|_{C_{\lambda_i}(f)}$ est lié à la taille des blocs de Jordan associés à $\lambda_i$.

**Pièges classiques**
*   Confondre espace propre ($\ker(f - \lambda id)$) et espace caractéristique ($\ker(f - \lambda id)^{n_i}$).
*   La décomposition $f = D + N$ de Dunford est unique sous les conditions de commutativité et de nilpotence/diagonalisabilité.

---

## FLASHCARD 159 — Théorème 57 : Théorème de Jordan (décomposition de Jordan)

### RECTO
**Théorème 57 : Décomposition de Jordan**

Soit $K$ un corps algébriquement clos (e.g., $K = \mathbb{C}$), $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème de réduction de Jordan : existence d'une base de Jordan, forme de la matrice de Jordan, unicité.

### VERSO
**Théorème**
Soit $K$ algébriquement clos. Tout endomorphisme $f \in \mathcal{L}(E)$ admet une base de Jordan, i.e., une base dans laquelle sa matrice est de la forme :
$$ J = \text{diag}(J_{n_1}(\lambda_1), J_{n_2}(\lambda_2), \dots, J_{n_r}(\lambda_r)) $$
où chaque bloc de Jordan est :
$$ J_k(\lambda) = \begin{pmatrix} \lambda & 1 & 0 & \cdots & 0 \\ 0 & \lambda & 1 & \cdots & 0 \\ \vdots & \ddots & \ddots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda & 1 \\ 0 & 0 & \cdots & 0 & \lambda \end{pmatrix} \in M_k(K) $$

**Unicité**
La forme de Jordan est unique à permutation des blocs près : les blocs $J_{n_i}(\lambda_i)$ sont déterminés uniquement (leurs tailles et valeurs propres).

**Lien avec les invariants**
*   Les valeurs propres $\lambda_i$ sont les racines de $\chi_f$ (avec multiplicités).
*   Le nombre de blocs de Jordan associés à $\lambda = \dim \ker(f - \lambda id) = m_g(\lambda)$.
*   La taille du plus grand bloc de Jordan associé à $\lambda =$ indice de nilpotence de $(f - \lambda id)|_{C_\lambda}$.
*   $f$ diagonalisable $\iff$ tous les blocs sont de taille 1.

**Structure des blocs**
Sur chaque bloc $J_k(\lambda)$ : la restriction de $f$ à l'espace correspondant vérifie $(f - \lambda id)^k = 0$ mais $(f - \lambda id)^{k-1} \neq 0$.

### 
**Subtilités**
*   $K$ algébriquement clos est nécessaire pour que $\chi_f$ soit scindé. Sur $\mathbb{R}$, la forme de Jordan n'existe pas toujours (mais il existe une forme réelle de Jordan avec des blocs $2 \times 2$ pour les valeurs propres complexes conjuguées).
*   L'unicité est un théorème non trivial. Elle se déduit des invariants : nombre de blocs de chaque taille pour chaque valeur propre.
*   La forme de Jordan est la "forme canonique" pour la similitude sur un corps algébriquement clos.

**Programme MP**
En MP, la forme de Jordan est au programme sur $\mathbb{C}$ (ou plus généralement sur un corps algébriquement clos). La démonstration complète de l'unicité est hors programme strict, mais l'énoncé et l'utilisation sont exigibles.
Utilisation pratique : calculer des puissances de matrices, résoudre des équations différentielles, étudier $e^{tA}$.

**Pièges classiques**
*   $f$ trigonalisable $\not\Rightarrow$ réductible en Jordan sur $\mathbb{R}$ (manque de valeurs propres réelles).
*   Confondre "nombre de blocs" ($= m_g$) et "taille des blocs" ($=$ ordre de nilpotence).
*   La forme de Jordan dépend de $K$ : sur $\mathbb{C}$ elle existe toujours, sur $\mathbb{R}$ pas forcément.

---

## FLASHCARD 160 — Proposition 46 : Induit d'un endomorphisme diagonalisable

### RECTO
**Proposition 46 : Induit d'un endomorphisme diagonalisable sur un sous-espace stable**

Soit $E$ un $K$-ev de dimension finie, $f \in \mathcal{L}(E)$ diagonalisable, et $F$ un sous-espace de $E$ stable par $f$.

**Question :** Montrer que l'endomorphisme induit $f|_F$ est diagonalisable.

### VERSO
**Énoncé**
Si $f$ est diagonalisable et $F$ est un sous-espace stable par $f$, alors $f|_F : F \to F$ est diagonalisable.

**Démonstration**
**Méthode 1 (via le polynôme minimal) :**
$f$ diagonalisable $\implies m_f$ est scindé à racines simples : $m_f = \prod_{i=1}^k (X - \lambda_i)$.
Comme $m_f(f) = 0$ et $F$ est stable par $f$ : $m_f(f|_F) = (m_f(f))|_F = 0$.
Donc $m_{f|_F} \mid m_f$, et comme $m_f$ est scindé à racines simples, $m_{f|_F}$ l'est aussi.
Donc $f|_F$ est diagonalisable. $\square$

**Méthode 2 (via les bases) :**
$f$ diagonalisable $\implies E = \bigoplus_\lambda E_\lambda(f)$. Chaque $E_\lambda(f)$ est stable par $f$ (car $f$ agit comme $\lambda \cdot id$ dessus). Donc $F = \bigoplus_\lambda (F \cap E_\lambda(f))$ (somme directe car $F$ est stable), et $F \cap E_\lambda(f) = E_\lambda(f|_F)$. Donc $F$ est somme directe de sous-espaces propres de $f|_F$.

### 
**Subtilités**
*   La méthode 1 est la plus élégante et générale : elle utilise que le polynôme minimal de l'induit divise celui de l'endomorphisme.
*   La méthode 2 donne plus d'informations : $Sp(f|_F) \subset Sp(f)$. En particulier, les valeurs propres de $f|_F$ sont parmi celles de $f$.

**Pièges classiques**
*   La réciproque est fausse : si $f|_F$ est diagonalisable pour tout sous-espace stable $F$, il n'en découle pas forcément que $f$ est diagonalisable.
*   Bien vérifier la stabilité de $F$ avant d'appliquer la proposition.

---

## FLASHCARD 161 — Proposition 47

### RECTO
**Proposition 47 : Caractérisation matricielle de la diagonalisabilité**

Soit $A \in M_n(K)$.

**Question :** Donner des conditions équivalentes pour que $A$ soit diagonalisable sur $K$. En particulier, énoncer la condition en termes de similitude et de matrice diagonale.

### VERSO
**Équivalences**
Les assertions suivantes sont équivalentes :

(i) $A$ est diagonalisable sur $K$ : $\exists P \in GL_n(K), P^{-1}AP = D$ diagonale.

(ii) Il existe une base de $K^n$ formée de vecteurs propres de $A$.

(iii) $\chi_A$ est scindé sur $K$ et $\forall \lambda \in Sp(A), m_g(\lambda) = m_a(\lambda)$.

(iv) $m_A$ est scindé à racines simples sur $K$.

**Procédé de diagonalisation**
1.  Calculer $\chi_A(X)$ et le factoriser sur $K$.
2.  Pour chaque valeur propre $\lambda_i$ : calculer une base de $\ker(A - \lambda_i I_n)$.
3.  Vérifier que $\sum \dim \ker(A - \lambda_i I) = n$.
4.  La matrice de passage $P$ a pour colonnes les vecteurs propres.
5.  $P^{-1}AP = \text{diag}(\lambda_1, \dots, \lambda_n)$ (avec répétitions selon les multiplicités).

**Résultats sur les puissances**
Si $A = P D P^{-1}$ avec $D = \text{diag}(d_1, \dots, d_n)$, alors :
$$ A^k = P D^k P^{-1}, \quad D^k = \text{diag}(d_1^k, \dots, d_n^k) $$

### 
**Subtilités**
*   La diagonalisation dépend du corps $K$ : une matrice réelle peut être diagonalisable sur $\mathbb{C}$ mais pas sur $\mathbb{R}$.
*   La matrice de passage $P$ n'est pas unique : elle dépend du choix des vecteurs propres (normalisation, ordre).

**Pièges classiques**
*   Confondre $P^{-1}AP = D$ et $PAP^{-1} = D$ : les deux définitions coexistent selon les auteurs.
*   Oublier de vérifier que les colonnes de $P$ forment bien une base (i.e., $P$ inversible).
*   En calcul : ne pas oublier de calculer $P^{-1}$ pour obtenir la décomposition complète.

---

## FLASHCARD 162 — À connaître 49 : Diagonalisation à $\varepsilon$-près

### RECTO
**À connaître 49 : Diagonalisation à $\varepsilon$-près (densité des matrices diagonalisables)**

Soit $K = \mathbb{C}$ (ou tout corps infini), $n \ge 1$.

**Question :** Énoncer le théorème de densité des matrices diagonalisables dans $M_n(\mathbb{C})$, et en donner une conséquence pratique (approximation).

### VERSO
**Théorème**
L'ensemble des matrices diagonalisables sur $\mathbb{C}$ est dense dans $M_n(\mathbb{C})$ (pour toute norme).

Autrement dit : pour toute $A \in M_n(\mathbb{C})$ et tout $\varepsilon > 0$, il existe $A_\varepsilon \in M_n(\mathbb{C})$ diagonalisable telle que $\|A - A_\varepsilon\| < \varepsilon$.

**Idée de construction**
Si $A$ est trigonalisable (ce qui est toujours le cas sur $\mathbb{C}$), on écrit $A = PTP^{-1}$ avec $T$ triangulaire supérieure. On perturbe légèrement les entrées diagonales de $T$ pour les rendre distinctes : $T_\varepsilon = T + \varepsilon' D$ avec $D$ choisie pour rendre les valeurs propres distinctes. Alors $A_\varepsilon = P T_\varepsilon P^{-1}$ est diagonalisable (valeurs propres distinctes) et $\|A - A_\varepsilon\| \to 0$.

**Conséquences pratiques**
*   **Identités polynomiales :** Si une identité $P(A) = 0$ est vérifiée pour toutes les matrices diagonalisables, elle est vraie pour toutes les matrices (par densité et continuité).
*   **det et tr :** Des formules prouvées sur les matrices diagonalisables s'étendent par densité/continuité.
*   **Commutant :** L'étude du commutant d'une matrice peut se ramener au cas diagonalisable par densité.

**Sur $\mathbb{R}$**
Sur $\mathbb{R}$, les matrices diagonalisables (sur $\mathbb{R}$) ne sont pas denses dans $M_n(\mathbb{R})$ en général (les matrices sans valeurs propres réelles forment un ouvert non vide pour $n \ge 2$). Mais les matrices diagonalisables sur $\mathbb{C}$ (= trigonalisables sur $\mathbb{C}$) restent denses.

### 
**Subtilités**
*   Ce résultat est utilisé pour transférer des propriétés du cas diagonalisable au cas général, par un argument de densité/continuité.
*   La densité est relative à la topologie de $M_n(\mathbb{C}) \simeq \mathbb{C}^{n^2}$ (toutes les normes sont équivalentes en dimension finie).
*   Sur $\mathbb{R}$, il faut être plus prudent : les matrices à spectre réel simple (diagonalisables sur $\mathbb{R}$) forment un sous-ensemble ouvert mais pas dense.

**Pièges classiques**
*   Ne pas confondre "dense sur $\mathbb{C}$" et "dense sur $\mathbb{R}$".
*   La perturbation doit être faite de façon à préserver la trigonalisabilité (sur $\mathbb{C}$, c'est automatique).
*   En utilisant la densité pour prouver une identité, vérifier que l'identité est continue en les coefficients de la matrice.

---

## FLASHCARD 163 — À connaître 50 : Décomposition de Dunford

### RECTO
**À connaître 50 : Décomposition de Dunford**

Soit $K$ un corps, $E$ un $K$-ev de dimension finie $n$, $f \in \mathcal{L}(E)$. On suppose $\chi_f$ scindé sur $K$.

**Question :** Énoncer le théorème de décomposition de Dunford de $f = D + N$. Préciser les propriétés de $D$ et $N$, leur commutativité, et leur expression en termes de polynômes en $f$.

### VERSO
**Théorème de Dunford**
Sous l'hypothèse que $\chi_f$ est scindé sur $K$, il existe un unique couple $(D, N)$ d'endomorphismes de $E$ tel que :

1.  $f = D + N$
2.  $D$ est diagonalisable (sur $K$)
3.  $N$ est nilpotent
4.  $D$ et $N$ commutent : $D \circ N = N \circ D$

De plus, $D$ et $N$ sont des polynômes en $f$ (i.e., $D = P(f)$ et $N = Q(f)$ pour certains $P, Q \in K[X]$).

**Construction**
Soit $\chi_f = \prod_{i=1}^k (X - \lambda_i)^{n_i}$ (valeurs propres distinctes $\lambda_1, \dots, \lambda_k$).

Par le lemme de décomposition des noyaux : $E = \bigoplus_{i=1}^k C_{\lambda_i}$ où $C_{\lambda_i} = \ker(f - \lambda_i id)^{n_i}$.

Notons $\pi_i$ la projection sur $C_{\lambda_i}$ parallèlement aux autres (polynôme en $f$). Alors :
$$ D = \sum_{i=1}^k \lambda_i \pi_i, \quad N = f - D = \sum_{i=1}^k (f - \lambda_i id) \circ \pi_i $$

$D$ est diagonalisable (agit comme $\lambda_i$ sur $C_{\lambda_i}$), $N$ est nilpotent (agit comme $(f - \lambda_i id)|_{C_{\lambda_i}}$ qui est nilpotent).

**Unicité**
Si $f = D' + N'$ avec $D'$ diagonalisable, $N'$ nilpotent, $D'N' = N'D'$ : alors $D' = D$ et $N' = N$.

### 
**Subtilités**
*   **Hypothèse clé :** $\chi_f$ scindé sur $K$ est indispensable. Sur $\mathbb{R}$, si $f$ a des valeurs propres complexes non réelles, la décomposition de Dunford n'existe pas sur $\mathbb{R}$.
*   $D$ et $N$ sont des polynômes en $f$ : cela implique qu'ils commutent avec tout endomorphisme qui commute avec $f$.
*   La décomposition de Dunford généralise la diagonalisation : si $f$ est déjà diagonalisable, $N=0$.

**Application**
*   Calcul de $f^k$ : $f^k = (D+N)^k = \sum_{j=0}^{\nu-1} \binom{k}{j} D^{k-j} N^j$ (car $D$ et $N$ commutent, et $N^\nu = 0$).
*   Exponentielle : $e^{tA} = e^{tD} e^{tN}$ où $e^{tN} = \sum_{j=0}^{\nu-1} \frac{t^j}{j!} N^j$ (série finie).

**Pièges classiques**
*   Confondre décomposition de Dunford (sur $K$ si $\chi_f$ scindé) et forme de Jordan (sur corps algébriquement clos, donne plus d'informations).
*   Oublier l'unicité : il n'y a qu'une seule décomposition de Dunford.
*   En exam : utiliser la décomposition de Dunford pour calculer des puissances ou des exponentielles de matrices.

---

## FLASHCARD 164 — Théorème 58 : Représentation des formes linéaires (espace euclidien)

### RECTO
**Théorème 58 : Théorème de représentation des formes linéaires (Riesz en dimension finie)**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (resp. hermitien) de dimension finie $n \ge 1$.

**Question :** Énoncer le théorème de représentation des formes linéaires continues sur $E$ par un produit scalaire. Préciser les hypothèses et la conclusion.

### VERSO
**Hypothèses**
*   $(E, \langle \cdot, \cdot \rangle)$ espace euclidien ($\mathbb{R}$-ev de dimension finie muni d'un produit scalaire) ou hermitien ($\mathbb{C}$-ev de dimension finie muni d'un produit hermitien)
*   $\varphi : E \to \mathbb{K}$ forme linéaire (resp. semi-linéaire dans le cas hermitien)

**Énoncé formel**
**Théorème :** Il existe un unique vecteur $a \in E$ tel que :
$$ \forall x \in E, \quad \varphi(x) = \langle x, a \rangle $$

**Démonstration**
*   **Existence :** Soit $B = (e_1, \dots, e_n)$ une base orthonormée de $E$. Pour tout $x = \sum x_i e_i$ :
    $$ \varphi(x) = \sum_{i=1}^n x_i \varphi(e_i) $$
    Posons $a = \sum_{i=1}^n \overline{\varphi(e_i)} e_i$ (dans le cas hermitien, $\varphi(e_i)$ dans le cas réel). Alors $\langle x, a \rangle = \sum x_i \overline{\langle e_i, a \rangle}$... [calcul direct montre $\varphi(x) = \langle x, a \rangle$].
*   **Unicité :** Si $\langle x, a \rangle = \langle x, a' \rangle$ pour tout $x$, alors $\langle x, a - a' \rangle = 0$ pour tout $x$, donc $a = a'$.

**Isomorphisme**
L'application $\Phi : E \to E^*, a \mapsto (x \mapsto \langle x, a \rangle)$ est un isomorphisme ($\mathbb{R}$-linéaire dans le cas réel, $\mathbb{R}$-linéaire ou anti-linéaire dans le cas hermitien).

### 
**Subtilités**
*   En dimension finie, toutes les formes linéaires sont automatiquement continues, donc la continuité n'est pas une hypothèse supplémentaire.
*   **Dans le cas hermitien :** $\varphi(x) = \langle x, a \rangle$ est $\mathbb{C}$-linéaire en $x$ (si le produit hermitien est linéaire à gauche) ou $\mathbb{C}$-antilinéaire selon la convention. Bien préciser la convention.
*   Le théorème de Riesz en dimension infinie (espaces de Hilbert) est beaucoup plus profond et nécessite la complétude.

**Pièges classiques**
*   En dimension infinie : le théorème de Riesz pour les espaces de Hilbert nécessite l'hypothèse que $\varphi$ est continue (i.e., bornée). En dimension finie, c'est automatique.
*   Confusion dans le cas hermitien : $\varphi(x) = \langle x, a \rangle$ ou $\langle a, x \rangle$ selon la convention du produit hermitien (linéaire à gauche ou à droite).

---

## FLASHCARD 165 — Proposition 48 : Gram-Schmidt

### RECTO
**Proposition 48 : Procédé d'orthonormalisation de Gram-Schmidt**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou hermitien) de dimension finie, et $(e_1, \dots, e_p)$ une famille libre de $E$.

**Question :** Énoncer le procédé de Gram-Schmidt. Donner les formules explicites et la propriété fondamentale.

### VERSO
**Énoncé**
Il existe une famille orthonormée $(f_1, \dots, f_p)$ telle que :
$$ \forall k \in \llbracket 1, p \rrbracket, \quad \text{Vect}(f_1, \dots, f_k) = \text{Vect}(e_1, \dots, e_k) $$

**Algorithme de Gram-Schmidt**
*   **Initialisation :** $u_1 = e_1$, $f_1 = \frac{u_1}{\|u_1\|}$.
*   **Récurrence :** Pour $k = 2, \dots, p$ :
    $$ u_k = e_k - \sum_{j=1}^{k-1} \langle e_k, f_j \rangle f_j $$
    $$ f_k = \frac{u_k}{\|u_k\|} $$
    (On soustrait la projection de $e_k$ sur $\text{Vect}(f_1, \dots, f_{k-1})$.)

**Justification que $u_k \neq 0$ :** Puisque $(e_1, \dots, e_k)$ est libre, $e_k \notin \text{Vect}(e_1, \dots, e_{k-1}) = \text{Vect}(f_1, \dots, f_{k-1})$, donc $u_k \neq 0$.

**Propriétés**
*   $(f_1, \dots, f_p)$ est orthonormée : $\langle f_i, f_j \rangle = \delta_{ij}$.
*   $\text{Vect}(f_1, \dots, f_k) = \text{Vect}(e_1, \dots, e_k)$ pour tout $k$.
*   La matrice de passage de $(e_i)$ à $(f_i)$ est triangulaire supérieure à diagonale strictement positive.

### 
**Subtilités**
*   Gram-Schmidt est constructif et donne une preuve de l'existence de bases orthonormées dans tout espace euclidien de dimension finie.
*   La matrice de passage triangulaire supérieure donne la décomposition QR : $A = QR$ où $Q$ est orthogonale et $R$ triangulaire supérieure.
*   Dans le cas hermitien, les formules sont identiques avec le produit hermitien.

**Pièges classiques**
*   Ne pas oublier de normaliser : $f_k = u_k / \|u_k\|$, ne pas arrêter à $u_k$.
*   Vérifier que $u_k \neq 0$ à chaque étape (condition de liberté).
*   L'ordre des vecteurs compte : deux ordres différents donnent des familles orthonormées différentes.

---

## FLASHCARD 166 — Proposition 49 : Projection orthogonale sur un sous-espace de dimension finie

### RECTO
**Proposition 49 : Projection orthogonale sur un sous-espace de dimension finie**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou hermitien) de dimension finie, $F$ un sous-espace vectoriel de $E$.

**Question :** Définir la projection orthogonale sur $F$. Donner la décomposition $E = F \oplus F^\perp$, la formule de la projection, et ses propriétés.

### VERSO
**Définition et décomposition**
**Théorème :** $E = F \oplus F^\perp$ où $F^\perp = \{x \in E \mid \forall y \in F, \langle x, y \rangle = 0\}$.

En particulier : $\dim F + \dim F^\perp = \dim E$, et $(F^\perp)^\perp = F$.

**Projection orthogonale**
La projection orthogonale sur $F$ est le projecteur $p_F : E \to E$ tel que :
*   $p_F(x) \in F$ pour tout $x$
*   $x - p_F(x) \in F^\perp$ pour tout $x$

**Formule explicite (via une base orthonormée de $F$)**
Si $(e_1, \dots, e_k)$ est une base orthonormée de $F$ :
$$ p_F(x) = \sum_{i=1}^k \langle x, e_i \rangle e_i $$

**Propriétés fondamentales**
*   $p_F$ est linéaire, $p_F^2 = p_F$ (projecteur), $p_F = p_F^*$ (autoadjoint).
*   $\text{Im}(p_F) = F$, $\ker(p_F) = F^\perp$.
*   $\|p_F(x)\| \le \|x\|$ pour tout $x$ (projecteur de norme $\le 1$).
*   **Meilleure approximation :** $p_F(x)$ est l'élément de $F$ le plus proche de $x$ :
    $$ \forall y \in F, \quad \|x - p_F(x)\| \le \|x - y\| $$

### 
**Subtilités**
*   La décomposition $E = F \oplus F^\perp$ est propre à la géométrie euclidienne : elle nécessite un produit scalaire (pas seulement une structure d'ev).
*   En dimension infinie (espaces de Hilbert) : la décomposition $H = F \oplus F^\perp$ reste vraie si $F$ est fermé, mais pas pour n'importe quel sous-espace (un sous-espace dense non fermé a $F^\perp = \{0\}$).
*   La propriété de meilleure approximation caractérise $p_F(x)$ sans utiliser de base.

**Pièges classiques**
*   La formule $\sum \langle x, e_i \rangle e_i$ n'est valable que si $(e_i)$ est orthonormée (pas juste orthogonale).
*   En dimension finie, $F^{\perp\perp} = F$ toujours. En dimension infinie, $F^{\perp\perp} = \bar{F}$.
*   Ne pas confondre "projecteur orthogonal" (autoadjoint) et "projecteur" (idempotent non nécessairement autoadjoint).

---

## FLASHCARD 167 — Proposition 50

### RECTO
**Proposition 50 : Propriétés du complément orthogonal**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $F, G$ des sous-espaces de $E$.

**Question :** Énoncer les propriétés fondamentales du complément orthogonal : $\dim F^\perp$, $(F^\perp)^\perp$, $(F+G)^\perp$, $(F \cap G)^\perp$.

### VERSO
**Propriétés**
1.  $\dim F^\perp = \dim E - \dim F$
2.  $(F^\perp)^\perp = F$
3.  $(F + G)^\perp = F^\perp \cap G^\perp$
4.  $(F \cap G)^\perp = F^\perp + G^\perp$
5.  $F \subset G \implies G^\perp \subset F^\perp$

**Démonstrations**
*   1 et 2 : Découlent de $E = F \oplus F^\perp$ et $\dim E = \dim F + \dim F^\perp$. Puis $(F^\perp)^\perp \supset F$ (par définition), et $\dim (F^\perp)^\perp = \dim E - \dim F^\perp = \dim F$, donc $(F^\perp)^\perp = F$.
*   3 : $x \in (F+G)^\perp \iff \langle x, y+z \rangle = 0 \ \forall y \in F, z \in G \iff x \in F^\perp \cap G^\perp$.
*   4 : $(F \cap G)^\perp = ((F^\perp)^\perp \cap (G^\perp)^\perp)^\perp$... Utiliser $F \cap G = (F^\perp + G^\perp)^\perp$ (déduit de 3 par orthogonalisation) et prendre le perp.

### 
**Subtilités**
*   En dimension finie, ces formules sont toutes exactes. En dimension infinie, (4) devient $(F \cap G)^\perp = \overline{F^\perp + G^\perp}$ (la somme n'est pas nécessairement fermée).
*   La propriété (2) $(F^\perp)^\perp = F$ est spécifique à la dimension finie (ou aux sous-espaces fermés en Hilbert).

**Pièges classiques**
*   En dimension infinie, $F^\perp + G^\perp$ peut ne pas être fermé, donc $(F \cap G)^\perp \neq F^\perp + G^\perp$ en général.
*   Vérifier (3) et (4) : les deux identités sont duales l'une de l'autre (De Morgan orthogonal).

---

## FLASHCARD 168 — Théorème 59 : Distance à un sous-espace

### RECTO
**Théorème 59 : Distance à un sous-espace et projection orthogonale**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $F$ un sous-espace de $E$, $x \in E$.

**Question :** Définir $d(x, F)$ et montrer que cette distance est atteinte en un unique point, donner ce point explicitement.

### VERSO
**Définition**
$$ d(x, F) = \inf_{y \in F} \|x - y\| $$

**Théorème**
La distance $d(x, F)$ est atteinte en un unique point : la projection orthogonale $p_F(x)$.

$$ d(x, F) = \|x - p_F(x)\| $$

et
$$ \forall y \in F, \quad y \neq p_F(x) \implies \|x - y\| > \|x - p_F(x)\| $$

**Démonstration**
Pour $y \in F$ quelconque :
$$ \|x - y\|^2 = \|(x - p_F(x)) + (p_F(x) - y)\|^2 = \|x - p_F(x)\|^2 + 2\langle x - p_F(x), p_F(x) - y \rangle + \|p_F(x) - y\|^2 $$
Or $x - p_F(x) \in F^\perp$ et $p_F(x) - y \in F$, donc $\langle x - p_F(x), p_F(x) - y \rangle = 0$.
Donc $\|x - y\|^2 = \|x - p_F(x)\|^2 + \|p_F(x) - y\|^2 \ge \|x - p_F(x)\|^2$, avec égalité ssi $y = p_F(x)$. $\square$

**Formule explicite**
Si $(e_1, \dots, e_k)$ est une base orthonormée de $F$ :
$$ d(x, F)^2 = \|x\|^2 - \sum_{i=1}^k |\langle x, e_i \rangle|^2 $$

### 
**Subtilités**
*   Le caractère euclidien (produit scalaire) est essentiel : dans un espace normé quelconque, la distance à un sous-espace peut ne pas être atteinte ou ne pas être unique.
*   La formule $d(x, F)^2 = \|x\|^2 - \|p_F(x)\|^2$ est la relation de Pythagore : $\|x\|^2 = \|p_F(x)\|^2 + \|x - p_F(x)\|^2$.

**Pièges classiques**
*   Oublier l'unicité : dans un espace euclidien, le point le plus proche est toujours unique (contrairement aux espaces normés généraux).
*   La distance est exprimée par $\|x - p_F(x)\|$, pas $\|p_F(x)\|$.

---

## FLASHCARD 169 — À connaître 51 : Caractérisations des projecteurs orthogonaux

### RECTO
**À connaître 51 : Caractérisations des projecteurs orthogonaux**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $p \in \mathcal{L}(E)$.

**Question :** Donner des conditions équivalentes pour que $p$ soit un projecteur orthogonal.

### VERSO
**Équivalences**
Les assertions suivantes sont équivalentes :

(i) $p$ est la projection orthogonale sur $F = \text{Im}(p)$ (i.e., $p = p_F$ pour un certain sous-espace $F$).

(ii) $p$ est un projecteur ($p^2 = p$) et autoadjoint ($p^* = p$, i.e., $\langle p(x), y \rangle = \langle x, p(y) \rangle$ pour tout $x, y$).

(iii) $p$ est un projecteur et $\ker(p) = \text{Im}(p)^\perp$.

(iv) $p$ est un projecteur et $\|p\| \le 1$ (norme opérateur).

(v) $p$ est un projecteur et $\|p(x)\| \le \|x\|$ pour tout $x \in E$.

**Matrice d'un projecteur orthogonal**
Dans une base orthonormée, la matrice de $p_F$ est symétrique ($\mathbb{R}$) ou hermitienne ($\mathbb{C}$), idempotente, et ses valeurs propres sont dans $\{0, 1\}$.

**Décomposition spectrale**
$p_F$ a pour valeurs propres $1$ (sur $F$) et $0$ (sur $F^\perp$), donc est diagonalisable avec spectre $\{0, 1\}$.

### 
**Subtilités**
*   L'autoadjonction ($p = p^*$) est la condition qui distingue un projecteur orthogonal d'un projecteur oblique.
*   Dans une base non orthonormée, la matrice d'un projecteur orthogonal n'est pas nécessairement symétrique.
*   En dimension infinie, les conditions (iv) et (v) ne suffisent plus sans hypothèse de fermeture sur $\text{Im}(p)$.

**Pièges classiques**
*   Un projecteur ($p^2 = p$) n'est pas nécessairement orthogonal : il faut en plus $p = p^*$ (ou une condition équivalente).
*   Confondre "projecteur de norme 1" et "projecteur orthogonal" : tout projecteur orthogonal non nul a norme opérateur égale à 1, mais la réciproque n'est pas évidente.

---

## FLASHCARD 170 — À connaître 52 : Inégalité d'Hadamard

### RECTO
**À connaître 52 : Inégalité d'Hadamard**

Soit $A \in M_n(\mathbb{R})$ (ou $M_n(\mathbb{C})$), de colonnes $C_1, \dots, C_n \in \mathbb{R}^n$ (ou $\mathbb{C}^n$).

**Question :** Énoncer l'inégalité d'Hadamard sur le déterminant. Donner les conditions d'égalité.

### VERSO
**Énoncé formel**
**Inégalité d'Hadamard :**
$$ |\det(A)| \le \prod_{j=1}^n \|C_j\| $$
où $\|C_j\| = \sqrt{\sum_{i=1}^n |a_{ij}|^2}$ est la norme euclidienne de la $j$-ième colonne.

**Condition d'égalité**
$|\det(A)| = \prod_{j=1}^n \|C_j\|$ si et seulement si les colonnes $C_1, \dots, C_n$ sont orthogonales deux à deux (ou si l'une d'elles est nulle, auquel cas les deux membres sont nuls).

**Démonstration (esquisse)**
Appliquer Gram-Schmidt aux colonnes de $A$ : $A = QR$ où $Q$ est orthogonale et $R$ triangulaire supérieure. Alors $|\det A| = |\det R| = \prod |R_{ii}|$.
Par Gram-Schmidt, $R_{ii} = \|C_i - \text{proj sur prec.}\| \le \|C_i\|$.
Donc $|\det A| \le \prod \|C_i\|$. L'égalité a lieu si et seulement si chaque $C_i$ est orthogonal aux $C_1, \dots, C_{i-1}$.

**Autre démonstration :** Utiliser l'inégalité de Cauchy-Schwarz dans le développement de $\det$ par multilinéarité.

**Interprétation géométrique**
$|\det(A)|$ est le volume du parallélépipède engendré par les colonnes. Il est majoré par le produit des normes (volume du parallélépipède rectangle).

### 
**Subtilités**
*   L'inégalité est valable pour les colonnes ou les lignes (par transposition et $|\det A| = |\det A^T|$).
*   La condition d'égalité correspond exactement au cas où la matrice $A$ est à colonnes orthogonales (matrice orthogonale à une normalisation près).

**Pièges classiques**
*   Ne pas oublier que $\|C_j\|$ est la norme euclidienne, pas la norme infinie ou d'autres normes.
*   L'inégalité donne une borne supérieure sur $|\det A|$ — utile pour les estimations.

---

## FLASHCARD 171 — À connaître 53

### RECTO
**À connaître 53 : Adjoint d'un endomorphisme**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou hermitien) de dimension finie, $f \in \mathcal{L}(E)$.

**Question :** Définir l'adjoint $f^*$ de $f$. Donner son existence, son unicité, sa matrice dans une base orthonormée, et ses propriétés algébriques.

### VERSO
**Définition et existence**
**Théorème :** Il existe un unique endomorphisme $f^* \in \mathcal{L}(E)$, appelé adjoint de $f$, tel que :
$$ \forall x, y \in E, \quad \langle f(x), y \rangle = \langle x, f^*(y) \rangle $$

**Existence :** Pour tout $y \in E$, l'application $x \mapsto \langle f(x), y \rangle$ est une forme linéaire sur $E$. Par le théorème de représentation de Riesz (dim. finie), il existe un unique $f^*(y)$ tel que $\langle f(x), y \rangle = \langle x, f^*(y) \rangle$.

**Matrice dans une base orthonormée**
Si $B$ est une base orthonormée de $E$ :
$$ \text{Mat}_B(f^*) = \overline{\text{Mat}_B(f)}^T = {}^t \bar{A} $$
(transposée conjuguée de la matrice de $f$). Dans le cas réel : $\text{Mat}(f^*) = {}^t A$.

**Propriétés algébriques**
*   **Involutivité :** $(f^*)^* = f$
*   **Linéarité :** $(\lambda f + \mu g)^* = \bar{\lambda} f^* + \bar{\mu} g^*$
*   **Composition :** $(f \circ g)^* = g^* \circ f^*$
*   **Déterminant :** $\det(f^*) = \overline{\det(f)}$
*   **Spectre :** $Sp(f^*) = \overline{Sp(f)}$

**Endomorphismes remarquables**
*   $f^* = f$ : Autoadjoint (symétrique si réel, hermitien si complexe)
*   $f^* = -f$ : Antisymétrique (antisymétrique/antihermitien)
*   $f^* \circ f = f \circ f^* = id$ : Orthogonal (isométrie si réel, unitaire si complexe)
*   $f^* \circ f = f \circ f^*$ : Normal

### 
**Subtilités**
*   La matrice de $f^*$ dans une base non orthonormée n'est pas simplement ${}^t A$ : il faut tenir compte de la matrice de Gram du produit scalaire.
*   Dans le cas hermitien : $(\lambda f)^* = \bar{\lambda} f^*$ (anti-linéarité en $\lambda$), pas $\lambda f^*$.
*   L'adjoint est défini par la structure euclidienne/hermitienne — sans produit scalaire, il n'y a pas d'adjoint canonique.

**Pièges classiques**
*   Dans une base non orthonormée : si $G$ est la matrice de Gram de $\langle \cdot, \cdot \rangle$, alors $\text{Mat}(f^*) = G^{-1} {}^t \bar{A} G$.
*   Confondre $f^*$ (adjoint) et $f^{-1}$ (inverse) : pour les isométries, $f^* = f^{-1}$, mais en général ce sont des objets distincts.
*   Ne pas oublier la conjugaison dans le cas hermitien.

---

## FLASHCARD 172 — À connaître 54 : Projection sur un convexe fermé

### RECTO
**À connaître 54 : Projection sur un convexe fermé (espace de Hilbert / espace euclidien)**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace de Hilbert réel (en particulier, un espace euclidien de dimension finie), $C \subset E$ un ensemble convexe fermé non vide.

**Question :** Énoncer le théorème d'existence et d'unicité de la projection sur $C$, et la caractérisation variationnelle.

### VERSO
**Théorème**
Soit $C$ un sous-ensemble convexe, fermé, non vide d'un espace de Hilbert réel $H$. Pour tout $x \in H$, il existe un unique $p_C(x) \in C$ tel que :
$$ \|x - p_C(x)\| = d(x, C) = \inf_{y \in C} \|x - y\| $$

**Caractérisation variationnelle**
$p = p_C(x)$ est l'unique élément de $C$ tel que :
$$ \forall y \in C, \quad \langle x - p, y - p \rangle \le 0 $$
(En dimension finie : le vecteur $x - p$ fait un angle obtus avec tout vecteur $y - p$ pour $y \in C$.)

**Cas particulier : $C = F$ sous-espace fermé**
Si $C = F$ est un sous-espace vectoriel fermé, la condition $\langle x - p_F(x), y \rangle \le 0$ pour tout $y \in F$ et $-y \in F$ donne $\langle x - p_F(x), y \rangle = 0$ pour tout $y \in F$, ce qui redonne la projection orthogonale.

**Application en dimension finie**
En dimension finie (espace euclidien), tout convexe fermé est automatiquement complet (fermé = compact si borné), et le théorème s'applique. L'unique point le plus proche de $x$ dans $C$ est $p_C(x)$.

### 
**Subtilités**
*   En dimension infinie, la complétude (Hilbert) est indispensable : dans un espace pré-hilbertien non complet, la projection peut ne pas exister.
*   La convexité est indispensable pour l'unicité : sans convexité, la distance peut être atteinte en plusieurs points.
*   La fermeture est indispensable pour l'existence : sans fermeture, la distance peut ne pas être atteinte.

**Pièges classiques**
*   Confondre "convexe fermé" (projection existe et est unique) et "sous-espace fermé" (projection orthogonale, cas linéaire).
*   La caractérisation $\langle x - p, y - p \rangle \le 0$ est une inégalité (pas une égalité) : c'est la différence fondamentale avec le cas linéaire.

---

## FLASHCARD 173 — À connaître 55 : Inégalité de Bessel, famille orthonormée totale

### RECTO
**À connaître 55 : Inégalité de Bessel et famille orthonormée totale**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien (ou de Hilbert), $(e_i)_{i \in I}$ une famille orthonormée (finie ou dénombrable) de $E$.

**Question :** Énoncer l'inégalité de Bessel. Définir une famille totale (base hilbertienne). Énoncer la relation de Parseval.

### VERSO
**Inégalité de Bessel**
Pour tout $x \in E$ et toute famille orthonormée $(e_1, \dots, e_n)$ :
$$ \sum_{i=1}^n |\langle x, e_i \rangle|^2 \le \|x\|^2 $$

**Démonstration :** $0 \le \|x - p_F(x)\|^2 = \|x\|^2 - \|p_F(x)\|^2 = \|x\|^2 - \sum |\langle x, e_i \rangle|^2$.

**Famille orthonormée totale (base hilbertienne)**
Une famille orthonormée $(e_i)$ est dite totale (ou base orthonormée) si :
$$ \forall x \in E, \quad x = \sum_i \langle x, e_i \rangle e_i $$
(en dimension finie, cela signifie que la famille est une base orthonormée de $E$).

**Relation de Parseval**
Si $(e_i)$ est une famille orthonormée totale :
$$ \forall x \in E, \quad \|x\|^2 = \sum_i |\langle x, e_i \rangle|^2 $$
C'est l'égalité dans l'inégalité de Bessel.

**Équivalences (totale $\iff$...)**
$(e_i)$ est totale
$\iff \forall x \in E, \|x\|^2 = \sum |\langle x, e_i \rangle|^2$
$\iff \forall x, \langle x, e_i \rangle = 0 \ \forall i \Rightarrow x = 0$
$\iff \text{Vect}(e_i)$ est dense dans $E$.

### 
**Subtilités**
*   En dimension finie, "famille orthonormée de cardinal $n = \dim E$" $\iff$ "totale" $\iff$ "base orthonormée".
*   En dimension infinie, une famille orthonormée peut être totale sans être une base au sens algébrique (combinaisons finies) : la convergence est au sens de la norme.
*   L'inégalité de Bessel est valable pour toute famille orthonormée, même non totale.

**Pièges classiques**
*   Oublier que Parseval est l'égalité de Bessel, valable uniquement pour les familles totales.
*   Confondre "base orthonormée" (totale) et "famille orthonormée" (Bessel mais pas nécessairement Parseval).

---

## FLASHCARD 174 — Proposition 51

### RECTO
**Proposition 51 : Matrice d'une isométrie dans une base orthonormée**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie $n$, $f \in \mathcal{L}(E)$, $B$ une base orthonormée de $E$, $A = \text{Mat}_B(f)$.

**Question :** Caractériser matriciellement les isométries (endomorphismes orthogonaux) et donner leurs propriétés fondamentales.

### VERSO
**Définition**
$f$ est une isométrie (endomorphisme orthogonal) si $\forall x \in E, \|f(x)\| = \|x\|$, ou de façon équivalente :
$$ \forall x, y \in E, \quad \langle f(x), f(y) \rangle = \langle x, y \rangle $$

**Caractérisation matricielle**
Dans une base orthonormée $B$ : $f$ est une isométrie $\iff A = \text{Mat}_B(f)$ est orthogonale, i.e., ${}^t A A = I_n$ (équivalent : $A {}^t A = I_n$, équivalent : $A^{-1} = {}^t A$).

On note $O_n(\mathbb{R}) = \{A \in M_n(\mathbb{R}) \mid {}^t A A = I_n\}$ le groupe orthogonal.

**Propriétés des matrices orthogonales**
*   $\det(A) = \pm 1$
*   Les colonnes de $A$ forment une base orthonormée de $\mathbb{R}^n$.
*   Les lignes de $A$ forment une base orthonormée de $\mathbb{R}^n$.
*   Les valeurs propres (réelles ou complexes) sont de module $1$.
*   $SO_n(\mathbb{R}) = \{A \in O_n \mid \det A = 1\}$ est le groupe spécial orthogonal (rotations).

### 
**Subtilités**
*   La caractérisation ${}^t A A = I_n$ dépend de la base choisie : elle est valable en base orthonormée uniquement.
*   Dans le cas hermitien : les isométries unitaires vérifient $A^* A = I_n$ ($A^* = {}^t \bar{A}$).
*   En dimension infinie : les isométries peuvent ne pas être surjectives (isométries partielles).

**Pièges classiques**
*   ${}^t A A = I_n \not\Rightarrow A {}^t A = I_n$ en général... si $A$ est carrée, les deux sont équivalents. Mais en dimension infinie ou pour des matrices rectangulaires, il faut préciser.
*   Vérifier que la base est orthonormée avant d'écrire ${}^t A A = I_n$.
*   Ne pas confondre $O_n$ (groupe orthogonal, $\det = \pm 1$) et $SO_n$ (rotations, $\det = 1$).

---

## FLASHCARD 175 — Lemme 8 : Lemme de stabilité

### RECTO
**Lemme 8 (Lemme de stabilité) : Stabilité du complément orthogonal par une isométrie**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien de dimension finie, $f \in \mathcal{L}(E)$ une isométrie, et $F$ un sous-espace de $E$ stable par $f$.

**Question :** Montrer que $F^\perp$ est aussi stable par $f$.

### VERSO
**Énoncé**
Si $f$ est une isométrie et $F$ est un sous-espace stable par $f$ (i.e., $f(F) \subset F$), alors $F^\perp$ est stable par $f$ (i.e., $f(F^\perp) \subset F^\perp$).

**Démonstration**
Soit $x \in F^\perp$ et $y \in F$. On veut montrer $\langle f(x), y \rangle = 0$.

Comme $f$ est une isométrie, $f$ est bijective. En particulier, $f(F) = F$ (car $f(F) \subset F$ et $f$ est injective, donc $\dim f(F) = \dim F$, et $f(F) \subset F$ implique $f(F) = F$).

Donc $y \in F$ implique $y = f(z)$ pour un certain $z \in F$.

$$ \langle f(x), y \rangle = \langle f(x), f(z) \rangle = \langle x, z \rangle = 0 $$

(car $f$ est une isométrie : $\langle f(x), f(z) \rangle = \langle x, z \rangle$, et $x \in F^\perp, z \in F$). $\square$

**Corollaire**
Si $f$ est une isométrie et $F$ est stable par $f$, alors l'endomorphisme induit $f|_F$ est une isométrie de $F$, et $f|_{F^\perp}$ est une isométrie de $F^\perp$.

### 
**Subtilités**
*   La bijectivité de $f$ (qui découle de l'isométrie en dimension finie) est essentielle pour avoir $f(F) = F$.
*   En dimension infinie, une isométrie peut être non surjective (décalage unilatéral), et le lemme peut tomber en défaut.
*   Ce lemme est la clé de la réduction des isométries (Prop. 52) : on peut orthogonaliser les sous-espaces stables.

**Pièges classiques**
*   Oublier que "$f(F) \subset F$ et $f$ injective" donne $f(F) = F$ (en dimension finie) — c'est nécessaire pour la démonstration.
*   Ne pas confondre "stable par $f$" ($f(F) \subset F$) et "stable par $f$ et $f^{-1}$" ($f(F) = F$) : en dimension finie, les deux sont équivalents pour $f$ inversible.

---

## FLASHCARD 176 — Proposition 52 : Réduction des isométries

### RECTO
**Proposition 52 : Réduction des isométries en dimension finie**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace euclidien réel de dimension finie $n$, $f \in \mathcal{L}(E)$ une isométrie.

**Question :** Énoncer le théorème de réduction des isométries : décomposition de $E$ en sous-espaces stables de dimension 1 ou 2, forme canonique de la matrice dans une base orthonormée adaptée.

### VERSO
**Théorème**
Toute isométrie $f$ de $E$ (réel, dimension finie) admet une base orthonormée dans laquelle sa matrice est bloc-diagonale de la forme :
$$ \begin{pmatrix} \pm 1 & & & & & \\ & \ddots & & & & \\ & & \pm 1 & & & \\ & & & R_{\theta_1} & & \\ & & & & \ddots & \\ & & & & & R_{\theta_k} \end{pmatrix} $$
où $R_\theta = \begin{pmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{pmatrix}$ est une matrice de rotation d'angle $\theta \in (0, \pi)$.

**Description des blocs**
*   **Blocs $1 \times 1$ :** $+1$ (vecteurs propres pour $\lambda = 1$) ou $-1$ (vecteurs propres pour $\lambda = -1$).
*   **Blocs $2 \times 2$ :** rotations d'angle $\theta \in (0, \pi)$ (correspondant aux valeurs propres complexes $e^{\pm i \theta}$).

**Conséquence**
*   $f$ est une rotation ($\det f = 1$) $\iff$ le nombre de blocs $(-1)$ est pair.
*   $f$ est un retournement ($\det f = -1$) $\iff$ le nombre de blocs $(-1)$ est impair.

**Idée de démonstration**
Par récurrence sur $n$ :
1.  Chercher un sous-espace stable de dimension 1 ou 2 en étudiant les valeurs propres réelles ou les valeurs propres complexes par paires.
2.  Utiliser le Lemme 8 : $F^\perp$ est aussi stable, puis appliquer l'hypothèse de récurrence à $f|_{F^\perp}$.

### 
**Subtilités**
*   Cette réduction est spécifique aux espaces réels : sur $\mathbb{C}$, les isométries unitaires sont diagonalisables (valeurs propres sur le cercle unité).
*   Les angles $\theta \in (0, \pi)$ (pas $\{0, \pi\}$ qui donnent des blocs $1 \times 1$).
*   La forme bloc-diagonale est obtenue dans une base orthonormée : dans une base quelconque, la matrice n'a pas cette forme simple.

**Pièges classiques**
*   Sur $\mathbb{R}$ : une isométrie peut ne pas avoir de valeurs propres réelles (rotation en dimension 2 d'angle $\neq 0, \pi$). Donc "trigonalisable sur $\mathbb{R}$" ne s'applique pas en général.
*   Ne pas oublier les blocs $(-1)$ : une réflexion en dimension impaire est une isométrie avec un bloc $(-1)$.
*   En dimension 2 : les isométries directes sont des rotations, les isométries indirectes sont des réflexions — à connaître parfaitement.

---

## FLASHCARD 177 — À connaître 56

### RECTO
**À connaître 56 : Endomorphismes normaux**

Soit $(E, \langle \cdot, \cdot \rangle)$ un espace hermitien de dimension finie, $f \in \mathcal{L}(E)$.

**Question :** Définir un endomorphisme normal. Énoncer le théorème spectral pour les endomorphismes normaux en dimension finie sur $\mathbb{C}$.

### VERSO
**Définition**
$f$ est normal si $f \circ f^* = f^* \circ f$.

**Exemples d'endomorphismes normaux**
*   $f^* = f$ (Hermitien) : Oui
*   $f^* = -f$ (Antihermitien) : Oui
*   $f^* f = f f^* = id$ (Unitaire) : Oui
*   $f$ quelconque : Pas nécessairement

**Théorème spectral (cas normal, $\mathbb{C}$)**
**Théorème :** $f$ est normal (sur un espace hermitien de dimension finie sur $\mathbb{C}$) si et seulement si $f$ est unitairement diagonalisable : il existe une base orthonormée de $E$ formée de vecteurs propres de $f$.

**Propriétés des endomorphismes normaux**
*   $\ker(f) = \ker(f^*)$
*   $\|f(x)\| = \|f^*(x)\|$ pour tout $x$
*   Les espaces propres de $f$ associés à des valeurs propres distinctes sont orthogonaux.
*   $f$ est normal $\iff m_f$ est scindé à racines simples sur $\mathbb{C}$ (dans ce cas diagonalisable).

### 
**Subtilités**
*   Le théorème spectral pour les endomorphismes normaux est le résultat de diagonalisabilité le plus général en dimension finie sur $\mathbb{C}$ : tout normal est unitairement diagonalisable.
*   La base de diagonalisation est orthonormée, ce qui est plus fort que simplement "diagonalisable".
*   Sur $\mathbb{R}$ : les endomorphismes normaux (symétriques) sont diagonalisables orthogonalement (Théorème 60 spectral réel).

**Pièges classiques**
*   Confondre "diagonalisable" et "unitairement diagonalisable" : la différence est que la base doit être orthonormée pour le second.
*   Un endomorphisme hermitien est normal, mais un endomorphisme normal n'est pas nécessairement hermitien.

---

## FLASHCARD 178 — Théorème 60 : Théorème Spectral (réel)

### RECTO
**Théorème 60 — Théorème Spectral (réel)**

Soit $E$ un espace euclidien (de dimension finie $n$), et soit $u \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème spectral pour les endomorphismes symétriques en dimension finie réelle, avec ses hypothèses exactes et sa conclusion complète.

### VERSO
**Hypothèses complètes**
*   $E$ est un espace euclidien : $\mathbb{R}$-espace vectoriel de dimension finie $n \ge 1$, muni d'un produit scalaire $\langle \cdot, \cdot \rangle$
*   $u \in \mathcal{L}(E)$ est un endomorphisme symétrique : $\forall x, y \in E, \langle u(x), y \rangle = \langle x, u(y) \rangle$

**Énoncé formel**
$$ u \text{ symétrique} \implies \exists B \text{ base orthonormée de } E \text{ formée de vecteurs propres de } u $$

Plus précisément :
$$ \exists \lambda_1, \dots, \lambda_n \in \mathbb{R}, \exists (e_1, \dots, e_n) \text{ BON de } E \text{ tels que } \forall i \in \llbracket 1, n \rrbracket, u(e_i) = \lambda_i e_i $$

Autrement dit, la matrice de $u$ dans $B = (e_1, \dots, e_n)$ est :
$$ \text{Mat}_B(u) = \text{diag}(\lambda_1, \dots, \lambda_n) \in M_n(\mathbb{R}) $$

**Traduction matricielle :** Toute matrice symétrique réelle $A \in S_n(\mathbb{R})$ est orthogonalement diagonalisable :
$$ \exists P \in O_n(\mathbb{R}), \exists D \in D_n(\mathbb{R}) \text{ telles que } A = P D P^{-1} = P D P^\top $$

**Propriétés spectrales garanties**
1.  Toutes les valeurs propres sont réelles : $Sp(u) \subset \mathbb{R}$
2.  Les sous-espaces propres sont deux à deux orthogonaux : $\lambda \neq \mu \implies E_\lambda(u) \perp E_\mu(u)$
3.  La somme des sous-espaces propres est directe et égale à $E$ : $E = \bigoplus_{\lambda \in Sp(u)} E_\lambda(u)$ (orthogonale)
4.  Le polynôme caractéristique est scindé à racines réelles sur $\mathbb{R}$

**Démonstration (Esquisse — 4 idées clés)**
1.  **Réalité des valeurs propres :** Si $\chi_u$ admet une racine complexe $\lambda = a+ib$, on travaille dans $\mathbb{C}^n$ par complexification et on montre via $\langle u(x), x \rangle = \langle x, u(x) \rangle$ que $\lambda \in \mathbb{R}$ (le produit scalaire hermitien révèle $b=0$).
2.  **Scindage du polynôme caractéristique :** Par récurrence sur $n$. Existence d'une valeur propre réelle (via le théorème de d'Alembert-Gauss appliqué à $\chi_u \in \mathbb{R}[X]$ et réalité des racines complexes par conjugaison + symétrie).
3.  **Stabilité de l'orthogonal :** Si $F$ est stable par $u$ (symétrique), alors $F^\perp$ est aussi stable par $u$.
4.  **Récurrence :** On prend $e_1$ vecteur propre unitaire, $F = \text{Vect}(e_1)^\perp$ est stable par $u$, et on applique l'hypothèse de récurrence à $u|_{F^\perp}$ qui est encore symétrique.

### 
**Subtilités**
*   **Dimension finie absolument nécessaire :** En dimension infinie (espace de Hilbert), un opérateur symétrique borné n'est pas nécessairement diagonalisable au sens classique — on dispose d'un théorème spectral mais avec une mesure spectrale, hors programme MP.
*   **$\mathbb{R}$ vs $\mathbb{C}$ :** Sur $\mathbb{C}$, le théorème analogue concerne les endomorphismes hermitiens ($u^* = u$) et les matrices hermitiennes $A^* = A$. Les matrices normales ($AA^* = A^*A$) sont unitairement diagonalisables sur $\mathbb{C}$ — mais ce résultat est hors programme MP strict.
*   **Orthogonal $\neq$ diagonalisable :** Une matrice orthogonale $P \in O_n(\mathbb{R})$ n'est pas nécessairement diagonalisable sur $\mathbb{R}$ (ex : rotation de $\pi/2$ en dim 2). Le théorème spectral ne s'applique pas aux matrices orthogonales en général.
*   **Les $\lambda_i$ ne sont pas nécessairement distincts :** Si $\lambda$ est valeur propre de multiplicité $k$, alors $\dim E_\lambda = k$ (le théorème garantit que la multiplicité géométrique = multiplicité algébrique pour les symétriques).
*   **La décomposition est orthogonale :** $E = E_{\lambda_1} \oplus^\perp \dots \oplus^\perp E_{\lambda_r}$.

**Extensions**
*   **Formes bilinéaires symétriques :** Le théorème spectral implique que toute forme quadratique sur un espace euclidien peut être diagonalisée dans une BON — lien direct avec la réduction des formes quadratiques.
*   **Endomorphismes symétriques positifs :** $u$ symétrique et $\forall x, \langle u(x), x \rangle \ge 0 \iff$ toutes les valeurs propres sont $\ge 0$ (voir Proposition 53).
*   **Décomposition spectrale (projecteurs) :** $u = \sum_{\lambda \in Sp(u)} \lambda \cdot p_\lambda$ où $p_\lambda$ est le projecteur orthogonal sur $E_\lambda(u)$.
*   **Fonctions de matrices :** Grâce au théorème spectral, on peut définir $f(u)$ pour toute fonction $f : Sp(u) \to \mathbb{R}$ par $f(u) = \sum \lambda f(\lambda) p_\lambda$, en particulier $\sqrt{u}$ pour $u$ symétrique positif.

**Pièges classiques**
*   **Confusion symétrique/orthogonal :** Appliquer le th. spectral à une matrice orthogonale. Seules les matrices symétriques $A^\top = A$ sont orthogonalement diagonalisables.
*   **Oublier l'orthogonalité de $P$ :** Écrire $A = PDP^{-1}$ sans préciser $P \in O_n(\mathbb{R})$. Il faut $P^\top P = I_n$, ce qui est la force du théorème.
*   **Multiplicité :** Croire que les valeurs propres sont toujours simples. Elles peuvent être multiples, mais $\dim E_\lambda =$ multiplicité algébrique.
*   **Corps de base :** Oublier que le théorème est faux pour $S_n(\mathbb{Q})$ ou en dimension infinie. Le théorème requiert $\mathbb{R}$ et dimension finie.
*   **Réciproque :** Croire que orthogonalement diagonalisable $\implies$ symétrique. C'est vrai ! La réciproque est vraie : $A = P D P^\top \implies A^\top = A$.

---

## FLASHCARD 179 — À connaître 57 : Endomorphismes symétriques — Caractérisation via la base

### RECTO
**À connaître 57 — Caractérisation matricielle des endomorphismes symétriques**

Soit $E$ un espace euclidien de dimension $n$, $B$ une base orthonormée de $E$, et $u \in \mathcal{L}(E)$.

**Question :** Quelle est la caractérisation matricielle de la symétrie de $u$ dans une BON ? Et comment varie la matrice si on change de BON ?

### VERSO
**Hypothèses complètes**
*   $E$ euclidien de dimension finie $n$
*   $B = (e_1, \dots, e_n)$ base orthonormée de $E$
*   $u \in \mathcal{L}(E)$, $A = \text{Mat}_B(u)$

**Énoncé formel**
$$ u \text{ symétrique} \iff A^\top = A \iff A \in S_n(\mathbb{R}) $$

**Attention :** Cette équivalence est valable uniquement si $B$ est orthonormée. Dans une base quelconque $C$, la matrice de $u$ n'est pas nécessairement symétrique même si $u$ l'est.

**Changement de BON :** Si $B'$ est une autre BON et $P$ la matrice de passage ($P \in O_n(\mathbb{R})$), alors :
$$ \text{Mat}_{B'}(u) = P^\top A P $$
qui est encore symétrique ($P^\top A P \in S_n(\mathbb{R})$).

**Démonstration (Esquisse)**
$\langle u(e_i), e_j \rangle = A_{ji}$ et $\langle e_i, u(e_j) \rangle = A_{ij}$. Donc $u$ symétrique $\iff A_{ij} = A_{ji} \ \forall i, j \iff A^\top = A$.

### 
**Subtilités**
*   **Dépendance à la base :** Dans une base non orthonormée $C$, $u$ symétrique $\iff \text{Mat}_C(u)$ est symétrique par rapport à la matrice de Gram $G = (\langle e_i, e_j \rangle)$, i.e. $G A = A^\top G$. Hors programme MP mais utile pour comprendre.
*   $S_n(\mathbb{R})$ est un sous-espace vectoriel de $M_n(\mathbb{R})$ de dimension $\frac{n(n+1)}{2}$.

**Pièges classiques**
*   Écrire $u$ symétrique $\iff$ sa matrice dans une base quelconque est symétrique : FAUX. Il faut une BON.
*   Confondre matrice symétrique et endomorphisme symétrique sans préciser la base.

---

## FLASHCARD 180 — À connaître 58 : Valeurs propres d'un symétrique — Extrema du quotient de Rayleigh

### RECTO
**À connaître 58 — Quotient de Rayleigh et valeurs propres extrémales**

Soit $E$ un espace euclidien de dimension $n$, $u \in \mathcal{L}(E)$ symétrique, de valeurs propres $\lambda_1 \le \lambda_2 \le \dots \le \lambda_n$ (comptées avec multiplicité).

**Question :** Exprimer $\lambda_1$ et $\lambda_n$ comme extrema du quotient de Rayleigh, et donner les caractérisations variationnelles associées.

### VERSO
**Hypothèses complètes**
*   $E$ euclidien de dimension $n \ge 1$
*   $u \in \mathcal{L}(E)$ symétrique
*   $\lambda_1 \le \dots \le \lambda_n$ valeurs propres réelles de $u$ (le théorème spectral garantit leur existence)
*   **Quotient de Rayleigh :** $R(x) = \frac{\langle u(x), x \rangle}{\langle x, x \rangle}$ pour $x \neq 0$

**Énoncé formel**
$$ \lambda_1 = \min_{x \neq 0} \frac{\langle u(x), x \rangle}{\|x\|^2} = \min_{\|x\|=1} \langle u(x), x \rangle $$

$$ \lambda_n = \max_{x \neq 0} \frac{\langle u(x), x \rangle}{\|x\|^2} = \max_{\|x\|=1} \langle u(x), x \rangle $$

Et plus généralement :
$$ \forall x \in E, \quad \lambda_1 \|x\|^2 \le \langle u(x), x \rangle \le \lambda_n \|x\|^2 $$

Les extrema sont atteints en les vecteurs propres associés à $\lambda_1$ et $\lambda_n$ respectivement.

**Démonstration (Esquisse)**
Dans la BON propre $(e_1, \dots, e_n)$, si $x = \sum \alpha_i e_i$ avec $\|x\|^2 = \sum \alpha_i^2 = 1$ :
$\langle u(x), x \rangle = \sum \lambda_i \alpha_i^2 \ge \lambda_1 \sum \alpha_i^2 = \lambda_1$.
Égalité si et seulement si $x \in E_{\lambda_1}(u)$.

### 
**Subtilités**
*   Le min est atteint (compacité de la sphère unité en dimension finie, $x \mapsto \langle u(x), x \rangle$ continue).
*   **Caractérisation sans calcul matriciel :** Les valeurs propres extrémales caractérisent la "taille" de l'endomorphisme dans un sens précis.
*   **Lien avec les normes :** $\|u\|_{op} = \max(|\lambda_1|, |\lambda_n|)$ pour $u$ symétrique (la norme d'opérateur est le rayon spectral).

**Extensions**
*   Le principe du minimax de Courant-Fischer (À connaître 59) généralise cette idée à toutes les valeurs propres intermédiaires $\lambda_k$.

**Pièges classiques**
*   Oublier que les extrema sont bien atteints (compacité de la sphère en dim finie).
*   Appliquer la formule sans vérifier que $u$ est symétrique.
*   Confondre $\|u\|_{op}$ avec $\lambda_n$ : si $\lambda_1 < 0$, alors $\|u\|_{op} = |\lambda_1|$ peut être plus grand que $\lambda_n$.

---

## FLASHCARD 181 — À connaître 59 : Principe du Minimax de Courant-Fischer

### RECTO
**À connaître 59 — Principe du Minimax de Courant-Fischer**

Soit $E$ un espace euclidien de dimension $n$, $u \in \mathcal{L}(E)$ symétrique, $\lambda_1 \le \dots \le \lambda_n$ ses valeurs propres.

**Question :** Énoncer le principe du minimax de Courant-Fischer donnant une caractérisation variationnelle de chaque valeur propre $\lambda_k$.

### VERSO
**Hypothèses complètes**
*   $E$ euclidien de dimension $n \ge 1$
*   $u \in \mathcal{L}(E)$ symétrique
*   $\lambda_1 \le \lambda_2 \le \dots \le \lambda_n \in \mathbb{R}$ valeurs propres (avec multiplicité)
*   $G_k(E)$ désigne l'ensemble des sous-espaces vectoriels de $E$ de dimension $k$

**Énoncé formel**
$$ \forall k \in \llbracket 1, n \rrbracket : \lambda_k = \min_{\substack{F \subset E \\ \dim F = k}} \max_{\substack{x \in F \\ x \neq 0}} \frac{\langle u(x), x \rangle}{\|x\|^2} $$

**Formulation équivalente (maximin) :**

$$ \lambda_k = \max_{\substack{F \subset E \\ \dim F = n-k+1}} \min_{\substack{x \in F \\ x \neq 0}} \frac{\langle u(x), x \rangle}{\|x\|^2} $$

**Cas particuliers :** $k=1$ donne $\lambda_1 = \min \frac{\langle u(x), x \rangle}{\|x\|^2}$, $k=n$ donne $\lambda_n = \max \frac{\langle u(x), x \rangle}{\|x\|^2}$.

**Démonstration (Esquisse)**
Dans la BON propre $(e_1, \dots, e_n)$ : pour $F = \text{Vect}(e_1, \dots, e_k)$, le max sur $F$ vaut $\lambda_k$. On montre ensuite que pour tout sous-espace $G$ de dimension $k$, $G \cap \text{Vect}(e_k, \dots, e_n) \neq \{0\}$ (par comptage de dimension : $k + (n-k+1) = n+1 > n$), ce qui fournit un vecteur sur lequel le quotient de Rayleigh est $\ge \lambda_k$.

### 
**Subtilités**
*   **Application directe :** Permet de comparer les valeurs propres de $u$ et $v$ (deux symétriques) si $u \le v$ au sens des formes quadratiques ($\langle u(x), x \rangle \le \langle v(x), x \rangle \ \forall x$) : alors $\lambda_k(u) \le \lambda_k(v)$.
*   **Monotonie par restriction :** Si $F$ est un sous-espace stable par $u$, les valeurs propres de $u|_F$ s'intercalent entre celles de $u$ (théorème d'entrelacement).

**Pièges classiques**
*   Confondre le min et le max dans la formule (mémoriser : on minimise sur les sous-espaces de dim $k$ le max du quotient de Rayleigh).
*   Croire que le théorème est au programme MP : il est au programme MP* — à maîtriser pour l'oral mais à utiliser avec précaution.

---

## FLASHCARD 182 — Proposition 53 : Endomorphismes symétriques positifs et définis positifs

### RECTO
**Proposition 53 — Endomorphismes symétriques positifs et définis positifs**

Soit $E$ un espace euclidien de dimension finie $n$, et $u \in \mathcal{L}(E)$ un endomorphisme symétrique.

**Question :** Donner les caractérisations équivalentes de "$u$ est symétrique positif" et "$u$ est symétrique défini positif", en termes de valeurs propres, de forme quadratique, et de décomposition.

### VERSO
**Définitions**
*   $u$ est **symétrique positif** (noté $u \succeq 0$) si : $u$ est symétrique et $\forall x \in E, \langle u(x), x \rangle \ge 0$.
*   $u$ est **symétrique défini positif** (noté $u \succ 0$) si : $u$ est symétrique et $\forall x \in E \setminus \{0\}, \langle u(x), x \rangle > 0$.

**Caractérisations équivalentes**
$u$ symétrique positif $\iff$ :
(a) $\forall x \in E, \langle u(x), x \rangle \ge 0$
$\iff$ (b) $Sp(u) \subset [0, +\infty[$
$\iff$ (c) $\exists v \in \mathcal{L}(E)$ symétrique, $u = v^2$

$u$ symétrique défini positif $\iff$ :
(a') $\forall x \neq 0, \langle u(x), x \rangle > 0$
$\iff$ (b') $Sp(u) \subset ]0, +\infty[$
$\iff$ (c') $u$ inversible et positif

**Traduction matricielle**
$A \in S_n(\mathbb{R})$ est définie positive $\iff$ toutes ses valeurs propres sont $>0$ $\iff$ tous ses mineurs principaux sont $>0$ (critère de Sylvester, hors programme MP mais utile).

**Ordre sur les symétriques**
On définit $u \preceq v \iff v - u \succeq 0$. C'est un ordre partiel sur les endomorphismes symétriques.

**Démonstration (Esquisse)**
Par le théorème spectral : dans la BON propre, $\langle u(x), x \rangle = \sum \lambda_i \alpha_i^2$. Ceci est $\ge 0$ pour tout $x \iff$ tous les $\lambda_i \ge 0$.
Pour (c) : si tous $\lambda_i \ge 0$, poser $v = \sum \sqrt{\lambda_i} p_i$ (racine carrée de $u$).

### 
**Subtilités**
*   $u \succeq 0$ n'implique pas $u$ inversible : Si $0 \in Sp(u)$, $u$ est positif mais non défini positif. Exemple : le projecteur orthogonal (valeurs propres 0 et 1).
*   **Produit scalaire induit :** Si $u \succ 0$, alors $(x, y) \mapsto \langle u(x), y \rangle$ est un nouveau produit scalaire sur $E$.
*   **Somme de symétriques positifs :** $u \succeq 0$ et $v \succeq 0 \implies u+v \succeq 0$. Si de plus $u \succ 0$, alors $u+v \succ 0$.
*   **Composition :** $u \succeq 0$ et $v \succeq 0$ n'implique pas $uv \succeq 0$ (sauf si $uv=vu$).

**Extensions**
*   **Racine carrée :** Si $u \succeq 0$, il existe un unique $v \succeq 0$ tel que $v^2 = u$ (voir À connaître 61). C'est la racine carrée de $u$, notée $\sqrt{u}$ ou $u^{1/2}$.
*   **Décomposition polaire (À connaître 62) :** tout endomorphisme $f$ s'écrit $f = s \circ r$ avec $r$ isométrie et $s$ symétrique positif.

**Pièges classiques**
*   Croire qu'une matrice à coefficients positifs est définie positive : FAUX.
*   Confondre $\langle u(x), x \rangle \ge 0$ et $u^2 \succeq 0$ : tout carré $u^2$ d'un symétrique est toujours $\succeq 0$ (valeurs propres $\lambda_i^2 \ge 0$).
*   Oublier que la caractérisation (b) requiert que $u$ soit symétrique d'abord (les valeurs propres d'un endomorphisme non symétrique peuvent ne pas être réelles).

---

## FLASHCARD 183 — À connaître 60 : Matrice de Gram

### RECTO
**À connaître 60 — Matrice de Gram**

Soit $E$ un espace euclidien et $(x_1, \dots, x_p) \in E^p$ une famille de $p$ vecteurs.

**Question :** Définir la matrice de Gram, exprimer son lien avec la liberté de la famille, et donner sa relation avec le déterminant (volume).

### VERSO
**Définition**
La matrice de Gram de la famille $(x_1, \dots, x_p)$ est :
$$ G = G(x_1, \dots, x_p) = (\langle x_i, x_j \rangle)_{1 \le i, j \le p} \in M_p(\mathbb{R}) $$

**Propriétés fondamentales**
1.  **Symétrie et positivité :**
    $G \in S_p(\mathbb{R})$ et $G \succeq 0$ (i.e. $G$ est symétrique positive).
    Preuve : $\forall \alpha \in \mathbb{R}^p, \alpha^\top G \alpha = \langle \sum_i \alpha_i x_i, \sum_j \alpha_j x_j \rangle = \|\sum_i \alpha_i x_i\|^2 \ge 0$.

2.  **Caractérisation de la liberté :**
    *   $\det G(x_1, \dots, x_p) > 0 \iff (x_1, \dots, x_p)$ est libre
    *   $\det G(x_1, \dots, x_p) = 0 \iff (x_1, \dots, x_p)$ est liée

3.  **Interprétation géométrique :** Si $p=n=\dim E$ et $A = \text{Mat}_B(x_1, \dots, x_n)$ dans une BON $B$ :
    $$ \det G = (\det A)^2 $$
    Et $\sqrt{\det G}$ est le volume du parallélépipède engendré par $(x_1, \dots, x_p)$.

**Formule explicite en dimension 2**
$G(x, y) = \begin{pmatrix} \|x\|^2 & \langle x, y \rangle \\ \langle x, y \rangle & \|y\|^2 \end{pmatrix}, \quad \det G = \|x\|^2 \|y\|^2 - \langle x, y \rangle^2$.
C'est exactement l'inégalité de Cauchy-Schwarz : $\det G \ge 0$ avec égalité ssi $(x, y)$ liée.

### 
**Subtilités**
*   $G \succ 0 \iff$ famille libre : La matrice de Gram est définie positive si et seulement si la famille est libre.
*   **Lien avec le produit scalaire :** Si $(e_1, \dots, e_n)$ est une base (non nécessairement orthonormée), la matrice de Gram est exactement la matrice du produit scalaire dans cette base.
*   Dans une BON : $G(e_1, \dots, e_n) = I_n$ (matrice identité).

**Extensions**
*   **Rang de $G$ :** $\text{rang}(G) = \text{rang}(x_1, \dots, x_p)$ (le rang de la famille). En particulier, $G$ est inversible $\iff$ famille libre.
*   **Formule de la distance :** $d(x, \text{Vect}(x_1, \dots, x_p))^2 = \frac{\det G(x_1, \dots, x_p, x)}{\det G(x_1, \dots, x_p)}$ (formule de la distance via Gram, utile pour les calculs de distance à un sous-espace).

**Pièges classiques**
*   Confondre $G \succeq 0$ (toujours vrai) et $G \succ 0$ (uniquement si famille libre).
*   Oublier que $\det G = (\det A)^2$ nécessite une BON pour écrire les colonnes.

---

## FLASHCARD 184 — À connaître 61 : Racine carrée d'un endomorphisme symétrique positif

### RECTO
**À connaître 61 — Racine carrée d'un endomorphisme symétrique positif**

Soit $E$ un espace euclidien de dimension finie $n$, et $u \in \mathcal{L}(E)$ un endomorphisme symétrique positif ($u \succeq 0$).

**Question :** Énoncer l'existence et l'unicité de la racine carrée de $u$, et préciser ses propriétés.

### VERSO
**Énoncé formel**
$$ \exists ! v \in \mathcal{L}(E) \text{ tel que } \begin{cases} v \text{ est symétrique positif} \\ v^2 = u \end{cases} $$

Cet unique $v$ est appelé la racine carrée de $u$ et noté $\sqrt{u}$ ou $u^{1/2}$.

**Construction explicite**
Par le théorème spectral : $u = \sum_{i=1}^n \lambda_i \langle \cdot, e_i \rangle e_i$ dans une BON propre $(e_1, \dots, e_n)$ avec $\lambda_i \ge 0$. On pose :
$$ \sqrt{u} = \sum_{i=1}^n \sqrt{\lambda_i} \langle \cdot, e_i \rangle e_i $$
c'est-à-dire $\sqrt{u}$ a les mêmes vecteurs propres que $u$, avec valeurs propres $\sqrt{\lambda_i} \ge 0$.

**Propriétés**
*   $\sqrt{u}$ est symétrique positive : $Sp(\sqrt{u}) = \{\sqrt{\lambda} : \lambda \in Sp(u)\} \subset [0, +\infty[$
*   $(\sqrt{u})^2 = u$
*   $\sqrt{u}$ commute avec tout endomorphisme qui commute avec $u$
*   $u \succ 0 \implies \sqrt{u} \succ 0$ et $\sqrt{u}$ est inversible
*   $\|\sqrt{u}\|_{op} = \sqrt{\|u\|_{op}}$

### 
**Subtilités**
*   **Unicité dans la classe "symétrique positif" :** Sans la contrainte de positivité, il peut exister plusieurs $v$ tels que $v^2 = u$ (par exemple $-\sqrt{u}$ vérifie aussi $(-\sqrt{u})^2 = u$ mais n'est pas positif si $u \neq 0$).
*   La racine carrée ne commute pas forcément avec les autres endomorphismes, sauf si ceux-ci commutent avec $u$.
*   $\sqrt{u \circ v} \neq \sqrt{u} \circ \sqrt{v}$ en général (si $u$ et $v$ ne commutent pas).

**Extensions**
*   **Puissances fractionnaires :** De même, on peut définir $u^\alpha$ pour tout $\alpha > 0$ par $u^\alpha = \sum \lambda_i^\alpha \langle \cdot, e_i \rangle e_i$.
*   **Application à la décomposition polaire (À connaître 62) :** pour tout $f \in \mathcal{L}(E)$, $f^* \circ f \succeq 0$ et on pose $s = \sqrt{f^* \circ f}$.

**Pièges classiques**
*   Croire que $\sqrt{u \circ v} = \sqrt{u} \circ \sqrt{v}$ : FAUX en général.
*   Oublier la condition $u \succeq 0$ pour l'existence (si $u$ a une valeur propre négative, $\sqrt{u}$ n'existe pas dans $\mathcal{L}(E)$ réel).

---

## FLASHCARD 185 — À connaître 62 : Décomposition polaire

### RECTO
**À connaître 62 — Décomposition polaire**

Soit $E$ un espace euclidien de dimension finie $n$, et $f \in \mathcal{L}(E)$.

**Question :** Énoncer le théorème de décomposition polaire de $f$, préciser l'unicité, et donner l'analogue matriciel.

### VERSO
**Hypothèses**
*   $E$ euclidien de dimension finie $n$
*   $f \in \mathcal{L}(E)$ quelconque (pas nécessairement inversible)

**Énoncé formel**
$$ \exists s \in \mathcal{L}(E) \text{ symétrique positive}, \exists r \in O(E) \text{ isométrie, tels que } f = s \circ r $$

**Unicité si $f$ est inversible :**
$f$ inversible $\implies \exists ! (s, r)$ avec $s \succ 0$ et $r \in O(E)$ tels que $f = s \circ r$

Construction : $s = \sqrt{f \circ f^*}$ (racine carrée de $f \circ f^* \succeq 0$), puis $r = s^{-1} \circ f$ (si $f$ inversible).

**Décomposition droite :** De même, $\exists r' \in O(E), \exists s' \succeq 0$ symétriques tels que $f = r' \circ s'$ (avec $s' = \sqrt{f^* \circ f}$).

**Traduction matricielle**
Toute matrice $A \in M_n(\mathbb{R})$ s'écrit :
$$ A = S \cdot R \quad \text{avec } S \in S_n^+(\mathbb{R}), R \in O_n(\mathbb{R}) $$
Si $A$ est inversible : décomposition unique avec $S \in S_n^{++}(\mathbb{R})$.

### 
**Subtilités**
*   **Analogie avec $\mathbb{C}$ :** En dimension 1, tout $z \in \mathbb{C}^*$ s'écrit $z = |z| \cdot e^{i\theta}$ (module $\times$ argument). La décomposition polaire en est la généralisation matricielle : $f = \underbrace{s}_{\text{"module"}} \circ \underbrace{r}_{\text{"rotation"}}$.
*   **$f$ non inversible :** La décomposition existe mais $s$ est seulement positive (pas définie positive) et $r$ n'est pas unique.
*   La décomposition gauche et droite donnent des $r$ différents en général ($r \neq r'$), mais $s$ et $s'$ ont les mêmes valeurs propres (valeurs singulières de $f$).

**Extensions**
*   **Valeurs singulières :** $Sp(s) = Sp(s') = \{\sigma_1 \ge \dots \ge \sigma_n \ge 0\}$ sont les valeurs singulières de $f$. Elles caractérisent $f$ à isométrie près.
*   **SVD (Singular Value Decomposition) :** $\exists$ BON $(e_1, \dots, e_n)$ et $(f_1, \dots, f_n)$ et $\sigma_1 \ge \dots \ge \sigma_n \ge 0$ tels que $f(e_i) = \sigma_i f_i$. Hors programme MP mais fondamental en pratique.

**Pièges classiques**
*   Confondre $s = \sqrt{f \circ f^*}$ et $s' = \sqrt{f^* \circ f}$ : ce sont deux symétriques positives différentes (isospectres mais de vecteurs propres différents).
*   Croire que la décomposition polaire implique $f$ normale ($f \circ f^* = f^* \circ f$) : non, la décomposition existe pour tout $f$.

---

## FLASHCARD 186 — À connaître 63 : Endomorphismes normaux (complément)

### RECTO
**À connaître 63 — Endomorphismes normaux en dimension finie réelle**

Soit $E$ un espace euclidien de dimension $n$, et $u \in \mathcal{L}(E)$.

**Question :** Définir un endomorphisme normal, donner des exemples importants, et énoncer la propriété de réduction des endomorphismes normaux sur $\mathbb{R}$.

### VERSO
**Définition**
$u$ est normal si $u$ commute avec son adjoint :
$$ u \circ u^* = u^* \circ u $$
où $u^*$ est l'adjoint de $u$ défini par $\forall x, y \in E : \langle u(x), y \rangle = \langle x, u^*(y) \rangle$.

**Exemples fondamentaux**
*   **Symétrique :** $u^* = u$ (Oui, $u \circ u = u \circ u$)
*   **Antisymétrique :** $u^* = -u$ (Oui, $(-u) \circ u = u \circ (-u)$)
*   **Isométrie :** $u^* = u^{-1}$ (Oui, $u^{-1} u = u u^{-1} = id$)
*   **Projecteur orthogonal :** $u^* = u, u^2 = u$ (Oui)

**Propriété de réduction (sur $\mathbb{R}$)**
Sur $\mathbb{R}$, $u$ normal ne se diagonalise pas forcément dans une BON (contrairement à $\mathbb{C}$). Mais :
$$ u \text{ normal} \implies E = \bigoplus_k F_k \quad (\text{somme orthogonale}) $$
où chaque $F_k$ est de dimension 1 (si $\lambda_k \in \mathbb{R}$) ou de dimension 2 (si $\lambda_k, \bar{\lambda}_k \in \mathbb{C} \setminus \mathbb{R}$), et $u|_{F_k}$ est une homothétie ou une similitude directe (rotation-homothétie).

**Traduction matricielle :** $u$ normal $\iff \exists P \in O_n(\mathbb{R})$ telle que $P^\top A P$ est bloc-diagonale avec blocs de taille 1 (réels) ou 2 (complexes conjugués).

### 
**Subtilités**
*   **Sur $\mathbb{C}$ :** Tout endomorphisme normal d'un espace hermitien est unitairement diagonalisable — c'est le théorème spectral complexe. Sur $\mathbb{R}$, on doit se contenter de blocs $1 \times 1$ et $2 \times 2$.
*   **Isométries :** Le résultat de la Proposition 52 (réduction des isométries) est un cas particulier de la réduction des normaux : les blocs de taille 2 correspondent à des rotations.
*   La normalité se teste via : $\|u(x)\| = \|u^*(x)\| \ \forall x$ (car $\langle u^*u(x), x \rangle = \langle uu^*(x), x \rangle$).

**Pièges classiques**
*   Croire que normal $\implies$ symétrique : FAUX (les isométries sont normales mais non symétriques en général).
*   Sur $\mathbb{R}$, croire qu'un endomorphisme normal est toujours orthogonalement diagonalisable : FAUX (une rotation d'angle $\neq 0, \pi$ en $\mathbb{R}^2$ est normale mais n'a pas de valeur propre réelle).

---

# CHAPITRE 12 — Probabilités

## FLASHCARD 187 — Proposition 54 : Continuité croissante et décroissante d'une probabilité

### RECTO
**Proposition 54 — Continuité croissante et décroissante d'une mesure de probabilité**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé.

**Question :** Énoncer les propriétés de continuité croissante et décroissante de $P$, avec les hypothèses exactes sur les suites d'événements.

### VERSO
**Hypothèses complètes**
*   $(\Omega, \mathcal{A}, P)$ espace probabilisé
*   $(A_n)_{n \ge 0}$ suite d'événements ($A_n \in \mathcal{A} \ \forall n$)

**Énoncé formel**
**Continuité croissante :**
$$ A_0 \subset A_1 \subset \dots \subset A_n \subset \dots \implies P\left(\bigcup_{n=0}^{+\infty} A_n\right) = \lim_{n \to +\infty} P(A_n) $$

**Continuité décroissante :**
$$ A_0 \supset A_1 \supset \dots \supset A_n \supset \dots \implies P\left(\bigcap_{n=0}^{+\infty} A_n\right) = \lim_{n \to +\infty} P(A_n) $$

**Démonstration (Esquisse)**
*   **Continuité croissante :** Poser $B_0 = A_0$ et $B_n = A_n \setminus A_{n-1}$ pour $n \ge 1$. Les $B_n$ sont deux à deux disjoints, $\bigcup_{k=0}^n B_k = A_n$, et $\bigcup_{n \ge 0} B_n = \bigcup_{n \ge 0} A_n$. Par $\sigma$-additivité :
    $$ P\left(\bigcup_n A_n\right) = \sum_{n=0}^{+\infty} P(B_n) = \lim_{N \to \infty} \sum_{n=0}^N P(B_n) = \lim_{N \to \infty} P(A_N) $$
*   **Continuité décroissante :** Par complémentarité : $B_n = A_n^c$ est croissante, appliquer la continuité croissante à $(B_n)$.

### 
**Subtilités**
*   **La $\sigma$-additivité est la clé :** Ces propriétés sont équivalentes à la $\sigma$-additivité (avec la finitude de $P(\Omega)=1$). Une mesure additive (non $\sigma$-additive) ne vérifie pas forcément ces continuités.
*   **Continuité décroissante sans hypothèse de finitude :** En théorie de la mesure générale, la continuité décroissante requiert que $P(A_0) < +\infty$. Ici, puisque $P(A_0) \le 1 < +\infty$, c'est automatique.
*   Ces résultats s'appliquent à toute mesure finie, pas seulement aux probabilités.

**Pièges classiques**
*   Oublier la condition de monotonie : sans $A_n \subset A_{n+1}$ (resp. $\supset$), le résultat est faux en général.
*   Confondre $\liminf A_n$, $\limsup A_n$, $\cup A_n$, $\cap A_n$ : la continuité concerne les suites monotones.
*   Contre-exemple pour la décroissante sans finitude : Sur $(\mathbb{N}, \mathcal{P}(\mathbb{N}), \#)$ (mesure de comptage), $A_n = \{k \ge n\}$ est décroissante, $\cap A_n = \emptyset$ mais $\#(A_n) = +\infty \ \forall n$.

---

## FLASHCARD 188 — À connaître 64 : Formule du crible (inclusion-exclusion)

### RECTO
**À connaître 64 — Formule du crible (Poincaré)**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $A_1, \dots, A_n \in \mathcal{A}$.

**Question :** Énoncer la formule du crible pour $P(A_1 \cup \dots \cup A_n)$.

### VERSO
**Énoncé formel**
$$ P\left(\bigcup_{i=1}^n A_i\right) = \sum_{k=1}^n (-1)^{k-1} \sum_{1 \le i_1 < \dots < i_k \le n} P(A_{i_1} \cap \dots \cap A_{i_k}) $$

**Développé pour $n=3$ :**
$P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$

**Formule complémentaire (événement contraire) :**
$$ P\left(\bigcap_{i=1}^n A_i^c\right) = 1 - P\left(\bigcup_{i=1}^n A_i\right) = \sum_{k=0}^n (-1)^k \sum_{|I|=k} P\left(\bigcap_{i \in I} A_i\right) $$

**Démonstration (Esquisse)**
Par récurrence sur $n$ : initialisation triviale. Hérédité via $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ (additivité + complémentarité). Alternativement, via l'indicatrice : $1_{\cup A_i} = 1 - \prod_i (1 - 1_{A_i})$, développer et prendre l'espérance.

### 
**Subtilités**
*   **Formule du crible inégale (Bonferroni) :** Les troncatures donnent des inégalités alternées :
    $P(\cup A_i) \le \sum P(A_i)$ (union bound)
    $P(\cup A_i) \ge \sum P(A_i) - \sum_{i<j} P(A_i \cap A_j)$
*   **Nombre de termes :** La somme contient $2^n - 1$ termes au total.

**Pièges classiques**
*   Oublier les signes alternés : le terme d'ordre $k$ est de signe $(-1)^{k-1}$.
*   Erreur de comptage dans la somme sur les $\binom{n}{k}$ intersections.
*   Confondre avec la formule d'inclusion-exclusion ensembliste (même structure, mais avec des cardinaux).

---

## FLASHCARD 189 — À connaître 65 : Premier lemme de Borel-Cantelli

### RECTO
**À connaître 65 — Premier lemme de Borel-Cantelli**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(A_n)_{n \ge 1}$ une suite d'événements.

**Question :** Énoncer le premier lemme de Borel-Cantelli, préciser la condition et la conclusion sur $P(\limsup A_n)$.

### VERSO
**Notation préliminaire**
$$ \limsup_{n \to +\infty} A_n = \bigcap_{n=1}^{+\infty} \bigcup_{k=n}^{+\infty} A_k = \{A_n \text{ i.o.}\} = \{\omega : \omega \in A_n \text{ pour une infinité de } n\} $$
("i.o." = infinitely often = infiniment souvent)

**Hypothèse**
$$ \sum_{n=1}^{+\infty} P(A_n) < +\infty $$

**Conclusion**
$$ P(\limsup_{n \to +\infty} A_n) = 0 $$

**Démonstration**
$$ P\left(\bigcap_{n=1}^\infty \bigcup_{k=n}^\infty A_k\right) \le P\left(\bigcup_{k=n}^\infty A_k\right) \le \sum_{k=n}^{+\infty} P(A_k) \xrightarrow[n \to +\infty]{} 0 $$
car $\sum P(A_n) < +\infty$ (reste d'une série convergente). Par continuité décroissante :
$$ P\left(\bigcap_{n \ge 1} \bigcup_{k \ge n} A_k\right) = \lim_{n \to +\infty} P\left(\bigcup_{k \ge n} A_k\right) = 0 $$

### 
**Subtilités**
*   **Aucune hypothèse d'indépendance !** Le premier lemme vaut pour des événements quelconques (pas besoin d'indépendance).
*   **La réciproque est fausse :** $\sum P(A_n) = +\infty$ n'implique pas $P(\limsup A_n) > 0$ en général (sans indépendance). Exemple : $A_n = A$ pour tout $n$, $P(A) > 0$, $\sum P(A_n) = +\infty$, mais $\limsup A_n = A$ et $P(A)$ peut être < 1.
*   **La réciproque avec indépendance :** C'est le second lemme de Borel-Cantelli (À connaître 66).

**Pièges classiques**
*   Croire qu'il faut l'indépendance pour le premier lemme : non, il est général.
*   Mal interpréter $\limsup A_n$ : c'est l'événement "infiniment souvent $A_n$", pas la limite de $A_n$.
*   Utiliser $\sigma$-sous-additivité ($P(\cup A_k) \le \sum P(A_k)$) sans la mentionner.

---

## FLASHCARD 190 — À connaître 66 : Second lemme de Borel-Cantelli

### RECTO
**À connaître 66 — Second lemme de Borel-Cantelli**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(A_n)_{n \ge 1}$ une suite d'événements mutuellement indépendants.

**Question :** Énoncer le second lemme de Borel-Cantelli et sa conclusion sur $P(\limsup A_n)$.

### VERSO
**Hypothèses**
*   $(A_n)_{n \ge 1}$ suite d'événements mutuellement indépendants :
    $$ \forall k \ge 1, \forall 1 \le n_1 < \dots < n_k, \quad P(A_{n_1} \cap \dots \cap A_{n_k}) = \prod_{i=1}^k P(A_{n_i}) $$
*   $\sum_{n=1}^{+\infty} P(A_n) = +\infty$

**Conclusion**
$$ P(\limsup_{n \to +\infty} A_n) = 1 $$

**Démonstration (Esquisse)**
Il suffit de montrer $P(\liminf A_n^c) = 0$, i.e. $P(\bigcup_n \bigcap_{k \ge n} A_k^c) = 0$.

Pour $n \le k \le N$, par indépendance :
$$ P\left(\bigcap_{k=n}^N A_k^c\right) = \prod_{k=n}^N (1 - P(A_k)) \le \prod_{k=n}^N e^{-P(A_k)} = \exp\left(-\sum_{k=n}^N P(A_k)\right) \xrightarrow[N \to +\infty]{} 0 $$
car $\sum P(A_k) = +\infty$. Par continuité décroissante, $P(\bigcap_{k \ge n} A_k^c) = 0 \ \forall n$, donc $P(\bigcup_n \bigcap_{k \ge n} A_k^c) = 0$.

### 
**Subtilités**
*   **L'indépendance mutuelle est cruciale :** L'indépendance deux à deux ne suffit pas.
*   $\sum P(A_n) = +\infty$ + indépendance $\implies P(\limsup A_n) = 1$ : La loi du 0-1 de Kolmogorov affirme que $P(\limsup A_n) \in \{0, 1\}$ pour des événements indépendants (c'est un événement asymptotique "terminal").
*   L'inégalité $1-x \le e^{-x}$ est la clé de la preuve.

**Pièges classiques**
*   Confondre les deux lemmes de Borel-Cantelli : premier = convergence de la série $\implies$ proba nulle (sans indépendance) ; second = divergence + indépendance $\implies$ proba 1.
*   Oublier que l'indépendance deux à deux ne suffit pas pour le second lemme.

---

## FLASHCARD 191 — Proposition 55 : Formule des probabilités totales

### RECTO
**Proposition 55 — Formule des probabilités totales**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé.

**Question :** Énoncer la formule des probabilités totales dans le cadre d'un système complet d'événements, avec les hypothèses exactes.

### VERSO
**Définition préliminaire**
$(B_i)_{i \in I}$ (avec $I$ fini ou dénombrable) est un système complet d'événements (SCE) si :
*   Les $B_i$ sont deux à deux incompatibles : $\forall i \neq j, B_i \cap B_j = \emptyset$
*   Ils recouvrent $\Omega$ : $\bigsqcup_{i \in I} B_i = \Omega$
*   $\forall i \in I, P(B_i) > 0$ (hypothèse parfois requise pour conditionner)

**Énoncé formel**
Soit $(B_i)_{i \in I}$ un SCE avec $P(B_i) > 0 \ \forall i$, et $A \in \mathcal{A}$ :

$$ P(A) = \sum_{i \in I} P(A \mid B_i) P(B_i) $$

Version sans conditionnement (si certains $P(B_i) = 0$) :
$$ P(A) = \sum_{i \in I} P(A \cap B_i) $$
(toujours valide par $\sigma$-additivité car $A = \bigsqcup_i (A \cap B_i)$).

**Démonstration**
$A = A \cap \Omega = A \cap \bigsqcup_i B_i = \bigsqcup_i (A \cap B_i)$, disjoints. Par $\sigma$-additivité :
$$ P(A) = \sum_i P(A \cap B_i) = \sum_i P(A \mid B_i) P(B_i) $$

### 
**Subtilités**
*   **$I$ peut être infini dénombrable :** La formule reste valide par $\sigma$-additivité, à condition que $(B_i)$ soit bien un SCE dénombrable.
*   $P(B_i) > 0$ nécessaire pour écrire $P(A \mid B_i)$ : Si $P(B_i) = 0$, le terme $P(A \cap B_i) = 0$ donc on peut ignorer $B_i$ ou utiliser la version sans conditionnement.
*   Le cas $I = \{B, B^c\}$ : $P(A) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c)$ (version la plus classique).

**Pièges classiques**
*   Oublier que les $B_i$ doivent partitionner tout $\Omega$, pas juste un sous-ensemble.
*   Appliquer la formule avec un $B_i$ de probabilité nulle sans précaution.
*   Confondre $P(A \mid B_i)P(B_i)$ avec $P(B_i \mid A)P(A)$ — c'est la formule de Bayes.

---

## FLASHCARD 192 — Proposition 56 : Formule de Bayes

### RECTO
**Proposition 56 — Formule de Bayes**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, $(B_i)_{i \in I}$ un système complet d'événements avec $P(B_i) > 0$, et $A \in \mathcal{A}$ avec $P(A) > 0$.

**Question :** Énoncer la formule de Bayes permettant de calculer $P(B_j \mid A)$.

### VERSO
**Énoncé formel**
$$ \forall j \in I : \quad P(B_j \mid A) = \frac{P(A \mid B_j) P(B_j)}{\sum_{i \in I} P(A \mid B_i) P(B_i)} $$

**Démonstration**
Par définition de la probabilité conditionnelle et la formule des probabilités totales :
$$ P(B_j \mid A) = \frac{P(A \cap B_j)}{P(A)} = \frac{P(A \mid B_j) P(B_j)}{P(A)} = \frac{P(A \mid B_j) P(B_j)}{\sum_i P(A \mid B_i) P(B_i)} $$

**Terminologie probabiliste**
*   $P(B_j)$ : probabilité a priori (prior) de $B_j$
*   $P(A \mid B_j)$ : vraisemblance de $A$ sachant $B_j$
*   $P(B_j \mid A)$ : probabilité a posteriori (posterior) de $B_j$ sachant $A$

### 
**Subtilités**
*   $P(A) > 0$ est indispensable pour que $P(B_j \mid A)$ soit défini.
*   Bayes est une conséquence directe de la définition de la probabilité conditionnelle + formule des probabilités totales : ce n'est pas un axiome.
*   **Application classique :** Tests médicaux (sensibilité/spécificité), paradoxe de Monty Hall, etc.

**Pièges classiques**
*   **Inverser $P(A \mid B_j)$ et $P(B_j \mid A)$ :** c'est l'erreur de la transposition du conditionnel (fallacy of the transposed conditional), très fréquente.
*   Oublier de normaliser (le dénominateur est $P(A)$, pas 1).

---

## FLASHCARD 193 — Proposition 57 : Inégalité de Cauchy-Schwarz (probabiliste)

### RECTO
**Proposition 57 — Inégalité de Cauchy-Schwarz probabiliste**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, et $X, Y$ deux variables aléatoires de carré intégrable ($X, Y \in L^2(\Omega)$).

**Question :** Énoncer l'inégalité de Cauchy-Schwarz dans ce cadre, avec la condition d'égalité.

### VERSO
**Hypothèses**
*   $X, Y : \Omega \to \mathbb{R}$ variables aléatoires
*   $E[X^2] < +\infty$ et $E[Y^2] < +\infty$ (i.e. $X, Y \in L^2$)

**Énoncé formel**
$$ |E[XY]|^2 \le E[X^2] E[Y^2] $$

**Condition d'égalité :**
$$ E[XY]^2 = E[X^2] E[Y^2] \iff \exists (\alpha, \beta) \neq (0, 0), \alpha X + \beta Y = 0 \text{ p.s.} $$
i.e. $X$ et $Y$ sont presque sûrement proportionnels.

**Corollaire (covariance)**
$$ |\text{Cov}(X, Y)|^2 \le \text{Var}(X) \text{Var}(Y) $$
$$ |\rho(X, Y)| \le 1 \quad \text{où } \rho(X, Y) = \frac{\text{Cov}(X, Y)}{\sqrt{\text{Var}(X)} \sqrt{\text{Var}(Y)}} $$

**Démonstration (Esquisse)**
$(X, Y) \mapsto E[XY]$ est un produit scalaire sur $L^2$. Appliquer Cauchy-Schwarz dans cet espace de Hilbert : $\|XY\|_1 = |E[XY]| \le \|X\|_2 \|Y\|_2$. Formellement, discriminant de $t \mapsto E[(tX+Y)^2] = E[X^2]t^2 + 2E[XY]t + E[Y^2] \ge 0$.

### 
**Subtilités**
*   $L^2$ est requis : $E[XY]$ peut ne pas exister si $X \notin L^2$ ou $Y \notin L^2$ (l'inégalité de Hölder généralise).
*   **Corrélation :** $|\rho| = 1 \iff X$ et $Y$ affines p.s. ($Y = aX+b$ p.s.). La corrélation mesure la dépendance linéaire, non la dépendance tout court.

**Pièges classiques**
*   Confondre $E[XY]^2 \le E[X^2] E[Y^2]$ avec $(E[XY])^2 \le E[X^2] E[Y^2]$ : ce sont la même chose ($|E[XY]|^2$).
*   Croire que $\rho(X, Y) = 0$ implique l'indépendance : FAUX (corrélation nulle $\not\Rightarrow$ indépendance).

---

## FLASHCARD 194 — Proposition 58 : Variance d'une somme

### RECTO
**Proposition 58 — Variance d'une somme de variables aléatoires**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $X_1, \dots, X_n \in L^2(\Omega)$.

**Question :** Donner la formule de la variance d'une somme $S_n = X_1 + \dots + X_n$, en faisant apparaître les covariances. Donner le cas des variables deux à deux non corrélées.

### VERSO
**Énoncé formel — Formule générale**
$$ \text{Var}(X_1 + \dots + X_n) = \sum_{i=1}^n \text{Var}(X_i) + 2 \sum_{1 \le i < j \le n} \text{Cov}(X_i, X_j) $$

Ou de façon compacte :
$$ \text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \sum_{j=1}^n \text{Cov}(X_i, X_j) $$
(en notant $\text{Cov}(X_i, X_i) = \text{Var}(X_i)$).

**Cas particuliers**
**Variables deux à deux non corrélées** ($\text{Cov}(X_i, X_j) = 0 \ \forall i \neq j$) :
$$ \text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \text{Var}(X_i) $$

En particulier pour des v.a. indépendantes de $L^2$ : (indépendance $\implies$ non corrélées) :
$$ X_1, \dots, X_n \text{ indépendantes} \implies \text{Var}\left(\sum_{i=1}^n X_i\right) = \sum_{i=1}^n \text{Var}(X_i) $$

**Rappels**
*   $\text{Var}(X) = E[X^2] - (E[X])^2 = E[(X - E[X])^2]$
*   $\text{Cov}(X, Y) = E[XY] - E[X]E[Y]$
*   $\text{Var}(aX+b) = a^2 \text{Var}(X)$

### 
**Subtilités**
*   **Non corrélé $\not\Rightarrow$ indépendant :** Il existe des variables non corrélées mais dépendantes. La formule de la variance s'additionne pour les non corrélées, ce qui est plus faible que l'indépendance.
*   **Indépendant $\implies$ non corrélé :** Si $X, Y$ indépendantes et $\in L^2$, alors $E[XY] = E[X]E[Y]$ donc $\text{Cov}(X, Y) = 0$.
*   $n^2$ termes dans la double somme, dont $n$ termes diagonaux (variances) et $n(n-1)$ termes croisés (covariances, par paires = $n(n-1)/2$ termes distincts).

**Pièges classiques**
*   Oublier le facteur 2 devant $\sum_{i < j} \text{Cov}(X_i, X_j)$.
*   Confondre non corrélées et indépendantes.
*   Appliquer la formule $\text{Var}(\sum X_i) = \sum \text{Var}(X_i)$ sans vérifier la non-corrélation.

---

## FLASHCARD 195 — Proposition 59 : Variables aléatoires indépendantes

### RECTO
**Proposition 59 — Propriétés des variables aléatoires indépendantes**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $X_1, \dots, X_n$ des variables aléatoires mutuellement indépendantes.

**Question :** Énoncer les principales propriétés des variables aléatoires indépendantes : espérance du produit, fonctions, loi jointe.

### VERSO
**Définition (rappel)**
$X_1, \dots, X_n$ sont mutuellement indépendantes si :
$$ \forall B_1, \dots, B_n \in \mathcal{B}(\mathbb{R}) : P(X_1 \in B_1, \dots, X_n \in B_n) = \prod_{i=1}^n P(X_i \in B_i) $$

**Propriétés fondamentales**
1.  **Loi jointe = produit des lois marginales :**
    $$ P_{(X_1, \dots, X_n)} = P_{X_1} \otimes \dots \otimes P_{X_n} $$

2.  **Espérance du produit (si $X_i \in L^1$) :**
    $$ E\left[\prod_{i=1}^n X_i\right] = \prod_{i=1}^n E[X_i] $$

3.  **Stabilité par fonctions mesurables :** Si $f_1, \dots, f_n : \mathbb{R} \to \mathbb{R}$ sont mesurables, alors $f_1(X_1), \dots, f_n(X_n)$ sont mutuellement indépendantes.

4.  **Stabilité par regroupement :** Si $(I_1, \dots, I_k)$ est une partition de $\llbracket 1, n \rrbracket$ et $g_j$ mesurable, alors $g_1((X_i)_{i \in I_1}), \dots, g_k((X_i)_{i \in I_k})$ sont indépendantes.

5.  **Non corrélation :** $X_i, X_j \in L^2 \implies \text{Cov}(X_i, X_j) = 0$.

### 
**Subtilités**
*   **Indépendance mutuelle $\neq$ indépendance deux à deux :** Il existe des familles deux à deux indépendantes mais pas mutuellement indépendantes (contre-exemple classique : pile ou face avec 3 variables).
*   La réciproque de (2) est fausse : $E[XY] = E[X]E[Y]$ (non corrélées) n'implique pas l'indépendance.
*   Propriété (3) est extrêmement utile : Elle permet par exemple de déduire que $X^2$ et $Y^2$ sont indépendantes si $X$ et $Y$ le sont.

**Pièges classiques**
*   Confondre indépendance deux à deux et mutuelle : bien préciser dans les énoncés.
*   Oublier l'intégrabilité pour (2) : $X_i$ doivent être dans $L^1$ pour que $E[\prod X_i] = \prod E[X_i]$.

---

## FLASHCARD 196 — Proposition 60 : Espérance conditionnelle (cas discret)

### RECTO
**Proposition 60 — Espérance conditionnelle (cadre discret)**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, $X$ une variable aléatoire réelle et $Y$ une variable aléatoire discrète (à valeurs dans un ensemble dénombrable $D$).

**Question :** Définir $E[X \mid Y]$ dans le cas discret, et énoncer ses propriétés fondamentales.

### VERSO
**Définition**
Si $X \in L^1(\Omega)$ et $Y$ discrète à valeurs dans $D$ :

$$ E[X \mid Y] : \omega \mapsto \sum_{y \in D} E[X \mid Y=y] \, 1_{Y(\omega)=y} $$

où $E[X \mid Y=y] = \frac{E[X \cdot 1_{Y=y}]}{P(Y=y)}$ si $P(Y=y) > 0$.

C'est une variable aléatoire (mesurable par rapport à $\sigma(Y)$).

**Propriétés fondamentales**
1.  **Linéarité :** $E[\alpha X + \beta Z \mid Y] = \alpha E[X \mid Y] + \beta E[Z \mid Y]$ p.s.
2.  **Espérance totale (tour de la tour — cas simple) :**
    $$ E[E[X \mid Y]] = E[X] $$
3.  **Extraction des facteurs mesurables :**
    $$ E[f(Y) \cdot X \mid Y] = f(Y) \cdot E[X \mid Y] \quad \text{p.s.} $$
4.  **Indépendance :**
    $$ X \perp Y \implies E[X \mid Y] = E[X] \quad \text{p.s.} $$
5.  **Positivité :** $X \ge 0$ p.s. $\implies E[X \mid Y] \ge 0$ p.s.

### 
**Subtilités**
*   $E[X \mid Y]$ est une variable aléatoire, pas un nombre : elle dépend de $\omega$ à travers $Y(\omega)$.
*   La formule des probabilités totales est le cas $X = 1_A$ : $P(A) = E[1_A] = E[E[1_A \mid Y]] = \sum_y P(A \mid Y=y)P(Y=y)$.
*   **En programme MP :** L'espérance conditionnelle complète (définie par le théorème de Radon-Nikodym) est hors programme ; on se limite au cas discret.

**Pièges classiques**
*   Confondre $E[X \mid Y=y]$ (un réel) et $E[X \mid Y]$ (une v.a.).
*   Oublier que $E[X \mid Y]$ est $\sigma(Y)$-mesurable, donc est une fonction de $Y$.

---

## FLASHCARD 197 — Lemme 9 : Lemme des coalitions

### RECTO
**Lemme 9 — Lemme des coalitions**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(X_i)_{i \in I}$ une famille de variables aléatoires mutuellement indépendantes.

**Question :** Énoncer le lemme des coalitions, précisant comment on peut regrouper des variables indépendantes.

### VERSO
**Énoncé formel**
Soit $(X_1, \dots, X_n)$ des variables aléatoires mutuellement indépendantes. Soit $(I_1, \dots, I_k)$ une partition de $\llbracket 1, n \rrbracket$ (i.e. $I_1 \sqcup \dots \sqcup I_k = \llbracket 1, n \rrbracket$).

Soit pour chaque $j \in \llbracket 1, k \rrbracket$, $f_j : \mathbb{R}^{|I_j|} \to \mathbb{R}$ une fonction mesurable (borélienne).

Alors les variables aléatoires :
$$ Y_j = f_j((X_i)_{i \in I_j}), \quad j = 1, \dots, k $$
sont mutuellement indépendantes.

**Cas particulier important**
$$ X_1, \dots, X_n \text{ i.i.d.} \implies (X_1, \dots, X_p) \perp (X_{p+1}, \dots, X_n) $$

Et donc $f(X_1, \dots, X_p) \perp g(X_{p+1}, \dots, X_n)$ pour toutes fonctions mesurables $f, g$.

**Démonstration (Idée)**
Les $\sigma$-algèbres $\sigma(X_i, i \in I_j)$ pour $j = 1, \dots, k$ sont mutuellement indépendantes (par indépendance mutuelle des $X_i$). Comme $Y_j$ est mesurable par rapport à $\sigma(X_i, i \in I_j)$, les $Y_j$ sont indépendantes.

### 
**Subtilités**
*   Partition = recouvrement disjoint complet : Les groupes $I_j$ ne se chevauchent pas.
*   **Mesurabilité des $f_j$ indispensable :** Sans mesurabilité, $Y_j$ n'est pas une variable aléatoire.
*   Application typique : $S_p = X_1 + \dots + X_p$ et $T = X_{p+1} + \dots + X_n$ sont indépendantes si $(X_i)$ i.i.d.

**Pièges classiques**
*   Croire que ce lemme s'applique à des variables seulement deux à deux indépendantes : il faut l'indépendance mutuelle.
*   Confondre "les $X_i$ sont indépendants" avec "les $Y_j$ sont indépendants" sans préciser la partition.

---

## FLASHCARD 198 — Proposition 61 : Espérance d'un produit de variables indépendantes

### RECTO
**Proposition 61 — Espérance d'un produit de variables aléatoires indépendantes**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, et $X_1, \dots, X_n$ des variables aléatoires mutuellement indépendantes et intégrables ($X_i \in L^1$).

**Question :** Montrer que $X_1 \dots X_n \in L^1$ et que $E[X_1 \dots X_n] = \prod_{i=1}^n E[X_i]$.

### VERSO
**Hypothèses**
*   $X_1, \dots, X_n$ mutuellement indépendantes
*   $\forall i, X_i \in L^1(\Omega)$ (i.e. $E[|X_i|] < +\infty$)

**Énoncé formel**
$$ X_1 \dots X_n \in L^1(\Omega) \quad \text{et} \quad E\left[\prod_{i=1}^n X_i\right] = \prod_{i=1}^n E[X_i] $$

**Démonstration (Esquisse)**
Cas $n=2$ : Par la formule de transfert et l'indépendance (loi jointe = produit des marginales) :
$$ E[XY] = \int_{\mathbb{R}^2} xy d(P_X \otimes P_Y)(x, y) = \int_\mathbb{R} x dP_X(x) \cdot \int_\mathbb{R} y dP_Y(y) = E[X] E[Y] $$
L'intégrabilité de $XY$ vient du théorème de Fubini : $E[|XY|] = E[|X|]E[|Y|] < +\infty$.

Cas général : Par récurrence et le lemme des coalitions.

### 
**Subtilités**
*   L'intégrabilité du produit n'est pas automatique pour des variables non indépendantes : $X$ et $Y$ intégrables n'implique pas $XY$ intégrable. Ici, l'indépendance + $L^1$ donne $E[|XY|] = E[|X|]E[|Y|] < +\infty$.
*   La réciproque est fausse : $E[XY] = E[X]E[Y]$ n'implique pas l'indépendance (seulement la non-corrélation si $X, Y \in L^2$).
*   Pour $X \in L^2$ : $E[XY] = E[X]E[Y]$ équivaut à $\text{Cov}(X, Y) = 0$.

**Pièges classiques**
*   Appliquer la formule $E[\prod X_i] = \prod E[X_i]$ à des variables corrélées.
*   Oublier de vérifier l'intégrabilité du produit avant d'invoquer la formule.

---

## FLASHCARD 199 — Proposition 62 : Formule de transfert

### RECTO
**Proposition 62 — Formule de transfert**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé, $X : \Omega \to E$ une variable aléatoire à valeurs dans un espace mesurable $(E, \mathcal{E})$, et $f : E \to \mathbb{R}$ une fonction mesurable.

**Question :** Énoncer la formule de transfert, donnant $E[f(X)]$ en fonction de la loi $P_X$ de $X$.

### VERSO
**Énoncé formel**
Si $f \ge 0$ ou $f(X) \in L^1(\Omega)$ :

$$ E[f(X)] = \int_E f(x) dP_X(x) $$

où $P_X = X^* P$ est la loi image (pushforward) de $P$ par $X$.

**Cas discret ($X$ à valeurs dans $D$ dénombrable)**
$$ E[f(X)] = \sum_{x \in D} f(x) P(X=x) $$

**Cas à densité ($X$ admet une densité $p_X$ par rapport à la mesure de Lebesgue)**
$$ E[f(X)] = \int_\mathbb{R} f(x) p_X(x) dx $$

**Démonstration (Idée)**
Par définition de l'intégrale par rapport à la mesure image : $\int_E f d(X^* P) = \int_\Omega f \circ X dP = E[f(X)]$.

### 
**Subtilités**
*   La formule de transfert est fondamentale : Elle permet de calculer $E[f(X)]$ à partir de la seule loi de $X$, sans revenir à $\Omega$.
*   **Condition d'applicabilité :** $f(X) \in L^1(\Omega) \iff \int_E |f| dP_X < +\infty$. Vérifier cela en pratique (via la densité ou la loi discrète).
*   **Généralisation :** Pour $(X_1, \dots, X_n)$ de loi jointe $P_{(X_1, \dots, X_n)}$ :
    $$ E[f(X_1, \dots, X_n)] = \int_{\mathbb{R}^n} f(x_1, \dots, x_n) dP_{(X_1, \dots, X_n)}(x_1, \dots, x_n) $$

**Pièges classiques**
*   Confondre la mesure de probabilité $P_X$ (définie sur $\mathbb{R}$) avec la densité $p_X$ (fonction). $P_X = p_X \cdot \lambda$ seulement si $X$ a une densité.
*   Oublier de vérifier l'intégrabilité de $f$ avant d'appliquer la formule.

---

## FLASHCARD 200 — Proposition 63 : Fonctions génératrices

### RECTO
**Proposition 63 — Fonctions génératrices des probabilités et des moments**

Soit $X$ une variable aléatoire à valeurs dans $\mathbb{N}$ (variable aléatoire discrète sur $\mathbb{N}$).

**Question :** Définir la fonction génératrice de $X$, son rayon de convergence minimal, et énoncer les propriétés permettant de retrouver la loi et les moments.

### VERSO
**Définition**
La fonction génératrice (des probabilités) de $X$ est :

$$ G_X : t \mapsto E[t^X] = \sum_{k=0}^{+\infty} P(X=k) t^k $$

**Domaine :** $G_X$ est définie et la série converge absolument au moins pour $t \in [-1, 1]$ (car $\sum P(X=k)|t|^k \le \sum P(X=k) = 1$ pour $|t| \le 1$).

**Propriétés fondamentales**
1.  **Détermination de la loi :**
    $$ P(X=k) = \frac{G_X^{(k)}(0)}{k!} \quad \forall k \in \mathbb{N} $$

2.  **Moments :**
    $$ E[X] = G_X'(1^-), \quad E[X(X-1)] = G_X''(1^-), \dots $$
    $$ E[X(X-1)\dots(X-k+1)] = G_X^{(k)}(1^-) $$

3.  **Indépendance :**
    $$ X \perp Y \implies G_{X+Y}(t) = G_X(t) \cdot G_Y(t) $$

4.  La suite $(G_X(t))_t$ caractérise la loi de $X$ (unicité de la décomposition en série entière).

**Fonctions génératrices classiques**
*   **$B(n, p)$ :** $(1-p+pt)^n$
*   **$P(\lambda)$ :** $e^{\lambda(t-1)}$
*   **$G(p)$ :** $\frac{p}{1-(1-p)t}$
*   **$B(1, p)$ :** $1-p+pt$

### 
**Subtilités**
*   $G_X(1) = 1$ toujours (conservation de la masse totale).
*   Rayon de convergence $\ge 1$ : $G_X$ est une série entière de rayon $R \ge 1$. Elle peut diverger pour $|t| > 1$.
*   Dérivées en $t=1$ : Les formules de moments utilisent les dérivées en $1^-$ (limite à gauche) car $G_X$ peut ne pas être définie pour $t > 1$.
*   Différence avec la fonction génératrice des moments : $M_X(t) = E[e^{tX}]$ (ne converge pas toujours), différente de $G_X$.

**Pièges classiques**
*   Confondre fonction génératrice (pour $\mathbb{N}$-valuées) et fonction caractéristique $\varphi_X(t) = E[e^{itX}]$ (toujours définie, pour toute v.a. réelle).
*   Oublier que $G_X$ ne s'applique qu'aux v.a. à valeurs dans $\mathbb{N}$.
*   Erreur dans la formule des moments : $E[X] = G_X'(1)$, pas $G_X'(0)$.

---

## FLASHCARD 201 — À connaître 67 : Fonction caractéristique

### RECTO
**À connaître 67 — Fonction caractéristique d'une variable aléatoire**

Soit $X$ une variable aléatoire réelle sur $(\Omega, \mathcal{A}, P)$.

**Question :** Définir la fonction caractéristique de $X$, donner ses propriétés fondamentales et les exemples classiques.

### VERSO
**Définition**
$$ \varphi_X : \mathbb{R} \to \mathbb{C}, \quad \varphi_X(t) = E[e^{itX}] = \int_\mathbb{R} e^{itx} dP_X(x) $$

**Remarque :** $|\varphi_X(t)| \le E[|e^{itX}|] = 1$, donc $\varphi_X$ est toujours définie et bornée.

**Propriétés fondamentales**
1.  **Valeur en 0 :** $\varphi_X(0) = 1$
2.  **Conjugaison :** $\varphi_X(-t) = \overline{\varphi_X(t)}$
3.  **Continuité :** $\varphi_X$ est continue sur $\mathbb{R}$
4.  **Caractérisation de la loi :** $\varphi_X = \varphi_Y \iff P_X = P_Y$ (injectivité)
5.  **Indépendance :** $X \perp Y \implies \varphi_{X+Y}(t) = \varphi_X(t) \cdot \varphi_Y(t)$
6.  **Lien avec les moments :** Si $E[|X|^k] < +\infty$, alors $\varphi_X$ est $k$ fois dérivable et :
    $$ \varphi_X^{(k)}(0) = i^k E[X^k] $$

**Fonctions caractéristiques classiques**
*   **$N(0, 1)$ :** $e^{-t^2/2}$
*   **$N(\mu, \sigma^2)$ :** $e^{i\mu t - \sigma^2 t^2/2}$
*   **$P(\lambda)$ :** $e^{\lambda(e^{it}-1)}$
*   **$U([a, b])$ :** $\frac{e^{ibt}-e^{iat}}{i(b-a)t}$
*   **$B(n, p)$ :** $(1-p+pe^{it})^n$

### 
**Subtilités**
*   Toujours définie, contrairement à la fonction génératrice des moments $M_X(t) = E[e^{tX}]$ qui peut diverger.
*   **Théorème de Paul Lévy :** $\varphi_{X_n} \to \varphi_X$ ponctuellement $\implies X_n \xrightarrow{\mathcal{L}} X$ (convergence en loi). C'est la base de la preuve du TCL via les fonctions caractéristiques.
*   **Formule d'inversion :** Si $\varphi_X \in L^1(\mathbb{R})$, alors $X$ a une densité $p_X(x) = \frac{1}{2\pi} \int_\mathbb{R} e^{-itx} \varphi_X(t) dt$.

**Pièges classiques**
*   Confondre $\varphi_X(t) = E[e^{itX}]$ (fonction caractéristique, $t$ réel) avec la transformée de Laplace $E[e^{tX}]$ ($t$ réel mais peut diverger) ou la transformée de Fourier.
*   Oublier le $i$ dans $e^{itX}$ : sans $i$, $E[e^{tX}]$ est la fonction génératrice des moments, qui peut ne pas exister.

---

## FLASHCARD 202 — Proposition 64 : Lois classiques

### RECTO
**Proposition 64 — Lois classiques et leurs caractéristiques**

**Question :** Donner le tableau des lois de probabilité classiques du programme MP, avec pour chacune : paramètres, support, espérance et variance.

### VERSO
**Lois discrètes**
*   **Bernoulli $B(p)$** : $p \in [0, 1]$, support $\{0, 1\}$, $E[X]=p$, $Var(X)=p(1-p)$.
*   **Binomiale $B(n, p)$** : $n \in \mathbb{N}^*, p \in [0, 1]$, support $\llbracket 0, n \rrbracket$, $E[X]=np$, $Var(X)=np(1-p)$.
*   **Poisson $P(\lambda)$** : $\lambda > 0$, support $\mathbb{N}$, $E[X]=\lambda$, $Var(X)=\lambda$.
*   **Géométrique $G(p)$** : $p \in ]0, 1]$, support $\mathbb{N}^*$, $E[X]=1/p$, $Var(X)=(1-p)/p^2$.
*   **Uniforme discrète $U(\llbracket a, b \rrbracket)$** : $a \le b \in \mathbb{Z}$, support $\llbracket a, b \rrbracket$, $E[X]=\frac{a+b}{2}$, $Var(X)=\frac{(b-a)(b-a+2)}{12}$.

**Lois continues (à densité)**
*   **Uniforme $U([a, b])$** : $a < b$, densité $\frac{1}{b-a} 1_{[a, b]}$, $E[X]=\frac{a+b}{2}$, $Var(X)=\frac{(b-a)^2}{12}$.
*   **Exponentielle $E(\lambda)$** : $\lambda > 0$, densité $\lambda e^{-\lambda x} 1_{x \ge 0}$, $E[X]=1/\lambda$, $Var(X)=1/\lambda^2$.
*   **Normale $N(\mu, \sigma^2)$** : $\mu \in \mathbb{R}, \sigma > 0$, densité $\frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$, $E[X]=\mu$, $Var(X)=\sigma^2$.
*   **Gamma $\Gamma(a, \lambda)$** : $a, \lambda > 0$, densité $\frac{\lambda^a}{\Gamma(a)} x^{a-1} e^{-\lambda x} 1_{x>0}$, $E[X]=a/\lambda$, $Var(X)=a/\lambda^2$.
*   **Beta $B(a, b)$** : $a, b > 0$, densité $\frac{x^{a-1}(1-x)^{b-1}}{B(a, b)} 1_{(0, 1)}$, $E[X]=\frac{a}{a+b}$, $Var(X)=\frac{ab}{(a+b)^2(a+b+1)}$.

### 
**Subtilités et propriétés importantes**
*   **Stabilité de la loi normale :** Si $X \sim N(\mu_1, \sigma_1^2)$ et $Y \sim N(\mu_2, \sigma_2^2)$ indépendantes, $X+Y \sim N(\mu_1+\mu_2, \sigma_1^2+\sigma_2^2)$.
*   **Loi de Poisson comme limite de binomiales :** $B(n, \lambda/n) \xrightarrow{\mathcal{L}} P(\lambda)$ quand $n \to \infty$.
*   **Sans mémoire :** $G(p)$ et $E(\lambda)$ sont les seules lois sans mémoire (discrète et continue resp.).
*   $\chi^2(n) = \Gamma(n/2, 1/2)$ : Loi du chi-deux (hors programme mais utile à connaître).

**Pièges classiques**
*   Confondre $G(p)$ à support $\mathbb{N}^*$ (nombre d'essais avant le premier succès) et $G(p)$ à support $\mathbb{N}$ (nombre d'échecs avant le succès) — conventions différentes selon les ouvrages.
*   Pour $N(\mu, \sigma^2)$ : la variance est $\sigma^2$, l'écart-type est $\sigma$. Ne pas confondre.
*   $Var(U([a, b])) = \frac{(b-a)^2}{12}$ (ne pas confondre avec la variance discrète).

---

## FLASHCARD 203 — Proposition 65 : Inégalité de Markov

### RECTO
**Proposition 65 — Inégalité de Markov**

**Contexte :** Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $X$ une variable aléatoire positive ($X \ge 0$ p.s.) et intégrable ($X \in L^1$).

**Question :** Énoncer l'inégalité de Markov avec les hypothèses exactes.

### VERSO
**Hypothèses**
*   $X \ge 0$ p.s.
*   $E[X] < +\infty$

**Énoncé formel**
$$ \forall t > 0 : \quad P(X \ge t) \le \frac{E[X]}{t} $$

**Formulation équivalente :** Pour $f : \mathbb{R}_+ \to \mathbb{R}_+$ croissante avec $f(t) > 0$ :
$$ P(X \ge t) = P(f(X) \ge f(t)) \le \frac{E[f(X)]}{f(t)} $$

**Démonstration**
$E[X] = E[X 1_{X \ge t}] + E[X 1_{X < t}] \ge E[X 1_{X \ge t}] \ge t \cdot E[1_{X \ge t}] = t \cdot P(X \ge t)$
D'où $P(X \ge t) \le \frac{E[X]}{t}$.

### 
**Subtilités**
*   **$X \ge 0$ p.s. est nécessaire :** Pour $X$ quelconque, appliquer Markov à $|X|$ : $P(|X| \ge t) \le \frac{E[|X|]}{t}$.
*   **L'inégalité est optimale :** Pour $X = t \cdot 1_A$ avec $P(A) = p$, $E[X] = tp$ et $P(X \ge t) = p = \frac{E[X]}{t}$ : égalité.
*   **Généralisation :** $P(|X|^p \ge t^p) \le \frac{E[|X|^p]}{t^p}$ pour $p > 0$ (Markov appliqué à $|X|^p$).

**Pièges classiques**
*   Oublier la condition $X \ge 0$ p.s. et appliquer Markov directement à une v.a. signée.
*   Confondre Markov ($P(X \ge t) \le E[X]/t$) et Bienaymé-Tchebychev (qui utilise la variance).

---

## FLASHCARD 204 — Proposition 66 : Inégalité de Bienaymé-Tchebychev

### RECTO
**Proposition 66 — Inégalité de Bienaymé-Tchebychev**

Soit $X \in L^2(\Omega, \mathcal{A}, P)$ une variable aléatoire de carré intégrable.

**Question :** Énoncer l'inégalité de Bienaymé-Tchebychev, la relier à Markov, et donner l'application à la loi des grands nombres.

### VERSO
**Hypothèses**
*   $X \in L^2(\Omega)$ : $E[X^2] < +\infty$
*   $E[X] = \mu$, $\text{Var}(X) = \sigma^2 < +\infty$

**Énoncé formel**
$$ \forall \varepsilon > 0 : \quad P(|X - \mu| \ge \varepsilon) \le \frac{\sigma^2}{\varepsilon^2} = \frac{\text{Var}(X)}{\varepsilon^2} $$

**Démonstration**
Appliquer l'inégalité de Markov à la variable positive $(X - \mu)^2 \in L^1$ et au seuil $\varepsilon^2 > 0$ :
$$ P((X - \mu)^2 \ge \varepsilon^2) \le \frac{E[(X - \mu)^2]}{\varepsilon^2} = \frac{\text{Var}(X)}{\varepsilon^2} $$
Or $\{(X - \mu)^2 \ge \varepsilon^2\} = \{|X - \mu| \ge \varepsilon\}$.

**Application : Loi faible des grands nombres (version $L^2$)**
Soit $(X_n)$ i.i.d. de $L^2$, $\mu = E[X_1]$, $\sigma^2 = \text{Var}(X_1)$. Soit $\bar{X}_n = \frac{1}{n} \sum_{k=1}^n X_k$.

$$ P(|\bar{X}_n - \mu| \ge \varepsilon) \le \frac{\text{Var}(\bar{X}_n)}{\varepsilon^2} = \frac{\sigma^2}{n\varepsilon^2} \xrightarrow[n \to +\infty]{} 0 $$

Donc $\bar{X}_n \xrightarrow{P} \mu$.

### 
**Subtilités**
*   Bienaymé-Tchebychev est une conséquence de Markov (appliqué à $(X-\mu)^2$).
*   L'inégalité ne dépend que de la variance, pas de la forme de la loi : elle est universelle.
*   **Optimalité :** Pour $X$ prenant les valeurs $\mu \pm \varepsilon$ avec probabilités $\frac{\sigma^2}{2\varepsilon^2}$ et $\mu$ avec probabilité $1 - \frac{\sigma^2}{\varepsilon^2}$ (quand $\sigma^2 \le \varepsilon^2$), l'inégalité est une égalité.

**Pièges classiques**
*   Confondre $\varepsilon$ et $\varepsilon^2$ dans le dénominateur.
*   Appliquer B-T sans vérifier $X \in L^2$ (la variance doit être finie).
*   Utiliser B-T quand on connaît la loi explicite : dans ce cas, un calcul direct est plus précis.

---

## FLASHCARD 205 — Théorème 61 : Loi faible des grands nombres

### RECTO
**Théorème 61 — Loi faible des grands nombres (LFGN)**

Soit $(\Omega, \mathcal{A}, P)$ un espace probabilisé et $(X_n)_{n \ge 1}$ une suite de variables aléatoires réelles.

**Question :** Énoncer la loi faible des grands nombres dans sa version la plus générale au programme MP, préciser les hypothèses minimales et la conclusion.

### VERSO
**Hypothèses**
*   **Version $L^2$ (Bienaymé-Tchebychev) :**
    *   $(X_n)_{n \ge 1}$ deux à deux non corrélées (suffit pour cette version)
    *   $\forall n, X_n \in L^2$ avec $E[X_n] = \mu$ et $\text{Var}(X_n) \le C < +\infty$ (variance uniformément bornée)
*   **Version i.i.d. $L^1$ (version classique) :**
    *   $(X_n)_{n \ge 1}$ indépendantes et identiquement distribuées (i.i.d.)
    *   $X_1 \in L^1$ avec $E[X_1] = \mu$

**Énoncé formel**
Soit $\bar{X}_n = \frac{1}{n} \sum_{k=1}^n X_k$ la moyenne empirique.

$$ \bar{X}_n \xrightarrow[n \to +\infty]{P} \mu $$

c'est-à-dire : $\forall \varepsilon > 0, P(|\bar{X}_n - \mu| \ge \varepsilon) \xrightarrow[n \to +\infty]{} 0$.

**Démonstration (version $L^2$)**
$\text{Var}(\bar{X}_n) = \frac{1}{n^2} \sum_{k=1}^n \text{Var}(X_k) \le \frac{C}{n}$ (non-corrélation + variance bornée).
Par Bienaymé-Tchebychev :
$$ P(|\bar{X}_n - \mu| \ge \varepsilon) \le \frac{\text{Var}(\bar{X}_n)}{\varepsilon^2} \le \frac{C}{n\varepsilon^2} \to 0 $$

**Remarque sur la version $L^1$**
La version i.i.d. $L^1$ se démontre via la fonction caractéristique (théorème de Paul Lévy) :
$\varphi_{\bar{X}_n}(t) = (\varphi_{X_1}(t/n))^n \to e^{i\mu t}$ (car $\varphi_{X_1}(t/n) = 1 + i\mu \frac{t}{n} + o(1/n)$).

### 
**Subtilités**
*   **"Faible" = convergence en probabilité**, pas p.s. ni en $L^1$. La loi forte (convergence p.s.) requiert des hypothèses supplémentaires et est hors programme MP.
*   Version $L^2$ suffit en pratique au niveau MP et couvre la quasi-totalité des applications.
*   **Hypothèses minimales pour la version $L^2$ :** Non-corrélation (plus faible que l'indépendance) + $L^2$ + variance bornée.
*   **Hypothèses pour la version i.i.d. $L^1$ :** Strictement plus faible ($L^1$ suffit, pas besoin de $L^2$), mais la preuve utilise des outils plus avancés.

**Extensions**
*   **Loi forte des grands nombres (Kolmogorov) :** i.i.d. $L^1 \implies \bar{X}_n \xrightarrow{p.s.} \mu$. Hors programme MP mais connue des meilleurs candidats.
*   **Théorème central limite :** $\sqrt{n}(\bar{X}_n - \mu) \xrightarrow{\mathcal{L}} N(0, \sigma^2)$ pour i.i.d. $L^2$. Hors programme MP strict.

**Pièges classiques**
*   Confondre LFGN et loi forte : LFGN = convergence en probabilité ($\xrightarrow{P}$), loi forte = p.s.
*   Appliquer LFGN sans vérifier l'intégrabilité : Il faut $E[X_1]$ défini (i.e. $X_1 \in L^1$).
*   Croire que la variance doit être finie pour la version $L^1$ : Non, la version $L^1$ i.i.d. ne requiert pas $L^2$.
*   Oublier que la convergence est en probabilité : $\bar{X}_n(\omega) \to \mu$ pour presque tout $\omega$ est la loi forte, plus forte.

---
`;



