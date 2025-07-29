import type { FC } from "react";
import type { IconProps as FeatherIconProps } from "react-feather";
import { Icon } from "../../atoms/Icon";

type PropertyCardProps = {
  title: string;
  subtitle?: string;
  propertyId: string;
  status?: "active" | "deleted";
  image?: string;
  bgColor?: string;
  iconColor?: string;
  icon?: React.ComponentType<FeatherIconProps>;
  onReactivate?: () => void;
};

const PropertyCard: FC<PropertyCardProps> = ({
  title,
  subtitle,
  propertyId,
  status,
  image,
  bgColor = "bg-white",
  iconColor,
  icon,
  onReactivate
}) => (
  <div className={`${bgColor} rounded-xl p-4 border shadow-sm flex gap-4`}>
    {/* Image or Icon */}
    <div className="w-24 h-20 rounded overflow-hidden flex items-center justify-center bg-gray-100">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : icon ? (
        <Icon icon={icon} size={32} className="text-gray-500" />
      ) : null}
    </div>

    {/* Content */}
    <div className="flex-1">
      <p className="text-xs text-gray-500">Property ID - {propertyId}</p>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      {status === "deleted" && (
        <p className="text-red-600 text-sm font-semibold mt-2">Deleted property posting</p>
      )}
    </div>

    {/* Actions */}
    {status === "deleted" ? (
      <button
        onClick={onReactivate}
        className="text-blue-600 border border-blue-500 px-3 py-1 rounded-lg text-sm hover:bg-blue-50"
      >
        Re-activate Posting
      </button>
    ) : (
      <button className="text-blue-600 hover:underline text-sm">View</button>
    )}
  </div>
);

export default PropertyCard;
