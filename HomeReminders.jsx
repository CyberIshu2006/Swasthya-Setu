import React, { useState } from 'react';
import { Pill, CheckCircle2 } from 'lucide-react';
import ToggleSwitch from '../../ui/ToggleSwitch';
import { reminders as initialReminders } from '../../../data/mockData';

export default function HomeReminders() {
  const [items, setItems] = useState(initialReminders);

  const toggleReminder = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, taken: !item.taken } : item))
    );
  };

  const completedCount = items.filter((i) => i.taken).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Medication Routine</h4>
            <p className="text-[11px] text-slate-500">Daily adherence tracker</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          <span>{completedCount}/{items.length} Taken</span>
        </div>
      </div>

      <div className="space-y-3 my-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              item.taken
                ? 'bg-slate-50/70 border-slate-200 opacity-75'
                : 'bg-white border-slate-200/90 shadow-xs'
            }`}
          >
            <div className="min-w-0 pr-2">
              <p className={`text-xs font-bold truncate ${item.taken ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {item.name}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                <span>{item.dosage}</span>
                <span>•</span>
                <span className="font-semibold text-blue-600">{item.time}</span>
              </div>
            </div>
            <ToggleSwitch
              size="sm"
              checked={item.taken}
              onChange={() => toggleReminder(item.id)}
            />
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Next dosage due at 09:00 PM</span>
        <span className="text-emerald-600 font-medium">85% Compliance</span>
      </div>
    </div>
  );
}
