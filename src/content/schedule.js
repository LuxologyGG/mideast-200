// Course structure from the Fall 2026 MIDEAST 200 syllabus (last updated 31 Aug 2026) and the two unit test study guides.
// Guiding questions are paraphrased from the syllabus. Readings are citations only: read them in full on Canvas.

export const CANVAS_URL = 'https://canvas.umich.edu/';
export const COURSE = {
  code: 'MIDEAST 200',
  title: 'Introduction to the Middle East: Issues in Race and Ethnicity',
  term: 'Fall 2026',
  lecture: 'Tue and Thu, 1:00–2:30 pm, UMMA Auditorium',
  weights: [['Lecture participation', '25%'], ['Discussion section', '20%'], ['Map quiz', '5%'], ['Two unit tests', '30%'], ['Final exam', '20%']]
};

export const UNITS = [
  {n: 1, title: 'The Ancient Middle East', span: 'Neolithic to Late Antiquity', classes: [1, 12], test: 'unit-1', sections: [1, 6],
    blurb: 'Defining the region and its categories, then early farming, writing and states, the empires of Mesopotamia, Egypt, Nubia and Iran, and the religions of the Hellenistic and Sasanian worlds.'},
  {n: 2, title: 'Medieval and Early Modern', span: 'About 450 to 1700 CE', classes: [13, 21], test: 'unit-2', sections: [7, 11],
    blurb: 'Armenia between empires, the Believers’ movement and the caliphates, Turkic and Mongol rule, Sufi networks, and the Safavid and Ottoman empires.'},
  {n: 3, title: 'Colonialism and Its Legacies', span: 'About 1798 to the present', classes: [22, 27], test: 'final', sections: [13, 14],
    blurb: 'Napoleon in Egypt, Greek independence and philhellenism, the mandates in the Levant, the anti-colonial revolutions in Egypt and Iran, and Iraq in the 21st century.'}
];

export const PARTS = [
  {id: 'I', title: 'Orientation', classes: [1, 3]},
  {id: 'II', title: 'Inequality and the Early State', classes: [4, 9]},
  {id: 'III', title: 'Empire and Religion', classes: [10, 14]},
  {id: 'IV', title: 'Navigating Difference', classes: [15, 21]},
  {id: 'V', title: 'Colonialism and Its Legacies', classes: [22, 27]}
];

// status: 'posted' when the slides are in the course files, 'pending' otherwise.
export const CLASS_META = {
  1: {date: '2026-09-01', title: 'Welcome and Orientation', status: 'posted',
    questions: ['What is Middle East Studies?'], readings: [], primary: []},
  2: {date: '2026-09-03', title: 'Mapping the Middle East: Geography, Language, and Culture', status: 'posted',
    questions: ['What does the label “Middle East” actually mean?', 'How do culture, politics and language shape where the region’s borders are drawn?'],
    readings: ['Crouzet 2022, introduction, pp. 3–14', 'Antrim 2018, introduction, pp. 9–13, 15'], primary: []},
  3: {date: '2026-09-08', title: 'Race and Gender: Problems with Biology', status: 'posted',
    questions: ['How does this class define race and ethnicity, and how does race-making connect to other inequalities such as gender and religion?', 'How have these categories been applied to people from the MENA region in the US, and what problems does that create?'],
    readings: ['MES 200 Principles of Engagement', 'Gannon 2016, Scientific American blog post', 'Maghbouleh 2017, pp. 14–30, 35–39'], primary: []},
  4: {date: '2026-09-10', title: 'Agriculture, Writing, and the Early State', status: 'posted',
    questions: ['What did scholars first get wrong about how plants and animals were domesticated?', 'When did writing appear in ancient Iraq, and what was it used for?'],
    readings: ['Scott 2017, pp. 1–27'], primary: ['Uruk Vase (Iraq Museum 19606)', 'Beveled-rim bowls (UM Museum of Anthropological Archaeology)', 'Bulla (ISAC Museum D.15969)', 'Proto-cuneiform tablet (Met 1988.433.1)']},
  5: {date: '2026-09-15', title: 'Race before Race I: Mesopotamia', status: 'posted',
    questions: ['How have modern ideas of race been projected onto Mesopotamian sources?', 'How did Mesopotamian ways of marking outsiders resemble modern race, and how did they differ?'],
    readings: ['Collins 2021, pp. 39–46, 56–58', 'Bahrani 2006'], primary: ['The Marriage of Martu']},
  6: {date: '2026-09-17', title: 'Religion, Law, and Orientalism: Interpreting Hammurabi’s “Law Code”', status: 'posted',
    questions: ['What is Orientalism, and how did literal readings of Hammurabi’s stele feed Orientalist assumptions?', 'How does the stele present ideal justice, and should it be read as “law” at all?'],
    readings: ['Said, “My Thesis”', 'Said 1998, video (dir. Sut Jhally)', 'Van De Mieroop 2005, ch. 8'], primary: ['Stele of Hammurabi (Louvre SB 8)', 'Laws of Hammurabi (tr. Roth)']},
  7: {date: '2026-09-22', title: 'Ancient Egypt: Kingship and its Complications', guest: 'Prof. Katherine Davis', status: 'posted',
    questions: ['How did living and working conditions for laborers and administrators differ between the two Egyptian case studies?', 'Does knowing about the non-royal people behind building projects change how you see those monuments and their role?'],
    readings: ['Lehner 1997, pp. 6–19', 'Kemp 2012, pp. 17–21'], primary: []},
  8: {date: '2026-09-24', title: 'It’s a Small World: Diversity and the Assyrian Empire (900–600 BCE)', status: 'posted',
    questions: ['How did the Assyrian empire build an image of universal rule?', 'How has racialization shaped modern reconstructions of Assyria?'],
    readings: ['Bahrani 2014, pp. 115–44', 'Feldman, TED-Ed video'], primary: ['Throne room reliefs of Ashurnasirpal II', 'Black Obelisk of Shalmaneser III']},
  9: {date: '2026-09-29', title: 'Ancient Nubia: Destabilizing “Center” and “Periphery”', guest: 'Prof. Geoff Emberling', status: 'posted',
    questions: ['Why has the study of Nubia been pushed to the margins?', 'How did Nubia take part in, and shape, the connected world of Egypt, the Middle East and the Mediterranean?'],
    readings: ['Emberling 2019, pp. 1–15', 'TED-Ed 2021 video'], primary: []},
  10: {date: '2026-10-01', title: 'The Achaemenid Era: The Cyrus Cylinder, the Hebrew Bible, and the Notion of Sacral Kingship', status: 'posted',
    questions: ['Where do the Achaemenids continue Assyrian practice in royal ideology, architecture and administration?', 'How has racialization produced clashing images of Cyrus: messiah, enemy of the “West,” founder of human rights, national patriarch?'],
    readings: ['Waters 2022, pp. 1–10, 92–97'], primary: ['Cyrus Cylinder (tr. Finkel)', 'Isaiah 44:24–45:5', 'Getty, Persepolis Reimagined (online exhibit)']},
  11: {date: '2026-10-06', title: 'Early Judaisms and Christianities in the Hellenistic Middle East', status: 'posted',
    questions: ['Why do Seleucia on the Tigris and Roman Palestine undercut a clean split between “East” and “West”?', 'At what point, and why, did followers of Jesus start treating their movement as separate from other Jewish groups?'],
    readings: ['Kelsey Museum video', 'Messina and Versluys 2022, pp. 193–99', 'Greenspahn 2018, pp. 1–5'], primary: ['Statue of Herakles-Verethraghna (Iraq Museum 100178)', 'Paul’s Letter to the Galatians']},
  12: {date: '2026-10-08', title: 'Zoroastrianism and Religious Diversity in the Sasanian Period', status: 'posted',
    questions: ['Where did Zoroastrianism sit in the religious world of Late Antiquity (about 300–600 CE)?', 'How does Zoroastrianism complicate the usual story of where Judaism, Christianity and Islam came from?'],
    readings: ['Foster and Foster 2009, pp. 168–190'], primary: ['Account of the Deeds of Ardashir (tr. Zeke Kassock)', 'Reliefs at Naqsh-e Rostam']},
  13: {date: '2026-10-13', title: 'Armenians Between Rome and Persia', guest: 'Prof. Michael Pifer', status: 'posted',
    questions: ['What tensions did Armenian identity work through as Armenia became Christian?', 'How are those tensions remembered and used today?'],
    readings: ['Yeghishé, pp. 243–266'], primary: ['War Gods comic, “The War of Vardan”']},
  14: {date: '2026-10-15', title: 'The Qur’an and the Believers’ Movement in its Late Antique Context', status: 'posted', note: 'Unit Test 1 was held in this class.',
    questions: ['How does the new Islamic polity fit into the wider world of Late Antiquity?'],
    readings: ['Bashir 2023, introduction', 'Donner 2010, selected pages'], primary: ['The Umma Document']},
  15: {date: '2026-10-22', title: 'Declaiming Difference: The Umayyads, Arabness, and Islam', status: 'posted',
    questions: ['How did the meanings of “Arab” and “Islam” change during this period?'],
    readings: ['Donner 2010, pp. 194–220', 'Heba Mostafa, video'], primary: ['Umayyad coins']},
  16: {date: '2026-10-27', title: 'Race before Race II: Abbasid Iraq', status: 'posted',
    questions: ['What tensions over identity and belonging appeared as Islam grew to include a larger, more varied population?', 'What standards did groups use to claim status, and how do they relate to race, lineage, creed and way of life?'],
    readings: ['Kennedy 1981, pp. 35–45'], primary: ['Three Abbasid Views on Difference']},
  17: {date: '2026-10-29', title: 'Fatimid Egypt: Rethinking Sects and Minorities', status: 'posted',
    questions: ['How did the Fatimid caliph-imams display their authority through buildings and ceremony?', 'What goes wrong when we read those practices only in terms of sect?'],
    readings: ['Baker 2019, pp. 1–5, 37–46, 88', 'Pruitt, video on al-Aqmar'], primary: ['Nasir-i Khusraw, travelogue (tr. Thackston)', 'Benjamin of Tudela, travels (tr. Adler)', 'Princeton Geniza Project']},
  18: {date: '2026-11-03', title: 'Turks, Tajiks, and the Institutionalization of Islam', status: 'posted',
    questions: ['What political changes came in the 1000s and 1100s, and what role did Turkic peoples have in them?', 'How did Khurasan’s Muslim Iranians, the “Tajiks,” work their heritage into Islamic frameworks to meet this new order?'],
    readings: ['Ansari 2014, pp. 46–64'], primary: ['Ferdowsi, Shahnameh: The First Kings (tr. Dick Davis)']},
  19: {date: '2026-11-05', title: 'More Than Just Silk: Networks of Knowledge in the Mongol Period', status: 'posted',
    questions: ['What did Sufi orders do in society?', 'How does Rumi describe the Sufi path?'],
    readings: ['Green 2012, pp. 71–91, 103–109'], primary: ['Two poems by Rumi (tr. Franklin Lewis)']},
  20: {date: '2026-11-10', title: 'Social Life and Urbanity in Safavid Iran', status: 'posted',
    questions: ['What were the main institutions of city life in the early modern period?', 'How did they help people form new senses of space, time and society?'],
    readings: ['Emami 2024, pp. 185–208'], primary: ['Safavid paintings', 'Optional: Ashiq, “Guide for Strolling in Isfahan” (tr. Emami)']},
  21: {date: '2026-11-12', title: 'The New Rome, the New Caliphate: The Ottomans and Universal Empire', status: 'pending',
    questions: ['How did the Ottomans claim legitimacy before rival powers and their own elites?', 'How did they build and “package” their empire over the centuries?'],
    readings: ['Kafadar 1994, “The Ottomans and Europe,” pp. 589–625'], primary: ['Video: Emine Fetvacı, “Ottoman Illustrated Histories” (Khamseen, 2020)', 'Agostino Veneziano’s engraving of Süleyman I in a four-tiered helmet-crown']},
  22: {date: '2026-11-17', title: 'Napoleon in Egypt', status: 'pending', note: 'The Test 2 study guide set Unit Test 2 for this date, so check Canvas for when this class meets.',
    questions: ['What global changes in the 1600s and 1700s affected Middle Eastern states and societies, and how?', 'Why did France invade Egypt, and how was the invasion justified?', 'How did the invasion shape the European study of the Middle East?'],
    readings: ['Cleveland and Bunton 2016, pp. 46–48', 'Tignor 1993, pp. 2–14'], primary: ['al-Jabartī’s Chronicle (in Tignor 1993), pp. 24–30']},
  23: {date: '2026-11-19', title: 'How Greece Became the West: Orientalism, Philhellenism, and International Politics', status: 'pending',
    questions: ['How are European imperialism and the rise of nationalism in the Eastern Mediterranean connected?', 'What did political and intellectual figures do to resist or roll back European dominance in the region?'],
    readings: ['Kotsonis 2025, pp. 1–7', 'Cleveland and Bunton 2016, pp. 61–73, 89–92'], primary: ['Byron, “The Isles of Greece”', 'Statue of Theodore Kolokotronis']},
  24: {date: '2026-12-01', title: 'Divide and Conquer: Colonialism and Nationalism in the Levant', status: 'pending',
    questions: ['Why did British and French officials stir up tension between groups they ruled, and how did it affect independence movements?', 'What part did British colonialism and European antisemitism play in the founding of Israel?', 'How does the Israel/Palestine conflict resemble other national conflicts that followed colonial rule?'],
    readings: ['Cleveland and Bunton 2016, pp. 206–219'], primary: ['Balfour Declaration', 'Sykes-Picot Agreement (with map)', 'Letter from Henry McMahon to Sharif Hussein of Mecca, 24 October 1915']},
  25: {date: '2026-12-03', title: 'Two Anti-Colonial Revolutions: Egypt (1952) and Iran (1978)', status: 'pending',
    questions: ['How did Nasser and Khomeini put anti-imperial feeling and rhetoric to work?', 'How did their visions of a decolonized Middle East differ?'],
    readings: ['Amin, Fortna and Frierson, eds., The Modern Middle East: A Sourcebook for History (2006), pp. 73–84, 273–83'], primary: ['Nasser, from Egypt’s Liberation (1953)', 'Shariati, from Approaches to the Understanding of Islam (1968)']},
  26: {date: '2026-12-08', title: 'Stages of American Empire: Iraq in the 21st Century', status: 'pending',
    questions: ['How did American involvement with Iraq’s revolutionary governments change across the 1990s and early 2000s, especially after the Soviet collapse?', 'Which parts of Iraqi and Mesopotamian history come back in The Iraqi Nights and The Book of Collateral Damage, and why do they matter?'],
    readings: ['Cleveland and Bunton 2016, ch. 25, pp. 519–524'], primary: ['Dunya Mikhail, The Iraqi Nights', 'Sinan Antoon, The Book of Collateral Damage']},
  27: {date: '2026-12-10', title: 'Course Wrap-up', status: 'pending', questions: [], readings: [], primary: []}
};

export const SECTION_META = [
  {n: 1, date: '2026-09-04', activity: 'Pluralism Playdeck', extra: 'Welcome questionnaire due after section.', classes: [1, 2]},
  {n: 2, date: '2026-09-11', activity: 'Writing in cuneiform', classes: [3, 4]},
  {n: 3, date: '2026-09-18', activity: 'Write your own law code', test: 'map-quiz', extra: 'The Map Quiz was given in this section.', classes: [5, 6]},
  {n: 4, date: '2026-09-25', activity: 'Building timelines', classes: [7, 8]},
  {n: 5, date: '2026-10-02', activity: 'Dating biblical texts', classes: [9, 10]},
  {n: 6, date: '2026-10-09', activity: 'Unit Test 1 review', test: 'unit-1', classes: [11, 12], handout: true},
  {n: 7, date: '2026-10-16', activity: 'The Umma Document', classes: [13, 14]},
  {n: 8, date: '2026-10-23', activity: 'Umayyad-era coins', classes: [15]},
  {n: 9, date: '2026-10-30', activity: 'Visit to the Kelsey Museum', classes: [16, 17]},
  {n: 10, date: '2026-11-06', activity: 'Illustrate or perform a scene from the Shahnameh', classes: [18, 19]},
  {n: 11, date: '2026-11-13', activity: 'Trip to Hatcher Library Special Collections', classes: [20, 21]},
  {n: 13, date: '2026-12-04', activity: 'To be announced', classes: [24, 25]},
  {n: 14, date: '2026-12-11', activity: 'Review for the final exam', test: 'final', classes: [26, 27]}
];
export const NO_SECTION_NOTE = 'No section on Fri 11/20 (break). The syllabus lists an optional extra-credit report on the film Lyd (2024).';

export const TESTS = {
  'map-quiz': {key: 'map-quiz', name: 'Map Quiz', date: '2026-09-18', where: 'Discussion Section 3', weight: '5%', classes: [2],
    format: ['30 locations from the course list, labeled on a blank map', '10 minutes'],
    src: ['Course location list (IDs.pdf)', 'Syllabus']},
  'unit-1': {key: 'unit-1', name: 'Unit Test 1', date: '2026-10-15', where: 'In class', weight: 'Unit tests together: 30%', classes: [1, 12],
    format: ['Section 1: true / false', 'Section 2: chronology, give the dates of each period', 'Section 3: multiple choice', 'Section 4: write 2 short IDs from 4 options'],
    order: ['tf', 'chrono', 'mc', 'sid'], minutes: 30, src: ['Test 1 study guide']},
  'unit-2': {key: 'unit-2', name: 'Unit Test 2', date: '2026-11-17', where: 'In class', weight: 'Unit tests together: 30%', classes: [13, 21],
    format: ['Sections 1 and 2: true / false and multiple choice', 'Section 3: chronology, counted right within 50 years', 'Section 4: short IDs of 3–4 sentences'],
    order: ['tf', 'mc', 'chrono', 'sid'], minutes: 30, src: ['Test 2 study guide'],
    note: 'The study guide does not say how many IDs you write. Practice tests here use 2 of 4, the Test 1 format.'},
  'final': {key: 'final', name: 'Final Exam', date: '2026-12-17', where: '4:00–6:00 pm, in the lecture room', weight: '20%', classes: [1, 27], pending: true,
    format: ['Cumulative', 'Format pending: no final study guide has been posted yet'], src: ['Syllabus']}
};
