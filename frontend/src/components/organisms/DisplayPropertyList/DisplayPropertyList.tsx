import React, { useState, useEffect, useMemo } from 'react';
import { getRequest } from '../../../services/endpoints';
import { DisplayPropertyCard } from '../../molecules/DisplayPropertyCard';
import { sortOptions } from '../../../utils/constants';
import { useAppSelector } from '../../../app/hooks';
import type { PropertyApiResponse, VillaProperty } from '../../../types/propertyInterface.';
import { selectAmenities, selectArea } from '../../../features/areaAndAmenitiesFilter/areaAndAmenitiesFilterSelectors';


type PropertyType = 'flat_apartment' | 'independent_house_villa' | 'plot_land' | 'office' | 'hospitality' | 'industry';

const isValidPropertyType = (type: string): type is PropertyType => {
  return ['flat_apartment', 'independent_house_villa', 'plot_land', 'office', 'hospitality', 'industry'].includes(type);
};

function extractBedroomNumber(label: string): number {
  if (label.includes('RK')) return 1;
  if (label.includes('9+')) return 9;
  const match = label.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

const DisplayPropertyList: React.FC = () => {
  const [allProperties, setAllProperties] = useState<VillaProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("Newest First");

  const selectedPropertyTypes = useAppSelector((state) => state.typeOfProperty.selectedTypes);
  const budgetRange = useAppSelector((state) => ({
    min: state.filters.minBudget,
    max: state.filters.maxBudget,
  }));
  const selectedBedroomOptions = useAppSelector((state) => state.constructionstatusandbedroomfilter.bedroomOptions);
  const selectedConstructionStatuses = useAppSelector((state) => state.constructionstatusandbedroomfilter.constructionStatusOptions);
  const areaFilter = useAppSelector(selectArea);
  const selectedAmenities = useAppSelector(selectAmenities);

  const getPropertyType = (property: VillaProperty): PropertyType | null => {
    const rawType = property.basicDetails?.residentialType || property.basicDetails?.commercialType;
    if (rawType && isValidPropertyType(rawType)) return rawType;
    if (property.plotDetails) return 'plot_land';
    if (property.propertyProfile) return 'independent_house_villa';
    return 'flat_apartment';
  };

  const getPropertyPrice = (property: VillaProperty): number => {
    return property.propertyProfile?.priceDetails?.price ?? property.plotDetails?.priceDetails?.price ?? 0;
  };

  const sortProperties = (properties: VillaProperty[], sortBy: string): VillaProperty[] => {
    const getPrice = (p: VillaProperty) => getPropertyPrice(p);
    const getArea = (p: VillaProperty) => p.propertyProfile?.areaDetails?.areaValue ?? p.plotDetails?.areaValue ?? 1;

    switch (sortBy) {
      case "Price Low to High":
        return [...properties].sort((a, b) => getPrice(a) - getPrice(b));
      case "Price High to Low":
        return [...properties].sort((a, b) => getPrice(b) - getPrice(a));
      case "Newest First":
        return [...properties].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case "Price / sq.ft. : Low to High":
        return [...properties].sort((a, b) => getPrice(a) / getArea(a) - getPrice(b) / getArea(b));
      case "Price / sq.ft. : High to Low":
        return [...properties].sort((a, b) => getPrice(b) / getArea(b) - getPrice(a) / getArea(a));
      default:
        return [...properties];
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await getRequest<PropertyApiResponse>('/getProperties', {});
        setAllProperties(response.data.data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const processedProperties = useMemo(() => {
    let filtered = allProperties;

    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter((property) => {
        const propertyType = getPropertyType(property);
        return propertyType && selectedPropertyTypes.includes(propertyType);
      });
    }

    filtered = filtered.filter((property) => {
      const price = getPropertyPrice(property);
      const priceInLacs = price / 100000;
      if (budgetRange.min === 0 && budgetRange.max === 10000) return true;
      return priceInLacs >= budgetRange.min && priceInLacs <= budgetRange.max;
    });

    if (selectedBedroomOptions.length > 0) {
      filtered = filtered.filter((property) => {
        const bedroomCount = property.propertyProfile?.bedrooms ?? 0;
        return selectedBedroomOptions.some((label) => {
          const num = extractBedroomNumber(label);
          return num === 9 ? bedroomCount >= 9 : bedroomCount === num;
        });
      });
    }

    if (selectedConstructionStatuses.length > 0) {
      filtered = filtered.filter((property) => {
        const status = property.propertyProfile?.availabilityStatus || "";
        return selectedConstructionStatuses.includes(status);
      });
    }

    if (areaFilter) {
      const { min: areaMin, max: areaMax } = areaFilter;
      filtered = filtered.filter((property) => {
        const area = property.propertyProfile?.areaDetails?.areaValue ?? property.plotDetails?.areaValue ?? 0;
        return area >= areaMin && area <= areaMax;
      });
    }

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(property => {
        const a = property.amenities;
        if (!a) return false;

        for (const amenity of selectedAmenities) {
          if (
            !(a.otherRooms?.includes(amenity as any) ||
              a.parking?.includes(amenity as any) ||
              a.generalAmenities?.includes(amenity as any) ||
              a.furnishing === amenity ||
              a.powerBackup === amenity ||
              a.propertyFacing === amenity)
          ) {
            return false;
          }
        }
        return true; // All selected amenities found
      });
    }


    return sortProperties(filtered, sortBy);
  }, [
    allProperties,
    selectedPropertyTypes,
    budgetRange,
    selectedBedroomOptions,
    selectedConstructionStatuses,
    areaFilter,
    selectedAmenities,
    sortBy,
  ]);

  const isBudgetFilterActive = budgetRange.min > 0 || budgetRange.max < 10000;
  const isBedroomFilterActive = selectedBedroomOptions.length > 0;
  const isConstructionStatusFilterActive = selectedConstructionStatuses.length > 0;
  const isAreaFilterActive = areaFilter.min !== 100 || areaFilter.max !== 4000;
  const isAmenitiesFilterActive = selectedAmenities.length > 0;

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedPropertyTypes.length > 0) count++;
    if (isBudgetFilterActive) count++;
    if (isBedroomFilterActive) count++;
    if (isConstructionStatusFilterActive) count++;
    if (isAreaFilterActive) count++;
    if (isAmenitiesFilterActive) count++;
    return count;
  };

  const formatBudget = (value: number): string => {
    if (value >= 10000) return "100+ Crores";
    if (value >= 100) return `${(value / 100).toFixed(1)} Crores`;
    return `${value} Lacs`;
  };

  if (loading) {
    return (
      <div className="text-center mt-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {processedProperties.length} Properties Found
            </h1>
            {activeFilterCount > 0 && (
              <div className="text-sm text-gray-600 mt-1 space-y-1">
                <p>Active filters ({activeFilterCount}):</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPropertyTypes.length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Property Types: {selectedPropertyTypes.length}
                    </span>
                  )}
                  {isBudgetFilterActive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Budget: {formatBudget(budgetRange.min)} - {formatBudget(budgetRange.max)}
                    </span>
                  )}
                  {isBedroomFilterActive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      Bedrooms: {selectedBedroomOptions.length} selected
                    </span>
                  )}
                  {isConstructionStatusFilterActive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                      Construction Status: {selectedConstructionStatuses.length} selected
                    </span>
                  )}
                  {isAreaFilterActive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-800">
                      Area: {areaFilter.min} - {areaFilter.max} {areaFilter.unit}
                    </span>
                  )}
                  {isAmenitiesFilterActive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
                      Amenities: {selectedAmenities.length} selected
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {processedProperties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No properties match your current filters.</p>
          {activeFilterCount > 0 && (
            <p className="text-sm text-gray-400 mt-2">
              Try clearing some filters to see more results.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {processedProperties.map((property) => (
            <DisplayPropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayPropertyList;
