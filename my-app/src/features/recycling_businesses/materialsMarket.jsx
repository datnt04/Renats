import React from 'react';
import { Link } from 'react-router-dom';

const MaterialsMarket = () => {
    return (
        <div className="font-sans text-slate-900 overflow-x-hidden bg-slate-50 min-h-screen flex flex-col">
            {/* ── HEADER ── */}
            <header className="sticky-header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0">
                            <Link to="/recycle/dashboard">
                                <img alt="Re-Nats Logo" className="w-auto h-20"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3gKW9baWRyRxkJV31x5a-0U1sa7PGamZYDR1jsTogNaAy5vqcAdEicqsbmHHL5pS1iZotZGWRWdEujhed7u1bNsLSwaISs4E8U-ItVKt3SDI36p7jhJh8TB_3UEB8kfQDhgxnFNcAvshouOxS0Ee76qbk1Vr_Fkb998yVyNQPEeJhZWgyo7aTfVp2lCCfuhWdr8VCSmpE5mUz8lpwy1lmj82t9fffrwkwRfCTa8NQCY9njI9gaFLeAgxulAkWsldCaYyjtuXRmDw" />
                            </Link>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Chợ Nguyên
                                Liệu</a>
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Danh Sách
                                Vựa</a>
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Báo Giá</a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-slate-500 hover:text-primary relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">NT
                                </div>
                                <span className="text-sm font-semibold text-slate-700 hidden sm:block">Nhà máy Tái Chế A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <section className="py-10 flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Marketplace Controls */}
                    <div
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            <h1 className="text-2xl font-extrabold text-slate-800 whitespace-nowrap mr-4">Chợ Nguyên Liệu</h1>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 flex items-center gap-2 whitespace-nowrap">
                                    <span className="material-symbols-outlined text-lg">filter_list</span> Bộ lọc
                                </button>
                                <div className="h-9 w-px bg-slate-200 mx-1"></div>
                                <button
                                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-md flex items-center gap-2 whitespace-nowrap">
                                    <span className="material-symbols-outlined text-lg">recycling</span> Tất cả
                                </button>
                                <button
                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary flex items-center gap-2 whitespace-nowrap transition-colors">
                                    <span className="material-symbols-outlined text-lg">description</span> Giấy
                                </button>
                                <button
                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary flex items-center gap-2 whitespace-nowrap transition-colors">
                                    <span className="material-symbols-outlined text-lg">water_drop</span> Nhựa
                                </button>
                                <button
                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary flex items-center gap-2 whitespace-nowrap transition-colors">
                                    <span className="material-symbols-outlined text-lg">build</span> Kim loại
                                </button>
                            </div>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                className="px-4 py-2 bg-white text-slate-800 rounded-md shadow-sm text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">grid_view</span> Danh sách
                            </button>
                            <button
                                className="px-4 py-2 text-slate-500 hover:text-slate-800 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-lg">map</span> Bản đồ
                            </button>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">description</span> Giấy Carton
                                    </div>
                                    <div className="text-slate-400 text-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">near_me</span> 5.2 km
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Vựa Phế Liệu Minh Khôi</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-slate-500 text-sm">Quận 9, TP.HCM</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Khối lượng</p>
                                        <p className="text-2xl font-extrabold text-slate-800">12.5 <span
                                            className="text-sm font-semibold text-slate-500">Tấn</span></p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-xl border border-green-100 relative group">
                                        <p className="text-xs text-green-700 font-medium uppercase mb-1">Điểm uy tín</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-2xl font-extrabold text-green-700">98</span>
                                            <span className="text-xs font-bold text-green-600">/100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-slate-50 border-t border-slate-100 flex-grow">
                                <div className="p-4 opacity-40 filter blur-[2px] select-none pointer-events-none">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Lịch sử 10 chuyến gần nhất</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span>12/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                        <div className="flex justify-between text-sm"><span>10/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                        <div className="flex justify-between text-sm"><span>08/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10 p-4 text-center">
                                    <div className="bg-white p-3 rounded-full shadow-md mb-2">
                                        <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 mb-3">Xem lịch sử giao dịch chi tiết</p>
                                    <Link
                                        to="/recycle/market-premium"
                                        className="bg-primary hover:bg-secondary text-white text-sm font-bold py-2 px-6 rounded-lg shadow-lg shadow-green-200 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">verified</span> Nâng cấp Premium
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white z-20">
                                <Link
                                    to="/recycle/order-process"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                    Chốt đơn / Đặt mua
                                </Link>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">water_drop</span> Nhựa HDPE
                                    </div>
                                    <div className="text-slate-400 text-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">near_me</span> 12.8 km
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Đại Lý Thu Gom Thành Đạt</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-slate-500 text-sm">Thủ Đức, TP.HCM</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Khối lượng</p>
                                        <p className="text-2xl font-extrabold text-slate-800">8.4 <span
                                            className="text-sm font-semibold text-slate-500">Tấn</span></p>
                                    </div>
                                    <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 relative group">
                                        <p className="text-xs text-yellow-700 font-medium uppercase mb-1">Điểm uy tín</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-2xl font-extrabold text-yellow-600">75</span>
                                            <span className="text-xs font-bold text-yellow-600">/100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-slate-50 border-t border-slate-100 flex-grow">
                                <div className="p-4 opacity-40 filter blur-[2px] select-none pointer-events-none">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Lịch sử 10 chuyến gần nhất</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span>12/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                        <div className="flex justify-between text-sm"><span>...</span> <span>...</span></div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10 p-4 text-center">
                                    <div className="bg-white p-3 rounded-full shadow-md mb-2">
                                        <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 mb-3">Xem lịch sử giao dịch chi tiết</p>
                                    <Link
                                        to="/recycle/market-premium"
                                        className="bg-primary hover:bg-secondary text-white text-sm font-bold py-2 px-6 rounded-lg shadow-lg shadow-green-200 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">verified</span> Nâng cấp Premium
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white z-20">
                                <Link
                                    to="/recycle/order-process"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                    Chốt đơn / Đặt mua
                                </Link>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">build</span> Sắt Vụn
                                    </div>
                                    <div className="text-slate-400 text-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">near_me</span> 2.1 km
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Công Ty Môi Trường Xanh</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-slate-500 text-sm">Bình Thạnh, TP.HCM</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Khối lượng</p>
                                        <p className="text-2xl font-extrabold text-slate-800">45.0 <span
                                            className="text-sm font-semibold text-slate-500">Tấn</span></p>
                                    </div>
                                    <div className="bg-green-50 p-3 rounded-xl border border-green-100 relative group">
                                        <p className="text-xs text-green-700 font-medium uppercase mb-1">Điểm uy tín</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-2xl font-extrabold text-green-700">92</span>
                                            <span className="text-xs font-bold text-green-600">/100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-slate-50 border-t border-slate-100 flex-grow">
                                <div className="p-4 opacity-40 filter blur-[2px] select-none pointer-events-none">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Lịch sử 10 chuyến gần nhất</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span>12/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                        <div className="flex justify-between text-sm"><span>...</span> <span>...</span></div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10 p-4 text-center">
                                    <div className="bg-white p-3 rounded-full shadow-md mb-2">
                                        <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 mb-3">Xem lịch sử giao dịch chi tiết</p>
                                    <Link
                                        to="/recycle/market-premium"
                                        className="bg-primary hover:bg-secondary text-white text-sm font-bold py-2 px-6 rounded-lg shadow-lg shadow-green-200 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">verified</span> Nâng cấp Premium
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white z-20">
                                <Link
                                    to="/recycle/order-process"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                    Chốt đơn / Đặt mua
                                </Link>
                            </div>
                        </div>

                        {/* Card 4 - Premium Locked */}
                        <div
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">description</span> Giấy Tạp
                                    </div>
                                    <div className="text-slate-400 text-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">near_me</span> 8.5 km
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Vựa Thu Gom Bình An</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-slate-500 text-sm">Quận 7, TP.HCM</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Khối lượng</p>
                                        <p className="text-2xl font-extrabold text-slate-800">5.0 <span
                                            className="text-sm font-semibold text-slate-500">Tấn</span></p>
                                    </div>
                                    <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 relative overflow-hidden group">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Điểm uy tín</p>
                                        <div className="flex items-center gap-1 opacity-0">
                                            <span className="text-2xl font-extrabold">00</span>
                                            <span className="text-xs font-bold">/100</span>
                                        </div>
                                        <div
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 z-10 px-2 text-center">
                                            <span className="material-symbols-outlined text-white/90 text-2xl mb-1">lock</span>
                                            <span className="text-[10px] uppercase font-bold text-white tracking-wider">Chỉ dành cho Premium</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-slate-50 border-t border-slate-100 flex-grow">
                                <div className="p-4 opacity-40 filter blur-[2px] select-none pointer-events-none">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Lịch sử 10 chuyến gần nhất</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span>12/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                        <div className="flex justify-between text-sm"><span>...</span> <span>...</span></div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10 p-4 text-center">
                                    <div className="bg-white p-3 rounded-full shadow-md mb-2">
                                        <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 mb-3">Xem lịch sử giao dịch chi tiết</p>
                                    <Link
                                        to="/recycle/market-premium"
                                        className="bg-primary hover:bg-secondary text-white text-sm font-bold py-2 px-6 rounded-lg shadow-lg shadow-green-200 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">verified</span> Nâng cấp Premium
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white z-20">
                                <Link
                                    to="/recycle/order-process"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                    Chốt đơn / Đặt mua
                                </Link>
                            </div>
                        </div>

                        {/* Card 5 - Premium Locked */}
                        <div
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">build</span> Nhôm Cán
                                    </div>
                                    <div className="text-slate-400 text-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">near_me</span> 15 km
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Cơ Sở Phế Liệu Phương Nam</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-slate-500 text-sm">Bình Dương</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Khối lượng</p>
                                        <p className="text-2xl font-extrabold text-slate-800">18.2 <span
                                            className="text-sm font-semibold text-slate-500">Tấn</span></p>
                                    </div>
                                    <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 relative overflow-hidden group">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Điểm uy tín</p>
                                        <div className="flex items-center gap-1 opacity-0">
                                            <span className="text-2xl font-extrabold">00</span>
                                            <span className="text-xs font-bold">/100</span>
                                        </div>
                                        <div
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 z-10 px-2 text-center">
                                            <span className="material-symbols-outlined text-white/90 text-2xl mb-1">lock</span>
                                            <span className="text-[10px] uppercase font-bold text-white tracking-wider">Chỉ dành cho Premium</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-slate-50 border-t border-slate-100 flex-grow">
                                <div className="p-4 opacity-40 filter blur-[2px] select-none pointer-events-none">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Lịch sử 10 chuyến gần nhất</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span>12/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                        <div className="flex justify-between text-sm"><span>...</span> <span>...</span></div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10 p-4 text-center">
                                    <div className="bg-white p-3 rounded-full shadow-md mb-2">
                                        <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 mb-3">Xem lịch sử giao dịch chi tiết</p>
                                    <Link
                                        to="/recycle/market-premium"
                                        className="bg-primary hover:bg-secondary text-white text-sm font-bold py-2 px-6 rounded-lg shadow-lg shadow-green-200 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">verified</span> Nâng cấp Premium
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white z-20">
                                <Link
                                    to="/recycle/order-process"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                    Chốt đơn / Đặt mua
                                </Link>
                            </div>
                        </div>

                        {/* Card 6 - Premium Locked */}
                        <div
                            className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">water_drop</span> Nhựa PET
                                    </div>
                                    <div className="text-slate-400 text-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">near_me</span> 3.4 km
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Vựa Ve Chai Cô Tư</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-slate-500 text-sm">Gò Vấp, TP.HCM</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 p-3 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Khối lượng</p>
                                        <p className="text-2xl font-extrabold text-slate-800">2.5 <span
                                            className="text-sm font-semibold text-slate-500">Tấn</span></p>
                                    </div>
                                    <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 relative overflow-hidden group">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Điểm uy tín</p>
                                        <div className="flex items-center gap-1 opacity-0">
                                            <span className="text-2xl font-extrabold">00</span>
                                            <span className="text-xs font-bold">/100</span>
                                        </div>
                                        <div
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 z-10 px-2 text-center">
                                            <span className="material-symbols-outlined text-white/90 text-2xl mb-1">lock</span>
                                            <span className="text-[10px] uppercase font-bold text-white tracking-wider">Chỉ dành cho Premium</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-slate-50 border-t border-slate-100 flex-grow">
                                <div className="p-4 opacity-40 filter blur-[2px] select-none pointer-events-none">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Lịch sử 10 chuyến gần nhất</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm"><span>12/05/2024</span> <span
                                            className="text-green-600 font-bold">Thành công</span></div>
                                        <div className="flex justify-between text-sm"><span>...</span> <span>...</span></div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10 p-4 text-center">
                                    <div className="bg-white p-3 rounded-full shadow-md mb-2">
                                        <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-700 mb-3">Xem lịch sử giao dịch chi tiết</p>
                                    <Link
                                        to="/recycle/market-premium"
                                        className="bg-primary hover:bg-secondary text-white text-sm font-bold py-2 px-6 rounded-lg shadow-lg shadow-green-200 transition-all flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">verified</span> Nâng cấp Premium
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border-t border-slate-100 bg-white z-20">
                                <Link
                                    to="/recycle/order-process"
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">shopping_cart_checkout</span>
                                    Chốt đơn / Đặt mua
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MaterialsMarket;
