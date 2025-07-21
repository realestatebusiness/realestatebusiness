import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus } from 'lucide-react';

interface IconProps {
  className?: string;
}

const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <Plus className={className} />
);

const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
  <ChevronUp className={className} />
);

const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <ChevronDown className={className} />
);

export default {ChevronUpIcon,ChevronDownIcon};