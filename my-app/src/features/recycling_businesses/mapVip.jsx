import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HeaderDoanhNghiep from '../../components/layout/header_doanhNghiep/headerDoanhNghiep';
import { factoryService } from '../../services/factoryService';
const MapVip = () => {
    const navigate = useNavigate();
    const [isPremium, setIsPremium] = useState(false);
    const [checkingPremium, setCheckingPremium] = useState(true);

    useEffect(() => {
        factoryService.getPremiumStatus()
            .then(res => setIsPremium(res?.isPremium || false))
            .catch(() => setIsPremium(false))
            .finally(() => setCheckingPremium(false));
    }, []);

    return (
        <div className="font-sans text-slate-900 overflow-hidden bg-slate-50">
            <style>{`
        .map-container { background-color: #e5e7eb; background-size: cover; background-position: center; position: relative; height: calc(100vh - 80px); width: 100%; overflow: hidden; }
        .map-overlay { background: rgba(226, 232, 240, 0.4); position: absolute; inset: 0; }
        .map-pattern { background-color: #eef2f6; background-image: linear-gradient(#e2e8f0 2px, transparent 2px), linear-gradient(90deg, #e2e8f0 2px, transparent 2px); background-size: 100px 100px; }
        .pin { position: absolute; transform: translate(-50%, -100%); cursor: pointer; transition: all 0.2s ease-out; }
        .pin:hover { transform: translate(-50%, -110%) scale(1.1); z-index: 40; }
        .pin-shadow { width: 20px; height: 6px; background: rgba(0, 0, 0, 0.2); border-radius: 50%; position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%); filter: blur(2px); }
      `}</style>

            {/* Header dùng chung */}
            <HeaderDoanhNghiep activeTab="map" />

            {checkingPremium ? (
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
                    <span className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
                </div>
            ) : !isPremium ? (
                <div className="relative" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="absolute inset-0 map-pattern opacity-60" style={{ filter: 'blur(4px)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
                        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-yellow-400"></div>
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                                <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-yellow-200">
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                                Tính năng Premium
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Bản đồ Đại lý VIP</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                                Xem vị trí thực tế các kho vựa uy tín, tính khoảng cách, xem lịch sử giao dịch và đặt mua trực tiếp từ bản đồ.
                            </p>
                            <ul className="text-left max-w-sm mx-auto mb-8 space-y-2.5">
                                {['Xem vị trí tất cả kho vựa gần nhất', 'Điểm uy tín & loại hàng trên bản đồ', 'Chỉ đường & kết nối tài xế', 'Đặt mua ngay từ popup bản đồ'].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-700">
                                        <span className="material-symbols-outlined text-green-500 mr-3 text-xl">check_circle</span>
                                        <span className="font-medium text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/nha-may/premium" className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-extrabold py-4 px-10 rounded-xl shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                                Mua gói Premium
                            </Link>
                            <p className="mt-4 text-xs text-slate-400">Thanh toán an toàn • Hủy bất kỳ lúc nào</p>
                        </div>
                    </div>
                </div>
            ) : (
            <main className="relative w-full h-[calc(100vh-80px)]">

                {/* Filter Bar */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-[95%] max-w-5xl">
                    <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-2">
                        <div className="flex items-center gap-2 w-full overflow-x-auto px-2">
                            <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200 flex items-center gap-1 whitespace-nowrap">
                                <span className="material-symbols-outlined text-base">filter_list</span>
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-1"></div>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 whitespace-nowrap">
                                Tất cả
                            </button>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary flex items-center gap-2 whitespace-nowrap transition-colors">
                                <span className="material-symbols-outlined text-base text-blue-500">water_drop</span> Nhựa
                            </button>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary flex items-center gap-2 whitespace-nowrap transition-colors">
                                <span className="material-symbols-outlined text-base text-orange-500">description</span> Giấy
                            </button>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary flex items-center gap-2 whitespace-nowrap transition-colors">
                                <span className="material-symbols-outlined text-base text-gray-500">build</span> Kim loại
                            </button>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg flex-shrink-0">
                            <Link to="/recycle/market" className="px-3 py-1.5 text-slate-500 hover:text-slate-800 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-lg">grid_view</span> Danh sách
                            </Link>
                            <button className="px-3 py-1.5 bg-white text-slate-800 rounded-md shadow-sm text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">map</span> Bản đồ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Map Area */}
                <div className="map-pattern w-full h-full relative bg-slate-200 overflow-hidden">
                    {/* SVG Roads */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                        preserveAspectRatio="none"
                        viewBox="0 0 1000 800"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0,400 Q200,350 400,450 T800,400 T1000,500" fill="none" stroke="#93c5fd" strokeWidth="30" />
                        <path d="M100,0 V800" fill="none" stroke="#cbd5e1" strokeWidth="8" />
                        <path d="M300,0 V800" fill="none" stroke="#cbd5e1" strokeWidth="8" />
                        <path d="M600,0 V800" fill="none" stroke="#cbd5e1" strokeWidth="12" />
                        <path d="M0,200 H1000" fill="none" stroke="#cbd5e1" strokeWidth="8" />
                        <path d="M0,600 H1000" fill="none" stroke="#cbd5e1" strokeWidth="10" />
                    </svg>

                    {/* Pin - Vựa Minh Khôi (VIP) */}
                    <div className="pin absolute top-[40%] left-[55%] z-30 group">
                        <div className="relative">
                            <div className="pin-shadow"></div>
                            <span
                                className="material-symbols-outlined text-6xl text-primary drop-shadow-xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                location_on
                            </span>
                            <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                                <span className="material-symbols-outlined text-white text-xl">recycling</span>
                            </div>
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-white rounded-full p-0.5 shadow-sm">
                                <span className="material-symbols-outlined text-xs">star</span>
                            </div>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Vựa Minh Khôi (VIP)
                        </div>
                    </div>

                    {/* Pin - Thường 1 */}
                    <div className="pin absolute top-[25%] left-[30%] z-20 group">
                        <div className="relative">
                            <div className="pin-shadow"></div>
                            <span
                                className="material-symbols-outlined text-5xl text-primary drop-shadow-md"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                location_on
                            </span>
                            <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2">
                                <span className="material-symbols-outlined text-white text-lg">recycling</span>
                            </div>
                        </div>
                    </div>

                    {/* Pin - Warehouse 1 */}
                    <div className="pin absolute top-[60%] left-[70%] z-10 group">
                        <div className="relative">
                            <div className="pin-shadow"></div>
                            <span
                                className="material-symbols-outlined text-5xl text-slate-500 drop-shadow-md"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                location_on
                            </span>
                            <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2">
                                <span className="material-symbols-outlined text-white text-lg">warehouse</span>
                            </div>
                        </div>
                    </div>

                    {/* Pin - Warehouse 2 */}
                    <div className="pin absolute top-[35%] left-[80%] z-10 group">
                        <div className="relative">
                            <div className="pin-shadow"></div>
                            <span
                                className="material-symbols-outlined text-5xl text-slate-500 drop-shadow-md"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                location_on
                            </span>
                            <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2">
                                <span className="material-symbols-outlined text-white text-lg">warehouse</span>
                            </div>
                        </div>
                    </div>

                    {/* Pin - Warehouse 3 */}
                    <div className="pin absolute top-[75%] left-[20%] z-10 group">
                        <div className="relative">
                            <div className="pin-shadow"></div>
                            <span
                                className="material-symbols-outlined text-5xl text-slate-500 drop-shadow-md"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                location_on
                            </span>
                            <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2">
                                <span className="material-symbols-outlined text-white text-lg">warehouse</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popup Card - Vựa Minh Khôi */}
                <div className="absolute top-20 right-4 w-96 max-w-[calc(100vw-32px)] z-30">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="relative h-32 bg-gradient-to-r from-primary to-green-600">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent">
                                <h2 className="text-white font-bold text-xl truncate">Vựa Phế Liệu Minh Khôi</h2>
                                <p className="text-green-100 text-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">verified</span> Đối tác chiến lược
                                </p>
                            </div>
                            <button className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white p-1 rounded-full backdrop-blur-sm transition-colors">
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        {/* Card Body */}
                        <div className="p-5">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="bg-green-100 text-green-700 p-2 rounded-lg">
                                        <span className="material-symbols-outlined">description</span>
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase">Loại hàng</p>
                                        <p className="font-bold text-slate-900">Giấy Carton</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 font-semibold uppercase">Cách đây</p>
                                    <p className="font-bold text-slate-900 flex items-center justify-end gap-1">
                                        <span className="material-symbols-outlined text-base">near_me</span> 5.2 km
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 font-medium uppercase mb-1">Khối lượng</p>
                                    <p className="text-2xl font-extrabold text-slate-800">
                                        12.5 <span className="text-sm font-semibold text-slate-500">Tấn</span>
                                    </p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                                    <p className="text-xs text-green-700 font-medium uppercase mb-1">Điểm uy tín</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl font-extrabold text-green-700">98</span>
                                        <span className="text-xs font-bold text-green-600">/100</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-5">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-slate-400">location_on</span>
                                    <span>Khu Công Nghệ Cao, Quận 9, TP.HCM</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-slate-400">schedule</span>
                                    <span>Giờ mở cửa: 07:00 - 18:00</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-slate-400">local_shipping</span>
                                    <span>Xe tải trọng lớn có thể vào</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => navigate('/nha-may/doi-tac/1')}
                                    className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
                                >
                                    Chi tiết
                                </button>
                                <button
                                    onClick={() => navigate('/recycle/order-process')}
                                    className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>Chốt đơn / Đặt mua</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-6 left-6 z-20 hidden md:block">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-slate-200">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-primary block"></span> Vựa Premium
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full bg-slate-500 block"></span> Vựa Thường
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-accent">my_location</span> Vị trí của bạn
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Location Pulse */}
                <div className="absolute bottom-20 left-10 z-10 animate-pulse">
                    <div className="relative">
                        <div className="w-4 h-4 bg-accent rounded-full border-2 border-white shadow-lg"></div>
                        <div className="absolute -inset-4 bg-accent/30 rounded-full animate-ping"></div>
                    </div>
                </div>

            </main>
            )}
        </div>
    );
};

export default MapVip;
