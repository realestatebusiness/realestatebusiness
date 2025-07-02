import React, { useState } from 'react';
import LocationAutocomplete from './LocationAutocomplete';

const PropertyPage = () => {
    // State to hold form values
    const [plotArea, setPlotArea] = useState('');
    const [areaUnit, setAreaUnit] = useState('sq.ft');
    const [lengthOfPlot, setLengthOfPlot] = useState('');
    const [breadthOfPlot, setBreadthOfPlot] = useState('');
    const [noOfFloors, setNoOfFloors] = useState('');
    const [boundaryWall, setBoundaryWall] = useState('No');
    const [propertyTitle, setPropertyTitle] = useState('');
    const [city, setCity] = useState('');
    const [locality, setLocality] = useState('');
    const [subLocality, setSubLocality] = useState('');
    const [apartmentSociety, setApartmentSociety] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [residentialType, setResidentialType] = useState('flat_apartment');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [balconies, setBalconies] = useState('');
    const [carpetArea, setCarpetArea] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState('ready_to_move');
    const [price, setPrice] = useState('');
    const [lookingTo, setLookingTo] = useState('Sell');
    const [propertyType, setPropertyType] = useState('Residential');
    const [propertySubType, setPropertySubType] = useState('Independent House / Villa');
    
    // Handler for submitting the form
    const handleSubmit = (event) => {
        event.preventDefault();
        const propertyDetails = {
            plotArea,
            areaUnit,
            lengthOfPlot,
            breadthOfPlot,
            noOfFloors,
            boundaryWall,
            propertyTitle,
            city,
            locality,
            subLocality,
            apartmentSociety,
            fullAddress,
            residentialType,
            bedrooms,
            bathrooms,
            balconies,
            carpetArea,
            availabilityStatus,
            price,
            lookingTo,
            propertyType,
            propertySubType
        };
        console.log(propertyDetails);
        // Submit the form to API or handle as needed
    };

    const StepIndicator = ({ stepNumber, title, subtitle, isActive, isCompleted }) => (
        <div className="flex items-center mb-6">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
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

    const PropertyScoreCard = () => (
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
                            strokeDasharray="27, 100"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">27%</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Property Score</h3>
                    <p className="text-sm text-gray-600">Better your property score, greater your visibility</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar */}
                <div className="fixed left-0 top-0 h-screen w-80 bg-white shadow-sm p-6 z-20">
                    <StepIndicator 
                        stepNumber="1" 
                        title="Basic Details" 
                        subtitle="Step 1"
                        isActive={true}
                        isCompleted={false}
                    />
                    <StepIndicator 
                        stepNumber="2" 
                        title="Location Details" 
                        subtitle="Moinabad, Hyderabad Edit"
                        isActive={false}
                        isCompleted={true}
                    />
                    <StepIndicator 
                        stepNumber="3" 
                        title="Property Profile" 
                        subtitle="Step 3"
                        isActive={false}
                        isCompleted={false}
                    />
                    <StepIndicator 
                        stepNumber="4" 
                        title="Photos, Videos & Voice-over" 
                        subtitle="Step 4"
                        isActive={false}
                        isCompleted={false}
                    />
                    <StepIndicator 
                        stepNumber="5" 
                        title="Amenities section" 
                        subtitle="Step 5"
                        isActive={false}
                        isCompleted={false}
                    />
                    
                    <div className="mt-8">
                        <PropertyScoreCard />
                    </div>
                </div>

                {/* Main Content */}
                <div className="ml-80 flex-1 h-screen overflow-y-auto p-8">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
                            Welcome back Sulaxana, Fill out basic details
                        </h1>

                        <div>
                            {/* I'm looking to section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-medium text-gray-900 mb-4">I'm looking to</h2>
                                <div className="flex gap-3">
                                    {['Sell', 'Rent / Lease', 'PG'].map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setLookingTo(option)}
                                            className={`px-6 py-2 rounded-full font-medium transition-colors ${
                                                lookingTo === option
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Property Type section */}
                            <div className="mb-8">
                                <h2 className="text-xl font-medium text-gray-900 mb-4">What kind of property do you have?</h2>
                                <div className="flex gap-6 mb-6">
                                    {['Residential', 'Commercial'].map((type) => (
                                        <label key={type} className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="propertyType"
                                                value={type}
                                                checked={propertyType === type}
                                                onChange={(e) => setPropertyType(e.target.value)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-gray-700">{type}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Property Sub-types */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {[
                                        'Flat/Apartment',
                                        'Independent House / Villa',
                                        'Independent / Builder Floor',
                                        'Plot / Land',
                                        '1 RK/ Studio Apartment',
                                        'Serviced Apartment',
                                        'Farmhouse',
                                        'Other'
                                    ].map((subType) => (
                                        <button
                                            key={subType}
                                            type="button"
                                            onClick={() => setPropertySubType(subType)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                propertySubType === subType
                                                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                                            }`}
                                        >
                                            {subType}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Basic Details section */}
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

                            {/* Location Details section */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Location Details</h3>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City:
                                        </label>
                                    <LocationAutocomplete
  value={city}
  onChange={setCity}
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
  onChange={setLocality}
  placeholder="Enter Locality"
  locationType="suburb"
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
  onChange={setSubLocality}
  placeholder="Enter Sub Locality"
  locationType="suburb"
  parentValue={`${locality}, ${city}`}
/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Apartment Society (optional):
                                        </label>
<LocationAutocomplete
  value={apartmentSociety}
  onChange={setApartmentSociety}
  placeholder="Enter Apartment/Society"
  locationType="neighbourhood"
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

                            {/* Property Profile section */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Property Profile</h3>
                                
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bedrooms:
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={bedrooms}
                                            onChange={(e) => setBedrooms(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bathrooms:
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={bathrooms}
                                            onChange={(e) => setBathrooms(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Balconies:
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={balconies}
                                            onChange={(e) => setBalconies(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Carpet Area:
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
                                            Area Unit:
                                        </label>
                                        <select
                                            value={areaUnit}
                                            onChange={(e) => setAreaUnit(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
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
                                            Availability Status:
                                        </label>
                                        <select
                                            value={availabilityStatus}
                                            onChange={(e) => setAvailabilityStatus(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="ready_to_move">Ready to Move</option>
                                            <option value="under_construction">Under Construction</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price (INR):
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media section */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Media</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Photos:
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Continue Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                                                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;