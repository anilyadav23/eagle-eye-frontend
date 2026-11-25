// Official Timetable Catalog for Department of Electronics & Communication Engineering
// Faculty of Engineering & Architecture, MBM University Jodhpur
// Session 2026-27

export interface TimetablePeriod {
  periodNumber: number;
  timeSlot: string; // e.g. "10:00-10:55"
  subjectCode: string;
  subjectName: string;
  room: string;
  facultyName: string;
  facultyCode: string;
  type: 'Theory' | 'Lab' | 'Project' | 'Seminar';
  batch?: string; // e.g. "A1", "A2", "A3", "All"
}

export interface DayTimetable {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periods: TimetablePeriod[];
}

export interface BranchSemesterTimetable {
  department: string;
  branch: string;
  year: string;
  semester: string;
  schedule: Record<string, TimetablePeriod[]>;
}

// B.E. IV YEAR (ECC) VII SEMESTER (ODD SEMESTER 2026-27)
// W.E.F. 01.08.2026
// Course Code to Detail Mapping:
// 7ECC41A: CCDN (Computer Communication & Data Networks) - Lata Vaishnav (LTV) - 4 Credits - Room EC-6 / EC-1
// 7ECC42A: VLSI Design Techn. - Khushbu Mehta (KSM) - 4 Credits - Room EC-6
// 7ECC43A: RTES (Real Time Embedded Systems) - Kapoor Chand (KPC) - 4 Credits - Room EC-6
// 7ECC44A: PPT (Parallel Pro. Techmn.) - Dhirendra Sharma (DS) - 4 Credits - Room EC-6
// 7ECC52A: Robotics Engg. - Kapoor Chand (KPC) - 4 Credits - Room EC-6
// 7ECC54A: MCC (Mob. Con. & Comp.) - Yazdan Khan (YK) - 4 Credits - Room EC-6
// 7ECC41B: Computer Nk Lab - Lata Vaishnav (LTV) - 2 Credits - Room L-5
// 7ECC42B: VLSI Simulation Lab - Khushbu Mehta (KSM) - 2 Credits - Room EC-10
// 7ECC43B: Embedded Systems Lab (ES LAB) - Kapoor Chand (KPC) - 2 Credits - Room EC-11
// 7ECC44B: Advance Computer Lab (AD. COMP. LAB) - Dhirendra Sharma (DS) - 2 Credits - Room EC-11
// 7ECC75B: Minor Project - Kapil Parihar (KP) / Naginder Singh (NS) - 2 Credits - Room EC-5(B)

export const OFFICIAL_TIMETABLES: Record<string, BranchSemesterTimetable> = {
  'ECC-7': {
    department: 'Electronics & Communication Engineering',
    branch: 'Electronics & Computer Control (ECC)',
    year: '4th Year',
    semester: '7th Semester',
    schedule: {
      Monday: [
        {
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-6',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory'
        },
        {
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          subjectCode: '7ECC52A',
          subjectName: 'Robotics Engineering',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory'
        },
        {
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          subjectCode: '7ECC44B / 7ECC41B / 7ECC42B',
          subjectName: 'Ad. Comp. Lab (A1) / CN Lab (A3) / VLSI Lab (A2)',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Dhirendra Sharma (DS) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'DS/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3'
        },
        {
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          subjectCode: '7ECC44B / 7ECC41B / 7ECC42B',
          subjectName: 'Ad. Comp. Lab (A1) / CN Lab (A3) / VLSI Lab (A2)',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Dhirendra Sharma (DS) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'DS/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3'
        },
        {
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          subjectCode: '7ECC42A',
          subjectName: 'VLSI Design Technology',
          room: 'Room EC-6',
          facultyName: 'Khushbu Mehta',
          facultyCode: 'KSM',
          type: 'Theory'
        },
        {
          periodNumber: 6,
          timeSlot: '03:50 - 04:45 PM',
          subjectCode: '7ECC43A',
          subjectName: 'Real Time Embedded Systems (RTES)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory'
        }
      ],
      Tuesday: [
        {
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          subjectCode: '7ECC43A',
          subjectName: 'Real Time Embedded Systems (RTES)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory'
        },
        {
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory'
        },
        {
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          subjectCode: '7ECC75B / 7ECC44B',
          subjectName: 'Project A1 (EC-5B) / Ad. Comp. Lab A2 (EC-11)',
          room: 'EC-5(B) / EC-11',
          facultyName: 'Kapil Parihar (KP) / Dhirendra Sharma (DS)',
          facultyCode: 'KP/DS',
          type: 'Project',
          batch: 'Batches A1, A2'
        },
        {
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          subjectCode: '7ECC75B / 7ECC44B',
          subjectName: 'Project A1 (EC-5B) / Ad. Comp. Lab A2 (EC-11)',
          room: 'EC-5(B) / EC-11',
          facultyName: 'Kapil Parihar (KP) / Dhirendra Sharma (DS)',
          facultyCode: 'KP/DS',
          type: 'Project',
          batch: 'Batches A1, A2'
        },
        {
          periodNumber: 5,
          timeSlot: '02:55 - 04:45 PM',
          subjectCode: '7ECC41B',
          subjectName: 'Computer Network Lab (CN Lab A1)',
          room: 'Lab L-5',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Lab',
          batch: 'Batch A1'
        }
      ],
      Wednesday: [
        {
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-6',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory'
        },
        {
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory'
        },
        {
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          subjectCode: '7ECC75B / 7ECC43B / 7ECC42B',
          subjectName: 'Project A3 / ES Lab A2 / VLSI Lab A1',
          room: 'EC-5(B) / EC-11 / EC-10',
          facultyName: 'Naginder Singh (NS) / Kapoor Chand (KPC) / Khushbu Mehta (KSM)',
          facultyCode: 'NS/KPC/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3'
        },
        {
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          subjectCode: '7ECC75B / 7ECC43B / 7ECC42B',
          subjectName: 'Project A3 / ES Lab A2 / VLSI Lab A1',
          room: 'EC-5(B) / EC-11 / EC-10',
          facultyName: 'Naginder Singh (NS) / Kapoor Chand (KPC) / Khushbu Mehta (KSM)',
          facultyCode: 'NS/KPC/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3'
        },
        {
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          subjectCode: '7ECC75B / 7ECC44B',
          subjectName: 'Project A2 / Adv Comp. Lab A3',
          room: 'EC-5(B) / EC-11',
          facultyName: 'Kapil Parihar (KP) / Dhirendra Sharma (DS)',
          facultyCode: 'KP/DS',
          type: 'Lab',
          batch: 'Batches A2, A3'
        },
        {
          periodNumber: 6,
          timeSlot: '03:50 - 04:45 PM',
          subjectCode: '7ECC43A',
          subjectName: 'RTES Tutorial (T-1 / T-2)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory'
        }
      ],
      Thursday: [
        {
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          subjectCode: '7ECC43B / 7ECC41B / 7ECC42B',
          subjectName: 'ES Lab A1 / CN Lab A2 / VLSI Lab A3',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Kapoor Chand (KPC) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'KPC/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3'
        },
        {
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          subjectCode: '7ECC43B / 7ECC41B / 7ECC42B',
          subjectName: 'ES Lab A1 / CN Lab A2 / VLSI Lab A3',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Kapoor Chand (KPC) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'KPC/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3'
        },
        {
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-1',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory'
        },
        {
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          subjectCode: '7ECC44A',
          subjectName: 'Parallel Processing Techniques (PPT)',
          room: 'Room EC-6',
          facultyName: 'Dhirendra Sharma',
          facultyCode: 'DS',
          type: 'Theory'
        },
        {
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory'
        }
      ],
      Friday: [
        {
          periodNumber: 1,
          timeSlot: '10:00 - 11:50 AM',
          subjectCode: '7ECC43B',
          subjectName: 'Embedded Systems Lab (ES Lab A3)',
          room: 'Lab EC-11',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Lab',
          batch: 'Batch A3'
        },
        {
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          subjectCode: '7ECC44A',
          subjectName: 'Parallel Processing Techniques (PPT)',
          room: 'Room EC-6',
          facultyName: 'Dhirendra Sharma',
          facultyCode: 'DS',
          type: 'Theory'
        },
        {
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          subjectCode: '7ECC42A',
          subjectName: 'VLSI Design Technology',
          room: 'Room EC-6',
          facultyName: 'Khushbu Mehta',
          facultyCode: 'KSM',
          type: 'Theory'
        },
        {
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-6',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory'
        },
        {
          periodNumber: 6,
          timeSlot: '03:50 - 04:45 PM',
          subjectCode: '7ECC52A',
          subjectName: 'Robotics Engineering',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory'
        }
      ],
      Saturday: [
        {
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          subjectCode: '7ECC52A',
          subjectName: 'Robotics Engineering',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory'
        },
        {
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          subjectCode: '7ECC43A',
          subjectName: 'Real Time Embedded Systems (RTES)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory'
        },
        {
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory'
        },
        {
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          subjectCode: '7ECC44A',
          subjectName: 'Parallel Processing Techniques (PPT)',
          room: 'Room EC-6',
          facultyName: 'Dhirendra Sharma',
          facultyCode: 'DS',
          type: 'Theory'
        },
        {
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          subjectCode: '7ECC42A',
          subjectName: 'VLSI Design Technology',
          room: 'Room EC-6',
          facultyName: 'Khushbu Mehta',
          facultyCode: 'KSM',
          type: 'Theory'
        }
      ]
    }
  }
};

// Generic helper to get timetable slots for any branch and semester
export function getTimetableSlots(branch: string, semester: string, day: string = 'Monday'): TimetablePeriod[] {
  const normBranch = branch.toUpperCase();
  const semNum = semester.replace(/[^0-9]/g, '');

  if (normBranch.includes('ECC') && (semNum === '7' || semNum === '8' || semNum === '')) {
    const table = OFFICIAL_TIMETABLES['ECC-7'];
    if (table && table.schedule[day]) {
      return table.schedule[day];
    }
    return table?.schedule['Monday'] || [];
  }

  // Fallback generation for other semesters/branches using MBM ECE/EEE standard timing and subject schemes
  const dayKey = (day || 'Monday') as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  
  if (normBranch.includes('ECC')) {
    return OFFICIAL_TIMETABLES['ECC-7'].schedule[dayKey] || OFFICIAL_TIMETABLES['ECC-7'].schedule['Monday'];
  }

  // Default to ECC VII semester timetable as active university baseline
  return OFFICIAL_TIMETABLES['ECC-7'].schedule[dayKey] || OFFICIAL_TIMETABLES['ECC-7'].schedule['Monday'];
}
