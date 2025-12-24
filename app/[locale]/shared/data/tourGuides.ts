export interface TourGuide {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  languages: string[];
  experience: number; // years
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  certifications: string[];
  education: string;
  areas: string[]; // Geographic areas they cover
  availability: 'available' | 'busy' | 'unavailable';
  hourlyRate: number;
  email: string;
  phone: string;
  bio: string;
  tours: {
    name: string;
    duration: string;
    price: number;
  }[];
  highlights: string[];
}

export const tourGuides: TourGuide[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Hassan',
    title: 'Senior Egyptologist & Licensed Tour Guide',
    specialization: ['Ancient Egyptian History', 'Hieroglyphics', 'Pyramids', 'Valley of the Kings'],
    languages: ['English', 'Arabic', 'French', 'German'],
    experience: 15,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    description: 'Passionate Egyptologist specializing in pyramid construction and ancient Egyptian burial practices.',
    certifications: ['Licensed Egyptian Tour Guide', 'PhD in Egyptology', 'UNESCO Heritage Site Specialist'],
    education: 'PhD in Egyptology, Cairo University',
    areas: ['Giza', 'Luxor', 'Valley of the Kings', 'Saqqara'],
    availability: 'available',
    hourlyRate: 75,
    email: 'ahmed.hassan@example.com',
    phone: '+20 123 456 7890',
    bio: 'With over 15 years of experience guiding archaeological tours across Egypt, Dr. Ahmed Hassan brings ancient history to life. His expertise in hieroglyphics and pyramid construction techniques provides visitors with unique insights into the engineering marvels of ancient Egypt.',
    tours: [
      { name: 'Giza Pyramids Full Day Tour', duration: '8 hours', price: 500 },
      { name: 'Saqqara & Memphis Tour', duration: '6 hours', price: 400 },
      { name: 'Private Egyptology Lecture', duration: '2 hours', price: 150 }
    ],
    highlights: [
      'Published researcher in pyramid construction techniques',
      'Featured in National Geographic documentary',
      'Fluent in 4 languages',
      'Specialized access to restricted archaeological sites'
    ]
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    title: 'Archaeological Guide & Museum Specialist',
    specialization: ['Museum Collections', 'Ancient Artifacts', 'Coptic History', 'Islamic Cairo'],
    languages: ['English', 'Arabic', 'Italian'],
    experience: 10,
    rating: 4.8,
    reviewCount: 218,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    description: 'Expert in ancient Egyptian artifacts and museum collections with a focus on cultural context.',
    certifications: ['Licensed Tour Guide', 'Museum Curation Certificate', 'Archaeological Field Work Certified'],
    education: 'Master in Archaeological Studies, American University in Cairo',
    areas: ['Cairo', 'Egyptian Museum', 'Coptic Cairo', 'Islamic Cairo'],
    availability: 'available',
    hourlyRate: 65,
    email: 'sarah.mitchell@example.com',
    phone: '+20 123 456 7891',
    bio: 'Sarah Mitchell combines academic expertise with practical field experience to offer engaging tours of Egypt\'s most prestigious museums and urban archaeological sites. Her deep knowledge of artifact preservation and historical context enriches every tour.',
    tours: [
      { name: 'Egyptian Museum Private Tour', duration: '4 hours', price: 280 },
      { name: 'Coptic & Islamic Cairo Walking Tour', duration: '5 hours', price: 320 },
      { name: 'Museum Behind-the-Scenes Tour', duration: '3 hours', price: 250 }
    ],
    highlights: [
      'Former curator at Egyptian Museum',
      'Specialized in artifact authentication',
      'Expert in Coptic and Islamic art',
      'Published author on Egyptian antiquities'
    ]
  },
  {
    id: '3',
    name: 'Mohamed El-Sayed',
    title: 'Adventure Archaeologist & Desert Guide',
    specialization: ['Desert Expeditions', 'Bedouin Culture', 'Remote Sites', 'Archaeological Surveying'],
    languages: ['Arabic', 'English', 'Bedouin dialects'],
    experience: 12,
    rating: 4.9,
    reviewCount: 176,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    description: 'Adventurous guide specializing in remote archaeological sites and desert expeditions.',
    certifications: ['Desert Survival Expert', 'Archaeological Survey Specialist', 'Licensed Tour Guide'],
    education: 'BA in Archaeology, Helwan University',
    areas: ['Western Desert', 'Siwa Oasis', 'White Desert', 'Bahariya Oasis'],
    availability: 'busy',
    hourlyRate: 70,
    email: 'mohamed.elsayed@example.com',
    phone: '+20 123 456 7892',
    bio: 'Mohamed El-Sayed is your guide to Egypt\'s hidden archaeological treasures in remote desert locations. With extensive experience in archaeological surveying and desert navigation, he leads unforgettable expeditions to sites rarely visited by tourists.',
    tours: [
      { name: 'White Desert Archaeological Safari', duration: '3 days', price: 1800 },
      { name: 'Siwa Oasis Ancient Temples Tour', duration: '2 days', price: 1200 },
      { name: 'Bahariya Oasis Day Trip', duration: '10 hours', price: 600 }
    ],
    highlights: [
      'Led expeditions to newly discovered sites',
      'Expert in Bedouin archaeological knowledge',
      'Desert survival and navigation specialist',
      'Contributor to archaeological surveys'
    ]
  },
  {
    id: '4',
    name: 'Dr. Fatima Nasser',
    title: 'Temple Architecture Specialist',
    specialization: ['Temple Architecture', 'Religious Practices', 'Ancient Astronomy', 'Karnak Temple'],
    languages: ['Arabic', 'English', 'Spanish'],
    experience: 18,
    rating: 5.0,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    description: 'Leading expert on ancient Egyptian temple architecture and religious symbolism.',
    certifications: ['PhD in Egyptology', 'Temple Architecture Specialist', 'Licensed Senior Guide'],
    education: 'PhD in Egyptology (Temple Architecture), Sorbonne University',
    areas: ['Luxor', 'Karnak', 'Philae', 'Edfu', 'Kom Ombo'],
    availability: 'available',
    hourlyRate: 85,
    email: 'fatima.nasser@example.com',
    phone: '+20 123 456 7893',
    bio: 'Dr. Fatima Nasser is internationally recognized for her research on ancient Egyptian temple architecture and astronomical alignments. Her tours offer deep insights into the religious and cosmic significance of Egypt\'s magnificent temples.',
    tours: [
      { name: 'Karnak Temple In-Depth Tour', duration: '5 hours', price: 425 },
      { name: 'Luxor Temples Day Tour', duration: '8 hours', price: 680 },
      { name: 'Temple Astronomy Workshop', duration: '3 hours', price: 255 }
    ],
    highlights: [
      'Published 3 books on temple architecture',
      'Consulted on temple restoration projects',
      'Expert in astronomical alignments',
      'Regular lecturer at international conferences'
    ]
  },
  {
    id: '5',
    name: 'James Parker',
    title: 'Photography & Archaeology Guide',
    specialization: ['Photography Tours', 'Light & Shadow Techniques', 'Sunset/Sunrise Tours', 'Visual Storytelling'],
    languages: ['English', 'Arabic'],
    experience: 8,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    description: 'Combines archaeological expertise with professional photography to create unforgettable visual journeys.',
    certifications: ['Licensed Tour Guide', 'Professional Photographer', 'Archaeological Photography Specialist'],
    education: 'BA in Archaeology & Photography, American University in Cairo',
    areas: ['Abu Simbel', 'Philae', 'Aswan', 'Luxor'],
    availability: 'available',
    hourlyRate: 60,
    email: 'james.parker@example.com',
    phone: '+20 123 456 7894',
    bio: 'James Parker specializes in photography-focused archaeological tours, helping visitors capture the beauty of ancient Egypt while understanding its historical significance. His unique approach combines storytelling with technical photography guidance.',
    tours: [
      { name: 'Abu Simbel Sunrise Photography Tour', duration: '6 hours', price: 450 },
      { name: 'Philae Temple Golden Hour Tour', duration: '4 hours', price: 300 },
      { name: 'Archaeological Photography Workshop', duration: '3 hours', price: 200 }
    ],
    highlights: [
      'Featured in archaeological photography exhibitions',
      'Expert in ancient site photography techniques',
      'Teaches optimal lighting for monument photography',
      'Works with professional photography equipment'
    ]
  },
  {
    id: '6',
    name: 'Layla Ibrahim',
    title: 'Family & Educational Tour Specialist',
    specialization: ['Family Tours', 'Educational Programs', 'Interactive Learning', 'Children Activities'],
    languages: ['Arabic', 'English', 'French'],
    experience: 7,
    rating: 4.8,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    description: 'Specializes in making archaeology fun and accessible for families and educational groups.',
    certifications: ['Licensed Tour Guide', 'Educational Program Developer', 'Child Safety Certified'],
    education: 'MA in Education & Archaeology, Cairo University',
    areas: ['Giza', 'Cairo', 'Saqqara', 'Memphis'],
    availability: 'available',
    hourlyRate: 55,
    email: 'layla.ibrahim@example.com',
    phone: '+20 123 456 7895',
    bio: 'Layla Ibrahim creates engaging, interactive archaeological experiences perfect for families and school groups. Her innovative teaching methods make ancient Egyptian history come alive for visitors of all ages.',
    tours: [
      { name: 'Family-Friendly Pyramid Adventure', duration: '5 hours', price: 350 },
      { name: 'Kids Archaeological Workshop', duration: '3 hours', price: 180 },
      { name: 'Educational School Group Tour', duration: '6 hours', price: 400 }
    ],
    highlights: [
      'Developed interactive archaeology programs for children',
      'Expert in age-appropriate historical content',
      'Creates hands-on learning experiences',
      'Patience and enthusiasm working with all ages'
    ]
  }
];

export const specializations = [
  'Ancient Egyptian History',
  'Hieroglyphics',
  'Pyramids',
  'Valley of the Kings',
  'Museum Collections',
  'Ancient Artifacts',
  'Coptic History',
  'Islamic Cairo',
  'Desert Expeditions',
  'Bedouin Culture',
  'Remote Sites',
  'Temple Architecture',
  'Religious Practices',
  'Ancient Astronomy',
  'Photography Tours',
  'Family Tours',
  'Educational Programs'
];

export const languages = [
  'English',
  'Arabic',
  'French',
  'German',
  'Italian',
  'Spanish',
  'Bedouin dialects'
];

export const areas = [
  'Giza',
  'Luxor',
  'Valley of the Kings',
  'Saqqara',
  'Cairo',
  'Egyptian Museum',
  'Coptic Cairo',
  'Islamic Cairo',
  'Western Desert',
  'Siwa Oasis',
  'White Desert',
  'Bahariya Oasis',
  'Karnak',
  'Philae',
  'Edfu',
  'Kom Ombo',
  'Abu Simbel',
  'Aswan',
  'Memphis'
];
