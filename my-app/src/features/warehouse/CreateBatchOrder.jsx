import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { depotService } from '../../services/depotService';

// ── Định cấu hình 4 bước ──────────────────────────────────────────────────
const STEPS = [
    { num: 1, title: 'Thông tin chung', desc: 'Loại phế liệu & Số lượng' },
    { num: 2, title: 'Nguồn gốc phế liệu', desc: 'Tỷ lệ thu gom thực tế' },
    { num: 3, title: 'Đơn vị vận chuyển', desc: 'Lựa chọn phương thức gửi' },
    { num: 4, title: 'Xác nhận & Hoàn tất', desc: 'Đăng bán hoặc Lưu nháp' },
];

const PRIMARY_COLOR = '#16a34a'; // Xanh lá thương hiệu

const vnd = n => n.toLocaleString('vi-VN') + ' ₫';

export default function CreateBatchOrder() {
    const navigate = useNavigate();

    // ── Khởi tạo State Form ─────────────────────────────────────────────────
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [inventoryList, setInventoryList] = useState([]);
    const [activeMaterialTypes, setActiveMaterialTypes] = useState([]); // Loại đã có lô đang hoạt động

    const [form, setForm] = useState({
        wasteType: '',         // Loại phế liệu (tên hiển thị)
        materialTypeKey: '',   // Key enum gửi lên BE (VD: IRON, COPPER, PET...)
        totalKg: '',           // Tổng số kg đóng lô
        unit: 'kg',
        location: 'Khu A - Phân khu phân loại 1',
        note: '',
        unitPrice: '12000',    // Đơn giá ước tính muốn bán

        // Bước 2: Tỷ lệ nguồn gốc (%)
        sourceRatio: {
            households: 50,
            stores: 30,
            offices: 20,
        },

        // Bước 3: Vận chuyển
        carrierId: 'carrier-fast',
        buyer: 'Nhà máy Tái chế Nhựa Hùng Cường',
        deliveryDate: '2026-03-01',
        transportType: 'DEPOT_SHIPPED', // DEPOT_SHIPPED hoặc FACTORY_PICKUP
    });

    // Load tồn kho và danh sách loại vật liệu đang có lô hoạt động
    useEffect(() => {
        depotService.getInventory()
            .then(data => setInventoryList(data))
            .catch(() => {
                setInventoryList([
                    { type: 'Sắt vụn', current: 1200, unit: 'kg', key: 'IRON' },
                    { type: 'Đồng cáp', current: 450, unit: 'kg', key: 'COPPER' },
                    { type: 'Nhựa cứng (PP/PE)', current: 890, unit: 'kg', key: 'PET' },
                ]);
            });
        depotService.getActiveMaterialTypes()
            .then(data => setActiveMaterialTypes(data || []))
            .catch(() => {});
    }, []);

    // ── Xử lý nhập liệu ──────────────────────────────────────────────────────
    const updateForm = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const updateSource = (key, val) => {
        const num = Math.min(100, Math.max(0, parseInt(val) || 0));
        setForm(prev => ({
            ...prev,
            sourceRatio: { ...prev.sourceRatio, [key]: num }
        }));
    };

    // Tự động gán key enum tương ứng khi chọn loại phế liệu
    const handleSelectWasteType = (typeLabel) => {
        const matched = inventoryList.find(i => i.type === typeLabel);
        setForm(prev => ({
            ...prev,
            wasteType: typeLabel,
            materialTypeKey: matched?.key || 'OTHER'
        }));
    };

    // Tổng nguồn gốc
    const totalRatio = Object.values(form.sourceRatio).reduce((s, v) => s + v, 0);

    // ── Submit API ──────────────────────────────────────────────────────────
    const handleFinish = async () => {
        setLoading(true);
        try {
            const payload = {
                wasteType:       form.wasteType,
                materialTypeKey: form.materialTypeKey,
                totalKg:         parseFloat(form.totalKg),
                unit:            form.unit,
                location:        form.location,
                note:            form.note,
                carrierId:       form.carrierId,
                buyer:           form.buyer,
                deliveryDate:    form.deliveryDate,
                transportType:   form.transportType,
                unitPrice:       parseFloat(form.unitPrice),
                sourceRatio:     form.sourceRatio
            };

            await depotService.createBatchOrder(payload);
            navigate('/kho/dashboard');
        } catch (err) {
            // Dev mode fallback
            console.warn('API error (dev mode):', err.message);
            navigate('/kho/dashboard');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans bg-slate-50 min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/kho/dashboard')} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <h1 className="text-lg font-bold text-slate-800">Tạo lô phế liệu xuất kho</h1>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">MÃ TẠO LÔ TỰ ĐỘNG</span>
                </div>
            </header>

            {/* Stepper */}
            <div className="bg-white border-b border-slate-200 py-6">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex justify-between items-center relative">
                        {/* Tiến trình line sau lưng */}
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-green-600 transition-all duration-300 -z-0"
                            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />

                        {STEPS.map(s => {
                            const isDone = step > s.num;
                            const isCurrent = step === s.num;
                            return (
                                <div key={s.num} className="flex flex-col items-center relative z-10">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                                        ${isDone ? 'bg-green-600 text-white' : isCurrent ? 'bg-green-600 text-white ring-4 ring-green-100' : 'bg-slate-100 text-slate-400'}`}>
                                        {isDone ? '✓' : s.num}
                                    </div>
                                    <span className={`text-xs font-bold mt-2 ${isCurrent ? 'text-slate-800' : 'text-slate-400'}`}>{s.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-8 pb-24">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                    {/* BƯỚC 1: THÔNG TIN CHUNG */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-base">Thông tin lô hàng</h3>
                                <p className="text-xs text-slate-400 mt-1">Đóng gói phế liệu tồn kho thành lô để đăng bán cho nhà máy.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Loại phế liệu trong kho</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {inventoryList.map(item => {
                                            const active = form.wasteType === item.type;
                                            // Kiểm tra xem loại vật liệu này đã có lô đang hoạt động chưa
                                            const isListed = activeMaterialTypes.some(t =>
                                                t.toUpperCase() === (item.key || '').toUpperCase()
                                            );
                                            return (
                                                <button key={item.type} type="button"
                                                    onClick={() => !isListed && handleSelectWasteType(item.type)}
                                                    disabled={isListed}
                                                    title={isListed ? 'Loại này đang có lô đăng bán rồi' : ''}
                                                    className={`p-4 rounded-xl border text-left transition-all relative
                                                        ${isListed ? 'border-amber-300 bg-amber-50 cursor-not-allowed opacity-70'
                                                            : active ? 'border-green-600 bg-green-50/50'
                                                            : 'border-slate-200 hover:bg-slate-50'}`}>
                                                    {isListed && (
                                                        <span className="absolute top-2 right-2 text-xs font-bold bg-amber-400 text-white px-1.5 py-0.5 rounded-md">Đã đăng</span>
                                                    )}
                                                    <p className="text-xs text-slate-400 font-semibold uppercase">TỒN: {item.current} kg</p>
                                                    <p className="font-bold text-slate-800 text-sm mt-1">{item.type}</p>
                                                    {isListed && <p className="text-xs text-amber-600 mt-1">Đang có lô đăng bán</p>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {activeMaterialTypes.length > 0 && (
                                        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                            <span>⚠️</span> Loại phế liệu đã có lô đang đăng bán sẽ bị khóa để tránh đăng trùng.
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tổng khối lượng đóng lô (kg)</label>
                                        <input type="number" placeholder="Nhập số kg đóng lô..." value={form.totalKg} onChange={e => updateForm('totalKg', e.target.value)}
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đơn giá mong muốn (đ/kg)</label>
                                        <input type="number" value={form.unitPrice} onChange={e => updateForm('unitPrice', e.target.value)}
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vị trí lưu kho chứa lô</label>
                                    <input type="text" value={form.location} onChange={e => updateForm('location', e.target.value)}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mô tả hoặc ghi chú thêm</label>
                                    <textarea rows={3} placeholder="Mô tả chất lượng phế liệu, độ sạch..." value={form.note} onChange={e => updateForm('note', e.target.value)}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BƯỚC 2: NGUỒN GỐC PHẾ LIỆU */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-base">Tỷ lệ nguồn gốc phế liệu</h3>
                                <p className="text-xs text-slate-400 mt-1">Cung cấp nguồn gốc phế liệu giúp nâng cao tính minh bạch để nhà máy tin cậy đấu giá cao hơn.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-600">Tổng phần trăm phân bổ:</span>
                                    <span className={`text-lg font-black ${totalRatio === 100 ? 'text-green-600' : 'text-red-500'}`}>{totalRatio} %</span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-semibold text-slate-700 w-32">Hộ gia đình (%)</span>
                                        <input type="number" value={form.sourceRatio.households} onChange={e => updateSource('households', e.target.value)}
                                            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-semibold text-slate-700 w-32">Cửa hàng (%)</span>
                                        <input type="number" value={form.sourceRatio.stores} onChange={e => updateSource('stores', e.target.value)}
                                            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-semibold text-slate-700 w-32">Công sở (%)</span>
                                        <input type="number" value={form.sourceRatio.offices} onChange={e => updateSource('offices', e.target.value)}
                                            className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BƯỚC 3: VẬN CHUYỂN */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-base">Phương thức vận chuyển</h3>
                                <p className="text-xs text-slate-400 mt-1">Chọn phương thức gửi hàng đến nhà máy đối tác.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" onClick={() => updateForm('transportType', 'DEPOT_SHIPPED')}
                                        className={`p-4 rounded-xl border text-left transition-all ${form.transportType === 'DEPOT_SHIPPED' ? 'border-green-600 bg-green-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                        <p className="font-bold text-slate-800 text-sm">Kho tự vận chuyển</p>
                                        <p className="text-xs text-slate-400 mt-1">Sử dụng tài xế liên kết của hệ thống gửi trực tiếp cho nhà máy.</p>
                                    </button>
                                    <button type="button" onClick={() => updateForm('transportType', 'FACTORY_PICKUP')}
                                        className={`p-4 rounded-xl border text-left transition-all ${form.transportType === 'FACTORY_PICKUP' ? 'border-green-600 bg-green-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                                        <p className="font-bold text-slate-800 text-sm">Nhà máy đến lấy</p>
                                        <p className="text-xs text-slate-400 mt-1">Nhà máy trúng thầu tự điều xe tải đến lấy hàng tại kho.</p>
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Đơn vị mua đích danh (Tuỳ chọn)</label>
                                    <input type="text" value={form.buyer} onChange={e => updateForm('buyer', e.target.value)}
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BƯỚC 4: XÁC NHẬN & HOÀN TẤT */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-extrabold text-slate-800 text-base">Xác nhận đóng lô hàng</h3>
                                <p className="text-xs text-slate-400 mt-1">Vui lòng kiểm tra lại thông tin lô hàng trước khi lưu hoặc đăng bán công khai.</p>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Loại phế liệu:</span>
                                    <span className="font-bold text-slate-800">{form.wasteType}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Khối lượng đóng lô:</span>
                                    <span className="font-bold text-slate-800">{form.totalKg} kg</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Vị trí trong kho:</span>
                                    <span className="font-bold text-slate-800">{form.location}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Đơn giá ước tính:</span>
                                    <span className="font-bold text-slate-800">{vnd(parseInt(form.unitPrice || 0))} / kg</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold">
                                    <span className="text-slate-700">Giá trị lô hàng ước tính:</span>
                                    <span className="text-green-700">{vnd(parseFloat(form.totalKg || 0) * parseInt(form.unitPrice || 0))}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Điều hướng Next/Back */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                        <button type="button" disabled={step === 1} onClick={() => setStep(s => s - 1)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold border ${step === 1 ? 'border-slate-200 text-slate-300 cursor-not-allowed' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}`}>
                            Quay lại
                        </button>

                        {step < STEPS.length ? (
                            <button type="button" disabled={step === 1 && !form.totalKg} onClick={() => setStep(s => s + 1)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${step === 1 && !form.totalKg ? 'bg-slate-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
                                Tiếp tục
                            </button>
                        ) : (
                            <button type="button" disabled={loading} onClick={handleFinish}
                                className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-all bg-green-600 hover:bg-green-700">
                                {loading ? 'Đang tạo lô...' : 'Đóng lô & Đăng bán'}
                            </button>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
