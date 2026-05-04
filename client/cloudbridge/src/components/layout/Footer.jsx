import React from "react";
import footerData from "./footerData.jsx";
import Logo from "../../assets/footericon.png";

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* SAME AS NAVBAR */}
      <div className="mx-auto max-w-360 px-6 lg:px-12 py-12">

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="text-xs font-semibold text-gray-500 mb-4">
                {section.title}
              </h3>

              <ul className="flex flex-col gap-3">
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

        {/* BOTTOM */}
        <div className="border-t border-gray-300 mt-10 pt-6 flex items-center gap-2">
          <div className="w-5 h-5">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
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