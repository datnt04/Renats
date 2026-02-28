import React from 'react';
import { Link } from 'react-router-dom';

const TransportationOrderDetails = () => {
    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen hero-mesh-gradient flex items-center justify-center py-8">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100 flex flex-col h-[85vh] relative text-left">
                {/* Header */}
                <div className="bg-white border-b border-slate-100 p-4 sticky top-0 z-10 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/transport/market" className="mr-3 p-1 rounded-full hover:bg-slate-50 text-slate-500">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-lg font-bold text-slate-800">Chi tiết đơn hàng</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">Mới</span>
                        <span className="material-symbols-outlined text-slate-400">more_vert</span>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Map Preview */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <div className="absolute inset-0 map-bg opacity-30"></div>
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            <path className="animate-pulse" d="M 80 80 Q 200 40 340 120" fill="none" stroke="#0ea5e9" strokeDasharray="6 4"
                                strokeWidth="4"></path>
                            <circle cx="80" cy="80" fill="#2f7f34" r="6" stroke="white" strokeWidth="2"></circle>
                            <circle cx="340" cy="120" fill="#dc2626" r="6" stroke="white" strokeWidth="2"></circle>
                        </svg>
                        <div
                            className="absolute top-16 left-8 bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm border border-slate-200 text-xs font-bold text-primary">
                            Kho An Khang
                        </div>
                        <div
                            className="absolute bottom-12 right-6 bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm border border-slate-200 text-xs font-bold text-red-600">
                            Nhà máy Giấy
                        </div>
                        <div className="absolute bottom-2 right-2 bg-white rounded p-1 shadow">
                            <span className="material-symbols-outlined text-slate-500 text-sm">fullscreen</span>
                        </div>
                    </div>

                    <div className="p-4 space-y-6">
                        {/* Quick Info Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 -mt-8 relative z-10 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                                    Giấy Carton
                                </div>
                                <span className="text-slate-500 text-sm font-medium">~14.5 Km</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Khối lượng dự kiến</p>
                                    <div className="flex items-baseline">
                                        <span className="text-2xl font-bold text-slate-900">3.5</span>
                                        <span className="ml-1 text-sm font-semibold text-slate-500">Tấn</span>
                                    </div>
                                </div>
                                <div className="h-10 w-px bg-slate-100 mx-4"></div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Thu nhập ước tính</p>
                                    <div className="flex items-baseline">
                                        <span className="text-xl font-bold text-primary">850.000</span>
                                        <span className="ml-1 text-xs font-semibold text-slate-500">đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline / Route */}
                        <div className="space-y-6">
                            {/* Pickup */}
                            <div className="relative pl-8">
                                <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-slate-200"></div>
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white bg-primary shadow-sm z-10">
                                </div>
                                <div className="mb-1">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Điểm nhận hàng</span>
                                    <h3 className="font-bold text-slate-900 text-lg">Kho Phế Liệu An Khang</h3>
                                    <p className="text-sm text-slate-500">220 Đường số 7, KCN Vĩnh Lộc, Bình Chánh</p>
                                </div>
                                <div className="mt-3 bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 text-sm">
                                            A</div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Anh Khang (Chủ kho)</p>
                                            <p className="text-xs text-slate-500">0909 *** ***</p>
                                        </div>
                                    </div>
                                    <button
                                        className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-green-600 hover:bg-green-50">
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                    </button>
                                </div>
                            </div>

                            {/* Delivery */}
                            <div className="relative pl-8">
                                <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white bg-red-500 shadow-sm z-10">
                                </div>
                                <div className="mb-1">
                                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Điểm giao hàng</span>
                                    <h3 className="font-bold text-slate-900 text-lg">Nhà Máy Giấy Sài Gòn</h3>
                                    <p className="text-sm text-slate-500">Lô B, KCN Mỹ Phước 3, Bến Cát, Bình Dương</p>
                                </div>
                                <div className="mt-3 bg-slate-50 rounded-lg p-3 border border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mr-3 text-sm">
                                            K</div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Chị Kiều (Nhận hàng)</p>
                                            <p className="text-xs text-slate-500">0912 *** ***</p>
                                        </div>
                                    </div>
                                    <button
                                        className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-green-600 hover:bg-green-50">
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <h4 className="font-semibold text-slate-800 mb-2 flex items-center text-sm">
                                <span className="material-symbols-outlined text-blue-500 mr-2 text-[18px]">info</span>
                                Lưu ý vận chuyển
                            </h4>
                            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                                <li>Vui lòng mang theo giày bảo hộ khi vào nhà máy.</li>
                                <li>Yêu cầu chụp ảnh phiếu cân đầy đủ 4 góc.</li>
                                <li>Hàng cồng kềnh, cần dây chằng buộc kỹ.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <Link
                        to="/transport/trip-booking"
                        className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-green-800 text-white font-bold text-base flex items-center justify-between shadow-lg shadow-green-900/20 transition-all group">
                        <span className="flex flex-col items-start leading-tight">
                            <span>Nhận chuyến ngay</span>
                            <span className="text-[10px] font-normal opacity-90">Bắt đầu điều hướng</span>
                        </span>
                        <span
                            className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <span className="material-symbols-outlined text-xl">near_me</span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TransportationOrderDetails;
