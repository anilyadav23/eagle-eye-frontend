// Official Timetable Catalog for Department of Electronics & Communication Engineering
// Faculty of Engineering & Architecture, MBM University Jodhpur
// Session 2026-27

export interface TimetablePeriod {
  id?: string;
  periodNumber: number;
  timeSlot: string; // e.g. "10:00 - 10:55 AM"
  startTime?: string; // "10:00"
  endTime?: string; // "10:55"
  subjectCode: string;
  subjectName: string;
  room: string;
  facultyName: string;
  facultyCode: string;
  type: 'Theory' | 'Lab' | 'Project' | 'Seminar';
  scheduleDurationType?: 'Permanent for Semester' | 'Temporary for Fixed Days';
  durationDays?: string; // e.g. "7 Days", "Until 15 Dec"
  branch?: string;
  semester?: string;
  sections?: string[]; // e.g. ["Section A", "Section B"]
  batch?: string; // e.g. "A1", "A2", "A3", "All"
  day?: string; // e.g. "Monday"
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
export const OFFICIAL_TIMETABLES: Record<string, BranchSemesterTimetable> = {
  'ECC-7': {
    department: 'Electronics & Communication Engineering',
    branch: 'Electronics & Computer Control (ECC)',
    year: '4th Year',
    semester: '7th Semester',
    schedule: {
      Monday: [
        {
          id: 'slot-mon-1',
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          startTime: '10:00',
          endTime: '10:55',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-6',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-mon-2',
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          startTime: '10:55',
          endTime: '11:50',
          subjectCode: '7ECC52A',
          subjectName: 'Robotics Engineering',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-mon-3',
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          startTime: '11:50',
          endTime: '12:45',
          subjectCode: '7ECC44B / 7ECC41B / 7ECC42B',
          subjectName: 'Ad. Comp. Lab (A1) / CN Lab (A3) / VLSI Lab (A2)',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Dhirendra Sharma (DS) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'DS/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-mon-4',
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          startTime: '14:00',
          endTime: '14:55',
          subjectCode: '7ECC44B / 7ECC41B / 7ECC42B',
          subjectName: 'Ad. Comp. Lab (A1) / CN Lab (A3) / VLSI Lab (A2)',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Dhirendra Sharma (DS) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'DS/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-mon-5',
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          startTime: '14:55',
          endTime: '15:50',
          subjectCode: '7ECC42A',
          subjectName: 'VLSI Design Technology',
          room: 'Room EC-6',
          facultyName: 'Khushbu Mehta',
          facultyCode: 'KSM',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-mon-6',
          periodNumber: 6,
          timeSlot: '03:50 - 04:45 PM',
          startTime: '15:50',
          endTime: '16:45',
          subjectCode: '7ECC43A',
          subjectName: 'Real Time Embedded Systems (RTES)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        }
      ],
      Tuesday: [
        {
          id: 'slot-tue-1',
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          startTime: '10:00',
          endTime: '10:55',
          subjectCode: '7ECC43A',
          subjectName: 'Real Time Embedded Systems (RTES)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-tue-2',
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          startTime: '10:55',
          endTime: '11:50',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-tue-3',
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          startTime: '11:50',
          endTime: '12:45',
          subjectCode: '7ECC75B / 7ECC44B',
          subjectName: 'Project A1 (EC-5B) / Ad. Comp. Lab A2 (EC-11)',
          room: 'EC-5(B) / EC-11',
          facultyName: 'Kapil Parihar (KP) / Dhirendra Sharma (DS)',
          facultyCode: 'KP/DS',
          type: 'Project',
          batch: 'Batches A1, A2',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-tue-4',
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          startTime: '14:00',
          endTime: '14:55',
          subjectCode: '7ECC75B / 7ECC44B',
          subjectName: 'Project A1 (EC-5B) / Ad. Comp. Lab A2 (EC-11)',
          room: 'EC-5(B) / EC-11',
          facultyName: 'Kapil Parihar (KP) / Dhirendra Sharma (DS)',
          facultyCode: 'KP/DS',
          type: 'Project',
          batch: 'Batches A1, A2',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-tue-5',
          periodNumber: 5,
          timeSlot: '02:55 - 04:45 PM',
          startTime: '14:55',
          endTime: '16:45',
          subjectCode: '7ECC41B',
          subjectName: 'Computer Network Lab (CN Lab A1)',
          room: 'Lab L-5',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Lab',
          batch: 'Batch A1',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        }
      ],
      Wednesday: [
        {
          id: 'slot-wed-1',
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          startTime: '10:00',
          endTime: '10:55',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-6',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-wed-2',
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          startTime: '10:55',
          endTime: '11:50',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-wed-3',
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          startTime: '11:50',
          endTime: '12:45',
          subjectCode: '7ECC75B / 7ECC43B / 7ECC42B',
          subjectName: 'Project A3 / ES Lab A2 / VLSI Lab A1',
          room: 'EC-5(B) / EC-11 / EC-10',
          facultyName: 'Naginder Singh (NS) / Kapoor Chand (KPC) / Khushbu Mehta (KSM)',
          facultyCode: 'NS/KPC/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-wed-4',
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          startTime: '14:00',
          endTime: '14:55',
          subjectCode: '7ECC75B / 7ECC43B / 7ECC42B',
          subjectName: 'Project A3 / ES Lab A2 / VLSI Lab A1',
          room: 'EC-5(B) / EC-11 / EC-10',
          facultyName: 'Naginder Singh (NS) / Kapoor Chand (KPC) / Khushbu Mehta (KSM)',
          facultyCode: 'NS/KPC/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-wed-5',
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          startTime: '14:55',
          endTime: '15:50',
          subjectCode: '7ECC75B / 7ECC44B',
          subjectName: 'Project A2 / Adv Comp. Lab A3',
          room: 'EC-5(B) / EC-11',
          facultyName: 'Kapil Parihar (KP) / Dhirendra Sharma (DS)',
          facultyCode: 'KP/DS',
          type: 'Lab',
          batch: 'Batches A2, A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-wed-6',
          periodNumber: 6,
          timeSlot: '03:50 - 04:45 PM',
          startTime: '15:50',
          endTime: '16:45',
          subjectCode: '7ECC43A',
          subjectName: 'RTES Tutorial (T-1 / T-2)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        }
      ],
      Thursday: [
        {
          id: 'slot-thu-1',
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          startTime: '10:00',
          endTime: '10:55',
          subjectCode: '7ECC43B / 7ECC41B / 7ECC42B',
          subjectName: 'ES Lab A1 / CN Lab A2 / VLSI Lab A3',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Kapoor Chand (KPC) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'KPC/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-thu-2',
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          startTime: '10:55',
          endTime: '11:50',
          subjectCode: '7ECC43B / 7ECC41B / 7ECC42B',
          subjectName: 'ES Lab A1 / CN Lab A2 / VLSI Lab A3',
          room: 'EC-11 / L-5 / EC-10',
          facultyName: 'Kapoor Chand (KPC) / Lata Vaishnav (LTV) / Khushbu Mehta (KSM)',
          facultyCode: 'KPC/LTV/KSM',
          type: 'Lab',
          batch: 'Batches A1, A2, A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-thu-3',
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          startTime: '11:50',
          endTime: '12:45',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-1',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-thu-4',
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          startTime: '14:00',
          endTime: '14:55',
          subjectCode: '7ECC44A',
          subjectName: 'Parallel Processing Techniques (PPT)',
          room: 'Room EC-6',
          facultyName: 'Dhirendra Sharma',
          facultyCode: 'DS',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-thu-5',
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          startTime: '14:55',
          endTime: '15:50',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        }
      ],
      Friday: [
        {
          id: 'slot-fri-1',
          periodNumber: 1,
          timeSlot: '10:00 - 11:50 AM',
          startTime: '10:00',
          endTime: '11:50',
          subjectCode: '7ECC43B',
          subjectName: 'Embedded Systems Lab (ES Lab A3)',
          room: 'Lab EC-11',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Lab',
          batch: 'Batch A3',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-fri-3',
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          startTime: '11:50',
          endTime: '12:45',
          subjectCode: '7ECC44A',
          subjectName: 'Parallel Processing Techniques (PPT)',
          room: 'Room EC-6',
          facultyName: 'Dhirendra Sharma',
          facultyCode: 'DS',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-fri-4',
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          startTime: '14:00',
          endTime: '14:55',
          subjectCode: '7ECC42A',
          subjectName: 'VLSI Design Technology',
          room: 'Room EC-6',
          facultyName: 'Khushbu Mehta',
          facultyCode: 'KSM',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-fri-5',
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          startTime: '14:55',
          endTime: '15:50',
          subjectCode: '7ECC41A',
          subjectName: 'Computer Communication & Data Networks (CCDN)',
          room: 'Room EC-6',
          facultyName: 'Lata Vaishnav',
          facultyCode: 'LTV',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-fri-6',
          periodNumber: 6,
          timeSlot: '03:50 - 04:45 PM',
          startTime: '15:50',
          endTime: '16:45',
          subjectCode: '7ECC52A',
          subjectName: 'Robotics Engineering',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        }
      ],
      Saturday: [
        {
          id: 'slot-sat-1',
          periodNumber: 1,
          timeSlot: '10:00 - 10:55 AM',
          startTime: '10:00',
          endTime: '10:55',
          subjectCode: '7ECC52A',
          subjectName: 'Robotics Engineering',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-sat-2',
          periodNumber: 2,
          timeSlot: '10:55 - 11:50 AM',
          startTime: '10:55',
          endTime: '11:50',
          subjectCode: '7ECC43A',
          subjectName: 'Real Time Embedded Systems (RTES)',
          room: 'Room EC-6',
          facultyName: 'Kapoor Chand',
          facultyCode: 'KPC',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-sat-3',
          periodNumber: 3,
          timeSlot: '11:50 - 12:45 PM',
          startTime: '11:50',
          endTime: '12:45',
          subjectCode: '7ECC54A',
          subjectName: 'Mobile Computing & Communication (MCC)',
          room: 'Room EC-6',
          facultyName: 'Yazdan Khan',
          facultyCode: 'YK',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-sat-4',
          periodNumber: 4,
          timeSlot: '02:00 - 02:55 PM',
          startTime: '14:00',
          endTime: '14:55',
          subjectCode: '7ECC44A',
          subjectName: 'Parallel Processing Techniques (PPT)',
          room: 'Room EC-6',
          facultyName: 'Dhirendra Sharma',
          facultyCode: 'DS',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        },
        {
          id: 'slot-sat-5',
          periodNumber: 5,
          timeSlot: '02:55 - 03:50 PM',
          startTime: '14:55',
          endTime: '15:50',
          subjectCode: '7ECC42A',
          subjectName: 'VLSI Design Technology',
          room: 'Room EC-6',
          facultyName: 'Khushbu Mehta',
          facultyCode: 'KSM',
          type: 'Theory',
          scheduleDurationType: 'Permanent for Semester',
          sections: ['Section A']
        }
      ]
    }
  }
};

const STORAGE_KEY = 'eagle_eye_custom_timetable_slots';

// Load stored custom / modified timetable slots from localStorage
export function getCustomTimetableSlots(): TimetablePeriod[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

export function saveCustomTimetableSlot(slot: TimetablePeriod): TimetablePeriod[] {
  const current = getCustomTimetableSlots();
  const existingIdx = current.findIndex(s => s.id === slot.id);
  let updated: TimetablePeriod[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = slot;
  } else {
    updated = [slot, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

export function deleteCustomTimetableSlot(id: string): TimetablePeriod[] {
  const current = getCustomTimetableSlots();
  const updated = current.filter(s => s.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

// Get timetable slots for any branch, semester, and day, merged with custom/HOD updates
export function getTimetableSlots(branch: string, semester: string, day: string = 'Monday'): TimetablePeriod[] {
  const normBranch = branch.toUpperCase();
  const dayKey = (day || 'Monday') as 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

  let baseSlots: TimetablePeriod[] = [];
  const table = OFFICIAL_TIMETABLES['ECC-7'];
  if (table && table.schedule[dayKey]) {
    baseSlots = table.schedule[dayKey];
  } else {
    baseSlots = table?.schedule['Monday'] || [];
  }

  // Merge custom slots for this day
  const custom = getCustomTimetableSlots().filter(c => {
    const matchDay = !c.day || c.day.toLowerCase() === dayKey.toLowerCase();
    const matchBranch = !c.branch || normBranch.includes(c.branch.toUpperCase()) || c.branch === 'All';
    return matchDay && matchBranch;
  });

  // Combine and sort by periodNumber
  const combined = [...baseSlots, ...custom];
  combined.sort((a, b) => a.periodNumber - b.periodNumber);
  return combined;
}

// Check if a slot is currently in progress according to real-time clock
export function getSlotLiveStatus(timeSlot: string): { status: 'In Progress' | 'Upcoming' | 'Completed'; attendancePct: string; isLive: boolean } {
  try {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Parse start and end time from string, e.g., "10:00 - 10:55 AM" or "02:00 - 02:55 PM"
    const match = timeSlot.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!match) return { status: 'Upcoming', attendancePct: 'Scheduled', isLive: false };

    let startH = parseInt(match[1]);
    const startM = parseInt(match[2]);
    let endH = parseInt(match[3]);
    const endM = parseInt(match[4]);
    const meridian = match[5]?.toUpperCase();

    // Convert to 24-hour if PM is present
    if (meridian === 'PM' || startH < 8) {
      if (startH < 12) startH += 12;
      if (endH < 12) endH += 12;
    } else if (startH >= 1 && startH <= 7) {
      // Typically afternoons in college timings
      startH += 12;
      endH += 12;
    }

    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (currentMinutes >= startTotal && currentMinutes <= endTotal) {
      return { status: 'In Progress', attendancePct: '94% (48/51)', isLive: true };
    } else if (currentMinutes > endTotal) {
      return { status: 'Completed', attendancePct: '92% (47/51)', isLive: false };
    } else {
      return { status: 'Upcoming', attendancePct: 'Scheduled', isLive: false };
    }
  } catch (e) {
    return { status: 'Upcoming', attendancePct: 'Scheduled', isLive: false };
  }
}
