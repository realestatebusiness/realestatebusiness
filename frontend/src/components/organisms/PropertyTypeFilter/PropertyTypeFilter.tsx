import { useState } from "react";
import PropertyOption from "../../atoms/PropertyOptions/PropertyOptions";
import ShowMoreButton from "../../atoms/ShowmoreButton/ShowmoreButton";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { clearTypeOfPropertySelection, setTypeOfPropertySelection } from "../../../features/PropertyType/typeOfPropertySlice";

// Define the PropertyType type to match your Redux slice
type PropertyType = 'flat_apartment' | 'independent_house_villa' | 'plot_land' | 'office' | 'hospitality' | 'industry';

// Simplified property types with proper typing
const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'flat_apartment', label: "Flat/Apartment" },
  { value: 'independent_house_villa', label: "Independent House/Villa" },
  { value: 'plot_land', label: "Plot/Land" },
  { value: 'office', label: "Office" },
  { value: 'hospitality', label: "Hospitality" },
  { value: 'industry', label: "Industry" }
];

interface PropertyTypeFilterProps {
  maxVisibleOptions?: number;
  onFilterChange?: (selectedTypes: PropertyType[]) => void;
}

const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  maxVisibleOptions = 4,
  onFilterChange
}) => {
  const dispatch = useAppDispatch();
  const selectedTypes = useAppSelector((state) => state.typeOfProperty.selectedTypes);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOptionClick = (typeValue: PropertyType) => {
    const newSelected: PropertyType[] = selectedTypes.includes(typeValue)
      ? selectedTypes.filter((item) => item !== typeValue)
      : [...selectedTypes, typeValue];

    // Update Redux state
    dispatch(setTypeOfPropertySelection(newSelected));
    
    // Notify parent component
    onFilterChange?.(newSelected);
  };

  const handleClear = () => {
    dispatch(clearTypeOfPropertySelection());
    onFilterChange?.([]);
  };

  const visibleTypes = isExpanded ? PROPERTY_TYPES : PROPERTY_TYPES.slice(0, maxVisibleOptions);
  const hiddenCount = PROPERTY_TYPES.length - maxVisibleOptions;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Type of property</h3>
        {selectedTypes.length > 0 && (
          <button onClick={handleClear} className="text-blue-600 text-sm hover:underline">
            Clear ({selectedTypes.length})
          </button>
        )}
      </div>

      <div className="space-y-2">
        {visibleTypes.map((type) => (
          <PropertyOption
            key={type.value}
            label={type.label}
            isSelected={selectedTypes.includes(type.value)}
            onClick={() => handleOptionClick(type.value)}
          />
        ))}

        {!isExpanded && hiddenCount > 0 && (
          <ShowMoreButton 
            count={hiddenCount} 
            onClick={() => setIsExpanded(true)} 
          />
        )}
        
        {isExpanded && (
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-blue-600 text-sm hover:underline mt-2"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyTypeFilter;