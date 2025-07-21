import React from 'react';
import AvatarCircle from '../../atoms/AvatarCircle/AvatarCircle';
import Button from '../../atoms/Button/Button';

interface OwnerSidebarCardProps {
  userName: string;
  activeCount: number;
  onGoMy?: () => void;
}

const OwnerSidebarCard: React.FC<OwnerSidebarCardProps> = ({ userName, activeCount, onGoMy }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <AvatarCircle text={userName} />
    <h4 className="font-semibold text-gray-900">{userName}</h4>
    <p className="text-sm text-gray-500 mb-4">Owner</p>
    <p className="text-sm text-gray-600 mb-6">
      {activeCount > 0
        ? `You have ${activeCount} active propert${activeCount === 1 ? 'y' : 'ies'}.`
        : 'You do not have any active properties.'}
    </p>
    <Button onClick={onGoMy} className="w-full">
      Go to my99acres
    </Button>
  </div>
);

export default OwnerSidebarCard;
