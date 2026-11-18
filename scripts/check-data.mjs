// Content checks run in CI before every build.
import {U1A} from '../src/content/u1a.js';
import {U1B} from '../src/content/u1b.js';
import {U1Q} from '../src/content/u1q.js';
import {IDS_U1, TEST1_ORDER} from '../src/content/ids-u1.js';
import {IDS_U2, TEST2_ORDER, U2Q, U2_LESSONS} from '../src/content/u2.js';
import {U2_EXTRA} from '../src/content/u2-extra.js';
import {CLASS_META, SECTION_META, TESTS, UNITS} from '../src/content/schedule.js';
import {CHRONO_U1, CHRONO_U2} from '../src/content/chronology.js';
import {PLACES, QUIZ, SAME_AS} from '../src/content/places.js';
import {GEO} from '../src/generated/geo.js';

const errors = [];
const fail = m => errors.push(m);
const IDS = {...IDS_U1, ...IDS_U2};
const lessons = {...U1A, ...U1B};
for (const n of Object.keys(U2_EXTRA)) lessons[n] = {...U2_EXTRA[n], beats: U2_LESSONS[n]?.beats || []};

for (let n = 1; n <= 27; n++) {
  const m = CLASS_META[n];
  if (!m) {fail(`Class ${n} missing from schedule`); continue;}
  if (!/^2026-\d\d-\d\d$/.test(m.date) || !m.title) fail(`Class ${n} needs a date and title`);
  const L = lessons[n];
  if (m.status === 'posted') {
    if (!L || !L.beats.length) fail(`Class ${n} is posted but has no lesson`);
    if (!L?.src?.length) fail(`Class ${n} lesson has no source tag`);
    if (!L?.summary) fail(`Class ${n} has no summary`);
  }
  for (const [i, b] of (L?.beats || []).entries()) {
    if (!b.h || !b.p?.length) fail(`Class ${n} part ${i + 1} is empty`);
    for (const [ic, tx] of b.p || []) if (!ic || !tx) fail(`Class ${n} part ${i + 1} has a bad point`);
    for (const [p] of b.map?.pins || []) if (!PLACES[p] || !(GEO.places[p] || GEO.places[SAME_AS[p]])) fail(`Class ${n}: unknown place ${p}`);
    for (const pair of b.map?.arrows || []) for (const p of pair) if (!PLACES[p]) fail(`Class ${n}: unknown arrow place ${p}`);
    if (b.id && !IDS[b.id]) fail(`Class ${n}: unknown short ID ${b.id}`);
    if (b.visual?.type === 'timeline' && b.visual.events.some(e => typeof e.y !== 'number')) fail(`Class ${n}: timeline year not a number`);
  }
  for (const t of L?.terms || []) if (!t.t || !t.d || !t.src) fail(`Class ${n}: term missing text or source`);
  for (const s of L?.sources || []) if (!s.name || !s.note) fail(`Class ${n}: source missing name or note`);
}

const qs = [...U1Q, ...U2Q];
const seen = new Set();
for (const q of qs) {
  if (seen.has(q.id)) fail(`Duplicate question id ${q.id}`);
  seen.add(q.id);
  if (!CLASS_META[q.cls] || CLASS_META[q.cls].status !== 'posted') fail(`${q.id}: class ${q.cls} is not posted`);
  if (!q.prompt || !q.why) fail(`${q.id}: missing prompt or explanation`);
  if (q.type === 'tf' && typeof q.answer !== 'boolean') fail(`${q.id}: true/false answer must be boolean`);
  if (q.type === 'mc' && !(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < (q.options || []).length)) fail(`${q.id}: answer index out of range`);
  if (!['tf', 'mc'].includes(q.type)) fail(`${q.id}: unknown type`);
}
for (let n = 1; n <= 20; n++) if (qs.filter(q => q.cls === n).length < 5) fail(`Class ${n} has fewer than 5 questions`);

for (const [order, ids, label] of [[TEST1_ORDER, IDS_U1, 'Test 1'], [TEST2_ORDER, IDS_U2, 'Test 2']]) {
  if (new Set(order).size !== Object.keys(ids).length || order.some(k => !ids[k])) fail(`${label} ID order does not match its IDs`);
  for (const [k, v] of Object.entries(ids)) if (!v.pending && !(v.intro && v.d1 && v.d2 && v.sig && v.name && v.cls)) fail(`${label} ID ${k} is incomplete`);
}
if (TEST1_ORDER.length !== 32 || TEST2_ORDER.length !== 25) fail('Study guide ID counts changed (expected 32 and 25)');

for (const p of [...CHRONO_U1, ...CHRONO_U2]) if (!(p.start < p.end) || !p.name || !p.hook) fail(`Period ${p.id} is malformed`);
if (CHRONO_U1.length !== 12 || CHRONO_U2.length !== 9) fail('Chronology counts changed (expected 12 and 9)');
if (QUIZ.length !== 30) fail('Map Quiz must have 30 locations');
for (const q of QUIZ) if (!GEO.quiz[q.id]) fail(`Map Quiz location ${q.id} has no map position`);
for (const s of SECTION_META) for (const c of s.classes) if (!CLASS_META[c]) fail(`Section ${s.n} links unknown class ${c}`);
for (const u of UNITS) if (!TESTS[u.test]) fail(`Unit ${u.n} test missing`);

// Text written for one student, or style slips, must not ship.
const banned = [/\bcamron\b/i, /\bnotion\b(?!\s+of)/i, /\bcram/i, /sick[- ]day/i, /weak spot/i, /your (own )?notes/i, /\bfill in after\b/i, /—/];
const walk = (v, path) => {
  if (typeof v === 'string') {for (const re of banned) if (re.test(v)) fail(`${path}: contains ${re}`);}
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
};
walk({U1A, U1B, U1Q, IDS_U1, IDS_U2, U2Q, U2_LESSONS, U2_EXTRA, CLASS_META, SECTION_META, TESTS, UNITS, CHRONO_U1, CHRONO_U2, QUIZ}, 'content');

if (errors.length) {console.error(errors.join('\n')); console.error(`\n${errors.length} problem(s)`); process.exit(1);}
console.log(`Content OK: 27 classes, ${Object.values(lessons).reduce((a, l) => a + l.beats.length, 0)} lesson parts, ${qs.length} questions, ${Object.keys(IDS).length} short IDs, ${CHRONO_U1.length + CHRONO_U2.length} periods, ${Object.keys(PLACES).length} places, ${QUIZ.length} quiz locations.`);
