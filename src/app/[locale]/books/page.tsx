'use client';


import { useState, useMemo, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ShoppingCart, Book as BookIcon, Filter, Search, Check } from 'lucide-react';
import { useCart, Book } from '@/components/auth/CartContext';
import { CartSidebar } from './components/CartSidebar';
// import { useTranslations } from 'next-intl';
import { ImageWithFallback } from './components/ImageWithFallback';

const booksData: Book[] = [
    {
        id: '1',
        title: 'The Complete Pyramids: Solving the Ancient Mysteries',
        author: 'Mark Lehner',
        price: 45.99,
        category: 'Architecture',
        publisher: 'Thames & Hudson',
        year: 2008,
        pages: 256,
        isbn: '978-0500285473',
        description: 'A comprehensive guide to the pyramids of ancient Egypt, from the Step Pyramid at Saqqara to the Great Pyramid at Giza.',
        coverImage: 'https://images.unsplash.com/photo-1702036394924-9c079b10c4e4?w=400&h=600&fit=crop',
        rating: 5,
        inStock: true,
        period: 'Pharaonic',
        audience: 'Academic',
        language: 'English',
        availability: ['Hardcopy', 'eBook'],
        academicLevel: 'Advanced',
    },
    {
        id: '2',
        title: 'The Egyptian Book of the Dead',
        author: 'E.A. Wallis Budge',
        price: 29.99,
        category: 'Religion',
        publisher: 'Dover Publications',
        year: 2010,
        pages: 704,
        isbn: '978-0486218663',
        description: 'The ancient Egyptian funerary texts, a collection of spells and prayers designed to guide the deceased through the afterlife.',
        coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
        rating: 4.5,
        inStock: true,
        period: 'Pharaonic',
        audience: 'General Reader',
        language: 'English',
        availability: ['Hardcopy', 'eBook', 'PDF'],
        academicLevel: 'Intro',
    },
    {
        id: '3',
        title: 'Ancient Egypt: Anatomy of a Civilization',
        author: 'Barry J. Kemp',
        price: 52.00,
        category: 'History',
        publisher: 'Routledge',
        year: 2018,
        pages: 520,
        isbn: '978-0415635486',
        description: 'A scholarly examination of ancient Egyptian civilization, from its origins to its decline.',
        coverImage: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?w=400&h=600&fit=crop',
        rating: 5,
        inStock: true,
        period: 'Pharaonic',
        audience: 'Academic',
        language: 'English',
        availability: ['Hardcopy', 'eBook'],
        academicLevel: 'Research',
    },
    {
        id: '4',
        title: 'The Temples of Karnak',
        author: 'Richard H. Wilkinson',
        price: 38.50,
        category: 'Architecture',
        publisher: 'American University in Cairo Press',
        year: 2013,
        pages: 224,
        isbn: '978-9774165283',
        description: 'Explore the magnificent temple complex at Karnak, one of ancient Egypt\'s most important religious sites.',
        coverImage: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400&h=600&fit=crop',
        rating: 4.5,
        inStock: true,
        period: 'Pharaonic',
        audience: 'Student',
        language: 'English',
        availability: ['Hardcopy', 'PDF'],
        academicLevel: 'Advanced',
    },
    {
        id: '5',
        title: 'Valley of the Kings: The Complete Guide',
        author: 'Nicholas Reeves',
        price: 42.75,
        category: 'Archaeology',
        publisher: 'Thames & Hudson',
        year: 2016,
        pages: 240,
        isbn: '978-0500291283',
        description: 'Comprehensive coverage of the royal necropolis in the Valley of the Kings, including recent discoveries.',
        coverImage: 'https://images.unsplash.com/photo-1693947241038-da20ccf789db?w=400&h=600&fit=crop',
        rating: 5,
        inStock: true,
        period: 'Pharaonic',
        audience: 'Academic',
        language: 'English',
        availability: ['Hardcopy', 'eBook'],
        academicLevel: 'Advanced',
    },
    {
        id: '6',
        title: 'Hieroglyphics: A Very Short Introduction',
        author: 'Penelope Wilson',
        price: 16.95,
        category: 'History',
        publisher: 'Oxford University Press',
        year: 2019,
        pages: 144,
        isbn: '978-0198706779',
        description: 'An accessible introduction to the ancient Egyptian writing system and how to read hieroglyphics.',
        coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
        rating: 4,
        inStock: true,
        period: 'Pharaonic',
        audience: 'Student',
        language: 'English',
        availability: ['Hardcopy', 'eBook', 'PDF'],
        academicLevel: 'Intro',
    },
    {
        id: '7',
        title: 'The Oxford History of Ancient Egypt',
        author: 'Ian Shaw',
        price: 35.00,
        category: 'History',
        publisher: 'Oxford University Press',
        year: 2021,
        pages: 512,
        isbn: '978-0192804587',
        description: 'A detailed chronological history of ancient Egypt from prehistory to the Roman conquest.',
        coverImage: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&h=600&fit=crop',
        rating: 5,
        inStock: true,
        period: 'Prehistoric',
        audience: 'Academic',
        language: 'English',
        availability: ['Hardcopy', 'eBook'],
        academicLevel: 'Research',
    },
    {
        id: '8',
        title: 'Egyptian Mummies: Unraveling the Secrets',
        author: 'Joyce Tyldesley',
        price: 28.99,
        category: 'Archaeology',
        publisher: 'Carlton Books',
        year: 2017,
        pages: 192,
        isbn: '978-1780977959',
        description: 'Modern scientific techniques reveal the secrets of ancient Egyptian mummification practices.',
        coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
        rating: 4.5,
        inStock: false,
        period: 'Modern',
        audience: 'General Reader',
        language: 'English',
        availability: ['Hardcopy', 'eBook'],
        academicLevel: 'Intro',
    },
    {
        id: '9',
        title: 'Ancient Egyptian Magic',
        author: 'Christina Riggs',
        price: 24.50,
        category: 'Religion',
        publisher: 'Thames & Hudson',
        year: 2020,
        pages: 176,
        isbn: '978-0500052051',
        description: 'Discover the magical practices and beliefs of ancient Egypt, from amulets to incantations.',
        coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
        rating: 4,
        inStock: true,
        period: 'Pharaonic',
        audience: 'General Reader',
        language: 'English',
        availability: ['Hardcopy', 'PDF'],
        academicLevel: 'Intro',
    },
    {
        id: '10',
        title: 'Life in Ancient Egypt',
        author: 'T.G.H. James',
        price: 19.95,
        category: 'History',
        publisher: 'British Museum Press',
        year: 2015,
        pages: 208,
        isbn: '978-0714119410',
        description: 'Daily life in ancient Egypt, from farming and food to family and festivals.',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
        rating: 4.5,
        inStock: true,
        period: 'Pharaonic',
        audience: 'Student',
        language: 'English',
        availability: ['Hardcopy', 'eBook', 'PDF'],
        academicLevel: 'Intro',
    },
    {
        id: '11',
        title: 'Queens of Egypt: From Hetepheres to Cleopatra',
        author: 'Joyce Tyldesley',
        price: 33.00,
        category: 'History',
        publisher: 'Penguin Books',
        year: 2019,
        pages: 320,
        isbn: '978-0241441695',
        description: 'The powerful women who ruled and influenced ancient Egypt across three millennia.',
        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
        rating: 5,
        inStock: true,
        period: 'Greco-Roman',
        audience: 'Academic',
        language: 'English',
        availability: ['Hardcopy', 'eBook'],
        academicLevel: 'Advanced',
    },
    {
        id: '12',
        title: 'Ancient Egyptian Warfare',
        author: 'Ian Shaw',
        price: 39.99,
        category: 'History',
        publisher: 'Osprey Publishing',
        year: 2014,
        pages: 256,
        isbn: '978-1782004721',
        description: 'Military campaigns, weapons, and warfare strategies of ancient Egyptian armies.',
        coverImage: 'https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=400&h=600&fit=crop',
        rating: 4.5,
        inStock: true,
        period: 'Pharaonic',
        audience: 'Student',
        language: 'English',
        availability: ['Hardcopy', 'eBook', 'PDF'],
        academicLevel: 'Advanced',
    },
];

// Wrapper component to ensure context is ready
export default function Books() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-theme-bg pt-20 flex items-center justify-center">
                <div className="text-theme-text">Loading...</div>
            </div>
        );
    }

    return <BooksContent />;
}

// Main Books component
function BooksContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null);
    const [cartOpen, setCartOpen] = useState(false);
    const { addToCart, isInCart, getTotalItems } = useCart();
    // const { t } = useTranslations();

    const periods = [
        { label: 'All Periods', value: null },
        { label: 'Prehistoric', value: 'Prehistoric' },
        { label: 'Pharaonic', value: 'Pharaonic' },
        { label: 'Greco-Roman', value: 'Greco-Roman' },
        { label: 'Islamic', value: 'Islamic' },
        { label: 'Modern', value: 'Modern' },
    ];

    const categories = [
        { label: 'All Categories', value: null },
        { label: 'Archaeology', value: 'Archaeology' },
        { label: 'History', value: 'History' },
        { label: 'Religion', value: 'Religion' },
        { label: 'Art', value: 'Art' },
        { label: 'Architecture', value: 'Architecture' },
    ];

    const audiences = [
        { label: 'All Audiences', value: null },
        { label: 'General Reader', value: 'General Reader' },
        { label: 'Student', value: 'Student' },
        { label: 'Academic', value: 'Academic' },
    ];

    const languages = [
        { label: 'All Languages', value: null },
        { label: 'Arabic', value: 'Arabic' },
        { label: 'English', value: 'English' },
        { label: 'French', value: 'French' },
        { label: 'German', value: 'German' },
    ];

    const availabilities = [
        { label: 'All Formats', value: null },
        { label: 'Hardcopy', value: 'Hardcopy' },
        { label: 'eBook', value: 'eBook' },
        { label: 'PDF', value: 'PDF' },
    ];

    const filteredBooks = useMemo(() => {
        let filtered = booksData.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesPeriod =
                !selectedPeriod || book.period === selectedPeriod;

            const matchesCategory =
                !selectedCategory || book.category === selectedCategory;

            const matchesAudience =
                !selectedAudience || book.audience === selectedAudience;

            const matchesLanguage =
                !selectedLanguage || book.language === selectedLanguage;

            const matchesAvailability =
                !selectedAvailability || (book.availability && book.availability.includes(selectedAvailability));

            return matchesSearch && matchesPeriod && matchesCategory && matchesAudience && matchesLanguage && matchesAvailability;
        });

        return filtered;
    }, [searchTerm, selectedPeriod, selectedCategory, selectedAudience, selectedLanguage, selectedAvailability]);

    return (
        <div className="min-h-screen bg-theme-bg pt-20 md:pt-20">
            {/* Hero Section */}
            <div className="hidden md:block relative bg-gradient-to-br from-theme-primary/20 via-theme-accent to-theme-secondary/20 py-16 border-b border-theme-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-theme-card rounded-2xl shadow-lg">
                                <BookIcon size={48} className="text-theme-primary" />
                            </div>
                        </div>
                        <h1 className="text-theme-text mb-4">Ancient Egypt Book Collection</h1>
                        <p className="text-theme-muted text-lg max-w-2xl mx-auto">
                            Explore our curated selection of scholarly works on Ancient Egyptian archaeology, history, culture, and civilization.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-4 md:pt-12">{/* Added pt-4 for mobile (already has pt-20 on parent), md:pt-12 for desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Filters */}
                    <div className="lg:col-span-1">
                        <div className="bg-theme-card rounded-xl border border-theme-border p-6 sticky top-24">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme-border">
                                <Filter size={24} className="text-theme-primary" />
                                <h3 className="text-theme-text">Filters</h3>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label htmlFor="search" className="block text-theme-text mb-2 text-sm">
                                    Search Books
                                </label>
                                <span className="p-input-icon-left w-full">
                                    <Search size={18} className="text-theme-muted" />
                                    <InputText
                                        id="search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Title, author, keyword..."
                                        className="w-full bg-theme-accent border-theme-border text-theme-text placeholder:text-theme-muted"
                                    />
                                </span>
                            </div>

                            {/* Period Filter */}
                            <div className="mb-6">
                                <label htmlFor="period" className="block text-theme-text mb-2 text-sm">
                                    Historical Period
                                </label>
                                <Dropdown
                                    id="period"
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.value)}
                                    options={periods}
                                    optionLabel="label"
                                    placeholder="Select a period"
                                    className="w-full bg-theme-accent border-theme-border text-theme-text placeholder:text-theme-muted"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label htmlFor="category" className="block text-theme-text mb-2 text-sm">
                                    Category
                                </label>
                                <Dropdown
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.value)}
                                    options={categories}
                                    optionLabel="label"
                                    placeholder="Select a category"
                                    className="w-full bg-theme-accent border-theme-border text-theme-text placeholder:text-theme-muted"
                                />
                            </div>

                            {/* Audience Filter */}
                            <div className="mb-6">
                                <label htmlFor="audience" className="block text-theme-text mb-2 text-sm">
                                    Audience
                                </label>
                                <Dropdown
                                    id="audience"
                                    value={selectedAudience}
                                    onChange={(e) => setSelectedAudience(e.value)}
                                    options={audiences}
                                    optionLabel="label"
                                    placeholder="Select an audience"
                                    className="w-full bg-theme-accent border-theme-border text-theme-text placeholder:text-theme-muted"
                                />
                            </div>

                            {/* Language Filter */}
                            <div className="mb-6">
                                <label htmlFor="language" className="block text-theme-text mb-2 text-sm">
                                    Language
                                </label>
                                <Dropdown
                                    id="language"
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.value)}
                                    options={languages}
                                    optionLabel="label"
                                    placeholder="Select a language"
                                    className="w-full bg-theme-accent border-theme-border text-theme-text placeholder:text-theme-muted"
                                />
                            </div>

                            {/* Availability Filter */}
                            <div className="mb-6">
                                <label htmlFor="availability" className="block text-theme-text mb-2 text-sm">
                                    Format
                                </label>
                                <Dropdown
                                    id="availability"
                                    value={selectedAvailability}
                                    onChange={(e) => setSelectedAvailability(e.value)}
                                    options={availabilities}
                                    optionLabel="label"
                                    placeholder="Select a format"
                                    className="w-full bg-theme-accent border-theme-border text-theme-text placeholder:text-theme-muted"
                                />
                            </div>

                            {/* Results Count */}
                            <div className="pt-4 border-t border-theme-border">
                                <p className="text-theme-muted text-sm text-center">
                                    {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Books Grid */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className="text-theme-text text-xl">Available Books</h2>
                            <button
                                onClick={() => setCartOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors font-medium relative"
                            >
                                <ShoppingCart size={20} />
                                <span>Cart ({getTotalItems()})</span>
                                {getTotalItems() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                        {getTotalItems()}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className="group bg-gradient-to-br from-theme-card to-theme-card/50 border border-theme-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-theme-primary/40 transition-all duration-500 hover:-translate-y-2"
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    <div className="flex flex-col h-full">
                                        {/* Book Cover */}
                                        <div className="relative overflow-hidden bg-theme-accent h-72">
                                            <ImageWithFallback
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Out of Stock Badge */}
                                            {!book.inStock && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                                                    <div className="bg-red-500/50 text-white font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
                                                        Out of Stock
                                                    </div>
                                                </div>
                                            )}

                                            {/* Category Badge */}
                                            <div className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm ${book.category === 'Architecture'
                                                ? 'bg-gray-900/50 text-amber-500'
                                                : book.category === 'Archaeology'
                                                    ? 'bg-amber-900/50 text-amber-200'
                                                    : book.category === 'History'
                                                        ? 'bg-blue-900/50 text-blue-200'
                                                        : book.category === 'Religion'
                                                            ? 'bg-purple-900/50 text-purple-200'
                                                            : book.category === 'Art'
                                                                ? 'bg-pink-900/50 text-pink-200'
                                                                : 'bg-theme-primary/50 text-white'
                                                }`}>
                                                {book.category}
                                            </div>
                                        </div>

                                        {/* Book Details */}
                                        <div className="flex-1 flex flex-col p-5">
                                            <h4 className="text-theme-text mb-2 line-clamp-2 h-12 font-bold group-hover:text-theme-primary transition-colors">
                                                {book.title}
                                            </h4>
                                            <p className="text-theme-muted text-sm mb-4">
                                                by <span className="font-medium text-theme-text">{book.author}</span>
                                            </p>

                                            {/* Metadata Tags */}
                                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                                <span className="bg-theme-accent text-theme-text text-xs font-medium px-2.5 py-1 rounded-md border border-theme-border">
                                                    {book.year}
                                                </span>
                                                {book.period && (
                                                    <span className="bg-theme-primary/10 text-theme-primary text-xs font-medium px-2.5 py-1 rounded-md border border-theme-primary/20">
                                                        {book.period}
                                                    </span>
                                                )}
                                                {book.language && (
                                                    <span className="bg-theme-secondary/10 text-theme-text text-xs font-medium px-2.5 py-1 rounded-md border border-theme-secondary/20">
                                                        {book.language}
                                                    </span>
                                                )}
                                                {book.academicLevel && (
                                                    <span className="bg-amber-500/10 text-amber-700 dark:text-amber-500 text-xs font-medium px-2.5 py-1 rounded-md border border-amber-500/20">
                                                        {book.academicLevel}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-theme-muted text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                                                {book.description}
                                            </p>

                                            {/* Price and Add to Cart */}
                                            <div className="flex flex-col pt-4 border-t border-theme-border/60 gap-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-theme-muted text-sm">Price</span>
                                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">
                                                        ${book.price.toFixed(2)}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => addToCart(book)}
                                                    disabled={!book.inStock || isInCart(book.id)}
                                                    className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 ${isInCart(book.id)
                                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                                        : !book.inStock
                                                            ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
                                                            : 'bg-theme-primary text-white hover:bg-theme-secondary hover:shadow-theme-primary/50 hover:scale-[1.02]'
                                                        }`}
                                                >
                                                    {isInCart(book.id) ? (
                                                        <>
                                                            <Check size={18} />
                                                            <span>Added</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingCart size={18} />
                                                            <span>Add to Cart</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredBooks.length === 0 && (
                            <div className="text-center py-16">
                                <BookIcon size={64} className="text-theme-muted mx-auto mb-4 opacity-50" />
                                <h3 className="text-theme-text mb-2">No Books Found</h3>
                                <p className="text-theme-muted">
                                    Try adjusting your search criteria or filters
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cart Sidebar */}
            <CartSidebar visible={cartOpen} onHide={() => setCartOpen(false)} />

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}