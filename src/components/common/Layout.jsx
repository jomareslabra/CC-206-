import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin/Layout.css'; // Fixed path

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/admin/appointments', label: 'Appointments', icon: 'fas fa-calendar-check' },
    { path: '/admin/patients', label: 'Patients', icon: 'fas fa-user-injured' },
    { path: '/admin/doctors', label: 'Doctors', icon: 'fas fa-user-md' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <i className="fas fa-hospital-alt"></i>
          {isSidebarOpen && <span>HealthSync</span>}
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <i className={item.icon}></i>
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1>HealthSync Admin</h1>
          </div>
          
          <div className="header-right">
            <div className="user-info">
              <i className="fas fa-user-circle"></i>
              <span>{user?.name}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;