import React from "react";
import footerData from "./footerData";
import Logo from "../../assets/footericon.png" 
const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="flex max-w-7xl mx-auto px-8 py-8 flex-col items-start gap-12 self-stretch">

        <div className="flex max-w-7xl px-8 flex-col items-start gap-12 self-stretch">
  
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 w-full">
    {/* grid items */}
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="text-xs font-semibold text-gray-500 mb-4">
                {section.title}
              </h3>

              {/* FIX: add flex + flex-col */}
              <ul className="flex flex-col items-start gap-3 self-stretch">
                {section.links.map((link, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <a
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-black"
                    >
                      {link.label}
                    </a>

                    {link.badge && (
                      <span className="text-xs bg-gray-100 border px-1.5 py-0.5 rounded">
                        {link.badge}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
</div>
<div className="w-[95%] mx-auto border-t border-gray-300 mt-3 -mb-6"></div>

        {/* Bottom */}
        <div className="flex pt-8 px-8 -mt-6 justify-start items-center content-center gap-y-6 self-stretch flex-wrap gap-1.5 ">
          <div className="w-5 h-5 flex items-center justify-center">
  <img src={Logo} alt="Logo" className="max-w-full max-h-full object-contain" />
</div>
          <span className="text-sm font-medium text-gray-700">
            CloudBridge
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;