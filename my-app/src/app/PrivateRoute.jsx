import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ROLE_HOME } from './roleRoutes';

/**
 * Bảo vệ route theo:
 * - Chưa đăng nhập → /dang-nhap
 * - Đăng nhập nhưng sai role (nếu truyền allowedRoles) → redirect về home của role đó
 */
export default function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Đang load session từ localStorage → chờ
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin mx-auto" />
          <p className="text-gray-500 text-sm">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập → về trang đăng nhập, lưu lại trang định vào
  if (!user) {
    return <Navigate to="/dang-nhap" state={{ from: location.pathname }} replace />;
  }

  // Đăng nhập rồi nhưng không có quyền truy cập route này
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const home = ROLE_HOME[user.role] || '/';
    return <Navigate to={home} replace />;
  }

  return children;
}
