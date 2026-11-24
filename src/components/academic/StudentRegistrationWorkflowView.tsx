import React, { useState } from 'react';
import { 
  UserPlus, Upload, CheckCircle2, AlertCircle, 
  Camera, FileText, Send, Check, ShieldCheck 
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const StudentRegistrationWorkflowView: React.FC = () => {
  const { submitApprovalRequest } = useSecurity();
  const [name, setName] = useState('Arjun Kumar');
  const [mobile, setMobile] = useState('9876543210');
  const [email, setEmail] = useState('arjun.kumar@campus.edu');
  const [branch, setBranch] = useState('Electronics & Communication');
  const [year, setYear] = useState('2nd Year');
  const [semester, setSemester] = useState('3rd Semester');
  const [section, setSection] = useState('A');
  const [rollNo, setRollNo] = useState('EC23A001');
  const [registrationNo, setRegistrationNo] = useState('REG2025001');
  const [gender, setGender] = useState('Male');

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApprovalRequest({
      id: `REG-REQ-${Date.now()}`,
      studentName: name,
      rollNo: rollNo,
      regNo: registrationNo,
      branch: branch,
      year: year,
      semester: semester,
      section: section,
      email: email,
      mobile: mobile,
      photos: uploadedPhotos,
      type: 'New Student Admission & Biometric Clearance',
      reason: `Admissions clearance submission for ${name} (${rollNo})`
    });
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner (Page 4) */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Student Registration & Enrollment Workflow</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold">
                Smart Onboarding with Approval Workflow
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Self-registration + controlled teacher/HOD verification = Scalable, secure student biometric onboarding.
            </p>
          </div>
        </div>

        {/* Workflow Steps Indicator */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-sky-500 text-white font-bold">1. Self Register</span>
          <span className="text-slate-500">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">2. Teacher / HOD Verifies</span>
          <span className="text-slate-500">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">3. Profile Activated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Form (Page 4) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Student Self-Registration Form</h3>
              <span className="text-xs text-slate-400 font-mono">Simple, Complete and Easy to Use</span>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Registration Submitted Successfully!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your details and {uploadedPhotos.length} biometric photos have been sent to your Department Teacher and HOD. 
                  Once approved, your biometric profile will be activated for automated classroom attendance.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
                >
                  Submit Another Registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Student Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Mobile Number *</label>
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Department / Branch *</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="Computer Science">Computer Science & Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Communication">Electronics & Communication</option>
                      <option value="Data Science & AI">Data Science & AI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Email ID *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Academic Year *</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Semester *</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="4th Semester">4th Semester</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="6th Semester">6th Semester</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Section *</label>
                    <select
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Roll No. *</label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Registration No. *</label>
                    <input
                      type="text"
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono"
                      required
                    />
                  </div>
                </div>

                {/* Latest Photos Upload Section (Page 4) */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <label className="block text-slate-300 font-bold">
                    Upload Latest Photos (2-3 Clear Photos) *
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Upload clear and recent photos (JPG/PNG, Max 2MB each). Minimum 2 photos, maximum 3 photos.
                  </p>

                  <div className="flex items-center gap-3">
                    {uploadedPhotos.map((url, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-700 shadow">
                        <img src={url} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[9px] text-center font-mono py-0.5 text-slate-300">
                          Photo {i + 1}
                        </span>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-700 hover:border-sky-500 bg-slate-900/50 flex flex-col items-center justify-center text-slate-400 hover:text-sky-400 transition-all"
                    >
                      <Camera className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-semibold">+ Add</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all"
                  >
                    Submit Registration Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Approval Rules & Controls Info (Page 4) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm">Approval Rules & Roles</h3>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-sky-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Head of Department (HOD)</span>
              </div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                <li>Can add new student profile</li>
                <li>Can delete student profile</li>
                <li>Reviews teacher approvals</li>
                <li>Final authority for student records</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Teacher (Authorized)</span>
              </div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                <li>Can approve new student registration</li>
                <li>Cannot delete student profile</li>
                <li>Can add/remove student from own class</li>
                <li>Verifies student details and photos</li>
              </ul>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm">Important Controls</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-mono text-sky-400 font-bold">1. Duplicate Check:</span>
                <span>Matches name, mobile, email, registration no.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-mono text-emerald-400 font-bold">2. Verified Identity:</span>
                <span>Validates student details and photos.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-mono text-purple-400 font-bold">3. Audit Trail:</span>
                <span>Tracks all changes and approvals.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
