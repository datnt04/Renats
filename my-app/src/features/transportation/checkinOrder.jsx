import React from 'react';

const styles = `
  .hero-mesh-gradient {
    background-color: #f8fafc;
    background-image:
      radial-gradient(at 0% 0%, hsla(142, 46%, 34%, 0.15) 0px, transparent 50%),
      radial-gradient(at 100% 0%, hsla(199, 89%, 48%, 0.1) 0px, transparent 50%),
      radial-gradient(at 100% 100%, hsla(142, 46%, 34%, 0.05) 0px, transparent 50%),
      radial-gradient(at 0% 100%, hsla(199, 89%, 48%, 0.1) 0px, transparent 50%);
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

export default function CheckinOrder() {
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

            <div className="font-sans text-slate-900 bg-slate-50 min-h-screen hero-mesh-gradient flex items-center justify-center py-8">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100 flex flex-col h-[85vh] relative">

                    {/* Top bar */}
                    <div className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 sticky top-0 z-20 flex items-center justify-between">
                        <div className="flex items-center">
                            <button className="mr-3 p-1 rounded-full hover:bg-slate-50 text-slate-500">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <h1 className="text-lg font-bold text-slate-800">Check-in tại Vựa</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">EPR</span>
                            <span className="material-symbols-outlined text-slate-400">help</span>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">

                        {/* Progress bar */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex space-x-1 w-full mr-4">
                                <div className="h-1.5 flex-1 bg-primary rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Bước 1/3</span>
                        </div>

                        {/* Pickup info card */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Điểm nhận hàng</p>
                                    <h2 className="text-lg font-bold text-slate-900">Vựa Phế Liệu Thành Đạt</h2>
                                    <div className="flex items-center mt-1 text-slate-600 text-sm">
                                        <span className="material-symbols-outlined text-[16px] mr-1 text-slate-400">location_on</span>
                                        <span>123 QL1A, Bình Hưng Hòa, Bình Tân</span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                                    T
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                                <div className="flex items-center">
                                    <img
                                        alt="Owner"
                                        className="h-8 w-8 rounded-full mr-3"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFSj62msgM46kwAIC8ikXNwATPk9x2MefgZuAHEsBot2ob-mVU1tBRsz9fSwXHoDzcqqRXpTAaCHkua7sV6G5kgaq3_2wtDmFM7pIWkZhTVK2HMqeMCPR_glmEKAMw_v221ZFWEnpVTIpVZ2EupKWfjGtOOqE4SoFS6aZ4sbSb-518UtFvUsVAXKd3Z4qTXC3Iljzc8QxyVSgY6PNAl6krV0eUXDlb45BuwhPHY31n5i5M9g6sMdKpOD1WvpV_C1q8NMF8FeAdChg"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Anh Nguyễn Văn A</p>
                                        <p className="text-xs text-slate-500">Chủ vựa</p>
                                    </div>
                                </div>
                                <a
                                    className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors"
                                    href="tel:0901234567"
                                >
                                    <span className="material-symbols-outlined text-[18px] mr-1.5">call</span>
                                    Gọi ngay
                                </a>
                            </div>
                        </div>

                        {/* EPR evidence section */}
                        <div>
                            <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                                <span className="material-symbols-outlined text-orange-500 mr-2">warning</span>
                                Bằng chứng EPR (Bắt buộc)
                            </h3>
                            <div className="space-y-4">
                                {/* Upload 1 */}
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden">
                                    <input accept="image/*" className="absolute inset-0 opacity-0 z-10 cursor-pointer" type="file" />
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <div className="h-14 w-14 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl text-slate-400">add_a_photo</span>
                                        </div>
                                        <h4 className="font-semibold text-slate-700">Chụp ảnh thùng xe trống</h4>
                                        <p className="text-xs text-slate-500 mt-1 text-center px-4">
                                            Đảm bảo thùng xe sạch sẽ và không có hàng tồn đọng
                                        </p>
                                    </div>
                                </div>

                                {/* Upload 2 */}
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer group relative overflow-hidden">
                                    <input accept="image/*" className="absolute inset-0 opacity-0 z-10 cursor-pointer" type="file" />
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <div className="h-14 w-14 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl text-slate-400">receipt_long</span>
                                        </div>
                                        <h4 className="font-semibold text-slate-700 text-center">
                                            Chụp ảnh sau khi lên hàng <br />&amp; Phiếu cân
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1 text-center px-4">
                                            Chụp rõ biển số xe và khối lượng trên phiếu cân
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info note */}
                        <div className="bg-blue-50 p-3 rounded-lg flex items-start">
                            <span className="material-symbols-outlined text-blue-600 mr-2 text-lg mt-0.5">info</span>
                            <p className="text-xs text-blue-800 leading-relaxed">
                                Theo quy định EPR mới, tài xế cần cung cấp hình ảnh minh bạch tại điểm thu gom để đảm bảo truy xuất
                                nguồn gốc phế liệu.
                            </p>
                        </div>

                        {/* Submit button */}
                        <div className="pt-2">
                            <button
                                className="w-full py-3.5 px-4 rounded-xl bg-slate-200 text-slate-400 font-bold text-base flex items-center justify-center cursor-not-allowed shadow-none transition-all"
                                disabled
                            >
                                <span>Bắt đầu xuất phát</span>
                                <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
                            </button>
                            <p className="text-xs text-center text-slate-400 mt-3">Hoàn thành chụp ảnh để tiếp tục</p>
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="bg-white border-t border-slate-100 px-6 py-2 pb-5 absolute bottom-0 w-full z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-end">
                            <button className="flex flex-col items-center gap-1 group w-14">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-2xl transition-colors">home</span>
                                <span className="text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors">Trang chủ</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 group w-14">
                                <span className="material-symbols-outlined text-primary text-2xl transition-colors fill-1">local_shipping</span>
                                <span className="text-[10px] font-medium text-primary transition-colors">Chuyến đi</span>
                            </button>
                            <div className="relative -top-6">
                                <button className="h-14 w-14 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center text-white hover:scale-105 transition-transform border-4 border-slate-50">
                                    <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                                </button>
                            </div>
                            <button className="flex flex-col items-center gap-1 group w-14">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-2xl transition-colors">history</span>
                                <span className="text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors">Lịch sử</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 group w-14">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary text-2xl transition-colors">person</span>
                                <span className="text-[10px] font-medium text-slate-400 group-hover:text-primary transition-colors">Tài khoản</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
