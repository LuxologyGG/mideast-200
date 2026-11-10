# MIDEAST 200 · Study space

Interactive study for MIDEAST 200 Unit Tests 1 and 2, University of Michigan (Cross & DeGrado).

**Unit 2 day plan:** https://luxologygg.github.io/mideast-200/#unit2

Seven study days for Unit Test 2 (Tue 11/17), Classes 13–21. Each class day runs one linear flow: closed-notes brain dump, a gap check, visual lessons per class, three right in a row to lock each class in, a spaced retest of earlier misses, and a mini test in the real format (true/false, multiple choice, chronology within 50 years, 2 of 4 short IDs self-scored on the 2/2/1 rubric). Sunday is a timed 30-minute full practice test, Monday drills only weak spots, Tuesday is a 10-minute skim. Content comes from the class slides, roadmaps and the Test 2 study guide; Class 20 is roadmap-only and Class 21 is pending until its slides post. Progress stays in browser local storage.

**Live site:** https://luxologygg.github.io/mideast-200/

Six study modes: a zoomable timeline with placement, date, and ordering drills; artifact recognition in both directions; spaced repetition flashcards; timed short identification; a 30-minute practice exam; and a dashboard for missed items.

**Map quiz:** https://luxologygg.github.io/mideast-200/#map

Map practice uses the exact 30-location list and class map recovered from the earlier `mideast-200-map-practice` Higgsfield site. The exercises were rebuilt inside this app, with study, click-to-locate, name recall, multiple choice, and test modes. Printed labels are hidden during practice; the annotated reference remains available in study mode. Click grading uses approximate zones around the course-map labels, not historical or political boundaries. Map progress is stored separately from the original 46 cards.

The 46-card deck follows the supplied study guide and card list, with race and ethnicity wording informed by course lecture notes. Three items carry **Verify with slides** badges. Fourteen Wikimedia Commons images are credited in the image collection; ten entries use labeled placeholders. Progress and written drafts stay in browser local storage on the device.

## Development

```sh
npm install
npm run dev
npm run check:data
npm run build
```

Pushing to `main` builds and deploys with GitHub Actions. External image links and fonts require internet access.
