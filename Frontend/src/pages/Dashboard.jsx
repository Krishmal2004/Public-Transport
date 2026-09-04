import React from 'react';
import IncidentCard from '../components/IncidentCard';
import { mockIncidents } from '../data/mockData';

export default function Dashboard() {
  // Dynamic Calculations based on data
  const totalIncidents = mockIncidents.length;
  const groundedBuses = mockIncidents.filter(inc => inc.status !== 'Fixed').length;
  const repairsInProgress = mockIncidents.filter(inc => inc.status === 'In Workshop' || inc.status === 'In-Progress').length;
  
  // Just a mockup number for active fleet
  const activeFleet = 7100 - groundedBuses; // Out of 7100 total buses (from spec)

  // Get only critical/high recent incidents for the dashboard display
  const recentCriticalBreakdowns = mockIncidents
    .filter(inc => inc.severity === 'Critical' || inc.severity === 'High')
    .slice(0, 3); // Show top 3

  return (
    <div className="container">
      <div className="gov-page-header">
        <h1>Fleet Overview</h1>
        <p className="gov-subtitle">Real-time status of SLTB operational assets.</p>
      </div>

      <div className="gov-metric-grid">
        <div className="gov-metric-card">
          <div className="gov-metric-label">Active Fleet</div>
          <div className="gov-metric-value text-success">{activeFleet.toLocaleString()}</div>
          <div className="gov-metric-trend">Total SLTB Capacity: 7,100</div>
        </div>
        <div className="gov-metric-card">
          <div className="gov-metric-label">Grounded Buses</div>
          <div className="gov-metric-value text-danger">{groundedBuses.toLocaleString()}</div>
          <div className="gov-metric-trend">Requires Immediate Attention</div>
        </div>
        <div className="gov-metric-card">
          <div className="gov-metric-label">Repairs In Progress</div>
          <div className="gov-metric-value">{repairsInProgress.toLocaleString()}</div>
          <div className="gov-metric-trend">Across Active Depots</div>
        </div>
      </div>

      <div className="gov-dashboard-section">
        <h2>Recent Critical Breakdowns</h2>
        <div className="gov-incident-grid">
          {recentCriticalBreakdowns.map(incident => (
            <IncidentCard key={incident.id} {...incident} />
          ))}
        </div>
      </div>
    </div>
  );
}
