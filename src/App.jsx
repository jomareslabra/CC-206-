import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/common/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import './styles/App.css';

// Placeholder components for other pages
const AppointmentsPage = () => <div className="page-placeholder">Appointments Page - Coming Soon</div>;
const PatientsPage = () => <div className="page-placeholder">Patients Page - Coming Soon</div>;
const DoctorsPage = () => <div className="page-placeholder">Doctors Page - Coming Soon</div>;

// Protected Route component
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
            <Route path="patients" element={<PatientsPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
          
          {/* Redirect to dashboard for root admin path */}
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;