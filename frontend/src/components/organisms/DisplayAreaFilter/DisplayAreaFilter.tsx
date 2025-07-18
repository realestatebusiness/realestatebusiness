import { useState } from "react";
import Dropdown from "../../atoms/Dropdown/Dropdown";
import DisplayAreaSlider, {
    generateAreaOptions,
    areaValues,
    formatLabel,
    areaUnits
} from "../../molecules/DisplayAreaSlider/DisplayAreaSlider";

const areaOptions = generateAreaOptions();

const valueToNumber = (value: string): number => {
    return parseInt(value) || 0;
};

const DisplayAreaFilter: React.FC = () => {
    const [unit, setUnit] = useState<string>('sq_feet');
    const [min, setMin] = useState<number>(areaValues[0]); // 100
    const [max, setMax] = useState<number>(areaValues[areaValues.length - 1]); // 4000
    const [isDefault, setIsDefault] = useState(true);
    const [hasMinChanged, setHasMinChanged] = useState(false);
    const [hasMaxChanged, setHasMaxChanged] = useState(false);

    const handleUnitChange = (val: string) => {
        setUnit(val);
    };

   const handleSliderChange = (newMin: number, newMax: number) => {
    setMin(newMin);
    setMax(newMax);
    setIsDefault(false);

    if (newMin !== min) setHasMinChanged(true);
    if (newMax !== max) setHasMaxChanged(true);
};


    const handleMinDropdown = (val: string) => {
        if (!val) return;
        const newMin = valueToNumber(val);
        const validMin = Math.min(newMin, max - 100);
        setMin(validMin);
        setIsDefault(false);
        setHasMinChanged(true);
    };

    const handleMaxDropdown = (val: string) => {
        if (!val) return;
        const newMax = valueToNumber(val);
        const validMax = Math.max(newMax, min + 100);
        setMax(validMax);
        setIsDefault(false);
        setHasMaxChanged(true);
    };

    const handleClear = () => {
        setMin(areaValues[0]);
        setMax(areaValues[areaValues.length - 1]);
        setUnit('sq_feet');
        setIsDefault(true);
        setHasMinChanged(false);
        setHasMaxChanged(false);
    };

    const isCleared =
        min === areaValues[0] &&
        max === areaValues[areaValues.length - 1] &&
        unit === 'sq_feet' &&
        isDefault;

    const minOptions = areaOptions.filter(option => valueToNumber(option) <= max - 100);
    const maxOptions = areaOptions.filter(option => valueToNumber(option) >= min + 100);

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
                        options={areaUnits.map(u => u.value)}
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
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
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
                        value={hasMinChanged ? min.toString() : ""}
                        options={safeMinOptions}
                        onChange={handleMinDropdown}
                        placeholder="Min Area"
                    />
                </div>
                <div className="flex-1">
                    <Dropdown
                        value={hasMaxChanged ? max.toString() : ""}
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
