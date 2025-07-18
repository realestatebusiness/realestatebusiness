import React, { useState } from "react";
import { CheckCircle } from "react-feather";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(null);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">Real Estate</div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          {/* For Buyers */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown("buyers")}
            onMouseLeave={() => setShowDropdown(null)}
          >
            <a href="#" className="hover:text-blue-600 px-2 py-1 rounded transition-colors">
              For Buyers
            </a>

            {showDropdown === "buyers" && (
              <div className="absolute left-0 mt-3 w-[520px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-6 flex">
                {/* Left Column */}
                <div className="w-1/2 pr-6 border-r border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">
                    Properties in Hyderabad
                  </h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="block hover:text-blue-600 transition">Flats</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">Builder Floors</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">Independent House</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">Plots in Hyderabad</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">Serviced Apartments</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">Studio Apartments/1 RK Flats</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">Farm Houses</a></li>
                  </ul>
                  <h4 className="mt-6 text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">
                    Popular Searches
                  </h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="block hover:text-blue-600 transition">Property in Hyderabad</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">Verified Property in Hyderabad</a></li>
                    <li><a href="#" className="block hover:text-blue-600 transition">New Projects in Hyderabad</a></li>
                  </ul>
                </div>

                {/* Right Column - Insights */}
                <div className="w-1/2 pl-6 flex flex-col justify-between">
                  <div className="bg-blue-50 rounded-lg p-5 shadow-inner">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                      <span className="font-bold text-blue-700 text-lg">Insights</span>
                    </div>
                    <ul className="mt-2 space-y-2 text-sm text-blue-700">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Understand localities</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Read Resident Reviews</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Check Price Trends</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Tools, Utilities & more</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* For Tenants */}
          <a href="#" className="hover:text-blue-600">For Tenants</a>

          {/* For Owners */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown("owners")}
            onMouseLeave={() => setShowDropdown(null)}
          >
            <a href="#" className="hover:text-blue-600 px-2 py-1 rounded transition-colors">
              For Owners
            </a>

            {showDropdown === "owners" && (
              <div className="absolute left-0 mt-3 w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-6 flex">
                {/* Left Column */}
                <div className="w-1/2 pr-6">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">
                    Owner Offerings
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li><a href="#" className="block hover:text-blue-600">Post Property for Free</a></li>
                    <li><a href="#" className="block hover:text-blue-600">Owner Services</a></li>
                    <li><a href="#" className="block hover:text-blue-600">My99acres</a></li>
                    <li><a href="#" className="block hover:text-blue-600">View Responses</a></li>
                  </ul>
                </div>

                {/* Right Column - Image */}
                <div className="w-1/2 pl-6 flex items-center justify-center">
                  <img
                    src="/images/owners-laptop.png"
                    alt="Owners using laptop"
                    className="rounded-md w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4">
          <a href="/createProperty" className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            Post Property
          </a>
          <a className="text-sm font-medium text-gray-700 hover:text-blue-600" href="/login">
            Login / Signup
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
