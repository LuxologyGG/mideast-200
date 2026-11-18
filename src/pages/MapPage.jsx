import React, {useMemo} from 'react';
import {X} from 'lucide-react';
import GeoMap, {GEO, fitBox} from '../components/GeoMap';
import {PageHead} from '../components/Layout';
import {CLASSES, PLACE_CLASSES, QUIZ, UNITS} from '../content';
import {setQuery} from '../lib/router';
import {UNIT_COLORS} from './Home';

export default function MapPage({query}) {
  const unit = Number(query.unit) || 0;
  const sel = query.place && PLACE_CLASSES[query.place] ? query.place : null;
  const showQuiz = query.layer === 'quiz';
  const names = useMemo(() => Object.keys(PLACE_CLASSES).filter(p => !unit || PLACE_CLASSES[p].some(n => CLASSES[n].unit === unit)).sort(), [unit]);
  const ordered = sel ? [sel, ...names.filter(n => n !== sel)] : names;
  const pins = ordered.map(name => ({key: name, xy: GEO.places[name], label: name, color: UNIT_COLORS[CLASSES[PLACE_CLASSES[name][0]].unit], active: name === sel, pulse: name === sel, onClick: () => setQuery({place: name})})).filter(p => p.xy);
  const box = sel ? fitBox([GEO.places[sel]], {padX: 170, padY: 110, minW: 420}) : [0, 0, GEO.w, GEO.h];
  const markers = showQuiz ? QUIZ.map(q => ({key: q.id, xy: GEO.quiz[q.id], kind: q.kind, label: q.short || q.name, state: 'soft'})) : [];
  return <div className="map-page">
    <PageHead crumbs={[['#/', 'Course map'], [null, 'Map']]} eyebrow={`${Object.keys(PLACE_CLASSES).length} places pinned in the lessons`} title="Map"
      sub="Every place the lessons pin, colored by unit. Select a place to zoom in and see which classes cover it. Crowded labels are hidden until you zoom."/>
    <div className="filters">
      <div className="seg" role="group" aria-label="Unit">{[0, ...UNITS.map(u => u.n)].map(n => <button key={n} className={unit === n ? 'on' : ''} onClick={() => setQuery({unit: n || null})}>{n ? `Unit ${n}` : 'All units'}</button>)}</div>
      <label className="toggle"><input type="checkbox" checked={showQuiz} onChange={e => setQuery({layer: e.target.checked ? 'quiz' : null})}/> Show the 30 Map Quiz locations</label>
    </div>
    <div className="map-layout">
      <div className="mapwrap big">{sel && <button className="btn small map-reset" onClick={() => setQuery({place: null})}>Show the whole map</button>}<GeoMap box={box} pins={pins} markers={markers} quizRivers={showQuiz} scaleTo={900} labelFit label="Map of places in the lessons"/></div>
      <aside className="map-side">
        {sel ? <div className="place-card">
          <button className="icon-btn" onClick={() => setQuery({place: null})} aria-label="Clear selection"><X size={16}/></button>
          <h3>{sel}</h3>
          <ul>{PLACE_CLASSES[sel].map(n => <li key={n}><a href={`#/class/${n}`}><b>Class {n}</b> {CLASSES[n].title}</a></li>)}</ul>
        </div> : <p className="small muted">Select a pin or a name.</p>}
        <ul className="place-list">{names.map(p => <li key={p}><button className={p === sel ? 'on' : ''} onClick={() => setQuery({place: p})}><i style={{background: UNIT_COLORS[CLASSES[PLACE_CLASSES[p][0]].unit]}}/>{p}<small>{PLACE_CLASSES[p].join(', ')}</small></button></li>)}</ul>
      </aside>
    </div>
    <p className="small muted">Basemap from Natural Earth (public domain), drawn in a conic projection. Pins mark modern locations of ancient and medieval sites. <a href="#/test/map-quiz">Practice the Map Quiz</a>.</p>
  </div>;
}
