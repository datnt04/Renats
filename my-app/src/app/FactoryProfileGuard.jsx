import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getFactoryProfile } from '../services/factoryService';

/**
 * FactoryProfileGuard — Bắt buộc nhà máy tái chế phải hoàn thiện hồ sơ
 * (chọn vật liệu + upload giấy tờ) trước khi vào bất kỳ trang nào.
 * 
 * Logic:
 *  - Role không phải FACTORY → bỏ qua (PrivateRoute đã xử lý)
 *  - Profile chưa hoàn chỉnh → redirect /nha-may/setup-profile
 *  - Profile đã hoàn chỉnh → render children
 */
export default function FactoryProfileGuard({ children }) {
  const { user } = useAuth();

  // Chỉ áp dụng cho FACTORY role
  if (!user || user.role !== 'FACTORY') {
    return children;
  }

  const profile = getFactoryProfile();

  // Chưa có profile hoặc profile chưa hoàn chỉnh → bắt đi setup
  if (!profile || !profile.isProfileComplete) {
    return <Navigate to="/nha-may/setup-profile" replace />;
  }

  return children;
}
