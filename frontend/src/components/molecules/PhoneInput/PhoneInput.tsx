// src/components/molecules/PhoneInput/PhoneInput.tsx
import React from 'react';
import Label from '../../atoms/Label/Label';
import Select from '../../atoms/Select/Select';
import Input from '../../atoms/InputField/InputField';

interface PhoneInputProps {
  label: string;
  phoneValue: string;
  countryCode?: string;
  onPhoneChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  phoneValue,
  countryCode = '91',
  onPhoneChange,
  onCountryChange,
  required = false,
  className = '',
}) => {
  const countryOptions = [
    { value: '91', label: '+91 IND' },
    { value: '44', label: '+44 GBR' },
    { value: '1', label: '+1 USA' },
  ];

  return (
    <div className={`mb-4 ${className}`}>
      <Label required={required}>{label}</Label>
      <div className="flex gap-2 mt-1 w-1/2">
        <Select
          value={countryCode}
          onChange={onCountryChange}
          options={countryOptions}
          className="w-24"
        />
        <Input
          type="tel"
          name="phoneNumber"
          value={phoneValue}
          onChange={onPhoneChange}
          placeholder="Phone Number"
          required={required}
          className="flex-1" label={''}        />
      </div>
    </div>
  );
};

export default PhoneInput;