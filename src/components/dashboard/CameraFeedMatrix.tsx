import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Maximize2, Radio, Video, Layers, Crosshair, 
  AlertCircle, Eye, RefreshCw, UserPlus, Sparkles, MonitorPlay, ShieldCheck 
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { getCameraLiveStreamUrl, getCameraCaptureUrl } from '../../config/api';

export const CameraFeedMatrix: React.FC = () => {
  const { 
    cameras, selectedCameraId, setSelectedCameraId, 
    triggerUnknownPersonPrompt, isConnected 
  } = useSecurity();

  const [streamError, setStreamError] = useState<boolean>(false);
  const [imgKey, setImgKey] = useState<number>(Date.now());
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [forceSimulatedStream, setForceSimulatedStream] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active camera selection
  const activeCam = cameras.find(c => c.camera_id === selectedCameraId) || cameras[0] || {
    camera_id: 'CAM-021',
    name: 'Lecture Hall 101 Pod A',
    building: 'Academic Block A',
    floor: 'Floor 1',
    room: 'Lecture Hall 101',
    resolution: '1080p Full HD',
    fps: 30,
    latency_ms: 18,
    status: 'Online',
    is_real_camera: false,
    brand: 'Hikvision'
  };

  useEffect(() => {
    setStreamError(false);
    setImgKey(Date.now());
  }, [selectedCameraId]);

  const handleRefreshStream = () => {
    setStreamError(false);
    setForceSimulatedStream(false);
    setImgKey(Date.now());
  };

  const handleCaptureAndEnroll = async () => {
    setIsCapturing(true);
    try {
      const res = await fetch(getCameraCaptureUrl(activeCam.camera_id));
      if (res.ok) {
        const data = await res.json();
        if (data.photoUrl) {
          triggerUnknownPersonPrompt(data.trackId, data.photoUrl);
          return;
        }
      }
      triggerUnknownPersonPrompt();
    } catch (e) {
      console.error('Capture error:', e);
      triggerUnknownPersonPrompt();
    } finally {
      setIsCapturing(false);
    }
  };

  // Canvas-based Simulated Smart Classroom Stream
  useEffect(() => {
    if (!streamError && !forceSimulatedStream) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const students = [
      { name: 'Rahul Sharma', id: 'STU-10087', role: 'Student', baseX: 0.28, baseY: 0.42, w: 90, h: 140, conf: 98.4, status: 'Verified' },
      { name: 'Ananya Verma', id: 'STU-10092', role: 'Student', baseX: 0.52, baseY: 0.45, w: 85, h: 135, conf: 96.7, status: 'Verified' },
      { name: 'Dr. Rajesh Iyer', id: 'FAC-2001', role: 'Professor', baseX: 0.78, baseY: 0.35, w: 100, h: 155, conf: 99.2, status: 'Instructor' },
      { name: 'Kabir Mehta', id: 'STU-10144', role: 'Student', baseX: 0.15, baseY: 0.55, w: 95, h: 145, conf: 62.1, status: 'Proxy Suspected' },
      { name: 'Rohan Gupta', id: 'STU-10105', role: 'Student', baseX: 0.40, baseY: 0.62, w: 90, h: 140, conf: 94.8, status: 'Verified' },
    ];

    const render = () => {
      t += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      // Dark Futuristic Smart Classroom Room Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#0d1527');
      bgGrad.addColorStop(1, '#050811');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Floor Perspective Grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const vanishingY = h * 0.3;
      for (let x = 0; x <= w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(w * 0.5 + (x - w * 0.5) * 0.2, vanishingY);
        ctx.stroke();
      }
      for (let y = vanishingY; y <= h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Smart Whiteboard / Projection Board Area in Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1.5;
      const boardW = w * 0.6;
      const boardH = h * 0.25;
      const boardX = (w - boardW) / 2;
      const boardY = h * 0.06;
      ctx.fillRect(boardX, boardY, boardW, boardH);
      ctx.strokeRect(boardX, boardY, boardW, boardH);

      // Board Text & Lecture Header
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('CS301: COMPUTER VISION & EMBEDDED ATTENDANCE INTELLIGENCE', boardX + 20, boardY + 28);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.font = '10px monospace';
      ctx.fillText('TOPIC: ArcFace 512-D Embeddings • Real-Time Spatial Verification', boardX + 20, boardY + 46);

      // Scanning Vertical Laser Sweep
      const sweepX = (Math.sin(t * 0.8) * 0.5 + 0.5) * w;
      const laserGrad = ctx.createLinearGradient(sweepX - 25, 0, sweepX + 25, 0);
      laserGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
      laserGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
      laserGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = laserGrad;
      ctx.fillRect(sweepX - 25, 0, 50, h);

      // Draw Students & Biometric Bounding Boxes
      students.forEach((s, idx) => {
        const driftX = Math.sin(t + idx * 1.5) * 6;
        const driftY = Math.cos(t * 0.7 + idx) * 3;
        const x = s.baseX * w + driftX;
        const y = s.baseY * h + driftY;
        const bw = s.w;
        const bh = s.h;

        // Realistic Silhouette Silhouette Body
        ctx.fillStyle = s.status === 'Proxy Suspected' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(30, 41, 59, 0.6)';
        ctx.beginPath();
        ctx.ellipse(x + bw * 0.5, y + bh * 0.2, bw * 0.22, bh * 0.16, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(x + bw * 0.15, y + bh * 0.36, bw * 0.7, bh * 0.6, [10, 10, 0, 0]);
        ctx.fill();

        // Bounding Box Colors
        const isAnomaly = s.status === 'Proxy Suspected';
        const boxColor = isAnomaly ? '#ef4444' : '#10b981';
        const glowColor = isAnomaly ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.3)';

        ctx.strokeStyle = boxColor;
        ctx.lineWidth = 1.5;

        // Corner Brackets
        const cLen = 14;
        // Top-Left
        ctx.beginPath();
        ctx.moveTo(x, y + cLen);
        ctx.lineTo(x, y);
        ctx.lineTo(x + cLen, y);
        ctx.stroke();

        // Top-Right
        ctx.beginPath();
        ctx.moveTo(x + bw - cLen, y);
        ctx.lineTo(x + bw, y);
        ctx.lineTo(x + bw, y + cLen);
        ctx.stroke();

        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(x, y + bh - cLen);
        ctx.lineTo(x, y + bh);
        ctx.lineTo(x + cLen, y + bh);
        ctx.stroke();

        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(x + bw - cLen, y + bh);
        ctx.lineTo(x + bw, y + bh);
        ctx.lineTo(x + bw, y + bh - cLen);
        ctx.stroke();

        // Face Landmark Reticle
        const fx = x + bw * 0.5;
        const fy = y + bh * 0.2;
        ctx.strokeStyle = glowColor;
        ctx.beginPath();
        ctx.arc(fx, fy, 16, 0, Math.PI * 2);
        ctx.stroke();

        // Label Badge Tag
        const tagH = 20;
        const tagW = Math.max(130, bw + 20);
        ctx.fillStyle = isAnomaly ? 'rgba(153, 27, 27, 0.9)' : 'rgba(6, 78, 59, 0.9)';
        ctx.fillRect(x - 5, y - tagH - 4, tagW, tagH);
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 5, y - tagH - 4, tagW, tagH);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`${s.name} [${s.conf}%]`, x - 1, y - tagH + 9);

        // Subtitle Roll ID
        ctx.fillStyle = isAnomaly ? '#fca5a5' : '#6ee7b7';
        ctx.font = '8px monospace';
        ctx.fillText(`${s.id} • ${s.status}`, x - 1, y - 6);
      });

      // HUD Reticle Center Crosshair
      const chX = w / 2;
      const chY = h / 2;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(chX, chY, 35, 0, Math.PI * 2);
      ctx.moveTo(chX - 45, chY);
      ctx.lineTo(chX + 45, chY);
      ctx.moveTo(chX, chY - 45);
      ctx.lineTo(chX, chY + 45);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [streamError, forceSimulatedStream]);

  const liveStreamUrl = getCameraLiveStreamUrl(activeCam.camera_id, imgKey);
  const showCanvasFallback = streamError || forceSimulatedStream;

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3 shadow-2xl">
      {/* Header & Stream Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <span>Smart Classroom AI Optical Pod</span>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                LIVE OPTICAL REC
              </span>
              {showCanvasFallback && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-300" />
                  AI SIMULATED STREAM
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {activeCam.camera_id} • {activeCam.name} ({activeCam.floor} - {activeCam.room})
            </p>
          </div>
        </div>

        {/* Stream Actions & Camera Switcher Dropdown */}
        <div className="flex items-center space-x-2">
          {/* Toggle Simulation Mode */}
          <button
            onClick={() => setForceSimulatedStream(!forceSimulatedStream)}
            title="Toggle between hardware video stream and smart classroom computer vision simulation"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
              forceSimulatedStream
                ? 'bg-purple-600 text-white border-purple-500 shadow-sm shadow-purple-600/30'
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {forceSimulatedStream ? 'Simulation Active' : 'Simulate Class'}
            </span>
          </button>

          {/* Capture Face & Register Button */}
          <button
            onClick={handleCaptureAndEnroll}
            disabled={isCapturing}
            title="Capture Face & Enroll Target"
            className="px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Capture & Enroll</span>
          </button>

          {/* Refresh Stream Button */}
          <button
            onClick={handleRefreshStream}
            title="Reload Video Stream"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Camera Select Dropdown */}
          <select
            value={activeCam.camera_id}
            onChange={(e) => setSelectedCameraId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-sky-500 font-mono shadow-sm"
          >
            {cameras.map(c => (
              <option key={c.camera_id} value={c.camera_id}>
                {c.camera_id}: {c.name} {c.is_real_camera ? '★ [REAL]' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Video Feed / Simulated HUD Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video shadow-2xl flex items-center justify-center">
        {!showCanvasFallback ? (
          <img
            key={imgKey}
            src={liveStreamUrl}
            alt={`Live Optical Feed - ${activeCam.name}`}
            onError={() => setStreamError(true)}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <canvas
            ref={canvasRef}
            width={854}
            height={480}
            className="w-full h-full object-cover select-none"
          />
        )}

        {/* Top Left HUD Telemetry Overlay */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono space-y-0.5 text-slate-300 pointer-events-none">
          <div className="flex items-center space-x-2">
            <span className="text-sky-400 font-bold">{activeCam.camera_id}</span>
            <span>|</span>
            <span className="text-emerald-400">{activeCam.resolution || '1080p Full HD'}</span>
            <span>|</span>
            <span className="text-purple-300">{activeCam.brand}</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] text-slate-400">
            <span>FPS: <strong className="text-slate-200">{activeCam.fps || 30}</strong></span>
            <span>•</span>
            <span>Latency: <strong className="text-slate-200">{activeCam.latency_ms || 18}ms</strong></span>
            <span>•</span>
            <span>AI: <strong className="text-sky-300">ArcFace 512-D + YOLOv8</strong></span>
          </div>
        </div>

        {/* Bottom Left Attendance Live Verification Pill */}
        <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center space-x-2 pointer-events-none">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>AUTONOMOUS ATTENDANCE VERIFICATION: <strong className="text-white">SYNCHRONIZED</strong></span>
        </div>

        {/* Bottom Right AI Tracking Status Badge */}
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-mono text-slate-300 flex items-center space-x-2 pointer-events-none">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>AI OPTICAL AUTOTRACK: <strong className="text-emerald-400">ENGAGED</strong></span>
        </div>
      </div>
    </div>
  );
};
