import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/features/appointments/StatCard';
import AppointmentRow from '../components/features/appointments/AppointmentRow';
import RescheduleWidget from '../components/features/appointments/RescheduleWidget';
import { stats, appointments as initialAppointments } from '../data/mockData';

export default function AppointmentsPage({ onNavigateDoctors }) {
  const [appointmentsList, setAppointmentsList] = useState(initialAppointments);

  const handleCancel = (id) => {
    if (confirm("Cancel this appointment?")) {
      setAppointmentsList((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)));
    }
  };

  const handleJoin = (app) => alert(`Telehealth is not connected yet. No call was started for ${app.doctor}.`);
  const handleReschedule = (app) => alert(`Appointment scheduling service is not connected. No change was made to ${app.doctor}'s appointment.`);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Consultation & Appointments"
        description="Review your upcoming clinical sessions, join encrypted tele-consultations, or reschedule visits."
        badgeText="3 Upcoming"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Your Appointment Schedule</h3>
            <button onClick={onNavigateDoctors} className="text-xs font-bold text-blue-600 hover:underline">
              + Book New Doctor
            </button>
          </div>

          <div className="space-y-3">
            {appointmentsList.map((app) => (
              <AppointmentRow
                key={app.id} appointment={app}
                onCancel={handleCancel} onReschedule={handleReschedule} onJoin={handleJoin}
              />
            ))}
          </div>
        </div>

        <div>
          <RescheduleWidget onQuickBook={(slot) => alert(`Booking service is not connected. No appointment was booked for ${slot}.`)} />
        </div>
      </div>
    </div>
  );
}
