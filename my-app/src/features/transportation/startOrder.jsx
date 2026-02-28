import React from 'react';

const styles = `
  .mobile-container {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #f1f5f9;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    position: relative;
  }

  .card-shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .active-border {
    border-left: 6px solid #2f7f34;
  }

  .trip-line {
    position: absolute;
    left: 24px;
    top: 24px;
    bottom: 0;
    width: 2px;
    background-color: #e2e8f0;
    z-index: 0;
  }

  .glass-header {
    background: rgba(47, 127, 52, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  .text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .text-shadow-md {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .qr-btn-container {
    position: relative;
    top: -24px;
  }

  .qr-btn {
    background: linear-gradient(135deg, #2f7f34 0%, #1e4d20 100%);
    box-shadow: 0 4px 12px rgba(47, 127, 52, 0.4);
  }
`;

export default function StartOrder() {
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

            <div className="font-sans text-slate-900 bg-slate-200 min-h-screen flex justify-center items-start py-8">
                <div className="mobile-container w-full bg-slate-50 overflow-hidden flex flex-col">
                    {/* Header */}
                    <header className="glass-header text-white p-6 pb-6 sticky top-0 z-40 shadow-lg">
                        <div className="flex justify-between items-center mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-sm">
                                    <img
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCphibhLLieQqFnkOI-mFwzVQiIZdpjdhghOP7flgjx_fcbObKrw29YolHLM2IoKCvetO9Rf0EXTTGSmJMMS_uR5qhMmoowWUZGf2aENAlWXxvtGoHZs22w5iqkDzaduqwe4_M5iApxzUxMrPt_do-eY4xGML6nJcHlcGflSx5cUczRnqUJCRaDm0bcJOZhZWoc-4ovxJYrfCPq1j-ZrA8j-EPUU0rs1SmeIxzxlHWmFjChKDZmhFnwN6e25DS8Q4EyBXSwZun6p0k"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-green-50 font-medium text-shadow-sm">Xin chào,</p>
                                    <h2 className="font-bold text-lg leading-tight text-shadow-md">Tài xế Nguyễn Văn A</h2>
                                </div>
                            </div>
                            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                                <span className="material-symbols-outlined text-shadow-sm">notifications</span>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white shadow-sm"></span>
                            </button>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-shadow-md">Lịch trình hôm nay</h1>
                                <p className="text-green-50 text-sm mt-1 text-shadow-sm opacity-90">Thứ Ba, 24/10/2023</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-3xl font-bold text-shadow-md">3</span>
                                <span className="text-xs text-green-50 uppercase font-semibold text-shadow-sm opacity-90">Chuyến</span>
                            </div>
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="flex-1 p-4 pb-32 space-y-5 relative z-10 -mt-2">
                        {/* Trip 1 – Active */}
                        <div className="bg-white rounded-xl card-shadow overflow-hidden active-border transform transition-all hover:scale-[1.01]">
                            <div className="bg-green-50 px-5 py-3 border-b border-green-100 flex justify-between items-center">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                                    Đang thực hiện
                                </span>
                                <span className="text-sm font-bold text-slate-700">#TRIP-8392</span>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                                            <span className="material-symbols-outlined text-2xl">schedule</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-500">08:30</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">Kho Phế Liệu An Khang</h3>
                                        <p className="text-slate-500 text-sm flex items-start gap-1 leading-relaxed">
                                            <span className="material-symbols-outlined text-base mt-0.5 flex-shrink-0">location_on</span>
                                            123 Đường Số 7, KCN Tân Tạo, Q. Bình Tân, TP.HCM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-slate-600">local_shipping</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase">Phương tiện yêu cầu</p>
                                        <p className="text-sm font-bold text-slate-800">Xe tải 2.5 Tấn (Thùng kín)</p>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-slate-300/50 flex items-center justify-center gap-2 transition-all active:scale-95 text-lg">
                                        <span className="material-symbols-outlined">play_circle</span>
                                        Bắt đầu chuyến
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Trip 2 – Upcoming */}
                        <div className="bg-white rounded-xl card-shadow overflow-hidden opacity-90">
                            <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                                    Sắp tới
                                </span>
                                <span className="text-sm font-bold text-slate-400">#TRIP-8393</span>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-1">
                                            <span className="material-symbols-outlined text-xl">schedule</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">10:45</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-bold text-slate-800 mb-1">Vựa Ve Chai Thành Đạt</h3>
                                        <p className="text-slate-500 text-sm flex items-start gap-1 leading-relaxed mb-3">
                                            <span className="material-symbols-outlined text-base mt-0.5 flex-shrink-0">location_on</span>
                                            456 QL1A, P. Linh Trung, TP. Thủ Đức
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                                            Xe bán tải
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trip 3 – Upcoming */}
                        <div className="bg-white rounded-xl card-shadow overflow-hidden opacity-75">
                            <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                                    Sắp tới
                                </span>
                                <span className="text-sm font-bold text-slate-400">#TRIP-8394</span>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-1">
                                            <span className="material-symbols-outlined text-xl">schedule</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">14:00</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-bold text-slate-800 mb-1">Nhà Máy Giấy Sài Gòn</h3>
                                        <p className="text-slate-500 text-sm flex items-start gap-1 leading-relaxed mb-3">
                                            <span className="material-symbols-outlined text-base mt-0.5 flex-shrink-0">location_on</span>
                                            KCN Mỹ Xuân A, Tân Thành, BR-VT
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                                            Xe tải 5 Tấn
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Bottom Navigation */}
                    <nav className="bg-white border-t border-slate-200 sticky bottom-0 z-50 pb-safe">
                        <div className="flex justify-between items-end h-[72px] px-2 relative">
                            <a className="flex flex-col items-center justify-center w-full h-16 pb-1 text-slate-400 hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-2xl mb-0.5">home</span>
                                <span className="text-[10px] font-medium">Trang chủ</span>
                            </a>
                            <a className="flex flex-col items-center justify-center w-full h-16 pb-1 text-primary" href="#">
                                <span className="material-symbols-outlined text-2xl mb-0.5 fill-current">local_shipping</span>
                                <span className="text-[10px] font-bold">Chuyến đi</span>
                            </a>
                            <div className="w-full flex justify-center h-full relative z-10">
                                <a className="qr-btn-container flex flex-col items-center justify-center w-full" href="#">
                                    <div className="qr-btn w-14 h-14 rounded-full flex items-center justify-center text-white transform transition-transform active:scale-95 border-4 border-slate-50">
                                        <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-500 mt-1">QR Code</span>
                                </a>
                            </div>
                            <a className="flex flex-col items-center justify-center w-full h-16 pb-1 text-slate-400 hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-2xl mb-0.5">history</span>
                                <span className="text-[10px] font-medium">Lịch sử</span>
                            </a>
                            <a className="flex flex-col items-center justify-center w-full h-16 pb-1 text-slate-400 hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-2xl mb-0.5">person</span>
                                <span className="text-[10px] font-medium">Tài khoản</span>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
