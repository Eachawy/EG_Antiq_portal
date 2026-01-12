import { Search, Map as MapIcon } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function NewHeroSection() {
    const t = useTranslations("homepage.newHeroSection");
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1758546705512-2071bf8dc17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0JTIwc3Vuc2V0fGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=1080)`
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 py-20 text-center sm:px-6">
                <div className="mx-auto max-w-5xl">
                    {/* Badge */}
                    <div className="animate-in fade-in slide-in-from-top-4 mb-4 inline-block duration-700 sm:mb-6">
                        <span className="bg-theme-primary/20 border-theme-primary text-theme-primary hover:bg-theme-primary/30 rounded-full border px-3 py-1.5 text-xs tracking-wider backdrop-blur-sm transition-all duration-300 hover:scale-105 sm:px-4 sm:py-2 sm:text-sm">
                            {t("title")}
                        </span>
                    </div>

                    <h1 className="animate-in fade-in slide-in-from-bottom-6 mb-4 text-3xl leading-tight text-white delay-100 duration-700 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                        {t("explore")}
                    </h1>

                    <p className="animate-in fade-in slide-in-from-bottom-6 mx-auto mb-8 max-w-2xl px-4 text-sm leading-relaxed text-white/90 delay-200 duration-700 sm:mb-12 sm:text-base md:text-lg">
                        {t("description")}
                    </p>

                    {/* Quick Stats */}
                    <div className="animate-in fade-in zoom-in-50 mx-auto mb-8 grid max-w-4xl grid-cols-2 gap-3 px-4 delay-300 duration-700 sm:mb-12 sm:gap-4 md:grid-cols-4 lg:gap-6">
                        {[
                            { value: '8+', label: t('stats.majorSites') },
                            { value: '4', label: t('stats.historicalPeriods') },
                            { value: '5000+', label: t('stats.historyYears') },
                            { value: '27', label: t('stats.governorates') }
                        ].map((stat, index) => (
                            <div
                                key={stat.label}
                                className="group cursor-default rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:border-white/40 hover:bg-white/20 sm:p-4 lg:p-6"
                                style={{ animationDelay: `${400 + index * 100}ms` }}
                            >
                                <div className="mb-1 text-2xl text-white transition-transform duration-300 group-hover:scale-110 sm:mb-2 sm:text-3xl lg:text-4xl">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-white/80 transition-colors duration-300 group-hover:text-white sm:text-sm">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center gap-3 px-4 delay-500 duration-700 sm:flex-row sm:gap-4">
                        <Link href="/sites" className="w-full sm:w-auto">
                            <button className="bg-theme-primary hover:bg-theme-secondary group flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm tracking-wider text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black/60 active:scale-95 sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
                                aria-label="Explore archaeological sites">
                                <Search size={18} className="transition-transform duration-300 group-hover:rotate-12 sm:size-5" aria-hidden="true" />
                                <span>{t('buttons.exploreSites')}</span>
                            </button>
                        </Link>
                        <Link href="/map" className="w-full sm:w-auto">
                            <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black/60 active:scale-95 sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
                                aria-label="View interactive map">
                                <MapIcon size={18} className="transition-transform duration-300 group-hover:scale-110 sm:size-5" aria-hidden="true" />
                                <span>{t('buttons.viewMap')}</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce sm:bottom-8 sm:block">
                <div className="group flex h-8 w-5 cursor-pointer items-start justify-center rounded-full border-2 border-white/50 p-1.5 transition-colors duration-300 hover:border-white/80 sm:h-10 sm:w-6 sm:p-2">
                    <div className="h-2 w-0.5 rounded-full bg-white/50 transition-colors duration-300 group-hover:bg-white/80 sm:h-3 sm:w-1"></div>
                </div>
            </div>
        </section>
    );
}