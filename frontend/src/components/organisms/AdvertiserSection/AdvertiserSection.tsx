import React from "react";
import { BarChart } from "react-feather";
import { AdvertiserList } from "../../molecules/AdvertiserList";

const AdvertiserSection: React.FC = () => {
  return (
        <section className="bg-orange-50 px-8 py-12 rounded-3xl flex flex-col lg:flex-row lg:items-center gap-12">
      {/* Left side - Title and description */}
      <div className="flex flex-col items-start gap-6 lg:w-2/5">
        <div className="flex items-center gap-3">
          <div className="bg-orange-200 p-3 rounded-xl">
            <BarChart className="text-orange-600 w-7 h-7" />
          </div>
          <div className="bg-blue-600 p-3 rounded-xl">
            {/* <Building className="text-white w-7 h-7" /> */}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
            Plots/Land<br />posted by
          </h2>
          <p className="text-gray-600">Browse by advertiser type</p>
        </div>
      </div>

      {/* Right side - Advertiser options */}
      <div className="lg:w-3/5 flex justify-center lg:justify-end">
        <AdvertiserList />
      </div>
    </section>
  );
};
export default AdvertiserSection;
