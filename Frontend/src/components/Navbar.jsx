import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // Broaden the condition to include the dashboard and any dynamic report detail routes
  const isPublicPage = path === '/' || path === '/login' || path === '/register';
  const isDriverPage = path.startsWith('/report') || path.startsWith('/user-dashboard');
  const isAdminPage = path.startsWith('/dashboard') || path.startsWith('/queue');

  return (
    <header className="gov-navbar">
      <div className="container gov-navbar-container">
        <div className="gov-navbar-brand">
          <span className="gov-navbar-title">SLTB DepotOps</span>
          <span className="gov-navbar-subtitle">Fleet Management System</span>
        </div>
        
        <nav className="gov-navbar-links">
          {isPublicPage && (
            <NavLink to="/" className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"} end>
              Overview
            </NavLink>
          )}

          {isDriverPage && (
            <>
              <NavLink to="/user-dashboard" className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"}>
                My Reports
              </NavLink>
              <NavLink to="/report" className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"} end>
                Log Breakdown
              </NavLink>
              <NavLink to="/" className="gov-nav-link" style={{color: '#cf222e'}}>
                Logout
              </NavLink>
            </>
          )}

          {isAdminPage && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"} end>
                Admin Dashboard
              </NavLink>
              <NavLink to="/queue" className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"}>
                Depot Repair Queue
              </NavLink>
              <NavLink to="/" className="gov-nav-link" style={{color: '#cf222e'}}>
                Logout
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
