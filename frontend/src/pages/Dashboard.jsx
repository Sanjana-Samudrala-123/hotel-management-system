import React, { useEffect, useState } from 'react';
import { adminApi } from '../api/api';
import { Bed, Users, Calendar, Wallet, TrendingUp, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalCustomers: 0,
    totalBookings: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    adminApi.getStats().then(res => setStats(res.data)).catch(err => console.error(err));
  }, []);

  const statItems = [
    { label: 'Total Rooms', value: stats.totalRooms, icon: <Bed />, color: 'var(--primary)' },
    { label: 'Available Rooms', value: stats.availableRooms, icon: <TrendingUp />, color: 'var(--success)' },
    { label: 'Customers', value: stats.totalCustomers, icon: <Users />, color: 'var(--accent)' },
    { label: 'Bookings', value: stats.totalBookings, icon: <Calendar />, color: 'var(--secondary)' },
    { label: 'Orders', value: stats.totalOrders, icon: <ShoppingCart />, color: 'var(--primary)' },
    { label: 'Revenue (INR)', value: `₹${stats.totalRevenue.toFixed(2)}`, icon: <Wallet />, color: 'var(--success)' },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>GrandHotel Dashboard</h1>
      <div className="stats-grid">
        {statItems.map((item, index) => (
          <div key={index} className="card" style={{ borderTop: `4px solid ${item.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: item.color }}>{item.icon}</span>
              <span className="btn" style={{ background: `${item.color}20`, color: item.color, padding: '0.2rem 0.6rem', fontSize: '0.8rem' }}>Live</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{item.value}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.label}</p>
          </div>
        ))}
      </div>
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>Welcome, {user?.username || 'Guest'}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your hotel operations, customer bookings, and restaurant orders seamlessly from this interface.</p>
      </div>
    </div>
  );
};

export default Dashboard;
