import React from 'react';

interface AvatarCircleProps {
  text: string; className?: string;
}

const AvatarCircle: React.FC<AvatarCircleProps> = ({ text, className }) => (
  <div
    className={`mx-auto mb-4 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center
                text-emerald-700 font-bold uppercase ${className ?? ''}`}
  >
    {text?.[0] ?? '?'}
  </div>
);

export default AvatarCircle;
