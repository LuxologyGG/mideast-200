# MIDEAST 200 · Study space

Interactive study for Unit Test 1, University of Michigan (Cross & DeGrado).

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
