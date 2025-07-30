import React, { useState, useEffect, useMemo } from 'react';
import { getRequest } from '../../../services/endpoints';
import { DisplayPropertyCard } from '../../molecules/DisplayPropertyCard';
import { sortOptions } from '../../../utils/constants';
import type { PropertyApiResponse, VillaProperty } from '../../../types/propertyInterface.';

const DisplayPropertyList: React.FC = () => {
  // Local state instead of Redux
  const [properties, setProperties] = useState<VillaProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("Newest First");

  // Fetch data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await getRequest<PropertyApiResponse>('/getProperties', {});
        setProperties(response.data.data);
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  // Sort properties
  const sortedProperties = useMemo(() => {
    const getPrice = (p: VillaProperty) =>
      p.propertyProfile?.priceDetails?.price ??
      p.plotDetails?.priceDetails?.price ??
      0;

    const getArea = (p: VillaProperty) =>
      p.propertyProfile?.areaDetails?.areaValue ??
      p.plotDetails?.areaValue ??
      1;

    let sorted: VillaProperty[];

    switch (sortBy) {
      case "Price Low to High":
        sorted = [...properties].sort((a, b) => getPrice(a) - getPrice(b));
        break;

      case "Price High to Low":
        sorted = [...properties].sort((a, b) => getPrice(b) - getPrice(a));
        break;

      case "Newest First":
        sorted = [...properties].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;

      case "Price / sq.ft. : Low to High":
        sorted = [...properties].sort(
          (a, b) => getPrice(a) / getArea(a) - getPrice(b) / getArea(b)
        );
        break;

      case "Price / sq.ft. : High to Low":
        sorted = [...properties].sort(
          (a, b) => getPrice(b) / getArea(b) - getPrice(a) / getArea(a)
        );
        break;

      default:
        sorted = [...properties];
    }

    return sorted;
  }, [properties, sortBy]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
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

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            {sortedProperties.length} Properties Found
          </h1>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={sortBy}
              onChange={handleSortChange}
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

      <div className="space-y-4">
        {sortedProperties.map((property) => (
          <DisplayPropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default DisplayPropertyList;