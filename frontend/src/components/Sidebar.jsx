import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Bed, Users, Calendar, Utensils, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo">
        <Home size={28} />
        <span>GrandHotel</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/rooms" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Bed size={20} />
          <span>Rooms</span>
        </NavLink>
        <NavLink to="/customers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} />
          <span>Customers</span>
        </NavLink>
        <NavLink to="/bookings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Calendar size={20} />
          <span>Bookings</span>
        </NavLink>
        <NavLink to="/restaurant" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Utensils size={20} />
          <span>Restaurant</span>
        </NavLink>
        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={() => { logout(); navigate('/login'); }} 
            className="nav-item" 
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
