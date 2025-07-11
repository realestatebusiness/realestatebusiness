import React from "react";

interface Props {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}

const Dropdown: React.FC<Props> = ({ value, options, onChange, placeholder }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded px-3 py-1 w-full text-sm text-gray-700"
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Dropdown;
