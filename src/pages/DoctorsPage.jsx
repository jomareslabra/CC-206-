import React from 'react';
import { DoctorTable } from '../components/doctors';

const DoctorsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Doctors Management</h1>
        <p>Manage doctor profiles, schedules, and availability</p>
      </div>
      <div className="patients-page">
        <DoctorTable />
      </div>
    </div>
  );
};

export default DoctorsPage;