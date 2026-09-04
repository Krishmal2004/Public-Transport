import React from 'react';
import IncidentCard from '../components/IncidentCard';

export default function Dashboard() {
  // Mock data for initial UI layout
  const recentIncidents = [
    { id: 1, busNo: "NB-4521", category: "Brake Failure", severity: "Critical", time: "10 mins ago", depot: "Maharagama" },
    { id: 2, busNo: "WP NA-1290", category: "Engine Overheating", severity: "High", time: "45 mins ago", depot: "Pettah" },
    { id: 3, busNo: "NC-3341", category: "Electrical Issue", severity: "Low", time: "2 hours ago", depot: "Meegoda" },
  ];

  return (
    <div className="container">
      <div className="gov-page-header">
        <h1>Fleet Overview</h1>
        <p className="gov-subtitle">Real-time status of SLTB operational assets.</p>
      </div>

      <div className="gov-metric-grid">
        <div className="gov-metric-card">
          <div className="gov-metric-label">Active Fleet</div>
          <div className="gov-metric-value text-success">4,210</div>
          <div className="gov-metric-trend">↑ 24 since yesterday</div>
        </div>
        <div className="gov-metric-card">
          <div className="gov-metric-label">Grounded Buses</div>
          <div className="gov-metric-value text-danger">1,890</div>
          <div className="gov-metric-trend">Critical threshold approaching</div>
        </div>
        <div className="gov-metric-card">
          <div className="gov-metric-label">Repairs In Progress</div>
          <div className="gov-metric-value">342</div>
          <div className="gov-metric-trend">Across 12 major depots</div>
        </div>
      </div>

      <div className="gov-dashboard-section">
        <h2>Recent Critical Breakdowns</h2>
        <div className="gov-incident-grid">
          {recentIncidents.map(incident => (
            <IncidentCard key={incident.id} {...incident} />
          ))}
        </div>
      </div>
    </div>
  );
}
