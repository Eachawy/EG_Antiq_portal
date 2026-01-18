'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { authService } from '../services/auth.service';
import type { User } from '@/lib/api/types/auth.dto';
import type { LoginFormData } from '../types/auth.types';
import { hasToken } from '../utils/token';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginFormData) => {
    try {
      debugger
      setIsLoading(true);
      setError(null);
      const user = await authService.login(credentials);
      setUser(user);

      // Redirect to dashboard or returnUrl
      const params = new URLSearchParams(window.location.search);
      const returnUrl = params.get('returnUrl') || '/dashboard';
      router.push(returnUrl);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = hasToken();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
}
