'use client';

import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
// import { usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('footer');

    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubscribe = () => {
        // Reset messages
        setShowSuccess(false);
        setErrorMessage('');

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setErrorMessage(t('newsletter.errors.required'));
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage(t('newsletter.errors.invalid'));
            return;
        }

        // Show success message
        setShowSuccess(true);
        setEmail('');

        // Hide success message after 5 seconds
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubscribe();
        }
    };

    return (
        <footer className="bg-theme-card border-t border-theme-border">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* About Section */}
                    <div>
                        <h3 className="text-theme-primary tracking-[0.2em] mb-4">{t('about.title')}</h3>
                        <p className="text-theme-text/70 text-sm leading-relaxed mb-6">
                            {t('about.description')}
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-theme-accent hover:bg-theme-primary p-2.5 rounded-full transition-all duration-300 group"
                                aria-label="Facebook"
                            >
                                <Facebook className="text-theme-text group-hover:text-white" size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-theme-accent hover:bg-theme-primary p-2.5 rounded-full transition-all duration-300 group"
                                aria-label="Twitter"
                            >
                                <Twitter className="text-theme-text group-hover:text-white" size={18} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-theme-accent hover:bg-theme-primary p-2.5 rounded-full transition-all duration-300 group"
                                aria-label="Instagram"
                            >
                                <Instagram className="text-theme-text group-hover:text-white" size={18} />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-theme-accent hover:bg-theme-primary p-2.5 rounded-full transition-all duration-300 group"
                                aria-label="YouTube"
                            >
                                <Youtube className="text-theme-text group-hover:text-white" size={18} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-theme-accent hover:bg-theme-primary p-2.5 rounded-full transition-all duration-300 group"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="text-theme-text group-hover:text-white" size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-theme-primary mb-4">{t('newsletter.title')}</h3>
                        <p className="text-theme-text/70 text-sm mb-6">
                            {t('newsletter.subtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder={t('newsletter.placeholder')}
                                className="flex-1 px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-text text-sm focus:outline-none focus:border-theme-primary transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className="bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors duration-300 text-sm whitespace-nowrap" onClick={handleSubscribe}>
                                {t('newsletter.button')}
                            </button>
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                        {showSuccess && <p className="text-green-500 text-sm mt-2">{t('newsletter.success')}</p>}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-theme-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-center text-theme-text/50 text-sm">
                            {t('bottom.copyright', { year: currentYear })}
                        </p>
                        <div className="flex gap-6">
                            <a href="#privacy" className="text-theme-text/50 hover:text-theme-primary text-sm transition-colors">
                                {t('bottom.privacyPolicy')}
                            </a>
                            <a href="#terms" className="text-theme-text/50 hover:text-theme-primary text-sm transition-colors">
                                {t('bottom.termsOfUse')}
                            </a>
                            <a href="#cookies" className="text-theme-text/50 hover:text-theme-primary text-sm transition-colors">
                                {t('bottom.cookiePolicy')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
