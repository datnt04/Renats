import React from 'react';
import HeaderDoanhNghiep from '../../components/layout/header_doanhNghiep/headerDoanhNghiep';
import { useNavigate } from 'react-router-dom';

const EprInforOrder = () => {
    const navigate = useNavigate();
    return (
        <div className="font-sans text-slate-900 bg-slate-50 overflow-x-hidden min-h-screen flex flex-col">
            <style>{`
        .timeline-line::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 15px;
          width: 2px;
          background-color: #e2e8f0;
          z-index: 0;
        }
      `}</style>

            {/* Redesigned Premium Unified Header */}
            <HeaderDoanhNghiep activeTab="report" />

            {/* Main */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <button
                    onClick={() => navigate('/nha-may/bao-cao-epr')}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-green-700 font-bold text-xs mb-6 transition-colors focus:outline-none cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Quay lại danh sách báo cáo
                </button>

                {/* Page Title */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900">Giao dịch #TXN-88210</h1>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                Hoàn thành
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                Đã xác thực EPR
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm">
                            Thu gom từ: <span className="font-semibold text-slate-700">Vựa Minh Khôi</span> • Ngày: 24/10/2023
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm border border-slate-300 flex items-center gap-2 transition-colors">
                            <span className="material-symbols-outlined text-xl">print</span>
                            In Phiếu
                        </button>
                        <button className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors">
                            <span className="material-symbols-outlined text-xl">download</span>
                            Tải Hồ sơ EPR (PDF)
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* KCS Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">receipt_long</span>
                                    Phiếu Cân Điện Tử KCS
                                </h3>
                                <span className="text-xs font-mono text-slate-500">REF: KCS-2023-88210</span>
                            </div>
                            <div className="p-6">
                                {/* Weight Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Loại vật liệu</p>
                                        <p className="text-lg font-bold text-slate-800">Nhựa PET</p>
                                        <p className="text-xs text-slate-400">Phế liệu sạch</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Trọng lượng tổng</p>
                                        <p className="text-lg font-bold text-slate-800">2,450 kg</p>
                                        <p className="text-xs text-slate-400">Xe + Hàng</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Trọng lượng bì</p>
                                        <p className="text-lg font-bold text-slate-800">450 kg</p>
                                        <p className="text-xs text-slate-400">Xe rỗng</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Thực nhận</p>
                                        <p className="text-2xl font-bold text-primary">2,000 kg</p>
                                        <p className="text-xs text-green-600 font-medium">Đạt chuẩn 98%</p>
                                    </div>
                                </div>

                                {/* Vehicle Info + Signature */}
                                <div className="border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-3">Thông tin phương tiện</p>
                                        <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                                            <span className="text-slate-500">Biển số xe:</span>
                                            <span className="font-medium">59C-123.45</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                                            <span className="text-slate-500">Tài xế:</span>
                                            <span className="font-medium">Trần Văn B</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-1 border-b border-slate-50">
                                            <span className="text-slate-500">Giờ vào:</span>
                                            <span className="font-medium">08:30 AM</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-1">
                                            <span className="text-slate-500">Giờ ra:</span>
                                            <span className="font-medium">09:15 AM</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700 mb-3">Chữ ký điện tử</p>
                                        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-4 h-32 flex items-center justify-center relative">
                                            <img
                                                alt="Electronic Signature"
                                                className="max-h-20 opacity-70"
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3oq9L-O1rTv_0ltugkIPjJV9vcf98CPRgh3x4kMIwCnf1fxQffEEc-Jgmo_V9b1NDi4TOB8U7NcaotdnCBhkNgWAqCEmIzAbwN-NqB_ERVfJ_dhRhQvAXCXdCZDC13G1gGiw3NEFBTR2rE2_nSsSS-7oMu7wLygpQ0cljTznPTNINe__5KD0EpvK_5T-ll_pgQPefKuKWl-ozGK4iJ645wpH_RKsDl3VoTEFizvwovweSn8q5YLqpDml5lw6qkQntP8EI2DAchjw"
                                            />
                                            <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                                Đã xác thực
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2 text-center">Được ký bởi: Nguyễn Văn A (KCS Manager)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Photo Gallery */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <div className="px-6 py-4 border-b border-slate-200">
                                <h3 className="font-bold text-slate-800">Hình ảnh Nghiệm thu</h3>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3XlTaCNLcbPI6ZqPHuf7E-NFw5_wGHLhR-g4LXfEIthT85eFHU8YQoJDdINfPcQJs2cZz-CRi22gszMd-anr_iJcscWlIqIP7v-bw5v4f7FWIXp6gyfejkoxhKrcu3C43LhlOqbE-PCMjgkolowjAS6YH3DwiMHxsNlNyNMK1opXZ7cQ_y_S2SpeQl1w7OLDLdrvSWTHZzELhq13Q6Jd_a9kufWVTq12CK814b1_Gmt_ky2lNJ5JZD4G7cxC-G2GF-kgxmiNME5s', label: 'Cân xe', alt: 'Truck Weighing' },
                                        { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEt8MePT19w-vtg_B5Q_H2IV41i4P-D-h3VaKXlK2fC1AsfpTnXRvN0Z_5qeLoUKPJ1NDV6TSBDQ2PBLLRQ067HMJiuOF2tPjuU0h_zS4bvhDo7H-9aMoP848Sp_WgpdWsTdrlyJSFFMSrb5uFhBb3Y5khV3nVXmvac38pDftdks2rfN6MP7lDh6q2J-xdSxj206vcFI29kIH-M56Vahm__yFEanx1SMpV4dTRUWao8dlf_kVkzDD4P_taMFuF9re5ZDNZ8o0z5fQ', label: 'Kiểm hàng', alt: 'Material Inspection' },
                                        { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9FDCyyfrIOf6xWku609hHydCNlchLqUJZkQZx6UOL4JYwH0BP6Q0kRZhN-PMDVCcVy7PrQx_xHl4c2q9lNoErmHKT7-SY8AXCjfGGx3Dz8QDx9e68_5J71wf77lsObPBs1XEZa6L3J9iBwRIS8HxKfsrhaQipPwcnWAeCK7ZPyvfqERpEmp5KNQWLlo6ILfJrAbXjmI0hJeq4E024mYnwhveV1_RuEea12D-kj8qPGLXhi81XdiKLPlMBKYDp_Km5Ehj5n2wa4Ag', label: 'Xuống hàng', alt: 'Unloading' },
                                        { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuJZfC3F6UIIItMiueMUmQLKc7zm9HdliyRYX3nIPqAS2S6tRyDee6OXyQUoGm1txRcFL7tmuvGHL1grbNQlo-5zW_g5jMZuKqL6yv-vu8QRnFJiOQvfgqiXC1Bnnl-1sucHpvU164zzoUu_eaZ-dFuWLmCstOwweIG1_OuOB_bfwvSx9z50azIi6G_PJPwWzKQYVEMYnqFfzKNxSfXq7m5uqLrC73vGH7DmwvSD4vmY0QgEqmKVkrrKEi_-gcUlzIjQhto8DiWh8', label: 'Tạp chất', alt: 'Contaminant Check' },
                                    ].map((photo, i) => (
                                        <div key={i} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer">
                                            <img
                                                alt={photo.alt}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                src={photo.src}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">visibility</span>
                                            </div>
                                            <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">{photo.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* E-Invoice Banner */}
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                                    <span className="material-symbols-outlined text-2xl">description</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Hóa đơn điện tử (E-Invoice)</h3>
                                    <p className="text-sm text-slate-500 mb-1">
                                        Mã tra cứu: <span className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-100 text-indigo-600">INV-230091</span>
                                    </p>
                                    <p className="text-xs text-slate-400">Phát hành ngày 24/10/2023 - 10:45 AM</p>
                                </div>
                            </div>
                            <button className="w-full sm:w-auto px-4 py-2 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-medium rounded-lg text-sm shadow-sm flex items-center justify-center gap-2 transition-colors">
                                <span className="material-symbols-outlined">download</span>
                                Tải về PDF
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Timeline */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
                            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400">history</span>
                                Tiến trình xử lý
                            </h3>
                            <div className="relative timeline-line space-y-8 pl-2">
                                {[
                                    { icon: 'shopping_cart', color: 'green', title: 'Tạo đơn hàng', time: '23/10/2023 - 14:30', desc: 'Đơn hàng thu gom được tạo tự động từ hệ thống.' },
                                    { icon: 'local_shipping', color: 'green', title: 'Xe đến nhà máy', time: '24/10/2023 - 08:30', desc: 'Check-in tại cổng số 2.' },
                                    { icon: 'scale', color: 'green', title: 'Cân & Kiểm định (QC)', time: '24/10/2023 - 09:15', desc: 'Hoàn tất kiểm định chất lượng. Tỷ lệ tạp chất 2%.' },
                                    { icon: 'payments', color: 'blue', title: 'Thanh toán hoàn tất', time: '24/10/2023 - 10:30', desc: 'Đã chuyển khoản thành công đến Vựa Minh Khôi.', ring: true },
                                ].map((step, i) => (
                                    <div key={i} className="relative pl-8 z-10">
                                        <div className={`absolute left-0 top-1 w-8 h-8 rounded-full bg-${step.color}-100 border-2 border-white shadow-sm flex items-center justify-center${step.ring ? ` ring-2 ring-${step.color}-50` : ''}`}>
                                            <span className={`material-symbols-outlined text-${step.color}-600 text-sm`}>{step.icon}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800">{step.title}</span>
                                            <span className="text-xs text-slate-500">{step.time}</span>
                                            <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Final EPR step */}
                                <div className="relative pl-8 z-10">
                                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-md flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-sm">assignment_turned_in</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-primary">Ghi nhận hồ sơ EPR</span>
                                        <span className="text-xs text-slate-500">24/10/2023 - 10:45</span>
                                        <p className="text-xs text-slate-400 mt-1">Dữ liệu đã được đồng bộ lên hệ thống quốc gia.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="mt-8 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-700 uppercase mb-3">Thông tin liên hệ</h4>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">MK</div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">Vựa Minh Khôi</p>
                                        <p className="text-xs text-slate-500">0909 123 456</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/nha-may/doi-tac/1')}
                                    className="w-full mt-2 text-xs text-primary font-semibold border border-primary/20 bg-white py-1.5 rounded hover:bg-primary/5 transition-colors cursor-pointer"
                                >
                                    Xem hồ sơ nhà cung cấp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EprInforOrder;
