// /components/organisms/DisplayPropertyList.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchPropertiesStart,
    fetchPropertiesSuccess,
    fetchPropertiesFailure
} from '../../../features/property/propertySlice';
import {
    selectAllProperties,
    selectPropertyLoading,
    selectPropertyError
} from '../../../features/property/propertySelectors';
import { getRequest } from '../../../services/endpoints';
import type { PropertyApiResponse, VillaProperty } from '../../../types/propertyInterface.';
import { DisplayPropertyCard } from '../../molecules/DisplayPropertyCard';

const DisplayPropertyList: React.FC = () => {
  const dispatch = useDispatch();
  const properties = useSelector(selectAllProperties);
  const loading = useSelector(selectPropertyLoading);
  const error = useSelector(selectPropertyError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPropertiesStart());
        const response = await getRequest<PropertyApiResponse>('/getProperties', {});
        console.log('response', response)
        dispatch(fetchPropertiesSuccess(response.data.data));
      } catch (err) {
        dispatch(fetchPropertiesFailure('Failed to fetch properties'));
      }
    };

    fetchData();
  }, [dispatch]);

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
      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            {properties.length} Properties Found
          </h1>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Area: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <DisplayPropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};
export default DisplayPropertyList;