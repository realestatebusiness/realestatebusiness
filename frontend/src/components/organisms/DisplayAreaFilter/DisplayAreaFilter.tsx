import React, { useEffect, useState } from "react";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import DisplayAreaSlider, {
  generateAreaOptions,
  areaValues,
  formatLabel,
  areaUnits,
} from "../../molecules/DisplayAreaSlider/DisplayAreaSlider";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAreaMax, selectAreaMin, selectAreaUnit } from "../../../features/areaAndAmenitiesFilter/areaAndAmenitiesFilterSelectors";
import { clearAreaFilter, setAreaFilter } from "../../../features/areaAndAmenitiesFilter/areaAndAmenitiesFilterSlice";
import type { AreaUnit } from "../../../utils/constants";

const areaOptions = generateAreaOptions();

const valueToNumber = (value: string): number => parseInt(value) || 0;

const DisplayAreaFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const reduxMin = useAppSelector(selectAreaMin);
  const reduxMax = useAppSelector(selectAreaMax);
  const reduxUnit = useAppSelector(selectAreaUnit);

const [unit, setUnit] = useState<AreaUnit>(reduxUnit);
  const [min, setMin] = useState<number>(reduxMin);
  const [max, setMax] = useState<number>(reduxMax);

  useEffect(() => {
    dispatch(setAreaFilter({ min, max, unit }));
  }, [min, max, unit, dispatch]);

const handleUnitChange = (val: string) => {
  if (val === "sq_feet" || val === "sq_meter") {
    setUnit(val as AreaUnit);
  }
};

  const handleSliderChange = (newMin: number, newMax: number) => {
    setMin(newMin);
    setMax(newMax);
  };

  const handleMinDropdown = (val: string) => {
    if (!val) return;
    const newMin = valueToNumber(val);
    const validMin = Math.min(newMin, max - 100);
    setMin(validMin);
  };

  const handleMaxDropdown = (val: string) => {
    if (!val) return;
    const newMax = valueToNumber(val);
    const validMax = Math.max(newMax, min + 100);
    setMax(validMax);
  };

  const handleClear = () => {
    dispatch(clearAreaFilter());
    setUnit("sq_feet");
    setMin(areaValues[0]);
    setMax(areaValues[areaValues.length - 1]);
  };

  const isCleared =
    min === areaValues[0] &&
    max === areaValues[areaValues.length - 1] &&
    unit === "sq_feet";

  const minOptions = areaOptions.filter((opt) => valueToNumber(opt) <= max - 100);
  const maxOptions = areaOptions.filter((opt) => valueToNumber(opt) >= min + 100);

  const safeMinOptions = minOptions.includes(min.toString())
    ? minOptions
    : [...minOptions, min.toString()].sort((a, b) => valueToNumber(a) - valueToNumber(b));

  const safeMaxOptions = maxOptions.includes(max.toString())
    ? maxOptions
    : [...maxOptions, max.toString()].sort((a, b) => valueToNumber(a) - valueToNumber(b));

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">Area</h3>
          <Dropdown
            value={unit}
            options={areaUnits.map((u) => u.value)}
            onChange={handleUnitChange}
            placeholder="Select Unit"
          />
        </div>
        {!isCleared && (
          <button
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors flex items-center gap-1"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>

      <DisplayAreaSlider
        min={min}
        max={max}
        minLabel={formatLabel(min, unit)}
        maxLabel={formatLabel(max, unit)}
        onChange={handleSliderChange}
        unit={unit}
      />

      <div className="flex gap-3 mt-6">
        <div className="flex-1">
          <Dropdown
            value={min.toString()}
            options={safeMinOptions}
            onChange={handleMinDropdown}
            placeholder="Min Area"
          />
        </div>
        <div className="flex-1">
          <Dropdown
            value={max.toString()}
            options={safeMaxOptions}
            onChange={handleMaxDropdown}
            placeholder="Max Area"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayAreaFilter;
