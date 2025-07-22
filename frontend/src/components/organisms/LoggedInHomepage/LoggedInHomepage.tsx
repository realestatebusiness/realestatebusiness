import React from 'react';
import ChipRow from '../../molecules/ChipRow/ChipRow';
import PropertyPostingsSection from '../PropertyPostingsSection/PropertyPostingsSection';
import ResponsesSection from '../ResponsesSection/ResponsesSection';
import DashboardSidebarSection from '../DashboardSidebarSection/DashboardSidebarSection';
import type { VillaProperty } from '../../../types/propertyInterface.';
import { useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';

interface LoggedInHomepageOrganismProps {
  userName: string;
  properties: VillaProperty[];
  loading: boolean;
  onMyProps?: () => void;
  onReactivate?: (id: string) => void;
  onView?: (id: string) => void;
  onViewResponses?: () => void;
}

const LoggedInHomepage: React.FC<LoggedInHomepageOrganismProps> = ({
  userName,
  properties,
  loading,
  onMyProps,
  onReactivate,
  onView,
  onViewResponses,
}) => {
    const user = useAppSelector((state: RootState) => state.auth.user);
  
  const activeCount = properties.filter((p) => p.status === 'active').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main column */}
      <div className="lg:col-span-8 space-y-8">
        <div>
          {/* <p className="text-sm text-gray-500 mb-2">Continue browsing...</p> */}
          <ChipRow
            myCount={properties.length}
            recent={['Buy in Hyderabad', 'Buy in Secunderabad', 'Rent in Hyderabad']}
            onMy={onMyProps}
          />
        </div>

        <PropertyPostingsSection
          properties={properties}
          loading={loading}
          userName={userName}
          onMyProps={onMyProps}
          onReactivate={onReactivate}
          onView={onView}
        />

        <ResponsesSection count={0} onViewAll={onViewResponses} />
      </div>

      {/* Sidebar */}
      <DashboardSidebarSection
        userName={userName}
        activeCount={activeCount}
        onGoMy={onMyProps}
      />
    </div>
  );
};

export default LoggedInHomepage;
