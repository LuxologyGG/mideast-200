// Unit 1 lessons, Classes 1-6. Paraphrased from the course slides and roadmaps (no slide text copied).
// Each beat: {h, p:[[icon, text]], visual?, img?, map?, myth?, id?}

export const U1A = {
  1: {
    src: ['Class 1 slides'],
    summary: 'Course overview and a first problem: nobody agrees where the “Middle East” is. The class treats the term as a working tool, not a fixed fact.',
    beats: [
      {h: 'What this course covers', p: [
        ['🗓️', 'About 5,000 years of history, from the first writing in Mesopotamia and Egypt to the present.'],
        ['🧭', 'A running thread on race and ethnicity: how people sorted each other into groups, and how those ideas changed over time.'],
        ['🎓', 'An introduction to Middle East Studies as a field, with guest lectures from other faculty.']]},
      {h: 'Where is the Middle East?', p: [
        ['🗺️', 'Early 1900s writers like Mahan (1902) and Chirol (1903) used the term, and their maps already disagreed.'],
        ['🏛️', 'Later maps from the UN, WHO, World Bank and US State Department each drew different borders, and those borders kept moving between the 1940s and the 2000s.'],
        ['🤷', 'If experts and governments cannot agree, the term clearly depends on who is drawing the map and why.']],
        visual: {type: 'timeline', events: [{y: 1902, t: 'Mahan'}, {y: 1903, t: 'Chirol'}, {y: 1947, t: 'UN'}, {y: 1948, t: 'WHO, State Dept'}, {y: 1952, t: 'World Bank'}, {y: 2004, t: 'IJMES'}]}},
      {h: 'Different maps, different criteria', p: [
        ['🗣️', 'The 1948 State Department map leaned on language (Arabic as the “Near East”) but still left out North Africa.'],
        ['⚔️', 'Chirol’s 1903 map was about geopolitics: the land bridge between Iraq and British India.'],
        ['🌍', 'A 2004 scholarly map (IJMES) stretched to Spain, southeastern Europe, northern India and Central Asia, yet left out Ethiopia.']],
        visual: {type: 'compare', left: {h: 'What a map can be built on', items: ['Language', 'Religion', 'Geopolitics', 'Shared history']}, right: {h: 'What each choice hides', items: ['North Africa (1948)', 'Non-Arabic speakers', 'Ethiopia (2004)', 'Local self-definitions']}}},
      {h: 'What Middle East Studies does', p: [
        ['🔗', 'It maps the relationships that make up what we call the “Middle East” and tracks how they change.'],
        ['🪞', 'The “Middle East” is always defined relative to somewhere else, usually Europe or “the West.”'],
        ['⚖️', 'Every definition is contingent: it depends on time, purpose and the person defining it.']]},
      {h: 'A heuristic definition', p: [
        ['🧰', 'A heuristic is a tool for learning and problem solving by trial and error.'],
        ['🔄', 'The class uses “Middle East” this way: the definition flexes by period and by the question being asked.'],
        ['📚', 'Coming up: how maps themselves make claims (Class 2).']]}
    ],
    terms: [
      {t: 'Middle East Studies', d: 'The field that studies the relationships making up the region we call the Middle East and how they change over time.', src: 'slides'},
      {t: 'Heuristic', d: 'A tool for learning or problem solving by trial and error. The class treats “Middle East” as a heuristic, not a fixed fact.', src: 'slides'}
    ],
    sources: [
      {name: 'Historical maps of the “Middle East”', when: '1902–2005', where: 'Various governments and scholars', note: 'Shown in lecture to compare how the region’s borders were drawn. A public collection is at mideast.unc.edu/where.', link: 'https://mideast.unc.edu/where/'}
    ]
  },

  2: {
    src: ['Class 2 slides', 'Class 2 roadmap'],
    summary: '“Middle East” is a colonial-era label, and every map is a selective argument. The region also has a long tradition of mapping itself, and it is home to many languages and scripts.',
    beats: [
      {h: 'Where the term came from', p: [
        ['🏷️', '“Middle East” is a geopolitical term coined in the late 1800s for an area European colonial powers cared about.'],
        ['🕰️', 'Older labels include the Orient, the East, the Near East and “Hither Asia.” Scholars also say the “Nile-to-Oxus region.”'],
        ['🆕', 'Proposed alternatives today: West Asia, MENA (Middle East and North Africa) and SWANA (Southwest Asia and North Africa).']]},
      {h: 'Colonialism shaped the map', p: [
        ['🇬🇧', 'Modern names and borders came out of European and American domination. Crouzet shows how British rule in India drove the idea of a “Middle East.”'],
        ['🔇', 'Antrim calls this epistemic violence: other ways of knowing and organizing the region were pushed aside or silenced.'],
        ['🪶', 'But Antrim also stresses that the region has mapped itself from within for about a thousand years. The problem is not pure invention, it is what colonial maps reinforce and hide.']]},
      {h: 'Should we drop the term?', p: [
        ['💬', 'Antrim argues you have to use the term in order to question it.'],
        ['❓', 'The open question for class: at what point is a label too loaded to keep using?']]},
      {h: 'What a map is', p: [
        ['🗺️', 'A map is a selective picture of space meant to help with a task or to make a claim.'],
        ['🧩', 'Maps are embedded in their time and purpose. No representation is perfect, and every one exerts power.'],
        ['🔍', 'Critical cartography means “denaturalizing” the map: refusing to treat it as neutral reality.']]},
      {h: 'Maps distort and tell stories', p: [
        ['🌐', 'Flattening a globe always distorts something. The Mercator projection shrinks Africa.'],
        ['📐', 'Hobo-Dyer (2002) keeps relative land area. Cahill-Keyes rejects the rectangle altogether.'],
        ['👥', 'Cartograms can show people instead of land, which changes what looks central.'],
        ['🧠', 'Three questions for any map: who made it, what is it built to show, and what does it leave out?']]},
      {h: 'Maps from inside the region', p: [
        ['🧭', 'Many medieval Islamic maps put south at the top. Accuracy of coastlines mattered less than routes, pilgrimage and travel.'],
        ['📖', 'A common model came from the 10th-century genre of “Books of Routes and Realms.” A 1553 copy follows the geographer al-Idrisi (d. 1165).'],
        ['✝️', 'The Beatus world map (after a Spanish monk, d. after 785) puts east at the top, which is where the word “oriented” comes from.'],
        ['🏺', 'A Babylonian map of the world (about 750 BCE) places Babylon at the center, cut by the Euphrates and ringed by a “Bitter Sea.” It now sits in the British Museum.']],
        visual: {type: 'tree', root: 'Three ways to center the world', children: [{n: 'Babylonian map', s: '~750 BCE, Babylon at the center'}, {n: 'Beatus map', s: 'Medieval Spain, east on top'}, {n: 'Al-Idrisi model', s: '12th-c. geographer, south on top'}]},
        img: 'Babylonian Map of the World'},
      {h: 'The map quiz', p: [
        ['📍', 'Goal: picture the region by rivers, seas, mountains and historical regions, not modern country borders.'],
        ['📝', 'You get a list of locations, an annotated map and a blank practice map on Canvas. The quiz is in section in Week 3.']],
        map: {pins: [['Minya', 'Upper Egypt'], ['Constantinople', 'Istanbul'], ['Hamadan', 'Hamadan'], ['Samarkand', 'Samarkand']]}},
      {h: 'A region of many languages', p: [
        ['🔤', 'Arabic: hundreds of millions of speakers and the liturgical language of Muslims worldwide. Its script is an abjad: consonants and long vowels, with short vowels optional.'],
        ['✡️', 'Jewish communities across the region used Hebrew for religion and writing and also spoke the local majority language, like Arabic or Persian. Baghdad had a very large Jewish population in 1930.'],
        ['⛪', 'Jewish and Christian communities both speak forms of Neo-Aramaic. Christian Aramaic speakers use Syriac in worship, and many of them live in Michigan.'],
        ['✍️', 'Greek, Armenian, Georgian and Coptic use alphabets. Script can follow religion: Greek once written in Arabic letters by Muslims, Turkish in Greek letters by Christians.'],
        ['🗣️', 'Persian has regional forms (Farsi, Dari, Tajik) that understand each other. Kurdish has two main branches, Sorani and Kurmanji.']]},
      {h: 'Takeaways', p: [
        ['🔄', 'The definition of “Middle East” is heuristic and changes with the question.'],
        ['🏛️', 'For the last 150 years, European and American interests decided what counted.'],
        ['🔗', 'For more than 5,000 years the region has had real cultural, religious and political ties, with shifting boundaries.']]}
    ],
    terms: [
      {t: 'Middle East', ar: 'الشرق الأوسط', tr: 'al-sharq al-awsaṭ', d: 'A geopolitical term coined in the late 1800s for a region European colonial powers cared about. Alternatives include West Asia, MENA and SWANA.', src: 'roadmap'},
      {t: 'Map', d: 'A selective representation of space meant to help with a task or make a claim. Every map is embedded in its context and exerts power.', src: 'roadmap'},
      {t: 'Epistemic violence', d: 'Marginalizing, discrediting or silencing other ways of knowing and producing knowledge.', src: 'slides'},
      {t: 'Critical cartography', d: 'Reading maps as constructed arguments rather than neutral pictures of reality.', src: 'slides'},
      {t: 'Ottoman Empire', d: 'Empire ruling provinces and client states from Istanbul (Constantinople) from the 1300s to the early 1900s.', src: 'roadmap'},
      {t: 'British India', d: 'Britain’s colonial rule over the Indian subcontinent, first through a company and later directly, from the mid-1700s to 1947.', src: 'roadmap'},
      {t: 'Abjad', ar: 'أبجد', d: 'A script that writes consonants and long vowels, leaving short vowels optional. Arabic uses one.', src: 'slides'}
    ],
    sources: [
      {name: 'Babylonian Map of the World', when: '~750 BCE', where: 'Babylonia; now British Museum (BM 92687)', note: 'Puts Babylon at the center of the world, ringed by a sea. Raises the question of how it ended up in London.'},
      {name: 'World map on the model of al-Idrisi', when: 'Copy made 1553 CE', where: 'Bodleian Library, Oxford', note: 'South at the top. Shows a long tradition of mapping the region from within.'},
      {name: 'Beatus world map', when: 'Copies of an 8th-century original', where: 'Medieval Spain', note: 'East at the top, organized around Christian sacred history.'}
    ]
  },

  3: {
    src: ['Class 3 slides', 'Class 3 roadmap'],
    summary: 'Race is a social construct, not biology. The class follows how US courts sorted people from the Middle East and North Africa into “white” and “non-white,” and why the results contradicted each other.',
    beats: [
      {h: 'Ground rules: the Principles of Engagement', p: [
        ['🤝', 'The course document asks for respectful communication, awareness of yourself and others, and avoiding generalizations.'],
        ['🎓', 'Wear the “historian’s hat”: study the past as scholars rather than defending views formed outside class.']]},
      {h: 'Myth: race is biology, ethnicity is culture', myth: true, scene: {type: 'stamp', base: 'Race = biology, ethnicity = culture', bad: 'FALSE', good: ['Both are social', 'Race adds hierarchy']}, p: [
        ['❌', 'A common claim says race is biological while ethnicity is about language and culture. That is false.'],
        ['⚠️', 'The instructors flagged that a question on this will appear on the first test.']]},
      {h: 'Working definitions', id: 'race', p: [
        ['👥', 'Ethnicity: groups people form around a sense of common culture, history, family ties and language. They are social, they shift, and they overlap.'],
        ['🪜', 'Race: also socially made, not rooted in biology. In this class it means a ranked grouping used to justify domination and exploitation.'],
        ['🧱', 'Racial groups rest on essentialized difference, imagined as unchangeable. “Scientific racism” props up those imagined differences with pseudoscience.']],
        visual: {type: 'compare', left: {h: 'Ethnicity', items: ['Shared culture, history, kinship, language', 'Social and fluid', 'Groups overlap']}, right: {h: 'Race', items: ['Also social, not biological', 'Built around hierarchy', 'Treats difference as fixed']}}},
      {h: 'Race is not skin color or genes', p: [
        ['🎨', 'The Humanae photo project shows people with identical skin tones who would be “raced” differently in the US.'],
        ['👔', 'A 2011 study found clothing changed perceived race: the same face in a suit was more often seen as white, in sweats more often as Black.'],
        ['🧬', 'Phenotype is what you can see. Genotype is genetic makeup. Genetic variation within the imagined racial groups is bigger than the variation between them.']]},
      {h: 'Racial categories change over time', p: [
        ['🐎', 'Modern “race” vocabulary came from European horse breeding in the 1400s and was applied to humans in the 1700s.'],
        ['⛓️', 'The Black/white distinction emerged to justify Europeans enslaving Africans, including in the American colonies.'],
        ['🤔', 'Before 1700, societies sorted people by culture, religion, language and appearance. Whether to call that “race” is a question the class keeps returning to.']]},
      {h: 'MENA and the US census', p: [
        ['📋', 'Since 1978 the US government has classified people from the Middle East and North Africa as white.'],
        ['🚫', 'Many still face discrimination in housing, work and services. A 2022 news story used in class noted that, with no MENA checkbox on census forms, there was no direct national count.'],
        ['⏱️', 'An irony of timing: 1978 brought the white classification, and 1979 (the Iranian Revolution and hostage crisis) brought intense hostility toward Iranians in the US.']]},
      {h: 'Three key terms', id: 'hinge', p: [
        ['🔁', 'Racialization: the ongoing, contested process of creating and maintaining racial groups.'],
        ['🕳️', 'Racial loophole (Neda Maghbouleh): when the legal category does not match lived experience, for example racism that goes unrecognized because the victim is legally white.'],
        ['🚪', 'Racial hinge: a group at the edge of whiteness (like Iranians, Jews or Italians) used to open or close the door to whiteness as needed.']]},
      {h: 'The court cases', p: [
        ['⚖️', 'In re Najour (1908): Syrians were ruled white, partly by pointing to Iranians as white Asians.'],
        ['⛪', 'In re Halladjian (1909): Armenians were ruled white by stressing their Christianity and their history against Persia, which cast Iranians and Muslims as not white.'],
        ['🗣️', 'Dow v. US (1915): the argument that Persian is an Indo-European language did not settle anything, and whiteness was tied to Europe.'],
        ['🙅', 'US v. Thind (1923): a claim to whiteness through the “Aryan” myth was rejected. Technically white, socially brown: the loophole at work.']],
        visual: {type: 'timeline', events: [{y: 1908, t: 'Najour'}, {y: 1909, t: 'Halladjian'}, {y: 1915, t: 'Dow'}, {y: 1923, t: 'Thind'}, {y: 1978, t: 'MENA = white'}, {y: 1979, t: 'Revolution'}]}},
      {h: 'The Aryan myth', p: [
        ['📜', 'In the early 1800s, European intellectuals imagined an ancient “original people” as their ancestors, which helped justify empire.'],
        ['🔤', 'The language family linking Persian and European languages was misread as a racial bloodline. “Aryan” was built from an Old Iranian self-name, ariya.'],
        ['🎬', 'The 1925 film Grass, by the later makers of King Kong, shows the same mix of fascination with a racial “original” and fear of the racial Other.'],
        ['🪞', 'Iranian and Hindu nationalists adopted the idea to claim equality with the West while ranking themselves above neighbors. Iran’s last shah used this language in 1973.']]},
      {h: 'What the cases left intact', p: [
        ['🏛️', 'Whiteness controlled access to citizenship, property and immigration, and the rulings contradicted each other.'],
        ['🎯', 'Plaintiffs argued to become white rather than to dismantle racial classification, so the myth of whiteness itself survived.']]}
    ],
    terms: [
      {t: 'Ethnicity', d: 'Social groups formed around a sense of common culture, history, family ties and language. They shift and overlap.', src: 'roadmap'},
      {t: 'Race', d: 'Socially made, not biological: a ranked grouping that justifies domination, resting on differences treated as fixed and essential.', src: 'roadmap'},
      {t: 'Scientific racism', d: 'Using pseudoscience to explain imagined differences between racial groups.', src: 'roadmap'},
      {t: 'Racialization', d: 'How racial groups get made and kept in place.', src: 'roadmap'},
      {t: 'Racial loophole', d: 'Maghbouleh’s term for a mismatch between legal race and social experience, such as racism unrecognized because the victim is legally white.', src: 'roadmap'},
      {t: 'Racial hinge', d: 'A group at the boundary of whiteness, used to open or close the door to whiteness as needed.', src: 'slides'},
      {t: 'Phenotype / genotype', d: 'Phenotype is an organism’s observable traits. Genotype is its genetic makeup. Sorting people by phenotype does not track genetic difference.', src: 'slides'},
      {t: 'Aryan myth', d: 'A 19th-century European idea that turned a language family into a racial bloodline, using an Old Iranian self-name (ariya).', src: 'slides'}
    ],
    sources: [
      {name: 'US court cases on whiteness', when: '1908–1923', where: 'United States', note: 'In re Najour, In re Halladjian, Dow v. US and US v. Thind show contradictory legal reasoning about who counted as white.'},
      {name: 'Grass: A Nation’s Battle for Life (film)', when: '1925', where: 'Filmed in Iran', note: 'Used in class to show how the “Aryan myth” shaped Western images of Iranians.'}
    ]
  },

  4: {
    src: ['Class 4 slides', 'Class 4 roadmap', 'Section 6 handout'],
    summary: 'Farming did not cause states, and early states were fragile and often coercive. In the Uruk Period the first city-state tools appear: tokens and bullae, mass-produced bowls, narrative art and, by about 3200 BCE, writing.',
    beats: [
      {h: 'Myth: the “Agricultural Revolution”', myth: true, p: [
        ['🌾', 'The textbook chain goes: farming gave free time, free time allowed specialists, specialists built complex society, and the state was the natural result.'],
        ['❌', 'The lecture takes this chain apart, drawing on James Scott.']],
        visual: {type: 'flow', steps: ['Farming', 'Free time', 'Specialists', 'Complex society', 'The state']}},
      {h: 'What the old story gets wrong', p: [
        ['⏳', 'About 95% of human history is non-agricultural.'],
        ['🐢', 'Domestication was not an on/off switch but a very slow process, with roughly 3,000 years between major phases.'],
        ['🏕️', 'Settling down was not always desirable, and it did not require a state.'],
        ['🏚️', 'States were not normal or inevitable. Early ones were wobbly and fragile.']]},
      {h: 'Towns before farming', id: 'catal', img: 'Çatalhöyük', map: {pins: [['Çatalhöyük', 'Çatalhöyük']]}, p: [
        ['🏘️', 'Çatalhöyük in Anatolia (about 9000–7400 BCE) was a large settlement with no streets, squares or monuments. People entered houses through the roof.'],
        ['⚖️', 'The layout and the skeletons point to little wealth inequality, and people could join or leave.'],
        ['🌊', 'Rich wetlands, like the marshes of southern Iraq, supported people well before farming took over. Flood (décrue) farming planted after floodwaters dropped, with no central authority.'],
        ['🌱', 'Domesticated wheat keeps its seeds on the stalk and “waits for the harvest,” unlike wild wheat that scatters.']]},
      {h: 'The agricultural paradox', p: [
        ['🦴', 'A grain-heavy diet and crowding with animals and crops made skeletons lighter and weaker.'],
        ['👶', 'Farming villages had more infant deaths and more starvation.'],
        ['🍼', 'They still grew because babies were weaned earlier with grain foods, so more were born.'],
        ['🏕️', 'Scott calls these villages “late-Neolithic multispecies resettlement camps”: more drudgery and worse health than foraging.']]},
      {h: 'Why grain made states', p: [
        ['🌡️', 'A warming climate around 9500 BCE may have disrupted older foraging patterns.'],
        ['🧮', 'Grain is easy to see, measure, tax, store and ration. Early states, writing, grain and taxation grew together.'],
        ['🥖', 'Scott’s argument: states only became possible where people had few alternatives to a grain-based diet.']]},
      {h: 'Rethinking the state', p: [
        ['⛓️', 'Early states relied heavily on unfree labor. Scott sees bondage as a condition of their survival.'],
        ['🏗️', 'States did not invent cities or irrigation. They amplified an existing setting (“state landscaping”) and held people in place by controlling food.']]},
      {h: 'Myth: the “Fertile Crescent”', myth: true, p: [
        ['🌙', 'The Egyptologist James Henry Breasted coined the term in 1916, picturing one crescent-shaped zone where farming began.'],
        ['🗺️', 'Earliest domestication actually happened in Anatolia, the Zagros and the Iranian plateau. The earliest states were in Sumer.'],
        ['🙈', 'The label merges states with agriculture, and it leaves out Egypt and Sudan.']]},
      {h: 'The Uruk Period (4000–3000 BCE)', img: 'Uruk', map: {pins: [['Uruk', 'Uruk'], ['Chogha Mish', 'Chogha Mish']]}, p: [
        ['🏙️', 'Settlements multiply and Uruk becomes the largest city in the Middle East. By the Late Uruk (3300–3100 BCE) it is nearly 20 times bigger than its neighbors.'],
        ['🧰', 'The “state starter kit”: monumental architecture (the White Temple on its ziggurat, about 3300 BCE), bureaucracy and taxes, and wealth inequality.'],
        ['🤔', 'Scott stresses coercion and reversibility (people could leave). Class asks what else, like religion, might draw people to a city.']]},
      {h: 'Running the city: tokens and bullae', id: 'bulla', p: [
        ['🔘', 'Little clay tokens show up by about 8500 BCE and grow more complex during the Uruk Period.'],
        ['🥚', 'Tokens were sealed inside clay envelopes (bullae) and rolled with an official’s cylinder seal for a tamper-proof record.'],
        ['💡', 'Impressing the tokens on the outside meant you could check the contents without breaking the envelope, a step toward writing.']]},
      {h: 'Beveled-rim bowls', id: 'bowls', p: [
        ['🥣', 'Cheap, mass-produced, disposable bowls that appear around 3500 BCE and spread across the region.'],
        ['❓', 'Their purpose is debated: ration distribution or bread molds. Simplicity itself was the innovation.'],
        ['🌐', 'Uruk-style goods, city plans and temples spread to Anatolia, the Zagros, Iran and Syria. Trade, colonies or imitation?']]},
      {h: 'The Uruk Vase', id: 'uruk_vase', img: 'Warka Vase', p: [
        ['🏺', 'A carved stone vase from Uruk (about 3200–3000 BCE) arranged in stacked bands.'],
        ['⬆️', 'The scenes move from plants to animals to people carrying offerings up to the goddess Inana, with the ruler leading.'],
        ['🔣', 'Some symbols on it, like Inana’s sign, became cuneiform signs as writing developed. Religion helped hold the early state together.']],
        visual: {type: 'flow', steps: ['Water and plants', 'Sheep and goats', 'Men with offerings', 'Ruler before Inana']}},
      {h: 'The first writing', p: [
        ['🧾', 'By about 3250 BCE Uruk used a new accounting system. About 5,000 clay tablets survive, with pictures for goods and places and dots for numbers.'],
        ['🔇', 'At first this writing was non-linguistic: it did not record the sounds of any one language.'],
        ['🖼️', 'It borrowed from narrative art, tokens and everyday objects like beer jugs.']]},
      {h: 'From pictures to cuneiform', p: [
        ['🔣', 'Logograms stand for a word or idea (DINGIR = god). Syllable signs stand for sounds (Uruk = u-ru-uk).'],
        ['✒️', 'Cuneiform is a script, not a language, made by pressing a reed stylus into clay.'],
        ['🗣️', 'Fully linguistic writing appears around 2800 BCE in a bilingual society that spoke Sumerian and Akkadian.']],
        visual: {type: 'flow', steps: ['Tokens (8500 BCE)', 'Bullae', 'Accounting tablets (3250)', 'Linguistic cuneiform (2800)']}}
    ],
    terms: [
      {t: 'Homo sapiens sapiens', d: 'Anatomically modern humans, emerging about 200,000 years ago.', src: 'roadmap'},
      {t: 'Neolithic', d: '~10,000–3,000 BCE. The long stretch before linguistic writing, with slow domestication of plants and animals and the first states.', src: 'roadmap'},
      {t: 'Uruk Period', d: '~4000–3000 BCE. Uruk grows into a huge city and trade and administration spread; early writing is used for accounting.', src: 'roadmap'},
      {t: 'Early Dynastic Period', d: '2900–2350 BCE. Fully linguistic writing and large palaces separate from temples.', src: 'roadmap'},
      {t: 'Sedentism', d: 'Living in one place year-round. Scott shows it did not require farming or a state.', src: 'slides'},
      {t: 'Pictograph', d: 'A picture standing for a word or idea.', src: 'roadmap'},
      {t: 'Logogram', d: 'A sign standing for a whole word or concept rather than a sound.', src: 'roadmap'},
      {t: 'Cuneiform', d: 'A wedge-shaped script (not a language) pressed into clay, used for Sumerian and Akkadian with both logograms and syllable signs.', src: 'roadmap'},
      {t: 'Sumerian', d: 'Language of southern Iraq in the 3rd millennium BCE, with no known relatives. Kept as a liturgical language for about 2,000 years after it stopped being spoken.', src: 'roadmap'},
      {t: 'Akkadian', d: 'The second language of bilingual southern Iraq, related to Hebrew and Arabic (a Semitic language).', src: 'roadmap'},
      {t: '“Fertile Crescent”', d: 'A 1916 label (Breasted) for where farming supposedly began. Misleading: it merges states with agriculture and leaves out Egypt and Sudan.', src: 'slides'}
    ],
    sources: [
      {name: 'Uruk Vase', when: '~3200–3000 BCE', where: 'Uruk (Warka), southern Iraq; Iraq Museum 19606', note: 'Stacked scenes of offerings to Inana led by the ruler.'},
      {name: 'Beveled-rim bowls', when: 'From ~3500 BCE', where: 'Across the Uruk world; example at the UM Museum of Anthropological Archaeology', note: 'Mass-produced disposable bowls, purpose debated.'},
      {name: 'Clay bulla with tokens', when: '~3100 BCE', where: 'Chogha Mish, Iran; ISAC D.15969', note: 'Sealed clay envelope holding counting tokens.'},
      {name: 'Proto-cuneiform tablet', when: '~3200–3000 BCE', where: 'Uruk Period; Metropolitan Museum 1988.433.1', note: 'Early accounting with pictographs and number marks.'}
    ]
  },

  5: {
    src: ['Class 5 slides', 'Class 5 roadmap'],
    summary: 'Nineteenth-century scholars read modern race back into Mesopotamia by treating language as bloodline. Mesopotamians drew their own lines differently: settled versus mobile life, not skin color or language.',
    beats: [
      {h: 'Racializing Mesopotamia', p: [
        ['🏷️', 'Racialization is the making of racial groups and the sorting of people into them.'],
        ['🔀', 'It is rarely consistent or logical, and this class is a case study.']]},
      {h: 'Informal imperialism and archaeology', p: [
        ['🏛️', 'In the mid-1800s the British Museum and the Louvre raced each other for antiquities in Ottoman lands, removing over 100,000 objects. The class calls this looting.'],
        ['🔓', 'One result was the decipherment of Akkadian.'],
        ['😬', 'That was unsettling to Europeans: Akkadian belongs to the Semitic family along with Arabic and Hebrew, and its texts are nearly 2,000 years older than the earliest Greek ones. It challenged the idea that “civilization” began with Europe’s Greek ancestors.']]},
      {h: 'The “Sumerian Problem”', p: [
        ['🗣️', 'Mesopotamia was bilingual (Sumerian and Akkadian), and the earliest texts are in Sumerian, which has no known relatives.'],
        ['❓', 'Scholars assumed language equals race, so they asked what “race” the Sumerians were.'],
        ['💀', 'Phrenology, the pseudoscience of reading skull shapes, fed the debate. Its stereotypes, like hooked noses, were also used against Jews and Arabs.']]},
      {h: 'Hunting for heads', img: 'Statues of Gudea', map: {pins: [['Girsu', 'Girsu (Tello)']]}, p: [
        ['🗿', 'At Girsu (Tello), French diplomat Ernest de Sarzec dug for the Louvre. Its director pushed him to get the statue heads at any cost.'],
        ['📚', 'Statues like those of King Gudea were used to “prove” a Sumerian racial type, which then showed up in textbooks.']]},
      {h: 'Why that approach fails', p: [
        ['🚫', 'Language is not the same as descent or ethnicity.'],
        ['🤝', 'Mesopotamia was bilingual, with no sign that people divided themselves by language.'],
        ['🖤', 'They called their land the “Land of the Black-Headed People,” a phrase that took in speakers of both languages.']]},
      {h: 'Meet the gods', p: [
        ['☀️', 'Gods were cosmic forces, and some also stood for places or groups.'],
        ['🔑', 'Ones to know: Shamash (sun), Martu (personified non-settled people), Marduk (Babylon) and Ashur (Assyria).']]},
      {h: 'The Marriage of Martu', id: 'sedentary', p: [
        ['📜', 'A Sumerian myth (about 1800 BCE) about Martu, “Mr. West,” who wants to marry the goddess Adngar-kidug while her friends try to talk her out of it.'],
        ['🍖', 'Her friends mock him through religion, food, animal-like behavior and lifestyle.'],
        ['⛺', 'The insult is about how he lives, not his skin or language.']]},
      {h: 'The “Amorites”', p: [
        ['🧭', 'From the Ur III kingdom (2100–2000 BCE) onward, kings complain about “Amorites,” Akkadian amurru, Sumerian martu, meaning “westerners.”'],
        ['🏷️', 'It was an exonym, a label for outsiders. Some early sources even use it for people from the east, so it was not one coherent group, much like “the Orient” today.'],
        ['💥', 'After Ur III collapsed around 2000 BCE from environmental and political stress, new writings blamed the Amorites and other mobile groups. The Marriage of Martu became popular then.']],
        visual: {type: 'timeline', events: [{y: -2100, t: 'Ur III begins'}, {y: -2000, t: 'Ur III falls'}, {y: -1800, t: 'Marriage of Martu'}]}},
      {h: 'Ur III basics', map: {pins: [['Ur', 'Ur'], ['Uruk', 'Uruk'], ['Nippur', 'Nippur']]}, p: [
        ['🏛️', 'Power centered on the city of Ur, with tens of thousands of surviving receipts.'],
        ['📖', 'Sumerian stopped being spoken in this period but stayed in use as a literary language.']]},
      {h: 'Alterity: then and now', p: [
        ['⛺', 'Mesopotamians cared about settled versus mobile life. They did not sort people by phenotype or language.'],
        ['🪞', 'But the stereotypes they used (animal-like, bad food, wrong religion, wrong lifestyle) look a lot like those used in racialization today.']],
        visual: {type: 'compare', left: {h: 'Mattered in Mesopotamia', items: ['Settled vs. mobile life', 'Food, religion, behavior']}, right: {h: 'Did not matter', items: ['Skin color', 'Language spoken']}}}
    ],
    terms: [
      {t: 'Semitic', d: 'Useful meaning: a language family including Akkadian, Arabic, Aramaic and Hebrew. Racialized meaning (avoid): a supposed shared bloodline of everyone who speaks those languages.', src: 'roadmap'},
      {t: 'Sumerian (term)', d: 'Can mean the Sumerian language or residents of Sumer. Not everyone in Sumer spoke Sumerian, so treating “Sumerians” as an ethnic group is a racialized mistake.', src: 'roadmap'},
      {t: 'Sumer and Akkad', d: 'A broad, inclusive name for southern Mesopotamia (Sumer/Babylonia on the map quiz). Akkad is probably under modern Baghdad.', src: 'roadmap'},
      {t: 'Sargon of Akkad', d: 'Ruler from Akkad (~2330–2280 BCE) who continued a trend of centralizing power. The Akkadian Period runs ~2330–2100 BCE.', src: 'roadmap'},
      {t: 'Alterity', d: 'Otherness: how a society defines who counts as different.', src: 'slides'},
      {t: 'Exonym', d: 'A name given to a group by outsiders, like “Amorite” (westerner).', src: 'slides'},
      {t: 'Phrenology', d: 'A pseudoscience claiming skull shape reveals character, used in 19th-century racial theories.', src: 'slides'},
      {t: 'Ur III Period', d: '~2100–2000 BCE. A kingdom centered on Ur with huge records; Sumerian dies out as a spoken language.', src: 'slides'}
    ],
    sources: [
      {name: 'The Marriage of Martu', when: '~1800 BCE', where: 'Sumerian literary text; tablet in the Penn Museum (CBS 14061)', note: 'Mocks the god of mobile people through food, religion and lifestyle.'},
      {name: 'Statues of Gudea', where: 'Girsu (Tello), Iraq; Louvre', note: 'Used by 19th-century scholars to invent a Sumerian racial type.'}
    ]
  },

  6: {
    src: ['Class 6 slides', 'Class 6 roadmap'],
    summary: 'Orientalism is a style of thought that splits “East” from “West” and serves imperial power. Hammurabi’s stele is not a working law code but a monument to idealized, poetic justice, and misreading it feeds Orientalist stereotypes.',
    beats: [
      {h: 'What is Orientalism?', id: 'orientalism', p: [
        ['📖', 'The Palestinian-American scholar Edward Said (1935–2003) made the term famous in 1978. The dictionary added the critical meaning because of his work.'],
        ['🔗', 'It is a web of stereotypes and assumptions about Asia and the Middle East that mirror and strengthen unequal power, above all under European and American imperialism.'],
        ['🙅', 'Until the 1980s, “Oriental” was used for people from the Middle East, South Asia and East Asia alike. Said’s book is why we stopped.']]},
      {h: 'East vs. West as a mindset', p: [
        ['🪞', 'Orientalism assumes the “Orient” and the “Occident” have fundamentally different ways of being (ontology) and knowing (epistemology).'],
        ['🧊', 'It pictures the East as timeless, uniform and frozen: an “ideal other” for Europe to define itself against.'],
        ['💪', 'Hegemony: Said’s word for “soft” power that works through culture rather than force.']],
        visual: {type: 'compare', left: {h: 'Imagined “West”', items: ['Democratic', 'Secular (or Christian)', 'Gender equality', 'Evolving']}, right: {h: 'Imagined “East”', items: ['Despotic', 'Ruled by religion', 'Represses women', 'Static']}}},
      {h: 'The tension Said points to', p: [
        ['🏛️', 'The “Orient” is next to Europe, home of its richest colonies and the source of its languages and oldest empires.'],
        ['😣', 'That closeness made Europeans uncomfortable, so the East was cast as Europe’s opposite.'],
        ['✡️', 'Said shows Jews were also cast as Oriental in 19th-century Europe. Today Mizrahi (Middle Eastern) Jews in Israel, about half of Israeli Jews, face Orientalism too.']]},
      {h: 'Orientalism everywhere', p: [
        ['🎭', 'It shows up in painting, opera (Puccini’s Turandot) and Hollywood (Disney’s Aladdin, 1992).'],
        ['🎶', 'Aladdin’s original song called its imagined homeland barbaric, a trope the class connects to Hammurabi.'],
        ['🎼', 'Said’s alternative: a “contrapuntal” reading that understands others as you would understand yourself.']]},
      {h: 'Two myths about Hammurabi', myth: true, scene: {type: 'stamp', base: 'Hammurabi’s stele', bad: 'FIRST LAW CODE', good: ['Not the first', 'Not applied law', 'Poetic justice']}, p: [
        ['❌', 'Myth 1: it is the oldest law collection in the world. The first known royal collection is from King Ur-Namma of Ur, about 2100 BCE.'],
        ['❌', 'Myth 2: its laws were rigid and brutally applied. No surviving court record cites it.']]},
      {h: 'Who was Hammurabi?', id: 'hammurabi', img: 'Code of Hammurabi', map: {pins: [['Babylon', 'Babylon'], ['Susa', 'Susa (Elam)']], arrows: [['Babylon', 'Susa']]}, p: [
        ['👑', 'King of Babylon, 1792–1750 BCE, in the Old Babylonian Period. His realm ran from the Gulf to the middle Euphrates and upper Tigris, including Assyria.'],
        ['🗿', 'He set up stelae with “just judgments” in temples.'],
        ['🚚', 'Around 1200 BCE the Elamite king Shutruk-Nahunte carried one to Susa, where French colonial archaeologists later found it. It is now in the Louvre.']]},
      {h: 'Law vs. monuments that look like law', p: [
        ['📑', 'Real legal documents: contracts, court records and applied royal edicts like debt cancellations and tax relief.'],
        ['🏛️', 'Royal “law” monuments glorify the king as a just ruler and list idealized cases that did not reflect practice.'],
        ['🔍', 'Tens of thousands of court tablets survive, and not one cites Hammurabi’s stele.']],
        visual: {type: 'compare', left: {h: 'Applied law', items: ['Contracts', 'Court records', 'Royal edicts (debt, taxes)']}, right: {h: 'Not law', items: ['“Law codes” like the stele', 'Glorify the king', 'Idealized cases']}}},
      {h: 'Reading the stele', p: [
        ['☀️', 'At the top, Shamash (sun god and god of justice) sits on mountains with rays of light. Hammurabi stands before him in an old-fashioned ruler’s cap, linking himself to ancient kings.'],
        ['📜', 'Prologue: the gods call Hammurabi and he builds temples. Middle: “if ... then” cases. Epilogue: these are the just judgments Hammurabi set.']]},
      {h: 'Poetic justice', p: [
        ['🔥', 'One case says a man who steals while helping fight a house fire is thrown into that fire: a punishment that fits the crime.'],
        ['👁️', '“An eye for an eye” is an ideal of perfect balance, not something applied in courts.'],
        ['🎯', 'Who it was for: scribal students copied it for over 1,500 years, the gods and future kings were its main audience, and if displayed it projected a just king.']]},
      {h: 'How the misreading feeds Orientalism', p: [
        ['📈', 'Orientalism imagines a ladder of “civilizational progress”: the ancient Middle East contributes, then Christian Europe and America surpass it.'],
        ['⚖️', 'Reading the stele as real law fits both moves: law looks like an achievement, but “Middle Eastern law” looks brutal.'],
        ['📚', 'The myth persists because it feels true: it is taught in schools and matches existing stereotypes.']]},
      {h: 'From Mesopotamia to Judaism and Islam', p: [
        ['🐂', 'The case of an ox known to gore shows up three times: in Exodus 21 (~700 BCE), on Hammurabi’s stele (~1750 BCE) and, earliest, in the Laws of Eshnunna (~1930 BCE).'],
        ['🔗', 'Jewish and later Islamic law grew from this shared tradition, which raises the question of which “laws” were ever meant to be applied.'],
        ['⚠️', 'Islamophobia and antisemitism share roots in the 19th-century racialization of Semitic languages, and both feed stereotypes of harsh “Old Testament” or Islamic law.']]}
    ],
    terms: [
      {t: 'Orientalism', d: 'A web of stereotypes and assumptions about Asia and the Middle East that mirror and strengthen unequal power, above all under European and American imperialism.', src: 'roadmap'},
      {t: 'Edward Said', d: 'Palestinian-American scholar (1935–2003) who coined the critical sense of Orientalism and analyzed it as a form of domination.', src: 'roadmap'},
      {t: 'Hegemony', d: 'Said’s term for “soft” power exercised through culture.', src: 'roadmap'},
      {t: 'Ontology / epistemology', d: 'Ways of being / ways of knowing. Orientalism claims East and West differ in both.', src: 'slides'},
      {t: 'Old Babylonian Period', d: '2000–1600 BCE. Babylon rises; under Hammurabi (1792–1750) it rules from the Gulf to Assyria.', src: 'roadmap'},
      {t: 'Hammurabi’s stele', d: 'Monument listing “just judgments,” copied by scribes for 1,500+ years. The best-preserved copy is in the Louvre.', src: 'roadmap'},
      {t: 'Poetic justice', d: 'A literary ideal in which punishment perfectly mirrors the crime. Satisfying to imagine, not applied in practice.', src: 'slides'},
      {t: 'Shutruk-Nahunte', d: 'Elamite king of the 1100s BCE who looted Babylon and hauled a copy of Hammurabi’s stele off to Susa.', src: 'roadmap'},
      {t: 'Mesopotamian gods (justice)', d: 'Inana/Ishtar (sex, war, abundance), Anu (heavens), Enlil (earth, head god), Shamash (sun and justice).', src: 'roadmap'}
    ],
    sources: [
      {name: 'Hammurabi’s stele', when: '~1750 BCE', where: 'Babylon; taken to Susa; now Louvre (SB 8)', note: 'Shamash and Hammurabi above, prologue, idealized cases and epilogue below.'},
      {name: 'Laws of Ur-Namma', when: '~2100 BCE', where: 'Ur III kingdom; copy in Istanbul Archaeological Museum', note: 'Earliest known royal law collection.'},
      {name: 'Edward Said, “My Thesis” and 1998 film', when: '1978 / 1998', where: 'Orientalism', note: 'Assigned reading and video on how Orientalism works.'}
    ]
  }
};
