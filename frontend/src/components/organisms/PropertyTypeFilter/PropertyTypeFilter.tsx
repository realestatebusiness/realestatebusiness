import { ChevronDownIcon, ChevronUpIcon } from "react-feather";
import PropertyOption from "../../atoms/PropertyOptions/PropertyOptions";
import ShowMoreButton from "../../atoms/ShowmoreButton/ShowmoreButton";
import { useState } from "react";

interface PropertyTypeFilterProps {
  options?: string[];
  maxVisibleOptions?: number;
  selectedOptions?: string[];
  onSelectionChange?: (selected: string[]) => void;
}

const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  options = [
    'Residential Apartment',
    'Residential Land',
    'Independent House/Villa',
    'Independent/Builder Floor',
    'Farm House',
    '1 RK/ Studio Apartment',
    'Office Space',
    'Shop/Showroom',
    'Commercial Land',
    'Warehouse/Godown'
  ],
  maxVisibleOptions = 5,
  selectedOptions = [],
  onSelectionChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>(selectedOptions);

  const handleOptionClick = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleToggleExpanded = () => setIsExpanded(!isExpanded);
  const handleClear = () => {
    setSelected([]);
    onSelectionChange?.([]);
  };

  const visibleOptions = isExpanded ? options : options.slice(0, maxVisibleOptions);
  const hiddenCount = options.length - maxVisibleOptions;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Type of property</h3>
        {selected.length > 0 && (
          <button
            onClick={handleClear}
            className="text-blue-600 text-sm hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <div className="space-y-2">
        {visibleOptions.map((option) => (
          <PropertyOption
            key={option}
            label={option}
            isSelected={selected.includes(option)}
            onClick={() => handleOptionClick(option)}
          />
        ))}

        {!isExpanded && hiddenCount > 0 && (
          <ShowMoreButton
            count={hiddenCount}
            onClick={handleToggleExpanded}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyTypeFilter;
