'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock, User as UserIcon, Apple, Facebook } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // Prevent body scroll when modal is open - MUST be before early return
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication - In a real app, this would call your backend API
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: isSignUp ? name : email.split('@')[0],
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(isSignUp ? name : email.split('@')[0])}&background=8B7355&color=fff`,
      provider: 'email' as const,
      joinDate: new Date().toISOString(),
      bio: '',
      location: '',
      phone: '',
      interests: []
    };

    login(mockUser);
    onClose();
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
    // Mock social authentication - In a real app, this would use OAuth
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: `User from ${provider}`,
      email: `user@${provider}.com`,
      avatar: `https://ui-avatars.com/api/?name=${provider}&background=8B7355&color=fff`,
      provider: provider,
      joinDate: new Date().toISOString(),
      bio: '',
      location: '',
      phone: '',
      interests: []
    };

    login(mockUser);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Full Screen */}
      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-theme-card border-theme-border relative z-10 w-full max-w-md rounded-2xl border shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-theme-muted hover:text-theme-primary hover:bg-theme-accent absolute right-4 top-4 z-20 rounded-full p-2 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="p-8 pb-6">
            <h2 className="text-theme-text mb-2 text-3xl">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-theme-muted">
              {isSignUp
                ? 'Sign up to explore ancient Egypt'
                : 'Sign in to continue your journey'}
            </p>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {/* Social Login Buttons */}
            <div className="mb-6 space-y-3">
              <button
                onClick={() => handleSocialLogin('google')}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition-colors duration-300 hover:bg-gray-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialLogin('facebook')}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1877F2] px-4 py-3 text-white transition-colors duration-300 hover:bg-[#1664D9]"
              >
                <Facebook size={20} fill="white" />
                Continue with Facebook
              </button>

              <button
                onClick={() => handleSocialLogin('apple')}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-black px-4 py-3 text-white transition-colors duration-300 hover:bg-gray-900"
              >
                <Apple size={20} fill="white" />
                Continue with Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="border-theme-border w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-theme-card text-theme-muted px-2">Or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="text-theme-text mb-2 block text-sm">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="text-theme-muted absolute left-3 top-1/2 -translate-y-1/2" size={20} />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required={isSignUp}
                      className="bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="text-theme-text mb-2 block text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="text-theme-muted absolute left-3 top-1/2 -translate-y-1/2" size={20} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-theme-text mb-2 block text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="text-theme-muted absolute left-3 top-1/2 -translate-y-1/2" size={20} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-theme-bg border-theme-border text-theme-text focus:border-theme-primary w-full rounded-lg border py-3 pl-10 pr-4 transition-colors focus:outline-none"
                  />
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="text-theme-text flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="border-theme-border rounded" />
                    Remember me
                  </label>
                  <a href="#" className="text-theme-primary hover:text-theme-secondary">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="bg-theme-primary hover:bg-theme-secondary w-full rounded-lg py-3 text-white transition-colors duration-300"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Toggle Sign Up/Sign In */}
            <div className="mt-6 text-center text-sm">
              <span className="text-theme-muted">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              </span>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-theme-primary hover:text-theme-secondary font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
