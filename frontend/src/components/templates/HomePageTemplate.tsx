import { useEffect, useState } from 'react';
import { Home, MapPin, Users } from 'react-feather';
import { PostPropertySection } from '../organisms/PostPropertySection';
import InsightsSection from '../organisms/InsightSection/InsightSection';
import { Navigation } from '../organisms/Navigation';
import SearchBar from '../organisms/SearchBar/SearchBar';
import { PropertyTypeDropDown } from '../organisms/PropertyTypeDropDown';
import { FilterBar } from '../organisms/FilterBar';
import { DemandSection } from '../organisms/DemandSection';
import { PropertyTypeSection } from '../organisms/PropertyTypeSection';
import { PlotCollectionSection } from '../organisms/PlotCollectionSection';
import { AdvertiserSection } from '../organisms/AdvertiserSection';
import { SellWithUsSection } from '../organisms/SellWithUsSection';
import { DownloadAppSection } from '../organisms/DownloadAppSection';
import { GuestSideBar } from '../organisms/GuestSideBar';
import { useAppSelector } from '../../app/hooks';
import type { RootState } from '../../app/store';
import { LoggedInHomepage } from '../organisms/LoggedInHomepage';
import { getRequest } from '../../services/endpoints';
import type { VillaProperty } from '../../types/VillaProperty';

type UIStatus = 'active' | 'inactive' | 'deleted' | 'draft';
interface UserPropertyUI {
  _id: string;
  displayId?: string;
  title: string;
  addressLine: string;
  status: UIStatus;
  imageUrl?: string;
}

const mapVillaToUI = (v: VillaProperty): UserPropertyUI => {
  const addr =
    (v as any).propertyAddress ??
    [
      v.locationDetails?.apartmentSociety,
      v.locationDetails?.subLocality,
      v.locationDetails?.locality,
      v.locationDetails?.city,
    ]
      .filter(Boolean)
      .join(', ');

  const status: UIStatus = (v as any).status ?? 'active';

  const imageUrl = v.media?.photos?.[0]?.url;

  return {
    _id: String(v._id),
    displayId: v.propertyId,
    title: v.basicDetails?.propertyTitle ?? 'Untitled Property',
    addressLine: addr,
    status,
    imageUrl,
  };
};

const HomepageTemplate = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const userName = user?.name ?? 'Guest';
  const isGuest = !user;

  const [propsLoading, setPropsLoading] = useState(false);
  const [userProps, setUserProps] = useState<UserPropertyUI[]>([]);

useEffect(() => {
  if (!userName) return;

  const fetchProps = async () => {
    try {
      setPropsLoading(true);

      const res = await getRequest<{
        data: { data: VillaProperty[] };
      }>(`/properties?userName=${userName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const villas = res?.data?.data ?? [];
      console.log("Fetched villas:", villas);

      setUserProps(villas.map(mapVillaToUI));
    } catch (err) {
      setUserProps([]);
    } finally {
      setPropsLoading(false);
    }
  };

  fetchProps();
}, [userName, token]);
  const [selectedTab, setSelectedTab] = useState('Buy');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const RES_TYPES = [
    {
      title: 'Residential Apartment',
      count: '10,000+ Properties',
      bgColor: 'bg-orange-50',
      iconColor: 'bg-orange-100',
      icon: Home,
    },
    {
      title: 'Residential Land',
      count: '6,300+ Properties',
      bgColor: 'bg-blue-50',
      iconColor: 'bg-blue-100',
      icon: MapPin,
    },
    {
      title: 'Independent House/Villa',
      count: '4,100+ Properties',
      bgColor: 'bg-green-50',
      iconColor: 'bg-green-100',
      icon: Home,
    },
  ];

  const PLOT_TYPES = [
    {
      title: 'Residential Plots/Land',
      count: '2,500+ Properties',
      bgColor: 'bg-blue-50',
      iconColor: 'bg-blue-100',
      icon: MapPin,
    },
    {
      title: 'Commercial Plots/Land',
      count: '1,100+ Properties',
      bgColor: 'bg-purple-50',
      iconColor: 'bg-purple-100',
      icon: MapPin,
    },
  ];

  const tabs = ['Buy', 'Rent', 'PG / Co-living', 'Plots/Land'];

  const filtersToDisplay =
    selectedTab === 'Rent'
      ? ['Budget', 'Bedroom', 'Posted By', 'Furnishing']
      : selectedTab === 'PG / Co-living'
      ? ['Budget', 'Sharing', 'Posted By', 'Available For']
      : selectedTab === 'Plots/Land'
      ? ['Budget', 'Area', 'Posted By']
      : ['Budget', 'Bedroom', 'Construction Status', 'Posted By'];

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const propertyTypesData = selectedTab === 'Plots/Land' ? PLOT_TYPES : RES_TYPES;

  const showGuestContent = isGuest && (selectedTab === 'Buy' || selectedTab === 'Rent');
  const showPlotContent = isGuest && selectedTab === 'Plots/Land';

  const handleMyProps = () => {
  };

  const handleReactivate = async (id: string) => {
    setUserProps(prev => prev.map(p => (p._id === id ? { ...p, status: 'active' } : p)));
  };

  const handleViewProp = (id: string) => {
    // e.g., navigate(`/property/${id}`);
  };

  const handleViewResponses = () => {
    // e.g., navigate('/responses');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isGuest && (
        <div className="relative w-full h-[500px] md:h-[600px] text-white">
          <img
            src="../banner_image.jpg"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/30" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              #KabTakPuchoge
            </h1>
            <p className="text-lg md:text-2xl mb-8 text-white/90 max-w-2xl drop-shadow">
              Find your perfect property today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="bg-white/20 p-2 rounded-full">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-medium">50,000+ Properties</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="bg-white/20 p-2 rounded-full">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-white font-medium">Trusted by 1M+ users</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <Navigation tabs={tabs} selectedTab={selectedTab} onTabChange={setSelectedTab} />
          <SearchBar
            selectedTab={selectedTab}
            propertyCategory="All Residential"
            onSearch={() => {}}
          />

          <button
            type="button"
            className="mt-4 text-sm text-blue-600 hover:underline"
            onClick={() => setShowDropdown(v => !v)}
          >
            {showDropdown ? 'Hide Property Types' : 'Choose Property Types'}
          </button>

          {showDropdown && (
            <PropertyTypeDropDown
              types={propertyTypesData.map(t => t.title)}
              selectedTypes={selectedTypes}
              onToggle={toggleType}
              onSelectAll={() => setSelectedTypes(propertyTypesData.map(t => t.title))}
              onClear={() => setSelectedTypes([])}
            />
          )}

          <FilterBar
            filters={filtersToDisplay}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showGuestContent && (
          <>
            <PropertyTypeSection
              isGuest={isGuest}
              userName={userName}
              location="Hyderabad"
              propertyTypes={propertyTypesData}
            />
            <DemandSection />
            <InsightsSection />
            <PostPropertySection />
          </>
        )}

        {showPlotContent && (
          <>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <PlotCollectionSection />
              </div>
              <div className="w-full lg:w-80">
                <GuestSideBar />
              </div>
            </div>
            <AdvertiserSection />
            <SellWithUsSection />
            <DownloadAppSection />
          </>
        )}

        {!isGuest && (
          <LoggedInHomepage
            userName={userName}
            properties={userProps}
            loading={propsLoading}
            onMyProps={handleMyProps}
            onReactivate={handleReactivate}
            onView={handleViewProp}
            onViewResponses={handleViewResponses}
          />
        )}
      </div>
    </div>
  );
};

export default HomepageTemplate;
