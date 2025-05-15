import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

export const fetchUser = () => api.get('/auth/user');
export const loginProviders = {
  google: () => window.location.href = 'http://localhost:5000/auth/google',
  facebook: () => window.location.href = 'http://localhost:5000/auth/facebook',
  github: () => window.location.href = 'http://localhost:5000/auth/github',
};
export const logout = () => api.get('/auth/logout');
export const searchImages = term => api.post('/api/search', { term }).then(r => r.data);
export const getHistory = () => api.get('/api/history').then(r => r.data);
export const getTopSearches = () => api.get('/api/top-searches').then(r => r.data);
