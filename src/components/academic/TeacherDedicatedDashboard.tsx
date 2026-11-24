import React, { useState } from 'react';
import { 
  UserCheck2, GraduationCap, Video, CheckCircle2, AlertTriangle, 
  Clock, Plus, Users, Edit3, Send, Download, FileText, Check, 
  X, RefreshCw, Eye, Calendar, BookOpen, Layers, Award, BarChart3,
  Mail, Phone, ShieldCheck
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { useAuth } from '../../context/AuthContext';

interface StudentExamMark {
  examName: string;
  marks: number;
  maxMarks: number;
}

interface StudentMarks {
  rollNo: string;
  name: string;
  email?: string;
  phone?: string;
  department?: string;
  semester?: string;
  attendancePct: number;
  exams: Record<string, { marks: number; maxMarks: number }>;
}

export const TeacherDedicatedDashboard: React.FC = () => {
  const { attendanceRecords, markAttendance, exportAttendanceCSV, approvalRequests, updateApprovalRequestStatus } = useSecurity();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'classroom' | 'tests' | 'records' | 'approvals'>('classroom');
  
  // Class state
  const [classType, setClassType] = useState<'Regular Class' | 'Extra Class' | 'Combined Class' | 'Substitute'>('Regular Class');
  const [activeRoom, setActiveRoom] = useState('Lecture Hall 101 - CS301');
  const [isAttendanceFinalized, setIsAttendanceFinalized] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('CS301 - Computer Vision & AI');

  // Exam Selection for table view
  const availableExams = [
    { id: 'unitTest1', name: 'Unit Test 1', maxMarks: 25 },
    { id: 'unitTest2', name: 'Unit Test 2', maxMarks: 25 },
    { id: 'midterm', name: 'Midterm Exam', maxMarks: 50 },
    { id: 'practical', name: 'Lab Practical & Viva', maxMarks: 30 },
    { id: 'semesterFinal', name: 'End Semester Exam', maxMarks: 100 }
  ];
  const [selectedExamId, setSelectedExamId] = useState<string>('unitTest1');

  // Test Marks State with persistent storage sync
  const [marksData, setMarksData] = useState<StudentMarks[]>(() => {
    try {
      const stored = localStorage.getItem('eagle_eye_student_marks');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [
      { 
        rollNo: '22CS001', 
        name: 'Aarya Sharma', 
        email: 'aarya.sharma@campus.edu',
        phone: '+91 98765 43210',
        department: 'Computer Science & Engineering',
        semester: 'Semester 5',
        attendancePct: 92,
        exams: {
          unitTest1: { marks: 23, maxMarks: 25 },
          unitTest2: { marks: 24, maxMarks: 25 },
          midterm: { marks: 46, maxMarks: 50 },
          practical: { marks: 28, maxMarks: 30 },
          semesterFinal: { marks: 91, maxMarks: 100 }
        }
      },
      { 
        rollNo: '22CS002', 
        name: 'Rohan Mehta', 
        email: 'rohan.mehta@campus.edu',
        phone: '+91 98112 23344',
        department: 'Computer Science & Engineering',
        semester: 'Semester 5',
        attendancePct: 86,
        exams: {
          unitTest1: { marks: 21, maxMarks: 25 },
          unitTest2: { marks: 19, maxMarks: 25 },
          midterm: { marks: 42, maxMarks: 50 },
          practical: { marks: 26, maxMarks: 30 },
          semesterFinal: { marks: 84, maxMarks: 100 }
        }
      },
      { 
        rollNo: '22CS003', 
        name: 'Neha Singh', 
        email: 'neha.singh@campus.edu',
        phone: '+91 98445 56677',
        department: 'Computer Science & Engineering',
        semester: 'Semester 5',
        attendancePct: 76,
        exams: {
          unitTest1: { marks: 18, maxMarks: 25 },
          unitTest2: { marks: 17, maxMarks: 25 },
          midterm: { marks: 34, maxMarks: 50 },
          practical: { marks: 22, maxMarks: 30 },
          semesterFinal: { marks: 71, maxMarks: 100 }
        }
      }
    ];
  });

  const saveMarksState = (updater: (prev: StudentMarks[]) => StudentMarks[]) => {
    setMarksData(prev => {
      const updated = updater(prev);
      try {
        localStorage.setItem('eagle_eye_student_marks', JSON.stringify(updated));
        // Broadcast marks upload across tabs and portals
        fetch('https://ntfy.sh/eagle_eye_approval_queue_98234', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'MARKS_UPDATED',
            timestamp: Date.now()
          })
        }).catch(() => {});
      } catch (e) {}
      return updated;
    });
  };

  // Modal states
  const [isAddMarksModalOpen, setIsAddMarksModalOpen] = useState(false);
  const [modalExamId, setModalExamId] = useState<string>('unitTest1');
  const [newRollNo, setNewRollNo] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [inputMarks, setInputMarks] = useState<number>(20);
  const [editingRollNo, setEditingRollNo] = useState<string | null>(null);

  // Student Profile Drawer / Modal
  const [viewingStudent, setViewingStudent] = useState<StudentMarks | null>(null);

  // Student Draft list for current class session
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
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, decision: `Teacher Marked: ${newStatus}` } : s));
  };

  const handleFinalize = () => {
    setIsAttendanceFinalized(true);
    students.forEach(s => {
      markAttendance(s.rollNo, (s.status === 'Verified' || s.status === 'Present') ? 'Verified' : 'Absent', `Marked by ${user?.full_name || 'Teacher'}`, selectedSubject, activeRoom);
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner for Teacher */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-600/20">
            <UserCheck2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl font-black text-white tracking-wide">
                Faculty Classroom Roll Call & Attendance Portal
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                TEACHER DASHBOARD
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as: <strong className="text-slate-200">{user?.full_name || 'Prof. Anjali Sen'}</strong> • Department of Computer Science & Engineering
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          {[
            { id: 'classroom', label: 'Live Roll Call' },
            { id: 'tests', label: 'Internal Test Marks' },
            { id: 'records', label: 'Session Attendance Log' },
            { 
              id: 'approvals', 
              label: 'Student Approvals',
              badge: approvalRequests.filter(r => r.status === 'Pending').length
            }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Classroom Active Banner & Controls */}
      {activeTab === 'classroom' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">Active Subject</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-bold focus:outline-none"
                >
                  <option value="CS301 - Computer Vision & AI">CS301 - Computer Vision & AI</option>
                  <option value="CS302 - Database Systems">CS302 - Database Systems</option>
                  <option value="CS305 - Data Structures & Algorithms">CS305 - Data Structures & Algorithms</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">Classroom</span>
                <input
                  type="text"
                  value={activeRoom}
                  onChange={(e) => setActiveRoom(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block font-semibold">Session Type</span>
                <select
                  value={classType}
                  onChange={(e) => setClassType(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Regular Class">Regular Class</option>
                  <option value="Extra Class">Extra Class</option>
                  <option value="Combined Class">Combined Class</option>
                  <option value="Substitute">Substitute Class</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {isAttendanceFinalized ? (
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Attendance Finalized & Submitted</span>
                </div>
              ) : (
                <button
                  onClick={handleFinalize}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-4 h-4" />
                  Finalize & Lock Roster
                </button>
              )}
            </div>
          </div>

          {/* Student Roll Call Matrix */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  Real-Time AI Optical Roll Call
                </h3>
                <p className="text-xs text-slate-400">Classroom camera detected students with facial match score</p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {students.filter(s => s.status === 'Verified').length} Present
                </span>
                <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {students.filter(s => s.status === 'Needs Review').length} Review
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{student.name}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {student.rollNo}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          {student.confidence} Match
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {student.details} • Outfit: <span className="text-slate-300">{student.clothing}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(student.id, 'Verified')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        student.status === 'Verified'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(student.id, 'Absent')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        student.status === 'Absent'
                          ? 'bg-red-600 text-white shadow-sm shadow-red-600/30'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(student.id, 'Excused')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        student.status === 'Excused'
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Excused
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Internal Test Marks Tab */}
      {activeTab === 'tests' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Class Internal Test Assessment & Marks Upload
              </h3>
              <p className="text-xs text-slate-400">Manage midterms, quizzes, and continuous evaluation records</p>
            </div>
            <button 
              onClick={() => {
                setEditingRollNo(null);
                setNewRollNo('');
                setNewStudentName('');
                setModalExamId(selectedExamId);
                setInputMarks(20);
                setIsAddMarksModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              Add / Enter Test Marks
            </button>
          </div>

          {/* Exam Selector Bar & Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Assessment Exam:</span>
              <div className="flex flex-wrap gap-1.5">
                {availableExams.map(exam => {
                  const isCurrent = selectedExamId === exam.id;
                  return (
                    <button
                      key={exam.id}
                      onClick={() => setSelectedExamId(exam.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      {exam.name}
                      <span className="text-[10px] opacity-75 font-mono">({exam.maxMarks})</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Active Evaluation: <span className="text-emerald-400 font-bold">{availableExams.find(e => e.id === selectedExamId)?.name}</span> (Max Marks: {availableExams.find(e => e.id === selectedExamId)?.maxMarks})
            </div>
          </div>

          {/* Add / Edit Marks Modal */}
          {isAddMarksModalOpen && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4" />
                  {editingRollNo ? `Edit Marks for ${editingRollNo} (${newStudentName})` : 'Enter New Student Test Marks'}
                </span>
                <button 
                  onClick={() => setIsAddMarksModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Roll No</label>
                  <input
                    type="text"
                    placeholder="e.g. 22CS005"
                    disabled={!!editingRollNo}
                    value={newRollNo}
                    onChange={(e) => setNewRollNo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Student Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ankit Verma"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Target Exam</label>
                  <select
                    value={modalExamId}
                    onChange={(e) => {
                      setModalExamId(e.target.value);
                      if (editingRollNo) {
                        const targetStudent = marksData.find(m => m.rollNo === editingRollNo);
                        const exMark = targetStudent?.exams?.[e.target.value]?.marks ?? 0;
                        setInputMarks(exMark);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  >
                    {availableExams.map(ex => (
                      <option key={ex.id} value={ex.id}>
                        {ex.name} (Max {ex.maxMarks})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">
                    Marks Obtained (Max {availableExams.find(e => e.id === modalExamId)?.maxMarks || 25})
                  </label>
                  <input
                    type="number"
                    max={availableExams.find(e => e.id === modalExamId)?.maxMarks || 100}
                    min={0}
                    value={inputMarks}
                    onChange={(e) => setInputMarks(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-emerald-400 font-bold font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setIsAddMarksModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newRollNo || !newStudentName) return;
                    const maxAllowed = availableExams.find(e => e.id === modalExamId)?.maxMarks || 100;
                    const safeMarks = Math.min(Math.max(0, inputMarks), maxAllowed);

                    saveMarksState(prev => {
                      const exists = prev.findIndex(m => m.rollNo.toLowerCase() === newRollNo.toLowerCase());
                      if (exists >= 0) {
                        const copy = [...prev];
                        const currExams = copy[exists].exams || {};
                        copy[exists] = {
                          ...copy[exists],
                          name: newStudentName,
                          exams: {
                            ...currExams,
                            [modalExamId]: { marks: safeMarks, maxMarks: maxAllowed }
                          }
                        };
                        return copy;
                      } else {
                        return [...prev, {
                          rollNo: newRollNo,
                          name: newStudentName,
                          attendancePct: 85,
                          email: `${newRollNo.toLowerCase()}@campus.edu`,
                          department: 'Computer Science & Engineering',
                          semester: 'Semester 5',
                          exams: {
                            [modalExamId]: { marks: safeMarks, maxMarks: maxAllowed }
                          }
                        }];
                      }
                    });
                    setIsAddMarksModalOpen(false);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  Save Marks
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Roll No</th>
                  <th className="py-2.5 px-3">Student Name (Click for dossier)</th>
                  <th className="py-2.5 px-3">
                    {availableExams.find(e => e.id === selectedExamId)?.name} ({availableExams.find(e => e.id === selectedExamId)?.maxMarks})
                  </th>
                  <th className="py-2.5 px-3">All Exams Average</th>
                  <th className="py-2.5 px-3">Attendance %</th>
                  <th className="py-2.5 px-3">Eligibility</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {marksData.map((item) => {
                  const currExam = item.exams?.[selectedExamId];
                  const examMarks = currExam ? currExam.marks : 0;
                  const examMax = currExam ? currExam.maxMarks : (availableExams.find(e => e.id === selectedExamId)?.maxMarks || 25);
                  
                  // Compute overall average
                  const examKeys = Object.keys(item.exams || {});
                  const avgPercent = examKeys.length > 0 
                    ? Math.round(examKeys.reduce((acc, k) => acc + (item.exams[k].marks / item.exams[k].maxMarks) * 100, 0) / examKeys.length)
                    : 0;

                  return (
                    <tr key={item.rollNo} className="hover:bg-slate-900/60">
                      <td className="py-2.5 px-3 text-slate-400">{item.rollNo}</td>
                      <td className="py-2.5 px-3 font-sans">
                        <button
                          onClick={() => setViewingStudent(item)}
                          className="font-bold text-white hover:text-emerald-400 hover:underline flex items-center gap-1.5 transition-colors text-left"
                          title="Click to view complete student profile, marks breakdown & attendance"
                        >
                          <Eye className="w-3.5 h-3.5 text-emerald-400/80" />
                          {item.name}
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold font-mono">
                        {examMarks}/{examMax}
                        <span className="text-[10px] text-slate-500 font-sans ml-1">
                          ({Math.round((examMarks / examMax) * 100)}%)
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">
                        {avgPercent}%
                      </td>
                      <td className="py-2.5 px-3 text-sky-400">{item.attendancePct}%</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.attendancePct >= 75 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {item.attendancePct >= 75 ? 'Eligible' : 'Borderline'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingRollNo(item.rollNo);
                            setNewRollNo(item.rollNo);
                            setNewStudentName(item.name);
                            setModalExamId(selectedExamId);
                            setInputMarks(item.exams?.[selectedExamId]?.marks ?? 0);
                            setIsAddMarksModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-sans font-semibold inline-flex items-center gap-1 shadow-sm"
                        >
                          <Edit3 className="w-3 h-3 text-emerald-400" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Student Dossier Modal */}
          {viewingStudent && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95">
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-sky-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-600/30">
                      {viewingStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {viewingStudent.name}
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                          {viewingStudent.rollNo}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        {viewingStudent.department || 'Computer Science & Engineering'} • {viewingStudent.semester || 'Semester 5'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setViewingStudent(null)}
                    className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Contact & Bio cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Email Address</span>
                    <span className="font-mono text-slate-200 break-all">{viewingStudent.email || `${viewingStudent.rollNo.toLowerCase()}@campus.edu`}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Contact Phone</span>
                    <span className="font-mono text-slate-200">{viewingStudent.phone || '+91 98765 00000'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Attendance Status</span>
                    <span className={`font-bold font-mono ${viewingStudent.attendancePct >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {viewingStudent.attendancePct}% ({viewingStudent.attendancePct >= 75 ? 'Eligible' : 'Attendance Shortage'})
                    </span>
                  </div>
                </div>

                {/* Comprehensive Marks Breakdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      All Academic Exams & Marks Record
                    </h4>
                    <span className="text-xs font-mono text-slate-400">
                      Overall Average: <strong className="text-emerald-400">
                        {Math.round(
                          Object.keys(viewingStudent.exams || {}).reduce((acc, k) => acc + (viewingStudent.exams[k].marks / viewingStudent.exams[k].maxMarks) * 100, 0) /
                          Math.max(1, Object.keys(viewingStudent.exams || {}).length)
                        )}%
                      </strong>
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                        <tr>
                          <th className="py-2 px-3">Exam Name</th>
                          <th className="py-2 px-3">Max Marks</th>
                          <th className="py-2 px-3">Scored</th>
                          <th className="py-2 px-3">Percentage</th>
                          <th className="py-2 px-3">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono bg-slate-950/40">
                        {availableExams.map(ex => {
                          const record = viewingStudent.exams?.[ex.id];
                          const score = record ? record.marks : 0;
                          const maxM = record ? record.maxMarks : ex.maxMarks;
                          const pct = Math.round((score / maxM) * 100);
                          let grade = 'F';
                          if (pct >= 90) grade = 'O (Outstanding)';
                          else if (pct >= 80) grade = 'A+ (Excellent)';
                          else if (pct >= 70) grade = 'A (Very Good)';
                          else if (pct >= 60) grade = 'B+ (Good)';
                          else if (pct >= 50) grade = 'B (Above Average)';
                          else if (pct >= 40) grade = 'C (Pass)';

                          return (
                            <tr key={ex.id} className="hover:bg-slate-800/40">
                              <td className="py-2 px-3 text-slate-200 font-sans font-medium">{ex.name}</td>
                              <td className="py-2 px-3 text-slate-400">{maxM}</td>
                              <td className="py-2 px-3 text-emerald-400 font-bold">{score}</td>
                              <td className="py-2 px-3 text-purple-400 font-bold">{pct}%</td>
                              <td className="py-2 px-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  pct >= 75 ? 'bg-emerald-500/20 text-emerald-400' : pct >= 50 ? 'bg-sky-500/20 text-sky-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {grade}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick actions in Dossier */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      const st = viewingStudent;
                      setViewingStudent(null);
                      setEditingRollNo(st.rollNo);
                      setNewRollNo(st.rollNo);
                      setNewStudentName(st.name);
                      setModalExamId(selectedExamId);
                      setInputMarks(st.exams?.[selectedExamId]?.marks ?? 0);
                      setIsAddMarksModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                    Edit Marks for this Student
                  </button>
                  <button
                    onClick={() => setViewingStudent(null)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/30"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Session Records Tab */}
      {activeTab === 'records' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Your Recent Class Attendance Logs
              </h3>
              <p className="text-xs text-slate-400">History of attendance finalized by your faculty account</p>
            </div>
            <button 
              onClick={() => exportAttendanceCSV(selectedSubject)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-all flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              Download Excel/CSV
            </button>
          </div>

          <div className="space-y-3">
            {attendanceRecords.slice(0, 5).map(rec => (
              <div key={rec.id} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white">{rec.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono ml-2">({rec.student_id || rec.person_id})</span>
                  <div className="text-[11px] text-slate-400">{rec.course || selectedSubject} • {rec.room}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400">{rec.status}</span>
                  <div className="text-[10px] text-slate-400 font-mono">{rec.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Student Registration Approvals Tab */}
      {activeTab === 'approvals' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Faculty Student Onboarding & Clearance Approvals
              </h2>
              <p className="text-xs text-slate-400">
                Review new student registration profiles and identity credentials. Approving immediately unlocks their login.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {approvalRequests.filter(r => r.status === 'Pending').length} Pending Requests
            </div>
          </div>

          <div className="space-y-4">
            {approvalRequests.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No approval requests currently in queue.</div>
            ) : (
              approvalRequests.map(req => (
                <div key={req.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex -space-x-2">
                      {req.photos && req.photos.map((photo, pIdx) => (
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
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                          {req.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {req.branch} • {req.year} ({req.semester}) • Sec: {req.section} • Submitted {req.submittedAt}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Email: {req.email} • Mobile: {req.mobile}
                      </div>
                      {req.reason && (
                        <div className="text-xs text-slate-300 mt-1 italic">
                          "{req.reason}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => updateApprovalRequestStatus(req.id, 'Approved')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve Student
                        </button>
                        <button
                          onClick={() => updateApprovalRequestStatus(req.id, 'Rejected')}
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
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
