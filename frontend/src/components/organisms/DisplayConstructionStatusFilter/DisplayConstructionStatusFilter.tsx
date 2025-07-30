import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DisplayConstructionStatusOptions } from "../../molecules/DisplayConstructionStatusOptions";
import {
  setConstructionStatusOptions,
} from "../../../features/constructionstatusandbedroomfilter/constructionstatusandbedroomfilterSlice";
import type { RootState } from "../../../app/store";

const DisplayConstructionStatusFilter: React.FC = () => {
  const dispatch = useDispatch();
  const selectedStatuses = useSelector(
    (state: RootState) =>
      state.constructionstatusandbedroomfilter.constructionStatusOptions
  );

  const handleSelect = (status: string) => {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];

    dispatch(setConstructionStatusOptions(updated));
  };

  const clearSelection = () => dispatch(setConstructionStatusOptions([]));

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
