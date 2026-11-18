import React, {useState} from 'react';
import {motion} from 'motion/react';
import {Check, ChevronDown, Eye, PenLine, RotateCcw} from 'lucide-react';
import {IDS} from '../content';
import {scoreId, useProgress} from '../lib/store';

export const RUBRIC = [
  {key: 'intro', pts: 2, label: t => t.kind === 'concept' ? 'Definition' : 'Time period + location'},
  {key: 'd1', pts: 1, label: () => 'Detail 1'},
  {key: 'd2', pts: 1, label: () => 'Detail 2'},
  {key: 'sig', pts: 1, label: () => 'Significance for the class'}
];

export function SrcTags({src = []}) {
  if (!src.length) return null;
  return <span className="src-tags">{src.map(s => <span key={s} className="src">{s}</span>)}</span>;
}

export function IdModel({id, compact = false}) {
  const t = IDS[id];
  const [open, setOpen] = useState(!compact);
  if (!t || t.pending) return null;
  return <div className={`idmodel ${open ? 'open' : ''}`}>
    <button className="idmodel-h" onClick={() => setOpen(o => !o)} aria-expanded={open}>
      <PenLine size={15}/><b>Model short ID: {t.name}</b><ChevronDown size={16} className="chev"/>
    </button>
    {open && <div className="idmodel-grid">
      {RUBRIC.map(r => <p key={r.key}><b>{r.label(t)}<small>{r.pts} {r.pts === 1 ? 'pt' : 'pts'}</small></b>{t[r.key]}</p>)}
      <SrcTags src={t.src}/>
    </div>}
  </div>;
}

export function IdPractice({id, onScored, compact = false}) {
  const t = IDS[id];
  const prog = useProgress();
  const [txt, setTxt] = useState('');
  const [shown, setShown] = useState(false);
  const [marks, setMarks] = useState({});
  const [saved, setSaved] = useState(false);
  if (!t) return null;
  const best = prog.ids[id]?.best;
  if (t.pending) return <article className="idcard pending" id={`id-${id}`}>
    <header><h3>{t.name}</h3><span className="chip pend">Pending</span></header>
    <p className="muted">Class {t.cls} slides are not in the course files yet, so there is no model answer. Use your lecture notes and the sources listed on <a href={`#/class/${t.cls}`}>the Class {t.cls} page</a>.</p>
  </article>;
  const score = RUBRIC.reduce((a, r) => a + (marks[r.key] ? r.pts : 0), 0);
  const reset = () => {setTxt(''); setShown(false); setMarks({}); setSaved(false);};
  return <article className="idcard" id={`id-${id}`}>
    <header>
      <h3>{t.name}</h3>
      <span className="chip">{t.kind === 'concept' ? 'Concept' : 'Artifact / event'}</span>
      <a className="chip link" href={`#/class/${t.cls}?id=${id}`}>Class {t.cls}</a>
      {best !== undefined && <span className={`chip score s${best}`}>Best {best}/5</span>}
    </header>
    {!compact && <p className="muted small">Write 3–4 sentences: {t.kind === 'concept' ? 'define it' : 'say when and where'}, give two details, then say why it matters for the class.</p>}
    <textarea value={txt} onChange={e => setTxt(e.target.value)} rows={compact ? 3 : 4} placeholder={`${t.name}…`} aria-label={`Your short ID for ${t.name}`}/>
    {!shown ? <div className="row">
      <button className="btn primary" onClick={() => setShown(true)}><Eye size={15}/> Show model answer</button>
    </div> : <motion.div className="grade" initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}>
      <p className="small muted">Tick each part your answer covered.</p>
      {RUBRIC.map(r => <label key={r.key} className={`rub ${marks[r.key] ? 'on' : ''}`}>
        <input type="checkbox" checked={!!marks[r.key]} onChange={e => {setMarks(m => ({...m, [r.key]: e.target.checked})); setSaved(false);}}/>
        <span className="rub-h">{r.label(t)} <small>{r.pts} {r.pts === 1 ? 'pt' : 'pts'}</small></span>
        <span className="rub-model">{t[r.key]}</span>
      </label>)}
      <div className="row grade-foot">
        <b className={`score-big s${score}`}>{score}/5</b>
        <button className="btn primary" onClick={() => {scoreId(id, score); setSaved(true); onScored?.(score);}} disabled={saved}>{saved ? <><Check size={15}/> Saved</> : 'Save score'}</button>
        <button className="btn ghost" onClick={reset}><RotateCcw size={14}/> Try again</button>
      </div>
      <SrcTags src={t.src}/>
    </motion.div>}
  </article>;
}
