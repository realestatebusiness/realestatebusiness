import { CheckCircle } from "react-feather";

interface CheckItemProps {
  children: React.ReactNode;
}
const CheckItem: React.FC<CheckItemProps> = ({ children }) => (
  <div className="flex items-start gap-2">
    <CheckCircle className="text-blue-500 mt-1" size={18} />
    <span className="text-gray-700 text-sm">{children}</span>
  </div>
);
export default CheckItem;
