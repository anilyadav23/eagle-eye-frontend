import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SecurityProvider } from './context/SecurityContext';
import { LoginPage } from './components/auth/LoginPage';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { NavTab } from './types';
import { LiveDashboard } from './components/dashboard/LiveDashboard';
import { InteractiveFloorMap } from './components/map/InteractiveFloorMap';
import { PersonTrackingView } from './components/tracking/PersonTrackingView';
import { DailyAppearanceVault } from './components/appearance/DailyAppearanceVault';
import { SecurityRulesManager } from './components/rules/SecurityRulesManager';
import { CameraMatrixView } from './components/cameras/CameraMatrixView';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { BlueprintStudio } from './components/blueprint/BlueprintStudio';
import { AttendanceIntelligenceView } from './components/attendance/AttendanceIntelligenceView';
import { EnrollmentModal } from './components/enrollment/EnrollmentModal';
import { ConnectCameraModal } from './components/cameras/ConnectCameraModal';

// Dedicated and Segregated Role-Based Portals
import { HODDedicatedDashboard } from './components/academic/HODDedicatedDashboard';
import { TeacherDedicatedDashboard } from './components/academic/TeacherDedicatedDashboard';
import { StudentDedicatedDashboard } from './components/academic/StudentDedicatedDashboard';
import { TimetableManagerView } from './components/academic/TimetableManagerView';
import { StudentRegistrationWorkflowView } from './components/academic/StudentRegistrationWorkflowView';
import { AIOpsDashboard } from './components/academic/AIOpsDashboard';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Automatically route user to their role-specific dashboard upon login
  useEffect(() => {
    if (user?.role) {
      if (user.role === 'HOD') {
        setActiveTab('hod');
      } else if (user.role === 'Teacher') {
        setActiveTab('teacher');
      } else if (user.role === 'Student') {
        setActiveTab('student');
      } else {
        setActiveTab('dashboard');
      }
    }
  }, [user?.role]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-dark text-slate-100 flex items-center justify-center font-mono">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-sky-400">Initializing Eagle Eye Core...</span>
        </div>
      </div>
    );
  }

  // If not logged in, render standard Web Authentication view
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const role = user?.role || 'Admin';

  // Strict Role-Based View Guard
  const renderRoleDashboard = () => {
    if (role === 'Student') {
      if (activeTab === 'timetable') return <TimetableManagerView />;
      return <StudentDedicatedDashboard />;
    }

    if (role === 'Teacher') {
      if (activeTab === 'attendance') return <AttendanceIntelligenceView />;
      if (activeTab === 'timetable') return <TimetableManagerView />;
      if (activeTab === 'cameras') return <CameraMatrixView />;
      return <TeacherDedicatedDashboard />;
    }

    if (role === 'HOD') {
      if (activeTab === 'attendance') return <AttendanceIntelligenceView />;
      if (activeTab === 'timetable') return <TimetableManagerView />;
      if (activeTab === 'registration') return <StudentRegistrationWorkflowView />;
      if (activeTab === 'cameras') return <CameraMatrixView />;
      if (activeTab === 'map') return <InteractiveFloorMap onSelectPerson={() => setActiveTab('tracking')} onOpenStudio={() => setActiveTab('blueprint')} />;
      if (activeTab === 'analytics') return <AnalyticsDashboard />;
      return <HODDedicatedDashboard onNavigateTab={setActiveTab} />;
    }

    // Default: Admin / Security / System Master
    return (
      <>
        {activeTab === 'dashboard' && <LiveDashboard setActiveTab={setActiveTab} />}
        {activeTab === 'attendance' && <AttendanceIntelligenceView />}
        {activeTab === 'hod' && <HODDedicatedDashboard />}
        {activeTab === 'teacher' && <TeacherDedicatedDashboard />}
        {activeTab === 'student' && <StudentDedicatedDashboard />}
        {activeTab === 'timetable' && <TimetableManagerView />}
        {activeTab === 'registration' && <StudentRegistrationWorkflowView />}
        {activeTab === 'aiops' && <AIOpsDashboard />}
        {activeTab === 'map' && <InteractiveFloorMap onSelectPerson={() => setActiveTab('tracking')} onOpenStudio={() => setActiveTab('blueprint')} />}
        {activeTab === 'blueprint' && <BlueprintStudio />}
        {activeTab === 'tracking' && <PersonTrackingView />}
        {activeTab === 'appearance' && <DailyAppearanceVault />}
        {activeTab === 'rules' && <SecurityRulesManager />}
        {activeTab === 'cameras' && <CameraMatrixView />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Cyber Command Header */}
      <Header />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950/60">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderRoleDashboard()}
          </div>
        </main>
      </div>

      {/* Global Modals (Enrollment & Real Camera connection) */}
      <EnrollmentModal />
      <ConnectCameraModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <SecurityProvider>
        <AppContent />
      </SecurityProvider>
    </AuthProvider>
  );
}

export default App;
