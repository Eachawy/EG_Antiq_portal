'use client'

import { Search, Map as MapIcon } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'

export function HomePageExploreEgyptSection() {
  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(https://images.unsplash.com/photo-1758546705512-2071bf8dc17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWRzJTIwZGVzZXJ0JTIwc3Vuc2V0fGVufDF8fHx8MTc2NjMzOTQyNHww&ixlib=rb-4.1.0&q=80&w=1080)` 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 text-center z-10 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-4 sm:mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-theme-primary/20 border border-theme-primary rounded-full text-theme-primary text-xs sm:text-sm tracking-wider backdrop-blur-sm hover:bg-theme-primary/30 hover:scale-105 transition-all duration-300">
              EGYPTIAN ARCHAEOLOGICAL HERITAGE
            </span>
          </div>
          
          <h1 className="text-white mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 leading-tight">
            Explore Egypt's Ancient Wonders
          </h1>
          
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Discover major and minor archaeological sites across different historical periods. 
            From prehistoric settlements to Islamic monuments, explore Egypt's rich cultural heritage spanning over 5,000 years.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-4 animate-in fade-in zoom-in-50 duration-700 delay-300">
            {[
              { value: '8+', label: 'Major Sites' },
              { value: '4', label: 'Historical Periods' },
              { value: '5000+', label: 'Years of History' },
              { value: '27', label: 'Governorates' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 sm:p-4 lg:p-6 hover:bg-white/20 hover:border-white/40 hover:scale-105 hover:-translate-y-1 transition-all duration-500 cursor-default group"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-white/80 text-xs sm:text-sm group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 animate-in fade-in zoom-in-95 duration-700 delay-500">
            <Link href="/sites" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto bg-theme-primary hover:bg-theme-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg tracking-wider transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black/60 text-sm sm:text-base"
                aria-label="Explore archaeological sites">
                <Search size={18} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
                <span>Explore Sites</span>
              </button>
            </Link>
            <Link href="/map" className="w-full sm:w-auto">
              <button className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg tracking-wider transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black/60 text-sm sm:text-base"
                aria-label="View interactive map">
                <MapIcon size={18} className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <span>View Map</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5 sm:p-2 hover:border-white/80 transition-colors duration-300 cursor-pointer group">
          <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  );
}