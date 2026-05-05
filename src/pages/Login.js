import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setError('');
    onLogin(phone, password);
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
              <label style={styles.label}>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your 10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.btn}>
              Login
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