import React from "react";
import { Button } from "../../atoms/Button";

const InvestacresBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white rounded-lg p-4 mt-4">
      <h3 className="text-lg font-semibold mb-1">
        Invest<span className="text-orange-400">acres</span>
      </h3>
      <p className="text-sm mb-3">Your investment journey begins here</p>
      <ul className="text-sm space-y-1 list-disc list-inside text-gray-200">
        <li>2X RETURNS WITH COMMERCIAL</li>
        <li>EXPERT OPINIONS</li>
      </ul>
      <Button variant="secondary">Visit Now</Button>
    </div>
  );
};

export default InvestacresBanner;
