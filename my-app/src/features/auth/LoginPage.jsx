import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../app/AuthContext';
import { ROLE_HOME } from '../../app/roleRoutes';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithFacebook, user } = useAuth();
  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [socialLoading, setSocialLoading] = useState('');

  // Dùng ref để chắc chắn Google SDK chỉ init 1 lần duy nhất
  const googleInitialized = useRef(false);

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (user) navigate(ROLE_HOME[user.role] || '/', { replace: true });
  }, [user, navigate]);

  // Nạp Google SDK – chỉ initialize, KHÔNG renderButton (dùng custom button)
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    function initGoogle() {
      if (googleInitialized.current) return;
      googleInitialized.current = true;

      window.google.accounts.id.initialize({
        client_id:            GOOGLE_CLIENT_ID,
        callback:             onGoogleCredential,
        auto_select:          false,
        use_fedcm_for_prompt: false, // Tắt FedCM – dùng popup cũ, hoạt động trên localhost
      });
    }

    if (window.google?.accounts?.id) {
      initGoogle();
    } else if (!document.getElementById('google-gsi-script')) {
      const s  = document.createElement('script');
      s.id     = 'google-gsi-script';
      s.src    = 'https://accounts.google.com/gsi/client';
      s.async  = true;
      s.defer  = true;
      s.onload = initGoogle;
      document.head.appendChild(s);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callback khi Google trả về credential
  async function onGoogleCredential(response) {
    setSocialLoading('google');
    setError('');
    try {
      const res = await loginWithGoogle(response.credential);
      navigate(ROLE_HOME[res.role] || '/');
    } catch (err) {
      setError(err.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.');
    } finally {
      setSocialLoading('');
    }
  }

  // Click nút Google → mở popup chọn tài khoản
  const handleGoogleClick = () => {
    if (!GOOGLE_CLIENT_ID) {
      setError('Google Client ID chưa được cấu hình trong file .env');
      return;
    }
    if (!googleInitialized.current) {
      setError('Google SDK chưa tải xong. Vui lòng thử lại sau vài giây.');
      return;
    }
    window.google.accounts.id.prompt();
  };


  // Đăng nhập Facebook
  const handleFacebookClick = () => {
    if (!window.FB) {
      setError('Facebook SDK chưa tải xong. Vui lòng thử lại sau vài giây.');
      return;
    }
    setSocialLoading('facebook');
    setError('');
    window.FB.login(async (fbResponse) => {
      if (fbResponse.authResponse) {
        try {
          const res = await loginWithFacebook(fbResponse.authResponse.accessToken);
          navigate(ROLE_HOME[res.role] || '/');
        } catch (err) {
          setError(err.message || 'Đăng nhập Facebook thất bại. Vui lòng thử lại.');
        } finally {
          setSocialLoading('');
        }
      } else {
        setError('Đã hủy đăng nhập bằng Facebook.');
        setSocialLoading('');
      }
    }, { scope: 'email,public_profile' });
  };

  // Đăng nhập truyền thống
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

  const inputStyle = { border: '1px solid #e5e7eb', background: '#fafafa' };
  const inputFocus = (e) => {
    e.target.style.border     = '1px solid #22c55e';
    e.target.style.background = '#fff';
    e.target.style.boxShadow  = '0 0 0 3px rgba(34,197,94,0.1)';
  };
  const inputBlur = (e) => {
    e.target.style.border     = '1px solid #e5e7eb';
    e.target.style.background = '#fafafa';
    e.target.style.boxShadow  = 'none';
  };

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── LEFT PANEL ──────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1f14 0%, #1a3a22 50%, #0d2b1a 100%)' }}>
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #22c55e, transparent)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)', transform: 'translate(30%, 30%)' }} />

        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.jpg" alt="Re-Nats Logo" className="w-12 h-12 rounded-xl object-cover" />
          <span className="text-white text-xl font-bold tracking-tight">Re-Nats</span>
        </div>

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
          <div className="space-y-2">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-3">Hệ thống phục vụ</p>
            {[
              { label: 'Nhà máy tái chế', color: '#22c55e' },
              { label: 'Điểm thu gom',    color: '#0ea5e9' },
              { label: 'Tài xế vận chuyển', color: '#f97316' },
              { label: 'Người bán phế liệu', color: '#a78bfa' },
              { label: 'Quản trị viên',   color: '#fb7185' },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3 opacity-80">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />
                <span className="text-white text-sm">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-green-400 text-xs font-medium mb-3 uppercase tracking-widest">Đã xây dựng bởi</p>
          <p className="text-green-300 text-sm opacity-70">Re-Nats Team · 2026</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────────────────────── */}
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

          {/* Error banner */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
              style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* ── Social Login: Google + Facebook cạnh nhau, bằng nhau ──────── */}
          <div className="flex gap-3 mb-6">

            {/* Nút Google */}
            <button
              id="login-google"
              type="button"
              disabled={!!socialLoading || loading}
              onClick={handleGoogleClick}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-700 flex items-center justify-center gap-2 transition-all"
              style={{
                border:     '1px solid #dadce0',
                background: socialLoading === 'google' ? '#f8f9fa' : '#fff',
                opacity:    (socialLoading && socialLoading !== 'google') || loading ? 0.5 : 1,
                cursor:     (socialLoading || loading) ? 'not-allowed' : 'pointer',
                boxShadow:  socialLoading === 'google' ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => { if (!socialLoading && !loading) { e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.borderColor = '#c6c6c6'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#dadce0'; }}
            >
              {socialLoading === 'google' ? (
                <span className="text-xs text-gray-400">Đang xác thực...</span>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
                    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
                  </svg>
                  Google
                </>
              )}
            </button>

            {/* Nút Facebook */}
            <button
              id="login-facebook"
              type="button"
              disabled={!!socialLoading || loading}
              onClick={handleFacebookClick}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
              style={{
                border:     '1px solid #1877f2',
                background: socialLoading === 'facebook' ? '#e7f0fd' : '#1877f2',
                color:      socialLoading === 'facebook' ? '#1877f2' : '#fff',
                opacity:    (socialLoading && socialLoading !== 'facebook') || loading ? 0.5 : 1,
                cursor:     (socialLoading || loading) ? 'not-allowed' : 'pointer',
                boxShadow:  socialLoading === 'facebook' ? 'none' : '0 1px 3px rgba(24,119,242,0.3)',
              }}
              onMouseEnter={(e) => { if (!socialLoading && !loading) e.currentTarget.style.background = '#166fe5'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = socialLoading === 'facebook' ? '#e7f0fd' : '#1877f2'; }}
            >
              {socialLoading === 'facebook' ? (
                <span className="text-xs">Đang xác thực...</span>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </>
              )}
            </button>
          </div>


          {/* Divider */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs">Hoặc đăng nhập bằng email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Email / Password Form ────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

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
                  style={inputStyle}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading || !!socialLoading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 mt-2"
              style={{
                background: (loading || socialLoading) ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
                cursor:     (loading || socialLoading) ? 'not-allowed' : 'pointer',
                boxShadow:  (loading || socialLoading) ? 'none' : '0 4px 15px rgba(22,163,74,0.35)',
              }}
              onMouseEnter={(e) => { if (!loading && !socialLoading) e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; }}
            >
              {loading ? '⏳ Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

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
