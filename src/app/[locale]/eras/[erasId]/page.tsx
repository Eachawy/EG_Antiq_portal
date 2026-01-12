'use client';

import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { ArrowLeft, Calendar, MapPin, Building2, Sparkles, BookOpen, Heart, Clock } from 'lucide-react';
import { getEraById } from '../../HomePage-Components/data/erasData';
import { archaeologicalSites } from '../../about/data/sitesData';

export default function EraDetailsPage() {
    const params = useParams();
    const id = params.erasId as string;
    const router = useRouter();
    const era = id ? getEraById(id) : undefined;

    if (!era) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl text-theme-text mb-4">Era not found</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="text-theme-primary hover:text-theme-secondary"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    // Find sites from this era
    const eraSites = archaeologicalSites.filter(
        site => site.historicalPeriod === era.name
    );

    // formatYear removed

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Full-Width Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={era.imageUrl}
                        alt={era.name}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${era.color.primary} opacity-90`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end">
                    <div className="container mx-auto px-6 md:px-12 pb-12 md:pb-16">
                        {/* Back Button */}
                        <button
                            onClick={() => router.push('/')}
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Home</span>
                        </button>

                        {/* Era Title */}
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs mb-4">
                                <Sparkles className="w-3 h-3" />
                                <span className="font-medium">Historical Era</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                The {era.name} Era
                            </h1>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Calendar size={16} />
                                    <span className="font-semibold">{era.period}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Clock size={16} />
                                    <span className="font-semibold">
                                        {Math.abs(era.timeline.end - era.timeline.start)} years
                                    </span>
                                </div>
                            </div>

                            <p className="text-base md:text-lg text-white/95 leading-relaxed max-w-3xl">
                                {era.fullDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Historical Context */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <BookOpen className="text-white" size={20} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">Historical Context</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.historicalContext}
                            </p>
                        </div>

                        {/* Cultural Significance */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <Heart className="text-white" size={24} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">Cultural Significance</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.culturalSignificance}
                            </p>
                        </div>

                        {/* Architectural Style */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <Building2 className="text-white" size={24} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">Architectural Style</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.architecturalStyle}
                            </p>
                        </div>

                        {/* Religious Beliefs */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <Sparkles className="text-white" size={24} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">Religious Beliefs</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.religiousBeliefs}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Key Characteristics */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 shadow-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-theme-text mb-4">Key Characteristics</h3>
                            <ul className="space-y-3">
                                {era.keyCharacteristics.map((characteristic, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="p-1 bg-theme-primary rounded-md mt-0.5">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-sm text-theme-text/80">{characteristic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notable Sites */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 shadow-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-theme-text mb-4">Notable Sites</h3>
                            <ul className="space-y-3">
                                {era.notableSites.map((site, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <MapPin size={16} className={`text-theme-primary mt-0.5 flex-shrink-0`} />
                                        <span className="text-sm text-theme-text/80">{site}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Archaeological Sites */}
                {eraSites.length > 0 && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-theme-text mb-3">
                                Archaeological Sites from the {era.name} Era
                            </h2>
                            <p className="text-theme-text/70">
                                Explore {eraSites.length} site{eraSites.length !== 1 ? 's' : ''} from this period
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eraSites.map((site) => (
                                <div
                                    key={site.id}
                                    onClick={() => router.push(`/sites/${site.id}`)}
                                    className="group cursor-pointer bg-theme-card border border-theme-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={site.thumbnailUrl}
                                            alt={site.name.english}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <h3 className="text-white font-semibold mb-1">{site.name.english}</h3>
                                            <p className="text-white/80 text-xs flex items-center gap-1">
                                                <MapPin size={12} />
                                                {site.location.city}, {site.location.governorate}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-theme-text/70 text-sm line-clamp-2">
                                            {site.description.substring(0, 100)}...
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {eraSites.length > 6 && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => router.push('/sites')}
                                    className="inline-flex items-center gap-2 bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    View All {era.name} Sites
                                    <ArrowLeft size={18} className="rotate-180" />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Dynasties Section */}
                {era.dynasties && era.dynasties.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-theme-text mb-3">
                                Dynasties & Periods
                            </h2>
                            <p className="text-theme-text/70">
                                Explore the major dynasties and periods that defined the {era.name} era
                            </p>
                        </div>

                        <div className="space-y-8">
                            {era.dynasties.map((dynasty) => (
                                <div
                                    key={dynasty.id}
                                    className="bg-theme-card border border-theme-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        {/* Image */}
                                        <div className="relative h-64 lg:h-auto overflow-hidden">
                                            <img
                                                src={dynasty.imageUrl}
                                                alt={dynasty.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-theme-primary rounded-full text-white text-sm font-semibold mb-2">
                                                    <Calendar size={14} />
                                                    <span>{dynasty.period}</span>
                                                </div>
                                                <h3 className="text-white text-lg sm:text-xl font-bold">{dynasty.name}</h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 lg:p-8">
                                            <p className="text-theme-text/80 leading-relaxed mb-6">
                                                {dynasty.description}
                                            </p>

                                            {/* Notable Rulers */}
                                            {dynasty.notableRulers && dynasty.notableRulers.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="text-base sm:text-lg font-semibold text-theme-text mb-3 flex items-center gap-2">
                                                        <div className="p-2 bg-theme-primary rounded-lg">
                                                            <Sparkles className="text-white" size={18} />
                                                        </div>
                                                        Notable Rulers
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {dynasty.notableRulers.map((ruler, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`px-3 py-1.5 ${era.color.secondary} border ${era.color.badge.split(' ').slice(-1)[0]} rounded-full text-sm text-theme-text`}
                                                            >
                                                                {ruler}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Key Achievements */}
                                            {dynasty.keyAchievements && dynasty.keyAchievements.length > 0 && (
                                                <div>
                                                    <h4 className="text-base sm:text-lg font-semibold text-theme-text mb-3 flex items-center gap-2">
                                                        <div className="p-2 bg-theme-primary rounded-lg">
                                                            <Building2 className="text-white" size={18} />
                                                        </div>
                                                        Key Achievements
                                                    </h4>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {dynasty.keyAchievements.map((achievement, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-theme-text/80">
                                                                <div className="p-0.5 bg-theme-primary rounded-full mt-1.5 flex-shrink-0">
                                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                                </div>
                                                                <span>{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}