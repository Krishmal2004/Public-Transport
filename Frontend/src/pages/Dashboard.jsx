import React, { useState, useEffect } from 'react';
import IncidentCard from '../components/IncidentCard';

const API_BASE = 'http://localhost:8000/api';

/** Format a UTC timestamp as a human-readable relative time string */
function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/incidents/stats`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed to load stats');
        setStats(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Helper — find count for a given key from bySeverity or byStatus arrays
  const countFor = (arr = [], key, field = 'severity') =>
    parseInt((arr.find(r => r[field] === key) || {}).count || 0, 10);

  const grounded = countFor(stats?.byStatus, 'Reported', 'status') +
                   countFor(stats?.byStatus, 'In Workshop', 'status');
  const inProgress = countFor(stats?.byStatus, 'In-Progress', 'status');

  return (
    <div className="container">
      <div className="gov-page-header">
        <h1>Fleet Overview</h1>
        <p className="gov-subtitle">Real-time status of SLTB operational assets.</p>
      </div>

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#fff0f0', color: '#cf222e', border: '1px solid #ff9898', borderRadius: '4px', marginBottom: '20px' }}>
          ⚠ Could not load live data: {error}
        </div>
      )}

      <div className="gov-metric-grid">
        <div className="gov-metric-card">
          <div className="gov-metric-label">Total Incidents Reported</div>
          <div className="gov-metric-value text-danger">
            {loading ? '—' : stats?.total ?? 0}
          </div>
          <div className="gov-metric-trend">All-time across all depots</div>
        </div>
        <div className="gov-metric-card">
          <div className="gov-metric-label">Grounded / In Workshop</div>
          <div className="gov-metric-value text-danger">
            {loading ? '—' : grounded}
          </div>
          <div className="gov-metric-trend">Awaiting repair</div>
        </div>
        <div className="gov-metric-card">
          <div className="gov-metric-label">Repairs In Progress</div>
          <div className="gov-metric-value">
            {loading ? '—' : inProgress}
          </div>
          <div className="gov-metric-trend">Active maintenance</div>
        </div>
      </div>

      <div className="gov-dashboard-section">
        <h2>Recent Breakdown Reports</h2>

        {loading && (
          <p style={{ color: 'var(--gov-dark-gray)', fontSize: '14px' }}>Loading incidents...</p>
        )}

        {!loading && stats?.recent?.length === 0 && (
          <p style={{ color: 'var(--gov-dark-gray)', fontSize: '14px' }}>No incidents reported yet.</p>
        )}

        <div className="gov-incident-grid">
          {!loading && stats?.recent?.map(incident => (
            <IncidentCard
              key={incident.id}
              busNo={incident.bus_no}
              category={incident.category}
              severity={incident.severity}
              depot={incident.depot}
              time={timeAgo(incident.created_at)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
