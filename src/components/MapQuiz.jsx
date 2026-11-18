import React, {useEffect, useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowRight, Check, Clock3, Eye, MapPin, RotateCcw, Sparkles, X} from 'lucide-react';
import GeoMap, {GEO} from './GeoMap';
import {QUIZ, QUIZ_GROUPS, norm} from '../content';
import {markMap, shuffle, useProgress} from '../lib/store';

const byId = Object.fromEntries(QUIZ.map(q => [q.id, q]));
// Crop to the 30 locations so the map stays legible on phones.
const qx = Object.values(GEO.quiz).map(p => p[0]), qy = Object.values(GEO.quiz).map(p => p[1]);
export const QUIZ_BOX = [Math.min(...qx) - 45, Math.min(...qy) - 40, Math.max(...qx) - Math.min(...qx) + 125, Math.max(...qy) - Math.min(...qy) + 75];
const FULL = QUIZ_BOX;
const lev = (a, b) => {
  const m = a.length, n = b.length, d = Array.from({length: m + 1}, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
};
const strip = s => norm(s).replace(/\b(the|sea|mountains|mtns|mts|river|greater|ocean|a\.?k\.?a\.?)\b/g, '').replace(/[^a-z]/g, '');
export function nameMatches(q, typed) {
  const t = strip(typed);
  if (t.length < 3) return false;
  const names = [q.name, ...(q.alias || [])].map(strip).filter(Boolean);
  return names.some(n => n === t || (t.length >= 4 && n.includes(t) && t.length >= n.length * 0.6) || lev(n, t) <= (n.length > 7 ? 2 : 1));
}

const kindLegend = <div className="map-legend small"><span><i className="lg water"/> water</span><span><i className="lg feature"/> mountains, plateau</span><span><i className="lg area"/> area</span></div>;

function Study() {
  const [show, setShow] = useState(true);
  const [sel, setSel] = useState(null);
  const markers = QUIZ.map(q => ({key: q.id, xy: GEO.quiz[q.id], kind: q.kind, label: show || sel === q.id ? (q.short || q.name) : undefined, state: sel === q.id ? 'active' : '', onClick: () => setSel(q.id), aria: q.name}));
  return <div>
    <div className="row map-tools"><label className="toggle"><input type="checkbox" checked={show} onChange={e => setShow(e.target.checked)}/> Show labels</label>{kindLegend}</div>
    <div className="mapwrap fit"><GeoMap box={FULL} markers={markers} quizRivers scaleTo={760} label="Map of the 30 Map Quiz locations"/></div>
    <div className="quiz-groups">{QUIZ_GROUPS.map(g => <div key={g.label}><h4>{g.label}</h4><ul>{QUIZ.filter(q => g.kinds.includes(q.kind)).map(q => <li key={q.id}><button className={sel === q.id ? 'on' : ''} onClick={() => setSel(q.id)}>{q.name}</button></li>)}</ul></div>)}</div>
  </div>;
}

function Locate() {
  const [order, setOrder] = useState(() => shuffle(QUIZ.map(q => q.id)));
  const [i, setI] = useState(0);
  const [res, setRes] = useState(null);
  const [right, setRight] = useState(0);
  const cur = byId[order[i]];
  const click = id => {if (res || !cur) return; const ok = id === cur.id; setRes({ok, clicked: id}); markMap(cur.id, ok); if (ok) setRight(r => r + 1);};
  const next = () => {setRes(null); setI(n => n + 1);};
  if (!cur) return <div className="check done"><Sparkles size={22}/><div><h3>{right} of {order.length} found.</h3></div><button className="btn ghost" onClick={() => {setOrder(shuffle(order)); setI(0); setRight(0);}}><RotateCcw size={14}/> Again</button></div>;
  const markers = QUIZ.map((q, qi) => ({key: q.id, xy: GEO.quiz[q.id], kind: q.kind, onClick: () => click(q.id), aria: `Map spot ${qi + 1}`,
    state: res ? (q.id === cur.id ? 'right' : q.id === res.clicked ? 'wrong' : 'dim') : '', label: res && (q.id === cur.id || q.id === res.clicked) ? (q.short || q.name) : undefined}));
  return <div>
    <div className="quiz-prompt"><span className="muted small">{i + 1} of {order.length} · {right} right</span><h3>Click: <span className="target">{cur.name}</span></h3>
      {res && <motion.span className={`pill ${res.ok ? 'ok' : 'no'}`} initial={{scale: .8}} animate={{scale: 1}}>{res.ok ? <><Check size={14}/> Right</> : <><X size={14}/> That was {byId[res.clicked].name}</>}</motion.span>}
      {res && <button className="btn primary" onClick={next}>Next <ArrowRight size={15}/></button>}</div>
    <div className="mapwrap fit"><GeoMap box={FULL} markers={markers} quizRivers scaleTo={760} label="Blank map for the locate drill"/></div>
    {kindLegend}
  </div>;
}

function NameIt() {
  const [order, setOrder] = useState(() => shuffle(QUIZ.map(q => q.id)));
  const [i, setI] = useState(0);
  const [val, setVal] = useState('');
  const [res, setRes] = useState(null);
  const [right, setRight] = useState(0);
  const cur = byId[order[i]];
  const check = () => {const ok = nameMatches(cur, val); setRes({ok}); markMap(cur.id, ok); if (ok) setRight(r => r + 1);};
  const next = () => {setRes(null); setVal(''); setI(n => n + 1);};
  if (!cur) return <div className="check done"><Sparkles size={22}/><div><h3>{right} of {order.length} named.</h3></div><button className="btn ghost" onClick={() => {setOrder(shuffle(order)); setI(0); setRight(0);}}><RotateCcw size={14}/> Again</button></div>;
  const markers = QUIZ.map(q => ({key: q.id, xy: GEO.quiz[q.id], kind: q.kind, state: q.id === cur.id ? 'active' : 'dim', label: res && q.id === cur.id ? (q.short || q.name) : undefined}));
  return <div>
    <form key={cur.id} className="quiz-prompt" onSubmit={e => {e.preventDefault(); if (res) next(); else if (val.trim()) check();}}>
      <span className="muted small">{i + 1} of {order.length} · {right} right</span>
      <h3>Name the highlighted <span className="target">{cur.kind === 'area' ? 'area' : cur.kind === 'feature' ? 'feature' : 'body of water'}</span></h3>
      <div className="row"><input value={val} onChange={e => setVal(e.target.value)} disabled={!!res} placeholder="Type the name" autoFocus autoComplete="off" spellCheck={false} aria-label="Location name"/>
        {!res ? <><button className="btn primary" type="submit" disabled={!val.trim()}>Check</button><button type="button" className="btn ghost" onClick={() => {setRes({ok: false, gave: true}); markMap(cur.id, false);}}><Eye size={14}/> Show</button></>
          : <button key="next" className="btn primary" type="submit" autoFocus>Next <ArrowRight size={15}/></button>}</div>
      {res && <motion.span className={`pill ${res.ok ? 'ok' : 'no'}`} initial={{scale: .8}} animate={{scale: 1}}>{res.ok ? <Check size={14}/> : <X size={14}/>} {cur.name}</motion.span>}
    </form>
    <div className="mapwrap fit"><GeoMap box={FULL} markers={markers} quizRivers scaleTo={760} label="Map with one highlighted location"/></div>
  </div>;
}

function Timed() {
  const [order, setOrder] = useState(() => shuffle(QUIZ.map(q => q.id)));
  const [vals, setVals] = useState({});
  const [left, setLeft] = useState(600);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!started || done) return undefined;
    const id = setInterval(() => setLeft(s => {if (s <= 1) {clearInterval(id); setDone(true); return 0;} return s - 1;}), 1000);
    return () => clearInterval(id);
  }, [started, done]);
  const results = useMemo(() => done ? Object.fromEntries(order.map(id => [id, nameMatches(byId[id], vals[id] || '')])) : null, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {if (results) for (const [id, ok] of Object.entries(results)) markMap(id, ok);}, [results]);
  const score = results ? Object.values(results).filter(Boolean).length : 0;
  const markers = order.map((id, i) => ({key: id, xy: GEO.quiz[id], kind: byId[id].kind, num: i + 1, state: results ? (results[id] ? 'right' : 'wrong') : '', label: results && !results[id] ? (byId[id].short || byId[id].name) : undefined}));
  const restart = () => {setOrder(shuffle(order)); setVals({}); setLeft(600); setDone(false); setStarted(false);};
  return <div>
    <div className="quiz-prompt">
      <h3>{done ? `${score} of 30 right` : 'Label all 30 numbered spots in 10 minutes'}</h3>
      {!started && !done && <button className="btn primary" onClick={() => setStarted(true)}><Clock3 size={15}/> Start the clock</button>}
      {started && !done && <><span className="timer"><Clock3 size={14}/> {String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}</span><button className="btn primary" onClick={() => setDone(true)}>Hand it in</button></>}
      {done && <button className="btn ghost" onClick={restart}><RotateCcw size={14}/> New order</button>}
    </div>
    <div className="mapwrap fit"><GeoMap box={FULL} markers={markers} quizRivers scaleTo={760} label="Numbered blank map"/></div>
    {(started || done) && <ol className="timed-list">{order.map((id, i) => <li key={id} className={results ? (results[id] ? 'ok' : 'no') : ''}>
      <span className="n">{i + 1}</span>
      <input value={vals[id] || ''} onChange={e => setVals(v => ({...v, [id]: e.target.value}))} disabled={done} autoComplete="off" spellCheck={false} aria-label={`Spot ${i + 1}`}/>
      {results && !results[id] && <em>{byId[id].name}</em>}
    </li>)}</ol>}
    <p className="small muted">Spelling is forgiven by a letter or two. Short forms like “Caspian” or “Zagros” count.</p>
  </div>;
}

export default function MapQuiz() {
  const [mode, setMode] = useState('study');
  const prog = useProgress();
  const known = QUIZ.filter(q => prog.map[q.id]?.last).length;
  const MODES = [['study', 'Study the map'], ['locate', 'Find it'], ['name', 'Name it'], ['timed', '10-minute test']];
  return <div className="mapquiz">
    <div className="tabs small" role="tablist">{MODES.map(([k, l]) => <button key={k} role="tab" aria-selected={mode === k} className={mode === k ? 'on' : ''} onClick={() => setMode(k)}>{l}</button>)}
      <span className="muted small tabs-note"><MapPin size={13}/> {known}/30 right on your last try</span></div>
    {mode === 'study' && <Study/>}
    {mode === 'locate' && <Locate/>}
    {mode === 'name' && <NameIt/>}
    {mode === 'timed' && <Timed/>}
    <p className="small muted">Markers sit inside each area or along each river, not on exact borders. The course’s own blank map is on Canvas.</p>
  </div>;
}
