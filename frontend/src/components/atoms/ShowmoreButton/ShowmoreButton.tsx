import { PlusIcon } from "lucide-react";

interface ShowMoreButtonProps {
  count: number;
  onClick: () => void;
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ count, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 py-2 px-1 text-blue-600 hover:text-blue-700 transition-colors"
  >
    <PlusIcon className="w-4 h-4" />
    <span className="text-sm font-medium"> {count} more</span>
  </button>
);

export default ShowMoreButton;
