interface InputProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;   // 👈 add this
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyDown,        
  className = "",
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    className={`outline-none text-sm text-gray-700 placeholder:text-gray-500 ${className}`}
  />
);

export default Input;