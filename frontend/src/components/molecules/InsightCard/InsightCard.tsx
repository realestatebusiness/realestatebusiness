import React from "react";
import type { IconProps as FeatherIconProps } from "react-feather";
import { Icon } from "../../atoms/Icon";

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<FeatherIconProps>;
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  icon,
  className = "",
}) => (
  <div className={`bg-white rounded-xl p-6 text-center ${className}`}>
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
      <Icon icon={icon} size={20} className="text-blue-600" />
    </div>
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default InsightCard;
