import React, { useState } from 'react';
import { 
  User, CheckCircle2, Clock, Calendar, FileText, 
  Calculator, AlertCircle, ArrowRight, Download, Send, 
  HelpCircle, Sparkles, BookOpen, ChevronRight, Eye, ShieldCheck
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { useAuth } from '../../context/AuthContext';

export const StudentDedicatedDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'timetable' | 'marks' | 'requests'>('overview');
  
  // Target percentage calculator
  const [targetPercentage, setTargetPercentage] = useState(75);
  const totalClasses = 144;
  const attendedClasses = 114;
  const currentAttendancePct = Math.round((attendedClasses / totalClasses) * 100); // 79%

  const classesNeeded = Math.max(0, Math.ceil((targetPercentage * totalClasses - 100 * attendedClasses) / (100 - targetPercentage)));

  // Subject attendance breakdown
  const subjectAttendance = [
    { code: 'CS301', name: 'Computer Vision & AI', pct: 92, attended: '24 / 26', color: 'emerald' },
    { code: 'CS302', name: 'Database Systems', pct: 81, attended: '26 / 32', color: 'sky' },
    { code: 'CS303', name: 'Operating Systems', pct: 72, attended: '21 / 29', color: 'amber' },
    { code: 'CS304', name: 'Computer Networks', pct: 88, attended: '28 / 32', color: 'emerald' },
    { code: 'CS305', name: 'Data Structures & Algorithms', pct: 85, attended: '29 / 34', color: 'purple' }
  ];

  // Internal test marks
  const testMarks = [
    { subject: 'Computer Vision & AI', test: 'Midterm Test', marks: '46/50', grade: 'A' },
    { subject: 'Database Systems', test: 'Unit Test 1', marks: '22/25', grade: 'A-' },
    { subject: 'Operating Systems', test: 'Midterm Test', marks: '34/50', grade: 'B' },
    { subject: 'Computer Networks', test: 'Quiz 1', marks: '19/20', grade: 'A+' },
    { subject: 'Data Structures', test: 'Unit Test 1', marks: '23/25', grade: 'A' }
  ];

  // Requests state
  const [requestType, setRequestType] = useState('Medical Leave Request');
  const [requestReason, setRequestReason] = useState('');
  const [submittedRequests, setSubmittedRequests] = useState([
    { id: 'REQ-01', type: 'Add Elective: Machine Learning', date: 'Yesterday', status: 'Approved' },
    { id: 'REQ-02', type: 'Medical Leave (Fever): 2 Days', date: 'Today', status: 'Pending' }
  ]);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestReason) return;
    setSubmittedRequests(prev => [
      {
        id: `REQ-${Date.now()}`,
        type: `${requestType}: ${requestReason}`,
        date: 'Today',
        status: 'Pending'
      },
      ...prev
    ]);
    setRequestReason('');
  };

  return (
    <div className="space-y-6">
      {/* Student Top Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-sky-600/30 text-sky-400 border border-sky-500/40 shadow-lg shadow-sky-600/20">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-extrabold text-white">Student Personal Academic Portal</h2>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                STUDENT DESK
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Logged in as: <strong className="text-slate-200">{user?.full_name || 'Rahul Sharma (CS23A001)'}</strong> • B.Tech CSE (3rd Semester)
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          {[
            { id: 'overview', label: 'Attendance & 75% Goal' },
            { id: 'marks', label: 'Internal Test Marks' },
            { id: 'timetable', label: 'My Class Schedule' },
            { id: 'requests', label: 'HOD Request Desk' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attendance & 75% Target Calculator */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Attendance Card */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Cumulative Attendance Status
                </h3>
                <p className="text-xs text-slate-400">Automated AI Facial Verification Records</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black text-sky-400 font-mono">{currentAttendancePct}%</span>
                <span className="text-[11px] text-slate-400 block font-mono">114 / 144 Sessions</span>
              </div>
            </div>

            {/* Attendance Progress Bar */}
            <div className="w-full bg-slate-950 rounded-full h-3.5 border border-slate-800 overflow-hidden relative">
              <div
                className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentAttendancePct}%` }}
              />
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-400 z-10"
                style={{ left: '75%' }}
                title="Mandatory 75% Threshold"
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>0%</span>
              <span className="text-red-400 font-bold">75% Mandatory Exam Criterion</span>
              <span>100%</span>
            </div>

            {/* Subject-Wise Breakdown Table */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Subject-Wise Attendance</h4>
              <div className="space-y-2">
                {subjectAttendance.map((sub) => (
                  <div key={sub.code} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{sub.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">{sub.code}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">Attended: {sub.attended}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold font-mono ${sub.pct >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {sub.pct}%
                      </span>
                      <span className="text-[10px] block font-mono text-slate-500">
                        {sub.pct >= 75 ? 'Eligible' : 'Warning'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 75% Calculator Widget */}
          <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-2">
                <Calculator className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Smart Attendance Simulator</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Calculate exactly how many upcoming lectures you must attend to maintain or hit your target threshold.
              </p>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-semibold">Your Target Goal:</span>
                    <span className="font-mono text-sky-400 font-bold">{targetPercentage}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="95"
                    step="1"
                    value={targetPercentage}
                    onChange={(e) => setTargetPercentage(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-500/20 text-xs space-y-1">
                  <div className="text-slate-300 font-semibold">Analysis:</div>
                  <div className="text-sky-300 text-sm font-bold">
                    {classesNeeded === 0
                      ? `You are currently above ${targetPercentage}%! Keep it up.`
                      : `You must attend the next ${classesNeeded} classes consecutively without missing.`}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200 block">AI Attendance Policy:</span>
              Automated optical entry logs cannot be edited manually by students. Contact your class teacher for excused medical slips.
            </div>
          </div>
        </div>
      )}

      {/* Internal Test Marks View */}
      {activeTab === 'marks' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                Continuous Internal Assessment & Marks
              </h3>
              <p className="text-xs text-slate-400">Midterm, unit test, and assignment marks published by subject faculty</p>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-all flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Download Grade Sheet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testMarks.map((tm, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-white">{tm.subject}</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Grade {tm.grade}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">{tm.test}</div>
                <div className="text-lg font-black text-white font-mono pt-1">{tm.marks}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable Schedule View */}
      {activeTab === 'timetable' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-400" />
                Today's Lecture Schedule & Room Allocations
              </h3>
              <p className="text-xs text-slate-400">Class timing, room assignment, and facial camera locations</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-semibold">
              Section A • Semester 3
            </span>
          </div>

          <div className="space-y-3">
            {[
              { time: '09:00 - 10:00 AM', subject: 'CS301 - Computer Vision & AI', prof: 'Prof. Anjali Sen', room: 'Lecture Hall 101', status: 'Active Now' },
              { time: '10:00 - 11:00 AM', subject: 'CS302 - Database Systems', prof: 'Dr. Rajesh Iyer', room: 'Lecture Hall 102', status: 'Upcoming' },
              { time: '11:15 - 12:15 PM', subject: 'CS303 - Operating Systems', prof: 'Prof. Vikram Rao', room: 'Lab 201', status: 'Upcoming' },
              { time: '01:00 - 02:00 PM', subject: 'CS304 - Computer Networks', prof: 'Dr. Sunita Paul', room: 'Lecture Hall 101', status: 'Upcoming' },
            ].map((slot, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{slot.subject}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{slot.room}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Faculty: {slot.prof} • Timing: {slot.time}</div>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                  slot.status === 'Active Now' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                }`}>
                  {slot.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-sky-400" />
              Submit Request to HOD
            </h3>
            <p className="text-xs text-slate-400">Request subject enrollment, medical attendance exemption, or biometric photo update</p>

            <form onSubmit={handleSubmitRequest} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Request Category</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Medical Leave Request">Medical Leave Request</option>
                  <option value="Biometric Photo Update">Biometric Photo Update</option>
                  <option value="Add Elective Subject">Add Elective Subject</option>
                  <option value="Attendance Discrepancy Correction">Attendance Discrepancy Correction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">Details / Reason</label>
                <textarea
                  rows={3}
                  required
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  placeholder="Provide date, medical certificate reference, or subject code..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all"
              >
                Submit Request for HOD Approval
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              My Submitted Requests Status
            </h3>
            <div className="space-y-3">
              {submittedRequests.map((req) => (
                <div key={req.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{req.type}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Submitted: {req.date}</span>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                    req.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
