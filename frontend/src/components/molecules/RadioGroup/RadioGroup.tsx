import { RadioButton } from "../../atoms/RadioButton";

interface RadioGroupProps {
    options: string[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const RadioGroup = ({ options, selectedValue, onChange }: RadioGroupProps) => {
    return (
  <div className="radio-group flex items-center gap-2">
            {options.map(option => (
                <RadioButton
                    key={option}
                    value={option}
                    checked={selectedValue === option}
                    onChange={() => onChange(option)}
                />
            ))}
        </div>
    );
};

export default RadioGroup;
