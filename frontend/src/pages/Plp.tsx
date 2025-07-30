import React from "react";
import { DisplayPropertyList } from "../components/organisms/DisplayPropertyList";
import Filters from "./Filters";

const Plp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-6">
              <Filters />
            </div>
          </div>
          
          <div className="flex-1">
            <DisplayPropertyList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plp;