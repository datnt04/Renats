import React from 'react';
import { Link } from 'react-router-dom';

const TransportationMarketplace = () => {
    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen hero-mesh-gradient flex items-center justify-center py-8">
            <div className="w-full max-w-md bg-slate-50 shadow-xl rounded-2xl overflow-hidden border border-slate-100 flex flex-col h-[85vh] relative">
                {/* Header */}
                <div className="bg-white px-4 py-3 sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <Link to="/recycle/dashboard">
                                <img alt="Logo" className="w-8 h-8 rounded-lg shadow-sm"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCchSqQN45BeRFdR_FJU2HDYu5arAf6w079ylHz-F7nVSHjP_P-5LYDFCtm506WAymc5rTixw9A2OVWtQUd7l5RuXcAagFWH-K6d8knQWh-ySrWyApQVMHv27HetnFK4Qq0gnI4B7SGydCkJZu_a-XgXFXZcFGrLr8x9D8Omtb4enYXWrFX8dPp9CXt2_HuwColHECcLvF1YftMP8rfm_VP2QXP8-9iz3Im4os4hwDm-h6QW9YalHDMH6ado6CJSVvXFSknViJMbBQ" />
                            </Link>
                            <h1 className="text-xl font-bold text-slate-800">Chợ Chuyến Đi</h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <img alt="Profile" className="w-8 h-8 rounded-full border border-slate-200"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkNRKzWCtjrVv23e9YhMQ86qkixzvzpW7TobksL078F257K2SaEQJHEkE7Kr3otOZt7pmM5m7apXv0oDWe5lkNuOizQvWse0-KkNzSBNimgUKrlfLFZoQOFY1RvpYbfIdk0YhK00yh0hAWkzQrRsWl5mt8huM_Ba1RkTH9E0-XZRmAbmtgsd5y-nlSVd8n7dCAwPHOjC97jpA2sgicmo0MSitSNikwx0Ez8HNvRD48gavu_UBa0ApC7IIygZEQN7IRswIYZoTjRLE" />
                        </div>
                    </div>
                    {/* Categories */}
                    <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-1">
                        <button
                            className="flex-shrink-0 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm shadow-primary/30 whitespace-nowrap">
                            Gần tôi nhất
                        </button>
                        <button
                            className="flex-shrink-0 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 whitespace-nowrap">
                            Xe &lt; 2.5 Tấn
                        </button>
                        <button
                            className="flex-shrink-0 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 whitespace-nowrap">
                            Cần đi ngay
                        </button>
                        <button
                            className="flex-shrink-0 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 whitespace-nowrap">
                            Giá cao
                        </button>
                    </div>
                </div>

                {/* Listings */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Card 1 */}
                    <Link
                        to="/transport/order-details"
                        className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform duration-100 cursor-pointer block">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Mới đăng</span>
                            </div>
                            <span className="text-xs text-slate-400 font-medium">5 phút trước</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg leading-snug mb-1">
                                <span>Vựa An Khang</span>
                                <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
                                <span>NM Giấy SG</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <span className="material-symbols-outlined text-base">near_me</span>
                                <span>Khoảng cách: 15 km</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div className="text-xs text-slate-500 mb-1">Hàng hóa</div>
                                <div className="font-semibold text-slate-800 text-sm">12.5 Tấn Giấy</div>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div className="text-xs text-slate-500 mb-1">Thời gian</div>
                                <div className="font-semibold text-slate-800 text-sm">Sáng mai 08:00</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
                                <span className="material-symbols-outlined text-sm mr-1">warning</span>
                                Yêu cầu bạt phủ
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-extrabold text-primary">1.500.000 <span
                                    className="text-sm font-semibold underline align-top">đ</span></div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2 */}
                    <Link
                        to="/transport/order-details"
                        className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform duration-100 cursor-pointer block">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-2">
                            </div>
                            <span className="text-xs text-slate-400 font-medium">30 phút trước</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg leading-snug mb-1">
                                <span>Kho Lộc Phát</span>
                                <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
                                <span>Cảng Cát Lái</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <span className="material-symbols-outlined text-base">near_me</span>
                                <span>Khoảng cách: 22 km</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div className="text-xs text-slate-500 mb-1">Hàng hóa</div>
                                <div className="font-semibold text-slate-800 text-sm">8 Tấn Nhựa</div>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div className="text-xs text-slate-500 mb-1">Thời gian</div>
                                <div className="font-semibold text-slate-800 text-sm">Chiều nay 14:00</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <div className="flex items-center text-slate-400 text-xs">
                                <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                                Đã xác thực
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-extrabold text-primary">2.200.000 <span
                                    className="text-sm font-semibold underline align-top">đ</span></div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 3 (Taken) */}
                    <div
                        className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform duration-100 cursor-pointer opacity-80">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-2">
                                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Đã nhận</span>
                            </div>
                            <span className="text-xs text-slate-400 font-medium">1 giờ trước</span>
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg leading-snug mb-1">
                                <span>Vựa Minh Tâm</span>
                                <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
                                <span>NM Thép VN</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <span className="material-symbols-outlined text-base">near_me</span>
                                <span>Khoảng cách: 45 km</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div className="text-xs text-slate-500 mb-1">Hàng hóa</div>
                                <div className="font-semibold text-slate-800 text-sm">15 Tấn Sắt Vụn</div>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                <div className="text-xs text-slate-500 mb-1">Thời gian</div>
                                <div className="font-semibold text-slate-800 text-sm">Ngày mai</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-medium">
                                <span className="material-symbols-outlined text-sm mr-1">warning</span>
                                Xe cẩu tự hành
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-extrabold text-slate-400 decoration-slate-400 line-through decoration-2">4.500.000
                                    <span className="text-sm font-semibold underline align-top no-underline">đ</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="h-16"></div>
                </div>

                {/* Bottom Nav */}
                <div className="bg-white border-t border-slate-100 px-6 pb-6 pt-3 sticky bottom-0 z-20">
                    <div className="flex justify-between items-end relative">
                        <button className="flex flex-col items-center space-y-1 text-primary w-12 group">
                            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">home</span>
                            <span className="text-[10px] font-medium">Trang chủ</span>
                        </button>
                        <button
                            className="flex flex-col items-center space-y-1 text-slate-400 hover:text-primary w-12 group transition-colors">
                            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">history</span>
                            <span className="text-[10px] font-medium">Lịch sử</span>
                        </button>
                        <div className="absolute left-1/2 -translate-x-1/2 -top-8">
                            <button
                                className="h-14 w-14 rounded-full bg-primary text-white shadow-lg shadow-green-900/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-4 border-slate-50">
                                <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                            </button>
                        </div>
                        <div className="w-8"></div>
                        <button
                            className="flex flex-col items-center space-y-1 text-slate-400 hover:text-primary w-12 group transition-colors">
                            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">chat</span>
                            <span className="text-[10px] font-medium">Tin nhắn</span>
                        </button>
                        <button
                            className="flex flex-col items-center space-y-1 text-slate-400 hover:text-primary w-12 group transition-colors">
                            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">person</span>
                            <span className="text-[10px] font-medium">Tài khoản</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportationMarketplace;
