import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { ROLE_HOME } from '../../app/roleRoutes';

// ── Icons ──────────────────────────────────────────────────────────────────
const IconUser = ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
const IconBell = ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);
const IconLogout = ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
);
const IconGrid = ({ cls = 'w-5 h-5' }) => (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);
const IconChevron = ({ cls = 'w-4 h-4' }) => (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// ── Mapping role → trang hồ sơ riêng ─────────────────────────────────────────
// Nếu chưa có trang profile riêng thì fallback về dashboard của role đó
const ROLE_PROFILE = {
    SELLER:  '/seller/ho-so',
    DEPOT:   '/kho/dashboard',    // TODO: thay bằng /kho/ho-so khi có trang
    FACTORY: '/recycle/dashboard',
    DRIVER:  '/transport/market',
    ADMIN:   '/admin/dashboard',
};

// ── Tên hiển thị vai trò ──────────────────────────────────────────────────────
const ROLE_LABEL = {
    SELLER:  'Người bán',
    DEPOT:   'Điểm thu gom',
    FACTORY: 'Nhà máy tái chế',
    DRIVER:  'Tài xế',
    ADMIN:   'Quản trị viên',
};

// ── Avatar Dropdown ────────────────────────────────────────────────────────────
// Tất cả link điều hướng đều dựa theo role thực tế, KHÔNG hardcode route seller
export const AvatarDropdown = () => {
    const [open, setOpen] = useState(false);
    const navigate        = useNavigate();
    const { user, logout } = useAuth();

    const displayName = user?.fullName || user?.email || 'Người dùng';
    const displayRole = ROLE_LABEL[user?.role] || 'Thành viên';

    // Dashboard và profile đúng theo role
    const dashboardLink = ROLE_HOME[user?.role] || '/';
    const profileLink   = ROLE_PROFILE[user?.role] || dashboardLink;

    const handleLogout = () => {
        setOpen(false);
        logout();
        navigate('/dang-nhap', { replace: true });
    };

    const menuItems = [
        { icon: <IconUser />, label: 'Hồ sơ cá nhân', to: profileLink   },
        { icon: <IconGrid />, label: 'Trang chủ',      to: dashboardLink },
        { icon: <IconBell />, label: 'Thông báo',      to: '#'           },
        { divider: true },
        { icon: <IconLogout />, label: 'Đăng xuất', action: handleLogout, danger: true },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
            >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-bold text-sm select-none">
                    {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-bold text-slate-800 leading-none">{displayName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{displayRole}</p>
                </div>
                <span className={`text-slate-400 hidden sm:block transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                    <IconChevron />
                </span>
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                        {/* Header */}
                        <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-extrabold">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{displayName}</p>
                                    <p className="text-xs text-slate-400">{displayRole}</p>
                                </div>
                            </div>
                        </div>
                        {/* Menu */}
                        <div className="py-1.5">
                            {menuItems.map((item, i) => {
                                if (item.divider) return <div key={i} className="my-1.5 border-t border-slate-100" />;
                                const cls = `w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left
                                    ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50'}`;
                                if (item.to && item.to !== '#') {
                                    return (
                                        <Link key={i} to={item.to} onClick={() => setOpen(false)} className={cls}>
                                            <span className={item.danger ? 'text-red-400' : 'text-slate-400'}>{item.icon}</span>
                                            {item.label}
                                        </Link>
                                    );
                                }
                                return (
                                    <button key={i} onClick={() => { item.action?.(); }} className={cls}>
                                        <span className={item.danger ? 'text-red-400' : 'text-slate-400'}>{item.icon}</span>
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AvatarDropdown;
