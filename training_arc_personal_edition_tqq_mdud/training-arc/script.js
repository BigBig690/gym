'use strict';

(() => {
  const STORAGE_KEY = 'trainingArcPersonalEdition.v1';
  const REST_SECONDS = 90;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const img = {
    barbell: 'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?auto=format&fit=crop&w=900&q=82',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=82',
    dumbbell: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=82',
    legs: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=82',
    weights: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=82'
  };
  const routines = {
    upperA: { name: 'Upper A', short: 'UPPER A', day: 'SEGUNDA', focus: 'FORÇA SUPERIOR', description: 'Peito, costas e ombros: firmeza na execução, uma repetição de cada vez.', photo: 'photo-upper', image: img.barbell, exercises: [
      ex('Supino reto com barra',4,'8–10','barbell','Peito', 'Apoie os pés e controle a descida.'),
      ex('Remada curvada com barra',4,'8–10','gym','Costas','Mantenha o tronco firme e evite embalo.'),
      ex('Puxada alta na polia',3,'10–12','dumbbell','Costas','Puxe com controle sem balançar o corpo.'),
      ex('Desenvolvimento sentado com halteres',3,'10–12','weights','Ombros','Use uma amplitude confortável.'),
      ex('Elevação lateral com halteres',4,'12–15','dumbbell','Ombros','Suba sem impulso e sem encolher os ombros.'),
      ex('Rosca direta com halteres',3,'10–12','weights','Bíceps','Mantenha os cotovelos próximos ao corpo.')
    ]},
    lowerA: { name: 'Lower A', short: 'LOWER A', day: 'TERÇA', focus: 'FORÇA INFERIOR', description: 'Pernas e estabilidade: técnica e controle valem mais do que pressa.', photo: 'photo-lower', image: img.legs, exercises: [
      ex('Agachamento com barra',4,'6–8','legs','Quadríceps','Use amplitude e carga compatíveis com sua técnica.'),
      ex('Terra romeno com halteres',3,'8–10','barbell','Posterior','Atenção à lombar e à posterior da coxa. Não faça com dor; procure orientação profissional.'),
      ex('Agachamento búlgaro',3,'10–12 por perna','legs','Unilateral','Faça ambos os lados com equilíbrio.'),
      ex('Mesa ou cadeira flexora',3,'12–15','dumbbell','Posterior','Controle a volta do movimento.'),
      ex('Panturrilha em pé',4,'15–20','weights','Panturrilhas','Pause brevemente no topo e alongue sem quicar.')
    ]},
    upperB: { name: 'Upper B', short: 'UPPER B', day: 'QUINTA', focus: 'VOLUME SUPERIOR', description: 'Um novo ângulo, o mesmo foco: consistência com repetições bem feitas.', photo: 'photo-dumbbell', image: img.dumbbell, exercises: [
      ex('Supino inclinado com halteres',4,'8–10','dumbbell','Peito','Ajuste o banco e mantenha os ombros estáveis.'),
      ex('Remada sentada na polia',4,'10–12','gym','Costas','Evite transformar a repetição em balanço.'),
      ex('Crucifixo com halteres',3,'12–15','dumbbell','Peito','Use amplitude confortável e controle total.'),
      ex('Crucifixo inverso com halteres',3,'12–15','weights','Deltoide posterior','Mantenha o pescoço relaxado.'),
      ex('Tríceps na polia com corda',4,'10–12','gym','Tríceps','Estenda os cotovelos sem balançar o tronco.'),
      ex('Rosca inclinada com halteres',3,'10–12','dumbbell','Bíceps','Desça com controle e sem dor no ombro.')
    ]},
    lowerB: { name: 'Lower B', short: 'LOWER B', day: 'SEXTA', focus: 'VOLUME INFERIOR', description: 'Construa sua base com execução estável e recuperação respeitada.', photo: 'photo-lower', image: img.legs, exercises: [
      ex('Agachamento goblet',3,'10–12','legs','Quadríceps','Segure o peso perto do peito e mantenha o tronco firme.'),
      ex('Hip thrust com barra',4,'8–10','barbell','Glúteos','Evite hiperestender a lombar no topo.'),
      ex('Avanço para trás',3,'10–12 por perna','legs','Unilateral','Passo controlado, com equilíbrio.'),
      ex('Mesa ou cadeira flexora',3,'10–15','dumbbell','Posterior','Controle a volta do movimento.'),
      ex('Panturrilha em pé',4,'15–20','weights','Panturrilhas','Faça as repetições sem impulso.'),
      ex('Prancha abdominal',3,'45s','gym','Core','Mantenha o corpo alinhado e respire.')
    ]}
  };
  function ex(name, sets, reps, photo, muscle, note) { return { id: slug(name), name, sets, reps, photo: img[photo] || img.gym, muscle, note, rest: REST_SECONDS }; }

  const characterArt = {
    Ichika: 'https://www.tbs.co.jp/anime/5hanayome/character/img/chara_img_01%402x.png',
    Nino: 'https://www.tbs.co.jp/anime/5hanayome/character/img/chara_img_02%402x.png',
    Miku: 'https://www.tbs.co.jp/anime/5hanayome/character/img/chara_img_03%402x.png',
    Yotsuba: 'https://www.tbs.co.jp/anime/5hanayome/character/img/chara_img_04%402x.png',
    Itsuki: 'https://www.tbs.co.jp/anime/5hanayome/character/img/chara_img_05%402x.png',
    Marin: 'https://bisquedoll-anime.com/1st/assets/img/character/chara_1.png'
  };
  const companions = [
    { id:'Miku', name:'Miku Nakano', short:'Miku', initials:'M', type:'Estratégia · TQQ', series:'THE QUINTESSENTIAL QUINTUPLETS', image:characterArt.Miku, quote:['“Sem pressa. Cada repetição bem feita conta.”','“Você treinou até aqui. Confie no processo.”','“Foco no próximo set — só nele.”'] },
    { id:'Yotsuba', name:'Yotsuba Nakano', short:'Yotsuba', initials:'Y', type:'Energia · TQQ', series:'THE QUINTESSENTIAL QUINTUPLETS', image:characterArt.Yotsuba, quote:['“Bora! Você consegue dar mais um passo!”','“Hoje é dia de fazer o seu melhor, sem se comparar!”','“Descansar também faz parte da vitória!”'] },
    { id:'Nino', name:'Nino Nakano', short:'Nino', initials:'N', type:'Determinação · TQQ', series:'THE QUINTESSENTIAL QUINTUPLETS', image:characterArt.Nino, quote:['“Postura, foco e atitude. Você sabe o que fazer.”','“Não precisa ser perfeito. Precisa ser consistente.”','“Mostra a sua evolução — no seu ritmo.”'] },
    { id:'Ichika', name:'Ichika Nakano', short:'Ichika', initials:'I', type:'Confiança · TQQ', series:'THE QUINTESSENTIAL QUINTUPLETS', image:characterArt.Ichika, quote:['“Relaxa os ombros, respira e manda bem.”','“Cada treino é mais uma cena da sua evolução.”','“Confia na jornada. O resultado vem com tempo.”'] },
    { id:'Itsuki', name:'Itsuki Nakano', short:'Itsuki', initials:'It', type:'Disciplina · TQQ', series:'THE QUINTESSENTIAL QUINTUPLETS', image:characterArt.Itsuki, quote:['“Planejamento, técnica e constância. Vamos!”','“Não ignore seus limites. Evoluir também é saber parar.”','“Uma rotina sustentável vale mais que exagerar hoje.”'] },
    { id:'Marin', name:'Marin Kitagawa', short:'Marin', initials:'Ma', type:'Motivação · MDUD', series:'MY DRESS-UP DARLING', image:characterArt.Marin, quote:['“Você consegue! Dá o seu melhor nesse set!”','“Isso aí! Curte a jornada e comemora cada avanço!”','“Seu progresso tem o seu estilo. Continua!”'] }
  ];
  const defaultState = () => ({ version:1, xp:0, history:[], companion:'Miku', activeSession:null, restDays:[], questRewards:[], unlocked:[], prefs:{}, lastActiveDate:null });
  let state = loadState();
  let selectedRoutine = 'upperA';
  let sessionTicker = null;
  let restTicker = null;
  let restRemaining = REST_SECONDS;
  let restInitially = REST_SECONDS;
  let restPaused = false;
  let pendingConfirm = null;
  let selectedCompanion = state.companion;

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.history)) return defaultState();
      return { ...defaultState(), ...parsed, prefs:{...defaultState().prefs,...parsed.prefs}, history:parsed.history, questRewards:Array.isArray(parsed.questRewards)?parsed.questRewards:[], restDays:Array.isArray(parsed.restDays)?parsed.restDays:[], unlocked:Array.isArray(parsed.unlocked)?parsed.unlocked:[] };
    } catch { return defaultState(); }
  }
  function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { toast('Não foi possível salvar. Exporte um backup e libere espaço no navegador.', 'warn'); } }
  function slug(text) { return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
  function safeNumber(v) { const n = Number.parseFloat(v); return Number.isFinite(n) && n > 0 ? n : 0; }
  function fmtDate(date, opts={day:'2-digit',month:'short'}) { return new Intl.DateTimeFormat('pt-BR',opts).format(new Date(date)); }
  function dateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
  function weekStart(date = new Date()) { const d = new Date(date); d.setHours(0,0,0,0); d.setDate(d.getDate() - ((d.getDay()+6)%7)); return d; }
  function weekKey(date = new Date()) { return dateKey(weekStart(date)); }
  function inThisWeek(iso) { return weekKey(new Date(iso)) === weekKey(new Date()); }
  function workoutCountThisWeek() { return state.history.filter(h => inThisWeek(h.completedAt)).length; }
  function currentLevel(xp = state.xp) { let level=1, floor=0, need=250; while (xp >= floor+need) { floor += need; level++; need = 250 + (level-1)*120; if (level>10000) break; } return {level, floor, need:250+(level-1)*120, into:xp-floor, remaining:Math.max(0,floor+(250+(level-1)*120)-xp)}; }
  function rankInfo(level) { if(level>=20)return {rank:'S',title:'Lenda',quote:'Seu nome já ecoa no sistema.'}; if(level>=15)return {rank:'A',title:'Hashira',quote:'Disciplina transformada em força.'}; if(level>=10)return {rank:'B',title:'Elite',quote:'Você está escrevendo um arco memorável.'}; if(level>=6)return {rank:'C',title:'Caçador',quote:'A consistência começa a aparecer.'}; if(level>=3)return {rank:'D',title:'Recruta',quote:'Você já não é a mesma pessoa do início.'}; return {rank:'E',title:'Novato',quote:'Sua jornada começa com a próxima repetição.'}; }
  function xpForLevel(level) { let total=0; for(let l=1;l<level;l++) total+=250+(l-1)*120; return total; }
  function findCompanion(id=state.companion) { return companions.find(c=>c.id===id) || companions[0]; }
  function getTodayRoutineKey() { return ({1:'upperA',2:'lowerA',4:'upperB',5:'lowerB'})[new Date().getDay()] || null; }
  function getScheduledWorkout() { const d = new Date().getDay(); if(d===0)return {rest:true,name:'Recuperação & planejamento',tag:'RECUPERAÇÃO',description:'Revise sua semana, organize o próximo capítulo e respeite o descanso.'}; if(d===3)return {rest:true,name:'Descanso ativo',tag:'RECOVERY DAY',description:'Mobilidade leve ou caminhada tranquila, se fizer sentido para você.'}; if(d===6)return {rest:true,name:'Dia de descanso',tag:'REST DAY',description:'Recuperar também é treinar. Não precisa compensar sessões perdidas.'}; const key=getTodayRoutineKey(); return {key,...routines[key],rest:false}; }
  function lastSessionFor(key) { return state.history.find(h=>h.routineKey===key); }
  function bestLoadsBefore(date, exerciseId) { let best=0; for(const h of state.history) { if(date && new Date(h.completedAt)>=new Date(date)) continue; const found=(h.exercises||[]).find(e=>e.id===exerciseId); for(const s of (found?.sets||[])) { const load=safeNumber(s.load); if(s.done && load>best)best=load; } } return best; }
  function totalVolume(historyItems) { let sum=0; for(const h of historyItems) for(const exercise of (h.exercises||[])) for(const s of (exercise.sets||[])) if(s.done) sum+=safeNumber(s.load)*safeNumber(s.reps); return Math.round(sum); }
  function totalDoneSets(ses) { return ses.exercises.reduce((sum,e)=>sum+e.sets.filter(s=>s.done).length,0); }
  function totalPlannedSets(ses) { return ses.exercises.reduce((sum,e)=>sum+e.sets.length,0); }
  function getQuestProgress() {
    const thisWeek = state.history.filter(h=>inThisWeek(h.completedAt));
    const allSets = thisWeek.flatMap(h=>(h.exercises||[]).flatMap(e=>(e.sets||[]).filter(s=>s.done)));
    const documented = allSets.filter(s=>s.load!=='' && s.reps!=='' && s.rir!=='' && s.rir!==null).length;
    const record = thisWeek.some(h=>(h.recordCount||0)>0);
    const restCount = [...new Set(state.restDays.filter(d=>weekKey(new Date(d+'T12:00:00'))===weekKey()))].length;
    return [
      {id:'warrior',icon:'🎯',title:'Guerreiro consistente',description:'Concluir 4 sessões planejadas nesta semana.',value:Math.min(thisWeek.length,4),target:4,xp:100,label:`${Math.min(thisWeek.length,4)} de 4 treinos`},
      {id:'logger',icon:'📝',title:'Registrador meticuloso',description:'Preencher carga, repetições e RIR em todas as séries concluídas nesta semana.',value:allSets.length?documented/allSets.length*100:0,target:100,xp:70,label:`${documented} de ${allSets.length} séries registradas`,percentMode:true},
      {id:'recovery',icon:'🛡️',title:'Mestre da recuperação',description:'Marcar pelo menos 2 dias reais de recuperação. Ouça seu corpo.',value:restCount,target:2,xp:60,label:`${Math.min(restCount,2)} de 2 dias`,action:true},
      {id:'overcome',icon:'⚡',title:'Superação consciente',description:'Registrar uma nova carga máxima em um exercício, sem sacrificar a técnica.',value:record?1:0,target:1,xp:90,label:record?'Recorde registrado':'Nenhum novo recorde ainda'}
    ].map(q=>({...q,percent:Math.max(0,Math.min(100,q.percentMode?q.value:(q.value/q.target*100))),complete:q.percentMode?q.value>=100:q.value>=q.target}));
  }
  function checkQuestRewards() { const key=weekKey(); let earned=0; getQuestProgress().forEach(q=>{const rewardKey=`${key}:${q.id}`; if(q.complete&&!state.questRewards.includes(rewardKey)){state.questRewards.push(rewardKey);state.xp+=q.xp;earned+=q.xp;}}); if(earned){saveState();toast(`Missão concluída! +${earned} XP de recompensa.`, 'good');} }
  function getStreakWeeks() { const weeks = new Set(state.history.map(h=>weekKey(new Date(h.completedAt)))); if(!weeks.size)return 0; let cursor=weekStart(); if(!weeks.has(dateKey(cursor))){const previous=new Date(cursor);previous.setDate(previous.getDate()-7);if(!weeks.has(dateKey(previous)))return 0;cursor=previous;} let n=0; while(weeks.has(dateKey(cursor))){n++;cursor.setDate(cursor.getDate()-7);} return n; }
  function renderDate() { const d=new Date(); $('#currentDate').textContent=new Intl.DateTimeFormat('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(d).replace(/^./,s=>s.toUpperCase()); }
  function renderLevel() {
    const lv=currentLevel(); const rank=rankInfo(lv.level); const pct=Math.max(0,Math.min(100,lv.into/lv.need*100));
    $('#rankLabel').textContent=`RANK ${rank.rank} · ${rank.title.toUpperCase()}`; $('#rankQuote').textContent=rank.quote;
    $('#xpTotal').textContent=state.xp.toLocaleString('pt-BR'); $('#xpNextLabel').textContent=`${lv.into.toLocaleString('pt-BR')} / ${lv.need.toLocaleString('pt-BR')} XP`;
    $('#mainXpBar').style.width=`${pct}%`; $('#levelLabel').textContent=`NÍVEL ${lv.level}`; $('#levelNumber').textContent=String(lv.level).padStart(2,'0'); $('#nextLevelHint').textContent=`Próximo nível: ${(xpForLevel(lv.level+1)).toLocaleString('pt-BR')} XP`;
    $('#sidebarRank').textContent=rank.title.toUpperCase(); $('#sidebarXpBar').style.width=`${pct}%`; $('#sidebarXpText').textContent=`${lv.into.toLocaleString('pt-BR')} / ${lv.need.toLocaleString('pt-BR')} XP`;
    $('#questXpTotal').textContent=state.xp.toLocaleString('pt-BR'); $('#questLevelTitle').textContent=`${rank.title} · Nível ${lv.level}`; $('#questLevelText').textContent=`Faltam ${lv.remaining.toLocaleString('pt-BR')} XP para alcançar o nível ${lv.level+1}.`; $('#questLevelProgress').textContent=`${Math.round(pct)}%`; $('#questLevelBar').style.width=`${pct}%`;
  }
  function characterImageHTML(c, alt, extraClass='') {
    return `<img class="${extraClass}" src="${escapeAttr(c.image)}" alt="${escapeAttr(alt)}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')">`;
  }
  function renderCompanion() {
    const c=findCompanion();
    $('#companionName').textContent=c.short;
    $('#companionOrb').innerHTML=`${characterImageHTML(c, c.name, 'companion-orb-image')}<span class="image-fallback-initials">${escapeHTML(c.initials)}</span>`;
    $('#quoteOrb').innerHTML=`${characterImageHTML(c, c.name, 'quote-orb-image')}<span class="image-fallback-initials">${escapeHTML(c.initials)}</span>`;
    $('#quoteAttribution').textContent=`— ${c.name}`;
    $('#companionQuote').textContent=c.quote[(state.prefs.quoteIndex||0)%c.quote.length];
  }
  function renderDaily() {
    const plan=getScheduledWorkout(); const photo=$('#dailyPhoto'); photo.className=`daily-photo ${plan.photo||'photo-darkgym'}`; $('#dailyTag').textContent=plan.rest?plan.tag:plan.short; $('#dailyStatus').textContent=plan.rest?'RECUPERAÇÃO PROGRAMADA':'TREINO PROGRAMADO'; $('#dailyDuration').textContent=plan.rest?'RECUPERAÇÃO':`~${plan.key?.startsWith('lower')?'55':'50'} MIN`; $('#dailyWorkoutName').innerHTML=`${escapeHTML(plan.name)} <span class="muted-inline">/ ${plan.rest?'Recuperação':escapeHTML(plan.focus.toLowerCase())}</span>`; $('#dailyDescription').textContent=plan.description||plan.exercises?.[0]?.note||''; $('#dailyExerciseCount').textContent=plan.rest?'—':plan.exercises.length; $('#startToday').innerHTML=plan.rest?'<span>✧</span> VER TREINOS':'<span>⚡</span> INICIAR TREINO'; $('#startToday').dataset.routine=plan.key||selectedRoutine; $('#dailyStatus').previousElementSibling.className='tag-dot';
  }
  function renderWeek() {
    const date=new Date(); const mon=weekStart(date); const dnames=['SEG','TER','QUA','QUI','SEX','SÁB','DOM']; const sessions=state.history.filter(h=>inThisWeek(h.completedAt));
    $('#weekDays').innerHTML=dnames.map((n,i)=>{const day=new Date(mon);day.setDate(day.getDate()+i);const key=dateKey(day);const done=sessions.some(h=>dateKey(new Date(h.completedAt))===key);const isToday=key===dateKey();let label=['U','L','·','U','L','·','·'][i];return `<div class="week-day ${done?'done':''} ${isToday?'today':''}"><span class="day-name">${n}</span><span class="day-circle">${done?'✓':label}</span></div>`}).join('');
    const n=Math.min(sessions.length,4),pct=Math.round(n/4*100);$('#weekCount').textContent=`${n} / 4`;$('#weekCopy').textContent=n>=4?'Missão semanal concluída!':`Mais ${4-n} sessão${4-n===1?'':'ões'} para completar a meta.`;$('#weekPercent').textContent=`${pct}%`;$('#weekProgressBar').style.width=`${pct}%`;$('#questPreviewText').textContent=`${n} de 4 treinos`;$('#questPreviewPercent').textContent=`${pct}%`;$('#questPreviewBar').style.width=`${pct}%`;
  }
  function renderDashboardStats() { const thisWeek=state.history.filter(h=>inThisWeek(h.completedAt));$('#statWorkouts').textContent=state.history.length;$('#statVolume').textContent=totalVolume(thisWeek).toLocaleString('pt-BR');$('#statStreak').textContent=getStreakWeeks(); }
  function renderRoutines() { $('#routineTabs').querySelectorAll('[data-routine]').forEach(b=>b.classList.toggle('active',b.dataset.routine===selectedRoutine));const r=routines[selectedRoutine];$('#routineHeroImage').className=`routine-hero-image ${r.photo}`;$('#routineSubtitle').textContent=`${r.day} · ${r.focus}`;$('#routineName').textContent=r.name;$('#routineIntro').textContent=r.description;$('#routineExerciseCount').textContent=r.exercises.length; }
  function startSession(key) {
    if(!routines[key]) key='upperA'; selectedRoutine=key;
    if(state.activeSession && state.activeSession.routineKey!==key){toast('Você já tem uma sessão em andamento. Termine ou descarte antes de trocar.','warn');renderWorkout();return;}
    if(!state.activeSession){const last=lastSessionFor(key);const exercises=routines[key].exercises.map(e=>{const old=last?.exercises?.find(le=>le.id===e.id);return {...e,sets:Array.from({length:e.sets},(_,i)=>({load:old?.sets?.[i]?.load??'',reps:old?.sets?.[i]?.reps??'',rir:old?.sets?.[i]?.rir??'',done:false}))};});state.activeSession={routineKey:key,startedAt:Date.now(),exercises,notes:''};saveState();}
    navigate('workout');renderWorkout();toast('Sessão iniciada. Boa execução e bom treino!','good');
  }
  function renderWorkout() {
    renderRoutines();const ses=state.activeSession;const toolbar=$('#sessionToolbar'),finish=$('#finishWrap');
    if(ses){toolbar.hidden=false;finish.hidden=false;$('#routineTabs').hidden=true;$('#routineHero').hidden=true;$('#sessionNotes').value=ses.notes||'';renderExerciseCards();updateSessionTime();ensureSessionTicker();$('#startRoutine').disabled=true;}else{toolbar.hidden=true;finish.hidden=true;$('#routineTabs').hidden=false;$('#routineHero').hidden=false;$('#exerciseList').innerHTML='';stopSessionTicker();}
  }
  function renderExerciseCards() {
    const ses=state.activeSession;if(!ses)return;const r=routines[ses.routineKey];let html='';
    ses.exercises.forEach((e,ei)=>{
      const allDone=e.sets.every(s=>s.done);const prev=bestLoadsBefore(ses.startedAt,e.id);const currentBest=Math.max(0,...e.sets.filter(s=>s.done).map(s=>safeNumber(s.load)));const delta=currentBest>prev?`↗ +${trimZeros(currentBest-prev)} kg`:currentBest===prev&&currentBest>0?'= igual':'—';
      html+=`<article class="exercise-card" data-exercise="${escapeAttr(e.id)}"><div class="exercise-head"><div class="exercise-thumb"><img src="${escapeAttr(e.photo)}" alt="Foto ilustrativa de ${escapeAttr(e.name)}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('thumb-fallback')"><span>${String(ei+1).padStart(2,'0')}</span></div><div class="exercise-info"><h3>${escapeHTML(e.name)}</h3><div class="exercise-tags"><span class="exercise-tag">${escapeHTML(e.muscle)}</span><span class="exercise-tag">${e.sets.length} × ${escapeHTML(e.reps)}</span><span class="exercise-tag rest-tag">90s descanso</span></div></div><span class="exercise-delta">${delta}</span></div><div class="exercise-table-wrap"><table class="set-table"><thead><tr><th>SÉRIE</th><th>CARGA (KG)</th><th>REPS</th><th>RIR</th><th>OK</th></tr></thead><tbody>`;
      e.sets.forEach((s,si)=>{html+=`<tr class="${s.done?'set-done':''}" data-set-row="${si}"><td>${String(si+1).padStart(2,'0')}</td><td><input class="set-input" type="number" inputmode="decimal" min="0" step="0.5" data-field="load" data-ei="${ei}" data-si="${si}" value="${escapeAttr(s.load)}" aria-label="Carga em kg, série ${si+1} de ${e.name}" placeholder="—"></td><td><input class="set-input" type="number" inputmode="numeric" min="0" step="1" data-field="reps" data-ei="${ei}" data-si="${si}" value="${escapeAttr(s.reps)}" aria-label="Repetições, série ${si+1} de ${e.name}" placeholder="—"></td><td><input class="set-input" type="number" inputmode="numeric" min="0" max="4" step="1" data-field="rir" data-ei="${ei}" data-si="${si}" value="${escapeAttr(s.rir)}" aria-label="RIR de 0 a 4, série ${si+1} de ${e.name}" placeholder="—"></td><td><button class="set-check ${s.done?'checked':''}" data-toggle-set data-ei="${ei}" data-si="${si}" aria-pressed="${s.done}" aria-label="${s.done?'Desmarcar':'Concluir'} série ${si+1}">${s.done?'✓':'○'}</button></td></tr>`;});
      html+='</tbody></table></div>'+(e.note?`<p class="exercise-note">ⓘ ${escapeHTML(e.note)}</p>`:'')+'</article>';
    });$('#exerciseList').innerHTML=html;updateSessionProgress();
  }
  function updateSessionProgress(){const ses=state.activeSession;if(!ses)return;const done=ses.exercises.filter(e=>e.sets.every(s=>s.done)).length;const sets=totalDoneSets(ses);const potential=sets*18+80+(done===ses.exercises.length?50:0);$('#sessionProgress').textContent=`${done} / ${ses.exercises.length} exercícios · +${potential} XP previsto`;$('#startRoutine').disabled=false;}
  function updateSessionTime(){if(!state.activeSession)return;const elapsed=Math.max(0,Math.floor((Date.now()-state.activeSession.startedAt)/1000));$('#sessionTimer').textContent=`${String(Math.floor(elapsed/60)).padStart(2,'0')}:${String(elapsed%60).padStart(2,'0')}`;}
  function ensureSessionTicker(){if(sessionTicker)return;sessionTicker=setInterval(updateSessionTime,1000);}
  function stopSessionTicker(){if(sessionTicker)clearInterval(sessionTicker);sessionTicker=null;}
  function persistActive(){if(state.activeSession){state.activeSession.notes=$('#sessionNotes')?.value||state.activeSession.notes||'';saveState();}}
  function handleSetToggle(btn){const ses=state.activeSession;if(!ses)return;const ei=Number(btn.dataset.ei),si=Number(btn.dataset.si);const s=ses.exercises[ei]?.sets[si];if(!s)return;s.done=!s.done;if(s.done){startRest(REST_SECONDS);toast('Série registrada. Descanso iniciado: 1min30s.','good');}persistActive();renderExerciseCards();}
  function handleSetInput(input){const ses=state.activeSession;if(!ses)return;const ei=Number(input.dataset.ei),si=Number(input.dataset.si),field=input.dataset.field;const s=ses.exercises[ei]?.sets[si];if(!s)return;if(field==='rir'&&input.value!==''&&(Number(input.value)<0||Number(input.value)>4)){input.value=Math.max(0,Math.min(4,Number(input.value)||0));}s[field]=input.value;saveState();}
  function finishSession(){const ses=state.activeSession;if(!ses)return;const setsDone=totalDoneSets(ses);if(!setsDone){toast('Registre pelo menos uma série para finalizar a sessão.','warn');return;}const routine=routines[ses.routineKey];const previousMaxById={};ses.exercises.forEach(e=>previousMaxById[e.id]=bestLoadsBefore(ses.startedAt,e.id));let recordCount=0;const volume=ses.exercises.reduce((sum,e)=>sum+e.sets.filter(s=>s.done).reduce((v,s)=>v+safeNumber(s.load)*safeNumber(s.reps),0),0);const cleanExercises=ses.exercises.map(e=>{const best=Math.max(0,...e.sets.filter(s=>s.done).map(s=>safeNumber(s.load)));if(best>previousMaxById[e.id]&&best>0)recordCount++;return {id:e.id,name:e.name,muscle:e.muscle,repsPlan:e.reps,sets:e.sets.map(s=>({...s})),bestLoad:best};});const completedExercises=cleanExercises.filter(e=>e.sets.length&&e.sets.every(s=>s.done)).length;const full=completedExercises===cleanExercises.length;const base=setsDone*18+80+(full?50:0)+(recordCount*35);const historyItem={id:cryptoId(),routineKey:ses.routineKey,routineName:routine.name,startedAt:ses.startedAt,completedAt:new Date().toISOString(),durationSec:Math.max(0,Math.floor((Date.now()-ses.startedAt)/1000)),exercises:cleanExercises,notes:$('#sessionNotes').value||'',setsDone,plannedSets:totalPlannedSets(ses),volume:Math.round(volume),recordCount,xpEarned:base,full};state.history.unshift(historyItem);state.xp+=base;state.activeSession=null;state.lastActiveDate=dateKey();saveState();stopSessionTicker();stopRest();awardAchievements();checkQuestRewards();saveState();renderAll();$('#victoryTitle').textContent=full?'MISSÃO CONCLUÍDA!':'SESSÃO REGISTRADA!';$('#victoryCopy').textContent=full?'Você completou todos os exercícios planejados. A execução consistente é o verdadeiro power-up.':`Você registrou ${setsDone} série${setsDone===1?'':'s'} e deu mais um passo na jornada. Recuperação também faz parte.`;$('#victoryXp').textContent=`+${base} XP`;const c=findCompanion();$('#victoryRewards').textContent=`${c.short}: “${c.quote[Math.floor(Math.random()*c.quote.length)]}”${recordCount?` · ${recordCount} novo${recordCount>1?'s':''} recorde${recordCount>1?'s':''}!`:''}`;$('#victoryDialog').showModal();}
  function discardSession(){openConfirm('Descartar sessão?','O registro em andamento será apagado. Isso não altera seu histórico anterior.',()=>{state.activeSession=null;saveState();stopSessionTicker();stopRest();renderWorkout();toast('Sessão descartada. Seus treinos anteriores continuam salvos.');});}
  function startRest(sec=REST_SECONDS){stopRest();restRemaining=Math.max(1,Math.floor(sec));restInitially=restRemaining;restPaused=false;$('#restWidget').hidden=false;$('#restPause').textContent='Pausar';renderRestClock();restTicker=setInterval(()=>{if(restPaused)return;restRemaining=Math.max(0,restRemaining-1);renderRestClock();if(restRemaining<=0){stopRestTicker();$('#restClock').textContent='00:00';$('#restPause').textContent='Pronto!';beep();toast('Descanso concluído. Quando estiver pronto, siga para a próxima série.','good');}},1000);}
  function renderRestClock(){const m=Math.floor(restRemaining/60),s=restRemaining%60;$('#restClock').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;$('#restProgress').style.width=`${Math.max(0,restRemaining/restInitially*100)}%`;}
  function stopRestTicker(){if(restTicker)clearInterval(restTicker);restTicker=null;}
  function stopRest(){stopRestTicker();$('#restWidget').hidden=true;restRemaining=REST_SECONDS;restInitially=REST_SECONDS;restPaused=false;}
  function beep(){try{const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;const ctx=new Ctx(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=880;gain.gain.value=.075;osc.connect(gain);gain.connect(ctx.destination);osc.start();setTimeout(()=>{osc.stop();ctx.close();},220);}catch{/* som opcional: o aviso visual continua disponível */}}
  function renderQuests(){const quests=getQuestProgress();$('#questsGrid').innerHTML=quests.map(q=>`<article class="quest-card panel ${q.complete?'completed':''}"><div class="quest-card-top"><span class="quest-icon">${q.icon}</span><span class="quest-xp">+${q.xp} XP</span></div><h3>${escapeHTML(q.title)}</h3><p>${escapeHTML(q.description)}</p><div class="quest-status"><span>${escapeHTML(q.label)}</span><strong>${Math.round(q.percent)}%</strong></div><div class="progress-track"><span style="width:${q.percent}%"></span></div>${q.complete?'<div class="quest-complete-label">✓ QUEST CONCLUÍDA</div>':q.action?`<button class="subtle-button mark-rest" data-mark-rest style="margin-top:12px">＋ Marcar recuperação hoje</button>`:''}</article>`).join('');renderAchievements();}
  function awardAchievements(){const unlocked=new Set(state.unlocked);const a=[{id:'first',icon:'⚔',title:'Primeiro capítulo',desc:'Concluir seu primeiro treino',ok:state.history.length>=1,xp:40},{id:'five',icon:'🔥',title:'Ritmo de combate',desc:'Concluir 5 treinos',ok:state.history.length>=5,xp:70},{id:'ten',icon:'👑',title:'Dez capítulos',desc:'Concluir 10 treinos',ok:state.history.length>=10,xp:120},{id:'record',icon:'↗',title:'Quebra-limites',desc:'Registrar seu primeiro recorde',ok:state.history.some(h=>h.recordCount>0),xp:60},{id:'level5',icon:'✦',title:'Despertar',desc:'Alcançar o nível 5',ok:currentLevel().level>=5,xp:100},{id:'full',icon:'✓',title:'Execução completa',desc:'Concluir todos os exercícios de uma sessão',ok:state.history.some(h=>h.full),xp:60}];let earned=0;for(const item of a){if(item.ok&&!unlocked.has(item.id)){unlocked.add(item.id);state.xp+=item.xp;earned+=item.xp;}}state.unlocked=[...unlocked];if(earned){saveState();toast(`Nova conquista desbloqueada! +${earned} XP.`, 'good');} }
  function achievementList(){return [{id:'first',icon:'⚔',title:'Primeiro capítulo',desc:'Primeiro treino'},{id:'five',icon:'🔥',title:'Ritmo de combate',desc:'5 sessões'},{id:'ten',icon:'👑',title:'Dez capítulos',desc:'10 sessões'},{id:'record',icon:'↗',title:'Quebra-limites',desc:'Novo recorde'},{id:'level5',icon:'✦',title:'Despertar',desc:'Nível 5'},{id:'full',icon:'✓',title:'Execução completa',desc:'Treino completo'}];}
  function renderAchievements(){const unlocked=new Set(state.unlocked);$('#achievementsGrid').innerHTML=achievementList().map(a=>`<article class="achievement ${unlocked.has(a.id)?'unlocked':''}"><div class="achievement-icon">${a.icon}</div><strong>${escapeHTML(a.title)}</strong><span>${unlocked.has(a.id)?'DESBLOQUEADA':escapeHTML(a.desc)}</span></article>`).join('');}
  function renderHistory(){const history=state.history;$('#historyTotal').textContent=history.length;$('#historyVolume').textContent=totalVolume(history).toLocaleString('pt-BR');$('#historyXp').textContent=history.reduce((s,h)=>s+(h.xpEarned||0),0).toLocaleString('pt-BR');$('#historyCount').textContent=`${history.length} registro${history.length===1?'':'s'}`;if(!history.length){$('#historyList').innerHTML='<div class="history-empty">Nenhum treino salvo ainda. Seu primeiro registro aparecerá aqui depois da sessão.</div>';}else{$('#historyList').innerHTML=history.map(h=>{const d=new Date(h.completedAt);return `<details class="history-item"><summary class="history-summary"><span class="history-date-block"><strong>${String(d.getDate()).padStart(2,'0')}</strong><small>${new Intl.DateTimeFormat('pt-BR',{month:'short'}).format(d).replace('.','').toUpperCase()}</small></span><span class="history-summary-main"><strong>${escapeHTML(h.routineName)}</strong><span>${fmtDate(h.completedAt,{weekday:'short',hour:'2-digit',minute:'2-digit'})} · ${Math.floor((h.durationSec||0)/60)} min · ${h.setsDone||0} séries</span></span><span class="history-summary-values"><strong>${Math.round(h.volume||0).toLocaleString('pt-BR')} kg</strong><span>+${h.xpEarned||0} XP</span></span></summary><div class="history-detail"><p>${escapeHTML(h.notes||'Sem anotações nesta sessão.')}</p><ul>${(h.exercises||[]).map(e=>{const done=e.sets.filter(s=>s.done);return `<li>${escapeHTML(e.name)} — ${done.length}/${e.sets.length} séries ${done.length?`· ${done.map(s=>`${escapeHTML(String(s.load||'—'))}kg × ${escapeHTML(String(s.reps||'—'))} reps`).join(', ')}`:''}</li>`}).join('')}</ul></div></details>`}).join('');}drawChart();}
  function drawChart(){const canvas=$('#volumeChart'),ctx=canvas.getContext('2d'),wrap=canvas.parentElement;const rect=wrap.getBoundingClientRect(),dpr=window.devicePixelRatio||1;canvas.width=Math.max(1,rect.width*dpr);canvas.height=Math.max(1,rect.height*dpr);ctx.scale(dpr,dpr);ctx.clearRect(0,0,rect.width,rect.height);const data=[...state.history].slice(0,8).reverse();$('#chartEmpty').hidden=data.length>0;if(!data.length)return;const w=rect.width,h=rect.height,p={left:34,right:12,top:16,bottom:28},cw=w-p.left-p.right,ch=h-p.top-p.bottom;const vals=data.map(d=>d.volume||0),max=Math.max(1,...vals)*1.2;ctx.font='10px Inter, sans-serif';ctx.textBaseline='middle';for(let i=0;i<=4;i++){const y=p.top+ch*i/4;ctx.strokeStyle='rgba(148,163,184,.12)';ctx.beginPath();ctx.moveTo(p.left,y);ctx.lineTo(w-p.right,y);ctx.stroke();ctx.fillStyle='#77788e';ctx.textAlign='right';ctx.fillText(Math.round(max*(1-i/4)).toLocaleString('pt-BR'),p.left-7,y);}const points=[];data.forEach((d,i)=>{const x=p.left+(data.length===1?cw/2:cw*i/(data.length-1));const y=p.top+ch-(vals[i]/max)*ch;points.push([x,y]);});const grad=ctx.createLinearGradient(0,p.top,0,p.top+ch);grad.addColorStop(0,'rgba(217,70,239,.25)');grad.addColorStop(1,'rgba(139,92,246,0)');ctx.beginPath();ctx.moveTo(points[0][0],p.top+ch);points.forEach(([x,y])=>ctx.lineTo(x,y));ctx.lineTo(points[points.length-1][0],p.top+ch);ctx.closePath();ctx.fillStyle=grad;ctx.fill();ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle='#d946ef';ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.stroke();points.forEach(([x,y],i)=>{ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fillStyle='#f0abfc';ctx.fill();ctx.strokeStyle='#21152f';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#85869b';ctx.font='9px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(`#${i+1}`,x,h-11);});}
  function renderCompanionOptions(){
    ['settingsCompanions','modalCompanions'].forEach(id=>{
      const host=$(`#${id}`); if(!host)return;
      host.innerHTML=companions.map(c=>`<button class="companion-option ${c.id===selectedCompanion?'selected':''}" data-companion="${c.id}" type="button" aria-pressed="${c.id===selectedCompanion}"><span class="companion-avatar">${characterImageHTML(c, c.name, 'companion-option-image')}<span class="image-fallback-initials">${escapeHTML(c.initials)}</span></span><span class="companion-option-copy"><strong>${escapeHTML(c.short)}</strong><small>${escapeHTML(c.type)}</small></span></button>`).join('');
    });
    const gallery=$('#characterGallery');
    if(gallery) gallery.innerHTML=companions.map(c=>`<button class="character-gallery-card ${c.id===selectedCompanion?'selected':''}" data-companion="${c.id}" type="button" aria-pressed="${c.id===selectedCompanion}" aria-label="Selecionar ${escapeAttr(c.name)} como companheira em destaque"><span class="character-gallery-art">${characterImageHTML(c, c.name, 'character-gallery-image')}<span class="image-fallback-initials">${escapeHTML(c.initials)}</span><span class="character-series-tag">${c.id==='Marin'?'MDUD':'TQQ'}</span></span><span class="character-gallery-meta"><strong>${escapeHTML(c.short)}</strong><small>${c.id==='Marin'?'My Dress-Up Darling':'The Quintessential Quintuplets'}</small></span></button>`).join('');
  }
  function renderAll(){renderDate();renderLevel();renderCompanion();renderDaily();renderWeek();renderDashboardStats();renderWorkout();renderQuests();renderHistory();renderCompanionOptions();}
  function navigate(view){const ids=['dashboard','workout','quests','history','settings'];if(!ids.includes(view))view='dashboard';$$('.view').forEach(s=>s.classList.toggle('active',s.id===`view-${view}`));$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('#pageLabel').textContent=view.toUpperCase();if(view==='history')drawChart();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
  function toast(message,type=''){const n=document.createElement('div');n.className=`toast ${type}`;n.textContent=message;$('#toastRegion').appendChild(n);setTimeout(()=>{n.style.opacity='0';n.style.transform='translateY(4px)';setTimeout(()=>n.remove(),250);},3300);}
  function openConfirm(title,text,callback){$('#confirmTitle').textContent=title;$('#confirmText').textContent=text;pendingConfirm=callback;$('#confirmDialog').showModal();}
  function resetData(){openConfirm('Apagar todos os dados?','Seu histórico, XP, conquistas e sessões em andamento serão apagados deste navegador. Exporte um backup antes, se quiser guardar os dados.',()=>{openConfirm('Confirmação final','Esta é a última confirmação. Deseja realmente apagar todos os dados do Training Arc?',()=>{stopSessionTicker();stopRest();state=defaultState();saveState();selectedRoutine='upperA';renderAll();navigate('dashboard');toast('Dados locais resetados.');});});}
  function exportJSON(){const payload={app:'Training Arc — Personal Edition',version:1,exportedAt:new Date().toISOString(),data:state};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`training-arc-backup-${dateKey()}.json`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);toast('Backup JSON exportado.','good');}
  async function importJSON(file){try{if(!file) return;const raw=JSON.parse(await file.text());const incoming=raw.data||raw;if(!incoming||typeof incoming!=='object'||!Array.isArray(incoming.history)||!Number.isFinite(Number(incoming.xp??0)))throw new Error('Estrutura inválida');const ok=confirm('Importar este backup substituirá os dados atuais. Você exportou um backup do estado atual, se necessário?');if(!ok)return;state={...defaultState(),...incoming,history:incoming.history,questRewards:Array.isArray(incoming.questRewards)?incoming.questRewards:[],unlocked:Array.isArray(incoming.unlocked)?incoming.unlocked:[],restDays:Array.isArray(incoming.restDays)?incoming.restDays:[]};if(!companions.some(c=>c.id===state.companion))state.companion='Miku';if(state.activeSession&&!routines[state.activeSession.routineKey])state.activeSession=null;saveState();selectedRoutine=state.activeSession?.routineKey||'upperA';renderAll();navigate(state.activeSession?'workout':'dashboard');toast('Backup importado com sucesso.','good');}catch(err){toast('Não foi possível importar: arquivo JSON inválido ou incompatível.','warn');}finally{$('#importBackup').value='';}}
  function markRestDay(){const today=dateKey();if(state.restDays.includes(today)){toast('Hoje já está marcado como dia de recuperação.');return;}state.restDays.push(today);saveState();checkQuestRewards();renderAll();toast('Dia de recuperação registrado. Descanso também é progresso.','good');}
  function chooseCompanion(id){if(!companions.some(c=>c.id===id))return;selectedCompanion=id;state.companion=id;state.prefs.quoteIndex=0;saveState();renderCompanionOptions();renderCompanion();toast(`${findCompanion().short} está em destaque!`,'good');}
  function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function escapeAttr(value){return escapeHTML(value);}
  function trimZeros(n){return Number(n.toFixed(2)).toLocaleString('pt-BR');}
  function cryptoId(){try{return crypto.randomUUID();}catch{return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;}}

  document.addEventListener('click',event=>{
    const nav=event.target.closest('[data-view]');if(nav){navigate(nav.dataset.view);return;}
    const start=event.target.closest('#startToday');if(start){const key=start.dataset.routine;if(key&&routines[key])startSession(key);else{navigate('workout');selectedRoutine='upperA';renderWorkout();}return;}
    const tab=event.target.closest('[data-routine]');if(tab){if(state.activeSession){toast('Finalize ou descarte a sessão atual antes de trocar a rotina.','warn');return;}selectedRoutine=tab.dataset.routine;renderWorkout();return;}
    const startRoutine=event.target.closest('#startRoutine');if(startRoutine){startSession(selectedRoutine);return;}
    const setButton=event.target.closest('[data-toggle-set]');if(setButton){handleSetToggle(setButton);return;}
    const companion=event.target.closest('[data-companion]');if(companion){chooseCompanion(companion.dataset.companion);return;}
    if(event.target.closest('#openCompanions')){$('#companionDialog').showModal();return;}
    if(event.target.closest('#closeCompanionDialog')){$('#companionDialog').close();return;}
    if(event.target.closest('#quickSettings')){navigate('settings');return;}
    if(event.target.closest('#changeQuote')){const c=findCompanion();state.prefs.quoteIndex=((state.prefs.quoteIndex||0)+1)%c.quote.length;saveState();renderCompanion();return;}
    if(event.target.closest('#finishWorkout')){finishSession();return;}
    if(event.target.closest('#discardSession')){discardSession();return;}
    if(event.target.closest('#restPause')){if(restRemaining<=0)return;restPaused=!restPaused;$('#restPause').textContent=restPaused?'Continuar':'Pausar';return;}
    if(event.target.closest('#restAdd')){restRemaining+=30;restInitially=Math.max(restInitially,restRemaining);$('#restPause').textContent='Pausar';restPaused=false;if(!restTicker)startRest(restRemaining);renderRestClock();return;}
    if(event.target.closest('#restSkip')){stopRest();toast('Descanso encerrado manualmente.');return;}
    if(event.target.closest('#closeRest')){stopRest();return;}
    if(event.target.closest('#exportBackup')||event.target.closest('#exportHistory')){exportJSON();return;}
    if(event.target.closest('#resetData')){resetData();return;}
    if(event.target.closest('[data-mark-rest]')){markRestDay();return;}
    if(event.target.closest('#confirmProceed')){event.preventDefault();const cb=pendingConfirm;pendingConfirm=null;$('#confirmDialog').close();if(cb)cb();return;}
    if(event.target.closest('#closeVictory')){$('#victoryDialog').close();navigate('history');return;}
  });
  document.addEventListener('input',event=>{if(event.target.matches('[data-field]'))handleSetInput(event.target);if(event.target.matches('#sessionNotes')&&state.activeSession){state.activeSession.notes=event.target.value;saveState();}});
  document.addEventListener('change',event=>{if(event.target.matches('#importBackup'))importJSON(event.target.files?.[0]);});
  window.addEventListener('resize',()=>{if($('#view-history').classList.contains('active'))drawChart();});
  $('#confirmDialog').addEventListener('close',()=>{if($('#confirmDialog').returnValue!=='confirm')pendingConfirm=null;});
  $('#companionDialog').addEventListener('click',event=>{if(event.target===$('#companionDialog'))$('#companionDialog').close();});

  // Ensure the scheduled 90-second rest setting stays consistent for every exercise.
  Object.values(routines).forEach(r=>r.exercises.forEach(e=>e.rest=REST_SECONDS));
  selectedRoutine=state.activeSession?.routineKey||getTodayRoutineKey()||'upperA';
  renderAll();
  if(state.activeSession){navigate('workout');toast('Sua sessão em andamento foi restaurada.','good');}
})();
