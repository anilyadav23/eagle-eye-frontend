import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getApiBase } from '../config/api';

export type UserRole = 'HOD' | 'Teacher' | 'Student' | 'Admin' | 'Guard';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  full_name: string;
  department?: string;
  branch?: string;
  semester?: string;
  year?: string;
  section?: string;
  phone?: string;
  hostel?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  mentor?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  full_name?: string;
  department?: string;
  branch?: string;
  phone?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => void;
  updateCurrentUserProfile?: (updates: Partial<AuthUser>) => void;
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

  // Standard Official Faculty Profiles from Department Timetable
  // Faculty ID is also username, default password is '123456'
  const TIMETABLE_FACULTY_USERS: Record<string, { pass: string[]; user: AuthUser }> = {
    // 1. Lata Vaishnav (LTV)
    ltv: {
      pass: ['123456', 'ltv123'],
      user: {
        id: 'usr-fac-ltv',
        username: 'LTV',
        email: 'ltv@campus.edu',
        role: 'Teacher',
        full_name: 'Lata Vaishnav',
        department: 'Electronics & Communication Engineering'
      }
    },
    // 2. Kapoor Chand (KPC)
    kpc: {
      pass: ['123456', 'kpc123'],
      user: {
        id: 'usr-fac-kpc',
        username: 'KPC',
        email: 'kpc@campus.edu',
        role: 'Teacher',
        full_name: 'Kapoor Chand',
        department: 'Electronics & Communication Engineering'
      }
    },
    // 3. Khushbu Mehta (KSM)
    ksm: {
      pass: ['123456', 'ksm123'],
      user: {
        id: 'usr-fac-ksm',
        username: 'KSM',
        email: 'ksm@campus.edu',
        role: 'Teacher',
        full_name: 'Khushbu Mehta',
        department: 'Electronics & Communication Engineering'
      }
    },
    // 4. Dhirendra Sharma (DS)
    ds: {
      pass: ['123456', 'ds123'],
      user: {
        id: 'usr-fac-ds',
        username: 'DS',
        email: 'ds@campus.edu',
        role: 'Teacher',
        full_name: 'Dhirendra Sharma',
        department: 'Electronics & Communication Engineering'
      }
    },
    // 5. Kapil Parihar (KP / HOD)
    kp: {
      pass: ['123456', 'kp123', 'Anil@2026'],
      user: {
        id: 'usr-fac-kp',
        username: 'KP',
        email: 'kp@campus.edu',
        role: 'Teacher',
        full_name: 'Kapil Parihar',
        department: 'Electronics & Communication Engineering'
      }
    },
    // 6. Naginder Singh (NS / TT-Incharge)
    ns: {
      pass: ['123456', 'ns123'],
      user: {
        id: 'usr-fac-ns',
        username: 'NS',
        email: 'ns@campus.edu',
        role: 'Teacher',
        full_name: 'Naginder Singh',
        department: 'Electronics & Communication Engineering'
      }
    },
    // 7. Yazdan Khan (YK)
    yk: {
      pass: ['123456', 'yk123'],
      user: {
        id: 'usr-fac-yk',
        username: 'YK',
        email: 'yk@campus.edu',
        role: 'Teacher',
        full_name: 'Yazdan Khan',
        department: 'Electronics & Communication Engineering'
      }
    },
    // Generic Teacher demo account fallback
    teacher: {
      pass: ['123456', 'teacher123'],
      user: {
        id: 'usr-teacher',
        username: 'teacher',
        email: 'teacher@campus.edu',
        role: 'Teacher',
        full_name: 'Lata Vaishnav (Faculty)',
        department: 'Electronics & Communication Engineering'
      }
    }
  };

  // Emergency root credential fallback for HOD if backend is offline or static hosting
  const DEMO_FALLBACK_USERS: Record<string, { pass: string[]; user: AuthUser }> = {
    ...TIMETABLE_FACULTY_USERS,
    hodecc: {
      pass: ['Anil@2026', 'anil@2026', 'hod123', '123456'],
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'Prof. Kapil Parihar (HOD)', department: 'Electronics & Communication Engineering' }
    },
    ecehod: {
      pass: ['Anil@2026', 'anil@2026', 'hod123', '123456'],
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'Prof. Kapil Parihar (HOD)', department: 'Electronics & Communication Engineering' }
    },
    hod: {
      pass: ['Anil@2026', 'anil@2026', 'hod123', '123456'],
      user: { id: 'usr-hod', username: 'HODECC', email: 'hodecc@campus.edu', role: 'HOD', full_name: 'Prof. Kapil Parihar (HOD)', department: 'Electronics & Communication Engineering' }
    },
    // Keshav Nagar - Official Enrolled Student Profile
    '24uecc8024': {
      pass: ['123456'],
      user: {
        id: 'STU-24UECC8024',
        username: '24UECC8024',
        email: 'keshav.nagar@campus.edu',
        role: 'Student',
        full_name: 'Keshav Nagar',
        department: 'Electronics & Communication Engineering',
        branch: 'Electronics & Computer Control (ECC)',
        year: '4th Year',
        semester: '7th Semester',
        section: 'Section A',
        phone: '+91 98290 12345',
        hostel: 'Raman Hostel, Room 412',
        bloodGroup: 'O+ Positive',
        emergencyContact: '+91 94140 54321 (Parent)',
        mentor: 'Prof. Kapil Parihar (HOD)'
      }
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    
    // Check fallback demo users if username matches standard demo profiles
    const demoProfile = DEMO_FALLBACK_USERS[cleanUser];

    // 1. Check registered user accounts and approval queue
    try {
      const registeredUsersJson = localStorage.getItem('eagle_eye_registered_users');
      const registeredUsers: Array<any> = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];

      const approvalsJson = localStorage.getItem('eagle_eye_approval_requests');
      const approvals: any[] = approvalsJson ? JSON.parse(approvalsJson) : [];

      // Find matching approved request if any
      const matchingApprovedReq = approvals.find(
        (r: any) =>
          (r.rollNo && r.rollNo.trim().toLowerCase() === cleanUser) ||
          (r.email && r.email.trim().toLowerCase() === cleanUser) ||
          (r.regNo && r.regNo.trim().toLowerCase() === cleanUser) ||
          (r.studentName && r.studentName.trim().toLowerCase() === cleanUser)
      );

      const foundUser = registeredUsers.find(
        u => (u.username && u.username.toLowerCase() === cleanUser) ||
             (u.email && u.email.toLowerCase() === cleanUser) ||
             (matchingApprovedReq && u.username && u.username.toLowerCase() === matchingApprovedReq.rollNo?.toLowerCase())
      );

      // Case A: User found in registered accounts
      if (foundUser) {
        const isPasswordCorrect =
          foundUser.password === password ||
          foundUser.password === cleanPass ||
          cleanPass === '123456'; // standard default password

        if (isPasswordCorrect) {
          // If Teacher/Admin/HOD, allow direct login
          if (foundUser.role !== 'Student') {
            const registeredToken = `reg-token-${foundUser.id}-${Date.now()}`;
            const authObj: AuthUser = {
              id: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              role: foundUser.role,
              full_name: foundUser.full_name || foundUser.username,
              department: foundUser.department || 'Electronics & Communication Engineering'
            };
            setToken(registeredToken);
            setUser(authObj);
            localStorage.setItem(TOKEN_KEY, registeredToken);
            localStorage.setItem(USER_KEY, JSON.stringify(authObj));
            return { success: true };
          }

          // For Students: check if approved directly or via approvals queue
          const isDirectlyApproved = foundUser.is_active === 1 || foundUser.approval_status === 'Approved';
          const isQueueApproved = matchingApprovedReq && matchingApprovedReq.status === 'Approved';

          if (isDirectlyApproved || isQueueApproved) {
            // Ensure student profile is marked active for all future visits
            foundUser.is_active = 1;
            foundUser.approval_status = 'Approved';
            if (matchingApprovedReq?.department) foundUser.department = matchingApprovedReq.department;
            if (matchingApprovedReq?.branch) foundUser.branch = matchingApprovedReq.branch;
            if (matchingApprovedReq?.semester) foundUser.semester = matchingApprovedReq.semester;
            if (matchingApprovedReq?.year) foundUser.year = matchingApprovedReq.year;
            if (matchingApprovedReq?.section) foundUser.section = matchingApprovedReq.section;

            try {
              localStorage.setItem('eagle_eye_registered_users', JSON.stringify(registeredUsers));
            } catch (e) {}

            const registeredToken = `reg-token-${foundUser.id}-${Date.now()}`;
            const authObj: AuthUser = {
              id: foundUser.id,
              username: foundUser.username,
              email: foundUser.email,
              role: 'Student',
              full_name: foundUser.full_name || matchingApprovedReq?.studentName || foundUser.username,
              department: foundUser.department || matchingApprovedReq?.department || 'Electronics & Communication Engineering',
              branch: foundUser.branch || matchingApprovedReq?.branch || 'Electronics & Computer Control (ECC)',
              semester: foundUser.semester || matchingApprovedReq?.semester || '7th Semester',
              year: foundUser.year || matchingApprovedReq?.year || '4th Year',
              section: foundUser.section || matchingApprovedReq?.section || 'Section A',
              phone: foundUser.phone || matchingApprovedReq?.mobile,
              hostel: foundUser.hostel || 'Campus Hostel',
              bloodGroup: foundUser.bloodGroup || 'O+ Positive',
              emergencyContact: foundUser.emergencyContact || '+91 94140 54321 (Parent)',
              mentor: foundUser.mentor || 'Prof. Kapil Parihar (HOD)'
            };
            setToken(registeredToken);
            setUser(authObj);
            localStorage.setItem(TOKEN_KEY, registeredToken);
            localStorage.setItem(USER_KEY, JSON.stringify(authObj));
            return { success: true };
          } else if (matchingApprovedReq && matchingApprovedReq.status === 'Rejected') {
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

      // Case B: User not yet in registeredUsers, but exists in Approval Requests and was APPROVED!
      if (matchingApprovedReq && matchingApprovedReq.status === 'Approved') {
        const isPasswordCorrect = cleanPass === '123456' || cleanPass.length >= 4;
        if (isPasswordCorrect) {
          const newUserId = `usr-${matchingApprovedReq.rollNo || Date.now()}`;
          const authObj: AuthUser = {
            id: newUserId,
            username: matchingApprovedReq.rollNo || cleanUser.toUpperCase(),
            email: matchingApprovedReq.email || `${cleanUser}@campus.edu`,
            role: 'Student',
            full_name: matchingApprovedReq.studentName || cleanUser.toUpperCase(),
            department: matchingApprovedReq.department || 'Electronics & Communication Engineering',
            branch: matchingApprovedReq.branch || 'Electronics & Computer Control (ECC)',
            semester: matchingApprovedReq.semester || '7th Semester',
            year: matchingApprovedReq.year || '4th Year',
            section: matchingApprovedReq.section || 'Section A',
            phone: matchingApprovedReq.mobile || '+91 98290 12345',
            hostel: 'Campus Hostel',
            bloodGroup: 'B+ Positive',
            emergencyContact: '+91 94140 54321 (Parent)',
            mentor: 'Prof. Kapil Parihar (HOD)'
          };

          // Save into registeredUsers store so they stay permanently logged & active
          registeredUsers.unshift({
            ...authObj,
            password: password,
            is_active: 1,
            approval_status: 'Approved'
          });
          try {
            localStorage.setItem('eagle_eye_registered_users', JSON.stringify(registeredUsers));
          } catch (e) {}

          const registeredToken = `reg-token-${newUserId}-${Date.now()}`;
          setToken(registeredToken);
          setUser(authObj);
          localStorage.setItem(TOKEN_KEY, registeredToken);
          localStorage.setItem(USER_KEY, JSON.stringify(authObj));
          return { success: true };
        }
      } else if (matchingApprovedReq && matchingApprovedReq.status === 'Pending') {
        return {
          success: false,
          error: 'Your registration profile is currently pending approval by HOD or Faculty Teacher. Once approved, you will be able to sign in.'
        };
      } else if (matchingApprovedReq && matchingApprovedReq.status === 'Rejected') {
        return {
          success: false,
          error: 'Your registration was rejected by the Department HOD/Faculty. Please contact admin.'
        };
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

  const register = async (payload: RegisterPayload): Promise<{ success: boolean; error?: string; message?: string }> => {
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
      const userRecord: AuthUser & { password?: string; is_active?: number; approval_status?: string } = {
        id: userId,
        username: payload.username.trim(),
        email: payload.email.trim(),
        password: payload.password,
        role: payload.role,
        full_name: payload.full_name?.trim() || payload.username.trim(),
        department: payload.department || 'Computer Science & Engineering',
        branch: payload.branch || 'Computer Science & Engineering',
        semester: 'Semester Pending Assignment',
        year: 'Year Pending Assignment',
        section: 'Sec Pending',
        phone: payload.phone || '+91 98000 00000',
        hostel: 'Day Scholar / Not Assigned',
        bloodGroup: 'Not Specified',
        emergencyContact: 'Not Specified',
        mentor: 'Pending HOD/Teacher Allocation',
        is_active: payload.role === 'Student' ? 0 : 1,
        approval_status: payload.role === 'Student' ? 'Pending' : 'Approved'
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
        department: payload.department || 'Computer Science & Engineering',
        branch: payload.branch || 'Computer Science & Engineering',
        year: 'Pending Allocation',
        semester: 'Pending Allocation',
        section: 'Pending',
        email: payload.email.trim(),
        mobile: payload.phone || '+91 98000 00000',
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

      // Broadcast immediately across devices to HOD & Teacher portals via cloud channel
      try {
        fetch('https://ntfy.sh/eagle_eye_approval_queue_98234', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'SUBMIT_REQUEST',
            data: newApprovalReq,
            timestamp: Date.now()
          })
        }).catch(() => {});
      } catch (err) {}
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

  const updateCurrentUserProfile = (updates: Partial<AuthUser>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(updated));
        // Also update in registered_users
        const regList: any[] = JSON.parse(localStorage.getItem('eagle_eye_registered_users') || '[]');
        const uIdx = regList.findIndex(u => u.id === updated.id || u.username.toLowerCase() === updated.username.toLowerCase());
        if (uIdx >= 0) {
          regList[uIdx] = { ...regList[uIdx], ...updates };
          localStorage.setItem('eagle_eye_registered_users', JSON.stringify(regList));
        }
      } catch (e) {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, login, register, logout, updateCurrentUserProfile }}>
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
