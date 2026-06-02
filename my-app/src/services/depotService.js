import { api } from './api';
import { authService } from './authService';

function getDepotIdFromSession() {
  const session = authService.getSession();
  if (!session?.userId) throw new Error('Chưa đăng nhập hoặc không tìm thấy thông tin User.');
  return session.userId;
}

export const depotService = {
  // ── Dashboard Stats ───────────────────────────────────────────────────────
  getDashboardStats: () =>
    api.get('/depot/dashboard/stats'),

  // ── Pickup Requests ───────────────────────────────────────────────────────
  getPendingRequests: (depotId) =>
    api.get('/seller/pickup-management/pending', depotId ? { depotId } : {}),

  getPickupRequestDetail: (id) =>
    api.get(`/depot/pickup-requests/${id}`),

  getAllPickupRequests: (status) =>
    api.get('/depot/pickup-requests', status ? { status } : {}),

  schedulePickup: (id) =>
    api.patch(`/seller/pickup-management/${id}/schedule`, {
      depotId: getDepotIdFromSession(),
    }),

  recordWeighResult: (id, dto) =>
    api.post(`/seller/pickup-management/${id}/weigh`, dto),

  completeRequest: (id) =>
    api.patch(`/seller/pickup-management/${id}/complete`),

  // ── Inventory ─────────────────────────────────────────────────────────────
  getInventory: () =>
    api.get('/depot/inventory'),

  // ── Batch Orders (Lô xuất) ────────────────────────────────────────────────
  getBatchOrders: () =>
    api.get('/depot/batch-orders'),

  createBatchOrder: (data) =>
    api.post('/depot/batch-orders', { ...data, depotId: getDepotIdFromSession() }),

  cancelBatchOrder: (id) =>
    api.patch(`/depot/batch-orders/${id}/cancel`),

  getActiveMaterialTypes: () =>
    api.get('/depot/batch-orders/active-material-types'),

  // ── Invoices ──────────────────────────────────────────────────────────────
  getInvoices: () =>
    api.get('/depot/invoices'),
};
