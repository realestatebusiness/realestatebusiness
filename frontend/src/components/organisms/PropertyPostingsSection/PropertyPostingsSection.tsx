import type { VillaProperty } from "../../../types/propertyInterface.";

interface PropertyPostingsSectionProps {
  properties: VillaProperty[];
  loading?: boolean;
  onMyProps?: () => void;
  onReactivate?: (id: string) => void;
  onView?: (id: string) => void;
}

const PropertyPostingsSection: React.FC<PropertyPostingsSectionProps> = ({
  properties,
  loading,
  onMyProps,
  onReactivate,
  onView,
}) => {
  if (loading) return <div>Loading your properties…</div>;

  if (properties.length === 0) {
    return <div>You haven’t posted any properties yet.</div>;
  }
  const latestProperty = properties[properties.length - 1];

  return (
    <div>
      <h2>Your Latest Property Posting</h2>
      <div key={latestProperty._id} className="border p-4 mb-4 rounded bg-white">
        <h3>{latestProperty.title}</h3>
        <p>{latestProperty.addressLine}</p>
        {latestProperty.imageUrl && (
          <img
            src={latestProperty.imageUrl}
            alt={latestProperty.title}
            className="w-32 h-32"
          />
        )}
        <button onClick={() => onView?.(latestProperty._id)}>View</button>
      </div>
    </div>
  );
};

export default PropertyPostingsSection;
