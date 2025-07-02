import React from "react";
import DisplayLoginForm from "../../organisms/DisplayLoginForm/DisplayLoginForm";

const DisplayLoginTemplate: React.FC = () => (
  <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <DisplayLoginForm />
  </div>
);

export default DisplayLoginTemplate;
