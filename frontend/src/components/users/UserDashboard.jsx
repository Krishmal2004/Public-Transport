import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token'); 
        
        const response = await fetch('http://localhost:8000/api/incidents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }) 
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please log in to view your incidents.');
          }
          throw new Error('Failed to fetch data');
        }
        
        const responseData = await response.json();
        
        if (responseData.success && Array.isArray(responseData.data)) {
          setIncidents(responseData.data);
        } else {
          setIncidents(responseData.data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // Added .trim() and case-insensitivity to prevent DB formatting mismatches
  const getStatusClass = (status) => {
    if (!status) return 'gov-stat-reported';
    
    switch (status.trim().toLowerCase()) {
      case 'reported': 
        return 'gov-stat-reported';
      case 'in-progress': 
        return 'gov-stat-progress';
      case 'in workshop': 
        return 'gov-stat-workshop'; 
      case 'fixed': 
        return 'gov-stat-fixed';
      default: 
        return 'gov-stat-reported';
    }
  };

  const getSeverityClass = (severity) => {
    if (!severity) return 'gov-sev-low';
    return `gov-sev-${severity.trim().toLowerCase()}`;
  };

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
        
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

        <div className="gov-dashboard-section">
          {isLoading ? (
            <p style={{ marginTop: '20px' }}>Loading incidents...</p>
          ) : error ? (
            <p style={{ marginTop: '20px', color: 'red' }}>Error: {error}</p>
          ) : (
            <div className="gov-incident-grid">
              {incidents.length === 0 ? (
                <p>No incidents reported yet.</p>
              ) : (
                incidents.map((incident) => (
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
                          {incident.severity || 'Low'}
                        </span>
                        {/* Rendering the dynamic status text from the backend safely */}
                        <span className={`gov-badge ${getStatusClass(incident.status)}`}>
                          {incident.status || 'Reported'}
                        </span>
                      </div>
                      
                      <button className="gov-btn-outline">
                        View Details
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
