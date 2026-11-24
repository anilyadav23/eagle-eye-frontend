// Academic and Smart Classroom Attendance Data Structures according to the 10-page blueprint

export interface TimetableSlot {
  id: string;
  courseCode: string;
  courseName: string;
  room: string;
  timeSlot: string; // e.g., "10:00 AM - 11:00 AM"
  startTime: string; // "10:00"
  endTime: string; // "11:00"
  teacherName: string;
  classType: 'Regular Class' | 'Extra Class' | 'Combined Class' | 'Internal Test';
  section: string; // e.g., "Section A"
  batch?: string;
  year: string; // "2nd Year"
  semester: string; // "3rd Sem"
  expectedRosterCount: number;
  status: 'Completed' | 'In-Progress' | 'Upcoming';
  cameraFeedId: string;
}

export interface StudentRegistrationRequest {
  id: string;
  studentName: string;
  rollNumber: string;
  registrationNumber: string;
  email: string;
  mobile: string;
  gender: 'Male' | 'Female' | 'Other';
  branch: string;
  year: string;
  semester: string;
  section: string;
  photos: string[];
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  verifiedBy?: string;
  verifiedAt?: string;
  requestType: 'New Registration' | 'Add Subject' | 'Remove Subject' | 'Branch Change' | 'Profile Correction' | 'Photo Update';
  notes?: string;
}

export interface InternalTestMark {
  id: string;
  studentRoll: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  testTitle: string; // e.g. "Internal Assessment 1", "Midterm Test"
  maxMarks: number;
  marksObtained: number;
  grade: string;
  date: string;
  status: 'Draft' | 'Published';
}

export interface MultiFactorAISignals {
  facialRecognitionScore: number; // 0 - 100%
  livenessPassed: boolean; // Anti-spoofing check
  periodicVerificationCount: number; // Every 15-30s
  clothingColorConsistency: string;
  estimatedHeight: string; // e.g. "~170 cm"
  timetableMatch: boolean;
  decisionState: 'Verified (Student)' | 'Needs Review' | 'Teacher Verified' | 'Unknown Student' | 'Other-Section Student' | 'Suspicious / Inconclusive';
}
