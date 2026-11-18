import React from 'react';
import {ArrowLeft, ArrowRight, ExternalLink} from 'lucide-react';
import {Divider, PageHead} from '../components/Layout';
import {IdPractice} from '../components/ShortId';
import {CANVAS_URL, CLASSES, NO_SECTION_NOTE, SECTIONS, TESTS, fmtDate, sectionByNum} from '../content';
import {useProgress} from '../lib/store';
import {ClassRow} from './Home';

// What to practice after each section, drawn from the same week's classes.
const LINKS = {
  1: [['#/map', 'Course map of places'], ['#/class/2', 'Class 2: what “Middle East” means']],
  2: [['#/class/4', 'Class 4: tokens, bullae and early writing']],
  3: [['#/test/map-quiz', 'Map Quiz practice'], ['#/class/6?id=hammurabi', 'Hammurabi’s stele short ID']],
  4: [['#/chronology', 'Chronology page'], ['#/test/unit-1?tab=chrono', 'Unit 1 chronology drill']],
  5: [['#/class/10?id=isaiah', 'Isaiah 44–45 short ID'], ['#/class/10?id=bible', 'Jewish/Hebrew Bible short ID']],
  6: [['#/test/unit-1', 'Practice Unit Test 1']],
  7: [['#/class/14?id=umma_doc', 'Umma Document short ID']],
  8: [['#/class/15?id=coins', 'Umayyad coin reform short ID']],
  9: [['#/class/16', 'Class 16'], ['#/class/17', 'Class 17']],
  10: [['#/class/18?id=shahnameh', 'Shahnameh short ID']],
  11: [['#/class/21', 'Class 21 (pending)']],
  13: [],
  14: [['#/test/final', 'Final Exam page']]
};
// Section 6 handout: the four sample IDs it asked students to grade.
const S6_IDS = ['catal', 'cylinder', 'uruk_vase', 'bible', 'galatians'];

export default function SectionPage({n}) {
  const s = sectionByNum[Number(n)];
  const prog = useProgress();
  if (!s) return <PageHead title="Section not found" sub={<a href="#/">Back to the course map</a>}/>;
  const i = SECTIONS.indexOf(s), prev = SECTIONS[i - 1], next = SECTIONS[i + 1];
  return <div className="section-page">
    <PageHead crumbs={[['#/', 'Course map'], [`#/unit/${s.unit}`, `Unit ${s.unit}`], [null, `Section ${s.n}`]]}
      eyebrow={`Discussion Section ${s.n} · Fri ${fmtDate(s.date).split(' ')[1]}`} title={s.activity} sub={s.extra}/>
    {s.n === 11 && <p className="note">{NO_SECTION_NOTE}</p>}
    <section>
      <h2 className="sec-title">This week’s classes</h2>
      <ul className="clist wide">{s.classes.map(n => <ClassRow key={n} c={CLASSES[n]} prog={prog}/>)}</ul>
    </section>
    {s.test && <section>
      <h2 className="sec-title">Linked test</h2>
      <a className="testcard" href={`#/test/${s.test}`}><b>{TESTS[s.test].name}</b><span>{fmtDate(TESTS[s.test].date)} · {TESTS[s.test].where}</span></a>
    </section>}
    {s.handout && <section>
      <Divider/>
      <h2 className="sec-title">From the section handout</h2>
      <p>The handout walked through the Unit Test 1 sections, then had everyone grade sample short IDs on Çatalhöyük, the Cyrus Cylinder, the Uruk Vase and the Christian Bible with the 2/2/1 rubric. Its feedback, in short:</p>
      <ul className="tips">
        <li>Give a specific date range, not “before” and “after.”</li>
        <li>Pick details that matter for the argument. Size and material are true but weak.</li>
        <li>Never skip significance. Tie the item to how early states, empires or religions worked.</li>
        <li>Avoid myths the course debunks, such as calling the Cyrus Cylinder the first declaration of human rights.</li>
      </ul>
      <p>Practice those items here. The Christian Bible example draws on two list items, the Jewish/Hebrew Bible and Paul’s Letter to the Galatians.</p>
      <div className="idgrid">{S6_IDS.map(k => <IdPractice key={k} id={k} compact/>)}</div>
    </section>}
    {(LINKS[s.n] || []).length > 0 && <section>
      <h2 className="sec-title">Practice on this site</h2>
      <ul className="linklist">{LINKS[s.n].map(([h, l]) => <li key={h}><a href={h}>{l} <ArrowRight size={14}/></a></li>)}</ul>
    </section>}
    <p className="small muted">Section materials and activity details are on <a href={CANVAS_URL} target="_blank" rel="noreferrer">Canvas <ExternalLink size={12}/></a>.</p>
    <nav className="pager">
      {prev ? <a href={`#/section/${prev.n}`}><ArrowLeft size={15}/><span><small>Section {prev.n}</small>{prev.activity}</span></a> : <span/>}
      {next ? <a className="next" href={`#/section/${next.n}`}><span><small>Section {next.n}</small>{next.activity}</span><ArrowRight size={15}/></a> : <span/>}
    </nav>
  </div>;
}
