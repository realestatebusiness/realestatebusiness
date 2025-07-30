import React from "react";
import { Search } from "react-feather";
import { Icon } from "../../atoms/Icon";
import { Input } from "../../atoms/Input";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search…",
  onSearch,
}) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div className="flex items-center flex-grow border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 ring-blue-200">
      <Icon icon={Search} className="text-gray-400 mr-2" size={18} />
      <Input
        placeholder={placeholder}
        className="flex-grow"
        onKeyDown={handleKeyDown}
        onChange={() => {}}
        value=""
      />
    </div>
  );
};

export default SearchInput;
