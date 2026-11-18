import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MotionConfig} from 'motion/react';
import {Footer, Header, PageHead, SearchOverlay} from './components/Layout';
import {useRoute} from './lib/router';
import {initialTheme, saveTheme, setLast} from './lib/store';
import Home from './pages/Home';
import UnitPage from './pages/UnitPage';
import ClassPage from './pages/ClassPage';
import SectionPage from './pages/SectionPage';
import TestPage from './pages/TestPage';
import Glossary from './pages/Glossary';
import Chronology from './pages/Chronology';
import MapPage from './pages/MapPage';
import Flashcards from './pages/Flashcards';
import Review from './pages/Review';
import About from './pages/About';
import {CLASSES, TESTS, UNITS} from './content';
import './styles.css';

function titleFor(path) {
  const [a, b] = path;
  if (a === 'class' && CLASSES[b]) return `Class ${b}: ${CLASSES[b].title}`;
  if (a === 'unit') return `Unit ${b}: ${UNITS.find(u => u.n === Number(b))?.title || ''}`;
  if (a === 'section') return `Section ${b}`;
  if (a === 'test' && TESTS[b]) return TESTS[b].name;
  if (a) return a[0].toUpperCase() + a.slice(1);
  return null;
}

function Page({route}) {
  const [a, b] = route.path;
  const q = route.query;
  switch (a) {
    case undefined: return <Home/>;
    case 'unit': return <UnitPage n={b}/>;
    case 'class': return <ClassPage n={b} query={q}/>;
    case 'section': return <SectionPage n={b}/>;
    case 'test': return <TestPage k={b} query={q}/>;
    case 'glossary': return <Glossary query={q}/>;
    case 'chronology': return <Chronology query={q}/>;
    case 'map': return <MapPage query={q}/>;
    case 'flashcards': return <Flashcards query={q}/>;
    case 'review': return <Review/>;
    case 'about': return <About/>;
    default: return <PageHead title="Page not found" sub={<a href="#/">Go to the course map</a>}/>;
  }
}

function App() {
  const route = useRoute();
  const [theme, setTheme] = useState(initialTheme);
  const [searching, setSearching] = useState(false);
  const pathKey = route.path?.join('/') || '';
  useEffect(() => {document.documentElement.dataset.theme = theme; saveTheme(theme); document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme === 'dark' ? '#121725' : '#f6efe1');}, [theme]);
  useEffect(() => {
    if (route.redirect) return;
    const t = titleFor(route.path || []);
    document.title = t ? `${t} · MIDEAST 200 study guide` : 'MIDEAST 200 study guide · Fall 2026';
    if (['class', 'unit', 'section', 'test'].includes(route.path?.[0])) setLast(`#/${route.path.join('/')}`);
    if (!route.query?.id && !route.query?.go) window.scrollTo({top: 0});
  }, [pathKey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const h = e => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {e.preventDefault(); setSearching(true);}
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
  if (route.redirect) return null;
  return <>
    <a className="skip" href="#main" onClick={e => {e.preventDefault(); document.getElementById('main')?.focus();}}>Skip to content</a>
    <Header theme={theme} setTheme={setTheme} onSearch={() => setSearching(true)} routeKey={`${pathKey}?${JSON.stringify(route.query)}`}/>
    <main id="main" tabIndex={-1}><Page key={pathKey} route={route}/></main>
    <Footer/>
    <SearchOverlay open={searching} onClose={() => setSearching(false)}/>
  </>;
}

createRoot(document.getElementById('root')).render(<MotionConfig reducedMotion="user"><App/></MotionConfig>);
