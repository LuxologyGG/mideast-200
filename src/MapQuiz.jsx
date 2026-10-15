import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, Check, ChevronRight, Crosshair, HelpCircle, Minus, Plus, RotateCcw, Search, Shuffle, X} from 'lucide-react';
import {shuffle, useStoredState} from './core';
import {mapLocations} from './map-data';
import './map.css';

const MAP_W=1000, MAP_H=706.65;
const MAP_IMAGE=`${import.meta.env.BASE_URL}maps/course-map.webp`;
const categories=[['all','All locations'],['water','Water'],['terrain','Terrain'],['region','Regions']];
const modes=[['locate','Locate'],['name','Name it'],['choice','Multiple choice'],['mixed','Mixed']];
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const point=l=>({x:l.x*MAP_W,y:l.y*MAP_H});

export default function MapQuiz(){
  const [settings,setSettings]=useStoredState('mideast-map-settings',{mode:'mixed',category:'all',length:10});
  const [stats,setStats]=useStoredState('mideast-map-progress',{attempts:0,correct:0,mastered:[],misses:{},streaks:{}});
  const [query,setQuery]=useState(''),[cat,setCat]=useState('all'),[selected,setSelected]=useState(null);
  const [round,setRound]=useState(null),[cursor,setCursor]=useState(0),[picked,setPicked]=useState(null),[typed,setTyped]=useState(''),[answered,setAnswered]=useState(false),[roundAnswers,setRoundAnswers]=useState([]),[phase,setPhase]=useState('setup');
  const [zoom,setZoom]=useState(1),[pan,setPan]=useState({x:0,y:0}),[hint,setHint]=useState(false),[reveal,setReveal]=useState(false),[roundTest,setRoundTest]=useState(false),[crosshair,setCrosshair]=useState({x:MAP_W/2,y:MAP_H/2});
  const svgRef=useRef(null),drag=useRef(null),didDrag=useRef(false),inputRef=useRef(null);
  const available=useMemo(()=>mapLocations.filter(l=>settings.category==='all'||l.category===settings.category),[settings.category]);
  const current=round?.[cursor]||null;
  const mode=round?.mode||settings.mode;
  const questionMode=mode==='mixed'?(current?.mode||'locate'):mode;
  const filtered=useMemo(()=>mapLocations.filter(l=>(cat==='all'||l.category===cat)&&(`${l.name} ${(l.aliases||[]).join(' ')}`).toLowerCase().includes(query.toLowerCase())),[cat,query]);
  const choices=useMemo(()=>current?shuffle([current,...shuffle(available.filter(l=>l.id!==current.id)).slice(0,3)]):[],[current?.id,cursor,phase,available]);
  const bounds=useMemo(()=>({w:MAP_W/zoom,h:MAP_H/zoom,x:(MAP_W-MAP_W/zoom)/2-Math.max(-(MAP_W-MAP_W/zoom)/2,Math.min((MAP_W-MAP_W/zoom)/2,pan.x)),y:(MAP_H-MAP_H/zoom)/2-Math.max(-(MAP_H-MAP_H/zoom)/2,Math.min((MAP_H-MAP_H/zoom)/2,pan.y))}),[zoom,pan]);
  const toSvg=e=>{const r=svgRef.current.getBoundingClientRect();return {x:bounds.x+(e.clientX-r.left)/r.width*bounds.w,y:bounds.y+(e.clientY-r.top)/r.height*bounds.h};};
  const beginRound=(test=false,ids=null)=>{
    const pool=ids?mapLocations.filter(l=>ids.includes(l.id)):available;
    const items=shuffle(pool).slice(0,settings.length==='all'?pool.length:Math.min(Number(settings.length)||10,pool.length));
    setRoundTest(test);setRound(items.map(item=>({...item,mode:settings.mode==='mixed'?shuffle(['locate','name','choice'])[0]:settings.mode})));setCursor(0);setPicked(null);setTyped('');setAnswered(false);setRoundAnswers([]);setHint(false);setReveal(false);setZoom(1);setPan({x:0,y:0});setCrosshair({x:MAP_W/2,y:MAP_H/2});setPhase(test?'test':'practice');
  };
  const isCorrect=()=>{
    if(!current)return false;
    if(questionMode==='locate'){
      if(!picked)return false;
      const p=point(current),dx=(picked.x-p.x)/(current.rx*MAP_W),dy=(picked.y-p.y)/(current.ry*MAP_H);
      return dx*dx+dy*dy<=1;
    }
    const answer=questionMode==='name'?typed:picked;
    return questionMode==='name'?(current.aliases||[]).concat(current.name).some(a=>clean(a)===clean(answer)):answer===current.id;
  };
  const grade=()=>{
    if(!current||answered)return;
    if(questionMode==='locate'&&(!picked||typeof picked!=='object'))return;
    if(questionMode==='name'&&!typed.trim())return;
    if(questionMode==='choice'&&typeof picked!=='string')return;
    const right=isCorrect(), assisted=hint||reveal;
    setRoundAnswers(a=>[...a,{id:current.id,right,assisted}]);
    const saveAnswer=(s,a)=>{const misses={...s.misses},streaks={...(s.streaks||{})};misses[a.id]=(misses[a.id]||0)+(a.right?0:1);streaks[a.id]=a.right&&!a.assisted?(streaks[a.id]||0)+1:0;const mastered=new Set(s.mastered||[]);if(!a.right)mastered.delete(a.id);else if(streaks[a.id]>=3)mastered.add(a.id);return {...s,attempts:s.attempts+1,correct:s.correct+(a.right?1:0),mastered:[...mastered],misses,streaks};};
    const currentAnswer={id:current.id,right,assisted};
    if(phase==='practice')setStats(s=>saveAnswer(s,currentAnswer));
    if(phase==='test'){
      if(cursor>=round.length-1){setStats(s=>roundAnswers.concat(currentAnswer).reduce(saveAnswer,s));setPhase('result');return;}
      setCursor(c=>c+1);setPicked(null);setTyped('');setHint(false);setReveal(false);setZoom(1);setPan({x:0,y:0});return;
    }
    setAnswered(true);
  };
  const next=()=>{if(cursor>=round.length-1){setPhase('result');return;}setCursor(c=>c+1);setPicked(null);setTyped('');setAnswered(false);setHint(false);setReveal(false);setZoom(1);setPan({x:0,y:0});};
  const locate=(e)=>{if(didDrag.current||phase==='study')return;const p=toSvg(e);setPicked(p);setCrosshair(p);};
  const pointerDown=e=>{if(e.button!==undefined&&e.button!==0)return;drag.current={x:e.clientX,y:e.clientY,pan:{...pan}};didDrag.current=false;e.currentTarget.setPointerCapture?.(e.pointerId);};
  const pointerMove=e=>{if(!drag.current)return;const r=svgRef.current.getBoundingClientRect(),dx=(e.clientX-drag.current.x)/r.width*bounds.w,dy=(e.clientY-drag.current.y)/r.height*bounds.h;if(Math.abs(dx)+Math.abs(dy)>5)didDrag.current=true;if(didDrag.current){const mx=(MAP_W-bounds.w)/2,my=(MAP_H-bounds.h)/2;setPan({x:Math.max(-mx,Math.min(mx,drag.current.pan.x+dx)),y:Math.max(-my,Math.min(my,drag.current.pan.y+dy))});}};
  const pointerUp=()=>{drag.current=null;setTimeout(()=>{didDrag.current=false;},0);};
  const locs=mapLocations;
  const reference=phase==='study';
  const showPoint=selected&&reference?selected:null;
  const testPoint=null;
  const correctPoint=(answered&&current&&questionMode==='locate')?current:null;
  const miss=roundAnswers.filter(a=>!a.right);
  const resultAnswers=phase==='result'?roundAnswers:[];
  const entered=(e)=>{e.preventDefault();grade();};
  useEffect(()=>{if(questionMode==='name'&&!answered)inputRef.current?.focus();},[cursor,questionMode,answered,phase]);
  useEffect(()=>{const onKey=e=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement)return;if(e.key==='Enter'&&(e.target instanceof HTMLButtonElement||e.target instanceof HTMLAnchorElement))return;if(phase==='study'&&['ArrowLeft','ArrowUp','ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();const i=filtered.findIndex(l=>l.id===selected?.id);const n=e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1;const l=filtered[(i+n+filtered.length)%filtered.length];if(l)setSelected(l);}if(phase==='practice'||phase==='test'){if(questionMode==='locate'&&['ArrowLeft','ArrowUp','ArrowRight','ArrowDown'].includes(e.key)){e.preventDefault();const step=20/zoom,dx=e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0,dy=e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0;const p={x:Math.max(0,Math.min(MAP_W,crosshair.x+dx)),y:Math.max(0,Math.min(MAP_H,crosshair.y+dy))};setCrosshair(p);setPicked(p);}if(e.key==='Enter'){e.preventDefault();answered?next():grade();}if(questionMode==='choice'&&e.key>='1'&&e.key<='4'){const c=choices[Number(e.key)-1];if(c&&!answered)setPicked(c.id);}}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[phase,filtered,selected,answered,choices,cursor,picked,typed,questionMode,crosshair,zoom]);
  const title=phase==='study'?'Explore the map':phase==='result'?'Round complete':phase==='setup'?'Map practice':'Map practice';
  return <section className="map-quiz">
    <div className="map-heading"><div><p className="eyebrow">07 / GEOGRAPHY LAB</p><h1>{title}<span className="map-count">30 locations</span></h1><p className="map-sub">Practice the places, waterways, and terrain that shape the ancient Near East.</p></div><div className="map-heading-stat"><b>{stats.mastered.length}<small> / 30</small></b><span>locations learned</span></div></div>
    <div className="map-tabs" role="tablist" aria-label="Map mode"><button className={phase==='study'?'active':''} onClick={()=>{setPhase('study');setRound(null);setSelected(null);}}>Explore</button><button className={phase!=='study'?'active':''} onClick={()=>{setPhase('setup');setRound(null);}}>Practice</button></div>
    {phase==='study'?<div className="map-explore-layout">
      <div className="map-explore-list panel"><div className="map-list-title"><div><span className="eyebrow">REFERENCE</span><h2>Locations</h2></div><span>{filtered.length} places</span></div><label className="map-search"><Search size={15}/><input aria-label="Search locations" placeholder="Search map terms" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search"><X size={14}/></button>}</label><div className="map-filter-row">{categories.map(([id,name])=><button key={id} className={cat===id?'active':''} onClick={()=>setCat(id)}>{name}</button>)}</div><div className="map-locations" role="listbox" aria-label="Map locations">{filtered.map(l=><button key={l.id} role="option" aria-selected={selected?.id===l.id} className={selected?.id===l.id?'selected':''} onClick={()=>setSelected(l)}><span className="map-location-dot"/><span><b>{l.name}</b><small>{l.category}</small></span><ChevronRight size={15}/></button>)}{!filtered.length&&<p className="map-empty">No locations match that search.</p>}</div>{selected&&<div className="map-detail"><span className="eyebrow">{selected.category}</span><h3>{selected.name}</h3>{selected.aliases?.length>0&&<p>Also called {selected.aliases.join(' · ')}</p>}</div>}</div>
      <MapCanvas {...{svgRef,bounds,zoom,setZoom,setPan,pan,pointerDown,pointerMove,pointerUp,locate,reference,locs,showPoint,testPoint,correctPoint,picked,phase,selected}} />
    </div>:null}
    {phase==='setup'&&<div className="map-practice-setup"><div className="map-setup-card panel"><div className="map-setup-copy"><span className="eyebrow">BUILD YOUR ROUND</span><h2>Find your place in the region.</h2><p>Tap the map to locate a term, type the name at a marker, or pick from a short list. Start with practice or take a no-hint test.</p><div className="map-statline"><span><b>{stats.attempts}</b> attempts</span><i/><span><b>{stats.mastered.length}</b> learned</span><i/><span><b>{mapLocations.length}</b> total terms</span></div></div><div className="map-settings"><label><span>Question style</span><select value={settings.mode} onChange={e=>setSettings(s=>({...s,mode:e.target.value}))}>{modes.map(([id,n])=><option value={id} key={id}>{n}</option>)}</select></label><label><span>Study pool</span><select value={settings.category} onChange={e=>setSettings(s=>({...s,category:e.target.value}))}>{categories.map(([id,n])=><option value={id} key={id}>{n}</option>)}</select></label><label><span>Round size</span><select value={settings.length} onChange={e=>setSettings(s=>({...s,length:e.target.value}))}><option value="10">10 questions</option><option value="20">20 questions</option><option value="all">All in pool ({available.length})</option></select></label><div className="map-setup-buttons"><button className="button primary" onClick={()=>beginRound(false)}><Crosshair size={16}/>Practice round</button><button className="button secondary" onClick={()=>beginRound(true)}><Check size={16}/>Test mode</button></div><p className="map-note"><HelpCircle size={14}/>Test mode hides hints and answers until you finish. Practice records first answers only. Three consecutive correct answers without help mark a location learned.</p></div></div><div className="map-preview panel"><div><span className="eyebrow">THE REGION</span><h3>A map worth knowing.</h3><p>Zoom and pan to follow the Nile, the Levant coast, and the routes between them.</p><button className="button ghost" onClick={()=>setPhase('study')}>Open reference <ArrowRight size={15}/></button></div><img src={MAP_IMAGE} alt="Map of the ancient Near East"/></div></div>}
    {(phase==='practice'||phase==='test')&&current&&<div className="map-round"><div className="map-round-bar"><button className="button ghost" onClick={()=>setPhase('setup')}><ArrowLeft size={15}/>End round</button><div className="map-round-progress"><span>QUESTION <b>{cursor+1}</b> / {round.length}</span><div className="progress-track"><i style={{width:`${(cursor+1)/round.length*100}%`}}/></div></div><span className={`map-mode-chip ${phase==='test'?'test':''}`}>{phase==='test'?'Test mode':'Practice'}</span></div><div className="map-question"><div><span className="eyebrow">{phase==='test'?'NO HINTS · ANSWERS AT THE END':hint?'HINT REVEALED':questionMode==='locate'?'TAP THE MAP':questionMode==='name'?'NAME THIS MARKER':'CHOOSE THE NAME'}</span><h2>{questionMode==='locate'?<>Find <strong>{current.name}</strong> on the map.</>:questionMode==='name'?<>What place is marked?</>:<>Which location is marked?</>}</h2>{phase==='practice'&&questionMode==='locate'&&hint&&<p className="map-hint">Look for {current.category==='water'?'a waterway':current.category==='terrain'?'a mountain or geographic feature':'a region'} in the area.</p>}</div><div className="map-answer-tools">{phase==='practice'&&<button className="button ghost" onClick={()=>{setHint(true);}} disabled={hint||answered}><HelpCircle size={15}/>Hint</button>}{phase==='practice'&&!answered&&<button className="button ghost" onClick={()=>{setReveal(true);setHint(true);}}><Crosshair size={15}/>Show area</button>}</div></div><MapCanvas {...{svgRef,bounds,zoom,setZoom,setPan,pan,pointerDown,pointerMove,pointerUp,locate,reference:false,locs,showPoint:null,testPoint:phase==='practice'&&reveal?current:testPoint,correctPoint,picked,phase,selected:null,targetPoint:questionMode==='locate'?null:current}} />
      <div className="map-response">{questionMode==='name'&&!answered&&<form className="map-name-form" onSubmit={entered}><input ref={inputRef} value={typed} onChange={e=>setTyped(e.target.value)} placeholder="Type a name or accepted alias" aria-label="Location name" autoComplete="off"/><button className="button primary" disabled={!typed.trim()}>{phase==='test'?'Lock answer':'Check'} <ChevronRight size={15}/></button></form>}{questionMode==='choice'&&!answered&&<div className="map-choices">{choices.map((c,i)=><button key={c.id} className={picked===c.id?'picked':''} onClick={()=>setPicked(c.id)}><kbd>{i+1}</kbd>{c.name}</button>)}</div>}{questionMode==='locate'&&!answered&&phase==='practice'&&<button className="button primary map-check" onClick={grade} disabled={!picked||typeof picked!=='object'}>Check location <ChevronRight size={15}/></button>}{questionMode==='choice'&&!answered&&phase==='practice'&&<button className="button primary map-check" onClick={grade} disabled={!picked}>Check answer <ChevronRight size={15}/></button>}{answered&&<div className={`map-feedback ${roundAnswers.at(-1)?.right?'right':'wrong'}`}><div><span className="map-feedback-icon">{roundAnswers.at(-1)?.right?<Check size={17}/>:<X size={17}/>}</span><span><b>{roundAnswers.at(-1)?.right?'Correct':`It was ${current.name}`}</b><small>{roundAnswers.at(-1)?.assisted?'Assisted answer':'First answer saved to this device'}</small></span></div><button className="button primary" onClick={next}>{cursor===round.length-1?'See results':'Next'} <ArrowRight size={15}/></button></div>}{phase==='test'&&!answered&&questionMode==='locate'&&picked&&typeof picked==='object'&&<button className="button primary map-check" onClick={grade}>Lock answer <ChevronRight size={15}/></button>}{questionMode==='choice'&&!answered&&phase==='test'&&<button className="button primary map-check" onClick={grade} disabled={!picked}>Lock answer <ChevronRight size={15}/></button>}</div>
    </div>}
    {phase==='result'&&<div className="map-results panel"><div className="map-result-top"><span className="eyebrow">{roundAnswers.filter(a=>a.right).length} / {roundAnswers.length} CORRECT</span><h2>{roundAnswers.filter(a=>a.right).length===roundAnswers.length?'Excellent map sense.':'Keep building your map sense.'}</h2><p>{phase==='result'&&round?.[0]&&roundAnswers.some(a=>a.assisted)?'Hints and revealed areas are marked as assisted.':`Your answers are saved on this device.`}</p></div><div className="map-result-stats"><div><b>{roundAnswers.filter(a=>a.right).length}</b><span>Correct</span></div><div><b>{roundAnswers.filter(a=>!a.right).length}</b><span>Review</span></div><div><b>{stats.mastered.length}</b><span>Learned</span></div></div><div className="map-result-list"><h3>Round review</h3>{round?.map((item,i)=>{const a=resultAnswers[i];return <div key={item.id}><span className={a?.right?'good':'bad'}>{a?.right?<Check size={14}/>:<X size={14}/>}</span><b>{item.name}</b><small>{a?.assisted?'Assisted':a?.right?'Correct':'Review this place'}</small></div>;})}</div><div className="map-result-actions"><button className="button primary" onClick={()=>beginRound(false,miss.map(a=>a.id))} disabled={!miss.length}><RotateCcw size={15}/>Review missed ({miss.length})</button><button className="button secondary" onClick={()=>beginRound(roundTest) }><Shuffle size={15}/>New round</button><button className="button ghost" onClick={()=>setPhase('setup')}>Change settings</button></div></div>}
    <p className="map-footnote"><HelpCircle size={13}/> Practice zones mark approximate label areas on this map; they are study aids, not historical boundaries. Progress stays on this device and is separate from card mastery.</p>
  </section>;
}

function MapCanvas({svgRef,bounds,zoom,setZoom,setPan,pan,pointerDown,pointerMove,pointerUp,locate,reference,locs,showPoint,testPoint,correctPoint,picked,phase,selected,targetPoint}){
  const world=(l)=>point(l);
  return <div className={`map-canvas-wrap ${phase==='practice'||phase==='test'?'round-map':''}`}><div className="map-canvas-tools"><button aria-label="Zoom out" onClick={()=>setZoom(z=>Math.max(1,z/1.25))}><Minus size={15}/></button><span>{Math.round(zoom*100)}%</span><button aria-label="Zoom in" onClick={()=>setZoom(z=>Math.min(3.5,z*1.25))}><Plus size={15}/></button><button aria-label="Reset map view" onClick={()=>{setZoom(1);setPan({x:0,y:0});}}><RotateCcw size={14}/></button></div><svg ref={svgRef} className="map-canvas" viewBox={`${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`} role="img" tabIndex={0} aria-label="Interactive map of the ancient Near East. In locate exercises, use arrow keys to position a marker, then Enter to check." onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onClick={locate}>
    <image href={MAP_IMAGE} x="0" y="0" width={MAP_W} height={MAP_H} preserveAspectRatio="none"/>
    {(phase==='practice'||phase==='test')&&locs.map(l=>{const m=l.mask;if(!m)return null;const x=l.x*MAP_W,y=l.y*MAP_H,w=m.w*MAP_W,h=m.h*MAP_H;return <rect key={`mask-${l.id}`} x={x-w/2} y={y-h/2} width={w} height={h} rx="1.5" fill={m.fill||'#fff'} transform={`rotate(${m.angle||0} ${x} ${y})`}/>;})}
    {(phase==='study'||reference)&&locs.map(l=><g key={l.id}><ellipse className="map-hit-area" cx={l.x*MAP_W} cy={l.y*MAP_H} rx={l.rx*MAP_W} ry={l.ry*MAP_H} fill="transparent" onClick={e=>{e.stopPropagation();}}/><circle className={`reference-dot ${selected?.id===l.id?'selected':''}`} cx={l.x*MAP_W} cy={l.y*MAP_H} r="4.2"/></g>)}
    {phase==='study'&&selected&&<MapPin loc={selected} className="reference-pin"/>}
    {testPoint&&<MapPin loc={testPoint} className="test-pin"/>}
    {targetPoint&&<MapPin loc={targetPoint} className="question-pin"/>}
    {correctPoint&&<MapPin loc={correctPoint} className="correct-pin"/>}
    {picked&&phase!=='study'&&typeof picked==='object'&&<g className="picked-pin"><circle cx={picked.x} cy={picked.y} r="10"/><circle cx={picked.x} cy={picked.y} r="3"/></g>}
    {showPoint&&<MapPin loc={showPoint} className="reference-pin"/>}
  </svg><div className="map-canvas-caption"><span>{phase==='study'?'REFERENCE MAP · SELECT A TERM TO MARK IT':phase==='test'?'TAP A LOCATION · DRAG TO PAN':'LOCATE: TAP OR USE ARROWS · ENTER TO CHECK'}</span><span>Source map labels hidden during quiz</span></div></div>;
}
function MapPin({loc,className}){const p=point(loc);return <g className={className} transform={`translate(${p.x} ${p.y})`}><circle r="14"/><circle r="4"/><path d="M-5 12 0 21 5 12"/></g>;}
