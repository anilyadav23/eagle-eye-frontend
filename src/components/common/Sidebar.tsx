import React from 'react';
import { 
  LayoutDashboard, Map, UserCheck, History, ShieldAlert, 
  Camera, BarChart3, UserPlus, PenTool, Building2, Layers,
  GraduationCap, Calendar, User, Cpu, Sparkles, UserCheck2, LogOut
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { useAuth } from '../../context/AuthContext';
import { NavTab } from '../../types';

export type { NavTab };

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { alerts, stats, attendanceRecords } = useSecurity();
  const { user, logout } = useAuth();
  const activeAlertsCount = alerts.filter(a => a.status === 'Active').length;
  const verifiedCount = attendanceRecords.filter(a => a.status === 'Verified').length;

  const role = user?.role || 'Admin';

  // Role-filtered navigation lists
  const getNavItems = () => {
    if (role === 'HOD') {
      return [
        {
          group: 'Department Leadership',
          items: [
            { id: 'hod', label: 'HOD Executive Portal', icon: Building2, badge: 'HOD', badgeColor: 'bg-indigo-600' },
            { id: 'timetable', label: 'Department Timetable', icon: Calendar, badge: '18 Classes', badgeColor: 'bg-purple-600' },
            { id: 'registration', label: 'Student Admissions & KYC', icon: UserPlus, badge: 'Review', badgeColor: 'bg-pink-600' },
          ]
        },
        {
          group: 'Spatial & Surveillance Access',
          items: [
            { id: 'cameras', label: 'Department Cameras', icon: Camera, badge: `${stats.cameras_online}` },
            { id: 'map', label: 'Campus Map & Zones', icon: Map, badge: `${stats.total_in_building}` },
            { id: 'analytics', label: 'Department Performance', icon: BarChart3, badge: null }
          ]
        }
      ];
    }

    if (role === 'Teacher') {
      return [
        {
          group: 'Faculty Classroom Desk',
          items: [
            { id: 'teacher', label: 'Classroom Roll Call', icon: UserCheck2, badge: 'Live', badgeColor: 'bg-emerald-600' },
            { id: 'attendance', label: 'Attendance History', icon: GraduationCap, badge: `${verifiedCount}/${attendanceRecords.length}`, badgeColor: 'bg-emerald-600' },
            { id: 'timetable', label: 'My Teaching Schedule', icon: Calendar, badge: 'Active', badgeColor: 'bg-purple-600' },
          ]
        },
        {
          group: 'Class Surveillance',
          items: [
            { id: 'cameras', label: 'Classroom Stream Feed', icon: Camera, badge: 'Online' },
          ]
        }
      ];
    }

    if (role === 'Student') {
      return [
        {
          group: 'Student Academic Portal',
          items: [
            { id: 'student', label: 'My Attendance & 75% Goal', icon: User, badge: 'Personal', badgeColor: 'bg-sky-600' },
            { id: 'timetable', label: 'My Class Schedule', icon: Calendar, badge: 'Today', badgeColor: 'bg-purple-600' },
          ]
        }
      ];
    }

    // Default for Admin / Guard
    return [
      {
        group: 'Academic Blueprint Portals',
        items: [
          { id: 'hod', label: 'HOD Department Portal', icon: Building2, badge: 'HOD', badgeColor: 'bg-indigo-600' },
          { id: 'teacher', label: 'Teacher Dashboard', icon: UserCheck2, badge: 'Live', badgeColor: 'bg-emerald-600' },
          { id: 'student', label: 'Student Portal', icon: User, badge: 'Student', badgeColor: 'bg-sky-600' },
          { id: 'attendance', label: 'Attendance Intelligence', icon: GraduationCap, badge: `${verifiedCount}/${attendanceRecords.length}`, badgeColor: 'bg-emerald-600' },
          { id: 'timetable', label: 'Timetable & Rosters', icon: Calendar, badge: '18 Classes', badgeColor: 'bg-purple-600' },
          { id: 'registration', label: 'Student Registration', icon: UserPlus, badge: 'New', badgeColor: 'bg-pink-600' },
          { id: 'aiops', label: 'AI Ops & Health', icon: Cpu, badge: '99.1%', badgeColor: 'bg-purple-600' },
        ]
      },
      {
        group: 'Spatial Surveillance & AI Core',
        items: [
          { id: 'dashboard', label: 'Live Master Dashboard', icon: LayoutDashboard, badge: null },
          { id: 'map', label: '2D Campus Map', icon: Map, badge: `${stats.total_in_building}` },
          { id: 'blueprint', label: 'Blueprint CAD Studio', icon: PenTool, badge: 'CAD', badgeColor: 'bg-purple-600' },
          { id: 'tracking', label: 'Student & Staff Dossier', icon: UserCheck, badge: null },
          { id: 'appearance', label: 'Daily Appearance Vault', icon: History, badge: 'AI' },
          { id: 'rules', label: 'Security & Alerts', icon: ShieldAlert, badge: activeAlertsCount > 0 ? `${activeAlertsCount}` : null, badgeColor: 'bg-red-500' },
          { id: 'cameras', label: 'Camera Matrix', icon: Camera, badge: `${stats.cameras_online}` },
          { id: 'analytics', label: 'Institutional ROI & Pitch', icon: BarChart3, badge: null },
        ]
      }
    ];
  };

  const navGroups = getNavItems();

  return (
    <aside className="w-64 bg-cyber-dark/95 border-r border-cyber-border flex flex-col justify-between p-3 select-none overflow-y-auto">
      <div className="space-y-4">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className={`space-y-1 ${gIdx > 0 ? 'pt-2 border-t border-slate-800/80' : ''}`}>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-400 font-mono flex items-center justify-between">
              <span>{group.group}</span>
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as NavTab)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm shadow-sky-500/10 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white font-mono ${
                      item.badgeColor || (isActive ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Session Footer Card */}
      <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold text-xs font-mono">
              {role.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">{user?.full_name || user?.username}</div>
              <div className="text-[10px] text-sky-400 font-mono font-semibold">{role} Account</div>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign out of current account"
            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
