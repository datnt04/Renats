import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/home/LandingPage';
import Introduce from './features/home/Introduce';
import SellerDashboard from './features/seller/SellerDashboard';
import CreateListing from './features/seller/CreateListing';
import SellerProfile from './features/seller/SellerProfile';
import WarehouseDashboard from './features/warehouse/WarehouseDashboard';
import CreateBatchOrder from './features/warehouse/CreateBatchOrder';
import PickupRequestDetail from './features/warehouse/PickupRequestDetail';
import Invoice from './features/shared/Invoice';
import DashboardRecycle from './features/recycling_businesses/dashboardRecycle';
import MaterialsMarket from './features/recycling_businesses/materialsMarket';
import PremiumMarket from './features/recycling_businesses/premiumMarket';
import OrderProcess from './features/recycling_businesses/orderProcess';
import OrderConfirm from './features/recycling_businesses/orderConfirm';
import TransportationMarketplace from './features/transportation/marketplace';
import TransportationOrderDetails from './features/transportation/orderDetails';
import TransportationTripDetailsBooking from './features/transportation/tripDetailsBooking';
import TransportationWaitingConfirm from './features/transportation/waitingConfirm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Marketing */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/gioi-thieu" element={<Introduce />} />

        {/* Seller */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/dang-tin" element={<CreateListing />} />
        <Route path="/seller/ho-so" element={<SellerProfile />} />

        {/* Warehouse */}
        <Route path="/kho/dashboard" element={<WarehouseDashboard />} />
        <Route path="/kho/tao-lo" element={<CreateBatchOrder />} />
        <Route path="/kho/yeu-cau/:id" element={<PickupRequestDetail />} />

        {/* Recycling Businesses */}
        <Route path="/recycle/dashboard" element={<DashboardRecycle />} />
        <Route path="/recycle/market" element={<MaterialsMarket />} />
        <Route path="/recycle/market-premium" element={<PremiumMarket />} />
        <Route path="/recycle/order-process" element={<OrderProcess />} />
        <Route path="/recycle/order-confirm" element={<OrderConfirm />} />

        {/* Transportation */}
        <Route path="/transport/market" element={<TransportationMarketplace />} />
        <Route path="/transport/order-details" element={<TransportationOrderDetails />} />
        <Route path="/transport/trip-booking" element={<TransportationTripDetailsBooking />} />
        <Route path="/transport/waiting-confirm" element={<TransportationWaitingConfirm />} />

        {/* Shared */}
        <Route path="/hoa-don/:id" element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;
