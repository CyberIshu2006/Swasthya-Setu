import React from 'react';
import { Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../../ui/Button';

export default function HeroHome({ onBookClick, onRecordsClick }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D2040] via-[#142E54] to-[#1E3A8A] text-white p-6 md:p-8 shadow-md">
      <div className="max-w-xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          <span>Ayushman Bharat Digital Mission (ABDM) Sync Active</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          Good Morning, Dr. Rajesh 👋
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Your preventive health index is <strong className="text-emerald-400">Optimal (94%)</strong>. You have 1 consultation scheduled for tomorrow with Dr. Ananya Iyer.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" icon={Calendar} onClick={onBookClick}>
            Schedule Visit
          </Button>
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10" onClick={onRecordsClick}>
            View Health Locker
          </Button>
        </div>
      </div>

      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">Health Score</div>
          <div className="text-xl font-bold text-white">94 <span className="text-xs font-normal text-emerald-300">/ 100</span></div>
          <div className="text-[11px] text-emerald-400">All vitals regular</div>
        </div>
      </div>
    </div>
  );
}

