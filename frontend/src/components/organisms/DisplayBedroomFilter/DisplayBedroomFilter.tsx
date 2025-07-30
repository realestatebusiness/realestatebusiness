import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DisplayBedroomList } from "../../molecules/DisplayBedroomList";
import type { RootState } from "../../../app/store";
import { setBedroomOptions } from "../../../features/constructionstatusandbedroomfilter/constructionstatusandbedroomfilterSlice";

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
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.constructionstatusandbedroomfilter.bedroomOptions
  );
  const [expanded, setExpanded] = useState(false);

 const toggleOption = (value: string) => {
  const updated = selected.includes(value)
    ? selected.filter((v) => v !== value)
    : [...selected, value];
  console.log('Dispatching BedroomOptions:', updated);
  dispatch(setBedroomOptions(updated));
};


  const handleClear = () => {
    dispatch(setBedroomOptions([]));
  };

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
