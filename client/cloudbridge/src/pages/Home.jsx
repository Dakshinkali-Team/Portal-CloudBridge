import React from "react";
import FeatureSection from "../components/cloud/FeatureSection.jsx";
// import Input from '../components/common/Input.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { Link } from "react-router-dom";
// import GridBackground from "../components/common/GridBackground.jsx";
import Logo from "../assets/Cloud_Bridge.svg";
// import Button from "../components/common/Button.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "../pages/auth/Login.jsx";
// import Signup from "../pages/auth/Signup.jsx";
const Home = () => {
  return (
    <div>
      {/* <Logo />
      <GridBackground />
      <Button/>
      */}
      {/* <Login />
      <Signup /> */}
      <Navbar />
      <FeatureSection />
      {/* <Input /> */}
     
      <Footer/>
    </div>
  );
};
export default Home;