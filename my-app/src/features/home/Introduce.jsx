import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const Introduce = () => {
    return (
        <div className="font-sans text-slate-900 bg-white">
            <Header />

            <main>
                {/* Hero Section - Introduce specific */}
                <section className="hero-mesh-gradient relative overflow-hidden py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            Về chúng tôi
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                            GIỚI THIỆU <span className="text-primary">RE-NATS</span>
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                            Chúng tôi là giải pháp công nghệ 4.0 hàng đầu, mang đến sự minh bạch và hiệu quả vượt trội cho ngành thu gom phế liệu truyền thống tại Việt Nam.
                        </p>
                    </div>
                </section>

                {/* Benefits Section - Reused from LandingPage style */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Sứ mệnh của Re-Nats</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto mb-16">Hướng tới một nền kinh tế tuần hoàn bền vững, nơi mọi nguồn lực đều được tối ưu hóa thông qua công nghệ số.</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: 'Quản lý đơn minh bạch', desc: 'Mọi giao dịch đều được ghi lại, đối soát dễ dàng, không còn sai sót thủ công.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'green' },
                                { title: 'Báo giá nhanh chóng', desc: 'Cập nhật giá thị trường tức thời, tự động tính toán tổng đơn hàng cho khách.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'blue' },
                                { title: 'Theo dõi real-time', desc: 'Định vị và theo dõi lộ trình của đội ngũ thu gom ngay trên bản đồ trực tuyến.', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', color: 'purple', icon2: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
                                { title: 'Báo cáo tự động', desc: 'Xuất báo cáo doanh thu, chi phí, lợi nhuận chỉ với một lần chạm.', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'orange' }
                            ].map((benefit, idx) => (
                                <div key={idx} className="p-8 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-green-50 transition-all text-left bg-slate-50/30 group">
                                    <div className={`w-14 h-14 bg-${benefit.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <svg className={`w-8 h-8 text-${benefit.color === 'green' ? 'primary' : benefit.color === 'blue' ? 'accent' : benefit.color + '-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d={benefit.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            {benefit.icon2 && <path d={benefit.icon2} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>}
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Who is it for Section - Reused */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-widest uppercase">ĐỐI TÁC CỦA CHÚNG TÔI</h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Chủ vựa */}
                            <div className="bg-white rounded-3xl p-2 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-green-50 w-1/3 flex items-center justify-center rounded-2xl">
                                    <img alt="Chủ vựa phế liệu icon" className="w-32 h-32" src="/logo.jpg" />
                                </div>
                                <div className="w-2/3 p-8">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Chủ vựa phế liệu</h3>
                                    <p className="text-slate-500 text-sm mb-6">Số hóa sổ sách ghi chép, quản lý nhân viên thu gom và kho bãi tập trung trên một thiết bị duy nhất.</p>
                                    <ul className="space-y-3 mb-8">
                                        {['Quản lý kho chính xác', 'Chốt giá nhanh với khách'].map((item, i) => (
                                            <li key={i} className="flex items-center text-sm text-slate-700">
                                                <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* Doanh nghiệp */}
                            <div className="bg-white rounded-3xl p-2 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-blue-50 w-1/3 flex items-center justify-center rounded-2xl">
                                    <img alt="Doanh nghiệp tái chế icon" className="w-32 h-32" src="/logo.jpg" />
                                </div>
                                <div className="w-2/3 p-8">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Doanh nghiệp tái chế</h3>
                                    <p className="text-slate-500 text-sm mb-6">Xây dựng chuỗi cung ứng bền vững, minh bạch hóa nguồn gốc nguyên liệu đầu vào và quản lý đối tác.</p>
                                    <ul className="space-y-3 mb-8">
                                        {['Theo dõi nguồn cung ổn định', 'Đáp ứng tiêu chuẩn ESG'].map((item, i) => (
                                            <li key={i} className="flex items-center text-sm text-slate-700">
                                                <svg className="w-5 h-5 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path></svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Introduce;
