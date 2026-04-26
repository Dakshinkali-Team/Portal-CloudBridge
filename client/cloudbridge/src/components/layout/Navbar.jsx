import React from 'react'
import logo from '../../assets/Cloud_Bridge.svg'
import Button from './components/Button'

const Navbar = () => {
  // return (
  //    <header className="sticky top-0 z-50 bg-white">
  //     <nav className="mx-auto max-w-360 px-6 lg:px-12 h-20 flex items-center justify-between">

  //       {/* This is left section of the navbar including the menu bar */}
  //       <div className="flex items-center gap-8">

  //         {/* LOGO */}
  //         <a href="/" className="flex items-center gap-0">
  //           <img
  //             src={logo}
  //             alt="CloudBridge logo"
  //             className="h-12 md:h-14 mt-3 w-auto object-contain"
  //           />
  //           <span className="font-semibold text-base text-gray-800 leading-none">
  //             CloudBridge
  //           </span>
  //         </a>

  //         {/* These are the navigation links on left */}
  //         <ul className="hidden md:flex items-center gap-8 text-base font-medium text-[#414651]">
  //           <li>
  //             <a href="#" className="hover:text-black transition">
  //               Features
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="hover:text-black transition">
  //               How it works
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="hover:text-black transition">
  //               Pricing
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="hover:text-black transition">
  //               Comparison
  //             </a>
  //           </li>
  //         </ul>
  //       </div>

  //       {/* The Right section */}
  //       <div className="hidden md:flex items-center gap-5">
  //         <a
  //           href="#"
  //           className="text-base font-medium text-[#414651] hover:text-black transition"
  //         >
  //           Log in
  //         </a>

  //         <a
  //           href="#"
  //           className="rounded-lg bg-[#0B78C1] px-5 py-2.5 text-white text-sm font-medium hover:bg-[#095a91] transition"
  //         >
  //           Get Started
  //         </a>
  //       </div>

  //       {/* This is the mobile button menu on right */}
  //       {/* <div className="md:hidden">
  //         <button>
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth="1.8"
  //             stroke="currentColor"
  //             className="h-7 w-7 text-slate-900"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  //             />
  //           </svg>
  //         </button>
  //       </div> */}

  //     </nav>
  //   </header>
  // )
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
              <a href="#" className="hover:text-black transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                How it works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Comparison
              </a>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex items-center gap-5">

          <Button as="a" href="#" variant="secondary">Log in</Button>
          <Button as="a" href="#">Get Started</Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        {/* <div className="md:hidden">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              stroke="currentColor"
              className="h-7 w-7 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div> */}

      </nav>
    </header>
  )
}


export default Navbar