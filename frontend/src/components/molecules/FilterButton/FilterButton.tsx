import React from "react";
import { ChevronDown } from "react-feather";
import type { IconProps as FeatherIconProps } from "react-feather";
import { Icon } from "../../atoms/Icon";

interface FilterButtonProps {
  label: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  active = false,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`flex items-center border ${
      active ? "border-blue-500" : "border-gray-300"
    } rounded-full px-4 py-2 text-sm text-gray-800 hover:border-blue-500 transition ${className}`}
  >
    {label}
    <Icon icon={ChevronDown as React.ComponentType<FeatherIconProps>} size={14} className="ml-2" />
  </button>
);

export default FilterButton;
