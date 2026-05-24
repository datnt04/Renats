import { api } from './api';

// Hardcoded factoryId for dev – thay bằng auth context sau
const FACTORY_ID = '00000000-0000-0000-0000-000000000001';

export const factoryService = {
  // ── Dashboard ──
  getKpis: () =>
    api.get('/factory/dashboard/kpis', { factoryId: FACTORY_ID }),

  getRecentTransactions: () =>
    api.get('/factory/dashboard/transactions', { factoryId: FACTORY_ID }),

  getMaterialBreakdown: () =>
    api.get('/factory/dashboard/material-breakdown', { factoryId: FACTORY_ID }),

  getChartData: (range = 'week') =>
    api.get('/factory/dashboard/chart', { factoryId: FACTORY_ID, range }),

  // ── Market ──
  getBatches: (params = {}) =>
    api.get('/factory/market/batches', { factoryId: FACTORY_ID, ...params }),

  getBatchDetail: (id) =>
    api.get(`/factory/market/batches/${id}`, { factoryId: FACTORY_ID }),

  // ── Orders ──
  placeBid: (batchId, bidPrice, note) =>
    api.post('/factory/orders/bid', {
      batchId, factoryId: FACTORY_ID, bidPrice, note,
    }),

  confirmOrder: (bidId) =>
    api.post('/factory/orders/confirm', { bidId }),

  getOrders: (status) =>
    api.get('/factory/orders', { factoryId: FACTORY_ID, ...(status ? { status } : {}) }),

  getOrderDetail: (id) =>
    api.get(`/factory/orders/${id}`),

  // ── Weighing/KCS ──
  getWeighingQueue: () =>
    api.get('/factory/weighing/queue', { factoryId: FACTORY_ID }),

  completeWeighing: (orderId, data) =>
    api.post(`/factory/weighing/${orderId}/complete`, data),

  rejectTruck: (orderId, reason) =>
    api.post(`/factory/weighing/${orderId}/reject`, { reason }),

  // ── Partners ──
  getPartners: () =>
    api.get('/factory/partners', { factoryId: FACTORY_ID }),

  getPartnerDetail: (id) =>
    api.get(`/factory/partners/${id}`, { factoryId: FACTORY_ID }),

  // ── Premium Subscription ──
  getPremiumStatus: () =>
    api.get('/factory/premium/status', { factoryId: FACTORY_ID }),

  subscribePremium: (plan) =>
    api.post('/factory/premium/subscribe', { factoryId: FACTORY_ID, plan }),
};
