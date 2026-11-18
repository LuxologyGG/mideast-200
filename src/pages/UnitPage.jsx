import React from 'react';
import {ArrowRight} from 'lucide-react';
import {Divider, PageHead} from '../components/Layout';
import {CLASS_LIST, ID_ORDER, IDS, SECTIONS, TESTS, UNITS, CHRONO_U1, CHRONO_U2, fmtDate} from '../content';
import {useProgress} from '../lib/store';
import {ClassRow} from './Home';

export default function UnitPage({n}) {
  const u = UNITS.find(x => x.n === Number(n));
  const prog = useProgress();
  if (!u) return <PageHead title="Unit not found" sub={<a href="#/">Back to the course map</a>}/>;
  const classes = CLASS_LIST.filter(c => c.unit === u.n);
  const posted = classes.filter(c => c.posted);
  const t = TESTS[u.test];
  const idKeys = (ID_ORDER[u.test] || []).filter(k => !IDS[k].pending);
  const chrono = u.n === 1 ? CHRONO_U1 : u.n === 2 ? CHRONO_U2 : [];
  const steps = [
    {h: 'Read each lesson', d: 'Step through the parts of each class lesson, in order.', done: posted.filter(c => prog.read[c.n]).length, of: posted.length, href: posted[0] ? `#/class/${posted.find(c => !prog.read[c.n])?.n || posted[0].n}` : null},
    {h: 'Pass each class check', d: 'Five questions per class. Misses come back until you get them right.', done: posted.filter(c => prog.checks[c.n]).length, of: posted.length, href: posted[0] ? `#/class/${posted.find(c => !prog.checks[c.n])?.n || posted[0].n}?go=check` : null},
    idKeys.length && {h: 'Write the short IDs', d: 'Practice every ID on the study guide and score yourself on the 2/2/1 rubric.', done: idKeys.filter(k => (prog.ids[k]?.best || 0) >= 4).length, of: idKeys.length, href: `#/test/${u.test}?tab=ids`, note: 'scored 4 or 5'},
    chrono.length && {h: 'Learn the chronology', d: 'Give the start and end of each period on the study guide.', done: chrono.filter(p => prog.chrono[p.id]?.last).length, of: chrono.length, href: `#/test/${u.test}?tab=chrono`, note: 'right on last try'},
    {h: `Take a practice ${t.name}`, d: t.pending ? 'The format is pending until the study guide posts. A cumulative practice set is ready now.' : 'Same sections as the study guide, with an optional timer.', done: prog.tests[u.test] ? 1 : 0, of: 1, href: `#/test/${u.test}`, note: prog.tests[u.test] ? `best ${prog.tests[u.test].best}%` : null}
  ].filter(Boolean);
  return <div className="unit-page">
    <PageHead crumbs={[['#/', 'Course map'], [null, `Unit ${u.n}`]]} eyebrow={`Unit ${u.n} · Classes ${u.classes[0]}–${u.classes[1]} · ${u.span}`} title={u.title} sub={u.blurb}/>
    <section className="path">
      <h2 className="sec-title">Self-paced path</h2>
      <ol className="steps">{steps.map((s, i) => {
        const pct = s.of ? Math.round(s.done / s.of * 100) : 0;
        return <li key={i} className={pct === 100 ? 'done' : ''}>
          <span className="step-n">{i + 1}</span>
          <div className="step-b"><b>{s.h}</b><p className="small muted">{s.d}</p>
            <div className="meter" aria-label={`${s.done} of ${s.of}`}><i style={{width: `${pct}%`}}/></div>
            <span className="small">{s.done} of {s.of}{s.note ? ` · ${s.note}` : ''}</span></div>
          {s.href && <a className="btn ghost small" href={s.href}>Go <ArrowRight size={14}/></a>}
        </li>;
      })}</ol>
    </section>
    <Divider/>
    <h2 className="sec-title">Classes</h2>
    <ul className="clist wide">{classes.map(c => <ClassRow key={c.n} c={c} prog={prog}/>)}</ul>
    <div className="two-col">
      <section><h2 className="sec-title">Discussion sections</h2>
        <ul className="slist">{SECTIONS.filter(s => s.unit === u.n).map(s => <li key={s.n}><a href={`#/section/${s.n}`}><span className="num">{s.n}</span>{fmtDate(s.date)} · {s.activity}</a></li>)}</ul></section>
      <section><h2 className="sec-title">Test</h2>
        <a className="testcard" href={`#/test/${t.key}`}><b>{t.name}</b><span>{fmtDate(t.date)} · {t.where}</span><ul>{t.format.map(f => <li key={f}>{f}</li>)}</ul></a>
        {u.n === 1 && <a className="testcard" href="#/test/map-quiz"><b>{TESTS['map-quiz'].name}</b><span>{fmtDate(TESTS['map-quiz'].date)} · {TESTS['map-quiz'].where}</span></a>}
      </section>
    </div>
  </div>;
}
