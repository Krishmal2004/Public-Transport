import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportDetailView = () => {
  const navigate = useNavigate();

  // Mocking the data exactly as it appears in your network response screenshot.
  // In reality, you would fetch this by ID or pass it via state.
  // Note: For the 5-minute timer to work locally right now, we simulate the created_at as "just now".
  const [report, setReport] = useState({
    id: 4,
    bus_no: "NB-7089",
    depot: "Maharagama",
    category: "Brake Failure",
    severity: "Low",
    description: "",
    location: "6.9142, 79.9736",
    created_at: new Date().toISOString(), // Simulating recent submission
    status: "Reported"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...report });
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    // Calculate initial time difference based on created_at
    const createdTime = new Date(report.created_at).getTime();
    const currentTime = new Date().getTime();
    const diffInSeconds = Math.max(0, 300 - Math.floor((currentTime - createdTime) / 1000));
    
    setTimeLeft(diffInSeconds);

    if (diffInSeconds <= 0) return;

    // Start live countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsEditing(false); // Force close edit mode if time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [report.created_at]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would PUT/PATCH to your backend API
    console.log("Saving updated report:", editData);
    setReport(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...report });
    setIsEditing(false);
  };

  // Format MM:SS for the timer
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

  return (
    <div className="main-content">
      <div style={styles.container}>
        
        <div className="gov-page-header">
          <button style={{...styles.btnSecondary, padding: '6px 12px', marginBottom: '16px'}} onClick={() => navigate(-1)}>← Back</button>
          <h1>Incident #{report.id} Details</h1>
          <p className="gov-subtitle">Submitted on {new Date(report.created_at).toLocaleString()}</p>
        </div>

        <div style={styles.card}>
          
          {/* Timer Display */}
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
                <span style={styles.value}>{report.depot}</span>
              )}
            </div>

            <div style={styles.fieldBox}>
              <span style={styles.label}>Breakdown Category</span>
              {isEditing ? (
                 <select style={styles.input} name="category" value={editData.category} onChange={handleEditChange}>
                  <option value="Engine">Engine</option>
                  <option value="Brake Failure">Brake Failure</option>
                  <option value="Transmission">Transmission</option>
                  <option value="Electrical">Electrical</option>
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
                  <span className={`gov-badge gov-sev-${report.severity.toLowerCase()}`}>{report.severity}</span>
                </span>
              )}
            </div>
            
            <div style={{...styles.fieldBox, gridColumn: 'span 2'}}>
              <span style={styles.label}>Location Coordinates</span>
              <span style={styles.value} className="gov-mono">{report.location}</span>
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
