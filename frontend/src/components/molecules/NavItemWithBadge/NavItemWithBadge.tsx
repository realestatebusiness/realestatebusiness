import React from "react";
import { Badge } from "../../atoms/Badge";
import { HeaderBadge } from "../../atoms/HeaderBadge";

interface NavItemWithBadgeProps {
  label: string;
  badge?: string;
  badgeColor?: "blue" | "red" | "green";
  onClick?: () => void;
}

const NavItemWithBadge: React.FC<NavItemWithBadgeProps> = ({
  label,
  badge,
  badgeColor = "red",
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium text-sm"
  >
    <span>{label}</span>
    {badge && <HeaderBadge color={badgeColor}>{badge}</HeaderBadge>}
  </button>
);
export default NavItemWithBadge;