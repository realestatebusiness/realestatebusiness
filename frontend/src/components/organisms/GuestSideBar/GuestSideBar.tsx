import React from "react";
import { GuestUserCard } from "../../molecules/GuestUserCard";
import { InvestacresBanner } from "../../molecules/InvestacresBanner";

const GuestSidebar: React.FC = () => {
  return (
    <aside className="max-w-sm mx-auto space-y-4">
      <GuestUserCard />
      <InvestacresBanner />
    </aside>
  );
};

export default GuestSidebar;
