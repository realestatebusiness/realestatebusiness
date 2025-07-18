import React, { useState } from "react";
import { DisplayBedroomList } from "../../molecules/DisplayBedroomList";

const ALL_OPTIONS = [
  "1 RK/1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5 BHK",
  "6 BHK",
  "7 BHK",
  "8 BHK",
  "9 BHK",
  "9+ BHK",
];

const DisplayBedroomFilter: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleClear = () => setSelected([]);

  const visibleOptions = expanded ? ALL_OPTIONS : ALL_OPTIONS.slice(0, 5);
  const hasMore = ALL_OPTIONS.length > 5;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-sm">No. of Bedrooms</h3>
        {selected.length > 0 && (
          <button className="text-blue-600 text-sm" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <DisplayBedroomList
        options={visibleOptions}
        selected={selected}
        toggleOption={toggleOption}
      />

      {!expanded && hasMore && (
        <button
          className="text-blue-600 text-sm mt-2"
          onClick={() => setExpanded(true)}
        >
          + {ALL_OPTIONS.length - 5} more
        </button>
      )}
    </div>
  );
};

export default DisplayBedroomFilter;
