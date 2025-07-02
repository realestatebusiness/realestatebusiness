import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";


interface InputFiledProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
    name: string;
    disabled?: boolean;
    error?: string;
    register?: UseFormRegisterReturn;
    inputFieldClass?: string;
    divClass?: string;
    required?: boolean;
    labelClass?: string;
}

const InputField: React.FC<InputFiledProps> = ({
    label, type, name, disabled, error, register, required, inputFieldClass, divClass, labelClass,...inputProps

}) => {
    return (
        <div className={`flex flex-col mb-4 ${divClass}`}>
            <label className={`font-medium text-gray-700 ${labelClass}`}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input type={type}
                name={name}
                disabled={disabled}
                className={`p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputFieldClass}`}
                {...register}
                {...inputProps}
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}

export default InputField