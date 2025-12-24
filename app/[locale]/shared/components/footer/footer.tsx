'use client'

import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import styles from './footer.module.scss'
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function Footer() {
    const pathname = usePathname()
    const t = useTranslations('footer')

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
            setErrorMessage('Please enter your email address');
            return;
        }

        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address');
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
            <div className={styles.nav}>
                {t('copyright')}
            </div>
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* About Section */}
                    <div>
                        <h3 className="text-theme-primary tracking-[0.2em] mb-4">ANCIENT EGYPT</h3>
                        <p className="text-theme-text/70 text-sm leading-relaxed mb-6">
                            Preserving and sharing the wonders of ancient Egyptian civilization. Explore archaeological sites, monuments, and historical treasures from the land of the pharaohs.
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
                        <h3 className="text-theme-primary mb-4">Subscribe to Our Newsletter</h3>
                        <p className="text-theme-text/70 text-sm mb-6">
                            Get the latest updates on new discoveries and archaeological sites
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <InputText
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className='flex-1 px-4 py-3 bg-theme-bg border border-theme-border rounded-lg text-theme-text text-sm focus:outline-none focus:border-theme-primary transition-colors'
                            />
                            <Button
                                label="Subscribe"
                                onClick={handleSubscribe}
                                className='bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors duration-300 text-sm whitespace-nowrap'
                            />
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                        {showSuccess && <p className="text-green-500 text-sm mt-2">You have been subscribed successfully!</p>}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-theme-border pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-center text-theme-text/50 text-sm">
                            © {currentYear} Ancient Egypt Archaeological Sites. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#privacy" className="text-theme-text/50 hover:text-theme-primary text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="text-theme-text/50 hover:text-theme-primary text-sm transition-colors">
                                Terms of Use
                            </a>
                            <a href="#cookies" className="text-theme-text/50 hover:text-theme-primary text-sm transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
