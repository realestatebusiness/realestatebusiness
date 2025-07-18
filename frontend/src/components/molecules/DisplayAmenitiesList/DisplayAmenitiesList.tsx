// components/molecules/DisplayAmenitiesList.tsx
import React from "react";
import PropertyOption from "../../atoms/PropertyOptions/PropertyOptions";

interface DisplayAmenitiesListProps {
  options: string[];
  selected: string[];
  toggleOption: (value: string) => void;
}

const DisplayAmenitiesList: React.FC<DisplayAmenitiesListProps> = ({
  options,
  selected,
  toggleOption,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option) => (
        <PropertyOption
          key={option}
          label={option}
          isSelected={selected.includes(option)}
          onClick={() => toggleOption(option)}
        />
      ))}
    </div>
  );
};

export default DisplayAmenitiesList;
