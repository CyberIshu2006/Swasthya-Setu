import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Heart, Droplet, QrCode } from 'lucide-react';
import Badge from '../../ui/Badge';
import { userProfile } from '../../../data/mockData';

export default function ProfileSidebar({ onShowQR }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="text-center">
        <div className="relative inline-block mb-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-50 mx-auto"
          />
          <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-xs">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white" title="Verified">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 text-lg">{userProfile.name}</h3>
        <p className="text-xs text-blue-600 font-semibold mb-2">ABHA ID: {userProfile.id}</p>
        <Badge variant="confirmed">ABDM Linked & Active</Badge>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between py-1">
          <span className="text-slate-500 flex items-center gap-2">
            <Droplet className="w-3.5 h-3.5 text-rose-500" /> Blood Group
          </span>
          <span className="font-bold text-slate-900">{userProfile.bloodGroup}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-slate-500 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-blue-500" /> Email
          </span>
          <span className="font-medium text-slate-800 truncate max-w-[140px]">{userProfile.email}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-slate-500 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-500" /> Mobile
          </span>
          <span className="font-medium text-slate-800">{userProfile.phone}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-slate-500 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-500" /> Location
          </span>
          <span className="font-medium text-slate-800">{userProfile.city}</span>
        </div>
      </div>

      <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-rose-700">
          <Heart className="w-3.5 h-3.5" />
          <span>Known Allergies</span>
        </div>
        <p className="text-rose-600 text-[11px]">{userProfile.allergies}</p>
      </div>

      <button
        onClick={onShowQR}
        className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
      >
        <QrCode className="w-4 h-4 text-blue-600" />
        <span>Display ABDM Health QR</span>
      </button>
    </div>
  );
}
