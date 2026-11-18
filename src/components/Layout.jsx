import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ChevronDown, ExternalLink, Menu, Moon, Search, Sun, X} from 'lucide-react';
import {CANVAS_URL, CLASS_LIST, SECTIONS, TESTS, UNITS, fmtDate, search} from '../content';

export const TileStrip = ({className = ''}) => <div className={`tile-strip ${className}`} aria-hidden/>;
export const Divider = () => <div className="star-divider" aria-hidden><span/></div>;

export function StarMark({size = 26}) {
  // Eight-point star (two overlapping squares) inside an octagon, the course site's mark.
  return <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className="starmark">
    <rect x="9" y="9" width="22" height="22" fill="none" strokeWidth="2.2"/>
    <rect x="9" y="9" width="22" height="22" fill="none" strokeWidth="2.2" transform="rotate(45 20 20)"/>
    <circle cx="20" cy="20" r="3.4"/>
  </svg>;
}

export const DISCLAIMER = 'Unofficial study aid made by a student. Not reviewed by the instructors, and not a substitute for the readings, lectures or discussion sections.';

export function Disclaimer({compact}) {
  return <p className={`disclaimer ${compact ? 'compact' : ''}`}>
    <b>Unofficial study aid.</b> Not reviewed by the instructors, and not a substitute for the readings, lectures or sections. Course files, readings and grades are on <a href={CANVAS_URL} target="_blank" rel="noreferrer">Canvas <ExternalLink size={12}/></a>.
  </p>;
}

const STUDY = [['#/glossary', 'Glossary'], ['#/chronology', 'Chronology'], ['#/map', 'Map'], ['#/flashcards', 'Flashcards'], ['#/review', 'Review']];

function MenuBody({id}) {
  if (id === 'units') return <ul className="menu-list">{UNITS.map(u => <li key={u.n}><a href={`#/unit/${u.n}`}><b>Unit {u.n}</b> {u.title}<small>Classes {u.classes[0]}–{u.classes[1]}</small></a></li>)}</ul>;
  if (id === 'classes') return <div className="menu-classes">{UNITS.map(u => <div key={u.n}><p className="menu-h">Unit {u.n} · {u.title}</p><ul className="menu-list">
    {CLASS_LIST.filter(c => c.unit === u.n).map(c => <li key={c.n}><a href={`#/class/${c.n}`} className={c.posted ? '' : 'pend'}><span className="num">{c.n}</span><span className="date">{fmtDate(c.date)}</span><span className="ttl">{c.title}</span></a></li>)}
  </ul></div>)}</div>;
  if (id === 'sections') return <ul className="menu-list">{SECTIONS.map(s => <li key={s.n}><a href={`#/section/${s.n}`}><span className="num">{s.n}</span><span className="date">{fmtDate(s.date)}</span><span className="ttl">{s.activity}</span></a></li>)}</ul>;
  if (id === 'tests') return <ul className="menu-list">{Object.values(TESTS).map(t => <li key={t.key}><a href={`#/test/${t.key}`}><b>{t.name}</b><small>{fmtDate(t.date)}{t.pending ? ' · format pending' : ''}</small></a></li>)}</ul>;
  return <ul className="menu-list">{STUDY.map(([h, l]) => <li key={h}><a href={h}>{l}</a></li>)}</ul>;
}
const MENUS = [['units', 'Units'], ['classes', 'Classes'], ['sections', 'Sections'], ['tests', 'Tests'], ['study', 'Study tools']];

export function Header({theme, setTheme, onSearch, routeKey}) {
  const [open, setOpen] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const ref = useRef(null);
  useEffect(() => {setOpen(null); setDrawer(false);}, [routeKey]);
  useEffect(() => {
    const h = e => {if (ref.current && !ref.current.contains(e.target)) setOpen(null);};
    const k = e => {if (e.key === 'Escape') {setOpen(null); setDrawer(false);}};
    document.addEventListener('pointerdown', h); document.addEventListener('keydown', k);
    return () => {document.removeEventListener('pointerdown', h); document.removeEventListener('keydown', k);};
  }, []);
  return <header className="site-head" ref={ref}>
    <div className="head-in">
      <a className="brand" href="#/"><StarMark/><span><b>MIDEAST 200</b><small>Study guide · Fall 2026</small></span></a>
      <nav className="mainnav" aria-label="Main">
        {MENUS.map(([id, label]) => <div key={id} className={`menu ${open === id ? 'open' : ''}`}>
          <button aria-expanded={open === id} onClick={() => setOpen(o => o === id ? null : id)}>{label} <ChevronDown size={14}/></button>
          <AnimatePresence>{open === id && <motion.div className={`menu-pop ${id}`} initial={{opacity: 0, y: -4}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -4}} transition={{duration: .14}}><MenuBody id={id}/></motion.div>}</AnimatePresence>
        </div>)}
      </nav>
      <div className="head-tools">
        <button className="icon-btn" onClick={onSearch} aria-label="Search the site"><Search size={18}/><kbd className="hide-sm">/</kbd></button>
        <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Use light theme' : 'Use dark theme'}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <button className="icon-btn menu-btn" onClick={() => setDrawer(d => !d)} aria-label="Open menu" aria-expanded={drawer}>{drawer ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
    </div>
    <TileStrip/>
    <AnimatePresence>{drawer && <motion.nav className="drawer" aria-label="Menu" initial={{opacity: 0, y: -8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -8}} transition={{duration: .16}}>
      {MENUS.map(([id, label]) => <details key={id} open={id === 'classes' ? undefined : undefined}><summary>{label}<ChevronDown size={16}/></summary><MenuBody id={id}/></details>)}
    </motion.nav>}</AnimatePresence>
  </header>;
}

export function Footer() {
  return <footer className="site-foot">
    <TileStrip className="flip"/>
    <div className="foot-in">
      <p><b>Unofficial study aid.</b> Made by a student for classmates in MIDEAST 200 (Fall 2026). It has not been reviewed by the instructors and is not a substitute for the readings, lectures or discussion sections. Lesson notes paraphrase the class slides and roadmaps; readings are listed as citations only.</p>
      <p><a href={CANVAS_URL} target="_blank" rel="noreferrer">Course files on Canvas <ExternalLink size={12}/></a> · <a href="#/about">About this site</a> · Progress is saved only in your own browser.</p>
    </div>
  </footer>;
}

const TYPE_ORDER = ['Class', 'Short ID', 'Term', 'Lesson', 'Source', 'Reading', 'Period', 'Place', 'Map', 'Section', 'Test'];
export function SearchResults({q, onPick, limit = 30}) {
  const res = search(q, limit);
  if (!q.trim()) return null;
  if (!res.length) return <p className="muted small search-empty">No matches for “{q}”.</p>;
  return <ul className="search-res">{res.map((r, i) => <li key={i}><a href={r.href} onClick={onPick}>
    <span className={`tag t${TYPE_ORDER.indexOf(r.type)}`}>{r.type}</span>
    <span className="sr-title">{r.title}</span>
    {r.cls && r.type !== 'Class' && <span className="sr-cls">Class {r.cls}</span>}
  </a></li>)}</ul>;
}

export function SearchOverlay({open, onClose}) {
  const [q, setQ] = useState('');
  const input = useRef(null);
  useEffect(() => {if (open) setTimeout(() => input.current?.focus(), 30);}, [open]);
  return <AnimatePresence>{open && <motion.div className="search-ov" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={onClose}>
    <motion.div className="search-box" role="dialog" aria-label="Search" initial={{y: -12}} animate={{y: 0}} onClick={e => e.stopPropagation()}>
      <div className="search-in"><Search size={18}/><input ref={input} value={q} onChange={e => setQ(e.target.value)} placeholder="Search classes, terms, short IDs, sources, places…" aria-label="Search"/><button className="icon-btn" onClick={onClose} aria-label="Close search"><X size={18}/></button></div>
      <SearchResults q={q} onPick={onClose}/>
      {!q && <p className="muted small search-empty">Try “Cyrus”, “mawla”, “Seljuks” or “Kerma”.</p>}
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

export function PageHead({eyebrow, title, sub, children, crumbs}) {
  return <div className="page-head">
    {crumbs && <nav className="crumbs" aria-label="Breadcrumb">{crumbs.map(([h, l], i) => <React.Fragment key={i}>{i > 0 && <span>/</span>}{h ? <a href={h}>{l}</a> : <span>{l}</span>}</React.Fragment>)}</nav>}
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h1>{title}</h1>
    {sub && <p className="lede">{sub}</p>}
    {children}
  </div>;
}
