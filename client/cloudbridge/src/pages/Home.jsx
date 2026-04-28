import React from "react";

import Navbar from '../components/layout/Navbar.jsx';
import Hero from "../components/layout/Hero.jsx";
import FeatureSection from '../components/cloud/FeatureSection.jsx';
import CTASection from "../components/CTASection.jsx";
import NewsletterCTA from "../components/sections/CTASectionNewsletter.jsx";
import Footer from '../components/layout/Footer.jsx';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => {
  return (
      <div>
        <Navbar />
        <Hero />
        <FeatureSection />
        <CTASection />
        <NewsletterCTA/>
        <Footer />
      </div>
    );
};
export default Home;