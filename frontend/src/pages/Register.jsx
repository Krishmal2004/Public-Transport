import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

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
  };

  const validate = () => {
    const newErrors = {};

    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Phone OR Email is required
    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = 'Please provide either a Phone number or an Email address.';
    }

    // Phone must be exactly 10 digits if provided
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    // Password is required
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    // Passwords must match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form validated successfully!', formData);
      // Add your API submission logic here
    }
  };

  // Inline styles for form elements to complement your gov-theme
  const styles = {
    container: { maxWidth: '600px', margin: '0 auto', padding: '0 16px' },
    formGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column' },
    label: { fontSize: '13px', fontWeight: '600', color: 'var(--gov-dark-gray, #4a4a4a)', marginBottom: '8px' },
    input: { padding: '10px 12px', border: '1px solid var(--border, #ccc)', borderRadius: '4px', fontSize: '14px' },
    errorText: { color: '#cf222e', fontSize: '12px', marginTop: '4px', fontWeight: '500' },
    submitBtn: { 
      backgroundColor: 'var(--gov-black, #1a1a1a)', color: '#fff', border: 'none', 
      padding: '12px 20px', fontSize: '14px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', marginTop: '8px' 
    }
  };

  return (
    <div className="main-content">
      <div style={styles.container}>
        
        {/* Header matching your theme */}
        <div className="gov-page-header">
          <h1>System Registration</h1>
          <p className="gov-subtitle">Please enter your details to create an account.</p>
        </div>

        {/* Utilizing your metric card class as a clean container for the form */}
        <div className="gov-metric-card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} noValidate>
            
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
              />
              {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
            </div>

            <button type="submit" style={styles.submitBtn}>
              Register Account
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
