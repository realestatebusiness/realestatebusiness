import React, { useEffect, useRef } from "react";
import { Divider } from "../components/atoms/Divider";
import { ContactInfo } from "../components/molecules/ContactInfo";
import { SectionHeader } from "../components/molecules/SectionHeader";
import { SectionTitle } from "../components/molecules/SectionTitle";
import { MenuSection } from "../components/organisms/MenuSection";
import { SearchSection } from "../components/organisms/SearchSection";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null); // ✅ Type ref properly

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { label: "For Buyers", hasChevron: true, onClick: () => console.log("For Buyers clicked") },
    { label: "For Tenants", hasChevron: true, onClick: () => console.log("For Tenants clicked") },
    { label: "For Owners", hasChevron: true, onClick: () => console.log("For Owners clicked") },
    { label: "For Dealers / Builders", hasChevron: true, onClick: () => console.log("For Dealers clicked") },
    { type: "divider" },
    { label: "Home Loans", onClick: () => console.log("Home Loans clicked") },
    { label: "Insights", hasChevron: true, badge: "NEW", onClick: () => console.log("Insights clicked") },
    { label: "Articles & News", hasChevron: true, onClick: () => console.log("Articles clicked") },
    { type: "divider" },
    { label: "About Us", onClick: () => console.log("About Us clicked") },
    { label: "Get Help", hasChevron: true, onClick: () => console.log("Get Help clicked") },
    { label: "Download App", onClick: () => console.log("Download App clicked") },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 right-0 bg-white z-70 p-4 shadow-lg transform transition-transform duration-300 w-80 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <SectionHeader title="Post Property" badge="FREE" />
      <Divider className="mb-4" />
      <SectionTitle>Explore our Services</SectionTitle>
      <MenuSection items={menuItems} />
      <SearchSection />
      <div className="mt-6">
        <ContactInfo phoneNumber="1800 41 99099" linkText="click here" linkHref="#" />
      </div>
    </div>
  );
};

export default Sidebar;
