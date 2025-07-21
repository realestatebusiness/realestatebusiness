import React from "react";
import { CategoryCarousel } from "../../molecules/CategoryCarousel";

const PlotCollectionSection: React.FC = () => {
  return (
    <section className="mt-8 px-4 md:px-8">
      <h2 className="text-2xl font-bold text-gray-900">Plots/Land Collections and more…</h2>
      <p className="text-sm text-gray-600 mt-1">Showing for properties in Hyderabad</p>
      <div className="mt-6">
        <CategoryCarousel />
      </div>
    </section>
  );
};

export default PlotCollectionSection;
