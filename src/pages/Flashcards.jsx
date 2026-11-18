import React, {useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {Check, RotateCcw, Undo2} from 'lucide-react';
import GeoMap, {GEO} from '../components/GeoMap';
import {QUIZ_BOX} from '../components/MapQuiz';
import {PageHead} from '../components/Layout';
import {CHRONO_U1, CHRONO_U2, CLASSES, GLOSSARY, IDS, QUIZ, UNITS, fmtSpan} from '../content';
import {setQuery} from '../lib/router';
import {rateCard, shuffle, useProgress} from '../lib/store';

const DECKS = {
  terms: {label: 'Key terms', cards: GLOSSARY.filter(g => !g.id).map(g => ({id: `t:${g.t}`, unit: CLASSES[g.defs[0].cls].unit, front: g.t, ar: g.ar, back: g.defs.map(d => d.d).join(' '), src: g.defs.map(d => `Class ${d.cls}`).join(', ')}))},
  ids: {label: 'Short IDs', cards: Object.values(IDS).filter(i => !i.pending).map(i => ({id: `i:${i.key}`, unit: CLASSES[i.cls].unit, front: i.name, back: i.intro, more: [i.d1, i.d2, i.sig], src: `Class ${i.cls}`}))},
  periods: {label: 'Periods', cards: [...CHRONO_U1.map(p => ({...p, unit: 1})), ...CHRONO_U2.map(p => ({...p, unit: 2}))].map(p => ({id: `p:${p.id}`, unit: p.unit, front: p.name, back: fmtSpan(p), more: [p.hook], src: `Test ${p.unit} study guide`}))},
  map: {label: 'Map Quiz', cards: QUIZ.map(q => ({id: `m:${q.id}`, unit: 1, front: q.name, map: q.id, src: 'Course location list'}))}
};

export default function Flashcards({query}) {
  const deckKey = DECKS[query.deck] ? query.deck : 'terms';
  const unit = Number(query.unit) || 0;
  const prog = useProgress();
  const [flip, setFlip] = useState(false);
  const [round, setRound] = useState(0);
  const [hist, setHist] = useState([]);
  const pool = useMemo(() => DECKS[deckKey].cards.filter(c => !unit || c.unit === unit), [deckKey, unit]);
  // Due cards first (never seen or due now), then the rest.
  const order = useMemo(() => {
    const now = Date.now();
    const due = shuffle(pool.filter(c => !prog.cards[c.id] || prog.cards[c.id].due <= now));
    const later = shuffle(pool.filter(c => prog.cards[c.id] && prog.cards[c.id].due > now));
    return [...due, ...later].map(c => c.id);
  }, [pool, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const byId = Object.fromEntries(pool.map(c => [c.id, c]));
  const card = byId[order[i]];
  const learned = pool.filter(c => (prog.cards[c.id]?.box || 0) >= 2).length;
  const rate = good => {rateCard(card.id, good); setHist(h => [...h, i]); setFlip(false); setI(n => n + 1);};
  const restart = () => {setI(0); setFlip(false); setRound(r => r + 1); setHist([]);};
  return <div className="cards-page">
    <PageHead crumbs={[['#/', 'Course map'], [null, 'Flashcards']]} eyebrow={`${pool.length} cards · ${learned} learned`} title="Flashcards"
      sub="Cards you mark “Got it” come back after longer gaps; cards you miss come back soon. Your boxes are saved in this browser."/>
    <div className="filters">
      <div className="seg" role="group" aria-label="Deck">{Object.entries(DECKS).map(([k, d]) => <button key={k} className={deckKey === k ? 'on' : ''} onClick={() => {setQuery({deck: k === 'terms' ? null : k}); setI(0); setFlip(false);}}>{d.label}</button>)}</div>
      {deckKey !== 'map' && <div className="seg" role="group" aria-label="Unit">{[0, ...UNITS.map(u => u.n)].filter(n => n === 0 || DECKS[deckKey].cards.some(c => c.unit === n)).map(n => <button key={n} className={unit === n ? 'on' : ''} onClick={() => {setQuery({unit: n || null}); setI(0); setFlip(false);}}>{n ? `Unit ${n}` : 'All'}</button>)}</div>}
    </div>
    {!card ? <div className="check done"><Check size={22}/><div><h3>Deck done.</h3><p className="muted">{learned} of {pool.length} cards are in box 2 or higher.</p></div><button className="btn ghost" onClick={restart}><RotateCcw size={14}/> Go again</button></div>
      : <>
        <div className="flash-wrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.button key={`${card.id}-${flip}`} className={`flash ${flip ? 'back' : ''}`} onClick={() => setFlip(f => !f)} initial={{rotateY: flip ? -90 : 90, opacity: 0}} animate={{rotateY: 0, opacity: 1}} exit={{opacity: 0}} transition={{duration: .22}} aria-label={flip ? 'Show front' : 'Show answer'}>
              {!flip ? <>
                <span className="flash-k">{DECKS[deckKey].label}</span>
                <b className="flash-front">{card.front}</b>
                {card.ar && <span className="ar" dir="rtl">{card.ar}</span>}
                <span className="small muted">Tap to flip</span>
              </> : <>
                <span className="flash-k">{card.front}</span>
                {card.map ? <div className="flash-map"><GeoMap box={QUIZ_BOX} markers={QUIZ.map(q => ({key: q.id, xy: GEO.quiz[q.id], kind: q.kind, state: q.id === card.map ? 'active' : 'dim'}))} quizRivers scaleTo={700} label={`Location of ${card.front}`}/></div>
                  : <p className="flash-back">{card.back}</p>}
                {card.more && <ul className="flash-more">{card.more.map((m, j) => <li key={j}>{m}</li>)}</ul>}
                <span className="src">{card.src}</span>
              </>}
            </motion.button>
          </AnimatePresence>
        </div>
        <div className="flash-ctrl">
          <span className="small muted">{i + 1} of {order.length}</span>
          <button className="btn ghost" onClick={() => {if (!hist.length) return; setI(hist[hist.length - 1]); setHist(h => h.slice(0, -1)); setFlip(false);}} disabled={!hist.length}><Undo2 size={14}/> Back</button>
          <button className="btn no" onClick={() => rate(false)}>Again</button>
          <button className="btn ok" onClick={() => rate(true)}><Check size={15}/> Got it</button>
        </div>
      </>}
  </div>;
}
