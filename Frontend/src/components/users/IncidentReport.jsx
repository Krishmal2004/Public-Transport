import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api';

export default function IncidentReport() {
  const [formData, setFormData] = useState({
    busNo: '',
    depot: '',
    category: '',
    severity: '',
    description: '',
    location: 'Fetching location...',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success'|'error', message: string }
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch location automatically on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);
          setFormData(prev => ({ ...prev, location: `${lat}, ${lon}` }));
        },
        (error) => {
          setFormData(prev => ({ ...prev, location: 'Location access denied or unavailable' }));
        }
      );
    } else {
      setFormData(prev => ({ ...prev, location: 'Geolocation not supported by browser' }));
    }
  }, []);

  // Client-side pre-validation (fast feedback before hitting the server)
  const validate = () => {
    const newErrors = {};
    const busRegex = /^[A-Z]{2,3}-[0-9]{4}$/;

    if (!formData.busNo) {
      newErrors.busNo = 'Bus Registration Number is required.';
    } else if (!busRegex.test(formData.busNo)) {
      newErrors.busNo = 'Invalid format. Use AA-1234 or ABC-1234.';
    }

    if (!formData.depot) newErrors.depot = 'Please select an assigned SLTB depot.';
    if (!formData.category) newErrors.category = 'Please select a breakdown category.';
    if (!formData.severity) newErrors.severity = 'Please select a severity level.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run client-side checks first
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success — reset form (keep location)
        setSubmitStatus({ type: 'success', message: data.message || 'Incident reported successfully.' });
        setFormData(prev => ({
          ...prev,
          busNo: '',
          depot: '',
          category: '',
          severity: '',
          description: '',
        }));
        setErrors({});
        setTimeout(() => setSubmitStatus(null), 4000);
      } else if (response.status === 400 && data.errors) {
        // Server returned field-level validation errors — merge into local errors
        setErrors(data.errors);
        setSubmitStatus({ type: 'error', message: data.message || 'Please correct the errors below.' });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (networkError) {
      setSubmitStatus({ type: 'error', message: 'Unable to reach the server. Check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const styles = {
    container: { maxWidth: '600px', margin: '0 auto' },
    formGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column' },
    label: { fontSize: '13px', fontWeight: '600', color: 'var(--gov-dark-gray)', marginBottom: '8px', textTransform: 'uppercase' },
    input: { padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '14px', fontFamily: 'var(--sans)', color: 'var(--gov-black)', backgroundColor: 'var(--gov-white)' },
    textarea: { padding: '10px 12px', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '14px', minHeight: '100px', fontFamily: 'var(--sans)', color: 'var(--gov-black)', backgroundColor: 'var(--gov-white)' },
    errorText: { color: '#cf222e', fontSize: '12px', marginTop: '4px', fontWeight: '500' },
    submitBtn: { 
      backgroundColor: 'var(--gov-black)', color: '#fff', border: 'none', 
      padding: '12px 20px', fontSize: '14px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', marginTop: '8px' 
    },
    locationText: { fontSize: '13px', color: 'var(--gov-dark-gray)', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', backgroundColor: 'var(--gov-light-gray)', border: '1px solid var(--border)', borderRadius: '4px' }
  };

  return (
    <div className="container">
      <div style={styles.container}>
        <div className="gov-page-header">
          <h1>Log Breakdown Incident</h1>
          <p className="gov-subtitle">Report a new issue for immediate maintenance prioritization.</p>
        </div>

        {submitStatus && (
          <div style={{
            padding: '12px',
            backgroundColor: submitStatus.type === 'success' ? '#dafbe1' : '#fff0f0',
            color: submitStatus.type === 'success' ? '#1a7f37' : '#cf222e',
            border: `1px solid ${submitStatus.type === 'success' ? '#4ac26b' : '#ff9898'}`,
            borderRadius: '4px',
            marginBottom: '20px',
            fontWeight: '500',
          }}>
            {submitStatus.message}
          </div>
        )}

        <div className="gov-metric-card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} noValidate>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Automatic Location (GPS)</label>
              <div style={styles.locationText}>
                <span>📍</span> {formData.location}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="busNo">Bus Registration Number</label>
              <input
                style={{...styles.input, borderColor: errors.busNo ? '#cf222e' : 'var(--border)'}}
                type="text"
                id="busNo"
                name="busNo"
                value={formData.busNo}
                onChange={handleChange}
                placeholder="e.g. NB-4521"
              />
              {errors.busNo && <span style={styles.errorText}>{errors.busNo}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="depot">Assigned Depot</label>
              <select
                style={{...styles.input, borderColor: errors.depot ? '#cf222e' : 'var(--border)'}}
                id="depot"
                name="depot"
                value={formData.depot}
                onChange={handleChange}
              >
                <option value="">Select Depot...</option>
                <option value="Maharagama">Maharagama</option>
                <option value="Pettah">Pettah</option>
                <option value="Meegoda">Meegoda</option>
              </select>
              {errors.depot && <span style={styles.errorText}>{errors.depot}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="category">Breakdown Category</label>
              <select
                style={{...styles.input, borderColor: errors.category ? '#cf222e' : 'var(--border)'}}
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category...</option>
                <option value="Engine">Engine</option>
                <option value="Brake Failure">Brake Failure</option>
                <option value="Transmission">Transmission</option>
                <option value="Electrical Issue">Electrical Issue</option>
                <option value="Body Damage">Body Damage</option>
              </select>
              {errors.category && <span style={styles.errorText}>{errors.category}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="severity">Severity Level</label>
              <select
                style={{...styles.input, borderColor: errors.severity ? '#cf222e' : 'var(--border)'}}
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value="">Select Severity...</option>
                <option value="Low">Low - Drivable / Minor</option>
                <option value="High">High - Major Repair Needed</option>
                <option value="Critical">Critical - Safety Hazard / Immobile</option>
              </select>
              {errors.severity && <span style={styles.errorText}>{errors.severity}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="description">Problem Description</label>
              <textarea
                style={styles.textarea}
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail (e.g. loud grinding noise from front axle when braking)"
              />
            </div>

            <button
              type="submit"
              style={{ ...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Incident Report'}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
