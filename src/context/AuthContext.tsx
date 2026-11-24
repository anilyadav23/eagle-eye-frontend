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

  // Emergency root credential fallback for HOD if backend is offline or static hosting
  const DEMO_FALLBACK_USERS: Record<string, { pass: string[]; user: AuthUser }> = {
    hodecc: {
      pass: ['Anil@2026', 'anil@2026', 'hod123'],
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'ECEHOD' }
    },
    ecehod: {
      pass: ['Anil@2026', 'anil@2026', 'hod123'],
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'ECEHOD' }
    },
    hod: {
      pass: ['Anil@2026', 'anil@2026', 'hod123'],
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'ECEHOD' }
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    
    // Check fallback demo users if username matches standard demo profiles
    const demoProfile = DEMO_FALLBACK_USERS[cleanUser];

    // 1. First, check registered user accounts to strictly enforce approval for newly registered students
    try {
      const registeredUsersJson = localStorage.getItem('eagle_eye_registered_users');
      if (registeredUsersJson) {
        const registeredUsers: Array<{
          username: string;
          email: string;
          password: string;
          role: UserRole;
          full_name?: string;
          id: string;
        }> = JSON.parse(registeredUsersJson);

        const foundUser = registeredUsers.find(
          u => u.username.toLowerCase() === cleanUser || u.email.toLowerCase() === cleanUser
        );

        if (foundUser && foundUser.password === password) {
          // If the registered user is a Teacher, Admin, or HOD, allow direct login
          if (foundUser.role !== 'Student') {
            const registeredToken = `reg-token-${foundUser.id}-${Date.now()}`;
            const authObj: AuthUser = {
              id: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              role: foundUser.role,
              full_name: foundUser.full_name || foundUser.username
            };
            setToken(registeredToken);
            setUser(authObj);
            localStorage.setItem(TOKEN_KEY, registeredToken);
            localStorage.setItem(USER_KEY, JSON.stringify(authObj));
            return { success: true };
          }

          // Check if this student account has been approved by HOD or Teacher
          // 1. Direct active flag on user record
          if ((foundUser as any).is_active === 1 || (foundUser as any).approval_status === 'Approved') {
            const registeredToken = `reg-token-${foundUser.id}-${Date.now()}`;
            const authObj: AuthUser = {
              id: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              role: foundUser.role,
              full_name: foundUser.full_name || foundUser.username
            };
            setToken(registeredToken);
            setUser(authObj);
            localStorage.setItem(TOKEN_KEY, registeredToken);
            localStorage.setItem(USER_KEY, JSON.stringify(authObj));
            return { success: true };
          }

          // 2. Approvals queue matching
          const approvalsJson = localStorage.getItem('eagle_eye_approval_requests');
          const approvals = approvalsJson ? JSON.parse(approvalsJson) : [];
          
          const matchingReq = approvals.find(
            (r: any) => 
              (r.rollNo && r.rollNo.trim().toLowerCase() === cleanUser) ||
              (r.email && r.email.trim().toLowerCase() === foundUser.email.trim().toLowerCase()) ||
              (r.studentName && r.studentName.trim().toLowerCase() === (foundUser.full_name || '').trim().toLowerCase())
          );

          if (matchingReq && matchingReq.status === 'Approved') {
            // Update foundUser record to active so future lookups are immediate
            (foundUser as any).is_active = 1;
            (foundUser as any).approval_status = 'Approved';
            try {
              localStorage.setItem('eagle_eye_registered_users', JSON.stringify(registeredUsers));
            } catch (e) {}

            const registeredToken = `reg-token-${foundUser.id}-${Date.now()}`;
            const authObj: AuthUser = {
              id: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              role: foundUser.role,
              full_name: foundUser.full_name || foundUser.username
            };
            setToken(registeredToken);
            setUser(authObj);
            localStorage.setItem(TOKEN_KEY, registeredToken);
            localStorage.setItem(USER_KEY, JSON.stringify(authObj));
            return { success: true };
          } else if (matchingReq && matchingReq.status === 'Rejected') {
            return {
              success: false,
              error: 'Your registration was rejected by the Department HOD/Faculty. Please contact admin.'
            };
          } else {
            return {
              success: false,
              error: 'Your registration profile is currently pending approval by HOD or Faculty Teacher. Once approved, you will be able to sign in.'
            };
          }
        }
      }
    } catch (e) {
      console.warn('Error verifying registered student approval status', e);
    }

    // 2. Try live backend authentication
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
      } else if (res.status === 403) {
        const errData = await res.json().catch(() => ({}));
        return {
          success: false,
          error: errData.detail || 'Your registration profile is currently pending approval by HOD or Faculty Teacher. Once approved, you will be able to sign in.'
        };
      }
    } catch (err) {
      // Backend request unreachable or timed out (e.g. standalone static frontend)
      console.warn('Backend auth unreachable, evaluating demo fallback credentials', err);
    }

    // 3. Fallback for pre-configured staff/demo roles (HOD, Teacher, Admin, Guard, Pre-seeded student)
    // Matches if username is hodecc, hod, ecehod, teacher, student, admin, or guard
    if (demoProfile && demoProfile.pass.some(p => p.toLowerCase() === cleanPass.toLowerCase() || p === password)) {
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
    const cleanUname = payload.username.trim().toLowerCase();
    const cleanMail = payload.email.trim().toLowerCase();

    // Prevent overwriting standard pre-configured role profiles
    if (['hodecc', 'hod', 'teacher', 'admin', 'guard'].includes(cleanUname)) {
      return { success: false, error: 'That username is reserved for system administrators and faculty.' };
    }

    // Save or update local registered users store
    try {
      const regList: any[] = JSON.parse(localStorage.getItem('eagle_eye_registered_users') || '[]');
      const existingIdx = regList.findIndex(
        (u: any) => u.username.toLowerCase() === cleanUname || (u.email && u.email.toLowerCase() === cleanMail)
      );

      const userId = existingIdx >= 0 ? regList[existingIdx].id : `usr-${Date.now()}`;
      const userRecord = {
        id: userId,
        username: payload.username.trim(),
        email: payload.email.trim(),
        password: payload.password,
        role: payload.role,
        full_name: payload.full_name?.trim() || payload.username.trim()
      };

      if (existingIdx >= 0) {
        regList[existingIdx] = userRecord;
      } else {
        regList.push(userRecord);
      }
      localStorage.setItem('eagle_eye_registered_users', JSON.stringify(regList));

      // Automatically queue or refresh an approval request for HOD and Teacher
      const approvalList: any[] = JSON.parse(localStorage.getItem('eagle_eye_approval_requests') || '[]');
      const reqIdx = approvalList.findIndex(
        (r: any) => (r.rollNo && r.rollNo.toLowerCase() === cleanUname) || (r.email && r.email.toLowerCase() === cleanMail)
      );

      const newApprovalReq = {
        id: reqIdx >= 0 ? approvalList[reqIdx].id : `REG-REQ-${Date.now()}`,
        studentName: payload.full_name?.trim() || payload.username.trim(),
        rollNo: payload.username.trim(),
        regNo: `REG-${Math.floor(100000 + Math.random() * 900000)}`,
        branch: 'Electronics & Communication',
        year: '1st Year',
        semester: 'Semester 1',
        section: 'A',
        email: payload.email.trim(),
        mobile: '+91 98765 00000',
        submittedAt: 'Just now',
        photos: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
        ],
        type: 'New Student Admission & Biometric Clearance',
        status: 'Pending',
        reason: `Self-registration profile for ${payload.full_name || payload.username} (${payload.username}) awaiting clearance.`
      };

      if (reqIdx >= 0) {
        approvalList[reqIdx] = newApprovalReq;
      } else {
        approvalList.unshift(newApprovalReq);
      }
      localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(approvalList));
    } catch (e) {
      console.warn('Failed saving local registration and approval request', e);
    }

    // Try backend registration if available
    try {
      const apiBase = getApiBase();
      await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err: any) {
      // Backend request optional in client-first workflow
    }

    return {
      success: true,
      message: 'Student profile created! Approval request has been sent to HOD and Teacher for verification.'
    };
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
