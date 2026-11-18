import React, {useMemo} from 'react';
import {Search} from 'lucide-react';
import {PageHead} from '../components/Layout';
import {CLASSES, GLOSSARY, UNITS, norm} from '../content';
import {setQuery} from '../lib/router';

export default function Glossary({query}) {
  const q = query.q || '';
  const unit = Number(query.unit) || 0;
  const list = useMemo(() => {
    const w = norm(q);
    return GLOSSARY.filter(g => (!unit || g.defs.some(d => CLASSES[d.cls].unit === unit)) && (!w || norm(g.t).includes(w) || norm(g.tr || '').includes(w) || g.defs.some(d => norm(d.d).includes(w))));
  }, [q, unit]);
  const letters = [...new Set(list.map(g => norm(g.t)[0]?.toUpperCase()))].filter(Boolean);
  return <div className="glossary-page">
    <PageHead crumbs={[['#/', 'Course map'], [null, 'Glossary']]} eyebrow={`${GLOSSARY.length} entries`} title="Glossary"
      sub="Key terms from the class lessons plus every short ID on the two study guides, with Arabic or Persian script where the course used it. Each definition is tagged with the class and source it came from."/>
    <div className="filters">
      <label className="searchfield"><Search size={16}/><input value={q} onChange={e => setQuery({q: e.target.value})} placeholder="Filter terms" aria-label="Filter glossary"/></label>
      <div className="seg" role="group" aria-label="Unit">{[0, ...UNITS.map(u => u.n)].map(n => <button key={n} className={unit === n ? 'on' : ''} onClick={() => setQuery({unit: n || null})}>{n ? `Unit ${n}` : 'All'}</button>)}</div>
    </div>
    <nav className="letters" aria-label="Jump to letter">{letters.map(l => <a key={l} href={`#/glossary?${new URLSearchParams({...(q ? {q} : {}), ...(unit ? {unit} : {})})}`} onClick={e => {e.preventDefault(); document.getElementById(`L-${l}`)?.scrollIntoView({behavior: 'smooth'});}}>{l}</a>)}</nav>
    <p className="small muted">{list.length} shown</p>
    <dl className="glossary">{list.map((g, i) => {
      const L = norm(g.t)[0]?.toUpperCase();
      const first = i === 0 || norm(list[i - 1].t)[0]?.toUpperCase() !== L;
      return <div key={g.t} className="gl-entry" id={first ? `L-${L}` : undefined}>
        <dt><b>{g.t}</b>{g.ar && <span className="ar" lang={/[پچژگکی]/.test(g.ar) ? 'fa' : 'ar'} dir="rtl">{g.ar}</span>}{g.tr && <i className="tr">{g.tr}</i>}{g.id && <span className="chip">Study-guide ID</span>}</dt>
        {g.defs.map((d, j) => <dd key={j}>{d.d} <a className="src" href={g.id && d.src.startsWith('Short') ? `#/class/${d.cls}?id=${g.id}` : `#/class/${d.cls}`}>{d.src}</a></dd>)}
      </div>;
    })}</dl>
  </div>;
}
