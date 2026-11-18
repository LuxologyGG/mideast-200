# MIDEAST 200 study guide (Fall 2026)

**Live site:** https://luxologygg.github.io/mideast-200/

An unofficial, self-paced study aid for MIDEAST 200: Introduction to the Middle East (University of Michigan, Fall 2026). It is not reviewed by the instructors and is not a substitute for the readings, lectures or discussion sections. Course files and readings are on Canvas.

## What is on the site

- **Units → Classes → Sections → Tests**, in syllabus order. Every class page has its lesson (plain-language parts with maps, photos and diagrams), key terms with Arabic or Persian script, primary sources, the study-guide short IDs from that class, a 5-question practice check, and the syllabus reading list as citations only.
- **Tests:** Map Quiz (study, find, name and a 10-minute timed test on the 30 course locations), Unit Test 1 and Unit Test 2 (practice tests in each study guide's section order, short-ID practice for every listed term with the 2/2/1 rubric, chronology drills), and the Final (format pending until its study guide posts; cumulative practice meanwhile).
- **Study tools:** glossary, chronology (study-guide periods, reference timelines, dated events), map of every pinned place, flashcards with spaced review, and a review page of missed items.
- Classes without posted slides are marked **pending** and show syllabus information only.

Progress is saved only in each visitor's browser (localStorage). Old links (`#unit2`, `#map`, `#timeline`, `#cards`, `#short`, `#exam`, `#weak`, `#images`) redirect to their new pages.

## Sources

Built from the course's own materials: the syllabus, lecture slides and class roadmaps, the two unit test study guides, and section handouts. Lessons paraphrase the slides; no slide images or slide text are copied, and readings are not summarized. Every lesson, term, short ID and question is tagged with the class and file it came from. Basemap: Natural Earth (public domain). Photos: Wikipedia and Wikimedia Commons, credited on the page.

## Development

```sh
npm install
npm run dev
npm run check:data   # content checks (run in CI)
npm run build
node scripts/build-basemap.mjs   # regenerate src/generated/geo.js from Natural Earth
```

Content lives in `src/content/` (one module per unit, plus `schedule.js`, `chronology.js` and `places.js`). Pushing to `main` builds and deploys with GitHub Actions.
