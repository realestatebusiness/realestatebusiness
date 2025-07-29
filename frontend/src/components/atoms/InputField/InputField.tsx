import React from 'react';
import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
  prependText?: string;
  inputFieldClass?: string;
  divClass?: string;
  labelClass?: string;
  required?: boolean;
  showWrapper?: boolean; // control whether to show label & wrapper or just plain input
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  disabled = false,
  error,
  register,
  prependText,
  inputFieldClass = '',
  divClass = '',
  labelClass = '',
  required = false,
  showWrapper = true,
  ...inputProps
}) => {
  const baseClasses =
    ' w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
  const finalInputClass = `${baseClasses} ${disabledClasses} ${
    prependText ? 'rounded-r-md' : 'rounded-md'
  } ${inputFieldClass}`;

  const inputElement = (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      {...register}
      {...inputProps}
      className={finalInputClass}
    />
  );

  if (!showWrapper) {
    return inputElement;
  }

  return (
    <div className={`flex flex-col gap-1 mb-4 ${divClass}`}>
      {label && (
        <label htmlFor={name} className={`text-sm font-medium text-gray-700 ${labelClass}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex">
        {prependText && (
          <span className=" w-full bg-gray-200 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 text-gray-600 text-sm flex items-center">
            {prependText}
          </span>
        )}
        {inputElement}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
