import { ChevronRight } from "react-feather";
import { Badge } from "../../atoms/Badge";
import React from "react";
import { Button } from "../../atoms/Button";

interface MenuListItemProps {
  children: React.ReactNode;
  hasChevron?: boolean;
  badge?: string;
  onClick?: () => void;
}

const MenuListItem: React.FC<MenuListItemProps> = ({
  children,
  hasChevron = false,
  badge,
  onClick,
}) => {
  return (
    <li
      className={`flex justify-between items-center text-sm text-gray-800 ${
        onClick ? "cursor-pointer hover:text-blue-600" : ""
      }`}
      onClick={onClick}
    >
      <span>{children}</span>
      <div className="flex items-center space-x-2">
        {badge && <Button variant="primary">{badge}</Button>}
        {hasChevron && <ChevronRight size={16} />}
      </div>
    </li>
  );
};

export default MenuListItem;
