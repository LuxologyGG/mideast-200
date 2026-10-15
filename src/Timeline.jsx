import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AnimatePresence, motion, Reorder} from 'motion/react';
import {ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, GripVertical, Minus, MoveHorizontal, Plus, RotateCcw, Target, X} from 'lucide-react';
import {periods, artifacts, images, questions, shuffle, fmtYear, shortName, recordAttempt, checkRange} from './core';
import './timeline.css';

const MIN = -10000, MAX = 850, FULL = MAX - MIN;
function boundedRange(start, span) {span = Math.min(FULL, Math.max(350, span)); start = Math.max(MIN, Math.min(MAX - span, start)); return [start, start + span];}
function laneMap() {const ends = [];return Object.fromEntries([...periods].sort((a,b)=>a.startYear-b.startYear).map(p => {let lane=ends.findIndex(end=>end<=p.startYear);if(lane<0)lane=ends.length;ends[lane]=p.endYear;return [p.id,lane];}));}
const lanes=laneMap();
const getPeriod = id => periods.find(p=>p.id===id);
const presets=[{label:'All history',range:[MIN,MAX]},{label:'Early settlements',range:[MIN,-2500]},{label:'Kingdoms & empires',range:[-3000,850]},{label:'Late antiquity',range:[-600,850]}];

export default function Timeline({onDrill}) {
  const [mode,setMode]=useState('explore');
  return <div className="timeline-mode">
    <div className="mode-header"><div><p className="eyebrow">01 / CONNECT THE PERIODS</p><h1>A sense of time.</h1><p className="muted">See the overlaps. Find the sequence. Make the dates stick.</p></div><div className="mode-counter"><strong>12</strong><span>periods to know</span></div></div>
    <div className="segmented timeline-tabs" role="tablist" aria-label="Timeline activities">{[['explore','Explore'],['place','Place periods'],['dates','Type dates'],['order','Put in order']].map(([id,label])=><button role="tab" aria-selected={mode===id} className={mode===id?'active':''} key={id} onClick={()=>setMode(id)}>{label}</button>)}</div>
    <AnimatePresence mode="wait"><motion.div key={mode} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.18}}>{mode==='explore'?<Explorer onDrill={onDrill}/>:mode==='place'?<Placement/>:mode==='dates'?<DateDrill/>:<Ordering/>}</motion.div></AnimatePresence>
  </div>;
}

function Explorer({onDrill}) {
  const [range,setRange]=useState([-4000,850]);
  const [selected,setSelected]=useState('uruk');
  const [artifactId,setArtifactId]=useState(null);
  const plot=useRef(null),gesture=useRef(null);
  const span=range[1]-range[0];
  const selectedPeriod=getPeriod(selected);
  const related=artifacts.filter(i=>i.periodId===selected);
  const artifact=artifacts.find(i=>i.id===artifactId);
  const [width,setWidth]=useState(800);
  useEffect(()=>{const observer=new ResizeObserver(([entry])=>setWidth(entry.contentRect.width));if(plot.current)observer.observe(plot.current);return()=>observer.disconnect();},[]);
  const scale=y=>(y-range[0])/span*100;
  const step=span>8000?2000:span>4000?1000:span>1800?500:span>800?200:100;
  const ticks=[];for(let y=Math.ceil(range[0]/step)*step;y<=range[1];y+=step)ticks.push(y);
  function zoom(factor){setRange(([start,end])=>{const span=end-start,newSpan=span*factor;return boundedRange((start+end-newSpan)/2,newSpan);});}
  function focus(p){setSelected(p.id);setArtifactId(null);const start=p.startYear,end=Math.min(MAX,p.endYear);const pspan=Math.max(900,end-start);setRange(boundedRange((start+end)/2-pspan*.7,pspan*1.4));}
  function pointerDown(event){if(event.target.closest('button'))return;plot.current.setPointerCapture(event.pointerId);gesture.current={x:event.clientX,range:[...range]};}
  function pointerMove(event){if(!gesture.current)return;const delta=(event.clientX-gesture.current.x)/width*(gesture.current.range[1]-gesture.current.range[0]);setRange(boundedRange(gesture.current.range[0]-delta,gesture.current.range[1]-gesture.current.range[0]));}
  return <>
    <div className="timeline-hero panel">
      <div className="timeline-toolbar"><div className="era-shortcuts">{presets.map(p=><button key={p.label} className={Math.abs(p.range[0]-range[0])<10&&Math.abs(p.range[1]-range[1])<10?'active':''} onClick={()=>setRange(p.range)}>{p.label}</button>)}</div><div className="row zoom-controls"><button className="icon-button" aria-label="Zoom out" onClick={()=>zoom(1.5)}><Minus size={16}/></button><span>{(FULL/span).toFixed(1)}×</span><button className="icon-button" aria-label="Zoom in" onClick={()=>zoom(.65)}><Plus size={16}/></button></div></div>
      <div className="plot-meta"><span>{fmtYear(Math.round(range[0]))}</span><span><MoveHorizontal size={13}/> Drag to explore · use + / − to zoom</span><span>{fmtYear(Math.round(range[1]))}</span></div>
      <div className="history-plot" ref={plot} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={()=>gesture.current=null} onPointerCancel={()=>gesture.current=null} onKeyDown={e=>{if(e.key==='ArrowLeft')setRange(boundedRange(range[0]-span*.2,span));if(e.key==='ArrowRight')setRange(boundedRange(range[0]+span*.2,span));if(e.key==='+')zoom(.65);if(e.key==='-')zoom(1.5);}} tabIndex={0} aria-label="Interactive historical timeline. Drag to pan; plus and minus to zoom.">
        {ticks.map(y=><div className="plot-gridline" key={y} style={{left:scale(y)+'%'}}><span>{y===0?'BCE / CE':Math.abs(y).toLocaleString()}</span></div>)}
        {periods.map(p=>{const start=Math.max(range[0],p.startYear),end=Math.min(range[1],p.endYear,MAX);if(end<=start)return null;return <motion.button key={p.id} className={`period-block ${selected===p.id?'selected':''}`} initial={false} animate={{left:scale(start)+'%',width:Math.max(1.2,(end-start)/span*100)+'%',top:48+lanes[p.id]*72}} transition={{type:'spring',stiffness:280,damping:32}} title={`${p.name}: ${p.date}`} onClick={()=>{setSelected(p.id);setArtifactId(null);}} style={{height:54}}><span>{shortName(p.name)}</span><small>{p.date}</small>{p.endYear>MAX&&<span className="continuation">→</span>}</motion.button>;})}
      </div>
      <div className="timeline-overview" role="slider" tabIndex={0} aria-label="Timeline overview. Click to jump." aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={Math.round(range[0])} onClick={e=>{const rect=e.currentTarget.getBoundingClientRect();setRange(boundedRange(MIN+(e.clientX-rect.left)/rect.width*FULL-span/2,span));}} onKeyDown={e=>{if(e.key==='ArrowLeft')setRange(boundedRange(range[0]-span*.2,span));if(e.key==='ArrowRight')setRange(boundedRange(range[0]+span*.2,span));}}>
        {periods.map(p=><span key={p.id} className="overview-bar" style={{left:(p.startYear-MIN)/FULL*100+'%',width:(Math.min(MAX,p.endYear)-p.startYear)/FULL*100+'%',top:7+lanes[p.id]*5}}/>)}<motion.span className="overview-window" animate={{left:(range[0]-MIN)/FULL*100+'%',width:span/FULL*100+'%'}} transition={{duration:.1}}/>
      </div><div className="overview-labels"><span>10,000 BCE</span><span>Full timeline · click to jump</span><span>850 CE</span></div>
    </div>
    <div className="period-rail" aria-label="Choose a period">{periods.map((p,n)=><button className={selected===p.id?'active':''} onClick={()=>focus(p)} key={p.id}><span>{String(n+1).padStart(2,'0')}</span>{shortName(p.name)}</button>)}</div>
    <AnimatePresence mode="wait"><motion.div key={selected} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="period-insight panel">
      <div><p className="eyebrow">{selectedPeriod.location}</p><h2>{selectedPeriod.name}</h2><p className="period-date">{selectedPeriod.date}</p>{selectedPeriod.endYear>MAX&&<p className="muted small">Continues beyond this timeline to the 1400s CE.</p>}<button className="button secondary" onClick={()=>onDrill([selected])}>Study this period <ArrowRight size={15}/></button></div>
      <div className="insight-body"><div className="two-details">{selectedPeriod.details.map((detail,n)=><p key={detail}><span>0{n+1}</span>{detail}</p>)}</div><div className="significance"><span className="eyebrow">WHY IT MATTERS</span><p>{selectedPeriod.significance}</p></div></div>
    </motion.div></AnimatePresence>
    {related.length>0&&<div className="related-section"><div className="row justify-between"><h3>In this period</h3><span className="muted small">{related.length} connections</span></div><div className="related-grid">{related.map(item=><button className="related-card" key={item.id} onClick={()=>setArtifactId(artifactId===item.id?null:item.id)}>{images[item.id]?.url?<img src={images[item.id].url} alt="" loading="lazy"/>:<div className="related-placeholder">{item.name.slice(0,1)}</div>}<span><b>{item.name}</b><small>{item.date}</small></span><ChevronDown size={15}/></button>)}</div>{artifact&&<motion.div className="panel artifact-insight" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} key={artifactId}><div className="row justify-between"><h3>{artifact.name}</h3><button className="icon-button" onClick={()=>setArtifactId(null)} aria-label="Close artifact"><X size={18}/></button></div><p className="muted">{artifact.date} · {artifact.location}</p>{artifact.verifyWithSlides&&<span className="badge verify">Verify with slides</span>}{artifact.details.map(d=><p key={d}>{d}</p>)}<p><b>Significance.</b> {artifact.significance}</p><button className="button secondary" onClick={()=>onDrill([artifact.id])}>Practice recall <ArrowRight size={15}/></button></motion.div>}</div>}
  </>;
}

function Placement() {
  const [queue,setQueue]=useState(()=>shuffle(periods));
  const [index,setIndex]=useState(0),[positions,setPositions]=useState({}),[feedback,setFeedback]=useState(null),[done,setDone]=useState(false);
  const target=useRef(null),[dragging,setDragging]=useState(false);
  const [view,setView]=useState([-4000,850]);
  const current=queue[index];
  function reset(){setQueue(shuffle(periods));setIndex(0);setPositions({});setFeedback(null);setDone(false);}
  function place(clientX){if(done||feedback?.correct)return;const rect=target.current.getBoundingClientRect();const year=view[0]+Math.max(0,Math.min(1,(clientX-rect.left)/rect.width))*(view[1]-view[0]);const correct=year>=current.startYear-50&&year<=current.endYear+50;recordAttempt(current.id,correct);setPositions(p=>({...p,[current.id]:Math.round(year)}));setFeedback({correct,year:Math.round(year)});setDragging(false);}
  function next(){if(index+1===queue.length){setDone(true);return;}setIndex(index+1);setFeedback(null);}
  if(done)return <div className="panel drill-complete"><Check size={36}/><p className="eyebrow">PERIOD PLACEMENT COMPLETE</p><h2>Every period has a place.</h2><p className="muted">Now try recalling the date ranges without the timeline.</p><button className="button primary" onClick={reset}>Try a new order <RotateCcw size={16}/></button></div>;
  return <div className="placement-drill panel"><div className="row justify-between"><span className="eyebrow">PLACE THE PERIOD</span><span className="muted">{index+1} / 12</span></div><div className="progress-track"><span style={{width:index/12*100+'%'}}/></div><h2>Where does this belong?</h2><p className="muted">Drag the card onto any year within its period, or tap the timeline.</p><motion.div className={`placement-prompt ${dragging?'dragging':''}`} drag dragSnapToOrigin onDragStart={()=>setDragging(true)} onDragEnd={(event,info)=>{const rect=target.current.getBoundingClientRect();const x=event.clientX??info.point.x,y=event.clientY??info.point.y;if(y>=rect.top-40&&y<=rect.bottom+40)place(x);else setDragging(false);}} whileDrag={{scale:1.04,boxShadow:'0 16px 60px #0006',zIndex:10}} key={current.id}><GripVertical size={18}/><strong>{current.name}</strong><MoveHorizontal size={18}/></motion.div><div className="era-shortcuts placement-views">{presets.slice(0,3).map(p=><button key={p.label} onClick={()=>setView(p.range)}>{p.label}</button>)}</div>
    <div className={`placement-axis ${dragging?'ready':''}`} ref={target} onClick={e=>place(e.clientX)} role="button" tabIndex={0} aria-label="Tap a year to place the period" onKeyDown={e=>{if(e.key==='Enter')place(target.current.getBoundingClientRect().left+target.current.clientWidth/2);}}><div className="placement-line"/>{Array.from({length:7},(_,n)=>{const year=Math.round(view[0]+n/6*(view[1]-view[0]));return <div className="placement-tick" key={n} style={{left:n/6*100+'%'}}><i/><span>{fmtYear(year)}</span></div>;})}{feedback&&<motion.div className={`placement-pin ${feedback.correct?'good':'bad'}`} initial={{scale:0}} animate={{scale:1}} style={{left:Math.max(0,Math.min(100,(feedback.year-view[0])/(view[1]-view[0])*100))+'%'}}>{feedback.correct?<Check size={17}/>:<X size={17}/>}</motion.div>}</div>
    <AnimatePresence>{feedback&&<motion.div className={`drill-feedback ${feedback.correct?'good':'bad'}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}><div><strong>{feedback.correct?'That’s the right period.':'A little out of place.'}</strong><p>{feedback.correct?current.date:`You chose ${fmtYear(feedback.year)}. It belongs at ${current.date}. Try again.`}</p></div>{feedback.correct&&<button className="button primary" onClick={next}>Next <ArrowRight size={16}/></button>}</motion.div>}</AnimatePresence>
  </div>;
}

function DateDrill(){
  const [queue,setQueue]=useState(()=>shuffle(periods)),[index,setIndex]=useState(0),[start,setStart]=useState(''),[end,setEnd]=useState(''),[result,setResult]=useState(null),[score,setScore]=useState(0);
  const current=queue[index];
  function check(e){e?.preventDefault();if(result)return;const correct=checkRange(start,end,current);setResult(correct);setScore(score+Number(correct));recordAttempt(current.id,correct);}
  function next(){setIndex(index+1);setStart('');setEnd('');setResult(null);}
  useEffect(()=>{function key(e){if(e.key==='Enter'&&result!==null&&!e.target.matches('textarea')){e.preventDefault();next();}}document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[result,index]);
  if(!current)return <div className="panel drill-complete"><Target size={38}/><p className="eyebrow">DATE DRILL COMPLETE</p><h2>{score} / 12 date ranges.</h2><p className="muted">Both endpoints need the correct era and ±50-year accuracy.</p><button className="button primary" onClick={()=>{setQueue(shuffle(periods));setIndex(0);setScore(0);setResult(null);}}>Try again <RotateCcw size={16}/></button></div>;
  return <div className="panel date-drill"><div className="row justify-between"><span className="eyebrow">ACTIVE RECALL</span><span className="muted">{index+1} / 12</span></div><div className="progress-track"><span style={{width:index/12*100+'%'}}/></div><AnimatePresence mode="wait"><motion.div key={current.id} initial={{opacity:0,x:15}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-15}}><p className="muted date-question">What are the dates for…</p><h2>{current.name}</h2><form onSubmit={check}><div className="date-fields"><label>START YEAR<input key={current.id} autoFocus value={start} onChange={e=>setStart(e.target.value)} placeholder="e.g. 1200 BCE" disabled={result!==null}/></label><ArrowRight size={20}/><label>END YEAR<input value={end} onChange={e=>setEnd(e.target.value)} placeholder="e.g. 200 CE" disabled={result!==null}/></label></div><p className="muted small">Include BCE or CE. Each endpoint has a ±50-year tolerance.</p>{result===null?<button className="button primary" disabled={!start||!end}>Check dates <Check size={16}/></button>:<div className={`drill-feedback ${result?'good':'bad'}`}><div><strong>{result?'Exactly in range.':'Keep this one close.'}</strong><p>{current.date}</p></div><button className="button primary" type="button" onClick={next}>Next <ArrowRight size={16}/></button></div>}</form></motion.div></AnimatePresence></div>;
}

function Ordering(){
  const [setIndex,setSetIndex]=useState(0),[pool]=useState(()=>shuffle(questions.ordering)),[order,setOrder]=useState(()=>shuffle(pool[0].periodIds)),[checked,setChecked]=useState(false);
  const correct=pool[setIndex].periodIds;
  function move(index,dir){const next=[...order];if(index+dir<0||index+dir>=next.length)return;[next[index],next[index+dir]]=[next[index+dir],next[index]];setOrder(next);setChecked(false);}
  function check(){setChecked(true);order.forEach((id,n)=>recordAttempt(id,correct[n]===id));}
  return <div className="panel ordering-drill"><div className="row justify-between"><span className="eyebrow">CHRONOLOGY / {setIndex+1} OF {pool.length}</span><span className="muted small">EARLIEST → LATEST</span></div><h2>Put history in order.</h2><p className="muted">Drag the cards to order their start dates. Use the arrows on a keyboard or iPad.</p><Reorder.Group axis="y" values={order} onReorder={value=>{setOrder(value);setChecked(false);}} className="ordering-list">{order.map((id,n)=>{const p=getPeriod(id);return <Reorder.Item value={id} key={id} className={`ordering-item ${checked?(correct[n]===id?'right':'wrong'):''}`}><GripVertical size={18}/><span className="order-index">0{n+1}</span><div><strong>{shortName(p.name)}</strong>{checked&&<small>{p.date}</small>}</div><button className="icon-button" disabled={n===0} aria-label={`Move ${p.name} earlier`} onClick={()=>move(n,-1)}><ArrowLeft size={16} style={{transform:'rotate(90deg)'}}/></button><button className="icon-button" disabled={n===order.length-1} aria-label={`Move ${p.name} later`} onClick={()=>move(n,1)}><ArrowDown size={16}/></button>{checked&&(correct[n]===id?<Check size={18}/>:<X size={18}/>)}</Reorder.Item>;})}</Reorder.Group>{checked?<div className="row justify-between"><span className="muted">{order.every((id,n)=>id===correct[n])?'The sequence is right.':`Correct sequence: ${correct.map(id=>shortName(getPeriod(id).name)).join(' → ')}`}</span><button className="button primary" onClick={()=>{const next=(setIndex+1)%pool.length;setSetIndex(next);setOrder(shuffle(pool[next].periodIds));setChecked(false);}}>Next set <ArrowRight size={16}/></button></div>:<button className="button primary" onClick={check}>Check order <Check size={16}/></button>}</div>;
}
