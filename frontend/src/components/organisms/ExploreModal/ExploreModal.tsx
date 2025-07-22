import React, { useState } from 'react';

const ExploreModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const tabs = ["Buy", "Rent / Lease", "Plots/Land", "PG / Co-living"];
    const [activeTab, setActiveTab] = useState("Buy");

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50 mr-[600px] mt-[0px]">
            <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-4">Explore real estate in...</h2>

                {/* Tabs */}
                <div className="flex space-x-6 border-b mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`pb-2 text-lg font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="bg-white shadow-md rounded-md p-4 mb-4 flex items-center space-x-2">
                    <select className="border rounded-md p-2">
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                    <input
                        type="text"
                        placeholder="City Name"
                        className="flex-1 border rounded-md p-2"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Explore</button>
                </div>

                {/* Continue Browsing */}
                <p className="mt-4 text-gray-700 font-medium">Continue browsing where you left off...</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    <button className="px-3 py-1 border rounded-full text-blue-600 border-blue-600">Rent in Hyderabad</button>
                    <button className="px-3 py-1 border rounded-full">Buy in Hyderabad</button>
                    <button className="px-3 py-1 border rounded-full">Buy in Secunderabad</button>
                </div>

                {/* Footer Links */}
                <div className="mt-6 border-t pt-3 flex flex-wrap justify-between text-sm text-gray-600">
                    <span>All India</span>
                    <span>Dubai</span>
                    <span>For NRI</span>
                    <span>International</span>
                    <span className="text-blue-600 cursor-pointer">View top cities</span>
                </div>
            </div>
        </div>
    );
};

export default ExploreModal;
