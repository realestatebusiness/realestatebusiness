import { useState } from "react";
import { PropertyTypeFilter } from "../../organisms/PropertyTypeFilter";

const PropertyTypeFilterDemo: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
      <div >
        <PropertyTypeFilter
          selectedOptions={selectedOptions}
          onSelectionChange={setSelectedOptions}
        />
        
        {/* {selectedOptions.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Selected Options:</h4>
            <ul className="mt-2 text-sm text-blue-800">
              {selectedOptions.map((option) => (
                <li key={option}>• {option}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
  );
};

export default PropertyTypeFilterDemo;