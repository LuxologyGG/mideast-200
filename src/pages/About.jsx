import React from 'react';
import {ExternalLink} from 'lucide-react';
import {PageHead, Divider} from '../components/Layout';
import {CANVAS_URL, CLASS_LIST, COUNTS, COURSE} from '../content';

export default function About() {
  const pending = CLASS_LIST.filter(c => !c.posted).map(c => c.n);
  return <div className="about-page">
    <PageHead crumbs={[['#/', 'Course map'], [null, 'About']]} eyebrow="About this site" title="An unofficial study aid"/>
    <section className="callout">
      <p><b>This is not an official course site.</b> A student made it for classmates. The instructors have not reviewed it. It is not a substitute for the readings, the lectures or your discussion section, and it may contain mistakes. When anything here disagrees with the slides, the syllabus or what your instructors say, they win.</p>
      <p>Course files, readings, assignments and grades are on <a href={CANVAS_URL} target="_blank" rel="noreferrer">Canvas <ExternalLink size={12}/></a>.</p>
    </section>
    <Divider/>
    <h2 className="sec-title">What it is built from</h2>
    <ul className="tips">
      <li>The {COURSE.term} syllabus: class numbers, dates, titles, guiding questions (paraphrased), and reading and source lists.</li>
      <li>The lecture slides and class roadmaps for Classes 1–20, paraphrased in plain language. No slide images and no slide text are copied.</li>
      <li>The Unit Test 1 and Unit Test 2 study guides: test formats, chronology lists, short-ID lists and the 2/2/1 rubric.</li>
      <li>Course handouts: the Map Quiz location list, the Section 6 short-ID practice, and the Mesopotamia and Egypt timelines.</li>
    </ul>
    <p>Each lesson, term, short ID and question is tagged with the class and the file it came from. Readings are listed as citations only: this site does not summarize them.</p>
    <h2 className="sec-title">What is pending</h2>
    <p>Classes {pending.join(', ')} have no slides in the course files yet, so their pages show only syllabus information. The final exam study guide has not been posted, so the final’s format is marked pending. These pages fill in as the materials post.</p>
    <h2 className="sec-title">By the numbers</h2>
    <p>{COUNTS.posted} class lessons with {COUNTS.beats} parts, {COUNTS.terms} glossary entries, {COUNTS.ids} study-guide short IDs, {COUNTS.questions} practice questions, {COUNTS.events} dated events, {COUNTS.places} pinned places and the {COUNTS.quiz} Map Quiz locations.</p>
    <h2 className="sec-title">Privacy</h2>
    <p>No accounts and no tracking. Your progress (lessons read, checks passed, scores, flashcard boxes) is saved only in your own browser’s local storage. Clearing your browser data or using the Review page’s reset removes it.</p>
    <h2 className="sec-title">Credits</h2>
    <ul className="tips">
      <li>Basemap: Natural Earth, public domain.</li>
      <li>Lesson photos load from Wikipedia page summaries; each links to its page and license. Test 1 artifact photos are from Wikimedia Commons with credits shown.</li>
      <li>Fonts: Amiri and IBM Plex Sans Arabic, from Google Fonts.</li>
      <li>Patterns: eight-point star and cross tilework, drawn for this site.</li>
    </ul>
  </div>;
}
