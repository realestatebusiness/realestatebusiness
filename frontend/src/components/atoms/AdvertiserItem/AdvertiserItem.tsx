import React from "react";
import { ArrowRight } from "react-feather";

interface AdvertiserItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const AdvertiserItem: React.FC<AdvertiserItemProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="flex justify-between items-center p-4 hover:bg-blue-50 rounded-xl cursor-pointer transition-all duration-200 group">
      <div className="flex gap-4 items-center">
        <div className="relative">
          {icon}
          <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full w-4 h-4 flex items-center justify-center">
            <span className="text-white text-xs font-bold">★</span>
          </div>
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-base">{title}</div>
          <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
      </div>
      <ArrowRight className="text-gray-400 w-5 h-5 group-hover:text-gray-600 transition-colors" />
    </div>
  );
};

export default AdvertiserItem;
