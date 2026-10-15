import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clipboard, Clock3, RotateCcw } from 'lucide-react';
import { artifacts, cards, checkRange, data, periods, questions, recordAttempt, shuffle, useStoredState } from './core';
import './exam.css';

const byId = new Map((cards || []).map(x => [x.id, x]));
const shortPool = () => (data.shortIdIds || []).map(id => byId.get(id)).filter(Boolean);
const items = () => [...(artifacts || []), ...(cards || [])].reduce((m, x) => (m.set(x.id, x), m), new Map());
const lookupItem = id => byId.get(id) || items().get(id);
const esc = s => String(s ?? '');
const rand = xs => shuffle ? shuffle(xs) : [...xs].sort(() => Math.random() - .5);
const isTheme = item => ['theme', 'myth'].includes(String(item?.type || '').toLowerCase());
const introLabel = item => isTheme(item) ? 'Definition' : 'Date and location';
const introText = item => isTheme(item) ? (item.definition || item.location || item.details?.[0] || '') : `${item.date || 'Date not specified'} · ${item.location || 'Location not specified'}`;
const getModel = item => ({ intro: introText(item), label: introLabel(item), d1: item.details?.[0] || '', d2: item.details?.[1] || '', significance: item.significance || '' });
const wordCount = s => (s.trim().match(/\S+/g) || []).length;
const initialShort = { selected: [], drafts: {}, startedAt: null, finished: false, scores: {} };
const initialExam = { questions: null, answers: {}, selected: [], drafts: {}, index: 0, startedAt: null, finished: false, attemptsRecorded: false, scores: {} };
function useTick(active, deadline, finish) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { if (!active) return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [active]);
  useEffect(() => { if (active && deadline && now >= deadline) finish(); }, [active, deadline, finish, now]);
  return deadline ? Math.max(0, Math.ceil((deadline - now) / 1000)) : null;
}
function clock(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
function model(item) { const m = getModel(item); return <div className="exam-model"><p><b>{m.label}</b><span>{m.intro}</span></p><p><b>Detail 1</b><span>{m.d1}</span></p><p><b>Detail 2</b><span>{m.d2}</span></p><p><b>Significance</b><span>{m.significance}</span></p>{item.verifyWithSlides && <span className="badge verify">Verify with course slides</span>}</div>; }
async function copyText(value) { try { await navigator.clipboard.writeText(value); return true; } catch { const el = document.createElement('textarea'); el.value = value; document.body.appendChild(el); el.select(); const ok = document.execCommand('copy'); el.remove(); return ok; } }
function Rubric({ id, values = {}, onChange, compact = false }) {
  const fields = [['intro', introLabel({ type: id.split(':')[1] }), 2], ['details', 'Two accurate details', 2], ['significance', 'Significance', 1]];
  return <div className="exam-rubric">{fields.map(([key, label, max]) => <div className="rubric-row" key={key}><span>{label}</span><div role="group" aria-label={`${label}, out of ${max}`} className="rubric-options">{Array.from({ length: max + 1 }, (_, n) => <button key={n} className={`button ${values[key] === n ? 'primary' : 'ghost'}`} aria-pressed={values[key] === n} onClick={() => onChange(key, n)}>{n}</button>)}</div></div>)}</div>;
}
function Header({ eyebrow, title, children }) { return <header className="mode-header"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2></div>{children}</header>; }

export function ShortID() {
  const [state, setState] = useStoredState('mideast-short-id-v1', initialShort);
  const [confirm, setConfirm] = useState(false);
  const bank = useMemo(shortPool, []);
  const choices = useMemo(() => state.questionIds?.map(lookupItem).filter(Boolean) || rand(bank).slice(0, 4), [state.questionIds, bank]);
  useEffect(() => { if (!state.questionIds?.length) setState(s => s.questionIds?.length ? s : { ...s, questionIds: choices.map(x => x.id) }); }, [state.questionIds, choices, setState]);
  const chosen = state.selected.map(id => choices.find(x => x.id === id)).filter(Boolean);
  const deadline = state.startedAt ? state.startedAt + 7 * 60 * 1000 : null;
  const finish = useCallback(() => setState(s => ({ ...s, finished: true })), [setState]);
  const remaining = useTick(Boolean(state.startedAt) && !state.finished, deadline, finish);
  const start = () => { const set = rand(bank).slice(0, 4); setState({ ...initialShort, questionIds: set.map(x => x.id) }); setConfirm(false); };
  const select = id => setState(s => ({ ...s, selected: s.selected.includes(id) ? s.selected.filter(x => x !== id) : s.selected.length < 2 ? [...s.selected, id] : s.selected }));
  const edit = (id, value) => setState(s => ({ ...s, startedAt: s.startedAt || Date.now(), drafts: { ...s.drafts, [id]: value } }));
  const setScore = (id, key, value) => { const previous = state.scores[id] || {}; const scores = { ...previous, [key]: value }; setState(s => ({ ...s, scores: { ...s.scores, [id]: scores } })); if (Object.keys(scores).length === 3 && previous[key] == null) recordAttempt(id, Object.values(scores).reduce((a, b) => a + b, 0) >= 4); };
  const restart = () => { if ((Object.values(state.drafts || {}).some(Boolean) || state.selected.length) && !confirm) { setConfirm(true); return; } start(); };
  const copy = () => copyText(chosen.map(item => `${item.name}\n${state.drafts[item.id] || ''}\nRubric: date + location / definition (0–2); two accurate details (0–2); significance (0–1).`).join('\n\n'));
  return <section className="exam-mode">
    <Header eyebrow="PRACTICE · SHORT IDENTIFICATION" title="Short ID"><span className="badge">7 minutes · choose 2 of 4</span></Header>
    {!state.finished ? <>
      <div className="panel exam-instructions"><p>Choose two terms, then write a concise identification for each. The clock starts when you begin writing.</p>{remaining !== null && <span className={`timer ${remaining < 60 ? 'urgent' : ''}`}><Clock3 size={16}/>{clock(remaining)}</span>}</div>
      <div className="exam-choice-grid">{choices.map(item => <button key={item.id} className={`button choice-card ${state.selected.includes(item.id) ? 'selected' : ''}`} onClick={() => select(item.id)} aria-pressed={state.selected.includes(item.id)}><span className="choice-mark">{state.selected.includes(item.id) ? <Check size={16}/> : '＋'}</span><b>{item.name}</b><span>{item.type || 'Study term'}</span></button>)}</div>
      <div className="muted exam-count">{state.selected.length} of 2 selected</div>
      <div className="exam-response-grid">{chosen.map(item => <article className="panel response-card" key={item.id}><div className="row response-heading"><div><div className="eyebrow">SHORT ID</div><h3>{item.name}</h3></div><span className="muted">{wordCount(state.drafts[item.id] || '')} words</span></div><textarea aria-label={`Response for ${item.name}`} value={state.drafts[item.id] || ''} onChange={e => edit(item.id, e.target.value)} placeholder="Write your identification…" rows={7} disabled={state.finished}/>{state.finished && <div className="model-wrap"><div className="eyebrow">MODEL ANSWER</div>{model(item)}<Rubric id={`short:${item.type}`} values={state.scores[item.id] || {}} onChange={(key, n) => setScore(item.id, key, n)}/><div className="muted">Self-score: {Object.values(state.scores[item.id] || {}).reduce((a,b) => a+b, 0)} / 5</div></div>}</article>)}</div>
      {!state.finished && <div className="row exam-actions">{state.selected.length === 2 && <button className="button secondary" onClick={finish}>Finish and reveal models</button>}<button className="button ghost" onClick={() => setConfirm(true)}><RotateCcw size={16}/> Restart</button></div>}
    </> : <div className="panel completion"><div className="badge verify"><Check size={14}/> Complete</div><h3>Compare your responses with the models.</h3><p className="muted">Score each line to record your result.</p>{chosen.map(item => <article className="response-card finished-card" key={item.id}><h3>{item.name}</h3><p className="your-answer">{state.drafts[item.id] || '(No response entered)'}</p>{model(item)}<Rubric id={`short:${item.type}`} values={state.scores[item.id] || {}} onChange={(key, n) => setScore(item.id, key, n)}/><b>Self-score: {Object.values(state.scores[item.id] || {}).reduce((a,b) => a+b, 0)} / 5</b></article>)}<div className="row exam-actions"><button className="button secondary" onClick={copy}><Clipboard size={16}/> Copy answers + rubric</button><button className="button ghost" onClick={restart}><RotateCcw size={16}/> New set</button></div></div>}
    {confirm && <div className="inline-confirm panel" role="alert"><span>Restart this attempt? Your saved responses will be replaced.</span><button className="button ghost" onClick={() => setConfirm(false)}>Keep attempt</button><button className="button primary" onClick={start}>Restart</button></div>}
  </section>;
}

const sections = ['True / false', 'Period dates', 'Multiple choice', 'Short IDs'];
function makeExam() { return { tf: rand(questions.tf || []).slice(0, 10), dates: rand(periods || []).slice(0, 5), mc: rand(questions.mc || []).slice(0, 10), ids: rand(shortPool()).slice(0, 4) }; }
function flatten(exam) { return [...exam.tf.map((q, n) => ({ section: 0, n, q })), ...exam.dates.map((q, n) => ({ section: 1, n, q })), ...exam.mc.map((q, n) => ({ section: 2, n, q }))]; }
export function PracticeTest({ onDrill = () => {} }) {
  const [state, setState] = useStoredState('mideast-practice-test-v1', initialExam);
  const [confirm, setConfirm] = useState(false);
  const exam = useMemo(() => state.questions || makeExam(), [state.questions]);
  const all = useMemo(() => flatten(exam), [exam]);
  const deadline = state.startedAt ? state.startedAt + 30 * 60 * 1000 : null;
  const recordedRef = useRef(Boolean(state.attemptsRecorded || state.finished));
  const finish = useCallback(() => {
    if (!recordedRef.current) {
      recordedRef.current = true;
      const answers = state.answers || {};
      exam.tf.forEach((q, i) => (q.itemIds || []).forEach(id => recordAttempt(id, answers[`0:${i}`] === q.answer)));
      exam.dates.forEach((p, i) => recordAttempt(p.id, Boolean(answers[`1:${i}:start`] && answers[`1:${i}:end`] && checkRange(answers[`1:${i}:start`], answers[`1:${i}:end`], p))));
      exam.mc.forEach((q, i) => (q.itemIds || []).forEach(id => recordAttempt(id, answers[`2:${i}`] === q.answerIndex)));
    }
    setState(s => ({ ...s, finished: true, attemptsRecorded: true }));
  }, [setState, state.answers, exam]);
  const remaining = useTick(Boolean(state.startedAt) && !state.finished, deadline, finish);
  const activeQuestion = all[state.index];
  const begin = () => { const q = makeExam(); recordedRef.current = false; setState({ ...initialExam, questions: q, startedAt: Date.now() }); setConfirm(false); };
  const answer = (key, value) => setState(s => ({ ...s, answers: { ...s.answers, [key]: value } }));
  const keyOf = x => `${x.section}:${x.n}`;
  const move = delta => setState(s => ({ ...s, index: Math.max(0, Math.min(25, s.index >= 25 && delta > 0 ? 25 : s.index + delta)) }));
  const chooseShort = id => setState(s => ({ ...s, selected: s.selected.includes(id) ? s.selected.filter(x => x !== id) : s.selected.length < 2 ? [...s.selected, id] : s.selected }));
  const restart = () => { if ((Object.keys(state.answers || {}).length || Object.values(state.drafts || {}).some(Boolean)) && !confirm) { setConfirm(true); return; } begin(); };
  const completed = exam.tf.filter((_, i) => state.answers[`0:${i}`] !== undefined).length + exam.dates.filter((_, i) => state.answers[`1:${i}:start`] !== undefined && state.answers[`1:${i}:end`] !== undefined).length + exam.mc.filter((_, i) => state.answers[`2:${i}`] !== undefined).length;
  const tfScore = exam.tf.reduce((n, q, i) => n + (state.answers[`0:${i}`] === q.answer), 0);
  const dateScore = exam.dates.reduce((n, p, i) => { const a = state.answers[`1:${i}:start`], b = state.answers[`1:${i}:end`]; return n + (a && b && checkRange(a, b, p) ? 1 : 0); }, 0);
  const mcScore = exam.mc.reduce((n, q, i) => n + (state.answers[`2:${i}`] === q.answerIndex), 0);
  const submit = () => { if (state.selected.length < 2) { setState(s => ({ ...s, index: 25 })); return; } finish(); };
  const selected = state.selected.map(id => exam.ids.find(x => x.id === id)).filter(Boolean);
  const shortScored = (key, field, value) => {
    const previous = state.scores[key] || {};
    const scores = { ...previous, [field]: value };
    setState(s => ({ ...s, scores: { ...s.scores, [key]: scores } }));
    if (Object.keys(scores).length === 3 && previous[field] == null) recordAttempt(key, Object.values(scores).reduce((a, b) => a + b, 0) >= 4);
  };
  const shortTotal = selected.reduce((n, x) => n + Object.values(state.scores[x.id] || {}).reduce((a,b) => a+b, 0), 0);
  const drillMisses = () => { const misses = new Set(); exam.tf.forEach((q, i) => { if (state.answers[`0:${i}`] !== q.answer) (q.itemIds || []).forEach(id => misses.add(id)); }); exam.dates.forEach((p, i) => { const a = state.answers[`1:${i}:start`], b = state.answers[`1:${i}:end`]; if (!a || !b || !checkRange(a, b, p)) misses.add(p.id); }); exam.mc.forEach((q, i) => { if (state.answers[`2:${i}`] !== q.answerIndex) (q.itemIds || []).forEach(id => misses.add(id)); }); onDrill([...misses]); };
  const copyShorts = () => copyText(selected.map(item => `${item.name}\n${state.drafts[item.id] || ''}\nRubric: date + location / definition (0–2); two accurate details (0–2); significance (0–1).`).join('\n\n'));
  useEffect(() => {
    if (state.finished) return;
    const handler = e => {
      if (e.target.closest('input,textarea,select,[contenteditable="true"]')) return;
      if (e.key === 'Enter') { e.preventDefault(); move(1); }
      if (/^[1-4]$/.test(e.key) && activeQuestion && activeQuestion.section !== 1) {
        const val = +e.key - 1;
        if (activeQuestion.section === 0 && val < 2) answer(keyOf(activeQuestion), val === 0);
        if (activeQuestion.section === 2 && val < activeQuestion.q.options.length) answer(keyOf(activeQuestion), val);
      }
      if (/^[1-4]$/.test(e.key) && !activeQuestion && state.index === 25) {
        const item = exam.ids[+e.key - 1];
        if (item) chooseShort(item.id);
      }
    };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, [state.finished, state.index, activeQuestion, exam, move]);
  const startDraft = (id, value) => setState(s => ({ ...s, startedAt: s.startedAt || Date.now(), drafts: { ...s.drafts, [id]: value } }));
  return <section className="exam-mode">
    <Header eyebrow="PRACTICE · FULL TEST" title="Practice test"><span className="badge">30 minutes · 25 auto-scored + 2 short IDs</span></Header>
    {!state.questions ? <div className="panel test-start"><p>10 true/false · 5 period dates · 10 multiple choice · choose 2 short IDs from 4.</p><button className="button primary" onClick={begin}>Start practice test <ArrowRight size={16}/></button></div> : state.finished ? <div className="panel completion">
      <div className="badge"><Check size={14}/> Test graded</div><h3>Sections 1–3: {tfScore + dateScore + mcScore} / 25</h3><p className="muted">True / false {tfScore}/10 · Period dates {dateScore}/5 · Multiple choice {mcScore}/10</p>
      <div className="row exam-actions"><button className="button secondary" onClick={drillMisses}>Drill missed items</button><button className="button ghost" onClick={restart}><RotateCcw size={16}/> New test</button></div>
      <h3>Missed items</h3>{(() => { const miss = []; exam.tf.forEach((q,i) => { if (state.answers[`0:${i}`] !== q.answer) (q.itemIds || []).forEach(id => miss.push(id)); }); exam.dates.forEach((p,i) => { if (!state.answers[`1:${i}:start`] || !state.answers[`1:${i}:end`] || !checkRange(state.answers[`1:${i}:start`], state.answers[`1:${i}:end`], p)) miss.push(p.id); }); exam.mc.forEach((q,i) => { if (state.answers[`2:${i}`] !== q.answerIndex) (q.itemIds || []).forEach(id => miss.push(id)); }); const unique = [...new Set(miss)]; return unique.length ? <div className="miss-list">{unique.map(id => <button className="button ghost" key={id} onClick={() => onDrill([id])}>{lookupItem(id)?.name || periods.find(p => p.id === id)?.name || id}<ArrowRight size={14}/></button>)}</div> : <p className="muted">No missed questions.</p>; })()}
      <details className="answer-review"><summary>Answer review</summary><ol>{exam.tf.map((q,i) => <li key={q.id}>{q.prompt} <b>{q.answer ? 'True' : 'False'}</b>{q.explanation && <span> — {q.explanation}</span>}</li>)}{exam.dates.map(p => <li key={p.id}>{p.name}: {p.date}</li>)}{exam.mc.map(q => <li key={q.id}>{q.prompt} <b>{q.options[q.answerIndex]}</b>{q.explanation && <span> — {q.explanation}</span>}</li>)}</ol></details>
      <h3>Section 4 · Short ID self-score</h3>{selected.length < 2 && <p className="muted">You selected {selected.length} of 2. Only selected answers can be self-scored.</p>}{selected.map(item => <article className="panel finished-card" key={item.id}><h3>{item.name}</h3><p className="your-answer">{state.drafts[item.id] || '(No response entered)'}</p>{model(item)}<Rubric id={`test:${item.type}`} values={state.scores[item.id] || {}} onChange={(k,v) => shortScored(item.id,k,v)}/><b>Self-score: {Object.values(state.scores[item.id] || {}).reduce((a,b) => a+b, 0)} / 5</b></article>)}<p className="muted">Section 4 self-score: {shortTotal} / {selected.length * 5}</p><button className="button secondary" onClick={copyShorts}><Clipboard size={16}/> Copy short responses + rubric</button>
    </div> : <>
      <div className="panel test-toolbar"><div className="test-clock"><Clock3 size={16}/><span className={remaining < 60 ? 'urgent' : ''}>{clock(remaining ?? 1800)}</span></div><span>{completed} / 25 answered</span><button className="button ghost" onClick={restart}>Restart</button></div>
      <nav className="section-nav" aria-label="Test sections">{sections.map((label, n) => <button key={label} className={`button ${activeQuestion?.section === n || (n === 3 && !activeQuestion) ? 'primary' : 'ghost'}`} onClick={() => setState(s => ({ ...s, index: n === 0 ? 0 : n === 1 ? 10 : n === 2 ? 15 : 25 }))}><span>{n + 1}</span>{label}</button>)}</nav>
      {activeQuestion ? <article className="panel question-panel" key={keyOf(activeQuestion)}><div className="row question-meta"><span className="eyebrow">SECTION {activeQuestion.section + 1} OF 4</span><span className="muted">Question {state.index + 1} of 25</span></div><h3>{activeQuestion.section === 1 ? `Give the start and end years for ${activeQuestion.q.name}.` : activeQuestion.q.prompt}</h3>{activeQuestion.section === 0 ? <div className="answer-options">{[true, false].map((value, i) => <button key={String(value)} className={`button option ${state.answers[keyOf(activeQuestion)] === value ? 'selected' : ''}`} onClick={() => answer(keyOf(activeQuestion), value)}><kbd>{i + 1}</kbd>{value ? 'True' : 'False'}</button>)}</div> : activeQuestion.section === 1 ? <div className="date-entry"><label>Start year<input aria-label="Start year" value={state.answers[`1:${activeQuestion.n}:start`] || ''} onChange={e => answer(`1:${activeQuestion.n}:start`, e.target.value)} placeholder="Year and era"/></label><label>End year<input aria-label="End year" value={state.answers[`1:${activeQuestion.n}:end`] || ''} onChange={e => answer(`1:${activeQuestion.n}:end`, e.target.value)} placeholder="Year and era"/></label></div> : <div className="answer-options">{activeQuestion.q.options.map((option, i) => <button key={i} className={`button option ${state.answers[keyOf(activeQuestion)] === i ? 'selected' : ''}`} onClick={() => answer(keyOf(activeQuestion), i)}><kbd>{i + 1}</kbd>{option}</button>)}</div>}<div className="row question-controls"><button className="button ghost" onClick={() => move(-1)} disabled={state.index === 0}><ArrowLeft size={16}/> Previous</button><button className="button secondary" onClick={() => move(1)}>Next <ArrowRight size={16}/></button></div></article> : <article className="panel question-panel"><div className="eyebrow">SECTION 4 OF 4</div><h3>Choose two short IDs to answer.</h3><p className="muted">Each answer is scored out of five after you finish.</p><div className="exam-choice-grid">{exam.ids.map(item => <button key={item.id} className={`button choice-card ${state.selected.includes(item.id) ? 'selected' : ''}`} onClick={() => chooseShort(item.id)} aria-pressed={state.selected.includes(item.id)}><span className="choice-mark">{state.selected.includes(item.id) ? <Check size={16}/> : '＋'}</span><b>{item.name}</b></button>)}</div><p>{state.selected.length} of 2 selected</p>{selected.map(item => <div className="short-test-response" key={item.id}><label>{item.name}<textarea rows={5} value={state.drafts[item.id] || ''} onChange={e => startDraft(item.id, e.target.value)} placeholder="Write your identification…"/></label></div>)}</article>}
      <div className="test-submit-row"><span className="muted">Answers save automatically on this device.{state.selected.length < 2 && <><br/>Select two short IDs before grading.</>}</span>{state.selected.length < 2 && <button className="button secondary" onClick={() => setState(s => ({ ...s, index: 25 }))}>Go to short IDs <ArrowRight size={16}/></button>}<button className="button primary" onClick={submit} disabled={state.selected.length < 2}>Finish and grade</button></div>
    </>}
    {confirm && <div className="inline-confirm panel" role="alert"><span>Start a new test? Saved answers in this attempt will be replaced.</span><button className="button ghost" onClick={() => setConfirm(false)}>Keep attempt</button><button className="button primary" onClick={begin}>New test</button></div>}
  </section>;
}
