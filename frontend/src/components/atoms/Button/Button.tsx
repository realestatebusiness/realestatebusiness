import type React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    overrideStyles?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    text,
    onClick,
    className = '',
    disabled,
    variant = 'primary',
    type = 'button',
    overrideStyles = false,
}) => {
    const baseStyle = 'px-6 py-2 rounded-md text-white';
    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700',
        secondary: 'bg-gray-400 hover:bg-gray-500',
        danger: 'bg-red-600 hover:bg-red-700',
    };

    const buttonClassName = overrideStyles
        ? className
        : `${baseStyle} ${variantStyles[variant]} ${className}`;

    return (
       <button
       type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClassName}>
       
        {children ?? text}
       </button>
    )

}
export default Button;