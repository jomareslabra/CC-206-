import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPatients, patientService } from '../../data/mockData';

const PatientTable = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to archive this patient?')) {
      patientService.deletePatient(id);
      setPatients([...patientService.getPatients()]);
    }
  };

  return (
    <div className="patients-container">
      <div className="table-header">
        <h2>Patient Records</h2>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/admin/patients/new')}
        >
          + New Patient
        </button>
      </div>

      <div className="table-controls">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
              <th>Contact</th>
              <th>Primary Concern</th>
              <th>Last Appointment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.patientId}</td>
                <td>
                  <strong>{patient.fullName}</strong>
                  <div className="text-sm">{patient.dateOfBirth}</div>
                </td>
                <td>
                  <div>{patient.phone}</div>
                  <div className="text-sm">{patient.email}</div>
                </td>
                <td>
                  <span className="specialization-badge">
                    {patient.primaryConcern}
                  </span>
                </td>
                <td>{patient.lastAppointment}</td>
                <td>
                  <span className={`status-badge ${patient.status}`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-action view"
                      onClick={() => navigate(`/admin/patients/${patient.id}`)}
                    >
                      View
                    </button>
                    <button 
                      className="btn-action edit"
                      onClick={() => navigate(`/admin/patients/${patient.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-action delete"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {filteredPatients.length} of {patients.length} patients
      </div>
    </div>
  );
};

export default PatientTable;