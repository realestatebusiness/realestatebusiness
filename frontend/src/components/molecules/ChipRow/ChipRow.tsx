import React from 'react';
import Chip from '../../atoms/Chip/Chip';

interface ChipRowProps {
  myCount: number;
  recent: string[];
  onMy?: () => void;
}

const ChipRow: React.FC<ChipRowProps> = ({ myCount, recent, onMy }) => (
  <div className="flex flex-wrap gap-3 py-4">
    <Chip label={`My properties (${myCount})`} active onClick={onMy} />
    {recent.map(txt => (
      <Chip key={txt} label={txt} onClick={() => { /* optional navigate */ }} />
    ))}
  </div>
);

export default ChipRow;
