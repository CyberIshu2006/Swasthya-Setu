import React, { useRef } from 'react';
import { UploadCloud, HardDrive, CheckCircle2 } from 'lucide-react';
import Button from '../../ui/Button';

export default function RecordActions({ onUploadNew }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadNew?.(file.name);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-dashed border-blue-300 p-5 shadow-xs text-center hover:bg-blue-50/40 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.png,.jpg,.jpeg"
        />
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">Medical Record Storage</h4>
        <p className="text-xs text-slate-500 mb-3">Vault upload is unavailable until storage is configured.</p>
        <Button
          variant="primary"
          size="sm"
          className="w-full text-xs"
          onClick={() => fileInputRef.current?.click()}
        >
          Check storage configuration
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-blue-600" />
            ABHA Storage Vault
          </span>
          <span className="font-semibold text-slate-500">Storage not connected</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-600 h-2 rounded-full w-[24%]" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Encryption status not verified</span>
        </div>
      </div>
    </div>
  );
}

