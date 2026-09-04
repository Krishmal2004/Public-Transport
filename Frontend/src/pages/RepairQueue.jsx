import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api';

export default function RepairQueue() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDepot, setFilterDepot] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null); // tracks which row is being saved

  // Fetch all incidents on mount
  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const res = await fetch(`${API_BASE}/incidents`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed to load repair queue');
        // Map snake_case DB fields to camelCase for the UI
        setQueue(json.data.map(normalise));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQueue();
  }, []);

  /** Normalise a DB row into the shape RepairQueue expects */
  const normalise = (row) => ({
    id: row.id,
    ticketId: `TKT-${String(row.id).padStart(3, '0')}`,
    busNo: row.bus_no,
    depot: row.depot,
    category: row.category,
    severity: row.severity,
    status: row.status,
    description: row.description,
    created_at: row.created_at,
  });

  /** PATCH status on the server, then update local state */
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_BASE}/incidents/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Update failed');
      // Update local state with the confirmed value from the server
      setQueue(prev =>
        prev.map(item => item.id === id ? { ...item, status: json.data.status } : item)
      );
    } catch (err) {
      alert(`Could not update status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtering logic
  const filteredQueue = queue.filter(item => {
    const matchDepot = filterDepot === 'All' || item.depot === filterDepot;
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchSearch =
      item.busNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticketId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDepot && matchStatus && matchSearch;
  });

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

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#fff0f0', color: '#cf222e', border: '1px solid #ff9898', borderRadius: '4px', marginBottom: '20px' }}>
          ⚠ {error}
        </div>
      )}

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
            {loading && (
              <tr>
                <td colSpan="7" className="gov-empty-state">Loading repair queue...</td>
              </tr>
            )}

            {!loading && filteredQueue.map((item) => (
              <tr key={item.id}>
                <td className="gov-mono">{item.ticketId}</td>
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
                    disabled={updatingId === item.id}
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

            {!loading && filteredQueue.length === 0 && (
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
