import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Home from "./pages/Home"; // 1. Add this import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* 2. Add the Home route here */}
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}