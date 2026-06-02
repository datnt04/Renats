import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AvatarDropdown } from '../../components/seller/AvatarDropdown';
import { depotService } from '../../services/depotService';

// ── Brand color ──────────────────────────────────────────────────────────
const PRIMARY = '#16a34a'; // xanh lá

// ── Status badges ─────────────────────────────────────────────────────────
const STATUS_IN = {
    PENDING: { label: 'CHỜ DUYỆT', cls: 'bg-amber-100 text-amber-700' },
    SCHEDULED: { label: 'ĐÃ LÊN LỊCH', cls: 'bg-blue-100 text-blue-700' },
    WEIGHED: { label: 'ĐÃ CÂN', cls: 'bg-purple-100 text-purple-700' },
    DONE: { label: 'HOÀN TẤT', cls: 'bg-emerald-100 text-emerald-700' },
    CANCELLED: { label: 'ĐÃ HỦY', cls: 'bg-rose-100 text-rose-600' },
};

const STATUS_OUT = {
    DRAFT: { label: 'BẢN NHÁP', cls: 'bg-slate-100 text-slate-700' },
    LISTED: { label: 'ĐÃ ĐĂNG', cls: 'bg-blue-100 text-blue-700' },
    BIDDING: { label: 'ĐANG ĐẤU GIÁ', cls: 'bg-purple-100 text-purple-700' },
    ACCEPTED: { label: 'ĐÃ CHẤP NHẬN', cls: 'bg-indigo-100 text-indigo-700' },
    READY_FOR_PICKUP: { label: 'CHỜ VẬN CHUYỂN', cls: 'bg-amber-100 text-amber-700' },
    IN_PROGRESS: { label: 'ĐANG VẬN CHUYỂN', cls: 'bg-amber-100 text-amber-700' },
    DELIVERED: { label: 'ĐÃ GIAO HÀNG', cls: 'bg-emerald-100 text-emerald-700' },
    VERIFIED: { label: 'ĐÃ XÁC MINH', cls: 'bg-emerald-100 text-emerald-700' },
    REJECTED: { label: 'BỊ TỪ CHỐI', cls: 'bg-rose-100 text-rose-600' },
    CANCELLED: { label: 'ĐÃ HỦY', cls: 'bg-rose-100 text-rose-600' },
};

const MATERIAL_LABELS = {
    IRON: "Sắt vụn",
    STEEL: "Thép phế liệu",
    COPPER: "Đồng cáp",
    ALUMINUM: "Nhôm phế liệu",
    PAPER: "Giấy Carton",
    CARDBOARD: "Giấy Carton",
    PET: "Nhựa cứng (PP/PE)",
    HDPE: "Nhựa cứng (PP/PE)",
    PVC: "Nhựa cứng (PP/PE)",
    ELECTRONIC_WASTE: "Pin / Acquy cũ",
    OTHER: "Khác"
};

const vnd = n => n.toLocaleString('vi-VN') + ' ₫';

// ── SVG icons ─────────────────────────────────────────────────────────────
function IcoDashboard() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>; }
function IcoInbox() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" /></svg>; }
function IcoBox() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>; }
function IcoClipboard() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>; }
function IcoTruck() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>; }
function IcoDoc() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>; }
function IcoHistory() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; }
function IcoChart() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>; }
function IcoBell() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>; }
function IcoSearch() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" /></svg>; }
function IcoCheck() { return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>; }
function IcoPhone() { return <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0-1.006.81-1.826 1.818-1.826h.75c.56 0 1.05.328 1.281.832l1.154 2.565a1.458 1.458 0 01-.326 1.647L5.675 10.6a.75.75 0 00-.162.787 11.245 11.245 0 005.1 5.1.75.75 0 00.787-.163l1.044-1.253a1.457 1.457 0 011.647-.325l2.565 1.154c.504.23.832.72.832 1.28v.75c0 1.008-.82 1.819-1.826 1.819-8.4 0-15.206-6.807-15.206-15.206z" /></svg>; }
function IcoUser() { return <svg style={{ width: '1.1rem', height: '1.1rem' }} fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>; }
function IcoRight() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>; }
function IcoTrendUp() { return <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>; }
function IcoTrendDown() { return <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l-5.94 2.28m5.94-2.28l-2.28-5.941" /></svg>; }

// ─────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, newRequestsCount }) => {
    const NAV_GROUPS = [
        {
            label: 'TỔNG QUAN',
            items: [
                { key: 'overview', label: 'Tổng quan', icon: IcoDashboard },
                { key: 'new', label: 'Đơn mới', icon: IcoInbox, badge: newRequestsCount },
                { key: 'inventory', label: 'Tồn kho', icon: IcoBox },
                { key: 'profile', label: 'Hồ sơ kho', icon: IcoUser },
            ],
        },
        {
            label: 'NGHIỆP VỤ',
            items: [
                { key: 'pickup', label: 'Phiếu thu gom', icon: IcoClipboard },
                { key: 'batchManage', label: 'Quản lý lô xuất', icon: IcoBox },
                { key: 'batch', label: 'Tạo lô xuất', icon: IcoTruck, isLink: '/kho/tao-lo' },
                { key: 'invoice', label: 'Hóa đơn', icon: IcoDoc },
            ],
        },
        {
            label: 'BÁO CÁO',
            items: [
                { key: 'history', label: 'Lịch sử giao dịch', icon: IcoHistory },
                { key: 'report', label: 'Báo cáo & thống kê', icon: IcoChart },
            ],
        },
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen">
            {/* Logo */}
            <div className="px-6 py-5 flex items-center gap-3 border-b border-slate-100">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="Re-Nats" className="h-10 w-10 rounded-xl object-cover" />
                    <span className="text-xl font-bold tracking-tight" style={{ color: PRIMARY }}>ReNats</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-5 space-y-5 overflow-y-auto">
                {NAV_GROUPS.map(group => (
                    <div key={group.label}>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest px-3 mb-1.5">{group.label}</p>
                        <div className="space-y-0.5">
                            {group.items.map(item => {
                                const isActive = active === item.key;
                                if (item.isLink) {
                                    return (
                                        <Link key={item.key} to={item.isLink}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 text-sm font-medium transition-colors">
                                            <span className="flex-shrink-0 text-slate-400"><item.icon /></span>
                                            {item.label}
                                        </Link>
                                    );
                                }
                                return (
                                    <button key={item.key} onClick={() => setActive(item.key)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                                            ${isActive ? 'text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`}
                                        style={isActive ? { background: PRIMARY } : {}}>
                                        <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                            <item.icon />
                                        </span>
                                        <span className="flex-1">{item.label}</span>
                                        {item.badge ? (
                                            <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 min-w-[1.25rem] text-center
                                                ${isActive ? 'bg-white/25 text-white' : 'text-white'}`}
                                                style={!isActive ? { background: PRIMARY } : {}}>
                                                {item.badge}
                                            </span>
                                        ) : null}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User profile */}
            <div className="p-4 border-t border-slate-100" >
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: PRIMARY }}>A</div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">Admin ReNats</p>
                        <p className="text-xs text-slate-400 truncate">Quản lý kho</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────
const Topbar = ({ title }) => (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><IcoSearch /></span>
                <input type="text" placeholder="Tìm kiếm lô hàng..."
                    className="pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-sm border-none focus:outline-none focus:ring-2 w-56"
                    style={{ '--tw-ring-color': PRIMARY + '40' }}
                />
            </div>
            <button className="relative p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                <IcoBell />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            <AvatarDropdown name="Admin ReNats" role="Quản lý kho" />
        </div>
    </header>
);

// ─────────────────────────────────────────────────────────────────────────
// OVERVIEW PAGE
// ─────────────────────────────────────────────────────────────────────────
const PageOverview = ({ setActive, stats, inboundRecent, outboundRecent }) => {
    const statsCards = [
        { label: 'Tổng tồn kho thực tế', value: stats.totalInventoryKg?.toLocaleString('vi-VN') || '0', unit: 'kg', trend: '+5.2%', up: true, iconBg: '#f0fdf4', iconColor: PRIMARY },
        { label: 'Doanh thu xuất lô tháng', value: stats.monthRevenue ? (stats.monthRevenue / 1000000).toFixed(1) : '0', unit: 'M ₫', trend: '+1.5%', up: true, iconBg: '#eff6ff', iconColor: '#3b82f6' },
        { label: 'Lô nháp chờ đăng bán', value: stats.draftBatches || '0', unit: 'lô', trend: '0%', up: null, iconBg: '#fef9c3', iconColor: '#ca8a04' },
        { label: 'Đơn mới chờ xác nhận', value: stats.newRequests || '0', unit: 'đơn', trend: '+1', up: true, iconBg: '#f0fdf4', iconColor: '#16a34a' },
    ];

    const donutSrc = [
        { label: 'Hộ gia đình', pct: 45, color: PRIMARY },
        { label: 'Cửa hàng', pct: 25, color: '#3b82f6' },
        { label: 'Công sở', pct: 20, color: '#a855f7' },
        { label: 'Khác', pct: 10, color: '#e2e8f0' },
    ];

    const BAR_DATA = [
        { day: 'T.2', pct: 40 }, { day: 'T.3', pct: 65 }, { day: 'T.4', pct: 85 },
        { day: 'T.5', pct: 50 }, { day: 'T.6', pct: 95 }, { day: 'T.7', pct: 30 }, { day: 'CN', pct: 15 },
    ];

    return (
        <div className="space-y-7">
            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                {statsCards.map((s, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.iconBg }}>
                                <svg className="w-5 h-5" fill="none" stroke={s.iconColor} strokeWidth="1.75" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                            {s.up !== null && (
                                <span className={`flex items-center gap-0.5 text-xs font-bold
                                    ${s.up === true ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {s.trend}
                                    {s.up === true ? <IcoTrendUp /> : <IcoTrendDown />}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-500 font-medium">{s.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">
                            {s.value} <span className="text-sm font-normal text-slate-400">{s.unit}</span>
                        </h3>
                    </div>
                ))}
            </div>

            {/* ── Charts row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Bar chart */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-slate-800">Nhập hàng theo ngày</h4>
                        <select className="bg-slate-100 border-none rounded-lg text-xs py-1.5 px-2 text-slate-600 focus:outline-none">
                            <option>7 ngày gần nhất</option>
                            <option>30 ngày gần nhất</option>
                        </select>
                    </div>
                    <div className="flex items-end justify-between gap-3" style={{ height: '13rem' }}>
                        {BAR_DATA.map((bar, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 gap-1.5 h-full">
                                <div className="relative flex-1 w-full rounded-t-lg overflow-hidden" style={{ background: '#f1f5f9' }}>
                                    <div className="absolute bottom-0 left-0 right-0 rounded-t-lg hover:opacity-80 transition-opacity"
                                        style={{ height: `${bar.pct}%`, background: PRIMARY }} />
                                </div>
                                <span className="text-[10px] font-medium text-slate-400 flex-shrink-0">{bar.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Donut chart */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h4 className="font-bold text-slate-800 mb-5">Cơ cấu nguồn gốc</h4>
                    <div className="flex justify-center mb-5">
                        <div className="relative w-32 h-32">
                            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                                {(() => {
                                    let offset = 0;
                                    return donutSrc.map((seg, i) => {
                                        const circ = 2 * Math.PI * 15.9;
                                        const dash = (seg.pct / 100) * circ;
                                        const gap = circ - dash;
                                        const dashoffset = circ - offset * circ / 100;
                                        offset += seg.pct;
                                        return (
                                            <circle key={i} cx="18" cy="18" r="15.9" fill="none"
                                                stroke={seg.color} strokeWidth="3.5"
                                                strokeDasharray={`${dash} ${gap}`}
                                                strokeDashoffset={dashoffset} />
                                        );
                                    });
                                })()}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-lg font-extrabold text-slate-800">100%</span>
                                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Nguồn</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        {donutSrc.map((seg, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                                    <span className="text-sm text-slate-600">{seg.label}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{seg.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Two tables ── */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {/* Recent inbound */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h4 className="font-bold text-slate-800">5 Đơn nhập gần nhất</h4>
                        <button onClick={() => setActive('new')} className="text-sm font-semibold" style={{ color: PRIMARY }}>
                            Xem tất cả
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-3">Mã đơn</th>
                                <th className="px-6 py-3">Loại phế liệu</th>
                                <th className="px-6 py-3">Ngày</th>
                                <th className="px-6 py-3">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inboundRecent.slice(0, 5).map(row => {
                                const st = STATUS_IN[row.status] || { label: row.status, cls: 'bg-slate-100 text-slate-600' };
                                const materialsText = row.types?.map(t => t.materialLabel).join(' · ') || '—';
                                return (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">{row.requestCode}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-600">{materialsText}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-400">{row.pickupDate}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${st.cls}`}>
                                                {st.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {inboundRecent.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-400">Chưa có đơn nhập nào gần đây</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Recent outbound */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h4 className="font-bold text-slate-800">5 Lô xuất gần nhất</h4>
                        <button onClick={() => setActive('history')} className="text-sm font-semibold" style={{ color: PRIMARY }}>
                            Xem tất cả
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-3">Mã lô</th>
                                <th className="px-6 py-3">Khách hàng</th>
                                <th className="px-6 py-3">Khối lượng</th>
                                <th className="px-6 py-3">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {outboundRecent.slice(0, 5).map(row => {
                                const st = STATUS_OUT[row.status] || { label: row.status, cls: 'bg-slate-100 text-slate-600' };
                                return (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">{row.batchCode}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-600">{row.buyer || 'Đang chờ mua'}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-600">{row.actualKg || row.estimatedKg} kg</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${st.cls}`}>
                                                {st.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {outboundRecent.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-slate-400">Chưa có lô xuất nào gần đây</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// NEW REQUESTS PAGE
// ─────────────────────────────────────────────────────────────────────────
const PageNew = ({ newRequests, onSchedule }) => {
    const [expanded, setExpanded] = useState(null);

    return (
        <div className="max-w-5xl">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="font-bold text-slate-800 text-lg">Đơn thu gom mới</h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                        <span className="font-semibold" style={{ color: PRIMARY }}>{newRequests.length} đơn</span> đang chờ xử lý
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid gap-0 bg-slate-50 border-b border-slate-200 font-semibold"
                    style={{ gridTemplateColumns: '2.5rem 1fr 12rem 12rem 7rem 9rem' }}>
                    <div className="px-4 py-3" />
                    <div className="px-3 py-3 text-xs text-slate-500 uppercase tracking-wider">Người bán</div>
                    <div className="px-3 py-3 text-xs text-slate-500 uppercase tracking-wider">Loại phế liệu</div>
                    <div className="px-3 py-3 text-xs text-slate-500 uppercase tracking-wider">Khu vực · Lịch</div>
                    <div className="px-3 py-3 text-xs text-slate-500 uppercase tracking-wider">Mã đơn</div>
                    <div className="px-3 py-3 text-xs text-slate-500 uppercase tracking-wider text-right">Thao tác</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {newRequests.map(req => {
                        const isScheduled = req.status === 'SCHEDULED';
                        const isWeighed = req.status === 'WEIGHED';
                        const isDone = req.status === 'DONE';
                        const isExp = expanded === req.id;

                        return (
                            <div key={req.id}>
                                <div className={`grid items-center transition-colors ${(isScheduled || isWeighed || isDone) ? 'bg-green-50/50' : 'hover:bg-slate-50'}`}
                                    style={{ gridTemplateColumns: '2.5rem 1fr 12rem 12rem 7rem 9rem' }}>
                                    <div className="px-4 py-4">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                                            style={{ background: (isScheduled || isWeighed || isDone) ? PRIMARY : '#64748b' }}>
                                            {(req.sellerName || 'S').charAt(0)}
                                        </div>
                                    </div>
                                    <div className="px-3 py-4 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 truncate">{req.sellerName || 'Ẩn danh'}</p>
                                        <p className="text-xs text-slate-400 truncate mt-0.5">{req.sellerPhone}</p>
                                    </div>
                                    <div className="px-3 py-4 flex flex-wrap gap-1">
                                        {req.types?.map((t, idx) => (
                                            <span key={idx} className="text-[11px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-md font-medium whitespace-nowrap">
                                                {t.materialEmoji} {t.materialLabel}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="px-3 py-4">
                                        <p className="text-xs font-semibold text-slate-700 truncate">{req.pickupAddress}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{req.pickupDate} · {req.pickupSlot}</p>
                                    </div>
                                    <div className="px-3 py-4">
                                        <span className="text-xs font-mono text-slate-400">{req.requestCode}</span>
                                    </div>
                                    <div className="px-3 py-4 flex items-center justify-end gap-2">
                                        {req.status === 'PENDING' ? (
                                            <button onClick={() => onSchedule(req.id)}
                                                className="px-3 py-1.5 text-white text-xs font-bold rounded-lg transition-all hover:opacity-90 whitespace-nowrap"
                                                style={{ background: PRIMARY }}>
                                                Xác nhận lịch
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${STATUS_IN[req.status]?.cls}`}>
                                                    {STATUS_IN[req.status]?.label}
                                                </span>
                                                <button onClick={() => setExpanded(isExp ? null : req.id)}
                                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={isExp ? 'M4.5 15.75l7.5-7.5 7.5 7.5' : 'M19.5 8.25l-7.5 7.5-7.5-7.5'} />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isExp && (
                                    <div className="bg-green-50/30 border-t border-green-100/50 px-6 py-4">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <a href={`tel:${(req.sellerPhone || '').replace(/\s/g, '')}`}
                                                className="flex items-center gap-3 bg-white border border-green-200 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors flex-1 min-w-0 max-w-xs">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                    style={{ background: '#dcfce7', color: PRIMARY }}>
                                                    <IcoPhone />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] text-slate-400">Gọi người bán</p>
                                                    <p className="text-sm font-extrabold text-slate-900 tracking-wide">{req.sellerPhone}</p>
                                                </div>
                                            </a>
                                            {req.status === 'SCHEDULED' && (
                                                <Link to={`/kho/yeu-cau/${req.id}`}
                                                    className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl transition-all flex-shrink-0">
                                                    <div>
                                                        <p className="text-sm font-bold">Thực hiện cân</p>
                                                        <p className="text-xs text-slate-400">Nhập khối lượng phế liệu thực tế</p>
                                                    </div>
                                                    <IcoRight />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {newRequests.length === 0 && (
                        <div className="px-6 py-12 text-center text-slate-400 text-sm">
                            Không có đơn hàng nào chờ xử lý
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// INVENTORY PAGE
// ─────────────────────────────────────────────────────────────────────────
const PageInventory = ({ inventoryList }) => (
    <div className="max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
                <h2 className="font-bold text-slate-800 text-base">Tồn kho hiện tại</h2>
                <p className="text-xs text-slate-400 mt-0.5">Dữ liệu thực tế được cộng dồn từ phiếu cân đã hoàn thành</p>
            </div>
            <Link to="/kho/tao-lo"
                className="px-4 py-2 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                style={{ background: PRIMARY }}>
                + Tạo lô xuất
            </Link>
        </div>
        <div className="divide-y divide-slate-100">
            {inventoryList.map((item, i) => {
                const colors = {
                    'Sắt vụn': '#3b82f6',
                    'Thép phế liệu': '#64748b',
                    'Đồng cáp': '#ca8a04',
                    'Nhôm phế liệu': '#a855f7',
                    'Giấy Carton': '#f59e0b',
                    'Nhựa cứng (PP/PE)': '#16a34a',
                    'Pin / Acquy cũ': '#f43f5e',
                };
                const itemColor = colors[item.type] || PRIMARY;
                return (
                    <div key={i} className="px-6 py-5">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-slate-800">{item.type}</p>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    Khối lượng hiện tại: <span className="font-bold text-slate-700">{item.current?.toLocaleString('vi-VN')}</span> {item.unit || 'kg'}
                                </p>
                            </div>
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: itemColor }} />
                        </div>
                    </div>
                );
            })}
            {inventoryList.length === 0 && (
                <div className="px-6 py-12 text-center text-slate-400 text-sm">
                    Kho hiện đang trống. Hãy xác nhận và cân các đơn hàng mới để tăng tồn kho.
                </div>
            )}
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────
// PICKUP REQUESTS PAGE (QUẢN LÝ PHIẾU THU GOM)
// ─────────────────────────────────────────────────────────────────────────
const PagePickupList = ({ pickupList }) => {
    return (
        <div className="max-w-5xl space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-slate-800 text-lg">Quản lý phiếu thu gom</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Danh sách các yêu cầu thu gom đã được phân công cho kho</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <tr>
                            <th className="px-6 py-3">Mã đơn</th>
                            <th className="px-6 py-3">Người bán</th>
                            <th className="px-6 py-3">Loại vật liệu</th>
                            <th className="px-6 py-3">Kết quả cân</th>
                            <th className="px-6 py-3">Trạng thái</th>
                            <th className="px-6 py-3 text-right">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {pickupList.map(item => {
                            const st = STATUS_IN[item.status] || { label: item.status, cls: 'bg-slate-100 text-slate-600' };
                            const materialsText = item.types?.map(t => t.materialLabel).join(', ') || '—';
                            const totalKg = item.results?.reduce((s, r) => s + r.weightKg, 0) || 0;
                            const totalMoney = item.results?.reduce((s, r) => s + (r.weightKg * r.pricePerKg), 0) || 0;

                            return (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors text-sm">
                                    <td className="px-6 py-4 font-semibold text-slate-800">{item.requestCode}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-slate-800">{item.sellerName}</p>
                                        <p className="text-xs text-slate-400">{item.sellerPhone}</p>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{materialsText}</td>
                                    <td className="px-6 py-4">
                                        {totalKg > 0 ? (
                                            <div>
                                                <p className="font-semibold text-slate-800">{totalKg} kg</p>
                                                <p className="text-xs text-slate-500">{vnd(totalMoney)}</p>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${st.cls}`}>
                                            {st.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.status === 'SCHEDULED' ? (
                                            <Link to={`/kho/yeu-cau/${item.id}`} className="text-xs font-bold text-green-600 hover:underline">
                                                Cân hàng
                                            </Link>
                                        ) : (
                                            <Link to={`/kho/yeu-cau/${item.id}`} className="text-xs font-bold text-slate-500 hover:underline">
                                                Xem phiếu
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {pickupList.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-slate-400">Không tìm thấy yêu cầu nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// HISTORY PAGE (LỊCH SỬ GIAO DỊCH LÔ HÀNG)
// ─────────────────────────────────────────────────────────────────────────
const PageHistory = ({ outboundRecent }) => {
    return (
        <div className="max-w-5xl space-y-4">
            <div>
                <h2 className="font-bold text-slate-800 text-lg">Lịch sử xuất lô hàng</h2>
                <p className="text-sm text-slate-400 mt-0.5">Danh sách các lô hàng đã được đóng gói và xuất bán cho nhà máy</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <tr>
                            <th className="px-6 py-3">Mã lô</th>
                            <th className="px-6 py-3">Loại vật liệu</th>
                            <th className="px-6 py-3">Khối lượng</th>
                            <th className="px-6 py-3">Đơn giá ước tính</th>
                            <th className="px-6 py-3">Nhà máy mua</th>
                            <th className="px-6 py-3">Doanh thu</th>
                            <th className="px-6 py-3">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {outboundRecent.map(batch => {
                            const st = STATUS_OUT[batch.status] || { label: batch.status, cls: 'bg-slate-100 text-slate-600' };
                            return (
                                <tr key={batch.id} className="hover:bg-slate-50 transition-colors text-sm">
                                    <td className="px-6 py-4 font-semibold text-slate-800">{batch.batchCode}</td>
                                    <td className="px-6 py-4 text-slate-600">{MATERIAL_LABELS[batch.materialType] || batch.materialType}</td>
                                    <td className="px-6 py-4 text-slate-800 font-medium">
                                        {batch.actualKg ? `${batch.actualKg} kg (Thực tế)` : `${batch.estimatedKg} kg (Ước tính)`}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {batch.unitPrice ? `${vnd(batch.unitPrice)} / kg` : '—'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 font-medium">{batch.buyer || 'Chưa liên kết'}</td>
                                    <td className="px-6 py-4 font-bold text-green-600">
                                        {batch.totalAmount ? vnd(batch.totalAmount) : '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${st.cls}`}>
                                            {st.label}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                        {outboundRecent.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-400">Chưa có giao dịch lô xuất nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// INVOICE PAGE
// ─────────────────────────────────────────────────────────────────────────
const PageInvoiceList = ({ invoiceList }) => {
    return (
        <div className="max-w-5xl space-y-4">
            <div>
                <h2 className="font-bold text-slate-800 text-lg">Quản lý hóa đơn</h2>
                <p className="text-sm text-slate-400 mt-0.5">Danh sách các hóa đơn từ giao dịch lô xuất với nhà máy</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <tr>
                            <th className="px-6 py-3">Mã hóa đơn</th>
                            <th className="px-6 py-3">Mã lô xuất</th>
                            <th className="px-6 py-3">Thành tiền</th>
                            <th className="px-6 py-3">VAT</th>
                            <th className="px-6 py-3">Tổng cộng</th>
                            <th className="px-6 py-3">Ngày tạo</th>
                            <th className="px-6 py-3 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {invoiceList.map(inv => (
                            <tr key={inv.id} className="hover:bg-slate-50 transition-colors text-sm">
                                <td className="px-6 py-4 font-semibold text-slate-800">{inv.invoiceNumber || 'HD-PENDING'}</td>
                                <td className="px-6 py-4 text-slate-600">{inv.batchCode}</td>
                                <td className="px-6 py-4 text-slate-700">{vnd(inv.subtotal || 0)}</td>
                                <td className="px-6 py-4 text-slate-500">{vnd(inv.vatAmount || 0)}</td>
                                <td className="px-6 py-4 font-bold text-slate-800">{vnd(inv.totalAmount || 0)}</td>
                                <td className="px-6 py-4 text-slate-400">{new Date(inv.createdAt).toLocaleDateString('vi-VN')}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/hoa-don/${inv.id}`} className="text-xs font-bold text-green-600 hover:underline">
                                        Xem chi tiết
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {invoiceList.length === 0 && (
                            <tr>
                                <td colSpan="7" className="px-6 py-12 text-center text-slate-400">Không tìm thấy hóa đơn nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// REPORT & CHART PAGE
// ─────────────────────────────────────────────────────────────────────────
const PageReport = ({ inventoryList, outboundRecent }) => {
    const totalInventory = inventoryList.reduce((s, i) => s + (i.current || 0), 0);
    const totalSold = outboundRecent.filter(b => b.status === 'DELIVERED' || b.status === 'VERIFIED').reduce((s, b) => s + (b.actualKg || b.estimatedKg || 0), 0);

    return (
        <div className="max-w-4xl space-y-6">
            <div>
                <h2 className="font-bold text-slate-800 text-lg">Báo cáo & Thống kê Kho</h2>
                <p className="text-sm text-slate-400 mt-0.5">Biểu đồ trực quan và thống kê dữ liệu vận hành thực tế của kho</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Tồn kho hiện hữu</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">
                        {totalInventory.toLocaleString('vi-VN')} <span className="text-sm font-normal text-slate-400">kg</span>
                    </p>
                    <div className="mt-4 space-y-2">
                        {inventoryList.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="text-slate-600">{item.type}</span>
                                <span className="font-semibold text-slate-800">{item.current?.toLocaleString('vi-VN')} kg</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Đã xuất xưởng</p>
                    <p className="text-2xl font-extrabold text-green-600 mt-1">
                        {totalSold.toLocaleString('vi-VN')} <span className="text-sm font-normal text-slate-400">kg</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-4 italic">
                        Dữ liệu được thống kê tự động dựa trên số liệu giao nhận thực tế với các nhà máy đối tác.
                    </p>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// PAGE BATCH MANAGEMENT (QUẢN LÝ LÔ XUẤT)
// ─────────────────────────────────────────────────────────────────────────
const PageBatchManagement = ({ pickupList: batchList, onReload }) => {
    const [cancelling, setCancelling] = React.useState(null);
    const [activeTransportBatch, setActiveTransportBatch] = React.useState(null);
    const [transportType, setTransportType] = React.useState('DEPOT_SHIPPED');
    const [savingTransport, setSavingTransport] = React.useState(false);

    const handleCancel = async (id) => {
        if (!window.confirm('Bạn có chắc muốn hủy lô hàng này không?')) return;
        setCancelling(id);
        try {
            await depotService.cancelBatchOrder(id);
            alert('Đã hủy lô hàng thành công!');
            if (onReload) onReload();
        } catch (err) {
            alert('Lỗi hủy lô: ' + (err.message || 'Vui lòng thử lại'));
        } finally {
            setCancelling(null);
        }
    };

    const handleSaveTransport = async () => {
        if (!activeTransportBatch) return;
        setSavingTransport(true);
        try {
            await depotService.setBatchTransport(activeTransportBatch.id, transportType);
            alert('Đã chọn phương thức vận chuyển thành công!');
            setActiveTransportBatch(null);
            if (onReload) onReload();
        } catch (err) {
            alert('Lỗi lưu vận chuyển: ' + (err.message || 'Vui lòng thử lại'));
        } finally {
            setSavingTransport(false);
        }
    };

    const canCancel = (status) => ['DRAFT','LISTED','BIDDING'].includes(status);

    return (
        <div className="max-w-5xl space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-slate-800 text-lg">Quản lý lô xuất</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Theo dõi trạng thái các lô đã đăng bán. Có thể hủy trước khi nhà máy xác nhận.</p>
                </div>
                <Link to="/kho/tao-lo" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors">
                    <span>+</span> Tạo lô mới
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                        <tr>
                            <th className="px-5 py-3">Mã lô</th>
                            <th className="px-5 py-3">Loại vật liệu</th>
                            <th className="px-5 py-3">Khối lượng</th>
                            <th className="px-5 py-3">Đơn giá</th>
                            <th className="px-5 py-3">Nhà máy mua</th>
                            <th className="px-5 py-3">Ngày tạo</th>
                            <th className="px-5 py-3">Trạng thái</th>
                            <th className="px-5 py-3 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {batchList.map(batch => {
                            const st = STATUS_OUT[batch.status] || { label: batch.status, cls: 'bg-slate-100 text-slate-600' };
                            const cancellable = canCancel(batch.status);
                            return (
                                <tr key={batch.id} className="hover:bg-slate-50 transition-colors text-sm">
                                    <td className="px-5 py-4 font-semibold text-slate-800">{batch.batchCode}</td>
                                    <td className="px-5 py-4 text-slate-600">{MATERIAL_LABELS[batch.materialType] || batch.materialType}</td>
                                    <td className="px-5 py-4 text-slate-700 font-medium">
                                        {batch.actualKg ? `${batch.actualKg} kg` : `${batch.estimatedKg} kg`}
                                    </td>
                                    <td className="px-5 py-4 text-slate-600">
                                        {batch.unitPrice ? `${vnd(batch.unitPrice)}/kg` : '—'}
                                    </td>
                                    <td className="px-5 py-4 text-slate-700">{batch.buyer || <span className="text-slate-300">Chưa có</span>}</td>
                                    <td className="px-5 py-4 text-slate-400">
                                        {batch.createdAt ? new Date(batch.createdAt).toLocaleDateString('vi-VN') : '—'}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${st.cls}`}>{st.label}</span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        {cancellable ? (
                                            <button
                                                onClick={() => handleCancel(batch.id)}
                                                disabled={cancelling === batch.id}
                                                className="text-xs font-bold text-rose-500 hover:text-rose-700 disabled:opacity-50">
                                                {cancelling === batch.id ? 'Đang hủy...' : 'Hủy lô'}
                                            </button>
                                        ) : batch.status === 'ACCEPTED' ? (
                                            <button
                                                onClick={() => {
                                                    setActiveTransportBatch(batch);
                                                    setTransportType('DEPOT_SHIPPED');
                                                }}
                                                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm whitespace-nowrap">
                                                Chọn vận chuyển
                                            </button>
                                        ) : (
                                            <span className="text-xs text-slate-300">—</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        {batchList.length === 0 && (
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center">
                                    <p className="text-slate-400">Chưa có lô xuất nào</p>
                                    <Link to="/kho/tao-lo" className="mt-3 inline-block text-sm font-bold text-green-600 hover:underline">+ Tạo lô xuất đầu tiên</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────
// PAGE PROFILE (HỒ SƠ KHO)
// ─────────────────────────────────────────────────────────────────────────
const PageProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        companyName: '',
        contactPerson: '',
        contactPhone: '',
        taxCode: '',
        address: '',
        city: '',
        province: '',
        latitude: '',
        longitude: ''
    });

    const fetchProfile = async () => {
        try {
            const data = await depotService.getProfile();
            setProfile(data);
            if (data) {
                setForm({
                    companyName: data.companyName || '',
                    contactPerson: data.contactPerson || '',
                    contactPhone: data.contactPhone || '',
                    taxCode: data.taxCode || '',
                    address: data.address || '',
                    city: data.city || '',
                    province: data.province || '',
                    latitude: data.latitude || '',
                    longitude: data.longitude || ''
                });
            }
        } catch (err) {
            console.error('Lỗi tải hồ sơ:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleGetGPS = () => {
        if (!navigator.geolocation) {
            alert('Trình duyệt không hỗ trợ định vị GPS.');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=vi`
                    );
                    const data = await res.json();
                    const addressStr = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
                    
                    setForm(prev => ({
                        ...prev,
                        address: addressStr,
                        latitude: lat,
                        longitude: lng
                    }));
                    alert('Đã lấy tọa độ GPS và phân giải địa chỉ thành công! Nhấn "Lưu hồ sơ" để lưu lại.');
                } catch (err) {
                    console.error('Lỗi phân giải vị trí:', err);
                    setForm(prev => ({
                        ...prev,
                        latitude: lat,
                        longitude: lng
                    }));
                    alert('Đã lấy tọa độ GPS thành công! Nhấn "Lưu hồ sơ" để lưu lại.');
                }
            },
            () => {
                alert('Không thể truy cập vị trí. Hãy cấp quyền truy cập GPS.');
            }
        );
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await depotService.updateProfile({
                companyName: form.companyName,
                contactPerson: form.contactPerson,
                contactPhone: form.contactPhone,
                taxCode: form.taxCode,
                address: form.address,
                city: form.city,
                province: form.province,
                latitude: form.latitude ? parseFloat(form.latitude) : null,
                longitude: form.longitude ? parseFloat(form.longitude) : null
            });
            alert('Đã lưu hồ sơ kho thành công!');
            fetchProfile();
        } catch (err) {
            alert('Lỗi lưu hồ sơ: ' + (err.message || 'Vui lòng thử lại'));
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="py-12 text-center">
                <p className="text-slate-400 text-sm">Đang tải thông tin hồ sơ kho...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h2 className="font-bold text-slate-800 text-lg">Hồ sơ điểm thu gom</h2>
                <p className="text-sm text-slate-400 mt-0.5">Quản lý thông tin liên hệ và tọa độ định vị GPS của kho.</p>
            </div>

            <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                {/* Section 1: Thông tin chung */}
                <div className="p-6 space-y-4">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Thông tin chung</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Tên công ty / Điểm thu gom</label>
                            <input type="text" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" required />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Mã số thuế</label>
                            <input type="text" value={form.taxCode} onChange={e => setForm({...form, taxCode: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Người liên hệ</label>
                            <input type="text" value={form.contactPerson} onChange={e => setForm({...form, contactPerson: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" required />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Số điện thoại liên hệ</label>
                            <input type="text" value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" required />
                        </div>
                    </div>
                </div>

                {/* Section 2: Địa chỉ & GPS */}
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Địa chỉ & Tọa độ GPS</h3>
                        <button type="button" onClick={handleGetGPS}
                            className="flex items-center gap-1.5 text-green-700 hover:text-green-800 text-xs font-extrabold hover:underline">
                            <span className="material-symbols-outlined text-sm">my_location</span> Lấy tọa độ GPS
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Địa chỉ chi tiết</label>
                            <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Thành phố / Huyện</label>
                                <input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Tỉnh</label>
                                <input type="text" value={form.province} onChange={e => setForm({...form, province: e.target.value})}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Vĩ độ (Latitude)</label>
                                <input type="number" step="any" value={form.latitude} onChange={e => setForm({...form, latitude: e.target.value})}
                                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Chưa xác định" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Kinh độ (Longitude)</label>
                                <input type="number" step="any" value={form.longitude} onChange={e => setForm({...form, longitude: e.target.value})}
                                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Chưa xác định" />
                            </div>
                            <p className="text-[10px] text-slate-400 md:col-span-2 mt-1">
                                💡 Nhấn "Lấy tọa độ GPS" khi đang đứng ở kho để lấy chính xác tọa độ thực tế, giúp bản đồ VIP của hệ thống điều hướng chính xác tài xế vận chuyển và nhà máy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Submit */}
                <div className="p-6 bg-slate-50 flex justify-end">
                    <button type="submit" disabled={saving}
                        className="px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-sm">
                        {saving ? 'Đang lưu...' : 'Lưu hồ sơ'}
                    </button>
                </div>
            </form>
        </div>
    );
};

import { useToast } from '../../context/ToastContext';

// ─────────────────────────────────────────────────────────────────────────
// MAIN WRAPPER
// ─────────────────────────────────────────────────────────────────────────
const PAGE_TITLES = {
    overview: 'Dashboard Kho',
    new: 'Đơn mới',
    inventory: 'Tồn kho',
    pickup: 'Phiếu thu gom',
    batchManage: 'Quản lý lô xuất',
    invoice: 'Hóa đơn',
    history: 'Lịch sử giao dịch',
    report: 'Báo cáo & Thống kê',
    profile: 'Hồ sơ & Định vị Kho',
};

const WarehouseDashboard = () => {
    const toast = useToast();
    const [active, setActive] = useState('overview');
    const [stats, setStats] = useState({});
    const [newRequests, setNewRequests] = useState([]);
    const [inventoryList, setInventoryList] = useState([]);
    const [pickupList, setPickupList] = useState([]);
    const [outboundRecent, setOutboundRecent] = useState([]);
    const [invoiceList, setInvoiceList] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const [statsData, pendingData, invData, pickupData, outboundData, invsData] = await Promise.all([
                depotService.getDashboardStats().catch(() => ({})),
                depotService.getPendingRequests().catch(() => []),
                depotService.getInventory().catch(() => []),
                depotService.getAllPickupRequests().catch(() => []),
                depotService.getBatchOrders().catch(() => []),
                depotService.getInvoices().catch(() => []),
            ]);

            setStats(statsData);
            setNewRequests(pendingData);
            setInventoryList(invData);
            setPickupList(pickupData);
            setOutboundRecent(outboundData);
            setInvoiceList(invsData);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSchedule = async (id) => {
        try {
            await depotService.schedulePickup(id);
            toast.success('Đã xác nhận lịch hẹn thu gom thành công!');
            await loadData();
        } catch (err) {
            toast.error('Lỗi xác nhận lịch: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin mx-auto" />
                    <p className="text-gray-500 text-sm font-medium">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar active={active} setActive={setActive} newRequestsCount={newRequests.length} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar title={PAGE_TITLES[active] || 'Dashboard'} />
                <main className="flex-1 overflow-y-auto p-7">
                    {active === 'overview' && (
                        <PageOverview
                            setActive={setActive}
                            stats={stats}
                            inboundRecent={pickupList}
                            outboundRecent={outboundRecent}
                        />
                    )}
                    {active === 'new' && <PageNew newRequests={newRequests} onSchedule={handleSchedule} />}
                    {active === 'inventory' && <PageInventory inventoryList={inventoryList} />}
                    {active === 'pickup' && <PagePickupList pickupList={pickupList} />}
                    {active === 'batchManage' && <PageBatchManagement pickupList={outboundRecent} onReload={loadData} />}
                    {active === 'profile' && <PageProfile />}
                    {active === 'invoice' && <PageInvoiceList invoiceList={invoiceList} />}
                    {active === 'history' && <PageHistory outboundRecent={outboundRecent} />}
                    {active === 'report' && <PageReport inventoryList={inventoryList} outboundRecent={outboundRecent} />}
                </main>
            </div>
        </div>
    );
};

export default WarehouseDashboard;
