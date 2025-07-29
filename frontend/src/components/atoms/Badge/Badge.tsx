import React from "react";

const variantClasses = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  info: "bg-blue-100 text-blue-800",
} as const;

type BadgeVariant = keyof typeof variantClasses;

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
}) => (
  <span
    className={`px-2 py-1 rounded text-sm font-semibold ${variantClasses[variant]}`}
  >
    {children}
  </span>
);

export default Badge;
