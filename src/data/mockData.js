// KEEP THESE - Your Dashboard needs them
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

// ADD THESE - Your enhanced patients data
export const mockPatients = [
  {
    id: 1,
    patientId: 'PT001',
    fullName: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    dateOfBirth: '1985-03-15',
    primaryConcern: 'Cardiology',
    lastAppointment: '2024-01-10',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Peanuts'],
    emergencyContact: {
      name: 'Jane Smith',
      phone: '(555) 123-4568',
      relationship: 'Spouse'
    },
    address: '123 Main St, Springfield',
    insuranceProvider: 'HealthCare Plus',
    insuranceId: 'HCP-789012',
    status: 'active',
    notes: 'Regular checkups for hypertension. No recent issues.'
  },
  {
    id: 2,
    patientId: 'PT002',
    fullName: 'Maria Garcia',
    phone: '(555) 987-6543',
    email: 'maria.g@email.com',
    dateOfBirth: '1990-07-22',
    primaryConcern: 'Pediatrics',
    lastAppointment: '2024-02-15',
    bloodType: 'O-',
    allergies: ['None'],
    emergencyContact: {
      name: 'Carlos Garcia',
      phone: '(555) 987-6544',
      relationship: 'Brother'
    },
    address: '456 Oak Ave, Springfield',
    insuranceProvider: 'MediSure',
    insuranceId: 'MS-345678',
    status: 'active',
    notes: 'Annual physical completed. Referral to dermatology.'
  },
  {
    id: 3,
    patientId: 'PT003',
    fullName: 'Robert Chen',
    phone: '(555) 456-7890',
    email: 'robert.chen@email.com',
    dateOfBirth: '1978-11-30',
    primaryConcern: 'Orthopedics',
    lastAppointment: '2024-01-25',
    bloodType: 'B+',
    allergies: ['Ibuprofen', 'Shellfish'],
    emergencyContact: {
      name: 'Linda Chen',
      phone: '(555) 456-7891',
      relationship: 'Spouse'
    },
    address: '789 Pine Rd, Springfield',
    insuranceProvider: 'HealthCare Plus',
    insuranceId: 'HCP-901234',
    status: 'active',
    notes: 'Post-op recovery from knee surgery. Doing well.'
  },
  {
    id: 4,
    patientId: 'PT004',
    fullName: 'Emma Johnson',
    phone: '(555) 234-5678',
    email: 'emma.j@email.com',
    dateOfBirth: '1995-04-18',
    primaryConcern: 'Dermatology',
    lastAppointment: '2023-12-05',
    bloodType: 'AB+',
    allergies: ['Latex', 'Aspirin'],
    emergencyContact: {
      name: 'Michael Johnson',
      phone: '(555) 234-5679',
      relationship: 'Father'
    },
    address: '321 Elm St, Springfield',
    insuranceProvider: 'WellCare',
    insuranceId: 'WC-567890',
    status: 'inactive',
    notes: 'Moved out of state. Records transferred.'
  },
  {
    id: 5,
    patientId: 'PT005',
    fullName: 'David Miller',
    phone: '(555) 876-5432',
    email: 'david.m@email.com',
    dateOfBirth: '1982-09-12',
    primaryConcern: 'Cardiology',
    lastAppointment: '2024-02-28',
    bloodType: 'O+',
    allergies: ['Codeine'],
    emergencyContact: {
      name: 'Sarah Miller',
      phone: '(555) 876-5433',
      relationship: 'Sister'
    },
    address: '654 Birch Blvd, Springfield',
    insuranceProvider: 'MediSure',
    insuranceId: 'MS-123456',
    status: 'active',
    notes: 'Scheduled for stress test next month.'
  }
];

// Patient service functions
export const patientService = {
  getPatients: () => [...mockPatients],
  
  getPatientById: (id) => {
    const patient = mockPatients.find(p => p.id === id);
    return patient ? { ...patient } : null;
  },
  
  addPatient: (patientData) => {
    const newPatient = {
      id: mockPatients.length + 1,
      patientId: `PT${String(mockPatients.length + 1).padStart(3, '0')}`,
      status: 'active',
      ...patientData
    };
    mockPatients.push(newPatient);
    return { ...newPatient };
  },
  
  updatePatient: (id, updates) => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPatients[index] = { ...mockPatients[index], ...updates };
      return { ...mockPatients[index] };
    }
    return null;
  },
  
  deletePatient: (id) => {
    const index = mockPatients.findIndex(p => p.id === id);
    if (index !== -1) {
      mockPatients[index].status = 'inactive';
      return true;
    }
    return false;
  },
  
  searchPatients: (term) => {
    const lowerTerm = term.toLowerCase();
    return mockPatients.filter(patient => 
      patient.fullName.toLowerCase().includes(lowerTerm) ||
      patient.patientId.toLowerCase().includes(lowerTerm) ||
      patient.email.toLowerCase().includes(lowerTerm) ||
      patient.phone.includes(term)
    );
  },
  
  filterByStatus: (status) => {
    if (status === 'all') return mockPatients;
    return mockPatients.filter(patient => patient.status === status);
  }
};

// ===== ENHANCED DOCTORS DATA (REPLACES THE OLD ONE) =====
export const mockDoctors = [
  {
    id: 1,
    doctorId: 'DOC001',
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiology',
    email: 's.wilson@hospital.com',
    phone: '(555) 111-1111',
    status: 'active',
    avatar: 'SW',
    yearsOfExperience: 12,
    qualifications: ['MD, Cardiology', 'Board Certified'],
    office: 'Room 301, Floor 3',
    schedule: 'Mon, Wed, Fri: 9AM-5PM',
    hourlyRate: 180,
    notes: 'Specializes in interventional cardiology. Speaks English and Spanish.'
  },
  {
    id: 2,
    doctorId: 'DOC002', 
    name: 'Dr. Michael Brown',
    specialization: 'Dermatology',
    email: 'm.brown@hospital.com',
    phone: '(555) 222-2222',
    status: 'active',
    avatar: 'MB',
    yearsOfExperience: 8,
    qualifications: ['MD, Dermatology', 'Cosmetic Surgery Certified'],
    office: 'Room 205, Floor 2',
    schedule: 'Tue, Thu: 10AM-6PM',
    hourlyRate: 150,
    notes: 'Expert in cosmetic dermatology and skin cancer screenings.'
  },
  {
    id: 3,
    doctorId: 'DOC003',
    name: 'Dr. Lisa Garcia',
    specialization: 'Orthopedics',
    email: 'l.garcia@hospital.com',
    phone: '(555) 333-3333',
    status: 'active',
    avatar: 'LG',
    yearsOfExperience: 15,
    qualifications: ['MD, Orthopedic Surgery', 'Sports Medicine Fellowship'],
    office: 'Room 410, Floor 4',
    schedule: 'Mon-Fri: 8AM-4PM',
    hourlyRate: 200,
    notes: 'Specializes in sports injuries and joint replacements.'
  },
  {
    id: 4,
    doctorId: 'DOC004',
    name: 'Dr. James Wilson',
    specialization: 'Pediatrics',
    email: 'j.wilson@hospital.com',
    phone: '(555) 444-4444',
    status: 'on-leave',
    avatar: 'JW',
    yearsOfExperience: 10,
    qualifications: ['MD, Pediatrics', 'Child Development Specialist'],
    office: 'Room 105, Floor 1',
    schedule: 'Mon, Wed, Fri: 9AM-3PM',
    hourlyRate: 140,
    notes: 'Currently on maternity leave until June 2024.'
  },
  {
    id: 5,
    doctorId: 'DOC005',
    name: 'Dr. Amanda Chen',
    specialization: 'Neurology',
    email: 'a.chen@hospital.com',
    phone: '(555) 555-5555',
    status: 'active',
    avatar: 'AC',
    yearsOfExperience: 11,
    qualifications: ['MD, Neurology', 'Epilepsy Specialist'],
    office: 'Room 308, Floor 3',
    schedule: 'Tue, Thu, Sat: 11AM-7PM',
    hourlyRate: 190,
    notes: 'Head of Neurology Department. Research focus on migraine treatments.'
  }
];

// ===== DOCTOR SERVICE FUNCTIONS =====
export const doctorService = {
  getDoctors: () => [...mockDoctors],
  
  getDoctorById: (id) => {
    const doctor = mockDoctors.find(d => d.id === id);
    return doctor ? { ...doctor } : null;
  },
  
  addDoctor: (doctorData) => {
    const newDoctor = {
      id: mockDoctors.length + 1,
      doctorId: `DOC${String(mockDoctors.length + 1).padStart(3, '0')}`,
      status: 'active',
      avatar: doctorData.name.split(' ').map(n => n[0]).join(''),
      ...doctorData
    };
    mockDoctors.push(newDoctor);
    return { ...newDoctor };
  },
  
  updateDoctor: (id, updates) => {
    const index = mockDoctors.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDoctors[index] = { ...mockDoctors[index], ...updates };
      return { ...mockDoctors[index] };
    }
    return null;
  },
  
  deleteDoctor: (id) => {
    const index = mockDoctors.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDoctors[index].status = 'inactive';
      return true;
    }
    return false;
  },
  
  searchDoctors: (term) => {
    const lowerTerm = term.toLowerCase();
    return mockDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(lowerTerm) ||
      doctor.specialization.toLowerCase().includes(lowerTerm) ||
      doctor.doctorId.toLowerCase().includes(lowerTerm)
    );
  },
  
  filterBySpecialization: (specialization) => {
    if (specialization === 'all') return mockDoctors;
    return mockDoctors.filter(doctor => doctor.specialization === specialization);
  },
  
  filterByStatus: (status) => {
    if (status === 'all') return mockDoctors;
    return mockDoctors.filter(doctor => doctor.status === status);
  }
};