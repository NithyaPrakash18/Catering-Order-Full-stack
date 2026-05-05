import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0, pendingOrders: 0, completedOrders: 0, totalRevenue: 0, confirmedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await orderService.getAll();
      const orders = response.data || [];
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        completedOrders: orders.filter(o => o.status === 'completed').length,
        confirmedOrders: orders.filter(o => o.status === 'confirmed').length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0)
      });
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const statusColor = (status) => {
    const colors = {
      pending: { bg: '#fff3cd', color: '#856404' },
      confirmed: { bg: '#d1ecf1', color: '#0c5460' },
      completed: { bg: '#d4edda', color: '#155724' },
      cancelled: { bg: '#f8d7da', color: '#721c24' },
      preparing: { bg: '#e2d9f3', color: '#4a235a' },
    };
    return colors[status] || { bg: '#e2e3e5', color: '#383d41' };
  };

  return (
    <div style={{ padding: '0' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🍽️ Welcome to CaterCore</h2>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.85 }}>Catering Order Management System</p>
        </div>
        <div style={{ textAlign: 'right', opacity: 0.85 }}>
          <div style={{ fontSize: '0.9rem' }}>{new Date().toDateString()}</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Orders', value: stats.totalOrders, icon: '📋', color: '#3498db', bg: '#ebf5fb' },
          { label: 'Pending Orders', value: stats.pendingOrders, icon: '⏳', color: '#f39c12', bg: '#fef9e7' },
          { label: 'Confirmed Orders', value: stats.confirmedOrders, icon: '✅', color: '#27ae60', bg: '#eafaf1' },
          { label: 'Completed Orders', value: stats.completedOrders, icon: '🎉', color: '#8e44ad', bg: '#f5eef8' },
          { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: '#e74c3c', bg: '#fdedec' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: stat.bg,
            borderRadius: '12px',
            padding: '1.5rem',
            borderLeft: `4px solid ${stat.color}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
            <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.3rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#2c3e50' }}>📊 Order Overview</h3>
          {[
            { label: 'Wedding Events', count: 12, color: '#e74c3c' },
            { label: 'Corporate Events', count: 8, color: '#3498db' },
            { label: 'Birthday Parties', count: 15, color: '#f39c12' },
            { label: 'Other Events', count: 5, color: '#27ae60' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ color: '#555' }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '100px', height: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                  <div style={{ width: `${(item.count / 15) * 100}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
                </div>
                <span style={{ fontWeight: 'bold', color: item.color }}>{item.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#2c3e50' }}>🍛 Popular Menu Items</h3>
          {[
            { name: 'Chicken Biryani', orders: 45, icon: '🍗' },
            { name: 'Butter Chicken', orders: 38, icon: '🍛' },
            { name: 'Masala Dosa', orders: 32, icon: '🥞' },
            { name: 'Paneer Tikka', orders: 28, icon: '🧀' },
            { name: 'Gulab Jamun', orders: 25, icon: '🍮' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span>{item.icon} {item.name}</span>
              <span style={{ background: '#3498db', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                {item.orders} orders
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 1rem', color: '#2c3e50' }}>🕐 Recent Orders</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Order ID', 'Customer', 'Event Date', 'Guests', 'Status', 'Total'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left', color: '#555', fontWeight: '600', fontSize: '0.9rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? recentOrders.map(order => {
              const sc = statusColor(order.status);
              return (
                <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#3498db' }}>#{order.id}</td>
                  <td style={{ padding: '0.75rem' }}>{order.customer_name}</td>
                  <td style={{ padding: '0.75rem' }}>{order.event_date ? new Date(order.event_date).toLocaleDateString() : 'N/A'}</td>
                  <td style={{ padding: '0.75rem' }}>{order.guest_count}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ background: sc.bg, color: sc.color, padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500' }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#27ae60' }}>₹{order.total?.toLocaleString()}</td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No orders yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;