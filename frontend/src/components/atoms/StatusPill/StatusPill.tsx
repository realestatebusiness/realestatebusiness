import React from 'react';

interface StatusPillProps {
  label: string;
  tone?: 'danger' | 'info' | 'success';
}

const toneClasses: Record<string, string> = {
  danger: 'bg-red-100 text-red-700',
  info:   'bg-blue-100 text-blue-700',
  success:'bg-green-100 text-green-700',
};

const StatusPill: React.FC<StatusPillProps> = ({ label, tone = 'info' }) => (
  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${toneClasses[tone]}`}>
    {label}
  </span>
);

export default StatusPill;
