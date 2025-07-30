import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  color?: "blue" | "red" | "green";
  className?: string;
}

const HeaderBadge: React.FC<BadgeProps> = ({ children, color = "blue", className }) => {
  const colorClass =
    color === "red"
      ? "bg-red-500"
      : color === "green"
      ? "bg-green-500"
      : "bg-blue-600";
  return (
    <span
      className={clsx(
        "text-[10px] text-white px-2 py-0.5 rounded font-semibold inline-block align-middle",
        colorClass,
        className
      )}
    >
      {children}
    </span>
  );
};
export default HeaderBadge;