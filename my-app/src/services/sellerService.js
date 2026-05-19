import { api } from './api';

// Hardcoded sellerId for dev – thay bằng auth context sau
const SELLER_ID = '22222222-2222-2222-2222-222222222222';

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
    api.patch(`/seller/requests/${id}/cancel`),

  // ── Profile ──
  getProfile: () =>
    api.get(`/seller/profile/${SELLER_ID}`),

  updateProfile: (data) =>
    api.put(`/seller/profile/${SELLER_ID}`, data),

  changePassword: (oldPassword, newPassword) =>
    api.patch(`/seller/profile/${SELLER_ID}/change-password`, {
      oldPassword, newPassword,
    }),

  deleteAccount: () =>
    api.delete(`/seller/profile/${SELLER_ID}`),

  getStats: () =>
    api.get(`/seller/profile/${SELLER_ID}/stats`),
};
