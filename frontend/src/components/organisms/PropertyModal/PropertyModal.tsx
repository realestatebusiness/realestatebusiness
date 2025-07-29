import React from "react";

interface PropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTabSelect?: (tab: string) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ isOpen, onClose, onTabSelect }) => {
  
  const handleTabClick = (tab: string) => {
    if (onTabSelect) {
      onTabSelect(tab);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50 mr-[600px] mt-[0px]">
            <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Explore real estate in…
          </h2>

<div className="flex border-b mb-4">
  {["Buy", "Rent / Lease", "Plots/Land", "PG / Co-living"].map((tab) => (
    <button
      key={tab}
      onClick={() => onTabSelect && onTabSelect(tab)}
      className={`px-4 py-2 text-sm font-medium ${
        tab === "Buy"
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {tab}
    </button>
  ))}
</div>
          <div className="flex items-center gap-2 border rounded-md shadow-sm p-2 mb-4">
            <select className="border-none outline-none text-gray-700 bg-transparent">
              <option>Residential</option>
              <option>Commercial</option>
            </select>
            <input
              type="text"
              placeholder="City Name"
              className="flex-1 px-2 outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Explore
            </button>
          </div>

          <p className="text-gray-500 mb-2">Continue browsing where you left off…</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["My properties (2)", "Rent in Hyderabad", "Buy in Hyderabad", "Buy in Secunderabad"].map(
              (item) => (
                <span
                  key={item}
                  className="px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-600 cursor-pointer hover:bg-gray-100"
                >
                  {item}
                </span>
              )
            )}
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex gap-4">
              {["All India", "Dubai", "For NRI", "International"].map((link) => (
                <a key={link} href="#" className="hover:text-blue-600">
                  {link}
                </a>
              ))}
            </div>
            <a href="#" className="hover:text-blue-600">
              View top cities
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;