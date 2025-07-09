import type { InputHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  disabled?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
  prependText?: string;
  inputFieldClass?: string;
  divClass?: string;
  required?: boolean;
  labelClass?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  disabled = false,
  error,
  register,
  prependText,
  inputFieldClass = '',
  divClass = '',
  required = false,
  labelClass = '',
  ...inputProps
}) => {
  return (
    <div className={`flex flex-col gap-1 mb-4 ${divClass}`}>
      <label htmlFor={name} className={`text-sm font-medium text-gray-700 ${labelClass}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex">
        {prependText && (
          <span className="bg-gray-200 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 text-gray-600 text-sm flex items-center">
            {prependText}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          disabled={disabled}
          {...register}
          {...inputProps}
          className={`w-full border px-3 py-2 text-sm ${
            prependText ? 'rounded-r-md' : 'rounded-md'
          } border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputFieldClass}`}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
