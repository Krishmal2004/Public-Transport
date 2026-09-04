import React from 'react';
import './IncidentCard.css';

export default function IncidentCard({ busNo, category, severity, time, depot }) {
  // Map severity to a CSS class for color coding
  const severityClass = severity.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="gov-incident-card">
      <div className="gov-incident-header">
        <span className="gov-bus-badge">{busNo}</span>
        <span className="gov-time-label">{time}</span>
      </div>
      <div className="gov-incident-body">
        <h4 className="gov-incident-category">{category}</h4>
        <p className="gov-incident-depot">Depot: {depot}</p>
      </div>
      <div className="gov-incident-footer">
        <span className={`gov-severity-badge severity-${severityClass}`}>
          {severity}
        </span>
        <button className="gov-btn-outline">View Details</button>
      </div>
    </div>
  );
}
