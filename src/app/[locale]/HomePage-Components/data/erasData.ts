export interface Dynasty {
  id: string;
  name: string;
  period: string;
  description: string;
  imageUrl: string;
  notableRulers?: string[];
  keyAchievements?: string[];
}

export interface Era {
  id: string;
  name: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  color: {
    primary: string;
    secondary: string;
    badge: string;
  };
  keyCharacteristics: string[];
  notableSites: string[];
  historicalContext: string;
  culturalSignificance: string;
  architecturalStyle: string;
  religiousBeliefs: string;
  timeline: {
    start: number;
    end: number;
  };
  dynasties: Dynasty[];
}

export const eras: Era[] = [
  {
    id: 'pharaonic',
    name: 'Ancient Egyptian',
    period: '3100 BC - 332 BC',
    shortDescription: 'The age of the pharaohs, pyramids, and hieroglyphs. Ancient Egypt\'s most iconic period spanning over 3000 years.',
    fullDescription: 'The Ancient Egyptian era represents the zenith of ancient Egyptian civilization, characterized by powerful dynasties, monumental architecture, and sophisticated religious beliefs. This period witnessed the construction of the Great Pyramids, the establishment of complex bureaucratic systems, and the development of hieroglyphic writing. The pharaohs were considered divine rulers, mediating between gods and humans, and their legacy continues to fascinate the world today.',
    imageUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80',
    color: {
      primary: 'from-yellow-500 to-amber-600',
      secondary: 'bg-yellow-500/20',
      badge: 'bg-yellow-500/20 text-white border-yellow-500/30'
    },
    keyCharacteristics: [
      'Divine kingship and pharaonic rule',
      'Monumental pyramid construction',
      'Hieroglyphic writing system',
      'Polytheistic religion with complex mythology',
      'Advanced mummification practices',
      'Sophisticated agricultural economy along the Nile'
    ],
    notableSites: [
      'Great Pyramids of Giza',
      'Valley of the Kings',
      'Karnak Temple Complex',
      'Abu Simbel Temples',
      'Temple of Hatshepsut',
      'Luxor Temple'
    ],
    historicalContext: 'The Ancient Egyptian period began with the unification of Upper and Lower Egypt around 3100 BC under King Narmer (Menes). It spanned 30 dynasties and three main periods: the Old Kingdom (pyramid builders), Middle Kingdom (classical age), and New Kingdom (empire builders). This era ended with the conquest of Egypt by Alexander the Great in 332 BC.',
    culturalSignificance: 'Ancient Egypt established foundational concepts in architecture, mathematics, medicine, and astronomy that influenced subsequent civilizations. The concept of the afterlife, monumental tomb architecture, and artistic conventions developed during this period have become iconic symbols of ancient Egypt.',
    architecturalStyle: 'Characterized by massive stone structures including pyramids, temples with hypostyle halls, obelisks, and rock-cut tombs. Architecture emphasized symmetry, mathematical precision, and astronomical alignment. Extensive use of columns, hieroglyphic inscriptions, and relief carvings depicting gods and pharaohs.',
    religiousBeliefs: 'Complex polytheistic system with major deities including Ra (sun god), Osiris (god of the afterlife), Isis (goddess of magic), Horus (sky god), and Anubis (god of mummification). Strong belief in the afterlife led to elaborate burial practices and tomb construction. The pharaoh was considered a living god, the son of Ra.',
    timeline: {
      start: -3100,
      end: -332
    },
    dynasties: [
      {
        id: 'old-kingdom',
        name: 'Old Kingdom (Dynasties 3-6)',
        period: '2686 BC - 2181 BC',
        description: 'Known as the "Age of the Pyramids," the Old Kingdom saw the construction of Egypt\'s most iconic monuments including the Great Pyramids of Giza and the Sphinx. This was a golden age of prosperity, strong central government, and unprecedented architectural achievement. The pharaohs commanded immense resources and labor to create eternal monuments that still stand today.',
        imageUrl: 'https://images.unsplash.com/photo-1632836471674-28a2d2b132a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHRpYW4lMjBweXJhbWlkJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc2NjUxMjU5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Djoser (Step Pyramid)', 'Khufu (Great Pyramid)', 'Khafre', 'Menkaure'],
        keyAchievements: ['Great Pyramids of Giza', 'Great Sphinx', 'Step Pyramid of Djoser', 'Sun temples']
      },
      {
        id: 'middle-kingdom',
        name: 'Middle Kingdom (Dynasties 11-12)',
        period: '2055 BC - 1650 BC',
        description: 'Called the "Classical Age" of Egyptian culture, the Middle Kingdom saw the reunification of Egypt after the First Intermediate Period. This era emphasized literature, art, and temple construction. The pharaohs promoted trade, expanded irrigation systems, and established a more administrative approach to governance. Egyptian literature and wisdom texts flourished during this time.',
        imageUrl: 'https://images.unsplash.com/photo-1761143589598-25ebaeb477d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHRpYW4lMjB0ZW1wbGUlMjBjb2x1bW5zfGVufDF8fHx8MTc2NjUxMjU5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Mentuhotep II (Reunifier)', 'Amenemhat I', 'Senusret III'],
        keyAchievements: ['Karnak Temple expansion', 'White Chapel at Karnak', 'Faiyum irrigation projects']
      },
      {
        id: 'new-kingdom',
        name: 'New Kingdom (Dynasties 18-20)',
        period: '1550 BC - 1070 BC',
        description: 'The New Kingdom represents Egypt\'s imperial age and greatest territorial extent. This era produced famous pharaohs like Hatshepsut, Akhenaten, Tutankhamun, and Ramses II. Egypt became a major international power, controlling territories from Nubia to Syria. Magnificent temples at Karnak, Luxor, and Abu Simbel were constructed, and the Valley of the Kings became the royal necropolis.',
        imageUrl: 'https://images.unsplash.com/photo-1693654547147-24d94b4ed4ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXhvciUyMHRlbXBsZSUyMGVneXB0fGVufDF8fHx8MTc2NjUxMjU5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Hatshepsut', 'Thutmose III', 'Akhenaten', 'Tutankhamun', 'Ramses II'],
        keyAchievements: ['Valley of the Kings', 'Abu Simbel Temples', 'Luxor Temple', 'Karnak hypostyle hall', 'Battle of Kadesh']
      }
    ]
  },
  {
    id: 'ptolemaic',
    name: 'Ptolemaic',
    period: '332 BC - 30 BC',
    shortDescription: 'The Hellenistic period when Greek rulers governed Egypt, blending Greek and Egyptian cultures in unprecedented ways.',
    fullDescription: 'The Ptolemaic period began with Alexander the Great\'s conquest and continued under the Macedonian Greek dynasty founded by Ptolemy I. This era witnessed a unique fusion of Greek and Egyptian traditions, with the Ptolemies adopting pharaonic titles and customs while introducing Hellenistic culture. The period is famous for the Library of Alexandria, the Lighthouse of Alexandria (one of the Seven Wonders), and ended with Cleopatra VII, the last pharaoh of Egypt.',
    imageUrl: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80',
    color: {
      primary: 'from-purple-500 to-violet-600',
      secondary: 'bg-purple-500/20',
      badge: 'bg-purple-500/20 text-white border-purple-500/30'
    },
    keyCharacteristics: [
      'Greco-Egyptian cultural synthesis',
      'Greek dynasty ruling as pharaohs',
      'Establishment of Alexandria as cultural capital',
      'Development of the Museum and Library of Alexandria',
      'Bilingual administration (Greek and Egyptian)',
      'Syncretic religious practices'
    ],
    notableSites: [
      'Temple of Edfu',
      'Temple of Kom Ombo',
      'Temple of Dendera',
      'Philae Temple Complex',
      'Alexandria (ancient ruins)',
      'Temple of Hathor at Dendera'
    ],
    historicalContext: 'After Alexander the Great\'s death in 323 BC, his general Ptolemy established a dynasty that ruled Egypt for nearly 300 years. The Ptolemies maintained Egyptian traditions externally while promoting Greek culture. The era ended when Cleopatra VII and Mark Antony were defeated by Octavian (Augustus) in 30 BC, making Egypt a Roman province.',
    culturalSignificance: 'The Ptolemaic period represents one of history\'s most successful cultural syntheses. The Library of Alexandria became the ancient world\'s greatest repository of knowledge. Greek scientific and philosophical traditions merged with Egyptian religious wisdom, creating unique intellectual achievements. The Rosetta Stone, created during this period, later became key to deciphering hieroglyphs.',
    architecturalStyle: 'Temple architecture combined Egyptian traditional forms with Greek proportions and details. Buildings featured massive pylon gates, columned halls, and sanctuary chambers in Egyptian style, but with enhanced Greek architectural refinement. Extensive use of relief carvings depicting both Greek and Egyptian deities. Cities like Alexandria showcased Hellenistic urban planning.',
    religiousBeliefs: 'Syncretic religion blending Greek and Egyptian pantheons. Creation of new hybrid deities like Serapis (combining Osiris and Greek gods). Traditional Egyptian temple worship continued alongside Greek cults. The Ptolemies presented themselves as both Greek rulers and traditional pharaohs, performing Egyptian religious ceremonies.',
    timeline: {
      start: -332,
      end: -30
    },
    dynasties: [
      {
        id: 'ptolemaic-dynasty',
        name: 'Ptolemaic Dynasty',
        period: '332 BC - 30 BC',
        description: 'Founded by Ptolemy I Soter, one of Alexander the Great\'s generals, this Greek Macedonian dynasty ruled Egypt for nearly 300 years. The Ptolemies successfully blended Greek and Egyptian cultures, presenting themselves as pharaohs to Egyptians while maintaining Greek cultural identity. They made Alexandria the intellectual capital of the ancient world with the famous Library and Lighthouse. The dynasty produced 15 rulers, ending with the legendary Cleopatra VII.',
        imageUrl: 'https://images.unsplash.com/photo-1761701466204-e826c4a769d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZ3JlZWslMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY2NTEyNTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Ptolemy I Soter (founder)', 'Ptolemy II Philadelphus', 'Ptolemy III Euergetes', 'Cleopatra VII (last pharaoh)'],
        keyAchievements: ['Library of Alexandria', 'Lighthouse of Alexandria', 'Temple of Edfu', 'Temple of Dendera', 'Rosetta Stone', 'Museum of Alexandria']
      }
    ]
  },
  {
    id: 'roman',
    name: 'Roman',
    period: '30 BC - 395 AD',
    shortDescription: 'Egypt as a vital province of the Roman Empire, serving as the breadbasket and maintaining ancient traditions under Roman rule.',
    fullDescription: 'Following Cleopatra\'s defeat, Egypt became a special province under direct control of the Roman emperor. As Rome\'s primary grain supplier, Egypt held strategic importance. While Roman culture and administration dominated urban centers, traditional Egyptian religious practices and temples continued to thrive. This period saw the construction of new temples in Egyptian style, the rise of Christianity, and the continuation of mummification practices alongside Roman burial customs.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    color: {
      primary: 'from-red-500 to-rose-600',
      secondary: 'bg-red-500/20',
      badge: 'bg-red-500/20 text-white border-red-500/30'
    },
    keyCharacteristics: [
      'Egypt as Rome\'s breadbasket province',
      'Continuation of pharaonic temple traditions',
      'Mummy portraits (Fayum portraits)',
      'Rise of Christianity in Egypt',
      'Roman architectural influence in cities',
      'Emergence of Coptic culture'
    ],
    notableSites: [
      'Temple of Isis at Philae',
      'Kom Ombo Temple',
      'Roman Amphitheatre at Alexandria',
      'Monastery of St. Catherine (later period)',
      'Coptic churches and monasteries',
      'Roman fortresses and settlements'
    ],
    historicalContext: 'Roman Egypt began in 30 BC when Octavian (Augustus) defeated Cleopatra VII and Mark Antony. Egypt became a special province governed by a prefect reporting directly to the emperor. The period lasted until 395 AD when the Roman Empire split into Eastern and Western halves, with Egypt becoming part of the Byzantine Empire.',
    culturalSignificance: 'Roman Egypt witnessed the remarkable persistence of ancient Egyptian religious traditions alongside the introduction of Roman customs and eventually Christianity. The famous Fayum mummy portraits represent a unique blend of Egyptian burial practices with Roman artistic styles. Egypt\'s monasticism movement, beginning in this period, would profoundly influence Christian practices worldwide.',
    architecturalStyle: 'Blend of traditional Egyptian temple architecture with Roman engineering and urban design. Cities featured Roman baths, amphitheaters, and colonnaded streets. Traditional Egyptian temples continued to be built and maintained. Introduction of Roman construction techniques including concrete and arches. Christian architecture began emerging in the later period.',
    religiousBeliefs: 'Initially, traditional Egyptian polytheism continued with Roman interpretations of Egyptian gods (e.g., Isis worship spreading throughout the Roman Empire). Gradual rise of Christianity from the 1st century AD, with Egypt becoming a major center of Christian theology. Development of Coptic Christianity with unique Egyptian characteristics. Gradual decline of traditional Egyptian temple worship.',
    timeline: {
      start: -30,
      end: 395
    },
    dynasties: [
      {
        id: 'julio-claudian',
        name: 'Julio-Claudian Dynasty',
        period: '30 BC - 68 AD',
        description: 'The first Roman dynasty to rule Egypt, beginning with Augustus (Octavian) who defeated Cleopatra VII. Egypt became the personal property of the emperor, governed by a prefect. The Julio-Claudians maintained Egyptian temples and religious practices while introducing Roman administration, architecture, and customs. This period saw continued prosperity and the beginning of Egypt\'s Christian era.',
        imageUrl: 'https://images.unsplash.com/photo-1569870483127-1f9608554db4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbiUyMGZvcnVtJTIwY29sdW1uc3xlbnwxfHx8fDE3NjY1MTI1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Augustus (Octavian)', 'Tiberius', 'Claudius', 'Nero'],
        keyAchievements: ['Temple of Dendur', 'Roman administrative system', 'Egyptian grain trade', 'Fayum mummy portraits']
      },
      {
        id: 'flavian-antonine',
        name: 'Flavian to Antonine Period',
        period: '69 AD - 235 AD',
        description: 'A period of relative stability and prosperity under the Flavian and Antonine dynasties. Egypt continued to serve as Rome\'s breadbasket while experiencing cultural flourishing. The famous Fayum mummy portraits reached their height. Christianity began spreading through Egypt, with Alexandria becoming a major center of Christian theology. Traditional Egyptian religious practices coexisted with Roman and emerging Christian worship.',
        imageUrl: 'https://images.unsplash.com/photo-1672741114521-b81677f460bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tYW4lMjBydWluc3xlbnwxfHx8fDE3NjY1MTI1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Vespasian', 'Trajan', 'Hadrian', 'Marcus Aurelius'],
        keyAchievements: ['Kom Ombo Temple completion', 'Philae Temple expansion', 'Alexandria library continuation', 'Rise of Alexandrian Christianity']
      },
      {
        id: 'diocletian-constantine',
        name: 'Late Empire (Diocletian-Constantine)',
        period: '284 AD - 395 AD',
        description: 'The final period of unified Roman rule saw major administrative reforms under Diocletian and the legalization of Christianity under Constantine. Egypt endured the Great Persecution (303-313 AD) which created many Coptic martyrs. Constantine\'s Edict of Milan (313 AD) allowed Christianity to flourish openly. This era witnessed the decline of traditional Egyptian religion and the emergence of Christian Egypt, setting the stage for the Byzantine period.',
        imageUrl: 'https://images.unsplash.com/photo-1679161058715-201f70bbb2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbiUyMGNvbG9zc2V1bSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjY0OTIxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Diocletian', 'Constantine the Great', 'Theodosius I'],
        keyAchievements: ['Diocletian\'s administrative reforms', 'Legalization of Christianity', 'Early Coptic churches', 'Beginning of monastic movement']
      }
    ]
  },
  {
    id: 'byzantine',
    name: 'Byzantine',
    period: '395 AD - 641 AD',
    shortDescription: 'Christian Egypt under Eastern Roman rule, marked by magnificent Coptic art and monastic traditions.',
    fullDescription: 'The Byzantine period in Egypt represents the Christian phase of Roman rule, characterized by the dominance of the Coptic Orthodox Church and the flourishing of Christian monasticism. Egypt was a vital province of the Byzantine Empire, contributing significantly to Christian theology through the School of Alexandria. This era witnessed the construction of numerous churches and monasteries, the development of Coptic art and literature, and theological controversies that shaped Christian doctrine. The period ended with the Arab Islamic conquest in 641 AD.',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
    color: {
      primary: 'from-blue-500 to-cyan-600',
      secondary: 'bg-blue-500/20',
      badge: 'bg-blue-500/20 text-white border-blue-500/30'
    },
    keyCharacteristics: [
      'Dominance of Coptic Christianity',
      'Flourishing monastic movement',
      'Distinctive Coptic art and iconography',
      'Development of Coptic language and literature',
      'Theological controversies (Monophysitism)',
      'Decline of ancient Egyptian religious practices'
    ],
    notableSites: [
      'Monastery of St. Catherine, Sinai',
      'White Monastery (Deir el-Abiad)',
      'Red Monastery (Deir el-Ahmar)',
      'Abu Mena (Christian pilgrimage site)',
      'Coptic churches in Old Cairo',
      'Desert monasteries of Wadi Natrun'
    ],
    historicalContext: 'Byzantine Egypt began when the Roman Empire officially split in 395 AD, with Egypt becoming part of the Eastern Roman (Byzantine) Empire. The period was marked by religious disputes between the Coptic Church and the Byzantine authorities over the nature of Christ. Heavy taxation and religious persecution created tensions. The era concluded with the Arab conquest led by Amr ibn al-As in 641 AD.',
    culturalSignificance: 'Byzantine Egypt was crucial in shaping early Christian theology and monasticism. Egyptian monks like St. Anthony and St. Pachomius established monastic traditions that spread throughout the Christian world. The Coptic Church developed a unique identity, preserving elements of Egyptian culture within a Christian framework. Coptic art created a distinctive style blending Byzantine and ancient Egyptian influences.',
    architecturalStyle: 'Church architecture featured basilica plans with domes, apses, and narthexes. Extensive use of Coptic crosses, geometric patterns, and Christian iconography. Monasteries built as fortified compounds in desert locations. Churches often constructed within or near ancient Egyptian temples. Distinctive Coptic architectural elements including khurus (choir area) and templon screens.',
    religiousBeliefs: 'Coptic Orthodox Christianity dominated, emphasizing the monophysite doctrine (single divine nature of Christ), which differed from Byzantine orthodoxy. Strong veneration of martyrs and saints. Development of distinctive Coptic liturgy and theology. Hermitic and cenobitic monasticism flourished. The ancient Egyptian concept of resurrection influenced Christian interpretations of the afterlife.',
    timeline: {
      start: 395,
      end: 641
    },
    dynasties: [
      {
        id: 'theodosian-heraclian',
        name: 'Theodosian to Heraclian Period',
        period: '395 AD - 641 AD',
        description: 'Egypt as a Byzantine province witnessed the full Christianization of Egyptian society under the Theodosian and Heraclian dynasties. The Coptic Orthodox Church emerged as a distinct entity during the Council of Chalcedon (451 AD), which created a lasting schism between Egyptian and Byzantine Christianity. Despite religious tensions and heavy taxation, this period saw remarkable achievements in Christian monasticism, art, and theology. The era ended with the Arab Islamic conquest in 641 AD.',
        imageUrl: 'https://images.unsplash.com/photo-1625819826041-a119c9c6fca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxieXphbnRpbmUlMjBjaHVyY2glMjBtb3NhaWN8ZW58MXx8fHwxNzY2NTEyNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Theodosius I', 'Justinian I', 'Heraclius'],
        keyAchievements: ['Monastery of St. Catherine', 'White and Red Monasteries', 'Coptic art flowering', 'School of Alexandria theology', 'Desert monasticism']
      },
      {
        id: 'coptic-church',
        name: 'Coptic Church Development',
        period: '451 AD - 641 AD',
        description: 'Following the Council of Chalcedon, the Coptic Orthodox Church developed its distinct identity, emphasizing the Miaphysite doctrine. This period saw the construction of numerous monasteries and churches throughout Egypt. Coptic became a written language for religious texts. The monastic movement reached its zenith with thousands of monks living in desert communities. Coptic art developed its characteristic style, blending Byzantine influences with ancient Egyptian motifs.',
        imageUrl: 'https://images.unsplash.com/photo-1658238745581-fac61e4ab431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnRob2RveCUyMGNodXJjaCUyMGludGVyaW9yfGVufDF8fHx8MTc2NjUxMjU5OXww&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Coptic Patriarchs: Dioscorus I', 'Timothy Aelurus', 'Benjamin I'],
        keyAchievements: ['Wadi Natrun monasteries', 'Abu Mena pilgrimage site', 'Coptic literature', 'Distinctive liturgy development', 'Icon painting tradition']
      }
    ]
  },
  {
    id: 'islamic',
    name: 'Islamic',
    period: '641 AD - Present',
    shortDescription: 'Egypt\'s transformation under Islamic rule, creating magnificent mosques and establishing Cairo as a great Islamic capital.',
    fullDescription: 'The Islamic period began with the Arab conquest in 641 AD and continues to the present day. This era witnessed Egypt\'s transformation into a major center of Islamic civilization, culture, and learning. The founding of Cairo in 969 AD, the establishment of Al-Azhar University, and the construction of magnificent mosques and madrasas marked this period. Islamic Egypt saw various dynasties including the Umayyads, Abbasids, Fatimids, Ayyubids, Mamluks, and Ottomans, each contributing to Egypt\'s rich Islamic heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80',
    color: {
      primary: 'from-green-500 to-emerald-600',
      secondary: 'bg-green-500/20',
      badge: 'bg-green-500/20 text-white border-green-500/30'
    },
    keyCharacteristics: [
      'Introduction of Islamic architecture and urbanism',
      'Establishment of Cairo as Islamic capital',
      'Development of Arabic as primary language',
      'Flourishing of Islamic art and calligraphy',
      'Construction of mosques, madrasas, and mausoleums',
      'Al-Azhar as center of Islamic learning'
    ],
    notableSites: [
      'Al-Azhar Mosque',
      'Ibn Tulun Mosque',
      'Sultan Hassan Mosque',
      'Muhammad Ali Mosque',
      'Citadel of Cairo',
      'Islamic Cairo Historic District',
      'Mosque of Amr ibn al-As',
      'Al-Hakim Mosque'
    ],
    historicalContext: 'Islamic rule began with the Arab conquest led by Amr ibn al-As in 641 AD. Egypt became part of the expanding Islamic Caliphate, initially under the Rashidun Caliphate, then the Umayyads and Abbasids. The Fatimid dynasty founded Cairo in 969 AD. Subsequent rulers included the Ayyubids (Saladin\'s dynasty), Mamluks (who repelled the Mongols and Crusaders), and Ottomans (1517-1914). Modern Egypt emerged in the 19th century.',
    culturalSignificance: 'Islamic Egypt became a major center of learning, culture, and commerce. Al-Azhar University, founded in 970 AD, remains one of the world\'s oldest continuously operating universities. Cairo developed into one of the Islamic world\'s greatest cities. Egyptian Islamic architecture, characterized by magnificent mosques and intricate geometric patterns, influenced Islamic art worldwide. Sufi traditions flourished, and Egypt became a center of Islamic scholarship.',
    architecturalStyle: 'Diverse Islamic architectural styles spanning various dynasties. Fatimid architecture featured elaborate brick decorations and keel-arched niches. Ayyubid and Mamluk periods produced grand mosques with massive domes, towering minarets, and intricate stone carving. Ottoman influence introduced pencil-shaped minarets and central dome designs. Extensive use of muqarnas (stalactite vaulting), arabesque patterns, geometric designs, and Arabic calligraphy.',
    religiousBeliefs: 'Predominantly Sunni Islam with significant Sufi influence. The Fatimid period introduced Shia Ismaili Islam. Coexistence with Coptic Christian minority. Development of distinctive Egyptian Islamic practices and traditions. Veneration of saints and religious scholars. Strong emphasis on Quranic education and Islamic jurisprudence. Multiple schools of Islamic law represented.',
    timeline: {
      start: 641,
      end: 2024
    },
    dynasties: [
      {
        id: 'umayyad',
        name: 'Umayyad Caliphate',
        period: '661 AD - 750 AD',
        description: 'The first major Islamic dynasty to rule Egypt after the Rashidun Caliphate. The Umayyads governed from Damascus and transformed Egypt into a vital province of their expanding empire. They introduced Arabic as the administrative language and established the foundations of Islamic governance in Egypt, including the construction of early mosques.',
        imageUrl: 'https://images.unsplash.com/photo-1658490250803-c7daa6e5967f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NjUxMjU5OXww&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Muawiya I', 'Abd al-Malik ibn Marwan', 'Umar II'],
        keyAchievements: ['Mosque of Amr ibn al-As expansion', 'Arabic administrative system', 'Islamic coinage introduction']
      },
      {
        id: 'abbasid',
        name: 'Abbasid Caliphate',
        period: '750 AD - 969 AD',
        description: 'The Abbasids overthrew the Umayyads and ruled from Baghdad, ushering in the Islamic Golden Age. Under Abbasid rule, Egypt became a center of learning and commerce. The period saw significant cultural and scientific achievements, with Egyptian scholars contributing to mathematics, astronomy, and medicine.',
        imageUrl: 'https://images.unsplash.com/photo-1762858432860-3c11f415141e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWlybyUyMG1vc3F1ZSUyMG1pbmFyZXR8ZW58MXx8fHwxNzY2NTEyNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Al-Mansur', 'Harun al-Rashid', 'Al-Mamun'],
        keyAchievements: ['Ibn Tulun Mosque', 'House of Wisdom influences', 'Commercial prosperity']
      },
      {
        id: 'fatimid',
        name: 'Fatimid Caliphate',
        period: '969 AD - 1171 AD',
        description: 'The Fatimids founded Cairo in 969 AD and established it as their capital, creating one of the Islamic world\'s greatest cities. They built Al-Azhar Mosque and University, which remains a premier center of Islamic learning. Fatimid Egypt witnessed remarkable achievements in architecture, art, and scholarship, blending Shia Ismaili traditions with Egyptian heritage.',
        imageUrl: 'https://images.unsplash.com/photo-1670602328279-82c100b3dfa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2FsbGlncmFwaHklMjBhcnR8ZW58MXx8fHwxNzY2NDk1NTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Al-Muizz li-Din Allah', 'Al-Aziz Billah', 'Al-Hakim bi-Amr Allah'],
        keyAchievements: ['Foundation of Cairo', 'Al-Azhar Mosque and University', 'Al-Hakim Mosque', 'Fatimid architectural style']
      },
      {
        id: 'ayyubid',
        name: 'Ayyubid Dynasty',
        period: '1171 AD - 1250 AD',
        description: 'Founded by the legendary Saladin (Salah ad-Din), the Ayyubid dynasty ended Fatimid rule and returned Egypt to Sunni Islam. Saladin built the Citadel of Cairo and successfully defended against the Crusades. The Ayyubids strengthened Egypt\'s military power and established it as the leading power in the Islamic world.',
        imageUrl: 'https://images.unsplash.com/photo-1679161058715-201f70bbb2f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbiUyMGNvbG9zc2V1bSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjY0OTIxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Saladin (Salah ad-Din)', 'Al-Kamil', 'As-Salih Ayyub'],
        keyAchievements: ['Citadel of Cairo', 'Defense against Crusades', 'Return to Sunni Islam', 'Military madrasas']
      },
      {
        id: 'mamluk',
        name: 'Mamluk Sultanate',
        period: '1250 AD - 1517 AD',
        description: 'Former slave-soldiers who rose to power, the Mamluks created one of medieval Islam\'s most powerful states. They defeated the Mongols at the Battle of Ain Jalut, repelled the Crusaders, and made Cairo the Islamic world\'s most magnificent city. Mamluk architecture, particularly their mosques and madrasas, represents the pinnacle of Islamic architectural achievement.',
        imageUrl: 'https://images.unsplash.com/photo-1672741114521-b81677f460bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tYW4lMjBydWluc3xlbnwxfHx8fDE3NjY1MTI1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Baybars', 'Qalawun', 'Al-Nasir Muhammad', 'Qaitbay'],
        keyAchievements: ['Sultan Hassan Mosque', 'Qalawun Complex', 'Victory over Mongols', 'Islamic Cairo development', 'Mamluk architectural style']
      },
      {
        id: 'ottoman',
        name: 'Ottoman Empire',
        period: '1517 AD - 1867 AD',
        description: 'The Ottoman Turks incorporated Egypt into their vast empire, making it a vital province. While maintaining significant autonomy, Egypt contributed to Ottoman power and culture. The period saw the construction of distinctive Ottoman-style mosques with pencil-shaped minarets. Muhammad Ali Pasha later modernized Egypt while nominally under Ottoman suzerainty.',
        imageUrl: 'https://images.unsplash.com/photo-1734553592369-50155d2acb57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdHRvbWFuJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZXxlbnwxfHx8fDE3NjY1MTI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        notableRulers: ['Selim I (Conqueror)', 'Suleiman the Magnificent', 'Muhammad Ali Pasha'],
        keyAchievements: ['Muhammad Ali Mosque', 'Ottoman architectural style', 'Modernization reforms', 'Al-Rifa\'i Mosque']
      }
    ]
  }
];

export const getEraById = (id: string): Era | undefined => {
  return eras.find(era => era.id === id);
};

export const getEraColor = (eraName: string) => {
  const era = eras.find(e => e.name === eraName);
  return era ? era.color : {
    primary: 'from-gray-500 to-gray-600',
    secondary: 'bg-gray-500/20',
    badge: 'bg-gray-500/20 text-gray-700 border-gray-500/30'
  };
};