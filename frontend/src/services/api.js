import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Add auth endpoints
api.login = (username, password) => 
  api.post('/auth/login', { username, password });

api.logout = () => 
  api.post('/auth/logout');

api.checkAuth = () => 
  api.get('/auth/check');

// Add entry endpoints
api.getEntries = () => api.get('/entries');
api.getStats = () => api.get('/entries/stats');
api.createEntry = (data) => api.post('/entries/inward', data);
api.getInwardEntries = () => api.get('/entries/inward');
api.getOutwardEntries = () => api.get('/entries/outward'); 
api.getRepairEntries = () => api.get('/entries/repair');
api.updateRepair = (id, data) => api.put(`/entries/repair/${id}`, data);
api.updateOutward = (id, data) => api.put(`/entries/outward/${id}`, data);
api.updateInward = (id, data) => api.put(`/entries/inward/${id}`, data); // Added this
api.deleteEntry = (id) => api.delete(`/entries/${id}`);

export default api;