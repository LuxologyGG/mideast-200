import React, {useEffect} from 'react';
import {ArrowLeft, ArrowRight, BookMarked, ExternalLink, Hourglass} from 'lucide-react';
import {Divider, PageHead} from '../components/Layout';
import {Lesson} from '../components/Lesson';
import {Check} from '../components/Quiz';
import {IdPractice, SrcTags} from '../components/ShortId';
import {CANVAS_URL, CLASSES, fmtDate} from '../content';
import {useProgress} from '../lib/store';

const SUBNAV = [['lesson', 'Lesson'], ['terms', 'Key terms'], ['sources', 'Primary sources'], ['ids', 'Short IDs'], ['check', 'Practice check'], ['readings', 'Readings']];
const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});

export function Term({t, cls}) {
  return <div className="term">
    <dt><b>{t.t}</b>{t.ar && <span className="ar" lang={/[پچژگکی]/.test(t.ar) ? 'fa' : 'ar'} dir="rtl">{t.ar}</span>}{t.tr && <i className="tr">{t.tr}</i>}</dt>
    <dd>{t.d} <span className="src">{cls ? `Class ${cls} ` : ''}{t.src}</span></dd>
  </div>;
}

export default function ClassPage({n, query}) {
  const c = CLASSES[Number(n)];
  const prog = useProgress();
  useEffect(() => {
    const target = query.id ? `id-${query.id}` : query.go;
    if (target) setTimeout(() => scrollTo(target), 120);
  }, [n, query.id, query.go]);
  if (!c) return <PageHead title="Class not found" sub={<a href="#/">Back to the course map</a>}/>;
  const L = c.lesson;
  const prev = CLASSES[c.n - 1], next = CLASSES[c.n + 1];
  const sections = SUBNAV.filter(([id]) => id === 'readings' || id === 'lesson' || (id === 'terms' && L?.terms?.length) || (id === 'sources' && L?.sources?.length) || (id === 'ids' && c.ids.length) || (id === 'check' && c.posted && c.qs.length));
  return <div className="class-page">
    <PageHead crumbs={[['#/', 'Course map'], [`#/unit/${c.unit}`, `Unit ${c.unit}`], [null, `Class ${c.n}`]]}
      eyebrow={`Class ${c.n} · ${fmtDate(c.date)} · Part ${c.part.id}: ${c.part.title}`} title={c.title}
      sub={c.guest ? `Guest lecture: ${c.guest}` : null}>
      <div className="head-meta">
        {c.posted ? <span className="chip ok">Lesson ready</span> : <span className="chip pend"><Hourglass size={12}/> Pending</span>}
        {prog.read[c.n] && <span className="chip">Read</span>}
        {prog.checks[c.n] && <span className="chip ok">Check passed</span>}
        {L?.src?.length > 0 && <span className="small muted">Built from <SrcTags src={L.src}/></span>}
      </div>
    </PageHead>

    <nav className="subnav" aria-label="On this page">{sections.map(([id, l]) => <button key={id} onClick={() => scrollTo(id)}>{l}</button>)}</nav>

    {c.note && <p className="note">{c.note}</p>}

    {c.questions && <section className="guiding">
      <h2 className="mini-h">Guiding questions</h2>
      {c.questions.length ? <ul>{c.questions.map(q => <li key={q}>{q}</li>)}</ul> : <p className="muted small">None listed on the syllabus.</p>}
      <p className="small muted">Paraphrased from the syllabus. The test study guides suggest checking that you can answer these from the slides.</p>
    </section>}

    <div id="lesson" className="anchor">
      {c.posted ? <>
        {L.summary && <p className="summary">{L.summary}</p>}
        <Lesson cls={c.n} onDone={() => scrollTo(c.qs.length ? 'check' : 'terms')}/>
      </> : <section className="pending-card">
        <Hourglass size={22}/>
        <div><h2>Pending</h2>
          <p>The slides for this class are not in the course files yet, so there is no lesson here. This page fills in once they post. Until then, use the guiding questions, the readings and your lecture notes.</p>
          {L?.summary && <p className="small muted">{L.summary}</p>}
        </div>
      </section>}
    </div>

    {L?.terms?.length > 0 && <section id="terms" className="anchor">
      <Divider/>
      <h2 className="sec-title">Key terms</h2>
      <dl className="terms">{L.terms.map(t => <Term key={t.t} t={t} cls={c.n}/>)}</dl>
      <p className="small muted">Every term is in the <a href="#/glossary">glossary</a> and the <a href="#/flashcards">flashcards</a>.</p>
    </section>}

    {L?.sources?.length > 0 && <section id="sources" className="anchor">
      <Divider/>
      <h2 className="sec-title">Primary sources</h2>
      <ul className="sources">{L.sources.map(s => <li key={s.name}>
        <b>{s.name}</b>
        {(s.when || s.where) && <span className="src-meta">{[s.when, s.where].filter(Boolean).join(' · ')}</span>}
        {s.note && <p>{s.note}</p>}
        {s.link && <a href={s.link} target="_blank" rel="noreferrer">Open <ExternalLink size={12}/></a>}
      </li>)}</ul>
    </section>}

    {c.ids.length > 0 && <section id="ids" className="anchor">
      <Divider/>
      <h2 className="sec-title">Short IDs from this class</h2>
      <p className="muted small">On the {c.unit === 1 ? 'Test 1' : 'Test 2'} study guide. Write yours, then compare with the model and score it on the rubric.</p>
      <div className="idgrid">{c.ids.map(k => <IdPractice key={k} id={k}/>)}</div>
    </section>}

    {c.posted && c.qs.length > 0 && <section id="check" className="anchor">
      <Divider/>
      <h2 className="sec-title">Practice check</h2>
      <Check key={c.n} cls={c.n} pool={c.qs}/>
    </section>}

    <section id="readings" className="anchor">
      <Divider/>
      <h2 className="sec-title">Readings and sources on the syllabus</h2>
      <p className="small muted">Citations only. Read them in full on <a href={CANVAS_URL} target="_blank" rel="noreferrer">Canvas</a>; this site does not summarize the readings.</p>
      <div className="two-col">
        <div><h3 className="mini-h"><BookMarked size={14}/> Readings</h3>{c.readings.length ? <ul className="cites">{c.readings.map(r => <li key={r}>{r}</li>)}</ul> : <p className="muted small">None listed.</p>}</div>
        <div><h3 className="mini-h">Primary sources</h3>{c.primary.length ? <ul className="cites">{c.primary.map(r => <li key={r}>{r}</li>)}</ul> : <p className="muted small">None listed.</p>}</div>
      </div>
    </section>

    <nav className="pager">
      {prev ? <a href={`#/class/${prev.n}`}><ArrowLeft size={15}/><span><small>Class {prev.n}</small>{prev.title}</span></a> : <span/>}
      {next ? <a className="next" href={`#/class/${next.n}`}><span><small>Class {next.n}</small>{next.title}</span><ArrowRight size={15}/></a> : <span/>}
    </nav>
  </div>;
}

