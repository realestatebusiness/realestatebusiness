import { PlusIcon, CheckIcon } from "react-feather";

interface PropertyOptionProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const PropertyOption: React.FC<PropertyOptionProps> = ({ 
  label, 
  isSelected = false, 
  onClick 
}) => (
  <div 
    className={`flex items-center gap-2 py-2 px-3 cursor-pointer rounded-full border transition-colors
      ${isSelected 
        ? 'border-blue-500 bg-blue-50 text-blue-600 font-medium' 
        : 'border-gray-200 text-gray-800 hover:bg-gray-50'}
    `}
    onClick={onClick}
  >
    {isSelected ? (
      <CheckIcon className="w-4 h-4 text-blue-600" />
    ) : (
      <PlusIcon className="w-4 h-4 text-gray-500" />
    )}
    <span className="text-sm">{label}</span>
  </div>
);

export default PropertyOption;
