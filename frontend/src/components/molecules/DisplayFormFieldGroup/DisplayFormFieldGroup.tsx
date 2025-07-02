
import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import InputField from "../../atoms/InputField";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  fields: { label: string; name: string; type: string; required?: boolean }[];
}

const DisplayFormFieldGroup: React.FC<Props> = ({ register, errors, fields }) => {
  return (
    <>
      {fields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          required={field.required}
          register={register(field.name)}
          error={errors[field.name]?.message as string}
        />
      ))}
    </>
  );
};

export default DisplayFormFieldGroup;
