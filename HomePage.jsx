import React from 'react';
import HeroHome from '../components/features/home/HeroHome';
import QuickActionGrid from '../components/features/home/QuickActionGrid';
import HomeAppointment from '../components/features/home/HomeAppointment';
import HomeReminders from '../components/features/home/HomeReminders';
import RecentActivity from '../components/features/home/RecentActivity';
import { appointments } from '../data/mockData';

export default function HomePage({ onNavigate }) {
  const upcomingAppointment = appointments.find((a) => a.status === 'Confirmed') || appointments[0];

  const handleJoinCall = () => {
    alert(`Telehealth is not configured. No consultation was started with ${upcomingAppointment.doctor}.`);
  };

  return (
    <div className="space-y-6">
      <HeroHome
        onBookClick={() => onNavigate('doctors')}
        onRecordsClick={() => onNavigate('records')}
      />

      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">Quick Services</h3>
        <QuickActionGrid onNavigate={onNavigate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HomeAppointment
          appointment={upcomingAppointment}
          onJoinCall={handleJoinCall}
          onViewAll={() => onNavigate('appointments')}
        />
        <HomeReminders />
      </div>

      <RecentActivity />
    </div>
  );
}

