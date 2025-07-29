import React from "react";
import { User } from "react-feather";
import { Paragraph } from "../../atoms/Paragraph";
import { Button } from "../../atoms/Button";

const GuestUserCard: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 bg-white text-center space-y-3">
      <div className="flex justify-center">
        <User className="text-gray-600" size={32} />
      </div>
      <Paragraph >Guest User</Paragraph>
      <p className="text-sm font-medium text-gray-600">Your Recent Activity</p>
      <p className="text-sm text-gray-500">
        No activity yet! Start browsing properties and projects and track them from here.
      </p>
      <Button>LOGIN / REGISTER</Button>
      <p className="text-xs text-gray-500">to access all the features on 99acres</p>
    </div>
  );
};

export default GuestUserCard;
