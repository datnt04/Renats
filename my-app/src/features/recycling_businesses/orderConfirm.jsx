import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirm = () => {
    return (
        <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex flex-col">
            {/* ── HEADER ── */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <Link to="/recycle/dashboard">
                                <img alt="Re-Nats Logo" className="w-auto h-12 object-contain"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK91fcaHmansgwcmixnPW2Kj6N96BE_TB3pFnlNc65ME78ARU4vT0E3i8Kg6UL1wU_n4_Jer0PoE7HlEYEUJK1ZPO35sLjnBf4WilVM4X6DdRfRJrMK2Jhdz9VEJChq0rMRTLR5lKyAy_zh0owPeKq2Z5cJ51_D_2Ti9RvtVlyuvFAgvgCW9gJ0gxogd3eKqpxFUbCIE5NBkhPl6yAB78IAUV21kEKZNKfRmUUv-2yBO5zvsteDFlVgfwFKyCe7u0Aj2jRGz1ZcZk" />
                            </Link>
                            <div className="hidden md:block h-6 w-px bg-slate-300"></div>
                            <span className="text-slate-500 font-medium text-sm hidden md:block">Marketplace</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-700">Nguyễn Văn A</p>
                                    <p className="text-xs text-slate-500">Quản lý thu mua</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                                    <img alt="User Avatar" className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaOCJwjx5wu3GBVvPbHGqRWTMvqp2cVmKcT3ZJXTmEXviBbRz6psQfBkbZ9ADlhfUbC73qaF7xnmSpF-3MO2fvGDqzDurffZe_bE8je3JtW6kR2CsjeeNIytNJKPKzgd58IQYGRoEwxNLbUjuRpAL7l4bfdO0HZ81BzZh_NAnl8qo0xrVzU0JEAypiGXsnHkdrYJYEYi99QCQJ-P2Hrde_FzoqRQDpuZUep0kuuJy_IZ83Cjulj1wZi4Vq4VuVcRMF-EJsKfvz988" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <Link className="inline-flex items-center text-slate-500 hover:text-primary mb-4 transition-colors" to="/recycle/market">
                        <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
                        Quay lại danh sách
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Xác nhận Đơn hàng</h1>
                    <p className="text-slate-500 mt-2">Vui lòng kiểm tra chất lượng lô hàng qua hình ảnh thực tế trước khi xác nhận.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                                Thông tin lô hàng
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-slate-100">
                                <div
                                    className="w-full sm:w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 shrink-0">
                                    <span className="material-symbols-outlined text-5xl text-slate-300">recycling</span>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Giấy carton hỗn hợp (OCC)</h3>
                                        <p className="text-slate-500 text-sm">Mã lô: #BATCH-8821</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span
                                            className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium border border-blue-100">Độ
                                            ẩm &lt; 12%</span>
                                        <span
                                            className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium border border-green-100">Đã
                                            kiểm định</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div>
                                            <span className="text-xs text-slate-500 uppercase font-semibold">Khối lượng</span>
                                            <p className="text-lg font-bold text-slate-800">5,000 kg</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 uppercase font-semibold">Đơn giá cố định</span>
                                            <p className="text-lg font-bold text-primary">3,200 đ/kg</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center text-sm">
                                <span className="text-slate-500">Nhà cung cấp:</span>
                                <span className="font-semibold text-slate-900">Vựa phế liệu Minh Khôi</span>
                            </div>
                            <div className="mt-2 flex justify-between items-center text-sm">
                                <span className="text-slate-500">Địa chỉ kho:</span>
                                <span className="font-medium text-slate-700">123 QL1A, Bình Hưng Hòa, Bình Tân, TP.HCM</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">photo_library</span>
                                Hình ảnh thực tế lô hàng
                            </h2>
                            <div className="space-y-4">
                                <div
                                    className="relative w-full aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group cursor-pointer">
                                    <img alt="Recycled Paper Bales Large"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtQo_BXLTCb7oQmjrGu166gQf9vcKoMtG_l_vj0srHle8_RiRGoVAD3an26lfGqWsNUxx2K3CiVIqs8GCKXlorB5u380ylN_YH34MZDNqffezCHv2sS-2Bya07Wq6nlhdO_d68qoJG7YW53ctPoD-KT2AqZjmyiWNH1NWMqaM6P380hKnHvhyYTbSyFyBNCuZBSnuR_Xc0BH23J8N4zvVHs9SnSZ1HuNzTpmbB1QD-hRkkbwrflSXjqRYZser0-Jcdb-PIgDBoEcU" />
                                    <div
                                        className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                        Xem chi tiết
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    <button
                                        className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary ring-2 ring-primary/20 transition-all">
                                        <img alt="Thumbnail 1" className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNHjwbA_x11KFKbWeXiaIKCUPNFvo5l0HW-ruO6VAH4WUWfaouCL90HzNj5wXJzPKjZbIk5I7AEnI0I1Uje5DyDQ8Ic0wM3tWfb9K0x_0dGcyeyOUqDwsOg3AZx8pKjQEEALHRwcr8-L2nqFnXZQEyV3hv0tH8KGqrYEUBzFtFmxUtgztTxENzxQOOo5yc4zTvEHjcG8ocZKPCzj6JQTFOdUYjlBa3eS9ILQXEY7Oxyb-Aoe01ZmSO5Qv2SsYrhD-MoFk3bYyzfc" />
                                    </button>
                                    <button
                                        className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-primary transition-all opacity-70 hover:opacity-100">
                                        <img alt="Thumbnail 2" className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB67j6yamWiaW1EljQYNXivw1_io8quPHaJbWDQFxIB1ahbFCluJ6CvF49a-w8KTWtS1e2KGeHAtVQ5YoTjKUXtgz5bHffbgc29YlWHf6ahcUFr_5GbBVO_u1rFeLEY4RmeG-ArGRAwcHg26_24gTzhdhJrxOLBD2M7zdJdngilDAHT2SssGeiSJ4va5uyuUzVwkK73P2LvSrb7PMd5RSsUYiklCKjEXwPSZxiQ2B6N3dbQGFWu6KThaaTXByDdIXAs5HejtR4eidI" />
                                    </button>
                                    <button
                                        className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-primary transition-all opacity-70 hover:opacity-100">
                                        <img alt="Thumbnail 3" className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHfjhsZWw-NXKpfil4Tjj64fiOxPZVRB4e7lLNSHAhU8jE4YZjSid6Ob8-Q3ft8xBDXDuIGhHgdoNBI_CYD0XIUE-YPCYOjnJgDbn4mX316Cy1FCqkiBAYXiVP7LHXRlKEuuUcYF3w1cpSAa-eFRkHhfRNT0euRiini5NIKwIlXrl6_VoGQSaZwvjZkMZW39PAYorZvOQop2IZ7VD8DNPiOT52FlF9vZzFLS320Wa8ExiEJ3BjOxtdC7NVu7McD9tUOXuHwH93DgI" />
                                    </button>
                                    <button
                                        className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 hover:border-primary transition-all opacity-70 hover:opacity-100 group">
                                        <img alt="Thumbnail 4" className="w-full h-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_uSWgpatkzFf7WaMBbSSZ848alLsO8z9eEqfpYBb0XcLEUgapaATnmujzxgURkwfEQt-m74LKcyyWBaP7CKxWObHkyMhTfQiYHbfXL7SsSd2YdR8nY_RL_5NGv5uIxyu79-MpOMZ2LjOonC-qknpmU4fxAFbQPxYD6yWsDEE02XT-KSVHh3fQhe6wpC3SiJdI8WKLO0TYl3-zntOe4DavpU4uUwRBepsyPNnVamk_8eXJCsfTTF5aNwGPXBmwuFz1q86IZjrq-1U" />
                                        <div
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                            <span className="text-white font-bold text-lg">+3</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-slate-400 mt-0.5 text-lg">verified</span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">Hình ảnh được chụp xác thực tại kho</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Ngày chụp: 24/05/2024 - 09:30 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Billing Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Tổng cộng ước tính</h3>
                                <div className="space-y-3 pb-6 border-b border-slate-100 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Giá trị hàng hóa</span>
                                        <span className="font-medium text-slate-900">16,000,000 đ</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Phí vận chuyển</span>
                                        <span className="font-medium text-slate-900">--</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Phí dịch vụ</span>
                                        <span className="font-medium text-slate-900">Miễn phí</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-baseline mb-8">
                                    <span className="text-base font-bold text-slate-700">Thành tiền</span>
                                    <span className="text-2xl font-bold text-primary">16,000,000 đ</span>
                                </div>
                                <Link
                                    to="/recycle/dashboard"
                                    className="w-full bg-primary hover:bg-secondary text-white py-4 px-6 rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                                    Xác nhận &amp; Gửi yêu cầu
                                    <span
                                        className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Link>
                                <p className="text-xs text-slate-400 text-center mt-4">
                                    Bằng việc xác nhận, bạn đồng ý với <a className="text-primary hover:underline" href="#">Điều khoản mua
                                        hàng</a> của ReNats.
                                </p>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                                <span className="material-symbols-outlined text-blue-600 shrink-0 mt-0.5">info</span>
                                <div>
                                    <p className="text-sm font-semibold text-blue-800">Lưu ý quan trọng</p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Số lượng thực tế sẽ được xác nhận khi cân hàng tại trạm cân nhà máy. Thanh toán sẽ dựa trên khối lượng
                                        thực tế.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderConfirm;
