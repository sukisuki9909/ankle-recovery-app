declare global { interface Window { storage?: { get:(key:string)=>Promise<{value:string}|null>; set:(key:string,value:string)=>Promise<void> } } }
import { useState, useEffect, useCallback } from "react";

const VIDEOS = {
  "Ankle Pumps":                    { id: "-twMbBmHwso", title: "Ankle Pumps – AskDoctorJo" },
  "Ankle Circles":                  { id: "CO1XJeYeWVA", title: "Ankle Fracture Exercises Wk 2–6" },
  "Inversion & Eversion":           { id: "lf6kLq2kwDA", title: "Ankle Fracture Physio Exercises" },
  "Quad Sets":                      { id: "DdoRDhrFSNs", title: "Quad Sets – AskDoctorJo" },
  "Straight Leg Raises":            { id: "DdoRDhrFSNs", title: "Straight Leg Raises – AskDoctorJo" },
  "Hip Abduction":                  { id: "sTwMvLAiIWo", title: "Hip Abduction – AskDoctorJo" },
  "Clamshells":                     { id: "sTwMvLAiIWo", title: "Clamshells – AskDoctorJo" },
  "Core Bracing":                   { id: "OT9_mTYKkWc", title: "Core Bracing – AskDoctorJo" },
  "Elevation":                      { id: "YblD94ylJbg", title: "ORIF Ankle Recovery Tips" },
  "Ice 15–20 min":                  { id: "YblD94ylJbg", title: "ORIF Ankle Self-Care Tips" },
  "Seated Calf Raises":             { id: "6pgfly7HKUY", title: "Seated Calf Raises – AskDoctorJo" },
  "Weight Shifts":                  { id: "CO1XJeYeWVA", title: "Ankle Fracture Boot Exercises" },
  "Heel-Toe Walking":               { id: "t-tuGjg3xvk", title: "Ankle Fracture Recovery Wk 6" },
  "Alphabet Tracing":               { id: "lf6kLq2kwDA", title: "Ankle ROM Exercises" },
  "Heel Slides":                    { id: "-twMbBmHwso", title: "Ankle Mobility – AskDoctorJo" },
  "Resistance Band Dorsiflexion":   { id: "pOABRYJkFrY", title: "Ankle Theraband – All 4 Directions" },
  "Resistance Band Plantarflexion": { id: "pOABRYJkFrY", title: "Ankle Theraband – All 4 Directions" },
  "Resistance Band Inversion":      { id: "pOABRYJkFrY", title: "Ankle Theraband – All 4 Directions" },
  "Resistance Band Eversion":       { id: "pOABRYJkFrY", title: "Ankle Theraband – All 4 Directions" },
  "Bilateral Calf Raises":          { id: "6pgfly7HKUY", title: "Standing Calf Raises – AskDoctorJo" },
  "Calf Stretch":                   { id: "t-tuGjg3xvk", title: "Ankle Fracture Stretches" },
  "Double Leg Balance":             { id: "t-tuGjg3xvk", title: "Balance Exercises After Ankle Fx" },
  "Stationary Bike":                { id: "pnrOJ09Af44", title: "Ankle Fracture Wk 8–10 Cardio" },
};


const SURGERY_DATE = "2026-05-23";
const FIRST_FOLLOW_UP = "2026-06-03";
const CAM_BOOT_DATE = "2026-06-17";
const XRAY_FOLLOW_UP = "2026-07-08";

function daysBetween(fromIso, toDate = new Date()){
  const from = new Date(fromIso + "T00:00:00");
  const to = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
  return Math.floor((to.getTime() - from.getTime()) / 86400000);
}
function recoveryWeekFromDate(date = new Date()){
  const days = daysBetween(SURGERY_DATE, date);
  if(days < 28) return 3;
  if(days < 42) return 4;
  return 5;
}
function currentPhaseText(date = new Date()){
  const t = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const boot = new Date(CAM_BOOT_DATE + "T00:00:00").getTime();
  const xray = new Date(XRAY_FOLLOW_UP + "T00:00:00").getTime();
  if(t < boot) return "Non-weightbearing until June 17 unless your surgeon says otherwise.";
  if(t < xray) return "Full weight-bearing as tolerated inside the CAM boot only. No barefoot walking unless cleared.";
  return "After July 8, follow your surgeon/X-ray clearance for the next phase.";
}
function daysUntil(iso){
  return Math.max(0, daysBetween(new Date().toISOString().split('T')[0], new Date(iso + "T00:00:00")) * -1);
}

const WEEKS = {
  3: {
    label:"Week 3", sublabel:"Non-Weight-Bearing in Boot",
    color:"#E76F51", light:"#FDF0EC", border:"#F5C6A0",
    tag:"Protect · Reduce Swelling · Begin ROM",
    note:"Surgery May 23 · Full weight bearing starts June 17",
    sessions:[
      {id:"w3-1",name:"Ankle Pumps",        reps:"15 reps, every waking hour",  icon:"🦶",bootOff:false},
      {id:"w3-2",name:"Ankle Circles",       reps:"10 each direction, 3×/day",  icon:"🔄",bootOff:false},
      {id:"w3-3",name:"Inversion & Eversion",reps:"10 reps each way, 3×/day",   icon:"↔️",bootOff:false},
      {id:"w3-4",name:"Quad Sets",           reps:"15 reps, hold 5s, 2×/day",   icon:"💪",bootOff:false},
      {id:"w3-5",name:"Straight Leg Raises", reps:"15 reps, hold 2s, 2×/day",   icon:"⬆️",bootOff:false},
      {id:"w3-6",name:"Hip Abduction",       reps:"15 reps each side, 2×/day",  icon:"↗️",bootOff:false},
      {id:"w3-7",name:"Clamshells",          reps:"15 reps, 2×/day",             icon:"🦪",bootOff:false},
      {id:"w3-8",name:"Core Bracing",        reps:"10 holds × 10s, 2×/day",     icon:"🧱",bootOff:false},
      {id:"w3-9",name:"Elevation",           reps:"Foot above heart, every 2h",  icon:"🛌",bootOff:false},
      {id:"w3-10",name:"Ice 15–20 min",      reps:"After every session",          icon:"🧊",bootOff:false},
    ],
  },
  4: {
    label:"Week 4", sublabel:"Full Weight Bearing in Boot — June 17",
    color:"#2A9D8F", light:"#E8F5F3", border:"#A8D8D2",
    tag:"FWB in Boot · Heel-Toe Gait · Wean Crutches",
    note:"Cleared for full weight bearing June 17 · Boot ON for all walking · Surgeon follow-up July 8",
    sessions:[
      {id:"w4-1",name:"Ankle Pumps",       reps:"15 reps, 3×/day",            icon:"🦶",bootOff:false},
      {id:"w4-2",name:"Alphabet Tracing",  reps:"Full A–Z, 2×/day",           icon:"🔡",bootOff:true},
      {id:"w4-3",name:"Heel Slides",       reps:"15 reps, 2×/day",            icon:"⬅️",bootOff:true},
      {id:"w4-4",name:"Seated Calf Raises",reps:"3×15, 2×/day (in boot)",     icon:"👟",bootOff:false},
      {id:"w4-5",name:"Weight Shifts",     reps:"10 slow shifts, 3×/day",     icon:"⚖️",bootOff:false},
      {id:"w4-6",name:"Heel-Toe Walking",  reps:"10 min, 3×/day (in boot)",   icon:"🚶",bootOff:false},
      {id:"w4-7",name:"Quad Sets",         reps:"15 reps, hold 5s, 2×/day",   icon:"💪",bootOff:false},
      {id:"w4-8",name:"Hip Abduction",     reps:"15 reps each side, 2×/day",  icon:"↗️",bootOff:false},
      {id:"w4-9",name:"Clamshells",        reps:"15 reps, 2×/day",             icon:"🦪",bootOff:false},
      {id:"w4-10",name:"Ice 15–20 min",    reps:"After walking sessions",      icon:"🧊",bootOff:false},
    ],
  },
  5: {
    label:"Weeks 5–6", sublabel:"Progressive Strengthening",
    color:"#1B6E66", light:"#E0F0EE", border:"#8FCEC8",
    tag:"Resistance Bands · Balance · Formal PT",
    note:"Wean crutches · Normalize gait · Begin PT appointments",
    sessions:[
      {id:"w5-1",name:"Resistance Band Dorsiflexion",  reps:"3×15, 2×/day",         icon:"🎀",bootOff:true},
      {id:"w5-2",name:"Resistance Band Plantarflexion",reps:"3×15, 2×/day",         icon:"🎀",bootOff:true},
      {id:"w5-3",name:"Resistance Band Inversion",     reps:"3×15, 2×/day",         icon:"🎀",bootOff:true},
      {id:"w5-4",name:"Resistance Band Eversion",      reps:"3×15, 2×/day",         icon:"🎀",bootOff:true},
      {id:"w5-5",name:"Bilateral Calf Raises",         reps:"3×15 standing, 2×/day",icon:"🦵",bootOff:true},
      {id:"w5-6",name:"Calf Stretch",                  reps:"3×30s holds, 3×/day",  icon:"🧘",bootOff:true},
      {id:"w5-7",name:"Double Leg Balance",             reps:"5×30s, 2×/day",        icon:"⚖️",bootOff:true},
      {id:"w5-8",name:"Stationary Bike",               reps:"10–15 min daily",       icon:"🚲",bootOff:true},
      {id:"w5-9",name:"Heel-Toe Walking",              reps:"20 min, normal gait",   icon:"🚶",bootOff:true},
      {id:"w5-10",name:"Ice 15–20 min",                reps:"After exercise if swollen",icon:"🧊",bootOff:true},
    ],
  },
};

function todayKey(){return new Date().toISOString().split("T")[0];}
function fmtDay(iso){return new Date(iso+"T12:00:00").toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});}
function pct(done,total){return total===0?0:Math.round((done/total)*100);}
function painColor(v){return v<=3?"#2A9D8F":v<=6?"#E9C46A":"#E76F51";}

async function persist(key,value){
  try{
    if(window.storage) await window.storage.set(key,JSON.stringify(value));
    else localStorage.setItem(key,JSON.stringify(value));
  }catch{}
}
async function retrieve(key){
  try{
    if(window.storage){const r=await window.storage.get(key);return r?JSON.parse(r.value):null;}
    const v=localStorage.getItem(key);return v?JSON.parse(v):null;
  }catch{return null;}
}

function VideoCard({exerciseName,onClose}){
  const vid=VIDEOS[exerciseName];
  if(!vid)return null;
  const thumb=`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`;
  const url=`https://www.youtube.com/watch?v=${vid.id}`;
  return(
    <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(26,48,53,0.75)",
      backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}
      onClick={onClose}>
      <div style={{background:"#fff",borderRadius:20,overflow:"hidden",width:"100%",maxWidth:400,
        boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}} onClick={e=>e.stopPropagation()}>
        <div style={{position:"relative",cursor:"pointer"}} onClick={()=>window.open(url,"_blank")}>
          <img src={thumb} alt={vid.title} style={{width:"100%",display:"block"}}/>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",
            justifyContent:"center",background:"rgba(0,0,0,0.2)"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:"#FF0000",
              display:"flex",alignItems:"center",justifyContent:"center",
              boxShadow:"0 4px 20px rgba(0,0,0,0.5)"}}>
              <div style={{width:0,height:0,borderTop:"13px solid transparent",
                borderBottom:"13px solid transparent",borderLeft:"22px solid white",marginLeft:5}}/>
            </div>
          </div>
        </div>
        <div style={{padding:"14px 16px 18px"}}>
          <div style={{fontSize:16,fontWeight:800,color:"#264653",marginBottom:3}}>{exerciseName}</div>
          <div style={{fontSize:12,color:"#8FA5AF",marginBottom:14}}>{vid.title}</div>
          <div style={{display:"flex",gap:10}}>
            <a href={url} target="_blank" rel="noreferrer" style={{flex:1,padding:"12px 0",
              background:"#FF0000",color:"#fff",borderRadius:10,textAlign:"center",
              fontWeight:700,fontSize:14,textDecoration:"none",display:"block"}}>
              ▶ Open in YouTube
            </a>
            <button onClick={onClose} style={{padding:"12px 18px",background:"#F0F4F4",
              border:"none",borderRadius:10,fontWeight:700,fontSize:14,cursor:"pointer",color:"#264653"}}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ring({p,size=80,stroke=7,color="#2A9D8F"}){
  const r=(size-stroke)/2,circ=2*Math.PI*r,offset=circ-(circ*p/100);
  return(
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E8F5F3" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        style={{transition:"stroke-dashoffset 0.6s ease"}}/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="middle"
        style={{transform:`rotate(90deg)`,transformOrigin:`${size/2}px ${size/2}px`,
          fontSize:size*0.22,fontWeight:800,fill:"#264653",fontFamily:"system-ui"}}>{p}%</text>
    </svg>
  );
}

function Toast({msg,show}){
  return(
    <div style={{position:"fixed",bottom:90,left:"50%",
      transform:`translateX(-50%) translateY(${show?0:16}px)`,
      background:"#264653",color:"#fff",padding:"10px 20px",borderRadius:30,
      fontSize:13,fontWeight:600,opacity:show?1:0,transition:"all 0.3s",
      zIndex:999,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(0,0,0,0.25)",pointerEvents:"none"}}>{msg}</div>
  );
}

export default function App(){
  const [tab,setTab]=useState("today");
  const [week,setWeek]=useState(()=>recoveryWeekFromDate());
  const [log,setLog]=useState({});
  const [toast,setToast]=useState({msg:"",show:false});
  const [loaded,setLoaded]=useState(false);
  const [video,setVideo]=useState(null);
  const [modal,setModal]=useState(false);
  const [painIn,setPainIn]=useState(0);
  const [swellIn,setSwellIn]=useState(0);
  const [noteIn,setNoteIn]=useState("");

  useEffect(()=>{
    (async()=>{
      const l=await retrieve("rehab_log_v3");
      if(l)setLog(l);
      setWeek(recoveryWeekFromDate());
      setLoaded(true);
    })();
  },[]);

  useEffect(()=>{if(loaded)persist("rehab_log_v3",log);},[log,loaded]);
  useEffect(()=>{if(loaded)persist("rehab_week_v3",week);},[week,loaded]);

  const showToast=useCallback((msg)=>{
    setToast({msg,show:true});
    setTimeout(()=>setToast(t=>({...t,show:false})),2200);
  },[]);

  const weekDef=WEEKS[week]||WEEKS[3];
  const exercises=weekDef.sessions;
  const C=weekDef.color;
  const todayD=log[todayKey()]||{checked:{},pain:0,swelling:0,note:""};
  const checkedN=Object.values(todayD.checked).filter(Boolean).length;
  const todayPct=pct(checkedN,exercises.length);

  const last7=Array.from({length:7},(_,i)=>{
    const d=new Date();d.setDate(d.getDate()-(6-i));
    const key=d.toISOString().split("T")[0];
    const dl=log[key]||{checked:{}};
    const done=Object.values(dl.checked).filter(Boolean).length;
    return{key,day:d.toLocaleDateString("en-US",{weekday:"short"}).slice(0,2),
      pct:pct(done,exercises.length),pain:dl.pain||0};
  });
  const weekAvg=Math.round(last7.reduce((s,d)=>s+d.pct,0)/7);

  let streak=0;
  for(let i=0;i<30;i++){
    const d=new Date();d.setDate(d.getDate()-i);
    const key=d.toISOString().split("T")[0];
    if(key===todayKey()&&todayPct===0&&i===0)continue;
    const dl=log[key]||{checked:{}};
    const done=Object.values(dl.checked).filter(Boolean).length;
    if(pct(done,exercises.length)>=50)streak++;
    else if(i>0)break;
  }

  let misses=0;
  for(let i=1;i<=7;i++){
    const d=new Date();d.setDate(d.getDate()-i);
    const key=d.toISOString().split("T")[0];
    const dl=log[key]||{checked:{}};
    const done=Object.values(dl.checked).filter(Boolean).length;
    if(pct(done,exercises.length)===0)misses++;
    else break;
  }

  function toggle(id){
    const today=todayKey();
    setLog(prev=>{
      const day=prev[today]||{checked:{},pain:0,swelling:0,note:""};
      const nc={...day.checked,[id]:!day.checked[id]};
      const done=Object.values(nc).filter(Boolean).length;
      if(!day.checked[id])showToast(done===exercises.length?"All done today! 🏆":"Checked ✓");
      return{...prev,[today]:{...day,checked:nc}};
    });
  }

  function saveModal(){
    const today=todayKey();
    setLog(prev=>{
      const day=prev[today]||{checked:{},pain:0,swelling:0,note:""};
      return{...prev,[today]:{...day,pain:painIn,swelling:swellIn,note:noteIn}};
    });
    setModal(false);
    showToast("Check-in saved 📋");
  }

  function openModal(){
    setPainIn(todayD.pain||0);
    setSwellIn(todayD.swelling||0);
    setNoteIn(todayD.note||"");
    setModal(true);
  }

  const TodayTab=()=>(
    <div>
      <div style={{background:`linear-gradient(135deg,${C} 0%,${C}BB 100%)`,borderRadius:20,
        padding:"18px 16px",marginBottom:14,color:"#fff",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:-20,top:-20,fontSize:100,opacity:0.08}}>🦶</div>
        <div style={{fontSize:12,opacity:0.8,marginBottom:2}}>
          {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}
        </div>
        <div style={{fontSize:15,fontWeight:800,marginBottom:2}}>{weekDef.label} — {weekDef.sublabel}</div>
        <div style={{fontSize:11,opacity:0.7,marginBottom:14}}>{weekDef.note}</div>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <Ring p={todayPct} size={70} color="#fff" stroke={6}/>
          <div style={{display:"flex",gap:18}}>
            {[{v:streak,l:"Streak"},{v:weekAvg+"%",l:"7-day"},{v:`${checkedN}/${exercises.length}`,l:"Today"}].map(s=>(
              <div key={s.l}>
                <div style={{fontSize:24,fontWeight:800,lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:10,opacity:0.75,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"#fff",border:`1.5px solid ${weekDef.border}`,borderRadius:12,padding:"11px 14px",marginBottom:12,fontSize:13,color:"#264653",fontWeight:600}}>
        🗓 {daysBetween(SURGERY_DATE)} days since surgery · {currentPhaseText()}
        <div style={{fontSize:11,color:"#8FA5AF",marginTop:4}}>Next milestone: July 8 follow-up X-ray / surgeon clearance check.</div>
      </div>

      {misses>=2&&<div style={{background:"#FDECEA",border:"1.5px solid #F5C6C2",borderRadius:12,
        padding:"11px 14px",marginBottom:12,fontSize:13,color:"#D62839",fontWeight:600}}>
        🚨 {misses} days missed in a row — let's get back on track today!
      </div>}
      {weekAvg>=90&&<div style={{background:"linear-gradient(135deg,#FFD700,#FF8C00)",borderRadius:12,
        padding:"11px 14px",marginBottom:12,textAlign:"center",color:"#fff",fontWeight:700}}>
        🏆 {weekAvg}% this week — outstanding recovery!
      </div>}

      <div style={{background:"#fff",borderRadius:16,marginBottom:14,overflow:"hidden",
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:`1px solid ${weekDef.border}`}}>
        <div style={{padding:"13px 16px 8px",fontSize:12,fontWeight:700,
          letterSpacing:"0.07em",textTransform:"uppercase",color:C}}>
          Tap ✓ to check off · Tap 🎬 to watch video
        </div>
        {exercises.map((ex,i)=>{
          const done=!!todayD.checked[ex.id];
          const hasVid=!!VIDEOS[ex.name];
          return(
            <div key={ex.id} style={{borderTop:i===0?"none":"1px solid #F0F4F4",
              background:done?weekDef.light:"#fff",
              borderLeft:`4px solid ${done?C:"transparent"}`,transition:"background 0.15s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 14px"}}>
                <div onClick={()=>toggle(ex.id)} style={{width:30,height:30,borderRadius:"50%",
                  flexShrink:0,cursor:"pointer",background:done?C:"#F0F4F4",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:done?15:14,transition:"all 0.2s",border:`2px solid ${done?C:weekDef.border}`}}>
                  {done?"✓":ex.icon}
                </div>
                <div style={{flex:1,cursor:"pointer",minWidth:0}} onClick={()=>toggle(ex.id)}>
                  <div style={{fontSize:14,fontWeight:done?600:500,color:done?C:"#264653",
                    textDecoration:done?"line-through":"none",opacity:done?0.75:1}}>{ex.name}</div>
                  <div style={{fontSize:11,color:"#8FA5AF",marginTop:1,display:"flex",gap:6,
                    alignItems:"center",flexWrap:"wrap"}}>
                    {ex.reps}
                    {ex.bootOff&&<span style={{background:"#EEF0FF",color:"#5C5CFF",
                      borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:700,flexShrink:0}}>boot off</span>}
                  </div>
                </div>
                {hasVid&&(
                  <button onClick={()=>setVideo(ex.name)} style={{background:"#FF0000",border:"none",
                    borderRadius:8,padding:"6px 9px",cursor:"pointer",flexShrink:0,
                    display:"flex",alignItems:"center",gap:3}}>
                    <span style={{color:"#fff",fontSize:10,fontWeight:700}}>🎬</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={openModal} style={{width:"100%",padding:14,borderRadius:12,
        border:`2px solid ${C}`,background:todayD.pain>0?weekDef.light:"#fff",
        color:C,fontSize:14,fontWeight:700,cursor:"pointer",marginBottom:4,
        display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        {todayD.pain>0?`📋 Pain ${todayD.pain}/10 · Swelling ${todayD.swelling}/10 — Edit`:"📋 Log Pain, Swelling & Notes"}
      </button>
      {todayD.note&&<div style={{fontSize:12,color:"#8FA5AF",fontStyle:"italic",
        textAlign:"center",padding:"0 8px 8px"}}>"{todayD.note}"</div>}
    </div>
  );

  const ProgressTab=()=>{
    const allDays=Object.entries(log);
    const avgPain=allDays.length?(allDays.reduce((s,[,d])=>s+(d.pain||0),0)/allDays.length).toFixed(1):"–";
    const avgSwell=allDays.length?(allDays.reduce((s,[,d])=>s+(d.swelling||0),0)/allDays.length).toFixed(1):"–";
    return(
      <div>
        <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,
          boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
            textTransform:"uppercase",color:C,marginBottom:12}}>7-Day Compliance</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80,marginBottom:8}}>
            {last7.map(d=>{
              const bc=d.pct>=80?"#2A9D8F":d.pct>=50?"#E9C46A":d.pct===0?"#ECEEEE":"#E76F51";
              return(
                <div key={d.key} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{width:"100%",background:"#F0F4F4",borderRadius:4,height:60,
                    position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",bottom:0,left:0,right:0,background:bc,
                      borderRadius:4,height:`${d.pct}%`,transition:"height 0.5s ease"}}/>
                  </div>
                  <div style={{fontSize:10,color:"#8FA5AF",fontWeight:600}}>{d.day}</div>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",gap:12,justifyContent:"center",fontSize:10,color:"#8FA5AF"}}>
            <span>🟩≥80%</span><span>🟨50–79%</span><span>🟥&lt;50%</span>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:14}}>
          {[{l:"7-day avg",v:weekAvg+"%",c:C},
            {l:"Avg pain",v:avgPain+"/10",c:painColor(parseFloat(avgPain)||0)},
            {l:"Avg swelling",v:avgSwell+"/10",c:"#6C63FF"}].map(s=>(
            <div key={s.l} style={{background:"#fff",borderRadius:12,padding:"12px 6px",
              textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
              <div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:9,color:"#8FA5AF",marginTop:2,textTransform:"uppercase",
                letterSpacing:"0.05em"}}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,
          boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
            textTransform:"uppercase",color:C,marginBottom:12}}>Pain Trend — share with surgeon 📊</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            {last7.map(d=>(
              <div key={d.key} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{fontSize:12,fontWeight:700,color:painColor(d.pain)}}>{d.pain||"·"}</div>
                <div style={{width:"100%",height:6,borderRadius:3,
                  background:d.pain>0?painColor(d.pain):"#E8ECEC"}}/>
                <div style={{fontSize:9,color:"#8FA5AF"}}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:"#fff",borderRadius:16,padding:16,
          boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
          <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
            textTransform:"uppercase",color:C,marginBottom:10}}>Recovery Milestones</div>
          {[
            {l:"First full-completion day",done:Object.values(log).some(d=>pct(Object.values(d.checked||{}).filter(Boolean).length,exercises.length)===100)},
            {l:"7-day streak ≥50% daily",done:streak>=7},
            {l:"Pain consistently ≤3/10",done:parseFloat(avgPain)<=3&&allDays.length>=5},
            {l:"90%+ weekly compliance",done:weekAvg>=90},
            {l:"🩻 Surgeon follow-up July 8",done:false},
          ].map(m=>(
            <div key={m.l} style={{display:"flex",alignItems:"center",gap:10,
              padding:"8px 0",borderTop:"1px solid #F0F4F4"}}>
              <div style={{width:22,height:22,borderRadius:"50%",flexShrink:0,
                background:m.done?C:"#F0F4F4",display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:12}}>{m.done?"✓":"○"}</div>
              <div style={{fontSize:13,color:m.done?"#264653":"#8FA5AF",
                fontWeight:m.done?600:400}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LogTab=()=>{
    const entries=Object.entries(log).sort(([a],[b])=>b.localeCompare(a)).slice(0,30);
    if(!entries.length)return(
      <div style={{textAlign:"center",padding:"60px 20px",color:"#8FA5AF"}}>
        <div style={{fontSize:40,marginBottom:10}}>📋</div>
        <div>No entries yet — check off today's exercises!</div>
      </div>
    );
    return(
      <div>
        {entries.map(([date,d])=>{
          const done=Object.values(d.checked||{}).filter(Boolean).length;
          const p=pct(done,exercises.length);
          return(
            <div key={date} style={{background:"#fff",borderRadius:12,padding:14,marginBottom:10,
              boxShadow:"0 1px 6px rgba(0,0,0,0.05)",border:"1px solid #E0ECEA"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:14,fontWeight:700}}>{fmtDay(date)}</div>
                <div style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:700,
                  background:p>=80?"#E8F5F3":p>=50?"#FDF7E3":"#FDF0EC",
                  color:p>=80?C:p>=50?"#8A5700":"#E76F51"}}>{p}%</div>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:d.note?6:0}}>
                <span style={{padding:"2px 8px",borderRadius:10,background:"#E8F5F3",
                  color:C,fontSize:11,fontWeight:600}}>{done}/{exercises.length} done</span>
                {d.pain>0&&<span style={{padding:"2px 8px",borderRadius:10,background:"#FDF7E3",
                  color:"#8A5700",fontSize:11,fontWeight:600}}>Pain {d.pain}/10</span>}
                {d.swelling>0&&<span style={{padding:"2px 8px",borderRadius:10,background:"#EEF0FF",
                  color:"#5C5CFF",fontSize:11,fontWeight:600}}>Swelling {d.swelling}/10</span>}
              </div>
              {d.note&&<div style={{fontSize:12,color:"#8FA5AF",fontStyle:"italic"}}>"{d.note}"</div>}
            </div>
          );
        })}
      </div>
    );
  };

  const copyReminderText=()=>{
    const text=`Ankle Recovery reminders\n\nMorning: Open Ankle Recovery Coach, check pain/swelling, hydrate, protein, and do safe mobility.\nMidday: Complete today's ankle exercises and CAM boot walking goal if cleared.\nEvening: Log pain, swelling, sleep, notes, and missed tasks.\nSafety: Full weight-bearing only in CAM boot starting June 17. No barefoot walking unless surgeon clears it.`;
    navigator.clipboard?.writeText(text);
    showToast("Reminder text copied");
  };

  const SettingsTab=()=>(
    <div>
      <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
          textTransform:"uppercase",color:C,marginBottom:10}}>Your Exact Timeline</div>
        {["Surgery: May 23, 2026","First follow-up: June 3, 2026","CAM walking boot: June 17, 2026","FWBAT in boot only starting June 17","Next follow-up X-ray: July 8, 2026"].map((s,i)=>(
          <div key={i} style={{fontSize:13,color:"#4A6572",padding:"6px 0",borderTop:i>0?"1px solid #F0F4F4":"none"}}>{s}</div>
        ))}
        <button onClick={()=>{setWeek(recoveryWeekFromDate());showToast("Auto week recalculated");}} style={{marginTop:10,width:"100%",padding:12,borderRadius:10,border:"none",background:C,color:"#fff",fontWeight:800}}>Recalculate Current Week</button>
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
          textTransform:"uppercase",color:C,marginBottom:10}}>Apple Reminders Setup</div>
        <div style={{fontSize:13,color:"#4A6572",lineHeight:1.45,marginBottom:10}}>For reliable iPhone alerts, create Apple Reminders or a Shortcut using this text. PWA notifications on iPhone are limited and require Home Screen installation + permission.</div>
        <button onClick={copyReminderText} style={{width:"100%",padding:12,borderRadius:10,border:`2px solid ${C}`,background:weekDef.light,color:C,fontWeight:800}}>Copy Reminder Text</button>
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
          textTransform:"uppercase",color:C,marginBottom:12}}>Your Recovery Week</div>
        {Object.entries(WEEKS).map(([w,def])=>(
          <div key={w} onClick={()=>{setWeek(Number(w));showToast(`Switched to ${def.label}`);}} style={{
            padding:"12px 14px",borderRadius:10,marginBottom:8,cursor:"pointer",
            border:`2px solid ${Number(w)===week?def.color:"#E0ECEA"}`,
            background:Number(w)===week?def.light:"#fff",transition:"all 0.15s"}}>
            <div style={{fontSize:14,fontWeight:700,
              color:Number(w)===week?def.color:"#264653"}}>{def.label} — {def.sublabel}</div>
            <div style={{fontSize:11,color:"#8FA5AF",marginTop:2}}>{def.tag}</div>
          </div>
        ))}
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
          textTransform:"uppercase",color:C,marginBottom:10}}>📱 Save to iPhone Home Screen</div>
        {["1. Open this page in Safari (not Chrome)","2. Tap the Share button ⬆️ at the bottom",
          "3. Scroll down → tap  Add to Home Screen","4. Name it  Ankle Rehab  → tap Add",
          "✅ Opens full-screen, no browser bar, data saves automatically"].map((s,i)=>(
          <div key={i} style={{fontSize:13,color:i===4?"#2A9D8F":"#4A6572",padding:"7px 0",
            borderTop:i>0?"1px solid #F0F4F4":"none",fontWeight:i===4?700:400}}>{s}</div>
        ))}
      </div>

      <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:14,
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #E0ECEA"}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.07em",
          textTransform:"uppercase",color:C,marginBottom:10}}>🐙 Publish to GitHub (free)</div>
        {["1. Go to github.com — create a free account",
          "2. Tap + → New repository",
          "3. Name it: ankle-orif-recovery  →  set to Public",
          "4. Tap Create repository",
          "5. Tap Add file → Create new file",
          "6. Name the file: index.html",
          "7. Paste in the app code → Commit new file",
          "8. Settings → Pages → Source: main branch → Save",
          "✅ Live at: yourusername.github.io/ankle-orif-recovery"].map((s,i)=>(
          <div key={i} style={{fontSize:13,color:i===8?"#2A9D8F":"#4A6572",padding:"7px 0",
            borderTop:i>0?"1px solid #F0F4F4":"none",fontWeight:i===8?700:400}}>{s}</div>
        ))}
      </div>

      <button onClick={()=>{if(window.confirm("Reset ALL data? Cannot be undone.")){
        setLog({});persist("rehab_log_v3",{});showToast("Data cleared");}}}
        style={{width:"100%",padding:14,borderRadius:12,border:"2px solid #E76F51",
          background:"#FDF0EC",color:"#E76F51",fontSize:14,fontWeight:700,cursor:"pointer"}}>
        🗑 Reset All Data
      </button>
    </div>
  );

  const CheckInModal=()=>(
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(38,70,83,0.55)",
      backdropFilter:"blur(4px)",display:"flex",alignItems:"flex-end"}}
      onClick={e=>{if(e.target===e.currentTarget)setModal(false);}}>
      <div style={{background:"#fff",borderRadius:"24px 24px 0 0",width:"100%",
        padding:"0 0 36px",maxHeight:"85vh",overflowY:"auto"}}>
        <div style={{width:40,height:4,background:"#E0ECEA",borderRadius:2,margin:"12px auto 0"}}/>
        <div style={{padding:"14px 20px 10px",borderBottom:"1px solid #F0F4F4",
          display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:17,fontWeight:800,color:"#264653"}}>Daily Check-In</div>
          <button onClick={()=>setModal(false)} style={{background:"#F0F4F4",border:"none",
            borderRadius:"50%",width:32,height:32,fontSize:16,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{padding:"16px 20px"}}>
          {[{label:"😣 Pain Level",val:painIn,set:setPainIn,col:painColor(painIn)},
            {label:"💧 Swelling Level",val:swellIn,set:setSwellIn,col:"#6C63FF"}].map(({label,val,set,col})=>(
            <div key={label} style={{marginBottom:20}}>
              <div style={{fontSize:13,fontWeight:700,color:"#4A6572",marginBottom:8}}>{label}</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:26,fontWeight:800,color:col,minWidth:36,textAlign:"center"}}>{val}</div>
                <input type="range" min={0} max={10} value={val}
                  onChange={e=>set(Number(e.target.value))}
                  style={{flex:1,accentColor:col,height:6}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,
                color:"#8FA5AF",marginTop:4}}>
                <span>None</span><span>Moderate</span><span>Severe</span>
              </div>
            </div>
          ))}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,color:"#4A6572",marginBottom:8}}>📝 Notes</div>
            <textarea value={noteIn} onChange={e=>setNoteIn(e.target.value)}
              placeholder="How did it feel? What was hard? Any wins today..."
              style={{width:"100%",border:"2px solid #E0ECEA",borderRadius:10,padding:12,
                fontSize:14,fontFamily:"inherit",resize:"none",background:"#F8FAFA",
                outline:"none",color:"#264653",boxSizing:"border-box"}} rows={3}/>
          </div>
          <button onClick={saveModal} style={{width:"100%",padding:15,borderRadius:12,
            border:"none",background:C,color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer"}}>
            Save Check-In ✓
          </button>
        </div>
      </div>
    </div>
  );

  if(!loaded)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",
      height:"100vh",color:"#2A9D8F",fontSize:18}}>Loading…</div>
  );

  const TABS=[{id:"today",icon:"🏠",label:"Today"},{id:"progress",icon:"📊",label:"Progress"},
    {id:"log",icon:"📋",label:"Log"},{id:"settings",icon:"⚙️",label:"Settings"}];

  return(
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif",
      background:"#F2F7F6",minHeight:"100vh",maxWidth:480,margin:"0 auto"}}>
      <div style={{position:"sticky",top:0,zIndex:100,background:"#fff",
        borderBottom:"1px solid #E0ECEA",boxShadow:"0 1px 8px rgba(0,0,0,0.05)"}}>
        <div style={{display:"flex"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"10px 4px 12px",
              background:"none",border:"none",borderBottom:`3px solid ${tab===t.id?C:"transparent"}`,
              color:tab===t.id?C:"#8FA5AF",fontSize:11,fontWeight:600,cursor:"pointer",
              display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"all 0.15s"}}>
              <span style={{fontSize:18}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{padding:"14px 14px 90px"}}>
        {tab==="today"    &&<TodayTab/>}
        {tab==="progress" &&<ProgressTab/>}
        {tab==="log"      &&<LogTab/>}
        {tab==="settings" &&<SettingsTab/>}
      </div>
      {video&&<VideoCard exerciseName={video} onClose={()=>setVideo(null)}/>}
      {modal&&<CheckInModal/>}
      <Toast msg={toast.msg} show={toast.show}/>
    </div>
  );
}
