
import React from 'react';
import Input from '../components/common/Input';
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import CTASection from '../components/CTASection.jsx';
import FeatureSection from '../components/cloud/FeatureSection.jsx';
import Hero from '../components/layout/Hero.jsx';
import CTASectionNewsletter from '../components/sections/CTASectionNewsletter.jsx';
import { Link} from 'react-router-dom';
import ServiceSection from '../components/cloud/ServiceSection.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <FeatureSection/>
      <ServiceSection/>
      <CTASection/>
      <CTASectionNewsletter/>
      <Footer/>
    </div>
  );
};


export default Home;