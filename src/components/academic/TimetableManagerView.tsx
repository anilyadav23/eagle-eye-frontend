import React, { useState } from 'react';
import { 
  Calendar, Clock, BookOpen, Users, Plus, 
  MapPin, CheckCircle2, ChevronRight, Video, X,
  Trash2, Edit3, Save, AlertCircle, Layers, CheckSquare, Square
} from 'lucide-react';
import { 
  OFFICIAL_TIMETABLES, 
  getTimetableSlots, 
  TimetablePeriod, 
  saveCustomTimetableSlot, 
  deleteCustomTimetableSlot 
} from '../../data/timetableCatalog';
import { getBranchSubjects, SubjectItem } from '../../data/syllabusCatalog';

export const TimetableManagerView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedBranch, setSelectedBranch] = useState('Electronics & Computer Control (ECC)');
  const [selectedYear, setSelectedYear] = useState('4th Year');
  const [selectedSemester, setSelectedSemester] = useState('7th Semester');
  const [selectedSection, setSelectedSection] = useState('All');

  // Modal State for Adding / Editing Class Schedule
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);

  // Form Fields
  const [formSubjectName, setFormSubjectName] = useState('Computer Communication & Data Networks (CCDN)');
  const [formSubjectCode, setFormSubjectCode] = useState('7ECC41A');
  const [formBranch, setFormBranch] = useState('Electronics & Computer Control (ECC)');
  const [formSemester, setFormSemester] = useState('7th Semester');
  const [formYear, setFormYear] = useState('4th Year');
  const [formDay, setFormDay] = useState('Monday');
  const [formPeriodNumber, setFormPeriodNumber] = useState(1);
  const [formTimeSlot, setFormTimeSlot] = useState('10:00 - 10:55 AM');
  const [formRoom, setFormRoom] = useState('Room EC-6');
  const [formFacultyName, setFormFacultyName] = useState('Lata Vaishnav');
  const [formFacultyCode, setFormFacultyCode] = useState('LTV');
  const [formType, setFormType] = useState<'Theory' | 'Lab' | 'Project' | 'Seminar'>('Theory');
  const [formSections, setFormSections] = useState<string[]>(['Section A']);
  const [formDurationType, setFormDurationType] = useState<'Permanent for Semester' | 'Temporary for Fixed Days'>('Permanent for Semester');
  const [formDurationDays, setFormDurationDays] = useState('7 Days');

  // Multi-section toggle helper
  const toggleSection = (sec: string) => {
    setFormSections(prev => 
      prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]
    );
  };

  // Pre-fill form when editing an existing slot
  const handleOpenEdit = (slot: TimetablePeriod) => {
    setEditingSlotId(slot.id || `slot-${Date.now()}`);
    setFormSubjectName(slot.subjectName);
    setFormSubjectCode(slot.subjectCode);
    setFormBranch(slot.branch || selectedBranch);
    setFormSemester(slot.semester || selectedSemester);
    setFormYear(selectedYear);
    setFormDay(slot.day || selectedDay);
    setFormPeriodNumber(slot.periodNumber || 1);
    setFormTimeSlot(slot.timeSlot);
    setFormRoom(slot.room);
    setFormFacultyName(slot.facultyName);
    setFormFacultyCode(slot.facultyCode || 'FAC');
    setFormType(slot.type || 'Theory');
    setFormSections(slot.sections || ['Section A']);
    setFormDurationType(slot.scheduleDurationType || 'Permanent for Semester');
    setFormDurationDays(slot.durationDays || '7 Days');
    setIsModalOpen(true);
  };

  // Reset form for adding new class schedule
  const handleOpenAdd = () => {
    setEditingSlotId(null);
    setFormSubjectName('Computer Communication & Data Networks (CCDN)');
    setFormSubjectCode('7ECC41A');
    setFormBranch(selectedBranch);
    setFormSemester(selectedSemester);
    setFormYear(selectedYear);
    setFormDay(selectedDay);
    setFormPeriodNumber(activeSlots.length + 1);
    setFormTimeSlot('10:00 - 10:55 AM');
    setFormRoom('Room EC-6');
    setFormFacultyName('Lata Vaishnav');
    setFormFacultyCode('LTV');
    setFormType('Theory');
    setFormSections(['Section A', 'Section B']);
    setFormDurationType('Permanent for Semester');
    setFormDurationDays('7 Days');
    setIsModalOpen(true);
  };

  // Submit Save
  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimetablePeriod = {
      id: editingSlotId || `custom-slot-${Date.now()}`,
      periodNumber: Number(formPeriodNumber) || 1,
      timeSlot: formTimeSlot,
      subjectCode: formSubjectCode,
      subjectName: formSubjectName,
      room: formRoom,
      facultyName: formFacultyName,
      facultyCode: formFacultyCode,
      type: formType,
      scheduleDurationType: formDurationType,
      durationDays: formDurationType === 'Temporary for Fixed Days' ? formDurationDays : undefined,
      branch: formBranch,
      semester: formSemester,
      sections: formSections.length > 0 ? formSections : ['Section A'],
      day: formDay
    };

    saveCustomTimetableSlot(newSlot);
    setIsModalOpen(false);
  };

  const handleDeleteSlot = (id?: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this schedule period from the timetable?')) {
      deleteCustomTimetableSlot(id);
    }
  };

  // Available subjects for selected branch and semester
  const availableBranchSubjects: SubjectItem[] = getBranchSubjects(selectedBranch, selectedSemester);

  const activeSlots: TimetablePeriod[] = getTimetableSlots(selectedBranch, selectedSemester, selectedDay);

  return (
    <div className="space-y-6">
      {/* Timetable Header */}
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
            <p className="text-xs text-slate-400 mt-0.5">
              Defines active classrooms, loads enrolled rosters automatically, and drives the AI face verification window.
            </p>
          </div>
        </div>

        {/* Days of the Week Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                selectedDay === d
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {d.slice(0, 3)}
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
            <option value="8th Semester">8th Semester</option>
            <option value="6th Semester">6th Semester</option>
            <option value="4th Semester">4th Semester</option>
          </select>

          <select 
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5"
          >
            <option value="All">All Sections (A + B)</option>
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Class Schedule</span>
          </button>
        </div>
      </div>

      {/* Timetable Schedule Cards */}
      <div className="space-y-3">
        {activeSlots.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
            No classes scheduled for {selectedDay}. Click "Create New Class Schedule" above to add one.
          </div>
        ) : (
          activeSlots.map((slot, idx) => (
            <div key={slot.id || idx} className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4 hover:border-slate-700 transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center min-w-[130px]">
                  <Clock className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                  <div className="font-mono text-xs text-white font-bold">{slot.timeSlot}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Period {slot.periodNumber}</div>
                </div>

                <div className="space-y-1">
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
                    {slot.scheduleDurationType && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                        slot.scheduleDurationType === 'Permanent for Semester'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}>
                        {slot.scheduleDurationType} {slot.durationDays ? `(${slot.durationDays})` : ''}
                      </span>
                    )}
                    {slot.sections && slot.sections.length > 0 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold">
                        {slot.sections.join(' + ')}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      {slot.room}
                    </span>
                    <span>Faculty: <strong className="text-slate-200">{slot.facultyName}</strong> ({slot.facultyCode})</span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <Video className="w-3.5 h-3.5 text-emerald-400" />
                      CAM-{slot.room.replace(/[^0-9]/g, '').padStart(3, '0') || '006'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(slot)}
                  title="Edit this Class Schedule"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 border border-slate-700"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteSlot(slot.id)}
                  title="Delete from Timetable"
                  className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-700/50 text-red-400 hover:text-red-200 text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Create or Edit Timetable Class Schedule */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-400" />
                  {editingSlotId ? 'Edit Class Schedule' : 'Create New Class Schedule'}
                </h3>
                <p className="text-xs text-slate-400">
                  Configure branch, multi-sections, timing, faculty, and semester duration
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-4 text-xs">
              {/* Branch & Semester Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Branch</label>
                  <select
                    value={formBranch}
                    onChange={(e) => setFormBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    <option value="Electronics & Computer Control (ECC)">Electronics & Computer Control (ECC)</option>
                    <option value="Electronics & Communication Engineering (ECE)">Electronics & Communication (ECE)</option>
                    <option value="Electrical & Electronics Engineering (EEE)">Electrical & Electronics (EEE)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Semester</label>
                  <select
                    value={formSemester}
                    onChange={(e) => setFormSemester(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Day of Week</label>
                  <select
                    value={formDay}
                    onChange={(e) => setFormDay(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject Selection or Manual Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Select Subject</label>
                  <select
                    value={formSubjectCode}
                    onChange={(e) => {
                      const found = availableBranchSubjects.find((s: SubjectItem) => s.code === e.target.value);
                      if (found) {
                        setFormSubjectCode(found.code);
                        setFormSubjectName(found.name);
                        setFormType(found.type === 'Practical / Sessional' ? 'Lab' : 'Theory');
                      } else {
                        setFormSubjectCode(e.target.value);
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    {availableBranchSubjects.map((sub: SubjectItem) => (
                      <option key={sub.code} value={sub.code}>
                        {sub.code} - {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Course Name Display</label>
                  <input
                    type="text"
                    required
                    value={formSubjectName}
                    onChange={(e) => setFormSubjectName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Multi-Section Selector */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Select Section(s) (can select more than 1 section together)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {['Section A', 'Section B', 'Section C'].map(sec => {
                    const isSelected = formSections.includes(sec);
                    return (
                      <button
                        type="button"
                        key={sec}
                        onClick={() => toggleSection(sec)}
                        className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-sky-500/20 border-sky-500 text-sky-300 ring-1 ring-sky-500/50'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {isSelected ? <CheckSquare className="w-4 h-4 text-sky-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                        <span>{sec}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timing & Period */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Period Number</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formPeriodNumber}
                    onChange={(e) => setFormPeriodNumber(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time Slot (e.g. 10:00 - 10:55 AM)</label>
                  <input
                    type="text"
                    required
                    value={formTimeSlot}
                    onChange={(e) => setFormTimeSlot(e.target.value)}
                    placeholder="10:00 - 10:55 AM"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assigned Room / Place</label>
                  <input
                    type="text"
                    required
                    value={formRoom}
                    onChange={(e) => setFormRoom(e.target.value)}
                    placeholder="e.g. Room EC-6 / Lab EC-11"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              {/* Faculty & Session Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Faculty Teacher Name</label>
                  <input
                    type="text"
                    required
                    value={formFacultyName}
                    onChange={(e) => setFormFacultyName(e.target.value)}
                    placeholder="e.g. Lata Vaishnav"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Faculty Code</label>
                  <input
                    type="text"
                    value={formFacultyCode}
                    onChange={(e) => setFormFacultyCode(e.target.value)}
                    placeholder="e.g. LTV / KPC"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Class Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Theory">Theory</option>
                    <option value="Lab">Lab / Practical</option>
                    <option value="Project">Minor Project</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>
              </div>

              {/* Schedule Duration Type (Permanent vs Temporary) */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-slate-300 font-semibold">
                  Schedule Duration Type:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                    formDurationType === 'Permanent for Semester'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                      : 'border-slate-800 text-slate-400'
                  }`}>
                    <input
                      type="radio"
                      name="durationType"
                      checked={formDurationType === 'Permanent for Semester'}
                      onChange={() => setFormDurationType('Permanent for Semester')}
                      className="accent-emerald-500"
                    />
                    <div>
                      <div className="font-bold text-white">Permanent for Semester</div>
                      <div className="text-[11px] text-slate-400">Regular weekly recurring schedule across the semester</div>
                    </div>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all ${
                    formDurationType === 'Temporary for Fixed Days'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'border-slate-800 text-slate-400'
                  }`}>
                    <input
                      type="radio"
                      name="durationType"
                      checked={formDurationType === 'Temporary for Fixed Days'}
                      onChange={() => setFormDurationType('Temporary for Fixed Days')}
                      className="accent-amber-500"
                    />
                    <div>
                      <div className="font-bold text-white">Temporary for Fixed Days</div>
                      <div className="text-[11px] text-slate-400">Extra / Remedial session valid for a temporary period</div>
                    </div>
                  </label>
                </div>

                {formDurationType === 'Temporary for Fixed Days' && (
                  <div className="pt-2">
                    <label className="block text-slate-400 mb-1">Specify Fixed Duration / Dates</label>
                    <input
                      type="text"
                      value={formDurationDays}
                      onChange={(e) => setFormDurationDays(e.target.value)}
                      placeholder="e.g. 7 Days, or Valid until 10 Dec 2026"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/25"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingSlotId ? 'Save Schedule Changes' : 'Confirm & Publish Class'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
