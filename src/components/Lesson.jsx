import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowLeft, ArrowRight, Check, Flame, Rows3, RotateCcw, SquareStack} from 'lucide-react';
import GeoMap, {Basemap, GEO} from './GeoMap';
import {IdModel} from './ShortId';
import {CLASSES, IDS, SAME_AS, fmtYear} from '../content';
import {markRead, setBeat, useProgress} from '../lib/store';

const xyOf = name => GEO.places[name] || GEO.places[SAME_AS[name]];

export function MiniMap({m}) {
  const pins = m.pins.map(([n, label]) => ({xy: xyOf(n), label, key: n})).filter(p => p.xy);
  const arrows = (m.arrows || []).map(([a, b]) => [xyOf(a), xyOf(b)]).filter(([a, b]) => a && b);
  return <figure className="minimap">
    <GeoMap pins={pins} arrows={arrows} animate label={`Map showing ${pins.map(p => p.label).join(', ')}`}/>
    <figcaption>Basemap: Natural Earth. Pins mark modern locations.</figcaption>
  </figure>;
}

const wikiCache = new Map();
export function WikiImg({title}) {
  const [d, setD] = useState(() => wikiCache.get(title) ?? null);
  useEffect(() => {
    if (wikiCache.has(title)) {setD(wikiCache.get(title)); return undefined;}
    let live = true;
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`)
      .then(r => r.ok ? r.json() : null)
      .then(j => {
        const v = j?.thumbnail?.source ? {src: j.thumbnail.source.replace(/\/\d+px-/, '/500px-'), fallback: j.thumbnail.source, cap: j.title, url: j.content_urls?.desktop?.page} : false;
        wikiCache.set(title, v); if (live) setD(v);
      })
      .catch(() => {wikiCache.set(title, false); if (live) setD(false);});
    return () => {live = false;};
  }, [title]);
  if (d === false) return null;
  if (!d) return <div className="photo skel" aria-hidden/>;
  return <motion.figure className="photo" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: .4}}>
    <img src={d.src} alt={d.cap} loading="lazy" onError={e => {if (e.currentTarget.src !== d.fallback) e.currentTarget.src = d.fallback; else {wikiCache.set(title, false); setD(false);}}}/>
    <figcaption>{d.cap}{d.url && <> · <a href={d.url} target="_blank" rel="noreferrer">Wikipedia</a></>}</figcaption>
  </motion.figure>;
}

export function Stamp({s}) {
  const [run, setRun] = useState(0);
  return <figure className="stamp">
    <div className="stamp-base" key={run}>
      <svg viewBox="180 60 640 360" aria-hidden preserveAspectRatio="xMidYMid slice"><Basemap/></svg>
      <motion.span className="stamp-caption" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{duration: .4}}>{s.base}</motion.span>
      <motion.b className="stamp-label" initial={{opacity: 0, scale: 2.4, rotate: -18}} animate={{opacity: 1, scale: 1, rotate: -8}} transition={{delay: .8, type: 'spring', stiffness: 380, damping: 16}}>{s.bad}</motion.b>
      <svg className="stamp-x" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <motion.path d="M18 22 L82 78" initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{delay: 1.8, duration: .35}}/>
        <motion.path d="M82 22 L18 78" initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{delay: 2.15, duration: .35}}/>
      </svg>
    </div>
    <div className="stamp-good" key={`g${run}`}>{s.good.map((g, i) => <motion.span key={i} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 2.7 + i * .3}}>{g}</motion.span>)}</div>
    <button className="replay" onClick={() => setRun(r => r + 1)}><RotateCcw size={12}/> Replay</button>
  </figure>;
}

export function Visual({v}) {
  if (v.type === 'timeline') {
    const ys = v.events.map(e => e.y), lo = Math.min(...ys), hi = Math.max(...ys), span = Math.max(1, hi - lo);
    return <div className="vis-tl" role="list" aria-label="Timeline">
      <div className="vis-tl-line"/>
      {v.events.map((e, i) => <motion.div role="listitem" key={i} className={`vis-tl-ev ${i % 2 ? 'down' : ''}`} style={{left: `${6 + (e.y - lo) / span * 88}%`}}
        initial={{opacity: 0, scale: .6}} animate={{opacity: 1, scale: 1}} transition={{delay: .1 + i * .1}}>
        <i/><b>{fmtYear(e.y).replace(' CE', '')}</b><span>{e.t}</span>
      </motion.div>)}
    </div>;
  }
  if (v.type === 'compare') return <div className="vis-cmp">{[v.left, v.right].map((side, i) => <motion.div key={i} className="vis-cmp-col" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{delay: .15 + i * .15}}>
    {side.h && <b>{side.h}</b>}<ul>{side.items.map((x, j) => <li key={j}>{x}</li>)}</ul>
  </motion.div>)}</div>;
  if (v.type === 'flow') return <ol className="vis-flow">{v.steps.map((s, i) => <motion.li key={i} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} transition={{delay: .1 + i * .12}}>
    <span>{s}</span>{i < v.steps.length - 1 && <ArrowRight className="vis-flow-a" size={15} aria-hidden/>}
  </motion.li>)}</ol>;
  if (v.type === 'tree') return <div className="vis-tree"><div className="vis-tree-root">{v.root}</div><div className="vis-tree-kids">{v.children.map((k, i) => <motion.div key={i} className="vis-tree-kid" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{delay: .15 + i * .1}}><b>{k.n}</b><span>{k.s}</span></motion.div>)}</div></div>;
  return null;
}

function Beat({b, i, n}) {
  const media = b.scene || b.img || b.map;
  const id = b.id && IDS[b.id];
  return <article className={`beat ${b.myth ? 'myth' : ''}`}>
    <div className="beat-tags">
      <span className="chip">{i + 1} / {n}</span>
      {id && <a className="chip id" href={`#/class/${id.cls}?id=${b.id}`}>Short ID · {id.name}</a>}
      {b.myth && <span className="chip myth"><Flame size={12}/> Myth-buster</span>}
    </div>
    <h3>{b.h}</h3>
    <div className={`beat-body ${media ? 'has-media' : ''}`}>
      <ul className="points">{b.p.map(([ic, tx], j) => <motion.li key={j} initial={{opacity: 0, x: -6}} animate={{opacity: 1, x: 0}} transition={{delay: .08 * j + .05}}>
        <span className="ic" aria-hidden>{ic}</span><span>{tx}</span>
      </motion.li>)}</ul>
      {media && <div className="beat-media">{b.scene && <Stamp s={b.scene}/>}{b.img && <WikiImg title={b.img}/>}{b.map && <MiniMap m={b.map}/>}</div>}
    </div>
    {b.visual && <Visual v={b.visual}/>}
    {id && !id.pending && <IdModel id={b.id} compact/>}
  </article>;
}

export function Lesson({cls, onDone}) {
  const c = CLASSES[cls];
  const beats = c.lesson.beats;
  const prog = useProgress();
  const [all, setAll] = useState(false);
  const top = useRef(null);
  const i = Math.max(0, Math.min(prog.beat[cls] ?? 0, beats.length - 1));
  const goTo = n => {setBeat(cls, n); const el = top.current; if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({behavior: 'smooth', block: 'start'});};
  const finish = () => {markRead(cls); onDone?.();};
  const read = !!prog.read[cls];
  return <section className="lesson" ref={top} aria-label="Lesson">
    <div className="lesson-bar">
      {!all && <div className="beatbar">{beats.map((_, j) => <button key={j} className={j < i ? 'past' : j === i ? 'on' : ''} onClick={() => goTo(j)} aria-label={`Go to part ${j + 1}`}/>)}</div>}
      <button className="btn ghost small" onClick={() => setAll(a => !a)}>{all ? <><SquareStack size={14}/> One part at a time</> : <><Rows3 size={14}/> Show all parts</>}</button>
    </div>
    {all ? beats.map((b, j) => <Beat key={j} b={b} i={j} n={beats.length}/>)
      : <AnimatePresence mode="wait" initial={false}><motion.div key={i} initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -6}} transition={{duration: .22}}><Beat b={beats[i]} i={i} n={beats.length}/></motion.div></AnimatePresence>}
    <div className="lesson-ctrl">
      {!all && <button className="btn ghost" onClick={() => goTo(i - 1)} disabled={i === 0}><ArrowLeft size={15}/> Previous</button>}
      {!all && i < beats.length - 1 ? <button className="btn primary" onClick={() => goTo(i + 1)}>Next <ArrowRight size={15}/></button>
        : <button className="btn primary" onClick={finish}>{read ? <><Check size={15}/> Read · go to the check</> : 'Finish lesson and go to the check'}</button>}
    </div>
  </section>;
}
