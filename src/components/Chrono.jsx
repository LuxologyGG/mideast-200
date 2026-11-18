import React, {useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowRight, Check, RotateCcw, Sparkles, X} from 'lucide-react';
import {fmtSpan} from '../content';
import {markChrono, shuffle, useProgress} from '../lib/store';

// Parse one side of a date range. Returns {y, era} where era is -1 (BCE), 1 (CE) or 0 (not written).
function side(raw) {
  const s = raw.toLowerCase().replace(/[~≈c.]+\s*(?=\d)/g, '').trim();
  if (/early\s*(ce|ad)?/.test(s) && !/\d/.test(s)) return {y: 50, era: 1, early: true};
  const m = s.match(/(\d[\d,]*)\s*(s\b)?\s*(bce|bc|ce|ad)?/);
  if (!m) return null;
  let y = Number(m[1].replace(/,/g, ''));
  if (m[2]) y += 50; // "1400s"
  const era = m[3] ? (/b/.test(m[3]) ? -1 : 1) : 0;
  return {y, era};
}
export function parseRange(text) {
  const parts = String(text).split(/\s*(?:–|—|-|\bto\b)\s*/i).filter(Boolean);
  if (parts.length !== 2) return null;
  const a = side(parts[0]), b = side(parts[1]);
  if (!a || !b) return null;
  const eraA = a.era || b.era || 1, eraB = b.era || 1;
  return [a.y * eraA, b.y * eraB];
}
export function gradeRange(p, text) {
  const r = parseRange(text);
  if (!r) return {ok: false, parsed: false};
  const [s, e] = r;
  const sOk = p.startLabel === 'early CE' ? s >= 1 && s <= 150 : Math.abs(s - p.start) <= 50;
  const eOk = p.endLabel === '1400s CE' ? e >= 1350 && e <= 1550 : Math.abs(e - p.end) <= 50;
  return {ok: sOk && eOk, parsed: true, sOk, eOk};
}

export function ChronoInput({p, value, onChange, result, num}) {
  return <div className={`chrono-row ${result ? (result.ok ? 'ok' : 'no') : ''}`}>
    <label htmlFor={`chr-${p.id}`}>{num !== undefined && <span className="chip">{num}</span>}<b>{p.name}</b></label>
    <input id={`chr-${p.id}`} value={value || ''} onChange={e => onChange(e.target.value)} placeholder="e.g. 900–610 BCE" disabled={!!result} autoComplete="off" spellCheck={false}/>
    {result && <span className="chrono-ans">{result.ok ? <Check size={15}/> : <X size={15}/>} {fmtSpan(p)}{!result.parsed && <em> · write it as a range, like 750–950</em>}</span>}
  </div>;
}

export function ChronoDrill({periods, title}) {
  const order = useMemo(() => shuffle(periods.map(p => p.id)), [periods]);
  const [i, setI] = useState(0);
  const [val, setVal] = useState('');
  const [res, setRes] = useState(null);
  const [right, setRight] = useState(0);
  const p = periods.find(x => x.id === order[i]);
  const check = () => {const r = gradeRange(p, val); if (!r.parsed) {setRes(r); return;} setRes(r); markChrono(p.id, r.ok); if (r.ok) setRight(n => n + 1);};
  const next = () => {setI(n => n + 1); setVal(''); setRes(null);};
  if (i >= order.length) return <div className="check done"><Sparkles size={22}/><div><h3>{right} of {order.length} within 50 years.</h3></div><button className="btn ghost" onClick={() => {setI(0); setRight(0); setVal(''); setRes(null);}}><RotateCcw size={14}/> Again</button></div>;
  return <div className="check chrono-drill">
    <div className="check-top"><p className="eyebrow">{title} · {i + 1} of {order.length}</p><span className="muted small">{right} right</span></div>
    <form key={p.id} onSubmit={e => {e.preventDefault(); if (res?.parsed) next(); else check();}}>
      <h3>{p.name}</h3>
      <div className="row"><input value={val} onChange={e => {setVal(e.target.value); if (res && !res.parsed) setRes(null);}} placeholder="Start–end, with BCE or CE" disabled={res?.parsed} autoFocus autoComplete="off" spellCheck={false} aria-label={`Dates for ${p.name}`}/>
        {!res?.parsed ? <button key="check" className="btn primary" type="submit">Check</button> : <button key="next" className="btn primary" type="submit" autoFocus>Next <ArrowRight size={15}/></button>}</div>
      {res && !res.parsed && <p className="small warn">Write a range, like 750–950 or 900–610 BCE.</p>}
      {res?.parsed && <motion.div className={`feedback ${res.ok ? 'ok' : 'no'}`} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}>
        <p><b>{res.ok ? 'Within 50 years.' : 'Not within 50 years.'}</b> {fmtSpan(p)}. {p.hook}</p>
      </motion.div>}
    </form>
  </div>;
}

// Piecewise scale so the Neolithic does not swallow everything else.
const SEG = [[-10000, 0], [-4000, 14], [0, 52], [2026, 100]];
export const yToPct = y => {
  for (let i = 1; i < SEG.length; i++) if (y <= SEG[i][0]) {const [a, pa] = SEG[i - 1], [b, pb] = SEG[i]; return pa + (y - a) / (b - a) * (pb - pa);}
  return 100;
};
export const TICKS = [-10000, -4000, -3000, -2000, -1000, 0, 500, 1000, 1500, 2000];

export function PeriodLadder({periods, color = 'var(--cobalt)'}) {
  const prog = useProgress();
  // CE-only lists get a plain linear scale; mixed lists use the piecewise scale.
  const ce = periods.every(p => p.start >= 0);
  const pct = ce ? y => (y - 200) / (1950 - 200) * 100 : yToPct;
  const ticks = ce ? [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800] : TICKS;
  const tickLabel = t => ce ? t : t < 0 ? `${-t / 1000}k BCE` : t === 0 ? '1 CE' : t;
  return <div className="ladder">
    <div className="ladder-axis" aria-hidden>{ticks.map(t => <span key={t} style={{left: `${pct(t)}%`}}>{tickLabel(t)}</span>)}</div>
    {periods.map(p => {
      const a = pct(p.start), b = pct(p.end);
      const rec = prog.chrono[p.id];
      return <div className="ladder-row" key={p.id}>
        <div className="ladder-name"><b>{p.name}</b><span>{fmtSpan(p)}</span></div>
        <div className="ladder-track">
          {ticks.map(t => <s key={t} style={{left: `${pct(t)}%`}} aria-hidden/>)}
          <motion.i style={{left: `${a}%`, width: `${Math.max(1.2, b - a)}%`, background: color}} initial={{scaleX: 0}} animate={{scaleX: 1}} transition={{duration: .5}}/>
          {rec && <em className={rec.last ? 'ok' : 'no'} title={`${rec.r} right, ${rec.w} missed`}>{rec.last ? '✓' : '✗'}</em>}
        </div>
      </div>;
    })}
  </div>;
}
