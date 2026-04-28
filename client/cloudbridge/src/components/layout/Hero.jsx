import React from 'react'
import lightning from '../../assets/lightning-01.svg'
import Button from './components/Button.jsx'

import HeroImage from '../../assets/HeroImage.png'
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-360 px-6 lg:px-15 pt-10 lg:pt-30 pb-20">
        
         {/* SMALL BADGE */}
        <div className="mb-5">
          <div className="inline-flex items-center bg-blue-100 border border-blue-300 rounded-full px-2 py-1">
            <div className="flex items-center gap-1 bg-white border border-blue-300 rounded-full px-2 py-1">
              <img src={lightning} alt="lightning" className="w-4 h-4 object-contain" />
              <span className="text-sm font-semibold text-blue-800">
                Next-Gen Private Cloud
              </span>
            </div>
          </div>
        </div>

        {/* FLEX CONTAINER */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          
          {/* LEFT CONTENT */}
          <div className="max-w-xl">  
            {/* HEADING */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 max-w-xl leading-tight mb-6">
              Simplify Private Cloud <span className="text-[#0B78C1]">Adoption.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-lg text-[#414651] max-w-sm mb-8">
              The enterprise-grade portal for seamless quote-to-provision workflows.
              Get full control, transparency, and security for your private  infrastructure.
            </p>

            {/* BUTTONS */}
            <div className="flex items-center gap-4 ">
              
              <Button> Start Provisioning →</Button>

              <Link to="/signup">
                <Button variant="secondary">Get Started</Button>
              </Link>  
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src={HeroImage}
              alt="Hero"
              className="w-full max-w-md lg:max-w-8/10 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero