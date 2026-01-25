'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
    const t = useTranslations('cookieConsent');
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Always true, cannot be disabled
        functional: true,
        analytics: true,
        advertising: true,
    });

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show banner after a small delay for better UX
            setTimeout(() => setShowBanner(true), 1000);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = {
            essential: true,
            functional: true,
            analytics: true,
            advertising: true,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleRejectAll = () => {
        const onlyEssential = {
            essential: true,
            functional: false,
            analytics: false,
            advertising: false,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential));
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleSavePreferences = () => {
        const savedPreferences = {
            ...preferences,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookieConsent', JSON.stringify(savedPreferences));
        setShowBanner(false);
        setShowSettings(false);
    };

    const handleClose = () => {
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/30 z-40" onClick={handleClose} />

            {/* Cookie Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-theme-card border-2 border-theme-primary rounded-2xl shadow-2xl overflow-hidden">
                        {!showSettings ? (
                            // Main Banner
                            <div className="p-6 md:p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="bg-theme-primary/10 p-3 rounded-full flex-shrink-0">
                                        <Cookie className="w-6 h-6 text-theme-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-theme-text text-lg md:text-xl font-semibold mb-2">
                                            {t('title')}
                                        </h3>
                                        <p className="text-theme-text/80 text-sm md:text-base leading-relaxed">
                                            {t('description')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="text-theme-muted hover:text-theme-text transition-colors flex-shrink-0"
                                        aria-label="Close"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 items-center">
                                    <div className="flex gap-3 w-full sm:w-auto">
                                        <button
                                            onClick={handleAcceptAll}
                                            className="flex-1 sm:flex-none bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium text-sm"
                                        >
                                            {t('acceptAll')}
                                        </button>
                                        <button
                                            onClick={handleRejectAll}
                                            className="flex-1 sm:flex-none bg-theme-accent hover:bg-theme-accent/80 text-theme-text px-6 py-3 rounded-lg transition-colors duration-300 font-medium text-sm border border-theme-border"
                                        >
                                            {t('rejectAll')}
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setShowSettings(true)}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 text-theme-primary hover:text-theme-secondary transition-colors font-medium text-sm"
                                    >
                                        <Settings className="w-4 h-4" />
                                        {t('customize')}
                                    </button>
                                    <Link
                                        href="/cookie-policy"
                                        onClick={() => setShowBanner(false)}
                                        className="text-theme-primary hover:text-theme-secondary transition-colors text-sm underline"
                                    >
                                        {t('cookiePolicy')}
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            // Settings Panel
                            <div className="p-6 md:p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="bg-theme-primary/10 p-3 rounded-full flex-shrink-0">
                                        <Settings className="w-6 h-6 text-theme-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-theme-text text-lg md:text-xl font-semibold mb-2">
                                            {t('settings.title')}
                                        </h3>
                                        <p className="text-theme-text/80 text-sm leading-relaxed">
                                            {t('settings.description')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowSettings(false)}
                                        className="text-theme-muted hover:text-theme-text transition-colors flex-shrink-0"
                                        aria-label="Back"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {/* Essential Cookies */}
                                    <div className="bg-theme-accent rounded-lg p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="text-theme-text font-semibold mb-1">
                                                    {t('settings.essential.title')}
                                                </h4>
                                                <p className="text-theme-text/70 text-sm">
                                                    {t('settings.essential.description')}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="bg-theme-primary/20 text-theme-primary px-3 py-1 rounded-full text-xs font-medium">
                                                    {t('settings.essential.status')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Functional Cookies */}
                                    <div className="bg-theme-accent rounded-lg p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="text-theme-text font-semibold mb-1">
                                                    {t('settings.functional.title')}
                                                </h4>
                                                <p className="text-theme-text/70 text-sm">
                                                    {t('settings.functional.description')}
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.functional}
                                                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-theme-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Analytics Cookies */}
                                    <div className="bg-theme-accent rounded-lg p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="text-theme-text font-semibold mb-1">
                                                    {t('settings.analytics.title')}
                                                </h4>
                                                <p className="text-theme-text/70 text-sm">
                                                    {t('settings.analytics.description')}
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.analytics}
                                                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-theme-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Advertising Cookies */}
                                    <div className="bg-theme-accent rounded-lg p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="text-theme-text font-semibold mb-1">
                                                    {t('settings.advertising.title')}
                                                </h4>
                                                <p className="text-theme-text/70 text-sm">
                                                    {t('settings.advertising.description')}
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences.advertising}
                                                    onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-theme-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-primary"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={handleSavePreferences}
                                        className="flex-1 bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium text-sm"
                                    >
                                        {t('settings.save')}
                                    </button>
                                    <button
                                        onClick={handleAcceptAll}
                                        className="flex-1 bg-theme-accent hover:bg-theme-accent/80 text-theme-text px-6 py-3 rounded-lg transition-colors duration-300 font-medium text-sm border border-theme-border"
                                    >
                                        {t('acceptAll')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
