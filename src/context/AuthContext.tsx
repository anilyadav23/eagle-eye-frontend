import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getApiBase } from '../config/api';

export type UserRole = 'HOD' | 'Teacher' | 'Student' | 'Admin' | 'Guard';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  full_name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (payload: { username: string; email: string; password: string; role: UserRole; full_name?: string }) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => void;
  switchRoleDemo?: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'eagle_eye_auth_token';
const USER_KEY = 'eagle_eye_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore stored session on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Failed restoring auth session', e);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Standalone fallback demo credentials when running on static hosts without live backend API
  const DEMO_FALLBACK_USERS: Record<string, { pass: string; user: AuthUser }> = {
    hodecc: {
      pass: 'Anil@2026',
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'ECEHOD' }
    },
    hod: {
      pass: 'Anil@2026',
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'ECEHOD' }
    },
    teacher: {
      pass: 'teacher123',
      user: { id: 'usr-tch', username: 'teacher', email: 'prof.ananya@campus.edu', role: 'Teacher', full_name: 'Prof. Ananya Sen' }
    },
    student: {
      pass: 'student123',
      user: { id: 'usr-std', username: 'student', email: 'rohit.kumar@student.campus.edu', role: 'Student', full_name: 'Rohit Kumar (CS-22-049)' }
    },
    admin: {
      pass: 'admin123',
      user: { id: 'usr-adm', username: 'admin', email: 'admin@campus.edu', role: 'Admin', full_name: 'System Administrator' }
    },
    guard: {
      pass: 'guard123',
      user: { id: 'usr-grd', username: 'guard', email: 'gate1.security@campus.edu', role: 'Guard', full_name: 'Main Gate Control Desk' }
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUser = username.trim().toLowerCase();
    
    // Check fallback demo users if username matches standard demo profiles
    const demoProfile = DEMO_FALLBACK_USERS[cleanUser];

    try {
      const apiBase = getApiBase();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const accessToken = data.access_token;
        const userInfo: AuthUser = data.user;

        setToken(accessToken);
        setUser(userInfo);
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
        return { success: true };
      }
    } catch (err) {
      // Backend request unreachable or timed out (e.g. standalone static frontend)
      console.warn('Backend auth unreachable, evaluating demo fallback credentials', err);
    }

    // Seamless offline/standalone demo authentication fallback
    if (demoProfile && demoProfile.pass === password) {
      const fallbackToken = `demo-token-${cleanUser}-${Date.now()}`;
      setToken(fallbackToken);
      setUser(demoProfile.user);
      localStorage.setItem(TOKEN_KEY, fallbackToken);
      localStorage.setItem(USER_KEY, JSON.stringify(demoProfile.user));
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid username or password. Please try again.' 
    };
  };

  const register = async (payload: { username: string; email: string; password: string; role: UserRole; full_name?: string }): Promise<{ success: boolean; error?: string; message?: string }> => {
    try {
      const apiBase = getApiBase();
      const res = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.detail || 'Registration failed. Please check your details.'
        };
      }

      const data = await res.json();
      return { success: true, message: data.message };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Unable to connect to registration service.'
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
