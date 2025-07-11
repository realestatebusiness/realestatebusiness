// types/propertyInterface.ts

export interface VillaProperty {
  _id: string;
  userId: string;
  propertyId: string;
  isDraft: boolean;
  propertyFor: string;

  basicDetails: {
    propertyType: string;
    bhkType: string;
    builtUpArea: number;
    carpetArea: number;
    lookingFor: string;
    floor: number;
    totalFloors: number;
    propertyAge: string;
    furnishing: string;
    bathrooms: number;
    balconies: number;
    openSides: number;
    additionalRooms: string[];
  };

  locationDetails: {
    city: string;
    locality: string;
    subLocality: string;
    apartmentSociety: string;
    street: string;
    houseNumber: string;
    landmark: string;
  };

  rentalDetails: {
    monthlyRent: number;
    securityDeposit: number;
    rentNegotiable: boolean;
    maintenanceCharges: number;
    availableFrom: string;
    preferredTenants: string[];
    parkingAvailability: string[];
    entranceFacing: string;
  };

  amenities: {
    commonArea: string[];
    additionalAmenities: string[];
  };

  photos: {
    livingRoom: string[];
    bedrooms: string[];
    bathrooms: string[];
    kitchen: string[];
    balconies: string[];
    others: string[];
  };

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface PropertyApiResponse {
  success: boolean;
  count?: number;
  data: VillaProperty[];
  message?: string;
}