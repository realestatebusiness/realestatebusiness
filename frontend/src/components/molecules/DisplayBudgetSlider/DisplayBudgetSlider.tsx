import React, { useCallback, useRef, useState } from "react";
import RangeHandle from "../../atoms/RangeHandle/RangeHandle";

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



interface BudgetSliderProps {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  onChange: (min: number, max: number) => void;
}

const DisplayBudgetSlider: React.FC<BudgetSliderProps> = ({ 
  min, 
  max, 
  minLabel, 
  maxLabel, 
  onChange 
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const getValueFromPosition = useCallback((clientX: number): number => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    
    const index = Math.round(percentage * (budgetOptions.length - 1));
    const clampedIndex = Math.max(0, Math.min(budgetOptions.length - 1, index));
    
    return budgetValues[clampedIndex];
  }, []);

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (isDragging === 'min') {
      const maxIndex = findClosestOptionIndex(max);
      const newMinIndex = Math.min(findClosestOptionIndex(newValue), maxIndex - 1);
      const newMin = budgetValues[Math.max(0, newMinIndex)];
      onChange(newMin, max);
    } else {
      const minIndex = findClosestOptionIndex(min);
      const newMaxIndex = Math.max(findClosestOptionIndex(newValue), minIndex + 1);
      const newMax = budgetValues[Math.min(budgetValues.length - 1, newMaxIndex)];
      onChange(min, newMax);
    }
  }, [isDragging, min, max, onChange, getValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minIndex = findClosestOptionIndex(min);
  const maxIndex = findClosestOptionIndex(max);
  const minPercent = (minIndex / (budgetOptions.length - 1)) * 100;
  const maxPercent = (maxIndex / (budgetOptions.length - 1)) * 100;

  return (
    <div className="relative w-full py-4">
      <div className="flex justify-between px-1 mb-4">
        <RangeHandle value={minLabel} />
        <RangeHandle value={maxLabel} />
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-2 bg-gray-300 rounded-full cursor-pointer"
      >
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        
        <div
          className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform"
          style={{
            left: `${minPercent}%`,
            top: '50%',
          }}
          onMouseDown={handleMouseDown('min')}
        />
        
        <div
          className="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-grab active:cursor-grabbing transform -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform"
          style={{
            left: `${maxPercent}%`,
            top: '50%',
          }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
    </div>
  );
};

export default DisplayBudgetSlider;