import React from "react";

interface TabItemProps {
  label: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  active = false,
  onClick,
  className = "",
}) => (
  <div
    onClick={onClick}
    className={`relative cursor-pointer transition ${
      active
        ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
        : "hover:text-blue-600"
    } ${className}`}
  >
    {label}
  </div>
);

export default TabItem;
