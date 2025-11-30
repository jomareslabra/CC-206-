import React from 'react';

const DoctorsPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Doctors</h1>
        <p>Manage doctor profiles and availability</p>
      </div>
      <div className="page-content">
        <div className="placeholder-card">
          <h2>Doctors Management</h2>
          <p>This page will contain:</p>
          <ul>
            <li>Doctor directory</li>
            <li>Specialty management</li>
            <li>Availability scheduling</li>
            <li>Profile management</li>
          </ul>
          <button className="btn btn-primary">Add New Doctor</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;