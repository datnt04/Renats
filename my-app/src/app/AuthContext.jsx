import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { factoryService, saveFactoryProfile } from '../services/factoryService';

const AuthContext = createContext(null);

// Helper: Sau khi FACTORY login, load profile từ BE và lưu localStorage
async function syncFactoryProfile(role) {
  if (role !== 'FACTORY') return;
  try {
    const profile = await factoryService.getProfile();
    if (profile) saveFactoryProfile(profile);
  } catch {
    // Bỏ qua lỗi (mạng, BE chưa khởi động) — guard sẽ redirect đến setup
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = authService.getSession();
    if (session) {
      setUser(session);
      // Khi reload trang, sync lại profile nếu là FACTORY
      syncFactoryProfile(session.role);
    }
    setLoading(false);
  }, []);

  // ── Đăng nhập truyền thống ──────────────────────────────────────────────
  const login = async (email, password) => {
    const res = await authService.login(email, password);
    authService.saveSession(res);
    const u = { userId: res.userId, role: res.role, fullName: res.fullName, email: res.email };
    setUser(u);
    await syncFactoryProfile(res.role);
    return res;
  };

  // ── Đăng ký ─────────────────────────────────────────────────────────────
  const register = async (data) => {
    const res = await authService.register(data);
    authService.saveSession(res);
    const u = { userId: res.userId, role: res.role, fullName: res.fullName, email: res.email };
    setUser(u);
    await syncFactoryProfile(res.role);
    return res;
  };

  // ── Đăng nhập bằng Google ───────────────────────────────────────────────
  const loginWithGoogle = async (idToken, role = null) => {
    const res = await authService.loginWithGoogle(idToken, role);
    authService.saveSession(res);
    const u = { userId: res.userId, role: res.role, fullName: res.fullName, email: res.email };
    setUser(u);
    await syncFactoryProfile(res.role);
    return res;
  };

  // ── Đăng nhập bằng Facebook ─────────────────────────────────────────────
  const loginWithFacebook = async (accessToken, role = null) => {
    const res = await authService.loginWithFacebook(accessToken, role);
    authService.saveSession(res);
    const u = { userId: res.userId, role: res.role, fullName: res.fullName, email: res.email };
    setUser(u);
    await syncFactoryProfile(res.role);
    return res;
  };

  // ── Đăng xuất ────────────────────────────────────────────────────────────
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, loginWithFacebook, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);



