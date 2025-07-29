import React from "react";

interface LocalityItemProps {
  rank: number;
  name: string;
  percentage: string;
  className?: string;
}

const LocalityItem: React.FC<LocalityItemProps> = ({
  rank,
  name,
  percentage,
  className = "",
}) => (
  <div className={`flex justify-between items-center ${className}`}>
    <span className="text-sm text-gray-600">
      #{rank} {name}
    </span>
    <span className="text-sm text-gray-500">{percentage}% Searches</span>
  </div>
);

export default LocalityItem;
