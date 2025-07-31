import React from "react";
import { TabItem } from "../../molecules/TabItem";

interface NavigationProps {
  tabs: string[];
  selectedTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  tabs,
  selectedTab,
  onTabChange,
  className = "",
}) => (
  <div className={`flex flex-wrap gap-8 border-b border-gray-200 pb-4 text-base font-medium text-gray-700 ${className}`}>
    {tabs.map((tab) => (
      <TabItem
        key={tab}
        label={tab}
        active={selectedTab === tab}
        onClick={() => onTabChange(tab)}
      />
    ))}
  </div>
);

export default Navigation;
