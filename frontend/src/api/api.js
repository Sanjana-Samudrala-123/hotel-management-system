import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (user) => api.post('/auth/register', user),
};

export const roomApi = {
  getAll: () => api.get('/rooms/all'),
  add: (room) => api.post('/rooms/add', room),
  update: (id, room) => api.put(`/rooms/update/${id}`, room),
  delete: (id) => api.delete(`/rooms/delete/${id}`),
};

export const customerApi = {
  getAll: () => api.get('/customers/all'),
  add: (customer) => api.post('/customers/add', customer),
  update: (id, customer) => api.put(`/customers/update/${id}`, customer),
  delete: (id) => api.delete(`/customers/delete/${id}`),
};

export const bookingApi = {
  getAll: () => api.get('/bookings/all'),
  add: (booking) => api.post('/bookings/add', booking),
  getByCustomer: (id) => api.get(`/bookings/customer/${id}`),
};

export const foodApi = {
  getAll: () => api.get('/foods/all'),
  add: (food) => api.post('/foods/add', food),
  placeOrder: (order) => api.post('/orders/add', order),
  getAllOrders: () => api.get('/orders/all'),
  getOrdersByCustomer: (id) => api.get(`/orders/customer/${id}`),
};

export const adminApi = {
  getStats: () => api.get('/admin/dashboard'),
};

export default api;
