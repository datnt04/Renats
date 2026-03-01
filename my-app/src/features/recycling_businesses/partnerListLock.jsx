import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDoanhNghiep from '../../components/layout/header_doanhNghiep/headerDoanhNghiep';

// isPremium={true}  → Hiển thị bảng đầy đủ (đã mua Premium)
// isPremium={false} → Bảng bị blur + overlay kêu gọi mua Premium
const PartnerList = ({ isPremium = false }) => {
    const navigate = useNavigate();
    return (
        <div className="font-sans text-slate-900 overflow-x-hidden bg-slate-50 min-h-screen">
            <style>{`
        .locked-blur {
          filter: blur(6px);
          user-select: none;
          pointer-events: none;
        }
      `}</style>

            {/* Header dùng chung */}
            <HeaderDoanhNghiep activeTab="partners" />

            {/* Main Section */}
            <section className="relative py-12 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">

                    {/* Page Header */}
                    <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900">Danh bạ Đại lý Uy tín (Top 90+)</h1>
                            <p className="text-slate-500 mt-2">Danh sách các đại lý tái chế được xác thực bởi ReNats.</p>
                        </div>

                        {isPremium ? (
                            /* Toolbar đầy đủ khi Premium */
                            <div className="flex space-x-3">
                                <div className="relative">
                                    <input
                                        className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-primary focus:border-primary w-64"
                                        placeholder="Tìm kiếm đại lý..."
                                        type="text"
                                    />
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
                                </div>
                                <button className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium flex items-center transition-colors">
                                    <span className="material-symbols-outlined mr-2 text-lg">filter_list</span>Bộ lọc
                                </button>
                                <button className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium flex items-center transition-colors">
                                    <span className="material-symbols-outlined mr-2 text-lg">download</span>Xuất Excel
                                </button>
                            </div>
                        ) : (
                            /* Toolbar bị disabled khi chưa Premium */
                            <div className="flex space-x-3 opacity-50">
                                <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium">Bộ lọc</button>
                                <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium">Xuất Excel</button>
                            </div>
                        )}
                    </div>

                    {/* Table - blur nếu chưa Premium */}
                    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${!isPremium ? 'locked-blur' : ''}`}>
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider" scope="col">Tên Kho</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider" scope="col">Loại vật liệu</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider" scope="col">Sản lượng/tháng</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider" scope="col">Điểm Trust Score</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider" scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {[
                                    { initial: 'A', color: 'blue', name: 'An Khang Recycling', city: 'TP. Hồ Chí Minh', tags: [{ label: 'Đồng cáp', color: 'orange' }, { label: 'Nhôm', color: 'slate' }], volume: '120 Tấn', score: '98/100', scoreColor: 'green' },
                                    { initial: 'V', color: 'purple', name: 'Vạn Phát Hưng', city: 'Bình Dương', tags: [{ label: 'Sắt thép', color: 'blue' }], volume: '500 Tấn', score: '95/100', scoreColor: 'green' },
                                    { initial: 'T', color: 'green', name: 'Thành Đạt Group', city: 'Đồng Nai', tags: [{ label: 'Nhựa HDPE', color: 'yellow' }, { label: 'Giấy', color: 'slate' }], volume: '350 Tấn', score: '92/100', scoreColor: 'green' },
                                    { initial: 'M', color: 'red', name: 'Minh Long Plastic', city: 'Long An', tags: [{ label: 'Nhựa PET', color: 'gray' }], volume: '200 Tấn', score: '91/100', scoreColor: 'green' },
                                    { initial: 'H', color: 'indigo', name: 'Hoàng Gia Metal', city: 'Bà Rịa - Vũng Tàu', tags: [{ label: 'Đồng', color: 'orange' }, { label: 'Inox', color: 'gray' }], volume: '180 Tấn', score: '89/100', scoreColor: 'orange' },
                                    { initial: 'P', color: 'teal', name: 'Phú Mỹ Xanh', city: 'Tiền Giang', tags: [{ label: 'Hỗn hợp', color: 'green' }], volume: '600 Tấn', score: '94/100', scoreColor: 'green' },
                                    { initial: 'B', color: 'pink', name: 'Bình Minh Plastic', city: 'Cần Thơ', tags: [{ label: 'Nhựa PP', color: 'red' }], volume: '280 Tấn', score: '85/100', scoreColor: 'orange' },
                                    { initial: 'T', color: 'cyan', name: 'Tân Tiến Steel', city: 'Đà Nẵng', tags: [{ label: 'Thép phế', color: 'gray' }], volume: '900 Tấn', score: '99/100', scoreColor: 'green' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`h-10 w-10 flex-shrink-0 rounded-full bg-${row.color}-100 flex items-center justify-center text-${row.color}-600 font-bold shadow-sm border border-${row.color}-200`}>
                                                    {row.initial}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-slate-900">{row.name}</div>
                                                    <div className="text-xs text-slate-500 flex items-center mt-0.5">
                                                        <span className="material-symbols-outlined text-[14px] mr-1">location_on</span>
                                                        {row.city}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {row.tags.map((tag, j) => (
                                                <span key={j} className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${tag.color}-100 text-${tag.color}-800 border border-${tag.color}-200 ${j > 0 ? 'ml-1' : ''}`}>
                                                    {tag.label}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{row.volume}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-${row.scoreColor}-100 text-${row.scoreColor}-700 border border-${row.scoreColor}-200`}>
                                                {row.score}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => navigate('/nha-may/doi-tac/' + (i + 1))}
                                                className="text-primary hover:text-secondary bg-green-50 hover:bg-green-100 px-4 py-2 rounded-lg transition-colors">Xem chi tiết</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination - chỉ hiện khi Premium */}
                    {isPremium && (
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-slate-500">Hiển thị 8 trong tổng số 92 đại lý</div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-slate-600 text-sm disabled:opacity-50">Trước</button>
                                <button className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-secondary">1</button>
                                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-slate-600 text-sm">2</button>
                                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-slate-600 text-sm">3</button>
                                <span className="px-2 text-slate-500">...</span>
                                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-slate-600 text-sm">12</button>
                                <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-slate-600 text-sm">Sau</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lock Overlay - chỉ hiện khi chưa Premium */}
                {!isPremium && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-green-300"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full opacity-50 blur-2xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 blur-2xl"></div>

                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <span className="material-symbols-outlined text-4xl text-primary">lock</span>
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                                Mở khóa danh sách <span className="text-primary">Đại lý Uy tín</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                Tiết kiệm hàng triệu đồng nhờ tránh được phế liệu lẫn tạp chất. <br />
                                Truy cập Top 90+ Đại lý có Điểm Tin cậy cao.
                            </p>
                            <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
                                <li className="flex items-center text-slate-700">
                                    <span className="material-symbols-outlined text-green-500 mr-3 text-xl">check_circle</span>
                                    <span className="font-medium">Lịch sử hoạt động đã xác minh</span>
                                </li>
                                <li className="flex items-center text-slate-700">
                                    <span className="material-symbols-outlined text-green-500 mr-3 text-xl">check_circle</span>
                                    <span className="font-medium">Thông tin liên hệ trực tiếp</span>
                                </li>
                                <li className="flex items-center text-slate-700">
                                    <span className="material-symbols-outlined text-green-500 mr-3 text-xl">check_circle</span>
                                    <span className="font-medium">Kênh hỗ trợ ưu tiên</span>
                                </li>
                            </ul>
                            <button
                                onClick={() => navigate('/nha-may/premium')}
                                className="w-full sm:w-auto bg-primary hover:bg-secondary text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1">
                                Mua gói Premium
                            </button>
                            <p className="mt-4 text-xs text-slate-400">Thanh toán an toàn qua Stripe • Hủy bất kỳ lúc nào</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default PartnerList;
