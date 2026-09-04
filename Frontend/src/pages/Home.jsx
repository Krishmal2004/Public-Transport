import React, { useState } from 'react';

// --- MODAL STYLES ---
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px'
  },
  content: {
    backgroundColor: 'var(--gov-white, #ffffff)',
    border: '1px solid var(--border, #ccc)',
    borderRadius: '4px',
    boxShadow: 'var(--shadow-sm)',
    padding: '32px',
    width: '100%',
    maxWidth: '500px',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'var(--gov-dark-gray, #4a4a4a)',
    lineHeight: 1
  },
  formGroup: { marginBottom: '20px', display: 'flex', flexDirection: 'column' },
  label: { fontSize: '13px', fontWeight: '600', color: 'var(--gov-dark-gray, #4a4a4a)', marginBottom: '8px', textTransform: 'uppercase' },
  input: { padding: '10px 12px', border: '1px solid var(--border, #ccc)', borderRadius: '4px', fontSize: '14px' },
  errorText: { color: '#cf222e', fontSize: '12px', marginTop: '4px', fontWeight: '500' },
  submitBtn: { 
    backgroundColor: 'var(--gov-black, #1a1a1a)', color: '#fff', border: 'none', 
    padding: '12px 20px', fontSize: '14px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', marginTop: '8px', width: '100%' 
  }
};

// --- LOGIN MODAL COMPONENT ---
const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login credentials validated!', formData);
      // Execute your login logic here, then close modal
      onClose();
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button style={modalStyles.closeBtn} onClick={onClose}>&times;</button>
        <div className="gov-page-header">
          <h2>System Login</h2>
          <p className="gov-subtitle" style={{marginBottom: '24px'}}>Enter your credentials to access the dashboard.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label} htmlFor="username">USERNAME</label>
            <input
              style={{...modalStyles.input, borderColor: errors.username ? '#cf222e' : 'var(--border, #ccc)'}}
              type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username"
            />
            {errors.username && <span style={modalStyles.errorText}>{errors.username}</span>}
          </div>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label} htmlFor="password">PASSWORD</label>
            <input
              style={{...modalStyles.input, borderColor: errors.password ? '#cf222e' : 'var(--border, #ccc)'}}
              type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••"
            />
            {errors.password && <span style={modalStyles.errorText}>{errors.password}</span>}
          </div>
          <button type="submit" style={modalStyles.submitBtn}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

// --- REGISTER MODAL COMPONENT ---
const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (errors.contact && (name === 'phone' || name === 'email')) setErrors((prev) => ({ ...prev, contact: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phone.trim() && !formData.email.trim()) newErrors.contact = 'Provide a Phone number or Email.';
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = 'Phone number must be exactly 10 digits.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form validated successfully!', formData);
      onSwitchToLogin();
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <button style={modalStyles.closeBtn} onClick={onClose}>&times;</button>
        <div className="gov-page-header">
          <h2>System Registration</h2>
          <p className="gov-subtitle" style={{marginBottom: '24px'}}>Enter your details to create an account.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label} htmlFor="name">FULL NAME *</label>
            <input style={{...modalStyles.input, borderColor: errors.name ? '#cf222e' : 'var(--border, #ccc)'}} type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="User Name" />
            {errors.name && <span style={modalStyles.errorText}>{errors.name}</span>}
          </div>
          {errors.contact && <div style={{...modalStyles.errorText, marginBottom: '12px'}}>{errors.contact}</div>}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={modalStyles.label} htmlFor="phone">PHONE</label>
              <input style={{...modalStyles.input, borderColor: errors.phone ? '#cf222e' : 'var(--border, #ccc)'}} type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="0771234567" />
              {errors.phone && <span style={modalStyles.errorText}>{errors.phone}</span>}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={modalStyles.label} htmlFor="email">EMAIL</label>
              <input style={modalStyles.input} type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="user123@example.com" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={modalStyles.label} htmlFor="password">PASSWORD *</label>
              <input style={{...modalStyles.input, borderColor: errors.password ? '#cf222e' : 'var(--border, #ccc)'}} type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
              {errors.password && <span style={modalStyles.errorText}>{errors.password}</span>}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={modalStyles.label} htmlFor="confirmPassword">CONFIRM *</label>
              <input style={{...modalStyles.input, borderColor: errors.confirmPassword ? '#cf222e' : 'var(--border, #ccc)'}} type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
              {errors.confirmPassword && <span style={modalStyles.errorText}>{errors.confirmPassword}</span>}
            </div>
          </div>
          <button type="submit" style={modalStyles.submitBtn}>Register Account</button>
        </form>
      </div>
    </div>
  );
};

// --- MAIN HOME COMPONENT ---
export default function Home() {
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | null

  const styles = {
    hero: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'var(--gov-white, #ffffff)',
      border: '1px solid var(--border, #ccc)',
      borderRadius: '4px',
      boxShadow: 'var(--shadow-sm)',
      marginTop: '40px'
    },
    title: { fontSize: '32px', color: 'var(--gov-black, #1a1a1a)', marginBottom: '16px' },
    subtitle: { fontSize: '16px', color: 'var(--gov-dark-gray, #4a4a4a)', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: '1.5' },
    btnGroup: { display: 'flex', gap: '16px', justifyContent: 'center' },
    btnPrimary: { padding: '12px 24px', backgroundColor: 'var(--gov-black, #1a1a1a)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
    btnSecondary: { padding: '12px 24px', backgroundColor: 'transparent', color: 'var(--gov-black, #1a1a1a)', border: '1px solid var(--gov-black, #1a1a1a)', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }
  };

  return (
    <div className="container">
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to SLTB DepotOps</h1>
        <p style={styles.subtitle}>
          The centralized platform for Sri Lanka Transport Board to manage fleet health, track breakdown incidents, and coordinate maintenance repairs in real-time.
        </p>
        <div style={styles.btnGroup}>
          <button style={styles.btnPrimary} onClick={() => setActiveModal('login')}>
            Login
          </button>
          <button style={styles.btnSecondary} onClick={() => setActiveModal('register')}>
            Register
          </button>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '40px 20px', backgroundColor: 'var(--gov-white, #ffffff)', border: '1px solid var(--border, #ccc)', borderRadius: '4px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--gov-black, #1a1a1a)', marginBottom: '16px', borderBottom: '2px solid var(--border, #ccc)', paddingBottom: '8px' }}>
          About SLTB DepotOps
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--gov-dark-gray, #4a4a4a)', fontSize: '15px', lineHeight: '1.6' }}>
          <p>
            The Sri Lanka Transport Board (SLTB) operates a massive fleet of roughly 7,100 buses nationwide. However, a significant portion of this fleet often sits idle at depots due to untracked mechanical breakdowns, poor maintenance scheduling, and spare-part bottlenecks.
          </p>
          <p>
            <strong>SLTB DepotOps</strong> was built to solve this exact problem. By shifting from manual paper logbooks to a real-time digital ticket tracking system, our platform empowers drivers to log breakdown incidents instantly. Simultaneously, it provides depot engineering teams with a live, prioritized maintenance queue.
          </p>
          <p>
            Our goal is simple: reduce bus downtime, keep more buses on the active roster, and ensure that thousands of daily commuters are never left stranded due to sudden service cancellations.
          </p>
        </div>
      </div>

      {/* Render Modals based on active state */}
      {activeModal === 'login' && (
        <LoginModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'register' && (
        <RegisterModal 
          onClose={() => setActiveModal(null)} 
          onSwitchToLogin={() => setActiveModal('login')} 
        />
      )}
    </div>
  );
}
