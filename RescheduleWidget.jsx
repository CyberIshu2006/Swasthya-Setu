import React, { useState } from 'react';
import { Calendar as CalendarIcon, Check, HelpCircle } from 'lucide-react';
import Button from '../../ui/Button';

export default function RescheduleWidget({ onQuickBook }) {
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [booked, setBooked] = useState(false);
  const slots = ['09:30 AM', '10:00 AM', '02:30 PM', '05:00 PM'];

  const handleBooking = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 2000);
    onQuickBook?.(selectedSlot);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold text-slate-900">Priority Instant Slot</h4>
        </div>
        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
      </div>

      <p className="text-xs text-slate-500">Available online consult slots for today:</p>
      <div className="grid grid-cols-2 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
              selectedSlot === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-blue-800">
        <p className="font-semibold">Tele-health Coverage Verified</p>
        <p className="text-blue-600">Zero waiting time • Instant prescription</p>
      </div>

      <Button variant={booked ? "secondary" : "primary"} className="w-full text-xs font-bold" onClick={handleBooking}>
        {booked ? <span className="flex items-center gap-1 text-emerald-600"><Check className="w-4 h-4" /> Booked for {selectedSlot}</span> : `Instant Book at ${selectedSlot}`}
      </Button>
    </div>
  );
}
