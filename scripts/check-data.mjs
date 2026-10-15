import fs from 'node:fs';
import assert from 'node:assert/strict';
import {mapLocations} from '../src/map-data.js';
const read=name=>JSON.parse(fs.readFileSync(new URL('../src/'+name+'.json',import.meta.url)));
const data=read('data'),questions=read('questions'),images=read('images');
const all=[...data.periods,...data.items],ids=new Set(all.map(x=>x.id));
assert.equal(all.length,46);assert.equal(ids.size,46);assert.equal(data.periods.length,12);
assert.equal(data.items.filter(x=>x.type==='artifact').length,24);
assert.equal(data.items.filter(x=>x.type==='theme').length,8);
assert.equal(data.items.filter(x=>x.type==='myth').length,2);
assert.equal(data.shortIdIds.length,32);
assert(data.shortIdIds.every(id=>ids.has(id)));
for(const item of all){assert.equal(item.details.length,2);assert(item.significance&&item.date&&item.location);}
for(const period of data.periods)assert(period.startYear<period.endYear);
assert.equal(questions.tf.length,40);assert.equal(questions.mc.length,40);
for(const q of questions.tf){assert.equal(typeof q.answer,'boolean');assert(q.itemIds.every(id=>ids.has(id)));assert(q.explanation);}
for(const q of questions.mc){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.answerIndex>=0&&q.answerIndex<4);assert(q.itemIds.every(id=>ids.has(id)));}
for(const q of questions.ordering){assert.deepEqual(q.periodIds,[...q.periodIds].sort((a,b)=>data.periods.find(p=>p.id===a).startYear-data.periods.find(p=>p.id===b).startYear));}
assert.equal(Object.keys(images).length,24);
for(const [id,image] of Object.entries(images)){assert.equal(all.find(c=>c.id===id).name,image.name);if(image.url)assert(image.source&&image.license&&image.credit);else assert(image.placeholder&&image.label);}
assert(!JSON.stringify(data).includes('notes.granola.ai'));
assert.equal(mapLocations.length,30);
assert.equal(new Set(mapLocations.map(item=>item.id)).size,30);
assert.equal(mapLocations.filter(item=>item.category==='water').length,12);
assert.equal(mapLocations.filter(item=>item.category==='terrain').length,5);
assert.equal(mapLocations.filter(item=>item.category==='region').length,13);
for(const item of mapLocations){assert(item.name);assert(Array.isArray(item.aliases));assert(item.x>0&&item.x<1&&item.y>0&&item.y<1);assert(item.rx>0&&item.ry>0);assert(item.mask.w>0&&item.mask.h>0);}
assert(fs.existsSync(new URL('../public/maps/course-map.webp',import.meta.url)));
console.log('46 cards, 88 questions, 24 image slots, 30 map locations: course data checks passed.');
