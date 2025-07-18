import React from "react";
import InputField from "../../atoms/InputField";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LoginFormData } from "../../../types/authTypes";

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  usePhoneLogin: boolean;
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  register,
  errors,
  usePhoneLogin,
}) => {
  return (
    <>
      {usePhoneLogin ? (
           <InputField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                maxLength={10}
                required
                prependText="+91"
                register={register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                        value: /^\d{10}$/,
                        message: 'Enter a valid 10-digit number',
                    },
                })}
                error={errors.phoneNumber?.message}
            />

      ) : (
        <>
          <InputField
            label="Email"
            type="email"
            name="email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            register={register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />
        </>
      )}
    </>
  );
};

export default LoginFormFields;
