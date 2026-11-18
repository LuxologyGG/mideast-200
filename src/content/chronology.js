// Chronology lists from the two study guides, plus the reference timelines posted in the course files.
// Years: negative = BCE. approx marks dates the guides give with "~".

export const CHRONO_U1 = [
  {id: 'neolithic', name: 'Neolithic', start: -10000, end: -3000, approx: true, cls: 4, hook: 'Farming, herding and the first villages, such as Çatalhöyük.'},
  {id: 'uruk', name: 'Uruk Period (Mesopotamia)', start: -4000, end: -3000, approx: true, cls: 4, hook: 'The first cities, and the first writing at Uruk, used for keeping accounts.'},
  {id: 'old-kingdom', name: 'Old Kingdom, Egypt', start: -2600, end: -2100, approx: true, cls: 7, hook: 'The age of the great pyramids, such as Khufu’s at Giza.'},
  {id: 'old-babylonian', name: 'Old Babylonian Period (Mesopotamia)', start: -2000, end: -1600, cls: 6, hook: 'Hammurabi rules from Babylon and sets up his stele.'},
  {id: 'new-kingdom', name: 'New Kingdom, Egypt', start: -1550, end: -1100, cls: 7, hook: 'Egypt’s imperial age: Akhenaten’s city at Amarna, and Egyptian rule over Nubia.'},
  {id: 'napatan', name: 'Early and Middle Napatan Period, Sudan', start: -1100, end: -650, approx: true, cls: 9, hook: 'Kush is strong at Napata and later contests the southern Levant with Assyria.'},
  {id: 'neo-assyrian', name: 'Neo-Assyrian Period', start: -900, end: -610, cls: 8, hook: 'Assyria rules a diverse empire from palaces such as Ashurnasirpal II’s at Nimrud.'},
  {id: 'achaemenid', name: 'Achaemenid Period', start: -530, end: -330, cls: 10, hook: 'Cyrus takes Babylon, and kings build Persepolis.'},
  {id: 'hellenistic', name: 'Hellenistic Kingdoms (Seleucid)', start: -330, end: -30, cls: 11, hook: 'After Alexander, the Seleucids rule from cities such as Seleucia on the Tigris. The guide accepts “Seleucid” here.'},
  {id: 'roman-byzantine', name: 'Roman and Byzantine kingdoms', start: -30, end: 1450, endLabel: '1400s CE', cls: 11, hook: 'Rome, then Byzantium from Constantinople, rules the eastern Mediterranean.'},
  {id: 'sasanian', name: 'Sasanian Period', start: 225, end: 650, cls: 12, hook: 'Ardashir’s dynasty rules Iran, with royal reliefs at Naqsh-e Rostam.'},
  {id: 'late-antiquity', name: 'Late Antiquity', start: 1, end: 850, startLabel: 'early CE', cls: 12, hook: 'The old scripts fall out of use as Christianity, Zoroastrianism and later Islam become state-backed religions.'}
];

export const CHRONO_U2 = [
  {id: 'sasanian-2', name: 'Sasanian dynasty', start: 225, end: 650, cls: 13, hook: 'Rises in the 220s and falls as the Believers conquer Iran (Qadisiya 636).'},
  {id: 'umma', name: 'Umma period', start: 622, end: 661, cls: 14, hook: 'From the Hijra in 622 to the death of Ali in 661.'},
  {id: 'umayyad', name: 'Umayyad caliphate', start: 661, end: 750, cls: 15, hook: 'Begins as Ali dies (661), ends with the Abbasid revolution (750).'},
  {id: 'abbasid', name: 'Abbasid caliphate (heyday)', start: 750, end: 950, cls: 16, hook: 'From the revolution in 750 to the start of the “Shi‘i century” around 950.'},
  {id: 'fatimids', name: 'Fatimids', start: 950, end: 1175, cls: 17, hook: 'Take Egypt in 969 and found Cairo. The dynasty ends in 1171.'},
  {id: 'seljuks', name: 'Seljuks', start: 1050, end: 1200, cls: 18, hook: 'Take power in 1040 and win at Manzikert in 1071.'},
  {id: 'mongols', name: 'Mongols + Ilkhans', start: 1250, end: 1400, cls: 19, hook: 'Hülegü sacks Baghdad in 1258. Ilkhanid rule lasts to about 1400.'},
  {id: 'safavids', name: 'Safavids', start: 1500, end: 1750, cls: 20, hook: 'Shah Isma‘il founds the empire in 1501. It ends in 1736.'},
  {id: 'ottomans', name: 'Ottomans', start: 1300, end: 1918, cls: 21, hook: 'From about 1300 to the end of World War I.'}
];

export const CHRONO_SRC = {
  u1: 'Test 1 study guide. The guide gives no grading window; practice here accepts answers within 50 years.',
  u2: 'Test 2 study guide. Answers count as right within 50 years.'
};

// Reference timelines, for context only (not on a study guide list).
export const CONTEXT_TIMELINES = [
  {id: 'meso', title: 'Mesopotamia', src: 'Mesopotamia timeline handout (course files)', periods: [
    ['Uruk', -4000, -3100], ['Jemdet Nasr', -3100, -2900], ['Early Dynastic', -2900, -2350], ['Akkadian', -2325, -2100], ['Ur III', -2100, -2000],
    ['Old Babylonian', -2000, -1595], ['Middle Babylonian', -1595, -1100], ['Neo-Assyrian', -900, -610], ['Neo-Babylonian', -610, -539]]},
  {id: 'egypt', title: 'Egypt', src: 'Class 7 slides', periods: [
    ['Predynastic', -4000, -3100], ['Early Dynastic', -3000, -2686], ['Old Kingdom', -2686, -2181], ['First Intermediate', -2181, -2055], ['Middle Kingdom', -2055, -1650],
    ['Second Intermediate', -1650, -1550], ['New Kingdom', -1550, -1069], ['Third Intermediate', -1069, -664], ['Late', -664, -332], ['Ptolemaic', -332, -30], ['Roman', -30, 395]]}
];

export const fmtYear = y => y === 0 ? '0' : y < 0 ? `${Math.abs(y).toLocaleString('en-US')} BCE` : `${y} CE`;
export const fmtSpan = p => {
  const a = p.startLabel || (p.approx ? '~' : '') + fmtYear(p.start), b = p.endLabel || (p.approx ? '~' : '') + fmtYear(p.end);
  if (p.start < 0 && p.end < 0 && !p.startLabel && !p.endLabel) return `${p.approx ? '~' : ''}${Math.abs(p.start).toLocaleString('en-US')}–${p.approx ? '~' : ''}${Math.abs(p.end).toLocaleString('en-US')} BCE`;
  if (p.start > 0 && p.end > 0 && !p.startLabel && !p.endLabel) return `${p.start}–${p.end} CE`;
  return `${a} – ${b}`;
};
