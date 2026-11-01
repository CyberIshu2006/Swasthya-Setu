import React from 'react';
import { Video, FileSearch, ShieldCheck, Siren } from 'lucide-react';
import QuickActionCard from './QuickActionCard';

const ACTIONS = [
  { title: 'Consult Specialist', description: 'Connect with verified AI & verified doctors.', icon: Video, colorScheme: 'blue', badge: 'Available', tab: 'doctors' },
  { title: 'Diagnostic Lab Tests', description: 'Order doorstep blood tests & get reports.', icon: FileSearch, colorScheme: 'indigo', badge: 'NABL Certified', tab: 'records' },
  { title: 'ABHA Health Locker', description: 'Encrypted government-compliant health vault.', icon: ShieldCheck, colorScheme: 'emerald', badge: 'Synced', tab: 'records' },
  { title: 'Emergency Assistance', description: 'Immediate ambulance dispatch & trauma desk.', icon: Siren, colorScheme: 'amber', badge: '24/7 Live', tab: 'appointments' },
];

export default function QuickActionGrid({ onNavigate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {ACTIONS.map((act) => (
        <QuickActionCard
          key={act.title}
          title={act.title}
          description={act.description}
          icon={act.icon}
          colorScheme={act.colorScheme}
          badge={act.badge}
          onClick={() => onNavigate(act.tab)}
        />
      ))}
    </div>
  );
}
