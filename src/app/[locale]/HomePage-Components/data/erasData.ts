export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Dynasty {
  id: string;
  name: LocalizedString;
  period: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  notableRulers?: LocalizedString[];
  keyAchievements?: LocalizedString[];
}

export interface Era {
  id: string;
  name: LocalizedString;
  period: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  imageUrl: string;
  color: {
    primary: string;
    secondary: string;
    badge: string;
  };
  keyCharacteristics: LocalizedString[];
  notableSites: LocalizedString[];
  historicalContext: LocalizedString;
  culturalSignificance: LocalizedString;
  architecturalStyle: LocalizedString;
  religiousBeliefs: LocalizedString;
  timeline: {
    start: number;
    end: number;
  };
  dynasties: Dynasty[];
}

export const eras: Era[] = [
  {
    id: 'pharaonic',
    name: { en: 'Ancient Egyptian', ar: 'المصريون القدماء' },
    period: { en: '3100 BC - 332 BC', ar: '3100 ق.م - 332 ق.م' },
    shortDescription: {
      en: 'The age of the pharaohs, pyramids, and hieroglyphs. Ancient Egypt\'s most iconic period spanning over 3000 years.',
      ar: 'عصر الفراعنة، الأهرامات، واللغة الهيروغليفية. الفترة الأكثر شهرة في مصر القديمة والتي تمتد لأكثر من 3000 عام.'
    },
    fullDescription: {
      en: 'The Ancient Egyptian era represents the zenith of ancient Egyptian civilization, characterized by powerful dynasties, monumental architecture, and sophisticated religious beliefs. This period witnessed the construction of the Great Pyramids, the establishment of complex bureaucratic systems, and the development of hieroglyphic writing. The pharaohs were considered divine rulers, mediating between gods and humans, and their legacy continues to fascinate the world today.',
      ar: 'تمثل الحقبة المصرية القديمة ذروة الحضارة المصرية القديمة، وتتميز بسلالات حاكمة قوية وعمارة ضخمة ومعتقدات دينية متطورة. شهدت هذه الفترة بناء الأهرامات الكبرى، وتأسيس أنظمة بيروقراطية معقدة، وتطوير الكتابة الهيروغليفية. كان ملوك الدولة القديمة يعتبرون حكاماً إلهيين، يتوسطون بين الآلهة والبشر، ولا يزال إرثهم يبهر العالم اليوم.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=80',
    color: {
      primary: 'from-yellow-500 to-amber-600',
      secondary: 'bg-yellow-500/20',
      badge: 'bg-yellow-500/20 text-white border-yellow-500/30'
    },
    keyCharacteristics: [
      { en: 'Divine kingship and pharaonic rule', ar: 'الملكية الإلهية والحكم الفرعوني' },
      { en: 'Monumental pyramid construction', ar: 'بناء الأهرامات الضخمة' },
      { en: 'Hieroglyphic writing system', ar: 'نظام الكتابة الهيروغليفية' },
      { en: 'Polytheistic religion with complex mythology', ar: 'ديانة شركية ذات أساطير معقدة' },
      { en: 'Advanced mummification practices', ar: 'ممارسات التحنيط المتقدمة' },
      { en: 'Sophisticated agricultural economy along the Nile', ar: 'اقتصاد زراعي متطور على طول نهر النيل' }
    ],
    notableSites: [
      { en: 'Great Pyramids of Giza', ar: 'أهرامات الجيزة الكبرى' },
      { en: 'Valley of the Kings', ar: 'وادي الملوك' },
      { en: 'Karnak Temple Complex', ar: 'مجمع معابد الكرنك' },
      { en: 'Abu Simbel Temples', ar: 'معابد أبو سمبل' },
      { en: 'Temple of Hatshepsut', ar: 'معبد حتشبسوت' },
      { en: 'Luxor Temple', ar: 'معبد الأقصر' }
    ],
    historicalContext: {
      en: 'The Ancient Egyptian period began with the unification of Upper and Lower Egypt around 3100 BC under King Narmer (Menes). It spanned 30 dynasties and three main periods: the Old Kingdom (pyramid builders), Middle Kingdom (classical age), and New Kingdom (empire builders). This era ended with the conquest of Egypt by Alexander the Great in 332 BC.',
      ar: 'بدأت الفترة المصرية القديمة بتوحيد مصر العليا والسفلى حوالي عام 3100 ق.م تحت حكم الملك نعرمر (مينا). شملت 30 أسرة حاكمة وثلاث فترات رئيسية: الدولة القديمة (بناة الأهرام)، الدولة الوسطى (العصر الكلاسيكي)، والدولة الحديثة (بناة الإمبراطورية). انتهى هذا العصر بغزو الإسكندر الأكبر لمصر عام 332 ق.م.'
    },
    culturalSignificance: {
      en: 'Ancient Egypt established foundational concepts in architecture, mathematics, medicine, and astronomy that influenced subsequent civilizations. The concept of the afterlife, monumental tomb architecture, and artistic conventions developed during this period have become iconic symbols of ancient Egypt.',
      ar: 'وضعت مصر القديمة مفاهيم أساسية في العمارة والرياضيات والطب وعلم الفلك أثرت على الحضارات اللاحقة. أصبح مفهوم الحياة الآخرة، وعمارة المقابر الضخمة، والاتفاقيات الفنية التي تطورت خلال هذه الفترة رموزاً أيقونية لمصر القديمة.'
    },
    architecturalStyle: {
      en: 'Characterized by massive stone structures including pyramids, temples with hypostyle halls, obelisks, and rock-cut tombs. Architecture emphasized symmetry, mathematical precision, and astronomical alignment. Extensive use of columns, hieroglyphic inscriptions, and relief carvings depicting gods and pharaohs.',
      ar: 'تميزت بالهياكل الحجرية الضخمة بما في ذلك الأهرامات والمعابد ذات القاعات الكبرى، والمسلات، والمقابر المنحوتة في الصخر. ركزت العمارة على التناظر والدقة الرياضية والمحاذاة الفلكية. استخدام مكثف للأعمدة والنقوش الهيروغليفية والمنحوتات البارزة التي تصور الآلهة الملوك.'
    },
    religiousBeliefs: {
      en: 'Complex polytheistic system with major deities including Ra (sun god), Osiris (god of the afterlife), Isis (goddess of magic), Horus (sky god), and Anubis (god of mummification). Strong belief in the afterlife led to elaborate burial practices and tomb construction. The pharaoh was considered a living god, the son of Ra.',
      ar: 'نظام شركي معقد مع آلهة رئيسية تشمل رع (إله الشمس)، أوزيريس (إله العالم الآخر)، إيزيس (إلهة السحر)، حورس (إله السماء)، وأنوبيس (إله التحنيط). أدى الإيمان القوي بالحياة الآخرة إلى ممارسات دفن متقنة وبناء مقابر. كان الفرعون يعتبر إلهاً حياً، ابن رع.'
    },
    timeline: {
      start: -3100,
      end: -332
    },
    dynasties: [
      {
        id: 'old-kingdom',
        name: { en: 'Old Kingdom (Dynasties 3-6)', ar: 'الدولة القديمة (الأسرات 3-6)' },
        period: { en: '2686 BC - 2181 BC', ar: '2686 ق.م - 2181 ق.م' },
        description: {
          en: 'Known as the "Age of the Pyramids," the Old Kingdom saw the construction of Egypt\'s most iconic monuments including the Great Pyramids of Giza and the Sphinx. This was a golden age of prosperity, strong central government, and unprecedented architectural achievement.',
          ar: 'تُعرف باسم "عصر بناة الأهرام"، شهدت الدولة القديمة بناء المعالم الأكثر شهرة في مصر بما في ذلك أهرامات الجيزة الكبرى وأبو الهول. كان هذا عصراً ذهبياً للازدهار والحكومة المركزية القوية والإنجاز المعماري غير المسبوق.'
        },
        imageUrl: 'https://images.unsplash.com/photo-1632836471674-28a2d2b132a2?w=1080&q=80',
        notableRulers: [
          { en: 'Djoser (Step Pyramid)', ar: 'زوسر (الهرم المدرج)' },
          { en: 'Khufu (Great Pyramid)', ar: 'خوفو (الهرم الأكبر)' },
          { en: 'Khafre', ar: 'خفرع' },
          { en: 'Menkaure', ar: 'منقرع' }
        ],
        keyAchievements: [
          { en: 'Great Pyramids of Giza', ar: 'أهرامات الجيزة الكبرى' },
          { en: 'Great Sphinx', ar: 'أبو الهول الكبيرة' },
          { en: 'Step Pyramid of Djoser', ar: 'هرم زوسر المدرج' },
          { en: 'Sun temples', ar: 'معابد الشمس' }
        ]
      },
      {
        id: 'middle-kingdom',
        name: { en: 'Middle Kingdom (Dynasties 11-12)', ar: 'الدولة الوسطى (الأسرات 11-12)' },
        period: { en: '2055 BC - 1650 BC', ar: '2055 ق.م - 1650 ق.م' },
        description: {
          en: 'Called the "Classical Age" of Egyptian culture, the Middle Kingdom saw the reunification of Egypt and a flourish in literature, art, and temple construction.',
          ar: 'يُطلق عليها "العصر الكلاسيكي" للثقافة المصرية، شهدت الدولة الوسطى إعادة توحيد مصر وازدهار الأدب والفن وبناء المعابد.'
        },
        imageUrl: 'https://images.unsplash.com/photo-1761143589598-25ebaeb477d9?w=1080&q=80',
        notableRulers: [
          { en: 'Mentuhotep II (Reunifier)', ar: 'منتوحتب الثاني (موحد البلاد)' },
          { en: 'Amenemhat I', ar: 'أمنمحات الأول' },
          { en: 'Senusret III', ar: 'سنوسرت الثالث' }
        ],
        keyAchievements: [
          { en: 'Karnak Temple expansion', ar: 'توسع معبد الكرنك' },
          { en: 'White Chapel at Karnak', ar: 'المقصورة البيضاء في الكرنك' },
          { en: 'Faiyum irrigation projects', ar: 'مشاريع الري في الفيوم' }
        ]
      },
      {
        id: 'new-kingdom',
        name: { en: 'New Kingdom (Dynasties 18-20)', ar: 'الدولة الحديثة (الأسرات 18-20)' },
        period: { en: '1550 BC - 1070 BC', ar: '1550 ق.م - 1070 ق.م' },
        description: {
          en: 'The New Kingdom represents Egypt\'s imperial age and greatest territorial extent. This era produced famous pharaohs like Tutankhamun and Ramses II.',
          ar: 'تمثل الدولة الحديثة العصر الإمبراطوري لمصر وأكبر توسع إقليمي لها. أنتج هذا العصر فراعنة مشهورين مثل توت عنخ آمون ورمسيس الثاني.'
        },
        imageUrl: 'https://images.unsplash.com/photo-1693654547147-24d94b4ed4ea?w=1080&q=80',
        notableRulers: [
          { en: 'Hatshepsut', ar: 'حتشبسوت' },
          { en: 'Thutmose III', ar: 'تحتمس الثالث' },
          { en: 'Akhenaten', ar: 'إخناتون' },
          { en: 'Tutankhamun', ar: 'توت عنخ آمون' },
          { en: 'Ramses II', ar: 'رمسيس الثاني' }
        ],
        keyAchievements: [
          { en: 'Valley of the Kings', ar: 'وادي الملوك' },
          { en: 'Abu Simbel Temples', ar: 'معابد أبو سمبل' },
          { en: 'Luxor Temple', ar: 'معبد الأقصر' },
          { en: 'Karnak hypostyle hall', ar: 'قاعة الأعمدة الكبرى بالكرنك' }
        ]
      }
    ]
  },
  {
    id: 'ptolemaic',
    name: { en: 'Ptolemaic', ar: 'البطلمة' },
    period: { en: '332 BC - 30 BC', ar: '332 ق.م - 30 ق.م' },
    shortDescription: {
      en: 'The Hellenistic period when Greek rulers governed Egypt, blending Greek and Egyptian cultures.',
      ar: 'الفترة الهلنستية عندما حكم الحكام اليونانيون مصر، مزجوا بين الثقافتين اليونانية والمصرية.'
    },
    fullDescription: {
      en: 'The Ptolemaic period witnessed a unique fusion of Greek and Egyptian traditions, famous for the Library of Alexandria and the Lighthouse.',
      ar: 'شهدت الفترة البطلمية اندماجاً فريداً بين التقاليد اليونانية والمصرية، واشتهرت بمكتبة الإسكندرية وفنار الإسكندرية.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80',
    color: {
      primary: 'from-purple-500 to-violet-600',
      secondary: 'bg-purple-500/20',
      badge: 'bg-purple-500/20 text-white border-purple-500/30'
    },
    keyCharacteristics: [
      { en: 'Greco-Egyptian cultural synthesis', ar: 'توليفة ثقافية يونانية مصرية' },
      { en: 'Alexandria as cultural capital', ar: 'الإسكندرية كعاصمة ثقافية' },
      { en: 'Library of Alexandria', ar: 'مكتبة الإسكندرية' }
    ],
    notableSites: [
      { en: 'Temple of Edfu', ar: 'معبد إدفو' },
      { en: 'Temple of Kom Ombo', ar: 'معبد كوم أمبو' },
      { en: 'Philae Temple Complex', ar: 'مجمع معابد فيلة' }
    ],
    historicalContext: { en: 'After Alexander\'s death, Ptolemy established a dynasty ruling for 300 years.', ar: 'بعد وفاة الإسكندر، أسس بطليموس أسرة حكمت لمدة 300 عام.' },
    culturalSignificance: { en: 'Greatest repository of knowledge in the Library of Alexandria.', ar: 'أكبر مستودع للمعرفة في مكتبة الإسكندرية.' },
    architecturalStyle: { en: 'Egyptian forms with Greek proportions.', ar: 'أشكال مصرية بنسب يونانية.' },
    religiousBeliefs: { en: 'Syncretic religion blending Greek and Egyptian gods.', ar: 'دين توفيقي يمزج بين الآلهة اليونانية والمصرية.' },
    timeline: { start: -332, end: -30 },
    dynasties: [
      {
        id: 'ptolemaic-dynasty',
        name: { en: 'Ptolemaic Dynasty', ar: 'الأسرة البطلمية' },
        period: { en: '332 BC - 30 BC', ar: '332 ق.م - 30 ق.م' },
        description: { en: 'Greek Macedonian dynasty ending with Cleopatra VII.', ar: 'أسرة مقدونية يونانية انتهت بكليوباترا السابعة.' },
        imageUrl: 'https://images.unsplash.com/photo-1761701466204-e826c4a769d5?w=1080&q=80',
        notableRulers: [
          { en: 'Ptolemy I Soter', ar: 'بطليموس الأول' },
          { en: 'Cleopatra VII', ar: 'كليوباترا السابعة' }
        ],
        keyAchievements: [
          { en: 'Library of Alexandria', ar: 'مكتبة الإسكندرية' },
          { en: 'Lighthouse of Alexandria', ar: 'فنار الإسكندرية' }
        ]
      }
    ]
  },
  {
    id: 'roman',
    name: { en: 'Roman', ar: 'الرومانية' },
    period: { en: '30 BC - 395 AD', ar: '30 ق.م - 395 م' },
    shortDescription: { en: 'Egypt as a vital province of the Roman Empire.', ar: 'مصر كولاية حيوية في الإمبراطورية الرومانية.' },
    fullDescription: { en: 'Following Cleopatra\'s defeat, Egypt became a key provider of grain to Rome.', ar: 'بعد هزيمة كليوباترا، أصبحت مصر مزوداً رئيسياً للحبوب لروما.' },
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    color: {
      primary: 'from-red-500 to-rose-600',
      secondary: 'bg-red-500/20',
      badge: 'bg-red-500/20 text-white border-red-500/30'
    },
    keyCharacteristics: [
      { en: 'Egypt as Rome\'s breadbasket', ar: 'مصر سلة غذاء روما' },
      { en: 'Fayum mummy portraits', ar: 'بورتريهات الفيوم للمومياوات' }
    ],
    notableSites: [
      { en: 'Philae Temple', ar: 'معبد فيلة' },
      { en: 'Roman Amphitheatre', ar: 'المسرح الروماني' }
    ],
    historicalContext: { en: 'Egypt became a Roman province in 30 BC.', ar: 'أصبحت مصر ولاية رومانية عام 30 ق.م.' },
    culturalSignificance: { en: 'Unique blend of Egyptian burial and Roman art.', ar: 'مزيج فريد من الدفن المصري والفن الروماني.' },
    architecturalStyle: { en: 'Egyptian temples with Roman engineering.', ar: 'معابد مصرية بهندسة رومانية.' },
    religiousBeliefs: { en: 'Rise of Christianity and gradual decline of old gods.', ar: 'صعود المسيحية والتراجع التدريجي للآلهة القديمة.' },
    timeline: { start: -30, end: 395 },
    dynasties: [
      {
        id: 'julio-claudian',
        name: { en: 'Julio-Claudian Dynasty', ar: 'الأسرة اليوليوكلاودية' },
        period: { en: '30 BC - 68 AD', ar: '30 ق.م - 68 م' },
        description: { en: 'First Roman dynasty to rule Egypt.', ar: 'أول أسرة رومانية تحكم مصر.' },
        imageUrl: 'https://images.unsplash.com/photo-1569870483127-1f9608554db4?w=1080&q=80'
      }
    ]
  },
  {
    id: 'byzantine',
    name: { en: 'Byzantine', ar: 'البيزنطية' },
    period: { en: '395 AD - 641 AD', ar: '395 م - 641 م' },
    shortDescription: { en: 'Christian Egypt under Eastern Roman rule.', ar: 'مصر المسيحية تحت حكم الإمبراطورية الرومانية الشرقية.' },
    fullDescription: { en: 'Dominance of the Coptic Orthodox Church and monastic traditions.', ar: 'سيادة الكنيسة القبطية الأرثوذكسية وتقاليد الرهبنة.' },
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80',
    color: {
      primary: 'from-blue-500 to-cyan-600',
      secondary: 'bg-blue-500/20',
      badge: 'bg-blue-500/20 text-white border-blue-500/30'
    },
    keyCharacteristics: [
      { en: 'Coptic Christianity', ar: 'المسيحية القبطية' },
      { en: 'Monastic movement', ar: 'الحركة الرهبانية' }
    ],
    notableSites: [
      { en: 'St. Catherine\'s Monastery', ar: 'دير سانت كاترين' },
      { en: 'Red Monastery', ar: 'الدير الأحمر' }
    ],
    historicalContext: { en: 'Egypt became part of the Byzantine Empire after the Roman split.', ar: 'أصبحت مصر جزءاً من الإمبراطورية البيزنطية بعد انقسام روما.' },
    culturalSignificance: { en: 'Development of Coptic art and liturgy.', ar: 'تطور الفن والقبطي والليتورجيا.' },
    architecturalStyle: { en: 'Basilica plans with domes.', ar: 'تخطيطات البازيليكا مع القباب.' },
    religiousBeliefs: { en: 'Coptic Orthodox Christianity.', ar: 'المسيحية القبطية الأرثوذكسية.' },
    timeline: { start: 395, end: 641 },
    dynasties: []
  },
  {
    id: 'islamic',
    name: { en: 'Islamic', ar: 'الإسلامية' },
    period: { en: '641 AD - Present', ar: '641 م - الحالي' },
    shortDescription: { en: 'Egypt\'s transformation into a major Islamic center.', ar: 'تحول مصر إلى مركز إسلامي رئيسي.' },
    fullDescription: { en: 'The age of magnificent mosques and the foundation of Cairo.', ar: 'عصر المساجد الرائعة وتأسيس القاهرة.' },
    imageUrl: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80',
    color: {
      primary: 'from-green-500 to-emerald-600',
      secondary: 'bg-green-500/20',
      badge: 'bg-green-500/20 text-white border-green-500/30'
    },
    keyCharacteristics: [
      { en: 'Islamic architecture', ar: 'العمارة الإسلامية' },
      { en: 'Cairo as capital', ar: 'القاهرة كعاصمة' }
    ],
    notableSites: [
      { en: 'Al-Azhar Mosque', ar: 'الجامع الأزهر' },
      { en: 'Citadel of Cairo', ar: 'قلعة القاهرة' }
    ],
    historicalContext: { en: 'Islamic rule began with the Arab conquest in 641 AD.', ar: 'بدأ الحكم الإسلامي بالفتح العربي عام 641 م.' },
    culturalSignificance: { en: 'Center of learning and Al-Azhar University.', ar: 'مركز للتعلم وجامعة الأزهر.' },
    architecturalStyle: { en: 'Mosques, minarets, and geometric patterns.', ar: 'المساجد والمآذن والأنماط الهندسية.' },
    religiousBeliefs: { en: 'Predominantly Sunni Islam.', ar: 'الإسلام السني بشكل أساسي.' },
    timeline: { start: 641, end: 2024 },
    dynasties: [
      {
        id: 'fatimid',
        name: { en: 'Fatimid Caliphate', ar: 'الخلافة الفاطمية' },
        period: { en: '969 AD - 1171 AD', ar: '969 م - 1171 م' },
        description: { en: 'Founders of Cairo and Al-Azhar.', ar: 'مؤسسو القاهرة والأزهر.' },
        imageUrl: 'https://images.unsplash.com/photo-1670602328279-82c100b3dfa8?w=1080&q=80'
      }
    ]
  }
];

export const getEraById = (id: string): Era | undefined => {
  return eras.find(era => era.id === id);
};

export const getEraColor = (eraName: string) => {
  const era = eras.find(e => e.name.en === eraName);
  return era ? era.color : {
    primary: 'from-gray-500 to-gray-600',
    secondary: 'bg-gray-500/20',
    badge: 'bg-gray-500/20 text-gray-700 border-gray-500/30'
  };
};