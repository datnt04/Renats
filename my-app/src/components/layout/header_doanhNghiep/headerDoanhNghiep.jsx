import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/AuthContext';

// Icons matching SellerDashboard style
const IconBell = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

const IconChevron = ({ open }) => (
    <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const IconLogout = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);

const IconHome = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

const IconPremium = () => (
    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

/**
 * HeaderDoanhNghiep - Header dùng chung cho các trang của Nhà máy / Doanh nghiệp tái chế.
 * Matches the high-premium seller design language.
 */
const HeaderDoanhNghiep = ({ activeTab = '' }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Dynamic user resolution with safe fallback
    const displayName = user?.fullName || 'Nhà máy Tái Chế A';
    const displayRole = 'Nhà máy';

    const handleLogout = () => {
        setDropdownOpen(false);
        if (logout) {
            logout();
        }
        navigate('/dang-nhap', { replace: true });
    };

    const navItems = [
        { key: 'dashboard', label: 'Tổng Quan', to: '/recycle/dashboard' },
        { key: 'market', label: 'Chợ Nguyên Liệu', to: '/recycle/market' },
        { key: 'partners', label: 'Danh Sách Vựa', to: '/nha-may/doi-tac' },
        { key: 'map', label: 'Bản đồ', to: '/nha-may/map' },
        { key: 'report', label: 'Báo cáo & Dữ liệu', to: '/nha-may/bao-cao-epr' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                
                {/* Brand Logo & Name */}
                <div className="flex items-center gap-6">
                    <Link to="/recycle/dashboard" className="flex items-center gap-2.5">
                        <img src="/logo.jpg" alt="Re-Nats" className="h-8 w-auto rounded-lg" />
                        <div>
                            <p className="text-sm font-extrabold text-slate-800 leading-none">Re-Nats</p>
                            <p className="text-xs text-slate-400 mt-0.5">Cổng nhà máy</p>
                        </div>
                    </Link>

                    {/* Navigation tabs inside the header */}
                    <nav className="hidden md:flex items-center gap-1.5 ml-6 bg-slate-50 p-1 rounded-xl border border-slate-100">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                to={item.to}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                                    ${activeTab === item.key
                                        ? 'bg-white text-green-700 shadow-sm border border-slate-100/50'
                                        : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right: notification + user */}
                <div className="flex items-center gap-3">
                    <button className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                        <IconBell />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </button>

                    <div className="h-8 w-px bg-slate-200"></div>

                    {/* Account Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(o => !o)}
                            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
                        >
                            {/* Initials Avatar */}
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-700 to-emerald-800 flex items-center justify-center text-white font-bold text-sm select-none">
                                {displayName.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-bold text-slate-800 leading-none">{displayName}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{displayRole}</p>
                            </div>
                            <span className="text-slate-400 hidden sm:block">
                                <IconChevron open={dropdownOpen} />
                            </span>
                        </button>

                        {dropdownOpen && (
                            <>
                                {/* Backdrop */}
                                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                                {/* Dropdown List */}
                                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in">
                                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                        <p className="text-xs text-slate-400 font-semibold uppercase">Tài khoản</p>
                                        <p className="text-sm font-bold text-slate-700 mt-0.5 truncate">{displayName}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            to="/recycle/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <IconHome />
                                            <span>Trang chủ nhà máy</span>
                                        </Link>
                                        <Link
                                            to="/nha-may/premium"
                                            onClick={() => setDropdownOpen(false)}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <IconPremium />
                                            <span>Đăng ký Premium</span>
                                        </Link>
                                        <div className="border-t border-slate-100 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-semibold"
                                        >
                                            <IconLogout />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </header>
    );
};

export default HeaderDoanhNghiep;
