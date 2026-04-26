import React from "react";

import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import FeatureSection from '../components/cloud/FeatureSection.jsx';
import CTASection from "../components/CTASection.jsx";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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