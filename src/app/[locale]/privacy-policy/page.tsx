import { Shield, Eye, Lock, Database, Cookie, Mail, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function PrivacyPolicyPage() {
    const t = useTranslations('privacyPolicy');

    return (
        <div className="min-h-screen bg-theme-bg pt-32 pb-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-theme-primary/10 rounded-full">
                            <Shield className="w-12 h-12 text-theme-primary" />
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

                    {/* Information We Collect */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.collect.title')}</h2>
                        </div>
                        <div className="space-y-4 text-theme-text">
                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.collect.personal.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed mb-2">
                                    {t('sections.collect.personal.description')}
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                    {(t.raw('sections.collect.personal.items') as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-theme-text mb-2">{t('sections.collect.usage.title')}</h3>
                                <p className="text-theme-text/80 leading-relaxed mb-2">
                                    {t('sections.collect.usage.description')}
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-theme-text/80 ml-4">
                                    {(t.raw('sections.collect.usage.items') as string[]).map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.usage.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">{t('sections.usage.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {(t.raw('sections.usage.items') as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Cookies and Tracking */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.cookies.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('sections.cookies.description')}
                            </p>
                            <p className="leading-relaxed">
                                {t.rich('sections.cookies.policyLink', {
                                    link: (chunks) => (
                                        <Link href="/cookie-policy" className="text-theme-primary hover:text-theme-secondary underline">
                                            {chunks}
                                        </Link>
                                    )
                                })}
                            </p>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.security.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">
                                {t('sections.security.description')}
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-4">
                                {(t.raw('sections.security.items') as string[]).map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            <p className="leading-relaxed mt-3">
                                {t('sections.security.note')}
                            </p>
                        </div>
                    </section>

                    {/* Data Sharing */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.sharing.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">{t('sections.sharing.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {(t.raw('sections.sharing.items') as string[]).map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.rights.title')}</h2>
                        </div>
                        <div className="space-y-3 text-theme-text/80">
                            <p className="leading-relaxed">{t('sections.rights.description')}</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                {(t.raw('sections.rights.items') as string[]).map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                            <p className="leading-relaxed mt-3">
                                {t('sections.rights.footer')}
                            </p>
                        </div>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.children.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.children.description')}
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.thirdParty.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.thirdParty.description')}
                        </p>
                    </section>

                    {/* International Data Transfers */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.international.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.international.description')}
                        </p>
                    </section>

                    {/* Changes to Privacy Policy */}
                    <section>
                        <h2 className="text-theme-primary mb-3">{t('sections.changes.title')}</h2>
                        <p className="text-theme-text/80 leading-relaxed">
                            {t('sections.changes.description')}
                        </p>
                    </section>

                    {/* Contact Information */}
                    {/* <section className="bg-theme-accent rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6 text-theme-primary" />
                            <h2 className="text-theme-primary">{t('sections.contact.title')}</h2>
                        </div>
                        <p className="text-theme-text/80 leading-relaxed mb-4">
                            {t('sections.contact.description')}
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
