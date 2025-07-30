import React from "react";
import PropertyOption from "../../atoms/PropertyOptions/PropertyOptions";

interface DisplayPostedByOptionsProps {
  selected: string[];
  onSelect: (value: string) => void;
}

const postedByOptions = ["Owner", "Builder", "Dealer", "Feature Dealer"];

export const DisplayPostedByOptions: React.FC<DisplayPostedByOptionsProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {postedByOptions.map((option) => (
        <PropertyOption
          key={option}
          label={option}
          isSelected={selected.includes(option)}
          onClick={() => onSelect(option)}
        />
      ))}
    </div>
  );
};
