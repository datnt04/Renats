import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { ROLE_HOME } from '../../app/roleRoutes';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Đã đăng nhập rồi → redirect thẳng về dashboard
  useEffect(() => {
    if (user) navigate(ROLE_HOME[user.role] || '/', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      navigate(ROLE_HOME[res.role] || '/');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1f14 0%, #1a3a22 50%, #0d2b1a 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)', transform: 'translate(30%, 30%)' }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.jpg" alt="Re-Nats Logo" className="w-12 h-12 rounded-xl object-cover" />
          <span className="text-white text-xl font-bold tracking-tight">Re-Nats</span>
        </div>

        {/* Middle content */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-white text-4xl font-bold leading-tight mb-3">
              Chào mừng<br />trở lại! 👋
            </h1>
            <p className="text-green-300 text-base opacity-80 leading-relaxed">
              Truy cập tài khoản của bạn để tiếp tục<br />
              hành trình kinh tế tuần hoàn cùng Re-Nats.
            </p>
          </div>

          {/* Role badges */}
          <div className="space-y-2">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">Hệ thống phục vụ</p>
            {[
              { icon: '🏭', label: 'Nhà máy tái chế', color: '#22c55e' },
              { icon: '🏪', label: 'Điểm thu gom', color: '#0ea5e9' },
              { icon: '🚛', label: 'Tài xế vận chuyển', color: '#f97316' },
              { icon: '👤', label: 'Người bán phế liệu', color: '#a78bfa' },
              { icon: '🔧', label: 'Quản trị viên', color: '#fb7185' },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3 opacity-80">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: `${r.color}22`, border: `1px solid ${r.color}44` }}>
                  {r.icon}
                </div>
                <span className="text-white text-sm">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom recent accounts */}
        <div className="relative z-10">
          <p className="text-green-400 text-xs font-medium mb-3 uppercase tracking-widest">Tài khoản gần đây</p>
          <div className="flex items-center gap-2">
            {['🏭', '🏪', '🚛'].map((icon, i) => (
              <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-base cursor-pointer transition-transform hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                {icon}
              </div>
            ))}
            <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)' }}>
              <span className="text-green-400 text-lg font-light">+</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <img src="/logo.jpg" alt="Re-Nats Logo" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-gray-900 text-xl font-bold">Re-Nats</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Đăng nhập</h2>
            <p className="text-gray-500 text-sm">Nhập thông tin tài khoản để truy cập hệ thống.</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
              style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm text-gray-900 outline-none transition-all"
                style={{
                  border: '1px solid #e5e7eb',
                  background: '#fafafa',
                }}
                onFocus={(e) => { e.target.style.border = '1px solid #22c55e'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.1)'; }}
                onBlur={(e) => { e.target.style.border = '1px solid #e5e7eb'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <Link to="/quen-mat-khau" className="text-xs font-medium" style={{ color: '#16a34a' }}>
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 pr-11 rounded-xl text-sm text-gray-900 outline-none transition-all"
                  style={{ border: '1px solid #e5e7eb', background: '#fafafa' }}
                  onFocus={(e) => { e.target.style.border = '1px solid #22c55e'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.1)'; }}
                  onBlur={(e) => { e.target.style.border = '1px solid #e5e7eb'; e.target.style.background = '#fafafa'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 mt-2"
              style={{
                background: loading ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(22,163,74,0.35)',
              }}
              onMouseEnter={(e) => { if (!loading) e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; }}
            >
              {loading ? '⏳ Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">Hoặc tiếp tục với</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google placeholder */}
          <button
            className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-700 flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
            style={{ border: '1px solid #e5e7eb' }}
            onClick={() => alert('Google OAuth chưa được tích hợp.')}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
            </svg>
            Google
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Chưa có tài khoản?{' '}
            <Link to="/dang-ky" className="font-semibold" style={{ color: '#16a34a' }}>
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
