import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import {motion} from 'motion/react';
import {GEO} from '../generated/geo';

const QUIZ_RIVERS = ['Tigris', 'Euphrates', 'Nile', 'Amu Darya', 'Indus'];

// Fit a viewBox around points, keeping a landscape ratio and staying inside the map.
export function fitBox(pts, {padX = 120, padY = 90, ratio = 1.6, minW = 300} = {}) {
  if (!pts.length) return [0, 0, GEO.w, GEO.h];
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  let w = Math.max(minW, Math.max(...xs) - Math.min(...xs) + padX * 2);
  let h = Math.max(...ys) - Math.min(...ys) + padY * 2;
  if (w / h < ratio) w = h * ratio; else h = w / ratio;
  if (w > GEO.w) {w = GEO.w; h = Math.min(GEO.h, w / ratio);}
  if (h > GEO.h) {h = GEO.h; w = Math.min(GEO.w, h * ratio);}
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2, cy = (Math.max(...ys) + Math.min(...ys)) / 2;
  const x0 = Math.max(0, Math.min(GEO.w - w, cx - w / 2)), y0 = Math.max(0, Math.min(GEO.h - h, cy - h / 2));
  return [x0, y0, w, h];
}

// Greedy label placement: try right, left, above, below; keep the first spot that overlaps nothing placed so far.
function placeLabels(items, k, fs, skip = false) {
  const boxes = items.map(p => ({x: p.xy[0] - 6 * k, y: p.xy[1] - 6 * k, w: 12 * k, h: 12 * k}));
  const hit = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
  return items.map(p => {
    if (!p.label) return null;
    const w = p.label.length * fs * 0.56 + 4 * k, h = fs * 1.2;
    const [x, y] = p.xy;
    const tries = [
      {x: x + 8 * k, y: y - h * 0.75, anchor: 'start', tx: x + 9 * k, ty: y + fs * 0.1},
      {x: x - 8 * k - w, y: y - h * 0.75, anchor: 'end', tx: x - 9 * k, ty: y + fs * 0.1},
      {x: x - w / 2, y: y - 10 * k - h, anchor: 'middle', tx: x, ty: y - 11 * k},
      {x: x - w / 2, y: y + 8 * k, anchor: 'middle', tx: x, ty: y + 8 * k + fs}
    ];
    const free = tries.find(t => !boxes.some(b => hit({x: t.x, y: t.y, w, h}, b)));
    if (!free && skip && !p.force) return null;
    const pick = free || tries[0];
    boxes.push({x: pick.x, y: pick.y, w, h});
    return pick;
  });
}

export function Basemap({quizRivers = false}) {
  return <g className="geo-base">
    <rect className="geo-sea" x="-50" y="-50" width={GEO.w + 100} height={GEO.h + 100}/>
    <path className="geo-grat" d={GEO.graticule}/>
    <path className="geo-land" d={GEO.land} fillRule="evenodd"/>
    <path className="geo-lake" d={GEO.lakes}/>
    {Object.entries(GEO.rivers).map(([name, d]) => <path key={name} className={`geo-river ${QUIZ_RIVERS.includes(name) ? '' : 'minor'} ${quizRivers && QUIZ_RIVERS.includes(name) ? 'quiz' : ''}`} d={d}/>)}
  </g>;
}

// Marks and labels keep the same on-screen size whatever the zoom: sizes are set in screen pixels
// by dividing the viewBox width by the rendered width (measured), falling back to scaleTo before layout.
export default function GeoMap({pins = [], arrows = [], markers = [], focus, box, animate = false, label = 'Map', className = '', children, quizRivers = false, scaleTo = 520, labelFit = false}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([e]) => {const w = Math.round(e.contentRect.width); if (w) setShown(s => (s && Math.abs(s - w) < 8 ? s : w));});
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const vb = useMemo(() => box || fitBox(focus || pins.map(p => p.xy)), [box, focus, pins]);
  const k = vb[2] / Math.max(280, Math.min(shown || scaleTo, 1100));
  const fs = 12.5 * k;
  const placed = useMemo(() => placeLabels([...pins, ...markers].map(x => ({xy: x.xy, label: x.label, force: x.active || x.state === 'active'})), k, fs, labelFit), [pins, markers, k, fs, labelFit]);
  const labels = placed.slice(0, pins.length), mlabels = placed.slice(pins.length);
  return <svg ref={ref} className={`geo ${className}`} viewBox={vb.join(' ')} preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}>
    <Basemap quizRivers={quizRivers}/>
    {arrows.map(([a, b], i) => {
      const mx = (a[0] + b[0]) / 2, my = Math.min(a[1], b[1]) - Math.abs(b[0] - a[0]) * 0.25 - 18 * k;
      return <motion.path key={i} className="geo-arrow" d={`M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`} style={{strokeWidth: 2.4 * k, strokeDasharray: `${7 * k} ${5 * k}`}}
        initial={animate ? {pathLength: 0, opacity: 0} : false} animate={{pathLength: 1, opacity: 1}} transition={{delay: 0.4 + pins.length * 0.25, duration: 1}}/>;
    })}
    {markers.map((m, mi) => <g key={m.key} className={`geo-marker k-${m.kind} ${m.state || ''}`} onClick={m.onClick} role={m.onClick ? 'button' : undefined} tabIndex={m.onClick ? 0 : undefined}
      onKeyDown={m.onClick ? e => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); m.onClick();}} : undefined} aria-label={m.aria}>
      <circle className="hit" cx={m.xy[0]} cy={m.xy[1]} r={13 * k}/>
      {m.kind === 'feature' ? <path className="dot" d={`M${m.xy[0]} ${m.xy[1] - 6.5 * k}L${m.xy[0] + 6 * k} ${m.xy[1] + 4.5 * k}L${m.xy[0] - 6 * k} ${m.xy[1] + 4.5 * k}Z`}/>
        : m.kind === 'area' ? <rect className="dot" x={m.xy[0] - 4.5 * k} y={m.xy[1] - 4.5 * k} width={9 * k} height={9 * k} transform={`rotate(45 ${m.xy[0]} ${m.xy[1]})`}/>
          : <circle className="dot" cx={m.xy[0]} cy={m.xy[1]} r={5 * k}/>}
      {m.num !== undefined && <text className="num" x={m.xy[0]} y={m.xy[1] - 9 * k} fontSize={10 * k} textAnchor="middle">{m.num}</text>}
      {m.label && mlabels[mi] && <text className="mlabel" x={mlabels[mi].tx} y={mlabels[mi].ty} textAnchor={mlabels[mi].anchor} fontSize={fs * 0.94} style={{strokeWidth: 3 * k}}>{m.label}</text>}
    </g>)}
    {pins.map((p, i) => {
      const L = labels[i];
      const body = <>
        {p.pulse !== false && <circle className="geo-pulse" cx={p.xy[0]} cy={p.xy[1]} r={8 * k} style={p.color ? {fill: p.color} : undefined}>
          <animate attributeName="r" values={`${6 * k};${14 * k};${6 * k}`} dur="2.4s" repeatCount="indefinite"/>
        </circle>}
        <circle className={`geo-pin ${p.active ? 'active' : ''}`} cx={p.xy[0]} cy={p.xy[1]} r={(p.active ? 6.5 : 5) * k} style={{strokeWidth: 1.6 * k, ...(p.color ? {fill: p.color} : {})}}/>
        {L && <text className="geo-label" x={L.tx} y={L.ty} fontSize={fs} textAnchor={L.anchor} style={{strokeWidth: 3.2 * k}}>{p.label}</text>}
      </>;
      const cn = `geo-pin-g ${p.onClick ? 'clickable' : ''}`;
      return animate
        ? <motion.g key={p.key || i} className={cn} onClick={p.onClick} initial={{opacity: 0, y: -12 * k}} animate={{opacity: 1, y: 0}} transition={{delay: 0.25 + i * 0.25, type: 'spring', stiffness: 260, damping: 14}}>{body}</motion.g>
        : <g key={p.key || i} className={cn} onClick={p.onClick}>{body}</g>;
    })}
    {children}
  </svg>;
}

export {GEO};
