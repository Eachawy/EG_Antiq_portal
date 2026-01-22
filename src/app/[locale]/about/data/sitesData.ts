export interface LocalizedString {
  en: string;
  ar: string;
}

export interface ArchaeologicalSite {
  id: string;
  name: LocalizedString;
  location: {
    city: LocalizedString;
    governorate: LocalizedString;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  historicalPeriod: 'Ancient Egyptian' | 'Ptolemaic' | 'Roman' | 'Byzantine' | 'Islamic';
  dynasty: LocalizedString;
  dateRange: {
    start: number; // BCE negative, CE positive
    end: number;
  };
  description: LocalizedString;
  significance: LocalizedString;
  imageUrl: string;
  thumbnailUrl: string;
  gallery: string[];
  nearbySites: string[]; // IDs of nearby sites
}

// Dynasty lists organized by historical period
export const dynastiesByPeriod: Record<string, string[]> = {
  'Ancient Egyptian': [
    'Fourth Dynasty',
    'Eleventh Dynasty',
    'Twelfth Dynasty',
    'Eighteenth Dynasty',
    'Nineteenth Dynasty',
    'Twentieth Dynasty',
    'Twenty-sixth Dynasty',
  ],
  Ptolemaic: ['Ptolemaic Dynasty'],
  Roman: ['Roman Empire'],
  Byzantine: ['Byzantine Empire'],
  Islamic: [
    'Umayyad Caliphate',
    'Abbasid Caliphate',
    'Fatimid Caliphate',
    'Ayyubid Dynasty',
    'Mamluk Sultanate',
    'Ottoman Empire',
  ],
};

export const archaeologicalSites: ArchaeologicalSite[] = [
  {
    id: 'great-pyramid-giza',
    name: {
      en: 'The Great Pyramid of Khufu',
      ar: 'هرم خوفو الأكبر',
    },
    location: {
      city: { en: 'Giza', ar: 'الجيزة' },
      governorate: { en: 'Giza', ar: 'الجيزة' },
      coordinates: {
        lat: 29.9792,
        lng: 31.1342,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: { en: 'Fourth Dynasty', ar: 'الأسرة الرابعة' },
    dateRange: {
      start: -2580,
      end: -2560,
    },
    description: {
      en: 'The Great Pyramid is the oldest and largest of the three pyramids in the Giza pyramid complex. Originally standing at 146.5 meters, it was the tallest man-made structure in the world for over 3,800 years. Built as a tomb for Pharaoh Khufu of the Fourth Dynasty, it consists of an estimated 2.3 million limestone blocks.',
      ar: 'الهرم الأكبر هو الأقدم والأكبر بين الأهرامات الثلاثة في مجمع أهرامات الجيزة. كان يبلغ ارتفاعه في الأصل 146.5 مترًا، وكان أطول هيكل من صنع الإنسان في العالم لأكثر من 3800 عام. بُني كمقبرة للفرعون خوفو من الأسرة الرابعة، ويتكون من حوالي 2.3 مليون كتلة من الحجر الجيري.'
    },
    significance: {
      en: 'The only surviving member of the Seven Wonders of the Ancient World, representing the pinnacle of Old Kingdom pyramid construction and demonstrating advanced engineering knowledge.',
      ar: 'العضو الوحيد المتبقي من عجائب الدنيا السبع في العالم القديم، ويمثل ذروة بناء الأهرامات في الدولة القديمة ويظهر معرفة هندسية متقدمة.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1758546705512-2071bf8dc17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0JTIwc3Vuc2V0fGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1758546705512-2071bf8dc17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0JTIwc3Vuc2V0fGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['great-sphinx-giza', 'pyramid-khafre'],
  },
  {
    id: 'great-sphinx-giza',
    name: {
      en: 'The Great Sphinx of Giza',
      ar: 'تمثال أبو الهول',
    },
    location: {
      city: { en: 'Giza', ar: 'الجيزة' },
      governorate: { en: 'Giza', ar: 'الجيزة' },
      coordinates: {
        lat: 29.9753,
        lng: 31.1376,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: { en: 'Fourth Dynasty', ar: 'الأسرة الرابعة' },
    dateRange: {
      start: -2558,
      end: -2532,
    },
    description: {
      en: 'The Great Sphinx is a limestone statue featuring the head of a human and the body of a lion. Carved from a single massive limestone outcrop, it measures 73 meters long and 20 meters high. The face is believed to represent Pharaoh Khafre.',
      ar: 'تمثال أبو الهول هو تمثال من الحجر الجيري يتميز برأس إنسان وجسم أسد. نُحت من نتوء واحد ضخم من الحجر الجيري، ويبلغ طوله 73 مترًا وارتفاعه 20 مترًا. ويُعتقد أن الوجه يمثل الفرعون خفرع.'
    },
    significance: {
      en: 'One of the world\'s largest and oldest monolith statues, symbolizing strength and wisdom, guarding the Giza plateau for over 4,500 years.',
      ar: 'واحد من أكبر وأقدم التماثيل المتجانسة في العالم، يرمز إلى القوة والحكمة، ويحرس هضبة الجيزة لأكثر من 4500 عام.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1550382458-b69e98440a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBzcGhpbnh8ZW58MXx8fHwxNzY2MzM4OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550382458-b69e98440a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBzcGhpbnh8ZW58MXx8fHwxNzY2MzM4OTk2fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['great-pyramid-giza', 'pyramid-khafre'],
  },
  {
    id: 'karnak-temple',
    name: {
      en: 'Temple Complex of Karnak',
      ar: 'معبد الكرنك',
    },
    location: {
      city: { en: 'Luxor', ar: 'الأقصر' },
      governorate: { en: 'Luxor', ar: 'الأقصر' },
      coordinates: {
        lat: 25.7188,
        lng: 32.6573,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: { en: 'Eleventh Dynasty', ar: 'الأسرة الحادية عشرة' },
    dateRange: {
      start: -2055,
      end: -100,
    },
    description: {
      en: 'Karnak is a vast complex of temples, chapels, pylons, and other buildings. It was the main place of worship of the Theban Triad: Amun, Mut, and Khonsu. The Great Hypostyle Hall features 134 massive columns arranged in 16 rows.',
      ar: 'الكرنك هو مجمع واسع من المعابد والمصليات والأبراج والمباني الأخرى. كان مكان العبادة الرئيسي لثالوث طيبة: آمون وموت وخونسو. تتميز قاعة الأعمدة الكبرى بـ 134 عمودًا ضخمًا مرتبة في 16 صفًا.'
    },
    significance: {
      en: 'The largest religious building ever constructed, representing nearly 2,000 years of continuous construction and modification across multiple dynasties.',
      ar: 'أكبر مبنى ديني تم بناؤه على الإطلاق، ويمثل ما يقرب من 2000 عام من البناء والتعديل المستمر عبر سلالات متعددة.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1678640982613-70150a406d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJuYWslMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY2MzM5NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1678640982613-70150a406d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJuYWslMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY2MzM5NDI1fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['luxor-temple', 'valley-of-kings'],
  },
  {
    id: 'luxor-temple',
    name: {
      en: 'Luxor Temple',
      ar: 'معبد الأقصر',
    },
    location: {
      city: { en: 'Luxor', ar: 'الأقصر' },
      governorate: { en: 'Luxor', ar: 'الأقصر' },
      coordinates: {
        lat: 25.6995,
        lng: 32.6391,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: { en: 'Eighteenth Dynasty', ar: 'الأسرة الثامنة عشرة' },
    dateRange: {
      start: -1400,
      end: -1000,
    },
    description: {
      en: 'Luxor Temple is dedicated to the rejuvenation of kingship. Built by Amenhotep III and expanded by Ramesses II, it features the massive First Pylon, the Avenue of Sphinxes, and beautifully illuminated structures at night.',
      ar: 'معبد الأقصر مكرس لتجديد الملكية. بناه أمنحتب الثالث ووسعه رمسيس الثاني، ويتميز ببرج أول ضخم وطريق الكباش وهياكل مضاءة بشكل جميل في الليل.'
    },
    significance: {
      en: 'A testament to New Kingdom architecture, hosting the annual Opet Festival and serving as a coronation site for pharaohs.',
      ar: 'شهادة على عمارة الدولة الحديثة، واستضافة مهرجان أوبت السنوي والعمل كموقع تتويج للفراعنة.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1664143197909-98b1f258e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXhvciUyMHRlbXBsZSUyMG5pZ2h0fGVufDF8fHx8MTc2NjIzNzQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1664143197909-98b1f258e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXhvciUyMHRlbXBsZSUyMG5pZ2h0fGVufDF8fHx8MTc2NjIzNzQwNnww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['karnak-temple', 'valley-of-kings'],
  },
  {
    id: 'valley-of-kings',
    name: {
      en: 'Valley of the Kings',
      ar: 'وادي الملوك',
    },
    location: {
      city: { en: 'Luxor', ar: 'الأقصر' },
      governorate: { en: 'Luxor', ar: 'الأقصر' },
      coordinates: {
        lat: 25.7402,
        lng: 32.6014,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: { en: 'Eighteenth Dynasty', ar: 'الأسرة الثامنة عشرة' },
    dateRange: {
      start: -1539,
      end: -1075,
    },
    description: {
      en: 'A valley containing 63 rock-cut tombs for pharaohs and nobles of the New Kingdom. Most famous for the tomb of Tutankhamun (KV62), discovered nearly intact in 1922 by Howard Carter.',
      ar: 'وادي يحتوي على 63 مقبرة منحوتة في الصخر للفراعنة والنبلاء في الدولة الحديثة. اشتهر بمقبرة توت عنخ آمون (KV62)، التي اكتشفت سليمة تقريبًا في عام 1922 من قبل هوارد كارتر.'
    },
    significance: {
      en: 'The principal burial site for New Kingdom royalty, featuring elaborate wall paintings depicting the journey to the afterlife and containing immense archaeological treasures.',
      ar: 'موقع الدفن الرئيسي لملوك الدولة الحديثة، ويتميز بلوحات جدارية متقنة تصور الرحلة إلى الحياة الأخرى ويحتوي على كنوز أثرية هائلة.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1742262336512-b19130ecc6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMHZhbGxleSUyMGtpbmdzfGVufDF8fHx8MTc2NjMzODk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1742262336512-b19130ecc6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMHZhbGxleSUyMGtpbmdzfGVufDF8fHx8MTc2NjMzODk5OHww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['luxor-temple', 'karnak-temple'],
  },
  {
    id: 'abu-simbel',
    name: {
      en: 'Abu Simbel Temples',
      ar: 'معابد أبو سمبل',
    },
    location: {
      city: { en: 'Abu Simbel', ar: 'أبو سمبل' },
      governorate: { en: 'Aswan', ar: 'أسوان' },
      coordinates: {
        lat: 22.3372,
        lng: 31.6258,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: { en: 'Twentieth Dynasty', ar: 'الأسرة العشرون' },
    dateRange: {
      start: -1264,
      end: -1244,
    },
    description: {
      en: 'Two massive rock-cut temples carved during the reign of Ramesses II. The Great Temple features four 20-meter tall statues of the pharaoh. Relocated in 1968 to avoid submersion by Lake Nasser.',
      ar: 'معبدان ضخمان منحوتان في الصخر تم نحتهما في عهد رمسيس الثاني. يتميز المعبد الكبير بأربعة تماثيل للفرعون يبلغ طولها 20 متراً. تم نقله في عام 1968 لتجنب غمره بمياه بحيرة ناصر.'
    },
    significance: {
      en: 'A UNESCO World Heritage Site showcasing New Kingdom monumental architecture and one of the greatest archaeological rescue operations in history.',
      ar: 'موقع للتراث العالمي لليونسكو يعرض العمارة الأثرية للدولة الحديثة وواحدة من أكبر عمليات الإنقاذ الأثرية في التاريخ.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1568322445389-dc9223328f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHBoYXJhb2glMjBzdGF0dWV8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568322445389-dc9223328f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHBoYXJhb2glMjBzdGF0dWV8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: [],
  },
  {
    id: 'alexandria-library',
    name: {
      en: 'Library of Alexandria (Ancient Site)',
      ar: 'مكتبة الإسكندرية (الموقع القديم)',
    },
    location: {
      city: { en: 'Alexandria', ar: 'الإسكندرية' },
      governorate: { en: 'Alexandria', ar: 'الإسكندرية' },
      coordinates: {
        lat: 31.2089,
        lng: 29.9095,
      },
    },
    historicalPeriod: 'Ptolemaic',
    dynasty: { en: 'Ptolemaic Dynasty', ar: 'الأسرة البطلمية' },
    dateRange: {
      start: -300,
      end: 400,
    },
    description: {
      en: 'The legendary ancient library that was one of the largest and most significant libraries of the ancient world. It was part of the Mouseion research institution in Alexandria, Egypt.',
      ar: 'المكتبة القديمة الأسطورية التي كانت واحدة من أكبر وأهم المكتبات في العالم القديم. كانت جزءًا من مؤسسة ميوزيون البحثية في الإسكندرية بمصر.'
    },
    significance: {
      en: 'Symbol of knowledge preservation in antiquity, housing hundreds of thousands of scrolls and serving as a major center of scholarship in the Hellenistic world.',
      ar: 'رمز للحفاظ على المعرفة في العصور القديمة، وتضم مئات الآلاف من المخطوطات وتعمل كمركز رئيسي للمنح الدراسية في العالم الهلنستي.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1559527012-3b0fca356de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjB0ZW1wbGUlMjBjb2x1bW5zfGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559527012-3b0fca356de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjB0ZW1wbGUlMjBjb2x1bW5zfGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: [],
  },
  {
    id: 'citadel-cairo',
    name: {
      en: 'Citadel of Saladin',
      ar: 'قلعة صلاح الدين',
    },
    location: {
      city: { en: 'Cairo', ar: 'القاهرة' },
      governorate: { en: 'Cairo', ar: 'القاهرة' },
      coordinates: {
        lat: 30.0291,
        lng: 31.2600,
      },
    },
    historicalPeriod: 'Islamic',
    dynasty: { en: 'Ayyubid Dynasty', ar: 'الأيوبيون' },
    dateRange: {
      start: 1176,
      end: 1183,
    },
    description: {
      en: 'A medieval Islamic fortification built by Saladin to protect Cairo from Crusader attacks. The citadel remained the seat of Egyptian government until the 19th century.',
      ar: 'تحصين إسلامي من العصور الوسطى بناه صلاح الدين لحماية القاهرة من هجمات الصليبيين. ظلت القلعة مقرًا للحكومة المصرية حتى القرن التاسع عشر.'
    },
    significance: {
      en: 'Outstanding example of medieval military architecture and a symbol of Islamic Cairo, featuring the magnificent Mohamed Ali Mosque.',
      ar: 'مثال رائع للعمارة العسكرية في العصور الوسطى ورمز للقاهرة الإسلامية، وتتميز بمسجد محمد علي الرائع.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1728242410422-a5893353cac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGhpZXJvZ2x5cGhpY3N8ZW58MXx8fHwxNzY2MzM4OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1728242410422-a5893353cac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGhpZXJvZ2x5cGhpY3N8ZW58MXx8fHwxNzY2MzM4OTk3fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: [],
  },
];

export const historicalPeriods = [
  {
    name: { en: 'Prehistoric', ar: 'عصر ما قبل التاريخ' },
    dateRange: { en: 'Before 3100 BC', ar: 'قبل 3100 ق.م' },
    description: { en: 'Predynastic period before the unification of Egypt', ar: 'فترة ما قبل الأسرات قبل توحيد مصر' },
  },
  {
    name: { en: 'Dynastic Period', ar: 'عصر الأسرات' },
    dateRange: { en: '3100 BC – 332 BC', ar: '3100 ق.م – 332 ق.م' },
    description: { en: 'Ancient Egyptian dynasties from the Old Kingdom through the Late Period', ar: 'الأسرات المصرية القديمة من الدولة القديمة حتى العصر المتأخر' },
  },
  {
    name: { en: 'Ptolemaic', ar: 'البطالمة' },
    dateRange: { en: '332 BC – 30 BC', ar: '332 ق.م – 30 ق.م' },
    description: { en: 'Ptolemaic rule of Egypt', ar: 'الحكم البطلمي لمصر' },
  },
  {
    name: { en: 'Roman', ar: 'الروماني' },
    dateRange: { en: '30 BC – 395 AD', ar: '30 ق.م – 395 م' },
    description: { en: 'Roman rule of Egypt', ar: 'الحكم الروماني لمصر' },
  },
  {
    name: { en: 'Byzantine', ar: 'البيزنطي' },
    dateRange: { en: '395 AD – 641 AD', ar: '395 م – 641 م' },
    description: { en: 'Byzantine rule of Egypt', ar: 'الحكم البيزنطي لمصر' },
  },
  {
    name: { en: 'Islamic', ar: 'الإسلامي' },
    dateRange: { en: '641 AD – Present', ar: '641 م – الحاضر' },
    description: { en: 'Islamic conquest through Ottoman and modern periods', ar: 'الفتح الإسلامي عبر العصور العثمانية والحديثة' },
  },
];