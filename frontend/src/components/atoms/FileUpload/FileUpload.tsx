// src/components/atoms/FileUpload/FileUpload.tsx
import React from 'react';

interface FileUploadProps {
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: string;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = 'image/*',
  onChange,
  placeholder = 'Upload file',
  icon,
  className = '',
}) => {
  return (
    <label className={`flex flex-col items-center gap-2 cursor-pointer ${className}`}>
      {icon && (
        <img
          src={icon}
          alt="Upload icon"
          className="w-10 h-10 object-cover rounded"
        />
      )}
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      <span className="text-sm text-gray-600 text-center">
        {placeholder}
      </span>
    </label>
  );
};

export default FileUpload;