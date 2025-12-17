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

// REMOVE THESE PLACEHOLDER DEFINITIONS:
// const AppointmentsPage = () => <div className="page-placeholder">Appointments Page - Coming Soon</div>;
// const PatientsPage = () => <div className="page-placeholder">Patients Page - Coming Soon</div>;  // ← DELETE THIS LINE
// const DoctorsPage = () => <div className="page-placeholder">Doctors Page - Coming Soon</div>;

// Protected Route component remains the same
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
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="patients" element={<PatientsPage />} />  {/* ← Now uses the real component */}
            <Route path="doctors" element={<DoctorsPage />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
          
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;