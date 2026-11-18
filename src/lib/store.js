// Progress lives only in this browser (localStorage). Nothing is sent anywhere.
import {useSyncExternalStore} from 'react';

const KEY = 'me200.progress.v3';
const blank = () => ({read: {}, beat: {}, checks: {}, q: {}, ids: {}, chrono: {}, map: {}, cards: {}, tests: {}, last: null});
function load() {
  try {return {...blank(), ...JSON.parse(localStorage.getItem(KEY) || '{}')};}
  catch {return blank();}
}
let state = load();
const subs = new Set();
function emit(next) {
  state = next;
  try {localStorage.setItem(KEY, JSON.stringify(state));} catch { /* storage full or blocked */ }
  subs.forEach(f => f());
}
export const getProgress = () => state;
export function useProgress() {
  return useSyncExternalStore(f => {subs.add(f); return () => subs.delete(f);}, () => state, () => state);
}
export function update(fn) {emit(fn(state));}
const bump = (rec = {r: 0, w: 0}, ok) => ({...rec, r: rec.r + (ok ? 1 : 0), w: rec.w + (ok ? 0 : 1), last: ok, at: Date.now()});

export const markQuestion = (id, ok) => update(s => ({...s, q: {...s.q, [id]: bump(s.q[id], ok)}}));
export const markChrono = (id, ok) => update(s => ({...s, chrono: {...s.chrono, [id]: bump(s.chrono[id], ok)}}));
export const markMap = (id, ok) => update(s => ({...s, map: {...s.map, [id]: bump(s.map[id], ok)}}));
export const scoreId = (key, score) => update(s => ({...s, ids: {...s.ids, [key]: {score, best: Math.max(score, s.ids[key]?.best || 0), at: Date.now()}}}));
export const setBeat = (cls, i) => update(s => ({...s, beat: {...s.beat, [cls]: i}}));
export const markRead = cls => update(s => ({...s, read: {...s.read, [cls]: Date.now()}}));
export const passCheck = (cls, tries) => update(s => ({...s, checks: {...s.checks, [cls]: {at: Date.now(), tries}}}));
export const saveTest = (key, result) => update(s => ({...s, tests: {...s.tests, [key]: {last: result, best: Math.max(result.pct, s.tests[key]?.best || 0)}}}));
export const setLast = href => {if (state.last !== href) update(s => ({...s, last: href}));};
export function rateCard(id, good) {
  update(s => {
    const old = s.cards[id] || {box: 0};
    const box = good ? Math.min(5, old.box + 1) : 0;
    const wait = [0, 1, 3, 7, 14, 30][box] * 86400000;
    return {...s, cards: {...s.cards, [id]: {box, due: Date.now() + (good ? wait : 60000)}}};
  });
}
export function resetProgress() {emit(blank());}

// Theme
const THEME_KEY = 'me200.theme';
export function initialTheme() {
  try {const t = localStorage.getItem(THEME_KEY); if (t === 'light' || t === 'dark') return t;} catch { /* ignore */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
export function saveTheme(t) {try {localStorage.setItem(THEME_KEY, t);} catch { /* ignore */ }}

export const shuffle = list => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]];}
  return a;
};
