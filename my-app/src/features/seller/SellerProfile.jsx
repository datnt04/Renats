import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sellerService } from '../../services/sellerService';
import { useToast } from '../../context/ToastContext';

const IconBack = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const IconCamera = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);
const IconCheck = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);
const IconEye = ({ show }) => show
    ? <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>;

// ─── Field component ──────────────────────────────────────────────────────
const Field = ({ label, children }) => (
    <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
        {children}
    </div>
);

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all";
const readonlyCls = "w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-default";

// ─── Section wrapper ──────────────────────────────────────────────────────
const Section = ({ title, subtitle, children }) => (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100/50">
            <h2 className="font-extrabold text-slate-900 text-lg">{title}</h2>
            {subtitle && <p className="text-sm text-slate-400 mt-0.5 font-medium">{subtitle}</p>}
        </div>
        <div className="px-6 py-6 space-y-5">{children}</div>
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────
const SellerProfile = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);
    const [showPwd, setShowPwd] = useState({ old: false, new: false, confirm: false });
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        bio: '',
    });
    const [stats, setStats] = useState([
        { label: 'Tin đã đăng', value: 0 },
        { label: 'Hoàn tất', value: 0 },
        { label: 'Đánh giá', value: '5.0 ★' },
    ]);
    const [pwd, setPwd] = useState({ old: '', new: '', confirm: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await sellerService.getProfile();
                const d = res;
                setProfile({
                    name: d.user?.fullName || '',
                    phone: d.user?.phone || '',
                    email: d.user?.email || '',
                    address: d.defaultAddress || '',
                    bio: d.bio || '',
                });
                setStats([
                    { label: 'Tin đã đăng', value: d.totalRequests || 0 },
                    { label: 'Hoàn tất', value: d.completedRequests || 0 },
                    { label: 'Đánh giá', value: (d.averageRating || 5).toFixed(1) + ' ★' },
                ]);
            } catch (error) {
                console.error(error);
                toast.error('Lỗi khi tải thông tin hồ sơ của bạn.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [toast]);

    const setP = f => e => setProfile(p => ({ ...p, [f]: e.target.value }));
    const setPw = f => e => setPwd(p => ({ ...p, [f]: e.target.value }));

    const handleSaveProfile = async () => {
        try {
            await sellerService.updateProfile({
                defaultAddress: profile.address,
                bio: profile.bio
            });
            setSaved(true);
            toast.success('Đã cập nhật thông tin cá nhân thành công!');
            setTimeout(() => setSaved(false), 2500);
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error('Không thể cập nhật hồ sơ. Vui lòng thử lại!');
        }
    };

    const handleChangePwd = async () => {
        if (!pwd.old || !pwd.new || pwd.new !== pwd.confirm) return;
        try {
            await sellerService.changePassword(pwd.old, pwd.new);
            toast.success('Đổi mật khẩu thành công!');
            setPwd({ old: '', new: '', confirm: '' });
        } catch (error) {
            console.error(error);
            toast.error('Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu cũ.');
        }
    };

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            {/* Topbar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                    <button onClick={() => navigate('/seller/dashboard')}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                        <IconBack /> Dashboard
                    </button>
                    <span className="text-sm font-extrabold text-slate-800">Hồ sơ cá nhân</span>
                    <div className="w-20" />
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Panel: Profile Quick Summary */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 text-center">
                            {/* Avatar */}
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-extrabold text-4xl shadow-lg">
                                    {profile.name ? profile.name.charAt(0) : 'U'}
                                </div>
                                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
                                    <IconCamera />
                                </button>
                            </div>

                            {/* Name & Basic Info */}
                            <h2 className="text-xl font-extrabold text-slate-800">{profile.name || 'Người dùng Re-Nats'}</h2>
                            <p className="text-xs text-slate-400 font-semibold mt-1">{profile.phone || 'Chưa cập nhật số điện thoại'}</p>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100/50">
                                {stats.map(s => (
                                    <div key={s.label} className="text-center">
                                        <p className="text-base font-extrabold text-slate-800">{s.value}</p>
                                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Sidebar Quick Links */}
                        <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm space-y-1">
                            <button className="w-full text-left px-4 py-3 rounded-2xl text-sm font-extrabold bg-green-50 text-green-700 flex items-center justify-between cursor-pointer">
                                <span>👤 Thông tin cá nhân</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                                <span>🔒 Mật khẩu & Bảo mật</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50/50 transition-colors flex items-center justify-between cursor-pointer">
                                <span>⚠️ Vùng nguy hiểm</span>
                            </button>
                        </div>

                        {/* Logout button */}
                        <button onClick={() => {
                            localStorage.removeItem('renats_token');
                            navigate('/');
                            toast.success('Đã đăng xuất thành công!');
                        }}
                            className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-100 hover:text-slate-700 transition-all cursor-pointer text-center block bg-white shadow-sm">
                            🚪 Đăng xuất
                        </button>
                    </div>

                    {/* Right Panel: Settings Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* ── Basic Info ── */}
                        <Section title="Thông tin cá nhân" subtitle="Cập nhật tên, số điện thoại và địa chỉ mặc định">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Họ và tên (chỉ đọc)">
                                    <input className={readonlyCls} value={profile.name} readOnly />
                                </Field>
                                <Field label="Số điện thoại (chỉ đọc)">
                                    <input className={readonlyCls} value={profile.phone} readOnly />
                                </Field>
                            </div>
                            <Field label="Email">
                                <input className={readonlyCls} value={profile.email} readOnly />
                                <p className="text-[10px] text-slate-400 mt-1 font-bold">Email tài khoản không thể thay đổi</p>
                            </Field>
                            <Field label="Địa chỉ mặc định">
                                <input className={inputCls} value={profile.address} onChange={setP('address')} placeholder="Quận / Huyện, Tỉnh / TP" />
                            </Field>
                            <Field label="Giới thiệu bản thân">
                                <textarea rows={3} className={inputCls + ' resize-none'} value={profile.bio} onChange={setP('bio')}
                                    placeholder="Ví dụ: Tôi chuyên thu gom đồng cáp và kim loại màu ở khu vực Quận 9..." />
                            </Field>

                            <button onClick={handleSaveProfile}
                                className={`w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer
                                    ${saved ? 'bg-emerald-600 text-white' : 'bg-green-700 hover:bg-green-800 text-white shadow-md shadow-green-100 hover:scale-[1.01]'}`}>
                                {saved ? <><IconCheck /> Đã lưu thông tin!</> : 'Lưu thay đổi'}
                            </button>
                        </Section>

                        {/* ── Change Password ── */}
                        <Section title="Đổi mật khẩu" subtitle="Đặt mật khẩu mạnh để bảo mật tài khoản">
                            {[
                                { label: 'Mật khẩu hiện tại', field: 'old', placeholder: '••••••••' },
                                { label: 'Mật khẩu mới', field: 'new', placeholder: 'Ít nhất 8 ký tự' },
                                { label: 'Xác nhận mật khẩu mới', field: 'confirm', placeholder: 'Nhập lại mật khẩu mới' },
                            ].map(({ label, field, placeholder }) => (
                                <Field key={field} label={label}>
                                    <div className="relative">
                                        <input
                                            type={showPwd[field] ? 'text' : 'password'}
                                            className={inputCls + ' pr-11'}
                                            value={pwd[field]}
                                            onChange={setPw(field)}
                                            placeholder={placeholder}
                                        />
                                        <button type="button"
                                            onClick={() => setShowPwd(p => ({ ...p, [field]: !p[field] }))}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                                            <IconEye show={showPwd[field]} />
                                        </button>
                                    </div>
                                </Field>
                            ))}

                            {/* Password strength indicator */}
                            {pwd.new && (
                                <div>
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${pwd.new.length >= i * 2
                                                    ? pwd.new.length >= 8 ? 'bg-emerald-500' : 'bg-amber-400'
                                                    : 'bg-slate-200'
                                                }`} />
                                        ))}
                                    </div>
                                    <p className="text-xs font-semibold text-slate-400">
                                        Độ bảo mật: {pwd.new.length < 6 ? 'Yếu ❌' : pwd.new.length < 8 ? 'Trung bình ⚠️' : 'Mạnh ghê! 💪'}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleChangePwd}
                                disabled={!pwd.old || !pwd.new || pwd.new !== pwd.confirm}
                                className={`w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${pwd.old && pwd.new && pwd.new === pwd.confirm
                                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:scale-[1.01]'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}>
                                Cập nhật mật khẩu
                            </button>
                        </Section>

                        {/* ── Danger zone ── */}
                        <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-red-50">
                                <h2 className="font-extrabold text-red-600">Vùng nguy hiểm</h2>
                                <p className="text-sm text-slate-400 mt-0.5 font-medium">Các thao tác không thể khôi phục</p>
                            </div>
                            <div className="px-6 py-5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">Xoá tài khoản</p>
                                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Tất cả dữ liệu sẽ bị xóa vĩnh viễn và không thể phục hồi.</p>
                                </div>
                                <button onClick={() => toast.info('Tính năng xóa tài khoản đang được quản trị viên xử lý.')}
                                    className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors cursor-pointer">
                                    Xoá tài khoản
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SellerProfile;
