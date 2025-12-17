import React from 'react';
import PatientTable from '../components/patients/PatientTable';

const PatientsPage = () => {
  return (
    <div className="patients-page">
      <div className="page-header">
        <h1>Patients</h1>
        <p>Manage patient records and information</p>
      </div>
      
      <PatientTable />
    </div>
  );
};

export default PatientsPage;