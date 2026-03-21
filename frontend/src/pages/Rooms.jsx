import React, { useEffect, useState } from 'react';
import { roomApi } from '../api/api';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomNumber: '', roomType: 'SINGLE', price: '', status: 'AVAILABLE' });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    roomApi.getAll().then(res => setRooms(res.data)).catch(err => console.error(err));
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    roomApi.add(newRoom).then(() => {
      fetchRooms();
      setShowForm(false);
      setNewRoom({ roomNumber: '', roomType: 'SINGLE', price: '', status: 'AVAILABLE' });
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this room?')) {
      roomApi.delete(id).then(fetchRooms);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Room Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Room
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Add New Room</h3>
          <form onSubmit={handleAddRoom} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1rem' }}>
            <input 
              type="text" placeholder="Room Number" className="btn" 
              style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
              value={newRoom.roomNumber} onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })} required
            />
            <select 
              className="btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
              value={newRoom.roomType} onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
            >
              <option value="SINGLE">Single</option>
              <option value="DELUXE">Deluxe</option>
              <option value="SUITE">Suite</option>
            </select>
            <input 
              type="number" placeholder="Price" className="btn" 
              style={{ background: 'var(--card-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
              value={newRoom.price} onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })} required
            />

            <button type="submit" className="btn btn-primary">Save Room</button>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Type</th>
              <th>Price</th>

              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
                <td>₹{room.price}</td>

                <td>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.8rem',
                    background: room.status === 'AVAILABLE' ? '#22c55e20' : '#ef444420',
                    color: room.status === 'AVAILABLE' ? 'var(--success)' : 'var(--danger)'
                  }}>
                    {room.status}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn" style={{ padding: '0.4rem', color: 'var(--text-secondary)' }}><Edit size={16} /></button>
                  <button className="btn" style={{ padding: '0.4rem', color: 'var(--danger)' }} onClick={() => handleDelete(room.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;
