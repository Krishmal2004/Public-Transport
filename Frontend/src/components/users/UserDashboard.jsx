import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  // Mock data representing the user's previously submitted incidents
  const [incidents] = useState([
    {
      id: 8,
      bus_no: "NB-7086",
      category: "Electrical Issue",
      severity: "High",
      status: "Reported",
      created_at: "2026-09-04T06:56:40.622Z"
    },
    {
      id: 4,
      bus_no: "NB-7089",
      category: "Brake Failure",
      severity: "Low",
      status: "In Progress",
      created_at: "2026-09-04T06:44:17.583Z"
    },
    {
      id: 2,
      bus_no: "WP NA-1290",
      category: "Engine",
      severity: "Critical",
      status: "Fixed",
      created_at: "2026-09-03T14:22:00.000Z"
    }
  ]);

  // Helper functions to map statuses and severities to your CSS badge classes
  const getStatusClass = (status) => {
    if (status === 'Reported') return 'gov-stat-reported';
    if (status === 'In Progress') return 'gov-stat-progress';
    if (status === 'Fixed') return 'gov-stat-fixed';
    return 'gov-stat-reported';
  };

  const getSeverityClass = (severity) => {
    return `gov-sev-${severity.toLowerCase()}`;
  };

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
        
        {/* Page Header */}
        <div className="gov-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1>My Reported Incidents</h1>
            <p className="gov-subtitle">Track the progress of fleet breakdowns you have logged.</p>
          </div>
          <button 
            onClick={() => navigate('/report')}
            style={{ backgroundColor: 'var(--gov-black)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
          >
            + Log New Breakdown
          </button>
        </div>

        {/* Incident Grid */}
        <div className="gov-dashboard-section">
          <div className="gov-incident-grid">
            {incidents.map((incident) => (
              <div 
                key={incident.id} 
                className="gov-incident-card"
                onClick={() => navigate(`/report/id=${incident.id}`)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                
                <div className="gov-incident-header">
                  <span className="gov-bus-badge">{incident.bus_no}</span>
                  <span className="gov-time-label">
                    {new Date(incident.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="gov-incident-body" style={{ marginTop: '12px' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: 'var(--gov-black)' }}>
                    {incident.category}
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--gov-dark-gray)' }}>
                    Incident #{incident.id}
                  </p>
                </div>

                <div className="gov-incident-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className={`gov-badge ${getSeverityClass(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`gov-badge ${getStatusClass(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  
                  <button 
                    className="gov-btn-outline"
                    // Removed the onClick here to prevent double-firing, as the parent div now handles the click
                  >
                    View Details
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
