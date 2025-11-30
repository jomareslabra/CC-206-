export const mockStats = {
  appointmentsToday: 24,
  pendingRequests: 5,
  activePatients: 142,
  doctorsAvailable: 8
};

export const mockAppointments = [
  {
    id: 1,
    time: '09:00 AM',
    patientName: 'John Smith',
    doctorName: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    status: 'confirmed'
  },
  {
    id: 2,
    time: '10:30 AM',
    patientName: 'Emma Johnson',
    doctorName: 'Dr. Michael Brown',
    specialization: 'Dermatology',
    status: 'confirmed'
  },
  {
    id: 3,
    time: '11:15 AM',
    patientName: 'Robert Davis',
    doctorName: 'Dr. Lisa Garcia',
    specialization: 'Orthopedics',
    status: 'pending'
  },
  {
    id: 4,
    time: '02:00 PM',
    patientName: 'Maria Garcia',
    doctorName: 'Dr. James Wilson',
    specialization: 'Pediatrics',
    status: 'confirmed'
  },
  {
    id: 5,
    time: '03:30 PM',
    patientName: 'David Miller',
    doctorName: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    status: 'cancelled'
  }
];

export const mockRecentActivities = [
  'You booked an appointment for John Doe with Dr. Smith (Cardiology) for tomorrow at 2:00 PM',
  'You added a new patient, Jane Doe, to the system',
  'Dr. Johnson updated their availability for next week',
  'You rescheduled Maria Garcia\'s appointment to next Monday',
  'New lab results uploaded for patient Robert Davis'
];

export const mockPatients = [
  {
    id: 1,
    patientId: 'PT001',
    fullName: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    dateOfBirth: '1985-03-15',
    primaryConcern: 'Cardiology',
    lastAppointment: '2024-01-10'
  }
];

export const mockDoctors = [
  {
    id: 1,
    doctorId: 'DOC001',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    email: 's.wilson@hospital.com',
    phone: '(555) 123-4567',
    status: 'active'
  }
];