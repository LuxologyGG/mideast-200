import {useEffect, useState} from 'react';

// Old single-page links keep working.
const LEGACY = {
  '#unit2': '#/unit/2', '#timeline': '#/chronology', '#images': '#/test/unit-1?tab=pictures', '#cards': '#/flashcards',
  '#short': '#/test/unit-1?tab=ids', '#exam': '#/test/unit-1', '#weak': '#/review', '#map': '#/test/map-quiz'
};

export function parseHash(hash = window.location.hash) {
  if (LEGACY[hash]) return {redirect: LEGACY[hash]};
  const raw = hash.replace(/^#\/?/, '');
  const [pathPart, queryPart = ''] = raw.split('?');
  const path = pathPart.split('/').filter(Boolean).map(decodeURIComponent);
  const query = Object.fromEntries(new URLSearchParams(queryPart));
  return {path, query};
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash());
  useEffect(() => {
    const on = () => {
      const r = parseHash();
      if (r.redirect) {window.location.replace(r.redirect); return;}
      setRoute(r);
    };
    on();
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function go(href) {window.location.hash = href.replace(/^#/, '');}
export function setQuery(patch) {
  const {path, query} = parseHash();
  const q = new URLSearchParams({...query, ...patch});
  for (const [k, v] of Object.entries(patch)) if (v === null || v === undefined || v === '') q.delete(k);
  const s = q.toString();
  window.history.replaceState(null, '', `#/${path.map(encodeURIComponent).join('/')}${s ? `?${s}` : ''}`);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
