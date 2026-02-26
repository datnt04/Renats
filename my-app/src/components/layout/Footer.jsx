import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/">
                            <img
                                alt="Logo"
                                className="mb-6 h-20"
                                src="/logo.jpg"
                            />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Nền tảng số hóa ngành phế liệu hàng đầu Việt Nam. Kết nối vựa phế liệu và doanh nghiệp tái chế một cách minh bạch.
                        </p>
                        <div className="flex space-x-4">
                            <a className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">FB</a>
                            <a className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">YT</a>
                            <a className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">IN</a>
                        </div>
                    </div>
                    {/* Products */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Sản phẩm</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a className="hover:text-primary" href="#">Phần mềm quản lý vựa</a></li>
                            <li><a className="hover:text-primary" href="#">Ứng dụng thu gom</a></li>
                            <li><a className="hover:text-primary" href="#">Cổng doanh nghiệp</a></li>
                            <li><a className="hover:text-primary" href="#">Báo giá thị trường</a></li>
                        </ul>
                    </div>
                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Chính sách</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a className="hover:text-primary" href="#">Chính sách bảo mật</a></li>
                            <li><a className="hover:text-primary" href="#">Điều khoản sử dụng</a></li>
                            <li><a className="hover:text-primary" href="#">Quy định giao dịch</a></li>
                            <li><a className="hover:text-primary" href="#">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Liên hệ</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-primary mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                                <span>Tòa nhà Re-Nats, Khu Công Nghệ Cao, Quận 9, TP. HCM</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                                <span>Hotline: 1900 123 456</span>
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                </svg>
                                <span>contact@vechaicongnghe.vn</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
                    <p>© 2024 Ve Chai Công Nghệ (Re-Nats Platform). All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
