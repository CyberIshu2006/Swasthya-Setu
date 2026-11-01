import React, { useState } from 'react';
import { FileSearch, LoaderCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { analyzePrescription } from '../../../services/api';

export default function PrescriptionAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleAnalyze(event) {
    event.preventDefault();
    if (!file) { setError('Choose a prescription image or PDF first.'); return; }
    setBusy(true); setError(''); setResult(null);
    try { setResult(await analyzePrescription(file)); }
    catch (e) { setError(e.message || 'Could not analyze the document.'); }
    finally { setBusy(false); }
  }

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-blue-50 p-2 text-blue-600"><FileSearch className="w-5 h-5" /></div>
        <div><h3 className="font-bold text-slate-900">AI Prescription Text Extraction</h3>
          <p className="text-xs text-slate-500 mt-1">Extracts visible text using the configured AI service. It does not diagnose or recommend treatment.</p></div>
      </div>
      <form onSubmit={handleAnalyze} className="space-y-3">
        <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
          onChange={e => { setFile(e.target.files?.[0] || null); setError(''); setResult(null); }}
          className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-semibold file:text-blue-700" />
        <p className="text-xs text-slate-500">Accepted: PDF, JPG, PNG, WEBP · Maximum 8 MB. Files are processed by the configured backend and are not saved by this feature.</p>
        <button disabled={busy || !file} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? <><LoaderCircle className="w-4 h-4 animate-spin" /> Analyzing…</> : 'Analyze prescription'}
        </button>
      </form>
      {error && <div role="alert" className="flex gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />{error}</div>}
      {result && <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><CheckCircle2 className="w-4 h-4" />Extraction complete — verify every field</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div><span className="text-slate-500">Patient</span><p className="font-medium">{result.patientName || 'Not readable / not present'}</p></div>
          <div><span className="text-slate-500">Prescription date</span><p className="font-medium">{result.prescriptionDate || 'Not readable / not present'}</p></div>
        </div>
        <h4 className="font-semibold text-sm">Medicines found</h4>
        {Array.isArray(result.medicines) && result.medicines.length ? result.medicines.map((m,i) =>
          <div key={i} className="rounded-lg border border-slate-200 bg-white p-3 text-sm space-y-1">
            <p className="font-semibold">{m.name || 'Medicine name unclear'} {m.strength || ''}</p>
            <p>Dosage: {m.dosage || '—'} · Frequency: {m.frequency || '—'}</p>
            <p>Duration: {m.duration || '—'}</p><p>Instructions: {m.instructions || '—'}</p>
          </div>) : <p className="text-sm text-slate-600">No medicine entries were confidently extracted.</p>}
        {Array.isArray(result.unclearText) && result.unclearText.length > 0 && <p className="text-sm text-amber-800">Unclear text: {result.unclearText.join(', ')}</p>}
        <p className="text-xs text-slate-600">{result.disclaimer || 'AI extraction only, not medical advice. Verify with a qualified healthcare professional.'}</p>
      </div>}
    </section>
  );
}
