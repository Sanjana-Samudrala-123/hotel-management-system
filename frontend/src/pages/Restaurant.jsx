import React, { useEffect, useState } from 'react';
import { foodApi, customerApi, roomApi } from '../api/api';
import { Plus, ShoppingCart, Utensils } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Restaurant = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showAddFood, setShowAddFood] = useState(false);
  const [newFood, setNewFood] = useState({ foodName: '', category: 'STARTER', price: '' });
  const [cart, setCart] = useState([]);
  const [orderMeta, setOrderMeta] = useState({ roomId: '' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [fRes, rRes, oRes] = await Promise.all([
        foodApi.getAll(), roomApi.getAll(), foodApi.getAllOrders()
      ]);
      setFoods(fRes.data); setRooms(rRes.data); setOrders(oRes.data);
    } catch (err) { console.error(err); }
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    foodApi.add(newFood).then(() => { fetchData(); setShowAddFood(false); setNewFood({ foodName: '', category: 'STARTER', price: '' }); });
  };

  const addToCart = (food) => {
    const existing = cart.find(item => item.foodId === food.foodId);
    if (existing) { setCart(cart.map(item => item.foodId === food.foodId ? { ...item, quantity: item.quantity + 1 } : item)); }
    else { setCart([...cart, { ...food, quantity: 1 }]); }
  };

  const handlePlaceOrder = async () => {
    if (!orderMeta.roomId) return alert("Please select a room");
    
    const customerId = user?.customer?.id;
    if (!customerId) {
        return alert("Your user profile is missing customer information. Please logout and login again.");
    }

    const order = {
      customer: { id: customerId },
      room: { id: orderMeta.roomId },
      orderItems: cart.map(item => ({ foodItem: { foodId: item.foodId }, quantity: item.quantity })),
    };
    
    try {
        await foodApi.placeOrder(order);
        setCart([]); 
        fetchData(); 
        alert("Order placed successfully!");
    } catch (err) {
        console.error("Order error:", err);
        let errorMsg = "Failed to place order.";
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
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>GrandHotel Restaurant Menu</h1>
          <button className="btn btn-primary" onClick={() => setShowAddFood(!showAddFood)}><Plus size={18} /> Add Item</button>
        </div>

        {showAddFood && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <form onSubmit={handleAddFood} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <input type="text" placeholder="Name" className="btn" style={{ background: 'var(--card-bg)', color: 'white' }} value={newFood.foodName} onChange={(e) => setNewFood({ ...newFood, foodName: e.target.value })} required />
              <select className="btn" style={{ background: 'var(--card-bg)', color: 'white' }} value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}>
                <option value="STARTER">Starter</option><option value="MAIN_COURSE">Main Course</option><option value="DESSERT">Dessert</option><option value="BEVERAGE">Beverage</option>
              </select>
              <input type="number" placeholder="Price" className="btn" style={{ background: 'var(--card-bg)', color: 'white' }} value={newFood.price} onChange={(e) => setNewFood({ ...newFood, price: e.target.value })} required />
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        )}

        <div className="stats-grid">
          {foods.map(food => (
            <div key={food.foodId} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><h3>{food.foodName}</h3><p style={{ color: 'var(--text-secondary)' }}>₹{food.price}</p></div>
              <button className="btn btn-primary" onClick={() => addToCart(food)}><ShoppingCart size={16}/></button>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ height: 'fit-content' }}>
        <h3>Your Cart</h3>
        <div style={{ margin: '1rem 0' }}>
          {cart.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No items selected</p>
          ) : (
            cart.map((item) => (
              <div key={item.foodId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>{item.foodName} (x{item.quantity})</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '0.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total</span>
              <span>₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
          )}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Select Room</label>
          <select className="btn" style={{ width: '100%', background: 'var(--card-bg)', color: 'white' }} value={orderMeta.roomId} onChange={(e) => setOrderMeta({ ...orderMeta, roomId: e.target.value })} required>
            <option value="">Select Room</option>
            {rooms.map(r => <option key={r.id} value={r.id}>Room {r.roomNumber}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={handlePlaceOrder} disabled={cart.length === 0}>Place Order</button>
      </div>
      
      <div className="card" style={{ gridColumn: 'span 2', marginTop: '2rem' }}>
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.orderId}>
                <td>#{o.orderId}</td>
                <td>{o.customer?.name}</td>
                <td>Room {o.room?.roomNumber}</td>
                <td>
                  {o.orderItems?.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem' }}>
                      {item.foodItem?.foodName} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>₹{o.totalAmount}</td>
                <td>
                  <span style={{ 
                    color: o.orderStatus === 'DELIVERED' ? 'var(--success)' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <Utensils size={14} /> {o.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurant;
