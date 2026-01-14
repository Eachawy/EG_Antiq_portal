'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Search, Languages, Star, Award, Filter, X, BadgeCheck } from 'lucide-react';
import { tourGuides, specializations, languages } from './data/tourGuides';
import type { TourGuide } from './data/tourGuides';

export default function TourGuidesPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const [selectedArea, setSelectedArea] = useState<string>('all');
    const [minExperience, setMinExperience] = useState<number>(0);
    const [minRating, setMinRating] = useState<number>(0);
    const [showFilters, setShowFilters] = useState(false);

    // Filter guides based on search criteria
    const filteredGuides = tourGuides.filter((guide) => {
        const matchesSearch =
            guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSpecialization =
            selectedSpecialization === 'all' ||
            guide.specialization.includes(selectedSpecialization);

        const matchesLanguage =
            selectedLanguage === 'all' ||
            guide.languages.includes(selectedLanguage);

        const matchesArea =
            selectedArea === 'all' ||
            guide.areas.includes(selectedArea);

        const matchesExperience = guide.experience >= minExperience;
        const matchesRating = guide.rating >= minRating;

        return matchesSearch && matchesSpecialization && matchesLanguage &&
            matchesArea && matchesExperience && matchesRating;
    });

    const handleReset = () => {
        setSearchQuery('');
        setSelectedSpecialization('all');
        setSelectedLanguage('all');
        setSelectedArea('all');
        setMinExperience(0);
        setMinRating(0);
    };

    const activeFiltersCount = [
        selectedSpecialization !== 'all',
        selectedLanguage !== 'all',
        minRating > 0
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Full-Width Hero Section */}
            <div className="hidden md:block relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1539768942893-daf53e448371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHRvdXIlMjBndWlkZXxlbnwxfHx8fDE3NjYzMzk0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Tour Guides"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-6 md:px-12 text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Award className="w-4 h-4" />
                            <span className="font-medium">Certified Experts</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            Expert Archaeological
                            <span className="block bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent mt-2">
                                Tour Guides
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            Connect with certified Egyptologists and experienced guides for an authentic journey through ancient Egypt
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                                <div className="text-sm text-white/80">Expert Guides</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">15+</div>
                                <div className="text-sm text-white/80">Languages</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">4.8★</div>
                                <div className="text-sm text-white/80">Average Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">10K+</div>
                                <div className="text-sm text-white/80">Tours Conducted</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-24 pb-12 md:pt-12 md:pb-12">{/* Added pt-24 (96px) for mobile spacing */}
                {/* Filter Toggle Button (Mobile) */}
                <div className="mb-6 lg:hidden">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors"
                    >
                        <Filter size={20} />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="bg-white text-theme-primary px-2 py-0.5 rounded-full text-sm">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Filters - Horizontal Layout */}
                <div className={`mb-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-gradient-to-br from-theme-card via-theme-card to-theme-accent/30 border border-theme-border/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-theme-border/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-theme-primary to-theme-secondary rounded-lg">
                                    <Filter size={20} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl text-theme-text font-semibold">Filters</h2>
                                    <p className="text-xs text-theme-muted">Refine your search</p>
                                </div>
                            </div>
                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={handleReset}
                                    className="group flex items-center gap-1.5 px-3 py-1.5 bg-theme-primary/10 hover:bg-theme-primary text-theme-primary hover:text-white rounded-full text-sm transition-all duration-300"
                                >
                                    <X size={14} />
                                    <span className="hidden sm:inline">Reset</span>
                                </button>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name, specialization, or description..."
                                    className="w-full pl-12 pr-4 py-3 bg-theme-bg/50 border-2 border-theme-border hover:border-theme-primary/50 rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Filters in Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Specialization Filter */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-theme-text mb-3 font-medium">
                                    <div className="p-1.5 bg-theme-primary/10 rounded-lg group-hover:bg-theme-primary/20 transition-colors">
                                        <Award className="text-theme-primary" size={16} />
                                    </div>
                                    Specialization
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSpecialization}
                                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                                        className="w-full px-4 py-3 bg-theme-bg/50 border-2 border-theme-border hover:border-theme-primary/50 rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-all duration-300 text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="all">All Specializations</option>
                                        {specializations.map((spec) => (
                                            <option key={spec} value={spec}>{spec}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Language Filter */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-theme-text mb-3 font-medium">
                                    <div className="p-1.5 bg-theme-primary/10 rounded-lg group-hover:bg-theme-primary/20 transition-colors">
                                        <Languages className="text-theme-primary" size={16} />
                                    </div>
                                    Language
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        className="w-full px-4 py-3 bg-theme-bg/50 border-2 border-theme-border hover:border-theme-primary/50 rounded-xl text-theme-text focus:outline-none focus:border-theme-primary transition-all duration-300 text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="all">All Languages</option>
                                        {languages.map((lang) => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <label className="flex items-center justify-between text-theme-text mb-3 font-medium">
                                    <span className="text-sm">Minimum Rating</span>
                                    <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full text-xs font-semibold">
                                        <Star size={12} className="fill-white" />
                                        <span>{minRating > 0 ? minRating.toFixed(1) : 'Any'}</span>
                                    </div>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.5"
                                    value={minRating}
                                    onChange={(e) => setMinRating(Number(e.target.value))}
                                    className="w-full h-2 bg-theme-accent rounded-full appearance-none cursor-pointer slider"
                                />
                                <div className="flex justify-between text-xs text-theme-muted mt-2">
                                    <span>Any</span>
                                    <span>5.0★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tour Guides Grid */}
                <div>
                    <div className="mb-6">
                        <p className="text-theme-text/70">
                            Showing {filteredGuides.length} of {tourGuides.length} guides
                        </p>
                    </div>

                    {filteredGuides.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-theme-text/70 text-lg mb-4">No tour guides match your criteria</p>
                            <button
                                onClick={handleReset}
                                className="text-theme-primary hover:text-theme-secondary"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGuides.map((guide) => (
                                <GuideCard key={guide.id} guide={guide} onClick={() => router.push(`/tour-guides/${guide.id}`)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function GuideCard({ guide, onClick }: { guide: TourGuide; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group relative bg-gradient-to-br from-theme-card via-theme-card to-theme-accent/20 border border-theme-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-theme-primary/30 transition-all duration-500 cursor-pointer"
        >
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/0 via-theme-primary/0 to-theme-secondary/0 group-hover:from-theme-primary/5 group-hover:to-theme-secondary/5 transition-all duration-500 pointer-events-none" />

            <div className="relative flex flex-col">
                {/* Image with Gradient Overlay */}
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={guide.image}
                        alt={guide.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Rating Badge - Bottom Left */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        <span className="text-sm font-semibold text-gray-900">{guide.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-600">({guide.reviewCount})</span>
                    </div>

                    {/* Verified Badge - Top Right */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg">
                        <BadgeCheck className="text-white drop-shadow-lg" size={16} />
                        <span className="text-xs font-semibold text-white drop-shadow-lg">Verified</span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                    {/* Name & Title */}
                    <div>
                        <h3 className="text-xl font-semibold text-theme-text group-hover:text-theme-primary transition-colors duration-300 mb-1">
                            {guide.name}
                        </h3>
                        <p className="text-sm text-theme-muted font-medium">{guide.title}</p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 pb-4 border-b border-theme-border/30">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-theme-primary/10 rounded-lg">
                                <Award size={14} className="text-theme-primary" />
                            </div>
                            <span className="text-sm text-theme-text font-medium">{guide.experience} yrs</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <div className="px-3 py-1 bg-gradient-to-r from-theme-primary to-theme-secondary text-white rounded-full">
                                <span className="text-sm font-semibold">${guide.hourlyRate}/hr</span>
                            </div>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-start gap-2">
                        <div className="p-1.5 bg-theme-primary/10 rounded-lg mt-0.5">
                            <Languages size={14} className="text-theme-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-theme-muted mb-1">Languages</p>
                            <p className="text-sm text-theme-text font-medium leading-relaxed">
                                {guide.languages.slice(0, 3).join(', ')}
                                {guide.languages.length > 3 && (
                                    <span className="text-theme-muted"> +{guide.languages.length - 3}</span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Specializations */}
                    <div>
                        <p className="text-xs text-theme-muted mb-2">Specializations</p>
                        <div className="flex flex-wrap gap-2">
                            {guide.specialization.slice(0, 2).map((spec: any) => (
                                <span
                                    key={spec}
                                    className="px-3 py-1.5 bg-gradient-to-br from-theme-accent to-theme-accent/50 border border-theme-border/50 text-theme-text text-xs font-medium rounded-lg hover:border-theme-primary/30 transition-colors"
                                >
                                    {spec}
                                </span>
                            ))}
                            {guide.specialization.length > 2 && (
                                <span className="px-3 py-1.5 bg-theme-primary/10 text-theme-primary text-xs font-semibold rounded-lg">
                                    +{guide.specialization.length - 2}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* CTA - View Profile */}
                    <div className="pt-4">
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-theme-primary/10 to-theme-secondary/10 rounded-xl group-hover:from-theme-primary group-hover:to-theme-secondary transition-all duration-300">
                            <span className="text-sm font-semibold text-theme-primary group-hover:text-white transition-colors">
                                View Full Profile
                            </span>
                            <svg
                                className="w-5 h-5 text-theme-primary group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}