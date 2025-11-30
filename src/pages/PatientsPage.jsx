import React from 'react';

const PatientsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Patients</h1>
        <p>Manage patient records and information</p>
      </div>
      <div className="page-content">
        <div className="placeholder-card">
          <h2>Patients Management</h2>
          <p>This page will contain:</p>
          <ul>
            <li>Patient database with search and filters</li>
            <li>Patient profile pages</li>
            <li>Medical history records</li>
            <li>Appointment history</li>
          </ul>
          <button className="btn btn-primary">Add New Patient</button>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;