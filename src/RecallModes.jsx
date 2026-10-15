import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, RotateCcw, Shuffle, Sparkles, X } from 'lucide-react';
import { data, periods, cards, artifacts, images, shuffle, fmtYear, recordAttempt, rateCard, useProgress, useStoredState } from './core';
import './recall.css';

const periodById = Object.fromEntries((periods || []).map(p => [p.id, p]));
const EMPTY_FOCUS = [];
const values = x => Array.isArray(x) ? x : [];
const title = c => c?.name || c?.title || c?.label || 'Untitled';
const periodFor = c => periodById[c?.periodId] || periodById[c?.period] || periods?.find(p => p.name === c?.periodName);
const textDetail = c => c?.significance || c?.description || c?.summary || '';
const cardDate = c => c?.date || (Number.isFinite(c?.startYear) ? fmtYear(c.startYear) : '');
const imageMeta = id => images?.[id] || artifacts?.find?.(a => a.id === id) || {};
const artFor = id => imageMeta(id)?.url || imageMeta(id)?.image || null;
const itemId = a => a?.id || a?.itemId;

function Image({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return src && !failed ? <img className={className} src={src} alt={alt} onError={() => setFailed(true)} /> : <div className={`recall-image-fallback ${className}`} role="img" aria-label="Image unavailable">Image unavailable</div>;
}

function useKeys(onKey) {
  useEffect(() => {
    const fn = e => {
      const el = e.target;
      if (el?.tagName === 'INPUT' || el?.tagName === 'TEXTAREA' || el?.isContentEditable) return;
      onKey(e);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onKey]);
}

export function Flashcards({ focusIds = EMPTY_FOCUS, onClearFocus }) {
  const progress = useProgress();
  const [filter, setFilter] = useStoredState('flash-filter', 'all');
  const [missQueue, setMissQueue] = useStoredState('flash-misses', []);
  const [queueOnly, setQueueOnly] = useState(false);
  const [deck, setDeck] = useState(() => shuffle(values(cards)));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [session, setSession] = useState({ seen: 0, right: 0 });

  const filtered = useMemo(() => {
    let source = values(cards);
    if (focusIds?.length) source = source.filter(c => focusIds.includes(c.id));
    else if (filter !== 'all') {
      if (filter === 'periods') source = source.filter(c => c.type === 'period' || periodById[c.id]);
      else if (filter === 'artifacts') source = source.filter(c => c.type === 'artifact');
      else if (filter === 'themes') source = source.filter(c => c.type === 'theme' || c.type === 'myth');
      else source = source.filter(c => c.periodId === filter || c.period === filter);
    }
    return source;
  }, [filter, focusIds]);
  useEffect(() => {
    if (queueOnly) return;
    const now = Date.now();
    const dueOrdered = shuffle(filtered).sort((a,b) => {
      const da = progress?.srs?.[a.id]?.due || 0, db = progress?.srs?.[b.id]?.due || 0;
      const aFuture = da > now, bFuture = db > now;
      if (aFuture !== bFuture) return aFuture ? 1 : -1;
      return da - db;
    });
    setDeck(dueOrdered); setIndex(0); setFlipped(false);
  }, [filtered, queueOnly]);

  const current = deck[index];
  const step = useCallback(delta => { if (!deck.length) return; setIndex(i => (i + delta + deck.length) % deck.length); setFlipped(false); }, [deck.length]);
  const grade = useCallback(rating => {
    if (!current) return;
    const right = rating !== 'again';
    rateCard(current.id, rating);
    setSession(s => ({ seen: s.seen + 1, right: s.right + (right ? 1 : 0) }));
    setMissQueue(q => right ? q.filter(id => id !== current.id) : [...new Set([...q, current.id])]);
    if (rating === 'again') {
      setDeck(items => {
        if (items.length < 2) return items;
        const next = [...items];
        const [missed] = next.splice(index, 1);
        next.splice(Math.min(index + 2, next.length), 0, missed);
        return next;
      });
      setIndex(i => i < deck.length - 1 ? i : 0);
      setFlipped(false);
      if (queueOnly) return;
      return;
    }
    if (queueOnly) {
      setDeck(items => items.filter((_, i) => i !== index));
      setIndex(i => Math.max(0, Math.min(i, deck.length - 2)));
      setFlipped(false);
      return;
    }
    step(1);
  }, [current, setMissQueue, step, index, queueOnly, deck.length]);
  const onKey = useCallback(e => {
    if (e.code === 'Space') { e.preventDefault(); setFlipped(v => !v); }
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (flipped && ['1','2','3','4'].includes(e.key)) grade(['again','hard','good','easy'][Number(e.key)-1]);
  }, [flipped, step, grade]);
  useKeys(onKey);

  const swipe = e => {
    if (touchStart == null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 45) { if (flipped) grade(dx < 0 ? 'good' : 'again'); else setFlipped(true); }
    setTouchStart(null);
  };
  const p = current && periodFor(current);
  const srs = current && progress?.srs?.[current.id];
  const completion = deck.length ? Math.round((session.seen % deck.length) / deck.length * 100) : 0;

  return <section className="recall-mode">
    <header className="mode-header recall-header"><div><div className="eyebrow">RECALL / 01</div><h1>Flashcards</h1><p className="muted">Build a durable memory, one card at a time.</p></div><div className="recall-header-stat"><span className="muted">This session</span><strong>{session.right}<small> / {session.seen}</small></strong></div></header>
    <div className="recall-toolbar">
      <div className="recall-filters" aria-label="Choose deck">{['all','periods','artifacts','themes'].map(k => <button key={k} className={`recall-filter ${filter === k && !queueOnly ? 'active' : ''}`} onClick={() => { setQueueOnly(false); setFilter(k); }}>{k === 'all' ? 'All cards' : k === 'periods' ? 'Periods' : k === 'artifacts' ? 'Artifacts' : 'Themes'}</button>)}
        <label className="recall-select"><span className="sr-only">Filter by period</span><select value={['all','periods','artifacts','themes'].includes(filter) ? '' : filter} onChange={e => { setQueueOnly(false); setFilter(e.target.value || 'all'); }}><option value="">By period</option>{values(periods).map(p => <option value={p.id} key={p.id}>{p.name}</option>)}</select><ChevronDown size={14}/></label>
      </div>
      <div className="recall-toolbar-actions"><button className={`button ${queueOnly ? 'primary' : 'secondary'}`} onClick={() => { if (queueOnly) { setQueueOnly(false); setFilter('all'); return; } setDeck(shuffle(values(cards).filter(c => missQueue.includes(c.id)))); setIndex(0); setFlipped(false); setQueueOnly(true); setFilter('all'); }} disabled={!queueOnly && !missQueue.length}><RotateCcw size={15}/> Missed <span>{missQueue.length}</span></button>{focusIds?.length > 0 && <button className="button ghost" onClick={onClearFocus}>Clear focus</button>}<button className="button ghost" onClick={() => { setDeck(shuffle(queueOnly ? deck : filtered)); setIndex(0); setFlipped(false); }} aria-label="Shuffle deck"><Shuffle size={16}/></button></div>
    </div>
    <div className="recall-progress-line"><div className="progress-track"><span style={{ width: `${completion}%` }}/></div><span>{current ? `${index + 1} of ${deck.length}` : '0 cards'}</span></div>
    {current ? <>
      <div className="recall-stage" onTouchStart={e => setTouchStart(e.touches[0].clientX)} onTouchEnd={swipe}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article key={current.id + (flipped ? '-back' : '-front')} className={`recall-card ${flipped ? 'is-back' : ''}`} initial={{ opacity: 0, y: 10, rotateX: flipped ? -7 : 7 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -6, rotateX: flipped ? 5 : -5 }} transition={{ duration: .22, ease: 'easeOut' }}>
            {!flipped ? <div className="recall-card-front"><div className="recall-card-meta"><span>{current.type === 'period' || periodById[current.id] ? 'PERIOD' : current.type === 'theme' || current.type === 'myth' ? 'THEME' : 'OBJECT / TEXT'}</span><span>RECALL</span></div><h2>{title(current)}</h2><p className="muted">{current.type === 'period' ? 'Recall the date range and historical context.' : ['theme','myth'].includes(current.type) ? 'Recall the definition, two details, and why it matters.' : 'Recall its date, place, two details, and significance.'}</p><button className="recall-reveal" onClick={() => setFlipped(true)}>Reveal answer <ArrowRight size={16}/></button><div className="recall-card-foot"><span>Think of the historical context</span><span>Space to reveal</span></div></div> : <div className="recall-card-back"><div className="recall-answer-head"><div><span className="eyebrow">ANSWER</span><h2>{title(current)}</h2></div>{current.verifyWithSlides && <span className="badge verify">Verify with slides</span>}</div>
              {artFor(current.id) && <div className="recall-art"><Image src={artFor(current.id)} alt={title(current)} /><small>{imageMeta(current.id)?.credit || imageMeta(current.id)?.license || ''}</small></div>}
              <div className="recall-facts"><div><span>PERIOD</span><strong>{p?.name || current.periodName || current.periodLabel || 'Across periods'}</strong></div><div><span>DATE</span><strong>{cardDate(current) || p?.date || 'Not specified'}</strong></div><div><span>LOCATION</span><strong>{current.location || p?.location || 'Not specified'}</strong></div></div>
              {values(current.details).length > 0 ? <ul className="recall-details">{current.details.slice(0,3).map((d,i) => <li key={i}>{d}</li>)}</ul> : textDetail(current) && <p className="recall-significance">{textDetail(current)}</p>}
              {current.significance && <p className="recall-significance"><b>Why it matters</b>{current.significance}</p>}
              <div className="recall-card-foot"><span>{srs ? `Review interval · ${srs.interval}d` : 'Choose how well you recalled it'}</span><span>1–4 to rate</span></div>
            </div>}
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="recall-controls"><button className="button secondary" onClick={() => step(-1)} aria-label="Previous card"><ArrowLeft size={16}/> Previous</button>{!flipped ? <button className="button primary" onClick={() => setFlipped(true)}>Show answer <ArrowRight size={16}/></button> : <div className="recall-ratings"><button onClick={() => grade('again')}><span>Again</span><small>1 · miss</small></button><button onClick={() => grade('hard')}><span>Hard</span><small>2 · unsure</small></button><button className="selected" onClick={() => grade('good')}><span>Good</span><small>3 · recalled</small></button><button onClick={() => grade('easy')}><span>Easy</span><small>4 · effortless</small></button></div>}<button className="button secondary" onClick={() => step(1)} aria-label="Next card">Next <ArrowRight size={16}/></button></div>
      <p className="recall-hint">Swipe left to mark recalled · swipe right to review again</p>
    </> : <div className="recall-empty panel"><Sparkles size={22}/><h2>{queueOnly ? 'Your missed queue is clear' : 'No cards in this deck'}</h2><p className="muted">{queueOnly ? 'The cards you struggled with have been cleared.' : 'Choose another filter to continue.'}</p><button className="button secondary" onClick={() => { setQueueOnly(false); setFilter('all'); }}>Show all cards</button></div>}
  </section>;
}

export function ImageMatch() {
  const [direction, setDirection] = useStoredState('image-match-direction', 'forward');
  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [counts, setCounts] = useState({ correct: 0, answered: 0 });
  const [round, setRound] = useState(1);
  const quizItems = useMemo(() => values(cards).filter(c => c.type === 'artifact'), []);
  const eligible = useMemo(() => quizItems.filter(c => Boolean(artFor(c.id))), [quizItems, direction]);
  const roundItems = useMemo(() => shuffle(eligible).slice(0, Math.min(10, eligible.length)), [eligible, round]);
  useEffect(() => { setDeck(roundItems); setIndex(0); setStage(0); setSelected(null); setAnswered(false); }, [roundItems]);
  const item = deck[index];
  const period = item && periodFor(item);
  const stages = direction === 'forward' ? ['name', 'period', 'significance'] : ['image'];
  const currentStage = stages[stage] || stages[0];
  const answer = !item ? null : currentStage === 'name' ? title(item) : currentStage === 'period' ? (period?.name || item.periodName || item.periodLabel || periodById[item.period]?.name || item.period || 'Not specified') : currentStage === 'significance' ? (item.significance || 'Not specified') : item.id;
  const options = useMemo(() => {
    if (!item) return [];
    if (currentStage === 'image') {
      const pool = shuffle(eligible.filter(c => c.id !== item.id).filter(c => artFor(c.id))).slice(0,3).map(c => ({ id:c.id, label:title(c), src:artFor(c.id) }));
      return shuffle([{ id:item.id, label:title(item), src:artFor(item.id) }, ...pool]);
    }
    let wrong;
    if (currentStage === 'name') wrong = quizItems.filter(c => c.id !== item.id).map(title);
    else if (currentStage === 'period') wrong = values(periods).filter(p => p.id !== period?.id).map(title);
    else wrong = quizItems.filter(c => c.id !== item.id).map(c => c.significance).filter(Boolean);
    return shuffle([...new Set([...shuffle(wrong).filter(x => x !== answer).slice(0,3), answer])]);
  }, [item, answer, currentStage, period?.id, eligible, quizItems]);
  const onKey = useCallback(e => { if (answered && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); advance(); } else if (!answered && /^[1-4]$/.test(e.key) && options[Number(e.key)-1]) choose(options[Number(e.key)-1]); }, [answered, options, index, deck, stage]);
  useKeys(onKey);
  function choose(option) {
    if (answered || !item) return;
    const value = currentStage === 'image' ? option.id : option;
    const correct = value === answer;
    setSelected(value); setAnswered(true); recordAttempt(item.id, correct);
    setCounts(s => ({ answered: s.answered + 1, correct: s.correct + (correct ? 1 : 0) }));
  }
  function advance() {
    if (stage + 1 < stages.length) { setStage(s => s + 1); setAnswered(false); setSelected(null); return; }
    if (index + 1 >= deck.length) { setRound(r => r + 1); setCounts({ correct: 0, answered: 0 }); }
    else { setIndex(i => i + 1); setStage(0); setAnswered(false); setSelected(null); }
  }
  const percent = deck.length ? ((index * stages.length + stage) / (deck.length * stages.length)) * 100 : 0;
  const gallery = quizItems;
  return <section className="recall-mode">
    <header className="mode-header recall-header"><div><div className="eyebrow">RECALL / 02</div><h1>Image match</h1><p className="muted">Connect objects to the histories they carry.</p></div><div className="recall-header-stat"><span className="muted">Round {round}</span><strong>{counts.correct}<small> / {counts.answered}</small></strong></div></header>
    <div className="image-direction" role="group" aria-label="Question direction"><button className={direction === 'forward' ? 'active' : ''} onClick={() => { setDirection('forward'); setCounts({correct:0,answered:0}); }}>Image → name → period → significance</button><button className={direction === 'reverse' ? 'active' : ''} onClick={() => { setDirection('reverse'); setCounts({correct:0,answered:0}); }}>Name → image</button></div>
    <div className="recall-progress-line"><div className="progress-track"><span style={{width:`${percent}%`}}/></div><span>{deck.length ? `Artifact ${index + 1} of ${deck.length} · ${currentStage === 'image' ? 'Image' : currentStage} ${stage + 1} of ${stages.length}` : 'Preparing'}</span></div>
    {item && <div className="image-question">
      <div className="image-question-meta"><span>ARTIFACT {String(index + 1).padStart(2,'0')}</span><span>{direction === 'reverse' ? 'NAME → VISUAL RECALL' : `IMAGE → ${String(currentStage).toUpperCase()}`}</span></div>
      {direction === 'forward' ? <div className="image-prompt"><Image src={artFor(item.id)} alt="Historical artifact" className="image-prompt-img" /></div> : <div className="image-name-prompt"><span className="eyebrow">OBJECT / TEXT</span><h2>{title(item)}</h2></div>}
      {!answered ? <p className="image-instruction">{currentStage === 'name' ? 'What is this object or text?' : currentStage === 'period' ? `Which period is ${title(item)} associated with?` : currentStage === 'significance' ? `What is the significance of ${title(item)}?` : `Choose the image of ${title(item)}.`}</p> : <div className={`image-feedback ${selected === answer ? 'is-correct' : 'is-wrong'}`}><span>{selected === answer ? <Check size={17}/> : <X size={17}/>}</span><div><b>{selected === answer ? 'Correct' : `Answer: ${currentStage === 'image' ? title(item) : answer}`}</b>{currentStage === 'significance' && <p>{textDetail(item)}</p>}{currentStage === 'period' && period?.significance && <p>{period.significance}</p>}{item.verifyWithSlides && <span className="badge verify image-verify-badge">Verify with slides</span>}</div></div>}
      <div className={`image-options ${currentStage === 'image' ? 'image-options-visual' : ''}`}>{options.map((option,i) => {const value = currentStage === 'image' ? option.id : option; const label = currentStage === 'image' ? option.label : option; return <motion.button key={value} className={`image-option ${currentStage === 'image' ? 'image-option-visual' : ''} ${answered && value === answer ? 'correct' : ''} ${answered && selected === value && value !== answer ? 'incorrect' : ''}`} onClick={() => choose(option)} disabled={answered} whileTap={!answered ? {scale:.985} : undefined} animate={answered && selected === value && value !== answer ? {x:[0,-4,4,0]} : {x:0}} transition={{duration:.24}}>{currentStage === 'image' ? <Image src={option.src} alt="Choice image" className="image-choice-img"/> : <span className="image-option-key">{i+1}</span>}<span className="image-option-label">{currentStage === 'image' && !answered ? `Image ${i+1}` : label}</span>{answered && value === answer && <Check size={17}/>}</motion.button>;})}</div>
      {answered && currentStage === 'image' && <div className="image-answer-attribution"><span>{imageMeta(item.id).credit || 'Source credit unavailable'}</span>{imageMeta(item.id).license && <span>{imageMeta(item.id).license}</span>}{imageMeta(item.id).description && <span>{imageMeta(item.id).description}</span>}{imageMeta(item.id).source && <a href={imageMeta(item.id).source} target="_blank" rel="noreferrer">Image source</a>}</div>}
      <div className="image-next-row">{answered ? <button className="button primary" onClick={advance}>{stage + 1 < stages.length ? `Continue to ${stages[stage + 1]}` : index + 1 < deck.length ? 'Next artifact' : 'Start next round'} <ArrowRight size={16}/><kbd>Enter</kbd></button> : <span className="muted">Select an answer to continue</span>}</div>
    </div>}
    <details className="image-gallery"><summary><span>Image collection</span><span>{gallery.length} study items</span></summary><div className="image-gallery-grid">{gallery.map(c => { const meta = imageMeta(c.id); const src = artFor(c.id); return <article key={c.id} className="image-gallery-card">{src ? <Image src={src} alt={title(c)} /> : <div className="image-gallery-placeholder"><span>{title(c)}</span><small>{meta.label || 'No specific image selected.'}</small></div>}<div><b>{title(c)}</b><small>{meta.credit || 'Image source unavailable'}</small>{meta.license && <small>{meta.license}</small>}{meta.source && <a href={meta.source} target="_blank" rel="noreferrer">View source</a>}</div></article>; })}</div></details>
  </section>;
}
