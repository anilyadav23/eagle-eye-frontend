import React, { useState } from 'react';
import { 
  GraduationCap, Video, CheckCircle2, AlertTriangle, HelpCircle, 
  Clock, Plus, Users, Edit3, Send, Download, FileText, Check, 
  X, RefreshCw, UserCheck, Eye, Layers, Calendar
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const TeacherDashboard: React.FC = () => {
  const { attendanceRecords, markAttendance, setSelectedPersonId } = useSecurity();
  const [activeTab, setActiveTab] = useState<'classroom' | 'tests' | 'records'>('classroom');
  
  // Class state
  const [classType, setClassType] = useState<'Regular Class' | 'Extra Class' | 'Combined Class' | 'Substitute'>('Regular Class');
  const [activeRoom, setActiveRoom] = useState('Room 203 - Grade 10 (Science)');
  const [isAttendanceFinalized, setIsAttendanceFinalized] = useState(false);
  const [reopenTimer, setReopenTimer] = useState<number | null>(null);

  // Student Draft list (Pages 3, 5, 8)
  const [students, setStudents] = useState([
    {
      id: 's1',
      rollNo: '22CS001',
      name: 'Aarya Sharma',
      status: 'Verified',
      decision: 'AI Confirmed',
      confidence: '98%',
      details: 'Face & Timetable matched',
      clothing: 'Blue Hoodie',
      height: '~168 cm',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 's2',
      rollNo: '22CS002',
      name: 'Rohan Mehta',
      status: 'Verified',
      decision: 'AI Confirmed',
      confidence: '96%',
      details: 'Face & Timetable matched',
      clothing: 'Black Shirt',
      height: '~174 cm',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 's3',
      rollNo: '22CS003',
      name: 'Neha Singh',
      status: 'Needs Review',
      decision: 'Needs Review',
      confidence: '78%',
      details: 'Partial occlusion / Low angle',
      clothing: 'Maroon Sweater',
      height: '~165 cm',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 's4',
      rollNo: '22CS004',
      name: 'Vikram Das',
      status: 'Unknown',
      decision: 'Unknown Student',
      confidence: '42%',
      details: 'Face not found in Class Roster',
      clothing: 'Grey Jacket',
      height: '~172 cm',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 's5',
      rollNo: '22CS012',
      name: 'Sameer Sen',
      status: 'Other-Section',
      decision: 'Other-Section Student',
      confidence: '93%',
      details: 'Enrolled in Section B (Not Section A)',
      clothing: 'White T-Shirt',
      height: '~178 cm',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  // Internal Tests and Marks (Page 8)
  const [tests, setTests] = useState([
    {
      id: 't1',
      title: 'Unit Test 1 - Computer Vision & Edge AI',
      course: 'CS301',
      totalMarks: 50,
      status: 'Published',
      date: '18 Aug 2025',
      submissions: '42 / 45'
    },
    {
      id: 't2',
      title: 'Midterm Examination - Data Structures',
      course: 'CS102',
      totalMarks: 100,
      status: 'Draft',
      date: '24 Aug 2025',
      submissions: 'Draft Mode'
    }
  ]);

  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestCourse, setNewTestCourse] = useState('CS301');
  const [newTestMarks, setNewTestMarks] = useState(100);

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle) return;
    setTests(prev => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        title: newTestTitle,
        course: newTestCourse,
        totalMarks: Number(newTestMarks),
        status: 'Draft',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        submissions: '0 Submitted'
      }
    ]);
    setNewTestTitle('');
  };

  const handlePublishTest = (id: string) => {
    setTests(prev => prev.map(t => t.id === id ? { ...t, status: 'Published' } : t));
  };

  const handleActionStudent = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, decision: 'Teacher Verified' } : s));
  };

  const finalizeAttendance = () => {
    setIsAttendanceFinalized(true);
    setReopenTimer(15); // 15 mins window to reopen
  };

  return (
    <div className="space-y-6">
      {/* Teacher Header Banner (Page 8) */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-teal-500/20 border border-teal-400/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Teacher Dashboard</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                Daily Classroom Operations
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Manage classes, monitor attendance, handle multi-factor AI overrides, publish test marks, and review records.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('classroom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'classroom' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Classroom & AI Review
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tests' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Internal Tests & Midterms
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'records' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Records & History
          </button>
        </div>
      </div>

      {/* Top Teacher Metric Cards (Page 8) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-sky-500/30">
          <div className="text-xs text-slate-400 font-medium">Today's Classes</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">5 Classes</div>
          <div className="text-[11px] text-slate-400 mt-0.5">2 completed • 3 upcoming</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30">
          <div className="text-xs text-slate-400 font-medium">Active Live Class</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">Room 203</div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">Grade 10 - Science</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-amber-500/30">
          <div className="text-xs text-slate-400 font-medium">Pending Reviews</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {students.filter(s => s.status === 'Needs Review' || s.status === 'Unknown' || s.status === 'Other-Section').length}
          </div>
          <div className="text-[11px] text-amber-400/80 mt-0.5">Unknown: 1 • Other Section: 1</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-purple-500/30">
          <div className="text-xs text-slate-400 font-medium">Tests to Publish</div>
          <div className="text-2xl font-bold font-mono text-purple-300 mt-1">2 Tests</div>
          <div className="text-[11px] text-purple-400/80 mt-0.5">1 Draft • 1 Ready</div>
        </div>
      </div>

      {activeTab === 'classroom' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Live Classroom Camera & Multi-Factor AI Signals (Page 5, 8) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-white text-sm">{activeRoom}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold animate-pulse">
                    LIVE STREAM
                  </span>
                  <span className="text-xs font-mono text-slate-400">10:34:21 AM</span>
                </div>
              </div>

              {/* Classroom Video Viewport */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop" 
                  alt="Classroom Feed" 
                  className="w-full h-full object-cover"
                />
                
                {/* AI Overlay Bounding Boxes Simulation */}
                <div className="absolute top-1/4 left-1/4 w-28 h-32 border-2 border-emerald-400 bg-emerald-500/10 rounded-lg p-1.5 flex flex-col justify-between pointer-events-none">
                  <span className="text-[10px] font-mono font-bold bg-emerald-600 text-white px-1 rounded w-fit">
                    Verified (98%)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-200">Aarya Sharma</span>
                </div>

                <div className="absolute top-1/3 right-1/4 w-28 h-32 border-2 border-amber-400 bg-amber-500/10 rounded-lg p-1.5 flex flex-col justify-between pointer-events-none">
                  <span className="text-[10px] font-mono font-bold bg-amber-600 text-white px-1 rounded w-fit">
                    Review Needed
                  </span>
                  <span className="text-[10px] font-mono text-amber-200">Neha Singh</span>
                </div>

                <div className="absolute top-1/4 right-10 w-28 h-32 border-2 border-red-500 bg-red-500/10 rounded-lg p-1.5 flex flex-col justify-between pointer-events-none">
                  <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-1 rounded w-fit">
                    Unknown
                  </span>
                  <span className="text-[10px] font-mono text-red-200">Not in roster</span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Class Type: <strong className="text-white">{classType}</strong></span>
                  <span className="text-slate-300">Periodic Scan: <strong className="text-emerald-400">Every 15-30s</strong></span>
                </div>
              </div>

              {/* Class Type Management Options (Page 8) */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Class Mode:</span>
                {(['Regular Class', 'Extra Class', 'Combined Class', 'Substitute'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setClassType(mode)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      classType === mode 
                        ? 'bg-sky-500 text-white shadow' 
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Multi-Factor Decision States Legend (Page 5) */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800">
              <h4 className="font-bold text-white text-xs mb-3 flex items-center justify-between">
                <span>Multi-Factor AI Verification Signals</span>
                <span className="text-[10px] font-mono text-slate-400">Face + Liveness + Outfit + Timetable</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono">
                  <div className="font-bold text-[11px]">1. Verified Student</div>
                  <div className="text-[10px] opacity-80 mt-0.5">High confidence &gt;90%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                  <div className="font-bold text-[11px]">2. Needs Review</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Unclear angle or score</div>
                </div>
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 font-mono">
                  <div className="font-bold text-[11px]">3. Teacher Verified</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Teacher manual confirmation</div>
                </div>
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-mono">
                  <div className="font-bold text-[11px]">4. Unknown Student</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Not found in database</div>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono">
                  <div className="font-bold text-[11px]">5. Other Section</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Recognized from other sec</div>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono">
                  <div className="font-bold text-[11px]">6. Suspicious / Proxy</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Photo/video spoofing flagged</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real-time Attendance Draft & Teacher Actions (Page 3 & 8) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Attendance Draft (Real-Time)</h3>
                  <p className="text-[11px] text-slate-400">Generated automatically by AI vision engine</p>
                </div>
                
                {isAttendanceFinalized ? (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Finalized
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                    Draft In Progress
                  </span>
                )}
              </div>

              {/* Student Cards in Draft */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {students.map(s => (
                  <div key={s.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={s.photo} alt={s.name} className="w-10 h-10 rounded-xl object-cover border border-slate-700" />
                        <div>
                          <div className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>{s.name}</span>
                            <span className="text-[10px] font-mono text-sky-400 font-normal">({s.rollNo})</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Confidence: <strong className="text-emerald-400">{s.confidence}</strong> • {s.clothing}
                          </div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        s.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        s.status === 'Needs Review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        s.status === 'Other-Section' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {s.status}
                      </span>
                    </div>

                    {/* Teacher Action Buttons for this student */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 italic">{s.details}</span>
                      <div className="flex items-center space-x-1.5">
                        {s.status !== 'Verified' && (
                          <button
                            onClick={() => handleActionStudent(s.id, 'Verified')}
                            className="px-2 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-[10px] font-bold transition-all"
                          >
                            Mark Present
                          </button>
                        )}
                        {s.status !== 'Absent' && (
                          <button
                            onClick={() => handleActionStudent(s.id, 'Absent')}
                            className="px-2 py-0.5 rounded bg-red-600/30 hover:bg-red-600/50 text-red-300 text-[10px] font-bold transition-all"
                          >
                            Mark Absent
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Finalize & Lock Attendance Button (Page 8) */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                {!isAttendanceFinalized ? (
                  <button
                    onClick={finalizeAttendance}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Finalize & Submit Attendance (Lock Roster)</span>
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-600/40 flex items-center justify-between">
                    <span className="text-xs text-emerald-300 font-mono">
                      Attendance locked. Reopen allowed: 14m 32s
                    </span>
                    <button
                      onClick={() => setIsAttendanceFinalized(false)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold"
                    >
                      Reopen
                    </button>
                  </div>
                )}
                <div className="text-[11px] text-slate-400 text-center font-mono">
                  Teacher cannot delete student profiles • Only add/remove from own class session
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internal Tests and Midterms (Page 8) */}
      {activeTab === 'tests' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Test Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Create New Internal Test / Midterm</span>
              </h3>

              <form onSubmit={handleCreateTest} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Test Title:</label>
                  <input
                    type="text"
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                    placeholder="e.g. Unit Test 2 - Operating Systems"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Course Code:</label>
                    <select
                      value={newTestCourse}
                      onChange={(e) => setNewTestCourse(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="CS301">CS301 - Computer Vision & AI</option>
                      <option value="CS102">CS102 - Operating Systems</option>
                      <option value="CS101">CS101 - Database Systems</option>
                      <option value="CS202">CS202 - Computer Networks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Max Marks:</label>
                    <input
                      type="number"
                      value={newTestMarks}
                      onChange={(e) => setNewTestMarks(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow"
                >
                  Create & Save Draft
                </button>
              </form>
            </div>
          </div>

          {/* Test List & Publish */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm">Published & Draft Tests</h3>
              <div className="space-y-3">
                {tests.map(t => (
                  <div key={t.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{t.title}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          t.status === 'Published' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        {t.course} • Max Marks: {t.totalMarks} • Date: {t.date} • Submissions: {t.submissions}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {t.status === 'Draft' ? (
                        <button
                          onClick={() => handlePublishTest(t.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                        >
                          Publish to Students
                        </button>
                      ) : (
                        <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1">
                          <Download className="w-3.5 h-3.5 text-emerald-400" />
                          <span>PDF Result</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Records & History (Page 8) */}
      {activeTab === 'records' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" 
                alt="Student Profile" 
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div>
                <h3 className="font-bold text-white text-sm">Ahmed Ali (10A032)</h3>
                <p className="text-xs text-slate-400 font-mono">Grade 10 - Section A • Overall Attendance: 92% (110 Present / 7 Absent / 3 Late)</p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Recent Activity / Presence Timeline</h4>
            {[
              { date: '24 Aug 2025', time: '10:32 AM', status: 'Present', subject: 'Science (Room 203)', conf: '98% Multi-Factor' },
              { date: '22 Aug 2025', time: '11:05 AM', status: 'Present', subject: 'Mathematics (Room 101)', conf: '97% Multi-Factor' },
              { date: '21 Aug 2025', time: '10:28 AM', status: 'Late (8 min)', subject: 'English (Room 105)', conf: '94% Facial Recognition' },
              { date: '20 Aug 2025', time: '10:30 AM', status: 'Present', subject: 'Biology (Room 203)', conf: '99% Biometric' },
              { date: '19 Aug 2025', time: '10:31 AM', status: 'Absent', subject: 'History (Room 110)', conf: 'Not present in room' }
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 font-mono">
                  <span className="text-slate-400">{item.date}</span>
                  <span className="text-slate-300">{item.time}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status.includes('Present') ? 'bg-emerald-500/20 text-emerald-300' :
                    item.status.includes('Late') ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-white font-sans font-semibold">{item.subject}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{item.conf}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
