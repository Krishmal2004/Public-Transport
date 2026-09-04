import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="gov-navbar">
      <div className="container gov-navbar-container">
        <div className="gov-navbar-brand">
          <span className="gov-navbar-title">SLTB DepotOps</span>
          <span className="gov-navbar-subtitle">Fleet Management System</span>
        </div>
        
        <nav className="gov-navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"}
            end
          >
            Overview
          </NavLink>
          <NavLink 
            to="/log" 
            className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"}
          >
            Log Breakdown
          </NavLink>
          <NavLink 
            to="/queue" 
            className={({ isActive }) => isActive ? "gov-nav-link active" : "gov-nav-link"}
          >
            Depot Repair Queue
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
