import type React from "react";

interface RadioButtonProps {
    value: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ value, checked, onChange }) => {
    return (
        <label
            className={`px-4 py-2 border rounded-full cursor-pointer text-sm font-medium 
                ${checked ? 'bg-blue-100 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-600'}`}
        >
            <input
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            {value}
        </label>
    );
};

export default RadioButton;
