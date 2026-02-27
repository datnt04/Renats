import React from 'react';
import { Link } from 'react-router-dom';

/* style block from original HTML – kept as-is */
const inlineStyle = `
  .sidebar-active {
    background-color: rgba(47, 127, 52, 0.1);
    color: #2f7f34;
    border-right: 3px solid #2f7f34;
  }
`;

const DashboardRecycle = () => {
    return (
        <div className="font-sans text-slate-900 bg-slate-50 overflow-x-hidden min-h-screen flex flex-col">
            <style>{inlineStyle}</style>

            {/* ── HEADER ── */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <img
                                alt="Re-Nats Logo"
                                className="w-auto h-12 object-contain"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK91fcaHmansgwcmixnPW2Kj6N96BE_TB3pFnlNc65ME78ARU4vT0E3i8Kg6UL1wU_n4_Jer0PoE7HlEYEUJK1ZPO35sLjnBf4WilVM4X6DdRfRJrMK2Jhdz9VEJChq0rMRTLR5lKyAy_zh0owPeKq2Z5cJ51_D_2Ti9RvtVlyuvFAgvgCW9gJ0gxogd3eKqpxFUbCIE5NBkhPl6yAB78IAUV21kEKZNKfRmUUv-2yBO5zvsteDFlVgfwFKyCe7u0Aj2jRGz1ZcZk"
                            />
                            <div className="hidden md:block h-6 w-px bg-slate-300"></div>
                            <span className="text-slate-500 font-medium text-sm hidden md:block">Factory Dashboard</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative hidden sm:block">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                                </span>
                                <input
                                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                                    placeholder="Search orders, trucks..."
                                    type="text"
                                />
                            </div>
                            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-700">Nguyễn Văn A</p>
                                    <p className="text-xs text-slate-500">Factory Manager</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                                    <img
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaOCJwjx5wu3GBVvPbHGqRWTMvqp2cVmKcT3ZJXTmEXviBbRz6psQfBkbZ9ADlhfUbC73qaF7xnmSpF-3MO2fvGDqzDurffZe_bE8je3JtW6kR2CsjeeNIytNJKPKzgd58IQYGRoEwxNLbUjuRpAL7l4bfdO0HZ81BzZh_NAnl8qo0xrVzU0JEAypiGXsnHkdrYJYEYi99QCQJ-P2Hrde_FzoqRQDpuZUep0kuuJy_IZ83Cjulj1wZi4Vq4VuVcRMF-EJsKfvz988"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN ── */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

                {/* Page title + controls */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                        <p className="text-slate-500 text-sm mt-1">Real-time insights for ReNats Factory #01</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium mr-2">
                            <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all focus:outline-none">Ngày</button>
                            <button className="px-4 py-1.5 rounded-md bg-white text-primary shadow-sm ring-1 ring-slate-200 focus:outline-none">Tuần</button>
                            <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all focus:outline-none">Tháng</button>
                        </div>
                        <span className="text-sm text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm flex items-center gap-2 h-10">
                            <span className="material-symbols-outlined text-base">calendar_today</span>
                            Today: Oct 24, 2023
                        </span>
                        <Link to="/recycle/market" className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors h-10">
                            <span className="material-symbols-outlined text-xl">add</span>
                            New Weigh-in
                        </Link>
                    </div>
                </div>

                {/* ── KPI Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute right-0 top-0 h-full w-1 bg-green-500"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-500 text-sm font-medium mb-1">Total Scrap Inbound</p>
                                <h3 className="text-3xl font-bold text-slate-800">1,248.5 <span className="text-lg text-slate-400 font-normal">tons</span></h3>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl">scale</span>
                            </div>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                +12.5%
                            </span>
                            <span className="text-slate-400 ml-2">vs last week</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-500 text-sm font-medium mb-1">Avg. Impurity Rate</p>
                                <h3 className="text-3xl font-bold text-slate-800">3.2 <span className="text-lg text-slate-400 font-normal">%</span></h3>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl">speed</span>
                            </div>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">remove</span>
                                -0.8%
                            </span>
                            <span className="text-slate-400 ml-2">improvement</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute right-0 top-0 h-full w-1 bg-orange-400"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-500 text-sm font-medium mb-1">In Transit</p>
                                <h3 className="text-3xl font-bold text-slate-800">8 <span className="text-lg text-slate-400 font-normal">trucks</span></h3>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl">local_shipping</span>
                            </div>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="text-slate-500">Est. arrival next 2h: <span className="font-bold text-slate-700">3</span></span>
                            <a className="ml-auto text-primary text-xs font-semibold hover:underline" href="#">View Map</a>
                        </div>
                    </div>
                </div>

                {/* ── Charts row ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Bar Chart */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Inbound Production Trends</h3>
                                <p className="text-sm text-slate-500">Daily weight vs. Quality checks</p>
                            </div>
                            <select className="text-sm border-slate-200 rounded-lg text-slate-600 focus:ring-primary focus:border-primary">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Quarter</option>
                            </select>
                        </div>
                        <div className="relative h-64 w-full flex items-end justify-between px-4 pb-8 border-b border-l border-slate-200 gap-2">
                            <div className="absolute -left-10 top-0 h-full flex flex-col justify-between text-xs text-slate-400">
                                <span>100t</span>
                                <span>75t</span>
                                <span>50t</span>
                                <span>25t</span>
                                <span>0t</span>
                            </div>
                            {/* Mon */}
                            <div className="flex flex-col items-center gap-2 flex-1 group">
                                <div className="relative w-full flex justify-center items-end h-64">
                                    <div className="absolute bottom-[40%] w-3 h-3 bg-white border-2 border-renats-blue rounded-full z-20"></div>
                                    <div className="w-full max-w-[40px] bg-green-50 rounded-t-sm h-[40%] group-hover:bg-green-100 transition-colors relative">
                                        <div className="absolute bottom-0 w-full bg-renats-green/20 h-full rounded-t-sm"></div>
                                        <div className="absolute bottom-0 w-full bg-renats-green h-[85%] rounded-t-sm"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">Mon</span>
                            </div>
                            {/* Tue */}
                            <div className="flex flex-col items-center gap-2 flex-1 group">
                                <div className="relative w-full flex justify-center items-end h-64">
                                    <div className="absolute bottom-[55%] w-3 h-3 bg-white border-2 border-renats-blue rounded-full z-20"></div>
                                    <div className="w-full max-w-[40px] bg-green-50 rounded-t-sm h-[60%] group-hover:bg-green-100 transition-colors relative">
                                        <div className="absolute bottom-0 w-full bg-renats-green h-[90%] rounded-t-sm"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">Tue</span>
                            </div>
                            {/* Wed */}
                            <div className="flex flex-col items-center gap-2 flex-1 group">
                                <div className="relative w-full flex justify-center items-end h-64">
                                    <div className="absolute bottom-[35%] w-3 h-3 bg-white border-2 border-renats-blue rounded-full z-20"></div>
                                    <div className="w-full max-w-[40px] bg-green-50 rounded-t-sm h-[45%] group-hover:bg-green-100 transition-colors relative">
                                        <div className="absolute bottom-0 w-full bg-renats-green h-[70%] rounded-t-sm"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">Wed</span>
                            </div>
                            {/* Thu */}
                            <div className="flex flex-col items-center gap-2 flex-1 group">
                                <div className="relative w-full flex justify-center items-end h-64">
                                    <div className="absolute bottom-[65%] w-3 h-3 bg-white border-2 border-renats-blue rounded-full z-20"></div>
                                    <div className="w-full max-w-[40px] bg-green-50 rounded-t-sm h-[75%] group-hover:bg-green-100 transition-colors relative">
                                        <div className="absolute bottom-0 w-full bg-renats-green h-[95%] rounded-t-sm"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">Thu</span>
                            </div>
                            {/* Fri */}
                            <div className="flex flex-col items-center gap-2 flex-1 group">
                                <div className="relative w-full flex justify-center items-end h-64">
                                    <div className="absolute bottom-[45%] w-3 h-3 bg-white border-2 border-renats-blue rounded-full z-20"></div>
                                    <div className="w-full max-w-[40px] bg-green-50 rounded-t-sm h-[50%] group-hover:bg-green-100 transition-colors relative">
                                        <div className="absolute bottom-0 w-full bg-renats-green h-[80%] rounded-t-sm"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">Fri</span>
                            </div>
                            {/* Sat */}
                            <div className="flex flex-col items-center gap-2 flex-1 group">
                                <div className="relative w-full flex justify-center items-end h-64">
                                    <div className="absolute bottom-[80%] w-3 h-3 bg-white border-2 border-renats-blue rounded-full z-20 shadow-sm"></div>
                                    <div className="w-full max-w-[40px] bg-green-50 rounded-t-sm h-[85%] group-hover:bg-green-100 transition-colors relative">
                                        <div className="absolute bottom-0 w-full bg-renats-green h-[100%] rounded-t-sm"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400 font-bold text-primary">Sat</span>
                            </div>
                            {/* Sun */}
                            <div className="flex flex-col items-center gap-2 flex-1 group">
                                <div className="relative w-full flex justify-center items-end h-64">
                                    <div className="absolute bottom-[30%] w-3 h-3 bg-white border-2 border-renats-blue rounded-full z-20"></div>
                                    <div className="w-full max-w-[40px] bg-green-50 rounded-t-sm h-[30%] group-hover:bg-green-100 transition-colors relative">
                                        <div className="absolute bottom-0 w-full bg-renats-green h-[60%] rounded-t-sm"></div>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">Sun</span>
                            </div>
                            {/* SVG trend line */}
                            <svg
                                className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-10"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M 30 160 L 100 110 L 170 170 L 240 80 L 310 140 L 380 40 L 450 180"
                                    fill="none"
                                    stroke="#0ea5e9"
                                    strokeWidth="2"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-renats-green rounded-sm"></span>
                                <span className="text-xs text-slate-500">Inbound Volume</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-renats-blue rounded-full border border-white shadow-sm"></span>
                                <span className="text-xs text-slate-500">Quality Index</span>
                            </div>
                        </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Material Analysis</h3>
                                <p className="text-sm text-slate-500">Distribution by Type</p>
                            </div>
                            <button className="text-slate-400 hover:text-primary">
                                <span className="material-symbols-outlined text-xl">more_vert</span>
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center py-4 relative">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#f1f5f9" strokeWidth="12"></circle>
                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#0ea5e9" strokeDasharray="113.1 251.2" strokeDashoffset="0" strokeWidth="12"></circle>
                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#2f7f34" strokeDasharray="62.8 251.2" strokeDashoffset="-113.1" strokeWidth="12"></circle>
                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#7dd3fc" strokeDasharray="50.2 251.2" strokeDashoffset="-175.9" strokeWidth="12"></circle>
                                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#86efac" strokeDasharray="25.1 251.2" strokeDashoffset="-226.1" strokeWidth="12"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-slate-800">100%</span>
                                    <span className="text-xs text-slate-400">Total Yield</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 mt-2">
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#0ea5e9]"></span>
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Metal Scrap</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-800">45%</span>
                                    <span className="text-xs text-slate-400">562t</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#2f7f34]"></span>
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Plastics</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-800">25%</span>
                                    <span className="text-xs text-slate-400">312t</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#7dd3fc]"></span>
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Paper/Card</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-800">20%</span>
                                    <span className="text-xs text-slate-400">250t</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#86efac]"></span>
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Others</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-800">10%</span>
                                    <span className="text-xs text-slate-400">124t</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Transactions Table ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
                            <a className="text-sm text-primary hover:underline font-medium" href="#">View All</a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-4 py-3 font-medium rounded-tl-lg">ID</th>
                                        <th className="px-4 py-3 font-medium">Supplier</th>
                                        <th className="px-4 py-3 font-medium">Material Type</th>
                                        <th className="px-4 py-3 font-medium">Weight</th>
                                        <th className="px-4 py-3 font-medium">Date</th>
                                        <th className="px-4 py-3 font-medium rounded-tr-lg text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-4 py-4 font-semibold text-slate-800">#TRX-9021</td>
                                        <td className="px-4 py-4 text-slate-600 font-medium">Vựa Minh Khôi</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#0ea5e9]"></span>
                                                <span className="text-slate-600">Copper Wire</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-700">2,450 kg</td>
                                        <td className="px-4 py-4 text-slate-500">Oct 24, 10:30 AM</td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-4 py-4 font-semibold text-slate-800">#TRX-9022</td>
                                        <td className="px-4 py-4 text-slate-600 font-medium">Kho Hùng Phát</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#7dd3fc]"></span>
                                                <span className="text-slate-600">Mixed Paper</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-700">850 kg</td>
                                        <td className="px-4 py-4 text-slate-500">Oct 24, 09:15 AM</td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-4 py-4 font-semibold text-slate-800">#TRX-9023</td>
                                        <td className="px-4 py-4 text-slate-600 font-medium">Vựa Tám Sang</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#0ea5e9]"></span>
                                                <span className="text-slate-600">Alu Cans</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-700">1,200 kg</td>
                                        <td className="px-4 py-4 text-slate-500">Oct 24, 08:45 AM</td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-4 py-4 font-semibold text-slate-800">#TRX-9024</td>
                                        <td className="px-4 py-4 text-slate-600 font-medium">Vựa Thanh Bình</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#0ea5e9]"></span>
                                                <span className="text-slate-600">Iron Scrap</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-700">5,000 kg</td>
                                        <td className="px-4 py-4 text-slate-500">Oct 23, 04:20 PM</td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">QC Check</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-4 py-4 font-semibold text-slate-800">#TRX-9025</td>
                                        <td className="px-4 py-4 text-slate-600 font-medium">Kho Chị Lan</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#2f7f34]"></span>
                                                <span className="text-slate-600">Plastic PET</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 font-medium text-slate-700">420 kg</td>
                                        <td className="px-4 py-4 text-slate-500">Oct 23, 02:10 PM</td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── Mini Stat Cards ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase">Daily Payout</p>
                            <p className="font-bold text-slate-800">45.2M VND</p>
                        </div>
                    </div>
                    <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase">Alerts</p>
                            <p className="font-bold text-slate-800">2 Issues</p>
                        </div>
                    </div>
                    <div className="bg-cyan-50/50 border border-cyan-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-cyan-100 p-2 rounded-lg text-cyan-600">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase">Active Staff</p>
                            <p className="font-bold text-slate-800">14 On-site</p>
                        </div>
                    </div>
                    <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase">Storage Cap</p>
                            <p className="font-bold text-slate-800">82% Full</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer className="bg-white border-t border-slate-200 mt-auto py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            alt="Re-Nats Logo"
                            className="h-8 w-auto grayscale opacity-70"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXIhI69kKcVzSx4WLQUG9YtaPnYIlbdXIthERtwNMXidJTiYa8xF4yeRTdqIoENupJ8d9cZZUvxzPgHGt49U3TRdSf4LKQuNBJdyR3vci0TVIy__VDghi7lDKk_zzXLesl5S6QINo0rNRAazA7wnxKiBLF9_jzuRdPR6ZPyDRjjnhRlNQCDxO67gNZ6cUoXZrm_PMcz5z8z_kL3-xgaqbfJsz4yoxF03L7i4qnz0gvFhGjxQlI3jsi-Q1gI6KtSaRzUHP-HrL899M"
                        />
                        <span className="text-slate-400 text-sm">© 2024 Re-Nats Platform.</span>
                    </div>
                    <div className="flex space-x-6 text-sm text-slate-500">
                        <a className="hover:text-primary" href="#">Support</a>
                        <a className="hover:text-primary" href="#">Privacy</a>
                        <a className="hover:text-primary" href="#">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DashboardRecycle;
