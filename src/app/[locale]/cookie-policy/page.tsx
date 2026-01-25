import { Cookie, Settings, BarChart, Shield, Eye, Sliders } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CookiePolicyPage() {
    const t = useTranslations('cookiePolicy');

    return (
        <div className="min-h-screen bg-theme-bg pt-32 pb-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-theme-primary/10 rounded-full">
                            <Cookie className="w-12 h-12 text-theme-primary" />
                        </div>
                    </div>
                    <h1 className="text-theme-text mb-4">{t('title')}</h1>
                    <p className="text-theme-muted">{t('lastUpdated')}</p>
                </div>

                {/* Content */}
                <div className="bg-theme-card border border-theme-border rounded-xl p-8 md:p-12 space-y-8">
                    {/* Introduction */}
                    <section>
                        <p className="text-theme-text leading-relaxed">
                            {t('intro')}
                        </p>
                    </section>

                    {/* What Are Cookies */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('whatAreCookies.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('whatAreCookies.p1')}
                            </p>
                            <p className="leading-relaxed">
                                {t('whatAreCookies.p2')}
                            </p>
                        </div>
                    </section>

                    {/* Types of Cookies */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('types.title')}</h2>
                        </div>
                        <div className="space-y-6">
                            {/* Essential Cookies */}
                            <div className="bg-theme-accent rounded-lg p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <Shield className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-theme-text mb-2">{t('types.essential.title')}</h3>
                                        <p className="text-theme-text/80 leading-relaxed mb-3">
                                            {t('types.essential.p1')}
                                        </p>
                                        <div className="space-y-2 text-theme-text/80 text-sm">
                                            <p><strong>{t('types.essential.purpose')}</strong></p>
                                            <ul className="list-disc list-inside ml-4 space-y-1">
                                                {(t.raw('types.essential.items') as string[]).map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-3"><strong>{t('types.essential.duration')}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Functional Cookies */}
                            <div className="bg-theme-accent rounded-lg p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <Sliders className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-theme-text mb-2">{t('types.functional.title')}</h3>
                                        <p className="text-theme-text/80 leading-relaxed mb-3">
                                            {t('types.functional.p1')}
                                        </p>
                                        <div className="space-y-2 text-theme-text/80 text-sm">
                                            <p><strong>{t('types.functional.purpose')}</strong></p>
                                            <ul className="list-disc list-inside ml-4 space-y-1">
                                                {(t.raw('types.functional.items') as string[]).map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-3"><strong>{t('types.functional.duration')}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="bg-theme-accent rounded-lg p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <BarChart className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-theme-text mb-2">{t('types.analytics.title')}</h3>
                                        <p className="text-theme-text/80 leading-relaxed mb-3">
                                            {t('types.analytics.p1')}
                                        </p>
                                        <div className="space-y-2 text-theme-text/80 text-sm">
                                            <p><strong>{t('types.analytics.purpose')}</strong></p>
                                            <ul className="list-disc list-inside ml-4 space-y-1">
                                                {(t.raw('types.analytics.items') as string[]).map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-3"><strong>{t('types.analytics.thirdParty')}</strong></p>
                                            <p><strong>{t('types.analytics.duration')}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Targeting Cookies */}
                            <div className="bg-theme-accent rounded-lg p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <Eye className="w-5 h-5 text-theme-primary mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-theme-text mb-2">{t('types.targeting.title')}</h3>
                                        <p className="text-theme-text/80 leading-relaxed mb-3">
                                            {t('types.targeting.p1')}
                                        </p>
                                        <div className="space-y-2 text-theme-text/80 text-sm">
                                            <p><strong>{t('types.targeting.purpose')}</strong></p>
                                            <ul className="list-disc list-inside ml-4 space-y-1">
                                                {(t.raw('types.targeting.items') as string[]).map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-3"><strong>{t('types.targeting.thirdParty')}</strong></p>
                                            <p><strong>{t('types.targeting.duration')}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Third-Party Cookies */}
                    <section>
                        <h2 className="text-theme-primary mb-4">{t('thirdParty.title')}</h2>
                        <div className="space-y-4">
                            <p className="text-theme-text/80 leading-relaxed">
                                {t('thirdParty.p1')}
                            </p>

                            <div className="bg-theme-accent rounded-lg p-6 space-y-4">
                                <div>
                                    <h3 className="text-theme-text mb-2">{t('thirdParty.google.title')}</h3>
                                    <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                        {(t.raw('thirdParty.google.items') as string[]).map((item, index) => (
                                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                        ))}
                                    </ul>
                                    <p className="text-theme-text/80 text-sm mt-2">
                                        {t.rich('thirdParty.google.learnMore', {
                                            link: (chunks) => (
                                                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-theme-primary hover:underline">
                                                    {chunks}
                                                </a>
                                            )
                                        })}
                                    </p>
                                </div>

                                <div className="border-t border-theme-border pt-4">
                                    <h3 className="text-theme-text mb-2">{t('thirdParty.social.title')}</h3>
                                    <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                        {(t.raw('thirdParty.social.items') as string[]).map((item, index) => (
                                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t border-theme-border pt-4">
                                    <h3 className="text-theme-text mb-2">{t('thirdParty.other.title')}</h3>
                                    <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                        {(t.raw('thirdParty.other.items') as string[]).map((item, index) => (
                                            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Cookies */}
                    <section>
                        <h2 className="text-theme-primary mb-4">{t('howWeUse.title')}</h2>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">{t('howWeUse.p1')}</p>
                            <div className="bg-theme-accent rounded-lg p-6">
                                <ul className="space-y-3">
                                    {(t.raw('howWeUse.items') as string[]).map((item, index) => (
                                        <li key={index} className="flex gap-3">
                                            <span className="text-theme-primary font-bold">•</span>
                                            <span dangerouslySetInnerHTML={{ __html: item }} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Cookie Management */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('management.title')}</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-theme-text mb-2">{t('management.browserSettings.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed mb-3">
                                    {t('management.browserSettings.p1')}
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                    {(t.raw('management.browserSettings.items') as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-theme-accent rounded-lg p-6">
                                <h3 className="text-theme-text mb-3">{t('management.instructions.title')}</h3>
                                <div className="space-y-2 text-theme-text/80 text-sm">
                                    {(t.raw('management.instructions.items') as string[]).map((item, index) => (
                                        <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-theme-text mb-2">{t('management.optOut.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed mb-2">
                                    {t('management.optOut.p1')}
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                    {(t.raw('management.optOut.items') as any[]).map((item, index) => (
                                        <li key={index}>
                                            {item.label} <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-theme-primary hover:underline">{item.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Mobile Devices */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('mobile.title')}</h2>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('mobile.p1')}
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {(t.raw('mobile.items') as string[]).map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                            <p className="leading-relaxed mt-3">
                                {t('mobile.p2')}
                            </p>
                        </div>
                    </section>

                    {/* Do Not Track */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('dnt.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('dnt.p1')}
                        </p>
                    </section>

                    {/* Updates to Policy */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('updates.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('updates.p1')}
                        </p>
                    </section>

                    {/* More Information */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('moreInfo.title')}</h2>
                        <div className="space-y-2 text-theme-text/80">
                            <p className="leading-relaxed">{t('moreInfo.p1')}</p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {(t.raw('moreInfo.items') as any[]).map((item, index) => (
                                    <li key={index}>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-theme-primary hover:underline">{item.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Contact Information */}
                    {/* <section className="bg-theme-accent rounded-lg p-6">
                        <h2 className="text-theme-primary mb-4">{t('contact.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed mb-4">
                            {t('contact.p1')}
                        </p>
                        <div className="space-y-2 text-theme-text/80">
                            <p><strong>{t('contact.email')}:</strong> {t('contact.emailValue')}</p>
                            <p><strong>{t('contact.address')}:</strong> {t('contact.addressValue')}</p>
                            <p><strong>{t('contact.phone')}:</strong> {t('contact.phoneValue')}</p>
                        </div>
                    </section> */}
                </div>
            </div>
        </div>
    );
}
