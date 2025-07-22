import React from 'react';
import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import type { VillaProperty } from "../../../types/propertyInterface.";

interface PropertyPostingsSectionProps {
  properties: VillaProperty[];
  userName: string;
  loading?: boolean;
  onMyProps?: () => void;
  onReactivate?: (id: string) => void;
  onView?: (id: string) => void;
}

const PropertyPostingsSection: React.FC<PropertyPostingsSectionProps> = ({
  properties,
  userName,
  loading,
  onMyProps,
  onReactivate,
  onView,
}) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  
  // Check if logged-in user matches the userName from API
  const shouldShowProperties = user?.name === userName;
  
  // If user doesn't match or no userName provided, don't render anything
  if (!shouldShowProperties || !userName) {
    return null;
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Property Postings</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't posted any properties yet.</p>
          <button 
            onClick={onMyProps}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Post Your First Property
          </button>
        </div>
      </div>
    );
  }
  
  // Get the latest property by sorting by createdAt date
  const latestProperty = properties
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return dateB - dateA; // Sort in descending order (latest first)
    })[0];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Latest Property Posting</h2>
        <button 
          onClick={onMyProps}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View All Properties ({properties.length})
        </button>
      </div>
      
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          {latestProperty.imageUrl && (
            <div className="flex-shrink-0">
              <img
                src={latestProperty.imageUrl}
                alt={latestProperty.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg text-gray-900">{latestProperty.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                latestProperty.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {latestProperty.status}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3">{latestProperty.addressLine}</p>
            
            {latestProperty.displayId && (
              <p className="text-sm text-gray-500 mb-3">ID: {latestProperty.displayId}</p>
            )}
            
            <div className="flex gap-2">
              <button 
                onClick={() => onView?.(latestProperty._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                View Details
              </button>
              
              {latestProperty.status !== 'active' && (
                <button 
                  onClick={() => onReactivate?.(latestProperty._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm"
                >
                  Reactivate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {properties.length > 1 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            You have {properties.length - 1} more property{properties.length > 2 ? 'ies' : 'y'} posted.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyPostingsSection;