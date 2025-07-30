import React from "react";
import { Badge } from "../../atoms/Badge";

interface SectionHeaderProps {
  title: string;
  badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, badge }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="font-semibold text-blue-800">{title}</span>
      {badge && <Badge>{badge}</Badge>}
    </div>
  );
};

export default SectionHeader;
