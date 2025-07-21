// components/organisms/DisplayAmenitiesFilter.tsx
import React, { useState } from "react";
import { DisplayAmenitiesList } from "../../molecules/DisplayAmenitiesList";

const ALL_AMENITIES = [
  "Parking",
  "Vaastu Compliant",
  "Power Backup",
  "Lift",
  "Park",
  "Gymnasium",
  "Club house",
  "Swimming Pool",
  "Security Personnel",
  "Gas Pipeline",
];

const DisplayAmenitiesFilter: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleClear = () => setSelected([]);

  const visibleOptions = expanded ? ALL_AMENITIES : ALL_AMENITIES.slice(0, 5);
  const hiddenCount = ALL_AMENITIES.length - 5;

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-sm">Amenities</h3>
        {selected.length > 0 && (
          <button className="text-blue-600 text-sm" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <DisplayAmenitiesList
        options={visibleOptions}
        selected={selected}
        toggleOption={toggleOption}
      />

      {!expanded && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="text-blue-600 text-sm mt-2"
        >
          + {hiddenCount} more
        </button>
      )}
    </div>
  );
};

export default DisplayAmenitiesFilter;
