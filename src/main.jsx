import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AnimatePresence, MotionConfig, motion} from 'motion/react';
import {ArrowDownUp, ArrowRight, BookOpen, Check, ChevronRight, Clock3, Command, Focus, Image, Layers, Moon, Search, Sun, Target, Timer, Waypoints, MapPinned, X} from 'lucide-react';
import Timeline from './Timeline';
import MapQuiz from './MapQuiz';
import {Flashcards, ImageMatch} from './RecallModes';
import {ShortID, PracticeTest} from './ExamModes';
import {cards, periods, useProgress, useStoredState, isMastered} from './core';
import './styles.css';

const navigation=[
  {id:'timeline',label:'Timeline',icon:Waypoints,n:'01',description:'Put everything in context'},
  {id:'images',label:'Image match',icon:Image,n:'02',description:'Recognize the artifacts'},
  {id:'cards',label:'Flashcards',icon:Layers,n:'03',description:'Practice active recall'},
  {id:'short',label:'Short ID',icon:BookOpen,n:'04',description:'Find the words'},
  {id:'exam',label:'Practice test',icon:Timer,n:'05',description:'Make it a dress rehearsal'},
  {id:'weak',label:'Weak spots',icon:Target,n:'06',description:'Work on what needs it'},
  {id:'map',label:'Map quiz',icon:MapPinned,n:'07',description:'Revisit your geography practice'}
];

function App(){
  const [view,setView]=useStoredState('mideast-view','timeline');
  const [focusIds,setFocusIds]=useState([]),[search,setSearch]=useState(''),[searchOpen,setSearchOpen]=useState(false);
  const progress=useProgress();
  const mastered=cards.filter(c=>isMastered(progress,c.id)).length;
  const attempts=Object.values(progress.attempts).reduce((s,v)=>s+v.right+v.wrong,0);
  const active=navigation.find(n=>n.id===view)||navigation[0];
  const searchResults=search.trim()?cards.filter(c=>(c.name+' '+c.date+' '+c.location).toLowerCase().includes(search.toLowerCase())).slice(0,8):[];
  useEffect(()=>{const handler=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();setSearchOpen(v=>!v);}if(e.key==='Escape')setSearchOpen(false);};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);},[]);
  useEffect(()=>{const sync=()=>{const id=window.location.hash.slice(1);if(navigation.some(item=>item.id===id))setView(id);};sync();window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync);},[setView]);
  useEffect(()=>{const nav=document.querySelector('.main-nav'),item=nav?.querySelector('[aria-current=page]');if(nav&&item&&nav.scrollWidth>nav.clientWidth)nav.scrollTo({left:item.offsetLeft-nav.offsetLeft-(nav.clientWidth-item.clientWidth)/2,behavior:'smooth'});},[view]);
  const go=id=>{setView(id);window.history.replaceState(null,'','#'+id);window.scrollTo({top:0,behavior:'smooth'});};
  function drill(ids){setFocusIds(ids);setSearchOpen(false);setSearch('');go('cards');}
  return <MotionConfig reducedMotion="user"><div className="app-shell">
    <aside className="sidebar"><a className="brand" href="#timeline" onClick={e=>{e.preventDefault();go('timeline');}} aria-label="MIDEAST 200 home"><span className="brand-symbol">M<span>200</span></span><span className="brand-name">MIDEAST<span>STUDY SPACE</span></span></a><div className="sidebar-course"><span className="eyebrow">UNIVERSITY OF MICHIGAN</span><p>Unit 01 <span>/</span> Ancient world</p></div><nav className="main-nav" aria-label="Study modes">{navigation.map(({id,label,icon:Icon,n})=><button key={id} className={view===id?'active':''} onClick={()=>go(id)} aria-current={view===id?'page':undefined}><Icon size={18}/><span>{label}</span><small>{n}</small>{view===id&&<motion.i className="nav-indicator" layoutId="nav-active" transition={{type:'spring',stiffness:350,damping:35}}/>}</button>)}</nav><div className="sidebar-bottom"><div className="sidebar-progress"><div className="row justify-between"><span>Your progress</span><b>{mastered}<small> / 46</small></b></div><div className="progress-track"><motion.span animate={{width:mastered/46*100+'%'}}/></div><p>Cards mastered · saved on this device</p></div><div className="sidebar-footer"><span><i/> READY WHEN YOU ARE</span><button className="icon-button" aria-label="Search cards" onClick={()=>setSearchOpen(true)}><Search size={16}/></button></div></div></aside>
    <div className="workspace"><header className="topbar"><div className="breadcrumb">Study space <ChevronRight size={12}/><span>{active.label}</span></div><div className="topbar-actions"><button className="search-button" onClick={()=>setSearchOpen(true)} aria-label="Search the 46 cards"><Search size={16}/><span>Find a card</span><kbd>⌘ K</kbd></button><div className="exam-note"><span className="exam-dot"/><span>UNIT TEST 1 <b>Oct 15 · 1 PM</b></span></div></div></header>
    <main className="main-content"><AnimatePresence mode="wait"><motion.div key={view} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:.2}}>{view==='timeline'?<Timeline onDrill={drill}/>:view==='images'?<ImageMatch/>:view==='cards'?<Flashcards focusIds={focusIds} onClearFocus={()=>setFocusIds([])}/>:view==='short'?<ShortID/>:view==='exam'?<PracticeTest onDrill={drill}/>:view==='map'?<MapQuiz/>:<WeakSpots onDrill={drill}/>}</motion.div></AnimatePresence><footer className="page-footer"><span>Cross & DeGrado <span>·</span> MIDEAST 200</span><span>{attempts} recall attempts <span>·</span> Built for your next session</span></footer></main></div>
    <AnimatePresence>{searchOpen&&<motion.div className="search-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSearchOpen(false)}><motion.div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search cards" initial={{y:-15,scale:.98}} animate={{y:0,scale:1}} onClick={e=>e.stopPropagation()}><div className="search-field"><Search size={20}/><input autoFocus placeholder="Find a period, object, or idea…" value={search} onChange={e=>setSearch(e.target.value)}/><button className="icon-button" aria-label="Close search" onClick={()=>setSearchOpen(false)}><X size={18}/></button></div><div className="search-results">{searchResults.length?searchResults.map(c=><button key={c.id} onClick={()=>drill([c.id])}><span><b>{c.name}</b><small>{c.date}</small></span><ArrowRight size={16}/></button>):<p>{search?'No matching cards. Try another term.':'All 46 cards, one search away.'}</p>}</div><div className="search-footer">Select a result to practice it <kbd>ESC to close</kbd></div></motion.div></motion.div>}</AnimatePresence>
  </div></MotionConfig>;
}

function WeakSpots({onDrill}){
  const progress=useProgress();
  const [filter,setFilter]=useState('all'),[selected,setSelected]=useState([]),[query,setQuery]=useState('');
  const rows=useMemo(()=>cards.map(card=>{const attempt=progress.attempts[card.id]||{right:0,wrong:0};const total=attempt.right+attempt.wrong;return {...card,...attempt,total,rate:total?attempt.wrong/total:0,mastered:isMastered(progress,card.id)};}).sort((a,b)=>b.rate-a.rate||b.total-a.total||a.name.localeCompare(b.name)),[progress]);
  const visible=rows.filter(c=>(filter==='all'||filter==='missed'&&c.wrong||filter==='unseen'&&!c.total||filter==='mastered'&&c.mastered)&&c.name.toLowerCase().includes(query.toLowerCase()));
  const seen=rows.filter(c=>c.total).length,weak=rows.filter(c=>c.wrong).length,mastered=rows.filter(c=>c.mastered).length;
  return <section className="weak-mode"><div className="mode-header"><div><p className="eyebrow">06 / MAKE THE NEXT SESSION COUNT</p><h1>Your next focus.</h1><p className="muted">Every attempt tells you where to spend the next few minutes.</p></div><button className="button primary" onClick={()=>onDrill(selected.length?selected:rows.filter(c=>c.wrong).slice(0,10).map(c=>c.id))} disabled={!selected.length&&!weak}><Focus size={16}/>{selected.length?`Drill ${selected.length} selected`:'Drill weakest'}</button></div><div className="weak-stats">{[[seen,'Cards practiced','of 46'],[weak,'Need another look','ranked by miss rate'],[mastered,'Mastered','keep them warm']].map(([v,label,sub])=><div className="panel" key={label}><span className="muted">{label}</span><strong>{v.toString().padStart(2,'0')}</strong><small>{sub}</small></div>)}</div><div className="weak-toolbar"><div className="segmented">{[['all','All 46'],['missed','Missed'],['unseen','Unseen'],['mastered','Mastered']].map(([id,name])=><button key={id} className={filter===id?'active':''} onClick={()=>setFilter(id)}>{name}</button>)}</div><label className="weak-search"><Search size={15}/><input placeholder="Filter cards" value={query} onChange={e=>setQuery(e.target.value)}/></label></div><div className="weak-table panel"><div className="weak-table-head"><span>ITEM</span><span>MISS RATE</span><span>ATTEMPTS</span><span/></div>{visible.map((c,n)=><motion.div layout initial={{opacity:0}} animate={{opacity:1}} className="weak-table-row" key={c.id}><div className="weak-name"><input type="checkbox" aria-label={`Select ${c.name}`} checked={selected.includes(c.id)} onChange={()=>setSelected(ids=>ids.includes(c.id)?ids.filter(id=>id!==c.id):[...ids,c.id])}/><span><b>{c.name}</b><small>{c.type} {c.verifyWithSlides&&<span className="verify-text">· verify with slides</span>}</small></span></div><div className="weak-rate"><div className="progress-track"><motion.span animate={{width:c.rate*100+'%'}}/></div><span>{c.total?Math.round(c.rate*100)+'%':'—'}</span></div><div className="weak-attempts">{c.total||'—'}{c.mastered&&<Check size={12}/>}</div><button className="icon-button" onClick={()=>onDrill([c.id])} aria-label={`Drill ${c.name}`}><ArrowRight size={17}/></button></motion.div>)}{!visible.length&&<p className="weak-empty muted">No cards here yet. A few rounds of recall will fill this in.</p>}</div></section>;
}

createRoot(document.getElementById('root')).render(<App/>);
