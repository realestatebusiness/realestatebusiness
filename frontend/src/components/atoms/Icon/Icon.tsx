import React from "react";
import type { IconProps as FeatherIconProps } from "react-feather";

interface IconWrapperProps {
  icon: React.ComponentType<FeatherIconProps>;
  size?: number | string;
  className?: string;
}

const Icon: React.FC<IconWrapperProps> = ({
  icon: IconComponent,
  size = 16,
  className = "",
}) => <IconComponent size={size} className={className} />;

export default Icon;
