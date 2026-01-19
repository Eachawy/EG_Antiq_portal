'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent running twice in development strict mode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleCallback = async () => {
      try {
        // Get tokens and user data from URL parameters
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        const userDataString = searchParams.get('user');

        if (!accessToken || !refreshToken || !userDataString) {
          setError('Missing authentication data');
          return;
        }

        // Parse user data
        const userData = JSON.parse(decodeURIComponent(userDataString));

        // Store tokens in cookie (for HTTP client) and localStorage (backup)
        Cookies.set('auth_token', accessToken, {
          expires: 1/96, // 15 minutes (1/96 of a day)
          path: '/',
          sameSite: 'lax'
        });
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        // Create user object for context
        const user = {
          id: userData.id,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${userData.firstName} ${userData.lastName}`)}&background=8B7355&color=fff`,
          provider: 'google' as const, // or determine from userData
          joinDate: userData.createdAt,
          bio: userData.bio || '',
          location: userData.location || '',
          phone: userData.phone || '',
          interests: []
        };

        // Update auth context
        login(user);

        // Check if this is a popup window
        if (window.opener) {
          // We're in a popup - send message to parent and close
          window.opener.postMessage({
            type: 'oauth_success',
            user,
            accessToken,
            refreshToken
          }, window.location.origin);

          // Close the popup after a short delay
          setTimeout(() => {
            window.close();
          }, 500);
        } else {
          // We're in the main window - redirect to home
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      } catch (err: any) {
        console.error('OAuth callback error:', err);
        setError(err.message || 'Failed to complete authentication');

        // If error and in popup, close it
        if (window.opener) {
          setTimeout(() => {
            window.close();
          }, 2000);
        }
      }
    };

    handleCallback();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="text-center p-8 bg-theme-card border border-theme-border rounded-xl shadow-xl max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-theme-text mb-2">Authentication Error</h2>
          <p className="text-theme-text/70 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-bg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-theme-primary mx-auto mb-4"></div>
        <p className="text-theme-text text-lg">Completing authentication...</p>
      </div>
    </div>
  );
}
