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
    id: 'ankle-pumps', name: 'Ankle Pumps', dose: '2 sets • 15 reps', phase: 'Safe while NWB', duration: '1–3 min',
    visual: 'https://img.youtube.com/vi/bsMrL_U7Hsk/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'bsMrL_U7Hsk', type: 'exact' },
      { label: 'Video 2: PT explanation', id: 'Ankle pumps after surgery physical therapy', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'ankle pump exercise after ORIF', type: 'search' }
    ],
    why: ['Improves circulation while you are less mobile.', 'Helps reduce stiffness and swelling.', 'Keeps the ankle gently moving without weight-bearing.'],
    steps: ['Lie down or sit with your leg supported.', 'Point your toes away from you slowly.', 'Pull your toes back toward your shin.', 'Keep the movement smooth and gentle.', 'Stop if you feel sharp pain or pulling around the incision.'],
    avoid: ['Forcing range of motion', 'Fast jerky movement', 'Sharp pain', 'Doing this without following boot/splint restrictions']
  },
  {
    id: 'ankle-circles', name: 'Ankle Circles', dose: '10 each way • 3x/day', phase: 'Gentle ROM only', duration: '2–4 min',
    visual: 'https://img.youtube.com/vi/3wR2AonFZfQ/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'ankle circles physical therapy exercise', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'ankle range of motion exercises after fracture', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'ankle circles after ankle surgery', type: 'search' }
    ],
    why: ['Supports gentle ankle mobility.', 'Helps prevent stiffness while healing.', 'Gives you controlled movement without loading the ankle.'],
    steps: ['Keep your leg supported.', 'Slowly draw a small circle with your foot.', 'Move clockwise for the prescribed reps.', 'Repeat counterclockwise.', 'Keep the circles small if you feel tightness.'],
    avoid: ['Large aggressive circles', 'Twisting into pain', 'Moving so hard the knee/hip compensates']
  },
  {
    id: 'inversion-eversion', name: 'Inversion & Eversion', dose: '10 each way • 3x/day', phase: 'Gentle ROM only', duration: '2–4 min',
    visual: 'https://img.youtube.com/vi/2OOJ9AQ1AEg/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'ankle inversion eversion exercise physical therapy', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'ankle fracture rehab inversion eversion', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'gentle ankle range of motion side to side', type: 'search' }
    ],
    why: ['Restores side-to-side ankle control.', 'Helps reduce stiffness around the joint.', 'Prepares the ankle for later balance and walking work.'],
    steps: ['Keep your heel still and supported.', 'Move the sole of your foot gently inward.', 'Return to center.', 'Move the sole gently outward.', 'Stay in a pain-free range.'],
    avoid: ['Rolling the whole leg', 'Forcing the ankle sideways', 'Pushing into hardware/incision pain']
  },
  {
    id: 'quad-sets', name: 'Quad Sets', dose: '15 reps • hold 5s • 2x/day', phase: 'Boot/NWB friendly', duration: '2–3 min',
    visual: 'https://img.youtube.com/vi/St1GBQeaSsA/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'St1GBQeaSsA', type: 'exact' },
      { label: 'Video 2: PT explanation', id: 'quad sets physical therapy exercise', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'quadriceps setting exercise after surgery', type: 'search' }
    ],
    why: ['Prevents thigh muscle shutdown after surgery.', 'Supports safer walking when you are cleared.', 'Keeps the knee and hip engaged while the ankle heals.'],
    steps: ['Lie with your leg straight and supported.', 'Tighten the front thigh muscle.', 'Press the back of your knee gently downward if comfortable.', 'Hold for 5 seconds.', 'Relax fully before repeating.'],
    avoid: ['Holding your breath', 'Lifting the heel aggressively', 'Cramping or pushing through pain']
  },
  {
    id: 'straight-leg-raises', name: 'Straight Leg Raises', dose: '15 reps • hold 2s • 2x/day', phase: 'Boot/NWB friendly', duration: '3–5 min',
    visual: 'https://img.youtube.com/vi/JB2oyawG9KI/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'straight leg raise physical therapy exercise', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'straight leg raises after ankle surgery', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'supine straight leg raise rehab', type: 'search' }
    ],
    why: ['Maintains hip and thigh strength.', 'Helps reduce deconditioning while nonweightbearing.', 'Supports transfers and future walking.'],
    steps: ['Lie on your back with the surgical leg straight.', 'Tighten your thigh first.', 'Lift the leg slowly a few inches while keeping the knee straight.', 'Hold briefly, then lower with control.', 'Keep the boot/splint supported as needed.'],
    avoid: ['Arching your back', 'Swinging the leg', 'Painful pulling at the ankle']
  },
  {
    id: 'hip-abduction', name: 'Hip Abduction', dose: '15 each side • 2x/day', phase: 'Boot/NWB friendly', duration: '3–5 min',
    visual: 'https://img.youtube.com/vi/3K3gOzfQJZA/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'side lying hip abduction physical therapy', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'hip abduction exercise after ankle surgery', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'bed exercises hip abduction rehab', type: 'search' }
    ],
    why: ['Keeps the outer hip strong.', 'Helps future walking and balance.', 'Reduces weakness from bed/chair recovery.'],
    steps: ['Lie on your side or back, depending on what is safest.', 'Keep your leg aligned and controlled.', 'Move the leg gently out to the side.', 'Pause briefly.', 'Return slowly.'],
    avoid: ['Rolling your hips backward', 'Swinging quickly', 'Letting the boot twist your ankle']
  },
  {
    id: 'clamshells', name: 'Clamshells', dose: '15 reps • 2x/day', phase: 'Hip strength', duration: '3–5 min',
    visual: 'https://img.youtube.com/vi/EG5_gXcfozw/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'clamshell exercise physical therapy', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'clamshell exercise glute med rehab', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'side lying clamshell exercise', type: 'search' }
    ],
    why: ['Strengthens hip stabilizers.', 'Helps prevent limping later.', 'Supports pelvis control when you return to walking.'],
    steps: ['Lie on your side with knees bent.', 'Keep feet together.', 'Open the top knee like a clamshell.', 'Keep your pelvis still.', 'Lower slowly.'],
    avoid: ['Rolling your hips open', 'Doing reps too fast', 'Painful twisting through the ankle']
  },
  {
    id: 'core-bracing', name: 'Core Bracing', dose: '10 holds • 10s • 2x/day', phase: 'Bed/chair friendly', duration: '2–4 min',
    visual: 'https://img.youtube.com/vi/PI9Kvk_HMO8/hqdefault.jpg',
    videos: [
      { label: 'Video 1: Quick demo', id: 'abdominal bracing physical therapy exercise', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'core bracing rehab exercise', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'transverse abdominis bracing exercise', type: 'search' }
    ],
    why: ['Improves trunk stability for transfers.', 'Supports walking with crutches/walker.', 'Keeps your body stronger while your ankle heals.'],
    steps: ['Lie or sit comfortably.', 'Gently tighten your lower belly as if bracing for a cough.', 'Keep breathing normally.', 'Hold for 10 seconds.', 'Relax fully.'],
    avoid: ['Holding your breath', 'Bearing down hard', 'Arching your lower back']
  },
  {
    id: 'elevation', name: 'Elevation', dose: 'Foot above heart • every 2h', phase: 'Swelling control', duration: '15–30 min',
    visual: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    videos: [
      { label: 'Video 1: Quick demo', id: 'how to elevate foot after ankle surgery swelling', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'ankle surgery swelling elevation physical therapy', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'reduce ankle swelling after fracture surgery elevation', type: 'search' }
    ],
    why: ['Reduces swelling pressure.', 'Can calm throbbing after activity.', 'Supports incision and soft tissue recovery.'],
    steps: ['Lie down or recline safely.', 'Stack pillows so the foot is above heart level if comfortable.', 'Keep the heel supported without pressure points.', 'Relax for 15–30 minutes.', 'Check toes for normal color and sensation.'],
    avoid: ['Putting pressure directly on the heel too long', 'Letting the foot hang down for long periods', 'Ignoring sudden calf pain or major swelling changes']
  },
  {
    id: 'ice', name: 'Ice 15–20 min', dose: 'After activity • as cleared', phase: 'Swelling/pain control', duration: '15–20 min',
    visual: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=80',
    videos: [
      { label: 'Video 1: Quick demo', id: 'how to ice ankle after surgery', type: 'search' },
      { label: 'Video 2: PT explanation', id: 'ankle fracture surgery swelling ice elevation', type: 'search' },
      { label: 'Video 3: Alternative demo', id: 'ice after ORIF ankle surgery physical therapy', type: 'search' }
    ],
    why: ['Can reduce pain and swelling after exercises.', 'Helps calm irritated tissue.', 'Supports recovery after walking practice in the boot.'],
    steps: ['Use a barrier between skin and ice.', 'Ice around the ankle area as allowed by your post-op instructions.', 'Keep it to 15–20 minutes.', 'Remove if skin feels numb, burning, or irritated.', 'Combine with elevation when possible.'],
    avoid: ['Ice directly on skin', 'Falling asleep with ice on', 'Getting incisions/dressings wet if not cleared']
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
function openVideo(id, type='exact'){ const url = type === 'search' ? `https://www.youtube.com/results?search_query=${encodeURIComponent(id)}` : `https://www.youtube.com/watch?v=${id}`; window.open(url, '_blank'); }
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
function exerciseCard(ex){
  const done=!!state.completions[todayKey()]?.[ex.id];
  const open=state.expanded===ex.id;
  const thumb=ex.visual || (ex.videos?.[0]?.type === 'exact' ? `https://img.youtube.com/vi/${ex.videos[0].id}/hqdefault.jpg` : '');
  const videoButtons=(ex.videos||[]).map(v=>`<button class="video-ref" onclick="openVideo('${String(v.id).replace(/'/g,"\\'")}', '${v.type||'exact'}')"><span>${v.label}</span><small>${v.type==='search'?'YouTube search backup':'Direct YouTube link'}</small></button>`).join('');
  return `
<article class="exercise-card ${done?'done':''} ${open?'open':''}">
  <div class="exercise-summary" onclick="setExpanded('${ex.id}')">
    <button class="complete-circle" aria-label="Mark ${ex.name} complete" onclick="event.stopPropagation();toggleComplete('${ex.id}')">${done?'✓':''}</button>
    <div class="exercise-title"><strong>${ex.name}</strong><span>${ex.dose}</span><div class="badges"><em>${ex.phase}</em><em>${ex.duration}</em></div></div>
    <button class="expand-btn" aria-label="${open?'Collapse':'Expand'} ${ex.name}">${open?'−':'+'}</button>
  </div>
  ${open?`<div class="exercise-details">
    <div class="lesson-visual">
      ${thumb?`<img src="${thumb}" alt="${ex.name} visual preview" loading="lazy">`:''}
      <div class="visual-overlay"><span>Mini lesson</span><strong>${ex.name}</strong></div>
    </div>
    <div class="lesson-heading">
      <div><p class="eyebrow">Exercise Guide</p><h3>${ex.name}</h3><span>${ex.dose}</span></div>
      <span class="lesson-badge">${ex.phase}</span>
    </div>
    <div class="lesson-block why"><h4>Why this matters</h4><ul>${ex.why.map(s=>`<li>${s}</li>`).join('')}</ul></div>
    <div class="lesson-block"><h4>Step-by-step directions</h4><ol>${ex.steps.map(s=>`<li>${s}</li>`).join('')}</ol></div>
    <div class="lesson-block avoid"><h4>Common mistakes / safety warnings</h4><ul>${ex.avoid.map(s=>`<li>${s}</li>`).join('')}</ul></div>
    <div class="video-options"><h4>Video references</h4>${videoButtons}</div>
    <button class="primary-soft complete-wide" onclick="toggleComplete('${ex.id}')">${done?'Mark incomplete':'Complete Exercise'}</button>
  </div>`:''}
</article>`;
}
function today(){ return `${hero()}<section class="soft-alert"><strong>Boot safety reminder</strong><span>${isBootPhase?'Full weight-bearing is only inside the CAM boot unless your surgeon clears otherwise. No barefoot walking yet.':'Stay nonweightbearing unless your surgeon specifically cleared weight-bearing.'}</span></section><section class="exercise-panel"><div class="section-head"><h2>Today’s Exercises</h2><span class="badge">Tap a card for directions</span></div><div class="exercise-list">${EXERCISES.map(exerciseCard).join('')}</div></section><button class="log-card" onclick="setTab('journal')"><span class="log-icon">✎</span><span>Log Pain, Swelling & Notes</span><small>Quick daily check-in</small></button>`; }
function journal(){ return `${hero()}<section class="card"><h2>How are you feeling?</h2><form class="journal-form" onsubmit="addLog(event)"><label>Pain <input name="pain" type="range" min="0" max="10" value="3"><span>0–10</span></label><label>Swelling <input name="swelling" type="range" min="0" max="10" value="3"><span>0–10</span></label><label>Energy <input name="energy" type="range" min="0" max="10" value="5"><span>0–10</span></label><label>Mood <select name="mood"><option>Steady</option><option>Encouraged</option><option>Tired</option><option>Anxious</option><option>Frustrated</option></select></label><textarea name="notes" placeholder="Notes: pain location, swelling, walking tolerance, questions for surgeon..."></textarea><button class="primary">Save Today’s Log</button></form></section><section class="card"><div class="section-head"><h2>Photo Timeline</h2><label class="upload-btn">Add Photo<input type="file" accept="image/*" onchange="addPhoto(event)"></label></div><div class="photo-grid">${state.photos.length?state.photos.map(p=>`<figure><img src="${p.src}"/><figcaption>Week ${p.week} • ${p.date}</figcaption></figure>`).join(''):'<p class="note-preview">Add a weekly swelling/incision photo to see progress over time.</p>'}</div></section><section class="card"><h2>Recent Logs</h2>${state.logs.length?state.logs.slice(0,7).map(l=>`<div class="log-entry"><div><strong>${l.date}</strong><span>${l.mood}</span></div><div class="log-tags"><em>Pain ${l.pain}</em><em>Swelling ${l.swelling}</em><em>Energy ${l.energy}</em></div>${l.notes?`<p>${l.notes}</p>`:''}</div>`).join(''):'<p class="note-preview">No logs yet.</p>'}</section>`; }
function timeline(){ return `${hero()}<section class="card"><h2>Recovery Timeline</h2>${MILESTONES.map(m=>`<div class="milestone-row ${m.status}"><span class="mini-check ${m.status==='done'||m.status==='active'?'on':''}">${m.status==='locked'?'🔒':m.status==='upcoming'?'⌛':'✓'}</span><div><strong>${m.title}</strong><p>${m.date}</p></div></div>`).join('')}</section><section class="card"><h2>Weekly Progress</h2><div class="bar-chart">${[6,5,4,3,2,1,0].reverse().map(i=>{const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().slice(0,10);const count=Object.values(state.completions[k]||{}).filter(Boolean).length;const pct=Math.round(count/EXERCISES.length*100);return `<div><div class="bar-track"><span style="height:${Math.max(4,pct)}%"></span></div><small>${d.toLocaleDateString('en-US',{weekday:'short'}).slice(0,1)}</small></div>`}).join('')}</div></section>`; }
function settings(){ return `${hero()}<section class="card"><h2>Reminder Setup</h2><p class="settings-copy">Use this to create Apple Reminders/Shortcuts. Web apps on iPhone can be inconsistent with alerts, so Apple Reminders are more reliable.</p><button class="primary" onclick="reminderCopy()">Generate Reminder Text</button>${state.reminderText?`<textarea class="copybox" readonly>${state.reminderText}</textarea>`:''}</section><section class="card"><h2>Recovery Details</h2><div class="settings-row"><span>Surgery Date</span><strong>May 23, 2026</strong></div><div class="settings-row"><span>CAM Boot</span><strong>June 17, 2026</strong></div><div class="settings-row"><span>Weight Bearing</span><strong>FWBAT in boot only</strong></div><div class="settings-row"><span>Next X-ray</span><strong>July 8, 2026</strong></div></section><section class="card"><h2>Install on iPhone</h2><ol class="steps"><li>Open this page in Safari.</li><li>Tap Share.</li><li>Tap Add to Home Screen.</li><li>Open from the new app icon.</li></ol></section><button class="danger-btn" onclick="resetData()">Reset Local Data</button>`; }
function render(){ const app=document.getElementById('root'); app.innerHTML = `<div class="app-shell">${tabs()}<main class="content">${state.activeTab==='today'?today():state.activeTab==='journal'?journal():state.activeTab==='timeline'?timeline():settings()}</main></div>`; }
Object.assign(window,{setTab,setExpanded,toggleComplete,openVideo,addLog,addPhoto,resetData,reminderCopy});
render();
