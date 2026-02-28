import React from 'react';

const EprReport = () => {
    return (
        <div className="font-sans text-slate-900 overflow-x-hidden bg-slate-50">
            <style>{`
        .hero-mesh-gradient {
          background-color: #f8fafc;
          background-image:
            radial-gradient(at 0% 0%, hsla(142, 46%, 34%, 0.15) 0px, transparent 50%),
            radial-gradient(at 100% 0%, hsla(199, 89%, 48%, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, hsla(142, 46%, 34%, 0.05) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(199, 89%, 48%, 0.1) 0px, transparent 50%);
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }
      `}</style>

            {/* Header */}
            <header className="sticky-header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0">
                            <img
                                alt="Re-Nats Logo"
                                className="w-auto h-16 object-contain"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7UeUxAEytMulzlX99kckdkUZjKnBqs8dGFEnNex-sheKDWeWA_E_kAtp4ogPy8t8dSrLwCzq81Nt7hBDEhF0zgplLP1QEM_d_C87UYQPLnQMqs1xBfrEN1kr-eMvxN_eVvlLYDZd49W6XFqMrQJw77jCXQxv7ia7JOOhelX1OmeSYszOEDv2GQHDzgAJ1yiRNgL2dl4cf5zHo90t6yedVW1wRO_nxm34SUmpf_YcuAfwiTKMEEtW-q2znEc3RkP1v9MiPPxaik6s"
                            />
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Trang chủ</a>
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Dịch vụ</a>
                            <a className="text-sm font-semibold text-primary transition-colors" href="#">Báo cáo &amp; Dữ liệu</a>
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Tin tức</a>
                            <a className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors" href="#">Liên hệ</a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                                <span className="text-sm font-medium text-slate-600 text-right hidden sm:block">
                                    Xin chào,<br /><span className="font-bold text-slate-900">Nguyễn Văn A</span>
                                </span>
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-primary font-bold">
                                    NV
                                </div>
                            </div>
                            <button className="text-slate-500 hover:text-red-600 transition-colors">
                                <span className="material-symbols-outlined">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="min-h-screen pb-20">
                {/* Page Hero */}
                <div className="hero-mesh-gradient border-b border-slate-200/60">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        EPR Compliance
                                    </span>
                                    <span className="text-slate-400 text-sm">/ Quản lý dữ liệu</span>
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lịch sử Giao dịch &amp; Báo cáo EPR</h1>
                                <p className="mt-2 text-slate-600 max-w-2xl">
                                    Theo dõi chi tiết các giao dịch thu gom và xuất báo cáo môi trường tuân thủ quy định EPR (Extended Producer Responsibility).
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="inline-flex items-center px-4 py-2.5 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-all">
                                    <span className="material-symbols-outlined mr-2 text-green-600 text-[20px]">table_view</span>
                                    Xuất Excel
                                </button>
                                <button className="inline-flex items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:bg-secondary focus:outline-none transition-all shadow-green-200 shadow-lg">
                                    <span className="material-symbols-outlined mr-2 text-[20px]">description</span>
                                    Tải Báo cáo Môi trường (PDF)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center">
                            <div className="p-3 rounded-lg bg-green-50 text-green-600 mr-4">
                                <span className="material-symbols-outlined text-3xl">eco</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Tổng khối lượng sạch</p>
                                <p className="text-2xl font-bold text-slate-900">48,250 <span className="text-sm font-normal text-slate-500">kg</span></p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center">
                            <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
                                <span className="material-symbols-outlined text-3xl">recycling</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Tỷ lệ tái chế</p>
                                <p className="text-2xl font-bold text-slate-900">94.5 <span className="text-sm font-normal text-slate-500">%</span></p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-center">
                            <div className="p-3 rounded-lg bg-orange-50 text-orange-600 mr-4">
                                <span className="material-symbols-outlined text-3xl">payments</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Tổng giá trị thu mua</p>
                                <p className="text-2xl font-bold text-slate-900">1.2 <span className="text-sm font-normal text-slate-500">Tỷ VNĐ</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        {/* Toolbar */}
                        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center whitespace-nowrap">
                                <span className="material-symbols-outlined mr-2 text-slate-400">history</span>
                                Danh sách giao dịch
                            </h3>
                            <div className="flex flex-wrap gap-3 items-center w-full xl:w-auto xl:justify-end">
                                <div className="relative w-full sm:w-auto min-w-[160px]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">calendar_month</span>
                                    </div>
                                    <select className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-primary focus:border-primary block w-full">
                                        <option>Tháng 5, 2024</option>
                                        <option>Tháng 4, 2024</option>
                                        <option>Tháng 3, 2024</option>
                                    </select>
                                </div>
                                <div className="relative w-full sm:w-auto min-w-[180px]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">category</span>
                                    </div>
                                    <select className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-primary focus:border-primary block w-full">
                                        <option>Tất cả loại liệu</option>
                                        <option>Nhựa HDPE</option>
                                        <option>Nhựa PET</option>
                                        <option>Giấy Carton</option>
                                        <option>Nhôm</option>
                                    </select>
                                </div>
                                <div className="relative w-full sm:w-auto min-w-[200px]">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">storefront</span>
                                    </div>
                                    <select className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-primary focus:border-primary block w-full">
                                        <option value="">Lọc theo Tên Vựa/Agency</option>
                                        <option value="vua-minh-tam">Vựa Phế Liệu Minh Tâm</option>
                                        <option value="htx-moi-truong-xanh">HTX Môi Trường Xanh</option>
                                        <option value="vua-minh-khoi">Vựa Minh Khôi</option>
                                        <option value="dai-ly-thanh-dat">Đại Lý Thu Gom Thành Đạt</option>
                                    </select>
                                </div>
                                <div className="relative w-full sm:w-auto flex-grow xl:flex-grow-0">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                                    </div>
                                    <input
                                        className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-primary focus:border-primary block w-full sm:w-64"
                                        placeholder="Tìm kiếm mã GD..."
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Mã Giao Dịch</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Ngày &amp; Giờ</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Đơn Vị Thu Gom (Agency)</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Loại Vật Liệu</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">KL Sạch (kg)</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Thành Tiền (VNĐ)</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Trạng Thái EPR</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-primary">#TXN-88210</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">24/05/2024</div>
                                            <div className="text-xs text-slate-500">09:45 AM</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-3">V1</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">Vựa Phế Liệu Minh Tâm</div>
                                                    <div className="text-xs text-slate-500">Q. Bình Thạnh, TP.HCM</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">Nhựa PET</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-900">1,250.5</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900">15,631,250</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>Đạt Chuẩn
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-primary">#TXN-88209</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">24/05/2024</div>
                                            <div className="text-xs text-slate-500">08:15 AM</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs mr-3">V2</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">HTX Môi Trường Xanh</div>
                                                    <div className="text-xs text-slate-500">Q. 7, TP.HCM</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100">Giấy Carton</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-900">4,100.0</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900">18,450,000</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>Đạt Chuẩn
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-primary">#TXN-88208</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">23/05/2024</div>
                                            <div className="text-xs text-slate-500">16:30 PM</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs mr-3">V3</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">Đại Lý Thu Gom Thành Đạt</div>
                                                    <div className="text-xs text-slate-500">TP. Thủ Đức</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-200">Nhôm Lon</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-900">520.5</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900">19,258,500</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>Chờ Duyệt
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-primary">#TXN-88207</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">23/05/2024</div>
                                            <div className="text-xs text-slate-500">14:10 PM</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-3">V1</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">Vựa Phế Liệu Minh Tâm</div>
                                                    <div className="text-xs text-slate-500">Q. Bình Thạnh, TP.HCM</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">Nhựa HDPE</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-900">890.0</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900">8,900,000</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1.5"></span>Đạt Chuẩn
                                            </span>
                                        </td>
                                    </tr>
                                    {/* Row 5 */}
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-primary">#TXN-88206</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">22/05/2024</div>
                                            <div className="text-xs text-slate-500">10:00 AM</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs mr-3">V2</div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-900">HTX Môi Trường Xanh</div>
                                                    <div className="text-xs text-slate-500">Q. 7, TP.HCM</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-50 text-red-700 border border-red-100">Pin Cũ</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-900">120.0</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900">2,400,000</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>Cần Xử Lý
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-slate-700">
                                        Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">5</span> của <span className="font-medium">128</span> kết quả
                                    </p>
                                </div>
                                <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50" href="#">
                                        <span className="sr-only">Previous</span>
                                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                                    </a>
                                    <a aria-current="page" className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">1</a>
                                    <a className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">2</a>
                                    <a className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium" href="#">3</a>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">...</span>
                                    <a className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium" href="#">8</a>
                                    <a className="bg-white border-slate-300 text-slate-500 hover:bg-slate-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" href="#">9</a>
                                    <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50" href="#">
                                        <span className="sr-only">Next</span>
                                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white pt-10 pb-8 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <img
                                alt="Logo"
                                className="mb-4 h-12 w-auto object-contain"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIZfhhP-u2CXQYMl3s3pqNUtQxoXs5goaRe9m-ii4WaJAhp2thGbaIIiPmWDVKW3sygjrarHBZ26wmNnxgwdhScNZngJYQzPmoXf6bKLItOzA6TTYMgYpw1ji5SHLct9E4voqxNyBeBnCQopHJ3hUXCklM-Sd_q22IpQl6wGMYnoao4pL79k8pA1vp9p5_CuLLI0twg0V7E0ckTLWlmBxUpUZTx4pKsYVftpxlGXNYhY3z_Mu59aNCZObcugSnRncRcWyd_2SWmUQ"
                            />
                            <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                Nền tảng số hóa ngành phế liệu hàng đầu Việt Nam. Minh bạch, hiệu quả, bền vững.
                            </p>
                            <div className="flex space-x-3">
                                <a className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">
                                    <span className="text-xs font-bold">FB</span>
                                </a>
                                <a className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">
                                    <span className="text-xs font-bold">IN</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase">Sản phẩm</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><a className="hover:text-primary" href="#">Phần mềm quản lý vựa</a></li>
                                <li><a className="hover:text-primary" href="#">Ứng dụng thu gom</a></li>
                                <li><a className="hover:text-primary" href="#">Cổng doanh nghiệp</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase">Hỗ trợ</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><a className="hover:text-primary" href="#">Trung tâm trợ giúp</a></li>
                                <li><a className="hover:text-primary" href="#">Hướng dẫn EPR</a></li>
                                <li><a className="hover:text-primary" href="#">Điều khoản sử dụng</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase">Liên hệ</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li className="flex items-start">
                                    <span className="material-symbols-outlined text-primary text-sm mr-2 mt-0.5">location_on</span>
                                    <span>Q.9, TP. HCM</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="material-symbols-outlined text-primary text-sm mr-2">call</span>
                                    <span>1900 123 456</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="material-symbols-outlined text-primary text-sm mr-2">mail</span>
                                    <span>contact@vechai.vn</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 mt-8 pt-8 text-center text-xs text-slate-400">
                        <p>© 2024 Ve Chai Công Nghệ (Re-Nats Platform). All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EprReport;
