import React, { useState } from 'react';
import { ChevronDown, User, Lock, PhoneCall, Check } from 'lucide-react';
import Button from '../../ui/Button';

export default function SettingsAccordion() {
  const [openSection, setOpenSection] = useState('personal');
  const [saved, setSaved] = useState(false);

  const toggle = (sec) => setOpenSection(openSection === sec ? '' : sec);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <button onClick={() => toggle('personal')} className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 text-sm hover:bg-slate-50">
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-blue-600" />
            <span>Personal Identification & ABDM Profile</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'personal' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'personal' && (
          <div className="p-4 pt-0 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Full Legal Name</label>
                <input defaultValue="Dr. Rajesh Sharma" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-1">Date of Birth</label>
                <input defaultValue="14 Aug 1985" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
            </div>
            <Button size="sm" variant="primary" onClick={handleSave} className="text-xs">
              {saved ? <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved</span> : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <button onClick={() => toggle('emergency')} className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 text-sm hover:bg-slate-50">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-4 h-4 text-rose-600" />
            <span>Emergency Contact & SOS Dispatch</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'emergency' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'emergency' && (
          <div className="p-4 pt-0 border-t border-slate-100 space-y-3">
            <div className="pt-3">
              <label className="text-xs text-slate-500 font-medium block mb-1">Primary Guardian / Spouse</label>
              <input defaultValue="Sunita Sharma (+91 98111 22334)" className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
            </div>
            <Button size="sm" variant="primary" onClick={handleSave} className="text-xs">Update Contact</Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <button onClick={() => toggle('security')} className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 text-sm hover:bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Consent & Health Data Privacy</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'security' ? 'rotate-180' : ''}`} />
        </button>
        {openSection === 'security' && (
          <div className="p-4 pt-0 border-t border-slate-100 space-y-3 pt-3">
            <p className="text-xs text-slate-600">Doctors only get temporary, OTP-gated access to your records during consultation.</p>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
              <span className="font-semibold text-slate-700">Auto-Revoke Access After 7 Days</span>
              <input type="checkbox" defaultChecked className="rounded text-blue-600 w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
