import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky-header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                alt="Re-Nats Logo"
                                className="w-auto h-20"
                                src="/logo.jpg"
                            />
                        </Link>
                    </div>
                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" to="/">Trang chủ</Link>
                        <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Dịch vụ</a>
                        <Link className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" to="/gioi-thieu">Giới thiệu</Link>
                        <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Tin túc</a>
                        <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Liên hệ</a>
                    </nav>
                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <a className="text-sm font-semibold text-slate-700 hover:text-primary" href="#">Đăng nhập</a>
                        <a
                            className="bg-primary hover:bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md shadow-green-200"
                            href="#"
                        >
                            Đăng ký ngay
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
