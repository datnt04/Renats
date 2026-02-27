import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AvatarDropdown } from '../../components/seller/AvatarDropdown';

// ── Brand color ──────────────────────────────────────────────────────────
const PRIMARY = '#16a34a'; // xanh lá

// ── Mock data ──────────────────────────────────────────────────────────────
const inboundRecent = [
    { id: '#YC-009', product: 'Sắt vụn · Nhôm', date: '27/02/2026', status: 'done' },
    { id: '#YC-008', product: 'Nhựa cứng PP', date: '26/02/2026', status: 'done' },
    { id: '#YC-007', product: 'Đồng cáp (Loại 1)', date: '26/02/2026', status: 'checking' },
    { id: '#YC-006', product: 'Giấy Carton', date: '25/02/2026', status: 'done' },
    { id: '#YC-005', product: 'Pin / Acquy cũ', date: '24/02/2026', status: 'cancelled' },
];
const outboundRecent = [
    { id: '#GD-024', buyer: 'Thép Miền Nam JSC', weight: '10.2 tấn', status: 'transit' },
    { id: '#GD-023', buyer: 'Giấy Sài Gòn Xanh', weight: '5.0 tấn', status: 'delivered' },
    { id: '#GD-022', buyer: 'Nhựa Tiền Phong', weight: '3.8 tấn', status: 'delivered' },
    { id: '#GD-021', buyer: 'Đồng Tâm Recycling', weight: '0.9 tấn', status: 'transit' },
    { id: '#GD-020', buyer: 'Công ty TM Phú Mỹ', weight: '7.5 tấn', status: 'waiting' },
];

const newRequests = [
    { id: 'YC-005', seller: 'Nguyễn Thị Hoa', phone: '0901 111 222', types: ['Sắt vụn', 'Nhôm'], location: 'Quận 12', date: '28/02/2026', slot: '09:00–11:00', note: 'Nhiều sắt cũ từ cải tạo nhà' },
    { id: 'YC-006', seller: 'Trần Văn Bình', phone: '0902 333 444', types: ['Giấy Carton', 'Nhựa cứng'], location: 'Bình Dương', date: '28/02/2026', slot: '13:00–15:00', note: '' },
    { id: 'YC-007', seller: 'Lê Thị Cẩm', phone: '0903 555 666', types: ['Đồng cáp'], location: 'Quận 9', date: '01/03/2026', slot: '07:00–09:00', note: '' },
    { id: 'YC-008', seller: 'Phạm Văn Đức', phone: '0904 777 888', types: ['Pin / Acquy', 'Điện tử'], location: 'Thủ Đức', date: '01/03/2026', slot: '14:00–16:00', note: '' },
];

const inventory = [
    { type: 'Sắt vụn', current: 7.2, target: 10, unit: 'tấn', color: '#3b82f6' },
    { type: 'Giấy Carton', current: 3.8, target: 5, unit: 'tấn', color: '#f59e0b' },
    { type: 'Đồng cáp', current: 0.9, target: 2, unit: 'tấn', color: '#16a34a' },
    { type: 'Nhôm phế liệu', current: 1.4, target: 3, unit: 'tấn', color: '#a855f7' },
];

const history = [
    { id: 'GD-024', kind: 'pickup', date: '26/02/2026', seller: 'Nguyễn Văn A', types: 'Đồng cáp · Sắt vụn', kg: 60.5, amount: 1_667_500 },
    { id: 'GD-023', kind: 'batch', date: '25/02/2026', buyer: 'Công ty TM Phú Mỹ', types: 'Sắt vụn', kg: 10200, amount: 45_900_000 },
    { id: 'GD-022', kind: 'pickup', date: '24/02/2026', seller: 'Trần Thị B', types: 'Giấy Carton', kg: 95.0, amount: 190_000 },
    { id: 'GD-021', kind: 'pickup', date: '23/02/2026', seller: 'Lê Văn C', types: 'Nhôm · Thép', kg: 41.0, amount: 820_000 },
    { id: 'GD-020', kind: 'batch', date: '20/02/2026', buyer: 'Giấy Sài Gòn Xanh', types: 'Giấy Carton', kg: 5000, amount: 12_500_000 },
];

const vnd = n => n.toLocaleString('vi-VN') + ' ₫';
const totalIn = history.filter(h => h.kind === 'pickup').reduce((s, h) => s + h.amount, 0);
const totalOut = history.filter(h => h.kind === 'batch').reduce((s, h) => s + h.amount, 0);

// Bar chart data (7 days)
const BAR_DATA = [
    { day: 'T.2', pct: 40 }, { day: 'T.3', pct: 65 }, { day: 'T.4', pct: 85 },
    { day: 'T.5', pct: 50 }, { day: 'T.6', pct: 95 }, { day: 'T.7', pct: 30 }, { day: 'CN', pct: 15 },
];

// ── Sidebar nav ───────────────────────────────────────────────────────────
const NAV_GROUPS = [
    {
        label: 'TỔNG QUAN',
        items: [
            { key: 'overview', label: 'Tổng quan', icon: IcoDashboard },
            { key: 'new', label: 'Đơn mới', icon: IcoInbox, badge: newRequests.length },
            { key: 'inventory', label: 'Tồn kho', icon: IcoBox },
        ],
    },
    {
        label: 'NGHIỆP VỤ',
        items: [
            { key: 'pickup', label: 'Phiếu thu gom', icon: IcoClipboard },
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
function IcoRight() { return <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>; }
function IcoTrendUp() { return <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>; }
function IcoTrendDown() { return <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22m0 0l-5.94 2.28m5.94-2.28l-2.28-5.941" /></svg>; }

// ── Status badges ─────────────────────────────────────────────────────────
const STATUS_IN = {
    done: { label: 'HOÀN TẤT', cls: 'bg-emerald-100 text-emerald-700' },
    checking: { label: 'ĐANG KIỂM', cls: 'bg-amber-100 text-amber-700' },
    cancelled: { label: 'ĐÃ HỦY', cls: 'bg-rose-100 text-rose-600' },
};
const STATUS_OUT = {
    transit: { label: 'ĐANG ĐI', cls: 'bg-blue-100 text-blue-700' },
    delivered: { label: 'ĐÃ GIAO', cls: 'bg-emerald-100 text-emerald-700' },
    waiting: { label: 'CHỜ XE', cls: 'bg-amber-100 text-amber-700' },
};

// ─────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive }) => (
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
        < div className="p-4 border-t border-slate-100" >
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: PRIMARY }}>A</div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">Admin ReNats</p>
                    <p className="text-xs text-slate-400 truncate">Quản lý kho</p>
                </div>
            </div>
        </div >
    </aside >
);

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
const PageOverview = ({ setActive }) => {
    // Stat cards
    const stats = [
        { label: 'Tổng tồn kho', value: '13,300', unit: 'kg', trend: '+5.2%', up: true, iconBg: '#f0fdf4', iconColor: PRIMARY },
        { label: 'Khối lượng xuất tháng', value: '15,200', unit: 'kg', trend: '-2.1%', up: false, iconBg: '#eff6ff', iconColor: '#3b82f6' },
        { label: 'Lô chưa đủ ngưỡng xuất', value: '12', unit: 'lô', trend: '0%', up: null, iconBg: '#fef9c3', iconColor: '#ca8a04' },
        { label: 'Đơn mới chờ xác nhận', value: newRequests.length, unit: 'đơn', trend: '+1', up: true, iconBg: '#f0fdf4', iconColor: '#16a34a' },
    ];

    // Donut chart (CSS-based) — source origin
    const donutSrc = [
        { label: 'Hộ gia đình', pct: 45, color: PRIMARY },
        { label: 'Cửa hàng', pct: 25, color: '#3b82f6' },
        { label: 'Công sở', pct: 20, color: '#a855f7' },
        { label: 'Khác', pct: 10, color: '#e2e8f0' },
    ];

    return (
        <div className="space-y-7">
            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.iconBg }}>
                                <svg className="w-5 h-5" fill="none" stroke={s.iconColor} strokeWidth="1.75" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                            </div>
                            <span className={`flex items-center gap-0.5 text-xs font-bold
                                ${s.up === true ? 'text-emerald-500' : s.up === false ? 'text-rose-500' : 'text-slate-400'}`}>
                                {s.trend}
                                {s.up === true && <IcoTrendUp />}
                                {s.up === false && <IcoTrendDown />}
                            </span>
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
                    {/* SVG donut */}
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
                            {inboundRecent.map(row => {
                                const st = STATUS_IN[row.status];
                                return (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">{row.id}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-600">{row.product}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-400">{row.date}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${st.cls}`}>
                                                {st.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
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
                                <th className="px-6 py-3">Trọng lượng</th>
                                <th className="px-6 py-3">Vận chuyển</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {outboundRecent.map(row => {
                                const st = STATUS_OUT[row.status];
                                return (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">{row.id}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-600">{row.buyer}</td>
                                        <td className="px-6 py-3.5 text-sm text-slate-600">{row.weight}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${st.cls}`}>
                                                {st.label}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
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

const PageNew = () => {
    const [confirmed, setConfirmed] = useState([]);
    const [expanded, setExpanded] = useState(null); // which row is expanded after confirm
    const confirm = id => { setConfirmed(p => [...p, id]); setExpanded(id); };

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="font-bold text-slate-800 text-lg">Đơn thu gom mới</h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                        <span className="font-semibold" style={{ color: PRIMARY }}>{newRequests.length} đơn</span> đang chờ xác nhận
                    </p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                    Cập nhật mới nhất
                </span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Table head */}
                <div className="grid gap-0 bg-slate-50 border-b border-slate-200"
                    style={{ gridTemplateColumns: '2.5rem 1fr 10rem 10rem 7rem 8.5rem' }}>
                    <div className="px-4 py-3" />
                    <div className="px-3 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Người bán</div>
                    <div className="px-3 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Loại phế liệu</div>
                    <div className="px-3 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Khu vực · Lịch</div>
                    <div className="px-3 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã đơn</div>
                    <div className="px-3 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-100">
                    {newRequests.map(req => {
                        const isDone = confirmed.includes(req.id);
                        const isExp = expanded === req.id;
                        return (
                            <div key={req.id}>
                                {/* Main row */}
                                <div className={`grid items-center transition-colors ${isDone ? 'bg-green-50' : 'hover:bg-slate-50'}`}
                                    style={{ gridTemplateColumns: '2.5rem 1fr 10rem 10rem 7rem 8.5rem' }}>
                                    {/* Avatar */}
                                    <div className="px-4 py-4">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                                            style={{ background: isDone ? PRIMARY : '#64748b' }}>
                                            {req.seller.charAt(0)}
                                        </div>
                                    </div>
                                    {/* Seller name + note */}
                                    <div className="px-3 py-4 min-w-0">
                                        <p className="text-sm font-semibold text-slate-800 truncate">{req.seller}</p>
                                        {req.note && (
                                            <p className="text-xs text-slate-400 italic truncate mt-0.5">{req.note}</p>
                                        )}
                                    </div>
                                    {/* Waste types */}
                                    <div className="px-3 py-4 flex flex-wrap gap-1">
                                        {req.types.map(t => (
                                            <span key={t} className="text-[11px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-md font-medium whitespace-nowrap">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    {/* Location + time */}
                                    <div className="px-3 py-4">
                                        <p className="text-xs font-semibold text-slate-700">{req.location}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{req.date}</p>
                                        <p className="text-xs text-slate-400">{req.slot}</p>
                                    </div>
                                    {/* ID */}
                                    <div className="px-3 py-4">
                                        <span className="text-xs font-mono text-slate-400">{req.id}</span>
                                    </div>
                                    {/* Action */}
                                    <div className="px-3 py-4 flex items-center justify-end gap-2">
                                        {!isDone ? (
                                            <button onClick={() => confirm(req.id)}
                                                className="px-3.5 py-1.5 text-white text-xs font-bold rounded-lg transition-all hover:opacity-90 whitespace-nowrap"
                                                style={{ background: PRIMARY }}>
                                                Xác nhận lấy
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                                                    <IcoCheck /> Đã xác nhận
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

                                {/* Expanded: phone + phiếu thu gom */}
                                {isDone && isExp && (
                                    <div className="bg-green-50 border-t border-green-100 px-6 py-4">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            {/* Phone */}
                                            <a href={`tel:${req.phone.replace(/\s/g, '')}`}
                                                className="flex items-center gap-3 bg-white border border-green-200 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors flex-1 min-w-0 max-w-xs group">
                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                    style={{ background: '#dcfce7', color: PRIMARY }}>
                                                    <IcoPhone />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[11px] text-slate-400">Số điện thoại người bán</p>
                                                    <p className="text-base font-extrabold text-slate-900 tracking-wide">{req.phone}</p>
                                                </div>
                                            </a>
                                            {/* Phiếu thu gom */}
                                            <Link to={`/kho/yeu-cau/${req.id}`}
                                                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl transition-all flex-shrink-0">
                                                <div>
                                                    <p className="text-sm font-bold">Phiếu thu gom</p>
                                                    <p className="text-xs text-slate-400">Điền số cân &amp; tổng tiền</p>
                                                </div>
                                                <IcoRight />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400">Hiển thị {newRequests.length} đơn thu gom mới nhất</p>
                    <p className="text-xs font-semibold" style={{ color: PRIMARY }}>
                        {confirmed.length}/{newRequests.length} đã xác nhận
                    </p>
                </div>
            </div>
        </div>
    );
};



// ─────────────────────────────────────────────────────────────────────────
// INVENTORY PAGE
// ─────────────────────────────────────────────────────────────────────────
const PageInventory = () => (
    <div className="max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
                <h2 className="font-bold text-slate-800">Tồn kho hiện tại</h2>
                <p className="text-xs text-slate-400 mt-0.5">Cập nhật: hôm nay 14:30</p>
            </div>
            <Link to="/kho/tao-lo"
                className="px-4 py-2 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                style={{ background: PRIMARY }}>
                + Tạo lô xuất
            </Link>
        </div>
        <div className="divide-y divide-slate-100">
            {inventory.map((item, i) => {
                const pct = Math.round((item.current / item.target) * 100);
                const ready = pct >= 72;
                return (
                    <div key={i} className="px-6 py-5">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-slate-800">{item.type}</p>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    <span className="font-semibold text-slate-700">{item.current}</span> / {item.target} {item.unit}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-extrabold" style={{ color: item.color }}>{pct}%</span>
                                {ready && <p className="text-xs text-emerald-600 font-semibold mt-0.5">Sắp đủ lô</p>}
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: item.color }} />
                        </div>
                        {ready && (
                            <Link to="/kho/tao-lo" className="mt-2 inline-flex items-center gap-1 text-xs font-bold" style={{ color: item.color }}>
                                Tạo lô xuất hàng <IcoRight />
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────
// HISTORY PAGE
// ─────────────────────────────────────────────────────────────────────────
const PageHistory = () => (
    <div className="space-y-5 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Chi phí thu gom</p>
                <p className="text-xl font-extrabold text-slate-800">−{vnd(totalIn)}</p>
            </div>
            <div className="bg-white rounded-xl border shadow-sm px-5 py-4" style={{ borderColor: '#bbf7d0' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#16a34a' }}>Doanh thu xuất lô</p>
                <p className="text-xl font-extrabold" style={{ color: '#16a34a' }}>+{vnd(totalOut)}</p>
            </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800">Tất cả giao dịch</h2>
            </div>
            <div className="divide-y divide-slate-100">
                {history.map(item => {
                    const isPickup = item.kind === 'pickup';
                    return (
                        <div key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0
                                ${isPickup ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-700'}`}>
                                {isPickup ? 'IN' : 'OUT'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-slate-800">{isPickup ? item.seller : item.buyer}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                                        ${isPickup ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                        {isPickup ? 'Thu gom' : 'Xuất lô'}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {item.types} · {item.kg >= 1000 ? `${(item.kg / 1000).toFixed(1)} tấn` : `${item.kg} kg`} · {item.date}
                                </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className={`text-sm font-extrabold ${isPickup ? 'text-slate-600' : 'text-green-600'}`}>
                                    {isPickup ? '−' : '+'}{vnd(item.amount)}
                                </p>
                                <p className="text-xs text-slate-400 font-mono">{item.id}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
);

// Placeholder
const PagePlaceholder = ({ label }) => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">🚧</div>
        <p className="font-bold text-slate-700 text-lg">{label}</p>
        <p className="text-sm text-slate-400 mt-1">Tính năng đang được phát triển</p>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────
const PAGE_TITLES = {
    overview: 'Dashboard Kho',
    new: 'Đơn mới',
    inventory: 'Tồn kho',
    pickup: 'Phiếu thu gom',
    invoice: 'Hóa đơn',
    history: 'Lịch sử giao dịch',
    report: 'Báo cáo & Thống kê',
};

const WarehouseDashboard = () => {
    const [active, setActive] = useState('overview');
    return (
        <div className="font-sans flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar active={active} setActive={setActive} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar title={PAGE_TITLES[active] || 'Dashboard'} />
                <main className="flex-1 overflow-y-auto p-7">
                    {active === 'overview' && <PageOverview setActive={setActive} />}
                    {active === 'new' && <PageNew />}
                    {active === 'inventory' && <PageInventory />}
                    {active === 'history' && <PageHistory />}
                    {active === 'pickup' && <PagePlaceholder label="Phiếu thu gom" />}
                    {active === 'invoice' && <PagePlaceholder label="Hóa đơn" />}
                    {active === 'report' && <PagePlaceholder label="Báo cáo & Thống kê" />}
                </main>
            </div>
        </div>
    );
};

export default WarehouseDashboard;
