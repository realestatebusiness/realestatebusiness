import React, { useState } from 'react';

const ExploreModal = ({ isOpen, onClose, onTabSelect }) => {
    if (!isOpen) return null;

    const tabs = ["Buy", "Rent / Lease", "Plots/Land", "PG / Co-living"];
    const [activeTab, setActiveTab] = useState("Buy");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        let mappedTab = tab;
        if (tab === "Rent / Lease") {
            mappedTab = "Rent";
        }
        onTabSelect(mappedTab);        
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50 mr-[600px]">
            <div className="relative bg-white rounded-xl p-6 shadow-2xl w-[600px] max-w-full max-h-[90vh] overflow-auto animate-fadeIn">
                <button
                    className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600 transition"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Explore real estate in...</h2>

                <div className="flex space-x-6 border-b border-gray-200 mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`pb-2 text-lg font-medium transition-colors duration-300 ${
                                activeTab === tab
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-white shadow-md rounded-lg p-3 mb-4 flex items-center space-x-2">
                    <select className="border rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500">
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                    <input
                        type="text"
                        placeholder="City Name"
                        className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition">
                        Explore
                    </button>
                </div>

                <p className="mt-4 text-gray-700 font-medium">Continue browsing where you left off...</p>
                <div className="flex flex-wrap gap-3 mt-3">
                    <button className="px-4 py-1 border rounded-full text-blue-600 border-blue-600 hover:bg-blue-50 transition">
                        Rent in Hyderabad
                    </button>
                    <button className="px-4 py-1 border rounded-full hover:bg-gray-100 transition">
                        Buy in Hyderabad
                    </button>
                    <button className="px-4 py-1 border rounded-full hover:bg-gray-100 transition">
                        Buy in Secunderabad
                    </button>
                </div>

                <div className="mt-6 border-t pt-4 flex flex-wrap justify-between text-sm text-gray-600">
                    <span className="cursor-pointer hover:text-blue-600 transition">All India</span>
                    <span className="cursor-pointer hover:text-blue-600 transition">Dubai</span>
                    <span className="cursor-pointer hover:text-blue-600 transition">For NRI</span>
                    <span className="cursor-pointer hover:text-blue-600 transition">International</span>
                    <span className="text-blue-600 cursor-pointer hover:underline">View top cities</span>
                </div>
            </div>
        </div>
    );
};

export default ExploreModal;
