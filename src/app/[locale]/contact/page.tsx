'use client';

import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { contactEndpoints } from '@/lib/api/endpoints';

export default function ContactPage() {
    const tHero = useTranslations('contact.hero');
    const tInfo = useTranslations('contact.info');
    const tForm = useTranslations('contact.form');
    // const t = useTranslations('header');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear field error when user starts typing
        if (fieldErrors[name as keyof typeof fieldErrors]) {
            setFieldErrors({
                ...fieldErrors,
                [name]: ''
            });
        }
        // Clear general error message
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    // Enhanced email validation
    const validateEmail = (email: string): boolean => {
        // Basic format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        // Additional checks
        const parts = email.split('@');
        if (parts.length !== 2) return false;

        const [localPart, domain] = parts;

        // Check local part (before @)
        if (localPart.length === 0 || localPart.length > 64) return false;
        if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
        if (localPart.includes('..')) return false;

        // Check domain part (after @)
        if (domain.length === 0 || domain.length > 255) return false;
        if (domain.startsWith('.') || domain.endsWith('.')) return false;
        if (domain.includes('..')) return false;

        // Check domain has valid TLD
        const domainParts = domain.split('.');
        if (domainParts.length < 2) return false;
        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2) return false;

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset messages
        setShowSuccess(false);
        setErrorMessage('');
        setFieldErrors({ name: '', email: '', message: '' });

        let isValid = true;
        const newFieldErrors = { name: '', email: '', message: '' };

        // Validate name
        if (!formData.name.trim()) {
            newFieldErrors.name = tForm('errors.nameRequired');
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newFieldErrors.name = tForm('errors.nameTooShort') || 'Name must be at least 2 characters';
            isValid = false;
        } else if (formData.name.trim().length > 100) {
            newFieldErrors.name = tForm('errors.nameTooLong') || 'Name must be less than 100 characters';
            isValid = false;
        }

        // Validate email
        if (!formData.email.trim()) {
            newFieldErrors.email = tForm('errors.emailRequired');
            isValid = false;
        } else if (!validateEmail(formData.email.trim())) {
            newFieldErrors.email = tForm('errors.emailInvalid');
            isValid = false;
        }

        // Validate message
        if (!formData.message.trim()) {
            newFieldErrors.message = tForm('errors.messageRequired');
            isValid = false;
        } else if (formData.message.trim().length < 10) {
            newFieldErrors.message = tForm('errors.messageTooShort') || 'Message must be at least 10 characters';
            isValid = false;
        } else if (formData.message.trim().length > 1000) {
            newFieldErrors.message = tForm('errors.messageTooLong') || 'Message must be less than 1000 characters';
            isValid = false;
        }

        if (!isValid) {
            setFieldErrors(newFieldErrors);
            return;
        }

        // Submit to API
        setIsLoading(true);

        try {
            await contactEndpoints.submit({
                name: formData.name.trim(),
                email: formData.email.trim(),
                message: formData.message.trim(),
            });

            setShowSuccess(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (error: any) {
            console.error('Error submitting contact form:', error);
            setErrorMessage(
                error?.response?.data?.error?.message ||
                tForm('errors.submitFailed') ||
                'Failed to submit contact form. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-theme-bg">
            {/* Full-Width Hero Section */}
            {/* <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <img
                    src="/styles/images/img/contact.jpeg"
                    alt="Contact Us"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-6 md:px-12 text-center">
                        <p className="text-white/90 tracking-[0.3em] text-xs sm:text-sm mb-4">
                            {tHero('subtitle')}
                        </p>
                        <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
                            {tHero('title')}
                        </h1>
                        <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base">
                            {tHero('description')}
                        </p>
                    </div>
                </div>
            </section> */}

            {/* Main Content Section */}
            <section className="py-16 md:py-20 bg-theme-bg md:pt-40">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <div className="bg-theme-primary/20 p-3 rounded-lg">
                                    <MapPin className="text-theme-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-theme-text mb-2">{tInfo('addressTitle')}</h3>
                                    <p className="text-theme-text/70">
                                        {tInfo('address').split('\n').map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="bg-theme-primary/20 p-3 rounded-lg">
                                    <Phone className="text-theme-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-theme-text mb-2">{tInfo('phoneTitle')}</h3>
                                    <p className="text-theme-text/70">+20 2 3377 3222</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="bg-theme-primary/20 p-3 rounded-lg">
                                    <Mail className="text-theme-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-theme-text mb-2">{tInfo('emailTitle')}</h3>
                                    <p className="text-theme-text/70">info@kemetra.org</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder={tForm('namePlaceholder')}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-theme-card border rounded-lg px-4 py-3 text-theme-text placeholder-theme-muted/50 focus:outline-none transition-colors ${fieldErrors.name
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-theme-border focus:border-theme-primary'
                                        }`}
                                />
                                {fieldErrors.name && (
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                        <span className="text-xs">⚠</span> {fieldErrors.name}
                                    </p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder={tForm('emailPlaceholder')}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-theme-card border rounded-lg px-4 py-3 text-theme-text placeholder-theme-muted/50 focus:outline-none transition-colors ${fieldErrors.email
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-theme-border focus:border-theme-primary'
                                        }`}
                                />
                                {fieldErrors.email && (
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                        <span className="text-xs">⚠</span> {fieldErrors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <textarea
                                    placeholder={tForm('messagePlaceholder')}
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full bg-theme-card border rounded-lg px-4 py-3 text-theme-text placeholder-theme-muted/50 focus:outline-none transition-colors resize-none ${fieldErrors.message
                                        ? 'border-red-500 focus:border-red-500'
                                        : 'border-theme-border focus:border-theme-primary'
                                        }`}
                                ></textarea>
                                {fieldErrors.message && (
                                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                        <span className="text-xs">⚠</span> {fieldErrors.message}
                                    </p>
                                )}
                            </div>
                            {errorMessage && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                        <span className="text-base">⚠</span> {errorMessage}
                                    </p>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-theme-secondary hover:bg-theme-primary text-white px-8 py-4 rounded tracking-[0.2em] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        {tForm('sending')}
                                    </>
                                ) : (
                                    tForm('submitButton')
                                )}
                            </button>
                            {showSuccess && (
                                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                                        <span className="text-base">✓</span> {tForm('successMessage')}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
