// Assembles every content module into the shapes the pages use.
import {CANVAS_URL, CLASS_META, COURSE, NO_SECTION_NOTE, PARTS, SECTION_META, TESTS, UNITS} from './schedule.js';
import {U1A} from './u1a.js';
import {U1B} from './u1b.js';
import {U1Q} from './u1q.js';
import {IDS_U1, TEST1_ORDER} from './ids-u1.js';
import {IDS_U2, TEST2_ORDER, U2Q, U2_LESSONS} from './u2.js';
import {U2_EXTRA} from './u2-extra.js';
import {CHRONO_SRC, CHRONO_U1, CHRONO_U2, CONTEXT_TIMELINES, fmtSpan, fmtYear} from './chronology.js';
import {PLACES, QUIZ, QUIZ_GROUPS, SAME_AS} from './places.js';
import images from '../images.json';

export {CANVAS_URL, COURSE, NO_SECTION_NOTE, PARTS, TESTS, UNITS, CHRONO_SRC, CHRONO_U1, CHRONO_U2, CONTEXT_TIMELINES, fmtSpan, fmtYear, PLACES, QUIZ, QUIZ_GROUPS, SAME_AS};

const unitOf = n => UNITS.find(u => n >= u.classes[0] && n <= u.classes[1]);
const partOf = n => PARTS.find(p => n >= p.classes[0] && n <= p.classes[1]);
export const unitByNum = Object.fromEntries(UNITS.map(u => [u.n, u]));

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const fmtDate = iso => {const [y, m, d] = iso.split('-').map(Number); const dt = new Date(Date.UTC(y, m - 1, d)); return `${DAYS[dt.getUTCDay()]} ${m}/${d}`;};

// Short IDs
const withSrc = (ids, guide) => Object.fromEntries(Object.entries(ids).map(([k, v]) => [k, {key: k, ...v, src: v.src || [`Class ${v.cls} slides`, guide]}]));
export const IDS = {...withSrc(IDS_U1, 'Test 1 study guide'), ...withSrc(IDS_U2, 'Test 2 study guide')};
export const ID_ORDER = {'unit-1': TEST1_ORDER, 'unit-2': TEST2_ORDER};

// Questions
export const QUESTIONS = [...U1Q, ...U2Q];
export const qById = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));

// Classes
export const CLASSES = {};
for (let n = 1; n <= 27; n++) {
  const meta = CLASS_META[n];
  let lesson = U1A[n] || U1B[n] || null;
  if (U2_EXTRA[n]) lesson = {...U2_EXTRA[n], beats: U2_LESSONS[n]?.beats || []};
  const posted = meta.status === 'posted' && lesson && lesson.beats.length > 0;
  CLASSES[n] = {
    n, ...meta, unit: unitOf(n).n, part: partOf(n),
    posted,
    lesson: posted ? lesson : lesson ? {...lesson, beats: []} : null,
    ids: Object.values(IDS).filter(i => i.cls === n).map(i => i.key),
    qs: QUESTIONS.filter(q => q.cls === n)
  };
}
export const CLASS_LIST = Object.values(CLASSES);
export const POSTED = CLASS_LIST.filter(c => c.posted).map(c => c.n);

// Sections
export const SECTIONS = SECTION_META.map(s => ({...s, unit: unitOf(s.classes[0]).n}));
export const sectionByNum = Object.fromEntries(SECTIONS.map(s => [s.n, s]));

// Tests
const inRange = (n, [a, b]) => n >= a && n <= b;
export function testPools(key) {
  const t = TESTS[key];
  if (key === 'map-quiz') return {questions: [], ids: [], chrono: []};
  if (key === 'final') return {questions: QUESTIONS, ids: [...TEST1_ORDER, ...TEST2_ORDER].filter(k => !IDS[k].pending), chrono: [...CHRONO_U1, ...CHRONO_U2]};
  return {
    questions: QUESTIONS.filter(q => inRange(q.cls, t.classes)),
    ids: ID_ORDER[key].filter(k => !IDS[k].pending),
    allIds: ID_ORDER[key],
    chrono: key === 'unit-1' ? CHRONO_U1 : CHRONO_U2
  };
}

// Artifact pictures for Unit Test 1 (Wikimedia Commons, with credits), keyed by short ID.
export const ID_IMAGES = Object.fromEntries(TEST1_ORDER.slice(0, 24).map((k, i) => {
  const im = images[`item-${String(i + 1).padStart(2, '0')}`];
  return [k, im && im.url ? im : null];
}).filter(([, v]) => v));

// Places: which classes pin each one
export const PLACE_CLASSES = {};
for (const c of CLASS_LIST) for (const b of c.lesson?.beats || []) for (const [p] of b.map?.pins || []) {
  const key = SAME_AS[p] || p;
  (PLACE_CLASSES[key] ||= new Set()).add(c.n);
}
for (const k of Object.keys(PLACE_CLASSES)) PLACE_CLASSES[k] = [...PLACE_CLASSES[k]].sort((a, b) => a - b);

// Glossary: lesson key terms plus short IDs, merged by name
export const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[‘’ʿʾ'`“”"]/g, '').toLowerCase().trim();
const gl = new Map();
for (const c of CLASS_LIST) for (const t of c.lesson?.terms || []) {
  const k = norm(t.t);
  if (!gl.has(k)) gl.set(k, {t: t.t, ar: t.ar, tr: t.tr, defs: []});
  const e = gl.get(k);
  if (!e.ar && t.ar) {e.ar = t.ar; e.tr = t.tr;}
  e.defs.push({d: t.d, cls: c.n, src: `Class ${c.n} ${t.src}`});
}
for (const i of Object.values(IDS)) {
  if (i.pending) continue;
  const k = norm(i.name);
  if (!gl.has(k)) gl.set(k, {t: i.name, defs: [], id: i.key});
  gl.get(k).id = i.key;
  gl.get(k).defs.push({d: i.intro, cls: i.cls, src: `Short ID, Class ${i.cls}`});
}
export const GLOSSARY = [...gl.values()].sort((a, b) => norm(a.t).localeCompare(norm(b.t)));

// Dated events from lesson timelines
export const EVENTS = [];
for (const c of CLASS_LIST) for (const b of c.lesson?.beats || []) if (b.visual?.type === 'timeline') for (const e of b.visual.events) EVENTS.push({y: e.y, t: e.t, h: b.h, cls: c.n});
EVENTS.sort((a, b) => a.y - b.y);

// Search index
export const SEARCH = [];
for (const c of CLASS_LIST) {
  SEARCH.push({type: 'Class', title: `Class ${c.n}: ${c.title}`, text: [c.lesson?.summary, ...c.questions].join(' '), href: `#/class/${c.n}`, cls: c.n});
  for (const b of c.lesson?.beats || []) SEARCH.push({type: 'Lesson', title: b.h, text: b.p.map(p => p[1]).join(' '), href: `#/class/${c.n}`, cls: c.n});
  for (const s of c.lesson?.sources || []) SEARCH.push({type: 'Source', title: s.name, text: [s.when, s.where, s.note].join(' '), href: `#/class/${c.n}`, cls: c.n});
  for (const r of [...c.readings, ...c.primary]) SEARCH.push({type: 'Reading', title: r, text: '', href: `#/class/${c.n}`, cls: c.n});
}
for (const g of GLOSSARY) SEARCH.push({type: 'Term', title: g.t, text: [g.tr, g.ar, ...g.defs.map(d => d.d)].join(' '), href: `#/glossary?q=${encodeURIComponent(g.t)}`, cls: g.defs[0].cls});
for (const i of Object.values(IDS)) SEARCH.push({type: 'Short ID', title: i.name, text: [i.intro, i.d1, i.d2, i.sig].join(' '), href: `#/class/${i.cls}?id=${i.key}`, cls: i.cls});
for (const s of SECTIONS) SEARCH.push({type: 'Section', title: `Section ${s.n}: ${s.activity}`, text: s.extra || '', href: `#/section/${s.n}`});
for (const t of Object.values(TESTS)) SEARCH.push({type: 'Test', title: t.name, text: t.format.join(' '), href: `#/test/${t.key}`});
for (const p of [...CHRONO_U1, ...CHRONO_U2]) SEARCH.push({type: 'Period', title: p.name, text: `${fmtSpan(p)} ${p.hook}`, href: '#/chronology', cls: p.cls});
for (const q of QUIZ) SEARCH.push({type: 'Map', title: q.name, text: 'map quiz location', href: '#/test/map-quiz'});
for (const p of Object.keys(PLACE_CLASSES)) SEARCH.push({type: 'Place', title: p, text: `Pinned in class ${PLACE_CLASSES[p].join(', ')}`, href: `#/map?place=${encodeURIComponent(p)}`});
const IDX = SEARCH.map(e => ({e, title: norm(e.title), text: norm(e.text)}));
export function search(q, limit = 40) {
  const words = norm(q).split(/\s+/).filter(w => w.length > 1);
  if (!words.length) return [];
  const out = [];
  for (const {e, title, text} of IDX) {
    let score = 0;
    for (const w of words) {
      if (title.includes(w)) score += title.startsWith(w) ? 6 : 4;
      else if (text.includes(w)) score += 1;
      else {score = 0; break;}
    }
    if (score) out.push([score + (e.type === 'Class' ? 1 : 0) + (e.type === 'Short ID' ? 1 : 0), e]);
  }
  return out.sort((a, b) => b[0] - a[0]).slice(0, limit).map(x => x[1]);
}

export const COUNTS = {
  classes: CLASS_LIST.length, posted: POSTED.length,
  beats: CLASS_LIST.reduce((a, c) => a + (c.lesson?.beats.length || 0), 0),
  terms: GLOSSARY.length, ids: Object.keys(IDS).length, questions: QUESTIONS.length,
  events: EVENTS.length, places: Object.keys(PLACES).length, quiz: QUIZ.length
};
