import { api } from './api';

// ── Lấy factoryId từ session (lưu khi login) ──────────────────────────────────
// Ưu tiên: session.factoryId → fallback dev ID nếu chưa có (xoá khi auth hoàn chỉnh)
function getFactoryId() {
  try {
    const raw = localStorage.getItem('renats_user');
    const user = raw ? JSON.parse(raw) : null;
    if (user?.factoryId) return user.factoryId;
  } catch { /* ignore */ }
  // Fallback: dùng ID seeded để test khi auth chưa trả factoryId
  // TODO: Xoá dòng này sau khi authService.saveSession() có factoryId
  return '00000000-0000-0000-0000-000000000001';
}

export const factoryService = {
  // ── Dashboard ──
  getKpis: () =>
    api.get('/factory/dashboard/kpis', { factoryId: getFactoryId() }),

  getRecentTransactions: () =>
    api.get('/factory/dashboard/transactions', { factoryId: getFactoryId() }),

  getMaterialBreakdown: () =>
    api.get('/factory/dashboard/material-breakdown', { factoryId: getFactoryId() }),

  getChartData: (range = 'week') =>
    api.get('/factory/dashboard/chart', { factoryId: getFactoryId(), range }),

  // ── Market ──
  getBatches: (params = {}) =>
    api.get('/factory/market/batches', { factoryId: getFactoryId(), ...params }),

  getBatchDetail: (id) =>
    api.get(`/factory/market/batches/${id}`, { factoryId: getFactoryId() }),

  // ── Orders ──
  placeBid: (batchId, bidPrice, note) =>
    api.post('/factory/orders/bid', {
      batchId, factoryId: getFactoryId(), bidPrice, note,
    }),

  confirmOrder: (bidId) =>
    api.post('/factory/orders/confirm', { bidId }),

  getOrders: (status) =>
    api.get('/factory/orders', { factoryId: getFactoryId(), ...(status ? { status } : {}) }),

  getOrderDetail: (id) =>
    api.get(`/factory/orders/${id}`),

  // ── Weighing/KCS ──
  getWeighingQueue: () =>
    api.get('/factory/weighing/queue', { factoryId: getFactoryId() }),

  completeWeighing: (orderId, data) =>
    api.post(`/factory/weighing/${orderId}/complete`, data),

  rejectTruck: (orderId, reason) =>
    api.post(`/factory/weighing/${orderId}/reject`, { reason }),

  // ── Partners ──
  getPartners: () =>
    api.get('/factory/partners', { factoryId: getFactoryId() }),

  getPartnerDetail: (id) =>
    api.get(`/factory/partners/${id}`, { factoryId: getFactoryId() }),

  // ── Premium Subscription ──
  getPremiumStatus: () =>
    api.get('/factory/premium/status', { factoryId: getFactoryId() }),

  subscribePremium: (plan) =>
    api.post('/factory/premium/subscribe', { factoryId: getFactoryId(), plan }),
};
