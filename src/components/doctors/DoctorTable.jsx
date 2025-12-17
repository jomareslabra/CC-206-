import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDoctors, doctorService } from '../../data/mockData';
import DoctorView from './DoctorView';

const DoctorTable = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showDoctorView, setShowDoctorView] = useState(false);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 doctor.specialization === selectedSpecialization;
    const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus;
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to deactivate this doctor?')) {
      doctorService.deleteDoctor(id);
      setDoctors([...doctorService.getDoctors()]);
    }
  };

  const handleViewDoctor = (id) => {
    setSelectedDoctorId(id);
    setShowDoctorView(true);
  };

  const handleCloseDoctorView = () => {
    setShowDoctorView(false);
    setSelectedDoctorId(null);
  };

  const specializations = ['all', 'Cardiology', 'Dermatology', 'Orthopedics', 
                          'Pediatrics', 'Neurology', 'Oncology'];
  
  const statusOptions = ['all', 'active', 'on-leave', 'inactive'];

  return (
    <>
      <div className="patients-container">
        {/* Table Header - EXACT SAME AS PATIENTS */}
        <div className="table-header">
          <h2>Doctors</h2>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/admin/doctors/new')}
          >
            + New Doctor
          </button>
        </div>

        {/* Table Controls - EXACT SAME AS PATIENTS */}
        <div className="table-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search doctors by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="status-filter"
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
          >
            {specializations.map(spec => (
              <option key={spec} value={spec}>
                {spec === 'all' ? 'All Specializations' : spec}
              </option>
            ))}
          </select>
          <select
            className="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>{doctor.doctorId}</td>
                  <td>
                    <strong>{doctor.name}</strong>
                    <div className="text-sm">{doctor.yearsOfExperience} years experience</div>
                  </td>
                  <td>
                    <span className="specialization-badge">
                      {doctor.specialization}
                    </span>
                  </td>
                  <td>
                    <div>{doctor.phone}</div>
                    <div className="text-sm">{doctor.email}</div>
                  </td>
                  <td>
                    <div>{doctor.schedule}</div>
                    <div className="text-sm">Office: {doctor.office}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${doctor.status}`}>
                      {doctor.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action view"
                        onClick={() => handleViewDoctor(doctor.id)}
                      >
                        View
                      </button>
                      <button 
                        className="btn-action edit"
                        onClick={() => navigate(`/admin/doctors/${doctor.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-action delete"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        Deactivate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </div>
      </div>

      {showDoctorView && (
        <DoctorView 
          doctorId={selectedDoctorId} 
          onClose={handleCloseDoctorView}
        />
      )}
    </>
  );
};

export default DoctorTable;