import React, { useState, useEffect } from 'react';
import { mockIncidents } from '../data/mockData';

export default function RepairQueue() {
  const [queue, setQueue] = useState(mockIncidents);
  const [filterDepot, setFilterDepot] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const res = await fetch(`${API_BASE}/incidents`);
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
          setQueue(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch live incidents:", error);
      }
    };
    fetchIncidents();
  }, []);

  // Filtering logic
  const filteredQueue = queue.filter(item => {
    const matchDepot = filterDepot === 'All' || item.depot === filterDepot;
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchSearch = item.busNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDepot && matchStatus && matchSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    setQueue(queue.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const severityColor = (sev) => {
    switch (sev) {
      case 'Critical': return 'gov-sev-critical';
      case 'High': return 'gov-sev-high';
      default: return 'gov-sev-low';
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Reported': return 'gov-stat-reported';
      case 'In Workshop':
      case 'In-Progress': return 'gov-stat-progress';
      case 'Fixed':
      case 'Resolved': return 'gov-stat-fixed';
      default: return '';
    }
  };

  return (
    <div className="container">
      <div className="gov-page-header">
        <h1>Depot Repair Queue</h1>
        <p className="gov-subtitle">Live tracking and processing of all fleet breakdown incidents.</p>
      </div>

      <div className="gov-filters-section">
        <input
          type="text"
          placeholder="Search Bus No or Ticket ID..."
          className="gov-input gov-search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="gov-select"
          value={filterDepot}
          onChange={(e) => setFilterDepot(e.target.value)}
        >
          <option value="All">All Depots</option>
          <option value="Maharagama">Maharagama</option>
          <option value="Pettah">Pettah</option>
          <option value="Meegoda">Meegoda</option>
        </select>

        <select
          className="gov-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Reported">Reported</option>
          <option value="In Workshop">In Workshop</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Fixed">Fixed</option>
        </select>
      </div>

      <div className="gov-table-container">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Bus Reg No</th>
              <th>Depot</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueue.map((item) => (
              <tr key={item.id}>
                <td className="gov-mono">{item.id}</td>
                <td className="gov-bold">{item.busNo}</td>
                <td>{item.depot}</td>
                <td>{item.category}</td>
                <td>
                  <span className={`gov-badge ${severityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                </td>
                <td>
                  <span className={`gov-badge ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <select
                    className="gov-action-select"
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  >
                    <option value="Reported">Set: Reported</option>
                    <option value="In Workshop">Set: In Workshop</option>
                    <option value="In-Progress">Set: In-Progress</option>
                    <option value="Fixed">Set: Fixed</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredQueue.length === 0 && (
              <tr>
                <td colSpan="7" className="gov-empty-state">No matching repair tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}