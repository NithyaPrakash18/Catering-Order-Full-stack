import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('Received');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.length !== 6) {
      setError('Please enter a valid 6-digit Order ID');
      return;
    }
    setError('');
    onLogin(orderId, status);
  };

  return (
    <div style={styles.bg}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>🍽️</div>
          <h1 style={styles.title}>CaterCore</h1>
          <p style={styles.subtitle}>Order Management & Status Portal</p>
        </div>

        <div style={styles.body}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Order ID</label>
              <input
                type="text"
                placeholder="Enter your 6-digit Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                maxLength={6}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Order Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={styles.select}
              >
                <option>Received</option>
                <option>Confirmed</option>
                <option>In Preparation</option>
                <option>Out for Delivery</option>
                <option>Delivered</option>
              </select>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.btn}>
              Track Order
            </button>

            <p style={styles.help}>
              Need help?{' '}
              <span style={styles.link}>Contact support.</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  bg: {
    minHeight: '100vh',
    background: '#e8f5e9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '380px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    background: 'white',
  },
  header: {
    background: '#2ecc71',
    padding: '2rem',
    textAlign: 'center',
    color: 'white',
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    margin: '0.5rem 0 0',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.85)',
  },
  body: {
    padding: '2rem',
  },
  formGroup: {
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #2ecc71',
    borderRadius: '6px',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  btn: {
    width: '100%',
    padding: '0.85rem',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  error: {
    color: 'red',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },
  help: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: '#2ecc71',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Login;