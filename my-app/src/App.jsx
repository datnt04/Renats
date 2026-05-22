import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './app/PrivateRoute';

// Auth
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';

// Public
import LandingPage from './features/home/LandingPage';
import Introduce from './features/home/Introduce';

// Seller
import SellerDashboard from './features/seller/SellerDashboard';
import CreateListing from './features/seller/CreateListing';
import SellerProfile from './features/seller/SellerProfile';

// Warehouse (DEPOT)
import WarehouseDashboard from './features/warehouse/WarehouseDashboard';
import CreateBatchOrder from './features/warehouse/CreateBatchOrder';
import PickupRequestDetail from './features/warehouse/PickupRequestDetail';

// Recycling Businesses (FACTORY)
import MapVip from './features/recycling_businesses/mapVip';
import BuyPremium from './features/recycling_businesses/buyPremium';
import PartnerListLock from './features/recycling_businesses/partnerListLock';
import EprReport from './features/recycling_businesses/eprReport';
import EprInforOrder from './features/recycling_businesses/eprInforOrder';
import InforPartnerVip from './features/recycling_businesses/InforPartnerVip';
import DashboardRecycle from './features/recycling_businesses/dashboardRecycle';
import MaterialsMarket from './features/recycling_businesses/materialsMarket';
import PremiumMarket from './features/recycling_businesses/premiumMarket';
import OrderProcess from './features/recycling_businesses/orderProcess';
import OrderConfirm from './features/recycling_businesses/orderConfirm';

// Transportation (DRIVER)
import TransportationMarketplace from './features/transportation/marketplace';
import TransportationOrderDetails from './features/transportation/orderDetails';
import TransportationTripDetailsBooking from './features/transportation/tripDetailsBooking';
import TransportationWaitingConfirm from './features/transportation/waitingConfirm';
import StartOrder from './features/transportation/startOrder';
import CheckinOrder from './features/transportation/checkinOrder';
import CheckinOrderStep2 from './features/transportation/checkinOrderStep2';

// Shared
import Invoice from './features/shared/Invoice';

import { ToastProvider } from './context/ToastContext';
import './App.css';

// Helper: bọc route với PrivateRoute
const P = ({ roles, children }) => (
  <PrivateRoute allowedRoles={roles}>{children}</PrivateRoute>
);

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
        {/* ── Auth (public) ── */}
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky"   element={<RegisterPage />} />

        {/* ── Public marketing ── */}
        <Route path="/"           element={<LandingPage />} />
        <Route path="/gioi-thieu" element={<Introduce />} />

        {/* ── SELLER routes ── */}
        <Route path="/seller/dashboard" element={<P roles={['SELLER']}><SellerDashboard /></P>} />
        <Route path="/seller/dang-tin"  element={<P roles={['SELLER']}><CreateListing /></P>} />
        <Route path="/seller/ho-so"     element={<P roles={['SELLER']}><SellerProfile /></P>} />

        {/* ── DEPOT (Kho) routes ── */}
        <Route path="/kho/dashboard"    element={<P roles={['DEPOT']}><WarehouseDashboard /></P>} />
        <Route path="/kho/tao-lo"       element={<P roles={['DEPOT']}><CreateBatchOrder /></P>} />
        <Route path="/kho/yeu-cau/:id"  element={<P roles={['DEPOT']}><PickupRequestDetail /></P>} />

        {/* ── FACTORY (Nhà máy) routes ── */}
        <Route path="/nha-may/map"              element={<P roles={['FACTORY']}><MapVip /></P>} />
        <Route path="/nha-may/premium"          element={<P roles={['FACTORY']}><BuyPremium /></P>} />
        <Route path="/nha-may/doi-tac"          element={<P roles={['FACTORY']}><PartnerListLock isPremium={false} /></P>} />
        <Route path="/nha-may/doi-tac-vip"      element={<P roles={['FACTORY']}><PartnerListLock isPremium={true} /></P>} />
        <Route path="/nha-may/bao-cao-epr"      element={<P roles={['FACTORY']}><EprReport /></P>} />
        <Route path="/nha-may/bao-cao-epr/:id"  element={<P roles={['FACTORY']}><EprInforOrder /></P>} />
        <Route path="/nha-may/doi-tac/:id"      element={<P roles={['FACTORY']}><InforPartnerVip /></P>} />
        <Route path="/recycle/dashboard"        element={<P roles={['FACTORY']}><DashboardRecycle /></P>} />
        <Route path="/recycle/market"           element={<P roles={['FACTORY']}><MaterialsMarket /></P>} />
        <Route path="/recycle/market-premium"   element={<P roles={['FACTORY']}><PremiumMarket /></P>} />
        <Route path="/recycle/order-process"    element={<P roles={['FACTORY']}><OrderProcess /></P>} />
        <Route path="/recycle/order-confirm"    element={<P roles={['FACTORY']}><OrderConfirm /></P>} />

        {/* ── DRIVER (Tài xế) routes ── */}
        <Route path="/transport/market"         element={<P roles={['DRIVER']}><TransportationMarketplace /></P>} />
        <Route path="/transport/order-details"  element={<P roles={['DRIVER']}><TransportationOrderDetails /></P>} />
        <Route path="/transport/trip-booking"   element={<P roles={['DRIVER']}><TransportationTripDetailsBooking /></P>} />
        <Route path="/transport/waiting-confirm" element={<P roles={['DRIVER']}><TransportationWaitingConfirm /></P>} />
        <Route path="/van-chuyen/chuyen-xe"     element={<P roles={['DRIVER']}><StartOrder /></P>} />
        <Route path="/van-chuyen/checkin"       element={<P roles={['DRIVER']}><CheckinOrder /></P>} />
        <Route path="/van-chuyen/di-chuyen"     element={<P roles={['DRIVER']}><CheckinOrderStep2 /></P>} />

        {/* ── Shared (đăng nhập là vào được) ── */}
        <Route path="/hoa-don/:id" element={<P roles={['SELLER','DEPOT','FACTORY','DRIVER','ADMIN']}><Invoice /></P>} />
      </Routes>
    </Router>
    </ToastProvider>
  );
}

export default App;
