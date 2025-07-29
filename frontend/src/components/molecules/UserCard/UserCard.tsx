// src/components/molecules/UserCard/UserCard.tsx
import React from 'react';

interface UserCardProps {
  name: string;
  role: string;
  profileImage?: string;
  onModifyClick?: () => void;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  role,
  profileImage = 'https://static.99acres.com/images/owner_pnava.png',
  onModifyClick,
  className = '',
}) => {   
  return (
    <div className={`text-center mb-6 ${className}`}>
      <div className="relative w-20 h-20 mx-auto mb-2">
        <div className="absolute inset-0 bg-black/10 rounded-full"></div>
        <img
          src={profileImage}
          alt="User"
          className="rounded-full w-full h-full object-cover relative z-10"
        />
      </div>
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
      <button
        onClick={onModifyClick}
        className="text-blue-600 font-medium underline hover:text-blue-800"
      >
        Modify
      </button>
    </div>
  );
};

export default UserCard;