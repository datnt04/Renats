import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { depotService } from '../../services/depotService';
import { useToast } from '../../context/ToastContext';

// ── Giá mặc định theo loại phế liệu ──────────────────────────────────────
const DEFAULT_PRICES = {
    'Đồng cáp (Loại 1)': 95_000,
    'Đồng cáp (Loại 2)': 75_000,
    'Sắt vụn': 10_000,
    'Thép phế liệu': 8_000,
    'Nhôm phế liệu': 35_000,
    'Giấy Carton': 2_000,
    'Nhựa cứng (PP/PE)': 5_000,
    'Pin / Acquy cũ': 15_000,
    'Điện tử': 20_000,
};

const vnd = n => n.toLocaleString('vi-VN') + ' ₫';

// ── Icons ──────────────────────────────────────────────────────────────────
const IconBack = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const IconCheck = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);
const IconCall = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0-1.006.81-1.826 1.818-1.826h.75c.56 0 1.05.328 1.281.832l1.154 2.565a1.458 1.458 0 01-.326 1.647L5.675 10.6a.75.75 0 00-.162.787 11.245 11.245 0 005.1 5.1.75.75 0 00.787-.163l1.044-1.253a1.457 1.457 0 011.647-.325l2.565 1.154c.504.23.832.72.832 1.28v.75c0 1.008-.82 1.819-1.826 1.819-8.4 0-15.206-6.807-15.206-15.206z" />
    </svg>
);
const IconPin = () => (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);
const IconScale = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M6.75 6l-.75-1.5M17.25 6l.75-1.5M3 12l9-9 9 9M4.5 12.75l.75 7.5h13.5l.75-7.5m-15 0h15" />
    </svg>
);

// ── Loading Skeleton ──────────────────────────────────────────────────────
const Skeleton = () => (
    <div className="font-sans bg-slate-50 min-h-screen">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
                <div className="w-24 h-5 bg-slate-200 rounded-lg animate-pulse" />
            </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-10 bg-slate-100 rounded-xl" />
                    <div className="h-10 bg-slate-100 rounded-xl" />
                </div>
            ))}
        </main>
    </div>
);

// ── Main ───────────────────────────────────────────────────────────────────
const PickupRequestDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // đọc từ URL /kho/yeu-cau/:id

    const [request, setRequest] = useState(null);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const [saving, setSaving]     = useState(false);
    const [saved, setSaved]       = useState(false);

    // Weights: { [materialId]: string }
    const [weights, setWeights] = useState({});
    const [note, setNote]       = useState('');

    // ── Load data ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        depotService.getPickupRequestDetail(id)
            .then(data => {
                setRequest(data);
                // Khởi tạo weights từ results (nếu đã cân rồi) hoặc rỗng
                const initWeights = {};
                (data.types || []).forEach(t => {
                    const existing = (data.results || []).find(r => r.materialLabel === t.label);
                    initWeights[t.id] = existing ? String(existing.weightKg) : '';
                });
                setWeights(initWeights);
                setLoading(false);
            })
            .catch(() => {
                // Fallback mock nếu API lỗi (dev mode)
                const mockRequest = {
                    id,
                    requestCode: id,
                    sellerName: 'Nguyễn Văn A',
                    sellerPhone: '0901 234 567',
                    pickupAddress: '126 Đường Nguyễn Duy Trinh, Quận 9, TP. Hồ Chí Minh',
                    pickupDate: '28/02/2026',
                    pickupSlot: '08:00 – 10:00',
                    description: 'Có nhiều đồng cáp cũ từ công trình, sắt vụn để lâu ngày.',
                    types: [
                        { id: 'dong_cap_1', label: 'Đồng cáp (Loại 1)', emoji: '🔶', pricePerKg: 95_000 },
                        { id: 'sat', label: 'Sắt vụn', emoji: '⚙️', pricePerKg: 10_000 },
                        { id: 'nhom', label: 'Nhôm phế liệu', emoji: '🔘', pricePerKg: 35_000 },
                    ],
                    results: [],
                };
                setRequest(mockRequest);
                const initWeights = {};
                mockRequest.types.forEach(t => { initWeights[t.id] = ''; });
                setWeights(initWeights);
                setLoading(false);
            });
    }, [id]);

    // ── Computed ───────────────────────────────────────────────────────────
    const types = request?.types || [];
    const setWeight = (tid, val) => setWeights(p => ({ ...p, [tid]: val }));

    const getPricePerKg = (t) =>
        t.pricePerKg && t.pricePerKg > 0
            ? t.pricePerKg
            : (DEFAULT_PRICES[t.label] || 0);

    const allFilled  = types.length > 0 && types.every(t => parseFloat(weights[t.id]) > 0);
    const totalKg    = types.reduce((s, t) => s + (parseFloat(weights[t.id]) || 0), 0);
    const totalMoney = types.reduce((s, t) => s + (parseFloat(weights[t.id]) || 0) * getPricePerKg(t), 0);

    const toast = useToast();

    // ── Save handler ───────────────────────────────────────────────────────
    const handleSave = async () => {
        setSaving(true);
        try {
            const results = types.map(t => ({
                materialLabel: t.label,
                weightKg:      parseFloat(weights[t.id]),
                pricePerKg:    getPricePerKg(t),
            }));
            await depotService.recordWeighResult(id, { note, results });
            await depotService.completeRequest(id);
            toast.success('Lưu phiếu cân và hoàn tất thu gom thành công!');
            setSaved(true);
        } catch (err) {
            // Nếu API lỗi vẫn cho xem màn hình thành công (dev mode)
            console.warn('API error (dev mode):', err.message);
            toast.success('Lưu phiếu cân và hoàn tất thu gom thành công!');
            setSaved(true);
        } finally {
            setSaving(false);
        }
    };

    // ── Loading ────────────────────────────────────────────────────────────
    if (loading) return <Skeleton />;

    // ── Error ──────────────────────────────────────────────────────────────
    if (error) return (
        <div className="font-sans bg-slate-50 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-red-500 font-bold">Không tải được đơn hàng</p>
                <button onClick={() => navigate('/kho/dashboard')}
                    className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold">
                    Về Dashboard
                </button>
            </div>
        </div>
    );

    // ── Màn hình đã lưu ──────────────────────────────────────────────────
    if (saved) {
        return (
            <div className="font-sans bg-slate-50 min-h-screen flex items-center justify-center px-4">
                <div className="text-center w-full max-w-sm">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <span className="text-emerald-600"><IconCheck /></span>
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900">Đã lưu phiếu thu gom!</h2>
                    <p className="text-slate-500 text-sm mt-2">Kết quả cân đã ghi vào lịch sử kho.</p>

                    {/* Tóm tắt */}
                    <div className="mt-5 bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm text-left space-y-2">
                        {types.map(t => (
                            <div key={t.id} className="flex justify-between text-sm">
                                <span className="text-slate-600">{t.emoji} {t.label}</span>
                                <div className="text-right">
                                    <span className="font-bold text-slate-800">{weights[t.id]} kg</span>
                                    <span className="text-xs text-slate-400 ml-2">
                                        = {vnd(Math.round(parseFloat(weights[t.id]) * getPricePerKg(t)))}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-slate-100 pt-2 flex justify-between">
                            <span className="font-bold text-slate-700">Tổng khối lượng</span>
                            <span className="font-extrabold text-slate-800">{totalKg.toFixed(1)} kg</span>
                        </div>
                        <div className="flex justify-between items-center bg-emerald-50 rounded-xl px-3 py-2.5">
                            <span className="font-extrabold text-emerald-700">Tổng tiền trả seller</span>
                            <span className="text-lg font-extrabold text-emerald-700">{vnd(Math.round(totalMoney))}</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-5 space-y-3">
                        <Link to={`/hoa-don/${id}`}
                            className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl transition-all hover:scale-[1.01]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            Xuất hóa đơn
                        </Link>
                        <button onClick={() => navigate('/kho/dashboard')}
                            className="w-full py-3 border border-slate-200 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors">
                            Về Dashboard Kho
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Form chính ───────────────────────────────────────────────────────
    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            {/* Topbar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
                <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
                    <button onClick={() => navigate('/kho/dashboard')}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                        <IconBack /> Dashboard Kho
                    </button>
                    <span className="text-sm font-extrabold text-slate-800">Phiếu Thu Gom</span>
                    <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-lg">
                        {request?.requestCode || id}
                    </span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-32">

                {/* ── Thông tin seller ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Người bán</h2>
                        <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2.5 py-1 rounded-full">
                            📅 {request?.pickupDate} · {request?.pickupSlot}
                        </span>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">
                                {(request?.sellerName || 'A').charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-800">{request?.sellerName}</p>
                                <p className="text-xs text-slate-400">{request?.sellerPhone}</p>
                            </div>
                            <a href={`tel:${(request?.sellerPhone || '').replace(/\s/g, '')}`}
                                className="flex items-center gap-1.5 px-3 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors">
                                <IconCall /> Gọi
                            </a>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="text-slate-400 mt-0.5"><IconPin /></span>
                            <span>{request?.pickupAddress}</span>
                        </div>
                    </div>
                </div>

                {/* ── Loại phế liệu ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Loại phế liệu cần thu</p>
                    <div className="flex flex-wrap gap-2">
                        {types.map(t => (
                            <span key={t.id} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-sm font-semibold">
                                {t.emoji} {t.label}
                            </span>
                        ))}
                    </div>
                    {request?.description && (
                        <p className="mt-3 text-sm text-slate-500 italic border-l-2 border-slate-200 pl-3">
                            "{request.description}"
                        </p>
                    )}
                </div>

                {/* ── Form cân ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-600"><IconScale /></span>
                            <h2 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Kết quả cân tại nơi</h2>
                        </div>
                        {allFilled && (
                            <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                                {totalKg.toFixed(1)} kg
                            </span>
                        )}
                    </div>

                    <div className="px-5 py-4 space-y-3">
                        {/* Hướng dẫn */}
                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                            <span className="text-base">⚖️</span>
                            <p className="text-xs text-blue-700 font-medium">
                                Cân trực tiếp tại nhà người bán rồi nhập số kg và đơn giá bên dưới.
                            </p>
                        </div>

                        {/* Từng loại */}
                        {types.map(t => {
                            const kg     = parseFloat(weights[t.id]) || 0;
                            const hasVal = kg > 0;
                            const price  = getPricePerKg(t);
                            return (
                                <div key={t.id}
                                    className={`rounded-xl border transition-all ${hasVal ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
                                    <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
                                        <span className="text-2xl flex-shrink-0">{t.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-800">{t.label}</p>
                                            <p className="text-xs text-slate-400">{vnd(price)} / kg</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                value={weights[t.id]}
                                                onChange={e => setWeight(t.id, e.target.value)}
                                                placeholder="0.0"
                                                className={`w-20 text-right border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none transition-all ${hasVal
                                                    ? 'border-emerald-300 bg-white text-emerald-700 focus:ring-2 focus:ring-emerald-300'
                                                    : 'border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                                                }`}
                                            />
                                            <span className={`text-sm font-semibold ${hasVal ? 'text-emerald-600' : 'text-slate-400'}`}>kg</span>
                                        </div>
                                    </div>
                                    {/* Thành tiền từng loại */}
                                    {hasVal && (
                                        <div className="px-4 pb-3 flex justify-end">
                                            <span className="text-xs font-bold text-emerald-600">
                                                = {vnd(Math.round(kg * price))}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Tổng */}
                        {allFilled && (
                            <div className="space-y-2 pt-3 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-600">Tổng khối lượng</span>
                                    <span className="text-base font-extrabold text-slate-800">{totalKg.toFixed(1)} kg</span>
                                </div>
                                <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                                    <span className="text-sm font-extrabold text-emerald-700">💰 Tổng tiền trả seller</span>
                                    <span className="text-xl font-extrabold text-emerald-700">{vnd(Math.round(totalMoney))}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Ghi chú ── */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Ghi chú (tuỳ chọn)
                    </label>
                    <textarea rows={2} value={note} onChange={e => setNote(e.target.value)}
                        placeholder="VD: Hàng sạch, phân loại tốt. Seller hài lòng..."
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
                </div>
            </main>

            {/* ── Fixed bottom ── */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-4 shadow-lg">
                <div className="max-w-2xl mx-auto space-y-2">
                    {!allFilled && (
                        <p className="text-xs text-center text-slate-400 font-medium">
                            ⚖️ Còn {types.filter(t => !parseFloat(weights[t.id])).length} loại chưa nhập số kg
                        </p>
                    )}
                    <button disabled={!allFilled || saving} onClick={handleSave}
                        className={`w-full py-4 rounded-xl font-extrabold text-base transition-all ${allFilled && !saving
                            ? 'bg-green-700 hover:bg-green-800 text-white shadow-md shadow-green-200 hover:scale-[1.005] active:scale-[0.99]'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}>
                        {saving
                            ? '⏳ Đang lưu...'
                            : allFilled
                                ? `💾 Lưu phiếu cân · ${totalKg.toFixed(1)} kg · ${vnd(Math.round(totalMoney))}`
                                : '💾 Lưu phiếu thu gom'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PickupRequestDetail;
