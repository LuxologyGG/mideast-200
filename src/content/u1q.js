// Unit 1 practice questions, written from the slides, roadmaps and study guide. hard:true marks the harder ones.
const tf = (id, cls, prompt, answer, why, hard) => ({id, cls, type: 'tf', prompt, answer, why, ...(hard ? {hard: true} : {})});
const mc = (id, cls, prompt, options, answer, why, hard) => ({id, cls, type: 'mc', prompt, options, answer, why, ...(hard ? {hard: true} : {})});

export const U1Q = [
  // Class 1
  tf('a1a', 1, 'Experts and governments have always agreed on which countries make up the Middle East.', false, 'Maps from 1902 to 2005 drew the region very differently.'),
  mc('a1b', 1, 'In this class, the definition of “Middle East” is best described as:', ['A fixed list of countries', 'A heuristic that changes with the period and the question', 'The Arabic-speaking world', 'The lands of the Ottoman Empire'], 1, 'The class uses the term as a working tool, not a fact.'),
  tf('a1c', 1, 'Middle East Studies treats the region as always defined relative to somewhere else, usually Europe or “the West.”', true, 'That relational definition is one of its core ideas.'),
  mc('b1a', 1, 'The 1948 US State Department map defined the “Near East” mainly by language. Which area did it still leave out?', ['North Africa', 'Iran', 'Turkey', 'Greece'], 0, 'It used Arabic as a criterion yet dropped Arabic-speaking North Africa.', true),
  mc('b1b', 1, 'Chirol’s 1903 map drew the “Middle East” around:', ['The Arabic-speaking lands', 'The land bridge between Iraq and British India', 'Ottoman provinces', 'Muslim-majority countries'], 1, 'A geopolitical lens, not a linguistic one.', true),

  // Class 2
  mc('a2a', 2, 'The term “Middle East” was coined:', ['In ancient Babylon', 'In the late 1800s for European colonial interests', 'By the UN in 1947', 'By medieval Arab geographers'], 1, 'It is a geopolitical label from the colonial era.'),
  tf('a2b', 2, 'A map is a neutral, objective picture of space.', false, 'Maps are selective and make claims.'),
  mc('a2c', 2, 'Which is a proposed modern alternative to “Middle East”?', ['Hither Asia', 'SWANA', 'The Orient', 'The Near Orient'], 1, 'SWANA, MENA and West Asia are modern alternatives. Hither Asia and the Orient are older labels.'),
  tf('a2d', 2, 'Many medieval Islamic maps put south at the top.', true, 'Routes and travel mattered more than modern-style orientation.'),
  mc('a2e', 2, 'What does the Mercator projection distort, as discussed in class?', ['It enlarges Africa', 'It shrinks Africa', 'It removes Asia', 'It puts south on top'], 1, 'Hobo-Dyer keeps relative land area instead.'),
  mc('b2a', 2, 'What is Antrim’s point about colonial-era maps of the region?', ['They invented the region from nothing', 'They reinforced colonialism and hid older ways of imagining connection, even though the region had mapped itself for centuries', 'They were more accurate than earlier maps', 'They should never be used'], 1, 'Her critique is about what they reinforce and obscure.', true),
  mc('b2b', 2, 'The Babylonian Map of the World (~750 BCE) resembles which later world schemes?', ['Mercator and Hobo-Dyer', 'Zoroastrian and biblical conceptual maps', 'The 1947 UN map', 'Ottoman provincial maps'], 1, 'All center a sacred place inside an encircling sea or boundary.', true),
  tf('b2c', 2, 'Epistemic violence means destroying archives during a war.', false, 'It means marginalizing or silencing other ways of knowing.', true),

  // Class 3
  tf('a3a', 3, 'Race is a biological category, while ethnicity is about culture, such as food or language.', false, 'Race is also a social construct. This exact example is on the Test 1 study guide.'),
  mc('a3b', 3, 'In this class, race is defined as:', ['A biological category based on genes', 'A hierarchical social grouping that justifies domination, built on essentialized difference', 'Another word for nationality', 'A grouping based only on language'], 1, 'From the Class 3 roadmap.'),
  mc('a3c', 3, 'What is a “racial hinge”?', ['A group at the edge of whiteness used to open or close the door to whiteness', 'A law banning racial categories', 'A gene linked to skin color', 'A census checkbox'], 0, 'Iranians played this role in several US court cases.'),
  tf('a3d', 3, 'Genetic variation within imagined racial groups is greater than the variation between them.', true, 'Sorting by phenotype does not track genetics.'),
  mc('a3e', 3, 'Since 1978, the US government has officially classified people from the Middle East and North Africa as:', ['Asian', 'White', 'A separate MENA race', 'Non-white'], 1, 'Despite widespread discrimination, which creates a “racial loophole.”'),
  mc('b3a', 3, 'In US v. Thind (1923), the claim to whiteness through the “Aryan” myth was:', ['Accepted, so Thind was ruled white', 'Rejected: the court set aside shared ancestry and ruled on “common understanding”', 'Never ruled on', 'Settled by the 1978 census rule'], 1, 'The class reads it as the loophole at work: technically white, socially brown.', true),
  mc('b3b', 3, 'In re Halladjian (1909) ruled Armenians white partly by:', ['Pointing only to their language', 'Stressing their Christianity and opposition to Persia, which cast Iranians and Muslims as not white', 'Measuring skull shapes', 'Citing the census'], 1, 'Iran served as the “hinge” for another group’s whiteness.', true),
  tf('b3c', 3, 'The MENA plaintiffs in these court cases tried to dismantle racial classification itself.', false, 'They argued to be classed white, leaving the myth of whiteness intact.', true),

  // Class 4
  tf('a4a', 4, 'Agriculture led quickly and naturally to the state.', false, 'Domestication was slow, and states were neither normal nor inevitable.'),
  mc('a4b', 4, 'Çatalhöyük (about 9000–7400 BCE) is notable because it:', ['Had a palace and ziggurat', 'Was a large settlement with no streets, squares or monuments and little sign of inequality', 'Was the capital of Sumer', 'Invented cuneiform'], 1, 'People entered houses from the roof and could join or leave.'),
  mc('a4c', 4, 'Why did grain matter so much for early states, according to Scott?', ['It tasted better', 'It was easy to see, measure, tax, store and ration', 'It needed no labor', 'It grew only in Egypt'], 1, 'Early states, writing, grain and taxation grew together.'),
  tf('a4d', 4, 'Beveled-rim bowls were mass-produced, disposable vessels that spread in the Uruk Period.', true, 'Their exact purpose is still debated.'),
  mc('a4e', 4, 'The earliest writing at Uruk (about 3200 BCE) was mainly used for:', ['Poetry', 'Accounting and administration', 'Royal law codes', 'Letters to the gods'], 1, 'Pictographs for goods and dots for numbers.'),
  mc('a4f', 4, 'A bulla is:', ['A clay envelope holding counting tokens', 'A type of wheat', 'A temple tower', 'A reed stylus'], 0, 'Sealed with a cylinder seal for a tamper-proof record.'),
  mc('b4a', 4, 'What is wrong with the label “Fertile Crescent”?', ['It is too recent', 'It merges states with agriculture and leaves out Egypt and Sudan; early domestication happened in Anatolia, the Zagros and the Iranian plateau', 'It describes only Egypt', 'Nothing, it is accurate'], 1, 'Coined in 1916 by James Henry Breasted.', true),
  mc('b4b', 4, 'If farming raised infant mortality, why did farming populations still grow?', ['They imported people', 'Earlier weaning with grain foods allowed more births', 'Disease disappeared', 'States paid families'], 1, 'The “agricultural paradox.”', true),
  mc('b4c', 4, 'Which order matches how writing developed at Uruk?', ['Linguistic cuneiform, then accounting tablets, then tokens', 'Tokens, then bullae, then accounting tablets (~3250 BCE), then linguistic writing (~2800 BCE)', 'Alphabet, then cuneiform, then hieroglyphs', 'Bullae, then tokens, then poetry'], 1, 'Writing grew out of administration.', true),
  tf('b4d', 4, 'The first writing at Uruk recorded the sounds of the Sumerian language.', false, 'It was non-linguistic at first: pictures and numbers, not speech.', true),

  // Class 5
  mc('a5a', 5, 'Mesopotamians drew their main social line between:', ['Sumerian and Akkadian speakers', 'Settled and mobile people', 'Light and dark skin', 'Christians and pagans'], 1, 'Lifestyle, not phenotype or language.'),
  tf('a5b', 5, 'Mesopotamian society was bilingual, using Sumerian and Akkadian.', true, 'Both languages were used side by side.'),
  mc('a5c', 5, '“Amorite” (Akkadian amurru, Sumerian martu) originally meant:', ['A specific ethnic nation', '“Westerner,” an outsiders’ label', 'A Babylonian king', 'A type of tablet'], 1, 'An exonym, sometimes even used for people from the east.'),
  tf('a5d', 5, '19th-century scholars assumed that language equals race.', true, 'That assumption created the “Sumerian Problem.”'),
  mc('a5e', 5, 'The “Land of the Black-Headed People” referred to:', ['Only Sumerian speakers', 'Mesopotamians, including speakers of both languages', 'Nubians', 'The Amorites'], 1, 'It shows they did not divide themselves by language.'),
  mc('b5a', 5, 'Why did deciphering Akkadian unsettle 19th-century Europeans?', ['It disproved the Bible', 'As a Semitic language far older than Greek, it challenged the idea that civilization began with Europe’s Greek ancestors', 'It had no relatives', 'It proved Sumerians were Aryan'], 1, 'Race was then built partly through language and religion.', true),
  mc('b5b', 5, 'How do the insults in The Marriage of Martu compare with modern racialization?', ['They are unrelated', 'Different criteria (lifestyle, not phenotype or language) but similar kinds of stereotypes: food, religion, animal-like behavior', 'Identical, both based on skin color', 'Both based on language'], 1, 'The class’s main takeaway for Class 5.', true),
  tf('b5c', 5, 'The “Sumerian Problem” was a debate among ancient Mesopotamians about who was truly Sumerian.', false, 'It was a 19th-century scholarly invention.', true),

  // Class 6
  tf('a6a', 6, 'Hammurabi wrote the first law code ever.', false, 'Ur-Namma’s collection (~2100 BCE) is older, and the stele was not applied law. This myth is named on the Test 1 study guide.'),
  mc('a6b', 6, 'Orientalism is best defined as:', ['The study of Asian languages', 'Stereotypes and assumptions about Asia and the Middle East that mirror and strengthen unequal power', 'A style of carpet design', 'A neutral academic field'], 1, 'From the Class 6 roadmap.'),
  mc('a6c', 6, 'Who gave “Orientalism” its critical meaning?', ['Herodotus', 'Edward Said', 'James Scott', 'Zainab Bahrani'], 1, 'In his 1978 book.'),
  tf('a6d', 6, 'No surviving Mesopotamian court record cites Hammurabi’s stele.', true, 'Tens of thousands of court tablets survive, and none cite it.'),
  mc('a6e', 6, 'Who is shown with Hammurabi at the top of the stele?', ['Marduk', 'Shamash, the sun god and god of justice', 'Assur', 'Inana'], 1, 'Hammurabi stands before him in an old-fashioned ruler’s cap.'),
  mc('a6f', 6, 'Hammurabi ruled Babylon in:', ['1792–1750 BCE', '883–859 BCE', '559–530 BCE', '2330–2280 BCE'], 0, 'Old Babylonian Period.'),
  mc('b6a', 6, 'How does reading the stele as real law reinforce Orientalism?', ['It shows Mesopotamians were lawless', 'It treats law as an achievement while painting “Middle Eastern law” as brutal, so Europe seems to surpass it', 'It proves Hammurabi was a democrat', 'It has no link to Orientalism'], 1, 'Fits the imagined ladder of “civilizational progress.”', true),
  mc('b6b', 6, 'Which example shows Mesopotamian “law” feeding into the Jewish Bible?', ['Cases about a habitually goring ox in Eshnunna, Hammurabi’s stele and Exodus 21', 'The Cyrus Cylinder', 'The Marriage of Martu', 'The Black Obelisk'], 0, 'A shared literary tradition.', true),
  mc('b6c', 6, 'In Said’s usage, hegemony means:', ['Military conquest', '“Soft” power exercised through culture', 'A law code', 'A trade route'], 1, 'Why Orientalism is hard to counter.', true),
  tf('b6d', 6, 'Hammurabi’s stele was found in Babylon.', false, 'It was found at Susa, where the Elamite king Shutruk-Nahunte had carried it.', true),

  // Class 7
  mc('a7a', 7, 'The Great Pyramid at Giza was built for:', ['Akhenaten', 'Khufu', 'Ramses II', 'Taharqa'], 1, 'Old Kingdom, around 2589–2566 BCE.'),
  tf('a7b', 7, 'The Nile flows south to north, so Upper Egypt is in the south.', true, 'Lower Egypt is the north, around the delta.'),
  mc('a7c', 7, 'Akhenaten centered worship on:', ['Amun', 'The Aten, the sun disk', 'Marduk', 'Ahura Mazda'], 1, 'Often called monotheism.'),
  mc('a7d', 7, 'Akhenaten moved the royal residence to a new city called:', ['Giza', 'Amarna (Akhetaten)', 'Memphis', 'Napata'], 1, '“Horizon of the Aten.”'),
  tf('a7e', 7, 'Herodotus is a reliable, neutral source on the ancient Middle East.', false, 'He wrote to show Greek superiority over Persia.'),
  mc('b7a', 7, 'What does the Logbook of Merer show?', ['Akhenaten’s prayers', 'A named work crew hauling Tura limestone by boat to Khufu’s pyramid', 'A law code', 'A list of Nubian kings'], 1, 'Non-royal workers behind the monument.', true),
  mc('b7b', 7, 'What found in Amarna houses complicates Akhenaten’s reform?', ['Statues of Akhenaten only', 'Small household gods that were not the Aten', 'Cuneiform tablets', 'Christian icons'], 1, 'Ordinary people kept older practices.', true),
  mc('b7c', 7, 'Kemet and Deshret refer to:', ['Upper and Lower Egypt', 'The fertile “black land” and the desert “red land”', 'Two pharaohs', 'Two gods'], 1, 'Egypt understood itself through such pairs.', true),

  // Class 8
  mc('a8a', 8, 'The Neo-Assyrian Empire (900–610 BCE) was the first state to:', ['Use writing', 'Rule from the Gulf to the Mediterranean', 'Adopt monotheism', 'Conquer India'], 1, 'From the Class 8 roadmap.'),
  mc('a8b', 8, 'Which king moved the Assyrian palace from Assur to Nimrud (Kalhu)?', ['Ashurbanipal', 'Ashurnasirpal II', 'Shalmaneser III', 'Sargon of Akkad'], 1, 'He ruled 883–859 BCE.'),
  tf('a8c', 8, 'To erase diversity, the Assyrian Empire forced its own culture and religion on the peoples it conquered.', false, 'Assyria generally left subjects alone and showcased diversity. This example is on the Test 2 study guide.'),
  mc('a8d', 8, 'Shalmaneser III’s Black Obelisk is notable for showing:', ['The founding of Babylon', 'The only ancient image of an Israelite king, among tribute bearers', 'Alexander’s conquest', 'A Sumerian king'], 1, 'King Jehu of Israel.'),
  tf('a8e', 8, 'The Dead Sea Scrolls (about 200 BCE–100 CE) are the oldest copies of books later included in the Bible.', true, 'The oldest complete Bible is the Leningrad Codex (1044 CE).'),
  mc('a8f', 8, 'Assyria’s client states (“vassals”):', ['Were ruled directly by governors', 'Paid yearly tribute and sent envoys but otherwise ran their own affairs', 'Paid nothing', 'Had to worship only Assur'], 1, 'Provinces were the directly ruled ones.'),
  mc('b8a', 8, 'What do the Kuntillet Ajrud inscriptions (about 800 BCE) show?', ['Israel was strictly monotheistic', 'Inscriptions name several gods, including YHWH, Baal and El', 'Israel wrote only in Greek', 'Israel was part of Egypt'], 1, 'Also the earliest Hebrew writing.', true),
  mc('b8b', 8, 'Which statement about the “Land of the Arabs” in Assyrian sources is accurate?', ['It meant all of Arabia as one nation', 'It was a flexible term tied to trade settlements, camels and luxury goods, often ruled by women', 'It first appears in the Qur’an', 'It was ruled from Babylon'], 1, 'Queen Samsi is one example.', true),
  mc('b8c', 8, 'Which order is correct?', ['Merneptah Stele names “Israel” (~1200 BCE), Kuntillet Ajrud Hebrew (~800 BCE), Dead Sea Scrolls (200 BCE–100 CE), Leningrad Codex (1044 CE)', 'Dead Sea Scrolls, Merneptah Stele, Leningrad Codex, Kuntillet Ajrud', 'Leningrad Codex, Dead Sea Scrolls, Kuntillet Ajrud, Merneptah Stele', 'Kuntillet Ajrud, Leningrad Codex, Merneptah Stele, Dead Sea Scrolls'], 0, 'From the “Price Is Right” game.', true),
  tf('b8d', 8, 'Israel and Damascus usually fought each other when Assyria moved west.', false, 'They usually acted together, rebelling and submitting as a bloc.', true),

  // Class 9
  mc('a9a', 9, 'Kush was located:', ['On the Iranian plateau', 'Along the middle Nile in Sudan', 'In Anatolia', 'On the Arabian coast'], 1, 'South of Egypt.'),
  tf('a9b', 9, 'Kushite kings once ruled Egypt as its 25th Dynasty.', true, 'King Piankhy (Piye) conquered Egypt around 720 BCE.'),
  mc('a9c', 9, 'Kerma elite tombs are known for:', ['Pyramids with Greek inscriptions', 'Round graves with a stone ring and cattle-skull offerings', 'Underground cities', 'Fire temples'], 1, 'From the Test 1 study guide example.'),
  mc('a9d', 9, 'Meroe (300 BCE–300 CE) was a center of:', ['Iron smelting', 'Papyrus making', 'Silk weaving', 'Cuneiform schools'], 0, 'It also had enough rain to settle away from the Nile.'),
  tf('a9e', 9, 'Nubia has always been studied as a center of ancient history rather than a periphery.', false, 'Colonial-era archaeology long marginalized it.'),
  mc('b9a', 9, 'Which order fits the history of Kush and Egypt?', ['Egypt conquers Kush (after 1550 BCE), Kush conquers Egypt (~720 BCE), Meroe becomes capital (300 BCE)', 'Kush conquers Egypt, Egypt conquers Kush, Kerma rises', 'Meroe, Kerma, Napata', 'They never interacted'], 0, 'Rivalry, conquest and reversal.', true),
  mc('b9b', 9, 'The “Early and Middle Napatan Period” (~1100–650 BCE) is:', ['Kush at its strongest, centered at Napata, eventually challenging Assyria in the southern Levant', 'Egypt’s Old Kingdom', 'A Christian kingdom in Nubia', 'The Ptolemaic period'], 0, 'The study guide’s own example.', true),
  mc('b9c', 9, 'Why does the Qustul incense burner matter?', ['It is Greek', 'It is a Nubian object using Egyptian-style imagery, showing early exchange and rivalry around 3000 BCE', 'It names Alexander', 'It is a Christian relic'], 1, 'The A-Group rivaled early Egypt.', true),

  // Class 10
  tf('a10a', 10, 'The Cyrus Cylinder was the first declaration of human rights.', false, 'It is royal propaganda. The Section 6 handout uses this claim as an example of a weak short ID.'),
  mc('a10b', 10, 'In the Cyrus Cylinder, which god chooses Cyrus?', ['Ahura Mazda', 'Marduk, god of Babylon', 'YHWH', 'Assur'], 1, 'Cyrus uses the local god of the city he conquered.'),
  mc('a10c', 10, 'Who consolidated the Achaemenid Empire with satrapies and built Persepolis?', ['Cyrus', 'Darius I', 'Xerxes I', 'Alexander'], 1, 'He ruled 522–486 BCE.'),
  tf('a10d', 10, 'Isaiah 44–45 calls Cyrus the anointed (messiah) of YHWH.', true, 'Written for Judean exiles in Babylonia.'),
  mc('a10e', 10, 'Satraps were:', ['Greek philosophers', 'Royal representatives over provinces where local leaders still governed', 'Babylonian gods', 'Zoroastrian priests'], 1, 'A small elite ruling large populations.'),
  mc('a10f', 10, 'The Achaemenid Period on the Test 1 study guide is:', ['530–330 BCE', '900–610 BCE', '330–30 BCE', '225–650 CE'], 0, 'Ended by Alexander.'),
  mc('b10a', 10, 'Why is Assyria remembered as brutal and Persia as tolerant?', ['Persia never used force', '19th-century racial ideas cast Assyrians as “Semitic” and Iranians as “Aryan,” and Greek and biblical texts favored Cyrus', 'Assyria made no art', 'Only Assyria had an army'], 1, 'Similar empires, different legacies.', true),
  mc('b10b', 10, 'What does Isaiah 45 add that the Cyrus Cylinder does not?', ['That Marduk chose Cyrus', 'That no other god had a role in choosing Cyrus, an early divine exclusivity', 'That Cyrus was Greek', 'That Babylon was destroyed'], 1, 'Close to monotheism.', true),
  mc('b10c', 10, 'Which shows continuity between Assyria and the Achaemenids?', ['Both banned local religions', 'Both used client states, roads and tribute ceremonies that displayed diverse peoples', 'Both were monotheistic', 'Both ruled from Athens'], 1, 'Persepolis even borrows Assyrian winged bulls.', true),
  tf('b10d', 10, 'Achaemenid royal inscriptions often name the prophet Zoroaster.', false, 'They never mention him, so scholars prefer “Mazda-worship.”', true),

  // Class 11
  mc('a11a', 11, 'After conquering Persia, Alexander’s empire was basically:', ['A brand-new Greek system', 'The Achaemenid Empire with Alexander at the top', 'A democracy', 'A Roman province'], 1, 'He kept satrapies and Achaemenid officials.'),
  mc('a11b', 11, 'The Seleucids ruled:', ['Egypt', 'Syria, Iraq and Iran', 'Macedonia and Greece', 'Rome'], 1, 'Until 64 BCE.'),
  tf('a11c', 11, 'Hellenism means being of Greek ethnic origin.', false, 'It means taking part in a shared Greek-associated culture, adapted locally.'),
  mc('a11d', 11, 'Paul’s Letter to the Galatians argues that:', ['Followers of Jesus must be circumcised', 'Non-Jews can follow Jesus without becoming Jewish', 'Rome should rule Judea', 'The temple should be rebuilt'], 1, 'Against the first Jerusalem followers.'),
  tf('a11e', 11, 'When Rome sacked Jerusalem in 70 CE, it marked a turning point for both early Judaism and the Jesus movement.', true, 'The temple was despoiled and institutions destroyed.'),
  mc('a11f', 11, 'On the Test 1 study guide, the Hellenistic Kingdoms date to:', ['330–30 BCE', '530–330 BCE', '30 BCE–1400s CE', '900–610 BCE'], 0, '“Seleucid” can be used interchangeably.'),
  mc('b11a', 11, 'Why is the Herakles-Bahram statue from Seleucia not simply “Greek art”?', ['It was made in Athens', 'It adapts a Greek hero as a local god for a local temple, with Greek and Parthian inscriptions', 'It shows Alexander', 'It has no inscription'], 1, 'A local mode of representation.', true),
  mc('b11b', 11, 'How did religion in Judea before 70 CE differ from Judaism today?', ['It had no temple', 'The canon was still open, several gods were worshipped and animal sacrifice continued', 'It banned prophets', 'It was only in Greek'], 1, 'Poly- and monotheism sat on a spectrum.', true),
  mc('b11c', 11, 'According to Josephus, Jesus was executed for:', ['Blasphemy against Zeus', 'Anti-Roman sedition', 'Tax fraud', 'Converting non-Jews'], 1, 'One of several Jewish leaders promising freedom from Rome.', true),
  tf('b11d', 11, 'Middle Persian tradition remembers Alexander as “the Great.”', false, 'It calls him “the accursed” (gujastak).', true),

  // Class 12
  mc('a12a', 12, 'Who founded the Sasanian dynasty in 224 CE?', ['Shapur I', 'Ardashir I', 'Cyrus', 'Khosrow II'], 1, 'He overthrew the last Parthian king, Ardavan.'),
  mc('a12b', 12, 'In Zoroastrian dualism, Ahura Mazda is opposed by:', ['Marduk', 'Angra Mainyu (Ahriman)', 'Zoroaster', 'Mani'], 1, 'The “Destructive Spirit.”'),
  tf('a12c', 12, 'Formal Zoroastrianism, with clergy and institutions, took shape in the Sasanian period.', true, 'Earlier Mazda-worship was looser and varied.'),
  mc('a12d', 12, 'Magic (incantation) bowls were:', ['Used at royal feasts', 'Buried in doorways to protect homes from demons, mixing many religious traditions', 'Zoroastrian fire holders', 'Roman coins'], 1, 'Common in Mesopotamia in the 500s–700s CE.'),
  mc('a12e', 12, 'The Sasanian capital was:', ['Persepolis', 'Ctesiphon', 'Babylon', 'Constantinople'], 1, 'Near modern Baghdad.'),
  tf('a12f', 12, 'The last known cuneiform text dates from 75 CE.', true, 'An astronomical observation.'),
  mc('b12a', 12, 'In the Account of the Deeds of Ardashir, the three sacred fires stand for:', ['Three gods', 'The priests, the warriors and the farmers', 'Three cities', 'Three Roman emperors'], 1, 'The whole social order backs Sasan’s line.', true),
  mc('b12b', 12, 'What does the Investiture of Ardashir I at Naqsh-e Rostam show?', ['Ardashir fighting Rome', 'Ahura Mazda giving Ardashir the ring of kingship, with Ahriman and the defeated Parthian king beneath them', 'A Christian baptism', 'Alexander’s coronation'], 1, 'Heaven and earth mirror each other.', true),
  mc('b12c', 12, 'How does Zoroastrianism complicate the usual story of the Abrahamic religions?', ['It came after Islam', 'Ideas like free will, final judgment, resurrection and a virgin-born savior appear in it too, showing shared late antique roots', 'It rejected dualism', 'It had no influence'], 1, 'Monotheism and polytheism are not fully separate boxes.', true),
  tf('b12d', 12, 'The Roman and Sasanian empires each backed an official religion, and in daily life their religious differences were sharp and absolute.', false, 'They stressed differences in propaganda, but practice overlapped.', true)
];
