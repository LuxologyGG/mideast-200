import React, {useEffect, useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {Check, Clock3, FileCheck2, RotateCcw, X} from 'lucide-react';
import {IDS, TESTS, qById, testPools} from '../content';
import {markChrono, markQuestion, saveTest, scoreId, shuffle, useProgress} from '../lib/store';
import {Question, isRight} from './Quiz';
import {ChronoInput, gradeRange} from './Chrono';
import {RUBRIC} from './ShortId';

const PLAN = {
  'unit-1': {tf: 8, chrono: 4, mc: 8, sid: 4},
  'unit-2': {tf: 6, mc: 8, chrono: 4, sid: 4},
  'final': {tf: 8, mc: 10, chrono: 6, sid: 4}
};
const ORDER = {'final': ['tf', 'mc', 'chrono', 'sid']};
const HEAD = {tf: 'True / false', mc: 'Multiple choice', chrono: 'Chronology', sid: 'Short IDs'};

function build(key) {
  const pools = testPools(key), plan = PLAN[key];
  return {
    tf: shuffle(pools.questions.filter(q => q.type === 'tf')).slice(0, plan.tf).map(q => q.id),
    mc: shuffle(pools.questions.filter(q => q.type === 'mc')).slice(0, plan.mc).map(q => q.id),
    chrono: shuffle(pools.chrono).slice(0, plan.chrono),
    sid: shuffle(pools.ids).slice(0, plan.sid)
  };
}

export default function PracticeTest({testKey}) {
  const t = TESTS[testKey];
  const order = ORDER[testKey] || t.order;
  const [seed, setSeed] = useState(0);
  const set = useMemo(() => build(testKey), [testKey, seed]); // eslint-disable-line react-hooks/exhaustive-deps
  const [ans, setAns] = useState({});
  const [chr, setChr] = useState({});
  const [pick, setPick] = useState([]);
  const [txt, setTxt] = useState({});
  const [marks, setMarks] = useState({});
  const [phase, setPhase] = useState('take');
  const [timed, setTimed] = useState(false);
  const [left, setLeft] = useState(t.minutes * 60 || 1800);
  const [saved, setSaved] = useState(false);
  const prog = useProgress();
  const best = prog.tests[testKey]?.best;

  useEffect(() => {
    if (!timed || phase !== 'take') return undefined;
    const id = setInterval(() => setLeft(s => {if (s <= 1) {clearInterval(id); setPhase('review'); return 0;} return s - 1;}), 1000);
    return () => clearInterval(id);
  }, [timed, phase]);

  const reset = () => {setSeed(s => s + 1); setAns({}); setChr({}); setPick([]); setTxt({}); setMarks({}); setPhase('take'); setLeft(t.minutes * 60 || 1800); setSaved(false); window.scrollTo({top: 0, behavior: 'smooth'});};
  const objIds = [...set.tf, ...set.mc];
  const submit = () => {
    for (const id of objIds) markQuestion(id, isRight(qLookup(id), ans[id]));
    for (const p of set.chrono) {const r = gradeRange(p, chr[p.id] || ''); markChrono(p.id, r.ok);}
    setPhase('review');
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  const objRight = objIds.filter(id => isRight(qLookup(id), ans[id])).length;
  const chrRight = set.chrono.filter(p => gradeRange(p, chr[p.id] || '').ok).length;
  const idPts = pick.reduce((a, k) => a + RUBRIC.reduce((b, r) => b + (marks[k]?.[r.key] ? r.pts : 0), 0), 0);
  const total = objIds.length + set.chrono.length + 10;
  const got = objRight + chrRight + idPts;
  const pct = Math.round(got / total * 100);
  const finish = () => {for (const k of pick) scoreId(k, RUBRIC.reduce((b, r) => b + (marks[k]?.[r.key] ? r.pts : 0), 0)); saveTest(testKey, {pct, got, total, at: Date.now()}); setSaved(true);};

  let sec = 0;
  return <div className="ptest">
    <div className="ptest-top">
      <div>
        <p className="eyebrow">Practice {t.name} · same sections as the study guide</p>
        <p className="small muted">{objIds.length + set.chrono.length} quick questions and 2 short IDs. {best !== undefined && <>Best so far: <b>{best}%</b>.</>}</p>
      </div>
      <div className="row">
        {phase === 'take' && <label className="toggle"><input type="checkbox" checked={timed} onChange={e => setTimed(e.target.checked)}/> Time me ({t.minutes || 30} min)</label>}
        {timed && phase === 'take' && <span className="timer"><Clock3 size={14}/> {String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}</span>}
        <button className="btn ghost small" onClick={reset}><RotateCcw size={14}/> New test</button>
      </div>
    </div>

    {phase === 'review' && <motion.div className="ptest-score" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}}>
      <FileCheck2 size={22}/>
      <div><b>{objRight}/{objIds.length}</b> true-false and multiple choice · <b>{chrRight}/{set.chrono.length}</b> chronology · <b>{idPts}/10</b> short IDs (scored by you below)</div>
      <b className="pct">{pct}%</b>
    </motion.div>}

    {order.map(part => {
      if (part === 'tf' || part === 'mc') {
        sec++;
        return <section key={part} className="ptest-sec">
          <h3 className="sec-h"><span>Section {sec}</span>{HEAD[part]}</h3>
          {set[part].map((id, i) => {
            const q = qLookup(id);
            return <div key={id} className={`ptest-q ${phase === 'review' ? (isRight(q, ans[id]) ? 'ok' : 'no') : ''}`}>
              <Question q={q} num={i + 1} picked={ans[id] ?? null} onPick={v => phase === 'take' && setAns(a => ({...a, [id]: v}))} reveal={phase === 'review'}/>
              {phase === 'review' && <p className="why small">{ans[id] === undefined && <b>Left blank. </b>}{q.why}</p>}
            </div>;
          })}
        </section>;
      }
      if (part === 'chrono') {
        sec++;
        return <section key={part} className="ptest-sec">
          <h3 className="sec-h"><span>Section {sec}</span>Chronology</h3>
          <p className="small muted">Give the start and end dates of each period. {testKey === 'unit-1' ? 'Write BCE or CE.' : 'Counted right within 50 years.'}</p>
          {set.chrono.map((p, i) => <ChronoInput key={p.id} p={p} num={i + 1} value={chr[p.id]} onChange={v => setChr(c => ({...c, [p.id]: v}))} result={phase === 'review' ? gradeRange(p, chr[p.id] || '') : null}/>)}
        </section>;
      }
      sec++;
      return <section key={part} className="ptest-sec">
        <h3 className="sec-h"><span>Section {sec}</span>Short IDs: write 2 of these 4</h3>
        {phase === 'take' && <p className="small muted">Pick two, then write 3–4 sentences each. Rubric: when and where, or a definition (2 pts), two details (2 pts), significance for the class (1 pt).</p>}
        <div className="sid-pick">{set.sid.map(k => <button key={k} className={`sid-opt ${pick.includes(k) ? 'on' : ''}`} disabled={phase === 'review'}
          onClick={() => setPick(p => p.includes(k) ? p.filter(x => x !== k) : p.length < 2 ? [...p, k] : [p[1], k])}>{pick.includes(k) && <Check size={14}/>}{IDS[k].name}</button>)}</div>
        {pick.map(k => <div key={k} className="sid-write">
          <label htmlFor={`sid-${k}`}><b>{IDS[k].name}</b></label>
          <textarea id={`sid-${k}`} rows={4} value={txt[k] || ''} onChange={e => setTxt(x => ({...x, [k]: e.target.value}))} disabled={phase === 'review'} placeholder="3–4 sentences"/>
          {phase === 'review' && <div className="grade">
            <p className="small muted">Compare with the model and tick what your answer covered.</p>
            {RUBRIC.map(r => <label key={r.key} className={`rub ${marks[k]?.[r.key] ? 'on' : ''}`}>
              <input type="checkbox" checked={!!marks[k]?.[r.key]} disabled={saved} onChange={e => setMarks(m => ({...m, [k]: {...m[k], [r.key]: e.target.checked}}))}/>
              <span className="rub-h">{r.label(IDS[k])} <small>{r.pts} {r.pts === 1 ? 'pt' : 'pts'}</small></span>
              <span className="rub-model">{IDS[k][r.key]}</span>
            </label>)}
          </div>}
        </div>)}
      </section>;
    })}

    <div className="ptest-foot">
      {phase === 'take' ? <button className="btn primary big" onClick={submit}>Submit and check</button>
        : saved ? <p className="ok-note"><Check size={16}/> Saved: {pct}%. <button className="btn ghost small" onClick={reset}><RotateCcw size={14}/> Take a new one</button></p>
          : <button className="btn primary big" onClick={finish}>{pick.length < 2 ? 'Save score (short IDs left blank)' : 'Save my score'}</button>}
      {phase === 'review' && !saved && <span className="small muted"><X size={13}/> Short IDs count only after you tick the rubric.</span>}
    </div>
  </div>;
}

const qLookup = id => qById[id];
