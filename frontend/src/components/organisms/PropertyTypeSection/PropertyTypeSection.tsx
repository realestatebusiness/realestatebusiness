import { Eye } from "react-feather";
import { Button } from "../../atoms/Button";
import { PropertyCard } from "../../molecules/PropertyCard";
import { Icon } from "../../atoms/Icon";

type PropertyTypeSectionProps = {
  isGuest: boolean;
  userName?: string;
  location: string;
  propertyTypes: {
    title: string;
    count: string;
    bgColor: string;
    iconColor: string;
    icon: React.ComponentType<any>;
  }[];
};

const PropertyTypeSection: React.FC<PropertyTypeSectionProps> = ({
  isGuest,
  userName,
  location,
  propertyTypes
}) => (
  <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mb-8">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Apartments, Villas and more</h2>
        <p className="text-gray-600">in {location}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Icon icon={Eye} />
        <span>{isGuest ? "Guest User" : userName}</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {propertyTypes.map((item, index) => (
        <PropertyCard
          key={index}
          title={item.title}
          count={item.count}
          bgColor={item.bgColor}
          iconColor={item.iconColor}
          icon={item.icon}
        />
      ))}
    </div>

    {isGuest && (
      <div className="mt-6 text-right">
        <Button>Login/Register to Save Activity</Button>
        <p className="text-sm text-gray-500 mt-2">
          & see your activities across browsers & devices...
        </p>
      </div>
    )}
  </div>
);

export default PropertyTypeSection;
