import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// IMPORTANT: If you get an error about 'lucide-react', run: npm install lucide-react
import { ArrowLeft, Save, Clock, Calendar, User, UserPlus } from 'lucide-react';
import { appointmentService, doctorService, patientService } from '../../data/mockData';

const AppointmentForm = ({ mode = 'add' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // State for dropdowns
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: 'consultation',
    status: 'confirmed',
    notes: '',
    room: ''
  });

  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Load Patients and Doctors for the dropdowns
    setDoctors(doctorService.getDoctors());
    setPatients(patientService.getPatients());

    // 2. If editing, load the appointment data
    if (mode === 'edit' && id) {
      const appointment = appointmentService.getAppointmentById(parseInt(id));
      if (appointment) {
        // Split ISO string back into date and time for inputs
        // Example: "2024-01-15T09:00:00" -> date: "2024-01-15", time: "09:00"
        const [dateStr, timeStr] = appointment.start.split('T');
        
        setFormData({
          ...appointment,
          date: dateStr,
          time: timeStr.substring(0, 5), // Ensure HH:MM format
          patientId: appointment.patientId, // Ensure IDs match
          doctorId: appointment.doctorId
        });
      } else {
        setError('Appointment not found');
      }
      setLoading(false);
    }
  }, [mode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find names for the selected IDs (for display purposes in the table)
    const selectedPatient = patients.find(p => p.id === parseInt(formData.patientId));
    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));

    // Combine Date and Time into ISO string
    const startDateTime = `${formData.date}T${formData.time}:00`;
    // Calculate end time (default to 30 mins later for simplicity)
    const endDate = new Date(new Date(startDateTime).getTime() + 30 * 60000);
    const endDateTime = endDate.toISOString().split('.')[0]; // Simple ISO format

    const submissionData = {
      ...formData,
      patientId: parseInt(formData.patientId),
      patientName: selectedPatient ? selectedPatient.fullName : 'Unknown',
      doctorId: parseInt(formData.doctorId),
      doctorName: selectedDoctor ? selectedDoctor.name : 'Unknown',
      start: startDateTime,
      end: endDateTime,
    };

    try {
      if (mode === 'edit') {
        appointmentService.updateAppointment(parseInt(id), submissionData);
      } else {
        appointmentService.addAppointment(submissionData);
      }
      navigate('/admin/appointments');
    } catch (err) {
      setError('Failed to save appointment');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="patient-form-container"> {/* Reusing patient form styles */}
      <div className="form-header">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/appointments')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <ArrowLeft size={24} color="#5f6368" />
          </button>
          <div>
            <h2>{mode === 'edit' ? 'Edit Appointment' : 'New Appointment'}</h2>
            <p style={{ color: '#5f6368', margin: 0 }}>
              {mode === 'edit' ? 'Update appointment details' : 'Schedule a new appointment'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-sections">
          
          {/* Title */}
          <div className="form-section">
             <h3><i className="fas fa-info-circle"></i> Appointment Details</h3>
             <div className="form-grid">
                <div className="form-group full-width">
                    <label>Appointment Title</label>
                    <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Annual Physical, Skin Consultation"
                    />
                </div>
             </div>
          </div>

          {/* People */}
          <div className="form-section">
            <h3><i className="fas fa-users"></i> People</h3>
            <div className="form-grid">
                {/* Patient Selection */}
                <div className="form-group">
                    <label>Patient</label>
                    <div style={{ position: 'relative' }}>
                    <select
                        name="patientId"
                        required
                        value={formData.patientId}
                        onChange={handleChange}
                    >
                        <option value="">Select Patient</option>
                        {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                            {patient.fullName} (ID: {patient.patientId})
                        </option>
                        ))}
                    </select>
                    </div>
                </div>

                {/* Doctor Selection */}
                <div className="form-group">
                    <label>Doctor</label>
                    <div style={{ position: 'relative' }}>
                    <select
                        name="doctorId"
                        required
                        value={formData.doctorId}
                        onChange={handleChange}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialization}
                        </option>
                        ))}
                    </select>
                    </div>
                </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="form-section">
             <h3><i className="fas fa-calendar-alt"></i> Schedule</h3>
             <div className="form-grid">
                {/* Date */}
                <div className="form-group">
                    <label>Date</label>
                    <div style={{ position: 'relative' }}>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                    />
                    </div>
                </div>

                {/* Time */}
                <div className="form-group">
                    <label>Time</label>
                    <div style={{ position: 'relative' }}>
                    <input
                        type="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                    />
                    </div>
                </div>

                {/* Type */}
                <div className="form-group">
                    <label>Type</label>
                    <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    >
                    <option value="checkup">Annual Checkup</option>
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="surgery">Surgery</option>
                    </select>
                </div>

                {/* Room */}
                <div className="form-group">
                    <label>Room (Optional)</label>
                    <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    placeholder="e.g. Room 302"
                    />
                </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-section">
             <h3><i className="fas fa-sticky-note"></i> Notes</h3>
             <div className="form-group full-width">
                <label>Additional Notes</label>
                <textarea
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes here..."
                />
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/appointments')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            <Save size={16} style={{ marginRight: '8px' }} />
            {mode === 'edit' ? 'Update Appointment' : 'Schedule Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;