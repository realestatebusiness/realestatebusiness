import React from "react";
import NavTextLink from "../../atoms/NavTextLink/NavTextLink";
import { NavItemWithBadge } from "../../molecules/NavItemWithBadge";

interface MainNavProps {
  onBuyersToggle: () => void;
  onTenantsToggle: () => void;
  onOwnersToggle:()=>void;
}

const MainNav: React.FC<MainNavProps> = ({ onBuyersToggle,onTenantsToggle,onOwnersToggle }) => (
  <nav className="hidden md:flex items-center space-x-8">
    <NavTextLink onClick={onBuyersToggle}>For Buyers</NavTextLink>
<NavTextLink onClick={onTenantsToggle}>For Tenants</NavTextLink>
    <NavTextLink onClick={onOwnersToggle}>For Owners</NavTextLink>
    <NavTextLink>For Dealers / Builders</NavTextLink>
    <NavItemWithBadge label="Insights" badge="NEW" badgeColor="red" />
  </nav>
);
export default MainNav;