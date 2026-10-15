import {useState, useEffect, useSyncExternalStore} from 'react';
import sourceData from './data.json';
import sourceQuestions from './questions.json';
import sourceImages from './images.json';

export const data = sourceData;
export const periods = data.periods;
export const artifacts = data.items.filter(item => item.type === 'artifact');
export const cards = [...periods, ...data.items];
export const questions = sourceQuestions;
export const images = sourceImages;
export const shuffle = list => {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
export const fmtYear = year => `${Math.abs(year).toLocaleString()} ${year < 0 ? 'BCE' : 'CE'}`;
export const shortName = name => name.replace(' Period (Mesopotamia)', '').replace(' Period, Sudan', '').replace('Early and Middle ', '').replace(', Egypt', '').replace(' kingdoms', '').replace('Kingdoms (Seleucid)', ' / Seleucid').replace(' Period', '');

export function parseYear(text) {
  const normalized = String(text).trim().toUpperCase().replace(/^[~≈]\s*/, '');
  if (/^EARLY\s*(CE|AD)$/.test(normalized)) return 1;
  if (/^1400S\s*(CE|AD)$/.test(normalized)) return 1450;
  const match = normalized.match(/^([\d,]+)\s*(BCE|BC|CE|AD)$/);
  if (!match) return null;
  const year = Number(match[1].replaceAll(',', ''));
  if (!year) return null;
  return /BCE|BC/.test(match[2]) ? -year : year;
}
export function checkRange(start, end, period) {
  const a = parseYear(start), b = parseYear(end);
  return a !== null && b !== null && Math.sign(a) === Math.sign(period.startYear) && Math.sign(b) === Math.sign(period.endYear) && Math.abs(a - period.startYear) <= 50 && Math.abs(b - period.endYear) <= 50;
}

export function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : (typeof initialValue === 'function' ? initialValue() : initialValue); }
    catch { return typeof initialValue === 'function' ? initialValue() : initialValue; }
  });
  useEffect(() => {try {localStorage.setItem(key, JSON.stringify(value));} catch {}}, [key, value]);
  return [value, setValue];
}

const storageKey = 'mideast-v2-progress';
function readProgress() {
  try {const value = JSON.parse(localStorage.getItem(storageKey) || '{}'); return {attempts: {}, srs: {}, ...value};}
  catch {return {attempts: {}, srs: {}};}
}
let progress = readProgress();
const listeners = new Set();
const subscribe = listener => {listeners.add(listener); return () => listeners.delete(listener);};
const snapshot = () => progress;
export function useProgress() {return useSyncExternalStore(subscribe, snapshot, snapshot);}
function publish(next) {
  progress = next;
  try {localStorage.setItem(storageKey, JSON.stringify(progress));} catch {}
  listeners.forEach(listener => listener());
}
export function recordAttempt(id, correct) {
  if (!cards.some(card => card.id === id)) return;
  const previous = progress.attempts[id] || {right: 0, wrong: 0};
  publish({...progress, attempts: {...progress.attempts, [id]: {...previous, [correct ? 'right' : 'wrong']: previous[correct ? 'right' : 'wrong'] + 1, lastSeen: Date.now()}}});
}
export function rateCard(id, rating) {
  const old = progress.srs[id] || {interval:0, reps:0, due:0};
  const interval = rating === 'again' ? 0 : rating === 'hard' ? Math.max(1, old.interval * 1.2) : rating === 'good' ? Math.max(1, old.interval ? old.interval * 2.3 : 1) : Math.max(4, old.interval * 3);
  publish({...progress, srs: {...progress.srs, [id]: {interval, reps: rating === 'again' ? 0 : old.reps + 1, due: Date.now() + (rating === 'again' ? 120000 : interval * 86400000)}}});
  recordAttempt(id, rating !== 'again');
}
export const isMastered = (progress, id) => (progress.srs[id]?.interval || 0) >= 4;

export async function copyText(text) {
  try {await navigator.clipboard.writeText(text); return true;}
  catch {
    const node = document.createElement('textarea'); node.value = text; node.style.position = 'fixed'; node.style.opacity = '0'; document.body.append(node); node.select();
    const success = document.execCommand('copy'); node.remove(); return success;
  }
}
