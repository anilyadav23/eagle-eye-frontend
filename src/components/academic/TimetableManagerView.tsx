import React, { useState } from 'react';
import { 
  Calendar, Clock, BookOpen, Users, Plus, 
  MapPin, CheckCircle2, ChevronRight, Video, X
} from 'lucide-react';
import { OFFICIAL_TIMETABLES, getTimetableSlots, TimetablePeriod } from '../../data/timetableCatalog';

export const TimetableManagerView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedBranch, setSelectedBranch] = useState('Electronics & Computer Control (ECC)');
  const [selectedYear, setSelectedYear] = useState('4th Year');
  const [selectedSemester, setSelectedSemester] = useState('7th Semester');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Class Form State
  const [newCourseName, setNewCourseName] = useState('Computer Communication & Data Networks');
  const [newCourseCode, setNewCourseCode] = useState('7ECC41A');
  const [newTime, setNewTime] = useState('10:00 AM - 10:55 AM');
  const [newRoom, setNewRoom] = useState('Room EC-6');
  const [newTeacher, setNewTeacher] = useState('Lata Vaishnav (LTV)');
  const [newType, setNewType] = useState('Theory');
  const [newExpectedStudents, setNewExpectedStudents] = useState(48);

  const [extraSlots, setExtraSlots] = useState<TimetablePeriod[]>([]);

  const defaultSlots: TimetablePeriod[] = getTimetableSlots(selectedBranch, selectedSemester, selectedDay);
  const activeSlots: TimetablePeriod[] = [...defaultSlots, ...extraSlots];

  return (
    <div className="space-y-6">
      {/* Timetable Header (Page 2, 3, 7) */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Department Timetable & Class Roster Hub</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                Automated Class Linking
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Defines active classrooms, loads enrolled rosters automatically, and drives the AI face verification window.
            </p>
          </div>
        </div>

        {/* Day Selectors */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedDay === day ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Ribbon & Actions */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold text-slate-400">Filter View:</span>
          
          <select 
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 font-mono"
          >
            <option value="Electronics & Computer Control (ECC)">Electronics & Computer Control (ECC)</option>
            <option value="Electronics & Communication Engineering (ECE)">Electronics & Communication (ECE)</option>
            <option value="Electrical & Electronics Engineering (EEE)">Electrical & Electronics (EEE)</option>
          </select>

          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5"
          >
            <option value="4th Year">4th Year (B.E. IV Year)</option>
            <option value="3rd Year">3rd Year (B.E. III Year)</option>
            <option value="2nd Year">2nd Year (B.E. II Year)</option>
          </select>

          <select 
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5"
          >
            <option value="7th Semester">7th Semester (Odd 2026-27)</option>
            <option value="5th Semester">5th Semester</option>
            <option value="3rd Semester">3rd Semester</option>
          </select>

          <select 
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5"
          >
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-xl border border-sky-500/30">
            W.E.F. 01.08.2026 • Room EC-6 / EC-11 / L-5
          </span>
        </div>
      </div>

      {/* Add Extra / Combined Class Modal */}
      {isAddModalOpen && (
        <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400">Add Extra / Combined Class Session</span>
            <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Course Name</label>
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Course Code</label>
              <input
                type="text"
                value={newCourseCode}
                onChange={(e) => setNewCourseCode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Time Slot</label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Assigned Room</label>
              <input
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Faculty / Teacher</label>
              <input
                type="text"
                value={newTeacher}
                onChange={(e) => setNewTeacher(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Session Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              >
                <option value="Extra Class">Extra Class</option>
                <option value="Combined Class (Sec A + B)">Combined Class (Sec A + B)</option>
                <option value="Remedial / Revision Session">Remedial / Revision Session</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setExtraSlots(prev => [
                  ...prev,
                  {
                    periodNumber: defaultSlots.length + prev.length + 1,
                    timeSlot: newTime,
                    subjectCode: newCourseCode,
                    subjectName: newCourseName,
                    room: newRoom,
                    facultyName: newTeacher,
                    facultyCode: 'FAC',
                    type: newType.includes('Lab') ? 'Lab' : newType.includes('Project') ? 'Project' : 'Theory'
                  }
                ]);
                setIsAddModalOpen(false);
              }}
              className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow"
            >
              Add to Timetable
            </button>
          </div>
        </div>
      )}

      {/* Timetable Schedule Cards (Page 3 & 7) */}
      <div className="space-y-3">
        {activeSlots.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
            No classes scheduled for {selectedDay}.
          </div>
        ) : (
          activeSlots.map((slot, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4 hover:border-slate-700 transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[130px]">
                  <Clock className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                  <div className="font-mono text-xs text-white font-bold">{slot.timeSlot}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Period {slot.periodNumber}</div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{slot.subjectName}</span>
                    <span className="font-mono text-xs font-bold text-sky-400">({slot.subjectCode})</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      slot.type === 'Lab' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                      slot.type === 'Project' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {slot.type}
                    </span>
                    {slot.batch && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                        {slot.batch}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {slot.room}
                    </span>
                    <span>Faculty: <strong className="text-slate-200">{slot.facultyName}</strong> ({slot.facultyCode})</span>
                    <span className="flex items-center gap-1 font-mono text-slate-300">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      {newExpectedStudents} Enrolled
                    </span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Video className="w-3.5 h-3.5 text-emerald-400" />
                      CAM-{slot.room.replace(/[^0-9]/g, '').padStart(3, '0') || '006'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  idx === 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {idx === 0 ? 'In-Progress' : 'Scheduled'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
