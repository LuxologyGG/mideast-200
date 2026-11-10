import React, {useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowLeft, ArrowRight, Check, Clipboard, Clock3, Flame, PenLine, RotateCcw, Sparkles, X} from 'lucide-react';
import {CHRONO, CLASSES, DAYS, IDS, QUESTIONS, RUBRIC, TEST} from './data';
import {copyText, shuffle, useStoredState} from '../core';
import './unit2.css';

const qById = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
const chronoById = Object.fromEntries(CHRONO.map(c => [c.id, c]));
const blankDay = () => ({step: 0, dump: '', dumpStart: null, gaps: [], beat: {}, check: {}, retest: null, test: null, done: false});
const todayKey = () => {const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;};
const defaultDay = () => {const t = todayKey(); const hit = [...DAYS].reverse().find(d => d.date <= t); return hit ? hit.n : 1;};
const clock = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const yr = v => {const m = String(v || '').match(/\d{3,4}/); return m ? Number(m[0]) : null;};
const chronoOk = (c, a) => {const s = yr(a?.start), e = yr(a?.end); return s !== null && e !== null && Math.abs(s - c.start) <= 50 && Math.abs(e - c.end) <= 50;};
const isRight = (q, a) => a !== undefined && a === q.answer;

function useTicker(on) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {if (!on) return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t);}, [on]);
  return now;
}

export default function Unit2() {
  const [st, setSt] = useStoredState('u2-state', () => ({day: defaultDay(), days: {}, tally: {}, idScores: {}, chronoMiss: {}}));
  const dayN = st.day || 1;
  const day = DAYS.find(d => d.n === dayN);
  const ds = st.days[dayN] || blankDay();
  const setDay = fn => setSt(s => ({...s, days: {...s.days, [dayN]: fn(s.days[dayN] || blankDay())}}));
  const mark = (id, ok) => setSt(s => {const t = s.tally[id] || {r: 0, w: 0, streak: 0}; return {...s, tally: {...s.tally, [id]: {r: t.r + (ok ? 1 : 0), w: t.w + (ok ? 0 : 1), streak: ok ? t.streak + 1 : 0}}};});
  const weakIds = Object.entries(st.tally).filter(([, t]) => t.w > 0 && t.streak < 2).map(([id]) => id).filter(id => qById[id]);
  const steps = useMemo(() => stepsFor(day), [day]);
  const step = Math.min(ds.step, steps.length - 1);
  const go = n => {setDay(d => ({...d, step: Math.max(0, Math.min(steps.length - 1, n))})); window.scrollTo({top: 0, behavior: 'smooth'});};
  const next = () => go(step + 1);
  const cur = steps[step];
  const ctx = {st, setSt, ds, setDay, mark, day, next, weakIds};

  return <section className="u2">
    <header className="u2-head">
      <div><p className="eyebrow">UNIT 02 · MEDIEVAL AND EARLY MODERN · CLASSES 13–21</p><h1>One day at a time.</h1><p className="muted">Learn the day's classes, lock each one in with three right in a row, then take a mini test in the real format. {TEST.label}: {TEST.when}, {TEST.where}.</p></div>
    </header>
    <nav className="u2-days" aria-label="Study days">{DAYS.map(d => {const s = st.days[d.n]; const isToday = d.date === todayKey(); return <button key={d.n} className={`u2-day ${d.n === dayN ? 'active' : ''} ${s?.done ? 'done' : ''}`} onClick={() => setSt(x => ({...x, day: d.n}))}>
      <span className="u2-day-n">{s?.done ? <Check size={13}/> : `0${d.n}`}</span><span className="u2-day-t"><b>{d.label}</b><small>{dayTitle(d)}</small></span>{isToday && <i className="u2-today">TODAY</i>}
    </button>;})}</nav>
    <div className="u2-steps" role="list">{steps.map((s, i) => <button role="listitem" key={i} className={`${i === step ? 'on' : ''} ${i < step ? 'past' : ''}`} onClick={() => go(i)}><span>{i + 1}</span>{s.label}</button>)}</div>
    <AnimatePresence mode="wait"><motion.div key={`${dayN}-${step}`} initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -8}} transition={{duration: .22}}>
      {cur.kind === 'plan' && <Plan ctx={ctx} steps={steps}/>}
      {cur.kind === 'dump' && <Dump ctx={ctx}/>}
      {cur.kind === 'learn' && <Learn ctx={ctx} cls={cur.cls}/>}
      {cur.kind === 'retest' && <Retest ctx={ctx}/>}
      {cur.kind === 'test' && <Test ctx={ctx} full={false}/>}
      {cur.kind === 'full' && <Test ctx={ctx} full={true}/>}
      {cur.kind === 'weakq' && <WeakDrill ctx={ctx}/>}
      {cur.kind === 'weakid' && <IdPractice ctx={ctx}/>}
      {cur.kind === 'skim' && <Skim ctx={ctx}/>}
      {cur.kind === 'end' && <End ctx={ctx}/>}
    </motion.div></AnimatePresence>
    <div className="u2-nav"><button className="button ghost" onClick={() => go(step - 1)} disabled={step === 0}><ArrowLeft size={16}/> Back</button><span className="muted">Step {step + 1} of {steps.length}</span><button className="button secondary" onClick={next} disabled={step === steps.length - 1}>Skip ahead <ArrowRight size={16}/></button></div>
  </section>;
}

function dayTitle(d) {
  if (d.kind === 'full') return 'Full practice test';
  if (d.kind === 'weak') return 'Weak spots only';
  if (d.kind === 'skim') return '10-minute skim';
  return `Classes ${d.classes[0]}–${d.classes[d.classes.length - 1]}`;
}
function stepsFor(day) {
  if (day.kind === 'full') return [{kind: 'plan', label: 'Plan'}, {kind: 'full', label: 'Practice test'}, {kind: 'end', label: 'Done'}];
  if (day.kind === 'weak') return [{kind: 'plan', label: 'Plan'}, {kind: 'weakq', label: 'Missed questions'}, {kind: 'weakid', label: 'Short IDs'}, {kind: 'end', label: 'Done'}];
  if (day.kind === 'skim') return [{kind: 'skim', label: 'Skim'}];
  return [{kind: 'plan', label: 'Plan'}, {kind: 'dump', label: 'Brain dump'}, ...day.classes.map(c => ({kind: 'learn', cls: c, label: `Class ${c}`})), {kind: 'retest', label: 'Retest'}, {kind: 'test', label: 'Mini test'}, {kind: 'end', label: 'Done'}];
}

/* ---------- Plan ---------- */
function Plan({ctx, steps}) {
  const {day, next} = ctx;
  const ids = (day.classes || []).flatMap(c => CLASSES[c].ids);
  return <div className="u2-grid">
    <article className="panel u2-card">
      <p className="eyebrow">{day.label} · {day.time}</p>
      <h2>{dayTitle(day)}</h2>
      {day.classes && <div className="u2-classlist">{day.classes.map(c => <div key={c} className="u2-classrow"><span className="u2-cnum">{c}</span><div><b>{CLASSES[c].title}</b><small>{CLASSES[c].date}{CLASSES[c].pending ? ' · pending' : ''}</small></div></div>)}</div>}
      {day.kind === 'full' && <p>Closed notes, 30 minutes, the real format: true/false, multiple choice, chronology for all nine periods, and two short IDs from a pick of four. Then grade it and see your weakest classes.</p>}
      {day.kind === 'weak' && <p>No new material. Drill every question you have missed until you get it right twice in a row, then write the short IDs you scored lowest on.</p>}
      <ol className="u2-plan">{steps.slice(1, -1).map((s, i) => <li key={i}>{s.label}</li>)}</ol>
      <button className="button primary" onClick={next}>Start <ArrowRight size={16}/></button>
    </article>
    {day.classes && <article className="panel u2-card">
      <p className="eyebrow">ON THE TEST FROM TODAY</p>
      <h3>Short ID terms</h3>
      <div className="u2-chips">{ids.map(i => <span key={i} className={`chip ${IDS[i].pending ? 'dim' : ''}`}>{IDS[i].name}</span>)}</div>
      <h3>Chronology</h3>
      <div className="u2-chips">{day.chrono.map(c => <span key={c} className="chip">{chronoById[c].name} · {chronoById[c].start}–{chronoById[c].end}</span>)}</div>
      <h3>Guiding questions</h3>
      <ul className="u2-guiding">{day.classes.flatMap(c => CLASSES[c].guiding.map((g, i) => <li key={c + i}><span>{c}</span>{g}</li>))}</ul>
      <p className="muted small">T/F and multiple choice come from the guiding questions and the myth-busting slides, so those get extra weight here.</p>
    </article>}
  </div>;
}

/* ---------- Brain dump ---------- */
function Dump({ctx}) {
  const {ds, setDay, day, next} = ctx;
  const now = useTicker(!!ds.dumpStart);
  const left = ds.dumpStart ? Math.max(0, 300 - Math.floor((now - ds.dumpStart) / 1000)) : 300;
  const [reveal, setReveal] = useState(false);
  const items = day.classes.flatMap(c => [...CLASSES[c].beats.map((b, i) => ({key: `${c}:${i}`, c, t: b.h}))]);
  return <div className="u2-grid">
    <article className="panel u2-card">
      <p className="eyebrow">CLOSED NOTES · 5 MINUTES</p>
      <h2>Write everything you remember.</h2>
      <p className="muted">Classes {day.classes.join(', ')}. Names, dates, places, arguments, anything. Messy is fine. This tells you what you already own before you study.</p>
      <div className="row u2-timer"><span className={`timer ${left < 30 && ds.dumpStart ? 'urgent' : ''}`}><Clock3 size={16}/>{clock(left)}</span>{!ds.dumpStart ? <button className="button primary" onClick={() => setDay(d => ({...d, dumpStart: Date.now()}))}>Start the clock</button> : <button className="button ghost" onClick={() => setDay(d => ({...d, dumpStart: null}))}><RotateCcw size={14}/> Reset clock</button>}</div>
      <textarea rows={12} value={ds.dump} onChange={e => setDay(d => ({...d, dump: e.target.value, dumpStart: d.dumpStart || Date.now()}))} placeholder="Start typing. The clock starts when you do."/>
      <div className="row"><button className="button secondary" onClick={() => setReveal(true)}>I'm done, check for gaps</button></div>
    </article>
    <article className="panel u2-card">
      <p className="eyebrow">STEP 2 · CHECK AGAINST YOUR NOTES</p>
      <h3>Tap anything your dump missed</h3>
      <p className="muted small">Open your class sheets too. Gaps you tap here get flagged during the lessons.</p>
      {!reveal ? <div className="u2-locked">Finish the dump first. <button className="button ghost" onClick={() => setReveal(true)}>Show anyway</button></div> :
        <div className="u2-gaplist">{items.map(it => {const on = ds.gaps.includes(it.key); return <button key={it.key} className={`u2-gap ${on ? 'on' : ''}`} onClick={() => setDay(d => ({...d, gaps: on ? d.gaps.filter(x => x !== it.key) : [...d.gaps, it.key]}))}><span>{it.c}</span>{it.t}{on && <X size={13}/>}</button>;})}</div>}
      {reveal && <button className="button primary" onClick={next}>Start learning <ArrowRight size={16}/></button>}
    </article>
  </div>;
}

/* ---------- Learn ---------- */
function Learn({ctx, cls}) {
  const {ds, setDay, mark, next} = ctx;
  const c = CLASSES[cls];
  const beats = c.beats;
  const bi = ds.beat[cls] ?? 0;
  const phase = bi >= beats.length ? 'check' : 'read';
  const setBeat = n => setDay(d => ({...d, beat: {...d.beat, [cls]: n}}));
  const pool = QUESTIONS.filter(q => q.cls === cls);
  if (!beats.length) return <article className="panel u2-card u2-pending"><p className="eyebrow">CLASS {cls} · {c.date}</p><h2>{c.title}</h2><p>{c.pending}</p><p className="muted">On the study guide from this class: {c.ids.map(i => IDS[i].name).join(', ')}.</p><button className="button primary" onClick={next}>Continue <ArrowRight size={16}/></button></article>;
  if (phase === 'read') {
    const b = beats[bi];
    const gap = ds.gaps.includes(`${cls}:${bi}`);
    return <div className="u2-learn">
      <div className="u2-learn-top"><p className="eyebrow">CLASS {cls} · {c.title.toUpperCase()}</p><div className="u2-beatbar">{beats.map((_, i) => <i key={i} className={i < bi ? 'past' : i === bi ? 'on' : ''}/>)}<i className="check"/></div></div>
      {c.pending && bi === 0 && <div className="badge verify u2-pend-note">{c.pending}</div>}
      <article className={`panel u2-beat ${b.myth ? 'myth' : ''}`}>
        <div className="row u2-beat-tags"><span className="chip">{bi + 1} / {beats.length}</span>{b.id && <span className="chip id">Short ID: {IDS[b.id].name}</span>}{b.myth && <span className="chip myth"><Flame size={12}/> Myth-buster</span>}{gap && <span className="chip gap">You missed this in your dump</span>}</div>
        <h2>{b.h}</h2>
        <ul className="u2-points">{b.p.map((p, i) => <motion.li key={i} initial={{opacity: 0, x: -8}} animate={{opacity: 1, x: 0}} transition={{delay: .08 * i + .1}}>{p}</motion.li>)}</ul>
        {b.visual && <Visual v={b.visual}/>}
        {b.id && !IDS[b.id].pending && <IdCard id={b.id} compact/>}
      </article>
      <div className="row u2-learn-ctrl"><button className="button ghost" onClick={() => setBeat(bi - 1)} disabled={bi === 0}><ArrowLeft size={16}/> Previous</button><button className="button primary" onClick={() => setBeat(bi + 1)}>{bi === beats.length - 1 ? 'Check yourself' : 'Next'} <ArrowRight size={16}/></button></div>
    </div>;
  }
  return <Streak key={cls} pool={pool} goal={3} title={`Class ${cls}: three right in a row`} state={ds.check[cls]} save={v => setDay(d => ({...d, check: {...d.check, [cls]: v}}))} mark={mark} onDone={next} onReview={() => setBeat(0)}/>;
}

function IdCard({id, compact}) {
  const t = IDS[id];
  const [open, setOpen] = useState(!compact);
  return <div className="u2-idcard">
    <button className="u2-idcard-h" onClick={() => setOpen(o => !o)}><PenLine size={14}/><b>How to write this ID</b><span className="muted">{open ? 'Hide' : 'Show'}</span></button>
    {open && <div className="u2-idgrid"><p><b>{t.kind === 'concept' ? 'Definition' : 'When + where'}<small>2 pts</small></b>{t.intro}</p><p><b>Detail 1<small>1 pt</small></b>{t.d1}</p><p><b>Detail 2<small>1 pt</small></b>{t.d2}</p><p><b>Significance<small>1 pt</small></b>{t.sig}</p>{t.fromRoadmap && <span className="badge verify">From the roadmap, check against lecture</span>}</div>}
  </div>;
}

/* ---------- Visuals ---------- */
function Visual({v}) {
  if (v.type === 'timeline') {
    const ys = v.events.map(e => e.y), lo = Math.min(...ys), hi = Math.max(...ys), span = Math.max(1, hi - lo);
    return <div className="u2-tl"><div className="u2-tl-line"/>{v.events.map((e, i) => <motion.div key={i} className={`u2-tl-ev ${i % 2 ? 'down' : ''}`} style={{left: `${4 + (e.y - lo) / span * 92}%`}} initial={{opacity: 0, scale: .6}} animate={{opacity: 1, scale: 1}} transition={{delay: .15 + i * .12}}><i/><b>{e.y}</b><span>{e.t}</span></motion.div>)}</div>;
  }
  if (v.type === 'compare') return <div className="u2-cmp">{[v.left, v.right].map((side, i) => <motion.div key={i} className="u2-cmp-col" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{delay: .2 + i * .15}}>{side.h && <b>{side.h}</b>}<ul>{side.items.map((x, j) => <li key={j}>{x}</li>)}</ul></motion.div>)}</div>;
  if (v.type === 'flow') return <div className="u2-flow">{v.steps.map((s, i) => <React.Fragment key={i}><motion.div className="u2-flow-s" initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} transition={{delay: .15 + i * .14}}>{s}</motion.div>{i < v.steps.length - 1 && <ArrowRight className="u2-flow-a" size={16}/>}</React.Fragment>)}</div>;
  if (v.type === 'tree') return <div className="u2-tree"><div className="u2-tree-root">{v.root}</div><div className="u2-tree-kids">{v.children.map((k, i) => <motion.div key={i} className="u2-tree-kid" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{delay: .2 + i * .12}}><b>{k.n}</b><span>{k.s}</span></motion.div>)}</div></div>;
  return null;
}

/* ---------- Streak drill ---------- */
function Streak({pool, goal, title, state, save, mark, onDone, onReview}) {
  const s = state || {streak: 0, seen: [], cur: null, picked: null, total: 0, wrong: 0};
  const order = useMemo(() => shuffle(pool.map(q => q.id)), []); // eslint-disable-line react-hooks/exhaustive-deps
  const curId = s.cur || order.find(id => !s.seen.includes(id)) || order[0];
  const q = qById[curId];
  const answered = s.picked !== null && s.picked !== undefined;
  const ok = answered && isRight(q, s.picked);
  const done = s.streak >= goal;
  function pick(v) {if (answered) return; const right = v === q.answer; mark(q.id, right); save({...s, cur: q.id, picked: v, streak: right ? s.streak + 1 : 0, total: s.total + 1, wrong: s.wrong + (right ? 0 : 1)});}
  function advance() {const seen = [...s.seen, q.id]; const rest = order.filter(id => !seen.includes(id)); const nextId = rest.length ? rest[0] : shuffle(order.filter(id => id !== q.id))[0]; save({...s, seen: rest.length ? seen : [], cur: nextId, picked: null});}
  useEffect(() => {const h = e => {if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return; if (!answered && !done) {const n = Number(e.key); if (q.type === 'tf' && (n === 1 || n === 2)) pick(n === 1); if (q.type === 'mc' && n >= 1 && n <= q.options.length) pick(n - 1);} else if (e.key === 'Enter' && answered && !done) advance();}; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);});
  if (done) return <article className="panel u2-card u2-win"><Sparkles size={22}/><h2>Locked in.</h2><p className="muted">{goal} in a row. {s.total} questions, {s.wrong} missed. Misses come back in the retest and on Weak spots day.</p><div className="row"><button className="button primary" onClick={onDone}>Next <ArrowRight size={16}/></button><button className="button ghost" onClick={() => save({streak: 0, seen: [], cur: null, picked: null, total: 0, wrong: 0})}><RotateCcw size={14}/> Go again</button>{onReview && <button className="button ghost" onClick={onReview}>Reread the lesson</button>}</div></article>;
  return <div className="u2-drill">
    <div className="row justify-between u2-drill-top"><p className="eyebrow">{title}</p><div className="u2-streak">{Array.from({length: goal}).map((_, i) => <motion.i key={i} className={i < s.streak ? 'on' : ''} animate={i < s.streak ? {scale: [1, 1.35, 1]} : {}}/>)}</div></div>
    <Question q={q} picked={s.picked} onPick={pick}/>
    {answered && <motion.div className={`u2-feedback ${ok ? 'ok' : 'no'}`} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}><b>{ok ? 'Right.' : 'Not quite, streak resets.'}</b> {q.why}<button className="button primary" onClick={advance}>Next question <ArrowRight size={16}/></button></motion.div>}
  </div>;
}

function Question({q, picked, onPick, lockReveal}) {
  const answered = picked !== null && picked !== undefined;
  const reveal = answered && !lockReveal;
  const opts = q.type === 'tf' ? [true, false] : q.options.map((_, i) => i);
  const label = v => q.type === 'tf' ? (v ? 'True' : 'False') : q.options[v];
  return <article className="panel u2-q"><span className="chip">{q.type === 'tf' ? 'True / false' : 'Multiple choice'} · Class {q.cls}</span><h3>{q.prompt}</h3><div className="u2-opts">{opts.map((v, i) => {const cls = reveal ? (v === q.answer ? 'right' : v === picked ? 'wrong' : 'fade') : v === picked ? 'picked' : ''; return <button key={String(v)} className={`u2-opt ${cls}`} onClick={() => onPick(v)} disabled={reveal}><kbd>{i + 1}</kbd>{label(v)}</button>;})}</div></article>;
}

/* ---------- Retest ---------- */
function Retest({ctx}) {
  const {ds, setDay, mark, day, next, weakIds} = ctx;
  const prevClasses = DAYS.filter(d => d.n < day.n && d.classes).flatMap(d => d.classes);
  const list = useMemo(() => {
    if (ds.retest?.ids) return ds.retest.ids;
    let ids = day.n === 1 ? QUESTIONS.filter(q => q.retest).map(q => q.id) : weakIds.filter(id => prevClasses.includes(qById[id].cls));
    if (day.n > 1 && ids.length < 5) ids = [...ids, ...shuffle(QUESTIONS.filter(q => prevClasses.includes(q.cls) && !ids.includes(q.id)).map(q => q.id)).slice(0, 6 - ids.length)];
    return shuffle(ids).slice(0, 10);
  }, []);
  const r = ds.retest || {ids: list, i: 0, picked: null, right: 0};
  useEffect(() => {if (!ds.retest) setDay(d => ({...d, retest: r}));}, []);
  if (!list.length) return <article className="panel u2-card"><h2>Nothing to retest yet.</h2><button className="button primary" onClick={next}>Mini test <ArrowRight size={16}/></button></article>;
  if (r.i >= r.ids.length) return <article className="panel u2-card u2-win"><Sparkles size={22}/><h2>Retest done: {r.right} / {r.ids.length}</h2><p className="muted">Spacing works because you had to pull these back after a gap.</p><button className="button primary" onClick={next}>Mini test <ArrowRight size={16}/></button></article>;
  const q = qById[r.ids[r.i]];
  const answered = r.picked !== null;
  const save = v => setDay(d => ({...d, retest: v}));
  return <div className="u2-drill">
    <div className="row justify-between u2-drill-top"><p className="eyebrow">RETEST · {r.i + 1} OF {r.ids.length}</p><span className="muted small">{day.n === 1 ? day.retestLabel : 'Your misses from earlier days.'}</span></div>
    <Question q={q} picked={answered ? r.picked : null} onPick={v => {if (answered) return; const ok = v === q.answer; mark(q.id, ok); save({...r, picked: v, right: r.right + (ok ? 1 : 0)});}}/>
    {answered && <div className={`u2-feedback ${r.picked === q.answer ? 'ok' : 'no'}`}><b>{r.picked === q.answer ? 'Right.' : 'Missed.'}</b> {q.why}<button className="button primary" onClick={() => save({...r, i: r.i + 1, picked: null})}>Next <ArrowRight size={16}/></button></div>}
  </div>;
}

/* ---------- Tests ---------- */
function buildTest(day, full) {
  const classes = full ? [13, 14, 15, 16, 17, 18, 19, 20] : day.classes;
  const pool = QUESTIONS.filter(q => classes.includes(q.cls));
  const tf = shuffle(pool.filter(q => q.type === 'tf')).slice(0, full ? 10 : 5).map(q => q.id);
  const mc = shuffle(pool.filter(q => q.type === 'mc')).slice(0, full ? 10 : 5).map(q => q.id);
  const chrono = full ? CHRONO.map(c => c.id) : day.chrono;
  let idPool = Object.keys(IDS).filter(k => !IDS[k].pending && classes.includes(IDS[k].cls));
  if (idPool.length < 4) idPool = [...idPool, ...shuffle(Object.keys(IDS).filter(k => !IDS[k].pending && !idPool.includes(k))).slice(0, 4 - idPool.length)];
  return {tf, mc, chrono, ids: shuffle(idPool).slice(0, 4), answers: {}, dates: {}, picked: [], drafts: {}, scores: {}, finished: false, started: Date.now()};
}

function Test({ctx, full}) {
  const {ds, setDay, setSt, mark, day, next} = ctx;
  const t = ds.test;
  const limit = full ? 1800 : 900;
  const now = useTicker(!!t && !t.finished);
  const left = t ? Math.max(0, limit - Math.floor((now - t.started) / 1000)) : limit;
  const save = fn => setDay(d => ({...d, test: fn(d.test)}));
  if (!t) return <article className="panel u2-card"><p className="eyebrow">{full ? 'FULL PRACTICE TEST · 30 MINUTES' : 'MINI TEST · 15 MINUTES'}</p><h2>{full ? 'Dress rehearsal.' : 'Same format as the real test.'}</h2><p>{full ? '10 true/false, 10 multiple choice, all nine chronology spans, then pick 2 of 4 short IDs.' : '5 true/false, 5 multiple choice, chronology for today\'s periods, then pick 2 of 4 short IDs.'} Closed notes. Chronology counts if you are within 50 years.</p><button className="button primary" onClick={() => setDay(d => ({...d, test: buildTest(day, full)}))}>Start <ArrowRight size={16}/></button></article>;
  const score = () => {const tf = t.tf.filter(id => isRight(qById[id], t.answers[id])).length, mc = t.mc.filter(id => isRight(qById[id], t.answers[id])).length, ch = t.chrono.filter(id => chronoOk(chronoById[id], t.dates[id])).length; return {tf, mc, ch};};
  function finish() {
    [...t.tf, ...t.mc].forEach(id => mark(id, isRight(qById[id], t.answers[id])));
    setSt(s => {const cm = {...s.chronoMiss}; t.chrono.forEach(id => {if (!chronoOk(chronoById[id], t.dates[id])) cm[id] = (cm[id] || 0) + 1; else delete cm[id];}); return {...s, chronoMiss: cm};});
    save(x => ({...x, finished: true}));
  }
  if (t.finished) {
    const sc = score();
    const idTotal = t.picked.reduce((a, id) => a + Object.values(t.scores[id] || {}).reduce((x, y) => x + y, 0), 0);
    const byClass = {}; [...t.tf, ...t.mc].forEach(id => {const q = qById[id]; byClass[q.cls] = byClass[q.cls] || {r: 0, n: 0}; byClass[q.cls].n++; if (isRight(q, t.answers[id])) byClass[q.cls].r++;});
    const ranked = Object.entries(byClass).sort((a, b) => a[1].r / a[1].n - b[1].r / b[1].n);
    return <div className="stack">
      <article className="panel u2-card u2-result"><p className="eyebrow">RESULTS</p><div className="u2-scores"><div><strong>{sc.tf}/{t.tf.length}</strong><span>True / false</span></div><div><strong>{sc.mc}/{t.mc.length}</strong><span>Multiple choice</span></div><div><strong>{sc.ch}/{t.chrono.length}</strong><span>Chronology</span></div><div><strong>{idTotal}/{t.picked.length * 5}</strong><span>Short IDs (self-scored)</span></div></div>
        {full && <><h3>Weakest classes first</h3><div className="u2-rank">{ranked.map(([c, v]) => <div key={c}><span>Class {c}</span><div className="progress-track"><motion.span animate={{width: `${v.r / v.n * 100}%`}}/></div><b>{v.r}/{v.n}</b></div>)}</div></>}
      </article>
      <article className="panel u2-card"><h3>Review every miss</h3>{[...t.tf, ...t.mc].filter(id => !isRight(qById[id], t.answers[id])).map(id => {const q = qById[id]; return <div key={id} className="u2-miss"><b>{q.prompt}</b><span>{(() => {const ans = q.type === 'tf' ? (q.answer ? 'True' : 'False') : q.options[q.answer]; return q.why.startsWith(ans) ? q.why : `Answer: ${ans}. ${q.why}`;})()}</span></div>;})}{t.chrono.filter(id => !chronoOk(chronoById[id], t.dates[id])).map(id => {const c = chronoById[id]; return <div key={id} className="u2-miss"><b>{c.name}: {c.start}–{c.end}</b><span>You wrote {t.dates[id]?.start || '?'}–{t.dates[id]?.end || '?'}. {c.hook}</span></div>;})}{score().tf + score().mc === t.tf.length + t.mc.length && score().ch === t.chrono.length && <p className="muted">No misses on the auto-graded parts.</p>}</article>
      <article className="panel u2-card"><h3>Score your short IDs</h3><p className="muted small">Be strict: 2 for time + place or definition, 2 for two details, 1 for significance.</p>{t.picked.map(id => <div key={id} className="u2-idscore"><h4>{IDS[id].name}</h4><p className="u2-yours">{t.drafts[id] || '(nothing written)'}</p><IdCard id={id}/><Rubric values={t.scores[id] || {}} onChange={(k, v) => {save(x => ({...x, scores: {...x.scores, [id]: {...(x.scores[id] || {}), [k]: v}}})); setSt(s => {const vals = {...(t.scores[id] || {}), [k]: v}; return {...s, idScores: {...s.idScores, [id]: Object.values(vals).reduce((a, b) => a + b, 0)}};});}}/></div>)}</article>
      <div className="row"><button className="button primary" onClick={next}>Finish the day <ArrowRight size={16}/></button><button className="button ghost" onClick={() => setDay(d => ({...d, test: buildTest(day, full)}))}><RotateCcw size={14}/> New test</button></div>
    </div>;
  }
  const answered = [...t.tf, ...t.mc].filter(id => t.answers[id] !== undefined).length;
  return <div className="stack">
    <div className="panel u2-testbar"><span className={`timer ${left < 60 ? 'urgent' : ''}`}><Clock3 size={16}/>{clock(left)}</span><span>{answered} / {t.tf.length + t.mc.length} answered</span><span>{t.picked.length} / 2 IDs picked</span>{left === 0 && <span className="badge verify">Time. Finish up.</span>}</div>
    <h3 className="u2-sec">Section 1 · True or false</h3>
    {t.tf.map(id => <Question key={id} q={qById[id]} picked={t.answers[id]} lockReveal onPick={v => save(x => ({...x, answers: {...x.answers, [id]: v}}))}/>)}
    <h3 className="u2-sec">Section 2 · Multiple choice</h3>
    {t.mc.map(id => <Question key={id} q={qById[id]} picked={t.answers[id]} lockReveal onPick={v => save(x => ({...x, answers: {...x.answers, [id]: v}}))}/>)}
    <h3 className="u2-sec">Section 3 · Chronology <small className="muted">within 50 years counts</small></h3>
    <div className="panel u2-chrono">{t.chrono.map(id => <div key={id} className="u2-chrono-row"><b>{chronoById[id].name}</b><input inputMode="numeric" placeholder="Start" value={t.dates[id]?.start || ''} onChange={e => save(x => ({...x, dates: {...x.dates, [id]: {...(x.dates[id] || {}), start: e.target.value}}}))}/><span>to</span><input inputMode="numeric" placeholder="End" value={t.dates[id]?.end || ''} onChange={e => save(x => ({...x, dates: {...x.dates, [id]: {...(x.dates[id] || {}), end: e.target.value}}}))}/><span className="muted">CE</span></div>)}</div>
    <h3 className="u2-sec">Section 4 · Short IDs <small className="muted">pick 2 of 4, 3–4 sentences each</small></h3>
    <div className="u2-idpick">{t.ids.map(id => {const on = t.picked.includes(id); return <button key={id} className={`u2-pickcard ${on ? 'on' : ''}`} onClick={() => save(x => ({...x, picked: on ? x.picked.filter(p => p !== id) : x.picked.length < 2 ? [...x.picked, id] : x.picked}))}><span>{on ? <Check size={14}/> : '+'}</span>{IDS[id].name}</button>;})}</div>
    {t.picked.map(id => <label key={id} className="u2-idwrite"><b>{IDS[id].name}</b><textarea rows={5} value={t.drafts[id] || ''} onChange={e => save(x => ({...x, drafts: {...x.drafts, [id]: e.target.value}}))} placeholder="When and where (or definition). Two details. Why it matters for our class."/></label>)}
    <div className="row u2-submit"><button className="button primary" onClick={finish}>Finish and grade</button><span className="muted small">Answers save on this device as you go.</span></div>
  </div>;
}

function Rubric({values, onChange}) {
  return <div className="u2-rubric">{RUBRIC.map(r => <div key={r.key}><span>{r.label}</span><div className="segmented">{Array.from({length: r.max + 1}).map((_, n) => <button key={n} className={values[r.key] === n ? 'active' : ''} onClick={() => onChange(r.key, n)}>{n}</button>)}</div></div>)}<b>{Object.values(values).reduce((a, b) => a + b, 0)} / 5</b></div>;
}

/* ---------- Weak spots day ---------- */
function WeakDrill({ctx}) {
  const {weakIds, mark, next} = ctx;
  const [queue, setQueue] = useState(() => shuffle(weakIds));
  const [picked, setPicked] = useState(null);
  if (!queue.length) return <article className="panel u2-card u2-win"><Sparkles size={22}/><h2>No missed questions left.</h2><p className="muted">Every miss has now been answered right twice in a row.</p><button className="button primary" onClick={next}>Short IDs <ArrowRight size={16}/></button></article>;
  const q = qById[queue[0]];
  const answered = picked !== null;
  return <div className="u2-drill">
    <div className="row justify-between u2-drill-top"><p className="eyebrow">MISSED QUESTIONS · {queue.length} LEFT</p><span className="muted small">Right twice in a row clears it. Wrong sends it to the back.</span></div>
    <Question q={q} picked={picked} onPick={v => {if (answered) return; setPicked(v); mark(q.id, v === q.answer);}}/>
    {answered && <div className={`u2-feedback ${picked === q.answer ? 'ok' : 'no'}`}><b>{picked === q.answer ? 'Right.' : 'Missed.'}</b> {q.why}<button className="button primary" onClick={() => {setQueue(list => {const [h, ...rest] = list; return picked === q.answer ? rest : [...rest, h];}); setPicked(null);}}>Next <ArrowRight size={16}/></button></div>}
  </div>;
}

function IdPractice({ctx}) {
  const {st, setSt, next} = ctx;
  const ready = Object.keys(IDS).filter(k => !IDS[k].pending);
  const list = ready.filter(k => (st.idScores[k] ?? -1) < 4).sort((a, b) => (st.idScores[a] ?? -1) - (st.idScores[b] ?? -1));
  const [i, setI] = useState(0), [draft, setDraft] = useState(''), [shown, setShown] = useState(false), [sc, setSc] = useState({});
  if (i >= list.length) return <article className="panel u2-card u2-win"><Sparkles size={22}/><h2>Every short ID is at 4 or better.</h2><button className="button primary" onClick={next}>Done <ArrowRight size={16}/></button></article>;
  const id = list[i];
  return <article className="panel u2-card"><p className="eyebrow">SHORT ID {i + 1} OF {list.length} · LOWEST SCORES FIRST</p><h2>{IDS[id].name}</h2><textarea rows={6} value={draft} onChange={e => setDraft(e.target.value)} placeholder="3–4 sentences, closed notes."/>
    {!shown ? <button className="button secondary" onClick={() => setShown(true)}>Compare with the model</button> : <><IdCard id={id}/><Rubric values={sc} onChange={(k, v) => {const nv = {...sc, [k]: v}; setSc(nv); setSt(s => ({...s, idScores: {...s.idScores, [id]: Object.values(nv).reduce((a, b) => a + b, 0)}}));}}/><button className="button primary" onClick={() => {setI(i + 1); setDraft(''); setShown(false); setSc({});}}>Next ID <ArrowRight size={16}/></button></>}
  </article>;
}

/* ---------- Skim + end ---------- */
function WeakList({st}) {
  const weak = Object.entries(st.tally).filter(([id, t]) => qById[id] && t.w > 0 && t.streak < 2).map(([id]) => qById[id]);
  const lowIds = Object.entries(st.idScores).filter(([, v]) => v < 4).map(([k]) => IDS[k]?.name).filter(Boolean);
  const ch = Object.keys(st.chronoMiss).map(id => chronoById[id]).filter(Boolean);
  return {weak, lowIds, ch, text: [`MIDEAST Unit Test 2 weak spots (${new Date().toLocaleDateString()})`, ...weak.map(q => `- Class ${q.cls}: ${q.prompt}`), ...lowIds.map(n => `- Short ID under 4/5: ${n}`), ...ch.map(c => `- Chronology: ${c.name} ${c.start}–${c.end}`)].join('\n')};
}

function Skim({ctx}) {
  const {st} = ctx;
  const w = WeakList({st});
  return <div className="stack">
    <article className="panel u2-card"><p className="eyebrow">10 MINUTES · THEN WALK TO UMMA</p><h2>The chain</h2><div className="u2-chain">{CHRONO.map((c, i) => <motion.div key={c.id} className="u2-link" initial={{opacity: 0, x: -10}} animate={{opacity: 1, x: 0}} transition={{delay: i * .06}}><b>{c.start}–{c.end}</b><span>{c.name}</span><small>{c.hook}</small></motion.div>)}</div></article>
    <article className="panel u2-card"><h3>Your weak spots</h3>{w.weak.length + w.lowIds.length + w.ch.length === 0 ? <p className="muted">None logged.</p> : <ul className="u2-weak">{w.weak.map(q => <li key={q.id}><span>{q.cls}</span>{q.prompt} <b>{q.type === 'tf' ? (q.answer ? 'True' : 'False') : q.options[q.answer]}</b></li>)}{w.lowIds.map(n => <li key={n}><span>ID</span>{n}</li>)}{w.ch.map(c => <li key={c.id}><span>Date</span>{c.name}: {c.start}–{c.end}</li>)}</ul>}</article>
    <article className="panel u2-card"><h3>All 25 IDs, one line each</h3><div className="u2-hooks">{Object.entries(IDS).map(([k, t]) => <div key={k}><b>{t.name}</b><span>{t.hook}</span><small>Class {t.cls}</small></div>)}</div></article>
  </div>;
}

function End({ctx}) {
  const {st, setDay, day} = ctx;
  const w = WeakList({st});
  const [copied, setCopied] = useState(false);
  useEffect(() => {setDay(d => ({...d, done: true}));}, []);
  const nextDay = DAYS.find(d => d.n === day.n + 1);
  return <article className="panel u2-card u2-win"><Sparkles size={22}/><h2>Day {day.n} done.</h2><p className="muted">{w.weak.length} questions, {w.lowIds.length} short IDs and {w.ch.length} date spans on your weak list.{nextDay ? ` Next: ${nextDay.label}, ${nextDay.time}.` : ''}</p>
    <div className="row"><button className="button secondary" onClick={async () => setCopied(await copyText(w.text))}><Clipboard size={16}/> {copied ? 'Copied' : 'Copy weak list for Notion'}</button></div>
  </article>;
}
