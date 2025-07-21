import React from "react";
import { FilterButton } from "../../molecules/FilterButton";

interface FilterBarProps {
  filters: string[];
  className?: string;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void; 
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  className = "",
}) => (
  <div className={`mt-5 ${className}`}>
    <div className="flex flex-wrap gap-4">
     {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <FilterButton
            key={filter}
            label={filter}
            active={isActive}
            onClick={() => onFilterChange(isActive ? null : filter)}
          />
        );
      })}
    </div>
  </div>
);

export default FilterBar;
