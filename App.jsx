import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import AppointmentsPage from './pages/AppointmentsPage';
import FindDoctorsPage from './pages/FindDoctorsPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import SaathiChat from './components/features/saathi/SaathiChat';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'appointments':
        return <AppointmentsPage onNavigateDoctors={() => setActiveTab('doctors')} />;
      case 'doctors':
        return <FindDoctorsPage />;
      case 'records':
        return <MedicalRecordsPage />;
      case 'profile':
        return <ProfileSettingsPage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onNavigateProfile={() => setActiveTab('profile')}
          onGlobalSearch={(q) => {
            if (q.trim()) setActiveTab('doctors');
          }}
        />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          {renderPage()}
        </main>
      </div>
      <SaathiChat />
    </div>
  );
}

