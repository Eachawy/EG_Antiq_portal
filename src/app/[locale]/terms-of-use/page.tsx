import { FileText, AlertCircle, Scale, Ban, UserCheck, BookOpen, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TermsOfUsePage() {
    const t = useTranslations('termsOfUse');

    return (
        <div className="min-h-screen bg-theme-bg pt-32 pb-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-theme-primary/10 rounded-full">
                            <FileText className="w-12 h-12 text-theme-primary" />
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

                    {/* Acceptance of Terms */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <UserCheck className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.acceptance.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('sections.acceptance.p1')}
                            </p>
                            <p className="leading-relaxed">
                                {t('sections.acceptance.p2')}
                            </p>
                        </div>
                    </section>

                    {/* Use of Services */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.usage.title')}</h2>
                        </div>
                        <div className="space-y-4 text-theme-text">
                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.usage.permitted.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed mb-2">
                                    {t('sections.usage.permitted.p1')}
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                    {(t.raw('sections.usage.permitted.items') as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.usage.account.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed">
                                    {t('sections.usage.account.p1')}
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                    {(t.raw('sections.usage.account.items') as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Prohibited Activities */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Ban className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.prohibited.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">{t('sections.prohibited.p1')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {(t.raw('sections.prohibited.items') as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Scale className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.ip.title')}</h2>
                        </div>
                        <div className="space-y-4 text-theme-text">
                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.ip.content.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed">
                                    {t('sections.ip.content.p1')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.ip.license.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed">
                                    {t('sections.ip.license.p1')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.ip.userContent.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed">
                                    {t('sections.ip.userContent.p1')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.ip.academic.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed">
                                    {t('sections.ip.academic.p1')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Third-Party Services */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.thirdParty.title')}</h2>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('sections.thirdParty.p1')}
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {(t.raw('sections.thirdParty.items') as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <p className="leading-relaxed mt-3">
                                {t('sections.thirdParty.p2')}
                            </p>
                        </div>
                    </section>

                    {/* Tour Guide Services */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.tourGuides.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.tourGuides.p1')}
                        </p>
                    </section>

                    {/* E-commerce and Purchases */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.ecommerce.title')}</h2>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('sections.ecommerce.p1')}
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {(t.raw('sections.ecommerce.items') as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Disclaimer of Warranties */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.disclaimer.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('sections.disclaimer.p1')}
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {(t.raw('sections.disclaimer.items') as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <p className="leading-relaxed mt-3">
                                {t('sections.disclaimer.p2')}
                            </p>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.liability.title')}</h2>
                        </div>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.liability.p1')}
                        </p>
                    </section>

                    {/* Indemnification */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.indemnification.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.indemnification.p1')}
                        </p>
                    </section>

                    {/* Termination */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.termination.title')}</h2>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('sections.termination.p1')}
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {(t.raw('sections.termination.items') as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <p className="leading-relaxed mt-3">
                                {t('sections.termination.p2')}
                            </p>
                        </div>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.law.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.law.p1')}
                        </p>
                    </section>

                    {/* Severability */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.severability.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.severability.p1')}
                        </p>
                    </section>

                    {/* Entire Agreement */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.agreement.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.agreement.p1')}
                        </p>
                    </section>

                    {/* Contact Information */}
                    {/* <section className="bg-theme-accent rounded-lg p-6">
                        <h2 className="text-theme-primary mb-4">{t('sections.contact.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed mb-4">
                            {t('sections.contact.p1')}
                        </p>
                        <div className="space-y-2 text-theme-text/80">
                            <p><strong>{t('sections.contact.email')}:</strong> {t('sections.contact.emailValue')}</p>
                            <p><strong>{t('sections.contact.address')}:</strong> {t('sections.contact.addressValue')}</p>
                            <p><strong>{t('sections.contact.phone')}:</strong> {t('sections.contact.phoneValue')}</p>
                        </div>
                    </section> */}
                </div>
            </div>
        </div>
    );
}
