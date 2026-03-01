import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * HeaderDoanhNghiep - Header dùng chung cho các trang của Nhà máy / Doanh nghiệp tái chế.
 *
 * Props:
 *   activeTab: 'market' | 'partners' | 'map' | 'report' | 'premium'
 *              (tuỳ chọn) – highlight tab đang active
 */
const HeaderDoanhNghiep = ({ activeTab = '' }) => {
    const navigate = useNavigate();

    const navItems = [
        { key: 'market', label: 'Chợ Nguyên Liệu', to: '/recycle/market' },
        { key: 'partners', label: 'Danh Sách Vựa', to: '/nha-may/doi-tac' },
        { key: 'map', label: 'Bản đồ', to: '/nha-may/map' },
        { key: 'report', label: 'Báo cáo & Dữ liệu', to: '/nha-may/bao-cao-epr' },
    ];

    return (
        <>
            <style>{`
                .sticky-header {
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    backdrop-filter: blur(8px);
                    background-color: rgba(255, 255, 255, 0.95);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                }
            `}</style>

            <header className="sticky-header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/recycle/dashboard">
                                <img
                                    alt="Re-Nats Logo"
                                    className="w-auto h-20 block"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPyNaZZPNIUwLzLK8rj79_kxgvsvN-3VOzkMfVbMB5K07A7CFYXbzLmZP-Ur0mJVBQMokrEuaiShXmaLuOJKhOsZ5q_tLSsx6Y6TRZJkUcUNwRPnIjMCtjhz8iZQ3xhKit1kegMFDIFx6cHSkrUWlYN32F3pz3g45C1GSNrE0wx_uV7raUzGcwWTsu65SzMOp5z63m12cShw7G3MuB64K8HpLtIz1srLWmsNBGLuOQzmgm5D_FVnqB7_DskDJc6jQsXe0MBDRrpzo"
                                />
                            </Link>
                        </div>

                        {/* Nav */}
                        <nav className="hidden md:flex space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.key}
                                    to={item.to}
                                    className={`text-sm font-semibold transition-colors pb-1 ${activeTab === item.key
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-slate-700 hover:text-primary'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right: notification + user */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-slate-500 hover:text-primary relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => navigate('/nha-may/premium')}
                            >
                                <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                    NT
                                </div>
                                <span className="text-sm font-semibold text-slate-700 hidden sm:block">
                                    Nhà máy Tái Chế A
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        </>
    );
};

export default HeaderDoanhNghiep;
