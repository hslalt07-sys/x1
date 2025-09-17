import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ModernLandingPage from './components/Landing/ModernLandingPage';
import ModernLoginPage from './components/Auth/ModernLoginPage';
import SignupPage from './components/Auth/SignupPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
import ModernSidebar from './components/Layout/ModernSidebar';
import ModernTopbar from './components/Layout/ModernTopbar';
import ModernDashboard from './components/Dashboard/ModernDashboard';
import AttendanceSection from './components/Attendance/AttendanceSection';
import ClassesSection from './components/Classes/ClassesSection';
import StudentsSection from './components/Students/StudentsSection';
import FacultySection from './components/Faculty/FacultySection';
import ReportsSection from './components/Reports/ReportsSection';
import AnalyticsSection from './components/Analytics/AnalyticsSection';
import SettingsSection from './components/Settings/SettingsSection';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authView, setAuthView] = useState<'landing' | 'login' | 'signup' | 'forgot'>('landing');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    switch (authView) {
      case 'landing':
        return (
          <ModernLandingPage
            onLoginClick={() => setAuthView('login')}
            onSignupClick={() => setAuthView('signup')}
          />
        );
      case 'login':
        return (
          <ModernLoginPage
            onSignupClick={() => setAuthView('signup')}
            onForgotPasswordClick={() => setAuthView('forgot')}
            onBackToLanding={() => setAuthView('landing')}
          />
        );
      case 'signup':
        return (
          <SignupPage
            onLoginClick={() => setAuthView('login')}
            onBackToLanding={() => setAuthView('landing')}
          />
        );
      case 'forgot':
        return (
          <ForgotPasswordPage
            onBackToLogin={() => setAuthView('login')}
            onBackToLanding={() => setAuthView('landing')}
          />
        );
      default:
        return (
          <LandingPage
            onLoginClick={() => setAuthView('login')}
            onSignupClick={() => setAuthView('signup')}
          />
        );
    }
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <ModernDashboard setActiveSection={setActiveSection} />;
      case 'attendance':
        return <AttendanceSection />;
      case 'classes':
        return <ClassesSection />;
      case 'students':
        return <StudentsSection />;
      case 'faculty':
        return <FacultySection />;
      case 'reports':
        return <ReportsSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <ModernDashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 overflow-x-hidden">
      <div className="flex h-screen">
        <ModernSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <ModernTopbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto p-3 sm:p-6">
            <div className="max-w-7xl mx-auto">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;