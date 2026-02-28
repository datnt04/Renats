import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TransportationTripDetailsBooking = () => {
    const [selectedTime, setSelectedTime] = useState('Trong 1 giờ tới');
    const [price, setPrice] = useState(900000);

    const timeOptions = [
        'Trong 1 giờ tới',
        '8:00 Sáng mai',
        '14:00 Chiều mai'
    ];

    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen hero-mesh-gradient flex items-center justify-center py-8">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100 flex flex-col h-[85vh] relative text-left">
                {/* Header */}
                <div className="glass-header border-b border-slate-100 p-4 sticky top-0 z-20 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/transport/order-details" className="mr-3 p-1 rounded-full hover:bg-slate-50 text-slate-500 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-lg font-bold text-slate-800">Chi tiết & Đặt lịch</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="material-symbols-outlined text-slate-400">notifications</span>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                    {/* Map Summary */}
                    <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
                        <div className="absolute inset-0 map-bg opacity-30"></div>
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            <path className="animate-pulse" d="M 60 40 Q 180 20 380 60" fill="none" stroke="#0ea5e9" strokeDasharray="6 4"
                                strokeWidth="3"></path>
                            <circle cx="60" cy="40" fill="#2f7f34" r="5" stroke="white" strokeWidth="2"></circle>
                            <circle cx="380" cy="60" fill="#dc2626" r="5" stroke="white" strokeWidth="2"></circle>
                        </svg>
                        <div className="absolute bottom-2 right-2 bg-white rounded p-1 shadow-sm border border-slate-100">
                            <span className="material-symbols-outlined text-slate-500 text-sm">open_in_full</span>
                        </div>
                    </div>

                    <div className="p-4 space-y-6">
                        {/* Image Gallery */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                                <span className="material-symbols-outlined text-primary mr-2 text-sm">photo_library</span>
                                Hình ảnh hàng hóa
                            </h3>
                            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
                                <div className="flex-none w-64 h-40 bg-slate-200 rounded-xl overflow-hidden relative shadow-sm">
                                    <img alt="Scrap Bales 1" className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBskHjjBynxdEVALOBgyDgWp6oPMOgCZRc1lAWs1p6QYimSInwZ1PEr-oJtHFiriNryuBEE7llfDSdPK2FiuolHI93XfYUYz2pjYW4ekbangcvqhXdnrlmxzLiKZ2qtiTv6iBKetgutFyrKFALTxMlMuAFMk0_UJWXN2PISEDMH9MpUTUjlIB3N5k6iZgRvgO1ruvvmMFI-6ZPZTEwdAwTWPkRD8GSaMAT_5x69yT86lNqU0S7crfVKk8TbEvHm8TjlPM4frKPTS6U" />
                                </div>
                                <div className="flex-none w-64 h-40 bg-slate-200 rounded-xl overflow-hidden relative shadow-sm">
                                    <img alt="Scrap Bales 2" className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkjI03Q81iy04BTyrl9s31rVT9Utftn_9pqIcE2FWglS7IVuOEXvvgijyxwiGgCcAOl9Hn9bBuT70c7U_6DTC4GFALA4m4T0HRTe3qhOBn_UODkqjaW-9j9EfyF8uyRwMwdkyDIHixJKZ3HxsOhAiaYslo8WaTrVEZVuzKMFN3Z4TW7FBsrTN5jyPPG5k52kIUcOUdnE0x68fPsjfJ0xhkOkXPLQ2cwLAScjWjnoxVHM66-i2DVWYDLsh7a0GGrr0a2XOqPbpSemQ" />
                                </div>
                                <div
                                    className="flex-none w-20 h-40 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 text-slate-400 font-medium text-sm">
                                    +3
                                </div>
                            </div>
                        </div>

                        {/* Time Picker */}
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                                <span className="material-symbols-outlined text-primary mr-2 text-sm">schedule</span>
                                Chọn Giờ Bốc Hàng
                            </h3>
                            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                                {timeOptions.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-lg transition-all ${selectedTime === time
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>

                            {/* Spinning Time Picker UI (Simulated) */}
                            <div className="relative h-24 overflow-hidden bg-white rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">
                                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute inset-x-0 h-10 border-y border-primary/20 bg-primary/5 z-0 pointer-events-none"></div>
                                <div className="flex w-full px-8 text-center cursor-ns-resize">
                                    <div className="flex-1 flex flex-col gap-3 py-2 text-lg font-bold text-slate-300">
                                        <div className="opacity-40">08</div>
                                        <div className="text-slate-900 scale-110 transition-transform">09</div>
                                        <div className="opacity-40">10</div>
                                    </div>
                                    <div className="flex items-center justify-center font-bold text-slate-400 pb-1">:</div>
                                    <div className="flex-1 flex flex-col gap-3 py-2 text-lg font-bold text-slate-300">
                                        <div className="opacity-40">15</div>
                                        <div className="text-slate-900 scale-110 transition-transform">30</div>
                                        <div className="opacity-40">45</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Bidding */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-slate-800 flex items-center">
                                    <span className="material-symbols-outlined text-primary mr-2 text-sm">gavel</span>
                                    Chốt Giá Vận Chuyển
                                </h3>
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Giá gợi ý: 850k</span>
                            </div>
                            <div className="relative mt-2">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₫</span>
                                <input
                                    className="w-full pl-8 pr-16 py-4 text-2xl font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-center tracking-wide outline-none transition-all"
                                    placeholder="Nhập giá"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">VND</span>
                            </div>
                            <p className="text-xs text-center text-slate-500 mt-2 hover:text-slate-700 cursor-default">Đã bao gồm phí cầu đường, chưa VAT</p>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-[64px] left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-8">
                    <Link
                        to="/transport/waiting-confirm"
                        className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-green-700 text-white font-bold text-lg shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all flex items-center justify-center group"
                    >
                        <span className="mr-2">Gửi yêu cầu nhận chuyến</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                    </Link>
                </div>

                {/* Unified Bottom Nav */}
                <div className="bg-white border-t border-slate-100 py-2 px-6 flex justify-between items-end h-[64px] z-30">
                    <Link to="/recycle/dashboard" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors pb-1">
                        <span className="material-symbols-outlined text-2xl">home</span>
                        <span className="text-[10px] font-medium">Trang chủ</span>
                    </Link>
                    <Link to="/transport/market" className="flex flex-col items-center gap-1 text-primary pb-1">
                        <span className="material-symbols-outlined text-2xl">local_shipping</span>
                        <span className="text-[10px] font-medium">Đơn hàng</span>
                    </Link>
                    <div className="relative -top-5">
                        <button className="h-14 w-14 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center border-4 border-slate-50 hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </button>
                    </div>
                    <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors pb-1">
                        <span className="material-symbols-outlined text-2xl">chat</span>
                        <span className="text-[10px] font-medium">Tin nhắn</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors pb-1">
                        <span className="material-symbols-outlined text-2xl">person</span>
                        <span className="text-[10px] font-medium">Tài khoản</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransportationTripDetailsBooking;
