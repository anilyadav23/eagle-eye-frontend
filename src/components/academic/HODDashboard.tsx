import React, { useState } from 'react';
import { 
  Building2, Users, Calendar, CheckCircle2, AlertTriangle, 
  Clock, Camera, ShieldCheck, ChevronRight, FileText, 
  Search, Filter, ArrowUpRight, Check, X, Bell, Eye, Download, ShieldAlert
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const HODDashboard: React.FC = () => {
  const { attendanceRecords, persons, cameras } = useSecurity();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'approvals' | 'attendance' | 'timetable' | 'camerawall'>('overview');
  const [filterYear, setFilterYear] = useState('3');
  const [filterSection, setFilterSection] = useState('A');
  const [filterSubject, setFilterSubject] = useState('DBMS');

  // Registration approvals queue (Page 4 & 7)
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'REQ-2026-001',
      studentName: 'Arjun Kumar',
      rollNo: 'CS23A001',
      regNo: 'REG2025001',
      branch: 'Computer Science',
      year: '2nd Year',
      semester: '3rd Semester',
      section: 'A',
      email: 'arjun.kumar@campus.edu',
      mobile: '9876543210',
      submittedAt: '10:34 AM Today',
      photos: [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      ],
      type: 'New Registration',
      status: 'Pending'
    },
    {
      id: 'REQ-2026-002',
      studentName: 'Priya Sharma',
      rollNo: '21CSE002',
      regNo: 'REG2024098',
      branch: 'Computer Science',
      year: '3rd Year',
      semester: '5th Semester',
      section: 'B',
      email: 'priya.s@campus.edu',
      mobile: '9811224455',
      submittedAt: '09:40 AM Today',
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
      ],
      type: 'Photo Update Request',
      status: 'Pending'
    },
    {
      id: 'REQ-2026-003',
      studentName: 'Karan Malhotra',
      rollNo: '22CSE045',
      regNo: 'REG2024112',
      branch: 'Computer Science',
      year: '2nd Year',
      semester: '3rd Semester',
      section: 'A',
      email: 'karan.m@campus.edu',
      mobile: '9844556677',
      submittedAt: '08:15 AM Today',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      ],
      type: 'Add Subject (Machine Learning)',
      status: 'Pending'
    }
  ]);

  const handleApprove = (id: string) => {
    setPendingRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleReject = (id: string) => {
    setPendingRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
  };

  const presentPercentage = 91.6;

  return (
    <div className="space-y-6">
      {/* Top HOD Command Header Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">HOD Department Command Center</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                CSE Department
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Real-time oversight of students, timetables, live camera walls, approvals & departmental analytics.
            </p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'overview' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveSubTab('approvals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
              activeSubTab === 'approvals' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Registration Approvals
            {pendingRequests.filter(r => r.status === 'Pending').length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 text-[10px] rounded-full bg-red-500 text-white font-mono">
                {pendingRequests.filter(r => r.status === 'Pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSubTab('attendance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'attendance' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Attendance Explorer
          </button>
          <button
            onClick={() => setActiveSubTab('camerawall')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'camerawall' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Camera Wall
          </button>
        </div>
      </div>

      {/* KPI Stats Ribbon (matching Page 7) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-sky-500/30 flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Students</div>
            <div className="text-2xl font-bold font-mono text-white">428</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-indigo-500/30 flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Active Classes</div>
            <div className="text-2xl font-bold font-mono text-indigo-300">18</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Present Today</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              392 <span className="text-xs text-emerald-300">({presentPercentage}%)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-red-500/30 flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Alerts / Shortage</div>
            <div className="text-2xl font-bold font-mono text-red-400">6</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-purple-500/30 flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Pending Approvals</div>
            <div className="text-2xl font-bold font-mono text-purple-300">
              {pendingRequests.filter(r => r.status === 'Pending').length + 9}
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Department Camera Matrix Wall Preview */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-panel rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-sky-400" />
                  <h3 className="font-bold text-white text-sm">Live Classes (Department Cameras)</h3>
                </div>
                <button 
                  onClick={() => setActiveSubTab('camerawall')}
                  className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                >
                  View All Live <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'CSE-101 (DBMS)', room: 'Room 101', count: '48/50', teacher: 'Dr. Meena', status: 'LIVE' },
                  { name: 'CSE-203 (OS)', room: 'Room 203', count: '42/45', teacher: 'Prof. Sharma', status: 'LIVE' },
                  { name: 'CSE LAB-1 (AI Vision)', room: 'Lab 1', count: '30/30', teacher: 'Dr. Rajesh Iyer', status: 'LIVE' },
                  { name: 'CSE-301 (Networks)', room: 'Room 301', count: '39/44', teacher: 'Prof. Sarah Khan', status: 'LIVE' }
                ].map((c, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                    <img 
                      src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop`}
                      alt={c.name}
                      className="w-full h-36 object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute top-2 left-2 flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-red-600/90 text-[10px] font-bold text-white font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{c.status}</span>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/90 text-[10px] font-mono text-emerald-400 font-bold border border-slate-700">
                      {c.count} Present
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                      <div className="font-bold text-xs text-white">{c.name}</div>
                      <div className="text-[11px] text-slate-300 flex justify-between">
                        <span>{c.room}</span>
                        <span>{c.teacher}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Analytics Distribution */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800">
              <h3 className="font-bold text-white text-sm mb-3">Today's Class Utilization & Presence</h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">8:00 - 10:00 AM</div>
                  <div className="text-xl font-bold font-mono text-sky-400 mt-1">88%</div>
                  <div className="text-[10px] text-emerald-400">Peak On-time</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">10:00 - 12:00 PM</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">94%</div>
                  <div className="text-[10px] text-emerald-400">Highest Presence</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">1:00 - 3:00 PM</div>
                  <div className="text-xl font-bold font-mono text-purple-400 mt-1">85%</div>
                  <div className="text-[10px] text-slate-400">Labs & Practical</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">3:00 - 5:00 PM</div>
                  <div className="text-xl font-bold font-mono text-amber-400 mt-1">78%</div>
                  <div className="text-[10px] text-amber-400">Electives</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Activities & Shortcuts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center justify-between">
                <span>Recent Activities</span>
                <span className="text-[10px] font-mono text-slate-400">Live feed</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-sky-400 font-mono text-[10px] mt-0.5">10:34 AM</span>
                  <div>
                    <span className="text-slate-200 font-semibold">New student registration request:</span>
                    <p className="text-slate-400 text-[11px]">Arjun Kumar (2025CSE018) submitted 2 photos for verification.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-emerald-400 font-mono text-[10px] mt-0.5">10:28 AM</span>
                  <div>
                    <span className="text-slate-200 font-semibold">Teacher approval request:</span>
                    <p className="text-slate-400 text-[11px]">Dr. Meena verified 44 students in CS101 DBMS lecture.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-red-400 font-mono text-[10px] mt-0.5">10:15 AM</span>
                  <div>
                    <span className="text-slate-200 font-semibold">Unauthorized absence alert:</span>
                    <p className="text-slate-400 text-[11px]">CSE-203: 3 students left before lecture session concluded.</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2.5">
                  <span className="text-purple-400 font-mono text-[10px] mt-0.5">09:50 AM</span>
                  <div>
                    <span className="text-slate-200 font-semibold">Subject Added:</span>
                    <p className="text-slate-400 text-[11px]">AI & ML elective combined section timetable synced.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Reports Quick Download */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm">Department Reports & Insights</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Monthly Department Attendance Summary (PDF)</span>
                  </span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Attendance Shortage List (&lt;75% Attendance)</span>
                  </span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Subject-wise & Section-wise Analysis</span>
                  </span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Approvals Tab (Page 4 & 7) */}
      {activeSubTab === 'approvals' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Student Registration & Request Approvals</h3>
              <p className="text-xs text-slate-400">
                Review submitted biometric photos, verify student details, and activate accounts or subject changes.
              </p>
            </div>
            <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
              Authority: Head of Department (HOD)
            </div>
          </div>

          <div className="space-y-4">
            {pendingRequests.map(req => (
              <div key={req.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {req.photos.map((p, idx) => (
                      <img 
                        key={idx} 
                        src={p} 
                        alt="Submitted Student Photo" 
                        className="w-12 h-12 rounded-xl object-cover border-2 border-slate-800 shadow"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{req.studentName}</span>
                      <span className="font-mono text-sky-400 text-xs font-bold">({req.rollNo})</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                        {req.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {req.branch} • {req.year} • {req.semester} • {req.section} | Email: {req.email}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Submitted: {req.submittedAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {req.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Activate</span>
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                      req.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Explorer Tab (Page 7) */}
      {activeSubTab === 'attendance' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-base">Department Attendance Explorer</h3>
              <p className="text-xs text-slate-400">
                Filter and view detailed attendance records by branch, year, semester, section and subject.
              </p>
            </div>
            
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              <select 
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-1.5"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>

              <select 
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-1.5"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>

              <select 
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-2.5 py-1.5"
              >
                <option value="DBMS">DBMS (CS101)</option>
                <option value="OS">OS (CS102)</option>
                <option value="DAA">DAA (CS201)</option>
                <option value="CN">CN (CS202)</option>
              </select>

              <button className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow">
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800 font-mono text-[11px] text-slate-400">
                  <th className="p-3">#</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">First Seen</th>
                  <th className="p-3">Last Seen</th>
                  <th className="p-3 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { name: 'Arjun Mehta', roll: '21CSE001', status: 'Present', first: '09:58 AM', last: '01:12 PM', conf: '98% (AI Face + Roster)' },
                  { name: 'Priya Sharma', roll: '21CSE002', status: 'Present', first: '09:55 AM', last: '01:10 PM', conf: '96% (AI Multi-Factor)' },
                  { name: 'Rahul Verma', roll: '21CSE003', status: 'Absent', first: '--', last: '--', conf: 'Not in classroom' },
                  { name: 'Sneha Iyer', roll: '21CSE004', status: 'Present', first: '09:57 AM', last: '01:08 PM', conf: '99% (AI Biometric)' },
                  { name: 'Kunal Patil', roll: '21CSE005', status: 'Present', first: '10:02 AM', last: '01:11 PM', conf: '94% (Late Arrival)' }
                ].map((s, i) => (
                  <tr key={i} className="hover:bg-slate-900/40">
                    <td className="p-3 font-mono text-slate-400">{i + 1}</td>
                    <td className="p-3 font-bold text-white">{s.name}</td>
                    <td className="p-3 font-mono text-sky-400">{s.roll}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                        s.status === 'Present' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-300">{s.first}</td>
                    <td className="p-3 font-mono text-slate-300">{s.last}</td>
                    <td className="p-3 font-mono text-right text-slate-400">{s.conf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Live Camera Wall (Page 7) */}
      {activeSubTab === 'camerawall' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Department Live Camera Wall</h3>
              <p className="text-xs text-slate-400">Inspect concurrent classroom activity and attendance in real-time.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">All 8 Feeds Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'CSE-101', title: 'CSE-101 (DBMS)', count: 48, feedUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=260&fit=crop' },
              { id: 'CSE-203', title: 'CSE-203 (OS)', count: 42, feedUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=260&fit=crop' },
              { id: 'CSE-LAB-1', title: 'CSE LAB-1 (AI Vision)', count: 30, feedUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=260&fit=crop' },
              { id: 'CSE-301', title: 'CSE-301 (Networks)', count: 39, feedUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=260&fit=crop' },
              { id: 'CSE-102', title: 'CSE-102 (Theory)', count: 45, feedUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=260&fit=crop' },
              { id: 'CSE-LAB-2', title: 'CSE LAB-2 (Robotics)', count: 28, feedUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=260&fit=crop' },
              { id: 'CSE-SEMINAR', title: 'Seminar Hall B', count: 72, feedUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=260&fit=crop' },
              { id: 'CSE-CORRIDOR', title: 'Faculty Entrance', count: 12, feedUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=260&fit=crop' }
            ].map((feed, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={feed.feedUrl} alt={feed.title} className="w-full h-44 object-cover" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
                  LIVE
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-900/90 text-emerald-400 font-mono text-[10px] font-bold border border-slate-700">
                  {feed.count} Students
                </div>
                <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-950 to-transparent">
                  <div className="text-xs font-bold text-white">{feed.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
