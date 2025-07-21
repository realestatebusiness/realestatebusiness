import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage: React.FC<ImageProps> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={`rounded-lg ${className}`} />
);

export default CustomImage;