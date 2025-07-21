import React from "react";
import clsx from "clsx";

interface NavTextLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: "a" | "button";
  href?: string;
  active?: boolean;
}

const NavTextLink: React.FC<NavTextLinkProps> = ({
  children,
  as = "button",
  href,
  active = false,
  className,
  ...rest
}) => {
  const base = clsx(
    "text-sm font-medium transition-colors",
    active ? "text-blue-600" : "text-gray-600 hover:text-blue-600",
    className
  );

  if (as === "a" && href) {
    return (
      <a href={href} className={base} {...(rest as any)}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={base} {...rest}>
      {children}
    </button>
  );
};
export default NavTextLink; 