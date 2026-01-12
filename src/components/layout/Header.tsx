'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
// import { hasToken } from '@/features/auth/utils/token';
import { useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, Heart, BookMarked, History, Settings, LogOut } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { LoginModal } from '@/components/auth/LoginModal';
import { usePathname } from '@/i18n/routing';
import { useTheme } from "next-themes";
import Image from 'next/image';
import { useAuth } from '../auth/AuthContext';

interface User {
  name: string;
  email: string;
  avatar: string;
}

export default function Header() {
  const pathname = usePathname();
  // const { theme: _theme = "system" } = useTheme();
  const isActive = (href: string) => pathname === href;
  const t = useTranslations('header');
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isUserMenuOpen && !target.closest('.user-menu-dropdown') && !target.closest('.user-menu-button')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.sites'), href: '/sites' },
    { name: t('nav.map'), href: '/map' },
    { name: t('nav.tourGuides'), href: '/tour-guides' },
    { name: t('nav.books'), href: '/books' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];


  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-theme-card/98 border-theme-border/50 border-b shadow-2xl backdrop-blur-xl'
        : 'bg-theme-card/80 border-theme-border/30 border-b backdrop-blur-lg'
        }`}>
        {/* Top Bar with Enhanced Gradient Accent */}
        <div className={`from-theme-primary via-theme-secondary to-theme-primary h-1 bg-gradient-to-r transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'
          }`}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3' : 'py-4 sm:py-5'
            }`}>
            {/* Brand - Left Side with Enhanced Styling */}
            <Link
              href="/"
              className="group flex items-center gap-3"
              aria-label={t('aria.homeLabel')}
            >
              {/* Logo Icon */}
              <div className="relative">
                <span className='Kemetra_Logo' />
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="mx-8 hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative rounded-xl px-4 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 xl:px-5 xl:text-sm ${isActive(link.href)
                    ? 'text-theme-primary'
                    : 'text-theme-muted hover:text-theme-primary'
                    }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {/* Text */}
                  <span className="relative z-10">{link.name}</span>

                  {/* Active Indicator */}
                  {isActive(link.href) && (
                    <>
                      <span className="via-theme-primary absolute bottom-0 left-1/2 h-0.5 w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent to-transparent"></span>
                      <span className="bg-theme-primary absolute bottom-1 left-1/2 size-1 -translate-x-1/2 animate-pulse rounded-full"></span>
                    </>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Profile or Login Button - Desktop */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="text-theme-text hover:text-theme-primary bg-theme-accent/50 hover:bg-theme-accent user-menu-button group hidden items-center justify-center rounded-xl p-1.5 transition-all duration-300 hover:shadow-lg lg:flex"
                  >
                    <div className="relative">
                      <div className="bg-theme-primary/30 absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
                      <div className="ring-theme-primary/50 group-hover:ring-theme-primary relative size-9 overflow-hidden rounded-full ring-2 transition-all duration-300 group-hover:scale-110">
                        <Image src={user.avatar} alt={user.name} width={36} height={36} className="size-full object-cover" unoptimized />
                      </div>
                    </div>
                  </button>

                  {/* User Menu Dropdown */}
                  <div
                    className={`bg-theme-card/98 border-theme-border/50 user-menu-dropdown absolute right-0 top-full mt-2 min-w-[240px] overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl transition-all duration-300 ${isUserMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                      }`}
                    style={{ zIndex: 1000 }}
                  >
                    {/* User Info Header */}
                    <div className="from-theme-primary/10 to-theme-secondary/10 border-theme-border/50 border-b bg-gradient-to-br p-4">
                      <div className="flex items-center gap-3">
                        <div className="border-theme-primary size-12 overflow-hidden rounded-full border-2">
                          <Image src={user.avatar} alt={user.name} width={48} height={48} className="size-full object-cover" unoptimized />
                        </div>
                        <div className="flex-1">
                          <div className="text-theme-text text-sm font-semibold">{user.name}</div>
                          <div className="text-theme-muted truncate text-xs">{user.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          router.push('/profile');
                          setIsUserMenuOpen(false);
                        }}
                        className="text-theme-text hover:text-theme-primary hover:bg-theme-accent/50 flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200"
                      >
                        <User size={18} />
                        <span>{t('userMenu.profile')}</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push('/favorites');
                          setIsUserMenuOpen(false);
                        }}
                        className="text-theme-text hover:text-theme-primary hover:bg-theme-accent/50 flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200"
                      >
                        <Heart size={18} />
                        <span>{t('userMenu.favorites')}</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push('/saved-searches');
                          setIsUserMenuOpen(false);
                        }}
                        className="text-theme-text hover:text-theme-primary hover:bg-theme-accent/50 flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200"
                      >
                        <BookMarked size={18} />
                        <span>{t('userMenu.savedSearches')}</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push('/history');
                          setIsUserMenuOpen(false);
                        }}
                        className="text-theme-text hover:text-theme-primary hover:bg-theme-accent/50 flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200"
                      >
                        <History size={18} />
                        <span>{t('userMenu.history')}</span>
                      </button>
                      <button
                        onClick={() => {
                          router.push('/hisettingsstory');
                          setIsUserMenuOpen(false);
                        }}
                        className="text-theme-text hover:text-theme-primary hover:bg-theme-accent/50 flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200"
                      >
                        <Settings size={18} />
                        <span>{t('userMenu.settings')}</span>
                      </button>
                    </div>

                    {/* Logout Button */}
                    <div className="border-theme-border/50 border-t p-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/10"
                      >
                        <LogOut size={18} />
                        <span>{t('userMenu.logout')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-theme-primary hover:bg-theme-secondary hover:shadow-theme-primary/30 group hidden items-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 lg:flex"
                >
                  <LogIn size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-sm">{t('auth.signIn')}</span>
                </button>
              )}

              {/* Language Toggle Button */}
              <LanguageSwitcher />

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-theme-primary hover:text-theme-secondary hover:bg-theme-accent focus:ring-theme-primary/50 rounded-xl p-2.5 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 active:scale-95 lg:hidden"
                aria-label={isMenuOpen ? t('aria.closeMenu') : t('aria.openMenu')}
                aria-expanded={isMenuOpen}
              >
                <div className="relative size-6 sm:size-7">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
                      }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}
                  />
                </div>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`bg-theme-card/98 fixed inset-x-0 backdrop-blur-xl transition-all duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'}`}
            style={{
              top: 'calc(var(--header-height, 73px))',
              bottom: 0,
              height: 'calc(100vh - var(--header-height, 73px))'
            }}
          >
            <div className="flex h-full flex-col">
              <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:text-base ${isActive(link.href)
                      ? 'text-theme-primary bg-theme-accent/50'
                      : 'text-theme-muted hover:text-theme-primary hover:bg-theme-accent/30'
                      }`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Profile Links - Mobile Only (shown when authenticated) */}
                {isAuthenticated && user && (
                  <>
                    <div className="border-theme-border/50 my-4 border-t pt-4">
                      <div className="text-theme-muted px-4 pb-2 text-xs tracking-wider">{t('userMenu.account').toUpperCase()}</div>

                      <Link
                        href="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:text-base ${isActive('/profile')
                          ? 'text-theme-primary bg-theme-accent/50'
                          : 'text-theme-muted hover:text-theme-primary hover:bg-theme-accent/30'
                          }`}
                        aria-current={isActive('/profile') ? 'page' : undefined}
                      >
                        <User size={18} />
                        <span>{t('userMenu.profile').toUpperCase()}</span>
                      </Link>

                      <Link
                        href="/favorites"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:text-base ${isActive('/favorites')
                          ? 'text-theme-primary bg-theme-accent/50'
                          : 'text-theme-muted hover:text-theme-primary hover:bg-theme-accent/30'
                          }`}
                        aria-current={isActive('/favorites') ? 'page' : undefined}
                      >
                        <Heart size={18} />
                        <span>{t('userMenu.favorites').toUpperCase()}</span>
                      </Link>

                      <Link
                        href="/saved-searches"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:text-base ${isActive('/saved-searches')
                          ? 'text-theme-primary bg-theme-accent/50'
                          : 'text-theme-muted hover:text-theme-primary hover:bg-theme-accent/30'
                          }`}
                        aria-current={isActive('/saved-searches') ? 'page' : undefined}
                      >
                        <BookMarked size={18} />
                        <span>{t('userMenu.savedSearches').toUpperCase()}</span>
                      </Link>

                      <Link
                        href="/history"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:text-base ${isActive('/history')
                          ? 'text-theme-primary bg-theme-accent/50'
                          : 'text-theme-muted hover:text-theme-primary hover:bg-theme-accent/30'
                          }`}
                        aria-current={isActive('/history') ? 'page' : undefined}
                      >
                        <History size={18} />
                        <span>{t('userMenu.history').toUpperCase()}</span>
                      </Link>

                      <Link
                        href="/settings"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:text-base ${isActive('/settings')
                          ? 'text-theme-primary bg-theme-accent/50'
                          : 'text-theme-muted hover:text-theme-primary hover:bg-theme-accent/30'
                          }`}
                        aria-current={isActive('/settings') ? 'page' : undefined}
                      >
                        <Settings size={18} />
                        <span>{t('userMenu.settings').toUpperCase()}</span>
                      </Link>
                    </div>
                  </>
                )}
              </nav>

              {/* Mobile Login/Profile - Fixed at Bottom */}
              <div className="border-theme-border bg-theme-card mt-auto border-t p-6">
                {/* Language Toggle - Mobile */}
                <LanguageSwitcher />

                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    {/* User Info Card */}
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setIsMenuOpen(false);
                      }}
                      className="text-theme-text hover:text-theme-primary bg-theme-accent/50 hover:bg-theme-accent flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300"
                    >
                      <div className="border-theme-primary size-10 overflow-hidden rounded-full border-2">
                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="size-full object-cover" unoptimized />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-theme-muted text-xs">{t('userMenu.viewProfile')}</div>
                      </div>
                      <User size={18} className="text-theme-muted" />
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-100 hover:text-red-700 dark:bg-red-500/10 dark:hover:bg-red-500/20"
                    >
                      <LogOut size={18} />
                      <span>{t('userMenu.logout')}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-theme-primary hover:bg-theme-secondary hover:shadow-theme-primary/30 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-medium text-white transition-all duration-300 hover:shadow-xl"
                  >
                    <LogIn size={20} />
                    <span>{t('auth.signIn')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
