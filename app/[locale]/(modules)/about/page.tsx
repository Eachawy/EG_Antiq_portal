import { Book, Clock, Shield, Lightbulb } from 'lucide-react';
import { historicalPeriods } from '@/app/[locale]/shared/data/sitesData';

export default function About() {
  return (

    <div className="bg-theme-bg">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553913861-c0fddf2619ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGFyY2hhZW9sb2d5JTIwcmVzZWFyY2h8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Egyptian Archaeology Research"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <p className="text-white/90 tracking-[0.3em] text-xs sm:text-sm mb-4">
              EDUCATIONAL RESOURCES
            </p>
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
              Understanding Egypt's Heritage
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              Learn about the classification of archaeological sites, Egypt's historical timeline, and the importance of cultural preservation.
            </p>
          </div>
        </div>
      </section>

      {/* Classification Section */}
      <section className="py-16 md:py-20 bg-theme-bg">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="bg-theme-card border border-theme-border rounded-xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-theme-primary/20 p-3 rounded-lg">
                <Book className="text-theme-primary" size={28} />
              </div>
              <h3 className="text-theme-text">
                How Archaeological Sites Are Classified
              </h3>
            </div>

            <div className="space-y-4 text-theme-text/80 leading-relaxed">
              <p>
                Archaeological sites in Egypt are classified based on several key criteria that help researchers and visitors understand their historical context and significance:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">Chronological Period</h4>
                  <p className="text-sm">Sites are categorized by the historical era in which they were constructed or primarily used, from Prehistoric times through the Islamic period.</p>
                </div>

                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">Function & Purpose</h4>
                  <p className="text-sm">Classification includes temples, tombs, fortifications, settlements, and administrative centers based on their original function.</p>
                </div>

                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">Cultural Significance</h4>
                  <p className="text-sm">Sites are evaluated for their historical importance, architectural innovation, and contribution to understanding ancient civilizations.</p>
                </div>

                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">Preservation State</h4>
                  <p className="text-sm">Documentation includes the current condition, from well-preserved structures to archaeological ruins requiring ongoing conservation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Periods */}
      <section className="py-16 md:py-20 bg-theme-bg">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="bg-theme-card border border-theme-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-theme-primary/20 p-3 rounded-lg">
                <Clock className="text-theme-primary" size={28} />
              </div>
              <h3 className="text-theme-text">
                Egypt's Historical Eras
              </h3>
            </div>

            <div className="space-y-6">
              {historicalPeriods.map((period, index) => (
                <div
                  key={period.name}
                  className="relative pl-8 pb-6 border-l-2 border-theme-border last:border-l-0 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-theme-primary border-4 border-theme-bg"></div>

                  <div className="bg-theme-accent p-6 rounded-lg">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h4 className="text-theme-primary text-xl">{period.name}</h4>
                      <span className="px-3 py-1 bg-theme-primary/20 rounded-full text-theme-primary text-xs">
                        {period.dateRange}
                      </span>
                    </div>
                    <p className="text-theme-text/80 leading-relaxed">{period.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preservation Importance */}
      <section className="py-16 md:py-20 bg-theme-bg">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-theme-card border border-theme-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-theme-primary/20 p-3 rounded-lg">
                  <Shield className="text-theme-primary" size={28} />
                </div>
                <h3 className="text-theme-text">
                  Cultural Preservation
                </h3>
              </div>

              <div className="space-y-4 text-theme-text/80 leading-relaxed text-sm">
                <p>
                  Preserving Egypt's archaeological heritage is crucial for maintaining the connection between past and present civilizations. These sites provide invaluable insights into human development, architectural innovation, and cultural evolution.
                </p>

                <div className="bg-theme-accent p-4 rounded-lg">
                  <h4 className="text-theme-primary mb-2">Key Preservation Efforts:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>UNESCO World Heritage Site designations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>Digital documentation and 3D scanning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>Ongoing archaeological research and excavations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>Conservation and restoration projects</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-theme-card border border-theme-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-theme-primary/20 p-3 rounded-lg">
                  <Lightbulb className="text-theme-primary" size={28} />
                </div>
                <h3 className="text-theme-text">
                  For Researchers & Students
                </h3>
              </div>

              <div className="space-y-4 text-theme-text/80 leading-relaxed text-sm">
                <p>
                  This platform serves as an educational resource for academic research, classroom learning, and independent study of Egyptian archaeology.
                </p>

                <div className="bg-theme-accent p-4 rounded-lg">
                  <h4 className="text-theme-primary mb-2">Research Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>Comprehensive site descriptions and historical context</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>Accurate dating and chronological information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>Geographic mapping and spatial relationships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>Cross-referencing with nearby archaeological sites</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-theme-primary/10 border border-theme-primary/30 rounded-lg">
                  <p className="text-theme-text text-sm">
                    <strong>Target Audience:</strong> Students, Researchers, Tourists, History Enthusiasts, Educators, and Cultural Institutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
