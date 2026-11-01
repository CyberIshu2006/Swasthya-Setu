import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import DoctorSearchBar from '../components/features/doctors/DoctorSearchBar';
import DoctorFilters from '../components/features/doctors/DoctorFilters';
import DoctorCard from '../components/features/doctors/DoctorCard';
import { doctors } from '../data/mockData';

export default function FindDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPill, setFilterPill] = useState('All');
  const [specialty, setSpecialty] = useState('All');
  const [experience, setExperience] = useState('All');
  const [onlyOnline, setOnlyOnline] = useState(false);

  const filtered = doctors.filter((doc) => {
    const s = searchTerm.toLowerCase();
    const matchSearch = doc.name.toLowerCase().includes(s) || doc.specialty.toLowerCase().includes(s);
    const matchSpec = specialty === 'All' || doc.specialty.toLowerCase().includes(specialty.toLowerCase());
    const matchOnline = !onlyOnline || doc.status === 'Online';
    const matchPill = filterPill === 'All' ||
      (filterPill.includes('4.8+') && doc.rating >= 4.8) ||
      (filterPill.includes('Under ₹1200') && parseInt(doc.fee.replace(/\D/g, '')) <= 1200) ||
      (filterPill.includes('Video Consult') && doc.status === 'Online');
    return matchSearch && matchSpec && matchOnline && matchPill;
  });

  const resetAll = () => {
    setSearchTerm(''); setFilterPill('All'); setSpecialty('All'); setExperience('All'); setOnlyOnline(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Find Verified Specialists"
        description="Book video consultations or in-person clinic visits with top medical specialists."
        badgeText="120+ Doctors"
      />
      <DoctorSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilterPill={filterPill}
        onSelectPill={setFilterPill}
        resultCount={filtered.length}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <DoctorFilters
            selectedSpecialty={specialty} onSelectSpecialty={setSpecialty}
            selectedExp={experience} onSelectExp={setExperience}
            onlyOnline={onlyOnline} onToggleOnline={setOnlyOnline} onReset={resetAll}
          />
        </div>
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
              No specialists match your criteria. Try resetting filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} onBook={(d) => alert(`Booking is not connected to a scheduling backend. No appointment was created for ${d.name}.`)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
