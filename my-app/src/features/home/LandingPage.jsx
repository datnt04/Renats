import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const LandingPage = () => {
    return (
        <div className="font-sans text-slate-900 bg-white">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="hero-mesh-gradient relative overflow-hidden py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Hero Content */}
                            <div data-purpose="hero-text">
                                <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                                    Nền tảng Công nghệ 4.0
                                </span>
                                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                                    VE CHAI <span className="text-primary">CÔNG NGHỆ</span>
                                </h1>
                                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                                    Giải pháp quản lý minh bạch, hiệu quả dành riêng cho chủ vựa và doanh nghiệp tái chế. Số hóa quy trình thu gom, tối ưu lợi nhuận.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-green-200 transition-all flex items-center justify-center">
                                        Dùng thử miễn phí
                                    </button>
                                    <button className="bg-white border-2 border-slate-200 hover:border-primary text-slate-700 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center">
                                        Xem bảng giá hôm nay
                                    </button>
                                </div>
                            </div>
                            {/* Hero Visuals */}
                            <div className="relative lg:h-[600px] flex items-center justify-center" data-purpose="hero-visual">
                                <div className="absolute w-[120%] h-[120%] bg-white/40 rounded-full blur-3xl -z-10"></div>
                                <div className="relative flex items-end">
                                    <div className="relative z-20 transform -translate-x-12 md:block block">
                                        <img
                                            alt="App Dashboard"
                                            className="rounded-[3rem] border-[8px] border-slate-900 shadow-2xl w-64"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkmpZrV6173QNslhn6NPMEZW8SoqRGwdZPm8vx_sxHFXdK8CIIvgJNquJ6wmdTyIjqrgnXFvGv6_qhi4axPTKGUJSOZea_BBe1sKhWFIaRIS6x3F4SaJFvjTpnGn1BMQ7VKHeYONB_hRTCMEgUCTAqF-M3M1oCLiX8_eRhFwoiks_6uqVw18qPRYCplLTiMpxkcYfOQaZDttDdnz_TmXoVWkZTzuZQMKvq-K58p1ZCfO9zyPFx_g5odACZMGRa7UfdB_bLkWZqMxg"
                                        />
                                    </div>
                                    <div className="relative z-30 transform translate-x-4">
                                        <img alt="Mascot" className="object-contain h-96" src="/logo.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Vì sao nên dùng nền tảng của chúng tôi?</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto mb-16">Chúng tôi mang lại sự minh bạch và hiệu quả vượt trội cho ngành thu gom phế liệu truyền thống.</p>
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

                {/* Who is it for Section */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-widest uppercase">DÀNH CHO AI?</h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Chủ vựa */}
                            <div className="bg-white rounded-3xl p-2 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-green-50 w-1/3 flex items-center justify-center rounded-2xl">
                                    <img alt="Chủ vựa phế liệu icon" className="w-32 h-32" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK2EAk0VFx9079TGq7xXsDDVFH6V9isKczGWlqIOeDNPiGunWCsvEIHYU8hbkidIs-tYw3fVSM9AO01FQSOS3V803ZK5WgIU4QHOuVyFU9pREEhq3h6sbXHEjplESVN1NEOuDihEIcs4VFuPipP0sispRDsqbVcnMu2NIHmu4J0LfVNDBqprNFsAR-epouqlSQ9SbWGjhJhsEDbC-OPJujWLKRlJ9jHIfYlAVDaep4mlJV33LgzKgjI3XfR1jClj-_-w1wkgqUBME" />
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
                                    <button className="w-full py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors">Xem giải pháp</button>
                                </div>
                            </div>
                            {/* Doanh nghiệp */}
                            <div className="bg-white rounded-3xl p-2 flex overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-blue-50 w-1/3 flex items-center justify-center rounded-2xl">
                                    <img alt="Doanh nghiệp tái chế icon" className="w-32 h-32" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBcetz1_C5k8iqjhWhOEDxugZczeHgzLuQjrWbs22nByI3E5vE4B-nhBmRPKw6rTVUSxIkgVyeTIXZ_VBR63MOhgqapip_VS6SAmR8FJ_MOqtdzBXXWJdx2Kvl7WkZM2aB8BXQCOZFX7Ff_W3-Lci-zc5uk6dQmgJ5bAETa1ey1s_FGTe9G5ij4D-ow0SCMYbCx4QrOahkNaiNQmwvuwjy-8K1bMXpeDASbwmK0H5AaKey5vqOxeCgOFVU8RAnXhNoGgRlaeXW4fU" />
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
                                    <button className="w-full py-3 border border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-white transition-colors">Xem giải pháp</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Price Table Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Bảng giá phế liệu hôm nay</h2>
                                <p className="text-slate-500">Cập nhật lúc: 09:30 - 24/05/2024</p>
                            </div>
                            <div className="flex space-x-4">
                                <select className="rounded-xl border-slate-200 text-sm font-medium focus:ring-primary focus:border-primary">
                                    <option>Khu vực: Toàn quốc</option>
                                    <option>TP. Hồ Chí Minh</option>
                                    <option>Hà Nội</option>
                                </select>
                                <select className="rounded-xl border-slate-200 text-sm font-medium focus:ring-primary focus:border-primary">
                                    <option>Loại: Tất cả</option>
                                    <option>Kim loại</option>
                                    <option>Giấy / Nhựa</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Loại phế liệu</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Giá (VNĐ/kg)</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Xu hướng</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {[
                                        { name: 'Đồng cáp (Loại 1)', price: '185,000 - 230,000', trend: '5%', status: 'TĂNG GIÁ', up: true },
                                        { name: 'Sắt vụn', price: '12,000 - 18,000', trend: '2%', status: 'GIẢM GIÁ', up: false },
                                        { name: 'Giấy Carton', price: '4,500 - 8,000', trend: '1%', status: 'TĂNG NHẸ', up: true }
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-4 font-bold text-slate-800">{row.name}</td>
                                            <td className="px-6 py-4 text-primary font-bold">{row.price}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`font-bold flex items-center justify-center ${row.up ? 'text-green-500' : 'text-red-500'}`}>
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path clipRule="evenodd" d={row.up ? "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" : "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"} fillRule="evenodd"></path>
                                                    </svg> {row.trend}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${row.up ? 'bg-green-100 text-primary' : 'bg-red-100 text-red-600'}`}>{row.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* App Features Section */}
                <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-20"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">Trải nghiệm quản lý ngay trên bàn tay</h2>
                                <div className="space-y-10">
                                    {[
                                        { step: 1, title: 'Tạo đơn nhanh chóng', desc: 'Quét mã, nhập liệu nhanh và in biên lai trực tiếp từ điện thoại.' },
                                        { step: 2, title: 'Quản lý kho & Theo dõi tài xế', desc: 'Kiểm soát tồn kho và theo dõi lộ trình xe thu gom theo thời gian thực.' },
                                        { step: 3, title: 'Thống kê lợi nhuận', desc: 'Phân tích dòng tiền, báo cáo lãi lỗ tức thì theo ngày, tuần, tháng.' }
                                    ].map((feat, i) => (
                                        <div key={i} className="flex items-start">
                                            <div className="bg-primary/20 text-primary font-bold text-2xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">{feat.step}</div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                                                <p className="text-slate-400">{feat.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 flex space-x-4">
                                    <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-slate-100 transition-colors">
                                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 12c0 2.5-1.5 4.6-3.7 5.5l-1.3-3.1c1.1-.5 1.9-1.5 1.9-2.4 0-1.6-1.3-2.9-2.9-2.9s-2.9 1.3-2.9 2.9c0 .9.8 1.9 1.9 2.4l-1.3 3.1c-2.2-.9-3.7-3-3.7-5.5 0-3.3 2.7-6 6-6s6 2.7 6 6z"></path></svg>
                                        Tải App Store
                                    </button>
                                    <button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-colors">
                                        Trải nghiệm demo
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="pt-12">
                                        <img
                                            alt="App Screen 1"
                                            className="rounded-3xl border-4 border-slate-700 shadow-2xl"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfP11bjgl4gRSlj437wp-ACT5TFz6gavXS1-nxgEui9QwQ1UGJH3uIHtGCReXAWZk7IE39MJ6tKU8XzT1RY_rb5Mm2MIYGVH_gPZL9bI3LXwbNjhq30Khx_d9A_dCnbeeiytVBQ5Zucj8Sjo2sJZSgeh8idmcRX-CS4ZfZ_X6Vu1GwkXQh3C4h1L8ZrHSyAQkJZpT34QOD9G1qJUAGxCFj95dW3ZdtPjgtZNh_Tzu5lcq6FjZKT6CR60Bva_MhWbMKA0IxQpAw00I"
                                        />
                                    </div>
                                    <div>
                                        <img
                                            alt="App Screen 2"
                                            className="rounded-3xl border-4 border-slate-700 shadow-2xl"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxcskYO5h_YZaURBaaYf9CzA6PV0wCFgOqdUlvekkQeYluwfxnd7nZdpnSIkK_czkd7qUHyYCjc2RpgFHx78hCI83dubWle-JK6JpDpZShUgIBmviySi4IoDalsNaw1HbJKTTlzcrZdFX_ztMQ77fO_8MFlpalYVCdZfaqIYq7z7w-TbtwBo_Y-50kz6uArSqmigadqzAEWdWZsIxReFgQboouaI46L5XaduIhSnr-SPlhk3BlyQnZk5x-7xsgW91l8Kug04XIp2w"
                                        />
                                    </div>
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

export default LandingPage;
