/* ═══════════════════════════════════════════════════════════════════════════
   ANKLE RECOVERY COACH — v4 Premium
   All original functionality preserved + premium UX layer
   ═══════════════════════════════════════════════════════════════════════════ */

'use strict';

// ── Recovery Timeline ────────────────────────────────────────────────────────
const SURGERY_DATE = '2026-05-23';
const MILESTONES = [
  { date: '2026-05-23', label: 'Surgery',      title: 'ORIF surgery completed',             status: 'done'     },
  { date: '2026-06-03', label: 'Week 2',        title: 'First post-op follow-up',            status: 'done'     },
  { date: '2026-06-17', label: 'Week 4',        title: 'CAM boot — full weight-bearing starts', status: 'active' },
  { date: '2026-07-08', label: 'Week 7',        title: 'Follow-up X-ray & clearance check',  status: 'upcoming' },
  { date: 'Future',     label: 'Ahead',         title: 'Boot clearance',                     status: 'locked'   },
  { date: 'Future',     label: 'Ahead',         title: 'PT graduation',                      status: 'locked'   },
];

// ── Encouraging messages (rotate daily) ──────────────────────────────────────
const MESSAGES = [
  'You\'re healing exactly where you should be.',
  'Small steps today become strong steps later.',
  'Every exercise is a deposit in your recovery.',
  'Consistency is the most powerful healing tool.',
  'Your body is doing extraordinary work right now.',
  'Progress isn\'t always visible — but it\'s happening.',
  'Showing up today is the whole job. You\'re doing it.',
  'Recovery is not linear. Every day still counts.',
];

// ── Exercise Database ────────────────────────────────────────────────────────
const EXERCISES = [
  {
    id: 'ankle-pumps', name: 'Ankle Pumps',
    dose: '2 sets · 15 reps', phase: 'Safe while NWB', duration: '1–3 min',
    visual: 'https://img.youtube.com/vi/bsMrL_U7Hsk/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'bsMrL_U7Hsk',                                       type: 'exact'  },
      { label: 'PT Explanation',   id: 'Ankle pumps after surgery physical therapy',          type: 'search' },
      { label: 'Alternative Demo', id: 'ankle pump exercise after ORIF',                      type: 'search' },
    ],
    why:   ['Improves circulation while you are less mobile.', 'Helps reduce post-surgical swelling.', 'Keeps the ankle gently moving without any weight.'],
    steps: ['Lie down or sit with your leg fully supported.', 'Slowly point your toes away from you.', 'Gently pull your toes back toward your shin.', 'Keep the movement smooth and controlled.', 'Stop immediately if you feel sharp pain near the incision.'],
    avoid: ['Forcing range of motion past comfort', 'Fast or jerky movements', 'Sharp pulling near the hardware', 'Removing the boot unless your surgeon cleared it'],
  },
  {
    id: 'ankle-circles', name: 'Ankle Circles',
    dose: '10 each way · 3×/day', phase: 'Gentle ROM only', duration: '2–4 min',
    visual: 'https://img.youtube.com/vi/3wR2AonFZfQ/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'ankle circles physical therapy exercise',             type: 'search' },
      { label: 'PT Explanation',   id: 'ankle range of motion exercises after fracture',      type: 'search' },
      { label: 'Alternative Demo', id: 'ankle circles after ankle surgery',                   type: 'search' },
    ],
    why:   ['Supports gentle ankle mobility in all planes.', 'Prevents stiffness while the repair heals.', 'Controlled movement without loading the joint.'],
    steps: ['Keep your leg supported on a pillow or bed.', 'Slowly draw a small circle with your foot.', 'Move clockwise for the prescribed reps.', 'Repeat counterclockwise.', 'Make the circles smaller if you feel any tightness.'],
    avoid: ['Large aggressive circles', 'Twisting into pain', 'Letting the hip or knee compensate'],
  },
  {
    id: 'inversion-eversion', name: 'Inversion & Eversion',
    dose: '10 each way · 3×/day', phase: 'Gentle ROM only', duration: '2–4 min',
    visual: 'https://img.youtube.com/vi/2OOJ9AQ1AEg/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'ankle inversion eversion exercise physical therapy', type: 'search' },
      { label: 'PT Explanation',   id: 'ankle fracture rehab inversion eversion',            type: 'search' },
      { label: 'Alternative Demo', id: 'gentle ankle range of motion side to side',          type: 'search' },
    ],
    why:   ['Restores side-to-side ankle control.', 'Reduces stiffness around the repaired joint.', 'Prepares the ankle for later balance and walking work.'],
    steps: ['Keep your heel still and fully supported.', 'Move the sole of your foot gently inward.', 'Return to center slowly.', 'Move the sole gently outward.', 'Stay in a completely pain-free range.'],
    avoid: ['Rolling the whole leg', 'Forcing the ankle sideways', 'Pushing into hardware or incision pain'],
  },
  {
    id: 'quad-sets', name: 'Quad Sets',
    dose: '15 reps · hold 5s · 2×/day', phase: 'Boot / NWB friendly', duration: '2–3 min',
    visual: 'https://img.youtube.com/vi/St1GBQeaSsA/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'St1GBQeaSsA',                                       type: 'exact'  },
      { label: 'PT Explanation',   id: 'quad sets physical therapy exercise',                type: 'search' },
      { label: 'Alternative Demo', id: 'quadriceps setting exercise after surgery',          type: 'search' },
    ],
    why:   ['Prevents thigh muscle shutdown after surgery.', 'Supports safer, more controlled walking once cleared.', 'Keeps the knee and hip engaged while the ankle heals.'],
    steps: ['Lie with your leg straight and supported.', 'Tighten the front thigh muscle firmly.', 'Press the back of your knee gently downward.', 'Hold for 5 seconds breathing normally.', 'Relax fully before the next rep.'],
    avoid: ['Holding your breath', 'Lifting the heel aggressively', 'Pushing through cramping or pain'],
  },
  {
    id: 'straight-leg-raises', name: 'Straight Leg Raises',
    dose: '15 reps · hold 2s · 2×/day', phase: 'Boot / NWB friendly', duration: '3–5 min',
    visual: 'https://img.youtube.com/vi/JB2oyawG9KI/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'JB2oyawG9KI',                                       type: 'exact'  },
      { label: 'PT Explanation',   id: 'straight leg raises physical therapy',               type: 'search' },
      { label: 'Alternative Demo', id: 'SLR exercise after ankle surgery',                   type: 'search' },
    ],
    why:   ['Strengthens the hip flexors and quads together.', 'Maintains lower limb strength during non-weight-bearing.', 'Directly supports your return to walking.'],
    steps: ['Lie flat, bend your unaffected knee for back support.', 'Tighten the thigh of the affected leg.', 'Lift the straight leg to the height of the bent knee.', 'Hold 2 seconds at the top.', 'Lower slowly and fully relax before repeating.'],
    avoid: ['Letting the lower back arch off the surface', 'Fast uncontrolled drops', 'Skipping the quad tighten before lifting'],
  },
  {
    id: 'hip-abduction', name: 'Hip Abduction',
    dose: '15 reps each side · 2×/day', phase: 'Boot / NWB friendly', duration: '3–4 min',
    visual: 'https://img.youtube.com/vi/sTwMvLAiIWo/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'sTwMvLAiIWo',                                       type: 'exact'  },
      { label: 'PT Explanation',   id: 'hip abduction exercise lying down',                  type: 'search' },
      { label: 'Alternative Demo', id: 'side lying hip abduction physical therapy',          type: 'search' },
    ],
    why:   ['Keeps the glutes active and strong during recovery.', 'Prevents hip and gait dysfunction when walking resumes.', 'Low-risk exercise with high long-term payoff.'],
    steps: ['Lie on your side with your body in a straight line.', 'Keep the top foot flexed (toes toward shin).', 'Lift the top leg slowly to about 45 degrees.', 'Hold briefly at the top.', 'Lower slowly — control the descent.'],
    avoid: ['Rolling the hip forward to cheat the range', 'Letting the foot rotate outward', 'Quick bouncing movements'],
  },
  {
    id: 'clamshells', name: 'Clamshells',
    dose: '15 reps · 2×/day', phase: 'Boot / NWB friendly', duration: '2–3 min',
    visual: 'https://img.youtube.com/vi/sTwMvLAiIWo/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'clamshell exercise physical therapy glutes',         type: 'search' },
      { label: 'PT Explanation',   id: 'clamshell exercise hip rotator rehabilitation',      type: 'search' },
      { label: 'Alternative Demo', id: 'sTwMvLAiIWo',                                       type: 'exact'  },
    ],
    why:   ['Targets the hip external rotators often neglected in recovery.', 'Reduces the risk of compensatory gait patterns.', 'Protects the knee and ankle alignment when walking restarts.'],
    steps: ['Lie on your side with hips and knees bent at 45 degrees.', 'Keep your feet stacked together.', 'Rotate the top knee upward like a clamshell opening.', 'Stop before the hip rolls backward.', 'Return slowly and control the closing motion.'],
    avoid: ['Letting the pelvis roll backward', 'Rushing the movement', 'Lifting the feet off each other'],
  },
  {
    id: 'core-bracing', name: 'Core Bracing',
    dose: '10 holds × 10s · 2×/day', phase: 'Any position', duration: '2–3 min',
    visual: 'https://img.youtube.com/vi/OT9_mTYKkWc/hqdefault.jpg',
    videos: [
      { label: 'Quick Demo',       id: 'OT9_mTYKkWc',                                       type: 'exact'  },
      { label: 'PT Explanation',   id: 'core bracing exercise physical therapy',             type: 'search' },
      { label: 'Alternative Demo', id: 'transverse abdominis activation rehabilitation',     type: 'search' },
    ],
    why:   ['Stabilizes the spine and pelvis during limited mobility.', 'Directly prepares you for safe walking mechanics.', 'Prevents back pain that commonly develops during NWB recovery.'],
    steps: ['Lie on your back or sit supported.', 'Gently draw your navel in toward your spine.', 'Breathe normally — do not hold your breath.', 'Hold the brace for 10 seconds.', 'Fully release before the next rep.'],
    avoid: ['Holding your breath', 'Bracing so hard you are trembling', 'Skipping this — it matters more than it feels like it does'],
  },
];

// ── Storage ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'ankle-recovery-v4';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { activeTab: 'today', completions: {}, expanded: '', logs: [], photos: [], reminderText: '' };
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
}

let state = loadState();

// ── Date Helpers ─────────────────────────────────────────────────────────────
function todayKey() { return new Date().toISOString().slice(0, 10); }

function daysBetween(a, b) {
  const ms = new Date(b) - new Date(a);
  return Math.round(ms / 86400000);
}

function currentRecoveryWeek() {
  const days = daysBetween(SURGERY_DATE, todayKey());
  return Math.max(1, Math.ceil((days + 1) / 7));
}

const daysSinceSurgery = daysBetween(SURGERY_DATE, todayKey());
const currentWeek      = currentRecoveryWeek();
const isBootPhase      = todayKey() >= '2026-06-17';

const PHASE_MAP = {
  1:  'Post-surgical protection',
  2:  'Swelling control · ROM begins',
  3:  'Gentle mobility · NWB exercises',
  4:  'CAM boot · Full weight-bearing',
  5:  'Progressive weight-bearing',
  6:  'Gait normalisation',
  7:  'Strength & balance phase',
  8:  'Functional progression',
};

const phaseText = PHASE_MAP[currentWeek] || `Week ${currentWeek} recovery`;

// ── Today message (deterministic rotation) ───────────────────────────────────
function dailyMessage() {
  const idx = daysBetween(SURGERY_DATE, todayKey()) % MESSAGES.length;
  return MESSAGES[Math.max(0, idx)];
}

// ── Completion helpers ────────────────────────────────────────────────────────
function completedToday() {
  return Object.values(state.completions[todayKey()] || {}).filter(Boolean).length;
}

function dailyPercent() {
  return Math.round((completedToday() / EXERCISES.length) * 100);
}

// ── Streak ────────────────────────────────────────────────────────────────────
function streak() {
  let count = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const c = Object.values(state.completions[key] || {}).filter(Boolean).length;
    if (c > 0) count++;
    else if (i > 0) break;
  }
  return count;
}

// ── Next milestone ────────────────────────────────────────────────────────────
function nextMilestone() {
  return MILESTONES.find(m => m.status === 'upcoming') || MILESTONES[MILESTONES.length - 1];
}

// ── Actions ──────────────────────────────────────────────────────────────────
function toggleComplete(id) {
  const d = todayKey();
  state.completions[d] = state.completions[d] || {};
  state.completions[d][id] = !state.completions[d][id];
  save();
  render();
  if (dailyPercent() === 100) celebrate();
}

function setTab(tab) {
  state.activeTab = tab;
  save();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setExpanded(id) {
  state.expanded = state.expanded === id ? '' : id;
  save();
  render();
}

function openVideo(id, type) {
  const url = type === 'search'
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(id)}`
    : `https://www.youtube.com/watch?v=${id}`;
  window.open(url, '_blank');
}

function addLog(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  state.logs.unshift({
    date:     todayKey(),
    pain:     fd.get('pain'),
    swelling: fd.get('swelling'),
    energy:   fd.get('energy'),
    mood:     fd.get('mood'),
    notes:    fd.get('notes'),
  });
  save();
  render();
}

function addPhoto(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.photos.unshift({ date: todayKey(), week: currentWeek, src: reader.result });
    save();
    render();
  };
  reader.readAsDataURL(file);
}

function resetData() {
  if (confirm('Reset all recovery data on this device? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    render();
  }
}

function reminderCopy() {
  const text = [
    '🌅 MORNING — Ankle Recovery Check-In',
    'Time: 8:00 AM · Repeat: Daily',
    'Note: Rate your pain and swelling. Take supplements. Open the app and complete morning exercises.',
    '',
    '☀️ MIDDAY — Complete Ankle Exercises',
    'Time: 1:00 PM · Repeat: Daily',
    'Note: Open Ankle Recovery Coach. Work through today\'s checklist. Even partial completion counts.',
    '',
    '🌙 EVENING — Log Pain, Swelling & Notes',
    'Time: 6:30 PM · Repeat: Daily',
    'Note: Record pain (0–10), swelling (0–10), energy, mood, and any notes for your surgeon.',
    '',
    '⏰ MISSED TASK FOLLOW-UP',
    'Time: 30 min after a skipped session',
    'Note: Even one small exercise helps. Open the app — just do what feels safe today.',
    '',
    '🩻 SURGEON FOLLOW-UP + X-RAY',
    'Date: July 8, 2026',
    'Note: Bring your recovery log. Ask about boot weaning and PT clearance.',
  ].join('\n');

  state.reminderText = text;
  save();
  render();

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function celebrate() {
  document.body.classList.add('celebrate');
  setTimeout(() => document.body.classList.remove('celebrate'), 920);
}

// ── SVG Ring ─────────────────────────────────────────────────────────────────
function ring(p) {
  const r = 42, c = 2 * Math.PI * r, off = c - (p / 100) * c;
  return `
    <svg class="ring" viewBox="0 0 110 110" aria-label="${p}% complete">
      <circle class="ring-bg" cx="55" cy="55" r="42"></circle>
      <circle class="ring-fg" cx="55" cy="55" r="42"
        stroke-dasharray="${c.toFixed(2)}"
        stroke-dashoffset="${off.toFixed(2)}"></circle>
      <text x="55" y="59" text-anchor="middle">${p}%</text>
    </svg>`;
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function hero() {
  const nm = nextMilestone();
  const until = nm.date === 'Future'
    ? 'Unlocks later'
    : `${Math.max(0, daysBetween(todayKey(), nm.date))} days away`;

  const msg = dailyMessage();

  return `
<section class="hero-card">
  <div class="hero-top">
    <div>
      <p class="eyebrow">Ankle Recovery Coach</p>
      <h1>Week ${currentWeek}</h1>
      <p class="phase">${phaseText}</p>
    </div>
    ${ring(dailyPercent())}
  </div>

  <div class="hero-message">
    <strong>Today's thought</strong>
    ${msg}
  </div>

  <div class="focus-card">
    <strong>This week's focus</strong>
    <p>${isBootPhase
      ? 'Practice safe walking only inside the CAM boot. Keep swelling controlled. Protect the repair until your July 8 X-ray clearance.'
      : 'Protect the repair, reduce swelling, and maintain gentle range of motion. No weight-bearing outside the boot.'
    }</p>
  </div>

  <div class="stats-row">
    <div>
      <strong>${daysSinceSurgery}</strong>
      <span>Days post-op</span>
    </div>
    <div>
      <strong>${completedToday()}/${EXERCISES.length}</strong>
      <span>Done today</span>
    </div>
    <div>
      <strong>${streak()}</strong>
      <span>Day streak</span>
    </div>
  </div>

  <div class="milestone">
    <span>Next: ${nm.title}</span>
    <small>${until}</small>
  </div>
</section>`;
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────
function tabs() {
  const items = [
    ['today',    'Today',    '⌂'],
    ['journal',  'Journal',  '✎'],
    ['timeline', 'Timeline', '◷'],
    ['settings', 'Settings', '⚙'],
  ];
  return `
<nav class="tabbar">
  ${items.map(([id, label, icon]) => `
    <button class="${state.activeTab === id ? 'active' : ''}" onclick="setTab('${id}')">
      <span class="nav-icon">${icon}</span>
      <span>${label}</span>
    </button>`).join('')}
</nav>`;
}

// ── Exercise Card ─────────────────────────────────────────────────────────────
function exerciseCard(ex) {
  const done = !!state.completions[todayKey()]?.[ex.id];
  const open = state.expanded === ex.id;
  const thumb = ex.visual || (ex.videos?.[0]?.type === 'exact'
    ? `https://img.youtube.com/vi/${ex.videos[0].id}/hqdefault.jpg` : '');

  const videoButtons = (ex.videos || []).map(v => `
    <button class="video-ref" onclick="openVideo('${String(v.id).replace(/'/g, "\\'")}', '${v.type || 'exact'}')">
      <span>${v.label}</span>
      <small>${v.type === 'search' ? 'YouTube search' : 'Direct link'}</small>
    </button>`).join('');

  return `
<article class="exercise-card ${done ? 'done' : ''} ${open ? 'open' : ''}">
  <div class="exercise-summary" onclick="setExpanded('${ex.id}')">
    <button class="complete-circle"
      aria-label="Mark ${ex.name} complete"
      onclick="event.stopPropagation(); toggleComplete('${ex.id}')">
      ${done ? '✓' : ''}
    </button>
    <div class="exercise-title">
      <strong>${ex.name}</strong>
      <span>${ex.dose}</span>
      <div class="badges">
        <em>${ex.phase}</em>
        <em>${ex.duration}</em>
      </div>
    </div>
    <button class="expand-btn" aria-label="${open ? 'Collapse' : 'Expand'} ${ex.name}">
      ${open ? '−' : '+'}
    </button>
  </div>

  ${open ? `
  <div class="exercise-details">
    <div class="lesson-visual">
      ${thumb ? `<img src="${thumb}" alt="${ex.name} preview" loading="lazy">` : ''}
      <div class="visual-overlay">
        <span>Exercise guide</span>
        <strong>${ex.name}</strong>
      </div>
    </div>

    <div class="lesson-heading">
      <div>
        <p class="eyebrow">Mini lesson</p>
        <h3>${ex.name}</h3>
        <span>${ex.dose}</span>
      </div>
      <span class="lesson-badge">${ex.phase}</span>
    </div>

    <div class="lesson-block why">
      <h4>Why this matters</h4>
      <ul>${ex.why.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>

    <div class="lesson-block">
      <h4>Step-by-step</h4>
      <ol>${ex.steps.map(s => `<li>${s}</li>`).join('')}</ol>
    </div>

    <div class="lesson-block avoid">
      <h4>Common mistakes & safety</h4>
      <ul>${ex.avoid.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>

    <div class="video-options">
      <h4>Video references</h4>
      ${videoButtons}
    </div>

    <button class="complete-wide" onclick="toggleComplete('${ex.id}')">
      ${done ? 'Mark incomplete' : 'Complete Exercise'}
    </button>
  </div>` : ''}
</article>`;
}

// ── Today View ────────────────────────────────────────────────────────────────
function todayView() {
  const pct = dailyPercent();
  const doneCount = completedToday();
  const remaining = EXERCISES.length - doneCount;

  const encouragement = pct === 100
    ? `<div class="soft-alert" style="background:#edf6f1;border-color:rgba(79,143,109,0.24)">
        <strong style="color:#4f8f6d">All exercises complete</strong>
        <span style="color:#4a7060">Outstanding work today. Rest, ice, elevate, and repeat tomorrow.</span>
      </div>`
    : pct >= 50
    ? `<div class="soft-alert">
        <strong>Good progress — ${doneCount} of ${EXERCISES.length} done</strong>
        <span>${remaining} exercise${remaining !== 1 ? 's' : ''} remaining. You can finish this.</span>
      </div>`
    : `<div class="soft-alert">
        <strong>${isBootPhase ? 'Boot safety reminder' : 'Today\'s reminder'}</strong>
        <span>${isBootPhase
          ? 'Full weight-bearing is only inside the CAM boot. No barefoot walking yet.'
          : 'Stay non-weight-bearing unless your surgeon specifically cleared weight-bearing.'}</span>
      </div>`;

  return `
${hero()}
${encouragement}
<section class="exercise-panel">
  <div class="section-head">
    <h2>Today's Exercises</h2>
    <span class="badge">Tap to expand</span>
  </div>
  <div class="exercise-list">
    ${EXERCISES.map(exerciseCard).join('')}
  </div>
</section>
<button class="log-card" onclick="setTab('journal')">
  <span class="log-icon">✎</span>
  <span>Log Pain, Swelling & Notes</span>
  <small>Daily check-in · takes 60 seconds</small>
</button>`;
}

// ── Journal View ──────────────────────────────────────────────────────────────
function journalView() {
  const recentLogs = state.logs.slice(0, 7);

  return `
${hero()}
<section class="card">
  <h2>How are you feeling?</h2>
  <form class="journal-form" onsubmit="addLog(event)">
    <label>Pain
      <input name="pain" type="range" min="0" max="10" value="3">
      <span>0–10</span>
    </label>
    <label>Swelling
      <input name="swelling" type="range" min="0" max="10" value="3">
      <span>0–10</span>
    </label>
    <label>Energy
      <input name="energy" type="range" min="0" max="10" value="5">
      <span>0–10</span>
    </label>
    <label>Mood
      <select name="mood">
        <option>Steady</option>
        <option>Encouraged</option>
        <option>Tired</option>
        <option>Anxious</option>
        <option>Frustrated</option>
        <option>Strong</option>
      </select>
    </label>
    <textarea name="notes" placeholder="Notes — pain location, swelling changes, walking tolerance, questions for your surgeon…"></textarea>
    <button type="submit" class="primary">Save Today's Log</button>
  </form>
</section>

<section class="card">
  <div class="section-head">
    <h2>Recovery Photos</h2>
    <label class="upload-btn">Add Photo
      <input type="file" accept="image/*" onchange="addPhoto(event)">
    </label>
  </div>
  <div class="photo-grid">
    ${state.photos.length
      ? state.photos.map(p => `
        <figure>
          <img src="${p.src}" alt="Week ${p.week} recovery photo" loading="lazy">
          <figcaption>Week ${p.week} · ${p.date}</figcaption>
        </figure>`).join('')
      : '<p class="note-preview">Add a weekly photo to track swelling reduction and healing over time.</p>'
    }
  </div>
</section>

<section class="card">
  <h2>Recent Logs</h2>
  ${recentLogs.length
    ? recentLogs.map(l => `
      <div class="log-entry">
        <div>
          <strong>${l.date}</strong>
          <span>${l.mood}</span>
        </div>
        <div class="log-tags">
          <em>Pain ${l.pain}</em>
          <em>Swelling ${l.swelling}</em>
          <em>Energy ${l.energy}</em>
        </div>
        ${l.notes ? `<p>${l.notes}</p>` : ''}
      </div>`).join('')
    : '<p class="note-preview">No logs yet — your first entry will appear here.</p>'
  }
</section>`;
}

// ── Timeline View ─────────────────────────────────────────────────────────────
function timelineView() {
  const barDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const k = d.toISOString().slice(0, 10);
    const count = Object.values(state.completions[k] || {}).filter(Boolean).length;
    const pct = Math.round((count / EXERCISES.length) * 100);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1), pct };
  });

  return `
${hero()}
<section class="card">
  <h2>Recovery Timeline</h2>
  ${MILESTONES.map(m => `
    <div class="milestone-row ${m.status}">
      <span class="mini-check ${m.status === 'done' || m.status === 'active' ? 'on' : ''}">
        ${m.status === 'locked' ? '🔒' : m.status === 'upcoming' ? '⌛' : '✓'}
      </span>
      <div>
        <strong>${m.title}</strong>
        <p>${m.date === 'Future' ? 'Coming up' : m.date}</p>
      </div>
    </div>`).join('')}
</section>

<section class="card">
  <h2>Weekly Progress</h2>
  <div class="bar-chart">
    ${barDays.map(({ day, pct }) => `
      <div>
        <div class="bar-track">
          <span style="height:${Math.max(4, pct)}%"></span>
        </div>
        <small>${day}</small>
      </div>`).join('')}
  </div>
</section>

<section class="card">
  <h2>Pain & Swelling Trend</h2>
  ${state.logs.length
    ? `<div class="log-tags" style="margin-bottom:10px">
        <em>Avg pain: ${(state.logs.slice(0,7).reduce((s,l)=>s+Number(l.pain),0)/Math.min(7,state.logs.length)).toFixed(1)}</em>
        <em>Avg swelling: ${(state.logs.slice(0,7).reduce((s,l)=>s+Number(l.swelling),0)/Math.min(7,state.logs.length)).toFixed(1)}</em>
        <em>Last ${Math.min(7,state.logs.length)} entries</em>
      </div>
      <p style="font-size:13px;color:var(--ink-soft);line-height:1.45">Share these averages with your surgeon at your July 8 appointment.</p>`
    : '<p class="note-preview" style="grid-column:unset">Add journal entries to see your pain and swelling trend here.</p>'
  }
</section>`;
}

// ── Settings View ─────────────────────────────────────────────────────────────
function settingsView() {
  return `
${hero()}

<section class="card">
  <h2>Recovery Details</h2>
  <div class="settings-row"><span>Surgery date</span><strong>May 23, 2026</strong></div>
  <div class="settings-row"><span>First follow-up</span><strong>June 3, 2026</strong></div>
  <div class="settings-row"><span>CAM boot start</span><strong>June 17, 2026</strong></div>
  <div class="settings-row"><span>Weight-bearing</span><strong>FWBAT in boot only</strong></div>
  <div class="settings-row"><span>X-ray follow-up</span><strong>July 8, 2026</strong></div>
  <div class="settings-row"><span>Current week</span><strong>Week ${currentWeek}</strong></div>
  <div class="settings-row"><span>Days post-op</span><strong>${daysSinceSurgery} days</strong></div>
</section>

<section class="card">
  <h2>Reminder Setup</h2>
  <p class="settings-copy">Apple Reminders are more reliable than browser notifications on iPhone. Generate the full reminder text and paste it into Apple Reminders or Shortcuts.</p>
  <button class="primary" onclick="reminderCopy()">Generate Reminder Text</button>
  ${state.reminderText
    ? `<textarea class="copybox" readonly onclick="this.select()">${state.reminderText}</textarea>
       <p style="font-size:12px;color:var(--ink-soft);margin-top:8px;text-align:center">Tap the box to select all · copy into Apple Reminders</p>`
    : ''}
</section>

<section class="card">
  <h2>Install on iPhone</h2>
  <ol class="steps">
    <li>Open this page in <strong>Safari</strong> (not Chrome or Firefox).</li>
    <li>Tap the <strong>Share</strong> button at the bottom of the screen.</li>
    <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
    <li>Tap <strong>Add</strong> in the top right.</li>
    <li>Open the <strong>Ankle Recovery</strong> icon from your Home Screen — it opens full-screen like a native app.</li>
  </ol>
</section>

<section class="card">
  <h2>About</h2>
  <div class="settings-row"><span>App version</span><strong>v4 · Premium</strong></div>
  <div class="settings-row"><span>Storage</span><strong>Local · Private · No account needed</strong></div>
  <div class="settings-row"><span>Built for</span><strong>Bimalleolar ORIF recovery</strong></div>
</section>

<button class="danger-btn" onclick="resetData()">Reset Local Data</button>`;
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  const root = document.getElementById('root');
  let content = '';
  switch (state.activeTab) {
    case 'today':    content = todayView();    break;
    case 'journal':  content = journalView();  break;
    case 'timeline': content = timelineView(); break;
    case 'settings': content = settingsView(); break;
    default:         content = todayView();
  }
  root.innerHTML = `
    <div class="app-shell">
      ${tabs()}
      <main class="content">${content}</main>
    </div>`;
}

// ── Expose to inline handlers ─────────────────────────────────────────────────
Object.assign(window, {
  setTab,
  setExpanded,
  toggleComplete,
  openVideo,
  addLog,
  addPhoto,
  resetData,
  reminderCopy,
});

// ── Register service worker ───────────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────────
render();
