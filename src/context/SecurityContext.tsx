import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Person, Camera, RoomZone, SecurityAlert, SecurityRule, 
  BuildingStats, AppearanceSnapshot, MovementEvent, PersonRole, AccessStatus, 
  AlertSeverity, AlertType, AlertStatus, CameraConnectPayload, CameraTestPayload,
  CameraBrand, StreamType, ConnectionStatus, BuildingProfile, FloorProfile, CanvasShape, BlueprintType,
  AttendanceRecord, AttendanceStatus
} from '../types';
import { getApiBase, getWsUrl, getCameraCaptureUrl } from '../config/api';

// Pending Approval Request Interface for HOD & Student Onboarding Workflows
export interface PendingApprovalRequest {
  id: string;
  studentName: string;
  rollNo: string;
  regNo: string;
  department?: string;
  branch: string;
  year: string;
  semester: string;
  section: string;
  email: string;
  mobile: string;
  submittedAt: string;
  photos: string[];
  type: string;
  status: string;
  reason?: string;
}

interface SecurityContextType {
  stats: BuildingStats;
  persons: Person[];
  rooms: RoomZone[];
  cameras: Camera[];
  alerts: SecurityAlert[];
  rules: SecurityRule[];
  buildings: BuildingProfile[];
  attendanceRecords: AttendanceRecord[];
  selectedPerson: Person | null;
  selectedPersonId: string;
  selectedCamera: Camera | null;
  selectedCameraId: string | null;
  selectedRoom: RoomZone | null;
  activeFloor: string;
  activeBuilding: string;
  soundEnabled: boolean;
  isLockdownMode: boolean;
  isEnrollModalOpen: boolean;
  isConnectCamModalOpen: boolean;
  unknownDetectionData: { trackId: string; photoUrl: string } | null;
  isConnected: boolean;
  // Approvals Workflow State & Actions
  approvalRequests: PendingApprovalRequest[];
  submitApprovalRequest: (request: Omit<PendingApprovalRequest, 'id' | 'submittedAt' | 'status'> & { id?: string; submittedAt?: string; status?: string; department?: string }) => void;
  updateApprovalRequestStatus: (id: string, status: 'Approved' | 'Rejected', academicDetails?: { semester?: string; year?: string; section?: string; department?: string; branch?: string }) => void;
  deleteApprovalRequest: (id: string) => void;
  deleteUserProfile: (identifier: string) => void;
  // Actions
  setSelectedPersonId: (id: string) => void;
  setSelectedCameraId: (id: string | null) => void;
  setSelectedRoomId: (id: string | null) => void;
  setActiveFloor: (floor: string) => void;
  setActiveBuilding: (bldg: string) => void;
  toggleSound: () => void;
  toggleLockdown: () => void;
  setIsEnrollModalOpen: (open: boolean) => void;
  setIsConnectCamModalOpen: (open: boolean) => void;
  triggerUnknownPersonPrompt: (customTrackId?: string, customPhotoUrl?: string) => Promise<void> | void;
  enrollPerson: (data: any) => Promise<Person | null>;
  resolveAlert: (alertId: string, notes: string) => Promise<void>;
  simulateAlert: (type: AlertType, roomName?: string) => Promise<void>;
  // Attendance Intelligence Actions
  markAttendance: (personId: string, status: AttendanceStatus, notes?: string, course?: string, room?: string) => Promise<AttendanceRecord | null>;
  triggerAttendanceScan: () => Promise<void>;
  exportAttendanceCSV: (course?: string) => void;
  fetchPersonTimeline: (personId: string) => Promise<MovementEvent[]>;
  fetchPersonAppearances: (personId: string) => Promise<AppearanceSnapshot[]>;
  // Camera Actions
  connectCamera: (payload: CameraConnectPayload) => Promise<Camera>;
  connectLaptopWebcam: (deviceIndex?: number, roomName?: string) => Promise<Camera>;
  connectMobileCamera: (phoneIp: string, port?: number, streamType?: string, roomName?: string) => Promise<Camera>;
  disconnectCamera: (cameraId: string) => Promise<void>;
  reconnectCamera: (cameraId: string) => Promise<void>;
  deleteCamera: (cameraId: string) => Promise<void>;
  testCameraConnection: (payload: CameraTestPayload) => Promise<any>;
  // Building & Blueprint Actions
  createBuilding: (data: any) => Promise<BuildingProfile>;
  deleteBuilding: (buildingId: string) => Promise<void>;
  addFloor: (buildingId: string, data: any) => Promise<FloorProfile>;
  deleteFloor: (buildingId: string, floorId: string) => Promise<void>;
  addRoom: (data: any) => Promise<RoomZone>;
  deleteRoom: (roomId: string) => Promise<void>;
  uploadBlueprint: (file: File, buildingId: string, floorId: string) => Promise<any>;
  saveBlueprint: (payload: any) => Promise<FloorProfile>;
}

const DEFAULT_STATS: BuildingStats = {
  total_in_building: 128,
  authorized: 116,
  unknown: 8,
  alerts: 4,
  cameras_online: 7,
  total_cameras: 7,
  entries_today: 256,
  exits_today: 228,
  floor_occupancies: {
    'Floor 4': 32,
    'Floor 3': 28,
    'Floor 2': 38,
    'Floor 1': 30,
  },
};

const DEFAULT_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "att-rec-1",
    person_id: "STU-10087",
    student_id: "STU-2026-0104",
    name: "Rahul Sharma",
    role: "Student",
    department: "Computer Science & Engineering",
    course: "CS301 - Computer Vision & AI",
    room: "Lecture Hall 101",
    status: "Verified",
    timestamp: "09:12:04 AM",
    confidence_score: 0.98,
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    verified_camera_id: "CAM-021",
    notes: "Real-time facial vector matched standard master vector (98.2% similarity)."
  },
  {
    id: "att-rec-2",
    person_id: "STU-10092",
    student_id: "STU-2026-0142",
    name: "Ananya Verma",
    role: "Student",
    department: "Computer Science & Engineering",
    course: "CS301 - Computer Vision & AI",
    room: "Lecture Hall 101",
    status: "Verified",
    timestamp: "09:14:18 AM",
    confidence_score: 0.97,
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    verified_camera_id: "CAM-021",
    notes: "Verified biometrically at classroom portal."
  },
  {
    id: "att-rec-3",
    person_id: "FAC-2001",
    student_id: "FAC-2020-0012",
    name: "Dr. Rajesh Iyer",
    role: "Professor",
    department: "AI & Robotics Department",
    course: "CS301 - Computer Vision & AI",
    room: "Lecture Hall 101",
    status: "Verified",
    timestamp: "08:55:00 AM",
    confidence_score: 0.99,
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    verified_camera_id: "CAM-021",
    notes: "Course Instructor commenced lecture on time."
  },
  {
    id: "att-rec-4",
    person_id: "STU-10105",
    student_id: "STU-2026-0177",
    name: "Rohan Gupta",
    role: "Student",
    department: "Computer Science & Engineering",
    course: "CS301 - Computer Vision & AI",
    room: "Lecture Hall 101",
    status: "Present",
    timestamp: "09:18:22 AM",
    confidence_score: 0.95,
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    verified_camera_id: "CAM-021",
    notes: "Automated attendance marked."
  },
  {
    id: "att-rec-5",
    person_id: "STU-10118",
    student_id: "STU-2026-0188",
    name: "Neha Patel",
    role: "Student",
    department: "Data Science & Analytics",
    course: "CS301 - Computer Vision & AI",
    room: "Lecture Hall 101",
    status: "Late",
    timestamp: "09:35:10 AM",
    confidence_score: 0.94,
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    verified_camera_id: "CAM-021",
    notes: "Tardy arrival logged (Grace period expired by 20m)."
  },
  {
    id: "att-rec-6",
    person_id: "STU-10144",
    student_id: "STU-2026-0219",
    name: "Kabir Mehta",
    role: "Student",
    department: "Computer Science & Engineering",
    course: "CS301 - Computer Vision & AI",
    room: "Lecture Hall 101",
    status: "Proxy Flagged",
    timestamp: "09:12:05 AM",
    confidence_score: 0.62,
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    verified_camera_id: "CAM-021",
    notes: "Tailgating anomaly detected: entered doorway simultaneously with STU-10087 (<1.2s gap)."
  }
];

// Generic list deduplication helper
function upsertItem<T>(list: T[], item: T, key: keyof T): T[] {
  const index = list.findIndex(x => x[key] === item[key]);
  if (index >= 0) {
    const copy = [...list];
    copy[index] = item;
    return copy;
  }
  return [...list, item];
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<BuildingStats>(DEFAULT_STATS);
  const [persons, setPersons] = useState<Person[]>([]);
  const [rooms, setRooms] = useState<RoomZone[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [rules, setRules] = useState<SecurityRule[]>([]);
  const [buildings, setBuildings] = useState<BuildingProfile[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(DEFAULT_ATTENDANCE);
  
  const [selectedPersonId, setSelectedPersonId] = useState<string>('STU-10087');
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>('CAM-021');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [activeFloor, setActiveFloor] = useState<string>('Floor 2');
  const [activeBuilding, setActiveBuilding] = useState<string>('Academic Block A');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isLockdownMode, setIsLockdownMode] = useState<boolean>(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [isConnectCamModalOpen, setIsConnectCamModalOpen] = useState<boolean>(false);
  const [unknownDetectionData, setUnknownDetectionData] = useState<{ trackId: string; photoUrl: string } | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Default initial approval requests (cached in localStorage and merged with registered student profiles)
  const [approvalRequests, setApprovalRequests] = useState<PendingApprovalRequest[]>(() => {
    let requests: PendingApprovalRequest[] = [];
    try {
      const saved = localStorage.getItem('eagle_eye_approval_requests');
      if (saved) requests = JSON.parse(saved);
    } catch (e) {
      requests = [];
    }

    // Merge any student from eagle_eye_registered_users that is pending or registered
    try {
      const registeredJson = localStorage.getItem('eagle_eye_registered_users');
      if (registeredJson) {
        const users: any[] = JSON.parse(registeredJson);
        users.forEach(u => {
          if (u.role === 'Student') {
            const exists = requests.some(
              r => (r.rollNo && r.rollNo.toLowerCase() === u.username.toLowerCase()) ||
                   (r.email && r.email.toLowerCase() === (u.email || '').toLowerCase())
            );
            if (!exists) {
              requests.unshift({
                id: u.id || `REG-REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                studentName: u.full_name || u.username,
                rollNo: u.username,
                regNo: u.regNo || `REG-${Math.floor(100000 + Math.random() * 900000)}`,
                department: u.department || 'Electronics & Communication Engineering',
                branch: u.branch || 'Electronics & Communication Engineering (ECE)',
                year: u.year || 'Pending Allocation',
                semester: u.semester || 'Pending Allocation',
                section: u.section || 'Pending',
                email: u.email || '',
                mobile: u.phone || '+91 98000 00000',
                submittedAt: 'Recent Submission',
                photos: [
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
                ],
                type: 'New Student Admission & Biometric Clearance',
                status: u.approval_status === 'Approved' ? 'Approved' : 'Pending',
                reason: `Self-registration profile for ${u.full_name || u.username} (${u.username}) awaiting clearance.`
              });
            }
          }
        });
      }
    } catch (e) {}

    return requests;
  });

  // Shared real-time cloud broadcast channel for multi-user / multi-device synchronization
  const NTFY_SYNC_URL = 'https://ntfy.sh/eagle_eye_approval_queue_98234';

  const broadcastCloudSync = (actionType: string, payload: any) => {
    try {
      fetch(NTFY_SYNC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: actionType, data: payload, timestamp: Date.now() })
      }).catch(() => {});
    } catch (e) {}
  };

  // Listen to cross-component, cross-tab, and cross-device cloud sync for approvals
  useEffect(() => {
    // 1. Local Storage Event (Same device, different tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'eagle_eye_approval_requests' && e.newValue) {
        try {
          setApprovalRequests(JSON.parse(e.newValue));
        } catch (err) {}
      } else if (e.key === 'eagle_eye_registered_users' && e.newValue) {
        try {
          const regUsers: any[] = JSON.parse(e.newValue);
          setApprovalRequests(prev => {
            let changed = false;
            const updated = [...prev];
            regUsers.forEach(u => {
              if (u.role === 'Student') {
                const idx = updated.findIndex(r => r.rollNo.toLowerCase() === u.username.toLowerCase());
                if (idx < 0) {
                  changed = true;
                  updated.unshift({
                    id: u.id || `REG-REQ-${Date.now()}`,
                    studentName: u.full_name || u.username,
                    rollNo: u.username,
                    regNo: u.regNo || `REG-${Math.floor(100000 + Math.random() * 900000)}`,
                    department: u.department || 'Electronics & Communication Engineering',
                    branch: u.branch || 'Electronics & Communication Engineering (ECE)',
                    year: u.year || 'Pending Allocation',
                    semester: u.semester || 'Pending Allocation',
                    section: u.section || 'Pending',
                    email: u.email || '',
                    mobile: u.phone || '+91 98000 00000',
                    submittedAt: 'Recent Submission',
                    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'],
                    type: 'New Student Admission & Biometric Clearance',
                    status: u.approval_status === 'Approved' ? 'Approved' : 'Pending',
                    reason: `Self-registration profile awaiting clearance.`
                  });
                }
              }
            });
            return changed ? updated : prev;
          });
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // 2. Cross-Device SSE / Polling Stream (Different devices / phones / browsers)
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource(`${NTFY_SYNC_URL}/sse`);
      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.message) {
            const inner = JSON.parse(parsed.message);
            if (inner.action === 'SUBMIT_REQUEST') {
              const incoming = inner.data;
              setApprovalRequests(prev => {
                const filtered = prev.filter(r => r.rollNo.toLowerCase() !== incoming.rollNo.toLowerCase() && r.id !== incoming.id);
                const updated = [incoming, ...filtered];
                try {
                  localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            } else if (inner.action === 'UPDATE_STATUS') {
              const { id, status } = inner.data;
              setApprovalRequests(prev => {
                const updated = prev.map(r => r.id === id ? { ...r, status } : r);
                try {
                  localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            } else if (inner.action === 'DELETE_REQUEST') {
              const { identifier } = inner.data;
              const clean = identifier.trim().toLowerCase();
              setApprovalRequests(prev => {
                const updated = prev.filter(r => r.id !== identifier && r.rollNo.toLowerCase() !== clean);
                try {
                  localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
                } catch (e) {}
                return updated;
              });
            }
          }
        } catch (e) {}
      };
    } catch (e) {}

    // 3. Fallback periodic poll to ensure HOD/Teacher receive requests even if SSE disconnected
    const pollInterval = setInterval(() => {
      fetch(`${NTFY_SYNC_URL}/json?poll=1&since=10m`)
        .then(r => r.text())
        .then(text => {
          if (!text) return;
          const lines = text.trim().split('\n');
          lines.forEach(line => {
            try {
              const parsed = JSON.parse(line);
              if (parsed.message) {
                const inner = JSON.parse(parsed.message);
                if (inner.action === 'SUBMIT_REQUEST') {
                  const incoming = inner.data;
                  setApprovalRequests(prev => {
                    if (prev.some(r => r.id === incoming.id)) return prev;
                    const filtered = prev.filter(r => r.rollNo.toLowerCase() !== incoming.rollNo.toLowerCase());
                    const updated = [incoming, ...filtered];
                    try {
                      localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
                    } catch (e) {}
                    return updated;
                  });
                } else if (inner.action === 'UPDATE_STATUS') {
                  const { id, status, academicDetails } = inner.data;
                  setApprovalRequests(prev => {
                    const updated = prev.map(r => {
                      if (r.id === id) {
                        return {
                          ...r,
                          status,
                          ...(academicDetails?.semester ? { semester: academicDetails.semester } : {}),
                          ...(academicDetails?.year ? { year: academicDetails.year } : {}),
                          ...(academicDetails?.section ? { section: academicDetails.section } : {}),
                          ...(academicDetails?.department ? { department: academicDetails.department } : {}),
                          ...(academicDetails?.branch ? { branch: academicDetails.branch } : {})
                        };
                      }
                      return r;
                    });
                    try {
                      localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
                    } catch (e) {}
                    return updated;
                  });
                }
              }
            } catch (e) {}
          });
        })
        .catch(() => {});
    }, 4000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (eventSource) eventSource.close();
      clearInterval(pollInterval);
    };
  }, []);

  const submitApprovalRequest = (newReq: Omit<PendingApprovalRequest, 'id' | 'submittedAt' | 'status'> & { id?: string; submittedAt?: string; status?: string }) => {
    const formatted: PendingApprovalRequest = {
      id: newReq.id || `REQ-${Date.now()}`,
      studentName: newReq.studentName,
      rollNo: newReq.rollNo || 'N/A',
      regNo: newReq.regNo || `REG-${Math.floor(100000 + Math.random() * 900000)}`,
      branch: newReq.branch || 'Electronics & Communication',
      year: newReq.year || '2nd Year',
      semester: newReq.semester || '3rd Semester',
      section: newReq.section || 'A',
      email: newReq.email || '',
      mobile: newReq.mobile || '',
      submittedAt: newReq.submittedAt || 'Just now',
      photos: newReq.photos || ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'],
      type: newReq.type || 'Student Request',
      status: newReq.status || 'Pending',
      reason: newReq.reason
    };
    setApprovalRequests(prev => {
      const filtered = prev.filter(r => r.rollNo.toLowerCase() !== formatted.rollNo.toLowerCase() && r.id !== formatted.id);
      const updated = [formatted, ...filtered];
      try {
        localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Broadcast across devices instantly
    broadcastCloudSync('SUBMIT_REQUEST', formatted);
  };

  const updateApprovalRequestStatus = (
    id: string, 
    status: 'Approved' | 'Rejected', 
    academicDetails?: { semester?: string; year?: string; section?: string; department?: string; branch?: string }
  ) => {
    setApprovalRequests(prev => {
      const targetReq = prev.find(r => r.id === id);
      const updated = prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status,
            ...(academicDetails?.semester ? { semester: academicDetails.semester } : {}),
            ...(academicDetails?.year ? { year: academicDetails.year } : {}),
            ...(academicDetails?.section ? { section: academicDetails.section } : {}),
            ...(academicDetails?.department ? { department: academicDetails.department } : {}),
            ...(academicDetails?.branch ? { branch: academicDetails.branch } : {})
          };
        }
        return r;
      });
      try {
        localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));

        // When approved or rejected, also sync with registered_users in localStorage
        const regList: any[] = JSON.parse(localStorage.getItem('eagle_eye_registered_users') || '[]');
        if (targetReq && regList.length > 0) {
          const uIdx = regList.findIndex(
            u => (u.username && u.username.toLowerCase() === targetReq.rollNo.toLowerCase()) ||
                 (u.email && u.email.toLowerCase() === targetReq.email.toLowerCase())
          );
          if (uIdx >= 0) {
            regList[uIdx].is_active = status === 'Approved' ? 1 : 0;
            regList[uIdx].approval_status = status;
            if (academicDetails) {
              if (academicDetails.semester) regList[uIdx].semester = academicDetails.semester;
              if (academicDetails.year) regList[uIdx].year = academicDetails.year;
              if (academicDetails.section) regList[uIdx].section = academicDetails.section;
              if (academicDetails.department) regList[uIdx].department = academicDetails.department;
              if (academicDetails.branch) regList[uIdx].branch = academicDetails.branch;
            }
            localStorage.setItem('eagle_eye_registered_users', JSON.stringify(regList));
          }
        }
      } catch (e) {}
      return updated;
    });

    // Broadcast across devices
    broadcastCloudSync('UPDATE_STATUS', { id, status, academicDetails });
  };

  const deleteApprovalRequest = (id: string) => {
    setApprovalRequests(prev => {
      const updated = prev.filter(r => r.id !== id);
      try {
        localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    broadcastCloudSync('DELETE_REQUEST', { identifier: id });
  };

  const deleteUserProfile = (identifier: string) => {
    const clean = identifier.trim().toLowerCase();
    // 1. Remove from approvals
    setApprovalRequests(prev => {
      const updated = prev.filter(
        r => r.id !== identifier &&
             r.rollNo.toLowerCase() !== clean &&
             r.email.toLowerCase() !== clean &&
             r.studentName.toLowerCase() !== clean
      );
      try {
        localStorage.setItem('eagle_eye_approval_requests', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 2. Remove from registered users
    try {
      const regList: any[] = JSON.parse(localStorage.getItem('eagle_eye_registered_users') || '[]');
      const filtered = regList.filter(
        u => u.id !== identifier &&
             u.username.toLowerCase() !== clean &&
             (u.email && u.email.toLowerCase() !== clean)
      );
      localStorage.setItem('eagle_eye_registered_users', JSON.stringify(filtered));
    } catch (e) {}

    // 3. Remove from attendance records
    setAttendanceRecords(prev => prev.filter(
      a => a.person_id !== identifier &&
           a.student_id !== identifier &&
           a.name.toLowerCase() !== clean
    ));

    broadcastCloudSync('DELETE_REQUEST', { identifier });
  };

  const wsRef = useRef<WebSocket | null>(null);

  const playAlertSound = (severity: AlertSeverity = 'High') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (severity === 'Critical') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.setValueAtTime(440, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {}
  };

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connectWs = () => {
      try {
        socket = new WebSocket(getWsUrl());
        wsRef.current = socket;

        socket.onopen = () => {
          setIsConnected(true);
        };

        socket.onmessage = (event) => {
          try {
            const msg = JSON.parse(event.data);
            if (msg.type === 'INITIAL_STATE') {
              setStats(msg.data.stats);
              setPersons(msg.data.persons);
              setRooms(msg.data.rooms);
              setCameras(msg.data.cameras);
              setAlerts(msg.data.alerts);
              setRules(msg.data.rules);
              if (msg.data.buildings) setBuildings(msg.data.buildings);
              if (msg.data.attendance && Array.isArray(msg.data.attendance) && msg.data.attendance.length > 0) {
                setAttendanceRecords(msg.data.attendance);
              }
            } else if (msg.type === 'TICK_UPDATE') {
              setStats(msg.data.stats);
              setPersons(msg.data.persons);
            } else if (msg.type === 'ATTENDANCE_UPDATED') {
              setAttendanceRecords(prev => upsertItem(prev, msg.data, 'person_id'));
              setPersons(prev => prev.map(p => p.person_id === msg.data.person_id ? { ...p, attendance_status: msg.data.status, attendance_time: msg.data.timestamp } : p));
            } else if (msg.type === 'ATTENDANCE_SCAN_COMPLETED') {
              setAttendanceRecords(msg.data);
            } else if (msg.type === 'NEW_ALERT') {
              setAlerts(prev => upsertItem(prev, msg.data, 'id'));
              playAlertSound(msg.data.severity);
            } else if (msg.type === 'ALERT_RESOLVED') {
              setAlerts(prev => prev.map(a => (a.id === msg.data.id || a.alert_id === msg.data.alert_id) ? msg.data : a));
            } else if (msg.type === 'NEW_PERSON_ENROLLED') {
              setPersons(prev => upsertItem(prev, msg.data, 'person_id'));
            } else if (msg.type === 'UNKNOWN_PERSON_DETECTED') {
              setUnknownDetectionData({
                trackId: msg.data.trackId,
                photoUrl: msg.data.photoUrl
              });
              setIsEnrollModalOpen(true);
              playAlertSound('Medium');
            } else if (msg.type === 'CAMERA_CONNECTED') {
              setCameras(prev => upsertItem(prev, msg.data, 'camera_id'));
            } else if (msg.type === 'CAMERA_DISCONNECTED' || msg.type === 'CAMERA_RECONNECTED') {
              setCameras(prev => prev.map(c => c.camera_id === msg.data.camera_id ? msg.data : c));
            } else if (msg.type === 'CAMERA_DELETED') {
              setCameras(prev => prev.filter(c => c.camera_id !== msg.data.camera_id));
            } else if (msg.type === 'BUILDING_CREATED') {
              setBuildings(prev => upsertItem(prev, msg.data, 'id'));
            } else if (msg.type === 'BUILDING_DELETED') {
              setBuildings(prev => prev.filter(b => b.id !== msg.data.building_id && b.name !== msg.data.building_id));
            } else if (msg.type === 'ROOM_CREATED') {
              setRooms(prev => upsertItem(prev, msg.data, 'id'));
            } else if (msg.type === 'ROOM_DELETED') {
              setRooms(prev => prev.filter(r => r.id !== msg.data.room_id && r.name !== msg.data.room_id));
            } else if (msg.type === 'BLUEPRINT_SAVED') {
              setBuildings(prev => prev.map(b => ({
                ...b,
                floors: b.floors.map(f => f.id === msg.data.id ? msg.data : f)
              })));
            }
          } catch (err) {}
        };

        socket.onclose = () => {
          setIsConnected(false);
          setTimeout(connectWs, 3000);
        };
      } catch (e) {
        setIsConnected(false);
      }
    };

    connectWs();

    const api = getApiBase();
    fetch(`${api}/api/buildings`)
      .then(r => r.json())
      .then(b => setBuildings(b))
      .catch(() => {});

    fetch(`${api}/api/cameras`)
      .then(r => r.json())
      .then(cams => setCameras(cams))
      .catch(() => {});

    fetch(`${api}/api/rooms`)
      .then(r => r.json())
      .then(rms => setRooms(rms))
      .catch(() => {});

    fetch(`${api}/api/stats`)
      .then(r => r.json())
      .then(st => setStats(st))
      .catch(() => {});

    fetch(`${api}/api/persons`)
      .then(r => r.json())
      .then(p => {
        if (Array.isArray(p) && p.length > 0) setPersons(p);
      })
      .catch(() => {});

    fetch(`${api}/api/attendance`)
      .then(r => r.json())
      .then(att => {
        if (Array.isArray(att) && att.length > 0) setAttendanceRecords(att);
      })
      .catch(() => {});

    return () => {
      if (socket) socket.close();
    };
  }, []);

  // --- Building & Blueprint API Actions (Strict Deduplication) ---

  const createBuilding = async (data: any): Promise<BuildingProfile> => {
    const res = await fetch(`${getApiBase()}/api/buildings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const bldg = await res.json();
    setBuildings(prev => upsertItem(prev, bldg, 'id'));
    setActiveBuilding(bldg.name);
    return bldg;
  };

  const deleteBuilding = async (buildingId: string) => {
    await fetch(`${getApiBase()}/api/buildings/${buildingId}`, { method: 'DELETE' });
    setBuildings(prev => prev.filter(b => b.id !== buildingId && b.name !== buildingId));
  };

  const addFloor = async (buildingId: string, data: any): Promise<FloorProfile> => {
    const res = await fetch(`${getApiBase()}/api/buildings/${buildingId}/floors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const fl = await res.json();
    setBuildings(prev => prev.map(b => (b.id === buildingId || b.name === buildingId) ? {
      ...b,
      floors: upsertItem(b.floors, fl, 'id'),
      total_floors: b.floors.length + 1
    } : b));
    return fl;
  };

  const deleteFloor = async (buildingId: string, floorId: string) => {
    await fetch(`${getApiBase()}/api/buildings/${buildingId}/floors/${floorId}`, { method: 'DELETE' });
    setBuildings(prev => prev.map(b => (b.id === buildingId || b.name === buildingId) ? {
      ...b,
      floors: b.floors.filter(f => f.id !== floorId && f.floor_name !== floorId)
    } : b));
  };

  const addRoom = async (data: any): Promise<RoomZone> => {
    const res = await fetch(`${getApiBase()}/api/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const rm = await res.json();
    setRooms(prev => upsertItem(prev, rm, 'id'));
    return rm;
  };

  const deleteRoom = async (roomId: string) => {
    await fetch(`${getApiBase()}/api/rooms/${roomId}`, { method: 'DELETE' });
    setRooms(prev => prev.filter(r => r.id !== roomId && r.name !== roomId));
  };

  const uploadBlueprint = async (file: File, buildingId: string, floorId: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('building_id', buildingId);
    formData.append('floor_id', floorId);

    const res = await fetch(`${getApiBase()}/api/blueprint/upload`, {
      method: 'POST',
      body: formData
    });
    return await res.json();
  };

  const saveBlueprint = async (payload: any): Promise<FloorProfile> => {
    const res = await fetch(`${getApiBase()}/api/blueprint/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const saved = await res.json();
    return saved;
  };

  // --- Real Camera Actions ---

  const testCameraConnection = async (payload: CameraTestPayload) => {
    try {
      const res = await fetch(`${getApiBase()}/api/cameras/test-connection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Backend unreachable.' };
    }
  };

  const connectCamera = async (payload: CameraConnectPayload): Promise<Camera> => {
    const res = await fetch(`${getApiBase()}/api/cameras/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const newCam: Camera = await res.json();
    setCameras(prev => upsertItem(prev, newCam, 'camera_id'));
    setSelectedCameraId(newCam.camera_id);
    return newCam;
  };

  // 1-Click Laptop Webcam Connection Helper
  const connectLaptopWebcam = async (deviceIndex: number = 0, roomName: string = 'Server Room'): Promise<Camera> => {
    const payload: CameraConnectPayload = {
      camera_id: 'CAM-LAPTOP',
      name: `Laptop Integrated Webcam (Device #${deviceIndex})`,
      building: activeBuilding,
      floor: activeFloor,
      room: roomName,
      brand: 'Local USB / Built-in Webcam',
      stream_type: 'USB Local',
      device_index: deviceIndex,
      ai_models: ['YOLOv8', 'CentroidTracker', 'HUDAnnotator']
    };
    const cam = await connectCamera(payload);
    setSelectedCameraId(cam.camera_id);
    return cam;
  };

  // 1-Click Mobile Phone Camera Connection Helper
  const connectMobileCamera = async (phoneIp: string, port: number = 8080, streamType: string = 'IP_WEBCAM', roomName: string = 'Main Entrance'): Promise<Camera> => {
    let streamUrl = `http://${phoneIp}:${port}/video`;
    if (streamType === 'DROIDCAM') {
      streamUrl = `http://${phoneIp}:${port || 4747}/video`;
    } else if (streamType === 'RTSP_MOBILE') {
      streamUrl = `rtsp://${phoneIp}:${port || 8080}/h264_pcm.sdp`;
    }

    const payload: CameraConnectPayload = {
      name: `Mobile Optical Cam (${phoneIp})`,
      building: activeBuilding,
      floor: activeFloor,
      room: roomName,
      brand: 'Mobile IP Cam (DroidCam/IP Webcam)',
      stream_type: 'HTTP/MJPEG',
      stream_url: streamUrl,
      ip_address: phoneIp,
      port: port,
      ai_models: ['YOLOv8', 'CentroidTracker', 'HUDAnnotator']
    };
    return await connectCamera(payload);
  };

  const disconnectCamera = async (cameraId: string) => {
    const res = await fetch(`${getApiBase()}/api/cameras/${cameraId}/disconnect`, { method: 'POST' });
    if (res.ok) {
      const updated = await res.json();
      setCameras(prev => prev.map(c => c.camera_id === cameraId ? updated : c));
    }
  };

  const reconnectCamera = async (cameraId: string) => {
    const res = await fetch(`${getApiBase()}/api/cameras/${cameraId}/reconnect`, { method: 'POST' });
    if (res.ok) {
      const updated = await res.json();
      setCameras(prev => prev.map(c => c.camera_id === cameraId ? updated : c));
    }
  };

  const deleteCamera = async (cameraId: string) => {
    await fetch(`${getApiBase()}/api/cameras/${cameraId}`, { method: 'DELETE' });
    setCameras(prev => prev.filter(c => c.camera_id !== cameraId));
  };

  const triggerUnknownPersonPrompt = async (customTrackId?: string, customPhotoUrl?: string) => {
    if (customPhotoUrl) {
      setUnknownDetectionData({ 
        trackId: customTrackId || `TRK-2025-${Math.floor(100000 + Math.random() * 900000)}`, 
        photoUrl: customPhotoUrl 
      });
      setIsEnrollModalOpen(true);
      playAlertSound('Medium');
      return;
    }

    try {
      const targetCam = selectedCameraId || 'CAM-021';
      const res = await fetch(`${getApiBase()}/api/cameras/${targetCam}/capture-person`);
      if (res.ok) {
        const data = await res.json();
        if (data.photoUrl) {
          setUnknownDetectionData({ trackId: data.trackId, photoUrl: data.photoUrl });
          setIsEnrollModalOpen(true);
          playAlertSound('Medium');
          return;
        }
      }
    } catch (e) {
      console.warn('Live capture fetch fallback:', e);
    }

    const randomTrackId = `TRK-2025-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomPhoto = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face';
    setUnknownDetectionData({ trackId: randomTrackId, photoUrl: randomPhoto });
    setIsEnrollModalOpen(true);
    playAlertSound('Medium');
  };

  const enrollPerson = async (formData: any): Promise<Person | null> => {
    const res = await fetch(`${getApiBase()}/api/persons/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const enrolled = await res.json();
      setPersons(prev => upsertItem(prev, enrolled, 'person_id'));
      return enrolled;
    }
    return null;
  };

  const resolveAlert = async (alertId: string, notes: string) => {
    const res = await fetch(`${getApiBase()}/api/alerts/${alertId}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes, status: 'Resolved' })
    });
    if (res.ok) {
      const resolved = await res.json();
      setAlerts(prev => prev.map(a => (a.id === alertId || a.alert_id === alertId) ? resolved : a));
    }
  };

  const simulateAlert = async (type: AlertType, roomName: string = 'Server Room') => {
    const res = await fetch(`${getApiBase()}/api/alerts/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alert_type: type, room_name: roomName })
    });
    if (res.ok) {
      const alert = await res.json();
      setAlerts(prev => upsertItem(prev, alert, 'id'));
      playAlertSound(alert.severity);
    }
  };

  // --- Smart Class Attendance Intelligence Actions ---

  const markAttendance = async (
    personId: string, 
    status: AttendanceStatus, 
    notes?: string, 
    course?: string, 
    room?: string
  ): Promise<AttendanceRecord | null> => {
    try {
      const res = await fetch(`${getApiBase()}/api/attendance/mark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person_id: personId, status, notes, course, room })
      });
      if (res.ok) {
        const updated = await res.json();
        setAttendanceRecords(prev => upsertItem(prev, updated, 'person_id'));
        setPersons(prev => prev.map(p => p.person_id === personId ? { ...p, attendance_status: status, attendance_time: updated.timestamp } : p));
        return updated;
      }
    } catch (e) {
      console.warn('Attendance mark offline fallback:', e);
    }

    const nowTime = new Date().toLocaleTimeString('en-US');
    const existing = attendanceRecords.find(a => a.person_id === personId);
    if (existing) {
      const updated: AttendanceRecord = { ...existing, status, notes: notes || existing.notes, timestamp: nowTime };
      setAttendanceRecords(prev => prev.map(a => a.person_id === personId ? updated : a));
      setPersons(prev => prev.map(p => p.person_id === personId ? { ...p, attendance_status: status, attendance_time: nowTime } : p));
      return updated;
    }
    return null;
  };

  const triggerAttendanceScan = async () => {
    try {
      const res = await fetch(`${getApiBase()}/api/attendance/scan`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.records && Array.isArray(data.records)) {
          setAttendanceRecords(data.records);
          playAlertSound('Low');
          return;
        }
      }
    } catch (e) {
      console.warn('Attendance scan fallback:', e);
    }

    // Optimistic simulated AI camera biometric verification
    const nowTime = new Date().toLocaleTimeString('en-US');
    setAttendanceRecords(prev => prev.map(r => ({
      ...r,
      status: r.status === 'Proxy Flagged' ? 'Proxy Flagged' : 'Verified',
      confidence_score: r.status === 'Proxy Flagged' ? 0.65 : 0.98,
      timestamp: nowTime
    })));
    playAlertSound('Low');
  };

  const exportAttendanceCSV = (course?: string) => {
    const list = course ? attendanceRecords.filter(a => a.course?.toLowerCase().includes(course.toLowerCase())) : attendanceRecords;
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Record ID,Student/Faculty ID,Full Name,Role,Department,Course,Classroom Zone,Status,Time In,Biometric Confidence,Verified Camera,Notes\n"
      + list.map(r => `"${r.id}","${r.student_id || r.person_id}","${r.name}","${r.role}","${r.department || 'N/A'}","${r.course || 'N/A'}","${r.room}","${r.status}","${r.timestamp}","${Math.round(r.confidence_score * 100)}%","${r.verified_camera_id}","${r.notes || ''}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `eagle_eye_smart_class_attendance_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchPersonTimeline = async (personId: string): Promise<MovementEvent[]> => {
    try {
      const res = await fetch(`${getApiBase()}/api/persons/${personId}/timeline`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}

    return [
      { id: 'm1', person_id: personId, track_id: 'TRK-26-000567', timestamp: '09:02:11 AM', camera_id: 'CAM-001', building: activeBuilding, floor: 'Floor 1', room: 'Main Entrance Gate 1', event_type: 'ENTER', dwell_time_seconds: 35 },
      { id: 'm2', person_id: personId, track_id: 'TRK-26-000567', timestamp: '09:05:02 AM', camera_id: 'CAM-003', building: activeBuilding, floor: 'Floor 1', room: 'Lobby & Turnstile', event_type: 'VERIFIED', dwell_time_seconds: 50 },
      { id: 'm3', person_id: personId, track_id: 'TRK-26-000567', timestamp: '09:08:17 AM', camera_id: 'CAM-015', building: activeBuilding, floor: 'Floor 2', room: 'Elevator Lobby', event_type: 'TRANSIT', dwell_time_seconds: 45 },
      { id: 'm4', person_id: personId, track_id: 'TRK-26-000567', timestamp: '09:10:02 AM', camera_id: 'CAM-014', building: activeBuilding, floor: 'Floor 2', room: 'Central Corridor', event_type: 'TRANSIT', dwell_time_seconds: 60 },
      { id: 'm5', person_id: personId, track_id: 'TRK-26-000567', timestamp: '09:12:04 AM', camera_id: 'CAM-021', building: activeBuilding, floor: 'Floor 2', room: 'Lecture Hall 101', event_type: 'ATTENDANCE_VERIFIED', dwell_time_seconds: 4320 }
    ];
  };

  const fetchPersonAppearances = async (personId: string): Promise<AppearanceSnapshot[]> => {
    try {
      const res = await fetch(`${getApiBase()}/api/persons/${personId}/appearances`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}

    const p = persons.find(x => x.person_id === personId);
    return [
      { id: 'app-1', person_id: personId, date: 'Today', time: '09:12 AM', photo_url: p?.today_appearance_url || p?.photo_url || '', outfit_description: `${p?.role || 'Student'} Attire & ID Badge`, is_today: true },
      { id: 'app-2', person_id: personId, date: 'Yesterday', time: '09:05 AM', photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', outfit_description: 'Charcoal Gray Crew Neck & Denim', is_today: false },
      { id: 'app-3', person_id: personId, date: '2 days ago', time: '09:10 AM', photo_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=face', outfit_description: 'Red Plaid Button-Down Shirt', is_today: false }
    ];
  };

  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleLockdown = () => setIsLockdownMode(prev => !prev);

  const selectedPerson = persons.find(p => p.person_id === selectedPersonId) || persons[0] || null;
  const selectedCamera = cameras.find(c => c.camera_id === selectedCameraId) || cameras[0] || null;
  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || null;

  return (
    <SecurityContext.Provider value={{
      stats,
      persons,
      rooms,
      cameras,
      alerts,
      rules,
      buildings,
      attendanceRecords,
      selectedPerson,
      selectedPersonId,
      selectedCamera,
      selectedCameraId,
      selectedRoom,
      activeFloor,
      activeBuilding,
      soundEnabled,
      isLockdownMode,
      isEnrollModalOpen,
      isConnectCamModalOpen,
      unknownDetectionData,
      isConnected,
      setSelectedPersonId,
      setSelectedCameraId,
      setSelectedRoomId,
      setActiveFloor,
      setActiveBuilding,
      toggleSound,
      toggleLockdown,
      setIsEnrollModalOpen,
      setIsConnectCamModalOpen,
      triggerUnknownPersonPrompt,
      enrollPerson,
      resolveAlert,
      simulateAlert,
      markAttendance,
      triggerAttendanceScan,
      exportAttendanceCSV,
      fetchPersonTimeline,
      fetchPersonAppearances,
      connectCamera,
      connectLaptopWebcam,
      connectMobileCamera,
      disconnectCamera,
      reconnectCamera,
      deleteCamera,
      testCameraConnection,
      createBuilding,
      deleteBuilding,
      addFloor,
      deleteFloor,
      addRoom,
      deleteRoom,
      uploadBlueprint,
      saveBlueprint,
      approvalRequests,
      submitApprovalRequest,
      updateApprovalRequestStatus,
      deleteApprovalRequest,
      deleteUserProfile
    }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity must be used within SecurityProvider');
  return context;
};
