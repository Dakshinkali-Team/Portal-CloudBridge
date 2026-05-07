import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Home from "./pages/Home";
import ServiceRequest from "./pages/ServiceRequest";
import PriceCalculator from "./pages/PriceCalculator";
import MyServices from "./pages/MyServices";
import Profile from "./pages/Profile";  
import MyServicesSection from "./pages/MyServicePage/MyServicesSection";
import ForgotPassword from "./pages/auth/password/ForgotPassword";
import CheckEmail from "./pages/auth/password/CheckEmail";
import SetPassword from "./pages/auth/password/SetPassword";

import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import PriceCalculator from "./pages/PriceCalculator";
import MyServices from "./pages/MyServices";
import Profile from "./pages/Profile";
import MyServicesSection from "./pages/MyServicePage/MyServicesSection";

import ForgotPassword from "./pages/auth/password/ForgotPassword";
import CheckEmail from "./pages/auth/password/CheckEmail";
import SetPassword from "./pages/auth/password/SetPassword";

import AdminDashboardLayout from "./pages/admin/AdminDashboardLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminServiceConfig from "./pages/admin/AdminServiceConfig";
import AdminServiceRequest from "./pages/admin/AdminServiceRequest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* CloudBridge Portal Features for Customer*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/service-request" element={<ServiceRequest />} />
        <Route path="/price-calculator" element={<PriceCalculator />} />
        <Route path="/services" element={<MyServices />} />
        <Route path="/my-services" element={<MyServicesSection />} />
        <Route path="/profile" element={<Profile />} />

        {/* CloudBridge Portal Features for Admin*/}
        <Route path="/admin-dashboard" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="service-config" element={<AdminServiceConfig />} />
          <Route path="service-requests" element={<AdminServiceRequest />} />
        </Route>

        {/* Password Recovery Flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/set-password" element={<SetPassword />} />

        {/* Fallback for 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
