import React from "react";

import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import FeatureSection from '../components/cloud/FeatureSection.jsx';
import CTASection from "../components/CTASection.jsx";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../components/layout/Hero.jsx";
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
      <Hero/>

      <FeatureSection />
      {/* <Input /> */}
     
      <Footer/>
    </div>
  );
const Home = () => {
  return (
      <div>
        <Navbar />
        <FeatureSection />
        <CTASection />
        <Footer />
      </div>
    );
};
export default Home;