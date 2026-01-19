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

        console.log('Callback: Setting OAuth completion flag in localStorage...');

        // Set a flag in localStorage to notify the parent window
        // This is more reliable than postMessage across different scenarios
        localStorage.setItem('oauth_login_complete', Date.now().toString());
        localStorage.setItem('oauth_success', 'true');

        console.log('Callback: Checking if this is a popup window...');
        console.log('window.opener exists:', !!window.opener);
        console.log('window.opener.closed:', window.opener ? window.opener.closed : 'N/A');

        // Also try postMessage as backup (if this is a popup)
        if (window.opener && !window.opener.closed) {
          try {
            console.log('Callback: Sending success message to parent window...');
            const message = {
              type: 'oauth_success',
              user,
              accessToken,
              refreshToken
            };
            console.log('Message being sent:', message);
            window.opener.postMessage(message, window.location.origin);
            console.log('Callback: Message sent successfully!');
          } catch (error) {
            console.error('Callback: Failed to send message to parent window:', error);
          }
        } else {
          console.log('Callback: Not a popup or parent window is closed');
        }

        // Always try to close the window (works for popups)
        console.log('Callback: Attempting to close popup window...');
        setTimeout(() => {
          window.close();
          console.log('Callback: window.close() called');

          // If window didn't close (opened as tab), redirect to home
          setTimeout(() => {
            if (!window.closed) {
              console.log('Callback: Window did not close, redirecting to home...');
              router.push('/');
            } else {
              console.log('Callback: Window closed successfully');
            }
          }, 500);
        }, 300);
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
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-theme-primary mx-auto mb-4"></div>
        <p className="text-theme-text text-lg mb-4">Completing authentication...</p>
        <p className="text-theme-muted text-sm">This window will close automatically...</p>
      </div>
    </div>
  );
}
