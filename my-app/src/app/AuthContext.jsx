import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = authService.getSession();
    if (session) setUser(session);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    authService.saveSession(res);
    setUser({ userId: res.userId, role: res.role, fullName: res.fullName, email: res.email });
    return res;
  };

  const register = async (data) => {
    const res = await authService.register(data);
    authService.saveSession(res);
    setUser({ userId: res.userId, role: res.role, fullName: res.fullName, email: res.email });
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
