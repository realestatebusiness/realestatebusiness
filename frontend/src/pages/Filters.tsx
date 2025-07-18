import { AreaFilter } from "../components/templates/AreaFilter";
import { BedroomFilterPage } from "../components/templates/BedroomFilterPage";
import { BudgetFilter } from "../components/templates/BudgetFilter";
import { ConstructionStatusFilter } from "../components/templates/ConstructionStatusFilter";
import { DisplayAmenitiesPage } from "../components/templates/DisplayAmenitiesPage";
import PropertyTypeFilterDemo from "../components/templates/DisplayPropertyFilter/DisplayPropertyFilter";


const Filters: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-4">
      <div className="border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>
      
      <div className="space-y-6">
        <BudgetFilter />
        <div className="border-t pt-4">
          <PropertyTypeFilterDemo />
        </div>
        <div className="border-t pt-4">
          <BedroomFilterPage />
        </div>
        <div className="border-t pt-4">
          <ConstructionStatusFilter />
        </div>
        
        <div className="border-t pt-4">
          <DisplayAmenitiesPage />
        </div>
        <div className="border-t pt-4">
          <AreaFilter />
        </div>
      </div>
    </div>
  );
};

export default Filters;