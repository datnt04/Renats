import React from 'react';

const MapVip = () => {
    return (
        <div className="font-sans text-slate-900 overflow-hidden bg-slate-50">
            <style>{`
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .map-container {
          background-color: #e5e7eb;
          background-size: cover;
          background-position: center;
          position: relative;
          height: calc(100vh - 80px);
          width: 100%;
          overflow: hidden;
        }

        .map-overlay {
          background: rgba(226, 232, 240, 0.4);
          position: absolute;
          inset: 0;
        }

        .map-pattern {
          background-color: #eef2f6;
          background-image: linear-gradient(#e2e8f0 2px, transparent 2px),
            linear-gradient(90deg, #e2e8f0 2px, transparent 2px);
          background-size: 100px 100px;
        }

        .pin {
          position: absolute;
          transform: translate(-50%, -100%);
          cursor: pointer;
          transition: all 0.2s ease-out;
        }

        .pin:hover {
          transform: translate(-50%, -110%) scale(1.1);
          z-index: 40;
        }

        .pin-shadow {
          width: 20px;
          height: 6px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          filter: blur(2px);
        }
      `}</style>

            {/* Header */}
            <header className="sticky-header h-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div className="flex-shrink-0">
                            <img
                                alt="Re-Nats Logo"
                                className="w-auto h-16"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3gKW9baWRyRxkJV31x5a-0U1sa7PGamZYDR1jsTogNaAy5vqcAdEicqsbmHHL5pS1iZotZGWRWdEujhed7u1bNsLSwaISs4E8U-ItVKt3SDI36p7jhJh8TB_3UEB8kfQDhgxnFNcAvshouOxS0Ee76qbk1Vr_Fkb998yVyNQPEeJhZWgyo7aTfVp2lCCfuhWdr8VCSmpE5mUz8lpwy1lmj82t9fffrwkwRfCTa8NQCY9njI9gaFLeAgxulAkWsldCaYyjtuXRmDw"
                            />
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a className="text-sm font-semibold text-primary transition-colors border-b-2 border-primary pb-1" href="#">
                                Chợ Nguyên Liệu
                            </a>
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">
                                Danh Sách Vựa
                            </a>
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">
                                Báo Giá
                            </a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-slate-500 hover:text-primary relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                    NT
                                </div>
                                <span className="text-sm font-semibold text-slate-700 hidden sm:block">Nhà máy Tái Chế A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main */}
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
                            <button className="px-3 py-1.5 text-slate-500 hover:text-slate-800 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-lg">grid_view</span> List
                            </button>
                            <button className="px-3 py-1.5 bg-white text-slate-800 rounded-md shadow-sm text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">map</span> Map
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
                                <button className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                                    Chi tiết
                                </button>
                                <button className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
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
        </div>
    );
};

export default MapVip;
