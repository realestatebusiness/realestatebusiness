import { useState } from "react";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import { DisplayBudgetSlider } from "../../molecules/DisplayBudgetSlider";
import { useAppDispatch } from "../../../app/hooks";
import { resetBudget, setMaxBudget, setMinBudget } from "../../../features/Filters/filterSlice";

const generateBudgetOptions = (): string[] => {
  const options: string[] = [];

  for (let i = 0; i <= 100; i += 5) {
    if (i < 100) {
      options.push(`${i} Lacs`);
    } else {
      options.push(`1 Crore`);
    }
  }

  for (let i = 125; i <= 10000; i += 25) {
    const crores = i / 100;
    if (crores < 100) {
      options.push(`${crores % 1 === 0 ? crores : crores.toFixed(1)} Crores`);
    } else {
      options.push("100+ Crores");
      break;
    }
  }

  return options;
};

const budgetOptions = generateBudgetOptions();

const valueToNumber = (value: string): number => {
  if (value.includes("Lacs")) return parseFloat(value);
  if (value.includes("Crores")) {
    if (value.includes("100+")) return 10000;
    return parseFloat(value) * 100;
  }
  return 0;
};

const budgetValues = budgetOptions.map(option => valueToNumber(option));

const findClosestOptionIndex = (value: number): number => {
  let closestIndex = 0;
  let minDiff = Math.abs(budgetValues[0] - value);
  
  for (let i = 1; i < budgetValues.length; i++) {
    const diff = Math.abs(budgetValues[i] - value);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  
  return closestIndex;
};

const formatLabel = (value: number): string => {
  if (value >= 10000) return "100+ Crores";
  if (value >= 100) return `${(value / 100).toFixed(1)} Crores`;
  return `${value} Lacs`;
};

const DisplayBudgetFilter: React.FC = () => {
  const [min, setMin] = useState(budgetValues[0]); // 0 Lacs
  const [max, setMax] = useState(budgetValues[budgetValues.length - 1]);
  const [isDefault, setIsDefault] = useState(true);

  const dispatch = useAppDispatch();


  const handleSliderChange = (newMin: number, newMax: number) => {
    setMin(newMin);
    setMax(newMax);
    dispatch(setMinBudget(newMin));
    dispatch(setMaxBudget(newMax));
    setIsDefault(false);
  };

  const handleMinDropdown = (val: string) => {
    const newMin = valueToNumber(val);
    const maxIndex = findClosestOptionIndex(max);
    const validMin = budgetValues[Math.max(0, Math.min(findClosestOptionIndex(newMin), maxIndex - 1))];
    setMin(validMin);
    dispatch(setMinBudget(validMin));
    setIsDefault(false);
  };

  const handleMaxDropdown = (val: string) => {
    const newMax = valueToNumber(val);
    const minIndex = findClosestOptionIndex(min);
    const validMax = budgetValues[Math.min(budgetValues.length - 1, Math.max(findClosestOptionIndex(newMax), minIndex + 1))];
    setMax(validMax);
    dispatch(setMaxBudget(validMax));
    setIsDefault(false);
  };

  const handleClear = () => {
    setMin(budgetValues[0]);
    setMax(budgetValues[budgetValues.length - 1]);
    dispatch(resetBudget());
    setIsDefault(true);
  };

  const handleApply = () => {
    console.log('Applied budget filter:', { min: formatLabel(min), max: formatLabel(max) });
  };

  const isCleared = min === budgetValues[0] && max === budgetValues[budgetValues.length - 1] && isDefault;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Budget Filter</h3>
        {!isCleared && (
          <button 
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors" 
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>

      <DisplayBudgetSlider
        min={min}
        max={max}
        minLabel={formatLabel(min)}
        maxLabel={formatLabel(max)}
        onChange={handleSliderChange}
      />

      <div className="flex gap-3 mt-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Budget</label>
          <Dropdown
            value={isDefault ? "" : formatLabel(min)}
            options={budgetOptions}
            onChange={handleMinDropdown}
            placeholder="Min Budget"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget</label>
          <Dropdown
            value={isDefault ? "" : formatLabel(max)}
            options={budgetOptions}
            onChange={handleMaxDropdown}
            placeholder="Max Budget"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayBudgetFilter;