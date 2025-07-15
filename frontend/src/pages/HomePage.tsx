import React, { useEffect, useState } from 'react';
import { Search, Mic, Crosshair, ChevronDown } from 'react-feather';
import { useNavigate } from 'react-router-dom';

// Helper to format currency
const formatCurrency = (value) => {
  if (value >= 1_00_00_000) return `₹${(value / 1_00_00_000).toFixed(2)} Cr`;
  if (value >= 1_00_000) return `₹${(value / 1_00_000).toFixed(1)} L`;
  if (value >= 1_000) return `₹${(value / 1_000).toFixed(0)} K`;
  return `₹${value}`;
};

// Helper to format area
const formatArea = (value) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K+ sqft`;
  return `${value} sqft`;
};

export const HomePage=()=> {
  const [selectedTab, setSelectedTab] = useState('Buy');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [propertyCategory, setPropertyCategory] = useState('All Residential');
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10_00_00_000]); // ₹0 to ₹100 Cr
  const [areaRange, setAreaRange] = useState([0, 1000]); // 0 to 1000+ sqft
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedConstructionStatus, setSelectedConstructionStatus] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedFurnishing, setSelectedFurnishing] = useState([]);
  const [selectedSharing, setSelectedSharing] = useState([]);
  const [selectedAvailableFor, setSelectedAvailableFor] = useState([]);
  const [userCity, setUserCity] = useState('');
  const [locationTag, setLocationTag] = useState<{ lat: number; lng: number } | null>(null);

  const navigate=useNavigate();

  const tabs = ['Buy', 'Rent', 'PG / Co-living', 'Plots/Land'];

  const residentialTypes = [
    'Flat/Apartment',
    'Independent House/Villa',
    'Plot/Land',
    'Other',
  ];

  const plotTypes = ['Residential Plots/Land', 'Commercial Plots/Land'];

  const propertyTypes = selectedTab === 'Plots/Land' ? plotTypes : residentialTypes;
const [userProperties, setUserProperties] = useState([]);

useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await fetch('/properties?userId=user123');
      const result = await response.json();
      setUserProperties(result.data || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  fetchProperties();
}, []);


useEffect(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await res.json();
      const city = data.address.city || data.address.town || data.address.state || '';
      setUserCity(city);
      console.log("usercitey......",city)

      // Optional: call API to fetch properties in that city
      // const res = await fetch(`/properties?city=${city}`);
      // const result = await res.json();
      // setUserProperties(result.data || []);
    } catch (err) {
      console.error("Failed to get city from coordinates:", err);
    }
  });
}, []);


  const toggleType = (type) => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updated);

    const isAllResidentialSelected =
      selectedTab !== 'Plots/Land' &&
      residentialTypes.every((resType) => updated.includes(resType));

    const isAllPlotsSelected =
      selectedTab === 'Plots/Land' &&
      plotTypes.every((plotType) => updated.includes(plotType));

    setPropertyCategory(
      isAllResidentialSelected
        ? 'All Residential'
        : isAllPlotsSelected
        ? 'All Plots'
        : 'Custom'
    );
  };

  const clearSelection = () => {
    setSelectedTypes([]);
    setPropertyCategory(
      selectedTab === 'Plots/Land' ? 'All Plots' : 'All Residential'
    );
  };

  const showExtraFilters =
    (['Buy', 'Rent', 'PG / Co-living'].includes(selectedTab) &&
      propertyCategory === 'All Residential') ||
    (selectedTab === 'Plots/Land' && propertyCategory === 'All Plots');

  const filtersToDisplay =
    selectedTab === 'Rent'
      ? ['Budget', 'Bedroom', 'Posted By', 'Furnishing']
      : selectedTab === 'PG / Co-living'
      ? ['Budget', 'Sharing', 'Posted By', 'Available For']
      : selectedTab === 'Plots/Land'
      ? ['Budget', 'Area', 'Posted By']
      : ['Budget', 'Bedroom', 'Construction Status', 'Posted By'];

  return (
    <div>
      {/* Banner Section */}
      <div className="relative w-full h-88 bg-gradient-to-r from-blue-100 via-white to-blue-50 flex items-center justify-center overflow-hidden rounded-xl shadow-md mt-4">
        {/* Optional: Add a background image or illustration here */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('../banner_image.jpg')" }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-blue-800 drop-shadow-lg">
            #KabTakPuchoge
          </h1>
          <p className="mt-2 text-lg text-gray-700 font-medium">
            Find your perfect property today!
          </p>
        </div>
      </div>

      {/* Main Search/Filter Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6 max-w-7xl mx-auto mb-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-8 border-b border-gray-200 pb-4 text-base font-medium text-gray-700">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => {
                setSelectedTab(tab);
                setSelectedTypes([]);
                setShowDropdown(false);
                setActiveFilter(null);
                setPropertyCategory(
                  tab === 'Plots/Land' ? 'All Plots' : 'All Residential'
                );
              }}
              className={`relative cursor-pointer transition ${
                selectedTab === tab
                  ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1'
                  : 'hover:text-blue-600'
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Search Row */}
        <div className="flex flex-wrap items-center gap-4 mt-6 border border-gray-300 rounded-lg px-4 py-4 bg-white">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between border border-gray-300 bg-white px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:border-blue-500 min-w-[170px] transition"
            >
              {propertyCategory}
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>

          <div className="flex items-center flex-grow border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 ring-blue-200">
            <Search className="text-gray-400 mr-2" size={16} />

            {locationTag && (
    <div className="flex items-center bg-blue-50 text-blue-600 rounded-full px-2 py-1 text-xs mr-2">
      <span className="mr-1">Near me</span>
      <button
        onClick={() => setLocationTag(null)}
        className="text-blue-600 hover:text-blue-800 font-bold focus:outline-none"
      >
        ×
      </button>
    </div>
  )}

        <input
              type="text"
              placeholder={`Search "${
                selectedTab === 'Plots/Land'
                  ? 'plot in Delhi'
                  : 'Flat for rent in Noida'
              }"`}
              className="flex-grow outline-none text-sm text-gray-700 placeholder:text-gray-500"
            />
          </div>

          <div className="flex gap-2">
          <div className="p-2 rounded-full bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition"
           onClick={() => {
           navigator.geolocation.getCurrentPosition((position) => {
           const { latitude, longitude } = position.coords;
           console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);
  console.log("Navigating to:", `/propertiesnearme?lat=${latitude}&lng=${longitude}`);
           setLocationTag({ lat: latitude, lng: longitude });
           navigate(`/propertiesnearme?lat=${latitude}&lng=${longitude}`);
       });
     }}>
            <Crosshair size={16} />
         </div>
            <div className="p-2 rounded-full bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition">
              <Mic size={16} />
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md text-sm transition">
            Search
          </button>
        </div>

        {/* Property Type Dropdown */}
        {showDropdown && (
          <div className="mt-3 border border-gray-300 rounded-md p-5 bg-white shadow-sm">
            <button
              className="text-sm text-blue-600 font-medium hover:underline mb-3"
              onClick={() => {
                setSelectedTypes(propertyTypes);
                setPropertyCategory(
                  selectedTab === 'Plots/Land' ? 'All Plots' : 'All Residential'
                );
              }}
            >
              {selectedTab === 'Plots/Land' ? 'Select All Plots' : 'Select All Residential'}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-sm text-gray-800">
              {propertyTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="accent-blue-600 h-4 w-4"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center mt-5 text-sm">
              <button
                className="text-blue-600 hover:underline font-medium"
                onClick={clearSelection}
              >
                Clear
              </button>
              <div className="text-gray-600">
                Looking for commercial properties?{' '}
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  Click here
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        {showExtraFilters && (
          <div className="mt-5">
            <div className="flex flex-wrap gap-4">
              {filtersToDisplay.map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter((prev) => (prev === filter ? null : filter))
                  }
                  className={`flex items-center border ${
                    activeFilter === filter ? 'border-blue-500' : 'border-gray-300'
                  } rounded-full px-4 py-2 text-sm text-gray-800 hover:border-blue-500 transition`}
                >
                  {filter}
                  <ChevronDown size={14} className="ml-2" />
                </button>
              ))}
            </div>

            {/* Budget Filter */}
            {activeFilter === 'Budget' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-2">Select Price Range</div>
                <div className="text-xs text-gray-500 mb-4">
                  {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                </div>
                <input
                  type="range"
                  min={0}
                  max={10_00_00_000}
                  step={100_000}
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Math.min(+e.target.value, priceRange[1]),
                      priceRange[1],
                    ])
                  }
                  className="w-full accent-blue-600"
                />
              </div>
            )}

            {/* Area Filter */}
            {activeFilter === 'Area' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-2">Select Area Range</div>
                <div className="text-xs text-gray-500 mb-4">
                  {formatArea(areaRange[0])} - {formatArea(areaRange[1])}
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={areaRange[0]}
                  onChange={(e) =>
                    setAreaRange([
                      Math.min(+e.target.value, areaRange[1]),
                      areaRange[1],
                    ])
                  }
                  className="w-full accent-blue-600"
                />
              </div>
            )}

            {/* Bedroom Filter */}
            {activeFilter === 'Bedroom' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-4">Number of Bedrooms</div>
                <div className="flex flex-wrap gap-3">
                  {['1 RK/1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map((bedroom) => (
                    <button
                      key={bedroom}
                      onClick={() =>
                        setSelectedBedrooms((prev) =>
                          prev.includes(bedroom)
                            ? prev.filter((b) => b !== bedroom)
                            : [...prev, bedroom]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedBedrooms.includes(bedroom)
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {bedroom}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Construction Status Filter */}
            {activeFilter === 'Construction Status' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-4">Construction Status</div>
                <div className="flex flex-wrap gap-3">
                  {['New Launch', 'Under Construction', 'Ready to move'].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        setSelectedConstructionStatus((prev) =>
                          prev.includes(status)
                            ? prev.filter((s) => s !== status)
                            : [...prev, status]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedConstructionStatus.includes(status)
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Posted By Filter */}
            {activeFilter === 'Posted By' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-4">Posted By</div>
                <div className="flex flex-wrap gap-3">
                  {['Owner', 'Builder', 'Dealer'].map((poster) => (
                    <button
                      key={poster}
                      onClick={() =>
                        setSelectedPostedBy((prev) =>
                          prev.includes(poster)
                            ? prev.filter((p) => p !== poster)
                            : [...prev, poster]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedPostedBy.includes(poster)
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {poster}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Furnishing Filter */}
            {activeFilter === 'Furnishing' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-4">Furnishing</div>
                <div className="flex flex-wrap gap-3">
                  {['Furnished', 'Semi-furnished', 'Unfurnished'].map((furnishing) => (
                    <button
                      key={furnishing}
                      onClick={() =>
                        setSelectedFurnishing((prev) =>
                          prev.includes(furnishing)
                            ? prev.filter((f) => f !== furnishing)
                            : [...prev, furnishing]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedFurnishing.includes(furnishing)
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {furnishing}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sharing Filter */}
            {activeFilter === 'Sharing' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-4">Sharing</div>
                <div className="flex flex-wrap gap-3">
                  {['Private Rooms', '2 Per Room', '2+ Per Room'].map((sharing) => (
                    <button
                      key={sharing}
                      onClick={() =>
                        setSelectedSharing((prev) =>
                          prev.includes(sharing)
                            ? prev.filter((s) => s !== sharing)
                            : [...prev, sharing]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedSharing.includes(sharing)
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {sharing}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Available For Filter */}
            {activeFilter === 'Available For' && (
              <div className="w-full border border-gray-200 rounded-xl p-5 mt-4 shadow-sm bg-white">
                <div className="text-sm font-semibold text-gray-800 mb-4">Available For</div>
                <div className="flex flex-wrap gap-3">
                  {['Girls', 'Boys'].map((availableFor) => (
                    <button
                      key={availableFor}
                      onClick={() =>
                        setSelectedAvailableFor((prev) =>
                          prev.includes(availableFor)
                            ? prev.filter((a) => a !== availableFor)
                            : [...prev, availableFor]
                        )
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${
                        selectedAvailableFor.includes(availableFor)
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-medium'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {availableFor}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Your Property Postings */}
{/* User Property Postings */}
<div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mb-8">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-900">Your Property Postings</h2>
    <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View All</a>
  </div>

  {userProperties.length === 0 ? (
    <p className="text-gray-600 text-sm">No properties found.</p>
  ) : (
    userProperties.map((property: any) => (
      <div key={property._id} className="mb-6">
        <div className="text-sm text-gray-600 mb-2">
          Manage posting for <br />
          <span className="font-medium text-gray-800">
            Property ID - {property._id}, ({property.basicDetails?.propertyType || 'N/A'})
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
              <img
                src={property.media?.[0]?.url || '/placeholder-building.png'}
                alt="Property"
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Property ID - <span className="font-medium text-gray-700">{property._id}</span>
              </p>
              <h3 className="text-base font-semibold text-gray-900">
                {property.basicDetails?.propertyTitle || 'Untitled Property'}
              </h3>
              <p className="text-sm text-gray-600">
                in {property.locationDetails?.locality || 'N/A'}, {property.locationDetails?.city || ''}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
              {property.basicDetails?.status || 'Inactive'}
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition">
              Re-activate Posting
            </button>
          </div>
        </div>

        {/* Responses (static for now) */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-gray-900">0 Responses on this posting</h3>
            <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View all responses</a>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 border rounded-lg p-4 text-center text-gray-500">
              <h4 className="font-medium text-sm text-gray-700">Buyer Responses</h4>
              <p className="text-2xl">— —</p>
            </div>
            <div className="flex-1 border rounded-lg p-4 text-center text-gray-500">
              <h4 className="font-medium text-sm text-gray-700">Dealer Responses</h4>
              <p className="text-2xl">— —</p>
            </div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
}
