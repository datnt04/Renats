import { api } from './api';

export const authService = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (data) =>
    api.post('/auth/register', data),

  me: () => {
    const token = localStorage.getItem('renats_token');
    if (!token) return Promise.reject(new Error('No token'));
    return api.get('/auth/me', null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  saveSession: (authResponse) => {
    localStorage.setItem('renats_token', authResponse.token);
    localStorage.setItem('renats_user', JSON.stringify({
      userId: authResponse.userId,
      role: authResponse.role,
      fullName: authResponse.fullName,
      email: authResponse.email,
    }));
  },

  getSession: () => {
    try {
      const raw = localStorage.getItem('renats_user');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  },

  logout: () => {
    localStorage.removeItem('renats_token');
    localStorage.removeItem('renats_user');
  },

  isLoggedIn: () => !!localStorage.getItem('renats_token'),
};
