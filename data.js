// Fichier: data.js

// Catégories déclarées (pour supporter ${...} dans les données)
const CD="Democracy", CG="Genetics", CI="Immigration", CIT="Relations internationales", CU="Travail", CR="Crime";

export const CHAPTER_EMOJIS = {
  [CD]:'🏛️', [CG]:'🧬', [CI]:'🧳', [CIT]:'🌐', [CU]:'💼', [CR]:'⚖️',
  'Politique':'🏛️', 'Business':'💼', 'Education':'🎓', 'Thanksgiving':'🦃'
};

// Votre gros dataset
const cardsRawText = `
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
506|bien réussir à l'école|to do well at school|Education
507|lire l'anglais couramment|to read English fluently|Education
508|être bon en sport|to be good at sports|Education
509|faire l'école buissonnière|to play truant|Education
510|absentéisme|truancy|Education
511|suivre un cours d'anglais|to take a class in English|Education
512|donner du travail à la maison|to set homework|Education
513|rendre un travail|to hand in a piece of work|Education
514|les subtilités de la langue anglaise|the intricacies of the English language|Education
515|se lancer|to get started|Education
516|se conformer à une règle|to obey a rule|Education
517|obéir à (qqn)|to obey (sone)|Education
518|avoir des difficultés en maths|to have difficulty with maths|Education
519|donner un coup de main à (qqn)|to give (sone) a hand|Education
520|obtenir un diplôme|to graduate|Education
521|une salle de classe|a classroom|Education
522|une leçon|a class|Education
523|rattraper un cours loupé|to catch up a missed lesson|Education
524|évaluer|to assess, appraise|Education
525|le programme scolaire|the school curriculum|Education
526|étudiant de premier cycle|undergraduate|Education
527|indiscipliné|unruly|Education
528|incontrôlable|unmanageable|Education
529|bâcler ses devoirs|to dash off one's work|Education
530|obtenir une bonne note|to get a good mark|Education
531|tricher sur son voisin|to eye over one's neighbour's work|Education
532|principal, directeur (école)|headmaster|Education
533|élève doué|gifted pupil|Education
534|réussir un examen haut la main|to pass a test with flying colors|Education
535|une matière (scolaire)|a (school) subject|Education
536|une pause de 20 minutes|a 20-minute break|Education
537|une heure de cours|a teaching-hour|Education
538|passer dans la classe supérieure|to pass the next grade|Education
539|travail de paperasse|paperwork|Education
540|passer un examen|to take an exam|Education
541|examen blanc|mock exam|Education
542|se préparer à un examen|to prepare for an exam|Education
543|échouer à un examen|to flunk a test|Education
544|recaler (qqn)|to flunk (sone)|Education
545|être reçu à un examen avec mention|to pass a degree with distinction|Education
546|abandonner l'école|to drop out of school|Education
547|un élève décrocheur|a dropout|Education
548|obtenir une bourse|to get a scholarship|Education
549|entrer en fac de médecine|to go to a medical school|Education
550|faire des études de médecine|to study medicine|Education
551|remettre un évènement à plus tard|to put off an event|Education
552|sortie scolaire|school trip|Education
553|faire des recherches sur (qqch)|to do research on (sthg)|Education
554|cour d'école|schoolyard|Education
555|un élève de terminale|[UK] a sixth-former|Education
556|méticuleux|painstaking|Education
557|sécher un cours|to skip a lesson|Education
558|se voir accorder la possibilité de [...]|to be provided with an opportunity to [...]|Education
559|tricher|to cheat|Education
560|un tricheur|a cheater|Education
561|être renvoyé|to be expelled|Education
562|rouler sur un examen|to sail through an exam|Education
563|sauce (tomate)|dressing|Thanksgiving
564|chuckle|laughter|Thanksgiving
565|to gather|to get together|Thanksgiving
566|a feast|a banquet|Thanksgiving
567|to reach accross|to make efforts to join|Thanksgiving
568|one another|each other|Thanksgiving
569|to winnow away|to filter out and remove|Thanksgiving
570|widely viewed as|largely regarded as|Thanksgiving
571|twice|two times|Thanksgiving
572|to provide|to give|Thanksgiving
573|the bulk of|the biggest part of|Thanksgiving
574|to depict|to describe|Thanksgiving
575|to feature|to represent, show|Thanksgiving
576|subservient|submissive, docile|Thanksgiving
577|pilgrims|migrants arriving in America from England in 17th|Thanksgiving
578|to outnumber|to surpass in number|Thanksgiving
579|to crouch|almost to sit on the floor|Thanksgiving
580|a harvest|a crop|Thanksgiving
581|likely|probably|Thanksgiving
582|a deed|an [bad] action|Thanksgiving
583|settlers|colons|Thanksgiving
584|in retaliation for|in revenge for|Thanksgiving
585|to broker|to organize, negotiate|Thanksgiving
586|to grab|to seize|Thanksgiving
587|gauzy|transparent|Thanksgiving
588|willfully|deliberately|Thanksgiving
589|How [s.one] would have it|What [s.one] would like to believe|Thanksgiving
590|druthers|inclination, penchant|Thanksgiving
591|blissfully|ecstatically|Thanksgiving
592|bleached out|washed out|Thanksgiving
593|to abid|to respect|Thanksgiving
594|altérer|alter|Thanksgiving
595|apprentissage en continu|lifelong learning|Thanksgiving
596|malaise|general feeling of discomfort|Business
597|stagflation|period of slow economic growth and high unemployment|Business
598|aftermath|the consequences of a significant unpleasant event|Business
599|hyperinflation|extremely high and accelerating inflation|Business
600|third-world countries|countries with lower economic development|Business
601|martial law|military control over civilian functions of government|Business
602|gleaming|shining brightly, describe something polished or new|Business
603|suburban area|residential area on the outskirts of the a city|Business
604|stagnation|lack of activity, growth, and development|Business
605|dispirited|having lost emthusiasm and hope|Business
606|fatalistic|believing that events are inevitable|Business
607|hollowed out|destroyed or weakened from within|Business
608|brimming|filled to the point of overflowing (with positive emotions and energy)|Business
609|rabais, ristourne|discount|Business
610|chaîne de montage|assembly line|Business
611|payer comptant|to pay cash|Business
612|pénurie de main d'oeuvre|labor shortage|Business
613|productivité|productivity|Business
614|soumettre sa candidature|to apply|Business
615|racheter|to buy out|Business
616|licencier|to lay off|Business
617|se mettre en grève|to go on strike|Business
618|service client|customer service|Business
619|représentant syndical|union representative|Business
620|commerćant|shopkeeper|Business
621|virer, mettre à la porte|to fire|Business
622|se mettre à son compte|to set up one's business|Business
623|démissionner|to resign|Business
624|en sureffectif|overstaffed|Business
625|contrat à durée indéterminée|permanent contract|Business
626|équipe de nuit|night shift|Business
627|service, département|department|Business
628|refondre, réorganiser|to revamp|Business
629|concurrent|competitor|Business
630|fusion|merger|Business
631|faire faillite|to go bankrupt, bust|Business
632|embaucher|to hire, take on|Business
633|fiche de paie|pay slip|Business
634|faire des heures supplémentaires|work overtime|Business
635|mettre la clé sous la porte|to go out of business, close up shop|Business
636|fait main|handmade|Business
637|artisan|craftsman|Business
638|ouvrier qualifié|skilled worker|Business
639|entreprise|business|Business
640|plein emploi|full employment|Business
641|un maire|a mayor|Politique
642|homme politique|politician|Politique
643|s'assurer une majorité|to secure a majority|Politique
644|déclencher des élections anticipées|to call an early election|Politique
645|(UK) les éléctions législatives|(UK) the general election|Politique
646|(US) les éléctions présidentielles|(US) the general election|Politique
647|les grands partis|mainstream parties|Politique
648|premier ministre|Prime Minister|Politique
649|le ministre de l'économie et des finances|(UK) the Chancellor of the Exchequer|Politique
650|remaniement ministériel|Cabinet reshuffle|Politique
651|ministre des Affaires étrangères|Foreign minister|Politique
652|pronncer un discours|to deliver a speech|Politique
653|une dictature|a dictatorship|Politique
654|museler, baîlloner|to gag, muzzle|Politique
655|société civile|civil society|Politique
656|(UK) syndicats|(UK) trade unions|Politique
657|(US) syndicats|(US) labor unions|Politique
658|élections de mi-mandat|mid-term elections|Politique
659|minisre "frondeur"|rebellious minister|Politique
660|démissionner|resign, step down|Politique
661|officier en tant que|to serve as|Politique
662|opposer son veto à (qqch)|to veto (sthg)|Politique
663|un projet de loi|a bill|Politique
664|un groupe de réflexion|a think-tank|Politique
665|(UK) un ministre|(UK) a Cabinet member|Politique
666|un directeur de cabinet|a chief of staff|Politique
667|impôts locaux|local taxes|Politique
668|cote de popularité|approval ratings|Politique
669|se présenter à une éléction|to run for election [office]|Politique
670|prêter serment|to take the oath, be sworn in|Politique
671|rendre homage à (qqn)|to pay tribute to (sone)|Politique
672|dirigeant|political leader|Politique
673|élection truquée|rigged election|Politique
674|les allocations|social benefits|Politique
675|revaloriser|to scale up, raise, increase|Politique
676|l'allocation familliale|the family allowance|Politique
677|le gel de la production|the production freeze|Politique
678|un bras de fer|a tug of war|Politique
679|chancelant|teetering, wavering|Politique
680|tailored|customized|Politique
681|rote memorisation|repetition-based learning|Politique
682|impoverished|cash-strapped|Politique
683|unencumbered|unburdened|Politique
684|inquisitiveness|interest, curiosity|Politique
685|substantially|notably, significatly|Politique
686|authoritarian|dictatorial, strict|Politique
687|minimally supervised|lightly monitored|Politique
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
`;

// On transforme le texte brut en un tableau d'objets utilisable
export const flashcardData = cardsRawText.trim().split('\n').map(l => {
  const [id, f, e, c] = l.split('|');
  return { id, french: f, english: e, chapter: c };
});
// Fichier : fsrs-helper.js

// La bibliothèque FSRS a été chargée par la balise <script> dans l'HTML.
// Elle est maintenant disponible globalement via l'objet `window.fsrs`.
const { FSRS, Rating } = window.fsrs;

// Paramètres FSRS par défaut, alignés sur votre recherche.
// La cible de rétention (request_retention) est le paramètre le plus important.
const fsrs_params = {
  request_retention: 0.9, // Cible une probabilité de rappel de 90%
  maximum_interval: 36500,
  w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
};

const scheduler = new FSRS(fsrs_params);

/**
 * Calcule la probabilité de rappel actuelle d'une carte (Retrievability).
 * @param {object} card - La carte avec les propriétés FSRS (stability, last_review).
 * @returns {number} - Une probabilité entre 0 et 1.
 */
export function getRetrievability(card) {
  if (!card || card.state !== 2 /* Review */ || !card.stability || !card.last_review) {
    return 1.0; // Les nouvelles cartes ou cartes en apprentissage ont une R de 1
  }
  const now = new Date();
  const lastReviewDate = new Date(card.last_review);
  const elapsedDays = (now.getTime() - lastReviewDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Formule de la courbe d'oubli de FSRS
  const retrievability = Math.pow(1 + elapsedDays / (9 * card.stability), -1);
  return retrievability;
}

/**
 * Planifie la prochaine révision d'une carte en utilisant FSRS.
 * @param {object} card - La carte à planifier.
 * @param {number} rating - L'évaluation de l'utilisateur (1:Again, 2:Hard, 3:Good, 4:Easy).
 * @returns {object} - La carte mise à jour avec les nouvelles valeurs FSRS.
 */
export function scheduleCard(card, rating) {
    const now = new Date();
    // FSRS attend un objet 'Card' spécifique. Nous le créons à la volée.
    const fsrsCard = {
        due: card.due ? new Date(card.due) : now,
        stability: card.stability || 0,
        difficulty: card.difficulty || 0,
        elapsed_days: card.elapsed_days || 0,
        scheduled_days: card.scheduled_days || 0,
        reps: card.reps || 0,
        lapses: card.lapses || 0,
        state: card.state || 0, // 0:New, 1:Learning, 2:Review, 3:Relearning
        last_review: card.last_review ? new Date(card.last_review) : null,
    };

    // La magie de FSRS opère ici
    const scheduling_result = scheduler.repeat(fsrsCard, now);
    
    // FSRS retourne les états possibles pour chaque évaluation.
    // Nous sélectionnons celui qui correspond à l'évaluation de l'utilisateur.
    const ratingMap = { 1: Rating.Again, 2: Rating.Hard, 3: Rating.Good, 4: Rating.Easy };
    const selected_rating = ratingMap[rating];
    const new_card_state = scheduling_result[selected_rating];

    // Mettre à jour notre objet carte avec les nouvelles valeurs
    card.due = new_card_state.card.due;
    card.stability = new_card_state.card.stability;
    card.difficulty = new_card_state.card.difficulty;
    card.elapsed_days = new_card_state.card.elapsed_days;
    card.scheduled_days = new_card_state.card.scheduled_days;
    card.reps = new_card_state.card.reps;
    card.lapses = new_card_state.card.lapses;
    card.state = new_card_state.card.state;
    card.last_review = new_card_state.card.last_review;

    return card;
}
