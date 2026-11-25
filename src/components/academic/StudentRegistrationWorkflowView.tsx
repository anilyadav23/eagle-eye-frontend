import React, { useState, useRef } from 'react';
import { 
  UserPlus, Upload, CheckCircle2, AlertCircle, 
  Camera, FileText, Send, Check, ShieldCheck, X, Trash2
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { useAuth } from '../../context/AuthContext';

export const StudentRegistrationWorkflowView: React.FC = () => {
  const { submitApprovalRequest, updateApprovalRequestStatus } = useSecurity();
  const { user } = useAuth();
  const isHOD = user?.role === 'HOD';

  // Clean empty defaults ready for real entry (no hardcoded Arjun Kumar)
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Electronics & Communication Engineering');
  const [branch, setBranch] = useState('Electronics & Computer Control (ECC)');
  const [year, setYear] = useState('4th Year');
  const [semester, setSemester] = useState('7th Semester');
  const [section, setSection] = useState('Section A');
  const [rollNo, setRollNo] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [gender, setGender] = useState('Male');

  // Real photos uploaded via file input (at least 1 photo required)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setPhotoError(null);
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setPhotoError('Please select valid JPG or PNG images.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('Image size exceeds 5MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos(prev => [...prev, event.target!.result as string].slice(0, 3));
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedPhotos.length < 1) {
      setPhotoError('Please upload at least 1 clear facial photograph for biometric enrollment.');
      return;
    }

    const newReqId = `REG-REQ-${Date.now()}`;
    const autoStatus = isHOD ? 'Approved' : 'Pending';

    submitApprovalRequest({
      id: newReqId,
      studentName: name.trim(),
      rollNo: rollNo.trim(),
      regNo: registrationNo.trim() || `REG-${rollNo.trim()}`,
      department: department,
      branch: branch,
      year: year,
      semester: semester,
      section: section,
      email: email.trim(),
      mobile: mobile.trim(),
      photos: uploadedPhotos,
      type: isHOD ? 'HOD Direct Student Enrollment' : 'New Student Admission & Biometric Clearance',
      status: autoStatus,
      reason: `Admissions clearance submission for ${name.trim()} (${rollNo.trim()})`
    });

    // Also persist student account to registered users for immediate login if HOD registered
    if (isHOD) {
      try {
        const regUsers = JSON.parse(localStorage.getItem('eagle_eye_registered_users') || '[]');
        regUsers.unshift({
          id: `usr-${rollNo.trim()}`,
          username: rollNo.trim(),
          email: email.trim(),
          password: '123456',
          role: 'Student',
          full_name: name.trim(),
          department: department,
          branch: branch,
          year: year,
          semester: semester,
          section: section,
          is_active: 1,
          approval_status: 'Approved'
        });
        localStorage.setItem('eagle_eye_registered_users', JSON.stringify(regUsers));
      } catch (err) {}
    }

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">Student Admissions & Biometric KYC Enrollment</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                {isHOD ? 'HOD Direct Registration' : 'Student Onboarding'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Upload clear student facial photos for automated classroom camera recognition and timetable roster enrollment.
            </p>
          </div>
        </div>

        {/* Workflow Steps Indicator */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-sky-500 text-white font-bold">1. Photo & Info</span>
          <span className="text-slate-500">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-bold">2. Biometric KYC</span>
          <span className="text-slate-500">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">3. Camera Live Attendance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Registration Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Student Biometric Enrollment Form</h3>
              <span className="text-xs text-slate-400 font-mono">Requires at least 1 clear photo</span>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {isHOD ? 'Student Profile Created & Enrolled Successfully!' : 'Registration Submitted Successfully!'}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Student <strong>{name}</strong> ({rollNo}) has been registered with {uploadedPhotos.length} biometric KYC photo(s).
                  {isHOD ? ' Facial templates are active immediately for optical attendance recognition.' : ' Sent to HOD and teachers for verification.'}
                </p>
                <button
                  onClick={() => {
                    setName('');
                    setRollNo('');
                    setRegistrationNo('');
                    setEmail('');
                    setMobile('');
                    setUploadedPhotos([]);
                    setIsSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
                >
                  Enroll Another Student
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {photoError && (
                  <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{photoError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Student Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Aryan Mehra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Roll No. / Student ID *</label>
                    <input
                      type="text"
                      placeholder="e.g. 24UECC8025"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono focus:border-sky-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Department *</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Branch *</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="Electronics & Computer Control (ECC)">Electronics & Computer Control (ECC)</option>
                      <option value="Electronics & Communication Engineering (ECE)">Electronics & Communication Engineering (ECE)</option>
                      <option value="Electrical & Electronics Engineering (EEE)">Electrical & Electronics Engineering (EEE)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Academic Year *</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="4th Year">4th Year (B.E. IV Year)</option>
                      <option value="3rd Year">3rd Year (B.E. III Year)</option>
                      <option value="2nd Year">2nd Year (B.E. II Year)</option>
                      <option value="1st Year">1st Year (B.E. I Year)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Semester *</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="7th Semester">7th Semester (Odd 2026-27)</option>
                      <option value="5th Semester">5th Semester</option>
                      <option value="3rd Semester">3rd Semester</option>
                      <option value="1st Semester">1st Semester</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Section *</label>
                    <select
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    >
                      <option value="Section A">Section A</option>
                      <option value="Section B">Section B</option>
                      <option value="Section C">Section C</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Email ID</label>
                    <input
                      type="email"
                      placeholder="student@campus.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Registration / Enrolment No.</label>
                    <input
                      type="text"
                      placeholder="e.g. REG20268025"
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium font-mono"
                    />
                  </div>
                </div>

                {/* Real Photo Upload Section (Requires At least 1 Photo) */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-slate-200 font-bold">
                        Upload Biometric Facial Photos (At least 1 photo required) *
                      </label>
                      <p className="text-[11px] text-slate-400">
                        Upload real photographs (front-facing, portrait or selfie). Supports JPG/PNG.
                      </p>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      uploadedPhotos.length > 0 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-red-500/20 text-red-300 border-red-500/40'
                    }`}>
                      {uploadedPhotos.length} / 3 Photos Uploaded
                    </span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {uploadedPhotos.map((url, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-lg group">
                        <img src={url} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(i)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white hover:bg-red-500 transition-colors"
                          title="Remove Photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[10px] text-center font-mono py-0.5 text-emerald-300">
                          Photo #{i + 1}
                        </span>
                      </div>
                    ))}

                    {uploadedPhotos.length < 3 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 rounded-2xl border-2 border-dashed border-sky-500/50 hover:border-sky-400 bg-sky-950/20 hover:bg-sky-900/30 flex flex-col items-center justify-center text-sky-400 transition-all cursor-pointer"
                      >
                        <Camera className="w-6 h-6 mb-1 text-sky-400" />
                        <span className="text-[11px] font-bold">+ Upload Photo</span>
                        <span className="text-[9px] text-slate-400 font-mono">PNG / JPG</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isHOD ? 'Complete Biometric Enrollment (Direct Enrol)' : 'Submit Registration Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Approval Rules & Controls Info */}
        <div className="lg:col-span-4 space-y-5">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm">Approval Rules & Roles</h3>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-sky-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Head of Department (HOD)</span>
              </div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                <li>Direct student biometric registration & approval</li>
                <li>Can delete and edit student profiles</li>
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
                <li>Verifies student identity and photo</li>
                <li>Marks class roll-call and internal marks</li>
              </ul>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm">Biometric Facial Criteria</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-mono text-sky-400 font-bold">1. Clear Lighting:</span>
                <span>Front-facing with even facial illumination.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-mono text-emerald-400 font-bold">2. Facial Vector:</span>
                <span>Minimum 1 photo required for optical recognition.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-mono text-purple-400 font-bold">3. Auto Sync:</span>
                <span>Attendance records sync across HOD and teachers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
