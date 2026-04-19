import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import Customers from './pages/Customers';
import Admin from './pages/Admin';
import Halls from './pages/Halls';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>Catering Order Management</h1>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/halls">Halls</Link>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/halls" element={<Halls />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;