import React, { useState } from "react";
import { DisplayPostedByOptions } from "../../molecules/DisplayPostedByOptions";

const PostedByFilter: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((v) => v !== value)
        : [...prevSelected, value]
    );
  };

  const clearSelection = () => setSelected([]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold">Posted by</h3>
        {selected.length > 0 && (
          <button
            onClick={clearSelection}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <DisplayPostedByOptions selected={selected} onSelect={handleSelect} />
    </div>
  );
};

export default PostedByFilter;
