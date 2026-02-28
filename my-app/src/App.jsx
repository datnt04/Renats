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
import Dashboard from './features/recycling_businesses/dashboard';
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
import TransportationMarketplace from './features/transportation/marketplace';
import TransportationOrderDetails from './features/transportation/orderDetails';
import TransportationTripDetailsBooking from './features/transportation/tripDetailsBooking';
import TransportationWaitingConfirm from './features/transportation/waitingConfirm';
import StartOrder from './features/transportation/startOrder';
import CheckinOrder from './features/transportation/checkinOrder';
import CheckinOrderStep2 from './features/transportation/checkinOrderStep2';
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
        <Route path="/nha-may/dashboard" element={<Dashboard />} />
        <Route path="/nha-may/map" element={<MapVip />} />
        <Route path="/nha-may/premium" element={<BuyPremium />} />
        <Route path="/nha-may/doi-tac" element={<PartnerListLock isPremium={false} />} />
        <Route path="/nha-may/doi-tac-vip" element={<PartnerListLock isPremium={true} />} />
        <Route path="/nha-may/bao-cao-epr" element={<EprReport />} />
        <Route path="/nha-may/bao-cao-epr/:id" element={<EprInforOrder />} />
        <Route path="/nha-may/doi-tac/:id" element={<InforPartnerVip />} />
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
        <Route path="/van-chuyen/chuyen-xe" element={<StartOrder />} />
        <Route path="/van-chuyen/checkin" element={<CheckinOrder />} />
        <Route path="/van-chuyen/di-chuyen" element={<CheckinOrderStep2 />} />

        {/* Shared */}
        <Route path="/hoa-don/:id" element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;
