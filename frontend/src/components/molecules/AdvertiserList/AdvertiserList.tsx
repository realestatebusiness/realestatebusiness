import React from "react";
import { Home,User, UserCheck } from "react-feather";
import { AdvertiserItem } from "../../atoms/AdvertiserItem";

const AdvertiserList: React.FC = () => {
    return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 max-w-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose type of advertiser</h3>
      <p className="text-gray-500 mb-8">Browse your choice of listing</p>
      
      <div className="space-y-2">
        <AdvertiserItem
          icon={
            <div className="bg-blue-100 p-3 rounded-xl">
              <User className="text-blue-600 w-6 h-6" />
            </div>
          }
          title="Owner"
          subtitle="4,500+ Properties"
        />
        <AdvertiserItem
          icon={
            <div className="bg-blue-100 p-3 rounded-xl">
              <User className="text-blue-600 w-6 h-6" />
            </div>
          }
          title="Dealer"
          subtitle="3,000+ Properties"
        />
        <AdvertiserItem
          icon={
            <div className="bg-blue-600 p-3 rounded-xl">
              {/* <Building className="text-white w-6 h-6" /> */}
            </div>
          }
          title="Builder"
          subtitle="10+ Properties"
        />
      </div>
    </div>
  );
};

export default AdvertiserList;
