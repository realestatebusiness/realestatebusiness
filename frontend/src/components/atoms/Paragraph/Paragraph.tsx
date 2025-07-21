import React from "react";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => (
  <p className={`text-gray-600 text-sm ${className}`}>{children}</p>
);

export default Text;