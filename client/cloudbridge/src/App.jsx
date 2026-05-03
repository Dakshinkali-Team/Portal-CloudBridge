import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ServiceRequest from "./pages/ServiceRequest";
import PriceCalculator from "./pages/PriceCalculator";
import MyServices from "./pages/MyServices";
import Profile from "./pages/Profile";  
import MyServicesSection from "./pages/MyServicePage/MyServicesSection";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />   

        {/* CloudBridge Portal Features */}
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/service-request" element={<ServiceRequest />} />
        <Route path="/price-calculator" element={<PriceCalculator />} />
        <Route path="/services" element={<MyServices />} />
        <Route path="/my-services" element={<MyServicesSection />} />
      </Routes>
    </Router>
  );
}

export default App;