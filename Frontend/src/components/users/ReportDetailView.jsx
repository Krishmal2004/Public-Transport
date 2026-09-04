import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../config';

const ReportDetailView = () => {
  const navigate = useNavigate();
  const params = useParams();

  // Safely extract the numeric ID whether the route is configured as :id or :id param string
  const rawParam = params.id || '';
  const incidentId = rawParam.includes('=') ? rawParam.split('=')[1] : rawParam;

  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds



  // Fetch the specific incident by its ID directly from the backend
  useEffect(() => {
    const fetchIncidentDetails = async () => {
      if (!incidentId) {
        setError('Invalid incident ID');
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/incidents`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch incident details');
        }

        const responseData = await response.json();
        const allIncidents = responseData.data || responseData;

        // Match the incident by numeric ID
        const currentIncident = allIncidents.find(
          (inc) => String(inc.id) === String(incidentId)
        );

        if (!currentIncident) {
          throw new Error(`Incident #${incidentId} not found.`);
        }

        setReport(currentIncident);
        setEditData(currentIncident);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidentDetails();
  }, [incidentId]);

  // Countdown timer logic based on the real created_at timestamp
  useEffect(() => {
    if (!report?.created_at) return;

    const createdTime = new Date(report.created_at).getTime();
    const currentTime = new Date().getTime();
    const diffInSeconds = Math.max(0, 300 - Math.floor((currentTime - createdTime) / 1000));
    
    setTimeLeft(diffInSeconds);

    if (diffInSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsEditing(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [report?.created_at]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving updated report:", editData);
    setReport(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...report });
    setIsEditing(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const styles = {
    container: { maxWidth: '800px', margin: '0 auto', padding: '0 16px' },
    card: { padding: '24px', backgroundColor: 'var(--gov-white)', border: '1px solid var(--border)', borderRadius: '4px', boxShadow: 'var(--shadow-sm)', position: 'relative' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' },
    fieldBox: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '12px', fontWeight: '600', color: 'var(--gov-dark-gray)', textTransform: 'uppercase' },
    value: { fontSize: '15px', color: 'var(--gov-black)', fontWeight: '500' },
    input: { padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '14px', width: '100%' },
    timerBadge: { position: 'absolute', top: '24px', right: '24px', padding: '6px 12px', backgroundColor: timeLeft > 60 ? '#dafbe1' : '#ffebe9', color: timeLeft > 60 ? '#1a7f37' : '#cf222e', border: `1px solid ${timeLeft > 60 ? '#4ac26b' : '#ff8182'}`, borderRadius: '4px', fontSize: '13px', fontWeight: '600' },
    btnPrimary: { backgroundColor: 'var(--gov-black)', color: '#fff', border: 'none', padding: '10px 16px', fontSize: '14px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer' },
    btnSecondary: { backgroundColor: 'transparent', color: 'var(--gov-black)', border: '1px solid var(--gov-mid-gray)', padding: '10px 16px', fontSize: '14px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer' },
    actions: { display: 'flex', gap: '12px', marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '20px' }
  };

  if (isLoading) {
    return <div className="main-content"><div style={styles.container}><p>Loading incident details...</p></div></div>;
  }

  if (error || !report) {
    return (
      <div className="main-content">
        <div style={styles.container}>
          <button style={{...styles.btnSecondary, padding: '6px 12px', marginBottom: '16px'}} onClick={() => navigate(-1)}>← Back</button>
          <p style={{ color: 'red' }}>Error: {error || 'Incident not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div style={styles.container}>
        
        <div className="gov-page-header">
          <button style={{...styles.btnSecondary, padding: '6px 12px', marginBottom: '16px'}} onClick={() => navigate(-1)}>← Back</button>
          <h1>Incident #{report.id} Details</h1>
          <p className="gov-subtitle">Submitted on {new Date(report.created_at).toLocaleString()}</p>
        </div>

        <div style={styles.card}>
          
          <div style={styles.timerBadge}>
            {timeLeft > 0 ? `Editable for ${formatTime(timeLeft)}` : 'Editing Locked'}
          </div>

          <div style={styles.grid}>
            <div style={styles.fieldBox}>
              <span style={styles.label}>Bus Registration Number</span>
              {isEditing ? (
                <input style={styles.input} name="bus_no" value={editData.bus_no} onChange={handleEditChange} />
              ) : (
                <span style={styles.value} className="gov-mono">{report.bus_no}</span>
              )}
            </div>

            <div style={styles.fieldBox}>
              <span style={styles.label}>Assigned Depot</span>
              {isEditing ? (
                <select style={styles.input} name="depot" value={editData.depot} onChange={handleEditChange}>
                  <option value="Maharagama">Maharagama</option>
                  <option value="Pettah">Pettah</option>
                  <option value="Meegoda">Meegoda</option>
                </select>
              ) : (
                <span style={styles.value}>{report.depot || 'N/A'}</span>
              )}
            </div>

            <div style={styles.fieldBox}>
              <span style={styles.label}>Breakdown Category</span>
              {isEditing ? (
                 <select style={styles.input} name="category" value={editData.category} onChange={handleEditChange}>
                  <option value="Engine">Engine</option>
                  <option value="Brake Failure">Brake Failure</option>
                  <option value="Transmission">Transmission</option>
                  <option value="Electrical Issue">Electrical Issue</option>
                </select>
              ) : (
                <span style={styles.value}>{report.category}</span>
              )}
            </div>

            <div style={styles.fieldBox}>
              <span style={styles.label}>Severity Level</span>
              {isEditing ? (
                 <select style={styles.input} name="severity" value={editData.severity} onChange={handleEditChange}>
                  <option value="Low">Low</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              ) : (
                <span style={styles.value}>
                  <span className={`gov-badge gov-sev-${report.severity ? report.severity.toLowerCase() : 'low'}`}>{report.severity}</span>
                </span>
              )}
            </div>
            
            <div style={{...styles.fieldBox, gridColumn: 'span 2'}}>
              <span style={styles.label}>Location Coordinates</span>
              <span style={styles.value} className="gov-mono">{report.location || 'N/A'}</span>
            </div>

            <div style={{...styles.fieldBox, gridColumn: 'span 2'}}>
              <span style={styles.label}>Problem Description</span>
              {isEditing ? (
                <textarea 
                  style={{...styles.input, minHeight: '80px', resize: 'vertical'}} 
                  name="description" 
                  value={editData.description || ''} 
                  onChange={handleEditChange} 
                  placeholder="Describe the issue..."
                />
              ) : (
                <span style={styles.value}>{report.description || 'No description provided.'}</span>
              )}
            </div>
          </div>

          <div style={styles.actions}>
            {isEditing ? (
              <>
                <button style={styles.btnPrimary} onClick={handleSave}>Save Changes</button>
                <button style={styles.btnSecondary} onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button 
                style={{...styles.btnPrimary, opacity: timeLeft === 0 ? 0.5 : 1, cursor: timeLeft === 0 ? 'not-allowed' : 'pointer'}} 
                onClick={() => setIsEditing(true)}
                disabled={timeLeft === 0}
              >
                Edit Report
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReportDetailView;
