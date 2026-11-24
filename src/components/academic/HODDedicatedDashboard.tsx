import React, { useState } from 'react';
import { 
  Building2, Users, Calendar, CheckCircle2, AlertTriangle, 
  Clock, Camera, ShieldCheck, ChevronRight, FileText, 
  Search, Filter, ArrowUpRight, Check, X, Bell, Eye, Download, ShieldAlert,
  GraduationCap, UserCheck2, RefreshCw, Trash2, UserX
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { useAuth } from '../../context/AuthContext';

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

interface HODDedicatedDashboardProps {
  onNavigateTab?: (tab: string) => void;
}

export const HODDedicatedDashboard: React.FC<HODDedicatedDashboardProps> = () => {
  const { attendanceRecords, persons, cameras, approvalRequests, updateApprovalRequestStatus, deleteApprovalRequest, deleteUserProfile } = useSecurity();
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'approvals' | 'attendance' | 'timetable' | 'camerawall'>('overview');
  const [filterYear, setFilterYear] = useState('3');
  const [filterSection, setFilterSection] = useState('A');
  const [filterSubject, setFilterSubject] = useState('DBMS');

  // Academic allocation modal state for approving students
  const [allocationModalReq, setAllocationModalReq] = useState<any | null>(null);
  const [allocDepartment, setAllocDepartment] = useState('Computer Science & Engineering');
  const [allocBranch, setAllocBranch] = useState('Computer Science & Engineering');
  const [allocSemester, setAllocSemester] = useState('3rd Semester');
  const [allocYear, setAllocYear] = useState('2nd Year');
  const [allocSection, setAllocSection] = useState('Section A');

  // Shared reactive registration & clearance approvals queue
  const pendingRequests = approvalRequests;

  const handleOpenApproveModal = (req: any) => {
    setAllocationModalReq(req);
    setAllocDepartment(req.department || 'Computer Science & Engineering');
    setAllocBranch(req.branch || 'Computer Science & Engineering');
    setAllocSemester(req.semester && req.semester !== 'Pending Allocation' ? req.semester : '3rd Semester');
    setAllocYear(req.year && req.year !== 'Pending Allocation' ? req.year : '2nd Year');
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

  // Timetable schedule matrix
  const [timetable] = useState([
    { period: 'Period 1 (09:00 - 10:00)', subject: 'CS301 - Data Structures', teacher: 'Prof. Anjali Sen', room: 'Lecture Hall 101', status: 'In Progress', attendance: '94% (58/62)' },
    { period: 'Period 2 (10:00 - 11:00)', subject: 'CS302 - Database Systems', teacher: 'Dr. Rajesh Iyer', room: 'Lecture Hall 102', status: 'Upcoming', attendance: 'Scheduled' },
    { period: 'Period 3 (11:15 - 12:15)', subject: 'CS303 - Operating Systems', teacher: 'Prof. Vikram Rao', room: 'Lab 201', status: 'Scheduled', attendance: 'Scheduled' },
    { period: 'Period 4 (01:00 - 02:00)', subject: 'CS304 - Computer Networks', teacher: 'Dr. Sunita Paul', room: 'Lecture Hall 101', status: 'Scheduled', attendance: 'Scheduled' },
    { period: 'Period 5 (02:00 - 03:00)', subject: 'CS305 - AI & Computer Vision', teacher: 'Prof. Anjali Sen', room: 'AI Research Lab', status: 'Scheduled', attendance: 'Scheduled' }
  ]);

  const departmentStats = [
    { title: 'Department Faculty', count: '24', subtext: '22 On-Duty Today', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { title: 'Total CS Students', count: '486', subtext: '94.2% Overall Attendance', icon: GraduationCap, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { title: 'Pending Approvals', count: `${pendingRequests.filter(r => r.status === 'Pending').length}`, subtext: 'Registrations & Photo Updates', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { title: 'Active Classrooms', count: '8', subtext: 'Real-Time AI Stream Active', icon: Camera, color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' }
  ];

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
                Department of Computer Science & Engineering
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                HOD EXECUTIVE PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as: <strong className="text-slate-200">{user?.full_name || 'Dr. Rajesh Iyer (HOD)'}</strong> • Department Operations & Academic Surveillance
            </p>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex items-center space-x-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          {[
            { id: 'overview', label: 'Department Overview' },
            { id: 'approvals', label: `Approvals Queue (${pendingRequests.filter(r => r.status === 'Pending').length})` },
            { id: 'timetable', label: 'Department Timetable' },
            { id: 'attendance', label: 'Audit & Records' },
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
          {/* Ongoing Classes Monitor */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-400" />
                  Live Academic Classes in Progress
                </h3>
                <p className="text-xs text-slate-400">Automated AI facial verification running across Department lecture halls</p>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Active Roll Call
              </span>
            </div>

            <div className="space-y-3">
              {timetable.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{item.subject}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {item.room}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                      <span>Faculty: <strong className="text-slate-300">{item.teacher}</strong></span>
                      <span>•</span>
                      <span>{item.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                      item.status === 'In Progress' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.attendance}
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
              ))}
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
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-sky-400" />
                Department Classrooms Optical Stream Matrix
              </h2>
              <p className="text-xs text-slate-400">Live AI bounding boxes and attendance face recognition across lecture rooms</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold">
              {cameras.length} Department Cameras Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cameras.map(cam => (
              <div key={cam.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{cam.name}</span>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {cam.status}
                  </span>
                </div>
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                  <div className="text-center space-y-1">
                    <Camera className="w-8 h-8 text-sky-400/50 mx-auto" />
                    <span className="text-xs font-mono text-slate-400 block">{cam.room || 'Department Zone'}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-400 font-semibold">
                    Resolution: {cam.resolution}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Stream: {cam.stream_type}</span>
                  <span>FPS: {cam.fps}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance & Timetable Tab */}
      {(activeSubTab === 'attendance' || activeSubTab === 'timetable') && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Department Attendance Master Log
              </h2>
              <p className="text-xs text-slate-400">Total automated records generated by smart camera nodes today</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-slate-400">
                Total Logs: {attendanceRecords.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Roll ID</th>
                  <th className="py-2.5 px-3">Course / Subject</th>
                  <th className="py-2.5 px-3">Room</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">AI Confidence</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {attendanceRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-white font-sans">{rec.name}</td>
                    <td className="py-2.5 px-3 text-slate-400">{rec.student_id || rec.person_id}</td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">{rec.course || 'CS301 - Computer Vision'}</td>
                    <td className="py-2.5 px-3 text-slate-400">{rec.room || 'Lecture Hall 101'}</td>
                    <td className="py-2.5 px-3 text-sky-400">{rec.timestamp}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">{Math.round((rec.confidence_score || 0.95) * 100)}%</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Electronics & Communication Engineering">Electronics & Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-mono font-semibold block mb-1">Branch</label>
                  <select
                    value={allocBranch}
                    onChange={(e) => setAllocBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:border-sky-500 font-mono"
                  >
                    <option value="Computer Science & Engineering">Computer Science (CSE)</option>
                    <option value="AI & Data Science">AI & Data Science (AIDS)</option>
                    <option value="Information Technology">Information Technology (IT)</option>
                    <option value="Electronics & Communication Engineering">Electronics & Comm. (ECE)</option>
                    <option value="Mechanical Engineering">Mechanical (ME)</option>
                    <option value="Civil Engineering">Civil (CE)</option>
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
