import React, { useEffect, useState } from 'react';
import { customerApi } from '../api/api';
import { Plus, Edit, Trash2, Mail, Phone, User } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    customerApi.getAll().then(res => setCustomers(res.data)).catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    customerApi.add(newCustomer).then(() => {
      fetchCustomers();
      setShowForm(false);
      setNewCustomer({ name: '', email: '', phone: '' });
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this customer?')) {
      customerApi.delete(id).then(fetchCustomers);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Customer Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Register Customer
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>New Customer Registration</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) auto', gap: '1rem', marginTop: '1rem' }}>
            <input 
              type="text" placeholder="Full Name" className="btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
              value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} required
            />
            <input 
              type="email" placeholder="Email Address" className="btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
              value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} required
            />
            <input 
              type="text" placeholder="Phone Number" className="btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
              value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} required
            />
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      )}

      <div className="stats-grid">
        {customers.map(customer => (
          <div key={customer.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--primary)', borderRadius: '50%' }}><User size={20}/></div>
              <div>
                <h3 style={{ margin: 0 }}>{customer.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ID: #{customer.id}</p>
              </div>
            </div>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <Mail size={14} color="var(--accent)"/> {customer.email}
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <Phone size={14} color="var(--success)"/> {customer.phone}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button className="btn" style={{ padding: '0.4rem', color: 'var(--text-secondary)' }}><Edit size={16} /></button>
              <button className="btn" style={{ padding: '0.4rem', color: 'var(--danger)' }} onClick={() => handleDelete(customer.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
