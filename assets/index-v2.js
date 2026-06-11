const SURGERY_DATE = '2026-05-23';
const MILESTONES = [
  { date: '2026-05-23', title: 'Surgery completed', status: 'done' },
  { date: '2026-06-03', title: 'First post-op follow-up', status: 'done' },
  { date: '2026-06-17', title: 'CAM boot + FWBAT in boot', status: 'active' },
  { date: '2026-07-08', title: 'Follow-up X-ray / clearance check', status: 'upcoming' },
  { date: 'Future', title: 'Boot clearance', status: 'locked' },
  { date: 'Future', title: 'PT graduation', status: 'locked' }
];

const EXERCISES = [
  {
    id: 'ankle-pumps', name: 'Ankle Pumps', dose: '2 sets • 15 reps', phase: 'Safe while NWB', duration: '1:26',
    videoId: 'bsMrL_U7Hsk', instructor: 'PT demo',
    why: ['Helps circulation', 'Reduces stiffness', 'Supports swelling control'],
    steps: ['Sit or lie with your leg supported.', 'Point your toes away slowly.', 'Pull your toes back toward your shin.', 'Stay smooth and gentle; do not force range.'],
    avoid: ['Sharp pain', 'Jerky motion', 'Forcing through tightness']
  },
  {
    id: 'toe-curls', name: 'Toe Curls', dose: '2 sets • 10 reps', phase: 'Safe while NWB', duration: '1:02',
    videoId: 't_nELwG863k', instructor: 'Mobility demo',
    why: ['Keeps foot muscles active', 'Improves circulation', 'Helps reduce swelling'],
    steps: ['Keep the foot relaxed inside or out of the boot only if cleared.', 'Curl toes down gently.', 'Spread toes back out.', 'Move slowly and stop if it pulls near the incision.'],
    avoid: ['Clawing aggressively', 'Holding your breath', 'Pain around hardware or incision']
  },
  {
    id: 'quad-sets', name: 'Quad Sets', dose: '2 sets • 10 holds', phase: 'Boot/NWB friendly', duration: '1:34',
    videoId: 'St1GBQeaSsA', instructor: 'Strength demo',
    why: ['Prevents leg weakness', 'Supports walking later', 'Keeps your knee strong'],
    steps: ['Lie with your leg straight and supported.', 'Tighten the front thigh muscle.', 'Hold for 5 seconds.', 'Relax fully before repeating.'],
    avoid: ['Lifting the heel hard', 'Holding past fatigue', 'Painful bracing']
  },
  {
    id: 'glute-sets', name: 'Glute Sets', dose: '2 sets • 10 holds', phase: 'Boot/NWB friendly', duration: '1:18',
    videoId: 'rsxKcJVTtUw', instructor: 'Strength demo',
    why: ['Keeps hips active', 'Supports gait mechanics', 'Protects against deconditioning'],
    steps: ['Lie or sit comfortably.', 'Squeeze both glutes gently.', 'Hold 5 seconds.', 'Relax fully.'],
    avoid: ['Arching your back', 'Holding your breath', 'Cramping through the hip']
  },
  {
    id: 'boot-walking', name: 'Boot Walking Practice', dose: '3–5 min • as tolerated', phase: 'Only in CAM boot', duration: '2:10',
    videoId: 'Zb8T9X5sY9A', instructor: 'Gait demo',
    why: ['Builds confidence in the boot', 'Re-trains even steps', 'Prepares for next clearance phase'],
    steps: ['Wear the CAM boot exactly as instructed.', 'Use walker/crutches if needed.', 'Step heel-to-toe inside the boot.', 'Stop if pain, swelling, or limping increases.'],
    avoid: ['Barefoot walking', 'Rushing', 'Pushing through sharp pain', 'Walking without the boot']
  }
];

const STORAGE_KEY = 'ankleRecoveryV2';
const todayKey = () => new Date().toISOString().slice(0, 10);
const parseDate = d => new Date(d + 'T12:00:00');
const daysBetween = (a, b) => Math.floor((parseDate(b) - parseDate(a)) / 86400000);
const daysSinceSurgery = Math.max(0, daysBetween(SURGERY_DATE, todayKey()));
const currentWeek = Math.max(1, Math.floor(daysSinceSurgery / 7) + 1);
const isBootPhase = todayKey() >= '2026-06-17';
const phaseText = isBootPhase ? 'CAM boot phase • Full weight-bearing in boot only' : 'Protection phase • Non-weightbearing';

const defaultState = {
  activeTab: 'today',
  expanded: 'ankle-pumps',
  completions: {},
  logs: [],
  photos: [],
  reminderText: '',
  settings: { surgeryDate: SURGERY_DATE, nextXray: '2026-07-08', bootDate: '2026-06-17' }
};
let state = loadState();
function loadState(){ try { return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return defaultState; } }
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function completedToday(){ const d=todayKey(); return Object.keys(state.completions[d] || {}).filter(k => state.completions[d][k]).length; }
function dailyPercent(){ return Math.round((completedToday()/EXERCISES.length)*100); }
function toggleComplete(id){ const d=todayKey(); state.completions[d] ||= {}; state.completions[d][id] = !state.completions[d][id]; save(); render(); if(dailyPercent()===100) celebrate(); }
function setTab(tab){ state.activeTab = tab; save(); render(); window.scrollTo({top:0,behavior:'smooth'}); }
function setExpanded(id){ state.expanded = state.expanded === id ? '' : id; save(); render(); }
function openVideo(id){ window.open(`https://www.youtube.com/watch?v=${id}`, '_blank'); }
function nextMilestone(){ return MILESTONES.find(m => m.status === 'upcoming') || MILESTONES[MILESTONES.length-1]; }
function streak(){ let count=0; for(let i=0;i<60;i++){ const d=new Date(); d.setDate(d.getDate()-i); const key=d.toISOString().slice(0,10); const c=Object.values(state.completions[key]||{}).filter(Boolean).length; if(c>0) count++; else if(i>0) break; } return count; }
function addLog(e){ e.preventDefault(); const fd=new FormData(e.target); state.logs.unshift({ date: todayKey(), pain: fd.get('pain'), swelling: fd.get('swelling'), energy: fd.get('energy'), mood: fd.get('mood'), notes: fd.get('notes') }); save(); render(); }
function addPhoto(e){ const file=e.target.files?.[0]; if(!file) return; const reader=new FileReader(); reader.onload=()=>{ state.photos.unshift({ date: todayKey(), week: currentWeek, src: reader.result }); save(); render(); }; reader.readAsDataURL(file); }
function resetData(){ if(confirm('Reset app data on this phone?')){ localStorage.removeItem(STORAGE_KEY); state=loadState(); render(); } }
function reminderCopy(){ const text = `Morning: Ankle Recovery Check-In\nNote: pain, swelling, meds, hydration, and today’s focus.\n\nMidday: Complete Ankle Exercises\nNote: open the Ankle Recovery app and finish today’s checklist.\n\nEvening: Log Pain, Swelling & Notes\nNote: record pain, swelling, sleep, mood, and any changes.\n\nMissed Task Follow-Up\nNote: even one small exercise counts — open the app and complete what feels safe.`; state.reminderText=text; save(); render(); navigator.clipboard?.writeText(text); }
function celebrate(){ document.body.classList.add('celebrate'); setTimeout(()=>document.body.classList.remove('celebrate'),900); }

function Icon({name}){ return `<span class="nav-symbol">${name}</span>`; }
function ring(p){ const r=42, c=2*Math.PI*r, off=c-(p/100)*c; return `<svg class="ring" viewBox="0 0 110 110" aria-label="${p}% complete"><circle class="ring-bg" cx="55" cy="55" r="42"></circle><circle class="ring-fg" cx="55" cy="55" r="42" stroke-dasharray="${c}" stroke-dashoffset="${off}"></circle><text x="55" y="59" text-anchor="middle">${p}%</text></svg>`; }

function hero(){ const nm=nextMilestone(); const until = nm.date === 'Future' ? 'Locked' : `${Math.max(0, daysBetween(todayKey(), nm.date))} days`; return `
<section class="hero-card">
  <div class="hero-top">
    <div><p class="eyebrow">Ankle Recovery Coach</p><h1>Week ${currentWeek}</h1><p class="phase">${phaseText}</p></div>
    ${ring(dailyPercent())}
  </div>
  <div class="focus-card"><strong>Today's Focus</strong><p>${isBootPhase ? 'Practice safe walking only in your CAM boot, keep swelling controlled, and protect your repair until the July 8 X-ray.' : 'Protect the repair, keep swelling down, and maintain gentle range of motion without weight-bearing.'}</p></div>
  <div class="stats-row"><div><strong>${daysSinceSurgery}</strong><span>days post-op</span></div><div><strong>${completedToday()}/${EXERCISES.length}</strong><span>done today</span></div><div><strong>${streak()}</strong><span>day streak</span></div></div>
  <div class="milestone"><span>Next: ${nm.title}</span><small>${until}</small></div>
</section>`; }

function tabs(){ const items=[['today','Today','⌂'],['journal','Journal','✎'],['timeline','Timeline','◷'],['settings','Settings','⚙']]; return `<nav class="tabbar">${items.map(([id,label,icon])=>`<button class="${state.activeTab===id?'active':''}" onclick="setTab('${id}')"><span class="nav-icon">${icon}</span><span>${label}</span></button>`).join('')}</nav>`; }
function exerciseCard(ex){ const done=!!state.completions[todayKey()]?.[ex.id]; const open=state.expanded===ex.id; const thumb=`https://img.youtube.com/vi/${ex.videoId}/hqdefault.jpg`; return `
<article class="exercise-card ${done?'done':''} ${open?'open':''}">
  <div class="exercise-summary" onclick="setExpanded('${ex.id}')">
    <button class="complete-circle" onclick="event.stopPropagation();toggleComplete('${ex.id}')">${done?'✓':''}</button>
    <div class="exercise-title"><strong>${ex.name}</strong><span>${ex.dose}</span><div class="badges"><em>${ex.phase}</em><em>${ex.duration}</em></div></div>
    <button class="expand-btn">${open?'−':'+'}</button>
  </div>
  ${open?`<div class="exercise-details">
    <div class="video-tile" onclick="openVideo('${ex.videoId}')"><img src="${thumb}" alt="${ex.name} video thumbnail"><div><strong>Watch Form</strong><span>${ex.instructor} • ${ex.duration}</span></div><button>▶</button></div>
    <div class="instruction-grid"><div><h3>How to do it</h3><ul>${ex.steps.map(s=>`<li>${s}</li>`).join('')}</ul></div><div><h3>Why it matters</h3><ul>${ex.why.map(s=>`<li>${s}</li>`).join('')}</ul></div><div><h3>Avoid</h3><ul>${ex.avoid.map(s=>`<li>${s}</li>`).join('')}</ul></div></div>
    <button class="primary-soft" onclick="toggleComplete('${ex.id}')">${done?'Mark incomplete':'Complete Exercise'}</button>
  </div>`:''}
</article>`; }
function today(){ return `${hero()}<section class="soft-alert"><strong>Boot safety reminder</strong><span>${isBootPhase?'Full weight-bearing is only inside the CAM boot unless your surgeon clears otherwise. No barefoot walking yet.':'Stay nonweightbearing unless your surgeon specifically cleared weight-bearing.'}</span></section><section class="exercise-panel"><div class="section-head"><h2>Today’s Exercises</h2><span class="badge">Tap to expand</span></div><div class="exercise-list">${EXERCISES.map(exerciseCard).join('')}</div></section><button class="log-card" onclick="setTab('journal')"><span class="log-icon">✎</span><span>Log Pain, Swelling & Notes</span><small>Quick daily check-in</small></button>`; }
function journal(){ return `${hero()}<section class="card"><h2>How are you feeling?</h2><form class="journal-form" onsubmit="addLog(event)"><label>Pain <input name="pain" type="range" min="0" max="10" value="3"><span>0–10</span></label><label>Swelling <input name="swelling" type="range" min="0" max="10" value="3"><span>0–10</span></label><label>Energy <input name="energy" type="range" min="0" max="10" value="5"><span>0–10</span></label><label>Mood <select name="mood"><option>Steady</option><option>Encouraged</option><option>Tired</option><option>Anxious</option><option>Frustrated</option></select></label><textarea name="notes" placeholder="Notes: pain location, swelling, walking tolerance, questions for surgeon..."></textarea><button class="primary">Save Today’s Log</button></form></section><section class="card"><div class="section-head"><h2>Photo Timeline</h2><label class="upload-btn">Add Photo<input type="file" accept="image/*" onchange="addPhoto(event)"></label></div><div class="photo-grid">${state.photos.length?state.photos.map(p=>`<figure><img src="${p.src}"/><figcaption>Week ${p.week} • ${p.date}</figcaption></figure>`).join(''):'<p class="note-preview">Add a weekly swelling/incision photo to see progress over time.</p>'}</div></section><section class="card"><h2>Recent Logs</h2>${state.logs.length?state.logs.slice(0,7).map(l=>`<div class="log-entry"><div><strong>${l.date}</strong><span>${l.mood}</span></div><div class="log-tags"><em>Pain ${l.pain}</em><em>Swelling ${l.swelling}</em><em>Energy ${l.energy}</em></div>${l.notes?`<p>${l.notes}</p>`:''}</div>`).join(''):'<p class="note-preview">No logs yet.</p>'}</section>`; }
function timeline(){ return `${hero()}<section class="card"><h2>Recovery Timeline</h2>${MILESTONES.map(m=>`<div class="milestone-row ${m.status}"><span class="mini-check ${m.status==='done'||m.status==='active'?'on':''}">${m.status==='locked'?'🔒':m.status==='upcoming'?'⌛':'✓'}</span><div><strong>${m.title}</strong><p>${m.date}</p></div></div>`).join('')}</section><section class="card"><h2>Weekly Progress</h2><div class="bar-chart">${[6,5,4,3,2,1,0].reverse().map(i=>{const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);const count=Object.values(state.completions[k]||{}).filter(Boolean).length;const pct=Math.round(count/EXERCISES.length*100);return `<div><div class="bar-track"><span style="height:${Math.max(4,pct)}%"></span></div><small>${d.toLocaleDateString('en-US',{weekday:'short'}).slice(0,1)}</small></div>`}).join('')}</div></section>`; }
function settings(){ return `${hero()}<section class="card"><h2>Reminder Setup</h2><p class="settings-copy">Use this to create Apple Reminders/Shortcuts. Web apps on iPhone can be inconsistent with alerts, so Apple Reminders are more reliable.</p><button class="primary" onclick="reminderCopy()">Generate Reminder Text</button>${state.reminderText?`<textarea class="copybox" readonly>${state.reminderText}</textarea>`:''}</section><section class="card"><h2>Recovery Details</h2><div class="settings-row"><span>Surgery Date</span><strong>May 23, 2026</strong></div><div class="settings-row"><span>CAM Boot</span><strong>June 17, 2026</strong></div><div class="settings-row"><span>Weight Bearing</span><strong>FWBAT in boot only</strong></div><div class="settings-row"><span>Next X-ray</span><strong>July 8, 2026</strong></div></section><section class="card"><h2>Install on iPhone</h2><ol class="steps"><li>Open this page in Safari.</li><li>Tap Share.</li><li>Tap Add to Home Screen.</li><li>Open from the new app icon.</li></ol></section><button class="danger-btn" onclick="resetData()">Reset Local Data</button>`; }
function render(){ const app=document.getElementById('root'); app.innerHTML = `<div class="app-shell">${tabs()}<main class="content">${state.activeTab==='today'?today():state.activeTab==='journal'?journal():state.activeTab==='timeline'?timeline():settings()}</main></div>`; }
Object.assign(window,{setTab,setExpanded,toggleComplete,openVideo,addLog,addPhoto,resetData,reminderCopy});
render();
