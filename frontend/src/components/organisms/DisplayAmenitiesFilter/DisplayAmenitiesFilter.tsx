import React, { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAmenities } from "../../../features/areaAndAmenitiesFilter/areaAndAmenitiesFilterSelectors";
import { ALL_AMENITIES, formatAmenity } from "../../../utils/amenities";
import { clearAmenities, toggleAmenity } from "../../../features/areaAndAmenitiesFilter/areaAndAmenitiesFilterSlice";

const DisplayAmenitiesFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectAmenities);
  const [expanded, setExpanded] = useState(false);

  const toggleOption = useCallback(
    (value: string) => dispatch(toggleAmenity(value)),
    [dispatch]
  );

  const handleClear = () => dispatch(clearAmenities());

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

      <div className="flex flex-wrap gap-2">
        {visibleOptions.map((amenity) => {
          const isSelected = selected.includes(amenity);
          return (
            <label
              key={amenity}
              onClick={() => toggleOption(amenity)}
              className={`cursor-pointer select-none inline-flex items-center rounded-full border px-3 py-1 text-sm 
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              <span className="mr-1 font-bold">{isSelected ? "−" : "+"}</span>
              <span>{formatAmenity(amenity)}</span>
            </label>
          );
        })}
      </div>

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
