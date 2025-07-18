import React from "react";
import PropertyOption from "../../atoms/PropertyOptions/PropertyOptions";

interface DisplayConstructionStatusOptionsProps {
  selected: string[];
  onSelect: (status: string) => void;
}

const statusOptions = ["New Launch", "Under Construction", "Ready to move"];

const DisplayConstructionStatusOptions: React.FC<
  DisplayConstructionStatusOptionsProps
> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {statusOptions.map((status) => (
        <PropertyOption
          key={status}
          label={status}
          isSelected={selected.includes(status)}
          onClick={() => onSelect(status)}
        />
      ))}
    </div>
  );
};

export default DisplayConstructionStatusOptions;
