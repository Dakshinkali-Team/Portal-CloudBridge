import React from "react";
import Button from "../common/Button";
// this is a changed file
const NewsletterCTA = () => {
  return (
    <section className="bg-white py-16">
      {/* SAME CONTAINER AS NAVBAR */}
      <div className="mx-auto max-w-360 px-6 lg:px-12">

        <div className="bg-[#074874] rounded-2xl shadow-lg px-8 py-10">
          
          <h2 className="text-white text-center text-2xl md:text-3xl font-semibold mb-2">
            Still thinking about it?
          </h2>

          <p className="text-blue-100 text-center text-base md:text-lg mb-6">
            Sign up for our newsletter and get 10% off your next purchase.
          </p>

          {/* INPUT + BUTTON */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
              bg-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition whitespace-nowrap">
              Subscribe
            </button>
          </div>

          {/* PRIVACY TEXT */}
          <p className="text-xs text-blue-200 mt-4 text-center -ml-50">
            We care about your data in our
            <span className="underline ml-1 cursor-pointer">
              privacy policy
            </span>
          </p>

        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;