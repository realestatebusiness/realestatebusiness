// src/components/atoms/Select/Select.tsx
import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  className = '',
  required = false,
}) => {
  const baseClasses = 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
  
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;