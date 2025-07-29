import React from "react";
import { useAppSelector } from "../../../app/hooks";
import type { RootState } from "../../../app/store";
import type { VillaProperty } from "../../../types/propertyInterface.";

interface PropertyPostingsSectionProps {
  properties: VillaProperty[];
  loading?: boolean;
  onMyProps?: () => void;
  onReactivate?: (id: string) => void;
  onView?: (id: string) => void;
}

const PropertyPostingsSection: React.FC<PropertyPostingsSectionProps> = ({
  properties,
  loading = false,
  onMyProps,
  onReactivate,
  onView,
}) => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  if (loading) {
    return <div>Loading your property postings…</div>;
  }

  const myProperties = properties.filter((property) => {
    const propertyUserName = property.userName?.toLowerCase().trim();
    const propertyUserEmail = property.userEmail?.toLowerCase().trim();
    
    const loggedUserName = user.name?.toLowerCase().trim();
    const loggedUserEmail = user.email?.toLowerCase().trim();

    return (
      propertyUserName === loggedUserName ||
      propertyUserEmail === loggedUserEmail
    );
  });

  if (myProperties.length === 0) {
    return (
      <div className="border p-6 rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Your Property Postings</h2>
        <p className="text-gray-600">You haven't posted any properties yet.</p>
        <button 
          onClick={onMyProps}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Your First Property
        </button>
      </div>
    );
  }
 const sortedProperties = [...myProperties].sort((a, b) => {
  const aTime = new Date(a.requestDate || a.createdAt || 0).getTime();
  const bTime = new Date(b.requestDate || b.createdAt || 0).getTime();
  return bTime - aTime;
});
const latestProperty = sortedProperties[0];

  const getPropertyPrice = (property: VillaProperty): number | null => {
    return property.propertyProfile?.priceDetails?.price || 
           property.plotDetails?.priceDetails?.price || 
           null;
  };

  const getPropertyArea = (property: VillaProperty): string => {
    const carpetArea = property.propertyProfile?.areaDetails?.carpetArea;
    const areaValue = property.propertyProfile?.areaDetails?.areaValue || property.plotDetails?.areaValue;
    const areaUnit = property.propertyProfile?.areaDetails?.areaUnit || property.plotDetails?.areaUnit;
    
    if (carpetArea && areaUnit) {
      return `${carpetArea} ${areaUnit.replace('_', ' ')}`;
    } else if (areaValue && areaUnit) {
      return `${areaValue} ${areaUnit.replace('_', ' ')}`;
    }
    return '';
  };

  const getFormattedAddress = (property: VillaProperty): string => {
    const { locationDetails } = property;
    
    if (!locationDetails) {
      return 'Address not provided';
    }
    
    const parts = [
      locationDetails.apartmentSociety,
      locationDetails.subLocality,
      locationDetails.locality,
      locationDetails.city
    ].filter(Boolean);
    
    return parts.join(', ') || locationDetails.fullAddress || 'Address not provided';
  };

  const getPropertyTypeDisplay = (property: VillaProperty): string => {
    const { basicDetails } = property;
    
    if (!basicDetails) {
      return 'Property details not available';
    }
    
    let type = '';
    
    if (basicDetails.propertyCategory === 'residential') {
      switch (basicDetails.residentialType) {
        case 'flat_apartment':
          type = 'Apartment';
          break;
        case 'independent_house_villa':
          type = 'Villa/House';
          break;
        case 'plot_land':
          type = 'Plot';
          break;
        default:
          type = 'Residential';
      }
    } else {
      type = basicDetails.commercialType || 'Commercial';
    }
    
    return `${type} for ${basicDetails.lookingFor === 'rent_lease' ? 'Rent' : basicDetails.lookingFor === 'sell' ? 'Sale' : 'PG'}`;
  };

  const price = getPropertyPrice(latestProperty);
  const area = getPropertyArea(latestProperty);
  const address = getFormattedAddress(latestProperty);
  const propertyType = getPropertyTypeDisplay(latestProperty);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Latest Property Posting</h2>
        {myProperties.length > 1 && (
          <span className="text-sm text-gray-500">
            {myProperties.length} total properties
          </span>
        )}
      </div>
      
      <div className="border p-6 rounded-lg bg-white shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div>
            {latestProperty.title}
            <h3 className="text-lg font-medium">
              {latestProperty.basicDetails?.propertyTitle || 'Property Title Not Available'}
            </h3>
            <p className="text-sm text-gray-600">{propertyType}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded ${
            latestProperty.status === 'active' ? 'bg-green-100 text-green-800' :
            latestProperty.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
            latestProperty.status === 'draft' ? 'bg-gray-100 text-gray-800' :
            'bg-red-100 text-red-800'
          }`}>
            {latestProperty.status?.charAt(0).toUpperCase() + latestProperty.status?.slice(1) || 'Unknown'}
          </span>
        </div>
        
        <p className="text-gray-600 mb-3">{address}</p>
        
        <div className="flex gap-4 mb-3">
          {price && (
            <p className="text-lg font-semibold text-green-600">
              ₹{price.toLocaleString()}
            </p>
          )}
          {area && (
            <p className="text-sm text-gray-600 flex items-center">
              📐 {area}
            </p>
          )}
          {latestProperty.propertyProfile?.bedrooms && (
            <p className="text-sm text-gray-600 flex items-center">
              🛏️ {latestProperty.propertyProfile.bedrooms} BHK
            </p>
          )}
        </div>
        
        {latestProperty.media?.photos?.length > 0 && (
          <img
            src={latestProperty.media.photos[0].url}
            alt={latestProperty.basicDetails?.propertyTitle || 'Property Image'}
            className="w-full h-48 object-cover rounded mb-4"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        
        <div className="text-xs text-gray-500 mb-4">
          Posted on: {new Date(latestProperty.requestDate || latestProperty.createdAt || '').toLocaleDateString()}
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={() => onView?.(latestProperty._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Details
          </button>
          
          {onReactivate && latestProperty.status !== 'active' && (
            <button 
              onClick={() => onReactivate(latestProperty._id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Reactivate
            </button>
          )}
          
          {onMyProps && myProperties.length > 1 && (
            <button 
              onClick={onMyProps}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              View All My Properties ({myProperties.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyPostingsSection;