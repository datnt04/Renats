import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import HeaderDoanhNghiep from '../../components/layout/header_doanhNghiep/headerDoanhNghiep';
import { factoryService } from '../../services/factoryService';

// ── Fix Leaflet default icon bị mất khi dùng Webpack/Vite ──
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ── Custom icon cho depot Premium ──
const premiumIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// ── Custom icon cho depot thường ──
const normalIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// ── Helper: fit map bounds khi depots thay đổi ──
const FitBounds = ({ depots }) => {
    const map = useMap();
    useEffect(() => {
        const valid = depots.filter(d => d.latitude && d.longitude);
        if (valid.length === 0) return;
        const bounds = L.latLngBounds(valid.map(d => [d.latitude, d.longitude]));
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
    }, [depots, map]);
    return null;
};

// ── Helper format material ──
const formatMaterial = (type = '') => {
    const lower = type.toLowerCase();
    if (lower.includes('cardboard') || lower.includes('paper')) return 'Giấy Carton';
    if (lower.includes('hdpe') || lower.includes('plastic') || lower.includes('pet')) return 'Nhựa';
    if (lower.includes('iron') || lower.includes('metal') || lower.includes('steel')) return 'Kim Loại';
    if (lower.includes('copper')) return 'Đồng';
    return type || 'Đa loại';
};

const MapVip = () => {
    const navigate = useNavigate();
    const [isPremium, setIsPremium] = useState(false);
    const [checkingPremium, setCheckingPremium] = useState(true);
    const [depots, setDepots] = useState([]);
    const [loadingDepots, setLoadingDepots] = useState(true);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [selectedDepot, setSelectedDepot] = useState(null);

    // Vị trí mặc định: TP.HCM
    const DEFAULT_CENTER = [10.7769, 106.7009];
    const DEFAULT_ZOOM = 12;

    useEffect(() => {
        const loadAll = async () => {
            try {
                // 1. Check premium status
                const premiumRes = await factoryService.getPremiumStatus();
                const premium = premiumRes?.isPremium || false;
                setIsPremium(premium);

                // 2. Fetch danh sách depot (chỉ load khi premium)
                if (premium) {
                    setLoadingDepots(true);
                    const partnerRes = await factoryService.getPartners();
                    // API trả về { isPremium, data: [...] }
                    const list = partnerRes?.data || partnerRes || [];
                    setDepots(list);
                }
            } catch (err) {
                console.error('Map load error:', err);
                setIsPremium(false);
            } finally {
                setCheckingPremium(false);
                setLoadingDepots(false);
            }
        };
        loadAll();
    }, []);

    // Lọc theo vật liệu
    const getFilteredDepots = () => {
        if (activeFilter === 'ALL') return depots;
        return depots.filter(d => {
            // Depot chưa có materialType riêng → hiện tất cả
            if (!d.materialTypes) return true;
            const mts = d.materialTypes.map(m => m.toLowerCase());
            if (activeFilter === 'PAPER') return mts.some(m => m.includes('paper') || m.includes('cardboard'));
            if (activeFilter === 'PLASTIC') return mts.some(m => m.includes('plastic') || m.includes('hdpe') || m.includes('pet'));
            if (activeFilter === 'METAL') return mts.some(m => m.includes('iron') || m.includes('metal') || m.includes('steel'));
            return true;
        });
    };

    const filteredDepots = getFilteredDepots().filter(d => d.latitude && d.longitude);
    const depotsMissingCoords = getFilteredDepots().filter(d => !d.latitude || !d.longitude).length;

    // ── Màn hình Loading ──
    if (checkingPremium) {
        return (
            <div className="font-sans text-slate-900 overflow-hidden bg-slate-50">
                <HeaderDoanhNghiep activeTab="map" />
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="flex flex-col items-center gap-4">
                        <span className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
                        <p className="text-slate-500 font-medium">Đang kiểm tra quyền truy cập...</p>
                    </div>
                </div>
            </div>
        );
    }

    // ── Màn hình khoá Premium ──
    if (!isPremium) {
        return (
            <div className="font-sans text-slate-900 overflow-hidden bg-slate-50">
                <style>{`
                    .map-pattern { background-color: #eef2f6; background-image: linear-gradient(#e2e8f0 2px, transparent 2px), linear-gradient(90deg, #e2e8f0 2px, transparent 2px); background-size: 80px 80px; }
                `}</style>
                <HeaderDoanhNghiep activeTab="map" />
                <div className="relative" style={{ height: 'calc(100vh - 80px)' }}>
                    <div className="absolute inset-0 map-pattern opacity-60" style={{ filter: 'blur(4px)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
                        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-yellow-400"></div>
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                                <span className="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>map</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-yellow-200">
                                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                                Tính năng Premium
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Bản đồ Đại lý VIP</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                                Xem vị trí thực tế các kho vựa uy tín trên bản đồ Việt Nam, xem lịch sử giao dịch và đặt mua trực tiếp.
                            </p>
                            <ul className="text-left max-w-sm mx-auto mb-8 space-y-2.5">
                                {['Xem vị trí thực tế tất cả kho vựa', 'Điểm uy tín & loại hàng trên bản đồ', 'Thông tin liên hệ đầy đủ', 'Đặt mua ngay từ popup bản đồ'].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-700">
                                        <span className="material-symbols-outlined text-green-500 mr-3 text-xl">check_circle</span>
                                        <span className="font-medium text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/nha-may/premium" className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-extrabold py-4 px-10 rounded-xl shadow-lg shadow-green-200 transition-all transform hover:-translate-y-1">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                                Mua gói Premium
                            </Link>
                            <p className="mt-4 text-xs text-slate-400">Thanh toán an toàn • Hủy bất kỳ lúc nào</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ── Màn hình bản đồ thật (chỉ Premium) ──
    return (
        <div className="font-sans text-slate-900 overflow-hidden bg-slate-50">
            {/* CSS override Leaflet popup */}
            <style>{`
                .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    border: 1px solid #e2e8f0;
                }
                .leaflet-popup-content {
                    margin: 0;
                    width: 300px !important;
                }
                .leaflet-popup-tip-container { display: none; }
                .leaflet-container { font-family: 'Inter', sans-serif; }
            `}</style>

            <HeaderDoanhNghiep activeTab="map" />

            <main className="relative w-full" style={{ height: 'calc(100vh - 80px)' }}>

                {/* ── Filter Bar ── */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-[95%] max-w-5xl">
                    <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-2">
                        <div className="flex items-center gap-2 w-full overflow-x-auto px-2">
                            <button className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
                                <span className="material-symbols-outlined text-base">filter_list</span>
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-1"></div>
                            {[
                                { key: 'ALL', label: 'Tất cả', icon: 'recycling' },
                                { key: 'PLASTIC', label: 'Nhựa', icon: 'water_drop' },
                                { key: 'PAPER', label: 'Giấy', icon: 'description' },
                                { key: 'METAL', label: 'Kim loại', icon: 'build' },
                            ].map(f => (
                                <button
                                    key={f.key}
                                    onClick={() => setActiveFilter(f.key)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                                        activeFilter === f.key
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-base">{f.icon}</span>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg flex-shrink-0">
                            <Link to="/recycle/market" className="px-3 py-1.5 text-slate-500 hover:text-slate-800 rounded-md text-sm font-medium flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined text-lg">grid_view</span> Danh sách
                            </Link>
                            <button className="px-3 py-1.5 bg-white text-slate-800 rounded-md shadow-sm text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">map</span> Bản đồ
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Stats Bar ── */}
                <div className="absolute bottom-6 left-6 z-[1000]">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-slate-200 flex flex-col gap-2">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-primary block"></span>
                                <span>Kho vựa ({filteredDepots.length})</span>
                            </div>
                            {depotsMissingCoords > 0 && (
                                <div className="flex items-center gap-1.5 text-amber-600">
                                    <span className="material-symbols-outlined text-sm">warning</span>
                                    <span>{depotsMissingCoords} chưa có tọa độ</span>
                                </div>
                            )}
                        </div>
                        {loadingDepots && (
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                                Đang tải vị trí kho...
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Leaflet Map ── */}
                <MapContainer
                    center={DEFAULT_CENTER}
                    zoom={DEFAULT_ZOOM}
                    style={{ width: '100%', height: '100%' }}
                    zoomControl={false}
                >
                    {/* OpenStreetMap tiles — hoàn toàn miễn phí */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Fit bounds theo danh sách depots */}
                    {filteredDepots.length > 0 && <FitBounds depots={filteredDepots} />}

                    {/* Markers cho từng depot */}
                    {filteredDepots.map(depot => (
                        <Marker
                            key={depot.id}
                            position={[depot.latitude, depot.longitude]}
                            icon={depot.reputationScore >= 80 ? premiumIcon : normalIcon}
                            eventHandlers={{
                                click: () => setSelectedDepot(depot),
                            }}
                        >
                            <Popup minWidth={300} maxWidth={300}>
                                {/* Popup Card */}
                                <div className="bg-white rounded-2xl overflow-hidden">
                                    {/* Header */}
                                    <div className="bg-gradient-to-r from-primary to-green-600 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-white font-bold text-base leading-tight">
                                                    {depot.companyName}
                                                </h3>
                                                <p className="text-green-100 text-xs mt-0.5 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-xs">location_on</span>
                                                    {depot.city || depot.province || 'Việt Nam'}
                                                </p>
                                            </div>
                                            {depot.reputationScore != null && (
                                                <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                                                    ★ {depot.reputationScore}/100
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4">
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-slate-50 rounded-xl p-3">
                                                <p className="text-xs text-slate-500 font-medium uppercase mb-1">Giao dịch</p>
                                                <p className="text-xl font-extrabold text-slate-800">
                                                    {depot.totalTransactions ?? '—'}
                                                    <span className="text-xs font-normal text-slate-400 ml-1">lần</span>
                                                </p>
                                            </div>
                                            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                                                <p className="text-xs text-green-700 font-medium uppercase mb-1">Điểm UY tín</p>
                                                <p className="text-xl font-extrabold text-green-700">
                                                    {depot.reputationScore ?? '—'}
                                                    <span className="text-xs font-bold text-green-500 ml-0.5">/100</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Thông tin liên hệ (chỉ khi premium) */}
                                        {depot.contactPerson && (
                                            <div className="space-y-2 mb-4 bg-blue-50 rounded-xl p-3 border border-blue-100">
                                                <div className="flex items-center gap-2 text-sm text-blue-800">
                                                    <span className="material-symbols-outlined text-sm">person</span>
                                                    <span className="font-medium">{depot.contactPerson}</span>
                                                </div>
                                                {depot.contactPhone && (
                                                    <div className="flex items-center gap-2 text-sm text-blue-800">
                                                        <span className="material-symbols-outlined text-sm">phone</span>
                                                        <a href={`tel:${depot.contactPhone}`} className="font-bold hover:underline">
                                                            {depot.contactPhone}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Địa chỉ */}
                                        {depot.address && (
                                            <div className="flex items-start gap-2 text-sm text-slate-600 mb-4">
                                                <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">location_on</span>
                                                <span>{depot.address}</span>
                                            </div>
                                        )}

                                        {/* Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => navigate(`/nha-may/doi-tac/${depot.id}`)}
                                                className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm cursor-pointer"
                                            >
                                                Chi tiết
                                            </button>
                                            <button
                                                onClick={() => navigate(`/recycle/order-confirm?depotId=${depot.id}`)}
                                                className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 text-sm cursor-pointer"
                                            >
                                                <span>Đặt mua</span>
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* ── Không có depot nào có tọa độ ── */}
                {!loadingDepots && filteredDepots.length === 0 && depots.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center z-[999] pointer-events-none">
                        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm mx-4 pointer-events-auto">
                            <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">location_off</span>
                            <p className="font-bold text-slate-700 text-lg">Chưa có tọa độ GPS</p>
                            <p className="text-sm text-slate-400 mt-2">
                                Có {depots.length} kho vựa nhưng chưa cập nhật vị trí. Liên hệ kho vựa để cập nhật địa chỉ.
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Loading overlay ── */}
                {loadingDepots && (
                    <div className="absolute inset-0 flex items-center justify-center z-[999] bg-white/50 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-3">
                            <span className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
                            <p className="text-slate-600 font-medium">Đang tải vị trí kho vựa...</p>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default MapVip;
