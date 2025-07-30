import React from "react";
import { ChevronDown, Crosshair, Mic } from "react-feather";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icon";
import { SearchInput } from "../../molecules/SearchInput";
import { IconButton } from "../../molecules/IconButton";

interface SearchBarProps {
  selectedTab: string;
  propertyCategory: string;
  onSearch: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  selectedTab,
  propertyCategory,
  onSearch,
  className = "",
}) => (
  <div
    className={`flex flex-wrap items-center gap-4 mt-6 border border-gray-300 rounded-lg px-4 py-4 bg-white ${className}`}
  >
    <Button
      className="min-w-[170px] flex items-center justify-between"
    >
      {propertyCategory}
      <Icon icon={ChevronDown} className="ml-2" />
    </Button>

    <SearchInput
      placeholder={`Search "${
        selectedTab === "Plots/Land"
          ? "plot in Delhi"
          : "Flat for rent in Noida"
      }"`}
      onSearch={onSearch}
    />

    <div className="flex gap-2">
      <IconButton icon={Crosshair} />
      <IconButton icon={Mic} />
    </div>

    <Button onClick={onSearch}>Search</Button>
  </div>
);

export default SearchBar;
