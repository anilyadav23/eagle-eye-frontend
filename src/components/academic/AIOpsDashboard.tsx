import React, { useState } from 'react';
import { 
  Cpu, Activity, Camera, ShieldCheck, AlertTriangle, 
  RefreshCw, CheckCircle2, Sliders, Database, Layers, 
  Download, Eye, BarChart2, Radio, Server
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const AIOpsDashboard: React.FC = () => {
  const { cameras } = useSecurity();
  const [activeTab, setActiveTab] = useState<'health' | 'models' | 'coverage' | 'reports'>('health');
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainProgress, setRetrainProgress] = useState(0);

  const startFineTuning = () => {
    setIsRetraining(true);
    setRetrainProgress(15);
    const interval = setInterval(() => {
      setRetrainProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRetraining(false);
          return 100;
        }
        return prev + 25;
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* AI Ops Header (Page 10) */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20 border border-purple-400/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">AI Operations & System Health Dashboard</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                Monitor • Manage • Optimize
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Real-time camera registry, stream health telemetry, ArcFace/YOLOv8 accuracy, liveness anti-spoofing, and coverage dead-spot detection.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'health' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Camera & Stream Health
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'models' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Models & Fine-Tuning
          </button>
          <button
            onClick={() => setActiveTab('coverage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'coverage' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Coverage & Dead-Spots
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'reports' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Academic Pitch & ROI
          </button>
        </div>
      </div>

      {/* Top AI Ops Metric Ribbons (Page 10) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30">
          <div className="text-xs text-slate-400 font-medium">Face Detection Rate</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">98.4%</div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">YOLOv8 Nano inference ~14ms</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-sky-500/30">
          <div className="text-xs text-slate-400 font-medium">Recognition Accuracy</div>
          <div className="text-2xl font-bold font-mono text-sky-400 mt-1">99.1%</div>
          <div className="text-[11px] text-sky-400/80 mt-0.5">ArcFace 512-D embeddings</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-purple-500/30">
          <div className="text-xs text-slate-400 font-medium">Liveness / Anti-Spoofing</div>
          <div className="text-2xl font-bold font-mono text-purple-300 mt-1">100% Active</div>
          <div className="text-[11px] text-purple-400/80 mt-0.5">Photo & screen attack blocked</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-amber-500/30">
          <div className="text-xs text-slate-400 font-medium">Camera Streams Online</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {cameras.filter(c => c.status === 'Online').length} / {cameras.length}
          </div>
          <div className="text-[11px] text-amber-400/80 mt-0.5">0 stream dropouts</div>
        </div>
      </div>

      {activeTab === 'health' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Camera Registry & Stream Telemetry */}
          <div className="lg:col-span-8 space-y-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center justify-between">
                <span>Active Camera Registry & Stream Telemetry</span>
                <span className="text-xs font-mono text-slate-400">All RTSP / ONVIF Endpoints</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-800 font-mono text-[11px] text-slate-400">
                      <th className="p-3">Camera Node</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Resolution & FPS</th>
                      <th className="p-3">Latency</th>
                      <th className="p-3">Stream Health</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {[
                      { id: 'CAM-001', name: 'Lecture Hall 101 Front', loc: 'LH-101', res: '4K @ 30fps', lat: '14ms', health: 'Optimal', status: 'Online' },
                      { id: 'CAM-002', name: 'Lecture Hall 101 Rear', loc: 'LH-101', res: '1080p @ 30fps', lat: '16ms', health: 'Optimal', status: 'Online' },
                      { id: 'CAM-021', name: 'Room 203 Podium Cam', loc: 'Room 203', res: '1080p @ 30fps', lat: '18ms', health: 'Optimal', status: 'Online' },
                      { id: 'CAM-022', name: 'AI Vision Lab Optical', loc: 'Lab 1', res: '4K @ 30fps', lat: '12ms', health: 'Optimal', status: 'Online' },
                      { id: 'CAM-031', name: 'Central Corridor West', loc: 'Corridor', res: '1080p @ 30fps', lat: '21ms', health: 'Good', status: 'Online' }
                    ].map((cam, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-3 font-bold text-white font-sans">{cam.name} ({cam.id})</td>
                        <td className="p-3 text-slate-300">{cam.loc}</td>
                        <td className="p-3 text-sky-400">{cam.res}</td>
                        <td className="p-3 text-slate-200">{cam.lat}</td>
                        <td className="p-3 text-emerald-400">{cam.health}</td>
                        <td className="p-3 text-right">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                            {cam.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Technical Alerts & Health Monitor (Page 10) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Technical Alerts & Diagnostics</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Stream Auto-Reconnect</div>
                    <div className="text-[11px] text-slate-400">Zero connection drops over last 24h</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Lighting Quality Score: 94/100</div>
                    <div className="text-[11px] text-slate-400">Classroom illumination verified for face crops</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Liveness Threshold: High (0.85)</div>
                    <div className="text-[11px] text-slate-400">Prevents photos, videos & mobile proxies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'models' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-base">Model Management & Fine-Tuning Workflow</h3>
              <p className="text-xs text-slate-400">
                Retrain and fine-tune ArcFace biometric embeddings with newly approved student registration photos.
              </p>
            </div>
            
            <button
              onClick={startFineTuning}
              disabled={isRetraining}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-2 transition-all shadow disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRetraining ? 'animate-spin' : ''}`} />
              <span>{isRetraining ? `Retraining (${retrainProgress}%)...` : 'Retrain & Fine-Tune Model'}</span>
            </button>
          </div>

          {isRetraining && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-purple-300">Processing approved student facial crops...</span>
                <span className="text-white">{retrainProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-300" style={{ width: `${retrainProgress}%` }} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm">1. YOLOv8x Object & Silhouette</div>
              <p className="text-xs text-slate-400">Detects all student silhouettes, postures, and spatial coordinates across desk rows.</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">Latency: 8.2ms</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm">2. ArcFace Biometric Embeddings</div>
              <p className="text-xs text-slate-400">Generates 512-dimensional vector representations matching student master database.</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-bold">Accuracy: 99.1%</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="font-bold text-white text-sm">3. Liveness Anti-Spoofing</div>
              <p className="text-xs text-slate-400">Analyzes micro-textures and motion cues to reject printed photos or screen recordings.</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-400 font-bold">Confidence: 99.8%</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'coverage' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Classroom & Floor Coverage Dead-Spot Detection</h3>
          <p className="text-xs text-slate-400">
            Automated analysis of camera field-of-view (FOV) angles to ensure every student seat is covered without blind spots.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">Lecture Hall 101</span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">100% Covered (Dual-Angle)</span>
              </div>
              <p className="text-[11px] text-slate-400">CAM-001 Front (90° FOV) + CAM-002 Rear (110° FOV). Zero blind spots detected.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">Room 203 (Grade 10 Science)</span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">96% Covered</span>
              </div>
              <p className="text-[11px] text-slate-400">CAM-021 Podium mount. Minor occlusion near back-left corner desk.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Pitch Value / Why Eagle Eye? (Page 10)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <div className="font-bold text-emerald-300 text-sm">Automates Attendance</div>
              <p className="text-slate-300">Saves faculty 10-15 minutes of lecture time per session. Zero manual paper roll calls.</p>
            </div>

            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2">
              <div className="font-bold text-red-300 text-sm">Reduces Proxy Attendance</div>
              <p className="text-slate-300">AI face recognition + periodic checks (every 15-30s) eliminate proxy sign-ins completely.</p>
            </div>

            <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-2">
              <div className="font-bold text-sky-300 text-sm">Department Visibility</div>
              <p className="text-slate-300">Provides HODs & deans with transparent real-time classroom operations, timetables, and shortage alerts.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
