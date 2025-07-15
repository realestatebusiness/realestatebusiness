import { useEffect, useState } from "react";
import { Crosshair } from "lucide-react";
import { getRequest } from "../services/endpoints";

interface Property {
propertyId: string;
}

const PropertiesNearMe: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  const fetchNearbyProperties = async (
    lat: number,
    lng: number
  ): Promise<void> => {
    try {
      const res = await getRequest<{ data: Property[] }>("/nearby", {
        params: { lat, lng },
      });
      console.log('res',res)
      setProperties(res?.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  const getUserLocation = (): void => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchNearbyProperties(latitude, longitude);
      },
      (error) => {
        console.error("Location access denied:", error);
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <div className="mt-4">
        {properties.map((property) => (
          <div key={property.propertyId} className="p-4 border rounded mb-2">
              <li>{property.propertyId}</li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesNearMe;
