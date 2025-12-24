export interface ArchaeologicalSite {
  id: string;
  name: {
    english: string;
    arabic: string;
  };
  location: {
    city: string;
    governorate: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  historicalPeriod: 'Ancient Egyptian' | 'Ptolemaic' | 'Roman' | 'Byzantine' | 'Islamic';
  dynasty: string;
  dateRange: {
    start: number; // BCE negative, CE positive
    end: number;
  };
  description: string;
  significance: string;
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
      english: 'The Great Pyramid of Khufu',
      arabic: 'هرم خوفو الأكبر',
    },
    location: {
      city: 'Giza',
      governorate: 'Giza',
      coordinates: {
        lat: 29.9792,
        lng: 31.1342,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: 'Fourth Dynasty',
    dateRange: {
      start: -2580,
      end: -2560,
    },
    description: 'The Great Pyramid is the oldest and largest of the three pyramids in the Giza pyramid complex. Originally standing at 146.5 meters, it was the tallest man-made structure in the world for over 3,800 years. Built as a tomb for Pharaoh Khufu of the Fourth Dynasty, it consists of an estimated 2.3 million limestone blocks.',
    significance: 'The only surviving member of the Seven Wonders of the Ancient World, representing the pinnacle of Old Kingdom pyramid construction and demonstrating advanced engineering knowledge.',
    imageUrl: 'https://images.unsplash.com/photo-1758546705512-2071bf8dc17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0JTIwc3Vuc2V0fGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1758546705512-2071bf8dc17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0JTIwc3Vuc2V0fGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['great-sphinx-giza', 'pyramid-khafre'],
  },
  {
    id: 'great-sphinx-giza',
    name: {
      english: 'The Great Sphinx of Giza',
      arabic: 'تمثال أبو الهول',
    },
    location: {
      city: 'Giza',
      governorate: 'Giza',
      coordinates: {
        lat: 29.9753,
        lng: 31.1376,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: 'Fourth Dynasty',
    dateRange: {
      start: -2558,
      end: -2532,
    },
    description: 'The Great Sphinx is a limestone statue featuring the head of a human and the body of a lion. Carved from a single massive limestone outcrop, it measures 73 meters long and 20 meters high. The face is believed to represent Pharaoh Khafre.',
    significance: 'One of the world\'s largest and oldest monolith statues, symbolizing strength and wisdom, guarding the Giza plateau for over 4,500 years.',
    imageUrl: 'https://images.unsplash.com/photo-1550382458-b69e98440a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBzcGhpbnh8ZW58MXx8fHwxNzY2MzM4OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550382458-b69e98440a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBzcGhpbnh8ZW58MXx8fHwxNzY2MzM4OTk2fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['great-pyramid-giza', 'pyramid-khafre'],
  },
  {
    id: 'karnak-temple',
    name: {
      english: 'Temple Complex of Karnak',
      arabic: 'معبد الكرنك',
    },
    location: {
      city: 'Luxor',
      governorate: 'Luxor',
      coordinates: {
        lat: 25.7188,
        lng: 32.6573,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: 'Eleventh Dynasty',
    dateRange: {
      start: -2055,
      end: -100,
    },
    description: 'Karnak is a vast complex of temples, chapels, pylons, and other buildings. It was the main place of worship of the Theban Triad: Amun, Mut, and Khonsu. The Great Hypostyle Hall features 134 massive columns arranged in 16 rows.',
    significance: 'The largest religious building ever constructed, representing nearly 2,000 years of continuous construction and modification across multiple dynasties.',
    imageUrl: 'https://images.unsplash.com/photo-1678640982613-70150a406d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJuYWslMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY2MzM5NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1678640982613-70150a406d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJuYWslMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY2MzM5NDI1fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['luxor-temple', 'valley-of-kings'],
  },
  {
    id: 'luxor-temple',
    name: {
      english: 'Luxor Temple',
      arabic: 'معبد الأقصر',
    },
    location: {
      city: 'Luxor',
      governorate: 'Luxor',
      coordinates: {
        lat: 25.6995,
        lng: 32.6391,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: 'Eighteenth Dynasty',
    dateRange: {
      start: -1400,
      end: -1000,
    },
    description: 'Luxor Temple is dedicated to the rejuvenation of kingship. Built by Amenhotep III and expanded by Ramesses II, it features the massive First Pylon, the Avenue of Sphinxes, and beautifully illuminated structures at night.',
    significance: 'A testament to New Kingdom architecture, hosting the annual Opet Festival and serving as a coronation site for pharaohs.',
    imageUrl: 'https://images.unsplash.com/photo-1664143197909-98b1f258e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXhvciUyMHRlbXBsZSUyMG5pZ2h0fGVufDF8fHx8MTc2NjIzNzQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1664143197909-98b1f258e398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXhvciUyMHRlbXBsZSUyMG5pZ2h0fGVufDF8fHx8MTc2NjIzNzQwNnww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['karnak-temple', 'valley-of-kings'],
  },
  {
    id: 'valley-of-kings',
    name: {
      english: 'Valley of the Kings',
      arabic: 'وادي الملوك',
    },
    location: {
      city: 'Luxor',
      governorate: 'Luxor',
      coordinates: {
        lat: 25.7402,
        lng: 32.6014,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: 'Eighteenth Dynasty',
    dateRange: {
      start: -1539,
      end: -1075,
    },
    description: 'A valley containing 63 rock-cut tombs for pharaohs and nobles of the New Kingdom. Most famous for the tomb of Tutankhamun (KV62), discovered nearly intact in 1922 by Howard Carter.',
    significance: 'The principal burial site for New Kingdom royalty, featuring elaborate wall paintings depicting the journey to the afterlife and containing immense archaeological treasures.',
    imageUrl: 'https://images.unsplash.com/photo-1742262336512-b19130ecc6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMHZhbGxleSUyMGtpbmdzfGVufDF8fHx8MTc2NjMzODk5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1742262336512-b19130ecc6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdCUyMHZhbGxleSUyMGtpbmdzfGVufDF8fHx8MTc2NjMzODk5OHww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: ['luxor-temple', 'karnak-temple'],
  },
  {
    id: 'abu-simbel',
    name: {
      english: 'Abu Simbel Temples',
      arabic: 'معابد أبو سمبل',
    },
    location: {
      city: 'Abu Simbel',
      governorate: 'Aswan',
      coordinates: {
        lat: 22.3372,
        lng: 31.6258,
      },
    },
    historicalPeriod: 'Ancient Egyptian',
    dynasty: 'Twentieth Dynasty',
    dateRange: {
      start: -1264,
      end: -1244,
    },
    description: 'Two massive rock-cut temples carved during the reign of Ramesses II. The Great Temple features four 20-meter tall statues of the pharaoh. Relocated in 1968 to avoid submersion by Lake Nasser.',
    significance: 'A UNESCO World Heritage Site showcasing New Kingdom monumental architecture and one of the greatest archaeological rescue operations in history.',
    imageUrl: 'https://images.unsplash.com/photo-1568322445389-dc9223328f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHBoYXJhb2glMjBzdGF0dWV8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568322445389-dc9223328f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHBoYXJhb2glMjBzdGF0dWV8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: [],
  },
  {
    id: 'alexandria-library',
    name: {
      english: 'Library of Alexandria (Ancient Site)',
      arabic: 'مكتبة الإسكندرية القديمة',
    },
    location: {
      city: 'Alexandria',
      governorate: 'Alexandria',
      coordinates: {
        lat: 31.2089,
        lng: 29.9095,
      },
    },
    historicalPeriod: 'Ptolemaic',
    dynasty: 'Ptolemaic Dynasty',
    dateRange: {
      start: -300,
      end: 400,
    },
    description: 'The legendary ancient library that was one of the largest and most significant libraries of the ancient world. It was part of the Mouseion research institution in Alexandria, Egypt.',
    significance: 'Symbol of knowledge preservation in antiquity, housing hundreds of thousands of scrolls and serving as a major center of scholarship in the Hellenistic world.',
    imageUrl: 'https://images.unsplash.com/photo-1559527012-3b0fca356de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjB0ZW1wbGUlMjBjb2x1bW5zfGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559527012-3b0fca356de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjB0ZW1wbGUlMjBjb2x1bW5zfGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: [],
  },
  {
    id: 'citadel-cairo',
    name: {
      english: 'Citadel of Saladin',
      arabic: 'قلعة صلاح الدين',
    },
    location: {
      city: 'Cairo',
      governorate: 'Cairo',
      coordinates: {
        lat: 30.0291,
        lng: 31.2600,
      },
    },
    historicalPeriod: 'Islamic',
    dynasty: 'Ayyubid Dynasty',
    dateRange: {
      start: 1176,
      end: 1183,
    },
    description: 'A medieval Islamic fortification built by Saladin to protect Cairo from Crusader attacks. The citadel remained the seat of Egyptian government until the 19th century.',
    significance: 'Outstanding example of medieval military architecture and a symbol of Islamic Cairo, featuring the magnificent Mohamed Ali Mosque.',
    imageUrl: 'https://images.unsplash.com/photo-1728242410422-a5893353cac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGhpZXJvZ2x5cGhpY3N8ZW58MXx8fHwxNzY2MzM4OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1728242410422-a5893353cac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGhpZXJvZ2x5cGhpY3N8ZW58MXx8fHwxNzY2MzM4OTk3fDA&ixlib=rb-4.1.0&q=80&w=400',
    gallery: [],
    nearbySites: [],
  },
];

export const historicalPeriods = [
  {
    name: 'Prehistoric',
    dateRange: 'Before 3100 BC',
    description: 'Predynastic period before the unification of Egypt',
  },
  {
    name: 'Ancient Egyptian',
    dateRange: '3100 BC – 332 BC',
    description: 'Ancient Egyptian dynasties from the Old Kingdom through the Late Period',
  },
  {
    name: 'Ptolemaic',
    dateRange: '332 BC – 30 BC',
    description: 'Ptolemaic rule of Egypt',
  },
  {
    name: 'Roman',
    dateRange: '30 BC – 641 AD',
    description: 'Roman rule of Egypt',
  },
  {
    name: 'Byzantine',
    dateRange: '641 AD – 642 AD',
    description: 'Byzantine rule of Egypt',
  },
  {
    name: 'Islamic',
    dateRange: '642 AD – Present',
    description: 'Islamic conquest through Ottoman and modern periods',
  },
];