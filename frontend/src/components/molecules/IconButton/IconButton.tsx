import React from "react";
import type { IconProps as FeatherIconProps } from "react-feather";
import { Icon } from "../../atoms/Icon";

interface IconButtonProps {
  icon: React.ComponentType<FeatherIconProps>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition ${className}`}
  >
    <Icon icon={icon} />
  </button>
);

export default IconButton;
