// src/components/molecules/FormField/FormField.tsx
import React from 'react';
import Label from '../../atoms/Label/Label';
import Input from '../../atoms/InputField/InputField';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  inputClassName?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  className = '',
  inputClassName = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`mt-1 w-full ${inputClassName} ${error ? 'border-red-500' : ''}`} label={''}      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;