import React, { useState } from 'react';
import { 
  Building2, Users, Calendar, CheckCircle2, AlertTriangle, 
  Clock, Camera, ShieldCheck, ChevronRight, FileText, 
  Search, Filter, ArrowUpRight, Check, X, Bell, Eye, Download, ShieldAlert,
  GraduationCap, UserCheck2, RefreshCw, Trash2, UserX, Plus, Edit3
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { useAuth } from '../../context/AuthContext';
import { getTimetableSlots, getSlotLiveStatus, TimetablePeriod } from '../../data/timetableCatalog';
import { TimetableManagerView } from './TimetableManagerView';
import { CameraMatrixView } from '../cameras/CameraMatrixView';

interface PendingRequest {
  id: string;
  studentName: string;
  rollNo: string;
  regNo: string;
  branch: string;
  year: string;
  semester: string;
  section: string;
  email: string;
  mobile: string;
  submittedAt: string;
  photos: string[];
  type: string;
  status: string;
}

import { NavTab } from '../../types';

interface HODDedicatedDashboardProps {
  onNavigateTab?: (tab: NavTab) => void;
}

export const HODDedicatedDashboard: React.FC<HODDedicatedDashboardProps> = ({ onNavigateTab }) => {
  const { attendanceRecords, persons, cameras, approvalRequests, updateApprovalRequestStatus, deleteApprovalRequest, deleteUserProfile } = useSecurity();
  const { user } = useAuth();
  // Sub-navigation tabs without Audit & Records
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'approvals' | 'students' | 'timetable' | 'camerawall'>('overview');
  const [filterYear, setFilterYear] = useState('4');
  const [filterSection, setFilterSection] = useState('A');
  const [filterSubject, setFilterSubject] = useState('All');

  // Academic allocation modal state for approving students
  const [allocationModalReq, setAllocationModalReq] = useState<any | null>(null);
  const [allocDepartment, setAllocDepartment] = useState('Electronics & Communication Engineering');
  const [allocBranch, setAllocBranch] = useState('Electronics & Computer Control (ECC)');
  const [allocSemester, setAllocSemester] = useState('7th Semester');
  const [allocYear, setAllocYear] = useState('4th Year');
  const [allocSection, setAllocSection] = useState('Section A');

  // Shared reactive registration & clearance approvals queue
  const pendingRequests = approvalRequests;

  // Real-time Day and Date Detection
  const todayDayName = (() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = days[new Date().getDay()];
    return d === 'Sunday' ? 'Monday' : d;
  })();

  // Current day's official live classes from Timetable
  const todayClasses: TimetablePeriod[] = getTimetableSlots('Electronics & Computer Control (ECC)', '7th Semester', todayDayName);

  // Real metrics derived from database / state
  const registeredStudentsCount = (() => {
    try {
      const saved = localStorage.getItem('eagle_eye_registered_users');
      if (saved) {
        const list: any[] = JSON.parse(saved);
        const stu = list.filter(u => u.role === 'Student').length;
        if (stu > 0) return stu;
      }
    } catch (e) {}
    const approvedStu = approvalRequests.filter(r => r.status === 'Approved').length;
    return approvedStu > 0 ? approvedStu : 1;
  })();

  const activeCamerasCount = cameras.filter(c => c.status === 'Online').length || cameras.length || 6;
  const facultyCount = 14; // Department of ECE/ECC/EEE Official Faculty Count

  const departmentStats = [
    { 
      title: 'Department Faculty', 
      count: `${facultyCount}`, 
      subtext: 'LTV, KSM, KPC, DS, KP, YK, NS On-Duty', 
      icon: Users, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500/10', 
      border: 'border-indigo-500/30' 
    },
    { 
      title: 'Total Enrolled Students', 
      count: `${registeredStudentsCount}`, 
      subtext: `${registeredStudentsCount} Verified in ECE/ECC/EEE`, 
      icon: GraduationCap, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/30' 
    },
    { 
      title: 'Pending Approvals', 
      count: `${pendingRequests.filter(r => r.status === 'Pending').length}`, 
      subtext: 'Admissions & Biometric Verification', 
      icon: AlertTriangle, 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/30' 
    },
    { 
      title: 'Active Classrooms', 
      count: `${activeCamerasCount}`, 
      subtext: 'Lecture Halls EC-6, EC-11, L-5, EC-10', 
      icon: Camera, 
      color: 'text-sky-400', 
      bg: 'bg-sky-500/10', 
      border: 'border-sky-500/30' 
    }
  ];

  const handleOpenApproveModal = (req: any) => {
    setAllocationModalReq(req);
    setAllocDepartment(req.department || 'Electronics & Communication Engineering');
    setAllocBranch(req.branch || 'Electronics & Computer Control (ECC)');
    setAllocSemester(req.semester && req.semester !== 'Pending Allocation' ? req.semester : '7th Semester');
    setAllocYear(req.year && req.year !== 'Pending Allocation' ? req.year : '4th Year');
    setAllocSection(req.section && req.section !== 'Pending' ? req.section : 'Section A');
  };

  const handleConfirmApproval = () => {
    if (!allocationModalReq) return;
    updateApprovalRequestStatus(allocationModalReq.id, 'Approved', {
      department: allocDepartment,
      branch: allocBranch,
      semester: allocSemester,
      year: allocYear,
      section: allocSection
    });
    setAllocationModalReq(null);
  };

  const handleApprove = (id: string) => {
    const target = pendingRequests.find(r => r.id === id);
    if (target) {
      handleOpenApproveModal(target);
    } else {
      updateApprovalRequestStatus(id, 'Approved');
    }
  };

  const handleReject = (id: string) => {
    updateApprovalRequestStatus(id, 'Rejected');
  };

  const handleDeleteProfile = (identifier: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete user profile for "${name}" (${identifier})? This will revoke access and delete credentials.`)) {
      deleteUserProfile(identifier);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner for HOD */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shadow-lg shadow-indigo-600/20">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl font-black text-white tracking-wide">
                Department of Electronics & Communication Engineering
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                HOD EXECUTIVE PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as: <strong className="text-slate-200">{user?.full_name || 'Prof. Kapil Parihar (HOD)'}</strong> • Department Operations & Academic Surveillance
            </p>
          </div>
        </div>

        {/* Sub-navigation tabs without Audit & Records */}
        <div className="flex items-center space-x-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 flex-wrap gap-1">
          {[
            { id: 'overview', label: 'Department Overview' },
            { id: 'students', label: `Enrolled Students (${approvalRequests.filter(r => r.status === 'Approved').length})` },
            { id: 'approvals', label: `Approvals Queue (${pendingRequests.filter(r => r.status === 'Pending').length})` },
            { id: 'timetable', label: 'Department Timetable' },
            { id: 'camerawall', label: 'Classroom Surveillance' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {departmentStats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`p-4 rounded-xl border ${item.bg} ${item.border} backdrop-blur-sm`}>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase font-mono">{item.title}</span>
                  <div className="text-2xl font-black text-white mt-1">{item.count}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.subtext}</div>
                </div>
                <div className={`p-2.5 rounded-xl bg-slate-950/60 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Sub-tab Views */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Ongoing Classes Monitor - Synced with Today's Date, Day & Time */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-400" />
                  Live Academic Classes in Progress ({todayDayName})
                </h3>
                <p className="text-xs text-slate-400">
                  Scheduled for today • Real-time AI facial verification running across lecture halls
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Active Roll Call
              </span>
            </div>

            <div className="space-y-3">
              {todayClasses.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                  No classes scheduled for today ({todayDayName}).
                </div>
              ) : (
                todayClasses.map((item, idx) => {
                  const live = getSlotLiveStatus(item.timeSlot);
                  return (
                    <div key={idx} className={`p-3.5 rounded-xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                      live.isLive 
                        ? 'bg-slate-950/90 border-emerald-500/50 shadow-md shadow-emerald-950/20' 
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-indigo-500/40'
                    }`}>
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-white">{item.subjectName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                            {item.subjectCode}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                            {item.room}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                          <span>Faculty: <strong className="text-slate-300">{item.facultyName}</strong> ({item.facultyCode})</span>
                          <span>•</span>
                          <span className="font-mono text-sky-400">Period {item.periodNumber} ({item.timeSlot})</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                          live.isLive
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse' 
                            : live.status === 'Completed'
                            ? 'bg-slate-800/80 text-slate-400 border-slate-700'
                            : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                        }`}>
                          {live.status === 'In Progress' ? 'In Progress' : live.status}
                        </span>
                        <button 
                          onClick={() => setActiveSubTab('camerawall')}
                          className="px-2.5 py-1 text-xs rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all font-semibold flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View Feed
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Approvals Queue Widget */}
          <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Urgent Student Approvals
                </h3>
                <span className="text-xs text-indigo-400 font-mono font-semibold cursor-pointer hover:underline" onClick={() => setActiveSubTab('approvals')}>
                  View All ({pendingRequests.length})
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">Pending biometric profile updates and new enrollee verifications</p>

              <div className="space-y-3">
                {pendingRequests.filter(r => r.status === 'Pending').slice(0, 2).map(req => (
                  <div key={req.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{req.studentName}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-semibold">{req.type}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {req.rollNo} • {req.branch} • {req.semester}
                    </div>
                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="flex-1 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="flex-1 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-200 space-y-1">
              <strong className="block text-indigo-300">Department Governance Note:</strong>
              Approvals instantly update the Vision Embedding Vector in the Face Recognition Engine.
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab: Enrolled Students Directory */}
      {activeSubTab === 'students' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" />
                Department Enrolled Students & Biometric Face Assets
              </h2>
              <p className="text-xs text-slate-400">
                All authorized students registered by HOD or approved through Admissions KYC with enrolled facial photos
              </p>
            </div>
            <button
              onClick={() => onNavigateTab ? onNavigateTab('registration') : window.location.hash = '#registration'}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll New Student with Photos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvalRequests.filter(r => r.status === 'Approved').map(student => (
              <div key={student.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={student.photos?.[0] || '/students/24UECC8024_face.jpg'}
                      alt={student.studentName}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" title="Biometrically Active" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{student.studentName}</h4>
                    <div className="text-xs font-mono text-sky-400 font-semibold">{student.rollNo}</div>
                    <div className="text-[11px] text-slate-400 truncate">{student.branch}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Year / Semester:</span>
                    <span className="font-semibold text-slate-200">{student.year} ({student.semester})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Section:</span>
                    <span className="font-semibold text-slate-200">{student.section}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">KYC Photos Enrolled:</span>
                    <span className="font-semibold text-emerald-400">{student.photos?.length || 1} Photo(s)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    ACTIVE ENROLLEE
                  </span>
                  <button
                    onClick={() => handleDeleteProfile(student.rollNo || student.id, student.studentName)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors text-xs flex items-center gap-1 font-mono"
                    title="Delete Student Profile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approvals Full Queue */}
      {activeSubTab === 'approvals' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Department Student Registration & Modification Approvals
              </h2>
              <p className="text-xs text-slate-400">Review student applications, photo clarity, and academic rosters before activation</p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {pendingRequests.filter(r => r.status === 'Pending').length} Pending Requests
            </div>
          </div>

          <div className="space-y-4">
            {pendingRequests.map(req => (
              <div key={req.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {req.photos.map((photo, pIdx) => (
                      <img
                        key={pIdx}
                        src={photo}
                        alt="applicant"
                        className="w-12 h-12 rounded-xl object-cover border-2 border-slate-800 shadow-md"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{req.studentName}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {req.rollNo}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                        {req.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {req.branch} • {req.year} ({req.semester}) • Sec: {req.section} • Submitted {req.submittedAt}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      Email: {req.email} • Mobile: {req.mobile}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {req.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Approve Enrollee
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono ${
                      req.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}>
                      Status: {req.status}
                    </span>
                  )}
                  {/* HOD Delete User Profile Button */}
                  <button
                    onClick={() => handleDeleteProfile(req.rollNo || req.id, req.studentName)}
                    title="Permanently Delete User Profile from System"
                    className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-700/50 text-red-400 hover:text-red-200 text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Profile</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Classroom Surveillance Matrix */}
      {activeSubTab === 'camerawall' && (
        <CameraMatrixView />
      )}

      {/* Department Timetable Hub Tab */}
      {activeSubTab === 'timetable' && (
        <TimetableManagerView />
      )}

      {/* Academic Allocation & Approval Modal */}
      {allocationModalReq && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Approve Student & Allocate Academic Program
                </h3>
                <p className="text-xs text-slate-400">
                  Assign branch, department, year, semester, and section to activate student subjects
                </p>
              </div>
              <button
                onClick={() => setAllocationModalReq(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Student Name:</span>
                <span className="text-white font-bold">{allocationModalReq.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Roll / Username:</span>
                <span className="text-sky-300 font-mono font-bold">{allocationModalReq.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Official Email:</span>
                <span className="text-slate-300 font-mono">{allocationModalReq.email}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">Department</label>
                  <select
                    value={allocDepartment}
                    onChange={(e) => setAllocDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:border-sky-500 font-mono"
                  >
                    <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">Branch</label>
                  <select
                    value={allocBranch}
                    onChange={(e) => setAllocBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:border-sky-500 font-mono"
                  >
                    <option value="Electronics & Communication Engineering (ECE)">ECE - Electronics & Communication</option>
                    <option value="Electronics & Computer Control (ECC)">ECC - Electronics & Computer Control</option>
                    <option value="Electrical & Electronics Engineering (EEE)">EEE - Electrical & Electronics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">Academic Year</label>
                  <select
                    value={allocYear}
                    onChange={(e) => setAllocYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:border-sky-500 font-mono"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">Semester</label>
                  <select
                    value={allocSemester}
                    onChange={(e) => setAllocSemester(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:border-sky-500 font-mono"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">Section</label>
                  <select
                    value={allocSection}
                    onChange={(e) => setAllocSection(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:border-sky-500 font-mono"
                  >
                    <option value="Section A">Section A</option>
                    <option value="Section B">Section B</option>
                    <option value="Section C">Section C</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => setAllocationModalReq(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Authorize & Activate Student</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
