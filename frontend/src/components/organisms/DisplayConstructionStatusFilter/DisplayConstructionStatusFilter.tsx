import React, { useState } from "react";
import { DisplayConstructionStatusOptions } from "../../molecules/DisplayConstructionStatusOptions";

const DisplayConstructionStatusFilter: React.FC = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleSelect = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const clearSelection = () => setSelectedStatuses([]);

  return (
     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold">Construction Status</h3>
        {selectedStatuses.length > 0 && (
          <button
            onClick={clearSelection}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <DisplayConstructionStatusOptions
        selected={selectedStatuses}
        onSelect={handleSelect}
      />
     
    </div>
  );
};

export default DisplayConstructionStatusFilter;
