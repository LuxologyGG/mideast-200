import React, {useEffect, useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowRight, RotateCcw, Sparkles} from 'lucide-react';
import {qById} from '../content';
import {markQuestion, passCheck, shuffle} from '../lib/store';

export const isRight = (q, a) => a !== undefined && a !== null && a === q.answer;
export const optionsOf = q => q.type === 'tf' ? [true, false] : q.options.map((_, i) => i);
export const optLabel = (q, v) => q.type === 'tf' ? (v ? 'True' : 'False') : q.options[v];

// Number keys pick an option, Enter moves on. Ignored while typing in a field.
export function useAnswerKeys(q, answered, pick, next) {
  useEffect(() => {
    const h = e => {
      if (!q || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!answered) {
        const n = Number(e.key);
        if (n >= 1 && n <= optionsOf(q).length) pick(optionsOf(q)[n - 1]);
      } else if (e.key === 'Enter' && next) {e.preventDefault(); next();}
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });
}

export function Question({q, picked, onPick, reveal = true, num}) {
  const answered = picked !== null && picked !== undefined;
  const show = answered && reveal;
  return <div className="question">
    <div className="q-tags">
      {num !== undefined && <span className="chip">{num}</span>}
      <span className="chip">{q.type === 'tf' ? 'True / false' : 'Multiple choice'}</span>
      <a className="chip link" href={`#/class/${q.cls}`}>Class {q.cls}</a>
      {q.hard && <span className="chip hard">Harder</span>}
    </div>
    <h3>{q.prompt}</h3>
    <div className={`opts ${q.type}`}>
      {optionsOf(q).map((v, i) => {
        const state = show ? (v === q.answer ? 'right' : v === picked ? 'wrong' : 'fade') : v === picked ? 'picked' : '';
        return <button key={String(v)} className={`opt ${state}`} onClick={() => onPick(v)} disabled={show} aria-pressed={v === picked}>
          <kbd>{i + 1}</kbd><span>{optLabel(q, v)}</span>
        </button>;
      })}
    </div>
  </div>;
}

// Class practice check: 3 easier + 2 harder questions. A miss goes to the back of the line until it is answered right.
export function Check({cls, pool, onPassed}) {
  const fresh = () => {
    const easy = shuffle(pool.filter(q => !q.hard)), hard = shuffle(pool.filter(q => q.hard));
    let set = [...easy.slice(0, 3), ...hard.slice(0, 2)];
    if (set.length < 5) set = [...set, ...shuffle(pool.filter(q => !set.includes(q))).slice(0, 5 - set.length)];
    const ids = shuffle(set).map(q => q.id);
    return {set: ids, queue: ids, cleared: [], picked: null, tries: 0, misses: 0};
  };
  const [s, setS] = useState(fresh);
  const q = s.queue.length ? qById[s.queue[0]] : null;
  const answered = s.picked !== null;
  const ok = answered && q && isRight(q, s.picked);
  const pick = v => {if (answered || !q) return; const right = v === q.answer; markQuestion(q.id, right); setS({...s, picked: v, tries: s.tries + 1, misses: s.misses + (right ? 0 : 1)});};
  const next = () => {
    const [head, ...rest] = s.queue;
    const queue = ok ? rest : [...rest, head];
    const n = {...s, queue, cleared: ok ? [...s.cleared, head] : s.cleared, picked: null};
    setS(n);
    if (!queue.length) {passCheck(cls, n.tries); onPassed?.();}
  };
  useAnswerKeys(q, answered, pick, next);
  if (!pool.length) return null;
  if (!q) return <motion.div className="check done" initial={{opacity: 0, scale: .98}} animate={{opacity: 1, scale: 1}}>
    <Sparkles size={22}/>
    <div><h3>All five right.</h3><p className="muted">{s.tries} answers, {s.misses} missed along the way. Missed questions also show up on the Review page.</p></div>
    <button className="btn ghost" onClick={() => setS(fresh())}><RotateCcw size={14}/> New set of five</button>
  </motion.div>;
  return <div className="check">
    <div className="check-top">
      <p className="eyebrow">Practice check · 5 questions · misses come back until right</p>
      <div className="five" aria-label={`${s.cleared.length} of ${s.set.length} cleared`}>
        {s.set.map(id => <motion.i key={id} className={`${qById[id].hard ? 'h' : ''} ${s.cleared.includes(id) ? 'on' : ''} ${id === q.id ? 'cur' : ''}`} animate={s.cleared.includes(id) ? {scale: [1, 1.3, 1]} : {}}/>)}
      </div>
    </div>
    <Question q={q} picked={s.picked} onPick={pick}/>
    {answered && <motion.div className={`feedback ${ok ? 'ok' : 'no'}`} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}>
      <p><b>{ok ? 'Right.' : 'Not quite. This one comes back at the end.'}</b> {q.why}</p>
      <button className="btn primary" onClick={next}>Next <ArrowRight size={15}/></button>
    </motion.div>}
  </div>;
}

// Question drill over any pool (used on the Review page and for unit drills).
export function Drill({pool, title, onEnd}) {
  const order = useMemo(() => shuffle(pool.map(q => q.id)), [pool]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [right, setRight] = useState(0);
  const q = qById[order[i]];
  const answered = picked !== null;
  const pick = v => {if (answered) return; setPicked(v); const ok = v === q.answer; markQuestion(q.id, ok); if (ok) setRight(r => r + 1);};
  const next = () => {setPicked(null); setI(n => n + 1);};
  useAnswerKeys(q, answered, pick, next);
  if (!order.length) return <p className="muted">Nothing here yet.</p>;
  if (i >= order.length) return <div className="check done"><Sparkles size={22}/><div><h3>{right} of {order.length} right.</h3></div><button className="btn ghost" onClick={() => {setI(0); setRight(0); onEnd?.();}}><RotateCcw size={14}/> Again</button></div>;
  return <div className="check">
    <div className="check-top"><p className="eyebrow">{title} · {i + 1} of {order.length}</p><span className="muted small">{right} right so far</span></div>
    <Question q={q} picked={picked} onPick={pick}/>
    {answered && <motion.div className={`feedback ${picked === q.answer ? 'ok' : 'no'}`} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}>
      <p><b>{picked === q.answer ? 'Right.' : 'Not quite.'}</b> {q.why}</p>
      <button className="btn primary" onClick={next}>Next <ArrowRight size={15}/></button>
    </motion.div>}
  </div>;
}
