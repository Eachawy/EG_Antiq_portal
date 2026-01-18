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
    imageUrl: '/styles/images/ancient_Egypt/photo_1.jpeg',
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
        imageUrl: '/styles/images/ancient_Egypt/photo_2.jpeg',
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
        imageUrl: '/styles/images/ancient_Egypt/photo_3.jpeg',
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
        imageUrl: '/styles/images/ancient_Egypt/photo_4.jpeg',
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
    imageUrl: '/styles/images/ptolemaic/photo_1.jpeg',
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
        imageUrl: '/styles/images/ptolemaic/photo_2.jpeg',
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
    imageUrl: '/styles/images/roman/photo_1.jpeg',
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
        description: { en: 'The first Roman dynasty to rule Egypt, beginning with Augustus (Octavian) who defeated Cleopatra VII. Egypt became the personal property of the emperor, governed by a prefect. The Julio-Claudians maintained Egyptian temples and religious practices while introducing Roman administration, architecture, and customs. This period saw continued prosperity and the beginning of Egypt\'s Christian era.', ar: 'أول أسرة رومانية تحكم مصر، بدأت مع أغسطس (أوكتافيان) الذي هزم كليوباترا السابعة. أصبحت مصر ملكية شخصية للإمبراطور، يحكمها محافظ. حافظ اليوليوكلاوديون على المعابد المصرية والممارسات الدينية مع إدخال الإدارة الرومانية والهندسة المعمارية والعادات. شهدت هذه الفترة استمرار الازدهار وبداية العصر المسيحي في مصر.' },
        imageUrl: '/styles/images/roman/photo_2.jpeg',
        notableRulers: [{ en: 'Augustus (Octavian)', ar: 'أغسطس (أوكتافيان)' }, { en: 'Tiberius', ar: 'تيبريوس' }, { en: 'Claudius', ar: 'كلوديوس' }, { en: 'Nero', ar: 'نيرون' }],
        keyAchievements: [{ en: 'Temple of Dendur', ar: 'معبد دندور' }, { en: 'Roman administrative system', ar: 'النظام الإداري الروماني' }, { en: 'Egyptian grain trade', ar: 'تجارة الحبوب المصرية' }, { en: 'Fayum mummy portraits', ar: 'بورتريهات الفيوم للمومياوات' }]
      },
      {
        id: 'flavian-antonine',
        name: { en: 'Flavian to Antonine Period', ar: 'العهد الفلافي إلى الأنطوني' },
        period: { en: '69 AD - 235 AD', ar: '69 م - 235 م' },
        description: { en: 'A period of relative stability and prosperity under the Flavian and Antonine dynasties. Egypt continued to serve as Rome\'s breadbasket while experiencing cultural flourishing. The famous Fayum mummy portraits reached their height. Christianity began spreading through Egypt, with Alexandria becoming a major center of Christian theology. Traditional Egyptian religious practices coexisted with Roman and emerging Christian worship.', ar: 'فترة من الاستقرار النسبي والازدهار تحت حكم الأسرتين الفلافية والأنطونية. استمرت مصر كـ \'سلة غذاء\' لروما بينما كانت تشهد ازدهارًا ثقافيًا. بلغت بورتريهات الفيوم الشهيرة ذروتها. بدأ انتشار المسيحية في مصر، وأصبحت الإسكندرية مركزًا رئيسيًا للاهوت المسيحي. تعايشت الممارسات الدينية المصرية التقليدية مع العبادة الرومانية والمسيحية الناشئة.' },
        imageUrl: '/styles/images/roman/photo_3.jpeg',
        notableRulers: [{ en: 'Vespasian', ar: 'فسبازيان' }, { en: 'Trajan', ar: 'تراجان' }, { en: 'Hadrian', ar: 'هادريان' }, { en: 'Marcus Aurelius', ar: 'ماركوس أوريليوس' }],
        keyAchievements: [{ en: 'Kom Ombo Temple completion', ar: 'اكتمال معبد كوم أمبو' }, { en: 'Philae Temple expansion', ar: 'توسعة معبد فيلة' }, { en: 'Alexandria library continuation', ar: 'استمرار مكتبة الإسكندرية' }, { en: 'Rise of Alexandrian Christianity', ar: 'صعود المسيحية الإسكندرية' }]
      },
      {
        id: 'diocletian-constantine',
        name: { en: 'Late Empire (Diocletian-Constantine)', ar: 'العهد المتأخر (ديوكلتيان-قسطنطين)' },
        period: { en: '284 AD - 395 AD', ar: '284 م - 395 م' },
        description: { en: 'The final period of unified Roman rule saw major administrative reforms under Diocletian and the legalization of Christianity under Constantine. Egypt endured the Great Persecution (303-313 AD) which created many Coptic martyrs. Constantine\'s Edict of Milan (313 AD) allowed Christianity to flourish openly. This era witnessed the decline of traditional Egyptian religion and the emergence of Christian Egypt, setting the stage for the Byzantine period.', ar: 'شهدت الفترة الأخيرة من الحكم الروماني الموحد إصلاحات إدارية كبرى في عهد ديوكلتيان وإضفاء الشرعية على المسيحية في عهد قسطنطين. عانت مصر من الاضطهاد الكبير (303-313 م) الذي أدى إلى استشهاد العديد من الأقباط. سمح مرسوم ميلانو لقسطنطين (313 م) للمسيحية بالازدهار علنًا. شهد هذا العصر تراجع الدين المصري التقليدي وظهور مصر المسيحية، مما مهد الطريق للفترة البيزنطية.' },
        imageUrl: '/styles/images/roman/photo_4.jpeg',
        notableRulers: [{ en: 'Diocletian', ar: 'ديوكلتيان' }, { en: 'Constantine the Great', ar: 'قسطنطين العظيم' }, { en: 'Theodosius I', ar: 'ثيودوسيوس الأول' }],
        keyAchievements: [{ en: 'Diocletian\'s administrative reforms', ar: 'إصلاحات ديوكلتيان الإدارية' }, { en: 'Legalization of Christianity', ar: 'إضفاء الشرعية على المسيحية' }, { en: 'Early Coptic churches', ar: 'الكنائس القبطية المبكرة' }, { en: 'Beginning of monastic movement', ar: 'بداية الحركة الرهبانية' }]
      }
    ]
  },
  {
    id: 'byzantine',
    name: { en: 'Byzantine', ar: 'البيزنطية' },
    period: { en: '395 AD - 641 AD', ar: '395 م - 641 م' },
    shortDescription: { en: 'Christian Egypt under Eastern Roman rule.', ar: 'مصر المسيحية تحت حكم الإمبراطورية الرومانية الشرقية.' },
    fullDescription: { en: 'Dominance of the Coptic Orthodox Church and monastic traditions.', ar: 'سيادة الكنيسة القبطية الأرثوذكسية وتقاليد الرهبنة.' },
    imageUrl: '/styles/images/byzantine/photo_1.jpeg',
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
    dynasties: [
      {
        id: 'theodosian-heraclian',
        name: { en: 'Theodosian to Heraclian Period', ar: 'العهد الثيودوسي إلى الهراكلي' },
        period: { en: '395 AD - 641 AD', ar: '395 م - 641 م' },
        description: { en: 'Egypt as a Byzantine province witnessed the full Christianization of Egyptian society under the Theodosian and Heraclian dynasties. The Coptic Orthodox Church emerged as a distinct entity during the Council of Chalcedon (451 AD), which created a lasting schism between Egyptian and Byzantine Christianity. Despite religious tensions and heavy taxation, this period saw remarkable achievements in Christian monasticism, art, and theology. The era ended with the Arab Islamic conquest in 641 AD.', ar: 'أصبحت مصر ولاية بيزنطية شهدت تنصيرًا كاملاً للمجتمع المصري تحت حكم السلالتين الثيودوسية والهراكلي. نشأت الكنيسة القبطية الأرثوذكسية ككيان متميز خلال مجمع خلقيدونية (451 م)، مما أدى إلى انقسام دائم بين المسيحية المصرية والبيزنطية. على الرغم من التوترات الدينية والضرائب الباهظة، شهدت هذه الفترة إنجازات ملحوظة في الرهبنة المسيحية والفن واللاهوت. انتهى العصر بالغزو الإسلامي العربي عام 641 م.' },
        imageUrl: '/styles/images/byzantine/photo_2.jpeg',
        notableRulers: [{ en: 'Theodosius I', ar: 'ثيودوسيوس الأول' }, { en: 'Justinian I', ar: 'جستنيان الأول' }, { en: 'Heraclius', ar: 'هراكليوس' }],
        keyAchievements: [{ en: 'Monastery of St. Catherine', ar: 'دير سانت كاترين' }, { en: 'White and Red Monasteries', ar: 'الدير الأبيض والأحمر' }, { en: 'Coptic art flowering', ar: 'ازدهار الفن القبطي' }, { en: 'School of Alexandria theology', ar: 'لاهوت مدرسة الإسكندرية' }, { en: 'Desert monasticism', ar: 'الرهبنة الصحراوية' }]
      },
      {
        id: 'coptic-church',
        name: { en: 'Coptic Church Development', ar: 'تطور الكنيسة القبطية' },
        period: { en: '451 AD - 641 AD', ar: '451 م - 641 م' },
        description: { en: 'Following the Council of Chalcedon, the Coptic Orthodox Church developed its distinct identity, emphasizing the Miaphysite doctrine. This period saw the construction of numerous monasteries and churches throughout Egypt. Coptic became a written language for religious texts. The monastic movement reached its zenith with thousands of monks living in desert communities. Coptic art developed its characteristic style, blending Byzantine influences with ancient Egyptian motifs.', ar: 'بعد مجمع خلقيدونية، طورت الكنيسة القبطية الأرثوذكسية هويتها المتميزة، مؤكدة على عقيدة الميافيسية. شهدت هذه الفترة بناء العديد من الأديرة والكنائس في جميع أنحاء مصر. أصبحت اللغة القبطية لغة مكتوبة للنصوص الدينية. بلغت الحركة الرهبانية ذروتها مع آلاف الرهبان الذين يعيشون في مجتمعات صحراوية. تطور الفن القبطي بأسلوبه المميز، الذي يمزج بين التأثيرات البيزنطية والزخارف المصرية القديمة.' },
        imageUrl: '/styles/images/byzantine/photo_3.jpeg',
        notableRulers: [{ en: 'Coptic Patriarchs: Dioscorus I', ar: 'البطرياركية القبطية: ديسقوروس الأول' }, { en: 'Timothy Aelurus', ar: 'تيموثاوس الأول' }, { en: 'Benjamin I', ar: 'بنيامين الأول' }],
        keyAchievements: [{ en: 'Wadi Natrun monasteries', ar: 'أديرة وادي النطرون' }, { en: 'Abu Mena pilgrimage site', ar: 'موقع الحج أبو مينا' }, { en: 'Coptic literature', ar: 'الأدب القبطي' }, { en: 'Distinctive liturgy development', ar: 'تطور الليتورجيا المميزة' }, { en: 'Icon painting tradition', ar: 'تقليد رسم الأيقونات' }]
      }
    ]
  },
  {
    id: 'islamic',
    name: { en: 'Islamic', ar: 'الإسلامية' },
    period: { en: '641 AD - Present', ar: '641 م - الحالي' },
    shortDescription: { en: 'Egypt\'s transformation into a major Islamic center.', ar: 'تحول مصر إلى مركز إسلامي رئيسي.' },
    fullDescription: { en: 'The age of magnificent mosques and the foundation of Cairo.', ar: 'عصر المساجد الرائعة وتأسيس القاهرة.' },
    imageUrl: '/styles/images/islamic/photo_1.jpeg',
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
        id: 'umayyad',
        name: { en: 'Umayyad Caliphate', ar: 'الخلافة الأموية' },
        period: { en: '661 AD - 750 AD', ar: '661 م - 750 م' },
        description: { en: 'The first major Islamic dynasty to rule Egypt after the Rashidun Caliphate. The Umayyads governed from Damascus and transformed Egypt into a vital province of their expanding empire. They introduced Arabic as the administrative language and established the foundations of Islamic governance in Egypt, including the construction of early mosques.', ar: 'كانت الدولة الأموية أول سلالة إسلامية كبرى تحكم مصر بعد الخلافة الراشدة. حكمت الدولة الأموية من دمشق وحولت مصر إلى ولاية حيوية ضمن إمبراطوريتها المتنامية. أدخلت اللغة العربية لغةً إدارية، وأرست أسس الحكم الإسلامي في مصر، بما في ذلك بناء المساجد الأولى.' },
        imageUrl: '/styles/images/islamic/photo_2.jpeg',
        notableRulers: [
          { en: 'Muawiyah ibn Abi Sufyan', ar: 'معاوية بن ابي سفيان' },
          { en: 'Abd al-Malik ibn Marwan', ar: 'عبد المالك بن مروان' },
          { en: 'Umar ibn Abd al-Aziz', ar: 'عمر بن عبد العزيز' },
        ],
        keyAchievements: [
          { en: 'Mosque of Amr ibn al-As expansion', ar: 'تمديد مسجد عمرو بن العاص' },
          { en: 'Arabic administrative system', ar: 'نظام إداري عربي' },
          { en: 'Islamic coinage introduction', ar: 'مقدمة عن العملات الإسلامية' }
        ]
      },
      {
        id: 'abbasid',
        name: { en: 'Abbasid Caliphate', ar: 'الإمبراطورية العباسية' },
        period: { en: '750 AD - 969 AD', ar: '750 م - 969 م' },
        description: { en: 'The Abbasids overthrew the Umayyads and ruled from Baghdad, ushering in the Islamic Golden Age. Under Abbasid rule, Egypt became a center of learning and commerce. The period saw significant cultural and scientific achievements, with Egyptian scholars contributing to mathematics, astronomy, and medicine.', ar: 'أطاح العباسيون بالأمويين وحكموا من بغداد، مُدشّنين بذلك العصر الذهبي للإسلام. في ظل الحكم العباسي، أصبحت مصر مركزًا للعلم والتجارة. وشهدت تلك الفترة إنجازات ثقافية وعلمية بارزة، حيث أسهم العلماء المصريون في الرياضيات والفلك والطب.' },
        imageUrl: '/styles/images/islamic/photo_3.jpeg',
        notableRulers: [
          { en: 'Al-Mansur', ar: 'المنصور' },
          { en: 'Harun al-Rashid', ar: 'هارون الرشيد' },
          { en: 'Al-Mamun', ar: 'المامون' },
        ],
        keyAchievements: [
          { en: 'Ibn Tulun Mosque', ar: 'مسجد ابن طولون' },
          { en: 'House of Wisdom influences', ar: 'تأثيرات بيت الحكمة' },
          { en: 'Commercial prosperity', ar: 'ازدهار تجاري' }
        ]
      },
      {
        id: 'fatimid',
        name: { en: 'Fatimid Caliphate', ar: 'الخلافة الفاطمية' },
        period: { en: '969 AD - 1171 AD', ar: '969 م - 1171 م' },
        description: { en: 'The Fatimids founded Cairo in 969 AD and established it as their capital, creating one of the Islamic world\'s greatest cities. They built Al-Azhar Mosque and University, which remains a premier center of Islamic learning. Fatimid Egypt witnessed remarkable achievements in architecture, art, and scholarship, blending Shia Ismaili traditions with Egyptian heritage.', ar: 'أسس الفاطميون القاهرة عام 969 ميلاديًا وجعلوها عاصمتهم، فأنشأوا بذلك إحدى أعظم مدن العالم الإسلامي. وبنوا جامع الأزهر وجامعته، اللذين لا يزالان مركزًا رائدًا للعلوم الإسلامية. وشهدت مصر الفاطمية إنجازاتٍ بارزة في العمارة والفنون والعلوم، ممزوجةً بين التقاليد الشيعية الإسماعيلية والتراث المصري.' },
        imageUrl: '/styles/images/islamic/photo_4.jpeg',
        notableRulers: [
          { en: 'Al-Muizz li-Din Allah', ar: 'المعز لدين الله' },
          { en: 'Al-Aziz Billah', ar: 'العزيز بالله' },
          { en: 'Al-Hakim bi-Amr Allah', ar: 'الحاكم بأمر الله' },
        ],
        keyAchievements: [
          { en: 'Foundation of Cairo', ar: 'تأسيس القاهرة' },
          { en: 'Al-Azhar Mosque and University', ar: 'جامع وجامعة الأزهر' },
          { en: 'Al-Hakim Mosque', ar: 'مسجد الحاكم' },
          { en: 'Fatimid architectural style', ar: 'الطراز المعماري الفاطمي' }
        ]
      },
      {
        id: 'ayyubid',
        name: { en: 'Ayyubid Dynasty', ar: 'الدولة الأيوبية' },
        period: { en: '1171 AD - 1250 AD', ar: '1171 م - 1250 م' },
        description: { en: 'Founded by the legendary Saladin (Salah ad-Din), the Ayyubid dynasty ended Fatimid rule and returned Egypt to Sunni Islam. Saladin built the Citadel of Cairo and successfully defended against the Crusades. The Ayyubids strengthened Egypt\'s military power and established it as the leading power in the Islamic world.', ar: 'أسس الدولة الأيوبية القائد الأسطوري صلاح الدين الأيوبي، الذي أنهى حكم الفاطميين وأعاد مصر إلى الإسلام السني. بنى صلاح الدين قلعة القاهرة ودافع عنها بنجاح ضد الحروب الصليبية. عزز الأيوبيون القوة العسكرية لمصر وجعلوها القوة الرائدة في العالم الإسلامي.' },
        imageUrl: '/styles/images/islamic/photo_5.jpeg',
        notableRulers: [
          { en: 'Saladin (Salah ad-Din)', ar: 'صلاح الدين' },
          { en: 'Al-Kamil', ar: 'الكامل' },
          { en: 'As-Salih Ayyub', ar: 'الصالح أيوب' },
        ],
        keyAchievements: [
          { en: 'Citadel of Cairo', ar: 'قصر القاهرة' },
          { en: 'Defense against Crusades', ar: 'الدفاع ضد الحروب الصليبية' },
          { en: 'Return to Sunni Islam', ar: 'العودة إلى الإسلام السني' },
          { en: 'Military madrasas', ar: 'المدارس العسكرية' }
        ]
      },
      {
        id: 'mamluk',
        name: { en: 'Mamluk Sultanate', ar: 'المماليك' },
        period: { en: '1250 AD - 1517 AD', ar: '1250 م - 1517 م' },
        description: { en: 'Former slave-soldiers who rose to power, the Mamluks created one of medieval Islam\'s most powerful states. They defeated the Mongols at the Battle of Ain Jalut, repelled the Crusaders, and made Cairo the Islamic world\'s most magnificent city. Mamluk architecture, particularly their mosques and madrasas, represents the pinnacle of Islamic architectural achievement.', ar: 'المماليك، وهم جنود عبيد سابقون ارتقوا إلى السلطة، أسسوا إحدى أقوى دول الإسلام في العصور الوسطى. هزموا المغول في معركة عين جالوت، وصدوا الصليبيين، وجعلوا من القاهرة أروع مدن العالم الإسلامي. تمثل العمارة المملوكية، ولا سيما مساجدهم ومدارسهم، ذروة الإنجاز المعماري الإسلامي.' },
        imageUrl: '/styles/images/islamic/photo_6.jpeg',
        notableRulers: [
          { en: 'Baybars', ar: 'بيبارس' },
          { en: 'Qalawun', ar: 'قلاون' },
          { en: 'Al-Nasir Muhammad', ar: 'الناصر محمد' },
          { en: 'Qaitbay', ar: 'قيتباي' },
        ],
        keyAchievements: [
          { en: 'Sultan Hassan Mosque', ar: 'مسجد السلطان حسن' },
          { en: 'Qalawun Complex', ar: 'مجمع قلاوون' },
          { en: 'Victory over Mongols', ar: 'الانتصار على المغول' },
          { en: 'Islamic Cairo development', ar: 'تطوير القاهرة الإسلامية' },
          { en: 'Mamluk architectural style', ar: 'الطراز المعماري المملوكي' }
        ]
      },
      {
        id: 'ottoman',
        name: { en: 'Ottoman Empire', ar: 'الإمبراطورية العثمانية' },
        period: { en: '1517 AD - 1867 AD', ar: '1517 م - 1867 م' },
        description: { en: 'The Ottoman Turks incorporated Egypt into their vast empire, making it a vital province. While maintaining significant autonomy, Egypt contributed to Ottoman power and culture. The period saw the construction of distinctive Ottoman-style mosques with pencil-shaped minarets. Muhammad Ali Pasha later modernized Egypt while nominally under Ottoman suzerainty.', ar: 'ضمّ العثمانيون مصر إلى إمبراطوريتهم الشاسعة، جاعلين منها ولايةً حيوية. ورغم احتفاظها بقدر كبير من الاستقلال الذاتي، أسهمت مصر في تعزيز قوة الدولة العثمانية وثقافتها. وشهدت تلك الفترة بناء مساجد مميزة على الطراز العثماني، ذات مآذن على شكل قلم رصاص. وفي وقت لاحق، قام محمد علي باشا بتحديث مصر، بينما كانت اسميًا تحت السيادة العثمانية.' },
        imageUrl: '/styles/images/islamic/photo_7.jpeg',
        notableRulers: [
          { en: 'Selim I (Conqueror)', ar: 'سليم الأول (الإمبراطور)' },
          { en: 'Suleiman the Magnificent', ar: 'سليمان الكبير' },
          { en: 'Muhammad Ali Pasha', ar: 'محمد علي باشا' },
        ],
        keyAchievements: [
          { en: 'Muhammad Ali Mosque', ar: 'مسجد محمد علي' },
          { en: 'Ottoman architectural style', ar: 'الطراز المعماري العثماني' },
          { en: 'Modernization reforms', ar: 'إصلاحات حديثة' },
          { en: 'Al-Rifa\'i Mosque', ar: 'مسجد الرفاعي' }
        ]
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