import React, { useState } from "react";
import InputField from "../../atoms/InputField/InputField"; // Update this path
import Button from "../../atoms/Button/Button"; // Update this path
import { postRequest } from "../../../services/endpoints";
import { useSelector } from 'react-redux';
import { selectAuthToken, selectCurrentUserId } from "../../../features/auth";

interface PasswordData {
  current: string;
  new: string;
}

interface ChangePasswordFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onPasswordChange?: (passwords: PasswordData) => void | Promise<void>;
  title?: string;
  isLoading?: boolean;
}

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  isOpen = true,
  onClose,
  title = "Change Password",
}) => {
  const userId = useSelector(selectCurrentUserId);
  const token = useSelector(selectAuthToken);

  const [formData, setFormData] = useState<FormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be atleast 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 const handleSavePassword = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const payload = {
        userId, // if backend expects it
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const headers = token
        ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" };

      const result = await postRequest<ChangePasswordResponse>(
        "/change-password",
        payload,
        headers
      );

      if (result.success) {
        alert(result.message || "Password changed successfully!");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setErrors({});
        if (onClose) onClose();
      } else {
        throw new Error(result.message || "Failed to change password");
      }
    } catch (error: any) {
      alert(error.message || "Error changing password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});

    if (onClose) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 z-10"
          disabled={isLoading}
        >
          ×
        </button>

        {/* Header */}
        <div className="bg-gray-700 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-medium">{title}</h2>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Current Password */}
          <InputField
            label="Current Password :"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleInputChange}
            error={errors.currentPassword}
            disabled={isLoading}
            divClass="mb-3"
          />

          {/* New Password */}
          <div className="mb-3">
            <InputField
              label="New Password :"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              error={errors.newPassword}
              disabled={isLoading}
              divClass="mb-1"
            />
            <p className="text-gray-500 text-xs -mt-3 mb-3">
              Password must be atleast 6 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <InputField
            label="Confirm Password :"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            disabled={isLoading}
            divClass="mb-6"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleSavePassword}
              text="Save Password"
              size="md"
              loading={isLoading}
              disabled={isLoading}
            />
            <Button
              variant="secondary"
              onClick={handleCancel}
              text="Cancel"
              size="md"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

// Usage Example:
/*
import React, { useState } from 'react';
import ChangePasswordForm from './ChangePasswordForm';

const ParentComponent: React.FC = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (passwords: { current: string; new: string }) => {
    setIsLoading(true);
    try {
      // Your API call here
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      if (response.ok) {
        alert('Password changed successfully!');
      } else {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      alert('Error changing password. Please try again.');
      throw error; // Re-throw to prevent modal from closing
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => setShowPasswordModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Change Password
      </button>

      <ChangePasswordForm
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onPasswordChange={handlePasswordChange}
        isLoading={isLoading}
        title="Change Your Password"
      />
    </div>
  );
};

export default ParentComponent;
*/
