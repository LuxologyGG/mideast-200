import React, {useMemo, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowRight, Check, Hourglass, Shuffle} from 'lucide-react';
import {PageHead} from '../components/Layout';
import PracticeTest from '../components/PracticeTest';
import MapQuiz from '../components/MapQuiz';
import {ChronoDrill, PeriodLadder} from '../components/Chrono';
import {IdPractice, SrcTags} from '../components/ShortId';
import {CHRONO_SRC, CHRONO_U1, CHRONO_U2, ID_IMAGES, ID_ORDER, IDS, TESTS, fmtDate} from '../content';
import {setQuery} from '../lib/router';
import {shuffle, useProgress} from '../lib/store';

function IdBank({keys}) {
  const prog = useProgress();
  const [cur, setCur] = useState(keys[0]);
  const i = keys.indexOf(cur);
  return <div className="idbank">
    <ul className="idbank-list" aria-label="Study guide terms">{keys.map((k, j) => {
      const b = prog.ids[k]?.best;
      return <li key={k}><button className={k === cur ? 'on' : ''} onClick={() => setCur(k)}>
        <span className="n">{j + 1}</span><span className="nm">{IDS[k].name}</span>
        {IDS[k].pending ? <span className="chip pend">Pending</span> : b !== undefined ? <span className={`chip score s${b}`}>{b}/5</span> : null}
      </button></li>;
    })}</ul>
    <div className="idbank-main">
      <IdPractice key={cur} id={cur}/>
      <div className="row">
        <button className="btn ghost" onClick={() => setCur(keys[(i + 1) % keys.length])}>Next term <ArrowRight size={15}/></button>
        <button className="btn ghost" onClick={() => {const open = keys.filter(k => !IDS[k].pending && k !== cur); setCur(open[Math.floor(Math.random() * open.length)]);}}><Shuffle size={14}/> Random</button>
      </div>
    </div>
  </div>;
}

function Pictures() {
  const keys = Object.keys(ID_IMAGES);
  const [order, setOrder] = useState(() => shuffle(keys));
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [right, setRight] = useState(0);
  const k = order[i];
  const opts = useMemo(() => k ? shuffle([k, ...shuffle(keys.filter(x => x !== k)).slice(0, 3)]) : [], [k]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!k) return <div className="check done"><Check size={22}/><div><h3>{right} of {order.length} named.</h3></div><button className="btn ghost" onClick={() => {setOrder(shuffle(keys)); setI(0); setRight(0);}}>Again</button></div>;
  const im = ID_IMAGES[k];
  return <div className="pics">
    <p className="eyebrow">Which study-guide item is this? · {i + 1} of {order.length} · {right} right</p>
    <div className="pics-body">
      <figure className="photo big"><img src={im.url} alt="An artifact from the Test 1 list" loading="lazy"/>
        <figcaption>{im.credit} · {im.license} · <a href={im.source} target="_blank" rel="noreferrer">Wikimedia Commons</a></figcaption></figure>
      <div className="opts mc">{opts.map((o, j) => <button key={o} className={`opt ${picked ? (o === k ? 'right' : o === picked ? 'wrong' : 'fade') : ''}`} disabled={!!picked}
        onClick={() => {setPicked(o); if (o === k) setRight(r => r + 1);}}><kbd>{j + 1}</kbd><span>{IDS[o].name}</span></button>)}
        {picked && <motion.div className={`feedback ${picked === k ? 'ok' : 'no'}`} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}>
          <p><b>{picked === k ? 'Right.' : `It is ${IDS[k].name}.`}</b> {IDS[k].intro}</p>
          <button className="btn primary" onClick={() => {setPicked(null); setI(n => n + 1);}}>Next <ArrowRight size={15}/></button>
        </motion.div>}
      </div>
    </div>
    <p className="small muted">Extra practice, not a section of the test. Photos are Wikimedia Commons images, not slide images. {24 - keys.length} list items have no suitable public photo and are left out.</p>
  </div>;
}

export default function TestPage({k, query}) {
  const t = TESTS[k];
  if (!t) return <PageHead title="Test not found" sub={<a href="#/">Back to the course map</a>}/>;
  const crumbs = [['#/', 'Course map'], [null, t.name]];
  const head = <PageHead crumbs={crumbs} eyebrow={`${fmtDate(t.date)} · ${t.where} · ${t.weight}`} title={t.name}>
    <div className="format">
      <h2 className="mini-h">Format</h2>
      <ul>{t.format.map(f => <li key={f}>{f}</li>)}</ul>
      {t.note && <p className="small muted">{t.note}</p>}
      <p className="small muted">Source: <SrcTags src={t.src}/></p>
    </div>
  </PageHead>;
  if (k === 'map-quiz') return <div className="test-page">{head}<MapQuiz/></div>;

  const tabs = [['practice', t.pending ? 'Cumulative practice' : 'Practice test'], ['ids', 'Short IDs'], ['chrono', 'Chronology']];
  if (k === 'unit-1') tabs.push(['pictures', 'Artifact pictures']);
  const tab = tabs.some(([x]) => x === query.tab) ? query.tab : 'practice';
  const idKeys = k === 'final' ? [...ID_ORDER['unit-1'], ...ID_ORDER['unit-2']] : ID_ORDER[k];
  const periods = k === 'unit-1' ? CHRONO_U1 : k === 'unit-2' ? CHRONO_U2 : [...CHRONO_U1, ...CHRONO_U2];
  return <div className="test-page">
    {head}
    {t.pending && <div className="pending-card"><Hourglass size={22}/><div><h2>Format pending</h2><p>No final exam study guide is in the course files yet. Until it posts, the practice here mixes questions, IDs and chronology from every posted class, using the unit test sections. Classes without posted slides are not included.</p></div></div>}
    <div className="tabs" role="tablist">{tabs.map(([x, l]) => <button key={x} role="tab" aria-selected={tab === x} className={tab === x ? 'on' : ''} onClick={() => setQuery({tab: x === 'practice' ? null : x})}>{l}</button>)}</div>
    {tab === 'practice' && <PracticeTest key={k} testKey={k}/>}
    {tab === 'ids' && <>
      <p className="muted small">{k === 'final' ? 'Every term from both unit test study guides.' : `All ${idKeys.length} terms from the study guide, in the guide’s order.`} Write each one, then score it against the model on the 2/2/1 rubric.</p>
      <IdBank keys={idKeys}/>
    </>}
    {tab === 'chrono' && <>
      <p className="muted small">{k === 'unit-1' ? CHRONO_SRC.u1 : k === 'unit-2' ? CHRONO_SRC.u2 : `${CHRONO_SRC.u1} ${CHRONO_SRC.u2}`}</p>
      <ChronoDrill key={k} periods={periods} title="Give the dates"/>
      <details className="ref"><summary>Show the study guide list</summary><PeriodLadder periods={periods}/></details>
    </>}
    {tab === 'pictures' && <Pictures/>}
  </div>;
}

