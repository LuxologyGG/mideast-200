// Unit 1 lessons, Classes 7-12. Paraphrased from the course slides and roadmaps (no slide text copied).

export const U1B = {
  7: {
    src: ['Class 7 slides (guest lecture)', 'Class 7 roadmap'],
    summary: 'Two Egyptian case studies, Khufu’s pyramid at Giza and Akhenaten’s city at Amarna, seen through the workers and officials who built them rather than only the kings.',
    beats: [
      {h: 'Kingdoms and intermediate periods', p: [
        ['👑', 'Egyptian history alternates between Kingdoms (central government, cultural continuity) and Intermediate Periods (fragmented rule, sometimes foreign rulers).'],
        ['📅', 'Old Kingdom about 2686–2181 BCE, Middle Kingdom about 2055–1650, New Kingdom about 1550–1069, Third Intermediate about 1069–664.'],
        ['📝', 'The Test 1 study guide rounds these: Old Kingdom ~2600–2100 BCE and New Kingdom 1550–1100 BCE.']],
        visual: {type: 'timeline', events: [{y: -2686, t: 'Old Kingdom'}, {y: -2055, t: 'Middle Kingdom'}, {y: -1550, t: 'New Kingdom'}, {y: -1069, t: 'Third Intermediate'}, {y: -332, t: 'Ptolemaic'}]}},
      {h: 'The shape of Egypt', map: {pins: [['Giza', 'Giza'], ['Amarna', 'Amarna'], ['Thebes', 'Thebes'], ['Aswan', 'Aswan (1st cataract)']]}, p: [
        ['⬆️', 'The Nile flows south to north. Upper Egypt is the south, Lower Egypt the north.'],
        ['🪨', 'Egypt ran from the first cataract at Aswan to the Mediterranean. Lower Nubia lay between the first and second cataracts. Sinai was not part of Egypt proper.'],
        ['🌧️', 'Egypt gets almost no rain. Monsoon rains on the Ethiopian highlands fed the flood from July to October, leaving rich silt. Too high and villages flooded, too low and fields went dry.']]},
      {h: 'Two lands, two colors', p: [
        ['🌗', 'Egypt called itself “the two lands”: Upper and Lower Egypt.'],
        ['🟫', 'Kemet, the “black land,” was the fertile river valley. Deshret, the “red land,” was the desert.']]},
      {h: 'Khufu and the Great Pyramid', id: 'khufu', img: 'Great Pyramid of Giza', p: [
        ['🔺', 'Built for Khufu (Greek name Cheops) around 2589–2566 BCE in the Old Kingdom’s 4th Dynasty. Pyramids were also built for Sneferu and Khafre in the same century.'],
        ['⛏️', 'Most stone came from the limestone bedrock of the Giza plateau itself, cut with copper tools and quartz sand.'],
        ['🛶', 'Fine white limestone for the outer casing came from Tura and moved by boat along the Nile.']]},
      {h: 'The people who built it', p: [
        ['🏘️', 'A pyramid town south of the Sphinx housed workers and the officials running the projects.'],
        ['🔁', 'Workers were probably a corvée force, people owing rotating labor to the state. Estimates run to 20,000–25,000 workers.'],
        ['🍞', 'Bakeries show bread and beer were the basic diet, with plenty of meat and fish. Bigger houses had more cattle and fish, so not everyone ate the same.']]},
      {h: 'The Logbook of Merer', p: [
        ['📜', 'Papyri from the Red Sea port of Wadi el-Jarf record the last years of Khufu’s reign.'],
        ['🚢', 'An inspector named Merer logs his crew hauling Tura limestone and sailing it to Khufu’s pyramid, with bread rations arriving along the way.'],
        ['👷', 'It shows organized, named non-royal workers behind the monument.']]},
      {h: 'Akhenaten’s revolution', id: 'aten', img: 'Akhenaten', p: [
        ['☀️', 'A New Kingdom king (ruled about 1352–1336 BCE) who began as Amenhotep IV and in year 5 renamed himself Akhenaten, “beneficial for the Aten.”'],
        ['🌞', 'He focused worship on the Aten, the sun disk, to the exclusion of other gods. This is often called monotheism.'],
        ['🔨', 'Images and names of the god Amun, whose priesthood at Karnak in Thebes was powerful, were chiseled out.'],
        ['🎨', 'Royal art changed style too, compared with earlier kings like Thutmose III.']]},
      {h: 'Amarna: a new capital', id: 'amarna', map: {pins: [['Thebes', 'Thebes'], ['Amarna', 'Amarna (Akhetaten)']], arrows: [['Thebes', 'Amarna']]}, p: [
        ['🏙️', 'Akhenaten and Nefertiti moved the royal residence from Memphis and Thebes to a newly built city, Akhetaten, “Horizon of the Aten,” today called Amarna.'],
        ['🏛️', 'Its Great Temple to the Aten was the religious center, and royal images show the couple beneath the sun disk.'],
        ['🏠', 'In houses, archaeologists found small household gods that were not the Aten, so ordinary people kept older practices.'],
        ['⚰️', 'Non-elite cemeteries with multi-layered graves give a view of the ordinary people who built and lived in the city.']]},
      {h: 'A warning about Herodotus', p: [
        ['🏺', 'Herodotus, a Greek historian of the 400s BCE, wrote about peoples across the ancient Middle East to show Greek superiority over the Persians.'],
        ['⚠️', 'Before scholars could read hieroglyphs and cuneiform, he was one of the main sources. He is not reliable.']]}
    ],
    terms: [
      {t: 'Old Kingdom (Egypt)', d: '~2600–2100 BCE on the study guide. Hieroglyphic writing is established and the Giza pyramids are built.', src: 'roadmap'},
      {t: 'New Kingdom (Egypt)', d: '~1550–1100 BCE. Egypt is a superpower reaching the Syrian coast; Tutankhamun and Ramses II rule.', src: 'roadmap'},
      {t: 'Third Intermediate Period', d: '~1100–650 BCE. Egypt divided among rival dynasties, including Nubian pharaohs from Napata.', src: 'roadmap'},
      {t: 'Akhenaten and Nefertiti', d: 'New Kingdom royal couple (1300s BCE) who centered worship on the Aten and moved the capital from Thebes to Amarna.', src: 'roadmap'},
      {t: 'Herodotus', d: 'Greek historian (400s BCE) who wrote to show Greek superiority over Persia. Not an accurate source.', src: 'roadmap'},
      {t: 'Inundation', d: 'The yearly Nile flood (July–October) that laid down fertile silt.', src: 'slides'},
      {t: 'Kemet / Deshret', d: 'Egyptian names for the fertile “black land” of the valley and the “red land” of the desert.', src: 'slides'},
      {t: 'Corvée labor', d: 'Labor owed to the state in rotating shifts, likely how pyramid workers were organized.', src: 'slides'}
    ],
    sources: [
      {name: 'Khufu’s Great Pyramid', when: '~2589–2566 BCE', where: 'Giza, Egypt', note: 'Old Kingdom royal tomb built by organized crews and supplied by boat.'},
      {name: 'Logbook of Merer', when: 'End of Khufu’s reign', where: 'Wadi el-Jarf papyri', note: 'A work crew’s diary of hauling Tura limestone to the pyramid.'},
      {name: 'Plaque of Akhenaten and Nefertiti under the Aten', when: '~1352–1336 BCE', where: 'Amarna, Egypt', note: 'Royal couple beneath the sun disk, center of Akhenaten’s religion.'}
    ]
  },

  8: {
    src: ['Class 8 slides', 'Class 8 roadmap'],
    summary: 'The Neo-Assyrian Empire ruled through provinces, client states, roads and tribute ceremonies that put diversity on display. The same years bring the first mentions of the “Land of the Arabs,” Israel and Damascus, which look very different from modern expectations.',
    beats: [
      {h: 'Is Mesopotamian alterity “race”?', p: [
        ['🤔', 'Answering needs both a clear definition of race and a picture of how racialization works today.'],
        ['✏️', 'Careful wording: not “race is based on biology,” but “race today rests on incorrect claims about biology.”']]},
      {h: 'Assyria’s long history', p: [
        ['📅', 'Old Assyrian (2000–1700 BCE), Middle Assyrian (1350–1000 BCE) and Neo-Assyrian (~900–610 BCE).'],
        ['🌊', 'No state before the Neo-Assyrian Empire had ruled all the way from the Gulf to the Mediterranean.']],
        visual: {type: 'timeline', events: [{y: -2000, t: 'Old Assyrian'}, {y: -1350, t: 'Middle Assyrian'}, {y: -900, t: 'Neo-Assyrian'}, {y: -610, t: 'Fall'}]}},
      {h: 'Kings to know', map: {pins: [['Assur', 'Assur'], ['Nimrud', 'Nimrud (Kalhu)'], ['Nineveh', 'Nineveh']]}, p: [
        ['🏛️', 'Ashurnasirpal II (883–859 BCE): the first king of the Neo-Assyrian era to get to the Mediterranean. He shifted his palace from Assur to Nimrud (Kalhu).'],
        ['📈', 'Shalmaneser III (858–824 BCE): kept expanding and collected tribute from the “Land of the Arabs,” Israel and Damascus.'],
        ['📚', 'Ashurbanipal (668–631 BCE): known for his tablet collection, the “library,” at Nineveh.']]},
      {h: 'How Assyria ruled', p: [
        ['🗺️', 'Provinces were ruled directly, sometimes with population transfers.'],
        ['🤝', 'Clients (“vassals”) paid yearly taxes and sent envoys to the capital each year, but otherwise ran their own affairs.'],
        ['🛣️', 'Centuries of road building tied it together, including a royal relay system like a pony express.']],
        visual: {type: 'compare', left: {h: 'Provinces', items: ['Direct Assyrian rule', 'Population transfers']}, right: {h: 'Clients', items: ['Yearly tribute', 'Yearly envoys', 'Otherwise independent']}}},
      {h: 'Tribute and feasting at Kalhu', id: 'banquet', img: 'Nimrud', p: [
        ['🎁', 'Tribute had two forms: a tax paid in submission (often raw materials) and a ceremonial gift showing loyalty (often luxuries).'],
        ['🍷', 'Foreign envoys came every year for lavish parties, gifts and tours of the palace art.'],
        ['😮', 'The goal was awe, so that submitting became a habit.'],
        ['🪨', 'Ashurnasirpal’s Banquet Stele records the inauguration of his new palace at Kalhu in the mid-800s BCE.']]},
      {h: 'The throne room reliefs', id: 'reliefs', p: [
        ['🧑‍🤝‍🧑', 'Palace reliefs showed diverse foreigners bringing exotic animals, precious metals and unfamiliar clothing.'],
        ['🙏', 'Behind the throne, the king appears beside the god Assur. Local gods were imagined as serving Assur.'],
        ['🪞', 'Visitors could see their own people in the art, which made the empire feel universal and inclusive.']]},
      {h: 'Game: The Price Is Right (Bible edition)', p: [
        ['📖', 'The Jewish Bible (Tanakh in Hebrew, roughly the Christian Old Testament) was written in the ancient kingdoms of Israel and Judah, before Judaism and Christianity took shape. Many of its stories have parallels in the Qur’an.'],
        ['🧾', 'Oldest complete copy: the Leningrad Codex, 1044 CE.'],
        ['📜', 'Oldest copies of individual books: the Dead Sea Scrolls, about 200 BCE–100 CE.'],
        ['🔤', 'Earliest Hebrew writing: Kuntillet Ajrud, about 800 BCE. First mention of “Israel”: the Merneptah Stele, about 1200 BCE.']],
        visual: {type: 'timeline', events: [{y: -1200, t: '“Israel” first named'}, {y: -800, t: 'First Hebrew'}, {y: -200, t: 'Dead Sea Scrolls'}, {y: 1044, t: 'Leningrad Codex'}]}},
      {h: 'The Dead Sea Scrolls', id: 'dss', img: 'Dead Sea Scrolls', map: {pins: [['Qumran', 'Dead Sea caves']]}, p: [
        ['🏺', 'Found in 1947 in caves above the Dead Sea: about 15,000 writings from early Jewish groups, dated about 200 BCE–100 CE.'],
        ['📚', 'They include books later collected in the Bible, kept side by side with other religious writings and not treated as special.']]},
      {h: 'Kuntillet Ajrud and early Israel', p: [
        ['🛤️', 'A way station on a trade route, controlled by Israel during the Neo-Assyrian period, with the earliest Hebrew inscriptions (about 800 BCE).'],
        ['🔱', 'It shows Israel was not monotheistic then: inscriptions name gods including YHWH, Baal and El. YHWH was the patron god of Israel and Judah.'],
        ['🤐', 'The ban on saying the divine name came much later.']]},
      {h: 'How the Bible was formed', id: 'bible', p: [
        ['✍️', 'Texts that ended up in the Jewish Bible were written about 800–100 BCE, and one book can mix sources centuries apart. Isaiah covers events from about 730 to 530 BCE.'],
        ['📚', 'The canon was only settled in the common era, after a long process of choosing books.'],
        ['🔎', 'Scholars date passages by matching kings and events to archaeology and by tracking how Hebrew changed. Punctuation was only added around 1000 CE.']]},
      {h: 'New names in the 800s BCE', id: 'obelisk', img: 'Black Obelisk of Shalmaneser III', p: [
        ['🏛️', 'Assyrian records are early witnesses to three neighbors, all as clients: the kingdoms of Israel and Damascus and the “Land of the Arabs.”'],
        ['🗿', 'Shalmaneser III’s Black Obelisk (about 830 BCE) lists tribute from client states, including Israel’s king Jehu. It is the only ancient image of an Israelite king.'],
        ['🤝', 'Israel and Damascus acted together, rebelling and submitting as a bloc. Damascus became a province in 734 BCE and Israel in 720 BCE. Israel shared clothing and material culture with the Lebanese coast.']],
        map: {pins: [['Damascus', 'Damascus'], ['Samaria', 'Israel (Samaria)'], ['Nimrud', 'Kalhu']]}},
      {h: 'The “Land of the Arabs”', p: [
        ['📜', 'Shalmaneser III brags of taking 1,000 camels that belonged to Gindibu, from the “Land of the Arabs.”'],
        ['👑', 'In the 730s BCE, Samsi, Queen of the Arabs, brought camels, oxen and spices to Tiglath-pileser III.'],
        ['🧭', 'The term was flexible, tied to trade settlements, a source of camels and luxury goods, and often ruled by women.']]},
      {h: 'Not what we might expect', p: [
        ['🔄', 'Arab towns and tribes were often ruled by queens.'],
        ['🔱', 'Ancient Israel was not monotheistic.'],
        ['🤝', 'Arabs, Damascus and Israel were close allies against Assyria.']]},
      {h: 'From peak to fall', p: [
        ['🇸🇩', 'In the 600s BCE, the kings of Kush ruled Sudan and Egypt. Taharqa of Kush backed revolts against Assyria in the Levant.'],
        ['⚔️', 'Assyria defeated Kush’s 25th Dynasty, but a new Egyptian dynasty kept pressing from the south.'],
        ['🏚️', 'Around 610 BCE a Babylonian revolt ended the empire and founded the Neo-Babylonian Empire.']]}
    ],
    terms: [
      {t: 'Neo-Assyrian Empire', d: '~900–610 BCE. First state to rule from the Gulf to the Mediterranean.', src: 'roadmap'},
      {t: 'Assur', d: 'Patron god of Assyria and its old capital city (also spelled Ashur).', src: 'roadmap'},
      {t: 'Nimrud (Kalhu)', d: 'New Assyrian capital built by Ashurnasirpal II (883–859 BCE).', src: 'roadmap'},
      {t: 'Neo-Babylonian Empire', d: '~610–540 BCE. Founded by a Babylonian revolt against Assyria.', src: 'roadmap'},
      {t: 'Marduk', d: 'Patron god of Babylon.', src: 'roadmap'},
      {t: 'Tribute', d: 'Either a tax paid in submission (often raw materials) or a ceremonial gift showing loyalty (often luxury goods).', src: 'roadmap'},
      {t: 'Province vs. client', d: 'Provinces were ruled directly; clients paid yearly tribute and sent envoys but governed themselves.', src: 'slides'},
      {t: 'Tanakh', d: 'Hebrew name for the Jewish Bible, roughly the Christian Old Testament.', src: 'slides'},
      {t: 'YHWH', d: 'Patron god of ancient Israel and Judah, worshipped alongside other gods in the early first millennium BCE.', src: 'slides'}
    ],
    sources: [
      {name: 'Ashurnasirpal II’s Banquet Stele', when: 'Mid-800s BCE', where: 'Kalhu (Nimrud), Iraq', note: 'Records the feast inaugurating the new palace.'},
      {name: 'Throne room and courtyard reliefs of Ashurnasirpal II', when: 'Mid-800s BCE', where: 'Northwest Palace, Kalhu (Nimrud)', note: 'Tribute bearers and the king with Assur.'},
      {name: 'Black Obelisk of Shalmaneser III', when: '~830 BCE', where: 'Kalhu; British Museum 118885', note: 'Tribute from client states including Israel.'},
      {name: 'Dead Sea Scrolls', when: '~200 BCE–100 CE', where: 'Caves above the Dead Sea', note: 'Oldest copies of books later in the Bible.'}
    ]
  },

  9: {
    src: ['Class 9 slides (guest lecture)', 'Class 9 roadmap', 'Test 1 study guide'],
    summary: 'Nubia (Sudan) was not a periphery of Egypt but a center of its own. Kush rivaled Egypt, was conquered by it, then ruled it, and colonial archaeology long kept that story in the margins.',
    beats: [
      {h: 'Center and periphery', map: {pins: [['Kerma', 'Kerma'], ['Napata', 'Napata (Jebel Barkal)'], ['Meroe', 'Meroe'], ['Aswan', 'Aswan']]}, p: [
        ['🧭', 'The guiding question: why has Nubia been marginalized, and how did it shape Egypt, the Middle East and the Mediterranean?'],
        ['🛤️', 'Nubia sat on the Nile’s cataracts and on desert roads rich in resources like gold. The Forty Days’ Road ran camel caravans from Darfur to Cairo.']]},
      {h: 'Deep roots', p: [
        ['🌿', 'During the “Green Sahara” (about 8500–3000 BCE), shared roots formed for both Egypt and Nubia.'],
        ['⚖️', 'Around 3000 BCE, the A-Group of Lower Nubia rivaled early Egypt. An incense burner from Qustul is a Nubian object using Egyptian-style imagery.']]},
      {h: 'Early Kush at Kerma (2500–1500 BCE)', id: 'kerma', img: 'Kerma', p: [
        ['🏛️', 'Kerma was the capital of early Kush, with a huge structure called the Deffufa and large cemeteries.'],
        ['🐄', 'Elite tombs were round, with a ring of stones around the entry, and offerings of cattle skulls, food and drink left outside.'],
        ['🛡️', 'Egypt feared Kush: Middle Kingdom “execration” figures cursed it, and Senwosret III built fortresses like Buhen (about 1850 BCE).'],
        ['⚱️', 'Royal burial mounds around 1550 BCE reached 100 m across, with hundreds of human sacrifices and goods taken in raids on Egypt.']]},
      {h: 'Egypt conquers Kush (after 1550 BCE)', p: [
        ['⚔️', 'New Kingdom Egypt took over Nubia, building towns and temples, including at Sesebi and Soleb, and reaching Jebel Barkal.'],
        ['🖼️', 'Egypt’s top official for the region held the title “King’s Son of Kush.” A tomb painting of one, Huy, dates to Tutankhamun’s reign (about 1330 BCE).']]},
      {h: 'Kush returns and rules Egypt (750–664 BCE)', id: 'kush', p: [
        ['🏆', 'King Piankhy (Piye) recorded his conquest of Egypt on a victory stele around 720 BCE. Kushite kings ruled Egypt as the 25th Dynasty.'],
        ['⚰️', 'Royal tombs at El-Kurru (850–650 BCE) and the painted tomb of Tanwetamani blend Kushite and Egyptian styles.'],
        ['🐏', 'At Jebel Barkal, the sacred mountain of Napata, King Taharqo (690–664 BCE) rebuilt the temple of a ram-headed Amun.'],
        ['👑', 'Kandake was the title of the Queen of Kush.']],
        visual: {type: 'timeline', events: [{y: -2500, t: 'Kerma rises'}, {y: -1550, t: 'Egypt conquers'}, {y: -1100, t: 'Napata'}, {y: -720, t: 'Piye takes Egypt'}, {y: -300, t: 'Meroe'}]}},
      {h: 'Napata, Meroe and after', p: [
        ['🏔️', 'Napata, below the mountain Jebel Barkal, served as the early Kushite empire’s capital (1100–300 BCE).'],
        ['🔥', 'Meroe was capital from 300 BCE to 300 CE, a center of iron smelting with enough rain to settle away from the Nile.'],
        ['⛪', 'Later, Christian kingdoms ruled Nubia (about 500–1400 CE): Nobadia, Makuria and Alodia. Makuria adopted Christianity in the 500s and lasted until about 1365.']]},
      {h: 'Colonialism and archaeology', p: [
        ['🔍', 'Colonial-era fieldwork and interpretation shaped how Kush was understood and long kept it marginal.'],
        ['🛰️', 'An ongoing University of Michigan project maps ancient Napata at Jebel Barkal with magnetometry and conserves its temples.'],
        ['🏡', 'Community heritage work at El-Kurru (2022–2023) brings local communities into the archaeology.']]}
    ],
    terms: [
      {t: 'Kush', d: 'Kingdoms along the middle Nile, often rivals of Egypt, that controlled much of the valley from before 2000 BCE to about 300 CE.', src: 'roadmap'},
      {t: 'Napata', d: 'The early Kushite empire’s capital (1100–300 BCE), beside the sacred mountain Jebel Barkal.', src: 'roadmap'},
      {t: 'Meroe', d: 'Later capital of Kush (300 BCE–300 CE), known for smelting iron.', src: 'roadmap'},
      {t: 'Nubia', d: 'What the region was called in late antiquity and the Middle Ages.', src: 'roadmap'},
      {t: 'Makuria', d: 'Kingdom after Kush that adopted Christianity in the 500s CE and lasted to about 1365.', src: 'roadmap'},
      {t: 'Kerma', d: 'Capital of early Kush (2500–1500 BCE), known for its round elite tombs and the Deffufa temple.', src: 'slides'},
      {t: 'Kandake', d: 'Title of the Queen of Kush.', src: 'slides'},
      {t: 'Early and Middle Napatan Period', d: '~1100–650 BCE. Kush at its strongest, centered at Napata; it challenged Assyria in the southern Levant.', src: 'study guide'}
    ],
    sources: [
      {name: 'Kerma elite tomb', when: 'Classic Kerma, ~1600–1500 BCE', where: 'Kerma, Sudan', note: 'Round grave, stone ring, cattle-skull offerings.'},
      {name: 'Victory Stele of Piankhy (Piye)', when: '~720 BCE', where: 'From Jebel Barkal; now Cairo', note: 'Kushite king records conquering Egypt.'},
      {name: 'Royal tombs at El-Kurru', when: '850–650 BCE', where: 'El-Kurru, Sudan', note: 'Painted tombs mixing Kushite and Egyptian styles.'}
    ]
  },

  10: {
    src: ['Class 10 slides', 'Class 10 roadmap', 'Class 11 slides (Part 1)', 'Section 6 handout'],
    summary: 'The Achaemenid Persian Empire inherited Assyria’s tools: client states, roads, tribute and a display of diversity. Cyrus’s heroic image comes from his own propaganda, Greek writers and modern racial ideas.',
    beats: [
      {h: 'Part III: empire and religion', p: [
        ['🌐', 'Big empires rule diverse peoples and claim universal sovereignty.'],
        ['⚖️', 'The king represents divine will, restores justice and keeps order.'],
        ['🎁', 'Tribute is exchanged for protection, and “state religions” meet local beliefs.']]},
      {h: 'Assyria falls, Babylon rises', p: [
        ['🌍', 'Kush and Egypt pressed from the south, with a new front opening in the east in the late 600s BCE.'],
        ['🏛️', 'The Neo-Babylonian Empire (610–540 BCE) took over Assyria’s provinces, taxes and roads.'],
        ['⛓️', 'Judah became a province in 586 BCE, and elite Judeans were exiled to Babylon.']]},
      {h: 'The Achaemenid Empire', map: {pins: [['Pasargadae', 'Pasargadae'], ['Persepolis', 'Persepolis'], ['Babylon', 'Babylon'], ['Susa', 'Susa']]}, p: [
        ['👑', 'Cyrus “the Great” (559–530 BCE) founded it and conquered the Neo-Babylonian Empire in 539 BCE.'],
        ['🏗️', 'Darius I (522–486 BCE) consolidated it with provinces called satrapies and a new capital at Persepolis.'],
        ['⚔️', 'The Greco-Persian wars came under Xerxes I (486–465 BCE). Alexander conquered the empire in 330 BCE.'],
        ['🌍', 'It was the largest multiethnic, multilingual empire the region had yet seen, from Egypt and Anatolia to Khorasan and Transoxania.']],
        visual: {type: 'timeline', events: [{y: -559, t: 'Cyrus'}, {y: -539, t: 'Babylon taken'}, {y: -522, t: 'Darius I'}, {y: -486, t: 'Xerxes I'}, {y: -330, t: 'Alexander'}]}},
      {h: 'Myth: Cyrus the human-rights hero', myth: true, scene: {type: 'stamp', base: 'Cyrus Cylinder', bad: 'FIRST HUMAN RIGHTS', good: ['Royal propaganda', 'Marduk chose Cyrus', 'Local gods, universal king']}, p: [
        ['❌', 'Popular claims: Cyrus invented human rights, brought religious tolerance, liberated Babylon and was kinder than earlier kings.'],
        ['📣', 'The lecture’s point: Cyrus ran an effective publicity campaign, and modern readers believed it.'],
        ['🇮🇷', 'Both of Iran’s modern regimes have leaned on Cyrus to legitimize their rule: the Pahlavi dynasty (1925–1979) and, since 1979, the Islamic Republic.']]},
      {h: 'Why Assyria and Persia got different reputations', p: [
        ['🪓', 'Assyria is remembered as a brutal war machine. Persia is remembered as enlightened and tolerant.'],
        ['🧬', '19th-century scholars cast Assyrians as “Semitic” and Iranians as “Aryan.” Antisemitism once targeted Arabs and other Semitic speakers too.'],
        ['🔁', 'Seeing Assyria as uniquely violent supports the Orientalist idea of an always-violent Middle East. Egypt used beheading scenes in propaganda too.'],
        ['📚', 'Cyrus’s good image also comes from Xenophon’s idealized portrait (about 370 BCE) and the Book of Isaiah.']]},
      {h: 'The Cyrus Cylinder', id: 'cylinder', img: 'Cyrus Cylinder', p: [
        ['🏺', 'A clay cylinder from Babylon, early in Achaemenid rule (about 539 BCE), written in cuneiform.'],
        ['🙏', 'It says Marduk, Babylon’s own god, chose Cyrus to replace the last Babylonian king.'],
        ['🎭', 'It presents sending deported peoples home as mercy. In practice it was also a way to drain population from the old Babylonian capital region.'],
        ['🔑', 'Significance: empires used local religion to support their rule.']]},
      {h: 'Isaiah 44–45', id: 'isaiah', p: [
        ['📜', 'Passages addressed to Judean exiles in Babylonia name Cyrus directly.'],
        ['🕊️', 'They call Cyrus YHWH’s anointed (messiah) who took Babylon at YHWH’s request, echoing Cyrus’s own propaganda.'],
        ['☝️', 'Isaiah 45 adds that no other god chose him, an early statement of divine exclusivity close to monotheism.']],
        visual: {type: 'compare', left: {h: 'Cyrus Cylinder', items: ['Marduk chose Cyrus', 'Written for Babylon']}, right: {h: 'Isaiah 44–45', items: ['YHWH chose Cyrus', 'No other god involved', 'Written for Judean exiles']}}},
      {h: 'Takeaway: local gods, universal kings', p: [
        ['🌐', 'Empires used human diversity, including religion, to show the universal reach of their rule. Cyrus was not unique.'],
        ['🙌', 'Kings claimed the backing of local gods: Assur for Assyrian kings, Marduk for Hammurabi and Cyrus, YHWH in Judean responses to Cyrus.'],
        ['☝️', 'One form of monotheism grew in the context of empires claiming universal status.']]},
      {h: 'After Cyrus', p: [
        ['⚔️', 'Cyrus’s son Cambyses conquered Egypt. After a civil war, Darius, a provincial leader, took power, claiming a shared ancestor, Achaemenes, with Cyrus.'],
        ['🏛️', 'Darius built Persepolis and conquered Greek cities in Anatolia and Thrace. The Greco-Persian wars followed under Darius and Xerxes.'],
        ['🎬', 'Greek writers like Herodotus framed those wars as good against evil, a trope that runs into Orientalism and films like 300 (2006).']]},
      {h: 'Continuing the Assyrian model', p: [
        ['🧑‍⚖️', 'Local leaders governed under a royal representative, the satrap: an efficient way for a small elite to rule huge populations.'],
        ['🛣️', 'A royal road network with a relay system linked the provinces.'],
        ['🏛️', 'Persepolis served as a ceremonial capital showing universal kingship: unity in diversity.']]},
      {h: 'Persepolis', id: 'persepolis', img: 'Persepolis', p: [
        ['⛰️', 'Built on a raised artificial platform in Fars.'],
        ['🐂', 'The Gate of All Nations has winged bulls in the Assyrian style.'],
        ['🧑‍🤝‍🧑', 'The Apadana staircase shows delegations from across the empire bringing tribute, among them Lydians and Saka.'],
        ['🌳', 'Walled royal gardens, pārādīs, are the source of the word “paradise.”']]},
      {h: 'Ahura Mazda and Darius', p: [
        ['🪽', 'Ahura Mazda, “Lord Wisdom,” is called creator and greatest of gods. His winged-disk image resembles Assur’s in Assyrian art.'],
        ['🤫', 'Achaemenid inscriptions never mention the prophet Zoroaster, so scholars prefer “Mazda-worship.”'],
        ['🪨', 'At Behistun (Bisotun), Darius stands on his rival, with “lying” kings in chains, and claims rule by Ahura Mazda’s grace in three languages.'],
        ['📜', 'A buried trilingual inscription of Xerxes (the Daiva inscription) replaces festivals for “evil ones” with festivals for Ahura Mazda.']]},
      {h: 'What “empire” meant here', p: [
        ['🧩', 'A loose federation of self-governing lands under a distant Great King, the “King of Kings.”'],
        ['🔧', 'Plus active intervention from the center and slow cultural blending.'],
        ['➡️', 'These patterns carry into the Hellenistic kingdoms, Rome, the Parthians and the Sasanians.']]}
    ],
    terms: [
      {t: 'Achaemenid Empire', d: '~550–330 BCE (study guide: 530–330 BCE). Founded by Cyrus; the largest multiethnic empire in the region to that point.', src: 'roadmap'},
      {t: 'Cyrus “the Great”', d: 'Founder of the Achaemenid Empire (559–530 BCE); conquered Babylon in 539 BCE.', src: 'slides'},
      {t: 'Darius I', d: 'Achaemenid king (522–486 BCE) who organized satrapies and built Persepolis.', src: 'slides'},
      {t: 'Satrap / satrapy', d: 'Royal representative overseeing a province (satrapy) where local leaders still governed.', src: 'slides'},
      {t: 'Ahura Mazda', d: '“Lord Wisdom,” chief god of the Achaemenid kings, called creator and greatest of gods.', src: 'roadmap'},
      {t: 'Aramaic', d: 'A relative of Hebrew, Arabic and Akkadian that began in Greater Syria and later became the language of government for Assyria, Babylon and Persia.', src: 'roadmap'},
      {t: 'Hebrew Bible', d: 'The texts gathered from ancient Israel and Judah that make up the Jewish Bible (Tanakh), roughly the Christian Old Testament.', src: 'roadmap'},
      {t: 'King of Kings', d: 'Title of the Great King over many autonomous lands, used by the Achaemenids and later Iranian dynasties.', src: 'slides'},
      {t: 'Pārādīs', d: 'Walled royal garden in the Achaemenid world, origin of the word “paradise.”', src: 'slides'}
    ],
    sources: [
      {name: 'Cyrus Cylinder', when: '~539 BCE', where: 'Babylon; British Museum', note: 'Cyrus presented as Marduk’s chosen king.'},
      {name: 'Isaiah 44:24–45:5', when: 'Late 6th century BCE', where: 'Written for Judean exiles in Babylonia', note: 'Cyrus as YHWH’s anointed.'},
      {name: 'Persepolis (Getty “Persepolis Reimagined” tour)', when: 'From ~500 BCE', where: 'Fars, Iran', note: 'Ceremonial capital with tribute reliefs.'},
      {name: 'Behistun (Bisotun) relief and inscription', when: 'Reign of Darius I', where: 'Kermanshah, Iran', note: 'Darius’s claim to rule by Ahura Mazda’s grace.'}
    ]
  },

  11: {
    src: ['Class 11 slides', 'Class 11 roadmap', 'Section 6 handout'],
    summary: 'Alexander mostly kept the Achaemenid system, and Hellenism became a shared cultural language that local people adapted. In Roman Palestine, the Jesus movement grew out of Judaism and only slowly became something separate.',
    beats: [
      {h: 'Alexander: the legend', p: [
        ['🌟', 'Europe and America call him “the Great.” Middle Persian texts call him “the accursed” (gujastak).'],
        ['📚', 'We know less about him than about Cyrus or Ashurnasirpal, but the fictional Alexander Romance is one of the most widespread stories in world history, told in Greek, Armenian, Arabic, Persian, Turkish, Hebrew and many more languages.'],
        ['🐏', 'Shown with ram’s horns to claim descent from the Egyptian god Amun. The Qur’an mentions a figure called “He of the Two Horns” (Dhu’l-Qarnayn).'],
        ['🧱', 'Legends have him build a wall against Gog and Magog and meet the holy figure al-Khidr.']]},
      {h: 'Alexander: the history', id: 'alexander', img: 'Alexander Mosaic', p: [
        ['👶', 'Macedonian prince, born 356 BCE. Inherited his father’s kingdom in 336.'],
        ['⚔️', 'Invaded the Achaemenid Empire in 334 and reached India within a decade.'],
        ['⚰️', 'Died in 323 BCE.']],
        visual: {type: 'timeline', events: [{y: -356, t: 'Born'}, {y: -336, t: 'King'}, {y: -334, t: 'Invades Persia'}, {y: -330, t: 'Achaemenids fall'}, {y: -323, t: 'Dies'}]}},
      {h: 'Break or continuity? Both', p: [
        ['🗺️', 'His empire was basically the Achaemenid Empire.'],
        ['🧑‍💼', 'He kept the satrapies and Achaemenid officials, but burned Persepolis.'],
        ['🛡️', 'He brought Iranian troops into his army and had them drilled in the Greek and Macedonian style.'],
        ['💍', 'He married into the Iranian nobility, in a Macedonian ceremony.']]},
      {h: 'Garrison towns spread Greek culture', map: {pins: [['Alexandria', 'Alexandria'], ['Merv', 'Merv'], ['Herat', 'Herat'], ['Kandahar', 'Kandahar'], ['Khujand', 'Khujand']]}, p: [
        ['🏙️', 'He founded new cities and garrison towns from Egypt to Central Asia.'],
        ['🪙', 'Greek coins became common currency, and soldiers settled and married locally.'],
        ['🎭', 'Artisans and merchants moved around, and ruling elites (Greek or not) adopted Greek-looking clothes, art and performance.']]},
      {h: 'The Hellenistic kingdoms', p: [
        ['🧩', 'After 323 BCE his generals split the empire: Antigonids in Macedonia and Greece (to 168 BCE), Seleucids in Syria, Iraq and Iran (to 64 BCE), Ptolemies in Egypt (to 31 BCE).'],
        ['🗣️', 'Each ruled in several registers at once: Greek kings in the Mediterranean, Great Kings in Asia, local kings at home.'],
        ['📝', 'The study guide lets you use “Seleucid” and “Hellenistic Kingdoms” (330–30 BCE) interchangeably.']]},
      {h: 'Herakles-Bahram at Seleucia', id: 'herakles', map: {pins: [['Seleucia', 'Seleucia-on-the-Tigris']]}, p: [
        ['🗿', 'A statue of Herakles from Seleucia-on-the-Tigris carries inscriptions in Greek and Parthian. It is in the Iraq Museum (IM 100178).'],
        ['💪', 'Herakles, a Greek hero of strength and victory, matches Verethraghna or Bahram in Iranian tradition and Indra in Vedic tradition.'],
        ['🛕', 'Its size fits a local temple, and its eyes were inlaid with ivory.'],
        ['🔑', 'It is not simply “Greek”: it is a new, local way of representing a god.']]},
      {h: 'What Hellenism means', id: 'hellenism', p: [
        ['🌐', 'Hellenism is not about coming from Greece. It is taking part in a shared set of Greek-associated art, ideas and culture, adapted for local purposes.'],
        ['🧘', 'Examples: Buddhist art in Hellenistic style, a Herakles carved at Bisotun, a Greek theater in Babylon and the Fayyum mummy portraits in Egypt.'],
        ['↔️', 'It breaks the neat East/West binary.']]},
      {h: 'From Judah to Judaism', id: 'judaism', p: [
        ['🏛️', 'Assyria made Israel a province in 720 BCE. Babylon conquered Judah in 586 BCE.'],
        ['🗺️', 'The provinces of Samaria and Judea came under Hellenistic rule from the 300s BCE and Roman rule from the first century BCE (Roman Palestine).'],
        ['🔄', 'Judaism today centers the Hebrew Bible, is monotheistic and has no animal sacrifice. In Judea before 70 CE, the canon was still open, multiple gods were worshipped and sacrifice continued.'],
        ['🌈', 'Think of it as diverse practice, with poly- and monotheism on a spectrum.']],
        visual: {type: 'compare', left: {h: 'Judaism today', items: ['Hebrew Bible (Torah) at the center', 'Monotheistic', 'No animal sacrifice']}, right: {h: 'Judea before 70 CE', items: ['Canon not fixed', 'Several gods worshipped', 'Animal sacrifice']}}},
      {h: 'Roman Judea and messiahs', p: [
        ['🦅', 'Rome conquered Judea around 60 BCE. Its client king Herod renovated the temple of YHWH.'],
        ['🔥', 'People debated whether to submit to Rome or rebel, and many leaders claimed to be God’s anointed (messiah) who would throw off Rome.']]},
      {h: 'Jesus of Nazareth', p: [
        ['✝️', 'Jesus (Yeshu) was one of several Jewish prophets promising freedom from Rome.'],
        ['📜', 'The Roman historian Josephus reports he was convicted of anti-Roman sedition and executed. His followers believed he rose from the dead.'],
        ['⏳', 'Paul’s letters show followers expecting Jesus to return within their lifetimes to free Judea.']]},
      {h: 'Paul and the Letter to the Galatians', id: 'galatians', p: [
        ['🧑', 'Paul joined the movement after Jesus’s death.'],
        ['⚖️', 'The first followers in Jerusalem saw Jesus as a Jewish prophet and expected new followers to be circumcised and keep dietary laws.'],
        ['🚪', 'Paul argued that non-Jews could join without becoming Jewish.'],
        ['〽️', 'A copy of Galatians from about 200 CE (Papyrus 46) is split between the University of Michigan and Dublin.']]},
      {h: '70 CE: the turning point', img: 'Arch of Titus', p: [
        ['🔥', 'Rome sacked Jerusalem in 70 CE and despoiled the temple, as shown on the Arch of Titus.'],
        ['🌬️', 'Institutions were destroyed and Jesus’s earliest Jewish followers vanish from the record.'],
        ['🔀', 'The surviving Jesus community began to see itself as separate from Judaism.']]},
      {h: 'From movement to imperial religion', id: 'christianity', p: [
        ['👑', 'Christianity stayed a minority religion in the Roman Empire until Emperor Constantine converted around 300 CE and founded Constantinople.'],
        ['☝️', 'Worshipping one god appeared many times (remember Akhenaten). Empire’s universalism may make it appealing.'],
        ['⚖️', 'Monotheism can challenge empire (Isaiah 44–45) or reinforce it (Constantine).']]}
    ],
    terms: [
      {t: 'Alexander', d: 'Macedonian king (356–323 BCE) who overthrew the Achaemenids and largely kept their system. His empire split into the Hellenistic kingdoms.', src: 'roadmap'},
      {t: 'Hellenistic Kingdoms', d: '330–30 BCE. Antigonids, Seleucids (Syria, Iraq, Iran) and Ptolemies (Egypt).', src: 'roadmap'},
      {t: 'Roman Empire', d: 'Mediterranean power (~60 BCE–400 CE in the roadmap) that absorbed the western Hellenistic kingdoms between 168 and 30 BCE.', src: 'roadmap'},
      {t: 'Parthian (Arsacid) Empire', d: '~250 BCE–225 CE. From Khorasan; ruled Iran and Iraq and rivaled Rome.', src: 'roadmap'},
      {t: 'Hellenism', d: 'Greek-associated art and ideas used as a prestigious shared “cultural matrix” that local cultures adapted for their own purposes.', src: 'roadmap'},
      {t: 'Judaism (turn of the era)', d: 'The diverse religious practices of Roman Palestine and nearby, including emerging monotheism but also animal sacrifice.', src: 'roadmap'},
      {t: 'Jesus (Yeshu) of Nazareth', d: 'Jewish resident of Roman Palestine (d. ~30 CE), likely executed for anti-Roman sedition; followers called him messiah.', src: 'roadmap'},
      {t: 'Paul', d: 'Early Jewish follower of Jesus (d. before 70 CE) who argued for including non-Jews; author of Galatians.', src: 'roadmap'},
      {t: 'Messiah', ar: 'מָשִׁיחַ', tr: 'mashiaḥ', d: '“Anointed one”: a divinely chosen leader. Used of Cyrus in Isaiah and of Jesus by his followers.', src: 'slides'},
      {t: 'Dhu’l-Qarnayn', ar: 'ذو القرنين', tr: 'dhū l-qarnayn', d: '“He of the Two Horns,” a figure in the Qur’an linked with legends of Alexander.', src: 'slides'}
    ],
    sources: [
      {name: 'Statue of Herakles-Verethraghna (Bahram)', when: 'Parthian period', where: 'Seleucia-on-the-Tigris; Iraq Museum IM 100178', note: 'Bilingual Greek-Parthian inscriptions; a local Hellenism.'},
      {name: 'Paul’s Letter to the Galatians', when: 'Before 70 CE (copy ~200 CE, Papyrus 46)', where: 'Letter of Paul; an early copy is split between UM and Dublin', note: 'Argues non-Jews need not become Jewish to follow Jesus.'},
      {name: 'Seleucia-on-the-Tigris (Kelsey Museum)', when: 'Hellenistic and Parthian periods', where: 'Near Baghdad; finds at UM’s Kelsey Museum', note: 'Site of the class field trip.'}
    ]
  },

  12: {
    src: ['Class 12 slides', 'Class 12 roadmap'],
    summary: 'For 800 years the region was split between Greco-Roman and Iranian empires. The Sasanians backed Zoroastrianism as an imperial religion, much as Rome backed Christianity, while daily religious life stayed mixed and overlapping.',
    beats: [
      {h: 'Big trends, 250 BCE–650 CE', p: [
        ['⚖️', 'For about 800 years the region was split between Iranian and Greco-Roman states, with Armenia caught in the middle.'],
        ['📉', 'Cuneiform culture faded. The last known cuneiform text is an astronomical record from 75 CE. Aramaic, Greek and Middle Persian took over.'],
        ['🙏', 'Imperial religions rose, along with challengers like the prophet Mani. Pieces of Babylonian religion lived on in later traditions.']]},
      {h: 'Rome rises in the west', p: [
        ['🦅', 'Rome swallowed the Hellenistic kingdoms: Antigonids (168 BCE), Seleucids (64 BCE) and Ptolemies (31 BCE).'],
        ['🏛️', 'Helleno-Roman monuments include the Temple of Bacchus at Baalbek, the Temple of Bel at Palmyra and the theater at Bosra.']]},
      {h: 'The Parthians in the east', map: {pins: [['Hatra', 'Hatra'], ['Ctesiphon', 'Ctesiphon'], ['Merv', 'Khorasan']]}, p: [
        ['🐎', 'A mobile Iranian people from Transoxania who united under Arsaces I (d. 247 BCE), took Parthia from the Seleucids and built a large empire by 129 BCE.'],
        ['💰', 'They grew rich on trade between Han China and Rome, with caravanserais and circular fortress cities.'],
        ['🏹', 'Their all-cavalry armies used the “Parthian shot,” firing backward while riding away.'],
        ['🕌', 'At the caravan city of Hatra, temples mixed Greek, Assyrian, Aramaic and Arabian gods. Its arched hall, the iwan, carries into later Persianate Islamic architecture.']]},
      {h: 'Parthia beats Rome', p: [
        ['⚔️', 'In 53 BCE the Parthian king Orodes defeated the Roman general Crassus. Parthia and Armenia had long ties and both resisted Rome.'],
        ['🎭', 'Plutarch tells how Crassus’s head arrived during a Greek tragedy performed at court, a sign of how at home Greek culture was there.'],
        ['🪙', 'Parthian coins called the king a “lover of Greek things” and also used the old Achaemenid title King of Kings.']]},
      {h: 'The Sasanians', map: {pins: [['Ctesiphon', 'Ctesiphon (capital)'], ['Firuzabad', 'Firuzabad'], ['Naqsh-e Rostam', 'Naqsh-e Rostam']]}, p: [
        ['👑', 'Ardashir I founded the dynasty in 224 CE by overthrowing the last Parthian king, Ardavan.'],
        ['🏛️', 'The capital was Ctesiphon, near modern Baghdad. Power swung between strong central rule and looser confederation.'],
        ['🔥', 'They backed Zoroastrian institutions but were fairly hands-off with locals, and large Jewish and Christian communities lived in the empire.']]},
      {h: 'From Mazda-worship to Zoroastrianism', p: [
        ['🌀', 'Mazda-worship, often alongside other gods and in many local forms, goes back to the Achaemenids.'],
        ['⛪', 'A formal Zoroastrianism with developed theology, clergy and institutions, like a “church,” took shape under the Sasanians.'],
        ['🏷️', '“Zoroastrianism” is an outsider’s name, built like Christ to Christianity, now widely accepted. Insiders say Mazdāyasnā (Mazda worship) or Beh-dīn (the Good Religion).']]},
      {h: 'Core ideas', id: 'zoro', p: [
        ['☀️', 'Ahura Mazda (Ohrmazd), the “Wise Lord”: light, justice, life and truth.'],
        ['🌑', 'Angra Mainyu (Ahriman), the “Destructive Spirit”: darkness, death, injustice and the lie. This dualism explains evil.'],
        ['📖', 'Zoroaster (Zarathustra) is the legendary, hard-to-date founder. The Avesta, the sacred texts, was oral and only written down late in the Sasanian period. Priests are called magi.'],
        ['🔥', 'Fire symbolizes light, life and purity. Nowruz, the spring equinox, celebrates life over death. Divine glory shown as light later became the halo in Christian and Islamic art.']]},
      {h: 'Ideas with a long reach', p: [
        ['🌱', 'Creation: Ohrmazd makes perfection, Ahriman spoils it with disease, disorder and death.'],
        ['🧭', 'Free will: everyone chooses good or evil and is held accountable.'],
        ['⚖️', 'Resurrection and judgment: a savior (Saoshyant) born of a virgin from Zoroaster’s line will raise the dead for judgment.']]},
      {h: 'Account of the Deeds of Ardashir', id: 'karnamag', p: [
        ['📜', 'A story of the dynasty’s founder written by Zoroastrian priests in the late Sasanian period (about the 500s CE), looking back on its origins.'],
        ['😴', 'After Alexander, Iran is split among 240 petty rulers. Papag, lord of Pars, dreams about his shepherd Sasan, said to descend from Darius: the sun shines from his head, he rides a white elephant and three sacred fires burn in his house.'],
        ['🔥', 'The three fires stand for the priests, the warriors and the farmers: the whole social order backing Sasan’s line.'],
        ['🔑', 'It ties Sasanian rule to the Achaemenids, divine favor and Zoroastrian order.']]},
      {h: 'The Investiture of Ardashir I', id: 'investiture', img: 'Naqsh-e Rostam', p: [
        ['🐎', 'At Naqsh-e Rostam, beside the Achaemenid royal tombs, Ahura Mazda hands Ardashir the ring of kingship. Both ride horses.'],
        ['🦶', 'Under the god’s horse lies Ahriman, and under Ardashir’s lies the defeated Parthian king Ardavan.'],
        ['🪞', 'Heaven and earth mirror each other: the king both submits to and receives a divine charge, acting as the earthly face of divine will.'],
        ['🗣️', 'Inscriptions are in Parthian, Middle Persian and Greek.']]},
      {h: 'Imperial religion on both sides', p: [
        ['✝️', 'Constantine I (ruled 306–337) converted to Christianity and moved the capital to Constantinople. By 380 Christianity was the empire’s official religion.'],
        ['🪙', 'Coins made the contrast public: a cross on Roman coins, a fire altar on Sasanian ones.']]},
      {h: 'The Roman-Sasanian rivalry', p: [
        ['🥊', 'Key matchups: Shapur I vs. Valerian (mid-200s), Shapur II vs. Constantine (early 300s), Khosrow I vs. Justinian (mid-500s), Khosrow II vs. Heraclius (early 600s).'],
        ['🏆', 'Shapur I defeated three Roman emperors, and reliefs show emperors submitting after the Battle of Edessa (260 CE).'],
        ['🌍', 'The prophet Mani, at Shapur’s court, reworked Zoroastrian ideas into a soul/matter dualism that spread across Afro-Eurasia.'],
        ['🤝', 'Both empires stressed religious difference in propaganda, but the differences were not so stark in practice.']],
        visual: {type: 'timeline', events: [{y: 224, t: 'Ardashir'}, {y: 260, t: 'Edessa'}, {y: 330, t: 'Constantinople'}, {y: 380, t: 'Christianity official'}, {y: 628, t: 'Khosrow II dies'}, {y: 651, t: 'Sasanians end'}]}},
      {h: 'Religion was open and overlapping', p: [
        ['🌐', 'Today we tend to see religion as either/or. In late antiquity, traditions overlapped and borrowed.'],
        ['🔮', 'Gnostic traditions stressed hidden knowledge and strong dualism, and survive today in the Mandaean religion, which practices baptism.'],
        ['✡️', 'Jews had lived in Mesopotamia since the 500s BCE and produced the Babylonian Talmud in Hebrew and Aramaic.'],
        ['⛪', 'Syriac-speaking churches stretched from Antioch to Ctesiphon and Iran, and argued with Rome over the nature of Christ.']]},
      {h: 'Magic (incantation) bowls', id: 'bowls_magic', img: 'Incantation bowl', p: [
        ['🥣', 'Common in Mesopotamia in the 500s–700s CE and buried in doorways.'],
        ['👹', 'Their spells protected households from demons.'],
        ['🔀', 'They cut across every tradition, mixing Mesopotamian, Jewish, Christian, Mandaean, Manichaean and Zoroastrian elements, written in Aramaic, Syriac, Mandaic or Pahlavi scripts.']]},
      {h: 'Legacy', p: [
        ['🏛️', 'Zoroastrianism became an institutional, universal religion, in conversation with Manichaeism, Judaism, Christianity and soon Islam.'],
        ['➡️', 'The Islamic period inherited Sasanian ideas about rule, along with its literature, art, architecture and city planning.']]}
    ],
    terms: [
      {t: 'Late Antiquity', d: 'Convenient label for roughly 250–750 CE (the study guide stretches it from the early CE to 850).', src: 'roadmap'},
      {t: 'Sasanian Empire', d: '224–651 CE (study guide: 225–650). Centralized Iranian empire with its capital at Ctesiphon.', src: 'roadmap'},
      {t: 'Zoroastrianism', ar: 'مزدیسنا', tr: 'mazdāyasnā', d: 'Mazda-worship or the “Good Religion,” founded on the prophet Zarathustra. Dualist, with priests called magi. Official religion of the Sasanians.', src: 'roadmap'},
      {t: 'Ahura Mazda / Ohrmazd', d: 'The “Wise Lord,” force of light, justice, life and truth.', src: 'slides'},
      {t: 'Angra Mainyu / Ahriman', d: 'The “Destructive Spirit,” force of darkness, death and the lie.', src: 'slides'},
      {t: 'Avesta', d: 'Zoroastrian sacred texts, written down in the 500s CE after a long oral tradition.', src: 'roadmap'},
      {t: 'Bundahishn', d: 'Zoroastrian account of creation written in the 800s CE.', src: 'roadmap'},
      {t: 'Babylonian Talmud', d: 'Jewish collection of commentary, law and theology in Hebrew and Aramaic, compiled 500s–700s CE.', src: 'roadmap'},
      {t: 'Gnostic', d: 'Religious practice that values personal experience and hidden inner meaning, found in Christian, Jewish, Mandaean and Manichaean traditions.', src: 'roadmap'},
      {t: 'Nestorian Christianity', d: 'A major theological school tied to the Chaldean and Assyrian churches, named for Nestorius (d. 431).', src: 'roadmap'},
      {t: 'Nowruz', ar: 'نوروز', tr: 'nowruz', d: 'New Year at the spring equinox, celebrating life’s triumph over death.', src: 'slides'},
      {t: 'Iwan', ar: 'ایوان', tr: 'eyvān', d: 'An arched, open-fronted hall seen at Parthian Hatra that persists in Persianate Islamic architecture.', src: 'slides'},
      {t: 'Parthian shot', d: 'Mounted archers shooting backward while riding away.', src: 'slides'}
    ],
    sources: [
      {name: 'Account of the Deeds of Ardashir (Kārnāmag ī Ardashīr)', when: 'Late Sasanian, ~500s CE', where: 'Iran', note: 'Priestly origin story of the dynasty.'},
      {name: '“Investiture of Ardashir I”', when: 'Early Sasanian, reign of Ardashir I', where: 'Naqsh-e Rostam, near Persepolis', note: 'Ahura Mazda gives Ardashir the ring of kingship.'},
      {name: 'Magic (incantation) bowls', when: '500s–700s CE', where: 'Mesopotamia (Nippur, Ctesiphon)', note: 'Protective spells mixing many religious traditions.'}
    ]
  }
};
