import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const styles = {
    hero: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'var(--gov-white)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      boxShadow: 'var(--shadow-sm)',
      marginTop: '40px'
    },
    title: {
      fontSize: '32px',
      color: 'var(--gov-black)',
      marginBottom: '16px'
    },
    subtitle: {
      fontSize: '16px',
      color: 'var(--gov-dark-gray)',
      maxWidth: '600px',
      margin: '0 auto 32px auto',
      lineHeight: '1.5'
    },
    btnGroup: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center'
    },
    btnPrimary: {
      padding: '12px 24px',
      backgroundColor: 'var(--gov-black)',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    btnSecondary: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      color: 'var(--gov-black)',
      border: '1px solid var(--gov-black)',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  return (
    <div className="container">
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to SLTB DepotOps</h1>
        <p style={styles.subtitle}>
          The centralized platform for Sri Lanka Transport Board to manage fleet health, track breakdown incidents, and coordinate maintenance repairs in real-time.
        </p>
        <div style={styles.btnGroup}>
          <button style={styles.btnPrimary} onClick={() => navigate('/login')}>
            Login
          </button>
          <button style={styles.btnSecondary} onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '40px 20px', backgroundColor: 'var(--gov-white)', border: '1px solid var(--border)', borderRadius: '4px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--gov-black)', marginBottom: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '8px' }}>
          About SLTB DepotOps
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--gov-dark-gray)', fontSize: '15px', lineHeight: '1.6' }}>
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
    </div>
  );
}
