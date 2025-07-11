import React, { useState } from 'react';
import { Search, Mic, Crosshair, ChevronDown } from 'react-feather';

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

  const tabs = ['Buy', 'Rent', 'PG / Co-living', 'Plots/Land'];

  const residentialTypes = [
    'Flat/Apartment',
    'Independent House/Villa',
    'Plot/Land',
    'Other',
  ];

  const plotTypes = ['Residential Plots/Land', 'Commercial Plots/Land'];

  const propertyTypes = selectedTab === 'Plots/Land' ? plotTypes : residentialTypes;

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
            <div className="p-2 rounded-full bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition">
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
    </div>
  );
}
