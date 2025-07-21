import React from 'react';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full border text-sm
      ${active ? 'bg-blue-100 text-blue-700 border-blue-400' : 'bg-white border-gray-300 text-gray-700'}
      hover:bg-gray-50`}
  >
    {label}
  </button>
);

export default Chip;
