// src/components/molecules/ContactInfo/ContactInfo.tsx
import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 mt-10 border-t border-gray-300">
      <h4 className="text-sm font-semibold mb-4 text-gray-700">
        FOR QUERIES YOU CAN REACH US AT:
      </h4>

      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-800">
        {/* Call */}
        <div className="flex items-start space-x-3">
          <div>
            <p>
              <strong>Call us at:</strong> 1800 41 99099
            </p>
            <p>
              For international numbers click{' '}
              <a
                href="https://www.99acres.com/faq/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                here
              </a>
            </p>
            <p>
              <strong>SMS:</strong> BUY as 56070
            </p>
          </div>
        </div>

        {/* Mail */}
        <div className="flex items-start space-x-3">
          <div>
            <p>
              <strong>Mail us for Sales/Service/General Enquiries:</strong>
              <br />
              <a
                href="mailto:services@99acres.com"
                className="text-blue-500"
              >
                services@99acres.com
              </a>
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start space-x-3">
          <div>
            <p>
              <strong>Request for Information:</strong>
              <br />
              Ask us for information about our services.{' '}
              <a
                href="https://www.99acres.com/info/request-info"
                className="text-blue-500"
              >
                Request Info
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 pt-4 text-sm text-gray-700">
        <p>
          <strong>Office & Locations:</strong>{' '}
          <a
            href="https://www.99acres.com/info/contact-us"
            className="text-blue-500"
          >
            Click here
          </a>{' '}
          for Branch Address
        </p>
        <p className="mt-2">
          To delete your account,{' '}
          <a href="#" className="text-blue-500">
            click here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
