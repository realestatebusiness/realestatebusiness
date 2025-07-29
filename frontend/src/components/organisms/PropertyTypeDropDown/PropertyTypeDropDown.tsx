import React from "react";
import { Button } from "../../atoms/Button";
import { Checkbox } from "../../atoms/CheckBox";

interface PropertyTypeDropDownProps {
  types: string[];
  selectedTypes: string[];
  onToggle: (type: string) => void;
  onSelectAll: () => void;
  onClear: () => void;
}

const PropertyTypeDropDown: React.FC<PropertyTypeDropDownProps> = ({
  types,
  selectedTypes,
  onToggle,
  onSelectAll,
  onClear,
}) => (
  <div className="mt-3 border border-gray-300 rounded-md p-5 bg-white shadow-sm">
    <Button onClick={onSelectAll} className="mb-3 p-0">
      Select All
    </Button>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-sm text-gray-800">
      {types.map((type) => (
        <Checkbox
          key={type}
          label={type}
          checked={selectedTypes.includes(type)}
          onChange={() => onToggle(type)}
        />
      ))}
    </div>

    <div className="flex justify-between items-center mt-5 text-sm">
      <Button onClick={onClear} className="p-0">
        Clear
      </Button>
    </div>
  </div>
);

export default PropertyTypeDropDown;
