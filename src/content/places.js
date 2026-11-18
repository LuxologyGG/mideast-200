// Coordinates as [longitude, latitude]. Lesson pins use modern locations of the sites named in class.
export const PLACES = {
  'Alexandria': [29.92, 31.2], 'Amarna': [30.89, 27.65], 'Ardabil': [48.29, 38.25], 'Assur': [43.26, 35.46], 'Aswan': [32.9, 24.09],
  'Avarayr': [44.9, 39.1], 'Ayn Jalut': [35.4, 32.55], 'Babylon': [44.42, 32.54], 'Baghdad': [44.36, 33.31], 'Balkh': [66.9, 36.76],
  'Basra': [47.78, 30.51], 'Bukhara': [64.42, 39.77], 'Cairo': [31.25, 30.05], 'Chogha Mish': [48.55, 32.22], 'Constantinople': [28.98, 41.01],
  'Ctesiphon': [44.58, 33.09], 'Damascus': [36.29, 33.51], 'Firuzabad': [52.52, 28.88], 'Fustat': [31.23, 30.0], 'Ghazni': [68.42, 33.55],
  'Girsu': [46.17, 31.55], 'Giza': [31.13, 29.98], 'Hamadan': [48.51, 34.8], 'Hatra': [42.72, 35.59], 'Herat': [62.2, 34.35],
  'Isfahan': [51.67, 32.65], 'Jerusalem': [35.23, 31.78], 'Kairouan': [10.1, 35.68], 'Kandahar': [65.7, 31.6], 'Karbala': [44.02, 32.62],
  'Kerma': [30.4, 19.6], 'Khujand': [69.6, 40.28], 'Konya': [32.48, 37.87], 'Kufa': [44.4, 32.03], 'Manzikert': [42.54, 39.14],
  'Marib': [45.33, 15.42], 'Mecca': [39.83, 21.42], 'Medina': [39.61, 24.47], 'Meroe': [33.75, 16.94], 'Merv': [61.84, 37.66],
  'Minya': [30.75, 28.1], 'Napata': [31.83, 18.53], 'Naqsh-e Rostam': [52.87, 29.99], 'Nimrud': [43.33, 36.1], 'Nineveh': [43.15, 36.36],
  'Nippur': [45.23, 32.13], 'Pasargadae': [53.17, 30.2], 'Persepolis': [52.89, 29.93], 'Qadisiya': [44.3, 31.7], 'Qumran': [35.46, 31.74],
  'Samaria': [35.19, 32.28], 'Samarkand': [66.96, 39.65], 'Seleucia': [44.52, 33.1], 'Siffin': [38.4, 35.9], 'Susa': [48.26, 32.19],
  'Thebes': [32.65, 25.7], 'Ur': [46.1, 30.96], 'Uruk': [45.64, 31.32], 'Yarmuk': [35.9, 32.8], 'Yathrib': [39.61, 24.47],
  'Çatalhöyük': [32.83, 37.67]
};

// Places that share a spot with another name.
export const SAME_AS = {Yathrib: 'Medina', Fustat: 'Cairo'};

// The 30 Map Quiz locations, from the course list (IDs.pdf). River markers snap to the river line when the map is generated.
// kind: water | river | feature | area (rivers count as bodies of water on the course list)
export const QUIZ = [
  {id: 'tigris', name: 'Tigris', kind: 'river', river: 'Tigris', at: [43.9, 34.6]},
  {id: 'euphrates', name: 'Euphrates', kind: 'river', river: 'Euphrates', at: [40.2, 35.2]},
  {id: 'nile', name: 'Nile', kind: 'river', river: 'Nile', at: [31.2, 26.6]},
  {id: 'oxus', name: 'Oxus (Amu Darya)', short: 'Oxus', kind: 'river', river: 'Amu Darya', at: [63.0, 39.4], alias: ['oxus', 'amu darya', 'amu']},
  {id: 'indus', name: 'Indus', kind: 'river', river: 'Indus', at: [70.0, 29.5]},
  {id: 'black-sea', name: 'Black Sea', kind: 'water', at: [34.0, 43.3]},
  {id: 'aegean', name: 'Aegean Sea', kind: 'water', at: [25.0, 38.9], alias: ['aegean']},
  {id: 'mediterranean', name: 'Mediterranean Sea (a.k.a. White Sea)', short: 'Mediterranean', kind: 'water', at: [26.5, 33.8], alias: ['mediterranean', 'white sea', 'med']},
  {id: 'red-sea', name: 'Red Sea', kind: 'water', at: [37.6, 22.0]},
  {id: 'indian-ocean', name: 'Indian Ocean', kind: 'water', at: [63.0, 17.0]},
  {id: 'caspian', name: 'Caspian Sea', kind: 'water', at: [51.0, 41.6], alias: ['caspian']},
  {id: 'gulf', name: 'The (Arabian/Persian) Gulf', short: 'The Gulf', kind: 'water', at: [51.2, 26.9], alias: ['gulf', 'persian gulf', 'arabian gulf']},
  {id: 'balkan', name: 'Balkan Mountains', short: 'Balkans', kind: 'feature', at: [24.6, 42.7], alias: ['balkan', 'balkans']},
  {id: 'caucasus', name: 'Caucasus Mountains', short: 'Caucasus', kind: 'feature', at: [45.6, 42.4], alias: ['caucasus']},
  {id: 'zagros', name: 'Zagros Mountains', short: 'Zagros', kind: 'feature', at: [47.7, 33.2], alias: ['zagros']},
  {id: 'alborz', name: 'Alborz Mountains', short: 'Alborz', kind: 'feature', at: [52.2, 36.2], alias: ['alborz', 'elburz']},
  {id: 'iranian-plateau', name: 'Iranian Plateau', kind: 'feature', at: [56.6, 32.4]},
  {id: 'egypt-sudan', name: 'Greater Egypt-Sudan', short: 'Egypt-Sudan', kind: 'area', at: [31.6, 21.6], alias: ['egypt-sudan', 'egypt sudan', 'egypt', 'sudan']},
  {id: 'syria', name: 'Greater Syria', short: 'Greater Syria', kind: 'area', at: [37.4, 34.6], alias: ['syria']},
  {id: 'sumer', name: 'Sumer / Babylonia / al-Iraq', short: 'Sumer / al-Iraq', kind: 'area', at: [45.6, 31.6], alias: ['sumer', 'babylonia', 'iraq', 'al-iraq']},
  {id: 'assyria', name: 'Assyria / Jazira', short: 'Assyria / Jazira', kind: 'area', at: [41.8, 36.4], alias: ['assyria', 'jazira']},
  {id: 'armenia', name: 'Greater Armenia', short: 'Armenia', kind: 'area', at: [42.2, 39.7], alias: ['armenia']},
  {id: 'georgia', name: 'Georgia', kind: 'area', at: [42.8, 41.9]},
  {id: 'anatolia', name: 'Anatolia / Rum', short: 'Anatolia', kind: 'area', at: [32.2, 39.1], alias: ['anatolia', 'rum']},
  {id: 'fars', name: 'Fars / Pars', kind: 'area', at: [53.6, 28.7], alias: ['fars', 'pars']},
  {id: 'jibal', name: 'Jibal (later “Persian Iraq”)', short: 'Jibal', kind: 'area', at: [50.1, 34.7], alias: ['jibal', 'persian iraq']},
  {id: 'transoxania', name: 'Transoxania', kind: 'area', at: [66.2, 40.6]},
  {id: 'khorasan', name: 'Khorasan', kind: 'area', at: [60.4, 35.8], alias: ['khorasan', 'khurasan']},
  {id: 'hijaz', name: 'Hijaz', kind: 'area', at: [38.6, 23.2]},
  {id: 'yemen', name: 'Yemen', kind: 'area', at: [45.2, 15.2]}
];
export const QUIZ_GROUPS = [{label: 'Bodies of water', kinds: ['river', 'water']}, {label: 'Geographic features', kinds: ['feature']}, {label: 'Areas', kinds: ['area']}];
