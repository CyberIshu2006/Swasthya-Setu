import React, { useState } from 'react';
import { Bell, MapPin, ChevronDown, Check } from 'lucide-react';
import SearchInput from '../ui/SearchInput';
import { userProfile } from '../../data/mockData';

export default function Header({ onNavigateProfile, onGlobalSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('New Delhi, NCR');
  const [isLocOpen, setIsLocOpen] = useState(false);
  const locations = ['New Delhi, NCR', 'Mumbai, MH', 'Bengaluru, KA', 'Hyderabad, TS'];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onGlobalSearch?.(e.target.value);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="w-80">
        <SearchInput
          value={searchTerm} onChange={handleSearch}
          onClear={() => { setSearchTerm(''); onGlobalSearch?.(''); }}
          placeholder="Search symptoms, doctors, records..."
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsLocOpen(!isLocOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>{location}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {isLocOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { setLocation(loc); setIsLocOpen(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 flex items-center justify-between"
                >
                  <span>{loc}</span>
                  {loc === location && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => alert("Reminders: Tomorrow's visit with Dr. Ananya & 09:00 PM medicine")}
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        <button
          onClick={onNavigateProfile}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-full text-left"
        >
          <img src={userProfile.avatar} alt="Profile" className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-400" />
          <div>
            <p className="text-xs font-bold text-slate-800 leading-none">{userProfile.name}</p>
            <span className="text-[10px] text-blue-600 font-medium">ABHA #{userProfile.id}</span>
          </div>
        </button>
      </div>
    </header>
  );
}
