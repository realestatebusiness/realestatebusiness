import React from "react";
import { DisplayRegisterForm } from "../../organisms/DisplayRegisterForm";

const DisplayRegisterTemplate: React.FC = () => (
  <div className="min-h-screen bg-red-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-sm text-gray-600">Join our real estate platform</p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <DisplayRegisterForm />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DisplayRegisterTemplate;
