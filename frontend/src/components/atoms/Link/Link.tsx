import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
  return (
    <a href={href} className={`text-blue-600 underline hover:text-blue-800 ${className}`}>
      {children}
    </a>
  );
};

export default Link;
