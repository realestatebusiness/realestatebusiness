import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { RegistrationFormData } from "../../../types/authTypes";
import InputField from "../../atoms/InputField";

interface RegisterFormFieldsProps {
    register: UseFormRegister<RegistrationFormData>;
    errors: FieldErrors<RegistrationFormData>
    setValue: UseFormSetValue<RegistrationFormData>
    watch: UseFormWatch<RegistrationFormData>

}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ register, errors, setValue, watch }) => {
    return (
        <div>
            <InputField
                label="Name"
                type='text'
                name='name'
                register={register('name', {
                    required: 'Name is required'
                })}
                error={errors.name?.message}
            />
            <InputField
                label="email"
                type="email"
                name="email"
                register={register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/i,
                        message: "Invalid email address"
                    }
                })}
                error={errors.email?.message}
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                register={register('password', {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: 'Password must be atleast 8 characters long'
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
                        message:
                            "Password must include uppercase, lowercase, number, and special character",
                    }
                })}
                error={errors.password?.message}
            />
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

        </div>


    )
}

export default RegisterFormFields