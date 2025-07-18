import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  Headphones,
  User,
  ChevronDown,
  Menu,
  ChevronRight,
} from "react-feather";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 bg-white z-40 p-4 shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-blue-800">Post Property</span>
        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
          FREE
        </span>
      </div>
      <hr className="mb-4" />
      <p className="text-xs text-gray-400 font-semibold uppercase mb-2">
        Explore our Services
      </p>
      <ul className="space-y-3 text-sm text-gray-800">
        <li className="flex justify-between items-center">
          For Buyers <ChevronRight size={16} />
        </li>
        <li className="flex justify-between items-center">
          For Tenants <ChevronRight size={16} />
        </li>
        <li className="flex justify-between items-center">
          For Owners <ChevronRight size={16} />
        </li>
        <li className="flex justify-between items-center">
          For Dealers / Builders <ChevronRight size={16} />
        </li>
        <hr />
        <li>Home Loans</li>
        <li className="flex justify-between items-center">
          Insights{" "}
          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
            NEW
          </span>
        </li>
        <li className="flex justify-between items-center">
          Articles & News <ChevronRight size={16} />
        </li>
        <hr />
        <li>About Us</li>
        <li className="flex justify-between items-center">
          Get Help <ChevronRight size={16} />
        </li>
        <li>Download App</li>
      </ul>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search by Property Code"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring"
        />
      </div>
      <p className="mt-6 text-xs text-gray-500">
        Toll Free Number: 1800 41 99099. <br />
        For international numbers{" "}
        <a href="#" className="text-blue-600 underline">
          click here
        </a>
      </p>
    </div>
  );
};
const Header = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const loggedIn = !!user;
  const sidebarRef = useRef(null);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setProfileDropdownOpen(false);
      setSidebarOpen(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">99acres</div>
            {loggedIn ? (
              <span className="text-sm font-semibold ml-4 text-blue-800">
                Property Postings{" "}
                <ChevronDown size={14} className="inline ml-1" />
              </span>
            ) : (
              <span className="text-sm text-gray-700 font-medium">
                Buy in Hyderabad{" "}
                <ChevronDown size={14} className="inline ml-1" />
              </span>
            )}
          </div>
          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => (window.location.href = "/createProperty")}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Post Property
            </button>
            <Headphones className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            {loggedIn ? (
              <>
                <div className="relative" ref={sidebarRef}>
                  <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-white font-semibold cursor-pointer">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown
                    className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  />
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-4 top-[50px]">
                      <div className="text-sm font-semibold text-gray-900 mb-3">
                        {user?.name}
                      </div>
                      <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
                        My Activity
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700 mb-3">
                        <li className="hover:text-blue-600 cursor-pointer">
                          Recently Searched
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                          Recently Viewed
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                          Shortlisted
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                          Contacted
                        </li>
                      </ul>
                      <hr className="my-2" />
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="hover:text-blue-600 cursor-pointer">
                          My99acres
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                          Manage Listings
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                          View All Responses
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer flex items-center justify-between">
                          Manage BOSS
                          <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full ml-2">
                            NEW
                          </span>
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                          Lead Search
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                          <li
                            onClick={() => navigate("/profile")}
                            className="block w-full h-full"
                          >
                            Modify Profile
                          </li>
                        </li>{" "}
                        <li className="hover:text-blue-600 cursor-pointer">
                          Change Password
                        </li>
                        <li className="hover:text-red-600 cursor-pointer font-medium">
                          <a href="/login">Logout</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <User className="w-6 h-6 text-gray-700" />
                <ChevronDown
                  className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                />
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-4 top-[50px]">
                    <div className="text-sm font-semibold text-blue-500 mb-3">
                      <a href="/login">LOGIN / REGISTER</a>
                    </div>
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
                      My Activity
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700 mb-3">
                      <li className="hover:text-blue-600 cursor-pointer">
                        Recently Searched
                      </li>
                      <li className="hover:text-blue-600 cursor-pointer">
                        Recently Viewed
                      </li>
                      <li className="hover:text-blue-600 cursor-pointer">
                        Shortlisted
                      </li>
                      <li className="hover:text-blue-600 cursor-pointer">
                        Contacted
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
            <Menu
              className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </header>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};
export default Header;
