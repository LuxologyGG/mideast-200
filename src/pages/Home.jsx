import React, {useState} from 'react';
import {ArrowRight, BookOpen, Check, CircleDot, Clock3, MapPinned, Search} from 'lucide-react';
import GeoMap, {GEO} from '../components/GeoMap';
import {Disclaimer, Divider, SearchResults} from '../components/Layout';
import {CLASSES, CLASS_LIST, COUNTS, PLACE_CLASSES, POSTED, SECTIONS, TESTS, UNITS, fmtDate} from '../content';
import {useProgress} from '../lib/store';
import {go} from '../lib/router';

export const UNIT_COLORS = {1: 'var(--coral)', 2: 'var(--cobalt)', 3: 'var(--turq)'};

export function ClassRow({c, prog}) {
  const read = !!prog.read[c.n], passed = !!prog.checks[c.n];
  return <li className={`crow ${c.posted ? '' : 'pend'}`}>
    <a href={`#/class/${c.n}`}>
      <span className="num">{c.n}</span>
      <span className="ttl"><small>{fmtDate(c.date)}</small>{c.title}</span>
      <span className="st" title={c.posted ? `${read ? 'Lesson read' : 'Lesson not read'}, ${passed ? 'check passed' : 'check not passed'}` : 'Slides not posted yet'}>
        {!c.posted ? <span className="chip pend">Pending</span> : <><i className={read ? 'on' : ''}><BookOpen size={12}/></i><i className={passed ? 'on' : ''}><Check size={12}/></i></>}
      </span>
    </a>
  </li>;
}

export default function Home() {
  const prog = useProgress();
  const [q, setQ] = useState('');
  const read = POSTED.filter(n => prog.read[n]).length, passed = POSTED.filter(n => prog.checks[n]).length;
  const last = prog.last && prog.last !== '#/' ? prog.last : null;
  const lastLabel = last && (() => {const m = last.match(/#\/(class|section|unit|test)\/([\w-]+)/); if (!m) return 'your last page'; if (m[1] === 'class') return `Class ${m[2]}: ${CLASSES[m[2]]?.title || ''}`; if (m[1] === 'test') return TESTS[m[2]]?.name; return `${m[1][0].toUpperCase() + m[1].slice(1)} ${m[2]}`;})();
  const pins = Object.entries(PLACE_CLASSES).map(([name, classes]) => ({key: name, xy: GEO.places[name], label: undefined, color: UNIT_COLORS[CLASSES[classes[0]].unit], pulse: false, onClick: () => go(`#/map?place=${encodeURIComponent(name)}`)})).filter(p => p.xy);
  return <div className="home">
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">MIDEAST 200 · Introduction to the Middle East · Fall 2026</p>
        <h1>The whole course, class by class</h1>
        <p className="lede">Plain-language lessons for every class with posted slides, key terms with Arabic and Persian script, primary sources, maps and practice checks, plus practice tests in each study guide’s format. Go at your own pace; progress stays in your browser.</p>
        <div className="hero-search">
          <Search size={18}/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search everything: classes, terms, IDs, sources, places" aria-label="Search the site"/>
        </div>
        {q && <div className="hero-results"><SearchResults q={q} limit={14}/></div>}
        <Disclaimer/>
      </div>
      <div className="hero-map" aria-label="Places pinned in the lessons">
        <GeoMap box={[60, 20, 880, 540]} pins={pins} scaleTo={620} label="Map of every place pinned in the lessons, colored by unit"/>
        <div className="map-key small">{UNITS.map(u => <span key={u.n}><i style={{background: UNIT_COLORS[u.n]}}/>Unit {u.n}</span>)}<a href="#/map"><MapPinned size={13}/> Open the map</a></div>
      </div>
    </section>

    <section className="stats">
      <div><b>{COUNTS.posted}</b><span>of 27 classes posted</span></div>
      <div><b>{COUNTS.beats}</b><span>lesson parts</span></div>
      <div><b>{COUNTS.terms}</b><span>glossary entries</span></div>
      <div><b>{COUNTS.ids}</b><span>study-guide IDs</span></div>
      <div><b>{COUNTS.questions}</b><span>practice questions</span></div>
      <div className="mine"><b>{read}/{POSTED.length}</b><span>lessons you’ve read</span></div>
      <div className="mine"><b>{passed}/{POSTED.length}</b><span>checks you’ve passed</span></div>
    </section>

    {last && <a className="continue" href={last}><Clock3 size={16}/> Pick up where you left off: <b>{lastLabel}</b> <ArrowRight size={15}/></a>}

    <Divider/>
    <h2 className="sec-title">Course map</h2>
    <p className="muted">Each class page has its lesson, key terms, primary sources and a practice check. <span className="chip pend">Pending</span> means the slides are not in the course files yet.</p>
    <div className="coursemap">
      {UNITS.map(u => <section key={u.n} className={`unitcol u${u.n}`}>
        <header><a href={`#/unit/${u.n}`}><span className="eyebrow">Unit {u.n} · {u.span}</span><h3>{u.title}</h3></a></header>
        <ul className="clist">{CLASS_LIST.filter(c => c.unit === u.n).map(c => <ClassRow key={c.n} c={c} prog={prog}/>)}</ul>
        <div className="unit-extras">
          <p className="mini-h">Discussion sections</p>
          <ul className="slist">{SECTIONS.filter(s => s.unit === u.n).map(s => <li key={s.n}><a href={`#/section/${s.n}`}><span className="num">{s.n}</span>{s.activity}</a></li>)}</ul>
          <p className="mini-h">Tests</p>
          <ul className="tlist">{Object.values(TESTS).filter(t => (u.n === 1 && ['map-quiz', 'unit-1'].includes(t.key)) || (u.n === 2 && t.key === 'unit-2') || (u.n === 3 && t.key === 'final')).map(t => <li key={t.key}><a href={`#/test/${t.key}`}><CircleDot size={13}/> <b>{t.name}</b> <small>{fmtDate(t.date)}</small>{prog.tests[t.key] && <span className="chip score">Best {prog.tests[t.key].best}%</span>}</a></li>)}</ul>
        </div>
      </section>)}
    </div>
  </div>;
}
