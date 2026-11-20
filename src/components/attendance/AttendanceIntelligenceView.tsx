import React, { useState } from 'react';
import { 
  GraduationCap, CheckCircle2, AlertTriangle, Clock, 
  Download, Search, Sparkles, Filter, RefreshCw, 
  ShieldCheck, UserCheck, Video, Users, ChevronRight, Eye
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { AttendanceStatus, AttendanceRecord } from '../../types';

export const AttendanceIntelligenceView: React.FC = () => {
  const { 
    attendanceRecords, markAttendance, triggerAttendanceScan, 
    exportAttendanceCSV, setSelectedPersonId
  } = useSecurity();

  const [selectedCourse, setSelectedCourse] = useState<string>('All Courses');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const courses = [
    'All Courses',
    'CS301 - Computer Vision & AI',
    'DS202 - Deep Learning',
    'EC204 - Digital Signal Processing',
    'ROB101 - Autonomous Robotics'
  ];

  const handleScan = async () => {
    setIsScanning(true);
    setScanMessage('Scanning camera channels...');
    await triggerAttendanceScan();
    setIsScanning(false);
    setScanMessage('All student vectors verified!');
    setTimeout(() => setScanMessage(null), 3500);
  };

  const filteredRecords = attendanceRecords.filter(r => {
    const matchesCourse = selectedCourse === 'All Courses' || (r.course && r.course.toLowerCase().includes(selectedCourse.toLowerCase()));
    const matchesStatus = selectedStatus === 'All' || r.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.student_id && r.student_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.person_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesStatus && matchesSearch;
  });

  // Calculate metrics
  const totalStudents = attendanceRecords.length;
  const verifiedCount = attendanceRecords.filter(r => r.status === 'Verified' || r.status === 'Present').length;
  const lateCount = attendanceRecords.filter(r => r.status === 'Late').length;
  const proxyCount = attendanceRecords.filter(r => r.status === 'Proxy Flagged').length;
  const attendanceRate = totalStudents > 0 ? Math.round((verifiedCount / totalStudents) * 100) : 0;

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified
          </span>
        );
      case 'Present':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
            <UserCheck className="w-3 h-3 text-sky-400" />
            Present
          </span>
        );
      case 'Late':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
            <Clock className="w-3 h-3 text-amber-400" />
            Late Arrival
          </span>
        );
      case 'Proxy Flagged':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 font-bold animate-pulse">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            Proxy / Tailgate
          </span>
        );
      case 'Absent':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600 font-bold">
            Absent
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <span>Smart Classroom Attendance & Biometric Roster</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Live AI Biometrics
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              YOLOv8 + ArcFace facial recognition • Automated tailgating & proxy attendance auditing
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Run Biometric Scan Button */}
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{scanMessage || (isScanning ? 'Scanning...' : 'Run Real-Time Attendance Scan')}</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={() => exportAttendanceCSV(selectedCourse === 'All Courses' ? undefined : selectedCourse)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top 4 Attendance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Roster */}
        <div className="glass-panel rounded-2xl p-5 border border-sky-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Enrolled</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono mt-2">{totalStudents}</div>
          <div className="text-[11px] text-slate-400 mt-1">CS301 & Department Roster</div>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Verified Present */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Present</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-2">
            {verifiedCount} <span className="text-sm font-sans font-medium text-slate-400">({attendanceRate}%)</span>
          </div>
          <div className="text-[11px] text-emerald-400/90 mt-1">Biometrically verified attendance</div>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Late Arrivals */}
        <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Late Arrivals</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono mt-2">{lateCount}</div>
          <div className="text-[11px] text-amber-400/90 mt-1">&gt; 15 mins after lecture start</div>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
        </div>

        {/* Proxy / Tailgate Flagged */}
        <div className="glass-panel rounded-2xl p-5 border border-red-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Proxy Flagged</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-extrabold text-red-400 font-mono mt-2">{proxyCount}</div>
          <div className="text-[11px] text-red-400/90 mt-1">Rapid multi-badge crossing alert</div>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll number, or ID..."
              className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 font-medium w-64"
            />
          </div>

          {/* Course Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-semibold">Course:</span>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500 font-semibold"
            >
              {courses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-semibold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500 font-semibold"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Proxy Flagged">Proxy Flagged</option>
            </select>
          </div>
        </div>

        {/* Active Classroom Telemetry Badge */}
        <div className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
          <Video className="w-3.5 h-3.5 text-sky-400" />
          <span>Active Pod: <strong className="text-white">Lecture Hall 101 (CAM-021)</strong></span>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                <th className="py-3.5 px-4">Student / Personnel</th>
                <th className="py-3.5 px-4">Student ID / Roll No</th>
                <th className="py-3.5 px-4">Department & Course</th>
                <th className="py-3.5 px-4">Classroom Zone</th>
                <th className="py-3.5 px-4">Time In</th>
                <th className="py-3.5 px-4">Biometric Confidence</th>
                <th className="py-3.5 px-4">Attendance Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredRecords.map((r) => {
                const confPercent = Math.round(r.confidence_score * 100);

                return (
                  <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                    {/* Student Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={r.photo_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'}
                          alt={r.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{r.name}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-normal">
                              {r.role}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{r.person_id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Student ID */}
                    <td className="py-3 px-4 font-mono text-sky-400 font-bold">
                      {r.student_id || r.person_id}
                    </td>

                    {/* Department & Course */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{r.course || 'CS301 - Computer Vision & AI'}</div>
                      <div className="text-[11px] text-slate-400">{r.department || 'Computer Science'}</div>
                    </td>

                    {/* Classroom Zone */}
                    <td className="py-3 px-4 font-mono text-slate-300">
                      <div>{r.room}</div>
                      <div className="text-[10px] text-slate-400">{r.verified_camera_id}</div>
                    </td>

                    {/* Time In */}
                    <td className="py-3 px-4 font-mono text-slate-200">
                      {r.timestamp}
                    </td>

                    {/* Biometric Confidence */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              confPercent >= 95 ? 'bg-emerald-400' : confPercent >= 80 ? 'bg-sky-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${confPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-300">
                          {confPercent}%
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      {getStatusBadge(r.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {r.status !== 'Verified' && (
                          <button
                            onClick={() => markAttendance(r.person_id, 'Verified', 'Verified via professor manual override.')}
                            title="Verify Student Attendance"
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold transition-all"
                          >
                            Verify
                          </button>
                        )}
                        {r.status === 'Verified' && (
                          <button
                            onClick={() => markAttendance(r.person_id, 'Proxy Flagged', 'Manually flagged for attendance inquiry.')}
                            title="Flag as Potential Proxy"
                            className="px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 text-[11px] font-semibold transition-all"
                          >
                            Flag
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedPersonId(r.person_id)}
                          title="Inspect Student Dossier & Trajectory"
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
