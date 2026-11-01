export const userProfile = {
  name: "Dr. Rajesh Sharma", id: "SS-849204", email: "rajesh.sharma@medmail.com",
  phone: "+91 98765 43210", bloodGroup: "O+", dob: "14 Aug 1985", gender: "Male",
  city: "New Delhi, India", allergies: "Penicillin, Peanuts", emergencyContact: "Sunita Sharma (+91 98111 22334)",
  avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&auto=format&fit=crop&q=80",
};

export const stats = [
  { label: "Upcoming", value: 3, change: "+1 this week", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Completed", value: 28, change: "Past 6 mos", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Cancelled", value: 2, change: "Rescheduled", color: "text-rose-600", bg: "bg-rose-50" },
  { label: "Total Visits", value: 33, change: "Lifetime", color: "text-purple-600", bg: "bg-purple-50" },
];

export const appointments = [
  {
    id: 1, doctor: "Dr. Ananya Iyer", specialty: "Cardiologist", hospital: "Max Super Speciality",
    date: "Tomorrow, 10:30 AM", time: "10:30 AM", status: "Confirmed", mode: "Video Consult", fee: "₹1,200",
    avatar: "https://images.unsplash.com/photo-1594824813583-4217112a201b?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: 2, doctor: "Dr. Vikram Sethi", specialty: "Orthopedic Surgeon", hospital: "Apollo Hospital, Saket",
    date: "Fri, 04 Nov, 04:00 PM", time: "04:00 PM", status: "Confirmed", mode: "In-Clinic", fee: "₹1,500",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: 3, doctor: "Dr. Priya Deshmukh", specialty: "Dermatologist", hospital: "Skin Health Clinic",
    date: "12 Oct 2026, 11:15 AM", time: "11:15 AM", status: "Completed", mode: "In-Clinic", fee: "₹900",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80",
  },
];

export const doctors = [
  {
    id: "doc-1", name: "Dr. Ananya Iyer", specialty: "Cardiologist", rating: 4.9, reviews: 142,
    experience: "12 yrs exp", hospital: "Max Hospital, Saket", status: "Online", fee: "₹1,200",
    avatar: "https://images.unsplash.com/photo-1594824813583-4217112a201b?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "doc-2", name: "Dr. Vikram Sethi", specialty: "Orthopedic", rating: 4.8, reviews: 98,
    experience: "15 yrs exp", hospital: "Apollo Spectra", status: "Offline", fee: "₹1,500",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "doc-3", name: "Dr. Sameer Kaul", specialty: "Neurologist", rating: 4.95, reviews: 215,
    experience: "18 yrs exp", hospital: "Fortis Escorts Heart Inst.", status: "Online", fee: "₹1,800",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "doc-4", name: "Dr. Sneha Roy", specialty: "Pediatrician", rating: 4.7, reviews: 86,
    experience: "9 yrs exp", hospital: "Rainbow Children Clinic", status: "Online", fee: "₹1,000",
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=120&auto=format&fit=crop&q=80",
  },
];

export const reminders = [
  { id: 1, name: "Atorvastatin 20mg", dosage: "1 Tablet, Post Dinner", time: "09:00 PM", taken: true },
  { id: 2, name: "Metformin 500mg", dosage: "1 Tablet with Meal", time: "01:30 PM", taken: false },
  { id: 3, name: "Vitamin D3 Drops", dosage: "4 Drops weekly", time: "08:00 AM", taken: true },
];

export const activities = [
  { id: 1, title: "Lab Report Uploaded", desc: "Lipid Profile from Lal PathLabs", time: "2 hours ago" },
  { id: 2, title: "Appointment Scheduled", desc: "With Dr. Ananya Iyer for tomorrow", time: "Yesterday" },
  { id: 3, title: "Prescription Renewed", desc: "Refill granted by Dr. Vikram Sethi", time: "3 days ago" },
];

export const medicalRecords = [
  { id: 1, title: "Complete Lipid Profile", category: "Lab Reports", doctor: "Dr. Ananya Iyer", date: "28 Oct 2026", size: "2.4 MB" },
  { id: 2, title: "Cardiology Prescription", category: "Prescriptions", doctor: "Dr. Ananya Iyer", date: "15 Oct 2026", size: "840 KB" },
  { id: 3, title: "Knee Joint MRI Scan", category: "Scans", doctor: "Dr. Vikram Sethi", date: "02 Oct 2026", size: "18.2 MB" },
  { id: 4, title: "Hepatitis-B Booster Dose", category: "Vaccines", doctor: "Dr. Sameer Kaul", date: "12 Sep 2026", size: "450 KB" },
  { id: 5, title: "HbA1c Blood Sugar Test", category: "Lab Reports", doctor: "Dr. Sneha Roy", date: "01 Sep 2026", size: "1.2 MB" },
];
