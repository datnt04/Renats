import React from 'react';
import { useParams, Link } from 'react-router-dom';

// ── Mock invoice data (in thực tế sẽ fetch theo id) ─────────────────────
const INVOICES = {
    'YC-001': {
        id: 'YC-001',
        invoiceNo: 'HD-2026-001',
        date: '27/02/2026',
        time: '09:45',
        seller: { name: 'Nguyễn Văn A', phone: '0901 234 567', address: '126 Đường Nguyễn Duy Trinh, Quận 9, TP. Hồ Chí Minh' },
        warehouse: { name: 'Kho Re-Nats', address: '45 Đường Số 12, Bình Chánh, TP. Hồ Chí Minh', phone: '028 1234 5678' },
        items: [
            { label: 'Đồng cáp (Loại 1)', emoji: '🔶', kg: 12.5, pricePerKg: 95_000 },
            { label: 'Sắt vụn', emoji: '⚙️', kg: 48.0, pricePerKg: 10_000 },
            { label: 'Nhôm', emoji: '🔘', kg: 8.0, pricePerKg: 35_000 },
        ],
        note: 'Hàng sạch, đã phân loại sẵn',
        status: 'paid',
    },
    'YC-002': {
        id: 'YC-002',
        invoiceNo: 'HD-2026-002',
        date: '28/02/2026',
        time: '14:10',
        seller: { name: 'Trần Thị Hoa', phone: '0902 333 444', address: 'Bình Dương' },
        warehouse: { name: 'Kho Re-Nats', address: '45 Đường Số 12, Bình Chánh, TP. Hồ Chí Minh', phone: '028 1234 5678' },
        items: [
            { label: 'Giấy Carton', emoji: '📦', kg: 95.0, pricePerKg: 2_000 },
        ],
        note: '',
        status: 'paid',
    },
};

const vnd = n => n.toLocaleString('vi-VN') + ' ₫';

const Invoice = () => {
    const { id } = useParams();
    const inv = INVOICES[id] || INVOICES['YC-001'];

    const subtotals = inv.items.map(it => it.kg * it.pricePerKg);
    const totalKg = inv.items.reduce((s, it) => s + it.kg, 0);
    const totalAmt = subtotals.reduce((s, v) => s + v, 0);

    return (
        <div className="font-sans bg-slate-100 min-h-screen">
            {/* Action bar (không in) */}
            <div className="print:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <Link to={-1} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại
                </Link>
                <div className="flex gap-2">
                    <button onClick={() => window.print()}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all hover:scale-[1.02]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.056 48.056 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                        </svg>
                        In hóa đơn
                    </button>
                </div>
            </div>

            {/* Invoice paper */}
            <div className="max-w-2xl mx-auto px-4 py-8 print:py-0 print:px-0">
                <div className="bg-white rounded-2xl shadow-sm print:shadow-none print:rounded-none overflow-hidden">

                    {/* ── Header ── */}
                    <div className="bg-green-700 px-8 py-6 text-white print:bg-green-700">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-2xl font-extrabold tracking-tight">Re-Nats</p>
                                <p className="text-green-200 text-sm mt-0.5">Hệ thống quản lý phế liệu minh bạch</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-green-300 uppercase tracking-wider font-semibold">Phiếu Thu Gom</p>
                                <p className="text-lg font-extrabold mt-0.5">{inv.invoiceNo}</p>
                                <p className="text-green-200 text-xs mt-0.5">{inv.date} · {inv.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-6 space-y-6">

                        {/* ── Hai bên ── */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Người bán</p>
                                <p className="font-extrabold text-slate-800">{inv.seller.name}</p>
                                <p className="text-sm text-slate-500 mt-1">{inv.seller.phone}</p>
                                <p className="text-sm text-slate-500 mt-0.5 leading-snug">{inv.seller.address}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Đơn vị thu gom</p>
                                <p className="font-extrabold text-slate-800">{inv.warehouse.name}</p>
                                <p className="text-sm text-slate-500 mt-1">{inv.warehouse.phone}</p>
                                <p className="text-sm text-slate-500 mt-0.5 leading-snug">{inv.warehouse.address}</p>
                            </div>
                        </div>

                        {/* ── Divider ── */}
                        <div className="border-t border-dashed border-slate-200" />

                        {/* ── Bảng phế liệu ── */}
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Chi tiết hàng</p>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="text-left text-xs font-bold text-slate-500 pb-2">Loại phế liệu</th>
                                        <th className="text-right text-xs font-bold text-slate-500 pb-2">Số kg</th>
                                        <th className="text-right text-xs font-bold text-slate-500 pb-2">Đơn giá</th>
                                        <th className="text-right text-xs font-bold text-slate-500 pb-2">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {inv.items.map((it, i) => (
                                        <tr key={i}>
                                            <td className="py-3 text-slate-800 font-medium">
                                                {it.emoji} {it.label}
                                            </td>
                                            <td className="py-3 text-right text-slate-700 font-semibold">{it.kg} kg</td>
                                            <td className="py-3 text-right text-slate-500">{vnd(it.pricePerKg)}</td>
                                            <td className="py-3 text-right font-bold text-slate-800">{vnd(it.kg * it.pricePerKg)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Tổng cộng ── */}
                        <div className="border-t border-slate-200 pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-slate-500">
                                <span>Tổng khối lượng</span>
                                <span className="font-semibold text-slate-700">{totalKg.toFixed(1)} kg</span>
                            </div>
                            <div className="flex justify-between items-center bg-green-700 text-white rounded-xl px-5 py-4">
                                <span className="font-extrabold text-base">Tổng tiền thanh toán</span>
                                <span className="text-2xl font-extrabold">{vnd(Math.round(totalAmt))}</span>
                            </div>
                        </div>

                        {/* ── Ghi chú ── */}
                        {inv.note && (
                            <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-500">
                                <span className="font-semibold text-slate-700">Ghi chú: </span>{inv.note}
                            </div>
                        )}

                        {/* ── Trạng thái & Chữ ký ── */}
                        <div className="border-t border-dashed border-slate-200 pt-5 grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl font-extrabold text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    Đã thanh toán
                                </div>
                                <p className="text-xs text-slate-400 mt-1.5">{inv.date}</p>
                            </div>
                            <div className="text-center">
                                <div className="h-12 border-b border-slate-200 mb-1" />
                                <p className="text-xs text-slate-400">Chữ ký người bán</p>
                            </div>
                        </div>

                        {/* ── Footer ── */}
                        <div className="text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
                            Phiếu thu gom được tạo bởi hệ thống <span className="font-semibold text-green-700">Re-Nats</span> · renats.vn ·
                            Dữ liệu nguồn gốc được lưu trữ minh bạch
                        </div>
                    </div>
                </div>
            </div>

            {/* Print styles */}
            <style>{`
                @media print {
                    body { background: white; }
                    .print\\:hidden { display: none !important; }
                    @page { margin: 1.5cm; }
                }
            `}</style>
        </div>
    );
};

export default Invoice;
