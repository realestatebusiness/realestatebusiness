// src/components/molecules/UploadSection/UploadSection.tsx
import React from 'react';
import FileUpload from '../../atoms/FileUpload/FileUpload';

interface UploadSectionProps {
  onProfilePhotoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompanyLogoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  onProfilePhotoChange,
  onCompanyLogoChange,
  className = '',
}) => {
  return (
    <div className={`mt-6 ${className}`}>
      <p className="text-sm font-medium mb-2">Upload Image</p>
      <div className="flex gap-6 items-center">
        <FileUpload
          onChange={onProfilePhotoChange}
          placeholder="Upload profile photo"
          icon="https://static.99acres.com/universalmy99/img/account_circle_24px.svg"
          className="text-center"
        />
        
        <FileUpload
          onChange={onCompanyLogoChange}
          placeholder="Upload company logo (optional)"
          icon="https://static.99acres.com/universalmy99/img/logo_topaz.svg"
          className="text-center"
        />
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Images should be .jpg, .jpeg & less than 10MB
      </p>
    </div>
  );
};

export default UploadSection;