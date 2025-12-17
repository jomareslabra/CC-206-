import React from 'react';
import PatientTable from '../components/patients/PatientTable';

const PatientsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Patients</h1>
        <p>Manage patient records and information</p>
      </div>
      
      <div className="patients-page">
        <PatientTable />
      </div>
    </div>
  );
};

export default PatientsPage;