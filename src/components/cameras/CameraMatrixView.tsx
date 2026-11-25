import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera as CameraIcon, Video, Link2, Unlink, Plus, Trash2, 
  CheckCircle2, AlertCircle, RefreshCw, Layers, ShieldCheck, Power,
  MapPin, Edit3, Save, X, BookOpen, Clock, Radio
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { Camera } from '../../types';
import { getCameraLiveStreamUrl } from '../../config/api';
import { OFFICIAL_TIMETABLES, TimetablePeriod } from '../../data/timetableCatalog';

// Classroom Options matching official Department Timetable
export const TIMETABLE_ROOM_OPTIONS = [
  { value: 'Room EC-6', label: 'Room EC-6 (Main Lecture Hall)' },
  { value: 'Room EC-1', label: 'Room EC-1 (Lecture Hall)' },
  { value: 'Lab EC-10', label: 'Lab EC-10 (VLSI Simulation Lab)' },
  { value: 'Lab EC-11', label: 'Lab EC-11 (Embedded & Advance Computer Lab)' },
  { value: 'Lab L-5', label: 'Lab L-5 (Computer Network Lab)' },
  { value: 'Room EC-5(B)', label: 'Room EC-5(B) (Minor Project Lab)' },
  { value: 'ECE Corridor', label: 'ECE Corridor (Surveillance)' },
  { value: 'Faculty & Dean Lounge', label: 'Faculty & Dean Lounge' },
];

// Helper to determine active scheduled slot for a given room
function getActiveSlotForRoom(roomName: string): { slot: TimetablePeriod | null; status: 'In Progress' | 'Upcoming' | 'Scheduled' } {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const dayName = days[now.getDay()];

  // Look through ECC-7 official timetable for today
  const daySlots = OFFICIAL_TIMETABLES['ECC-7']?.schedule[dayName] || [];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Find slot that includes roomName
  for (const slot of daySlots) {
    const cleanSlotRoom = slot.room.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTargetRoom = roomName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check match or partial match (e.g., "EC-11 / L-5 / EC-10" matches "Lab EC-11")
    if (cleanSlotRoom.includes(cleanTargetRoom) || cleanTargetRoom.includes(cleanSlotRoom)) {
      if (slot.startTime && slot.endTime) {
        const [sh, sm] = slot.startTime.split(':').map(Number);
        const [eh, em] = slot.endTime.split(':').map(Number);
        const startTotal = sh * 60 + sm;
        const endTotal = eh * 60 + em;
        if (currentMinutes >= startTotal && currentMinutes <= endTotal) {
          return { slot, status: 'In Progress' };
        } else if (currentMinutes < startTotal) {
          return { slot, status: 'Upcoming' };
        }
      }
      return { slot, status: 'Scheduled' };
    }
  }

  // Fallback: match first period of the day for demonstration if outside daytime hours
  const matchingAny = daySlots.find(s => {
    const cleanSlotRoom = s.room.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanTargetRoom = roomName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanSlotRoom.includes(cleanTargetRoom) || cleanTargetRoom.includes(cleanSlotRoom);
  });

  return { slot: matchingAny || null, status: 'Scheduled' };
}

// Subcomponent for individual Camera Stream Card with Local Webcam WebRTC + Backend Stream Fallback
const CameraCard: React.FC<{
  cam: Camera;
  onToggle: (cam: Camera) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Camera>) => void;
}> = ({ cam, onToggle, onDelete, onUpdate }) => {
  const isConnected = cam.connection_status === 'Connected';
  const isConnecting = cam.connection_status === 'Connecting';
  const isLocalWebcam = cam.stream_type === 'USB Local' || cam.brand === 'Local USB / Built-in Webcam' || cam.camera_id === 'CAM-LAPTOP';

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(cam.name);
  const [editRoom, setEditRoom] = useState<string>(cam.room);

  // Sync with active timetable
  const activeClass = getActiveSlotForRoom(cam.room);

  // Native HTML5 Browser Webcam WebRTC Hook
  useEffect(() => {
    let active = true;

    if (isLocalWebcam && isConnected) {
      navigator.mediaDevices?.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      })
      .then(stream => {
        if (!active) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
        setWebcamError(null);
      })
      .catch(err => {
        console.warn('Local webcam access failed:', err);
        setWebcamError('Webcam permission denied or device busy');
      });
    } else {
      // Disconnected or non-webcam: stop tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, [isLocalWebcam, isConnected]);

  const handleSaveEdit = () => {
    onUpdate(cam.camera_id, {
      name: editName.trim() || cam.name,
      room: editRoom
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`glass-panel rounded-2xl p-4 border transition-all space-y-3 ${
        isConnected
          ? 'border-slate-800 hover:border-sky-500/60 shadow-lg shadow-sky-950/20'
          : 'border-red-900/40 bg-red-950/20 opacity-80'
      }`}
    >
      {/* Card Header: Status, Name, Edit Trigger, Connection Power Toggle */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2 p-2 bg-slate-900 rounded-xl border border-slate-700">
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Camera Name"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-semibold"
              />
              <select
                value={editRoom}
                onChange={e => setEditRoom(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
              >
                {TIMETABLE_ROOM_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-2.5 py-1 rounded bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-bold flex items-center gap-1"
                >
                  <Save className="w-3 h-3" /> Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[11px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  isConnected ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse' : isConnecting ? 'bg-amber-400 animate-pulse' : 'bg-red-500'
                }`} />
                <h3 className="font-bold text-xs text-white truncate" title={cam.name}>
                  {cam.name}
                </h3>
                <button
                  onClick={() => { setIsEditing(true); setEditName(cam.name); setEditRoom(cam.room); }}
                  title="Edit camera name & classroom assignment"
                  className="text-slate-400 hover:text-sky-300 p-0.5 rounded transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>

              <div className="text-[10px] text-slate-400 font-mono flex items-center flex-wrap gap-1.5">
                <span className="font-bold text-sky-400">{cam.camera_id}</span>
                <span>•</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {cam.brand}
                </span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-0.5 font-semibold">
                  <MapPin className="w-2.5 h-2.5" />
                  {cam.room}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Connect / Disconnect Toggle Button */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            onClick={() => onToggle(cam)}
            title={isConnected ? 'Disconnect Camera Stream' : 'Connect Camera Stream'}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center space-x-1 border transition-all ${
              isConnected
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50 hover:bg-red-950 hover:text-red-300 hover:border-red-600'
                : isConnecting
                ? 'bg-amber-950 text-amber-300 border-amber-600'
                : 'bg-red-950/60 text-red-300 border-red-600/50 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-600'
            }`}
          >
            <Power className="w-3 h-3" />
            <span>{isConnected ? 'ONLINE' : isConnecting ? 'CONNECTING...' : 'DISCONNECTED'}</span>
          </button>

          <button
            onClick={() => onDelete(cam.camera_id)}
            title="Remove Camera"
            className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Viewport: Real Browser WebRTC for Webcam OR Backend MJPEG Stream */}
      <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden group">
        {isConnected ? (
          isLocalWebcam ? (
            webcamError ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-amber-400 space-y-1 p-3 text-center bg-slate-950">
                <AlertCircle className="w-7 h-7 text-amber-400" />
                <span className="text-xs font-bold">{webcamError}</span>
                <span className="text-[10px] text-slate-400 font-mono">Allow camera permissions in browser URL bar</span>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <img
              src={getCameraLiveStreamUrl(cam.camera_id)}
              alt={cam.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // If backend tunnel is unavailable, render an aesthetic optical simulation canvas
                const target = e.target as HTMLElement;
                target.style.display = 'none';
              }}
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 space-y-1">
            <Unlink className="w-8 h-8 text-slate-700" />
            <span className="text-[11px] font-mono">Stream Disconnected</span>
          </div>
        )}

        {/* Live HUD Overlay Badges */}
        <div className="absolute top-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[9px] font-mono text-slate-200 backdrop-blur-sm flex items-center gap-1.5 border border-slate-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{cam.floor} • {cam.room}</span>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/75 px-2 py-0.5 rounded text-[9px] font-mono text-emerald-400 backdrop-blur-sm border border-slate-700/50">
          {cam.fps} FPS • {cam.resolution.split(' ')[0]}
        </div>

        {/* Optical Scanning Grid Effect */}
        {isConnected && (
          <div className="absolute inset-0 pointer-events-none border border-emerald-500/20 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent bg-[length:100%_4px] opacity-40" />
        )}
      </div>

      {/* Classroom Timetable Dynamic Synchronization Badge */}
      <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1 font-mono">
            <BookOpen className="w-3 h-3 text-sky-400" />
            Classroom Sync:
          </span>
          {activeClass.slot ? (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
              activeClass.status === 'In Progress'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
            }`}>
              {activeClass.status === 'In Progress' ? 'Active Class Live' : activeClass.status}
            </span>
          ) : (
            <span className="text-[10px] font-mono text-slate-500">No Class in {cam.room} Today</span>
          )}
        </div>

        {activeClass.slot && (
          <div className="text-[11px] text-slate-300 font-mono truncate">
            <strong className="text-white">{activeClass.slot.subjectCode}</strong>: {activeClass.slot.subjectName}
            <div className="text-[10px] text-slate-400">
              Faculty: {activeClass.slot.facultyName} ({activeClass.slot.facultyCode}) • {activeClass.slot.timeSlot}
            </div>
          </div>
        )}
      </div>

      {/* Technical Specifications Bar */}
      <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-xs font-mono">
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Stream Type:</span>
          <span className="text-slate-200 font-bold">{cam.stream_type}</span>
        </div>
        {cam.stream_url && (
          <div className="flex justify-between text-[10px] text-slate-400 truncate">
            <span>Source:</span>
            <span className="text-sky-400 truncate max-w-[200px]" title={cam.stream_url}>
              {cam.stream_url}
            </span>
          </div>
        )}
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>AI Models:</span>
          <span className="text-emerald-400">{cam.ai_models.join(' • ')}</span>
        </div>
      </div>
    </div>
  );
};

export const CameraMatrixView: React.FC = () => {
  const { 
    cameras, stats, setIsConnectCamModalOpen, 
    disconnectCamera, reconnectCamera, deleteCamera, updateCamera,
    connectLaptopWebcam
  } = useSecurity();

  const [filter, setFilter] = useState<'all' | 'connected' | 'real' | 'disconnected'>('all');
  const [connectingWebcam, setConnectingWebcam] = useState(false);

  const filteredCameras = cameras.filter(cam => {
    if (filter === 'connected') return cam.connection_status === 'Connected';
    if (filter === 'disconnected') return cam.connection_status === 'Disconnected';
    if (filter === 'real') return cam.is_real_camera;
    return true;
  });

  const handleToggleConnection = async (cam: Camera) => {
    if (cam.connection_status === 'Connected') {
      await disconnectCamera(cam.camera_id);
    } else {
      await reconnectCamera(cam.camera_id);
    }
  };

  const handleAddLaptopWebcam = async () => {
    setConnectingWebcam(true);
    try {
      await connectLaptopWebcam(0, 'Room EC-6');
    } catch (e) {
      console.error(e);
    } finally {
      setConnectingWebcam(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <CameraIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <span>Universal Camera Ingestion & Stream Matrix</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {cameras.filter(c => c.connection_status === 'Connected').length} / {cameras.length} Active Nodes
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Laptop Webcams • Hikvision • Dahua • Axis • CP Plus • Reolink • RTSP • ONVIF
            </p>
          </div>
        </div>

        {/* Add Real Camera Button & Filters */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Filters */}
          <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'all' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({cameras.length})
            </button>
            <button
              onClick={() => setFilter('real')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'real' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Real Cameras ({cameras.filter(c => c.is_real_camera).length})
            </button>
            <button
              onClick={() => setFilter('connected')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'connected' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Connected
            </button>
            <button
              onClick={() => setFilter('disconnected')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filter === 'disconnected' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Disconnected
            </button>
          </div>

          {/* Quick Connect Laptop Webcam Button */}
          <button
            onClick={handleAddLaptopWebcam}
            disabled={connectingWebcam}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-all"
          >
            <Video className="w-4 h-4 text-sky-400" />
            <span>{connectingWebcam ? 'Activating...' : '+ Laptop Webcam'}</span>
          </button>

          <button
            onClick={() => setIsConnectCamModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Real Camera</span>
          </button>
        </div>
      </div>

      {/* Camera Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCameras.map((cam) => (
          <CameraCard
            key={cam.camera_id}
            cam={cam}
            onToggle={handleToggleConnection}
            onDelete={deleteCamera}
            onUpdate={updateCamera}
          />
        ))}
      </div>
    </div>
  );
};
