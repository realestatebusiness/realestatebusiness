export interface VillaProperty {
    _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  propertyId: string;

  basicDetails: {
    lookingFor: 'sell' | 'rent_lease' | 'pg';
    propertyCategory: 'residential' | 'commercial';
    residentialType: 'flat_apartment' | 'independent_house_villa' | 'plot_land';
    commercialType?: 'office' | 'hospitality' | 'industry';
    propertyTitle: string;
  };

  locationDetails: {
    city: string;
    locality: string;
    subLocality?: string;
    apartmentSociety?: string;
    fullAddress?: string;
  };

  propertyProfile?: {
    bedrooms?: number;
    bathrooms?: number;
    balconies?: number;
    areaDetails?: {
      carpetArea?: number;
      areaValue?: number;
      areaUnit?: 'sq_metres' | 'sq_cm' | 'sq_feet' | 'sq_inch';
    };
    floorDetails?: {
      totalFloors?: number;
      propertyOnFloor?: number;
    };
    availabilityStatus?: 'ready_to_move' | 'under_construction' | 'new launch';
    ageOfProperty?: '0_1_year' | '1_5_years' | '5_10_years' | '10_plus_years';
    ownership?: 'freehold' | 'leasehold' | 'cooperative_society' | 'power_of_attorney';
    priceDetails?: {
      price?: number;
      currency?: string;
    };
  };

  plotDetails?: {
    areaValue?: number;
    areaUnit?: 'sq_metres' | 'sq_cm' | 'sq_feet' | 'sq_inch';
    ownership?: 'freehold' | 'leasehold' | 'cooperative_society' | 'power_of_attorney';
    priceDetails?: {
      price?: number;
      currency?: string;
    };
    plotArea?: number;
    dimensions?: {
      length?: number;
      breadth?: number;
    };
    floorsAllowed?: number;
    boundaryWall?: boolean;
    openSides?: '1' | '2' | '3' | '4+';
    constructionDone?: boolean;
    possessionBy?: 'immediate' | 'within_3_months' | 'within_6_months';
  };

  media: {
    photos: {
      url: string;
      caption?: string;
    }[];
    video?: {
      url?: string;
      caption?: string;
    };
  };

  amenities: {
    otherRooms?: ('pooja_room' | 'study_room' | 'servant_room' | 'store_room')[];
    furnishing?: 'furnished' | 'semi_furnished' | 'unfurnished';
    parking?: ('closed_parking' | 'open_parking')[];
    generalAmenities?: (
      | 'visitor_parking'
      | 'water_storage'
      | 'security_fire_alarm'
      | 'lift'
      | 'park'
      | 'vastu_compliant'
    )[];
    propertyFeatures?: (
      | 'high_ceiling_height'
      | 'piped_gas'
      | 'internet_wifi_connectivity'
    )[];
    societyBuildingFeatures?: (
      | 'shopping_center'
      | 'swimming_pool'
      | 'fitness_centre_gym'
    )[];
    additionalFeatures?: ('waste_disposal' | 'rain_water_harvesting')[];
    waterSource?: ('borewell' | '24x7_water')[];
    overlooking?: ('pool' | 'park')[];
    otherFeatures?: ('wheelchair_friendly' | 'pet_friendly')[];
    powerBackup?: 'full' | 'partial' | 'none';
    propertyFacing?: 'east' | 'west' | 'north' | 'south' | 'north_east';
    locationAdvantages?: (
      | 'close_to_metro_station'
      | 'close_to_market'
      | 'close_to_school'
    )[];
  };

  createdAt?: Date;
  updatedAt?: Date;
}


export interface PropertyApiResponse {
  status: string;
  message?: string;
  data: {
    data: VillaProperty[]; // ✅ Correct nested structure
  };
}
