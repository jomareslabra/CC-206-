import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/common/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientsPage from './pages/PatientsPage';  
import DoctorsPage from './pages/DoctorsPage';    
import './styles/App.css';
import PatientForm from './components/patients/PatientForm';
import DoctorForm from './components/doctors/DoctorForm';
// 1. ADD THIS IMPORT
import AppointmentForm from './components/appointments/AppointmentForm';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<DashboardPage />} />
            
            {/* 2. UPDATE APPOINTMENTS ROUTES HERE */}
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="appointments/new" element={<AppointmentForm mode="add" />} />
            <Route path="appointments/:id/edit" element={<AppointmentForm mode="edit" />} />

            {/* Patients Routes */}
            <Route path="patients" element={<PatientsPage />} />  
            <Route path="patients/new" element={<PatientForm mode="add" />} />
            <Route path="patients/:id/edit" element={<PatientForm mode="edit" />} />
            
            {/* Doctors Routes */}
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="doctors/new" element={<DoctorForm mode="add" />} />      
            <Route path="doctors/:id/edit" element={<DoctorForm mode="edit" />} />
            
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
          
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;