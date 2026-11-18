import React, {useMemo} from 'react';
import {PageHead, Divider} from '../components/Layout';
import {PeriodLadder} from '../components/Chrono';
import {CHRONO_SRC, CHRONO_U1, CHRONO_U2, CLASSES, CONTEXT_TIMELINES, EVENTS, UNITS, fmtYear} from '../content';
import {setQuery} from '../lib/router';
import {UNIT_COLORS} from './Home';

export default function Chronology({query}) {
  const unit = Number(query.unit) || 0;
  const events = useMemo(() => EVENTS.filter(e => !unit || CLASSES[e.cls].unit === unit), [unit]);
  return <div className="chrono-page">
    <PageHead crumbs={[['#/', 'Course map'], [null, 'Chronology']]} eyebrow={`${CHRONO_U1.length + CHRONO_U2.length} study-guide periods · ${EVENTS.length} dated events`} title="Chronology"
      sub="The periods each study guide asks for, the reference timelines from the course files, and every dated event in the lessons, in one place."/>
    <section>
      <h2 className="sec-title">Unit Test 1 periods</h2>
      <p className="small muted">{CHRONO_SRC.u1} <a href="#/test/unit-1?tab=chrono">Drill these</a>.</p>
      <PeriodLadder periods={CHRONO_U1} color="var(--coral)"/>
    </section>
    <section>
      <h2 className="sec-title">Unit Test 2 periods</h2>
      <p className="small muted">{CHRONO_SRC.u2} <a href="#/test/unit-2?tab=chrono">Drill these</a>.</p>
      <PeriodLadder periods={CHRONO_U2} color="var(--cobalt)"/>
    </section>
    <section>
      <h2 className="sec-title">Reference timelines</h2>
      {CONTEXT_TIMELINES.map(tl => <div key={tl.id} className="ctx">
        <h3 className="mini-h">{tl.title} <span className="src">{tl.src}</span></h3>
        <div className="ctx-band">{tl.periods.map(([name, a, b], i) => <span key={name} style={{flex: Math.max(1, b - a)}} className={i % 2 ? 'alt' : ''} title={`${name}: ${fmtYear(a)}–${fmtYear(b)}`}><b>{name}</b><small>{Math.abs(a)}–{Math.abs(b)}{b < 0 ? ' BCE' : a < 0 ? ' BCE–CE' : ''}</small></span>)}</div>
      </div>)}
      <p className="small muted">Context only. These sub-periods are not on the study guide lists.</p>
    </section>
    <Divider/>
    <section>
      <h2 className="sec-title">Dated events from the lessons</h2>
      <div className="seg" role="group" aria-label="Unit">{[0, ...UNITS.map(u => u.n)].map(n => <button key={n} className={unit === n ? 'on' : ''} onClick={() => setQuery({unit: n || null})}>{n ? `Unit ${n}` : 'All'}</button>)}</div>
      <ol className="events">{events.map((e, i) => <li key={i} style={{'--u': UNIT_COLORS[CLASSES[e.cls].unit]}}>
        <span className="ev-y">{fmtYear(e.y)}</span>
        <span className="ev-t"><b>{e.t}</b><small>{e.h}</small></span>
        <a className="chip link" href={`#/class/${e.cls}`}>Class {e.cls}</a>
      </li>)}</ol>
    </section>
  </div>;
}
