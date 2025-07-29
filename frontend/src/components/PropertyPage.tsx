import React, { useEffect, useState } from 'react';
import LocationAutocomplete from './LocationAutocomplete';
import { getRequest, postRequest } from '../services/endpoints';
import type { RootState } from '../app/store';
import { useAppSelector } from '../app/hooks';
import { FormModal } from './organisms/FormModal';
import toast from 'react-hot-toast';

const PropertyPage = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [areaUnit, setAreaUnit] = useState('sq_feet');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [city, setCity] = useState('');
  const [society, setSociety] = useState('');
  const [locality, setLocality] = useState('');
  const [subLocality, setSubLocality] = useState('');
  const [apartmentSociety, setApartmentSociety] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [residentialType, setResidentialType] = useState('');
  const [commercialType, setCommercialType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [balconies, setBalconies] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('ready_to_move');
  const [price, setPrice] = useState('');
  const [lookingTo, setLookingTo] = useState('sell');
  const [propertyCategory, setPropertyCategory] = useState('residential');
  const [amenities, setAmenities] = useState({});
  const [photos, setPhotos] = useState([]);
  const [dimensions, setDimensions] = useState({ length: '', breadth: '' });
  const [floorsAllowed, setFloorsAllowed] = useState('');
  const [boundaryWall, setBoundaryWall] = useState(false);
  const [openSides, setOpenSides] = useState('');
  const [constructionDone, setConstructionDone] = useState(false);
  const [possessionBy, setPossessionBy] = useState('');
  const [totalFloors, setTotalFloors] = useState('');
  const [propertyOnFloor, setPropertyOnFloor] = useState('');
  const [ageOfProperty, setAgeOfProperty] = useState('');
  const [ownership, setOwnership] = useState('');
  const [areaValue, setAreaValue] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPropertiesCount, setUserPropertiesCount] = useState<number | null>(null);
  const [adminCity, setAdminCity] = useState('');
  const [adminRole, setAdminRole] = useState('');

useEffect(() => {
  const fetchUserProperties = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const properties = await getRequest(`/properties`, {});
      const allProperties = properties?.data?.data || [];
      const userProperties = allProperties.filter(
        (prop) => prop.userName === user.name
      );
      const propertyCount = userProperties.length;
      setUserPropertiesCount(propertyCount);
      setShowFormModal(propertyCount === 0);
    } catch (error) {
      setUserPropertiesCount(0);
      setShowFormModal(true);
    } finally {
      setLoading(false);
    }
  };
  fetchUserProperties();
}, [user?.name]);

  const residentialOptions = [
    { value: 'flat_apartment', label: 'Flat/Apartment' },
    { value: 'independent_house_villa', label: 'Independent House / Villa' },
    { value: 'plot_land', label: 'Plot / Land' }
  ];

  const commercialOptions = [
    { value: 'office', label: 'Office' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'industry', label: 'Industry' }
  ];

  const lookingForOptions = [
    { value: 'sell', label: 'Sell' },
    { value: 'rent_lease', label: 'Rent / Lease' },
    { value: 'pg', label: 'PG' }
  ];

  const getCurrentPropertyOptions = () => {
    return propertyCategory === 'residential' ? residentialOptions : commercialOptions;
  };

  const getCurrentPropertyType = () => {
    return propertyCategory === 'residential' ? residentialType : commercialType;
  };

  const setCurrentPropertyType = (value) => {
    if (propertyCategory === 'residential') {
      setResidentialType(value);
      setCommercialType('');
    } else {
      setCommercialType(value);
      setResidentialType('');
    }
  };

  const handlePropertyCategoryChange = (category) => {
    setPropertyCategory(category);
    setResidentialType('');
    setCommercialType('');
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepCompleted = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        if (lookingTo === 'sell') {
          return lookingTo && propertyTitle && propertyCategory && getCurrentPropertyType();
        }
        return lookingTo && propertyTitle;
      case 2:
        return city && locality && fullAddress;
      case 3:
        return price;
      case 4:
        return photos.length > 0;
      case 5:
        return Object.keys(amenities).length > 0;
      default:
        return false;
    }
  };

  const getStepSubtitle = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return isStepCompleted(1) ? `${lookingTo} - ${propertyTitle}` : 'Step 1';
      case 2:
        return isStepCompleted(2) ? `${locality}, ${city}` : 'Step 2';
      case 3:
        return isStepCompleted(3) ? `₹${price}` : 'Step 3';
      case 4:
        return isStepCompleted(4) ? `${photos.length} Photos` : 'Step 4';
      case 5:
        return isStepCompleted(5) ? `${Object.keys(amenities).length} Amenities` : 'Step 5';
      default:
        return `Step ${stepNumber}`;
    }
  };

  const handleAmenitiesChange = (key, value) => {
    setAmenities(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    const propertyDetails = {
      userName:user?.name, 
      userEmail: user?.email,
      adminCity,
      adminRole,
      propertyTitle,
      basicDetails: {
        lookingFor: lookingTo,
        propertyCategory,
        ...(propertyCategory === 'residential' && { residentialType }),
        ...(propertyCategory === 'commercial' && { commercialType }),
        propertyTitle
      },
      locationDetails: {
        city,
        locality,
        subLocality,
        apartmentSociety,
        fullAddress
      },
      ...(getCurrentPropertyType() !== 'plot_land' && {
        propertyProfile: {
          bedrooms: parseInt(bedrooms) || undefined,
          bathrooms: parseInt(bathrooms) || undefined,
          balconies: parseInt(balconies) || undefined,
          areaDetails: {
            carpetArea: parseFloat(carpetArea) || undefined,
            areaValue: parseFloat(carpetArea) || undefined,
            areaUnit
          },
          floorDetails: {
            totalFloors: parseInt(totalFloors) || undefined,
            propertyOnFloor: parseInt(propertyOnFloor) || undefined
          },
          availabilityStatus,
          ageOfProperty,
          ownership,
          priceDetails: {
            price: parseFloat(price) || undefined,
            currency: 'INR'
          }
        }
      }),
      ...(getCurrentPropertyType() === 'plot_land' && {
        plotDetails: {
          areaValue: parseFloat(areaValue) || undefined,
          areaUnit,
          ownership,
          priceDetails: {
            price: parseFloat(price) || undefined,
            currency: 'INR'
          },
          plotArea: parseFloat(areaValue) || undefined,
          dimensions: {
            length: parseFloat(dimensions.length) || undefined,
            breadth: parseFloat(dimensions.breadth) || undefined
          },
          floorsAllowed: parseInt(floorsAllowed) || undefined,
          boundaryWall,
          openSides,
          constructionDone,
          possessionBy
        }
      }),
      media: photos,
      amenities
    };

    try {
      const response = await postRequest('/createProperty', propertyDetails);
      toast.success("Property Successfully Created!");
    } catch (error) {
      toast.error("Failed to S property. Please try again.");
    }
  };

  const calculateCompletionPercentage = () => {
    const totalFields = 15;
    let filledFields = 0;

    if (currentStep === 1) {
      filledFields += lookingTo ? 1 : 0;
      filledFields += propertyTitle ? 1 : 0;
      filledFields += propertyCategory ? 1 : 0;
      filledFields += residentialType ? 1 : 0;
    } else if (currentStep === 2) {
      filledFields += city ? 1 : 0;
      filledFields += locality ? 1 : 0;
      filledFields += fullAddress ? 1 : 0;
    } else if (currentStep === 3) {
      filledFields += price ? 1 : 0;
      filledFields += bedrooms ? 1 : 0;
      filledFields += bathrooms ? 1 : 0;
      filledFields += balconies ? 1 : 0;
      filledFields += carpetArea ? 1 : 0;
      filledFields += availabilityStatus ? 1 : 0;
    } else if (currentStep === 4) {
      filledFields += photos.length;
    } else if (currentStep === 5) {
      filledFields += Object.keys(amenities).length;
    }

    return Math.round((filledFields / totalFields) * 100);
  };

  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const base64Files = await Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })
    );

    setPhotos(base64Files);
  };


  const SingleSelectDropdown = ({ label, field, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={amenities[field] || ''}
        onChange={(e) => handleAmenitiesChange(field, e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
        ))}
      </select>
    </div>
  );

  const MultiSelectDropdown = ({ label, field, options }) => {
    const selectedValues = amenities[field] || [];

    const toggleValue = (value) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      handleAmenitiesChange(field, newValues);
    };

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          {options.map((opt) => (
            <label key={opt} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedValues.includes(opt)}
                onChange={() => toggleValue(opt)}
                className="mr-2"
              />
              {opt.replace(/_/g, ' ')}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const StepIndicator = ({ stepNumber, title, subtitle, isActive, isCompleted }) => (
    <div className="flex items-center mb-6">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
        }`}>
        {isCompleted ? (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
            {stepNumber}
          </span>
        )}
      </div>
      <div>
        <div className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
          {title}
        </div>
        {subtitle && (
          <div className="text-sm text-gray-500">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );

  const PropertyScoreCard = () => {
    const completionPercentage = calculateCompletionPercentage();

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="relative w-16 h-16 mr-4">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{completionPercentage}%</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Property Score</h3>
            <p className="text-sm text-gray-600">Better your property score, greater your visibility</p>
          </div>
        </div>
      </div>
    );
  };

  const renderBasicDetailsStep = () => (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Welcome back Sulaxana, Fill out basic details
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">I'm looking to</h2>
        <div className="flex gap-3">
          {lookingForOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setLookingTo(option.value)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${lookingTo === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {lookingTo === 'sell' && (
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">What kind of property do you have?</h2>
          <div className="flex gap-6 mb-6">
            {['residential', 'commercial'].map((category) => (
              <label key={category} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="propertyCategory"
                  value={category}
                  checked={propertyCategory === category}
                  onChange={(e) => handlePropertyCategoryChange(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 capitalize">{category}</span>
              </label>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {getCurrentPropertyOptions().map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setCurrentPropertyType(option.value)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors border-2 ${getCurrentPropertyType() === option.value
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Details</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Title:
          </label>
          <input
            type="text"
            value={propertyTitle}
            onChange={(e) => setPropertyTitle(e.target.value)}
            placeholder="Enter property title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderLocationDetailsStep = () => (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Location Details
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Location Details</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City:
            </label>
            <LocationAutocomplete
              value={city}
              onChange={(val) => {
                setCity(val);
                setLocality("");
                setSubLocality("");
                setSociety("");
              }}
              placeholder="Enter City"
              locationType="city"
            />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Locality:
            </label>
            <LocationAutocomplete
              value={locality}
              onChange={(val) => {
                setLocality(val);
                setSubLocality("");
                setSociety("");
              }}
              placeholder="Enter Locality"
              locationType="neighbourhood"
              parentValue={city}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Locality (optional):
            </label>
            <LocationAutocomplete
              value={subLocality}
              onChange={(val) => {
                setSubLocality(val);
                setSociety("");
              }}
              placeholder="Enter Sub-locality"
              locationType="neighbourhood"
              parentValue={`${locality}, ${city}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apartment Society (optional):
            </label>
            <LocationAutocomplete
              value={society}
              onChange={setSociety}
              placeholder="Enter Apartment Society"
              locationType="address"
              parentValue={`${subLocality}, ${locality}, ${city}`}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Address:
          </label>
          <input
            type="text"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            placeholder="Enter full address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          className="bg-gray-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderPropertyProfileStep = () => (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Property Profile
      </h1>
      {(lookingTo === 'pg' || getCurrentPropertyType() !== 'plot_land') && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Property Profile</h3>

          {(propertyCategory === 'residential' || lookingTo === 'pg') && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *:
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms *:
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balconies *:
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={balconies}
                  onChange={(e) => setBalconies(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {propertyCategory === 'residential' || lookingTo === 'pg' ? 'Carpet Area' : 'Area'}:
              </label>
              <input
                type="number"
                min="0"
                value={carpetArea}
                onChange={(e) => setCarpetArea(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area Unit *:
              </label>
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Unit</option>
                <option value="sq_metres">Sq Metres</option>
                <option value="sq_cm">Sq Cm</option>
                <option value="sq_feet">Sq Feet</option>
                <option value="sq_inch">Sq Inch</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Floors *:
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={totalFloors}
                onChange={(e) => setTotalFloors(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property on Floor *:
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={propertyOnFloor}
                onChange={(e) => setPropertyOnFloor(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability Status *:
              </label>
              <select
                value={availabilityStatus}
                onChange={(e) => setAvailabilityStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Status</option>
                <option value="ready_to_move">Ready to Move</option>
                <option value="under_construction">Under Construction</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age of Property *:
              </label>
              <select
                value={ageOfProperty}
                onChange={(e) => setAgeOfProperty(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Age</option>
                <option value="0_1_year">0-1 Year</option>
                <option value="1_5_years">1-5 Years</option>
                <option value="5_10_years">5-10 Years</option>
                <option value="10_plus_years">10+ Years</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ownership *:
              </label>
              <select
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Ownership</option>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="cooperative_society">Cooperative Society</option>
                <option value="power_of_attorney">Power of Attorney</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (INR) *:
              </label>
              <input
                type="number"
                min="1"
                max="9999999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {getCurrentPropertyType() === 'plot_land' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Plot Details</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Title *:
            </label>
            <input
              type="text"
              value={propertyTitle}
              onChange={(e) => setPropertyTitle(e.target.value)}
              placeholder="e.g., Prime plot in residential area"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area Value *:</label>
              <input
                type="number"
                min="0"
                value={areaValue}
                onChange={(e) => setAreaValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit *:</label>
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Unit</option>
                <option value="sq_metres">Sq Metres</option>
                <option value="sq_cm">Sq Cm</option>
                <option value="sq_feet">Sq Feet</option>
                <option value="sq_inch">Sq Inch</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft):</label>
              <input
                type="number"
                min="0"
                value={dimensions.length}
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Breadth (ft):</label>
              <input
                type="number"
                min="0"
                value={dimensions.breadth}
                onChange={(e) => setDimensions({ ...dimensions, breadth: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Floors Allowed:</label>
            <input
              type="number"
              min="0"
              value={floorsAllowed}
              onChange={(e) => setFloorsAllowed(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Boundary Wall:</label>
            <select
              value={boundaryWall}
              onChange={(e) => setBoundaryWall(e.target.value === 'true')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Open Sides:</label>
            <select
              value={openSides}
              onChange={(e) => setOpenSides(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Construction Done:</label>
            <select
              value={constructionDone}
              onChange={(e) => setConstructionDone(e.target.value === 'true')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Possession By:</label>
              <select
                value={possessionBy}
                onChange={(e) => setPossessionBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="immediate">Immediate</option>
                <option value="within_3_months">Within 3 Months</option>
                <option value="within_6_months">Within 6 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ownership *:</label>
              <select
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Ownership</option>
                <option value="freehold">Freehold</option>
                <option value="leasehold">Leasehold</option>
                <option value="cooperative_society">Cooperative Society</option>
                <option value="power_of_attorney">Power of Attorney</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (INR) *:</label>
            <input
              type="number"
              min="1"
              max="9999999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          className="bg-gray-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderPhotosSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Media</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload up to 5 photos and 1 video:
        </label>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <div className="mt-4">
          {images.length > 0 && (
            <>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Images:</h4>
              <ul className="list-disc list-inside">
                {images.map((img, idx) => (
                  <li key={idx}>{img.name}</li>
                ))}
              </ul>
            </>
          )}

          {video && (
            <>
              <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Selected Video:</h4>
              <p>{video.name}</p>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderAmenitiesSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>

      <MultiSelectDropdown
        label="Other Rooms"
        field="otherRooms"
        options={['pooja_room', 'study_room', 'servant_room', 'store_room']}
      />

      <SingleSelectDropdown
        label="Furnishing"
        field="furnishing"
        options={['furnished', 'semi_furnished', 'unfurnished']}
      />

      <MultiSelectDropdown
        label="Parking"
        field="parking"
        options={['closed_parking', 'open_parking']}
      />

      <MultiSelectDropdown
        label="General Amenities"
        field="generalAmenities"
        options={[
          'visitor_parking',
          'water_storage',
          'security_fire_alarm',
          'lift',
          'park',
          'vastu_compliant'
        ]}
      />

      <MultiSelectDropdown
        label="Property Features"
        field="propertyFeatures"
        options={[
          'high_ceiling_height',
          'piped_gas',
          'internet_wifi_connectivity'
        ]}
      />

      <MultiSelectDropdown
        label="Society Building Features"
        field="societyBuildingFeatures"
        options={['shopping_center', 'swimming_pool', 'fitness_centre_gym']}
      />

      <MultiSelectDropdown
        label="Additional Features"
        field="additionalFeatures"
        options={['waste_disposal', 'rain_water_harvesting']}
      />

      <MultiSelectDropdown
        label="Water Source"
        field="waterSource"
        options={['borewell', '24x7_water']}
      />

      <MultiSelectDropdown
        label="Overlooking"
        field="overlooking"
        options={['pool', 'park']}
      />

      <MultiSelectDropdown
        label="Other Features"
        field="otherFeatures"
        options={['wheelchair_friendly', 'pet_friendly']}
      />

      <SingleSelectDropdown
        label="Power Backup"
        field="powerBackup"
        options={['full', 'partial', 'none']}
      />

      <SingleSelectDropdown
        label="Property Facing"
        field="propertyFacing"
        options={['east', 'west', 'north', 'south', 'north_east']}
      />

      <MultiSelectDropdown
        label="Location Advantages"
        field="locationAdvantages"
        options={[
          'close_to_metro_station',
          'close_to_market',
          'close_to_school'
        ]}
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="fixed left-0 top-95px w-80 bg-white shadow-sm p-6 z-20">
      {!loading && showFormModal && (
  <FormModal
    onClose={() => setShowFormModal(false)}
    onSuccess={({ adminCity, adminRole }) => {
      setAdminCity(adminCity);
      setAdminRole(adminRole);
      setShowFormModal(false);
      setUserPropertiesCount(prev => (prev || 0) + 1);
    }}
  />
)}
                <StepIndicator
            stepNumber="1"
            title="Basic Details"
            subtitle={getStepSubtitle(1)}
            isActive={currentStep === 1}
            isCompleted={isStepCompleted(1)}
          />
          <StepIndicator
            stepNumber="2"
            title="Location Details"
            subtitle={getStepSubtitle(2)}
            isActive={currentStep === 2}
            isCompleted={isStepCompleted(2)}
          />
          <StepIndicator
            stepNumber="3"
            title="Property Profile"
            subtitle={getStepSubtitle(3)}
            isActive={currentStep === 3}
            isCompleted={isStepCompleted(3)}
          />
          <StepIndicator
            stepNumber="4"
            title="Photos, Videos & Voice-over"
            subtitle={getStepSubtitle(4)}
            isActive={currentStep === 4}
            isCompleted={isStepCompleted(4)}
          />
          <StepIndicator
            stepNumber="5"
            title="Amenities section"
            subtitle={getStepSubtitle(5)}
            isActive={currentStep === 5}
            isCompleted={isStepCompleted(5)}
          />
          <div className="mt-8">
            <PropertyScoreCard />
          </div>
        </div>
        <div className="ml-80 flex-1 h-screen overflow-y-auto p-8">
          <div className="max-w-4xl">
            {currentStep === 1 && renderBasicDetailsStep()}
            {currentStep === 2 && renderLocationDetailsStep()}
            {currentStep === 3 && renderPropertyProfileStep()}
            {currentStep === 4 && renderPhotosSection()}
            {currentStep === 5 && renderAmenitiesSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
