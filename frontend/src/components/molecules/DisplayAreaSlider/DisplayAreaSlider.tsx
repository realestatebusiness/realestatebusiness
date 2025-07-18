import React, { useCallback, useRef, useState } from "react";
import RangeHandle from "../../atoms/RangeHandle/RangeHandle";

const areaUnits = [
  { value: 'sq_feet', label: 'sq.ft.' },
  { value: 'sq_metres', label: 'sq.m' },
  { value: 'sq_cm', label: 'sq.cm' },
  { value: 'sq_inch', label: 'sq.inch' },
  { value: 'acres', label: 'acres' },
  { value: 'marla', label: 'marla' },
  { value: 'cents', label: 'cents' },
  { value: 'sq_yards', label: 'sq.yards' }
];

const generateAreaOptions = (): string[] => {
  const options: string[] = [];
  for (let i = 100; i <= 4000; i += 100) {
    options.push(i.toString());
  }
  return options;
};

const areaOptions = generateAreaOptions();

const valueToNumber = (value: string): number => {
  return parseInt(value) || 0;
};

const areaValues = areaOptions.map(option => valueToNumber(option));

const findClosestOptionIndex = (value: number): number => {
  let closestIndex = 0;
  let minDiff = Math.abs(areaValues[0] - value);
  for (let i = 1; i < areaValues.length; i++) {
    const diff = Math.abs(areaValues[i] - value);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  return closestIndex;
};

const formatLabel = (value: number, unit: string): string => {
  const unitLabel = areaUnits.find(u => u.value === unit)?.label || 'sq.ft.';
  return `${value} ${unitLabel}`;
};

interface AreaSliderProps {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  onChange: (min: number, max: number) => void;
  unit: string;
}

const DisplayAreaSlider: React.FC<AreaSliderProps> = ({
  min,
  max,
  minLabel,
  maxLabel,
  onChange,
  unit
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const getValueFromPosition = useCallback((clientX: number): number => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const index = Math.round(percentage * (areaOptions.length - 1));
    return areaValues[Math.max(0, Math.min(index, areaValues.length - 1))];
  }, []);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newValue = getValueFromPosition(e.clientX);
    if (isDragging === 'min') {
      const newMin = Math.min(newValue, max - 100);
      onChange(Math.max(areaValues[0], newMin), max);
    } else {
      const newMax = Math.max(newValue, min + 100);
      onChange(min, Math.min(areaValues[areaValues.length - 1], newMax));
    }
  }, [isDragging, min, max, onChange, getValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercent = (findClosestOptionIndex(min) / (areaOptions.length - 1)) * 100;
  const maxPercent = (findClosestOptionIndex(max) / (areaOptions.length - 1)) * 100;

  return (
    <div className="relative w-full py-4">
      <div className="flex justify-between px-1 mb-4">
        <RangeHandle value={minLabel} />
        <RangeHandle value={maxLabel} />
      </div>

      <div ref={sliderRef} className="relative h-2 bg-gray-300 rounded-full cursor-pointer">
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
        <div
          className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform"
          style={{ left: `${minPercent}%`, top: '50%' }}
          onMouseDown={handleMouseDown('min')}
        />
        <div
          className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform"
          style={{ left: `${maxPercent}%`, top: '50%' }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
    </div>
  );
};

export {
  generateAreaOptions,
  areaValues,
  findClosestOptionIndex,
  formatLabel,
  areaUnits
};

export default DisplayAreaSlider;
