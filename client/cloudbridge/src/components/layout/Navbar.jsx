import React from 'react'
import logo from '../../assets/Cloud_Bridge.svg'
import Button from './components/Button'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
     <header className="sticky top-0 z-50 bg-white">
      <nav className="mx-auto max-w-360 px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-0">
            <img src={logo} alt="CloudBridge Logo" style={{filter: "drop-shadow(0px 4px 10px rgba(0, 123, 255, 0.35))"}} className="h-12 md:h-14 mt-3 w-auto object-contain"/>
            <span className="font-semibold text-base text-gray-800 leading-none">
              CloudBridge
            </span>
          </a>

          {/* NAV LINKS */}
          <ul className="hidden md:flex items-center gap-8 text-base font-medium text-[#414651]">
            <li>
              <a href="#features" className="hover:text-black transition">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-black transition">
                How it works
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-black transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-black transition">
                Comparison
              </a>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/login">
            <Button href="#" variant="secondary">Log in</Button>
          </Link> 

          <Link to="/signup"> 
            <Button href="#">Get Started</Button>
          </Link>
        </div>
      </nav>
    </header>
  ) 
}


export default Navbar;