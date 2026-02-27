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

        {/* Shared */}
        <Route path="/hoa-don/:id" element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;
