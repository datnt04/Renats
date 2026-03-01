import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ── Constants ──────────────────────────────────────────────────────────────
const WASTE_TYPES = [
    'Đồng cáp (Loại 1)', 'Đồng cáp (Loại 2)', 'Nhôm phế liệu',
    'Sắt vụn', 'Thép phế liệu', 'Giấy Carton',
    'Nhựa cứng (PP/PE)', 'Thiếc', 'Pin / Acquy cũ',
];
const BUYERS = [
    'Công ty TM Phú Mỹ', 'Giấy Sài Gòn Xanh', 'Thép Miền Nam JSC',
    'Nhựa Tiền Phong', 'Đồng Tâm Recycling',
];
const STEPS = ['Thông tin lô', 'Nguồn gốc', 'Vận chuyển', 'Xác nhận'];

// ── Loại nguồn gốc ────────────────────────────────────────────────────────
const SOURCE_TYPES = [
    { id: 'household', label: 'Hộ gia đình', emoji: '🏠', color: '#3b82f6', lightBg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    { id: 'shop', label: 'Cửa hàng tạp hóa', emoji: '🏪', color: '#f59e0b', lightBg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    { id: 'office', label: 'Công sở / Trường học', emoji: '🏫', color: '#a855f7', lightBg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    { id: 'industry', label: 'Nhà máy / Công xưởng', emoji: '🏭', color: '#10b981', lightBg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    { id: 'restaurant', label: 'Nhà hàng / Quán ăn', emoji: '🍜', color: '#f43f5e', lightBg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200' },
    { id: 'construction', label: 'Công trình xây dựng', emoji: '🏗️', color: '#64748b', lightBg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
];

// ── Carriers ──────────────────────────────────────────────────────────────
const CARRIERS = [
    { id: 'vt01', name: 'Vận tải Phú Mỹ', vehicle: 'Xe tải 5 tấn', area: 'TP.HCM & vùng lân cận', rating: 4.8, trips: 142, available: true },
    { id: 'vt02', name: 'Logistics Xanh', vehicle: 'Xe container 20T', area: 'Toàn quốc', rating: 4.6, trips: 87, available: true },
    { id: 'vt03', name: 'Vận chuyển Nam Sài Gòn', vehicle: 'Xe tải 3 tấn', area: 'TP.HCM nội thành', rating: 4.5, trips: 210, available: false },
    { id: 'vt04', name: 'GreenMove', vehicle: 'Xe tải 10 tấn', area: 'Miền Nam', rating: 4.9, trips: 63, available: true },
    { id: 'vt05', name: 'Miền Đông Transport', vehicle: 'Xe tải 8 tấn', area: 'Đông Nam Bộ', rating: 4.7, trips: 95, available: true },
];

// ── Icons ──────────────────────────────────────────────────────────────────
const IconBack = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const IconCheck = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);
const IconInfo = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);
const IconPin = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

// ── Step bar ───────────────────────────────────────────────────────────────
const StepBar = ({ current }) => (
    <div className="flex items-center gap-0 mb-8">
        {STEPS.map((label, i) => {
            const done = i < current;
            const active = i === current;
            return (
                <React.Fragment key={i}>
                    <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                            ${done ? 'bg-green-700 text-white' : active ? 'bg-slate-900 text-white ring-4 ring-slate-200' : 'bg-slate-100 text-slate-400'}`}>
                            {done ? <IconCheck /> : i + 1}
                        </div>
                        <span className={`text-xs font-medium mt-1.5 whitespace-nowrap ${active ? 'text-slate-800' : 'text-slate-400'}`}>
                            {label}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div className={`flex-1 h-px mx-2 mb-5 ${done ? 'bg-green-600' : 'bg-slate-200'}`} />
                    )}
                </React.Fragment>
            );
        })}
    </div>
);

// ── Step 1: Thông tin lô ──────────────────────────────────────────────────
const Step1 = ({ form, setForm, photos, setPhotos }) => {
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

    // Image upload handlers
    const handleFiles = files => {
        const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
        const readers = valid.map(file => new Promise(res => {
            const r = new FileReader();
            r.onload = e => res({ name: file.name, src: e.target.result });
            r.readAsDataURL(file);
        }));
        Promise.all(readers).then(newImgs =>
            setPhotos(prev => [...prev, ...newImgs].slice(0, 6))
        );
    };
    const removePhoto = idx => setPhotos(prev => prev.filter((_, i) => i !== idx));
    const onDrop = e => { e.preventDefault(); handleFiles(e.dataTransfer.files); };

    return (
        <div className="space-y-5">
            {/* Loại phế liệu */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Loại phế liệu <span className="text-red-400">*</span>
                </label>
                <select value={form.wasteType} onChange={set('wasteType')}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-slate-800">
                    <option value="">-- Chọn loại phế liệu --</option>
                    {WASTE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
            </div>

            {/* Khối lượng */}
            <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Tổng khối lượng <span className="text-red-400">*</span>
                    </label>
                    <input type="number" min="0" placeholder="VD: 10200" value={form.totalKg} onChange={set('totalKg')}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                    <p className="text-xs text-slate-400 mt-1">Đã cân tại kho sau khi gom đủ</p>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Đơn vị</label>
                    <select value={form.unit} onChange={set('unit')}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white">
                        <option>kg</option>
                        <option>tấn</option>
                    </select>
                </div>
            </div>

            {/* Vị trí kho */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    <span className="inline-flex items-center gap-1.5">
                        <IconPin /> Vị trí kho tập kết <span className="text-red-400">*</span>
                    </span>
                </label>
                <input type="text" placeholder="VD: 45 Đường Số 12, Bình Chánh, TP. Hồ Chí Minh" value={form.location} onChange={set('location')}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
                <p className="text-xs text-slate-400 mt-1">Địa chỉ điểm xuất hàng của kho</p>
            </div>


            {/* Ghi chú */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ghi chú chất lượng</label>
                <textarea rows={2} placeholder="Chất lượng lô hàng, tình trạng phân loại, ghi chú đặc biệt..." value={form.note} onChange={set('note')}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 resize-none" />
            </div>

            {/* Ảnh chụp lô hàng */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Ảnh chụp lô hàng
                    <span className="ml-1 text-slate-400 font-normal normal-case">(tối đa 6 ảnh)</span>
                </label>

                {/* Drop zone */}
                <div
                    onDrop={onDrop}
                    onDragOver={e => e.preventDefault()}
                    onClick={() => document.getElementById('batch-photo-input').click()}
                    className="border-2 border-dashed border-slate-300 hover:border-green-500 rounded-xl px-4 py-6 flex flex-col items-center gap-2 cursor-pointer transition-colors group"
                >
                    <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-green-50 flex items-center justify-center transition-colors">
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    <p className="text-sm text-slate-500 group-hover:text-green-700 font-medium transition-colors">Kéo thả ảnh vào đây hoặc <span className="text-green-600 font-bold underline">chọn từ thiết bị</span></p>
                    <p className="text-xs text-slate-400">JPG, PNG, HEIC — mỗi ảnh tối đa 10 MB</p>
                </div>
                <input id="batch-photo-input" type="file" accept="image/*" multiple className="hidden"
                    onChange={e => handleFiles(e.target.files)} />

                {/* Previews */}
                {photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {photos.map((img, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square">
                                <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button onClick={e => { e.stopPropagation(); removePhoto(idx); }}
                                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <span className="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1.5 py-0.5 rounded-md truncate max-w-[80%]">{img.name}</span>
                            </div>
                        ))}
                        {photos.length < 6 && (
                            <button onClick={() => document.getElementById('batch-photo-input').click()}
                                className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-green-500 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-green-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span className="text-xs font-medium">Thêm ảnh</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <span className="text-blue-500 mt-0.5 flex-shrink-0"><IconInfo /></span>
                <p className="text-xs text-blue-700">
                    Bước tiếp theo bạn sẽ khai báo <strong>nguồn gốc</strong> — tỷ lệ % phế liệu đến từ hộ gia đình, cửa hàng, công sở... để đảm bảo <strong>minh bạch chuỗi cung ứng</strong>.
                </p>
            </div>
        </div>
    );
};

// ── Step 2: Nguồn gốc theo loại ──────────────────────────────────────────
const Step2 = ({ sourceRatio, setSourceRatio, form }) => {
    // sourceRatio: { household: 45, shop: 25, office: 20, ... } — sum <= 100
    const total = Object.values(sourceRatio).reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const remaining = 100 - total;

    const setRatio = (id, val) => {
        const num = Math.max(0, Math.min(100, parseFloat(val) || 0));
        setSourceRatio(p => ({ ...p, [id]: num }));
    };

    // Active sources with % > 0
    const activeSources = SOURCE_TYPES.filter(s => (sourceRatio[s.id] || 0) > 0);

    return (
        <div className="space-y-5">
            {/* Lô hàng context */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-3.5 flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500">Lô hàng</p>
                    <p className="font-bold text-slate-800">{form.wasteType || '—'}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-slate-500">Khối lượng</p>
                    <p className="font-bold text-slate-800">{form.totalKg} {form.unit}</p>
                </div>
            </div>

            {/* Hướng dẫn */}
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <span className="text-base mt-0.5">♻️</span>
                <p className="text-xs text-blue-700">
                    Nhập tỷ lệ % phế liệu đến từ mỗi loại nguồn. Tổng các % phải bằng <strong>100%</strong> để đảm bảo minh bạch nguồn gốc.
                </p>
            </div>

            {/* Input từng loại nguồn */}
            <div className="space-y-2.5">
                {SOURCE_TYPES.map(src => {
                    const val = sourceRatio[src.id] || 0;
                    const hasVal = val > 0;
                    return (
                        <div key={src.id}
                            className={`rounded-xl border transition-all ${hasVal ? `${src.lightBg} ${src.border}` : 'bg-white border-slate-200'}`}>
                            <div className="flex items-center gap-3 px-4 py-3">
                                <span className="text-2xl flex-shrink-0">{src.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800">{src.label}</p>
                                    {hasVal && (
                                        <div className="mt-1.5 w-full bg-white/60 rounded-full h-1.5 overflow-hidden">
                                            <div className="h-full rounded-full transition-all"
                                                style={{ width: `${val}%`, background: src.color }} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <input
                                        type="number" min="0" max="100" step="1"
                                        value={val === 0 ? '' : val}
                                        onChange={e => setRatio(src.id, e.target.value)}
                                        placeholder="0"
                                        className={`w-16 text-right border rounded-xl px-2 py-2 text-sm font-bold focus:outline-none transition-all ${hasVal
                                            ? `${src.border} bg-white ${src.text} focus:ring-2`
                                            : 'border-slate-200 bg-white text-slate-700 focus:ring-2 focus:ring-green-500 focus:border-green-500'
                                            }`}
                                    />
                                    <span className={`text-sm font-semibold w-4 ${hasVal ? src.text : 'text-slate-400'}`}>%</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tổng % counter */}
            <div className={`rounded-xl px-5 py-3.5 flex items-center justify-between border transition-all ${total === 100 ? 'bg-emerald-50 border-emerald-200' :
                total > 100 ? 'bg-red-50 border-red-200' :
                    'bg-slate-50 border-slate-200'
                }`}>
                <span className={`text-sm font-bold ${total === 100 ? 'text-emerald-700' : total > 100 ? 'text-red-600' : 'text-slate-600'}`}>
                    Tổng tỷ lệ
                </span>
                <div className="text-right">
                    <span className={`text-xl font-extrabold ${total === 100 ? 'text-emerald-700' : total > 100 ? 'text-red-600' : 'text-slate-800'}`}>
                        {total}%
                    </span>
                    {total < 100 && total > 0 && (
                        <p className="text-xs text-slate-400 mt-0.5">Còn thiếu {remaining}%</p>
                    )}
                    {total > 100 && (
                        <p className="text-xs text-red-500 mt-0.5">Vượt {total - 100}%, hãy giảm bớt</p>
                    )}
                    {total === 100 && (
                        <p className="text-xs text-emerald-600 mt-0.5">✓ Hợp lệ</p>
                    )}
                </div>
            </div>

            {/* Visual bar breakdown */}
            {activeSources.length > 0 && (
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phân bổ trực quan</p>
                    <div className="flex rounded-full overflow-hidden h-4 gap-0.5">
                        {activeSources.map(src => (
                            <div key={src.id}
                                className="h-full first:rounded-l-full last:rounded-r-full transition-all"
                                style={{ width: `${sourceRatio[src.id]}%`, background: src.color }}
                                title={`${src.label}: ${sourceRatio[src.id]}%`}
                            />
                        ))}
                        {total < 100 && (
                            <div className="h-full flex-1 bg-slate-100 last:rounded-r-full" />
                        )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                        {activeSources.map(src => (
                            <span key={src.id} className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                                <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ background: src.color }} />
                                {src.emoji} {src.label}
                                <span className="font-bold">{sourceRatio[src.id]}%</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ── Step 3: Vận chuyển ────────────────────────────────────────────────────
const Step3 = ({ form, setForm }) => {
    const selectedCarrier = CARRIERS.find(c => c.id === form.carrierId);
    return (
        <div className="space-y-4">
            <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Cơ sở vận chuyển đối tác <span className="text-red-400">*</span></p>
                <p className="text-xs text-slate-400 mb-4">Chọn đơn vị vận chuyển lô hàng đến doanh nghiệp tái chế</p>
                <div className="space-y-2.5">
                    {CARRIERS.map(c => {
                        const isSel = form.carrierId === c.id;
                        return (
                            <button key={c.id} disabled={!c.available}
                                onClick={() => setForm(p => ({ ...p, carrierId: isSel ? '' : c.id }))}
                                className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all
                                    ${!c.available ? 'opacity-40 cursor-not-allowed border-slate-100 bg-slate-50'
                                        : isSel ? 'border-green-500 bg-green-50 shadow-md ring-2 ring-green-200'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                                    ${isSel ? 'border-green-600 bg-green-600' : 'border-slate-300'}`}>
                                    {isSel && <span className="w-2 h-2 bg-white rounded-full" />}
                                </div>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${isSel ? 'bg-green-100' : 'bg-slate-100'}`}>
                                    🚛
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className={`font-bold text-sm ${isSel ? 'text-green-800' : 'text-slate-800'}`}>{c.name}</p>
                                        {!c.available && <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-semibold">Không sẵn có</span>}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">{c.vehicle} · {c.area}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs font-semibold text-amber-600">⭐ {c.rating}</span>
                                        <span className="text-xs text-slate-400">{c.trips} chuyến</span>
                                    </div>
                                </div>
                                {isSel && (
                                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
            {selectedCarrier && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
                    ✅ Đã chọn: <strong>{selectedCarrier.name}</strong> · {selectedCarrier.vehicle}
                </div>
            )}
        </div>
    );
};

// ── Step 4: Xác nhận ──────────────────────────────────────────────────────
const Step4 = ({ form, setForm, sourceRatio }) => {
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
    const carrier = CARRIERS.find(c => c.id === form.carrierId);
    const activeSources = SOURCE_TYPES.filter(s => (sourceRatio[s.id] || 0) > 0);

    return (
        <div className="space-y-4">
            {/* Tóm tắt lô */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                {[
                    { label: 'Loại phế liệu', value: form.wasteType },
                    { label: 'Khối lượng', value: `${form.totalKg} ${form.unit}` },
                    { label: 'Vị trí kho', value: form.location || '—' },
                    { label: 'Đơn vị vận chuyển', value: carrier ? `${carrier.name} · ${carrier.vehicle}` : '—' },
                    { label: 'Ghi chú', value: form.note || '—' },
                ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between px-5 py-3">
                        <span className="text-sm text-slate-500 w-44 flex-shrink-0">{label}</span>
                        <span className="text-sm font-semibold text-slate-800 text-right">{value}</span>
                    </div>
                ))}
            </div>

            {/* Nguồn gốc breakdown */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                    <p className="text-sm font-bold text-slate-700">🔍 Nguồn gốc lô hàng</p>
                </div>
                {/* Visual bar */}
                <div className="px-5 pt-4 pb-2">
                    <div className="flex rounded-full overflow-hidden h-3 gap-0.5">
                        {activeSources.map(src => (
                            <div key={src.id} className="h-full first:rounded-l-full last:rounded-r-full"
                                style={{ width: `${sourceRatio[src.id]}%`, background: src.color }} />
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-slate-100">
                    {activeSources.map(src => (
                        <div key={src.id} className="flex items-center gap-3 px-5 py-2.5">
                            <span className="text-base flex-shrink-0">{src.emoji}</span>
                            <span className="text-sm text-slate-700 flex-1">{src.label}</span>
                            <div className="text-right">
                                <span className="text-sm font-bold" style={{ color: src.color }}>{sourceRatio[src.id]}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buyer + date */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Doanh nghiệp tái chế nhận hàng <span className="text-red-400">*</span>
                </label>
                <select value={form.buyer} onChange={set('buyer')}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-slate-800">
                    <option value="">-- Chọn đơn vị nhận --</option>
                    {BUYERS.map(b => <option key={b}>{b}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ngày xuất hàng dự kiến</label>
                <input type="date" value={form.deliveryDate} onChange={set('deliveryDate')}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
            </div>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <span className="text-amber-500 mt-0.5">⚠</span>
                <p className="text-xs text-amber-700">
                    Sau khi xác nhận, hệ thống sẽ thông báo cho <strong>{carrier?.name}</strong> và doanh nghiệp tái chế.
                    Thông tin nguồn gốc sẽ được lưu vĩnh viễn và hiển thị trên chuỗi cung ứng.
                </p>
            </div>
        </div>
    );
};

// ── Main ───────────────────────────────────────────────────────────────────
const CreateBatchOrder = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    // Nguồn gốc theo loại (% từng loại)
    const [sourceRatio, setSourceRatio] = useState({
        household: 45, shop: 25, office: 20, industry: 0, restaurant: 0, construction: 10,
    });

    const [form, setForm] = useState({
        wasteType: 'Sắt vụn', totalKg: '10200', unit: 'kg',
        location: '45 Đường Số 12, Bình Chánh, TP. Hồ Chí Minh',
        note: '', carrierId: '', buyer: '', deliveryDate: '',
    });
    const [photos, setPhotos] = useState([]);

    const totalRatio = Object.values(sourceRatio).reduce((s, v) => s + (parseFloat(v) || 0), 0);

    const canNext = () => {
        if (step === 0) return form.wasteType && form.totalKg && form.location;
        if (step === 1) return totalRatio === 100;
        if (step === 2) return !!form.carrierId;
        return !!form.buyer;
    };

    const STEP_TITLES = [
        'Thông tin lô hàng',
        'Khai báo nguồn gốc',
        'Chọn cơ sở vận chuyển',
        'Xác nhận & Xuất hàng',
    ];
    const STEP_HINTS = [
        'Điền loại hàng, khối lượng và vị trí kho',
        'Khai báo tỷ lệ % theo loại nguồn cung cấp',
        'Chọn đơn vị vận chuyển đối tác',
        'Kiểm tra lại và xác nhận tạo lô',
    ];

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            {/* Topbar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
                <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
                    <button onClick={() => step === 0 ? navigate('/kho/dashboard') : setStep(s => s - 1)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                        <IconBack />
                        {step === 0 ? 'Dashboard Kho' : 'Quay lại'}
                    </button>
                    <span className="text-sm font-extrabold text-slate-800">Tạo lô hàng xuất</span>
                    <div className="w-20" />
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8 pb-32">
                <StepBar current={step} />
                <div className="mb-6">
                    <h1 className="text-xl font-extrabold text-slate-900">{STEP_TITLES[step]}</h1>
                    <p className="text-sm text-slate-400 mt-0.5">{STEP_HINTS[step]}</p>
                </div>

                {/* Step content */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    {step === 0 && <Step1 form={form} setForm={setForm} photos={photos} setPhotos={setPhotos} />}
                    {step === 1 && <Step2 sourceRatio={sourceRatio} setSourceRatio={setSourceRatio} form={form} />}
                    {step === 2 && <Step3 form={form} setForm={setForm} />}
                    {step === 3 && <Step4 form={form} setForm={setForm} sourceRatio={sourceRatio} />}
                </div>

                {/* Validation hint for step 1 */}
                {step === 1 && totalRatio !== 100 && totalRatio > 0 && (
                    <p className="text-xs text-center text-slate-400 mt-3 font-medium">
                        {totalRatio < 100
                            ? `Còn thiếu ${100 - totalRatio}% — tổng phải đạt đúng 100%`
                            : `Tổng đang là ${totalRatio}% — vượt ${totalRatio - 100}%, hãy giảm bớt`
                        }
                    </p>
                )}

                {/* Navigation buttons */}
                <div className="mt-5 flex gap-3">
                    {step < 3 ? (
                        <>
                            {step > 0 && (
                                <button onClick={() => setStep(s => s - 1)}
                                    className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors">
                                    Quay lại
                                </button>
                            )}
                            <button disabled={!canNext()} onClick={() => setStep(s => s + 1)}
                                className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${canNext()
                                    ? 'bg-green-700 hover:bg-green-800 text-white shadow-md shadow-green-200 hover:scale-[1.01]'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}>
                                Tiếp theo →
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col w-full gap-3">
                            <button onClick={() => { alert('Lô hàng đã được tạo thành công!'); navigate('/kho/dashboard'); }}
                                className="w-full py-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-extrabold text-base shadow-md shadow-green-200 hover:scale-[1.01] transition-all">
                                ✓ Tạo lô &amp; Gửi thông báo
                            </button>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(2)}
                                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">
                                    ← Chỉnh sửa
                                </button>
                                <Link to="/kho/dashboard"
                                    className="flex-1 py-3 rounded-xl border border-red-100 text-red-400 font-semibold text-sm hover:bg-red-50 transition-colors text-center">
                                    Huỷ
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CreateBatchOrder;
