import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Path double check: src/App.jsx bata components/layout/Sidebar.jsx ma jana
import Sidebar from "./components/layout/Sidebar.jsx"; 
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ServiceRequest from "./pages/ServiceRequest";
import PriceCalculator from "./pages/PriceCalculator";
import MyServices from "./pages/MyServices";
import Profile from "./pages/Profile";  
import MyServicesSection from "./pages/MyServicePage/MyServicesSection";

// Sidebar Layout Wrapper
const PortalLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Section */}
      <div className="w-64 fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>

      {/* Content Section */}
      <main className="flex-1 ml-64 p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without Sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Portal Pages with Sidebar */}
        <Route path="/dashboard" element={<PortalLayout><Dashboard /></PortalLayout>} />
        <Route path="/service-request" element={<PortalLayout><ServiceRequest /></PortalLayout>} />
        <Route path="/price-calculator" element={<PortalLayout><PriceCalculator /></PortalLayout>} />
        <Route path="/services" element={<PortalLayout><MyServices /></PortalLayout>} />
        <Route path="/profile" element={<PortalLayout><Profile /></PortalLayout>} />   
        <Route path="/my-services" element={<PortalLayout><MyServicesSection /></PortalLayout>} />
      </Routes>
    </Router>
  );
}

export default App;