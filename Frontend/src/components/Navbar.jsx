import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  // Determine which layout to show based on current route
  const isPublicPage = path === '/' || path === '/login' || path === '/register';
  const isDriverPage = path === '/report';
  const isAdminPage = path === '/dashboard' || path === '/queue';

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
              <NavLink to="/report" className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"}>
                Log Breakdown
              </NavLink>
              <NavLink to="/" className="gov-nav-link" style={{color: '#cf222e'}}>
                Logout
              </NavLink>
            </>
          )}

          {isAdminPage && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"}>
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
