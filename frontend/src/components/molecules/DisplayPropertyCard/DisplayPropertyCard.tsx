import React from 'react';
import { Heart } from 'react-feather';
import Button from '../../atoms/Button';
import type { VillaProperty } from '../../../types/propertyInterface.';

interface Props {
  property: VillaProperty;
}

const DisplayPropertyCard: React.FC<Props> = ({ property }) => {
  const {
    media,
    basicDetails,
    locationDetails,
    propertyProfile,
    plotDetails,
  } = property;

  const imageUrl =
    media?.photos?.[0]?.url || '/placeholder.jpg';

  const price =
    propertyProfile?.priceDetails?.price ||
    plotDetails?.priceDetails?.price ||
    0;

  const area =
    propertyProfile?.areaDetails?.areaValue ||
    plotDetails?.areaValue ||
    0;

  const areaUnit =
    propertyProfile?.areaDetails?.areaUnit ||
    plotDetails?.areaUnit ||
    '';

  const city = locationDetails?.city || 'City';
  const locality = locationDetails?.locality || 'Locality';

  const bedrooms = propertyProfile?.bedrooms ?? '-';
  const bathrooms = propertyProfile?.bathrooms ?? '-';

  const amenitiesData = property.amenities || {};
  
  const formatAmenityName = (name: string) => {
    return name.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const allAmenities: string[] = [];
  
  if (amenitiesData.generalAmenities) {
    allAmenities.push(...amenitiesData.generalAmenities.map(formatAmenityName));
  }
  if (amenitiesData.societyBuildingFeatures) {
    allAmenities.push(...amenitiesData.societyBuildingFeatures.map(formatAmenityName));
  }
  if (amenitiesData.propertyFeatures) {
    allAmenities.push(...amenitiesData.propertyFeatures.map(formatAmenityName));
  }
  if (amenitiesData.additionalFeatures) {
    allAmenities.push(...amenitiesData.additionalFeatures.map(formatAmenityName));
  }
  if (amenitiesData.locationAdvantages) {
    allAmenities.push(...amenitiesData.locationAdvantages.map(formatAmenityName));
  }
  if (amenitiesData.parking) {
    allAmenities.push(...amenitiesData.parking.map(formatAmenityName));
  }
  if (amenitiesData.waterSource) {
    allAmenities.push(...amenitiesData.waterSource.map(formatAmenityName));
  }
  if (amenitiesData.otherFeatures) {
    allAmenities.push(...amenitiesData.otherFeatures.map(formatAmenityName));
  }
  if (amenitiesData.powerBackup) {
    allAmenities.push(`${formatAmenityName(amenitiesData.powerBackup)} Power Backup`);
  }
  if (amenitiesData.furnishing) {
    allAmenities.push(formatAmenityName(amenitiesData.furnishing));
  }

  return (
     
    <div className="flex bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative w-2/5 min-w-0">
        <img src={imageUrl} alt="property" className="w-full h-full object-cover" />
        <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 shadow hover:bg-white transition-colors">
          <Heart className="h-4 w-4 text-red-500" />
        </button>
      </div>

      <div className="w-3/5 p-4 flex flex-col justify-between min-w-0">
        <div className="flex-1">
          <div className="text-xs text-gray-700 font-bold uppercase mb-1">
            {basicDetails?.propertyTitle || 'Property Title'}
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {bedrooms} BHK Flat in {locality}, {city}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 text-sm font-medium text-gray-800 mb-2">
            <div>₹{(price / 100000).toFixed(2)} Lac</div>
            <div className="text-gray-500 text-sm">
              ₹{Math.round(price / area).toLocaleString('en-IN')}/sqft
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
            <div>
              <strong className="text-gray-800">{area}</strong> {areaUnit}
              <span className="text-gray-500 ml-1">(Super Built-up)</span>
            </div>
            <div>
              <strong>{bedrooms}</strong> Beds • <strong>{bathrooms}</strong> Bath
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {allAmenities.length > 0 ? (
              <div>
                <span className="font-medium text-gray-700">Amenities: </span>
                {allAmenities.slice(0, 4).join(', ')}
                {allAmenities.length > 4 && (
                  <span className="text-gray-500"> +{allAmenities.length - 4} more</span>
                )}
              </div>
            ) : (
              <span className="text-gray-500">No amenities listed</span>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t">
          <Button text="View Number" variant="secondary" />
          <Button text="Contact" variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default DisplayPropertyCard;