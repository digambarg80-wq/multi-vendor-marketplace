import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const createRazorpayOrder = (amount) => 
  API.post('/payment/create-order', { amount });

export const verifyPayment = (paymentData) => 
  API.post('/payment/verify', paymentData);

export default API;