import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { transportService } from '../../services/transportService';
import { useToast } from '../../context/ToastContext';

const styles = `
  .driver-card {
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .map-btn {
    background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
    border: 2px solid #e5e7eb;
    transition: all 0.2s;
  }

  .map-btn:active {
    transform: scale(0.98);
    background: #e5e7eb;
  }

  .arrive-btn {
    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
    transition: all 0.2s;
  }

  .arrive-btn:active {
    transform: scale(0.98);
    box-shadow: 0 5px 10px -3px rgba(37, 99, 235, 0.3);
  }

  .status-badge {
    background-color: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
  }

  .glass-header {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .nav-item-active {
    color: #2f7f34;
  }

  .nav-item {
    color: #64748b;
    transition: color 0.2s;
  }

  .qr-btn {
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export default function CheckinOrderStep2() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const [searchParams] = useSearchParams();
    const jobIdParam = searchParams.get('jobId');

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const myJobs = await transportService.getMyJobs();
                let selectedJob = null;
                if (jobIdParam) {
                    selectedJob = myJobs.find(j => j.id === jobIdParam);
                } else {
                    selectedJob = myJobs.find(j => j.status === 'ON_THE_WAY');
                }
                setJob(selectedJob || null);
            } catch (err) {
                toast?.error('Không thể tải thông tin hành trình.');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobIdParam, toast]);

    const handleArriveAtFactory = async () => {
        if (!job) return;
        try {
            setSubmitting(true);
            
            // 1. Cập nhật trạng thái thành DELIVERED (Đã giao hàng)
            await transportService.updateJobStatus(job.id, 'DELIVERED');

            // 2. Check-in tại điểm giao hàng (Nhà máy)
            await transportService.checkin(job.id, {
                type: 'FACTORY',
                latitude: 10.7231,
                longitude: 106.6124,
                note: 'Tài xế đã đến nhà máy và hoàn thành giao hàng thành công.'
            });

            toast?.success('Đã cập nhật trạng thái đơn: Giao hàng thành công!');
            navigate('/van-chuyen/chuyen-xe');
        } catch (err) {
            toast?.error('Lỗi khi cập nhật trạng thái giao hàng.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="font-sans text-slate-900 bg-slate-50 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 text-center border border-slate-100">
                    <span className="material-symbols-outlined text-5xl text-slate-300 block mb-3">local_shipping</span>
                    <h2 className="text-lg font-bold text-slate-800">Không có chuyến đi đang di chuyển</h2>
                    <p className="text-xs text-slate-400 mt-2">Vui lòng kiểm tra lại trạng thái chuyến xe của bạn trong phần "Chuyến đi".</p>
                    <button
                        onClick={() => navigate('/van-chuyen/chuyen-xe')}
                        className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
                    >
                        Quay lại danh sách chuyến đi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{styles}</style>
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />

            <div className="font-sans text-slate-900 min-h-screen flex flex-col items-center bg-[#f0f2f5] pt-20 pb-20">

                {/* Fixed Header */}
                <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 py-3">
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-base font-bold text-slate-800">Chuyến đi #TRIP-{job.id.substring(0, 8).toUpperCase()}</h1>
                            <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100">
                                Bước 2/3
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-green-600 h-1.5 rounded-full w-2/3 transition-all duration-500"></div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="w-full max-w-md mx-auto flex flex-col h-full justify-between p-4 flex-grow">

                    {/* Status row */}
                    <div className="flex items-center justify-between mb-6 mt-2">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400 text-sm">signal_cellular_alt</span>
                            <span className="text-[10px] font-semibold text-slate-500">GPS Đang Hoạt Động</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[10px] font-semibold text-green-700">Trực tuyến</span>
                        </div>
                    </div>

                    {/* Hero section */}
                    <div className="mb-6 text-center">
                        <div className="inline-flex items-center justify-center p-3.5 bg-blue-50 rounded-full mb-3 ring-4 ring-blue-50/50">
                            <span className="material-symbols-outlined text-3xl text-blue-600">local_shipping</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mb-1">Đang di chuyển</h1>
                        <p className="text-slate-500 text-sm">Đến điểm giao hàng</p>
                    </div>

                    {/* Destination card */}
                    <div className="driver-card p-5 mb-6 w-full border border-slate-100 shadow-sm">
                        <div className="flex items-start gap-3 mb-5">
                            <div className="mt-0.5">
                                <span className="material-symbols-outlined text-red-500 text-2xl">location_on</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Điểm giao hàng</p>
                                <h2 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                                    {job.factoryName}
                                </h2>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    Lô B4, KCN Xuyên Á, Đức Hòa, Long An
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                            <div>
                                <p className="text-slate-400">Khoảng cách</p>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">{job.distanceKm} km</p>
                            </div>
                            <div className="h-6 w-px bg-slate-200"></div>
                            <div>
                                <p className="text-slate-400">Thời gian dự kiến</p>
                                <p className="font-bold text-slate-800 text-sm mt-0.5">~30 phút</p>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 w-full mt-auto mb-6">
                        <a
                            className="map-btn group relative flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-slate-700 font-bold text-sm"
                            href={`https://www.google.com/maps/dir/?api=1&destination=${job.deliveryLatitude || 10.7231},${job.deliveryLongitude || 106.6124}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>Mở bản đồ dẫn đường</span>
                            <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-0.5 transition-transform text-base">
                                arrow_forward
                            </span>
                        </a>

                        <button
                            className="arrive-btn relative w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                            onClick={handleArriveAtFactory}
                            disabled={submitting}
                        >
                            <span className="material-symbols-outlined text-2xl">where_to_vote</span>
                            {submitting ? 'Đang xác nhận...' : 'Xác nhận đã đến Nhà máy'}
                        </button>

                        <p className="text-center text-slate-400 text-[10px] mt-1">
                            Nhấn "Xác nhận đã đến" khi xe đã đỗ an toàn tại cổng nhà máy
                        </p>
                    </div>
                </main>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 pb-safe z-50">
                    <div className="max-w-md mx-auto flex justify-between items-end relative">
                        <Link to="/transport/market" className="nav-item flex flex-col items-center gap-1 p-2 w-16 text-slate-400">
                            <span className="material-symbols-outlined text-2xl">storefront</span>
                            <span className="text-[10px] font-medium">Chợ đơn</span>
                        </Link>
                        <Link to="/van-chuyen/chuyen-xe" className="nav-item nav-item-active flex flex-col items-center gap-1 p-2 w-16 text-green-600">
                            <span className="material-symbols-outlined text-2xl font-semibold">local_shipping</span>
                            <span className="text-[10px] font-medium">Chuyến đi</span>
                        </Link>
                        <div className="relative -top-6">
                            <Link to="/van-chuyen/checkin" className="qr-btn bg-green-600 text-white h-14 w-14 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors border-4 border-slate-50">
                                <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                            </Link>
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-500 whitespace-nowrap">
                                QR Code
                            </span>
                        </div>
                        <button className="nav-item flex flex-col items-center gap-1 p-2 w-16 text-slate-400">
                            <span className="material-symbols-outlined text-2xl">history</span>
                            <span className="text-[10px] font-medium">Lịch sử</span>
                        </button>
                        <button className="nav-item flex flex-col items-center gap-1 p-2 w-16 text-slate-400">
                            <span className="material-symbols-outlined text-2xl">person</span>
                            <span className="text-[10px] font-medium">Tài khoản</span>
                        </button>
                    </div>
                </nav>

            </div>
        </>
    );
}
