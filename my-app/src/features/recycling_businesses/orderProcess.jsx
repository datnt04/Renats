import React from 'react';
import { Link } from 'react-router-dom';

const OrderProcess = () => {
    return (
        <div className="font-sans text-slate-900 h-screen overflow-hidden flex flex-col bg-slate-100">
            {/* ── HEADER ── */}
            <header className="bg-white border-b border-slate-200 shadow-sm z-30 flex-shrink-0">
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-4">
                            <Link to="/recycle/dashboard">
                                <img alt="Re-Nats Logo" className="w-auto h-16"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVfwIeyETzS3y9jz_CGlkAZjr_w_GZaf3dhCvEXAlLbCf0NGpn8Q1n2yT97d058zUoZ7ontjnQDuzUb9ABmQuqcjfoFj20p_at8M0uqL1f81yzXG6F4T1y24keqsxNEvE8NkXJ5rlvyM_6ZIUu6ZtyCzWDpHzl4fiSw-VNvQPe3kzYex2AHwCODSYtVhySnLbX98CUpDUNSR66utcyHtBe5wse08ZPHFx9ErX0aP1lF0sRl4-B5D56hVZ9DdT7Ksa_aUVaZvFggbA" />
                            </Link>
                            <div className="hidden md:block">
                                <h1 className="text-2xl font-extrabold text-slate-800 uppercase tracking-tight">KCS STATION <span
                                    className="text-primary">#04</span></h1>
                                <p className="text-sm text-slate-500 font-medium">Khu vực: Cổng Nam - Nhà máy A</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-right hidden sm:block">
                                <div className="text-2xl font-bold text-slate-900">09:42 AM</div>
                                <div className="text-sm font-semibold text-slate-500">24/05/2024</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="font-bold text-green-700 text-lg">ONLINE</span>
                            </div>
                            <div className="bg-slate-100 p-2 rounded-full">
                                <span className="material-symbols-outlined text-slate-600 text-3xl">account_circle</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 flex overflow-hidden">
                {/* SIDEBAR: Queued Trucks */}
                <aside className="w-80 bg-white border-r border-slate-200 flex flex-col z-20 shadow-lg">
                    <div className="p-5 border-b border-slate-200 bg-slate-50">
                        <h2 className="text-xl font-black text-slate-800 flex items-center">
                            <span className="material-symbols-outlined mr-2 text-primary text-3xl">local_shipping</span>
                            Hàng Chờ (5)
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-5 sidebar-active cursor-pointer transition-colors hover:bg-green-50">
                            <div className="flex justify-between items-start mb-1">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">ĐANG XỬ LÝ</span>
                                <span className="text-slate-500 font-bold text-sm">#TRK-8821</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1">29H-123.45</h3>
                            <p className="text-slate-600 font-semibold">Tài xế: Nguyễn Văn A</p>
                            <p className="text-sm text-slate-500 mt-2">Loại: Giấy Carton ép khối</p>
                        </div>
                        <div className="p-5 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">CHỜ CÂN</span>
                                <span className="text-slate-400 font-bold text-sm">#TRK-8822</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-1">51C-998.12</h3>
                            <p className="text-slate-500 font-medium">Tài xế: Trần Văn B</p>
                            <p className="text-sm text-slate-400 mt-1">Loại: Sắt phế liệu</p>
                        </div>
                        <div className="p-5 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">CHỜ CÂN</span>
                                <span className="text-slate-400 font-bold text-sm">#TRK-8823</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-1">60C-456.78</h3>
                            <p className="text-slate-500 font-medium">Tài xế: Lê Văn C</p>
                            <p className="text-sm text-slate-400 mt-1">Loại: Nhựa HDPE</p>
                        </div>
                        <div className="p-5 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded">CHỜ CÂN</span>
                                <span className="text-slate-400 font-bold text-sm">#TRK-8824</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-1">93C-112.23</h3>
                            <p className="text-slate-500 font-medium">Tài xế: Phạm Văn D</p>
                            <p className="text-sm text-slate-400 mt-1">Loại: Nhôm lon</p>
                        </div>
                    </div>
                </aside>

                {/* MAIN SECTION: Inspection Station */}
                <section className="flex-1 bg-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col overflow-y-auto">
                    {/* Active Truck Banner */}
                    <div className="bg-white rounded-xl p-6 shadow-sm mb-6 flex items-center justify-between border-l-8 border-primary">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900">XE: 29H-123.45</h2>
                            <div className="flex items-center space-x-4 mt-1">
                                <span className="text-lg font-bold text-slate-500">Carton ép kiện</span>
                                <span className="h-1 w-1 bg-slate-400 rounded-full"></span>
                                <span className="text-lg font-bold text-slate-500">NCC: Công ty Môi Trường Xanh</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                                <span className="material-symbols-outlined mr-2">photo_camera</span>
                                <span className="font-bold">Đã chụp 3 ảnh</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                        {/* INPUTS COLUMN */}
                        <div className="space-y-8">
                            {/* Declared Weight */}
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <label className="block text-lg font-bold text-slate-500 mb-2 uppercase tracking-wide">Trọng lượng khai báo (NCC)</label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-slate-100 text-slate-500 border-2 border-slate-300 rounded-xl input-massive focus:ring-0 cursor-not-allowed pr-20"
                                        readonly="" type="text" value="15,400" />
                                    <span
                                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-slate-400 pointer-events-none">KG</span>
                                </div>
                            </div>
                            {/* Measured Weight */}
                            <div className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-blue-500 ring-1 ring-slate-200">
                                <label className="block text-xl font-extrabold text-blue-800 mb-2 uppercase tracking-wide flex items-center">
                                    <span className="material-symbols-outlined mr-2 text-3xl">scale</span>
                                    Trọng lượng thực tế (Cân)
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-white text-slate-900 border-4 border-blue-500 rounded-xl input-massive focus:ring-4 focus:ring-blue-200 focus:border-blue-600 outline-none pr-20"
                                        placeholder="0" type="number" defaultValue="15250" />
                                    <span
                                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-slate-400 pointer-events-none">KG</span>
                                </div>
                                <div className="flex justify-end mt-2 space-x-2">
                                    <button
                                        className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg text-lg touch-target flex items-center">
                                        <span className="material-symbols-outlined mr-1">sync</span> Đọc từ cân
                                    </button>
                                </div>
                            </div>
                            {/* Impurities / Tare */}
                            <div className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-warning ring-1 ring-slate-200">
                                <label className="block text-xl font-extrabold text-orange-800 mb-2 uppercase tracking-wide flex items-center">
                                    <span className="material-symbols-outlined mr-2 text-3xl">delete_outline</span>
                                    Trọng lượng tạp chất / Bì
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full bg-white text-slate-900 border-4 border-warning rounded-xl input-massive focus:ring-4 focus:ring-orange-200 focus:border-orange-600 outline-none pr-20"
                                        placeholder="0" type="number" defaultValue="1220" />
                                    <span
                                        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-slate-400 pointer-events-none">KG</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-3">
                                    <button
                                        className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xl">+10</button>
                                    <button
                                        className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xl">+50</button>
                                    <button
                                        className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xl">+100</button>
                                </div>
                            </div>
                        </div>

                        {/* RESULTS & SUBMIT COLUMN */}
                        <div className="flex flex-col space-y-6">
                            <div
                                className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col justify-center items-center text-center flex-grow">
                                <h3 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-2">Kết quả KCS</h3>
                                <div
                                    className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-800 rounded-full border border-green-200 mb-6">
                                    <span className="material-symbols-outlined mr-1 text-sm">payments</span>
                                    <span className="text-sm font-bold">Đơn giá chốt: 14,500 VNĐ/kg</span>
                                </div>
                                <div className="mb-6">
                                    <span className="text-8xl font-black text-danger tracking-tighter">8.0%</span>
                                    <div className="text-xl font-bold text-danger mt-2 flex items-center justify-center">
                                        <span className="material-symbols-outlined mr-2 text-3xl">warning</span>
                                        Tỷ lệ tạp chất cao (&gt;5%)
                                    </div>
                                </div>
                                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-8">
                                    <div className="h-full bg-danger w-[80%] rounded-full"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full text-left bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <div>
                                        <div className="text-sm text-slate-500 font-bold uppercase">Trọng lượng sạch</div>
                                        <div className="text-3xl font-black text-slate-800">14,030 <span
                                            className="text-lg text-slate-400 font-medium">KG</span></div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 font-bold uppercase">Trừ tiền tạp chất</div>
                                        <div className="text-3xl font-black text-danger">- 2.44M <span
                                            className="text-lg text-slate-400 font-medium">VNĐ</span></div>
                                    </div>
                                </div>
                            </div>
                            <Link
                                to="/recycle/order-confirm"
                                className="w-full bg-primary hover:bg-secondary text-white text-3xl font-black py-8 rounded-2xl shadow-xl shadow-green-200 transform active:scale-95 transition-all flex items-center justify-center border-b-8 border-green-800">
                                <span className="material-symbols-outlined text-5xl mr-4">check_circle</span>
                                XÁC NHẬN &amp; HOÀN TẤT
                            </Link>
                            <button
                                className="w-full bg-white border-4 border-slate-200 hover:bg-slate-50 text-slate-600 text-xl font-bold py-4 rounded-xl shadow-sm transition-all flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl mr-2">report_problem</span>
                                Báo cáo sự cố / Từ chối xe
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default OrderProcess;
