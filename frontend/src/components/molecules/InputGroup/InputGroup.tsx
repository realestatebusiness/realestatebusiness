import { InputField } from "../../atoms/InputField";
import type React from "react";

interface InputGroupProps {
    name: string;
    placeholder?: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ name, placeholder, value, type = "text", onChange }) => {
    return (
        <div className="input-group">
            <InputField
                label={placeholder ?? ""}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputGroup;
