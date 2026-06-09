import { api } from './api';

export const transportService = {
    // ── Driver lấy danh sách kho có đơn cần vận chuyển ────────────────────────
    getDepotsWithJobs: async () => {
        return await api.get('/transport/depots-with-jobs');
    },

    // ── Lấy đơn vận chuyển khả dụng theo kho ──────────────────────────────────
    getAvailableJobs: async (depotId) => {
        return await api.get('/transport/jobs/available', { depotId });
    },

    // ── Tài xế nhận đơn vận chuyển ────────────────────────────────────────────
    acceptJob: async (jobId) => {
        return await api.post(`/transport/jobs/${jobId}/accept`);
    },

    // ── Lấy danh sách chuyến của tài xế đang đăng nhập ────────────────────────
    getMyJobs: async () => {
        return await api.get('/transport/jobs/my');
    },

    // ── Cập nhật trạng thái chuyến (đang chạy, đã giao...) ────────────────────
    updateJobStatus: async (jobId, status) => {
        return await api.put(`/transport/jobs/${jobId}/status`, { status });
    },

    // ── Check-in tại điểm đón/giao ────────────────────────────────────────────
    checkin: async (jobId, payload) => {
        return await api.post(`/transport/jobs/${jobId}/checkin`, payload);
    },

    // ── Từ chối / huỷ đơn ─────────────────────────────────────────────────────
    rejectJob: async (jobId, reason) => {
        return await api.post(`/transport/jobs/${jobId}/reject`, { reason });
    },
};

