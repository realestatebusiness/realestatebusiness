import React from 'react';
import OwnerSidebarCard from '../../molecules/OwnerSidebarCard/OwnerSidebarCard';

interface DashboardSidebarSectionProps {
  userName: string;
  activeCount: number;
  onGoMy?: () => void;
}

const DashboardSidebarSection: React.FC<DashboardSidebarSectionProps> = ({
  userName,
  activeCount,
  onGoMy,
}) => (
  <aside className="lg:col-span-4 space-y-8">
    <OwnerSidebarCard userName={userName} activeCount={activeCount} onGoMy={onGoMy} />
    {/* Ad slot */}
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <p className="text-sm text-gray-700 mb-4">Invest acres</p>
      <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
        Visit Now
      </button>
    </div>
  </aside>
);

export default DashboardSidebarSection;
