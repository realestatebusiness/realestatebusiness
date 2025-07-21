import React from 'react';
import { Home } from 'react-feather';

interface PropertyMediaThumbProps {
  imageUrl?: string;
  alt?: string;
}

const PropertyMediaThumb: React.FC<PropertyMediaThumbProps> = ({ imageUrl, alt }) => (
  <div className="w-32 h-24 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center text-gray-400">
    {imageUrl ? (
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <Home size={18} />
    )}
  </div>
);

export default PropertyMediaThumb;
