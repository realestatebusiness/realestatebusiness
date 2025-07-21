import React from 'react';

interface ResponsesSectionProps {
  count?: number;
  onViewAll?: () => void;
}

const ResponsesSection: React.FC<ResponsesSectionProps> = ({ count = 0, onViewAll }) => (
  <div className="pt-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {count} Response{count === 1 ? '' : 's'} on this posting
    </h3>
    <button
      type="button"
      onClick={onViewAll}
      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
    >
      View all responses
    </button>
  </div>
);

export default ResponsesSection;
