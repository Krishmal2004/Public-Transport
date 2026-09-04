import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the standard React router

const Login = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || 'Login failed. Please try again.');
        return;
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setSuccess(`Welcome back, ${data.user.name}!`);

      // TODO: redirect to dashboard e.g. navigate('/dashboard')
    } catch (err) {
      setApiError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Inline styles for form elements keeping consistency with your gov-theme
  const styles = {
    container: { maxWidth: '500px', margin: '0 auto', padding: '0 16px' },
    formGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column' },
    label: { fontSize: '13px', fontWeight: '600', color: 'var(--gov-dark-gray, #4a4a4a)', marginBottom: '8px', textTransform: 'uppercase' },
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
          <h1>System Login</h1>
          <p className="gov-subtitle">Enter your credentials to access the dashboard.</p>
        </div>

        {/* Utilizing your metric card class as a clean container for the form */}
        <div className="gov-metric-card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} noValidate>

            {apiError && <div style={styles.apiError}>{apiError}</div>}
            {success && <div style={styles.successMsg}>{success}</div>}

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="username">USERNAME</label>
              <input
                style={{...styles.input, borderColor: errors.username ? '#cf222e' : 'var(--border, #ccc)'}}
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your email or phone"
                disabled={loading}
              />
              {errors.username && <span style={styles.errorText}>{errors.username}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">PASSWORD</label>
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

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing In…' : 'Sign In'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
