import React, { useState } from 'react';
import { 
  Calendar, Clock, BookOpen, Users, Plus, 
  MapPin, CheckCircle2, ChevronRight, Video, X
} from 'lucide-react';

export const TimetableManagerView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedYear, setSelectedYear] = useState('2nd Year');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [scheduleSlots, setScheduleSlots] = useState([
    {
      time: '09:00 AM - 10:00 AM',
      courseCode: 'CS101',
      courseName: 'Database Management Systems (DBMS)',
      room: 'Room 101',
      teacher: 'Dr. Meena',
      type: 'Regular Class',
      status: 'Completed',
      expectedStudents: 48,
      camera: 'CAM-001'
    },
    {
      time: '10:00 AM - 11:00 AM',
      courseCode: 'CS102',
      courseName: 'Operating Systems (OS)',
      room: 'Room 102',
      teacher: 'Prof. Sharma',
      type: 'Regular Class',
      status: 'Completed',
      expectedStudents: 45,
      camera: 'CAM-002'
    },
    {
      time: '01:00 PM - 02:00 PM',
      courseCode: 'CS201',
      courseName: 'Design & Analysis of Algorithms (DAA)',
      room: 'Room 201',
      teacher: 'Dr. Rajesh Iyer',
      type: 'Combined Class (Sec A + B)',
      status: 'In-Progress',
      expectedStudents: 90,
      camera: 'CAM-021'
    },
    {
      time: '02:00 PM - 03:00 PM',
      courseCode: 'CS202',
      courseName: 'Computer Networks (CN)',
      room: 'Room 202',
      teacher: 'Prof. Anjali Sen',
      type: 'Regular Class',
      status: 'Upcoming',
      expectedStudents: 52,
      camera: 'CAM-015'
    }
  ]);

  // New Class Form State
  const [newCourseName, setNewCourseName] = useState('Advanced Machine Learning');
  const [newCourseCode, setNewCourseCode] = useState('CS308');
  const [newTime, setNewTime] = useState('03:00 PM - 04:00 PM');
  const [newRoom, setNewRoom] = useState('Lecture Hall 101');
  const [newTeacher, setNewTeacher] = useState('Dr. Rajesh Iyer');
  const [newType, setNewType] = useState('Extra Class');
  const [newExpectedStudents, setNewExpectedStudents] = useState(50);

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
        <div className="flex items-center space-x-3 text-xs">
          <span className="font-semibold text-slate-400">Filter View:</span>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5"
          >
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <select 
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5"
          >
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Extra / Combined Class</span>
          </button>
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
                setScheduleSlots(prev => [
                  ...prev,
                  {
                    time: newTime,
                    courseCode: newCourseCode,
                    courseName: newCourseName,
                    room: newRoom,
                    teacher: newTeacher,
                    type: newType,
                    status: 'Scheduled',
                    expectedStudents: newExpectedStudents,
                    camera: 'CAM-021'
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
        {scheduleSlots.map((slot, idx) => (
          <div key={idx} className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4 hover:border-slate-700 transition-all">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[120px]">
                <Clock className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                <div className="font-mono text-xs text-white font-bold">{slot.time}</div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{slot.courseName}</span>
                  <span className="font-mono text-xs font-bold text-sky-400">({slot.courseCode})</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    slot.type.includes('Combined') ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                    slot.type.includes('Extra') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {slot.type}
                  </span>
                </div>

                <div className="text-xs text-slate-400 mt-1 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    {slot.room}
                  </span>
                  <span>Faculty: <strong className="text-slate-200">{slot.teacher}</strong></span>
                  <span className="flex items-center gap-1 font-mono text-slate-300">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    {slot.expectedStudents} Enrolled
                  </span>
                  <span className="flex items-center gap-1 font-mono text-slate-400">
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                    {slot.camera}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                slot.status === 'In-Progress' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' :
                slot.status === 'Completed' ? 'bg-slate-800 text-slate-300' :
                'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              }`}>
                {slot.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
