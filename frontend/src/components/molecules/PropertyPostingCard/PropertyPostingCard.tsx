import React from 'react';
import type { UserProperty } from '../../../domain/types/property';
import PropertyMediaThumb from '../../atoms/PropertyMediaThumb/PropertyMediaThumb';
import StatusPill from '../../atoms/StatusPill/StatusPill';
import Button from '../../atoms/Button/Button';

interface PropertyPostingCardProps {
  prop: UserProperty;
  onReactivate?: (id: string) => void;
  onView?: (id: string) => void;
}

const PropertyPostingCard: React.FC<PropertyPostingCardProps> = ({ prop, onReactivate, onView }) => {
  const deleted = prop.status === 'deleted';
  const inactive = prop.status === 'inactive';

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 flex gap-4 items-start">
      <PropertyMediaThumb imageUrl={prop.imageUrl} alt={prop.title} />

      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1">
          Property ID - {prop.displayId ?? prop._id}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{prop.title}</h3>
        <p className="text-sm text-gray-600">{prop.addressLine}</p>

        {(deleted || inactive) && (
          <div className="mt-3">
            <StatusPill label="Deleted property posting" tone="danger" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        {(deleted || inactive) ? (
          <Button
            onClick={() => onReactivate?.(prop._id)}
            className="mt-auto bg-blue-600 text-white hover:bg-blue-700"
          >
            Re-activate Posting
          </Button>
        ) : (
          <Button
            onClick={() => onView?.(prop._id)}
            className="mt-auto bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            View
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyPostingCard;
