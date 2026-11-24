import React, { useState } from 'react';
import { 
  UserCheck2, GraduationCap, Video, CheckCircle2, AlertTriangle, 
  Clock, Plus, Users, Edit3, Send, Download, FileText, Check, 
  X, RefreshCw, Eye, Calendar, BookOpen, Layers
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { useAuth } from '../../context/AuthContext';

interface StudentMarks {
  rollNo: string;
  name: string;
  unitTest1: number;
  midterm: number;
  attendancePct: number;
}

export const TeacherDedicatedDashboard: React.FC = () => {
  const { attendanceRecords, markAttendance, exportAttendanceCSV } = useSecurity();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'classroom' | 'tests' | 'records'>('classroom');
  
  // Class state
  const [classType, setClassType] = useState<'Regular Class' | 'Extra Class' | 'Combined Class' | 'Substitute'>('Regular Class');
  const [activeRoom, setActiveRoom] = useState('Lecture Hall 101 - CS301');
  const [isAttendanceFinalized, setIsAttendanceFinalized] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('CS301 - Computer Vision & AI');

  // Test Marks State & Modal
  const [marksData, setMarksData] = useState<StudentMarks[]>([
    { rollNo: '22CS001', name: 'Aarya Sharma', unitTest1: 23, midterm: 46, attendancePct: 92 },
    { rollNo: '22CS002', name: 'Rohan Mehta', unitTest1: 21, midterm: 42, attendancePct: 86 },
    { rollNo: '22CS003', name: 'Neha Singh', unitTest1: 18, midterm: 34, attendancePct: 76 }
  ]);
  const [isAddMarksModalOpen, setIsAddMarksModalOpen] = useState(false);
  const [newRollNo, setNewRollNo] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newUnitTest1, setNewUnitTest1] = useState(20);
  const [newMidterm, setNewMidterm] = useState(40);
  const [editingRollNo, setEditingRollNo] = useState<string | null>(null);

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
            { id: 'records', label: 'Session Attendance Log' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
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
                setNewUnitTest1(20);
                setNewMidterm(40);
                setIsAddMarksModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              Add / Enter Test Marks
            </button>
          </div>

          {/* Add / Edit Marks Modal */}
          {isAddMarksModalOpen && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">
                  {editingRollNo ? `Edit Marks for ${editingRollNo}` : 'Enter New Student Test Marks'}
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
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
                  <label className="block text-slate-400 mb-1 font-semibold">Unit Test 1 (Max 25)</label>
                  <input
                    type="number"
                    max={25}
                    min={0}
                    value={newUnitTest1}
                    onChange={(e) => setNewUnitTest1(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-emerald-400 font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Midterm (Max 50)</label>
                  <input
                    type="number"
                    max={50}
                    min={0}
                    value={newMidterm}
                    onChange={(e) => setNewMidterm(Number(e.target.value))}
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
                    setMarksData(prev => {
                      const exists = prev.findIndex(m => m.rollNo === newRollNo);
                      if (exists >= 0) {
                        const copy = [...prev];
                        copy[exists] = {
                          ...copy[exists],
                          name: newStudentName,
                          unitTest1: newUnitTest1,
                          midterm: newMidterm
                        };
                        return copy;
                      } else {
                        return [...prev, {
                          rollNo: newRollNo,
                          name: newStudentName,
                          unitTest1: newUnitTest1,
                          midterm: newMidterm,
                          attendancePct: 85
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
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Unit Test 1 (25)</th>
                  <th className="py-2.5 px-3">Midterm (50)</th>
                  <th className="py-2.5 px-3">Attendance %</th>
                  <th className="py-2.5 px-3">Eligibility</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {marksData.map((item) => (
                  <tr key={item.rollNo} className="hover:bg-slate-900/60">
                    <td className="py-2.5 px-3 text-slate-400">{item.rollNo}</td>
                    <td className="py-2.5 px-3 font-bold text-white font-sans">{item.name}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">{item.unitTest1}/25</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">{item.midterm}/50</td>
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
                          setNewUnitTest1(item.unitTest1);
                          setNewMidterm(item.midterm);
                          setIsAddMarksModalOpen(true);
                        }}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans font-semibold inline-flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </div>
  );
};
