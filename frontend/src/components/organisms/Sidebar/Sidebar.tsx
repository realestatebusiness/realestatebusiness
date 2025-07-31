// src/components/organisms/Sidebar/Sidebar.tsx
import React from 'react';
import UserCard from '../../molecules/UserCard/UserCard';
import { useNavigate } from 'react-router-dom';
import NavigationProfile from '../NavigationHomePage/NavigationProfilePage';

interface SidebarProps {
  userName: string;
  userRole: string;
  profileImage?: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName,
  userRole,
  profileImage,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate('/profile');
  };

  return (
    <aside className={`w-64 bg-gray-100 p-6 overflow-y-auto h-screen space-y-6 border-r ${className}`}>
      <UserCard
        name={userName}
        role={userRole}
        profileImage={profileImage}
        onModifyClick={handleModifyClick}
      />
      <NavigationProfile />
    </aside>
  );
};

export default Sidebar;