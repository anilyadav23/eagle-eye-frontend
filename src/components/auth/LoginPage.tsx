import React, { useState } from 'react';
import { Eye, Lock, User, Shield, GraduationCap, Building2, UserCheck, ArrowRight, AlertCircle, CheckCircle2, UserPlus } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

interface LoginModalProps {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginModalProps> = ({ onSuccess }) => {
  const { login, register } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [username, setUsername] = useState('HODECC');
  const [password, setPassword] = useState('Anil@2026');
  const [selectedRole, setSelectedRole] = useState<UserRole>('HOD');
  
  // Registration form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'Student' | 'Teacher'>('Student');
  const [regSuccessMsg, setRegSuccessMsg] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const quickRoles: { role: UserRole; username: string; pass: string; title: string; desc: string; icon: any; color: string }[] = [
    {
      role: 'HOD',
      username: 'HODECC',
      pass: 'Anil@2026',
      title: 'HOD / Department Head',
      desc: 'Department Oversight: Approvals, Timetables, CCTV Matrix & Roster Management',
      icon: Building2,
      color: 'from-indigo-600 to-blue-700'
    },
    {
      role: 'Teacher',
      username: 'teacher',
      pass: 'teacher123',
      title: 'Faculty / Class Teacher',
      desc: 'Live Roll Call, AI Facial Match Verification, Continuous Internal Marks',
      icon: UserCheck,
      color: 'from-emerald-600 to-teal-700'
    },
    {
      role: 'Student',
      username: 'student',
      pass: 'student123',
      title: 'Student Desk',
      desc: 'Personal Attendance, 75% Criteria Simulator, Grade Card & HOD Requests',
      icon: GraduationCap,
      color: 'from-sky-600 to-cyan-700'
    },
    {
      role: 'Admin',
      username: 'admin',
      pass: 'admin123',
      title: 'Security / Campus Admin',
      desc: 'Campus CCTV Matrix, CAD Blueprint Studio, Intrusion Rules, AI Ops',
      icon: Shield,
      color: 'from-purple-600 to-pink-700'
    }
  ];

  const handleRoleSelect = (item: typeof quickRoles[0]) => {
    setSelectedRole(item.role);
    setUsername(item.username);
    setPassword(item.pass);
    setError(null);
    setAuthMode('login');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      if (onSuccess) onSuccess();
    } else {
      setError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRegSuccessMsg(null);
    setLoading(true);

    const res = await register({
      username: regUsername.trim(),
      email: regEmail.trim(),
      password: regPassword,
      role: regRole,
      full_name: regFullName.trim()
    });

    setLoading(false);

    if (res.success) {
      setRegSuccessMsg(res.message || 'Account created successfully! You can now sign in.');
      setUsername(regUsername);
      setPassword(regPassword);
      setSelectedRole(regRole);
      setAuthMode('login');
    } else {
      setError(res.error || 'Registration failed. Username or email may already be registered.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-sky-500 selection:text-white relative overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Quick Role Selection Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/25 border border-sky-400/30">
                <Eye className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-wider text-white">EAGLE EYE</h1>
                <p className="text-[11px] text-sky-400 font-mono uppercase tracking-wider">Smart Class AI & Role Management</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Select any role profile below or register a new account to enter your segregated dashboard.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Select Demo Role Profile:
            </div>
            {quickRoles.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedRole === item.role && authMode === 'login';
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleSelect(item)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-slate-900 border-sky-500 shadow-md shadow-sky-500/15 ring-1 ring-sky-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-tr ${item.color} text-white shrink-0 mt-0.5 shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white tracking-wide">{item.title}</span>
                      {isSelected && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono font-semibold">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.desc}</p>
                    <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono text-slate-400">
                      <span>User: <strong className="text-slate-200">{item.username}</strong></span>
                      <span>•</span>
                      <span>Pass: <strong className="text-slate-200">{item.pass}</strong></span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Standard Web Session: JWT Token + Segregated RBAC</span>
          </div>
        </div>

        {/* Right Column: Standard Login / Registration Form */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl relative">
            {/* Tab switch between Sign In and First-Time Registration */}
            <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'login'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In to Dashboard
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('register'); setError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'register'
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                First Time Registration
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs flex items-center space-x-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {regSuccessMsg && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center space-x-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">{regSuccessMsg}</span>
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                    Username / Email ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. hod, teacher, student"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Authenticating...</span>
                    ) : (
                      <>
                        <span>Enter {selectedRole} Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* First-Time Self-Registration Form for Students & Teachers */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                    I am registering as:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('Student')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                        regRole === 'Student'
                          ? 'bg-sky-500/20 border-sky-500 text-sky-300 ring-1 ring-sky-500/50'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('Teacher')}
                      className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                        regRole === 'Teacher'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Teacher / Faculty</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder={regRole === 'Student' ? 'e.g. Aryan Mehra' : 'e.g. Prof. Rohit Sen'}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Username</label>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="e.g. aryan_m"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Email Address</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="email@campus.edu"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Create Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Creating Account...</span>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Register as {regRole}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Standard RBAC Policy</span>
              <span className="font-mono text-slate-400">Eagle Eye 2.0 Security Core</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
