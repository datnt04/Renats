import { api } from './api';

// Hardcoded sellerId for dev – thay bằng auth context sau
const SELLER_ID = '00000000-0000-0000-0000-000000000002';

export const sellerService = {
  // ── Dashboard / Requests ──
  getRequests: (status) =>
    api.get('/seller/requests', {
      sellerId: SELLER_ID,
      ...(status ? { status } : {}),
    }),

  getRequestDetail: (id) =>
    api.get(`/seller/requests/${id}`),

  createRequest: (data) =>
    api.post('/seller/requests', { sellerId: SELLER_ID, ...data }),

  cancelRequest: (id) =>
    api.post(`/seller/requests/${id}/cancel`, {}),

  // ── Profile ──
  getProfile: () =>
    api.get(`/seller/profile/${SELLER_ID}`),

  updateProfile: (data) =>
    api.post(`/seller/profile/${SELLER_ID}`, data),

  changePassword: (oldPassword, newPassword) =>
    api.post(`/seller/profile/${SELLER_ID}/change-password`, {
      oldPassword, newPassword,
    }),

  deleteAccount: () =>
    api.post(`/seller/profile/${SELLER_ID}`, { _method: 'DELETE' }),

  getStats: () =>
    api.get(`/seller/profile/${SELLER_ID}/stats`),
};
