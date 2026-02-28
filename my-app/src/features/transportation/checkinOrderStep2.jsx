import React from 'react';

const styles = `
  .driver-card {
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .map-btn {
    background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
    border: 2px solid #e5e7eb;
    transition: all 0.2s;
  }

  .map-btn:active {
    transform: scale(0.98);
    background: #e5e7eb;
  }

  .arrive-btn {
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
    transition: all 0.2s;
  }

  .arrive-btn:active {
    transform: scale(0.98);
    box-shadow: 0 5px 10px -3px rgba(37, 99, 235, 0.3);
  }

  .status-badge {
    background-color: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
  }

  .glass-header {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .nav-item-active {
    color: #2f7f34;
  }

  .nav-item {
    color: #64748b;
    transition: color 0.2s;
  }

  .qr-btn {
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export default function CheckinOrderStep2() {
    return (
        <>
            <style>{styles}</style>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />

            <div className="font-sans text-slate-900 min-h-screen flex flex-col items-center bg-[#f0f2f5] pt-20 pb-20">

                {/* Fixed Header */}
                <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 py-3">
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-lg font-bold text-slate-800">Đơn hàng #DH-8829</h1>
                            <span className="text-sm font-semibold text-primary bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                Bước 2/3
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-primary h-2 rounded-full w-2/3 transition-all duration-500"></div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="w-full max-w-md mx-auto flex flex-col h-full justify-between p-4 flex-grow">

                    {/* Status row */}
                    <div className="flex items-center justify-between mb-6 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400">signal_cellular_alt</span>
                            <span className="text-xs font-semibold text-slate-500">GPS Tốt</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-semibold text-primary">Trực tuyến</span>
                        </div>
                    </div>

                    {/* Hero section */}
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4 ring-4 ring-blue-50/50">
                            <span className="material-symbols-outlined text-4xl text-blue-600">local_shipping</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">Đang di chuyển</h1>
                        <p className="text-slate-500 text-lg">Đến điểm giao hàng</p>
                    </div>

                    {/* Destination card */}
                    <div className="driver-card p-6 mb-6 w-full">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="mt-1">
                                <span className="material-symbols-outlined text-red-500 text-3xl">location_on</span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Điểm đến</p>
                                <h2 className="text-xl font-bold text-slate-900 leading-tight mt-1">
                                    Nhà máy Tái chế ReNats Long An
                                </h2>
                                <p className="text-slate-600 mt-2 text-base">Lô B4, KCN Xuyên Á, Đức Hòa, Long An</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                            <div>
                                <p className="text-xs text-slate-400">Khoảng cách</p>
                                <p className="text-lg font-bold text-slate-800">12.5 km</p>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div>
                                <p className="text-xs text-slate-400">Dự kiến</p>
                                <p className="text-lg font-bold text-slate-800">25 phút</p>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-4 w-full mt-auto mb-6">
                        <a
                            className="map-btn group relative flex items-center justify-center gap-3 w-full py-5 rounded-xl text-slate-700 font-bold text-lg"
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                alt="Google Maps"
                                className="w-8 h-8 object-contain"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXlq2C2V4UAzDTd2nFSUUCucSFGfktev1Au2X3qyvZuhZFcq8vA3kFysSngsbUT695vXrKtdmLacrDEYLg34e3R4oYU73w5dm1KfzlB4XOCHJpXgc9GNf-_7vgqAGj6Ke9Id3hC9g4kFqg_8xsRfTIndHde7YdBXjNxaRWHYUU7zmKAJdMudqEsWK2wg21QibxZ_mJWhenma8Mb-idUmxbfjyQaYGdU34OxKjelShUsf7XQTIotGe-ZaebfI76UXJ4BJTzC8_Ub54"
                            />
                            <span>Mở bản đồ dẫn đường</span>
                            <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </a>

                        <button
                            className="arrive-btn relative w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-6 rounded-xl flex items-center justify-center gap-3"
                            onClick={() => alert('Đã ghi nhận vị trí GPS!')}
                        >
                            <span className="material-symbols-outlined text-3xl">where_to_vote</span>
                            Đã đến Nhà máy
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full animate-pulse"></span>
                        </button>

                        <p className="text-center text-slate-400 text-sm mt-2">
                            Nhấn "Đã đến" khi xe dừng tại cổng bảo vệ
                        </p>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 pb-safe z-50">
                    <div className="max-w-md mx-auto flex justify-between items-end relative">
                        <button className="nav-item flex flex-col items-center gap-1 p-2 w-16">
                            <span className="material-symbols-outlined text-2xl">home</span>
                            <span className="text-[10px] font-medium">Trang chủ</span>
                        </button>
                        <button className="nav-item nav-item-active flex flex-col items-center gap-1 p-2 w-16">
                            <span className="material-symbols-outlined text-2xl font-semibold">local_shipping</span>
                            <span className="text-[10px] font-medium">Chuyến đi</span>
                        </button>
                        <div className="relative -top-6">
                            <button className="qr-btn bg-primary text-white h-14 w-14 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                                <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                            </button>
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-500 whitespace-nowrap">
                                QR Code
                            </span>
                        </div>
                        <button className="nav-item flex flex-col items-center gap-1 p-2 w-16">
                            <span className="material-symbols-outlined text-2xl">history</span>
                            <span className="text-[10px] font-medium">Lịch sử</span>
                        </button>
                        <button className="nav-item flex flex-col items-center gap-1 p-2 w-16">
                            <span className="material-symbols-outlined text-2xl">person</span>
                            <span className="text-[10px] font-medium">Tài khoản</span>
                        </button>
                    </div>
                </nav>

            </div>
        </>
    );
}
