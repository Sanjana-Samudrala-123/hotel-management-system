import React, { useEffect, useState } from 'react';
import { bookingApi, roomApi, customerApi } from '../api/api';
import { Plus, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBooking, setNewBooking] = useState({
    checkInDate: '',
    checkOutDate: '',
    customer: { id: '' },
    room: { id: '' }
  });

  useEffect(() => { 
    fetchData(); 
    if (user?.customer?.id) {
        setNewBooking(prev => ({ ...prev, customer: { id: user.customer.id } }));
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [bRes, rRes, cRes] = await Promise.all([
        bookingApi.getAll(),
        roomApi.getAll(),
        customerApi.getAll()
      ]);
      setBookings(bRes.data);
      setRooms(rRes.data.filter(r => r.status === 'AVAILABLE'));
      setCustomers(cRes.data);
    } catch (err) { console.error(err); }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!newBooking.customer.id) {
        alert("Please select a customer");
        return;
    }

    try {
      await bookingApi.add(newBooking);
      fetchData();
      setShowForm(false);
      setNewBooking({ 
        checkInDate: '', 
        checkOutDate: '', 
        customer: { id: user?.customer?.id || '' }, 
        room: { id: '' } 
      });
      alert("Booking successful!");
    } catch (err) { 
        console.error("Booking error:", err);
        let errorMsg = "Booking failed. Please try again.";
        if (err.response?.data) {
            if (typeof err.response.data === 'string') {
                errorMsg = err.response.data;
            } else if (err.response.data.message) {
                errorMsg = err.response.data.message;
            } else {
                errorMsg = JSON.stringify(err.response.data);
            }
        }
        alert(errorMsg); 
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Booking Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> New Booking
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Book a Room</h3>
          <form onSubmit={handleBooking} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Check-In Date</label>
              <input type="date" className="btn" style={{ width: '100%', background: 'var(--card-bg)', color: 'white' }} value={newBooking.checkInDate} onChange={(e) => setNewBooking({ ...newBooking, checkInDate: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Check-Out Date</label>
              <input type="date" className="btn" style={{ width: '100%', background: 'var(--card-bg)', color: 'white' }} value={newBooking.checkOutDate} onChange={(e) => setNewBooking({ ...newBooking, checkOutDate: e.target.value })} required />
            </div>
            <select className="btn" style={{ background: 'var(--card-bg)', color: 'white' }} value={newBooking.customer.id} onChange={(e) => setNewBooking({ ...newBooking, customer: { id: e.target.value } })} required>
              <option value="">Select Customer</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className="btn" style={{ background: 'var(--card-bg)', color: 'white' }} value={newBooking.room.id} onChange={(e) => setNewBooking({ ...newBooking, room: { id: e.target.value } })} required>
              <option value="">Select Room</option>
              {rooms.map(r => <option key={r.id} value={r.id}>Room {r.roomNumber} ({r.roomType})</option>)}
            </select>
            <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Confirm Booking</button>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Room</th>

              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.bookingId}>
                <td>#{b.bookingId}</td>
                <td>{b.customer?.name}</td>
                <td>{b.room?.roomNumber}</td>

                <td>{b.checkInDate}</td>
                <td>{b.checkOutDate}</td>
                <td><span style={{ color: 'var(--success)' }}><CheckCircle size={14}/> Confirmed</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
