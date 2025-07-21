import React from "react";

interface StatItemProps {
  value: number | string;
  label: string;
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  className = "",
}) => (
  <div className={className}>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default StatItem;
