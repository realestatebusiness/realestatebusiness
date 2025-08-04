import React, { useEffect, useRef, useState } from "react";
import { User, ChevronDown, Menu as MenuIcon, HelpCircle } from "react-feather";
import Sidebar from "../../pages/Sidebar";
import { MainNav } from "../organisms/MainNav";
import MegaMenuPanel from "../organisms/MegaMenuPanel/MegaMenuPanel";
import {
  buyersMegaMenu,
  ownersMegaMenu,
  tenantsMegaMenu,
} from "../../data/MegaMenuDefinition";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";
import { ExploreModal } from "../organisms/ExploreModal";
import { useNavigate } from "react-router-dom";
import PropertyModal from "../organisms/PropertyModal/PropertyModal";
import ChangePassword from "../organisms/ChangePassword/ChangePassword";

interface HeaderProps {
  onBuyersMenuToggle?: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buyersMenuOpen, setBuyersMenuOpen] = useState(false);
  const [tenantsMenuOpen, setTenantsMenuOpen] = useState(false);
  const [ownersMenuOpen, setOwnersMenuOpen] = useState(false);
  const [isExploreModalOpen, setExploreModalOpen] = useState(false);
  const [showGuestContent, setShowGuestContent] = useState(false);
  const [showPlotContent, setShowPlotContent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state: RootState) => state.auth.user);
  const loggedIn = !!user;

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  const toggleBuyersMenu = () => {
    setBuyersMenuOpen((v) => !v);
    setTenantsMenuOpen(false);
    setOwnersMenuOpen(false);
  };
  const toggleTenantsMenu = () => {
    setTenantsMenuOpen((v) => !v);
    setBuyersMenuOpen(false);
    setOwnersMenuOpen(false);
  };
  const toggleOwnersMenu = () => {
    setOwnersMenuOpen((v) => !v);
    setTenantsMenuOpen(false);
    setBuyersMenuOpen(false);
  };

  const leftSelectorLabel = loggedIn ? "Property Postings" : "Buy in Hyderabad";

  const handleLeftSelectorClick = () => {
    if (loggedIn) {
      if (leftSelectorLabel === "Property Postings") {
        setIsModalOpen(true);
      }
    } else {
      if (leftSelectorLabel === "Buy in Hyderabad") {
        setExploreModalOpen(true);
      }
    }
  };

  const handleTabSelect = (tab: string) => {
    setShowGuestContent(tab === "Buy" || tab === "Rent / Lease" || tab === "Rent");
    setShowPlotContent(tab === "Plots/Land");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-blue-600">RealEstate</div>
              <button
                onClick={handleLeftSelectorClick}
                className="flex items-center space-x-1 text-sm text-gray-700 font-medium"
              >
                <span>{leftSelectorLabel}</span>
                {!loggedIn && <ChevronDown size={14} className="text-gray-600" />}
              </button>
            </div>

            <MainNav
              onBuyersToggle={toggleBuyersMenu}
              onTenantsToggle={toggleTenantsMenu}
              onOwnersToggle={toggleOwnersMenu}
            />

            <div ref={profileRef} className="flex items-center space-x-2 relative">
              <button
                onClick={() => navigate("/createProperty")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition flex items-center space-x-1"
              >
                <span>Post property</span>
                <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded font-semibold">FREE</span>
              </button>

              <HelpCircle className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />

              <div className="flex items-center space-x-2 relative">
                {loggedIn && user?.name ? (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <User className="w-6 h-6 text-gray-700" />
                )}
                <ChevronDown
                  className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer"
                  onClick={() => setProfileDropdownOpen((v) => !v)}
                />

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 p-4 top-[50px]">
                    {loggedIn ? (
                      <>
                        <div className="text-base font-semibold text-gray-900 mb-3">{user.name}</div>
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-2">My Activity</div>
                        <ul className="space-y-2 text-sm text-gray-700 mb-4">
                          <li className="hover:text-blue-600 cursor-pointer">Recently Searched</li>
                          <li className="hover:text-blue-600 cursor-pointer">Recently Viewed</li>
                          <li className="hover:text-blue-600 cursor-pointer">Shortlisted</li>
                          <li className="hover:text-blue-600 cursor-pointer">Contacted</li>
                        </ul>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="hover:text-blue-600 cursor-pointer">My99acres</li>
                          <li className="hover:text-blue-600 cursor-pointer">Manage Listings</li>
                          <li className="hover:text-blue-600 cursor-pointer">View All Responses</li>
                          <li className="hover:text-blue-600 cursor-pointer flex items-center justify-between">
                            <span>Manage BOSS</span>
                            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-semibold">NEW</span>
                          </li>
                          <li className="hover:text-blue-600 cursor-pointer">Lead Search</li>
                          <li
                            className="hover:text-blue-600 cursor-pointer"
                            onClick={() => navigate("/profile")}
                          >
                            Modify Profile
                          </li>
                          <li
                            className="hover:text-blue-600 cursor-pointer"
                            onClick={() => setIsChangePasswordOpen(true)}
                          >
                            Change Password
                          </li>
                          <li className="hover:text-blue-600 cursor-pointer">
                            <a href="/logout">Logout</a>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <div className="text-sm font-semibold text-blue-500 mb-3">
                          <a href="/login">LOGIN / REGISTER</a>
                        </div>
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-2">My Activity</div>
                        <ul className="space-y-2 text-sm text-gray-700 mb-3">
                          <li className="hover:text-blue-600 cursor-pointer">Recently Searched</li>
                          <li className="hover:text-blue-600 cursor-pointer">Recently Viewed</li>
                          <li className="hover:text-blue-600 cursor-pointer">Shortlisted</li>
                          <li className="hover:text-blue-600 cursor-pointer">Contacted</li>
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>

              <MenuIcon
                className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
          </div>

          <MegaMenuPanel isOpen={buyersMenuOpen} onClose={() => setBuyersMenuOpen(false)} data={buyersMegaMenu} />
          <MegaMenuPanel isOpen={tenantsMenuOpen} onClose={() => setTenantsMenuOpen(false)} data={tenantsMegaMenu} />
          <MegaMenuPanel isOpen={ownersMenuOpen} onClose={() => setOwnersMenuOpen(false)} data={ownersMegaMenu} />
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {leftSelectorLabel === "Buy in Hyderabad" && (
        <ExploreModal
          isOpen={isExploreModalOpen}
          onClose={() => setExploreModalOpen(false)}
          onTabSelect={handleTabSelect}
        />
      )}
      {leftSelectorLabel === "Property Postings" && (
        <PropertyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTabSelect={handleTabSelect}
        />
      )}
      {isChangePasswordOpen && (
        <ChangePassword
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
          isLoading={false}
        />
      )}
    </>
  );
};

export default Header;
