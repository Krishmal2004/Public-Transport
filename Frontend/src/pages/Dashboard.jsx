import React, { useState, useEffect } from 'react';
import IncidentCard from '../components/IncidentCard';
import { mockIncidents } from '../data/mockData';
import BASE_URL from '../config';

export default function Dashboard() {
  const [incidents, setIncidents] = useState(mockIncidents);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/incidents`);
        const data = await res.json();
        if (data.success && data.data) {
          const mapped = data.data.map(inc => ({
            id: `TKT-${inc.id}`,
            busNo: inc.bus_no,
            depot: inc.depot,
            category: inc.category,
            severity: inc.severity,
            status: inc.status || 'Reported',
            time: new Date(inc.created_at).toLocaleString()
          }));
          setIncidents(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch live incidents:", error);
      }
    };
    fetchIncidents();
  }, []);

  // Dynamic Calculations based on data
  const groundedBuses = incidents.filter(inc => inc.status !== 'Fixed').length;
  const repairsInProgress = incidents.filter(inc => inc.status === 'In Workshop' || inc.status === 'In-Progress').length;

  // Just a mockup number for active fleet
  const activeFleet = 7100 - groundedBuses; // Out of 7100 total buses (from spec)

  // Get only critical/high recent incidents for the dashboard display
  const recentCriticalBreakdowns = incidents
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