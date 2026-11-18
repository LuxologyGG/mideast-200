import React, {useMemo, useState} from 'react';
import {Trash2} from 'lucide-react';
import {PageHead} from '../components/Layout';
import {Drill} from '../components/Quiz';
import {CHRONO_U1, CHRONO_U2, IDS, QUESTIONS, QUIZ, fmtSpan, qById} from '../content';
import {resetProgress, useProgress} from '../lib/store';

export default function Review() {
  const prog = useProgress();
  const [run, setRun] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const missedQ = useMemo(() => QUESTIONS.filter(q => prog.q[q.id] && prog.q[q.id].last === false), [prog.q]);
  const lowIds = Object.entries(prog.ids).filter(([k, v]) => IDS[k] && v.score < 4).map(([k, v]) => ({k, ...v}));
  const periods = [...CHRONO_U1, ...CHRONO_U2];
  const missedChrono = periods.filter(p => prog.chrono[p.id] && prog.chrono[p.id].last === false);
  const missedMap = QUIZ.filter(q => prog.map[q.id] && prog.map[q.id].last === false);
  const pool = useMemo(() => missedQ.map(q => qById[q.id]), [run]); // eslint-disable-line react-hooks/exhaustive-deps
  const total = Object.keys(prog.q).length;
  return <div className="review-page">
    <PageHead crumbs={[['#/', 'Course map'], [null, 'Review']]} eyebrow={`${total} questions answered so far`} title="Review"
      sub="Everything you got wrong on your most recent try, across the whole site. Get a question right and it drops off this list."/>
    <section>
      <h2 className="sec-title">Missed questions <span className="count">{missedQ.length}</span></h2>
      {missedQ.length ? <Drill key={run} pool={pool} title="Missed questions" onEnd={() => setRun(r => r + 1)}/> : <p className="muted">None right now. Missed questions from class checks and practice tests show up here.</p>}
    </section>
    <section>
      <h2 className="sec-title">Short IDs scored under 4 <span className="count">{lowIds.length}</span></h2>
      {lowIds.length ? <ul className="linklist">{lowIds.map(x => <li key={x.k}><a href={`#/class/${IDS[x.k].cls}?id=${x.k}`}>{IDS[x.k].name} <span className={`chip score s${x.score}`}>{x.score}/5</span></a></li>)}</ul> : <p className="muted">None. Save a score on any short ID to track it.</p>}
    </section>
    <section>
      <h2 className="sec-title">Chronology misses <span className="count">{missedChrono.length}</span></h2>
      {missedChrono.length ? <ul className="linklist">{missedChrono.map(p => <li key={p.id}><span><b>{p.name}</b> · {fmtSpan(p)}</span></li>)}</ul> : <p className="muted">None.</p>}
    </section>
    <section>
      <h2 className="sec-title">Map Quiz misses <span className="count">{missedMap.length}</span></h2>
      {missedMap.length ? <ul className="linklist">{missedMap.map(q => <li key={q.id}><a href="#/test/map-quiz">{q.name}</a></li>)}</ul> : <p className="muted">None.</p>}
    </section>
    <section className="danger">
      <h2 className="sec-title">Start over</h2>
      <p className="small muted">Progress is stored only in this browser. Clearing it cannot be undone.</p>
      {!confirm ? <button className="btn ghost" onClick={() => setConfirm(true)}><Trash2 size={14}/> Clear my progress</button>
        : <div className="row"><button className="btn no" onClick={() => {resetProgress(); setConfirm(false);}}>Yes, clear everything</button><button className="btn ghost" onClick={() => setConfirm(false)}>Cancel</button></div>}
    </section>
  </div>;
}
