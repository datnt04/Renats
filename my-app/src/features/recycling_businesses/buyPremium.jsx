import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDoanhNghiep from '../../components/layout/header_doanhNghiep/headerDoanhNghiep';
import { factoryService } from '../../services/factoryService';
import { useToast } from '../../context/ToastContext';

const BuyPremium = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [premiumInfo, setPremiumInfo] = useState({ isPremium: false, expiresAt: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await factoryService.getPremiumStatus();
                setPremiumInfo(res);
            } catch (err) {
                console.error('Error fetching premium status:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    const handleBuy = async (plan) => {
        try {
            const res = await factoryService.subscribePremium(plan);
            setPremiumInfo({ isPremium: res.isPremium, expiresAt: res.expiresAt });
            toast.success(`Nâng cấp Premium thành công! Hạn dùng mới: ${new Date(res.expiresAt).toLocaleDateString('vi-VN')}`);
        } catch (err) {
            console.error('Error subscribing to premium:', err);
            toast.error('Nâng cấp Premium thất bại. Vui lòng thử lại!');
        }
    };

    return (
        <div className="font-sans text-slate-900 overflow-x-hidden bg-white">
            <style>{`
        .hero-mesh-gradient {
          background-color: #f8fafc;
          background-image:
            radial-gradient(at 0% 0%, hsla(142, 46%, 34%, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsla(199, 89%, 48%, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, hsla(142, 46%, 34%, 0.05) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(199, 89%, 48%, 0.1) 0px, transparent 50%);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

            {/* Redesigned Premium Unified Header */}
            <HeaderDoanhNghiep activeTab="premium" />

            {/* Main Section */}
            <section className="relative min-h-screen py-20 hero-mesh-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Active Premium Banner */}
                    {premiumInfo.isPremium && (
                        <div className="max-w-3xl mx-auto mb-10 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-2xl p-6 shadow-xl flex items-center justify-between border border-emerald-500">
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined">verified</span>
                                    Tài khoản Premium Đang Hoạt Động
                                </h3>
                                <p className="text-emerald-100 text-sm mt-1">
                                    Mở khóa đầy đủ các tính năng: danh bạ VIP, bản đồ đối tác, và lịch sử chất lượng/tạp chất.
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs uppercase tracking-wider text-emerald-200">Hạn sử dụng</p>
                                <p className="text-lg font-black mt-0.5">{new Date(premiumInfo.expiresAt).toLocaleDateString('vi-VN')}</p>
                            </div>
                        </div>
                    )}

                    {/* Heading */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Nâng cấp lên <span className="text-primary">Premium</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            Mở khóa toàn bộ tiềm năng kinh doanh tái chế của bạn với các công cụ phân tích chuyên sâu và mạng lưới
                            đối tác tin cậy.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                        {/* Card 1 - Gói Ngắn Hạn */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 duration-300">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-500 uppercase tracking-wider mb-2">Gói Ngắn Hạn</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-extrabold text-slate-900">199.000</span>
                                    <span className="text-xl text-slate-500 font-medium ml-2">đ</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Cho 1 tuần sử dụng</p>
                            </div>
                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-green-500 mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Xem lịch sử tạp chất chi tiết</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-green-500 mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Truy cập danh bạ VIP</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-slate-300 mr-3 text-xl flex-shrink-0">cancel</span>
                                        <span className="text-slate-400 text-sm">Báo cáo EPR chuyên sâu</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => handleBuy('week')} className="w-full bg-slate-50 hover:bg-slate-100 text-primary border border-primary font-bold py-3 px-6 rounded-xl transition-colors">
                                Chọn gói 1 Tuần
                            </button>
                        </div>

                        {/* Card 2 - Gói Năm (Featured) */}
                        <div className="bg-white rounded-2xl shadow-2xl border-2 border-primary p-8 flex flex-col relative overflow-hidden transform scale-105 z-10">
                            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                Phổ biến nhất
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-primary uppercase tracking-wider mb-2">Gói Năm</h3>
                                <div className="flex items-baseline">
                                    <span className="text-5xl font-extrabold text-slate-900">4.990.000</span>
                                    <span className="text-2xl text-slate-500 font-medium ml-2">đ</span>
                                </div>
                                <p className="text-sm text-green-600 mt-2 font-medium">Tiết kiệm 50% so với gói tháng</p>
                            </div>
                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-primary mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Xem lịch sử tạp chất chi tiết</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-primary mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Truy cập danh bạ VIP (Toàn quốc)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-primary mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Báo cáo EPR chuyên sâu &amp; Xuất Excel</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-primary mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Hỗ trợ ưu tiên 24/7</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => handleBuy('year')} className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5">
                                Đăng ký gói 1 Năm
                            </button>
                        </div>

                        {/* Card 3 - Gói Tháng */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1 duration-300">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-500 uppercase tracking-wider mb-2">Gói Tháng</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-extrabold text-slate-900">799.000</span>
                                    <span className="text-xl text-slate-500 font-medium ml-2">đ</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Thanh toán hàng tháng</p>
                            </div>
                            <div className="flex-grow">
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-green-500 mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Xem lịch sử tạp chất chi tiết</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-green-500 mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Truy cập danh bạ VIP</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="material-symbols-outlined text-green-500 mr-3 text-xl flex-shrink-0">check_circle</span>
                                        <span className="text-slate-700 text-sm font-medium">Báo cáo EPR chuyên sâu</span>
                                    </li>
                                </ul>
                            </div>
                            <button onClick={() => handleBuy('month')} className="w-full bg-slate-50 hover:bg-slate-100 text-primary border border-primary font-bold py-3 px-6 rounded-xl transition-colors">
                                Chọn gói 1 Tháng
                            </button>
                        </div>
                    </div>

                    {/* Enterprise Link */}
                    <div className="mt-16 text-center">
                        <p className="text-slate-500 mb-6">Bạn là doanh nghiệp lớn cần giải pháp tùy chỉnh?</p>
                        <a className="text-primary font-semibold hover:text-secondary flex items-center justify-center gap-2 group" href="#">
                            Liên hệ bộ phận kinh doanh
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-20 border-t border-slate-200 pt-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center grayscale opacity-60">
                            <div className="flex items-center justify-center space-x-2">
                                <span className="material-symbols-outlined text-3xl">verified_user</span>
                                <span className="font-bold text-lg">Bảo mật cao</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <span className="material-symbols-outlined text-3xl">payments</span>
                                <span className="font-bold text-lg">Thanh toán an toàn</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <span className="material-symbols-outlined text-3xl">headset_mic</span>
                                <span className="font-bold text-lg">Hỗ trợ 24/7</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <span className="material-symbols-outlined text-3xl">cancel</span>
                                <span className="font-bold text-lg">Hủy bất cứ lúc nào</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default BuyPremium;
