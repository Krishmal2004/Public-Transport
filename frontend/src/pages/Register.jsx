import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Swapped to React Router

const Register = () => {
  const navigate = useNavigate(); // Initialized standard React navigation
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (errors.contact && (name === 'phone' || name === 'email')) {
      setErrors((prev) => ({ ...prev, contact: null }));
    }
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = 'Please provide either a Phone number or an Email address.';
    }

    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError('');
    setSuccess('');

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone || undefined,
          email: formData.email || undefined,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || 'Registration failed. Please try again.');
        return;
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess(`Account created successfully! Welcome, ${data.user.name}.`);

      // Reset form
      setFormData({ name: '', phone: '', email: '', password: '', confirmPassword: '' });

      // Navigate to incident report form
      setTimeout(() => navigate('/report'), 1500);
    } catch (_err) {
      setApiError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: { maxWidth: '600px', margin: '0 auto', padding: '0 16px' },
    formGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column' },
    label: { fontSize: '13px', fontWeight: '600', color: 'var(--gov-dark-gray, #4a4a4a)', marginBottom: '8px' },
    input: { padding: '10px 12px', border: '1px solid var(--border, #ccc)', borderRadius: '4px', fontSize: '14px' },
    errorText: { color: '#cf222e', fontSize: '12px', marginTop: '4px', fontWeight: '500' },
    apiError: { color: '#cf222e', fontSize: '13px', marginBottom: '16px', padding: '10px 12px', backgroundColor: '#fff5f5', border: '1px solid #f5c6cb', borderRadius: '4px' },
    successMsg: { color: '#1a7f37', fontSize: '13px', marginBottom: '16px', padding: '10px 12px', backgroundColor: '#f0fff4', border: '1px solid #a3d9a5', borderRadius: '4px' },
    submitBtn: {
      backgroundColor: 'var(--gov-black, #1a1a1a)', color: '#fff', border: 'none',
      padding: '12px 20px', fontSize: '14px', fontWeight: '600', borderRadius: '4px',
      cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', opacity: loading ? 0.7 : 1,
    },
  };

  return (
    <div className="main-content">
      <div style={styles.container}>

        {/* Header matching your theme */}
        <div className="gov-page-header">
          <h1>System Registration</h1>
          <p className="gov-subtitle">Please enter your details to create an account.</p>
        </div>

        <div className="gov-metric-card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} noValidate>

            {apiError && <div style={styles.apiError}>{apiError}</div>}
            {success && <div style={styles.successMsg}>{success}</div>}

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">FULL NAME *</label>
              <input
                style={{...styles.input, borderColor: errors.name ? '#cf222e' : 'var(--border, #ccc)'}}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="User Name"
                disabled={loading}
              />
              {errors.name && <span style={styles.errorText}>{errors.name}</span>}
            </div>

            {errors.contact && <div style={{...styles.errorText, marginBottom: '12px'}}>{errors.contact}</div>}

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="phone">PHONE NUMBER</label>
              <input
                style={{...styles.input, borderColor: errors.phone ? '#cf222e' : 'var(--border, #ccc)'}}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0771234567"
                disabled={loading}
              />
              {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">EMAIL ADDRESS</label>
              <input
                style={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="test1@example.com"
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">PASSWORD *</label>
              <input
                style={{...styles.input, borderColor: errors.password ? '#cf222e' : 'var(--border, #ccc)'}}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="confirmPassword">CONFIRM PASSWORD *</label>
              <input
                style={{...styles.input, borderColor: errors.confirmPassword ? '#cf222e' : 'var(--border, #ccc)'}}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Registering…' : 'Register Account'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
