// src/components/templates/ProfilePageTemplate/ProfilePageTemplate.tsx
import React from 'react';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import Header from '../../organisms/Header/Header';

interface ProfilePageTemplateProps {
  children: React.ReactNode;
  userName: string;
  userRole: string;
  profileImage?: string;
  lastVisited?: string;
  className?: string;
}

const ProfilePageTemplate: React.FC<ProfilePageTemplateProps> = ({
  children,
  userName,
  userRole,
  profileImage,
  lastVisited,
  className = '',
}) => {
  return (
    <div className={`flex min-h-screen bg-white overflow-hidden ${className}`}>
      <Sidebar
        userName={userName}
        userRole={userRole}
        profileImage={profileImage}
      />
      
      <main className="flex-1 flex flex-col h-screen">
        <Header lastVisited={lastVisited} />
        
        <div className="mb-6 px-4 pt-6">
          <h2 className="text-xl font-semibold">Your Contact Details</h2>
          <p className="text-sm text-gray-500">
            (This is where people interested in your property will contact you)
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ProfilePageTemplate;