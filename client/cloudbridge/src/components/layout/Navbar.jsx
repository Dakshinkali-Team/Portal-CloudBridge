import React, { useState } from 'react'
import logo from '../../assets/Cloud_Bridge.svg'
import Button from './components/Button'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobileMenu = () => setMobileOpen(false)

  return (
     <header className="sticky top-0 z-50 bg-white">
      <nav className="mx-auto max-w-360 px-6 lg:px-12 h-20 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-0" onClick={closeMobileMenu}>
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

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#414651] hover:bg-slate-100 transition"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen ? (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 pb-6 pt-4 shadow-sm">
          <ul className="flex flex-col gap-4 text-[15px] font-medium text-[#414651]">
            <li>
              <a href="#features" onClick={closeMobileMenu} className="block hover:text-black transition">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" onClick={closeMobileMenu} className="block hover:text-black transition">
                How it works
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={closeMobileMenu} className="block hover:text-black transition">
                Pricing
              </a>
            </li>
          </ul>

          <div className="mt-5 flex flex-col gap-3">
            <Link to="/login" onClick={closeMobileMenu} className="w-full">
              <Button href="#" variant="secondary" size="sm" className="w-full">Log in</Button>
            </Link>

            <Link to="/signup" onClick={closeMobileMenu} className="w-full">
              <Button href="#" size="sm" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  ) 
}


export default Navbar;