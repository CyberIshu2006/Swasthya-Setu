import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import RecordTabs from '../components/features/records/RecordTabs';
import RecordRow from '../components/features/records/RecordRow';
import RecordActions from '../components/features/records/RecordActions';
import PrescriptionAnalyzer from '../components/features/records/PrescriptionAnalyzer';
import { medicalRecords as initialRecords } from '../data/mockData';

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState(initialRecords);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = records.filter(
    (r) => activeCategory === 'All' || r.category === activeCategory
  );

  const categoryCounts = records.reduce((acc, r) => {
    acc['All'] = (acc['All'] || 0) + 1;
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  const handleUploadNew = () => {
    window.alert('Medical-record vault storage is not connected in this build. Use AI Prescription Text Extraction below to process a document, or configure a compliant storage service before enabling record uploads.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="ABHA Medical Records & Vault"
        description="Encrypted repository of your prescriptions, lab reports, discharge summaries, and vaccine passes."
        badgeText="HIPAA & ABDM Compliant"
      />

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Prototype data:</strong> The records below are sample UI data, not real patient records. ABHA/ABDM synchronization and persistent medical-record storage are not configured.
      </div>
      <PrescriptionAnalyzer />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <RecordTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            counts={categoryCounts}
          />

          <div className="space-y-3 pt-2">
            {filtered.map((record) => (
              <RecordRow
                key={record.id}
                record={record}
                onDownload={(r) => alert(`Downloading ${r.title} (${r.size})...`)}
                onView={(r) => alert(`Previewing secure document: ${r.title}`)}
              />
            ))}
          </div>
        </div>

        <div>
          <RecordActions onUploadNew={handleUploadNew} />
        </div>
      </div>
    </div>
  );
}

