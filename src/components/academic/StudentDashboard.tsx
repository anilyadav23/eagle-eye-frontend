import React, { useState } from 'react';
import { 
  User, CheckCircle2, Clock, Calendar, FileText, 
  Calculator, AlertCircle, ArrowRight, Download, Send, 
  HelpCircle, Sparkles, BookOpen, ChevronRight, Eye
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timetable' | 'marks' | 'requests'>('overview');
  
  // Target percentage calculator (Page 9)
  const [targetPercentage, setTargetPercentage] = useState(75);
  const totalClasses = 144;
  const attendedClasses = 112;
  const currentAttendancePct = Math.round((attendedClasses / totalClasses) * 100); // 78%

  // Calculation for classes needed to reach target %
  const classesNeeded = Math.max(0, Math.ceil((targetPercentage * totalClasses - 100 * attendedClasses) / (100 - targetPercentage)));

  // Subject attendance
  const subjectAttendance = [
    { code: 'DS', name: 'Data Structures', pct: 82, attended: '28 / 34', color: 'emerald' },
    { code: 'DBMS', name: 'Database Systems', pct: 76, attended: '25 / 33', color: 'sky' },
    { code: 'OS', name: 'Operating Systems', pct: 68, attended: '23 / 34', color: 'amber' },
    { code: 'CN', name: 'Computer Networks', pct: 91, attended: '30 / 33', color: 'emerald' },
    { code: 'AI', name: 'Artificial Intelligence', pct: 85, attended: '28 / 33', color: 'purple' }
  ];

  // Internal test marks (Page 9)
  const testMarks = [
    { subject: 'Data Structures', test: 'Unit Test 1', marks: '82/100', grade: 'A-' },
    { subject: 'Database Systems', test: 'Unit Test 1', marks: '76/100', grade: 'B+' },
    { subject: 'Operating Systems', test: 'Midterm', marks: '68/100', grade: 'B' },
    { subject: 'Computer Networks', test: 'Unit Test 1', marks: '91/100', grade: 'A' },
    { subject: 'Engineering Maths', test: 'Midterm', marks: '74/100', grade: 'B+' }
  ];

  // Requests state
  const [requestType, setRequestType] = useState('Add Subject');
  const [requestReason, setRequestReason] = useState('');
  const [submittedRequests, setSubmittedRequests] = useState([
    { id: 'REQ-1', type: 'Subject Add: Cloud Computing', date: '18 Aug 2025', status: 'Approved' },
    { id: 'REQ-2', type: 'Profile Correction: Mobile Number', date: '21 Aug 2025', status: 'Pending' }
  ]);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestReason) return;
    setSubmittedRequests(prev => [
      {
        id: `REQ-${Date.now()}`,
        type: `${requestType}: ${requestReason.slice(0, 30)}`,
        date: 'Today',
        status: 'Pending'
      },
      ...prev
    ]);
    setRequestReason('');
  };

  return (
    <div className="space-y-6">
      {/* Student Top Header Banner (Page 9) */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Student Academic Portal</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                Rahul Kumar (CS23A001)
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Real-time personal academic visibility: automated attendance, timetables, internal test marks, and request center.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Calculator
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'timetable' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Today's Timetable
          </button>
          <button
            onClick={() => setActiveTab('marks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'marks' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Internal Test Marks
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'requests' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Requests
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics (Page 9) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30">
          <div className="text-xs text-slate-400 font-medium">Overall Attendance</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{currentAttendancePct}%</div>
          <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Present: {attendedClasses} • Absent: {totalClasses - attendedClasses}</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-sky-500/30">
          <div className="text-xs text-slate-400 font-medium">Today's Classes</div>
          <div className="text-2xl font-bold font-mono text-sky-400 mt-1">3 / 4 Attended</div>
          <div className="text-[11px] text-sky-400/80 mt-0.5">1 class remaining (03:00 PM)</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-purple-500/30">
          <div className="text-xs text-slate-400 font-medium">Latest Internal Test</div>
          <div className="text-2xl font-bold font-mono text-purple-300 mt-1">A- (82/100)</div>
          <div className="text-[11px] text-purple-400/80 mt-0.5 font-mono">Data Structures Unit 1</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-amber-500/30">
          <div className="text-xs text-slate-400 font-medium">Pending Requests</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {submittedRequests.filter(r => r.status === 'Pending').length} Pending
          </div>
          <div className="text-[11px] text-amber-400/80 mt-0.5">Awaiting HOD verification</div>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Subject-wise Percentage & Attendance Calculator (Page 9) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center justify-between">
                <span>Subject-wise Attendance Breakdown</span>
                <span className="text-[11px] font-mono text-slate-400">Current Semester</span>
              </h3>

              <div className="space-y-3">
                {subjectAttendance.map((sub) => (
                  <div key={sub.code} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">
                        {sub.name} <span className="text-slate-400 font-normal">({sub.code})</span>
                      </span>
                      <span className="font-mono font-bold text-white">
                        {sub.pct}% <span className="text-slate-400 text-[11px]">({sub.attended})</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          sub.pct >= 85 ? 'bg-emerald-400' : sub.pct >= 75 ? 'bg-sky-400' : 'bg-amber-400'
                        }`} 
                        style={{ width: `${sub.pct}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Calculator (Feature 6 on Page 9) */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-white text-sm">Attendance Calculator & Target Planner</h3>
              </div>
              <p className="text-xs text-slate-400">
                Check current percentage and see how many consecutive classes you need to attend to maintain target attendance.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Select Target Attendance:</div>
                  <div className="flex items-center gap-2 mt-1">
                    {[75, 80, 85, 90].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTargetPercentage(t)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                          targetPercentage === t ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {t}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Status for {targetPercentage}% Target:</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                    {currentAttendancePct >= targetPercentage 
                      ? 'Safe! On Target' 
                      : `Attend next ${classesNeeded} classes`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Attendance Verification Transparency (Page 9) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center justify-between">
                <span>Verification Transparency Log</span>
                <span className="text-[10px] font-mono text-emerald-400">Tamper-Proof Audit</span>
              </h3>
              <p className="text-xs text-slate-400">
                Know exactly how your presence was recorded across campus cameras.
              </p>

              <div className="space-y-3 text-xs">
                {[
                  { date: '12 Aug 2025', subject: 'Data Structures', method: 'AI Facial Verification', icon: Sparkles, color: 'text-emerald-400' },
                  { date: '14 Aug 2025', subject: 'Database Systems', method: 'Teacher Verified', icon: CheckCircle2, color: 'text-sky-400' },
                  { date: '16 Aug 2025', subject: 'Operating Systems', method: 'Approved by Override', icon: Clock, color: 'text-amber-400' },
                  { date: '18 Aug 2025', subject: 'Computer Networks', method: 'Camera Entry Record', icon: Eye, color: 'text-purple-400' }
                ].map((log, idx) => {
                  const Icon = log.icon;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{log.subject}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{log.date}</div>
                      </div>
                      <div className="flex items-center space-x-1.5 font-mono text-[11px] font-semibold">
                        <Icon className={`w-3.5 h-3.5 ${log.color}`} />
                        <span className={log.color}>{log.method}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attendance Dispute & Correction Request */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm">Attendance Correction Request</h3>
              <p className="text-xs text-slate-400">
                Did the camera miss you due to occlusion or late entry? Submit a one-click correction request for teacher review.
              </p>
              <button
                onClick={() => setActiveTab('requests')}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-sky-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Submit Attendance Correction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timetable Tab (Page 9) */}
      {activeTab === 'timetable' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Today's Class Schedule</h3>
            <span className="text-xs font-mono text-slate-400">Monday, 24 Aug 2025</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800 font-mono text-[11px] text-slate-400">
                  <th className="p-3">Time</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Faculty</th>
                  <th className="p-3 text-right">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {[
                  { time: '09:00 AM - 10:00 AM', subject: 'Data Structures', room: 'C101', teacher: 'Prof. Sharma', status: 'Present' },
                  { time: '11:00 AM - 12:00 PM', subject: 'Database Systems', room: 'C102', teacher: 'Dr. Meena', status: 'Present' },
                  { time: '01:00 PM - 02:00 PM', subject: 'Operating Systems', room: 'C201', teacher: 'Dr. Iyer', status: 'Upcoming' },
                  { time: '03:00 PM - 04:00 PM', subject: 'Computer Networks', room: 'C202', teacher: 'Prof. Khan', status: 'Absent' }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-3 text-slate-300">{item.time}</td>
                    <td className="p-3 font-bold text-white font-sans">{item.subject}</td>
                    <td className="p-3 text-sky-400">{item.room}</td>
                    <td className="p-3 text-slate-300 font-sans">{item.teacher}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        item.status === 'Present' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        item.status === 'Upcoming' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Internal Test Marks Tab (Page 9) */}
      {activeTab === 'marks' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Latest Internal Test Marks & Progress</h3>
            <button className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download Marks Slip</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800 font-mono text-[11px] text-slate-400">
                  <th className="p-3">Subject</th>
                  <th className="p-3">Test Type</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {testMarks.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white font-sans">{m.subject}</td>
                    <td className="p-3 text-slate-300">{m.test}</td>
                    <td className="p-3 text-sky-400 font-bold">{m.marks}</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                        {m.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Requests Tab (Page 4 & 9) */}
      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm">Submit New Academic Request</h3>
              <form onSubmit={handleSubmitRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Request Type:</label>
                  <select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  >
                    <option value="Add Subject">Add Subject</option>
                    <option value="Remove Subject">Remove Subject</option>
                    <option value="Branch / Section Change">Branch / Section Change</option>
                    <option value="Profile Correction">Profile Correction</option>
                    <option value="Photo Update for Biometrics">Photo Update for Biometrics</option>
                    <option value="Attendance Dispute">Attendance Dispute Correction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Reason / Request Details:</label>
                  <textarea
                    rows={4}
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    placeholder="Provide detailed explanation for this request..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-medium"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow"
                >
                  Submit for HOD / Teacher Approval
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm">Submitted Request Status</h3>
              <div className="space-y-3">
                {submittedRequests.map(r => (
                  <div key={r.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{r.type}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Date: {r.date}</div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                      r.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
