import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the VillaProperty document
interface VillaProperty extends Document {
    userId: string;
    userName: string;
    userEmail: string;
    propertyId: string;
    propertyTitle: string;
    basicDetails: {
        lookingFor: 'sell' | 'rent_lease' | 'pg';
        propertyCategory: 'residential' | 'commercial';
        residentialType: 'flat_apartment' | 'independent_house_villa' | 'plot_land';
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
        availabilityStatus?: 'ready_to_move' | 'under_construction';
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
        generalAmenities?: ('visitor_parking' | 'water_storage' | 'security_fire_alarm' | 'lift' | 'park' | 'vastu_compliant')[];
        propertyFeatures?: ('high_ceiling_height' | 'piped_gas' | 'internet_wifi_connectivity')[];
        societyBuildingFeatures?: ('shopping_center' | 'swimming_pool' | 'fitness_centre_gym')[];
        additionalFeatures?: ('waste_disposal' | 'rain_water_harvesting')[];
        waterSource?: ('borewell' | '24x7_water')[];
        overlooking?: ('pool' | 'park')[];
        otherFeatures?: ('wheelchair_friendly' | 'pet_friendly')[];
        powerBackup?: 'full' | 'partial' | 'none';
        propertyFacing?: 'east' | 'west' | 'north' | 'south' | 'north_east';
        locationAdvantages?: ('close_to_metro_station' | 'close_to_market' | 'close_to_school')[];
    };
}

// Define the schema
const villaPropertySchema = new mongoose.Schema<VillaProperty>({
    // User Information
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    
    // Property Basic Information
    propertyId: { type: String, required: true, unique: true },
    propertyTitle: { type: String, required: true },
    
    // Step 1: Basic Details
    basicDetails: {
        lookingFor: { 
            type: String, 
            enum: ['sell', 'rent_lease', 'pg'], 
            required: true 
        },
        propertyCategory: { 
            type: String, 
            enum: ['residential', 'commercial'], 
            required: true 
        },
        residentialType: { 
            type: String, 
            enum: ['flat_apartment', 'independent_house_villa', 'plot_land'],
            required: true
        }
    },
    
    // Step 2: Location Details
    locationDetails: {
        city: { type: String, required: true },
        locality: { type: String, required: true },
        subLocality: { type: String },
        apartmentSociety: { type: String },
        fullAddress: { type: String }
    },
    
    // Step 3: Property Profile (only for independent house/villa and apartment/flat)
    propertyProfile: {
        bedrooms: { 
            type: Number, 
            min: 0, 
            max: 20,
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'flat_apartment' || 
                       this.basicDetails.residentialType === 'independent_house_villa'; 
            }
        },
        bathrooms: { 
            type: Number, 
            min: 0, 
            max: 20,
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'flat_apartment' || 
                       this.basicDetails.residentialType === 'independent_house_villa'; 
            }
        },
        balconies: { 
            type: Number, 
            min: 0, 
            max: 10,
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'flat_apartment' || 
                       this.basicDetails.residentialType === 'independent_house_villa'; 
            }
        },
        areaDetails: {
            carpetArea: { type: Number, min: 0 },
            areaValue: { 
                type: Number, 
                min: 0,
                required: function(this: VillaProperty) { 
                    return this.basicDetails.residentialType === 'flat_apartment' || 
                           this.basicDetails.residentialType === 'independent_house_villa'; 
                }
            },
            areaUnit: { 
                type: String, 
                enum: ['sq_metres', 'sq_cm', 'sq_feet', 'sq_inch'],
                required: function(this: VillaProperty) { 
                    return this.basicDetails.residentialType === 'flat_apartment' || 
                           this.basicDetails.residentialType === 'independent_house_villa'; 
                }
            }
        },
        floorDetails: {
            totalFloors: { 
                type: Number, 
                min: 1, 
                max: 100,
                required: function(this: VillaProperty) { 
                    return this.basicDetails.residentialType === 'flat_apartment' || 
                           this.basicDetails.residentialType === 'independent_house_villa'; 
                }
            },
            propertyOnFloor: { 
                type: Number, 
                min: 0, 
                max: 100,
                required: function(this: VillaProperty) { 
                    return this.basicDetails.residentialType === 'flat_apartment' || 
                           this.basicDetails.residentialType === 'independent_house_villa'; 
                }
            }
        },
        availabilityStatus: { 
            type: String, 
            enum: ['ready_to_move', 'under_construction'],
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'flat_apartment' || 
                       this.basicDetails.residentialType === 'independent_house_villa'; 
            }
        },
        ageOfProperty: { 
            type: String, 
            enum: ['0_1_year', '1_5_years', '5_10_years', '10_plus_years'],
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'flat_apartment' || 
                       this.basicDetails.residentialType === 'independent_house_villa'; 
            }
        },
        ownership: { 
            type: String, 
            enum: ['freehold', 'leasehold', 'cooperative_society', 'power_of_attorney'],
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'flat_apartment' || 
                       this.basicDetails.residentialType === 'independent_house_villa'; 
            }
        },
        priceDetails: {
            price: { 
                type: Number, 
                min: 1, 
                max: 9999999,
                required: function(this: VillaProperty) { 
                    return this.basicDetails.residentialType === 'flat_apartment' || 
                           this.basicDetails.residentialType === 'independent_house_villa'; 
                }
            },
            currency: { type: String, default: 'INR' }
        }
    },
    
    // Step 3: Plot Details (only for plot/land)
    plotDetails: {
        areaValue: { 
            type: Number, 
            min: 0,
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'plot_land'; 
            }
        },
        areaUnit: { 
            type: String, 
            enum: ['sq_metres', 'sq_cm', 'sq_feet', 'sq_inch'],
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'plot_land'; 
            }
        },
        ownership: { 
            type: String, 
            enum: ['freehold', 'leasehold', 'cooperative_society', 'power_of_attorney'],
            required: function(this: VillaProperty) { 
                return this.basicDetails.residentialType === 'plot_land'; 
            }
        },
        priceDetails: {
            price: { 
                type: Number, 
                min: 1, 
                max: 9999999,
                required: function(this: VillaProperty) { 
                    return this.basicDetails.residentialType === 'plot_land'; 
                }
            },
            currency: { type: String, default: 'INR' }
        }
    },
    
    // Step 4: Photos and Videos
    media: {
        photos: [{
            url: { type: String, required: true },
            caption: { type: String }
        }],
        video: {
            url: { type: String },
            caption: { type: String }
        }
    },
    
    // Step 5: Amenities
    amenities: {
        otherRooms: [{
            type: String,
            enum: ['pooja_room', 'study_room', 'servant_room', 'store_room']
        }],
        furnishing: {
            type: String,
            enum: ['furnished', 'semi_furnished', 'unfurnished']
        },
        parking: [{
            type: String,
            enum: ['closed_parking', 'open_parking']
        }],
        generalAmenities: [{
            type: String,
            enum: ['visitor_parking', 'water_storage', 'security_fire_alarm', 'lift', 'park', 'vastu_compliant']
        }],
        propertyFeatures: [{
            type: String,
            enum: ['high_ceiling_height', 'piped_gas', 'internet_wifi_connectivity']
        }],
        societyBuildingFeatures: [{
            type: String,
            enum: ['shopping_center', 'swimming_pool', 'fitness_centre_gym']
        }],
        additionalFeatures: [{
            type: String,
            enum: ['waste_disposal', 'rain_water_harvesting']
        }],
        waterSource: [{
            type: String,
            enum: ['borewell', '24x7_water']
        }],
        overlooking: [{
            type: String,
            enum: ['pool', 'park']
        }],
        otherFeatures: [{
            type: String,
            enum: ['wheelchair_friendly', 'pet_friendly']
        }],
        powerBackup: {
            type: String,
            enum: ['full', 'partial', 'none']
        },
        propertyFacing: {
            type: String,
            enum: ['east', 'west', 'north', 'south', 'north_east']
        },
        locationAdvantages: [{
            type: String,
            enum: ['close_to_metro_station', 'close_to_market', 'close_to_school']
        }]
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Indexes for better query performance
villaPropertySchema.index({ userId: 1 });
villaPropertySchema.index({ propertyId: 1 });
villaPropertySchema.index({ 'locationDetails.city': 1, 'locationDetails.locality': 1 });
villaPropertySchema.index({ 'basicDetails.lookingFor': 1 });
villaPropertySchema.index({ status: 1 });
villaPropertySchema.index({ requestDate: -1 });

// Virtual for property address
villaPropertySchema.virtual('propertyAddress').get(function(this: VillaProperty) {
    const location = this.locationDetails;
    let address = '';
    if (location.apartmentSociety) address += location.apartmentSociety + ', ';
    if (location.subLocality) address += location.subLocality + ', ';
    address += location.locality + ', ' + location.city;
    return address;
});

// Pre-save middleware to validate media limits
villaPropertySchema.pre('save', function(this: VillaProperty, next) {
    if (this.media && this.media.photos && this.media.photos.length > 5) {
        return next(new Error('Maximum 5 photos allowed'));
    }
    next();
});

// Pre-save middleware to set propertyTitle if not provided
villaPropertySchema.pre('save', function(this: VillaProperty, next) {
    if (!this.propertyTitle && this.basicDetails && this.locationDetails) {
        const type = this.basicDetails.residentialType ? 
            this.basicDetails.residentialType.replace('_', ' ') : 
            this.basicDetails.propertyCategory;
        this.propertyTitle = `${type} in ${this.locationDetails.locality}, ${this.locationDetails.city}`;
    }
    next();
});

export default mongoose.model<VillaProperty>('VillaProperty', villaPropertySchema);
